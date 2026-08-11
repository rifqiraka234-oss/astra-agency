import type {
  ApprovalStatus,
  Channel,
  ConversationOwner,
  ConversationState,
  Exclusion,
  NormalizedConversation,
} from '@astra/core';
import { query, queryOne, type Sql } from './client.js';

/**
 * Typed data access.
 *
 * These functions are intentionally thin: they map rows to types and enforce
 * the idempotency constraints declared in the schema. No policy decision is
 * made here. Anything that decides whether something may happen lives in
 * `@astra/core`, so it can be tested without a database.
 */

// --- contacts and conversations ---------------------------------------------

export interface ContactRow {
  readonly id: string;
  readonly lemlist_contact_id: string;
  readonly email: string | null;
  readonly first_name: string | null;
  readonly last_name: string | null;
  readonly company_name: string | null;
  readonly company_domain: string | null;
  readonly timezone: string | null;
  readonly is_suppressed: boolean;
}

export async function upsertContact(
  sql: Sql,
  input: {
    lemlistContactId: string;
    email?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    companyName?: string | null;
    companyDomain?: string | null;
    linkedinUrl?: string | null;
  },
): Promise<ContactRow> {
  const row = await queryOne<ContactRow>(
    sql,
    `INSERT INTO contacts (lemlist_contact_id, email, first_name, last_name, company_name, company_domain, linkedin_url)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     ON CONFLICT (lemlist_contact_id) DO UPDATE SET
       email          = coalesce(excluded.email, contacts.email),
       first_name     = coalesce(excluded.first_name, contacts.first_name),
       last_name      = coalesce(excluded.last_name, contacts.last_name),
       company_name   = coalesce(excluded.company_name, contacts.company_name),
       company_domain = coalesce(excluded.company_domain, contacts.company_domain),
       linkedin_url   = coalesce(excluded.linkedin_url, contacts.linkedin_url),
       updated_at     = now()
     RETURNING id, lemlist_contact_id, email, first_name, last_name, company_name, company_domain, timezone, is_suppressed`,
    [
      input.lemlistContactId,
      input.email ?? null,
      input.firstName ?? null,
      input.lastName ?? null,
      input.companyName ?? null,
      input.companyDomain ?? null,
      input.linkedinUrl ?? null,
    ],
  );
  if (!row) throw new Error(`Failed to upsert contact ${input.lemlistContactId}`);
  return row;
}

export interface ConversationRow {
  readonly id: string;
  readonly contact_id: string;
  readonly lemlist_campaign_id: string | null;
  readonly channel: Channel | 'unknown';
  readonly owner: ConversationOwner;
  readonly state: ConversationState;
  readonly conversation_hash: string | null;
  readonly latest_inbound_message_id: string | null;
  readonly meaningful_turn_count: number;
  readonly automated_outbound_count: number;
  readonly meeting_scheduled: boolean;
  readonly post_meeting_decision: 'KEEP_HUMAN' | 'RESUME_LOW_RISK' | 'EXCLUDE' | null;
}

export async function getOrCreateConversation(
  sql: Sql,
  contactId: string,
  campaignId: string | null,
): Promise<ConversationRow> {
  const row = await queryOne<ConversationRow>(
    sql,
    `INSERT INTO conversations (contact_id, lemlist_campaign_id)
     VALUES ($1, $2)
     ON CONFLICT (contact_id) DO UPDATE SET
       lemlist_campaign_id = coalesce(conversations.lemlist_campaign_id, excluded.lemlist_campaign_id),
       updated_at = now()
     RETURNING *`,
    [contactId, campaignId],
  );
  if (!row) throw new Error(`Failed to create conversation for contact ${contactId}`);
  return row;
}

export async function getConversationByContact(
  sql: Sql,
  contactId: string,
): Promise<ConversationRow | null> {
  return queryOne<ConversationRow>(sql, 'SELECT * FROM conversations WHERE contact_id = $1', [
    contactId,
  ]);
}

/**
 * Persist the normalized conversation. Messages are inserted with
 * `ON CONFLICT DO NOTHING` on the Lemlist activity id, so re-fetching the
 * whole inbox is always safe and never duplicates a turn.
 */
export async function syncConversationSnapshot(
  sql: Sql,
  conversationId: string,
  conversation: NormalizedConversation,
): Promise<void> {
  for (const message of conversation.messages) {
    await query(
      sql,
      `INSERT INTO messages (
         conversation_id, external_activity_id, occurred_at, channel, direction, kind,
         body_text, body_html_sanitized, subject, sender, recipients, cc,
         lemlist_campaign_id, lemlist_lead_id, sequence_id, step_id, sequence_position,
         attachments, had_quoted_history
       ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19)
       ON CONFLICT (external_activity_id) DO NOTHING`,
      [
        conversationId,
        message.externalId,
        message.occurredAt,
        message.channel,
        message.direction,
        message.kind,
        message.bodyText,
        message.bodyHtmlSanitized,
        message.subject,
        message.sender,
        message.recipients,
        message.cc,
        message.campaignId,
        message.leadId,
        message.sequenceId,
        message.stepId,
        message.sequencePosition,
        JSON.stringify(message.attachments),
        message.hadQuotedHistory,
      ],
    );
  }

  await query(
    sql,
    `UPDATE conversations SET
       channel                   = $2,
       conversation_hash         = $3,
       latest_inbound_message_id = $4,
       latest_inbound_at         = $5,
       meaningful_turn_count     = $6,
       updated_at                = now()
     WHERE id = $1`,
    [
      conversationId,
      conversation.channel,
      conversation.conversationHash,
      conversation.latestInboundMessageId,
      conversation.latestInboundAt,
      conversation.meaningfulTurnCount,
    ],
  );
}

export async function recordStateTransition(
  sql: Sql,
  input: {
    conversationId: string;
    previousState: ConversationState | null;
    nextState: ConversationState;
    actor: string;
    reasonCode: string;
    detail?: string | null;
    sourceMessageId?: string | null;
    correlationId: string;
  },
): Promise<void> {
  await query(
    sql,
    `INSERT INTO conversation_states
       (conversation_id, previous_state, next_state, actor, reason_code, detail, source_message_id, correlation_id)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
    [
      input.conversationId,
      input.previousState,
      input.nextState,
      input.actor,
      input.reasonCode,
      input.detail ?? null,
      input.sourceMessageId ?? null,
      input.correlationId,
    ],
  );
  await query(sql, 'UPDATE conversations SET state = $2, updated_at = now() WHERE id = $1', [
    input.conversationId,
    input.nextState,
  ]);
}

export async function recordOwnershipChange(
  sql: Sql,
  input: {
    conversationId: string;
    previousOwner: ConversationOwner | null;
    nextOwner: ConversationOwner;
    actor: string;
    reasonCode: string;
    detail?: string | null;
    pauseVerified?: boolean | null;
    correlationId: string;
  },
): Promise<void> {
  await query(
    sql,
    `INSERT INTO ownership_history
       (conversation_id, previous_owner, next_owner, actor, reason_code, detail, pause_verified, correlation_id)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
    [
      input.conversationId,
      input.previousOwner,
      input.nextOwner,
      input.actor,
      input.reasonCode,
      input.detail ?? null,
      input.pauseVerified ?? null,
      input.correlationId,
    ],
  );
  await query(sql, 'UPDATE conversations SET owner = $2, updated_at = now() WHERE id = $1', [
    input.conversationId,
    input.nextOwner,
  ]);
}

// --- webhook ingestion -------------------------------------------------------

export interface WebhookInsertResult {
  readonly id: string;
  readonly duplicate: boolean;
}

/**
 * Insert a webhook event. A repeated delivery collides on `idempotency_key`
 * and reports `duplicate: true` instead of creating a second unit of work.
 */
export async function insertWebhookEvent(
  sql: Sql,
  input: {
    idempotencyKey: string;
    eventType: string;
    teamId: string | null;
    campaignId: string | null;
    leadId: string | null;
    contactId: string | null;
    isThirdPartyReply: boolean;
    rawPayload: unknown;
    sanitizedPayload: unknown;
  },
): Promise<WebhookInsertResult> {
  const inserted = await queryOne<{ id: string }>(
    sql,
    `INSERT INTO webhook_events
       (idempotency_key, event_type, lemlist_team_id, lemlist_campaign_id, lemlist_lead_id,
        lemlist_contact_id, is_third_party_reply, raw_payload, sanitized_payload)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
     ON CONFLICT (idempotency_key) DO NOTHING
     RETURNING id`,
    [
      input.idempotencyKey,
      input.eventType,
      input.teamId,
      input.campaignId,
      input.leadId,
      input.contactId,
      input.isThirdPartyReply,
      JSON.stringify(input.rawPayload),
      JSON.stringify(input.sanitizedPayload),
    ],
  );

  if (inserted) return { id: inserted.id, duplicate: false };

  const existing = await queryOne<{ id: string }>(
    sql,
    'SELECT id FROM webhook_events WHERE idempotency_key = $1',
    [input.idempotencyKey],
  );
  if (!existing) throw new Error('Webhook insert conflicted but the existing row was not found');
  return { id: existing.id, duplicate: true };
}

/**
 * Schedule (or extend) the debounced processing job for a contact. Calling
 * this again while a job is scheduled pushes `process_after` forward, which is
 * how a burst of messages becomes one analysis run.
 */
export async function scheduleProcessing(
  sql: Sql,
  input: { contactId: string; processAfter: Date; correlationId: string; jobType?: string },
): Promise<{ id: string; processAfter: Date }> {
  const row = await queryOne<{ id: string; process_after: Date }>(
    sql,
    `INSERT INTO processing_jobs (contact_id, job_type, process_after, correlation_id)
     VALUES ($1, $2, $3, $4)
     ON CONFLICT (contact_id) WHERE status IN ('SCHEDULED','RUNNING')
     DO UPDATE SET
       process_after = GREATEST(processing_jobs.process_after, excluded.process_after),
       updated_at    = now()
     RETURNING id, process_after`,
    [input.contactId, input.jobType ?? 'ANALYZE_CONVERSATION', input.processAfter, input.correlationId],
  );
  if (!row) throw new Error(`Failed to schedule processing for contact ${input.contactId}`);
  return { id: row.id, processAfter: row.process_after };
}

export async function claimDueJobs(
  sql: Sql,
  now: Date,
  limit = 5,
): Promise<Array<{ id: string; contact_id: string; correlation_id: string; job_type: string }>> {
  return query(
    sql,
    `UPDATE processing_jobs SET status = 'RUNNING', attempts = attempts + 1, updated_at = now()
     WHERE id IN (
       SELECT id FROM processing_jobs
       WHERE status = 'SCHEDULED' AND process_after <= $1
       ORDER BY process_after
       FOR UPDATE SKIP LOCKED
       LIMIT $2
     )
     RETURNING id, contact_id, correlation_id, job_type`,
    [now, limit],
  );
}

export async function finishJob(
  sql: Sql,
  jobId: string,
  status: 'SUCCEEDED' | 'FAILED' | 'CANCELLED',
  error?: string | null,
): Promise<void> {
  await query(
    sql,
    'UPDATE processing_jobs SET status = $2, last_error = $3, updated_at = now() WHERE id = $1',
    [jobId, status, error ?? null],
  );
}

// --- exclusions --------------------------------------------------------------

export async function listActiveExclusions(sql: Sql): Promise<Exclusion[]> {
  const rows = await query<{ scope: Exclusion['scope']; target_id: string | null; reason: string }>(
    sql,
    'SELECT scope, target_id, reason FROM exclusions WHERE active',
  );
  return rows.map((row) => ({
    scope: row.scope,
    targetId: row.target_id,
    reason: row.reason,
    active: true,
  }));
}

export async function addExclusion(
  sql: Sql,
  input: { scope: Exclusion['scope']; targetId: string | null; reason: string; operatorId?: string | null },
): Promise<void> {
  await query(
    sql,
    `INSERT INTO exclusions (scope, target_id, reason, created_by)
     VALUES ($1,$2,$3,$4)
     ON CONFLICT (scope, coalesce(target_id, '')) WHERE active DO NOTHING`,
    [input.scope, input.targetId, input.reason, input.operatorId ?? null],
  );
}

export async function suppressContact(
  sql: Sql,
  contactId: string,
  reason: string,
): Promise<void> {
  await query(
    sql,
    `UPDATE contacts SET is_suppressed = true, suppressed_reason = $2, suppressed_at = now(), updated_at = now()
     WHERE id = $1`,
    [contactId, reason],
  );
  // A suppression also invalidates anything still pending for that contact.
  await query(
    sql,
    `UPDATE approvals SET status = 'SUPERSEDED'
     WHERE status IN ('PENDING','APPROVED')
       AND conversation_id IN (SELECT id FROM conversations WHERE contact_id = $1)`,
    [contactId],
  );
}

// --- decisions and outbound --------------------------------------------------

export async function recordDecision(
  sql: Sql,
  input: {
    conversationId: string;
    modelRunId?: string | null;
    modelRecommendation: string | null;
    controllerAction: string;
    lowRiskCase: string | null;
    intent: string | null;
    confidence: number | null;
    risk: string | null;
    reasonCodes: readonly string[];
    predicates: unknown;
    evidence: unknown;
    policyVersion: string;
    detail: string;
    sourceMessageId: string | null;
    correlationId: string;
  },
): Promise<string> {
  const row = await queryOne<{ id: string }>(
    sql,
    `INSERT INTO decisions
       (conversation_id, model_run_id, model_recommendation, controller_action, low_risk_case,
        intent, confidence, risk, reason_codes, predicates, evidence, policy_version, detail,
        source_message_id, correlation_id)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)
     RETURNING id`,
    [
      input.conversationId,
      input.modelRunId ?? null,
      input.modelRecommendation,
      input.controllerAction,
      input.lowRiskCase,
      input.intent,
      input.confidence,
      input.risk,
      input.reasonCodes,
      JSON.stringify(input.predicates),
      JSON.stringify(input.evidence),
      input.policyVersion,
      input.detail,
      input.sourceMessageId,
      input.correlationId,
    ],
  );
  if (!row) throw new Error('Failed to record decision');
  return row.id;
}

export interface OutboundIntentRow {
  readonly id: string;
  readonly status: string;
  readonly provider_message_id: string | null;
}

/**
 * Create the durable record of intent *before* the external call. If the
 * process dies mid-send, this row is what tells the next run that a send may
 * already have happened.
 */
export async function createOutboundIntent(
  sql: Sql,
  input: {
    conversationId: string;
    decisionId?: string | null;
    approvalId?: string | null;
    channel: Channel;
    actionType: string;
    bodyText: string;
    contentHash: string;
    idempotencyKey: string;
    replyToActivityId?: string | null;
    leadId?: string | null;
    contactId?: string | null;
    sendUserId?: string | null;
    correlationId: string;
  },
): Promise<{ id: string; created: boolean }> {
  const inserted = await queryOne<{ id: string }>(
    sql,
    `INSERT INTO outbound_intents
       (conversation_id, decision_id, approval_id, channel, action_type, body_text, content_hash,
        idempotency_key, reply_to_activity_id, lemlist_lead_id, lemlist_contact_id, send_user_id, correlation_id)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
     ON CONFLICT (idempotency_key) DO NOTHING
     RETURNING id`,
    [
      input.conversationId,
      input.decisionId ?? null,
      input.approvalId ?? null,
      input.channel,
      input.actionType,
      input.bodyText,
      input.contentHash,
      input.idempotencyKey,
      input.replyToActivityId ?? null,
      input.leadId ?? null,
      input.contactId ?? null,
      input.sendUserId ?? null,
      input.correlationId,
    ],
  );
  if (inserted) return { id: inserted.id, created: true };

  const existing = await queryOne<{ id: string }>(
    sql,
    'SELECT id FROM outbound_intents WHERE idempotency_key = $1',
    [input.idempotencyKey],
  );
  if (!existing) throw new Error('Outbound intent conflicted but no existing row was found');
  return { id: existing.id, created: false };
}

export async function markOutboundResult(
  sql: Sql,
  intentId: string,
  input: {
    status: 'SENT' | 'FAILED' | 'BLOCKED' | 'ABANDONED' | 'UNKNOWN';
    providerResponse?: unknown;
    providerMessageId?: string | null;
    errorDetail?: string | null;
  },
): Promise<void> {
  await query(
    sql,
    `UPDATE outbound_intents SET
       status = $2,
       provider_response = $3,
       provider_message_id = $4,
       error_detail = $5,
       completed_at = now()
     WHERE id = $1`,
    [
      intentId,
      input.status,
      input.providerResponse === undefined ? null : JSON.stringify(input.providerResponse),
      input.providerMessageId ?? null,
      input.errorDetail ?? null,
    ],
  );
}

export async function incrementAutomatedOutbound(sql: Sql, conversationId: string): Promise<void> {
  await query(
    sql,
    'UPDATE conversations SET automated_outbound_count = automated_outbound_count + 1, updated_at = now() WHERE id = $1',
    [conversationId],
  );
}

export async function recentOutboundTexts(
  sql: Sql,
  conversationId: string,
  limit = 10,
): Promise<string[]> {
  const rows = await query<{ body_text: string }>(
    sql,
    `SELECT body_text FROM messages
     WHERE conversation_id = $1 AND direction = 'OUTBOUND'
     ORDER BY occurred_at DESC LIMIT $2`,
    [conversationId, limit],
  );
  return rows.map((row) => row.body_text);
}

// --- approvals ---------------------------------------------------------------

export interface ApprovalRow {
  readonly id: string;
  readonly conversation_id: string;
  readonly action_type: string;
  readonly status: ApprovalStatus;
  readonly version: number;
  readonly binding_key: string;
  readonly source_latest_inbound_message_id: string | null;
  readonly conversation_hash: string;
  readonly reply_text: string;
  readonly reply_content_hash: string;
  readonly prototype_version_id: string | null;
  readonly prototype_content_hash: string | null;
  readonly prototype_deploy_hash: string | null;
  readonly approved_urls: string[];
  readonly policy_version: string;
  readonly prompt_version: string;
  readonly expires_at: Date;
}

export async function createApproval(
  sql: Sql,
  input: {
    conversationId: string;
    actionType: string;
    bindingKey: string;
    sourceLatestInboundMessageId: string | null;
    conversationHash: string;
    replyText: string;
    replyContentHash: string;
    prototypeVersionId?: string | null;
    prototypeContentHash?: string | null;
    prototypeDeployHash?: string | null;
    approvedUrls?: readonly string[];
    policyVersion: string;
    promptVersion: string;
    expiresAt: Date;
    correlationId: string;
  },
): Promise<ApprovalRow> {
  // A new request supersedes any open one for the same action, so there is
  // never more than one thing an operator could be approving.
  await query(
    sql,
    `UPDATE approvals SET status = 'SUPERSEDED'
     WHERE conversation_id = $1 AND action_type = $2 AND status IN ('PENDING','APPROVED')`,
    [input.conversationId, input.actionType],
  );

  const row = await queryOne<ApprovalRow>(
    sql,
    `INSERT INTO approvals
       (conversation_id, action_type, binding_key, source_latest_inbound_message_id, conversation_hash,
        reply_text, reply_content_hash, prototype_version_id, prototype_content_hash, prototype_deploy_hash,
        approved_urls, policy_version, prompt_version, expires_at, correlation_id,
        version)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,
       (SELECT coalesce(max(version), 0) + 1 FROM approvals WHERE conversation_id = $1 AND action_type = $2))
     RETURNING *`,
    [
      input.conversationId,
      input.actionType,
      input.bindingKey,
      input.sourceLatestInboundMessageId,
      input.conversationHash,
      input.replyText,
      input.replyContentHash,
      input.prototypeVersionId ?? null,
      input.prototypeContentHash ?? null,
      input.prototypeDeployHash ?? null,
      input.approvedUrls ?? [],
      input.policyVersion,
      input.promptVersion,
      input.expiresAt,
      input.correlationId,
    ],
  );
  if (!row) throw new Error('Failed to create approval');
  return row;
}

export async function getApproval(sql: Sql, approvalId: string): Promise<ApprovalRow | null> {
  return queryOne<ApprovalRow>(sql, 'SELECT * FROM approvals WHERE id = $1', [approvalId]);
}

/**
 * Idempotent decision recording: approving an already-approved approval is a
 * no-op rather than a second authorization.
 */
export async function decideApproval(
  sql: Sql,
  input: {
    approvalId: string;
    status: Extract<ApprovalStatus, 'APPROVED' | 'REJECTED' | 'REVISION_REQUESTED'>;
    operatorId: string;
    note?: string | null;
  },
): Promise<ApprovalRow | null> {
  return queryOne<ApprovalRow>(
    sql,
    `UPDATE approvals SET status = $2, decided_at = now(), decided_by = $3, decision_note = $4
     WHERE id = $1 AND status = 'PENDING'
     RETURNING *`,
    [input.approvalId, input.status, input.operatorId, input.note ?? null],
  );
}

export async function markApprovalExecuted(sql: Sql, approvalId: string): Promise<void> {
  await query(
    sql,
    `UPDATE approvals SET status = 'EXECUTED', executed_at = now() WHERE id = $1 AND status = 'APPROVED'`,
    [approvalId],
  );
}

export async function staleApprovalsForConversation(
  sql: Sql,
  conversationId: string,
  reason: string,
): Promise<number> {
  const rows = await query<{ id: string }>(
    sql,
    `UPDATE approvals SET status = 'STALE', decision_note = coalesce(decision_note, '') || $2
     WHERE conversation_id = $1 AND status IN ('PENDING','APPROVED')
     RETURNING id`,
    [conversationId, ` [auto-stale: ${reason}]`],
  );
  return rows.length;
}

// --- calendar ----------------------------------------------------------------

export async function recordAvailabilityQuery(
  sql: Sql,
  input: {
    conversationId: string | null;
    provider: string;
    windowStart: Date;
    windowEnd: Date;
    succeeded: boolean;
    resultHash: string | null;
    busyBlocks: unknown;
    errorDetail?: string | null;
  },
): Promise<string> {
  const row = await queryOne<{ id: string }>(
    sql,
    `INSERT INTO calendar_availability_queries
       (conversation_id, provider, window_start, window_end, succeeded, result_hash, busy_blocks, error_detail)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id`,
    [
      input.conversationId,
      input.provider,
      input.windowStart,
      input.windowEnd,
      input.succeeded,
      input.resultHash,
      JSON.stringify(input.busyBlocks),
      input.errorDetail ?? null,
    ],
  );
  if (!row) throw new Error('Failed to record availability query');
  return row.id;
}

/**
 * Hold a slot internally. The exclusion constraint on the table rejects an
 * overlapping live hold, so two prospects cannot be offered the same time even
 * if two workers race.
 */
export async function reserveSlot(
  sql: Sql,
  input: {
    conversationId: string;
    availabilityQueryId: string | null;
    start: Date;
    end: Date;
    expiresAt: Date;
  },
): Promise<{ id: string } | { conflict: true }> {
  try {
    const row = await queryOne<{ id: string }>(
      sql,
      `INSERT INTO slot_reservations (conversation_id, availability_query_id, slot_start, slot_end, expires_at)
       VALUES ($1,$2,$3,$4,$5) RETURNING id`,
      [input.conversationId, input.availabilityQueryId, input.start, input.end, input.expiresAt],
    );
    if (!row) throw new Error('Failed to reserve slot');
    return { id: row.id };
  } catch (error) {
    // 23P01 is exclusion_violation: someone else already holds this window.
    if (isPgError(error) && error.code === '23P01') return { conflict: true };
    throw error;
  }
}

export async function activeReservations(
  sql: Sql,
  now: Date,
  excludeConversationId?: string,
): Promise<Array<{ start: Date; end: Date }>> {
  const rows = await query<{ slot_start: Date; slot_end: Date }>(
    sql,
    `SELECT slot_start, slot_end FROM slot_reservations
     WHERE status = 'HELD' AND expires_at > $1
       AND ($2::uuid IS NULL OR conversation_id <> $2)`,
    [now, excludeConversationId ?? null],
  );
  return rows.map((row) => ({ start: row.slot_start, end: row.slot_end }));
}

export async function releaseReservation(sql: Sql, reservationId: string): Promise<void> {
  await query(
    sql,
    `UPDATE slot_reservations SET status = 'RELEASED', released_at = now() WHERE id = $1 AND status = 'HELD'`,
    [reservationId],
  );
}

export async function expireStaleReservations(sql: Sql, now: Date): Promise<number> {
  const rows = await query<{ id: string }>(
    sql,
    `UPDATE slot_reservations SET status = 'EXPIRED' WHERE status = 'HELD' AND expires_at <= $1 RETURNING id`,
    [now],
  );
  return rows.length;
}

export async function recordCalendarEvent(
  sql: Sql,
  input: {
    conversationId: string;
    slotReservationId: string | null;
    provider: string;
    providerEventId: string;
    eventWebUrl: string | null;
    title: string;
    startsAt: Date;
    endsAt: Date;
    attendeeEmail: string;
  },
): Promise<{ id: string; created: boolean }> {
  const inserted = await queryOne<{ id: string }>(
    sql,
    `INSERT INTO calendar_events
       (conversation_id, slot_reservation_id, provider, provider_event_id, event_web_url, title, starts_at, ends_at, attendee_email)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
     ON CONFLICT (provider, provider_event_id) DO NOTHING
     RETURNING id`,
    [
      input.conversationId,
      input.slotReservationId,
      input.provider,
      input.providerEventId,
      input.eventWebUrl,
      input.title,
      input.startsAt,
      input.endsAt,
      input.attendeeEmail,
    ],
  );
  if (inserted) {
    await query(
      sql,
      'UPDATE conversations SET meeting_scheduled = true, updated_at = now() WHERE id = $1',
      [input.conversationId],
    );
    return { id: inserted.id, created: true };
  }
  const existing = await queryOne<{ id: string }>(
    sql,
    'SELECT id FROM calendar_events WHERE provider = $1 AND provider_event_id = $2',
    [input.provider, input.providerEventId],
  );
  if (!existing) throw new Error('Calendar event conflicted but no existing row was found');
  return { id: existing.id, created: false };
}

// --- notifications, audit, dead letters --------------------------------------

/**
 * Insert a notification unless an identical one was created inside the
 * cooldown window. One failing contact must not be able to send the operator
 * fifty emails.
 */
export async function enqueueNotification(
  sql: Sql,
  input: {
    conversationId: string | null;
    kind: string;
    severity: 'INFO' | 'WARN' | 'CRITICAL';
    recipient: string;
    subject: string;
    body: string;
    dedupeKey: string;
    cooldownMinutes?: number;
  },
): Promise<{ id: string; suppressed: boolean }> {
  const cooldown = input.cooldownMinutes ?? 60;
  const recent = await queryOne<{ id: string }>(
    sql,
    `SELECT id FROM notifications
     WHERE dedupe_key = $1 AND created_at > now() - ($2 || ' minutes')::interval
     ORDER BY created_at DESC LIMIT 1`,
    [input.dedupeKey, cooldown],
  );
  if (recent) return { id: recent.id, suppressed: true };

  const row = await queryOne<{ id: string }>(
    sql,
    `INSERT INTO notifications (conversation_id, kind, severity, recipient, subject, body, dedupe_key)
     VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING id`,
    [
      input.conversationId,
      input.kind,
      input.severity,
      input.recipient,
      input.subject,
      input.body,
      input.dedupeKey,
    ],
  );
  if (!row) throw new Error('Failed to enqueue notification');
  return { id: row.id, suppressed: false };
}

export async function markNotificationSent(
  sql: Sql,
  notificationId: string,
  status: 'SENT' | 'FAILED',
): Promise<void> {
  await query(sql, 'UPDATE notifications SET status = $2, sent_at = now() WHERE id = $1', [
    notificationId,
    status,
  ]);
}

export async function recordAudit(
  sql: Sql,
  input: {
    conversationId?: string | null;
    actor: string;
    action: string;
    reasonCode?: string | null;
    payload?: unknown;
    correlationId?: string | null;
  },
): Promise<void> {
  await query(
    sql,
    `INSERT INTO audit_events (conversation_id, actor, action, reason_code, payload, correlation_id)
     VALUES ($1,$2,$3,$4,$5,$6)`,
    [
      input.conversationId ?? null,
      input.actor,
      input.action,
      input.reasonCode ?? null,
      JSON.stringify(input.payload ?? {}),
      input.correlationId ?? null,
    ],
  );
}

export async function recordDeadLetter(
  sql: Sql,
  input: {
    source: string;
    conversationId?: string | null;
    payload: unknown;
    errorDetail: string;
    attempts: number;
    correlationId?: string | null;
  },
): Promise<void> {
  await query(
    sql,
    `INSERT INTO dead_letters (source, conversation_id, payload, error_detail, attempts, correlation_id)
     VALUES ($1,$2,$3,$4,$5,$6)`,
    [
      input.source,
      input.conversationId ?? null,
      JSON.stringify(input.payload),
      input.errorDetail,
      input.attempts,
      input.correlationId ?? null,
    ],
  );
}

function isPgError(error: unknown): error is { code: string } {
  return typeof error === 'object' && error !== null && 'code' in error;
}
