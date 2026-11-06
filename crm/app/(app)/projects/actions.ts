'use server';
/**
 * Project server actions (agent F). Every action: requireUser, can(), zod,
 * tx() with the actor, then revalidatePath.
 */
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { requireUser, type CurrentUser } from '@/lib/auth';
import { can } from '@/lib/permissions';
import { sql, tx } from '@/lib/db';
import { logActivity } from '@/lib/activities';
import { completeTask, createTask } from '@/lib/tasks';
import { moveStage, StageMoveError } from '@/lib/stages';
import { amsterdamTime, todayKey } from '@/lib/format';
import { getFieldDefinitions, parseCustomForm, validateCustom } from '@/lib/fields';
import { fail, str, bool, zodFieldErrors, type ActionState } from '@/lib/forms';
import { HEALTH, PROJECT_KINDS, PROJECT_STATUSES } from '@/lib/options';
import { addMilestone, addTimeEntry, createProject, parseHours, ProjectError, removeMilestone, removeTimeEntry, setMilestoneDone } from '@/lib/delivery/projects';
import { dateKey, decimal, money, oneOf, url, uuid } from '@/lib/delivery/parse';

type ProjectPerm = { id: string; owner_user_id: string | null; organization_id: string | null };

async function loadProject(id: string | null): Promise<ProjectPerm | null> {
  if (!id || !/^[0-9a-f-]{36}$/i.test(id)) return null;
  const [p] = await sql<ProjectPerm[]>`select id, owner_user_id, organization_id from projects where id = ${id} and deleted_at is null`;
  return p ?? null;
}

async function editable(user: CurrentUser, id: string | null): Promise<ProjectPerm | ActionState> {
  const p = await loadProject(id);
  if (!p) return fail('Project not found');
  if (!can(user, 'edit', 'project', p)) return fail("You can't edit this project");
  return p;
}

function isState(x: unknown): x is ActionState {
  return typeof x === 'object' && x !== null && 'ok' in x;
}

function errorMessage(e: unknown): string {
  if (e instanceof ProjectError || e instanceof StageMoveError) return e.message;
  console.error(e);
  return 'Something went wrong, try again';
}

const values = (opts: { value: string }[]) => opts.map((o) => o.value);

// ---------------------------------------------------------------- create

const createSchema = z.object({
  name: z.string({ message: 'Give the project a name' }).trim().min(1, 'Give the project a name').max(200),
  kind: oneOf(values(PROJECT_KINDS)),
  organization_id: uuid(),
  deal_id: uuid(),
  owner_user_id: uuid(),
  budget_amount: money(),
  budget_hours: decimal({ max: 100000 }),
  start_date: dateKey(),
  due_date: dateKey(),
});

export async function createProjectAction(_prev: ActionState, fd: FormData): Promise<ActionState> {
  const user = await requireUser();
  if (!can(user, 'create', 'project')) return fail("You can't create projects");
  const parsed = createSchema.safeParse({
    name: str(fd, 'name') ?? '',
    kind: str(fd, 'kind'),
    organization_id: str(fd, 'organization_id'),
    deal_id: str(fd, 'deal_id'),
    owner_user_id: str(fd, 'owner_user_id'),
    budget_amount: str(fd, 'budget_amount'),
    budget_hours: str(fd, 'budget_hours'),
    start_date: str(fd, 'start_date'),
    due_date: str(fd, 'due_date'),
  });
  if (!parsed.success) return fail('Check the highlighted fields', zodFieldErrors(parsed.error));
  const v = parsed.data;
  if (v.start_date && v.due_date && v.due_date < v.start_date) return fail('Check the highlighted fields', { due_date: 'Due date is before the start date' });
  try {
    const id = await tx(
      (t) =>
        createProject(t, {
          name: v.name,
          kind: (v.kind ?? 'delivery') as 'delivery',
          organizationId: v.organization_id,
          dealId: v.deal_id,
          ownerUserId: v.owner_user_id ?? user.id,
          budgetAmount: v.budget_amount,
          budgetHours: v.budget_hours,
          startDate: v.start_date,
          dueDate: v.due_date,
          actorUserId: user.id,
        }),
      { userId: user.id },
    );
    revalidatePath('/projects');
    return { ok: true, id, href: `/projects/${id}` };
  } catch (e) {
    return fail(errorMessage(e));
  }
}

// ---------------------------------------------------------------- properties

const propsSchema = z.object({
  name: z.string().trim().min(1, 'Give the project a name').max(200).optional(),
  kind: oneOf(values(PROJECT_KINDS)).optional(),
  status: oneOf(values(PROJECT_STATUSES)).optional(),
  health: oneOf(values(HEALTH)).optional(),
  owner_user_id: uuid().optional(),
  start_date: dateKey().optional(),
  due_date: dateKey().optional(),
  budget_amount: money().optional(),
  budget_hours: decimal({ max: 100000 }).optional(),
  hourly_rate: money().optional(),
  organization_id: uuid().optional(),
  deal_id: uuid().optional(),
  live_url: url().optional(),
  repo_url: url().optional(),
  description: z.string().trim().max(5000).nullable().optional(),
});

const PROP_KEYS = Object.keys(propsSchema.shape) as (keyof z.infer<typeof propsSchema>)[];
const NOT_NULL = new Set(['name', 'kind', 'status', 'health']);

export async function updateProjectProperties(_prev: ActionState, fd: FormData): Promise<ActionState> {
  const user = await requireUser();
  const p = await editable(user, str(fd, 'id'));
  if (isState(p)) return p;
  const input: Record<string, string | null> = {};
  for (const k of PROP_KEYS) if (fd.has(k)) input[k] = str(fd, k);
  const parsed = propsSchema.safeParse(input);
  if (!parsed.success) return fail('Check the highlighted fields', zodFieldErrors(parsed.error));
  const patch: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(parsed.data)) {
    if (v === undefined) continue;
    if (v === null && NOT_NULL.has(k)) return fail('Check the highlighted fields', { [k]: 'This one needs a value' });
    patch[k] = v;
  }
  const defs = await getFieldDefinitions('project');
  const customRaw = parseCustomForm(defs, fd);
  const custom = validateCustom(defs, customRaw, { partial: true });
  if (!custom.ok) return fail('Check the highlighted fields', Object.fromEntries(Object.entries(custom.errors).map(([k, m]) => [`custom.${k}`, m])));
  try {
    await tx(
      async (t) => {
        if (Object.keys(patch).length) await t`update projects set ${t(patch as Record<string, any>)} where id = ${p.id}`; // eslint-disable-line @typescript-eslint/no-explicit-any
        if (Object.keys(custom.value).length) await t`update projects set custom = custom || ${t.json(custom.value as never)} where id = ${p.id}`;
      },
      { userId: user.id },
    );
  } catch (e) {
    return fail(errorMessage(e));
  }
  revalidatePath(`/projects/${p.id}`);
  revalidatePath('/projects');
  return { ok: true };
}

// ---------------------------------------------------------------- stage

export async function moveProjectStage(_prev: ActionState, fd: FormData): Promise<ActionState> {
  const user = await requireUser();
  const p = await editable(user, str(fd, 'recordId'));
  if (isState(p)) return p;
  const toStageId = str(fd, 'toStageId');
  if (!toStageId) return fail('Pick a stage');
  try {
    await tx((t) => moveStage(t, { objectType: 'project', recordId: p.id, toStageId, reason: str(fd, 'reason'), actor: { type: 'user', id: user.id }, source: 'record' }), {
      userId: user.id,
    });
  } catch (e) {
    return fail(errorMessage(e));
  }
  revalidatePath(`/projects/${p.id}`);
  revalidatePath('/projects');
  return { ok: true };
}

// ---------------------------------------------------------------- milestones

const milestoneSchema = z.object({
  name: z.string({ message: 'Name the milestone' }).trim().min(1, 'Name the milestone').max(200),
  due_date: dateKey(),
  amount: money(),
});

export async function addMilestoneAction(_prev: ActionState, fd: FormData): Promise<ActionState> {
  const user = await requireUser();
  const p = await editable(user, str(fd, 'projectId'));
  if (isState(p)) return p;
  const parsed = milestoneSchema.safeParse({ name: str(fd, 'name') ?? '', due_date: str(fd, 'due_date'), amount: str(fd, 'amount') });
  if (!parsed.success) return fail(parsed.error.issues[0]?.message ?? 'Check the milestone', zodFieldErrors(parsed.error));
  await tx((t) => addMilestone(t, p.id, { name: parsed.data.name, dueDate: parsed.data.due_date, amount: parsed.data.amount }), { userId: user.id });
  revalidatePath(`/projects/${p.id}`);
  return { ok: true };
}

export async function toggleMilestoneAction(_prev: ActionState, fd: FormData): Promise<ActionState> {
  const user = await requireUser();
  const p = await editable(user, str(fd, 'projectId'));
  if (isState(p)) return p;
  const id = str(fd, 'milestoneId');
  if (!id) return fail('Milestone not found');
  try {
    await tx(
      async (t) => {
        const [m] = await t<{ project_id: string }[]>`select project_id from project_milestones where id = ${id}`;
        if (m?.project_id !== p.id) throw new ProjectError('Milestone not found');
        await setMilestoneDone(t, id, bool(fd, 'done'), user.id);
      },
      { userId: user.id },
    );
  } catch (e) {
    return fail(errorMessage(e));
  }
  revalidatePath(`/projects/${p.id}`);
  return { ok: true };
}

export async function removeMilestoneAction(_prev: ActionState, fd: FormData): Promise<ActionState> {
  const user = await requireUser();
  const p = await editable(user, str(fd, 'projectId'));
  if (isState(p)) return p;
  const id = str(fd, 'milestoneId');
  if (!id) return fail('Milestone not found');
  await tx(
    async (t) => {
      const [m] = await t<{ project_id: string }[]>`select project_id from project_milestones where id = ${id}`;
      if (m?.project_id === p.id) await removeMilestone(t, id);
    },
    { userId: user.id },
  );
  revalidatePath(`/projects/${p.id}`);
  return { ok: true };
}

// ---------------------------------------------------------------- time

const timeSchema = z.object({
  user_id: uuid('Pick who did the work'),
  work_date: dateKey('Pick the day'),
  description: z.string().trim().max(1000).nullable(),
});

export async function addTimeEntryAction(_prev: ActionState, fd: FormData): Promise<ActionState> {
  const user = await requireUser();
  const p = await loadProject(str(fd, 'projectId'));
  if (!p) return fail('Project not found');
  const parsed = timeSchema.safeParse({ user_id: str(fd, 'user_id'), work_date: str(fd, 'work_date') ?? todayKey(), description: str(fd, 'description') });
  if (!parsed.success) return fail(parsed.error.issues[0]?.message ?? 'Check the entry', zodFieldErrors(parsed.error));
  const who = parsed.data.user_id ?? user.id;
  // Anyone who can see a project logs their own time; logging for someone else needs edit rights.
  if (!can(user, 'view', 'project', p) || (who !== user.id && !can(user, 'edit', 'project', p))) {
    return fail("You can't log time for someone else on this project");
  }
  const minutes = parseHours(str(fd, 'hours'));
  if (minutes === null || minutes <= 0) return fail('Enter hours like 1.5 or 1:30', { hours: 'Enter hours like 1.5 or 1:30' });
  if (parsed.data.work_date! > todayKey()) return fail('Time is logged for today or earlier', { work_date: 'Pick today or an earlier day' });
  try {
    await tx(
      (t) => addTimeEntry(t, p.id, { userId: who, workDate: parsed.data.work_date!, minutes, description: parsed.data.description, billable: bool(fd, 'billable') }),
      { userId: user.id },
    );
  } catch (e) {
    return fail(errorMessage(e));
  }
  revalidatePath(`/projects/${p.id}`);
  revalidatePath('/projects');
  return { ok: true, message: 'Time logged' };
}

export async function removeTimeEntryAction(_prev: ActionState, fd: FormData): Promise<ActionState> {
  const user = await requireUser();
  const p = await loadProject(str(fd, 'projectId'));
  if (!p) return fail('Project not found');
  const id = str(fd, 'entryId');
  if (!id) return fail('Time entry not found');
  try {
    await tx(
      async (t) => {
        const [e] = await t<{ project_id: string; user_id: string }[]>`select project_id, user_id from time_entries where id = ${id}`;
        if (!e || e.project_id !== p.id) throw new ProjectError('Time entry not found');
        if (e.user_id !== user.id && !can(user, 'edit', 'project', p)) throw new ProjectError("You can't remove someone else's time");
        await removeTimeEntry(t, id);
      },
      { userId: user.id },
    );
  } catch (e) {
    return fail(errorMessage(e));
  }
  revalidatePath(`/projects/${p.id}`);
  return { ok: true };
}

// ---------------------------------------------------------------- notes and tasks

export async function addProjectNote(_prev: ActionState, fd: FormData): Promise<ActionState> {
  const user = await requireUser();
  const p = await loadProject(str(fd, 'projectId'));
  if (!p) return fail('Project not found');
  if (!can(user, 'create', 'activity')) return fail("You can't add notes");
  const body = str(fd, 'body');
  if (!body) return fail('Write the note first');
  await tx(
    (t) =>
      logActivity(
        {
          kind: 'note',
          title: `Note from ${user.name}`,
          body,
          actorUserId: user.id,
          links: [{ projectId: p.id, isPrimary: true }, { organizationId: p.organization_id }],
          autoLink: false,
        },
        t,
      ),
    { userId: user.id },
  );
  revalidatePath(`/projects/${p.id}`);
  return { ok: true };
}

const taskSchema = z.object({
  title: z.string({ message: 'Name the task' }).trim().min(1, 'Name the task').max(300),
  owner_user_id: uuid(),
  due_date: dateKey(),
});

export async function addProjectTask(_prev: ActionState, fd: FormData): Promise<ActionState> {
  const user = await requireUser();
  const p = await loadProject(str(fd, 'projectId'));
  if (!p) return fail('Project not found');
  if (!can(user, 'create', 'task')) return fail("You can't create tasks");
  const parsed = taskSchema.safeParse({ title: str(fd, 'title') ?? '', owner_user_id: str(fd, 'owner_user_id'), due_date: str(fd, 'due_date') });
  if (!parsed.success) return fail(parsed.error.issues[0]?.message ?? 'Check the task', zodFieldErrors(parsed.error));
  await tx(
    (t) =>
      createTask(
        {
          title: parsed.data.title,
          type: 'todo',
          ownerUserId: parsed.data.owner_user_id ?? user.id,
          dueAt: parsed.data.due_date ? amsterdamTime(parsed.data.due_date, '17:00') : null,
          allDay: true,
          createdBy: user.id,
          links: [{ projectId: p.id }, ...(p.organization_id ? [{ organizationId: p.organization_id }] : [])],
        },
        t,
      ),
    { userId: user.id },
  );
  revalidatePath(`/projects/${p.id}`);
  return { ok: true };
}

// ---------------------------------------------------------------- linked tasks (projects and tickets)

export async function completeLinkedTask(_prev: ActionState, fd: FormData): Promise<ActionState> {
  const user = await requireUser();
  const id = str(fd, 'taskId');
  const back = str(fd, 'back');
  if (!id) return fail('Task not found');
  const [task] = await sql<{ owner_user_id: string | null; completed_at: Date | null }[]>`
    select owner_user_id, completed_at from tasks where id = ${id} and deleted_at is null`;
  if (!task) return fail('Task not found');
  if (!can(user, 'edit', 'task', task)) return fail("You can't complete someone else's task");
  await tx((t) => completeTask(id, user.id, t), { userId: user.id });
  if (back && back.startsWith('/')) revalidatePath(back);
  return { ok: true };
}
