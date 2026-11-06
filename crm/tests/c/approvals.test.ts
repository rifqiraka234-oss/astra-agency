import { afterAll, describe, expect, it } from 'vitest';
import { closeDb, type Tx } from '../../lib/db';
import {
  ApprovalError,
  approveMessage,
  canTransition,
  markSent,
  rejectMessage,
  saveDraft,
  sendEnabled,
  submitForApproval,
  TRANSITIONS,
} from '../../lib/work/approvals';
import { preview, toMessageView } from '../../lib/work/messageView';
import { listQueue } from '../../lib/work/approvals';
import { withRollback } from '../helpers';

afterAll(() => closeDb());

async function setup(t: Tx) {
  const [admin] = await t<{ id: string }[]>`insert into users (email, name, role) values ('c-admin@c-test.local', 'C Admin', 'admin') returning id`;
  const [sales] = await t<{ id: string }[]>`insert into users (email, name, role) values ('c-sales@c-test.local', 'C Sales', 'sales') returning id`;
  const [contact] = await t<{ id: string }[]>`insert into contacts (first_name, last_name) values ('Queue', 'Tester') returning id`;
  const [msg] = await t<{ id: string }[]>`
    insert into outbound_messages (channel, via, kind, status, contact_id, body, owner_user_id, created_by_user_id, thread_checked_at, thread_message_count)
    values ('linkedin', 'lemlist', 'opener', 'draft', ${contact.id}, 'Hi Queue, first draft.', ${admin.id}, ${admin.id}, now(), 1)
    returning id`;
  return { admin: { id: admin.id, role: 'admin' as const, name: 'C Admin' }, sales: { id: sales.id, role: 'sales' as const }, contactId: contact.id, msgId: msg.id };
}

async function status(t: Tx, id: string) {
  const [row] = await t<Record<string, unknown>[]>`select * from outbound_messages where id = ${id}`;
  return row;
}

async function code(p: Promise<unknown>): Promise<string | null> {
  try {
    await p;
    return null;
  } catch (e) {
    if (e instanceof ApprovalError) return e.code;
    throw e;
  }
}

describe('the approval state machine', () => {
  it('only allows the documented moves', () => {
    expect(canTransition('draft', 'awaiting_approval')).toBe(true);
    expect(canTransition('awaiting_approval', 'approved')).toBe(true);
    expect(canTransition('approved', 'sent')).toBe(true);
    expect(canTransition('draft', 'approved')).toBe(false);
    expect(canTransition('draft', 'sent')).toBe(false);
    expect(canTransition('awaiting_approval', 'sent')).toBe(false);
    expect(canTransition('sent', 'draft')).toBe(false);
    expect(TRANSITIONS.sent).toEqual([]);
  });

  it('reads SEND_ENABLED as off unless it is exactly true', () => {
    expect(sendEnabled({})).toBe(false);
    expect(sendEnabled({ SEND_ENABLED: 'false' })).toBe(false);
    expect(sendEnabled({ SEND_ENABLED: '1' })).toBe(false);
    expect(sendEnabled({ SEND_ENABLED: 'true' })).toBe(true);
  });

  it('draft, submit, approve stores the approver, time, words and text, and refuses to send while SEND_ENABLED is off', async () => {
    await withRollback(async (t) => {
      const { admin, msgId } = await setup(t);

      // A draft cannot be approved before it is submitted.
      expect(await code(approveMessage(t, msgId, admin))).toBe('bad_state');

      await submitForApproval(t, msgId, admin);
      expect((await status(t, msgId)).status).toBe('awaiting_approval');

      // Editing while waiting keeps it waiting; the approval snapshots this text.
      expect(await saveDraft(t, msgId, admin, { body: 'Hi Queue, the approved text.' })).toBe('awaiting_approval');

      await approveMessage(t, msgId, admin, { approvalText: 'send it' });
      const row = await status(t, msgId);
      expect(row.status).toBe('approved');
      expect(row.approved_by_user_id).toBe(admin.id);
      expect(row.approved_at).toBeInstanceOf(Date);
      expect(row.approval_text).toBe('send it');
      expect(row.approved_body).toBe('Hi Queue, the approved text.');
      expect(row.sent_at).toBeNull();

      // Sending is refused with SEND_ENABLED off, explicitly and by default.
      expect(await code(markSent(t, msgId, admin, { env: { SEND_ENABLED: 'false' } }))).toBe('sending_off');
      expect(await code(markSent(t, msgId, admin, { env: {} }))).toBe('sending_off');
      expect((await status(t, msgId)).status).toBe('approved');

      // Approved text is locked.
      expect(await code(saveDraft(t, msgId, admin, { body: 'sneaky change' }))).toBe('bad_state');

      // With sending switched on, the send step is the only way to sent.
      await markSent(t, msgId, admin, { env: { SEND_ENABLED: 'true' } });
      const sent = await status(t, msgId);
      expect(sent.status).toBe('sent');
      expect(sent.sent_at).toBeInstanceOf(Date);
      expect(await code(markSent(t, msgId, admin, { env: { SEND_ENABLED: 'true' } }))).toBe('bad_state');

      // The approval is on the contact's timeline.
      const [act] = await t<{ title: string }[]>`
        select a.title from activities a join activity_links l on l.activity_id = a.id
         where a.meta->>'outbound_message_id' = ${msgId}`;
      expect(act.title).toContain('approved');
    });
  });

  it('rejects need a reason, go to Drafts and come back through editing', async () => {
    await withRollback(async (t) => {
      const { admin, msgId } = await setup(t);
      await submitForApproval(t, msgId, admin);
      expect(await code(rejectMessage(t, msgId, admin, ' '))).toBe('invalid');
      await rejectMessage(t, msgId, admin, 'The thread has a reply');
      let row = await status(t, msgId);
      expect(row.status).toBe('rejected');
      expect(row.rejected_reason).toBe('The thread has a reply');
      expect(await saveDraft(t, msgId, admin, { body: 'Hi Queue, answering your reply.' })).toBe('draft');
      await submitForApproval(t, msgId, admin);
      row = await status(t, msgId);
      expect(row.status).toBe('awaiting_approval');
      expect(row.rejected_reason).toBeNull();
    });
  });

  it("a sales user can't approve someone else's message", async () => {
    await withRollback(async (t) => {
      const { admin, sales, msgId } = await setup(t);
      await submitForApproval(t, msgId, admin);
      expect(await code(approveMessage(t, msgId, sales))).toBe('forbidden');
      const [item] = await listQueue({ statuses: ['awaiting_approval'], visibleTo: { id: sales.id, isAdmin: false } }, t).then((rows) =>
        rows.filter((r) => r.id === msgId),
      );
      expect(item).toBeUndefined();
      const [mine] = (await listQueue({ statuses: ['awaiting_approval'] }, t)).filter((r) => r.id === msgId);
      const view = toMessageView(mine, sales);
      expect(view.canApprove).toBe(false);
      expect(toMessageView(mine, admin).canApprove).toBe(true);
      expect(view.threadLabel).toMatch(/^Thread pulled/);
    });
  });

  it('cuts previews on a word', () => {
    expect(preview('short')).toBe('short');
    const p = preview('Hi Martin, I saw Kessler Werkzeugbau and the press line you built for a toolmaker near Stuttgart and more words');
    expect(p.endsWith('...')).toBe(true);
    expect(p.length).toBeLessThanOrEqual(93);
  });
});
