import type { ControllerAction, LowRiskCase } from '../domain/enums.js';
import { REASON_CODES, type ReasonCode } from '../domain/reason-codes.js';
import { anySafetyFlagSet, setSafetyFlags } from '../schemas/decision.js';
import { checkOutboundContent } from '../text/content-checks.js';
import { detectExternalContext, detectMeetingReference } from '../conversation/context.js';
import { taskBlocksAutomation } from '../ownership/sequence.js';
import { isAvailabilityFresh } from '../calendar/slots.js';
import {
  POLICY_VERSION,
  type PolicyDecision,
  type PolicyInput,
  type PredicateResult,
} from './types.js';

/**
 * The policy engine.
 *
 * Automatic sending is deny-by-default. Claude's `AUTO_SEND_CANDIDATE` is
 * treated as a request, never as permission: every predicate below is
 * recomputed from stored facts, and the message text is re-validated even
 * when a human already approved it. If a predicate cannot be evaluated, it
 * fails. There is deliberately no configuration flag anywhere in this file
 * that permits automatic delivery of a prototype link.
 */

interface LowRiskCaseSpec {
  readonly case: LowRiskCase;
  readonly maxWords: number;
  readonly allowUrls: boolean;
  readonly minConfidence: (input: PolicyInput) => number;
}

const LOW_RISK_CASE_SPECS: Readonly<Record<LowRiskCase, LowRiskCaseSpec>> = {
  POST_ACCEPTANCE_INITIAL_MESSAGE: {
    case: 'POST_ACCEPTANCE_INITIAL_MESSAGE',
    maxWords: 65,
    allowUrls: false,
    minConfidence: (input) => input.config.ACCEPTANCE_SEND_MIN_CONFIDENCE,
  },
  SIMPLE_ACKNOWLEDGEMENT: {
    case: 'SIMPLE_ACKNOWLEDGEMENT',
    maxWords: 35,
    allowUrls: false,
    minConfidence: (input) => input.config.AUTO_SEND_MIN_CONFIDENCE,
  },
  LOW_RISK_CLARIFYING_QUESTION: {
    case: 'LOW_RISK_CLARIFYING_QUESTION',
    maxWords: 35,
    allowUrls: false,
    minConfidence: (input) => input.config.AUTO_SEND_MIN_CONFIDENCE,
  },
  BASIC_CAPABILITY_ANSWER: {
    case: 'BASIC_CAPABILITY_ANSWER',
    maxWords: 80,
    allowUrls: false,
    minConfidence: (input) => input.config.AUTO_SEND_MIN_CONFIDENCE,
  },
  CALENDAR_SLOT_PROPOSAL: {
    case: 'CALENDAR_SLOT_PROPOSAL',
    maxWords: 120,
    allowUrls: false,
    minConfidence: (input) => input.config.AUTO_SEND_MIN_CONFIDENCE,
  },
  BOOK_SELECTED_SLOT: {
    case: 'BOOK_SELECTED_SLOT',
    maxWords: 80,
    allowUrls: false,
    minConfidence: (input) => input.config.AUTO_SEND_MIN_CONFIDENCE,
  },
  POLITE_CLOSE: {
    case: 'POLITE_CLOSE',
    maxWords: 30,
    allowUrls: false,
    minConfidence: (input) => input.config.AUTO_SEND_MIN_CONFIDENCE,
  },
};

/** Which model intents may map to which allowlisted case. Nothing else maps. */
const INTENT_TO_CASE: Partial<Record<string, LowRiskCase>> = {
  CONNECTION_ACCEPTED: 'POST_ACCEPTANCE_INITIAL_MESSAGE',
  SIMPLE_ACKNOWLEDGEMENT: 'SIMPLE_ACKNOWLEDGEMENT',
  CLARIFICATION_NEEDED: 'LOW_RISK_CLARIFYING_QUESTION',
  GENERAL_QUESTION: 'BASIC_CAPABILITY_ANSWER',
  MEETING_INTEREST: 'CALENDAR_SLOT_PROPOSAL',
  SLOT_SELECTED: 'BOOK_SELECTED_SLOT',
  NOT_NOW: 'POLITE_CLOSE',
  NOT_INTERESTED: 'POLITE_CLOSE',
};

class PredicateLog {
  private readonly results: PredicateResult[] = [];

  check(id: string, passed: boolean, reasonCode: ReasonCode, detail: string): boolean {
    this.results.push({ id, passed, reasonCode: passed ? null : reasonCode, detail });
    return passed;
  }

  note(id: string, detail: string): void {
    this.results.push({ id, passed: true, reasonCode: null, detail });
  }

  get all(): readonly PredicateResult[] {
    return this.results;
  }

  get failures(): readonly PredicateResult[] {
    return this.results.filter((result) => !result.passed);
  }

  get failureCodes(): readonly ReasonCode[] {
    return [
      ...new Set(
        this.results
          .filter((result) => !result.passed && result.reasonCode !== null)
          .map((result) => result.reasonCode as ReasonCode),
      ),
    ];
  }
}

/**
 * The single entry point. Returns the controller's action, the full predicate
 * log, and the owner the conversation should end up with.
 */
export function decideControllerAction(input: PolicyInput): PolicyDecision {
  const log = new PredicateLog();

  // --- unconditional short circuits ----------------------------------------
  if (input.decision.classification.intent === 'UNSUBSCRIBE') {
    return finish(log, 'SUPPRESS', null, null, 'SUPPRESSED', [], 'Explicit unsubscribe: suppress immediately and send nothing.');
  }

  if (input.decision.classification.intent === 'THIRD_PARTY_REPLY' || input.isThirdPartyReply) {
    log.check(
      'third_party_reply',
      false,
      REASON_CODES.THIRD_PARTY_PARTICIPANT,
      'Reply came from a third party; lead and campaign identifiers may be absent.',
    );
    return finish(
      log,
      'HANDOFF',
      null,
      null,
      'HUMAN',
      log.failureCodes,
      'A third party replied. Routed to human review with the visible sender, recipients and subject.',
    );
  }

  if (input.decision.classification.intent === 'AUTOMATED_REPLY') {
    return finish(
      log,
      'NO_ACTION',
      null,
      null,
      null,
      [],
      'Automated reply (out of office or similar). No response is sent.',
    );
  }

  // Anything that must stop automation outright, regardless of the model's
  // recommendation.
  const handoffReasons = collectHandoffReasons(input, log);
  if (handoffReasons.length > 0) {
    return finish(
      log,
      'HANDOFF',
      null,
      null,
      'HUMAN',
      handoffReasons,
      `Automation paused: ${log.failures.map((failure) => failure.detail).join(' ')}`,
    );
  }

  // --- decide the shape of the response ------------------------------------
  const modelAction = input.decision.recommendation.action;

  if (modelAction === 'SUPPRESS') {
    return finish(log, 'SUPPRESS', null, null, 'SUPPRESSED', [], 'Model recommended suppression and no conflicting signal was found.');
  }
  if (modelAction === 'NO_ACTION') {
    return finish(log, 'NO_ACTION', null, null, null, [], 'No response is warranted.');
  }
  if (modelAction === 'HANDOFF') {
    return finish(
      log,
      'HANDOFF',
      null,
      null,
      'HUMAN',
      [],
      input.decision.recommendation.human_handoff_reason ?? 'Model requested human handoff.',
    );
  }

  if (modelAction === 'BUILD_PROTOTYPE') {
    // A prototype is built automatically; its *link* is never sent
    // automatically. That split is the whole point of the workflow.
    return finish(
      log,
      'BUILD_PROTOTYPE',
      null,
      null,
      'ASTRA_AGENT',
      [REASON_CODES.PROTOTYPE_URL_REQUIRES_APPROVAL],
      'Building the prototype. The delivery message and URL require operator approval before anything is sent.',
    );
  }

  // --- automatic send evaluation -------------------------------------------
  const replyText = input.decision.recommendation.reply_text ?? '';
  const spec = matchLowRiskCase(input);

  if (modelAction === 'AUTO_SEND_CANDIDATE' && spec !== null) {
    const eligible = evaluateAutoSendPredicates(input, spec, replyText, log);
    if (eligible) {
      return finish(
        log,
        'AUTO_SEND',
        spec.case,
        spec.maxWords,
        'ASTRA_AGENT',
        [REASON_CODES.ALLOWED_LOW_RISK_CASE],
        `Allowlisted low-risk case ${spec.case} passed every predicate.`,
      );
    }
  } else if (modelAction === 'AUTO_SEND_CANDIDATE' && spec === null) {
    log.check(
      'low_risk_case_match',
      false,
      REASON_CODES.NO_MATCHING_LOW_RISK_CASE,
      `Intent ${input.decision.classification.intent} is not on the first-rollout allowlist.`,
    );
  }

  if (modelAction === 'PROPOSE_CALENDAR_SLOTS' || modelAction === 'BOOK_SELECTED_SLOT') {
    const calendarSpec =
      modelAction === 'BOOK_SELECTED_SLOT'
        ? LOW_RISK_CASE_SPECS.BOOK_SELECTED_SLOT
        : LOW_RISK_CASE_SPECS.CALENDAR_SLOT_PROPOSAL;
    const eligible = evaluateAutoSendPredicates(input, calendarSpec, replyText, log);
    const action: ControllerAction =
      modelAction === 'BOOK_SELECTED_SLOT' ? 'BOOK_SELECTED_SLOT' : 'PROPOSE_CALENDAR_SLOTS';
    if (eligible) {
      return finish(
        log,
        action,
        calendarSpec.case,
        calendarSpec.maxWords,
        'ASTRA_AGENT',
        [REASON_CODES.ALLOWED_LOW_RISK_CASE],
        `Calendar case ${calendarSpec.case} passed every predicate.`,
      );
    }
  }

  // --- fall through: draft or approval -------------------------------------
  const canDraft = input.config.canCreateDrafts;
  const action: ControllerAction = canDraft ? 'REQUEST_MESSAGE_APPROVAL' : 'NO_ACTION';
  return finish(
    log,
    action,
    null,
    null,
    null,
    log.failureCodes,
    canDraft
      ? `Not eligible for automatic sending, so a draft was staged for approval. Blocking predicates: ${
          log.failures.map((failure) => failure.id).join(', ') || 'none (mode does not permit auto-send)'
        }`
      : `Runtime mode ${input.config.RUNTIME_MODE} records the decision without producing any external artifact.`,
  );
}

/**
 * Conditions that stop automation entirely and alert the operator. These are
 * checked before any drafting path, because a handoff must not also produce a
 * half-written reply that someone might send by reflex.
 */
function collectHandoffReasons(input: PolicyInput, log: PredicateLog): ReasonCode[] {
  const reasons: ReasonCode[] = [];
  const push = (code: ReasonCode): void => {
    if (!reasons.includes(code)) reasons.push(code);
  };

  const conversationText = input.conversation.turns
    .filter((turn) => turn.direction === 'INBOUND')
    .map((turn) => turn.text)
    .join('\n');

  if (input.meetingScheduled || input.decision.conversation.meeting_state === 'SCHEDULED') {
    log.check('no_meeting_scheduled', false, REASON_CODES.MEETING_ALREADY_REFERENCED, 'A meeting already exists for this conversation.');
    push(REASON_CODES.MEETING_ALREADY_REFERENCED);
  }

  const meetingHits = detectMeetingReference(conversationText);
  if (meetingHits.length > 0) {
    log.check(
      'no_meeting_reference',
      false,
      REASON_CODES.MEETING_ALREADY_REFERENCED,
      `The prospect refers to an existing meeting: ${meetingHits.join(', ')}`,
    );
    push(REASON_CODES.MEETING_ALREADY_REFERENCED);
  }

  const externalHits = detectExternalContext(conversationText);
  if (externalHits.length > 0 || input.decision.conversation.external_context_suspected) {
    log.check(
      'no_external_context',
      false,
      REASON_CODES.EXTERNAL_CONTEXT_SUSPECTED,
      externalHits.length > 0
        ? `The prospect references context we cannot see: ${externalHits.join(', ')}`
        : 'The model flagged missing outside context.',
    );
    push(REASON_CODES.EXTERNAL_CONTEXT_SUSPECTED);
  }

  const escalatingIntents = new Set([
    'PRICING_OR_COMMERCIAL',
    'LEGAL_OR_CONTRACTUAL',
    'COMPLAINT_OR_ANGER',
    'HIGH_RAPPORT_HUMAN_HANDOFF',
    'EXTERNAL_CONTEXT_SUSPECTED',
    'MEETING_SCHEDULED_OR_REFERENCED',
    'REFERRAL',
    'WRONG_PERSON',
  ]);
  if (escalatingIntents.has(input.decision.classification.intent)) {
    log.check(
      'intent_not_escalating',
      false,
      REASON_CODES.INTENT_NOT_ALLOWLISTED,
      `Intent ${input.decision.classification.intent} always goes to a human in the first rollout.`,
    );
    push(REASON_CODES.INTENT_NOT_ALLOWLISTED);
  }

  if (input.decision.classification.sentiment === 'ANGRY') {
    log.check('sentiment_not_angry', false, REASON_CODES.INTENT_NOT_ALLOWLISTED, 'The prospect is angry or distressed.');
    push(REASON_CODES.INTENT_NOT_ALLOWLISTED);
  }

  if (input.decision.conversation.rapport_level === 'HIGH') {
    log.check('rapport_not_high', false, REASON_CODES.HIGH_RAPPORT, 'Rapport is substantial; a human should take this over.');
    push(REASON_CODES.HIGH_RAPPORT);
  }

  if (input.conversation.meaningfulTurnCount >= input.config.MAX_MEANINGFUL_TURNS_BEFORE_HANDOFF) {
    log.check(
      'turn_cap',
      false,
      REASON_CODES.TURN_LIMIT_REACHED,
      `Conversation has ${input.conversation.meaningfulTurnCount} meaningful turns (cap ${input.config.MAX_MEANINGFUL_TURNS_BEFORE_HANDOFF}).`,
    );
    push(REASON_CODES.TURN_LIMIT_REACHED);
  }

  if (input.automatedOutboundCount >= input.config.MAX_AUTOMATED_OUTBOUND_PER_CONVERSATION) {
    log.check(
      'automated_outbound_cap',
      false,
      REASON_CODES.AUTOMATED_OUTBOUND_CAP_REACHED,
      `Already sent ${input.automatedOutboundCount} automatic messages (cap ${input.config.MAX_AUTOMATED_OUTBOUND_PER_CONVERSATION}).`,
    );
    push(REASON_CODES.AUTOMATED_OUTBOUND_CAP_REACHED);
  }

  if (input.conversation.attachmentsPresent) {
    log.check('no_attachment', false, REASON_CODES.ATTACHMENT_PRESENT, 'An attachment is present and attachment handling is not implemented.');
    push(REASON_CODES.ATTACHMENT_PRESENT);
  }

  if (input.conversation.hasUncertainDirection) {
    log.check('direction_certain', false, REASON_CODES.UNCERTAIN_DIRECTION, 'At least one message has an undetermined direction.');
    push(REASON_CODES.UNCERTAIN_DIRECTION);
  }

  if (input.decision.safety.website_prompt_injection_detected) {
    log.check(
      'no_prompt_injection',
      false,
      REASON_CODES.PROMPT_INJECTION_DETECTED,
      'Prompt-injection-like content was found in external material.',
    );
    push(REASON_CODES.PROMPT_INJECTION_DETECTED);
  }

  const blockingTasks = input.pendingTasks.filter(taskBlocksAutomation);
  if (blockingTasks.length > 0) {
    log.check(
      'no_blocking_manual_task',
      false,
      REASON_CODES.PENDING_MANUAL_TASK,
      `Pending manual task(s) imply human involvement: ${blockingTasks.map((task) => task.type).join(', ')}`,
    );
    push(REASON_CODES.PENDING_MANUAL_TASK);
  }

  return reasons;
}

function matchLowRiskCase(input: PolicyInput): LowRiskCaseSpec | null {
  const mapped = INTENT_TO_CASE[input.decision.classification.intent];
  if (mapped === undefined) return null;
  return LOW_RISK_CASE_SPECS[mapped];
}

/**
 * The global conditions plus the case-specific conditions. Every predicate is
 * recorded whether it passes or fails, so the dashboard can show exactly why
 * a message was or was not sent.
 */
function evaluateAutoSendPredicates(
  input: PolicyInput,
  spec: LowRiskCaseSpec,
  replyText: string,
  log: PredicateLog,
): boolean {
  let ok = true;
  const require = (id: string, passed: boolean, code: ReasonCode, detail: string): void => {
    if (!log.check(id, passed, code, detail)) ok = false;
  };

  // --- hard boundaries ------------------------------------------------------
  require('kill_switch_off', !input.config.isKillSwitchOn, REASON_CODES.KILL_SWITCH_ON, 'Global kill switch blocks every external write.');
  require(
    'mode_low_risk_auto',
    input.config.RUNTIME_MODE === 'LOW_RISK_AUTO',
    REASON_CODES.MODE_DISALLOWS_SEND,
    `Runtime mode is ${input.config.RUNTIME_MODE}; automatic sending requires LOW_RISK_AUTO.`,
  );
  require(
    'live_send_enabled',
    input.config.ALLOW_LIVE_LEMLIST_SEND,
    REASON_CODES.LIVE_SEND_FLAG_OFF,
    'ALLOW_LIVE_LEMLIST_SEND is false.',
  );
  require('can_auto_send', input.config.canAutoSend, REASON_CODES.MODE_DISALLOWS_SEND, 'Composite auto-send permission is false.');

  // --- scope ---------------------------------------------------------------
  require(
    'campaign_enabled',
    input.campaignId !== null && input.config.enabledCampaignIds.has(input.campaignId),
    REASON_CODES.CAMPAIGN_NOT_ENABLED,
    input.campaignId === null
      ? 'No campaign id is associated with this conversation.'
      : `Campaign ${input.campaignId} is not on ENABLED_CAMPAIGN_IDS.`,
  );

  const activeExclusion = input.exclusions.find(
    (exclusion) =>
      exclusion.active &&
      (exclusion.scope === 'GLOBAL' ||
        (exclusion.scope === 'CAMPAIGN' && exclusion.targetId === input.campaignId) ||
        (exclusion.scope === 'CONTACT' && exclusion.targetId === input.contactId) ||
        (exclusion.scope === 'LEAD' && exclusion.targetId === input.leadId)),
  );
  require(
    'no_active_exclusion',
    activeExclusion === undefined,
    REASON_CODES.EXCLUSION_ACTIVE,
    activeExclusion ? `${activeExclusion.scope} exclusion active: ${activeExclusion.reason}` : 'No exclusion applies.',
  );

  // --- ownership -----------------------------------------------------------
  require(
    'owner_is_astra',
    input.owner === 'ASTRA_AGENT',
    input.owner === 'UNKNOWN' ? REASON_CODES.OWNER_UNKNOWN : REASON_CODES.OWNER_NOT_ASTRA,
    `Conversation owner is ${input.owner}; only ASTRA_AGENT may send.`,
  );

  // --- certainty and freshness ---------------------------------------------
  require(
    'channel_certain',
    input.conversation.channel !== 'unknown',
    REASON_CODES.UNCERTAIN_CHANNEL,
    'The conversation channel could not be determined.',
  );
  require(
    'direction_certain',
    !input.conversation.hasUncertainDirection,
    REASON_CODES.UNCERTAIN_DIRECTION,
    'A message direction is uncertain.',
  );
  require(
    'conversation_hash_fresh',
    input.freshness.expectedConversationHash === input.freshness.actualConversationHash,
    REASON_CODES.STALE_CONVERSATION_HASH,
    'The conversation changed since analysis.',
  );
  require(
    'latest_inbound_fresh',
    input.freshness.expectedLatestInboundMessageId === input.freshness.actualLatestInboundMessageId,
    REASON_CODES.STALE_INBOUND_MESSAGE_ID,
    'A newer inbound message arrived since analysis.',
  );
  require(
    'no_lossy_truncation',
    !input.contextTruncated,
    REASON_CODES.LOSSY_TRUNCATION,
    'The model context was truncated, so consistency with the full history cannot be proven.',
  );

  // --- model output --------------------------------------------------------
  const minConfidence = spec.minConfidence(input);
  require(
    'confidence_threshold',
    input.decision.classification.confidence >= minConfidence,
    REASON_CODES.CONFIDENCE_BELOW_THRESHOLD,
    `Confidence ${input.decision.classification.confidence} is below the ${minConfidence} threshold for ${spec.case}.`,
  );
  require(
    'risk_low',
    input.decision.classification.risk === 'LOW',
    REASON_CODES.RISK_NOT_LOW,
    `Risk is ${input.decision.classification.risk}.`,
  );
  require(
    'no_safety_flag',
    !anySafetyFlagSet(input.decision.safety),
    REASON_CODES.SAFETY_FLAG_SET,
    `Safety flags set: ${setSafetyFlags(input.decision.safety).join(', ') || 'none'}`,
  );

  // --- participants --------------------------------------------------------
  const unknownCc = input.conversation.messages.some((message) => message.cc.length > 0);
  require(
    'no_unknown_cc',
    !unknownCc,
    REASON_CODES.UNKNOWN_CC,
    'A message carries CC recipients we cannot attribute.',
  );

  // --- case specific -------------------------------------------------------
  if (spec.case === 'POST_ACCEPTANCE_INITIAL_MESSAGE') {
    require(
      'company_identity_verified',
      input.companyIdentityVerified,
      REASON_CODES.COMPANY_IDENTITY_AMBIGUOUS,
      'The official website and company identity are not unambiguously verified.',
    );
    const hasWebsiteEvidence = input.decision.evidence.some(
      (item) => item.source_type === 'WEBSITE' && item.source_url !== null,
    );
    require(
      'has_website_evidence',
      hasWebsiteEvidence,
      REASON_CODES.UNSUPPORTED_CLAIM,
      'No directly evidenced website observation is present.',
    );
    // "We sketched something" may only be said when a concept brief exists.
    const claimsCompletedWork = /\b(sketched|mocked up|put together|built|made)\b/i.test(replyText);
    require(
      'concept_brief_backs_claim',
      !claimsCompletedWork || input.hasStoredConceptBrief,
      REASON_CODES.CONCEPT_BRIEF_MISSING,
      'The message implies completed work but no stored concept brief exists.',
    );
  }

  if (spec.case === 'CALENDAR_SLOT_PROPOSAL') {
    const availability = input.availability;
    require(
      'availability_query_succeeded',
      availability?.querySucceeded === true,
      REASON_CODES.CALENDAR_QUERY_FAILED,
      'Slots may only be offered from a successful live free/busy query.',
    );
    require(
      'availability_fresh',
      availability !== undefined &&
        isAvailabilityFresh(availability.queriedAt, input.now, input.config.CALENDAR_FRESHNESS_SECONDS),
      REASON_CODES.CALENDAR_DATA_STALE,
      `Free/busy data must be less than ${input.config.CALENDAR_FRESHNESS_SECONDS} seconds old.`,
    );
    require(
      'reservations_held',
      availability?.reservationsHeld === true,
      REASON_CODES.SLOT_RESERVED_ELSEWHERE,
      'Internal reservations must be held so the same slot is not offered twice.',
    );
    // A time without an explicit zone is ambiguous to the reader.
    require(
      'timezone_stated',
      /\b(amsterdam|cet|cest|utc|gmt)\b/i.test(replyText) || /\btime\b/i.test(replyText),
      REASON_CODES.STYLE_VIOLATION,
      'Proposed times must state the timezone explicitly.',
    );
  }

  if (spec.case === 'BOOK_SELECTED_SLOT') {
    require(
      'calendar_write_enabled',
      input.config.canWriteCalendar,
      REASON_CODES.LIVE_CALENDAR_FLAG_OFF,
      'ALLOW_LIVE_CALENDAR_WRITE is false.',
    );
    require(
      'attendee_email_known',
      input.sendIdentifiers.contactId !== null,
      REASON_CODES.MISSING_ATTENDEE_EMAIL,
      'A usable contact email is required before booking.',
    );
  }

  // --- send identifiers ----------------------------------------------------
  if (input.conversation.channel === 'email') {
    require(
      'reply_to_activity_id',
      input.sendIdentifiers.replyToActivityId !== null &&
        input.sendIdentifiers.replyToActivityId !== 'latest',
      REASON_CODES.MISSING_REPLY_TO_ACTIVITY_ID,
      'An email reply requires the exact inbound activity id, never the ambiguous value "latest".',
    );
  }
  if (input.conversation.channel === 'linkedin') {
    require(
      'linkedin_identifiers',
      input.sendIdentifiers.leadId !== null &&
        input.sendIdentifiers.contactId !== null &&
        input.sendIdentifiers.sendUserId !== null,
      REASON_CODES.MISSING_SEND_IDENTIFIERS,
      'A LinkedIn send requires leadId, contactId and the configured sendUserId.',
    );
  }

  // --- message content -----------------------------------------------------
  const contentResult = checkOutboundContent(replyText, {
    maxWords: spec.maxWords,
    allowUrls: spec.allowUrls,
    allowedUrls: input.approvedUrls ?? [],
    recentOutboundTexts: input.recentOutboundTexts,
    supportedClaimTerms: input.supportedClaimTerms,
  });
  for (const violation of contentResult.violations) {
    if (violation.severity === 'BLOCK') {
      require(
        `content:${violation.code}`,
        false,
        violation.code,
        `${violation.detail}${violation.evidence ? `: ${violation.evidence}` : ''}`,
      );
    } else {
      log.note(`content:${violation.code}`, violation.detail);
    }
  }
  log.note('word_count', `${contentResult.wordCount} words (limit ${spec.maxWords})`);

  return ok;
}

function finish(
  log: PredicateLog,
  action: ControllerAction,
  lowRiskCase: LowRiskCase | null,
  maxWords: number | null,
  nextOwner: PolicyDecision['nextOwner'],
  reasonCodes: readonly ReasonCode[],
  detail: string,
): PolicyDecision {
  return {
    action,
    lowRiskCase,
    maxWords,
    predicates: log.all,
    reasonCodes: reasonCodes.length > 0 ? [...new Set(reasonCodes)] : log.failureCodes,
    detail,
    policyVersion: POLICY_VERSION,
    nextOwner,
  };
}

export { LOW_RISK_CASE_SPECS, INTENT_TO_CASE };
