/**
 * lib/settings/reasons.ts, the writes behind /settings/reasons: add, rename,
 * reorder, archive and restore a disqualify reason (leads) or lost reason (deals).
 * Keys never change once made, so records keep pointing at the right reason when
 * its label is renamed. Reasons in use are archived, never deleted.
 *
 *   await addReason(t, 'deal_lost', 'Picked a freelancer');
 *   await renameReason(t, id, 'Went with a freelancer');
 *   await moveReason(t, id, 'up');
 *   await setReasonArchived(t, id, true);
 */
import type { Db, Tx } from '@/lib/db';
import type { ReasonType } from '@/lib/reasons';
import { slugKey } from './core-fields';
import { SettingsError } from './errors';

export const REASON_TYPES: ReasonType[] = ['lead_disqualify', 'deal_lost'];

export type ReasonRow = { id: string; object_type: ReasonType; key: string; label: string; position: number; is_archived: boolean; in_use: number };

/** Every reason of both lists with how many records hold it. */
export async function listReasonRows(db: Db): Promise<ReasonRow[]> {
  return db<ReasonRow[]>`
    select r.id, r.object_type, r.key, r.label, r.position, r.is_archived,
           case r.object_type
             when 'lead_disqualify' then (select count(*)::int from leads l where l.disqualify_reason = r.key and l.deleted_at is null)
             else (select count(*)::int from deals d where d.lost_reason = r.key and d.deleted_at is null)
           end as in_use
      from reason_options r
     order by r.object_type, r.is_archived, r.position, r.label`;
}

function cleanLabel(label: string | null | undefined): string {
  const l = (label ?? '').replace(/\s+/g, ' ').trim();
  if (!l) throw new SettingsError('Give the reason a name', { label: 'Give the reason a name' });
  if (l.length > 80) throw new SettingsError('Keep the name under 80 characters', { label: 'Keep it under 80 characters' });
  return l;
}

async function assertLabelFree(t: Tx, type: ReasonType, label: string, exceptId: string | null) {
  const [dupe] = await t<{ id: string; is_archived: boolean }[]>`
    select id, is_archived from reason_options
     where object_type = ${type} and lower(label) = lower(${label}) and (${exceptId}::uuid is null or id <> ${exceptId})`;
  if (dupe) {
    throw new SettingsError(
      dupe.is_archived ? 'An archived reason has that name, restore it instead' : 'That reason is already on the list',
      { label: 'Already on the list' },
    );
  }
}

async function renumber(t: Tx, type: ReasonType) {
  const rows = await t<{ id: string }[]>`
    select id from reason_options where object_type = ${type} order by is_archived, position, label`;
  for (let i = 0; i < rows.length; i++) await t`update reason_options set position = ${i} where id = ${rows[i].id} and position <> ${i}`;
}

async function reasonById(t: Tx, id: string) {
  const [r] = await t<{ id: string; object_type: ReasonType; key: string; label: string; position: number; is_archived: boolean }[]>`
    select id, object_type, key, label, position, is_archived from reason_options where id = ${id} for update`;
  if (!r) throw new SettingsError('That reason no longer exists');
  return r;
}

export async function addReason(t: Tx, type: ReasonType, label: string): Promise<string> {
  if (!REASON_TYPES.includes(type)) throw new SettingsError('Pick a list');
  const l = cleanLabel(label);
  await assertLabelFree(t, type, l, null);
  const base = slugKey(l).replace(/^f_/, 'r_') || 'reason';
  let key = base;
  for (let i = 2; ; i++) {
    const [taken] = await t<{ n: number }[]>`select count(*)::int as n from reason_options where object_type = ${type} and key = ${key}`;
    if (!taken.n) break;
    key = `${base.slice(0, 55)}_${i}`;
  }
  const [row] = await t<{ id: string }[]>`
    insert into reason_options (object_type, key, label, position)
    values (${type}, ${key}, ${l}, coalesce((select max(position) + 1 from reason_options where object_type = ${type} and not is_archived), 0))
    returning id`;
  await renumber(t, type);
  return row.id;
}

export async function renameReason(t: Tx, id: string, label: string): Promise<void> {
  const r = await reasonById(t, id);
  const l = cleanLabel(label);
  if (l === r.label) return;
  await assertLabelFree(t, r.object_type, l, id);
  await t`update reason_options set label = ${l} where id = ${id}`;
}

export async function moveReason(t: Tx, id: string, dir: 'up' | 'down'): Promise<void> {
  const r = await reasonById(t, id);
  if (r.is_archived) throw new SettingsError('Restore the reason before moving it');
  const live = await t<{ id: string }[]>`
    select id from reason_options where object_type = ${r.object_type} and not is_archived order by position, label`;
  const i = live.findIndex((x) => x.id === id);
  const j = dir === 'up' ? i - 1 : i + 1;
  if (i < 0 || j < 0 || j >= live.length) return;
  [live[i], live[j]] = [live[j], live[i]];
  for (let k = 0; k < live.length; k++) await t`update reason_options set position = ${k} where id = ${live[k].id}`;
  await renumber(t, r.object_type);
}

export async function setReasonArchived(t: Tx, id: string, archived: boolean): Promise<void> {
  const r = await reasonById(t, id);
  if (r.is_archived === archived) return;
  if (archived) {
    const [live] = await t<{ n: number }[]>`
      select count(*)::int as n from reason_options where object_type = ${r.object_type} and not is_archived and id <> ${id}`;
    if (!live.n) throw new SettingsError('Keep at least one active reason, records need one to be closed');
    await t`update reason_options set is_archived = true where id = ${id}`;
  } else {
    await t`
      update reason_options set is_archived = false,
             position = coalesce((select max(position) + 1 from reason_options where object_type = ${r.object_type} and not is_archived), 0)
       where id = ${id}`;
  }
  await renumber(t, r.object_type);
}
