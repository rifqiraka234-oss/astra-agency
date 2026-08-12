import { csrfToken, requireSession } from '@/lib/auth';
import { retryDeadLetterAction } from '@/lib/actions';
import { loadDeadLetters } from '@/lib/queries';

export const dynamic = 'force-dynamic';

/**
 * Dead-letter queue. Retrying marks the entry resolved and lets the next
 * inbound event re-enter the pipeline normally; it deliberately does not
 * replay a half-finished send, because the send path re-derives everything
 * from live state anyway.
 */
export default async function ErrorsPage() {
  await requireSession();
  const [deadLetters, csrf] = await Promise.all([loadDeadLetters(), csrfToken()]);

  return (
    <>
      <h1 style={{ fontSize: 20 }}>Errors</h1>
      <section className="panel">
        <h2>Dead letters ({deadLetters.length})</h2>
        {deadLetters.length === 0 ? (
          <p className="muted">Nothing has been dead-lettered.</p>
        ) : (
          deadLetters.map((entry) => (
            <div className="row" key={entry.id}>
              <span className="tag">{entry.source}</span>
              <span className="grow mono">{entry.errorDetail}</span>
              <span className="muted">{entry.attempts} attempts</span>
              <span className="muted mono">{entry.createdAt.slice(0, 16).replace('T', ' ')}</span>
              <form action={retryDeadLetterAction}>
                <input type="hidden" name="csrf" value={csrf} />
                <input type="hidden" name="deadLetterId" value={entry.id} />
                <button type="submit">Retry</button>
              </form>
            </div>
          ))
        )}
      </section>
    </>
  );
}
