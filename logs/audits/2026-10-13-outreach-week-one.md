# Outreach audit, week one of the new plan, 5 to 13 October 2026

Asked by Raka on 13 Oct, "a full audit ... what people say, what people don't do ... what's successful in our
outreach and what's not ... messaging ... targeting". His own two notes, "I should have qualified on budget more"
and "when I said ... I would suggest to do something ... works quite well".

The report itself is `2026-10-13-outreach-week-one.html`, published at
https://claude.ai/artifact/Fu5gobAPa2wgZHmXbTNAub (private to Raka until he shares it).

## What it rests on, so the 19 Oct read can rerun it

- **LinkedIn threads.** `get_inbox_conversations` with dateFilter 2026-10-05 to 2026-10-13, `myConversations` 32
  and `sentOnly` 296, so 328 conversations. Every one pulled in full with `get_inbox_conversation`, paged to the end,
  0 errors, each message checked against lemlist's `messageLength`. 175 came back empty, mostly invites still
  pending. Empty means nothing recorded, not nothing sent.
- **Every in week message we sent, with its shape and whether it was answered**, is in
  `2026-10-13-week-one-messages.jsonl` (219 rows). The shapes come from `2026-10-13-classify.py`, which runs over the
  raw thread files. "Answered" means the lead wrote back before our next message.
- **Accepts.** `GET /api/activities?type=linkedinInviteAccepted`, 66 since 5 Oct (W1b 31, founders 16, v0.1 11,
  W5 8). That matches `get_campaigns_stats` for the same dates exactly. 453 accepts since 1 Jul were used to tie
  each contact to its campaign, industry and size.
- **Campaign stats, 5 to 13 Oct, Europe/Amsterdam.** Invites W1b 90, W5 43, founders 28, v0.1 2, W1c 0, W4 0 (5
  profile visits). W1c and W4 sequences were read with `get_campaign_sequences` and match W1b step for step, so
  they are starved by the shared 18 a day, not broken.
- **Email.** Gmail threads read in full. Tomatoworld `1a0c952b46ef4aee` (declined 6 Oct, no budget, existing
  website partner), Acquitas `1a11573cab3ea728` (price no 9 Oct, plus two 554 spam rejections from our own
  astraagency.nl server on the cc copies), HotGreen `1a0d2d5971a63502` (waiting on Georgia, check in sent 13 Oct).
  Acquitas call notes in `logs/meetings/2026-10-07-Acquitas-call.md`.

## The headline numbers

| Shape | Sent | Answered | Yes |
|---|---|---|---|
| Sketch opener ("I'd suggest ... Shall I send you a sketch of ...") | 8 | 1 | 1, Chris Hale |
| Template opener ("However ... This causes ... Shall I send you over what ... looks like") | 39 | 3 | 1, Ulrich Steppler |
| Nudge with something new | 10 | 2 | 1, Steven Garratt call |
| Plain bump | 111 | 6 | 0 (3 no, 1 stop, 2 still talking) |
| Build nobody asked for | 4 | 0 | 0 |
| Second angle to an old lead | 5 | 0 | 0 |
| Warm sketch (sent 13 Oct) | 3 | 0 | too early |
| Replies to people who wrote to us | 22 | 6 | 2 calls |

The sketch openers are one or two days old. Every yes is a single person.

## Proposed changes, and whose call each one is

1. Sketch opener as the default for every new accept. Rule change, shown to Raka first.
2. Ask, don't assert, when a gap could be deliberate. Ours, in research.
3. Build only after a yes. Ours.
4. Budget, who signs and timing on every first call, before any proposal. Ours for the brief, Raka's for first step pricing.
5. Two pitches then close, bumps spread over days. Raka's call.
6. Pause founders, give its invites to W1c, decide W4. Raka's call.
7. Two or three linkable Astra case pages, Qualigraf first. Ours to draft, client OK needed.
