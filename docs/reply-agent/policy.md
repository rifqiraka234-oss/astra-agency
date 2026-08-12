# The low-risk automatic-send policy

Policy version `2026-08-11.1`. Implemented in
`packages/core/src/policy/engine.ts` and re-checked in
`packages/core/src/policy/presend.ts`.

Automatic sending is deny-by-default. Claude's `AUTO_SEND_CANDIDATE` is a
request. Every predicate below is recomputed from stored facts, and the
message text is validated again immediately before the external call, even
when a human already approved it.

## Global conditions

All of these must hold for any automatic send:

| Predicate | Blocks with |
| --- | --- |
| Kill switch off | `KILL_SWITCH_ON` |
| Mode is `LOW_RISK_AUTO` | `MODE_DISALLOWS_SEND` |
| `ALLOW_LIVE_LEMLIST_SEND` is true | `LIVE_SEND_FLAG_OFF` |
| Campaign is on `ENABLED_CAMPAIGN_IDS` | `CAMPAIGN_NOT_ENABLED` |
| No active global/campaign/contact/lead exclusion | `EXCLUSION_ACTIVE` |
| Owner is `ASTRA_AGENT` | `OWNER_NOT_ASTRA` / `OWNER_UNKNOWN` |
| Channel is certain | `UNCERTAIN_CHANNEL` |
| No message direction is uncertain | `UNCERTAIN_DIRECTION` |
| Conversation hash unchanged since analysis | `STALE_CONVERSATION_HASH` |
| Latest inbound message id unchanged | `STALE_INBOUND_MESSAGE_ID` |
| Model context was not truncated | `LOSSY_TRUNCATION` |
| Confidence ≥ 0.94 (≥ 0.96 post-acceptance) | `CONFIDENCE_BELOW_THRESHOLD` |
| Risk is `LOW` | `RISK_NOT_LOW` |
| No safety flag set | `SAFETY_FLAG_SET` |
| No attachment present | `ATTACHMENT_PRESENT` |
| No third party or unknown CC | `THIRD_PARTY_PARTICIPANT` / `UNKNOWN_CC` |
| No external context suspected | `EXTERNAL_CONTEXT_SUSPECTED` |
| No meeting scheduled or referenced | `MEETING_ALREADY_REFERENCED` |
| Under the automated outbound cap | `AUTOMATED_OUTBOUND_CAP_REACHED` |
| Under the meaningful turn cap | `TURN_LIMIT_REACHED` |
| Rapport is not HIGH | `HIGH_RAPPORT` |
| No pending manual task implying human involvement | `PENDING_MANUAL_TASK` |
| Content checks pass | see below |
| Send identifiers present | `MISSING_SEND_IDENTIFIERS` / `MISSING_REPLY_TO_ACTIVITY_ID` |

## The seven allowlisted cases

| Case | Intent | Max words | URLs |
| --- | --- | --- | --- |
| `POST_ACCEPTANCE_INITIAL_MESSAGE` | `CONNECTION_ACCEPTED` | 65 | none |
| `SIMPLE_ACKNOWLEDGEMENT` | `SIMPLE_ACKNOWLEDGEMENT` | 35 | none |
| `LOW_RISK_CLARIFYING_QUESTION` | `CLARIFICATION_NEEDED` | 35 | none |
| `BASIC_CAPABILITY_ANSWER` | `GENERAL_QUESTION` | 80 | none |
| `CALENDAR_SLOT_PROPOSAL` | `MEETING_INTEREST` | 120 | none |
| `BOOK_SELECTED_SLOT` | `SLOT_SELECTED` | 80 | none |
| `POLITE_CLOSE` | `NOT_NOW`, `NOT_INTERESTED` | 30 | none |

Additional conditions per case:

- **Post-acceptance** additionally requires ownership acquired through a
  verified pause, an unambiguously verified company identity, at least one
  evidenced website observation, and a stored concept brief before the message
  may claim completed work ("we sketched").
- **Calendar slot proposal** additionally requires a successful live free/busy
  query less than `CALENDAR_FRESHNESS_SECONDS` old, held internal
  reservations, and an explicit timezone in the message.
- **Book selected slot** additionally requires `ALLOW_LIVE_CALENDAR_WRITE`, a
  usable attendee email, a recheck of availability, and successful event
  creation *before* any confirmation is sent.

Everything else is draft-only or handoff. Objections, rebuttals, pricing,
scope, custom advice, detailed audits, prototype delivery, referrals and
complex questions are never sent automatically.

## Content checks

Run on every outbound message, in both the policy engine and the pre-send
gate. Each produces a blocking reason code:

- unicode-aware word count over the case cap
- empty or whitespace-only text
- near-duplicate of a recent outbound message (trigram Jaccard ≥ 0.82)
- unresolved placeholders (`{{firstName}}`, `[company]`, `TBD`, `%VAR%`, …)
- any URL not explicitly approved for that message; a `netlify.app` URL is
  reported specifically as `PROTOTYPE_URL_REQUIRES_APPROVAL`
- banned phrases: "website journey", "I took a proper look"
- inflated language: revolutionary, game-changing, world-class, cutting-edge,
  incredible, amazing, unparalleled, best-in-class
- guarantees and result claims
- manufactured urgency or scarcity
- unverifiable social proof
- pricing, quotes, contracts and commercial terms
- AI self-disclosure
- templated filler phrasing
- en and em dashes
- more than one emoji, more than one exclamation mark, excessive punctuation
- all-caps emphasis, bullet lists and headings in a conversational reply
- observations ("I noticed your …") not supported by the evidence table

Pricing detection targets Astra quoting commercial terms, not the word "price"
appearing at all: observing that a prospect's booking page hides its price is
a legitimate low-risk observation, while saying what we charge to fix it is
not.

## Handoff triggers

Automation stops entirely and the operator is alerted when a meeting exists or
is referenced, outside context is suspected, pricing/legal/complaint/referral
intents appear, the prospect is angry, rapport is HIGH, the turn or outbound
cap is reached, an attachment is present, a direction is uncertain, prompt
injection was detected, a blocking manual task exists, or any predicate is
unknown.

The dashboard shows the full predicate log for every decision, passing and
failing, so a handoff always explains itself.
