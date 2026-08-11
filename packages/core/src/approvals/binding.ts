import type { ApprovalStatus } from '../domain/enums.js';
import { REASON_CODES, type ReasonCode } from '../domain/reason-codes.js';
import { structuralHash } from '../text/hash.js';

/**
 * Approval semantics.
 *
 * An approval authorizes one exact version of one exact action in one exact
 * conversation state. It is not a standing permission, and it cannot be
 * transferred to a revised message, a rebuilt prototype, or a conversation
 * that has moved on. Everything the approval is bound to is hashed into a
 * single binding key so a mismatch is impossible to overlook.
 */

export type ApprovalActionType =
  | 'SEND_MESSAGE'
  | 'SEND_PROTOTYPE_LINK'
  | 'PROPOSE_SLOTS'
  | 'BOOK_MEETING';

export interface ApprovalBinding {
  readonly operatorEmail: string;
  readonly actionType: ApprovalActionType;
  readonly conversationId: string;
  readonly contactId: string;
  readonly sourceLatestInboundMessageId: string | null;
  readonly conversationHash: string;
  readonly replyContentHash: string;
  /** Present only for prototype delivery approvals. */
  readonly prototypeVersionId: string | null;
  readonly prototypeContentHash: string | null;
  readonly prototypeDeployHash: string | null;
  readonly policyVersion: string;
  readonly promptVersion: string;
  readonly expiresAt: Date;
}

export function approvalBindingKey(binding: ApprovalBinding): string {
  return structuralHash({
    actionType: binding.actionType,
    conversationId: binding.conversationId,
    contactId: binding.contactId,
    sourceLatestInboundMessageId: binding.sourceLatestInboundMessageId,
    conversationHash: binding.conversationHash,
    replyContentHash: binding.replyContentHash,
    prototypeVersionId: binding.prototypeVersionId,
    prototypeContentHash: binding.prototypeContentHash,
    prototypeDeployHash: binding.prototypeDeployHash,
    policyVersion: binding.policyVersion,
    promptVersion: binding.promptVersion,
  });
}

export interface CurrentStateSnapshot {
  readonly conversationHash: string;
  readonly latestInboundMessageId: string | null;
  readonly replyContentHash: string;
  readonly prototypeVersionId: string | null;
  readonly prototypeContentHash: string | null;
  readonly prototypeDeployHash: string | null;
}

export type ApprovalValidity =
  | { readonly usable: true }
  | { readonly usable: false; readonly status: ApprovalStatus; readonly reasonCode: ReasonCode; readonly detail: string };

/**
 * Re-check an approval against live state. Called twice: when rendering the
 * dashboard (so a stale approval cannot even be clicked) and again
 * immediately before the send.
 */
export function evaluateApproval(
  binding: ApprovalBinding,
  status: ApprovalStatus,
  current: CurrentStateSnapshot,
  now: Date,
): ApprovalValidity {
  if (status !== 'APPROVED') {
    return {
      usable: false,
      status,
      reasonCode: REASON_CODES.APPROVAL_MISSING,
      detail: `Approval status is ${status}.`,
    };
  }
  if (now >= binding.expiresAt) {
    return {
      usable: false,
      status: 'EXPIRED',
      reasonCode: REASON_CODES.APPROVAL_EXPIRED,
      detail: `Approval expired at ${binding.expiresAt.toISOString()}.`,
    };
  }
  if (current.latestInboundMessageId !== binding.sourceLatestInboundMessageId) {
    return {
      usable: false,
      status: 'STALE',
      reasonCode: REASON_CODES.STALE_INBOUND_MESSAGE_ID,
      detail: 'A new inbound message arrived after this approval was granted.',
    };
  }
  if (current.conversationHash !== binding.conversationHash) {
    return {
      usable: false,
      status: 'STALE',
      reasonCode: REASON_CODES.STALE_CONVERSATION_HASH,
      detail: 'The conversation changed after this approval was granted.',
    };
  }
  if (current.replyContentHash !== binding.replyContentHash) {
    return {
      usable: false,
      status: 'STALE',
      reasonCode: REASON_CODES.APPROVAL_HASH_MISMATCH,
      detail: 'The reply text changed after this approval was granted.',
    };
  }
  if (binding.actionType === 'SEND_PROTOTYPE_LINK') {
    if (
      current.prototypeVersionId !== binding.prototypeVersionId ||
      current.prototypeContentHash !== binding.prototypeContentHash ||
      current.prototypeDeployHash !== binding.prototypeDeployHash
    ) {
      return {
        usable: false,
        status: 'STALE',
        reasonCode: REASON_CODES.APPROVAL_HASH_MISMATCH,
        detail: 'The prototype was rebuilt or redeployed after this approval was granted.',
      };
    }
  }
  return { usable: true };
}

/**
 * A revision supersedes the prior approval rather than amending it. Returning
 * the explicit new status keeps "approve then edit then send" impossible.
 */
export function statusAfterRevision(): ApprovalStatus {
  return 'SUPERSEDED';
}

export function statusAfterTakeover(): ApprovalStatus {
  return 'SUPERSEDED';
}
