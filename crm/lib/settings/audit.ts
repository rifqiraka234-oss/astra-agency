/**
 * lib/settings/audit.ts, the /settings/audit viewer query. Filters by table,
 * record id, user and action, newest first, paged by audit id.
 *
 *   const page = await auditPage(sql, { table: 'deals', recordId, before, limit: 50 });
 *   page.rows, page.nextBefore (null on the last page)
 */
import type { Db } from '@/lib/db';
import type { AuditEntry } from '@/lib/audit';

export type AuditFilters = { table?: string | null; recordId?: string | null; actorUserId?: string | null; action?: string | null; source?: string | null; before?: string | null; limit?: number };

export async function auditPage(db: Db, f: AuditFilters): Promise<{ rows: AuditEntry[]; nextBefore: string | null }> {
  const limit = Math.min(Math.max(f.limit ?? 50, 1), 200);
  const before = f.before && /^\d+$/.test(f.before) ? f.before : null;
  const actor = f.actorUserId && /^[0-9a-f-]{36}$/i.test(f.actorUserId) ? f.actorUserId : null;
  const rows = await db<AuditEntry[]>`
    select a.id::text, a.table_name, a.record_id, a.action, a.old_data, a.new_data, a.changed_fields,
           a.actor_user_id, u.name as actor_name, a.actor_source, a.occurred_at
      from audit_log a left join users u on u.id = a.actor_user_id
     where (${f.table ?? null}::text is null or a.table_name = ${f.table ?? null})
       and (${f.recordId ?? null}::text is null or a.record_id = ${f.recordId ?? null})
       and (${actor}::uuid is null or a.actor_user_id = ${actor})
       and (${f.action ?? null}::text is null or a.action = ${f.action ?? null})
       and (${f.source ?? null}::text is null or a.actor_source = ${f.source ?? null})
       and (${before}::bigint is null or a.id < ${before}::bigint)
     order by a.id desc
     limit ${limit + 1}`;
  const more = rows.length > limit;
  const page = more ? rows.slice(0, limit) : rows;
  return { rows: page, nextBefore: more ? page[page.length - 1].id : null };
}

export async function auditTables(db: Db): Promise<string[]> {
  const rows = await db<{ table_name: string }[]>`
    select table_name from (select distinct table_name from audit_log) x order by table_name`;
  return rows.map((r) => r.table_name);
}

/** The fields to show for one entry: changed ones for an update, all for insert and delete. */
export function auditDiff(e: Pick<AuditEntry, 'action' | 'old_data' | 'new_data' | 'changed_fields'>): { field: string; old: unknown; new: unknown }[] {
  const skip = new Set(['updated_at', 'created_at']);
  if (e.action === 'update') {
    const keys = e.changed_fields ?? Object.keys(e.new_data ?? {}).filter((k) => JSON.stringify(e.new_data?.[k]) !== JSON.stringify(e.old_data?.[k]));
    return keys.filter((k) => !skip.has(k)).map((k) => ({ field: k, old: e.old_data?.[k] ?? null, new: e.new_data?.[k] ?? null }));
  }
  const src = (e.action === 'insert' ? e.new_data : e.old_data) ?? {};
  return Object.keys(src)
    .filter((k) => !skip.has(k) && src[k] !== null && !(typeof src[k] === 'object' && src[k] !== null && Object.keys(src[k] as object).length === 0))
    .map((k) => ({ field: k, old: e.action === 'delete' ? src[k] : null, new: e.action === 'insert' ? src[k] : null }));
}
