import type { RawActivity, SequenceStep, PendingManualTask } from '@astra/core';

/**
 * Lemlist API shapes, as documented at developer.lemlist.com and verified on
 * 2026-08-11. Field names mirror the API exactly, including the `_id`
 * convention, so a response can be compared to the docs without translation.
 */

export interface LemlistLead {
  readonly _id: string;
  readonly email?: string;
  readonly firstName?: string;
  readonly lastName?: string;
  readonly companyName?: string;
  readonly companyDomain?: string;
  readonly linkedinUrl?: string;
  readonly contactId?: string;
  readonly campaignId?: string;
  /** Present on lead-in-campaign records. The pause verification reads this. */
  readonly isPaused?: boolean;
  readonly state?: string;
}

export interface LemlistCampaign {
  readonly _id: string;
  readonly name?: string;
  readonly status?: string;
  readonly labels?: readonly string[];
}

/** One step inside a sequence. `_id` is stable across reordering; `index` is not. */
export interface LemlistSequenceStep {
  readonly _id?: string;
  readonly type: string;
  readonly delay?: number;
  readonly subject?: string;
  readonly message?: string;
  readonly index?: number;
  readonly sequenceStep?: number;
  readonly sequenceId?: string;
  readonly emailTemplateId?: string;
}

/**
 * A campaign returns its main sequence plus every conditional sub-sequence.
 * `level > 0` or a `parentId` means the sequence is only reachable when a
 * condition holds, which is what makes branching resolution necessary.
 */
export interface LemlistSequence {
  readonly _id: string;
  readonly steps: readonly LemlistSequenceStep[];
  readonly level?: number;
  readonly parentId?: string;
  readonly conditionalStepIndex?: number;
}

export interface LemlistActivity {
  readonly _id: string;
  readonly type: string;
  readonly createdAt?: string;
  readonly teamId?: string;
  readonly leadId?: string;
  readonly campaignId?: string;
  readonly contactId?: string;
  readonly sequenceId?: string;
  readonly sequenceStep?: number;
  readonly stepId?: string;
  readonly sendUserId?: string;
  readonly sendUserName?: string;
  readonly sendUserEmail?: string;
  readonly leadEmail?: string;
  readonly messageId?: string;
  /** HTML for email, plain text for LinkedIn. */
  readonly message?: string;
  readonly text?: string;
  readonly subject?: string;
  readonly cc?: readonly string[] | string;
  readonly isDraft?: boolean;
  readonly attachments?: ReadonlyArray<{
    readonly name?: string;
    readonly size?: number;
    readonly type?: string;
    readonly url?: string;
  }>;
}

export interface LemlistInboxPage {
  readonly messages?: readonly LemlistActivity[];
  readonly data?: readonly LemlistActivity[];
  readonly totalItems?: number;
  readonly currentPage?: number;
  readonly nextPage?: number | null;
  readonly perPage?: number;
  readonly totalPages?: number;
}

export interface LemlistTask {
  readonly _id: string;
  readonly type: string;
  readonly leadId?: string;
  readonly campaignId?: string;
  readonly contactId?: string;
  readonly userId?: string;
  readonly status?: string;
  readonly dueDate?: string;
  readonly title?: string;
  readonly content?: string;
  readonly priority?: string;
}

// --- adapter interface -------------------------------------------------------

export interface SendLinkedInMessageInput {
  readonly sendUserId: string;
  readonly leadId: string;
  readonly contactId: string;
  readonly message: string;
}

export interface SendEmailReplyInput {
  readonly sendUserId: string;
  readonly sendUserEmail: string;
  readonly sendUserMailboxId: string;
  readonly message: string;
  /**
   * The exact inbound activity id. The API also accepts the string "latest",
   * which this system never uses: "latest" silently becomes a standalone
   * email when the contact has no prior email, and it is ambiguous under
   * concurrency.
   */
  readonly replyToActivityId: string;
  readonly contactId?: string;
  readonly leadId?: string;
  readonly subject?: string;
  readonly cc?: readonly string[];
}

export interface CreateDraftInput {
  readonly contactId: string;
  readonly draftOwner: string;
  readonly channel: 'email' | 'linkedin';
  readonly content: string;
  readonly subject?: string;
  readonly replyToActivityId?: string;
}

export interface RegisterWebhookInput {
  readonly targetUrl: string;
  readonly type: string;
  readonly secret: string;
  readonly campaignId?: string;
}

export interface LemlistClient {
  getLead(leadId: string): Promise<LemlistLead | null>;
  getLeadByEmail(email: string): Promise<LemlistLead | null>;
  getCampaign(campaignId: string): Promise<LemlistCampaign | null>;
  getCampaignSequences(campaignId: string): Promise<readonly LemlistSequence[]>;
  /** Follows pagination to completion. A partial conversation is not returned. */
  getAllContactMessages(contactId: string): Promise<readonly LemlistActivity[]>;
  getPendingTasks(filter?: { campaignId?: string }): Promise<readonly LemlistTask[]>;
  pauseLeadInCampaign(campaignId: string, leadId: string): Promise<void>;
  /** Refetches the lead so the pause can be observed rather than assumed. */
  isLeadPaused(campaignId: string, leadId: string): Promise<boolean | null>;
  createDraft(input: CreateDraftInput): Promise<{ draftId: string }>;
  sendLinkedInMessage(input: SendLinkedInMessageInput): Promise<{ ok: boolean }>;
  sendEmailReply(input: SendEmailReplyInput): Promise<{ ok: boolean; activityId?: string }>;
  registerWebhook(input: RegisterWebhookInput): Promise<{ _id: string }>;
  addUnsubscribe(email: string): Promise<void>;
  /**
   * One page of a contact list. The caller owns paging, because offset windows
   * on this endpoint have been observed overlapping and reordering: only the
   * returned stable IDs are trustworthy, never the offset arithmetic.
   */
  searchContacts(input: SearchContactsInput): Promise<readonly LemlistContact[]>;
  /**
   * Import leads into a campaign. `columnMapping` maps CSV headers to Lemlist
   * custom variable names and is passed through verbatim; renaming a mapped
   * variable silently breaks `{{connectionMessage}}` rendering.
   */
  importLeadsToCampaign(input: ImportLeadsInput): Promise<ImportLeadsResult>;
}

export interface SearchContactsInput {
  readonly listId: string;
  readonly limit: number;
  readonly offset: number;
}

export interface LemlistContact {
  readonly _id: string;
  readonly companyId?: string;
  readonly firstName?: string;
  readonly lastName?: string;
  readonly email?: string;
  readonly linkedinUrl?: string;
  readonly companyName?: string;
  readonly companyDomain?: string;
  /** Free-text hints: summary, tagline, jobDescription. Often the only source. */
  readonly hints?: Readonly<Record<string, string>>;
}

export interface ImportLeadsRow {
  readonly email?: string;
  readonly linkedinUrl?: string;
  readonly firstName?: string;
  readonly lastName?: string;
  readonly companyName?: string;
  readonly variables: Readonly<Record<string, string>>;
}

export interface ImportLeadsInput {
  readonly campaignId: string;
  readonly rows: readonly ImportLeadsRow[];
  readonly columnMapping: Readonly<Record<string, string>>;
  readonly idempotencyKey: string;
}

export interface ImportLeadsResult {
  readonly imported: number;
  readonly leadIds: readonly string[];
  /**
   * Set when a platform safety classifier refused the call. The caller must
   * surface it rather than substituting a different operation.
   */
  readonly policyBlocked?: string;
}

/** Convert a Lemlist activity into the channel-agnostic shape the core normalizer expects. */
export function toRawActivity(activity: LemlistActivity): RawActivity {
  const isEmail = /email/i.test(activity.type) || activity.subject !== undefined;
  const isLinkedIn = /linkedin/i.test(activity.type);

  return {
    id: activity._id,
    type: activity.type,
    channel: isLinkedIn ? 'linkedin' : isEmail ? 'email' : undefined,
    createdAt: activity.createdAt,
    // Lemlist does not send an explicit direction flag on inbox activities;
    // the normalizer derives it from the type and the known sender address.
    sender: activity.sendUserEmail ?? undefined,
    to: activity.leadEmail ?? undefined,
    cc: activity.cc as string | string[] | undefined,
    subject: activity.subject,
    html: isEmail ? activity.message : undefined,
    text: isEmail ? activity.text : (activity.message ?? activity.text),
    campaignId: activity.campaignId,
    leadId: activity.leadId,
    contactId: activity.contactId,
    sequenceId: activity.sequenceId,
    stepId: activity.stepId,
    sequenceStep: activity.sequenceStep,
    isDraft: activity.isDraft,
    attachments: activity.attachments?.map((attachment) => ({
      name: attachment.name,
      size: attachment.size,
      contentType: attachment.type,
    })),
  };
}

export function toSequenceSteps(
  sequences: readonly LemlistSequence[],
  completedStepIds: ReadonlySet<string>,
): { steps: SequenceStep[]; branchingUnresolved: boolean } {
  // A campaign with conditional sub-sequences cannot be resolved from the
  // sequence tree alone: which branch this lead takes depends on runtime
  // state the API does not expose here. That is reported, not guessed.
  const branchingUnresolved = sequences.some(
    (sequence) => (sequence.level ?? 0) > 0 || sequence.parentId !== undefined,
  );

  const steps: SequenceStep[] = [];
  for (const sequence of sequences) {
    if ((sequence.level ?? 0) > 0) continue;
    for (const step of sequence.steps) {
      const id = step._id ?? null;
      steps.push({
        id,
        position: step.index ?? step.sequenceStep ?? steps.length,
        type: step.type,
        channel: /linkedin/i.test(step.type) ? 'linkedin' : /email/i.test(step.type) ? 'email' : null,
        content: step.message ?? '',
        completed: id !== null && completedStepIds.has(id),
        conditional: /condition/i.test(step.type),
      });
    }
  }
  steps.sort((a, b) => a.position - b.position);
  return { steps, branchingUnresolved };
}

export function toPendingTask(task: LemlistTask): PendingManualTask {
  return {
    id: task._id,
    type: task.type,
    leadId: task.leadId ?? null,
    contactId: task.contactId ?? null,
    campaignId: task.campaignId ?? null,
    description: task.title ?? task.content ?? '',
    dueAt: task.dueDate ? new Date(task.dueDate) : null,
  };
}
