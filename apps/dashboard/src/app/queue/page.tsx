import Link from 'next/link';
import { requireSession } from '@/lib/auth';
import { QUEUE_BUCKET_LABELS, loadQueue, type QueueBucket } from '@/lib/queries';

export const dynamic = 'force-dynamic';

/**
 * The queue.
 *
 * Ordered by how much a human is blocking: approvals first, then handoffs,
 * then work in progress, then the things that already resolved themselves.
 * An empty bucket is still shown, so "nothing is waiting for me" is a visible
 * state rather than an absence.
 */
export default async function QueuePage() {
  await requireSession();
  const buckets = await loadQueue();

  const order: QueueBucket[] = [
    'NEEDS_APPROVAL',
    'HUMAN_HANDOFF',
    'PROTOTYPE',
    'MEETING',
    'ERROR',
    'RECENTLY_AUTOMATED',
  ];

  return (
    <>
      <h1 style={{ fontSize: 20 }}>Queue</h1>
      {order.map((bucket) => (
        <section className="panel" key={bucket}>
          <h2>
            {QUEUE_BUCKET_LABELS[bucket]} ({buckets[bucket].length})
          </h2>
          {buckets[bucket].length === 0 ? (
            <p className="muted">Nothing here.</p>
          ) : (
            buckets[bucket].map((item) => (
              <div className="row" key={item.conversationId}>
                <div className="grow">
                  <Link href={`/conversations/${item.conversationId}`}>
                    <strong>{item.contactName}</strong>
                  </Link>{' '}
                  {item.companyName ? <span className="muted">{item.companyName}</span> : null}
                  <div className="muted">{item.latestReason ?? 'No decision recorded yet.'}</div>
                </div>
                <span className="tag">{item.channel}</span>
                <span className="tag">{item.state}</span>
                <span className="tag">{item.owner}</span>
                {item.approvalId ? <span className="tag tag-fail">{item.approvalAction}</span> : null}
                <span className="muted mono">{item.lastActivityAt.slice(0, 16).replace('T', ' ')}</span>
              </div>
            ))
          )}
        </section>
      ))}
    </>
  );
}
