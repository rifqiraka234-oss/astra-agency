import Link from 'next/link';
import '@/components/delivery/f.css';
import { requireUser } from '@/lib/auth';
import { can } from '@/lib/permissions';
import { formatDate, formatMoney, sumMoney, todayKey } from '@/lib/format';
import { INVOICE_STATES, INVOICE_TONES, labelOf, toneOf } from '@/lib/options';
import { listInvoices, type InvoiceListRow } from '@/lib/money/invoices';
import { AGEING_BUCKETS, ageingBucket, daysLate, isReceivable, type AgeingBucket } from '@/lib/money/ageing';
import { VAT_TREATMENT_OPTIONS } from '@/lib/money/vat';
import { lookups } from '@/lib/delivery/lookups';
import { Badge, EmptyState, PageHeader, Segmented, Table } from '@/components/ui';
import { FilterBar } from '@/components/delivery/FilterBar';
import { CreateLauncher } from '@/components/delivery/CreateLauncher';
import { createInvoiceAction } from './actions';

export const metadata = { title: 'Invoices' };

type SP = Record<string, string | string[] | undefined>;
const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) || null;

/** Totals per currency, EUR first: '€4,658.50' or '€4,658.50 and $120'. */
function totalText(rows: InvoiceListRow[]): string {
  const by = new Map<string, string[]>();
  for (const r of rows) by.set(r.currency, [...(by.get(r.currency) ?? []), r.total ?? '0']);
  if (by.size === 0) return formatMoney('0', 'EUR');
  return [...by.entries()]
    .sort(([a], [b]) => (a === 'EUR' ? -1 : b === 'EUR' ? 1 : a.localeCompare(b)))
    .map(([cur, vals]) => formatMoney(sumMoney(vals), cur))
    .join(' and ');
}

export default async function InvoicesPage({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  const user = await requireUser();
  const view = one(sp.view) === 'ageing' ? 'ageing' : 'all';
  const bucket = one(sp.bucket) as AgeingBucket | null;
  const stateF = one(sp.state);
  const orgF = one(sp.org);
  const [all, lk] = await Promise.all([listInvoices(), lookups(['orgs', 'contacts', 'deals', 'projects'])]);
  const today = todayKey();

  const byOrg = orgF ? all.filter((r) => r.organization_id === orgF) : all;
  const receivable = byOrg.filter((r) => isReceivable(r.state));
  const buckets = AGEING_BUCKETS.map((b) => {
    const rows = receivable.filter((r) => ageingBucket(r.due_date, today) === b.value);
    return { ...b, rows, total: totalText(rows) };
  });
  const drafts = byOrg.filter((r) => r.state === 'draft');
  const year = today.slice(0, 4);
  const paidThisYear = byOrg.filter((r) => r.state === 'paid' && r.paid_at && new Date(r.paid_at).getFullYear() === Number(year));

  let rows: InvoiceListRow[];
  if (view === 'ageing') {
    rows = (bucket ? receivable.filter((r) => ageingBucket(r.due_date, today) === bucket) : receivable).sort(
      (a, b) => daysLate(b.due_date, today) - daysLate(a.due_date, today),
    );
  } else {
    rows = stateF ? byOrg.filter((r) => r.state === stateF) : byOrg;
  }

  const presetProject = one(sp.project);
  const presetOrg = one(sp.organization);
  const presetDeal = one(sp.deal);
  const baseQs = (extra: Record<string, string | null>) => {
    const q = new URLSearchParams();
    for (const [k, v] of Object.entries({ org: orgF, ...extra })) if (v) q.set(k, v);
    const s = q.toString();
    return s ? `/invoices?${s}` : '/invoices';
  };

  return (
    <div className="page page-wide">
      <PageHeader
        title="Invoices"
        subtitle="Drafted and numbered here in V1, Moneybird takes over numbering and sending in V2. Issued invoices are read only, correct them with a credit note."
        actions={
          can(user, 'create', 'invoice') ? (
            <CreateLauncher
              label="Draft invoice"
              title="Draft invoice"
              initialOpen={one(sp.new) === '1'}
              action={createInvoiceAction}
              submitLabel="Create draft"
              intro={<p className="muted text-13" style={{ margin: 0 }}>It gets its number when you mark it as issued. Leave VAT empty to pick it from the organization's country.</p>}
              fields={[
                { name: 'title', label: 'What it is for', required: true, placeholder: 'Website rebuild, final 50%' },
                { name: 'organization_id', label: 'Organization', type: 'select', options: lk.orgs, defaultValue: presetOrg ?? undefined, width: 'half' },
                { name: 'contact_id', label: 'Billing contact', type: 'select', options: lk.contacts, width: 'half' },
                { name: 'project_id', label: 'Project', type: 'select', options: lk.projects, defaultValue: presetProject ?? undefined, width: 'half' },
                { name: 'deal_id', label: 'Deal', type: 'select', options: lk.deals, defaultValue: presetDeal ?? undefined, width: 'half' },
                { name: 'vat_treatment', label: 'VAT', type: 'select', options: VAT_TREATMENT_OPTIONS, placeholder: 'From the country', width: 'half' },
                { name: 'due_date', label: 'Due', type: 'date', width: 'half', hint: '14 days after issue when empty' },
              ]}
            />
          ) : null
        }
      />

      <div className="f-tiles" aria-label="Ageing">
        {buckets.map((b) => (
          <Link
            key={b.value}
            href={baseQs({ view: 'ageing', bucket: b.value })}
            className="stat"
            aria-current={view === 'ageing' && bucket === b.value ? 'true' : undefined}
          >
            <span className="stat-label">{b.label}</span>
            <span className={`stat-value ${b.value !== 'current' && b.rows.length ? 'danger' : ''}`}>{b.total}</span>
            <span className="stat-sub">
              {b.rows.length} {b.rows.length === 1 ? 'invoice' : 'invoices'}
            </span>
          </Link>
        ))}
        <div className="stat">
          <span className="stat-label">Outstanding</span>
          <span className="stat-value">{totalText(receivable)}</span>
          <span className="stat-sub">
            Drafts {totalText(drafts)}, paid in {year} {totalText(paidThisYear)}
          </span>
        </div>
      </div>

      <div className="f-toolbar">
        <Segmented
          label="View"
          value={view}
          items={[
            { value: 'all', label: 'All invoices', href: baseQs({}) },
            { value: 'ageing', label: 'Ageing', href: baseQs({ view: 'ageing' }) },
          ]}
        />
        <FilterBar
          path="/invoices"
          params={sp}
          keep={['view', 'bucket']}
          filters={[
            ...(view === 'all' ? [{ name: 'state', label: 'Status', options: INVOICE_STATES }] : []),
            { name: 'org', label: 'Organization', options: lk.orgs },
          ]}
        />
      </div>

      <div className="card">
        <Table
          caption={view === 'ageing' ? 'Unpaid invoices by days late' : 'Invoices'}
          rows={rows}
          rowKey={(r) => r.id}
          minWidth={860}
          rowClassName={(r) => (r.state === 'void' || r.state === 'paid' ? 'is-muted' : undefined)}
          empty={<EmptyState title={view === 'ageing' ? 'Nothing outstanding here' : 'No invoices match'} body={view === 'ageing' ? 'Every issued invoice in this range is paid.' : 'Draft one from a project, a deal or with Draft invoice.'} />}
          columns={[
            {
              key: 'number',
              label: 'Number',
              render: (r) => (
                <Link className="cell-link mono" href={`/invoices/${r.id}`}>
                  {r.external_number ?? (r.kind === 'credit_note' ? 'Draft credit note' : 'Draft')}
                </Link>
              ),
            },
            {
              key: 'for',
              label: 'For',
              render: (r) => (
                <div className="stack-sm" style={{ gap: 2 }}>
                  <span>{r.title ?? 'Untitled'}</span>
                  {r.kind === 'credit_note' ? <span className="muted small">Credit note for {r.credit_of_number ?? 'an invoice'}</span> : r.project_name ? <span className="muted small">{r.project_name}</span> : null}
                </div>
              ),
            },
            { key: 'org', label: 'Organization', render: (r) => (r.organization_id ? <Link href={`/organizations/${r.organization_id}`}>{r.organization_name}</Link> : <span className="muted">None</span>) },
            { key: 'total', label: 'Total incl. VAT', num: true, render: (r) => formatMoney(r.total ?? '0', r.currency, 2) },
            {
              key: 'state',
              label: 'Status',
              render: (r) => (
                <Badge tone={toneOf(INVOICE_TONES, r.state)}>
                  {r.state === 'paid' && r.paid_at ? `Paid ${formatDate(r.paid_at)}` : labelOf(INVOICE_STATES, r.state)}
                </Badge>
              ),
            },
            {
              key: 'due',
              label: view === 'ageing' ? 'Days late' : 'Due',
              render: (r) => {
                const late = isReceivable(r.state) ? daysLate(r.due_date, today) : 0;
                if (view === 'ageing') return <span className={`mono ${late ? 'danger' : ''}`}>{late ? `${late} days` : `Due ${formatDate(r.due_date)}`}</span>;
                return (
                  <span className={`mono nowrap ${late ? 'danger' : ''}`}>
                    {formatDate(r.due_date)}
                    {late ? `, ${late} days late` : ''}
                  </span>
                );
              },
            },
          ]}
        />
      </div>
    </div>
  );
}
