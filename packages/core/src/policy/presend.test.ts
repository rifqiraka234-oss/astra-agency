import { describe, expect, it } from 'vitest';
import { preSendCheck, type PreSendInput } from './presend.js';
import { REASON_CODES } from '../domain/reason-codes.js';
import { contentHash } from '../text/hash.js';
import { testConfig } from '../testing/factories.js';

const TEXT = 'Thanks, that is helpful. I will leave it with you for now.';

const input = (overrides: Partial<PreSendInput> = {}): PreSendInput => ({
  config: testConfig(),
  now: new Date('2026-08-11T10:00:00Z'),
  channel: 'linkedin',
  text: TEXT,
  authorizedContentHash: contentHash(TEXT),
  lowRiskCase: 'SIMPLE_ACKNOWLEDGEMENT',
  maxWords: 35,
  allowUrls: false,
  allowedUrls: [],
  recentOutboundTexts: [],
  supportedClaimTerms: [],
  sendIdentifiers: {
    leadId: 'lea_1',
    contactId: 'con_1',
    sendUserId: 'usr_send',
    replyToActivityId: null,
  },
  contactId: 'con_1',
  freshConversationHash: 'hash_a',
  expectedConversationHash: 'hash_a',
  freshLatestInboundMessageId: 'act_5',
  expectedLatestInboundMessageId: 'act_5',
  isApprovedSend: false,
  ...overrides,
});

describe('pre-send gate', () => {
  it('allows a compliant send and returns a stable idempotency key', () => {
    const first = preSendCheck(input());
    const second = preSendCheck(input());
    expect(first.allow).toBe(true);
    expect(first.allow && second.allow && first.idempotencyKey).toBe(
      second.allow ? second.idempotencyKey : '',
    );
  });

  it('derives a different idempotency key for different text', () => {
    const other = 'Thanks, noted. I will leave it there.';
    const a = preSendCheck(input());
    const b = preSendCheck(input({ text: other, authorizedContentHash: contentHash(other) }));
    expect(a.allow && b.allow && a.idempotencyKey === b.idempotencyKey).toBe(false);
  });

  it('blocks when the text changed after authorization', () => {
    const result = preSendCheck(input({ text: 'Thanks, slightly different wording now.' }));
    expect(result.allow).toBe(false);
    expect(result.allow === false && result.reasonCodes).toContain(
      REASON_CODES.CONTENT_HASH_MISMATCH,
    );
  });

  it('blocks when the kill switch went on between decision and send', () => {
    const result = preSendCheck(input({ config: testConfig({ GLOBAL_KILL_SWITCH: 'true' }) }));
    expect(result.allow === false && result.reasonCodes).toContain(REASON_CODES.KILL_SWITCH_ON);
  });

  it('blocks when a new inbound message arrived between decision and send', () => {
    const result = preSendCheck(input({ freshLatestInboundMessageId: 'act_6' }));
    expect(result.allow === false && result.reasonCodes).toContain(
      REASON_CODES.STALE_INBOUND_MESSAGE_ID,
    );
  });

  it('blocks when the conversation hash moved', () => {
    const result = preSendCheck(input({ freshConversationHash: 'hash_b' }));
    expect(result.allow === false && result.reasonCodes).toContain(
      REASON_CODES.STALE_CONVERSATION_HASH,
    );
  });

  it('rejects the ambiguous replyToActivityId value "latest" on email', () => {
    const result = preSendCheck(
      input({
        channel: 'email',
        sendIdentifiers: {
          leadId: 'lea_1',
          contactId: 'con_1',
          sendUserId: 'usr_send',
          replyToActivityId: 'latest',
        },
      }),
    );
    expect(result.allow === false && result.reasonCodes).toContain(
      REASON_CODES.MISSING_REPLY_TO_ACTIVITY_ID,
    );
  });

  it('requires leadId, contactId and sendUserId on LinkedIn', () => {
    const result = preSendCheck(
      input({
        sendIdentifiers: {
          leadId: 'lea_1',
          contactId: 'con_1',
          sendUserId: null,
          replyToActivityId: null,
        },
      }),
    );
    expect(result.allow === false && result.reasonCodes).toContain(
      REASON_CODES.MISSING_SEND_IDENTIFIERS,
    );
  });

  it('refuses to execute a stale approval', () => {
    const result = preSendCheck(input({ isApprovedSend: true, approvalStatus: 'STALE' }));
    expect(result.allow === false && result.reasonCodes).toContain(REASON_CODES.STALE_APPROVAL);
  });

  it('refuses to execute an expired approval', () => {
    const result = preSendCheck(input({ isApprovedSend: true, approvalStatus: 'EXPIRED' }));
    expect(result.allow === false && result.reasonCodes).toContain(REASON_CODES.APPROVAL_EXPIRED);
  });

  it('executes an approved send in DRAFT_ONLY only when live sending is explicitly enabled', () => {
    const allowed = preSendCheck(
      input({
        isApprovedSend: true,
        approvalStatus: 'APPROVED',
        config: testConfig({ RUNTIME_MODE: 'DRAFT_ONLY', ALLOW_LIVE_LEMLIST_SEND: 'true' }),
      }),
    );
    expect(allowed.allow).toBe(true);

    const blocked = preSendCheck(
      input({
        isApprovedSend: true,
        approvalStatus: 'APPROVED',
        config: testConfig({ RUNTIME_MODE: 'DRAFT_ONLY', ALLOW_LIVE_LEMLIST_SEND: 'false' }),
      }),
    );
    expect(blocked.allow).toBe(false);
  });

  it('re-runs content checks even on an approved send', () => {
    const text = 'Here you go: https://acme-prototype-by-astra.netlify.app';
    const result = preSendCheck(
      input({
        text,
        authorizedContentHash: contentHash(text),
        isApprovedSend: true,
        approvalStatus: 'APPROVED',
        lowRiskCase: null,
        maxWords: 60,
        allowUrls: false,
      }),
    );
    expect(result.allow).toBe(false);
    expect(result.allow === false && result.reasonCodes).toContain(
      REASON_CODES.PROTOTYPE_URL_REQUIRES_APPROVAL,
    );
  });

  it('permits the prototype URL only when the approval listed it', () => {
    const text = 'Here you go: https://acme-prototype-by-astra.netlify.app';
    const result = preSendCheck(
      input({
        text,
        authorizedContentHash: contentHash(text),
        isApprovedSend: true,
        approvalStatus: 'APPROVED',
        lowRiskCase: null,
        maxWords: 60,
        allowUrls: true,
        allowedUrls: ['https://acme-prototype-by-astra.netlify.app'],
      }),
    );
    expect(result.allow).toBe(true);
  });
});
