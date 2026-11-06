/**
 * /approvals (agent C). The outbound message queue: Awaiting approval, Approved,
 * Sent and Drafts (rejected messages sit in Drafts with their reason). Approve
 * stores who, when, their words and the exact text. Nothing here sends while
 * SEND_ENABLED is off, which is the V1 default.
 */
import { requireUser } from '@/lib/auth';
import { isAdmin } from '@/lib/permissions';
import { EmptyState, PageHeader, Tabs } from '@/components/ui';
import { QueueCard } from '@/components/work/Approvals';
import { listQueue, QUEUE_TABS, queueCounts, sendEnabled, type QueueTab } from '@/lib/work/approvals';
import { toMessageView } from '@/lib/work/messageView';
import '@/components/work/work.css';

export const dynamic = 'force-dynamic';

const EMPTY: Record<QueueTab, { title: string; body: string }> = {
  awaiting: { title: 'Nothing waiting for approval', body: 'Openers, nudges and replies land here once a draft is ready for a go.' },
  approved: { title: 'Nothing approved yet', body: 'Approved messages wait here. With sending off they stay here.' },
  sent: { title: 'Nothing sent from the CRM', body: 'Sending is a later version. Messages sent elsewhere show on the record timelines.' },
  drafts: { title: 'No drafts', body: 'Drafts and rejected messages sit here until they are ready for approval.' },
};

export default async function ApprovalsPage({ searchParams }: { searchParams: Promise<{ tab?: string }> }) {
  const me = await requireUser();
  const sp = await searchParams;
  const tab = (QUEUE_TABS.find((t) => t.id === sp.tab)?.id ?? 'awaiting') as QueueTab;
  const visibleTo = { id: me.id, isAdmin: isAdmin(me) };
  const sendOn = sendEnabled();
  const statuses = QUEUE_TABS.find((t) => t.id === tab)!.statuses;
  const [items, counts] = await Promise.all([listQueue({ statuses, visibleTo }), queueCounts(visibleTo)]);
  const now = new Date();

  return (
    <div className="page">
      <PageHeader
        title="Approvals"
        subtitle="Every outbound message waits here for a go. The approval keeps who said yes, when, their words and the exact text they approved."
      />
      {!sendOn ? (
        <div className="wk-banner" role="note">
          Sending is off in this version. Approve marks a message approved and nothing goes out to lemlist or Gmail.
        </div>
      ) : (
        <div className="wk-banner" role="note">
          Sending is switched on, but no sending channel is connected yet, so approved messages wait in Approved.
        </div>
      )}
      <Tabs
        label="Queue"
        active={tab}
        items={QUEUE_TABS.map((t) => ({ id: t.id, label: t.label, count: counts[t.id], href: t.id === 'awaiting' ? '/approvals' : `/approvals?tab=${t.id}` }))}
      />
      {items.length === 0 ? (
        <EmptyState title={EMPTY[tab].title} body={EMPTY[tab].body} />
      ) : (
        <div className="wk-queue">
          {items.map((m) => (
            <QueueCard key={`${m.id}:${m.status}:${m.updatedAt.getTime()}`} m={toMessageView(m, me, now)} sendOn={sendOn} />
          ))}
        </div>
      )}
    </div>
  );
}
