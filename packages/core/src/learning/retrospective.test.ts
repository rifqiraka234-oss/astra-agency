import { describe, expect, it } from 'vitest';
import { startRun } from '../run/envelope.js';
import {
  buildRetrospective,
  labelOutcome,
  recommendFromFindings,
  type RetroFinding,
  type RetrospectiveInput,
} from './retrospective.js';

const envelope = startRun({
  runId: 'run-1',
  correlationId: 'corr-1',
  engine: 'ENRICHMENT',
  trigger: 'SCHEDULE',
  environment: 'test',
  runtimeMode: 'TEST',
  versions: {
    policyVersion: '1.0.0',
    promptVersions: {},
    modelVersions: {},
    integrationVersions: {},
  },
  inputSnapshotHash: 'hash',
  startedAt: '2026-08-12T10:00:00.000Z',
});

const input = (overrides: Partial<RetrospectiveInput> = {}): RetrospectiveInput => ({
  envelope,
  attemptedInOrder: ['fetch', 'research', 'classify', 'draft', 'import'],
  completed: ['fetch', 'research', 'classify', 'draft', 'import'],
  externalWritesMade: [],
  operatorCorrections: [],
  systemIdentifiedImprovements: [],
  findings: [],
  wastedWork: { wastedInputTokens: 0, wastedOutputTokens: 0, wastedWallClockMs: 0, cause: null },
  unresolvedRisks: [],
  candidateRegressionTests: [],
  candidateLessonIds: [],
  generatedAt: '2026-08-12T11:00:00.000Z',
  ...overrides,
});

describe('retrospectives are derived, not narrated', () => {
  it('derives what did not complete by subtraction', () => {
    const retro = buildRetrospective(input({ completed: ['fetch', 'research'] }));

    expect(retro.notCompleted).toEqual(['classify', 'draft', 'import']);
  });

  it('cannot report a clean run by omitting the failed stage', () => {
    const retro = buildRetrospective(input({ completed: [] }));

    expect(retro.notCompleted).toHaveLength(5);
    expect(retro.recommendation).toBe('ESCALATE');
  });
});

describe('repeated signatures', () => {
  const repeated: RetroFinding = {
    signature: 'WEBFETCH_BLOCKED_BEFORE_FANOUT',
    description: 'Five workers each rediscovered a blocked fetch adapter.',
    rootCause: 'PROVIDER_CAPABILITY',
    priorOccurrences: 1,
    nearMiss: false,
  };

  it('recommends FIX when a signature has been seen before', () => {
    expect(recommendFromFindings([repeated], [], [])).toBe('FIX');
  });

  it('records the wasted-work cost of the second round', () => {
    const retro = buildRetrospective(
      input({
        findings: [repeated],
        wastedWork: {
          wastedInputTokens: 370_000,
          wastedOutputTokens: 10_000,
          wastedWallClockMs: 1_800_000,
          cause: 'Fan-out proceeded without a preflight against the exact adapter.',
        },
      }),
    );

    expect(retro.recommendation).toBe('FIX');
    expect(retro.wastedWork.wastedInputTokens).toBe(370_000);
    expect(retro.wastedWork.cause).not.toBeNull();
  });

  it('recommends no change on a genuinely clean run', () => {
    expect(buildRetrospective(input()).recommendation).toBe('NO_CHANGE');
  });

  it('escalates an unresolved risk over a first-seen finding', () => {
    expect(recommendFromFindings([], [], ['calendar credentials expire in two days'])).toBe(
      'ESCALATE',
    );
  });
});

describe('outcome labelling', () => {
  it('never infers a quality label from silence', () => {
    const outcome = labelOutcome({
      replied: false,
      unsubscribed: false,
      meetingBooked: false,
      sentiment: null,
    });

    expect(outcome.label).toBe('NO_OUTCOME_OBSERVED');
    expect(outcome.attributionConfidence).toBe(0);
  });

  it('does not treat a booked meeting as proof every preceding tactic was good', () => {
    const outcome = labelOutcome({
      replied: true,
      unsubscribed: false,
      meetingBooked: true,
      sentiment: 'POSITIVE',
    });

    expect(outcome.label).toBe('MEETING');
    expect(outcome.attributionConfidence).toBeLessThan(0.5);
  });

  it('records an unsubscribe with high attribution confidence', () => {
    const outcome = labelOutcome({
      replied: true,
      unsubscribed: true,
      meetingBooked: false,
      sentiment: 'NEGATIVE',
    });

    expect(outcome.label).toBe('UNSUBSCRIBE');
    expect(outcome.attributionConfidence).toBeGreaterThan(0.8);
  });
});
