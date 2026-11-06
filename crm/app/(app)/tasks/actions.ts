'use server';
/**
 * Task actions (agent C). Used by /tasks and the home list.
 *   toggleTaskAction(id, done)     complete (creates the next repeat) or reopen
 *   saveTaskAction(prev, fd)       create or edit from the drawer, id in fd when editing
 *   searchLinksAction(type, q)     the record pickers in the drawer
 */
import { revalidatePath } from 'next/cache';
import { requireUser } from '@/lib/auth';
import { sql, tx } from '@/lib/db';
import { can } from '@/lib/permissions';
import { completeTask, reopenTask } from '@/lib/tasks';
import { fail, str, type ActionState } from '@/lib/forms';
import { formatDue } from '@/lib/format';
import { logActivity, type ActivityLink } from '@/lib/activities';
import { LINK_TYPES, missingLink, parseTaskForm, saveTask, searchRecords, type LinkType, type RecordHit } from '@/lib/work/tasks';

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

async function taskRow(id: string) {
  const [row] = await sql<{ id: string; title: string; owner_user_id: string | null; created_by: string | null; status: string }[]>`
    select id, title, owner_user_id, created_by, status from tasks where id = ${id} and deleted_at is null`;
  return row ?? null;
}

function refresh() {
  revalidatePath('/', 'layout');
}

export type ToggleResult = { ok: boolean; error?: string; message?: string };

export async function toggleTaskAction(id: string, done: boolean): Promise<ToggleResult> {
  const user = await requireUser();
  if (!UUID.test(id)) return { ok: false, error: 'That task no longer exists' };
  const row = await taskRow(id);
  if (!row) return { ok: false, error: 'That task no longer exists' };
  if (!can(user, 'edit', 'task', row)) return { ok: false, error: "You can only tick off your own tasks" };
  let message: string | undefined;
  await tx(
    async (t) => {
      if (done) {
        const res = await completeTask(id, user.id, t);
        if (res.nextTaskId) {
          const [next] = await t<{ due_at: Date | null; all_day: boolean }[]>`select due_at, all_day from tasks where id = ${res.nextTaskId}`;
          if (next?.due_at) message = `Done. The next one is due ${formatDue(next.due_at, next.all_day)}.`;
        }
      } else {
        await reopenTask(id, user.id, t);
      }
    },
    { userId: user.id },
  );
  refresh();
  return { ok: true, message };
}

export async function saveTaskAction(_prev: ActionState, fd: FormData): Promise<ActionState> {
  const user = await requireUser();
  const id = str(fd, 'id');
  if (id) {
    if (!UUID.test(id)) return fail('That task no longer exists');
    const row = await taskRow(id);
    if (!row) return fail('That task no longer exists');
    if (!can(user, 'edit', 'task', row)) return fail('You can only edit your own tasks');
  } else if (!can(user, 'create', 'task')) {
    return fail("You can't create tasks");
  }
  const parsed = parseTaskForm(fd);
  if (!parsed.ok) return fail('Check the highlighted fields', parsed.fieldErrors);
  const input = parsed.data;
  if (input.ownerUserId) {
    const [owner] = await sql`select 1 from users where id = ${input.ownerUserId} and is_active`;
    if (!owner) return fail('Check the highlighted fields', { ownerUserId: 'Pick someone on the team' });
  }
  const missing = await missingLink(sql, input.links);
  if (missing) return fail(`One of the linked records is gone, remove the ${missing} and try again`);

  const taskId = await tx(
    async (t) => {
      const saved = await saveTask(t, input, user, id);
      if (!id) {
        const links = input.links.map((l) => ({ [`${l.type}Id`]: l.id }) as ActivityLink);
        if (links.length) {
          await logActivity(
            { kind: 'task', title: `${user.name} added a task, ${input.title}`, actorUserId: user.id, source: 'system', links, autoLink: false },
            t,
          );
        }
      }
      return saved;
    },
    { userId: user.id },
  );
  refresh();
  return { ok: true, id: taskId, message: id ? 'Task saved' : 'Task added' };
}

export async function searchLinksAction(type: string, q: string): Promise<RecordHit[]> {
  await requireUser();
  if (!LINK_TYPES.some((l) => l.value === type)) return [];
  return searchRecords(type as LinkType, String(q ?? ''));
}
