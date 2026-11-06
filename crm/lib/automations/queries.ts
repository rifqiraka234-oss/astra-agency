/**
 * lib/automations/queries.ts, reads for /settings/automations (agent E).
 */
import { sql, type Db } from '../db';
import { formatDate, todayKey } from '../format';
import { nextQuarterFirstMonday } from './calendar';
import type { Change } from './rules';

export type RuleListItem = {
  id: string;
  key: string;
  name: string;
  description: string | null;
  trigger_type: 'event' | 'schedule';
  trigger_event: string | null;
  schedule: string | null;
  steps: [string, string][];
  config: Record<string, unknown>;
  is_enabled: boolean;
  runs_total: number;
  runs_30d: number;
  failed_30d: number;
  last_run_at: Date | null;
  last_status: string | null;
};

export async function listRules(db: Db = sql): Promise<RuleListItem[]> {
  return db<RuleListItem[]>`
    select r.id, r.key, r.name, r.description, r.trigger_type, r.trigger_event, r.schedule, r.steps, r.config, r.is_enabled,
           (select count(*)::int from automation_runs x where x.rule_id = r.id and x.status <> 'skipped') as runs_total,
           (select count(*)::int from automation_runs x where x.rule_id = r.id and x.status <> 'skipped' and x.started_at > now() - interval '30 days') as runs_30d,
           (select count(*)::int from automation_runs x where x.rule_id = r.id and x.status = 'failed' and x.started_at > now() - interval '30 days') as failed_30d,
           last.started_at as last_run_at, last.status as last_status
      from automation_rules r
      left join lateral (
        select started_at, status from automation_runs x where x.rule_id = r.id order by started_at desc limit 1
      ) last on true
     order by r.is_enabled desc, r.trigger_type, r.name`;
}

export type RunItem = {
  id: string;
  status: 'success' | 'skipped' | 'failed';
  started_at: Date;
  finished_at: Date | null;
  event_id: string | null;
  event_type: string | null;
  event_attempts: number | null;
  run_key: string | null;
  changes: Change[];
  error: string | null;
};

export async function ruleRuns(ruleId: string, limit = 50, db: Db = sql): Promise<RunItem[]> {
  return db<RunItem[]>`
    select r.id, r.status, r.started_at, r.finished_at, r.event_id::text as event_id, e.type as event_type,
           e.attempts as event_attempts, r.run_key, r.changes, r.error
      from automation_runs r left join domain_events e on e.id = r.event_id
     where r.rule_id = ${ruleId}
     order by r.started_at desc
     limit ${limit}`;
}

/** Events still waiting for the worker, and the oldest one, so a stopped worker is visible. */
export async function workerBacklog(db: Db = sql): Promise<{ pending: number; failing: number; oldest: Date | null }> {
  const [r] = await db<{ pending: number; failing: number; oldest: Date | null }[]>`
    select count(*)::int as pending,
           count(*) filter (where last_error is not null)::int as failing,
           min(occurred_at) as oldest
      from domain_events where processed_at is null`;
  return r;
}

/** "41 runs this month", "Next run 4 Jan", for the list. */
export function runSummary(rule: RuleListItem, now: Date = new Date()): string {
  if (!rule.is_enabled) return rule.runs_total ? `Off, ${rule.runs_total} runs before` : 'Off';
  const parts: string[] = [];
  parts.push(rule.runs_30d === 1 ? '1 run in 30 days' : `${rule.runs_30d} runs in 30 days`);
  if (rule.last_run_at) parts.push(`last ${formatDate(rule.last_run_at, now)}`);
  if (rule.key === 'quarterly_checkin') parts.push(`next ${formatDate(nextQuarterFirstMonday(todayKey(now)).day, now)}`);
  if (rule.failed_30d) parts.push(`${rule.failed_30d} failed`);
  return parts.join(', ');
}

/** Plain English for the trigger. */
export function triggerText(rule: Pick<RuleListItem, 'trigger_type' | 'trigger_event' | 'key'>): string {
  if (rule.trigger_type === 'schedule') return rule.key === 'quarterly_checkin' ? 'On a schedule, each quarter' : 'On a schedule, every morning';
  const labels: Record<string, string> = {
    'deal.won': 'When a deal is won',
    'lead.replied': 'When a lead replies',
    'invoice.late': 'When an invoice turns late',
    'ticket.created': 'When a ticket is opened',
  };
  return labels[rule.trigger_event ?? ''] ?? `When ${rule.trigger_event}`;
}
