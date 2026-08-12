/**
 * In-process counters, exposed at /metrics in Prometheus text format.
 *
 * Deliberately dependency free. The point is not a rich metrics stack, it is
 * that the numbers a human would ask about during an incident ("how many
 * sends have we actually made today?") are countable without reading the
 * database.
 */

type Labels = Record<string, string>;

interface Counter {
  readonly help: string;
  readonly values: Map<string, { labels: Labels; value: number }>;
}

const counters = new Map<string, Counter>();
const histograms = new Map<string, { help: string; samples: number[] }>();

export const METRIC_NAMES = {
  webhooksReceived: 'astra_webhooks_received_total',
  webhooksRejected: 'astra_webhooks_rejected_total',
  webhooksDuplicate: 'astra_webhooks_duplicate_total',
  decisions: 'astra_decisions_total',
  autoSends: 'astra_auto_sends_total',
  drafts: 'astra_drafts_created_total',
  approvalsRequested: 'astra_approvals_requested_total',
  approvalsStale: 'astra_approvals_stale_total',
  handoffs: 'astra_handoffs_total',
  prototypeBuilds: 'astra_prototype_builds_total',
  calendarQueries: 'astra_calendar_queries_total',
  calendarBookings: 'astra_calendar_bookings_total',
  integrationErrors: 'astra_integration_errors_total',
  blockedWrites: 'astra_blocked_writes_total',
  deadLetters: 'astra_dead_letters_total',
} as const;

const HELP: Record<string, string> = {
  [METRIC_NAMES.webhooksReceived]: 'Webhook deliveries accepted for processing',
  [METRIC_NAMES.webhooksRejected]: 'Webhook deliveries rejected, by reason',
  [METRIC_NAMES.webhooksDuplicate]: 'Webhook deliveries collapsed as duplicates',
  [METRIC_NAMES.decisions]: 'Controller decisions, by action',
  [METRIC_NAMES.autoSends]: 'Messages sent automatically, by low-risk case',
  [METRIC_NAMES.drafts]: 'Lemlist drafts created',
  [METRIC_NAMES.approvalsRequested]: 'Approvals requested, by action type',
  [METRIC_NAMES.approvalsStale]: 'Approvals invalidated by newer state',
  [METRIC_NAMES.handoffs]: 'Conversations handed to a human, by reason',
  [METRIC_NAMES.prototypeBuilds]: 'Prototype build outcomes',
  [METRIC_NAMES.calendarQueries]: 'Free/busy queries, by outcome',
  [METRIC_NAMES.calendarBookings]: 'Calendar events created',
  [METRIC_NAMES.integrationErrors]: 'Integration failures, by integration',
  [METRIC_NAMES.blockedWrites]: 'External writes blocked by the guard, by reason',
  [METRIC_NAMES.deadLetters]: 'Jobs moved to the dead-letter queue',
};

export function increment(name: string, labels: Labels = {}, by = 1): void {
  const counter = counters.get(name) ?? { help: HELP[name] ?? name, values: new Map() };
  const key = labelKey(labels);
  const existing = counter.values.get(key) ?? { labels, value: 0 };
  existing.value += by;
  counter.values.set(key, existing);
  counters.set(name, counter);
}

export function observe(name: string, valueMs: number): void {
  const histogram = histograms.get(name) ?? { help: HELP[name] ?? name, samples: [] };
  histogram.samples.push(valueMs);
  // Bounded so a long-running worker cannot grow this without limit.
  if (histogram.samples.length > 1000) histogram.samples.shift();
  histograms.set(name, histogram);
}

export function resetMetrics(): void {
  counters.clear();
  histograms.clear();
}

export function counterValue(name: string, labels: Labels = {}): number {
  return counters.get(name)?.values.get(labelKey(labels))?.value ?? 0;
}

export function renderPrometheus(): string {
  const lines: string[] = [];

  for (const [name, counter] of counters) {
    lines.push(`# HELP ${name} ${counter.help}`);
    lines.push(`# TYPE ${name} counter`);
    for (const { labels, value } of counter.values.values()) {
      lines.push(`${name}${renderLabels(labels)} ${value}`);
    }
  }

  for (const [name, histogram] of histograms) {
    if (histogram.samples.length === 0) continue;
    const sorted = [...histogram.samples].sort((a, b) => a - b);
    lines.push(`# HELP ${name} ${histogram.help}`);
    lines.push(`# TYPE ${name} summary`);
    lines.push(`${name}{quantile="0.5"} ${percentile(sorted, 0.5)}`);
    lines.push(`${name}{quantile="0.95"} ${percentile(sorted, 0.95)}`);
    lines.push(`${name}_count ${sorted.length}`);
  }

  return `${lines.join('\n')}\n`;
}

function percentile(sorted: readonly number[], quantile: number): number {
  if (sorted.length === 0) return 0;
  const index = Math.min(sorted.length - 1, Math.floor(quantile * sorted.length));
  return sorted[index] ?? 0;
}

function labelKey(labels: Labels): string {
  return Object.entries(labels)
    .sort(([a], [b]) => (a < b ? -1 : 1))
    .map(([key, value]) => `${key}=${value}`)
    .join(',');
}

function renderLabels(labels: Labels): string {
  const entries = Object.entries(labels);
  if (entries.length === 0) return '';
  const rendered = entries
    .sort(([a], [b]) => (a < b ? -1 : 1))
    .map(([key, value]) => `${key}="${escapeLabel(value)}"`)
    .join(',');
  return `{${rendered}}`;
}

function escapeLabel(value: string): string {
  return value.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, ' ');
}
