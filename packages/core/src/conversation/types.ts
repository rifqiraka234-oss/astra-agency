import type { Channel, MessageDirection, MessageKind } from '../domain/enums.js';

/**
 * The shape the Lemlist inbox and activity endpoints give us, reduced to the
 * fields the controller actually needs. Unknown fields are preserved in the
 * raw webhook/activity store, not here.
 */
export interface RawActivity {
  readonly id: string;
  readonly type?: string | undefined;
  readonly channel?: string | undefined;
  readonly createdAt?: string | undefined;
  readonly date?: string | undefined;
  readonly isFromLead?: boolean | undefined;
  readonly direction?: string | undefined;
  readonly subject?: string | undefined;
  readonly body?: string | undefined;
  readonly text?: string | undefined;
  readonly html?: string | undefined;
  readonly sender?: string | undefined;
  readonly from?: string | undefined;
  readonly to?: string | string[] | undefined;
  readonly cc?: string | string[] | undefined;
  readonly campaignId?: string | undefined;
  readonly leadId?: string | undefined;
  readonly contactId?: string | undefined;
  readonly sequenceId?: string | undefined;
  readonly stepId?: string | undefined;
  readonly sequenceStep?: number | undefined;
  readonly isDraft?: boolean | undefined;
  readonly attachments?: ReadonlyArray<{
    readonly name?: string | undefined;
    readonly size?: number | undefined;
    readonly contentType?: string | undefined;
  }> | undefined;
}

export interface AttachmentMetadata {
  readonly name: string;
  readonly sizeBytes: number | null;
  readonly contentType: string | null;
}

export interface NormalizedMessage {
  /** Lemlist activity id. The unit of idempotency for messages. */
  readonly externalId: string;
  readonly occurredAt: Date;
  readonly channel: Channel | 'unknown';
  readonly direction: MessageDirection;
  readonly kind: MessageKind;
  /** Sanitized plain text with quoted history removed. Model input. */
  readonly bodyText: string;
  /** Allowlist-sanitized HTML retained for the dashboard only. */
  readonly bodyHtmlSanitized: string | null;
  readonly subject: string | null;
  readonly sender: string | null;
  readonly recipients: readonly string[];
  readonly cc: readonly string[];
  readonly campaignId: string | null;
  readonly leadId: string | null;
  readonly contactId: string | null;
  readonly sequenceId: string | null;
  readonly stepId: string | null;
  readonly sequencePosition: number | null;
  readonly attachments: readonly AttachmentMetadata[];
  /** True when quoted history was detected and stripped from `bodyText`. */
  readonly hadQuotedHistory: boolean;
}

/**
 * Consecutive inbound fragments sent within a short window are one prospect
 * turn. Treating three rapid LinkedIn lines as three turns produces three
 * replies, which is the single most visible way an agent looks broken.
 */
export interface ConversationTurn {
  readonly turnIndex: number;
  readonly direction: MessageDirection;
  readonly startedAt: Date;
  readonly endedAt: Date;
  readonly messages: readonly NormalizedMessage[];
  /** Fragments joined with newlines, in order. */
  readonly text: string;
}

export interface NormalizedConversation {
  readonly contactId: string;
  readonly channel: Channel | 'unknown';
  readonly messages: readonly NormalizedMessage[];
  readonly turns: readonly ConversationTurn[];
  readonly latestInboundMessageId: string | null;
  readonly latestInboundAt: Date | null;
  /** The exact activity id an email reply must be threaded to. */
  readonly latestInboundEmailActivityId: string | null;
  readonly conversationHash: string;
  /** Turns that carry actual conversational content, used for the turn cap. */
  readonly meaningfulTurnCount: number;
  readonly attachmentsPresent: boolean;
  readonly hasUncertainDirection: boolean;
  readonly participants: readonly string[];
  readonly warnings: readonly string[];
}
