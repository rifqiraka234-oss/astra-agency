/**
 * Bounded learning: lesson schema, scopes and authority classes
 * (specification sections 25.3, 25.4, 25.6).
 *
 * The point of this module is that "the system learned something" is never a
 * single boolean. A lesson has a scope, and the narrowest valid scope wins: one
 * photography prototype must not teach every future site to go monochrome, and
 * one prospect disliking a call must not delete meeting CTAs globally. A lesson
 * also has an authority class, which decides who — if anyone — is allowed to
 * activate it. Class D can never be model-promoted at all; it is a Git change
 * reviewed by a human, full stop.
 */

export const LESSON_SCOPES = [
  'CONTACT',
  'COMPANY',
  'CAMPAIGN',
  'CATEGORY',
  'INTEGRATION',
  'GLOBAL',
] as const;
export type LessonScope = (typeof LESSON_SCOPES)[number];

/** Narrowest first. Index doubles as precedence: lower wins on conflict. */
export const LESSON_SCOPE_PRECEDENCE: Readonly<Record<LessonScope, number>> = {
  CONTACT: 0,
  COMPANY: 1,
  CAMPAIGN: 2,
  CATEGORY: 3,
  INTEGRATION: 4,
  GLOBAL: 5,
};

export const AUTHORITY_CLASSES = ['A', 'B', 'C', 'D'] as const;
export type AuthorityClass = (typeof AUTHORITY_CLASSES)[number];

export const LESSON_STATES = [
  'OBSERVED',
  'PROPOSED',
  'NEEDS_MORE_EVIDENCE',
  'READY_FOR_EVAL',
  'VALIDATING_OFFLINE',
  'VALIDATING_SHADOW',
  'AWAITING_APPROVAL',
  'APPROVED_FOR_STAGING',
  'ACTIVE_STAGING',
  'APPROVED_FOR_PRODUCTION',
  'ACTIVE_PRODUCTION',
  'REJECTED',
  'SUPERSEDED',
  'ROLLED_BACK',
] as const;
export type LessonState = (typeof LESSON_STATES)[number];

/**
 * There is deliberately no edge from `PROPOSED` to `ACTIVE_PRODUCTION`. Every
 * path to production passes through evaluation, shadow comparison, an explicit
 * approval and staging.
 */
const LESSON_TRANSITIONS: Readonly<Record<LessonState, readonly LessonState[]>> = {
  OBSERVED: ['PROPOSED', 'REJECTED'],
  PROPOSED: ['NEEDS_MORE_EVIDENCE', 'READY_FOR_EVAL', 'REJECTED'],
  NEEDS_MORE_EVIDENCE: ['PROPOSED', 'REJECTED'],
  READY_FOR_EVAL: ['VALIDATING_OFFLINE', 'REJECTED'],
  VALIDATING_OFFLINE: ['VALIDATING_SHADOW', 'NEEDS_MORE_EVIDENCE', 'REJECTED'],
  VALIDATING_SHADOW: ['AWAITING_APPROVAL', 'NEEDS_MORE_EVIDENCE', 'REJECTED'],
  AWAITING_APPROVAL: ['APPROVED_FOR_STAGING', 'NEEDS_MORE_EVIDENCE', 'REJECTED'],
  APPROVED_FOR_STAGING: ['ACTIVE_STAGING', 'REJECTED'],
  ACTIVE_STAGING: ['APPROVED_FOR_PRODUCTION', 'ROLLED_BACK', 'REJECTED'],
  APPROVED_FOR_PRODUCTION: ['ACTIVE_PRODUCTION', 'ROLLED_BACK'],
  ACTIVE_PRODUCTION: ['SUPERSEDED', 'ROLLED_BACK'],
  // Rejected candidates are retained, not deleted, so the same idea is not
  // rediscovered and re-proposed every week.
  REJECTED: [],
  SUPERSEDED: [],
  ROLLED_BACK: ['NEEDS_MORE_EVIDENCE', 'REJECTED'],
};

export class IllegalLessonTransitionError extends Error {
  constructor(
    readonly from: LessonState,
    readonly to: LessonState,
  ) {
    super(`Illegal lesson transition ${from} -> ${to}`);
    this.name = 'IllegalLessonTransitionError';
  }
}

export function assertLessonTransition(from: LessonState, to: LessonState): void {
  if (!LESSON_TRANSITIONS[from].includes(to)) {
    throw new IllegalLessonTransitionError(from, to);
  }
}

export function lessonNextStates(from: LessonState): readonly LessonState[] {
  return LESSON_TRANSITIONS[from];
}

export interface LessonCandidate {
  readonly lessonId: string;
  readonly title: string;
  readonly observation: string;
  readonly exactFailureOrSuccess: string;
  readonly rootCause: string;
  readonly evidenceRunIds: readonly string[];
  readonly beforeExample: string | null;
  readonly afterExampleOrProposedChange: string;
  readonly reusableRule: string;
  readonly scope: LessonScope;
  readonly scopeId: string | null;
  readonly applicableConditions: readonly string[];
  /** Cases where the rule would have been wrong. Searching for these is required. */
  readonly counterexamples: readonly string[];
  readonly counterexampleSearchPerformed: boolean;
  readonly knownNonApplicability: readonly string[];
  readonly confidence: number;
  /** Separate from confidence: how sure we are the cause is the cause. */
  readonly attributionConfidence: number;
  readonly authorityClass: AuthorityClass;
  readonly riskClass: 'LOW' | 'MEDIUM' | 'HIGH';
  readonly expectedBenefit: string;
  readonly possibleHarm: string;
  readonly reversibility: 'TRIVIAL' | 'BOUNDED' | 'HARD';
  readonly requiredEvalCases: readonly string[];
  readonly requiredApprover: string | null;
  readonly state: LessonState;
  readonly supersedes: string | null;
  readonly supersededBy: string | null;
  readonly createdByModelVersion: string;
  readonly createdAt: string;
}

export interface PromotionRequest {
  readonly lesson: LessonCandidate;
  readonly targetState: LessonState;
  /** Authenticated operator id, or null when the system is acting alone. */
  readonly decidedBy: string | null;
  /** Did the offline eval suite run and pass its hard gates? */
  readonly offlineEvalPassed: boolean;
  /** Did any safety hard gate regress against the frozen set? */
  readonly safetyHardGateRegressed: boolean;
  /** Did a shadow comparison run on live reads? */
  readonly shadowComparisonComplete: boolean;
}

export interface PromotionVerdict {
  readonly allowed: boolean;
  readonly reasonCodes: readonly string[];
}

const PRODUCTION_STATES: readonly LessonState[] = [
  'APPROVED_FOR_PRODUCTION',
  'ACTIVE_PRODUCTION',
];

/**
 * The promotion guard. Deny by default: every reason to refuse is collected,
 * and an empty reason list is the only thing that permits a promotion.
 */
export function evaluatePromotion(request: PromotionRequest): PromotionVerdict {
  const { lesson, targetState } = request;
  const reasonCodes: string[] = [];

  if (!LESSON_TRANSITIONS[lesson.state].includes(targetState)) {
    reasonCodes.push('LESSON_ILLEGAL_TRANSITION');
  }

  // Section 25.3: a lesson without scope, evidence and a counterexample search
  // cannot be promoted at all, regardless of how good it looks.
  if (lesson.evidenceRunIds.length === 0) reasonCodes.push('LESSON_NO_EVIDENCE');
  if (!lesson.counterexampleSearchPerformed) {
    reasonCodes.push('LESSON_NO_COUNTEREXAMPLE_SEARCH');
  }

  // Class D is engineering. No model-driven promotion path exists for it.
  if (lesson.authorityClass === 'D') {
    reasonCodes.push('LESSON_CLASS_D_REQUIRES_CODE_REVIEW');
  }

  // Class B may be generated and tested but never activated in production.
  if (lesson.authorityClass === 'B' && PRODUCTION_STATES.includes(targetState)) {
    reasonCodes.push('LESSON_CLASS_B_SHADOW_ONLY');
  }

  if (PRODUCTION_STATES.includes(targetState)) {
    if (request.decidedBy === null) reasonCodes.push('LESSON_REQUIRES_HUMAN_APPROVAL');
    if (!request.offlineEvalPassed) reasonCodes.push('LESSON_OFFLINE_EVAL_NOT_PASSED');
    if (!request.shadowComparisonComplete) reasonCodes.push('LESSON_SHADOW_NOT_COMPLETE');
  }

  // Class C needs an authenticated human even to enter staging.
  if (
    lesson.authorityClass === 'C' &&
    (targetState === 'APPROVED_FOR_STAGING' || PRODUCTION_STATES.includes(targetState)) &&
    request.decidedBy === null
  ) {
    reasonCodes.push('LESSON_REQUIRES_HUMAN_APPROVAL');
  }

  // No candidate ever trades a safety hard gate for a better headline number.
  if (request.safetyHardGateRegressed) {
    reasonCodes.push('LESSON_SAFETY_HARD_GATE_REGRESSED');
  }

  return { allowed: reasonCodes.length === 0, reasonCodes };
}

/**
 * Two active lessons conflict when they target the same subject with different
 * rules. The narrower scope wins, except that nothing ever overrides safety —
 * so a conflict where either side is a safety rule is returned unresolved for a
 * human rather than silently decided by precedence.
 */
export interface LessonConflict {
  readonly leftId: string;
  readonly rightId: string;
  readonly resolution: 'LEFT_WINS' | 'RIGHT_WINS' | 'REQUIRES_HUMAN';
  readonly reasonCode: string;
}

export function resolveLessonConflict(
  left: LessonCandidate,
  right: LessonCandidate,
  options: { readonly eitherIsSafetyRule: boolean },
): LessonConflict {
  if (options.eitherIsSafetyRule) {
    return {
      leftId: left.lessonId,
      rightId: right.lessonId,
      resolution: 'REQUIRES_HUMAN',
      reasonCode: 'CONFLICT_INVOLVES_SAFETY_RULE',
    };
  }
  const leftRank = LESSON_SCOPE_PRECEDENCE[left.scope];
  const rightRank = LESSON_SCOPE_PRECEDENCE[right.scope];
  if (leftRank === rightRank) {
    return {
      leftId: left.lessonId,
      rightId: right.lessonId,
      resolution: 'REQUIRES_HUMAN',
      reasonCode: 'CONFLICT_SAME_SCOPE',
    };
  }
  return {
    leftId: left.lessonId,
    rightId: right.lessonId,
    resolution: leftRank < rightRank ? 'LEFT_WINS' : 'RIGHT_WINS',
    reasonCode: 'CONFLICT_RESOLVED_BY_NARROWER_SCOPE',
  };
}

/**
 * Language guard for the Improvement Center (section 25.9). An unevaluated
 * candidate is never described as something the system "learned".
 */
export function describeLessonStatus(lesson: LessonCandidate): string {
  return lesson.state === 'ACTIVE_PRODUCTION'
    ? 'active learned behavior'
    : lesson.state === 'ACTIVE_STAGING'
      ? 'candidate lesson active in staging'
      : 'candidate lesson';
}
