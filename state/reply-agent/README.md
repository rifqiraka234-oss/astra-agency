# Reply agent state

Committed to git so a fresh scheduled session (a new container every firing)
picks up exactly where the last one left off, the same pattern the enrichment
pipeline already uses.

- `checkpoint.json` — single object. `lastActivityIdSeen` maps `contactId` to
  the last Lemlist activity id (`act_xxx`) already processed for that contact,
  so a run compares "what's new since I last looked" per conversation rather
  than trusting any date filter. Updated after every conversation, not just at
  the end of a run, so a crash mid-batch loses at most one conversation.
- `auto_sent.jsonl` — one line per message the low-risk allowlist sent
  automatically. Append-only audit trail: `contactId`, `campaignId`,
  `intent`, `case`, `text`, `activityId` (the returned send confirmation),
  `checkedAt`.
- `queue.jsonl` — drafts waiting for Raka's decision. One line per pending
  item: `contactId`, `contactName`, `companyName`, `campaignId`, `reason`
  (why it did not qualify for auto-send), `draftText` (null if none was
  safe to draft), `queuedAt`. Cleared of an item once Raka approves, edits,
  or rejects it in chat — never auto-expires.
- `handoffs.jsonl` — conversations flagged `HUMAN_OWNED`: identity conflicts,
  hostile replies, anything referencing something the agent cannot see
  (a call, an attachment), or anything that would need email (LinkedIn is the
  only prospect-facing channel). Append-only; a handoff is only cleared by
  Raka saying so.
- `meetings_notified.jsonl` — one line per meeting the agent emailed Raka
  about: `contactId`, `contactName`, `companyName`, `scheduledFor`,
  `notifiedAt`. Checked before sending so the same meeting never triggers a
  second email on a later run.
- `runs/YYYY-MM-DD-HHmm.md` — human-readable summary written at the end of
  every run: conversations checked, auto-sent count, queued count, handoffs,
  any blockers. This is what the push notification links back to.

None of these files ever contain full raw webhook-style payloads — only what
a decision needs to be re-derived and audited.
