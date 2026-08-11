import type { AppConfig } from '../config/env.js';
import type { Channel, LowRiskCase } from '../domain/enums.js';
import { REASON_CODES, type ReasonCode } from '../domain/reason-codes.js';
import { checkOutboundContent } from '../text/content-checks.js';
import { contentHash, outboundIdempotencyKey } from '../text/hash.js';
import { LOW_RISK_CASE_SPECS } from './engine.js';
import { POLICY_VERSION, type PredicateResult, type SendIdentifiers } from './types.js';

/**
 * The last gate before an external call.
 *
 * This runs on *every* send, including one a human already approved, and it
 * re-derives its verdict from the text that is actually about to leave the
 * process. Approval authorizes an exact string; this function proves the
 * string did not change on the way to the wire.
 */

export interface PreSendInput {
  readonly config: AppConfig;
  readonly now: Date;
  readonly channel: Channel;
  readonly text: string;
  /** Hash captured when the policy engine or the operator approved this text. */
  readonly authorizedContentHash: string;
  readonly lowRiskCase: LowRiskCase | null;
  /** Overrides the case word cap for approved (non-allowlisted) sends. */
  readonly maxWords: number;
  readonly allowUrls: boolean;
  readonly allowedUrls: readonly string[];
  readonly recentOutboundTexts: readonly string[];
  readonly supportedClaimTerms: readonly string[];
  readonly sendIdentifiers: SendIdentifiers;
  readonly contactId: string;
  /** Refetched immediately before this call, not carried from analysis. */
  readonly freshConversationHash: string;
  readonly expectedConversationHash: string;
  readonly freshLatestInboundMessageId: string | null;
  readonly expectedLatestInboundMessageId: string | null;
  /** True when this send is executing an operator approval. */
  readonly isApprovedSend: boolean;
  readonly approvalStatus?: 'PENDING' | 'APPROVED' | 'STALE' | 'EXPIRED' | 'REJECTED' | undefined;
}

export type PreSendVerdict =
  | {
      readonly allow: true;
      readonly idempotencyKey: string;
      readonly contentHash: string;
      readonly predicates: readonly PredicateResult[];
      readonly policyVersion: string;
    }
  | {
      readonly allow: false;
      readonly reasonCodes: readonly ReasonCode[];
      readonly predicates: readonly PredicateResult[];
      readonly policyVersion: string;
    };

export function preSendCheck(input: PreSendInput): PreSendVerdict {
  const predicates: PredicateResult[] = [];
  const failures: ReasonCode[] = [];

  const require = (id: string, passed: boolean, code: ReasonCode, detail: string): void => {
    predicates.push({ id, passed, reasonCode: passed ? null : code, detail });
    if (!passed && !failures.includes(code)) failures.push(code);
  };

  const actualHash = contentHash(input.text);

  require(
    'kill_switch_off',
    !input.config.isKillSwitchOn,
    REASON_CODES.KILL_SWITCH_ON,
    'The global kill switch blocks every external write.',
  );

  // An approved send is permitted in DRAFT_ONLY only as a draft; an actual
  // send always needs the live flag plus a mode that allows sending.
  require(
    'send_permitted_by_mode',
    input.isApprovedSend
      ? !input.config.isKillSwitchOn &&
          input.config.ALLOW_LIVE_LEMLIST_SEND &&
          (input.config.RUNTIME_MODE === 'LOW_RISK_AUTO' || input.config.RUNTIME_MODE === 'DRAFT_ONLY')
      : input.config.canAutoSend,
    REASON_CODES.MODE_DISALLOWS_SEND,
    `Runtime mode ${input.config.RUNTIME_MODE} with ALLOW_LIVE_LEMLIST_SEND=${input.config.ALLOW_LIVE_LEMLIST_SEND}.`,
  );

  require(
    'content_hash_matches_authorization',
    actualHash === input.authorizedContentHash,
    REASON_CODES.CONTENT_HASH_MISMATCH,
    'The text about to be sent differs from the text that was authorized.',
  );

  require(
    'conversation_hash_fresh',
    input.freshConversationHash === input.expectedConversationHash,
    REASON_CODES.STALE_CONVERSATION_HASH,
    'The conversation changed between authorization and send.',
  );

  require(
    'latest_inbound_fresh',
    input.freshLatestInboundMessageId === input.expectedLatestInboundMessageId,
    REASON_CODES.STALE_INBOUND_MESSAGE_ID,
    'A new inbound message arrived between authorization and send.',
  );

  if (input.isApprovedSend) {
    require(
      'approval_is_approved',
      input.approvalStatus === 'APPROVED',
      input.approvalStatus === 'STALE'
        ? REASON_CODES.STALE_APPROVAL
        : input.approvalStatus === 'EXPIRED'
          ? REASON_CODES.APPROVAL_EXPIRED
          : REASON_CODES.APPROVAL_MISSING,
      `Approval status is ${input.approvalStatus ?? 'missing'}.`,
    );
  }

  if (input.channel === 'email') {
    require(
      'reply_to_activity_id_present',
      input.sendIdentifiers.replyToActivityId !== null &&
        input.sendIdentifiers.replyToActivityId.length > 0 &&
        input.sendIdentifiers.replyToActivityId !== 'latest',
      REASON_CODES.MISSING_REPLY_TO_ACTIVITY_ID,
      'Email replies must reference the exact inbound activity id.',
    );
  } else {
    require(
      'linkedin_identifiers_present',
      input.sendIdentifiers.leadId !== null &&
        input.sendIdentifiers.contactId !== null &&
        input.sendIdentifiers.sendUserId !== null,
      REASON_CODES.MISSING_SEND_IDENTIFIERS,
      'LinkedIn sends require leadId, contactId and sendUserId.',
    );
  }

  const caseSpec = input.lowRiskCase ? LOW_RISK_CASE_SPECS[input.lowRiskCase] : null;
  const contentResult = checkOutboundContent(input.text, {
    maxWords: caseSpec?.maxWords ?? input.maxWords,
    allowUrls: input.allowUrls,
    allowedUrls: input.allowedUrls,
    recentOutboundTexts: input.recentOutboundTexts,
    supportedClaimTerms: input.supportedClaimTerms,
  });

  for (const violation of contentResult.violations) {
    if (violation.severity === 'BLOCK') {
      require(
        `content:${violation.code}`,
        false,
        violation.code,
        `${violation.detail}${violation.evidence ? `: ${violation.evidence}` : ''}`,
      );
    }
  }

  if (failures.length > 0) {
    return { allow: false, reasonCodes: failures, predicates, policyVersion: POLICY_VERSION };
  }

  return {
    allow: true,
    contentHash: actualHash,
    idempotencyKey: outboundIdempotencyKey({
      contactId: input.contactId,
      latestInboundActivityId: input.freshLatestInboundMessageId,
      actionType: input.lowRiskCase ?? 'APPROVED_SEND',
      contentHash: actualHash,
    }),
    predicates,
    policyVersion: POLICY_VERSION,
  };
}
