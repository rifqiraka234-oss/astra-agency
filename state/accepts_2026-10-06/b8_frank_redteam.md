# Red team, Frank Hemmert, Baked (Hemmert & Narcy GbR), ctc_CLQ5T3DEaeG2SMG9d, 2026-10-06 19:33 to 19:55 UTC

Read only. Nothing sent, no lemlist writes, no commit. My own fetches are in /tmp/claude-0/agents/b8_frank/rt/.

## Thread and record, pulled first

- `get_inbox_conversation` ctc_CLQ5T3DEaeG2SMG9d returned 0 activities, totalItems 0, nextPage null, LinkedIn sync 19:22:44 UTC. Positive control ctc_JYWKs8LSRDxAreesA pulled in the same minute returned 10 activities. So the empty result can be trusted.
- `get_inbox_conversations` sentOnly "Hemmert" found 1 hit, this contactId, lastRepliedAt null, preview is the generic connect note sent 13:08 UTC.
- `search_campaign_leads` lea_tjmpcyz9Yn3RJYuuv shows one campaign, W1b (running). jobTitle Co-Founder, companyName Hemmert & Narcy GbR, domain get-baked.store, tagline "Data Annotator at DataAnnotation".

## Claims

| Sentence or claim | What I opened (URL, method, time) | Verdict | Why |
|---|---|---|---|
| (1) "your shop's Imprint link opens a missing page" | All 31 sitemap URLs curled 19:35 UTC, every `<a>` legal href pulled. Then Chromium clicks from the home footer with locale de-DE and en-GB, and again after `Weglot.switchTo('de')`. Also tried /de, /de/impressum, /de/imprint, /en/impressum, de. and en. subdomains, and Accept-Language de | HOLDS | Every page's footer anchor is `<a href="/impressum">Imprint</a>`, the /imprint page included. The only /imprint hit in the crawl was that page's own canonical meta tag, not a link. /impressum gives 404 on curl and in all three Chromium clicks, and the screenshot (rt/click_de-DE.png, opened) shows "We couldn't find the page you were looking for". Weglot has a Deutsch option, but it's JS only (href "#", no hreflang, de. and en. have no DNS, /de paths 404), and in German mode the link is still /impressum and still 404. The real page at /imprint is 200 and is linked from nowhere. Controls /imprint 200, example.com 200 |
| (2) "the privacy page still has a placeholder email" | https://www.get-baked.store/data-privacy, curl 19:34 plus Chromium in Weglot German mode 19:50 | HOLDS, narrowly | German block "E-Mail: admin@get-baked.store" is correct. English block "Email: [insert email address]". Both blocks sit on the one page in both modes, so the page does carry it. Frank may answer "the German one's right". The sentence stays true as written |
| (3) "a shop that takes online orders" | /store in Chromium, opened /store/p/honey-sesame, picked "Batch of 6", Add to basket, /cart, Checkout, 19:46 UTC | HOLDS | Cart showed "Honey Sesame, Order: Batch of 6, €10.00". Checkout opened https://www.get-baked.store/checkout?cartToken=..., title "baked. \| Secure Checkout". 16 products, "Order by 15:00 on the previous day" |
| (4) "costly legal warning letters" | https://www.gesetze-im-internet.de/uwg_2004/__13.html and __13a.html, https://www.gesetze-im-internet.de/ddg/__33.html, curl 19:52 | WEAK as written, FIXED | § 13 (4) UWG says a competitor (§ 8 (3) Nr. 1) can't claim its costs for faults in "Informations- und Kennzeichnungspflichten" in e-commerce, which is the Impressum, or for GDPR faults by firms under 250 staff. § 13a (2) bars a penalty clause on a first warning from a competitor to a firm under 100 staff. So a competitor's letter here is mostly toothless on cost. Associations and consumer bodies can still warn and charge, and § 33 (2) Nr. 1 DDG with § 5 (1) carries a fine of up to 50,000 euros for Impressum information missing, wrong or incomplete, which a VAT number of "DE XXXXXXXXXXX" and an unreachable page both are. A GbR is a trader like any other, nothing exempts it. The risk is real. "Costly" overstated it, and a German owner who's read up would know that. Replaced with "to risk legal warning letters and fines" |
| (5a) "adding new flavours" | /store curl, "More flavours coming soon."; Instagram via tools/social-audit.js 19:44 (95 followers, 33 posts, latest 2026-09-22). The captions didn't come through my own embed fetch, so I read them in the researcher's saved embed after my checks: "Meet our Peanut Inferno ... Limited edition" | HOLDS, soft | The store's own line says more flavours are coming, and a new product went out in September. Peanut Inferno is a spiced peanut butter, a festival limited edition, not a cookie flavour. The message doesn't name it, so the sentence rests on the store line and holds |
| (5b) "selling to cafés" | https://www.get-baked.store/forcafes curl 19:34 | HOLDS as direction | "Your friendly neighbourhood supplier for quality cookies and brownies", "I deliver directly to your café". It's a live offer to cafés. No café customer is named anywhere, so it's evidence of the direction, not of volume, and block three only uses it as direction |
| (6) Heineken credential | state/drafted_2026-10-06-simple.md line 246, the approved Melba line; docs/astra-master-context.md 2A as cited in the gate | WEAK tail, FIXED | The approved part, "I was Heineken's global data and insights lead, where data governance was part of the job", is kept word for word. The Melba tail "so I know how to keep your numbers and still ask first" is about tracking consent, which this message never brings up, so reusing it wouldn't fit. The drafted tail "so I know what a shop's legal pages can't leave out" claims imprint law expertise that data governance doesn't back. Narrowed to "so I know what a privacy page can't leave out", which data governance does back and which points at block two's privacy fact. Flagged for Raka |
| (7) Simple, not creepy, block five's bigger outcome | Read aloud as Frank | HOLDS | No jargon, no tool names, no paragraph numbers. Everything named is on his own public pages, and nothing is personal. Block five's "the legally safe Baked shop" is the whole shop made sound, not one patched link, and it fixes block two's two facts. One thread, imprint plus privacy, then legal risk, then a legally safe shop |
| (8) Frank is an owner | https://www.get-baked.store/imprint curl 19:34, lemlist record 19:33 | HOLDS | The English block says "Represented by the partners Ms. Adélaïde Narcy and Mr. Frank Hemmert" and "Content responsibility ... Mr. Frank Hemmert, Sonnenallee 161". The German block names only "Frau Adélaïde Narcy" with a +33 French phone, while the English one gives a +49 number. The firm's name, Hemmert & Narcy GbR, carries his surname, and a GbR's name is its partners. lemlist says Co-Founder. The German block leaving him out is one more defect on that page, not doubt about him. A GbR has no register entry, so there's no statutory record above the imprint. The message is about the shop and never says who bakes, which is right since /aboutme says "a one-woman bakery" |

Writing check, final text. 112 words, inside 95 to 170. No colons, dashes or money figures. One exclamation mark, in block one. Contractions "it's" and "can't" (shop's and Heineken's are possessives). English. `python3 tools/check-drafts.py /tmp/claude-0/agents/b8_drafts.md` exits 0, "PASS every mechanical gate clear".

## Verdict, FIX (applied to /tmp/claude-0/agents/b8_drafts.md, gate thread, claims and flag updated to match)

```
Hi Frank, saw Baked, looks interesting!

However, your shop's Imprint link opens a missing page, and the privacy page still has a placeholder email. This causes a shop that takes online orders to risk legal warning letters and fines.

Especially, when you are adding new flavours and selling to cafés, the more people find the shop, the likelier it's spotted.

I run Astra agency. We build websites for brands like Unilever, AXA, Pertamina. I was Heineken's global data and insights lead, where data governance was part of the job, so I know what a privacy page can't leave out.

Shall I send you over what the legally safe Baked shop looks like?
```

Two changes. "to be open to costly legal warning letters" became "to risk legal warning letters and fines", because § 13 (4) UWG blocks a competitor's cost claim for exactly these faults. "a shop's legal pages" became "a privacy page", because data governance backs privacy and not imprint law.

The sentence most likely to get pushback is "the privacy page still has a placeholder email", since the German half has the right address and Frank may say only the English copy is wrong. It's still true as written.

Before sending, reopen /impressum (404 expected), /imprint (200), /data-privacy ("[insert email address]") and /forcafes, and pull the thread again.
