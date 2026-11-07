/** Shared fixtures for tests/reasons. Everything runs inside withRollback. */
import type { Tx } from '../../lib/db';
import { stageId } from '../helpers';

export type ReasonFixture = { user: { id: string; name: string }; orgId: string; contactId: string; leadId: string; dealId: string };

/** A user, an organization, a contact, a lead in Connected and a deal in Negotiation. */
export async function reasonFixture(t: Tx, tag: string): Promise<ReasonFixture> {
  const [user] = await t<{ id: string; name: string }[]>`
    insert into users (email, name, role) values (${`reasons-${tag}@astra.local`}, 'Reason Tester', 'admin') returning id, name`;
  const [org] = await t<{ id: string }[]>`insert into organizations (name) values (${`Reason Bakkerij ${tag}`}) returning id`;
  const [contact] = await t<{ id: string }[]>`
    insert into contacts (first_name, last_name, primary_org_id) values ('Rosa', ${`Reason ${tag}`}, ${org.id}) returning id`;
  const connected = await stageId(t, 'lead', 'connected');
  const [lead] = await t<{ id: string }[]>`
    insert into leads (contact_id, organization_id, pipeline_id, stage_id, owner_user_id, source)
    select ${contact.id}, ${org.id}, pipeline_id, id, ${user.id}, 'manual' from pipeline_stages where id = ${connected}
    returning id`;
  const negotiation = await stageId(t, 'sales', 'negotiation');
  const [deal] = await t<{ id: string }[]>`
    insert into deals (name, organization_id, pipeline_id, stage_id, owner_user_id, amount, next_step, decision_date)
    select ${`Reason deal ${tag}`}, ${org.id}, pipeline_id, id, ${user.id}, 5000, 'Call', '2026-11-20' from pipeline_stages where id = ${negotiation}
    returning id`;
  return { user, orgId: org.id, contactId: contact.id, leadId: lead.id, dealId: deal.id };
}
