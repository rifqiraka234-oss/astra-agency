import { CONVERSATION_STATES, type ConversationState } from '../domain/enums.js';
import type { ReasonCode } from '../domain/reason-codes.js';

/**
 * The conversation state machine.
 *
 * An illegal transition is a bug in the controller, and a controller bug is
 * exactly the situation where an external write must not happen. So an
 * illegal transition throws, is audited, and the caller's transaction rolls
 * back before any integration is touched.
 */

export class IllegalStateTransitionError extends Error {
  constructor(
    readonly from: ConversationState,
    readonly to: ConversationState,
    readonly conversationId: string,
  ) {
    super(`Illegal conversation state transition ${from} -> ${to} (conversation ${conversationId})`);
    this.name = 'IllegalStateTransitionError';
  }
}

/** Terminal states. Nothing transitions out of these without operator action. */
export const TERMINAL_STATES: ReadonlySet<ConversationState> = new Set<ConversationState>([
  'SUPPRESSED',
  'DEAD_LETTER',
]);

/**
 * States in which the controller is permitted to consider an external send.
 * Every other state means something is still being decided.
 */
export const SEND_ELIGIBLE_STATES: ReadonlySet<ConversationState> = new Set<ConversationState>([
  'LOW_RISK_ELIGIBLE',
  'AWAITING_MESSAGE_APPROVAL',
  'AWAITING_PROTOTYPE_APPROVAL',
  'MEETING_BOOKING_PENDING',
]);

const TRANSITIONS: Readonly<Record<ConversationState, readonly ConversationState[]>> = {
  NEW_EVENT: ['DEBOUNCING', 'SUPPRESSED', 'HUMAN_OWNED', 'COMPLETED_NO_ACTION', 'RETRYABLE_ERROR'],
  DEBOUNCING: ['DEBOUNCING', 'FETCHING_CONTEXT', 'SUPPRESSED', 'RETRYABLE_ERROR'],
  FETCHING_CONTEXT: [
    'ANALYZING',
    'SEQUENCE_OWNED',
    'HUMAN_REVIEW_REQUIRED',
    'HUMAN_OWNED',
    'SUPPRESSED',
    'COMPLETED_NO_ACTION',
    'RETRYABLE_ERROR',
  ],
  // A sequence-owned conversation is not finished: a genuine later reply
  // re-enters the pipeline through DEBOUNCING.
  SEQUENCE_OWNED: ['DEBOUNCING', 'FETCHING_CONTEXT', 'HUMAN_REVIEW_REQUIRED', 'SUPPRESSED'],
  ANALYZING: [
    'LOW_RISK_ELIGIBLE',
    'DRAFT_CREATED',
    'AWAITING_MESSAGE_APPROVAL',
    'PROTOTYPE_QUEUED',
    'CALENDAR_OPTIONS_PROPOSED',
    'MEETING_BOOKING_PENDING',
    'HUMAN_REVIEW_REQUIRED',
    'HUMAN_OWNED',
    'SUPPRESSED',
    'COMPLETED_NO_ACTION',
    'RETRYABLE_ERROR',
  ],
  LOW_RISK_ELIGIBLE: [
    'COMPLETED_NO_ACTION',
    'DRAFT_CREATED',
    'AWAITING_MESSAGE_APPROVAL',
    'HUMAN_REVIEW_REQUIRED',
    // A message arriving mid-send invalidates eligibility and re-analyses.
    'DEBOUNCING',
    'SUPPRESSED',
    'RETRYABLE_ERROR',
  ],
  DRAFT_CREATED: [
    'AWAITING_MESSAGE_APPROVAL',
    'HUMAN_OWNED',
    'HUMAN_REVIEW_REQUIRED',
    'DEBOUNCING',
    'COMPLETED_NO_ACTION',
    'SUPPRESSED',
  ],
  AWAITING_MESSAGE_APPROVAL: [
    'COMPLETED_NO_ACTION',
    'DRAFT_CREATED',
    'HUMAN_OWNED',
    'HUMAN_REVIEW_REQUIRED',
    'DEBOUNCING',
    'SUPPRESSED',
    'RETRYABLE_ERROR',
  ],
  PROTOTYPE_QUEUED: [
    'PROTOTYPE_RESEARCHING',
    'HUMAN_REVIEW_REQUIRED',
    'SUPPRESSED',
    'RETRYABLE_ERROR',
  ],
  // Research owns the identity premise gate. An unresolved premise goes to a
  // human rather than proceeding into design on a guess.
  PROTOTYPE_RESEARCHING: [
    'PROTOTYPE_STRATEGIZING',
    'HUMAN_REVIEW_REQUIRED',
    'SUPPRESSED',
    'RETRYABLE_ERROR',
    'DEAD_LETTER',
  ],
  // Strategy owns the mandatory pre-design artifact gate.
  PROTOTYPE_STRATEGIZING: [
    'PROTOTYPE_BUILDING',
    'HUMAN_REVIEW_REQUIRED',
    'SUPPRESSED',
    'RETRYABLE_ERROR',
    'DEAD_LETTER',
  ],
  PROTOTYPE_BUILDING: [
    'PROTOTYPE_DEPLOYING',
    'PROTOTYPE_QA_FAILED',
    'HUMAN_REVIEW_REQUIRED',
    'SUPPRESSED',
    'RETRYABLE_ERROR',
    'DEAD_LETTER',
  ],
  // Deployment can still fail QA: the logged-out verification runs against the
  // deployed site, so a prototype that passed locally can fail here.
  PROTOTYPE_DEPLOYING: [
    'AWAITING_PROTOTYPE_APPROVAL',
    'PROTOTYPE_QA_FAILED',
    'HUMAN_REVIEW_REQUIRED',
    'SUPPRESSED',
    'RETRYABLE_ERROR',
    'DEAD_LETTER',
  ],
  PROTOTYPE_QA_FAILED: [
    'PROTOTYPE_BUILDING',
    'HUMAN_REVIEW_REQUIRED',
    'DEAD_LETTER',
    'SUPPRESSED',
  ],
  AWAITING_PROTOTYPE_APPROVAL: [
    'COMPLETED_NO_ACTION',
    'PROTOTYPE_BUILDING',
    'HUMAN_OWNED',
    'HUMAN_REVIEW_REQUIRED',
    'DEBOUNCING',
    'SUPPRESSED',
    'RETRYABLE_ERROR',
  ],
  CALENDAR_OPTIONS_PROPOSED: [
    'MEETING_BOOKING_PENDING',
    'DEBOUNCING',
    'HUMAN_REVIEW_REQUIRED',
    'HUMAN_OWNED',
    'COMPLETED_NO_ACTION',
    'SUPPRESSED',
    'RETRYABLE_ERROR',
  ],
  MEETING_BOOKING_PENDING: [
    'MEETING_SCHEDULED',
    // Slot was taken between proposal and booking: propose fresh options.
    'CALENDAR_OPTIONS_PROPOSED',
    'HUMAN_REVIEW_REQUIRED',
    'DEBOUNCING',
    'SUPPRESSED',
    'RETRYABLE_ERROR',
  ],
  // After a meeting exists the conversation is a human's. It only leaves this
  // state through an explicit operator decision.
  MEETING_SCHEDULED: ['HUMAN_OWNED', 'HUMAN_REVIEW_REQUIRED', 'SUPPRESSED'],
  HUMAN_REVIEW_REQUIRED: [
    'HUMAN_OWNED',
    'DRAFT_CREATED',
    'AWAITING_MESSAGE_APPROVAL',
    'AWAITING_PROTOTYPE_APPROVAL',
    'PROTOTYPE_QUEUED',
    'CALENDAR_OPTIONS_PROPOSED',
    'DEBOUNCING',
    'COMPLETED_NO_ACTION',
    'SUPPRESSED',
    'DEAD_LETTER',
  ],
  HUMAN_OWNED: ['DEBOUNCING', 'HUMAN_REVIEW_REQUIRED', 'COMPLETED_NO_ACTION', 'SUPPRESSED'],
  SUPPRESSED: [],
  RETRYABLE_ERROR: [
    'DEBOUNCING',
    'FETCHING_CONTEXT',
    'ANALYZING',
    'PROTOTYPE_BUILDING',
    'MEETING_BOOKING_PENDING',
    'HUMAN_REVIEW_REQUIRED',
    'DEAD_LETTER',
    'SUPPRESSED',
  ],
  DEAD_LETTER: [],
  COMPLETED_NO_ACTION: ['DEBOUNCING', 'HUMAN_REVIEW_REQUIRED', 'HUMAN_OWNED', 'SUPPRESSED'],
};

export function canTransition(from: ConversationState, to: ConversationState): boolean {
  return (TRANSITIONS[from] ?? []).includes(to);
}

export function allowedTransitions(from: ConversationState): readonly ConversationState[] {
  return TRANSITIONS[from] ?? [];
}

export interface TransitionRequest {
  readonly conversationId: string;
  readonly from: ConversationState;
  readonly to: ConversationState;
  /** Who caused this: 'controller', 'operator:<email>', 'system:<job>'. */
  readonly actor: string;
  readonly reasonCode: ReasonCode;
  readonly sourceMessageId: string | null;
  readonly correlationId: string;
  readonly detail?: string;
}

export interface TransitionRecord extends TransitionRequest {
  readonly occurredAt: Date;
}

/**
 * Validate and materialize a transition. The returned record is what the
 * caller persists to `conversation_states`; nothing here writes on its own.
 */
export function transition(request: TransitionRequest, now: Date = new Date()): TransitionRecord {
  if (!CONVERSATION_STATES.includes(request.to)) {
    throw new IllegalStateTransitionError(request.from, request.to, request.conversationId);
  }
  // Re-entering the same state is allowed only where the transition table says
  // so explicitly (DEBOUNCING extending its own window is the real case).
  if (!canTransition(request.from, request.to)) {
    throw new IllegalStateTransitionError(request.from, request.to, request.conversationId);
  }
  return { ...request, occurredAt: now };
}

export function isTerminal(state: ConversationState): boolean {
  return TERMINAL_STATES.has(state);
}
