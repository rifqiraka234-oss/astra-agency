# Red team, Frank Hemmert, baked. (ctc_CLQ5T3DEaeG2SMG9d), 2026-10-06 21:17 to 21:30 UTC

## Verdict: FIX. The corrected opener is applied in state/drafted_2026-10-06-accepts.md, and check-drafts.py exits 0

The thread was pulled again at 21:21 UTC. totalItems 0, nextPage null, lemlist sync "recent" 21:17. Positive control ctc_JYWKs8LSRDxAreesA came back in the same minute with totalItems 10. Nothing has been sent, so it's still safe for an opener.

| Sentence or claim | What I opened (URL, method, time) | Verdict | Why |
|---|---|---|---|
| "no posts from mid April to late September" | https://www.instagram.com/getbaked.berlin/embed/ by curl with the short UA, 21:22 UTC, parsed the JSON myself. Control mubiscookies.official in the same minute | HOLDS | 95 followers, 33 posts. Newest six are 2026-09-22 18:58, 18:57, 18:51, then 2026-04-18, 04-17, 04-16. The control returned 2026-10-04 to 09-29 in date order, so the embed sorts by date and doesn't skip posts. `pinned_for_users` is empty on all six, so no pinned post is pushing things out of order. Nothing after 22 Sep. All six are GraphImage and none is a video. Third party viewers (imginn, picnob, piokok, pixwox, dumpor) are Cloudflare walled or 520. web_profile_info returns 400. Google site:instagram.com found nothing. Gap is 18 Apr to 22 Sep |
| "the Pumpkin Spice and Chai cookies in your shop aren't on it" | /store raw HTML, curl 21:22 UTC. ig_grid.png opened. Embed captions | WEAK, FIXED | They're in the store right now: Pumpkin Spice, Chai & Pecan, and Chai, Orange & Dark Chocolate, none sold out. The 22 Sep triptych shows peanuts, the Peanut Inferno jar and a chili. But "aren't on it" covers all 33 posts and we can only read 6. The hero photo shoot is dated 17 Oct 2025 (PXL_20251017) and crt.sh shows certificates from April and November 2025. So the 27 older posts go back to autumn 2025 and could include a Pumpkin Spice post. We can't prove that absence. Now reads "nothing since has shown your Pumpkin Spice and Chai cookies", which we can prove because only three posts come after 18 Apr and all three are Peanut Inferno |
| "the one place people find a pickup only bakery" | evidence gplace.png, Google profile (5.0, 1 review, Caterer), the site, TikTok | WEAK, FIXED | Overreach. They also have Google Maps and the shop site. Now reads "This causes the people who'd order from you to miss your new flavours while they're on sale." That's inference, and it follows from the facts |
| "bringing out new flavours every season" | crawl pass2 text, raw /store | WEAK, FIXED | "Every season" is a stronger verb than they use (RULES 1B). Their own words are "My flavours come and go, like seasons" (/goods, /bakery), "everyday staples and seasonal specials" (/forcafes), and "Pumpkin spice season is officially here" (product page). Now reads "selling flavours that come and go with the seasons" |
| "the feed is where Berlin decides which cookies to pick up" | n/a | WEAK, FIXED | A grand claim with nothing behind it. Now block three grows the block two problem, "the quiet months turn into flavours people never see before they're gone" |
| Credential "I built a stroopwafel brand from zero and ran all its content" | docs/astra-master-context.md 2A | WEAK, FIXED | The record says "Founded and scaled a stroopwafel brand from zero with five relatives" and "Owned ... content". A bare "I built" drops the five relatives. Now reads "I built a stroopwafel brand from zero with my family and ran its content" |
| "We build social media and branding for brands like Unilever, AXA, Pertamina" | docs/astra-company-profile.md lines 65 to 97, docs/partner/amwisesa-credentials.md project table | FALSE by implication, FIXED | Unilever's delivered work was a web and app platform plus the Bango app. Pertamina's was a drilling calculator. AXA appears only on the client list. Nothing we delivered for them was social or branding. Social and branding shows up only as a deck package and in Raka's own freelance work (Gudang Garam, Maxime). Now reads "We build websites and apps". The social credibility comes from the Eten Maar line |
| Block five "the Baked Instagram that fills your pickup orders" | read | HOLDS | Names the bigger result, not a small fix. The link word "Instagram" appears in block two and block five |
| Tone and wording | read aloud | HOLDS | Plain and not technical. Nothing in it reaches beyond what their public accounts show. No colons, no dashes, one exclamation mark. Contractions are who'd and they're (twice). 129 words |
| Reader, Frank vs Adélaïde | imprint (both named partners), lemlist Co-Founder, evidence line 148 | HOLDS, with a note | Frank is a named co-owner, so he's a fair reader. Who runs the accounts is UNKNOWN, and nothing proves Adélaïde does. The site is written in her voice ("I am your baker"). The message is about the business, not about who posts, so it reads fine either way, and he can pass it on |

## The corrected opener (now in the drafts file)

```
Hi Frank, saw Baked, looks interesting!

However, your Instagram had no posts from mid April to late September, and nothing since has shown your Pumpkin Spice and Chai cookies. This causes the people who'd order from you to miss your new flavours while they're on sale.

Especially, when you are selling flavours that come and go with the seasons, the quiet months turn into flavours people never see before they're gone.

I run Astra agency. We build websites and apps for brands like Unilever, AXA, Pertamina. I built a stroopwafel brand from zero with my family and ran its content, so I know what a small food brand has to post to sell.

Shall I send you over what the Baked Instagram that fills your pickup orders looks like?
```

Gate changes: the thread, lead read and claims lines were rewritten to match. The "pickup only bakery" claim was removed because the message no longer says it. The [xyz] reasoning went into the credential claim line.

**The sentence most likely to get pushback.** "had no posts from mid April to late September". He could have deleted or archived posts from the summer, or posted only Stories, and either would make it feel unfair to him even though it's what a visitor sees now. Also for Raka: "websites and apps" in block four sits slightly apart from an Instagram offer. That was the price of not implying we did social for Unilever.

Before sending: pull the thread again, refetch the embed for any post after 2026-09-22, and refetch /store for the three spice flavours.
