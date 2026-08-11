-- =============================================================================
-- Astra reply agent: initial schema
-- =============================================================================
-- Design rules applied throughout:
--   * Every externally sourced identifier that can arrive twice carries a
--     unique constraint, so idempotency is enforced by the database rather
--     than by application luck.
--   * Nothing is hard deleted. Retention and archival are explicit columns so
--     an audit can always answer "what did we know, and when".
--   * Sensitive integration material is stored as ciphertext produced by the
--     application layer. The database never sees a plaintext refresh token.
-- =============================================================================

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- --- operators ---------------------------------------------------------------
CREATE TABLE operators (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email           text NOT NULL,
  display_name    text,
  role            text NOT NULL DEFAULT 'ADMIN' CHECK (role IN ('ADMIN', 'REVIEWER', 'VIEWER')),
  is_active       boolean NOT NULL DEFAULT true,
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX operators_email_key ON operators (lower(email));

-- --- integration connections -------------------------------------------------
CREATE TABLE integration_connections (
  id                    uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  provider              text NOT NULL CHECK (provider IN ('LEMLIST', 'ANTHROPIC', 'NETLIFY', 'GOOGLE_CALENDAR', 'MICROSOFT_CALENDAR', 'RESEND')),
  account_identifier    text,
  status                text NOT NULL DEFAULT 'DISCONNECTED'
                        CHECK (status IN ('CONNECTED', 'DISCONNECTED', 'EXPIRED', 'ERROR')),
  -- AES-256-GCM ciphertext produced by packages/db/src/crypto.ts. The key
  -- lives outside the database, in the process environment or secret manager.
  encrypted_credentials text,
  scopes                text[] NOT NULL DEFAULT '{}',
  expires_at            timestamptz,
  last_verified_at      timestamptz,
  last_error            text,
  created_at            timestamptz NOT NULL DEFAULT now(),
  updated_at            timestamptz NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX integration_connections_provider_account_key
  ON integration_connections (provider, coalesce(account_identifier, ''));

-- --- campaign policy ---------------------------------------------------------
CREATE TABLE campaign_policies (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lemlist_campaign_id text NOT NULL UNIQUE,
  campaign_name       text,
  automation_enabled  boolean NOT NULL DEFAULT false,
  -- Per campaign override of the global cap. NULL means "use the global value".
  max_automated_outbound smallint,
  notes               text,
  created_at          timestamptz NOT NULL DEFAULT now(),
  updated_at          timestamptz NOT NULL DEFAULT now()
);

-- --- contacts and leads ------------------------------------------------------
CREATE TABLE contacts (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lemlist_contact_id  text NOT NULL UNIQUE,
  first_name          text,
  last_name           text,
  email               text,
  linkedin_url        text,
  company_name        text,
  company_domain      text,
  -- Never inferred from a company address; only set when explicitly stated.
  timezone            text,
  is_suppressed       boolean NOT NULL DEFAULT false,
  suppressed_reason   text,
  suppressed_at       timestamptz,
  created_at          timestamptz NOT NULL DEFAULT now(),
  updated_at          timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX contacts_email_idx ON contacts (lower(email)) WHERE email IS NOT NULL;

CREATE TABLE leads (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lemlist_lead_id     text NOT NULL,
  contact_id          uuid NOT NULL REFERENCES contacts (id) ON DELETE RESTRICT,
  lemlist_campaign_id text NOT NULL,
  state               text,
  is_paused           boolean NOT NULL DEFAULT false,
  paused_at           timestamptz,
  paused_by           text,
  last_synced_at      timestamptz,
  created_at          timestamptz NOT NULL DEFAULT now(),
  updated_at          timestamptz NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX leads_lemlist_lead_campaign_key ON leads (lemlist_lead_id, lemlist_campaign_id);
CREATE INDEX leads_contact_idx ON leads (contact_id);

-- --- conversations -----------------------------------------------------------
CREATE TABLE conversations (
  id                          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_id                  uuid NOT NULL REFERENCES contacts (id) ON DELETE RESTRICT,
  lemlist_campaign_id         text,
  channel                     text NOT NULL DEFAULT 'unknown'
                              CHECK (channel IN ('linkedin', 'email', 'unknown')),
  owner                       text NOT NULL DEFAULT 'UNKNOWN'
                              CHECK (owner IN ('LEMLIST_SEQUENCE', 'ASTRA_AGENT', 'HUMAN', 'SUPPRESSED', 'UNKNOWN')),
  state                       text NOT NULL DEFAULT 'NEW_EVENT',
  conversation_hash           text,
  latest_inbound_message_id   text,
  latest_inbound_at           timestamptz,
  meaningful_turn_count       integer NOT NULL DEFAULT 0,
  automated_outbound_count    integer NOT NULL DEFAULT 0,
  meeting_scheduled           boolean NOT NULL DEFAULT false,
  -- Set by the operator after a meeting: keep human owned, resume low risk
  -- automation, or exclude permanently. NULL means "not decided yet", which
  -- keeps the conversation human owned.
  post_meeting_decision       text CHECK (post_meeting_decision IN ('KEEP_HUMAN', 'RESUME_LOW_RISK', 'EXCLUDE')),
  created_at                  timestamptz NOT NULL DEFAULT now(),
  updated_at                  timestamptz NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX conversations_contact_key ON conversations (contact_id);
CREATE INDEX conversations_state_idx ON conversations (state);
CREATE INDEX conversations_owner_idx ON conversations (owner);

-- --- messages ----------------------------------------------------------------
CREATE TABLE messages (
  id                    uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id       uuid NOT NULL REFERENCES conversations (id) ON DELETE CASCADE,
  -- The Lemlist activity id. Unique so a replayed fetch cannot duplicate a turn.
  external_activity_id  text NOT NULL UNIQUE,
  occurred_at           timestamptz NOT NULL,
  channel               text NOT NULL,
  direction             text NOT NULL CHECK (direction IN ('INBOUND', 'OUTBOUND', 'SYSTEM', 'UNCERTAIN')),
  kind                  text NOT NULL,
  body_text             text NOT NULL DEFAULT '',
  body_html_sanitized   text,
  subject               text,
  sender                text,
  recipients            text[] NOT NULL DEFAULT '{}',
  cc                    text[] NOT NULL DEFAULT '{}',
  lemlist_campaign_id   text,
  lemlist_lead_id       text,
  sequence_id           text,
  step_id               text,
  sequence_position     integer,
  attachments           jsonb NOT NULL DEFAULT '[]'::jsonb,
  had_quoted_history    boolean NOT NULL DEFAULT false,
  created_at            timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX messages_conversation_time_idx ON messages (conversation_id, occurred_at, external_activity_id);

-- --- webhook ingestion -------------------------------------------------------
CREATE TABLE webhook_events (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  -- Lemlist's activity _id, the primary idempotency key when present. When it
  -- is absent we fall back to a hash of the payload, which is why this column
  -- is generic rather than named after the Lemlist field.
  idempotency_key     text NOT NULL UNIQUE,
  event_type          text NOT NULL,
  lemlist_team_id     text,
  lemlist_campaign_id text,
  lemlist_lead_id     text,
  lemlist_contact_id  text,
  is_third_party_reply boolean NOT NULL DEFAULT false,
  -- Full payload, access controlled. Never rendered in ordinary dashboard views.
  raw_payload         jsonb NOT NULL,
  -- Reduced projection safe for everyday display.
  sanitized_payload   jsonb NOT NULL DEFAULT '{}'::jsonb,
  received_at         timestamptz NOT NULL DEFAULT now(),
  processed_at        timestamptz,
  processing_outcome  text,
  ignored_reason      text
);
CREATE INDEX webhook_events_contact_idx ON webhook_events (lemlist_contact_id, received_at DESC);
CREATE INDEX webhook_events_unprocessed_idx ON webhook_events (received_at) WHERE processed_at IS NULL;

-- --- processing jobs ---------------------------------------------------------
CREATE TABLE processing_jobs (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_id          uuid NOT NULL REFERENCES contacts (id) ON DELETE CASCADE,
  job_type            text NOT NULL,
  status              text NOT NULL DEFAULT 'SCHEDULED'
                      CHECK (status IN ('SCHEDULED', 'RUNNING', 'SUCCEEDED', 'FAILED', 'CANCELLED')),
  -- Moved forward every time another inbound event lands during the debounce
  -- window, which is how rapid consecutive messages collapse into one run.
  process_after       timestamptz NOT NULL,
  attempts            smallint NOT NULL DEFAULT 0,
  last_error          text,
  correlation_id      text NOT NULL,
  created_at          timestamptz NOT NULL DEFAULT now(),
  updated_at          timestamptz NOT NULL DEFAULT now()
);
-- At most one live job per contact, enforced by the database rather than by
-- the worker remembering to check.
CREATE UNIQUE INDEX processing_jobs_active_per_contact
  ON processing_jobs (contact_id)
  WHERE status IN ('SCHEDULED', 'RUNNING');
CREATE INDEX processing_jobs_due_idx ON processing_jobs (process_after) WHERE status = 'SCHEDULED';

-- --- state history -----------------------------------------------------------
CREATE TABLE conversation_states (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id   uuid NOT NULL REFERENCES conversations (id) ON DELETE CASCADE,
  previous_state    text,
  next_state        text NOT NULL,
  actor             text NOT NULL,
  reason_code       text NOT NULL,
  detail            text,
  source_message_id text,
  correlation_id    text NOT NULL,
  occurred_at       timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX conversation_states_conversation_idx ON conversation_states (conversation_id, occurred_at DESC);

CREATE TABLE ownership_history (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id   uuid NOT NULL REFERENCES conversations (id) ON DELETE CASCADE,
  previous_owner    text,
  next_owner        text NOT NULL,
  actor             text NOT NULL,
  reason_code       text NOT NULL,
  detail            text,
  -- Proof that the pause was observed, not merely requested.
  pause_verified    boolean,
  correlation_id    text NOT NULL,
  occurred_at       timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX ownership_history_conversation_idx ON ownership_history (conversation_id, occurred_at DESC);

-- --- research ----------------------------------------------------------------
CREATE TABLE research_runs (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id   uuid REFERENCES conversations (id) ON DELETE CASCADE,
  contact_id        uuid NOT NULL REFERENCES contacts (id) ON DELETE CASCADE,
  purpose           text NOT NULL,
  status            text NOT NULL DEFAULT 'RUNNING'
                    CHECK (status IN ('RUNNING', 'SUCCEEDED', 'FAILED', 'AMBIGUOUS')),
  company_identity_verified boolean NOT NULL DEFAULT false,
  summary           text,
  prompt_version    text,
  correlation_id    text NOT NULL,
  started_at        timestamptz NOT NULL DEFAULT now(),
  finished_at       timestamptz
);

CREATE TABLE research_sources (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  research_run_id   uuid NOT NULL REFERENCES research_runs (id) ON DELETE CASCADE,
  url               text NOT NULL,
  page_title        text,
  retrieved_at      timestamptz NOT NULL,
  excerpt           text NOT NULL,
  confidence        numeric(3, 2) NOT NULL CHECK (confidence >= 0 AND confidence <= 1),
  -- Set when the fetched page contained instruction-like content aimed at the
  -- agent. Any true value removes automatic-send eligibility.
  injection_suspected boolean NOT NULL DEFAULT false,
  created_at        timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX research_sources_run_idx ON research_sources (research_run_id);

-- --- model runs and decisions ------------------------------------------------
CREATE TABLE model_runs (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id   uuid REFERENCES conversations (id) ON DELETE CASCADE,
  purpose           text NOT NULL,
  model             text NOT NULL,
  prompt_version    text NOT NULL,
  schema_version    text,
  input_hash        text NOT NULL,
  raw_output        jsonb,
  parse_ok          boolean NOT NULL DEFAULT false,
  parse_errors      text[],
  input_tokens      integer,
  output_tokens     integer,
  latency_ms        integer,
  correlation_id    text NOT NULL,
  created_at        timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX model_runs_conversation_idx ON model_runs (conversation_id, created_at DESC);

CREATE TABLE decisions (
  id                    uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id       uuid NOT NULL REFERENCES conversations (id) ON DELETE CASCADE,
  model_run_id          uuid REFERENCES model_runs (id) ON DELETE SET NULL,
  -- What the model asked for, kept separately from what the controller did.
  model_recommendation  text,
  controller_action     text NOT NULL,
  low_risk_case         text,
  intent                text,
  confidence            numeric(4, 3),
  risk                  text,
  reason_codes          text[] NOT NULL DEFAULT '{}',
  -- Every predicate, passing and failing, so the dashboard can explain itself.
  predicates            jsonb NOT NULL DEFAULT '[]'::jsonb,
  evidence              jsonb NOT NULL DEFAULT '[]'::jsonb,
  policy_version        text NOT NULL,
  detail                text,
  source_message_id     text,
  correlation_id        text NOT NULL,
  created_at            timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX decisions_conversation_idx ON decisions (conversation_id, created_at DESC);

-- --- outbound ----------------------------------------------------------------
CREATE TABLE outbound_intents (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id     uuid NOT NULL REFERENCES conversations (id) ON DELETE CASCADE,
  decision_id         uuid REFERENCES decisions (id) ON DELETE SET NULL,
  approval_id         uuid,
  channel             text NOT NULL CHECK (channel IN ('linkedin', 'email')),
  action_type         text NOT NULL,
  body_text           text NOT NULL,
  content_hash        text NOT NULL,
  -- Derived from contact + latest inbound activity + action + content hash.
  idempotency_key     text NOT NULL UNIQUE,
  reply_to_activity_id text,
  lemlist_lead_id     text,
  lemlist_contact_id  text,
  send_user_id        text,
  status              text NOT NULL DEFAULT 'PENDING'
                      CHECK (status IN ('PENDING', 'SENT', 'FAILED', 'BLOCKED', 'ABANDONED', 'UNKNOWN')),
  -- A timed-out send is UNKNOWN, never retried blindly: the conversation is
  -- refetched first to find out whether it actually went out.
  provider_response   jsonb,
  provider_message_id text,
  error_detail        text,
  attempted_at        timestamptz,
  completed_at        timestamptz,
  correlation_id      text NOT NULL,
  created_at          timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX outbound_intents_conversation_idx ON outbound_intents (conversation_id, created_at DESC);
CREATE INDEX outbound_intents_status_idx ON outbound_intents (status) WHERE status IN ('PENDING', 'UNKNOWN');

CREATE TABLE lemlist_drafts (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id     uuid NOT NULL REFERENCES conversations (id) ON DELETE CASCADE,
  outbound_intent_id  uuid REFERENCES outbound_intents (id) ON DELETE SET NULL,
  lemlist_draft_id    text,
  draft_owner         text,
  body_text           text NOT NULL,
  content_hash        text NOT NULL,
  status              text NOT NULL DEFAULT 'CREATED'
                      CHECK (status IN ('CREATED', 'FAILED', 'SUPERSEDED')),
  created_at          timestamptz NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX lemlist_drafts_lemlist_id_key ON lemlist_drafts (lemlist_draft_id)
  WHERE lemlist_draft_id IS NOT NULL;

-- --- approvals ---------------------------------------------------------------
CREATE TABLE approvals (
  id                        uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id           uuid NOT NULL REFERENCES conversations (id) ON DELETE CASCADE,
  action_type               text NOT NULL
                            CHECK (action_type IN ('SEND_MESSAGE', 'SEND_PROTOTYPE_LINK', 'PROPOSE_SLOTS', 'BOOK_MEETING')),
  status                    text NOT NULL DEFAULT 'PENDING'
                            CHECK (status IN ('PENDING', 'APPROVED', 'REJECTED', 'REVISION_REQUESTED', 'STALE', 'EXPIRED', 'SUPERSEDED', 'EXECUTED')),
  version                   integer NOT NULL DEFAULT 1,
  -- Everything the approval is bound to, hashed into one key.
  binding_key               text NOT NULL,
  source_latest_inbound_message_id text,
  conversation_hash         text NOT NULL,
  reply_text                text NOT NULL,
  reply_content_hash        text NOT NULL,
  prototype_version_id      uuid,
  prototype_content_hash    text,
  prototype_deploy_hash     text,
  approved_urls             text[] NOT NULL DEFAULT '{}',
  policy_version            text NOT NULL,
  prompt_version            text NOT NULL,
  requested_at              timestamptz NOT NULL DEFAULT now(),
  expires_at                timestamptz NOT NULL,
  decided_at                timestamptz,
  decided_by                uuid REFERENCES operators (id) ON DELETE SET NULL,
  decision_note             text,
  executed_at               timestamptz,
  correlation_id            text NOT NULL
);
-- Only one live approval per action per conversation, so "approve" is never
-- ambiguous about which version it authorized.
CREATE UNIQUE INDEX approvals_one_open_per_action
  ON approvals (conversation_id, action_type)
  WHERE status IN ('PENDING', 'APPROVED');
CREATE INDEX approvals_status_idx ON approvals (status, requested_at DESC);

-- --- prototypes --------------------------------------------------------------
CREATE TABLE prototype_jobs (
  id                        uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id           uuid NOT NULL REFERENCES conversations (id) ON DELETE CASCADE,
  contact_id                uuid NOT NULL REFERENCES contacts (id) ON DELETE CASCADE,
  status                    text NOT NULL DEFAULT 'QUEUED'
                            CHECK (status IN ('QUEUED', 'RESEARCHING', 'BUILDING', 'QA', 'QA_FAILED', 'DEPLOYED', 'AWAITING_APPROVAL', 'APPROVED', 'REJECTED', 'FAILED')),
  -- The exact state this prototype was requested from.
  source_conversation_hash  text NOT NULL,
  source_latest_inbound_message_id text,
  -- The message in which Astra actually offered a sketch. A prototype without
  -- one of these is a prototype nobody asked for.
  offer_message_id          text,
  concept_brief             jsonb,
  attempts                  smallint NOT NULL DEFAULT 0,
  last_error                text,
  correlation_id            text NOT NULL,
  created_at                timestamptz NOT NULL DEFAULT now(),
  updated_at                timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX prototype_jobs_status_idx ON prototype_jobs (status, created_at DESC);

CREATE TABLE prototype_versions (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  prototype_job_id    uuid NOT NULL REFERENCES prototype_jobs (id) ON DELETE CASCADE,
  version             integer NOT NULL,
  hypothesis          text NOT NULL,
  business_reasoning  text,
  files               jsonb NOT NULL DEFAULT '[]'::jsonb,
  content_hash        text NOT NULL,
  qa_report           jsonb NOT NULL DEFAULT '{}'::jsonb,
  qa_passed           boolean NOT NULL DEFAULT false,
  desktop_screenshot_path text,
  mobile_screenshot_path  text,
  screenshot_hashes   text[] NOT NULL DEFAULT '{}',
  prompt_version      text,
  created_at          timestamptz NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX prototype_versions_job_version_key ON prototype_versions (prototype_job_id, version);

CREATE TABLE prototype_deployments (
  id                    uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  prototype_version_id  uuid NOT NULL REFERENCES prototype_versions (id) ON DELETE CASCADE,
  netlify_site_id       text NOT NULL,
  netlify_deploy_id     text NOT NULL,
  site_name             text NOT NULL,
  -- The immutable per-deploy URL is what an approval binds to; the friendly
  -- URL can be repointed by a later deploy and is therefore not the anchor.
  immutable_url         text NOT NULL,
  friendly_url          text NOT NULL,
  deploy_hash           text NOT NULL,
  status                text NOT NULL DEFAULT 'LIVE'
                        CHECK (status IN ('LIVE', 'REJECTED_ARCHIVED', 'DELETED')),
  deployed_at           timestamptz NOT NULL DEFAULT now(),
  archived_at           timestamptz,
  deleted_at            timestamptz
);
CREATE UNIQUE INDEX prototype_deployments_deploy_key ON prototype_deployments (netlify_deploy_id);

-- --- calendar ----------------------------------------------------------------
CREATE TABLE calendar_availability_queries (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id   uuid REFERENCES conversations (id) ON DELETE CASCADE,
  provider          text NOT NULL,
  window_start      timestamptz NOT NULL,
  window_end        timestamptz NOT NULL,
  succeeded         boolean NOT NULL,
  -- Hash of the returned busy blocks, so a proposal can prove which snapshot
  -- of the calendar it was derived from.
  result_hash       text,
  busy_blocks       jsonb NOT NULL DEFAULT '[]'::jsonb,
  error_detail      text,
  queried_at        timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX calendar_queries_conversation_idx ON calendar_availability_queries (conversation_id, queried_at DESC);

CREATE TABLE slot_reservations (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id   uuid NOT NULL REFERENCES conversations (id) ON DELETE CASCADE,
  availability_query_id uuid REFERENCES calendar_availability_queries (id) ON DELETE SET NULL,
  slot_start        timestamptz NOT NULL,
  slot_end          timestamptz NOT NULL,
  status            text NOT NULL DEFAULT 'HELD'
                    CHECK (status IN ('HELD', 'RELEASED', 'CONSUMED', 'EXPIRED')),
  expires_at        timestamptz NOT NULL,
  created_at        timestamptz NOT NULL DEFAULT now(),
  released_at       timestamptz,
  CONSTRAINT slot_reservations_ordered CHECK (slot_end > slot_start)
);
-- Two live reservations may not cover the same instant: this is what stops the
-- same slot being offered to two prospects at once.
CREATE EXTENSION IF NOT EXISTS btree_gist;
ALTER TABLE slot_reservations
  ADD CONSTRAINT slot_reservations_no_overlap
  EXCLUDE USING gist (
    tstzrange(slot_start, slot_end) WITH &&
  ) WHERE (status = 'HELD');
CREATE INDEX slot_reservations_expiry_idx ON slot_reservations (expires_at) WHERE status = 'HELD';

CREATE TABLE calendar_events (
  id                    uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id       uuid NOT NULL REFERENCES conversations (id) ON DELETE CASCADE,
  slot_reservation_id   uuid REFERENCES slot_reservations (id) ON DELETE SET NULL,
  provider              text NOT NULL,
  provider_event_id     text NOT NULL,
  event_web_url         text,
  title                 text NOT NULL,
  starts_at             timestamptz NOT NULL,
  ends_at               timestamptz NOT NULL,
  attendee_email        text NOT NULL,
  status                text NOT NULL DEFAULT 'CONFIRMED'
                        CHECK (status IN ('CONFIRMED', 'CANCELLED')),
  created_at            timestamptz NOT NULL DEFAULT now(),
  cancelled_at          timestamptz
);
CREATE UNIQUE INDEX calendar_events_provider_event_key ON calendar_events (provider, provider_event_id);

-- --- notifications, exclusions, audit ----------------------------------------
CREATE TABLE notifications (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id   uuid REFERENCES conversations (id) ON DELETE CASCADE,
  kind              text NOT NULL,
  severity          text NOT NULL DEFAULT 'INFO' CHECK (severity IN ('INFO', 'WARN', 'CRITICAL')),
  channel           text NOT NULL DEFAULT 'EMAIL' CHECK (channel IN ('EMAIL', 'DASHBOARD')),
  recipient         text,
  subject           text,
  body              text,
  -- Used for deduplication and cooldown so one failing contact cannot flood
  -- the operator's inbox.
  dedupe_key        text NOT NULL,
  status            text NOT NULL DEFAULT 'PENDING'
                    CHECK (status IN ('PENDING', 'SENT', 'SUPPRESSED', 'FAILED')),
  suppressed_reason text,
  sent_at           timestamptz,
  created_at        timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX notifications_dedupe_idx ON notifications (dedupe_key, created_at DESC);

CREATE TABLE exclusions (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  scope         text NOT NULL CHECK (scope IN ('GLOBAL', 'CAMPAIGN', 'CONTACT', 'LEAD')),
  target_id     text,
  reason        text NOT NULL,
  active        boolean NOT NULL DEFAULT true,
  created_by    uuid REFERENCES operators (id) ON DELETE SET NULL,
  created_at    timestamptz NOT NULL DEFAULT now(),
  revoked_at    timestamptz,
  CONSTRAINT exclusions_target_required CHECK (scope = 'GLOBAL' OR target_id IS NOT NULL)
);
CREATE UNIQUE INDEX exclusions_active_key ON exclusions (scope, coalesce(target_id, '')) WHERE active;

CREATE TABLE audit_events (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id   uuid REFERENCES conversations (id) ON DELETE SET NULL,
  actor             text NOT NULL,
  action            text NOT NULL,
  reason_code       text,
  -- Redacted before insert by packages/core/src/text/redact.ts.
  payload           jsonb NOT NULL DEFAULT '{}'::jsonb,
  correlation_id    text,
  occurred_at       timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX audit_events_conversation_idx ON audit_events (conversation_id, occurred_at DESC);
CREATE INDEX audit_events_occurred_idx ON audit_events (occurred_at DESC);

CREATE TABLE dead_letters (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source            text NOT NULL,
  conversation_id   uuid REFERENCES conversations (id) ON DELETE SET NULL,
  payload           jsonb NOT NULL,
  error_detail      text NOT NULL,
  attempts          smallint NOT NULL DEFAULT 0,
  status            text NOT NULL DEFAULT 'OPEN' CHECK (status IN ('OPEN', 'RETRIED', 'RESOLVED')),
  correlation_id    text,
  created_at        timestamptz NOT NULL DEFAULT now(),
  resolved_at       timestamptz
);
CREATE INDEX dead_letters_status_idx ON dead_letters (status, created_at DESC);

-- --- rollout -----------------------------------------------------------------
CREATE TABLE rollout_state (
  id                    integer PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  -- Mirrors RUNTIME_MODE, but records who changed it and when. Rollout stages
  -- never advance on their own.
  current_mode          text NOT NULL DEFAULT 'TEST',
  changed_by            uuid REFERENCES operators (id) ON DELETE SET NULL,
  changed_at            timestamptz NOT NULL DEFAULT now(),
  shadow_decisions_reviewed integer NOT NULL DEFAULT 0,
  checklist             jsonb NOT NULL DEFAULT '{}'::jsonb,
  note                  text
);
INSERT INTO rollout_state (id) VALUES (1) ON CONFLICT DO NOTHING;
