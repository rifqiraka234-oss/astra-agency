import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { closePool, getPool, withContactLock, withTransaction } from './client.js';
import { migrate } from './migrate.js';
import {
  createApproval,
  createOutboundIntent,
  decideApproval,
  enqueueNotification,
  getOrCreateConversation,
  insertWebhookEvent,
  reserveSlot,
  scheduleProcessing,
  staleApprovalsForConversation,
  upsertContact,
} from './repositories.js';
import { encryptSecret, decryptSecret, loadEncryptionKey } from './crypto.js';

/**
 * Integration tests against a real Postgres. They exist to prove the
 * *database* enforces idempotency and mutual exclusion, not just the
 * application code: a constraint that only lives in TypeScript is a
 * constraint two concurrent workers can walk straight through.
 *
 * Skipped automatically when no database is reachable, so `npm test` still
 * works on a machine with nothing running.
 */

const databaseUrl = process.env['DATABASE_URL'] ?? '';
let available = false;

beforeAll(async () => {
  if (!databaseUrl) return;
  try {
    await getPool().query('SELECT 1');
    await migrate();
    available = true;
  } catch {
    available = false;
  }
}, 30_000);

afterAll(async () => {
  if (available) await closePool();
});

beforeEach(async () => {
  if (!available) return;
  await getPool().query(
    `TRUNCATE approvals, outbound_intents, slot_reservations, calendar_events,
       notifications, processing_jobs, webhook_events, messages, conversations,
       leads, contacts, decisions, audit_events, operators RESTART IDENTITY CASCADE`,
  );
});

/**
 * Report an unreachable database as a *skip*, never as a pass. These tests
 * exist to prove the database enforces the constraints; a vacuous pass would
 * claim that proof without having made it.
 */
const requireDatabase = (ctx: { skip: (note?: string) => void }): boolean => {
  if (!available) {
    ctx.skip('no database reachable at DATABASE_URL');
    return false;
  }
  return true;
};

describe('webhook idempotency', () => {
  it('collapses a duplicate delivery into one row', async (ctx) => {
    if (!requireDatabase(ctx)) return;
    const payload = {
      idempotencyKey: 'act_duplicate',
      eventType: 'linkedinReplied',
      teamId: 'tea_1',
      campaignId: 'cam_1',
      leadId: 'lea_1',
      contactId: 'con_1',
      isThirdPartyReply: false,
      rawPayload: { _id: 'act_duplicate' },
      sanitizedPayload: { type: 'linkedinReplied' },
    };
    const first = await insertWebhookEvent(getPool(), payload);
    const second = await insertWebhookEvent(getPool(), payload);

    expect(first.duplicate).toBe(false);
    expect(second.duplicate).toBe(true);
    expect(second.id).toBe(first.id);

    const count = await getPool().query('SELECT count(*)::int AS n FROM webhook_events');
    expect(count.rows[0]?.n).toBe(1);
  });
});

describe('debounce scheduling', () => {
  it('extends the existing job rather than creating a second one', async (ctx) => {
    if (!requireDatabase(ctx)) return;
    const contact = await upsertContact(getPool(), { lemlistContactId: 'con_debounce' });

    const early = new Date('2026-08-11T10:00:00Z');
    const later = new Date('2026-08-11T10:01:30Z');

    const first = await scheduleProcessing(getPool(), {
      contactId: contact.id,
      processAfter: early,
      correlationId: 'cor_1',
    });
    const second = await scheduleProcessing(getPool(), {
      contactId: contact.id,
      processAfter: later,
      correlationId: 'cor_2',
    });

    expect(second.id).toBe(first.id);
    expect(second.processAfter.toISOString()).toBe(later.toISOString());

    const rows = await getPool().query('SELECT count(*)::int AS n FROM processing_jobs');
    expect(rows.rows[0]?.n).toBe(1);
  });

  it('never moves the deadline backwards', async (ctx) => {
    if (!requireDatabase(ctx)) return;
    const contact = await upsertContact(getPool(), { lemlistContactId: 'con_backwards' });
    await scheduleProcessing(getPool(), {
      contactId: contact.id,
      processAfter: new Date('2026-08-11T10:05:00Z'),
      correlationId: 'cor_1',
    });
    const second = await scheduleProcessing(getPool(), {
      contactId: contact.id,
      processAfter: new Date('2026-08-11T10:00:00Z'),
      correlationId: 'cor_2',
    });
    expect(second.processAfter.toISOString()).toBe('2026-08-11T10:05:00.000Z');
  });
});

describe('per-contact locking', () => {
  it('lets only one worker hold a contact at a time', async (ctx) => {
    if (!requireDatabase(ctx)) return;
    let innerAcquired: boolean | null = null;

    const outer = await withContactLock('con_locked', async () => {
      const inner = await withContactLock('con_locked', async () => 'should not run');
      innerAcquired = inner.acquired;
      return 'outer ran';
    });

    expect(outer.acquired).toBe(true);
    expect(innerAcquired).toBe(false);
  });

  it('releases the lock so a later worker can proceed', async (ctx) => {
    if (!requireDatabase(ctx)) return;
    await withContactLock('con_sequential', async () => 'first');
    const second = await withContactLock('con_sequential', async () => 'second');
    expect(second.acquired).toBe(true);
  });
});

describe('outbound idempotency', () => {
  it('refuses to create a second intent for the same idempotency key', async (ctx) => {
    if (!requireDatabase(ctx)) return;
    const contact = await upsertContact(getPool(), { lemlistContactId: 'con_outbound' });
    const conversation = await getOrCreateConversation(getPool(), contact.id, 'cam_1');

    const input = {
      conversationId: conversation.id,
      channel: 'linkedin' as const,
      actionType: 'SIMPLE_ACKNOWLEDGEMENT',
      bodyText: 'Thanks, noted.',
      contentHash: 'hash_a',
      idempotencyKey: 'idem_a',
      correlationId: 'cor_1',
    };

    const first = await createOutboundIntent(getPool(), input);
    const second = await createOutboundIntent(getPool(), input);

    expect(first.created).toBe(true);
    expect(second.created).toBe(false);
    expect(second.id).toBe(first.id);
  });
});

describe('slot reservations', () => {
  it('rejects an overlapping live reservation', async (ctx) => {
    if (!requireDatabase(ctx)) return;
    const contactA = await upsertContact(getPool(), { lemlistContactId: 'con_slot_a' });
    const contactB = await upsertContact(getPool(), { lemlistContactId: 'con_slot_b' });
    const conversationA = await getOrCreateConversation(getPool(), contactA.id, 'cam_1');
    const conversationB = await getOrCreateConversation(getPool(), contactB.id, 'cam_1');

    const start = new Date('2026-08-12T12:00:00Z');
    const end = new Date('2026-08-12T12:20:00Z');
    const expiresAt = new Date('2026-08-13T12:00:00Z');

    const first = await reserveSlot(getPool(), {
      conversationId: conversationA.id,
      availabilityQueryId: null,
      start,
      end,
      expiresAt,
    });
    const second = await reserveSlot(getPool(), {
      conversationId: conversationB.id,
      availabilityQueryId: null,
      start: new Date('2026-08-12T12:10:00Z'),
      end: new Date('2026-08-12T12:30:00Z'),
      expiresAt,
    });

    expect('id' in first).toBe(true);
    expect('conflict' in second && second.conflict).toBe(true);
  });

  it('allows a non-overlapping reservation', async (ctx) => {
    if (!requireDatabase(ctx)) return;
    const contact = await upsertContact(getPool(), { lemlistContactId: 'con_slot_c' });
    const conversation = await getOrCreateConversation(getPool(), contact.id, 'cam_1');
    const expiresAt = new Date('2026-08-13T12:00:00Z');

    await reserveSlot(getPool(), {
      conversationId: conversation.id,
      availabilityQueryId: null,
      start: new Date('2026-08-12T12:00:00Z'),
      end: new Date('2026-08-12T12:20:00Z'),
      expiresAt,
    });
    const second = await reserveSlot(getPool(), {
      conversationId: conversation.id,
      availabilityQueryId: null,
      start: new Date('2026-08-12T13:00:00Z'),
      end: new Date('2026-08-12T13:20:00Z'),
      expiresAt,
    });
    expect('id' in second).toBe(true);
  });
});

describe('approvals', () => {
  const approvalInput = (conversationId: string, overrides: Record<string, unknown> = {}) => ({
    conversationId,
    actionType: 'SEND_PROTOTYPE_LINK',
    bindingKey: 'binding_1',
    sourceLatestInboundMessageId: 'act_5',
    conversationHash: 'hash_conv',
    replyText: 'Here you go.',
    replyContentHash: 'hash_reply',
    policyVersion: '2026-08-11.1',
    promptVersion: 'reply-drafting@1.0.0',
    expiresAt: new Date('2026-08-14T10:00:00Z'),
    correlationId: 'cor_1',
    ...overrides,
  });

  it('supersedes the previous open approval when a revision is requested', async (ctx) => {
    if (!requireDatabase(ctx)) return;
    const contact = await upsertContact(getPool(), { lemlistContactId: 'con_approval' });
    const conversation = await getOrCreateConversation(getPool(), contact.id, 'cam_1');

    const first = await createApproval(getPool(), approvalInput(conversation.id));
    const second = await createApproval(
      getPool(),
      approvalInput(conversation.id, { replyContentHash: 'hash_reply_v2', bindingKey: 'binding_2' }),
    );

    expect(second.version).toBe(first.version + 1);

    const rows = await getPool().query<{ status: string }>(
      'SELECT status FROM approvals WHERE id = $1',
      [first.id],
    );
    expect(rows.rows[0]?.status).toBe('SUPERSEDED');
  });

  it('makes approving twice a no-op rather than a second authorization', async (ctx) => {
    if (!requireDatabase(ctx)) return;
    const contact = await upsertContact(getPool(), { lemlistContactId: 'con_approval_2' });
    const conversation = await getOrCreateConversation(getPool(), contact.id, 'cam_1');
    const operator = await getPool().query<{ id: string }>(
      `INSERT INTO operators (email) VALUES ('op@example.test') RETURNING id`,
    );
    const operatorId = operator.rows[0]?.id ?? '';

    const approval = await createApproval(getPool(), approvalInput(conversation.id));
    const first = await decideApproval(getPool(), {
      approvalId: approval.id,
      status: 'APPROVED',
      operatorId,
    });
    const second = await decideApproval(getPool(), {
      approvalId: approval.id,
      status: 'APPROVED',
      operatorId,
    });

    expect(first?.status).toBe('APPROVED');
    expect(second).toBeNull();
  });

  it('marks every open approval stale when a new message arrives', async (ctx) => {
    if (!requireDatabase(ctx)) return;
    const contact = await upsertContact(getPool(), { lemlistContactId: 'con_approval_3' });
    const conversation = await getOrCreateConversation(getPool(), contact.id, 'cam_1');
    await createApproval(getPool(), approvalInput(conversation.id));

    const staled = await staleApprovalsForConversation(
      getPool(),
      conversation.id,
      'new inbound message',
    );
    expect(staled).toBe(1);
  });
});

describe('notification cooldown', () => {
  it('suppresses a repeat notification inside the cooldown window', async (ctx) => {
    if (!requireDatabase(ctx)) return;
    const input = {
      conversationId: null,
      kind: 'HUMAN_HANDOFF',
      severity: 'WARN' as const,
      recipient: 'operator@example.test',
      subject: 'Handoff',
      body: 'A conversation needs you.',
      dedupeKey: 'handoff:con_1:EXTERNAL_CONTEXT',
      cooldownMinutes: 60,
    };
    const first = await enqueueNotification(getPool(), input);
    const second = await enqueueNotification(getPool(), input);

    expect(first.suppressed).toBe(false);
    expect(second.suppressed).toBe(true);
  });
});

describe('transactions', () => {
  it('rolls back every write when the callback throws', async (ctx) => {
    if (!requireDatabase(ctx)) return;
    await expect(
      withTransaction(async (client) => {
        await client.query(
          `INSERT INTO contacts (lemlist_contact_id) VALUES ('con_rollback')`,
        );
        throw new Error('policy check failed after the write');
      }),
    ).rejects.toThrow('policy check failed');

    const rows = await getPool().query(
      `SELECT 1 FROM contacts WHERE lemlist_contact_id = 'con_rollback'`,
    );
    expect(rows.rowCount).toBe(0);
  });
});

describe('credential encryption', () => {
  const key = loadEncryptionKey(Buffer.alloc(32, 3).toString('base64'));

  it('round-trips a refresh token', () => {
    const token = '1//0abcdefghijklmnopqrstuvwxyz';
    expect(decryptSecret(encryptSecret(token, key), key)).toBe(token);
  });

  it('produces different ciphertext for the same plaintext', () => {
    expect(encryptSecret('same', key)).not.toBe(encryptSecret('same', key));
  });

  it('refuses to decrypt tampered ciphertext', () => {
    const payload = encryptSecret('secret value', key);
    const parts = payload.split('.');
    const tampered = [parts[0], parts[1], parts[2], Buffer.from('evil').toString('base64url')].join('.');
    expect(() => decryptSecret(tampered, key)).toThrow();
  });

  it('refuses a key that is too short', () => {
    expect(() => loadEncryptionKey(Buffer.alloc(16, 1).toString('base64'))).toThrow(
      /at least 32 bytes/,
    );
  });
});
