/**
 * lib/events.ts, the domain event outbox. emit() writes a domain_events row in
 * the caller's transaction, so the event exists only if the change commits.
 * The worker (scripts/worker.ts, agent E) reads pending rows with
 * FOR UPDATE SKIP LOCKED and runs the automations.
 *
 *   await tx(async (t) => {
 *     ...update the deal...
 *     await emit(t, 'deal.won', { dealId, organizationId, amount }, { aggregateType: 'deal', aggregateId: dealId, actorUserId: user.id });
 *   }, { userId: user.id });
 */
import type { Tx } from './db';

/** Event types used in V1. Add new ones here so the worker and emitters agree. */
export type DomainEventType =
  | 'record.created'
  | 'deal.stage_changed'
  | 'deal.won'
  | 'deal.lost'
  | 'lead.stage_changed'
  | 'lead.replied'
  | 'project.stage_changed'
  | 'ticket.stage_changed'
  | 'ticket.created'
  | 'invoice.late'
  | 'task.completed';

export type EmitOptions = {
  aggregateType?: string;
  aggregateId?: string | null;
  actorUserId?: string | null;
};

/** Insert one outbox row and wake listeners (NOTIFY domain_events). Returns the event id. */
export async function emit(
  t: Tx,
  type: DomainEventType,
  payload: Record<string, unknown>,
  opts: EmitOptions = {},
): Promise<string> {
  const aggregateId = opts.aggregateId ?? (typeof payload.id === 'string' ? payload.id : null);
  const [row] = await t<{ id: string }[]>`
    insert into domain_events (type, aggregate_type, aggregate_id, payload, actor_user_id)
    values (${type}, ${opts.aggregateType ?? null}, ${aggregateId}, ${t.json(payload as never)},
            ${opts.actorUserId ?? (await currentActor(t))})
    returning id`;
  await t`select pg_notify('domain_events', ${String(row.id)})`;
  return String(row.id);
}

async function currentActor(t: Tx): Promise<string | null> {
  const [r] = await t<{ v: string | null }[]>`select nullif(current_setting('app.user_id', true), '') as v`;
  return r?.v ?? null;
}
