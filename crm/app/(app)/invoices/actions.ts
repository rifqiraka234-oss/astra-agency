'use server';
/**
 * Invoice server actions (agent F). Drafts are editable, "Mark as issued" takes
 * the next gapless number, issued invoices are read only and corrected with a
 * credit note. Account managers edit drafts only, sales only view (lib/permissions.ts).
 */
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { requireUser, type CurrentUser } from '@/lib/auth';
import { can } from '@/lib/permissions';
import { sql, tx } from '@/lib/db';
import { logActivity } from '@/lib/activities';
import { getFieldDefinitions, parseCustomForm, validateCustom } from '@/lib/fields';
import { fail, str, zodFieldErrors, type ActionState } from '@/lib/forms';
import { todayKey } from '@/lib/format';
import {
  addInvoiceLine,
  createCreditNote,
  createInvoiceDraft,
  deleteInvoiceDraft,
  InvoiceError,
  issueInvoice,
  removeInvoiceLine,
  setInvoiceState,
  updateInvoiceDraft,
  type DraftPatch,
} from '@/lib/money/invoices';
import { isVatTreatment, suggestTreatment, VAT_TREATMENT_OPTIONS, type VatTreatment } from '@/lib/money/vat';
import type { InvoiceState } from '@/lib/money/ageing';
import { dateKey, decimal, money, oneOf, uuid } from '@/lib/delivery/parse';

type InvoicePerm = { id: string; state: string; organization_id: string | null; project_id: string | null; deal_id: string | null; kind: string };

async function loadInvoice(id: string | null): Promise<InvoicePerm | null> {
  if (!id || !/^[0-9a-f-]{36}$/i.test(id)) return null;
  const [i] = await sql<InvoicePerm[]>`select id, state, organization_id, project_id, deal_id, kind from invoices where id = ${id} and deleted_at is null`;
  return i ?? null;
}

async function editable(user: CurrentUser, id: string | null): Promise<InvoicePerm | ActionState> {
  const inv = await loadInvoice(id);
  if (!inv) return fail('Invoice not found');
  if (!can(user, 'edit', 'invoice', inv)) {
    return fail(inv.state === 'draft' ? "You can't edit invoices" : 'Only an admin can change an issued invoice');
  }
  return inv;
}

const isState = (x: unknown): x is ActionState => typeof x === 'object' && x !== null && 'ok' in x;

function errorMessage(e: unknown): string {
  if (e instanceof InvoiceError) return e.message;
  const pg = e as { code?: string; message?: string };
  if (pg?.code === '23514' && pg.message) return pg.message; // the read only trigger speaks plain English
  console.error(e);
  return 'Something went wrong, try again';
}

function revalidate(inv: Pick<InvoicePerm, 'id' | 'organization_id' | 'project_id'>) {
  revalidatePath(`/invoices/${inv.id}`);
  revalidatePath('/invoices');
  if (inv.project_id) revalidatePath(`/projects/${inv.project_id}`);
  if (inv.organization_id) revalidatePath(`/organizations/${inv.organization_id}`);
}

// ---------------------------------------------------------------- create

const createSchema = z.object({
  title: z.string({ message: 'Say what the invoice is for' }).trim().min(1, 'Say what the invoice is for').max(300),
  organization_id: uuid(),
  contact_id: uuid(),
  project_id: uuid(),
  deal_id: uuid(),
  vat_treatment: oneOf(VAT_TREATMENT_OPTIONS.map((o) => o.value)),
  due_date: dateKey(),
});

export async function createInvoiceAction(_prev: ActionState, fd: FormData): Promise<ActionState> {
  const user = await requireUser();
  if (!can(user, 'create', 'invoice')) return fail("You can't create invoices");
  const parsed = createSchema.safeParse({
    title: str(fd, 'title') ?? '',
    organization_id: str(fd, 'organization_id'),
    contact_id: str(fd, 'contact_id'),
    project_id: str(fd, 'project_id'),
    deal_id: str(fd, 'deal_id'),
    vat_treatment: str(fd, 'vat_treatment'),
    due_date: str(fd, 'due_date'),
  });
  if (!parsed.success) return fail('Check the highlighted fields', zodFieldErrors(parsed.error));
  const v = parsed.data;
  try {
    const id = await tx(
      async (t) => {
        let orgId = v.organization_id;
        if (!orgId && v.project_id) orgId = (await t<{ o: string | null }[]>`select organization_id as o from projects where id = ${v.project_id}`)[0]?.o ?? null;
        if (!orgId && v.deal_id) orgId = (await t<{ o: string | null }[]>`select organization_id as o from deals where id = ${v.deal_id}`)[0]?.o ?? null;
        let treatment = v.vat_treatment as VatTreatment | null;
        if (!treatment) {
          const [org] = orgId ? await t<{ country: string | null }[]>`select country from organizations where id = ${orgId}` : [];
          treatment = suggestTreatment(org?.country);
        }
        return createInvoiceDraft(t, {
          organizationId: orgId,
          contactId: v.contact_id,
          projectId: v.project_id,
          dealId: v.deal_id,
          title: v.title,
          vatTreatment: treatment,
          dueDate: v.due_date,
          actorUserId: user.id,
        });
      },
      { userId: user.id },
    );
    revalidatePath('/invoices');
    return { ok: true, id, href: `/invoices/${id}` };
  } catch (e) {
    return fail(errorMessage(e));
  }
}

// ---------------------------------------------------------------- draft properties

const propsSchema = z.object({
  title: z.string().trim().min(1, 'Say what the invoice is for').max(300).optional(),
  vat_treatment: oneOf(VAT_TREATMENT_OPTIONS.map((o) => o.value)).optional(),
  due_date: dateKey().optional(),
  notes: z.string().trim().max(5000).nullable().optional(),
  organization_id: uuid().optional(),
  contact_id: uuid().optional(),
  project_id: uuid().optional(),
  deal_id: uuid().optional(),
});
const PROP_KEYS = Object.keys(propsSchema.shape) as (keyof z.infer<typeof propsSchema>)[];

export async function updateInvoiceProperties(_prev: ActionState, fd: FormData): Promise<ActionState> {
  const user = await requireUser();
  const inv = await editable(user, str(fd, 'id'));
  if (isState(inv)) return inv;
  const input: Record<string, string | null> = {};
  for (const k of PROP_KEYS) if (fd.has(k)) input[k] = str(fd, k);
  const parsed = propsSchema.safeParse(input);
  if (!parsed.success) return fail('Check the highlighted fields', zodFieldErrors(parsed.error));
  const patch: DraftPatch = {};
  for (const [k, v] of Object.entries(parsed.data)) {
    if (v === undefined) continue;
    if (v === null && (k === 'title' || k === 'vat_treatment')) return fail('Check the highlighted fields', { [k]: 'This one needs a value' });
    (patch as Record<string, unknown>)[k] = v;
  }
  if (patch.vat_treatment && !isVatTreatment(patch.vat_treatment)) return fail('Pick a VAT treatment');
  const defs = await getFieldDefinitions('invoice');
  const custom = validateCustom(defs, parseCustomForm(defs, fd), { partial: true });
  if (!custom.ok) return fail('Check the highlighted fields', Object.fromEntries(Object.entries(custom.errors).map(([k, m]) => [`custom.${k}`, m])));
  try {
    await tx(
      async (t) => {
        if (Object.keys(patch).length) await updateInvoiceDraft(t, inv.id, patch);
        if (Object.keys(custom.value).length) await t`update invoices set custom = custom || ${t.json(custom.value as never)} where id = ${inv.id}`;
      },
      { userId: user.id },
    );
  } catch (e) {
    return fail(errorMessage(e));
  }
  revalidate(inv);
  return { ok: true };
}

// ---------------------------------------------------------------- lines

const lineSchema = z.object({
  product_id: uuid(),
  name: z.string().trim().max(300).nullable(),
  description: z.string().trim().max(2000).nullable(),
  quantity: decimal({ negative: true, max: 100000, message: 'Enter a quantity like 1 or 2.5' }),
  unit_price: money({ negative: true }),
  discount_pct: decimal({ max: 100, message: 'Enter a discount between 0 and 100' }),
  tax_rate: oneOf(['21', '9', '0']),
});

export async function addInvoiceLineAction(_prev: ActionState, fd: FormData): Promise<ActionState> {
  const user = await requireUser();
  const inv = await editable(user, str(fd, 'invoiceId'));
  if (isState(inv)) return inv;
  const parsed = lineSchema.safeParse({
    product_id: str(fd, 'product_id'),
    name: str(fd, 'name'),
    description: str(fd, 'description'),
    quantity: str(fd, 'quantity') ?? '1',
    unit_price: str(fd, 'unit_price'),
    discount_pct: str(fd, 'discount_pct'),
    tax_rate: str(fd, 'tax_rate'),
  });
  if (!parsed.success) return fail(parsed.error.issues[0]?.message ?? 'Check the line', zodFieldErrors(parsed.error));
  const v = parsed.data;
  if (!v.product_id && !v.name) return fail('Pick a product or type a line name', { name: 'Name the line' });
  if (!v.product_id && v.unit_price === null) return fail('Give the line a unit price', { unit_price: 'Enter a price' });
  if (v.quantity !== null && Number(v.quantity) === 0) return fail('The quantity cannot be zero', { quantity: 'Not zero' });
  try {
    await tx(
      (t) =>
        addInvoiceLine(t, inv.id, {
          productId: v.product_id,
          name: v.name,
          description: v.description,
          quantity: v.quantity ?? '1',
          unitPrice: v.unit_price,
          discountPct: v.discount_pct ?? '0',
          taxRate: v.tax_rate,
        }),
      { userId: user.id },
    );
  } catch (e) {
    return fail(errorMessage(e));
  }
  revalidate(inv);
  return { ok: true };
}

export async function removeInvoiceLineAction(_prev: ActionState, fd: FormData): Promise<ActionState> {
  const user = await requireUser();
  const inv = await editable(user, str(fd, 'invoiceId'));
  if (isState(inv)) return inv;
  const lineId = str(fd, 'lineId');
  if (!lineId) return fail('Line not found');
  try {
    await tx(
      async (t) => {
        const [l] = await t<{ invoice_id: string | null }[]>`select invoice_id from line_items where id = ${lineId}`;
        if (l?.invoice_id !== inv.id) throw new InvoiceError('Line not found');
        await removeInvoiceLine(t, lineId);
      },
      { userId: user.id },
    );
  } catch (e) {
    return fail(errorMessage(e));
  }
  revalidate(inv);
  return { ok: true };
}

// ---------------------------------------------------------------- issuing and states

export async function issueInvoiceAction(_prev: ActionState, fd: FormData): Promise<ActionState> {
  const user = await requireUser();
  const inv = await editable(user, str(fd, 'id'));
  if (isState(inv)) return inv;
  const issueDate = str(fd, 'issue_date') ?? todayKey();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(issueDate)) return fail('Pick the issue date');
  if (issueDate > todayKey()) return fail('The issue date cannot be in the future');
  try {
    const res = await tx((t) => issueInvoice(t, inv.id, { actorUserId: user.id, issueDate }), { userId: user.id });
    revalidate(inv);
    return { ok: true, message: `Issued as ${res.number}, due ${res.dueDate}` };
  } catch (e) {
    return fail(errorMessage(e));
  }
}

export async function invoiceStateAction(_prev: ActionState, fd: FormData): Promise<ActionState> {
  const user = await requireUser();
  const inv = await editable(user, str(fd, 'id'));
  if (isState(inv)) return inv;
  const to = str(fd, 'to') as InvoiceState | null;
  if (!to || !['paid', 'late', 'open', 'void'].includes(to)) return fail('Pick a state');
  const paidOn = str(fd, 'paid_on');
  if (to === 'paid' && paidOn && (!/^\d{4}-\d{2}-\d{2}$/.test(paidOn) || paidOn > todayKey())) return fail('The paid date cannot be in the future');
  const reason = str(fd, 'reason');
  if (to === 'void' && inv.state !== 'draft' && !reason) return fail('Say why it is voided');
  try {
    await tx((t) => setInvoiceState(t, inv.id, to, { actorUserId: user.id, paidOn, reason }), { userId: user.id });
  } catch (e) {
    return fail(errorMessage(e));
  }
  revalidate(inv);
  return { ok: true };
}

export async function createCreditNoteAction(_prev: ActionState, fd: FormData): Promise<ActionState> {
  const user = await requireUser();
  if (!can(user, 'create', 'invoice')) return fail("You can't create credit notes");
  const inv = await loadInvoice(str(fd, 'id'));
  if (!inv) return fail('Invoice not found');
  try {
    const id = await tx((t) => createCreditNote(t, inv.id, { actorUserId: user.id }), { userId: user.id });
    revalidate(inv);
    return { ok: true, id, href: `/invoices/${id}` };
  } catch (e) {
    return fail(errorMessage(e));
  }
}

export async function deleteInvoiceDraftAction(_prev: ActionState, fd: FormData): Promise<ActionState> {
  const user = await requireUser();
  const inv = await loadInvoice(str(fd, 'id'));
  if (!inv) return fail('Invoice not found');
  if (inv.state !== 'draft') return fail('Only drafts can be deleted, void an issued invoice instead');
  if (!can(user, 'delete', 'invoice', inv) && !can(user, 'edit', 'invoice', inv)) return fail("You can't delete invoices");
  try {
    await tx((t) => deleteInvoiceDraft(t, inv.id), { userId: user.id });
  } catch (e) {
    return fail(errorMessage(e));
  }
  revalidate(inv);
  return { ok: true, href: '/invoices' };
}

export async function addInvoiceNote(_prev: ActionState, fd: FormData): Promise<ActionState> {
  const user = await requireUser();
  const inv = await loadInvoice(str(fd, 'invoiceId'));
  if (!inv) return fail('Invoice not found');
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
          links: [{ invoiceId: inv.id, isPrimary: true }, { organizationId: inv.organization_id }],
          autoLink: false,
        },
        t,
      ),
    { userId: user.id },
  );
  revalidate(inv);
  return { ok: true };
}
