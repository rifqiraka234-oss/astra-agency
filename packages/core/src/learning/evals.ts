/**
 * Evaluation registry and candidate comparison (specification section 25.7).
 *
 * Two rules shape everything here. First, a hard gate is not a score: a
 * candidate that regresses a safety hard gate is rejected no matter how much
 * the aggregate improved. Second, aggregates hide subgroup damage, so
 * comparison reports per-slice results and refuses to call a small aggregate
 * gain a win when a slice got materially worse.
 */

export const EVAL_SUITE_KINDS = [
  'LEAD_QUALIFICATION',
  'WEBSITE_CLASSIFICATION',
  'IDENTITY_RESOLUTION',
  'MESSAGE_NATURALNESS',
  'EVIDENCE_FIDELITY',
  'CONVERSATION_INTENT',
  'OWNERSHIP',
  'LOW_RISK_PERMISSION',
  'OBJECTION_HANDOFF',
  'CALENDAR_INTERPRETATION',
  'PROTOTYPE_RESEARCH',
  'DESIGN_SPECIFICITY',
  'WORKFLOW_COMPLETENESS',
  'ASSET_PROVENANCE',
  'DEPLOYMENT_VERIFICATION',
  'PROMPT_INJECTION',
  'COST_AND_LATENCY',
] as const;
export type EvalSuiteKind = (typeof EVAL_SUITE_KINDS)[number];

export const EVAL_SET_KINDS = [
  'FROZEN_GOLDEN',
  'RECENT_DRIFT',
  'ADVERSARIAL',
  'PROVIDER_CONTRACT',
  'VISUAL_BASELINE',
  'NEVER_SEEN_HOLDOUT',
] as const;
export type EvalSetKind = (typeof EVAL_SET_KINDS)[number];

export interface EvalCase {
  readonly caseId: string;
  readonly suite: EvalSuiteKind;
  readonly setKind: EvalSetKind;
  /** Slice labels, e.g. `industry:animation`, so subgroup damage is visible. */
  readonly slices: readonly string[];
  readonly inputSnapshotHash: string;
  readonly expectedFacts: readonly string[];
  readonly unacceptableOutputs: readonly string[];
  readonly hardGates: readonly string[];
  readonly rubric: string | null;
  readonly reviewerProvenance: string;
  /** True when the case came from a real run and has been redacted. */
  readonly redacted: boolean;
}

export interface EvalResult {
  readonly caseId: string;
  readonly passed: boolean;
  readonly hardGateFailures: readonly string[];
  readonly score: number | null;
  readonly latencyMs: number;
  readonly costMilliCredits: number;
}

export interface SliceComparison {
  readonly slice: string;
  readonly baselinePassRate: number;
  readonly candidatePassRate: number;
  readonly delta: number;
  readonly sampleSize: number;
}

export interface CandidateComparison {
  readonly hardGateRegressions: readonly string[];
  readonly slices: readonly SliceComparison[];
  readonly casesImproved: readonly string[];
  readonly casesWorsened: readonly string[];
  readonly casesUnchanged: readonly string[];
  readonly aggregateBaselinePassRate: number;
  readonly aggregateCandidatePassRate: number;
  readonly latencyDeltaMs: number;
  readonly costDeltaMilliCredits: number;
  /** Set when any slice is too small to draw a conclusion from. */
  readonly sampleSizeWarnings: readonly string[];
  readonly verdict: 'PASS' | 'FAIL' | 'INCONCLUSIVE';
  readonly reasonCodes: readonly string[];
}

/** Below this, a slice delta is noise and we say so rather than claiming a win. */
export const MIN_SLICE_SAMPLE_SIZE = 20;
/** A slice losing more than this is a serious regression regardless of aggregate. */
export const MAX_TOLERATED_SLICE_REGRESSION = 0.05;

function passRate(results: readonly EvalResult[]): number {
  if (results.length === 0) return 0;
  return results.filter((r) => r.passed).length / results.length;
}

export function compareCandidate(input: {
  readonly cases: readonly EvalCase[];
  readonly baseline: readonly EvalResult[];
  readonly candidate: readonly EvalResult[];
}): CandidateComparison {
  const caseById = new Map(input.cases.map((c) => [c.caseId, c]));
  const baselineById = new Map(input.baseline.map((r) => [r.caseId, r]));
  const candidateById = new Map(input.candidate.map((r) => [r.caseId, r]));

  const improved: string[] = [];
  const worsened: string[] = [];
  const unchanged: string[] = [];
  const hardGateRegressions: string[] = [];

  for (const evalCase of input.cases) {
    const before = baselineById.get(evalCase.caseId);
    const after = candidateById.get(evalCase.caseId);
    if (before === undefined || after === undefined) continue;

    const newHardGateFailures = after.hardGateFailures.filter(
      (gate) => !before.hardGateFailures.includes(gate),
    );
    for (const gate of newHardGateFailures) {
      hardGateRegressions.push(`${evalCase.caseId}:${gate}`);
    }

    if (before.passed === after.passed) unchanged.push(evalCase.caseId);
    else if (after.passed) improved.push(evalCase.caseId);
    else worsened.push(evalCase.caseId);
  }

  const sliceNames = new Set<string>();
  for (const c of input.cases) for (const s of c.slices) sliceNames.add(s);

  const slices: SliceComparison[] = [];
  const sampleSizeWarnings: string[] = [];
  for (const slice of [...sliceNames].sort()) {
    const sliceCaseIds = input.cases.filter((c) => c.slices.includes(slice)).map((c) => c.caseId);
    const before = sliceCaseIds
      .map((id) => baselineById.get(id))
      .filter((r): r is EvalResult => r !== undefined);
    const after = sliceCaseIds
      .map((id) => candidateById.get(id))
      .filter((r): r is EvalResult => r !== undefined);
    const baselineRate = passRate(before);
    const candidateRate = passRate(after);
    slices.push({
      slice,
      baselinePassRate: baselineRate,
      candidatePassRate: candidateRate,
      delta: candidateRate - baselineRate,
      sampleSize: sliceCaseIds.length,
    });
    if (sliceCaseIds.length < MIN_SLICE_SAMPLE_SIZE) {
      sampleSizeWarnings.push(
        `slice ${slice} has ${String(sliceCaseIds.length)} cases, below the ${String(MIN_SLICE_SAMPLE_SIZE)} needed to draw a conclusion`,
      );
    }
  }

  const reasonCodes: string[] = [];
  if (hardGateRegressions.length > 0) reasonCodes.push('EVAL_HARD_GATE_REGRESSION');

  const seriousSliceRegressions = slices.filter(
    (s) => s.sampleSize >= MIN_SLICE_SAMPLE_SIZE && s.delta < -MAX_TOLERATED_SLICE_REGRESSION,
  );
  if (seriousSliceRegressions.length > 0) reasonCodes.push('EVAL_SLICE_REGRESSION');

  const aggregateBaseline = passRate(input.baseline);
  const aggregateCandidate = passRate(input.candidate);

  const latencyDelta =
    average(input.candidate.map((r) => r.latencyMs)) -
    average(input.baseline.map((r) => r.latencyMs));
  const costDelta =
    average(input.candidate.map((r) => r.costMilliCredits)) -
    average(input.baseline.map((r) => r.costMilliCredits));

  const verdict: CandidateComparison['verdict'] =
    reasonCodes.length > 0
      ? 'FAIL'
      : aggregateCandidate < aggregateBaseline
        ? 'FAIL'
        : sampleSizeWarnings.length > 0 && aggregateCandidate === aggregateBaseline
          ? 'INCONCLUSIVE'
          : 'PASS';

  if (verdict === 'INCONCLUSIVE') reasonCodes.push('EVAL_SAMPLE_TOO_SMALL');

  for (const c of caseById.values()) {
    if (!candidateById.has(c.caseId)) {
      reasonCodes.push('EVAL_CASE_NOT_RUN');
      break;
    }
  }

  return {
    hardGateRegressions,
    slices,
    casesImproved: improved,
    casesWorsened: worsened,
    casesUnchanged: unchanged,
    aggregateBaselinePassRate: aggregateBaseline,
    aggregateCandidatePassRate: aggregateCandidate,
    latencyDeltaMs: latencyDelta,
    costDeltaMilliCredits: costDelta,
    sampleSizeWarnings,
    verdict,
    reasonCodes,
  };
}

function average(values: readonly number[]): number {
  if (values.length === 0) return 0;
  return values.reduce((sum, v) => sum + v, 0) / values.length;
}
