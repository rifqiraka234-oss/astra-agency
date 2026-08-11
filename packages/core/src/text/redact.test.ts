import { afterEach, describe, expect, it } from 'vitest';
import {
  clearRegisteredSecretsForTests,
  redact,
  redactString,
  registerSecret,
  summarizeHtmlForLog,
} from './redact.js';
import { parseClaudeDecision } from '../schemas/decision.js';
import { testDecision } from '../testing/factories.js';
import { secureCompare } from './hash.js';

afterEach(() => {
  clearRegisteredSecretsForTests();
});

describe('log redaction', () => {
  it('redacts a registered literal secret wherever it appears', () => {
    registerSecret('super-secret-webhook-value');
    const output = redactString('body contained super-secret-webhook-value in an odd field');
    expect(output).not.toContain('super-secret-webhook-value');
    expect(output).toContain('[REDACTED]');
  });

  it('ignores secrets too short to redact safely', () => {
    registerSecret('abc');
    expect(redactString('abc appears in ordinary prose')).toContain('abc');
  });

  it('redacts values under sensitive keys regardless of their shape', () => {
    const output = redact({
      apiKey: 'plain-looking-value',
      authorization: 'Bearer abcdefghijklmnop',
      nested: { webhookSecret: 'another', harmless: 'keep me' },
    }) as Record<string, unknown>;
    expect(output['apiKey']).toBe('[REDACTED]');
    expect(output['authorization']).toBe('[REDACTED]');
    expect((output['nested'] as Record<string, unknown>)['webhookSecret']).toBe('[REDACTED]');
    expect((output['nested'] as Record<string, unknown>)['harmless']).toBe('keep me');
  });

  it('redacts known token shapes found in free text', () => {
    const output = redactString(
      'failed with sk-ant-api03-abcdefghijklmnop and re_abcdefghijklmnopqrst',
    );
    expect(output).not.toContain('sk-ant-api03');
    expect(output).not.toContain('re_abcdefghijklmnopqrst');
  });

  it('redacts a bearer header inside a stringified request dump', () => {
    expect(redactString('Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.payloadpart.signature')).not.toContain(
      'payloadpart',
    );
  });

  it('survives circular structures', () => {
    const circular: Record<string, unknown> = { name: 'x' };
    circular['self'] = circular;
    expect(() => redact(circular)).not.toThrow();
  });

  it('summarizes raw email HTML instead of logging it', () => {
    const summary = summarizeHtmlForLog('<p>personal details here</p>');
    expect(summary).not.toContain('personal details');
    expect(summary).toMatch(/^\[html \d+ bytes/);
  });

  it('redacts error messages without losing the error shape', () => {
    registerSecret('leaked-secret-value');
    const output = redact(new Error('request failed using leaked-secret-value')) as Record<string, unknown>;
    expect(output['name']).toBe('Error');
    expect(String(output['message'])).not.toContain('leaked-secret-value');
  });
});

describe('constant-time comparison', () => {
  it('matches identical secrets', () => {
    expect(secureCompare('abc123', 'abc123')).toBe(true);
  });

  it('rejects different secrets, including different lengths', () => {
    expect(secureCompare('abc123', 'abc124')).toBe(false);
    expect(secureCompare('abc123', 'abc1234567')).toBe(false);
    expect(secureCompare('', 'abc')).toBe(false);
  });
});

describe('model output schema', () => {
  it('accepts a well-formed decision', () => {
    expect(parseClaudeDecision(testDecision()).ok).toBe(true);
  });

  it('rejects an unknown extra property', () => {
    const raw = { ...testDecision(), unexpected: true };
    expect(parseClaudeDecision(raw).ok).toBe(false);
  });

  it('rejects an intent outside the enum', () => {
    const raw = testDecision();
    const mutated = { ...raw, classification: { ...raw.classification, intent: 'MADE_UP' } };
    expect(parseClaudeDecision(mutated).ok).toBe(false);
  });

  it('rejects a confidence above 1', () => {
    const raw = testDecision();
    const mutated = { ...raw, classification: { ...raw.classification, confidence: 1.4 } };
    expect(parseClaudeDecision(mutated).ok).toBe(false);
  });

  it('rejects an auto-send recommendation with no reply text', () => {
    const raw = testDecision();
    const mutated = { ...raw, recommendation: { ...raw.recommendation, reply_text: null } };
    expect(parseClaudeDecision(mutated).ok).toBe(false);
  });

  it('rejects an auto-send recommendation that contradicts its own safety flags', () => {
    const raw = testDecision();
    const mutated = { ...raw, safety: { ...raw.safety, contains_new_promise: true } };
    const result = parseClaudeDecision(mutated);
    expect(result.ok).toBe(false);
    expect(result.ok === false && result.errors.join(' ')).toMatch(/contradicts safety flags/);
  });

  it('requires a handoff reason when the model asks for a handoff', () => {
    const raw = testDecision();
    const mutated = {
      ...raw,
      recommendation: {
        ...raw.recommendation,
        action: 'HANDOFF',
        reply_text: null,
        human_handoff_reason: null,
      },
    };
    expect(parseClaudeDecision(mutated).ok).toBe(false);
  });

  it('rejects prose instead of an object', () => {
    expect(parseClaudeDecision('I think we should reply warmly.').ok).toBe(false);
  });

  it('reports the failing path so the failure is auditable', () => {
    const raw = testDecision();
    const mutated = { ...raw, classification: { ...raw.classification, risk: 'EXTREME' } };
    const result = parseClaudeDecision(mutated);
    expect(result.ok === false && result.errors[0]).toMatch(/classification\.risk/);
  });
});
