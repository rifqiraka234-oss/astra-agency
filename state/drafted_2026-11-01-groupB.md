# Drafts, 2026-11-01, group B, the researched but never sent pool. NOT SENT

Raka, 2026-10-31 ~21.20 UTC, on filling Monday's free slots with group B, "Yeah dont forget openers tomorrow and the prototype
nudges". His angle calls of 23 Oct apply where given (Mersedeh and Kat, AI workflows with did you know; Sandi and Sicko, build
squad with did you know, Sicko "they have a careers page"). The rest were put on the research queue on 23 Oct with no angle.

Threads pulled 2026-10-31 ~21.25 UTC with `tools/lemlist.py thread`, all 11 contacts 0 items, control ctc_ch3vFcKAkjQdMKDCg 7
items. Evidence folder /tmp/claude-0/-home-user-astra-agency/535b0528-0e36-5b6e-a11b-9344c62d2e80/scratchpad/r/<slug>. Re pull the
thread, run the four way never messaged check and reopen every claim in the minute before any send. Daily cap 30 (RULES 1).

## Giulia Restivo, Baldoria Paris, ctc_AnWzeaRanaPfWj7Jq. NOT DRAFTED, the company was already pitched

> Her co-founder Alice Poubelle (ctc_PLeDim4Mhp2CtQyiu) got the website opener on 12 Oct and a bump on 15 Oct, closed silently
> on 19 Oct, and her final closing message is scheduled for Mon 2 Nov 05.00 UTC (closers batch 5). A pitch to Giulia the same
> week would contradict it. Raka's call if Baldoria is ever reopened.

```sweep
lead: Giulia Restivo, co founder of Baldoria Paris, ctc_AnWzeaRanaPfWj7Jq, thread 0 items with the control at 7, queue RESEARCH_QUEUED since 23 Oct
website: crawled with tools/crawl.py, 102 URLs on https://baldoriaparis.com, the site rebuild angle was already pitched to her co founder Alice on 12 Oct per the queue rows for ctc_PLeDim4Mhp2CtQyiu
gdpr: tools/eu-view.py from Stockholm and site-audit.js with its control run on https://baldoriaparis.com, checked, never the angle (RULES 0E)
apps: no separate process angle found in the crawl of https://baldoriaparis.com, and any angle would be a second pitch to the same company
social: accounts opened with tools/social-audit.js from the site's links, recorded in r/giulia/social.log, not a reason to pitch the same company twice
squad: an events and production company per its own pages at https://baldoriaparis.com, not a builder of software, not chosen
verdict: ALREADY_MESSAGED, via her co founder Alice Poubelle, opener 12 Oct, bump 15 Oct, final closer scheduled 2 Nov per the queue and state/drafted_2026-10-28-final-closers.md
```

### Sicko Van Oene, XOLBOR, ctc_XfiYnETWEAui4JYDi

> NOT SENT. Flags for Raka. (1) XOLBOR B.V., KvK 86902601, Utrecht, July 2022, a Roblox studio making branded games, with
> hits of its own (Super Hero Tycoon 2.4 billion visits). The team page lists Sicko as co founder beside Hidde, plus 16
> staff, mostly Lua developers and 3D artists. (2) Your call, build squad with did you know, careers page. The careers page lists a full time
> game artist and a full time Roblox (Lua) developer in Utrecht. It opens "we are always on the lookout" and has no date, so
> the message says the page lists them, not that they're hiring now. (3) The number comes from the Dutch Games Association's
> Games Monitor 2024 (presented May 2025), which ranks the Netherlands second in the world for how hard it is to let staff
> go, footnoted to the OECD's 2019 employment protection data. The OECD page is behind Cloudflare for us (403 on curl and
> fetch-walled), so the message credits the Games Monitor by name rather than stating it bare. The fixed contracts line is a
> round table studio quoted in the report. (4) "In half the time at half the price" isn't used. (5) The
> did you know shape sits outside the A/B test.

```gate
lead: Sicko Van Oene, co founder of XOLBOR, team page "Hidde Co-Founder Sicko Co-Founder" (https://www.xolbor.io/team), Xolbor B.V. KvK 86902601, Jan Pieterszoon Coenstraat 17, Utrecht, registered 2022-07-01 (tools/kvk-search.js 2026-10-31). lemlist jobTitle Co-Founder and Co-Owner, tagline "XOLBOR Creates Roblox Experiences for Brands. Co-Founder: XOLBOR and DEDICATED PEOPLE. Co-Owner: Bfocussed and The Tosti Club." ctc_XfiYnETWEAui4JYDi, leadId lea_AhqzMpcEWnD6HSNKP, W4 TEST, accepted per the queue before 19 Oct. Thread 0 items, control 7
site pass 1: 67 URLs, tools/crawl.py on https://xolbor.io (14 from the sitemap plus paginated studio lists), all 200, every page read (home, branded games, studio, academy, careers, team, blog, two case studies, contact)
site pass 2: 67 URLs, tools/crawl.py again, all 200, plus site-audit.js desktop and phone with both screenshots opened
deep analysis: a Webflow site for a Roblox studio that builds branded games for companies and runs its own hits, Super Hero Tycoon (2.4 billion visits), Princess Tycoon (625 million), Climb and Jump Tower (530 million), Steal A Fish! (244 million, 125.000 CCU). The team page shows two co founders plus 16 staff, a head developer, an art lead, four Lua developers, seven 3D artists, a UGC creator, a business developer and an entertainer. Careers lists jobs "GAME ARTIST DESIGN ... Utrecht FULL TIME" and "GAME DEVELOPER CODE ... a Full-Time Programmer crazy in love with coding for Roblox ... Utrecht FULL TIME", plus two internships. INFERENCE, branded work comes per brand project, so headcount has to follow a pipeline
owner linkedin: Route 1 curl the profile from lemlist 301 to the login wall, walled. Route 2 Google News "Sicko van Oene" 0 with the control at 90. Route 3 KvK, Xolbor B.V. Route 4 the team page, co founder. Route 5 the company LinkedIn page through social-audit.js, 1,063 followers. Route 6 the lemlist record, co founder of XOLBOR and DEDICATED PEOPLE
contact linkedin: same person as the owner, the team page and the lemlist record agree
google news: tools/news.py nl 2026-10-31, "XOLBOR" 1 (KRO-NCRV 20 Nov 2025, "Klaas kan alles komt met eigen game in online speelwereld van Zapp", a branded Roblox game), "Sicko van Oene" 0, control Heineken 90
regional news: tools/news.py (Utrecht game studio) x (Roblox branded games), 0 with the control at 90
industry news: tools/news.py Roblox branded games, 6, Roblox Innovation Awards 2026 (12 Sep 2026), plus the Dutch Games Association's Games Monitor 2024 (https://catalogus.boekman.nl/pub/GM24_losse_paginas.pdf), "The Netherlands is one of the most difficult countries in the world to fire people. In fact, the Netherlands is #2 in this field. When your staff has fixed labor contracts, it's very difficult to -temporarily- scale down your team size", and "staff expenses are by far the premier cost factor for any game studio"
did you know: the Netherlands ranks second in the world for how hard it is to let staff go, and studios say fixed contracts make it very hard to scale a team back down | Dutch Games Association, Games Monitor 2024, presented May 2025, survey of Dutch game companies plus round tables, the ranking footnoted to OECD employment protection data 2019 | https://catalogus.boekman.nl/pub/GM24_losse_paginas.pdf
sources:
1. https://www.xolbor.io/
2. https://www.xolbor.io/careers
3. https://www.xolbor.io/team
4. https://www.xolbor.io/branded-games
5. https://www.kvk.nl/zoeken/?source=all&q=86902601
6. https://catalogus.boekman.nl/pub/GM24_losse_paginas.pdf
7. https://dutchgamesassociation.nl/2025/05/27/games-monitor-2024-presented-at-indigo-dutch-industry-sees-growth-amid-global-challenges/
8. https://www.linkedin.com/company/xolbor
9. https://www.instagram.com/xolborgames/
10. https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fwww.xolbor.io
11. https://news.google.com/rss (tools/news.py)
pains: 4 judged. (1) a studio hiring full time Roblox developers and artists in the country where staff are second hardest to let go, while branded work comes in waves, CHOSEN. (2) the site, a working Webflow site with real numbers, no angle. (3) social, Instagram dormant since March 2023 but LinkedIn active, small. (4) GDPR, no banner found against the control, never the angle
chosen: (1), biggest, every full time hire is a fixed cost through the quiet months, and it's the Build Squad angle Raka named
owner reply: "We like building our own team in Utrecht" | a model, not a gap | the offer is a squad for the peaks around the team they keep, and their own careers page shows they're adding full time seats right now (https://www.xolbor.io/careers "Utrecht FULL TIME")
worth: €6,000+, a Roblox build squad, Lua developers and 3D artists who take on branded game projects at the peaks, scaled up and down per project
still there: co founder on the team page read 2026-10-31 | https://www.xolbor.io/team
budget: a studio of 15+ with games past 2.4 billion visits and branded work for broadcasters like KRO-NCRV | https://www.xolbor.io/
variant: none, the did you know shape sits outside the A/B test (check-drafts in_test), variant_for gives B
sweep website: crawled twice, 67 URLs, a working Webflow site with game stats and case studies, no website angle
sweep gdpr: site-audit.js no banner found against its control, tools/eu-view.py from Stockholm sets 2 Google Analytics cookies (_ga, _ga_WNX3BYZDMS) before any click with no banner, checked, never the angle (RULES 0E)
sweep apps: no internal process named in their pages, the capacity need is on the careers page, not chosen
sweep social: tools/social-audit.js, LinkedIn https://www.linkedin.com/company/xolbor 1,063 followers, Instagram https://www.instagram.com/xolborgames/ 8 followers dormant since 2023, not chosen
sweep squad: a game studio hiring full time Lua developers and artists (https://www.xolbor.io/careers), a capacity buyer, CHOSEN
thread: problem the Netherlands is the second hardest country to let staff go, so studios struggle to scale a team down, and XOLBOR's careers page lists full time Roblox developer and artist jobs | cost every fixed hire carries through the quiet months between branded projects | offer a build squad of Roblox developers and artists that scales with each branded project | link developers, artists
lead read: Sicko reads that Dutch studios can't easily scale a team down and that XOLBOR's own careers page lists full time developer and artist jobs, then gets offered a squad of Roblox developers and artists that scales with each project, one thread
claims:
the Games Monitor 2024 ranks the Netherlands second in the world for how hard it is to let staff go, https://catalogus.boekman.nl/pub/GM24_losse_paginas.pdf "The Netherlands is one of the most difficult countries in the world to fire people. In fact, the Netherlands is #2 in this field"
studios in the report say fixed contracts make it very hard to scale down, https://catalogus.boekman.nl/pub/GM24_losse_paginas.pdf (the CEO and round table members) "When your staff has fixed labor contracts, it's very difficult to -temporarily- scale down your team size"
XOLBOR's careers page lists a full time game artist and Roblox developer in Utrecht, https://www.xolbor.io/careers "GAME ARTIST DESIGN ... Utrecht FULL TIME" and "GAME DEVELOPER CODE ... Full-Time Programmer crazy in love with coding for Roblox ... Utrecht FULL TIME"
recheck: 2026-10-31 after a context reset, the report passage reopened (page 30, footnote 3 to OECD 2019), the careers, team and home pages reread from crawl pass 2, the DGA launch page opened 200, eu-view run. Disproof tried, the OECD page itself is walled (403 on curl and fetch-walled) so the ranking is credited to the Games Monitor in the message, the careers page has no date and says "always on the lookout" so the message says it lists the jobs rather than that they're hiring now, the jobs are full time jobs and not only internships. Facts hold, confidence MEDIUM
```

SKETCH
```
Hi Sicko, XOLBOR looks cool!

However, did you know that the Dutch Games Association's Games Monitor 2024 ranks the Netherlands second in the world for how hard it is to let staff go? Studios in it say fixed contracts make it very hard to scale a team back down, and your careers page lists a full time game artist and Roblox developer.

I'd suggest a build squad of Roblox developers and artists that scales up and down with each branded project.

At Astra agency we build websites and apps for brands like Unilever, AXA, Pertamina.

Shall I send you a sketch of the build squad for XOLBOR?
```

### Sandi Slonjšak, Code Of Us, ctc_T5juhy6XKRrw2ChtX

> NOT SENT. Flags for Raka. (1) Code Of Us d.o.o., Zagreb, founded 19 Feb 2015, Sandi and Robert Rudolf Slonjšak are the
> directors (companywall.hr, OIB 19717666785), 9 employees in the latest year. A software agency for B2B clients, offices in
> Zagreb and Antwerp, and Sandi sits in Antwerp. (2) Your call, build squad with did you know. They sell team extension
> themselves ("We do it with you, we join your team"), so the squad is pitched as overflow under their name while their two
> open roles stay open, the ZeptronIT framing. (3) The .NET Engineer and Flutter Developer pages are both dated 9 June 2026
> and still listed as open today, Zagreb office, .NET at 3.800 to 5.200 EUR gross a month. (4) Eurostat 2024, half of
> Croatian software companies (10+ staff) that tried to hire ICT specialists had vacancies that were hard to fill. Code Of
> Us is under that size line, so the fact is about their market, not them. The top two reasons given were applicants'
> missing ICT training (41%) and missing work experience (39%), which is what the message says Eurostat links it to. (5) The
> job pages are the fact that makes it theirs, as your did you know shape asks, and the word vacancies stays out (clue rule).
> (6) Their LinkedIn page now says "Building
> products to replace tedious workflows in companies, with ai agents" while the site still says web and mobile apps, a
> repositioning angle if the squad call doesn't land.

```gate
lead: Sandi Slonjšak, director of Code Of Us d.o.o., Zagreb, founded 19.02.2015, directors Robert Rudolf Slonjšak and Sandi Slonjšak (https://www.companywall.hr/tvrtka/code-of-us-doo/MMZkfGY read 2026-10-31). lemlist jobTitle "Chief Executive Officer & Founder", tagline "In-House Product Team + Senior Product Judgment + AI-Accelerated Delivery = Software Products That Actually Ship For Benelux Region", location Antwerp. ctc_T5juhy6XKRrw2ChtX, leadId lea_yLrjiRcXG5Zv7HXaS, W4 TEST 50 Owners of growing agencies and tech firms, Build Squad, accepted 19 Oct. Thread 0 items, control 7
site pass 1: 29 URLs, tools/crawl.py on https://codeofus.com (13 from the sitemap), all 200, every page read (home, work, three case studies, about, process, careers, two job pages, open application, contact, privacy, blog)
site pass 2: 29 URLs, tools/crawl.py again, all 200, plus site-audit.js desktop and phone with the desktop screenshot opened, a clean modern site behind a Cookiebot banner
deep analysis: a European software agency building web and mobile apps, cloud and long term product partnerships for B2B clients, three ways to work (we do it for you, with you, all of it). About says 10 team members, 23 projects, average project 12 months. Work shows Go Thrive (Sept 2024), SaaS Innovation Hub for IBD Consulting (April 2024), Teorem (June 2023, "We are still working together"). Careers lists two open roles, .NET Engineer and Flutter Developer, both dated June 9, 2026, Zagreb office at Gradišćanska 34, .NET at "3.800 – 5.200 EUR gross per month". The register shows 5, 9, 9 employees over the last three years. INFERENCE, long client engagements staffed by a team of about ten means every unfilled seat is client work someone else has to carry
owner linkedin: Route 1 curl the profile from lemlist 301 to the login wall, walled. Route 2 Google News "Sandi Slonjšak" 3 results, none about him. Route 3 companywall.hr, director of Code Of Us d.o.o. Route 4 the company LinkedIn page through social-audit.js, 940 followers, "View all 13 employees", "Building products to replace tedious workflows in companies, with ai agents". Route 5 the lemlist record, CEO and founder
contact linkedin: same person as the owner, the register and the lemlist record agree
google news: tools/news.py en 2026-10-31, "Code Of Us" 18 hits all the words in other stories (Microsoft, WSJ), 0 about the company, "Sandi Slonjšak" 3 hits none about him, control Tesco 100
regional news: tools/news.py (Antwerpen software bureau) x (software developers shortage Belgium), 0 with the control at 100. Eurostat isoc_ske_itrcrn2 for Croatia read instead, 2024 computer programming firms (J62_J63, 10+ staff) recruiting ICT specialists, 50.51% had hard to fill vacancies, EU 66.12%
industry news: tools/news.py software developers shortage Belgium, 11, Belgium adding IT roles to its shortage occupation list (Gistlover, 31 Jul 2025), Y Axis Belgium shortage occupations (8 Sep 2026)
did you know: half of Croatian software companies that tried to hire ICT specialists in 2024 had vacancies that were hard to fill | Eurostat, isoc_ske_itrcrn2, 2024, enterprises with 10+ persons employed in NACE J62_J63 computer programming, consultancy and information services, 50.51% of those that recruited or tried to | https://ec.europa.eu/eurostat/api/dissemination/sdmx/2.1/data/isoc_ske_itrcrn2/A.GE10.J62_J63.E_ITSPVAC2.PC_ENT_ITSPRCR2.HR+EU27_2020?format=TSV
sources:
1. https://www.codeofus.com/
2. https://www.codeofus.com/careers
3. https://www.codeofus.com/careers/dotnet-engineer
4. https://www.codeofus.com/careers/flutter-developer
5. https://www.codeofus.com/about
6. https://www.codeofus.com/work
7. https://www.companywall.hr/tvrtka/code-of-us-doo/MMZkfGY
8. https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/isoc_ske_itrcrn2?format=JSON&lang=EN&geo=HR&geo=BE&geo=EU27_2020&sinceTimePeriod=2022
9. https://ec.europa.eu/eurostat/api/dissemination/sdmx/2.1/data/isoc_ske_itrcrn2/A.GE10.J62_J63.E_ITSPVAC2.PC_ENT_ITSPRCR2.HR+EU27_2020?format=TSV
10. https://www.linkedin.com/company/code-of-us
11. https://twitter.com/code_of_us
12. https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fcodeofus.com
13. https://news.google.com/rss (tools/news.py)
pains: 4 judged. (1) two developer roles open since 9 June in a market where half of Croatian software firms struggle to fill such roles, while long client engagements need the seats, CHOSEN. (2) positioning, LinkedIn says AI agents for tedious workflows and the site says web and mobile apps, real but not Raka's call. (3) the blog page reads 6 words in both crawls, small. (4) GDPR, Cookiebot with a reject and 0 cookies before a click, fine, never the angle
chosen: (1), biggest, it's client work waiting on seats, and it's the Build Squad angle Raka named
owner reply: "We are a dev team ourselves, we don't need another one" | true, they sell team extension | the squad is overflow under their name for the seats their own careers pages have shown open since 9 June (https://www.codeofus.com/careers/dotnet-engineer "June 9, 2026")
worth: €6,000+, two senior developers, .NET and Flutter, placed on a Code Of Us client engagement under their name for a month or more
still there: Sandi as director in the register read 2026-10-31 | https://www.companywall.hr/tvrtka/code-of-us-doo/MMZkfGY
budget: a ten year old agency running 12 month B2B engagements with a salary band of 3.800 to 5.200 EUR gross a month per developer | https://www.codeofus.com/careers/dotnet-engineer
sweep website: crawled twice, 29 URLs, a clean modern site with real case studies and named quotes, no website angle beyond the AI repositioning noted
sweep gdpr: site-audit.js found Cookiebot with a reject and 0 cookies before a click against its control, tools/eu-view.py from Stockholm 0 cookies, checked, never the angle (RULES 0E)
sweep apps: their LinkedIn says they now build AI agents for tedious workflows, so an AI workflow pitch would be selling them their own product, not chosen
sweep social: tools/social-audit.js, LinkedIn https://www.linkedin.com/company/code-of-us 940 followers, Twitter https://twitter.com/code_of_us reachable, not chosen
sweep squad: a software agency with .NET and Flutter roles open since 9 June (https://www.codeofus.com/careers), a capacity buyer, CHOSEN
thread: problem half of Croatian software firms hiring tech roles can't easily fill them, and Code Of Us has had .NET and Flutter roles open since 9 June | cost client engagements carry empty seats while the hires don't land | offer a build squad of senior .NET and Flutter developers on their client work under their name | link .NET, Flutter
lead read: Sandi reads that half his Croatian peers can't fill tech roles and that his own .NET and Flutter roles have been up since 9 June, then gets offered .NET and Flutter developers under the Code Of Us name, one thread
claims:
half of Croatian software companies that tried to hire ICT specialists in 2024 had vacancies that were hard to fill, https://ec.europa.eu/eurostat/api/dissemination/sdmx/2.1/data/isoc_ske_itrcrn2/A.GE10.J62_J63.E_ITSPVAC2.PC_ENT_ITSPRCR2.HR+EU27_2020?format=TSV "HR 69.58 50.51" (2022, 2024)
Code Of Us has a .NET role up since 9 June, https://www.codeofus.com/careers/dotnet-engineer ".NET Engineer June 9, 2026" and listed under "Currently opened positions" on https://www.codeofus.com/careers
Code Of Us has a Flutter role up since 9 June, https://www.codeofus.com/careers/flutter-developer "Flutter Developer June 9, 2026"
Eurostat links it to applicants without the right training or experience, the top two reasons Croatian software firms gave in 2024, https://ec.europa.eu/eurostat/api/dissemination/sdmx/2.1/data/isoc_ske_itrcrn2/A.GE10.J62_J63.E_ITSPDLET+E_ITSPDLWE+E_ITSPDLA+E_ITSPDSAL.PC_ENT_ITSPRCR2.HR?format=TSV&startPeriod=2024 "E_ITSPDLET 41.26, E_ITSPDLWE 39.48, E_ITSPDLA 34.79, E_ITSPDSAL 34.26"
the roles are in Zagreb, https://www.codeofus.com/careers/dotnet-engineer "Work in new and modern offices—Gradišćanska 34", the Zagreb office in the footer
recheck: 2026-10-31, both job pages and the careers list reread from crawl pass 2, the register page fetched, Eurostat read through two endpoints (JSON stat and SDMX TSV) agreeing at 50.51 for HR 2024. Disproof tried, Belgium's J62_J63 2024 figure is not published so the fact stays on Croatia where the roles are, the Eurostat line is 10+ staff and Code Of Us has 9 so it's worded as Croatian software companies, not as them, the dates are the pages' own and both roles still sit under "Currently opened positions". Facts hold, confidence MEDIUM, the job pages could be left up after a hire
```

SKETCH
```
Hi Sandi, Code Of Us looks cool!

However, did you know that half of Croatia's software companies hiring for tech roles in 2024 found them hard to fill? Eurostat links it to applicants without the right training or experience, and your .NET and Flutter roles in Zagreb have been up since 9 June.

I'd suggest a build squad of senior .NET and Flutter developers who work on your client projects under the Code Of Us name until the hires land.

At Astra agency we build websites and apps for brands like Unilever, AXA, Pertamina.

Shall I send you a sketch of the squad on a Code Of Us project?
```

### Kat Sale, House of Performance, ctc_SffDGx48HvyaPpAfW

> NOT SENT. Flags for Raka. (1) House of Performance Limited, 13350481, incorporated 21 April 2021, Katherine May Sale and
> Emma Jane Welland the two active directors (Companies House officers page), the company number matches their own privacy
> policy. A London paid media agency, Standout Paid Media Agency of the Year 2025, team page of eight. (2) Your call, AI
> workflow with did you know. (3) The number is AgencyAnalytics' 2026 benchmarks, 494 agency respondents surveyed
> February to April 2026, only 8% of them UK, and AgencyAnalytics sells client reporting software, so it's a vendor survey.
> The full report is behind a form, the 55% is from their 30 June 2026 press release. (4) Their media management page says
> every account gets a Looker Studio dashboard and a weekly performance analysis, and 95% of clients are on 30 day rolling
> contracts, so the weekly analysis is what keeps clients. (5) Their team page calls one director a "Claude guru", so expect
> "we already use AI", the owner reply line answers it.

```gate
lead: Kat Sale, co founder and director of House of Performance Limited, 13350481, incorporated 21 April 2021, officers SALE Katherine May (Active Director, appointed 21 April 2021) and WELLAND Emma Jane (https://find-and-update.company-information.service.gov.uk/company/13350481/officers read 2026-10-31), the number matches https://houseofperformance.co.uk/privacy-policy "company number 13350481". Team page "Kat Sale Co-Founder". lemlist jobTitle Co-Founder, tagline "Paid Media Audits & Mgmt | Co-Founder at House of Performance", Stony Stratford. ctc_SffDGx48HvyaPpAfW, leadId lea_LkjDMctumxHYT7ZHX, W4 TEST 50, accepted. Thread 0 items, control 7
site pass 1: 95 URLs, tools/crawl.py on https://houseofperformance.co.uk (89 from the sitemap), 91 at 200 and 4 at 404 (two work category pages and two old paths), every page read
site pass 2: 95 URLs, tools/crawl.py again, the same 91 and 4, plus site-audit.js desktop and phone with the desktop screenshot opened, a modern site behind a CookieYes banner
deep analysis: a London paid media agency, consultancy (strategic support, auditing, in housing, training) and media management (paid search, paid social, programmatic, ChatGPT ads). About says "Built 5 years ago" and "95% of our clients work with us on 30 day rolling contracts". Media management says "As standard, every account includes a Looker Studio dashboard, weekly performance analysis and regular calls". Audits deliver an executive summary, analysis pack, action roadmap, ranked opportunity list and a stakeholder session. Case studies for Universal, Fuller's, Asda, Jamie Oliver, Bensons for Beds, FixMyCar. The home page shows "Standout Paid Media Agency of the Year 2025", the blog lists 4 UK Agency Awards 2026 nominations (17 Jul 2026). The team page lists eight, two co founders, a non executive director, a paid media director ("Claude guru") and four performance staff. Their iOS 26 post tells clients to track "closed revenue" through CRM integration. INFERENCE, with clients free to leave any month, the weekly analysis is the renewal case, and building it per account is the team's time
owner linkedin: Route 1 curl the profile from lemlist 301 to the login wall, walled. Route 2 Google News "Kat Sale" 9 hits, none about her. Route 3 Companies House, active director since 2021. Route 4 the team page, co founder. Route 5 the company LinkedIn page through social-audit.js, UNKNOWN, could not read. Route 6 the awards post, quoted as "Kat Sale Co-Founder"
contact linkedin: same person as the owner, the register, the team page and the lemlist record agree
google news: tools/news.py en 2026-10-31, "House of Performance" 9 hits, one possibly theirs (Econsultancy 11 Dec 2024, performance marketing trends for 2025), the rest a Dutch consultancy of the same name joining Highberg (2022) and unrelated, "Kat Sale" 9 hits none about her, control Tesco 98
regional news: tools/news.py (Milton Keynes marketing agency) x (paid media agency AI), 3 (allthingsbusiness 1 Jul 2026 on AI in advertising and commercial risk, BBC 7 Dec 2025 on AI and creative jobs, BBC 29 Aug 2025 Domino's ad ruling)
industry news: tools/news.py paid media agency AI, 76, plus AgencyAnalytics' 2026 Marketing Agency Benchmarks press release (30 Jun 2026), "55% say the question they hear most from clients is 'Can you connect marketing performance to revenue?'", "79% of agencies save five or more hours per week using AI, with reporting and performance summaries cited as the area of greatest value (42%)"
did you know: 55% of marketing agencies say the question they hear most from clients is whether they can connect marketing performance to revenue | AgencyAnalytics, 2026 Marketing Agency Benchmarks Report, 494 agency professionals surveyed February to April 2026, US 64%, Australia 13%, UK 8%, Canada 7%, a vendor survey | https://agencyanalytics.com/company/newsroom/press-release-agency-benchmarks-report-2026
sources:
1. https://houseofperformance.co.uk/
2. https://houseofperformance.co.uk/about-us
3. https://houseofperformance.co.uk/about-us/meet-the-team
4. https://houseofperformance.co.uk/media-management
5. https://houseofperformance.co.uk/consultancy-services/auditing
6. https://houseofperformance.co.uk/blog/ios26-and-the-impacts-on-attribution-and-digital-marketing
7. https://houseofperformance.co.uk/privacy-policy
8. https://find-and-update.company-information.service.gov.uk/company/13350481/officers
9. https://agencyanalytics.com/company/newsroom/press-release-agency-benchmarks-report-2026
10. https://agencyanalytics.com/p/agency-benchmarks-2026
11. https://www.instagram.com/houseofperformanceuk/
12. https://www.facebook.com/houseofperformanceltd/
13. https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fhouseofperformance.co.uk
14. https://news.google.com/rss (tools/news.py)
pains: 4 judged. (1) every account gets a weekly performance analysis while clients most want marketing tied to revenue and 95% can leave any month, so the analysis is hand built proof, CHOSEN. (2) LinkedIn page unreadable to our tools, Instagram 740 followers posting this week, no social angle. (3) the site, modern and awarded, no angle. (4) GDPR, CookieYes with a reject, eu-view 2 first party cookies (CSRF and the consent cookie) before a click, fine, never the angle
chosen: (1), costliest, it's hours per account every week, and it's the AI workflow angle Raka named
owner reply: "Alex is our Claude guru, we already use AI" | true, their team page says so | a chat window doesn't pull each client's ad and CRM revenue data into their weekly format, the workflow does (https://houseofperformance.co.uk/about-us/meet-the-team "Claude guru", https://houseofperformance.co.uk/media-management "weekly performance analysis")
worth: €6,000+, an AI workflow that joins each client's Google, Meta and LinkedIn ad data with their CRM or shop revenue and drafts the weekly performance analysis in HOP's format for the team to review
still there: Katherine May Sale active director on the officers page read 2026-10-31 | https://find-and-update.company-information.service.gov.uk/company/13350481/officers
budget: an award winning agency with Asda, Universal and Jamie Oliver case studies and eight staff | https://houseofperformance.co.uk/
sweep website: crawled twice, 95 URLs, modern site, awards, case studies, no website angle
sweep gdpr: site-audit.js found CookieYes with a reject against its control, tools/eu-view.py from Stockholm 2 first party cookies (CRAFT_CSRF_TOKEN, cookieyes-consent), checked, never the angle (RULES 0E)
sweep apps: the weekly analysis per account (https://houseofperformance.co.uk/media-management), an AI workflow candidate, CHOSEN
sweep social: tools/social-audit.js, LinkedIn https://www.linkedin.com/company/house-of-performance-uk/ UNKNOWN unreadable, Instagram https://www.instagram.com/houseofperformanceuk/ 740 followers last post 29 Oct 2026, Facebook https://www.facebook.com/houseofperformanceltd/ 107, not chosen
sweep squad: an agency of eight running client accounts, they hire paid media people not builders, not chosen
thread: problem clients ask most whether marketing ties to revenue, and HOP writes a weekly analysis for every account | cost hours per account every week building that proof by hand, with 95% of clients on 30 day rolling contracts | offer an AI workflow joining ad and revenue data that drafts the weekly analysis | link revenue, weekly
lead read: Kat reads that most agencies get asked to tie marketing to revenue and that every HOP account gets a weekly analysis, then gets offered an AI workflow that drafts that weekly analysis from ad and revenue data, one thread
claims:
55% of marketing agencies say the question they hear most from clients is about connecting marketing performance to revenue, https://agencyanalytics.com/company/newsroom/press-release-agency-benchmarks-report-2026 "55% say the question they hear most from clients is 'Can you connect marketing performance to revenue?'"
AgencyAnalytics surveyed 494 agencies in 2026, https://agencyanalytics.com/p/agency-benchmarks-2026 "494 marketing agencies" and "From February to April 2026"
every HOP account gets a weekly performance analysis, https://houseofperformance.co.uk/media-management "As standard, every account includes a Looker Studio dashboard, weekly performance analysis and regular calls"
recheck: 2026-10-31, the press release and the landing page fetched, the media management, about, team and privacy pages reread from crawl pass 2, Companies House officers fetched. Disproof tried, searched for a second source for the 55% and found only the press release, so it's credited to AgencyAnalytics by name, checked HOP don't already sell automated reporting (they offer a Looker dashboard plus a weekly analysis, the analysis is the human part), the landing page's 81% confident against the press release's 88% shows the vendor's own numbers drift, so only the press release figure is used. Facts hold, confidence MEDIUM
```

SKETCH
```
Hi Kat, House of Performance looks cool!

However, did you know that 55% of marketing agencies say the question clients ask most is whether they can tie marketing to revenue? AgencyAnalytics found it in a 2026 survey of 494 agencies, and every HOP account gets a weekly performance analysis.

I'd suggest an AI workflow that joins each client's ad data with their revenue and drafts that weekly analysis in your format for the team to check.

At Astra agency we build AI workflows for brands like Unilever, AXA, Pertamina.

Shall I send you a sketch of the AI workflow for HOP?
```

### Mersedeh Heydari, MOODI (The Moodi Studio), ctc_Eri95nNgTJe8c6Lf5

> NOT SENT. Flags for Raka. (1) THE MOODISTUDIO LTD, 16377797, incorporated 9 April 2025, London W12, Mersedeh
> Heydarialikamar active director since 4 May 2026 (the co director resigned 16 May 2026). A London fashion label from 2024,
> eleven pieces from £129 to £890, editions of 10, numbered, optional embroidery, fashion shaped by gaming. (2) Your call,
> AI workflow with did you know. Her Instagram (3,406 followers, 136 posts) last posted on 4 August per social-audit.js
> today, so the workflow is a posting one. (3) The number is Buffer's, published 13 Aug 2025, 2 million+ posts from
> 100,000+ accounts, all accounts not fashion only, and Buffer sells scheduling software. It's a correlation, Buffer says
> "can more than double", so the message keeps "can". (4) Budget is the soft spot, a one director label with eleven pieces.
> (5) site-audit.js printed RENDER NOT TRUSTED for this site, so no visual or site claim is made anywhere.

```gate
lead: Mersedeh Heydari, founder of MOODI, active director of THE MOODISTUDIO LTD, 16377797, incorporated 9 April 2025, officers HEYDARIALIKAMAR Mersedeh (Active Director, appointed 4 May 2026) and ALARAHIMI Alireza (resigned 16 May 2026) (https://find-and-update.company-information.service.gov.uk/company/16377797/officers read 2026-10-31). About page "Founded in London by Mersedeh Heydari, Founder and Creative Director". lemlist jobTitle Founder, tagline "Fashion and Game Design | Creative Director". ctc_Eri95nNgTJe8c6Lf5, leadId lea_hc364vG7Lhv9vfPs9, W1b Owners of new 1-10 consumer businesses on DIY site builders, accepted. Thread 0 items, control 7
site pass 1: 72 URLs, tools/crawl.py on https://themoodistudio.com (5 from the sitemap, the rest products, collections, oembed and checkout links), all 200, every product, collection and policy page read
site pass 2: 72 URLs, tools/crawl.py again, all 200, plus site-audit.js which printed RENDER NOT TRUSTED (2 of 2 failed assets served fine directly), so its screenshots are void and no visual finding is used
deep analysis: a Shopify store for a London label ("LONDON EST. 2024"), eleven products in stock from £129 (Confusion Vest) to £890 (Light Grey Signature Coat, Black Anxious Sweatshirt), each "a strictly limited edition of 10 pieces worldwide", hand numbered, the buyer picks the edition number and can add embroidery. Pieces are named for moods (Wonder, Confusion, Delighted, Trust, Care Free, Anxious). About ties it to gaming, "Inspired by the way games build characters". The news blog is empty. Instagram is the one channel linked from the footer. INFERENCE, a new label selling ten of each piece lives on attention, and the channel it links to has gone quiet
owner linkedin: Route 1 curl the profile from lemlist 301 to the login wall, walled. Route 2 Google News "Mersedeh Heydari" 0 with the control at 98. Route 3 Companies House, active director of THE MOODISTUDIO LTD. Route 4 the about page, founder and creative director. Route 5 Instagram through social-audit.js, https://www.instagram.com/themoodistudio/ 3,406 followers
contact linkedin: same person as the owner, the about page, the register and the lemlist record agree (the register spells the surname Heydarialikamar)
google news: tools/news.py en 2026-10-31, "Moodi Studio" 0, "Mersedeh Heydari" 0, control Tesco 98
regional news: tools/news.py (UK fashion design studio) x (fashion game design), 33, The Guardian 27 Sep 2026 on Es Devlin, The Guardian 20 Sep 2026 London fashion week, none about MOODI
industry news: tools/news.py fashion game design, 84, WWD 3 Sep 2026 on designer moves, UK Nigeria Season of Culture call for fashion and gaming creatives (5 Sep 2026), plus Buffer's Instagram frequency study (13 Aug 2025)
did you know: Instagram accounts posting 3 to 5 times a week can more than double their follower growth rate against posting once or twice, and weeks with no posts sit below an account's usual growth | Buffer, published 13 Aug 2025, over 2 million posts from 100,000+ Instagram accounts, a vendor study | https://buffer.com/resources/how-often-to-post-on-instagram/
sources:
1. https://themoodistudio.com/
2. https://themoodistudio.com/pages/about
3. https://themoodistudio.com/products/confusion-vest
4. https://themoodistudio.com/collections/all
5. https://themoodistudio.com/pages/returns
6. https://themoodistudio.com/blogs/news
7. https://find-and-update.company-information.service.gov.uk/company/16377797/officers
8. https://www.instagram.com/themoodistudio/
9. https://buffer.com/resources/how-often-to-post-on-instagram/
10. https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fthemoodistudio.com
11. https://news.google.com/rss (tools/news.py)
pains: 4 judged. (1) a label of ten piece editions whose one linked channel, Instagram, has been silent since 4 August, CHOSEN. (2) product pages, most of the twelve product pages carry no size guide in the crawled text (two do), not used, the render isn't trusted and a text crawl can miss a tab. (3) the news blog is empty, small. (4) GDPR, no banner found against the control and Shopify analytics and marketing cookies set from Stockholm before a click, never the angle
chosen: (1), biggest, ten numbered pieces per design only sell if people keep seeing them, and it's the AI workflow angle Raka named
owner reply: "It's a luxury label, posting less is the point" | scarcity is the brand | the workflow drafts in her own voice from her own pieces and she approves every post, and Buffer's data says silent weeks sit below an account's usual growth (https://buffer.com/resources/how-often-to-post-on-instagram/ "no-post penalty")
worth: €3,000+, an AI workflow that reads each Shopify piece, its photos, mood, edition numbers left and embroidery options and drafts a week of Instagram posts and captions in MOODI's voice for her to approve and schedule
still there: Mersedeh active director on the officers page read 2026-10-31 | https://find-and-update.company-information.service.gov.uk/company/16377797/officers
budget: a label selling coats at £890 and £485 with numbered editions and a registered company | https://themoodistudio.com/collections/all
sweep website: crawled twice, 72 URLs, a working Shopify store with a clear edition and personalisation flow, render not trusted so nothing visual is claimed, not chosen
sweep gdpr: site-audit.js no banner found against its control, tools/eu-view.py from Stockholm sets Shopify essential, analytics and marketing cookies before a click, checked, never the angle (RULES 0E)
sweep apps: a posting workflow from the Shopify catalogue to Instagram drafts, CHOSEN
sweep social: tools/social-audit.js, Instagram https://www.instagram.com/themoodistudio/ 3,406 followers, 136 posts, last post 4 Aug 2026, the only social link on the site, feeds the chosen angle
sweep squad: a one director fashion label, no build team to extend, not chosen
thread: problem accounts posting 3 to 5 times a week can more than double follower growth, and MOODI's last post went up on 4 August | cost ten numbered pieces per design that fewer people see each quiet week | offer an AI workflow that drafts a week of posts from each piece for her to approve | link posts, week
lead read: Mersedeh reads that regular posting can double follower growth and that her last post was 4 August, then gets offered an AI workflow that drafts a week of posts from her own pieces, one thread
claims:
Instagram accounts posting 3 to 5 times a week can more than double their follower growth rate against once or twice, https://buffer.com/resources/how-often-to-post-on-instagram/ "Posting between 3 and 5 times weekly can more than double follower growth rate, compared to posting one or two times weekly"
Buffer's study covers 2 million posts, https://buffer.com/resources/how-often-to-post-on-instagram/ "We analyzed over 2 million posts from 100,000+ Instagram accounts"
MOODI's last Instagram post went up on 4 August, https://www.instagram.com/themoodistudio/ read by tools/social-audit.js 2026-10-31, lastPostLabel 2026-08-04, 136 posts, 3,406 followers
recheck: 2026-10-31, Buffer's page fetched and the sentences read, the officers page fetched, the store pages reread from crawl pass 2, social-audit.js run today. Disproof tried, Buffer's numbers checked on its own page rather than the write ups (one cites 9.6 million posts, Buffer says 2 million), "can" kept because Buffer says can and it's a correlation, the Instagram date is from one tool so it's re read in the minute before any send. Facts hold, confidence MEDIUM
```

SKETCH
```
Hi Mersedeh, MOODI looks cool!

However, did you know that Instagram accounts posting 3 to 5 times a week can grow followers more than twice as fast as those posting once or twice? Buffer found it across 2 million posts, and MOODI's last post went up on 4 August.

I'd suggest an AI workflow that turns each piece's mood, photos and edition numbers into a week of posts for you to approve.

At Astra agency we build AI workflows for brands like Unilever, AXA, Pertamina.

Shall I send you a sketch of the posting workflow for MOODI?
```

### Darren Gilligan, Liverpool Tour Experiences, ctc_yF9Zxdgp3anbjKB5x

> NOT SENT. SUPERSEDES the 12 Oct draft (the +1 WhatsApp button he fixed minutes before that send, so it's dead). Flags
> for Raka. (1) Your 12 Oct call was "website OR social media". Social is active (Instagram 1,614 followers, last post
> 27 Oct, Facebook 635, TikTok 1,930), so it's the website. (2) He builds the site himself on GoDaddy and has been adding
> FareHarbor booking, six tour pages carry a calendar today against three on 12 Oct, so "you can't book online" is false.
> The angle is the look plus the homepage, a 5.0 firm from over 300 reviews on a template whose homepage asks for a
> contact or a quote and books nothing. (3) He moved the trade side to its own GoDaddy site, dmc-liverpool.com, and five
> old DMC menu pages on the main site are now empty (Liverpool DMC, Incentive Travel, Event Planning, Liverpool
> Destination, What is a DMC?). A ten minute fix, kept out. (4) The name search returns an unrelated Irish Darren
> Gilligan in court stories, never used.

```gate
lead: Darren Lea Gilligan, founder of Liverpool Tour Experiences, Active Director of TOUR POUR LIMITED 16739086 since 24 September 2025, also its secretary (https://find-and-update.company-information.service.gov.uk/company/16739086/officers read 2026-10-31), 12 Oct research also found him director of BREWERY TOURS LTD 14503133 and the FareHarbor account is "brewerybustoursliverpool". lemlist jobTitle Founder, company "Liverpool Tour Experiences | DMC". The site's cruise page reviews name him, "Fantastic service from Darren". ctc_yF9Zxdgp3anbjKB5x, leadId lea_m3HbrGhQE7fKDsHQq, accepted. Thread 0 items, control 7
site pass 1: 77 URLs, tools/crawl.py on https://liverpooltourexperiences.co.uk (71 from the sitemap), 75 at 200, 1 at 000 and 1 at 404, every page read
site pass 2: 77 URLs, tools/crawl.py again, the same 75, 1 and 1, plus 41 non blog pages refetched raw over the bare domain (retried where our proxy reset) to count booking calendars and buttons, site-audit.js desktop and phone screenshots opened, and dmc-liverpool.com/trade-partners fetched
deep analysis: a GoDaddy Website Builder 8 site ("Starfield Technologies; Go Daddy Website Builder 8.0.0000"), an orange WhatsApp bar, a scrolling "Liverpool's local Tour and transport experts" banner, a group photo hero. Tours from £30 (Chester and Cheshire Oaks) to £795 to £1,095 per vehicle for cruise excursions, minibus hire, transfers, football tours, a 2027 cruise call schedule ("101 cruise ship calls are published for Liverpool in 2027"). FareHarbor calendars on six tour pages (best of Liverpool, LFC fan day, Liverpool FC shore ex, pub history, Welsh adventure shore tour, wine and vineyard). The cruise page shows "5.0 on Google ... From over 100 Google reviews" and "From over 200 Tripadvisor reviews". The homepage buttons are "Start Your Liverpool Adventure Today! Contact us", "Get a quote today", "View Brewery Bus Tour", "Plan a Private Liverpool Tour", "View Tour Details", "Get a quote", "Send us your enquiry on WhatsApp", and the homepage carries no FareHarbor calendar or book button. The trade side lives at https://dmc-liverpool.com/trade-partners, also GoDaddy. INFERENCE, a cruise passenger or visitor who lands on the homepage has to message him before they can buy, while the same tours take bookings two clicks away
owner linkedin: Route 1 https://www.linkedin.com/in/darrengilligan/ through social-audit.js, unreadable. Route 2 Google News "Darren Gilligan" 32, all an unrelated Irish man, never used. Route 3 Companies House, director of TOUR POUR LIMITED. Route 4 the site's reviews naming Darren as driver and guide. Route 5 the lemlist record, founder
contact linkedin: same person as the owner, the register, the reviews and the lemlist record agree
google news: tools/news.py en 2026-10-31, "Liverpool Tour Experiences" 2 hits, neither about the company, "Darren Gilligan" 32 about someone else, control Tesco 100
regional news: tools/news.py (Liverpool tourism) x (Liverpool cruise passengers OR group tours), 33, Liverpool Express 4 Sep 2026 on the Disney Dream visit
industry news: tools/news.py Liverpool cruise passengers OR group tours, 77, Travel Weekly 21 Oct 2026 "Cunard to mark 500th transatlantic crossing with Liverpool departure"
sources:
1. https://liverpooltourexperiences.co.uk/
2. https://liverpooltourexperiences.co.uk/liverpool-cruise-tours
3. https://liverpooltourexperiences.co.uk/cruise-ships-2027
4. https://liverpooltourexperiences.co.uk/pub-history-tour
5. https://liverpooltourexperiences.co.uk/wine-%26-vineyard-tour
6. https://liverpooltourexperiences.co.uk/liverpool-dmc
7. https://dmc-liverpool.com/trade-partners
8. https://find-and-update.company-information.service.gov.uk/company/16739086/officers
9. https://www.instagram.com/liverpool_tour_experiences_/
10. https://www.facebook.com/people/Liverpool-Tour-Experiences/61556224343389/
11. https://www.tiktok.com/@liverpooltourexper
12. https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fliverpooltourexperiences.co.uk%2F
13. https://news.google.com/rss (tools/news.py)
pains: 5 judged. (1) a 5.0 firm from over 300 reviews on a template whose homepage asks for a contact or quote and books nothing, while six tours already book online, CHOSEN. (2) five empty DMC menu pages since the trade side moved to dmc-liverpool.com, a ten minute fix, out (RULES 0E). (3) the cruise quote form, he prices per vehicle and quotes groups by hand, folded into (1). (4) social, all accounts active, no angle. (5) GDPR, a banner with decline, eu-view 4 first party cookies with Facebook and Google Analytics hosts requested, never the angle
chosen: (1), biggest, the homepage is where visitors land and it's the one page that can't take a booking, and the look undersells his reviews (RULES 4A, dated look on a strong firm)
owner reply: "I've just added online booking to my tours" | true, six tour pages have FareHarbor | it's the homepage and the look that don't match, the homepage still books nothing and asks visitors to contact you (https://liverpooltourexperiences.co.uk/ buttons "Contact us", "Get a quote")
worth: €4,000+, a modern site for tours, cruise excursions and transport that shows the 5.0 reviews up front and books tours from the homepage through his FareHarbor account, with the cruise schedule tied to the shore tours
still there: Darren active director on the officers page read 2026-10-31 | https://find-and-update.company-information.service.gov.uk/company/16739086/officers
budget: cruise excursions at £795 to £1,095 per vehicle and coach groups of 200 or more | https://liverpooltourexperiences.co.uk/liverpool-cruise-tours
variant: A
sweep website: crawled twice, 77 URLs, 41 pages refetched raw, desktop and phone screenshots opened, a GoDaddy template whose homepage books nothing while six tour pages do, CHOSEN
sweep gdpr: site-audit.js found a banner with a reject against its control, tools/eu-view.py from Stockholm 4 first party cookies and Facebook and Google Analytics requested before a click, checked, never the angle (RULES 0E)
sweep apps: group quotes over WhatsApp and a quote form, folded into the website angle, not a separate pitch
sweep social: tools/social-audit.js, Instagram https://www.instagram.com/liverpool_tour_experiences_/ 1,614 followers last post 27 Oct 2026, Facebook 635, TikTok https://www.tiktok.com/@liverpooltourexper 1,930, all active, not chosen
sweep squad: a tour and transport operator, builds no software, not chosen
thread: problem the site doesn't look like a 5.0 firm and its homepage books nothing | cost visitors who land on the homepage have to contact him before they can buy | offer a modern site that books tours from the homepage | link book, homepage
lead read: Darren reads that his site undersells his 5.0 reviews and that the homepage books nothing though his tours already book online, then gets offered a modern site that books tours from the homepage, one thread
claims:
rated 5.0 from over 300 Google and Tripadvisor reviews, https://liverpooltourexperiences.co.uk/liverpool-cruise-tours "5.0 ★ on Google ... From over 100 Google reviews" and "5.0 ★ on Tripadvisor ... From over 200 Tripadvisor reviews"
the main homepage button says Contact us, https://liverpooltourexperiences.co.uk/ "Start Your Liverpool Adventure Today! Contact us"
nothing on the homepage books a tour, https://liverpooltourexperiences.co.uk/ raw HTML 0 FareHarbor mentions and no book button, positive control the same count found FareHarbor calendars on six tour pages of the same site in the same run
the Pub History Tour already takes bookings online, https://liverpooltourexperiences.co.uk/pub-history-tour "FareHarbor calendar of item #470578"
recheck: 2026-10-31, homepage, cruise page and pub history page raw HTML read, Companies House officers fetched, the DMC trade site fetched. Disproof tried, counted FareHarbor on every non blog page (six found, so online booking exists and the message says so), checked the empty DMC pages against the trade site link before calling them a gap (they're leftovers, kept out), checked the review counts are the site's own. Facts hold, confidence MEDIUM, he edits the site often so every claim is re read in the minute before a send
```

SKETCH
```
Hi Darren, Liverpool Tour Experiences looks cool!

However, your website doesn't look like a firm rated 5.0 from over 300 Google and Tripadvisor reviews. Its main button says Contact us and nothing on the homepage books a tour, though the Pub History Tour already takes bookings online.

I'd suggest a modern site that looks as good as your reviews and lets visitors and cruise passengers book a tour straight from the homepage.

At Astra agency we make websites for brands like Unilever, AXA, Pertamina.

Shall I send you a sketch of the new homepage?
```

### Florent Dal Ben-Salles, Ades Bootcamp, ctc_xdGfs3raLhZzrZ3yc

> NOT SENT. SUPERSEDES the 14 Oct draft, same angle, every claim reopened today and the wording brought to the current
> template. Flags for Raka. (1) Your call 14 Oct, "skip unless build squad shows theyre growing". Still growing, the site
> went from 163 to 250 pages since 14 Oct, seventeen batches, the RNCP block, the move into SKEMA Business School in 2026,
> Instagram 3,015 followers posting this week, and they ran the first Media Buying Awards and a Mastermind in October.
> (2) The 15 Oct hiring check found no developer job and no developer on the team list, so who builds Ades Sim is unknown,
> the squad is our inference. (3) "In half the time at half the price" is dropped, say if you want it back.

```gate
lead: Florent Rodolphe Dal Ben-Salles, Président de SAS of ADES BOOTCAMP, SIREN 928031228, created 2024-04-23, Paris, Romaric Kerdelhue Directeur Général (https://recherche-entreprises.api.gouv.fr/search?q=ades%20bootcamp read 2026-10-31 through fr.py). lemlist jobTitle Co-Fondateur, tagline "Expert Google Ads ... Co-fondateur d'Ades Bootcamp". ctc_xdGfs3raLhZzrZ3yc, leadId lea_GExGFgsBFeWJrJaGn. Thread 0 items, control 7
site pass 1: 250 URLs, tools/crawl.py on https://adesbootcamp.com (155 from the sitemaps), all 200, every page read
site pass 2: 250 URLs, tools/crawl.py again, all 200, plus site-audit.js which printed RENDER NOT TRUSTED (12 of 12 failed assets served fine directly), so no visual claim is used, the 14 Oct render-via-curl.js pass found the site modern
deep analysis: a Qualiopi certified media buying bootcamp in Paris, "1000+ élèves", 4.9/5, "Dix-sept promos", the RNCP39250 block with Oreegami, "Le programme Ades intègre SKEMA Business School" in 2026 (https://adesbootcamp.com/qui-sommes-nous). They run their own software, "Ades Sim reproduit Google Ads, Meta Ads, GA4, Tag Manager et Data Studio. Vous agissez sur un compte, l'IA vous corrige tout de suite" (https://adesbootcamp.com/experience-ades), plus a Hub and a Salon. The course menu on every page lists "TikTok Ads Bientôt Snapchat Ads Bientôt Pinterest Ads Bientôt". October saw the first Media Buying Awards and "Le 1er Mastermind Media Buying en France". INFERENCE, each new platform course needs its copy in Ades Sim before students can practise on it, and nothing on the site says who builds those copies
owner linkedin: Route 1 the profile, walled (999 on 14 Oct). Route 2 Google News "Florent Dal Ben-Salles" 3, Favikon 2 Oct 2025 top 20 PPC influencers in France. Route 3 the register, Président. Route 4 the blog bylines, "Florent Dal Ben-Salles Expert Google Ads". Route 5 the company LinkedIn through social-audit.js, unreadable. Route 6 the lemlist record
contact linkedin: same person as the owner, the register, the blog and the lemlist record agree
google news: tools/news.py fr 2026-10-31, "Ades Bootcamp" 2 (CB News 5 Oct 2026, the first Media Buying Awards on 5 Nov), "Florent Dal Ben-Salles" 3, control Carrefour 100
regional news: tools/news.py (formation media buyer) x (formation Google Ads freelance), 0 with the control at 100
industry news: tools/news.py formation Google Ads freelance, 7, E-marketing.fr 21 May 2026 top 5 marketing training platforms, Journal du CM 4 Aug 2026
sources:
1. https://adesbootcamp.com/
2. https://adesbootcamp.com/qui-sommes-nous
3. https://adesbootcamp.com/experience-ades
4. https://adesbootcamp.com/freelance-house
5. https://adesbootcamp.com/blog
6. https://recherche-entreprises.api.gouv.fr/search?q=ades%20bootcamp
7. https://www.instagram.com/adesbootcamp/
8. https://www.linkedin.com/company/ades-bootcamp/
9. https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fadesbootcamp.com
10. https://adesbootcamp.com/formation-google-analytics4
11. https://news.google.com/rss (tools/news.py)
pains: 4 judged. (1) Ades Sim covers five tools while TikTok, Snapchat and Pinterest Ads courses wait as coming soon, a build queue for a school growing into SKEMA, CHOSEN. (2) the site, 250 modern pages, no website angle. (3) social, Instagram 3,015 posting 30 Oct, no angle. (4) GDPR, CookieYes with no reject found and 16 cookies before a click, never the angle
chosen: (1), hottest, three platform courses are announced and waiting, and the school is scaling into higher education
owner reply: "We built Ades Sim in house" | likely, it's theirs | the three new platforms still say coming soon today, so the squad builds the next copies beside whoever built the first five (https://adesbootcamp.com/ "TikTok Ads Bientôt Snapchat Ads Bientôt Pinterest Ads Bientôt")
worth: €10,000+, TikTok, Snapchat and Pinterest Ads copies inside Ades Sim with the same AI correction, built by our build squad
still there: Florent as Président in the register read 2026-10-31 | https://recherche-entreprises.api.gouv.fr/search?q=ades%20bootcamp
budget: a Qualiopi school with 1000+ students, a CPF route, an RNCP block and SKEMA integration | https://adesbootcamp.com/qui-sommes-nous
variant: A
sweep website: crawled twice, 250 URLs, modern per the 14 Oct curl render, render not trusted today so nothing visual is claimed, not chosen
sweep gdpr: site-audit.js found CookieYes with no reject and 16 cookies before a click against its control, tools/eu-view.py from Stockholm 14 cookies (6 first party, 8 third party) before a click, checked, never the angle (RULES 0E)
sweep apps: Ades Sim and the Hub per https://adesbootcamp.com/experience-ades, folded into the squad
sweep social: tools/social-audit.js, Instagram https://www.instagram.com/adesbootcamp/ 3,015 followers last post 30 Oct 2026, LinkedIn unreadable, not chosen
sweep squad: a growing school building its own simulator with three platforms still to come, CHOSEN
thread: problem Ades Sim copies five tools while the TikTok, Snapchat and Pinterest Ads courses still say coming soon | cost each new platform waits for its copy to be built before students can practise on it | offer a build squad that builds the next Ades Sim platforms | link Sim, platform
lead read: Florent reads that Ades Sim covers five tools while three new courses still say coming soon, so each new platform waits for its copy, then gets offered a build squad to build the next Ades Sim platforms, one thread
claims:
Ades Sim copies five tools from Google Ads to Data Studio, https://adesbootcamp.com/experience-ades "Ades Sim reproduit Google Ads, Meta Ads, GA4, Tag Manager et Data Studio"
TikTok, Snapchat and Pinterest Ads still say coming soon, https://adesbootcamp.com/ "TikTok Ads Bientôt Snapchat Ads Bientôt Pinterest Ads Bientôt" (226 of 250 pages carry it in the menu)
INFERENCE, each new platform likely waits until someone builds its copy, rests on https://adesbootcamp.com/experience-ades and the Bientôt menu on https://adesbootcamp.com/, worded likely
recheck: 2026-10-31, both quotes found in crawl pass 2 today, the register reread, the thread pulled. Disproof tried, searched all 250 pages for a TikTok, Snapchat or Pinterest simulator (Ades Sim still lists five tools), searched for a developer job or recruiting page (none, recruteur hits are course copy). Facts hold, confidence MEDIUM
```

SKETCH
```
Hi Florent, Ades Bootcamp looks cool!

However, your Ades Sim copies five tools from Google Ads to Data Studio, while TikTok, Snapchat and Pinterest Ads still say coming soon. Each new platform your students want to practise on likely waits until someone builds its copy.

I'd suggest a build squad that builds the next Ades Sim platforms beside your team, starting with TikTok Ads.

At Astra agency we build websites and apps for brands like Unilever, AXA, Pertamina.

Shall I send you a sketch of TikTok Ads inside Ades Sim?
```

### Emmanuel Montecer, Marques de France, ctc_z9nJPbeK9Q7sHv5aK

> NOT SENT. SUPERSEDES the 14 Oct draft, same Build Squad angle, every claim reopened today, now in the B arm shape that
> his contactId draws. Flags for Raka. (1) Your 14 Oct call was modernisation. It stays Build Squad because the footer says
> "Site conçu par Echo Conseils", his own agency, so a modernise pitch gets "we build that ourselves". Say the word for the
> modernise version. (2) The 15 Oct hiring check found no developer jobs, so the squad is our inference. Since then the app
> went from 1.3.0 to 1.5.0 (28 Oct), they keep shipping. (3) No "half the time at half the price".

```gate
lead: Emmanuel Montecer, Président de SAS of MARQUES DE FRANCE, SIREN 888485273, created 2020-08-12, Meximieux, Élodie Lapierre Directeur Général (https://recherche-entreprises.api.gouv.fr/search?q=888485273 read 2026-10-31 through fr.py). lemlist jobTitle Co-Founder, tagline "Co-founder at Marques de France and Echo Conseils". ctc_z9nJPbeK9Q7sHv5aK, leadId lea_jKywEWtiMxsjCybnw. Thread 0 items, control 7
site pass 1: 250 URLs, tools/crawl.py on https://marques-de-france.fr (4386 in the sitemaps, 250 cap), all 200, every page read
site pass 2: 250 URLs, tools/crawl.py again, all 200, plus the wp-json posts feed read for every launch date and site-audit.js desktop and phone screenshots
deep analysis: the made in France buying guide, revenue from listings, sponsored posts and affiliate links. 2026 launches from their own posts feed, a mobile app (23 Feb), a Shopify app (16 May), a WooCommerce extension (28 May), a PrestaShop module (19 Jun), an AI gift assistant (13 Oct), plus the Trophées Marques de France (May). The App Store record shows seller "Marques de France (Apps)", released 2026-02-17, version 1.5.0 on 2026-10-28. Since Feb 2025 the same team runs Echo Conseils, "une agence dédiée à celles et ceux qui veulent accélérer leur croissance digitale, bien au-delà de Marques de France", "Une agence à taille humaine". The footer reads "Site conçu par Echo Conseils". The register lists one establishment and a headcount band of 01. INFERENCE, a small team shipping five products this year while selling client work means the guide's next feature competes with client deadlines
owner linkedin: Route 1 the profile, walled (999 on 14 Oct). Route 2 his author page https://www.marques-de-france.fr/author/emmanuel/. Route 3 the register, Président. Route 4 Google News, RMC 24 Apr 2026 "Emmanuel Montecer à votre service". Route 5 the company LinkedIn through social-audit.js, unreadable. Route 6 the lemlist record
contact linkedin: same person as the owner, the register, his author page and the lemlist record agree
google news: tools/news.py fr 2026-10-31, "Marques de France" 10 (La Vie Economique 20 Oct 2026 "S.24 rejoint Marques de France", RMC 24 Apr 2026 on the app), control Carrefour 100
regional news: tools/news.py (Lyon made in France) x (made in France marques), Lyon Entreprises 11 Apr 2026 on the app (14 Oct read)
industry news: tools/news.py made in France marques, plus their own Trophées Marques de France 2026 winners post (5 May 2026)
sources:
1. https://marques-de-france.fr/
2. https://www.marques-de-france.fr/wp-json/wp/v2/posts?per_page=40
3. https://www.marques-de-france.fr/marques-de-france-lance-la-1ere-application-mobile-dediee-au-made-in-france/
4. https://www.marques-de-france.fr/marques-de-france-lance-son-application-officielle-sur-shopify/
5. https://www.marques-de-france.fr/marques-de-france-deploie-son-module-officiel-pour-prestashop/
6. https://www.marques-de-france.fr/marques-de-france-lance-le-premier-assistant-qui-vous-aide-a-trouver-des-cadeaux-vraiment-fabriques-en-france/
7. https://www.marques-de-france.fr/marques-de-france-lance-son-agence-conseil-en-strategie-digitale/
8. https://itunes.apple.com/lookup?id=6758521698&country=fr
9. https://recherche-entreprises.api.gouv.fr/search?q=888485273
10. https://www.facebook.com/marquesdefrance/
11. https://www.linkedin.com/company/19095487/
12. https://news.google.com/rss (tools/news.py)
pains: 4 judged. (1) one small team shipping five products this year while Echo Conseils sells client work, the guide's next feature competes with client deadlines, CHOSEN. (2) the site's look, your modernise call, but his own agency built it, fails the owner reply test. (3) social, Facebook 12,636 and Instagram active, strong, not chosen. (4) GDPR, CookieYes with 20 first party cookies before a click on 14 Oct, never the angle
chosen: (1), hottest, the AI assistant launched 13 Oct and the app shipped 1.5.0 on 28 Oct
owner reply: "We build everything ourselves, that's what Echo Conseils is for" | a model, not a gap | Echo Conseils is "une agence à taille humaine" selling client work next to five launches for the guide this year (https://www.marques-de-france.fr/marques-de-france-lance-son-agence-conseil-en-strategie-digitale/), so extra developers add to the model rather than replace it
worth: €10,000+, a build squad behind Marques de France and Echo Conseils, developers on the app, the plugins and the guide's next features
still there: Emmanuel as Président in the register read 2026-10-31 | https://recherche-entreprises.api.gouv.fr/search?q=888485273
budget: "200k monthly unique users ... 150k€+ ARR" per his lemlist summary, plus a five product year | https://www.marques-de-france.fr/wp-json/wp/v2/posts?per_page=40
variant: B
sweep website: crawled twice, 250 URLs, a working guide built by his own agency, not chosen on the owner reply test
sweep gdpr: site-audit.js and tools/eu-view.py from Stockholm on 14 Oct, CookieYes and 20 first party cookies before a click, checked, never the angle (RULES 0E)
sweep apps: they ship their own app, plugins and AI assistant, software is their trade, folded into the squad
sweep social: tools/social-audit.js, Facebook https://www.facebook.com/marquesdefrance/ 12,636, Instagram 30,074 on 14 Oct, strong, not chosen
sweep squad: five launches this year plus agency work, "une agence à taille humaine", CHOSEN
thread: problem a small team shipped a mobile app, a Shopify app, two plugins and an AI gift assistant this year while Echo Conseils serves client brands | cost the guide's next feature likely waits behind client work | offer a build squad that builds the guide's next features beside the team | link feature, guide
lead read: Emmanuel reads that his team shipped five products this year while also serving Echo Conseils clients, so the guide's next feature likely waits, then gets offered a build squad for the guide's next features, one thread
claims:
a mobile app, https://www.marques-de-france.fr/marques-de-france-lance-la-1ere-application-mobile-dediee-au-made-in-france/ posts feed date 2026-02-23
a Shopify app, https://www.marques-de-france.fr/marques-de-france-lance-son-application-officielle-sur-shopify/ posts feed date 2026-05-16
WooCommerce and PrestaShop modules, https://www.marques-de-france.fr/marques-de-france-deploie-son-module-officiel-pour-prestashop/ posts feed dates 2026-05-28 and 2026-06-19
an AI gift assistant, https://www.marques-de-france.fr/marques-de-france-lance-le-premier-assistant-qui-vous-aide-a-trouver-des-cadeaux-vraiment-fabriques-en-france/ posts feed date 2026-10-13
Echo Conseils serves client brands, https://www.marques-de-france.fr/marques-de-france-lance-son-agence-conseil-en-strategie-digitale/ "une agence dédiée à celles et ceux qui veulent accélérer leur croissance digitale, bien au-delà de Marques de France"
INFERENCE, the guide's next feature likely waits behind client work, rests on "Une agence à taille humaine" on https://www.marques-de-france.fr/marques-de-france-lance-son-agence-conseil-en-strategie-digitale/, worded likely
recheck: 2026-10-31, the posts feed pulled for all five dates, the agency post fetched and both phrases found, the App Store record pulled, the register reread. Disproof tried, checked the launches are theirs (their own posts, seller "Marques de France (Apps)"), checked for developer jobs on 14 Oct (none), checked the agency is his (tagline, footer). Facts hold, confidence MEDIUM
```

SKETCHB
```
Hi Emmanuel, Marques de France looks cool.

However, your team shipped a mobile app, a Shopify app, WooCommerce and PrestaShop modules and an AI gift assistant this year, while Echo Conseils serves client brands. The guide's next feature likely waits behind client work.

I'd suggest a build squad working beside your team on the guide's next features and app releases.

Shall I send you a sketch of the squad on your next feature?
```

### Jessica Lazarus, Legal Unmasked, ctc_EegeYzXabJWMGf5FS

> NOT SENT. SUPERSEDES the 11 Oct hold and the 14 Oct hold. Flags for Raka. (1) Your 14 Oct call was modernisation. I held
> it then under RULES 0C point 4 (the one page sign up is a deliberate priority list). This draft doesn't call the sign up a
> gap. It says what's missing for someone deciding whether to register, nothing about the 2026 day, its speakers or its
> press. (2) The page does show one photo of a full event room, the screenshot caught it and the crawl's text didn't, so
> "nothing from 2026" would have been false and isn't used. (3) The Law Society Gazette pieces (1 and 11 May 2026) are
> walled to us on every route (AWS human check, 405 on WebFetch). The message only says the coverage exists, from Google
> News' exact match on "Legal Unmasked". Search snippets say DWF and Legora sponsored and Rory Bremner spoke. Unopened, so
> they're not used. (4) She's sole director of THE UNMASKED COLLECTIVE LIMITED. The site links no social account.

```gate
lead: Jessica Polly Lazarus, sole Active Director of THE UNMASKED COLLECTIVE LIMITED 16711225 since 11 September 2025, Leamington Spa (https://find-and-update.company-information.service.gov.uk/company/16711225/officers read 2026-10-31), which trades as Legal Unmasked. lemlist jobTitle Founder, tagline "Driving innovation and harnessing neurodivergent talent in the legal profession", City of London. ctc_EegeYzXabJWMGf5FS, leadId lea_S2yn3dqJ8JFQbPPHz, W5 TEST 50. Thread 0 items, control 7
site pass 1: 5 URLs, tools/crawl.py on https://legalunmasked.co.uk (2 from the sitemap, lastmod 2026-08-17), all 200, every page read (home, landing page, contact, both hosts)
site pass 2: 5 URLs, tools/crawl.py again, all 200, plus site-audit.js desktop and phone screenshots opened, the desktop shows a title, one photo of a full event room, "We're doing it again! Coming to London in May 2027" and a register button
deep analysis: Legal Unmasked is an annual one day conference for neurodivergent people in law. The first ran "Wed 6 May 2026 9:00 AM - 7:00 PM Woolwich Works, SE18 6HD" with "Powerful keynotes & interactive sessions led by thought-leaders, coaches, doctors and innovators" (https://www.tickettailor.com/events/leadingunmasked/1903238), and the Tickettailor list now shows "No events currently listed". The site, built August 2026, is one photo, 32 words and a register button, "Register for priority access to a limited release of early bird tickets", and the contact page is the same priority list form. The Law Society Gazette ran two pieces matching "Legal Unmasked" (1 May 2026 "Unmasking law: The woman aiming to reshape the profession for neurodivergent minds", 11 May 2026 "In depth: Celebrating law's neurodivergent community"). The site links no social account and no privacy page. INFERENCE, a lawyer or a firm deciding whether to register for 2027 has nothing on the page about what the day was
owner linkedin: Route 1 the profile, walled (429 on 11 Oct). Route 2 Google News "Jessica Lazarus" 10, the two Gazette pieces are hers, the rest other people. Route 3 Companies House, sole director. Route 4 the company LinkedIn page read 11 Oct, 1,010 followers. Route 5 Tickettailor, the organiser account "leadingunmasked". Route 6 the lemlist record
contact linkedin: same person as the owner, the register, Tickettailor and the lemlist record agree
google news: tools/news.py en 2026-10-31, "Legal Unmasked" 2 (Law Society Gazette 1 May and 11 May 2026), "Jessica Lazarus" 10, control Tesco 98
regional news: tools/news.py (London legal conference) x (neurodiversity legal profession), 12
industry news: tools/news.py neurodiversity legal profession, plus Law Society of Scotland and other neurodiversity in law events found in search, none opened as facts for the message
sources:
1. https://legalunmasked.co.uk/
2. https://www.legalunmasked.co.uk/contact
3. https://www.legalunmasked.co.uk/sitemap.xml
4. https://www.tickettailor.com/events/leadingunmasked/1903238
5. https://www.tickettailor.com/events/leadingunmasked
6. https://find-and-update.company-information.service.gov.uk/company/16711225/officers
7. https://www.lawgazette.co.uk/news/unmasking-law-the-woman-aiming-to-reshape-the-profession-for-neurodivergent-minds/5126667.article (walled, title from Google News only)
8. https://www.lawgazette.co.uk/news-focus/in-depth-celebrating-laws-neurodivergent-community/5126747.article (walled, title from Google News only)
9. https://www.linkedin.com/company/leading-unmasked
10. https://webbkoll.5july.net/en/results?url=http%3A%2F%2Flegalunmasked.co.uk
11. https://news.google.com/rss (tools/news.py)
pains: 4 judged. (1) the 2027 page shows nothing of the 2026 day, speakers or press to someone deciding whether to register, CHOSEN. (2) no social links on the site, small on its own. (3) the LinkedIn company page pointed at a dead Stan store on 11 Oct, a one minute fix. (4) GDPR, no banner and no privacy link against the control, 4 first party cookies, never the angle
chosen: (1), biggest, registrations are the page's own job and the 2026 day is the proof, and it's your modernise call
owner reply: "It's just a priority list until we announce 2027" | a deliberate choice | the list is the page's job and it stays, the site around it is what's missing, one photo and 32 words about a day with keynotes and Gazette coverage (https://www.tickettailor.com/events/leadingunmasked/1903238)
worth: €3,000+, a modern Legal Unmasked site with the 2026 day, speakers, photos and press, sponsor and firm pages, and the 2027 priority list kept as the main action
still there: Jessica sole director on the officers page read 2026-10-31 | https://find-and-update.company-information.service.gov.uk/company/16711225/officers
budget: a ticketed one day conference at Woolwich Works with a 2027 edition coming | https://www.tickettailor.com/events/leadingunmasked/1903238
variant: A
sweep website: crawled twice, 5 URLs, both screenshots opened, one photo and 32 words, CHOSEN
sweep gdpr: site-audit.js no banner and no privacy link found against its control, tools/eu-view.py from Stockholm 4 first party cookies, checked, never the angle (RULES 0E)
sweep apps: a one person conference business, ticketing already on Tickettailor, no process angle, not chosen
sweep social: tools/social-audit.js, the site links no social account, the company LinkedIn https://www.linkedin.com/company/leading-unmasked had 1,010 followers on 11 Oct, folded into the site pitch
sweep squad: a one director company, builds no software, not chosen
thread: problem the site is one photo and a sign up for May 2027 with nothing on the 2026 speakers, the day or its press | cost someone deciding whether to register can't see what they'd sign up for | offer a modern site that shows 2026 and turns it into 2027 registrations | link register
lead read: Jessica reads that her site shows nothing of the 2026 day to someone deciding whether to register, then gets offered a site that shows 2026 and turns it into 2027 registrations, one thread
claims:
the website is one photo and a sign up for May 2027, https://legalunmasked.co.uk/ "Coming to London in May 2027. Register for priority access to a limited release of early bird tickets", 32 words and 1 image in both crawls, screenshot opened
nothing on the 2026 speakers or the day, https://legalunmasked.co.uk/ 32 words total, the only words are the title, "We're doing it again!", the two lines above and the button, positive control the same crawler read 1,000+ word pages on other sites today
Legal Unmasked has Law Society Gazette coverage, https://news.google.com/rss exact query "Legal Unmasked", two Law Society Gazette items dated 2026-05-01 and 2026-05-11
the first Legal Unmasked was a full day at Woolwich Works, https://www.tickettailor.com/events/leadingunmasked/1903238 "Wed 6 May 2026 9:00 AM - 7:00 PM Woolwich Works"
recheck: 2026-10-31, the site crawled twice and the screenshot opened, the Tickettailor event and list pages fetched, the register fetched, the Gazette tried on three routes (curl walled, fetch-walled AWS check, WebFetch 405). Disproof tried, the screenshot showed a photo the text crawl missed so "nothing from 2026" was dropped, the 0C point 4 reading kept (the sign up stays the main action in the offer). Facts hold, confidence MEDIUM
```

SKETCH
```
Hi Jessica, Legal Unmasked looks cool!

However, your website is one photo and a sign up for May 2027, with nothing on the 2026 speakers, the day itself or its Law Society Gazette coverage. Someone deciding whether to register likely can't see what they'd be signing up for.

I'd suggest a modern Legal Unmasked site that shows the 2026 day, its speakers and press, and turns them into 2027 registrations.

At Astra agency we make websites for brands like Unilever, AXA, Pertamina.

Shall I send you a sketch of the Legal Unmasked site?
```
