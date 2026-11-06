/**
 * lib/settings/pipelines.ts, editing pipelines, stages and the fields a stage
 * requires (server only). Records never change stage here except through
 * moveStage, when an archived stage's records are moved out.
 *
 *   const p = await pipelineDetail(sql, pipelineId);
 *   await tx((t) => updateStage(t, stageId, { name, probability, state, rot_days }), { userId });
 *   await tx((t) => archiveStage(t, stageId, { moveToStageId, actorId }), { userId });
 *   await tx((t) => addRequiredField(t, stageId, 'decision_date'), { userId });
 */
import { z } from 'zod';
import type { Db, Tx } from '@/lib/db';
import { moveStage, StageMoveError, type StageObjectType } from '@/lib/stages';
import { DISQUALIFY_REASONS, LOST_REASONS } from '@/lib/options';
import { gateCandidates, slugKey } from './core-fields';
import { SettingsError } from './errors';

export const STAGE_TABLES: Record<StageObjectType, string> = { lead: 'leads', deal: 'deals', project: 'projects', ticket: 'tickets' };

export const STAGE_STATES = [
  { value: 'open', label: 'Open' },
  { value: 'won', label: 'Closed won' },
  { value: 'lost', label: 'Closed lost' },
  { value: 'closed', label: 'Closed' },
];

export type PipelineRow = { id: string; key: string; name: string; object_type: StageObjectType; description: string | null; is_default: boolean };

export async function listAllPipelines(db: Db): Promise<PipelineRow[]> {
  return db<PipelineRow[]>`
    select id, key, name, object_type, description, is_default from pipelines where archived_at is null order by position, name`;
}

export type StageRow = {
  id: string;
  key: string;
  name: string;
  position: number;
  probability: number | null;
  state: 'open' | 'won' | 'lost' | 'closed';
  rot_days: number | null;
  pauses_sla: boolean;
  archived_at: Date | null;
  records: number;
  required: { id: string; field_key: string; label: string; input_type: string }[];
};

export async function pipelineDetail(db: Db, pipelineId: string): Promise<{ pipeline: PipelineRow; stages: StageRow[] } | null> {
  const [pipeline] = await db<PipelineRow[]>`
    select id, key, name, object_type, description, is_default from pipelines where id = ${pipelineId}`;
  if (!pipeline) return null;
  const table = STAGE_TABLES[pipeline.object_type];
  const stages = await db<Omit<StageRow, 'records'>[]>`
    select s.id, s.key, s.name, s.position, s.probability, s.state, s.rot_days, s.pauses_sla, s.archived_at,
           coalesce((select json_agg(json_build_object('id', r.id, 'field_key', r.field_key, 'label', r.label, 'input_type', r.input_type) order by r.position)
                       from stage_required_fields r where r.stage_id = s.id), '[]') as required
      from pipeline_stages s where s.pipeline_id = ${pipelineId}
     order by s.archived_at is not null, s.position`;
  const counts = await db.unsafe<{ stage_id: string; n: number }[]>(
    `select stage_id, count(*)::int as n from ${table} where pipeline_id = $1 and deleted_at is null group by stage_id`,
    [pipelineId],
  );
  const byStage = new Map(counts.map((c) => [c.stage_id, c.n]));
  return { pipeline, stages: stages.map((s) => ({ ...s, records: byStage.get(s.id) ?? 0 })) };
}

const stageSchema = z.object({
  name: z.string({ message: 'Give the stage a name' }).trim().min(1, 'Give the stage a name').max(60, 'At most 60 characters'),
  probability: z.number().int('Use a whole number').min(0, 'At least 0').max(100, 'At most 100').nullable(),
  state: z.enum(['open', 'won', 'lost', 'closed']),
  rot_days: z.number().int('Use whole days').min(1, 'At least 1 day').max(365, 'At most 365 days').nullable(),
  pauses_sla: z.boolean().default(false),
});
export type StageInput = z.input<typeof stageSchema>;

function parseStage(input: StageInput) {
  const parsed = stageSchema.safeParse(input);
  if (!parsed.success) {
    const fe: Record<string, string> = {};
    for (const i of parsed.error.issues) fe[String(i.path[0] ?? '_')] ??= i.message;
    throw new SettingsError('Check the highlighted fields', fe);
  }
  return parsed.data;
}

async function stageWithPipeline(t: Tx, stageId: string) {
  const [s] = await t<{ id: string; pipeline_id: string; object_type: StageObjectType; name: string; position: number; state: string; archived_at: Date | null }[]>`
    select s.id, s.pipeline_id, p.object_type, s.name, s.position, s.state, s.archived_at
      from pipeline_stages s join pipelines p on p.id = s.pipeline_id where s.id = ${stageId} for update of s`;
  if (!s) throw new SettingsError('That stage no longer exists');
  return s;
}

export async function updateStage(t: Tx, stageId: string, input: StageInput): Promise<void> {
  const s = await stageWithPipeline(t, stageId);
  const v = parseStage(input);
  if (s.object_type !== 'ticket' && v.pauses_sla) v.pauses_sla = false;
  if (s.object_type === 'deal' && v.state === 'won' && v.probability === null) v.probability = 100;
  if (s.object_type === 'deal' && v.state === 'lost' && v.probability === null) v.probability = 0;
  await t`
    update pipeline_stages set name = ${v.name}, probability = ${v.probability}, state = ${v.state}, rot_days = ${v.rot_days},
           pauses_sla = ${v.pauses_sla}
     where id = ${stageId}`;
}

/** Renumber the live stages of a pipeline 0..n in the given order. Archived stages go after. */
async function renumber(t: Tx, pipelineId: string, orderedIds: string[]) {
  const archived = await t<{ id: string }[]>`
    select id from pipeline_stages where pipeline_id = ${pipelineId} and archived_at is not null order by position`;
  const all = [...orderedIds, ...archived.map((a) => a.id)];
  for (let i = 0; i < all.length; i++) await t`update pipeline_stages set position = ${i} where id = ${all[i]} and position <> ${i}`;
}

export async function moveStageOrder(t: Tx, stageId: string, dir: 'up' | 'down'): Promise<void> {
  const s = await stageWithPipeline(t, stageId);
  const live = await t<{ id: string }[]>`
    select id from pipeline_stages where pipeline_id = ${s.pipeline_id} and archived_at is null order by position, created_at for update`;
  const ids = live.map((r) => r.id);
  const i = ids.indexOf(stageId);
  const j = dir === 'up' ? i - 1 : i + 1;
  if (i < 0 || j < 0 || j >= ids.length) return;
  [ids[i], ids[j]] = [ids[j], ids[i]];
  await renumber(t, s.pipeline_id, ids);
}

/** Add a stage. Open stages go before the first closing stage, closing stages at the end. */
export async function addStage(t: Tx, pipelineId: string, input: StageInput): Promise<string> {
  const v = parseStage(input);
  const [p] = await t<{ id: string; object_type: StageObjectType }[]>`select id, object_type from pipelines where id = ${pipelineId} for update`;
  if (!p) throw new SettingsError('That pipeline no longer exists');
  const live = await t<{ id: string; key: string; state: string }[]>`
    select id, key, state from pipeline_stages where pipeline_id = ${pipelineId} and archived_at is null order by position`;
  const allKeys = new Set((await t<{ key: string }[]>`select key from pipeline_stages where pipeline_id = ${pipelineId}`).map((r) => r.key));
  const base = slugKey(v.name) || 'stage';
  let key = base;
  for (let n = 2; allKeys.has(key); n++) key = `${base}_${n}`;
  const [created] = await t<{ id: string }[]>`
    insert into pipeline_stages (pipeline_id, key, name, position, probability, state, rot_days, pauses_sla)
    values (${pipelineId}, ${key}, ${v.name}, 9999, ${v.probability}, ${v.state}, ${v.rot_days}, ${p.object_type === 'ticket' ? v.pauses_sla : false})
    returning id`;
  const ids = live.map((s) => s.id);
  const firstClosing = live.findIndex((s) => s.state !== 'open');
  if (v.state === 'open' && firstClosing >= 0) ids.splice(firstClosing, 0, created.id);
  else ids.push(created.id);
  await renumber(t, pipelineId, ids);
  return created.id;
}

export type ArchiveResult = { moved: number };

/**
 * Archive a stage. Refuses while records sit in it, unless moveToStageId is
 * given, then every record moves through moveStage first (required fields of
 * the target apply, a move back carries the reason "Stage archived").
 */
export async function archiveStage(t: Tx, stageId: string, opts: { moveToStageId?: string | null; actorId: string | null }): Promise<ArchiveResult> {
  const s = await stageWithPipeline(t, stageId);
  if (s.archived_at) return { moved: 0 };
  const [live] = await t<{ n: number }[]>`
    select count(*)::int as n from pipeline_stages where pipeline_id = ${s.pipeline_id} and archived_at is null and id <> ${stageId}`;
  if (!live.n) throw new SettingsError('A pipeline needs at least one stage');
  const table = STAGE_TABLES[s.object_type];
  const records = await t.unsafe<{ id: string }[]>(`select id from ${table} where stage_id = $1 and deleted_at is null order by created_at`, [stageId]);
  let moved = 0;
  if (records.length) {
    if (!opts.moveToStageId) {
      throw new SettingsError(
        `${records.length} ${records.length === 1 ? 'record is' : 'records are'} still in ${s.name}. Pick a stage to move ${records.length === 1 ? 'it' : 'them'} to first.`,
        { moveToStageId: 'Pick a stage' },
        { records: records.length },
      );
    }
    const [target] = await t<{ id: string; pipeline_id: string; archived_at: Date | null; name: string }[]>`
      select id, pipeline_id, archived_at, name from pipeline_stages where id = ${opts.moveToStageId}`;
    if (!target || target.pipeline_id !== s.pipeline_id || target.archived_at || target.id === stageId) {
      throw new SettingsError('Pick another live stage of the same pipeline', { moveToStageId: 'Pick another stage' });
    }
    for (const r of records) {
      try {
        await moveStage(t, {
          objectType: s.object_type,
          recordId: r.id,
          toStageId: target.id,
          reason: `Stage ${s.name} archived`,
          actor: { type: 'system', id: opts.actorId },
          source: 'settings',
        });
        moved++;
      } catch (err) {
        if (err instanceof StageMoveError && err.code === 'required_fields') {
          throw new SettingsError(
            `Records can't enter ${target.name} without ${err.missing.map((m) => m.label.toLowerCase()).join(' and ')}. Pick another stage, or move them on the board.`,
            { moveToStageId: 'Required fields are missing' },
          );
        }
        throw err;
      }
    }
  }
  await t`update pipeline_stages set archived_at = now() where id = ${stageId}`;
  return { moved };
}

export async function restoreStage(t: Tx, stageId: string): Promise<void> {
  const s = await stageWithPipeline(t, stageId);
  await t`update pipeline_stages set archived_at = null where id = ${stageId}`;
  const live = await t<{ id: string }[]>`
    select id from pipeline_stages where pipeline_id = ${s.pipeline_id} and archived_at is null order by position, created_at`;
  await renumber(t, s.pipeline_id, live.map((r) => r.id));
}

const CORE_OPTIONS: Record<string, { value: string; label: string }[]> = { lost_reason: LOST_REASONS, disqualify_reason: DISQUALIFY_REASONS };

/** Require a core or custom field before a record enters the stage. */
export async function addRequiredField(t: Tx, stageId: string, fieldKey: string): Promise<void> {
  const s = await stageWithPipeline(t, stageId);
  const customs = await t<{ internal_name: string; label: string; field_type: never; options: { value: string; label: string }[] | null }[]>`
    select internal_name, label, field_type, options from field_definitions where object_type = ${s.object_type} and archived_at is null`;
  const cand = gateCandidates(s.object_type, customs).find((c) => c.key === fieldKey);
  if (!cand) throw new SettingsError('That field cannot be required for a stage', { fieldKey: 'Pick a field from the list' });
  const options = cand.input === 'select' ? (cand.custom ? cand.options ?? [] : CORE_OPTIONS[cand.key] ?? []) : null;
  if (cand.input === 'select' && !options?.length) throw new SettingsError('That dropdown has no options yet');
  const [exists] = await t<{ n: number }[]>`select count(*)::int as n from stage_required_fields where stage_id = ${stageId} and field_key = ${fieldKey}`;
  if (exists.n) throw new SettingsError(`${s.name} already requires ${cand.label.toLowerCase()}`);
  await t`
    insert into stage_required_fields (stage_id, field_key, label, input_type, options, position)
    values (${stageId}, ${fieldKey}, ${cand.label}, ${cand.input}, ${options ? t.json(options) : null},
            coalesce((select max(position) + 1 from stage_required_fields where stage_id = ${stageId}), 0))`;
}

export async function removeRequiredField(t: Tx, requiredId: string): Promise<void> {
  await t`delete from stage_required_fields where id = ${requiredId}`;
}
