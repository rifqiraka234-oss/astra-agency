import type { AppConfig } from '../config/env.js';
import type {
  ControllerAction,
  ConversationOwner,
  ExclusionScope,
  LowRiskCase,
} from '../domain/enums.js';
import type { ReasonCode } from '../domain/reason-codes.js';
import type { ClaudeDecision } from '../schemas/decision.js';
import type { NormalizedConversation } from '../conversation/types.js';
import type { PendingManualTask } from '../ownership/sequence.js';

/** The policy version stamped onto every decision and approval record. */
export const POLICY_VERSION = '2026-08-11.1';

export interface Exclusion {
  readonly scope: ExclusionScope;
  /** Null for GLOBAL. */
  readonly targetId: string | null;
  readonly reason: string;
  readonly active: boolean;
}

export interface FreshnessCheck {
  readonly expectedConversationHash: string;
  readonly actualConversationHash: string;
  readonly expectedLatestInboundMessageId: string | null;
  readonly actualLatestInboundMessageId: string | null;
}

export interface AvailabilityContext {
  /** When the live free/busy query returned. */
  readonly queriedAt: Date;
  readonly querySucceeded: boolean;
  /** True when internal reservations are held for every offered slot. */
  readonly reservationsHeld: boolean;
}

export interface SendIdentifiers {
  readonly leadId: string | null;
  readonly contactId: string | null;
  readonly sendUserId: string | null;
  /** Required for an email reply. `latest` is never acceptable. */
  readonly replyToActivityId: string | null;
}

export interface PolicyInput {
  readonly config: AppConfig;
  readonly now: Date;
  readonly decision: ClaudeDecision;
  readonly conversation: NormalizedConversation;
  readonly owner: ConversationOwner;
  readonly campaignId: string | null;
  readonly contactId: string;
  readonly leadId: string | null;
  readonly exclusions: readonly Exclusion[];
  readonly pendingTasks: readonly PendingManualTask[];
  /** How many messages this system has already sent automatically here. */
  readonly automatedOutboundCount: number;
  /** True when the model context had to drop turns. */
  readonly contextTruncated: boolean;
  readonly freshness: FreshnessCheck;
  readonly meetingScheduled: boolean;
  /** True when a stored concept brief exists for a "we sketched" claim. */
  readonly hasStoredConceptBrief: boolean;
  /** True when the company website and identity were verified unambiguously. */
  readonly companyIdentityVerified: boolean;
  readonly availability?: AvailabilityContext | undefined;
  readonly sendIdentifiers: SendIdentifiers;
  readonly recentOutboundTexts: readonly string[];
  /** Claim terms the evidence table actually supports. */
  readonly supportedClaimTerms: readonly string[];
  /** URLs an approval has explicitly authorized for this exact message. */
  readonly approvedUrls?: readonly string[] | undefined;
  /** True when the inbound event was a third-party email reply. */
  readonly isThirdPartyReply: boolean;
}

export interface PredicateResult {
  readonly id: string;
  readonly passed: boolean;
  readonly reasonCode: ReasonCode | null;
  readonly detail: string;
}

export interface PolicyDecision {
  readonly action: ControllerAction;
  readonly lowRiskCase: LowRiskCase | null;
  readonly maxWords: number | null;
  readonly predicates: readonly PredicateResult[];
  readonly reasonCodes: readonly ReasonCode[];
  readonly detail: string;
  readonly policyVersion: string;
  readonly nextOwner: ConversationOwner | null;
}
