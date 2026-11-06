/**
 * /tasks (agent C), design/Tasks.dc.html. Owner views (?owner=me by default,
 * all, queue or a person's slug), the five buckets, tick and untick, and the
 * create and edit drawer (?new=1 from the header New menu, ?task=<id> to edit).
 */
import { requireUser } from '@/lib/auth';
import { can } from '@/lib/permissions';
import { taskBuckets } from '@/lib/tasks';
import { ButtonLink, EmptyState, PageHeader, Segmented } from '@/components/ui';
import { TaskList } from '@/components/work/TaskList';
import { TaskDrawer } from '@/components/work/TaskDrawer';
import { dayPeople, findPerson, orderPeople } from '@/lib/work/home';
import { doneTasks, loadTask } from '@/lib/work/tasks';
import { bucketGroups } from '@/lib/work/view';
import '@/components/work/work.css';

export const dynamic = 'force-dynamic';

type Search = { owner?: string; new?: string; task?: string };

export default async function TasksPage({ searchParams }: { searchParams: Promise<Search> }) {
  const me = await requireUser();
  const sp = await searchParams;
  const people = orderPeople(await dayPeople(), me.id);
  const meSlug = people.find((p) => p.id === me.id)?.slug ?? 'me';

  const ownerKey = !sp.owner || sp.owner === 'me' ? meSlug : sp.owner.toLowerCase();
  const person = ownerKey === 'all' || ownerKey === 'queue' ? undefined : findPerson(people, ownerKey);
  const view = ownerKey === 'all' ? 'all' : ownerKey === 'queue' ? 'queue' : person?.slug ?? meSlug;
  const owner: string | null | 'all' = view === 'all' ? 'all' : view === 'queue' ? null : person?.id ?? me.id;

  const now = new Date();
  const [buckets, done, editing] = await Promise.all([
    taskBuckets({ owner }),
    doneTasks({ owner, days: 14 }),
    sp.task ? loadTask(sp.task) : Promise.resolve(null),
  ]);

  const base = view === meSlug ? '/tasks' : `/tasks?owner=${view}`;
  const withParam = (k: string, v: string) => `${base}${base.includes('?') ? '&' : '?'}${k}=${v}`;
  const groups = bucketGroups(buckets, done, {
    now,
    canToggle: (i) => can(me, 'edit', 'task', { owner_user_id: i.ownerUserId }),
    editHref: (i) => withParam('task', i.id),
  });

  const summary = `${buckets.counts.open} open, ${buckets.counts.overdue} overdue. Overdue is worked out from the due date, never stored.`;
  const drawerOpen = sp.new === '1' || !!editing;
  const defaultOwner = view === 'queue' ? null : owner === 'all' || owner === null ? me.id : owner;
  const segments = [
    { value: 'all', label: 'Everyone', href: '/tasks?owner=all' },
    ...people.map((p) => ({ value: p.slug, label: p.label, href: p.id === me.id ? '/tasks' : `/tasks?owner=${p.slug}` })),
    { value: 'queue', label: 'Unassigned', href: '/tasks?owner=queue' },
  ];
  const hasAny = groups.some((g) => g.items.length > 0);

  return (
    <div className="page">
      <PageHeader
        title="Tasks"
        subtitle={summary}
        actions={
          can(me, 'create', 'task') ? (
            <ButtonLink href={withParam("new", "1")} variant="primary">
              New task
            </ButtonLink>
          ) : null
        }
      />
      <div className="row" style={{ flexWrap: 'wrap' }}>
        <Segmented label="Owner" value={view} items={segments} />
      </div>
      {sp.task && !editing ? <div className="wk-toast wk-toast-error">That task no longer exists.</div> : null}
      {hasAny ? (
        <TaskList variant="tasks" groups={groups} />
      ) : (
        <EmptyState
          title={view === 'queue' ? 'The unassigned queue is empty' : 'No tasks here'}
          body="Tasks with no owner land in the unassigned queue. Repeating tasks create their next one when they are done."
          action={<ButtonLink href={withParam('new', '1')} variant="secondary">New task</ButtonLink>}
        />
      )}
      <TaskDrawer
        open={drawerOpen}
        task={editing}
        people={people.map((p) => ({ id: p.id, label: p.label }))}
        defaultOwner={defaultOwner}
        closeHref={base}
      />
    </div>
  );
}
