import type {
  AuthorityClass,
  LessonScope,
  LessonState,
  OutcomeLabel,
  RetroRecommendation,
  RunRetrospective,
} from '@astra/core';
import { assertLessonTransition } from '@astra/core';
import { query, queryOne, type Sql } from './client.js';

/**
 * Typed access to the learning tables.
 *
 * The one behavior this module adds beyond mapping rows is that a lesson state
 * change goes through the core transition table before it touches the
 * database. A promotion is the single place where the system could quietly
 * expand its own authority, so an illegal transition must fail before the write
 * rather than be caught by a check constraint afterwards.
 */

// --- feedback ----------------------------------------------------------------

export async function recordFeedbackEvent(
  sql: Sql,
  input: {
    runId: string | null;
    conversationId: string | null;
    sourceContactId: string | null;
    eventType: string;
    actor: string;
    beforeValue: string | null;
    afterValue: string | null;
    reason: string | null;
    outcome: OutcomeLabel | null;
    attributionConfidence: number | null;
  },
): Promise<string> {
  const row = await queryOne<{ id: string }>(
    sql,
    `INSERT INTO feedback_events
       (run_id, conversation_id, source_contact_id, event_type, actor,
        before_value, after_value, reason, outcome, attribution_confidence)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
     RETURNING id`,
    [
      input.runId,
      input.conversationId,
      input.sourceContactId,
      input.eventType,
      input.actor,
      input.beforeValue,
      input.afterValue,
      input.reason,
      input.outcome,
      input.attributionConfidence,
    ],
  );
  if (row === null) throw new Error('feedback event insert returned no row');
  return row.id;
}

// --- retrospectives ----------------------------------------------------------

export async function saveRetrospective(
  sql: Sql,
  retro: RunRetrospective,
  costSummary: unknown,
): Promise<string> {
  const repeatedSignatures = retro.findings
    .filter((f) => f.priorOccurrences > 0)
    .map((f) => f.signature);

  const row = await queryOne<{ id: string }>(
    sql,
    `INSERT INTO run_retrospectives
       (run_id, attempted, completed, external_writes, operator_corrections,
        mistakes, near_misses, root_causes, repeated_signatures, cost_summary,
        unresolved_risks, recommendation)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
     ON CONFLICT (run_id) DO UPDATE SET
       attempted            = excluded.attempted,
       completed            = excluded.completed,
       external_writes      = excluded.external_writes,
       operator_corrections = excluded.operator_corrections,
       mistakes             = excluded.mistakes,
       near_misses          = excluded.near_misses,
       root_causes          = excluded.root_causes,
       repeated_signatures  = excluded.repeated_signatures,
       cost_summary         = excluded.cost_summary,
       unresolved_risks     = excluded.unresolved_risks,
       recommendation       = excluded.recommendation
     RETURNING id`,
    [
      retro.runId,
      JSON.stringify(retro.attemptedInOrder),
      JSON.stringify(retro.completed),
      JSON.stringify(retro.externalWritesMade),
      JSON.stringify(retro.operatorCorrections),
      JSON.stringify(retro.findings.filter((f) => !f.nearMiss)),
      JSON.stringify(retro.findings.filter((f) => f.nearMiss)),
      JSON.stringify(retro.findings.map((f) => f.rootCause)),
      repeatedSignatures,
      JSON.stringify(costSummary),
      JSON.stringify(retro.unresolvedRisks),
      retro.recommendation satisfies RetroRecommendation,
    ],
  );
  if (row === null) throw new Error('retrospective insert returned no row');
  return row.id;
}

/**
 * How many earlier runs carry this failure signature. A signature seen before
 * is the difference between "investigate" and "fix", so the count is read from
 * the ledger rather than recalled.
 */
export async function countPriorSignatureOccurrences(
  sql: Sql,
  signature: string,
): Promise<number> {
  const row = await queryOne<{ count: string }>(
    sql,
    `SELECT count(*)::text AS count FROM run_retrospectives WHERE $1 = ANY (repeated_signatures)`,
    [signature],
  );
  return row === null ? 0 : Number(row.count);
}

// --- lessons -----------------------------------------------------------------

export interface LessonRow {
  readonly id: string;
  readonly title: string;
  readonly reusable_rule: string;
  readonly scope: LessonScope;
  readonly scope_id: string | null;
  readonly authority_class: AuthorityClass;
  readonly risk_class: string;
  readonly confidence: string;
  readonly attribution_confidence: string;
  readonly counterexample_search_performed: boolean;
  readonly status: LessonState;
  readonly created_at: Date;
}

export async function insertLessonCandidate(
  sql: Sql,
  input: {
    title: string;
    observation: string;
    exactFailureOrSuccess: string;
    rootCause: string;
    beforeExample: string | null;
    afterExample: string;
    reusableRule: string;
    scope: LessonScope;
    scopeId: string | null;
    applicableConditions: readonly string[];
    counterexamples: readonly string[];
    counterexampleSearchPerformed: boolean;
    knownNonApplicability: readonly string[];
    confidence: number;
    attributionConfidence: number;
    authorityClass: AuthorityClass;
    riskClass: 'LOW' | 'MEDIUM' | 'HIGH';
    expectedBenefit: string;
    possibleHarm: string;
    reversibility: string;
    requiredEvalCases: readonly string[];
    requiredApprover: string | null;
    createdByModelVersion: string;
  },
): Promise<LessonRow> {
  const row = await queryOne<LessonRow>(
    sql,
    `INSERT INTO lesson_candidates
       (title, observation, exact_failure_or_success, root_cause, before_example, after_example,
        reusable_rule, scope, scope_id, applicable_conditions, counterexamples,
        counterexample_search_performed, known_non_applicability, confidence,
        attribution_confidence, authority_class, risk_class, expected_benefit, possible_harm,
        reversibility, required_eval_cases, required_approver, created_by_model_version)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23)
     RETURNING id, title, reusable_rule, scope, scope_id, authority_class, risk_class,
               confidence, attribution_confidence, counterexample_search_performed,
               status, created_at`,
    [
      input.title,
      input.observation,
      input.exactFailureOrSuccess,
      input.rootCause,
      input.beforeExample,
      input.afterExample,
      input.reusableRule,
      input.scope,
      input.scopeId,
      JSON.stringify(input.applicableConditions),
      JSON.stringify(input.counterexamples),
      input.counterexampleSearchPerformed,
      JSON.stringify(input.knownNonApplicability),
      input.confidence,
      input.attributionConfidence,
      input.authorityClass,
      input.riskClass,
      input.expectedBenefit,
      input.possibleHarm,
      input.reversibility,
      input.requiredEvalCases,
      input.requiredApprover,
      input.createdByModelVersion,
    ],
  );
  if (row === null) throw new Error('lesson insert returned no row');
  return row;
}

export async function linkLessonEvidence(
  sql: Sql,
  lessonId: string,
  runId: string,
  note: string | null,
): Promise<void> {
  await query(
    sql,
    `INSERT INTO lesson_evidence_links (lesson_id, run_id, note)
     VALUES ($1, $2, $3)
     ON CONFLICT DO NOTHING`,
    [lessonId, runId, note],
  );
}

export async function loadLessonEvidenceRunIds(sql: Sql, lessonId: string): Promise<string[]> {
  const rows = await query<{ run_id: string }>(
    sql,
    `SELECT run_id FROM lesson_evidence_links WHERE lesson_id = $1`,
    [lessonId],
  );
  return rows.map((r) => r.run_id);
}

/**
 * The state change is validated against the core transition table *before* the
 * update statement runs, so an illegal promotion never reaches the database at
 * all. The `WHERE status = $2` guard then makes the write safe under
 * concurrency: two operators clicking approve cannot both succeed.
 */
export async function transitionLesson(
  sql: Sql,
  input: {
    lessonId: string;
    from: LessonState;
    to: LessonState;
    decidedBy: string | null;
    authorityClass: AuthorityClass;
    rationale: string;
    evalRunId: string | null;
  },
): Promise<boolean> {
  assertLessonTransition(input.from, input.to);

  const updated = await query<{ id: string }>(
    sql,
    `UPDATE lesson_candidates
        SET status = $3, updated_at = now()
      WHERE id = $1 AND status = $2
      RETURNING id`,
    [input.lessonId, input.from, input.to],
  );
  if (updated.length === 0) return false;

  await query(
    sql,
    `INSERT INTO promotion_decisions
       (lesson_id, from_status, to_status, authority_class, decided_by, rationale, eval_run_id)
     VALUES ($1, $2, $3, $4, $5, $6, $7)`,
    [
      input.lessonId,
      input.from,
      input.to,
      input.authorityClass,
      input.decidedBy,
      input.rationale,
      input.evalRunId,
    ],
  );
  return true;
}

export async function listLessonsByStatus(
  sql: Sql,
  statuses: readonly LessonState[],
  limit = 100,
): Promise<LessonRow[]> {
  return query<LessonRow>(
    sql,
    `SELECT id, title, reusable_rule, scope, scope_id, authority_class, risk_class,
            confidence, attribution_confidence, counterexample_search_performed,
            status, created_at
       FROM lesson_candidates
      WHERE status = ANY ($1)
      ORDER BY created_at DESC
      LIMIT $2`,
    [statuses, limit],
  );
}

/**
 * Rejected candidates are kept and searchable specifically so the same idea is
 * not rediscovered and re-proposed every week.
 */
export async function findSupersededOrRejectedByRule(
  sql: Sql,
  reusableRule: string,
): Promise<LessonRow[]> {
  return query<LessonRow>(
    sql,
    `SELECT id, title, reusable_rule, scope, scope_id, authority_class, risk_class,
            confidence, attribution_confidence, counterexample_search_performed,
            status, created_at
       FROM lesson_candidates
      WHERE status IN ('REJECTED', 'SUPERSEDED') AND reusable_rule = $1`,
    [reusableRule],
  );
}
