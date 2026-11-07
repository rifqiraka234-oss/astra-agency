/**
 * lib/sales/stage-times.ts, date entered and date exited per stage (HubSpot style)
 * for leads and deals, from stage_transitions.
 *
 *   const times = computeStageTimes(transitions, currentStageId, new Date());   // pure, per stage
 *   const rows = await stageTimeline('lead', lead.id, stages, lead.stage_id);    // the record page panel
 *   const dates = await stageDatesFor('deal', ids);                               // list columns and CSV
 *
 * The rules match the views v_stage_visits and v_stage_time (migration 701): a visit
 * starts at a transition into a stage the record was not already in and ends at the
 * next transition into another stage. Time in a stage sums every visit; the open
 * visit to the current stage counts up to now. Server code except computeStageTimes.
 */
import { sql } from '../db';

export type TransitionInput = {
  to_stage_id: string;
  changed_at: Date | string;
  actor_type?: string | null;
  actor_name?: string | null;
  source?: string | null;
};

export type StageVisit = {
  stageId: string;
  enteredAt: Date;
  exitedAt: Date | null;
  /** Null when the end is not known (the last visit to a stage the record has since left without a record of it). */
  seconds: number | null;
  actorType: string | null;
  actorName: string | null;
  source: string | null;
};

export type StageTime = {
  stageId: string;
  firstEnteredAt: Date;
  lastEnteredAt: Date;
  /** Null while the record is in the stage now. */
  lastExitedAt: Date | null;
  timesEntered: number;
  totalSeconds: number;
  isCurrent: boolean;
  /** Who moved it in on the latest visit. */
  lastActorType: string | null;
  lastActorName: string | null;
  lastSource: string | null;
};

const toDate = (d: Date | string) => (d instanceof Date ? d : new Date(d));

/** Every visit, oldest first. Transitions may come in any order. */
export function stageVisits(transitions: TransitionInput[], currentStageId: string | null, now: Date = new Date()): StageVisit[] {
  const sorted = transitions
    .map((t, i) => ({ ...t, at: toDate(t.changed_at), i }))
    .sort((a, b) => a.at.getTime() - b.at.getTime() || a.i - b.i);
  const visits: StageVisit[] = [];
  for (const t of sorted) {
    const last = visits[visits.length - 1];
    if (last && last.stageId === t.to_stage_id) continue; // same stage again, same visit
    if (last) last.exitedAt = t.at;
    visits.push({
      stageId: t.to_stage_id,
      enteredAt: t.at,
      exitedAt: null,
      seconds: null,
      actorType: t.actor_type ?? null,
      actorName: t.actor_name ?? null,
      source: t.source ?? null,
    });
  }
  for (const v of visits) {
    if (v.exitedAt) v.seconds = (v.exitedAt.getTime() - v.enteredAt.getTime()) / 1000;
    else if (v.stageId === currentStageId) v.seconds = Math.max(0, (now.getTime() - v.enteredAt.getTime()) / 1000);
  }
  return visits;
}

/** Per stage: first entered, last exited, times entered and total time over every visit. */
export function computeStageTimes(transitions: TransitionInput[], currentStageId: string | null, now: Date = new Date()): Map<string, StageTime> {
  const visits = stageVisits(transitions, currentStageId, now);
  const out = new Map<string, StageTime>();
  visits.forEach((v, i) => {
    const isCurrent = i === visits.length - 1 && v.stageId === currentStageId;
    const prev = out.get(v.stageId);
    if (!prev) {
      out.set(v.stageId, {
        stageId: v.stageId,
        firstEnteredAt: v.enteredAt,
        lastEnteredAt: v.enteredAt,
        lastExitedAt: v.exitedAt,
        timesEntered: 1,
        totalSeconds: v.seconds ?? 0,
        isCurrent,
        lastActorType: v.actorType,
        lastActorName: v.actorName,
        lastSource: v.source,
      });
      return;
    }
    prev.lastEnteredAt = v.enteredAt;
    if (v.exitedAt && (!prev.lastExitedAt || v.exitedAt > prev.lastExitedAt)) prev.lastExitedAt = v.exitedAt;
    prev.timesEntered += 1;
    prev.totalSeconds += v.seconds ?? 0;
    prev.isCurrent = prev.isCurrent || isCurrent;
    prev.lastActorType = v.actorType;
    prev.lastActorName = v.actorName;
    prev.lastSource = v.source;
  });
  for (const s of out.values()) if (s.isCurrent) s.lastExitedAt = null;
  return out;
}

export type TimelineStage = { id: string; name: string; state: string; position: number };

export type StageTimelineRow = {
  stageId: string;
  name: string;
  status: 'current' | 'visited' | 'skipped' | 'not_reached';
  firstEnteredAt: Date | null;
  lastExitedAt: Date | null;
  timesEntered: number;
  totalSeconds: number;
  movedBy: string | null;
  /** The dates of this stage were rebuilt from imported evidence, or recorded at import. */
  fromHistory: boolean;
  archived: boolean;
};

const ACTOR_LABELS: Record<string, string> = { automation: 'Automation', import: 'Import', sync: 'lemlist sync', system: 'System' };

export function moverLabel(actorType: string | null, actorName: string | null, source: string | null): string | null {
  if (source === 'backfill') return 'Backfill';
  if (actorName) return actorName;
  return actorType ? ACTOR_LABELS[actorType] ?? null : null;
}

/**
 * One row per stage of the pipeline in order: entered, exited, time spent, who moved
 * it. A stage before the current one with no visit is skipped; one after it is not
 * reached. Visited stages that were archived since come last.
 */
export function buildStageTimeline(stages: TimelineStage[], times: Map<string, StageTime>, current: TimelineStage | null, archivedNames: Map<string, string> = new Map()): StageTimelineRow[] {
  const curOpen = current?.state === 'open';
  const rows: StageTimelineRow[] = stages.map((s) => {
    const t = times.get(s.id);
    let status: StageTimelineRow['status'];
    if (t?.isCurrent || s.id === current?.id) status = 'current';
    else if (t) status = 'visited';
    else if (!current) status = 'not_reached';
    else if (s.state === 'open' && (curOpen ? s.position < current.position : true)) status = 'skipped';
    else status = 'not_reached';
    return {
      stageId: s.id,
      name: s.name,
      status,
      firstEnteredAt: t?.firstEnteredAt ?? null,
      lastExitedAt: t?.lastExitedAt ?? null,
      timesEntered: t?.timesEntered ?? 0,
      totalSeconds: t?.totalSeconds ?? 0,
      movedBy: t ? moverLabel(t.lastActorType, t.lastActorName, t.lastSource) : null,
      fromHistory: Boolean(t && (t.lastSource === 'backfill' || t.lastActorType === 'import' || t.lastActorType === 'sync')),
      archived: false,
    };
  });
  for (const [id, t] of times) {
    if (stages.some((s) => s.id === id)) continue;
    rows.push({
      stageId: id,
      name: archivedNames.get(id) ?? 'Removed stage',
      status: t.isCurrent ? 'current' : 'visited',
      firstEnteredAt: t.firstEnteredAt,
      lastExitedAt: t.lastExitedAt,
      timesEntered: t.timesEntered,
      totalSeconds: t.totalSeconds,
      movedBy: moverLabel(t.lastActorType, t.lastActorName, t.lastSource),
      fromHistory: t.lastSource === 'backfill' || t.lastActorType === 'import' || t.lastActorType === 'sync',
      archived: true,
    });
  }
  return rows;
}

/** "3 days 4 hours", "5 hours", "12 minutes", "under a minute". */
export function formatDuration(seconds: number): string {
  const s = Math.max(0, Math.round(seconds));
  const d = Math.floor(s / 86400);
  const h = Math.floor((s % 86400) / 3600);
  const m = Math.floor((s % 3600) / 60);
  const plural = (n: number, w: string) => `${n} ${w}${n === 1 ? '' : 's'}`;
  if (d >= 30) return plural(d, 'day');
  if (d > 0) return h ? `${plural(d, 'day')} ${plural(h, 'hour')}` : plural(d, 'day');
  if (h > 0) return m ? `${plural(h, 'hour')} ${plural(m, 'minute')}` : plural(h, 'hour');
  if (m > 0) return plural(m, 'minute');
  return 'under a minute';
}

/** The record page panel: transitions with who moved them, folded into per stage rows. */
export async function stageTimeline(objectType: 'lead' | 'deal', recordId: string, stages: TimelineStage[], currentStageId: string): Promise<StageTimelineRow[]> {
  const transitions = await sql<(TransitionInput & { to_stage_name: string; archived: boolean })[]>`
    select st.to_stage_id, st.changed_at, st.actor_type, st.source, s.name as to_stage_name, (s.archived_at is not null) as archived,
           u.name as actor_name
      from stage_transitions st
      join pipeline_stages s on s.id = st.to_stage_id
      left join users u on st.actor_type = 'user' and u.id::text = st.actor_id
     where st.object_type = ${objectType} and st.record_id = ${recordId}
     order by st.changed_at, st.id`;
  const times = computeStageTimes(transitions, currentStageId);
  const names = new Map(transitions.map((t) => [t.to_stage_id, t.to_stage_name]));
  const current = stages.find((s) => s.id === currentStageId) ?? null;
  return buildStageTimeline(stages, times, current, names);
}

export type StageDates = Map<string, { entered: Date | null; exited: Date | null }>;

/** First entered and last exited per stage for many records, from v_stage_time. */
export async function stageDatesFor(objectType: 'lead' | 'deal', ids: string[]): Promise<Map<string, StageDates>> {
  const out = new Map<string, StageDates>();
  if (ids.length === 0) return out;
  const rows = await sql<{ record_id: string; stage_id: string; first_entered_at: Date | null; last_exited_at: Date | null }[]>`
    select record_id, stage_id, first_entered_at, last_exited_at from v_stage_time
     where object_type = ${objectType} and record_id = any(${ids}::uuid[])`;
  for (const r of rows) {
    const m = out.get(r.record_id) ?? new Map();
    m.set(r.stage_id, { entered: r.first_entered_at, exited: r.last_exited_at });
    out.set(r.record_id, m);
  }
  return out;
}

export type StageColumn = { id: string; name: string; label: string; pipeline_name: string };

/**
 * The stages that get an "Entered <stage>" column, in pipeline order. A stage name
 * that appears in more than one pipeline gets the pipeline in brackets.
 */
export async function stageColumns(objectType: 'lead' | 'deal', pipelineKey?: string | null): Promise<StageColumn[]> {
  const rows = await sql<{ id: string; name: string; pipeline_name: string }[]>`
    select s.id, s.name, p.name as pipeline_name
      from pipeline_stages s join pipelines p on p.id = s.pipeline_id
     where p.object_type = ${objectType} and p.archived_at is null and s.archived_at is null
       and (${pipelineKey ?? null}::text is null or p.key = ${pipelineKey ?? null})
     order by p.is_default desc, p.position, s.position`;
  const count = new Map<string, number>();
  for (const r of rows) count.set(r.name, (count.get(r.name) ?? 0) + 1);
  return rows.map((r) => ({ ...r, label: (count.get(r.name) ?? 0) > 1 ? `${r.name} (${r.pipeline_name})` : r.name }));
}
