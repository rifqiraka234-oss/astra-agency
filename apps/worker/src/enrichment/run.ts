import {
  NEW_BUSINESSES_PROFILE,
  contentHash,
  decideTier,
  evaluateCapability,
  initialLaunchHypothesis,
  mandatoryManualReviewReasons,
  preflightBeforeFanOut,
  tier2MayImportImmediately,
  validateEnrichmentMessages,
  type EligibilityInput,
  type PipelineProfile,
  type ProviderCapability,
  type TierDecision,
} from '@astra/core';
import {
  completeRunEnvelope,
  insertCompanyResolution,
  insertMessageVersion,
  insertRunEnvelope,
  insertTierDecision,
  insertWebsiteAssessment,
  loadProcessedContactIds,
  markSourceContactProcessed,
  recordCapabilityObservation,
  upsertPipelineProfile,
  upsertSourceContact,
  withTransaction,
  type Sql,
} from '@astra/db';
import type { LemlistContact } from '@astra/integrations';
import type { AppContext } from '../context.js';
import { acquireContacts } from './acquire.js';
import { assessWebsite } from './assess.js';
import { runImportStage, type ImportCandidate, type ImportStageResult } from './import.js';

/**
 * The Campaign Intake and Enrichment engine.
 *
 * The shape of this function is the specification's stage order, and the order
 * is load bearing:
 *
 *   preflight  -> nothing fans out until the exact adapter has answered
 *   acquire    -> IDs, never offsets
 *   assess     -> our own failures classify as UNKNOWN, not as a broken site
 *   decide     -> the tier formula, with its two overrides above the score
 *   draft      -> only for outcomes that earned a message
 *   persist    -> every row written before any provider hears about it
 *   import     -> guarded, reconciled, and verified afterwards
 *
 * Each contact is committed in its own transaction, so an interrupted run loses
 * at most the contact in flight. That was the difference between the 2026-08-09
 * run resuming and starting over.
 */

export interface EnrichmentRunInput {
  readonly ctx: AppContext;
  readonly sql: Sql;
  readonly profile?: PipelineProfile;
  readonly batchSize: number;
  readonly pageSize?: number;
  readonly trigger?: 'SCHEDULE' | 'OPERATOR' | 'DEMO';
  readonly policyVersion?: string;
  readonly promptVersion?: string;
  /** Draft the two messages for an eligible contact. */
  readonly draftMessages: (input: DraftRequest) => Promise<DraftedMessages>;
}

export interface DraftRequest {
  readonly contact: LemlistContact;
  readonly supportedObservations: readonly string[];
  readonly launchPhrase: string | null;
  readonly profile: PipelineProfile;
}

export interface DraftedMessages {
  readonly connectionMessage: string;
  readonly firstMessage: string;
}

export interface ContactOutcome {
  readonly lemlistContactId: string;
  readonly companyName: string | null;
  readonly finding: string;
  readonly decision: TierDecision;
  readonly drafted: boolean;
  readonly validationBlocked: readonly string[];
}

export interface EnrichmentRunResult {
  readonly runId: string;
  readonly processed: number;
  readonly includeCount: number;
  readonly manualReviewCount: number;
  readonly excludeCount: number;
  readonly outcomes: readonly ContactOutcome[];
  readonly acquisitionStopReason: string;
  readonly halted: boolean;
  readonly haltReason: string | null;
  readonly import: ImportStageResult | null;
}

/** Every adapter operation the per-contact fan-out depends on. */
const REQUIRED_OPERATIONS = ['lemlist.searchContacts', 'research.fetchPage'] as const;

export async function runEnrichment(input: EnrichmentRunInput): Promise<EnrichmentRunResult> {
  const { ctx, sql } = input;
  const profile = input.profile ?? NEW_BUSINESSES_PROFILE;
  const policyVersion = input.policyVersion ?? '1.0.0';
  const promptVersion = input.promptVersion ?? '1.0.0';

  const envelope = await insertRunEnvelope(sql, {
    correlationId: `enrich-${Date.now().toString(36)}`,
    engine: 'ENRICHMENT',
    trigger: input.trigger ?? 'SCHEDULE',
    environment: ctx.config.RUNTIME_MODE,
    runtimeMode: ctx.config.RUNTIME_MODE,
    policyVersion,
    promptVersions: { 'enrichment-message': promptVersion },
    modelVersions: { drafting: ctx.config.ANTHROPIC_DRAFT_MODEL },
    integrationVersions: { lemlist: 'v1' },
    inputSnapshotHash: contentHash(`${profile.profileId}:${String(profile.version)}`),
  });
  const runId = envelope.id;

  const profileRow = await upsertPipelineProfile(sql, profile);
  const enrichmentRun = await sql.query<{ id: string }>(
    `INSERT INTO enrichment_runs (run_id, pipeline_profile_id, source_list_id, requested_batch_size)
     VALUES ($1, $2, $3, $4) RETURNING id`,
    [runId, profileRow.id, profile.sourceListId, input.batchSize],
  );
  const enrichmentRunId = enrichmentRun.rows[0]?.id;
  if (enrichmentRunId === undefined) throw new Error('enrichment run insert returned no row');

  const halt = async (reason: string): Promise<EnrichmentRunResult> => {
    await sql.query(`UPDATE enrichment_runs SET halted = true, halt_reason = $2 WHERE id = $1`, [
      enrichmentRunId,
      reason,
    ]);
    await completeRunEnvelope(sql, runId, 'ABORTED', reason);
    ctx.logger.warn('enrichment_halted', { runId, reason });
    return {
      runId,
      processed: 0,
      includeCount: 0,
      manualReviewCount: 0,
      excludeCount: 0,
      outcomes: [],
      acquisitionStopReason: 'HALTED',
      halted: true,
      haltReason: reason,
      import: null,
    };
  };

  // --- preflight ------------------------------------------------------------
  // One caller proves the shared dependencies with the real adapters. No
  // per-contact work starts until they answer, because five workers each
  // rediscovering the same block is the most expensive bug in this repo's
  // history.
  const capabilities = await probeCapabilities(input);
  const preflight = preflightBeforeFanOut({
    requiredOperations: [...REQUIRED_OPERATIONS],
    registry: capabilities,
    now: new Date(),
  });
  if (!preflight.mayFanOut) {
    return halt(
      `preflight failed for ${[...preflight.blockedOperations, ...preflight.unregisteredOperations].join(', ')}`,
    );
  }
  if (preflight.degradedOperations.length > 0) {
    ctx.logger.warn('enrichment_degraded_evidence', {
      runId,
      operations: preflight.degradedOperations,
    });
  }

  // --- acquire --------------------------------------------------------------
  const alreadyProcessed = await loadProcessedContactIds(sql, profileRow.id);
  const acquisition = await acquireContacts({
    lemlist: ctx.lemlist,
    sql,
    enrichmentRunId,
    listId: profile.sourceListId,
    alreadyProcessedIds: alreadyProcessed,
    pageSize: input.pageSize ?? 100,
    targetNewContacts: input.batchSize,
  });

  const outcomes: ContactOutcome[] = [];
  const tier1Candidates: ImportCandidate[] = [];
  let includeCount = 0;
  let manualReviewCount = 0;
  let excludeCount = 0;

  for (const contact of acquisition.contacts) {
    // One transaction per contact: an interruption costs this contact, not the
    // batch.
    const outcome = await withTransaction(async (tx) => {
      const sourceContact = await upsertSourceContact(tx, {
        pipelineProfileId: profileRow.id,
        lemlistContactId: contact._id,
        lemlistCompanyId: contact.companyId ?? null,
        firstName: contact.firstName ?? null,
        lastName: contact.lastName ?? null,
        email: contact.email ?? null,
        linkedinUrl: contact.linkedinUrl ?? null,
        companyName: contact.companyName ?? null,
        companyDomain: contact.companyDomain ?? null,
        rawHints: contact.hints ?? {},
      });

      const website = await assessWebsite({
        research: ctx.research,
        domain: contact.companyDomain ?? null,
      });
      await insertWebsiteAssessment(tx, {
        sourceContactId: sourceContact.id,
        runId,
        classification: website.assessment.websiteClass,
        confidence: website.assessment.confidence,
        verifiedObservation: website.assessment.supportedObservations[0] ?? null,
        sourceAdapter: website.adapterUsed,
        fetchSucceeded: website.fetchSucceeded,
      });

      // The upstream filter is a starting hypothesis with recorded provenance,
      // never an unverified fact, and never applied to a list that has not
      // earned it.
      const hypothesis = initialLaunchHypothesis(profile);
      const identity = await verifyIdentity(input, contact);

      await insertCompanyResolution(tx, {
        sourceContactId: sourceContact.id,
        runId,
        resolvedDomain: contact.companyDomain ?? null,
        resolutionMethod: identity.method,
        identityVerified: identity.verified,
        identityConflict: identity.conflict,
        identityConflictDetail: identity.detail,
        businessPurposeKnown: identity.purposeKnown,
        launchStatus: hypothesis.status,
        launchConfidence: hypothesis.confidence,
        launchPhrase: hypothesis.recencyWording,
        launchEvidenceSource: hypothesis.provenance,
        attemptsMade: identity.attempts,
      });

      const eligibility: EligibilityInput = {
        launchStatus: hypothesis.status,
        launchConfidence: hypothesis.confidence,
        website: website.assessment,
        identityConflict: identity.conflict,
        businessPurposeUnverifiable: !identity.purposeKnown,
        launchEvidenceNamesDifferentPerson: false,
        domainOwnershipAmbiguous: identity.domainAmbiguous,
        wouldRequireInventingOffer: !identity.purposeKnown,
        evidenceConflicts: false,
      };
      const decision = decideTier(eligibility, profile);
      const decisionRow = await insertTierDecision(tx, {
        sourceContactId: sourceContact.id,
        enrichmentRunId,
        pipelineProfileId: profileRow.id,
        eligibility: decision.eligibility,
        tier: decision.tier,
        reasonCodes: decision.reasonCodes,
        predicates: decision.predicates,
        policyVersion,
        overrideReason: mandatoryManualReviewReasons(eligibility).join(', ') || null,
      });

      let drafted = false;
      const validationBlocked: string[] = [];

      if (decision.mayDraftMessages) {
        const messages = await input.draftMessages({
          contact,
          supportedObservations: website.assessment.supportedObservations,
          launchPhrase: hypothesis.recencyWording,
          profile,
        });
        const validation = validateEnrichmentMessages({
          connectionMessage: messages.connectionMessage,
          firstMessage: messages.firstMessage,
          supportedObservations: website.assessment.supportedObservations,
          connectionMessageMaxWords: profile.messages.connectionMessageMaxWords,
          firstMessageMaxWords: profile.messages.firstMessageMaxWords,
        });

        const messageHash = contentHash(
          `${messages.connectionMessage}\n${messages.firstMessage}`,
        );
        const version = await insertMessageVersion(tx, {
          sourceContactId: sourceContact.id,
          tierDecisionId: decisionRow.id,
          connectionMessage: messages.connectionMessage,
          firstMessage: messages.firstMessage,
          firstMessageWordCount: validation.firstMessageWordCount,
          contentHash: messageHash,
          policyVersion,
          promptVersion,
          validatorReport: validation,
        });

        if (validation.ok) {
          drafted = true;
          const importable =
            decision.tier === 'TIER_1' || tier2MayImportImmediately(decision, profile);
          if (importable) {
            tier1Candidates.push({
              sourceContactId: sourceContact.id,
              lemlistContactId: contact._id,
              messageVersionId: version.id,
              messageContentHash: messageHash,
              connectionMessage: messages.connectionMessage,
              firstMessage: messages.firstMessage,
              email: contact.email ?? null,
              linkedinUrl: contact.linkedinUrl ?? null,
              firstName: contact.firstName ?? null,
              lastName: contact.lastName ?? null,
              companyName: contact.companyName ?? null,
            });
          }
        } else {
          // A blocked draft is stored, not discarded: the validator report is
          // how a style regression is found later.
          validationBlocked.push(
            ...validation.violations.filter((v) => v.severity === 'BLOCK').map((v) => v.code),
          );
        }
      }

      await markSourceContactProcessed(tx, sourceContact.id);

      return {
        lemlistContactId: contact._id,
        companyName: contact.companyName ?? null,
        finding:
          website.assessment.supportedObservations[0] ??
          `website classified ${website.assessment.websiteClass}`,
        decision,
        drafted,
        validationBlocked,
      } satisfies ContactOutcome;
    });

    outcomes.push(outcome);
    if (outcome.decision.eligibility === 'INCLUDE') includeCount += 1;
    else if (outcome.decision.eligibility === 'MANUAL_REVIEW') manualReviewCount += 1;
    else excludeCount += 1;
  }

  const importResult =
    tier1Candidates.length === 0
      ? null
      : await runImportStage({
          sql,
          lemlist: ctx.lemlist,
          logger: ctx.logger,
          profile,
          candidates: tier1Candidates,
          providerVersion: 'lemlist-v1',
          liveImportAllowed: ctx.config.canImportToCampaign && profile.allowLiveImport,
        });

  await sql.query(
    `UPDATE enrichment_runs
        SET processed_count = $2, include_count = $3, manual_review_count = $4,
            exclude_count = $5, imported_count = $6, completed_at = now()
      WHERE id = $1`,
    [
      enrichmentRunId,
      outcomes.length,
      includeCount,
      manualReviewCount,
      excludeCount,
      importResult?.imported ?? 0,
    ],
  );
  await completeRunEnvelope(
    sql,
    runId,
    importResult?.status === 'UNKNOWN_REQUIRES_RECONCILIATION'
      ? 'COMPLETED_WITH_ERRORS'
      : 'COMPLETED',
    null,
  );

  return {
    runId,
    processed: outcomes.length,
    includeCount,
    manualReviewCount,
    excludeCount,
    outcomes,
    acquisitionStopReason: acquisition.stopReason,
    halted: false,
    haltReason: null,
    import: importResult,
  };
}

// --- preflight helpers -------------------------------------------------------

async function probeCapabilities(input: EnrichmentRunInput): Promise<ProviderCapability[]> {
  const { ctx, sql } = input;
  const profile = input.profile ?? NEW_BUSINESSES_PROFILE;
  const observations: ProviderCapability[] = [];

  const record = async (
    operation: string,
    provider: string,
    result: {
      reachable: boolean;
      failure: string | null;
      observedFields?: readonly string[];
      missingFields?: readonly string[];
    },
  ): Promise<void> => {
    const capability: ProviderCapability = {
      provider,
      operation,
      auth: 'AUTHENTICATED',
      enablement: 'ENABLED_FOR_RUNTIME',
      reachability: result.reachable ? 'REACHABLE' : 'BLOCKED',
      observedFields: result.observedFields ?? [],
      missingFields: result.missingFields ?? [],
      lastVerifiedAt: new Date().toISOString(),
      lastFailureReason: result.failure,
      freshnessSeconds: 3600,
      approvedFallback: null,
    };
    observations.push(capability);
    await recordCapabilityObservation(sql, {
      provider,
      operation,
      authState: capability.auth,
      enablementState: capability.enablement,
      reachabilityState: capability.reachability,
      observedFields: capability.observedFields,
      missingFields: capability.missingFields,
      lastFailureReason: capability.lastFailureReason,
      approvedFallback: capability.approvedFallback,
    });
  };

  try {
    const sample = await ctx.lemlist.searchContacts({
      listId: profile.sourceListId,
      limit: 1,
      offset: 0,
    });
    const first = sample[0];
    const observed = first === undefined ? [] : Object.keys(first);
    // Fields we would use if they were there. Recording the gap is what stops
    // a fourth run from rediscovering it.
    const wanted = ['companyDomain', 'companyName', 'hints'];
    await record('lemlist.searchContacts', 'lemlist', {
      reachable: true,
      failure: null,
      observedFields: observed,
      missingFields: wanted.filter((f) => !observed.includes(f)),
    });
  } catch (error) {
    await record('lemlist.searchContacts', 'lemlist', {
      reachable: false,
      failure: error instanceof Error ? error.message : 'unknown',
    });
  }

  try {
    // Probe with a URL that is not a prospect's site, so the preflight itself
    // never counts as research on a real company.
    const page = await ctx.research.fetchPage('https://example.com/');
    await record('research.fetchPage', 'research', {
      reachable: page !== null,
      failure: page === null ? 'adapter returned no page' : null,
    });
  } catch (error) {
    await record('research.fetchPage', 'research', {
      reachable: false,
      failure: error instanceof Error ? error.message : 'unknown',
    });
  }

  // Surface anything already unusable before the caller decides to fan out.
  for (const capability of observations) {
    const verdict = evaluateCapability(capability, new Date());
    if (!verdict.usable) {
      ctx.logger.warn('capability_unusable', {
        operation: capability.operation,
        reasonCodes: verdict.reasonCodes,
      });
    }
  }

  return observations;
}

interface IdentityResult {
  readonly verified: boolean;
  readonly conflict: boolean;
  readonly detail: string | null;
  readonly purposeKnown: boolean;
  readonly domainAmbiguous: boolean;
  readonly method: string;
  readonly attempts: number;
}

/**
 * Identity resolution, bounded by the profile's research limits. Two or three
 * targeted attempts, then manual review. "Always try to find a way" means
 * thorough research, not manufactured certainty, so an unresolved identity ends
 * here rather than being filled in.
 */
async function verifyIdentity(
  input: EnrichmentRunInput,
  contact: LemlistContact,
): Promise<IdentityResult> {
  const domain = contact.companyDomain;
  const companyName = contact.companyName;

  const hintText = Object.values(contact.hints ?? {})
    .join(' ')
    .trim();
  // A contact-supplied summary, tagline or job description is often the only
  // statement of what the business actually does.
  const purposeFromHints = hintText.length >= 40;

  if (domain === undefined || domain.length === 0) {
    return {
      verified: false,
      conflict: false,
      detail: null,
      purposeKnown: purposeFromHints,
      domainAmbiguous: false,
      method: 'no-domain',
      attempts: 0,
    };
  }
  if (companyName === undefined || companyName.length === 0) {
    return {
      verified: false,
      conflict: false,
      detail: 'no company name to verify the domain against',
      purposeKnown: purposeFromHints,
      domainAmbiguous: true,
      method: 'no-company-name',
      attempts: 0,
    };
  }

  try {
    const result = await input.ctx.research.verifyIdentity({
      url: domain.startsWith('http') ? domain : `https://${domain}`,
      companyName,
    });
    return {
      verified: result.verified,
      // Reaching a working site that does not mention the company is the
      // BEKLOG signature, and it outranks every mechanical score.
      conflict: !result.verified && result.source !== null,
      detail: result.detail,
      purposeKnown: purposeFromHints || result.verified,
      domainAmbiguous: false,
      method: 'research.verifyIdentity',
      attempts: 1,
    };
  } catch (error) {
    return {
      verified: false,
      conflict: false,
      detail: error instanceof Error ? error.message : 'identity check failed',
      purposeKnown: purposeFromHints,
      domainAmbiguous: true,
      method: 'research.verifyIdentity',
      attempts: 1,
    };
  }
}

/**
 * The compact batch report from section 7.8. Routine work is a table, not
 * prose; blockers get their own escalation path elsewhere.
 */
export function formatRunReport(result: EnrichmentRunResult): string {
  const lines = [
    `Processed ${String(result.processed)} contacts: ` +
      `${String(result.includeCount)} include, ` +
      `${String(result.manualReviewCount)} manual review, ` +
      `${String(result.excludeCount)} exclude.`,
    '',
    '| Company | Finding | Outcome | Tier | Drafted |',
    '| --- | --- | --- | --- | --- |',
  ];
  for (const outcome of result.outcomes) {
    lines.push(
      `| ${outcome.companyName ?? outcome.lemlistContactId} | ${outcome.finding} | ` +
        `${outcome.decision.eligibility} | ${outcome.decision.tier} | ` +
        `${outcome.drafted ? 'yes' : 'no'} |`,
    );
  }
  if (result.import !== null) {
    lines.push('', `Import: ${result.import.status} (${String(result.import.imported)} leads).`);
    if (result.import.operatorMessage !== null) lines.push(result.import.operatorMessage);
  }
  return lines.join('\n');
}
