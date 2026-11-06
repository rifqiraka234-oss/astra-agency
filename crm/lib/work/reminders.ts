/**
 * lib/work/reminders.ts, the home Reminders panel and the notifications bell (agent C).
 *
 *   await materialiseReminders()        due reminders rows -> notifications, idempotent, no worker needed
 *   await listNotifications(userId)     { items, unread } for the bell
 *   await upcomingReminders()           the home panel: SLA due tickets, late invoices, renewals, check ins
 *   addBusinessMinutes(start, mins, h)  SLA clock maths in business hours
 *
 * Idempotency: each reminder is claimed by setting sent_at in the same statement
 * that reads it, and notifications carry a unique (reminder_id, user_id), so two
 * page loads at the same moment still make one notification.
 */
import { sql, tx, type Db, type Tx } from '../db';
import { addDaysKey, daysBetween, formatDate, formatDue, formatMinutes, formatMoney, todayKey, zonedParts, fromAmsterdamWallClock } from '../format';
import { recordHref, type RecordType } from '../routes';

// ---------------------------------------------------------------- notifications

export type NotificationItem = {
  id: string;
  kind: string;
  title: string;
  body: string | null;
  url: string | null;
  readAt: string | null;
  createdAt: string;
};

function urlFor(recordType: string | null, recordId: string | null): string | null {
  if (!recordType || !recordId) return null;
  const known: RecordType[] = ['organization', 'contact', 'lead', 'deal', 'project', 'ticket', 'invoice', 'task'];
  return known.includes(recordType as RecordType) ? recordHref(recordType as RecordType, recordId) : null;
}

async function materialiseIn(t: Tx, now: Date): Promise<number> {
  // Claim every due reminder in one statement. Concurrent callers block on the row
  // lock, then see sent_at set and skip it.
  const due = await t<
    { id: string; user_id: string | null; title: string; body: string | null; record_type: string | null; record_id: string | null; task_id: string | null }[]
  >`
    update reminders r set sent_at = ${now}
     where r.sent_at is null and r.dismissed_at is null and r.remind_at <= ${now} and r.channel = 'in_app'
       and not exists (select 1 from tasks tk where tk.id = r.task_id and (tk.status in ('completed', 'cancelled') or tk.deleted_at is not null))
    returning r.id, r.user_id, r.title, r.body, r.record_type, r.record_id, r.task_id`;
  if (due.length === 0) return 0;
  // Reminders with nobody on them (the unassigned queue) go to every active admin.
  const admins = due.some((d) => !d.user_id) ? await t<{ id: string }[]>`select id from users where role = 'admin' and is_active` : [];
  let made = 0;
  for (const r of due) {
    const to = r.user_id ? [r.user_id] : admins.map((a) => a.id);
    const url = urlFor(r.record_type, r.record_id) ?? (r.task_id ? recordHref('task', r.task_id) : null);
    for (const userId of to) {
      const res = await t`
        insert into notifications (user_id, kind, title, body, url, record_type, record_id, reminder_id)
        values (${userId}, 'reminder', ${r.title}, ${r.body}, ${url}, ${r.record_type}, ${r.record_id}, ${r.id})
        on conflict (reminder_id, user_id) where reminder_id is not null do nothing`;
      made += res.count;
    }
  }
  return made;
}

/** Turns every due, unsent in app reminder into notifications. Safe to call on every page load. */
export async function materialiseReminders(opts: { now?: Date; db?: Tx } = {}): Promise<number> {
  const now = opts.now ?? new Date();
  if (opts.db) return materialiseIn(opts.db, now);
  return tx((t) => materialiseIn(t, now), { source: 'system' });
}

export async function listNotifications(userId: string, db: Db = sql, limit = 20): Promise<{ items: NotificationItem[]; unread: number }> {
  const [rows, [count]] = await Promise.all([
    db<{ id: string; kind: string; title: string; body: string | null; url: string | null; read_at: Date | null; created_at: Date }[]>`
      select id, kind, title, body, url, read_at, created_at from notifications
       where user_id = ${userId}
       order by (read_at is null) desc, created_at desc
       limit ${limit}`,
    db<{ n: number }[]>`select count(*)::int as n from notifications where user_id = ${userId} and read_at is null`,
  ]);
  return {
    unread: count?.n ?? 0,
    items: rows.map((r) => ({
      id: r.id,
      kind: r.kind,
      title: r.title,
      body: r.body,
      url: r.url,
      readAt: r.read_at ? new Date(r.read_at).toISOString() : null,
      createdAt: new Date(r.created_at).toISOString(),
    })),
  };
}

/** Marks one (or all, when id is null) of the user's notifications read. Only ever their own. */
export async function markRead(db: Db, userId: string, id: string | null): Promise<number> {
  const res = id
    ? await db`update notifications set read_at = now() where id = ${id} and user_id = ${userId} and read_at is null`
    : await db`update notifications set read_at = now() where user_id = ${userId} and read_at is null`;
  return res.count;
}

// ---------------------------------------------------------------- business hours

export type BusinessHours = { tz?: string; days: number[]; start: string; end: string };
export const DEFAULT_HOURS: BusinessHours = { tz: 'Europe/Amsterdam', days: [1, 2, 3, 4, 5], start: '09:00', end: '17:30' };

const hm = (s: string) => {
  const [h, m] = s.split(':').map(Number);
  return h * 60 + m;
};
const WEEKDAY_NUM: Record<string, number> = { Sun: 7, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

/**
 * The moment `minutes` business minutes after `start`, counting only the open
 * hours of the given days (ISO weekday 1 Monday to 7 Sunday) in Amsterdam time.
 */
export function addBusinessMinutes(start: Date, minutes: number, hours: BusinessHours = DEFAULT_HOURS): Date {
  const open = hm(hours.start);
  const close = hm(hours.end);
  let remaining = Math.max(0, minutes);
  let cursor = new Date(start);
  for (let guard = 0; guard < 400; guard++) {
    const p = zonedParts(cursor);
    const key = `${p.year}-${String(p.month).padStart(2, '0')}-${String(p.day).padStart(2, '0')}`;
    const weekday = WEEKDAY_NUM[p.weekday.slice(0, 3)] ?? 0;
    const nowMin = p.hour * 60 + p.minute;
    const isOpenDay = hours.days.includes(weekday);
    if (isOpenDay && nowMin < close) {
      const from = Math.max(nowMin, open);
      const available = close - from;
      if (remaining <= available) {
        const target = from + remaining;
        const [y, m, d] = key.split('-').map(Number);
        return fromAmsterdamWallClock(y, m, d, Math.floor(target / 60), target % 60);
      }
      remaining -= available;
    }
    const next = addDaysKey(key, 1);
    const [y, m, d] = next.split('-').map(Number);
    cursor = fromAmsterdamWallClock(y, m, d, 0, 0);
  }
  return cursor;
}

// ---------------------------------------------------------------- the home panel

export type ReminderItem = {
  key: string;
  kind: 'sla' | 'invoice' | 'renewal' | 'checkin' | 'reminder';
  tone: 'red' | 'amber' | 'blue';
  title: string;
  sub: string;
  href: string;
  /** For sorting, smaller is sooner. */
  at: number;
};

/** Everything the team should not forget in the next weeks, read straight from the tables. */
export async function upcomingReminders(opts: { now?: Date; horizonDays?: number } = {}, db: Db = sql): Promise<ReminderItem[]> {
  const now = opts.now ?? new Date();
  const today = todayKey(now);
  const horizon = addDaysKey(today, opts.horizonDays ?? 30);

  const [tickets, invoices, renewals, checkinTasks, checkinOrgs, loose] = await Promise.all([
    // Open tickets still waiting for a first reply. Waiting on client pauses the clock, so they are left out.
    db<{ id: string; number: number; subject: string; priority: string; opened_at: Date; org: string | null; first_reply_minutes: number | null; business_hours: BusinessHours | null; stage_key: string }[]>`
      select tk.id, tk.number, tk.subject, tk.priority, tk.opened_at, o.name as org, s.key as stage_key,
             coalesce(sp.first_reply_minutes, dp.first_reply_minutes) as first_reply_minutes,
             coalesce(sp.business_hours, dp.business_hours) as business_hours
        from tickets tk
        join pipeline_stages s on s.id = tk.stage_id
        left join organizations o on o.id = tk.organization_id
        left join sla_policies sp on sp.id = tk.sla_policy_id
        left join sla_policies dp on dp.priority = tk.priority and dp.is_default
       where tk.deleted_at is null and tk.closed_at is null and tk.first_replied_at is null
         and s.state = 'open' and not s.pauses_sla`,
    db<{ id: string; number: string | null; title: string | null; total: string | null; currency: string; due_date: string; org: string | null; external_system: string | null }[]>`
      select i.id, i.external_number as number, i.title, i.total, i.currency, i.due_date::text as due_date, o.name as org, i.external_system
        from invoices i left join organizations o on o.id = i.organization_id
       where i.deleted_at is null and i.due_date is not null
         and (i.state = 'late' or (i.state = 'open' and i.due_date < crm_today()))`,
    db<{ id: string; name: string; renewal_date: string; am: string | null }[]>`
      select o.id, o.name, o.renewal_date::text as renewal_date, u.name as am
        from organizations o left join users u on u.id = o.account_manager_user_id
       where o.deleted_at is null and o.renewal_date between crm_today() and ${horizon}::date`,
    db<{ id: string; title: string; due_at: Date; all_day: boolean; recurrence_rule: string | null; org_id: string | null; org: string | null }[]>`
      select v.id, v.title, v.due_at, v.all_day, v.recurrence_rule, o.id as org_id, o.name as org
        from v_open_tasks v
        left join lateral (select l.organization_id from task_links l where l.task_id = v.id and l.organization_id is not null limit 1) tl on true
        left join organizations o on o.id = tl.organization_id
       where v.type = 'checkin' and v.due_at is not null and v.due_date <= ${addDaysKey(today, 14)}::date`,
    db<{ id: string; name: string; next_checkin_date: string }[]>`
      select o.id, o.name, o.next_checkin_date::text as next_checkin_date
        from organizations o
       where o.deleted_at is null and o.next_checkin_date <= ${addDaysKey(today, 14)}::date
         and not exists (
           select 1 from v_open_tasks v join task_links l on l.task_id = v.id
            where v.type = 'checkin' and l.organization_id = o.id)`,
    // Reminders set on a record (not on a task) that are still ahead.
    db<{ id: string; title: string; body: string | null; remind_at: Date; record_type: string | null; record_id: string | null }[]>`
      select r.id, r.title, r.body, r.remind_at, r.record_type, r.record_id
        from reminders r
       where r.task_id is null and r.dismissed_at is null and r.remind_at <= ${horizon}::date + 1
         and r.remind_at >= now() - interval '7 days'
         and not (r.record_type = 'organization' and r.record_id in (
               select o.id from organizations o where o.renewal_date between crm_today() and ${horizon}::date))`,
  ]);

  const items: ReminderItem[] = [];

  for (const tk of tickets) {
    if (!tk.first_reply_minutes) continue;
    const due = addBusinessMinutes(new Date(tk.opened_at), tk.first_reply_minutes, tk.business_hours ?? DEFAULT_HOURS);
    const mins = Math.round((due.getTime() - now.getTime()) / 60_000);
    const when = mins >= 0 ? `due in ${formatMinutes(mins)}` : `overdue by ${formatMinutes(-mins)}`;
    items.push({
      key: `sla:${tk.id}`,
      kind: 'sla',
      tone: 'red',
      title: `Ticket ${tk.number} first reply ${when}`,
      sub: [tk.org, `SLA ${tk.priority} priority`].filter(Boolean).join(', '),
      href: recordHref('ticket', tk.id),
      at: due.getTime(),
    });
  }

  for (const i of invoices) {
    const late = daysBetween(i.due_date, today);
    const name = i.number ?? i.title ?? 'Invoice';
    items.push({
      key: `invoice:${i.id}`,
      kind: 'invoice',
      tone: 'amber',
      title: `Invoice ${name} is ${late} ${late === 1 ? 'day' : 'days'} late`,
      sub: [i.org, i.total ? formatMoney(i.total, i.currency) : null, i.external_system ? `in ${i.external_system === 'moneybird' ? 'Moneybird' : i.external_system}` : null]
        .filter(Boolean)
        .join(', '),
      href: recordHref('invoice', i.id),
      at: now.getTime() - late * 86_400_000,
    });
  }

  for (const o of renewals) {
    items.push({
      key: `renewal:${o.id}`,
      kind: 'renewal',
      tone: 'blue',
      title: `${o.name} renews ${formatDate(o.renewal_date, now)}`,
      sub: o.am ? `Account manager ${o.am.split(' ')[0]}` : 'No account manager yet',
      href: recordHref('organization', o.id),
      at: new Date(`${o.renewal_date}T09:00:00Z`).getTime(),
    });
  }

  for (const c of checkinTasks) {
    const repeat = c.recurrence_rule ? `, repeats` : '';
    items.push({
      key: `checkin:${c.id}`,
      kind: 'checkin',
      tone: 'blue',
      title: c.org ? `Check in, ${c.org}` : c.title,
      sub: `${formatDue(c.due_at, c.all_day, now)}${repeat}`,
      href: c.org_id ? recordHref('organization', c.org_id) : recordHref('task', c.id),
      at: new Date(c.due_at).getTime(),
    });
  }

  for (const o of checkinOrgs) {
    items.push({
      key: `checkin-org:${o.id}`,
      kind: 'checkin',
      tone: daysBetween(o.next_checkin_date, today) > 0 ? 'amber' : 'blue',
      title: `Check in, ${o.name}`,
      sub: `Due ${formatDate(o.next_checkin_date, now)}, no task yet`,
      href: recordHref('organization', o.id),
      at: new Date(`${o.next_checkin_date}T09:00:00Z`).getTime(),
    });
  }

  for (const r of loose) {
    items.push({
      key: `reminder:${r.id}`,
      kind: 'reminder',
      tone: 'blue',
      title: r.title,
      sub: r.body ?? formatDue(r.remind_at, false, now),
      href: urlFor(r.record_type, r.record_id) ?? '/tasks',
      at: new Date(r.remind_at).getTime(),
    });
  }

  const rank = { sla: 0, invoice: 1, checkin: 2, renewal: 3, reminder: 4 } as const;
  return items.sort((a, b) => (a.tone === 'red' ? 0 : 1) - (b.tone === 'red' ? 0 : 1) || rank[a.kind] - rank[b.kind] || a.at - b.at);
}
