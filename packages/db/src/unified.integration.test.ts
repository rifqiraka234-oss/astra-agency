import { afterAll, beforeEach, describe, expect, it } from 'vitest';
import {
  NEW_BUSINESSES_PROFILE,
  assertImportTransition,
  columnMappingHash,
  contentHash,
  importIdempotencyKey,
  isConfirmationValid,
  startRun,
  buildRetrospective,
  IllegalLessonTransitionError,
} from '@astra/core';
import { closePool, getPool, type Sql } from './client.js';
import {
  bumpRunWriteCounters,
  completeRunEnvelope,
  createImportIntent,
  findConfirmationGate,
  insertMessageVersion,
  insertRunEnvelope,
  insertTierDecision,
  insertWebsiteAssessment,
  listCapabilities,
  loadProcessedContactIds,
  loadTier2Queue,
  markSourceContactProcessed,
  markStaleRunsInterrupted,
  recordCapabilityObservation,
  recordConfirmationGate,
  recordFetchPage,
  recordFieldVerification,
  recordImportResult,
  setImportIntentStatus,
  summarizeTier2Queue,
  tier2QueueToJsonl,
  tier2QueueToMarkdown,
  upsertPipelineProfile,
  upsertSourceContact,
} from './enrichment-repositories.js';
import {
  countPriorSignatureOccurrences,
  insertLessonCandidate,
  linkLessonEvidence,
  listLessonsByStatus,
  loadLessonEvidenceRunIds,
  recordFeedbackEvent,
  saveRetrospective,
  transitionLesson,
} from './learning-repositories.js';

/**
 * These exercise the unified schema against a real Postgres. They *skip*
 * without a database rather than passing vacuously, because a green suite that
 * never touched a database is worse than a red one.
 */

const databaseUrl = process.env['DATABASE_URL'];

const TABLES = [
  'promotion_decisions',
  'lesson_evidence_links',
  'lesson_candidates',
  'run_retrospectives',
  'feedback_events',
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

function requireDatabase(): void {
  if (databaseUrl === undefined || databaseUrl.length === 0) {
    throw new Error('DATABASE_URL is required for this suite');
  }
}

const describeDb = databaseUrl === undefined || databaseUrl.length === 0 ? describe.skip : describe;

describeDb('unified schema', () => {
  const pool = (): Sql => getPool(databaseUrl);

  beforeEach(async () => {
    requireDatabase();
    await pool().query(`TRUNCATE ${TABLES.join(', ')} RESTART IDENTITY CASCADE`);
  });

  afterAll(async () => {
    await closePool();
  });

  const newRun = async (sql: Sql): Promise<string> => {
    const envelope = await insertRunEnvelope(sql, {
      correlationId: `corr-${String(Math.random())}`,
      engine: 'ENRICHMENT',
      trigger: 'SCHEDULE',
      environment: 'test',
      runtimeMode: 'TEST',
      policyVersion: '1.0.0',
      promptVersions: {},
      modelVersions: {},
      integrationVersions: { lemlist: 'v1' },
      inputSnapshotHash: 'snapshot',
    });
    return envelope.id;
  };

  const newProfile = async (sql: Sql): Promise<string> => {
    const row = await upsertPipelineProfile(sql, NEW_BUSINESSES_PROFILE);
    return row.id;
  };

  describe('run envelopes', () => {
    it('records requested, allowed and completed writes separately', async () => {
      const sql = pool();
      const runId = await newRun(sql);
      await bumpRunWriteCounters(sql, runId, { requested: 5, allowed: 0 });
      await completeRunEnvelope(sql, runId, 'COMPLETED', null);

      const row = await sql.query<{
        external_writes_requested: number;
        external_writes_allowed: number;
        external_writes_completed: number;
        status: string;
      }>(
        `SELECT external_writes_requested, external_writes_allowed,
                external_writes_completed, status FROM run_envelopes WHERE id = $1`,
        [runId],
      );

      expect(row.rows[0]?.external_writes_requested).toBe(5);
      expect(row.rows[0]?.external_writes_allowed).toBe(0);
      expect(row.rows[0]?.external_writes_completed).toBe(0);
      expect(row.rows[0]?.status).toBe('COMPLETED');
    });

    it('marks a run abandoned by a dead process as INTERRUPTED, not FAILED', async () => {
      const sql = pool();
      const runId = await newRun(sql);
      await sql.query(`UPDATE run_envelopes SET started_at = now() - interval '3 hours' WHERE id = $1`, [
        runId,
      ]);

      expect(await markStaleRunsInterrupted(sql, 60)).toBe(1);

      const row = await sql.query<{ status: string }>(
        `SELECT status FROM run_envelopes WHERE id = $1`,
        [runId],
      );
      expect(row.rows[0]?.status).toBe('INTERRUPTED');
    });
  });

  describe('provider capabilities', () => {
    it('upserts by exact operation, not by provider', async () => {
      const sql = pool();
      await recordCapabilityObservation(sql, {
        provider: 'lemlist',
        operation: 'lemlist.searchCompanies',
        authState: 'AUTHENTICATED',
        enablementState: 'ENABLED_FOR_RUNTIME',
        reachabilityState: 'REACHABLE',
        observedFields: ['id', 'name', 'domain'],
        missingFields: ['foundedOn', 'industry', 'location', 'description'],
        lastFailureReason: null,
        approvedFallback: null,
      });
      await recordCapabilityObservation(sql, {
        provider: 'lemlist',
        operation: 'lemlist.searchContacts',
        authState: 'AUTHENTICATED',
        enablementState: 'ENABLED_FOR_RUNTIME',
        reachabilityState: 'REACHABLE',
        observedFields: ['id', 'email'],
        missingFields: [],
        lastFailureReason: null,
        approvedFallback: null,
      });

      const rows = await listCapabilities(sql);
      expect(rows).toHaveLength(2);
      const companies = rows.find((r) => r.operation === 'lemlist.searchCompanies');
      // The gap is recorded rather than rediscovered every run.
      expect(companies?.missing_fields).toContain('foundedOn');
    });
  });

  describe('cursor-safe acquisition', () => {
    it('dedupes contacts by ID across overlapping pages', async () => {
      const sql = pool();
      const profileId = await newProfile(sql);

      const first = await upsertSourceContact(sql, {
        pipelineProfileId: profileId,
        lemlistContactId: 'con_1',
        companyName: 'Studio Piero',
      });
      const again = await upsertSourceContact(sql, {
        pipelineProfileId: profileId,
        lemlistContactId: 'con_1',
        companyDomain: 'studiopiero.com',
      });

      expect(again.id).toBe(first.id);
      expect(again.company_name).toBe('Studio Piero');
      expect(again.company_domain).toBe('studiopiero.com');
    });

    it('reports the durable processed set, not everything ever seen', async () => {
      const sql = pool();
      const profileId = await newProfile(sql);
      const a = await upsertSourceContact(sql, {
        pipelineProfileId: profileId,
        lemlistContactId: 'con_a',
      });
      await upsertSourceContact(sql, { pipelineProfileId: profileId, lemlistContactId: 'con_b' });
      await markSourceContactProcessed(sql, a.id);

      const processed = await loadProcessedContactIds(sql, profileId);
      expect([...processed]).toEqual(['con_a']);
    });

    it('records page forensics for later no-progress analysis', async () => {
      const sql = pool();
      const profileId = await newProfile(sql);
      const runId = await newRun(sql);
      const enrichmentRun = await sql.query<{ id: string }>(
        `INSERT INTO enrichment_runs (run_id, pipeline_profile_id, source_list_id)
         VALUES ($1, $2, $3) RETURNING id`,
        [runId, profileId, NEW_BUSINESSES_PROFILE.sourceListId],
      );
      const enrichmentRunId = enrichmentRun.rows[0]?.id;
      expect(enrichmentRunId).toBeDefined();

      await recordFetchPage(sql, {
        enrichmentRunId: enrichmentRunId as string,
        pageIndex: 2,
        requestedOffset: 3,
        requestedLimit: 3,
        returnedCount: 3,
        newIdCount: 0,
        returnedIdsHash: contentHash('c1\nc2\nc3'),
        noProgress: true,
      });

      const rows = await sql.query<{ no_progress: boolean }>(
        `SELECT no_progress FROM source_fetch_pages WHERE enrichment_run_id = $1`,
        [enrichmentRunId],
      );
      expect(rows.rows[0]?.no_progress).toBe(true);
    });
  });

  describe('the tier 2 queue replaces the two hand-kept files', () => {
    it('produces the JSONL and Markdown views from one source of truth', async () => {
      const sql = pool();
      const profileId = await newProfile(sql);
      const runId = await newRun(sql);

      const contact = await upsertSourceContact(sql, {
        pipelineProfileId: profileId,
        lemlistContactId: 'con_mm',
        firstName: 'Marit',
        lastName: 'Ootes',
        companyName: 'MM Collectives',
      });
      await insertWebsiteAssessment(sql, {
        sourceContactId: contact.id,
        runId,
        classification: 'PLACEHOLDER',
        confidence: 'HIGH',
        verifiedObservation: 'the site is a placeholder page',
        sourceAdapter: 'research.fetchPage',
        fetchSucceeded: true,
      });
      await insertTierDecision(sql, {
        sourceContactId: contact.id,
        enrichmentRunId: null,
        pipelineProfileId: profileId,
        eligibility: 'MANUAL_REVIEW',
        tier: 'TIER_2',
        reasonCodes: ['BUSINESS_PURPOSE_UNVERIFIABLE'],
        predicates: [
          { name: 'no_mandatory_manual_review_condition', passed: false, detail: 'purpose unknown' },
        ],
        policyVersion: '1.0.0',
        overrideReason: 'No source states what the business does.',
      });

      const rows = await loadTier2Queue(sql);
      expect(rows).toHaveLength(1);
      expect(summarizeTier2Queue(rows)).toEqual({
        manualReview: 1,
        doNotUse: 0,
        lowConfidenceInclude: 0,
      });

      const jsonl = tier2QueueToJsonl(rows);
      expect(JSON.parse(jsonl) as { company: string }).toMatchObject({
        company: 'MM Collectives',
      });

      const markdown = tier2QueueToMarkdown(rows);
      expect(markdown).toContain('MM Collectives');
      expect(markdown).toContain('BUSINESS_PURPOSE_UNVERIFIABLE');
    });

    it('drops a row from the queue once it has actually imported', async () => {
      const sql = pool();
      const profileId = await newProfile(sql);
      const contact = await upsertSourceContact(sql, {
        pipelineProfileId: profileId,
        lemlistContactId: 'con_imported',
        companyName: 'TRIXEA',
      });
      const decision = await insertTierDecision(sql, {
        sourceContactId: contact.id,
        enrichmentRunId: null,
        pipelineProfileId: profileId,
        eligibility: 'INCLUDE',
        tier: 'TIER_2',
        reasonCodes: ['WEBSITE_CONFIDENCE_BELOW_TIER_1'],
        predicates: [],
        policyVersion: '1.0.0',
        overrideReason: null,
      });
      const message = await insertMessageVersion(sql, {
        sourceContactId: contact.id,
        tierDecisionId: decision.id,
        connectionMessage: 'Saw TRIXEA has no site yet. Worth a quick chat?',
        firstMessage: 'Saw TRIXEA has no site yet. Want us to sketch one?',
        firstMessageWordCount: 11,
        contentHash: contentHash('trixea'),
        policyVersion: '1.0.0',
        promptVersion: '1.0.0',
        validatorReport: { ok: true },
      });

      expect(await loadTier2Queue(sql)).toHaveLength(1);

      const { intent } = await createImportIntent(sql, {
        sourceContactId: contact.id,
        messageVersionId: message.id,
        campaignId: NEW_BUSINESSES_PROFILE.import.destinationCampaignId,
        idempotencyKey: 'key-trixea',
      });
      await setImportIntentStatus(sql, intent.id, 'SUCCEEDED', null);

      expect(await loadTier2Queue(sql)).toHaveLength(0);
    });
  });

  describe('the import transaction', () => {
    const seed = async (sql: Sql): Promise<{ contactId: string; messageId: string }> => {
      const profileId = await newProfile(sql);
      const contact = await upsertSourceContact(sql, {
        pipelineProfileId: profileId,
        lemlistContactId: 'con_import',
        companyName: 'Revive Auto Repairs',
      });
      const decision = await insertTierDecision(sql, {
        sourceContactId: contact.id,
        enrichmentRunId: null,
        pipelineProfileId: profileId,
        eligibility: 'INCLUDE',
        tier: 'TIER_1',
        reasonCodes: [],
        predicates: [],
        policyVersion: '1.0.0',
        overrideReason: null,
      });
      const message = await insertMessageVersion(sql, {
        sourceContactId: contact.id,
        tierDecisionId: decision.id,
        connectionMessage: 'Saw the garage has no site yet. Worth a chat?',
        firstMessage: 'Saw the garage has no site yet. Want us to sketch one?',
        firstMessageWordCount: 12,
        contentHash: contentHash('revive'),
        policyVersion: '1.0.0',
        promptVersion: '1.0.0',
        validatorReport: { ok: true },
      });
      return { contactId: contact.id, messageId: message.id };
    };

    it('persists the audit row before any provider call is possible', async () => {
      const sql = pool();
      const { contactId, messageId } = await seed(sql);
      const key = importIdempotencyKey({
        profileId: 'new-businesses',
        campaignId: NEW_BUSINESSES_PROFILE.import.destinationCampaignId,
        contactIds: ['con_import'],
        messageVersionHashes: [contentHash('revive')],
        columnMapping: NEW_BUSINESSES_PROFILE.import.columnMapping,
      });

      const { intent, alreadyExisted } = await createImportIntent(sql, {
        sourceContactId: contactId,
        messageVersionId: messageId,
        campaignId: NEW_BUSINESSES_PROFILE.import.destinationCampaignId,
        idempotencyKey: key,
      });

      expect(alreadyExisted).toBe(false);
      expect(intent.status).toBe('PENDING');
    });

    it('collapses a duplicate intent onto the existing row instead of importing twice', async () => {
      const sql = pool();
      const { contactId, messageId } = await seed(sql);
      const args = {
        sourceContactId: contactId,
        messageVersionId: messageId,
        campaignId: NEW_BUSINESSES_PROFILE.import.destinationCampaignId,
        idempotencyKey: 'stable-key',
      };

      const first = await createImportIntent(sql, args);
      const second = await createImportIntent(sql, args);

      expect(second.alreadyExisted).toBe(true);
      expect(second.intent.id).toBe(first.intent.id);
    });

    it('records a timed-out import as unreconciled rather than failed', async () => {
      const sql = pool();
      const { contactId, messageId } = await seed(sql);
      const { intent } = await createImportIntent(sql, {
        sourceContactId: contactId,
        messageVersionId: messageId,
        campaignId: NEW_BUSINESSES_PROFILE.import.destinationCampaignId,
        idempotencyKey: 'timeout-key',
      });

      assertImportTransition('PENDING', 'ALLOWED');
      await setImportIntentStatus(sql, intent.id, 'ALLOWED', null);
      assertImportTransition('ALLOWED', 'IN_FLIGHT');
      await setImportIntentStatus(sql, intent.id, 'IN_FLIGHT', null);
      assertImportTransition('IN_FLIGHT', 'UNKNOWN_REQUIRES_RECONCILIATION');
      await setImportIntentStatus(
        sql,
        intent.id,
        'UNKNOWN_REQUIRES_RECONCILIATION',
        'request timed out',
      );

      const row = await sql.query<{ status: string; attempted_at: Date | null }>(
        `SELECT status, attempted_at FROM campaign_import_intents WHERE id = $1`,
        [intent.id],
      );
      expect(row.rows[0]?.status).toBe('UNKNOWN_REQUIRES_RECONCILIATION');
      expect(row.rows[0]?.attempted_at).not.toBeNull();
    });

    it('records the post-import field verification', async () => {
      const sql = pool();
      const { contactId, messageId } = await seed(sql);
      const { intent } = await createImportIntent(sql, {
        sourceContactId: contactId,
        messageVersionId: messageId,
        campaignId: NEW_BUSINESSES_PROFILE.import.destinationCampaignId,
        idempotencyKey: 'verify-key',
      });
      const resultId = await recordImportResult(sql, {
        importIntentId: intent.id,
        providerResponse: { ok: true },
        providerLeadId: 'lea_1',
        errorDetail: null,
      });
      await recordFieldVerification(sql, resultId, true, { checked: ['connectionMessage'] });

      const row = await sql.query<{ fields_verified: boolean }>(
        `SELECT fields_verified FROM campaign_import_results WHERE id = $1`,
        [resultId],
      );
      expect(row.rows[0]?.fields_verified).toBe(true);
    });
  });

  describe('confirmation gates survive a fresh container', () => {
    it('does not ask again once confirmed, and asks again when the mapping changes', async () => {
      const sql = pool();
      const mappingHash = columnMappingHash(NEW_BUSINESSES_PROFILE.import.columnMapping);

      expect(await findConfirmationGate(sql, 'FIELD_MAPPING_VERIFIED', 'CAMPAIGN', 'cam_1')).toBeNull();

      await recordConfirmationGate(sql, {
        gateKey: 'FIELD_MAPPING_VERIFIED',
        scope: 'CAMPAIGN',
        scopeId: 'cam_1',
        confirmedBy: null,
        evidence: { checkedLeads: 2 },
        subjectHash: mappingHash,
        providerVersion: 'lemlist-v1',
      });

      const stored = await findConfirmationGate(sql, 'FIELD_MAPPING_VERIFIED', 'CAMPAIGN', 'cam_1');
      expect(stored).not.toBeNull();

      const gate = {
        gateKey: stored?.gate_key ?? '',
        scope: stored?.scope ?? '',
        scopeId: stored?.scope_id ?? null,
        confirmedAt: stored?.confirmed_at?.toISOString() ?? null,
        confirmedBy: null,
        evidence: null,
        subjectHash: stored?.subject_hash ?? '',
        providerVersion: stored?.provider_version ?? '',
        invalidatedAt: null,
      };

      expect(isConfirmationValid(gate, mappingHash, 'lemlist-v1').valid).toBe(true);
      expect(isConfirmationValid(gate, columnMappingHash({ a: 'b' }), 'lemlist-v1').valid).toBe(
        false,
      );
    });
  });

  describe('learning', () => {
    it('stores a retrospective derived from the run ledger', async () => {
      const sql = pool();
      const runId = await newRun(sql);
      const envelope = {
        ...startRun({
          runId,
          correlationId: 'corr',
          engine: 'ENRICHMENT',
          trigger: 'SCHEDULE',
          environment: 'test',
          runtimeMode: 'TEST',
          versions: {
            policyVersion: '1.0.0',
            promptVersions: {},
            modelVersions: {},
            integrationVersions: {},
          },
          inputSnapshotHash: 'snapshot',
          startedAt: new Date().toISOString(),
        }),
      };

      const retro = buildRetrospective({
        envelope,
        attemptedInOrder: ['fetch', 'research'],
        completed: ['fetch'],
        externalWritesMade: [],
        operatorCorrections: [],
        systemIdentifiedImprovements: [],
        findings: [
          {
            signature: 'WEBFETCH_BLOCKED_BEFORE_FANOUT',
            description: 'fan-out started without a preflight',
            rootCause: 'PROVIDER_CAPABILITY',
            priorOccurrences: 1,
            nearMiss: false,
          },
        ],
        wastedWork: {
          wastedInputTokens: 370_000,
          wastedOutputTokens: 0,
          wastedWallClockMs: 0,
          cause: 'no preflight',
        },
        unresolvedRisks: [],
        candidateRegressionTests: [],
        candidateLessonIds: [],
        generatedAt: new Date().toISOString(),
      });

      await saveRetrospective(sql, retro, { inputTokens: 400_000 });

      expect(retro.recommendation).toBe('FIX');
      expect(await countPriorSignatureOccurrences(sql, 'WEBFETCH_BLOCKED_BEFORE_FANOUT')).toBe(1);
    });

    it('refuses an illegal lesson promotion before it reaches the database', async () => {
      const sql = pool();
      const lesson = await insertLessonCandidate(sql, {
        title: 'Preflight before fan-out',
        observation: 'Five workers rediscovered a blocked adapter.',
        exactFailureOrSuccess: 'Second fan-out wasted roughly 370k tokens.',
        rootCause: 'No shared-dependency preflight.',
        beforeExample: null,
        afterExample: 'Verify the exact adapter once, then fan out.',
        reusableRule: 'Preflight the exact adapter before parallel work.',
        scope: 'INTEGRATION',
        scopeId: 'research.fetchPage',
        applicableConditions: ['parallel research'],
        counterexamples: [],
        counterexampleSearchPerformed: true,
        knownNonApplicability: [],
        confidence: 0.9,
        attributionConfidence: 0.9,
        authorityClass: 'D',
        riskClass: 'HIGH',
        expectedBenefit: 'Avoids repeated wasted fan-outs.',
        possibleHarm: 'Adds a preflight round trip.',
        reversibility: 'TRIVIAL',
        requiredEvalCases: [],
        requiredApprover: 'operator',
        createdByModelVersion: 'claude-opus-5',
      });

      await expect(
        transitionLesson(sql, {
          lessonId: lesson.id,
          from: 'OBSERVED',
          to: 'ACTIVE_PRODUCTION',
          decidedBy: null,
          authorityClass: 'D',
          rationale: 'shortcut',
          evalRunId: null,
        }),
      ).rejects.toBeInstanceOf(IllegalLessonTransitionError);

      const stored = await listLessonsByStatus(sql, ['OBSERVED']);
      expect(stored).toHaveLength(1);
    });

    it('records a legal promotion with its decision row', async () => {
      const sql = pool();
      const runId = await newRun(sql);
      const lesson = await insertLessonCandidate(sql, {
        title: 'Plain observation opener',
        observation: 'Operator revised four compound openers.',
        exactFailureOrSuccess: 'Four revisions.',
        rootCause: 'Prompt examples skewed decorative.',
        beforeExample: 'Building X as a sibling duo around brand strategy',
        afterExample: 'Saw you are building X with your sibling.',
        reusableRule: 'Open with a plain observation.',
        scope: 'CAMPAIGN',
        scopeId: 'new-businesses',
        applicableConditions: [],
        counterexamples: ['prospect used the same register first'],
        counterexampleSearchPerformed: true,
        knownNonApplicability: [],
        confidence: 0.8,
        attributionConfidence: 0.6,
        authorityClass: 'C',
        riskClass: 'MEDIUM',
        expectedBenefit: 'Fewer revisions.',
        possibleHarm: 'Monotony.',
        reversibility: 'TRIVIAL',
        requiredEvalCases: ['MESSAGE_NATURALNESS'],
        requiredApprover: 'operator',
        createdByModelVersion: 'claude-opus-5',
      });

      await linkLessonEvidence(sql, lesson.id, runId, 'four revisions in this run');
      expect(await loadLessonEvidenceRunIds(sql, lesson.id)).toEqual([runId]);

      expect(
        await transitionLesson(sql, {
          lessonId: lesson.id,
          from: 'OBSERVED',
          to: 'PROPOSED',
          decidedBy: null,
          authorityClass: 'C',
          rationale: 'enough evidence to propose',
          evalRunId: null,
        }),
      ).toBe(true);

      // A second attempt from the same 'from' state loses the race and says so.
      expect(
        await transitionLesson(sql, {
          lessonId: lesson.id,
          from: 'OBSERVED',
          to: 'PROPOSED',
          decidedBy: null,
          authorityClass: 'C',
          rationale: 'duplicate click',
          evalRunId: null,
        }),
      ).toBe(false);

      const decisions = await sql.query<{ count: string }>(
        `SELECT count(*)::text AS count FROM promotion_decisions WHERE lesson_id = $1`,
        [lesson.id],
      );
      expect(decisions.rows[0]?.count).toBe('1');
    });

    it('keeps rejected candidates searchable so they are not rediscovered', async () => {
      const sql = pool();
      const lesson = await insertLessonCandidate(sql, {
        title: 'Drop meeting CTAs',
        observation: 'One prospect disliked a call.',
        exactFailureOrSuccess: 'One negative reply.',
        rootCause: 'Single data point.',
        beforeExample: null,
        afterExample: 'Remove meeting CTAs globally.',
        reusableRule: 'Never propose a call.',
        scope: 'GLOBAL',
        scopeId: null,
        applicableConditions: [],
        counterexamples: [],
        counterexampleSearchPerformed: true,
        knownNonApplicability: [],
        confidence: 0.2,
        attributionConfidence: 0.1,
        authorityClass: 'C',
        riskClass: 'HIGH',
        expectedBenefit: 'none demonstrated',
        possibleHarm: 'Removes the primary conversion path.',
        reversibility: 'TRIVIAL',
        requiredEvalCases: [],
        requiredApprover: 'operator',
        createdByModelVersion: 'claude-opus-5',
      });

      await transitionLesson(sql, {
        lessonId: lesson.id,
        from: 'OBSERVED',
        to: 'REJECTED',
        decidedBy: null,
        authorityClass: 'C',
        rationale: 'one data point is not evidence',
        evalRunId: null,
      });

      expect(await listLessonsByStatus(sql, ['REJECTED'])).toHaveLength(1);
    });

    it('stores outcome and attribution confidence separately', async () => {
      const sql = pool();
      const runId = await newRun(sql);
      await recordFeedbackEvent(sql, {
        runId,
        conversationId: null,
        sourceContactId: null,
        eventType: 'MEETING_BOOKED',
        actor: 'system',
        beforeValue: null,
        afterValue: null,
        reason: null,
        outcome: 'MEETING',
        attributionConfidence: 0.4,
      });

      const row = await sql.query<{ outcome: string; attribution_confidence: string }>(
        `SELECT outcome, attribution_confidence FROM feedback_events WHERE run_id = $1`,
        [runId],
      );
      expect(row.rows[0]?.outcome).toBe('MEETING');
      expect(Number(row.rows[0]?.attribution_confidence)).toBeLessThan(0.5);
    });
  });
});
