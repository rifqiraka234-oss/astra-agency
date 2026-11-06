import Link from 'next/link';
import { notFound } from 'next/navigation';
import '@/components/delivery/f.css';
import { requireUser } from '@/lib/auth';
import { can } from '@/lib/permissions';
import { sql } from '@/lib/db';
import { getTimeline } from '@/lib/activities';
import { customPropertyGroups, getFieldDefinitions, mergePropertyGroups, type PropertyGroup } from '@/lib/fields';
import { formatDateTime, formatMinutes, formatRelativeDay } from '@/lib/format';
import { PRIORITY_TONES, TICKET_PRIORITIES, TICKET_SOURCES, labelOf, toneOf } from '@/lib/options';
import { pipelineStages } from '@/lib/stages';
import { ticketSla } from '@/lib/service/tickets';
import { SLA_TONES, slaText, type SlaClock } from '@/lib/service/sla';
import { lookups } from '@/lib/delivery/lookups';
import { Badge, Textarea } from '@/components/ui';
import { LinkedRecords, PropertiesPanel, RecordHeader, Timeline } from '@/components/records';
import { ActionForm } from '@/components/delivery/ActionForm';
import { StagePath } from '@/components/delivery/StagePath';
import { addTicketNote, moveTicketStage, ticketComposerAction, updateTicketProperties } from '../actions';

export const metadata = { title: 'Ticket' };

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

type TicketRow = {
  id: string;
  number: number;
  subject: string;
  description: string | null;
  priority: string;
  category: string | null;
  source: string;
  organization_id: string | null;
  organization_name: string | null;
  contact_id: string | null;
  contact_name: string | null;
  contact_title: string | null;
  project_id: string | null;
  project_name: string | null;
  owner_user_id: string | null;
  owner_name: string | null;
  stage_id: string;
  stage_name: string;
  stage_state: string;
  stage_pauses: boolean;
  opened_at: Date;
  first_replied_at: Date | null;
  closed_at: Date | null;
  policy_name: string | null;
  first_reply_minutes: number | null;
  resolve_minutes: number | null;
  custom: Record<string, unknown>;
};

function Clock({ title, clock, kind, targetLabel }: { title: string; clock: SlaClock; kind: 'first_reply' | 'resolution'; targetLabel: string }) {
  const tone = SLA_TONES[clock.status];
  return (
    <div className="f-sla-clock">
      <span className="muted small">{title}</span>
      <span className={`f-sla-${tone}`} style={{ fontSize: 16 }}>
        {slaText(clock, kind)}
      </span>
      <span className="muted small">
        Target {targetLabel}
        {clock.dueAt && !clock.stoppedAt ? `, due ${formatRelativeDay(clock.dueAt, { time: true })}` : ''}
        {clock.stoppedAt ? `, stopped ${formatDateTime(clock.stoppedAt)}` : ''}
      </span>
    </div>
  );
}

export default async function TicketPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!UUID.test(id)) notFound();
  const user = await requireUser();
  const [tk] = await sql<TicketRow[]>`
    select tk.*, o.name as organization_name, c.full_name as contact_name, c.job_title as contact_title, p.name as project_name,
           u.name as owner_name, s.name as stage_name, s.state as stage_state, s.pauses_sla as stage_pauses,
           sp.name as policy_name, sp.first_reply_minutes, sp.resolve_minutes
      from tickets tk
      join pipeline_stages s on s.id = tk.stage_id
      left join organizations o on o.id = tk.organization_id
      left join contacts c on c.id = tk.contact_id
      left join projects p on p.id = tk.project_id
      left join users u on u.id = tk.owner_user_id
      left join sla_policies sp on sp.id = coalesce(tk.sla_policy_id, (select id from sla_policies where priority = tk.priority and is_default))
     where tk.id = ${id} and tk.deleted_at is null`;
  if (!tk) notFound();

  const [stages, sla, history, timeline, lk, defs] = await Promise.all([
    pipelineStages('tickets'),
    ticketSla(sql, id),
    sql<{ id: string; to_name: string; from_name: string | null; pauses_sla: boolean; actor_name: string | null; changed_at: Date }[]>`
      select e.id::text, ts.name as to_name, fs.name as from_name, e.pauses_sla, u.name as actor_name, e.changed_at
        from ticket_status_events e
        join pipeline_stages ts on ts.id = e.to_stage_id
        left join pipeline_stages fs on fs.id = e.from_stage_id
        left join users u on u.id = e.actor_user_id
       where e.ticket_id = ${id} order by e.changed_at, e.id`,
    getTimeline('ticket', id),
    lookups(['orgs', 'users', 'contacts', 'projects']),
    getFieldDefinitions('ticket'),
  ]);
  const canEdit = can(user, 'edit', 'ticket', tk);
  const isSample = tk.custom?.sample === true;
  const now = new Date();

  const core: PropertyGroup[] = [
    {
      name: 'Ticket',
      fields: [
        { key: 'subject', label: 'Subject', type: 'text', value: tk.subject, display: tk.subject, required: true },
        { key: 'priority', label: 'Priority', type: 'select', value: tk.priority, display: labelOf(TICKET_PRIORITIES, tk.priority), options: TICKET_PRIORITIES, required: true, help: 'Changing it swaps the SLA targets' },
        { key: 'category', label: 'Category', type: 'text', value: tk.category, display: tk.category ?? '' },
        { key: 'source', label: 'Source', type: 'select', value: tk.source, display: labelOf(TICKET_SOURCES, tk.source), options: TICKET_SOURCES, required: true },
        { key: 'owner_user_id', label: 'Owner', type: 'user', value: tk.owner_user_id, display: tk.owner_name ?? '', options: lk.users },
        { key: 'description', label: 'Description', type: 'textarea', value: tk.description, display: tk.description ?? '' },
      ],
    },
    {
      name: 'Links',
      fields: [
        { key: 'organization_id', label: 'Organization', type: 'select', value: tk.organization_id, display: tk.organization_name ?? '', href: tk.organization_id ? `/organizations/${tk.organization_id}` : undefined, options: lk.orgs },
        { key: 'contact_id', label: 'Contact', type: 'select', value: tk.contact_id, display: tk.contact_name ?? '', href: tk.contact_id ? `/contacts/${tk.contact_id}` : undefined, options: lk.contacts },
        { key: 'project_id', label: 'Project', type: 'select', value: tk.project_id, display: tk.project_name ?? '', href: tk.project_id ? `/projects/${tk.project_id}` : undefined, options: lk.projects },
      ],
    },
    {
      name: 'Timing',
      editable: false,
      fields: [
        { key: 'opened_at', label: 'Opened', type: 'readonly', value: null, display: formatDateTime(tk.opened_at), editable: false },
        { key: 'first_replied_at', label: 'First reply', type: 'readonly', value: null, display: tk.first_replied_at ? formatDateTime(tk.first_replied_at) : 'Not yet', editable: false },
        { key: 'closed_at', label: 'Closed', type: 'readonly', value: null, display: tk.closed_at ? formatDateTime(tk.closed_at) : '', editable: false },
        { key: 'policy', label: 'SLA policy', type: 'readonly', value: null, display: tk.policy_name ?? 'None', editable: false },
      ],
    },
  ];
  const groups = mergePropertyGroups(core, customPropertyGroups(defs, tk.custom, { users: lk.users.map((u) => ({ id: u.value, name: u.label })), editable: canEdit }));

  const pathStages = stages.map((s) => ({ id: s.id, name: s.name, state: s.state, position: s.position, hint: s.pauses_sla ? 'Pauses SLA' : undefined }));
  const headClock = sla ? (sla.firstReply.stoppedAt ? { c: sla.resolution, k: 'resolution' as const } : { c: sla.firstReply, k: 'first_reply' as const }) : null;

  return (
    <>
      <RecordHeader
        breadcrumb={[{ label: 'Tickets', href: '/tickets' }, ...(tk.organization_id ? [{ label: tk.organization_name ?? 'Organization', href: `/organizations/${tk.organization_id}` }] : []), { label: String(tk.number) }]}
        title={
          <>
            <span className="mono">{tk.number}</span> {tk.subject}
          </>
        }
        subtitle={
          <span className="row" style={{ gap: 14 }}>
            <span>Opened {formatDateTime(tk.opened_at)}</span>
            <span>Owner {tk.owner_name ?? 'not set'}</span>
            {headClock && tk.stage_state === 'open' ? <span className={`f-sla-${SLA_TONES[headClock.c.status]}`}>{slaText(headClock.c, headClock.k)}</span> : null}
          </span>
        }
        badges={[
          { label: tk.stage_name, tone: tk.stage_state === 'closed' ? 'grey' : tk.stage_pauses ? 'amber' : 'blue', strong: true },
          { label: `${labelOf(TICKET_PRIORITIES, tk.priority)} priority`, tone: toneOf(PRIORITY_TONES, tk.priority) },
          { label: labelOf(TICKET_SOURCES, tk.source) },
        ]}
        sample={isSample}
        tabs={
          <div className="f-header-path">
            <StagePath label="Ticket status" stages={pathStages} currentId={tk.stage_id} action={moveTicketStage} recordId={tk.id} canEdit={canEdit} />
          </div>
        }
      />
      <div className="record-body">
        <PropertiesPanel groups={groups} action={canEdit ? updateTicketProperties : undefined} hidden={{ id: tk.id }} label="Ticket properties" />

        <div className="record-main">
          <section className="card" aria-labelledby="sla-h">
            <div className="f-card-head-row">
              <h2 id="sla-h" className="f-card-title">
                SLA
              </h2>
              <span className="muted small">Mon to Fri 09:00 to 17:30, Amsterdam. Waiting on client pauses the clock.</span>
            </div>
            <div className="f-card-pad">
              {sla && tk.first_reply_minutes !== null && tk.resolve_minutes !== null ? (
                <div className="f-sla">
                  <Clock title="First reply" clock={sla.firstReply} kind="first_reply" targetLabel={formatMinutes(tk.first_reply_minutes)} />
                  <Clock title="Resolution" clock={sla.resolution} kind="resolution" targetLabel={formatMinutes(tk.resolve_minutes)} />
                </div>
              ) : (
                <p className="muted text-13" style={{ margin: 0 }}>
                  No SLA policy for this priority.
                </p>
              )}
            </div>
          </section>

          <section className="card" aria-labelledby="compose-h">
            <div className="f-card-head-row">
              <h2 id="compose-h" className="f-card-title">
                Reply or note
              </h2>
              <span className="muted small">The CRM does not send anything. Log the reply you sent so the SLA and timeline know.</span>
            </div>
            <ActionForm action={ticketComposerAction} hidden={{ ticketId: tk.id }} submitLabel="Save" className="f-composer" ariaLabel="Reply or note">
              <div className="row" role="radiogroup" aria-label="Kind of entry" style={{ gap: 14 }}>
                <label className="checkbox">
                  <input type="radio" name="mode" value="reply" defaultChecked={canEdit} disabled={!canEdit} />
                  Reply to {tk.contact_name ?? 'the client'}
                </label>
                <label className="checkbox">
                  <input type="radio" name="mode" value="note" defaultChecked={!canEdit} />
                  Internal note
                </label>
              </div>
              <label htmlFor="tk-body" className="sr-only">
                Text
              </label>
              <Textarea id="tk-body" name="body" rows={4} required placeholder={tk.first_replied_at ? 'What you told the client, or a note for the team' : 'Your first reply to the client stops the first reply clock'} />
              {canEdit && tk.stage_state === 'open' ? (
                <label className="checkbox">
                  <input type="checkbox" name="wait" />
                  Set the status to Waiting on client after a reply
                </label>
              ) : null}
            </ActionForm>
          </section>

          <section className="card" aria-labelledby="hist-h">
            <div className="f-card-head-row">
              <h2 id="hist-h" className="f-card-title">
                Status history
              </h2>
            </div>
            <div className="table-wrap">
              <table className="table" style={{ minWidth: 520 }}>
                <caption className="sr-only">Status history</caption>
                <thead>
                  <tr>
                    <th scope="col">Status</th>
                    <th scope="col">Entered</th>
                    <th scope="col">Time in status</th>
                    <th scope="col">By</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((h, i) => {
                    const next = history[i + 1]?.changed_at ?? (tk.stage_state === 'open' ? now : null);
                    const mins = next ? Math.round((new Date(next).getTime() - new Date(h.changed_at).getTime()) / 60000) : null;
                    return (
                      <tr key={h.id}>
                        <td>
                          {h.to_name}
                          {h.pauses_sla ? <span className="muted small"> SLA paused</span> : null}
                        </td>
                        <td className="mono nowrap">{formatDateTime(h.changed_at)}</td>
                        <td className="mono">{mins === null ? '' : `${formatMinutes(mins)}${!history[i + 1] ? ' so far' : ''}`}</td>
                        <td>{h.actor_name ?? 'System'}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>

          <section aria-labelledby="tl-h" className="stack-sm">
            <h2 id="tl-h" className="section-label">
              Timeline
            </h2>
            <Timeline items={timeline} composer={{ action: addTicketNote, hidden: { ticketId: tk.id }, placeholder: 'Add an internal note' }} />
          </section>
        </div>

        <aside className="record-right" aria-label="Linked records">
          {tk.organization_id ? <LinkedRecords title="Organization" href={`/organizations/${tk.organization_id}`} items={[{ title: tk.organization_name }]} /> : null}
          {tk.contact_id ? (
            <LinkedRecords
              title="Contact"
              items={[{ title: tk.contact_name, sub: tk.contact_title ?? undefined, href: `/contacts/${tk.contact_id}`, avatar: { name: tk.contact_name ?? '?' } }]}
            />
          ) : null}
          {tk.project_id ? <LinkedRecords title="Project" href={`/projects/${tk.project_id}`} items={[{ title: tk.project_name }]} /> : null}
          {!tk.organization_id && !tk.contact_id && !tk.project_id ? (
            <section className="rail-card">
              <h2 className="section-label">Linked records</h2>
              <div className="muted text-13">Link an organization, contact or project in Links.</div>
            </section>
          ) : null}
          <section className="rail-card">
            <h2 className="section-label">Priority targets</h2>
            <div className="text-13 secondary">
              {tk.first_reply_minutes !== null ? `First reply within ${formatMinutes(tk.first_reply_minutes)}, close within ${formatMinutes(tk.resolve_minutes)} of business time.` : 'No policy.'}
            </div>
            <Badge tone={toneOf(PRIORITY_TONES, tk.priority)}>{labelOf(TICKET_PRIORITIES, tk.priority)}</Badge>
          </section>
          <Link href="/tickets" className="small">
            Back to all tickets
          </Link>
        </aside>
      </div>
    </>
  );
}
