/**
 * lib/sales/backfill.ts, two one off repairs for imported data, both safe to rerun.
 * scripts/backfill-sales.ts runs them and prints the counts.
 *
 *   const reasons = await backfillDisqualifyReasons(t);   // close_reason to a disqualify reason
 *   const history = await backfillLeadTransitions(t);     // stage history from stored evidence
 *
 * Reasons. Imported disqualified leads with no disqualify_reason get the reason
 * their custom.close_reason stands for (CLOSE_TO_DISQUALIFY). Anything else stays
 * empty and is listed, never guessed. Lost deals with no reason are listed too.
 *
 * Stage history. Imported leads (JSONL import, lemlist sync) only carry the one
 * transition the import wrote, dated the day of the import. The dates already
 * stored say more:
 *   New          leads.linkedin_accepted_at, else the LinkedIn accepted activity
 *   Attempting   leads.opener_sent_at, else the first real outbound message
 *   Connected    the first inbound message after the opener
 *   Closed stage the research note recorded with the lead's final queue status
 *                (the date of that status change), when it has a real date
 * Researching has no stored date, so it gets none. Each piece of evidence becomes
 * a transition with source 'backfill' and actor 'system', only before the record's
 * first recorded transition, only for stages up to that transition's stage, and
 * only in pipeline order with dates that never go back. Contact level activities
 * count only when the contact has this one lead. A stage that already has a
 * backfill transition is skipped, so a rerun adds nothing.
 */
import type { Tx } from '../db';
import { CLOSE_TO_DISQUALIFY } from '../integrations/status-map';

// ---------------------------------------------------------------- reasons

export type ReasonCount = { reason: string | null; count: number };

export type ReasonBackfillReport = {
  before: ReasonCount[];
  after: ReasonCount[];
  updated: Record<string, number>;
  leadsWithoutReason: { id: string; title: string; queue_status: string | null; close_reason: string | null }[];
  dealsWithoutReason: { id: string; name: string; pipeline: string; stage: string }[];
};

async function disqualifiedCounts(t: Tx): Promise<ReasonCount[]> {
  return t<ReasonCount[]>`
    select l.disqualify_reason as reason, count(*)::int as count
      from leads l join pipeline_stages s on s.id = l.stage_id
     where l.deleted_at is null and s.state = 'lost'
     group by l.disqualify_reason order by count desc, reason nulls first`;
}

export async function backfillDisqualifyReasons(t: Tx): Promise<ReasonBackfillReport> {
  const before = await disqualifiedCounts(t);
  const updated: Record<string, number> = {};
  for (const [close, reason] of Object.entries(CLOSE_TO_DISQUALIFY)) {
    const res = await t`
      update leads l set disqualify_reason = ${reason}
        from pipeline_stages s
       where s.id = l.stage_id and s.state = 'lost' and l.deleted_at is null
         and l.disqualify_reason is null and l.custom ->> 'close_reason' = ${close}
         and exists (select 1 from reason_options o where o.object_type = 'lead_disqualify' and o.key = ${reason} and not o.is_archived)`;
    if (res.count) updated[`${close} to ${reason}`] = res.count;
  }
  const after = await disqualifiedCounts(t);
  const leadsWithoutReason = await t<ReasonBackfillReport['leadsWithoutReason']>`
    select l.id::text, coalesce(c.full_name, l.name, o.name, 'Untitled lead') as title,
           l.custom ->> 'queue_status' as queue_status, l.custom ->> 'close_reason' as close_reason
      from leads l join pipeline_stages s on s.id = l.stage_id
      left join contacts c on c.id = l.contact_id
      left join organizations o on o.id = l.organization_id
     where l.deleted_at is null and s.state = 'lost' and l.disqualify_reason is null
     order by title`;
  const dealsWithoutReason = await t<ReasonBackfillReport['dealsWithoutReason']>`
    select d.id::text, d.name, p.name as pipeline, s.name as stage
      from deals d join pipeline_stages s on s.id = d.stage_id join pipelines p on p.id = d.pipeline_id
     where d.deleted_at is null and s.state = 'lost' and d.lost_reason is null
     order by d.name`;
  return { before, after, updated, leadsWithoutReason, dealsWithoutReason };
}

// ---------------------------------------------------------------- stage history

type Stage = { id: string; key: string; name: string; position: number; state: string };

type Evidence = {
  id: string;
  stage_id: string;
  anchor_stage_id: string | null;
  anchor_at: Date | null;
  accepted_at: Date | null;
  opener_at: Date | null;
  reply_at: Date | null;
  status_at: Date | null;
  backfilled: string[];
};

export type TransitionBackfillReport = {
  leadsChecked: number;
  leadsChanged: number;
  created: Record<string, number>;
  dropped: { afterRecordedHistory: number; outOfOrder: number; pastFirstStage: number };
  /** Import time rows removed because the backfill already dated that stage. */
  collapsed?: number;
};

export type PlannedTransition = { stageId: string; fromStageId: string | null; at: Date; evidence: string };

/**
 * The transitions to add for one lead, from its evidence. Pure, so the rules are
 * tested without a database.
 */
export function planLeadTransitions(
  stages: Stage[],
  e: Omit<Evidence, 'id'>,
  now: Date,
  dropped: TransitionBackfillReport['dropped'] = { afterRecordedHistory: 0, outOfOrder: 0, pastFirstStage: 0 },
): PlannedTransition[] {
  const byKey = new Map(stages.map((s) => [s.key, s]));
  const anchor = stages.find((s) => s.id === (e.anchor_stage_id ?? e.stage_id));
  if (!anchor) return [];
  const anchorAt = e.anchor_at ?? now;
  const candidates: { stage: Stage | undefined; at: Date | null; evidence: string }[] = [
    { stage: byKey.get('new'), at: e.accepted_at, evidence: 'LinkedIn accepted date' },
    { stage: byKey.get('attempting'), at: e.opener_at, evidence: 'opener sent date' },
    { stage: byKey.get('connected'), at: e.reply_at, evidence: 'first reply' },
  ];
  if (anchor.state !== 'open') candidates.push({ stage: anchor, at: e.status_at, evidence: 'status change date' });
  const plan: PlannedTransition[] = [];
  let last: { stageId: string; at: Date } | null = null;
  for (const c of candidates) {
    if (!c.stage || !c.at) continue;
    const allowed = anchor.state === 'open' ? c.stage.state === 'open' && c.stage.position <= anchor.position : c.stage.state === 'open' || c.stage.id === anchor.id;
    if (!allowed) {
      dropped.pastFirstStage++;
      continue;
    }
    if (c.at.getTime() > anchorAt.getTime()) {
      dropped.afterRecordedHistory++;
      continue;
    }
    if (last && c.at.getTime() < last.at.getTime()) {
      dropped.outOfOrder++;
      continue;
    }
    const fromStageId: string | null = last ? last.stageId : null;
    last = { stageId: c.stage.id, at: c.at };
    if (e.backfilled.includes(c.stage.id)) continue;
    plan.push({ stageId: c.stage.id, fromStageId, at: c.at, evidence: c.evidence });
  }
  return plan;
}

/** Add stage history for imported leads from the dates already stored. Idempotent. */
export async function backfillLeadTransitions(t: Tx, opts: { leadIds?: string[] } = {}): Promise<TransitionBackfillReport> {
  const stages = await t<(Stage & { pipeline_id: string })[]>`
    select s.id, s.key, s.name, s.position, s.state, s.pipeline_id
      from pipeline_stages s join pipelines p on p.id = s.pipeline_id where p.key = 'lead' order by s.position`;
  if (!stages.length) return { leadsChecked: 0, leadsChanged: 0, created: {}, dropped: { afterRecordedHistory: 0, outOfOrder: 0, pastFirstStage: 0 } };
  const pipelineId = stages[0].pipeline_id;
  const only = opts.leadIds ?? null;
  const rows = await t<Evidence[]>`
    with base as (
      select l.id, l.stage_id, l.contact_id, l.linkedin_accepted_at, l.opener_sent_at, l.custom,
             (l.contact_id is not null and (select count(*) from leads l2 where l2.contact_id = l.contact_id and l2.deleted_at is null) = 1) as sole_lead
        from leads l
       where l.pipeline_id = ${pipelineId} and l.deleted_at is null
         and coalesce(l.custom ->> 'sample', '') <> 'true'
         and (l.source in ('import', 'lemlist') or l.custom ? 'imported_from')
         and (${only}::uuid[] is null or l.id = any(${only}::uuid[]))
    ),
    acts as (
      select b.id as lead_id, a.kind, a.direction, a.occurred_at, a.source, a.meta, a.created_at
        from base b
        join activity_links al on al.lead_id = b.id or (b.sole_lead and al.contact_id = b.contact_id)
        join activities a on a.id = al.activity_id and a.deleted_at is null
    ),
    ev as (
      select b.id, b.stage_id,
             coalesce(b.linkedin_accepted_at,
                      (select min(x.occurred_at) from acts x where x.lead_id = b.id and x.kind = 'linkedin_accept')) as accepted_at,
             coalesce(b.opener_sent_at,
                      (select min(x.occurred_at) from acts x where x.lead_id = b.id and x.direction = 'outbound'
                          and x.kind in ('linkedin_message', 'email'))) as opener_at,
             (select max(x.occurred_at) from acts x
               where x.lead_id = b.id and x.source = 'jsonl' and x.kind = 'note'
                 and x.meta ->> 'queue_status' = b.custom ->> 'queue_status'
                 and abs(extract(epoch from x.created_at - x.occurred_at)) > 60) as status_at
        from base b
    )
    select ev.id::text, ev.stage_id::text, ev.accepted_at, ev.opener_at, ev.status_at,
           (select min(x.occurred_at) from acts x
             where x.lead_id = ev.id and x.direction = 'inbound' and x.kind in ('linkedin_message', 'email')
               and (ev.opener_at is null or x.occurred_at > ev.opener_at)) as reply_at,
           fa.to_stage_id::text as anchor_stage_id, fa.changed_at as anchor_at,
           coalesce((select array_agg(distinct st.to_stage_id::text) from stage_transitions st
                      where st.object_type = 'lead' and st.record_id = ev.id and st.source = 'backfill'), '{}') as backfilled
      from ev
      left join lateral (
        select st.to_stage_id, st.changed_at from stage_transitions st
         where st.object_type = 'lead' and st.record_id = ev.id and st.source is distinct from 'backfill'
         order by st.changed_at, st.id limit 1
      ) fa on true`;
  const report: TransitionBackfillReport = { leadsChecked: rows.length, leadsChanged: 0, created: {}, dropped: { afterRecordedHistory: 0, outOfOrder: 0, pastFirstStage: 0 } };
  const now = new Date();
  const nameOf = new Map(stages.map((s) => [s.id, s.name]));
  for (const r of rows) {
    // A lead the backfill already dated is done; its import anchor may since have been
    // collapsed, so planning it again would read a different anchor.
    if (r.backfilled.length) continue;
    const plan = planLeadTransitions(stages, r, now, report.dropped);
    if (!plan.length) continue;
    report.leadsChanged++;
    for (const p of plan) {
      await t`
        insert into stage_transitions (object_type, record_id, pipeline_id, from_stage_id, to_stage_id, actor_type, actor_id, source, reason, changed_at)
        values ('lead', ${r.id}, ${pipelineId}, ${p.fromStageId}, ${p.stageId}, 'system', 'system', 'backfill',
                ${`Backfilled from the ${p.evidence}`}, ${p.at})`;
      const name = nameOf.get(p.stageId) ?? p.stageId;
      report.created[name] = (report.created[name] ?? 0) + 1;
    }
  }
  report.collapsed = await collapseImportAnchors(t, only);
  return report;
}

/**
 * The JSONL import and the lemlist sync write one transition at import time into the
 * stage the lead already had. Once the backfill has dated that stage from real evidence,
 * the import time row is a second entry into the same stage and makes the stage look
 * re-entered on the import day. Remove those rows (they were written by our own import,
 * not by a person) and date qualified_at / disqualified_at from the backfilled entry.
 * Idempotent.
 */
export async function collapseImportAnchors(t: Tx, only: string[] | null = null): Promise<number> {
  const removed = await t<{ record_id: string }[]>`
    with ordered as (
      select st.id, st.record_id, st.to_stage_id, st.source,
             lag(st.to_stage_id) over w as prev_to, lag(st.source) over w as prev_source
        from stage_transitions st
       where st.object_type = 'lead'
         and (${only}::uuid[] is null or st.record_id = any(${only}::uuid[]))
      window w as (partition by st.record_id order by st.changed_at, st.id)
    )
    delete from stage_transitions d using ordered o
     where d.id = o.id and o.prev_to = o.to_stage_id and o.prev_source = 'backfill'
       and o.source in ('jsonl', 'lemlist', 'import')
    returning d.record_id::text`;
  const ids = [...new Set(removed.map((r) => r.record_id))];
  if (ids.length) {
    await t`
      with e as (
        select l.id, s.state, max(st.changed_at) as entered_at
          from leads l
          join pipeline_stages s on s.id = l.stage_id and s.state in ('won', 'lost')
          join stage_transitions st on st.object_type = 'lead' and st.record_id = l.id and st.to_stage_id = l.stage_id
         where l.id = any(${ids}::uuid[])
         group by l.id, s.state
      )
      update leads l set
        disqualified_at = case when e.state = 'lost' then e.entered_at else l.disqualified_at end,
        qualified_at = case when e.state = 'won' then e.entered_at else l.qualified_at end
        from e where e.id = l.id`;
  }
  return removed.length;
}
