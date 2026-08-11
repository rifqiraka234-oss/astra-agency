import type { Channel, MessageDirection, MessageKind } from '../domain/enums.js';
import { conversationHash } from '../text/hash.js';
import {
  collapseWhitespace,
  htmlToPlainText,
  sanitizeHtmlForDisplay,
  stripQuotedHistory,
  stripTrackingArtifacts,
} from '../text/sanitize.js';
import type {
  AttachmentMetadata,
  ConversationTurn,
  NormalizedConversation,
  NormalizedMessage,
  RawActivity,
} from './types.js';

/** Fragments closer together than this belong to the same prospect turn. */
export const TURN_GROUPING_WINDOW_MS = 5 * 60 * 1000;

export interface NormalizeOptions {
  readonly contactId: string;
  /** Addresses/handles known to belong to the operator's side. */
  readonly ownAddresses?: readonly string[];
  readonly leadEmail?: string | null;
}

export function normalizeConversation(
  activities: readonly RawActivity[],
  options: NormalizeOptions,
): NormalizedConversation {
  const warnings: string[] = [];
  const ownAddresses = new Set(
    (options.ownAddresses ?? []).map((address) => address.toLowerCase().trim()).filter(Boolean),
  );

  const messages = activities
    .map((activity) => normalizeActivity(activity, ownAddresses, warnings))
    .filter((message): message is NormalizedMessage => message !== null)
    .sort(compareMessages);

  const deduped = dedupeByExternalId(messages);
  const turns = groupIntoTurns(deduped);

  const inbound = deduped.filter((message) => message.direction === 'INBOUND');
  const latestInbound = inbound.at(-1) ?? null;
  const latestInboundEmail =
    [...inbound].reverse().find((message) => message.channel === 'email') ?? null;

  const channels = new Set(deduped.map((message) => message.channel).filter((c) => c !== 'unknown'));
  const channel: Channel | 'unknown' =
    channels.size === 1 ? ([...channels][0] as Channel) : channels.size === 0 ? 'unknown' : 'unknown';
  if (channels.size > 1) {
    warnings.push(`conversation spans multiple channels: ${[...channels].join(', ')}`);
  }

  const participants = new Set<string>();
  for (const message of deduped) {
    if (message.sender) participants.add(message.sender.toLowerCase());
    for (const recipient of message.recipients) participants.add(recipient.toLowerCase());
    for (const copied of message.cc) participants.add(copied.toLowerCase());
  }

  return {
    contactId: options.contactId,
    channel,
    messages: deduped,
    turns,
    latestInboundMessageId: latestInbound?.externalId ?? null,
    latestInboundAt: latestInbound?.occurredAt ?? null,
    latestInboundEmailActivityId: latestInboundEmail?.externalId ?? null,
    conversationHash: conversationHash(deduped),
    meaningfulTurnCount: turns.filter(isMeaningfulTurn).length,
    attachmentsPresent: deduped.some((message) => message.attachments.length > 0),
    hasUncertainDirection: deduped.some((message) => message.direction === 'UNCERTAIN'),
    participants: [...participants],
    warnings,
  };
}

function normalizeActivity(
  activity: RawActivity,
  ownAddresses: ReadonlySet<string>,
  warnings: string[],
): NormalizedMessage | null {
  if (!activity.id) {
    warnings.push('dropped an activity with no id: it cannot be deduplicated or threaded');
    return null;
  }

  const occurredAtRaw = activity.createdAt ?? activity.date;
  const occurredAt = occurredAtRaw ? new Date(occurredAtRaw) : null;
  if (occurredAt === null || Number.isNaN(occurredAt.getTime())) {
    warnings.push(`activity ${activity.id} has no usable timestamp`);
    return null;
  }

  const channel = resolveChannel(activity);
  const direction = resolveDirection(activity, ownAddresses);
  const kind = resolveKind(activity, direction);

  if (direction === 'UNCERTAIN') {
    warnings.push(`activity ${activity.id} has an undetermined direction; auto-send is blocked`);
  }

  const rawHtml = activity.html ?? (looksLikeHtml(activity.body) ? activity.body : undefined);
  const rawText = activity.text ?? (looksLikeHtml(activity.body) ? undefined : activity.body);

  const plainSource = rawHtml ? htmlToPlainText(stripTrackingArtifacts(rawHtml)) : (rawText ?? '');
  const stripped = stripQuotedHistory(plainSource);

  return {
    externalId: activity.id,
    occurredAt,
    channel,
    direction,
    kind,
    bodyText: collapseWhitespace(stripped.text),
    bodyHtmlSanitized: rawHtml ? sanitizeHtmlForDisplay(stripTrackingArtifacts(rawHtml)) : null,
    subject: activity.subject ?? null,
    sender: normalizeAddress(activity.sender ?? activity.from),
    recipients: toAddressList(activity.to),
    cc: toAddressList(activity.cc),
    campaignId: activity.campaignId ?? null,
    leadId: activity.leadId ?? null,
    contactId: activity.contactId ?? null,
    sequenceId: activity.sequenceId ?? null,
    stepId: activity.stepId ?? null,
    sequencePosition: activity.sequenceStep ?? null,
    attachments: normalizeAttachments(activity.attachments),
    hadQuotedHistory: stripped.removedQuotedHistory,
  };
}

function looksLikeHtml(value: string | undefined): boolean {
  return typeof value === 'string' && /<[a-z!/][^>]*>/i.test(value);
}

function resolveChannel(activity: RawActivity): Channel | 'unknown' {
  const source = `${activity.channel ?? ''} ${activity.type ?? ''}`.toLowerCase();
  if (source.includes('linkedin')) return 'linkedin';
  if (source.includes('email') || source.includes('mail')) return 'email';
  // An activity carrying an email subject and address is an email even when
  // the channel field is missing.
  if (activity.subject !== undefined || /@/.test(activity.sender ?? activity.from ?? '')) {
    return 'email';
  }
  return 'unknown';
}

/**
 * Direction resolution is deliberately conservative. Anything we cannot place
 * with confidence becomes UNCERTAIN, which permanently removes auto-send
 * eligibility for the conversation rather than guessing.
 */
function resolveDirection(
  activity: RawActivity,
  ownAddresses: ReadonlySet<string>,
): MessageDirection {
  if (typeof activity.isFromLead === 'boolean') {
    return activity.isFromLead ? 'INBOUND' : 'OUTBOUND';
  }

  const explicit = activity.direction?.toLowerCase();
  if (explicit === 'inbound' || explicit === 'received' || explicit === 'in') return 'INBOUND';
  if (explicit === 'outbound' || explicit === 'sent' || explicit === 'out') return 'OUTBOUND';

  const type = activity.type?.toLowerCase() ?? '';
  if (type.includes('replied') || type.includes('reply') || type.includes('received')) {
    return 'INBOUND';
  }
  if (
    type.includes('sent') ||
    type.includes('opened') ||
    type.includes('invite') ||
    type.includes('emailssend')
  ) {
    return type.includes('opened') ? 'SYSTEM' : 'OUTBOUND';
  }
  if (type.includes('unsubscrib') || type.includes('bounce') || type.includes('failed')) {
    return 'SYSTEM';
  }

  const sender = normalizeAddress(activity.sender ?? activity.from);
  if (sender !== null && ownAddresses.size > 0) {
    return ownAddresses.has(sender.toLowerCase()) ? 'OUTBOUND' : 'INBOUND';
  }

  return 'UNCERTAIN';
}

function resolveKind(activity: RawActivity, direction: MessageDirection): MessageKind {
  if (activity.isDraft === true) return 'DRAFT';
  const type = activity.type?.toLowerCase() ?? '';
  if (type.includes('invite') || type.includes('invitation') || type.includes('connect')) {
    return 'INVITATION';
  }
  if (direction === 'INBOUND') return 'INBOUND_REPLY';
  if (direction === 'SYSTEM') return 'SYSTEM_ACTIVITY';
  if (direction === 'OUTBOUND') {
    // A campaign-sent message carries the sequence/step identifiers; an inbox
    // message sent by the agent or a human does not.
    const fromSequence =
      activity.sequenceId !== undefined ||
      activity.stepId !== undefined ||
      activity.sequenceStep !== undefined;
    return fromSequence ? 'OUTBOUND_CAMPAIGN_MESSAGE' : 'OUTBOUND_INBOX_MESSAGE';
  }
  return 'UNKNOWN';
}

function normalizeAttachments(
  attachments: RawActivity['attachments'],
): readonly AttachmentMetadata[] {
  if (!attachments || attachments.length === 0) return [];
  // Attachments are never dropped silently: their metadata is retained and
  // their presence blocks automatic sending elsewhere in the policy engine.
  return attachments.map((attachment, index) => ({
    name: attachment.name ?? `attachment-${index + 1}`,
    sizeBytes: attachment.size ?? null,
    contentType: attachment.contentType ?? null,
  }));
}

function normalizeAddress(value: string | undefined): string | null {
  if (!value) return null;
  const trimmed = value.trim();
  if (trimmed.length === 0) return null;
  const angled = /<([^>]+)>/.exec(trimmed);
  return (angled?.[1] ?? trimmed).toLowerCase();
}

function toAddressList(value: string | readonly string[] | undefined): readonly string[] {
  if (value === undefined) return [];
  const list = Array.isArray(value) ? value : String(value).split(/[,;]/);
  return list
    .map((entry) => normalizeAddress(entry))
    .filter((entry): entry is string => entry !== null);
}

/** Timestamp order, with the activity id as a stable tie-breaker. */
function compareMessages(a: NormalizedMessage, b: NormalizedMessage): number {
  const delta = a.occurredAt.getTime() - b.occurredAt.getTime();
  if (delta !== 0) return delta;
  return a.externalId < b.externalId ? -1 : a.externalId > b.externalId ? 1 : 0;
}

function dedupeByExternalId(messages: readonly NormalizedMessage[]): NormalizedMessage[] {
  const seen = new Set<string>();
  const output: NormalizedMessage[] = [];
  for (const message of messages) {
    if (seen.has(message.externalId)) continue;
    seen.add(message.externalId);
    output.push(message);
  }
  return output;
}

export function groupIntoTurns(messages: readonly NormalizedMessage[]): ConversationTurn[] {
  const turns: ConversationTurn[] = [];
  let current: NormalizedMessage[] = [];

  const flush = (): void => {
    if (current.length === 0) return;
    const first = current[0];
    const last = current.at(-1);
    if (!first || !last) return;
    turns.push({
      turnIndex: turns.length,
      direction: first.direction,
      startedAt: first.occurredAt,
      endedAt: last.occurredAt,
      messages: [...current],
      text: current
        .map((message) => message.bodyText)
        .filter((text) => text.length > 0)
        .join('\n'),
    });
    current = [];
  };

  for (const message of messages) {
    const previous = current.at(-1);
    const sameDirection = previous?.direction === message.direction;
    const withinWindow =
      previous !== undefined &&
      message.occurredAt.getTime() - previous.occurredAt.getTime() <= TURN_GROUPING_WINDOW_MS;

    if (previous !== undefined && (!sameDirection || !withinWindow)) flush();
    current.push(message);
  }
  flush();

  return turns;
}

function isMeaningfulTurn(turn: ConversationTurn): boolean {
  if (turn.direction === 'SYSTEM') return false;
  if (turn.messages.every((message) => message.kind === 'SYSTEM_ACTIVITY')) return false;
  if (turn.messages.every((message) => message.kind === 'DRAFT')) return false;
  return turn.text.trim().length > 0;
}
