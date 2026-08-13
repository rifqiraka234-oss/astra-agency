# Historical source traceability register

*Specification section 34. Every row of the register is preserved verbatim and
carries a `status` and an implementation reference. The specification forbids
marking the project complete with an unaddressed row, so rows that are not
implemented say `NOT BUILT` and appear in the summary at the end.*

Status vocabulary:

- **DONE** — implemented and covered by a test that would fail if it regressed.
- **PARTIAL** — implemented in part; what is missing is stated in the row.
- **NOT BUILT** — not implemented. No test, no code.
- **PROCESS** — a working rule rather than code. Where a rule can be enforced
  structurally it has been; where it genuinely cannot, the row says so.

---

## 34.1 `session-retro-2026-08-09.md`

| Historical lesson | Status | Implementation |
| --- | --- | --- |
| Ambiguous "continue" request was correctly clarified | DONE | `canResumeRun` in `packages/core/src/run/envelope.ts` identifies the active checkpoint; only `RUNNING`/`INTERRUPTED` runs resume. Test: `envelope.test.ts` "never resumes a run that already completed". |
| First live batch size was confirmed | DONE | `batchSize` is a caller parameter and `allowLiveImport` is profile-scoped, defaulting false. Test: `tiers.test.ts` "defaults live import to closed". |
| Offset pagination overlapped | DONE | `packages/core/src/enrichment/pagination.ts`. Tests: `pagination.test.ts` (8 cases) and `enrichment.integration.test.ts` "processes each contact once when pages overlap". |
| Company hint fields could not be reached and optimization was silently skipped | DONE | `provider_capabilities.missing_fields`, populated by `probeCapabilities` in `apps/worker/src/enrichment/run.ts`. Test: "records the Lemlist company-field gap instead of rediscovering it". |
| Five agents each rediscovered blocked WebFetch | DONE | `preflightBeforeFanOut` in `packages/core/src/run/capabilities.ts`, enforced before any per-contact work. Test: "halts before fanning out when the shared research adapter is blocked". |
| Raw curl worked while WebFetch remained blocked | DONE | Capabilities key on exact `operation`, not provider. `mayClaimCapabilityFixed` refuses a claim proved through a different path. Test: `capabilities.test.ts` "refuses a fix claim proved through a different path". |
| A second fan-out followed a false "fixed" claim | DONE | Same function; a claim with no verification is also refused. Test: "refuses a fix claim with no verification at all". |
| Workaround adoption required Raka's decision | DONE | `ProviderCapability.approvedFallback` is null by default; a fallback in use sets `degradesEvidence`. Test: "permits the fallback but marks the evidence degraded". |
| Good Stage 1 data was salvaged | DONE | Each contact commits in its own transaction (`withTransaction` per contact in `run.ts`), and stage outputs persist to `website_assessments` / `company_resolutions` independently. Test: "does not reprocess a contact on the next run". |
| BEKLOG identity mismatch overrode Tier 1 | DONE | `mandatoryManualReviewReasons` is evaluated before the mechanical score in `tiers.ts`. Tests: `tiers.test.ts` "BEKLOG fixture" and the integration test of the same name. |
| MM Collectives purpose unknown despite placeholder site | DONE | `businessPurposeUnverifiable` forces `MANUAL_REVIEW` and `mayDraftMessages: false`. Tests: `tiers.test.ts` "MM Collectives fixture" and the integration equivalent. |
| Word/dash guardrail scripted | DONE | `validateEnrichmentMessages` in `packages/core/src/enrichment/messages.ts`; blocks all dash characters and enforces the 65-word ceiling. Tests: `messages.test.ts` (11 cases). |
| State writes scripted | DONE | Typed repositories in `packages/db/src/enrichment-repositories.ts`; no hand transcription anywhere in the path. |
| First import stopped for field confirmation | DONE | `confirmation_gates` with `subject_hash` + `provider_version`; `isConfirmationValid`. Tests: `import-intent.test.ts` (4 cases) and the integration test "asks for the field-mapping confirmation on the first import only". |
| Screenshot lacked columns; API verified instead | DONE | `verifyRenderedFields` checks the actual stored values, recorded in `campaign_import_results.field_verification`. Test: `import-intent.test.ts` "catches a custom field that imported as a literal placeholder". |
| Verbosity complaint | DONE | `formatRunReport` emits the section 7.8 compact table. Test: "reports a batch as a compact table". Blockers carve out through `operatorMessage`. |
| Confirmation lived only in chat | DONE | `confirmation_gates` is a database table, read on every run. Test: "does not ask again once confirmed, and asks again when the mapping changes". |

## 34.2 `session-retrospective-2026-08-12.md`

| Historical lesson | Status | Implementation |
| --- | --- | --- |
| Contact record plus public research replaces absent company record | DONE | `verifyIdentity` in `run.ts` uses `contact.hints` (summary/tagline/jobDescription) plus `research.verifyIdentity`. |
| Initial 50 produced mostly excludes/manuals | DONE | An honest `EXCLUDE` is a first-class outcome, not a failure. Test: `tiers.test.ts` "excludes a business that already has a strong site". |
| Tier 2 confident includes import immediately | DONE | `tier2MayImportImmediately`, gated on the profile flag. Test: `tiers.test.ts` "lets a confident TIER_2 INCLUDE import when the profile allows it". |
| Always try 2–3 targeted searches | PARTIAL | `ResearchLimits` on the profile carries `maxTargetedSearchesPerContact` and `reservedFinalAttempts`, and `attempts_made` is persisted. The orchestrator currently makes one identity attempt; the escalation ladder to two or three targeted searches is **not built**. |
| `NO_WEBSITE` is positive evidence | DONE | `classifyWebsite` returns HIGH confidence with a usable observation. Test: `tiers.test.ts` "treats a missing site as positive evidence". |
| Human-readable Tier 2 mirror | PARTIAL | `tier2QueueToMarkdown` and `tier2QueueToJsonl` generate both views from one table. Test: "produces the JSONL and Markdown views from one source of truth". No dashboard page renders it yet. |
| Source list already filtered to 2026 | DONE | `UpstreamFilterEvidence` on `NEW_BUSINESSES_PROFILE`, with recorded provenance. Test: `tiers.test.ts` "carries recorded provenance for the 2026 upstream prefilter" and "gives no launch hypothesis to a profile with no recorded upstream filter". |
| Thirteen prior exclusions were re-researched after rule discovery | PARTIAL | Profiles are versioned and `tier_decisions` stores `policy_version`, so affected rows are identifiable by query. A scoped replay command is **not built**. |
| Imported custom fields verified as real text | DONE | `verifyRenderedFields` + `recordFieldVerification`. Test: "records the post-import field verification". |
| Pagination overlap found after three days | DONE | Permanent contract fixture: `FakeLemlistClient.pageOverlap` reproduces it, and `pagination.test.ts` asserts the contract directly. |
| AI-sounding compound openers | DONE | `COMPOUND_OPENER_PATTERNS` and `GENERIC_COMPLIMENT_PATTERNS`; the specification's own Avoid/Prefer table is the test. Test: `messages.test.ts` "rejects the compound gerund opener". |
| Message should entice a yes around their problem | DONE | `askViolations` requires an actual ask; observations must trace to recorded evidence. Test: "requires the first message to actually ask something". |
| Legitimate reasons remain manual | DONE | Six mandatory manual-review conditions in `mandatoryManualReviewReasons`, none of which can be outvoted. |
| Classifier blocked import twice | DONE | `describePolicyBlock` returns `maySubstituteOperation: false`. Tests: `import-intent.test.ts` "surfaces the block and never offers a substitute operation" and the integration test of the same behavior. |
| Import happened before persistence | DONE | `createImportIntent` is the only source of the id the provider call requires. Test: "writes the intent before the provider is ever called" and "records a rejected intent and calls nobody when the gate is closed". |
| Word counts were ad hoc | DONE | `countWords` (Unicode-aware) via `validateEnrichmentMessages`, stored on every version row. |
| Old imported drafts predate style fix | DONE | `enrichment_message_versions` stores `policy_version` and `prompt_version` per version, so affected live drafts are a query. No UI surfaces it yet. |

## 34.3 `prototype-pipeline-retrospective-2026-08-12.md`

| Historical lesson | Status | Implementation |
| --- | --- | --- |
| Netlify authenticated but unavailable to working chat | DONE | Three-axis capability state. Test: `capabilities.test.ts` "Netlify fixture: authenticated but not enabled for the runtime is not usable". |
| Handoff file enabled another session | DONE | `run_envelopes`, `enrichment_runs`, `artifact_bundles` replace chat-only handoff. Test: `unified.integration.test.ts` run-envelope cases. |
| Wrong Voortman/Baumhauer premise | DONE | `checkIdentityPremise` requires two independent corroborating sources and a stated reason for every rejected candidate. Test: `qa-gates.test.ts` "the Voortman premise regression" (3 cases). |
| Spec was rebuilt into stages/gates | DONE | `PROTOTYPE_RESEARCHING` / `PROTOTYPE_STRATEGIZING` / `PROTOTYPE_BUILDING` / `PROTOTYPE_DEPLOYING` are distinct states, each with its own gate. `packages/core/src/state/machine.ts`. |
| Real client evidence before design | PARTIAL | `checkPreDesignGate` blocks visual implementation until the evidence pack exists. Test: `deliverable.test.ts`. The stage that *gathers* the evidence is **not built**. |
| Contact sheets were visually inspected | NOT BUILT | `asset_manifests` exists in the schema. No asset review artifact is produced. |
| Render at 1440 and 390 caught bugs | PARTIAL | Existing visual QA renders desktop and mobile and fails closed. The 1024 breakpoint is **not** covered. |
| Files needed cross-session portability | PARTIAL | `artifact_bundles` and `asset_manifests` tables exist. No private bucket is provisioned. |
| Deployment verified by byte size/title | DONE | `verifyLoggedOutDeployment` checks anonymity, HTTPS, status, access wall, title identity and bundle hash. Test: `qa-gates.test.ts` "logged-out deployment verification" (6 cases). |
| Thread re-read before sending | DONE | Pre-existing: `preSendCheck` re-derives from the actual conversation and the approval binds the latest inbound message id. |
| Dash scan before message | DONE | Deterministic validators on both the reply path and the enrichment path. |
| Correct collaboration credits / no fabricated logos | NOT BUILT | `evidence_claims` table exists. No ownership or factual-integrity gate runs against it. |
| Per-lead tone from real thread | DONE | Pre-existing: `buildModelContext` carries the real turns and rapport signals. |
| Google Fonts blocked, fallbacks masked typography | DONE | `checkTypography` fails a blocked webfont rather than accepting the fallback. Test: `qa-gates.test.ts` "the blocked Google Fonts regression" (3 cases). |
| `[hidden]` bug repeated twice | DONE | `checkHiddenElements` tests the *computed* style, because the attribute is what lied. Test: "the [hidden] regression that shipped twice" (2 cases). |
| H264 reels could not be decoded | DONE | `checkMediaPlayback` fails an undecodable medium instead of passing it silently. Test: "fails an H264 medium the harness could not decode". |
| `.gitignore` stranded files, later forced commit | PARTIAL | Schema supports a private artifact store. Generated heavy files remain out of app Git, but no bucket is wired. |
| Repeated Netlify blocker loop | DONE | Capability state plus the existing circuit breaker; a blocked operation halts its branch without declaring the system healthy. |
| Hard gate based on second-hand Alan fact | DONE | `checkImageIntegrity` re-verifies live, and the mixed-content case is a test rather than a remembered claim. |
| Messages sent before showing | DONE | Pre-existing and structural: a prototype URL only leaves through an operator approving one exact message version. |
| 7 MB base64 used partly for convenience | DONE | `checkPayloadBudget`. Test: "fails the 7.37M character single-file bundle". |
| No-swap was only conceptual | NOT BUILT | No logo-removed comparison artifact is produced. |

## 34.4 `prototype-hosting-lessons.md`

| Historical lesson | Status | Implementation |
| --- | --- | --- |
| Files were on sibling branch, initially declared missing | PARTIAL | The sibling-branch location (`claude/workflow-docs-update-cxm8ih` at `7e2bd41`) is recorded in the reality report. The legacy migration search is **not built**. |
| Signed token corrupted by transcription | DONE | Credentials are read from config and encrypted at rest; nothing is retyped. Pre-existing `packages/db/src/crypto.ts`. |
| Existing sites not listed | NOT BUILT | Idempotent list-before-create against Netlify is not implemented. The three historical sites are unreconciled. |
| Whole repository uploaded with lead data | PARTIAL | The prototype builder uploads a file list, not a repository. `asset_manifests` supports a secret scan; the scan is **not built**. |
| `requiresSSOTeamLogin` visible but ignored | DONE | `ssoOrPasswordWallDetected` is a hard failure. Test: "fails the Netlify SSO wall that a logged-in view hid". |
| Account-wide toggle only changed one site | DONE | Verification is per site and per URL; `prototype_deployments.sso_disabled_verified` records it per row. |
| Wrong Netlify coding context (`blobs`) | PARTIAL | The capability registry records operation-level context. No documentation router exists. |
| Deployment state row omitted | DONE | `prototype_deployments` gains `artifact_bundle_id`, `sso_disabled_verified`, `logged_out_status`; the deployer owns the row transactionally. |
| Unauthenticated curl caught 401 | DONE | `verifyLoggedOutDeployment` treats a credentialed check as no check at all. Test: "refuses to count a credentialed request as verification". |
| HTTPS/title verified | DONE | Both are hard gates. Tests in the same block. |
| API proxy transient 502 | DONE | Pre-existing bounded retry with backoff and jitter in `packages/integrations/src/http.ts`. |
| Site names must identify company prototype | PARTIAL | Existing slugify produces `astra-<company>-prototype`. No angle-collision policy. |
| Named public URLs expose pitch and mock brand | PARTIAL | `noindex`, `robots.txt` and the disclosure line are enforced by existing static QA. Expiry and archive options are **not built**. |

## 34.5 `Astra_Prototype_Design_Audit.md`

| Historical lesson | Status | Implementation |
| --- | --- | --- |
| Strategically smart but under-authored | PARTIAL | `requiredArtifactsFor` demands the evidence pack and governing concept before implementation. No evaluation of their quality. |
| Same visual recipe across three industries | NOT BUILT | No cross-project collision gate. |
| Astra hand-built sites each express subject | NOT BUILT | Reference doctrine is not implemented. |
| Alan HTTP hero mixed-content failure | DONE | `checkImageIntegrity` with `pageIsHttps`. Test: "fails an HTTP asset requested from an HTTPS page". |
| Rosalie stock did not represent actual work | NOT BUILT | `evidence_claims` exists; no provenance requirement is enforced. |
| Animation site had no media | DONE | `checkMediaPlayback` fails a state that was never exercised. Test: "fails a state the harness never actually exercised". |
| Point Audit used generic stock / invented dashboard | NOT BUILT | No illustrative-content labelling gate. |
| Prototype talked like an agency audit | DONE | `checkCompletenessLanguage` separates the client-facing artifact from Astra's rationale by mode. Test: `deliverable.test.ts`. |
| Copy compensated for weak proof | PARTIAL | `PROOF_LADDER` is a required artifact for the richer modes. Its content is not evaluated. |
| Fixed hero/problem/tool/proof/CTA format | PARTIAL | `NARRATIVE_STORYBOARD` is required. Its business-specific derivation is not enforced. |
| Interaction added by habit | NOT BUILT | No interaction-purpose gate. |
| References teach principles, not copying | PARTIAL | `CATEGORY_TRIANGULATION` is a required artifact; no anti-copying check. |
| First rubric 88/100 superseded by expanded 90/100 | PARTIAL | The expanded rubric's hard failures exist as deterministic gates. The weighted 90/100 score is **not** computed. |

## 34.6 `Claude_Update_Astra_Prototype_MD_Prompt.md` (changes 1–14)

| # | Requirement | Status | Implementation |
| ---: | --- | --- | --- |
| 1 | Brand Evidence Pack | PARTIAL | Required artifact (`BRAND_EVIDENCE_PACK`); producer not built. |
| 2 | Category triangulation | PARTIAL | Required artifact; producer not built. |
| 3 | Governing concept | PARTIAL | Required artifact, mandatory in every mode. |
| 4 | Imagery first-class | PARTIAL | `IMAGERY_STORYBOARD` required; crop and integrity gates DONE. |
| 5 | Typography by evidence | DONE (gate) | `checkTypography`; evidence-driven selection not built. |
| 6 | Narrative storyboard | PARTIAL | Required artifact; producer not built. |
| 7 | Prototype separate from critique | DONE | `checkCompletenessLanguage` per deliverable mode. |
| 8 | Factual integrity | PARTIAL | `checkIdentityPremise` DONE; broader claim provenance not built. |
| 9 | Anti-AI blacklist | DONE | Enrichment message validators; prototype copy blacklist not built. |
| 10 | Collision and no-swap | NOT BUILT | — |
| 11 | Category proof | NOT BUILT | — |
| 12 | Technical art-direction QA | DONE | `packages/core/src/prototype/qa-gates.ts`, 26 tests. |
| 13 | Weighted review / hard gates | PARTIAL | Hard gates DONE; weighted score not built. |
| 14 | Final rationale | PARTIAL | Coverage ledger DONE; rationale document not built. |

Preserved examples (photography cannot use unrelated stock; animation requires
work and motion; Point Audit cannot substitute fictional proof; Canva, BUCK,
Giant Ant and Animade are principles rather than templates; asset provenance is
recorded) are retained in this register and in the test comments. Only the
motion requirement is enforced in code today.

## 34.7 `Astra_Prototype_Framework_Addendum_Round_2 2.md` (additions 15–32)

| # | Requirement | Status | Implementation |
| ---: | --- | --- | --- |
| 15 | Deliverable mode | DONE | `selectDeliverableMode`; `CONCEPT_SLICE` only via explicit choice. |
| 16 | Site Completeness Contract | PARTIAL | Required artifact; content not evaluated. |
| 17 | Model business first | PARTIAL | `BUSINESS_SYSTEM_MODEL` required in full modes. |
| 18 | Role × Journey × Evidence | PARTIAL | `ROLE_JOURNEY_EVIDENCE_MATRIX` required in full modes. |
| 19 | End-to-end workflow | NOT BUILT | — |
| 20 | Human presence | PARTIAL | `HUMAN_TRUST_PLAN` required from landing-page mode up. |
| 21 | Imagery storyboard / shot list | PARTIAL | Required artifact; producer not built. |
| 22 | Image scoring | NOT BUILT | — |
| 23 | Quality / crop gates | DONE | `checkCropSafety` + `checkImageIntegrity`. Test: the 1920×1080→579×720 fixture. |
| 24 | Case-study depth | NOT BUILT | — |
| 25 | Proof Ladder | PARTIAL | Required artifact; content not evaluated. |
| 26 | Conversion journey | NOT BUILT | — |
| 27 | Designed ending | NOT BUILT | — |
| 28 | State-complete interaction | PARTIAL | Media states are individually exercised; other interactive states are not. |
| 29 | Media playback | DONE | `checkMediaPlayback`, 4 tests. |
| 30 | No all-assets-in-one-HTML default | DONE | `checkPayloadBudget`; inline base64 warns, oversized files fail. |
| 31 | Responsive art direction | PARTIAL | Desktop and mobile render; 1024 not covered. |
| 32 | Coverage Ledger | DONE | `summarizeCoverage`; a silent drop fails. Test: `deliverable.test.ts` "fails a silent drop". |

The second-round diagnosis is preserved as regression material, not as content
to show a prospect: Rosalie lacked the person and the full relationship; Point
Audit reduced a multi-role operating loop to one finding and shipped blank
claimed-real screens; That Animation Company lacked case depth, people,
structured briefing and safe crops. Embedded payloads were approximately 1.62M,
0.48M and 7.37M characters, and the last of those is the fixture in
`qa-gates.test.ts`.

## 34.8 Historical facts retained as fixtures

| Fixture | Status | Where |
| --- | --- | --- |
| 1,099 source contacts; 25 dispatched; WebFetch block rediscovered by five workers twice; ~370–380k wasted tokens | DONE | `retrospective.test.ts` "records the wasted-work cost of the second round" uses the 370,000 figure and the `WEBFETCH_BLOCKED_BEFORE_FANOUT` signature. |
| First run: 50 processed, 1 include, 7 manual review, 42 excludes, 0 Tier 1 | DONE | An honest low-inclusion outcome is allowed; `tiers.test.ts` "honest no-fit outcomes". |
| 13 recency-based exclusions replayed; TRIXEA, Studio Piero, La Maison du Detailing became `NO_WEBSITE` includes | PARTIAL | Versioned policy identifies affected rows; scoped replay not built. TRIXEA and Studio Piero appear as test fixtures. |
| Jamie H. / Revive Auto Repairs, first Tier 1 import, field-render verification | DONE | Redacted provider-contract fixture in `unified.integration.test.ts` (`Revive Auto Repairs`). |
| BEKLOG identity mismatch; MM Collectives unverifiable purpose | DONE | Both distinctions preserved as named tests in `tiers.test.ts` and `enrichment.integration.test.ts`. |
| Three deliberately different evidence-driven prototype worlds as collision baselines | PARTIAL | Recorded here and in the reality report. No collision gate consumes them. |
| Lumiform and SafetyCulture as evidence inputs to re-check | PROCESS | Recorded as inputs to re-verify, never as layouts to clone or as permanent claims. No code consumes them. |
| Historical site names `astra-rosalie-voortman-prototype`, `astra-point-audit-prototype`, `astra-that-animation-company-prototype` | NOT BUILT | Recorded in the reality report as requiring reconciliation before any replacement. Reconciliation not performed. |
| Legacy artifacts at `claude/workflow-docs-update-cxm8ih` commit `7e2bd41` | DONE (as record) | Recorded in the reality report, explicitly as a one-time migration concern rather than the ongoing architecture. |
| Deployed desktop audit scores 55 / 57 / 55 under the expanded rubric | PROCESS | Retained here as dated evidence that a strong concept slice can be commercially incomplete. Not treated as current quality scores. |
| 12 August element counts (Rosalie 15 images + 4 videos; Carianne Older 43 images; Ordinary Folk 9 images + 10 videos) | PROCESS | Retained here as dated historical evidence only. Deliberately **not** hardcoded anywhere, and not claimed to remain current. |
| 1920×1080 stills displayed ~579×720 with `object-fit: cover` | DONE | `checkCropSafety`; the exact numbers are the test case. |
| One 2D reel ready while alternate 2D/3D states stayed at `readyState 0` | DONE | `checkMediaPlayback`; the exact scenario is the test case. |
| Alan live-site HTTP-from-HTTPS hero request | DONE (anonymized) | `checkImageIntegrity` mixed-content test uses an anonymized URL. The live URL is not re-asserted as current. |

---

## Summary of unaddressed rows

The specification says the project may not be called complete with an
unaddressed row. These are the rows that are **NOT BUILT**, gathered so nobody
has to scan for them:

1. Contact sheet / asset review artifact (34.3)
2. Collaboration credits and factual-integrity gate (34.3)
3. No-swap comparison artifact (34.3)
4. Idempotent Netlify list-before-create, and reconciliation of the three
   historical sites (34.4, 34.8)
5. Cross-project visual collision gate (34.5, 34.6 #10)
6. Reference doctrine (34.5)
7. Real-work provenance requirement for imagery (34.5)
8. Illustrative-content labelling (34.5)
9. Interaction-purpose gate (34.5)
10. End-to-end workflow completeness (34.7 #19)
11. Image scoring (34.7 #22)
12. Case-study depth (34.7 #24)
13. Conversion journey and designed ending (34.7 #26, #27)
14. Category proof (34.6 #11)

All fourteen belong to the Prototype Studio's research, strategy and
art-direction stages, which the reality report lists as the largest unbuilt
area. The gates that would judge their output exist and are tested; the stages
that produce the artifacts do not.

**This project is therefore not complete against the specification, and this
register is the evidence for that statement rather than a claim to the
contrary.**
