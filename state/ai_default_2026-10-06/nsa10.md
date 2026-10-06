# nsa10, AI default angle pass, 2026-10-06. 1 NUDGE drafted (Jamie Hardy, Revive), 5 closed. Nothing sent.

Brief /tmp/claude-0/agents/AI_DEFAULT_BRIEF.md. RULES.md 4A "THE DEFAULT ANGLE", 1A, 3, 4B, opener-template.md and the
2026-10-03 batch1 redo format read before any lead.

## What was run, per lead

- **Threads.** get_inbox_conversation on all six contactIds at about 06:15 UTC, one page each, nextPage null on all six,
  LinkedIn sync "recent" 06:14:43Z. Four came back empty (Tom, Jean-Baptiste, Jamie Vaughan, Florent). Nikita's (3 items)
  and ctc_D5F2nC69pjMjAuvk2's (3 items) came back full in the same batch, which is the positive control for the four empties.
- **lemlist records.** search_campaign_leads by leadId with include campaigns, six calls, every jobTitle, tagline, summary
  and companyDomain read.
- **Registers.** Companies House for Revive Auto Repairs Ltd 16543454 (overview, officers, PSC) and Jamie Hardy's officer
  appointments, North Data for Reformer Circle GmbH HRB 302125 and Siebert & Wassink B.V. KvK 71745238, recherche-entreprises
  for Distri Escaut 902223692 and SIF UNIS FRANCE 323962613, BODACC for 323962613, the Quadrum Capital release, the S&W team
  page and the Distriescaut mentions légales.
- **Sites.** reviveautorepairs.co.uk crawled twice (36 and 36 pages), reformerloft.com once (26 pages, the 1 Oct gate has the
  rest), adesbootcamp.com and restless.co key pages refetched for the A lens.
- **Searches, news, social.** tools/news.py for Revive and Reformer Loft with controls, two web searches on Revive,
  tools/social-audit.js on Revive's Facebook and Instagram and Reformer Loft's Instagram.

## The count

| Lead | Verdict | In one line |
|---|---|---|
| Jamie Hardy, Revive Auto Repairs | DRAFT_B, a NUDGE | A new bodyshop growing into fleet work, and search lists an old Wix template page of his that prices repairs in US dollars next to his real homepage |
| Nikita-Tarass H., Reformer Loft | NO_SIGNAL | Booking runs in the bsport app, academy enrolment is two cohorts a year, and he builds agentic workflow systems himself |
| Tom Uitzetter, Siebert & Wassink | CLOSED_NOT_ICP | Still the hired Algemeen Directeur, the shareholders are Kleizen, Siebert and Wassink |
| Jean-Baptiste Doray, Distriescaut | CLOSED_NOT_ICP | Still an employee of the Blangis group, his own SIF UNIS FRANCE in liquidation since 13 Dec 2023 per BODACC |
| Jamie Vaughan, Restless | NO_SIGNAL | They sell AI marketing and build their own AI software, Antenna, so A has nothing to sell |
| Florent Dal Ben-Salles, Ades Bootcamp | NO_SIGNAL | They teach AI and automation, run a client portal and their own onboarding apps, already tooled |

## The things Raka would want to know first

- **The unnamed contact is Jamie Hardy of Revive Auto Repairs, and we have already pitched him.** WE SENT A REAL OPENER on
  13 Aug 2026 (the "opening soon" banner and an "open now booking page") and an automated "have you seen this?" bump on
  18 Aug. He never replied. So this is a nudge, not an opener, and it's the second follow up. If it goes unanswered, his
  row closes silently. His lead sits in v0.2, which is paused, so sending is your call twice over.
- **I nearly drafted the wrong angle for him.** The obvious A angle was an AI estimating workflow, since every free
  estimate starts as a damage photo sent by form or WhatsApp, and the site lists an Estimator & Operations Assistant role to
  support the Bodyshop Manager on damage assessments. Then the homepage's raw HTML turned out to carry logos for Audatex
  (estimating), AutoFlow (workshop workflow and customer updates), Motasoft (garage management) and Square. He already runs
  estimating and workflow software, so A is out. The nudge uses B instead.
- **The August claim is not repeated.** There's no Wayback capture of his site, so whether the "opening soon" banner was
  there in August can't be checked. The nudge only says we offered a booking page sketch, which is what the thread shows.
- **Our browsers keep getting a Wix 404 on his homepage.** Our Chromium got it on desktop and then on both viewports, and
  Webbkoll from Stockholm got the same 404, while curl, WebFetch and an earlier phone render all got the real page. That
  points to our side, so no visual, tracker or GDPR claim was made. If you open it on your phone and see a 404 too, the site
  itself is the much bigger story.
- **Nikita's co ownership isn't on the register in a readable form.** The Impressum names Reformer Circle GmbH with Paulina
  Stamp as sole Geschäftsführerin, and North Data shows two shareholders behind a paywall. lemlist says Co-Owner. It didn't
  matter here, since there's no angle either way.

---

## Jamie Hardy, Revive Auto Repairs, ctc_D5F2nC69pjMjAuvk2

Screen. Thread has 3 items, our 11 Aug connect note, OUR 13 AUG REAL OPENER and OUR 18 AUG BUMP, no reply, no promise of a last message.
Owner. Sole director and 75%+ PSC of REVIVE AUTO REPAIRS LTD 16543454 (incorporated 26 Jun 2025), lemlist jobTitle Director, lea_imNLEASHdDpyyCFij.
Prior verdict 2026-10-03 NO_ANGLE because the banner pitch was fixed. SUPERSEDES with new evidence, the template page in search and the fleet direction.

Verdict DRAFT_B, a NUDGE.

Thread in full, oldest first.
- 2026-08-11 21:24 UTC, ours, connect note. "Hey Jamie, congrats on launching Revive Auto Repairs recently, exciting times! I'm a business owner too, would love to connect and share ideas :)"
- 2026-08-13 07:00 UTC, ours, opener. "Hey Jamie, thanks for connecting. I had a look at Revive Auto Repairs, and I like the dealership standard cosmetic repair work with a personal touch in North Ferriby. However, the site still shows an opening soon banner next to real finished job reviews, so visitors can't tell if you're open. Our agency sketched an open now booking page. Want me to send it over?"
- 2026-08-18 07:02 UTC, ours, bump. "👀 Jamie, have you seen this?"

```gate
lead: Jamie Hardy, sole director and 75%+ PSC of REVIVE AUTO REPAIRS LTD (Companies House 16543454, incorporated 26 Jun 2025, Unit 3 Evolve Business Park, Melton, North Ferriby HU14 3GQ, SIC 45200), ctc_D5F2nC69pjMjAuvk2, lea_imNLEASHdDpyyCFij, campaign cam_Co5CJXrpPFf5MRAfD (paused). lemlist jobTitle "Director", tagline "Director | Ecodrive Logistics • Ecodrive Mobile • Revive Auto Repairs", linkedinUrl https://www.linkedin.com/in/83jamiehardy . Thread pulled 2026-10-06 about 06:15 UTC, 3 items, our connect note, our 13 Aug opener and our 18 Aug bump, no reply. sentOnly search "Jamie Hardy" 0, myConversations search "Revive" 0, search_contacts "Jamie H" gives only this contact for him, campaignCount 1, state grep for the name, company, contactId, leadId and LinkedIn slug finds only the 3 Oct NO_ANGLE row
site pass 1: 36 pages by tools/crawl.py on https://www.reviveautorepairs.co.uk/ , 29 from the sitemap, all 200, every page read, homepage, home, four job ads, the apply page, book online, three booking calendars, three service pages, a service page template, six "Project Title" portfolio pages, blog and three posts, privacy, terms, refund, accessibility, a "5 Day Bootcamp Coming Soon in May 2035" landing page, plus the privacy policy PDF read in full
site pass 2: 36 pages, second full crawl matching pass 1. tools/site-audit.js desktop came back as a Wix 404 while its phone screenshot showed the real page, my own Chromium rerun got the 404 on both viewports and Webbkoll got it too, so that render is void and nothing visual is claimed. Text confirmed a second way through WebFetch on the homepage, /home and the estimator job page
deep analysis: The real homepage is one long Wix page with a free estimate form (name, email, phone, registration, make and model, company, reason, a damage photo upload) and a WhatsApp QR, three reviews, an air con re gas banner, a fleet review offer and "Specialist Cosmetic Car & Fleet Repairs" in its title. It links out only to the jobs list and the privacy PDF. Four roles are listed, Panel Beater, Painter, Multi Skilled Painter and Estimator & Operations Assistant, and the estimator ad says "This role offers significant opportunities for further development as Revive Auto Repairs expands". Around that sit the Wix template's leftovers, a /home page that prices Paint Service, Tire Fitting and Bodywork Repair in US dollars with a "Gallery Open Road" block, booking pages in US dollars, a service page with a San Francisco address, a template privacy page at /blank (the real policy is the PDF dated 27/12/2025), placeholder portfolio pages and the 2035 bootcamp page. The homepage shows logos for Audatex, AutoFlow, Motasoft, Square and WhatsApp Business, so estimating, workflow and payments already run on named software
owner linkedin: route 1 curl https://www.linkedin.com/in/83jamiehardy 999. Route 2 web search "Revive Auto Repairs" North Ferriby, result title "Jamie H. - Revive Auto Repairs". Route 3 Companies House officer search, Jamie HARDY born Feb 1983, Revive Auto Repairs (director), Halo Escapes Ltd 15937739 (director since 5 Sep 2024, active), Learn 2 Swim (UK) Ltd 08118287 (resigned 2013, dissolved). Route 4 his own site, profile page "Jamie Hardy Admin", join date 25 Jun 2025, three blog posts that day. Route 5 https://hullwhatson.com/revive-auto-repairs-melton-hull/ walled by Cloudflare to curl, WebFetch and tools/fetch-walled.py, its search snippet names him as owner and Russ Murray as Bodyshop Manager, used as a lead only. Route 6 the lemlist summary, 22 years in facilities, leisure and hospitality management, "founding and developing start-up ventures"
contact linkedin: same person as the owner, the register PSC, the lemlist record and the site's own admin profile agree, same six routes
google news: tools/news.py --lang en, "Revive Auto Repairs" 1 result (The Hull Story 2026-08-20 on the Evolve business park, Revive named in the search snippet), "Jamie Hardy" 35 results, none about him, control Tesco 100
regional news: tools/news.py (Hull OR "East Yorkshire" OR "North Ferriby") (bodyshop OR "accident repair" estimating) 0 results, control full so the zero is real
industry news: tools/news.py bodyshop OR "accident repair" estimating 53 results, bodyshopmag.com on paint price increases (2026-04-20) and Bodyshop Magazine LIVE (2026-09-29), collisionrepairmag.com on AI in bodyshops (2026-02-13), headlines only, none used in the message
sources:
1. https://www.reviveautorepairs.co.uk/
2. https://www.reviveautorepairs.co.uk/home
3. https://www.reviveautorepairs.co.uk/jobs/operations-estimator
4. https://www.reviveautorepairs.co.uk/jobs
5. https://www.reviveautorepairs.co.uk/book-online
6. https://www.reviveautorepairs.co.uk/_files/ugd/949b66_5067c2acaf004832afcd296820663fd2.pdf
7. https://find-and-update.company-information.service.gov.uk/company/16543454/officers
8. https://find-and-update.company-information.service.gov.uk/company/16543454/persons-with-significant-control
9. https://find-and-update.company-information.service.gov.uk/officers/rVor8SskbeGOUGvqEbuTWxFzy94/appointments
10. https://hullwhatson.com/revive-auto-repairs-melton-hull/ (walled, snippet only)
11. https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fwww.reviveautorepairs.co.uk%2F (tools/eu-view.py, BLOCKED, a 404 to their reader)
12. https://www.facebook.com/reviveautorepairs and https://www.instagram.com/reviveautorepairs (tools/social-audit.js)
13. https://www.linkedin.com/in/83jamiehardy (999)
14. https://news.google.com/rss (tools/news.py, company, person, region, industry)
15. http://archive.org/wayback/available?url=reviveautorepairs.co.uk (no snapshots)
pains: 6 judged. (1) Website, B, a new bodyshop growing into fleet work whose old Wix template page /home, pricing repairs in US dollars, is listed in search next to the real one page site, while the real site has no fleet, insurance or work pages. Costliest we can fix, he built the site himself (admin profile), so there's no incumbent web person, and fleet accounts are the bigger recurring work. (2) Apps, A, an AI estimating workflow from the damage photo intake, disproved, the homepage shows Audatex and AutoFlow logos. (3) GDPR, UNKNOWN, Webbkoll and our Chromium both got a 404, and the real privacy policy PDF is linked on every page, nothing claimed. (4) Social, Facebook gave a login wall and Instagram UNKNOWN, nothing claimed. (5) Squad, a workshop with no build team, no fit. (6) Hiring four trades roles, a capacity pain in trades, not ours
chosen: (1), the costliest we can build for, it sits on the fleet direction in his own homepage title and grows with every new role he fills
sweep website: 36 pages of https://www.reviveautorepairs.co.uk/ crawled twice, /home prices services in US dollars and is listed in two separate searches next to the real homepage, confirmed by curl and WebFetch, chosen
sweep gdpr: tools/eu-view.py on https://www.reviveautorepairs.co.uk/ BLOCKED from Stockholm, a 404 to Webbkoll, our Chromium got the same 404, so UNKNOWN, never clean, the privacy PDF exists
sweep apps: the free estimate starts as a damage photo by form or WhatsApp on https://www.reviveautorepairs.co.uk/ , but the same page shows Audatex, AutoFlow and Motasoft logos, already tooled, disproved
sweep social: tools/social-audit.js on https://www.facebook.com/reviveautorepairs gave a login wall and https://www.instagram.com/reviveautorepairs came back UNKNOWN, both taken from the site HTML, nothing claimed
sweep squad: a single bodyshop per Companies House 16543454 hiring panel and paint trades on https://www.reviveautorepairs.co.uk/jobs , no software team or build backlog, no squad fit
thread: problem search lists an old template page of his site that prices paint and bodywork in US dollars next to the real homepage | cost as Revive grows its fleet work that's the page a fleet manager comparing bodyshops can land on first | offer the Revive site built to win fleet accounts | link site, fleet
lead read: Jamie reads that we offered him a booking page in August, that search shows an old template page of his site pricing paint and bodywork in US dollars next to his real one, that a fleet manager comparing bodyshops could land there first as his fleet work grows, and gets offered a site built to win fleet accounts, one thread
claims:
I offered you a booking page sketch in August, the lemlist thread ctc_D5F2nC69pjMjAuvk2, our 2026-08-13 07:00 UTC message "Our agency sketched an open now booking page. Want me to send it over?", rechecked 06:15 UTC
search results list an old template page of your site, reviveautorepairs.co.uk/home, web searches 'site:reviveautorepairs.co.uk book online bodywork repair' (/home first, / second) and '"Revive Auto Repairs" North Ferriby' (/home listed before /), both 2026-10-06
it's still pricing paint and bodywork in US dollars, https://www.reviveautorepairs.co.uk/home "Paint Service 250 US dollars US$250" and "Bodywork Repair 300 US dollars US$300", crawl passes 1 and 2 and WebFetch, 2026-10-06
your real homepage, https://www.reviveautorepairs.co.uk/ title "Revive Auto Repairs | Specialist Cosmetic Car & Fleet Repairs North Ferriby", with the free fleet review offer, crawled twice and WebFetch 2026-10-06
recheck: 2026-10-06 about 06:40 UTC, /home refetched by WebFetch with the dollar prices still there, the second search run, the thread unchanged at 3 items. Thesis confidence MEDIUM, every fact holds two ways, that a fleet manager lands on /home and that he'll pay for the whole site rather than delete one page is inference
```

### Jamie, NUDGE

```
Jamie, I offered you a booking page sketch back in August. Something else caught my eye since.

Search results list an old template page of your site, reviveautorepairs.co.uk/home, next to your real homepage, and it's still pricing paint and bodywork in US dollars. As Revive grows its fleet work, that's the page a fleet manager comparing bodyshops can land on first.

Shall I send you over what the Revive site built to win fleet accounts looks like?
```

---

## Nikita-Tarass H., Reformer Loft, ctc_hgJ48N6PQ4Thn7wFB

Screen. Thread has 3 items, our 13 Jul connect note, OUR 14 JUL REAL OPENER and OUR 21 JUL BUMP, no reply, no last message promise.
Owner. lemlist jobTitle Co-Owner, the Impressum names Reformer Circle GmbH (HRB 302125) with Paulina Stamp as Geschäftsführerin, North Data shows 2 shareholders behind a paywall.
Prior verdict 2026-10-01 NO_STRONG_ANGLE, CLOSE, nothing new worth his reply. Respected after the A and B hunt below.

Verdict NO_SIGNAL.

Thread in full, oldest first.
- 2026-07-13 06:00 UTC, ours, connect note. "Hi Nikita-Tarass, saw your business and thought it was cool 😀 I'm a business owner too! Would love to connect and share ideas! ☺️"
- 2026-07-14 18:41 UTC, ours, opener on a clearer first visit homepage, the 4.9 ClassPass rating and the Teacher Academy, ending "Want me to send it?"
- 2026-07-21 15:35 UTC, ours, bump. "Nikita, , 👀have you seen this?"

```sweep
lead: Nikita-Tarass H. (Heumann), Co-Owner of Reformer Loft per lemlist search_campaign_leads lea_JcMnf52SH8NiD2Qky, ctc_hgJ48N6PQ4Thn7wFB. https://reformerloft.com/impressum names Reformer Circle GmbH, HRB 302125, Geschäftsführerin Paulina Stamp, North Data shows 2 active shareholders and a 9 Apr 2026 shareholder list behind its paywall. His lemlist summary says he's an IT Architect at BCG Platinion leaving by summer 2026, exploring "agentic systems and B2B operational workflows". Thread pulled 2026-10-06, 3 items, all ours, no reply
website: https://reformerloft.com crawled again, 26 pages, Squarespace, a nav linked academy page https://reformerloft.com/ausbildung for the second Reformer Pilates Academy on 9 to 11 Oct and 13 to 15 Nov 2026, a Neuhausen Nymphenburg local page and bsport pricing. B fails, the new service already has its page, no new studio or market found, the 1 Oct gate covers the rest
gdpr: the 1 Oct tools/eu-view.py run from Stockholm, https://webbkoll.5july.net/en/results?url=http%3A%2F%2Freformerloft.com%2F , found _gcl_au and region1.analytics.google.com before a click under an OPT_IN banner, one ad cookie on a studio site, fails the pay test, not rerun
apps: class booking runs in the Reformer Loft app and the bsport widget per https://reformerloft.com/booking . Academy enrolment on https://reformerloft.com/ausbildung is a name and billing address form, then "Wir senden dir anschließend die Rechnung zur Platzreservierung per Email zu", manual but two cohorts a year, not hours. And the co owner builds agentic workflow systems himself per his lemlist summary, A fails
social: tools/social-audit.js on https://www.instagram.com/reformerloft/ from the site HTML, 2,592 followers, 94 posts, latest 2026-10-05, very active. TikTok @reformerloft linked, not opened, nothing missing
squad: one studio per https://reformerloft.com/contact , no build team needed, and the co owner is a software architect per his lemlist record, no squad fit
verdict: NO_STRONG_ANGLE, NO_SIGNAL under the AI default lens. Booking is already in an app, the only manual job is a dozen academy invoices a year, and the co owner builds AI workflow systems for a living. tools/news.py "Reformer Loft" 1 result, "Nikita Heumann" 0, München Reformer Pilates 30, control Volkswagen 102
```

---

## Tom Uitzetter, Siebert & Wassink, ctc_WtireoDMBDJ86yJBf

Screen. Thread empty (0 items, nextPage null), Nikita's and Jamie Hardy's threads full in the same batch as the control.
Not an owner. lemlist jobTitle "Algemeen directeur", tagline "Algemeen Directeur Siebert & Wassink | Partner Concreto Group", lea_rciL2iHPbcq4Sntze.
Prior verdict 2026-10-05 CLOSED_NOT_ICP. Register rechecked only, as briefed, and it still holds.

Verdict CLOSED_NOT_ICP.

```sweep
lead: Tom Uitzetter, Algemeen Directeur of Siebert & Wassink B.V. (KvK 71745238 per North Data, fetched 2026-10-06 through tools/fetch-walled.py), ctc_WtireoDMBDJ86yJBf. https://siebertwassink.nl/over-ons/ons-team/ fetched 2026-10-06 lists "Tom Uitzetter Algemeen Directeur" and "Johan Siebert Partner", "Tom Kleizen Partner", "Joris Wassink Partner". The Quadrum Capital release https://www.quadrum-capital.nl/en/news/siebert-wassink-en-ventiv-engineers-kiezen-voor-groeiversnelling-met-investeerder-quadrum-capital , refetched, "Quadrum Capital has taken a majority share ... Current shareholders, including Managing Director Tom Kleizen and founders Johan Siebert and Joris Wassink, will remain shareholders", 0 mentions of Uitzetter
website: not researched, the register recheck at https://siebertwassink.nl/over-ons/ons-team/ stopped the lead before any research, as the brief says for a closed non owner
gdpr: not researched, he's a hired director at a private equity owned group per https://www.quadrum-capital.nl/ , a privacy finding would go to the wrong person
apps: not researched, the 5 Oct follow up already judged the group owners and found the HR systems work belongs to Adwise, https://www.adwise.nl/services/technology-and-development/
social: not researched with tools/social-audit.js, the lead stopped at ownership on https://siebertwassink.nl/over-ons/ons-team/ , nothing of his to open
squad: not researched, a private equity backed HR consultancy per https://www.quadrum-capital.nl/ , not a Build Squad buyer and not an owner contact
verdict: NO_STRONG_ANGLE, CLOSED_NOT_ICP. His tagline says "Partner Concreto Group", but the investor's own release names the remaining shareholders and he isn't one of them
```

---

## Jean-Baptiste Doray, Distriescaut, ctc_49NL7ZmwhrWyp4gk4

Screen. Thread empty (0 items, nextPage null), control as above.
Not an owner. lemlist jobTitle "Directeur Commercial", tagline "Directeur Commercial chez DISTRI-ESCAUT", lea_R5HeN5kWFGHTAPHnA.
Prior verdict 2026-10-05 CLOSED_NOT_ICP. Register rechecked only, as briefed, and it still holds.

Verdict CLOSED_NOT_ICP.

```sweep
lead: Jean-Baptiste Doray, Directeur Commercial at Distriescaut, ctc_49NL7ZmwhrWyp4gk4. recherche-entreprises.api.gouv.fr SIREN 902223692 DISTRI ESCAUT (DISTRI ESCAUT - MOLOSSE ET MATOU), active, sole dirigeant GROUPE C.D.E. BLANGIS as Président de SAS, fetched 2026-10-06. https://distriescaut.com/mentions-legales/ through tools/fetch-walled.py, "SASU au Capital social de 40 000,00 € RCS Douai 902 223 692 ... Directeur de publication : Blangis Charles, Président", 0 mentions of Doray. His own SIF UNIS FRANCE 323962613 shows him as Président de SAS on recherche-entreprises, but BODACC (bodacc-datadila.opendatasoft.com) gives "Jugement de conversion en liquidation judiciaire" dated 2023-12-13 and a creditors' statement filed 2024-11-27. pappers.fr was walled today (Cloudflare), so BODACC is the independent check
website: not researched, https://distriescaut.com belongs to the Blangis group per its mentions légales, not to him
gdpr: not researched, https://distriescaut.com is not his business, a privacy finding there would be a message to the wrong person
apps: not researched, his only company of size is in liquidation per BODACC, https://bodacc-datadila.opendatasoft.com , SIREN 323962613, nothing of his to build for
social: not researched with tools/social-audit.js, no owned trading business account exists per the BODACC and recherche-entreprises records
squad: not researched, an employee of a group per https://distriescaut.com/mentions-legales/ and a company in liquidation, no buyer
verdict: NO_STRONG_ANGLE, CLOSED_NOT_ICP. An employee of the Blangis group, and the company he presides is in judicial liquidation
```

---

## Jamie Vaughan, Restless, ctc_KjnfaAkXxqrFTJSAa

Screen. Thread empty (0 items, nextPage null), control as above. Our connect note shows only in the sentOnly preview per the 5 Oct files.
Co-founder and director of RESTLESS MARKETING SERVICES LIMITED 16879495, not a PSC, so never called the owner. lemlist jobTitle "Co-Founder", lea_QHDsTte3ppGe3N9Qe.
Prior verdicts 2026-10-05 in /tmp/claude-0/agents/b5_jamie/, judgement NO_STRONG_ANGLE, signals A no and B weak, red team FIX but hold. Re judged through A only.

Verdict NO_SIGNAL.

```sweep
lead: Jamie Vaughan, Co-Founder of Restless per lemlist search_campaign_leads lea_QHDsTte3ppGe3N9Qe, ctc_KjnfaAkXxqrFTJSAa, director and not a PSC of RESTLESS MARKETING SERVICES LIMITED (Companies House 16879495), majority Coda Labs Ltd, a co founder and never the owner. Thread pulled 2026-10-06, 0 items, control full. Evidence, judgement, signals and red team files in /tmp/claude-0/agents/b5_jamie/ reused as briefed
website: carried from /tmp/claude-0/agents/b5_jamie/signals.md, https://restless.co/ shows no client result while Le Bab and MediaCat carry results, plus GA and LinkedIn tags before consent, the red team judged it a fix their own creatives do in an afternoon, B stays weak and is not re drafted here
gdpr: carried from signals.md, tools/eu-view.py from Stockholm on https://restless.co set _ga and called px.ads.linkedin.com before a click, a consent tool install, fails the pay test for a team that installs these tags for clients
apps: the A lens, refetched 2026-10-06, https://restless.co/ says "The AI marketing company for a social world" and "Our proprietary AI platform", the /antenna videos show a finished multi screen app, and ExchangeWire 29 Jul 2026 says they build custom software and agentic systems themselves. They sell AI and build their own, so it's not an A lead
social: carried from signals.md, tools/social-audit.js on https://www.instagram.com/restlessdotco/ 141 followers, 15 posts, latest 2026-08-19, and they're hiring a social creative to fix it in house
squad: carried from signals.md, 9 staff per https://www.linkedin.com/company/restlessco , open roles are marketers, software built in house and by the chairman's Coda Labs, no squad fit
verdict: NO_STRONG_ANGLE, NO_SIGNAL under the AI default lens. Through the AI lens there's nothing to sell, Restless is an AI native agency running its own AI app. The old B draft stays held as the red team advised. Never mention 303 London, never call him the owner
```

---

## Florent Dal Ben-Salles, Ades Bootcamp, ctc_xdGfs3raLhZzrZ3yc

Screen. Thread empty (0 items, nextPage null), control as above.
Owner. Président of ADES BOOTCAMP SAS 928031228 per the 5 Oct files, lemlist jobTitle "Co-Fondateur", lea_GExGFgsBFeWJrJaGn.
Prior verdicts 2026-10-05 in /tmp/claude-0/agents/b5_florent/, judgement NO_STRONG_ANGLE, signals A no and B no. Re judged through A only.

Verdict NO_SIGNAL.

```sweep
lead: Florent Dal Ben-Salles, Président of ADES BOOTCAMP SAS, SIREN 928031228, ctc_xdGfs3raLhZzrZ3yc, lemlist jobTitle Co-Fondateur, tagline "Expert Google Ads ... Co-fondateur d'Ades Bootcamp". Thread pulled 2026-10-06, 0 items, control full. Evidence, judgement and signals files in /tmp/claude-0/agents/b5_florent/ reused as briefed
website: carried from /tmp/claude-0/agents/b5_florent/signals.md, the Webflow site was rebuilt about April 2026 and the B2B page https://www.adesbootcamp.com/ades-business exists since June 2025 with OPCO, devis and its own calendar, no growth gap
gdpr: carried from signals.md, the admission calendars on https://www.adesbootcamp.com/ only load after "Accepter tout" and there's no "Tout refuser", real, but a CookieYes setting for an owner who sells tracking and RGPD work himself
apps: the A lens, refetched 2026-10-06. The homepage carries "Accès Portail Client" and teaches "Maîtrise les automatisations et l'IA générative", /ades-business sells "Routine interne et prompts IA" and a "Playbook IA adapté à votre équipe", B2B quotes follow "Sur devis réponse sous 48 h" and OPCO files get "devis, programme et convention". The 5 Oct judge opened https://onboarding.adesbootcamp.com/onboarding with WEDOF, Qualiobee, Airtable, Teachizy and their own apps, and the BPF shows 179 learners in 2025. They teach AI automation and build their own tools, so it's not an A lead
social: carried from the 5 Oct judgement, tools/social-audit.js on https://www.instagram.com/adesbootcamp/ 2,619 followers, latest 2026-09-29, active, his YouTube last upload 2026-05-31, a channel choice
squad: carried from signals.md, no funding per BODACC, capital 2 euros on https://www.pappers.fr/entreprise/ades-bootcamp-928031228 , no job ads, founders build their own tools, no capacity fact
verdict: NO_STRONG_ANGLE, NO_SIGNAL under the AI default lens. Already tooled with a client portal and their own apps, and they sell AI and automation training themselves. The booking gate stays a favour to mention if he ever replies
```
