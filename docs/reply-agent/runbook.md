# Operator runbook

For Raka. Everything here assumes you are signed in at the dashboard.

## Kill switch

**When anything looks wrong, do this first and diagnose afterwards.**

```bash
# In the worker's environment
GLOBAL_KILL_SWITCH=true
# then restart the worker
```

Effect is immediate on restart: every external write is refused at the guard,
whatever the mode says. The banner at the top of every dashboard page turns
green and reads "Kill switch ON".

The kill switch does not stop ingestion. Events keep arriving and keep being
recorded, so nothing is lost while it is on; the queue simply grows.

To confirm it is on without the dashboard:

```bash
curl -s localhost:3001/healthz | jq
curl -s localhost:3001/metrics | grep astra_blocked_writes_total
```

## Daily: working the queue

Open **Queue**. Buckets are ordered by how much they are blocking you.

- **Needs approval** — a message or a prototype is waiting. Nothing has been
  sent.
- **Human handoff** — automation stopped and said why. Read the reason, then
  either reply yourself in Lemlist or take over in the dashboard.
- **Prototype building** — in progress; nothing to do.
- **Meeting** — a meeting exists. Answer the exclusion question if it is
  showing.
- **Error** — see [errors](#errors-and-dead-letters).
- **Recently automated** — informational.

## Approving a message

Open the conversation. The pending approval is at the top and shows the exact
text, its word count, the reply hash, the conversation hash, and the policy
and prompt versions.

Underneath it is the full predicate log: every check the controller ran, with
pass or block and the reason. Read it before approving. If a predicate you
care about failed, the answer is usually to revise or hand off, not to
approve.

- **Approve** sends *exactly* that text. If the text changed since the
  approval was created, it is rejected as stale.
- **Revise** creates a new version and invalidates the previous one. There is
  no "approve then edit".
- **Reject** blocks it.
- **Take over** makes the conversation human-owned and invalidates everything
  pending.

If the banner says the approval is stale, it cannot be sent. Something arrived
after it was created. Let the next run produce a fresh draft.

## Approving a prototype

Same page, with the desktop and mobile screenshots, the chosen angle, the
business reasoning and the QA report.

Check three things before approving:

1. The screenshots look like something you would send.
2. The footer disclosure is visible.
3. The company name is spelled correctly.

Approving sends the delivery message with that one URL. **The URL is never
sent any other way.** Rejecting does not delete the deployed site: it is
marked and left in place, and deleting it is a separate explicit action.

## Handoffs

The alert says exactly why automation paused. The common ones:

| Reason | What it means | What to do |
| --- | --- | --- |
| `EXTERNAL_CONTEXT_SUSPECTED` | they referenced a call, document or colleague we cannot see | supply the context yourself; do not ask the prospect |
| `MEETING_ALREADY_REFERENCED` | a meeting exists or was mentioned | take it from here |
| `HIGH_RAPPORT` / `TURN_LIMIT_REACHED` | the conversation outgrew early outreach | take over |
| `PRICING_OR_SCOPE` | commercial discussion started | always yours |
| `PENDING_MANUAL_TASK` | a task implies a human is on it | complete or close the task |
| `PAUSE_UNVERIFIED` | we could not confirm the lead is paused | check Lemlist; the campaign may still send |
| `SEQUENCE_BRANCH_UNRESOLVABLE` | conditional steps we cannot resolve | decide manually whether the campaign will introduce itself |
| `NO_PRIOR_PROTOTYPE_OFFER` | they said yes to something we never offered | ask them what they meant |

You will not get repeated alerts for the same unresolved reason; notifications
deduplicate on reason with a cooldown.

## After a meeting is booked

Automation stops and the conversation goes human-owned. The dashboard asks one
question:

- **Keep human owned** (recommended) — nothing automatic ever again here.
- **Resume low-risk automation after the meeting**.
- **Exclude permanently**.

Until you answer, it stays human-owned.

## Calendar reconnect

If free/busy queries start failing you will get a `CALENDAR_DISCONNECTED`
alert, and slot proposals will hand off rather than guess. Nothing will be
offered or booked from stale data.

1. **Settings → Calendar** shows the provider, the account and the live
   connection status.
2. Click **Reconnect calendar**. You are sent to the provider's consent
   screen and back; the refresh token is encrypted before it is stored and is
   never shown or logged.
3. The status row turns green. No restart is needed: the worker reads the
   token on every refresh.

If the callback reports a signature failure, the link you followed did not
originate from this dashboard. Start again from Settings rather than reusing
the URL.

If it reports that no refresh token was issued, revoke the app's existing
consent with the provider and connect again. Without a refresh token the
connection would work for an hour and then stop, so it is refused outright.

**Disconnect** wipes the stored token rather than only flipping a flag, and
takes effect on the very next query.

An unconfigured calendar (`CALENDAR_PROVIDER=none`) fails every query on
purpose. An empty busy list would look like total availability and offer the
prospect every slot in the week.

## Errors and dead letters

**Errors** lists dead-lettered jobs with the failure and the attempt count.
Retry marks the entry resolved; the next inbound event re-enters the pipeline
normally. Retrying does not replay a half-finished send, because the send path
re-derives everything from live state anyway.

If an outbound intent is stuck in `UNKNOWN`, a send timed out and we do not
know whether it arrived. **Check the Lemlist inbox before doing anything.**
The system deliberately will not guess.

## Retention

Personal content ages out automatically; the record of what was decided does
not. Message bodies and raw webhook payloads are blanked in place, leaving the
activity id, timestamps, direction and hashes intact, so a gap is visibly a
redaction rather than a missing record.

| Setting | Default | What ages out |
| --- | --- | --- |
| `RETENTION_RAW_WEBHOOK_DAYS` | 90 | raw webhook payloads; the sanitized projection stays |
| `RETENTION_CONVERSATION_CONTENT_DAYS` | 365 | message bodies on conversations with no activity since |
| `RETENTION_SUPPRESSED_CONTENT_DAYS` | 30 | message bodies for suppressed contacts, counted from suppression |

The sweep runs once a day inside the worker and writes a `RETENTION_APPLIED`
audit entry with the counts whenever it changes anything.

## Exclusions and suppression

- **Exclude** stops automation for a contact, lead, campaign, or globally.
  Reversible from Settings.
- **Suppress** means never contact again. It is immediate, invalidates pending
  approvals, and is what an unsubscribe triggers automatically without any
  model call.

## Advancing the rollout

Stages never advance on their own.

1. Fixture tests, then `TEST` end to end.
2. `SHADOW` on one allowlisted campaign. Review at least 20 decisions and
   record whether you agreed.
3. `DRAFT_ONLY` until duplicates, threading, research and calendar behaviour
   all look right.
4. `LOW_RISK_AUTO` for one campaign with
   `MAX_AUTOMATED_OUTBOUND_PER_CONVERSATION=1`.
5. Raise the cap only after reviewing what went out.

Record the stage change in Settings, then change `RUNTIME_MODE` in the
environment and restart. The two-step is deliberate friction.

## Incident response

1. Kill switch on, restart the worker.
2. Check `astra_auto_sends_total` and the audit log for what actually went
   out, and to whom.
3. If a message reached a prospect wrongly, reply personally. Do not let the
   agent apologize.
4. Add an exclusion for the affected contacts so nothing else fires while you
   work.
5. Write down which predicate should have caught it, and add the test before
   the fix.
6. Turn the kill switch off only after that test is green.
