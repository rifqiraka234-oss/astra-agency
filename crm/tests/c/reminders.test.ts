import { afterAll, describe, expect, it } from 'vitest';
import { closeDb } from '../../lib/db';
import { amsterdamTime, dayKey, formatTime } from '../../lib/format';
import { addBusinessMinutes, listNotifications, markRead, materialiseReminders, upcomingReminders } from '../../lib/work/reminders';
import { kpiTiles } from '../../lib/work/home';
import { withRollback } from '../helpers';

afterAll(() => closeDb());

describe('reminders into notifications', () => {
  it('is idempotent, skips future and finished ones, and only marks your own as read', async () => {
    await withRollback(async (t) => {
      const [u] = await t<{ id: string }[]>`insert into users (email, name, role) values ('c-rem@c-test.local', 'C Rem', 'sales') returning id`;
      const [other] = await t<{ id: string }[]>`insert into users (email, name, role) values ('c-rem2@c-test.local', 'C Rem Two', 'sales') returning id`;
      const [task] = await t<{ id: string }[]>`insert into tasks (title, owner_user_id) values ('Due task', ${u.id}) returning id`;
      const [doneTask] = await t<{ id: string }[]>`
        insert into tasks (title, owner_user_id, status, completed_at) values ('Done task', ${u.id}, 'completed', now()) returning id`;
      await t`insert into reminders (user_id, task_id, record_type, record_id, title, remind_at)
              values (${u.id}, ${task.id}, 'task', ${task.id}, 'Due task', now() - interval '5 minutes'),
                     (${u.id}, ${doneTask.id}, 'task', ${doneTask.id}, 'Done task', now() - interval '5 minutes'),
                     (${u.id}, null, null, null, 'Later one', now() + interval '2 days')`;

      await materialiseReminders({ db: t });
      await materialiseReminders({ db: t });
      const list = await listNotifications(u.id, t);
      expect(list.items.map((n) => n.title)).toEqual(['Due task']);
      expect(list.unread).toBe(1);
      expect(list.items[0].url).toBe(`/tasks?task=${task.id}`);

      // Someone else can't mark it read.
      expect(await markRead(t, other.id, list.items[0].id)).toBe(0);
      expect(await markRead(t, u.id, list.items[0].id)).toBe(1);
      expect((await listNotifications(u.id, t)).unread).toBe(0);
    });
  });
});

describe('business hours', () => {
  it('counts only open hours, across a weekend', () => {
    // Fri 6 Nov 2026 16:30 plus 4 business hours: 1h on Friday, 3h on Monday from 09:00.
    const due = addBusinessMinutes(amsterdamTime('2026-11-06', '16:30'), 240);
    expect(dayKey(due)).toBe('2026-11-09');
    expect(formatTime(due)).toBe('12:00');
    // Opened before hours starts at 09:00.
    const early = addBusinessMinutes(amsterdamTime('2026-11-10', '07:00'), 60);
    expect(formatTime(early)).toBe('10:00');
  });
});

describe('the home reminders panel and KPI tiles', () => {
  it('lists a late invoice and an SLA ticket from the tables', async () => {
    await withRollback(async (t) => {
      const [org] = await t<{ id: string }[]>`insert into organizations (name) values ('C Late Payer') returning id`;
      const [inv] = await t<{ id: string }[]>`
        insert into invoices (organization_id, state, due_date, total)
        values (${org.id}, 'draft', crm_today() - 3, 100.00) returning id`;
      await t`update invoices set state = 'open', external_number = 'C-TEST-1' where id = ${inv.id}`;
      const [tk] = await t<{ id: string; number: number }[]>`
        insert into tickets (subject, organization_id, pipeline_id, stage_id, priority, opened_at)
        select 'C test ticket', ${org.id}, s.pipeline_id, s.id, 'high', now() - interval '10 days'
          from pipeline_stages s join pipelines p on p.id = s.pipeline_id where p.key = 'tickets' and s.key = 'new'
        returning id, number`;
      const items = await upcomingReminders({}, t);
      const late = items.find((i) => i.key === `invoice:${inv.id}`);
      expect(late?.title).toBe('Invoice C-TEST-1 is 3 days late');
      expect(late?.href).toBe(`/invoices/${inv.id}`);
      const sla = items.find((i) => i.key === `sla:${tk.id}`);
      expect(sla?.title).toMatch(new RegExp(`^Ticket ${tk.number} first reply overdue by`));
      expect(sla?.tone).toBe('red');
      expect(items[0].tone).toBe('red');
    });
  });

  it('formats the five tiles', () => {
    const tiles = kpiTiles({
      openValue: '86400.00', openCount: 12, weightedValue: '39240.00', goal: { label: 'Q4 2026', amount: '50000.00', currency: 'EUR' },
      won90: 5, lost90: 11, winRate: 31, leadsInPlay: 148, waitingOnReply: 30, overdueTasks: 4,
    });
    expect(tiles.map((k) => [k.label, k.value, k.sub])).toEqual([
      ['Open pipeline', '€86,400', '12 deals in sales'],
      ['Weighted pipeline', '€39,240', 'Q4 goal €50,000'],
      ['Win rate, 90 days', '31%', '5 won, 11 lost'],
      ['Leads in play', '148', '30 waiting on a reply'],
      ['Overdue tasks', '4', 'Across the team'],
    ]);
  });
});
