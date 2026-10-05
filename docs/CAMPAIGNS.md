# lemlist campaigns, the live map (updated 2026-10-05)

Read this before touching any campaign. It is the one place that says which campaign is which, what it is
for, and what state it is in. Re-check status in lemlist (`get_campaign_details`) before acting on it, since
Raka can change a campaign at any time. The filters and the audit trail behind every list are in
`docs/people-db-searches.md`.

## The rules every campaign follows

- **Owners only.** CEO, owner, founder or co-founder at the company the segment is about, because the connect
  note says "I'm a business owner too". Enforced by `tools/owner_title_rule.py`. No Managing Director,
  Directeur, Geschäftsführer, Gérant, Zaakvoerder, Partner or plain "Entrepreneur" on their own. No retired,
  deceased or ex founders.
- **Same sequence as v0.1.** Check 1st degree connection, visit profile, like last post, invite one day later
  with the note below, withdraw the invite after 30 days if not accepted. No follow up messages are automated.
  Every opener after an accept is researched and drafted by hand and only sent on Raka's word.
- **Connect note:** "Hi {{firstName}}, saw your business and thought it was cool 😀 I'm a business owner too!
  Would love to connect and share ideas! ☺️"
- **Schedule:** every day, 07:00 to 21:00 Europe/Amsterdam, 30 minutes between actions.
- **Volume:** LinkedIn daily invite limit is 18 (126 a week), shared by every running campaign. Visits and
  messages are 20 a day. These are account settings in lemlist, the API can't change them.
- **No double contact.** Every lead was added with lemlist's cross campaign dedupe, and an audit found 0
  LinkedIn URLs in two campaigns and 0 shared with v0.1 or v0.2. Keep adding with `deduplicate: true`.
- **Auto review is off** on everything launched, so a campaign only ever sends the leads it was launched with.

## Running now

| Campaign | id | Angle | Who | Leads | Launched |
|---|---|---|---|---|---|
| W1b Owners of new 1-10 consumer businesses on DIY site builders | cam_7gnHSf6GvvGy8gH3n | Website | Founded 2024 to 2026, 1-10 people, consumer facing, site on Wix, Squarespace, Jimdo, Webnode, Strikingly, Weebly or GoDaddy builder | 386 | 2026-10-05 |
| W1c Owners of established consumer businesses on DIY site builders | cam_xFYYBzvfSHk83epvw | Website | Founded 2005 to 2021, 1-50 people, headcount growing 5% or more, consumer facing, still on a DIY builder | 398 | 2026-10-05 |
| W4 TEST 50 Owners of growing agencies and tech firms, Build Squad | cam_iDMXXfaWWg8RkgHpi | Build Squad | 50 random from W4 | 50 | 2026-10-05 |
| W5 TEST 50 Owners of clinics, law and accounting firms, GDPR | cam_BRBXAzzDKMfC4fSCS | GDPR | 50 random from W5 | 50 | 2026-10-05 |
| founders: new businesses with marketing hires | cam_Csq9BikBWz7dNqSs4 | Not set by us | Founders of new businesses hiring for marketing. Created 2026-10-02 in Raka's account, same sequence and connect note as v0.1, not built with the owner rule in `tools/owner_title_rule.py` | 332 | 2026-10-02 |

The founders campaign was not built by the session that built W1 to W5, and its filters are not recorded here.
By 2026-10-05 it had sent 27 invites and had 5 accepts. It shares the same 18 a day. Ask Raka before changing it.

W4 and W5 are tests because those angles were at 0 replies from 12 and 14 sends before this. Compare
acceptance and replies against W1b and W1c around 2026-10-19 before giving them more volume.

## Built, waiting for their wave (DRAFT, launching is Raka's call)

| Campaign | id | Angle | Who | Leads | Wave |
|---|---|---|---|---|---|
| W1a Owners of new 1-10 consumer businesses EU/UK | cam_hq7Dd3EyRZh7SshZq | Website | Founded 2024 to 2026, 1-10 people, hospitality, food and drink, events, online retail, fashion, personal services | 2,073 | 2, when W1b and W1c run low |
| W3 Owners of growing 11-50 ops heavy businesses, apps and tools | cam_Knj6kXngF2PbWfm5Z | Apps and internal tools | 11-50 people, growing 5% or more, manufacturing, logistics, trades, facilities, real estate, events, clinics | 738 | 2, with W1a |
| W2 Owners of new 1-10 B2B service firms NL BE DE UK | cam_mRqYLaLuZfrTXeBqR | Website | Founded 2024 to 2026, 1-10 people, consulting, coaching, design, architecture, engineering, legal, accounting, NL BE DE UK only | 4,127 | 3 |
| W4 Owners of growing 11-50 agencies and tech firms, Build Squad | cam_TfLEo8mTNS46NoSEc | Build Squad | 11-50 people, growing, agencies, design, IT services, software | 2,363 | only if the W4 test earns it |
| W5 Owners of 1-50 clinics, law and accounting firms, GDPR | cam_ncBrkhdhyrSTek7mh | GDPR | 1-50 people, medical practices, legal, accounting, vets | 4,283 | only if the W5 test earns it |

Country set for all of them, unless the row says otherwise: Netherlands, Belgium, Germany, France, United
Kingdom, Ireland, Austria, Switzerland, Luxembourg. W1b and W1c are the clearest website problem (the owner
built the site themselves), which is why they go first. The website angle has the best reply history (18%),
and 1-10 person firms reply best (30%).

## Older campaigns

| Campaign | id | Status | Note |
|---|---|---|---|
| Small Business Owners v0.1 - Outreach Only | cam_PryZp5LuvQv8NznHh | **Paused 2026-10-05** | The original campaign, 1,499 leads. Paused so the new campaigns get the whole daily invite limit. Its accepted backlog is still worked by hand. Restarting it is Raka's call. |
| Small Business Owners v0.2 - Auto Enrichment Pipeline | cam_Co5CJXrpPFf5MRAfD | Paused since 2026-09-16 | 18 leads. Do not import into it or resume it. |

## What happens after an accept

1. Pull the full thread with `get_inbox_conversation` per contact, never a preview or a bulk pull.
2. Read the lemlist record, check the person owns the business (CLAUDE.md, the three places laziness happens).
3. Research to the gate in `docs/RULES.md` and draft the opener from `docs/opener-template.md`.
4. Show Raka, send only on his word, write the status back in the same commit.

## Where to find accepts

`GET /api/activities?version=v2&type=linkedinInviteAccepted&minDate=<ISO>` (call_api, after
`load_skill("api-reference")`), then cross check the per campaign count with `get_campaigns_stats`
(`channelMetrics.linkedinInvitationAccepted`), because the bulk activities endpoint has under reported before.
Then pull every new person's thread with `get_inbox_conversation` and read their lemlist record.
The latest check is in `state/accepts_2026-10-05.md`.

## Timeline

- 2026-10-04: seven segments built, all owners only, loaded and audited (14,468 leads).
- 2026-10-05: schedules set, invite limit 18, v0.1 paused, W1b and W1c launched, W4 and W5 tests built from 50
  each and launched.
- Around 2026-10-19: first read of the tests, decide the next wave.
