import Link from 'next/link';
import { notFound } from 'next/navigation';
import '@/components/delivery/f.css';
import { requireUser } from '@/lib/auth';
import { can } from '@/lib/permissions';
import { sql } from '@/lib/db';
import { getTimeline } from '@/lib/activities';
import { customPropertyGroups, getFieldDefinitions, mergePropertyGroups, type PropertyGroup } from '@/lib/fields';
import { formatDate, formatDateLong, formatDateTime, formatMoney, formatPercent, todayKey } from '@/lib/format';
import { INVOICE_STATES, INVOICE_TONES, labelOf, toneOf } from '@/lib/options';
import { getInvoiceLines, type InvoiceRow } from '@/lib/money/invoices';
import { chargesVat, invoiceTotals, NL_LINE_RATES, VAT_TREATMENT_OPTIONS, defaultLineRate } from '@/lib/money/vat';
import { daysLate, isReceivable } from '@/lib/money/ageing';
import { lookups } from '@/lib/delivery/lookups';
import { Field, Input, Select } from '@/components/ui';
import { LinkedRecords, PropertiesPanel, RecordHeader, Timeline } from '@/components/records';
import { ActionForm } from '@/components/delivery/ActionForm';
import { PrintButton } from '@/components/delivery/PrintButton';
import {
  addInvoiceLineAction,
  addInvoiceNote,
  createCreditNoteAction,
  deleteInvoiceDraftAction,
  invoiceStateAction,
  issueInvoiceAction,
  removeInvoiceLineAction,
  updateInvoiceProperties,
} from '../actions';

export const metadata = { title: 'Invoice' };

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

type Row = InvoiceRow & {
  organization_name: string | null;
  org_address: string | null;
  org_city: string | null;
  org_country: string | null;
  org_vat: string | null;
  org_kvk: string | null;
  contact_name: string | null;
  project_name: string | null;
  deal_name: string | null;
  credit_of_number: string | null;
};

export default async function InvoicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!UUID.test(id)) notFound();
  const user = await requireUser();
  const [inv] = await sql<Row[]>`
    select i.*, o.name as organization_name, o.address as org_address, o.city as org_city, o.country as org_country,
           o.vat_number as org_vat, o.kvk_number as org_kvk, c.full_name as contact_name, p.name as project_name,
           d.name as deal_name, ci.external_number as credit_of_number
      from invoices i
      left join organizations o on o.id = i.organization_id
      left join contacts c on c.id = i.contact_id
      left join projects p on p.id = i.project_id
      left join deals d on d.id = i.deal_id
      left join invoices ci on ci.id = i.credit_of_invoice_id
     where i.id = ${id} and i.deleted_at is null`;
  if (!inv) notFound();

  const [lines, credits, timeline, lk, defs] = await Promise.all([
    getInvoiceLines(sql, id),
    sql<{ id: string; external_number: string | null; state: string; total: string | null; currency: string }[]>`
      select id, external_number, state, total, currency from invoices where credit_of_invoice_id = ${id} and deleted_at is null order by created_at`,
    getTimeline('invoice', id),
    lookups(['orgs', 'contacts', 'deals', 'projects', 'products']),
    getFieldDefinitions('invoice'),
  ]);

  const today = todayKey();
  const draft = inv.state === 'draft';
  const canEdit = can(user, 'edit', 'invoice', inv);
  const canCredit = can(user, 'create', 'invoice') && inv.kind === 'invoice' && ['open', 'late', 'paid'].includes(inv.state);
  const totals = invoiceTotals(lines, inv.vat_treatment);
  const cur = inv.currency || 'EUR';
  const isCredit = inv.kind === 'credit_note';
  const label = inv.external_number ?? (isCredit ? 'Draft credit note' : 'Draft invoice');
  const late = isReceivable(inv.state) ? daysLate(inv.due_date, today) : 0;
  const isSample = inv.custom?.sample === true;
  const dutch = chargesVat(inv.vat_treatment);
  const editDraft = draft && canEdit;

  const core: PropertyGroup[] = [
    {
      name: 'Invoice',
      editable: editDraft,
      fields: [
        { key: 'title', label: 'For', type: 'text', value: inv.title, display: inv.title ?? '', required: true, editable: editDraft },
        { key: 'vat_treatment', label: 'VAT', type: 'select', value: inv.vat_treatment, display: labelOf(VAT_TREATMENT_OPTIONS, inv.vat_treatment), options: VAT_TREATMENT_OPTIONS, required: true, editable: editDraft },
        { key: 'due_date', label: 'Due', type: 'date', value: inv.due_date, display: inv.due_date ? formatDate(inv.due_date) : draft ? '14 days after issue' : '', editable: editDraft },
        { key: 'notes', label: 'Notes on the invoice', type: 'textarea', value: inv.notes, display: inv.notes ?? '', editable: editDraft },
      ],
    },
    {
      name: 'Links',
      editable: editDraft,
      fields: [
        { key: 'organization_id', label: 'Organization', type: 'select', value: inv.organization_id, display: inv.organization_name ?? '', href: inv.organization_id ? `/organizations/${inv.organization_id}` : undefined, options: lk.orgs, editable: editDraft },
        { key: 'contact_id', label: 'Billing contact', type: 'select', value: inv.contact_id, display: inv.contact_name ?? '', href: inv.contact_id ? `/contacts/${inv.contact_id}` : undefined, options: lk.contacts, editable: editDraft },
        { key: 'deal_id', label: 'Deal', type: 'select', value: inv.deal_id, display: inv.deal_name ?? '', href: inv.deal_id ? `/deals/${inv.deal_id}` : undefined, options: lk.deals, editable: editDraft },
        { key: 'project_id', label: 'Project', type: 'select', value: inv.project_id, display: inv.project_name ?? '', href: inv.project_id ? `/projects/${inv.project_id}` : undefined, options: lk.projects, editable: editDraft },
      ],
    },
    {
      name: 'Dates',
      editable: false,
      fields: [
        { key: 'issue_date', label: 'Issued', type: 'readonly', value: null, display: inv.issue_date ? formatDateLong(inv.issue_date) : 'Not yet', editable: false },
        { key: 'paid_at', label: 'Paid', type: 'readonly', value: null, display: inv.paid_at ? formatDateLong(inv.paid_at) : '', editable: false },
        { key: 'created_at', label: 'Drafted', type: 'readonly', value: null, display: formatDateTime(inv.created_at), editable: false },
      ],
    },
  ];
  const groups = mergePropertyGroups(core, customPropertyGroups(defs, inv.custom, { editable: canEdit }));

  return (
    <>
      <RecordHeader
        breadcrumb={[{ label: 'Invoices', href: '/invoices' }, ...(inv.organization_id ? [{ label: inv.organization_name ?? 'Organization', href: `/organizations/${inv.organization_id}` }] : []), { label }]}
        title={<span className={inv.external_number ? 'mono' : undefined}>{label}</span>}
        subtitle={
          <span className="row" style={{ gap: 14, alignItems: 'baseline' }}>
            <span className="mono" style={{ fontSize: 20, color: 'var(--ink)' }}>
              {formatMoney(totals.total, cur, 2)}
            </span>
            <span>{inv.title}</span>
            {inv.due_date && !draft ? <span className={late ? 'danger' : undefined}>Due {formatDate(inv.due_date)}{late ? `, ${late} days late` : ''}</span> : null}
          </span>
        }
        badges={[
          { label: inv.state === 'paid' && inv.paid_at ? `Paid ${formatDate(inv.paid_at)}` : labelOf(INVOICE_STATES, inv.state), tone: toneOf(INVOICE_TONES, inv.state), strong: true },
          ...(isCredit ? [{ label: 'Credit note', tone: 'amber' as const }] : []),
          { label: labelOf(VAT_TREATMENT_OPTIONS, inv.vat_treatment) },
        ]}
        sample={isSample}
        actions={<PrintButton />}
      />
      <div className="record-body">
        <PropertiesPanel groups={groups} action={canEdit ? updateInvoiceProperties : undefined} hidden={{ id: inv.id }} label="Invoice properties" />

        <div className="record-main">
          <section className="card" aria-labelledby="state-h">
            <div className="f-card-head-row">
              <h2 id="state-h" className="f-card-title">
                {draft ? 'Draft, not numbered yet' : `${labelOf(INVOICE_STATES, inv.state)}${inv.issued_at ? `, issued ${formatDate(inv.issue_date)}` : ''}`}
              </h2>
              {!draft ? <span className="muted small">Read only. Corrections go on a credit note.</span> : null}
            </div>
            <div className="f-card-pad stack-sm" style={{ gap: 12 }}>
              {draft && canEdit ? (
                <div className="f-actions">
                  <ActionForm
                    inline
                    action={issueInvoiceAction}
                    hidden={{ id: inv.id }}
                    submitLabel="Mark as issued"
                    pendingText="Issuing"
                    variant="accent"
                    size="md"
                    confirm="This takes the next invoice number and makes the invoice read only. Continue?"
                  >
                    <label className="sr-only" htmlFor="issue-date">
                      Issue date
                    </label>
                    <Input id="issue-date" name="issue_date" type="date" defaultValue={today} max={today} style={{ width: 170 }} />
                  </ActionForm>
                  <ActionForm inline action={deleteInvoiceDraftAction} hidden={{ id: inv.id }} submitLabel="Delete draft" variant="ghost" size="md" confirm="Delete this draft?" />
                </div>
              ) : null}
              {draft && !canEdit ? <div className="f-lock-box">You can view this draft. Editing invoices needs an admin or account manager.</div> : null}
              {(inv.state === 'open' || inv.state === 'late') && canEdit ? (
                <div className="f-actions">
                  <ActionForm inline action={invoiceStateAction} hidden={{ id: inv.id, to: 'paid' }} submitLabel="Mark paid" variant="primary" size="md">
                    <label className="sr-only" htmlFor="paid-on">
                      Paid on
                    </label>
                    <Input id="paid-on" name="paid_on" type="date" defaultValue={today} max={today} style={{ width: 170 }} />
                  </ActionForm>
                  {inv.state === 'open' && late > 0 ? (
                    <ActionForm inline action={invoiceStateAction} hidden={{ id: inv.id, to: 'late' }} submitLabel="Mark late" variant="secondary" size="md" />
                  ) : null}
                  {inv.state === 'late' ? <ActionForm inline action={invoiceStateAction} hidden={{ id: inv.id, to: 'open' }} submitLabel="Back to open" variant="secondary" size="md" /> : null}
                </div>
              ) : null}
              {(inv.state === 'open' || inv.state === 'late') && canEdit ? (
                <ActionForm inline action={invoiceStateAction} hidden={{ id: inv.id, to: 'void' }} submitLabel="Void" variant="danger" size="sm" confirm="Void this invoice? Its number stays used.">
                  <label className="sr-only" htmlFor="void-reason">
                    Reason
                  </label>
                  <Input id="void-reason" name="reason" placeholder="Why it is voided" required style={{ width: 240 }} />
                </ActionForm>
              ) : null}
              {!draft && !canEdit && inv.state !== 'paid' && inv.state !== 'void' ? <div className="f-lock-box">Only an admin can mark this invoice paid, late or void.</div> : null}
              {canCredit ? (
                <ActionForm inline action={createCreditNoteAction} hidden={{ id: inv.id }} submitLabel="Draft a credit note" variant="secondary" size="sm" confirm="Draft a credit note that reverses every line? You can edit it before issuing." />
              ) : null}
              {inv.state === 'void' ? <div className="f-lock-box">Voided. The number stays in the series and is not reused.</div> : null}
            </div>
          </section>

          <section className="card" aria-labelledby="lines-h">
            <div className="f-card-head-row">
              <h2 id="lines-h" className="f-card-title">
                Lines
              </h2>
              <span className="muted small">{labelOf(VAT_TREATMENT_OPTIONS, inv.vat_treatment)}</span>
            </div>
            <div className="table-wrap">
              <table className="table" style={{ minWidth: 640 }}>
                <caption className="sr-only">Invoice lines</caption>
                <thead>
                  <tr>
                    <th scope="col">Line</th>
                    <th scope="col" className="num">
                      Qty
                    </th>
                    <th scope="col" className="num">
                      Price
                    </th>
                    <th scope="col" className="num">
                      Discount
                    </th>
                    <th scope="col" className="num">
                      VAT
                    </th>
                    <th scope="col" className="num">
                      Net
                    </th>
                    {editDraft ? (
                      <th scope="col">
                        <span className="sr-only">Actions</span>
                      </th>
                    ) : null}
                  </tr>
                </thead>
                <tbody>
                  {lines.length === 0 ? (
                    <tr>
                      <td colSpan={editDraft ? 7 : 6} className="muted">
                        No lines yet. Add one below.
                      </td>
                    </tr>
                  ) : null}
                  {lines.map((l, i) => (
                    <tr key={l.id}>
                      <td>
                        {l.name}
                        {l.description ? <div className="muted small">{l.description}</div> : null}
                      </td>
                      <td className="num">{Number(l.quantity)}</td>
                      <td className="num">{formatMoney(l.unit_price, cur, 2)}</td>
                      <td className="num">{Number(l.discount_pct) ? formatPercent(Number(l.discount_pct)) : ''}</td>
                      <td className="num">{formatPercent(totals.lines[i].rate)}</td>
                      <td className="num">{formatMoney(totals.lines[i].net, cur, 2)}</td>
                      {editDraft ? (
                        <td>
                          <ActionForm inline action={removeInvoiceLineAction} hidden={{ invoiceId: inv.id, lineId: l.id }} submitLabel="Remove" variant="ghost" size="xs" />
                        </td>
                      ) : null}
                    </tr>
                  ))}
                </tbody>
                <tbody className="f-totals">
                  <tr className="f-total-row">
                    <td colSpan={5} className="num muted" style={{ fontFamily: 'inherit' }}>
                      Subtotal excl. VAT
                    </td>
                    <td className="num">{formatMoney(totals.subtotal, cur, 2)}</td>
                    {editDraft ? <td /> : null}
                  </tr>
                  {totals.vatByRate.map((r) => (
                    <tr key={r.rate}>
                      <td colSpan={5} className="num muted" style={{ fontFamily: 'inherit' }}>
                        {r.label} on {formatMoney(r.base, cur, 2)}
                      </td>
                      <td className="num">{formatMoney(r.vat, cur, 2)}</td>
                      {editDraft ? <td /> : null}
                    </tr>
                  ))}
                  <tr className="f-total-row">
                    <td colSpan={5} className="num" style={{ fontFamily: 'inherit' }}>
                      Total
                    </td>
                    <td className="num">{formatMoney(totals.total, cur, 2)}</td>
                    {editDraft ? <td /> : null}
                  </tr>
                </tbody>
              </table>
            </div>
            {totals.note ? (
              <div className="f-card-pad">
                <div className="f-note-box">
                  The invoice says &quot;{totals.note}&quot;.
                  {inv.vat_treatment === 'reverse_charge' ? ` Customer VAT number ${inv.org_vat ?? 'missing, add it on the organization before issuing'}.` : ''}
                </div>
              </div>
            ) : null}
            {editDraft ? (
              <ActionForm action={addInvoiceLineAction} hidden={{ invoiceId: inv.id }} submitLabel="Add line" className="f-card-form" ariaLabel="Add a line">
                <div className="f-fields">
                  <Field label="Product" htmlFor="li-product" hint="Fills name, price and VAT, or leave it and type below">
                    <Select
                      id="li-product"
                      name="product_id"
                      placeholder="Free text line"
                      options={lk.productRows.map((p) => ({ value: p.id, label: `${p.name}, ${formatMoney(p.unit_price, p.currency, 2)}` }))}
                    />
                  </Field>
                  <Field label="Name" htmlFor="li-name" className="f-wide">
                    <Input id="li-name" name="name" placeholder="Website build" />
                  </Field>
                </div>
                <div className="f-fields">
                  <Field label="Description" htmlFor="li-desc" className="f-wide">
                    <Input id="li-desc" name="description" placeholder="Optional" />
                  </Field>
                  <Field label="Quantity" htmlFor="li-qty">
                    <Input id="li-qty" name="quantity" inputMode="decimal" className="mono" defaultValue={isCredit ? '-1' : '1'} />
                  </Field>
                  <Field label="Unit price" htmlFor="li-price">
                    <Input id="li-price" name="unit_price" inputMode="decimal" className="mono" placeholder="From product" />
                  </Field>
                  <Field label="Discount %" htmlFor="li-disc">
                    <Input id="li-disc" name="discount_pct" inputMode="decimal" className="mono" placeholder="0" />
                  </Field>
                  {dutch ? (
                    <Field label="VAT" htmlFor="li-rate">
                      <Select id="li-rate" name="tax_rate" options={NL_LINE_RATES} defaultValue={String(defaultLineRate(inv.vat_treatment))} />
                    </Field>
                  ) : null}
                </div>
              </ActionForm>
            ) : null}
          </section>

          <section aria-labelledby="tl-h" className="stack-sm">
            <h2 id="tl-h" className="section-label">
              Timeline
            </h2>
            <Timeline items={timeline} composer={{ action: addInvoiceNote, hidden: { invoiceId: inv.id }, placeholder: 'Add a note, for example a payment promise' }} />
          </section>
        </div>

        <aside className="record-right" aria-label="Linked records">
          {inv.organization_id ? (
            <LinkedRecords
              title="Bill to"
              href={`/organizations/${inv.organization_id}`}
              items={[{ title: inv.organization_name, sub: [inv.contact_name, inv.org_city].filter(Boolean).join(', ') || undefined, meta: inv.org_vat ? `VAT ${inv.org_vat}` : undefined }]}
            />
          ) : (
            <section className="rail-card">
              <h2 className="section-label">Bill to</h2>
              <div className="danger text-13">No organization yet. Pick one before issuing.</div>
            </section>
          )}
          {inv.deal_id ? <LinkedRecords title="Deal" href={`/deals/${inv.deal_id}`} items={[{ title: inv.deal_name }]} /> : null}
          {inv.project_id ? <LinkedRecords title="Project" href={`/projects/${inv.project_id}`} items={[{ title: inv.project_name }]} /> : null}
          {inv.credit_of_invoice_id ? (
            <LinkedRecords title="Corrects" href={`/invoices/${inv.credit_of_invoice_id}`} items={[{ title: inv.credit_of_number ?? 'Original invoice' }]} />
          ) : null}
          {credits.length ? (
            <LinkedRecords
              title="Credit notes"
              items={credits.map((c) => ({
                title: c.external_number ?? 'Draft credit note',
                href: `/invoices/${c.id}`,
                meta: c.total ? formatMoney(c.total, c.currency, 2) : undefined,
                status: { text: labelOf(INVOICE_STATES, c.state), tone: toneOf(INVOICE_TONES, c.state) },
              }))}
            />
          ) : null}
          <Link href="/invoices?view=ageing" className="small">
            Ageing view
          </Link>
        </aside>
      </div>

      <article className="f-print-doc" aria-hidden="true">
        <div className="row-between" style={{ alignItems: 'flex-start' }}>
          <div>
            <h1>{isCredit ? 'Credit note' : 'Invoice'}</h1>
            <div>{inv.external_number ?? 'Draft, not numbered'}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <strong>Astra Agency</strong>
          </div>
        </div>
        <div className="f-print-parties">
          <div>
            <div className="muted">Bill to</div>
            <strong>{inv.organization_name ?? ''}</strong>
            {inv.contact_name ? <div>Attn. {inv.contact_name}</div> : null}
            {inv.org_address ? <div>{inv.org_address}</div> : null}
            {inv.org_city || inv.org_country ? <div>{[inv.org_city, inv.org_country].filter(Boolean).join(', ')}</div> : null}
            {inv.org_vat ? <div>VAT {inv.org_vat}</div> : null}
            {inv.org_kvk ? <div>KVK {inv.org_kvk}</div> : null}
          </div>
          <div>
            <div>Issue date {inv.issue_date ? formatDateLong(inv.issue_date) : 'not issued'}</div>
            {inv.due_date ? <div>Due date {formatDateLong(inv.due_date)}</div> : null}
            {inv.credit_of_number ? <div>Corrects invoice {inv.credit_of_number}</div> : null}
          </div>
        </div>
        <p>{inv.title}</p>
        <table>
          <thead>
            <tr>
              <th>Description</th>
              <th className="num">Qty</th>
              <th className="num">Price</th>
              <th className="num">VAT</th>
              <th className="num">Amount</th>
            </tr>
          </thead>
          <tbody>
            {lines.map((l, i) => (
              <tr key={l.id}>
                <td>
                  {l.name}
                  {l.description ? <div>{l.description}</div> : null}
                  {Number(l.discount_pct) ? <div>Discount {formatPercent(Number(l.discount_pct))}</div> : null}
                </td>
                <td className="num">{Number(l.quantity)}</td>
                <td className="num">{formatMoney(l.unit_price, cur, 2)}</td>
                <td className="num">{formatPercent(totals.lines[i].rate)}</td>
                <td className="num">{formatMoney(totals.lines[i].net, cur, 2)}</td>
              </tr>
            ))}
            <tr>
              <td colSpan={4} className="num">
                Subtotal
              </td>
              <td className="num">{formatMoney(totals.subtotal, cur, 2)}</td>
            </tr>
            {totals.vatByRate.map((r) => (
              <tr key={r.rate}>
                <td colSpan={4} className="num">
                  {r.label} on {formatMoney(r.base, cur, 2)}
                </td>
                <td className="num">{formatMoney(r.vat, cur, 2)}</td>
              </tr>
            ))}
            <tr>
              <td colSpan={4} className="num">
                <strong>Total</strong>
              </td>
              <td className="num">
                <strong>{formatMoney(totals.total, cur, 2)}</strong>
              </td>
            </tr>
          </tbody>
        </table>
        {totals.note ? <p><strong>{totals.note}</strong></p> : null}
        {inv.notes ? <p>{inv.notes}</p> : null}
      </article>
    </>
  );
}
