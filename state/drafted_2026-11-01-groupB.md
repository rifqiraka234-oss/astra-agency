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
> AI did you know shape sits outside the A/B test.

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
variant: A
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
