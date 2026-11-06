/**
 * /contacts/[id] (agent A). Same layout as the Organization design: properties
 * (with LinkedIn and privacy), emails and phones on the left; tabs Timeline,
 * Organizations (dated roles), Deals (through deal_contacts), Tasks; the rail
 * with current organizations and open deals.
 */
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { requireUser } from '@/lib/auth';
import { can } from '@/lib/permissions';
import { getTimeline } from '@/lib/activities';
import { taskBuckets } from '@/lib/tasks';
import { customPropertyGroups, getFieldDefinitions, mergePropertyGroups, type PropertyGroup } from '@/lib/fields';
import { formatDate, formatDateTime, formatMoney } from '@/lib/format';
import {
  BUYING_ROLES, LAWFUL_BASES, LIFECYCLE_STAGES, LIFECYCLE_TONES, STAGE_STATE_TONES, labelOf, toneOf, type Option,
} from '@/lib/options';
import {
  contactDeals, contactEmails, contactPhones, contactRoles, getContact, orgPickList, userOptions,
  type ContactRecord, type DealRow, type RoleRow,
} from '@/lib/orgs/queries';
import { nextStepStatus, roleText } from '@/lib/orgs/display';
import { RecordHeader, PropertiesPanel, Timeline, LinkedRecords } from '@/components/records';
import { Tabs } from '@/components/ui/Tabs';
import { Table, type Column } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { ButtonLink } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { RecordActions } from '@/components/orgs/RecordActions';
import { ListEditor } from '@/components/orgs/ListEditor';
import { AddOrgToContact, EndRoleButton } from '@/components/orgs/RoleControls';
import { TabCard, TasksTable } from '@/components/orgs/TabCard';
import styles from '@/components/orgs/orgs.module.css';
import {
  addContactNote, addEmailAction, addPhoneAction, removeEmailAction, removePhoneAction, setPrimaryEmailAction,
  setPrimaryPhoneAction, updateContactProperties,
} from '../_actions';

const TABS = ['timeline', 'organizations', 'deals', 'tasks'] as const;
type Tab = (typeof TABS)[number];

const EMAIL_TYPE_OPTIONS: Option[] = [
  { value: 'work', label: 'Work' },
  { value: 'personal', label: 'Personal' },
  { value: 'billing', label: 'Billing' },
  { value: 'other', label: 'Other' },
];
const PHONE_TYPE_OPTIONS: Option[] = [
  { value: 'mobile', label: 'Mobile' },
  { value: 'work', label: 'Work' },
  { value: 'home', label: 'Home' },
  { value: 'other', label: 'Other' },
];

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const c = await getContact((await params).id);
  return { title: c?.full_name ?? 'Contact' };
}

function propertyGroups(c: ContactRecord, users: Option[]): PropertyGroup[] {
  return [
    {
      name: 'About',
      fields: [
        { key: 'first_name', label: 'First name', type: 'text', value: c.first_name, display: c.first_name, required: true },
        { key: 'last_name', label: 'Last name', type: 'text', value: c.last_name, display: c.last_name ?? '' },
        { key: 'job_title', label: 'Job title', type: 'text', value: c.job_title, display: c.job_title ?? '' },
        { key: 'tagline', label: 'LinkedIn headline', type: 'text', value: c.tagline, display: c.tagline ?? '', help: 'Check it against the organization before every message' },
        {
          key: 'linkedin_url',
          label: 'LinkedIn',
          type: 'url',
          value: c.linkedin_url,
          display: c.linkedin_url_normalised ?? '',
          href: c.linkedin_url_normalised ? `https://www.${c.linkedin_url_normalised}` : undefined,
          help: 'Cleaned to linkedin.com/in/name, unique across contacts',
        },
        { key: 'city', label: 'City', type: 'text', value: c.city, display: c.city ?? '' },
        { key: 'country', label: 'Country', type: 'text', value: c.country, display: c.country ?? '', help: 'Two letter code like NL' },
        { key: 'language', label: 'Language', type: 'text', value: c.language, display: c.language ?? '' },
      ],
    },
    {
      name: 'Ownership',
      fields: [
        { key: 'owner_user_id', label: 'Owner', type: 'select', value: c.owner_user_id, display: c.owner_name ?? '', options: users },
        { key: 'lifecycle_stage', label: 'Lifecycle', type: 'select', value: c.lifecycle_stage, display: labelOf(LIFECYCLE_STAGES, c.lifecycle_stage), options: LIFECYCLE_STAGES, required: true },
        { key: 'source', label: 'Source', type: 'text', value: c.source, display: [c.source, c.source ? formatDate(c.created_at) : null].filter(Boolean).join(', ') },
        { key: 'linkedin_accepted_at', label: 'Accepted on LinkedIn', type: 'readonly', value: null, display: c.linkedin_accepted_at ? formatDateTime(c.linkedin_accepted_at) : '', editable: false },
      ],
    },
    {
      name: 'Privacy',
      fields: [
        { key: 'lawful_basis', label: 'Lawful basis', type: 'select', value: c.lawful_basis, display: labelOf(LAWFUL_BASES, c.lawful_basis), options: LAWFUL_BASES, required: true },
        {
          key: 'do_not_contact',
          label: 'Do not contact',
          type: 'checkbox',
          value: c.do_not_contact,
          display: c.do_not_contact ? `Yes${c.objected_at ? `, since ${formatDate(c.objected_at)}` : ''}` : 'No',
          help: 'Adds the contact, every email and the LinkedIn profile to the suppression list',
        },
        {
          key: 'suppressed',
          label: 'Suppression list',
          type: 'readonly',
          value: null,
          display: c.suppressed ? 'On the list, never contacted' : 'Not on the list',
          editable: false,
        },
      ],
    },
  ];
}

export default async function ContactPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const user = await requireUser();
  const { id } = await params;
  const sp = await searchParams;
  const c = await getContact(id);
  if (!c) notFound();
  const tab: Tab = (TABS as readonly string[]).includes(String(sp.tab)) ? (sp.tab as Tab) : 'timeline';

  const [emails, phones, roles, deals, timeline, tasks, defs, users, orgs] = await Promise.all([
    contactEmails(c.id),
    contactPhones(c.id),
    contactRoles(c.id),
    contactDeals(c.id),
    getTimeline('contact', c.id, { limit: 200 }),
    taskBuckets({ linked: { type: 'contact', id: c.id } }),
    getFieldDefinitions('contact'),
    userOptions(),
    orgPickList(c.id),
  ]);
  const userOpts = users.map((u) => ({ value: u.value, label: u.label }));
  const canEdit = can(user, 'edit', 'contact', c);
  const sample = c.custom?.sample === true || c.custom?.sample === 'true';
  const current = roles.filter((r) => r.is_current);
  const openDeals = deals.filter((d) => d.stage_state === 'open');
  const openTasks = [...tasks.overdue, ...tasks.today, ...tasks.week, ...tasks.later];
  const groups = mergePropertyGroups(propertyGroups(c, userOpts), customPropertyGroups(defs, c.custom, { users: users.map((u) => ({ id: u.value, name: u.label })), editable: canEdit }));
  const base = `/contacts/${c.id}`;
  const primaryEmail = emails.find((e) => e.is_primary) ?? emails[0];
  const emailBlocked = c.do_not_contact
    ? `${c.full_name} is marked do not contact`
    : c.suppressed
      ? `${c.full_name} is on the suppression list`
      : !emails.length
        ? 'Add an email address first'
        : null;

  const badges = [
    { label: labelOf(LIFECYCLE_STAGES, c.lifecycle_stage), tone: toneOf(LIFECYCLE_TONES, c.lifecycle_stage), strong: true },
    ...(primaryEmail ? [{ label: primaryEmail.email }] : []),
    ...(c.city || c.country ? [{ label: [c.city, c.country].filter(Boolean).join(', ') }] : []),
    ...(c.do_not_contact ? [{ label: 'Do not contact', tone: 'red' as const }] : c.suppressed ? [{ label: 'Suppressed', tone: 'red' as const }] : []),
  ];

  const tabItems = [
    { id: 'timeline', label: 'Timeline', count: timeline.length },
    { id: 'organizations', label: 'Organizations', count: roles.length },
    { id: 'deals', label: 'Deals', count: deals.length },
    { id: 'tasks', label: 'Tasks', count: openTasks.length },
  ].map((t) => ({ ...t, href: t.id === 'timeline' ? base : `${base}?tab=${t.id}` }));

  return (
    <>
      <RecordHeader
        breadcrumb={[{ label: 'Contacts', href: '/contacts' }, { label: c.full_name }]}
        title={c.full_name}
        avatar={{ name: c.full_name }}
        subtitle={
          c.job_title || c.org_name ? (
            <>
              {c.job_title}
              {c.job_title && c.org_name ? ' at ' : null}
              {c.primary_org_id && c.org_name ? <Link href={`/organizations/${c.primary_org_id}`}>{c.org_name}</Link> : null}
            </>
          ) : undefined
        }
        badges={badges}
        sample={sample}
        actions={
          <RecordActions
            contactId={c.id}
            people={[]}
            users={userOpts}
            currentUserId={user.id}
            newDealHref={`/deals?new=1&contact=${c.id}${c.primary_org_id ? `&organization=${c.primary_org_id}` : ''}`}
            emailBlocked={emailBlocked}
          />
        }
        tabs={<Tabs items={tabItems} active={tab} />}
      />
      <div className="record-body">
        <div className={styles.left}>
          <PropertiesPanel groups={groups} action={canEdit ? updateContactProperties : undefined} hidden={{ id: c.id }} />
          <ListEditor
            title="Emails"
            items={emails.map((e) => ({ id: e.id, label: e.email, primary: e.is_primary, tags: [labelOf(EMAIL_TYPE_OPTIONS, e.type), ...(e.bounced_at ? ['Bounced'] : [])] }))}
            hidden={{ contactId: c.id }}
            idName="emailId"
            addAction={addEmailAction}
            removeAction={removeEmailAction}
            primaryAction={setPrimaryEmailAction}
            input={{ name: 'email', label: 'Add an email', placeholder: 'Add an email', type: 'email', inputMode: 'email' }}
            typeSelect={{ name: 'type', label: 'Email type', options: EMAIL_TYPE_OPTIONS, defaultValue: 'work' }}
            emptyText="No email yet"
            note="Unique across contacts, case ignored. An email that belongs to someone else links to them instead."
            canEdit={canEdit}
          />
          <ListEditor
            title="Phones"
            items={phones.map((p) => ({ id: p.id, label: p.phone, primary: p.is_primary, mono: true, tags: [labelOf(PHONE_TYPE_OPTIONS, p.type)] }))}
            hidden={{ contactId: c.id }}
            idName="phoneId"
            addAction={addPhoneAction}
            removeAction={removePhoneAction}
            primaryAction={setPrimaryPhoneAction}
            input={{ name: 'phone', label: 'Add a phone number', placeholder: 'Add a phone number', type: 'tel', inputMode: 'tel' }}
            typeSelect={{ name: 'type', label: 'Phone type', options: PHONE_TYPE_OPTIONS, defaultValue: 'mobile' }}
            emptyText="No phone yet"
            canEdit={canEdit}
          />
        </div>

        <section aria-label={tabItems.find((t) => t.id === tab)?.label} className="record-main">
          {tab === 'timeline' ? <Timeline items={timeline} composer={{ action: addContactNote, hidden: { contactId: c.id } }} /> : null}
          {tab === 'organizations' ? <RolesTab contact={c} roles={roles} orgs={orgs} canEdit={canEdit} /> : null}
          {tab === 'deals' ? <DealsTab contact={c} deals={deals} /> : null}
          {tab === 'tasks' ? <TasksTable tasks={openTasks} skipType="contact" /> : null}
        </section>

        <aside aria-label="Linked records" className="record-right">
          <LinkedRecords
            title={current.length === 1 ? 'Organization' : 'Organizations'}
            empty="Not linked to an organization"
            items={current.map((r) => ({
              title: r.org_name,
              sub: [r.title ?? c.job_title, roleText(r).toLowerCase(), r.is_primary && current.length > 1 ? 'primary' : null].filter(Boolean).join(' · '),
              href: `/organizations/${r.organization_id}`,
              avatar: { name: r.org_name },
            }))}
          />
          {openDeals.slice(0, 3).map((d) => (
            <LinkedRecords
              key={d.id}
              title="Open deal"
              href={`/deals/${d.id}`}
              items={[{ title: d.name, meta: [formatMoney(d.amount, d.currency), d.stage_name].filter(Boolean).join(' · '), status: nextStepStatus(d.next_task_title, d.next_task_due, d.next_task_all_day) }]}
            />
          ))}
          <LinkedRecords
            title="Recency"
            items={[
              { title: 'Last contacted', sub: c.last_contacted_at ? formatDateTime(c.last_contacted_at) : 'Never' },
              { title: 'Last activity', sub: c.last_activity_at ? formatDateTime(c.last_activity_at) : 'Never' },
            ]}
          />
        </aside>
      </div>
    </>
  );
}

function RolesTab({ contact, roles, orgs, canEdit }: { contact: ContactRecord; roles: RoleRow[]; orgs: Option[]; canEdit: boolean }) {
  const columns: Column<RoleRow>[] = [
    {
      key: 'org',
      label: 'Organization',
      render: (r) => (
        <>
          <Link className="cell-link" href={`/organizations/${r.organization_id}`}>
            {r.org_name}
          </Link>
          {r.is_primary ? <span className={styles.cellSub}>Primary</span> : null}
        </>
      ),
    },
    { key: 'role', label: 'Role', render: (r) => roleText(r) },
    { key: 'title', label: 'Title there', render: (r) => r.title ?? '' },
    { key: 'start', label: 'Started', render: (r) => (r.start_date ? formatDate(r.start_date) : <span className="muted">Unknown</span>) },
    { key: 'end', label: 'Ended', render: (r) => (r.is_current ? <Badge tone="green">Current</Badge> : r.end_date ? formatDate(r.end_date) : 'Ended') },
    ...(canEdit ? [{ key: 'actions', label: <span className="sr-only">Actions</span>, render: (r: RoleRow) => (r.is_current ? <EndRoleButton roleId={r.id} startDate={r.start_date} who={`${contact.full_name} at ${r.org_name}`} /> : null) }] : []),
  ];
  return (
    <TabCard
      title={`Where ${contact.first_name} works`}
      action={canEdit ? <AddOrgToContact contactId={contact.id} organizations={orgs} /> : null}
      note="A job change ends a role with an end date and adds a new one. Past activity stays with the organization it happened at."
    >
      <Table
        columns={columns}
        rows={roles}
        rowKey={(r) => r.id}
        rowClassName={(r) => (r.is_current ? undefined : 'is-muted')}
        minWidth={680}
        caption="Organizations"
        empty={<EmptyState title="Not linked to an organization yet" />}
      />
    </TabCard>
  );
}

function DealsTab({ contact, deals }: { contact: ContactRecord; deals: DealRow[] }) {
  const columns: Column<DealRow>[] = [
    { key: 'name', label: 'Deal', render: (d) => <Link className="cell-link" href={`/deals/${d.id}`}>{d.name}</Link> },
    { key: 'org', label: 'Organization', render: (d) => (d.org_id ? <Link href={`/organizations/${d.org_id}`}>{d.org_name}</Link> : '') },
    { key: 'role', label: 'Role on the deal', render: (d) => labelOf(BUYING_ROLES, d.role) },
    { key: 'stage', label: 'Stage', render: (d) => (d.stage_state === 'open' ? `${d.stage_name}, ${d.probability}%` : <Badge tone={toneOf(STAGE_STATE_TONES, d.stage_state)}>{d.stage_name}</Badge>) },
    { key: 'amount', label: 'Amount', num: true, render: (d) => formatMoney(d.amount, d.currency) },
    { key: 'close', label: 'Close date', render: (d) => (d.close_date ? formatDate(d.close_date) : '') },
  ];
  return (
    <TabCard title="Deals" action={<ButtonLink size="sm" href={`/deals?new=1&contact=${contact.id}${contact.primary_org_id ? `&organization=${contact.primary_org_id}` : ''}`}>New deal</ButtonLink>} note="Deals this person is on, with their role. Add or change roles on the deal page.">
      <Table columns={columns} rows={deals} rowKey={(d) => d.id} rowClassName={(d) => (d.stage_state === 'lost' ? 'is-muted' : undefined)} minWidth={720} caption="Deals" empty={<EmptyState title="Not on any deal yet" />} />
    </TabCard>
  );
}
