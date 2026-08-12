import { getPool } from '@astra/db';
import { requireSession } from '@/lib/auth';

export const dynamic = 'force-dynamic';

/**
 * Audit export.
 *
 * Shows the most recent entries and offers the whole table as newline
 * delimited JSON. Payloads were redacted before insert, so exporting cannot
 * leak a credential that was never stored in the first place.
 */
export default async function AuditPage() {
  await requireSession();

  const rows = await getPool().query<{
    occurred_at: Date;
    actor: string;
    action: string;
    reason_code: string | null;
    conversation_id: string | null;
  }>(
    `SELECT occurred_at, actor, action, reason_code, conversation_id
     FROM audit_events ORDER BY occurred_at DESC LIMIT 200`,
  );

  return (
    <>
      <h1 style={{ fontSize: 20 }}>Audit</h1>
      <p className="muted">
        Most recent 200 entries. <a href="/api/audit-export">Download the full log as JSONL</a>.
      </p>
      <section className="panel">
        {rows.rows.map((row, index) => (
          <div className="row" key={index}>
            <span className="muted mono">{row.occurred_at.toISOString().replace('T', ' ').slice(0, 19)}</span>
            <span className="mono">{row.action}</span>
            <span className="tag">{row.actor}</span>
            <span className="grow muted">{row.reason_code ?? ''}</span>
            {row.conversation_id ? (
              <a href={`/conversations/${row.conversation_id}`}>open</a>
            ) : null}
          </div>
        ))}
      </section>
    </>
  );
}
