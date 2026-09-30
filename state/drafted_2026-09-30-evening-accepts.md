# 2026-09-30 evening. "Check invitations accepted but not researched or sent yet."

## What was pulled

- lemlist acceptance activities for v0.1, 364 unique contacts, matching campaign stats `linkedinInvitationAccepted` 364.
  97 had no worked status in `state/silent_accepted_queue.jsonl`.
- Every one of the 97 threads was pulled per contact with `get_inbox_conversation`.
  - 72 accepted 12 Jul to 2 Sep all carry a real researched message or a full exchange, zero are connect note only.
    Eleven sit at opener plus the 21 Jul auto bump (Salim Saleem, Mark O'Sullivan, Richard Pheifer, Umer Adnan,
    Rakia, Maryn Gerrits, Volker Hollmichel, Etienne Lefebvre, Nikita-Tarass, Dori Adams) or opener only (Febin
    Rahman). Page 2 was read on each to confirm the opener. That's stalled, nudge territory, not Silent accepted.
  - 16 already worked (openers 21 Sep, two closes), the queue status was stale.
  - 9 accepted today, all threads empty. Positive control, Hilde Pol's thread pulled in the same run came back full.
  - 72 + 16 + 9 = 97.
- A fresh acceptance pull from 29 Sep 12 00Z returned 14, the five worked this morning plus these nine. Nothing newer.

## The nine, record check before any fetch

| Lead | lemlist says | Statutory record | Verdict |
|---|---|---|---|
| Scott Bentley, ctc_XTtknHb2Pe827d2AR | Director, ASM Ltd | Asbestos Survey and Management Limited 04454504 (company number from their own footer, fetched past a JS wall). Sole director Dean Hancock, PSC Brufern Holdings (Dean Hancock 75%+). Scott not an officer | Employee. NOT_ICP |
| Mandy Taylor, ctc_odYXYzWf3ZBxEiNfe | Associate Director, CCA Recruitment | CCA Recruitment Limited 06817945, director Samuel Quigley, PSCs Samuel and Sharron Quigley. Her tagline says "Open to Permanent & Interim Roles" | Employee, job hunting. NOT_ICP |
| Peter Lannister, ctc_7GZWG4bkwpkxBp3vg | Construction Director, Staffright | Staffright (Southend) Ltd 10094703 and Staffright Group Ltd 10094327, owned by Jark Ventures Ltd, directors Wingrave and Siedlarska. Peter not an officer | Employee. NOT_ICP |
| Bas ten Hove, ctc_zWjikRrwJbxqpdEZJ | "Managing Director, Glasdiscount.nl (part of Martin Glas Group)" | His own title says group company. Martin Glas trades since 1820 with six branches (martinglas.nl) | Runs a group subsidiary. NOT_ICP |
| Keir Welch, ctc_GE5RbBQJL4AmNMjpQ | Production Director, Direct Access | Direct Access Consultancy Limited 05185023, directors and PSCs Steven and Judith Mifsud. Keir not an officer. The "Founder" in his tagline is a disability football team | Employee. NOT_ICP |
| Nisha Maher, ctc_FcibDBKWvByN8buL5 | Director, EMR | EMR Recruitment Limited 13910319 (22 Gilbert Street, same as EMR), director since 1 Aug 2025, PSC CBSbutler Holdings over 50%. She also owns TRU HR Consultancy Ltd 12128850 and co-owns Epic Moves Group Ltd 17082571 (estate agency, incorporated 10 Mar 2026, no web presence found) | Director of a group owned firm. NOT_ICP for this campaign. Epic Moves is flagged for Raka, not pitched, since she never presented it |
| Mitchell Price, ctc_FvojB9oSk8LijxqKM | Operations Director, Harwood Textiles | Harwood Textiles Limited 04555006, directors and PSCs Claire and Stewart Price. Mitchell not an officer, tagline says "Operations Manager". Same surname, no evidence of the relation, nothing assumed | Employee on the record. NOT_ICP |
| Lynn Melvin, ctc_8pK35SWjGbjzSGK3Z | Director, Halliday Fraser Munro | HFM Limited SC312492 (number in their own footer), directors David and John Halliday, PSC John Halliday 75%+. Not an officer there, nor of HFM (Properties) SC146348 or HFM (Ireland) NI030473 | Title only. NOT_ICP |
| Ramona Hendriks, ctc_hfHQfM3u3veSXZgS2 | Algemeen directeur, Woonwinkel Schijndel. Tagline "Mede-eigenaar, Negentien80 B.V." | Woonwinkel team page "Ramona, Eigenaar" beside "Kenneth, eigenaar". Negentien80 N80 page "Ramona Mede-eigenaar, back-office". KVK 73399779 per North Data, directors behind the paywall | Owner of both. Full research below |

---

## Ramona Hendriks, Negentien80. OPENER. ctc_hfHQfM3u3veSXZgS2

```gate
lead: Ramona Hendriks, co owner of Negentien80 B.V. (KVK 73399779, Molendijk-Zuid 18 Schijndel) and owner of Woonwinkel Schijndel, ctc_hfHQfM3u3veSXZgS2, lea_58Rzb5QLBdGP4fhDE. lemlist jobTitle "Algemeen directeur", companyName Woonwinkel Schijndel, tagline "Mede-eigenaar | Negentien80 B.V.". https://negentien80.nl/n80/ lists "Kenneth Mede-eigenaar, stofferingsspecialist, Ramona Mede-eigenaar, back-office", https://woonwinkelschijndel.nl/team/ lists "Ramona - Eigenaar". North Data has KVK 73399779 at both Boschweg 80 and Molendijk-Zuid 18 and calls it wholesaler for De Woonwinkel B.V. The WordPress sample post on negentien80.nl is signed r.hendriks@negentien80.nl, so she runs that site herself. The message is about Negentien80, the business she co-owns
site pass 1: 74 pages, tools/crawl.py on https://negentien80.nl, 61 from the sitemaps plus links, 72 at 200 and 2 at 404 (xmlrpc), every page read
site pass 2: 124 pages, all 74 pass 1 URLs again plus their aliases by a second path, a Chromium session that passes the SiteGround wall (curl_cffi was walled on 36 of 74, so that run was discarded), 124 URLs including the ?p= aliases and cart, checkout and my-account, 122 at 200, 2 at 404, 0 walled. Woonwinkel Schijndel read the same way, 21 URLs, 19 at 200. Screenshots, tools/site-audit.js said RENDER NOT TRUSTED on both, so both were shot again through the wall passing session, desktop 1366 and mobile 420, 9 Negentien80 pages, every image decoded on desktop, looked at. Woonwinkel was walled on every screenshot attempt, so no visual claim about it is made
deep analysis: a Qode theme WordPress site launched in 2026, nav N80, N80 Full-service, Collectie, Full-service dealers, Contact. The N80 page's own timeline says "2022 ... gordijnencalculator ... in een zevental stappen de prijs van jouw gordijnen ... super makkelijk en snel via onze website" and "2026 ... eerste prioriteit, een nieuwe website. Ja! Deze website". The full service page still sells "Makkelijke rekentool" and "Sample service". Across all 124 URLs there's no calculator, no sample request, no fabric pages and only one form that matters, the contact form. The Wayback Machine lists the old site, a working calculator per fabric in Aug 2022 (https://web.archive.org/web/20220818192219/https://negentien80.nl/Gordijnencalculator/gordijnstoffen-product/obidos/ , choose code, plooi, rail, zoom, sizes, "Totaal incl. btw", "Plan inmeetafspraak", and a sample form "doorgestuurd naar een dichtstbijzijnd verkooppunt"), a dealer portal, sample pages and 311 fabric code pages. In the same Chromium session today, /gordijnencalculator/, /Gordijnencalculator/, /dealer-portal/, /sample-aanvragen/, /verkooppunten/dealers/, /keuzeoverzicht/, /product/albufeira/ and four more old URLs all return 404, control /n80/ 200 and a made up URL 404. The dealer project pages (/portfolio_page/de-woonwinkel/ and 17 more) and 13 blog posts are the theme's demo, lorem ipsum, "ARCHITECTS Qode Interactive", screenshot opened, but no nav page links to them, they're reached by sitemap or search. The business context, the furniture arm Studio. By Negentien80 B.V. was declared bankrupt on 2 Dec 2025, they stopped most wholesale in 2024 and Kenneth told Wonen360 they're back to a small team. So it's a four person business focused on eleven showrooms, careful with money
owner linkedin: route 1 https://www.linkedin.com/in/ramona-hendriks-90935128/ through tools/fetch-walled.py, the auth wall, empty. Route 2 web search, her profile "Mede-eigenaar" at Negentien80 since Jan 2022, before that "Spin in 't web" there from 2019. Route 3 https://woonwinkelschijndel.nl/team/ "Ramona - Eigenaar". Route 4 https://negentien80.nl/n80/ team block. Route 5 company page https://www.linkedin.com/company/negentien80-b-v/ read, 21 followers, 4 employees, "EEN MERK VOLOP IN ONTWIKKELING". Route 6 Instagram negentien80 via tools/social-audit.js
contact linkedin: co owner Kenneth Havinga, https://www.linkedin.com/in/kenneth-havinga-b0a4513b/ walled, read through Wonen360 13 Aug 2025 "Kenneth Havinga 20 jaar directeur Woonwinkel Schijndel", he calls himself owner and says "Inmiddels zijn we weer met een klein team". Woonwinkel company page https://nl.linkedin.com/company/woonwinkel-schijndel 57 followers, 3 employees
google news: tools/news.py nl, "Negentien80" 4 results, Wonen360 and FaillissementsDossier 3 Dec 2025 on the Studio. By Negentien80 bankruptcy, read in full. "Ramona Hendriks" 0. "Woonwinkel Schijndel" 1, the Wonen360 Kenneth profile, read in full. Control Heineken 100
regional news: tools/news.py (Schijndel woonwinkel OR interieur Meierijstad) with the curtain terms 0, (Schijndel) with woonbranche 0, Brabants Dagblad 3 Dec 2025 bankruptcy roundup is the only regional hit
industry news: tools/news.py gordijnen raambekleding branche OR woonbranche 20 results, Wonen360 2026-06-03 Snijder Vloeren adds raamdecoratie, Volkskrant 2025-09-23 on woonwinkels going under, inretail 2024 on online and offline split in raambekleding. Woonbranche omzet 2026 9 results, Wonen360 2026-06-01 growth flattening, 2026-04-07 consumer confidence falling
sources:
1. https://negentien80.nl/ and all 74 pages, read twice
2. https://negentien80.nl/n80/
3. https://negentien80.nl/n80-full-service/
4. https://negentien80.nl/full-service-dealers/
5. https://negentien80.nl/portfolio_page/de-woonwinkel/ (screenshot)
6. https://negentien80.nl/gordijnencalculator/ (404, screenshot)
7. https://web.archive.org/web/20220818192219/https://negentien80.nl/Gordijnencalculator/gordijnstoffen-product/obidos/
8. https://web.archive.org/cdx/search/cdx?url=negentien80.nl/* (927 archived URLs)
9. https://woonwinkelschijndel.nl/ and all 21 pages
10. https://woonwinkelschijndel.nl/team/
11. https://www.northdata.com/Negentien80%20B.V.,%20Schijndel (KVK 73399779)
12. https://www.wonen360.nl/article/9791362/studio-by-negentien80-b-v-failliet/
13. https://www.wonen360.nl/article/9755773/kenneth-havinga-20-jaar-directeur-woonwinkel-schijndel-mijlpaal-met-twee-gezichten/
14. https://www.faillissementsdossier.nl/nl/faillissement/1915685/studio-by-negentien80-b-v.aspx (search result, F.01/25/330)
15. https://www.linkedin.com/company/negentien80-b-v/
16. https://nl.linkedin.com/company/woonwinkel-schijndel
17. https://www.instagram.com/negentien80/ and https://www.instagram.com/woonwinkelschijndel/ (tools/social-audit.js)
18. https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fnegentien80.nl%2F (tools/eu-view.py)
19. https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fwoonwinkelschijndel.nl%2F (tools/eu-view.py)
pains: 6 judged. (1) The 2026 relaunch dropped the curtain calculator, the sample request, the measuring appointment step and every fabric page, the old links show page not found, while the N80 page still says pricing works on the website, costliest because it was the route from a shopper's price to a dealer, hottest because the new website is their stated first priority this year. (2) Theme demo pages live, 18 dealer project pages in lorem ipsum and 13 demo posts, real and visible by search, unlinked from the nav, it belongs inside the same fix. (3) GDPR, from Stockholm 7 first party sbjs cookies (WooCommerce attribution) before a click, no third party trackers except Google Fonts, small. Woonwinkel 0 cookies, clean. (4) Social, Negentien80 Instagram 759 followers, last post 2025-11-04, dormant, Woonwinkel posting 2 days ago, small. (5) Apps, they already run a project app with dealers per the full service page, so no new app pitch. (6) Squad, four people, no build team, no fit
chosen: (1), the costliest and hottest, a tool they built in 2022 and still describe, gone in this year's relaunch
sweep website: https://negentien80.nl all 74 pages read twice, no calculator, no sample request, the old calculator, dealer portal and sample URLs 404 against a 200 control, 18 lorem ipsum project pages and 13 demo posts off the nav. Woonwinkel's site reads well in text, 21 pages, an afspraak button to the contact form, visuals unjudged because walled
sweep gdpr: from Stockholm per tools/eu-view.py https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fnegentien80.nl%2F , 7 first party sbjs cookies before a click and Google Fonts, small. https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fwoonwinkelschijndel.nl%2F 0 cookies, Complianz installed, clean
sweep apps: https://negentien80.nl/n80-full-service/ says project communication already runs through an app and names a rekentool, the public calculator is the gap, it's the chosen angle
sweep social: opened with tools/social-audit.js, Instagram https://www.instagram.com/negentien80/ 759 followers, 154 posts, latest 2025-11-04, dormant. Pinterest negentien80fabrics 139. Woonwinkel Instagram 5,460 latest 2026-09-28, Facebook 6,883, Pinterest 165. LinkedIn company pages 21 and 57. Small, not the angle
sweep squad: https://negentien80.nl/n80/ team is two owners and two fitters, one freelance, no build work, not a squad fit
thread: problem the relaunch dropped the curtain calculator, the old calculator link shows page not found and shoppers get a contact form | cost the eleven showrooms lose the shoppers the calculator priced and passed to them | offer the curtain calculator rebuilt into the new site | link calculator
lead read: Ramona reads that the calculator her own N80 page still describes isn't on the new site and its old link shows page not found, that it costs her eleven showrooms the shoppers it passed them, and gets offered the calculator rebuilt, one thread
claims:
your N80 page says shoppers can price curtains in seven steps on your website, https://negentien80.nl/n80/ read twice 2026-09-30, "Aan de hand van de gordijnencalculator bereken je in een zevental stappen de prijs van jouw gordijnen*. Dit kan super makkelijk en snel via onze website", and "ook voor de consument"
there isn't a calculator on the new site, all 124 URLs of pass 2 searched in raw HTML for calculat, rekentool, configurator and bereken, the only hits are the N80 timeline, the full service page's "Makkelijke rekentool" heading and a calculator icon, no link to any tool, control the same search finds the contact link and the contact form on https://negentien80.nl/contact/
the old calculator link now shows page not found, https://negentien80.nl/gordijnencalculator/ 404 in Chromium 2026-09-30 and screenshotted ("The page you are looking for is not found"), archived live at https://web.archive.org/cdx/search/cdx?url=negentien80.nl/gordijnencalculator* , control https://negentien80.nl/n80/ 200 in the same session
shoppers ready to book a measuring visit, the archived calculator ends in "Totaal incl. btw" and "Plan inmeetafspraak", https://web.archive.org/web/20220818192219/https://negentien80.nl/Gordijnencalculator/gordijnstoffen-product/obidos/
land on a contact form, https://negentien80.nl/contact/ "Contactformulier", the only form on a nav page, pass 2
fine tuning the full service concept this year, https://negentien80.nl/n80/ "2026 Een jaar waarin de focus gaat liggen op het finetunen van ons full-service concept"
your eleven showrooms, https://negentien80.nl/full-service-dealers/ lists 11 dealers, and the N80 page counter "11 Full-service dealers"
passed each shopper's details to the nearest one, the archived sample form "Ik ga ermee akkoord dat mijn gegevens worden doorgestuurd naar een dichtstbijzijnd verkooppunt", https://web.archive.org/web/20220818192219/https://negentien80.nl/Gordijnencalculator/gordijnstoffen-product/obidos/
built the lead routing at Betty Blocks, docs/astra-master-context.md section 2A "automation-driven revenue workflows covering enrichment, scoring, routing and follow-up loops", from https://www.linkedin.com/in/raka-mulya-b92885196
recheck: 2026-09-30, the calculator search rerun on pass 2 raw HTML, the 404s rerun in one Chromium session with a 200 and a 404 control, the Wayback calculator page reopened and read. Opposite tried, the calculator could live behind the dealer login, since the full service page pitches a rekentool to dealers. So the message only talks about the public calculator the N80 page describes for shoppers, and that its old link is dead. It says nothing about dealers losing their tool. The costs line says "can", because shopper numbers aren't visible. Thesis confidence MEDIUM
```

### Ramona, OPENER

```
Hi Ramona, saw Negentien80, looks interesting!

However, your N80 page says shoppers can price curtains in seven steps on your website, yet there isn't a calculator on the new site. This causes shoppers ready to book a measuring visit to land on a contact form, as the old calculator link now shows page not found.

Especially, when you are fine tuning the full service concept this year, the missing calculator can cost your eleven showrooms customers, since it priced the curtains and passed each shopper's details to the nearest one.

I run Astra agency. We build websites and booking tools for brands like Unilever, AXA, Pertamina. I built the lead routing at Betty Blocks, so every enquiry landed with the right person on its own.

Shall I send you over what the curtain calculator looks like?
```

### Flag for Raka

- Their furniture arm went bankrupt in December 2025. The message doesn't mention it and shouldn't. It's why the offer is one tool rather than a site rebuild, and why the €500 floor matters here.
- Nisha Maher co-owns Epic Moves Group Ltd, a London estate agency set up in March 2026 with no website found. Not pitched, because she never presented it and writing about it would read as digging through her filings. Your call.
