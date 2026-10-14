<!-- SKETCH drafts, 2026-10-14 ~07:50 UTC. Raka on the four no-angle sites he saw (state/look_2026-10-14/), "bro theyre all old websites, old looking, angle modernise". Guillaume Slee (Brovanture), Willem Straat (Hooft & Petiet), Claire Enders (Enders Analysis), Fabrice Beauchêne (Glyx Therapeutics). All four connected and never sent a real message, threads pulled 07:19 UTC (Fabrice holds only the 18 Jul connect note, the other three 0 items), control ctc_ch3vFcKAkjQdMKDCg 3 items same minute. NOT SENT, waiting on Raka. Re pull each thread with the control and reopen every claim in the minute before any send. Evidence in /tmp/claude-0/agents/b24/. RULES 4A now says a dated look is the angle whoever the firm is. -->
# SKETCH drafts, 2026-10-14, modernised websites. Guillaume Slee, Willem Straat, Claire Enders, Fabrice Beauchêne

### Guillaume Slee, Brovanture, ctc_mG6iR58sQQAXKgKEk

> NOT SENT. Supersedes NO_STRONG_ANGLE (30 Sep and 7 Oct), which judged the site by its content.

```gate
lead: Guillaume Patrick Slee, active director of BROVANTURE LIMITED 05582633 since 18 Jul 2016 per https://find-and-update.company-information.service.gov.uk/company/05582633/officers (reopened 2026-10-14 07:44 UTC), PSCs Malcolm James Brock and Marc Van Kan at 25 to 50% each per https://find-and-update.company-information.service.gov.uk/company/05582633/persons-with-significant-control . lemlist jobTitle "Chief Executive Officer", tagline "Chief Executive Officer @ Brovanture Ltd | Oracle Certified Specialist", and https://brovanture.com/brovanture/about/ names him CEO, so he runs it as CEO, the who rule's CEO case. ctc_mG6iR58sQQAXKgKEk, leadId lea_oMsxcdxJwgCWNDohj, campaign v0.1 cam_PryZp5LuvQv8NznHh (paused, the message goes from the inbox). Accepted 2026-09-29 15:02 UTC. Thread pulled 07:19 UTC, 0 items, nextPage null, sentOnly one contact with the 22 Sep connect note only, control 3 items same minute
site pass 1: 363 pages, tools/crawl.py on https://www.brovanture.com , 330 from the sitemaps plus linked pages, 352 at 200, 10 at 404, 1 at 000, every page read (tools/crawl.py fixed today to skip a malformed bracketed href that had crashed it)
site pass 2: BROV_PASS2
deep analysis: A 50 person Oracle EPM, ERP and analytics consultancy in Godalming, "The Number 1 Oracle Cloud EPM Partner in the UK and IRL 4th year running" on its own homepage, UKOUG gold badges for 2023 to 2026, ISO 9001, 14001 and 27001, Cyber Essentials, G-Cloud, NetSuite and Oracle partner logos, fixed price implementations ("we implement Oracle EPM applications for a fixed price"), public sector work. The homepage, built on Bricks in May 2024 (wp-json home date 2024-05-22, modified 2026-08-25), opens under two utility bars (a support phone line and a row of eight language flags) and a bright green menu, then stacks full width stock photo banners, a webinar band, citrus slices behind "a fresh approach", fanned price tags, a chess pawn behind "manage strategy and ensure execution", hands holding the letters RESOURCES, each with centred text and outline buttons (image files Home-banner_01.webp, BRO032_Tags_Fanned, chess-bg_01.webp, resources-background-1920x636.jpg in the live HTML). Seen in site-audit.js's Chromium screenshot and confirmed through tools/render-via-curl.js. Next to best in class consultancies it looks like a stock template, and it undersells a firm that wins the top Oracle partner award four years running. Built in 2024 and edited in August, so the message says it looks older, never that it is old
owner linkedin: Route 1 /in/guillaume-slee-28688a20 not fetched, 999 on every prior attempt (7 Oct). Route 2 the company page https://www.linkedin.com/company/brovanture-ltd through tools/social-audit.js, 1,316 followers. Route 3 his CEO line on https://brovanture.com/brovanture/about/ . Route 4 Companies House officers above. Route 5 tools/news.py "Guillaume Slee" 0. Route 6 the lemlist record
contact linkedin: same person as the owner case, Companies House, the site and lemlist agree
google news: tools/news.py en 2026-10-14, company "Brovanture" 0, person "Guillaume Slee" 0
regional news: tools/news.py (Surrey) with Oracle EPM partner, 0 results
industry news: tools/news.py "Oracle EPM partner" 49 results, Oracle partners competing on AI and acquisitions (Inoapps and TMX 2026-10-01, Ascend Partners acquiring InnoFin 2026-09-02, per the 7 Oct run of the same query)
sources:
1. https://brovanture.com/
2. https://brovanture.com/brovanture/about/
3. https://brovanture.com/wp-json/wp/v2/pages?slug=home&_fields=slug,date,modified
4. https://find-and-update.company-information.service.gov.uk/company/05582633/officers
5. https://find-and-update.company-information.service.gov.uk/company/05582633/persons-with-significant-control
6. https://www.linkedin.com/company/brovanture-ltd (tools/social-audit.js)
7. https://x.com/brovanture (tools/social-audit.js)
8. https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fwww.brovanture.com%2F (tools/eu-view.py)
9. https://news.google.com/rss (tools/news.py, company, person, region, industry)
10. https://brovanture.com/brovanture/careers-recruitment/
11. https://brovanture.com/ukoug-2026-epm-partner-of-the-year/
pains: 4 judged. (1) a stock template homepage that looks older than the UK's top Oracle Cloud EPM partner, CHOSEN on Raka's call. (2) hiring BD and Oracle consultants (careers page), a hiring problem and they say "totally and firmly onshore", so no squad. (3) LinkedIn Insight and ZoomInfo before consent per the 30 Sep EU view, never the angle (RULES 0E). (4) public Elementor template pages, housekeeping
chosen: (1), biggest, it's the first thing every finance director comparing EPM partners sees, and it's the gap between the award and the look
owner reply: "We only rebuilt the site in 2024 and it wins us plenty of work" | just built or just paid for | the homepage was created 2024-05-22 per https://brovanture.com/wp-json/wp/v2/pages?slug=home&_fields=slug,date,modified , so the design is over two years old, and https://brovanture.com/brovanture/careers-recruitment/ lists business development executives and Oracle, NetSuite and Cloud ERP consultants, no web or design role, so no rebuild is advertised
worth: €6,000+, a modernised Brovanture site on their WordPress, a new homepage and templates for services, solutions, client stories and the blog, leading with the awards, fixed price implementations and client results
sweep website: tools/crawl.py twice, site-audit.js screenshots, tools/render-via-curl.js, state/look_2026-10-14/brovanture-render-1.png and -2.png opened against best in class consultancies, CHOSEN as a modernised site
sweep gdpr: tools/eu-view.py from Stockholm on https://www.brovanture.com/ , 2 first party cookies and 40 requests to 9 hosts before a click, CookieYes banner with Reject All, never the angle (RULES 0E)
sweep apps: they build and host Oracle EPM apps and sell add ons per https://brovanture.com/solutions/budget-transfers-and-virements/ , software is their trade, not chosen
sweep social: tools/social-audit.js, https://www.linkedin.com/company/brovanture-ltd 1,316 followers, https://x.com/brovanture bio matches the site, B2B and steady, not chosen
sweep squad: Oracle specialists and "totally and firmly onshore with offices only in the UK" per https://brovanture.com/brovanture-support-why-you-should-lean-on-us/ , not chosen
thread: problem your homepage stacks full width stock photo banners and looks older than the UK's number one Oracle Cloud EPM partner | cost a finance director comparing EPM partners likely goes with one whose site looks the part | offer a modernised site that leads with your awards, fixed price implementations and client stories so the homepage looks like the firm | link homepage, site
lead read: Guillaume reads that his homepage stacks stock photo banners from citrus slices to a chess pawn and looks older than the UK's top Oracle Cloud EPM partner, so finance directors likely pick a partner whose site looks the part, and gets offered a modernised site leading with the awards and client stories, one thread
claims:
your homepage stacks full width stock photo banners, https://brovanture.com/ live HTML 2026-10-14 07:37 UTC, Home-banner_01.webp, BRO032_Tags_Fanned_Full-Width-Image, chess-bg_01.webp and resources-background-1920x636.jpg, each a full width band, site-audit.js desktop screenshot 07:31 UTC and state/look_2026-10-14/brovanture-render-1.png and -2.png
from citrus slices to a chess pawn, the "a fresh approach" band over citrus slices and the "manage strategy and ensure execution" band over a chess pawn, both renders, https://brovanture.com/
the UK's number one Oracle Cloud EPM partner, https://brovanture.com/ "The Number 1 Oracle Cloud EPM Partner in the UK and IRL 4th year running", twice in the live HTML
INFERENCE, it looks older than that, Raka's judgement and ours of https://brovanture.com/ against best in class sites, an opinion worded as one
INFERENCE, a finance director comparing EPM partners likely goes with one whose site looks the part, rests on https://brovanture.com/ , worded likely
your awards, fixed price implementations and client stories, https://brovanture.com/ UKOUG gold badges 2023 to 2026, "we implement Oracle EPM applications for a fixed price", and the "Client Stories" menu link
websites credential, docs/astra-company-profile.md, Raka's fixed brand line, https://www.linkedin.com/in/raka-mulya-b92885196
recheck: 2026-10-14 07:19 to 07:45 UTC, thread pulled (0 items, control 3), the homepage refetched and its text and image names read, Companies House reopened. Disproof tried, checked the site isn't brand new (home page dated 2024-05-22, edited 2026-08-25, so "looks older", never "old"), checked the award line is theirs and current (twice on the homepage today), and that the banners are what a visitor sees (Chromium through site-audit.js and the curl render agree). Flags for Raka, he's CEO but doesn't own it (the two founders hold the shares), and they edited the homepage in August. Facts hold, confidence MEDIUM
```

SKETCH
```
Hi Guillaume, Brovanture looks cool!

However, your homepage stacks full width stock photo banners, from citrus slices to a chess pawn, and it looks older than the UK's number one Oracle Cloud EPM partner. So a finance director comparing EPM partners likely goes with one whose site looks the part.

I'd suggest a modernised site that leads with your awards, your fixed price implementations and your client stories, so the homepage looks like the firm.

At Astra agency we make websites for brands like Unilever, AXA, Pertamina.

Shall I send you a sketch of the modernised Brovanture site?
```

### Willem Straat, Hooft & Petiet, ctc_XDgqhRAfzxcTmGKhZ

> NOT SENT. Supersedes NO_STRONG_ANGLE (1, 6 and 7 Oct). Two site problems in one modernised angle (RULES 4A, Octelle).

```gate
lead: Willem Straat, lemlist jobTitle "Mede-eigenaar", jobDescription "Mede-eigenaar van Hooft & Petiet ... Als onderdeel van de ReShare Living Group", tagline "KeyPro meubelverhuur | H&P interieur | ReShare Living Group | Circulaire woonoplossingen". Founder of KeyPro (2011) per the press, "Van Groningse pionier tot landelijke speler: Willem Straat zet meubelverhuur op de kaart" (Wonen360 2025-11-24) and "Bas en Willem willen met meubelverhuurder KeyPro in Groningen circulair Europa veroveren" (DVHN 2025-05-19), headlines through tools/news.py. Hooft & Petiet's own pages say "Hooft & Petiet is onderdeel van de ReShare Living Group" (https://hooftenpetiet.nl/vacature-projectmanager/) and the terms name "ReShare Living Group B.V. ... KvK-nummer 982..." (https://hooftenpetiet.nl/algemene-voorwaarden/). Co-owner of an investor backed group, the who rule's co-owner case. ctc_XDgqhRAfzxcTmGKhZ, leadId lea_EKPeqAQrDvy7jMRTb, campaign v0.1 cam_PryZp5LuvQv8NznHh (paused, the message goes from the inbox). Accepted 2026-10-01 08:18 UTC. Thread pulled 07:19 UTC, 0 items, nextPage null, sentOnly one contact with the 17 Sep connect note only, control 3 items same minute
site pass 1: 74 pages, tools/crawl.py on https://www.hooftenpetiet.nl , 59 from the sitemaps plus linked pages, 69 at 200, 2 at 500, 2 at 404, 1 at 405, every page read
site pass 2: 74 pages, second full crawl equal to pass 1, site-audit.js render trusted (0 page errors), desktop and phone screenshots opened (state/look_2026-10-14/hooftpetiet-desktop.png and -phone.png), plus keypro.nl and reshareliving.com screenshotted to compare the group's sites
deep analysis: Hooft & Petiet furnishes homes for developers, housing corporations and estate agents since 2010, temporary, model, expat and sale styling homes, "Of het nu 1 of 100 woningen betreft", now part of ReShare Living Group with KeyPro, which press call the national player in furniture rental. The H&P homepage (WordPress and Elementor, page dated 2023-06-05, edited 2026-07-29, footer "webrealisatie CONTENT voor elkaar") opens with a typed headline over a living room photo and six lime green boxed buttons (Logeerwoningen, Rustwoningen, Wisselwoningen, Projectwoningen, Expatwoningen, Verkoopstyling), then four icon columns with lime "Lees meer" buttons, a template look next to KeyPro's own current site. The group site https://reshareliving.com/ is one page headed "Deze site is in ontwikkeling", last-modified 22 Jan 2026 in its server header, so the group behind both brands has had an unfinished site since January. Instagram https://www.instagram.com/hooftenpetiet/ last posted 2025-06-25, kept out of the message (one thread)
owner linkedin: Route 1 /in/willem-straat-b838a417 not fetched, LinkedIn /in/ answers 999 from here (2026-10-14 for three other leads). Route 2 tools/news.py "Willem Straat" 15 results, the Wonen360, RTV Noord and DVHN pieces on him and KeyPro. Route 3 the company page https://nl.linkedin.com/company/hooftenpetiet through tools/social-audit.js, 818 followers, "H & P Interieur B.V.". Route 4 H&P's own pages naming the group. Route 5 the lemlist record. Route 6 the 7 Oct research file state/four_angle_2026-10-07/b11_G_willem_straat.md (KvK numbers from an earlier run), a candidate only
contact linkedin: same person as the owner, the record, the press and the group pages agree
google news: tools/news.py nl 2026-10-14, company "Hooft & Petiet" 2 results (Wonen360 2025-11-24, RTV Noord 2025-11-22), person "Willem Straat" 15
regional news: tools/news.py (Groningen) with meubelverhuur woninginrichting, 14 results
industry news: tools/news.py meubelverhuur woninginrichting, 77 results, a market where rental furniture firms compete on circularity and scale
sources:
1. https://www.hooftenpetiet.nl/
2. https://hooftenpetiet.nl/vacature-projectmanager/
3. https://hooftenpetiet.nl/algemene-voorwaarden/
4. https://www.hooftenpetiet.nl/wp-json/wp/v2/pages?slug=home&_fields=slug,date,modified
5. https://reshareliving.com/
6. https://www.keypro.nl/
7. https://nl.linkedin.com/company/hooftenpetiet (tools/social-audit.js)
8. https://www.instagram.com/hooftenpetiet/ (tools/social-audit.js)
9. https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fwww.hooftenpetiet.nl%2F (tools/eu-view.py)
10. https://news.google.com/rss (tools/news.py, company, person, region, industry)
11. https://www.facebook.com/hooftenpetiet (tools/social-audit.js)
pains: 5 judged. (1) a template homepage with six lime boxed buttons, (2) the group site still "in ontwikkeling" since January, (1) and (2) COMBINED and CHOSEN as a modernised site (RULES 4A, two site problems one angle). (3) Instagram silent since June 2025, social, kept out (one thread). (4) no privacy link and no banner per site-audit.js, never the angle (RULES 0E). (5) a changeover workflow, killed on 6 Oct (the portal already exists)
chosen: (1) and (2), biggest, it's how a developer or housing corporation checks the group, and both of its faces look older or unfinished
owner reply: "Our agency looks after the site and the ReShare site is coming" | already fixed or in hand | https://reshareliving.com/ hasn't changed since 22 Jan 2026 (server last-modified), the only web work in the group's marketing intern ad is "website optimalisaties" (https://hooftenpetiet.nl/stage-marketing-keypro-hooft-petiet-utrecht-amsterdam/), and https://hooftenpetiet.nl/vacatures/ lists movers, service staff, a project manager, a supply chain lead and that intern, no web role, so nothing shows a rebuild under way. The H&P design itself dates from 2023 (home page 2023-06-05 per https://www.hooftenpetiet.nl/wp-json/wp/v2/pages?slug=home&_fields=slug,date,modified), not just built
worth: €6,000+, a modernised Hooft & Petiet site and a finished ReShare Living Group site built as one family, projects, rentals and a quote request up front, in Dutch and English
sweep website: tools/crawl.py twice, 74 pages, screenshots of H&P, KeyPro and ReShare opened against best in class, CHOSEN as a modernised site
sweep gdpr: tools/eu-view.py from Stockholm on https://www.hooftenpetiet.nl/ , 8 first party cookies, 0 third party, site-audit.js found no banner and no privacy link (confirmed against its control), never the angle (RULES 0E)
sweep apps: a changeover workflow killed on 6 Oct, the /beheer/ service already sells the overviews and KeyPro runs a client portal, per state/four_angle_2026-10-07/b11_G_willem_straat.md and https://hooftenpetiet.nl/ , not chosen
sweep social: tools/social-audit.js, https://www.instagram.com/hooftenpetiet/ 167 followers, 121 posts, latest 2025-06-25, LinkedIn 818, Facebook 197, quiet but a different thread, not chosen
sweep squad: a furnishing company per https://www.hooftenpetiet.nl/ , builds no software, so Build Squad is not applicable
thread: problem your Hooft & Petiet homepage opens with six lime green buttons over a photo and reshareliving.com still says it's in development | cost a developer checking the group likely sees a business that looks older and less finished than it is | offer a modernised Hooft & Petiet site and a finished ReShare site built as one family | link site, Hooft
lead read: Willem reads that the Hooft & Petiet homepage opens with six lime green buttons over a photo and the ReShare site still says it's in development, so a developer checking the group likely sees an older, unfinished business, and gets offered a modernised H&P site and a finished ReShare site, one thread
claims:
your Hooft & Petiet homepage opens with six lime green buttons over a photo, https://www.hooftenpetiet.nl/ live HTML 2026-10-14 07:42 UTC, "Logeerwoningen Rustwoningen Wisselwoningen Projectwoningen Expatwoningen Verkoopstyling" under the hero headline, lime buttons over a living room photo in state/look_2026-10-14/hooftpetiet-desktop.png
reshareliving.com still says the site is in development, https://reshareliving.com/ "Deze site is in ontwikkeling", live 2026-10-14 07:28 UTC, server header last-modified Thu, 22 Jan 2026 14:06:56 GMT
the group, https://hooftenpetiet.nl/vacature-projectmanager/ "Hooft & Petiet is onderdeel van de ReShare Living Group"
INFERENCE, a developer checking the group likely sees a business that looks older and less finished than it is, rests on https://www.hooftenpetiet.nl/ and https://reshareliving.com/ , worded likely
projects, rentals and a quote request, https://www.hooftenpetiet.nl/ "Projectinrichting", "Meubelverhuur" and "Offerte aanvragen" in the menu
websites credential, docs/astra-company-profile.md, Raka's fixed brand line, https://www.linkedin.com/in/raka-mulya-b92885196
recheck: 2026-10-14 07:19 to 07:45 UTC, thread pulled (0 items, control 3), the H&P homepage refetched (one proxy reset, then 200) and its buttons recounted, ReShare refetched with its header. Disproof tried, checked the group site isn't finished elsewhere (reshareliving.com is the domain H&P's own terms name for the group, one page, last changed 22 Jan), checked H&P's site isn't brand new (home 2023-06-05, edited July 2026, so "looks older", never "old"), checked KeyPro isn't the dated one too (keypro.nl looks current, so the message is about H&P and ReShare only). Flags for Raka, (a) an outside agency (CONTENT voor elkaar) builds the H&P site, (b) he's co-owner of an investor backed group, (c) he's only in the paused v0.1 campaign, the send goes from the inbox. Facts hold, confidence MEDIUM
```

SKETCH
```
Hi Willem, Hooft & Petiet looks cool!

However, your Hooft & Petiet homepage opens with six lime green buttons over a photo, and reshareliving.com still says the site is in development. So a developer checking the group likely sees a business that looks older and less finished than it is.

I'd suggest a modernised Hooft & Petiet site and a finished ReShare site, built as one family, with your projects, rentals and quote request up front.

At Astra agency we make websites for brands like Unilever, AXA, Pertamina.

Shall I send you a sketch of the modernised Hooft & Petiet and ReShare sites?
```

### Claire Enders, Enders Analysis, ctc_sQPTmkW8KGwkediDD

> NOT SENT. Supersedes NO_STRONG_ANGLE (6 Oct), which judged the site current. Flag, a CBE and a public figure, the tone stays plain.

```gate
lead: Claire Whitmore Enders, sole active director of ENDERS ANALYSIS LIMITED SC170417 since 5 Dec 1996 and its only PSC, "Ownership of voting rights - 75% or more", per https://find-and-update.company-information.service.gov.uk/company/SC170417/officers and https://find-and-update.company-information.service.gov.uk/company/SC170417/persons-with-significant-control (reopened 2026-10-14 07:44 UTC). lemlist jobTitle "Chief Executive Officer", tagline "CEO@ Enders Analysis | Strategic Business Insights in Telecoms, Media & Technology". ctc_sQPTmkW8KGwkediDD, leadId lea_QpsBog3YHrHe3u6F7, campaign v0.1 cam_PryZp5LuvQv8NznHh (paused, the message goes from the inbox). Accepted 2026-10-06 14:23 UTC. Thread pulled 07:19 UTC, 0 items, nextPage null, sentOnly one contact with the 24 Sep connect note only, control 3 items same minute
site pass 1: 600 pages, tools/crawl.py on https://www.endersanalysis.com , 2,698 URLs in the sitemaps (mostly the report archive back to 2009), all 600 at 200, every page read
site pass 2: 600 pages, second full crawl equal to pass 1, site-audit.js render trusted (0 page errors), desktop and phone screenshots opened (state/look_2026-10-14/enders-desktop.png and -phone.png) against best in class research and media sites
deep analysis: An independent TMT research firm founded 1997, about 22 staff per its 2025 accounts (judging only), subscribers listed by name on https://www.endersanalysis.com/subscribers including Ofcom, the CMA, the BBC, Netflix, Google and Amazon, analysts quoted weekly (Campaign UK 2026-10-08 and 2026-09-29, The Media Leader 2026-08-03, through tools/news.py). The site is Drupal 11 and updated daily, reports dated 13 October 2026 on the homepage. The look, a serif wordmark, a paragraph of intro text beside a smallish photo of the Thames at dusk with "Rigorous Fearless Independent" set on it, then a three column stack of dark navy and pale blue boxes holding report summaries, press mentions and a video card, each box with a centred button. Blocky boxes that don't flow, next to best in class research and media brands. A site built or upgraded since 2024, so the message says it looks older, never that it is old
owner linkedin: Route 1 /in/claire-enders-cbe-3362264 not fetched, LinkedIn /in/ answers 999 from here. Route 2 tools/news.py "Claire Enders" 33 results, Campaign UK 2026-09-29 "Enders Analysis founder sounds alarm over rise of unregulated TV content". Route 3 the company page https://www.linkedin.com/company/68186 through tools/social-audit.js, UNKNOWN (login wall). Route 4 her YouTube video linked from the homepage, read by social-audit.js. Route 5 Companies House. Route 6 the lemlist record
contact linkedin: same person as the owner, Companies House, the site's team page and lemlist agree
google news: tools/news.py en 2026-10-14, company "Enders Analysis" 50 results, person "Claire Enders" 33, the firm in Campaign UK and Yahoo Finance in Sep and Oct 2026
regional news: tools/news.py (London) with media research telecoms analysis, 42 results
industry news: tools/news.py media research telecoms analysis, 73 results, research firms competing for subscriber attention and media quotes
sources:
1. https://www.endersanalysis.com/
2. https://www.endersanalysis.com/subscribers
3. https://find-and-update.company-information.service.gov.uk/company/SC170417/officers
4. https://find-and-update.company-information.service.gov.uk/company/SC170417/persons-with-significant-control
5. https://www.twitter.com/EndersAnalysis (tools/social-audit.js)
6. https://www.youtube.com/watch?v=_N7I-NWXQP0 (tools/social-audit.js)
7. https://www.linkedin.com/company/68186 (tools/social-audit.js, walled)
8. https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fwww.endersanalysis.com%2F (tools/eu-view.py)
9. https://news.google.com/rss (tools/news.py, company, person, region, industry)
10. https://enderstmtleaderslive.com/
11. https://www.endersanalysis.com/about/team
pains: 4 judged. (1) a boxy template look that undersells a firm Ofcom, the BBC and Netflix pay for, CHOSEN on Raka's call. (2) GA and Hotjar before consent with no banner, never the angle (RULES 0E). (3) the subscriber check is an email box, not a login, a small fix. (4) the conference site is a static page with no tickets, folded into the modernised site only as a possibility
chosen: (1), biggest, the homepage is where a new subscriber or a journalist meets the firm, and it's the gap between the client list and the look
owner reply: "We rebuilt the website on Drupal not long ago" | just built or just paid for | the theme's stylesheet was last modified Sun, 08 Jun 2025 per https://www.endersanalysis.com/themes/custom/enders_theme/css/style.css (and logo.svg 06 Jun 2025), so this design is about sixteen months old, past the one year line, and https://www.endersanalysis.com/about/vacancies lists no role, so no rebuild is advertised
worth: €8,000+, a modernised Enders Analysis site on their Drupal, a new homepage, report, team and subscriber templates across the archive, leading with the latest analysis, the analysts in the media and the subscribers
sweep website: tools/crawl.py twice, 600 pages, screenshots opened against best in class, CHOSEN as a modernised site
sweep gdpr: tools/eu-view.py from Stockholm on https://www.endersanalysis.com/ , 6 first party cookies before a click (GA and Hotjar), site-audit.js found no banner (confirmed against its control), never the angle (RULES 0E)
sweep apps: the "Access report" step asks a subscriber to type an email on https://www.endersanalysis.com/ report pages, a small fix, not chosen
sweep social: tools/social-audit.js, https://www.twitter.com/EndersAnalysis bio "Market-leading technology, media and telecoms insight since 1997", YouTube video linked, LinkedIn UNKNOWN (walled), analysts quoted in the press weekly, not chosen
sweep squad: a research firm per https://www.endersanalysis.com/about/team , economists and analysts, builds no software, so Build Squad is not applicable
thread: problem your homepage stacks report summaries in navy boxes under a small photo of the Thames and looks older than a firm Ofcom, the BBC and Netflix subscribe to | cost a strategy director comparing TMT research likely goes with a provider whose site looks the part | offer a modernised Enders site that puts your latest analysis, analysts in the media and subscribers first so it looks as strong as the research | link site, research
lead read: Claire reads that her homepage stacks report summaries in navy boxes under a small photo of the Thames and looks older than a firm Ofcom, the BBC and Netflix subscribe to, so strategy directors likely pick a provider whose site looks the part, and gets offered a modernised site leading with the analysis and subscribers, one thread
claims:
your homepage stacks report summaries in navy boxes, https://www.endersanalysis.com/ live 2026-10-14 07:42 UTC, report cards dated 13 October 2026 in dark navy boxes in state/look_2026-10-14/enders-desktop.png
under a small photo of the Thames, the hero image of the Thames at dusk beside the intro text, https://www.endersanalysis.com/ and the same screenshot
Ofcom, the BBC and Netflix subscribe to, https://www.endersanalysis.com/subscribers "We are proud that the following companies support our research", Ofcom, BBC and Netflix each listed, live 07:42 UTC
INFERENCE, it looks older than that firm, Raka's judgement and ours of https://www.endersanalysis.com/ against best in class sites, an opinion worded as one
INFERENCE, a strategy director comparing TMT research likely goes with a provider whose site looks the part, rests on https://www.endersanalysis.com/ , worded likely
your latest analysis, your analysts in the media and your subscribers, https://www.endersanalysis.com/ menu "Reports", "Analysts in the media", "Our subscribers"
websites credential, docs/astra-company-profile.md, Raka's fixed brand line, https://www.linkedin.com/in/raka-mulya-b92885196
recheck: 2026-10-14 07:19 to 07:45 UTC, thread pulled (0 items, control 3), homepage and subscribers page refetched, Companies House reopened. Disproof tried, checked the site isn't neglected (reports dated 13 Oct 2026, so the message is about the look, not freshness), checked it isn't new (Drupal 11 from 2024 on, so "looks older", never "old"), checked the subscribers line is theirs (their own page). Flags for Raka, a CBE and senior public figure, and the site is maintained daily, so this reads as a design opinion to someone who knows her brand. Facts hold, confidence MEDIUM
```

SKETCH
```
Hi Claire, Enders Analysis looks cool!

However, your homepage stacks report summaries in navy boxes under a small photo of the Thames, and looks older than a firm Ofcom, the BBC and Netflix subscribe to. So a strategy director comparing TMT research likely goes with a provider whose site looks the part.

I'd suggest a modernised Enders site that puts your latest analysis, your analysts in the media and your subscribers first, so it looks as strong as the research.

At Astra agency we make websites for brands like Unilever, AXA, Pertamina.

Shall I send you a sketch of the modernised Enders Analysis site?
```

### Fabrice Beauchêne, Glyx Therapeutics, ctc_nFBoAwdTou6kXWRLN

> NOT SENT. Supersedes NO_STRONG_ANGLE (held on timing). Flags, VitaDX (where he's Directeur Général) entered a safeguard procedure in June, and Glyx is preparing its seed round right now, which is why the site matters.

```gate
lead: Fabrice Hubert Jocelyn Beauchêne, Président de SAS of GLYX THERAPEUTICS SIREN 999112642, created 2025-12-24, active, per https://recherche-entreprises.api.gouv.fr/search?q=999112642 (read through tools/fetch-walled.py 2026-10-14 07:45 UTC). lemlist jobTitle "CEO and co-founder", experience "Directeur général @VitaDX", tagline "Biotech & MedTech Executive | Alzheimer's & Cancer Solutions | Partner @50 Partners Health". ctc_nFBoAwdTou6kXWRLN, leadId lea_kRy5XkE9ZZzcnaxka, campaign v0.1 cam_PryZp5LuvQv8NznHh (paused, the message goes from the inbox). Accepted 2026-07-18 06:46 UTC. Thread pulled 07:19 UTC, 1 item, our 18 Jul connect note only, nextPage null, control 3 items same minute
site pass 1: 40 pages, tools/crawl.py on https://glyxtherapeutics.com , 37 at 200, 1 at 503, 2 at 404 (the sitemap didn't answer, pages from links), every page read
site pass 2: 40 pages, second full crawl equal to pass 1, site-audit.js said RENDER NOT TRUSTED (4 of 4 failed assets were ours) so its screenshots are void, tools/render-via-curl.js served all 134 requests with 0 curl errors and 61 images decoded, all three parts opened
deep analysis: A tau biotech spun out of the University of Picardie's LG2A lab, sugar derived molecules for tauopathies and Alzheimer's. The University of Picardie's own news this week (https://www.u-picardie.fr/actualites/maladie-dalzheimer-start-issue-recherche-upjv-ouvre-nouvelle-voie-therapeutique , licence signed 13 Oct 2026) says "La start-up prépare désormais une levée de fonds d'amorçage", and Courrier picard (2026-10-08) and ici.fr (2026-10-14) ran it too, through tools/news.py. So investors are about to look. The homepage (WordPress and Elementor, pages from Dec 2024) is a biotech template, Title Case headlines, a dotted head graphic, 13 AdobeStock images (a woman with a pipette, glowing brains, a lab mouse), slogans like "Driven by Curiosity, Defined by Excellence" and "Passion for Science, Commitment to Progress", an investor paragraph in the middle of the page ("Our lead compound is supported by robust preclinical data ... For access to our investor deck"), and "Recent News" whose newest item is "December 12, 2025" (posts API, 2025-12-02). The deep tech credibility case, the site is the diligence surface
owner linkedin: Route 1 /in/fbeauchene not fetched, LinkedIn /in/ answers 999 from here. Route 2 tools/news.py "Fabrice Beauchêne" 9 results, ici.fr 2026-10-14 on Glyx, Le Télégramme 2026-06-26 and Ouest-France 2026-06-08 on VitaDX's safeguard procedure. Route 3 the company page https://fr.linkedin.com/company/glyx-therapeutics through tools/social-audit.js, 266 followers. Route 4 the French register above. Route 5 the lemlist record, his own summary. Route 6 the 7 Oct research file, a candidate only
contact linkedin: same person as the owner, the register, the site and lemlist agree
google news: tools/news.py fr 2026-10-14, company "Glyx Therapeutics" 4 results (ici.fr and UPJV 2026-10-14, Courrier picard 2026-10-08), person "Fabrice Beauchêne" 9
regional news: tools/news.py (Amiens) with biotech tau Alzheimer, 0 results
industry news: tools/news.py biotech tau Alzheimer, 8 results
sources:
1. https://www.glyxtherapeutics.com/
2. https://www.glyxtherapeutics.com/wp-json/wp/v2/posts?per_page=3&_fields=slug,date
3. https://www.u-picardie.fr/actualites/maladie-dalzheimer-start-issue-recherche-upjv-ouvre-nouvelle-voie-therapeutique
4. https://recherche-entreprises.api.gouv.fr/search?q=999112642
5. https://fr.linkedin.com/company/glyx-therapeutics (tools/social-audit.js)
6. https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fwww.glyxtherapeutics.com%2F (tools/eu-view.py)
7. https://news.google.com/rss (tools/news.py, company, person, region, industry)
8. https://www.glyxtherapeutics.com/investors/
9. https://www.glyxtherapeutics.com/privacy-policy-2/
10. https://lille.eurasante.com/?p=143308
pains: 4 judged. (1) a stock template homepage with stale news while investors are about to look, CHOSEN on Raka's call. (2) the VitaDX safeguard procedure, his other company, a timing flag, not a pain we fix. (3) a 404 menu link (?page_id=4095) per the 7 Oct run, a symptom only. (4) consent, a banner exists in the curl render, never the angle
chosen: (1), biggest, the site is what an investor checks before the seed round meeting, and today it shows stock photos and news that stopped in December
owner reply: "We had the site built last year, the science comes first" | just built or just paid for | the site's pages date from December 2024 per https://www.glyxtherapeutics.com/wp-json/wp/v2/pages?per_page=3&orderby=date&order=asc&_fields=slug,date,modified (alzheimers-disease 2024-12-06), about 22 months old, and the news stopped at 2025-12-02 per https://www.glyxtherapeutics.com/wp-json/wp/v2/posts?per_page=3&_fields=slug,date , so it isn't new and isn't being kept up
worth: €6,000+, a modernised Glyx site, the tau science, the lead compound and the pipeline, the team and the academic partners, current news and an investor page with a deck request, in English and French
sweep website: tools/crawl.py twice, 40 pages, render-via-curl.js parts opened against best in class biotech sites, CHOSEN as a modernised site
sweep gdpr: tools/eu-view.py from Stockholm on https://www.glyxtherapeutics.com/ , 2 first party cookies, 11 requests to 6 hosts, never the angle (RULES 0E)
sweep apps: a preclinical lab company with no orders, bookings or quotes on https://www.glyxtherapeutics.com/ , not chosen
sweep social: tools/social-audit.js, https://fr.linkedin.com/company/glyx-therapeutics 266 followers, the only account in their HTML, investors meet them at BioFIT and partnering events, not chosen
sweep squad: a biotech per https://www.glyxtherapeutics.com/ , builds no software, so Build Squad is not applicable
thread: problem your homepage is built from stock lab photos and slogans and its newest news is from December 2025 | cost an investor checking Glyx likely sees a template rather than a company with a lead compound | offer a modernised site built around your tau science, lead compound, team and partners with an investor page | link compound, Glyx
lead read: Fabrice reads that his homepage is stock lab photos and slogans with news that stops in December 2025, so an investor likely sees a template rather than a company with a lead compound, and gets offered a modernised site built around the science and the compound with an investor page, one thread
claims:
your homepage is built from stock lab photos, https://www.glyxtherapeutics.com/ live HTML 2026-10-14 07:42 UTC, 13 image files named AdobeStock_..., seen in /tmp/claude-0/glyx-curlrender-part0.png (0 curl errors)
and slogans like Passion for Science, Commitment to Progress, https://www.glyxtherapeutics.com/ "Passion for Science, Commitment to Progress" and "Driven by Curiosity, Defined by Excellence"
and its newest news is from December 2025, https://www.glyxtherapeutics.com/ "Recent News ... December 12 , 2025", and the posts API https://www.glyxtherapeutics.com/wp-json/wp/v2/posts?per_page=3&_fields=slug,date newest 2025-12-02
a company with a lead compound, https://www.glyxtherapeutics.com/ "Our lead compound is supported by robust preclinical data and a clear development pathway"
INFERENCE, an investor checking Glyx likely sees a template, rests on the stock images and the stale news at https://www.glyxtherapeutics.com/ , worded likely
your tau science, team and partners, https://www.glyxtherapeutics.com/ "Targeting Tau To Redefine Neurodegenerative Care", "Our Team" in the menu, "Our Partners" (UPJV, SATT Nord, Eurasanté and others)
websites credential, docs/astra-company-profile.md, Raka's fixed brand line, https://www.linkedin.com/in/raka-mulya-b92885196
recheck: 2026-10-14 07:19 to 07:45 UTC, thread pulled (1 item, the connect note, control 3), homepage refetched and the slogans, the compound line, the news dates and the image names read, the French register reopened, the UPJV article opened. Disproof tried, checked the news isn't fresh somewhere else on the site (posts API newest 2025-12-02), checked the images really are stock (AdobeStock file names, not their lab), checked the press is about this company (UPJV names Glyx Therapeutics and the LG2A lab). Flags for Raka, VitaDX's safeguard procedure since June means he's stretched and money is tight across his companies, and the message never mentions the seed round or the press (clues stay out). Facts hold, confidence MEDIUM
```

SKETCH
```
Hi Fabrice, Glyx Therapeutics looks cool!

However, your homepage is built from stock lab photos and slogans like "Passion for Science, Commitment to Progress", and its newest news is from December 2025. So an investor checking Glyx likely sees a template rather than a company with a lead compound.

I'd suggest a modernised site built around your tau science, your lead compound, your team and your partners, with an investor page worth sending.

At Astra agency we make websites for brands like Unilever, AXA, Pertamina.

Shall I send you a sketch of the modernised Glyx Therapeutics site?
```
