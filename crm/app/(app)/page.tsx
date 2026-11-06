/**
 * Home, "Your day" (agent C). Matches design/Main.dc.html: the whose day switch
 * (?user=raka|josh|luna), live KPI tiles, that person's tasks for today and
 * overdue, the approval queue and the reminders panel.
 */
import Link from 'next/link';
import { requireUser } from '@/lib/auth';
import { can, isAdmin } from '@/lib/permissions';
import { formatDayLong } from '@/lib/format';
import { Card, CardHead, Segmented } from '@/components/ui';
import { TaskList } from '@/components/work/TaskList';
import { HomeApproval } from '@/components/work/Approvals';
import { dayPeople, findPerson, homeKpis, orderPeople } from '@/lib/work/home';
import { dayTasks } from '@/lib/work/tasks';
import { toTaskView } from '@/lib/work/view';
import { listQueue, queueCounts, sendEnabled } from '@/lib/work/approvals';
import { toMessageView } from '@/lib/work/messageView';
import { upcomingReminders } from '@/lib/work/reminders';
import '@/components/work/work.css';

export const dynamic = 'force-dynamic';

export default async function HomePage({ searchParams }: { searchParams: Promise<{ user?: string }> }) {
  const me = await requireUser();
  const sp = await searchParams;
  const people = orderPeople(await dayPeople(), me.id);
  const person = findPerson(people, sp.user) ?? people.find((p) => p.id === me.id) ?? people[0];
  const isMe = !person || person.id === me.id;
  const now = new Date();
  const visibleTo = { id: me.id, isAdmin: isAdmin(me) };
  const sendOn = sendEnabled();

  const [kpis, day, queue, counts, reminders] = await Promise.all([
    homeKpis(),
    person ? dayTasks(person.id) : Promise.resolve({ open: [], done: [] }),
    listQueue({ statuses: ['awaiting_approval'], visibleTo, limit: 4 }),
    queueCounts(visibleTo),
    upcomingReminders({ now }),
  ]);

  const viewOpts = {
    now,
    canToggle: (i: { ownerUserId: string | null }) => can(me, 'edit', 'task', { owner_user_id: i.ownerUserId }),
    editHref: (i: { id: string }) => `/tasks?task=${i.id}`,
  };
  const items = [
    ...day.open.map((i) => toTaskView(i, { ...viewOpts, dueStyle: 'home' })),
    ...day.done.map((i) => toTaskView(i, { ...viewOpts, dueStyle: 'home', done: true })),
  ];
  const name = person?.label ?? 'Your';
  const headline = isMe ? 'Your day' : `${name}'s day`;

  return (
    <div className="page">
      <div className="wk-home-head">
        <div>
          <div className="page-eyebrow">{formatDayLong(now)}</div>
          <h1 className="wk-home-title">{headline}</h1>
        </div>
        <Segmented label="Whose day" value={person?.slug ?? ''} items={people.map((p) => ({ value: p.slug, label: p.label, href: `/?user=${p.slug}` }))} />
      </div>

      <section aria-label="Key numbers" className="wk-kpis">
        {kpis.map((k) => (
          <Link key={k.key} href={k.href} className={`stat wk-kpi${k.tone === 'red' ? ' wk-kpi-red' : ''}`}>
            <span className="stat-label">{k.label}</span>
            <span className="stat-value">{k.value}</span>
            <span className="stat-sub">{k.sub}</span>
          </Link>
        ))}
      </section>

      <div className="wk-columns">
        <Card className="wk-col-main" aria-labelledby="tasks-h">
          <CardHead
            id="tasks-h"
            title={`${name}'s tasks, ${day.open.length} open`}
            actions={
              <Link href={person ? `/tasks?owner=${person.slug}` : '/tasks'} className="wk-head-link">
                All tasks
              </Link>
            }
          />
          <TaskList
            variant="home"
            groups={[{ key: 'day', items, empty: `Nothing due today or overdue for ${isMe ? 'you' : name}.` }]}
          />
        </Card>

        <div className="wk-col-side">
          <Card aria-labelledby="appr-h">
            <CardHead
              id="appr-h"
              title="Waiting for your go"
              sub="Nothing sends without it"
              actions={
                <Link href="/approvals" className="wk-head-link">
                  {counts.awaiting > queue.length ? `All ${counts.awaiting}` : 'Queue'}
                </Link>
              }
            />
            {queue.length === 0 ? (
              <div className="wk-empty-note">Nothing waiting for approval. Drafts land here before anything goes out.</div>
            ) : (
              queue.map((m) => <HomeApproval key={m.id} m={toMessageView(m, me, now)} sendOn={sendOn} />)
            )}
            {!sendOn && queue.length ? (
              <div className="card-foot">Sending is off in this version. Approving marks a message approved and nothing goes out.</div>
            ) : null}
          </Card>

          <Card aria-labelledby="rem-h">
            <CardHead id="rem-h" title="Reminders" />
            {reminders.length === 0 ? <div className="wk-empty-note">No check ins, renewals, late invoices or ticket deadlines coming up.</div> : null}
            {reminders.slice(0, 8).map((r) => (
              <Link key={r.key} href={r.href} className="wk-rem">
                <span className={`wk-rem-dot ${r.tone}`} aria-hidden="true" />
                <span className="grow" style={{ minWidth: 0 }}>
                  <span className="wk-rem-title" style={{ display: 'block' }}>
                    {r.title}
                  </span>
                  <span className="wk-rem-sub" style={{ display: 'block' }}>
                    {r.sub}
                  </span>
                </span>
              </Link>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
}
