import { afterAll, describe, expect, it } from 'vitest';
import { closeDb, type Tx } from '../../lib/db';
import { completeTask, createTask, reopenTask, taskBuckets } from '../../lib/tasks';
import { addDaysKey, amsterdamTime, formatTime, dayKey, todayKey } from '../../lib/format';
import { doneTasks, loadTask, parseTaskForm, saveTask } from '../../lib/work/tasks';
import { bucketGroups, dueLabel } from '../../lib/work/view';
import { withRollback } from '../helpers';

afterAll(() => closeDb());

async function testUser(t: Tx, slug: string): Promise<string> {
  const [u] = await t<{ id: string }[]>`
    insert into users (email, name, role) values (${`${slug}@c-test.local`}, ${`C Test ${slug}`}, 'sales') returning id`;
  return u.id;
}

function form(values: Record<string, string | string[]>): FormData {
  const fd = new FormData();
  for (const [k, v] of Object.entries(values)) for (const x of Array.isArray(v) ? v : [v]) fd.append(k, x);
  return fd;
}

describe('recurring tasks', () => {
  it('quarterly on the first Monday: the next one lands on the first Monday three months on, same wall clock time', async () => {
    await withRollback(async (t) => {
      const owner = await testUser(t, 'rec1');
      // 7 Jan 2030 is the first Monday of January (winter time). 1 Apr 2030 is the first Monday of April (summer time).
      const { id } = await createTask(
        { title: 'Quarterly check in', type: 'checkin', ownerUserId: owner, dueAt: amsterdamTime('2030-01-07', '11:00'), recurrenceRule: 'FREQ=MONTHLY;INTERVAL=3;BYDAY=1MO', remindBeforeMinutes: 1440 },
        t,
      );
      const res = await completeTask(id, owner, t);
      expect(res.completed).toBe(true);
      expect(res.nextTaskId).toBeTruthy();
      const [next] = await t<{ due_at: Date; recurrence_rule: string; recurrence_parent_id: string; created_from: string; owner_user_id: string; status: string }[]>`
        select due_at, recurrence_rule, recurrence_parent_id, created_from, owner_user_id, status from tasks where id = ${res.nextTaskId}`;
      expect(dayKey(next.due_at)).toBe('2030-04-01');
      expect(formatTime(next.due_at)).toBe('11:00');
      expect(next.recurrence_rule).toBe('FREQ=MONTHLY;INTERVAL=3;BYDAY=1MO');
      expect(next.recurrence_parent_id).toBe(id);
      expect(next.created_from).toBe('recurrence');
      expect(next.owner_user_id).toBe(owner);
      expect(next.status).toBe('not_started');
      // The next one carries its own reminder, a day before.
      const [rem] = await t<{ remind_at: Date }[]>`select remind_at from reminders where task_id = ${res.nextTaskId}`;
      expect(rem.remind_at.getTime()).toBe(amsterdamTime('2030-03-31', '11:00').getTime());
      // Completing twice does nothing more.
      const again = await completeTask(id, owner, t);
      expect(again).toEqual({ completed: false, nextTaskId: null });
      const [{ n }] = await t<{ n: number }[]>`select count(*)::int as n from tasks where recurrence_parent_id = ${id}`;
      expect(n).toBe(1);
    });
  });

  it('weekly, monthly and yearly from the drawer form, links copied to the next one', async () => {
    await withRollback(async (t) => {
      const owner = await testUser(t, 'rec2');
      const [org] = await t<{ id: string }[]>`insert into organizations (name) values ('C test org') returning id`;
      const cases: [string, string, string][] = [
        ['FREQ=WEEKLY', '2030-01-04', '2030-01-11'],
        ['FREQ=MONTHLY', '2030-01-31', '2030-03-31'], // February has no 31st, RRULE skips it
        ['FREQ=YEARLY', '2030-01-15', '2031-01-15'],
      ];
      for (const [rule, due, expected] of cases) {
        const parsed = parseTaskForm(
          form({ title: `Repeat ${rule}`, type: 'todo', priority: 'low', owner, due_date: due, due_time: '09:30', repeat: rule, remind: '', body: '', link: [`organization:${org.id}`] }),
        );
        expect(parsed.ok).toBe(true);
        if (!parsed.ok) return;
        const id = await saveTask(t, parsed.data, { id: owner });
        const { nextTaskId } = await completeTask(id, owner, t);
        const [next] = await t<{ due_at: Date }[]>`select due_at from tasks where id = ${nextTaskId}`;
        expect(dayKey(next.due_at), rule).toBe(expected);
        expect(formatTime(next.due_at)).toBe('09:30');
        const [link] = await t<{ organization_id: string }[]>`select organization_id from task_links where task_id = ${nextTaskId}`;
        expect(link.organization_id).toBe(org.id);
      }
    });
  });

  it('reopening removes the untouched next instance', async () => {
    await withRollback(async (t) => {
      const owner = await testUser(t, 'rec3');
      const { id } = await createTask({ title: 'Weekly digest', ownerUserId: owner, dueAt: amsterdamTime('2030-01-04', '09:00'), recurrenceRule: 'FREQ=WEEKLY;BYDAY=FR' }, t);
      const { nextTaskId } = await completeTask(id, owner, t);
      await reopenTask(id, owner, t);
      const [orig] = await t<{ status: string }[]>`select status from tasks where id = ${id}`;
      const [next] = await t<{ deleted_at: Date | null }[]>`select deleted_at from tasks where id = ${nextTaskId}`;
      expect(orig.status).toBe('not_started');
      expect(next.deleted_at).not.toBeNull();
    });
  });
});

describe('buckets', () => {
  it('puts tasks in Overdue, Today, This week and next, Later and Done by the Amsterdam day', async () => {
    await withRollback(async (t) => {
      const owner = await testUser(t, 'bkt');
      const today = todayKey();
      const mk = (title: string, due: string | null, time = '10:00') =>
        createTask({ title, ownerUserId: owner, dueAt: due ? amsterdamTime(due, time) : null }, t);
      await mk('two days late', addDaysKey(today, -2));
      await mk('due this morning at one minute past midnight', today, '00:01');
      await mk('tomorrow', addDaysKey(today, 1));
      await mk('in five weeks', addDaysKey(today, 35));
      await mk('no date', null);
      const done = await mk('finished', today);
      await completeTask(done.id, owner, t);

      const b = await taskBuckets({ owner }, t);
      expect(b.overdue.map((x) => x.title)).toEqual(['two days late']);
      expect(b.today.map((x) => x.title)).toEqual(['due this morning at one minute past midnight']);
      expect(b.week.map((x) => x.title)).toEqual(['tomorrow']);
      expect(b.later.map((x) => x.title).sort()).toEqual(['in five weeks', 'no date']);
      expect(b.counts).toMatchObject({ open: 5, overdue: 1, today: 1, week: 1, later: 2 });

      const d = await doneTasks({ owner, days: 14 }, t);
      expect(d.map((x) => x.title)).toEqual(['finished']);
      const todayDone = await doneTasks({ owner, since: 'today' }, t);
      expect(todayDone).toHaveLength(1);

      const groups = bucketGroups(b, d, { canToggle: () => true });
      expect(groups.map((g) => g.key)).toEqual(['overdue', 'today', 'week', 'later', 'done']);
      expect(groups[0].items[0].overdue).toBe(true);
      expect(groups[4].items[0].done).toBe(true);
      expect(groups[4].name).toBe('Done, last 14 days');
      expect(groups[1].items[0].dueLabel).toBe('00:01');
      expect(groups[3].items.find((i) => i.title === 'no date')?.dueLabel).toBe('No date');

      // The unassigned queue only holds tasks with no owner.
      const q = await createTask({ title: 'queue task', ownerUserId: null, dueAt: amsterdamTime(today, '12:00') }, t);
      const queue = await taskBuckets({ owner: null }, t);
      expect(queue.today.some((x) => x.id === q.id)).toBe(true);
      expect([...queue.overdue, ...queue.today, ...queue.week, ...queue.later].every((x) => x.ownerUserId === null)).toBe(true);
    });
  });

  it('labels due dates the way the designs do', () => {
    const now = amsterdamTime('2026-11-06', '12:00');
    expect(dueLabel({ dueAt: amsterdamTime('2026-11-05', '09:00').toISOString(), allDay: true }, 'home', now)).toBe('Yesterday');
    expect(dueLabel({ dueAt: amsterdamTime('2026-11-06', '14:00').toISOString(), allDay: false }, 'home', now)).toBe('Today 14:00');
    expect(dueLabel({ dueAt: amsterdamTime('2026-11-06', '14:00').toISOString(), allDay: false }, 'today', now)).toBe('14:00');
    expect(dueLabel({ dueAt: amsterdamTime('2026-11-09', '09:00').toISOString(), allDay: true }, 'date', now)).toBe('Mon 9 Nov');
  });
});

describe('the task form', () => {
  it('validates and edits, keeping links and the reminder in step', async () => {
    const bad = parseTaskForm(form({ title: '  ', repeat: 'FREQ=WEEKLY', remind: '60' }));
    expect(bad.ok).toBe(false);
    if (!bad.ok) {
      expect(bad.fieldErrors.title).toBeTruthy();
      expect(bad.fieldErrors.dueDate).toBeTruthy();
    }
    await withRollback(async (t) => {
      const owner = await testUser(t, 'form');
      const [org] = await t<{ id: string }[]>`insert into organizations (name) values ('C form org') returning id`;
      const [org2] = await t<{ id: string }[]>`insert into organizations (name) values ('C form org two') returning id`;
      const first = parseTaskForm(form({ title: 'Call Eva', type: 'call', priority: 'high', owner, due_date: '2030-02-01', due_time: '', repeat: '', remind: '1440', link: [`organization:${org.id}`] }));
      if (!first.ok) throw new Error(JSON.stringify(first.fieldErrors));
      const id = await saveTask(t, first.data, { id: owner });
      let detail = await loadTask(id, t);
      expect(detail).toMatchObject({ title: 'Call Eva', type: 'call', dueDate: '2030-02-01', dueTime: '', remindBeforeMinutes: '1440' });
      expect(detail?.links.map((l) => l.id)).toEqual([org.id]);

      const second = parseTaskForm(form({ title: 'Call Eva and Tom', type: 'call', priority: 'medium', owner: 'queue', due_date: '2030-02-02', due_time: '15:00', repeat: '', remind: '0', link: [`organization:${org2.id}`] }));
      if (!second.ok) throw new Error(JSON.stringify(second.fieldErrors));
      await saveTask(t, second.data, { id: owner }, id);
      detail = await loadTask(id, t);
      expect(detail).toMatchObject({ title: 'Call Eva and Tom', ownerUserId: null, dueDate: '2030-02-02', dueTime: '15:00', remindBeforeMinutes: '0' });
      expect(detail?.links.map((l) => l.id)).toEqual([org2.id]);
      const rems = await t<{ remind_at: Date; user_id: string | null }[]>`select remind_at, user_id from reminders where task_id = ${id}`;
      expect(rems).toHaveLength(1);
      expect(rems[0].remind_at.getTime()).toBe(amsterdamTime('2030-02-02', '15:00').getTime());
      expect(rems[0].user_id).toBeNull();
    });
  });
});
