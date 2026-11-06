/**
 * lib/work/tasks.ts, the task form and the reads behind / and /tasks (agent C).
 * Creating and completing go through lib/tasks.ts (createTask, completeTask, reopenTask).
 *
 *   parseTaskForm(fd)               zod checked TaskFormInput or field errors
 *   saveTask(t, input, user, id?)    create (through createTask) or update, links and reminder in sync
 *   doneTasks({ owner, days })       completed in the last N days, for the Done bucket
 *   dayTasks(userId)                 that user's overdue and today tasks plus the ones finished today
 *   loadTask(id)                     one task with its links, for the edit drawer
 *   searchRecords(type, q)           the link pickers
 */
import { z } from 'zod';
import { sql, type Db, type Tx } from '../db';
import { createTask, describeRecurrence, taskBuckets, type TaskLink, type TaskListItem, type TaskType } from '../tasks';
import { amsterdamTime, dayKey, formatTime } from '../format';
import { recordHref, type RecordType } from '../routes';
import { str, strs, zodFieldErrors } from '../forms';

import { LINK_TYPES, type LinkType, type RecordHit } from './constants';
export { LINK_TYPES, REPEAT_OPTIONS, REMINDER_OPTIONS, linkPillLabel, type LinkType, type RecordHit } from './constants';

const LINK_COL: Record<LinkType, keyof TaskLink> = {
  organization: 'organizationId',
  contact: 'contactId',
  lead: 'leadId',
  deal: 'dealId',
  project: 'projectId',
  ticket: 'ticketId',
  invoice: 'invoiceId',
};
const LINK_SQL_COL: Record<LinkType, string> = {
  organization: 'organization_id',
  contact: 'contact_id',
  lead: 'lead_id',
  deal: 'deal_id',
  project: 'project_id',
  ticket: 'ticket_id',
  invoice: 'invoice_id',
};
const LINK_TABLE: Record<LinkType, string> = {
  organization: 'organizations',
  contact: 'contacts',
  lead: 'leads',
  deal: 'deals',
  project: 'projects',
  ticket: 'tickets',
  invoice: 'invoices',
};

const TASK_TYPE_VALUES = [
  'todo', 'call', 'email', 'linkedin', 'meeting', 'meeting_prep', 'approval', 'ticket',
  'invoice', 'checkin', 'renewal', 'research', 'send_artifact',
] as const;

const uuid = z.string().regex(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i, 'Not a valid id');

export const taskFormSchema = z
  .object({
    title: z.string().trim().min(1, 'Give the task a title').max(300, 'Keep the title under 300 characters'),
    type: z.enum(TASK_TYPE_VALUES, { message: 'Pick a type' }),
    priority: z.enum(['low', 'medium', 'high'], { message: 'Pick a priority' }),
    ownerUserId: uuid.nullable(),
    dueDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Use a date like 2026-11-06').nullable(),
    dueTime: z.string().regex(/^\d{2}:\d{2}$/, 'Use a time like 14:00').nullable(),
    recurrenceRule: z
      .string()
      .regex(/^FREQ=(DAILY|WEEKLY|MONTHLY|YEARLY)(;[A-Z]+=[A-Z0-9,+-]+)*$/, 'Pick a repeat option')
      .nullable(),
    remindBeforeMinutes: z.number().int().min(0).max(60 * 24 * 60).nullable(),
    body: z.string().trim().max(5000, 'Keep notes under 5,000 characters').nullable(),
    links: z.array(z.object({ type: z.enum(['organization', 'contact', 'lead', 'deal', 'project', 'ticket', 'invoice']), id: uuid })).max(20),
  })
  .superRefine((v, ctx) => {
    if (v.recurrenceRule && !v.dueDate) ctx.addIssue({ code: 'custom', path: ['dueDate'], message: 'A repeating task needs a due date' });
    if (v.remindBeforeMinutes !== null && !v.dueDate) {
      ctx.addIssue({ code: 'custom', path: ['dueDate'], message: 'A reminder needs a due date' });
    }
    if (v.dueTime && !v.dueDate) ctx.addIssue({ code: 'custom', path: ['dueDate'], message: 'Add the date for that time' });
  });

export type TaskFormInput = z.infer<typeof taskFormSchema>;

/** Reads the drawer's FormData. links come as repeated 'link' values of 'type:id'. */
export function parseTaskForm(fd: FormData): { ok: true; data: TaskFormInput } | { ok: false; fieldErrors: Record<string, string> } {
  const owner = str(fd, 'owner');
  const remind = str(fd, 'remind');
  const parsed = taskFormSchema.safeParse({
    title: str(fd, 'title') ?? '',
    type: str(fd, 'type') ?? 'todo',
    priority: str(fd, 'priority') ?? 'medium',
    ownerUserId: owner && owner !== 'queue' ? owner : null,
    dueDate: str(fd, 'due_date'),
    dueTime: str(fd, 'due_time'),
    recurrenceRule: str(fd, 'repeat'),
    remindBeforeMinutes: remind === null ? null : Number(remind),
    body: str(fd, 'body'),
    links: strs(fd, 'link').map((v) => {
      const [type, id] = v.split(':');
      return { type, id };
    }),
  });
  if (!parsed.success) return { ok: false, fieldErrors: zodFieldErrors(parsed.error) };
  return { ok: true, data: parsed.data };
}

/** The due moment of a form. A date without a time is an all day task, stored at 09:00. */
export function dueFromForm(input: Pick<TaskFormInput, 'dueDate' | 'dueTime'>): { dueAt: Date | null; allDay: boolean } {
  if (!input.dueDate) return { dueAt: null, allDay: false };
  return { dueAt: amsterdamTime(input.dueDate, input.dueTime ?? '09:00'), allDay: !input.dueTime };
}

function toTaskLinks(links: TaskFormInput['links']): TaskLink[] {
  return links.map((l) => ({ [LINK_COL[l.type]]: l.id }) as TaskLink);
}

/** Every link points at a live record. Returns the type of the first missing one, or null. */
export async function missingLink(t: Db, links: TaskFormInput['links']): Promise<LinkType | null> {
  for (const l of links) {
    const [row] = await t<{ ok: number }[]>`select 1 as ok from ${t(LINK_TABLE[l.type])} where id = ${l.id}`;
    if (!row) return l.type;
  }
  return null;
}

/** Keeps the task's one pending reminder in step with its due date, owner and offset. */
export async function syncTaskReminder(t: Tx, taskId: string): Promise<void> {
  const [task] = await t<{ title: string; due_at: Date | null; owner_user_id: string | null; remind_before_minutes: number | null; status: string }[]>`
    select title, due_at, owner_user_id, remind_before_minutes, status from tasks where id = ${taskId}`;
  await t`delete from reminders where task_id = ${taskId} and sent_at is null`;
  if (!task || !task.due_at || task.remind_before_minutes === null || task.status === 'completed' || task.status === 'cancelled') return;
  const remindAt = new Date(new Date(task.due_at).getTime() - task.remind_before_minutes * 60_000);
  await t`
    insert into reminders (user_id, task_id, record_type, record_id, title, remind_at)
    values (${task.owner_user_id}, ${taskId}, 'task', ${taskId}, ${task.title}, ${remindAt})`;
}

/** Create or update a task from the drawer. Returns its id. */
export async function saveTask(t: Tx, input: TaskFormInput, user: { id: string }, id?: string | null): Promise<string> {
  const { dueAt, allDay } = dueFromForm(input);
  let taskId: string;
  if (!id) {
    const created = await createTask(
      {
        title: input.title,
        body: input.body,
        type: input.type as TaskType,
        priority: input.priority,
        dueAt,
        allDay,
        ownerUserId: input.ownerUserId,
        recurrenceRule: input.recurrenceRule,
        remindBeforeMinutes: input.remindBeforeMinutes,
        createdFrom: 'manual',
        createdBy: user.id,
        links: toTaskLinks(input.links),
      },
      t,
    );
    taskId = created.id;
  } else {
    await t`
      update tasks
         set title = ${input.title}, body = ${input.body}, type = ${input.type}, priority = ${input.priority},
             due_at = ${dueAt}, all_day = ${allDay}, owner_user_id = ${input.ownerUserId},
             recurrence_rule = ${input.recurrenceRule}, remind_before_minutes = ${input.remindBeforeMinutes}
       where id = ${id} and deleted_at is null`;
    // Replace the links: drop the ones that went, add the new ones.
    const current = await t<{ id: string; col: LinkType; ref: string }[]>`
      select id,
             case when organization_id is not null then 'organization' when contact_id is not null then 'contact'
                  when lead_id is not null then 'lead' when deal_id is not null then 'deal'
                  when project_id is not null then 'project' when ticket_id is not null then 'ticket' else 'invoice' end as col,
             coalesce(organization_id, contact_id, lead_id, deal_id, project_id, ticket_id, invoice_id) as ref
        from task_links where task_id = ${id}`;
    const want = new Set(input.links.map((l) => `${l.type}:${l.id}`));
    const have = new Set(current.map((c) => `${c.col}:${c.ref}`));
    for (const c of current) if (!want.has(`${c.col}:${c.ref}`)) await t`delete from task_links where id = ${c.id}`;
    for (const l of input.links) {
      if (have.has(`${l.type}:${l.id}`)) continue;
      await t`insert into task_links (task_id, ${t(LINK_SQL_COL[l.type])}) values (${id}, ${l.id})`;
      have.add(`${l.type}:${l.id}`);
    }
    taskId = id;
  }
  await syncTaskReminder(t, taskId);
  return taskId;
}

// ---------------------------------------------------------------- reading

export type DoneTask = TaskListItem & { completedAt: string };

const LINKS_SQL = (db: Db, idCol: string) => db.unsafe(`
  (select json_agg(json_build_object('type', x.type, 'id', x.id, 'label', x.label) order by x.ord)
     from (
       select 1 as ord, 'organization' as type, o.id, o.name as label from task_links l join organizations o on o.id = l.organization_id where l.task_id = ${idCol}
       union all select 2, 'contact', c.id, c.full_name from task_links l join contacts c on c.id = l.contact_id where l.task_id = ${idCol}
       union all select 3, 'lead', ld.id, 'Lead · ' || coalesce(ld.name, lc.full_name, lo.name, 'Untitled')
         from task_links l join leads ld on ld.id = l.lead_id
         left join contacts lc on lc.id = ld.contact_id left join organizations lo on lo.id = ld.organization_id
        where l.task_id = ${idCol}
       union all select 4, 'deal', d.id, d.name from task_links l join deals d on d.id = l.deal_id where l.task_id = ${idCol}
       union all select 5, 'project', p.id, 'Project · ' || p.name from task_links l join projects p on p.id = l.project_id where l.task_id = ${idCol}
       union all select 6, 'ticket', tk.id, 'Ticket ' || tk.number from task_links l join tickets tk on tk.id = l.ticket_id where l.task_id = ${idCol}
       union all select 7, 'invoice', i.id, coalesce(i.external_number, 'Draft invoice') from task_links l join invoices i on i.id = l.invoice_id where l.task_id = ${idCol}
     ) x)`);

type RawTask = {
  id: string; title: string; body: string | null; type: TaskType; priority: 'low' | 'medium' | 'high';
  status: TaskListItem['status']; due_at: Date | null; all_day: boolean; owner_user_id: string | null;
  owner_name: string | null; owner_initials: string | null; owner_avatar_bg: string | null; recurrence_rule: string | null;
  completed_at: Date | null; links: { type: RecordType; id: string; label: string }[] | null;
};

function toItem(r: RawTask, bucket: TaskListItem['bucket'] = 'later'): TaskListItem {
  return {
    id: r.id,
    title: r.title,
    body: r.body,
    type: r.type,
    priority: r.priority,
    status: r.status,
    dueAt: r.due_at ? new Date(r.due_at).toISOString() : null,
    allDay: r.all_day,
    bucket,
    isOverdue: false,
    ownerUserId: r.owner_user_id,
    ownerName: r.owner_name,
    ownerInitials: r.owner_initials,
    ownerAvatarBg: r.owner_avatar_bg,
    recurrenceRule: r.recurrence_rule,
    repeat: describeRecurrence(r.recurrence_rule),
    links: (r.links ?? []).map((l) => ({ ...l, href: recordHref(l.type, l.id) })),
  };
}

/** Tasks completed in the last `days` days. owner as in taskBuckets: id, 'all' or null for the queue. */
export async function doneTasks(opts: { owner?: string | null | 'all'; days?: number; since?: 'today' } = {}, db: Db = sql): Promise<DoneTask[]> {
  const owner = opts.owner === undefined ? 'all' : opts.owner;
  const days = opts.days ?? 14;
  const rows = await db<RawTask[]>`
    select t.id, t.title, t.body, t.type, t.priority, t.status, t.due_at, t.all_day, t.owner_user_id,
           u.name as owner_name, u.initials as owner_initials, u.avatar_bg as owner_avatar_bg, t.recurrence_rule, t.completed_at,
           ${LINKS_SQL(db, 't.id')} as links
      from tasks t left join users u on u.id = t.owner_user_id
     where t.status = 'completed' and t.deleted_at is null
       and (case when ${opts.since === 'today'}
                 then (t.completed_at at time zone 'Europe/Amsterdam')::date = crm_today()
                 else t.completed_at >= now() - make_interval(days => ${days}) end)
       and (${owner === 'all'} or (${owner === null} and t.owner_user_id is null)
            or t.owner_user_id = ${owner === 'all' || owner === null ? null : owner}::uuid)
     order by t.completed_at desc
     limit 200`;
  return rows.map((r) => ({ ...toItem(r), completedAt: new Date(r.completed_at as Date).toISOString() }));
}

/** The home list: that user's overdue and today tasks, and the ones they finished today (shown ticked). */
export async function dayTasks(userId: string, db: Db = sql): Promise<{ open: TaskListItem[]; done: DoneTask[] }> {
  const [b, done] = await Promise.all([taskBuckets({ owner: userId }, db), doneTasks({ owner: userId, since: 'today' }, db)]);
  return { open: [...b.overdue, ...b.today], done };
}

export type TaskDetail = {
  id: string;
  title: string;
  body: string | null;
  type: TaskType;
  priority: 'low' | 'medium' | 'high';
  status: TaskListItem['status'];
  ownerUserId: string | null;
  dueDate: string;
  dueTime: string;
  recurrenceRule: string;
  remindBeforeMinutes: string;
  links: { type: LinkType; id: string; label: string }[];
};

/** One task for the edit drawer, or null. */
export async function loadTask(id: string, db: Db = sql): Promise<TaskDetail | null> {
  if (!uuid.safeParse(id).success) return null;
  const [r] = await db<(RawTask & { remind_before_minutes: number | null })[]>`
    select t.id, t.title, t.body, t.type, t.priority, t.status, t.due_at, t.all_day, t.owner_user_id,
           null::text as owner_name, null::text as owner_initials, null::text as owner_avatar_bg, t.recurrence_rule, t.completed_at,
           t.remind_before_minutes, ${LINKS_SQL(db, 't.id')} as links
      from tasks t where t.id = ${id} and t.deleted_at is null`;
  if (!r) return null;
  return {
    id: r.id,
    title: r.title,
    body: r.body,
    type: r.type,
    priority: r.priority,
    status: r.status,
    ownerUserId: r.owner_user_id,
    dueDate: r.due_at ? dayKey(r.due_at) ?? '' : '',
    dueTime: r.due_at && !r.all_day ? formatTime(r.due_at) : '',
    recurrenceRule: r.recurrence_rule ?? '',
    remindBeforeMinutes: r.remind_before_minutes === null ? '' : String(r.remind_before_minutes),
    links: (r.links ?? []).filter((l): l is { type: LinkType; id: string; label: string } => l.type !== 'task'),
  };
}

/** Search one record type by name, for the link pickers. */
export async function searchRecords(type: LinkType, q: string, db: Db = sql): Promise<RecordHit[]> {
  const term = q.trim().slice(0, 100);
  const like = `%${term.replace(/[\\%_]/g, (m) => `\\${m}`)}%`;
  type Row = { id: string; label: string; sub: string | null };
  let rows: Row[] = [];
  switch (type) {
    case 'organization':
      rows = await db<Row[]>`
        select o.id, o.name as label, o.city as sub from organizations o
         where o.deleted_at is null and (${term === ''} or o.name ilike ${like})
         order by (o.name ilike ${term + '%'}) desc, o.name limit 8`;
      break;
    case 'contact':
      rows = await db<Row[]>`
        select c.id, c.full_name as label, o.name as sub from contacts c left join organizations o on o.id = c.primary_org_id
         where c.deleted_at is null and (${term === ''} or c.full_name ilike ${like} or o.name ilike ${like})
         order by (c.full_name ilike ${term + '%'}) desc, c.full_name limit 8`;
      break;
    case 'lead':
      rows = await db<Row[]>`
        select l.id, coalesce(l.name, c.full_name, o.name, 'Untitled lead') as label, concat_ws(', ', o.name, s.name) as sub
          from leads l left join contacts c on c.id = l.contact_id left join organizations o on o.id = l.organization_id
          join pipeline_stages s on s.id = l.stage_id
         where l.deleted_at is null and (${term === ''} or l.name ilike ${like} or c.full_name ilike ${like} or o.name ilike ${like})
         order by (s.state = 'open') desc, l.updated_at desc limit 8`;
      break;
    case 'deal':
      rows = await db<Row[]>`
        select d.id, d.name as label, concat_ws(', ', o.name, s.name) as sub
          from deals d join pipeline_stages s on s.id = d.stage_id left join organizations o on o.id = d.organization_id
         where d.deleted_at is null and (${term === ''} or d.name ilike ${like} or o.name ilike ${like})
         order by (s.state = 'open') desc, d.updated_at desc limit 8`;
      break;
    case 'project':
      rows = await db<Row[]>`
        select p.id, p.name as label, o.name as sub from projects p left join organizations o on o.id = p.organization_id
         where p.deleted_at is null and (${term === ''} or p.name ilike ${like} or o.name ilike ${like})
         order by (p.status = 'active') desc, p.updated_at desc limit 8`;
      break;
    case 'ticket':
      rows = await db<Row[]>`
        select tk.id, 'Ticket ' || tk.number || ', ' || tk.subject as label, o.name as sub
          from tickets tk left join organizations o on o.id = tk.organization_id
         where tk.deleted_at is null
           and (${term === ''} or tk.subject ilike ${like} or tk.number::text = ${term.replace(/\D/g, '') || '-1'} or o.name ilike ${like})
         order by tk.closed_at is null desc, tk.opened_at desc limit 8`;
      break;
    case 'invoice':
      rows = await db<Row[]>`
        select i.id, coalesce(i.external_number, 'Draft invoice') || coalesce(', ' || i.title, '') as label,
               concat_ws(', ', o.name, initcap(i.state)) as sub
          from invoices i left join organizations o on o.id = i.organization_id
         where i.deleted_at is null and (${term === ''} or i.external_number ilike ${like} or i.title ilike ${like} or o.name ilike ${like})
         order by i.created_at desc limit 8`;
      break;
  }
  return rows.map((r) => ({ type, id: r.id, label: r.label, sub: r.sub ?? '' }));
}
