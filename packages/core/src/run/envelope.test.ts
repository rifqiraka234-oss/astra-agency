import { describe, expect, it } from 'vitest';
import {
  addRunCost,
  canResumeRun,
  completeRun,
  isRunTerminal,
  recordRunError,
  startRun,
  type StartRunInput,
} from './envelope.js';

const input: StartRunInput = {
  runId: 'run-1',
  correlationId: 'corr-1',
  engine: 'ENRICHMENT',
  trigger: 'SCHEDULE',
  environment: 'test',
  runtimeMode: 'TEST',
  versions: {
    policyVersion: '1.0.0',
    promptVersions: { 'enrichment-message': '1.0.0' },
    modelVersions: { drafting: 'claude-opus-5' },
    integrationVersions: { lemlist: 'v1' },
  },
  inputSnapshotHash: 'snapshot-hash',
  startedAt: '2026-08-12T10:00:00.000Z',
};

describe('run envelope', () => {
  it('starts with every counter at zero and nothing written', () => {
    const run = startRun(input);

    expect(run.status).toBe('RUNNING');
    expect(run.externalWritesRequested).toBe(0);
    expect(run.externalWritesAllowed).toBe(0);
    expect(run.externalWritesCompleted).toBe(0);
    expect(run.completedAt).toBeNull();
  });

  it('accumulates cost across stages', () => {
    const run = addRunCost(addRunCost(startRun(input), { inputTokens: 100 }), {
      inputTokens: 50,
      wallClockMs: 900,
    });

    expect(run.cost.inputTokens).toBe(150);
    expect(run.cost.wallClockMs).toBe(900);
  });

  it('cannot report a clean completion when errors were recorded', () => {
    const run = recordRunError(startRun(input), {
      at: '2026-08-12T10:05:00.000Z',
      stage: 'research',
      reasonCode: 'CAPABILITY_NOT_REACHABLE',
      message: 'fetch adapter blocked',
      retryable: true,
    });

    expect(completeRun(run, '2026-08-12T10:10:00.000Z').status).toBe('COMPLETED_WITH_ERRORS');
  });

  it('cannot report a clean completion with an unreconciled write', () => {
    const run = { ...startRun(input), externalWritesAllowed: 2, externalWritesCompleted: 1 };

    expect(completeRun(run, '2026-08-12T10:10:00.000Z').status).toBe('COMPLETED_WITH_ERRORS');
  });

  it('reports a clean completion when nothing failed', () => {
    const run = { ...startRun(input), externalWritesAllowed: 2, externalWritesCompleted: 2 };

    expect(completeRun(run, '2026-08-12T10:10:00.000Z').status).toBe('COMPLETED');
  });

  it('records a run under a closed gate as clean, not as a failure', () => {
    // Requested three writes, the guard allowed none: that is a healthy run.
    const run = { ...startRun(input), externalWritesRequested: 3 };

    expect(completeRun(run, '2026-08-12T10:10:00.000Z').status).toBe('COMPLETED');
  });
});

describe('resumability', () => {
  it('allows resuming an interrupted run', () => {
    const run = { ...startRun(input), status: 'INTERRUPTED' as const };

    expect(canResumeRun(run)).toBe(true);
    expect(isRunTerminal(run)).toBe(false);
  });

  it('never resumes a run that already completed, so writes are not replayed', () => {
    const run = completeRun(startRun(input), '2026-08-12T10:10:00.000Z');

    expect(canResumeRun(run)).toBe(false);
    expect(isRunTerminal(run)).toBe(true);
  });

  it('never resumes an aborted run', () => {
    const run = completeRun(startRun(input), '2026-08-12T10:10:00.000Z', { aborted: true });

    expect(run.status).toBe('ABORTED');
    expect(canResumeRun(run)).toBe(false);
  });
});
