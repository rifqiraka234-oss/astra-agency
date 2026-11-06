/**
 * lib/service/tickets.ts, ticket writes and the SLA loader.
 *
 *   const { id, number } = await createTicket(t, { subject, priority: 'high', source: 'email', organizationId, actorUserId });
 *   await logTicketReply(t, id, { body, actorUserId, waitOnClient: true });   // sets first_replied_at once
 *   await logTicketNote(t, id, { body, actorUserId });
 *   await setTicketPriority(t, id, 'urgent', actorUserId);                    // also swaps the SLA policy
 *   const sla = await ticketSla(sql, id);                                      // SlaResult, lib/service/sla.ts
 *
 * Status changes go through moveStage (lib/stages.ts), which writes
 * ticket_status_events. Nothing here sends a message: a reply is the record of
 * what was sent to the client elsewhere (V1 never sends).
 */
import type { Db, Tx } from '../db';
import { logActivity } from '../activities';
import { emit } from '../events';
import { moveStage, stageByKey } from '../stages';
import { computeSla, DEFAULT_BUSINESS_HOURS, type BusinessHours, type SlaResult } from './sla';

export type TicketPriority = 'low' | 'medium' | 'high' | 'urgent';
export type TicketSource = 'portal' | 'email' | 'manual' | 'phone';

export class TicketError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TicketError';
  }
}

async function policyFor(db: Db, priority: TicketPriority): Promise<string | null> {
  const [p] = await db<{ id: string }[]>`select id from sla_policies where priority = ${priority} and is_default`;
  return p?.id ?? null;
}

export type CreateTicketInput = {
  subject: string;
  description?: string | null;
  priority?: TicketPriority;
  category?: string | null;
  source?: TicketSource;
  organizationId?: string | null;
  contactId?: string | null;
  projectId?: string | null;
  ownerUserId?: string | null;
  openedAt?: Date;
  actorUserId: string | null;
};

export async function createTicket(t: Tx, input: CreateTicketInput): Promise<{ id: string; number: number }> {
  const priority = input.priority ?? 'medium';
  const newStage = await stageByKey('tickets', 'new', t);
  const openedAt = input.openedAt ?? new Date();
  let orgId = input.organizationId ?? null;
  if (!orgId && input.projectId) {
    const [p] = await t<{ organization_id: string | null }[]>`select organization_id from projects where id = ${input.projectId}`;
    orgId = p?.organization_id ?? null;
  }
  const [row] = await t<{ id: string; number: number }[]>`
    insert into tickets (subject, description, organization_id, contact_id, project_id, pipeline_id, stage_id, priority,
                         category, source, owner_user_id, sla_policy_id, opened_at)
    values (${input.subject}, ${input.description ?? null}, ${orgId}, ${input.contactId ?? null}, ${input.projectId ?? null},
            ${newStage.pipeline_id}, ${newStage.id}, ${priority}, ${input.category ?? null}, ${input.source ?? 'manual'},
            ${input.ownerUserId ?? null}, ${await policyFor(t, priority)}, ${openedAt})
    returning id, number`;
  await t`
    insert into ticket_status_events (ticket_id, from_stage_id, to_stage_id, pauses_sla, actor_user_id, changed_at)
    values (${row.id}, null, ${newStage.id}, ${newStage.pauses_sla}, ${input.actorUserId}, ${openedAt})`;
  await t`
    insert into stage_transitions (object_type, record_id, pipeline_id, from_stage_id, to_stage_id, actor_type, actor_id, source, changed_at)
    values ('ticket', ${row.id}, ${newStage.pipeline_id}, null, ${newStage.id}, ${input.actorUserId ? 'user' : 'system'},
            ${input.actorUserId}, 'create', ${openedAt})`;
  await logActivity(
    {
      kind: 'ticket',
      direction: input.source === 'portal' || input.source === 'email' ? 'inbound' : 'internal',
      occurredAt: openedAt,
      actorUserId: input.actorUserId,
      title: `Ticket ${row.number} opened, ${input.subject}`,
      body: input.description ?? null,
      meta: { tags: [`${priority.charAt(0).toUpperCase()}${priority.slice(1)} priority`] },
      links: [{ ticketId: row.id, isPrimary: true }, { organizationId: orgId }, { contactId: input.contactId ?? null }, { projectId: input.projectId ?? null }],
      autoLink: false,
    },
    t,
  );
  const payload = { id: row.id, number: row.number, organizationId: orgId, priority, source: input.source ?? 'manual', ownerUserId: input.ownerUserId ?? null };
  const opts = { aggregateType: 'ticket', aggregateId: row.id, actorUserId: input.actorUserId };
  await emit(t, 'ticket.created', payload, opts);
  await emit(t, 'record.created', { type: 'ticket', id: row.id }, opts);
  return row;
}

async function lockTicket(t: Tx, id: string) {
  const [row] = await t<{ id: string; number: number; organization_id: string | null; contact_id: string | null; project_id: string | null; first_replied_at: Date | null; stage_key: string; stage_state: string; contact_name: string | null }[]>`
    select tk.id, tk.number, tk.organization_id, tk.contact_id, tk.project_id, tk.first_replied_at, s.key as stage_key, s.state as stage_state,
           c.full_name as contact_name
      from tickets tk join pipeline_stages s on s.id = tk.stage_id
      left join contacts c on c.id = tk.contact_id
     where tk.id = ${id} and tk.deleted_at is null
     for update of tk`;
  if (!row) throw new TicketError('Ticket not found');
  return row;
}

/**
 * Record a reply to the client. Sets first_replied_at the first time, and can
 * move the ticket to Waiting on client (which pauses the SLA clock).
 */
export async function logTicketReply(
  t: Tx,
  id: string,
  input: { body: string; actorUserId: string; waitOnClient?: boolean; at?: Date },
): Promise<{ firstReply: boolean }> {
  const tk = await lockTicket(t, id);
  const at = input.at ?? new Date();
  const firstReply = !tk.first_replied_at;
  if (firstReply) await t`update tickets set first_replied_at = ${at} where id = ${id}`;
  await logActivity(
    {
      kind: 'ticket',
      direction: 'outbound',
      occurredAt: at,
      actorUserId: input.actorUserId,
      title: `Reply on ticket ${tk.number}${tk.contact_name ? ` to ${tk.contact_name}` : ''}`,
      body: input.body,
      meta: { tags: firstReply ? ['First reply'] : [], reply: true },
      links: [{ ticketId: id, isPrimary: true }, { organizationId: tk.organization_id }, { contactId: tk.contact_id }, { projectId: tk.project_id }],
      autoLink: false,
    },
    t,
  );
  if (input.waitOnClient && tk.stage_state === 'open' && tk.stage_key !== 'waiting_on_client') {
    const waiting = await stageByKey('tickets', 'waiting_on_client', t);
    await moveStage(t, { objectType: 'ticket', recordId: id, toStageId: waiting.id, actor: { type: 'user', id: input.actorUserId }, source: 'reply' });
  }
  return { firstReply };
}

/** An internal note on the ticket. Does not count as a reply. */
export async function logTicketNote(t: Tx, id: string, input: { body: string; actorUserId: string }): Promise<void> {
  const tk = await lockTicket(t, id);
  await logActivity(
    {
      kind: 'note',
      direction: 'internal',
      actorUserId: input.actorUserId,
      title: `Note on ticket ${tk.number}`,
      body: input.body,
      links: [{ ticketId: id, isPrimary: true }, { organizationId: tk.organization_id }, { projectId: tk.project_id }],
      autoLink: false,
    },
    t,
  );
}

export async function setTicketPriority(t: Tx, id: string, priority: TicketPriority, actorUserId: string | null): Promise<void> {
  const tk = await lockTicket(t, id);
  await t`update tickets set priority = ${priority}, sla_policy_id = ${await policyFor(t, priority)} where id = ${id}`;
  await logActivity(
    {
      kind: 'system',
      direction: 'internal',
      actorUserId,
      title: `Ticket ${tk.number} priority set to ${priority}`,
      links: [{ ticketId: id, isPrimary: true }],
      autoLink: false,
    },
    t,
  );
}

// ---------------------------------------------------------------- SLA

export type TicketSlaRow = {
  id: string;
  opened_at: Date;
  first_replied_at: Date | null;
  closed_at: Date | null;
  first_reply_minutes: number | null;
  resolve_minutes: number | null;
  business_hours: BusinessHours | null;
};

/** SLA for many tickets at once: ticket rows plus their status events. */
export async function ticketSlas(db: Db, ids: string[], now: Date = new Date()): Promise<Map<string, SlaResult | null>> {
  const out = new Map<string, SlaResult | null>();
  if (ids.length === 0) return out;
  const rows = await db<TicketSlaRow[]>`
    select tk.id, tk.opened_at, tk.first_replied_at, tk.closed_at,
           coalesce(p.first_reply_minutes, d.first_reply_minutes) as first_reply_minutes,
           coalesce(p.resolve_minutes, d.resolve_minutes) as resolve_minutes,
           coalesce(p.business_hours, d.business_hours) as business_hours
      from tickets tk
      left join sla_policies p on p.id = tk.sla_policy_id
      left join sla_policies d on d.priority = tk.priority and d.is_default
     where tk.id = any(${ids}::uuid[])`;
  const events = await db<{ ticket_id: string; changed_at: Date; pauses_sla: boolean }[]>`
    select ticket_id, changed_at, pauses_sla from ticket_status_events
     where ticket_id = any(${ids}::uuid[]) order by changed_at, id`;
  const byTicket = new Map<string, { at: Date; pauses: boolean }[]>();
  for (const e of events) {
    const list = byTicket.get(e.ticket_id) ?? [];
    list.push({ at: new Date(e.changed_at), pauses: e.pauses_sla });
    byTicket.set(e.ticket_id, list);
  }
  for (const r of rows) {
    if (r.first_reply_minutes === null || r.resolve_minutes === null) {
      out.set(r.id, null);
      continue;
    }
    out.set(
      r.id,
      computeSla({
        openedAt: new Date(r.opened_at),
        firstRepliedAt: r.first_replied_at ? new Date(r.first_replied_at) : null,
        closedAt: r.closed_at ? new Date(r.closed_at) : null,
        events: byTicket.get(r.id) ?? [],
        policy: { firstReplyMinutes: r.first_reply_minutes, resolveMinutes: r.resolve_minutes, businessHours: r.business_hours ?? DEFAULT_BUSINESS_HOURS },
        now,
      }),
    );
  }
  return out;
}

export async function ticketSla(db: Db, id: string, now: Date = new Date()): Promise<SlaResult | null> {
  return (await ticketSlas(db, [id], now)).get(id) ?? null;
}

