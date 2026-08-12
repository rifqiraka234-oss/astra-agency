import { getPool } from '@astra/db';

/**
 * Read models for the dashboard.
 *
 * Every query here is scoped to what the operator needs to make one decision.
 * Raw webhook payloads and full research dumps are deliberately not selected:
 * they exist in the database for audit, not for casual browsing.
 */

export interface QueueItem {
  readonly conversationId: string;
  readonly contactName: string;
  readonly companyName: string | null;
  readonly channel: string;
  readonly state: string;
  readonly owner: string;
  readonly campaignId: string | null;
  readonly lastActivityAt: string;
  readonly latestReason: string | null;
  readonly approvalId: string | null;
  readonly approvalAction: string | null;
}

const QUEUE_BUCKETS = {
  NEEDS_APPROVAL: ['AWAITING_MESSAGE_APPROVAL', 'AWAITING_PROTOTYPE_APPROVAL'],
  HUMAN_HANDOFF: ['HUMAN_REVIEW_REQUIRED', 'HUMAN_OWNED'],
  PROTOTYPE: ['PROTOTYPE_QUEUED', 'PROTOTYPE_BUILDING', 'PROTOTYPE_QA_FAILED'],
  MEETING: ['CALENDAR_OPTIONS_PROPOSED', 'MEETING_BOOKING_PENDING', 'MEETING_SCHEDULED'],
  ERROR: ['RETRYABLE_ERROR', 'DEAD_LETTER'],
  RECENTLY_AUTOMATED: ['LOW_RISK_ELIGIBLE', 'COMPLETED_NO_ACTION', 'SEQUENCE_OWNED'],
} as const;

export type QueueBucket = keyof typeof QUEUE_BUCKETS;

export const QUEUE_BUCKET_LABELS: Record<QueueBucket, string> = {
  NEEDS_APPROVAL: 'Needs approval',
  HUMAN_HANDOFF: 'Human handoff',
  PROTOTYPE: 'Prototype building',
  MEETING: 'Meeting',
  ERROR: 'Error',
  RECENTLY_AUTOMATED: 'Recently automated',
};

export async function loadQueue(): Promise<Record<QueueBucket, QueueItem[]>> {
  const rows = await getPool().query<{
    conversation_id: string;
    first_name: string | null;
    last_name: string | null;
    company_name: string | null;
    channel: string;
    state: string;
    owner: string;
    lemlist_campaign_id: string | null;
    updated_at: Date;
    latest_reason: string | null;
    approval_id: string | null;
    approval_action: string | null;
  }>(
    `SELECT
       c.id AS conversation_id,
       ct.first_name, ct.last_name, ct.company_name,
       c.channel, c.state, c.owner, c.lemlist_campaign_id, c.updated_at,
       (SELECT d.detail FROM decisions d WHERE d.conversation_id = c.id ORDER BY d.created_at DESC LIMIT 1) AS latest_reason,
       a.id AS approval_id,
       a.action_type AS approval_action
     FROM conversations c
     JOIN contacts ct ON ct.id = c.contact_id
     LEFT JOIN approvals a
       ON a.conversation_id = c.id AND a.status IN ('PENDING','APPROVED')
     ORDER BY c.updated_at DESC
     LIMIT 500`,
  );

  const buckets = Object.fromEntries(
    Object.keys(QUEUE_BUCKETS).map((key) => [key, [] as QueueItem[]]),
  ) as Record<QueueBucket, QueueItem[]>;

  for (const row of rows.rows) {
    const item: QueueItem = {
      conversationId: row.conversation_id,
      contactName: [row.first_name, row.last_name].filter(Boolean).join(' ') || 'Unknown contact',
      companyName: row.company_name,
      channel: row.channel,
      state: row.state,
      owner: row.owner,
      campaignId: row.lemlist_campaign_id,
      lastActivityAt: row.updated_at.toISOString(),
      latestReason: row.latest_reason,
      approvalId: row.approval_id,
      approvalAction: row.approval_action,
    };

    const bucket = (Object.keys(QUEUE_BUCKETS) as QueueBucket[]).find((key) =>
      (QUEUE_BUCKETS[key] as readonly string[]).includes(row.state),
    );
    if (bucket) buckets[bucket].push(item);
  }

  return buckets;
}

export interface ConversationDetail {
  readonly id: string;
  readonly contactName: string;
  readonly companyName: string | null;
  readonly companyDomain: string | null;
  readonly email: string | null;
  readonly channel: string;
  readonly state: string;
  readonly owner: string;
  readonly campaignId: string | null;
  readonly meetingScheduled: boolean;
  readonly automatedOutboundCount: number;
  readonly meaningfulTurnCount: number;
  readonly isSuppressed: boolean;
  readonly postMeetingDecision: string | null;
}

export async function loadConversation(id: string): Promise<ConversationDetail | null> {
  const result = await getPool().query<{
    id: string;
    first_name: string | null;
    last_name: string | null;
    company_name: string | null;
    company_domain: string | null;
    email: string | null;
    channel: string;
    state: string;
    owner: string;
    lemlist_campaign_id: string | null;
    meeting_scheduled: boolean;
    automated_outbound_count: number;
    meaningful_turn_count: number;
    is_suppressed: boolean;
    post_meeting_decision: string | null;
  }>(
    `SELECT c.id, ct.first_name, ct.last_name, ct.company_name, ct.company_domain, ct.email,
            c.channel, c.state, c.owner, c.lemlist_campaign_id, c.meeting_scheduled,
            c.automated_outbound_count, c.meaningful_turn_count, ct.is_suppressed,
            c.post_meeting_decision
     FROM conversations c JOIN contacts ct ON ct.id = c.contact_id
     WHERE c.id = $1`,
    [id],
  );

  const row = result.rows[0];
  if (!row) return null;

  return {
    id: row.id,
    contactName: [row.first_name, row.last_name].filter(Boolean).join(' ') || 'Unknown contact',
    companyName: row.company_name,
    companyDomain: row.company_domain,
    email: row.email,
    channel: row.channel,
    state: row.state,
    owner: row.owner,
    campaignId: row.lemlist_campaign_id,
    meetingScheduled: row.meeting_scheduled,
    automatedOutboundCount: row.automated_outbound_count,
    meaningfulTurnCount: row.meaningful_turn_count,
    isSuppressed: row.is_suppressed,
    postMeetingDecision: row.post_meeting_decision,
  };
}

export interface MessageRow {
  readonly id: string;
  readonly occurredAt: string;
  readonly direction: string;
  readonly kind: string;
  readonly channel: string;
  readonly subject: string | null;
  readonly sender: string | null;
  readonly bodyText: string;
  readonly bodyHtmlSanitized: string | null;
  readonly attachments: ReadonlyArray<{ name: string }>;
}

export async function loadMessages(conversationId: string): Promise<MessageRow[]> {
  const rows = await getPool().query<{
    id: string;
    occurred_at: Date;
    direction: string;
    kind: string;
    channel: string;
    subject: string | null;
    sender: string | null;
    body_text: string;
    body_html_sanitized: string | null;
    attachments: Array<{ name: string }>;
  }>(
    `SELECT id, occurred_at, direction, kind, channel, subject, sender, body_text,
            body_html_sanitized, attachments
     FROM messages WHERE conversation_id = $1
     ORDER BY occurred_at, external_activity_id`,
    [conversationId],
  );

  return rows.rows.map((row) => ({
    id: row.id,
    occurredAt: row.occurred_at.toISOString(),
    direction: row.direction,
    kind: row.kind,
    channel: row.channel,
    subject: row.subject,
    sender: row.sender,
    bodyText: row.body_text,
    bodyHtmlSanitized: row.body_html_sanitized,
    attachments: row.attachments ?? [],
  }));
}

export interface DecisionRow {
  readonly id: string;
  readonly createdAt: string;
  readonly controllerAction: string;
  readonly modelRecommendation: string | null;
  readonly intent: string | null;
  readonly confidence: number | null;
  readonly risk: string | null;
  readonly reasonCodes: string[];
  readonly detail: string | null;
  readonly predicates: Array<{ id: string; passed: boolean; reasonCode: string | null; detail: string }>;
  readonly evidence: Array<{ claim: string; source_url: string | null; support: string }>;
  readonly policyVersion: string;
}

export async function loadDecisions(conversationId: string, limit = 10): Promise<DecisionRow[]> {
  const rows = await getPool().query<{
    id: string;
    created_at: Date;
    controller_action: string;
    model_recommendation: string | null;
    intent: string | null;
    confidence: string | null;
    risk: string | null;
    reason_codes: string[];
    detail: string | null;
    predicates: DecisionRow['predicates'];
    evidence: DecisionRow['evidence'];
    policy_version: string;
  }>(
    `SELECT id, created_at, controller_action, model_recommendation, intent, confidence, risk,
            reason_codes, detail, predicates, evidence, policy_version
     FROM decisions WHERE conversation_id = $1 ORDER BY created_at DESC LIMIT $2`,
    [conversationId, limit],
  );

  return rows.rows.map((row) => ({
    id: row.id,
    createdAt: row.created_at.toISOString(),
    controllerAction: row.controller_action,
    modelRecommendation: row.model_recommendation,
    intent: row.intent,
    confidence: row.confidence === null ? null : Number(row.confidence),
    risk: row.risk,
    reasonCodes: row.reason_codes ?? [],
    detail: row.detail,
    predicates: row.predicates ?? [],
    evidence: row.evidence ?? [],
    policyVersion: row.policy_version,
  }));
}

export interface ApprovalDetail {
  readonly id: string;
  readonly actionType: string;
  readonly status: string;
  readonly version: number;
  readonly replyText: string;
  readonly replyContentHash: string;
  readonly conversationHash: string;
  readonly sourceLatestInboundMessageId: string | null;
  readonly approvedUrls: string[];
  readonly expiresAt: string;
  readonly policyVersion: string;
  readonly promptVersion: string;
  readonly prototypeVersionId: string | null;
  readonly prototypeUrl: string | null;
  readonly desktopScreenshot: string | null;
  readonly mobileScreenshot: string | null;
  readonly qaReport: unknown;
  readonly hypothesis: string | null;
  readonly businessReasoning: string | null;
}

export async function loadOpenApproval(conversationId: string): Promise<ApprovalDetail | null> {
  const result = await getPool().query<{
    id: string;
    action_type: string;
    status: string;
    version: number;
    reply_text: string;
    reply_content_hash: string;
    conversation_hash: string;
    source_latest_inbound_message_id: string | null;
    approved_urls: string[];
    expires_at: Date;
    policy_version: string;
    prompt_version: string;
    prototype_version_id: string | null;
    immutable_url: string | null;
    desktop_screenshot_path: string | null;
    mobile_screenshot_path: string | null;
    qa_report: unknown;
    hypothesis: string | null;
    business_reasoning: string | null;
  }>(
    `SELECT a.*, d.immutable_url, v.desktop_screenshot_path, v.mobile_screenshot_path,
            v.qa_report, v.hypothesis, v.business_reasoning
     FROM approvals a
     LEFT JOIN prototype_versions v ON v.id = a.prototype_version_id
     LEFT JOIN prototype_deployments d ON d.prototype_version_id = v.id
     WHERE a.conversation_id = $1 AND a.status IN ('PENDING','APPROVED','STALE')
     ORDER BY a.requested_at DESC LIMIT 1`,
    [conversationId],
  );

  const row = result.rows[0];
  if (!row) return null;

  return {
    id: row.id,
    actionType: row.action_type,
    status: row.status,
    version: row.version,
    replyText: row.reply_text,
    replyContentHash: row.reply_content_hash,
    conversationHash: row.conversation_hash,
    sourceLatestInboundMessageId: row.source_latest_inbound_message_id,
    approvedUrls: row.approved_urls ?? [],
    expiresAt: row.expires_at.toISOString(),
    policyVersion: row.policy_version,
    promptVersion: row.prompt_version,
    prototypeVersionId: row.prototype_version_id,
    prototypeUrl: row.immutable_url,
    desktopScreenshot: row.desktop_screenshot_path,
    mobileScreenshot: row.mobile_screenshot_path,
    qaReport: row.qa_report,
    hypothesis: row.hypothesis,
    businessReasoning: row.business_reasoning,
  };
}

export interface AuditRow {
  readonly occurredAt: string;
  readonly actor: string;
  readonly action: string;
  readonly reasonCode: string | null;
  readonly detail: string | null;
}

export async function loadAuditTimeline(conversationId: string, limit = 100): Promise<AuditRow[]> {
  const rows = await getPool().query<{
    occurred_at: Date;
    actor: string;
    action: string;
    reason_code: string | null;
    detail: string | null;
  }>(
    `SELECT occurred_at, actor, action, reason_code, NULL::text AS detail
       FROM audit_events WHERE conversation_id = $1
     UNION ALL
     SELECT occurred_at, actor, 'STATE ' || previous_state || ' -> ' || next_state, reason_code, detail
       FROM conversation_states WHERE conversation_id = $1
     UNION ALL
     SELECT occurred_at, actor, 'OWNER ' || coalesce(previous_owner,'none') || ' -> ' || next_owner, reason_code, detail
       FROM ownership_history WHERE conversation_id = $1
     ORDER BY occurred_at DESC
     LIMIT $2`,
    [conversationId, limit],
  );

  return rows.rows.map((row) => ({
    occurredAt: row.occurred_at.toISOString(),
    actor: row.actor,
    action: row.action,
    reasonCode: row.reason_code,
    detail: row.detail,
  }));
}

export async function loadDeadLetters(): Promise<
  Array<{ id: string; source: string; errorDetail: string; attempts: number; createdAt: string }>
> {
  const rows = await getPool().query<{
    id: string;
    source: string;
    error_detail: string;
    attempts: number;
    created_at: Date;
  }>(
    `SELECT id, source, error_detail, attempts, created_at FROM dead_letters
     WHERE status = 'OPEN' ORDER BY created_at DESC LIMIT 100`,
  );
  return rows.rows.map((row) => ({
    id: row.id,
    source: row.source,
    errorDetail: row.error_detail,
    attempts: row.attempts,
    createdAt: row.created_at.toISOString(),
  }));
}

export async function loadRolloutState(): Promise<{
  currentMode: string;
  changedAt: string;
  shadowDecisionsReviewed: number;
  note: string | null;
}> {
  const result = await getPool().query<{
    current_mode: string;
    changed_at: Date;
    shadow_decisions_reviewed: number;
    note: string | null;
  }>('SELECT current_mode, changed_at, shadow_decisions_reviewed, note FROM rollout_state WHERE id = 1');
  const row = result.rows[0];
  return {
    currentMode: row?.current_mode ?? 'TEST',
    changedAt: (row?.changed_at ?? new Date()).toISOString(),
    shadowDecisionsReviewed: row?.shadow_decisions_reviewed ?? 0,
    note: row?.note ?? null,
  };
}

export async function countShadowDecisions(): Promise<number> {
  const result = await getPool().query<{ n: number }>(
    `SELECT count(*)::int AS n FROM decisions`,
  );
  return result.rows[0]?.n ?? 0;
}

export async function loadExclusions(): Promise<
  Array<{ id: string; scope: string; targetId: string | null; reason: string; createdAt: string }>
> {
  const rows = await getPool().query<{
    id: string;
    scope: string;
    target_id: string | null;
    reason: string;
    created_at: Date;
  }>('SELECT id, scope, target_id, reason, created_at FROM exclusions WHERE active ORDER BY created_at DESC');
  return rows.rows.map((row) => ({
    id: row.id,
    scope: row.scope,
    targetId: row.target_id,
    reason: row.reason,
    createdAt: row.created_at.toISOString(),
  }));
}
