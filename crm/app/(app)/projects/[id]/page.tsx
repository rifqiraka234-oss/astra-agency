import Link from 'next/link';
import { notFound } from 'next/navigation';
import '@/components/delivery/f.css';
import { requireUser } from '@/lib/auth';
import { can } from '@/lib/permissions';
import { sql } from '@/lib/db';
import { getTimeline } from '@/lib/activities';
import { customPropertyGroups, getFieldDefinitions, mergePropertyGroups, type PropertyGroup } from '@/lib/fields';
import { daysBetween, formatDate, formatDays, formatDue, formatMinutes, formatMoney, todayKey } from '@/lib/format';
import { HEALTH, HEALTH_TONES, INVOICE_STATES, INVOICE_TONES, PROJECT_KINDS, PROJECT_STATUSES, TICKET_PRIORITIES, labelOf, toneOf } from '@/lib/options';
import { pipelineStages } from '@/lib/stages';
import { projectBudget, projectHours } from '@/lib/delivery/projects';
import { lookups } from '@/lib/delivery/lookups';
import { ticketSlas } from '@/lib/service/tickets';
import { SLA_TONES, slaText } from '@/lib/service/sla';
import { Badge, Field, Input, Select, Textarea, buttonClass } from '@/components/ui';
import { LinkedRecords, PropertiesPanel, RecordHeader, Timeline } from '@/components/records';
import { ActionForm } from '@/components/delivery/ActionForm';
import { StagePath } from '@/components/delivery/StagePath';
import {
  addMilestoneAction,
  addProjectNote,
  addProjectTask,
  addTimeEntryAction,
  completeLinkedTask,
  moveProjectStage,
  removeMilestoneAction,
  removeTimeEntryAction,
  toggleMilestoneAction,
  updateProjectProperties,
} from '../actions';

export const metadata = { title: 'Project' };

type ProjectRow = {
  id: string;
  name: string;
  kind: string;
  status: string;
  health: string;
  organization_id: string | null;
  organization_name: string | null;
  deal_id: string | null;
  deal_name: string | null;
  deal_amount: string | null;
  deal_currency: string | null;
  deal_stage: string | null;
  lead_id: string | null;
  owner_user_id: string | null;
  owner_name: string | null;
  stage_id: string | null;
  start_date: string | null;
  due_date: string | null;
  budget_amount: string | null;
  budget_hours: string | null;
  hourly_rate: string | null;
  currency: string;
  live_url: string | null;
  repo_url: string | null;
  description: string | null;
  custom: Record<string, unknown>;
  created_at: Date;
};

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!UUID.test(id)) notFound();
  const user = await requireUser();
  const [p] = await sql<ProjectRow[]>`
    select p.*, o.name as organization_name, d.name as deal_name, d.amount as deal_amount, d.currency as deal_currency,
           ds.name as deal_stage, u.name as owner_name
      from projects p
      left join organizations o on o.id = p.organization_id
      left join deals d on d.id = p.deal_id
      left join pipeline_stages ds on ds.id = d.stage_id
      left join users u on u.id = p.owner_user_id
     where p.id = ${id} and p.deleted_at is null`;
  if (!p) notFound();

  const today = todayKey();
  const [stages, hoursMap, milestones, entries, tasks, tickets, invoices, timeline, lk, defs, entered] = await Promise.all([
    pipelineStages('delivery'),
    projectHours(sql, [id]),
    sql<{ id: string; name: string; due_date: string | null; completed_at: Date | null; amount: string | null }[]>`
      select id, name, due_date, completed_at, amount from project_milestones where project_id = ${id} order by position, due_date nulls last`,
    sql<{ id: string; user_id: string; user_name: string; work_date: string; minutes: number; description: string | null; billable: boolean; invoice_line_id: string | null }[]>`
      select te.id, te.user_id, u.name as user_name, te.work_date, te.minutes, te.description, te.billable, te.invoice_line_id
        from time_entries te join users u on u.id = te.user_id
       where te.project_id = ${id} order by te.work_date desc, te.created_at desc limit 100`,
    sql<{ id: string; title: string; due_at: Date | null; all_day: boolean; is_overdue: boolean; owner_name: string | null; owner_user_id: string | null }[]>`
      select v.id, v.title, v.due_at, v.all_day, v.is_overdue, v.owner_name, v.owner_user_id
        from v_open_tasks v where v.id in (select task_id from task_links where project_id = ${id})
       order by v.due_at nulls last`,
    sql<{ id: string; number: number; subject: string; priority: string; stage_name: string; stage_state: string }[]>`
      select tk.id, tk.number, tk.subject, tk.priority, s.name as stage_name, s.state as stage_state
        from tickets tk join pipeline_stages s on s.id = tk.stage_id
       where tk.project_id = ${id} and tk.deleted_at is null order by (s.state = 'open') desc, tk.opened_at desc`,
    sql<{ id: string; external_number: string | null; title: string | null; state: string; total: string | null; currency: string; due_date: string | null; kind: string }[]>`
      select id, external_number, title, state, total, currency, due_date, kind from invoices
       where project_id = ${id} and deleted_at is null order by coalesce(issue_date, created_at::date) desc`,
    getTimeline('project', id),
    lookups(['orgs', 'deals', 'users']),
    getFieldDefinitions('project'),
    sql<{ changed_at: Date }[]>`
      select changed_at from stage_transitions where object_type = 'project' and record_id = ${id} and to_stage_id = ${p.stage_id}
       order by changed_at desc limit 1`,
  ]);
  const hours = hoursMap.get(id);
  const budget = projectBudget(p, hours);
  const slas = await ticketSlas(sql, tickets.filter((t) => t.stage_state === 'open').map((t) => t.id));
  const canEdit = can(user, 'edit', 'project', p);
  const isSample = p.custom?.sample === true;
  const daysIn = entered[0] ? daysBetween(entered[0].changed_at, new Date()) : null;
  const current = stages.find((s) => s.id === p.stage_id);
  const currency = p.currency || 'EUR';
  const usersById = new Map(lk.users.map((u) => [u.value, u.label]));
  const unbilled = hours?.unbilled_minutes ?? 0;

  const core: PropertyGroup[] = [
    {
      name: 'Project',
      fields: [
        { key: 'name', label: 'Name', type: 'text', value: p.name, display: p.name, required: true },
        { key: 'kind', label: 'Kind', type: 'select', value: p.kind, display: labelOf(PROJECT_KINDS, p.kind), options: PROJECT_KINDS, required: true },
        { key: 'status', label: 'Status', type: 'select', value: p.status, display: labelOf(PROJECT_STATUSES, p.status), options: PROJECT_STATUSES, required: true },
        { key: 'health', label: 'Health', type: 'select', value: p.health, display: labelOf(HEALTH, p.health), options: HEALTH, required: true },
        { key: 'owner_user_id', label: 'Project lead', type: 'user', value: p.owner_user_id, display: p.owner_name ?? '', options: lk.users },
        { key: 'start_date', label: 'Start', type: 'date', value: p.start_date, display: formatDate(p.start_date) },
        { key: 'due_date', label: 'Due', type: 'date', value: p.due_date, display: formatDate(p.due_date) },
      ],
    },
    {
      name: 'Budget',
      fields: [
        { key: 'budget_amount', label: 'Budget', type: 'currency', value: p.budget_amount, display: formatMoney(p.budget_amount, currency), mono: true },
        { key: 'budget_hours', label: 'Budget hours', type: 'number', value: p.budget_hours, display: p.budget_hours ? `${Number(p.budget_hours)} h` : '', mono: true },
        {
          key: 'hourly_rate',
          label: 'Hourly rate',
          type: 'currency',
          value: p.hourly_rate,
          display: p.hourly_rate ? formatMoney(p.hourly_rate, currency, 2) : budget.rate ? `${formatMoney(budget.rate, currency, 2)}, budget over hours` : '',
          mono: true,
          help: 'Leave empty to use the budget divided by the budget hours',
        },
      ],
    },
    {
      name: 'Links',
      fields: [
        { key: 'organization_id', label: 'Organization', type: 'select', value: p.organization_id, display: p.organization_name ?? '', href: p.organization_id ? `/organizations/${p.organization_id}` : undefined, options: lk.orgs },
        { key: 'deal_id', label: 'Deal', type: 'select', value: p.deal_id, display: p.deal_name ?? '', href: p.deal_id ? `/deals/${p.deal_id}` : undefined, options: lk.deals },
        { key: 'live_url', label: 'Live site', type: 'url', value: p.live_url, display: p.live_url ?? '' },
        { key: 'repo_url', label: 'Repository', type: 'url', value: p.repo_url, display: p.repo_url ?? '' },
        { key: 'description', label: 'Description', type: 'textarea', value: p.description, display: p.description ?? '' },
      ],
    },
  ];
  const groups = mergePropertyGroups(core, customPropertyGroups(defs, p.custom, { users: lk.users.map((u) => ({ id: u.value, name: u.label })), editable: canEdit }));

  const progressClass = ['progress', budget.tone === 'amber' ? 'f-progress-amber' : budget.tone === 'red' ? 'f-progress-red' : ''].filter(Boolean).join(' ');
  const pathStages = stages.map((s) => ({
    id: s.id,
    name: s.name,
    state: s.state,
    position: s.position,
    sub: s.id === p.stage_id && daysIn !== null ? `${formatDays(daysIn)} here` : undefined,
  }));

  return (
    <>
      <RecordHeader
        breadcrumb={[{ label: 'Projects', href: '/projects' }, ...(p.organization_id ? [{ label: p.organization_name ?? 'Organization', href: `/organizations/${p.organization_id}` }] : []), { label: p.name }]}
        title={p.name}
        subtitle={
          <span className="row" style={{ gap: 14 }}>
            {p.budget_amount ? <span className="mono">{formatMoney(p.budget_amount, currency)}</span> : null}
            {p.due_date ? <span>Due {formatDate(p.due_date)}</span> : null}
            <span>Lead {p.owner_name ?? 'not set'}</span>
          </span>
        }
        badges={[
          { label: current?.name ?? 'No stage', tone: current?.state === 'closed' ? 'green' : 'blue', strong: true },
          { label: labelOf(HEALTH, p.health), tone: toneOf(HEALTH_TONES, p.health) },
          ...(p.status !== 'active' ? [{ label: labelOf(PROJECT_STATUSES, p.status), tone: 'grey' as const }] : []),
          { label: labelOf(PROJECT_KINDS, p.kind) },
        ]}
        sample={isSample}
        actions={
          <>
            <Link className={buttonClass('secondary')} href={`/tickets?new=1&project=${p.id}`}>
              New ticket
            </Link>
            {can(user, 'create', 'invoice') ? (
              <Link className={buttonClass('primary')} href={`/invoices?new=1&project=${p.id}`}>
                Draft invoice
              </Link>
            ) : null}
          </>
        }
        tabs={
          <div className="f-header-path">
            <StagePath label="Project stage" stages={pathStages} currentId={p.stage_id} action={moveProjectStage} recordId={p.id} canEdit={canEdit} />
          </div>
        }
      />
      <div className="record-body">
        <PropertiesPanel groups={groups} action={canEdit ? updateProjectProperties : undefined} hidden={{ id: p.id }} label="Project properties" />

        <div className="record-main">
          <section className="card" aria-labelledby="budget-h">
            <div className="f-card-head-row">
              <h2 id="budget-h" className="f-card-title">
                Budget and time
              </h2>
              {budget.percent !== null ? (
                <Badge tone={budget.tone}>{budget.over ? `Over budget, ${budget.percent}%` : `${budget.percent}% used`}</Badge>
              ) : (
                <span className="muted small">Set a budget to track it</span>
              )}
            </div>
            <div className="f-card-pad stack-sm" style={{ gap: 12 }}>
              <div className="f-budget">
                <div className="stack-sm" style={{ gap: 2 }}>
                  <span className="muted small">Hours logged</span>
                  <span className="f-budget-big">
                    {Math.round(budget.hours * 10) / 10}
                    {budget.budgetHours ? ` of ${budget.budgetHours}` : ''} h
                  </span>
                </div>
                <div className="stack-sm" style={{ gap: 2 }}>
                  <span className="muted small">Value of billable time</span>
                  <span className="f-budget-big">
                    {budget.usedValue ? formatMoney(budget.usedValue, currency, 0) : 'No rate'}
                    {p.budget_amount ? <span className="muted text-13"> of {formatMoney(p.budget_amount, currency, 0)}</span> : null}
                  </span>
                </div>
                <div className="stack-sm" style={{ gap: 2 }}>
                  <span className="muted small">Billable, not invoiced</span>
                  <span className="f-budget-big">{formatMinutes(unbilled) || '0m'}</span>
                </div>
              </div>
              {budget.percent !== null ? (
                <div className={progressClass} role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.min(100, budget.percent)} aria-label="Budget used">
                  <span style={{ width: `${Math.min(100, budget.percent)}%` }} />
                </div>
              ) : null}
            </div>
          </section>

          <section className="card" aria-labelledby="ms-h">
            <div className="f-card-head-row">
              <h2 id="ms-h" className="f-card-title">
                Milestones
              </h2>
              <span className="muted small">
                {milestones.filter((m) => m.completed_at).length} of {milestones.length} done
              </span>
            </div>
            {milestones.length ? (
              <ul className="f-list">
                {milestones.map((m) => {
                  const late = !m.completed_at && m.due_date && m.due_date < today;
                  return (
                    <li key={m.id}>
                      <div className="f-list-main">
                        <div className={m.completed_at ? 'f-done' : 'strong'}>{m.name}</div>
                        <div className={`small ${late ? 'danger' : 'muted'}`}>
                          {m.completed_at ? `Done ${formatDate(m.completed_at)}` : m.due_date ? `${late ? 'Was due' : 'Due'} ${formatDate(m.due_date)}` : 'No due date'}
                          {m.amount ? `, bills ${formatMoney(m.amount, currency)}` : ''}
                        </div>
                      </div>
                      {canEdit ? (
                        <div className="f-actions">
                          <ActionForm
                            inline
                            action={toggleMilestoneAction}
                            hidden={{ projectId: p.id, milestoneId: m.id, done: m.completed_at ? 'false' : 'on' }}
                            submitLabel={m.completed_at ? 'Reopen' : 'Mark done'}
                            variant={m.completed_at ? 'ghost' : 'secondary'}
                            size="xs"
                          />
                          <ActionForm inline action={removeMilestoneAction} hidden={{ projectId: p.id, milestoneId: m.id }} submitLabel="Remove" variant="ghost" size="xs" confirm={`Remove the milestone ${m.name}?`} />
                        </div>
                      ) : null}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="f-card-pad muted text-13" style={{ margin: 0 }}>
                No milestones yet.
              </p>
            )}
            {canEdit ? (
              <ActionForm action={addMilestoneAction} hidden={{ projectId: p.id }} submitLabel="Add milestone" className="f-card-form" ariaLabel="Add a milestone">
                <div className="f-fields">
                  <Field label="Milestone" htmlFor="ms-name" className="f-wide" required>
                    <Input id="ms-name" name="name" placeholder="Design sign off" required />
                  </Field>
                  <Field label="Due" htmlFor="ms-due">
                    <Input id="ms-due" name="due_date" type="date" />
                  </Field>
                  <Field label="Bills, optional" htmlFor="ms-amount">
                    <Input id="ms-amount" name="amount" inputMode="decimal" className="mono" placeholder="1700" />
                  </Field>
                </div>
              </ActionForm>
            ) : null}
          </section>

          <section className="card" aria-labelledby="time-h">
            <div className="f-card-head-row">
              <h2 id="time-h" className="f-card-title">
                Time
              </h2>
              <span className="muted small">
                {formatMinutes(hours?.total_minutes ?? 0) || '0m'} logged, {formatMinutes(hours?.billable_minutes ?? 0) || '0m'} billable
              </span>
            </div>
            <ActionForm action={addTimeEntryAction} hidden={{ projectId: p.id }} submitLabel="Log time" className="f-card-form" ariaLabel="Log time">
              <div className="f-fields">
                <Field label="Who" htmlFor="te-user">
                  <Select id="te-user" name="user_id" options={lk.users} defaultValue={user.id} disabled={!canEdit} />
                </Field>
                <Field label="Day" htmlFor="te-date">
                  <Input id="te-date" name="work_date" type="date" defaultValue={today} max={today} required />
                </Field>
                <Field label="Hours" htmlFor="te-hours" hint="1.5 or 1:30" required>
                  <Input id="te-hours" name="hours" inputMode="decimal" className="mono" placeholder="1.5" required />
                </Field>
                <Field label="Note" htmlFor="te-note" className="f-wide">
                  <Input id="te-note" name="description" placeholder="Build, booking form" />
                </Field>
              </div>
              <label className="checkbox">
                <input type="checkbox" name="billable" defaultChecked />
                Billable
              </label>
              {!canEdit ? <input type="hidden" name="user_id" value={user.id} /> : null}
            </ActionForm>
            {entries.length ? (
              <div className="table-wrap">
                <table className="table" style={{ minWidth: 560 }}>
                  <caption className="sr-only">Time entries</caption>
                  <thead>
                    <tr>
                      <th scope="col">Day</th>
                      <th scope="col">Who</th>
                      <th scope="col">Note</th>
                      <th scope="col" className="num">
                        Time
                      </th>
                      <th scope="col">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {entries.map((e) => (
                      <tr key={e.id} className={e.billable ? undefined : 'is-muted'}>
                        <td className="mono nowrap">{formatDate(e.work_date)}</td>
                        <td>{e.user_name}</td>
                        <td>
                          {e.description ?? ''}
                          {!e.billable ? <span className="muted small"> Not billable</span> : e.invoice_line_id ? <span className="muted small"> Invoiced</span> : null}
                        </td>
                        <td className="num">{formatMinutes(e.minutes)}</td>
                        <td>
                          {!e.invoice_line_id && (e.user_id === user.id || canEdit) ? (
                            <ActionForm inline action={removeTimeEntryAction} hidden={{ projectId: p.id, entryId: e.id }} submitLabel="Remove" variant="ghost" size="xs" confirm="Remove this time entry?" />
                          ) : null}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="f-card-pad muted text-13" style={{ margin: 0 }}>
                No time logged yet.
              </p>
            )}
          </section>

          <section className="card" aria-labelledby="tasks-h">
            <div className="f-card-head-row">
              <h2 id="tasks-h" className="f-card-title">
                Tasks
              </h2>
              <Link href="/tasks" className="small">
                All tasks
              </Link>
            </div>
            {tasks.length ? (
              <ul className="f-list">
                {tasks.map((t) => (
                  <li key={t.id}>
                    <div className="f-list-main">
                      <Link href={`/tasks?task=${t.id}`} className="strong">
                        {t.title}
                      </Link>
                      <div className={`small ${t.is_overdue ? 'danger' : 'muted'}`}>
                        {formatDue(t.due_at, t.all_day)}, {t.owner_name ?? 'unassigned'}
                      </div>
                    </div>
                    <ActionForm inline action={completeLinkedTask} hidden={{ taskId: t.id, back: `/projects/${p.id}` }} submitLabel="Done" variant="secondary" size="xs" />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="f-card-pad muted text-13" style={{ margin: 0 }}>
                No open tasks on this project.
              </p>
            )}
            <ActionForm action={addProjectTask} hidden={{ projectId: p.id }} submitLabel="Add task" className="f-card-form" ariaLabel="Add a task">
              <div className="f-fields">
                <Field label="Task" htmlFor="pt-title" className="f-wide" required>
                  <Input id="pt-title" name="title" placeholder="Send the launch checklist to Eva" required />
                </Field>
                <Field label="Owner" htmlFor="pt-owner">
                  <Select id="pt-owner" name="owner_user_id" options={lk.users} defaultValue={p.owner_user_id ?? user.id} />
                </Field>
                <Field label="Due" htmlFor="pt-due">
                  <Input id="pt-due" name="due_date" type="date" />
                </Field>
              </div>
            </ActionForm>
          </section>

          <section aria-labelledby="tl-h" className="stack-sm">
            <h2 id="tl-h" className="section-label">
              Timeline
            </h2>
            <Timeline items={timeline} composer={{ action: addProjectNote, hidden: { projectId: p.id }, placeholder: 'Add a note about this project' }} />
          </section>
        </div>

        <aside className="record-right" aria-label="Linked records">
          {p.organization_id ? (
            <LinkedRecords title="Organization" href={`/organizations/${p.organization_id}`} items={[{ title: p.organization_name }]} />
          ) : null}
          {p.deal_id ? (
            <LinkedRecords
              title="Deal"
              href={`/deals/${p.deal_id}`}
              items={[{ title: p.deal_name, meta: [p.deal_amount ? formatMoney(p.deal_amount, p.deal_currency ?? 'EUR') : null, p.deal_stage].filter(Boolean).join(' · ') }]}
            />
          ) : null}
          <LinkedRecords
            title="Tickets"
            empty="No tickets on this project"
            items={tickets.map((t) => {
              const s = slas.get(t.id);
              return {
                title: `${t.number} · ${t.subject}`,
                href: `/tickets/${t.id}`,
                sub: `${t.stage_name}, ${labelOf(TICKET_PRIORITIES, t.priority).toLowerCase()} priority`,
                status: s ? { text: slaText(s.firstReply.stoppedAt ? s.resolution : s.firstReply, s.firstReply.stoppedAt ? 'resolution' : 'first_reply'), tone: SLA_TONES[(s.firstReply.stoppedAt ? s.resolution : s.firstReply).status] } : undefined,
              };
            })}
          />
          <LinkedRecords
            title="Invoices"
            empty="No invoices on this project"
            items={invoices.map((i) => ({
              title: i.external_number ?? (i.kind === 'credit_note' ? 'Draft credit note' : 'Draft invoice'),
              href: `/invoices/${i.id}`,
              sub: i.title ?? undefined,
              meta: i.total ? formatMoney(i.total, i.currency) : undefined,
              status: { text: `${labelOf(INVOICE_STATES, i.state)}${i.due_date && (i.state === 'open' || i.state === 'late') ? `, due ${formatDate(i.due_date)}` : ''}`, tone: toneOf(INVOICE_TONES, i.state) },
            }))}
          />
          <section className="rail-card">
            <h2 className="section-label">Who logged time</h2>
            {entries.length === 0 ? <div className="muted text-13">Nobody yet</div> : null}
            {[...new Set(entries.map((e) => e.user_id))].map((uid) => {
              const mins = entries.filter((e) => e.user_id === uid).reduce((a, e) => a + e.minutes, 0);
              return (
                <div key={uid} className="row-between text-13">
                  <span>{usersById.get(uid) ?? 'Former user'}</span>
                  <span className="mono">{formatMinutes(mins)}</span>
                </div>
              );
            })}
          </section>
        </aside>
      </div>
    </>
  );
}
