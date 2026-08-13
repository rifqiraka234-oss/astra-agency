# Astra × Lemlist autonomous reply agent

A guarded sales workflow. Lemlist webhooks come in, a deterministic controller
decides what may happen, and Claude analyzes and drafts inside limits the
controller sets. Claude recommends; the controller decides. Nothing in this
system treats a model's requested action as permission.

This lives alongside the existing enrichment pipeline in the same repository.
The two share nothing: the enrichment pipeline keeps its `state/`, `logs/` and
`docs/enrichment-pipeline-spec.md`, and this app keeps `packages/`, `apps/`
and `docs/reply-agent/`.

- [Architecture](#architecture)
- [Local setup](#local-setup)
- [Runtime modes and safety flags](#runtime-modes-and-safety-flags)
- [Commands](#commands)
- [Deployment](#deployment)
- [Further documentation](#further-documentation)

## Architecture

```
packages/core           deterministic domain model, no I/O of any kind
packages/db             Postgres schema, migrations, typed repositories
packages/integrations   Lemlist, Anthropic, Netlify, calendar, research, email
packages/prompts        versioned runtime prompts
apps/worker             webhook receiver + job loop
apps/dashboard          private operator dashboard (Next.js)
```

`packages/core` has no network or database access at all. Everything that
decides whether something may happen lives there, which is why the policy
engine, the state machine, the slot generator and the content checks are
testable without a running anything.

See [`diagrams.md`](./diagrams.md) for the data flow and state machine.

## Local setup

Requirements: Node 22+, Docker (for Postgres), and nothing else.

```bash
cp .env.example .env

# Two secrets are required before anything runs.
echo "ENCRYPTION_KEY=$(openssl rand -base64 32)" >> .env
echo "SESSION_SECRET=$(openssl rand -base64 32)" >> .env

# The dashboard password. Read from stdin, never from argv.
npm run dashboard:hash-password        # paste the OPERATOR_PASSWORD_HASH line into .env

npm install
npm run dev                            # Postgres, migrations, seed, worker, dashboard
```

`npm run dev` brings up Postgres, applies migrations, seeds obviously-fake
fixtures, and starts the worker on :3001 and the dashboard on :3000. Every
live-action flag is false and the kill switch is on, so a fresh checkout
cannot reach a real prospect.

### Seeing it with realistic content

`npm run db:demo` runs the *real* pipeline against in-memory integrations and
leaves four conversations in the database: one drafted for approval, one
pricing question handed off, one referencing a call the system cannot see,
and one simple acknowledgement. Nothing there can reach a prospect, and every
predicate log the dashboard shows was genuinely produced by the controller.

```bash
npm run db:demo
# then open http://localhost:3000/queue
```

### Exercising it without credentials

`RUNTIME_MODE=TEST` wires the in-memory twin of every integration. You can
post a fixture webhook and watch the whole flow land in the dashboard:

```bash
curl -X POST http://localhost:3001/webhooks/lemlist \
  -H 'content-type: application/json' \
  --data @docs/reply-agent/fixtures/linkedin-invite-accepted.json
```

Then open <http://localhost:3000/queue>.

## Runtime modes and safety flags

Mode and flags are additive. An automatic send needs the mode *and* the flag,
never either alone.

| Mode | Reads | Drafts and approvals | Sends |
| --- | --- | --- | --- |
| `TEST` | fixtures only | no | no |
| `SHADOW` | live | no | no |
| `DRAFT_ONLY` | live | yes | no |
| `LOW_RISK_AUTO` | live | yes | allowlisted low-risk cases only |
| `HUMAN_ONLY` | live | no AI generation unless requested from the UI | no |

| Flag | Default | Gates |
| --- | --- | --- |
| `GLOBAL_KILL_SWITCH` | `true` | every external write, immediately |
| `ALLOW_LIVE_LEMLIST_SEND` | `false` | sending a message |
| `ALLOW_LIVE_CAMPAIGN_IMPORT` | `false` | importing enrichment leads into a campaign |
| `ALLOW_LIVE_CALENDAR_WRITE` | `false` | creating a calendar event |
| `ALLOW_LIVE_NETLIFY_DEPLOY` | `false` | deploying a prototype |
| `ALLOW_LIVE_WEBHOOK_REGISTRATION` | `false` | registering webhooks |

**There is no flag that permits automatic delivery of a prototype link.** That
is deliberate and it is not a configuration oversight: a prototype URL only
ever leaves this system through an authenticated operator approving one exact
version of one exact message.

The seven allowlisted low-risk cases, their word caps, and every predicate
that gates them are in [`policy.md`](./policy.md).

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | full local stack |
| `npm run db:migrate` | apply migrations |
| `npm run db:seed` | seed local fixtures |
| `npm test` | everything; database tests skip if no database |
| `npm run test:unit` | unit tests only |
| `npm run test:integration` | integration tests (needs `DATABASE_URL`) |
| `npm run typecheck` | `tsc -b` across the workspace |
| `npm run lint` | eslint |
| `npm run build` | build every workspace |
| `npm run check` | lint, typecheck and test |
| `npm run dashboard:hash-password` | generate `OPERATOR_PASSWORD_HASH` |

Integration tests need a database and **report a skip, not a pass**, when they
cannot reach one:

```bash
DATABASE_URL=postgres://astra:astra@localhost:5432/astra_reply_agent_test npm run test:integration
```

## Deployment

The worker must run on a normal long-running host (Railway, Render, Fly). It
holds queue leases and runs prototype builds that take minutes; an ephemeral
serverless function will kill one halfway through.

```bash
docker build -f Dockerfile.worker -t astra-worker .
```

The image includes Chromium for prototype visual QA. If Playwright is missing
at runtime, visual QA **fails** rather than skipping, so a prototype cannot be
deployed unverified.

The dashboard is an ordinary Next.js app (`npm run build --workspace @astra/dashboard`).

### Rollback

Migrations are additive and are recorded in `schema_migrations`. To roll back a
deploy, deploy the previous image; the schema stays compatible. To stop the
system immediately without deploying anything, set `GLOBAL_KILL_SWITCH=true`
and restart, or use the kill switch procedure in the
[runbook](./runbook.md#kill-switch).

## Further documentation

- [`policy.md`](./policy.md) — the low-risk allowlist and every predicate
- [`api-notes.md`](./api-notes.md) — provider schemas, with verification dates
- [`diagrams.md`](./diagrams.md) — data flow and state machine
- [`threat-model.md`](./threat-model.md)
- [`runbook.md`](./runbook.md) — approvals, handoffs, errors, kill switch
- [`versioning.md`](./versioning.md) — prompt and policy versioning
- [`status.md`](./status.md) — implementation status, deferred and blocked items
- [`../unified/reality-report.md`](../unified/reality-report.md) — what is built against the unified specification, and what is not
- [`../unified/traceability.md`](../unified/traceability.md) — every historical lesson, with its implementation and test
