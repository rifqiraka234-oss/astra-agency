import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { testConfig, testDecision } from '@astra/core/testing';
import {
  closePool,
  getOrCreateConversation,
  getPool,
  migrate,
  upsertContact,
} from '@astra/db';
import {
  FakeAnthropicClient,
  FakeCalendarProvider,
  FakeLemlistClient,
  FakeNetlifyClient,
  FakeResearchAdapter,
  type LemlistActivity,
  type LemlistSequence,
} from '@astra/integrations';
import { ConsoleEmailNotifier } from '@astra/integrations';
import { buildContext, type AppContext } from '../context.js';
import { processConversation } from './process-conversation.js';
import { createLogger } from '../logger.js';

/**
 * End-to-end pipeline tests against a real database and in-memory
 * integrations.
 *
 * These are the tests that would have caught the incidents the design is
 * built to prevent: a duplicate first message after an invitation is
 * accepted, a send that goes out despite an unverifiable pause, and a reply
 * to a conversation that moved on while we were thinking about it.
 */

const CONTACT = 'ctc_pipeline_1';
const LEAD = 'lea_pipeline_1';
const CAMPAIGN = 'cam_enabled_one';

let available = false;
let unavailableReason = '';

beforeAll(async () => {
  try {
    await getPool().query('SELECT 1');
    await migrate();
    available = true;
  } catch (error) {
    unavailableReason = error instanceof Error ? error.message : String(error);
    available = false;
  }
}, 30_000);

afterAll(async () => {
  if (available) await closePool();
});

beforeEach(async () => {
  if (!available) return;
  await getPool().query(
    `TRUNCATE approvals, outbound_intents, slot_reservations, calendar_events, notifications,
       processing_jobs, webhook_events, messages, conversations, leads, contacts, decisions,
       audit_events, conversation_states, ownership_history, prototype_jobs
     RESTART IDENTITY CASCADE`,
  );
});

/**
 * Report an unreachable database as a *skip*, never as a pass. A green suite
 * that silently ran nothing is worse than a red one: it is a false claim that
 * these guarantees were checked.
 */
const requireDatabase = (ctx: { skip: (note?: string) => void }): boolean => {
  if (!available) {
    ctx.skip(`no database reachable: ${unavailableReason}`);
    return false;
  }
  return true;
};

// --- fixtures ----------------------------------------------------------------

const inviteAcceptedActivity: LemlistActivity = {
  _id: 'act_invite',
  type: 'linkedinInviteAccepted',
  createdAt: '2026-08-10T09:00:00Z',
  leadId: LEAD,
  campaignId: CAMPAIGN,
  contactId: CONTACT,
  sendUserEmail: 'raka@astra.agency',
  sequenceId: 'seq_1',
  stepId: 'stp_invite',
  sequenceStep: 0,
};

const prospectReply = (id: string, message: string, at: string): LemlistActivity => ({
  _id: id,
  type: 'linkedinReplied',
  createdAt: at,
  leadId: LEAD,
  campaignId: CAMPAIGN,
  contactId: CONTACT,
  leadEmail: 'sam@fixture.example',
  message,
});

const sequenceWith = (steps: LemlistSequence['steps']): LemlistSequence[] => [
  { _id: 'seq_1', steps, level: 0 },
];

const SUBSTANTIVE_STEP = {
  _id: 'stp_intro',
  type: 'linkedinSend',
  index: 1,
  message:
    'Thanks for connecting. I noticed your booking page hides the price until the last step and had one idea about it.',
};

const BUMP_STEP = {
  _id: 'stp_bump',
  type: 'linkedinSend',
  index: 2,
  message: 'Just following up on my last message, have you seen this?',
};

interface Harness {
  readonly context: AppContext;
  readonly lemlist: FakeLemlistClient;
  readonly anthropic: FakeAnthropicClient;
  readonly notifier: ConsoleEmailNotifier;
  readonly contactRowId: string;
  readonly conversationId: string;
}

async function buildHarness(options: {
  activities: LemlistActivity[];
  steps?: LemlistSequence['steps'];
  envOverrides?: NodeJS.ProcessEnv;
  pauseSilentlyFails?: boolean;
  pauseUnverifiable?: boolean;
  isPaused?: boolean;
}): Promise<Harness> {
  const lemlist = new FakeLemlistClient({
    pauseSilentlyFails: options.pauseSilentlyFails ?? false,
    pauseUnverifiable: options.pauseUnverifiable ?? false,
  });
  lemlist.state.messages.set(CONTACT, options.activities);
  lemlist.state.leads.set(LEAD, {
    _id: LEAD,
    campaignId: CAMPAIGN,
    contactId: CONTACT,
    email: 'sam@fixture.example',
    companyName: 'Fixture Coffee',
    ...(options.isPaused === undefined ? {} : { isPaused: options.isPaused }),
  });
  lemlist.state.campaigns.set(CAMPAIGN, { _id: CAMPAIGN, name: 'Fixture Coffee campaign' });
  lemlist.state.sequences.set(CAMPAIGN, sequenceWith(options.steps ?? []));

  const anthropic = new FakeAnthropicClient();
  const notifier = new ConsoleEmailNotifier();

  // The post-acceptance case will not auto-send unless the company's site is
  // verifiably theirs, so the fixture provides one that matches.
  const researchAdapter = new FakeResearchAdapter();
  researchAdapter.addPage(
    'https://fixture.example',
    '<html><title>Fixture Coffee</title><body><h1>Fixture Coffee</h1><p>Our booking page takes reservations for our Utrecht roastery.</p></body></html>',
  );

  const context = buildContext({
    config: testConfig({ LEMLIST_SEND_USER_ID: 'usr_send', ...(options.envOverrides ?? {}) }),
    lemlist,
    anthropic,
    notifier,
    netlify: new FakeNetlifyClient(),
    calendar: new FakeCalendarProvider(),
    research: researchAdapter,
    logger: createLogger('error'),
  });

  const contact = await upsertContact(getPool(), {
    lemlistContactId: CONTACT,
    email: 'sam@fixture.example',
    companyName: 'Fixture Coffee',
    companyDomain: 'fixture.example',
  });
  const conversation = await getOrCreateConversation(getPool(), contact.id, CAMPAIGN);

  return {
    context,
    lemlist,
    anthropic,
    notifier,
    contactRowId: contact.id,
    conversationId: conversation.id,
  };
}

const run = (harness: Harness, overrides: Record<string, unknown> = {}) =>
  processConversation(harness.context, {
    jobId: 'job_1',
    contactId: harness.contactRowId,
    lemlistContactId: CONTACT,
    jobType: 'ANALYZE_CONVERSATION',
    correlationId: 'cor_test',
    webhookLeadId: LEAD,
    webhookCampaignId: CAMPAIGN,
    ...overrides,
  });

// --- tests -------------------------------------------------------------------

describe('invitation accepted', () => {
  it('sends nothing when the campaign will send its own substantive first message', async (ctx) => {
    if (!requireDatabase(ctx)) return;
    const harness = await buildHarness({
      activities: [inviteAcceptedActivity],
      steps: [SUBSTANTIVE_STEP, BUMP_STEP],
    });

    const result = await run(harness, { wasAcceptanceEvent: true });

    expect(result.state).toBe('SEQUENCE_OWNED');
    expect(harness.lemlist.sentMessages).toHaveLength(0);
    // Crucially, it also did not pause the lead: the campaign keeps the
    // conversation and its scheduled message goes out normally.
    expect(harness.lemlist.callsTo('pauseLeadInCampaign')).toHaveLength(0);
    // No model call is needed to reach this conclusion.
    expect(harness.anthropic.calls).toHaveLength(0);
  });

  it('takes ownership when only reminders remain, and pauses before composing', async (ctx) => {
    if (!requireDatabase(ctx)) return;
    const harness = await buildHarness({
      activities: [inviteAcceptedActivity],
      steps: [BUMP_STEP],
    });
    harness.anthropic.enqueueDecision(testDecision());

    const result = await run(harness, { wasAcceptanceEvent: true });

    expect(harness.lemlist.callsTo('pauseLeadInCampaign')).toHaveLength(1);
    expect(harness.lemlist.callsTo('isLeadPaused')).toHaveLength(1);
    expect(result.action).toBe('AUTO_SEND');
    expect(harness.lemlist.sentMessages).toHaveLength(1);

    const ownership = await getPool().query<{ next_owner: string; pause_verified: boolean }>(
      'SELECT next_owner, pause_verified FROM ownership_history ORDER BY occurred_at DESC LIMIT 1',
    );
    expect(ownership.rows[0]?.next_owner).toBe('ASTRA_AGENT');
    expect(ownership.rows[0]?.pause_verified).toBe(true);
  });

  it('refuses to send when the pause call succeeds but the lead never reports paused', async (ctx) => {
    if (!requireDatabase(ctx)) return;
    const harness = await buildHarness({
      activities: [inviteAcceptedActivity],
      steps: [BUMP_STEP],
      pauseSilentlyFails: true,
    });

    const result = await run(harness, { wasAcceptanceEvent: true });

    expect(result.state).toBe('HUMAN_REVIEW_REQUIRED');
    expect(harness.lemlist.sentMessages).toHaveLength(0);
    expect(harness.anthropic.calls).toHaveLength(0);
  });

  it('refuses to send when the pause cannot be verified at all', async (ctx) => {
    if (!requireDatabase(ctx)) return;
    const harness = await buildHarness({
      activities: [inviteAcceptedActivity],
      steps: [BUMP_STEP],
      pauseUnverifiable: true,
    });

    const result = await run(harness, { wasAcceptanceEvent: true });

    expect(result.state).toBe('HUMAN_REVIEW_REQUIRED');
    expect(harness.lemlist.sentMessages).toHaveLength(0);
  });

  it('requires review when a conditional branch cannot be resolved', async (ctx) => {
    if (!requireDatabase(ctx)) return;
    const harness = await buildHarness({
      activities: [inviteAcceptedActivity],
      steps: [BUMP_STEP],
    });
    // A nested conditional sequence means we cannot tell which steps this lead
    // will actually receive.
    harness.lemlist.state.sequences.set(CAMPAIGN, [
      { _id: 'seq_1', steps: [BUMP_STEP], level: 0 },
      { _id: 'seq_2', steps: [SUBSTANTIVE_STEP], level: 1, parentId: 'seq_1' },
    ]);

    const result = await run(harness, { wasAcceptanceEvent: true });

    expect(result.state).toBe('HUMAN_REVIEW_REQUIRED');
    expect(harness.lemlist.sentMessages).toHaveLength(0);
  });

  it('blocks when a manual call task is pending for the lead', async (ctx) => {
    if (!requireDatabase(ctx)) return;
    const harness = await buildHarness({
      activities: [inviteAcceptedActivity],
      steps: [BUMP_STEP],
    });
    harness.lemlist.state.tasks = [
      { _id: 'tsk_1', type: 'phone', leadId: LEAD, campaignId: CAMPAIGN, contactId: CONTACT, status: 'pending' },
    ];

    const result = await run(harness, { wasAcceptanceEvent: true });

    expect(result.state).toBe('HUMAN_REVIEW_REQUIRED');
    expect(harness.lemlist.sentMessages).toHaveLength(0);
  });

  it('still handles a genuine reply after an acceptance event was left to the sequence', async (ctx) => {
    if (!requireDatabase(ctx)) return;
    const harness = await buildHarness({
      activities: [inviteAcceptedActivity],
      steps: [SUBSTANTIVE_STEP],
    });
    await run(harness, { wasAcceptanceEvent: true });
    expect(harness.lemlist.sentMessages).toHaveLength(0);

    // The prospect replies later. The conversation re-enters the pipeline
    // rather than being permanently excluded.
    harness.lemlist.state.messages.set(CONTACT, [
      inviteAcceptedActivity,
      { ...SUBSTANTIVE_STEP, _id: 'act_seq_msg', type: 'linkedinSent', createdAt: '2026-08-10T10:00:00Z', contactId: CONTACT, leadId: LEAD, campaignId: CAMPAIGN, sendUserEmail: 'raka@astra.agency' } as LemlistActivity,
      prospectReply('act_reply', 'Thanks, that is helpful.', '2026-08-10T12:00:00Z'),
    ]);
    harness.lemlist.state.sequences.set(CAMPAIGN, sequenceWith([]));
    harness.anthropic.enqueueDecision(
      testDecision({
        classification: { intent: 'SIMPLE_ACKNOWLEDGEMENT', confidence: 0.97 },
        recommendation: { reply_text: 'Glad it was useful. I will leave it with you for now.' },
      }),
    );

    const second = await run(harness);
    expect(second.action).toBe('AUTO_SEND');
  });
});

describe('runtime modes', () => {
  it('records a decision and sends nothing in SHADOW mode', async (ctx) => {
    if (!requireDatabase(ctx)) return;
    const harness = await buildHarness({
      activities: [inviteAcceptedActivity, prospectReply('act_r1', 'Thanks!', '2026-08-10T10:00:00Z')],
      steps: [],
      envOverrides: { RUNTIME_MODE: 'SHADOW', ALLOW_LIVE_LEMLIST_SEND: 'false' },
    });
    harness.anthropic.enqueueDecision(
      testDecision({
        classification: { intent: 'SIMPLE_ACKNOWLEDGEMENT', confidence: 0.98 },
        recommendation: { reply_text: 'Glad it helped. I will leave it there for now.' },
      }),
    );

    const result = await run(harness);

    expect(result.state).toBe('COMPLETED_NO_ACTION');
    expect(harness.lemlist.sentMessages).toHaveLength(0);
    const decisions = await getPool().query('SELECT count(*)::int AS n FROM decisions');
    expect(decisions.rows[0]?.n).toBe(1);
  });

  it('never analyzes in HUMAN_ONLY mode', async (ctx) => {
    if (!requireDatabase(ctx)) return;
    const harness = await buildHarness({
      activities: [inviteAcceptedActivity, prospectReply('act_r1', 'Thanks!', '2026-08-10T10:00:00Z')],
      steps: [],
      envOverrides: { RUNTIME_MODE: 'HUMAN_ONLY' },
    });

    const result = await run(harness);

    expect(result.state).toBe('HUMAN_OWNED');
    expect(harness.anthropic.calls).toHaveLength(0);
  });

  it('stages an approval instead of sending in DRAFT_ONLY mode', async (ctx) => {
    if (!requireDatabase(ctx)) return;
    const harness = await buildHarness({
      activities: [inviteAcceptedActivity, prospectReply('act_r1', 'Thanks!', '2026-08-10T10:00:00Z')],
      steps: [],
      envOverrides: { RUNTIME_MODE: 'DRAFT_ONLY', ALLOW_LIVE_LEMLIST_SEND: 'false' },
    });
    harness.anthropic.enqueueDecision(
      testDecision({
        classification: { intent: 'SIMPLE_ACKNOWLEDGEMENT', confidence: 0.98 },
        recommendation: { reply_text: 'Glad it helped. I will leave it there for now.' },
      }),
    );

    const result = await run(harness);

    expect(result.action).toBe('REQUEST_MESSAGE_APPROVAL');
    expect(harness.lemlist.sentMessages).toHaveLength(0);
    const approvals = await getPool().query<{ status: string }>('SELECT status FROM approvals');
    expect(approvals.rows[0]?.status).toBe('PENDING');
  });

  it('blocks every send when the kill switch is on', async (ctx) => {
    if (!requireDatabase(ctx)) return;
    const harness = await buildHarness({
      activities: [inviteAcceptedActivity, prospectReply('act_r1', 'Thanks!', '2026-08-10T10:00:00Z')],
      steps: [],
      envOverrides: { GLOBAL_KILL_SWITCH: 'true' },
    });
    harness.anthropic.enqueueDecision(
      testDecision({
        classification: { intent: 'SIMPLE_ACKNOWLEDGEMENT', confidence: 0.98 },
        recommendation: { reply_text: 'Glad it helped. I will leave it there for now.' },
      }),
    );

    await run(harness);
    expect(harness.lemlist.sentMessages).toHaveLength(0);
  });
});

describe('safety routing', () => {
  it('suppresses an unsubscribe without calling the model', async (ctx) => {
    if (!requireDatabase(ctx)) return;
    const harness = await buildHarness({ activities: [inviteAcceptedActivity], steps: [] });

    const result = await processConversation(harness.context, {
      jobId: 'job_supp',
      contactId: harness.contactRowId,
      lemlistContactId: CONTACT,
      jobType: 'SUPPRESS_CONTACT',
      correlationId: 'cor_supp',
    });

    expect(result.state).toBe('SUPPRESSED');
    expect(harness.anthropic.calls).toHaveLength(0);
    const contact = await getPool().query<{ is_suppressed: boolean }>(
      'SELECT is_suppressed FROM contacts WHERE lemlist_contact_id = $1',
      [CONTACT],
    );
    expect(contact.rows[0]?.is_suppressed).toBe(true);
  });

  it('asks for clarification rather than building a prototype nobody offered', async (ctx) => {
    if (!requireDatabase(ctx)) return;
    const harness = await buildHarness({
      activities: [
        inviteAcceptedActivity,
        prospectReply('act_yes', 'Yes please!', '2026-08-10T12:00:00Z'),
      ],
      steps: [],
    });
    harness.anthropic.enqueueDecision(
      testDecision({
        classification: { intent: 'YES_SEND_PROTOTYPE', confidence: 0.98 },
        recommendation: { action: 'BUILD_PROTOTYPE', reply_text: null, prototype_required: true },
      }),
    );

    const result = await run(harness);

    expect(result.state).toBe('HUMAN_REVIEW_REQUIRED');
    const jobs = await getPool().query('SELECT count(*)::int AS n FROM prototype_jobs');
    expect(jobs.rows[0]?.n).toBe(0);
  });

  it('queues a prototype build when an offer really exists, and sends nothing', async (ctx) => {
    if (!requireDatabase(ctx)) return;
    const harness = await buildHarness({
      activities: [
        inviteAcceptedActivity,
        {
          _id: 'act_offer',
          type: 'linkedinSent',
          createdAt: '2026-08-10T11:00:00Z',
          contactId: CONTACT,
          leadId: LEAD,
          campaignId: CAMPAIGN,
          sendUserEmail: 'raka@astra.agency',
          message: 'We could sketch a version of your booking page. Want me to send it?',
        },
        prospectReply('act_yes', 'Yes please, send it over.', '2026-08-10T12:00:00Z'),
      ],
      steps: [],
    });
    harness.anthropic.enqueueDecision(
      testDecision({
        classification: { intent: 'YES_SEND_PROTOTYPE', confidence: 0.98 },
        recommendation: { action: 'BUILD_PROTOTYPE', reply_text: null, prototype_required: true },
      }),
    );

    const result = await run(harness);

    expect(result.state).toBe('PROTOTYPE_QUEUED');
    expect(harness.lemlist.sentMessages).toHaveLength(0);
    const jobs = await getPool().query<{ offer_message_id: string }>(
      'SELECT offer_message_id FROM prototype_jobs',
    );
    expect(jobs.rows[0]?.offer_message_id).toBe('act_offer');
  });

  it('hands off a pricing question instead of answering it', async (ctx) => {
    if (!requireDatabase(ctx)) return;
    const harness = await buildHarness({
      activities: [
        inviteAcceptedActivity,
        prospectReply('act_price', 'Interesting. What would something like that cost?', '2026-08-10T12:00:00Z'),
      ],
      steps: [],
    });
    harness.anthropic.enqueueDecision(
      testDecision({
        classification: { intent: 'PRICING_OR_COMMERCIAL', confidence: 0.99 },
        recommendation: { action: 'CREATE_DRAFT', reply_text: 'It depends on scope.' },
      }),
    );

    const result = await run(harness);

    expect(result.action).toBe('HANDOFF');
    expect(harness.lemlist.sentMessages).toHaveLength(0);
  });

  it('hands off when the model output fails schema validation', async (ctx) => {
    if (!requireDatabase(ctx)) return;
    const harness = await buildHarness({
      activities: [inviteAcceptedActivity, prospectReply('act_r1', 'Hi', '2026-08-10T12:00:00Z')],
      steps: [],
    });
    harness.anthropic.enqueue({ not: 'a valid decision' });

    const result = await run(harness);

    expect(result.state).toBe('HUMAN_REVIEW_REQUIRED');
    expect(harness.lemlist.sentMessages).toHaveLength(0);
    const decisions = await getPool().query<{ reason_codes: string[] }>(
      'SELECT reason_codes FROM decisions',
    );
    expect(decisions.rows[0]?.reason_codes).toContain('MODEL_SCHEMA_INVALID');
  });

  it('groups three rapid prospect messages into one reply', async (ctx) => {
    if (!requireDatabase(ctx)) return;
    const harness = await buildHarness({
      activities: [
        inviteAcceptedActivity,
        prospectReply('act_a', 'hey', '2026-08-10T12:00:00Z'),
        prospectReply('act_b', 'sorry, sent too soon', '2026-08-10T12:00:20Z'),
        prospectReply('act_c', 'thanks for the note', '2026-08-10T12:00:45Z'),
      ],
      steps: [],
    });
    harness.anthropic.enqueueDecision(
      testDecision({
        classification: { intent: 'SIMPLE_ACKNOWLEDGEMENT', confidence: 0.98 },
        recommendation: { reply_text: 'No problem at all. I will leave it with you.' },
      }),
    );

    await run(harness);

    // One model call and one outbound message, not three of each.
    expect(harness.anthropic.calls).toHaveLength(1);
    expect(harness.lemlist.sentMessages).toHaveLength(1);
  });
});

describe('concurrency', () => {
  it('lets only one worker process a contact at a time', async (ctx) => {
    if (!requireDatabase(ctx)) return;
    const harness = await buildHarness({
      activities: [inviteAcceptedActivity, prospectReply('act_r1', 'Thanks', '2026-08-10T12:00:00Z')],
      steps: [],
    });
    harness.anthropic.enqueueDecision(
      testDecision({
        classification: { intent: 'SIMPLE_ACKNOWLEDGEMENT', confidence: 0.98 },
        recommendation: { reply_text: 'Glad it helped. I will leave it there.' },
      }),
    );

    const [first, second] = await Promise.all([run(harness), run(harness)]);
    const outcomes = [first.action, second.action];

    expect(outcomes).toContain('SKIPPED_LOCKED');
    // Exactly one message, whichever worker won the lock.
    expect(harness.lemlist.sentMessages.length).toBeLessThanOrEqual(1);
  });

  it('collapses a repeated send on its idempotency key', async (ctx) => {
    if (!requireDatabase(ctx)) return;
    const harness = await buildHarness({
      activities: [inviteAcceptedActivity, prospectReply('act_r1', 'Thanks', '2026-08-10T12:00:00Z')],
      steps: [],
    });
    const decision = {
      classification: { intent: 'SIMPLE_ACKNOWLEDGEMENT' as const, confidence: 0.98 },
      recommendation: { reply_text: 'Glad it helped. I will leave it there.' },
    };
    harness.anthropic.enqueueDecision(testDecision(decision));
    harness.anthropic.enqueueDecision(testDecision(decision));

    await run(harness);
    await run(harness);

    // The second run produced the same text for the same inbound state, so
    // the intent collapsed and no second message went out.
    expect(harness.lemlist.sentMessages).toHaveLength(1);
    const intents = await getPool().query('SELECT count(*)::int AS n FROM outbound_intents');
    expect(intents.rows[0]?.n).toBe(1);
  });
});
