/**
 * /contacts (agent A). Search by name and email, filters (owner, lifecycle,
 * privacy), sortable columns, pagination and a CSV export of the filtered view.
 */
import Link from 'next/link';
import { requireUser } from '@/lib/auth';
import { can } from '@/lib/permissions';
import { formatAgo } from '@/lib/format';
import { labelOf, LIFECYCLE_STAGES, LIFECYCLE_TONES, toneOf } from '@/lib/options';
import { listContacts, PAGE_SIZE, parseContactParams, userOptions, getOrganization, type ContactListRow } from '@/lib/orgs/queries';
import { PageHeader } from '@/components/ui/PageHeader';
import { Table, sortHrefFor, type Column } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { EmptyState } from '@/components/ui/EmptyState';
import { FilterBar } from '@/components/orgs/FilterBar';
import { Pager } from '@/components/orgs/Pager';
import { CreateRecordButton } from '@/components/orgs/CreateRecordButton';
import styles from '@/components/orgs/orgs.module.css';

export const metadata = { title: 'Contacts' };

type SP = Record<string, string | string[] | undefined>;

function flat(sp: SP): Record<string, string | undefined> {
  return Object.fromEntries(Object.entries(sp).map(([k, v]) => [k, Array.isArray(v) ? v[0] : v]));
}

const PRIVACY = [
  { value: 'ok', label: 'Can be contacted' },
  { value: 'dnc', label: 'Do not contact' },
];

export default async function ContactsPage({ searchParams }: { searchParams: Promise<SP> }) {
  const user = await requireUser();
  const sp = await searchParams;
  const params = parseContactParams(sp);
  const [{ rows, total }, users, orgFilter] = await Promise.all([
    listContacts(params),
    userOptions(),
    params.org ? getOrganization(params.org) : Promise.resolve(null),
  ]);
  const userOpts = [...users.map((u) => ({ value: u.value, label: u.label })), { value: 'none', label: 'Nobody' }];
  const values = flat(sp);
  const exportQuery = new URLSearchParams(Object.entries(values).filter(([k, v]) => v && k !== 'page') as [string, string][]).toString();

  const columns: Column<ContactListRow>[] = [
    {
      key: 'name',
      label: 'Name',
      sortable: true,
      render: (c) => (
        <>
          <Link className="cell-link" href={`/contacts/${c.id}`}>
            {c.full_name}
          </Link>
          {c.do_not_contact ? <span className={styles.cellSub}><Badge tone="red">Do not contact</Badge></span> : null}
        </>
      ),
    },
    { key: 'email', label: 'Email', sortable: true, render: (c) => c.email ?? <span className="muted">None</span> },
    {
      key: 'organization',
      label: 'Organization',
      sortable: true,
      render: (c) => (c.org_id ? <Link href={`/organizations/${c.org_id}`}>{c.org_name}</Link> : <span className="muted">None</span>),
    },
    { key: 'job_title', label: 'Job title', sortable: true, render: (c) => c.job_title ?? '' },
    { key: 'lifecycle', label: 'Lifecycle', render: (c) => <Badge tone={toneOf(LIFECYCLE_TONES, c.lifecycle_stage)}>{labelOf(LIFECYCLE_STAGES, c.lifecycle_stage)}</Badge> },
    { key: 'owner', label: 'Owner', sortable: true, render: (c) => c.owner_name ?? <span className="muted">None</span> },
    { key: 'last_activity', label: 'Last activity', sortable: true, render: (c) => (c.last_activity_at ? <span className="nowrap">{formatAgo(c.last_activity_at)}</span> : <span className="muted">Never</span>) },
  ];

  const filtered = Boolean(params.q || params.owner || params.lifecycle || params.privacy || params.org);

  return (
    <div className="page page-wide">
      <PageHeader
        title="Contacts"
        subtitle={
          orgFilter ? (
            <>
              People with a role at <Link href={`/organizations/${orgFilter.id}`}>{orgFilter.name}</Link>, now or before
            </>
          ) : (
            'Everyone we know by name. Unique on email and on LinkedIn profile.'
          )
        }
        actions={
          <>
            {can(user, 'export', 'contact') ? (
              <a className="btn btn-secondary" href={`/contacts/export${exportQuery ? `?${exportQuery}` : ''}`} download>
                Export CSV
              </a>
            ) : null}
            {can(user, 'create', 'contact') ? <CreateRecordButton kind="contact" autoOpen={values.new === '1'} /> : null}
          </>
        }
      />
      <FilterBar
        path="/contacts"
        values={values}
        searchPlaceholder="Name or email"
        keep={['org']}
        filters={[
          { name: 'owner', label: 'Owner', options: userOpts, allLabel: 'Anyone' },
          { name: 'lifecycle', label: 'Lifecycle', options: LIFECYCLE_STAGES, allLabel: 'Any stage' },
          { name: 'privacy', label: 'Privacy', options: PRIVACY, allLabel: 'Everyone' },
        ]}
      />
      <section className={`card ${styles.listCard}`} aria-label="Contacts">
        <Table
          columns={columns}
          rows={rows}
          rowKey={(c) => c.id}
          sort={{ key: params.sort, dir: params.dir }}
          sortHref={sortHrefFor('/contacts', sp)}
          rowClassName={(c) => (c.do_not_contact ? 'is-muted' : undefined)}
          minWidth={940}
          caption="Contacts"
          empty={
            <EmptyState
              title={filtered ? 'No contacts match these filters' : 'No contacts yet'}
              body={filtered ? 'Try part of the name or the email domain, or clear the filters.' : 'Create one, or import a CSV in Settings.'}
            />
          }
        />
        <Pager path="/contacts" params={values} page={params.page} pageSize={PAGE_SIZE} total={total} noun={['contact', 'contacts']} />
      </section>
    </div>
  );
}
