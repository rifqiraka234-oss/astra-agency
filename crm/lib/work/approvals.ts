/**
 * lib/work/approvals.ts, the approval queue for outbound_messages (agent C).
 *
 * States: draft -> awaiting_approval -> approved -> sent, plus rejected.
 *   submitForApproval(t, id, user)                    draft or rejected -> awaiting_approval
 *   approveMessage(t, id, user, { approvalText })     awaiting_approval -> approved, stores the approver,
 *                                                      the time, their words and the exact text approved
 *   rejectMessage(t, id, user, reason)                awaiting_approval -> rejected
 *   saveDraft(t, id, user, { body, subject })         edits a draft, rejected (back to draft) or waiting message
 *   markSent(t, id, user, { activityId })             approved -> sent, refuses unless SEND_ENABLED=true
 *
 * Nothing here talks to lemlist, Gmail or any other API. V1 never sends (SPEC hard rule 1).
 */
import type { Db, Tx } from '../db';
import { sql } from '../db';
import { can, type PermUser } from '../permissions';
import { logActivity } from '../activities';
import { recordHref } from '../routes';

export type MessageStatus = 'draft' | 'awaiting_approval' | 'approved' | 'sent' | 'rejected';

/** Allowed moves. Anything not listed is refused. */
export const TRANSITIONS: Record<MessageStatus, MessageStatus[]> = {
  draft: ['awaiting_approval'],
  awaiting_approval: ['approved', 'rejected', 'draft'],
  approved: ['sent'],
  rejected: ['draft', 'awaiting_approval'],
  sent: [],
};

export function canTransition(from: MessageStatus, to: MessageStatus): boolean {
  return TRANSITIONS[from]?.includes(to) ?? false;
}

/** SEND_ENABLED=true turns the send step on. Anything else, including unset, means off. */
export function sendEnabled(env: Record<string, string | undefined> = process.env): boolean {
  return env.SEND_ENABLED === 'true';
}

export class ApprovalError extends Error {
  constructor(
    message: string,
    public code: 'not_found' | 'forbidden' | 'bad_state' | 'sending_off' | 'invalid',
  ) {
    super(message);
    this.name = 'ApprovalError';
  }
}

type MessageRow = {
  id: string;
  channel: 'linkedin' | 'email';
  via: 'lemlist' | 'gmail' | 'manual';
  kind: string;
  status: MessageStatus;
  body: string;
  subject: string | null;
  contact_id: string | null;
  organization_id: string | null;
  lead_id: string | null;
  deal_id: string | null;
  owner_user_id: string | null;
  created_by_user_id: string | null;
};

const CHANNEL_LABEL: Record<string, string> = { linkedin: 'LinkedIn', email: 'Email' };
const KIND_LABEL: Record<string, string> = {
  opener: 'opener',
  nudge: 'nudge',
  reply: 'reply',
  artifact_delivery: 'delivery',
  other: 'message',
};
const VIA_LABEL: Record<string, string> = { lemlist: 'via lemlist', gmail: 'via Gmail', manual: 'sent by hand' };

/** 'LinkedIn opener, via lemlist' */
export function channelLabel(m: { channel: string; kind: string; via: string }): string {
  return `${CHANNEL_LABEL[m.channel] ?? m.channel} ${KIND_LABEL[m.kind] ?? m.kind}, ${VIA_LABEL[m.via] ?? m.via}`;
}

async function load(t: Tx, id: string): Promise<MessageRow> {
  const [row] = await t<MessageRow[]>`
    select id, channel, via, kind, status, body, subject, contact_id, organization_id, lead_id, deal_id,
           owner_user_id, created_by_user_id
      from outbound_messages where id = ${id} for update`;
  if (!row) throw new ApprovalError('That message no longer exists', 'not_found');
  return row;
}

function assertMove(row: MessageRow, to: MessageStatus) {
  if (!canTransition(row.status, to)) {
    const words: Record<MessageStatus, string> = {
      draft: 'a draft', awaiting_approval: 'waiting for approval', approved: 'already approved', sent: 'already sent', rejected: 'rejected',
    };
    throw new ApprovalError(`This message is ${words[row.status]}, so it can't be moved there`, 'bad_state');
  }
}

function links(row: MessageRow) {
  return [
    { contactId: row.contact_id },
    { organizationId: row.organization_id },
    { leadId: row.lead_id },
    { dealId: row.deal_id },
  ].filter((l) => Object.values(l)[0]);
}

export async function submitForApproval(t: Tx, id: string, user: PermUser): Promise<void> {
  const row = await load(t, id);
  if (!can(user, 'edit', 'outbound_message', row)) throw new ApprovalError("You can't edit this message", 'forbidden');
  assertMove(row, 'awaiting_approval');
  await t`update outbound_messages set status = 'awaiting_approval', rejected_reason = null where id = ${id}`;
}

export async function approveMessage(
  t: Tx,
  id: string,
  user: PermUser & { name?: string },
  opts: { approvalText?: string | null } = {},
): Promise<{ status: 'approved' }> {
  const row = await load(t, id);
  if (!can(user, 'approve', 'outbound_message', row)) throw new ApprovalError("You can't approve this message", 'forbidden');
  assertMove(row, 'approved');
  const words = opts.approvalText?.trim() || 'Approved with the Approve button';
  await t`
    update outbound_messages
       set status = 'approved', approved_by_user_id = ${user.id}, approved_at = now(),
           approval_text = ${words}, approved_body = body, rejected_reason = null
     where id = ${id}`;
  const l = links(row);
  if (l.length) {
    await logActivity(
      {
        kind: 'system',
        title: `${user.name ?? 'Someone'} approved the ${channelLabel(row).split(',')[0]}`,
        body: `${row.body}\n\nThe approval, in their words, "${words}"`,
        meta: { tags: ['Approved', sendEnabled() ? 'Sending on' : 'Not sent, sending is off'], outbound_message_id: id },
        actorUserId: user.id,
        source: 'system',
        links: l,
        autoLink: false,
      },
      t,
    );
  }
  return { status: 'approved' };
}

export async function rejectMessage(t: Tx, id: string, user: PermUser, reason: string): Promise<void> {
  const why = reason.trim();
  if (why.length < 3) throw new ApprovalError('Say why it was rejected, so the next draft gets it right', 'invalid');
  const row = await load(t, id);
  if (!can(user, 'approve', 'outbound_message', row)) throw new ApprovalError("You can't reject this message", 'forbidden');
  assertMove(row, 'rejected');
  await t`update outbound_messages set status = 'rejected', rejected_reason = ${why} where id = ${id}`;
}

/** Edit the text. A rejected message goes back to draft. Approved or sent messages are locked. */
export async function saveDraft(t: Tx, id: string, user: PermUser, input: { body: string; subject?: string | null }): Promise<MessageStatus> {
  const body = input.body.trim();
  if (!body) throw new ApprovalError('The message is empty', 'invalid');
  const row = await load(t, id);
  if (!can(user, 'edit', 'outbound_message', row)) throw new ApprovalError("You can't edit this message", 'forbidden');
  if (row.status === 'approved' || row.status === 'sent') {
    throw new ApprovalError('Approved and sent messages are locked, so the approved text stays the record', 'bad_state');
  }
  const next: MessageStatus = row.status === 'rejected' ? 'draft' : row.status;
  await t`
    update outbound_messages set body = ${body}, subject = ${input.subject ?? row.subject}, status = ${next}
     where id = ${id}`;
  return next;
}

/**
 * The only way a message becomes sent. Refuses while SEND_ENABLED is not true, and
 * V1 ships with it off. A future sender calls this after the provider accepted it.
 */
export async function markSent(
  t: Tx,
  id: string,
  user: PermUser,
  opts: { activityId?: string | null; env?: Record<string, string | undefined> } = {},
): Promise<void> {
  if (!sendEnabled(opts.env)) throw new ApprovalError('Sending is off in this version, the message stays approved', 'sending_off');
  const row = await load(t, id);
  if (!can(user, 'approve', 'outbound_message', row)) throw new ApprovalError("You can't send this message", 'forbidden');
  assertMove(row, 'sent');
  await t`update outbound_messages set status = 'sent', sent_at = now(), sent_activity_id = ${opts.activityId ?? null} where id = ${id}`;
}

// ---------------------------------------------------------------- reading

export type QueueTab = 'awaiting' | 'approved' | 'sent' | 'drafts';

export const QUEUE_TABS: { id: QueueTab; label: string; statuses: MessageStatus[] }[] = [
  { id: 'awaiting', label: 'Awaiting approval', statuses: ['awaiting_approval'] },
  { id: 'approved', label: 'Approved', statuses: ['approved'] },
  { id: 'sent', label: 'Sent', statuses: ['sent'] },
  { id: 'drafts', label: 'Drafts', statuses: ['draft', 'rejected'] },
];

export type QueueItem = {
  id: string;
  status: MessageStatus;
  channel: string;
  channelLabel: string;
  subject: string | null;
  body: string;
  approvedBody: string | null;
  to: string;
  links: { type: 'contact' | 'organization' | 'lead' | 'deal'; label: string; href: string }[];
  threadHref: string | null;
  threadCheckedAt: Date | null;
  threadMessageCount: number | null;
  ownerName: string | null;
  ownerUserId: string | null;
  createdByUserId: string | null;
  approvedByName: string | null;
  approvedAt: Date | null;
  approvalText: string | null;
  rejectedReason: string | null;
  sentAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

/** Messages in the queue, newest first. visibleTo limits non admins to their own and unowned messages. */
export async function listQueue(
  opts: { statuses: MessageStatus[]; visibleTo?: { id: string; isAdmin: boolean }; limit?: number },
  db: Db = sql,
): Promise<QueueItem[]> {
  const v = opts.visibleTo;
  const rows = await db<
    {
      id: string; status: MessageStatus; channel: string; via: string; kind: string; subject: string | null; body: string;
      approved_body: string | null; contact_id: string | null; contact_name: string | null; organization_id: string | null;
      org_name: string | null; lead_id: string | null; lead_name: string | null; deal_id: string | null; deal_name: string | null;
      thread_checked_at: Date | null; thread_message_count: number | null; owner_name: string | null; owner_user_id: string | null;
      created_by_user_id: string | null; approved_by_name: string | null; approved_at: Date | null; approval_text: string | null;
      rejected_reason: string | null; sent_at: Date | null; created_at: Date; updated_at: Date;
    }[]
  >`
    select m.id, m.status, m.channel, m.via, m.kind, m.subject, m.body, m.approved_body,
           m.contact_id, c.full_name as contact_name, m.organization_id, o.name as org_name,
           m.lead_id, coalesce(l.name, lc.full_name, lo.name, 'Lead') as lead_name, m.deal_id, d.name as deal_name,
           m.thread_checked_at, m.thread_message_count, ou.name as owner_name, m.owner_user_id, m.created_by_user_id,
           au.name as approved_by_name, m.approved_at, m.approval_text, m.rejected_reason, m.sent_at, m.created_at, m.updated_at
      from outbound_messages m
      left join contacts c on c.id = m.contact_id
      left join organizations o on o.id = m.organization_id
      left join leads l on l.id = m.lead_id
      left join contacts lc on lc.id = l.contact_id
      left join organizations lo on lo.id = l.organization_id
      left join deals d on d.id = m.deal_id
      left join users ou on ou.id = m.owner_user_id
      left join users au on au.id = m.approved_by_user_id
     where m.status = any(${opts.statuses as string[]})
       and (${!v || v.isAdmin} or m.owner_user_id is null or m.owner_user_id = ${v?.id ?? null}::uuid
            or m.created_by_user_id = ${v?.id ?? null}::uuid)
     order by coalesce(m.sent_at, m.approved_at, m.updated_at) desc
     limit ${opts.limit ?? 200}`;
  return rows.map((r) => {
    const items: QueueItem['links'] = [];
    if (r.contact_id && r.contact_name) items.push({ type: 'contact', label: r.contact_name, href: recordHref('contact', r.contact_id) });
    if (r.organization_id && r.org_name) items.push({ type: 'organization', label: r.org_name, href: recordHref('organization', r.organization_id) });
    if (r.lead_id) items.push({ type: 'lead', label: `Lead · ${r.lead_name}`, href: recordHref('lead', r.lead_id) });
    if (r.deal_id && r.deal_name) items.push({ type: 'deal', label: r.deal_name, href: recordHref('deal', r.deal_id) });
    const threadHref = r.contact_id
      ? recordHref('contact', r.contact_id)
      : r.lead_id
        ? recordHref('lead', r.lead_id)
        : r.deal_id
          ? recordHref('deal', r.deal_id)
          : r.organization_id
            ? recordHref('organization', r.organization_id)
            : null;
    return {
      id: r.id,
      status: r.status,
      channel: r.channel,
      channelLabel: channelLabel(r),
      subject: r.subject,
      body: r.body,
      approvedBody: r.approved_body,
      to: [r.contact_name, r.org_name].filter(Boolean).join(', ') || r.lead_name || 'No recipient linked',
      links: items,
      threadHref,
      threadCheckedAt: r.thread_checked_at,
      threadMessageCount: r.thread_message_count,
      ownerName: r.owner_name,
      ownerUserId: r.owner_user_id,
      createdByUserId: r.created_by_user_id,
      approvedByName: r.approved_by_name,
      approvedAt: r.approved_at,
      approvalText: r.approval_text,
      rejectedReason: r.rejected_reason,
      sentAt: r.sent_at,
      createdAt: r.created_at,
      updatedAt: r.updated_at,
    };
  });
}

/** Counts per tab for the tab badges. */
export async function queueCounts(visibleTo: { id: string; isAdmin: boolean }, db: Db = sql): Promise<Record<QueueTab, number>> {
  const rows = await db<{ status: MessageStatus; n: number }[]>`
    select status, count(*)::int as n from outbound_messages m
     where (${visibleTo.isAdmin} or m.owner_user_id is null or m.owner_user_id = ${visibleTo.id}::uuid
            or m.created_by_user_id = ${visibleTo.id}::uuid)
     group by status`;
  const by = Object.fromEntries(rows.map((r) => [r.status, r.n])) as Partial<Record<MessageStatus, number>>;
  return {
    awaiting: by.awaiting_approval ?? 0,
    approved: by.approved ?? 0,
    sent: by.sent ?? 0,
    drafts: (by.draft ?? 0) + (by.rejected ?? 0),
  };
}
