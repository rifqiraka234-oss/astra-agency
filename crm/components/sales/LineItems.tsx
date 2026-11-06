'use client';
/**
 * Line items and the quote of a deal (Deal design, middle column). Edit lines
 * inline (product, quantity, unit price, discount, VAT rate), see the subtotal
 * and VAT 21% NL, draft a quote version from the lines and move its status.
 * The deal amount follows the subtotal while the deal has lines.
 */
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { lineNet, lineTotals, rateLabel } from '@/lib/sales/totals';
import { formatDate, formatMoney } from '@/lib/format';
import type { SalesResult } from '@/lib/sales/fields';
import { Badge, Button, Field, Input, Select } from '@/components/ui';
import {
  addLineItemAction, createQuoteAction, deleteLineItemAction, updateLineItemAction, updateQuoteAction, type LineItemFormInput,
} from '@/app/(app)/deals/actions';
import styles from './sales.module.css';

export type Line = {
  id: string;
  product_id: string | null;
  name: string;
  description: string | null;
  quantity: string;
  unit_price: string;
  discount_pct: string;
  tax_rate: string;
  billing_frequency: string;
  currency: string;
};

export type Quote = {
  id: string;
  number: string | null;
  version: number;
  status: string;
  valid_until: string | null;
  sent_at: string | null;
  view_count: number;
  accepted_at: string | null;
};

export type Product = { id: string; name: string; unit_price: string; tax_rate: string; billing_frequency: string };

const QUOTE_STATUSES = [
  { value: 'draft', label: 'Draft' },
  { value: 'sent', label: 'Sent' },
  { value: 'accepted', label: 'Accepted' },
  { value: 'declined', label: 'Declined' },
  { value: 'expired', label: 'Expired' },
];
const QUOTE_TONES: Record<string, 'grey' | 'blue' | 'green' | 'red' | 'amber'> = { draft: 'grey', sent: 'blue', accepted: 'green', declined: 'red', expired: 'amber' };
const FREQ: Record<string, string> = { one_time: '', monthly: 'per month', quarterly: 'per quarter', yearly: 'per year' };

const trimNum = (v: string) => (v.includes('.') ? v.replace(/\.?0+$/, '') : v);

function LineForm({
  initial,
  products,
  submitLabel,
  onSubmit,
  onCancel,
}: {
  initial?: Line;
  products: Product[];
  submitLabel: string;
  onSubmit: (input: LineItemFormInput) => Promise<SalesResult>;
  onCancel?: () => void;
}) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();
  const [productId, setProductId] = useState(initial?.product_id ?? '');
  const product = products.find((p) => p.id === productId);
  const [preview, setPreview] = useState({
    quantity: initial ? trimNum(initial.quantity) : '1',
    unit_price: initial ? trimNum(initial.unit_price) : '',
    discount_pct: initial ? trimNum(initial.discount_pct) : '0',
    tax_rate: initial ? trimNum(initial.tax_rate) : '21',
  });
  let net = '';
  try {
    net = preview.unit_price ? formatMoney(lineNet({ ...preview, unit_price: preview.unit_price.replace(/[€\s,]/g, '') })) : '';
  } catch {
    net = '';
  }
  const set = (k: keyof typeof preview) => (e: React.ChangeEvent<HTMLInputElement>) => setPreview((p) => ({ ...p, [k]: e.target.value }));
  const idp = initial?.id ?? 'new';

  return (
    <form
      className={styles.lineForm}
      aria-label={initial ? `Edit ${initial.name}` : 'Add a line item'}
      onSubmit={(e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const fd = new FormData(form);
        const input: LineItemFormInput = {
          productId: productId || null,
          name: String(fd.get('name') ?? ''),
          description: String(fd.get('description') ?? ''),
          quantity: String(fd.get('quantity') ?? ''),
          unitPrice: String(fd.get('unit_price') ?? ''),
          discountPct: String(fd.get('discount_pct') ?? ''),
          taxRate: String(fd.get('tax_rate') ?? ''),
        };
        if (!input.name && !productId) {
          setErrors({ name: 'Give the line a name or pick a product' });
          return;
        }
        start(async () => {
          const res = await onSubmit(input);
          if (res.ok) {
            setErrors({});
            setError(null);
            if (!initial) {
              form.reset();
              setProductId('');
              setPreview({ quantity: '1', unit_price: '', discount_pct: '0', tax_rate: '21' });
            }
            return;
          }
          setErrors(res.fieldErrors ?? {});
          setError(res.error);
        });
      }}
    >
      {!initial && products.length ? (
        <Field label="Product" htmlFor={`li-${idp}-product`}>
          <Select
            id={`li-${idp}-product`}
            options={products.map((p) => ({ value: p.id, label: `${p.name}, ${formatMoney(p.unit_price)}` }))}
            placeholder="Custom line"
            value={productId}
            onChange={(e) => {
              setProductId(e.target.value);
              const p = products.find((x) => x.id === e.target.value);
              if (p) setPreview((v) => ({ ...v, unit_price: trimNum(p.unit_price), tax_rate: trimNum(p.tax_rate) }));
            }}
          />
        </Field>
      ) : null}
      <Field label="Line item" htmlFor={`li-${idp}-name`} error={errors.name} className={styles.lineFormWide}>
        <Input id={`li-${idp}-name`} name="name" defaultValue={initial?.name ?? ''} placeholder={product?.name ?? 'Booking flow with deposits'} maxLength={200} invalid={Boolean(errors.name)} />
      </Field>
      <Field label="Note" htmlFor={`li-${idp}-desc`} className={styles.lineFormWide}>
        <Input id={`li-${idp}-desc`} name="description" defaultValue={initial?.description ?? ''} maxLength={1000} />
      </Field>
      <Field label="Qty" htmlFor={`li-${idp}-qty`} error={errors.quantity}>
        <Input id={`li-${idp}-qty`} name="quantity" inputMode="decimal" className="mono" value={preview.quantity} onChange={set('quantity')} invalid={Boolean(errors.quantity)} />
      </Field>
      <Field label="Unit price" htmlFor={`li-${idp}-price`} error={errors.unitPrice}>
        <Input id={`li-${idp}-price`} name="unit_price" inputMode="decimal" className="mono" value={preview.unit_price} onChange={set('unit_price')} placeholder="6500" invalid={Boolean(errors.unitPrice)} />
      </Field>
      <Field label="Discount %" htmlFor={`li-${idp}-disc`} error={errors.discountPct}>
        <Input id={`li-${idp}-disc`} name="discount_pct" inputMode="decimal" className="mono" value={preview.discount_pct} onChange={set('discount_pct')} invalid={Boolean(errors.discountPct)} />
      </Field>
      <Field label="VAT %" htmlFor={`li-${idp}-vat`} error={errors.taxRate}>
        <Input id={`li-${idp}-vat`} name="tax_rate" inputMode="decimal" className="mono" value={preview.tax_rate} onChange={set('tax_rate')} invalid={Boolean(errors.taxRate)} />
      </Field>
      <div className="stack-sm" style={{ flex: '1 1 140px' }}>
        <span className="small muted">Line total {net ? <span className="mono">{net}</span> : null}</span>
        <div className="row" style={{ gap: 8 }}>
          <Button type="submit" size="sm" variant="primary" pending={pending} pendingText="Saving">
            {submitLabel}
          </Button>
          {onCancel ? (
            <Button size="sm" onClick={onCancel} disabled={pending}>
              Cancel
            </Button>
          ) : null}
        </div>
      </div>
      {error ? (
        <div className="form-error" role="alert" style={{ flex: '1 1 100%' }}>
          {error}
        </div>
      ) : null}
    </form>
  );
}

export function LineItems({
  dealId,
  lines,
  quotes,
  products,
  canEdit,
}: {
  dealId: string;
  lines: Line[];
  quotes: Quote[];
  products: Product[];
  canEdit: boolean;
}) {
  const router = useRouter();
  const [editing, setEditing] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();
  const totals = lineTotals(lines);
  const quote = quotes[0] ?? null;
  const currency = lines[0]?.currency ?? 'EUR';
  const money = (v: string) => formatMoney(v, currency);

  const run = (fn: () => Promise<SalesResult>) =>
    start(async () => {
      const res = await fn();
      if (!res.ok) setError(res.error);
      else {
        setError(null);
        router.refresh();
      }
    });

  const title = quote
    ? `Quote ${quote.number ?? `version ${quote.version}`}${quote.sent_at ? `, sent ${formatDate(quote.sent_at)}` : `, ${quote.status}`}`
    : 'Line items';

  return (
    <section aria-labelledby="li-h" className={styles.panel}>
      <div className={styles.panelHead}>
        <h2 id="li-h" className={styles.panelTitle}>
          {title}
        </h2>
        <div className="row" style={{ gap: 8 }}>
          {quote ? (
            <>
              <Badge tone={QUOTE_TONES[quote.status] ?? 'grey'}>
                {quote.status === 'sent' && quote.view_count ? `Viewed ${quote.view_count} ${quote.view_count === 1 ? 'time' : 'times'}` : QUOTE_STATUSES.find((s) => s.value === quote.status)?.label}
              </Badge>
              {quote.valid_until ? <span className="small muted">Valid until {formatDate(quote.valid_until)}</span> : null}
            </>
          ) : null}
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className={styles.lines}>
          <thead>
            <tr>
              <th scope="col">Line item</th>
              <th scope="col" className={styles.num}>
                Qty
              </th>
              <th scope="col" className={styles.num}>
                Price
              </th>
              <th scope="col" className={styles.num}>
                Discount
              </th>
              <th scope="col" className={styles.num}>
                VAT
              </th>
              <th scope="col" className={styles.num}>
                Total
              </th>
              {canEdit ? (
                <th scope="col">
                  <span className="sr-only">Actions</span>
                </th>
              ) : null}
            </tr>
          </thead>
          <tbody>
            {lines.length === 0 ? (
              <tr>
                <td colSpan={canEdit ? 7 : 6} className="muted">
                  No line items yet. Add what they would buy, the amount follows the subtotal.
                </td>
              </tr>
            ) : null}
            {lines.map((l) =>
              editing === l.id ? (
                <tr key={l.id}>
                  <td colSpan={canEdit ? 7 : 6} style={{ padding: 0 }}>
                    <LineForm
                      initial={l}
                      products={products}
                      submitLabel="Save line"
                      onCancel={() => setEditing(null)}
                      onSubmit={async (input) => {
                        const res = await updateLineItemAction(l.id, input);
                        if (res.ok) {
                          setEditing(null);
                          router.refresh();
                        }
                        return res;
                      }}
                    />
                  </td>
                </tr>
              ) : (
                <tr key={l.id}>
                  <td>
                    {l.name}
                    {l.description || FREQ[l.billing_frequency] ? (
                      <div className={styles.lineNote}>{[l.description, FREQ[l.billing_frequency]].filter(Boolean).join(', ')}</div>
                    ) : null}
                  </td>
                  <td className={styles.num}>{trimNum(l.quantity)}</td>
                  <td className={styles.num}>{money(l.unit_price)}</td>
                  <td className={styles.num}>{Number(l.discount_pct) ? `${trimNum(l.discount_pct)}%` : ''}</td>
                  <td className={styles.num}>{rateLabel(l.tax_rate)}</td>
                  <td className={styles.num}>{money(lineNet(l))}</td>
                  {canEdit ? (
                    <td className={styles.num}>
                      <div className="row" style={{ gap: 6, justifyContent: 'flex-end', flexWrap: 'nowrap' }}>
                        <button type="button" className={styles.iconBtn} onClick={() => setEditing(l.id)} aria-label={`Edit ${l.name}`}>
                          Edit
                        </button>
                        <button
                          type="button"
                          className={styles.iconBtn}
                          disabled={pending}
                          aria-label={`Remove ${l.name}`}
                          onClick={() => {
                            if (window.confirm(`Remove ${l.name}?`)) run(() => deleteLineItemAction(l.id));
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </td>
                  ) : null}
                </tr>
              ),
            )}
            <tr className={styles.sumRow}>
              <td colSpan={5} className={styles.sumLabel}>
                Subtotal excl. VAT
              </td>
              <td className={styles.num} style={{ fontWeight: 500 }}>
                {money(totals.subtotal)}
              </td>
              {canEdit ? <td /> : null}
            </tr>
            {totals.byRate.length === 0 ? (
              <tr>
                <td colSpan={5} className={styles.sumLabel} style={{ borderTop: 0 }}>
                  VAT 21%, NL
                </td>
                <td className={styles.num} style={{ borderTop: 0 }}>
                  {money('0')}
                </td>
                {canEdit ? <td style={{ borderTop: 0 }} /> : null}
              </tr>
            ) : (
              totals.byRate.map((r) => (
                <tr key={r.rate}>
                  <td colSpan={5} className={styles.sumLabel} style={{ borderTop: 0 }}>
                    VAT {rateLabel(r.rate)}
                    {Number(r.rate) === 21 ? ', NL' : ''}
                  </td>
                  <td className={styles.num} style={{ borderTop: 0 }}>
                    {money(r.vat)}
                  </td>
                  {canEdit ? <td style={{ borderTop: 0 }} /> : null}
                </tr>
              ))
            )}
            <tr>
              <td colSpan={5} className={styles.sumLabel} style={{ borderTop: 0 }}>
                Total incl. VAT
              </td>
              <td className={styles.num} style={{ borderTop: 0, fontWeight: 600 }}>
                {money(totals.total)}
              </td>
              {canEdit ? <td style={{ borderTop: 0 }} /> : null}
            </tr>
          </tbody>
        </table>
      </div>

      {canEdit && adding ? (
        <LineForm
          products={products}
          submitLabel="Add line"
          onCancel={() => setAdding(false)}
          onSubmit={async (input) => {
            const res = await addLineItemAction(dealId, input);
            if (res.ok) router.refresh();
            return res;
          }}
        />
      ) : null}

      {canEdit ? (
        <div className={styles.panelBody} style={{ borderTop: '1px solid var(--divider)' }}>
          <div className="row" style={{ gap: 8 }}>
            {!adding ? (
              <Button size="sm" onClick={() => setAdding(true)}>
                Add line item
              </Button>
            ) : null}
            <Button
              size="sm"
              disabled={pending || lines.length === 0}
              title={lines.length === 0 ? 'Add a line item first' : undefined}
              onClick={() => run(() => createQuoteAction(dealId, null))}
            >
              {quote ? 'New quote version from these lines' : 'Draft a quote from these lines'}
            </Button>
          </div>
          {quote ? <QuoteControls key={quote.id} quote={quote} onRun={run} pending={pending} /> : null}
          {quotes.length > 1 ? (
            <div className="small muted">
              Earlier versions{' '}
              {quotes
                .slice(1)
                .map((q) => `${q.number ?? `v${q.version}`} ${q.status}`)
                .join(', ')}
            </div>
          ) : null}
          {error ? (
            <div className="form-error" role="alert">
              {error}
            </div>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}

function QuoteControls({ quote, onRun, pending }: { quote: Quote; onRun: (fn: () => Promise<SalesResult>) => void; pending: boolean }) {
  const [status, setStatus] = useState(quote.status);
  const [valid, setValid] = useState(quote.valid_until ?? '');
  const dirty = status !== quote.status || valid !== (quote.valid_until ?? '');
  return (
    <form
      className="row"
      style={{ gap: 10, alignItems: 'flex-end' }}
      aria-label={`Quote ${quote.number ?? ''}`}
      onSubmit={(e) => {
        e.preventDefault();
        onRun(() => updateQuoteAction(quote.id, { status, validUntil: valid || null }));
      }}
    >
      <Field label={`Quote ${quote.number ?? ''}, version ${quote.version}`} htmlFor="q-status">
        <Select id="q-status" options={QUOTE_STATUSES} value={status} onChange={(e) => setStatus(e.target.value)} />
      </Field>
      <Field label="Valid until" htmlFor="q-valid">
        <Input id="q-valid" type="date" value={valid} onChange={(e) => setValid(e.target.value)} />
      </Field>
      <Button type="submit" size="sm" variant="primary" disabled={!dirty} pending={pending} pendingText="Saving">
        Save quote
      </Button>
    </form>
  );
}
