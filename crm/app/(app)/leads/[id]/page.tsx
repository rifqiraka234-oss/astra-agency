/**
 * /leads/[id]: the contact and organization, the lead stage path, research
 * status, angle and worth, LinkedIn accepted date, stage history, timeline and
 * tasks. Qualify creates the deal, disqualify needs a reason.
 */
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { requireUser } from '@/lib/auth';
import { can } from '@/lib/permissions';
import { getTimeline } from '@/lib/activities';
import { stageGate } from '@/lib/stages';
import { customPropertyGroups, getFieldDefinitions, mergePropertyGroups, type PropertyGroup } from '@/lib/fields';
import { formatDate, formatDateTime, formatDays, formatDue, formatMoney } from '@/lib/format';
import { DISQUALIFY_REASONS, LEAD_LABELS, RESEARCH_STATUSES, RESEARCH_TONES, labelOf, toneOf } from '@/lib/options';
import { getLead, listUsers, salesPipelines, stagesOf } from '@/lib/sales/queries';
import { RecordHeader, PropertiesPanel, Timeline, type HeaderBadge } from '@/components/records';
import { StagePath, type PathStage } from '@/components/sales/StagePath';
import { LeadActions } from '@/components/sales/LeadActions';
import { addLeadNoteAction, updateLeadAction } from '../actions';
import styles from '@/components/sales/sales.module.css';

export const dynamic = 'force-dynamic';

export default async function LeadPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await requireUser();
  const { id } = await params;
  const record = await getLead(id);
  if (!record) notFound();
  const { lead, stages, history, tasks } = record;
  const [users, timeline, defs, pipelines] = await Promise.all([listUsers(), getTimeline('lead', id), getFieldDefinitions('lead'), salesPipelines()]);
  const salesPipe = pipelines.find((p) => p.key === 'sales');
  const firstSales = salesPipe ? (await stagesOf(salesPipe.id)).find((s) => s.state === 'open') ?? null : null;
  const canEdit = can(user, 'edit', 'lead', lead);
  const current = stages.find((s) => s.id === lead.stage_id)!;
  const title = lead.contact_name ?? lead.name ?? lead.org_name ?? 'Untitled lead';
  const userOpts = users.map((u) => ({ value: u.id, label: u.name }));
  const gateUsers = users.map((u) => ({ id: u.id, name: u.name }));

  const pathStages: PathStage[] = await Promise.all(
    stages.map(async (s) => ({
      id: s.id,
      name: s.name,
      state: s.state,
      position: s.position,
      sub: s.state === 'won' ? 'Creates a deal' : s.state === 'lost' ? 'Reason required' : s.rot_days ? `Stalls after ${s.rot_days} days` : 'Open',
      fields: await stageGate('lead', id, s.id),
      needsReason: (current.state !== 'open' && s.state === 'open') || (s.state === 'open' && current.state === 'open' && s.position < current.position),
      effects: [],
    })),
  );

  const dt = (d: Date | null) => (d ? d.toISOString() : null);
  const core: PropertyGroup[] = [
    {
      name: 'Lead',
      fields: [
        { key: 'owner_user_id', label: 'Owner', type: 'user', value: lead.owner_user_id, display: lead.owner_name ?? '', options: userOpts },
        { key: 'research_status', label: 'Research status', type: 'select', value: lead.research_status, display: labelOf(RESEARCH_STATUSES, lead.research_status), options: RESEARCH_STATUSES },
        { key: 'label', label: 'Temperature', type: 'select', value: lead.label, display: labelOf(LEAD_LABELS, lead.label), options: LEAD_LABELS },
        { key: 'status_note', label: 'Board chip', type: 'text', value: lead.status_note, display: lead.status_note ?? '', help: 'Short text on the board card, for example Our turn' },
        { key: 'next_step', label: 'Next step', type: 'text', value: lead.next_step, display: lead.next_step ?? '' },
        { key: 'source', label: 'Source', type: 'text', value: lead.source, display: lead.source ?? '' },
        { key: 'campaign', label: 'Campaign', type: 'text', value: lead.campaign, display: lead.campaign ?? '' },
        { key: 'auto_progress_enabled', label: 'Auto progress', type: 'checkbox', value: lead.auto_progress_enabled, display: lead.auto_progress_enabled ? 'On, a reply moves it to Connected' : 'Off', help: 'When on, a confirmed reply moves the lead to Connected' },
        { key: 'name', label: 'Label', type: 'text', value: lead.name, display: lead.name ?? '', help: 'Optional, the board shows the contact name' },
      ],
    },
    {
      name: 'Research',
      fields: [
        { key: 'angle', label: 'Angle', type: 'textarea', value: lead.angle, display: lead.angle ?? '' },
        { key: 'angle_worth_eur', label: 'Worth', type: 'currency', value: lead.angle_worth_eur, display: lead.angle_worth_eur ? `${formatMoney(lead.angle_worth_eur)} or more, the project` : '', mono: true },
        { key: 'linkedin_accepted_at', label: 'LinkedIn accepted', type: 'datetime', value: dt(lead.linkedin_accepted_at), display: lead.linkedin_accepted_at ? formatDateTime(lead.linkedin_accepted_at) : '' },
        { key: 'opener_sent_at', label: 'Opener sent', type: 'datetime', value: dt(lead.opener_sent_at), display: lead.opener_sent_at ? formatDateTime(lead.opener_sent_at) : '' },
      ],
    },
  ];
  const groups = mergePropertyGroups(core, customPropertyGroups(defs, lead.custom, { users, editable: canEdit })).map((g) => ({
    ...g,
    fields: g.fields.map((f) => ({ ...f, editable: canEdit && f.editable !== false && f.type !== 'readonly' })),
  }));

  const badges: HeaderBadge[] = [
    { label: current.name, tone: current.state === 'won' ? 'green' : current.state === 'lost' ? 'red' : 'blue', strong: true },
    { label: labelOf(RESEARCH_STATUSES, lead.research_status), tone: toneOf(RESEARCH_TONES, lead.research_status) },
  ];
  if (lead.label) badges.push({ label: labelOf(LEAD_LABELS, lead.label), tone: lead.label === 'hot' ? 'red' : lead.label === 'warm' ? 'amber' : 'grey' });
  if (lead.disqualify_reason && current.state === 'lost') badges.push({ label: labelOf(DISQUALIFY_REASONS, lead.disqualify_reason), tone: 'red' });
  if (lead.contact_dnc) badges.push({ label: 'Do not contact', tone: 'red', strong: true });
  if (lead.is_rotting) badges.push({ label: `${formatDays(lead.days_in_stage)} in ${current.name}, stalled`, tone: 'red' });

  const isSample = (lead.custom as Record<string, unknown>)?.sample === true || (lead.custom as Record<string, unknown>)?.sample === 'true';
  const crumbs = [{ label: lead.pipeline_name, href: '/pipelines?p=lead' }, { label: 'Leads', href: '/leads' }];
  const qualifyLead = { id: lead.id, title, orgName: lead.org_name, worth: lead.angle_worth_eur, ownerId: lead.owner_user_id };
  const firstStage = firstSales ? { name: firstSales.name, required: firstSales.required } : null;

  return (
    <>
      <RecordHeader
        breadcrumb={crumbs}
        title={title}
        subtitle={[lead.contact_title, lead.org_name].filter(Boolean).join(' at ') || undefined}
        badges={badges}
        sample={isSample}
        actions={
          canEdit ? (
            <LeadActions
              lead={qualifyLead}
              firstSalesStage={firstStage}
              users={gateUsers}
              canQualify={current.state !== 'won' && !lead.converted_deal_id && !lead.contact_dnc}
              canDisqualify={current.state !== 'lost'}
            />
          ) : null
        }
        tabs={
          <StagePath
            objectType="lead"
            recordId={lead.id}
            currentStageId={lead.stage_id}
            stages={pathStages}
            users={gateUsers}
            canEdit={canEdit}
            lead={{ ...qualifyLead, converted: Boolean(lead.converted_deal_id) }}
            firstSalesStage={firstStage}
          />
        }
      />
      <div className="record-body">
        <PropertiesPanel groups={groups} action={canEdit ? updateLeadAction : undefined} hidden={{ id: lead.id }} label="Lead details" />

        <div className="record-main">
          <section aria-labelledby="angle-h" className={styles.panel}>
            <div className={styles.panelHead}>
              <h2 id="angle-h" className={styles.panelTitle}>
                Angle
              </h2>
              {lead.angle_worth_eur ? <span className="mono">{formatMoney(lead.angle_worth_eur)} or more</span> : null}
            </div>
            <div className={styles.panelBody}>
              {lead.angle ? <p className={styles.angle}>{lead.angle}</p> : <p className="muted" style={{ margin: 0 }}>No angle yet. Research first, then write the costliest proven pain here.</p>}
              <dl className={styles.factList}>
                <div>
                  <dt>Research status</dt>
                  <dd>{labelOf(RESEARCH_STATUSES, lead.research_status)}</dd>
                </div>
                <div>
                  <dt>LinkedIn accepted</dt>
                  <dd>{lead.linkedin_accepted_at ? formatDate(lead.linkedin_accepted_at) : 'Not recorded'}</dd>
                </div>
                <div>
                  <dt>Opener sent</dt>
                  <dd>{lead.opener_sent_at ? formatDate(lead.opener_sent_at) : 'Not yet'}</dd>
                </div>
                <div>
                  <dt>Time in {current.name}</dt>
                  <dd>{formatDays(lead.days_in_stage)}</dd>
                </div>
              </dl>
            </div>
          </section>

          <section id="timeline" aria-labelledby="tl-h" className="stack" style={{ gap: 12 }}>
            <h2 id="tl-h" className={styles.panelTitle}>
              Timeline
            </h2>
            <Timeline items={timeline} composer={{ action: addLeadNoteAction, hidden: { leadId: lead.id }, placeholder: 'Add a research note to this lead' }} />
          </section>

          <section aria-labelledby="sh-h" className={styles.panel}>
            <div className={styles.panelHead}>
              <h2 id="sh-h" className={styles.panelTitle}>
                Stage history
              </h2>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table className={styles.lines} style={{ minWidth: 520 }}>
                <thead>
                  <tr>
                    <th scope="col">Stage</th>
                    <th scope="col">Entered</th>
                    <th scope="col">Time in stage</th>
                    <th scope="col">Moved by</th>
                  </tr>
                </thead>
                <tbody>
                  {history.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="muted">
                        No stage changes recorded yet
                      </td>
                    </tr>
                  ) : (
                    history.map((h) => (
                      <tr key={h.id}>
                        <td>
                          {h.stage_name}
                          {h.reason ? <div className={styles.lineNote}>Moved back. {h.reason}</div> : null}
                        </td>
                        <td>{formatDate(h.changed_at)}</td>
                        <td>{h.left_at ? formatDays(h.days) : `${formatDays(h.days)} so far`}</td>
                        <td>{h.actor_name?.split(' ')[0] ?? 'System'}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        <div className="record-right">
          <section aria-labelledby="lc-h" className={styles.railCard}>
            <h2 id="lc-h" className="section-label">
              Contact
            </h2>
            {lead.contact_id ? (
              <div className="stack-sm" style={{ gap: 4 }}>
                <Link href={`/contacts/${lead.contact_id}`} className={styles.railName} style={{ textDecoration: 'none' }}>
                  {lead.contact_name}
                </Link>
                {lead.contact_title ? <span className={styles.railSub}>{lead.contact_title}</span> : null}
                {lead.contact_tagline ? <span className={styles.railSub}>{lead.contact_tagline}</span> : null}
                {lead.contact_email ? <span className="small">{lead.contact_email}</span> : null}
                {lead.contact_linkedin ? (
                  <a href={lead.contact_linkedin.startsWith('http') ? lead.contact_linkedin : `https://${lead.contact_linkedin}`} target="_blank" rel="noreferrer" className="small">
                    LinkedIn profile
                  </a>
                ) : null}
                {lead.contact_dnc ? <span className="small danger">On the suppression list, never contact</span> : null}
              </div>
            ) : (
              <span className="small muted">No contact linked</span>
            )}
          </section>

          <section aria-labelledby="lo-h" className={styles.railCard}>
            <h2 id="lo-h" className="section-label">
              Organization
            </h2>
            {lead.organization_id ? (
              <div className="stack-sm" style={{ gap: 4 }}>
                <Link href={`/organizations/${lead.organization_id}`} className={styles.railName} style={{ textDecoration: 'none' }}>
                  {lead.org_name}
                </Link>
                <span className={styles.railSub}>{[lead.org_domain, lead.org_city, lead.org_industry].filter(Boolean).join(', ') || 'No details yet'}</span>
              </div>
            ) : (
              <span className="small muted">No organization linked</span>
            )}
          </section>

          {lead.converted_deal_id ? (
            <section aria-labelledby="ld-h" className={styles.railCard}>
              <h2 id="ld-h" className="section-label">
                Deal
              </h2>
              <Link href={`/deals/${lead.converted_deal_id}`} className={styles.railName} style={{ textDecoration: 'none' }}>
                {lead.converted_deal_name}
              </Link>
              {lead.qualified_at ? <span className={styles.railSub}>Qualified {formatDate(lead.qualified_at)}</span> : null}
            </section>
          ) : null}

          <section aria-labelledby="lt-h" className={styles.railCard}>
            <div className="row-between">
              <h2 id="lt-h" className="section-label">
                Tasks
              </h2>
              <Link href={`/tasks?new=1&lead=${lead.id}`} className="small">
                Add
              </Link>
            </div>
            {tasks.length === 0 ? <span className="small muted">No open tasks</span> : null}
            {tasks.map((t) => (
              <div key={t.id} className="stack-sm" style={{ gap: 2 }}>
                <span className={styles.railName}>{t.title}</span>
                <span className={[styles.railSub, t.is_overdue ? styles.dueLate : ''].join(' ')}>
                  {[t.owner_name?.split(' ')[0], formatDue(t.due_at, t.all_day)].filter(Boolean).join(' · ')}
                </span>
              </div>
            ))}
          </section>
        </div>
      </div>
    </>
  );
}
