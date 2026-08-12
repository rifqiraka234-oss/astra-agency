import { describe, expect, it } from 'vitest';
import { MIN_SLICE_SAMPLE_SIZE, compareCandidate, type EvalCase, type EvalResult } from './evals.js';

const makeCase = (id: string, slices: readonly string[]): EvalCase => ({
  caseId: id,
  suite: 'MESSAGE_NATURALNESS',
  setKind: 'FROZEN_GOLDEN',
  slices,
  inputSnapshotHash: `hash-${id}`,
  expectedFacts: [],
  unacceptableOutputs: [],
  hardGates: ['no_dash', 'word_limit'],
  rubric: null,
  reviewerProvenance: 'operator review 2026-08-12',
  redacted: true,
});

const result = (id: string, passed: boolean, hardGateFailures: readonly string[] = []): EvalResult => ({
  caseId: id,
  passed,
  hardGateFailures,
  score: passed ? 1 : 0,
  latencyMs: 100,
  costMilliCredits: 10,
});

describe('hard gates outrank aggregate gains', () => {
  it('fails a candidate that improves overall but breaks a safety gate', () => {
    const cases = Array.from({ length: 30 }, (_, i) => makeCase(`c${String(i)}`, ['general']));
    const baseline = cases.map((c, i) => result(c.caseId, i > 5));
    const candidate = cases.map((c, i) =>
      // Everything passes except one new hard gate failure.
      c.caseId === 'c0' ? result(c.caseId, false, ['no_dash']) : result(c.caseId, i >= 0),
    );

    const comparison = compareCandidate({ cases, baseline, candidate });

    expect(comparison.aggregateCandidatePassRate).toBeGreaterThan(
      comparison.aggregateBaselinePassRate,
    );
    expect(comparison.verdict).toBe('FAIL');
    expect(comparison.hardGateRegressions).toContain('c0:no_dash');
  });
});

describe('subgroup regressions are not hidden by aggregates', () => {
  it('fails when one adequately sized slice gets materially worse', () => {
    const bigSlice = Array.from({ length: MIN_SLICE_SAMPLE_SIZE * 2 }, (_, i) =>
      makeCase(`big${String(i)}`, ['industry:general']),
    );
    const smallIndustry = Array.from({ length: MIN_SLICE_SAMPLE_SIZE }, (_, i) =>
      makeCase(`anim${String(i)}`, ['industry:animation']),
    );
    const cases = [...bigSlice, ...smallIndustry];

    const baseline = cases.map((c) => result(c.caseId, true));
    const candidate = cases.map((c) =>
      // The animation slice loses a quarter of its cases; the rest all pass.
      c.slices.includes('industry:animation') && Number(c.caseId.replace('anim', '')) < 5
        ? result(c.caseId, false)
        : result(c.caseId, true),
    );

    const comparison = compareCandidate({ cases, baseline, candidate });
    const animation = comparison.slices.find((s) => s.slice === 'industry:animation');

    expect(animation?.delta).toBeLessThan(0);
    expect(comparison.verdict).toBe('FAIL');
    expect(comparison.reasonCodes).toContain('EVAL_SLICE_REGRESSION');
  });

  it('warns rather than concluding when a slice is too small to judge', () => {
    const cases = [makeCase('a', ['industry:animation']), makeCase('b', ['industry:animation'])];
    const baseline = cases.map((c) => result(c.caseId, true));
    const candidate = cases.map((c) => result(c.caseId, true));

    const comparison = compareCandidate({ cases, baseline, candidate });

    expect(comparison.sampleSizeWarnings).toHaveLength(1);
    expect(comparison.verdict).toBe('INCONCLUSIVE');
  });
});

describe('candidate comparison bookkeeping', () => {
  it('separates improved, worsened and unchanged cases', () => {
    const cases = Array.from({ length: MIN_SLICE_SAMPLE_SIZE }, (_, i) =>
      makeCase(`c${String(i)}`, ['general']),
    );
    const baseline = cases.map((c, i) => result(c.caseId, i % 2 === 0));
    const candidate = cases.map((c) => result(c.caseId, true));

    const comparison = compareCandidate({ cases, baseline, candidate });

    expect(comparison.casesImproved).toHaveLength(MIN_SLICE_SAMPLE_SIZE / 2);
    expect(comparison.casesUnchanged).toHaveLength(MIN_SLICE_SAMPLE_SIZE / 2);
    expect(comparison.casesWorsened).toEqual([]);
    expect(comparison.verdict).toBe('PASS');
  });

  it('flags a case the candidate never ran', () => {
    const cases = Array.from({ length: MIN_SLICE_SAMPLE_SIZE }, (_, i) =>
      makeCase(`c${String(i)}`, ['general']),
    );
    const baseline = cases.map((c) => result(c.caseId, true));
    const candidate = baseline.slice(1);

    const comparison = compareCandidate({ cases, baseline, candidate });

    expect(comparison.reasonCodes).toContain('EVAL_CASE_NOT_RUN');
  });
});
