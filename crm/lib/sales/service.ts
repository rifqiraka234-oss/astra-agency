/**
 * lib/sales/service.ts, the writes behind leads and deals. Every function takes
 * the caller's transaction so it commits with the rest of the change, and the
 * server actions in app/(app)/{pipelines,leads,deals}/actions.ts wrap them in
 * tx() with the permission check. Tests call them directly (tests/b).
 *
 *   const { dealId } = await qualifyLead(t, { leadId, actor: { id, name }, values: { meeting_at } });
 *   await disqualifyLead(t, { leadId, reason: 'do_not_contact', actor });
 *   await addLineItem(t, dealId, { name: 'Booking flow', quantity: '1', unit_price: '6500' });
 *
 * Stage changes of existing records go through moveStage. A new record enters
 * its first stage here (enterStage), with the same required field gate.
 */
import type { Tx } from '../db';
import { emit } from '../events';
import { logActivity } from '../activities';
import { bumpLifecycle, getStage, moveStage, StageMoveError, type RequiredField, type StageInfo } from '../stages';
import { formatMoney } from '../format';
import { normEmail } from '../normalize';
import { DISQUALIFY_REASONS, labelOf } from '../options';
import { lineTotals } from './totals';

export type SalesActor = { id: string; name: string };

export class SalesError extends Error {
  constructor(
    public code: 'not_found' | 'already_qualified' | 'suppressed' | 'duplicate_lead' | 'invalid' | 'closed',
    message: string,
    public href?: string,
  ) {
    super(message);
    this.name = 'SalesError';
  }
}

// ---------------------------------------------------------------- stage entry for new records

const DEAL_GATE_COLUMNS = new Set([
  'amount', 'meeting_at', 'build_card_url', 'prototype_url', 'quote_ref', 'next_step', 'decision_date', 'signer',
  'start_date', 'won_reason', 'lost_reason', 'lost_competitor', 'close_date', 'angle',
]);
const LEAD_GATE_COLUMNS = new Set(['disqualify_reason', 'angle', 'angle_worth_eur', 'next_step', 'status_note']);

function clean(inputType: string, v: unknown): unknown {
  if (typeof v !== 'string') return v ?? null;
  const s = v.trim();
  if (s === '') return null;
  if (inputType === 'money' || inputType === 'number') return s.replace(/[€\s,]/g, '');
  if (inputType === 'url' && !/^[a-z]+:\/\//i.test(s)) return `https://${s}`;
  return s;
}

/**
 * The required fields to enter a stage, checked against values. Throws
 * StageMoveError('required_fields') like moveStage, else returns the column
 * and custom values to write.
 */
export async function checkEntryGate(
  t: Tx,
  objectType: 'lead' | 'deal',
  stage: StageInfo,
  values: Record<string, unknown>,
): Promise<{ columns: Record<string, unknown>; custom: Record<string, unknown> }> {
  const required = await t<{ field_key: string; label: string; input_type: RequiredField['input_type']; options: RequiredField['options'] }[]>`
    select field_key, label, input_type, options from stage_required_fields where stage_id = ${stage.id} order by position`;
  const allowed = objectType === 'deal' ? DEAL_GATE_COLUMNS : LEAD_GATE_COLUMNS;
  const columns: Record<string, unknown> = {};
  const custom: Record<string, unknown> = {};
  const fields: RequiredField[] = [];
  const missing: RequiredField[] = [];
  for (const r of required) {
    const v = clean(r.input_type, values[r.field_key]);
    const field: RequiredField = { ...r, value: v === null || v === undefined ? null : String(v) };
    fields.push(field);
    if (v === null || v === undefined) {
      missing.push(field);
      continue;
    }
    if (allowed.has(r.field_key)) columns[r.field_key] = v;
    else custom[r.field_key] = v;
  }
  if (missing.length) {
    throw new StageMoveError(
      'required_fields',
      `To enter ${stage.name}, fill in ${missing.map((m) => m.label.toLowerCase()).join(' and ')}`,
      missing,
      fields,
    );
  }
  return { columns, custom };
}

/** History row for a record entering its first stage (no from stage). */
async function enterStage(
  t: Tx,
  objectType: 'lead' | 'deal',
  recordId: string,
  stage: StageInfo,
  actorId: string,
  snapshot: { amount?: string | null; currency?: string | null; closeDate?: string | null } = {},
) {
  await t`
    insert into stage_transitions (object_type, record_id, pipeline_id, from_stage_id, to_stage_id, amount, currency,
                                   close_date, probability, actor_type, actor_id, source)
    values (${objectType}, ${recordId}, ${stage.pipeline_id}, null, ${stage.id}, ${snapshot.amount ?? null},
            ${snapshot.currency ?? null}, ${snapshot.closeDate ?? null}, ${stage.probability}, 'user', ${actorId}, 'create')`;
}

async function firstOpenStage(t: Tx, pipelineId: string): Promise<StageInfo> {
  const [row] = await t<{ id: string }[]>`
    select id from pipeline_stages where pipeline_id = ${pipelineId} and archived_at is null and state = 'open'
     order by position limit 1`;
  if (!row) throw new SalesError('invalid', 'That pipeline has no open stage');
  return (await getStage(row.id, t))!;
}

async function stageOfState(t: Tx, pipelineId: string, state: 'won' | 'lost'): Promise<StageInfo> {
  const [row] = await t<{ id: string }[]>`
    select id from pipeline_stages where pipeline_id = ${pipelineId} and state = ${state} and archived_at is null
     order by position limit 1`;
  if (!row) throw new SalesError('invalid', `That pipeline has no ${state === 'won' ? 'won' : 'lost'} stage`);
  return (await getStage(row.id, t))!;
}

async function pipelineIdByKey(t: Tx, key: string): Promise<string> {
  const [row] = await t<{ id: string }[]>`select id from pipelines where key = ${key}`;
  if (!row) throw new SalesError('invalid', `No ${key} pipeline`);
  return row.id;
}

// ---------------------------------------------------------------- suppression

/** True when the contact is marked do not contact or is on the suppression list. */
export async function isSuppressed(t: Tx, contactId: string): Promise<boolean> {
  const [row] = await t<{ hit: boolean }[]>`
    select (c.do_not_contact
            or exists (select 1 from suppression_list s where s.kind = 'contact' and s.value = c.id::text)
            or exists (select 1 from suppression_list s where s.kind = 'linkedin' and s.value = c.linkedin_url_normalised)
            or exists (select 1 from suppression_list s join contact_emails e on e.contact_id = c.id
                        where s.kind = 'email' and s.value = lower(trim(e.email)))) as hit
      from contacts c where c.id = ${contactId}`;
  return Boolean(row?.hit);
}

/** Put a contact on the suppression list by id, LinkedIn URL and every email. Returns rows added. */
export async function suppressContact(t: Tx, contactId: string, reason: string, actorId: string): Promise<number> {
  const [c] = await t<{ linkedin_url_normalised: string | null }[]>`
    update contacts set do_not_contact = true where id = ${contactId} returning linkedin_url_normalised`;
  if (!c) return 0;
  const emails = await t<{ email: string }[]>`select email from contact_emails where contact_id = ${contactId}`;
  const rows: { kind: string; value: string }[] = [{ kind: 'contact', value: contactId }];
  if (c.linkedin_url_normalised) rows.push({ kind: 'linkedin', value: c.linkedin_url_normalised });
  for (const e of emails) {
    const n = normEmail(e.email);
    if (n) rows.push({ kind: 'email', value: n });
  }
  let added = 0;
  for (const r of rows) {
    const res = await t`
      insert into suppression_list (kind, value, contact_id, reason, added_by)
      values (${r.kind}, ${r.value}, ${contactId}, ${reason}, ${actorId})
      on conflict (kind, value) do nothing`;
    added += res.count;
  }
  return added;
}

// ---------------------------------------------------------------- leads

type LeadRow = {
  id: string;
  name: string | null;
  contact_id: string | null;
  organization_id: string | null;
  pipeline_id: string;
  stage_id: string;
  owner_user_id: string | null;
  source: string | null;
  angle: string | null;
  angle_worth_eur: string | null;
  converted_deal_id: string | null;
  contact_name: string | null;
  contact_org_id: string | null;
  org_name: string | null;
};

async function lockLead(t: Tx, leadId: string): Promise<LeadRow> {
  const [lead] = await t<LeadRow[]>`
    select l.id, l.name, l.contact_id, l.organization_id, l.pipeline_id, l.stage_id, l.owner_user_id, l.source,
           l.angle, l.angle_worth_eur, l.converted_deal_id,
           c.full_name as contact_name, c.primary_org_id as contact_org_id, o.name as org_name
      from leads l
      left join contacts c on c.id = l.contact_id
      left join organizations o on o.id = l.organization_id
     where l.id = ${leadId} and l.deleted_at is null
       for update of l`;
  if (!lead) throw new SalesError('not_found', 'Lead not found');
  return lead;
}

export type QualifyInput = {
  leadId: string;
  actor: SalesActor;
  dealName?: string | null;
  amount?: string | null;
  closeDate?: string | null;
  ownerUserId?: string | null;
  /** Gate values for the first Sales stage, for example { meeting_at }. */
  values?: Record<string, unknown>;
  pipelineKey?: string;
};

/**
 * Qualify a lead: a deal in the first stage of the Sales pipeline, linked to the
 * lead's organization and contact (deal_contacts, decision maker), the lead moved
 * to Qualified with converted_deal_id set, an activity and the events.
 */
export async function qualifyLead(t: Tx, input: QualifyInput): Promise<{ dealId: string; stage: StageInfo }> {
  const lead = await lockLead(t, input.leadId);
  if (lead.converted_deal_id) {
    throw new SalesError('already_qualified', 'This lead is already qualified', `/deals/${lead.converted_deal_id}`);
  }
  if (lead.contact_id && (await isSuppressed(t, lead.contact_id))) {
    throw new SalesError('suppressed', `${lead.contact_name ?? 'This contact'} is on the do not contact list`);
  }
  const orgId = lead.organization_id ?? lead.contact_org_id;
  const [org] = orgId ? await t<{ name: string }[]>`select name from organizations where id = ${orgId}` : [];

  const salesPipeline = await pipelineIdByKey(t, input.pipelineKey ?? 'sales');
  const stage = await firstOpenStage(t, salesPipeline);
  const values = { ...(input.values ?? {}) };
  if (input.amount !== undefined && input.amount !== null && values.amount === undefined) values.amount = input.amount;
  const gate = await checkEntryGate(t, 'deal', stage, values);

  const amount = (gate.columns.amount as string | undefined) ?? (input.amount?.trim() ? input.amount.replace(/[€\s,]/g, '') : null) ?? lead.angle_worth_eur;
  const name = input.dealName?.trim() || `${org?.name ?? lead.contact_name ?? lead.name ?? 'New'} deal`;
  const source = lead.source === 'lemlist' ? 'Lead pipeline, LinkedIn via lemlist' : `Lead pipeline${lead.source ? `, ${lead.source}` : ''}`;
  const row: Record<string, unknown> = {
    ...gate.columns,
    name,
    organization_id: orgId,
    lead_id: lead.id,
    pipeline_id: stage.pipeline_id,
    stage_id: stage.id,
    owner_user_id: input.ownerUserId ?? lead.owner_user_id ?? input.actor.id,
    amount,
    currency: 'EUR',
    close_date: input.closeDate ?? null,
    angle: lead.angle,
    source,
    deal_type: 'new_business',
    custom: gate.custom,
  };
  const [deal] = await t<{ id: string }[]>`insert into deals ${t(row as Record<string, any>)} returning id`;
  await enterStage(t, 'deal', deal.id, stage, input.actor.id, { amount: amount ?? null, currency: 'EUR', closeDate: input.closeDate ?? null });
  if (lead.contact_id) {
    await t`
      insert into deal_contacts (deal_id, contact_id, role, is_primary)
      values (${deal.id}, ${lead.contact_id}, 'decision_maker', true)
      on conflict (deal_id, contact_id) do nothing`;
    await bumpLifecycle(t, 'contact', lead.contact_id, 'opportunity');
  }
  if (orgId) await bumpLifecycle(t, 'organization', orgId, 'opportunity');

  const qualified = await stageOfState(t, lead.pipeline_id, 'won');
  await moveStage(t, {
    objectType: 'lead',
    recordId: lead.id,
    toStageId: qualified.id,
    actor: { type: 'user', id: input.actor.id },
    source: 'qualify',
  });
  await t`update leads set converted_deal_id = ${deal.id} where id = ${lead.id}`;

  await logActivity(
    {
      kind: 'system',
      direction: 'internal',
      actorUserId: input.actor.id,
      title: `Lead qualified, deal created in ${stage.name}`,
      body: `${name}${amount ? `, ${formatMoney(amount)}` : ''}. ${org ? `${org.name} and ` : ''}${lead.contact_name ?? 'the contact'} linked.`,
      meta: { tags: [input.actor.name, stage.pipeline_name] },
      source: 'system',
      links: [{ leadId: lead.id, isPrimary: true }, { dealId: deal.id }, { organizationId: orgId }, { contactId: lead.contact_id }],
      autoLink: false,
    },
    t,
  );
  const payload = {
    id: deal.id,
    objectType: 'deal',
    pipelineKey: stage.pipeline_key,
    fromStageId: null,
    toStageId: stage.id,
    toStageKey: stage.key,
    toState: stage.state,
    organizationId: orgId,
    ownerUserId: row.owner_user_id,
    amount,
    currency: 'EUR',
    leadId: lead.id,
  };
  const opts = { aggregateType: 'deal', aggregateId: deal.id, actorUserId: input.actor.id };
  await emit(t, 'record.created', { type: 'deal', id: deal.id, leadId: lead.id, organizationId: orgId }, opts);
  await emit(t, 'deal.stage_changed', payload, opts);
  return { dealId: deal.id, stage };
}

export type DisqualifyInput = { leadId: string; reason: string; note?: string | null; actor: SalesActor };

/**
 * Disqualify a lead with a required reason. "do_not_contact" also marks the
 * contact and adds their id, LinkedIn URL and emails to suppression_list.
 */
export async function disqualifyLead(t: Tx, input: DisqualifyInput): Promise<{ suppressed: number }> {
  if (!DISQUALIFY_REASONS.some((r) => r.value === input.reason)) {
    throw new StageMoveError('required_fields', 'Pick a reason to disqualify', [], []);
  }
  const lead = await lockLead(t, input.leadId);
  const lost = await stageOfState(t, lead.pipeline_id, 'lost');
  await moveStage(t, {
    objectType: 'lead',
    recordId: lead.id,
    toStageId: lost.id,
    values: { disqualify_reason: input.reason },
    actor: { type: 'user', id: input.actor.id },
    source: 'disqualify',
  });
  // Already disqualified means moveStage changed nothing, so store the new reason here too.
  await t`update leads set disqualify_reason = ${input.reason} where id = ${lead.id}`;
  let suppressed = 0;
  if (input.reason === 'do_not_contact' && lead.contact_id) {
    suppressed = await suppressContact(t, lead.contact_id, `Disqualified, do not contact${input.note ? `. ${input.note}` : ''}`, input.actor.id);
  }
  await logActivity(
    {
      kind: 'note',
      direction: 'internal',
      actorUserId: input.actor.id,
      title: `Disqualified, ${labelOf(DISQUALIFY_REASONS, input.reason).toLowerCase()}`,
      body: [input.note?.trim() || null, suppressed ? 'Added to the suppression list, never contacted again.' : null].filter(Boolean).join(' ') || null,
      meta: { tags: [input.actor.name], disqualify_reason: input.reason },
      source: 'system',
      links: [{ leadId: lead.id, isPrimary: true }, { contactId: lead.contact_id }, { organizationId: lead.organization_id }],
      autoLink: false,
    },
    t,
  );
  return { suppressed };
}

export type CreateLeadInput = {
  actor: SalesActor;
  contactId?: string | null;
  organizationId?: string | null;
  newContact?: { firstName: string; lastName?: string | null } | null;
  newOrganization?: { name: string } | null;
  ownerUserId?: string | null;
  stageId?: string | null;
  name?: string | null;
  source?: string | null;
  campaign?: string | null;
  researchStatus?: string | null;
  label?: string | null;
  angle?: string | null;
  angleWorthEur?: string | null;
  linkedinAcceptedAt?: string | null;
  statusNote?: string | null;
  nextStep?: string | null;
};

async function resolveOrgAndContact(
  t: Tx,
  input: { actor: SalesActor; contactId?: string | null; organizationId?: string | null; newContact?: CreateLeadInput['newContact']; newOrganization?: CreateLeadInput['newOrganization']; source: string },
): Promise<{ orgId: string | null; contactId: string | null; created: { org?: string; contact?: string } }> {
  const created: { org?: string; contact?: string } = {};
  let orgId = input.organizationId ?? null;
  if (!orgId && input.newOrganization?.name.trim()) {
    const [o] = await t<{ id: string }[]>`
      insert into organizations (name, owner_user_id, source) values (${input.newOrganization.name.trim()}, ${input.actor.id}, ${input.source})
      returning id`;
    orgId = o.id;
    created.org = o.id;
    await emit(t, 'record.created', { type: 'organization', id: o.id }, { aggregateType: 'organization', aggregateId: o.id, actorUserId: input.actor.id });
  }
  let contactId = input.contactId ?? null;
  if (!contactId && input.newContact?.firstName.trim()) {
    const [c] = await t<{ id: string }[]>`
      insert into contacts (first_name, last_name, primary_org_id, owner_user_id, source)
      values (${input.newContact.firstName.trim()}, ${input.newContact.lastName?.trim() || null}, ${orgId}, ${input.actor.id}, ${input.source})
      returning id`;
    contactId = c.id;
    created.contact = c.id;
    if (orgId) {
      await t`insert into contact_org_roles (contact_id, organization_id, is_primary, is_current) values (${c.id}, ${orgId}, true, true)`;
    }
    await emit(t, 'record.created', { type: 'contact', id: c.id }, { aggregateType: 'contact', aggregateId: c.id, actorUserId: input.actor.id });
  }
  if (contactId && !orgId) {
    const [c] = await t<{ primary_org_id: string | null }[]>`select primary_org_id from contacts where id = ${contactId}`;
    orgId = c?.primary_org_id ?? null;
  }
  return { orgId, contactId, created };
}

/** A new lead in the Lead pipeline (or the stage given). Refuses suppressed contacts and a second open lead. */
export async function createLead(t: Tx, input: CreateLeadInput): Promise<{ leadId: string }> {
  const { orgId, contactId } = await resolveOrgAndContact(t, { ...input, source: input.source ?? 'manual' });
  if (!orgId && !contactId) throw new SalesError('invalid', 'Pick a contact or an organization');
  if (contactId) {
    if (await isSuppressed(t, contactId)) throw new SalesError('suppressed', 'This contact is on the do not contact list');
    const [open] = await t<{ id: string }[]>`
      select l.id from leads l join pipeline_stages s on s.id = l.stage_id
       where l.contact_id = ${contactId} and l.deleted_at is null and s.state = 'open' limit 1`;
    if (open) throw new SalesError('duplicate_lead', 'This contact already has an open lead', `/leads/${open.id}`);
  }
  const stage = input.stageId ? await getStage(input.stageId, t) : await firstOpenStage(t, await pipelineIdByKey(t, 'lead'));
  if (!stage || stage.object_type !== 'lead') throw new SalesError('invalid', 'Pick a lead stage');
  if (stage.state !== 'open') throw new SalesError('invalid', 'New leads start in an open stage');
  const gate = await checkEntryGate(t, 'lead', stage, {});
  const row: Record<string, unknown> = {
    ...gate.columns,
    name: input.name ?? null,
    contact_id: contactId,
    organization_id: orgId,
    pipeline_id: stage.pipeline_id,
    stage_id: stage.id,
    owner_user_id: input.ownerUserId ?? input.actor.id,
    source: input.source ?? 'manual',
    campaign: input.campaign ?? null,
    research_status: input.researchStatus ?? 'unresearched',
    label: input.label ?? null,
    angle: input.angle ?? null,
    angle_worth_eur: input.angleWorthEur ?? null,
    linkedin_accepted_at: input.linkedinAcceptedAt ?? null,
    status_note: input.statusNote ?? null,
    next_step: input.nextStep ?? null,
    custom: gate.custom,
  };
  const [lead] = await t<{ id: string }[]>`insert into leads ${t(row as Record<string, any>)} returning id`;
  await enterStage(t, 'lead', lead.id, stage, input.actor.id);
  await logActivity(
    {
      kind: 'system',
      actorUserId: input.actor.id,
      title: `Lead created in ${stage.name}`,
      meta: { tags: [input.actor.name] },
      source: 'system',
      links: [{ leadId: lead.id, isPrimary: true }, { contactId }, { organizationId: orgId }],
      autoLink: false,
    },
    t,
  );
  await emit(t, 'record.created', { type: 'lead', id: lead.id, organizationId: orgId, contactId }, { aggregateType: 'lead', aggregateId: lead.id, actorUserId: input.actor.id });
  await emit(
    t,
    'lead.stage_changed',
    { id: lead.id, objectType: 'lead', pipelineKey: stage.pipeline_key, fromStageId: null, toStageId: stage.id, toStageKey: stage.key, toState: stage.state, organizationId: orgId, ownerUserId: row.owner_user_id },
    { aggregateType: 'lead', aggregateId: lead.id, actorUserId: input.actor.id },
  );
  return { leadId: lead.id };
}

// ---------------------------------------------------------------- deals

export type CreateDealInput = {
  actor: SalesActor;
  name: string;
  organizationId?: string | null;
  newOrganization?: { name: string } | null;
  contactId?: string | null;
  newContact?: { firstName: string; lastName?: string | null } | null;
  contactRole?: string | null;
  stageId?: string | null;
  amount?: string | null;
  currency?: string | null;
  closeDate?: string | null;
  ownerUserId?: string | null;
  dealType?: string | null;
  nextStep?: string | null;
  /** Gate values for the chosen stage. */
  values?: Record<string, unknown>;
};

/** A new deal in the chosen open stage (default the first Sales stage), with its gate checked. */
export async function createDeal(t: Tx, input: CreateDealInput): Promise<{ dealId: string }> {
  const name = input.name.trim();
  if (!name) throw new SalesError('invalid', 'Give the deal a name');
  const stage = input.stageId ? await getStage(input.stageId, t) : await firstOpenStage(t, await pipelineIdByKey(t, 'sales'));
  if (!stage || stage.object_type !== 'deal') throw new SalesError('invalid', 'Pick a deal stage');
  if (stage.state !== 'open') throw new SalesError('invalid', 'New deals start in an open stage');
  const values = { ...(input.values ?? {}) };
  if (input.amount && values.amount === undefined) values.amount = input.amount;
  if (input.nextStep && values.next_step === undefined) values.next_step = input.nextStep;
  const gate = await checkEntryGate(t, 'deal', stage, values);
  const { orgId, contactId } = await resolveOrgAndContact(t, { ...input, source: 'manual' });
  const amount = (gate.columns.amount as string | undefined) ?? (input.amount ? input.amount.replace(/[€\s,]/g, '') : null);
  const row: Record<string, unknown> = {
    ...gate.columns,
    name,
    organization_id: orgId,
    pipeline_id: stage.pipeline_id,
    stage_id: stage.id,
    owner_user_id: input.ownerUserId ?? input.actor.id,
    amount,
    currency: input.currency ?? 'EUR',
    close_date: input.closeDate ?? null,
    deal_type: input.dealType ?? (stage.pipeline_key === 'existing' ? 'upsell' : 'new_business'),
    next_step: (gate.columns.next_step as string | undefined) ?? input.nextStep ?? null,
    source: 'manual',
    custom: gate.custom,
  };
  const [deal] = await t<{ id: string }[]>`insert into deals ${t(row as Record<string, any>)} returning id`;
  await enterStage(t, 'deal', deal.id, stage, input.actor.id, { amount, currency: String(row.currency), closeDate: input.closeDate ?? null });
  if (contactId) {
    await t`
      insert into deal_contacts (deal_id, contact_id, role, is_primary)
      values (${deal.id}, ${contactId}, ${input.contactRole ?? 'decision_maker'}, true)`;
    await bumpLifecycle(t, 'contact', contactId, 'opportunity');
  }
  if (orgId) await bumpLifecycle(t, 'organization', orgId, 'opportunity');
  await logActivity(
    {
      kind: 'system',
      actorUserId: input.actor.id,
      title: `Deal created in ${stage.name}`,
      body: amount ? `${name}, ${formatMoney(amount, String(row.currency))}` : name,
      meta: { tags: [input.actor.name, stage.pipeline_name] },
      source: 'system',
      links: [{ dealId: deal.id, isPrimary: true }, { organizationId: orgId }, { contactId }],
      autoLink: false,
    },
    t,
  );
  const opts = { aggregateType: 'deal', aggregateId: deal.id, actorUserId: input.actor.id };
  await emit(t, 'record.created', { type: 'deal', id: deal.id, organizationId: orgId }, opts);
  await emit(
    t,
    'deal.stage_changed',
    { id: deal.id, objectType: 'deal', pipelineKey: stage.pipeline_key, fromStageId: null, toStageId: stage.id, toStageKey: stage.key, toState: stage.state, organizationId: orgId, ownerUserId: row.owner_user_id, amount, currency: row.currency },
    opts,
  );
  return { dealId: deal.id };
}

// ---------------------------------------------------------------- line items

export type LineItemInput = {
  productId?: string | null;
  name?: string | null;
  description?: string | null;
  quantity?: string | null;
  unitPrice?: string | null;
  discountPct?: string | null;
  taxRate?: string | null;
  billingFrequency?: string | null;
};

const num = (v: string | null | undefined) => (v === null || v === undefined || v.trim() === '' ? null : v.replace(/[€\s,]/g, ''));

/** Keep the deal amount equal to the line item subtotal while it has lines. Returns the subtotal. */
export async function syncDealAmount(t: Tx, dealId: string): Promise<string | null> {
  const lines = await t<{ quantity: string; unit_price: string; discount_pct: string; tax_rate: string }[]>`
    select quantity, unit_price, discount_pct, tax_rate from line_items where deal_id = ${dealId}`;
  if (lines.length === 0) return null;
  const { subtotal } = lineTotals(lines);
  await t`update deals set amount = ${subtotal} where id = ${dealId} and amount is distinct from ${subtotal}::numeric`;
  return subtotal;
}

export async function addLineItem(t: Tx, dealId: string, input: LineItemInput): Promise<{ id: string; subtotal: string | null }> {
  const [deal] = await t<{ currency: string }[]>`select currency from deals where id = ${dealId} and deleted_at is null`;
  if (!deal) throw new SalesError('not_found', 'Deal not found');
  let product: { name: string; description: string | null; unit_price: string; tax_rate: string; billing_frequency: string } | undefined;
  if (input.productId) {
    [product] = await t<NonNullable<typeof product>[]>`
      select name, description, unit_price, tax_rate, billing_frequency from products where id = ${input.productId}`;
    if (!product) throw new SalesError('not_found', 'Product not found');
  }
  const name = input.name?.trim() || product?.name;
  if (!name) throw new SalesError('invalid', 'Give the line a name or pick a product');
  const [pos] = await t<{ n: number }[]>`select coalesce(max(position) + 1, 0)::int as n from line_items where deal_id = ${dealId}`;
  const row = {
    deal_id: dealId,
    product_id: input.productId ?? null,
    name,
    description: input.description?.trim() || product?.description || null,
    quantity: num(input.quantity) ?? '1',
    unit_price: num(input.unitPrice) ?? product?.unit_price ?? '0',
    discount_pct: num(input.discountPct) ?? '0',
    tax_rate: num(input.taxRate) ?? product?.tax_rate ?? '21',
    currency: deal.currency,
    billing_frequency: input.billingFrequency || product?.billing_frequency || 'one_time',
    position: pos.n,
  };
  const [li] = await t<{ id: string }[]>`insert into line_items ${t(row as Record<string, any>)} returning id`;
  return { id: li.id, subtotal: await syncDealAmount(t, dealId) };
}

export async function updateLineItem(t: Tx, lineId: string, input: LineItemInput): Promise<{ dealId: string; subtotal: string | null }> {
  const [line] = await t<{ deal_id: string | null }[]>`select deal_id from line_items where id = ${lineId} for update`;
  if (!line?.deal_id) throw new SalesError('not_found', 'Line item not found');
  const patch: Record<string, unknown> = {};
  if (input.name !== undefined) {
    if (!input.name?.trim()) throw new SalesError('invalid', 'Give the line a name');
    patch.name = input.name.trim();
  }
  if (input.description !== undefined) patch.description = input.description?.trim() || null;
  if (input.quantity !== undefined) patch.quantity = num(input.quantity) ?? '1';
  if (input.unitPrice !== undefined) patch.unit_price = num(input.unitPrice) ?? '0';
  if (input.discountPct !== undefined) patch.discount_pct = num(input.discountPct) ?? '0';
  if (input.taxRate !== undefined) patch.tax_rate = num(input.taxRate) ?? '21';
  if (input.billingFrequency) patch.billing_frequency = input.billingFrequency;
  if (Object.keys(patch).length) await t`update line_items set ${t(patch as Record<string, any>)} where id = ${lineId}`;
  return { dealId: line.deal_id, subtotal: await syncDealAmount(t, line.deal_id) };
}

export async function deleteLineItem(t: Tx, lineId: string): Promise<{ dealId: string }> {
  const [line] = await t<{ deal_id: string | null }[]>`delete from line_items where id = ${lineId} and deal_id is not null returning deal_id`;
  if (!line?.deal_id) throw new SalesError('not_found', 'Line item not found');
  await syncDealAmount(t, line.deal_id);
  return { dealId: line.deal_id };
}

// ---------------------------------------------------------------- quotes

/** A new quote version from the deal's current lines (copied, so later edits do not change it). */
export async function createQuote(t: Tx, dealId: string, input: { validUntil?: string | null; actor: SalesActor }): Promise<{ id: string; number: string; version: number }> {
  const [deal] = await t<{ currency: string; name: string; organization_id: string | null }[]>`
    select currency, name, organization_id from deals where id = ${dealId} and deleted_at is null for update`;
  if (!deal) throw new SalesError('not_found', 'Deal not found');
  const [{ v }] = await t<{ v: number }[]>`select coalesce(max(version), 0)::int + 1 as v from quotes where deal_id = ${dealId}`;
  const year = new Date().getFullYear();
  // Lock the numbering so two quotes made at once do not take the same number.
  await t`select pg_advisory_xact_lock(hashtext('quote_number'))`;
  const [{ n }] = await t<{ n: number }[]>`
    select coalesce(max(substring(number from ${`^Q-${year}-(\\d+)$`})::int), 0) + 1 as n from quotes where number like ${`Q-${year}-%`}`;
  const number = `Q-${year}-${String(n).padStart(3, '0')}`;
  const validUntil = input.validUntil || null;
  const [q] = await t<{ id: string }[]>`
    insert into quotes (deal_id, number, version, status, currency, valid_until)
    values (${dealId}, ${number}, ${v}, 'draft', ${deal.currency}, coalesce(${validUntil}::date, crm_today() + 30))
    returning id`;
  await t`
    insert into line_items (quote_id, product_id, name, description, quantity, unit_price, discount_pct, tax_rate, currency,
                            billing_frequency, term_months, position)
    select ${q.id}, product_id, name, description, quantity, unit_price, discount_pct, tax_rate, currency, billing_frequency,
           term_months, position
      from line_items where deal_id = ${dealId} order by position`;
  await t`update deals set quote_ref = ${number} where id = ${dealId}`;
  await logActivity(
    {
      kind: 'system',
      actorUserId: input.actor.id,
      title: `Quote ${number} drafted, version ${v}`,
      meta: { tags: [input.actor.name] },
      source: 'system',
      links: [{ dealId, isPrimary: true }, { organizationId: deal.organization_id }],
      autoLink: false,
    },
    t,
  );
  return { id: q.id, number, version: v };
}

export const QUOTE_STATUSES = [
  { value: 'draft', label: 'Draft' },
  { value: 'sent', label: 'Sent' },
  { value: 'accepted', label: 'Accepted' },
  { value: 'declined', label: 'Declined' },
  { value: 'expired', label: 'Expired' },
];

/** Change a quote's status or valid until date. Marking it sent stamps sent_at once, accepted stamps accepted_at. */
export async function updateQuote(
  t: Tx,
  quoteId: string,
  input: { status?: string | null; validUntil?: string | null; acceptedByName?: string | null; actor: SalesActor },
): Promise<{ dealId: string }> {
  const [q] = await t<{ deal_id: string; number: string | null; status: string; sent_at: Date | null }[]>`
    select deal_id, number, status, sent_at from quotes where id = ${quoteId} for update`;
  if (!q) throw new SalesError('not_found', 'Quote not found');
  const patch: Record<string, unknown> = {};
  if (input.status && input.status !== q.status) {
    if (!QUOTE_STATUSES.some((s) => s.value === input.status)) throw new SalesError('invalid', 'Pick a quote status');
    patch.status = input.status;
    if (input.status === 'sent' && !q.sent_at) patch.sent_at = new Date();
    if (input.status === 'accepted') {
      patch.accepted_at = new Date();
      patch.accepted_by_name = input.acceptedByName ?? null;
    }
  }
  if (input.validUntil !== undefined) patch.valid_until = input.validUntil || null;
  if (Object.keys(patch).length === 0) return { dealId: q.deal_id };
  await t`update quotes set ${t(patch as Record<string, any>)} where id = ${quoteId}`;
  if (patch.status) {
    const [deal] = await t<{ organization_id: string | null }[]>`select organization_id from deals where id = ${q.deal_id}`;
    await logActivity(
      {
        kind: 'system',
        actorUserId: input.actor.id,
        title: `Quote ${q.number ?? ''} marked ${String(patch.status)}`.replace('  ', ' '),
        meta: { tags: [input.actor.name] },
        source: 'system',
        links: [{ dealId: q.deal_id, isPrimary: true }, { organizationId: deal?.organization_id ?? null }],
        autoLink: false,
      },
      t,
    );
  }
  return { dealId: q.deal_id };
}

// ---------------------------------------------------------------- deal contacts

export async function addDealContact(
  t: Tx,
  input: { dealId: string; contactId: string; role: string; roleNote?: string | null; isPrimary?: boolean },
): Promise<{ id: string }> {
  if (input.isPrimary) await t`update deal_contacts set is_primary = false where deal_id = ${input.dealId} and is_primary`;
  const [row] = await t<{ id: string }[]>`
    insert into deal_contacts (deal_id, contact_id, role, role_note, is_primary)
    values (${input.dealId}, ${input.contactId}, ${input.role}, ${input.roleNote?.trim() || null}, ${Boolean(input.isPrimary)})
    on conflict (deal_id, contact_id) do update
      set role = excluded.role, role_note = excluded.role_note,
          is_primary = excluded.is_primary or deal_contacts.is_primary
    returning id`;
  return row;
}

export async function removeDealContact(t: Tx, id: string): Promise<{ dealId: string }> {
  const [row] = await t<{ deal_id: string }[]>`delete from deal_contacts where id = ${id} returning deal_id`;
  if (!row) throw new SalesError('not_found', 'That contact is not on the deal');
  return { dealId: row.deal_id };
}

// ---------------------------------------------------------------- inline edits

/** Columns the deal details panel may edit. Stage and pipeline only change through moveStage. */
export const DEAL_EDITABLE = [
  'name', 'amount', 'currency', 'close_date', 'owner_user_id', 'deal_type', 'priority', 'forecast_category',
  'forecast_probability', 'pricing_model', 'next_step', 'angle', 'source', 'meeting_at', 'build_card_url',
  'prototype_url', 'quote_ref', 'decision_date', 'signer', 'start_date', 'won_reason', 'lost_reason', 'lost_competitor',
] as const;

export const LEAD_EDITABLE = [
  'name', 'owner_user_id', 'label', 'source', 'campaign', 'research_status', 'angle', 'angle_worth_eur', 'status_note',
  'next_step', 'linkedin_accepted_at', 'opener_sent_at', 'auto_progress_enabled',
] as const;

/** Write a validated patch and custom values to a deal or lead. */
export async function updateRecordFields(
  t: Tx,
  objectType: 'deal' | 'lead',
  id: string,
  patch: Record<string, unknown>,
  custom: Record<string, unknown> = {},
): Promise<void> {
  const allowed = new Set<string>(objectType === 'deal' ? DEAL_EDITABLE : LEAD_EDITABLE);
  const table = objectType === 'deal' ? 'deals' : 'leads';
  const clean = Object.fromEntries(Object.entries(patch).filter(([k]) => allowed.has(k)));
  if (Object.keys(clean).length) await t`update ${t(table)} set ${t(clean as Record<string, any>)} where id = ${id}`;
  if (Object.keys(custom).length) await t`update ${t(table)} set custom = custom || ${t.json(custom as never)} where id = ${id}`;
}
