# Repository reality report

*Required first deliverable of the unified specification (section 36). This
maps what actually exists in this repository against what the specification
asks for, as of the current branch head. It is a status document, not a plan:
where something is not built, it says so plainly rather than describing an
intention.*

Verified by running `npm run lint`, `npm run typecheck` and the full test suite
against a live Postgres. Counts in this document come from those runs, not from
memory.

## What this repository contains

Three separate things share the repository, and only the first two are code:

| Thing | Location | Status |
| --- | --- | --- |
| The enrichment pipeline's operating procedure | `CLAUDE.md`, `docs/enrichment-pipeline-spec.md`, `state/`, `logs/` | Pre-existing, untouched by this work |
| The reply agent and unified engines | `packages/`, `apps/`, `docs/reply-agent/`, `docs/unified/` | Built here |
| Historical session records | Sibling branches, extracted and cited below | Read-only evidence |

The enrichment pipeline's files were deliberately left alone. Its `CLAUDE.md`
is the canonical record of the live Tier formula, and the code now reproduces
that formula rather than replacing it.

## The four engines

| Engine | Specification | State | Where |
| --- | --- | --- | --- |
| Campaign Intake and Enrichment | §7 | **Built and tested end to end** | `packages/core/src/enrichment/`, `apps/worker/src/enrichment/` |
| Conversation Agent | §8–15 | **Built and tested end to end** (predates this work) | `packages/core/src/{policy,conversation,ownership,state,calendar}/`, `apps/worker/src/pipeline/` |
| Prototype Studio | §16–24 | **Partially built.** Deliverable modes, the pre-design artifact gate, the coverage ledger and every named QA regression gate exist and are tested. The research, strategy and art-direction stages that produce those artifacts are not implemented. | `packages/core/src/prototype/`, `apps/worker/src/pipeline/prototype*.ts` |
| Learning and Improvement | §25 | **Kernel and read-only UI built.** Lesson schema, lifecycle, authority classes, promotion guards, retrospectives and candidate comparison exist with tests, and `/improvement` shows candidates, repeated signatures and rejected lessons. The approve/reject actions themselves are not wired. | `packages/core/src/learning/`, `packages/db/src/learning-repositories.ts`, `apps/dashboard/src/app/improvement/` |

## Shared foundation (§6)

| Requirement | State |
| --- | --- |
| Durable run envelope | Built. `packages/core/src/run/envelope.ts` + `run_envelopes` table. Status is derived, so a run with errors or unreconciled writes cannot report `COMPLETED`, and only `RUNNING`/`INTERRUPTED` runs are resumable. |
| Requested / allowed / completed write counters | Built and stored as three separate columns. A run that wanted ten writes under a closed gate reports zero allowed and is still a clean run. |
| Provider capability registry | Built. Three independent axes (auth, runtime enablement, reachability), because the three historical failures were three different things. |
| Preflight before fan-out | Built and enforced. The enrichment run halts if any required adapter is unusable or simply unregistered. |
| Bounded retries, backoff, circuit breaker, rate limits | Built (`packages/integrations/src/http.ts`), predates this work. |
| Advisory locks, `FOR UPDATE SKIP LOCKED` job claiming | Built (`packages/db/src/client.ts`), predates this work. |
| Dead letters, structured redacted logs, metrics, health endpoints | Built, predates this work. |

## Safety posture, as actually configured

Every live-action flag defaults `false` and the kill switch defaults `true`.
Verified by reading `packages/core/src/config/env.ts` and by the guard tests.

| Gate | Default | What it controls |
| --- | --- | --- |
| `GLOBAL_KILL_SWITCH` | `true` | Every external write, immediately |
| `ALLOW_LIVE_LEMLIST_SEND` | `false` | Sending a message |
| `ALLOW_LIVE_CAMPAIGN_IMPORT` | `false` | Importing enrichment leads into a campaign |
| `ALLOW_LIVE_CALENDAR_WRITE` | `false` | Creating a calendar event |
| `ALLOW_LIVE_NETLIFY_DEPLOY` | `false` | Deploying a prototype |
| `ALLOW_LIVE_WEBHOOK_REGISTRATION` | `false` | Registering webhooks |

There is still no flag, and no code path, that permits automatic delivery of a
prototype link. That remains structural rather than configured.

`ALLOW_LIVE_CAMPAIGN_IMPORT` is new and deliberately separate from the send
flag: importing into a draft campaign queues leads without sending anything, so
it is a different risk and gets a different switch.

## Database

`0001_init.sql` (28 tables) plus `0002_unified_agent.sql` (37 tables) = 67
tables. Both migrations are additive and apply cleanly from empty, and
re-running is a no-op. No migration drops or rewrites an existing column, so a
rollback to the previous image leaves the schema compatible.

Three modelling corrections were made while building against the schema, each
because a test failed rather than because it looked wrong on paper:

- `run_envelopes.status` originally used a vocabulary that did not match
  `RUN_STATUSES` in core. Aligned, including `INTERRUPTED`, which is the only
  non-running status a resume may touch.
- `campaign_import_intents.status` was missing `ALLOWED` and `IN_FLIGHT`. Without
  them a crashed process left no evidence of whether the provider was ever
  actually called.
- `lesson_candidates` conflated authority class with risk class in one column.
  They answer different questions: a low-risk change can still be Class D
  because it touches a safety gate. Now two columns.

## Historical evidence reviewed

All eight branches on the remote were read, and every retrospective, run log and
specification document on them was extracted. The material findings:

**The Tier formula was found, so §7.5's "stop and ask Raka" does not apply.**
`CLAUDE.md` records it as live operating procedure:

- Tier 1: `campaignEligibility = INCLUDE` **and** `businessLaunchStatus =
  QUALIFIED` **and** `businessLaunchConfidence ∈ {HIGH, MEDIUM}` **and**
  `websiteAnalysisConfidence = HIGH`
- Tier 2: `DO_NOT_USE`, `MANUAL_REVIEW`, or LOW website confidence
- `EXCLUDE`: recorded, never imported

It is reproduced verbatim in `packages/core/src/enrichment/tiers.ts` with the
formula quoted in the file header, so a future reader can check the code against
the source rather than trusting it.

**Fixtures preserved as regression cases, not as current facts.** The BEKLOG
identity mismatch, the MM Collectives unverifiable purpose, the overlapping
pagination windows, the `[hidden]` bug that shipped twice, the Voortman premise
error, the 1920×1080-into-579×720 crop, the reel that stayed at `readyState 0`,
the blocked Google Fonts, the 7.37M-character payload, and the Netlify SSO wall
all have deterministic tests. Names and numbers are cited in test comments as
dated historical evidence, never as claims about the present.

**Legacy artifacts.** Prototype HTML and the 45KB prototype build spec live on
branch `claude/workflow-docs-update-cxm8ih` at commit `7e2bd41`. This is
relevant only to a one-time migration and is not the ongoing artifact
architecture. The three historical Netlify sites
(`astra-rosalie-voortman-prototype`, `astra-point-audit-prototype`,
`astra-that-animation-company-prototype`) must be discovered and reconciled
before any replacement is created; that reconciliation has **not** been done.

## What is not built

Stated plainly, because the specification forbids claiming completeness:

1. **Prototype research, strategy and art-direction stages** (§17–22). The gates
   that would judge their output exist and are tested; the stages that produce
   the artifacts do not.
2. **Improvement Center actions** (§25.9). The review screen exists and is
   read-only. Approve for staging, Approve for production, Need more evidence,
   Reject and Roll back are not wired to the promotion guard yet, so promotion
   is currently only reachable from code.
3. **Operator product shell and setup wizard** (§5). The dashboard has login,
   queue, conversation detail, settings and audit export. There is no first-admin
   claim flow or guided setup.
4. **Railway deployment, private bucket, staging/production release flow**
   (§4, §31). Not provisioned. No Railway project exists.
5. **Eval registry population** (§25.7). The comparison machinery is built and
   tested; no suites have been populated with real redacted cases.
6. **Legacy Netlify site reconciliation** and migration of the historical
   `tier2_queue.jsonl` rows into the new queue table.

## Verification

| Check | Result |
| --- | --- |
| `npx eslint .` | Clean |
| `npm run typecheck` | Clean |
| Full test suite | 463 passing, 30 files |
| Dashboard build | Clean; 14 routes |
| `/enrichment` and `/improvement` | Driven with Playwright against seeded data; both render real rows |
| Integration tests against live Postgres | 32 of those 463; they **skip**, never pass vacuously, without a database |
| Migrations from empty | Both apply; re-running is a no-op |
