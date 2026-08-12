-- =============================================================================
-- Unified Adaptive Agent: enrichment, run envelopes, capabilities and learning
-- =============================================================================
-- Expands the conversation-agent schema into the four-engine application.
-- Additive only: no existing table is dropped or rewritten, so this migrates a
-- running deployment without downtime and can be reverted by dropping the new
-- objects.
--
-- Every table here exists because a historical run lost information that had
-- to be reconstructed by hand. The provenance is noted per table.
-- =============================================================================

-- --- shared run envelope -----------------------------------------------------
-- Provenance: 2026-08-09 and 2026-08-12 retrospectives. Confirmation gates,
-- cursors and "what did this run actually do" lived only in chat, so a fresh
-- container could not resume and a duplicate round of research cost ~380k
-- tokens. The envelope makes a run a first-class durable object.
CREATE TABLE run_envelopes (
  id                        uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  correlation_id            text NOT NULL,
  engine                    text NOT NULL
                            CHECK (engine IN ('ENRICHMENT', 'CONVERSATION', 'PROTOTYPE', 'LEARNING')),
  trigger                   text NOT NULL,
  environment               text NOT NULL,
  runtime_mode              text NOT NULL,
  policy_version            text NOT NULL,
  prompt_versions           jsonb NOT NULL DEFAULT '{}'::jsonb,
  model_versions            jsonb NOT NULL DEFAULT '{}'::jsonb,
  integration_versions      jsonb NOT NULL DEFAULT '{}'::jsonb,
  input_snapshot_hash       text,
  -- Mirrors RUN_STATUSES in @astra/core. INTERRUPTED is what a run left behind
  -- by a killed process looks like, and it is the only non-RUNNING status that
  -- may still be resumed.
  status                    text NOT NULL DEFAULT 'RUNNING'
                            CHECK (status IN ('RUNNING', 'COMPLETED', 'COMPLETED_WITH_ERRORS',
                                              'ABORTED', 'FAILED', 'INTERRUPTED')),
  -- Requested vs allowed vs completed is the honest three-way split: a run
  -- that wanted to send 10 and was allowed 0 is not the same as one that sent
  -- 10, and the dashboard must never conflate them.
  external_writes_requested integer NOT NULL DEFAULT 0,
  external_writes_allowed   integer NOT NULL DEFAULT 0,
  external_writes_completed integer NOT NULL DEFAULT 0,
  halt_reason               text,
  started_at                timestamptz NOT NULL DEFAULT now(),
  completed_at              timestamptz
);
CREATE INDEX run_envelopes_engine_idx ON run_envelopes (engine, started_at DESC);
CREATE INDEX run_envelopes_correlation_idx ON run_envelopes (correlation_id);

CREATE TABLE cost_records (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  run_id            uuid REFERENCES run_envelopes (id) ON DELETE CASCADE,
  engine            text NOT NULL,
  stage             text NOT NULL,
  -- Attribution down to the contact, so "which lead cost the most to research"
  -- is answerable. 2026-08-09 could not answer it.
  subject_type      text,
  subject_id        text,
  input_tokens      integer NOT NULL DEFAULT 0,
  output_tokens     integer NOT NULL DEFAULT 0,
  provider_credits  numeric(12, 4) NOT NULL DEFAULT 0,
  wall_clock_ms     integer NOT NULL DEFAULT 0,
  wasted            boolean NOT NULL DEFAULT false,
  wasted_reason     text,
  created_at        timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX cost_records_run_idx ON cost_records (run_id);

-- --- provider capability registry -------------------------------------------
-- Provenance: five workers independently rediscovered the same WebFetch block,
-- twice; the Lemlist company-hint fields were probed and silently skipped on
-- three separate days. A capability is a fact with an owner and an expiry, not
-- something each worker learns alone.
CREATE TABLE provider_capabilities (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  provider            text NOT NULL,
  -- The exact adapter operation, e.g. lemlist.searchCompanies. A working curl
  -- never proves a blocked fetch adapter works: they are different
  -- dependencies and each needs its own row.
  operation           text NOT NULL,
  -- Three independent axes, because the historical failures were three
  -- different things: Netlify was authenticated but not enabled for the
  -- runtime, WebFetch was enabled but blocked, and Lemlist company fields
  -- existed upstream but no reachable call returned them.
  auth_state          text NOT NULL
                      CHECK (auth_state IN ('AUTHENTICATED','UNAUTHENTICATED','UNKNOWN')),
  enablement_state    text NOT NULL
                      CHECK (enablement_state IN ('ENABLED_FOR_RUNTIME','DISABLED_FOR_RUNTIME','UNKNOWN')),
  reachability_state  text NOT NULL
                      CHECK (reachability_state IN ('REACHABLE','BLOCKED','RATE_LIMITED','UNKNOWN')),
  -- Fields the adapter has actually been observed to return, and fields
  -- believed present upstream that it never returns. The gap is recorded so it
  -- is not silently rediscovered on a fourth day.
  observed_fields     text[] NOT NULL DEFAULT '{}',
  missing_fields      text[] NOT NULL DEFAULT '{}',
  detail              text,
  -- An approved fallback changes evidence quality; that must be visible.
  approved_fallback   text,
  last_failure_reason text,
  last_verified_at    timestamptz,
  expires_at          timestamptz,
  created_at          timestamptz NOT NULL DEFAULT now(),
  updated_at          timestamptz NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX provider_capabilities_operation
  ON provider_capabilities (provider, operation);

-- --- enrichment --------------------------------------------------------------
-- Provenance: the New Businesses list assumption (2026 prefilter) was applied
-- globally in conversation rather than stored per list, so 13 contacts had to
-- be re-researched after the rule was discovered.
CREATE TABLE pipeline_profiles (
  id                      uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name                    text NOT NULL,
  version                 integer NOT NULL DEFAULT 1,
  source_list_id          text NOT NULL,
  destination_campaign_id text,
  -- Upstream filters and what they are worth as evidence. This is what makes
  -- "the list is already filtered to 2026" a profile fact rather than a global
  -- assumption applied to lists it was never true for.
  upstream_filters        jsonb NOT NULL DEFAULT '[]'::jsonb,
  launch_policy           jsonb NOT NULL DEFAULT '{}'::jsonb,
  website_taxonomy        jsonb NOT NULL DEFAULT '{}'::jsonb,
  tier_policy             jsonb NOT NULL DEFAULT '{}'::jsonb,
  message_policy          jsonb NOT NULL DEFAULT '{}'::jsonb,
  import_policy           jsonb NOT NULL DEFAULT '{}'::jsonb,
  research_limits         jsonb NOT NULL DEFAULT '{}'::jsonb,
  live_permissions        jsonb NOT NULL DEFAULT '{}'::jsonb,
  is_active               boolean NOT NULL DEFAULT true,
  created_at              timestamptz NOT NULL DEFAULT now(),
  superseded_by           uuid REFERENCES pipeline_profiles (id)
);
CREATE UNIQUE INDEX pipeline_profiles_active_source
  ON pipeline_profiles (source_list_id, version);

CREATE TABLE enrichment_runs (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  run_id              uuid REFERENCES run_envelopes (id) ON DELETE SET NULL,
  pipeline_profile_id uuid NOT NULL REFERENCES pipeline_profiles (id),
  source_list_id      text NOT NULL,
  requested_batch_size integer,
  processed_count     integer NOT NULL DEFAULT 0,
  include_count       integer NOT NULL DEFAULT 0,
  manual_review_count integer NOT NULL DEFAULT 0,
  exclude_count       integer NOT NULL DEFAULT 0,
  imported_count      integer NOT NULL DEFAULT 0,
  halted              boolean NOT NULL DEFAULT false,
  halt_reason         text,
  started_at          timestamptz NOT NULL DEFAULT now(),
  completed_at        timestamptz
);

-- Provenance: offset pagination on this list returns overlapping, reordered
-- windows. Recording each page's returned ID hash is what makes a no-progress
-- loop detectable instead of looking like a finished source.
CREATE TABLE source_fetch_pages (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  enrichment_run_id   uuid NOT NULL REFERENCES enrichment_runs (id) ON DELETE CASCADE,
  page_index          integer NOT NULL,
  requested_offset    integer,
  requested_limit     integer,
  returned_count      integer NOT NULL,
  new_id_count        integer NOT NULL,
  returned_ids_hash   text NOT NULL,
  no_progress         boolean NOT NULL DEFAULT false,
  fetched_at          timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX source_fetch_pages_run_idx ON source_fetch_pages (enrichment_run_id, page_index);

CREATE TABLE source_contacts (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  pipeline_profile_id uuid NOT NULL REFERENCES pipeline_profiles (id),
  lemlist_contact_id  text NOT NULL,
  lemlist_company_id  text,
  first_name          text,
  last_name           text,
  email               text,
  linkedin_url        text,
  company_name        text,
  company_domain      text,
  raw_hints           jsonb NOT NULL DEFAULT '{}'::jsonb,
  first_seen_at       timestamptz NOT NULL DEFAULT now(),
  last_processed_at   timestamptz
);
-- One row per contact per profile: reprocessing under a new profile version is
-- legitimate, reprocessing the same contact twice in one profile is the bug
-- that overlapping pages caused.
CREATE UNIQUE INDEX source_contacts_profile_contact
  ON source_contacts (pipeline_profile_id, lemlist_contact_id);

CREATE TABLE company_resolutions (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source_contact_id   uuid NOT NULL REFERENCES source_contacts (id) ON DELETE CASCADE,
  run_id              uuid REFERENCES run_envelopes (id) ON DELETE SET NULL,
  resolved_domain     text,
  resolution_method   text,
  identity_verified   boolean NOT NULL DEFAULT false,
  -- The BEKLOG case: launch evidence named a different managing director.
  -- A mechanical include score must never override this.
  identity_conflict   boolean NOT NULL DEFAULT false,
  identity_conflict_detail text,
  -- The MM Collectives case: no source anywhere says what the business does.
  business_purpose_known boolean NOT NULL DEFAULT false,
  launch_status       text CHECK (launch_status IN ('QUALIFIED', 'DO_NOT_USE', 'UNKNOWN')),
  launch_confidence   text CHECK (launch_confidence IN ('HIGH', 'MEDIUM', 'LOW')),
  launch_phrase       text,
  launch_evidence_source text,
  attempts_made       integer NOT NULL DEFAULT 0,
  created_at          timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX company_resolutions_contact_idx ON company_resolutions (source_contact_id);

CREATE TABLE website_assessments (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source_contact_id   uuid NOT NULL REFERENCES source_contacts (id) ON DELETE CASCADE,
  run_id              uuid REFERENCES run_envelopes (id) ON DELETE SET NULL,
  classification      text NOT NULL
                      CHECK (classification IN ('NO_WEBSITE','NOT_WORKING','PLACEHOLDER','BASIC','DECENT','STRONG','UNKNOWN')),
  opportunity         text CHECK (opportunity IN ('HIGH','MEDIUM','LOW','NONE')),
  confidence          text NOT NULL CHECK (confidence IN ('HIGH','MEDIUM','LOW')),
  verified_observation text,
  -- The adapter that actually loaded the page. An access failure is UNKNOWN,
  -- never NOT_WORKING, and the adapter identity is how that is auditable.
  source_adapter      text,
  fetch_succeeded     boolean NOT NULL DEFAULT false,
  created_at          timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX website_assessments_contact_idx ON website_assessments (source_contact_id);

CREATE TABLE tier_decisions (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source_contact_id   uuid NOT NULL REFERENCES source_contacts (id) ON DELETE CASCADE,
  enrichment_run_id   uuid REFERENCES enrichment_runs (id) ON DELETE SET NULL,
  pipeline_profile_id uuid NOT NULL REFERENCES pipeline_profiles (id),
  eligibility         text NOT NULL CHECK (eligibility IN ('INCLUDE','MANUAL_REVIEW','EXCLUDE')),
  tier                text NOT NULL CHECK (tier IN ('TIER_1','TIER_2','EXCLUDE')),
  exclusion_reason    text,
  override_reason     text,
  reason_codes        text[] NOT NULL DEFAULT '{}',
  predicates          jsonb NOT NULL DEFAULT '[]'::jsonb,
  policy_version      text NOT NULL,
  decided_at          timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX tier_decisions_tier_idx ON tier_decisions (tier, decided_at DESC);

CREATE TABLE enrichment_message_versions (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source_contact_id   uuid NOT NULL REFERENCES source_contacts (id) ON DELETE CASCADE,
  tier_decision_id    uuid REFERENCES tier_decisions (id) ON DELETE SET NULL,
  version             integer NOT NULL DEFAULT 1,
  connection_message  text NOT NULL,
  first_message       text NOT NULL,
  first_message_word_count integer NOT NULL,
  content_hash        text NOT NULL,
  -- Attaching the versions is what lets the dashboard find live drafts that
  -- predate a style fix, which 2026-08-12 could only do by memory.
  policy_version      text NOT NULL,
  prompt_version      text NOT NULL,
  validator_report    jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at          timestamptz NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX enrichment_message_versions_key
  ON enrichment_message_versions (source_contact_id, version);

-- Provenance: import happened before the audit row was written all through the
-- 2026-08-11 session. Intent first, provider call second, reconciliation third.
CREATE TABLE campaign_import_intents (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source_contact_id   uuid NOT NULL REFERENCES source_contacts (id) ON DELETE CASCADE,
  message_version_id  uuid NOT NULL REFERENCES enrichment_message_versions (id),
  campaign_id         text NOT NULL,
  idempotency_key     text NOT NULL UNIQUE,
  -- Mirrors IMPORT_STATUSES in @astra/core. ALLOWED and IN_FLIGHT are separate
  -- states so a crashed process leaves evidence of whether the provider was
  -- ever actually called.
  status              text NOT NULL DEFAULT 'PENDING'
                      CHECK (status IN ('PENDING','ALLOWED','IN_FLIGHT','SUCCEEDED','FAILED',
                                        'UNKNOWN_REQUIRES_RECONCILIATION','REJECTED','BLOCKED')),
  blocked_reason      text,
  created_at          timestamptz NOT NULL DEFAULT now(),
  attempted_at        timestamptz,
  completed_at        timestamptz
);

CREATE TABLE campaign_import_results (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  import_intent_id    uuid NOT NULL REFERENCES campaign_import_intents (id) ON DELETE CASCADE,
  provider_response   jsonb,
  provider_lead_id    text,
  -- Post-import verification that {{connectionMessage}} rendered as real text
  -- rather than an unresolved placeholder.
  fields_verified     boolean NOT NULL DEFAULT false,
  fields_verified_at  timestamptz,
  field_verification  jsonb,
  error_detail        text,
  created_at          timestamptz NOT NULL DEFAULT now()
);

-- Provenance: the "first Tier 1 batch confirmed" gate lived only in chat, so a
-- stateless container had no way to know it had been passed.
CREATE TABLE confirmation_gates (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  gate_key            text NOT NULL,
  scope               text NOT NULL,
  scope_id            text,
  confirmed           boolean NOT NULL DEFAULT false,
  confirmed_by        uuid REFERENCES operators (id) ON DELETE SET NULL,
  confirmed_at        timestamptz,
  evidence            jsonb NOT NULL DEFAULT '{}'::jsonb,
  -- Hash of whatever was confirmed (the column mapping, for the field-render
  -- gate), so a changed subject invalidates the confirmation automatically.
  subject_hash        text,
  -- Invalidated when the thing it confirmed changes (field mapping, provider
  -- version), so a stale confirmation cannot silently authorize a new shape.
  invalidated_at      timestamptz,
  invalidated_reason  text,
  provider_version    text,
  created_at          timestamptz NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX confirmation_gates_key
  ON confirmation_gates (gate_key, scope, coalesce(scope_id, ''))
  WHERE invalidated_at IS NULL;

-- --- prototype expansion -----------------------------------------------------
CREATE TABLE prototype_strategies (
  id                    uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  prototype_job_id      uuid NOT NULL REFERENCES prototype_jobs (id) ON DELETE CASCADE,
  deliverable_mode      text NOT NULL
                        CHECK (deliverable_mode IN ('CONCEPT_SLICE','CONVERSION_LANDING_PAGE','FULL_PROTOTYPE','PRODUCTION_CANDIDATE')),
  -- The exact offer text from the thread. Fidelity to the promise wins over
  -- what the system would rather build.
  promised_scope_quote  text,
  governing_concept     text,
  brand_adjectives      text[] NOT NULL DEFAULT '{}',
  anti_adjectives       text[] NOT NULL DEFAULT '{}',
  controlled_layers     text[] NOT NULL DEFAULT '{}',
  category_triangulation jsonb NOT NULL DEFAULT '{}'::jsonb,
  business_system_model jsonb NOT NULL DEFAULT '{}'::jsonb,
  role_journey_matrix   jsonb NOT NULL DEFAULT '[]'::jsonb,
  human_trust_plan      jsonb NOT NULL DEFAULT '{}'::jsonb,
  proof_ladder          jsonb NOT NULL DEFAULT '[]'::jsonb,
  narrative_storyboard  jsonb NOT NULL DEFAULT '[]'::jsonb,
  anti_references       text[] NOT NULL DEFAULT '{}',
  collision_report      jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at            timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE evidence_claims (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  research_run_id     uuid REFERENCES research_runs (id) ON DELETE CASCADE,
  prototype_job_id    uuid REFERENCES prototype_jobs (id) ON DELETE CASCADE,
  claim               text NOT NULL,
  -- The four-way split the master context requires. Blurring these is how a
  -- company-reported claim becomes a stated fact on a prospect's page.
  classification      text NOT NULL
                      CHECK (classification IN ('VERIFIED_FACT','COMPANY_REPORTED','HYPOTHESIS','UNKNOWN','ILLUSTRATIVE_DEMO')),
  source_url          text,
  source_excerpt      text,
  retrieved_at        timestamptz,
  drives_design_decision boolean NOT NULL DEFAULT false,
  created_at          timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX evidence_claims_job_idx ON evidence_claims (prototype_job_id);

CREATE TABLE coverage_ledgers (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  prototype_job_id    uuid NOT NULL REFERENCES prototype_jobs (id) ON DELETE CASCADE,
  prototype_version_id uuid REFERENCES prototype_versions (id) ON DELETE CASCADE,
  item                text NOT NULL,
  item_type           text NOT NULL,
  planned_status      text NOT NULL,
  final_status        text
                      CHECK (final_status IN ('REQUIRED_AND_BUILT','DEMONSTRATED_ELSEWHERE','SUMMARIZED','INTENTIONALLY_DEFERRED','BLOCKED_MISSING_FACT','NOT_APPLICABLE')),
  reason              text,
  created_at          timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX coverage_ledgers_job_idx ON coverage_ledgers (prototype_job_id);

CREATE TABLE artifact_bundles (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  prototype_version_id uuid REFERENCES prototype_versions (id) ON DELETE CASCADE,
  run_id              uuid REFERENCES run_envelopes (id) ON DELETE SET NULL,
  -- Object storage, not Git. Generated prospect media never enters the app repo.
  storage_key         text NOT NULL,
  content_hash        text NOT NULL,
  file_manifest       jsonb NOT NULL DEFAULT '[]'::jsonb,
  total_bytes         bigint NOT NULL DEFAULT 0,
  secret_scan_passed  boolean NOT NULL DEFAULT false,
  created_at          timestamptz NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX artifact_bundles_storage_key ON artifact_bundles (storage_key);

CREATE TABLE asset_manifests (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  prototype_version_id uuid NOT NULL REFERENCES prototype_versions (id) ON DELETE CASCADE,
  asset_path          text NOT NULL,
  narrative_role      text,
  provenance          text NOT NULL
                      CHECK (provenance IN ('CLIENT_OWNED','LICENSED','PRODUCT_UI','COMMISSIONED','GENERATED','PLACEHOLDER')),
  source_url          text,
  license_note        text,
  intrinsic_width     integer,
  intrinsic_height    integer,
  alt_text            text,
  -- 0-5 each; minimum 24/30 with authenticity and relevance at least 4.
  score_authenticity  smallint,
  score_relevance     smallint,
  score_brand_fit     smallint,
  score_narrative     smallint,
  score_technical     smallint,
  score_sequence      smallint,
  created_at          timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX asset_manifests_version_idx ON asset_manifests (prototype_version_id);

CREATE TABLE qa_runs (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  prototype_version_id uuid NOT NULL REFERENCES prototype_versions (id) ON DELETE CASCADE,
  rubric_score        integer,
  passed              boolean NOT NULL DEFAULT false,
  -- Real font vs fallback are separate renders. If the real font cannot load,
  -- typography is unverified and cannot silently pass.
  real_font_verified  boolean NOT NULL DEFAULT false,
  fallback_font_verified boolean NOT NULL DEFAULT false,
  media_playback_verified boolean NOT NULL DEFAULT false,
  no_js_verified      boolean NOT NULL DEFAULT false,
  logged_out_verified boolean NOT NULL DEFAULT false,
  breakpoints_checked integer[] NOT NULL DEFAULT '{}',
  created_at          timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE qa_findings (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  qa_run_id           uuid NOT NULL REFERENCES qa_runs (id) ON DELETE CASCADE,
  check_name          text NOT NULL,
  severity            text NOT NULL CHECK (severity IN ('HARD_FAIL','FAIL','WARN','INFO')),
  detail              text NOT NULL,
  breakpoint          integer,
  file_path           text,
  created_at          timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX qa_findings_run_idx ON qa_findings (qa_run_id, severity);

-- --- learning ----------------------------------------------------------------
CREATE TABLE run_retrospectives (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  run_id              uuid NOT NULL REFERENCES run_envelopes (id) ON DELETE CASCADE,
  attempted           jsonb NOT NULL DEFAULT '[]'::jsonb,
  completed           jsonb NOT NULL DEFAULT '[]'::jsonb,
  external_writes     jsonb NOT NULL DEFAULT '[]'::jsonb,
  operator_corrections jsonb NOT NULL DEFAULT '[]'::jsonb,
  mistakes            jsonb NOT NULL DEFAULT '[]'::jsonb,
  near_misses         jsonb NOT NULL DEFAULT '[]'::jsonb,
  root_causes         jsonb NOT NULL DEFAULT '[]'::jsonb,
  repeated_signatures text[] NOT NULL DEFAULT '{}',
  cost_summary        jsonb NOT NULL DEFAULT '{}'::jsonb,
  unresolved_risks    jsonb NOT NULL DEFAULT '[]'::jsonb,
  recommendation      text NOT NULL
                      CHECK (recommendation IN ('RETAIN','EXPERIMENT','FIX','ESCALATE','DEPRECATE','NO_CHANGE')),
  -- A run may decline a retrospective, but only with a stated reason.
  declined_reason     text,
  created_at          timestamptz NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX run_retrospectives_run_key ON run_retrospectives (run_id);

CREATE TABLE feedback_events (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  run_id              uuid REFERENCES run_envelopes (id) ON DELETE SET NULL,
  conversation_id     uuid REFERENCES conversations (id) ON DELETE SET NULL,
  source_contact_id   uuid REFERENCES source_contacts (id) ON DELETE SET NULL,
  event_type          text NOT NULL,
  actor               text NOT NULL,
  before_value        text,
  after_value         text,
  reason              text,
  -- Outcome and attribution confidence are stored separately: a booked meeting
  -- does not prove every preceding tactic was good.
  outcome             text,
  attribution_confidence numeric(3, 2),
  created_at          timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX feedback_events_type_idx ON feedback_events (event_type, created_at DESC);

CREATE TABLE lesson_candidates (
  id                    uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title                 text NOT NULL,
  observation           text NOT NULL,
  exact_failure_or_success text NOT NULL,
  root_cause            text NOT NULL,
  before_example        text,
  after_example         text,
  reusable_rule         text NOT NULL,
  scope                 text NOT NULL
                        CHECK (scope IN ('CONTACT','COMPANY','CAMPAIGN','CATEGORY','INTEGRATION','GLOBAL')),
  scope_id              text,
  applicable_conditions jsonb NOT NULL DEFAULT '[]'::jsonb,
  counterexamples       jsonb NOT NULL DEFAULT '[]'::jsonb,
  known_non_applicability jsonb NOT NULL DEFAULT '[]'::jsonb,
  confidence            numeric(3, 2) NOT NULL,
  attribution_confidence numeric(3, 2) NOT NULL,
  -- Authority class (who may activate this) and risk class (how bad it is if
  -- wrong) are different questions. Conflating them was a modelling mistake:
  -- a low-risk change can still be Class D because it touches a safety gate.
  authority_class       text NOT NULL CHECK (authority_class IN ('A','B','C','D')),
  risk_class            text NOT NULL DEFAULT 'MEDIUM'
                        CHECK (risk_class IN ('LOW','MEDIUM','HIGH')),
  -- Section 25.3: a lesson without a counterexample search cannot be promoted,
  -- so the search itself is recorded rather than assumed.
  counterexample_search_performed boolean NOT NULL DEFAULT false,
  expected_benefit      text,
  possible_harm         text,
  reversibility         text,
  required_eval_cases   text[] NOT NULL DEFAULT '{}',
  required_approver     text,
  status                text NOT NULL DEFAULT 'OBSERVED'
                        CHECK (status IN ('OBSERVED','PROPOSED','NEEDS_MORE_EVIDENCE','READY_FOR_EVAL','VALIDATING_OFFLINE','VALIDATING_SHADOW','AWAITING_APPROVAL','APPROVED_FOR_STAGING','ACTIVE_STAGING','APPROVED_FOR_PRODUCTION','ACTIVE_PRODUCTION','REJECTED','SUPERSEDED','ROLLED_BACK')),
  supersedes            uuid REFERENCES lesson_candidates (id),
  superseded_by         uuid REFERENCES lesson_candidates (id),
  created_by_model_version text,
  created_at            timestamptz NOT NULL DEFAULT now(),
  updated_at            timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX lesson_candidates_status_idx ON lesson_candidates (status, created_at DESC);
CREATE INDEX lesson_candidates_scope_idx ON lesson_candidates (scope, coalesce(scope_id, ''));

CREATE TABLE lesson_evidence_links (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id           uuid NOT NULL REFERENCES lesson_candidates (id) ON DELETE CASCADE,
  run_id              uuid REFERENCES run_envelopes (id) ON DELETE SET NULL,
  feedback_event_id   uuid REFERENCES feedback_events (id) ON DELETE SET NULL,
  note                text,
  created_at          timestamptz NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX lesson_evidence_unique
  ON lesson_evidence_links (lesson_id, coalesce(run_id, '00000000-0000-0000-0000-000000000000'::uuid), coalesce(feedback_event_id, '00000000-0000-0000-0000-000000000000'::uuid));

CREATE TABLE lesson_conflicts (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id           uuid NOT NULL REFERENCES lesson_candidates (id) ON DELETE CASCADE,
  conflicting_lesson_id uuid NOT NULL REFERENCES lesson_candidates (id) ON DELETE CASCADE,
  detail              text NOT NULL,
  resolved            boolean NOT NULL DEFAULT false,
  resolution          text,
  created_at          timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE prompt_versions (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name                text NOT NULL,
  semver              text NOT NULL,
  content_hash        text NOT NULL,
  intended_task       text NOT NULL,
  input_schema        text,
  output_schema       text,
  compatible_models   text[] NOT NULL DEFAULT '{}',
  status              text NOT NULL DEFAULT 'CANDIDATE'
                      CHECK (status IN ('CANDIDATE','ACTIVE','RETIRED','UNVERIFIED')),
  approved_by         uuid REFERENCES operators (id) ON DELETE SET NULL,
  activated_at        timestamptz,
  created_at          timestamptz NOT NULL DEFAULT now()
);
-- Immutable: a given name+semver is one exact content hash forever. Editing an
-- active prompt in place is the thing this prevents.
CREATE UNIQUE INDEX prompt_versions_identity ON prompt_versions (name, semver);
CREATE UNIQUE INDEX prompt_versions_one_active ON prompt_versions (name) WHERE status = 'ACTIVE';

CREATE TABLE policy_versions (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  version             text NOT NULL UNIQUE,
  content_hash        text NOT NULL,
  summary             text,
  status              text NOT NULL DEFAULT 'CANDIDATE'
                      CHECK (status IN ('CANDIDATE','ACTIVE','RETIRED')),
  approved_by         uuid REFERENCES operators (id) ON DELETE SET NULL,
  activated_at        timestamptz,
  created_at          timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE eval_suites (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name                text NOT NULL UNIQUE,
  kind                text NOT NULL
                      CHECK (kind IN ('GOLDEN','RECENT_DRIFT','ADVERSARIAL','PROVIDER_CONTRACT','VISUAL_REGRESSION','HOLDOUT')),
  description         text,
  -- A frozen set cannot be rewritten by a candidate that wants to pass it.
  frozen              boolean NOT NULL DEFAULT false,
  created_at          timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE eval_cases (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  suite_id            uuid NOT NULL REFERENCES eval_suites (id) ON DELETE CASCADE,
  slug                text NOT NULL,
  input_snapshot      jsonb NOT NULL,
  expected_facts      jsonb NOT NULL DEFAULT '[]'::jsonb,
  unacceptable_outputs jsonb NOT NULL DEFAULT '[]'::jsonb,
  hard_gates          text[] NOT NULL DEFAULT '{}',
  rubric              jsonb NOT NULL DEFAULT '{}'::jsonb,
  reviewer_provenance text,
  derived_from_run_id uuid REFERENCES run_envelopes (id) ON DELETE SET NULL,
  redacted            boolean NOT NULL DEFAULT true,
  created_at          timestamptz NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX eval_cases_slug ON eval_cases (suite_id, slug);

CREATE TABLE eval_runs (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  suite_id            uuid NOT NULL REFERENCES eval_suites (id) ON DELETE CASCADE,
  lesson_id           uuid REFERENCES lesson_candidates (id) ON DELETE SET NULL,
  candidate_label     text NOT NULL,
  baseline_label      text,
  aggregate_score     numeric(6, 3),
  hard_gate_regressions integer NOT NULL DEFAULT 0,
  cases_improved      integer NOT NULL DEFAULT 0,
  cases_worsened      integer NOT NULL DEFAULT 0,
  cases_unchanged     integer NOT NULL DEFAULT 0,
  sample_size_warning boolean NOT NULL DEFAULT false,
  per_slice           jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at          timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE eval_results (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  eval_run_id         uuid NOT NULL REFERENCES eval_runs (id) ON DELETE CASCADE,
  eval_case_id        uuid NOT NULL REFERENCES eval_cases (id) ON DELETE CASCADE,
  passed              boolean NOT NULL,
  hard_gate_failed    text,
  score               numeric(6, 3),
  detail              text,
  graded_by           text NOT NULL DEFAULT 'DETERMINISTIC'
                      CHECK (graded_by IN ('DETERMINISTIC','MODEL_RUBRIC','HUMAN')),
  created_at          timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX eval_results_run_idx ON eval_results (eval_run_id);

CREATE TABLE promotion_decisions (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id           uuid NOT NULL REFERENCES lesson_candidates (id) ON DELETE CASCADE,
  from_status         text NOT NULL,
  to_status           text NOT NULL,
  authority_class     text NOT NULL CHECK (authority_class IN ('A','B','C','D')),
  decided_by          uuid REFERENCES operators (id) ON DELETE SET NULL,
  eval_run_id         uuid REFERENCES eval_runs (id) ON DELETE SET NULL,
  rationale           text,
  created_at          timestamptz NOT NULL DEFAULT now(),
  -- Class C and D may move through the evaluation lifecycle unattended, but
  -- reaching staging or production without a named human decider is a bug.
  -- The constraint makes it unrepresentable rather than merely discouraged.
  CONSTRAINT promotion_requires_human_for_c_and_d
    CHECK (
      authority_class IN ('A','B')
      OR to_status NOT IN ('APPROVED_FOR_STAGING','ACTIVE_STAGING',
                           'APPROVED_FOR_PRODUCTION','ACTIVE_PRODUCTION')
      OR decided_by IS NOT NULL
    )
);

CREATE TABLE regression_cases (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug                text NOT NULL UNIQUE,
  title               text NOT NULL,
  origin              text NOT NULL,
  description         text NOT NULL,
  test_reference      text,
  created_at          timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE release_versions (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  version             text NOT NULL UNIQUE,
  git_sha             text,
  release_notes       text,
  environment         text NOT NULL,
  status              text NOT NULL DEFAULT 'PENDING'
                      CHECK (status IN ('PENDING','STAGING','PRODUCTION','ROLLED_BACK')),
  approved_by         uuid REFERENCES operators (id) ON DELETE SET NULL,
  created_at          timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE deployment_records (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  release_version_id  uuid REFERENCES release_versions (id) ON DELETE SET NULL,
  environment         text NOT NULL,
  status              text NOT NULL,
  health_check_passed boolean,
  detail              text,
  created_at          timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE rollback_records (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  release_version_id  uuid REFERENCES release_versions (id) ON DELETE SET NULL,
  reason              text NOT NULL,
  restored_version    text,
  performed_by        uuid REFERENCES operators (id) ON DELETE SET NULL,
  created_at          timestamptz NOT NULL DEFAULT now()
);

-- --- conversation additions --------------------------------------------------
ALTER TABLE conversations
  ADD COLUMN IF NOT EXISTS source_contact_id uuid REFERENCES source_contacts (id) ON DELETE SET NULL;

ALTER TABLE prototype_jobs
  ADD COLUMN IF NOT EXISTS deliverable_mode text
    CHECK (deliverable_mode IN ('CONCEPT_SLICE','CONVERSION_LANDING_PAGE','FULL_PROTOTYPE','PRODUCTION_CANDIDATE')),
  ADD COLUMN IF NOT EXISTS run_id uuid REFERENCES run_envelopes (id) ON DELETE SET NULL;

ALTER TABLE prototype_deployments
  ADD COLUMN IF NOT EXISTS artifact_bundle_id uuid REFERENCES artifact_bundles (id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS sso_disabled_verified boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS logged_out_status integer;

ALTER TABLE model_runs
  ADD COLUMN IF NOT EXISTS run_id uuid REFERENCES run_envelopes (id) ON DELETE SET NULL;

ALTER TABLE decisions
  ADD COLUMN IF NOT EXISTS run_id uuid REFERENCES run_envelopes (id) ON DELETE SET NULL;
