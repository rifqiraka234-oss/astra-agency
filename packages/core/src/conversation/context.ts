import type { ConversationTurn, NormalizedConversation } from './types.js';

/**
 * Model context assembly.
 *
 * The default is always the complete normalized conversation. Truncation is a
 * failure mode, not an optimization: when it happens the conversation loses
 * automatic-send eligibility for good, because we can no longer prove the
 * reply is consistent with everything that was said.
 */

export const MAX_RECENT_TURNS_ON_TRUNCATION = 12;

/** Approximate characters per token. Deliberately pessimistic. */
const CHARS_PER_TOKEN = 3.5;

export interface ContextBudget {
  /** Maximum characters of conversation text handed to the model. */
  readonly maxChars: number;
}

export const DEFAULT_CONTEXT_BUDGET: ContextBudget = { maxChars: 60_000 };

export interface BuiltContext {
  readonly text: string;
  readonly truncated: boolean;
  /** Turn indices that were dropped, recorded for the audit trail. */
  readonly omittedTurnIndices: readonly number[];
  readonly omittedSummary: string | null;
  readonly estimatedTokens: number;
}

/** Signals that must survive truncation because policy depends on them. */
const PROMISE_PATTERN =
  /\b(i(?:'ll| will)|we(?:'ll| will)|let me|i can|we can|happy to|i'?ll send|shall i send)\b/i;
const QUESTION_PATTERN = /\?/;
const OBJECTION_PATTERN =
  /\b(too expensive|no budget|not interested|already have|we use|not the right time|why (would|should)|how much|not sure|concern|hesitant)\b/i;
const MEETING_PATTERN =
  /\b(call|meeting|meet|calendar|schedule|book|zoom|teams|google meet|slot|availability|catch up)\b/i;

export function turnCarriesCriticalSignal(turn: ConversationTurn): boolean {
  const text = turn.text;
  if (text.trim().length === 0) return false;
  return (
    PROMISE_PATTERN.test(text) ||
    QUESTION_PATTERN.test(text) ||
    OBJECTION_PATTERN.test(text) ||
    MEETING_PATTERN.test(text)
  );
}

export function buildModelContext(
  conversation: NormalizedConversation,
  budget: ContextBudget = DEFAULT_CONTEXT_BUDGET,
): BuiltContext {
  const full = renderTurns(conversation.turns);
  if (full.length <= budget.maxChars) {
    return {
      text: full,
      truncated: false,
      omittedTurnIndices: [],
      omittedSummary: null,
      estimatedTokens: Math.ceil(full.length / CHARS_PER_TOKEN),
    };
  }

  const turns = conversation.turns;
  const keep = new Set<number>();

  // 1. The first outbound message: it defines the outreach angle every later
  //    reply has to stay coherent with.
  const firstOutbound = turns.find((turn) => turn.direction === 'OUTBOUND');
  if (firstOutbound) keep.add(firstOutbound.turnIndex);
  const firstTurn = turns[0];
  if (firstTurn) keep.add(firstTurn.turnIndex);

  // 2. The most recent turns, which carry the actual thing being replied to.
  for (const turn of turns.slice(-MAX_RECENT_TURNS_ON_TRUNCATION)) keep.add(turn.turnIndex);

  // 3. Anything containing a promise, question, objection or meeting mention.
  for (const turn of turns) {
    if (turnCarriesCriticalSignal(turn)) keep.add(turn.turnIndex);
  }

  const kept = turns.filter((turn) => keep.has(turn.turnIndex));
  const omitted = turns.filter((turn) => !keep.has(turn.turnIndex));

  const omittedSummary =
    omitted.length > 0
      ? `[${omitted.length} earlier turn(s) omitted for length: ${describeOmitted(omitted)}]`
      : null;

  const rendered = renderTurns(kept, omittedSummary);
  const text =
    rendered.length <= budget.maxChars ? rendered : hardTrim(rendered, budget.maxChars);

  return {
    text,
    truncated: true,
    omittedTurnIndices: omitted.map((turn) => turn.turnIndex),
    omittedSummary,
    estimatedTokens: Math.ceil(text.length / CHARS_PER_TOKEN),
  };
}

function describeOmitted(omitted: readonly ConversationTurn[]): string {
  const first = omitted[0];
  const last = omitted.at(-1);
  if (!first || !last) return 'none';
  const inbound = omitted.filter((turn) => turn.direction === 'INBOUND').length;
  const outbound = omitted.filter((turn) => turn.direction === 'OUTBOUND').length;
  return (
    `turns ${first.turnIndex}-${last.turnIndex}, ` +
    `${inbound} from the prospect and ${outbound} from us, ` +
    `between ${first.startedAt.toISOString()} and ${last.endedAt.toISOString()}`
  );
}

function renderTurns(turns: readonly ConversationTurn[], omittedNote?: string | null): string {
  const lines: string[] = [];
  let notePlaced = false;
  let previousIndex: number | null = null;

  for (const turn of turns) {
    if (
      omittedNote &&
      !notePlaced &&
      previousIndex !== null &&
      turn.turnIndex > previousIndex + 1
    ) {
      lines.push(omittedNote);
      notePlaced = true;
    }
    const speaker = speakerLabel(turn);
    lines.push(`[${turn.startedAt.toISOString()}] ${speaker}:\n${turn.text}`);
    previousIndex = turn.turnIndex;
  }

  if (omittedNote && !notePlaced) lines.unshift(omittedNote);
  return lines.join('\n\n');
}

function speakerLabel(turn: ConversationTurn): string {
  switch (turn.direction) {
    case 'INBOUND':
      return 'PROSPECT';
    case 'OUTBOUND':
      return 'ASTRA';
    case 'SYSTEM':
      return 'SYSTEM';
    default:
      return 'UNKNOWN_SPEAKER';
  }
}

function hardTrim(text: string, maxChars: number): string {
  const marker = '\n\n[context truncated to fit the model window]';
  return `${text.slice(0, Math.max(0, maxChars - marker.length))}${marker}`;
}

/**
 * A short deterministic summary for the dashboard and for the audit record.
 * It is computed from the normalized conversation, never from model output,
 * so it stays trustworthy even when the model misreads something.
 */
export function deterministicSummary(conversation: NormalizedConversation): string {
  const inboundTurns = conversation.turns.filter((turn) => turn.direction === 'INBOUND');
  const outboundTurns = conversation.turns.filter((turn) => turn.direction === 'OUTBOUND');
  const lastInbound = inboundTurns.at(-1);

  const parts = [
    `channel=${conversation.channel}`,
    `turns=${conversation.meaningfulTurnCount}`,
    `prospect_turns=${inboundTurns.length}`,
    `our_turns=${outboundTurns.length}`,
    `attachments=${conversation.attachmentsPresent ? 'yes' : 'no'}`,
    `uncertain_direction=${conversation.hasUncertainDirection ? 'yes' : 'no'}`,
  ];
  if (lastInbound) {
    parts.push(`last_prospect_message_at=${lastInbound.endedAt.toISOString()}`);
  }
  return parts.join(' ');
}

/**
 * Whether Astra has already offered to build or send a sketch. A "yes" reply
 * only means "send the prototype" if such an offer actually exists.
 */
const PROTOTYPE_OFFER_PATTERN =
  /\b(shall i send|want me to send|send (it|the sketch|the concept|it over)|sketch(ed)? (it|an idea|something)|mock ?up|concept|prototype)\b/i;

export function findPrototypeOffer(
  conversation: NormalizedConversation,
): { readonly messageId: string; readonly text: string } | null {
  const outbound = conversation.messages.filter(
    (message) => message.direction === 'OUTBOUND' && message.kind !== 'DRAFT',
  );
  for (const message of [...outbound].reverse()) {
    if (PROTOTYPE_OFFER_PATTERN.test(message.bodyText)) {
      return { messageId: message.externalId, text: message.bodyText };
    }
  }
  return null;
}

/**
 * Phrases that imply context the system cannot see. These are matched
 * deterministically as well as flagged by the model: either signal is enough
 * to stop automation.
 */
const EXTERNAL_CONTEXT_PATTERNS: readonly RegExp[] = [
  /\bas (we )?discussed\b/i,
  /\bafter our (call|chat|meeting|conversation)\b/i,
  /\bfollowing (the|our) (meeting|call|conversation)\b/i,
  /\bon the phone\b/i,
  /\b(i|we) (sent|emailed|forwarded) (this|it|that) to\b/i,
  /\bsee my other (email|message)\b/i,
  /\byour (proposal|quote|offer|document|deck)\b/i,
  /\bthe (proposal|quote|contract|invoice) you sent\b/i,
  /\b(spoke|talked) (to|with) (joshua|josh|luna|your colleague)\b/i,
  /\blike (you|we) agreed\b/i,
  /\bper our\b/i,
];

export function detectExternalContext(text: string): string[] {
  const hits: string[] = [];
  for (const pattern of EXTERNAL_CONTEXT_PATTERNS) {
    const match = pattern.exec(text);
    if (match) hits.push(match[0]);
  }
  return hits;
}

const MEETING_REFERENCE_PATTERNS: readonly RegExp[] = [
  /\b(we're|we are|it'?s) (booked|scheduled|confirmed)\b/i,
  /\bsee you (on|at)\b/i,
  /\bcalendar invite\b/i,
  /\bi(?:'ve| have) accepted\b/i,
  /\bour (call|meeting) (on|at)\b/i,
];

export function detectMeetingReference(text: string): string[] {
  const hits: string[] = [];
  for (const pattern of MEETING_REFERENCE_PATTERNS) {
    const match = pattern.exec(text);
    if (match) hits.push(match[0]);
  }
  return hits;
}
