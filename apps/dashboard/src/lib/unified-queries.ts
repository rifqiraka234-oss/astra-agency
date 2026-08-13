import { getPool, loadTier2Queue, summarizeTier2Queue, type Tier2QueueRow } from '@astra/db';
import { describeLessonStatus, type LessonScope, type LessonState } from '@astra/core';

/**
 * Read models for the enrichment and learning views.
 *
 * The Tier 2 view is the human-readable mirror of the machine queue that used
 * to be maintained by hand as a second file. It is a projection of
 * `tier_decisions`, not a copy, so the two cannot drift.
 */

export interface Tier2View {
  readonly rows: readonly Tier2QueueRow[];
  readonly counts: {
    readonly manualReview: number;
    readonly doNotUse: number;
    readonly lowConfidenceInclude: number;
  };
}

export async function loadTier2View(): Promise<Tier2View> {
  const rows = await loadTier2Queue(getPool());
  return { rows, counts: summarizeTier2Queue(rows) };
}

export interface EnrichmentRunSummary {
  readonly runId: string;
  readonly startedAt: string;
  readonly completedAt: string | null;
  readonly processed: number;
  readonly includeCount: number;
  readonly manualReviewCount: number;
  readonly excludeCount: number;
  readonly importedCount: number;
  readonly halted: boolean;
  readonly haltReason: string | null;
}

export async function loadEnrichmentRuns(limit = 20): Promise<EnrichmentRunSummary[]> {
  const rows = await getPool().query<{
    id: string;
    started_at: Date;
    completed_at: Date | null;
    processed_count: number;
    include_count: number;
    manual_review_count: number;
    exclude_count: number;
    imported_count: number;
    halted: boolean;
    halt_reason: string | null;
  }>(
    `SELECT id, started_at, completed_at, processed_count, include_count,
            manual_review_count, exclude_count, imported_count, halted, halt_reason
       FROM enrichment_runs ORDER BY started_at DESC LIMIT $1`,
    [limit],
  );
  return rows.rows.map((r) => ({
    runId: r.id,
    startedAt: r.started_at.toISOString(),
    completedAt: r.completed_at?.toISOString() ?? null,
    processed: r.processed_count,
    includeCount: r.include_count,
    manualReviewCount: r.manual_review_count,
    excludeCount: r.exclude_count,
    importedCount: r.imported_count,
    halted: r.halted,
    haltReason: r.halt_reason,
  }));
}

export interface CapabilityView {
  readonly provider: string;
  readonly operation: string;
  readonly auth: string;
  readonly enablement: string;
  readonly reachability: string;
  readonly missingFields: readonly string[];
  readonly lastVerifiedAt: string | null;
  readonly lastFailureReason: string | null;
}

/**
 * The capability register, shown so a known gap is visible rather than
 * rediscovered. A missing field is not an error; it is a documented limit.
 */
export async function loadCapabilities(): Promise<CapabilityView[]> {
  const rows = await getPool().query<{
    provider: string;
    operation: string;
    auth_state: string;
    enablement_state: string;
    reachability_state: string;
    missing_fields: string[];
    last_verified_at: Date | null;
    last_failure_reason: string | null;
  }>(
    `SELECT provider, operation, auth_state, enablement_state, reachability_state,
            missing_fields, last_verified_at, last_failure_reason
       FROM provider_capabilities ORDER BY provider, operation`,
  );
  return rows.rows.map((r) => ({
    provider: r.provider,
    operation: r.operation,
    auth: r.auth_state,
    enablement: r.enablement_state,
    reachability: r.reachability_state,
    missingFields: r.missing_fields,
    lastVerifiedAt: r.last_verified_at?.toISOString() ?? null,
    lastFailureReason: r.last_failure_reason,
  }));
}

export interface LessonView {
  readonly id: string;
  readonly title: string;
  readonly reusableRule: string;
  readonly scope: LessonScope;
  readonly scopeId: string | null;
  readonly authorityClass: string;
  readonly riskClass: string;
  readonly confidence: number;
  readonly attributionConfidence: number;
  readonly counterexampleSearchPerformed: boolean;
  readonly state: LessonState;
  /**
   * The phrase the UI must use. An unpromoted candidate is never described as
   * something the system "learned".
   */
  readonly statusLabel: string;
  readonly evidenceRunCount: number;
  readonly createdAt: string;
}

export async function loadLessons(limit = 50): Promise<LessonView[]> {
  const rows = await getPool().query<{
    id: string;
    title: string;
    reusable_rule: string;
    scope: LessonScope;
    scope_id: string | null;
    authority_class: string;
    risk_class: string;
    confidence: string;
    attribution_confidence: string;
    counterexample_search_performed: boolean;
    status: LessonState;
    created_at: Date;
    evidence_count: string;
  }>(
    `SELECT lc.id, lc.title, lc.reusable_rule, lc.scope, lc.scope_id, lc.authority_class,
            lc.risk_class, lc.confidence, lc.attribution_confidence,
            lc.counterexample_search_performed, lc.status, lc.created_at,
            (SELECT count(*)::text FROM lesson_evidence_links l WHERE l.lesson_id = lc.id)
              AS evidence_count
       FROM lesson_candidates lc
      ORDER BY lc.created_at DESC
      LIMIT $1`,
    [limit],
  );

  return rows.rows.map((r) => ({
    id: r.id,
    title: r.title,
    reusableRule: r.reusable_rule,
    scope: r.scope,
    scopeId: r.scope_id,
    authorityClass: r.authority_class,
    riskClass: r.risk_class,
    confidence: Number(r.confidence),
    attributionConfidence: Number(r.attribution_confidence),
    counterexampleSearchPerformed: r.counterexample_search_performed,
    state: r.status,
    statusLabel: describeLessonStatus({
      state: r.status,
    } as Parameters<typeof describeLessonStatus>[0]),
    evidenceRunCount: Number(r.evidence_count),
    createdAt: r.created_at.toISOString(),
  }));
}

export interface RepeatedSignature {
  readonly signature: string;
  readonly occurrences: number;
}

/**
 * Failure signatures seen in more than one run. A repeat is the strongest
 * signal available: something we already saw once has now cost us twice.
 */
export async function loadRepeatedSignatures(limit = 20): Promise<RepeatedSignature[]> {
  const rows = await getPool().query<{ signature: string; occurrences: string }>(
    `SELECT signature, count(*)::text AS occurrences
       FROM run_retrospectives, unnest(repeated_signatures) AS signature
      GROUP BY signature
      ORDER BY count(*) DESC
      LIMIT $1`,
    [limit],
  );
  return rows.rows.map((r) => ({
    signature: r.signature,
    occurrences: Number(r.occurrences),
  }));
}
