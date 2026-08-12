'use server';

import { revalidatePath } from 'next/cache';
import {
  contentHash,
  evaluateApproval,
  type ApprovalStatus,
} from '@astra/core';
import {
  addExclusion,
  createApproval,
  decideApproval,
  disconnectIntegration,
  getApproval,
  getPool,
  recordAudit,
  recordOwnershipChange,
  suppressContact,
  type IntegrationProvider,
} from '@astra/db';
import { assertCsrf, requireSession } from './auth';

/**
 * Operator actions.
 *
 * Every one of these starts with `requireSession` and `assertCsrf`, in that
 * order, before touching anything. Approve in particular re-evaluates the
 * approval against live state rather than trusting the button that was
 * clicked: the page may have been open for an hour, and the conversation may
 * have moved on in that hour.
 *
 * These actions record intent. They never call Lemlist directly: the worker
 * owns sending, and it runs the pre-send gate again immediately before the
 * external call.
 */

async function operatorId(email: string): Promise<string> {
  const result = await getPool().query<{ id: string }>(
    `INSERT INTO operators (email) VALUES ($1)
     ON CONFLICT (lower(email)) DO UPDATE SET updated_at = now()
     RETURNING id`,
    [email],
  );
  const id = result.rows[0]?.id;
  if (!id) throw new Error('could not resolve the operator record');
  return id;
}

export async function approveAction(formData: FormData): Promise<void> {
  const session = await requireSession();
  await assertCsrf(formData);

  const approvalId = String(formData.get('approvalId') ?? '');
  const conversationId = String(formData.get('conversationId') ?? '');

  const approval = await getApproval(getPool(), approvalId);
  if (!approval) throw new Error('approval not found');

  // Re-check freshness at click time. The worker checks again before sending;
  // this check exists so the operator is told immediately rather than
  // discovering later that their approval was void.
  const live = await getPool().query<{
    conversation_hash: string | null;
    latest_inbound_message_id: string | null;
  }>('SELECT conversation_hash, latest_inbound_message_id FROM conversations WHERE id = $1', [
    conversationId,
  ]);
  const current = live.rows[0];

  const validity = evaluateApproval(
    {
      operatorEmail: session.email,
      actionType: approval.action_type as 'SEND_MESSAGE',
      conversationId,
      contactId: '',
      sourceLatestInboundMessageId: approval.source_latest_inbound_message_id,
      conversationHash: approval.conversation_hash,
      replyContentHash: approval.reply_content_hash,
      prototypeVersionId: approval.prototype_version_id,
      prototypeContentHash: approval.prototype_content_hash,
      prototypeDeployHash: approval.prototype_deploy_hash,
      policyVersion: approval.policy_version,
      promptVersion: approval.prompt_version,
      expiresAt: approval.expires_at,
    },
    'APPROVED',
    {
      conversationHash: current?.conversation_hash ?? '',
      latestInboundMessageId: current?.latest_inbound_message_id ?? null,
      replyContentHash: approval.reply_content_hash,
      prototypeVersionId: approval.prototype_version_id,
      prototypeContentHash: approval.prototype_content_hash,
      prototypeDeployHash: approval.prototype_deploy_hash,
    },
    new Date(),
  );

  if (!validity.usable) {
    await getPool().query(`UPDATE approvals SET status = 'STALE' WHERE id = $1`, [approvalId]);
    await recordAudit(getPool(), {
      conversationId,
      actor: `operator:${session.email}`,
      action: 'APPROVAL_REJECTED_AS_STALE',
      reasonCode: validity.reasonCode,
      payload: { approvalId, detail: validity.detail },
    });
    revalidatePath(`/conversations/${conversationId}`);
    return;
  }

  // Idempotent: a second click finds the approval no longer PENDING and
  // changes nothing.
  await decideApproval(getPool(), {
    approvalId,
    status: 'APPROVED',
    operatorId: await operatorId(session.email),
    note: String(formData.get('note') ?? '') || null,
  });

  await recordAudit(getPool(), {
    conversationId,
    actor: `operator:${session.email}`,
    action: 'APPROVAL_GRANTED',
    payload: { approvalId, replyContentHash: approval.reply_content_hash },
  });

  revalidatePath(`/conversations/${conversationId}`);
}

export async function rejectAction(formData: FormData): Promise<void> {
  const session = await requireSession();
  await assertCsrf(formData);

  const approvalId = String(formData.get('approvalId') ?? '');
  const conversationId = String(formData.get('conversationId') ?? '');

  await decideApproval(getPool(), {
    approvalId,
    status: 'REJECTED',
    operatorId: await operatorId(session.email),
    note: String(formData.get('note') ?? '') || null,
  });

  await recordAudit(getPool(), {
    conversationId,
    actor: `operator:${session.email}`,
    action: 'APPROVAL_REJECTED',
    payload: { approvalId },
  });

  // A rejected prototype's site is not deleted here. It is marked and left in
  // place; deleting it is a separate, explicit operator action.
  revalidatePath(`/conversations/${conversationId}`);
}

export async function reviseAction(formData: FormData): Promise<void> {
  const session = await requireSession();
  await assertCsrf(formData);

  const approvalId = String(formData.get('approvalId') ?? '');
  const conversationId = String(formData.get('conversationId') ?? '');
  const revisedText = String(formData.get('replyText') ?? '').trim();
  if (revisedText.length === 0) throw new Error('a revision needs text');

  const previous = await getApproval(getPool(), approvalId);
  if (!previous) throw new Error('approval not found');

  // A revision is a *new version*, never an amendment. The prior approval is
  // superseded by createApproval, so "approve, then edit, then send" cannot
  // happen.
  await createApproval(getPool(), {
    conversationId,
    actionType: previous.action_type,
    bindingKey: contentHash(`${conversationId}:${revisedText}`),
    sourceLatestInboundMessageId: previous.source_latest_inbound_message_id,
    conversationHash: previous.conversation_hash,
    replyText: revisedText,
    replyContentHash: contentHash(revisedText),
    prototypeVersionId: previous.prototype_version_id,
    prototypeContentHash: previous.prototype_content_hash,
    prototypeDeployHash: previous.prototype_deploy_hash,
    approvedUrls: previous.approved_urls,
    policyVersion: previous.policy_version,
    promptVersion: previous.prompt_version,
    expiresAt: previous.expires_at,
    correlationId: `operator-revision-${Date.now()}`,
  });

  await recordAudit(getPool(), {
    conversationId,
    actor: `operator:${session.email}`,
    action: 'APPROVAL_REVISED',
    payload: { supersededApprovalId: approvalId },
  });

  revalidatePath(`/conversations/${conversationId}`);
}

export async function takeOverAction(formData: FormData): Promise<void> {
  const session = await requireSession();
  await assertCsrf(formData);

  const conversationId = String(formData.get('conversationId') ?? '');

  // Taking over invalidates every pending automatic action at once.
  await getPool().query(
    `UPDATE approvals SET status = 'SUPERSEDED' WHERE conversation_id = $1 AND status IN ('PENDING','APPROVED')`,
    [conversationId],
  );

  const owner = await getPool().query<{ owner: string }>(
    'SELECT owner FROM conversations WHERE id = $1',
    [conversationId],
  );

  await recordOwnershipChange(getPool(), {
    conversationId,
    previousOwner: (owner.rows[0]?.owner ?? 'UNKNOWN') as never,
    nextOwner: 'HUMAN',
    actor: `operator:${session.email}`,
    reasonCode: 'OWNER_NOT_ASTRA',
    detail: 'The operator took over this conversation.',
    correlationId: `operator-takeover-${Date.now()}`,
  });

  revalidatePath(`/conversations/${conversationId}`);
}

export async function excludeAction(formData: FormData): Promise<void> {
  const session = await requireSession();
  await assertCsrf(formData);

  const conversationId = String(formData.get('conversationId') ?? '');
  const scope = String(formData.get('scope') ?? 'CONTACT') as 'GLOBAL' | 'CAMPAIGN' | 'CONTACT' | 'LEAD';
  const targetId = String(formData.get('targetId') ?? '') || null;
  const reason = String(formData.get('reason') ?? 'operator exclusion');

  await addExclusion(getPool(), {
    scope,
    targetId: scope === 'GLOBAL' ? null : targetId,
    reason,
    operatorId: await operatorId(session.email),
  });

  await recordAudit(getPool(), {
    conversationId: conversationId || null,
    actor: `operator:${session.email}`,
    action: 'EXCLUSION_ADDED',
    payload: { scope, targetId, reason },
  });

  revalidatePath('/settings');
  if (conversationId) revalidatePath(`/conversations/${conversationId}`);
}

export async function suppressAction(formData: FormData): Promise<void> {
  const session = await requireSession();
  await assertCsrf(formData);

  const conversationId = String(formData.get('conversationId') ?? '');
  const contactId = String(formData.get('contactId') ?? '');

  await suppressContact(getPool(), contactId, `suppressed by ${session.email}`);
  await recordAudit(getPool(), {
    conversationId,
    actor: `operator:${session.email}`,
    action: 'CONTACT_SUPPRESSED',
    payload: { contactId },
  });

  revalidatePath(`/conversations/${conversationId}`);
}

export async function postMeetingDecisionAction(formData: FormData): Promise<void> {
  const session = await requireSession();
  await assertCsrf(formData);

  const conversationId = String(formData.get('conversationId') ?? '');
  const decision = String(formData.get('decision') ?? '');
  if (!['KEEP_HUMAN', 'RESUME_LOW_RISK', 'EXCLUDE'].includes(decision)) {
    throw new Error('unknown post-meeting decision');
  }

  await getPool().query(
    'UPDATE conversations SET post_meeting_decision = $2, updated_at = now() WHERE id = $1',
    [conversationId, decision],
  );

  if (decision === 'EXCLUDE') {
    const contact = await getPool().query<{ contact_id: string }>(
      'SELECT contact_id FROM conversations WHERE id = $1',
      [conversationId],
    );
    const contactId = contact.rows[0]?.contact_id;
    if (contactId) {
      await addExclusion(getPool(), {
        scope: 'CONTACT',
        targetId: contactId,
        reason: 'excluded after a meeting was booked',
        operatorId: await operatorId(session.email),
      });
    }
  }

  await recordAudit(getPool(), {
    conversationId,
    actor: `operator:${session.email}`,
    action: 'POST_MEETING_DECISION',
    payload: { decision },
  });

  revalidatePath(`/conversations/${conversationId}`);
}

export async function setRolloutModeAction(formData: FormData): Promise<void> {
  const session = await requireSession();
  await assertCsrf(formData);

  const mode = String(formData.get('mode') ?? '');
  const note = String(formData.get('note') ?? '') || null;

  // Rollout stages never advance on their own. This records who asked for the
  // change and when; the process still has to be restarted with the matching
  // RUNTIME_MODE, which is deliberate friction.
  await getPool().query(
    `UPDATE rollout_state SET current_mode = $1, changed_by = $2, changed_at = now(), note = $3 WHERE id = 1`,
    [mode, await operatorId(session.email), note],
  );

  await recordAudit(getPool(), {
    actor: `operator:${session.email}`,
    action: 'ROLLOUT_MODE_REQUESTED',
    payload: { mode, note },
  });

  revalidatePath('/settings');
}

export async function retryDeadLetterAction(formData: FormData): Promise<void> {
  const session = await requireSession();
  await assertCsrf(formData);

  const deadLetterId = String(formData.get('deadLetterId') ?? '');
  await getPool().query(
    `UPDATE dead_letters SET status = 'RETRIED', resolved_at = now() WHERE id = $1 AND status = 'OPEN'`,
    [deadLetterId],
  );
  await recordAudit(getPool(), {
    actor: `operator:${session.email}`,
    action: 'DEAD_LETTER_RETRIED',
    payload: { deadLetterId },
  });
  revalidatePath('/errors');
}

export async function disconnectCalendarAction(formData: FormData): Promise<void> {
  const session = await requireSession();
  await assertCsrf(formData);

  const provider = String(formData.get('provider') ?? '') as IntegrationProvider;
  const account = String(formData.get('account') ?? '');
  if (provider !== 'GOOGLE_CALENDAR' && provider !== 'MICROSOFT_CALENDAR') {
    throw new Error('unknown calendar provider');
  }

  // Disconnecting wipes the stored ciphertext rather than only flipping a
  // flag, and takes effect on the very next free/busy query because the
  // worker reads the token on demand. Slot proposals then hand off instead of
  // guessing at availability.
  await disconnectIntegration(getPool(), provider, account);

  await recordAudit(getPool(), {
    actor: `operator:${session.email}`,
    action: 'CALENDAR_DISCONNECTED',
    payload: { provider, account },
  });

  revalidatePath('/settings');
}

export type { ApprovalStatus };
