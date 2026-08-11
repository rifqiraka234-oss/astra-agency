import { describe, expect, it } from 'vitest';
import { decideControllerAction } from './engine.js';
import { REASON_CODES } from '../domain/reason-codes.js';
import { testConfig, testConversation, testDecision, testPolicyInput } from '../testing/factories.js';
import { normalizeConversation } from '../conversation/normalize.js';

const failedPredicateIds = (input: Parameters<typeof decideControllerAction>[0]) =>
  decideControllerAction(input)
    .predicates.filter((predicate) => !predicate.passed)
    .map((predicate) => predicate.id);

describe('low-risk automatic send policy', () => {
  it('allows a fully compliant post-acceptance message', () => {
    const result = decideControllerAction(testPolicyInput());
    expect(result.action).toBe('AUTO_SEND');
    expect(result.lowRiskCase).toBe('POST_ACCEPTANCE_INITIAL_MESSAGE');
    expect(result.maxWords).toBe(65);
  });

  it('records every predicate it evaluated, not just the failures', () => {
    const result = decideControllerAction(testPolicyInput());
    expect(result.predicates.length).toBeGreaterThan(15);
    expect(result.predicates.every((predicate) => predicate.id.length > 0)).toBe(true);
  });

  it('blocks when the global kill switch is on', () => {
    const result = decideControllerAction(
      testPolicyInput({ config: testConfig({ GLOBAL_KILL_SWITCH: 'true' }) }),
    );
    expect(result.action).not.toBe('AUTO_SEND');
    expect(result.reasonCodes).toContain(REASON_CODES.KILL_SWITCH_ON);
  });

  it('blocks in every mode other than LOW_RISK_AUTO', () => {
    for (const mode of ['TEST', 'SHADOW', 'DRAFT_ONLY', 'HUMAN_ONLY'] as const) {
      const result = decideControllerAction(
        testPolicyInput({ config: testConfig({ RUNTIME_MODE: mode }) }),
      );
      expect(result.action, `mode ${mode}`).not.toBe('AUTO_SEND');
    }
  });

  it('blocks when ALLOW_LIVE_LEMLIST_SEND is false even in LOW_RISK_AUTO', () => {
    const result = decideControllerAction(
      testPolicyInput({ config: testConfig({ ALLOW_LIVE_LEMLIST_SEND: 'false' }) }),
    );
    expect(result.action).not.toBe('AUTO_SEND');
    expect(result.reasonCodes).toContain(REASON_CODES.LIVE_SEND_FLAG_OFF);
  });

  it('blocks a campaign that is not on the allowlist', () => {
    const result = decideControllerAction(testPolicyInput({ campaignId: 'cam_not_enabled' }));
    expect(result.action).not.toBe('AUTO_SEND');
    expect(result.reasonCodes).toContain(REASON_CODES.CAMPAIGN_NOT_ENABLED);
  });

  it('blocks when the owner is not the Astra agent', () => {
    for (const owner of ['LEMLIST_SEQUENCE', 'HUMAN', 'UNKNOWN'] as const) {
      const result = decideControllerAction(testPolicyInput({ owner }));
      expect(result.action, `owner ${owner}`).not.toBe('AUTO_SEND');
    }
  });

  it('honours an active exclusion at every scope', () => {
    const scopes = [
      { scope: 'GLOBAL' as const, targetId: null },
      { scope: 'CAMPAIGN' as const, targetId: 'cam_enabled_one' },
      { scope: 'CONTACT' as const, targetId: 'con_1' },
      { scope: 'LEAD' as const, targetId: 'lea_1' },
    ];
    for (const { scope, targetId } of scopes) {
      const result = decideControllerAction(
        testPolicyInput({
          exclusions: [{ scope, targetId, reason: 'operator excluded', active: true }],
        }),
      );
      expect(result.reasonCodes, `scope ${scope}`).toContain(REASON_CODES.EXCLUSION_ACTIVE);
    }
  });

  it('applies the 0.96 acceptance threshold exactly', () => {
    const at = decideControllerAction(
      testPolicyInput({ decision: testDecision({ classification: { confidence: 0.96 } }) }),
    );
    expect(at.action).toBe('AUTO_SEND');

    const below = decideControllerAction(
      testPolicyInput({ decision: testDecision({ classification: { confidence: 0.959 } }) }),
    );
    expect(below.action).not.toBe('AUTO_SEND');
    expect(below.reasonCodes).toContain(REASON_CODES.CONFIDENCE_BELOW_THRESHOLD);
  });

  it('applies the 0.94 general threshold at the boundary', () => {
    const decisionAt = testDecision({
      classification: { intent: 'SIMPLE_ACKNOWLEDGEMENT', confidence: 0.94 },
      recommendation: { reply_text: 'Thanks, that is helpful. I will keep it in mind.' },
    });
    expect(decideControllerAction(testPolicyInput({ decision: decisionAt })).action).toBe('AUTO_SEND');

    const decisionBelow = testDecision({
      classification: { intent: 'SIMPLE_ACKNOWLEDGEMENT', confidence: 0.939 },
      recommendation: { reply_text: 'Thanks, that is helpful. I will keep it in mind.' },
    });
    expect(decideControllerAction(testPolicyInput({ decision: decisionBelow })).action).not.toBe(
      'AUTO_SEND',
    );
  });

  it('blocks when risk is not LOW', () => {
    const result = decideControllerAction(
      testPolicyInput({ decision: testDecision({ classification: { risk: 'MEDIUM' } }) }),
    );
    expect(result.reasonCodes).toContain(REASON_CODES.RISK_NOT_LOW);
  });

  it('blocks when the conversation hash changed since analysis', () => {
    const input = testPolicyInput();
    const result = decideControllerAction({
      ...input,
      freshness: { ...input.freshness, actualConversationHash: 'different' },
    });
    expect(result.reasonCodes).toContain(REASON_CODES.STALE_CONVERSATION_HASH);
  });

  it('blocks when a newer inbound message arrived', () => {
    const input = testPolicyInput();
    const result = decideControllerAction({
      ...input,
      freshness: { ...input.freshness, actualLatestInboundMessageId: 'act_newer' },
    });
    expect(result.reasonCodes).toContain(REASON_CODES.STALE_INBOUND_MESSAGE_ID);
  });

  it('blocks when the model context was truncated', () => {
    const result = decideControllerAction(testPolicyInput({ contextTruncated: true }));
    expect(result.reasonCodes).toContain(REASON_CODES.LOSSY_TRUNCATION);
  });

  it('hands off when the automated outbound cap is reached', () => {
    const result = decideControllerAction(testPolicyInput({ automatedOutboundCount: 3 }));
    expect(result.action).toBe('HANDOFF');
    expect(result.reasonCodes).toContain(REASON_CODES.AUTOMATED_OUTBOUND_CAP_REACHED);
  });

  it('hands off once the conversation reaches the meaningful turn cap', () => {
    const activities = Array.from({ length: 20 }, (_, index) => ({
      id: `m${index}`,
      channel: 'linkedin',
      createdAt: new Date(Date.UTC(2026, 7, 1, 9, index * 30)).toISOString(),
      isFromLead: index % 2 === 1,
      text: `turn ${index}`,
    }));
    const conversation = normalizeConversation(activities, { contactId: 'con_1' });
    const result = decideControllerAction(testPolicyInput({ conversation }));
    expect(result.action).toBe('HANDOFF');
    expect(result.reasonCodes).toContain(REASON_CODES.TURN_LIMIT_REACHED);
  });

  it('hands off when an attachment is present', () => {
    const conversation = testConversation([
      {
        id: 'm1',
        channel: 'email',
        createdAt: '2026-08-10T10:00:00Z',
        isFromLead: true,
        text: 'see attached',
        attachments: [{ name: 'brief.pdf' }],
      },
    ]);
    const result = decideControllerAction(testPolicyInput({ conversation }));
    expect(result.action).toBe('HANDOFF');
    expect(result.reasonCodes).toContain(REASON_CODES.ATTACHMENT_PRESENT);
  });

  it('hands off when a message direction is uncertain', () => {
    const conversation = testConversation([
      { id: 'm1', channel: 'linkedin', createdAt: '2026-08-10T10:00:00Z', text: 'who sent this?' },
    ]);
    const result = decideControllerAction(testPolicyInput({ conversation }));
    expect(result.action).toBe('HANDOFF');
    expect(result.reasonCodes).toContain(REASON_CODES.UNCERTAIN_DIRECTION);
  });

  it('hands off when rapport is high', () => {
    const result = decideControllerAction(
      testPolicyInput({ decision: testDecision({ conversation: { rapport_level: 'HIGH' } }) }),
    );
    expect(result.action).toBe('HANDOFF');
    expect(result.reasonCodes).toContain(REASON_CODES.HIGH_RAPPORT);
  });

  it('hands off when outside context is suspected', () => {
    const result = decideControllerAction(
      testPolicyInput({
        decision: testDecision({ conversation: { external_context_suspected: true } }),
      }),
    );
    expect(result.action).toBe('HANDOFF');
    expect(result.reasonCodes).toContain(REASON_CODES.EXTERNAL_CONTEXT_SUSPECTED);
  });

  it('hands off when the prospect references a meeting', () => {
    const conversation = testConversation([
      {
        id: 'm1',
        channel: 'linkedin',
        createdAt: '2026-08-10T10:00:00Z',
        isFromLead: true,
        text: 'Great, see you on Thursday then.',
      },
    ]);
    const result = decideControllerAction(testPolicyInput({ conversation }));
    expect(result.action).toBe('HANDOFF');
    expect(result.reasonCodes).toContain(REASON_CODES.MEETING_ALREADY_REFERENCED);
  });

  it('always hands off pricing, legal, complaint and referral intents', () => {
    for (const intent of [
      'PRICING_OR_COMMERCIAL',
      'LEGAL_OR_CONTRACTUAL',
      'COMPLAINT_OR_ANGER',
      'REFERRAL',
      'WRONG_PERSON',
    ] as const) {
      const result = decideControllerAction(
        testPolicyInput({ decision: testDecision({ classification: { intent } }) }),
      );
      expect(result.action, intent).toBe('HANDOFF');
    }
  });

  it('suppresses an unsubscribe without any further reasoning', () => {
    const result = decideControllerAction(
      testPolicyInput({ decision: testDecision({ classification: { intent: 'UNSUBSCRIBE' } }) }),
    );
    expect(result.action).toBe('SUPPRESS');
    expect(result.nextOwner).toBe('SUPPRESSED');
  });

  it('routes a third-party reply to a human', () => {
    const result = decideControllerAction(testPolicyInput({ isThirdPartyReply: true }));
    expect(result.action).toBe('HANDOFF');
    expect(result.reasonCodes).toContain(REASON_CODES.THIRD_PARTY_PARTICIPANT);
  });

  it('takes no action on an automated reply', () => {
    const result = decideControllerAction(
      testPolicyInput({ decision: testDecision({ classification: { intent: 'AUTOMATED_REPLY' } }) }),
    );
    expect(result.action).toBe('NO_ACTION');
  });

  it('never auto-sends an intent that is not mapped to a low-risk case', () => {
    const result = decideControllerAction(
      testPolicyInput({
        decision: testDecision({
          classification: { intent: 'OBJECTION', confidence: 0.99 },
          recommendation: { reply_text: 'That is fair, most people say that at first.' },
        }),
      }),
    );
    expect(result.action).not.toBe('AUTO_SEND');
    expect(result.reasonCodes).toContain(REASON_CODES.NO_MATCHING_LOW_RISK_CASE);
  });

  it('builds a prototype but never authorizes sending the link', () => {
    const result = decideControllerAction(
      testPolicyInput({
        decision: testDecision({
          classification: { intent: 'YES_SEND_PROTOTYPE', confidence: 0.99 },
          recommendation: { action: 'BUILD_PROTOTYPE', reply_text: null },
        }),
      }),
    );
    expect(result.action).toBe('BUILD_PROTOTYPE');
    expect(result.reasonCodes).toContain(REASON_CODES.PROTOTYPE_URL_REQUIRES_APPROVAL);
  });

  it('blocks a post-acceptance claim of completed work with no stored concept brief', () => {
    const result = decideControllerAction(
      testPolicyInput({
        hasStoredConceptBrief: false,
        decision: testDecision({
          recommendation: {
            reply_text:
              'Thanks for connecting. I sketched a version of your booking page that shows the price earlier. Want me to send it?',
          },
        }),
      }),
    );
    expect(result.action).not.toBe('AUTO_SEND');
    expect(result.reasonCodes).toContain(REASON_CODES.CONCEPT_BRIEF_MISSING);
  });

  it('allows the same claim when a concept brief exists', () => {
    const result = decideControllerAction(
      testPolicyInput({
        hasStoredConceptBrief: true,
        decision: testDecision({
          recommendation: {
            reply_text:
              'Thanks for connecting. I sketched a version of your booking page that shows the price earlier. Want me to send it?',
          },
        }),
      }),
    );
    expect(result.action).toBe('AUTO_SEND');
  });

  it('blocks a post-acceptance message with no verified company identity', () => {
    const result = decideControllerAction(testPolicyInput({ companyIdentityVerified: false }));
    expect(result.reasonCodes).toContain(REASON_CODES.COMPANY_IDENTITY_AMBIGUOUS);
  });

  it('requires an exact replyToActivityId on an email thread', () => {
    const conversation = testConversation([
      {
        id: 'e1',
        channel: 'email',
        createdAt: '2026-08-10T10:00:00Z',
        isFromLead: true,
        subject: 'Re: idea',
        text: 'Thanks, noted.',
      },
    ]);
    const input = testPolicyInput({
      conversation,
      decision: testDecision({
        conversation: { channel: 'email' },
        classification: { intent: 'SIMPLE_ACKNOWLEDGEMENT', confidence: 0.98 },
        recommendation: { reply_text: 'Thanks, that helps. I will leave it with you.' },
      }),
      sendIdentifiers: {
        leadId: 'lea_1',
        contactId: 'con_1',
        sendUserId: 'usr_send',
        replyToActivityId: 'latest',
      },
    });
    expect(failedPredicateIds(input)).toContain('reply_to_activity_id');
  });

  it('blocks a calendar proposal built from stale free/busy data', () => {
    const input = testPolicyInput({
      decision: testDecision({
        classification: { intent: 'MEETING_INTEREST', confidence: 0.98 },
        recommendation: {
          action: 'PROPOSE_CALENDAR_SLOTS',
          calendar_action: 'PROPOSE_SLOTS',
          reply_text:
            'Happy to. I have Tuesday 12 August at 14:00 or Wednesday 13 August at 10:00, both Amsterdam time. Which suits you?',
        },
      }),
      availability: {
        queriedAt: new Date('2026-08-11T09:00:00Z'),
        querySucceeded: true,
        reservationsHeld: true,
      },
    });
    const result = decideControllerAction(input);
    expect(result.action).not.toBe('PROPOSE_CALENDAR_SLOTS');
    expect(result.reasonCodes).toContain(REASON_CODES.CALENDAR_DATA_STALE);
  });

  it('allows a calendar proposal from a fresh query with reservations held', () => {
    const now = new Date('2026-08-11T10:00:00Z');
    const result = decideControllerAction(
      testPolicyInput({
        now,
        decision: testDecision({
          classification: { intent: 'MEETING_INTEREST', confidence: 0.98 },
          recommendation: {
            action: 'PROPOSE_CALENDAR_SLOTS',
            calendar_action: 'PROPOSE_SLOTS',
            reply_text:
              'Happy to. I have Tuesday 12 August at 14:00 or Wednesday 13 August at 10:00, both Amsterdam time. Which suits you?',
          },
        }),
        availability: {
          queriedAt: new Date(now.getTime() - 10_000),
          querySucceeded: true,
          reservationsHeld: true,
        },
      }),
    );
    expect(result.action).toBe('PROPOSE_CALENDAR_SLOTS');
  });

  it('blocks a calendar proposal when the free/busy query failed', () => {
    const now = new Date('2026-08-11T10:00:00Z');
    const result = decideControllerAction(
      testPolicyInput({
        now,
        decision: testDecision({
          classification: { intent: 'MEETING_INTEREST', confidence: 0.98 },
          recommendation: {
            action: 'PROPOSE_CALENDAR_SLOTS',
            calendar_action: 'PROPOSE_SLOTS',
            reply_text: 'Happy to, how about Tuesday 14:00 Amsterdam time?',
          },
        }),
        availability: {
          queriedAt: new Date(now.getTime() - 5_000),
          querySucceeded: false,
          reservationsHeld: true,
        },
      }),
    );
    expect(result.reasonCodes).toContain(REASON_CODES.CALENDAR_QUERY_FAILED);
  });

  it('blocks booking when ALLOW_LIVE_CALENDAR_WRITE is false', () => {
    const result = decideControllerAction(
      testPolicyInput({
        config: testConfig({ ALLOW_LIVE_CALENDAR_WRITE: 'false' }),
        decision: testDecision({
          classification: { intent: 'SLOT_SELECTED', confidence: 0.98 },
          recommendation: {
            action: 'BOOK_SELECTED_SLOT',
            calendar_action: 'BOOK_SLOT',
            reply_text: 'Perfect, Tuesday 14:00 Amsterdam time works. I will send the invite now.',
          },
        }),
      }),
    );
    expect(result.reasonCodes).toContain(REASON_CODES.LIVE_CALENDAR_FLAG_OFF);
  });

  it('blocks a blocking pending manual task', () => {
    const result = decideControllerAction(
      testPolicyInput({
        pendingTasks: [
          {
            id: 'tsk_1',
            type: 'call',
            leadId: 'lea_1',
            contactId: 'con_1',
            campaignId: 'cam_enabled_one',
            description: 'Ring them about the proposal',
            dueAt: null,
          },
        ],
      }),
    );
    expect(result.action).toBe('HANDOFF');
    expect(result.reasonCodes).toContain(REASON_CODES.PENDING_MANUAL_TASK);
  });

  it('blocks when prompt injection was detected in external content', () => {
    const result = decideControllerAction(
      testPolicyInput({
        decision: testDecision({ safety: { website_prompt_injection_detected: true } }),
      }),
    );
    expect(result.action).toBe('HANDOFF');
    expect(result.reasonCodes).toContain(REASON_CODES.PROMPT_INJECTION_DETECTED);
  });
});
