/**
 * Enrichment message validators (specification section 7.6).
 *
 * The outreach messages this pipeline drafts are held to the same deterministic
 * standard as conversation replies, plus a set of style rules that came out of
 * reading real rejected drafts:
 *
 *  - the tongue-twisting compound opener ("Building X as a sibling duo around
 *    brand strategy and art direction, treating identity like something that's
 *    cultivated not just designed, is a nice angle") is the single most
 *    recognisable AI tell in the historical set;
 *  - the message must centre the prospect's friction and its consequence, not
 *    Astra admiring its own research;
 *  - every factual claim has to trace to a recorded observation.
 *
 * These are checks, not generation. They run on whatever text arrives, from a
 * model or from an operator edit, and they run again before import.
 */

import { checkOutboundContent, type ContentViolation } from '../text/content-checks.js';
import { countWords } from '../text/word-count.js';
import { REASON_CODES } from '../domain/reason-codes.js';

/** Openers that stack participial or gerund clauses before reaching a verb. */
const COMPOUND_OPENER_PATTERNS: readonly RegExp[] = [
  /^(building|creating|launching|running|starting|growing|crafting|developing)\b[^.!?]{40,}/i,
  /^(having|seeing|noticing|watching)\b[^.!?]{40,}/i,
  /^(as|with)\s+(someone|a\s+\w+)\s+who\b[^.!?]{30,}/i,
];

/** Generic admiration with no observation attached. */
const GENERIC_COMPLIMENT_PATTERNS: readonly RegExp[] = [
  /\b(nice|great|lovely|interesting|compelling|impressive|exciting)\s+(angle|idea|concept|vision|mission|approach|proposition)\b/i,
  /\bi(?:'m| am| was)\s+(impressed|inspired|struck)\b/i,
  /\b(enormous|huge|great|massive)\s+potential\b/i,
  /\b(unique|innovative|multidisciplinary|visionary)\s+(vision|proposition|approach|offering)\b/i,
  /\blove what you(?:'re| are)\s+(doing|building)\b/i,
];

/** Astra refers to itself as "we" / "our agency". */
const FIRST_PERSON_SINGULAR_AGENCY = /\b(my agency|my company|my studio|i run an agency)\b/i;

export interface EnrichmentMessageInput {
  readonly connectionMessage: string;
  readonly firstMessage: string;
  /** Exact observations the research stages actually recorded. */
  readonly supportedObservations: readonly string[];
  readonly connectionMessageMaxWords: number;
  readonly firstMessageMaxWords: number;
  /** Other messages drafted in this batch, for near-duplicate detection. */
  readonly otherDraftedMessages?: readonly string[];
}

export interface EnrichmentMessageResult {
  readonly ok: boolean;
  readonly connectionMessageWordCount: number;
  readonly firstMessageWordCount: number;
  readonly violations: readonly EnrichmentViolation[];
}

export interface EnrichmentViolation {
  readonly field: 'connectionMessage' | 'firstMessage';
  readonly code: string;
  readonly severity: 'BLOCK' | 'WARN';
  readonly detail: string;
  readonly evidence?: string;
}

/**
 * The enrichment guardrail is stricter than the conversation one. A reply may
 * legitimately contain a hyphenated word; these outreach messages may not
 * contain any dash character at all, and the standing instruction is to rewrite
 * around it rather than swap in a comma that changes the meaning.
 */
const ANY_DASH = /[-\u2010\u2011\u2012\u2013\u2014\u2015]/;

function styleViolations(
  field: 'connectionMessage' | 'firstMessage',
  text: string,
): EnrichmentViolation[] {
  const out: EnrichmentViolation[] = [];
  const trimmed = text.trim();

  const dash = ANY_DASH.exec(trimmed);
  if (dash) {
    out.push({
      field,
      code: 'MESSAGE_CONTAINS_DASH',
      severity: 'BLOCK',
      detail: 'Hyphens, en dashes and em dashes are prohibited in generated outreach copy.',
      evidence: dash[0],
    });
  }

  for (const pattern of COMPOUND_OPENER_PATTERNS) {
    const match = pattern.exec(trimmed);
    if (match) {
      out.push({
        field,
        code: 'MESSAGE_COMPOUND_OPENER',
        severity: 'BLOCK',
        detail: 'The opening sentence stacks clauses before saying anything plain.',
        evidence: match[0].slice(0, 120),
      });
      break;
    }
  }

  for (const pattern of GENERIC_COMPLIMENT_PATTERNS) {
    const match = pattern.exec(trimmed);
    if (match) {
      out.push({
        field,
        code: 'MESSAGE_GENERIC_COMPLIMENT',
        severity: 'BLOCK',
        detail: 'Admiration without a specific observation attached.',
        evidence: match[0],
      });
      break;
    }
  }

  const singular = FIRST_PERSON_SINGULAR_AGENCY.exec(trimmed);
  if (singular) {
    out.push({
      field,
      code: 'MESSAGE_WRONG_AGENCY_VOICE',
      severity: 'BLOCK',
      detail: 'Astra speaks as "we" and "our agency".',
      evidence: singular[0],
    });
  }

  return out;
}

/**
 * A first message has to do three things: state a verified observation, name
 * the friction it causes, and ask something easy to answer. The question mark
 * check is deliberately structural rather than semantic — it catches drafts
 * that trail off into a statement with no ask, which read as broadcasts.
 */
function askViolations(text: string): EnrichmentViolation[] {
  if (text.includes('?')) return [];
  return [
    {
      field: 'firstMessage',
      code: 'MESSAGE_NO_ASK',
      severity: 'BLOCK',
      detail: 'The first message never asks the prospect anything.',
    },
  ];
}

function mapContentViolations(
  field: 'connectionMessage' | 'firstMessage',
  violations: readonly ContentViolation[],
): EnrichmentViolation[] {
  return violations.map((v) => ({
    field,
    code: v.code,
    severity: v.severity,
    detail: v.detail,
    ...(v.evidence === undefined ? {} : { evidence: v.evidence }),
  }));
}

export function validateEnrichmentMessages(
  input: EnrichmentMessageInput,
): EnrichmentMessageResult {
  const supportedClaimTerms = input.supportedObservations.map((o) => o.toLowerCase());
  const violations: EnrichmentViolation[] = [];

  const connectionCheck = checkOutboundContent(input.connectionMessage, {
    maxWords: input.connectionMessageMaxWords,
    allowUrls: false,
    supportedClaimTerms,
    ...(input.otherDraftedMessages === undefined
      ? {}
      : { recentOutboundTexts: input.otherDraftedMessages }),
  });
  const firstCheck = checkOutboundContent(input.firstMessage, {
    maxWords: input.firstMessageMaxWords,
    allowUrls: false,
    supportedClaimTerms,
    ...(input.otherDraftedMessages === undefined
      ? {}
      : { recentOutboundTexts: input.otherDraftedMessages }),
  });

  violations.push(...mapContentViolations('connectionMessage', connectionCheck.violations));
  violations.push(...mapContentViolations('firstMessage', firstCheck.violations));
  violations.push(...styleViolations('connectionMessage', input.connectionMessage));
  violations.push(...styleViolations('firstMessage', input.firstMessage));
  violations.push(...askViolations(input.firstMessage));

  if (input.connectionMessage.trim().length === 0) {
    violations.push({
      field: 'connectionMessage',
      code: REASON_CODES.EMPTY_MESSAGE,
      severity: 'BLOCK',
      detail: 'Connection message is empty.',
    });
  }
  if (input.firstMessage.trim().length === 0) {
    violations.push({
      field: 'firstMessage',
      code: REASON_CODES.EMPTY_MESSAGE,
      severity: 'BLOCK',
      detail: 'First message is empty.',
    });
  }

  return {
    ok: violations.every((v) => v.severity !== 'BLOCK'),
    connectionMessageWordCount: countWords(input.connectionMessage),
    firstMessageWordCount: countWords(input.firstMessage),
    violations,
  };
}
