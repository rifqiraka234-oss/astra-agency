import { describe, expect, it } from 'vitest';
import {
  sanitizeWebhookPayload,
  verifyWebhook,
  webhookIdempotencyKey,
  type LemlistWebhookPayload,
} from './webhook.js';

const SECRET = 'a-long-enough-shared-secret';
const TEAM = 'tea_expected';

const options = { expectedSecret: SECRET, expectedTeamId: TEAM, maxBodyBytes: 1_048_576 };

const body = (overrides: Record<string, unknown> = {}) =>
  JSON.stringify({
    _id: 'act_123',
    type: 'linkedinReplied',
    secret: SECRET,
    teamId: TEAM,
    campaignId: 'cam_1',
    leadId: 'lea_1',
    contactId: 'ctc_1',
    text: 'Sounds good, send it over.',
    createdAt: '2026-08-11T10:00:00Z',
    ...overrides,
  });

describe('webhook verification', () => {
  it('accepts a well-formed payload with the right secret and team', () => {
    const result = verifyWebhook(body(), options);
    expect(result.ok).toBe(true);
    expect(result.ok && result.idempotencyKey).toBe('act_123');
    expect(result.ok && result.handled).toBe(true);
  });

  it('rejects a missing secret', () => {
    const result = verifyWebhook(body({ secret: undefined }), options);
    expect(result.ok).toBe(false);
    expect(result.ok === false && result.reason).toBe('SECRET_MISSING');
  });

  it('rejects a wrong secret', () => {
    const result = verifyWebhook(body({ secret: 'wrong-secret-value' }), options);
    expect(result.ok === false && result.reason).toBe('SECRET_MISMATCH');
  });

  it('rejects a payload from an unexpected team', () => {
    const result = verifyWebhook(body({ teamId: 'tea_someone_else' }), options);
    expect(result.ok === false && result.reason).toBe('TEAM_MISMATCH');
  });

  it('rejects malformed JSON', () => {
    const result = verifyWebhook('{not json', options);
    expect(result.ok === false && result.reason).toBe('MALFORMED_PAYLOAD');
  });

  it('rejects a payload with no event type', () => {
    const result = verifyWebhook(body({ type: undefined }), options);
    expect(result.ok === false && result.reason).toBe('MALFORMED_PAYLOAD');
  });

  it('rejects an oversized body before parsing it', () => {
    const result = verifyWebhook(body({ text: 'x'.repeat(2000) }), { ...options, maxBodyBytes: 500 });
    expect(result.ok === false && result.reason).toBe('PAYLOAD_TOO_LARGE');
  });

  it('marks an unhandled event type as ingested but not handled', () => {
    const result = verifyWebhook(body({ type: 'emailsOpened' }), options);
    expect(result.ok).toBe(true);
    expect(result.ok && result.handled).toBe(false);
  });

  it('recognizes suppression events', () => {
    for (const type of ['emailsUnsubscribed', 'emailsBounced', 'emailsFailed']) {
      const result = verifyWebhook(body({ type }), options);
      expect(result.ok && result.isSuppression, type).toBe(true);
    }
  });

  it('flags a third-party email reply even when lead and campaign are absent', () => {
    const result = verifyWebhook(
      body({
        type: 'emailsReplied',
        isThirdPartyReply: true,
        leadId: undefined,
        campaignId: undefined,
        contactId: undefined,
      }),
      options,
    );
    expect(result.ok).toBe(true);
    expect(result.ok && result.isThirdPartyReply).toBe(true);
  });

  it('never returns the secret in its result', () => {
    const result = verifyWebhook(body(), options);
    expect(JSON.stringify(result)).not.toContain(SECRET);
  });
});

describe('idempotency keys', () => {
  it('uses the activity id when present', () => {
    expect(webhookIdempotencyKey({ _id: 'act_9', type: 'linkedinReplied' })).toBe('act_9');
  });

  it('derives a stable key when the activity id is missing', () => {
    const payload: LemlistWebhookPayload = {
      type: 'emailsReplied',
      secret: SECRET,
      contactId: 'ctc_1',
      createdAt: '2026-08-11T10:00:00Z',
    };
    const a = webhookIdempotencyKey(payload);
    const b = webhookIdempotencyKey({ ...payload });
    expect(a).toBe(b);
    expect(a).toMatch(/^derived:/);
  });

  it('does not let the secret change the derived key', () => {
    const base: LemlistWebhookPayload = { type: 'emailsReplied', contactId: 'ctc_1' };
    expect(webhookIdempotencyKey({ ...base, secret: 'one' })).toBe(
      webhookIdempotencyKey({ ...base, secret: 'two' }),
    );
  });

  it('gives distinct events distinct keys', () => {
    expect(webhookIdempotencyKey({ type: 'emailsReplied', contactId: 'a' })).not.toBe(
      webhookIdempotencyKey({ type: 'emailsReplied', contactId: 'b' }),
    );
  });
});

describe('payload sanitization for display', () => {
  it('keeps identifiers and drops the secret and the body', () => {
    const parsed = JSON.parse(body()) as LemlistWebhookPayload;
    const sanitized = sanitizeWebhookPayload(parsed);
    expect(sanitized['contactId']).toBe('ctc_1');
    expect(sanitized['hasBody']).toBe(true);
    expect(JSON.stringify(sanitized)).not.toContain(SECRET);
    expect(JSON.stringify(sanitized)).not.toContain('send it over');
  });
});
