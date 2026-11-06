/**
 * /deals/[id], the Deal design: header with amount, close date, owner,
 * probability and weighted value; the clickable stage path with its gate;
 * deal details with inline edit and custom fields; line items, quote and VAT;
 * stage history; timeline; contacts with roles, next tasks and linked records.
 */
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { requireUser } from '@/lib/auth';
import { can } from '@/lib/permissions';
import { getTimeline } from '@/lib/activities';
import { stageGate } from '@/lib/stages';
import { customPropertyGroups, getFieldDefinitions, mergePropertyGroups, type PropertyGroup } from '@/lib/fields';
import { formatDate, formatDateLong, formatDateTime, formatDays, formatDue, formatMoney } from '@/lib/format';
import {
  BUYING_ROLES, DEAL_TYPES, FORECAST_CATEGORIES, LIFECYCLE_STAGES, LOST_REASONS, PRICING_MODELS, PRIORITIES, labelOf,
} from '@/lib/options';
import { automationEffects, getDeal, listUsers } from '@/lib/sales/queries';
import { RecordHeader, PropertiesPanel, Timeline } from '@/components/records';
import { ButtonLink } from '@/components/ui';
import { StagePath, type PathStage } from '@/components/sales/StagePath';
import { LineItems } from '@/components/sales/LineItems';
import { DealContacts } from '@/components/sales/DealContacts';
import { addDealNoteAction, updateDealAction } from '../actions';
import styles from '@/components/sales/sales.module.css';

export const dynamic = 'force-dynamic';

export default async function DealPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await requireUser();
  const { id } = await params;
  const record = await getDeal(id);
  if (!record) notFound();
  const { deal, stages, lines, quotes, contacts, history, tasks, products, projects } = record;
  const [users, timeline, defs, wonEffects, lostEffects] = await Promise.all([
    listUsers(),
    getTimeline('deal', id),
    getFieldDefinitions('deal'),
    automationEffects(['deal.won']),
    automationEffects(['deal.lost']),
  ]);
  const canEdit = can(user, 'edit', 'deal', deal);
  const current = stages.find((s) => s.id === deal.stage_id)!;
  const userOpts = users.map((u) => ({ value: u.id, label: u.name }));

  const pathStages: PathStage[] = await Promise.all(
    stages.map(async (s) => {
      const backwards = (current.state !== 'open' && s.state === 'open') || (s.state === 'open' && current.state === 'open' && s.position < current.position);
      return {
        id: s.id,
        name: s.name,
        state: s.state,
        position: s.position,
        sub: s.state === 'lost' ? 'Closed' : `${s.probability ?? 0}%`,
        fields: await stageGate('deal', id, s.id),
        needsReason: backwards,
        effects: s.state === 'won' ? wonEffects : s.state === 'lost' ? lostEffects : [],
      };
    }),
  );

  const money = (v: string | null) => (v ? formatMoney(v, deal.currency) : '');
  const sel = (key: string, label: string, value: string | null, options: { value: string; label: string }[]) => ({
    key, label, type: 'select' as const, value, display: labelOf(options, value), options,
  });
  const core: PropertyGroup[] = [
    {
      name: 'Deal details',
      fields: [
        { key: 'name', label: 'Name', type: 'text', value: deal.name, display: deal.name, required: true },
        { key: 'pipeline', label: 'Pipeline', type: 'readonly', value: deal.pipeline_name, display: `${deal.pipeline_name}, ${labelOf(DEAL_TYPES, deal.deal_type).toLowerCase()}`, editable: false },
        { key: 'amount', label: 'Amount', type: 'currency', value: deal.amount, display: deal.amount ? `${money(deal.amount)} excl. VAT` : '', mono: true, help: lines.length ? 'Follows the line items subtotal while the deal has lines' : undefined },
        sel('forecast_category', 'Forecast category', deal.forecast_category, FORECAST_CATEGORIES),
        { key: 'forecast_probability', label: 'Probability override', type: 'number', value: deal.forecast_probability, display: deal.forecast_probability !== null ? `${deal.forecast_probability}%` : '', help: `Leave empty to use the stage, ${current.probability ?? 0}%` },
        { key: 'close_date', label: 'Expected close', type: 'date', value: deal.close_date, display: deal.close_date ? formatDateLong(deal.close_date) : '' },
        { key: 'next_step', label: 'Next step', type: 'text', value: deal.next_step, display: deal.next_step ?? '' },
        { key: 'owner_user_id', label: 'Owner', type: 'user', value: deal.owner_user_id, display: deal.owner_name ?? '', options: userOpts },
        sel('deal_type', 'Deal type', deal.deal_type, DEAL_TYPES),
        sel('pricing_model', 'Pricing model', deal.pricing_model, PRICING_MODELS),
        sel('priority', 'Priority', deal.priority, PRIORITIES),
        { key: 'source', label: 'Source', type: 'text', value: deal.source, display: deal.source ?? '' },
        { key: 'angle', label: 'Angle', type: 'textarea', value: deal.angle, display: deal.angle ?? '' },
        { key: 'created', label: 'Created', type: 'readonly', value: null, display: formatDateLong(deal.created_at), editable: false },
      ],
    },
    {
      name: 'Stage fields',
      fields: [
        { key: 'meeting_at', label: 'Meeting date', type: 'datetime', value: deal.meeting_at ? deal.meeting_at.toISOString() : null, display: deal.meeting_at ? formatDateTime(deal.meeting_at) : '' },
        { key: 'build_card_url', label: 'Build card link', type: 'url', value: deal.build_card_url, display: deal.build_card_url ?? '', href: deal.build_card_url ?? undefined },
        { key: 'prototype_url', label: 'Prototype URL', type: 'url', value: deal.prototype_url, display: deal.prototype_url ?? '', href: deal.prototype_url ?? undefined },
        { key: 'quote_ref', label: 'Quote', type: 'text', value: deal.quote_ref, display: deal.quote_ref ?? '' },
        { key: 'decision_date', label: 'Decision date', type: 'date', value: deal.decision_date, display: deal.decision_date ? formatDateLong(deal.decision_date) : '' },
        { key: 'signer', label: 'Signer', type: 'text', value: deal.signer, display: deal.signer ?? '' },
        { key: 'start_date', label: 'Start date', type: 'date', value: deal.start_date, display: deal.start_date ? formatDateLong(deal.start_date) : '' },
        { key: 'won_reason', label: 'Won reason', type: 'text', value: deal.won_reason, display: deal.won_reason ?? '' },
        sel('lost_reason', 'Lost reason', deal.lost_reason, LOST_REASONS),
        { key: 'lost_competitor', label: 'Competitor or alternative', type: 'text', value: deal.lost_competitor, display: deal.lost_competitor ?? '' },
      ],
    },
  ];
  const groups = mergePropertyGroups(core, customPropertyGroups(defs, deal.custom, { users, editable: canEdit })).map((g) => ({
    ...g,
    fields: g.fields.map((f) => ({ ...f, editable: canEdit && f.editable !== false && f.type !== 'readonly' })),
  }));

  const isSample = (deal.custom as Record<string, unknown>)?.sample === true || (deal.custom as Record<string, unknown>)?.sample === 'true';
  const probLine = `${current.name} · ${deal.probability}% · weighted ${formatMoney(deal.weighted_amount, deal.currency, 0)}`;
  const crumbs = [{ label: deal.pipeline_name, href: `/pipelines?p=${deal.pipeline_key}` }];
  if (deal.organization_id && deal.org_name) crumbs.push({ label: deal.org_name, href: `/organizations/${deal.organization_id}` });

  return (
    <>
      <RecordHeader
        breadcrumb={crumbs}
        title={deal.name}
        subtitle={
          <span className={styles.headerFacts}>
            <span className={styles.headerAmount}>{deal.amount ? money(deal.amount) : 'No amount'}</span>
            <span>{deal.close_date ? `Close ${formatDate(deal.close_date)}` : 'No close date'}</span>
            <span>Owner {deal.owner_name?.split(' ')[0] ?? 'nobody'}</span>
            <span>{probLine}</span>
            {deal.is_rotting ? <span className="danger">Rotting, {formatDays(deal.days_in_stage)} in stage</span> : null}
          </span>
        }
        sample={isSample}
        actions={
          <>
            <ButtonLink href={`/tasks?new=1&deal=${deal.id}`}>New task</ButtonLink>
            <ButtonLink href="#timeline" variant="primary">
              Add note
            </ButtonLink>
          </>
        }
        tabs={
          <StagePath
            objectType="deal"
            recordId={deal.id}
            currentStageId={deal.stage_id}
            stages={pathStages}
            users={users.map((u) => ({ id: u.id, name: u.name }))}
            canEdit={canEdit}
          />
        }
      />
      <div className="record-body">
        <PropertiesPanel groups={groups} action={canEdit ? updateDealAction : undefined} hidden={{ id: deal.id }} label="Deal details" />

        <div className="record-main">
          <LineItems
            dealId={deal.id}
            lines={lines}
            quotes={quotes.map((q) => ({
              ...q,
              sent_at: q.sent_at ? new Date(q.sent_at).toISOString() : null,
              accepted_at: q.accepted_at ? new Date(q.accepted_at).toISOString() : null,
            }))}
            products={products}
            canEdit={canEdit}
          />

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

          <section id="timeline" aria-labelledby="tl-h" className="stack" style={{ gap: 12 }}>
            <h2 id="tl-h" className={styles.panelTitle}>
              Timeline
            </h2>
            <Timeline items={timeline} composer={{ action: addDealNoteAction, hidden: { dealId: deal.id }, placeholder: 'Add a note to this deal' }} />
          </section>
        </div>

        <div className="record-right">
          <DealContacts dealId={deal.id} contacts={contacts} canEdit={canEdit} />

          <section aria-labelledby="dt-h" className={styles.railCard}>
            <div className="row-between">
              <h2 id="dt-h" className="section-label">
                Next tasks
              </h2>
              <Link href={`/tasks?new=1&deal=${deal.id}`} className="small">
                Add
              </Link>
            </div>
            {tasks.length === 0 ? <span className="small danger">No next task. Plan the next step so the deal does not stall.</span> : null}
            {tasks.map((t) => (
              <div key={t.id} className="stack-sm" style={{ gap: 2 }}>
                <span className={styles.railName}>{t.title}</span>
                <span className={[styles.railSub, t.is_overdue ? styles.dueLate : ''].join(' ')}>
                  {[t.owner_name?.split(' ')[0], formatDue(t.due_at, t.all_day)].filter(Boolean).join(' · ')}
                </span>
              </div>
            ))}
          </section>

          <section aria-labelledby="dr-h" className={styles.railCard} style={{ gap: 8 }}>
            <h2 id="dr-h" className="section-label">
              Linked
            </h2>
            {deal.organization_id ? (
              <Link href={`/organizations/${deal.organization_id}`} className="text-13" style={{ fontSize: 14, textDecoration: 'none' }}>
                {deal.org_name}
                {deal.org_lifecycle ? `, ${labelOf(LIFECYCLE_STAGES, deal.org_lifecycle).toLowerCase()}` : ''}
              </Link>
            ) : (
              <span className="small muted">No organization</span>
            )}
            {projects.map((p) => (
              <Link key={p.id} href={`/projects/${p.id}`} style={{ fontSize: 14, textDecoration: 'none' }}>
                Project, {p.name}
              </Link>
            ))}
            {deal.prototype_url ? (
              <a href={deal.prototype_url} target="_blank" rel="noreferrer" style={{ fontSize: 14, textDecoration: 'none' }}>
                Prototype
              </a>
            ) : null}
            {deal.lead_id ? (
              <Link href={`/leads/${deal.lead_id}`} style={{ fontSize: 14, textDecoration: 'none' }}>
                Lead{deal.lead_qualified_at ? `, qualified ${formatDate(deal.lead_qualified_at)}` : ''}
              </Link>
            ) : null}
            {current.state === 'open' && wonEffects.length ? (
              <span className="small muted">When it is won, the automations {wonEffects.map((e) => e.charAt(0).toLowerCase() + e.slice(1)).join(', then ')}.</span>
            ) : null}
            {contacts.length ? null : <span className="small muted">Link a contact so {labelOf(BUYING_ROLES, 'decision_maker').toLowerCase()} and billing are known.</span>}
          </section>
        </div>
      </div>
    </>
  );
}
