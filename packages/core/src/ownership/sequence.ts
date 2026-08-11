import type { ConversationOwner, SequenceStepClass } from '../domain/enums.js';
import { REASON_CODES, type ReasonCode } from '../domain/reason-codes.js';

/**
 * Sequence collision prevention.
 *
 * The failure this code exists to prevent: Astra sends a warm personalized
 * message through the inbox, and forty minutes later the Lemlist campaign
 * sends its own scripted first message to the same person. Sending through
 * the inbox does *not* cancel a scheduled sequence step, so ownership has to
 * be made explicit by pausing the lead and verifying the pause took effect.
 */

export interface SequenceStep {
  /** Stable identifier. Preferred over `position`, which changes on reorder. */
  readonly id: string | null;
  readonly position: number;
  readonly type: string;
  readonly channel: string | null;
  /** Step body if the API exposes it. Empty string when unavailable. */
  readonly content: string;
  readonly completed: boolean;
  /** True when the step's reachability depends on an unresolved condition. */
  readonly conditional: boolean;
}

export interface PendingManualTask {
  readonly id: string;
  readonly type: string;
  readonly leadId: string | null;
  readonly contactId: string | null;
  readonly campaignId: string | null;
  readonly description: string;
  readonly dueAt: Date | null;
}

const NON_MESSAGE_STEP_TYPES = new Set([
  'wait',
  'delay',
  'condition',
  'if',
  'branch',
  'manualtask',
  'manual_task',
  'task',
  'call',
  'linkedinvisit',
  'linkedin_visit',
  'linkedininvite',
  'linkedin_invite',
  'api',
  'webhook',
  'enrich',
]);

const MESSAGE_STEP_TYPES = new Set([
  'email',
  'linkedinmessage',
  'linkedin_message',
  'linkedinsend',
  'message',
  'inmail',
]);

/** Wording that only makes sense if an earlier substantive message exists. */
const FOLLOW_UP_MARKERS: readonly RegExp[] = [
  /\b(just )?(following up|circling back|checking in|bumping|nudging)\b/i,
  /\bdid you (get|see|have) a chance\b/i,
  /\b(as|like) I mentioned\b/i,
  /\bmy (last|previous) (message|email|note)\b/i,
  /\bin case (this|it) got buried\b/i,
  /\bbringing this back\b/i,
  /\bany thoughts\b/i,
  /\bhave you seen (this|it)\b/i,
  /\bbump\b/i,
];

/** Signals that a step introduces the reason for contact on its own. */
const SUBSTANTIVE_MARKERS: readonly RegExp[] = [
  /\b(thanks for|thank you for) (connecting|accepting)\b/i,
  /\bi (noticed|saw|spotted)\b/i,
  /\bwe (help|work with|build|design)\b/i,
  /\bthe reason (i|we)(?:'m| am| are)? reaching out\b/i,
  /\bwould (you|it) be\b/i,
  /\bwant me to\b/i,
  /\bshall i\b/i,
];

/**
 * Deterministic first pass at classifying a step. Returns UNKNOWN whenever the
 * evidence is thin, which the caller must treat as "do not send": the model
 * classifier may refine UNKNOWN, but neither is allowed to turn a genuinely
 * ambiguous step into a green light on its own.
 */
export function classifySequenceStep(step: SequenceStep): SequenceStepClass {
  const type = step.type.toLowerCase().replace(/[\s-]/g, '');
  if (NON_MESSAGE_STEP_TYPES.has(type)) return 'NON_MESSAGE_STEP';

  const isMessageType = MESSAGE_STEP_TYPES.has(type);
  const content = step.content.trim();

  if (!isMessageType && content.length === 0) return 'UNKNOWN';
  if (content.length === 0) return 'UNKNOWN';

  const followUpHits = FOLLOW_UP_MARKERS.filter((pattern) => pattern.test(content)).length;
  const substantiveHits = SUBSTANTIVE_MARKERS.filter((pattern) => pattern.test(content)).length;

  // A short message with follow-up wording and no independent value statement
  // is a bump. Anything that both bumps and introduces is treated as
  // substantive, because the risk of double-introducing is the expensive one.
  if (followUpHits > 0 && substantiveHits === 0) return 'REMINDER_OR_BUMP';
  if (substantiveHits > 0) return 'SUBSTANTIVE_INITIAL_MESSAGE';
  if (content.split(/\s+/).length <= 25 && followUpHits > 0) return 'REMINDER_OR_BUMP';
  return 'UNKNOWN';
}

/** Tasks that imply a human is about to touch this conversation. */
const HUMAN_TOUCH_TASK_TYPES = new Set(['call', 'manual', 'manualtask', 'linkedinvoice', 'custom', 'note']);

export function taskBlocksAutomation(task: PendingManualTask): boolean {
  const type = task.type.toLowerCase().replace(/[\s_-]/g, '');
  if (HUMAN_TOUCH_TASK_TYPES.has(type)) return true;
  // An unrecognized task type is exactly the "unknown context" case.
  return !['linkedinvisit', 'enrich'].includes(type);
}

export function filterTasksForLead(
  tasks: readonly PendingManualTask[],
  scope: { readonly leadId?: string | null; readonly contactId?: string | null; readonly campaignId?: string | null },
): PendingManualTask[] {
  // The tasks endpoint is team-wide, so filtering happens locally. A task with
  // no identifiers at all is not assumed to be unrelated.
  return tasks.filter((task) => {
    const hasAnyIdentifier =
      task.leadId !== null || task.contactId !== null || task.campaignId !== null;
    if (!hasAnyIdentifier) return true;
    if (scope.leadId && task.leadId === scope.leadId) return true;
    if (scope.contactId && task.contactId === scope.contactId) return true;
    if (scope.campaignId && task.campaignId === scope.campaignId && task.leadId === null) {
      return true;
    }
    return false;
  });
}

export interface AcceptanceOwnershipInput {
  /** Steps not yet completed for this lead, in sequence order. */
  readonly upcomingSteps: readonly SequenceStep[];
  /** Per-step classification, keyed by step id or `pos:<n>` when id is absent. */
  readonly stepClasses: ReadonlyMap<string, SequenceStepClass>;
  /** True when branching could not be resolved from accessible API data. */
  readonly branchingUnresolved: boolean;
  readonly pendingTasks: readonly PendingManualTask[];
}

export type AcceptanceOwnershipDecision =
  | {
      readonly kind: 'LEAVE_TO_SEQUENCE';
      readonly owner: Extract<ConversationOwner, 'LEMLIST_SEQUENCE'>;
      readonly reasonCodes: readonly ReasonCode[];
      readonly detail: string;
    }
  | {
      readonly kind: 'REVIEW_REQUIRED';
      readonly owner: Extract<ConversationOwner, 'UNKNOWN'>;
      readonly reasonCodes: readonly ReasonCode[];
      readonly detail: string;
    }
  | {
      readonly kind: 'ACQUIRE_OWNERSHIP';
      readonly reasonCodes: readonly ReasonCode[];
      readonly detail: string;
    };

export function stepKey(step: SequenceStep): string {
  return step.id ?? `pos:${step.position}`;
}

/**
 * Decide what an invitation-accepted event means for ownership. This function
 * never sends and never pauses: it returns the intent, and the caller performs
 * the pause-then-verify sequence before anything is composed.
 */
export function decideAcceptanceOwnership(
  input: AcceptanceOwnershipInput,
): AcceptanceOwnershipDecision {
  if (input.branchingUnresolved) {
    return {
      kind: 'REVIEW_REQUIRED',
      owner: 'UNKNOWN',
      reasonCodes: [REASON_CODES.SEQUENCE_BRANCH_UNRESOLVABLE],
      detail:
        'The reachable next steps could not be resolved from the accessible sequence data, so we cannot tell whether the campaign will send its own first message.',
    };
  }

  const blockingTasks = input.pendingTasks.filter(taskBlocksAutomation);
  if (blockingTasks.length > 0) {
    return {
      kind: 'REVIEW_REQUIRED',
      owner: 'UNKNOWN',
      reasonCodes: [REASON_CODES.PENDING_MANUAL_TASK],
      detail: `A pending manual task implies a human is handling this conversation: ${blockingTasks
        .map((task) => `${task.type} (${task.id})`)
        .join(', ')}`,
    };
  }

  const pendingMessageSteps = input.upcomingSteps.filter((step) => !step.completed);

  const classes = pendingMessageSteps.map(
    (step) => input.stepClasses.get(stepKey(step)) ?? classifySequenceStep(step),
  );

  const substantiveIndex = classes.indexOf('SUBSTANTIVE_INITIAL_MESSAGE');
  if (substantiveIndex !== -1) {
    const step = pendingMessageSteps[substantiveIndex];
    return {
      kind: 'LEAVE_TO_SEQUENCE',
      owner: 'LEMLIST_SEQUENCE',
      reasonCodes: [REASON_CODES.SUBSTANTIVE_STEP_PLANNED, REASON_CODES.SEQUENCE_OWNS_CONVERSATION],
      detail: `The campaign will send its own substantive first message (step ${
        step ? stepKey(step) : 'unknown'
      }), so Astra stays quiet on this acceptance. A genuine reply later still enters the reply workflow.`,
    };
  }

  const unknownIndex = classes.indexOf('UNKNOWN');
  if (unknownIndex !== -1) {
    const step = pendingMessageSteps[unknownIndex];
    return {
      kind: 'REVIEW_REQUIRED',
      owner: 'UNKNOWN',
      reasonCodes: [REASON_CODES.SEQUENCE_BRANCH_UNRESOLVABLE],
      detail: `Step ${
        step ? stepKey(step) : 'unknown'
      } could not be classified as substantive or as a bump, so we cannot rule out a duplicate introduction.`,
    };
  }

  return {
    kind: 'ACQUIRE_OWNERSHIP',
    reasonCodes: [REASON_CODES.OWNERSHIP_ACQUIRED],
    detail:
      pendingMessageSteps.length === 0
        ? 'No further steps are scheduled for this lead.'
        : `Remaining steps are reminders or non-message steps (${pendingMessageSteps
            .map(stepKey)
            .join(', ')}), so Astra may take ownership after pausing the lead.`,
  };
}

export interface OwnershipTransferVerification {
  readonly pauseCallSucceeded: boolean;
  /** State refetched from Lemlist after the pause call. */
  readonly refetchedIsPaused: boolean | null;
  readonly conversationUnchanged: boolean;
}

export type OwnershipTransferResult =
  | { readonly ok: true; readonly owner: Extract<ConversationOwner, 'ASTRA_AGENT'> }
  | { readonly ok: false; readonly reasonCode: ReasonCode; readonly detail: string };

/**
 * The pause must be *observed*, not merely requested. An accepted API call
 * that did not actually pause the lead is indistinguishable from success at
 * the call site, and is exactly how a duplicate send happens.
 */
export function verifyOwnershipTransfer(
  verification: OwnershipTransferVerification,
): OwnershipTransferResult {
  if (!verification.pauseCallSucceeded) {
    return {
      ok: false,
      reasonCode: REASON_CODES.PAUSE_FAILED,
      detail: 'The Lemlist pause call did not succeed, so the campaign may still send.',
    };
  }
  if (verification.refetchedIsPaused !== true) {
    return {
      ok: false,
      reasonCode: REASON_CODES.PAUSE_UNVERIFIED,
      detail:
        verification.refetchedIsPaused === null
          ? 'The lead state could not be refetched, so the pause is unverified.'
          : 'The lead still reports as not paused after the pause call.',
    };
  }
  if (!verification.conversationUnchanged) {
    return {
      ok: false,
      reasonCode: REASON_CODES.CONVERSATION_CHANGED,
      detail: 'A new message arrived while ownership was being transferred.',
    };
  }
  return { ok: true, owner: 'ASTRA_AGENT' };
}
