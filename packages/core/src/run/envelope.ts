/**
 * The durable run envelope (specification section 6).
 *
 * Every engine — enrichment, conversation, prototype studio, learning — opens
 * exactly one of these. It is the unit that makes a run recoverable after a
 * process restart, and it is the only place where "what did this run actually
 * write to the outside world" is answered. The counters are deliberately three
 * separate numbers rather than one: `requested` is what the engine wanted,
 * `allowed` is what the guard permitted, and `completed` is what a provider
 * actually acknowledged. A run where requested > allowed is a healthy run under
 * a closed gate; a run where allowed > completed is an unreconciled run and has
 * to be treated as `UNKNOWN`, never as success.
 */

export const RUN_ENGINES = ['ENRICHMENT', 'CONVERSATION', 'PROTOTYPE', 'LEARNING'] as const;
export type RunEngine = (typeof RUN_ENGINES)[number];

export const RUN_TRIGGERS = [
  'SCHEDULE',
  'WEBHOOK',
  'OPERATOR',
  'RETRY',
  'BACKFILL',
  'DEMO',
] as const;
export type RunTrigger = (typeof RUN_TRIGGERS)[number];

export const RUN_STATUSES = [
  'RUNNING',
  'COMPLETED',
  'COMPLETED_WITH_ERRORS',
  'ABORTED',
  'FAILED',
  'INTERRUPTED',
] as const;
export type RunStatus = (typeof RUN_STATUSES)[number];

/** A run that ended in one of these can never be resumed in place. */
export const TERMINAL_RUN_STATUSES: readonly RunStatus[] = [
  'COMPLETED',
  'COMPLETED_WITH_ERRORS',
  'ABORTED',
  'FAILED',
];

export interface RunVersions {
  readonly policyVersion: string;
  /** prompt name -> semantic version actually loaded for this run. */
  readonly promptVersions: Readonly<Record<string, string>>;
  /** logical model role -> exact provider model id. */
  readonly modelVersions: Readonly<Record<string, string>>;
  /** provider name -> adapter/API version this run bound itself to. */
  readonly integrationVersions: Readonly<Record<string, string>>;
}

export interface RunCost {
  readonly inputTokens: number;
  readonly outputTokens: number;
  readonly providerCreditsMilli: number;
  readonly wallClockMs: number;
}

export const EMPTY_RUN_COST: RunCost = {
  inputTokens: 0,
  outputTokens: 0,
  providerCreditsMilli: 0,
  wallClockMs: 0,
};

export interface RunEnvelope {
  readonly runId: string;
  readonly correlationId: string;
  readonly engine: RunEngine;
  readonly trigger: RunTrigger;
  readonly environment: string;
  readonly runtimeMode: string;
  readonly versions: RunVersions;
  readonly inputSnapshotHash: string;
  readonly startedAt: string;
  readonly completedAt: string | null;
  readonly status: RunStatus;
  readonly externalWritesRequested: number;
  readonly externalWritesAllowed: number;
  readonly externalWritesCompleted: number;
  readonly cost: RunCost;
  readonly evidenceRefs: readonly string[];
  readonly artifactRefs: readonly string[];
  readonly errors: readonly RunError[];
  readonly retries: number;
  readonly operatorFeedbackIds: readonly string[];
  readonly learningObservationIds: readonly string[];
}

export interface RunError {
  readonly at: string;
  readonly stage: string;
  readonly reasonCode: string;
  readonly message: string;
  readonly retryable: boolean;
}

export interface StartRunInput {
  readonly runId: string;
  readonly correlationId: string;
  readonly engine: RunEngine;
  readonly trigger: RunTrigger;
  readonly environment: string;
  readonly runtimeMode: string;
  readonly versions: RunVersions;
  readonly inputSnapshotHash: string;
  readonly startedAt: string;
}

export function startRun(input: StartRunInput): RunEnvelope {
  return {
    ...input,
    completedAt: null,
    status: 'RUNNING',
    externalWritesRequested: 0,
    externalWritesAllowed: 0,
    externalWritesCompleted: 0,
    cost: EMPTY_RUN_COST,
    evidenceRefs: [],
    artifactRefs: [],
    errors: [],
    retries: 0,
    operatorFeedbackIds: [],
    learningObservationIds: [],
  };
}

export function addRunCost(envelope: RunEnvelope, delta: Partial<RunCost>): RunEnvelope {
  return {
    ...envelope,
    cost: {
      inputTokens: envelope.cost.inputTokens + (delta.inputTokens ?? 0),
      outputTokens: envelope.cost.outputTokens + (delta.outputTokens ?? 0),
      providerCreditsMilli:
        envelope.cost.providerCreditsMilli + (delta.providerCreditsMilli ?? 0),
      wallClockMs: envelope.cost.wallClockMs + (delta.wallClockMs ?? 0),
    },
  };
}

export function recordRunError(envelope: RunEnvelope, error: RunError): RunEnvelope {
  return { ...envelope, errors: [...envelope.errors, error] };
}

/**
 * Close a run. The status is derived, not supplied, so an engine cannot report
 * `COMPLETED` on a run that recorded errors or that has writes it allowed but
 * never reconciled.
 */
export function completeRun(
  envelope: RunEnvelope,
  completedAt: string,
  options: { readonly aborted?: boolean } = {},
): RunEnvelope {
  const unreconciled = envelope.externalWritesAllowed > envelope.externalWritesCompleted;
  const status: RunStatus = options.aborted
    ? 'ABORTED'
    : envelope.errors.length > 0 || unreconciled
      ? 'COMPLETED_WITH_ERRORS'
      : 'COMPLETED';
  return { ...envelope, completedAt, status };
}

export function isRunTerminal(envelope: RunEnvelope): boolean {
  return TERMINAL_RUN_STATUSES.includes(envelope.status);
}

/**
 * A run that was `RUNNING` when the process died is resumable; anything that
 * reached a terminal status is not. Resuming a terminal run would replay its
 * external writes, which is exactly the failure the run ledger exists to stop.
 */
export function canResumeRun(envelope: RunEnvelope): boolean {
  return envelope.status === 'RUNNING' || envelope.status === 'INTERRUPTED';
}
