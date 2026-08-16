import { describe, expect, it } from 'vitest';
import { execFileSync } from 'node:child_process';
import { join } from 'node:path';
import { LOW_RISK_CASES } from '@astra/core';

const scriptPath = join(import.meta.dirname, 'classify-low-risk.mjs');

function run(intent: string): { isLowRisk: boolean; case: string | null; maxWords?: number } {
  const stdout = execFileSync('npx', ['tsx', scriptPath], {
    input: JSON.stringify({ intent }),
    encoding: 'utf8',
  });
  return JSON.parse(stdout);
}

describe('classify-low-risk CLI', () => {
  it('accepts every one of the seven allowlisted intents', () => {
    for (const intent of [
      'CONNECTION_ACCEPTED',
      'SIMPLE_ACKNOWLEDGEMENT',
      'CLARIFICATION_NEEDED',
      'GENERAL_QUESTION',
      'MEETING_INTEREST',
      'SLOT_SELECTED',
      'NOT_NOW',
    ]) {
      const result = run(intent);
      expect(result.isLowRisk, `${intent} should be low risk`).toBe(true);
      expect(LOW_RISK_CASES).toContain(result.case);
    }
  });

  it('rejects a pricing question, which was never on the allowlist', () => {
    expect(run('PRICING_QUESTION')).toMatchObject({ isLowRisk: false, case: null });
  });

  it('rejects an unrecognized intent rather than guessing', () => {
    expect(run('SOMETHING_NEW_AND_UNMAPPED')).toMatchObject({ isLowRisk: false, case: null });
  });

  it('returns the word cap that applies to the matched case', () => {
    expect(run('SIMPLE_ACKNOWLEDGEMENT').maxWords).toBe(35);
    expect(run('MEETING_INTEREST').maxWords).toBe(120);
  });
});
