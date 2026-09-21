# lemlist, the older heuristics, kept as history

> **Moved out of `CLAUDE.md` on 2026-09-21 to make it readable.** Nothing was changed, only relocated. `docs/RULES.md` outranks this file.
>
> **Superseded by `docs/lemlist-field-index.md`, which was built by calling every endpoint.** This is the trail of how the answers were worked out the hard way, including heuristics that were later proven wrong. Kept so nobody re derives them. Do not act on it.

## Pulling data cheaply, the patterns that actually work

- **Picking a batch.** `search_campaign_leads` with `campaignId` and a `limit`
  returns a lean row at roughly eighty tokens. A hundred at a time is affordable.
  The heavy record with `companyDescription` comes back only per single lead by id,
  so spend that on the ten you chose.
- **Resolving a name with no id.** Do not paginate `search_campaign_leads`. Call
  `get_inbox_conversations` with `listId: "sentOnly"` and `search: "<full name>"`.
  One small response gives `contactId` and the LinkedIn URL, and `lastRepliedAt: null`
  beside a `lastSentMessagePreview` that is still the connect note proves the row is
  genuinely Silent accepted.
- **`contactId` is what `send_message` needs**, never `leadId`.
- **The list endpoint cannot tell you what a thread contains, and its preview can be
  flatly wrong.** It exposes only `lastSentMessagePreview`, and on 2026-09-16 that
  preview showed the generic **connect note** for Carolien Leeraar, Andy Tidd and
  Patrick Killeen while each thread actually held a full researched opener sent
  afterwards. Triaging from the list alone would have re messaged all three as
  though they had never been contacted, which is the one outreach mistake with no
  recovery. Any claim about history, and every follow up count, needs
  `get_inbox_conversation` per contact.
- **There is no LinkedIn connection status field.** `get_contact_fields_schema`
  returns none, standard or custom, so acceptance is not stored on the contact and
  **`sentOnly` mixes accepted contacts with invitations nobody has accepted yet**.
  The newest rows there are almost always the invite step firing, not new accepts.
  Checked 2026-09-16, Özgül Atay and Chris Berry both sat at the top of the list
  with a connect note preview and **zero activities** in the thread. Ordering
  `search_campaign_leads` newest first does not help either, that returns fresh
  imports with empty activities.
- **An empty `get_inbox_conversation` is genuinely ambiguous.** The connect note is
  not always written as an activity, so empty means unknown, never "pending" and
  never "nothing was sent". Say unknown rather than guessing.
- **Acceptance IS decidable after all, and the test is `send_message` (2026-09-16).**
  This supersedes the "acceptance cannot be verified" conclusion logged earlier the
  same day. A LinkedIn direct message needs an accepted connection, an invitation
  does not. So a `send_message` on channel linkedin that comes back
  `HTTP 400 {"error":"Failed to send linkedin message [can-not-send-message]"}`
  means that contact has not accepted, **provided you first rule out a dead sender
  and a quota block**. Rule both out like this, and do it before drawing any
  conclusion:
  1. `get_user_channels` must show `linkedin.connected: true`.
  2. `get_inbox_conversations` on `sentOnly` with `dateFilter` set to today must show
     the campaign's invite step still firing. If invitations are going out, the
     account is not quota blocked or restricted.
  If both hold and the send still refuses, the contact is a pending invitation.
- **The cost of learning this the hard way, 2026-09-16.** Fourteen send attempts
  across three rounds, covering twelve fully researched openers, every one refused.
  Meanwhile the v0.1 invite step sent twenty connect notes that same morning, the
  last at 07:54. Nothing was delivered and roughly a full session of research went
  into people who cannot receive a message yet.
- **STOP. Acceptance is a recorded event on the campaign, so read it instead of
  inferring it (Raka, 2026-09-21). This supersedes every timestamp heuristic below,
  and the heuristics stay only as history.** His words, "you always gotta check the
  Campaign, in this case the campaign v0.1 and the list of the accepted requests."
  He is right, and everything below this bullet was me reading tea leaves in the
  inbox while lemlist was storing the answer as a first class activity called
  **`linkedinInviteAccepted`**.

  **The number that settles it.** `get_campaigns_stats` on v0.1 reports
  `channelMetrics.linkedinInvitationAccepted: 320` against `messageMetrics.sent: 167`.
  So 320 people accepted and 167 ever got a real message. I had just told Raka the
  accepted pool was "nearly exhausted". It was never close to exhausted.

### Pulling the invitation accepted list. Standing procedure, every campaign, no exceptions (Raka, 2026-09-21)

  **This runs before any batch is chosen, on whichever campaign is running, and it
  is never skipped because a previous session already did it.** Accepts arrive
  daily, so the list is stale within a day. The campaign id below is a variable,
  never v0.1 specifically. Find the running campaigns with `get_campaigns` and run
  this for each one.

  **Step 0, the headline, and it doubles as the sanity check against the UI.**
  `get_campaigns_stats` returns `channelMetrics.linkedinInvitationAccepted`. It is
  the same number the lemlist UI shows under Performance, Positive signal stats,
  **Invitation accepted**. Raka's screenshot on 2026-09-21 read 313 at 35.5 percent
  for the 9 July to 19 September window while the API returned 320 for all time,
  which is the date filter and not a discrepancy. If our number and his differ by
  more than that, stop and work out why before using the list.

  **Step 1, the leads parked at acceptance.**
  `GET /api/v2/campaigns/<campaignId>/export/leads?state=linkedinInviteAccepted&format=json`
  through `call_api`. Carries `_id` (the leadId), `firstName`, `lastName`,
  `linkedinUrl`, `jobTitle`, `companyName`, `companyDomain` and `companyLinkedinUrl`.

  **Step 2, the acceptance events, for the contact id and the timestamp.**
  `GET /api/activities?version=v2&type=linkedinInviteAccepted&campaignId=<campaignId>&limit=100&offset=<n>`
  paged until it comes back short. Carries `contactId`, `leadId` and `createdAt`,
  which is the moment they accepted. **Join to step 1 on `leadId`.**

  `call_api` needs `load_skill(skillName="api-reference")` once per session first.
  **Both responses are far too big for the context window and that is fine**, the
  harness writes any oversized tool result to a file under `tool-results/` and hands
  you the path, so parse them in bash and never page them through the conversation.
  `tools/accepted_pool.py` does the join and the write, so do not rewrite it.

  **The five fields Raka wants out of it, and they are the minimum.** Extract every
  one for every accepted contact, and carry `contactId` alongside because that is
  what `send_message` needs.

  | Field | Where it comes from |
  |---|---|
  | **Their name** | `firstName` plus `lastName` on the export |
  | **Their LinkedIn URL** | `linkedinUrl` on the export, the join key to everything else |
  | **The company they own or run** | `companyName`, read against `jobTitle` |
  | **That company's website** | `companyDomain`, falling back to `companyWebsiteUrl` |
  | **When they accepted** | `createdAt` on the acceptance activity, date and time |

  **`jobTitle` is what decides whether the company is actually theirs**, so read it
  rather than assuming. Owner, founder, eigenaar, Geschäftsführer, dirigeant and
  zaakvoerder mean the business is the subject. A CEO of somebody else's group, or a
  manager, is a different message. And the step 1 rule about separating the business
  they OWN from the job they HOLD still applies, because `companyName` is whatever
  LinkedIn had, not necessarily the thing they run on the side.

  **Then subtract what we have already done.** Key on `contactId` against
  `state/silent_accepted_queue.jsonl`, latest row per contact. What is left with no
  row at all is the real backlog and it is what gets researched.

  **Read `state` correctly or the count will mislead you.** A lead's `state` tracks
  the campaign sequence only, so a message we sent by hand from the inbox does NOT
  advance it. On 2026-09-21 the 225 leads parked at `linkedinInviteAccepted` broke
  down as 106 already worked and marked SENT in our own queue, 28 already carrying a
  verdict, and **85 never touched at all**. Those 85 are the real backlog and they
  are written to `state/accepted_pool_v01.jsonl` with all five fields plus the
  contact id, which is step 1 of the research order handed over for free.

  **And this explains the refusals.** v0.1 runs a `linkedinWithdrawInvitation` step,
  so an invitation nobody accepts gets pulled back. Every contact refused with
  `can-not-send-message` simply is not in this list. Check the list first and no
  research is ever spent on someone who cannot receive it.
- **The acceptance signal, the old inbox heuristic, kept as history (2026-09-16).**
  **`lastActivityAt` strictly later than `lastSentAt` means the contact accepted.**
  The later activity is the acceptance being written to the thread. Combine it with
  a `lastSentMessagePreview` that is still the generic connect note and a
  `lastRepliedAt` of null, and you have a genuine Silent accepted lead, accepted but
  never given a real message. When the two timestamps are **equal**, the invitation
  is still pending and a send will be refused.
  **PROVEN by a send on the same day.** Sergey Shalunov was picked purely on this
  signal, lastActivityAt 15 Sep 23:31 against lastSentAt 8 Sep 06:51, and the
  message went through first time with `success: true`. Fourteen attempts on
  contacts whose timestamps were equal had already been refused. One rule, two
  opposite outcomes, both predicted.
  Corroborated three further ways on the day it was found. Raka's own LinkedIn inbox
  screenshot showed Martijn Hak, Sergey Shalunov and Jelle de Vries as live threads
  and all three carry the later-activity pattern. Every contact who demonstrably
  received a real researched message, Daniel Forster, Nives Rombini, Martijn Mol,
  Mark-Paul Burgersdijk and Dr Ashish Rajput, carries it too. And all twelve
  contacts whose sends were refused had the two timestamps exactly equal.
- **`get_inbox_conversation` cannot do this job.** Martijn Hak is accepted and his
  thread still returns zero activities, identical to a pending invite. The thread
  endpoint is for reading what was said, never for deciding acceptance.
- **A row with `lastSentAt: null` and recent activity is a third state**, roughly 30
  of them in the 9 to 16 September window. Nothing was ever sent to these people at
  all, not even the connect note, yet something happened on the thread.
  **RESOLVED 2026-09-21, and the answer is that they are not connected.** Eight of
  them were probed with real sends and every one was refused. Two came back with a
  different and much plainer error, `HTTP 400 {"error":"Failed to send message. Lead
  is not connected."}`, which is lemlist saying outright that no connection exists.
  So the third state is NOT a pool of quiet accepts, it is leads the campaign has not
  even invited yet, and the activity on the thread is something other than an
  acceptance.
- **The two refusal messages mean slightly different things and both mean do not
  research.** `can-not-send-message` is an invitation sent and not accepted.
  `Lead is not connected` is no connection at all. Neither is worth research time.
- **The cost of learning this, and it is the same lesson as 2026-09-16.** The
  2026-09-20 overnight batch put full research into eleven leads. Three sent. The
  other eight were the third state and every one refused, so roughly two thirds of a
  night went into people who cannot receive a message. **Before researching ANY batch,
  probe one contact from it with a send.** The rule was already written after the last
  time and it was not followed, because the third state looked like a new opportunity
  rather than the same trap wearing a different label.
- **So test one contact before researching a batch.** When a batch is drawn from
  `sentOnly`, attempt a send to a single contact in it first. If it refuses, the
  whole batch is pending invitations and the research should wait. The 2026-09-16
  batch of 38 was pulled from the newest end of `sentOnly`, dated 5 to 9 September,
  which is exactly where the invite step has been firing, so it was the worst
  possible slice to pick. **Draw batches from the oldest end of the accepted pool,
  not the newest end of `sentOnly`.**
- **Pick batches from the LEAD list, not the inbox list, and go in that direction only
  (2026-09-18).** `search_campaign_leads` returns `firstName`, `lastName`,
  **`companyName`**, **`jobTitle`** and `linkedinUrl` for every lead at roughly eighty
  tokens a row. That is step 1 of the research order handed to you for free, and it is
  the thing the inbox list can never give you. `get_inbox_conversations` returns
  `contactId`, name and LinkedIn URL and **no company and no title at all**.
- **So never go inbox first and try to look the company up afterwards.** On 2026-09-18
  three accepted contacts (Severin Kloos, Harisson Reale, Peter Borup) were found via
  the acceptance signal and then could not be identified. LinkedIn returns HTTP 999 so
  the profile is unreadable, name searches returned only unrelated people, and the only
  join key back to the lead record is the LinkedIn URL. Finding three specific slugs
  meant paginating 500 plus leads at roughly 15k tokens a page. Two pages were spent
  and none of the three appeared, because they sit deeper in the list.
- **The correct direction. Pull leads by add date, read `companyName` and `jobTitle`,
  pick the ones that actually fit an ASTRA proposition, and only then check acceptance**
  for that shortlist using the `lastActivityAt` later than `lastSentAt` signal. You spend
  the expensive acceptance check on ten leads you already want rather than on a hundred
  you have not qualified.
- **And go to the OLDER end.** `search_campaign_leads` returns newest first, and the
  newest rows are the bulk imports whose invites are still firing, so their timestamps
  are equal and every send is refused. Use `addedBefore` to skip the recent imports
  entirely. On 2026-09-18 the 14 and 17 September imports filled the first three pages
  and every one of them was a pending invitation.
- **`aiLeadInterestLevel` is a reading priority hint, never evidence.** It is the AI's
  read of one reply, and it is absent on any message that was not scored.
- **Fetch failures are UNKNOWN and retryable**, never "no angle". Retry with the
  render pipeline, mirror the HTML and assets and screenshot the local copy offline.
