'use server';
/**
 * Ticket server actions (agent F). Nothing here sends a message: a reply is a
 * record of what was sent to the client, V1 never sends.
 */
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { requireUser, type CurrentUser } from '@/lib/auth';
import { can } from '@/lib/permissions';
import { sql, tx } from '@/lib/db';
import { moveStage, StageMoveError } from '@/lib/stages';
import { getFieldDefinitions, parseCustomForm, validateCustom } from '@/lib/fields';
import { bool, fail, str, zodFieldErrors, type ActionState } from '@/lib/forms';
import { TICKET_PRIORITIES, TICKET_SOURCES } from '@/lib/options';
import { createTicket, logTicketNote, logTicketReply, setTicketPriority, TicketError, type TicketPriority, type TicketSource } from '@/lib/service/tickets';
import { oneOf, uuid } from '@/lib/delivery/parse';

type TicketPerm = { id: string; owner_user_id: string | null; organization_id: string | null; priority: string };

async function loadTicket(id: string | null): Promise<TicketPerm | null> {
  if (!id || !/^[0-9a-f-]{36}$/i.test(id)) return null;
  const [t] = await sql<TicketPerm[]>`select id, owner_user_id, organization_id, priority from tickets where id = ${id} and deleted_at is null`;
  return t ?? null;
}

async function editable(user: CurrentUser, id: string | null): Promise<TicketPerm | ActionState> {
  const t = await loadTicket(id);
  if (!t) return fail('Ticket not found');
  if (!can(user, 'edit', 'ticket', t)) return fail("You can't edit this ticket");
  return t;
}

const isState = (x: unknown): x is ActionState => typeof x === 'object' && x !== null && 'ok' in x;

function errorMessage(e: unknown): string {
  if (e instanceof TicketError || e instanceof StageMoveError) return e.message;
  console.error(e);
  return 'Something went wrong, try again';
}

const values = (opts: { value: string }[]) => opts.map((o) => o.value);

const createSchema = z.object({
  subject: z.string({ message: 'Give the ticket a subject' }).trim().min(1, 'Give the ticket a subject').max(300),
  description: z.string().trim().max(10000).nullable(),
  priority: oneOf(values(TICKET_PRIORITIES)),
  source: oneOf(values(TICKET_SOURCES)),
  category: z.string().trim().max(100).nullable(),
  organization_id: uuid(),
  contact_id: uuid(),
  project_id: uuid(),
  owner_user_id: uuid(),
});

export async function createTicketAction(_prev: ActionState, fd: FormData): Promise<ActionState> {
  const user = await requireUser();
  if (!can(user, 'create', 'ticket')) return fail("You can't create tickets");
  const parsed = createSchema.safeParse({
    subject: str(fd, 'subject') ?? '',
    description: str(fd, 'description'),
    priority: str(fd, 'priority'),
    source: str(fd, 'source'),
    category: str(fd, 'category'),
    organization_id: str(fd, 'organization_id'),
    contact_id: str(fd, 'contact_id'),
    project_id: str(fd, 'project_id'),
    owner_user_id: str(fd, 'owner_user_id'),
  });
  if (!parsed.success) return fail('Check the highlighted fields', zodFieldErrors(parsed.error));
  const v = parsed.data;
  try {
    const res = await tx(
      (t) =>
        createTicket(t, {
          subject: v.subject,
          description: v.description,
          priority: (v.priority ?? 'medium') as TicketPriority,
          source: (v.source ?? 'manual') as TicketSource,
          category: v.category,
          organizationId: v.organization_id,
          contactId: v.contact_id,
          projectId: v.project_id,
          ownerUserId: v.owner_user_id ?? user.id,
          actorUserId: user.id,
        }),
      { userId: user.id },
    );
    revalidatePath('/tickets');
    return { ok: true, id: res.id, href: `/tickets/${res.id}` };
  } catch (e) {
    return fail(errorMessage(e));
  }
}

const propsSchema = z.object({
  subject: z.string().trim().min(1, 'Give the ticket a subject').max(300).optional(),
  description: z.string().trim().max(10000).nullable().optional(),
  priority: oneOf(values(TICKET_PRIORITIES)).optional(),
  source: oneOf(values(TICKET_SOURCES)).optional(),
  category: z.string().trim().max(100).nullable().optional(),
  owner_user_id: uuid().optional(),
  organization_id: uuid().optional(),
  contact_id: uuid().optional(),
  project_id: uuid().optional(),
});
const PROP_KEYS = Object.keys(propsSchema.shape) as (keyof z.infer<typeof propsSchema>)[];
const NOT_NULL = new Set(['subject', 'priority', 'source']);

export async function updateTicketProperties(_prev: ActionState, fd: FormData): Promise<ActionState> {
  const user = await requireUser();
  const tk = await editable(user, str(fd, 'id'));
  if (isState(tk)) return tk;
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
  const newPriority = patch.priority as TicketPriority | undefined;
  delete patch.priority;
  const defs = await getFieldDefinitions('ticket');
  const custom = validateCustom(defs, parseCustomForm(defs, fd), { partial: true });
  if (!custom.ok) return fail('Check the highlighted fields', Object.fromEntries(Object.entries(custom.errors).map(([k, m]) => [`custom.${k}`, m])));
  try {
    await tx(
      async (t) => {
        if (Object.keys(patch).length) await t`update tickets set ${t(patch as Record<string, any>)} where id = ${tk.id}`; // eslint-disable-line @typescript-eslint/no-explicit-any
        if (newPriority && newPriority !== tk.priority) await setTicketPriority(t, tk.id, newPriority, user.id);
        if (Object.keys(custom.value).length) await t`update tickets set custom = custom || ${t.json(custom.value as never)} where id = ${tk.id}`;
      },
      { userId: user.id },
    );
  } catch (e) {
    return fail(errorMessage(e));
  }
  revalidatePath(`/tickets/${tk.id}`);
  revalidatePath('/tickets');
  return { ok: true };
}

export async function moveTicketStage(_prev: ActionState, fd: FormData): Promise<ActionState> {
  const user = await requireUser();
  const tk = await editable(user, str(fd, 'recordId'));
  if (isState(tk)) return tk;
  const toStageId = str(fd, 'toStageId');
  if (!toStageId) return fail('Pick a status');
  try {
    await tx((t) => moveStage(t, { objectType: 'ticket', recordId: tk.id, toStageId, reason: str(fd, 'reason'), actor: { type: 'user', id: user.id }, source: 'record' }), {
      userId: user.id,
    });
  } catch (e) {
    return fail(errorMessage(e));
  }
  revalidatePath(`/tickets/${tk.id}`);
  revalidatePath('/tickets');
  return { ok: true };
}

/** The composer: mode reply logs an outbound reply (first reply sets first_replied_at), mode note an internal note. */
export async function ticketComposerAction(_prev: ActionState, fd: FormData): Promise<ActionState> {
  const user = await requireUser();
  const tk = await loadTicket(str(fd, 'ticketId'));
  if (!tk) return fail('Ticket not found');
  const body = str(fd, 'body');
  if (!body) return fail('Write something first');
  if (body.length > 20000) return fail('That is too long for one entry');
  const mode = str(fd, 'mode') === 'note' ? 'note' : 'reply';
  if (mode === 'reply' && !can(user, 'edit', 'ticket', tk)) return fail("You can't reply on this ticket");
  if (mode === 'note' && !can(user, 'create', 'activity')) return fail("You can't add notes");
  try {
    let message = 'Note saved';
    await tx(
      async (t) => {
        if (mode === 'note') {
          await logTicketNote(t, tk.id, { body, actorUserId: user.id });
        } else {
          const res = await logTicketReply(t, tk.id, { body, actorUserId: user.id, waitOnClient: bool(fd, 'wait') });
          message = res.firstReply ? 'Reply logged, first reply time recorded' : 'Reply logged';
        }
      },
      { userId: user.id },
    );
    revalidatePath(`/tickets/${tk.id}`);
    revalidatePath('/tickets');
    return { ok: true, message };
  } catch (e) {
    return fail(errorMessage(e));
  }
}

/** Timeline note composer on the ticket page. */
export async function addTicketNote(_prev: ActionState, fd: FormData): Promise<ActionState> {
  fd.set('mode', 'note');
  return ticketComposerAction(_prev, fd);
}
