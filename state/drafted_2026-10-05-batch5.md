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

### Michaël Abramczuk, Archipel, ctc_QZawcREsaQM3pMpPz

Researcher, judge (OPENER, MEDIUM), red team (FIX), fixes applied by the driver. Every fact holds byte for byte: the
references page and all 17 case pages return the homepage file to 8 user agents across 3 hosts, no bot rule, no JSON or
noscript copy. Red team fixes taken: GPTBot dropped (a 30 Sep 2026 dev.to log report says it started rendering JS on
25 Sep), "everything" became "what", block three made singular on Mirakl with no prediction about what an assistant
answers, credential swapped to the B2B SaaS match (Betty Blocks, Aug 2024 to Feb 2026). Known counter, his llms-full.txt
says clients like Mirakl, Keyrus or Hyperline appear in ChatGPT, one line claims do reach crawlers, only the write ups
don't, which is why block two says write ups. Risk, his team already prerenders the blog and could extend it themselves.
Favours if he replies, the 404 LinkedIn handle in his only social button and sameAs, "ARCHEL MARKETING" on both legal
pages, the "Description de la référence" placeholder card. Full files in /tmp/claude-0/agents/b5_michael_a/.

```gate
lead: Michaël Abramczuk, Directeur Général and co founder of ARCHIPEL MARKETING SAS (SIREN 984715995, created 2024-02-12, active, NAF 70.22Z), Edouard Brault Président, both in office since 20/02/2024 per https://recherche-entreprises.api.gouv.fr/search?q=archipel%20marketing and https://www.pappers.fr/entreprise/archipel-marketing-984715995 , beneficial owners restricted. ctc_QZawcREsaQM3pMpPz, lea_AjfjkeBJnAvRH6tLC in cam_Csq9BikBWz7dNqSs4, jobTitle Co-fondateur, tagline and companyName agree, no former or ex. companyDomain archipel-ai.com 307s to https://www.archipelmarketing.com/ , and Mentions légales give SIRET 984 715 995 00028. Thread re pulled 16:41 UTC, 0 activities, sentOnly shows only the 5 Oct connect note, lastRepliedAt null, Archipel search 0, control Timur's thread 4 items in the same minute
site pass 1: 94 URLs by tools/crawl.py (84 from sitemap.xml plus links), all 200, all French, 62 blog posts and 32 other pages, read by the researcher
site pass 2: 94 URLs, second crawl, 93 returned 200 and 1 returned 000 then 200 on retry. Judge rerun today: all 25 non blog sitemap URLs plus 3 llms.txt links and 17 case slugs fetched as Googlebot and GPTBot, and Chromium renders of the homepage, references, Hyperline, Mirakl and pricing with 187 requests served by curl and 0 errors, desktop screenshots, the researcher's desktop 1440 and phone 390 screenshots of the homepage opened
deep analysis: A modern Lovable React SPA on Vercel and Supabase that sells GEO, AI visibility for brands in ChatGPT, Perplexity and Claude, plus paid and SEO, at monthly retainers with a dedicated consultant. The commercial site (homepage, services, team, references page with 17 case studies, pricing) exists only after JavaScript runs. Every non blog URL serves AI and plain crawlers 0 characters of body text, and the references page, 17 cases and pricing serve the homepage file byte for byte. Only the 62 blog posts are prerendered, many of them self ranked top 10 lists with Archipel first. Their own proof page sells on cards like N°1 sur ChatGPT dans son industrie en 3 mois, and none of it reaches GPTBot, ClaudeBot or PerplexityBot
owner linkedin: route 1 curl https://www.linkedin.com/in/michael-abramczuk-aio-geo-expert 999, fetch-walled redirect stub. Route 2 web search, title AIO GEO expert, an older SEA SMA specialist post. Route 3 posts walled. Route 4 company page https://www.linkedin.com/company/archipelmarketing read, 187 followers, old freelance collective About. Route 5 his own words on the site, the audit chatbot voiced as Michaël. Route 6 the lemlist record, Co-fondateur, matches DG on the register. Brault, the Président, was covered through the register and the team page only
contact linkedin: same person as the owner side we message, DG on the register and Co-fondateur in the lemlist headline agree, same six routes
google news: tools/news.py fr, "Archipel Marketing" 1 result (Planète Grandes Écoles 2026-09-25, ranked 6th), "Michaël Abramczuk" 0, control Carrefour 100
regional news: tools/news.py Paris agence GEO 26 results, the 2026-10-05 SEO and GEO Summit and the 2026-10-02 CNEWS partner top 10 of Paris GEO agencies with 0 Archipel mentions against 7 for Eskimoz
industry news: tools/news.py "agence GEO" 79 results, Performics on ChatGPT ads and GEO, plus the Vercel and MERJ study on AI crawler JavaScript rendering, and third party rankings, Archipel 3rd on keyweo and seo-monkey, absent from magicgeo, convertix, classementagencesgeo and agences-geo
sources:
1. https://www.archipelmarketing.com/archipel-nos-references
2. https://www.archipelmarketing.com/archipel-hyperline
3. https://www.archipelmarketing.com/archipel-mirakl
4. https://www.archipelmarketing.com/blog/top-10-agences-geo-france
5. https://www.archipelmarketing.com/llms.txt
6. https://www.archipelmarketing.com/sitemap.xml
7. https://www.archipelmarketing.com/robots.txt
8. https://recherche-entreprises.api.gouv.fr/search?q=archipel%20marketing
9. https://www.pappers.fr/entreprise/archipel-marketing-984715995
10. https://vercel.com/blog/the-rise-of-the-ai-crawler
11. https://www.linkedin.com/company/archipelmarketing
12. https://www.linkedin.com/company/archipel-marketing (404)
13. https://www.planetegrandesecoles.com/top-10-des-meilleures-agences-geo-a-paris
14. https://www.cnews.fr/le-corner-partenaires/2026-10-02/top-10-des-meilleures-agences-geo-paris-1927931
15. https://www.keyweo.com/fr/geo/faq/meilleures-agences-geo/
16. https://www.magicgeo.fr/meilleures-agences-geo/
17. https://www.linkedin.com/in/michael-abramczuk-aio-geo-expert (999, walled)
pains: 7 judged. W1 references and 17 case studies served to AI crawlers as the homepage shell, chosen. W2 client count, address, rating and price inconsistencies, copy edits. W3 placeholder card, ARCHEL typo, dead llms.txt links, polish. G1 trackers before consent from Stockholm with Axeptio loading last, a config fix and EU banner visibility unknown. A1 they build their own tools on Lovable. S1 dead LinkedIn handle in the only social button and in sameAs, a one line fix. B1 capacity against 50 to 100 clients, inference only, and they cap intake on purpose
chosen: W1, the costliest and biggest, because AI visibility is the thing Archipel sells and the proof behind it, 17 case studies and the references page, is missing from what GPTBot, ClaudeBot and PerplexityBot read on its own site, and fixing it means prerendering about 30 routes across several templates
sweep website: https://www.archipelmarketing.com/archipel-nos-references and all 17 case pages hash identical to the homepage for GPTBot, ClaudeBot, PerplexityBot and curl with 0 body characters, blog control 28,592, chosen
sweep gdpr: tools/eu-view.py from Stockholm on https://www.archipelmarketing.com shows _ga, _gcl_au and HubSpot cookies before a click, OpenAI pixel and GTM in the head with Axeptio last in the body, a config fix, not chosen
sweep apps: four audit simulators, a diagnostic and a client dashboard built in house on Lovable and Supabase, https://www.archipelmarketing.com/diagnostic-geo , they're builders, nothing to sell
sweep social: tools/social-audit.js and tools/fetch-walled.py on the handle in their own HTML, https://www.linkedin.com/company/archipel-marketing 404 while /company/archipelmarketing returns 200 with an outdated freelance collective About, a one line fix, not chosen
sweep squad: 9 on https://www.archipelmarketing.com/qui-sommes-nous , 5 consultants for 50 to 100 claimed clients, but his summary says nombre limité de clients, no hiring or backlog fact, not proven
thread: problem the references page and all 17 case studies reach ClaudeBot and PerplexityBot as a copy of the homepage shell | cost the case behind Mirakl reaching number one on ChatGPT is a page Claude and Perplexity can't read | offer the crawlable case studies page | link case, studies
lead read: Michaël reads that his references page and 17 case studies reach ClaudeBot and PerplexityBot as a copy of his homepage, so the case write ups behind his results are missing from what they read on his site, that this matters most because his references sell on Mirakl reaching number one on ChatGPT in three months, and gets offered case studies those crawlers can read, one thread
claims:
your references page and all 17 case studies reach GPTBot, ClaudeBot and PerplexityBot as an exact copy of your homepage shell, https://www.archipelmarketing.com/archipel-nos-references and the 17 /archipel-* slugs fetched with GPTBot/1.1, ClaudeBot and PerplexityBot UAs, every response sha256 3b399e3b17, identical to https://www.archipelmarketing.com/ , rechecked 16:50 UTC
17 case studies, https://www.archipelmarketing.com/archipel-nos-references rendered in Chromium shows 17 "Voir l'étude de cas" links, rechecked 16:52 UTC
the case write ups are missing from everything those crawlers read on your site, the shell's only text is the generic noscript blurb naming no client, https://www.archipelmarketing.com/llms.txt names no client and lists three anonymous cases, https://www.archipelmarketing.com/sitemap.xml lists none of the 17 case pages, rechecked 16:48 UTC
Mirakl reaching number one on ChatGPT in three months, https://www.archipelmarketing.com/archipel-nos-references Mirakl card text "N°1 sur ChatGPT dans son industrie en 3 mois", rendered 16:52 UTC, the only card with 3 months per the red team
Betty Blocks credential, docs/astra-master-context.md section 2A, Global GTM and Campaign Manager, Betty Blocks, Aug 2024 to Feb 2026, https://www.bettyblocks.com
ClaudeBot and PerplexityBot don't run JavaScript, https://vercel.com/blog/the-rise-of-the-ai-crawler (published 2024-12-17, so dated) plus 2026 sources found by the red team; GPTBot dropped from the message because a dev.to report of 2026-09-30 says GPTBot began rendering JS on 2026-09-25
recheck: 2026-10-05 16:41 to 17:00 UTC, thread re pulled, all 17 case slugs and the references page re hashed as GPTBot, Chromium render with 0 curl errors confirmed the content is client side, the blog control full. Thesis confidence MEDIUM, what the crawlers receive is proven byte for byte, but whether he'd pay us rather than extend his own blog prerender is the open question
```

OPENER
```
Hi Michaël, saw Archipel, looks interesting!

However, your references page and all 17 case studies reach ClaudeBot and PerplexityBot as an exact copy of your homepage shell. This causes the write ups behind your client results to be missing from what those crawlers read on your site.

Especially, when you are selling on Mirakl reaching number one on ChatGPT in three months, the case that shows how you did it is a page Claude and Perplexity can't read.

I run Astra agency. We build websites and product pages for brands like Unilever, AXA, Pertamina. I managed global go to market and messaging for Betty Blocks, a B2B software platform that's the same kind of company as most of your clients.

Shall I send you over what the crawlable case studies page looks like?
```
