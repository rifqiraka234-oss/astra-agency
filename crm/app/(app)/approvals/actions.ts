'use server';
/**
 * Approval queue actions (agent C). Nothing here sends anything: with SEND_ENABLED
 * off (the V1 default) Approve only marks the message approved.
 *   approveAction(prev, fd)    id, approval_text
 *   rejectAction(prev, fd)     id, reason
 *   saveDraftAction(prev, fd)  id, body, subject
 *   submitAction(prev, fd)     id, draft or rejected back into the queue
 */
import { revalidatePath } from 'next/cache';
import { requireUser } from '@/lib/auth';
import { tx } from '@/lib/db';
import { fail, str, type ActionState } from '@/lib/forms';
import { ApprovalError, approveMessage, rejectMessage, saveDraft, sendEnabled, submitForApproval } from '@/lib/work/approvals';

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function refresh() {
  revalidatePath('/', 'layout');
}

async function run(fd: FormData, fn: (id: string, user: Awaited<ReturnType<typeof requireUser>>) => Promise<string>): Promise<ActionState> {
  const user = await requireUser();
  const id = str(fd, 'id');
  if (!id || !UUID.test(id)) return fail('That message no longer exists');
  try {
    const message = await fn(id, user);
    refresh();
    return { ok: true, id, message };
  } catch (err) {
    if (err instanceof ApprovalError) return fail(err.message);
    throw err;
  }
}

export async function approveAction(_prev: ActionState, fd: FormData): Promise<ActionState> {
  return run(fd, async (id, user) => {
    const text = str(fd, 'approval_text');
    if (text && text.length > 1000) throw new ApprovalError('Keep the approval note under 1,000 characters', 'invalid');
    await tx((t) => approveMessage(t, id, user, { approvalText: text }), { userId: user.id });
    return sendEnabled()
      ? 'Approved. No sending channel is connected yet, so it waits in Approved.'
      : 'Approved. Sending is off in this version, so nothing went out.';
  });
}

export async function rejectAction(_prev: ActionState, fd: FormData): Promise<ActionState> {
  return run(fd, async (id, user) => {
    const reason = str(fd, 'reason') ?? '';
    if (reason.length > 1000) throw new ApprovalError('Keep the reason under 1,000 characters', 'invalid');
    await tx((t) => rejectMessage(t, id, user, reason), { userId: user.id });
    return 'Rejected. It moved to Drafts with your reason.';
  });
}

export async function saveDraftAction(_prev: ActionState, fd: FormData): Promise<ActionState> {
  return run(fd, async (id, user) => {
    const body = str(fd, 'body') ?? '';
    if (body.length > 10000) throw new ApprovalError('Keep the message under 10,000 characters', 'invalid');
    const subject = str(fd, 'subject');
    const status = await tx((t) => saveDraft(t, id, user, { body, subject }), { userId: user.id });
    return status === 'awaiting_approval' ? "Saved. It's still waiting for approval." : 'Draft saved.';
  });
}

export async function submitAction(_prev: ActionState, fd: FormData): Promise<ActionState> {
  return run(fd, async (id, user) => {
    await tx((t) => submitForApproval(t, id, user), { userId: user.id });
    return 'Back in the queue, waiting for approval.';
  });
}
