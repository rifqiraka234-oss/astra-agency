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
| Chris Ryalls, ExpoCall | 10-04 "We already have pages for many trades so I don't want you spending a lot of time on a page but I'd be curious to see how your page for hotels would look" | A real ask. Hotel page being researched and built, delivery message to follow |
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
