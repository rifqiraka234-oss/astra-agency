/**
 * Automatic run retrospectives (specification section 25.2).
 *
 * A retrospective is derived from the immutable run ledger, never from model
 * memory, and it may summarize the evidence but never overwrite it. The
 * structure below is the spec's twelve-point list turned into a type, so a
 * retrospective that omits a section is a compile error rather than a quietly
 * shorter document.
 */

import type { RunEnvelope } from '../run/envelope.js';

export const ROOT_CAUSE_CLASSES = [
  'PROVIDER_CAPABILITY',
  'PROVIDER_CONTRACT_CHANGE',
  'NETWORK_OR_TRANSPORT',
  'POLICY_BLOCK',
  'MODEL_OUTPUT_QUALITY',
  'PROMPT_DEFECT',
  'CODE_DEFECT',
  'DATA_QUALITY',
  'OPERATOR_CORRECTION',
  'CONFIGURATION',
  'COST_OR_BUDGET',
  'UNKNOWN',
] as const;
export type RootCauseClass = (typeof ROOT_CAUSE_CLASSES)[number];

export const RETRO_RECOMMENDATIONS = [
  'RETAIN',
  'EXPERIMENT',
  'FIX',
  'ESCALATE',
  'DEPRECATE',
  'NO_CHANGE',
] as const;
export type RetroRecommendation = (typeof RETRO_RECOMMENDATIONS)[number];

export interface RetroFinding {
  readonly signature: string;
  readonly description: string;
  readonly rootCause: RootCauseClass;
  /** How many prior runs carry this same signature. Zero means first-seen. */
  readonly priorOccurrences: number;
  readonly nearMiss: boolean;
}

export interface WastedWorkAnalysis {
  /** Tokens spent on work that produced nothing usable. */
  readonly wastedInputTokens: number;
  readonly wastedOutputTokens: number;
  readonly wastedWallClockMs: number;
  readonly cause: string | null;
}

export interface RunRetrospective {
  readonly runId: string;
  readonly attemptedInOrder: readonly string[];
  readonly completed: readonly string[];
  readonly notCompleted: readonly string[];
  readonly externalWritesMade: readonly string[];
  readonly operatorCorrections: readonly string[];
  readonly systemIdentifiedImprovements: readonly string[];
  readonly findings: readonly RetroFinding[];
  readonly wastedWork: WastedWorkAnalysis;
  readonly unresolvedRisks: readonly string[];
  readonly candidateRegressionTests: readonly string[];
  readonly candidateLessonIds: readonly string[];
  readonly recommendation: RetroRecommendation;
  readonly generatedAt: string;
}

export interface RetrospectiveInput {
  readonly envelope: RunEnvelope;
  readonly attemptedInOrder: readonly string[];
  readonly completed: readonly string[];
  readonly externalWritesMade: readonly string[];
  readonly operatorCorrections: readonly string[];
  readonly systemIdentifiedImprovements: readonly string[];
  readonly findings: readonly RetroFinding[];
  readonly wastedWork: WastedWorkAnalysis;
  readonly unresolvedRisks: readonly string[];
  readonly candidateRegressionTests: readonly string[];
  readonly candidateLessonIds: readonly string[];
  readonly generatedAt: string;
}

/**
 * `notCompleted` is derived by subtraction rather than supplied, so a run
 * cannot report a clean sheet by simply not mentioning the stage that failed.
 */
export function buildRetrospective(input: RetrospectiveInput): RunRetrospective {
  const completed = new Set(input.completed);
  const notCompleted = input.attemptedInOrder.filter((step) => !completed.has(step));

  return {
    runId: input.envelope.runId,
    attemptedInOrder: input.attemptedInOrder,
    completed: input.completed,
    notCompleted,
    externalWritesMade: input.externalWritesMade,
    operatorCorrections: input.operatorCorrections,
    systemIdentifiedImprovements: input.systemIdentifiedImprovements,
    findings: input.findings,
    wastedWork: input.wastedWork,
    unresolvedRisks: input.unresolvedRisks,
    candidateRegressionTests: input.candidateRegressionTests,
    candidateLessonIds: input.candidateLessonIds,
    recommendation: recommendFromFindings(input.findings, notCompleted, input.unresolvedRisks),
    generatedAt: input.generatedAt,
  };
}

export function recommendFromFindings(
  findings: readonly RetroFinding[],
  notCompleted: readonly string[],
  unresolvedRisks: readonly string[],
): RetroRecommendation {
  // A repeated signature is the strongest signal in the system: something we
  // already saw once and did not fix has now cost us twice.
  const repeated = findings.filter((f) => f.priorOccurrences > 0 && !f.nearMiss);
  if (repeated.length > 0) return 'FIX';
  if (unresolvedRisks.length > 0) return 'ESCALATE';
  if (findings.some((f) => !f.nearMiss)) return 'FIX';
  if (notCompleted.length > 0) return 'ESCALATE';
  if (findings.length > 0) return 'EXPERIMENT';
  return 'NO_CHANGE';
}

/**
 * Section 25.1: silence is not a quality label. Outcome and attribution
 * confidence are stored separately, and a non-response yields no outcome at
 * all rather than a negative one.
 */
export const OUTCOME_LABELS = [
  'POSITIVE',
  'NEGATIVE',
  'OBJECTION',
  'UNSUBSCRIBE',
  'MEETING',
  'NO_OUTCOME_OBSERVED',
] as const;
export type OutcomeLabel = (typeof OUTCOME_LABELS)[number];

export function labelOutcome(input: {
  readonly replied: boolean;
  readonly unsubscribed: boolean;
  readonly meetingBooked: boolean;
  readonly sentiment: 'POSITIVE' | 'NEGATIVE' | 'OBJECTION' | 'NEUTRAL' | null;
}): { readonly label: OutcomeLabel; readonly attributionConfidence: number } {
  if (input.unsubscribed) return { label: 'UNSUBSCRIBE', attributionConfidence: 0.9 };
  if (input.meetingBooked) {
    // A booked meeting does not prove every preceding tactic was good.
    return { label: 'MEETING', attributionConfidence: 0.4 };
  }
  if (!input.replied) return { label: 'NO_OUTCOME_OBSERVED', attributionConfidence: 0 };
  switch (input.sentiment) {
    case 'POSITIVE':
      return { label: 'POSITIVE', attributionConfidence: 0.5 };
    case 'NEGATIVE':
      return { label: 'NEGATIVE', attributionConfidence: 0.5 };
    case 'OBJECTION':
      return { label: 'OBJECTION', attributionConfidence: 0.6 };
    default:
      return { label: 'NO_OUTCOME_OBSERVED', attributionConfidence: 0 };
  }
}
