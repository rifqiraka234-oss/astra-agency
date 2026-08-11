/**
 * Closed vocabularies shared by the controller, the database and the model
 * schemas. Every value here is deliberately explicit: an unknown value must be
 * a hard validation failure, never a silent default that could unlock a send.
 */

export const RUNTIME_MODES = [
  /** Fixture data only. Every external write is blocked. */
  'TEST',
  /** Live reads. Decisions recorded. No writes of any kind. */
  'SHADOW',
  /** Live reads. Lemlist drafts and dashboard approvals only. No live sends. */
  'DRAFT_ONLY',
  /** Only controller-allowlisted low-risk messages may be sent. */
  'LOW_RISK_AUTO',
  /** Ingest and display only. No AI generation unless requested from the UI. */
  'HUMAN_ONLY',
] as const;
export type RuntimeMode = (typeof RUNTIME_MODES)[number];

export const CONVERSATION_OWNERS = [
  'LEMLIST_SEQUENCE',
  'ASTRA_AGENT',
  'HUMAN',
  'SUPPRESSED',
  'UNKNOWN',
] as const;
export type ConversationOwner = (typeof CONVERSATION_OWNERS)[number];

export const CONVERSATION_STATES = [
  'NEW_EVENT',
  'DEBOUNCING',
  'FETCHING_CONTEXT',
  'SEQUENCE_OWNED',
  'ANALYZING',
  'LOW_RISK_ELIGIBLE',
  'DRAFT_CREATED',
  'AWAITING_MESSAGE_APPROVAL',
  'PROTOTYPE_QUEUED',
  'PROTOTYPE_BUILDING',
  'PROTOTYPE_QA_FAILED',
  'AWAITING_PROTOTYPE_APPROVAL',
  'CALENDAR_OPTIONS_PROPOSED',
  'MEETING_BOOKING_PENDING',
  'MEETING_SCHEDULED',
  'HUMAN_REVIEW_REQUIRED',
  'HUMAN_OWNED',
  'SUPPRESSED',
  'RETRYABLE_ERROR',
  'DEAD_LETTER',
  'COMPLETED_NO_ACTION',
] as const;
export type ConversationState = (typeof CONVERSATION_STATES)[number];

export const CHANNELS = ['linkedin', 'email'] as const;
export type Channel = (typeof CHANNELS)[number];

export const MESSAGE_DIRECTIONS = ['INBOUND', 'OUTBOUND', 'SYSTEM', 'UNCERTAIN'] as const;
export type MessageDirection = (typeof MESSAGE_DIRECTIONS)[number];

export const MESSAGE_KINDS = [
  'INBOUND_REPLY',
  'OUTBOUND_CAMPAIGN_MESSAGE',
  'OUTBOUND_INBOX_MESSAGE',
  'INVITATION',
  'SYSTEM_ACTIVITY',
  'DRAFT',
  'UNKNOWN',
] as const;
export type MessageKind = (typeof MESSAGE_KINDS)[number];

export const WEBHOOK_EVENT_TYPES = [
  'linkedinInviteAccepted',
  'linkedinReplied',
  'emailsReplied',
  'emailsUnsubscribed',
  'emailsFailed',
  'emailsBounced',
] as const;
export type WebhookEventType = (typeof WEBHOOK_EVENT_TYPES)[number];

export const INTENTS = [
  'CONNECTION_ACCEPTED',
  'POSITIVE_INTEREST',
  'YES_SEND_PROTOTYPE',
  'GENERAL_QUESTION',
  'SIMPLE_ACKNOWLEDGEMENT',
  'CLARIFICATION_NEEDED',
  'OBJECTION',
  'NOT_NOW',
  'MEETING_INTEREST',
  'SLOT_SELECTED',
  'MEETING_SCHEDULED_OR_REFERENCED',
  'REFERRAL',
  'WRONG_PERSON',
  'NEGATIVE_BUT_OPEN',
  'NOT_INTERESTED',
  'UNSUBSCRIBE',
  'AUTOMATED_REPLY',
  'THIRD_PARTY_REPLY',
  'EXTERNAL_CONTEXT_SUSPECTED',
  'HIGH_RAPPORT_HUMAN_HANDOFF',
  'PRICING_OR_COMMERCIAL',
  'LEGAL_OR_CONTRACTUAL',
  'COMPLAINT_OR_ANGER',
  'UNCLEAR',
] as const;
export type Intent = (typeof INTENTS)[number];

export const RECOMMENDED_ACTIONS = [
  'NO_ACTION',
  'AUTO_SEND_CANDIDATE',
  'CREATE_DRAFT',
  'BUILD_PROTOTYPE',
  'PROPOSE_CALENDAR_SLOTS',
  'BOOK_SELECTED_SLOT',
  'HANDOFF',
  'SUPPRESS',
] as const;
export type RecommendedAction = (typeof RECOMMENDED_ACTIONS)[number];

/**
 * The controller's own action vocabulary. Deliberately distinct from the
 * model's `RecommendedAction`: the model recommends, the controller decides.
 */
export const CONTROLLER_ACTIONS = [
  'NO_ACTION',
  'AUTO_SEND',
  'CREATE_DRAFT',
  'REQUEST_MESSAGE_APPROVAL',
  'BUILD_PROTOTYPE',
  'REQUEST_PROTOTYPE_APPROVAL',
  'PROPOSE_CALENDAR_SLOTS',
  'BOOK_SELECTED_SLOT',
  'HANDOFF',
  'SUPPRESS',
] as const;
export type ControllerAction = (typeof CONTROLLER_ACTIONS)[number];

/**
 * The seven allowlisted low-risk cases from the rollout policy. Anything not
 * on this list can never be sent automatically.
 */
export const LOW_RISK_CASES = [
  'POST_ACCEPTANCE_INITIAL_MESSAGE',
  'SIMPLE_ACKNOWLEDGEMENT',
  'LOW_RISK_CLARIFYING_QUESTION',
  'BASIC_CAPABILITY_ANSWER',
  'CALENDAR_SLOT_PROPOSAL',
  'BOOK_SELECTED_SLOT',
  'POLITE_CLOSE',
] as const;
export type LowRiskCase = (typeof LOW_RISK_CASES)[number];

export const SEQUENCE_STEP_CLASSES = [
  'SUBSTANTIVE_INITIAL_MESSAGE',
  'REMINDER_OR_BUMP',
  'NON_MESSAGE_STEP',
  'UNKNOWN',
] as const;
export type SequenceStepClass = (typeof SEQUENCE_STEP_CLASSES)[number];

export const RAPPORT_LEVELS = ['LOW', 'MEDIUM', 'HIGH'] as const;
export type RapportLevel = (typeof RAPPORT_LEVELS)[number];

export const MEETING_STATES = ['NONE', 'INTERESTED', 'SLOTS_PROPOSED', 'SCHEDULED'] as const;
export type MeetingState = (typeof MEETING_STATES)[number];

export const SENTIMENTS = ['POSITIVE', 'NEUTRAL', 'NEGATIVE', 'ANGRY'] as const;
export type Sentiment = (typeof SENTIMENTS)[number];

export const RISK_LEVELS = ['LOW', 'MEDIUM', 'HIGH'] as const;
export type RiskLevel = (typeof RISK_LEVELS)[number];

export const APPROVAL_STATUSES = [
  'PENDING',
  'APPROVED',
  'REJECTED',
  'REVISION_REQUESTED',
  'STALE',
  'EXPIRED',
  'SUPERSEDED',
  'EXECUTED',
] as const;
export type ApprovalStatus = (typeof APPROVAL_STATUSES)[number];

export const EXCLUSION_SCOPES = ['GLOBAL', 'CAMPAIGN', 'CONTACT', 'LEAD'] as const;
export type ExclusionScope = (typeof EXCLUSION_SCOPES)[number];

export const WEEKDAYS = [
  'SUNDAY',
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
  'SATURDAY',
] as const;
export type Weekday = (typeof WEEKDAYS)[number];
