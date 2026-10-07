<!-- b14_B directed angles, 2026-10-07. Nothing sent, no lemlist writes, no commit. Re pull each thread before sending. -->
# Directed angles, Orion Dai and Dan Waterfall-Chapman, 2026-10-07

Threads pulled 2026-10-07 17:08 UTC (sync "recent" 17:08:07Z), paged to the end. Orion 1 item (our 29 Jul note), Dan 0 items. Positive control ctc_ch3vFcKAkjQdMKDCg returned its 2 known items in the same minute.

### Orion Dai Yuhui, Omnilabs Research, ctc_JiMGgwH639YbSSZfE

OPENER. Raka's angle, a launch website plus an AI sales workflow. Confidence MEDIUM, Blurry Works holds the web design and co built the product software.

```gate
lead: Orion Dai Yuhui, co-founder, CEO and director of Omnilabs Research Ltd 16176116 (director since 8 Apr 2025, PSC is co-founder Lucie Legrandois 75%+), ctc_JiMGgwH639YbSSZfE, leadId lea_kxtJHsgdRbhkg5pW6, lemlist jobTitle "Co-founder & CEO". Thread 1 item, our 2026-07-29 note only, nextPage null, control 2 items same minute, accepted 2026-07-29 per the activities endpoint
site pass 1: 1 page, tools/crawl.py on https://omnilabs-research.com/ , a one page Webflow site, nav anchors only, full text read
site pass 2: 1 page, second crawl equal, site-audit.js desktop and phone screenshots opened, render trusted, 0 page errors
deep analysis: One page for a pre CE mark medtech. It explains the problem (60 minutes a week of therapy against 3 hours a day recommended), the glove and the team, then asks visitors to register interest in clinical trials or book a call about collaboration or trials. Their own posts aim at clinicians and the hospital to home pathway and at survivors who'd buy, with a 2030 goal across the UK, EU and Singapore. Nothing on the site is made for a rehab team or lets anyone sign up for launch
owner linkedin: same person as the contact. Route 1 curl /in/orion-d-4338ab166 999. Route 2 search "Orion Dai" Omnihuman, Prototypes for Humanity entries only. Route 3 posts search, nothing indexed. Route 4 people data, the site team section and Companies House officers. Route 5 the company page https://uk.linkedin.com/company/omnilabs-research raw HTML, his reposted posts read in full (2030 goal, 70% purchase intent, Apple Developer Centre with Blurry Works). Route 6 lemlist tagline "Design Engineer I Currently building Omnihuman"
contact linkedin: same person as owner, the site, the register and lemlist all name him Co-founder & CEO
google news: tools/news.py en, "Omnilabs Research" 2, "Orion Dai" 5, control Tesco 103
regional news: tools/news.py (London OR UK) stroke rehabilitation, 76, Neubond £1.5m (Imperial, 2026-06-24), NHS rehab staff shortages (Guardian 2026-04-03)
industry news: tools/news.py stroke rehabilitation technology, 100, plus https://digitalhealth.london on their CERSI support and the LIHE MedTech Venture Builder repost
sources:
1. https://omnilabs-research.com/
2. https://find-and-update.company-information.service.gov.uk/company/16176116/officers
3. https://find-and-update.company-information.service.gov.uk/company/16176116/persons-with-significant-control
4. https://digitalhealth.london/radiant-cersi-innovator-support-programme-omnilabs-research-accelerates-regulatory-roadmap-through-expert-led-support
5. https://uk.linkedin.com/company/omnilabs-research
6. https://www.instagram.com/omnilabsresearch/
7. https://www.instagram.com/p/DYXbjt1jNSE/embed/captioned/
8. https://calendly.com/talk-to-omnihuman/30min
9. https://prototypesforhumanity.com/en/prototypes/omnihuman
10. https://www.hra.nhs.uk/planning-and-improving-research/application-summaries/research-summaries/development-and-initial-testing-of-an-innovative-rehab-portable-device (ruled out, not theirs)
11. https://news.google.com/rss (tools/news.py)
12. https://www.linkedin.com/in/orion-d-4338ab166/ (999)
pains: 4 judged. (1) launch site plus AI sales workflow that finds and signs up rehab teams for the three country rollout, CHOSEN. (2) trial recruitment workflow, small volume, runs through clinical partners. (3) insurer or NHS buyer pages, no payer named anywhere, unproven. (4) site only, a tweak for Blurry Works
chosen: (1), costliest and biggest, it sits on his own 2030 goal, and two founders with two interns can't reach rehab teams in three countries one by one
sweep website: one page at https://omnilabs-research.com/ via crawl.py and site-audit.js, modern and made by Blurry Works, asks only about trials and collaboration, CHOSEN as half the offer with the incumbent flagged
sweep gdpr: site-audit.js 1 cookie, 0 third party, no trackers and no consent code in the HTML, Webbkoll in the prior sweep showed Webflow CDN only, nothing to fix
sweep apps: trial interest comes through a three field form and https://calendly.com/talk-to-omnihuman/30min , the sales workflow is the app half of the offer, CHOSEN
sweep social: tools/social-audit.js opened https://www.instagram.com/omnilabsresearch/ 58 followers newest 2026-05-29, LinkedIn company 524 followers active, control getbaked.berlin read, not chosen, rehab peers sell through clinical networks
sweep squad: two founders and two interns per https://uk.linkedin.com/company/omnilabs-research , device software under a QMS, Blurry Works co builds the XR tool, not chosen
thread: problem the site has no page made for rehab teams and nothing to sign up for | cost rolling out across three countries means rehab teams won one at a time | offer the rehab team launch site and AI workflow | link rehab, launch
lead read: Orion reads that his trial stage site gives the rehab teams he'll want at launch no page and nothing to sign up for, which slows a rollout across the UK, EU and Singapore, and gets offered the rehab team launch site and AI workflow, one thread
claims:
your site is one page whose contact form and call link ask about trials and collaboration, https://omnilabs-research.com/ ("Contact us to register your interest to join our clinical trials", "Book a 30min session with the team to chat about collaboration or participation in trials"), crawl.py x2 found 1 page, hrefs are anchors only
no page made for rehab teams and nothing to sign up for, https://omnilabs-research.com/ grep of the homepage HTML for waitlist, sign up, newsletter, hospital, NHS, partner all 0, control words Makerversity and Blurry matched
taking Omnihuman to stroke survivors across the UK, EU and Singapore, his post on https://uk.linkedin.com/company/omnilabs-research "Our vision for 2030, to see 100,000 stroke survivors across the UK, EU, and Singapore using Omnihuman"
INFERENCE, rehab teams found one at a time at this stage, clues incorporated 10 Jan 2025 per https://find-and-update.company-information.service.gov.uk/company/16176116 , 2 to 10 staff, two founders and two interns, no sales hire visible
Betty Blocks credential, docs/astra-master-context.md section 2A, "automation-driven revenue workflows covering enrichment, scoring, routing and follow-up loops", https://www.linkedin.com/in/raka-mulya-b92885196
recheck: 2026-10-07 17:08 to 18:00 UTC, thread with control, homepage HTML, both screenshots, LinkedIn company HTML and the Blurry caption reopened. Red team cut a claim that survivors had no page for them, the homepage speaks to them. Facts hold, cost is inference, Blurry Works is a live partner, confidence MEDIUM
```

OPENER
```
Hi Orion, saw Omnilabs Research, looks interesting!

However, your site is still set up for the trial stage, one page whose contact form and call link ask about trials and collaboration. This causes the rehab teams you'll want at launch to find no page made for them and nothing to sign up for.

Especially, when you are taking Omnihuman to stroke survivors across the UK, EU and Singapore, the rehab teams you'd likely find and win one at a time slow the whole rollout down.

I run Astra agency. We build websites and AI workflows for brands like Unilever, AXA, Pertamina. I set up the sales workflows at Betty Blocks that found, scored and followed up accounts, so I know how to build a launch pipeline of rehab teams.

Shall I send you over what the rehab team launch site and AI workflow looks like?
```

Red team, see /tmp/claude-0/agents/b14_B/orion.md. Every fact reopened today, the survivors claim cut, Blurry Works flagged.

### Dan Waterfall-Chapman, Utee, ctc_eGXerDBzTghqprWZh

OPENER. Raka's angle, a site for the raise plus an AI workflow for investors. Confidence MEDIUM, he builds the shop and portal himself, so a page is within his reach.

```gate
lead: Dan Waterfall-Chapman, director and 25 to 50% PSC of UTEE LTD 17107724 since 22 Mar 2026, co-founder with Antonia Waterfall (director, 25 to 50% PSC), ctc_eGXerDBzTghqprWZh, leadId lea_2LeGW9oFa5JbuBd5Y, tagline "Co-Founder @ Extracted/Utee/Downstairs". Thread 0 items, nextPage null, control 2 items same minute, accepted 2026-10-05 06:46 UTC per the activities endpoint. His wife Toni ctc_eXoacmGafyyZjqQzJ also accepted our note, message one of them only
site pass 1: 7 URLs by tools/crawl.py on https://myutee.com/ , the password page plus fonts and system paths, full text read
site pass 2: 7 URLs, second crawl equal, site-audit.js desktop screenshot opened, Shopify stock Opening soon page, plus https://extracted.co.uk/products/utee where the supplement sells today
deep analysis: Utee is a supplement range already sold on Extracted plus a home UTI testing service launching next year, with a clinic and lab portal he is building himself. The articles adopted 7 Sep set up an SEIS then EIS initial investment round with authority for 995,000 new shares, and their own one pager has an investor section. Yet Utee's own address is Shopify's default Opening soon page with an email box, nothing about Cherry Healey, the products or the testing service
owner linkedin: same person as the contact. Route 1 curl /in/dan-waterfall-chapman-62170832 999. Route 2 search "Dan Waterfall-Chapman" Utee, no profile result. Route 3 posts search, nothing. Route 4 the Companies House officers and PSC pages. Route 5 company page https://www.linkedin.com/company/myutee via social-audit.js, walled, UNKNOWN. Route 6 lemlist summary, "growing Extracted ... co-founded with my wife", NutraIngredients 2025-06-10 and 2026-02-03 for his own words
contact linkedin: same person as owner, register, lemlist and NutraIngredients agree
google news: tools/news.py en, "Utee" 17 (Daily Mail 2026-05-29, NutraIngredients 2026-02-03 relevant), "Dan Waterfall-Chapman" 1, control Tesco 103
regional news: tools/news.py (Bath OR Bristol OR UK) SEIS startup investment with UTI test, 1, a 2019 TestCard raise, nothing local
industry news: tools/news.py UTI test women's health startup, 51, Capital F $17M women's health fund (Femtech Insider 2026-08-26), plus https://med-techinsights.com on Utee's test launching next year
sources:
1. https://myutee.com/
2. https://extracted.co.uk/products/utee
3. https://find-and-update.company-information.service.gov.uk/company/17107724/officers
4. https://find-and-update.company-information.service.gov.uk/company/17107724/persons-with-significant-control
5. https://find-and-update.company-information.service.gov.uk/company/17107724/filing-history
6. https://med-techinsights.com/2026/09/29/it-has-taken-too-long-the-singular-anomaly-around-medtech-innovation-investment/
7. https://www.nutraingredients.com/Article/2026/02/03/startups-uti-innovation-delivers-critical-prevention-missing-from-healthcare
8. https://github.com/ExtractedFSD/Utee
9. https://www.instagram.com/extracted.co.uk/
10. https://www.linkedin.com/company/myutee (walled)
11. https://www.linkedin.com/in/dan-waterfall-chapman-62170832 (999)
12. https://news.google.com/rss (tools/news.py)
pains: 3 judged. (1) investor site plus AI workflow that finds and approaches the angels for the SEIS then EIS round, CHOSEN. (2) AI workflow for retail partners and early customers, real but Extracted already runs a strong in house audience. (3) pre launch shop build, the prior red team KILL holds, he builds it himself
chosen: (1), biggest and hottest, the round funds the testing launch next year and the articles were adopted a month ago, while the only public Utee address shows an email box
sweep website: https://myutee.com/ is Shopify's stock Opening soon page per crawl.py and site-audit.js screenshot, the shop is his own build, CHOSEN only as the investor facing page
sweep gdpr: site-audit.js GEO VOID on myutee.com (Shopify banner code), prior eu-view.py on extracted.co.uk found ad cookies before consent, a settings fix, favour only
sweep apps: he codes the testing portal himself per https://github.com/ExtractedFSD/Utee commits to 6 Oct, investor outreach has no visible tool, CHOSEN as the workflow half
sweep social: tools/social-audit.js opened https://www.instagram.com/extracted.co.uk/ 12,848 followers newest 2026-10-06, the Utee LinkedIn walled, not chosen, run well in house
sweep squad: two founders shipping a portal daily with an AI coding agent per https://github.com/ExtractedFSD/Utee , no capacity gap, not chosen
thread: problem Utee's own address shows an email box and nothing about the brand to investors | cost the investors needed for next year's testing launch check that page first | offer the Utee investor site and AI workflow that finds the right investors | link investor, Utee
lead read: Dan reads that investors who type in Utee's address get Shopify's Opening soon box and nothing on Cherry Healey or the testing service, which matters as he takes Utee to a testing launch next year, and gets offered the Utee investor site and AI workflow, one thread
claims:
your Utee site shows Shopify's stock Opening soon page with one email box, https://myutee.com/ 302 to /password, "Opening soon, Sign up for our newsletter to be the first to know when we launch", "This shop will be powered by Shopify", screenshot opened 2026-10-07
nothing about Cherry Healey, the supplements or the testing service on Utee's own address, the password page HTML has none of them, while https://extracted.co.uk/products/utee names Cherry Healey 8 times (control that the word is findable)
taking Utee from supplements to a full testing service next year, https://med-techinsights.com/2026/09/29/it-has-taken-too-long-the-singular-anomaly-around-medtech-innovation-investment/ "home UTI test under their Utee brand, will launch next year with Llusern Scientific", supplements on https://extracted.co.uk/products/utee
INFERENCE, investors likely check the page first, clues SEIS/EIS initial investment round in the articles adopted 7 Sep 2026 (https://find-and-update.company-information.service.gov.uk/company/17107724/filing-history), allotment authority 995,000 shares, investor section in their own one pager
Betty Blocks credential, docs/astra-master-context.md section 2A, "ICP segmentation, account selection, messaging and multi-channel outreach", https://www.linkedin.com/in/raka-mulya-b92885196
recheck: 2026-10-07 17:08 to 18:00 UTC, thread with control, myutee.com curl and screenshot, Extracted product page, filings rendered and read, med-techinsights reopened. Red team cut Professor Bob Yang (register and repo only, would reveal the filings). Facts hold, investor behaviour is inference, the tweak risk is flagged, confidence MEDIUM
```

OPENER
```
Hi Dan, saw Utee, looks interesting!

However, your Utee site still shows Shopify's stock Opening soon page with one email box. This causes investors who type in Utee's own address to find nothing about Cherry Healey, the supplements or the testing service.

Especially, when you are taking Utee from supplements to a full testing service next year, the investors you'll need are likely to check that page before anything else.

I run Astra agency. We build websites and AI workflows for brands like Unilever, AXA, Pertamina. I ran account selection and outreach at Betty Blocks, and finding the right investors for Utee works the same way.

Shall I send you over what the Utee investor site and AI workflow looks like?
```

Red team, see /tmp/claude-0/agents/b14_B/dan.md. Every fact reopened today, Bob Yang cut, the round itself never named.
