# BidX go to market research, demand signals, data sources and timing

Researched 21 October 2026, read only. Nobody was contacted and nothing was signed up for. Every source below was opened on 21 October 2026 unless stated.

Labels
- **VERIFIED** means I opened the primary source today and read the statement or the data myself. Where a number is a count I computed from an official file, it says "computed" and the method is in the appendix.
- **CLAIMED** means a source says it, but the source is a vendor, a third party, a law firm, or a self interested party, or I could only reach a secondary copy.
- **INFERRED** means my own reasoning or arithmetic on top of verified data.

Raw files and scripts used for every computed figure are in `/tmp/claude-0/-home-user-astra-agency/3eb57ba4-cf6b-5d03-9c5f-6f974020ac75/scratchpad/gtm-research/raw/` and the `.py` files beside this document.

---

## 1. Data sources, access, cost and limits

### 1A. Summary table

| Source | What it gives BidX | Cost | API or bulk | Limits and freshness | Label |
|---|---|---|---|---|---|
| Innovate UK funded projects spreadsheet (UKRI) | Every Innovate UK award since 2004, with company number (CRN), enterprise size, competition, project start and end date, grant offered, postcode | Free | Bulk xlsx (23 MB for 2016/17 onward) | Updated roughly monthly, last 12 Oct 2026. No contact names or emails | VERIFIED |
| UKRI Gateway to Research (GtR) | Funded projects across UKRI with abstracts, fund start and end, organisations, people | Free | JSON API, no key | Live API reported `lastRefreshDate` 06 Jul 2026 today, so the October refresh had not landed | VERIFIED |
| Companies House REST API | Company profile, SIC codes, officers, filing history, PSCs, advanced search by SIC and incorporation date | Free (registration and API key) | REST | 600 requests per 5 minutes, then 429 for the rest of the window | VERIFIED |
| Companies House Streaming API | Real time push of company, filing history, officers, PSC, charges, insolvency changes | Free (registration and key) | Long lived HTTP stream | Max 2 concurrent connections per account | VERIFIED |
| Companies House Free Company Data Product | Snapshot of every live company with up to 4 SIC codes and incorporation date | Free | Bulk CSV zip (471 MB as one file) | Monthly, within 5 working days of month end | VERIFIED |
| Innovation Funding Service (IFS) competition listing | Every open Innovate UK competition with open and close date, eligibility, briefing date, stated odds, questions | Free, OGL v3.0 | No API, HTML is easy to parse | Changes daily (31 calls on 20 Oct, 28 today) | VERIFIED |
| Innovate UK Business Connect opportunities list | Second independent listing of the same calls with dates | Free | HTML | | VERIFIED |
| EIC Accelerator page | Cut off and batching dates, UK eligibility | Free | HTML | | VERIFIED |
| HMRC EIS and SEIS statistics | Counts of companies raising under SEIS and EIS each year | Free | Statistics release | Annual, no company names | VERIFIED |
| Companies House SH01 filings (via stream or filing history) | A company allotted new shares, which is the public footprint of a raise | Free | Streaming API filing history | Must be filed within one month of allotment | VERIFIED |
| Beauhurst | UK private company data incl. announced and unannounced equity funding, accelerator attendances, innovation grants, academic spinouts | Paid, price on request, no free trial | Platform plus API and CRM integrations | Says it is "not a contact database" | VERIFIED (page), price not published |
| Crunchbase | Global funding rounds and companies | Pro reported at $49 a month annual or $99 monthly, Business $199 a month, API on Enterprise only | Enterprise API | Enterprise API 200 requests per minute, 3 concurrent | Limits VERIFIED, prices CLAIMED |
| Dealroom | Funding rounds and company data | Premium €250 per seat per month, Premium Plus €325, Enterprise custom, API is a paid add on priced by call volume | API add on | 3 day free trial | VERIFIED |
| Accelerator and venture builder portfolios (EF, Founders Factory, Carbon13, Techstars London) | Named companies and often founders | Free | HTML, some JS rendered | Irregular | VERIFIED (pages exist and list companies) |
| Hiring signals (lemlist Signal Agents, Adzuna API) | Companies hiring for given roles | lemlist hiring signal costs 100 credits per company identified. Adzuna free key is for evaluation only, lead generation needs a written licence | API | | VERIFIED |

### 1B. Detail and evidence

**Innovate UK funded projects (past winners).** VERIFIED.
- Page https://www.ukri.org/publications/innovate-uk-funded-projects-since-2004/ , "Last updated 12 October 2026". Quote "The data shared on this page shows public funds awarded by Innovate UK and covers grants awarded since 2004." Quote "These proposals have succeeded in the assessment stage of this competition. All are subject to grant offer and conditions being met."
- Update history on the same page shows data updates on 12 Oct, 3 Sep, 10 Aug, 6 Jul, 9 Jun, 28 May, 7 Apr, 3 Mar 2026, so roughly monthly.
- File https://www.ukri.org/wp-content/uploads/2022/03/IUK-121026-FundedProjectsFinancialYear2016To2017ToPresent.xlsx , downloaded today (23,937,336 bytes). 47,215 participant rows. Columns include Competition Title, Participant Name, Is Lead Participant, CRN, Project Start Date, Project End Date, Award Offered (£), Project Status, Enterprise Size, Postcode.
- The CRN column joins straight to Companies House. 25,909 of 27,218 SME rows carry a valid looking company number (95%). Computed.
- No names, emails or phone numbers. Contact names come from Companies House officers and then LinkedIn. INFERRED.

**Can unsuccessful applicants be found anywhere?** No public list exists. VERIFIED in part, INFERRED in part.
- UKRI publishes only successful projects (page above, "These proposals have succeeded in the assessment stage"). VERIFIED.
- UKRI FOI response 2019.0075, https://www.ukri.org/wp-content/uploads/2020/10/UKRI-FOI-2019.0075-Response.pdf , opened today, quote "Under Section 41 of the FOIA, information provided in confidence, we are exempting the information regarding full bid information" and "companies apply to Innovate UK in confidence and with the expectation that their bid information, including their application, feedback and scoring data will be kept in confidence." It also cites Section 43 (commercial interests). VERIFIED.
- The only public trace of unsuccessful applicants is aggregate, for example the Smart grants evaluation counts 20,487 declined applications (see section 2). VERIFIED.
- A workable proxy is timing. Every IFS competition page publishes its "Applicants notified" date (section 3), so BidX knows the day a batch of firms got a no and feedback. INFERRED.

**Gateway to Research.** VERIFIED.
- https://gtr.ukri.org/resources/about.html , quote "GtR publishes award data quarterly and is scheduled to update the second week of April, July, October and January." Quote "This website is open and free for all to use."
- API endpoints, https://gtr.ukri.org/resources/api.html , quote "Projects endpoint - is now at https://gtr.ukri.org/ api /projects".
- Tested live today. `GET https://gtr.ukri.org/api/projects` with `Accept: application/json` returned 200 and project records with `fund.start`, `fund.end`, `fund.funder`, `grantCategory`, `status`. The versioned Accept header `application/vnd.rcuk.gtr.json-v7` returned 406. The search endpoint `api/search/project?term=Innovate UK` returned `totalResults` 51,528. Response header field `lastRefreshDate` was "06 Jul 2026".
- For Innovate UK winners the funded projects spreadsheet is the better source, because it carries CRN and enterprise size. INFERRED.

**Companies House API, stream and bulk.** VERIFIED.
- REST API, https://developer.company-information.service.gov.uk/ , quote "The data returned is live and real-time".
- Rate limit, https://developer.company-information.service.gov.uk/developer-guidelines , quote "You can make up to 600 requests within a 5 minute period. If you exceed this limit, you will receive a 429 Too Many Requests HTTP status code for each request made within the rest of the 5 minute time frame." Higher limits on request, quote "If you have an application that requires a higher rate limit than this default, contact us."
- Advanced company search, https://developer-specs.company-information.service.gov.uk/companies-house-public-data-api/reference/search/advanced-company-search , has `incorporated_from`, `sic_codes`, `company_status` filters and `size` "with a range of 1 to 5000".
- Streaming API, https://developer-specs.company-information.service.gov.uk/streaming-api/guides/overview , quote "The Companies House streaming API gives you access to realtime data changes of the information held at Companies House." Streams exist for company information, filing history, insolvency, charges, officers, PSCs, disqualified officers, exemptions. Quote "A maximum of two concurrent connections per-account can be made to the streaming API."
- Cost. The developer pages require a free account and key but do not print a price. The Companies House blog launching the stream, https://companieshouse.blog.gov.uk/2019/10/24/launching-our-streaming-api-service-for-company-data/ (24 Oct 2019), says the service exists "to provide the public with free and easy access to company data" and mentions "removing the previous payment barrier". VERIFIED that it is free to access.
- Bulk, https://download.companieshouse.gov.uk/en_output.html , quote "This snapshot is provided free of charge and will not be supported." Quote "The latest snapshot will be updated within 5 working days of the previous month end." File today `BasicCompanyDataAsOneFile-2026-10-01.zip (471Mb)`. I downloaded it (493,990,184 bytes, 5,704,711 rows).
- Computed from the 1 Oct 2026 snapshot. Companies incorporated 1 Oct 2025 to 30 Sep 2026 and still live: 771,499. Of those, with SIC 72110 or 72190 (R&D in biotech or other natural sciences and engineering): 4,080, about 340 a month, about 11 a calendar day. With software SICs (62011, 62012, 62090, 58290): 57,025. With engineering, hardware or pharma SICs (71121, 71122, 71129, 26110, 26200, 26511, 26701, 30300, 21100, 21200, 27900, 28990, 32500): 14,415. Any of these: 72,524.

**SH01 as the public footprint of a raise.** VERIFIED.
- Form page https://www.gov.uk/government/publications/return-of-allotment-of-shares-sh01 , quote "Use this form to give notice of shares allotted following incorporation."
- Companies Act 2006 s555, https://www.legislation.gov.uk/ukpga/2006/46/section/555 , quote "The company must, within one month of making an allotment of shares, deliver to the registrar for registration a return of the allotment."
- So an SH01 on the filing history stream is a free, near real time raise signal, lagging the raise by up to a month. It does not show the amount raised directly in the stream event (the form carries share numbers and prices, so the amount can be derived from the document). INFERRED for the amount part.

**HMRC SEIS and EIS statistics.** VERIFIED. https://www.gov.uk/government/statistics/enterprise-investment-scheme-and-seed-enterprise-investment-scheme-may-2026/enterprise-investment-scheme-and-seed-enterprise-investment-scheme-2026
- Quote "In 2024 to 2025, 2,430 companies raised a total of £276 million of funds under the SEIS scheme."
- Quote "Around 1,775 of the companies were raising funds under the SEIS scheme for the first time in 2024 to 2025".
- Quote "In the tax year 2024 to 2025, 3,735 companies raised a total of £1,575 million of funds under the EIS scheme."
- Quote "In 2025 to 2026, 4,085 AAR applications for SEIS were received and 3,090 (76%) have been approved so far."
- No company names. Advance assurance is private between HMRC and the company. INFERRED.

**Beauhurst.** VERIFIED for features, price not published.
- https://www.beauhurst.com/pricing/ , quote "Our pricing is dependent on a number of factors including your data requirements, number of users, integration needs and length of commitment." Quote "We don’t offer free trials." Quote "Beauhurst is not a contact database."
- https://www.beauhurst.com/our-data/ lists datasets including "Announced equity funding", "Unannounced equity funding", "Accelerator attendances", "Innovation grants", "Academic spinouts".
- https://www.beauhurst.com/api/ , API and CRM integrations and an MCP connector exist.

**Crunchbase.** Limits VERIFIED, prices CLAIMED.
- https://data.crunchbase.com/docs/using-the-api , quote "API access is available through the Crunchbase sales team." Quote "Request rate 200 requests per minute per key", "Concurrency 3 requests in progress at the same time per key".
- The official pricing page https://www.crunchbase.com/buy/select-product rendered no prices to curl or WebFetch (JS only). Third party, https://syncgtm.com/blog/crunchbase-pro-review-2026 (updated 30 Sep 2026, a competitor's blog), says Pro "$49/mo" annual, "$99/mo" monthly, "2,000 row exports/mo", Business "$199/mo", "No API on Pro or Business standard plans". CLAIMED.

**Dealroom.** VERIFIED. https://dealroom.co/pricing (curl got 403, WebFetch read it). Premium "€250 per seat / month", Premium Plus "€325 per seat / month", Enterprise custom. API is an add on priced on call volume.

**Accelerator, venture builder and incubator lists.** VERIFIED that these pages exist and name companies.
- Entrepreneur First, https://www.joinef.com/companies/ , portfolio filterable by Location (London listed), Industry, Year, Stage. The static HTML loads 24 tiles, the rest load by script, so scraping needs a rendered browser. VERIFIED.
- Techstars London, https://www.techstars.com/accelerators/london , shows "Aug 24 2026 Applications Open", "Nov 18 2026 Final Deadline", "Mar 08 2027 Accelerator Starts", "Jun 03 2027 Demo Day", with "Latest Class" and "Past Companies" tabs. VERIFIED.
- Founders Factory, https://foundersfactory.com/portfolio , quote "500+ companies in 5 continents", filter by sector, location and investment type. VERIFIED.
- Carbon13, https://www.carbonthirteen.com/our-portfolio , lists each venture with founder names and roles (for example Kestrix, "Lucy Lyons, CEO"). Home page quote "Investing in over 100 climate-tech start-ups since 2021". Note carbon13.com redirects to a parked lander, the real domain is carbonthirteen.com. VERIFIED.
- SETsquared, https://www.setsquared.co.uk/ , has a case studies page but I found no member directory in its navigation. VERIFIED that none is linked from the home page. I did not prove one does not exist elsewhere.
- Catapults, https://catapult.org.uk/ describes the Innovate UK Catapult Network. Digital Catapult, https://www.digicatapult.org.uk/ , lists programmes such as "Applied AI Growth Programme, delivered by Digital Catapult and funded by Innovate UK" and names cohort participants in news items. VERIFIED. No consolidated cohort database exists across Catapults that I found.
- University spinout offices. Oxford Science Enterprises and Cambridge Enterprise were refused by this session's egress proxy, so I could not open them. The Royal Academy of Engineering spinout report page, https://www.raeng.org.uk/publications/reports/spotlight-on-spinouts-uk-academic-spinout-trends , is the 2021 first edition (quote "Grants are becoming increasingly important as sources of funds for spinouts"). Beauhurst sells the spinout dataset (above).
- Innovate UK Investor Partnerships publish a pool of approved lead investors (the Engineering Biology Investor Partnerships page says "A full list of selected investor partners is provided at Innovate UK Investor Partners – UKRI"). The portfolios of those investors are a ready made target list for investor partnership calls. VERIFIED that the requirement exists, list itself not opened.

**Hiring signals.** VERIFIED.
- lemlist Signal Agents, https://help.lemlist.com/en/articles/14321798-signal-agents-overview , include "Company is hiring" and "Company raised funds". Hiring agent, https://help.lemlist.com/en/articles/14076885-how-to-create-a-signal-agent-for-tracking-company-hiring , "each company identified costs 100 credits".
- Adzuna API terms, https://developer.adzuna.com/docs/terms_of_service , quote "Any other use, including commercial analysis, resale of data, and sales prospecting or lead generation, requires our written agreement." Quote "Every registered API user receives a free API key immediately ... The free tier is intended for evaluating the API." So hiring data for prospecting from Adzuna needs a paid licence.
- LinkedIn's User Agreement (effective 3 Nov 2025), https://www.linkedin.com/legal/user-agreement , prohibits using "software, devices, scripts, robots ... to scrape or copy the Services, including profiles". So scraping LinkedIn jobs or profiles directly is off limits. VERIFIED.

---

## 2. Signals that predict grant readiness, ranked

The ranking below rests on three computed facts from the official files, then on judgement.

**Fact 1. Past winners win again, a lot.** VERIFIED, computed from the funded projects file (SME participants, withdrawn projects excluded, matched on company number).
- Share of SME winners in a year who had already won at least once since 2017/18. 2022/23 35.6%, 2023/24 43.8%, 2024/25 45.9%, 2025/26 47.0%.
- 13,075 distinct SME companies won since 2017/18. 4,027 of them (30.8%) won in two or more competition years.
- Of SMEs whose first win in the file was in 2022/23, 26.3% won again within two years. For 2021/22 first winners, 30.3% within two years. (Later cohorts are truncated by time.)

**Fact 2. Reapplication is common, and good bids still lose.** VERIFIED from the Ipsos Smart grants evaluation for Innovate UK, published 14 July 2026.
- Technical annex https://www.ukri.org/wp-content/uploads/2026/07/IUK-140726-SmartGrantImpactEvaluationReport-TechnicalAnnex.pdf , quote "Innovate UK supplied records of 23,309 lead applicants (and 3,865 collaborators) for Smart Grant funding submitted between February 2019 and April 2024." Quote "Many firms also submitted multiple applications for funding, and the final sample included details of 17,461 individual businesses." Quote "This left 13,594 lead and 2,788 collaborator applicants relating to 21,782 applications (1,295 successful applications and 20,487 declined applications)."
- INFERRED from those numbers. Roughly 1.6 applications per lead firm (21,782 over 13,594), and a 5.9% win rate per application (1,295 over 21,782). I found no published figure for the exact share of past winners who reapply. The rewin rates in Fact 1 are a floor on reapplication, since reapplying at a 15% to 20% award rate and winning again 26% to 30% of the time within two years implies most past winners who stay active do reapply. That last step is INFERRED.

**Fact 3. Raised equity is the norm among winners.** VERIFIED. Main Smart report https://www.ukri.org/wp-content/uploads/2026/07/IUK-140726-SmartGrantImpactEvaluationReport.pdf , quote "Around 50 percent of firms reported that they had sought investment from VC funds to help finance their R&D project prior to making an application to the programme." Quote "43 percent of firms awarded Smart Grants had secured some form of external equity investment prior to being awarded a grant". Match funding is structural, the Frontier AI SME call pays "up to 70% if you are a micro or small organisation" so the firm funds the rest (https://apply-for-innovation-funding.service.gov.uk/competition/2584/overview/ , VERIFIED). Investor Partnerships go further, quote "The aligned investment led by the investor partner must always be at least twice as much as the grant funding." (https://apply-for-innovation-funding.service.gov.uk/competition/2580/overview/ , VERIFIED).

**Fact 4. SIC code and company age are weak on their own.** VERIFIED, computed by joining SME winners to the 1 Oct 2026 Companies House snapshot.
- Of 5,502 SME companies that won in 2023/24 to 2025/26 and are still live, only 21.1% carry SIC 72110 or 72190. 13.3% carry 62012. The top codes are 72190 (13.4%), 62012 (13.3%), 72110 (8.8%), 62090 (7.3%), 74909 (6.5%), 62020 (6.1%), 71122 (5.5%).
- Company age at first project start, for firms whose first win started on or after April 2023 (n 3,767). Median 4.1 years. 16.7% were under one year old, 31.3% under two, 42.1% under three.

### The ranking

| Rank | Signal | Strength | Why | Volume per year | Label |
|---|---|---|---|---|---|
| 0 (gate, not a score) | An open competition matches their sector and eligibility | Required | Smart grants are closed ("Smart grants are now closed for new applications", https://www.ukri.org/councils/innovate-uk/guidance-for-applicants/guidance-for-specific-funds/ ), and a parliamentary answer of 9 Dec 2025 says "The Smart grants programme has been paused while Innovate UK redesigns its funding programmes" (UK Parliament written question 96113, read via https://questions-statements-api.parliament.uk/api/writtenquestions/questions?uIN=96113 ). All 28 live calls today are thematic. 12 say collaborations only, and KTP must be led by a university, RTO or Catapult. A founder with no matching call cannot apply now, whatever else is true | Depends on the call | VERIFIED |
| 1 | Previous Innovate UK winner, especially with a project ending in the next 3 to 6 months | Strongest | 44% to 47% of recent SME winners had won before (Fact 1). They have proven eligibility, a CRN, an end date and a Monitoring Officer relationship ending. Free, monthly data | 1,001 distinct SME companies have a project with status Live, Final Claim or On Hold ending between 21 Oct 2026 and 21 Apr 2027 (677 are lead participants). 445 end in the next 3 months. 13,075 SME winners since 2017/18 in total | VERIFIED (computed) |
| 2 | Recent equity raise (SEIS, EIS, seed, SH01 filing) | Strong | 43% of Smart winners had raised equity first, around half had sought VC before applying (Fact 3). Grants pay at most 70% for small firms and Investor Partnership calls require investor money of at least twice the grant | 2,430 SEIS companies and 3,735 EIS companies in 2024 to 25 (HMRC). SH01 filings are free on the stream | VERIFIED facts, ranking INFERRED |
| 3 | Joined an accelerator, venture builder, Catapult programme, or is in an Investor Partnership investor's portfolio | Strong for investor partnership calls, moderate otherwise | Cohorts are pre vetted, often recently incorporated, often SEIS backed (Carbon13 invests through SEIS funds per search results, CLAIMED). Investor partnership calls need an approved lead investor | Carbon13 over 100 ventures since 2021, Founders Factory 500+ companies, EF and Techstars London a few cohorts a year | VERIFIED (lists exist), ranking INFERRED |
| 4 | First party intent, reading BidX's grant guides or the call page | Strong but small | Someone reading about a specific open call is self selecting for that call. Only measurable on BidX's own site or via lemlist "Website visitors" signal | Unknown until BidX publishes the guides | INFERRED |
| 5 | New incorporation with R&D heavy SIC code | Weak to moderate | Only 21% of recent SME winners carry 72110 or 72190, and the median first winner is about 4 years old, so most new R&D companies are years from winning. Useful for the 31% who win within two years, and as a nurture list | About 4,080 a year (about 11 a day) with 72110 or 72190, 57,025 with software SICs (noisy, includes many contractors) | VERIFIED (computed), ranking INFERRED |
| 6 | Hiring engineers or scientists | Weak to moderate, noisy | Shows growth and R&D spend, but large firms and agencies hire too. Data costs money (lemlist 100 credits per company, Adzuna needs a licence for lead generation) | Unknown | INFERRED |

A ranking caveat. Signals 1 and 2 overlap with each other, and BidX should score a company higher when two or more stack, for example a past winner whose project ends in Q1 2027 and who filed an SH01 in the last 90 days. INFERRED.

---

## 3. Timing

### 3A. The 28 live competitions on IFS today, 21 October 2026

Pulled from https://apply-for-innovation-funding.service.gov.uk/competition/search (4 pages, header "28 competitions"), then all 28 overview pages opened and their Dates section parsed. VERIFIED. Full table saved at `/tmp/claude-0/-home-user-astra-agency/3eb57ba4-cf6b-5d03-9c5f-6f974020ac75/scratchpad/gtm-research/ifs_timeline_2026-10-21.txt`.

| Competition | Opened | Briefing | Closes | Days open | Notified | Stated odds |
|---|---|---|---|---|---|---|
| Growth Cohorts, low carbon concrete Rd 2 | 21 Oct | 23 Oct | 2 Dec | 42 | 10 Mar 2027 | 20% |
| BridgeAI Deployment Catalyst (3 calls) | 21 Oct | 27 Oct | 8 Dec | 48 | 1 Feb 2027 | not found |
| KTP 2026 to 2027 Rd 4 | 19 Oct | none listed | 27 Jan 2027 | 100 | 25 Mar 2027 | |
| Efficient, Structured and Controllable AI Systems | 12 Oct | 16 Oct | 18 Nov | 37 | 20 Jan 2027 | 4% |
| Full ADOPT Grant Rd 10 | 8 Oct | none listed | 2 Dec | 55 | 6 Jan 2027 | |
| FOAK Builder EOI | 7 Oct | 12 Oct | 5 Nov | 29 | 5 Jan 2027 | 10% |
| Eureka Globalstars Japan 2027 | 7 Oct | 13 Oct | 20 Jan 2027 | 105 | 26 Apr 2027 | 10% |
| Sustainable Medicines Manufacturing CR&D Rd 2 | 5 Oct | 13 Oct | 2 Dec | 58 | 3 Feb 2027 | 15% |
| Investor Partnerships, Battery Innovation | 5 Oct | 9 Oct | 25 Nov | 51 | 26 Jan 2027 | |
| CfI Counter UAS in Prisons | 5 Oct | none listed | 28 Oct | 23 | 15 Dec | |
| MDI Innovation and Scale up Hub | 2 Oct | 6 Oct | 18 Nov | 47 | 4 Feb 2027 | 30% |
| Frontier AI SME Champions Ph 1 | 1 Oct | 7 Oct | 11 Nov | 41 | 26 Jan 2027 | 2% |
| Engineering Biology Investor Partnerships Rd 1 | 1 Oct | 7 Oct | 2 Dec | 62 | 15 Jan 2027 | 20% |
| ADOPT Facilitator Support Rd 12 | 1 Oct | none listed | 11 Nov | 41 | 7 Dec | |
| UK Germany Bilateral CR&D Rd 5 | 28 Sep | 12 Oct | 1 Dec | 64 | 30 Apr 2027 | 10% |
| CfI Battery for dual use and defence Ph 1 | 28 Sep | 1 Oct | 4 Nov | 37 | 30 Nov | |
| CKAF Winter | 17 Sep | none listed | 1 Dec | 75 | 26 Jan 2027 | |
| CfI Innovation in play | 15 Sep | 21 Sep | 28 Oct | 43 | 4 Dec | |
| Battery Innovation Feasibility Rd 3 and Concept Development Rd 3 | 11 Sep | 16 Sep | 2 Dec | 82 | 12 Feb 2027 | 25% |
| Engineering Biology CR&D Rd 3 | 8 Sep | 14 Sep | 3 Nov | 56 | 4 Feb 2027 | |
| National Materials Innovation CR&D Rd 1 | 1 Sep | 3 Sep | 28 Oct | 57 | 2 Dec | 20% |
| Accelerated cancer diagnosis | 1 Sep | 3 Sep | 28 Oct | 57 | 21 Jan 2027 | 15% |
| UK Singapore CRD 2026 | 24 Aug | 27 Aug | 16 Dec | 114 | 26 Feb 2027 | 15% |
| DRIVE35 Scale up Fund Drawdown 5 | 10 Aug | 14 Aug | 4 Nov | 86 | 17 Feb 2027 | 30% |
| Future Leaders Fellowships Rd 11 | 22 Jun | 26 Jun | 4 Nov | 135 | 31 Jul 2027 | 13% |

Summary statistics, computed. VERIFIED.
- Open to close. Median 56 days, range 23 to 135. The calls most relevant to startups (Frontier AI SME 41, Efficient AI 37, BridgeAI 48, Investor Partnerships 51 and 62) sit at 37 to 62 days.
- Briefing event. 23 of 28 list one. Median 5 days after opening (range 2 to 14), median 50 days before close (range 24 to 131). All are online, and recordings and slides are posted afterwards (for example 2584, "Online briefing event: watch the recording").
- Close to notification. Median 62.5 days, range 26 to 269.
- Every call closes at 11:00am UK time.
- Cross check, second source. Innovate UK Business Connect's list, https://iuk-business-connect.org.uk/opportunities/?lang=en-gb , shows "BridgeAI Deployment Catalyst: AI for Operational Systems, Opens: 21/10/2026, Closes: 08/12/2026", matching IFS. VERIFIED.

Lead time before opening. VERIFIED as of today, INFERRED as a rule.
- No competition on IFS today is "Opening soon". The UKRI funding finder filtered to Innovate UK and status "upcoming" (https://www.ukri.org/opportunity/?filter_council%5B%5D=822&filter_status%5B%5D=upcoming ) returned "Your search found no opportunities." So publication and opening are close together and BidX cannot count on weeks of warning. INFERRED.

Hard internal deadlines inside the window. VERIFIED from the overview pages.
- Quote "If your project’s total grant funding request or duration falls outside of our eligibility criteria, you must provide justification by email to support@iuk.ukri.org at least 10 working days before the competition closes." (for example 2580, 2584).
- Quote "We recommend you contact us at least 15 working days before this competition’s closing date to allow us to put the most suitable support in place." (accessibility support).

How long a good application takes.
- The Frontier AI SME application has 17 questions, 10 of them scored, with word limits of 400 to 800 each (about 4,600 words of scored answers) plus appendices including CVs, a project plan and a risk register (https://apply-for-innovation-funding.service.gov.uk/competition/2584/overview/ ). VERIFIED.
- University of Leeds, https://www.leeds.ac.uk/business-partnerships-access-expertise/doc/access-innovate-uk-funding , opened today, quote "While proposal development typically takes at least six weeks". CLAIMED (a university business partnerships team, not Innovate UK).
- A Business West article was reported in search results as recommending "4-6 weeks", but its URL returned 404, so I could not open it. Not used.
- Innovate UK's own Good Application Guide (https://iuk-business-connect.org.uk/wp-content/uploads/2024/03/Business-Connect-Good-Application-Guide_2024.pdf ) says only "Make sure you contact us in plenty of time before the deadline". VERIFIED, no number given.

EIC Accelerator timing. VERIFIED, https://eic.ec.europa.eu/eic-funding-opportunities/eic-accelerator_en
- Quote "Short proposals may be submitted at any time and will be batched for evaluation every first Tuesday of the month at 5pm Brussels time."
- Full proposal batching dates listed for 2026, "7/01/2026, 04/03/2026, 06/05/2026, 08/07/2026, 02/09/2026, 04/11/2026". The last 2026 date is 4 November, 14 days from today. 2027 dates are not on the page.
- Quote "Applicants from the United Kingdom can only apply for the "grant only" scheme". Grant is a "Lump sum contribution below € 2.5 million".
- Quote "Applicants may submit only one application to the EIC Accelerator."

### 3B. The outreach timing rule (INFERRED from the above)

1. **For a call driven campaign, the first touch lands within 7 days of the call opening, and never later than 6 weeks before close.** Six weeks of writing (Leeds) is longer than the whole window for several calls (Frontier AI 41 days, Efficient AI 37 days), so for those the only workable moment is opening week. The briefing event, a median 5 days after opening, is the natural hook ("the briefing is on Tuesday, here is what it means for you").
2. **Stop new cold outreach for a call about 3 weeks before close.** After that a new client cannot get a strong bid in, and anything out of scope needed Innovate UK's sign off 10 working days before close.
3. **For past winners, touch 3 to 6 months before their project end date**, independent of any one call, so they are ready when a matching call opens. 1,001 SME companies are in that window now.
4. **For declined applicants, time a message to the week after a call's published "Applicants notified" date**, addressed to the whole sector rather than to named losers, because no list of losers exists. Example, Frontier AI SME applicants hear on 26 January 2027.
5. **EIC is always on.** Short proposals can go in any month. For a UK startup, outreach should reference the next first Tuesday batching date.
6. **Daily list building must be triggered by the IFS listing changing**, since calls appear close to their opening date. Poll the IFS search pages daily. INFERRED.

---

## 4. Volume reality check

**Applications and awards, official.** VERIFIED. UKRI statistical publication, published 16 July 2026, https://www.ukri.org/publications/ukri-investments-and-outputs/statistical-publication-ukri-investment-and-outputs-april-2015-to-march-2026/ , data file https://www.ukri.org/wp-content/uploads/2026/07/160726-UKRI-investments-and-outputs-data-2015-2026.xlsx , Table 2.2, Innovate UK.

| Year | Applications assessed | Awarded | Award rate | Total award £m |
|---|---|---|---|---|
| 2022-23 | 12,122 | 3,051 | 25.17% | 2,615 |
| 2023-24 | 16,757 | 3,766 | 22.47% | 3,035 |
| 2024-25 | 14,214 | 2,335 | 16.43% | 891 |
| 2025-26 | 5,603 | 1,121 | 20.01% | 395 |

- Caveat on the same page, quote "Applications to Innovate UK that do not meet eligibility criteria are now excluded prior to assessment." And some Innovate UK activity was reclassified to "UKRI-managed programmes", which lowers these counts.
- Conflict. Innovate UK's diversity report says "over 17,100 applications in the period between 1 April 2024 and 31 March 2025" (https://www.ukri.org/publications/innovate-uk-applicant-diversity-data/innovate-uk-diversity-data-report-2023-to-2025/ ), against 14,214 assessed in the stats table. The difference is ineligible applications and reclassification. VERIFIED both, explanation INFERRED.
- Organisations, not applications. Table 1 of the same workbook, "Number of lead organisations" across all UKRI applications, was 10,960 in 2023-24, 9,797 in 2024-25 and 7,744 in 2025-26. Before Innovate UK data entered the series (2016-17) it was 422, so the large majority of lead organisations are Innovate UK applicants. VERIFIED counts, attribution INFERRED.
- SMEs. Table 5d, active organisations "of which are SME", 3,563 in 2023-24, 3,185 in 2024-25, 2,393 in 2025-26 (UKRI wide). VERIFIED.

**Distinct SME companies winning, computed from the funded projects file.** VERIFIED (computed). 2022/23 2,867, 2023/24 3,141, 2024/25 1,941, 2025/26 1,737, 2026/27 so far 612.

**Smart grants, the open call startups used to rely on.** 17,461 individual businesses applied between February 2019 and April 2024, 1,295 applications won out of 21,782 (Fact 2 above). Last round opened 14 Nov 2024 and closed 22 Jan 2025 (https://apply-for-innovation-funding.service.gov.uk/competition/2057/overview/94b01162-f7ac-45b1-aede-ce7663a3be3a ). VERIFIED.

**Wider pools that could apply.** VERIFIED.
- HMRC R&D tax credits, September 2026 release, https://www.gov.uk/government/statistics/corporate-tax-research-and-development-tax-credit/research-and-development-tax-credits-statistics-september-2026 , quote "This is comprised of 24,570 claims across the SME (including R&D intensive SMEs) and ERIS schemes and 15,760 RDEC and Merged RDEC claims." These are claims, not companies, and carry no names.
- Companies House annual release, https://www.gov.uk/government/statistics/companies-register-activities-statistical-release-april-2025-to-march-2026/companies-register-activities-statistical-release-april-2025-to-march-2026 , quote "There were 815,277 company incorporations during FYE 2026". Quarterly release, next due "29 October 2026".
- SEIS 2,430 and EIS 3,735 companies raising in 2024 to 25 (section 1).
- New R&D SIC incorporations about 4,080 a year (section 1).

**The arithmetic.** INFERRED.
- 30 to 50 contacts a working day over about 252 working days is 7,560 to 12,600 contacts a year.
- That is larger than the whole 2025-26 Innovate UK applicant base (5,603 assessed applications, about 7,700 lead organisations across UKRI) and four to seven times the number of SMEs that win in a year (about 1,700 to 1,900).
- The past SME winner pool since 2017/18 is 13,075 companies, about 11,900 still live. At 30 to 50 a day BidX would contact all of them in roughly one to one and a half years.
- So 30 to 50 a day is only sustainable if most contacts are "could apply" firms (equity backed, R&D active, accelerator alumni) rather than "will apply" firms, and if each contact is matched to one specific open call. With only thematic calls open, the matched pool for any one call is probably hundreds, not thousands. A realistic split is perhaps 5 to 10 a day from past winners with ending projects and declines, and the rest from raise, accelerator and SIC signals filtered by an open call. That split is a judgement, not a measured figure.

---

## 5. Channel constraints

### 5A. PECR and UK GDPR (ICO)

ICO business to business marketing guidance, https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/business-to-business-marketing/ . VERIFIED.
- Quote "Businesses are classed as “corporate subscribers” under PECR if they are a corporate body with separate legal status (eg companies, limited liability partnerships, Scottish partnerships, and some government bodies). However sole traders and other types of partnerships are classed as “individual subscribers” and PECR treats them the same as individuals."
- Quote "The PECR rule on direct marketing by electronic mail does not apply to corporate subscribers. For example, this means you can send B2B direct marketing emails or texts to any corporate body. You do not need their consent under PECR to send such messages." You must "not disguise or conceal your identity" and "give a valid address for business to opt-out or unsubscribe".
- Quote "Because sole traders and some partnerships are treated by PECR as individual subscribers you can only market them by electronic mail if they have specifically consented, or the ‘soft opt-in’ applies."
- Quote "If you are unsure whether the contact details belong to an individual subscriber or a corporate subscriber this puts you at risk of breaching PECR. To mitigate that risk you should treat the details as belonging to an individual subscriber".
- UK GDPR still applies when the person is named. Quote "If you collect an individual’s contact details in their business capacity and you intend to send them direct marketing messages, you must tell them about this and have a lawful basis under the UK GDPR for the processing." Legitimate interests is "likely" the basis where PECR does not require consent, subject to the three part test. Privacy information must be given "no later than one month from the date of collection" when data comes from public sources.
- Tracking pixels in email fall under the PECR cookie rules for all subscribers.
- The page notes "Due to changes made by the Data (Use and Access) Act, this guidance is under review and may be subject to change."

LinkedIn messages count as electronic mail. VERIFIED. ICO electronic mail guidance, https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guide-to-pecr/electronic-and-telephone-marketing/electronic-mail-marketing/ , quote "If you are marketing using direct messaging via social media, the electronic mail marketing rules apply." Whether a founder's personal LinkedIn account counts as a corporate or an individual subscriber is not addressed in what I read. Treat it as an open legal question for BidX's adviser. INFERRED.

Penalties. VERIFIED. ICO statement 5 February 2026, https://ico.org.uk/about-the-ico/media-centre/news-and-blogs/2026/02/statement-on-the-commencement-of-the-data-use-and-access-act-duaa , quote "The Act provides the ICO with new powers, including ... issue fines of up to £17.5 million or 4% of global turnover under the Privacy and Electronic Communications Regulations (PECR)."

Practical consequence for targeting. INFERRED.
- Companies House lists only incorporated bodies, so every company sourced from Companies House or from the funded projects CRN column is a corporate subscriber, which keeps cold email lawful under PECR. Sole traders and ordinary partnerships (no CRN) must be excluded from cold email and cold LinkedIn messages.
- A CRN check is therefore the compliance filter as well as the data join.

### 5B. LinkedIn limits (lemlist help centre)

VERIFIED from the full article read through lemlist's help centre tool, and the same numbers confirmed on the public URL.
- https://help.lemlist.com/en/articles/7210709-set-account-limits , quote "Connection invites: 20 per day maximum, on working days only", "Messages (to 1st-degree connections, voice messages included): 30 per day maximum", "All action types combined: 100 per day maximum". Quote "LinkedIn caps invitations at roughly 100 per rolling week. Twenty per day across five working days is exactly that 100."
- https://help.lemlist.com/en/articles/8514157-linkedin-connection-requests-limits-best-practices-avoiding-restrictions , quote "Connection notes are capped at 200 characters (previously 300), variables included." Quote "On free LinkedIn accounts, connection requests with a custom note are limited to 3 per month." Premium and Sales Navigator have no monthly cap on noted invites. A good acceptance rate "typically ranges between 30% and 50%".
- LinkedIn does not publish the number. lemlist's own words are "the observed ceiling is roughly 100 invitations per rolling week" (https://help.lemlist.com/en/articles/12856275-fix-linkedin-disconnections-and-restrictions-in-lemlist ).
- LinkedIn's User Agreement bans "bots or other unauthorized automated methods to ... add or download contacts, send or redirect messages" (https://www.linkedin.com/legal/user-agreement ). Any automation, lemlist included, carries account risk. VERIFIED clause, risk INFERRED.

Capacity arithmetic. INFERRED. One LinkedIn seat gives about 100 new invites a week, so about 20 new people a working day at most, and at a 30% to 50% acceptance rate only 6 to 10 of them become reachable by message. Reaching 30 to 50 new founders a day on LinkedIn alone needs two to three sender seats on Premium or Sales Navigator (for noted invites). Email has to carry the rest.

### 5C. Email deliverability

VERIFIED.
- lemlist recommended limits, https://help.lemlist.com/en/articles/7210709-set-account-limits , quote "Domain under one month old: keep the whole domain under 100 emails/day, every mailbox on it combined", "Mailbox still in warm-up: 0 cold emails. No campaign starts under a Warmup Score of 90, and only after 14 days of stabilization at target volume", "start at 10–15 emails/day through lemlist per mailbox, add 5 per week, and cap at 25–30/day", "warm-up plus campaigns stay at or below 50 emails/day per mailbox."
- Google sender guidelines, https://support.google.com/a/answer/81126?hl=en , all senders need "SPF or DKIM", valid PTR records, TLS, and "Keep spam rates reported in Postmaster Tools below 0.3%". Senders of more than 5,000 a day to Gmail need SPF, DKIM and DMARC, From alignment, and "Marketing messages and subscribed messages must support one-click unsubscribe".

Capacity arithmetic. INFERRED. A three step email sequence at a 25 to 30 a day mailbox cap supports about 8 to 10 new contacts per mailbox per day once the sequence is full. 30 to 50 new contacts a day by email needs about 4 to 6 warmed mailboxes, spread over 2 to 3 secondary domains, and at least two weeks of warm up (more if the domains are new) before the first cold send.

### 5D. Reply rate benchmarks

All vendor data, so CLAIMED. None segments UK founders or grant services.
- Instantly, https://instantly.ai/cold-email-benchmark-report-2026 , dataset "billions of cold email interactions", period "January 1 – December 18, 2025", quote "The overall average reply rate is 3.43%", "top quartile achieve 5.5% reply rates", top 10% "10.7%+". Quote "58% of all replies are generated from step one". It does not say whether auto replies are excluded.
- lemlist blog, https://lemlist.com/blog/cold-email-response-rate (updated 28 Sep 2026), repeats 3.43%, quote "Standard campaigns typically land between 1% and 5%. Good campaigns hit 5% to 10%, and top performers exceed 10%." Quote "lists under 50 recipients average a 5.8% reply rate compared to 2.1% for lists over 1,000." It gives no founder or startup figure, only "C-suite executives often have the lowest reply rates" and "Smaller companies (under 50 employees) respond faster and more often".
- Woodpecker, https://woodpecker.co/blog/cold-email-statistics/ (updated 23 Jun 2026), "3.43% platform-wide", attributed to Instantly, and "42% of all replies come from follow-ups".
- Belkins, https://belkins.io/blog/sales-follow-up-statistics (updated 26 Jun 2026), "7,530,489 sent emails across 12 months" of 2025, per step email reply rates from 0.59% at step 1 to 0.28% at step 6, LinkedIn reply rates by campaign type, Messenger 12.22%, Connector 7.95%. No definition of reply rate.
- The spread between Belkins (under 1% per email) and Instantly (3.43%) is a definition gap, not a real difference. Plan on 1% to 4% positive and negative replies per contact on cold email to founders, and more on LinkedIn after acceptance. INFERRED.

---

## 6. Search demand

**Google Trends. Could not access.** The explore call to `https://trends.google.com/trends/api/explore` returned 200 once for "innovate uk grant", "smart grant", "innovate uk funding" (UK, Oct 2021 to Oct 2026), but every follow up call to the timeseries widget, and later the explore endpoint itself, returned HTTP 429 from Google to this session's egress IP. No numbers were obtained. A person should open https://trends.google.com/trends/explore?geo=GB&date=2021-10-01%202026-10-20&q=innovate%20uk%20grant,smart%20grant,innovate%20uk%20funding in a browser and screenshot it.

**Keyword tools. Could not access.** Ahrefs' free keyword generator shows volumes only as images or behind a check. Semrush's public ukri.org overview (https://ko.semrush.com/website/ukri.org/overview , updated 14 Oct 2026) shows five keywords, none of them grant terms, and the rest is behind sign up. Google Keyword Planner needs an account, which the brief forbids.

**What official data says about demand after Smart closed.** VERIFIED data, interpretation INFERRED.
- No Smart round has opened since the November 2024 round closed on 22 Jan 2025, UKRI says Smart is closed, and the 9 Dec 2025 written answer says it is paused (section 2). The "paused in January 2025" date appears in search results and third party pages only, the original Business Connect notice now redirects to a listing, so that exact date is CLAIMED.
- Innovate UK applications assessed fell from 14,214 (2024-25) to 5,603 (2025-26), and lead organisations applying across UKRI fell from 9,797 to 7,744 (section 4). The fall in applications tracks the fall in open calls, so it measures supply more than demand. It says nothing direct about search interest, and I could not verify any search spike after Smart closed.
- Demand exists where calls are open. Women in Innovation "attracts up to 1500 applications per competition" (diversity report, VERIFIED), and the Frontier AI SME call states a 2% chance of success, which implies heavy oversubscription. INFERRED.

---

## Conflicts between sources

1. Innovate UK applications in 2024-25. 14,214 assessed (UKRI stats Table 2.2) against "over 17,100 applications" (diversity report). Different bases, ineligible applications excluded in the stats.
2. GtR says it refreshes in the second week of October, but the live API today reported `lastRefreshDate` "06 Jul 2026".
3. LinkedIn weekly invite limit. lemlist says "roughly 100 per rolling week" and calls it "observed". LinkedIn publishes no number.
4. Cold email reply rate. 3.43% (Instantly, per email sent) against 0.59% at step 1 (Belkins 2025). Definitions differ.
5. Companies House bulk snapshot holds 5,704,711 rows on 1 Oct 2026, the quarterly release says 5,516,377 companies on the register at end June 2026. The snapshot includes companies in liquidation and other non struck off states, so they are not the same count. Explanation INFERRED.

## What I could not access or verify

- Google Trends numbers (HTTP 429) and any keyword volume tool (sign up walls).
- Wikipedia pageviews as a proxy (HTTP 429).
- Crunchbase's own price list (JS only page). Third party prices used and marked CLAIMED.
- Beauhurst prices (not published, quote only).
- Oxford Science Enterprises and Cambridge Enterprise portfolio pages (refused by this session's egress proxy).
- The ICO's former B2B URL https://ico.org.uk/for-organisations/direct-marketing/business-to-business-marketing/ returns 404. The current page above was used.
- Business West's "4 to 6 weeks" writing time article (404).
- A published figure for the share of past Innovate UK winners who reapply. Only rewin rates (computed) and the Smart multi application note exist.
- Whether a LinkedIn message to a company founder is to a corporate or an individual subscriber under PECR. Needs legal advice.

---

## Appendix, how the computed figures were made

- IFS listing and timeline. `raw/ifs_p0.html` to `ifs_p3.html`, the 28 `raw/ov/*.html` overview pages, parsed for the Dates section. Output `ifs_timeline_2026-10-21.txt`.
- Funded projects analysis. `iuk2.py` over `raw/xl/iuk_2016_present.xlsx`. SME means Enterprise Size in Micro/Small, Micro, Small, Medium and spelling variants. Withdrawn projects and withdrawn participants excluded. Company numbers normalised and validated as 8 digits or 2 letters plus 6 digits. "Ending in the next 6 months" means Project End Date between 21 Oct 2026 and 21 Apr 2027 with status Live, Final Claim or On Hold.
- Repeat win shares. For each competition year, SME companies winning that year that also appear in any earlier competition year in the file (2017/18 onward). Earlier wins before 2017/18 are not counted, so these shares are a floor.
- SIC and age join. `join_iuk.py` joins SME winner CRNs to the 1 Oct 2026 Companies House snapshot. Dissolved winners drop out, so the SIC shares describe surviving winners.
- Recent R&D incorporations. `sic_count.py` over the same snapshot, incorporation date 1 Oct 2025 to 30 Sep 2026, still on the register on 1 Oct 2026.
