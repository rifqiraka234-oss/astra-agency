# nsa09, the AI default angle pass, 2026-10-06. 1 opener drafted (Willem Straat), 7 closed. NOTHING SENT.

Brief, /tmp/claude-0/agents/AI_DEFAULT_BRIEF.md. Evidence files in /tmp/claude-0/agents/nsa/nsa09_ev/.

## What was run

- **8 threads pulled** with get_inbox_conversation, every one nextPage null. Lynn, Willem, Ronald and Marlon came back
  with 0 activities. Rakia, Etienne, Salim and Umer came back with 3 each (connect note, a July opener, the 21 Jul bump),
  which is the positive control for the four empty ones in the same minute. linkedinSync "recent" at 06:14:43Z.
  No replies anywhere. No "do not contact" request, no promise of a last message.
- **8 lemlist records read** with search_campaign_leads by leadId. **The v0.1 campaign cam_PryZp5LuvQv8NznHh shows
  status "paused" on every record today**, CLAUDE.md says it's the only running campaign. Raka's call, flagged.
- **Registers.** Companies House SC312492 officers and PSC. North Data for ReShare Living Group B.V. (98269453),
  Keypro B.V. (87343657), Keypro Holding B.V. (52688844), H & P Interieur B.V. (75529653), the Staatscourant entries via
  oozo for Keypro B.V. and Stichting Dockwize (62110039). schipperbosch.nl for Platowood.
- **Sites.** tools/crawl.py on hooftenpetiet.nl twice, keypro.nl, wealthy-technology.com, arvestwine.com, cowlar.com,
  cowlarventurestudio.com, close-system.com. The single page apps (Wealthy, Arvest, Cowlar, Close System) rendered in
  Chromium with every anchor listed, Arvest's language switch clicked and /team, /pricing, /blog rendered.
- **News.** tools/news.py for company, person, region and industry on the five owners, controls Heineken, Carrefour,
  Tesco all full.

## The count

| Lead | Verdict | In one line |
|---|---|---|
| Willem Straat, Hooft & Petiet (ReShare) | DRAFT_A | H&P's management service promises an inventory check and a report at every resident changeover and bills from those reports every three months, while ReShare promises one way of working for both brands |
| Lynn Melvin, Halliday Fraser Munro | CLOSED_NOT_ICP | Not an officer, John Halliday holds 75%+ |
| Ronald Andriessen, Platowood | CLOSED_NOT_ICP | Hired algemeen directeur, Schipper Bosch owns Platowood |
| Marlon Baarends-Schroevers, Dockwize | CLOSED_NOT_ICP | Directeur-bestuurder of a stichting, nobody owns it |
| Rakia Jaziri, Wealthy Technology | NO_SIGNAL | Sells agentic AI itself, the site is current |
| Etienne Lefebvre, Arvest | NO_SIGNAL | Builds its own AI assisted data platform, already has an EN version |
| Salim Saleem, Close System | NO_SIGNAL | Calls itself AI native, already has KSA, Oman and Arabic, the only gaps are July's website points |
| Umer Adnan, Cowlar Venture Studio | NO_SIGNAL | Sells product build teams itself, the venture studio site is the same gap July raised |

## The things Raka would want to know first

- **Willem's ownership, settled as far as the free register goes.** Keypro B.V. (KvK 87343657) has one bestuurder,
  Keypro Holding B.V. (KvK 52688844), since 17 Aug 2022 per the Staatscourant entry on oozo. Who owns the holding isn't
  public without a paid KvK extract. KeyPro's own press page (16 Oct 2025) and TranslinkCF (23 Oct 2025) both call him
  "founder and co-owner" of KeyPro, with Bas Anneveldt as the other co-owner. TranslinkCF says Hooft & Petiet's
  shareholders SOLD to ReShare Living Group, so his "Mede-eigenaar van Hooft & Petiet" means co-owner through the
  group. ReShare Living Group B.V. (98269453) sits at Rigaweg 12 Groningen, KeyPro's address. Grehamer Invest came in
  as a strategic shareholder in March 2025. So he's a co-owner of a group with an investor, not the sole owner.
- **This overrides the 1 Oct NO_STRONG_ANGLE on new evidence.** The /beheer/ page carries datePublished 2026-08-20, a
  management service for temporary homes that the 1 Oct sweep didn't pick as an angle. The message says nothing about
  the page being new, because I couldn't confirm it on the Wayback Machine (the connection was reset on every try).
- **The risk in his opener.** KeyPro already runs its own client portal (portal.keypro.nl, a login to a custom
  dashboard), so the group has software and somebody to build it. Nothing on hooftenpetiet.nl links to a portal or app,
  and the message never says they don't have a tool. It names the reporting their own page promises and offers the AI
  version of it. If Mijn KeyPro already does changeovers, the offer lands soft. MEDIUM confidence for that reason.
- **The four July leads stay closed.** Each got an opener and a bump in July, no reply. The default angle doesn't
  rescue any of them, because three sell build or AI work themselves and the fourth only has July's website angle.

---

## Willem Straat, Hooft & Petiet (ReShare Living Group), ctc_XDgqhRAfzxcTmGKhZ

Screen. Thread 0 activities, nextPage null, control threads full the same minute, never messaged. Queue's latest row
NO_STRONG_ANGLE (1 Oct, sweep in state/drafted_2026-10-01-new-accepts.md), no SENT row anywhere. lemlist jobTitle
"Mede-eigenaar", tagline "KeyPro meubelverhuur | H&P interieur | ReShare Living Group", founder and co-owner per KeyPro.

Verdict, DRAFT_A. SUPERSEDES prior NO_STRONG_ANGLE, new evidence is the H&P management service page and its billing.

```gate
lead: Willem Straat, founder (2011) and co-owner of KeyPro with Bas Anneveldt per https://www.keypro.nl/in-de-media/keypro-en-hooft-petiet-bundelen-krachten-binnen-reshare-living-group/ (16 Oct 2025) and https://translinkcf.com/2025/10/23/translinkcf-advised-the-shareholders-of-hooft-petiet-on-the-sale-to-reshare-living-group/ , co-owner of Hooft & Petiet through ReShare Living Group B.V. (KvK 98269453, Rigaweg 12 Groningen, North Data), Keypro B.V. (KvK 87343657) bestuurder Keypro Holding B.V. (52688844) since 17 Aug 2022 per the Staatscourant entry on oozo, holding's owner not public without a paid extract. Grehamer Invest strategic shareholder since Mar 2025. lemlist lea_EKPeqAQrDvy7jMRTb jobTitle "Mede-eigenaar", jobDescription "Mede-eigenaar van Hooft & Petiet ... Als onderdeel van de ReShare Living Group". ctc_XDgqhRAfzxcTmGKhZ, thread 0 activities 2026-10-06 06:14Z, controls Rakia, Etienne, Salim, Umer full in the same minute
site pass 1: 64 URLs by tools/crawl.py on https://hooftenpetiet.nl (55 from sitemaps, 59 at 200), every page read, plus https://reshareliving.com (one page) and 80 of 1,402 keypro.nl URLs for the portal and services
site pass 2: 68 URLs, hooftenpetiet.nl crawled again with tools/crawl.py (63 at 200, every page read), /beheer/, /offerteaanvraag-meubelverhuur/, /een-onmisbare-schakel-tijdens-renovatieprojecten/ and /een-kijkje-achter-de-schermen-samen-met-lars/ read in full a second time, tools/site-audit.js on /beheer/ desktop and phone printed RENDER NOT TRUSTED and tools/render-via-curl.js timed out, so no visual claim is made anywhere, the message rests on page text only
deep analysis: Hooft & Petiet furnishes and runs temporary homes for housing corporations and renovation contractors, logeer, rust and wisselwoningen, model homes, expat and emergency homes. The quote form asks project type, style, persons, rooms, delivery date, area and packages, then a team plans it, Lars's post says the day starts at 08:30 going through the planning and that project managers plan while fitters execute. The management service on /beheer/ (datePublished 2026-08-20) adds per changeover work, "In- en uitcheck inclusief inventariscontrole", "U ontvangt een duidelijk schoonmaakoverzicht", "Heldere overzichten en rapportages per bewonerswissel", and "Extra verrichte arbeid (EVA) en de wisselschoonmaak factureren we iedere drie maanden op basis van heldere overzichten". On the Portaal Overvecht job, 570 homes renovated, H&P did "in- en uitchecks", signed the contracts and arranged cleaning, coordination ran "via WhatsApp en telefonisch contact" and the resident guide "had de vrijheid om de planning helemaal zelf op te zetten" with the overview of all available homes. ReShare promises "één uniforme werkwijze" for KeyPro and H&P. KeyPro has a client portal (https://portal.keypro.nl/login, custom dashboard), H&P's 64 pages link none
owner linkedin: route 1 curl https://www.linkedin.com/in/willem-straat-b838a417 999. Route 1b /recent-activity/all/ 999. Route 2 web search "Willem Straat" KeyPro, profile title "Willem Straat - H & P Interieur B.V." (tier G). Route 3 search linkedin.com/posts willem-straat, a snippet on the ReShare premiere and "Europe's largest circular rental platform", post itself not opened. Route 4 the KeyPro and TranslinkCF pages, founder and co-owner. Route 5 company page https://www.linkedin.com/company/hooftenpetiet via tools/social-audit.js, 812 followers. Route 6 his news quotes, RTV Noord 22 Nov 2025 "Het grootste platform van Europa worden, daar ga ik voor"
contact linkedin: same person as the owner, lemlist jobTitle, the KeyPro press page and the profile title agree, same six routes
google news: tools/news.py nl, company KeyPro OR "ReShare Living" OR "Hooft & Petiet" 12 results (DVHN 2026-09-28, Wonen360 2025-10-16 "KeyPro neemt concurrent over en wordt marktleider, Nu is Europa aan de beurt", RTV Noord 2025-11-22, emerce 2025-03-17 Grehamer), person "Willem Straat" 12, control Heineken 100
regional news: tools/news.py (Groningen) (meubelverhuur OR circulair inrichten) 9 results, Leeuwarder Courant 2026-09-28 on KeyPro, DVHN 2025-05-19 "Bas en Willem willen ... circulair Europa veroveren"
industry news: tools/news.py meubelverhuur OR circulair inrichten 66 results, Rijkswaterstaat circular procurement 2026-07-13, nothing on a competitor, plus the national 50 percent circular procurement by 2030 target quoted in the KeyPro press page
sources:
1. https://hooftenpetiet.nl/beheer/
2. https://hooftenpetiet.nl/offerteaanvraag-meubelverhuur/
3. https://hooftenpetiet.nl/een-onmisbare-schakel-tijdens-renovatieprojecten/
4. https://hooftenpetiet.nl/een-kijkje-achter-de-schermen-samen-met-lars/
5. https://reshareliving.com/
6. https://www.keypro.nl/in-de-media/keypro-en-hooft-petiet-bundelen-krachten-binnen-reshare-living-group/
7. https://portal.keypro.nl/login
8. https://translinkcf.com/2025/10/23/translinkcf-advised-the-shareholders-of-hooft-petiet-on-the-sale-to-reshare-living-group/
9. https://www.rtvnoord.nl/economie/RX-502/hij-werd-uitgelachen-nu-verhuurt-willem-straat-meubels-door-heel-nederland
10. https://www.wonen360.nl/article/9853157/jubilerend-keypro-zet-al-15-jaar-in-op-meubels-met-meerdere-levens/
11. https://www.northdata.com/ReShare%20Living%20Group%20B.V.,%20Groningen
12. https://www.northdata.com/Keypro%20B.V.,%20Groningen
13. https://www.oozo.nl/bedrijven/groningen/zuidoost/eemspoort/2722856/keypro-b-v
14. https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fhooftenpetiet.nl (tools/eu-view.py)
15. https://www.linkedin.com/company/hooftenpetiet (tools/social-audit.js)
16. https://web.archive.org/cdx/search/cdx?url=hooftenpetiet.nl/beheer/ (walled, connection reset three times)
pains: 5 judged. (1) Apps, the changeover work on /beheer/, an inventory check at every in and out check, a cleaning overview and a report per changeover, and the extra work billed every three months from those overviews, on renovation jobs the size of Portaal's 570 homes, while ReShare promises one way of working across two brands. Costliest, it grows with every project and every corporation, it's where margin on extra work is billed or lost, and it's the newest service line. (2) Website, reshareliving.com still reads "Deze site is in ontwikkeling" a year after the group formed, real, but they're visibly building it already and it's a brand page, not a cost. (3) GDPR, from Stockholm hooftenpetiet.nl sets _ga, _gcl_au and hubspotutk and calls doubleclick before a click with a HubSpot banner present, a consent setting, fails the tweak test. (4) Social, Instagram hooftenpetiet 167 followers, latest 2025-06-25 (468 days), small next to KeyPro's active account. (5) Squad, vacancies are fitting staff and interns, no development roles, no capacity fact
chosen: (1), costliest and hottest, the per changeover reporting and quarterly billing sit on the service they're adding now while the group promises one way of working
sweep website: 64 pages of https://hooftenpetiet.nl crawled twice and https://reshareliving.com read, the group page says "Deze site is in ontwikkeling", the brand sites are complete, not chosen
sweep gdpr: tools/eu-view.py from Stockholm on https://hooftenpetiet.nl , 8 cookies including _ga, _gcl_au and hubspotutk and 14 third party hosts before a click with a HubSpot banner on the page, a consent setting, not chosen
sweep apps: https://hooftenpetiet.nl/beheer/ inventory check, cleaning overview and report per resident changeover, EVA billed every three months from those overviews, coordination by WhatsApp and phone on the Portaal job per https://hooftenpetiet.nl/een-onmisbare-schakel-tijdens-renovatieprojecten/ , chosen
sweep social: tools/social-audit.js on the accounts in the site's HTML, Instagram hooftenpetiet 167 followers latest 2025-06-25 dormant, Facebook 197 followers dates UNKNOWN, YouTube 3 subscribers 2 videos, LinkedIn 812 followers, not chosen
sweep squad: https://hooftenpetiet.nl/vacatures/ and KeyPro's werken bij page list fitting staff and internships, no developer roles, KeyPro's portal shows they already have a builder, no capacity fact
thread: problem the management service gives an inventory check and a clear overview at every resident changeover and bills the extra work from those overviews | cost the changeover admin grows with every corporation and home as the two brands move to one way of working | offer the AI changeover workflow for their temporary homes | link changeover, overview
lead read: Willem reads that his own management service gives clients an inventory check and an overview at every resident changeover and bills extra work from those overviews, so every renovation job adds check ins, cleaning reports and invoice lines, that this grows as ReShare puts both brands on one way of working, and gets offered an AI changeover workflow that produces that overview, one thread
claims:
your management service gives clients an inventory check and an overview at every resident changeover, https://hooftenpetiet.nl/beheer/ "In- en uitcheck inclusief inventariscontrole", "U ontvangt een duidelijk schoonmaakoverzicht", "Heldere overzichten en rapportages per bewonerswissel", rechecked 06:58 UTC
then bills extra work from those overviews, https://hooftenpetiet.nl/beheer/ "Extra verrichte arbeid (EVA) en de wisselschoonmaak factureren we iedere drie maanden op basis van heldere overzichten", rechecked 06:58 UTC
renovation projects, https://hooftenpetiet.nl/beheer/ "Onze beheerservice is er voor woningcorporaties en renovatie-aannemers"
bringing KeyPro and Hooft & Petiet under one way of working at ReShare, https://reshareliving.com/ "We werken volgens één uniforme werkwijze", with KeyPro and Hooft & Petiet presented as the two companies, rechecked 06:58 UTC
recheck: 2026-10-06 06:58 UTC, /beheer/ text reread from the crawl and every quoted Dutch line found, reshareliving.com fetched again and the line found. Thesis confidence MEDIUM, the per changeover reporting and the quarterly billing are on their own page, that it costs them hours is inference he can test against his own team's week, and KeyPro's portal may already cover part of it
```

### Willem, OPENER

```
Hi Willem, saw Hooft & Petiet, looks interesting!

However, your management service gives clients an inventory check and an overview at every resident changeover, then bills extra work from those overviews. This causes every renovation project you win to add more check ins, cleaning reports and invoice lines your team has to put together.

Especially, when you are bringing KeyPro and Hooft & Petiet under one way of working at ReShare, the changeover admin grows with every corporation and every home you add.

I run Astra agency. We build AI workflows for brands like Unilever, AXA, Pertamina. I standardised the KPIs and dashboards for 23 markets at Heineken, so I've seen what it takes to give every client the same overview.

Shall I send you over what the AI changeover workflow for your temporary homes looks like?
```

---

## Lynn Melvin, Halliday Fraser Munro Limited SC312492, ctc_8pK35SWjGbjzSGK3Z

Screen. Thread 0 activities, nextPage null, never messaged. lemlist jobTitle "Director", tagline "Director at Halliday
Fraser Munro MRICS MRTPI", summary "I specialise in land realisation". Companies House SC312492 opened 2026-10-06,
current officers David Halliday and John Halliday only, sole active PSC John Halliday 75%+ shares and votes. The officer
search for "Lynn Melvin" returns a Rutland and a Southampton Lynn, neither at HFM.

Verdict, CLOSED_NOT_ICP. A director by job title at a firm she doesn't own or sit on the board of.

## Ronald Andriessen, Platowood, ctc_LCNxLygqv6SLjBjy7

Screen. Thread 0 activities, nextPage null, never messaged. lemlist jobTitle "Algemeen directeur", summary describes a
career manager ("+15 years all-round international sales, operational & strategic leadership"). https://schipperbosch.nl/onderneming/platowood/
opened 2026-10-06, "Schipper Bosch is eigenaar en investeerde ... bewust in het bedrijf".

Verdict, CLOSED_NOT_ICP. A hired general manager, Schipper Bosch owns the company.

## Marlon Baarends-Schroevers, Stichting Dockwize, ctc_mRBodYj6JYPjdMRK7

Screen. Thread 0 activities, nextPage null, never messaged. lemlist jobTitle "Directeur-bestuurder", companyType
Nonprofit. The Staatscourant data on oozo, opened 2026-10-06, "Stichting Dockwize ... kvk nummer 62110039", branche
"Overige belangenbehartiging n.e.g.". A foundation has no owner.

Verdict, CLOSED_NOT_ICP. Director of a foundation, nothing is hers to buy.

## Rakia Jaziri, Wealthy Technology, ctc_W3kjdZFnbzXH85zTM

Screen. Thread 3 activities, nextPage null. **WE SENT A REAL MESSAGE.** 2026-07-14 08:57Z ours, the connect note. 2026-07-16
15:12Z ours, the opener on homepage journeys for pharma, CRO and MedTech and expert review. 2026-07-21 15:38Z ours,
"Rakia, have you seen this?" with an emoji. She never replied. lemlist jobTitle "CEO & Co-Founder", tagline leads with
"Associate Professor at Paris 8 University", president per SIREN 985133008 (1 Oct sweep). Queue latest NO_STRONG_ANGLE.

Verdict, NO_SIGNAL. No nudge.

```sweep
lead: Rakia Jaziri, CEO and co-founder of Wealthy Technology, ctc_W3kjdZFnbzXH85zTM, lea_yPxfNNgiJEGrbqvei, July opener and bump, no reply, thread pulled 2026-10-06
website: https://wealthy-technology.com rendered in Chromium 2026-10-06, hero "From clinical data to approved dossier", a four step Ingest, Draft, Cross-check, Review flow, the app screens, a team link, current and clear, B has nothing to sell, no growth event in tools/news.py beyond BFM 2026-01-30
gdpr: tools/eu-view.py from Stockholm 2026-10-06, https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fwealthy-technology.com , 0 cookies before a click, final URL /acceuil, clean, not chosen
apps: the company sells "agentic AI for regulatory excellence" per https://wealthy-technology.com , an AI product company, A fails by the brief's own rule
social: nothing to test, the rendered anchors on https://wealthy-technology.com list no social account, the 1 Oct curl of the HTML found 0 social URLs
squad: a 1 to 10 person deep tech startup per lemlist, "Built by published AI researchers" on https://wealthy-technology.com , they build their own product, no capacity fact
verdict: NO_STRONG_ANGLE. A fails because they sell AI, B fails because the site is current and no expansion shows. Stays closed, no message
```

## Etienne Lefebvre, ARVEST WINE, ctc_nYnQgsLWCc384BqPm

Screen. Thread 3 activities, nextPage null. **WE SENT A REAL MESSAGE.** 2026-07-14 05:35Z ours, the connect note.
2026-07-14 18:36Z ours, the opener on splitting Analytics and Market. 2026-07-21 15:34Z ours, "Etienne, have you seen
this?". He never replied. lemlist jobTitle "Co-founder & CEO", /team names him "Fondateur & PDG". Queue latest NO_STRONG_ANGLE.

Verdict, NO_SIGNAL. No nudge.

```sweep
lead: Etienne Lefebvre, co-founder and CEO of Arvest, ctc_nYnQgsLWCc384BqPm, lea_Mh7A5KiXkX7nGK7bj, July opener and bump, no reply, thread pulled 2026-10-06
website: https://arvestwine.com rendered in Chromium 2026-10-06, Analytics and Market split in the nav, /pricing priced both, the language switch clicked and it offers EN, so a new language or market angle has no gap, the UK partner London City Bond (blog 27 May 2026) can read it, B fails
gdpr: tools/eu-view.py from Stockholm 2026-10-06, https://webbkoll.5july.net/en/results?url=http%3A%2F%2Farvestwine.com , 4 first party cookies (cf_clearance, XSRF-TOKEN, two Stripe) and Stripe hosts only before a click, the render shows a "Refuser" and "Tout accepter" banner, clean, not chosen
apps: https://arvestwine.com says "Collecte de données hybride, pilotée par des experts et augmentée par l'IA" and /pricing sells CSV and API import, they build their own AI assisted platform, A fails
social: tools/social-audit.js not rerun, the rendered anchors on https://arvestwine.com link LinkedIn and Instagram, the 1 Oct crawl found none in the raw HTML, nothing claimed, not chosen
squad: two founders on https://arvestwine.com/team , five partnerships on /blog between May and June 2026, tools/news.py found 0 results on the company, no capacity fact
verdict: NO_STRONG_ANGLE. Both defaults fail, they build their own AI and the site already speaks English. Stays closed, no message
```

## Salim Saleem, Close System Architecture Consultancy, ctc_RDogafhkpGPbrnp7H

Screen. Thread 3 activities, nextPage null. **WE SENT A REAL MESSAGE.** 2026-07-18 11:04Z ours, the connect note.
2026-07-18 12:33Z ours, the opener on AI native and government native positioning, broken counters and template copy.
2026-07-21 18:58Z ours, "Salim, have you seen this?". He never replied. lemlist tagline "CEO @ Close System | AI-Native
A&E for GCC Government Infrastructure", but experience1 and jobTitle now read Co-Founder and CEO of "Innovators for
engineering and interior design", a 1 to 10 person Abu Dhabi firm, the record is mixed. Queue latest NO_STRONG_ANGLE.

Verdict, NO_SIGNAL. No nudge.

```sweep
lead: Salim Saleem, founder and CEO of Close System per its 2025 2026 profile PDF, lemlist now also lists Innovators for engineering and interior design, ctc_RDogafhkpGPbrnp7H, lea_pY4wLmNBH5RmfsFgf, July opener and bump, no reply, thread pulled 2026-10-06
website: https://close-system.com rendered in Chromium 2026-10-06, an Arabic version at /ar/, branches Abu Dhabi, MBZ, Al Ain, Dubai, KSA and Oman with named branch managers, so expansion is already served, B fails. The leader quote under his name is lighting art copy, July's template copy point, ignored once and not resent
gdpr: a UAE firm selling to GCC government buyers, EU consent rules aren't their buyers' concern, tools/eu-view.py from Stockholm on https://close-system.com returned no result today and the 1 Oct run found nothing to use, not chosen
apps: his own lemlist tagline sells "AI-Native A&E" and the July thread itself names the AI workflows he describes on LinkedIn, a tool he already claims, A fails by the brief's rule
social: tools/social-audit.js could not open Facebook, TikTok and YouTube on 1 Oct (certificate error), Instagram and LinkedIn linked from the HTML, nothing claimed
squad: the rendered homepage https://close-system.com lists eight named leaders and branch heads, and the profile PDF https://close-system.com/wp-content/uploads/2026/09/CSC-Company-Profile-2025-2026.pdf gives in house BIM and sustainability departments in a firm of 100+, no capacity gap
verdict: NO_STRONG_ANGLE. A fails because he already sells AI native work, B fails because KSA, Oman and Arabic are on the site. Stays closed, no message
```

## Umer Adnan, Cowlar Venture Studio, ctc_xozMFobDpEC8sdukg

Screen. Thread 3 activities, nextPage null. **WE SENT A REAL MESSAGE.** 2026-07-15 05:52Z ours, the connect note.
2026-07-16 15:31Z ours, the opener on cowlar.com missing the Venture Studio, 2016 testimonials and a group homepage.
2026-07-21 15:38Z ours, "Umer, have you seen this?". He never replied. lemlist jobTitle "Founder", summary "CDS has more
than 10 multi-disciplinary engineering teams". Queue latest NO_STRONG_ANGLE.

Verdict, NO_SIGNAL. No nudge.

```sweep
lead: Umer Adnan, founder of Cowlar Venture Studio and co-founder and CEO of Cowlar Design Studio, Doha, ctc_xozMFobDpEC8sdukg, lea_yzTbTJHb3ToSJfZ3w, July opener and bump, no reply, thread pulled 2026-10-06
website: https://cowlarventurestudio.com rendered 2026-10-06, "Rapid Execution Team", an email, a phone and LinkedIn, prerendered 1756673737048 (31 Aug 2025) per its own build file in the crawl, and https://cowlar.com still two tiles, so any B message repeats July's group homepage pitch, ignored once
gdpr: the 1 Oct tools/eu-view.py run on https://cowlarventurestudio.com found a one page site with nothing to use, not chosen
apps: his lemlist summary says Cowlar Design Studio does "Enterprise Software, Digital Transformation ... Machine Learning / AI" with "more than 10 multi-disciplinary engineering teams", he sells the build, A fails because anything we'd offer is what he sells
social: tools/social-audit.js, the venture studio page links only https://www.linkedin.com/company/cowlar-venture-studio/ , walled on 1 Oct, nothing claimed
squad: Cowlar Design Studio is a build squad itself per lemlist, lemlist shows employee growth at minus 84 percent, no sign of a builder shortage, tools/news.py on Cowlar is all 2017 to 2019
verdict: NO_STRONG_ANGLE. A is his own product line, B repeats July. Stays closed, no message
```
