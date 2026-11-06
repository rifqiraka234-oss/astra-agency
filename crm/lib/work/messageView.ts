/**
 * lib/work/messageView.ts, a queue message as plain, preformatted data for the client cards (agent C). Pure.
 */
import { formatAgo, formatDateTime } from '../format';
import { labelOf, OUTBOUND_STATUSES, OUTBOUND_TONES, toneOf, type Tone } from '../options';
import { can, type PermUser } from '../permissions';
import type { MessageStatus, QueueItem } from './approvals';

/** A thread pulled longer ago than this gets the amber "pull it again" warning. */
export const THREAD_STALE_MINUTES = 60;

export type MessageView = {
  id: string;
  status: MessageStatus;
  statusLabel: string;
  statusTone: Tone;
  channel: string;
  channelLabel: string;
  to: string;
  subject: string | null;
  body: string;
  preview: string;
  links: { label: string; href: string }[];
  threadHref: string | null;
  threadLabel: string;
  threadStale: boolean;
  threadCountLabel: string | null;
  ownerName: string | null;
  updatedLabel: string;
  approvalLine: string | null;
  approvalText: string | null;
  rejectedReason: string | null;
  canApprove: boolean;
  canEdit: boolean;
};

export function preview(body: string, max = 90): string {
  const flat = body.replace(/\s+/g, ' ').trim();
  if (flat.length <= max) return flat;
  const cut = flat.slice(0, max);
  return `${cut.slice(0, Math.max(cut.lastIndexOf(' '), max - 15)).trimEnd()}...`;
}

export function toMessageView(m: QueueItem, user: PermUser, now: Date = new Date()): MessageView {
  const record = { owner_user_id: m.ownerUserId, created_by_user_id: m.createdByUserId };
  const pulledMins = m.threadCheckedAt ? (now.getTime() - new Date(m.threadCheckedAt).getTime()) / 60_000 : null;
  const body = m.status === 'approved' || m.status === 'sent' ? m.approvedBody ?? m.body : m.body;
  let approvalLine: string | null = null;
  if (m.status === 'sent' && m.sentAt) {
    approvalLine = `Approved by ${m.approvedByName ?? 'someone'}${m.approvedAt ? ` ${formatDateTime(m.approvedAt, now)}` : ''}, sent ${formatDateTime(m.sentAt, now)}.`;
  } else if (m.status === 'approved') {
    approvalLine = `Approved by ${m.approvedByName ?? 'someone'}${m.approvedAt ? ` ${formatAgo(m.approvedAt, now)}` : ''}.`;
  }
  return {
    id: m.id,
    status: m.status,
    statusLabel: labelOf(OUTBOUND_STATUSES, m.status),
    statusTone: toneOf(OUTBOUND_TONES, m.status),
    channel: m.channel,
    channelLabel: m.channelLabel,
    to: m.to,
    subject: m.subject,
    body,
    preview: preview(body),
    links: m.links.map((l) => ({ label: l.label, href: l.href })),
    threadHref: m.threadHref,
    threadLabel: m.threadCheckedAt ? `Thread pulled ${formatAgo(m.threadCheckedAt, now)}` : 'Thread not pulled yet',
    threadStale: pulledMins === null || pulledMins > THREAD_STALE_MINUTES,
    threadCountLabel: m.threadMessageCount === null ? null : `${m.threadMessageCount} ${m.threadMessageCount === 1 ? 'message' : 'messages'} in the thread`,
    ownerName: m.ownerName ? m.ownerName.split(' ')[0] : null,
    updatedLabel: `Updated ${formatAgo(m.updatedAt, now)}`,
    approvalLine,
    approvalText: m.approvalText,
    rejectedReason: m.rejectedReason,
    canApprove: m.status === 'awaiting_approval' && can(user, 'approve', 'outbound_message', record),
    canEdit: can(user, 'edit', 'outbound_message', record),
  };
}
