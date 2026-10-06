# nsa04, AI default angle pass, 2026-10-06. 2 openers staged (neither sendable yet), 6 closed.

Brief, /tmp/claude-0/agents/AI_DEFAULT_BRIEF.md. Read only everywhere but this file. Nothing sent, no lemlist write, no git.

## What was run, per lead, and the counts

- **Threads.** get_inbox_conversation on all eight contactIds at about 06:20 UTC, every one paged to nextPage null. Kevin 4 items, Amir 3, James 2, the other five 0. Kevin's full thread in the same minute is the positive control for the five empty ones.
- **lemlist records.** search_contacts on all eight names, plus a 100 lead campaign listing for v0.1 that holds the leadIds and companyName for Matt (lea_iNian5sCtvbQnem4C, Aseno), Stephane (lea_yZPf84QwBxppHfmF9, S&A Débarras), Maëlle (lea_RqRJfTHHZfrP6qtAN, Utrecht Longevity Society), Nick (lea_DGSW93jT3XCR5BAkr, TU Delft) and Noah (lea_tuhwBfjkSfYhxquPt). **Three of the five queue rows had the wrong company.** The 16 Sep rows put Matt at Innovafeed, Stephane at Gerflor and Maëlle at Kabelpro. lemlist now says Aseno, S&A Débarras and Utrecht Longevity Society, and the registers settle Matt and Stephane as owners.
- **Acceptance, per lead, GET /api/activities?leadId=...&type=linkedinInviteAccepted.** Stephane and Matt came back empty, both are still `linkedinInviteDone`, invite sent 2026-09-08 and never accepted. Positive controls in the same minutes, Noah's lead returned linkedinInviteAccepted 2026-10-01T18:48:44Z and Amir's full activity list holds linkedinInviteAccepted 2026-07-16. **So both openers below are staged, not sendable, LinkedIn won't deliver them until the invite is accepted.**
- **Campaign.** search_campaign_leads reports cam_PryZp5LuvQv8NznHh (v0.1 Outreach Only) as **status paused** today. CLAUDE.md still calls it the only running campaign. Raka's call, flagged.
- **Registers.** Companies House Aseno Ltd 16976488 (officers and PSC pages). recherche-entreprises.api.gouv.fr for S&A DEBARRAS 103209847 through tools/fetch-walled.py (plain curl was reset twice, control example.com 200). The mesinfos constitution notice L26159912. The Systemhaus-Hertling and SURGEOR legal pages.
- **Sites.** tools/crawl.py twice on the two draft leads and once on the other four, tools/site-audit.js on all six homepages with screenshots opened for S&A Débarras and Aseno, tools/eu-view.py on all six, tools/social-audit.js on all six, tools/news.py on the two draft leads. Wayback CDX was reset by the proxy on curl and fetch-walled both, written as walled.

| Lead | Verdict | One line |
|---|---|---|
| Kevin Rato, SURGEOR | NO_SIGNAL | Sells process automation (GLPI, Ansible) himself, three unanswered messages already, the trust section we pitched was fixed |
| Amir G'nia, Ad-Wise | NO_SIGNAL | Sells AI marketing, site rebuilt, we wrote "Nothing to pitch here" on 14 Sep |
| James Stewart, Bamboo Invest | NO_SIGNAL | Already runs its own client profiler tech (Bamboo.align), new June 2026 site, no expansion signal |
| Matt Longshaw, Aseno | DRAFT_A, NOT CONNECTED | Two directors selling systematic reviews and scientific dossiers from their own database |
| Stephane Chalendard, S&A Débarras | DRAFT_A, NOT CONNECTED | Every quote needs a free visit across four départements, two founders |
| Maëlle Poirel, Kabelpro | CLOSED_NOT_ICP | Head of Automation employee, the "Founder" title is a student longevity society |
| Nick Eleftheroglou, TU Delft | CLOSED_NOT_ICP | Associate Professor, co-founder and advisor only at Prognora, whose CEO is someone else |
| Noah Hertling, Systemhaus-Hertling | NO_SIGNAL | One owner IT firm from April 2026, no volume claim, every flaw an afternoon fix |

## Things Raka would want first

- **Two earlier verdicts were wrong and I'm overriding them with register evidence.** Matt is a director and 25 to 50% PSC of Aseno Ltd (16976488, incorporated 20 Jan 2026), not an Innovafeed employee. Stephane is Directeur Général and, per his own site, one of the "2 associés" behind S&A Débarras SAS (103 209 847, created 15 Apr 2026), not a Gerflor employee. Viadeo puts his co founder Alexandre Clochet at Gerflor in Villeurbanne, which fits "anciens managers en logistique", so the old Gerflor row was very likely their previous job.
- **Neither of them accepted the invite.** Both openers sit here until they do.
- **Nick's better door.** TU Delft's research portal says he is "a co-founder and advisor at Prognora". Prognora's CEO per a search result is Panagiotis Komninos. Komninos, not Nick, is the person to research if Prognora is wanted.
- **Kevin, a free tip, not a pitch.** https://surgeor.com/contact/ shows "04 00 00 00 00" and https://surgeor.com/mentions-legales/ shows "+33600000000", both placeholders, read in today's crawl. He's had three messages with no answer, so a fourth isn't recommended.
- **James.** Bamboo's footer now names Thornbridge Investment Management LLP (FRN 713859) as principal, where the 14 Sep research had Brooklands. Context only.

---

## Kevin Rato, SURGEOR, ctc_vprJ9wmXfFGzQ6csE

Screen. Thread 4 items, nextPage null. 2026-09-03 OUT connect note. 2026-09-14 14:36 OUT opener on the "ils nous font confiance" carousel holding Siblu plus the Divi placeholder logo. 2026-09-14 16:45 OUT correction rewording it. 2026-09-28 OUT nudge "Could you get Siblu's OK to write it up?". **WE SENT THREE REAL MESSAGES. HE NEVER REPLIED.** No promise of a last message.
Prior verdicts, NO_STRONG_ANGLE (Aug), SENT 14 Sep, NUDGED 28 Sep, NO_STRONG_ANGLE 3 Oct because surgeor.com dateModified 2026-10-01 dropped the placeholder logo and added a Siblu quote (state/drafted_2026-10-03-due3-B11.md).
Record, jobTitle "Co-founder | ITSM & IT Governance Consultant | GLPI Expert". https://surgeor.com/mentions-legales/ names SURGEOR, capital 1000 euros, RCS Lyon 100 225 754, represented by Enzo SALAUN. Co founder, passes the owner rule.

Verdict **NO_SIGNAL**. A fails, SURGEOR sells the thing, https://surgeor.com/glpi/ "automatiser vos processus métiers" and https://surgeor.com/ansible/ "réduire les interventions manuelles", so an AI workflow pitch is a pitch to an automation vendor. B fails, no funding, hiring, new market or new service on any of the 14 crawled URLs, and the proof gap we pitched is fixed. A fourth message after three unanswered ones on the same site would read as pressure.

```sweep
lead: Kevin Rato, SURGEOR, ctc_vprJ9wmXfFGzQ6csE
website: tools/crawl.py read 14 URLs on https://surgeor.com/ , clean Divi site, the only fault is placeholder phones on /contact/ and /mentions-legales/, an afternoon fix and a free tip only
gdpr: tools/eu-view.py from Stockholm on https://surgeor.com/ shows 3 first party cookies including cf_clearance and cookieyes-consent, no third party tracker cookie, nothing to say
apps: https://surgeor.com/glpi/ and https://surgeor.com/ansible/ sell process automation and fewer manual interventions, so an AI workflow offer is aimed at an automation vendor, fails the brief
social: tools/social-audit.js opened https://linkedin.com/company/surgeor , 3,264 followers read, the only account the site links, not a channel problem worth a message
squad: no team page, no vacancies, no delivery times anywhere in the crawl of https://surgeor.com/ , and three unanswered messages already in the lemlist thread
verdict: NO_STRONG_ANGLE, NO_SIGNAL under the AI default brief, no fourth message
```

## Amir G'nia, Ad-Wise, ctc_y3gpN63BLefNtaCpR

Screen. Thread 3 items, nextPage null. 2026-07-16 OUT connect note. 2026-08-17 OUT pitch on 0X placeholders in the results section. 2026-09-14 OUT "you've rebuilt the whole thing ... Nothing to pitch here ... we do white label work for agencies". **WE SENT TWO REAL MESSAGES, HE NEVER REPLIED.**
Prior verdicts, DRAFTED, SENT, then NO_STRONG_ANGLE 3 Oct (state/drafted_2026-10-03-due3-B04.md).
Record, search_contacts "Amir G'nia", jobTitle "co-Founder - CEO", linkedinUrl /in/amirghorbaninia. Owner rule passes.

Verdict **NO_SIGNAL**. The page title at https://ad-wise.ca/ is "AI Marketing Agency for Regulated Brands", "an engine room of private models raised on your brand". A lead that sells AI is not an A lead. B, the site was rebuilt on Framer between our two messages and already serves where they're going. Our own last message said there was nothing to pitch.

```sweep
lead: Amir G'nia, Ad-Wise, ctc_y3gpN63BLefNtaCpR
website: tools/crawl.py read 30 URLs on https://ad-wise.ca/ , a fresh Framer build with named work, the gap we pitched in August is gone
gdpr: tools/eu-view.py from Stockholm on https://ad-wise.ca/ sets _ga and _ga_RDWZ3YJYN6 before a click, but Ad-Wise sells in Canada from Markham, Ontario, so not a GDPR lead
apps: https://ad-wise.ca/ sells AI marketing pods and private models, they build the thing we'd offer, fails the brief
social: tools/social-audit.js opened the LinkedIn page (72 followers), YouTube (4 subscribers) and X, Instagram came back UNKNOWN, an AI agency's own channels, not ours to fix
squad: our 14 Sep message already offered white label build help in the lemlist thread and got no answer
verdict: NO_STRONG_ANGLE, NO_SIGNAL under the AI default brief
```

## James Stewart, Bamboo Invest, ctc_EQEgHwLdmREfD2g6J

Screen. Thread 2 items, nextPage null. 2026-09-05 OUT connect note. 2026-09-14 OUT opener on the professional client declaration swallowing every page. **WE SENT ONE REAL MESSAGE, HE NEVER REPLIED.**
Prior verdicts, DRAFTED, SENT 14 Sep, nudge skipped 28 Sep because the gate was gone, NO_STRONG_ANGLE 3 Oct.
Record, jobTitle "Co-Founder & CEO". https://bamboo-invest.com/media/ names "co-founders Tim Crockford (CIO) and James Stewart (CEO)". Owner rule passes.

Verdict **NO_SIGNAL**. A fails, Bamboo already runs its own profiler tech, https://bamboo-invest.com/services/bamboo-align/ "Your clients answer a short profiler ... Align maps to the best fitting portfolio ... A written record for your client and your own files", plus a Member Login. B fails, the company launched in June 2026 (https://bamboo-invest.com/bamboo-invest-launches/ dated 24/06/2026), the site is that launch site, and the Founding Member Offer is for ten firms, not an expansion. Leftover Salient demo pages (/portfolio/radiant/ "Life in Full Color") are an afternoon cleanup, and site-audit.js printed RENDER NOT TRUSTED, so no visual claim either.

```sweep
lead: James Stewart, Bamboo Invest, ctc_EQEgHwLdmREfD2g6J
website: tools/crawl.py read 72 URLs on https://bamboo-invest.com/ , the June launch site, theme demo pages left in /portfolio/ are a tweak, site-audit.js said RENDER NOT TRUSTED so nothing visual is used
gdpr: tools/eu-view.py from Stockholm on https://bamboo-invest.com/ shows _ga and _ga_8RX9HDE0N7 before a click next to a CookieYes banner, a settings fix for their web person, not a paid project
apps: https://bamboo-invest.com/services/bamboo-align/ is their own client profiler with a written record and a login, they already built the tool we'd offer
social: tools/social-audit.js opened https://www.linkedin.com/company/bamboo-invest-limited/ , the only account linked, nothing to build on
squad: two co founders per https://bamboo-invest.com/media/ , no vacancies or build backlog anywhere in the crawl
verdict: NO_STRONG_ANGLE, NO_SIGNAL under the AI default brief
```

## Maëlle Poirel, Kabelpro, ctc_hciKggp7MJ7QSZ3Mp

Screen. Thread 0 items, nextPage null, control Kevin full. sentOnly search shows only the 2026-09-07 connect note, lastRepliedAt null.
Prior verdicts, UNRESEARCHED then NO_STRONG_ANGLE 16 Sep, "Head of Automation at Kabelpro. Employee".
Record, search_contacts jobTitle "Founder", campaign lead companyName "Utrecht Longevity Society". A search returns her LinkedIn title "Maëlle Poirel - Head of Automation - Kabelpro", since February 2023, Biomedical Sciences at Utrecht University. https://luma.com/utrecht-longevity-society describes a "Community for curious minds in the field of biological aging", and a search result calls ULS the first student longevity society in the Netherlands.

Verdict **CLOSED_NOT_ICP**. Her paid job is an employee role at Kabelpro, and the thing she founded is a student society with nothing to sell.

## Nick Eleftheroglou, TU Delft, ctc_zqWKGZuinXaAdAXPN

Screen. Thread 0 items, nextPage null, control Kevin full. Never messaged.
Prior verdicts, UNRESEARCHED then NO_STRONG_ANGLE 16 Sep, academic group, no company.
Record, jobTitle "Associate Professor", companyName "TU Delft | Aerospace Engineering". https://research.tudelft.nl/en/persons/n-eleftheroglou , Associate Professor, head of the iSP group, "a co-founder and advisor at Prognora". A search on Prognora names Panagiotis Komninos as Co-Founder & CEO.

Verdict **CLOSED_NOT_ICP**. An academic whose company role is advisor, the business is run by someone else. Komninos is the lead if Prognora is wanted.

## Noah Hertling, Systemhaus-Hertling UG (haftungsbeschränkt), ctc_ch3vFcKAkjQdMKDCg

Screen. Thread 0 items, nextPage null, control Kevin full. Accepted 2026-10-01T18:48:44Z per the activities endpoint. Never messaged.
Prior verdicts, BLOCKED_NEEDS_INFO 16 Sep (wrong person, a French designer), then NO_STRONG_ANGLE 3 Oct (state/drafted_2026-10-03-new-accepts.md).
Record, jobTitle "Geschäftsführer", lea_tuhwBfjkSfYhxquPt. https://systemhaus-hertling.com/impressum/ "Vertreten durch Geschäftsführer: Noah Joel Hertling", HRB 27513 HL, Amtsgericht Lübeck. Owner rule passes.

Verdict **NO_SIGNAL**. A, the jobs on his site are a support hotline "Mo–Fr, 8–18 Uhr" and "Jede Änderung an Ihrer Infrastruktur wird dokumentiert", but there's no client, volume or team fact to say either eats his hours, the VAT number is still "Beantragt", and he sells IT setup and support himself. B, the company and the site are both from 2026, nothing points at a market the site doesn't serve. The leftovers ("Hello world!", "Sample Page", a privacy text that says it's a template, a mailto contact form) are fixes he'd make in an afternoon.

```sweep
lead: Noah Hertling, Systemhaus-Hertling, ctc_ch3vFcKAkjQdMKDCg
website: tools/crawl.py read 13 URLs on https://systemhaus-hertling.com/ , new 2026 WordPress site with Hello world and Sample Page live and a mailto form, afternoon fixes he can make himself
gdpr: tools/eu-view.py from Stockholm on https://systemhaus-hertling.com/ , 0 cookies, only fonts.googleapis.com and fonts.gstatic.com, the remote Google Fonts are a tweak
apps: https://systemhaus-hertling.com/ names a hotline and documentation of every change but no client or volume fact, and he sells IT setup himself, nothing proven to automate
social: tools/social-audit.js had nothing to open, site-audit.js found no social account linked on https://systemhaus-hertling.com/ against its synthetic control
squad: one Geschäftsführer per the Impressum and register HRB 27513 HL, no vacancies, no backlog, nothing to staff
verdict: NO_STRONG_ANGLE, NO_SIGNAL under the AI default brief
```

## Matt Longshaw, Aseno, ctc_hMEuPKtp8hLpXpDpk

Screen. Thread 0 items, nextPage null, control Kevin full. **Invite sent 2026-09-08 (act_S27a4k7o3Fnq5FmK7), NOT ACCEPTED**, lead state linkedinInviteDone, linkedinInviteAccepted query empty while Noah's returned his in the same minutes. Never messaged.
Prior verdicts, UNRESEARCHED, then NO_STRONG_ANGLE 16 Sep calling him an Innovafeed employee. SUPERSEDED here with register evidence.
Record, jobTitle "Science Director", companyName Aseno, companyDomain aseno-partners.com. Companies House 16976488 ASENO LTD, incorporated 20 January 2026, SIC 72110, directors LONGSHAW Matthew Dr. and WESKER Alexandra Paulien both appointed 20 January 2026, both PSCs at 25 to 50% shares and votes. An owner.

Verdict **DRAFT_A**, staged until he accepts.

```gate
lead: Matt Longshaw, Aseno Ltd, ctc_hMEuPKtp8hLpXpDpk, lea_iNian5sCtvbQnem4C. Director and 25 to 50% PSC of ASENO LTD, Companies House 16976488, incorporated 20 Jan 2026, Ashbourne, with Alexandra Wesker the other director and PSC. lemlist jobTitle "Science Director", summary "translate these data into commercially relevant and accessible language". Thread 0 items paged to null, control Kevin's 4 item thread in the same minute. Invite not yet accepted, so this is staged
site pass 1: 80 URLs by tools/crawl.py on https://aseno-partners.com/ , 16 real pages (home, about, services and its six service pages, contact, publications, maintenance page, form) and the rest publication filter permutations, every real page read
site pass 2: 200 URLs, second full crawl, the same 16 real pages plus more publication filters, tools/site-audit.js on the homepage, desktop and phone screenshots opened, no RENDER NOT TRUSTED, three missing font files are theirs
deep analysis: A two person science consultancy for feed and food, five service lines (research intelligence, nutrition services, clinical nutrition, market entry, animal health) plus education. The research intelligence page sells "systematic reviews, writing or interpreting technical reports and fact sheets", "ready access to our own curated database covering biology, nutrition, and health", and "we can quickly summarise the latest findings". The home page lists "Scientific dossiers, Gap analysis" and the about page says Alexandra "develops scientific dossiers to substantiate functional ingredient claims". The contact page promises "Get your novelty to the pet food, animal feed or human food market faster anywhere in the world". A publications list of 122 entries is kept on site. No AI, automation or tool is named anywhere in either crawl. So the product is expert reading and writing, and the capacity is two people
owner linkedin: same person as the contact, the register and the lemlist record agree. Co owner Alexandra Wesker, web search "Alexandra Wesker" Aseno, result title "Alexandra Wesker - Aseno", her own sites weskernutrition.com and horseconsult.co.uk in the same results, globalpetindustry.com author page, walled routes not used
contact linkedin: route 1 curl https://www.linkedin.com/in/matt-longshaw-phd-frsb-a2b1474a/ 301 to the wall, /recent-activity/all/ 429. Route 2 web search "Aseno Matt Longshaw science director", title "Matt Longshaw PhD FRSB - Aseno". Route 3 web search linkedin.com/posts aseno-partners Longshaw, a snippet mentions Vitafoods Europe posts, unopened and unused. Route 4 https://calysta.com/meet-the-team-matt-longshaw/ in results, his previous employer. Route 5 tools/social-audit.js on https://www.linkedin.com/company/111644849 UNKNOWN, walled. Route 6 https://aseno-partners.com/about-us/ bio and the lemlist summary
google news: tools/news.py en, "Aseno" 39 results all unrelated (Kenya, Nagaland, IDEA), "Matt Longshaw" 8 results, only a 2015 The Fish Site piece is his, control Tesco 100
regional news: tools/news.py (Derbyshire OR Scotland) (novel feed ingredients OR aquaculture feed regulatory) 29 results, 2026-01-15 Aquafeed.com "Cargill sees opportunity in AI, alternative proteins", 2025-12-15 The Fish Site "Hy-D lands EU aquafeed approval", headlines only
industry news: tools/news.py novel feed ingredients OR aquaculture feed regulatory 80 results, 2026-09-29 PetfoodIndustry on the PURR Act, 2026-09-24 CIRS Group on China's new food approvals, regulatory pace is the industry's story, headlines only
sources:
1. https://aseno-partners.com/
2. https://aseno-partners.com/about-us/
3. https://aseno-partners.com/services/research-intelligence/
4. https://aseno-partners.com/contact/
5. https://aseno-partners.com/services/nutrition-services/
6. https://aseno-partners.com/publications/
7. https://find-and-update.company-information.service.gov.uk/company/16976488
8. https://find-and-update.company-information.service.gov.uk/company/16976488/officers
9. https://find-and-update.company-information.service.gov.uk/company/16976488/persons-with-significant-control
10. https://webbkoll.5july.net/en/results?url=http%3A%2F%2Faseno-partners.com%2F (tools/eu-view.py)
11. https://news.google.com/rss (tools/news.py, company, person, region, industry)
12. https://www.linkedin.com/in/matt-longshaw-phd-frsb-a2b1474a/ (walled, 301 and 429)
13. https://www.linkedin.com/company/111644849 (walled, UNKNOWN)
14. https://calysta.com/meet-the-team-matt-longshaw/ (search result, his prior employer)
15. http://www.horseconsult.co.uk/ (search result, Alexandra Wesker)
16. https://web.archive.org/cdx/search/cdx?url=aseno-partners.com (walled, reset on curl and fetch-walled), site JSON-LD instead, datePublished 2026-04-26, dateModified 2026-08-18
pains: 5 judged. (1) Apps, research intelligence, systematic reviews and scientific dossiers are the product, built by hand from their own curated database by two directors, while the contact page promises clients a faster route to market. Costliest, it caps how many briefs two people can take. (2) Website, a clean new Astra theme site, a leftover maintenance page and three missing font files, tweaks. (3) GDPR, 0 cookies from Stockholm, but no privacy link and the contact form collects name, email, phone, a tweak. (4) Social, only a LinkedIn company page, walled, nothing proven. (5) Squad, they don't build software
chosen: (1), costliest, the reading and writing behind every review and dossier is the hours they sell, and two people set the ceiling
sweep website: tools/crawl.py twice on https://aseno-partners.com/ , 16 real pages, screenshots opened, clean new site, leftover /maintenance-page/ and three 404 font files are afternoon fixes, not chosen
sweep gdpr: tools/eu-view.py from Stockholm on https://aseno-partners.com/ , 0 cookies and no tracker, site-audit.js found no privacy link against its control, a tweak, not chosen
sweep apps: https://aseno-partners.com/services/research-intelligence/ sells systematic reviews and summaries from "our own curated database", Companies House 16976488 lists two directors, chosen
sweep social: tools/social-audit.js opened https://www.linkedin.com/company/111644849 , walled, UNKNOWN, the only account linked, not chosen
sweep squad: two scientists per https://aseno-partners.com/about-us/ , no software built or sold, nothing to staff
thread: problem research intelligence, systematic reviews and scientific dossiers from their own database sold by two directors | cost the hours behind each review and dossier cap how many clients they take on while promising a faster route to market | offer the AI research and dossier workflow | link research, dossier
lead read: Matt reads that Aseno sells research, reviews and dossiers out of its own database with two directors doing the work, so new briefs queue behind what's already on their desks, and that matters more as they promise a faster route to market, and gets offered an AI research and dossier workflow, one thread
claims:
your site offers research intelligence, https://aseno-partners.com/ "Research intelligence: Substantiation, Scientific dossiers, Gap analysis", rechecked 06:48 UTC
systematic reviews, https://aseno-partners.com/services/research-intelligence/ "delivering systematic reviews", rechecked 06:48 UTC
from your own curated database, https://aseno-partners.com/services/research-intelligence/ "our own curated database", rechecked 06:48 UTC
Aseno is two directors, https://find-and-update.company-information.service.gov.uk/company/16976488/officers LONGSHAW Matthew Dr. and WESKER Alexandra Paulien, and https://aseno-partners.com/about-us/ "Matt Longshaw Science Director" and "Alexandra Wesker Technical Director", rechecked 06:48 UTC
promising clients a faster route to market anywhere in the world, https://aseno-partners.com/contact/ "Get your novelty to the pet food, animal feed or human food market faster anywhere in the world", rechecked 06:48 UTC
recheck: 2026-10-06 06:48 UTC, all four Aseno pages fetched again and every quoted line found, control example.com 200. The Heineken credential is Raka's own record in docs/astra-master-context.md section 2A, 23 markets with self serve insights. Thesis confidence MEDIUM, the service list and the two directors are proven, that the reading and writing is the bottleneck is inference he can test against his own diary
```

### Matt, OPENER

```
Hi Matt, saw Aseno, looks interesting!

However, your site offers research intelligence, systematic reviews and scientific dossiers from your own curated database, and Aseno is two directors. This causes each new client brief to wait behind the reading and writing the two of you already have on your desks.

Especially, when you are promising clients a faster route to market anywhere in the world, the hours behind each review and dossier decide how many clients you can take on.

I run Astra agency. We build AI workflows for brands like Unilever, AXA, Pertamina. I set up self serve insights for 23 markets at Heineken, so I've seen how much research time comes back when experts aren't the only way in.

Shall I send you over what the AI research and dossier workflow for Aseno looks like?
```

## Stephane Chalendard, S&A Débarras, ctc_nB3Bkxa5vXBpna5QQ

Screen. Thread 0 items, nextPage null, control Kevin full. **Invite sent 2026-09-08 (act_rz9M6XpjuyBtypKWX), NOT ACCEPTED**, lead state linkedinInviteDone, linkedinInviteAccepted query empty while Noah's returned his. Never messaged.
Prior verdicts, UNRESEARCHED, then NO_STRONG_ANGLE 16 Sep calling him a Gerflor France employee. SUPERSEDED here with register evidence.
Record, jobTitle "Directeur général", tagline "Directeur général chez S&A Débarras", companyDomain sadebarras.fr. recherche-entreprises, S&A DEBARRAS SIREN 103209847, created 2026-04-15, NAF 38.32Z, CLOCHET Alexandre Président de SAS, CHALENDARD Stéphane Directeur Général. Their homepage, "Nouvelle société créee par 2 associés en 2026, anciens managers en logistique". A co founder.

Verdict **DRAFT_A**, staged until he accepts.

```gate
lead: Stephane Chalendard, S&A Débarras SAS, ctc_nB3Bkxa5vXBpna5QQ, lea_yZPf84QwBxppHfmF9. Directeur Général of S&A DEBARRAS, SIREN 103 209 847, created 15 Apr 2026, Saint-Pierre-la-Palud, Alexandre Clochet Président, per recherche-entreprises and the mesinfos constitution notice L26159912 dated 26 Apr 2026. The homepage says the company was created by two associates in 2026, and the S&A name and the two officers match. lemlist jobTitle "Directeur général". Thread 0 items paged to null, control Kevin's thread full in the same minute. Invite not yet accepted, so this is staged
site pass 1: 3 URLs by tools/crawl.py on https://sadebarras.fr/ , a one page Divi site (the sitemap holds one page, the other two are xmlrpc 503s), the page read in full, every anchor listed from the raw HTML, #Contact, #Service and the theme author link, and every form input listed
site pass 2: 3 URLs, second full crawl matching pass 1, tools/site-audit.js with desktop and phone screenshots opened, no RENDER NOT TRUSTED, the page fetched a third time at 06:48 UTC for the claims
deep analysis: A new one page site for a two founder clearance company, homes and business premises, Diogène, successions, sinistres, archives destruction and cleaning. Three named reviews. The zone is "Ouest Lyonnais Rhône Loire Sud-Ouest Ain Nord Isère". Every quote starts with a visit, "Chiffrage Précis Devis Gratuit Nous nous déplaçons gratuitement afin de chiffrer précisément vos demandes" and, above the form, "nous devons nous déplacer pour vous rencontrer et ainsi estimer au mieux votre projet". The form asks Nom, Prénom, Téléphone, email twice, Message and a sum captcha, no photo upload, no volume or access questions. Floating phone and email buttons by Buttonizer. Webbkoll also lists www.formilla.com among the hosts contacted, and no chat bubble shows on either screenshot, so it's left out. So every request, a garage or a whole house, costs one of the two founders a drive before any price exists
owner linkedin: Alexandre Clochet, the Président. Route 1 no profile URL in their HTML or lemlist. Route 2 web search "Alexandre Clochet" S&A Débarras returns the mesinfos notice and https://viadeo.journaldunet.com/p/alexandre-clochet-4959209 titled "Alexandre CLOCHET (Gerflor à Villeurbanne)", a prior job consistent with "anciens managers en logistique". Route 3 the company page through tools/social-audit.js, https://www.linkedin.com/company/s-a-d%C3%A9barras/ read, 12 followers, "On fait place nette, même dans les têtes". Route 4 the register. Route 5 Instagram and YouTube through social-audit.js. Route 6 the site's own "2 associés" line
contact linkedin: route 1 curl https://www.linkedin.com/in/stephane-chalendard-589890146/ 301 to the wall, /recent-activity/all/ 429. Route 2 web search "S&A Débarras" Chalendard, title "Stephane Chalendard - S&A Débarras". Route 3 web search Chalendard débarras Saint-Pierre-la-Palud, nothing more about him. Route 4 the register, DG. Route 5 the lemlist tagline. Route 6 the company page above
google news: tools/news.py fr, "S&A Débarras" 0 results, "Stéphane Chalendard" 0, control Carrefour 98
regional news: tools/news.py (Lyon OR Rhône OR L'Arbresle) (débarras OR syndrome de Diogène) 49 results, 2026-08-09 Le Progrès on an Ain company doing "nettoyage extrême" for almost ten years, 2026-06-18 Le Progrès Loire "Deux bennes de déchets à évacuer chaque jour", headlines only, steady Diogène demand in their zone
industry news: tools/news.py débarras OR syndrome de Diogène 100 results, 2026-10-01 kohenavocats.fr on what a judge can order, 2026-09-26 Actu.fr on a Vendée cleaner, headlines only
sources:
1. https://sadebarras.fr/
2. https://recherche-entreprises.api.gouv.fr/search?q=debarras%20saint-pierre-la-palud (tools/fetch-walled.py)
3. https://mesinfos.fr/consulter-annonces-legales/auvergne-rhone-alpes/69-rhone/s-et-a-debarras-bd939ce2a5b6db021fccb51d2fe3430b0891aad8 (tools/fetch-walled.py)
4. https://www.linkedin.com/company/s-a-d%C3%A9barras/ (tools/social-audit.js, 12 followers)
5. https://www.instagram.com/sadebarras69/ (tools/social-audit.js, 23 followers, 5 posts, latest 2026-09-22)
6. https://www.facebook.com/profile.php?id=61565305826165 (tools/social-audit.js, 53 followers)
7. http://www.youtube.com/@SAD%C3%A9barras (tools/social-audit.js, 3 subscribers, 3 videos)
8. https://www.tiktok.com/@sadebarras (tools/social-audit.js, 9 followers)
9. https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fsadebarras.fr%2F (tools/eu-view.py)
10. https://news.google.com/rss (tools/news.py, company, person, region, industry)
11. https://viadeo.journaldunet.com/p/alexandre-clochet-4959209 (search result title only)
12. https://www.linkedin.com/in/stephane-chalendard-589890146/ (walled, 301 and 429)
13. https://web.archive.org/cdx/search/cdx?url=sadebarras.fr (walled, reset on curl and fetch-walled), site JSON-LD instead, datePublished 2026-04-16, dateModified 2026-07-17
pains: 5 judged. (1) Apps, every quote needs a free visit by one of two founders anywhere across four départements, and the form collects nothing that could sort a request first. Costliest, it's unpaid driving on every request and caps how many jobs two people can price. (2) GDPR, from Stockholm 8 cookies before a click, _ga, _ga_NRRFHXW6KH and five YouTube cookies next to a CookieYes banner, real but a settings fix for whoever built the site. (3) Website, a clean new one page site with real reviews, nothing structural. (4) Social, five accounts all opened and small, normal for a six month old company. (5) Squad, they don't build software
chosen: (1), costliest and hottest, a new company taking every request it can is paying for each quote in fuel and hours before any job exists
sweep website: tools/crawl.py twice and site-audit.js screenshots of https://sadebarras.fr/ , clean new one page Divi site with three reviews, no structural flaw, not chosen
sweep gdpr: tools/eu-view.py from Stockholm on https://sadebarras.fr/ , _ga, _ga_NRRFHXW6KH and YouTube cookies set before a click beside a CookieYes banner, true but an afternoon settings fix, not chosen
sweep apps: https://sadebarras.fr/ "Nous nous déplaçons gratuitement afin de chiffrer précisément vos demandes", a seven field form with no photos, two associates per the register, chosen
sweep social: tools/social-audit.js opened LinkedIn 12, Instagram 23 with a 22 Sep post, Facebook 53, YouTube 3 and TikTok 9, small and active for a new company, not chosen
sweep squad: two founders per the register and the homepage, no software built or sold, nothing to staff
thread: problem the site is built on a free visit before every quote across four départements | cost the driving behind each quote grows with every request while the company takes on homes and businesses | offer the AI quote workflow | link quote, request
lead read: Stephane reads that his site sends one of the two founders out on a free visit before any quote, anywhere from the Loire to the Isère, so they lose hours on requests that may never become a job, and that grows with every new request, and gets offered an AI quote workflow, one thread
claims:
a free visit before every quote, https://sadebarras.fr/ "Nous nous déplaçons gratuitement afin de chiffrer précisément vos demandes" and "nous devons nous déplacer pour vous rencontrer et ainsi estimer au mieux votre projet", rechecked 06:48 UTC
anywhere in the Rhône, Loire, Ain and Isère, https://sadebarras.fr/ "Zone d’intervention Ouest Lyonnais Rhône Loire Sud-Ouest Ain Nord Isère", rechecked 06:48 UTC
the two of you, https://sadebarras.fr/ "Nouvelle société créee par 2 associés en 2026", and recherche-entreprises SIREN 103209847, rechecked 06:48 UTC
a new company that clears homes and business premises alike, https://sadebarras.fr/ "Particuliers" and "Professionnels" service sections, created 2026-04-15 per the register, rechecked 06:48 UTC
recheck: 2026-10-06 06:48 UTC, https://sadebarras.fr/ fetched again (200) and every quoted line found, control example.com 200. The Betty Blocks credential is Raka's own record in docs/astra-master-context.md section 2A, automation driven revenue workflows covering scoring and routing. Thesis confidence MEDIUM, the free visit, the zone and the two founders are proven on their own page and the register, that the driving costs them jobs is inference he can test against his own week. Red team, Diogène and succession jobs need a visit whatever happens, so the workflow sorts and prices the simple requests from photos and keeps the visit for the jobs worth it, it doesn't remove the visit
```

### Stephane, OPENER

```
Hi Stephane, saw S&A Débarras, looks interesting!

However, your site is built on a free visit before every quote, anywhere in the Rhône, Loire, Ain and Isère. This causes the two of you to spend unpaid hours on the road for requests that won't always turn into a job.

Especially, when you are building a new company that clears homes and business premises alike, the driving behind each quote grows with every request that comes in.

I run Astra agency. We build AI workflows for brands like Unilever, AXA, Pertamina. I built the automated workflows at Betty Blocks that scored and routed incoming leads, and that's the same job as sorting a quote request before anyone drives out.

Shall I send you over what the AI quote workflow for S&A Débarras looks like?
```
