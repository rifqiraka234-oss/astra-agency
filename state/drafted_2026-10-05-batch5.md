# Batch 5, 2026-10-05 afternoon. New accepts and replies waiting on us

How it was checked (2026-10-05, about 16:10 UTC):
1. `GET /api/activities?version=v2&type=linkedinInviteAccepted&minDate=2026-10-04` returned 15, of which 11 on 10-05.
2. `get_campaigns_stats` for 2026-10-05: founders 7, v0.1 4, W1b 0, W1c 0, W4 TEST 0, W5 TEST 0. 7 + 4 = 11, both sources agree.
3. 3 of the 11 were handled this morning (Tom Uitzetter, Dan Waterfall-Chapman, Emmanuel Rivière). 8 are new.
4. `get_inbox_conversation` for the 8 new people and the 6 reply threads. Positive control, Emmanuel's thread came
   back with both of today's messages (connect note 08:54, opener 10:35), so the 7 empty threads are real.
   LinkedIn sync status "recent", last synced 15:59 UTC.
5. lemlist record read for all 8 new people (`search_campaign_leads` by leadId).

## The 8 new accepts

| Person | Company | Campaign | Owner check from the lemlist record | Next |
|---|---|---|---|---|
| Bert Christiaens | Views (BE) | founders | Mede-oprichter, owner | Replied twice already, "Yes Raka, love to connect!" and "Recently was in Jakarta!". Researcher running |
| Charlie Garside | Middlemore | v0.1 | NOT an owner. Associate Director, tagline says on maternity leave for 2026 | Closed, nothing to send |
| Noël Poinsignon | IES Ingredients (FR) | v0.1 | CEO, ownership to settle in the register | Researcher running |
| Michaël Abramczuk | Archipel (FR) | founders | Co-fondateur | Researcher running |
| Shirah Mansaray | Themis Crown Advocates (UK) | founders | Partner and co-founder | Researcher running |
| Jamie Vaughan | Restless (UK) | founders | Co-founder | Researcher running |
| Michael Isichei | Arts Care / MIACC (UK) | v0.1 | Trustee at Arts Care, a charity he doesn't own. Founder of MIACC per his summary | Researcher checking MIACC first |
| Florent Dal Ben-Salles | Ades Bootcamp (FR) | founders | Co-fondateur | Researcher running |

## Replies waiting on us

| Person | What they said | Verdict |
|---|---|---|
| Chris Ryalls, ExpoCall | 10-04 "We already have pages for many trades so I don't want you spending a lot of time on a page but I'd be curious to see how your page for hotels would look" | A real ask. Hotel page built and live, delivery message below |
| Jean Claude Adabunu | 10-04 "Wrong time indeed" | Close, short reply below, no more nudges |
| Jennifer K. | 10-03 already has plans for the list and the guides, not looking for support | Close, short reply below |
| Laura Bscher, REVVY | 10-03 clients under NDA, hasn't been an issue | Close, short reply below |
| Vladislav Maslov | 10-03 thumbs up to our closing note | Nothing to send, already closed |
| Sylvia Randazzo | 09-28 asked not to be contacted | DO_NOT_CONTACT, nothing to send, ever |

### Jean Claude Adabunu, ctc_9KQJNwc4mq3WnGufS

CLOSE
```
No problem Jean Claude, I'll leave it there. Good luck with the BIM courses, and if the shop side comes back up later you know where I am.
```

### Jennifer K., ctc_iz4NuH89hLfSS9795

CLOSE
```
Thanks Jennifer, good to hear the list and the guides are already planned, so I'll leave you to it. All the best with Earth Explorer Pro, and enjoy the next trip.
```

### Laura Bscher, ctc_czpdBfKjdtsHLrYtb

CLOSE
```
Makes sense Laura, NDAs come with that kind of client and it's good it hasn't held you back. Thanks for explaining, and good luck with REVVY.
```

### Chris Ryalls, ExpoCall, ctc_k2GNq2p5WKD64TYvx

Live at https://astra-expocall-prototype.netlify.app (Netlify site 72290da2-d499-4669-bb52-78aba84d9d39, deploy
6ac3d17684628e24ce12315f). Checked 2026-10-05 about 16:35 UTC: live HTML 200, 89,639 bytes, sha256
32686cd9d571a3c9e3033dd7f9ce0815e5cc7d5a7a624b0be98f4abbc8eceffd, identical to the file that was QA'd. Title "AI Call
Answering for Hotels | ExpoCall.ai". Team SSO switched off. Cold load in Chromium at 1440 and 390, zero console errors,
zero failed requests, the logo decodes (260px), no horizontal overflow. Thread re-pulled at 16:31 UTC sync, his 4 Oct reply
is still newest.

What is on it. One page in ExpoCall's own trade page layout and colours. Four written example calls for a fictional
hotel (late arrival, rooms next weekend, bringing the dog, table for Saturday) that play turn by turn, each ending with
the note the team reads in the morning. Every call is labelled as a written example and the footer says they aren't
recordings. Product facts only from expocall.ai (homepage, /integrations, /inbound, /pricing-plans/list, app.expocall.ai/demo).
Mews is described the way their integrations page does, launching shortly. Nothing from their hidden draft page
/hotelcallscoringexample was used, it was removed on purpose. The page carries noindex.

The weak spot, flag to Raka. Our 3 Oct nudge said "hear a real call". This page shows written calls, no audio, because
there is no ExpoCall recording we could use. The delivery message says so plainly rather than hoping he won't notice.
Not "I spent the whole day building this" from the delivery skeleton, because he asked us not to spend long and the
line would have to be true.

DELIVERY
```
Chris, here's the hotel page you asked about.

Four calls a small hotel gets on a Friday night, a late arrival, rooms next weekend, a guest with a dog and a table for Saturday. Each one plays out and ends with the note the team finds in the morning.

Try it yourself.
https://astra-expocall-prototype.netlify.app

The calls are written examples for a made up hotel, so drop in a real Alex recording and it's ready to sit next to your other trade pages.

What do you think?
```

### Bert Christiaens, Views, ctc_PypkM4r3QPKkeENR3

Judge verdict NO_STRONG_ANGLE for any pitch (8 pains judged, none passed, full table in the judge file), so this is a
warm reply to "Recently was in Jakarta!" only. Raka's Eten Maar years, Aug 2020 to Dec 2024 in South Jakarta, founded
with five relatives, are in docs/astra-master-context.md section 2A. The country and city are not named, per
docs/astra-company-profile.md. Raka, change "a good few years" if you would put it differently. Thread re-pulled by
the judge, 2 items, both his.

REPLY
```
Hi Bert, great to connect!

No way, I spent a good few years building a stroopwafel brand there with my family, so it's a place I've got a real soft spot for.

What took you out there, work or travel? I'd love to hear what you made of it.
```
