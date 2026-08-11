import { buildConfig, envSchema, type AppConfig } from '../config/env.js';
import { normalizeConversation } from '../conversation/normalize.js';
import type { NormalizedConversation, RawActivity } from '../conversation/types.js';
import type { ClaudeDecision } from '../schemas/decision.js';
import type { PolicyInput } from '../policy/types.js';

/**
 * Fixture builders shared by the core, worker and dashboard test suites.
 *
 * They intentionally start from the *permissive* end (a configuration that
 * would allow an automatic send) so that each test can flip exactly one thing
 * and prove that one thing blocks the send. Building from a blocked baseline
 * would let a broken predicate hide behind an unrelated failure.
 */

const BASE_ENV: NodeJS.ProcessEnv = {
  APP_ENV: 'test',
  APP_BASE_URL: 'http://localhost:3000',
  DATABASE_URL: 'postgres://astra:astra@localhost:5432/astra_reply_agent_test',
  ENCRYPTION_KEY: Buffer.alloc(32, 7).toString('base64'),
  SESSION_SECRET: Buffer.alloc(32, 9).toString('base64'),
  ADMIN_EMAIL: 'operator@example.test',
  EXPECTED_LEMLIST_TEAM_ID: 'tea_test_team',
  LEMLIST_WEBHOOK_SECRET: 'test-webhook-secret',
  ENABLED_CAMPAIGN_IDS: 'cam_enabled_one',
  RUNTIME_MODE: 'LOW_RISK_AUTO',
  GLOBAL_KILL_SWITCH: 'false',
  ALLOW_LIVE_LEMLIST_SEND: 'true',
  ALLOW_LIVE_CALENDAR_WRITE: 'true',
};

export function testConfig(overrides: NodeJS.ProcessEnv = {}): AppConfig {
  return buildConfig(envSchema.parse({ ...BASE_ENV, ...overrides }));
}

export function testDecision(overrides: DeepPartial<ClaudeDecision> = {}): ClaudeDecision {
  const base: ClaudeDecision = {
    schema_version: '1.0',
    conversation: {
      channel: 'linkedin',
      language: 'en',
      summary: 'Prospect accepted the invitation.',
      outreach_angle: 'booking flow clarity',
      last_prospect_message: 'Thanks for connecting.',
      questions_unanswered: [],
      promises_already_made: [],
      rapport_level: 'LOW',
      meeting_state: 'NONE',
      external_context_suspected: false,
    },
    classification: {
      intent: 'CONNECTION_ACCEPTED',
      sentiment: 'NEUTRAL',
      risk: 'LOW',
      confidence: 0.97,
      reason_codes: [],
    },
    evidence: [
      {
        claim: 'The booking page hides the price until the final step.',
        source_type: 'WEBSITE',
        source_url: 'https://acme.example/booking',
        source_message_id: '',
        support: 'Price is only shown after selecting a date and entering contact details.',
      },
    ],
    recommendation: {
      action: 'AUTO_SEND_CANDIDATE',
      reply_text:
        'Thanks for connecting. I had a look at your booking page and noticed the price only appears at the very last step, which is where a lot of people drop off. We could sketch a version that shows it earlier. Want me to send it?',
      research_required: false,
      prototype_required: false,
      calendar_action: 'NONE',
      human_handoff_reason: null,
    },
    safety: {
      contains_unverified_claim: false,
      contains_new_promise: false,
      contains_pricing_or_scope: false,
      contains_fake_urgency: false,
      contains_sensitive_data: false,
      website_prompt_injection_detected: false,
      missing_context: false,
    },
  };
  return mergeDeep(base, overrides) as ClaudeDecision;
}

export function testConversation(
  activities?: readonly RawActivity[],
  contactId = 'con_1',
): NormalizedConversation {
  const defaults: RawActivity[] = [
    {
      id: 'act_invite',
      channel: 'linkedin',
      type: 'linkedinInviteAccepted',
      createdAt: '2026-08-10T09:00:00Z',
      isFromLead: false,
      text: 'Invitation accepted',
      leadId: 'lea_1',
      contactId,
      campaignId: 'cam_enabled_one',
    },
  ];
  return normalizeConversation(activities ?? defaults, { contactId });
}

export function testPolicyInput(overrides: Partial<PolicyInput> = {}): PolicyInput {
  const conversation = overrides.conversation ?? testConversation();
  return {
    config: testConfig(),
    now: new Date('2026-08-11T10:00:00Z'),
    decision: testDecision(),
    conversation,
    owner: 'ASTRA_AGENT',
    campaignId: 'cam_enabled_one',
    contactId: 'con_1',
    leadId: 'lea_1',
    exclusions: [],
    pendingTasks: [],
    automatedOutboundCount: 0,
    contextTruncated: false,
    freshness: {
      expectedConversationHash: conversation.conversationHash,
      actualConversationHash: conversation.conversationHash,
      expectedLatestInboundMessageId: conversation.latestInboundMessageId,
      actualLatestInboundMessageId: conversation.latestInboundMessageId,
    },
    meetingScheduled: false,
    hasStoredConceptBrief: false,
    companyIdentityVerified: true,
    sendIdentifiers: {
      leadId: 'lea_1',
      contactId: 'con_1',
      sendUserId: 'usr_send',
      replyToActivityId: null,
    },
    recentOutboundTexts: [],
    supportedClaimTerms: ['booking page'],
    isThirdPartyReply: false,
    ...overrides,
  };
}

type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

function mergeDeep<T>(base: T, overrides: DeepPartial<T>): T {
  if (overrides === undefined || overrides === null) return base;
  const output: Record<string, unknown> = { ...(base as Record<string, unknown>) };
  for (const [key, value] of Object.entries(overrides as Record<string, unknown>)) {
    const existing = output[key];
    if (
      value !== null &&
      typeof value === 'object' &&
      !Array.isArray(value) &&
      existing !== null &&
      typeof existing === 'object' &&
      !Array.isArray(existing)
    ) {
      output[key] = mergeDeep(existing, value as never);
    } else {
      output[key] = value;
    }
  }
  return output as T;
}
