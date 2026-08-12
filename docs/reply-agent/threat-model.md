# Threat model

What can go wrong, what stops it, and what is knowingly left open.

## Assets

| Asset | Why it matters |
| --- | --- |
| Lemlist API key | can message every prospect the team has |
| Lemlist webhook secret | lets an attacker inject fake events |
| Calendar OAuth refresh token | standing access to the operator's calendar |
| Netlify token | can deploy to and delete the team's sites |
| Anthropic key | billable, and can be used to generate anything |
| Dashboard session | can approve a prototype link or a message |
| Prospect conversations | personal data, and Astra's reputation |
| Astra's reputation | the thing an agent can damage fastest |

## Adversaries

1. **A prospect, or anyone who can write into a conversation.** Untrusted by
   definition, and able to put arbitrary text in front of the model.
2. **A website the agent researches.** Same, plus HTML comments and metadata
   invisible to a human reviewing the page.
3. **Someone who finds the webhook endpoint.** It is public by necessity.
4. **Someone who obtains a dashboard link from an email.**
5. **Us.** A controller bug that sends the wrong thing is the most likely
   incident by a wide margin.

## Threats and controls

### Prompt injection through a prospect message or a website

External content reaches the model inside `<untrusted_data>` tags, and every
prompt states that such content is evidence and never authority. The research
adapter scans both the extracted text *and* the raw HTML, so instructions
hidden in a comment are detected even though they never reach the model. Any
detection sets `website_prompt_injection_detected`, which the policy engine
treats as an immediate handoff.

The deeper control is structural: even a perfectly successful injection can
only change what Claude *recommends*. It cannot change the campaign allowlist,
the kill switch, the word cap, the URL rules or the ownership state, because
the controller recomputes all of those from stored facts. There is no model
output that unlocks a send.

**Residual risk:** an injection that produces a plausible, benign-looking
low-risk message could still be sent if every predicate passes. The blast
radius is one 35-word acknowledgement, capped at three automated messages per
conversation.

### Forged or replayed webhooks

The shared secret is compared in constant time and the team id is validated.
Because the secret arrives in the body rather than as an HMAC over it, it
authenticates the sender but not the payload, so **nothing in the payload is
acted on**: the pipeline refetches the conversation, lead, campaign, sequence
and tasks from the API before deciding anything. Replays collapse on the
activity id, enforced by a unique constraint rather than by application logic.

**Residual risk:** an attacker with the secret can cause the worker to refetch
a contact they name. That is a nuisance, not a send.

### Secrets in logs

Every log line, notification body and audit payload passes through a central
redactor that scrubs registered literal secrets, sensitive keys by name, and
known token shapes. Raw email HTML is summarized rather than logged. The
webhook secret is stripped from the parsed payload immediately, so it never
reaches the raw payload store at all. Tested in
`packages/core/src/text/redact.test.ts`.

### Stolen dashboard session

Sessions are HMAC-signed, HttpOnly, expire in 12 hours by default, and are
re-checked against `ADMIN_EMAIL` on every request, so removing an operator
from the environment ends their session immediately. Every state-changing
action requires a double-submit CSRF token and an Origin check.

An emailed link cannot approve anything: notification emails contain no
approval token and no action URL, only a link to a page that requires signing
in. Approval is bound to an exact reply hash and an exact prototype version,
and is re-evaluated against live state both when clicked and again in the
pre-send gate.

### Duplicate or wrong-thread sends

- One advisory lock per contact, so two workers cannot analyze or send
  simultaneously.
- A durable outbound intent is written *before* the provider call, keyed by
  contact + latest inbound activity + action + content hash.
- Sends are never retried automatically; an ambiguous timeout is recorded as
  `UNKNOWN` and left for a human.
- Email replies require the exact inbound activity id. The string `"latest"`
  is rejected by both the policy engine and the client.
- Ownership requires a *verified* pause, because an accepted pause call that
  did not actually pause is indistinguishable from success at the call site.

### The agent saying something untrue

Every claim about a company needs an evidence row with a verbatim excerpt and
a source. The content checker rejects observations that no evidence supports,
guarantees, invented social proof, manufactured urgency and pricing. The
post-acceptance message additionally requires a verified company identity, and
may only claim completed work when a stored concept brief exists.

### A prototype mistaken for a company's real site

`noindex,nofollow,noarchive`, a `robots.txt` that disallows everything, a
mandatory footer disclosure checked by QA, a site name that always carries
`-prototype-by-astra`, no tracking, no cookies, no live forms, and no
impersonation. A prototype that fails any of these is not deployed.

### Data protection

Only the fields needed to decide are stored. Raw payloads are access
controlled and separate from the sanitized projection used for display.
Suppression is immediate and invalidates pending approvals. A daily sweep
blanks raw payloads, aged conversation content and suppressed contacts'
messages on separate configurable schedules, keeping the decision record and
the content hashes so the audit trail survives the redaction.

Calendar refresh tokens are encrypted with AES-256-GCM using a key held
outside the database, read on demand rather than cached at startup, and wiped
on disconnect. The OAuth `state` is HMAC-signed, so a callback URL the
operator is tricked into following cannot attach a different calendar to the
account.

## Known limitations

- The webhook secret authenticates the sender, not the payload. Mitigated by
  refetching everything, but a signature would be better if Lemlist adds one.
- Login throttling is in-process, so it is per-instance. Fine for one operator
  on one instance; move it to the database before scaling out.
- Attachment contents are never parsed. Their presence blocks automation,
  which is safe but means a conversation with an attachment always needs a
  human.
- The model could be wrong in a way every deterministic check accepts. The
  caps exist for exactly that case: 65 words, three messages, and a human
  after eight turns.
