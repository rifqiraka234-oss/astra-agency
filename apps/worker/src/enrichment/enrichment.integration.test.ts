import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { testConfig } from '@astra/core/testing';
import { NEW_BUSINESSES_PROFILE, type PipelineProfile } from '@astra/core';
import { closePool, getPool, migrate } from '@astra/db';
import {
  ConsoleEmailNotifier,
  FakeAnthropicClient,
  FakeCalendarProvider,
  FakeLemlistClient,
  FakeNetlifyClient,
  FakeResearchAdapter,
  type LemlistContact,
} from '@astra/integrations';
import { buildContext, type AppContext } from '../context.js';
import { createLogger } from '../logger.js';
import { formatRunReport, runEnrichment, type DraftedMessages } from './run.js';

/**
 * The enrichment engine end to end, against a real database and in-memory
 * providers.
 *
 * The cases are the historical incidents: overlapping pages that
 * double-processed contacts, an identity mismatch that a mechanical score
 * wanted to include, our own fetch failure being written up as a broken site,
 * and an import that reached Lemlist before the audit trail existed.
 */

let available = false;

const TABLES = [
  'campaign_import_results',
  'campaign_import_intents',
  'enrichment_message_versions',
  'tier_decisions',
  'website_assessments',
  'company_resolutions',
  'source_fetch_pages',
  'source_contacts',
  'enrichment_runs',
  'confirmation_gates',
  'provider_capabilities',
  'pipeline_profiles',
  'run_envelopes',
];

beforeAll(async () => {
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
  await getPool().query(`TRUNCATE ${TABLES.join(', ')} RESTART IDENTITY CASCADE`);
});

function requireDatabase(ctx: { skip: () => void }): void {
  if (!available) ctx.skip();
}

const contact = (overrides: Partial<LemlistContact> & { _id: string }): LemlistContact => ({
  firstName: 'Ada',
  lastName: 'Byron',
  email: `${overrides._id}@example.test`,
  companyName: 'Studio Piero',
  hints: {
    summary: 'A sibling brand studio doing identity work for small food businesses in Rotterdam.',
  },
  ...overrides,
});

/** A drafter that always produces copy the validators accept. */
const goodDrafter = async (): Promise<DraftedMessages> => ({
  connectionMessage: 'Saw you are building Studio Piero. Worth a quick chat?',
  firstMessage:
    'Saw you are building Studio Piero. Right now people who hear about you have nowhere to look at the work or get in touch, so enquiries quietly go nowhere. Want us to sketch what a simple site could look like?',
});

function buildTestContext(overrides: {
  lemlist: FakeLemlistClient;
  research: FakeResearchAdapter;
  allowImport?: boolean;
}): AppContext {
  const logger = createLogger('error', {});
  return buildContext({
    config: testConfig({
      RUNTIME_MODE: 'TEST',
      ...(overrides.allowImport === true
        ? {
            RUNTIME_MODE: 'DRAFT_ONLY',
            GLOBAL_KILL_SWITCH: 'false',
            ALLOW_LIVE_CAMPAIGN_IMPORT: 'true',
          }
        : {}),
    }),
    lemlist: overrides.lemlist,
    research: overrides.research,
    anthropic: new FakeAnthropicClient(),
    netlify: new FakeNetlifyClient(),
    calendar: new FakeCalendarProvider(),
    notifier: new ConsoleEmailNotifier(logger),
    logger,
  });
}

/** A reachable adapter, so the preflight passes and the run proceeds. */
function researchWithPreflight(): FakeResearchAdapter {
  const research = new FakeResearchAdapter();
  research.addPage('https://example.com/', '<html><title>Example</title><body>Example</body></html>');
  return research;
}

function lemlistWith(contacts: readonly LemlistContact[], pageOverlap = 0): FakeLemlistClient {
  const client = new FakeLemlistClient({ pageOverlap });
  client.state.contactLists.set(NEW_BUSINESSES_PROFILE.sourceListId, [...contacts]);
  return client;
}

const importableProfile: PipelineProfile = { ...NEW_BUSINESSES_PROFILE, allowLiveImport: true };

describe('enrichment engine', () => {
  it('halts before fanning out when the shared research adapter is blocked', async (ctx) => {
    requireDatabase(ctx);
    // No example.com fixture, so the preflight probe returns null.
    const research = new FakeResearchAdapter();
    const lemlist = lemlistWith([contact({ _id: 'con_1' })]);

    const result = await runEnrichment({
      ctx: buildTestContext({ lemlist, research }),
      sql: getPool(),
      batchSize: 5,
      draftMessages: goodDrafter,
    });

    expect(result.halted).toBe(true);
    expect(result.haltReason).toContain('research.fetchPage');
    expect(result.processed).toBe(0);
    // Nothing fanned out: the list was never even paged.
    expect(lemlist.calls.filter((c) => c.method === 'searchContacts')).toHaveLength(1);
  });

  it('processes each contact once when pages overlap', async (ctx) => {
    requireDatabase(ctx);
    const contacts = Array.from({ length: 9 }, (_, i) => contact({ _id: `con_${String(i)}` }));
    // Every page repeats two rows from the previous one.
    const lemlist = lemlistWith(contacts, 2);

    const result = await runEnrichment({
      ctx: buildTestContext({ lemlist, research: researchWithPreflight() }),
      sql: getPool(),
      batchSize: 9,
      pageSize: 3,
      draftMessages: goodDrafter,
    });

    expect(result.processed).toBe(9);
    const ids = result.outcomes.map((o) => o.lemlistContactId);
    expect(new Set(ids).size).toBe(9);

    const pages = await getPool().query<{ count: string }>(
      `SELECT count(*)::text AS count FROM source_fetch_pages`,
    );
    // More pages than a disjoint walk would need, which is the point.
    expect(Number(pages.rows[0]?.count)).toBeGreaterThan(3);
  });

  it('does not reprocess a contact on the next run', async (ctx) => {
    requireDatabase(ctx);
    const contacts = [contact({ _id: 'con_a' }), contact({ _id: 'con_b' })];
    const lemlist = lemlistWith(contacts);
    const research = researchWithPreflight();

    const first = await runEnrichment({
      ctx: buildTestContext({ lemlist, research }),
      sql: getPool(),
      batchSize: 2,
      draftMessages: goodDrafter,
    });
    expect(first.processed).toBe(2);

    const second = await runEnrichment({
      ctx: buildTestContext({ lemlist, research }),
      sql: getPool(),
      batchSize: 2,
      draftMessages: goodDrafter,
    });
    expect(second.processed).toBe(0);
  });

  it('treats a company with no website as a Tier 1 include', async (ctx) => {
    requireDatabase(ctx);
    const lemlist = lemlistWith([contact({ _id: 'con_nosite' })]);

    const result = await runEnrichment({
      ctx: buildTestContext({ lemlist, research: researchWithPreflight() }),
      sql: getPool(),
      batchSize: 1,
      draftMessages: goodDrafter,
    });

    const outcome = result.outcomes[0];
    expect(outcome?.decision.eligibility).toBe('INCLUDE');
    expect(outcome?.decision.tier).toBe('TIER_1');
    expect(outcome?.drafted).toBe(true);
  });

  it('never writes our own fetch failure up as a broken prospect site', async (ctx) => {
    requireDatabase(ctx);
    const research = researchWithPreflight();
    // The domain resolves but the adapter has no fixture for it, which is
    // exactly what a block on our side looks like.
    const lemlist = lemlistWith([
      contact({ _id: 'con_blocked', companyDomain: 'unreachable.test' }),
    ]);

    await runEnrichment({
      ctx: buildTestContext({ lemlist, research }),
      sql: getPool(),
      batchSize: 1,
      draftMessages: goodDrafter,
    });

    const row = await getPool().query<{ classification: string; fetch_succeeded: boolean }>(
      `SELECT classification, fetch_succeeded FROM website_assessments`,
    );
    expect(row.rows[0]?.classification).toBe('UNKNOWN');
    expect(row.rows[0]?.classification).not.toBe('NOT_WORKING');
  });

  it('BEKLOG fixture: an identity mismatch forces manual review and drafts nothing', async (ctx) => {
    requireDatabase(ctx);
    const research = researchWithPreflight();
    // A working site that belongs to somebody else entirely.
    research.addPage(
      'https://beklog.example',
      '<html><title>Hansen Spedition</title><body>Hansen Spedition GmbH, freight forwarding ' +
        'since 1974. Contact us for services, projects and our team. Read about our work.</body></html>',
    );
    const lemlist = lemlistWith([
      contact({
        _id: 'con_beklog',
        companyName: 'BEKLOG Logistics GmbH',
        companyDomain: 'beklog.example',
        hints: { summary: 'Logistics company operating across northern Germany and Denmark.' },
      }),
    ]);

    const result = await runEnrichment({
      ctx: buildTestContext({ lemlist, research }),
      sql: getPool(),
      batchSize: 1,
      draftMessages: goodDrafter,
    });

    const outcome = result.outcomes[0];
    expect(outcome?.decision.eligibility).toBe('MANUAL_REVIEW');
    expect(outcome?.decision.reasonCodes).toContain('IDENTITY_CONFLICT');
    expect(outcome?.drafted).toBe(false);

    const messages = await getPool().query<{ count: string }>(
      `SELECT count(*)::text AS count FROM enrichment_message_versions`,
    );
    expect(messages.rows[0]?.count).toBe('0');
  });

  it('MM Collectives fixture: an unverifiable purpose blocks the include', async (ctx) => {
    requireDatabase(ctx);
    const lemlist = lemlistWith([
      contact({ _id: 'con_mm', companyName: 'MM Collectives', hints: {} }),
    ]);

    const result = await runEnrichment({
      ctx: buildTestContext({ lemlist, research: researchWithPreflight() }),
      sql: getPool(),
      batchSize: 1,
      draftMessages: goodDrafter,
    });

    expect(result.outcomes[0]?.decision.eligibility).toBe('MANUAL_REVIEW');
    expect(result.outcomes[0]?.decision.reasonCodes).toContain('BUSINESS_PURPOSE_UNVERIFIABLE');
  });

  describe('import', () => {
    it('writes the intent before the provider is ever called', async (ctx) => {
      requireDatabase(ctx);
      const lemlist = lemlistWith([contact({ _id: 'con_import' })]);

      await runEnrichment({
        ctx: buildTestContext({ lemlist, research: researchWithPreflight(), allowImport: true }),
        sql: getPool(),
        profile: importableProfile,
        batchSize: 1,
        draftMessages: goodDrafter,
      });

      const intents = await getPool().query<{ status: string; created_at: Date }>(
        `SELECT status, created_at FROM campaign_import_intents`,
      );
      expect(intents.rows[0]?.status).toBe('SUCCEEDED');
      expect(lemlist.state.importedLeads).toHaveLength(1);
    });

    it('records a rejected intent and calls nobody when the gate is closed', async (ctx) => {
      requireDatabase(ctx);
      const lemlist = lemlistWith([contact({ _id: 'con_gated' })]);

      const result = await runEnrichment({
        ctx: buildTestContext({ lemlist, research: researchWithPreflight() }),
        sql: getPool(),
        profile: importableProfile,
        batchSize: 1,
        draftMessages: goodDrafter,
      });

      expect(result.import?.status).toBe('REJECTED');
      expect(result.import?.reasonCodes).toContain('LIVE_IMPORT_GATE_CLOSED');
      expect(lemlist.state.importedLeads).toHaveLength(0);

      // The audit row exists anyway, which is the whole point of the ordering.
      const intents = await getPool().query<{ status: string }>(
        `SELECT status FROM campaign_import_intents`,
      );
      expect(intents.rows[0]?.status).toBe('REJECTED');
    });

    it('surfaces a provider policy block without substituting another operation', async (ctx) => {
      requireDatabase(ctx);
      const lemlist = lemlistWith([contact({ _id: 'con_blocked_import' })]);
      lemlist.state.importPolicyBlocked = 'blocked by safety classifier';

      const result = await runEnrichment({
        ctx: buildTestContext({ lemlist, research: researchWithPreflight(), allowImport: true }),
        sql: getPool(),
        profile: importableProfile,
        batchSize: 1,
        draftMessages: goodDrafter,
      });

      expect(result.import?.status).toBe('BLOCKED');
      expect(result.import?.operatorMessage).toContain('rather than routing around it');
      expect(lemlist.state.importedLeads).toHaveLength(0);
    });

    it('asks for the field-mapping confirmation on the first import only', async (ctx) => {
      requireDatabase(ctx);
      const lemlist = lemlistWith([contact({ _id: 'con_confirm' })]);

      const result = await runEnrichment({
        ctx: buildTestContext({ lemlist, research: researchWithPreflight(), allowImport: true }),
        sql: getPool(),
        profile: importableProfile,
        batchSize: 1,
        draftMessages: goodDrafter,
      });

      expect(result.import?.status).toBe('SUCCEEDED');
      expect(result.import?.operatorMessage).toContain('render as real text');
    });

    it('refuses to import a draft the validators blocked', async (ctx) => {
      requireDatabase(ctx);
      const lemlist = lemlistWith([contact({ _id: 'con_baddraft' })]);

      const result = await runEnrichment({
        ctx: buildTestContext({ lemlist, research: researchWithPreflight(), allowImport: true }),
        sql: getPool(),
        profile: importableProfile,
        batchSize: 1,
        draftMessages: async () => ({
          connectionMessage: 'Saw Studio Piero. Chat?',
          // An em dash and a generic compliment: two separate hard blocks.
          firstMessage: 'Your unique vision is compelling — want a sketch?',
        }),
      });

      expect(result.outcomes[0]?.drafted).toBe(false);
      expect(result.outcomes[0]?.validationBlocked.length).toBeGreaterThan(0);
      expect(result.import).toBeNull();
      expect(lemlist.state.importedLeads).toHaveLength(0);

      // The rejected draft is stored with its validator report, not discarded.
      const versions = await getPool().query<{ count: string }>(
        `SELECT count(*)::text AS count FROM enrichment_message_versions`,
      );
      expect(versions.rows[0]?.count).toBe('1');
    });
  });

  it('reports a batch as a compact table', async (ctx) => {
    requireDatabase(ctx);
    const lemlist = lemlistWith([contact({ _id: 'con_report' })]);

    const result = await runEnrichment({
      ctx: buildTestContext({ lemlist, research: researchWithPreflight() }),
      sql: getPool(),
      batchSize: 1,
      draftMessages: goodDrafter,
    });

    const report = formatRunReport(result);
    expect(report).toContain('| Company | Finding | Outcome | Tier | Drafted |');
    expect(report).toContain('Studio Piero');
  });

  it('records the Lemlist company-field gap instead of rediscovering it', async (ctx) => {
    requireDatabase(ctx);
    const lemlist = lemlistWith([contact({ _id: 'con_caps' })]);

    await runEnrichment({
      ctx: buildTestContext({ lemlist, research: researchWithPreflight() }),
      sql: getPool(),
      batchSize: 1,
      draftMessages: goodDrafter,
    });

    const row = await getPool().query<{ missing_fields: string[] }>(
      `SELECT missing_fields FROM provider_capabilities WHERE operation = 'lemlist.searchContacts'`,
    );
    expect(row.rows[0]?.missing_fields).toContain('companyDomain');
  });
});
