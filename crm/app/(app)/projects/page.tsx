import Link from 'next/link';
import '@/components/delivery/f.css';
import { requireUser } from '@/lib/auth';
import { can } from '@/lib/permissions';
import { formatDate, formatMinutes, formatMoney } from '@/lib/format';
import { HEALTH, HEALTH_TONES, PROJECT_KINDS, PROJECT_STATUSES, labelOf, toneOf } from '@/lib/options';
import { pipelineStages } from '@/lib/stages';
import { listProjects } from '@/lib/delivery/list';
import { lookups } from '@/lib/delivery/lookups';
import { Badge, EmptyState, PageHeader, Table, buttonClass, sortHrefFor } from '@/components/ui';
import { FilterBar } from '@/components/delivery/FilterBar';
import { CreateLauncher } from '@/components/delivery/CreateLauncher';
import { createProjectAction } from './actions';

export const metadata = { title: 'Projects' };

type SP = Record<string, string | string[] | undefined>;
const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) || null;

export default async function ProjectsPage({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  const user = await requireUser();
  const sort = { key: one(sp.sort) ?? 'due', dir: one(sp.dir) === 'desc' ? ('desc' as const) : ('asc' as const) };
  const filters = { stage: one(sp.stage), health: one(sp.health), owner: one(sp.owner), org: one(sp.org), status: one(sp.status) };
  const [rows, stages, lk] = await Promise.all([listProjects(filters, sort), pipelineStages('delivery'), lookups(['orgs', 'users', 'deals'])]);
  const canCreate = can(user, 'create', 'project');
  const canExport = can(user, 'export', 'project');
  const exportQs = new URLSearchParams(Object.entries({ ...filters, sort: sort.key, dir: sort.dir }).filter(([, v]) => v) as [string, string][]).toString();
  const active = rows.filter((r) => r.status === 'active').length;
  const atRisk = rows.filter((r) => r.health !== 'on_track' && r.status === 'active').length;

  return (
    <div className="page page-wide">
      <PageHeader
        title="Projects"
        subtitle={`${rows.length} shown, ${active} active, ${atRisk} at risk or off track`}
        actions={
          <>
            {canExport ? (
              <a className={buttonClass('secondary')} href={`/projects/export${exportQs ? `?${exportQs}` : ''}`} download>
                Export CSV
              </a>
            ) : null}
            {canCreate ? (
              <CreateLauncher
                label="New project"
                title="New project"
                initialOpen={one(sp.new) === '1'}
                action={createProjectAction}
                submitLabel="Create project"
                intro={<p className="muted text-13" style={{ margin: 0 }}>It starts in Kickoff on the Project delivery pipeline.</p>}
                fields={[
                  { name: 'name', label: 'Name', required: true, placeholder: 'Website rebuild' },
                  { name: 'organization_id', label: 'Organization', type: 'select', options: lk.orgs, defaultValue: one(sp.organization) ?? undefined, width: 'half' },
                  { name: 'deal_id', label: 'Deal', type: 'select', options: lk.deals, defaultValue: one(sp.deal) ?? undefined, width: 'half', hint: 'Fills the organization when left empty' },
                  { name: 'kind', label: 'Kind', type: 'select', options: PROJECT_KINDS, defaultValue: 'delivery', width: 'half' },
                  { name: 'owner_user_id', label: 'Project lead', type: 'select', options: lk.users, defaultValue: user.id, width: 'half' },
                  { name: 'budget_amount', label: 'Budget', placeholder: '3400', width: 'half' },
                  { name: 'budget_hours', label: 'Budget hours', type: 'number', placeholder: '40', width: 'half' },
                  { name: 'start_date', label: 'Start', type: 'date', width: 'half' },
                  { name: 'due_date', label: 'Due', type: 'date', width: 'half' },
                ]}
              />
            ) : null}
          </>
        }
      />
      <div className="f-toolbar">
        <FilterBar
          path="/projects"
          params={sp}
          keep={['sort', 'dir']}
          filters={[
            { name: 'stage', label: 'Stage', options: stages.map((s) => ({ value: s.key, label: s.name })) },
            { name: 'health', label: 'Health', options: HEALTH },
            { name: 'status', label: 'Status', options: PROJECT_STATUSES },
            { name: 'owner', label: 'Lead', options: lk.users },
            { name: 'org', label: 'Organization', options: lk.orgs },
          ]}
        />
      </div>
      <div className="card">
        <Table
          caption="Projects"
          rows={rows}
          rowKey={(r) => r.id}
          sort={sort}
          sortHref={sortHrefFor('/projects', sp)}
          minWidth={900}
          rowClassName={(r) => (r.status === 'cancelled' || r.status === 'completed' ? 'is-muted' : undefined)}
          empty={
            <EmptyState
              title={Object.values(filters).some(Boolean) ? 'No projects match these filters' : 'No projects yet'}
              body="Winning a deal creates one, or start one with New project."
            />
          }
          columns={[
            {
              key: 'name',
              label: 'Project',
              sortable: true,
              render: (r) => (
                <div className="stack-sm" style={{ gap: 2 }}>
                  <Link className="cell-link" href={`/projects/${r.id}`}>
                    {r.name}
                  </Link>
                  <span className="muted small">
                    {labelOf(PROJECT_KINDS, r.kind)}
                    {r.status !== 'active' ? `, ${labelOf(PROJECT_STATUSES, r.status).toLowerCase()}` : ''}
                    {r.sample ? ', sample data' : ''}
                  </span>
                </div>
              ),
            },
            {
              key: 'organization',
              label: 'Organization',
              sortable: true,
              render: (r) => (r.organization_id ? <Link href={`/organizations/${r.organization_id}`}>{r.organization_name}</Link> : <span className="muted">None</span>),
            },
            { key: 'stage', label: 'Stage', sortable: true, render: (r) => r.stage_name ?? <span className="muted">No stage</span> },
            {
              key: 'health',
              label: 'Health',
              sortable: true,
              render: (r) => <Badge tone={toneOf(HEALTH_TONES, r.health)}>{labelOf(HEALTH, r.health)}</Badge>,
            },
            {
              key: 'hours',
              label: 'Hours',
              sortable: true,
              num: true,
              render: (r) => (
                <span title={r.budget.percent !== null ? `${r.budget.percent}% of budget used` : undefined}>
                  {r.budget_hours ? `${Math.round((r.total_minutes / 60) * 10) / 10} of ${Number(r.budget_hours)}` : formatMinutes(r.total_minutes) || '0m'}
                </span>
              ),
            },
            {
              key: 'budget',
              label: 'Budget used',
              sortable: true,
              num: true,
              render: (r) =>
                r.budget.usedValue && r.budget_amount ? (
                  <span className={r.budget.over ? 'danger' : undefined}>
                    {formatMoney(r.budget.usedValue, r.currency, 0)} of {formatMoney(r.budget_amount, r.currency, 0)}
                  </span>
                ) : (
                  ''
                ),
            },
            { key: 'lead', label: 'Lead', sortable: true, render: (r) => r.owner_name ?? <span className="muted">Unassigned</span> },
            {
              key: 'due',
              label: 'Due',
              sortable: true,
              render: (r) => <span className="mono nowrap">{formatDate(r.due_date)}</span>,
            },
          ]}
        />
      </div>
    </div>
  );
}
