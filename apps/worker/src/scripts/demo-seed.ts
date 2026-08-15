import { loadEnvFile } from '@astra/core';
import { testDecision } from '@astra/core/testing';
import { buildConfig, envSchema } from '@astra/core';
import { closePool, getOrCreateConversation, getPool, migrate, upsertContact } from '@astra/db';
import {
  ConsoleEmailNotifier,
  FakeAnthropicClient,
  FakeCalendarProvider,
  FakeLemlistClient,
  FakeNetlifyClient,
  FakeResearchAdapter,
  type LemlistActivity,
} from '@astra/integrations';
import { buildContext } from '../context.js';
import { processConversation } from '../pipeline/process-conversation.js';
import { createLogger } from '../logger.js';

// The worker is a plain Node process: unlike Next.js it does not read .env
// on its own, so config validation would fail on a fresh shell without this.
loadEnvFile();

/**
 * Populates a local database by running the *real* pipeline against in-memory
 * integrations.
 *
 * Deliberately not a pile of INSERT statements: every conversation below is
 * produced by the same controller, policy engine and state machine that would
 * run in production, so what the dashboard shows is genuinely what the system
 * decided, predicate log and all. Nothing here can reach a real prospect: the
 * Lemlist client is a fake and live sending is off.
 */

const CAMPAIGN = 'cam_demo';

const config = buildConfig(
  envSchema.parse({
    ...process.env,
    // DRAFT_ONLY so the demo produces approvals to look at rather than sends.
    RUNTIME_MODE: 'DRAFT_ONLY',
    GLOBAL_KILL_SWITCH: 'false',
    ALLOW_LIVE_LEMLIST_SEND: 'false',
    ENABLED_CAMPAIGN_IDS: CAMPAIGN,
    LEMLIST_SEND_USER_ID: 'usr_demo',
    LEMLIST_DRAFT_OWNER: '',
  }),
);

await migrate();

interface DemoCase {
  readonly contactId: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly company: string;
  readonly domain: string;
  readonly activities: readonly LemlistActivity[];
  readonly decision: Parameters<typeof testDecision>[0];
  readonly wasAcceptance?: boolean;
  readonly note: string;
}

const outbound = (id: string, at: string, message: string): LemlistActivity => ({
  _id: id,
  type: 'linkedinSent',
  createdAt: at,
  contactId: '',
  campaignId: CAMPAIGN,
  sendUserEmail: 'raka@astra.agency',
  message,
});

const inbound = (id: string, at: string, message: string): LemlistActivity => ({
  _id: id,
  type: 'linkedinReplied',
  createdAt: at,
  campaignId: CAMPAIGN,
  message,
});

const cases: DemoCase[] = [
  {
    contactId: 'ctc_demo_objection',
    firstName: 'Sanne',
    lastName: 'de Vries',
    company: 'Fixture Coffee',
    domain: 'fixture.example',
    note: 'An objection: drafted for approval, never sent automatically.',
    activities: [
      outbound(
        'act_1',
        '2026-08-10T09:00:00Z',
        'Thanks for connecting. I had a look at your booking page and noticed the price only appears at the very last step. Want me to sketch a version that shows it earlier?',
      ),
      inbound(
        'act_2',
        '2026-08-10T14:20:00Z',
        'We already redid the site last year and I am not sure it is the problem. What makes you say the price placement matters?',
      ),
    ],
    decision: {
      conversation: {
        summary: 'Prospect is sceptical that price placement is the issue after a recent redesign.',
        last_prospect_message: 'We already redid the site last year...',
        rapport_level: 'LOW',
      },
      classification: { intent: 'OBJECTION', sentiment: 'NEUTRAL', risk: 'LOW', confidence: 0.91 },
      recommendation: {
        action: 'CREATE_DRAFT',
        reply_text:
          'Fair question. On your booking page the price shows up after someone has already picked a date and typed their details, so people commit before they know the number. Moving it earlier tends to change who finishes, not how many arrive. Happy to show what I mean.',
      },
    },
  },
  {
    contactId: 'ctc_demo_pricing',
    firstName: 'Tom',
    lastName: 'Bakker',
    company: 'Northlight Studio',
    domain: 'northlight.example',
    note: 'Pricing question: always a handoff, never answered automatically.',
    activities: [
      outbound(
        'act_3',
        '2026-08-09T10:00:00Z',
        'Thanks for connecting. Your portfolio loads beautifully but the contact step is three clicks deep. Want me to sketch a shorter path?',
      ),
      inbound(
        'act_4',
        '2026-08-09T16:45:00Z',
        'Interesting. What would something like that cost us, roughly?',
      ),
    ],
    decision: {
      conversation: { summary: 'Prospect asked about cost.' },
      classification: {
        intent: 'PRICING_OR_COMMERCIAL',
        sentiment: 'POSITIVE',
        risk: 'MEDIUM',
        confidence: 0.97,
      },
      recommendation: { action: 'CREATE_DRAFT', reply_text: 'It depends on the scope.' },
    },
  },
  {
    contactId: 'ctc_demo_external',
    firstName: 'Priya',
    lastName: 'Raman',
    company: 'Hedge & Co',
    domain: 'hedgeco.example',
    note: 'References a call we cannot see: automation stops.',
    activities: [
      outbound('act_5', '2026-08-08T09:00:00Z', 'Thanks for connecting.'),
      inbound(
        'act_6',
        '2026-08-08T11:30:00Z',
        'As discussed on our call, I sent the brief over to Joshua last week. Did that reach you?',
      ),
    ],
    decision: {
      conversation: {
        summary: 'Prospect refers to a call and a brief sent to Joshua.',
        external_context_suspected: true,
      },
      classification: {
        intent: 'EXTERNAL_CONTEXT_SUSPECTED',
        sentiment: 'NEUTRAL',
        risk: 'MEDIUM',
        confidence: 0.95,
      },
      recommendation: {
        action: 'HANDOFF',
        reply_text: null,
        human_handoff_reason: 'The prospect references a call and a document the system cannot see.',
      },
      safety: { missing_context: true },
    },
  },
  {
    contactId: 'ctc_demo_ack',
    firstName: 'Milan',
    lastName: 'Horvat',
    company: 'Kade Bikes',
    domain: 'kadebikes.example',
    note: 'A simple thank-you: eligible for a low-risk automatic reply.',
    activities: [
      outbound('act_7', '2026-08-11T09:00:00Z', 'Thanks for connecting.'),
      inbound('act_8', '2026-08-11T09:40:00Z', 'Thanks, good to be connected.'),
    ],
    decision: {
      conversation: { summary: 'Prospect acknowledged the connection.' },
      classification: {
        intent: 'SIMPLE_ACKNOWLEDGEMENT',
        sentiment: 'POSITIVE',
        risk: 'LOW',
        confidence: 0.98,
      },
      recommendation: {
        action: 'AUTO_SEND_CANDIDATE',
        reply_text: 'Likewise. I will keep an eye out for anything useful for you.',
      },
    },
  },
];

for (const demo of cases) {
  const lemlist = new FakeLemlistClient();
  const activities = demo.activities.map((activity) => ({
    ...activity,
    contactId: demo.contactId,
    leadId: `lea_${demo.contactId}`,
  }));
  lemlist.state.messages.set(demo.contactId, activities);
  lemlist.state.leads.set(`lea_${demo.contactId}`, {
    _id: `lea_${demo.contactId}`,
    campaignId: CAMPAIGN,
    contactId: demo.contactId,
    email: `${demo.firstName.toLowerCase()}@${demo.domain}`,
    companyName: demo.company,
    isPaused: true,
  });
  lemlist.state.campaigns.set(CAMPAIGN, { _id: CAMPAIGN, name: 'Small business owners v0.2' });
  lemlist.state.sequences.set(CAMPAIGN, [{ _id: 'seq_demo', steps: [], level: 0 }]);

  const research = new FakeResearchAdapter();
  research.addPage(
    `https://${demo.domain}`,
    `<html><title>${demo.company}</title><body><h1>${demo.company}</h1><p>Our booking page takes reservations.</p></body></html>`,
  );

  const anthropic = new FakeAnthropicClient();
  anthropic.enqueueDecision(testDecision(demo.decision));

  const context = buildContext({
    config,
    lemlist,
    anthropic,
    research,
    netlify: new FakeNetlifyClient(),
    calendar: new FakeCalendarProvider(),
    notifier: new ConsoleEmailNotifier(),
    logger: createLogger('error'),
  });

  const contact = await upsertContact(getPool(), {
    lemlistContactId: demo.contactId,
    firstName: demo.firstName,
    lastName: demo.lastName,
    email: `${demo.firstName.toLowerCase()}@${demo.domain}`,
    companyName: demo.company,
    companyDomain: demo.domain,
  });
  await getOrCreateConversation(getPool(), contact.id, CAMPAIGN);

  const result = await processConversation(context, {
    jobId: `job_${demo.contactId}`,
    contactId: contact.id,
    lemlistContactId: demo.contactId,
    jobType: 'ANALYZE_CONVERSATION',
    correlationId: `cor_demo_${demo.contactId}`,
    webhookLeadId: `lea_${demo.contactId}`,
    webhookCampaignId: CAMPAIGN,
    wasAcceptanceEvent: demo.wasAcceptance ?? false,
  });

  console.log(`${demo.company.padEnd(18)} ${result.action.padEnd(26)} ${result.state}`);
  console.log(`  ${demo.note}`);
}

console.log('\nDemo data created by running the real pipeline. Open the dashboard queue.');
await closePool();
