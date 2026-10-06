# Evidence, Bartek Ogonowski, LEVRA (b7_bartek)

Collected 2026-10-06, 13:50 to 14:20 UTC. Read only. Nothing sent, nothing written to the repo or lemlist.

## STOP FLAGS

- **Thread: NONE.** `get_inbox_conversation(ctc_3fSkB4dv38ScfzXkH)` returned 0 activities, totalItems 0, nextPage null (sync "recent", 13:51:44Z). Positive control in the same session: `ctc_JYWKs8LSRDxAreesA` returned totalItems 10 with a full `linkedinSent` body, so the method reads threads. `sentOnly` search "Bartek Ogonowski" shows 1 conversation, lastSentAt 2026-10-06T05:17:44Z, preview is the connect note ("Hi Bartek, saw your business and thought it was cool 😀 I'm a business owner too! Would love to conn..."), lastRepliedAt null, isYourTurn false. `myConversations` search returned 0. So: connect note only, no opener, no reply. Silent accepted.
- **Owner: YES.** Companies House PSC lists him with 25 to 50% of shares and votes plus the right to appoint directors. Not "former", not "ex".
- **Closed: NO.** LEVRA LIMITED is Active. Last site publish was 29 Sep 2026.
- **Wrong domain: NO.** levra.me names Bartek Ogonowski as Co-Founder and CEO on /about-us and lists bartek@levra.me in the footer.
- **They sell AI.** Their product is GenAI simulations running on OpenAI models (/responsible-ai). So angle A can't be "an AI training or simulation tool". It has to be a back office job.

## Thread

None beyond the connect note, see above. Accepted 2026-10-06 10:25 UTC (lastActivityAt 10:25:54Z).

## Record (search_campaign_leads id=lea_SoDNEmLZ3cyjSE7Hw)

- Campaign `cam_Csq9BikBWz7dNqSs4` "founders: new businesses with marketing hires", running, status inProgress, sender raka@astraagency.nl.
- jobTitle "Co-Founder and CEO". tagline "Co-Founder and CEO - LEVRA || EdTech || Oxford MBA || CA (SA) || SAICA Top 35-Under-35". companyName LEVRA, companyDomain levra.me, founded 2022, 11-50, location "Wardour Street, United Kingdom", own location City of London. Languages English, Afrikaans.
- summary (his words): "LEVRA has already gained recognition with clients like Deloitte and the University of Oxford and was shortlisted for awards such as The Learning Awards 2025 and EISA Awards 2024." "Before LEVRA, I served as CEO of iTalk2U..." Lists "Shortlisted: EISA Awards 2024 – Best SEIS Investee Company", "Finalist: The Learning Awards 2025", panels, podcasts, LegalGeek speaker, Lyca radio.
- jobDescription: "Graduates, new to the working world, lack Human and Social skills..."
- Reconciliation: the tagline, companyName, jobTitle, domain and statutory record all agree. He owns the business he runs.

## Ownership (statutory, Companies House, opened 14:00 UTC)

- **LEVRA LIMITED 14378761**, https://find-and-update.company-information.service.gov.uk/company/14378761. Incorporated 27 Sep 2022 as SPEAKUP TODAY LIMITED, renamed 15 Nov 2022. Active. SIC 62012, 63110, 70229, 85600. Registered office moved 10 Aug 2026 from 1 Sudbourne Road SW2 to 66 Paul Street EC2A 4NA.
- Officers (/officers): GILL, Emily Clare, director since 27 Sep 2022. OGONOWSKI, Bartek, director since 27 Sep 2022, born Nov 1991, Polish. 0 resignations.
- PSC (/persons-with-significant-control): Bartek Ogonowski and Emily Clare Gill, each 25 to 50% of shares and votes, each with the right to appoint or remove directors.
- **LEVRA OPCO LIMITED 17002855**, a new company incorporated **30 Jan 2026**. Same two directors. PSC is Levra Limited, 75% or more. Registered office moved to 66 Paul Street on 21 Sep 2026. **That's a holdco and opco split this year.** The reason isn't stated. Open question.
- Filing history, capital:
  - SH01 5 Jul 2023, then a second filing on 19 Jul 2023 (capital GBP 1.104311).
  - SH01 9 Oct 2025, replaced on 10 Nov 2025: 25,694 ORDINARY shares, amount paid £3.88 (nominal value only, so probably option or sweat equity, not a raise).
  - SH01 6 Apr 2026: 1,160 B ORDINARY, amount paid £4.31 (nominal).
  - **SH01 25 Aug 2026: 4,925 B ORDINARY, amount paid £21,236** (about £4.31 a share).
  - **SH01 28 Aug 2026: 10,937 B ORDINARY, amount paid £44,441.08** (about £4.06 a share).
  - So about £65.7k in cash came in during the last week of August 2026. Total shares after: 1,000,000 A plus 202,318 B.
- Micro accounts to 30 Sep 2025 (AA filed 27 Nov 2025, PDF pages read as images). Net assets £7,766, against £101,408 in 2024. Current assets £79,551 (2024 £130,192). Accruals and deferred income £44,647. **Average employees including directors 3 (2024 3).** Accountants SJ Accounts Solutions, Norwich. These are judgement inputs only and never go in a message.
- Pre-seed: YouTube oEmbed for gYwyK2Fm5Dc returns the title "Transforming Reality: How LEVRA secured £410k Pre-seed funding", channel Hyper Startup Studio. The page itself redirects to the Google captcha, so only the title was read.
- Tracxn (fetch-walled.py, 200): "Investors Sterling Road", "Employee Count 17 as on Aug 31, 2026", "Levra has 1 institutional investor". Competitors named are Interplay Learning ($47.1M), Yoodli (Series B) and AutoVRse ($2.4M Jun 2026). This is tier G.

## Prior research

grep for "ogonowski", "levra" and ctc_3fSkB4dv38ScfzXkH across state/ and logs/ found only 2 hits, both random base64 inside prototype HTML (toffe-traktaties, that-animation-v2). There's no queue row and no drafted_* entry. No prior verdict exists.

## Website

- Stack: Webflow (data-wf-site 65f2f1ea81688bc3448cb850). "Last Published: Tue Sep 29 2026 15:58:48 GMT", so it's actively maintained.
- **Pass 1:** `tools/crawl.py https://levra.me pass1 --max 150` read 133 URLs, 32 from sitemaps, statuses 200 x129 and 404 x4. That's **33 unique page texts** (www, non-www and http duplicates). **Pass 2:** the same command gave 133 URLs, 33 unique, so it equals pass 1.
- Pages: home, /our-solution, /human-skills-framework, /about-us, /case-studies plus 6 case studies (google, deloitte, aspen, oxford, sbs, grant-thornton), /insights plus 13 blog posts, /faqs, /careers, /contact, /responsible-ai, /privacy-policy, /terms-and-conditions, /cookie-policy, and /old-home, which is a 404.
- site-audit.js (14:04:24Z): 200, webflow, forms 4, inputs 29, img 79. **Render trusted** (assetsOurFault 0, suspectAssets []). 0 page errors. The 2 failed requests are GA beacons through the first party tag path (ours). Egress US, so **GEO VOID**, which is why eu-view was run.
- Screenshots opened:
  - Desktop above the fold: black hero, "There is a growing Human Skills Gap. LEVRA is here to solve it.", one LEARN MORE button, purple CONTACT US top right. Cookiebot bar along the bottom with only "Accept" and "Settings".
  - Phone: the headline fills the screen and the cookie sheet covers the bottom half, again with only Accept and Settings.
  - Full page desktop (Playwright, banner removed): client logo strip (Covington, Milbank, Marriott, Leathwaite, Grant Thornton, Aspen, SBS), "Data-driven Outcomes" (81%, 31%, 82%, 70%), a tablet mockup of the platform (badge "VR star", "© LEVRA 2024"), awards strip, BOOK A DEMO, testimonials, "Recipient of ElevenLabs Startup Grant", footer.
  - The design is modern, dark and spacious. Nothing about it looks 1990s or 2000s.
  - About: 7 people with photos (Bartek CEO, Emily Gill COO, Margaret Curtayne Head of Operations, Abu Salim CTO, Jaewon Han Head of Product, Vivian Full Coaching Coordinator, Gerianne de Klerk Leading Psychometric Expert). "Backed By" shows Innovate UK, University of Oxford, NatWest Accelerator, LawtechUK and Barclays Eagle Labs.
  - Google case study: 88%, 76% and 94% stats, plus a Dom Foley quote ("94% greed" is a typo on the page).
  - No horizontal overflow at 390px (scrollWidth 390 on 5 pages).
- Links checked (rendered anchors, then fetched):
  - Nav: /human-skills-framework, /our-solution, /about-us, /case-studies, /insights, /faqs, /careers, /contact.
  - CTAs: LEARN MORE goes to /our-solution. READ CASE STUDIES goes to /case-studies. BOOK A DEMO goes to /contact. "Start your HSF" goes to https://hsf-new.levra.me/quiz/demo (200, "Human Skills Framework"). DOWNLOAD REPORT is a gated form plus the PDF "LEVRA State of Human Skills Report 2026".
  - Footer: mailto emily@ and bartek@, linkedin.com/company/levra/, the policies.
  - Two buttons, "Read All Case Studies" and "Book a Call", point to https://hsf-demo.levra.me/ (200, "Human Skills Framework Demo"). **Both are hidden** (zero size at 1440 and at 390), so visitors never see them and they aren't a defect.
  - **The logo on all 6 case study pages links to /old-home, which returns HTTP 404 "Oops! Page Not Found".** Verified visible (navbar-brand-2) and counted by curl on each page (1 per page). It's a tweak-level fix.
  - /case-studies/milbank returns 404. Milbank is on the homepage stats and testimonials but has no case study page. Covington, Marriott, Leathwaite, Goodwin and Eternus are logos with no case study.
- What the site says to the buyer:
  - FAQ: "Our pricing follows a per-user, per-module model and is tailored to your organisation's needs. Contact us for a customised quote." "Off-the-shelf content, including 31 ready-to-use modules, can be rolled out within 1 week. For co-created content ... typically take around 1 month." "LEVRA delivers its content through desktops."
  - JSON-LD: "We focus on soft skills training for Gen Z."
  - /our-solution has "Pricing Tiers" with four named tiers and no prices.
- Inconsistencies (DOM, hidden modals, so the visitor path isn't verified):
  - The homepage and case study "Get a Quote" form asks "For your VR session, will you: Lease headsets from us / Bring your own headsets / Plan to purchase headsets". Learners range from 1-20 to 60+. Tiers are "Human Skills Framework / Desktop / Immersive / Human-in-the-loop".
  - The /our-solution quote form uses different tiers (Skills Gap / Standalone Workshops / Platform / Platform + Workshops) and learners from 10-25 to 250+.
  - The FAQ says desktop only.
  - So two different quote forms describe two different product lines (VR era and desktop AI era).
- Insights page header "LEVRA in the news": the newest dated item is 27 May 2025. The two newest posts (Emily in Non-Billable, "Why Human Skills Matter More...") carry no date. The 2026 report launch (LinkedIn, about 1 week ago) has no post on the site.

## GDPR (EU view)

- `tools/eu-view.py https://www.levra.me` (Webbkoll, Stockholm, nothing clicked) found **cookies `_ga` and `_ga_VMS5NTJ0QG` (.levra.me) plus `_cfuvid`**. 82 third party requests to 14 hosts, including **region1.analytics.google.com, stats.g.doubleclick.net and www.googletagmanager.com**.
- Second, independent method (HTML read, home.html):
  - The Google tag (first party path `/g0lnomhfn3mg.../4h0pwx...`) and `gtag('config','G-VMS5NTJ0QG')` sit at bytes 3467 to 4045.
  - GTM-MC9HVB53 comes next.
  - Cookiebot `uc.js` (data-blockingmode="auto") only loads at byte 4369, after both.
  - `gtag('consent'` appears 0 times. No `data-cookieconsent` attribute on any script.
  - So GA runs before the consent tool can block it, and no consent mode default exists.
  - Our US run backs this up: the first GA hit carried `gcd=13l3l3l3l1l1` (consent not set) and only the later hit showed `gcs=G100`.
- Banner, from the screenshot: "By clicking "Accept", you agree to our use of cookies for website functionality and analytics." The buttons are Accept and Settings. **There's no Reject on the first layer.** The site-audit detector said "reject NOT FOUND", and its control found a reject on a synthetic page.
- The cookie policy promises: "You can accept or reject non-essential cookies at any time". It lists _ga and _ga_# as Analytics, 729 days.
- Contrast: /responsible-ai sells data care to buyers ("We have completed a Data Protection Impact Assessment", "ISO 27001 aligned security framework"). Their buyers (Google, Deloitte, Milbank, Oxford, and the government contract they want) run vendor due diligence.
- Caveat: eu-view can't see whether the banner is visible. The cookie and request list is what's evidence.

## Social

- Social URLs in their own HTML: only https://www.linkedin.com/company/levra (plus the JSON-LD sameAs). No Instagram, X, YouTube or TikTok links.
- `social-audit.js --urls https://www.linkedin.com/company/levra/`: "followers 3,611", "Professional Training and Coaching London".
- WebFetch of the company page, posts by age:
  - About 1 week ago: State of Human Skills 2026 Report launched (about 3,400 observations, 10 industries).
  - 2 weeks ago: report teaser.
  - 1 month ago: post on EY's $100M Human Skills rewards.
  - 1 month ago: "Hosted 6 interns over summer supporting data collection, presentations, product development, and marketing".
  - 2 months ago: Innovate UK Women in Innovation, "one of 61 winners from 1,696 applications", for "the world's first Human Skills Benchmark".
  - 2 months ago: Oxford Summer School workshops.
  - 2 months ago: Ravensbourne University MSc Data Science analysing 3 years of learner data.
- No job listings. The channel is active (weekly). There's no social angle.

## News

- `tools/news.py --company LEVRA --person "Bartek Ogonowski" --region "(London)" --industry "edtech soft skills training" --lang en`. Control "Tesco": 102 results.
  - Company: 43 results, all unrelated "Levra" (Allsteel Levra chair, Craig Levra of Pride Industries, obituaries).
  - Person: 2 results, both unrelated (a Liverpool fan piece, a 2022 MBA tournament).
  - Regional: 4 results, none on LEVRA.
  - Industry: 55 results, generic (EdTech Magazine 2026-02-20 "How VR and AI Improve Soft Skills Development").
  - **Google News has no LEVRA coverage.**
- Opened at source:
  - **Legal Futures, 10 Aug 2026**, "Female legal innovators land £75,000 each". Gill got the full £75,000 Women in Innovation award plus 12 months of support. "**LEVRA is targeting £1.6m in revenue and 7,625 users by its 2027 financial year, and is looking for its first government contract.**" It also says "the world's first 'Fitbit' for human skills" and lists clients "Google, Deloitte, US law firms Milbank, Covington and Goodwin, as well as Oxford University". https://www.legalfutures.co.uk/latest-news/female-legal-innovators-land-75000-each
  - **Onrec, 21 May 2025**, Bartek quoted: "Human Skills are what make us human ... Yet in most workplaces, they're treated as intangible nice-to-haves, not measurable business drivers." https://www.onrec.com/news/news-archive/gen-z-in-the-workplace-late-to-the-office-questioning-hierarchy-and-hungry-for
    - SAICA Top 35 profile: Deloitte Johannesburg from 2016, Africa brand ambassador 2019, iTalk2U CEO 2021.

## LinkedIn routes (owner and contact are the same person, confirmed by CH PSC plus lemlist jobTitle plus /about-us)

1. curl https://www.linkedin.com/in/bartekogonowski/ returned **999**.
2. Search "LEVRA human skills Bartek Ogonowski 2026": the result title "Bartek Ogonowski - LEVRA" (tier G).
3. Search "linkedin.com/posts bartekogonowski LEVRA": no personal posts surfaced.
4. People data: the Tracxn team list calls Bartek and Emily "Co-Founder & Co-CEO" (tier G, conflicts with the site's CEO/COO; the site wins).
5. Company page posts read through WebFetch, see Social.
6. His own words: the levra.me interview of 10 May 2023 (below), the Onrec quote, the Medium "Founder Spotlight" by ashrust (**walled**: 403 to WebFetch, Cloudflare "Just a moment" to fetch-walled, and not in the RSS feed), and YouTube (captcha, oEmbed title only).

**His own words on his time** (levra.me/blog-posts/meet-levra-co-founder-bartek-ogonowski, 10 May 2023):
- "Our networks have been key to developing customer and investor relations."
- "we reached out to over 100 law firms (both cold and warm leads) ... Our initial meeting rate was 40% (!) ... the next step was to set up in person demo days and then negotiate our first paid pilots."
- "**Time is your most valuable resource. Be careful to not overcommit your time — it waits for no one!**"
- "coming from 7 years of auditing ... to a founder and 'taking' all the risks".

The lemlist summary lists his panels, articles, podcasts, radio and LegalGeek talks, so speaking and content are a real part of his week.

## Capacity and growth

- Team page 7. Payroll average 3 (FY to Sep 2025, statutory). LinkedIn 11-50. Tracxn 17 (Aug 2026). 6 summer interns 2026.
- Careers: "We are a fast growing EdTech company ... Drop us an email with your CV below. hello@levra.me". No vacancies.
- Money in:
  - £410k pre-seed (video title).
  - SEIS (EISA shortlist).
  - Innovate UK £75k (Aug 2026).
  - About £65.7k of share allotments (25 and 28 Aug 2026).
  - ElevenLabs Startup Grant (homepage).
- Structure: new opco (Jan 2026) and a new office at 66 Paul Street (Aug and Sep 2026).
- Target: £1.6m revenue and 7,625 users by FY2027, plus the first government contract (Legal Futures).
- Delivery: 1 week off the shelf, about 1 month co-created.
- Research output: an annual report (2025: "three months of research, capturing over 2,700 data points"; 2026: about 3,400 observations). They used an MSc cohort to analyse the data.

## Process

- Buying: "Contact us for a customised quote", per user per module, with no published prices.
  - Contact form: 8 required fields.
  - Two different quote modals with different tier lists.
  - Report download gated by name, organisation and email.
  - Demo bookings go to /contact (a form, no calendar link).
- Delivery: each client gets an HSF baseline, personalised modules, simulations, "a detailed report for each module" and "a full one-time feedback report". "We track learners' soft skills development ... to accurately determine skills improvement and the impact on your business." Case studies are built from client stats.
- Moderation: "If something is flagged, authorised LEVRA team members will be made aware to review".
- Co-creation: "working closely with your team to identify key skill gaps, define learning objectives, and design personalised scenarios".
- What they already run: the HSF quiz app (hsf-new.levra.me), the learner portal, OpenAI simulations, Azure, Cookiebot, GTM, GA4, Webflow, reCAPTCHA, Finsweet. No CRM or booking tool is visible on the site.

## Candidate pains per angle, with disproof attempts

**1. Website holding back growth (B)**
- a) **The site is pitched at Gen Z trainees in firms, and the stated next buyer is government.** Quotes: JSON-LD "We focus on soft skills training for Gen Z", FAQ "LEVRA specialises in Human Skills (or 'soft skills') for young people", against Legal Futures (10 Aug 2026) "looking for its first government contract", and a target of 7,625 users by FY2027.
  - Disproof: grepped all 33 page texts.
    - "government" hit 3 pages: the House of Lords inquiry post, Emily's 2023 profile post and the 2023 apprenticeship post. None is a buyer page.
    - "levy" hit 1 page, the apprenticeship post.
    - "public sector", "council", "NHS", "civil service" and "bootcamp" hit 0 pages.
    - Positive control: the same grep finds "Google" on 4 page texts (logos are images, so they don't count).
  - Risk: the site was published 29 Sep 2026 and is maintained in house in Webflow, so a single page is a tweak.
- b) **Proof is scattered.**
  - Milbank, Covington, Goodwin, Marriott, Leathwaite and Eternus appear as logos or testimonials with no case study (/case-studies/milbank returns 404).
  - "LEVRA in the news" leads with May 2025.
  - The 2026 report and the Innovate UK award (Aug 2026) aren't on the site.
  - Disproof: the 2026 report PDF IS linked in the nav dropdown, and awards show as a logo strip. That's moderate, not absent.
- c) Two quote forms describing VR headsets against desktop only (hidden modals, path unverified). The logo on all 6 case studies goes to a 404. Tiny, proof only.
- Era: modern Webflow, so it fails the "looks like 2000" test. No WordPress. Certificate valid to 29 Nov 2026.

**2. GDPR (EU view), signal 1 of the four**
- **Google Analytics cookies set before any click for an EU visitor, with no Reject button on the first layer**, while the cookie policy promises "accept or reject". The vendor sells data safety to enterprise and government buyers (/responsible-ai DPIA, ISO 27001 aligned).
- Evidence: eu-view (Stockholm) cookie list, plus the HTML script order with zero consent defaults. That's two methods with different failure modes.
- Disproof: looked for consent mode (`gtag('consent'`) and found 0. Looked for data-cookieconsent on scripts and found 0. Cookiebot auto blocking can't stop scripts that run before it loads.
- Positive control: eu-view lists Cookiebot's own hosts and cookies, so it does see third parties.
- UK GDPR / PECR applies (UK company, London visitors). The ICO expects reject to be as easy as accept.
- Tweak risk: moving the script order is an afternoon. It's the proof, not the pitch.

**3. Apps and internal tools (A, back office only)**
- a) **Bid and tender workflow for the first government contract.** "looking for its first government contract" (Legal Futures, 10 Aug 2026), with a payroll of 3 (accounts FY25). Public tenders are document heavy.
  - Disproof: no bid team or tender page on the site. No job ads. Nothing names a bid tool. Can't prove they aren't using one.
- b) **Quotes, proposals and pilot reports by hand per client.** "Contact us for a customised quote", per user per module. Two quote forms, a report per module, a final report per learner, ROI tracking per client. At 7,625 users targeted, that's volume on a team of 3 to 7.
  - Disproof: their platform may already generate learner reports (FAQ "receiving a detailed report for each module"). So learner reports are likely automated. Client proposals and ROI case write-ups have no automation in evidence.
- c) Research and report production (2,700 then 3,400 data points, MSc students doing the analysis, "three months of research"). An AI analysis workflow could shorten that. The risk is that it's their data science core.
- Excluded: any AI simulation, coaching or assessment tool. They build and sell those.

**4. Social**
- LinkedIn is active weekly with 3,611 followers, and no other channels are linked. Their buyers (L&D, HR) live on LinkedIn. **No pain.**

**5. Build Squad**
- Funded startup with a product team of CTO plus Head of Product. Payroll 3, 17 on LinkedIn, 6 interns. Product lines: HSF app, portal, simulations, co-created modules (about 1 month each), a benchmark (Innovate UK project).
  - Disproof: no vacancies, no outsourcing or partner page. The 2025 raise is about £65k, so build budget is thin.
  - Candidate: the "Human Skills Benchmark" build named in the Innovate UK award. Medium.

**Personal CEO workflow (Raka 2026-10-06 fallback)**
- His week, per his own sources: sales by outreach and demos ("reached out to over 100 law firms", demo days, pilots), investor relations ("customer and investor relations"; four share allotments Oct 2025 to Aug 2026, plus the new opco), speaking, podcasts and articles (summary list), report launch events (breakfast events May 2025 and Nov 2024), and the government contract push.
- His own line: "Time is your most valuable resource. Be careful to not overcommit your time".
- Candidate: an AI workflow for investor updates and pipeline follow up after events and talks.
- Disproof: no tool named anywhere. It's 2023 advice, so it's dated.

## Source list (opened this session)

1. lemlist get_inbox_conversation ctc_3fSkB4dv38ScfzXkH, plus control ctc_JYWKs8LSRDxAreesA
2. lemlist get_inbox_conversations sentOnly and myConversations
3. lemlist search_campaign_leads lea_SoDNEmLZ3cyjSE7Hw
4. https://find-and-update.company-information.service.gov.uk/company/14378761 (+ /officers, /persons-with-significant-control, /filing-history, SH01 PDFs 2026-08-28, 2026-08-25, 2026-04-06, 2025-10-09 replacement, AA 2025)
5. https://find-and-update.company-information.service.gov.uk/company/17002855 (+ officers, PSC, filing history)
6. https://www.levra.me/ and 32 more pages, crawled twice
7. https://hsf-new.levra.me/quiz/demo and https://hsf-demo.levra.me/
8. https://webbkoll.5july.net (eu-view)
9. https://www.linkedin.com/company/levra/ (social-audit plus WebFetch)
10. https://www.legalfutures.co.uk/latest-news/female-legal-innovators-land-75000-each
11. https://www.onrec.com/news/news-archive/gen-z-in-the-workplace-late-to-the-office-questioning-hierarchy-and-hungry-for
12. https://tracxn.com/d/companies/levra/__PjQJ5HcvbL2BZKrJYHf__678Wnrl7Nhi6gVjLsYaLNQ (fetch-walled)
13. https://www.youtube.com/oembed?url=...gYwyK2Fm5Dc (title only)
14. https://rss.com/podcasts/psycheofsales/1495823/
15. https://www.top35-under-35.saicaevents.co.za/wp/dt_team/bartek-ogonowski/
16. news.google.com RSS via tools/news.py (5 queries plus control)

Walled: ashrust.medium.com (403 and Cloudflare), the YouTube watch page (captcha), web.archive.org CDX (connection reset 4 times while the example.com control returned 200 in the same minute), and linkedin.com/in (999).

## Open questions

- Why was LEVRA OPCO LIMITED formed in Jan 2026: a fundraise prep, IP holdco, or something else? Who's employed where?
- Do they already use a CRM, proposal or bid tool? Nothing is visible.
- Is the homepage VR quote modal reachable by any visible button? Not click-tested.
- When was the site last redesigned? Wayback is walled from here.
- Certificate (curl -v, 14:20Z): CN=www.levra.me, issuer Google Trust Services WE1, expires 29 Nov 2026, "SSL certificate verify ok". There's no certificate signal. WordPress is ruled out (Webflow). Era is modern. Of the four signals, only GDPR is present.
