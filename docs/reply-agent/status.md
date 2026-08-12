# Implementation status

As of 2026-08-12. Verified with `npm run lint`, `npm run typecheck`,
`npm test` (285 passing) and `npm run build`, plus a live smoke test of the
worker against Postgres.

## Complete

| Area | Notes |
| --- | --- |
| Runtime modes and safety flags | five modes, five flags, kill switch, all defaulting closed |
| External write guard | every adapter write passes through one choke point |
| Webhook ingestion | HTTPS, size limit, constant-time secret, team check, idempotent insert, debounce that extends rather than duplicates |
| Conversation normalization | pagination, ordering, dedupe, sanitization, quoted-history stripping, turn grouping, attachment retention, uncertain-direction marking |
| Model context assembly | full conversation by default; truncation preserves first outreach, last 12 turns and every promise/question/objection/meeting turn, and permanently removes auto-send eligibility |
| Sequence collision prevention | step classification, branch-resolution detection, pause-then-verify, manual task blocking |
| State machine | 21 states, validated transitions, illegal transitions throw and are audited |
| Policy engine | deny-by-default, 7 allowlisted cases, full predicate log on every decision |
| Pre-send gate | re-derives everything from the exact text about to be sent, including on approved sends |
| Content checks | word caps, placeholders, URLs, duplicates, guarantees, urgency, social proof, pricing, style, unsupported claims |
| Approvals | bound to reply hash, conversation hash, inbound message id, prototype version, policy and prompt version; staleness enforced in three places |
| Calendar | DST-safe slot generation, recurring exclusions, buffers, notice, blackouts, internal reservations with a database exclusion constraint, freshness gate, recheck before booking |
| Prototype | build, static QA, visual QA, Netlify deploy with honest naming, approval binding |
| Database | 28 tables, idempotency and uniqueness constraints, advisory locking, AES-256-GCM credential encryption |
| Observability | structured logs with central redaction, Prometheus metrics, health/readiness, backoff, circuit breaker, dead letters, graceful shutdown |
| Dashboard | queue, conversation detail with predicate log, approvals, prototype preview, contact controls, settings, rollout checklist, errors, audit export |
| Dashboard security | scrypt password, signed HttpOnly sessions, allowlist re-checked per request, CSRF + Origin, login throttle, CSP, path-confined screenshot endpoint |
| Calendar connection | delegated OAuth for both providers with a signed `state`, refresh tokens encrypted at rest, resolved on every refresh so a reconnect needs no restart, connect/reconnect/disconnect from Settings |
| Retention | raw webhook payloads, conversation content and suppressed-contact content age out on separate configurable schedules; decisions, predicates and hashes are kept |
| Prompts | seven versioned prompts with shared untrusted-data and voice rules |
| Documentation | README, policy, API notes with verification dates, diagrams, threat model, runbook, versioning guide, fixtures |

## Intentionally deferred

| Item | Why, and what happens instead |
| --- | --- |
| Concept brief store | `hasStoredConceptBrief` is always false, so any message claiming completed work ("we sketched…") is downgraded to a draft rather than sent. Safe default; the store is the next thing to build if that message should ever auto-send. |
| Separate drafting model call | Analysis and drafting share one call. The prompt for a separate drafting pass exists and is versioned; splitting it is a refactor, not new safety surface. |
| Playwright browser in CI | Visual QA fails closed when Playwright is absent, so a prototype cannot deploy unverified. The worker image installs Chromium. |
| pg-boss | The durable queue is implemented directly on Postgres with `FOR UPDATE SKIP LOCKED` and a partial unique index. Adding pg-boss would replace working code with a dependency. |
| Dashboard E2E tests | Auth, session, CSRF and password logic are unit tested in `packages/core/src/auth/session.test.ts`. Browser-driven tests of the pages are not written. |
| Login throttle in the database | In-process, so per-instance. Documented in the threat model; fine for one operator on one instance. |

## Blocked on credentials

None of these block the build; all are marked and left with their live flags
false.

| Item | What is needed |
| --- | --- |
| Live Lemlist verification | `LEMLIST_API_KEY`, a real `EXPECTED_LEMLIST_TEAM_ID`, and one webhook registered against a deployed URL |
| Live Anthropic calls | `ANTHROPIC_API_KEY` |
| Live Netlify deploys | `NETLIFY_ACCESS_TOKEN`, `NETLIFY_TEAM_SLUG` |
| Live calendar | one of Microsoft or Google configured, then click Connect in Settings once |
| Notification email | `RESEND_API_KEY` and a verified sender, or leave `EMAIL_PROVIDER=console` |

## Safety limitations worth stating plainly

- The webhook secret authenticates the sender, not the payload, because
  Lemlist sends it in the body rather than as a signature. Everything is
  refetched from the API before it is acted on, which makes this survivable
  rather than fine.
- A model could be wrong in a way every deterministic check accepts. The caps
  exist for that case: 65 words, three automated messages per conversation, a
  human after eight turns.
- Attachments are never parsed. Their presence blocks automation, so a
  conversation with an attachment always needs a human.
- Prompt injection can change what Claude recommends. It cannot change the
  allowlist, the kill switch, the word caps, the URL rules or ownership,
  because the controller recomputes those from stored facts.
- Nothing here has yet run against a live prospect. Every live-action flag is
  false and the kill switch is on.
