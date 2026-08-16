import { describe, expect, it } from 'vitest';
import { execFileSync } from 'node:child_process';
import { join } from 'node:path';

/**
 * Exercises the actual CLI a scheduled reply-agent session runs, not the
 * library function directly, because the CLI's JSON parsing and exit code are
 * the contract the session actually depends on.
 */

const scriptPath = join(import.meta.dirname, 'check-message.mjs');

function run(input: unknown): { code: number; body: { ok: boolean; violations: unknown[] } } {
  try {
    const stdout = execFileSync('npx', ['tsx', scriptPath], {
      input: JSON.stringify(input),
      encoding: 'utf8',
    });
    return { code: 0, body: JSON.parse(stdout) };
  } catch (error) {
    const e = error as { status: number; stdout: string };
    return { code: e.status, body: JSON.parse(e.stdout) };
  }
}

describe('check-message CLI', () => {
  it('passes a clean message with exit 0', () => {
    const result = run({
      text: 'Saw you launched Studio Piero recently. Want us to sketch what a simple site could look like?',
      maxWords: 65,
    });

    expect(result.code).toBe(0);
    expect(result.body.ok).toBe(true);
  });

  it('rejects an em dash with exit 1', () => {
    const result = run({ text: 'Your unique vision is compelling — want a sketch?', maxWords: 65 });

    expect(result.code).toBe(1);
    expect(result.body.ok).toBe(false);
  });

  it('rejects an empty message', () => {
    const result = run({ text: '   ', maxWords: 65 });

    expect(result.code).toBe(1);
    expect(result.body.ok).toBe(false);
  });

  it('rejects malformed JSON input rather than crashing uncaught', () => {
    const outcome = (() => {
      try {
        execFileSync('npx', ['tsx', scriptPath], { input: 'not json', encoding: 'utf8' });
        return { code: 0 };
      } catch (error) {
        return { code: (error as { status: number }).status };
      }
    })();

    expect(outcome.code).toBe(1);
  });

  it('enforces the word cap the caller passes in', () => {
    const longText = 'word '.repeat(70).trim() + '?';

    expect(run({ text: longText, maxWords: 65 }).code).toBe(1);
    expect(run({ text: longText, maxWords: 200 }).code).toBe(0);
  });
});
