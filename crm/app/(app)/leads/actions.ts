'use server';
/**
 * Lead writes: create (header New menu, /leads?new=1), qualify into a deal,
 * disqualify with a reason (do not contact also suppresses), inline edits from
 * the properties panel and notes on the timeline.
 */
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { requireUser } from '@/lib/auth';
import { sql, tx } from '@/lib/db';
import { assertCan, can } from '@/lib/permissions';
import { logActivity } from '@/lib/activities';
import { getFieldDefinitions, parseCustomForm, validateCustom } from '@/lib/fields';
import { fail, str, type ActionState } from '@/lib/forms';
import { fromDatetimeLocal } from '@/lib/format';
import { createLead, disqualifyLead, qualifyLead, updateRecordFields } from '@/lib/sales/service';
import { LEAD_FIELD_SPECS, parsePatch, toSalesResult, type SalesResult } from '@/lib/sales/fields';
import { isUuid } from '@/lib/sales/queries';

async function leadForEdit(leadId: string) {
  const [lead] = await sql<{ id: string; owner_user_id: string | null; organization_id: string | null; contact_id: string | null }[]>`
    select id, owner_user_id, organization_id, contact_id from leads where id = ${leadId} and deleted_at is null`;
  return lead ?? null;
}

function revalidateLead(id: string, orgId?: string | null, dealId?: string | null) {
  revalidatePath('/leads');
  revalidatePath(`/leads/${id}`);
  revalidatePath('/pipelines');
  if (orgId) revalidatePath(`/organizations/${orgId}`);
  if (dealId) {
    revalidatePath('/deals');
    revalidatePath(`/deals/${dealId}`);
  }
}

const qualifySchema = z.object({
  leadId: z.string().uuid(),
  dealName: z.string().trim().max(200).optional(),
  amount: z.string().trim().max(20).optional(),
  closeDate: z.string().trim().max(10).optional(),
  ownerUserId: z.string().uuid().optional().or(z.literal('')),
  values: z.record(z.string(), z.string().max(2000)).optional(),
});

/** Qualify: creates the deal in the first Sales stage. Gate errors come back as required_fields. */
export async function qualifyLeadAction(input: z.input<typeof qualifySchema>): Promise<SalesResult> {
  const user = await requireUser();
  const parsed = qualifySchema.safeParse(input);
  if (!parsed.success) return { ok: false, code: 'invalid', error: 'Check the fields and try again' };
  const p = parsed.data;
  if (p.amount && !/^\d{1,12}(\.\d{1,2})?$/.test(p.amount.replace(/[€\s,]/g, ''))) {
    return { ok: false, code: 'invalid', error: 'Enter the amount as a number', fieldErrors: { amount: 'Enter an amount like 8000' } };
  }
  try {
    const lead = await leadForEdit(p.leadId);
    if (!lead) return { ok: false, code: 'not_found', error: 'Lead not found' };
    assertCan(user, 'edit', 'lead', lead);
    assertCan(user, 'create', 'deal');
    const values: Record<string, unknown> = { ...(p.values ?? {}) };
    // datetime-local inputs carry Amsterdam wall clock time.
    if (typeof values.meeting_at === 'string' && values.meeting_at) values.meeting_at = fromDatetimeLocal(values.meeting_at) ?? values.meeting_at;
    const { dealId, stage } = await tx(
      (t) =>
        qualifyLead(t, {
          leadId: p.leadId,
          actor: { id: user.id, name: user.name },
          dealName: p.dealName || null,
          amount: p.amount || null,
          closeDate: p.closeDate || null,
          ownerUserId: p.ownerUserId || null,
          values,
        }),
      { userId: user.id },
    );
    revalidateLead(p.leadId, lead.organization_id, dealId);
    return { ok: true, id: dealId, href: `/deals/${dealId}`, message: `Deal created in ${stage.name}, organization and contact linked` };
  } catch (err) {
    return toSalesResult(err);
  }
}

const disqualifySchema = z.object({
  leadId: z.string().uuid(),
  // Checked against the active reasons (reason_options) in disqualifyLead.
  reason: z.string({ message: 'Pick a reason' }).trim().min(1, 'Pick a reason').max(60),
  note: z.string().trim().max(2000).optional(),
});

export async function disqualifyLeadAction(input: z.input<typeof disqualifySchema>): Promise<SalesResult> {
  const user = await requireUser();
  const parsed = disqualifySchema.safeParse(input);
  if (!parsed.success) return { ok: false, code: 'invalid', error: 'Pick a reason to disqualify', fieldErrors: { reason: 'Pick a reason' } };
  try {
    const lead = await leadForEdit(parsed.data.leadId);
    if (!lead) return { ok: false, code: 'not_found', error: 'Lead not found' };
    assertCan(user, 'edit', 'lead', lead);
    const { suppressed } = await tx(
      (t) => disqualifyLead(t, { ...parsed.data, note: parsed.data.note || null, actor: { id: user.id, name: user.name } }),
      { userId: user.id },
    );
    revalidateLead(lead.id, lead.organization_id);
    if (lead.contact_id) revalidatePath(`/contacts/${lead.contact_id}`);
    return { ok: true, message: suppressed ? 'Disqualified and added to the suppression list' : 'Disqualified' };
  } catch (err) {
    return toSalesResult(err);
  }
}

/** Create form. Pickers post organization_id / contact_id, or new_organization / new_contact_first and new_contact_last. */
export async function createLeadAction(_prev: ActionState, fd: FormData): Promise<ActionState> {
  const user = await requireUser();
  if (!can(user, 'create', 'lead')) return fail("You can't create leads");
  const orgId = str(fd, 'organization_id');
  const contactId = str(fd, 'contact_id');
  const newOrg = str(fd, 'new_organization');
  const newFirst = str(fd, 'new_contact_first');
  const errors: Record<string, string> = {};
  if (orgId && !isUuid(orgId)) errors.organization_id = 'Pick an organization from the list';
  if (contactId && !isUuid(contactId)) errors.contact_id = 'Pick a contact from the list';
  if (!orgId && !contactId && !newOrg && !newFirst) errors.contact_id = 'Pick a contact or an organization';
  const worth = str(fd, 'angle_worth_eur')?.replace(/[€\s,]/g, '') ?? null;
  if (worth && !/^\d{1,12}(\.\d{1,2})?$/.test(worth)) errors.angle_worth_eur = 'Enter an amount like 2500';
  const owner = str(fd, 'owner_user_id');
  if (owner && !isUuid(owner)) errors.owner_user_id = 'Pick a user';
  const stage = str(fd, 'stage_id');
  if (stage && !isUuid(stage)) errors.stage_id = 'Pick a stage';
  const accepted = str(fd, 'linkedin_accepted_at');
  if (Object.keys(errors).length) return fail('Check the highlighted fields', errors);
  try {
    const { leadId } = await tx(
      (t) =>
        createLead(t, {
          actor: { id: user.id, name: user.name },
          organizationId: orgId,
          contactId,
          newOrganization: newOrg ? { name: newOrg } : null,
          newContact: newFirst ? { firstName: newFirst, lastName: str(fd, 'new_contact_last') } : null,
          ownerUserId: owner,
          stageId: stage,
          source: str(fd, 'source') ?? 'manual',
          campaign: str(fd, 'campaign'),
          researchStatus: str(fd, 'research_status'),
          angle: str(fd, 'angle'),
          angleWorthEur: worth,
          linkedinAcceptedAt: accepted ? (fromDatetimeLocal(accepted)?.toISOString() ?? null) : null,
          nextStep: str(fd, 'next_step'),
        }),
      { userId: user.id },
    );
    revalidateLead(leadId, orgId);
    return { ok: true, id: leadId, href: `/leads/${leadId}` };
  } catch (err) {
    const r = toSalesResult(err);
    if (r.ok) return { ok: true };
    return fail(r.error, r.code === 'suppressed' || r.code === 'duplicate_lead' ? { contact_id: r.error } : undefined, { href: r.href });
  }
}

/** PropertiesPanel save for a lead. */
export async function updateLeadAction(_prev: ActionState, fd: FormData): Promise<ActionState> {
  const user = await requireUser();
  const id = str(fd, 'id');
  if (!id || !isUuid(id)) return fail('Lead not found');
  const lead = await leadForEdit(id);
  if (!lead) return fail('Lead not found');
  if (!can(user, 'edit', 'lead', lead)) return fail("You can't edit this lead");
  const { patch, errors } = parsePatch(LEAD_FIELD_SPECS, fd);
  const defs = await getFieldDefinitions('lead');
  const customRes = validateCustom(defs, parseCustomForm(defs, fd), { partial: true });
  const customErrors = customRes.ok ? {} : Object.fromEntries(Object.entries(customRes.errors).map(([k, v]) => [`custom.${k}`, v]));
  if (Object.keys(errors).length || !customRes.ok) return fail('Check the highlighted fields', { ...errors, ...customErrors });
  try {
    await tx((t) => updateRecordFields(t, 'lead', id, patch, customRes.value), { userId: user.id });
  } catch (err) {
    const r = toSalesResult(err);
    return fail(r.ok ? 'Saved' : r.error);
  }
  revalidateLead(id, lead.organization_id);
  return { ok: true, id };
}

/** Timeline composer note on a lead (linked to its contact and organization too). */
export async function addLeadNoteAction(_prev: ActionState, fd: FormData): Promise<ActionState> {
  const user = await requireUser();
  const id = str(fd, 'leadId');
  const body = str(fd, 'body');
  if (!id || !isUuid(id)) return fail('Lead not found');
  if (!body) return fail('Write something first', { body: 'Write something first' });
  if (body.length > 10000) return fail('Keep the note under 10,000 characters');
  const lead = await leadForEdit(id);
  if (!lead) return fail('Lead not found');
  if (!can(user, 'create', 'activity')) return fail("You can't add notes");
  await logActivity({
    kind: 'note',
    title: `Note from ${user.name.split(' ')[0]}`,
    body,
    actorUserId: user.id,
    links: [{ leadId: id, isPrimary: true }, { contactId: lead.contact_id }, { organizationId: lead.organization_id }],
    autoLink: false,
  });
  revalidateLead(id, lead.organization_id);
  return { ok: true, message: 'Note added' };
}
