/**
 * lib/automations/engine.ts, the worker's core (agent E). scripts/worker.ts is
 * a thin loop around these functions, tests call them directly.
 *
 *   await processPending({ limit: 100 });      // claim and run due domain_events
 *   await runSchedules(new Date());             // time based rules, once per run key
 *   await processEvent(t, eventId);              // one event inside your own transaction
 *
 * Guarantees
 *   * Claiming uses FOR UPDATE SKIP LOCKED, so two workers never hold the same event.
 *   * A rule never runs twice for the same event: automation_runs is unique on
 *     (rule_id, event_id), a success or skipped run is never repeated, and each
 *     handler also checks for what it would create.
 *   * Each rule runs in a savepoint. A failing rule rolls back only its own
 *     changes, is logged as failed, and the event is retried with backoff
 *     (1, 2, 4, 8, 16 minutes). After MAX_ATTEMPTS it is closed with the error.
 *   * Schedule rules run once per run key (a day, or a quarter), recorded in
 *     automation_runs.run_key.
 */
import { sql, tx, type Tx } from '../db';
import { EVENT_HANDLERS, SCHEDULE_HANDLERS, type EventRow, type RuleOutcome, type RuleRow } from './rules';

export const MAX_ATTEMPTS = 6;

export type EventResult = {
  eventId: string;
  type: string;
  runs: { rule: string; status: 'success' | 'skipped' | 'failed' | 'already'; note?: string; error?: string }[];
  processed: boolean;
};

function backoffMinutes(attempts: number): number {
  return Math.min(60, 2 ** Math.max(0, attempts - 1));
}

async function enabledEventRules(t: Tx, type: string): Promise<RuleRow[]> {
  return t<RuleRow[]>`
    select id, key, name, trigger_type, trigger_event, schedule, config, is_enabled
      from automation_rules
     where is_enabled and trigger_type = 'event' and trigger_event = ${type}
     order by key`;
}

async function recordRun(
  t: Tx,
  rule: RuleRow,
  ref: { eventId?: string | null; runKey?: string | null },
  startedAt: Date,
  outcome: { status: 'success' | 'skipped' | 'failed'; changes: unknown[]; error?: string | null; note?: string | null },
): Promise<void> {
  const changes = outcome.note ? [...outcome.changes, { action: 'note', entity: 'rule', label: outcome.note }] : outcome.changes;
  if (ref.eventId) {
    await t`
      insert into automation_runs (rule_id, event_id, status, started_at, finished_at, changes, error)
      values (${rule.id}, ${ref.eventId}, ${outcome.status}, ${startedAt}, now(), ${t.json(changes as never)}, ${outcome.error ?? null})
      on conflict (rule_id, event_id) where event_id is not null do update
        set status = excluded.status, started_at = excluded.started_at, finished_at = excluded.finished_at,
            changes = excluded.changes, error = excluded.error`;
  } else {
    await t`
      insert into automation_runs (rule_id, run_key, status, started_at, finished_at, changes, error)
      values (${rule.id}, ${ref.runKey ?? null}, ${outcome.status}, ${startedAt}, now(), ${t.json(changes as never)}, ${outcome.error ?? null})
      on conflict (rule_id, run_key) where run_key is not null do update
        set status = excluded.status, started_at = excluded.started_at, finished_at = excluded.finished_at,
            changes = excluded.changes, error = excluded.error`;
  }
}

function errorText(err: unknown): string {
  if (err instanceof Error) return err.message.slice(0, 1000);
  return String(err).slice(0, 1000);
}

/**
 * Run every enabled rule for one event, inside the caller's transaction. Locks
 * the event row (SKIP LOCKED, so returns null when another worker holds it).
 * Safe to call again for a processed event: rules that already ran are skipped.
 */
export async function processEvent(t: Tx, eventId: string, now: Date = new Date()): Promise<EventResult | null> {
  const [event] = await t<EventRow[]>`
    select id::text as id, type, aggregate_type, aggregate_id, payload, actor_user_id, occurred_at, attempts
      from domain_events where id = ${eventId} for update skip locked`;
  if (!event) return null;
  const result: EventResult = { eventId: event.id, type: event.type, runs: [], processed: false };
  let failed: string | null = null;

  for (const rule of await enabledEventRules(t, event.type)) {
    const handler = EVENT_HANDLERS[rule.key];
    if (!handler) continue; // a rule defined in the database with no code yet
    const [prev] = await t<{ status: string }[]>`
      select status from automation_runs where rule_id = ${rule.id} and event_id = ${event.id}`;
    if (prev && prev.status !== 'failed') {
      result.runs.push({ rule: rule.key, status: 'already' });
      continue;
    }
    const startedAt = new Date();
    try {
      const outcome: RuleOutcome = await t.savepoint((sp) => handler(sp as unknown as Tx, { rule, event, now }));
      await recordRun(t, rule, { eventId: event.id }, startedAt, outcome);
      result.runs.push({ rule: rule.key, status: outcome.status, note: outcome.note });
    } catch (err) {
      failed = errorText(err);
      await recordRun(t, rule, { eventId: event.id }, startedAt, { status: 'failed', changes: [], error: failed });
      result.runs.push({ rule: rule.key, status: 'failed', error: failed });
    }
  }

  if (failed) {
    const attempts = event.attempts + 1;
    const giveUp = attempts >= MAX_ATTEMPTS;
    await t`
      update domain_events
         set attempts = ${attempts}, last_error = ${failed},
             next_attempt_at = ${giveUp ? null : new Date(now.getTime() + backoffMinutes(attempts) * 60_000)},
             processed_at = ${giveUp ? now : null}
       where id = ${event.id}`;
    result.processed = giveUp;
  } else {
    await t`update domain_events set processed_at = ${now}, last_error = null, next_attempt_at = null where id = ${event.id}`;
    result.processed = true;
  }
  return result;
}

/** Claim due events one at a time and process each in its own transaction. */
export async function processPending(opts: { limit?: number; now?: Date } = {}): Promise<EventResult[]> {
  const out: EventResult[] = [];
  const limit = opts.limit ?? 100;
  for (let i = 0; i < limit; i++) {
    const res = await tx(
      async (t) => {
        const [next] = await t<{ id: string }[]>`
          select id::text as id from domain_events
           where processed_at is null and (next_attempt_at is null or next_attempt_at <= now())
           order by id
           limit 1
           for update skip locked`;
        if (!next) return 'empty' as const;
        return processEvent(t, next.id, opts.now ?? new Date());
      },
      { source: 'automation' },
    );
    if (res === 'empty') break;
    if (res) out.push(res);
  }
  return out;
}

export type ScheduleResult = { rule: string; runKey: string | null; status: 'success' | 'skipped' | 'failed' | 'not_due' | 'already'; note?: string; error?: string; created: number };

/** Run one schedule rule if it is due and has not run for its key, inside the caller's transaction. */
export async function runScheduleRule(t: Tx, rule: RuleRow, now: Date, force = false): Promise<ScheduleResult> {
  const handler = SCHEDULE_HANDLERS[rule.key];
  if (!handler) return { rule: rule.key, runKey: null, status: 'not_due', created: 0 };
  const runKey = force ? `manual:${now.toISOString()}` : handler.due(rule, now);
  if (!runKey) return { rule: rule.key, runKey: null, status: 'not_due', created: 0 };
  // Serialise schedule runs of the same rule across workers.
  await t`select pg_advisory_xact_lock(hashtext(${'automation:' + rule.key}))`;
  const [prev] = await t<{ status: string }[]>`select status from automation_runs where rule_id = ${rule.id} and run_key = ${runKey}`;
  if (prev && prev.status !== 'failed') return { rule: rule.key, runKey, status: 'already', created: 0 };
  const startedAt = new Date();
  try {
    const outcome = await t.savepoint((sp) => handler.run(sp as unknown as Tx, { rule, now, runKey }));
    await recordRun(t, rule, { runKey }, startedAt, outcome);
    return { rule: rule.key, runKey, status: outcome.status, note: outcome.note, created: outcome.changes.filter((c) => c.action === 'created' || c.action === 'updated').length };
  } catch (err) {
    const error = errorText(err);
    await recordRun(t, rule, { runKey }, startedAt, { status: 'failed', changes: [], error });
    return { rule: rule.key, runKey, status: 'failed', error, created: 0 };
  }
}

/** The daily scheduler pass: every enabled schedule rule, each in its own transaction. */
export async function runSchedules(now: Date = new Date()): Promise<ScheduleResult[]> {
  const rules = await sql<RuleRow[]>`
    select id, key, name, trigger_type, trigger_event, schedule, config, is_enabled
      from automation_rules where is_enabled and trigger_type = 'schedule' order by key`;
  const out: ScheduleResult[] = [];
  for (const rule of rules) {
    out.push(await tx((t) => runScheduleRule(t, rule, now), { source: 'automation' }));
  }
  return out;
}

/** Run a schedule rule now, whatever the time, from the settings page. */
export async function runRuleNow(ruleKey: string, userId: string | null): Promise<ScheduleResult> {
  return tx(
    async (t) => {
      const [rule] = await t<RuleRow[]>`
        select id, key, name, trigger_type, trigger_event, schedule, config, is_enabled from automation_rules where key = ${ruleKey}`;
      if (!rule || rule.trigger_type !== 'schedule') throw new Error('Only scheduled rules can be run by hand');
      return runScheduleRule(t, rule, new Date(), true);
    },
    { userId, source: 'automation' },
  );
}
