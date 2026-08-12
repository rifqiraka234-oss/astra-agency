import {
  REASON_CODES,
  classifySequenceStep,
  decideAcceptanceOwnership,
  stepKey,
  verifyOwnershipTransfer,
  type ConversationOwner,
  type SequenceStepClass,
} from '@astra/core';
import type { AppContext } from '../context.js';
import type { ConversationContext } from './fetch-context.js';
import { refetchFreshness } from './fetch-context.js';

/**
 * Sequence collision prevention, executed.
 *
 * The core decides *whether* Astra may take ownership. This module performs
 * the pause and then proves it worked. The proof matters: an accepted pause
 * call that did not actually pause the lead looks identical to success at the
 * call site, and it is the exact failure that produces two first messages.
 */

export interface OwnershipOutcome {
  readonly owner: ConversationOwner;
  readonly mayCompose: boolean;
  readonly reasonCodes: readonly string[];
  readonly detail: string;
  readonly pauseVerified: boolean | null;
}

export async function resolveAcceptanceOwnership(
  context: AppContext,
  conversationContext: ConversationContext,
  lemlistContactId: string,
): Promise<OwnershipOutcome> {
  const upcomingSteps = conversationContext.steps.filter((step) => !step.completed);

  const stepClasses = new Map<string, SequenceStepClass>(
    upcomingSteps.map((step) => [stepKey(step), classifySequenceStep(step)]),
  );

  const decision = decideAcceptanceOwnership({
    upcomingSteps,
    stepClasses,
    branchingUnresolved: conversationContext.branchingUnresolved,
    pendingTasks: conversationContext.pendingTasks,
  });

  if (decision.kind === 'LEAVE_TO_SEQUENCE') {
    return {
      owner: 'LEMLIST_SEQUENCE',
      mayCompose: false,
      reasonCodes: decision.reasonCodes,
      detail: decision.detail,
      pauseVerified: null,
    };
  }

  if (decision.kind === 'REVIEW_REQUIRED') {
    return {
      owner: 'UNKNOWN',
      mayCompose: false,
      reasonCodes: decision.reasonCodes,
      detail: decision.detail,
      pauseVerified: null,
    };
  }

  // ACQUIRE_OWNERSHIP: pause, verify the pause, verify nothing moved, and only
  // then claim ownership. Each of these can fail, and each failure means "do
  // not send", never "probably fine".
  const lead = conversationContext.lead;
  const campaignId = conversationContext.campaignId;

  if (!lead || !campaignId) {
    return {
      owner: 'UNKNOWN',
      mayCompose: false,
      reasonCodes: [REASON_CODES.MISSING_LEAD_OR_CAMPAIGN],
      detail: 'Cannot pause a lead without both a lead id and a campaign id.',
      pauseVerified: null,
    };
  }

  const hashBefore = conversationContext.conversation.conversationHash;

  let pauseCallSucceeded = false;
  try {
    await context.lemlist.pauseLeadInCampaign(campaignId, lead.id);
    pauseCallSucceeded = true;
  } catch (error) {
    context.logger.warn('pause call failed, refusing to take ownership', {
      campaignId,
      leadId: lead.id,
      error,
    });
  }

  const refetchedIsPaused = pauseCallSucceeded
    ? await context.lemlist.isLeadPaused(campaignId, lead.id)
    : null;

  const fresh = await refetchFreshness(
    context,
    lemlistContactId,
    conversationContext.ownAddresses,
  );

  const verification = verifyOwnershipTransfer({
    pauseCallSucceeded,
    refetchedIsPaused,
    conversationUnchanged: fresh.conversationHash === hashBefore,
  });

  if (!verification.ok) {
    return {
      owner: 'UNKNOWN',
      mayCompose: false,
      reasonCodes: [verification.reasonCode],
      detail: verification.detail,
      pauseVerified: refetchedIsPaused,
    };
  }

  return {
    owner: 'ASTRA_AGENT',
    mayCompose: true,
    reasonCodes: [REASON_CODES.OWNERSHIP_ACQUIRED],
    detail: decision.detail,
    pauseVerified: true,
  };
}

/**
 * Ownership for a reply event.
 *
 * Lemlist normally stops a sequence once a lead replies, but "normally" is not
 * a guarantee we can act on, so the lead state and pending tasks are checked
 * anyway. Where a future send remains possible, the lead is paused first.
 */
export async function resolveReplyOwnership(
  context: AppContext,
  conversationContext: ConversationContext,
  currentOwner: ConversationOwner,
): Promise<OwnershipOutcome> {
  if (currentOwner === 'HUMAN' || currentOwner === 'SUPPRESSED') {
    return {
      owner: currentOwner,
      mayCompose: false,
      reasonCodes: [REASON_CODES.OWNER_NOT_ASTRA],
      detail: `Conversation is already owned by ${currentOwner}.`,
      pauseVerified: null,
    };
  }

  const blockingTasks = conversationContext.pendingTasks;
  if (blockingTasks.length > 0) {
    return {
      owner: 'UNKNOWN',
      mayCompose: false,
      reasonCodes: [REASON_CODES.PENDING_MANUAL_TASK],
      detail: `A manual task is still open for this lead (${blockingTasks
        .map((task) => task.type)
        .join(', ')}). A task created earlier stays relevant even when the campaign is paused.`,
      pauseVerified: null,
    };
  }

  const lead = conversationContext.lead;
  const campaignId = conversationContext.campaignId;

  // Already paused: no collision is possible, so ownership transfers without
  // another write.
  if (lead?.isPaused === true) {
    return {
      owner: 'ASTRA_AGENT',
      mayCompose: true,
      reasonCodes: [REASON_CODES.OWNERSHIP_ACQUIRED],
      detail: 'The lead is already paused in its campaign.',
      pauseVerified: true,
    };
  }

  if (!lead || !campaignId) {
    // Without identifiers we cannot prove the campaign will stay quiet.
    return {
      owner: 'UNKNOWN',
      mayCompose: false,
      reasonCodes: [REASON_CODES.MISSING_LEAD_OR_CAMPAIGN],
      detail: 'No lead or campaign id, so a future sequence send cannot be ruled out.',
      pauseVerified: null,
    };
  }

  const remainingSteps = conversationContext.steps.filter((step) => !step.completed);
  if (remainingSteps.length === 0 && !conversationContext.branchingUnresolved) {
    return {
      owner: 'ASTRA_AGENT',
      mayCompose: true,
      reasonCodes: [REASON_CODES.OWNERSHIP_ACQUIRED],
      detail: 'No further sequence steps are scheduled for this lead.',
      pauseVerified: null,
    };
  }

  return resolveAcceptanceOwnership(
    context,
    conversationContext,
    conversationContext.conversation.contactId,
  );
}
