import { z } from 'zod';
import {
  CHANNELS,
  INTENTS,
  MEETING_STATES,
  RAPPORT_LEVELS,
  RECOMMENDED_ACTIONS,
  RISK_LEVELS,
  SENTIMENTS,
} from '../domain/enums.js';

/**
 * The runtime contract for Claude's analysis output.
 *
 * Every object is `.strict()`: an unexpected property is a validation failure,
 * not something to ignore. A model that invents a field is a model whose
 * output we do not understand, and we do not act on output we do not
 * understand.
 */

export const DECISION_SCHEMA_VERSION = '1.0';

export const evidenceItemSchema = z
  .object({
    /** The specific assertion this row supports. */
    claim: z.string().min(1).max(500),
    source_type: z.enum(['CONVERSATION', 'WEBSITE', 'SEARCH_RESULT', 'LEMLIST_RECORD', 'ASTRA_CANON']),
    source_url: z.string().url().nullable(),
    /** Activity id when the claim is grounded in a conversation message. */
    source_message_id: z.string().max(200),
    /** Verbatim excerpt from the source. Never paraphrase into this field. */
    support: z.string().min(1).max(2000),
  })
  .strict();

export const conversationAnalysisSchema = z
  .object({
    channel: z.enum(CHANNELS),
    /** BCP-47 language tag of the prospect's most recent message. */
    language: z.string().min(2).max(12),
    summary: z.string().max(2000),
    /** The angle the original outreach used, so the reply can stay coherent. */
    outreach_angle: z.string().max(500),
    last_prospect_message: z.string().max(5000),
    questions_unanswered: z.array(z.string().max(500)).max(20),
    promises_already_made: z.array(z.string().max(500)).max(20),
    rapport_level: z.enum(RAPPORT_LEVELS),
    meeting_state: z.enum(MEETING_STATES),
    /**
     * True when the prospect refers to a call, document, colleague or
     * commitment the system cannot see. This alone removes auto-send
     * eligibility.
     */
    external_context_suspected: z.boolean(),
  })
  .strict();

export const classificationSchema = z
  .object({
    intent: z.enum(INTENTS),
    sentiment: z.enum(SENTIMENTS),
    risk: z.enum(RISK_LEVELS),
    confidence: z.number().min(0).max(1),
    reason_codes: z.array(z.string().max(120)).max(20),
  })
  .strict();

export const recommendationSchema = z
  .object({
    action: z.enum(RECOMMENDED_ACTIONS),
    /** Null unless the action actually produces a message. */
    reply_text: z.string().max(4000).nullable(),
    research_required: z.boolean(),
    prototype_required: z.boolean(),
    calendar_action: z.enum(['NONE', 'PROPOSE_SLOTS', 'BOOK_SLOT', 'CLARIFY_TIME']),
    human_handoff_reason: z.string().max(500).nullable(),
  })
  .strict();

export const safetyFlagsSchema = z
  .object({
    contains_unverified_claim: z.boolean(),
    contains_new_promise: z.boolean(),
    contains_pricing_or_scope: z.boolean(),
    contains_fake_urgency: z.boolean(),
    contains_sensitive_data: z.boolean(),
    website_prompt_injection_detected: z.boolean(),
    missing_context: z.boolean(),
  })
  .strict();

export const claudeDecisionSchema = z
  .object({
    schema_version: z.literal(DECISION_SCHEMA_VERSION),
    conversation: conversationAnalysisSchema,
    classification: classificationSchema,
    evidence: z.array(evidenceItemSchema).max(50),
    recommendation: recommendationSchema,
    safety: safetyFlagsSchema,
  })
  .strict()
  .superRefine((value, ctx) => {
    const producesMessage =
      value.recommendation.action === 'AUTO_SEND_CANDIDATE' ||
      value.recommendation.action === 'CREATE_DRAFT';
    if (producesMessage && (value.recommendation.reply_text ?? '').trim().length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['recommendation', 'reply_text'],
        message: `action ${value.recommendation.action} requires non-empty reply_text`,
      });
    }
    if (value.recommendation.action === 'HANDOFF' && value.recommendation.human_handoff_reason === null) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['recommendation', 'human_handoff_reason'],
        message: 'HANDOFF requires human_handoff_reason',
      });
    }
    // A model that recommends an automatic send while flagging its own output
    // as unsafe is internally inconsistent; reject rather than reconcile.
    if (value.recommendation.action === 'AUTO_SEND_CANDIDATE') {
      const unsafe = Object.entries(value.safety).filter(([, flag]) => flag === true);
      if (unsafe.length > 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['recommendation', 'action'],
          message: `AUTO_SEND_CANDIDATE contradicts safety flags: ${unsafe
            .map(([key]) => key)
            .join(', ')}`,
        });
      }
    }
  });

export type ClaudeDecision = z.infer<typeof claudeDecisionSchema>;
export type EvidenceItem = z.infer<typeof evidenceItemSchema>;
export type SafetyFlags = z.infer<typeof safetyFlagsSchema>;

export function anySafetyFlagSet(safety: SafetyFlags): boolean {
  return Object.values(safety).some((flag) => flag === true);
}

export function setSafetyFlags(safety: SafetyFlags): string[] {
  return Object.entries(safety)
    .filter(([, flag]) => flag === true)
    .map(([key]) => key);
}

/**
 * Parse model output. Returns a discriminated result rather than throwing, so
 * the caller records a `MODEL_SCHEMA_INVALID` decision and hands off instead
 * of crashing the job.
 */
export type DecisionParseResult =
  | { readonly ok: true; readonly decision: ClaudeDecision }
  | { readonly ok: false; readonly errors: readonly string[] };

export function parseClaudeDecision(raw: unknown): DecisionParseResult {
  const parsed = claudeDecisionSchema.safeParse(raw);
  if (parsed.success) return { ok: true, decision: parsed.data };
  return {
    ok: false,
    errors: parsed.error.issues.map(
      (issue) => `${issue.path.join('.') || '(root)'}: ${issue.message}`,
    ),
  };
}
