# Astra reply agent — scheduled Claude Code operating playbook

This is the operating procedure for the reply agent as a **scheduled Claude
Code Routine calling the Lemlist MCP tools directly**, no deployed app, no
database, no dashboard. It replaces the standalone worker + dashboard
described in `docs/reply-agent/README.md`, which is retired but left in the
repository for reference and for its tested policy logic (`packages/core`),
which this playbook reuses via the CLIs in `scripts/reply-agent/`.

Everything a fresh firing needs to resume is committed to git under
`state/reply-agent/` (see `state/reply-agent/README.md` for the exact schema).
This is the same pattern the enrichment pipeline already uses in this repo —
read `CLAUDE.md` at the repo root for that precedent before assuming anything
here is novel.

## Non-negotiable boundaries (re-read before sending anything)

- **Only the seven allowlisted low-risk cases may ever send automatically.**
  Everything else drafts and waits. Run every candidate reply through both
  `scripts/reply-agent/classify-low-risk.mjs` (is this intent even eligible)
  and `scripts/reply-agent/check-message.mjs` (does this exact text pass).
  Both must return `ok`/`isLowRisk: true`. Neither check is advisory — a
  message that fails either one is never sent, full stop, regardless of how
  confident the classification feels.
- **Never send on a channel that is not connected.** Before drafting, confirm
  with `get_user_channels` (or the cached result from the last run) that the
  channel the reply would go out on is actually connected. As of the last
  live check (2026-08-16), **email is not connected on this Lemlist team —
  only LinkedIn is.** A reply that would need to go by email is queued for
  Raka, never attempted, and the queue entry says why.
- **No hyphens, en dashes, or em dashes** (`-`, `–`, `—`) anywhere in a
  drafted or sent message. `check-message.mjs` blocks this; do not construct
  a message that would need one and try to route around the check.
- **Never fabricate a claim.** Every specific statement in a message must
  trace to something actually read in the conversation thread or the
  contact/company record this run. `check-message.mjs`'s
  `supportedClaimTerms` input is how you tell it what is actually supported;
  pass the real list, not an empty one to make the check pass trivially.
- **A prototype link is never sent by this agent, automatically or
  otherwise.** That capability does not exist here. If a conversation reaches
  the point of offering a prototype, hand it to Raka.
- **An identity conflict, a hostile or confused reply, or a reference to
  something this agent cannot see (a call, a screenshot, an attachment)
  always goes to `handoffs.jsonl`**, never auto-sent, never silently drafted
  as if nothing was wrong.
- **This playbook drafts and, within the allowlist, sends. It never changes a
  campaign's running/paused/draft status, never registers a webhook, never
  purchases anything, never modifies team settings.** Those are Raka's calls.

## Live configuration

Pulled read-only from the account on 2026-08-16. Re-verify at the start of
every run rather than trusting these values indefinitely — an account can
change between runs and a stale assumption here is exactly the kind of thing
that has caused real incidents in this repo's history (see
`docs/unified/traceability.md` 34.1–34.2).

- **Team:** `tea_8Xk986fXjAtn2hqHf` (Astra agency), company domain
  `astraagency.nl`.
- **Operator / sender:** `usr_27bdxG7jzTn2rucGB` (Rifqi Rakamulya,
  `raka@astraagency.nl`), admin. LinkedIn connected. **Email not connected —
  no mailbox, `sendUserMailboxId` unavailable.** A second team member exists
  (`usr_MKy94ogmHZB9hQm3K`, Luna Raisyamulya) but is not the sender identity
  for this agent unless Raka says otherwise.
- **Campaigns as of the last check** — re-run `get_campaigns` with no status
  filter at the start of every run rather than trusting this list, campaign
  status changes and this agent must never be the reason one changes:
  - `cam_Co5CJXrpPFf5MRAfD` — Small Business Owners v0.2 (Auto Enrichment
    Pipeline) — **running**. `CLAUDE.md`'s enrichment playbook still describes
    this as draft; that is now stale and was flagged to Raka on 2026-08-16.
    Confirm current status before assuming either document is right.
  - `cam_PryZp5LuvQv8NznHh` — Small Business Owners v0.1 (Outreach Only) —
    running.
  - `cam_XhwKbYhtEJiMKCcWJ`, `cam_qTg4CGzMhiGqqiZkf`,
    `cam_hFp8rvMJMkbm4mutN`, `cam_8nJ56KrXxgpZnhQ9T`,
    `cam_ZkY7BPRpHgaGW8hLp`, `cam_JEtZFMtrHK7tBzX6N` — draft/paused, not
    actively sending. Replies on these are still handled if they exist (a
    paused campaign can still have open conversations), just don't expect new
    volume from them.
  - `cam_3ooqeEXZq4A53K3PP` — archived. Skip entirely.

## The 2x-daily run

1. **Load state.** Read `state/reply-agent/checkpoint.json`,
   `queue.jsonl`, `handoffs.jsonl`. Note anything already queued or handed
   off from the previous run so you don't re-surface it as new.
2. **Confirm channel state.** Call `get_user_channels`. If email has become
   connected since the values recorded above, update this document's "Live
   configuration" section to say so — don't just proceed silently on a
   changed assumption.
3. **Pull the inbox.** Call `get_inbox_conversations` (unfiltered, and again
   with `listId: "unRead"` to be sure nothing is missed) across all campaigns
   that are not archived. For each conversation with activity newer than
   `checkpoint.json`'s recorded `lastActivityIdSeen[contactId]`, pull the full
   thread with `get_inbox_conversation`.
4. **For each new inbound reply, in order:**
   a. **Read the whole thread**, not just the latest message. Note the
      contact's actual last sentiment (`aiLeadInterest` when present),
      whether a meeting or call was already referenced, whether the sequence
      already sent something after this reply that would make a response
      redundant.
   b. **Classify the intent** yourself, using your judgment on what was
      actually said. Use the same intent vocabulary the low-risk classifier
      expects: `CONNECTION_ACCEPTED`, `SIMPLE_ACKNOWLEDGEMENT`,
      `CLARIFICATION_NEEDED`, `GENERAL_QUESTION`, `MEETING_INTEREST`,
      `SLOT_SELECTED`, `NOT_NOW`, `NOT_INTERESTED`, or anything else that
      genuinely doesn't fit (pricing question, objection, complaint,
      confusion, hostility, a reference to something you can't see).
   c. **Check eligibility**:
      `echo '{"intent":"<intent>"}' | npx tsx scripts/reply-agent/classify-low-risk.mjs`.
      If `isLowRisk` is false, this reply is drafted (if a safe draft is
      possible) or handed off, never sent. Skip to step (e).
   d. **If eligible, draft the reply** in Astra's voice (plain, short
      sentences, no invented claims, no AI-sounding compound openers — see
      `docs/reply-agent/policy.md` for the full style rules the checks
      encode) and run it through
      `echo '{"text":"<draft>","maxWords":<from classify-low-risk>,"allowUrls":<from classify-low-risk>,"supportedClaimTerms":[...]}' | npx tsx scripts/reply-agent/check-message.mjs`.
      Only if `ok: true` AND the channel is connected (step 2) may you call
      `send_message` (or `send_task` for a queued task) with that exact text.
      Record the send in `auto_sent.jsonl`.
   e. **Otherwise**, produce a draft if one is safely possible (still run it
      through `check-message.mjs` even though it won't be sent automatically
      — an unsafe draft is not a useful suggestion for Raka either) and
      append to `queue.jsonl`. If nothing safe can be drafted (identity
      conflict, no verifiable basis for a reply, hostile/confused message,
      channel unavailable), append to `handoffs.jsonl` instead with a clear
      `reason`.
   f. **Update `checkpoint.json`** for this contact immediately, not batched
      at the end — a crash mid-run must lose at most the conversation in
      flight.
5. **Write the run summary** to
   `state/reply-agent/runs/<date>-<time>.md`: conversations checked,
   auto-sent count and which cases, queued count, handoffs and why, any
   blockers (channel unavailable, a check that failed unexpectedly, a
   campaign status that changed).
6. **Commit and push** every changed state file with a plain message like
   `reply-agent: run N processed, YYYY-MM-DD HH:mm`.
7. **Notify Raka** with a push notification: how many auto-sent, how many
   waiting for a decision, how many handed off, and a one-line pointer to
   the queue if anything needs attention. Do not send a notification for a
   run that found nothing new — a silent run is a fine run.

## Reviewing the queue (by chat, whenever Raka opens a session)

There is no dashboard. When Raka asks to see what's pending — "show me the
queue", "what's waiting" — read `state/reply-agent/queue.jsonl` and
`handoffs.jsonl` and present them compactly: name, company, why it's queued,
the draft if one exists. On approval, run the draft through
`check-message.mjs` one more time (the conversation may have moved since it
was queued — re-pull it and re-check before sending, per the same "recompute,
never trust a stale approval" principle the retired app's `preSendCheck`
encoded), send it, move the line from `queue.jsonl` to `auto_sent.jsonl` with
`decision: "approved"`, commit and push.

## What this playbook deliberately does not do

- It does not maintain a database. State is git-committed files, exactly like
  the enrichment pipeline. If conversation volume ever makes JSONL scanning
  too slow, that's a reason to revisit, not a reason to add complexity now.
- It does not receive webhooks. It polls twice a day. A reply that arrives
  at 9:01am and would benefit from an instant response waits until the next
  run. If that becomes a real problem, the fix is a shorter interval or an
  additional triggered check, not rebuilding a webhook receiver.
- It does not run the full retired policy engine (`decideControllerAction`,
  ownership sequencing, calendar freshness, approval-hash binding). Those
  encoded a lot of state this architecture doesn't keep (job queues,
  conversation state machine rows, calendar reservation locks). What's
  reused is the part that doesn't need any of that: the content checks and
  the low-risk allowlist itself. Anything the old engine would have caught
  that these two scripts don't (a slot double-booked between proposal and
  booking, for instance) is exactly the kind of case that should go to
  `handoffs.jsonl` rather than being silently under-checked — when unsure,
  queue or hand off, never guess toward auto-send.
