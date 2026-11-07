/**
 * lib/stages.ts, the only way a lead, deal, project or ticket changes stage.
 *
 *   try {
 *     const res = await tx((t) => moveStage(t, {
 *       objectType: 'deal', recordId: deal.id, toStageId,
 *       values: { next_step: 'Pricing call with Eva', decision_date: '2026-11-20' }, // gate fields from the dialog
 *       reason,                                   // required when moving back or reopening
 *       actor: { type: 'user', id: user.id },
 *     }), { userId: user.id });
 *   } catch (e) {
 *     if (e instanceof StageMoveError && e.code === 'required_fields') {
 *       // show the gate dialog with e.fields (all required fields of the stage, current values filled in)
 *     }
 *   }
 *
 * What it does, in the caller's transaction:
 *   1. Locks the record. Checks the stage belongs to a pipeline of the same object type.
 *   2. Moving back (or reopening a closed record) needs a reason.
 *   3. Every stage_required_fields row of the target stage must have a value, taken
 *      from `values` first, else from the record (column, else custom jsonb).
 *      Missing values throw StageMoveError('required_fields') listing them.
 *   4. Writes the gate values (columns, else custom), the stage, and won_at / lost_at,
 *      qualified_at / disqualified_at, closed_at as the stage state says.
 *   5. Appends stage_transitions (amount, close date, probability snapshot) and, for
 *      tickets, ticket_status_events.
 *   6. Logs a stage_change activity on the record and its organization.
 *   7. Emits <object>.stage_changed, plus deal.won / deal.lost.
 *   8. Moves the organization lifecycle forward (open deal: opportunity, won: customer).
 *
 * A lead entering a lost stage (Disqualified) needs disqualify_reason, a deal
 * entering a lost stage needs lost_reason, always, from the active reasons of
 * lib/reasons.ts (even when the stage's required fields leave it out). An optional
 * note goes in values.disqualify_note or values.lost_note.
 */
import { sql, type Db, type Tx } from './db';
import { emit, type DomainEventType } from './events';
import { logActivity, daysInStageTag } from './activities';
import { daysBetween, formatMoney } from './format';
import { REASON_FIELDS } from './reasons';

export type StageObjectType = 'lead' | 'deal' | 'project' | 'ticket';

export type Actor = { type: 'user' | 'automation' | 'system' | 'import' | 'sync'; id?: string | null };

export type MoveStageInput = {
  objectType: StageObjectType;
  recordId: string;
  toStageId: string;
  /** Values for the target stage's required fields, keyed by field_key. Strings from forms are fine. */
  values?: Record<string, unknown>;
  /** Required when moving back or reopening. */
  reason?: string | null;
  actor: Actor;
  /** Where the move came from, for example board, record, automation. */
  source?: string;
};

export type StageInfo = {
  id: string;
  pipeline_id: string;
  pipeline_key: string;
  pipeline_name: string;
  object_type: StageObjectType;
  key: string;
  name: string;
  position: number;
  probability: number | null;
  state: 'open' | 'won' | 'lost' | 'closed';
  rot_days: number | null;
  pauses_sla: boolean;
};

export type RequiredField = {
  field_key: string;
  label: string;
  input_type: 'text' | 'textarea' | 'number' | 'money' | 'date' | 'datetime' | 'url' | 'select' | 'user' | 'contact';
  options: { value: string; label: string }[] | null;
  /** The record's current value, as a string for the dialog input. */
  value: string | null;
};

export class StageMoveError extends Error {
  constructor(
    public code: 'not_found' | 'wrong_pipeline' | 'reason_required' | 'required_fields',
    message: string,
    /** For required_fields, the fields still empty. */
    public missing: RequiredField[] = [],
    /** For required_fields, every required field of the stage with current values. */
    public fields: RequiredField[] = [],
  ) {
    super(message);
    this.name = 'StageMoveError';
  }
}

export type MoveStageResult = {
  changed: boolean;
  fromStage: StageInfo | null;
  toStage: StageInfo;
  transitionId: string | null;
};

const TABLES: Record<StageObjectType, string> = { lead: 'leads', deal: 'deals', project: 'projects', ticket: 'tickets' };
const LABELS: Record<StageObjectType, string> = { lead: 'Lead', deal: 'Deal', project: 'Project', ticket: 'Ticket' };
const PROTECTED = new Set(['id', 'stage_id', 'pipeline_id', 'custom', 'created_at', 'updated_at', 'deleted_at', 'won_at', 'lost_at', 'qualified_at', 'disqualified_at', 'closed_at']);

const columnCache = new Map<string, Set<string>>();

async function columnsOf(db: Db, table: string): Promise<Set<string>> {
  const hit = columnCache.get(table);
  if (hit) return hit;
  const rows = await db<{ column_name: string }[]>`
    select column_name from information_schema.columns where table_schema = 'public' and table_name = ${table}`;
  const set = new Set(rows.map((r) => r.column_name));
  columnCache.set(table, set);
  return set;
}

/** One stage with its pipeline. */
export async function getStage(stageId: string, db: Db = sql): Promise<StageInfo | null> {
  const [row] = await db<StageInfo[]>`
    select s.id, s.pipeline_id, p.key as pipeline_key, p.name as pipeline_name, p.object_type, s.key, s.name,
           s.position, s.probability, s.state, s.rot_days, s.pauses_sla
      from pipeline_stages s join pipelines p on p.id = s.pipeline_id
     where s.id = ${stageId}`;
  return row ?? null;
}

/** A stage by pipeline key and stage key, for example ('sales', 'won'). */
export async function stageByKey(pipelineKey: string, stageKey: string, db: Db = sql): Promise<StageInfo> {
  const [row] = await db<StageInfo[]>`
    select s.id, s.pipeline_id, p.key as pipeline_key, p.name as pipeline_name, p.object_type, s.key, s.name,
           s.position, s.probability, s.state, s.rot_days, s.pauses_sla
      from pipeline_stages s join pipelines p on p.id = s.pipeline_id
     where p.key = ${pipelineKey} and s.key = ${stageKey}`;
  if (!row) throw new Error(`No stage ${pipelineKey}/${stageKey}`);
  return row;
}

/** Every non archived stage of a pipeline in order, with required fields. */
export async function pipelineStages(pipelineKey: string, db: Db = sql) {
  return db<(StageInfo & { required: { field_key: string; label: string; input_type: string; options: unknown }[] })[]>`
    select s.id, s.pipeline_id, p.key as pipeline_key, p.name as pipeline_name, p.object_type, s.key, s.name,
           s.position, s.probability, s.state, s.rot_days, s.pauses_sla,
           coalesce((select json_agg(json_build_object('field_key', r.field_key, 'label', r.label,
                     'input_type', r.input_type, 'options', r.options) order by r.position)
                       from stage_required_fields r where r.stage_id = s.id), '[]') as required
      from pipeline_stages s join pipelines p on p.id = s.pipeline_id
     where p.key = ${pipelineKey} and s.archived_at is null
     order by s.position`;
}

/** Pipelines for an object type, default first. */
export async function listPipelines(objectType: StageObjectType, db: Db = sql) {
  return db<{ id: string; key: string; name: string; is_default: boolean }[]>`
    select id, key, name, is_default from pipelines
     where object_type = ${objectType} and archived_at is null
     order by is_default desc, position`;
}

function asInputString(v: unknown): string | null {
  if (v === null || v === undefined || v === '') return null;
  if (v instanceof Date) return v.toISOString();
  return String(v);
}

function isBlank(v: unknown): boolean {
  return v === null || v === undefined || (typeof v === 'string' && v.trim() === '') || (Array.isArray(v) && v.length === 0);
}

function cleanValue(inputType: string, v: unknown): unknown {
  if (typeof v !== 'string') return v;
  const s = v.trim();
  if (s === '') return null;
  if (inputType === 'money' || inputType === 'number') return s.replace(/[€\s,]/g, '');
  if (inputType === 'url' && !/^[a-z]+:\/\//i.test(s)) return `https://${s}`;
  return s;
}

/**
 * The gate for entering a stage: its required fields with the record's current
 * values. Use it to open the dialog before calling moveStage.
 */
export async function stageGate(objectType: StageObjectType, recordId: string, toStageId: string, db: Db = sql): Promise<RequiredField[]> {
  const table = TABLES[objectType];
  const [record] = await db<Record<string, unknown>[]>`select * from ${db(table)} where id = ${recordId}`;
  const required = await db<{ field_key: string; label: string; input_type: RequiredField['input_type']; options: RequiredField['options'] }[]>`
    select field_key, label, input_type, options from stage_required_fields where stage_id = ${toStageId} order by position`;
  const custom = (record?.custom ?? {}) as Record<string, unknown>;
  const fields: RequiredField[] = required.map((r) => ({
    ...r,
    value: asInputString(record && r.field_key in record ? record[r.field_key] : custom[r.field_key]),
  }));
  // Lost stages of leads and deals always ask for a reason from the active list.
  const stage = objectType === 'lead' || objectType === 'deal' ? await getStage(toStageId, db) : null;
  if (stage?.state === 'lost' && (objectType === 'lead' || objectType === 'deal')) {
    const cfg = REASON_FIELDS[objectType];
    const opts = await db<{ value: string; label: string }[]>`
      select key as value, label from reason_options where object_type = ${cfg.type} and not is_archived order by position, label`;
    const current = asInputString(record?.[cfg.field]);
    const value = current && opts.some((o) => o.value === current) ? current : null;
    const existing = fields.find((f) => f.field_key === cfg.field);
    if (existing) Object.assign(existing, { input_type: 'select', options: opts, value });
    else fields.unshift({ field_key: cfg.field, label: cfg.label, input_type: 'select', options: opts, value });
  }
  return fields;
}

/** Move a record to a stage. Run it inside tx(). Throws StageMoveError on a gate. */
export async function moveStage(t: Tx, input: MoveStageInput): Promise<MoveStageResult> {
  const { objectType, recordId, toStageId } = input;
  const table = TABLES[objectType];
  const values = input.values ?? {};

  const [record] = await t<Record<string, unknown>[]>`
    select * from ${t(table)} where id = ${recordId} and deleted_at is null for update`;
  if (!record) throw new StageMoveError('not_found', `${LABELS[objectType]} not found`);

  const toStage = await getStage(toStageId, t);
  if (!toStage) throw new StageMoveError('not_found', 'Stage not found');
  if (toStage.object_type !== objectType) {
    throw new StageMoveError('wrong_pipeline', `That stage belongs to a ${toStage.object_type} pipeline`);
  }
  const fromStage = record.stage_id ? await getStage(String(record.stage_id), t) : null;
  if (fromStage && fromStage.id === toStage.id) {
    return { changed: false, fromStage, toStage, transitionId: null };
  }

  const reopening = Boolean(fromStage && fromStage.state !== 'open' && toStage.state === 'open');
  const backwards =
    reopening ||
    Boolean(fromStage && fromStage.pipeline_id === toStage.pipeline_id && toStage.state === 'open' && toStage.position < fromStage.position);
  const reason = input.reason?.trim() || null;
  if (backwards && !reason) {
    throw new StageMoveError('reason_required', reopening ? 'Reopening needs a reason' : 'Moving back needs a reason');
  }

  // Required fields gate.
  const required = await t<{ field_key: string; label: string; input_type: RequiredField['input_type']; options: RequiredField['options'] }[]>`
    select field_key, label, input_type, options from stage_required_fields where stage_id = ${toStage.id} order by position`;
  // A lost stage of a lead or deal always needs a reason from the active list.
  const reasonCfg = toStage.state === 'lost' && (objectType === 'lead' || objectType === 'deal') ? REASON_FIELDS[objectType] : null;
  let activeReasons: Set<string> | null = null;
  if (reasonCfg) {
    const opts = await t<{ value: string; label: string }[]>`
      select key as value, label from reason_options where object_type = ${reasonCfg.type} and not is_archived order by position, label`;
    activeReasons = new Set(opts.map((o) => o.value));
    const existing = required.find((r) => r.field_key === reasonCfg.field);
    if (existing) Object.assign(existing, { input_type: 'select', options: opts });
    else required.unshift({ field_key: reasonCfg.field, label: reasonCfg.label, input_type: 'select', options: opts });
  }
  let archivedReason = false;
  const custom = { ...((record.custom ?? {}) as Record<string, unknown>) };
  const columns = await columnsOf(t, table);
  const fields: RequiredField[] = [];
  const missing: RequiredField[] = [];
  const columnUpdates: Record<string, unknown> = {};
  const customUpdates: Record<string, unknown> = {};
  for (const r of required) {
    const provided = Object.prototype.hasOwnProperty.call(values, r.field_key)
      ? cleanValue(r.input_type, values[r.field_key])
      : undefined;
    const isColumn = columns.has(r.field_key) && !PROTECTED.has(r.field_key);
    const current = isColumn ? record[r.field_key] : custom[r.field_key];
    const effective = provided !== undefined && !isBlank(provided) ? provided : current;
    const field: RequiredField = { ...r, value: asInputString(effective) };
    fields.push(field);
    if (isBlank(effective)) {
      missing.push(field);
      continue;
    }
    if (reasonCfg && activeReasons && r.field_key === reasonCfg.field && !activeReasons.has(String(effective))) {
      archivedReason = true;
      missing.push({ ...field, value: null });
      continue;
    }
    if (provided !== undefined && !isBlank(provided)) {
      if (isColumn) columnUpdates[r.field_key] = provided;
      else customUpdates[r.field_key] = provided;
    }
  }
  if (missing.length) {
    throw new StageMoveError(
      'required_fields',
      archivedReason && missing.length === 1
        ? 'That reason is archived or unknown, pick one from the list'
        : `To enter ${toStage.name}, fill in ${missing.map((m) => m.label.toLowerCase()).join(' and ')}`,
      missing,
      fields.map((f) => (archivedReason && reasonCfg && f.field_key === reasonCfg.field ? { ...f, value: null } : f)),
    );
  }
  // The optional note next to the reason.
  if (reasonCfg && Object.prototype.hasOwnProperty.call(values, reasonCfg.note)) {
    const note = values[reasonCfg.note];
    columnUpdates[reasonCfg.note] = typeof note === 'string' ? note.trim().slice(0, 2000) || null : null;
  }

  // Stage state timestamps.
  const stamps: Record<string, unknown> = {};
  const now = new Date();
  if (objectType === 'deal') {
    stamps.won_at = toStage.state === 'won' ? now : null;
    stamps.lost_at = toStage.state === 'lost' ? now : null;
  } else if (objectType === 'lead') {
    stamps.qualified_at = toStage.state === 'won' ? record.qualified_at ?? now : null;
    stamps.disqualified_at = toStage.state === 'lost' ? now : null;
  } else if (objectType === 'ticket') {
    stamps.closed_at = toStage.state === 'closed' ? now : null;
  }

  const update: Record<string, unknown> = { ...columnUpdates, ...stamps, stage_id: toStage.id, pipeline_id: toStage.pipeline_id };
  await t`update ${t(table)} set ${t(update)} where id = ${recordId}`;
  if (Object.keys(customUpdates).length) {
    await t`update ${t(table)} set custom = custom || ${t.json(customUpdates as never)} where id = ${recordId}`;
  }
  const [after] = await t<Record<string, unknown>[]>`select * from ${t(table)} where id = ${recordId}`;

  // History.
  const probability =
    objectType === 'deal' ? ((after.forecast_probability as number | null) ?? toStage.probability) : toStage.probability;
  const [transition] = await t<{ id: string }[]>`
    insert into stage_transitions (object_type, record_id, pipeline_id, from_stage_id, to_stage_id, amount, currency,
                                   close_date, probability, actor_type, actor_id, source, reason)
    values (${objectType}, ${recordId}, ${toStage.pipeline_id}, ${fromStage?.id ?? null}, ${toStage.id},
            ${objectType === 'deal' ? (after.amount as string | null) : null},
            ${objectType === 'deal' ? (after.currency as string | null) : null},
            ${objectType === 'deal' ? (after.close_date as string | null) : null},
            ${probability}, ${input.actor.type}, ${input.actor.id ?? null}, ${input.source ?? null}, ${reason})
    returning id::text`;
  if (objectType === 'ticket') {
    await t`
      insert into ticket_status_events (ticket_id, from_stage_id, to_stage_id, pauses_sla, actor_user_id)
      values (${recordId}, ${fromStage?.id ?? null}, ${toStage.id}, ${toStage.pauses_sla},
              ${input.actor.type === 'user' ? input.actor.id ?? null : null})`;
  }

  // Time spent in the stage being left.
  let daysInFrom: number | null = null;
  if (fromStage) {
    const [entered] = await t<{ changed_at: Date }[]>`
      select changed_at from stage_transitions
       where object_type = ${objectType} and record_id = ${recordId} and to_stage_id = ${fromStage.id}
       order by changed_at desc, id desc limit 1`;
    daysInFrom = daysBetween(entered?.changed_at ?? (record.created_at as Date), now);
  }

  // Timeline entry on the record and its organization.
  const actorName =
    input.actor.type === 'user' && input.actor.id
      ? (await t<{ name: string }[]>`select name from users where id = ${input.actor.id}`)[0]?.name ?? null
      : input.actor.type === 'automation'
        ? 'Automation'
        : null;
  const name = String(after.name ?? after.subject ?? LABELS[objectType]);
  let title: string;
  if (objectType === 'deal' && toStage.state === 'won') {
    title = `Deal won, ${name}${after.amount ? ` ${formatMoney(after.amount as string, String(after.currency ?? 'EUR'))}` : ''}`;
  } else if (objectType === 'deal' && toStage.state === 'lost') {
    title = `Deal lost, ${name}`;
  } else if (fromStage) {
    title = `${LABELS[objectType]} moved from ${fromStage.name} to ${toStage.name}`;
  } else {
    title = `${LABELS[objectType]} entered ${toStage.name}`;
  }
  const tags = [actorName, fromStage && daysInFrom !== null ? daysInStageTag(daysInFrom, fromStage.name) : null].filter(
    (x): x is string => Boolean(x),
  );
  const links: Record<string, string | null>[] = [{ [`${objectType}Id`]: recordId }];
  if (after.organization_id) links.push({ organizationId: String(after.organization_id) });
  if (objectType === 'lead' && after.contact_id) links.push({ contactId: String(after.contact_id) });
  await logActivity(
    {
      kind: 'stage_change',
      direction: 'internal',
      occurredAt: now,
      actorUserId: input.actor.type === 'user' ? input.actor.id ?? null : null,
      title,
      body: reason ? `${reopening ? 'Reopened' : 'Moved back'}. ${reason}` : null,
      meta: {
        tags,
        object_type: objectType,
        from_stage_id: fromStage?.id ?? null,
        to_stage_id: toStage.id,
        from_stage: fromStage?.name ?? null,
        to_stage: toStage.name,
        source: input.source ?? null,
      },
      source: input.actor.type === 'automation' ? 'automation' : 'system',
      links: links.map((l) => ({
        leadId: l.leadId ?? null,
        dealId: l.dealId ?? null,
        projectId: l.projectId ?? null,
        ticketId: l.ticketId ?? null,
        organizationId: l.organizationId ?? null,
        contactId: l.contactId ?? null,
      })),
      autoLink: false,
    },
    t,
  );

  // Events.
  const payload = {
    id: recordId,
    objectType,
    pipelineKey: toStage.pipeline_key,
    fromStageId: fromStage?.id ?? null,
    fromStageKey: fromStage?.key ?? null,
    toStageId: toStage.id,
    toStageKey: toStage.key,
    toState: toStage.state,
    organizationId: (after.organization_id as string | null) ?? null,
    ownerUserId: (after.owner_user_id as string | null) ?? null,
    amount: objectType === 'deal' ? (after.amount as string | null) : undefined,
    currency: objectType === 'deal' ? (after.currency as string | null) : undefined,
    reason,
  };
  const emitOpts = {
    aggregateType: objectType,
    aggregateId: recordId,
    actorUserId: input.actor.type === 'user' ? input.actor.id ?? null : null,
  };
  await emit(t, `${objectType}.stage_changed` as DomainEventType, payload, emitOpts);
  if (objectType === 'deal' && toStage.state === 'won') await emit(t, 'deal.won', payload, emitOpts);
  if (objectType === 'deal' && toStage.state === 'lost') await emit(t, 'deal.lost', payload, emitOpts);

  // Lifecycle moves forward only.
  if (objectType === 'deal' && after.organization_id) {
    if (toStage.state === 'won') await bumpLifecycle(t, 'organization', String(after.organization_id), 'customer');
    else if (toStage.state === 'open') await bumpLifecycle(t, 'organization', String(after.organization_id), 'opportunity');
  }
  if (objectType === 'deal' && toStage.state === 'won') {
    const contacts = await t<{ contact_id: string }[]>`select contact_id from deal_contacts where deal_id = ${recordId}`;
    for (const c of contacts) await bumpLifecycle(t, 'contact', c.contact_id, 'customer');
  }

  return { changed: true, fromStage, toStage, transitionId: transition.id };
}

const LIFECYCLE_ORDER = ['lead', 'opportunity', 'customer'] as const;

/**
 * Move an organization's or contact's lifecycle forward (lead, opportunity, customer).
 * Never moves it back, and never touches 'former', which is set by hand.
 */
export async function bumpLifecycle(
  t: Tx,
  type: 'organization' | 'contact',
  id: string,
  to: (typeof LIFECYCLE_ORDER)[number],
): Promise<boolean> {
  const table = type === 'organization' ? 'organizations' : 'contacts';
  const [row] = await t<{ lifecycle_stage: string }[]>`select lifecycle_stage from ${t(table)} where id = ${id}`;
  if (!row || row.lifecycle_stage === 'former') return false;
  const cur = LIFECYCLE_ORDER.indexOf(row.lifecycle_stage as (typeof LIFECYCLE_ORDER)[number]);
  const next = LIFECYCLE_ORDER.indexOf(to);
  if (next <= cur) return false;
  await t`update ${t(table)} set lifecycle_stage = ${to} where id = ${id}`;
  return true;
}
