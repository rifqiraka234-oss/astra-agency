import {
  filterTasksForLead,
  normalizeConversation,
  type NormalizedConversation,
  type PendingManualTask,
  type SequenceStep,
} from '@astra/core';
import { toPendingTask, toRawActivity, toSequenceSteps } from '@astra/integrations';
import type { AppContext } from '../context.js';

/**
 * Source-of-truth refetch.
 *
 * Called at the start of every processing run and again immediately before
 * any external write. Nothing here reasons from the webhook body: the webhook
 * tells us *that* something happened, the API tells us *what* the
 * conversation now looks like, and only the second one is safe to act on.
 */

export interface ConversationContext {
  readonly conversation: NormalizedConversation;
  readonly lead: { id: string; campaignId: string | null; isPaused: boolean | null } | null;
  readonly campaignId: string | null;
  readonly campaignName: string | null;
  readonly steps: readonly SequenceStep[];
  readonly branchingUnresolved: boolean;
  readonly pendingTasks: readonly PendingManualTask[];
  readonly ownAddresses: readonly string[];
}

export async function fetchConversationContext(
  context: AppContext,
  input: {
    lemlistContactId: string;
    leadId: string | null;
    campaignId: string | null;
  },
): Promise<ConversationContext> {
  const activities = await context.lemlist.getAllContactMessages(input.lemlistContactId);

  // Our own sending addresses come from the activities themselves, which is
  // what lets the normalizer resolve direction when Lemlist does not state it.
  const ownAddresses = [
    ...new Set(
      activities
        .map((activity) => activity.sendUserEmail)
        .filter((email): email is string => typeof email === 'string' && email.length > 0),
    ),
  ];

  const conversation = normalizeConversation(activities.map(toRawActivity), {
    contactId: input.lemlistContactId,
    ownAddresses,
  });

  // Prefer identifiers the API actually returned over anything the webhook
  // claimed, since a webhook can be replayed long after the fact.
  const campaignId =
    input.campaignId ??
    activities.find((activity) => activity.campaignId)?.campaignId ??
    null;
  const leadId =
    input.leadId ?? activities.find((activity) => activity.leadId)?.leadId ?? null;

  const lead = leadId ? await context.lemlist.getLead(leadId) : null;
  const campaign = campaignId ? await context.lemlist.getCampaign(campaignId) : null;

  let steps: readonly SequenceStep[] = [];
  let branchingUnresolved = false;
  if (campaignId) {
    const sequences = await context.lemlist.getCampaignSequences(campaignId);
    const completedStepIds = new Set(
      activities
        .map((activity) => activity.stepId)
        .filter((stepId): stepId is string => typeof stepId === 'string'),
    );
    const converted = toSequenceSteps(sequences, completedStepIds);
    steps = converted.steps;
    branchingUnresolved = converted.branchingUnresolved;
  }

  // The tasks endpoint is team wide, so filtering happens locally. A task
  // carrying no identifiers is kept rather than assumed to be unrelated.
  const allTasks = await context.lemlist.getPendingTasks(
    campaignId ? { campaignId } : {},
  );
  const pendingTasks = filterTasksForLead(allTasks.map(toPendingTask), {
    leadId,
    contactId: input.lemlistContactId,
    campaignId,
  });

  return {
    conversation,
    lead: lead
      ? {
          id: lead._id,
          campaignId: lead.campaignId ?? campaignId,
          isPaused: typeof lead.isPaused === 'boolean' ? lead.isPaused : null,
        }
      : null,
    campaignId,
    campaignName: campaign?.name ?? null,
    steps,
    branchingUnresolved,
    pendingTasks,
    ownAddresses,
  };
}

/**
 * Freshness re-check performed immediately before an external write. Returns
 * the current conversation so the caller compares against what it decided on
 * rather than trusting a value it captured minutes ago.
 */
export async function refetchFreshness(
  context: AppContext,
  lemlistContactId: string,
  ownAddresses: readonly string[],
): Promise<{ conversationHash: string; latestInboundMessageId: string | null }> {
  const activities = await context.lemlist.getAllContactMessages(lemlistContactId);
  const conversation = normalizeConversation(activities.map(toRawActivity), {
    contactId: lemlistContactId,
    ownAddresses,
  });
  return {
    conversationHash: conversation.conversationHash,
    latestInboundMessageId: conversation.latestInboundMessageId,
  };
}
