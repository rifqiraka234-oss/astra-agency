import type {
  CampaignEligibility,
  ImportStatus,
  LaunchConfidence,
  LaunchStatus,
  PipelineProfile,
  RunEngine,
  RunStatus,
  RunTrigger,
  Tier,
  TierPredicate,
  WebsiteClass,
  WebsiteConfidence,
} from '@astra/core';
import { query, queryOne, type Sql } from './client.js';

/**
 * Typed access to the unified agent tables.
 *
 * Same discipline as `repositories.ts`: these map rows and enforce the
 * constraints the schema already declares. Nothing here decides whether an
 * action is permitted; that lives in `@astra/core` so it can be tested without
 * a database. The one thing this module does insist on is *ordering* — the
 * import intent is written before any provider call is possible, because the
 * function that performs the call takes an intent id it cannot invent.
 */

// --- run envelopes -----------------------------------------------------------

export interface RunEnvelopeRow {
  readonly id: string;
  readonly correlation_id: string;
  readonly engine: RunEngine;
  readonly trigger: RunTrigger;
  readonly runtime_mode: string;
  readonly status: RunStatus;
  readonly external_writes_requested: number;
  readonly external_writes_allowed: number;
  readonly external_writes_completed: number;
  readonly started_at: Date;
  readonly completed_at: Date | null;
}

export async function insertRunEnvelope(
  sql: Sql,
  input: {
    correlationId: string;
    engine: RunEngine;
    trigger: RunTrigger;
    environment: string;
    runtimeMode: string;
    policyVersion: string;
    promptVersions: Record<string, string>;
    modelVersions: Record<string, string>;
    integrationVersions: Record<string, string>;
    inputSnapshotHash: string | null;
  },
): Promise<RunEnvelopeRow> {
  const row = await queryOne<RunEnvelopeRow>(
    sql,
    `INSERT INTO run_envelopes
       (correlation_id, engine, trigger, environment, runtime_mode, policy_version,
        prompt_versions, model_versions, integration_versions, input_snapshot_hash)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
     RETURNING id, correlation_id, engine, trigger, runtime_mode, status,
               external_writes_requested, external_writes_allowed,
               external_writes_completed, started_at, completed_at`,
    [
      input.correlationId,
      input.engine,
      input.trigger,
      input.environment,
      input.runtimeMode,
      input.policyVersion,
      JSON.stringify(input.promptVersions),
      JSON.stringify(input.modelVersions),
      JSON.stringify(input.integrationVersions),
      input.inputSnapshotHash,
    ],
  );
  if (row === null) throw new Error('run envelope insert returned no row');
  return row;
}

export async function bumpRunWriteCounters(
  sql: Sql,
  runId: string,
  delta: { requested?: number; allowed?: number; completed?: number },
): Promise<void> {
  await query(
    sql,
    `UPDATE run_envelopes
        SET external_writes_requested = external_writes_requested + $2,
            external_writes_allowed   = external_writes_allowed + $3,
            external_writes_completed = external_writes_completed + $4
      WHERE id = $1`,
    [runId, delta.requested ?? 0, delta.allowed ?? 0, delta.completed ?? 0],
  );
}

export async function completeRunEnvelope(
  sql: Sql,
  runId: string,
  status: RunStatus,
  haltReason: string | null,
): Promise<void> {
  await query(
    sql,
    `UPDATE run_envelopes SET status = $2, halt_reason = $3, completed_at = now() WHERE id = $1`,
    [runId, status, haltReason],
  );
}

/**
 * Runs left `RUNNING` by a killed process. They are marked `INTERRUPTED` rather
 * than failed, because interrupted is the only non-running status the resume
 * logic will touch.
 */
export async function markStaleRunsInterrupted(
  sql: Sql,
  olderThanMinutes: number,
): Promise<number> {
  const rows = await query<{ id: string }>(
    sql,
    `UPDATE run_envelopes
        SET status = 'INTERRUPTED'
      WHERE status = 'RUNNING'
        AND started_at < now() - ($1 || ' minutes')::interval
      RETURNING id`,
    [String(olderThanMinutes)],
  );
  return rows.length;
}

// --- provider capabilities ---------------------------------------------------

export interface ProviderCapabilityRow {
  readonly id: string;
  readonly provider: string;
  readonly operation: string;
  readonly auth_state: string;
  readonly enablement_state: string;
  readonly reachability_state: string;
  readonly observed_fields: string[];
  readonly missing_fields: string[];
  readonly last_verified_at: Date | null;
  readonly last_failure_reason: string | null;
  readonly approved_fallback: string | null;
}

export async function recordCapabilityObservation(
  sql: Sql,
  input: {
    provider: string;
    operation: string;
    authState: string;
    enablementState: string;
    reachabilityState: string;
    observedFields: readonly string[];
    missingFields: readonly string[];
    lastFailureReason: string | null;
    approvedFallback: string | null;
  },
): Promise<ProviderCapabilityRow> {
  const row = await queryOne<ProviderCapabilityRow>(
    sql,
    `INSERT INTO provider_capabilities
       (provider, operation, auth_state, enablement_state, reachability_state,
        observed_fields, missing_fields, last_verified_at, last_failure_reason, approved_fallback)
     VALUES ($1, $2, $3, $4, $5, $6, $7, now(), $8, $9)
     ON CONFLICT (provider, operation) DO UPDATE SET
       auth_state          = excluded.auth_state,
       enablement_state    = excluded.enablement_state,
       reachability_state  = excluded.reachability_state,
       observed_fields     = excluded.observed_fields,
       missing_fields      = excluded.missing_fields,
       last_verified_at    = now(),
       last_failure_reason = excluded.last_failure_reason,
       approved_fallback   = excluded.approved_fallback
     RETURNING id, provider, operation, auth_state, enablement_state, reachability_state,
               observed_fields, missing_fields, last_verified_at, last_failure_reason,
               approved_fallback`,
    [
      input.provider,
      input.operation,
      input.authState,
      input.enablementState,
      input.reachabilityState,
      input.observedFields,
      input.missingFields,
      input.lastFailureReason,
      input.approvedFallback,
    ],
  );
  if (row === null) throw new Error('capability upsert returned no row');
  return row;
}

export async function listCapabilities(sql: Sql): Promise<ProviderCapabilityRow[]> {
  return query<ProviderCapabilityRow>(
    sql,
    `SELECT id, provider, operation, auth_state, enablement_state, reachability_state,
            observed_fields, missing_fields, last_verified_at, last_failure_reason,
            approved_fallback
       FROM provider_capabilities ORDER BY provider, operation`,
  );
}

// --- pipeline profiles -------------------------------------------------------

export interface PipelineProfileRow {
  readonly id: string;
  readonly name: string;
  readonly version: number;
  readonly source_list_id: string;
  readonly destination_campaign_id: string | null;
  readonly upstream_filters: unknown;
  readonly tier_policy: unknown;
  readonly message_policy: unknown;
  readonly import_policy: unknown;
  readonly research_limits: unknown;
  readonly live_permissions: unknown;
  readonly is_active: boolean;
}

export async function upsertPipelineProfile(
  sql: Sql,
  profile: PipelineProfile,
): Promise<PipelineProfileRow> {
  const row = await queryOne<PipelineProfileRow>(
    sql,
    `INSERT INTO pipeline_profiles
       (name, version, source_list_id, destination_campaign_id, upstream_filters,
        tier_policy, message_policy, import_policy, research_limits, live_permissions)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
     ON CONFLICT (source_list_id, version) DO UPDATE SET
       name                    = excluded.name,
       destination_campaign_id = excluded.destination_campaign_id,
       upstream_filters        = excluded.upstream_filters,
       tier_policy             = excluded.tier_policy,
       message_policy          = excluded.message_policy,
       import_policy           = excluded.import_policy,
       research_limits         = excluded.research_limits,
       live_permissions        = excluded.live_permissions
     RETURNING id, name, version, source_list_id, destination_campaign_id, upstream_filters,
               tier_policy, message_policy, import_policy, research_limits, live_permissions,
               is_active`,
    [
      profile.name,
      profile.version,
      profile.sourceListId,
      profile.import.destinationCampaignId,
      JSON.stringify(profile.upstreamFilters),
      JSON.stringify(profile.tierPolicy),
      JSON.stringify(profile.messages),
      JSON.stringify(profile.import),
      JSON.stringify(profile.research),
      JSON.stringify({ allowLiveImport: profile.allowLiveImport }),
    ],
  );
  if (row === null) throw new Error('pipeline profile upsert returned no row');
  return row;
}

// --- source contacts and the durable processed set ---------------------------

export interface SourceContactRow {
  readonly id: string;
  readonly lemlist_contact_id: string;
  readonly company_name: string | null;
  readonly company_domain: string | null;
  readonly last_processed_at: Date | null;
}

export async function upsertSourceContact(
  sql: Sql,
  input: {
    pipelineProfileId: string;
    lemlistContactId: string;
    lemlistCompanyId?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    email?: string | null;
    linkedinUrl?: string | null;
    companyName?: string | null;
    companyDomain?: string | null;
    rawHints?: Record<string, unknown>;
  },
): Promise<SourceContactRow> {
  const row = await queryOne<SourceContactRow>(
    sql,
    `INSERT INTO source_contacts
       (pipeline_profile_id, lemlist_contact_id, lemlist_company_id, first_name, last_name,
        email, linkedin_url, company_name, company_domain, raw_hints)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
     ON CONFLICT (pipeline_profile_id, lemlist_contact_id) DO UPDATE SET
       company_name   = coalesce(excluded.company_name, source_contacts.company_name),
       company_domain = coalesce(excluded.company_domain, source_contacts.company_domain),
       raw_hints      = source_contacts.raw_hints || excluded.raw_hints
     RETURNING id, lemlist_contact_id, company_name, company_domain, last_processed_at`,
    [
      input.pipelineProfileId,
      input.lemlistContactId,
      input.lemlistCompanyId ?? null,
      input.firstName ?? null,
      input.lastName ?? null,
      input.email ?? null,
      input.linkedinUrl ?? null,
      input.companyName ?? null,
      input.companyDomain ?? null,
      JSON.stringify(input.rawHints ?? {}),
    ],
  );
  if (row === null) throw new Error('source contact upsert returned no row');
  return row;
}

/**
 * The durable processed set. This is what replaces offset arithmetic: a page
 * may legitimately return contacts we have already handled, and the only
 * question that matters is whether *this* ID has been decided before.
 */
export async function loadProcessedContactIds(
  sql: Sql,
  pipelineProfileId: string,
): Promise<Set<string>> {
  const rows = await query<{ lemlist_contact_id: string }>(
    sql,
    `SELECT lemlist_contact_id
       FROM source_contacts
      WHERE pipeline_profile_id = $1 AND last_processed_at IS NOT NULL`,
    [pipelineProfileId],
  );
  return new Set(rows.map((r) => r.lemlist_contact_id));
}

export async function markSourceContactProcessed(sql: Sql, sourceContactId: string): Promise<void> {
  await query(sql, `UPDATE source_contacts SET last_processed_at = now() WHERE id = $1`, [
    sourceContactId,
  ]);
}

export async function recordFetchPage(
  sql: Sql,
  input: {
    enrichmentRunId: string;
    pageIndex: number;
    requestedOffset: number;
    requestedLimit: number;
    returnedCount: number;
    newIdCount: number;
    returnedIdsHash: string;
    noProgress: boolean;
  },
): Promise<void> {
  await query(
    sql,
    `INSERT INTO source_fetch_pages
       (enrichment_run_id, page_index, requested_offset, requested_limit,
        returned_count, new_id_count, returned_ids_hash, no_progress)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
    [
      input.enrichmentRunId,
      input.pageIndex,
      input.requestedOffset,
      input.requestedLimit,
      input.returnedCount,
      input.newIdCount,
      input.returnedIdsHash,
      input.noProgress,
    ],
  );
}

// --- assessments and decisions ----------------------------------------------

export async function insertWebsiteAssessment(
  sql: Sql,
  input: {
    sourceContactId: string;
    runId: string | null;
    classification: WebsiteClass;
    confidence: WebsiteConfidence;
    verifiedObservation: string | null;
    sourceAdapter: string;
    fetchSucceeded: boolean;
  },
): Promise<string> {
  const row = await queryOne<{ id: string }>(
    sql,
    `INSERT INTO website_assessments
       (source_contact_id, run_id, classification, confidence, verified_observation,
        source_adapter, fetch_succeeded)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING id`,
    [
      input.sourceContactId,
      input.runId,
      input.classification,
      input.confidence,
      input.verifiedObservation,
      input.sourceAdapter,
      input.fetchSucceeded,
    ],
  );
  if (row === null) throw new Error('website assessment insert returned no row');
  return row.id;
}

export async function insertCompanyResolution(
  sql: Sql,
  input: {
    sourceContactId: string;
    runId: string | null;
    resolvedDomain: string | null;
    resolutionMethod: string;
    identityVerified: boolean;
    identityConflict: boolean;
    identityConflictDetail: string | null;
    businessPurposeKnown: boolean;
    launchStatus: LaunchStatus;
    launchConfidence: LaunchConfidence;
    launchPhrase: string | null;
    launchEvidenceSource: string | null;
    attemptsMade: number;
  },
): Promise<string> {
  const row = await queryOne<{ id: string }>(
    sql,
    `INSERT INTO company_resolutions
       (source_contact_id, run_id, resolved_domain, resolution_method, identity_verified,
        identity_conflict, identity_conflict_detail, business_purpose_known, launch_status,
        launch_confidence, launch_phrase, launch_evidence_source, attempts_made)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
     RETURNING id`,
    [
      input.sourceContactId,
      input.runId,
      input.resolvedDomain,
      input.resolutionMethod,
      input.identityVerified,
      input.identityConflict,
      input.identityConflictDetail,
      input.businessPurposeKnown,
      input.launchStatus,
      input.launchConfidence,
      input.launchPhrase,
      input.launchEvidenceSource,
      input.attemptsMade,
    ],
  );
  if (row === null) throw new Error('company resolution insert returned no row');
  return row.id;
}

export interface TierDecisionRow {
  readonly id: string;
  readonly source_contact_id: string;
  readonly eligibility: CampaignEligibility;
  readonly tier: Tier;
  readonly reason_codes: string[];
  readonly decided_at: Date;
}

export async function insertTierDecision(
  sql: Sql,
  input: {
    sourceContactId: string;
    enrichmentRunId: string | null;
    pipelineProfileId: string;
    eligibility: CampaignEligibility;
    tier: Tier;
    reasonCodes: readonly string[];
    predicates: readonly TierPredicate[];
    policyVersion: string;
    overrideReason: string | null;
  },
): Promise<TierDecisionRow> {
  const row = await queryOne<TierDecisionRow>(
    sql,
    `INSERT INTO tier_decisions
       (source_contact_id, enrichment_run_id, pipeline_profile_id, eligibility, tier,
        reason_codes, predicates, policy_version, override_reason)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
     RETURNING id, source_contact_id, eligibility, tier, reason_codes, decided_at`,
    [
      input.sourceContactId,
      input.enrichmentRunId,
      input.pipelineProfileId,
      input.eligibility,
      input.tier,
      input.reasonCodes,
      JSON.stringify(input.predicates),
      input.policyVersion,
      input.overrideReason,
    ],
  );
  if (row === null) throw new Error('tier decision insert returned no row');
  return row;
}

export async function insertMessageVersion(
  sql: Sql,
  input: {
    sourceContactId: string;
    tierDecisionId: string | null;
    connectionMessage: string;
    firstMessage: string;
    firstMessageWordCount: number;
    contentHash: string;
    policyVersion: string;
    promptVersion: string;
    validatorReport: unknown;
  },
): Promise<{ id: string; version: number }> {
  const row = await queryOne<{ id: string; version: number }>(
    sql,
    `INSERT INTO enrichment_message_versions
       (source_contact_id, tier_decision_id, version, connection_message, first_message,
        first_message_word_count, content_hash, policy_version, prompt_version, validator_report)
     VALUES ($1, $2,
             (SELECT coalesce(max(version), 0) + 1 FROM enrichment_message_versions WHERE source_contact_id = $1),
             $3, $4, $5, $6, $7, $8, $9)
     RETURNING id, version`,
    [
      input.sourceContactId,
      input.tierDecisionId,
      input.connectionMessage,
      input.firstMessage,
      input.firstMessageWordCount,
      input.contentHash,
      input.policyVersion,
      input.promptVersion,
      JSON.stringify(input.validatorReport),
    ],
  );
  if (row === null) throw new Error('message version insert returned no row');
  return row;
}

// --- the import transaction --------------------------------------------------

export interface ImportIntentRow {
  readonly id: string;
  readonly source_contact_id: string;
  readonly message_version_id: string;
  readonly campaign_id: string;
  readonly idempotency_key: string;
  readonly status: ImportStatus;
}

/**
 * Step 1 of section 7.7, and the only way to obtain an intent id. Everything
 * that can actually call Lemlist requires one, so the audit row cannot be
 * skipped by forgetting to write it.
 */
export async function createImportIntent(
  sql: Sql,
  input: {
    sourceContactId: string;
    messageVersionId: string;
    campaignId: string;
    idempotencyKey: string;
  },
): Promise<{ intent: ImportIntentRow; alreadyExisted: boolean }> {
  const inserted = await queryOne<ImportIntentRow>(
    sql,
    `INSERT INTO campaign_import_intents
       (source_contact_id, message_version_id, campaign_id, idempotency_key)
     VALUES ($1, $2, $3, $4)
     ON CONFLICT (idempotency_key) DO NOTHING
     RETURNING id, source_contact_id, message_version_id, campaign_id, idempotency_key, status`,
    [input.sourceContactId, input.messageVersionId, input.campaignId, input.idempotencyKey],
  );
  if (inserted !== null) return { intent: inserted, alreadyExisted: false };

  const existing = await queryOne<ImportIntentRow>(
    sql,
    `SELECT id, source_contact_id, message_version_id, campaign_id, idempotency_key, status
       FROM campaign_import_intents WHERE idempotency_key = $1`,
    [input.idempotencyKey],
  );
  if (existing === null) throw new Error('import intent conflict resolved to no row');
  return { intent: existing, alreadyExisted: true };
}

export async function setImportIntentStatus(
  sql: Sql,
  intentId: string,
  status: ImportStatus | 'BLOCKED',
  detail: string | null,
): Promise<void> {
  await query(
    sql,
    `UPDATE campaign_import_intents
        SET status         = $2,
            blocked_reason = $3,
            attempted_at   = CASE WHEN $2 = 'IN_FLIGHT' THEN now() ELSE attempted_at END,
            completed_at   = CASE WHEN $2 IN ('SUCCEEDED','FAILED','REJECTED','BLOCKED')
                                  THEN now() ELSE completed_at END
      WHERE id = $1`,
    [intentId, status, detail],
  );
}

export async function recordImportResult(
  sql: Sql,
  input: {
    importIntentId: string;
    providerResponse: unknown;
    providerLeadId: string | null;
    errorDetail: string | null;
  },
): Promise<string> {
  const row = await queryOne<{ id: string }>(
    sql,
    `INSERT INTO campaign_import_results
       (import_intent_id, provider_response, provider_lead_id, error_detail)
     VALUES ($1, $2, $3, $4)
     RETURNING id`,
    [
      input.importIntentId,
      input.providerResponse === undefined ? null : JSON.stringify(input.providerResponse),
      input.providerLeadId,
      input.errorDetail,
    ],
  );
  if (row === null) throw new Error('import result insert returned no row');
  return row.id;
}

export async function recordFieldVerification(
  sql: Sql,
  resultId: string,
  verified: boolean,
  detail: unknown,
): Promise<void> {
  await query(
    sql,
    `UPDATE campaign_import_results
        SET fields_verified = $2, fields_verified_at = now(), field_verification = $3
      WHERE id = $1`,
    [resultId, verified, JSON.stringify(detail)],
  );
}

// --- confirmation gates ------------------------------------------------------

export interface ConfirmationGateRow {
  readonly id: string;
  readonly gate_key: string;
  readonly scope: string;
  readonly scope_id: string | null;
  readonly confirmed: boolean;
  readonly confirmed_at: Date | null;
  readonly subject_hash: string | null;
  readonly provider_version: string | null;
  readonly invalidated_at: Date | null;
}

export async function findConfirmationGate(
  sql: Sql,
  gateKey: string,
  scope: string,
  scopeId: string | null,
): Promise<ConfirmationGateRow | null> {
  return queryOne<ConfirmationGateRow>(
    sql,
    `SELECT id, gate_key, scope, scope_id, confirmed, confirmed_at, subject_hash,
            provider_version, invalidated_at
       FROM confirmation_gates
      WHERE gate_key = $1 AND scope = $2 AND coalesce(scope_id, '') = coalesce($3, '')
        AND invalidated_at IS NULL`,
    [gateKey, scope, scopeId],
  );
}

export async function recordConfirmationGate(
  sql: Sql,
  input: {
    gateKey: string;
    scope: string;
    scopeId: string | null;
    confirmedBy: string | null;
    evidence: unknown;
    subjectHash: string;
    providerVersion: string;
  },
): Promise<ConfirmationGateRow> {
  const row = await queryOne<ConfirmationGateRow>(
    sql,
    `INSERT INTO confirmation_gates
       (gate_key, scope, scope_id, confirmed, confirmed_by, confirmed_at, evidence,
        subject_hash, provider_version)
     VALUES ($1, $2, $3, true, $4, now(), $5, $6, $7)
     RETURNING id, gate_key, scope, scope_id, confirmed, confirmed_at, subject_hash,
               provider_version, invalidated_at`,
    [
      input.gateKey,
      input.scope,
      input.scopeId,
      input.confirmedBy,
      JSON.stringify(input.evidence),
      input.subjectHash,
      input.providerVersion,
    ],
  );
  if (row === null) throw new Error('confirmation gate insert returned no row');
  return row;
}

export async function invalidateConfirmationGate(
  sql: Sql,
  gateId: string,
  reason: string,
): Promise<void> {
  await query(
    sql,
    `UPDATE confirmation_gates SET invalidated_at = now(), invalidated_reason = $2 WHERE id = $1`,
    [gateId, reason],
  );
}

// --- the Tier 2 queue --------------------------------------------------------

export interface Tier2QueueRow {
  readonly decision_id: string;
  readonly source_contact_id: string;
  readonly lemlist_contact_id: string;
  readonly first_name: string | null;
  readonly last_name: string | null;
  readonly company_name: string | null;
  readonly company_domain: string | null;
  readonly eligibility: CampaignEligibility;
  readonly reason_codes: string[];
  readonly connection_message: string | null;
  readonly first_message: string | null;
  readonly decided_at: Date;
}

/**
 * The single database-backed replacement for the historical `tier2_queue.jsonl`
 * plus its hand-maintained `tier2_queue.md` mirror. The Markdown and JSONL
 * exports are now views over this, so they cannot drift apart.
 */
export async function loadTier2Queue(sql: Sql, limit = 500): Promise<Tier2QueueRow[]> {
  return query<Tier2QueueRow>(
    sql,
    `SELECT td.id AS decision_id,
            sc.id AS source_contact_id,
            sc.lemlist_contact_id,
            sc.first_name,
            sc.last_name,
            sc.company_name,
            sc.company_domain,
            td.eligibility,
            td.reason_codes,
            mv.connection_message,
            mv.first_message,
            td.decided_at
       FROM tier_decisions td
       JOIN source_contacts sc ON sc.id = td.source_contact_id
       LEFT JOIN LATERAL (
         SELECT connection_message, first_message
           FROM enrichment_message_versions
          WHERE source_contact_id = sc.id
          ORDER BY version DESC
          LIMIT 1
       ) mv ON true
      WHERE td.tier = 'TIER_2'
        AND NOT EXISTS (
          SELECT 1 FROM campaign_import_intents cii
           WHERE cii.source_contact_id = sc.id AND cii.status = 'SUCCEEDED'
        )
      ORDER BY td.decided_at DESC
      LIMIT $1`,
    [limit],
  );
}

export interface Tier2Counts {
  readonly manualReview: number;
  readonly doNotUse: number;
  readonly lowConfidenceInclude: number;
}

export function summarizeTier2Queue(rows: readonly Tier2QueueRow[]): Tier2Counts {
  let manualReview = 0;
  let doNotUse = 0;
  let lowConfidenceInclude = 0;
  for (const row of rows) {
    if (row.eligibility === 'INCLUDE') lowConfidenceInclude += 1;
    else if (row.reason_codes.includes('LAUNCH_DO_NOT_USE')) doNotUse += 1;
    else manualReview += 1;
  }
  return { manualReview, doNotUse, lowConfidenceInclude };
}

/** JSONL export, byte-for-byte reproducible from the queue rows. */
export function tier2QueueToJsonl(rows: readonly Tier2QueueRow[]): string {
  return rows
    .map((r) =>
      JSON.stringify({
        contactId: r.lemlist_contact_id,
        name: [r.first_name, r.last_name].filter(Boolean).join(' '),
        company: r.company_name,
        domain: r.company_domain,
        eligibility: r.eligibility,
        reasonCodes: r.reason_codes,
        connectionMessage: r.connection_message,
        firstMessage: r.first_message,
        decidedAt: r.decided_at.toISOString(),
      }),
    )
    .join('\n');
}

/** The human-readable mirror, generated rather than maintained by hand. */
export function tier2QueueToMarkdown(rows: readonly Tier2QueueRow[]): string {
  const counts = summarizeTier2Queue(rows);
  const header = [
    `# Tier 2 queue (${String(rows.length)} rows)`,
    '',
    `Manual review: ${String(counts.manualReview)} | Do not use: ${String(counts.doNotUse)} | Low confidence include: ${String(counts.lowConfidenceInclude)}`,
    '',
    '| Name | Company | Outcome | Reasons | Connection message | First message |',
    '| --- | --- | --- | --- | --- | --- |',
  ].join('\n');

  const cell = (value: string | null): string =>
    value === null ? '' : value.replace(/\|/g, '\\|').replace(/\n/g, ' ');

  const body = rows
    .map((r) =>
      [
        cell([r.first_name, r.last_name].filter(Boolean).join(' ')),
        cell(r.company_name),
        r.eligibility,
        r.reason_codes.join(', '),
        cell(r.connection_message),
        cell(r.first_message),
      ]
        .map((c) => ` ${c} `)
        .join('|'),
    )
    .map((row) => `|${row}|`)
    .join('\n');

  return `${header}\n${body}\n`;
}
