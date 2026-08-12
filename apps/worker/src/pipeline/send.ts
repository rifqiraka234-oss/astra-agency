import {
  contentHash,
  preSendCheck,
  type AppConfig,
  type Channel,
  type LowRiskCase,
} from '@astra/core';
import {
  createOutboundIntent,
  getPool,
  incrementAutomatedOutbound,
  markOutboundResult,
  recordAudit,
  type Sql,
} from '@astra/db';
import { ExternalWriteBlockedError } from '@astra/integrations';
import type { AppContext } from '../context.js';
import { refetchFreshness } from './fetch-context.js';
import { METRIC_NAMES, increment } from '../metrics.js';

/**
 * Executing a send.
 *
 * The order is deliberate and is the whole safety story of this file:
 *
 *   1. refetch the conversation,
 *   2. run the deterministic pre-send gate against the *actual* text,
 *   3. write a durable intent row keyed by an idempotency key,
 *   4. only then call the provider,
 *   5. record the outcome.
 *
 * A send that times out is recorded as UNKNOWN and never blindly retried. The
 * next run refetches the conversation to find out whether the message
 * actually went out, because a duplicate outbound message is a worse failure
 * than a missing one.
 */

export interface SendRequest {
  readonly conversationId: string;
  readonly lemlistContactId: string;
  readonly channel: Channel;
  readonly text: string;
  readonly lowRiskCase: LowRiskCase | null;
  readonly maxWords: number;
  readonly allowUrls: boolean;
  readonly allowedUrls: readonly string[];
  readonly recentOutboundTexts: readonly string[];
  readonly supportedClaimTerms: readonly string[];
  readonly expectedConversationHash: string;
  readonly expectedLatestInboundMessageId: string | null;
  readonly ownAddresses: readonly string[];
  readonly leadId: string | null;
  readonly sendUserId: string | null;
  readonly sendUserEmail: string | null;
  readonly sendUserMailboxId: string | null;
  readonly replyToActivityId: string | null;
  readonly decisionId?: string | null;
  readonly approvalId?: string | null;
  readonly isApprovedSend: boolean;
  readonly approvalStatus?: 'PENDING' | 'APPROVED' | 'STALE' | 'EXPIRED' | 'REJECTED';
  readonly correlationId: string;
}

export type SendOutcome =
  | { readonly status: 'SENT'; readonly intentId: string; readonly providerMessageId: string | null }
  | { readonly status: 'BLOCKED'; readonly reasonCodes: readonly string[] }
  | { readonly status: 'DUPLICATE'; readonly intentId: string }
  | { readonly status: 'FAILED'; readonly intentId: string; readonly detail: string }
  | { readonly status: 'UNKNOWN'; readonly intentId: string; readonly detail: string };

export async function executeSend(
  context: AppContext,
  request: SendRequest,
  sql: Sql = getPool(),
): Promise<SendOutcome> {
  const config: AppConfig = context.config;

  // 1. Refetch. Nothing carried from the analysis is trusted at this point.
  const fresh = await refetchFreshness(context, request.lemlistContactId, request.ownAddresses);

  // 2. Deterministic gate, recomputed from the exact text about to be sent.
  const verdict = preSendCheck({
    config,
    now: new Date(),
    channel: request.channel,
    text: request.text,
    authorizedContentHash: contentHash(request.text),
    lowRiskCase: request.lowRiskCase,
    maxWords: request.maxWords,
    allowUrls: request.allowUrls,
    allowedUrls: request.allowedUrls,
    recentOutboundTexts: request.recentOutboundTexts,
    supportedClaimTerms: request.supportedClaimTerms,
    sendIdentifiers: {
      leadId: request.leadId,
      contactId: request.lemlistContactId,
      sendUserId: request.sendUserId,
      replyToActivityId: request.replyToActivityId,
    },
    contactId: request.lemlistContactId,
    freshConversationHash: fresh.conversationHash,
    expectedConversationHash: request.expectedConversationHash,
    freshLatestInboundMessageId: fresh.latestInboundMessageId,
    expectedLatestInboundMessageId: request.expectedLatestInboundMessageId,
    isApprovedSend: request.isApprovedSend,
    approvalStatus: request.approvalStatus,
  });

  if (!verdict.allow) {
    increment(METRIC_NAMES.blockedWrites, { reason: verdict.reasonCodes[0] ?? 'UNKNOWN' });
    await recordAudit(sql, {
      conversationId: request.conversationId,
      actor: 'controller',
      action: 'SEND_BLOCKED',
      reasonCode: verdict.reasonCodes[0] ?? null,
      payload: { reasonCodes: verdict.reasonCodes, predicates: verdict.predicates },
      correlationId: request.correlationId,
    });
    context.logger.warn('pre-send gate blocked a send', {
      conversationId: request.conversationId,
      reasonCodes: verdict.reasonCodes,
    });
    return { status: 'BLOCKED', reasonCodes: verdict.reasonCodes };
  }

  // 3. Durable intent before the call, so a crash mid-send is recoverable.
  const intent = await createOutboundIntent(sql, {
    conversationId: request.conversationId,
    decisionId: request.decisionId ?? null,
    approvalId: request.approvalId ?? null,
    channel: request.channel,
    actionType: request.lowRiskCase ?? 'APPROVED_SEND',
    bodyText: request.text,
    contentHash: verdict.contentHash,
    idempotencyKey: verdict.idempotencyKey,
    replyToActivityId: request.replyToActivityId,
    leadId: request.leadId,
    contactId: request.lemlistContactId,
    sendUserId: request.sendUserId,
    correlationId: request.correlationId,
  });

  if (!intent.created) {
    // This exact message, for this exact inbound state, was already attempted.
    context.logger.info('send collapsed on its idempotency key', {
      conversationId: request.conversationId,
      intentId: intent.id,
    });
    return { status: 'DUPLICATE', intentId: intent.id };
  }

  // 4. The provider call.
  try {
    if (request.channel === 'linkedin') {
      if (!request.leadId || !request.sendUserId) {
        throw new Error('LinkedIn send requires leadId and sendUserId');
      }
      await context.lemlist.sendLinkedInMessage({
        sendUserId: request.sendUserId,
        leadId: request.leadId,
        contactId: request.lemlistContactId,
        message: request.text,
      });
      await markOutboundResult(sql, intent.id, { status: 'SENT' });
    } else {
      if (!request.sendUserId || !request.sendUserEmail || !request.sendUserMailboxId) {
        throw new Error('Email send requires sendUserId, sendUserEmail and sendUserMailboxId');
      }
      if (!request.replyToActivityId) {
        throw new Error('Email send requires the exact inbound activity id');
      }
      const result = await context.lemlist.sendEmailReply({
        sendUserId: request.sendUserId,
        sendUserEmail: request.sendUserEmail,
        sendUserMailboxId: request.sendUserMailboxId,
        message: request.text,
        replyToActivityId: request.replyToActivityId,
        contactId: request.lemlistContactId,
        ...(request.leadId ? { leadId: request.leadId } : {}),
      });
      await markOutboundResult(sql, intent.id, {
        status: 'SENT',
        providerMessageId: result.activityId ?? null,
      });
    }

    await incrementAutomatedOutbound(sql, request.conversationId);
    increment(METRIC_NAMES.autoSends, { case: request.lowRiskCase ?? 'APPROVED_SEND' });
    await recordAudit(sql, {
      conversationId: request.conversationId,
      actor: request.isApprovedSend ? 'operator-approved' : 'controller',
      action: 'MESSAGE_SENT',
      payload: {
        channel: request.channel,
        lowRiskCase: request.lowRiskCase,
        contentHash: verdict.contentHash,
        wordCount: request.text.split(/\s+/).length,
      },
      correlationId: request.correlationId,
    });

    return { status: 'SENT', intentId: intent.id, providerMessageId: null };
  } catch (error) {
    const blocked = error instanceof ExternalWriteBlockedError;
    const timedOut = !blocked && isAmbiguousFailure(error);
    const detail = error instanceof Error ? error.message : String(error);

    await markOutboundResult(sql, intent.id, {
      // An ambiguous failure is UNKNOWN, not FAILED. The distinction is what
      // stops the next run from cheerfully sending the message a second time.
      status: blocked ? 'BLOCKED' : timedOut ? 'UNKNOWN' : 'FAILED',
      errorDetail: detail,
    });
    increment(METRIC_NAMES.integrationErrors, { integration: 'lemlist' });
    context.logger.error('send failed', {
      conversationId: request.conversationId,
      intentId: intent.id,
      ambiguous: timedOut,
      error,
    });

    if (blocked) return { status: 'BLOCKED', reasonCodes: [String(error.reasonCode)] };
    return timedOut
      ? { status: 'UNKNOWN', intentId: intent.id, detail }
      : { status: 'FAILED', intentId: intent.id, detail };
  }
}

/**
 * A timeout, an abort or a network failure leaves us unable to say whether the
 * provider acted. An HTTP status, by contrast, is a definite answer.
 */
function isAmbiguousFailure(error: unknown): boolean {
  if (typeof error !== 'object' || error === null) return false;
  if ('status' in error) return false;
  const name = 'name' in error ? String((error as { name: unknown }).name) : '';
  const message = 'message' in error ? String((error as { message: unknown }).message) : '';
  return (
    name === 'IntegrationNetworkError' ||
    name === 'AbortError' ||
    /timeout|aborted|socket hang up|ECONNRESET/i.test(message)
  );
}
