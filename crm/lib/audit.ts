/**
 * lib/audit.ts, reading the audit log. Writing needs nothing: a trigger on every
 * core table writes audit_log with old and new jsonb and the actor that tx()
 * set. Use these helpers for field history and the /settings/audit viewer.
 *
 *   const history = await recordHistory('deals', dealId);         // newest first
 *   await logSecurityEvent(sql, 'export', { objectType: 'contact', rows: 120 }, user.id); // logins, exports
 */
import { sql, type Db, type Tx } from './db';

export type AuditEntry = {
  id: string;
  table_name: string;
  record_id: string | null;
  action: 'insert' | 'update' | 'delete';
  old_data: Record<string, unknown> | null;
  new_data: Record<string, unknown> | null;
  changed_fields: string[] | null;
  actor_user_id: string | null;
  actor_name: string | null;
  actor_source: string | null;
  occurred_at: Date;
};

/** Every audit row for one record, newest first. table is the table name, for example 'organizations'. */
export async function recordHistory(table: string, recordId: string, limit = 200, db: Db = sql): Promise<AuditEntry[]> {
  return db<AuditEntry[]>`
    select a.id::text, a.table_name, a.record_id, a.action, a.old_data, a.new_data, a.changed_fields,
           a.actor_user_id, u.name as actor_name, a.actor_source, a.occurred_at
      from audit_log a left join users u on u.id = a.actor_user_id
     where a.table_name = ${table} and a.record_id = ${recordId}
     order by a.occurred_at desc, a.id desc
     limit ${limit}`;
}

export type AuditQuery = { table?: string; actorUserId?: string; action?: string; before?: string; limit?: number };

/** A page of the audit log for the viewer. Pass before (an audit id) to page back. */
export async function listAudit(q: AuditQuery = {}, db: Db = sql): Promise<AuditEntry[]> {
  const limit = Math.min(q.limit ?? 100, 500);
  return db<AuditEntry[]>`
    select a.id::text, a.table_name, a.record_id, a.action, a.old_data, a.new_data, a.changed_fields,
           a.actor_user_id, u.name as actor_name, a.actor_source, a.occurred_at
      from audit_log a left join users u on u.id = a.actor_user_id
     where (${q.table ?? null}::text is null or a.table_name = ${q.table ?? null})
       and (${q.actorUserId ?? null}::uuid is null or a.actor_user_id = ${q.actorUserId ?? null})
       and (${q.action ?? null}::text is null or a.action = ${q.action ?? null})
       and (${q.before ?? null}::bigint is null or a.id < ${q.before ?? null}::bigint)
     order by a.id desc
     limit ${limit}`;
}

/** Security events that touch no table row (sign in, export). Written as table_name 'security'. */
export async function logSecurityEvent(
  t: Tx | Db,
  event: string,
  details: Record<string, unknown> = {},
  actorUserId?: string | null,
): Promise<void> {
  await t`
    insert into audit_log (table_name, record_id, action, new_data, actor_user_id, actor_source)
    values ('security', ${event}, 'insert', ${t.json(details as never)},
            coalesce(${actorUserId ?? null}::uuid, nullif(current_setting('app.user_id', true), '')::uuid),
            coalesce(nullif(current_setting('app.source', true), ''), 'ui'))`;
}
