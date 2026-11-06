/**
 * lib/tasks.ts, tasks with owners, due dates, links, reminders and repeats.
 *
 *   const { id } = await createTask({
 *     title: 'Quarterly check in with Eva Jansen', type: 'checkin', ownerUserId: luna.id,
 *     dueAt: amsterdamTime('2026-11-06', '11:00'), recurrenceRule: 'FREQ=MONTHLY;INTERVAL=3',
 *     remindBeforeMinutes: 1440, links: [{ organizationId }], createdBy: user.id,
 *   }, t);
 *
 *   const { nextTaskId } = await completeTask(id, user.id, t);  // repeats create the next one
 *   await reopenTask(id, user.id, t);                             // undo, removes that untouched next one
 *
 *   const b = await taskBuckets({ owner: user.id });   // { overdue, today, week, later, counts }
 *   // owner: a user id, 'all' for everyone, or null for the unassigned queue
 *
 * Overdue means the due day (Amsterdam) is before today, computed in v_open_tasks,
 * never stored. Recurrence is an RRULE body (FREQ=WEEKLY;BYDAY=FR) evaluated in
 * Amsterdam wall clock time, so 11:00 stays 11:00 across daylight saving.
 */
import * as rrulePkg from 'rrule';
import { sql, tx, type Db, type Tx } from './db';
import { amsterdamTime, fromAmsterdamWallClock, zonedParts } from './format';
import { recordHref, type RecordType } from './routes';

// rrule ships ESM (bundlers) and a UMD build (node). Find the class in either shape.
const RRule: typeof import('rrule').RRule =
  (rrulePkg as unknown as { RRule?: typeof import('rrule').RRule }).RRule ??
  (rrulePkg as unknown as { default: { RRule: typeof import('rrule').RRule } }).default.RRule;

export type TaskType =
  | 'todo' | 'call' | 'email' | 'linkedin' | 'meeting' | 'meeting_prep' | 'approval' | 'ticket'
  | 'invoice' | 'checkin' | 'renewal' | 'research' | 'send_artifact';
export type TaskPriority = 'low' | 'medium' | 'high';
export type TaskStatus = 'not_started' | 'in_progress' | 'waiting' | 'completed' | 'cancelled';

export type TaskLink = {
  contactId?: string | null;
  organizationId?: string | null;
  leadId?: string | null;
  dealId?: string | null;
  projectId?: string | null;
  ticketId?: string | null;
  invoiceId?: string | null;
};

export type CreateTaskInput = {
  title: string;
  body?: string | null;
  type?: TaskType;
  priority?: TaskPriority;
  status?: Exclude<TaskStatus, 'completed'>;
  dueAt?: Date | string | null;
  allDay?: boolean;
  /** null puts it in the unassigned queue. */
  ownerUserId?: string | null;
  recurrenceRule?: string | null;
  /** Creates a reminders row this many minutes before dueAt. */
  remindBeforeMinutes?: number | null;
  createdFrom?: 'manual' | 'automation' | 'recurrence' | 'stage_entry' | 'import' | 'sync' | 'seed';
  createdBy?: string | null;
  recurrenceParentId?: string | null;
  links?: TaskLink[];
  custom?: Record<string, unknown>;
};

const LINK_COLS: Record<keyof TaskLink, string> = {
  contactId: 'contact_id',
  organizationId: 'organization_id',
  leadId: 'lead_id',
  dealId: 'deal_id',
  projectId: 'project_id',
  ticketId: 'ticket_id',
  invoiceId: 'invoice_id',
};

/** Repeat options for the task form. value is the RRULE body stored in recurrence_rule. */
export const RECURRENCE_PRESETS: { value: string; label: string }[] = [
  { value: '', label: 'Does not repeat' },
  { value: 'FREQ=DAILY', label: 'Every day' },
  { value: 'FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR', label: 'Every weekday' },
  { value: 'FREQ=WEEKLY', label: 'Every week' },
  { value: 'FREQ=WEEKLY;INTERVAL=2', label: 'Every 2 weeks' },
  { value: 'FREQ=MONTHLY', label: 'Every month' },
  { value: 'FREQ=MONTHLY;INTERVAL=3', label: 'Every quarter' },
  { value: 'FREQ=MONTHLY;INTERVAL=3;BYDAY=1MO', label: 'First Monday every quarter' },
  { value: 'FREQ=YEARLY', label: 'Every year' },
];

const DAY_NAMES: Record<string, string> = { MO: 'Monday', TU: 'Tuesday', WE: 'Wednesday', TH: 'Thursday', FR: 'Friday', SA: 'Saturday', SU: 'Sunday' };

/** 'FREQ=MONTHLY;INTERVAL=3' -> 'every quarter', 'FREQ=WEEKLY;BYDAY=FR' -> 'every Friday'. */
export function describeRecurrence(rule: string | null | undefined): string {
  if (!rule) return '';
  const parts = Object.fromEntries(
    rule.replace(/^RRULE:/, '').split(';').map((p) => p.split('=') as [string, string]),
  );
  const interval = Number(parts.INTERVAL ?? 1);
  const byday = parts.BYDAY as string | undefined;
  switch (parts.FREQ) {
    case 'DAILY':
      return interval === 1 ? 'every day' : `every ${interval} days`;
    case 'WEEKLY':
      if (byday === 'MO,TU,WE,TH,FR') return 'every weekday';
      if (byday && !byday.includes(',') && interval === 1) return `every ${DAY_NAMES[byday] ?? byday}`;
      return interval === 1 ? 'every week' : `every ${interval} weeks`;
    case 'MONTHLY':
      if (interval === 3 && byday === '1MO') return 'first Monday every quarter';
      if (interval === 3) return 'every quarter';
      if (interval === 12) return 'every year';
      return interval === 1 ? 'every month' : `every ${interval} months`;
    case 'YEARLY':
      return interval === 1 ? 'every year' : `every ${interval} years`;
    default:
      try {
        return RRule.fromString(rule.startsWith('RRULE:') ? rule : `RRULE:${rule}`).toText();
      } catch {
        return 'repeats';
      }
  }
}

/** Throws when the rule cannot be parsed. Use in zod refinements. */
export function isValidRecurrence(rule: string): boolean {
  try {
    RRule.parseString(rule.replace(/^RRULE:/, ''));
    return /FREQ=/.test(rule);
  } catch {
    return false;
  }
}

/**
 * The next due moment after `after` for a rule anchored at `anchor`, in
 * Amsterdam wall clock time. Returns null when the rule has ended.
 */
export function nextOccurrence(rule: string, anchor: Date, after: Date): Date | null {
  // rrule works in "floating" UTC. Feed it Amsterdam wall clock as if it were UTC, then convert back.
  const toFloating = (d: Date) => {
    const p = zonedParts(d);
    return new Date(Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute));
  };
  const options = RRule.parseString(rule.replace(/^RRULE:/, ''));
  const r = new RRule({ ...options, dtstart: toFloating(anchor) });
  const next = r.after(toFloating(after), false);
  if (!next) return null;
  return fromAmsterdamWallClock(next.getUTCFullYear(), next.getUTCMonth() + 1, next.getUTCDate(), next.getUTCHours(), next.getUTCMinutes());
}

async function insertTask(t: Tx, input: CreateTaskInput): Promise<{ id: string }> {
  const due = input.dueAt ? new Date(input.dueAt) : null;
  const [row] = await t<{ id: string }[]>`
    insert into tasks (title, body, type, priority, status, due_at, all_day, owner_user_id, recurrence_rule,
                       recurrence_parent_id, remind_before_minutes, created_from, created_by, custom)
    values (${input.title.trim()}, ${input.body ?? null}, ${input.type ?? 'todo'}, ${input.priority ?? 'medium'},
            ${input.status ?? 'not_started'}, ${due}, ${input.allDay ?? false}, ${input.ownerUserId ?? null},
            ${input.recurrenceRule || null}, ${input.recurrenceParentId ?? null}, ${input.remindBeforeMinutes ?? null},
            ${input.createdFrom ?? 'manual'}, ${input.createdBy ?? null}, ${t.json((input.custom ?? {}) as never)})
    returning id`;
  for (const link of input.links ?? []) {
    for (const key of Object.keys(LINK_COLS) as (keyof TaskLink)[]) {
      const id = link[key];
      if (!id) continue;
      await t`insert into task_links (task_id, ${t(LINK_COLS[key])}) values (${row.id}, ${id})`;
    }
  }
  if (due && input.remindBeforeMinutes && input.remindBeforeMinutes > 0) {
    await t`
      insert into reminders (user_id, task_id, record_type, record_id, title, remind_at)
      values (${input.ownerUserId ?? null}, ${row.id}, 'task', ${row.id}, ${input.title.trim()},
              ${new Date(due.getTime() - input.remindBeforeMinutes * 60_000)})`;
  }
  return row;
}

/** Create a task with links and an optional reminder. Pass your transaction as db. */
export async function createTask(input: CreateTaskInput, db?: Tx): Promise<{ id: string }> {
  if (db) return insertTask(db, input);
  return tx((t) => insertTask(t, input), { userId: input.createdBy ?? null });
}

type TaskRow = {
  id: string; title: string; body: string | null; type: TaskType; priority: TaskPriority; status: TaskStatus;
  due_at: Date | null; all_day: boolean; owner_user_id: string | null; recurrence_rule: string | null;
  recurrence_parent_id: string | null; remind_before_minutes: number | null; custom: Record<string, unknown>;
};

async function completeIn(t: Tx, taskId: string, userId: string | null): Promise<{ completed: boolean; nextTaskId: string | null }> {
  const [task] = await t<TaskRow[]>`select * from tasks where id = ${taskId} and deleted_at is null for update`;
  if (!task) throw new Error('Task not found');
  if (task.status === 'completed') return { completed: false, nextTaskId: null };
  await t`update tasks set status = 'completed', completed_at = now(), completed_by = ${userId} where id = ${taskId}`;
  // Mark its pending reminders done so nobody is reminded about finished work.
  await t`update reminders set dismissed_at = now() where task_id = ${taskId} and sent_at is null and dismissed_at is null`;

  let nextTaskId: string | null = null;
  if (task.recurrence_rule && task.due_at) {
    const now = new Date();
    const after = task.due_at > now ? task.due_at : now;
    const next = nextOccurrence(task.recurrence_rule, task.due_at, after);
    if (next) {
      const links = await t<Record<string, string | null>[]>`
        select contact_id, organization_id, lead_id, deal_id, project_id, ticket_id, invoice_id
          from task_links where task_id = ${taskId}`;
      const created = await insertTask(t, {
        title: task.title,
        body: task.body,
        type: task.type,
        priority: task.priority,
        dueAt: next,
        allDay: task.all_day,
        ownerUserId: task.owner_user_id,
        recurrenceRule: task.recurrence_rule,
        recurrenceParentId: task.recurrence_parent_id ?? task.id,
        remindBeforeMinutes: task.remind_before_minutes,
        createdFrom: 'recurrence',
        createdBy: userId,
        custom: task.custom,
        links: links.map((l) => ({
          contactId: l.contact_id, organizationId: l.organization_id, leadId: l.lead_id, dealId: l.deal_id,
          projectId: l.project_id, ticketId: l.ticket_id, invoiceId: l.invoice_id,
        })),
      });
      nextTaskId = created.id;
    }
  }
  return { completed: true, nextTaskId };
}

/** Complete a task. When it repeats, the next instance is created and its id returned. */
export async function completeTask(taskId: string, userId: string | null, db?: Tx) {
  if (db) return completeIn(db, taskId, userId);
  return tx((t) => completeIn(t, taskId, userId), { userId });
}

async function reopenIn(t: Tx, taskId: string): Promise<void> {
  const [task] = await t<(TaskRow & { completed_at: Date | null })[]>`
    select * from tasks where id = ${taskId} and deleted_at is null for update`;
  if (!task || task.status !== 'completed') return;
  await t`update tasks set status = 'not_started', completed_at = null, completed_by = null where id = ${taskId}`;
  if (task.recurrence_rule && task.completed_at) {
    // Remove the next instance this completion created, if nobody touched it yet.
    await t`
      update tasks set deleted_at = now()
       where recurrence_parent_id = ${task.recurrence_parent_id ?? task.id}
         and created_from = 'recurrence' and status = 'not_started' and deleted_at is null
         and created_at >= ${task.completed_at}`;
  }
}

/** Undo a completion (the checkbox in the design toggles both ways). */
export async function reopenTask(taskId: string, userId: string | null, db?: Tx) {
  if (db) return reopenIn(db, taskId);
  return tx((t) => reopenIn(t, taskId), { userId });
}

// ---------------------------------------------------------------- reading

export type TaskListItem = {
  id: string;
  title: string;
  body: string | null;
  type: TaskType;
  priority: TaskPriority;
  status: TaskStatus;
  dueAt: string | null; // ISO
  allDay: boolean;
  bucket: 'overdue' | 'today' | 'week' | 'later';
  isOverdue: boolean;
  ownerUserId: string | null;
  ownerName: string | null;
  ownerInitials: string | null;
  ownerAvatarBg: string | null;
  recurrenceRule: string | null;
  repeat: string; // 'every quarter'
  links: { type: RecordType; id: string; label: string; href: string }[];
};

export type TaskBuckets = {
  overdue: TaskListItem[];
  today: TaskListItem[];
  week: TaskListItem[];
  later: TaskListItem[];
  counts: { open: number; overdue: number; today: number; week: number; later: number };
};

/**
 * Open tasks in the four buckets of the Tasks design.
 * owner: a user id, 'all' (default) for everyone, or null for the unassigned queue.
 * linked: limit to tasks linked to one record, for record pages.
 */
export async function taskBuckets(
  opts: { owner?: string | null | 'all'; linked?: { type: RecordType; id: string } } = {},
  db: Db = sql,
): Promise<TaskBuckets> {
  const owner = opts.owner === undefined ? 'all' : opts.owner;
  const linkCol = opts.linked
    ? ({ organization: 'organization_id', contact: 'contact_id', lead: 'lead_id', deal: 'deal_id', project: 'project_id', ticket: 'ticket_id', invoice: 'invoice_id', task: 'task_id' } as const)[opts.linked.type]
    : null;
  const rows = await db<
    {
      id: string; title: string; body: string | null; type: TaskType; priority: TaskPriority; status: TaskStatus;
      due_at: Date | null; all_day: boolean; bucket: TaskListItem['bucket']; is_overdue: boolean;
      owner_user_id: string | null; owner_name: string | null; owner_initials: string | null; owner_avatar_bg: string | null;
      recurrence_rule: string | null;
      links: { type: RecordType; id: string; label: string }[] | null;
    }[]
  >`
    select v.id, v.title, v.body, v.type, v.priority, v.status, v.due_at, v.all_day, v.bucket, v.is_overdue,
           v.owner_user_id, v.owner_name, v.owner_initials, v.owner_avatar_bg, v.recurrence_rule,
           (select json_agg(json_build_object('type', x.type, 'id', x.id, 'label', x.label) order by x.ord)
              from (
                select 1 as ord, 'organization' as type, o.id, o.name as label from task_links l join organizations o on o.id = l.organization_id where l.task_id = v.id
                union all select 2, 'contact', c.id, c.full_name from task_links l join contacts c on c.id = l.contact_id where l.task_id = v.id
                union all select 3, 'lead', ld.id, 'Lead · ' || coalesce(ld.name, lc.full_name, lo.name, 'Untitled')
                  from task_links l join leads ld on ld.id = l.lead_id
                  left join contacts lc on lc.id = ld.contact_id left join organizations lo on lo.id = ld.organization_id
                 where l.task_id = v.id
                union all select 4, 'deal', d.id, d.name from task_links l join deals d on d.id = l.deal_id where l.task_id = v.id
                union all select 5, 'project', p.id, 'Project · ' || p.name from task_links l join projects p on p.id = l.project_id where l.task_id = v.id
                union all select 6, 'ticket', tk.id, 'Ticket ' || tk.number from task_links l join tickets tk on tk.id = l.ticket_id where l.task_id = v.id
                union all select 7, 'invoice', i.id, coalesce(i.external_number, 'Draft invoice') from task_links l join invoices i on i.id = l.invoice_id where l.task_id = v.id
              ) x) as links
      from v_open_tasks v
     where (${owner === 'all'} or (${owner === null} and v.owner_user_id is null) or v.owner_user_id = ${owner === 'all' || owner === null ? null : owner}::uuid)
       and (${linkCol === null} or v.id in (select task_id from task_links where ${db(linkCol ?? 'task_id')} = ${opts.linked?.id ?? null}::uuid))
     order by v.due_at asc nulls last, v.priority = 'high' desc, v.created_at asc`;
  const items: TaskListItem[] = rows.map((r) => ({
    id: r.id,
    title: r.title,
    body: r.body,
    type: r.type,
    priority: r.priority,
    status: r.status,
    dueAt: r.due_at ? new Date(r.due_at).toISOString() : null,
    allDay: r.all_day,
    bucket: r.bucket,
    isOverdue: r.is_overdue,
    ownerUserId: r.owner_user_id,
    ownerName: r.owner_name,
    ownerInitials: r.owner_initials,
    ownerAvatarBg: r.owner_avatar_bg,
    recurrenceRule: r.recurrence_rule,
    repeat: describeRecurrence(r.recurrence_rule),
    links: (r.links ?? []).map((l) => ({ ...l, href: recordHref(l.type, l.id) })),
  }));
  const pick = (b: TaskListItem['bucket']) => items.filter((i) => i.bucket === b);
  const result = { overdue: pick('overdue'), today: pick('today'), week: pick('week'), later: pick('later') };
  return {
    ...result,
    counts: {
      open: items.length,
      overdue: result.overdue.length,
      today: result.today.length,
      week: result.week.length,
      later: result.later.length,
    },
  };
}

/** Re-exported for task forms: build a due moment from a date input and a time input. */
export { amsterdamTime };
