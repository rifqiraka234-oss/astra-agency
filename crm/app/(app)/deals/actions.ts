'use server';
/**
 * Deal writes: create (/deals?new=1), inline edits from the details panel, line
 * items, quotes, contacts with roles and timeline notes. Stage moves live in
 * app/(app)/pipelines/actions.ts (moveStageAction) so the board and the stage
 * path share them. Automations on deal.won are agent E's worker, not here.
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
import {
  addDealContact, addLineItem, createDeal, createQuote, deleteLineItem, removeDealContact, updateLineItem, updateQuote,
  updateRecordFields,
} from '@/lib/sales/service';
import { DEAL_FIELD_SPECS, parsePatch, toSalesResult, type SalesResult } from '@/lib/sales/fields';
import { isUuid } from '@/lib/sales/queries';

async function dealForEdit(dealId: string) {
  const [deal] = await sql<{ id: string; owner_user_id: string | null; organization_id: string | null }[]>`
    select id, owner_user_id, organization_id from deals where id = ${dealId} and deleted_at is null`;
  return deal ?? null;
}

function revalidateDeal(id: string, orgId?: string | null) {
  revalidatePath('/deals');
  revalidatePath(`/deals/${id}`);
  revalidatePath('/pipelines');
  if (orgId) revalidatePath(`/organizations/${orgId}`);
}

/** Load the deal and check the user may edit it. Throws ForbiddenError. */
async function editableDeal(user: Awaited<ReturnType<typeof requireUser>>, dealId: string) {
  if (!isUuid(dealId)) return null;
  const deal = await dealForEdit(dealId);
  if (!deal) return null;
  assertCan(user, 'edit', 'deal', deal);
  return deal;
}

const money = (v: string | null) => (v ? v.replace(/[€\s,]/g, '') : null);
const MONEY = /^\d{1,12}(\.\d{1,2})?$/;

/** Create form. Gate fields of the chosen stage post as "gate.<field_key>". */
export async function createDealAction(_prev: ActionState, fd: FormData): Promise<ActionState> {
  const user = await requireUser();
  if (!can(user, 'create', 'deal')) return fail("You can't create deals");
  const errors: Record<string, string> = {};
  const name = str(fd, 'name');
  if (!name) errors.name = 'Give the deal a name';
  else if (name.length > 200) errors.name = 'Keep the name under 200 characters';
  const orgId = str(fd, 'organization_id');
  const contactId = str(fd, 'contact_id');
  if (orgId && !isUuid(orgId)) errors.organization_id = 'Pick an organization from the list';
  if (contactId && !isUuid(contactId)) errors.contact_id = 'Pick a contact from the list';
  const amount = money(str(fd, 'amount'));
  if (amount && !MONEY.test(amount)) errors.amount = 'Enter an amount like 8000';
  const close = str(fd, 'close_date');
  if (close && !/^\d{4}-\d{2}-\d{2}$/.test(close)) errors.close_date = 'Enter a date';
  const stageId = str(fd, 'stage_id');
  if (stageId && !isUuid(stageId)) errors.stage_id = 'Pick a stage';
  const owner = str(fd, 'owner_user_id');
  if (owner && !isUuid(owner)) errors.owner_user_id = 'Pick a user';
  const role = str(fd, 'contact_role') ?? 'decision_maker';
  if (Object.keys(errors).length) return fail('Check the highlighted fields', errors);

  const values: Record<string, unknown> = {};
  for (const [k, v] of fd.entries()) {
    if (!k.startsWith('gate.') || typeof v !== 'string' || !v.trim()) continue;
    const key = k.slice(5);
    values[key] = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(v) ? fromDatetimeLocal(v) ?? v : v;
  }
  try {
    const { dealId } = await tx(
      (t) =>
        createDeal(t, {
          actor: { id: user.id, name: user.name },
          name: name!,
          organizationId: orgId,
          newOrganization: str(fd, 'new_organization') ? { name: str(fd, 'new_organization')! } : null,
          contactId,
          newContact: str(fd, 'new_contact_first') ? { firstName: str(fd, 'new_contact_first')!, lastName: str(fd, 'new_contact_last') } : null,
          contactRole: role,
          stageId,
          amount,
          closeDate: close,
          ownerUserId: owner,
          values,
        }),
      { userId: user.id },
    );
    revalidateDeal(dealId, orgId);
    return { ok: true, id: dealId, href: `/deals/${dealId}` };
  } catch (err) {
    const r = toSalesResult(err);
    if (r.ok) return { ok: true };
    if (r.code === 'required_fields') {
      return fail(r.error, Object.fromEntries((r.missing ?? []).map((k) => [`gate.${k}`, 'Required to enter this stage'])));
    }
    return fail(r.error);
  }
}

/** PropertiesPanel save for a deal. */
export async function updateDealAction(_prev: ActionState, fd: FormData): Promise<ActionState> {
  const user = await requireUser();
  const id = str(fd, 'id');
  if (!id || !isUuid(id)) return fail('Deal not found');
  const deal = await dealForEdit(id);
  if (!deal) return fail('Deal not found');
  if (!can(user, 'edit', 'deal', deal)) return fail("You can't edit this deal");
  const { patch, errors } = parsePatch(DEAL_FIELD_SPECS, fd);
  const defs = await getFieldDefinitions('deal');
  const customRes = validateCustom(defs, parseCustomForm(defs, fd), { partial: true });
  const customErrors = customRes.ok ? {} : Object.fromEntries(Object.entries(customRes.errors).map(([k, v]) => [`custom.${k}`, v]));
  if (Object.keys(errors).length || !customRes.ok) return fail('Check the highlighted fields', { ...errors, ...customErrors });
  try {
    await tx((t) => updateRecordFields(t, 'deal', id, patch, customRes.value), { userId: user.id });
  } catch (err) {
    const r = toSalesResult(err);
    return fail(r.ok ? 'Saved' : r.error);
  }
  revalidateDeal(id, deal.organization_id);
  return { ok: true, id };
}

const lineSchema = z.object({
  productId: z.string().uuid().nullable().optional().or(z.literal('')),
  name: z.string().trim().max(200).optional(),
  description: z.string().trim().max(1000).optional(),
  quantity: z.string().trim().regex(/^\d{1,8}(\.\d{1,2})?$/, 'Enter a quantity like 1 or 2.5').optional().or(z.literal('')),
  unitPrice: z.string().trim().transform((v) => v.replace(/[€\s,]/g, '')).pipe(z.string().regex(/^(\d{1,12}(\.\d{1,2})?)?$/, 'Enter a price like 6500')).optional(),
  discountPct: z.string().trim().regex(/^(\d{1,3}(\.\d{1,2})?)?$/, 'Enter a percentage').refine((v) => !v || Number(v) <= 100, 'At most 100').optional(),
  taxRate: z.string().trim().regex(/^(\d{1,2}(\.\d{1,2})?)?$/, 'Enter a VAT rate like 21').optional(),
  billingFrequency: z.enum(['one_time', 'monthly', 'quarterly', 'yearly']).optional(),
});

export type LineItemFormInput = z.input<typeof lineSchema>;

function lineErrors(err: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const i of err.issues) out[String(i.path[0] ?? '_')] ??= i.message;
  return out;
}

export async function addLineItemAction(dealId: string, input: LineItemFormInput): Promise<SalesResult> {
  const user = await requireUser();
  const parsed = lineSchema.safeParse(input);
  if (!parsed.success) return { ok: false, code: 'invalid', error: 'Check the line', fieldErrors: lineErrors(parsed.error) };
  try {
    const deal = await editableDeal(user, dealId);
    if (!deal) return { ok: false, code: 'not_found', error: 'Deal not found' };
    const res = await tx((t) => addLineItem(t, dealId, { ...parsed.data, productId: parsed.data.productId || null }), { userId: user.id });
    revalidateDeal(dealId, deal.organization_id);
    return { ok: true, id: res.id };
  } catch (err) {
    return toSalesResult(err);
  }
}

export async function updateLineItemAction(lineId: string, input: LineItemFormInput): Promise<SalesResult> {
  const user = await requireUser();
  const parsed = lineSchema.safeParse(input);
  if (!parsed.success || !isUuid(lineId)) return { ok: false, code: 'invalid', error: 'Check the line', fieldErrors: parsed.success ? {} : lineErrors(parsed.error) };
  try {
    const [line] = await sql<{ deal_id: string | null }[]>`select deal_id from line_items where id = ${lineId}`;
    if (!line?.deal_id) return { ok: false, code: 'not_found', error: 'Line item not found' };
    const deal = await editableDeal(user, line.deal_id);
    if (!deal) return { ok: false, code: 'not_found', error: 'Deal not found' };
    const { productId: _ignored, ...rest } = parsed.data;
    await tx((t) => updateLineItem(t, lineId, rest), { userId: user.id });
    revalidateDeal(deal.id, deal.organization_id);
    return { ok: true };
  } catch (err) {
    return toSalesResult(err);
  }
}

export async function deleteLineItemAction(lineId: string): Promise<SalesResult> {
  const user = await requireUser();
  if (!isUuid(lineId)) return { ok: false, code: 'invalid', error: 'Line item not found' };
  try {
    const [line] = await sql<{ deal_id: string | null }[]>`select deal_id from line_items where id = ${lineId}`;
    if (!line?.deal_id) return { ok: false, code: 'not_found', error: 'Line item not found' };
    const deal = await editableDeal(user, line.deal_id);
    if (!deal) return { ok: false, code: 'not_found', error: 'Deal not found' };
    await tx((t) => deleteLineItem(t, lineId), { userId: user.id });
    revalidateDeal(deal.id, deal.organization_id);
    return { ok: true };
  } catch (err) {
    return toSalesResult(err);
  }
}

export async function createQuoteAction(dealId: string, validUntil: string | null): Promise<SalesResult> {
  const user = await requireUser();
  if (validUntil && !/^\d{4}-\d{2}-\d{2}$/.test(validUntil)) return { ok: false, code: 'invalid', error: 'Enter a valid until date' };
  try {
    const deal = await editableDeal(user, dealId);
    if (!deal) return { ok: false, code: 'not_found', error: 'Deal not found' };
    const q = await tx((t) => createQuote(t, dealId, { validUntil, actor: { id: user.id, name: user.name } }), { userId: user.id });
    revalidateDeal(dealId, deal.organization_id);
    return { ok: true, id: q.id, message: `Quote ${q.number} drafted` };
  } catch (err) {
    return toSalesResult(err);
  }
}

export async function updateQuoteAction(quoteId: string, input: { status?: string; validUntil?: string | null }): Promise<SalesResult> {
  const user = await requireUser();
  if (!isUuid(quoteId)) return { ok: false, code: 'invalid', error: 'Quote not found' };
  if (input.validUntil && !/^\d{4}-\d{2}-\d{2}$/.test(input.validUntil)) return { ok: false, code: 'invalid', error: 'Enter a valid until date' };
  try {
    const [q] = await sql<{ deal_id: string }[]>`select deal_id from quotes where id = ${quoteId}`;
    if (!q) return { ok: false, code: 'not_found', error: 'Quote not found' };
    const deal = await editableDeal(user, q.deal_id);
    if (!deal) return { ok: false, code: 'not_found', error: 'Deal not found' };
    await tx((t) => updateQuote(t, quoteId, { status: input.status ?? null, validUntil: input.validUntil, actor: { id: user.id, name: user.name } }), {
      userId: user.id,
    });
    revalidateDeal(deal.id, deal.organization_id);
    return { ok: true };
  } catch (err) {
    return toSalesResult(err);
  }
}

const contactSchema = z.object({
  dealId: z.string().uuid(),
  contactId: z.string().uuid({ message: 'Pick a contact from the list' }),
  role: z.enum(['decision_maker', 'champion', 'billing_contact', 'influencer', 'user', 'signer', 'other']),
  roleNote: z.string().trim().max(200).optional(),
  isPrimary: z.boolean().optional(),
});

export async function addDealContactAction(input: z.input<typeof contactSchema>): Promise<SalesResult> {
  const user = await requireUser();
  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) return { ok: false, code: 'invalid', error: parsed.error.issues[0]?.message ?? 'Pick a contact and a role' };
  try {
    const deal = await editableDeal(user, parsed.data.dealId);
    if (!deal) return { ok: false, code: 'not_found', error: 'Deal not found' };
    await tx((t) => addDealContact(t, parsed.data), { userId: user.id });
    revalidateDeal(deal.id, deal.organization_id);
    revalidatePath(`/contacts/${parsed.data.contactId}`);
    return { ok: true };
  } catch (err) {
    return toSalesResult(err);
  }
}

export async function removeDealContactAction(dealContactId: string): Promise<SalesResult> {
  const user = await requireUser();
  if (!isUuid(dealContactId)) return { ok: false, code: 'invalid', error: 'Not found' };
  try {
    const [row] = await sql<{ deal_id: string }[]>`select deal_id from deal_contacts where id = ${dealContactId}`;
    if (!row) return { ok: false, code: 'not_found', error: 'That contact is not on the deal' };
    const deal = await editableDeal(user, row.deal_id);
    if (!deal) return { ok: false, code: 'not_found', error: 'Deal not found' };
    await tx((t) => removeDealContact(t, dealContactId), { userId: user.id });
    revalidateDeal(deal.id, deal.organization_id);
    return { ok: true };
  } catch (err) {
    return toSalesResult(err);
  }
}

/** Timeline composer note on a deal (linked to its organization too). */
export async function addDealNoteAction(_prev: ActionState, fd: FormData): Promise<ActionState> {
  const user = await requireUser();
  const id = str(fd, 'dealId');
  const body = str(fd, 'body');
  if (!id || !isUuid(id)) return fail('Deal not found');
  if (!body) return fail('Write something first', { body: 'Write something first' });
  if (body.length > 10000) return fail('Keep the note under 10,000 characters');
  if (!can(user, 'create', 'activity')) return fail("You can't add notes");
  const deal = await dealForEdit(id);
  if (!deal) return fail('Deal not found');
  await logActivity({
    kind: 'note',
    title: `Note from ${user.name.split(' ')[0]}`,
    body,
    actorUserId: user.id,
    links: [{ dealId: id, isPrimary: true }, { organizationId: deal.organization_id }],
    autoLink: false,
  });
  revalidateDeal(id, deal.organization_id);
  return { ok: true, message: 'Note added' };
}
