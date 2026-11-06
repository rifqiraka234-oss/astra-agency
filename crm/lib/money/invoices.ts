/**
 * lib/money/invoices.ts, invoice writes. Every function takes the caller's
 * transaction, so pass the one from tx(fn, { userId }).
 *
 *   const id = await createInvoiceDraft(t, { organizationId, title: 'Website rebuild, final 50%', vatTreatment: 'nl_21', actorUserId });
 *   await addInvoiceLine(t, id, { productId, quantity: '1' });           // or { name, unitPrice, quantity, taxRate }
 *   const { number } = await issueInvoice(t, id, { actorUserId });        // takes the next AST-YYYY-NNN
 *   await setInvoiceState(t, id, 'paid', { actorUserId, paidOn: '2026-11-20' });
 *   const creditId = await createCreditNote(t, id, { actorUserId });      // a negative draft linked to it
 *
 * Drafts are editable, everything issued is read only (the invoices_guard and
 * line_items_invoice_guard triggers from migration 600 enforce it, these
 * functions check first so the user gets a plain message). Totals are mirrored
 * on the invoice row after every line change, the lines stay the source.
 */
import { sql, type Db, type Tx } from '../db';
import { logActivity } from '../activities';
import { emit } from '../events';
import { addDaysKey, amsterdamTime, formatMoney, todayKey } from '../format';
import { canMove, type InvoiceState } from './ageing';
import { nextInvoiceNumber, DEFAULT_SERIES } from './numbering';
import { defaultLineRate, invoiceTotals, isVatTreatment, type VatTreatment } from './vat';

export const PAYMENT_TERM_DAYS = 14;

export class InvoiceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvoiceError';
  }
}

export type InvoiceRow = {
  id: string;
  organization_id: string | null;
  contact_id: string | null;
  project_id: string | null;
  deal_id: string | null;
  title: string | null;
  state: InvoiceState;
  kind: 'invoice' | 'credit_note';
  credit_of_invoice_id: string | null;
  external_number: string | null;
  issue_date: string | null;
  due_date: string | null;
  issued_at: Date | null;
  paid_at: Date | null;
  vat_treatment: VatTreatment;
  currency: string;
  subtotal: string | null;
  vat_amount: string | null;
  total: string | null;
  notes: string | null;
  custom: Record<string, unknown>;
  created_at: Date;
};

export type InvoiceLineRow = {
  id: string;
  invoice_id: string;
  product_id: string | null;
  name: string;
  description: string | null;
  quantity: string;
  unit_price: string;
  discount_pct: string;
  tax_rate: string;
  currency: string;
  position: number;
};

async function lockInvoice(t: Tx, id: string): Promise<InvoiceRow> {
  const [row] = await t<InvoiceRow[]>`select * from invoices where id = ${id} and deleted_at is null for update`;
  if (!row) throw new InvoiceError('Invoice not found');
  return row;
}

async function lockDraft(t: Tx, id: string): Promise<InvoiceRow> {
  const row = await lockInvoice(t, id);
  if (row.state === 'void' && !row.external_number) throw new InvoiceError('This draft was voided');
  if (row.state !== 'draft') throw new InvoiceError(`Invoice ${row.external_number} is issued and read only. Correct it with a credit note.`);
  return row;
}

function label(inv: Pick<InvoiceRow, 'external_number' | 'kind'>): string {
  const what = inv.kind === 'credit_note' ? 'Credit note' : 'Invoice';
  return inv.external_number ? `${what} ${inv.external_number}` : `Draft ${what.toLowerCase()}`;
}

async function logInvoiceActivity(t: Tx, inv: InvoiceRow, title: string, actorUserId: string | null, body: string | null = null) {
  await logActivity(
    {
      kind: 'invoice',
      direction: 'internal',
      actorUserId,
      title,
      body,
      source: 'system',
      meta: { tags: [inv.title, inv.total ? formatMoney(inv.total, inv.currency, 2) : null].filter(Boolean) },
      links: [
        { invoiceId: inv.id, isPrimary: true },
        { organizationId: inv.organization_id },
        { dealId: inv.deal_id },
        { projectId: inv.project_id },
      ],
      autoLink: false,
    },
    t,
  );
}

// ---------------------------------------------------------------- drafts

export type DraftInput = {
  organizationId: string | null;
  contactId?: string | null;
  projectId?: string | null;
  dealId?: string | null;
  title: string;
  vatTreatment?: VatTreatment;
  currency?: string;
  dueDate?: string | null;
  notes?: string | null;
  actorUserId: string | null;
};

export async function createInvoiceDraft(t: Tx, input: DraftInput): Promise<string> {
  const treatment = input.vatTreatment ?? 'nl_21';
  if (!isVatTreatment(treatment)) throw new InvoiceError('Pick a VAT treatment');
  const [row] = await t<InvoiceRow[]>`
    insert into invoices (organization_id, contact_id, project_id, deal_id, title, state, vat_treatment, currency,
                          due_date, notes, subtotal, vat_amount, total)
    values (${input.organizationId}, ${input.contactId ?? null}, ${input.projectId ?? null}, ${input.dealId ?? null},
            ${input.title}, 'draft', ${treatment}, ${input.currency ?? 'EUR'}, ${input.dueDate ?? null},
            ${input.notes ?? null}, 0, 0, 0)
    returning *`;
  await logInvoiceActivity(t, row, `Draft invoice created, ${input.title}`, input.actorUserId);
  return row.id;
}

export type DraftPatch = Partial<{
  organization_id: string | null;
  contact_id: string | null;
  project_id: string | null;
  deal_id: string | null;
  title: string;
  vat_treatment: VatTreatment;
  due_date: string | null;
  notes: string | null;
}>;

export async function updateInvoiceDraft(t: Tx, id: string, patch: DraftPatch): Promise<void> {
  await lockDraft(t, id);
  const entries = Object.entries(patch).filter(([, v]) => v !== undefined);
  if (entries.length === 0) return;
  if (patch.vat_treatment !== undefined && !isVatTreatment(patch.vat_treatment)) throw new InvoiceError('Pick a VAT treatment');
  const row = Object.fromEntries(entries) as Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  await t`update invoices set ${t(row)} where id = ${id}`;
  await recomputeInvoiceTotals(t, id);
}

/** Soft deletes a draft. Issued invoices are voided instead. */
export async function deleteInvoiceDraft(t: Tx, id: string): Promise<void> {
  await lockDraft(t, id);
  await t`update invoices set deleted_at = now() where id = ${id}`;
}

// ---------------------------------------------------------------- lines

export type LineInputData = {
  productId?: string | null;
  name?: string | null;
  description?: string | null;
  quantity: string;
  unitPrice?: string | null;
  discountPct?: string | null;
  taxRate?: string | null;
};

export async function addInvoiceLine(t: Tx, invoiceId: string, line: LineInputData): Promise<string> {
  const inv = await lockDraft(t, invoiceId);
  let name = line.name?.trim() || null;
  let description = line.description?.trim() || null;
  let unitPrice = line.unitPrice ?? null;
  let taxRate = line.taxRate ?? null;
  if (line.productId) {
    const [p] = await t<{ name: string; description: string | null; unit_price: string; tax_rate: string }[]>`
      select name, description, unit_price, tax_rate from products where id = ${line.productId}`;
    if (!p) throw new InvoiceError('That product no longer exists');
    name = name ?? p.name;
    description = description ?? p.description;
    unitPrice = unitPrice ?? p.unit_price;
    if (taxRate === null && (inv.vat_treatment === 'nl_21' || inv.vat_treatment === 'nl_9')) {
      // A product's own rate wins over the treatment default on Dutch invoices.
      taxRate = p.tax_rate;
    }
  }
  if (!name) throw new InvoiceError('Give the line a name or pick a product');
  if (unitPrice === null) throw new InvoiceError('Give the line a unit price');
  const [{ pos }] = await t<{ pos: number }[]>`
    select coalesce(max(position) + 1, 0)::int as pos from line_items where invoice_id = ${invoiceId}`;
  const [row] = await t<{ id: string }[]>`
    insert into line_items (invoice_id, product_id, name, description, quantity, unit_price, discount_pct, tax_rate, currency, position)
    values (${invoiceId}, ${line.productId ?? null}, ${name}, ${description}, ${line.quantity}, ${unitPrice},
            ${line.discountPct ?? '0'}, ${taxRate ?? String(defaultLineRate(inv.vat_treatment))}, ${inv.currency}, ${pos})
    returning id`;
  await recomputeInvoiceTotals(t, invoiceId);
  return row.id;
}

export async function updateInvoiceLine(
  t: Tx,
  lineId: string,
  patch: Partial<{ name: string; description: string | null; quantity: string; unit_price: string; discount_pct: string; tax_rate: string }>,
): Promise<void> {
  const [line] = await t<{ invoice_id: string | null }[]>`select invoice_id from line_items where id = ${lineId}`;
  if (!line?.invoice_id) throw new InvoiceError('Line not found');
  await lockDraft(t, line.invoice_id);
  const entries = Object.entries(patch).filter(([, v]) => v !== undefined);
  if (entries.length) {
    const row = Object.fromEntries(entries) as Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
    await t`update line_items set ${t(row)} where id = ${lineId}`;
  }
  await recomputeInvoiceTotals(t, line.invoice_id);
}

export async function removeInvoiceLine(t: Tx, lineId: string): Promise<void> {
  const [line] = await t<{ invoice_id: string | null }[]>`select invoice_id from line_items where id = ${lineId}`;
  if (!line?.invoice_id) throw new InvoiceError('Line not found');
  await lockDraft(t, line.invoice_id);
  await t`delete from line_items where id = ${lineId}`;
  await recomputeInvoiceTotals(t, line.invoice_id);
}

export async function getInvoiceLines(db: Db, invoiceId: string): Promise<InvoiceLineRow[]> {
  return db<InvoiceLineRow[]>`
    select id, invoice_id, product_id, name, description, quantity, unit_price, discount_pct, tax_rate, currency, position
      from line_items where invoice_id = ${invoiceId} order by position, created_at`;
}

/** Recompute the mirrored subtotal, VAT and total from the lines. Drafts only. */
export async function recomputeInvoiceTotals(t: Tx, invoiceId: string) {
  const [inv] = await t<{ vat_treatment: VatTreatment; state: string }[]>`select vat_treatment, state from invoices where id = ${invoiceId}`;
  if (!inv || inv.state !== 'draft') return null;
  const lines = await getInvoiceLines(t, invoiceId);
  const totals = invoiceTotals(lines, inv.vat_treatment);
  await t`update invoices set subtotal = ${totals.subtotal}, vat_amount = ${totals.vat}, total = ${totals.total} where id = ${invoiceId}`;
  return totals;
}

// ---------------------------------------------------------------- issuing and states

export type IssueResult = { number: string; issueDate: string; dueDate: string };

/**
 * Mark as issued: take the next gapless number, fix the issue and due dates and
 * make the invoice read only. Runs in the caller's transaction, so a failure
 * later in it gives the number back.
 */
export async function issueInvoice(
  t: Tx,
  id: string,
  opts: { actorUserId: string | null; issueDate?: string; series?: string },
): Promise<IssueResult> {
  const inv = await lockDraft(t, id);
  if (!inv.organization_id) throw new InvoiceError('Pick the organization the invoice is for before issuing it');
  if (inv.vat_treatment === 'reverse_charge') {
    // Art. 226 needs the customer's VAT number on a reverse charge invoice.
    const [org] = await t<{ vat_number: string | null; name: string }[]>`select vat_number, name from organizations where id = ${inv.organization_id}`;
    if (!org?.vat_number) throw new InvoiceError(`Add the VAT number of ${org?.name ?? 'the organization'} first, a reverse charge invoice must show it`);
  }
  const lines = await getInvoiceLines(t, id);
  if (lines.length === 0) throw new InvoiceError('Add at least one line before issuing');
  const totals = invoiceTotals(lines, inv.vat_treatment);
  if (inv.kind === 'credit_note' && !totals.total.startsWith('-')) throw new InvoiceError('A credit note must have a negative total');
  if (inv.kind === 'invoice' && totals.total.startsWith('-')) throw new InvoiceError('An invoice cannot have a negative total, use a credit note');

  const issueDate = opts.issueDate ?? todayKey();
  const dueDate = inv.due_date && inv.due_date >= issueDate ? inv.due_date : addDaysKey(issueDate, PAYMENT_TERM_DAYS);
  const number = await nextInvoiceNumber(t, Number(issueDate.slice(0, 4)), opts.series ?? DEFAULT_SERIES);
  await t`
    update invoices
       set state = 'open', external_number = ${number}, issue_date = ${issueDate}, due_date = ${dueDate},
           issued_at = now(), subtotal = ${totals.subtotal}, vat_amount = ${totals.vat}, total = ${totals.total}
     where id = ${id}`;
  const after = { ...inv, external_number: number, total: totals.total };
  await logInvoiceActivity(t, after, `${label(after)} issued`, opts.actorUserId, `Due ${dueDate}.`);
  return { number, issueDate, dueDate };
}

/** Move an issued invoice: open, late, paid or void. draft to void is allowed too. */
export async function setInvoiceState(
  t: Tx,
  id: string,
  to: InvoiceState,
  opts: { actorUserId: string | null; paidOn?: string | null; reason?: string | null },
): Promise<void> {
  const inv = await lockInvoice(t, id);
  if (inv.state === to) return;
  if (inv.state === 'draft' && to === 'open') throw new InvoiceError('Use Mark as issued, it assigns the number');
  if (!canMove(inv.state, to)) throw new InvoiceError(`An invoice that is ${inv.state} cannot become ${to}`);
  if (to === 'paid') {
    const paidOn = opts.paidOn ?? todayKey();
    if (inv.issue_date && paidOn < inv.issue_date) throw new InvoiceError('The paid date is before the issue date');
    await t`update invoices set state = 'paid', paid_at = ${amsterdamTime(paidOn, '12:00')} where id = ${id}`;
    await logInvoiceActivity(t, inv, `${label(inv)} paid`, opts.actorUserId, `Paid on ${paidOn}.`);
    return;
  }
  await t`update invoices set state = ${to} where id = ${id}`;
  const words: Record<string, string> = { open: 'back to open', late: 'marked late', void: 'voided' };
  await logInvoiceActivity(t, inv, `${label(inv)} ${words[to] ?? to}`, opts.actorUserId, opts.reason ?? null);
  if (to === 'late') {
    await emit(
      t,
      'invoice.late',
      { id, organizationId: inv.organization_id, number: inv.external_number, dueDate: inv.due_date, total: inv.total, currency: inv.currency },
      { aggregateType: 'invoice', aggregateId: id, actorUserId: opts.actorUserId },
    );
  }
}

/** Open invoices past their due date become late (and emit invoice.late). For the worker's daily sweep. */
export async function markLateInvoices(t: Tx, today: string = todayKey()): Promise<string[]> {
  const rows = await t<{ id: string }[]>`
    select id from invoices where state = 'open' and deleted_at is null and due_date < ${today} order by due_date`;
  for (const r of rows) await setInvoiceState(t, r.id, 'late', { actorUserId: null, reason: 'Past the due date' });
  return rows.map((r) => r.id);
}

/** A draft credit note with every line of the original negated. Edit it down for a partial credit. */
export async function createCreditNote(t: Tx, originalId: string, opts: { actorUserId: string | null }): Promise<string> {
  const orig = await lockInvoice(t, originalId);
  if (orig.kind !== 'invoice') throw new InvoiceError('A credit note cannot be credited again');
  if (!['open', 'late', 'paid'].includes(orig.state)) throw new InvoiceError('Only issued invoices get a credit note, edit or delete a draft instead');
  const [row] = await t<InvoiceRow[]>`
    insert into invoices (organization_id, contact_id, project_id, deal_id, title, state, kind, credit_of_invoice_id,
                          vat_treatment, currency, notes, subtotal, vat_amount, total)
    values (${orig.organization_id}, ${orig.contact_id}, ${orig.project_id}, ${orig.deal_id},
            ${`Credit note for ${orig.external_number}`}, 'draft', 'credit_note', ${orig.id},
            ${orig.vat_treatment}, ${orig.currency}, ${`Corrects invoice ${orig.external_number} of ${orig.issue_date}.`}, 0, 0, 0)
    returning *`;
  const lines = await getInvoiceLines(t, originalId);
  for (const l of lines) {
    const qty = l.quantity.startsWith('-') ? l.quantity.slice(1) : `-${l.quantity}`;
    await t`
      insert into line_items (invoice_id, product_id, name, description, quantity, unit_price, discount_pct, tax_rate, currency, position)
      values (${row.id}, ${l.product_id}, ${l.name}, ${l.description}, ${qty}, ${l.unit_price}, ${l.discount_pct}, ${l.tax_rate}, ${l.currency}, ${l.position})`;
  }
  await recomputeInvoiceTotals(t, row.id);
  await logInvoiceActivity(t, orig, `Credit note drafted for ${orig.external_number}`, opts.actorUserId);
  return row.id;
}

// ---------------------------------------------------------------- reads

export type InvoiceListRow = InvoiceRow & {
  organization_name: string | null;
  project_name: string | null;
  deal_name: string | null;
  credit_of_number: string | null;
};

export async function listInvoices(db: Db = sql): Promise<InvoiceListRow[]> {
  return db<InvoiceListRow[]>`
    select i.*, o.name as organization_name, p.name as project_name, d.name as deal_name, c.external_number as credit_of_number
      from invoices i
      left join organizations o on o.id = i.organization_id
      left join projects p on p.id = i.project_id
      left join deals d on d.id = i.deal_id
      left join invoices c on c.id = i.credit_of_invoice_id
     where i.deleted_at is null
     order by coalesce(i.issue_date, i.created_at::date) desc, i.created_at desc`;
}
