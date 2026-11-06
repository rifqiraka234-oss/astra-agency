/**
 * /organizations/[id] (agent A), the Organization design: header with domains,
 * badges and actions; properties with core and custom fields; tabs Timeline,
 * Contacts, Deals, Projects, Tickets, Invoices, Tasks; the right rail.
 * Deals, projects, tickets and invoices are read here and link to the pages
 * their owning agents build.
 */
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { requireUser } from '@/lib/auth';
import { can } from '@/lib/permissions';
import { getTimeline } from '@/lib/activities';
import { taskBuckets } from '@/lib/tasks';
import { customPropertyGroups, getFieldDefinitions, mergePropertyGroups, type PropertyGroup } from '@/lib/fields';
import { formatDate, formatMoney, formatRelativeDay, sumMoney } from '@/lib/format';
import {
  EMPLOYEE_BANDS, HEALTH, HEALTH_TONES, INDUSTRIES, INVOICE_STATES, INVOICE_TONES, LAWFUL_BASES, LIFECYCLE_STAGES, LIFECYCLE_TONES,
  PRIORITY_TONES, PROJECT_STATUSES, RELATIONSHIP_STATUSES, STAGE_STATE_TONES, TICKET_PRIORITIES, labelOf, toneOf, type Option,
} from '@/lib/options';
import {
  contactPickList, getOrganization, orgDeals, orgDomains, orgInvoices, orgProjects, orgRoles, orgTickets, userOptions,
  type DealRow, type InvoiceRow, type OrgRecord, type ProjectRow, type RoleRow, type TicketRow,
} from '@/lib/orgs/queries';
import { cadenceText, nextStepStatus, orgInitials, roleText, ticketStatus } from '@/lib/orgs/display';
import { RecordHeader, PropertiesPanel, Timeline, LinkedRecords } from '@/components/records';
import { Tabs } from '@/components/ui/Tabs';
import { Table, type Column } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { ButtonLink } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { RecordActions } from '@/components/orgs/RecordActions';
import { ListEditor } from '@/components/orgs/ListEditor';
import { AddContactToOrg, EndRoleButton } from '@/components/orgs/RoleControls';
import { TabCard, TasksTable } from '@/components/orgs/TabCard';
import styles from '@/components/orgs/orgs.module.css';
import {
  addDomainAction, addOrganizationNote, removeDomainAction, setPrimaryDomainAction, updateOrganizationProperties,
} from '../_actions';

const TABS = ['timeline', 'contacts', 'deals', 'projects', 'tickets', 'invoices', 'tasks'] as const;
type Tab = (typeof TABS)[number];

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const org = await getOrganization((await params).id);
  return { title: org?.name ?? 'Organization' };
}

function withValue(options: Option[], value: string | null): Option[] {
  return value && !options.some((o) => o.value === value) ? [...options, { value, label: value }] : options;
}

function propertyGroups(org: OrgRecord, users: Option[]): PropertyGroup[] {
  const lifetime = [
    Number(org.won_value) > 0 ? `${formatMoney(org.won_value)} won` : null,
    Number(org.paid_value) > 0 ? `${formatMoney(org.paid_value)} paid` : null,
  ].filter(Boolean).join(', ');
  const checkin = org.next_checkin_date
    ? [formatRelativeDay(org.next_checkin_date), cadenceText(org.checkin_cadence_days)].filter(Boolean).join(', ')
    : '';
  return [
    {
      name: 'About',
      fields: [
        { key: 'name', label: 'Name', type: 'text', value: org.name, display: org.name, required: true },
        { key: 'industry', label: 'Industry', type: 'select', value: org.industry, display: org.industry ?? '', options: withValue(INDUSTRIES, org.industry) },
        { key: 'employee_band', label: 'Employees', type: 'select', value: org.employee_band, display: labelOf(EMPLOYEE_BANDS, org.employee_band), options: EMPLOYEE_BANDS },
        { key: 'address', label: 'Address', type: 'text', value: org.address, display: org.address ?? '' },
        { key: 'city', label: 'City', type: 'text', value: org.city, display: org.city ?? '' },
        { key: 'country', label: 'Country', type: 'text', value: org.country, display: org.country ?? '', help: 'Two letter code like NL' },
        { key: 'kvk_number', label: 'KvK number', type: 'text', value: org.kvk_number, display: org.kvk_number ?? '', mono: true },
        { key: 'vat_number', label: 'VAT number', type: 'text', value: org.vat_number, display: org.vat_number ?? '', mono: true },
        { key: 'description', label: 'What they do', type: 'textarea', value: org.description, display: org.description ?? '' },
      ],
    },
    {
      name: 'Ownership',
      fields: [
        { key: 'owner_user_id', label: 'Record owner', type: 'select', value: org.owner_user_id, display: org.owner_name ?? '', options: users },
        { key: 'account_manager_user_id', label: 'Account manager', type: 'select', value: org.account_manager_user_id, display: org.am_name ?? '', options: users },
        { key: 'source', label: 'Source', type: 'text', value: org.source, display: [org.source, org.source ? formatDate(org.created_at) : null].filter(Boolean).join(', ') },
      ],
    },
    {
      name: 'Account',
      fields: [
        { key: 'lifecycle_stage', label: 'Lifecycle', type: 'select', value: org.lifecycle_stage, display: labelOf(LIFECYCLE_STAGES, org.lifecycle_stage), options: LIFECYCLE_STAGES, required: true, help: 'Moves forward on its own as deals progress' },
        { key: 'relationship_status', label: 'Relationship', type: 'select', value: org.relationship_status, display: labelOf(RELATIONSHIP_STATUSES, org.relationship_status), options: RELATIONSHIP_STATUSES, required: true },
        { key: 'customer_since', label: 'Customer since', type: 'readonly', value: null, display: org.customer_since ? formatDate(org.customer_since) : '', editable: false },
        { key: 'lifetime_value', label: 'Lifetime value', type: 'readonly', value: null, display: lifetime, editable: false, mono: true },
        { key: 'health', label: 'Health', type: 'select', value: org.health, display: labelOf(HEALTH, org.health), options: HEALTH },
        { key: 'next_checkin_date', label: 'Next check in', type: 'date', value: org.next_checkin_date, display: checkin },
        { key: 'checkin_cadence_days', label: 'Check in every (days)', type: 'number', value: org.checkin_cadence_days, display: org.checkin_cadence_days ? `${org.checkin_cadence_days} days` : '', mono: true },
        { key: 'renewal_date', label: 'Renewal', type: 'date', value: org.renewal_date, display: org.renewal_date ? formatDate(org.renewal_date) : '' },
      ],
    },
    {
      name: 'Privacy',
      fields: [
        { key: 'lawful_basis', label: 'Lawful basis', type: 'select', value: org.lawful_basis, display: labelOf(LAWFUL_BASES, org.lawful_basis), options: LAWFUL_BASES, required: true },
        { key: 'do_not_contact', label: 'Do not contact', type: 'checkbox', value: org.do_not_contact, display: org.do_not_contact ? 'Yes, every domain is suppressed' : 'No', help: 'Puts every domain of this organization on the suppression list' },
      ],
    },
  ];
}

export default async function OrganizationPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const user = await requireUser();
  const { id } = await params;
  const sp = await searchParams;
  const org = await getOrganization(id);
  if (!org) notFound();
  const tab: Tab = (TABS as readonly string[]).includes(String(sp.tab)) ? (sp.tab as Tab) : 'timeline';

  const [domains, roles, deals, projects, tickets, invoices, timeline, tasks, defs, users, pickContacts] = await Promise.all([
    orgDomains(org.id),
    orgRoles(org.id),
    orgDeals(org.id),
    orgProjects(org.id),
    orgTickets(org.id),
    orgInvoices(org.id),
    getTimeline('organization', org.id, { limit: 200 }),
    taskBuckets({ linked: { type: 'organization', id: org.id } }),
    getFieldDefinitions('organization'),
    userOptions(),
    contactPickList(org.id),
  ]);
  const userOpts = users.map((u) => ({ value: u.value, label: u.label }));
  const canEdit = can(user, 'edit', 'organization', org);
  const sample = org.custom?.sample === true || org.custom?.sample === 'true';
  const current = roles.filter((r) => r.is_current);
  const openDeals = deals.filter((d) => d.stage_state === 'open');
  const activeProjects = projects.filter((p) => p.status === 'active');
  const openTickets = tickets.filter((t) => t.stage_state === 'open' && !t.closed_at);
  const openTasks = [...tasks.overdue, ...tasks.today, ...tasks.week, ...tasks.later];
  const groups = mergePropertyGroups(propertyGroups(org, userOpts), customPropertyGroups(defs, org.custom, { users: users.map((u) => ({ id: u.value, name: u.label })), editable: canEdit }));
  const people: Option[] = current.map((r) => ({ value: r.contact_id, label: r.full_name }));
  const base = `/organizations/${org.id}`;

  const badges = [
    { label: labelOf(LIFECYCLE_STAGES, org.lifecycle_stage), tone: toneOf(LIFECYCLE_TONES, org.lifecycle_stage), strong: true },
    ...domains.map((d) => ({ label: d.domain_normalised })),
    ...(org.industry ? [{ label: org.industry }] : []),
    ...(org.city || org.country ? [{ label: [org.city, org.country].filter(Boolean).join(', ') }] : []),
    ...(org.do_not_contact ? [{ label: 'Do not contact', tone: 'red' as const }] : []),
  ];

  const tabItems = [
    { id: 'timeline', label: 'Timeline', count: timeline.length },
    { id: 'contacts', label: 'Contacts', count: roles.length },
    { id: 'deals', label: 'Deals', count: deals.length },
    { id: 'projects', label: 'Projects', count: projects.length },
    { id: 'tickets', label: 'Tickets', count: tickets.length },
    { id: 'invoices', label: 'Invoices', count: invoices.length },
    { id: 'tasks', label: 'Tasks', count: openTasks.length },
  ].map((t) => ({ ...t, href: t.id === 'timeline' ? base : `${base}?tab=${t.id}` }));

  return (
    <>
      <RecordHeader
        breadcrumb={[{ label: 'Organizations', href: '/organizations' }, { label: org.name }]}
        title={org.name}
        avatar={{ name: org.name, initials: orgInitials(org.name) }}
        badges={badges}
        sample={sample}
        actions={
          <RecordActions
            organizationId={org.id}
            people={people}
            users={userOpts}
            currentUserId={user.id}
            newDealHref={`/deals?new=1&organization=${org.id}`}
            emailBlocked={org.do_not_contact ? 'This organization is marked do not contact' : current.length ? null : 'Add a contact first'}
          />
        }
        tabs={<Tabs items={tabItems} active={tab} />}
      />
      <div className="record-body">
        <div className={styles.left}>
          <PropertiesPanel groups={groups} action={canEdit ? updateOrganizationProperties : undefined} hidden={{ id: org.id }} />
          <ListEditor
            title="Domains"
            items={domains.map((d) => ({ id: d.id, label: d.domain_normalised, primary: d.is_primary, href: `https://${d.domain_normalised}` }))}
            hidden={{ organizationId: org.id }}
            idName="domainId"
            addAction={addDomainAction}
            removeAction={removeDomainAction}
            primaryAction={setPrimaryDomainAction}
            input={{ name: 'domain', label: 'Add a domain', placeholder: 'Add a domain like dekade.com', inputMode: 'url' }}
            emptyText="No domains yet. Contacts with a matching email link here on their own."
            note="Unique across all organizations. Pasted links are cleaned to the domain. Free mail like gmail.com is refused."
            canEdit={canEdit}
          />
        </div>

        <section aria-label={tabItems.find((t) => t.id === tab)?.label} className="record-main">
          {tab === 'timeline' ? (
            <Timeline items={timeline} composer={{ action: addOrganizationNote, hidden: { organizationId: org.id } }} />
          ) : null}
          {tab === 'contacts' ? <ContactsTab org={org} roles={roles} contacts={pickContacts} canEdit={canEdit} /> : null}
          {tab === 'deals' ? <DealsTab orgId={org.id} deals={deals} /> : null}
          {tab === 'projects' ? <ProjectsTab orgId={org.id} projects={projects} /> : null}
          {tab === 'tickets' ? <TicketsTab orgId={org.id} tickets={tickets} /> : null}
          {tab === 'invoices' ? <InvoicesTab orgId={org.id} invoices={invoices} /> : null}
          {tab === 'tasks' ? <TasksTable tasks={openTasks} /> : null}
        </section>

        <aside aria-label="Linked records" className="record-right">
          <LinkedRecords
            title="People here"
            empty="Nobody linked yet"
            items={current.map((r) => ({
              title: r.full_name,
              sub: [r.title ?? r.job_title, roleText(r).toLowerCase() !== (r.title ?? r.job_title ?? '').toLowerCase() ? roleText(r).toLowerCase() : null].filter(Boolean).join(' · '),
              href: `/contacts/${r.contact_id}`,
              avatar: { name: r.full_name },
            }))}
          />
          {openDeals.slice(0, 3).map((d) => {
            const next = nextStepStatus(d.next_task_title, d.next_task_due, d.next_task_all_day);
            return (
              <LinkedRecords
                key={d.id}
                title="Open deal"
                href={`/deals/${d.id}`}
                items={[{ title: d.name, meta: [formatMoney(d.amount, d.currency), d.stage_name].filter(Boolean).join(' · '), status: next }]}
              />
            );
          })}
          {activeProjects.slice(0, 2).map((p) => {
            const hours = p.minutes / 60;
            const budget = p.budget_hours ? Number(p.budget_hours) : null;
            const sub = [
              p.stage_name ? `${p.stage_name} stage` : labelOf(PROJECT_STATUSES, p.status),
              budget ? `${Math.round(hours)} of ${Math.round(budget)} hours` : `${Math.round(hours)} hours`,
              p.due_date ? `due ${formatDate(p.due_date)}` : null,
            ].filter(Boolean).join(' · ');
            return (
              <LinkedRecords
                key={p.id}
                title="Project"
                href={`/projects/${p.id}`}
                items={[{ title: p.name, sub, progress: budget ? Math.min(100, (hours / budget) * 100) : undefined }]}
              />
            );
          })}
          {openTickets.slice(0, 2).map((t) => (
            <LinkedRecords key={t.id} title="Open ticket" href={`/tickets/${t.id}`} items={[{ title: `${t.number} · ${t.subject}`, status: ticketStatus(t) }]} />
          ))}
        </aside>
      </div>
    </>
  );
}

// ---------------------------------------------------------------- tabs

function ContactsTab({ org, roles, contacts, canEdit }: { org: OrgRecord; roles: RoleRow[]; contacts: Option[]; canEdit: boolean }) {
  const columns: Column<RoleRow>[] = [
    {
      key: 'name',
      label: 'Name',
      render: (r) => (
        <>
          <Link className="cell-link" href={`/contacts/${r.contact_id}`}>
            {r.full_name}
          </Link>
          {r.do_not_contact ? <span className={styles.cellSub}><Badge tone="red">Do not contact</Badge></span> : null}
        </>
      ),
    },
    { key: 'roles', label: 'Roles here', render: (r) => roleText(r) + (r.is_current && r.start_date ? `, since ${formatDate(r.start_date)}` : '') },
    {
      key: 'title',
      label: 'Job title',
      render: (r) => (r.is_current ? r.title ?? r.job_title ?? '' : r.current_org_name && r.current_org_name !== org.name ? `Now at ${r.current_org_name}` : r.title ?? ''),
    },
    { key: 'email', label: 'Email', render: (r) => (r.email ? <a href={`mailto:${r.email}`}>{r.email}</a> : <span className="muted">None</span>) },
    { key: 'last', label: 'Last contacted', render: (r) => (r.last_contacted_at ? formatDate(r.last_contacted_at) : 'Never') },
    ...(canEdit ? [{ key: 'actions', label: <span className="sr-only">Actions</span>, render: (r: RoleRow) => (r.is_current ? <EndRoleButton roleId={r.id} startDate={r.start_date} who={r.full_name} /> : null) }] : []),
  ];
  return (
    <TabCard
      title={`Contacts at ${org.name}`}
      action={canEdit ? <AddContactToOrg organizationId={org.id} orgName={org.name} contacts={contacts} /> : null}
      note="A person can sit at several organizations with dated roles, so a job change ends a role instead of rewriting the contact."
    >
      <Table
        columns={columns}
        rows={roles}
        rowKey={(r) => r.id}
        rowClassName={(r) => (r.is_current ? undefined : 'is-muted')}
        minWidth={720}
        caption="Contacts"
        empty={<EmptyState title="No contacts yet" body="Add the people you talk to here, with their role." />}
      />
    </TabCard>
  );
}

function stageText(d: DealRow): string {
  if (d.stage_state === 'open') return `${d.stage_name}, ${d.probability}%`;
  return d.stage_name;
}

function DealsTab({ orgId, deals }: { orgId: string; deals: DealRow[] }) {
  const open = deals.filter((d) => d.stage_state === 'open');
  const columns: Column<DealRow>[] = [
    { key: 'name', label: 'Deal', render: (d) => <Link className="cell-link" href={`/deals/${d.id}`}>{d.name}</Link> },
    { key: 'pipeline', label: 'Pipeline', render: (d) => d.pipeline_name },
    { key: 'stage', label: 'Stage', render: (d) => (d.stage_state === 'open' ? stageText(d) : <Badge tone={toneOf(STAGE_STATE_TONES, d.stage_state)}>{d.stage_name}</Badge>) },
    { key: 'amount', label: 'Amount', num: true, render: (d) => formatMoney(d.amount, d.currency) },
    { key: 'close', label: 'Close date', render: (d) => (d.close_date ? formatDate(d.close_date) : '') },
  ];
  return (
    <TabCard
      title="Deals"
      action={<ButtonLink size="sm" href={`/deals?new=1&organization=${orgId}`}>New deal</ButtonLink>}
      note={open.length ? <>Open value <span className="mono">{formatMoney(sumMoney(open.map((d) => d.amount)))}</span> across {open.length} open {open.length === 1 ? 'deal' : 'deals'}.</> : null}
    >
      <Table columns={columns} rows={deals} rowKey={(d) => d.id} rowClassName={(d) => (d.stage_state === 'lost' ? 'is-muted' : undefined)} caption="Deals" empty={<EmptyState title="No deals yet" />} />
    </TabCard>
  );
}

function ProjectsTab({ orgId, projects }: { orgId: string; projects: ProjectRow[] }) {
  const columns: Column<ProjectRow>[] = [
    { key: 'name', label: 'Project', render: (p) => <Link className="cell-link" href={`/projects/${p.id}`}>{p.name}</Link> },
    { key: 'stage', label: 'Stage', render: (p) => (p.status === 'active' ? p.stage_name ?? 'Active' : labelOf(PROJECT_STATUSES, p.status)) },
    { key: 'health', label: 'Health', render: (p) => <Badge tone={toneOf(HEALTH_TONES, p.health)}>{labelOf(HEALTH, p.health)}</Badge> },
    {
      key: 'hours',
      label: 'Hours',
      num: true,
      render: (p) => `${Math.round(p.minutes / 60)}${p.budget_hours ? ` of ${Math.round(Number(p.budget_hours))}` : ''}`,
    },
    { key: 'lead', label: 'Lead', render: (p) => p.owner_name ?? '' },
    { key: 'due', label: 'Due', render: (p) => (p.due_date ? formatDate(p.due_date) : '') },
  ];
  return (
    <TabCard title="Projects" action={<ButtonLink size="sm" href={`/projects?new=1&organization=${orgId}`}>New project</ButtonLink>}>
      <Table columns={columns} rows={projects} rowKey={(p) => p.id} rowClassName={(p) => (p.status === 'active' ? undefined : 'is-muted')} caption="Projects" empty={<EmptyState title="No projects yet" body="A won deal creates its project automatically." />} />
    </TabCard>
  );
}

function TicketsTab({ orgId, tickets }: { orgId: string; tickets: TicketRow[] }) {
  const columns: Column<TicketRow>[] = [
    { key: 'ticket', label: 'Ticket', render: (t) => <Link className="cell-link" href={`/tickets/${t.id}`}><span className="mono">{t.number}</span> {t.subject}</Link> },
    { key: 'status', label: 'Status', render: (t) => t.stage_name },
    { key: 'priority', label: 'Priority', render: (t) => <Badge tone={toneOf(PRIORITY_TONES, t.priority)}>{labelOf(TICKET_PRIORITIES, t.priority)}</Badge> },
    { key: 'sla', label: 'Reply', render: (t) => { const s = ticketStatus(t); return <span className={s.tone === 'red' ? 'danger' : s.tone === 'amber' ? 'warning' : undefined}>{s.text}</span>; } },
    { key: 'owner', label: 'Owner', render: (t) => t.owner_name ?? '' },
  ];
  return (
    <TabCard
      title="Tickets"
      action={<ButtonLink size="sm" href={`/tickets?new=1&organization=${orgId}`}>New ticket</ButtonLink>}
      note="Waiting on client pauses the clock. The ticket page shows the SLA in business hours."
    >
      <Table columns={columns} rows={tickets} rowKey={(t) => t.id} rowClassName={(t) => (t.stage_state === 'open' && !t.closed_at ? undefined : 'is-muted')} caption="Tickets" empty={<EmptyState title="No tickets yet" />} />
    </TabCard>
  );
}

function invoiceStatus(i: InvoiceRow) {
  if (i.state === 'paid' && i.paid_at) return `Paid ${formatDate(i.paid_at)}`;
  if (i.state === 'draft' && i.deal_name) return 'Draft';
  return labelOf(INVOICE_STATES, i.state);
}

function InvoicesTab({ orgId, invoices }: { orgId: string; invoices: InvoiceRow[] }) {
  const columns: Column<InvoiceRow>[] = [
    { key: 'number', label: 'Number', render: (i) => <Link className="cell-link mono" href={`/invoices/${i.id}`}>{i.external_number ?? 'Draft'}</Link> },
    { key: 'for', label: 'For', render: (i) => i.title ?? i.deal_name ?? '' },
    { key: 'amount', label: 'Amount', num: true, render: (i) => formatMoney(i.subtotal ?? i.total, i.currency) },
    { key: 'status', label: 'Status', render: (i) => <Badge tone={toneOf(INVOICE_TONES, i.state)}>{invoiceStatus(i)}</Badge> },
    { key: 'due', label: 'Due', render: (i) => (i.due_date ? formatDate(i.due_date) : '') },
  ];
  return (
    <TabCard
      title="Invoices"
      action={<ButtonLink size="sm" href={`/invoices?new=1&organization=${orgId}`}>Draft invoice</ButtonLink>}
      note="Amounts exclude VAT. Drafted here, numbered by the accounting provider so numbering stays gapless."
    >
      <Table columns={columns} rows={invoices} rowKey={(i) => i.id} rowClassName={(i) => (i.state === 'void' ? 'is-muted' : undefined)} caption="Invoices" empty={<EmptyState title="No invoices yet" />} />
    </TabCard>
  );
}
