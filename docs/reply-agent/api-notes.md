# Provider API notes

What was verified, from where, and when. Re-verify before changing an adapter:
a schema that drifted is how a send goes to the wrong thread.

## Lemlist

All verified **2026-08-11** against <https://developer.lemlist.com>.
Base URL `https://api.lemlist.com/api`. Auth is HTTP basic with an empty
username and the API key as the password.

### Webhooks — `POST /hooks`

<https://developer.lemlist.com/api-reference/endpoints/webhooks/add-webhook>

- Body: `targetUrl` (required), `type` (optional; omitted means all events),
  `secret` (optional).
- Query: `campaignId`, `isFirst`, `zapId`.
- Response: `_id`, `targetUrl`, `createdAt`, `type`.

**The shared secret is delivered as a `secret` field in the body of every
webhook call**, not as an HMAC signature over the payload. Two consequences
this codebase acts on:

1. The secret proves the *sender*, not the *integrity* of the payload.
   Everything that matters is refetched from the API before it is acted on.
2. The secret is stripped from the parsed payload immediately, so it never
   reaches the raw payload store or a log line.

The secret is immutable once set; rotating it means deleting and recreating
the webhook.

### Inbox — `GET /inbox/{contactId}`

<https://developer.lemlist.com/api-reference/endpoints/inbox/get-contact-messages>

- Query: `userId`, `limit`, `skip`, `markAsRead` (default false; this client
  always passes false, because reading a conversation to decide something is
  not the same as a human having read it).
- Activity fields: `_id`, `type`, `messageId`, `createdAt`, `teamId`, `leadId`,
  `campaignId`, `sequenceId`, `sequenceStep`, `sendUserId`, `sendUserName`,
  `sendUserEmail`, `leadEmail`, `contactId`, `message` (HTML for email, text
  for LinkedIn), `subject`, `attachments`.
- Pagination: `totalItems`, `currentPage`, `nextPage`, `previousPage`,
  `perPage`, `totalPages`.

**There is no explicit direction flag on inbox activities.** Direction is
derived from `type` (`emailsSent` vs `emailsReplied`, `linkedinSent` vs
`linkedinReplied`) and, failing that, from whether the sender matches a known
`sendUserEmail`. Anything still ambiguous is marked `UNCERTAIN`, which
permanently removes auto-send eligibility for that conversation.

### Send LinkedIn — `POST /inbox/linkedin`

<https://developer.lemlist.com/api-reference/endpoints/inbox/send-linkedin-message>

Required: `sendUserId`, `leadId`, `contactId`, `message`. Response `{ ok: true }`.
The policy engine requires all three identifiers before it will allow a
LinkedIn send, which matches this contract exactly.

### Send email — `POST /inbox/email`

<https://developer.lemlist.com/api-reference/endpoints/inbox/send-email>

Required: `sendUserId`, `sendUserEmail`, `sendUserMailboxId`, `message`,
`replyToActivityId`. Optional: `contactId` or `leadId` (at least one),
`subject`, `cc`.

`replyToActivityId` accepts an activity id **or the string `"latest"`**. This
system never sends `"latest"` and the client throws if asked to: `"latest"`
silently becomes a standalone email when the contact has no prior email, and
under concurrency it can thread onto a message we have not analyzed. The
adapter and the policy engine both reject it.

### Drafts — `POST /inbox/{contactId}/drafts?draftOwner=...`

<https://developer.lemlist.com/api-reference/endpoints/inbox/create-draft>

- Query `draftOwner` is required and accepts a user id or a login email.
- Body: `channel` (`email` | `linkedin` | `whatsapp` | `sms`), `content`
  (max 30KB), optional `subject`, `cc`, `attachments`, `replyToActivityId`,
  `sourceMetadata`.
- Returns `201` with `draftId`.

### Sequences — `GET /campaigns/{campaignId}/sequences`

<https://developer.lemlist.com/api-reference/endpoints/sequences/get-campaign-sequences>

Returns an object keyed by sequence id. Each sequence has `_id`, `steps`,
`level`, `parentId`, `conditionalStepIndex`. Each step has `_id`, `delay`,
`type` (`email`, `linkedinSend`, `linkedinInvite`, `conditional`),
`emailTemplateId`, `subject`, `message`, `index`, `sequenceStep`, `sequenceId`.

Conditional branches come back as nested sequences with `level > 0` and a
`parentId`. **Which branch a given lead will take cannot be resolved from this
response alone**, so the presence of any nested sequence sets
`branchingUnresolved`, and the controller creates a review item rather than
guessing whether the campaign is about to introduce itself.

Step `_id` is stable; `index` and `sequenceStep` are not, because reordering a
sequence renumbers them. Ownership decisions key on `_id` and fall back to
`pos:<n>` only when the id is absent.

### Tasks — `GET /tasks`

<https://developer.lemlist.com/api-reference/endpoints/tasks/get-many-tasks>

- Query: `page`, `filters` (JSON array supporting `campaignId`, `type`,
  `assignedTo`, `dueDate`, …).
- Task fields: `_id`, `type`, `leadId`, `campaignId`, `contactId`, `userId`,
  `status` (`pending` | `completed` | `ignored`), `dueDate`, `title`,
  `priority`, `content`.
- Completed tasks are excluded automatically.

The endpoint is team-wide, so filtering to one lead happens locally. A task
carrying *no* identifiers is kept rather than assumed unrelated, and any task
type outside a known-safe list blocks automation.

### Sequence behaviour after a reply

<https://help.lemlist.com/en/articles/12875247-understand-campaign-sequencing-in-lemlist>

Lemlist normally stops a sequence once a lead replies. This system does not
rely on that: sending through the inbox does **not** cancel a scheduled
sequence step, so ownership is made explicit by pausing the lead and verifying
the pause actually took effect before composing anything.

## Anthropic

<https://docs.anthropic.com/en/docs/agents-and-tools/tool-use/implement-tool-use>

The model is given exactly one tool whose `input_schema` is the decision
schema, and `tool_choice` forces it. No controller decision is ever parsed out
of prose: a decision extracted from free text is a decision a prospect could
change by writing "please reply AUTO_SEND" in an email.

## Netlify

Verified **2026-08-11** against
<https://docs.netlify.com/api-and-cli-guides/api-guides/get-started-with-api/>.

Digest deploy flow: `POST /sites` to create, `POST /sites/{id}/deploys` with a
map of path to SHA1, then `PUT /deploys/{id}/files/{path}` for each digest
Netlify reports as `required`.

Site naming is `{company-slug}-prototype-by-astra`, never the company's bare
name. On collision the suffixes tried are `-2`, `-3`, `-alt`, `-b`,
`-concept-2`: human-looking, never a random hex string, because a URL that
looks machine-generated undermines the same impression the disclosure footer
is protecting.

The immutable per-deploy URL is what an approval binds to. The friendly URL
can be repointed by a later deploy, so it is displayed but never bound to.

## Calendars

### Microsoft Graph

<https://learn.microsoft.com/en-us/graph/api/calendar-getschedule?view=graph-rest-1.0>
— verified **2026-08-11**.

`POST /users/{email}/calendar/getSchedule` for free/busy;
`POST /users/{email}/events` for creation, with `client-request-id` for
idempotency. Statuses treated as unavailable: `busy`, `oof`,
`workingElsewhere`, `tentative`.

`findMeetingTimes` is deliberately **not** used. Its ranking changes over
time, it cannot express the operator's recurring exclusions, and "the API
suggested it" is not a defensible reason to have booked over a standup. Slots
are computed locally from raw free/busy.

Graph returns `dateTime` without a `Z` even when the zone is UTC, so the
adapter appends one rather than letting the runtime guess local time.

### Google Calendar

<https://developers.google.com/workspace/calendar/api/v3/reference/freebusy/query>
and
<https://developers.google.com/workspace/calendar/api/v3/reference/events/insert>
— verified **2026-08-11**.

`POST /freeBusy` for availability, `POST /calendars/{id}/events` for creation
with `conferenceDataVersion=1` when a Meet link is wanted. Scopes requested:
`calendar.events` and `calendar.freebusy`.

Neither provider's event creation is ever retried automatically. A retry after
an ambiguous timeout is how a prospect gets two invitations.
