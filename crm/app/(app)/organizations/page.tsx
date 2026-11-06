/**
 * /organizations (agent A). Search, filters (owner, account manager, industry,
 * lifecycle), sortable columns, pagination and a CSV export of the filtered view.
 */
import Link from 'next/link';
import { requireUser } from '@/lib/auth';
import { can } from '@/lib/permissions';
import { formatAgo, formatMoney } from '@/lib/format';
import { labelOf, LIFECYCLE_STAGES, LIFECYCLE_TONES, toneOf } from '@/lib/options';
import { industryOptions, listOrganizations, PAGE_SIZE, parseOrgParams, userOptions, type OrgListRow } from '@/lib/orgs/queries';
import { PageHeader } from '@/components/ui/PageHeader';
import { Table, sortHrefFor, type Column } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { EmptyState } from '@/components/ui/EmptyState';
import { FilterBar } from '@/components/orgs/FilterBar';
import { Pager } from '@/components/orgs/Pager';
import { CreateRecordButton } from '@/components/orgs/CreateRecordButton';
import styles from '@/components/orgs/orgs.module.css';

export const metadata = { title: 'Organizations' };

type SP = Record<string, string | string[] | undefined>;

function flat(sp: SP): Record<string, string | undefined> {
  return Object.fromEntries(Object.entries(sp).map(([k, v]) => [k, Array.isArray(v) ? v[0] : v]));
}

export default async function OrganizationsPage({ searchParams }: { searchParams: Promise<SP> }) {
  const user = await requireUser();
  const sp = await searchParams;
  const params = parseOrgParams(sp);
  const [{ rows, total }, users, industries] = await Promise.all([listOrganizations(params), userOptions(), industryOptions()]);
  const userOpts = [...users.map((u) => ({ value: u.value, label: u.label })), { value: 'none', label: 'Nobody' }];
  const values = flat(sp);
  const exportQuery = new URLSearchParams(Object.entries(values).filter(([k, v]) => v && k !== 'page') as [string, string][]).toString();

  const columns: Column<OrgListRow>[] = [
    {
      key: 'name',
      label: 'Name',
      sortable: true,
      render: (o) => (
        <>
          <Link className="cell-link" href={`/organizations/${o.id}`}>
            {o.name}
          </Link>
          {o.city || o.country ? <span className={styles.cellSub}>{[o.city, o.country].filter(Boolean).join(', ')}</span> : null}
        </>
      ),
    },
    { key: 'domain', label: 'Domain', sortable: true, render: (o) => (o.domain ? <span>{o.domain}{o.domains.length > 1 ? <span className="muted"> +{o.domains.length - 1}</span> : null}</span> : <span className="muted">None</span>) },
    { key: 'industry', label: 'Industry', sortable: true, render: (o) => o.industry ?? '' },
    {
      key: 'lifecycle',
      label: 'Lifecycle',
      sortable: true,
      render: (o) => (
        <span className="row" style={{ gap: 4 }}>
          <Badge tone={toneOf(LIFECYCLE_TONES, o.lifecycle_stage)}>{labelOf(LIFECYCLE_STAGES, o.lifecycle_stage)}</Badge>
          {o.do_not_contact ? <Badge tone="red">Do not contact</Badge> : null}
        </span>
      ),
    },
    { key: 'account_manager', label: 'Account manager', sortable: true, render: (o) => o.am_name ?? <span className="muted">None</span> },
    { key: 'owner', label: 'Owner', sortable: true, render: (o) => o.owner_name ?? <span className="muted">None</span> },
    {
      key: 'open_value',
      label: 'Open deals',
      sortable: true,
      num: true,
      render: (o) => (o.open_deal_count ? formatMoney(o.open_deal_value) : <span className="muted">0</span>),
    },
    { key: 'last_activity', label: 'Last activity', sortable: true, render: (o) => (o.last_activity_at ? <span className="nowrap">{formatAgo(o.last_activity_at)}</span> : <span className="muted">Never</span>) },
  ];

  const filtered = Boolean(params.q || params.owner || params.am || params.industry || params.lifecycle);

  return (
    <div className="page page-wide">
      <PageHeader
        title="Organizations"
        subtitle="Every company we work with or talk to. Unique on every domain they own."
        actions={
          <>
            {can(user, 'export', 'organization') ? (
              <a className="btn btn-secondary" href={`/organizations/export${exportQuery ? `?${exportQuery}` : ''}`} download>
                Export CSV
              </a>
            ) : null}
            {can(user, 'create', 'organization') ? <CreateRecordButton kind="organization" autoOpen={values.new === '1'} /> : null}
          </>
        }
      />
      <FilterBar
        path="/organizations"
        values={values}
        searchPlaceholder="Name or domain"
        filters={[
          { name: 'owner', label: 'Owner', options: userOpts, allLabel: 'Anyone' },
          { name: 'am', label: 'Account manager', options: userOpts, allLabel: 'Anyone' },
          { name: 'industry', label: 'Industry', options: industries, allLabel: 'Any industry' },
          { name: 'lifecycle', label: 'Lifecycle', options: LIFECYCLE_STAGES, allLabel: 'Any stage' },
        ]}
      />
      <section className={`card ${styles.listCard}`} aria-label="Organizations">
        <Table
          columns={columns}
          rows={rows}
          rowKey={(o) => o.id}
          sort={{ key: params.sort, dir: params.dir }}
          sortHref={sortHrefFor('/organizations', sp)}
          minWidth={980}
          caption="Organizations"
          empty={
            <EmptyState
              title={filtered ? 'No organizations match these filters' : 'No organizations yet'}
              body={filtered ? 'Try a shorter search or clear the filters.' : 'Create one, or import a CSV in Settings.'}
            />
          }
        />
        <Pager path="/organizations" params={values} page={params.page} pageSize={PAGE_SIZE} total={total} noun={['organization', 'organizations']} />
      </section>
    </div>
  );
}
