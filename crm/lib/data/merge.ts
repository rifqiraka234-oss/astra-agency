/**
 * lib/data/merge.ts, merge two organizations or two contacts, and undo it.
 *
 *   const fields = await mergeFields(sql, 'contact', primaryId, otherId);  // side by side values and default winners
 *   const logId = await tx((t) => mergeRecords(t, { type: 'contact', winnerId, loserId, choices, userId }), { userId });
 *   await tx((t) => undoMerge(t, logId, userId), { userId });
 *
 * What a merge does, in the caller's transaction
 *   1. Locks both records. Soft deletes the loser first (frees its LinkedIn slot).
 *   2. Writes the chosen field values onto the winner. By default the winner's
 *      value wins unless it is empty.
 *   3. Repoints every child row (emails, phones, domains, roles, activity and
 *      task links, deals, leads, projects, tickets, invoices, messages). Rows
 *      that would collide with one the winner already has (the same activity
 *      linked twice) are deleted and kept in the snapshot. Moved rows that were
 *      primary lose that flag when the winner already has a primary.
 *   4. Writes merge_log with the full losing record, the winner's values before,
 *      the deleted rows, and every moved row id, which is all undo needs.
 */
import { sql, type Db, type Tx } from '@/lib/db';
import { logActivity } from '@/lib/activities';
import { SettingsError } from '@/lib/settings/errors';

export type MergeType = 'organization' | 'contact';

type MoveSpec = {
  table: string;
  column: string;
  /** Rows of the loser that would collide with a winner row on (column, uniqueWith). */
  uniqueWith?: string[];
  onConflict?: 'delete' | 'leave';
  /** Primary flag that is unique per `column`, with an extra condition. */
  primary?: string;
  /** Extra filter, fixed text. */
  where?: string;
};

const MOVES: Record<MergeType, MoveSpec[]> = {
  contact: [
    { table: 'contact_emails', column: 'contact_id', primary: 'is_primary' },
    { table: 'contact_phones', column: 'contact_id', primary: 'is_primary' },
    { table: 'contact_org_roles', column: 'contact_id', primary: 'is_primary and is_current' },
    { table: 'activity_links', column: 'contact_id', uniqueWith: ['activity_id'], onConflict: 'delete' },
    { table: 'task_links', column: 'contact_id', uniqueWith: ['task_id'], onConflict: 'delete' },
    { table: 'deal_contacts', column: 'contact_id', uniqueWith: ['deal_id'], onConflict: 'delete' },
    { table: 'leads', column: 'contact_id' },
    { table: 'tickets', column: 'contact_id' },
    { table: 'invoices', column: 'contact_id' },
    { table: 'outbound_messages', column: 'contact_id' },
    { table: 'suppression_list', column: 'contact_id' },
    { table: 'external_ids', column: 'entity_id', uniqueWith: ['entity_type', 'system'], onConflict: 'leave', where: `entity_type in ('contact', 'contacts')` },
  ],
  organization: [
    { table: 'organization_domains', column: 'organization_id', primary: 'is_primary' },
    { table: 'contact_org_roles', column: 'organization_id' },
    { table: 'contacts', column: 'primary_org_id' },
    { table: 'activity_links', column: 'organization_id', uniqueWith: ['activity_id'], onConflict: 'delete' },
    { table: 'task_links', column: 'organization_id', uniqueWith: ['task_id'], onConflict: 'delete' },
    { table: 'deals', column: 'organization_id' },
    { table: 'leads', column: 'organization_id' },
    { table: 'projects', column: 'organization_id' },
    { table: 'tickets', column: 'organization_id' },
    { table: 'invoices', column: 'organization_id' },
    { table: 'outbound_messages', column: 'organization_id' },
    { table: 'organizations', column: 'parent_id' },
    { table: 'external_ids', column: 'entity_id', uniqueWith: ['entity_type', 'system'], onConflict: 'leave', where: `entity_type in ('organization', 'organizations')` },
  ],
};

const TABLE: Record<MergeType, string> = { organization: 'organizations', contact: 'contacts' };

export type MergeField = { key: string; label: string };

/** Fields the merge dialog offers, in display order. Custom keys are added per record. */
export const MERGE_FIELDS: Record<MergeType, MergeField[]> = {
  organization: [
    { key: 'name', label: 'Name' },
    { key: 'industry', label: 'Industry' },
    { key: 'city', label: 'City' },
    { key: 'country', label: 'Country' },
    { key: 'address', label: 'Address' },
    { key: 'employee_band', label: 'Employees' },
    { key: 'owner_user_id', label: 'Record owner' },
    { key: 'account_manager_user_id', label: 'Account manager' },
    { key: 'relationship_status', label: 'Relationship' },
    { key: 'health', label: 'Health' },
    { key: 'linkedin_url', label: 'LinkedIn page' },
    { key: 'kvk_number', label: 'KvK number' },
    { key: 'vat_number', label: 'VAT number' },
    { key: 'annual_revenue', label: 'Annual revenue' },
    { key: 'description', label: 'Description' },
  ],
  contact: [
    { key: 'first_name', label: 'First name' },
    { key: 'last_name', label: 'Last name' },
    { key: 'job_title', label: 'Job title' },
    { key: 'tagline', label: 'LinkedIn headline' },
    { key: 'linkedin_url', label: 'LinkedIn URL' },
    { key: 'primary_org_id', label: 'Primary organization' },
    { key: 'owner_user_id', label: 'Record owner' },
    { key: 'city', label: 'City' },
    { key: 'country', label: 'Country' },
    { key: 'language', label: 'Language' },
    { key: 'lawful_basis', label: 'Lawful basis' },
    { key: 'do_not_contact', label: 'Do not contact' },
  ],
};

/** Columns that travel with another column. */
const COMPANIONS: Record<string, string[]> = { linkedin_url: ['linkedin_url_normalised'] };

const isEmpty = (v: unknown) => v === null || v === undefined || v === '' || (Array.isArray(v) && v.length === 0);

export type MergeFieldRow = {
  key: string;
  label: string;
  primary: unknown;
  other: unknown;
  primaryText: string;
  otherText: string;
  /** Default winner: primary unless it is empty. */
  pick: 'primary' | 'other';
  same: boolean;
};

async function loadRecord(db: Db, type: MergeType, id: string): Promise<Record<string, unknown> | null> {
  const [row] = await db.unsafe<{ j: Record<string, unknown> }[]>(`select to_jsonb(r) as j from ${TABLE[type]} r where id = $1`, [id]);
  return row?.j ?? null;
}

/** The side by side rows for the merge dialog. */
export async function mergeFields(db: Db, type: MergeType, primaryId: string, otherId: string): Promise<{ rows: MergeFieldRow[]; primary: Record<string, unknown>; other: Record<string, unknown> }> {
  const [a, b] = await Promise.all([loadRecord(db, type, primaryId), loadRecord(db, type, otherId)]);
  if (!a || !b) throw new SettingsError('One of the records no longer exists');
  const users = await db<{ id: string; name: string }[]>`select id, name from users`;
  const orgIds = type === 'contact' ? [a.primary_org_id, b.primary_org_id].filter(Boolean) as string[] : [];
  const orgs = orgIds.length ? await db<{ id: string; name: string }[]>`select id, name from organizations where id = any(${orgIds})` : [];
  const defs = await db<{ internal_name: string; label: string }[]>`
    select internal_name, label from field_definitions where object_type = ${type} and archived_at is null
       and field_type not in ('calculation', 'rollup') order by position`;
  const text = (key: string, v: unknown): string => {
    if (isEmpty(v)) return '';
    if (key === 'owner_user_id' || key === 'account_manager_user_id') return users.find((u) => u.id === v)?.name ?? 'Unknown user';
    if (key === 'primary_org_id') return orgs.find((o) => o.id === v)?.name ?? 'Unknown organization';
    if (typeof v === 'boolean') return v ? 'Yes' : 'No';
    if (Array.isArray(v)) return v.join(', ');
    return String(v);
  };
  const fields: MergeField[] = [...MERGE_FIELDS[type], ...defs.map((d) => ({ key: `custom.${d.internal_name}`, label: d.label }))];
  const get = (rec: Record<string, unknown>, key: string) =>
    key.startsWith('custom.') ? ((rec.custom ?? {}) as Record<string, unknown>)[key.slice(7)] : rec[key];
  const rows = fields.map((f) => {
    const p = get(a, f.key);
    const o = get(b, f.key);
    let pick: 'primary' | 'other' = isEmpty(p) && !isEmpty(o) ? 'other' : 'primary';
    if (f.key === 'do_not_contact' && o === true) pick = 'other'; // never lose a do not contact flag
    return { key: f.key, label: f.label, primary: p ?? null, other: o ?? null, primaryText: text(f.key, p), otherText: text(f.key, o), pick, same: JSON.stringify(p ?? null) === JSON.stringify(o ?? null) };
  });
  return { rows: rows.filter((r) => !(isEmpty(r.primary) && isEmpty(r.other))), primary: a, other: b };
}

export type MergeInput = {
  type: MergeType;
  winnerId: string;
  loserId: string;
  /** Field key to the side whose value the winner keeps. Missing keys use the default. */
  choices?: Record<string, 'primary' | 'other'>;
  userId: string | null;
};

type Moved = { table: string; column: string; ids: string[] };
type Unprimaried = { table: string; ids: string[] };
type DeletedRow = { table: string; row: Record<string, unknown> };

export type MergeSnapshot = {
  loser: Record<string, unknown>;
  winnerBefore: Record<string, unknown>;
  winnerAfter: Record<string, unknown>;
  deleted: DeletedRow[];
};

export type MergeMoved = { moved: Moved[]; unprimaried: Unprimaried[] };

function recordName(type: MergeType, r: Record<string, unknown>): string {
  return type === 'organization' ? String(r.name ?? 'Organization') : String(r.full_name ?? r.first_name ?? 'Contact');
}

/** Merge loser into winner. Returns the merge_log id. */
export async function mergeRecords(t: Tx, input: MergeInput): Promise<string> {
  const { type, winnerId, loserId } = input;
  if (winnerId === loserId) throw new SettingsError('Pick two different records');
  const table = TABLE[type];
  const locked = await t.unsafe<{ id: string }[]>(`select id from ${table} where id = any($1::uuid[]) and deleted_at is null for update`, [[winnerId, loserId]]);
  if (locked.length !== 2) throw new SettingsError('One of the records was deleted or merged already');

  const { rows } = await mergeFields(t, type, winnerId, loserId);
  const winner = (await loadRecord(t, type, winnerId))!;
  const loser = (await loadRecord(t, type, loserId))!;

  // 1. Loser out of the way first, so its unique values are free.
  await t.unsafe(`update ${table} set deleted_at = now() where id = $1`, [loserId]);

  // 2. Field winners.
  const cols: Record<string, unknown> = {};
  const customPatch: Record<string, unknown> = {};
  for (const r of rows) {
    const side = input.choices?.[r.key] ?? r.pick;
    if (side !== 'other' || r.same) continue;
    if (r.key.startsWith('custom.')) customPatch[r.key.slice(7)] = r.other;
    else {
      cols[r.key] = r.other;
      for (const c of COMPANIONS[r.key] ?? []) cols[c] = loser[c] ?? null;
    }
  }
  // Custom keys with no field definition (yet) follow the same rule: the winner's unless empty.
  const winnerCustom = (winner.custom ?? {}) as Record<string, unknown>;
  for (const [k, v] of Object.entries((loser.custom ?? {}) as Record<string, unknown>)) {
    if (k === 'sample' || rows.some((r) => r.key === `custom.${k}`)) continue;
    if (isEmpty(winnerCustom[k]) && !isEmpty(v)) customPatch[k] = v;
  }
  const winnerBefore: Record<string, unknown> = {};
  for (const k of Object.keys(cols)) winnerBefore[k] = winner[k] ?? null;
  for (const k of Object.keys(customPatch)) winnerBefore[`custom.${k}`] = ((winner.custom ?? {}) as Record<string, unknown>)[k] ?? null;
  if (Object.keys(cols).length) {
    await t.unsafe(
      `update ${table} r set ${Object.keys(cols).map((c) => `${c} = p.${c}`).join(', ')}
         from jsonb_populate_record(null::${table}, $2::text::jsonb) p where r.id = $1`,
      [winnerId, JSON.stringify(cols)],
    );
  }
  if (Object.keys(customPatch).length) {
    await t.unsafe(`update ${table} set custom = custom || $2::text::jsonb where id = $1`, [winnerId, JSON.stringify(customPatch)]);
  }

  // 3. Children.
  const moved: Moved[] = [];
  const unprimaried: Unprimaried[] = [];
  const deleted: DeletedRow[] = [];
  for (const m of MOVES[type]) {
    const extra = m.where ? ` and ${m.where}` : '';
    const sameKey = (m.uniqueWith ?? []).map((c) => `w.${c} = l.${c}`).join(' and ');
    const collide = m.uniqueWith ? `exists (select 1 from ${m.table} w where w.${m.column} = $2 and ${sameKey})` : 'false';
    if (m.uniqueWith && m.onConflict === 'delete') {
      const gone = await t.unsafe<{ row: Record<string, unknown> }[]>(
        `delete from ${m.table} l where l.${m.column} = $1${extra.replace(/ entity_type/g, ' l.entity_type')} and ${collide} returning to_jsonb(l) as row`,
        [loserId, winnerId],
      );
      for (const g of gone) deleted.push({ table: m.table, row: g.row });
    }
    if (m.primary) {
      const cond = m.primary.replace(/(is_\w+)/g, 'x.$1');
      const flagged = await t.unsafe<{ id: string }[]>(
        `update ${m.table} x set is_primary = false
          where x.${m.column} = $1 and ${cond}
            and exists (select 1 from ${m.table} w where w.${m.column} = $2 and ${m.primary.replace(/(is_\w+)/g, 'w.$1')})
          returning x.id`,
        [loserId, winnerId],
      );
      if (flagged.length) unprimaried.push({ table: m.table, ids: flagged.map((f) => f.id) });
    }
    const leave = m.uniqueWith && m.onConflict === 'leave' ? ` and not ${collide}` : '';
    const ids = await t.unsafe<{ id: string }[]>(
      `update ${m.table} l set ${m.column} = $2 where l.${m.column} = $1${extra.replace(/ entity_type/g, ' l.entity_type')}${leave} returning l.id::text as id`,
      [loserId, winnerId],
    );
    if (ids.length) moved.push({ table: m.table, column: m.column, ids: ids.map((r) => r.id) });
  }

  const winnerAfterRec = (await loadRecord(t, type, winnerId))!;
  const winnerAfter: Record<string, unknown> = {};
  for (const k of Object.keys(winnerBefore)) {
    winnerAfter[k] = k.startsWith('custom.') ? ((winnerAfterRec.custom ?? {}) as Record<string, unknown>)[k.slice(7)] ?? null : winnerAfterRec[k] ?? null;
  }

  const snapshot: MergeSnapshot = { loser, winnerBefore, winnerAfter, deleted };
  const movedLog: MergeMoved = { moved, unprimaried };
  const [log] = await t<{ id: string }[]>`
    insert into merge_log (object_type, winner_id, loser_id, snapshot, moved, merged_by)
    values (${type}, ${winnerId}, ${loserId}, ${t.json(snapshot as never)}, ${t.json(movedLog as never)}, ${input.userId})
    returning id`;

  const count = moved.reduce((n, m) => n + m.ids.length, 0);
  await logActivity(
    {
      kind: 'system',
      title: `Merged ${recordName(type, loser)} into this record`,
      body: `${count} linked ${count === 1 ? 'row' : 'rows'} moved. The merge can be undone from Settings, Duplicates.`,
      actorUserId: input.userId,
      source: 'system',
      links: [type === 'organization' ? { organizationId: winnerId } : { contactId: winnerId }],
      autoLink: false,
    },
    t,
  );
  return log.id;
}

export type UndoResult = { restoredFields: number; keptFields: number; moved: number; reinserted: number };

/** Undo a merge from its merge_log row. */
export async function undoMerge(t: Tx, mergeLogId: string, userId: string | null): Promise<UndoResult> {
  const [log] = await t<{ id: string; object_type: MergeType; winner_id: string; loser_id: string; snapshot: MergeSnapshot; moved: MergeMoved; undone_at: Date | null }[]>`
    select id, object_type, winner_id, loser_id, snapshot, moved, undone_at from merge_log where id = ${mergeLogId} for update`;
  if (!log) throw new SettingsError('That merge no longer exists');
  if (log.undone_at) throw new SettingsError('This merge was already undone');
  const type = log.object_type;
  const table = TABLE[type];
  const res: UndoResult = { restoredFields: 0, keptFields: 0, moved: 0, reinserted: 0 };

  // 1. Winner fields back, unless someone changed them since.
  const winner = await loadRecord(t, type, log.winner_id);
  if (winner) {
    const cols: Record<string, unknown> = {};
    const customSet: Record<string, unknown> = {};
    const customDrop: string[] = [];
    for (const [k, before] of Object.entries(log.snapshot.winnerBefore)) {
      const now = k.startsWith('custom.') ? ((winner.custom ?? {}) as Record<string, unknown>)[k.slice(7)] ?? null : winner[k] ?? null;
      if (JSON.stringify(now) !== JSON.stringify(log.snapshot.winnerAfter[k] ?? null)) {
        res.keptFields++;
        continue;
      }
      if (k.startsWith('custom.')) {
        if (before === null) customDrop.push(k.slice(7));
        else customSet[k.slice(7)] = before;
      } else {
        cols[k] = before; // companions such as linkedin_url_normalised are in winnerBefore too
      }
      res.restoredFields++;
    }
    if (Object.keys(cols).length) {
      await t.unsafe(
        `update ${table} r set ${Object.keys(cols).map((c) => `${c} = p.${c}`).join(', ')}
           from jsonb_populate_record(null::${table}, $2::text::jsonb) p where r.id = $1`,
        [log.winner_id, JSON.stringify(cols)],
      );
    }
    if (Object.keys(customSet).length) await t.unsafe(`update ${table} set custom = custom || $2::text::jsonb where id = $1`, [log.winner_id, JSON.stringify(customSet)]);
    for (const key of customDrop) {
      if (/^[a-z][a-z0-9_]{0,62}$/.test(key)) await t.unsafe(`update ${table} set custom = custom - '${key}' where id = $1`, [log.winner_id]);
    }
  }

  // 2. Loser back.
  await t.unsafe(`update ${table} set deleted_at = $2 where id = $1`, [log.loser_id, (log.snapshot.loser.deleted_at as string | null) ?? null]);

  // 3. Children back.
  const known = new Set(MOVES[type].map((m) => `${m.table}.${m.column}`));
  for (const m of log.moved.moved) {
    if (!known.has(`${m.table}.${m.column}`)) continue;
    const back = await t.unsafe<{ id: string }[]>(
      `update ${m.table} set ${m.column} = $1 where id::text = any($2::text[]) and ${m.column} = $3 returning id`,
      [log.loser_id, m.ids, log.winner_id],
    );
    res.moved += back.length;
  }
  for (const u of log.moved.unprimaried) {
    if (!MOVES[type].some((m) => m.table === u.table && m.primary)) continue;
    await t.unsafe(`update ${u.table} set is_primary = true where id::text = any($1::text[])`, [u.ids]);
  }
  for (const d of log.snapshot.deleted) {
    if (!MOVES[type].some((m) => m.table === d.table)) continue;
    await t.unsafe(`insert into ${d.table} select * from jsonb_populate_record(null::${d.table}, $1::text::jsonb) on conflict do nothing`, [JSON.stringify(d.row)]);
    res.reinserted++;
  }

  await t`update merge_log set undone_at = now(), undone_by = ${userId} where id = ${log.id}`;
  await logActivity(
    {
      kind: 'system',
      title: `Merge with ${recordName(type, log.snapshot.loser)} undone`,
      actorUserId: userId,
      source: 'system',
      links: [type === 'organization' ? { organizationId: log.winner_id } : { contactId: log.winner_id }],
      autoLink: false,
    },
    t,
  );
  return res;
}

export type MergeLogRow = {
  id: string;
  object_type: MergeType;
  winner_id: string;
  loser_id: string;
  winner_name: string | null;
  loser_name: string;
  moved_count: number;
  merged_by_name: string | null;
  merged_at: Date;
  undone_at: Date | null;
};

export async function listMerges(db: Db = sql, limit = 30): Promise<MergeLogRow[]> {
  return db<MergeLogRow[]>`
    select m.id, m.object_type, m.winner_id, m.loser_id,
           coalesce(o.name, c.full_name) as winner_name,
           coalesce(m.snapshot -> 'loser' ->> 'name', m.snapshot -> 'loser' ->> 'full_name', 'Record') as loser_name,
           (select coalesce(sum(jsonb_array_length(x -> 'ids')), 0)::int from jsonb_array_elements(m.moved -> 'moved') x) as moved_count,
           u.name as merged_by_name, m.merged_at, m.undone_at
      from merge_log m
      left join organizations o on m.object_type = 'organization' and o.id = m.winner_id
      left join contacts c on m.object_type = 'contact' and c.id = m.winner_id
      left join users u on u.id = m.merged_by
     order by m.merged_at desc limit ${limit}`;
}
