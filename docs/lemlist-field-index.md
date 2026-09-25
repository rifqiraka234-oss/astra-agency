# lemlist field index

> **Zero mistake policy. Read `CLAUDE.md` "TRIPLE CHECK EVERYTHING" before acting on
> this file (Raka, 2026-09-21).** Every claim gets three different checks, not three
> readings. Reopen the source, actively try to prove the claim false, then confirm it a
> second way that does not share a failure mode with the first. Every absence claim ships
> with a positive control showing the method finds the thing when it is there. My own
> notes, state files and memory are a candidate list, never proof.
>
> **Being lazy is prohibited.** If a tool, an API call or a fetch can settle a question,
> it settles it. Never reason from a timestamp, a preview, a filename, a pattern or a
> plausible guess to save a call. An inference that turns out right is still a process
> failure. For this file that means the numbers below are a snapshot of 2026-09-21 and
> the SHAPES are what to trust. Re run the call before quoting any figure.

**Built 2026-09-21 by calling every endpoint, not from memory.** Raka asked for it after
a morning where the pipeline missed that `linkedinInviteAccepted` exists as a first class
recorded event, told him the accepted pool was nearly exhausted when 320 people had
accepted and only 167 had ever been messaged, and then sent eleven people a second cold
pitch. The cause was not knowing which field answers which question.

**How to use this.** Start at section 1, the reverse lookup. Find your question, it names
the field and the call. Sections 2 onwards are the detail behind it. Section 8 is the
list of traps, and every one of them has already cost us something real.

**What is verified and what is not.** Every field name, enum value and count below came
out of a live response on 2026-09-21. Nothing is inferred from REST convention or from
lemlist's public docs. Where something is an observation from OUR data rather than a
documented enum, it says so. Where a question is still open, it says that too, in
section 9, rather than being quietly rounded off.

---

## 1. The reverse lookup. Your question, and the field that answers it

This is the table to read first. The left column is what you actually want to know.

| The question | Where the answer lives | The call |
|---|---|---|
| **Did this person accept the connection?** | `channelMetrics.linkedinInvitationAccepted` for the count, activity `type: "linkedinInviteAccepted"` for the individual event with its timestamp | `get_campaigns_stats`, then `GET /api/activities?version=v2&type=linkedinInviteAccepted&campaignId=...` |
| **Who accepted and has never been messaged?** | The acceptance export, minus what we have actually sent. **The campaign cannot tell you this**, because a manual inbox send does not advance the lead | `GET /api/v2/campaigns/<id>/export/leads?state=linkedinInviteAccepted&format=json`, then `get_inbox_conversation` per contact |
| **What has this person actually been sent?** | The thread, per contact. Nothing else is reliable | `get_inbox_conversation(contactId)` |
| **Was that a real message or just the connect note?** | Activity `emailTemplateName`. `linkedinInvite` is the connect note. A real message has `campaignId: null` when sent by hand from the inbox | inside `get_inbox_conversation` |
| **Has this person replied?** | Activity `type: "linkedinReplied"` in the thread, or `lastRepliedAt` on the conversation list | `get_inbox_conversation`, `get_inbox_conversations` |
| **Is it our turn?** | `isYourTurn` on the conversation row | `get_inbox_conversations` |
| **What company does this lead run?** | `companyName` read against `jobTitle`, plus `companyDomain` | `search_campaign_leads`, or the lead export |
| **Their website** | `companyDomain`, falling back to `companyWebsiteUrl` or `companyWebsite` | the lead export carries all three |
| **Their LinkedIn** | `linkedinUrl` on the lead, `contactLinkedinUrl` on the conversation. **This is the only reliable join key between the two** | either |
| **Is the business theirs or are they an employee?** | `jobTitle`. Owner, founder, eigenaar, Geschäftsführer, dirigeant, zaakvoerder mean it is theirs | `search_campaign_leads` |
| **Which id do I send with?** | `contactId` (`ctc_...`). Never `leadId` (`lea_...`) | conversation rows and activities carry `contactId` |
| **Where is this lead in the sequence?** | `state` plus `stateSystem` on the lead export | the lead export |
| **Which campaigns is this contact in?** | `campaignCount` on the contact record | `search_contacts` |
| **How big is the company?** | `companySize`, `companyEmployeeCount`, `employeesCountGrowth` | the lead export |
| **Can we even send right now?** | `linkedin.connected` | `get_user_channels` |
| **Which campaigns are live?** | `status` on each campaign | `get_campaigns` |
| **What does the sequence actually do?** | step `type` and `altMessage` | `get_campaign_sequences` |
| **Is this contact unsubscribed or off limits?** | `doNotContact`, `unsubLinkedin`, `unsubEmail`, `unsubPhone` | `GET /api/fields?entity=contact` confirms these exist; read them per contact |

**The three questions this repo gets wrong most, and the short answer to each.**

1. **"Have we spoken to this person?"** Only `get_inbox_conversation` answers it. Not the
   lead `state`, not our own state files, not a bulk activities pull.
2. **"Who has accepted?"** `channelMetrics.linkedinInvitationAccepted` and the
   `linkedinInviteAccepted` activity. Never a timestamp heuristic on the inbox list.
3. **"Which company is this?"** `companyName` plus `companyDomain` off the lead record,
   confirmed against the site. Never a name search, because lemlist abbreviates surnames.

---

## 2. The entity model, because half the confusion is not knowing which thing you hold

There are five separate objects and they have different id prefixes. Getting these mixed
up is the root of most lookup failures.

| Entity | Id prefix | What it is | Where it comes from |
|---|---|---|---|
| **Team** | `tea_` | The lemlist account | `get_team_info` |
| **User** | `usr_` | A sender. Ours is `usr_27bdxG7jzTn2rucGB` | `get_users`, `get_user_channels` |
| **Campaign** | `cam_` | A sequence plus its leads | `get_campaigns` |
| **Sequence / step** | `seq_` / `stp_` | The steps inside a campaign | `get_campaign_sequences` |
| **Lead** | `lea_` | A person **inside one campaign**, with a sequence position | `search_campaign_leads`, the lead export |
| **Contact** | `ctc_` | A person **at team level**, across campaigns. Owns the inbox thread | `search_contacts`, `get_inbox_conversations` |
| **Company** | `cpn_` | An organisation record, linked from a contact | `search_companies` |
| **Activity** | `act_` | One recorded event | `GET /api/activities`, `get_inbox_conversation` |
| **Inbox conversation** | `ibx_` | The thread wrapper | `get_inbox_conversations` |

**The distinction that matters most. A lead is campaign scoped and a contact is team
scoped.** A lead carries the sequence position and the enrichment. A contact carries the
conversation. `send_message` needs the **contact**. The lead export gives you the
**lead**. The only field that reliably joins them is `linkedinUrl`, because names are
abbreviated and email is usually empty on LinkedIn-only campaigns.

**Verified 2026-09-21.** `search_contacts(search: "Kouidri")` returns zero results while
the person exists and has a live thread, because lemlist stores her surname as **"K."**.
Six of the 225 leads in the accepted bucket have a surname of the form single letter plus
a dot. Name matching is not a lookup strategy.

---

## 3. Campaign level. `get_campaigns`, `get_campaigns_stats`, `get_campaign_sequences`

### 3.1 `get_campaigns`

Ten campaigns on this account, one running. Fields per row.

| Field | Meaning |
|---|---|
| `id` | `cam_...` |
| `name` | Human name |
| `status` | `running`, `paused`, `archived`, and `draft` exists per the triage spec |
| `emoji` | Cosmetic |
| `createdBy` | `usr_...` |

**State of play on 2026-09-21.** Only `cam_PryZp5LuvQv8NznHh`, "Small Business Owners
v0.1 Outreach Only", is `running`. `cam_Co5CJXrpPFf5MRAfD` (v0.2) is `paused`. Seven
other paused campaigns and one archived. Re check this every run, it is Raka's call.

### 3.2 `get_campaigns_stats`, and the field that was missed

Three metric blocks, and **they count different things**. This is where the morning went
wrong, so read all three before drawing a conclusion.

**`leadMetrics`, people.**

| Field | v0.1 on 2026-09-21 | Meaning |
|---|---|---|
| `total` | 1499 | Leads in the campaign |
| `launched` | 1499 | Leads the sequence has started on |
| `reached` | 983 | Leads the sequence actually got a touch out to |
| `reachedPercentage` | 65.6 | |
| `opened` | 320 | **On a LinkedIn only campaign this is the acceptance count, not an email open.** It equals `linkedinInvitationAccepted` exactly |
| `interacted` | 320 | Same number, same reason |
| `answered` | 96 | People who replied |
| `interested` / `notInterested` | 0 / 0 | Only set if someone tags a lead by hand. Both are zero here, so **they are not a reply signal** |
| `unsubscribed` | 0 | |
| `interrupted` | 4 | |

**`messageMetrics`, messages.**

| Field | v0.1 | Meaning |
|---|---|---|
| `sent` | 167 | Messages the campaign sent. **Not our manual inbox sends** |
| `delivered` | 167 | |
| `opened` | 320 | 191.6 percent, because it is acceptances counted against messages. A percentage over 100 is the tell |
| `replied` | 88 | 52.7 percent |
| `clicked`, `bounced` | 0 | |
| `perChannel.linkedin.invitationAccepted` | 320 | The same number again, a third place |
| `perChannel.linkedin.breakdown.sent` | messages 167, inMails 0, voiceNotes 0 | |

**`channelMetrics`, the block that was missed.**

| Field | v0.1 | Meaning |
|---|---|---|
| **`linkedinInvitationAccepted`** | **320** | **The authoritative acceptance count. The lemlist UI shows this under Performance, Positive signal stats, Invitation accepted** |
| `meetingBooked` | 0 | Not wired up for us |

**The comparison that should have been made on sight.** 320 accepted against 167 sent.
That gap is the backlog, and it is visible in one call.

**`steps`, per sequence step.** `index`, `sequenceId`, `sequenceStep`, `taskType`,
`conditionLabel`, then `invited`, `sent`, `delivered`, `opened`, `clicked`, `replied`,
`notDelivered`, `bounced`, `unsubscribed`. On v0.1 the `linkedinInvite` step shows
`invited: 946` and `sent: 1113`, so **invited and sent are not the same counter** and
neither is the lead count.

**Date filtering.** The call defaults to `startDate: 1970-01-01`. Raka's UI screenshot
read 313 for a 9 July to 19 September window against 320 all time. That is the filter,
not a discrepancy.

### 3.3 `get_campaign_sequences`

Per step, `id`, `sequenceId`, `type`, `delay`, and for a message step `subject`,
`message` and `altMessage`.

**v0.1's actual sequence, verified.** A `conditional` on `linkedinNetworkCheck`, then
`linkedinVisit`, `linkedinLikeLastPost`, `linkedinInvite` (delay 1, the connect note text
sits in **`altMessage`** not `message`), then `linkedinWithdrawInvitation` at delay 30.

**So v0.1 has no message step at all.** Every real message we have ever sent went out by
hand from the inbox. That single fact explains why lead `state` never reaches
`linkedinSent`, and why the campaign has no idea who we have actually pitched.

---

## 4. Leads. `search_campaign_leads` and the export

### 4.1 `search_campaign_leads`, the cheap row

Returns `_id` (`lea_...`), `campaignId`, `firstName`, `lastName`, `companyName`,
`jobTitle`, `linkedinUrl`, `createdAt`, at roughly eighty tokens. Paging via `offset` /
`nextOffset` / `hasMore`.

**It does NOT return `state`, `contactId`, or `companyDomain`.** For those, use the
export. This is worth knowing before spending pages on it.

### 4.2 The lead export, the rich record

`GET /api/v2/campaigns/<campaignId>/export/leads?state=<state>&format=json`

**`state` is effectively required. Without it the response is an empty array**, verified
twice. There is no "give me every lead with its state" call on this endpoint.

Fields, with the `experience1..37`, `school1..8` and `language1..8` scaffolding left out.

| Group | Fields |
|---|---|
| **Identity** | `_id` (leadId), `firstName`, `lastName`, `cleanFirstName`, `fullName`, `linkedinUrl`, `leadLinkedinUrl`, `picture`, `leadLogoUrl`, `title`, `jobTitle`, `jobTitles`, `jobDescription`, `seniority`, `yearsOfExperience`, `connectionCount`, `location`, `country`, `timezone`, `languages`, `summary`, `tagline`, `industry`, `leadIndustry` |
| **Company** | `companyName`, `companyDomain`, `companyWebsite`, `companyWebsiteUrl`, `companyLinkedinUrl`, `companyIndustry`, `companyType`, `companySize`, `companyLocation`, `companyCountry`, `companyDescription`, `companyFounded`, `companyFoundedOn`, `companyFoundedYear`, `companyLogoUrl`, `companyPicture`, `employeesCountGrowth` |
| **Sequence position** | `state`, `stateSystem` |
| **Derived / AI** | `isASaaSCompany`, `businessBusinessCustomer`, `findCompanyLatestNews` |

**Three website fields, not one.** `companyDomain`, `companyWebsite` and
`companyWebsiteUrl` all appear. Check all three before concluding a lead has no site.

**`companyFounded`, `companyFoundedOn` and `companyFoundedYear` are three separate
fields** too. Same rule.

### 4.3 The `state` enum, probed on 2026-09-21

Every value below was probed against v0.1 and the count is what came back.

| `state` | Leads | `stateSystem` | Meaning |
|---|---|---|---|
| `linkedinWithdrawInvitationDone` | 326 | `done` | Invitation sent, never accepted, pulled back after 30 days |
| `linkedinInviteDone` | 298 | `inProgress` | Invitation sent, waiting |
| **`linkedinInviteAccepted`** | **225** | 120 `done`, 105 `inProgress` | **Accepted and parked here. This is the pool to work** |
| `paused` | 96 | `paused` | Lead halted |
| `linkedinLikeLastPostDone` | 23 | `inProgress` | Early in the sequence |
| `linkedinVisitDone` | 0 | | Returns empty, nobody parked here |
| `linkedinSent` | 0 | | **Empty, because v0.1 has no message step** |
| `linkedinReplied` | 0 | | Empty for the same reason |

`stateSystem` observed values: **`done`, `inProgress`, `paused`**.

**Two things this table proves.**

1. **`state` is the CURRENT position, not history.** 225 leads are parked at accepted
   while 320 acceptance events exist. Anyone who accepted and then moved on is not in
   that bucket. **Never read a state bucket as "everyone who ever did X".**
2. **Repliers are split across buckets.** Checked by name against the four biggest
   buckets on 2026-09-21. Niklas Hanf, Floris Otterman and Michael Barthel sit in
   `paused`. Kate Phipps-Wiltshire, Alex Temprell, Denis Neubauer and Olivier Oomen sit
   in `linkedinInviteAccepted`. All seven replied. **So no single state finds everyone
   who has replied**, and the buckets are mutually exclusive, zero overlap.

---

## 5. Contacts and companies

### 5.1 Two different field lists for the same entity, and neither is complete

This is a real trap. **`get_contact_fields_schema` and `GET /api/fields?entity=contact`
disagree, and each omits fields the other has.**

| | `get_contact_fields_schema` | `GET /api/fields?entity=contact` |
|---|---|---|
| Default fields | 10 | 22 |
| Has `companyName`, `status`, `createdAt` | **yes** | **no** |
| Has `doNotContact`, `unsubEmail`, `unsubPhone`, `unsubLinkedin` | **no** | **yes** |
| Has `ownerId`, `companyId`, `jobDescription`, `skills`, `summary`, `tagline`, `industry`, `languages`, `location`, `timezone`, `picture` | no | yes |
| Custom fields | 23 | 23, plus `source: "crm_synced"` entries |
| `csvImportTargets` | 36, for `columnMapping` | not present |
| `relations` | notes, activities, campaigns | not present |

**So call both when the question is "what can this entity hold".** The four unsubscribe
and do-not-contact flags only appear in the second, and they are the ones that decide
whether a person may be contacted at all.

### 5.2 `search_contacts`

| Field | Meaning |
|---|---|
| `id` | `ctc_...`, what `send_message` needs |
| `fullName`, `firstName`, `lastName` | **Surnames are often abbreviated to an initial** |
| `email` | Usually empty on LinkedIn campaigns |
| `jobTitle`, `linkedinUrl`, `phone` | |
| `ownerId`, `statusId`, `companyId` | `companyId` is `cpn_...` |
| `createdAt` | |
| `unsubscribed` | Boolean |
| **`campaignCount`** | **How many campaigns this contact is in. Zero means they are a contact but not in any campaign** |
| `fieldRejections` | Enrichment rejections |

### 5.3 Custom fields on this team, 23 of them

Two written by our own pipeline, `howLongAgoBusinessWasCreated` and `websiteAnalyses`.
Eighteen `signalLinkedinKeywords*` fields from a Signal Agent, covering the matched post,
its creator, the keywords and the location. Two `lastSignalData_wat_*` fields keyed to a
watchlist id. The enrichment pipeline also writes `connectionMessage` and `firstMessage`,
which are created on first write rather than pre existing.

### 5.4 Company entity, `GET /api/fields?entity=company`

`name`, `domain`, `linkedinUrl`, `linkedinUrlSalesNav`, `industry`, `subIndustry`,
`location`, `headquarters`, `size`, `employeeCount`, `employeeGrowth`, `revenue`,
`specialties`, `technologies`, `tagline`, `type`, `description`, `foundedOn`, `picture`,
`ownerId`.

**Note the naming flip.** On the company entity it is `name` and `domain`. On a contact or
a lead the same things are `companyName` and `companyDomain`. Using the wrong one returns
nothing and looks like missing data.

---

## 6. Activities, the event log

### 6.1 The call

`GET /api/activities?version=v2` with `type`, `campaignId`, `leadId`, `isFirst`,
`offset`, `limit`, `minDate`, `maxDate`, `startDate`, `endDate`.

`version` is required. A `type` value that does not exist returns `{}` rather than an
error, so **a typo in `type` looks exactly like "no such events"**.

### 6.2 Fields on an activity

| Field | Meaning |
|---|---|
| `_id` | `act_...` |
| **`type`** | The event. Enum below |
| **`createdAt`** | When it happened. This is the acceptance timestamp on an accept event |
| `contactId`, `leadId`, `companyId` | The joins |
| `campaignId`, `campaignName` | **`null` on a message sent by hand from the inbox** |
| `sequenceId`, `stepId`, `sequenceStep`, `totalSequenceStep`, `sequenceTested` | Sequence position |
| **`emailTemplateName`**, `emailTemplateId` | **`linkedinInvite` means this is the connect note. This is the only reliable way to tell a connect note from a real message** |
| `message`, `text` | The body. Can be omitted on some records |
| `messageId`, `relatedSentAt` | |
| `sendUserId`, `sendUserName`, `userId`, `userName`, `createdBy` | Who sent it |
| `leadFirstName`, `leadLastName`, `leadCompanyName`, `leadPicture`, `lead` | Denormalised lead copy |
| `conditionKey`, `conditionLabel`, `conditionValue`, `newSequenceId` | On a `conditionChosen` event |
| `linkedinPostUrl` | On a like event |
| `inviteSkipReason`, `likeLastPostSkipReason` | Why a step was skipped |
| `aiLeadInterestScore` | lemlist's own read of a reply. A priority hint, never evidence |
| `lemlistSeenAt`, `isFirst`, `bot`, `paused`, `stopped`, `teamId`, `name`, `metaData`, `attachments`, `sentOutSideOfLemlist`, `sentOutSideOfLemlistOpenedAt` | |

### 6.3 Activity `type` values observed in our own data

**An unfiltered sample of 500 records**, pulled at offsets 0, 400, 1200, 2500 and 4000 so
a single page could not skew it. These proportions are unbiased. The counts are the
sample, not the campaign total.

| `type` | In 500 | What it means |
|---|---|---|
| `conditionChosen` | 104 | A branch was taken |
| `linkedinVisitDone` | 102 | Profile visited |
| `linkedinInviteDone` | 80 | Invitation sent |
| `linkedinLikeLastPostDone` | 62 | Post liked |
| `linkedinLikeLastPostNoPost` | 35 | Nothing to like |
| `linkedinSent` | 31 | A message went out |
| `linkedinWithdrawInvitationDone` | 30 | Invitation pulled back |
| `linkedinOpened` | 27 | |
| **`linkedinInviteAccepted`** | 16 | **They accepted. The event the pipeline missed** |
| `linkedinReplied` | 5 | They replied |
| `paused` | 4 | |
| `linkedinLikeLastPostSkipped` | 4 | |

**This is what OUR campaign has produced, not lemlist's full enum.** An email or SMS
campaign would produce types not in this list. Treat the absence of a type here as "we
have not seen it", never as "it does not exist".

### 6.4 How reliable this endpoint is, which depends entirely on the type

This is the nuance that a blanket "it under reports" was hiding. Two targeted pulls, both
paged to exhaustion.

| Filtered pull | Records returned | Cross check | Verdict |
|---|---|---|---|
| `type=linkedinInviteAccepted` | **320** | `channelMetrics.linkedinInvitationAccepted` is **320** | **Exact match. Reliable for acceptances** |
| `type=linkedinSent` | 298 | The 2 August messages to Naila, Olivier, Jean and Marlon are **missing**, although their threads carry them with that same campaign id | **Under reports. Not reliable for sends** |

**So use it to find who accepted, never to decide who has been messaged.**

**And what those 298 `linkedinSent` records actually are**, which matters because they
look like a list of people we have pitched and mostly are not.

| Breakdown of the 298 | Count | How to tell |
|---|---|---|
| Connect notes | **260** | `emailTemplateName: "linkedinInvite"` |
| Real researched messages | **38** | **The `emailTemplateName` key is absent entirely**, and the body runs past 200 characters |

All 298 carry a `campaignId`. So **`campaignId` being set does not mean the campaign wrote
it**, and the only field that separates a connect note from a real message is
`emailTemplateName`.

**Do not filter on body length instead.** Spot checked on 2026-09-21, the connect note
records come back with **no `message` body at all**, while the real messages carry theirs
in full. A filter of `len(message) > 200` therefore drops every record whose body was
omitted, which is exactly the bug that produced a false all clear during the duplicate
send audit that same morning.

**The acceptance pull was checked a second way**, by counting unique ids rather than rows.
320 records, 320 unique `_id`, 320 unique `contactId`. No duplicates inflating it, and an
exact match with `channelMetrics`.

---

## 7. The inbox

### 7.1 `get_inbox_conversations`, the list

`listId` takes `sentOnly` or `myConversations`. Also `search`, `dateFilter` with `from`
and `to`, `campaignFilter.in`, `limit` (max 50) and `page`. There is no `offset`.

| Field | Meaning |
|---|---|
| `id` | `ibx_...` |
| **`contactId`** | What `send_message` needs |
| `contactName` | **Abbreviated surnames appear here** |
| `contactLinkedinUrl` | The reliable join key to the lead record |
| `contactEmail` | Usually null |
| `lastActivityAt` | Latest event of any kind |
| `lastSentAt` | Our last outbound. **Null means nothing was ever sent** |
| `lastRepliedAt`, `lastRepliedChannel`, `lastRepliedMessagePreview` | Their last inbound |
| **`lastSentMessagePreview`** | **Do not trust it. See section 8** |
| `channels` | |
| `isYourTurn` | Whether they are waiting on us |

**It returns no company and no job title at all.** That is why batches get picked from the
lead list and never from the inbox list.

### 7.2 `get_inbox_conversation`, the thread

Takes `contactId`. Returns `activities` newest first plus pagination. Each activity
carries the full `message`, its `type`, `createdAt`, `campaignId` and `messageLength`,
plus `messageTruncated` and the `aiLeadInterest*` fields.

**This is the only reliable source for what a thread contains.** Per contact, no bulk
alternative.

**An empty `activities` array is ambiguous**, because the connect note is not always
written as an activity. Empty means unknown. It only becomes usable as a negative once a
positive control has been pulled in the same session, a thread with a known send that
comes back full.

### 7.3 Sending

`send_message` with `contactId`, `channel: "linkedin"`, `sendUserId: usr_27bdxG7jzTn2rucGB`.

Two refusals, and they mean different things.

| Error | Meaning |
|---|---|
| `Failed to send linkedin message [can-not-send-message]` | An invitation was sent and not accepted |
| `Failed to send message. Lead is not connected.` | No connection exists at all |

Before drawing either conclusion, confirm `get_user_channels` shows
`linkedin.connected: true` and that the campaign's invite step is still firing today.

---

## 8. The traps, every one of which has already cost something

1. **`lastSentMessagePreview` lies.** On 2026-09-21 it showed the generic connect note for
   Daniel Turner at the exact second a full researched opener went out. It did the same
   for Carolien Leeraar, Andy Tidd and Patrick Killeen. Any claim about a thread needs
   `get_inbox_conversation`.
2. **The activities endpoint is reliable for acceptances and NOT for sends.** Section 6.4.
   `type=linkedinInviteAccepted` returns exactly the 320 that `channelMetrics` reports.
   `type=linkedinSent` silently omits real messages. Its silence about a send is not
   evidence.
2b. **`campaignId` being set does not mean the campaign wrote the message.** All 298
   `linkedinSent` records carry one, and 260 of them are connect notes.
   **`emailTemplateName: "linkedinInvite"` is the only safe way to tell them apart**, and
   the key is absent entirely on a real message rather than being null.
3. **A `state` bucket is a current position, not a history.** 225 parked at accepted
   against 320 acceptance events.
4. **No single `state` finds everyone who replied.** Verified, repliers sit in both
   `paused` and `linkedinInviteAccepted`.
5. **`leadMetrics.opened` is not an email open on a LinkedIn campaign.** It is the
   acceptance count. A `openedPercentage` above 100 is the tell.
6. **`interested` and `notInterested` are manual tags and are both zero.** They are not a
   reply signal.
7. **Surnames are abbreviated.** `search_contacts(search: "Kouidri")` returns nothing for
   a person whose thread is live, because lemlist holds "Naila K.". Six of 225 leads in
   one bucket have an initial for a surname. **Key on `contactId` or `linkedinUrl`.**
8. **The export needs `state`.** Without it you get an empty array, which reads like
   "no leads" rather than "you forgot a parameter".
9. **Three website fields and three founded fields.** Check all of each before writing an
   absence claim.
10. **`name`/`domain` on a company, `companyName`/`companyDomain` on a lead or contact.**
    The wrong one returns nothing and looks like missing data.
11. **Two contact field lists that disagree.** Section 5.1. The unsubscribe and
    do-not-contact flags only appear in `GET /api/fields?entity=contact`.
12. **A campaign's own record cannot tell you who we have pitched**, because v0.1 has no
    message step and every real message is a manual inbox send with `campaignId: null`.
13. **An invalid `type` on the activities endpoint returns `{}`, not an error.** A typo
    looks like no data.
14. **`call_api` refuses endpoints a dedicated tool covers** and names the tool. That is a
    redirect, not a failure.
15. **`search_campaign_leads` returns newest first**, and the newest rows are bulk imports
    whose invitations are still pending. Work the older end.
16. **Oversized responses go to a file** under `tool-results/`. Parse with `jq` in bash.
    Never page them through the conversation.

---

## 9. What is still open, stated rather than rounded off

**The lead `state` buckets do not sum to the campaign total.** The six states probed
account for 968 leads against `leadMetrics.total` of 1499, leaving **531 unaccounted**.
Those leads are in one or more states not yet probed. The candidate names come from the
step types and the activity types, so the next probes to run are
`linkedinLikeLastPostNoPost`, `linkedinLikeLastPostSkipped`, `conditionChosen`, and
whatever lemlist calls a lead that has not started. **Until that arithmetic closes, do not
claim this section lists every state.**

**The full lemlist activity type enum is not exposed.** Section 6.3 is what our campaign
has produced. An invalid type returns `{}` rather than a list of valid ones, so the enum
can only be built by observation.

**Three different numbers describe "messages sent" and they have not been reconciled.**
`messageMetrics.sent` says **167**. The `type=linkedinSent` activity pull returns **298**,
of which 260 are connect notes and 38 are real messages. The `linkedinInvite` step's own
counters read `invited: 946` and `sent: 1113`. Four counters, four answers. Until this is
worked out, **quote `channelMetrics.linkedinInvitationAccepted` for acceptances, because
that one reconciles exactly, and count real messages by pulling threads rather than by
trusting any of these.**

**`meetingBooked` is zero and may simply not be wired up.** Untested whether it would
populate.

---

## 10. Refreshing this file

Re run the calls, do not edit from memory. The counts change daily and the shapes rarely
do, so **the shapes are what to trust and every figure gets re fetched before it is
quoted.** Anything that changes gets corrected here in the same session it is found, with
the date, because a stale index is worse than no index.

The calls, in the order they were made to build this:

```
load_skill(skillName="api-reference")
get_contact_fields_schema
GET /api/fields?entity=contact
GET /api/fields?entity=company
get_campaigns
get_campaigns_stats(campaignIds=[...])
get_campaign_sequences(campaignId=...)
GET /api/activities?version=v2&campaignId=...&limit=100&offset=0,400,1200,2500,4000
GET /api/v2/campaigns/<id>/export/leads?state=<each state>&format=json
search_campaign_leads(campaignId=..., limit=3)
search_contacts(search=...)
get_user_channels
get_inbox_conversations(listId=..., dateFilter=..., limit=50)
get_inbox_conversation(contactId=...)
```

## Per lead activity history misses inbox sends (2026-09-25)

`GET /api/activities?version=v2&leadId=...` for Chris Burton (lea_BW4i5WDfgGc5nM5PL) and
Stephanie De Decker (lea_fjLaPtXKKyu6Az7pc) returns the connect note, the acceptance and the
profile visit, and NOT the 21 Sep opener that `get_inbox_conversation` shows in both threads
(act_L7iWyYajF4yNgjMte, act_xW69t23ffP3o8w3CY, both `campaignId: null`). A message sent from
the inbox is not attached to the lead. So this endpoint can confirm a send, it can't rule one out.
