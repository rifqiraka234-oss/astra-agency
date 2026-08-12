import { describe, expect, it } from 'vitest';
import {
  IllegalLessonTransitionError,
  assertLessonTransition,
  describeLessonStatus,
  evaluatePromotion,
  lessonNextStates,
  resolveLessonConflict,
  type LessonCandidate,
  type PromotionRequest,
} from './lessons.js';

const lesson = (overrides: Partial<LessonCandidate> = {}): LessonCandidate => ({
  lessonId: 'l1',
  title: 'Prefer a plain observation opener',
  observation: 'Compound gerund openers were revised by the operator four times.',
  exactFailureOrSuccess: 'Four drafts revised, all with a participial opener.',
  rootCause: 'The prompt example set over-represented decorative openers.',
  evidenceRunIds: ['run-1', 'run-2'],
  beforeExample: 'Building X as a sibling duo around brand strategy, is a nice angle.',
  afterExampleOrProposedChange: 'Saw you are building X with your sibling.',
  reusableRule: 'Open with a plain observation.',
  scope: 'CAMPAIGN',
  scopeId: 'new-businesses',
  applicableConditions: ['first message', 'LinkedIn'],
  counterexamples: ['A reply where the prospect used the same register first.'],
  counterexampleSearchPerformed: true,
  knownNonApplicability: ['warm referrals'],
  confidence: 0.8,
  attributionConfidence: 0.6,
  authorityClass: 'C',
  riskClass: 'MEDIUM',
  expectedBenefit: 'Fewer operator revisions.',
  possibleHarm: 'Openers could become monotonous.',
  reversibility: 'TRIVIAL',
  requiredEvalCases: ['MESSAGE_NATURALNESS'],
  requiredApprover: 'operator',
  state: 'AWAITING_APPROVAL',
  supersedes: null,
  supersededBy: null,
  createdByModelVersion: 'claude-opus-5',
  createdAt: '2026-08-12T00:00:00.000Z',
  ...overrides,
});

const request = (overrides: Partial<PromotionRequest> = {}): PromotionRequest => ({
  lesson: lesson(),
  targetState: 'APPROVED_FOR_STAGING',
  decidedBy: 'operator',
  offlineEvalPassed: true,
  safetyHardGateRegressed: false,
  shadowComparisonComplete: true,
  ...overrides,
});

describe('lifecycle', () => {
  it('has no shortcut from PROPOSED to ACTIVE_PRODUCTION', () => {
    expect(lessonNextStates('PROPOSED')).not.toContain('ACTIVE_PRODUCTION');
    expect(() => {
      assertLessonTransition('PROPOSED', 'ACTIVE_PRODUCTION');
    }).toThrow(IllegalLessonTransitionError);
  });

  it('retains rejected candidates as a terminal state rather than deleting them', () => {
    expect(lessonNextStates('REJECTED')).toEqual([]);
  });

  it('allows a rolled-back lesson to gather more evidence', () => {
    expect(lessonNextStates('ROLLED_BACK')).toContain('NEEDS_MORE_EVIDENCE');
  });
});

describe('authority classes', () => {
  it('class D can never be model-promoted', () => {
    const verdict = evaluatePromotion(
      request({ lesson: lesson({ authorityClass: 'D' }) }),
    );

    expect(verdict.allowed).toBe(false);
    expect(verdict.reasonCodes).toContain('LESSON_CLASS_D_REQUIRES_CODE_REVIEW');
  });

  it('class B may reach shadow but never production', () => {
    const shadow = evaluatePromotion(
      request({
        lesson: lesson({ authorityClass: 'B', state: 'READY_FOR_EVAL' }),
        targetState: 'VALIDATING_OFFLINE',
        decidedBy: null,
      }),
    );
    expect(shadow.allowed).toBe(true);

    const production = evaluatePromotion(
      request({
        lesson: lesson({ authorityClass: 'B', state: 'APPROVED_FOR_PRODUCTION' }),
        targetState: 'ACTIVE_PRODUCTION',
      }),
    );
    expect(production.allowed).toBe(false);
    expect(production.reasonCodes).toContain('LESSON_CLASS_B_SHADOW_ONLY');
  });

  it('class C needs an authenticated human even for staging', () => {
    const verdict = evaluatePromotion(request({ decidedBy: null }));

    expect(verdict.allowed).toBe(false);
    expect(verdict.reasonCodes).toContain('LESSON_REQUIRES_HUMAN_APPROVAL');
  });

  it('class A knowledge maintenance promotes without a human', () => {
    const verdict = evaluatePromotion(
      request({
        lesson: lesson({ authorityClass: 'A', state: 'PROPOSED' }),
        targetState: 'READY_FOR_EVAL',
        decidedBy: null,
      }),
    );

    expect(verdict.allowed).toBe(true);
  });
});

describe('promotion prerequisites', () => {
  it('refuses a lesson with no evidence', () => {
    const verdict = evaluatePromotion(request({ lesson: lesson({ evidenceRunIds: [] }) }));

    expect(verdict.reasonCodes).toContain('LESSON_NO_EVIDENCE');
  });

  it('refuses a lesson where no counterexample search was performed', () => {
    const verdict = evaluatePromotion(
      request({ lesson: lesson({ counterexampleSearchPerformed: false }) }),
    );

    expect(verdict.reasonCodes).toContain('LESSON_NO_COUNTEREXAMPLE_SEARCH');
  });

  it('never trades a safety hard gate for a better number', () => {
    const verdict = evaluatePromotion(request({ safetyHardGateRegressed: true }));

    expect(verdict.allowed).toBe(false);
    expect(verdict.reasonCodes).toContain('LESSON_SAFETY_HARD_GATE_REGRESSED');
  });

  it('requires eval and shadow before production', () => {
    const verdict = evaluatePromotion(
      request({
        lesson: lesson({ state: 'APPROVED_FOR_PRODUCTION' }),
        targetState: 'ACTIVE_PRODUCTION',
        offlineEvalPassed: false,
        shadowComparisonComplete: false,
      }),
    );

    expect(verdict.reasonCodes).toContain('LESSON_OFFLINE_EVAL_NOT_PASSED');
    expect(verdict.reasonCodes).toContain('LESSON_SHADOW_NOT_COMPLETE');
  });
});

describe('scope precedence', () => {
  it('lets a contact-specific preference beat a global stylistic suggestion', () => {
    const conflict = resolveLessonConflict(
      lesson({ lessonId: 'narrow', scope: 'CONTACT' }),
      lesson({ lessonId: 'broad', scope: 'GLOBAL' }),
      { eitherIsSafetyRule: false },
    );

    expect(conflict.resolution).toBe('LEFT_WINS');
    expect(conflict.reasonCode).toBe('CONFLICT_RESOLVED_BY_NARROWER_SCOPE');
  });

  it('never resolves a conflict that touches a safety rule by precedence', () => {
    const conflict = resolveLessonConflict(
      lesson({ lessonId: 'narrow', scope: 'CONTACT' }),
      lesson({ lessonId: 'safety', scope: 'GLOBAL' }),
      { eitherIsSafetyRule: true },
    );

    expect(conflict.resolution).toBe('REQUIRES_HUMAN');
  });

  it('escalates a same-scope conflict to a human', () => {
    const conflict = resolveLessonConflict(
      lesson({ lessonId: 'a', scope: 'CATEGORY' }),
      lesson({ lessonId: 'b', scope: 'CATEGORY' }),
      { eitherIsSafetyRule: false },
    );

    expect(conflict.resolution).toBe('REQUIRES_HUMAN');
    expect(conflict.reasonCode).toBe('CONFLICT_SAME_SCOPE');
  });
});

describe('improvement centre language', () => {
  it('calls an unpromoted candidate a candidate', () => {
    expect(describeLessonStatus(lesson({ state: 'PROPOSED' }))).toBe('candidate lesson');
    expect(describeLessonStatus(lesson({ state: 'AWAITING_APPROVAL' }))).toBe('candidate lesson');
  });

  it('only calls a production lesson learned behavior', () => {
    expect(describeLessonStatus(lesson({ state: 'ACTIVE_PRODUCTION' }))).toBe(
      'active learned behavior',
    );
  });
});
