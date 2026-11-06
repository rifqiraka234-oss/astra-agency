import Link from 'next/link';
import '@/components/delivery/f.css';
import { requireUser } from '@/lib/auth';
import { can } from '@/lib/permissions';
import { formatAgo } from '@/lib/format';
import { PRIORITY_TONES, TICKET_PRIORITIES, TICKET_SOURCES, labelOf, toneOf } from '@/lib/options';
import { pipelineStages } from '@/lib/stages';
import { listTickets } from '@/lib/service/list';
import { SLA_TONES, slaText } from '@/lib/service/sla';
import { lookups } from '@/lib/delivery/lookups';
import { Badge, EmptyState, PageHeader, Table } from '@/components/ui';
import { FilterBar } from '@/components/delivery/FilterBar';
import { CreateLauncher } from '@/components/delivery/CreateLauncher';
import { createTicketAction } from './actions';

export const metadata = { title: 'Tickets' };

type SP = Record<string, string | string[] | undefined>;
const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) || null;

export default async function TicketsPage({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  const user = await requireUser();
  // Open tickets by default, "any" shows closed ones too.
  const statusParam = one(sp.status);
  const status = statusParam === 'any' ? null : statusParam ?? 'open';
  const filters = { status, priority: one(sp.priority), owner: one(sp.owner), org: one(sp.org) };
  const [rows, stages, lk] = await Promise.all([listTickets(filters), pipelineStages('tickets'), lookups(['orgs', 'users', 'contacts', 'projects'])]);
  const overdue = rows.filter((r) => r.stage_state === 'open' && r.clock?.status === 'overdue').length;
  const dueSoon = rows.filter((r) => r.stage_state === 'open' && r.clock?.status === 'due_soon').length;
  const presetProject = one(sp.project);
  const presetOrg = one(sp.organization);

  return (
    <div className="page page-wide">
      <PageHeader
        title="Tickets"
        subtitle={`${rows.length} shown${overdue ? `, ${overdue} past their SLA` : ''}${dueSoon ? `, ${dueSoon} due soon` : ''}. Business hours Mon to Fri 09:00 to 17:30, waiting on client pauses the clock.`}
        actions={
          can(user, 'create', 'ticket') ? (
            <CreateLauncher
              label="New ticket"
              title="New ticket"
              initialOpen={one(sp.new) === '1'}
              action={createTicketAction}
              submitLabel="Create ticket"
              fields={[
                { name: 'subject', label: 'Subject', required: true, placeholder: 'Booking form not sending confirmations' },
                { name: 'description', label: 'What the client reported', type: 'textarea' },
                { name: 'priority', label: 'Priority', type: 'select', options: TICKET_PRIORITIES, defaultValue: 'medium', width: 'half', hint: 'Sets the SLA targets' },
                { name: 'source', label: 'Source', type: 'select', options: TICKET_SOURCES, defaultValue: 'manual', width: 'half' },
                { name: 'organization_id', label: 'Organization', type: 'select', options: lk.orgs, defaultValue: presetOrg ?? undefined, width: 'half' },
                { name: 'contact_id', label: 'Contact', type: 'select', options: lk.contacts, width: 'half' },
                { name: 'project_id', label: 'Project', type: 'select', options: lk.projects, defaultValue: presetProject ?? undefined, width: 'half', hint: 'Fills the organization when left empty' },
                { name: 'owner_user_id', label: 'Owner', type: 'select', options: lk.users, defaultValue: user.id, width: 'half' },
                { name: 'category', label: 'Category', placeholder: 'Bug, change request, question', width: 'half' },
              ]}
            />
          ) : null
        }
      />
      <div className="f-toolbar">
        <FilterBar
          path="/tickets"
          params={sp}
          filters={[
            { name: 'status', label: 'Status', all: 'All open', options: [...stages.map((s) => ({ value: s.key, label: s.name })), { value: 'any', label: 'Any status, closed too' }] },
            { name: 'priority', label: 'Priority', options: TICKET_PRIORITIES },
            { name: 'owner', label: 'Owner', options: [{ value: 'none', label: 'Unassigned' }, ...lk.users] },
            { name: 'org', label: 'Organization', options: lk.orgs },
          ]}
        />
      </div>
      <div className="card">
        <Table
          caption="Tickets, past their SLA first"
          rows={rows}
          rowKey={(r) => r.id}
          minWidth={880}
          rowClassName={(r) => (r.stage_state === 'open' ? undefined : 'is-muted')}
          empty={<EmptyState title={status === 'open' && !filters.priority && !filters.owner && !filters.org ? 'No open tickets' : 'No tickets match these filters'} body="Clients open tickets in the portal (V2), or log one with New ticket." />}
          columns={[
            {
              key: 'ticket',
              label: 'Ticket',
              render: (r) => (
                <div className="stack-sm" style={{ gap: 2 }}>
                  <Link className="cell-link" href={`/tickets/${r.id}`}>
                    <span className="mono">{r.number}</span> {r.subject}
                  </Link>
                  <span className="muted small">
                    {labelOf(TICKET_SOURCES, r.source)}
                    {r.project_name ? `, ${r.project_name}` : ''}
                    {r.sample ? ', sample data' : ''}
                  </span>
                </div>
              ),
            },
            {
              key: 'organization',
              label: 'Organization',
              render: (r) => (r.organization_id ? <Link href={`/organizations/${r.organization_id}`}>{r.organization_name}</Link> : <span className="muted">None</span>),
            },
            { key: 'status', label: 'Status', render: (r) => r.stage_name },
            { key: 'priority', label: 'Priority', render: (r) => <Badge tone={toneOf(PRIORITY_TONES, r.priority)}>{labelOf(TICKET_PRIORITIES, r.priority)}</Badge> },
            {
              key: 'sla',
              label: 'SLA',
              render: (r) =>
                r.clock ? (
                  <span className={`f-sla-${SLA_TONES[r.clock.status]} nowrap`}>{slaText(r.clock, r.clockKind)}</span>
                ) : (
                  <span className="muted">No policy</span>
                ),
            },
            { key: 'owner', label: 'Owner', render: (r) => r.owner_name ?? <span className="muted">Unassigned</span> },
            { key: 'opened', label: 'Opened', render: (r) => <span className="nowrap">{formatAgo(r.opened_at)}</span> },
          ]}
        />
      </div>
    </div>
  );
}
