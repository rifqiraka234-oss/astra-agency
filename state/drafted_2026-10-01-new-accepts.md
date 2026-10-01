# 2026-10-01. New accepts since 30 Sep 16 00Z, full research

## What was pulled

- `/api/activities?type=linkedinInviteAccepted&minDate=2026-09-30T16:00:00Z` on v0.1, 6 rows. Scott Bentley (worked yesterday) plus five new.
- Threads pulled per contact. Willem Straat, Marlon Baarends-Schroevers, Nick Richards and Ronald Andriessen all empty. Vladislav Maslov holds one reply, "I'm not a business owner", already logged by the other session. Positive control, Ramona Hendriks's thread pulled in the same run came back full.

| Lead | Record check | Verdict |
|---|---|---|
| Nick Richards, ctc_MDdiddoYGMJGaDFHn | Enrich Education Recruitment Ltd 16119130, sole director and 75%+ PSC Nickyle Theodore Richards since 4 Dec 2024 | Owner. Full research below |
| Willem Straat, ctc_XDgqhRAfzxcTmGKhZ | Founder and co-owner of KeyPro (2011), merged with Hooft & Petiet into ReShare Living Group B.V. (98269453, 11 Sep 2025), Grehamer Invest a strategic shareholder since Mar 2025, 45 staff and revenue heading for €8M per RTV Noord 22 Nov 2025 | Co-owner of an investor backed group. Full research next |
| Ronald Andriessen, ctc_LCNxLygqv6SLjBjy7 | Algemeen directeur of Platowood, owned by Schipper Bosch per https://schipperbosch.nl/onderneming/platowood/ | Hired director. NOT_ICP |
| Marlon Baarends-Schroevers, ctc_mRBodYj6JYPjdMRK7 | Directeur-bestuurder of Stichting Dockwize, an innovation hub | A foundation, no owner. NOT_ICP |
| Vladislav Maslov, ctc_m6GoiNTeoWjTWjNu4 | Quality Director, says himself he isn't an owner | NOT_ICP, logged by the other session |

---

## Nick Richards, Enrich Education Recruitment. OPENER. ctc_MDdiddoYGMJGaDFHn

```gate
lead: Nick Richards, founder and sole owner of Enrich Education Recruitment Ltd (Companies House 16119130, incorporated 4 Dec 2024 as Enrich Group Ltd, sole director and PSC 75%+ Nickyle Theodore Richards), ctc_MDdiddoYGMJGaDFHn, lea_YfMWMzALLqZio63Jz. lemlist jobTitle "Founder & Lead Consultant", tagline "Founder | Enrich Education Recruitment | Supporting London Schools with High-Quality Teachers & SEN Teaching Assistants". LinkedIn company page https://www.linkedin.com/company/enrich-education-recruitment/ shows 1 employee. A one person London education recruitment agency, temporary, long term and permanent, North, North West and West London
site pass 1: 41 pages, tools/crawl.py on https://www.enrichedu.co.uk, 39 from the sitemap, 40 at 200 and 1 at 404 (/assessment), every page read
site pass 2: 41 pages, all pass 1 URLs again by curl_cffi rotating chrome, safari and firefox, 40 at 200, the /assessment 404 again, every page read. Screenshots, tools/site-audit.js was refused by our proxy's certificate (curl verifies the same host clean), so home, schools, candidates, vacancies and a job page were rendered with tools/render-via-curl.js, 0 curl errors, every part looked at. A Chromium pass with the proxy certificate accepted was used only to click the Apply Now button, its visuals are VOID (118 failed requests were ours)
deep analysis: a Wix site, 34 live vacancies on /vacancies, 28 job pages, 7 blog posts, forms on /candidates, /schools and /vacancies only. Apply Now on a job page links to /candidates, a general "Register your interest" form whose only role field is still labelled "Dropdown" with role types, so the job someone clicked isn't carried. Job pages carry two empty ld+json blocks, no JobPosting data, but search shows his ads on Indeed and CV-Library, which feed Google's job search, so that gap is small. The market change is the big one. The GCA Supply Teachers and Education Recruitment framework RM6376 went live 30 Apr 2026, closed framework to 29 Apr 2029, supplier fees capped at £45 a day for teachers and £38 for support staff. From September 2026 the Academy Trust Handbook makes academy trusts buy supply through it, or through a compliant alternative where "Agencies must provide you with a transparent breakdown of their charges on a per candidate basis" (daily pay, on costs, supplier fee). Enrich isn't among the 208 Lot 1 suppliers in the official CSV, controls Axis, Engage Education and Tradewind are. His own blog post of 25 Feb 2026 covers the DfE plan for all schools to join academy trusts. The site says nothing about the framework or fees anywhere
owner linkedin: route 1 https://www.linkedin.com/in/nick-richards-9b46591a3 through tools/fetch-walled.py, walled, empty. Route 2 web search "Nick Richards" "Enrich Education", ten other Nick Richards, none his. Route 3 lemlist record, jobDescription and tagline read in full, "Founder of Enrich Education Recruitment ... long-term and permanent positions". Route 4 company page https://www.linkedin.com/company/enrich-education-recruitment/ read, 1 employee. Route 5 his site's testimonials, "I have worked with Nick for 4 years" (Mrs Dobie, Headteacher), so he recruited before founding Enrich. Route 6 Companies House officer record, Nickyle Theodore Richards, born Nov 1991, one appointment
contact linkedin: Nick is the owner and the person we're messaging, same six routes
google news: tools/news.py en, "Enrich Education Recruitment" 0 results, "Nick Richards" 100 results all the Miami Heat basketball player or a cricketer, none him. Control Tesco 100
regional news: tools/news.py (London schools) with education recruitment agency OR supply teachers, 78 results, Schools Week 2025-12-04 "Supply: Schools 'expected' to use new capped agency deal", read with the Schools Week explainer and the DfE guidance, Bdaily 2026-05-05 an education recruiter's largest takeover, The i 2026-02-10 on supply pay
industry news: tools/news.py education recruitment agency OR supply teachers 100 results, GOV.UK blog 2026-09-16 on teacher pay, EPI 2026-09-09 on specialist teachers. Trade pieces read, Schools Week, Tes, the GCA framework page, the DfE buying guidance, Engage Education and VWV on the mandate
sources:
1. https://www.enrichedu.co.uk/ and all 41 pages, read twice
2. https://www.enrichedu.co.uk/candidates (the form Apply Now lands on)
3. https://www.enrichedu.co.uk/vacancies
4. https://www.enrichedu.co.uk/post/the-dfe-s-white-paper-all-schools-in-trusts-reform-or-risk (25 Feb 2026)
5. https://find-and-update.company-information.service.gov.uk/company/16119130
6. https://www.gca.gov.uk/agreements/RM6376
7. https://www.gca.gov.uk/agreements/RM6376:1/lot-suppliers/csv (208 suppliers, no Enrich)
8. https://get-help-buying-for-schools.education.gov.uk/guidance-supply-staff-mandate
9. https://schoolsweek.co.uk/schools-expected-to-use-new-capped-supply-agency-deal/
10. https://schoolsweek.co.uk/supply-staff-agency-fee-caps-what-schools-need-to-know/
11. https://www.linkedin.com/company/enrich-education-recruitment/
12. https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fwww.enrichedu.co.uk%2F (tools/eu-view.py)
13. https://engage-education.com/gca-framework/ (a framework supplier, control)
14. https://buyingforschools.blog.gov.uk/2026/04/29/a-better-deal-on-agency-supply-staff-what-the-new-supply-teachers-and-education-recruitment-framework-means-for-schools-and-trusts/
pains: 6 judged. (1) Not on the RM6376 framework, closed until April 2029, while academy trusts must buy supply through it since September or get a per candidate breakdown of pay, on costs and fee from an outside agency, costliest because it decides whether a trust can book him at all, hottest because the mandate started last month and his own February post covers every school moving into a trust. (2) Apply Now drops the job, it lands on a general form with a field still called "Dropdown", real and small. (3) No JobPosting data on his job pages, but his ads reach Indeed and CV-Library, small. (4) GDPR, from Stockholm Microsoft Clarity and Bing load and set _clck and _clsk before any click, no consent banner on a site taking CVs, real, an afternoon's fix. (5) Social, LinkedIn only, 1 employee, the page isn't readable past its wall, nothing claimed. (6) Squad, a one person agency, no build team, no fit
chosen: (1), the costliest and hottest, it sits between him and every academy trust booking from this term
sweep website: all 41 pages of https://www.enrichedu.co.uk read twice, clear Wix site with 34 vacancies and three forms, Apply Now drops the job onto a general form, no JobPosting data, both small next to the framework
sweep gdpr: from Stockholm per tools/eu-view.py https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fwww.enrichedu.co.uk%2F , Clarity (c.clarity.ms, scripts.clarity.ms) and Bing (c.bing.com) load before a click, cookies _clck and _clsk set, site-audit finds no consent code in the HTML. Real, an afternoon's fix, kept for a later message
sweep apps: the DfE guidance https://get-help-buying-for-schools.education.gov.uk/guidance-supply-staff-mandate asks outside agencies for a per candidate breakdown of pay, on costs and supplier fee, a small tool that produces it for every booking is the chosen angle
sweep social: tools/social-audit.js on https://www.linkedin.com/company/enrich-education-recruitment/ UNKNOWN (our proxy), read through tools/fetch-walled.py instead, 1 employee, the only social link on the site. No angle
sweep squad: a one person agency per the company page, no build team, not a squad fit
thread: problem Enrich isn't on the framework academy trusts must now use, so a trust booking him needs a per candidate breakdown | cost every trust booking needs pay, on costs and fee broken out, and more schools are going into trusts | offer the per booking fee breakdown sheet | link breakdown
lead read: Nick reads that he's not on the framework trusts must now buy through, that each trust booking then needs a fee breakdown per candidate, that this grows as schools join trusts, and gets offered a breakdown sheet, one thread
claims:
your agency isn't on the government's supply framework, https://www.gca.gov.uk/agreements/RM6376:1/lot-suppliers/csv downloaded 2026-10-01, 208 suppliers, 0 hits for Enrich, controls Axis Recruitment, Engage Education and Tradewind found in the same file
since September academy trusts must book supply through it, https://get-help-buying-for-schools.education.gov.uk/guidance-supply-staff-mandate "From September 2026, single and multi-academy trusts are mandated to procure supply staff through the Government Commercial Agency (GCA) 'Supply Teachers and Education Recruitment' framework agreement"
or get a per candidate fee breakdown, https://get-help-buying-for-schools.education.gov.uk/guidance-supply-staff-mandate "Agencies must provide you with a transparent breakdown of their charges on a per candidate basis"
pay, on costs and your fee, https://get-help-buying-for-schools.education.gov.uk/guidance-supply-staff-mandate "candidate/worker daily pay, on costs (National Insurance, pension contribution etc), supplier fee"
supporting more London schools, his tagline in lemlist and https://www.enrichedu.co.uk/ "supporting London schools with teachers, SEN staff"
your February post on every school joining a trust, https://www.enrichedu.co.uk/post/the-dfe-s-white-paper-all-schools-in-trusts-reform-or-risk datePublished 2026-02-25, "call for all schools to join a strong academy trust"
standardised the KPI reporting for 23 markets at Heineken, docs/astra-master-context.md section 2A "Standardised KPIs, dashboards and decision cadences; enabled 23 markets with self-serve insights", from https://www.linkedin.com/in/raka-mulya-b92885196
recheck: 2026-10-01, the CSV reread with three controls, the DfE guidance read in full, the GCA page's dates read (30/04/2026 to 29/04/2029, closed framework). Opposite tried, three ways. Google job search, his ads reach Indeed and CV-Library so that angle was dropped. A tier two route under a Lot 2 managed service provider could let trusts book him through an MSP, which can't be seen from outside, so the message says "book you direct". Local authority schools aren't mandated, only "can also use" it, so the message only speaks about trusts. Thesis confidence MEDIUM, his split between trust and council schools isn't visible
```

### Nick, OPENER

```
Hi Nick, saw Enrich Education, looks interesting!

However, your agency isn't on the government's supply framework, and since September academy trusts must book through it or get a per candidate fee breakdown. This causes trust schools to need pay, on costs and your fee broken out for every booking before they can book you direct.

Especially, when you are supporting more London schools, the breakdowns pile up, since your February post covers the plan for every school to join a trust.

I run Astra agency. We build websites and booking tools for brands like Unilever, AXA, Pertamina. I standardised the KPI reporting for 23 markets at Heineken, so each one read the same numbers without asking.

Shall I send you over what the fee breakdown sheet looks like?
```

---

## Willem Straat, KeyPro and Hooft & Petiet (ReShare Living Group). NO_STRONG_ANGLE. ctc_XDgqhRAfzxcTmGKhZ

```sweep
lead: Willem Straat, founder (2011) and co-owner of KeyPro, Keypro B.V. director Keypro Holding B.V. (52688844) per the Staatscourant via https://www.oozo.nl/bedrijven/groningen/zuidoost/eemspoort/2722856/keypro-b-v , lemlist companyName Hooft & Petiet and jobDescription "Mede-eigenaar van Hooft & Petiet ... onderdeel van de ReShare Living Group", ctc_XDgqhRAfzxcTmGKhZ, lea_EKPeqAQrDvy7jMRTb. Grehamer Invest a strategic shareholder since 17 Mar 2025 (https://www.emerce.nl/wire/keypro-verwelkomt-grehamer-invest-strategische-partner), ReShare Living Group B.V. set up 11 Sep 2025 with Hooft & Petiet, 45 staff and revenue heading for €8M (RTV Noord 22 Nov 2025), goal "het grootste circulaire meubelverhuurplatform van Europa"
website: https://www.keypro.nl all 1,402 sitemap pages fetched (1,394 at 200, 8 sitemap entries at 404, all shop items or a service page), NL, EN and DE, 1,088 shop pages, a configurator, Mijn KeyPro accounts, a service request form. https://hooftenpetiet.nl all 68 pages read twice, a long but clear quote form, rendered and looked at. https://reshareliving.com one page, "Deze site is in ontwikkeling", promises "één uniforme werkwijze". The two brands keep separate request routes, KeyPro's configurator and Hooft & Petiet's 20 field form, nothing shows that costs them a client
gdpr: from Stockholm per tools/eu-view.py, https://www.keypro.nl/ loads HubSpot, LinkedIn Insight, Bing, Google Ads and Leadinfo and sets hubspotutk and _gcl_au before a click, https://hooftenpetiet.nl/ loads Google Analytics, HubSpot and Google Ads before a click, both carry the HubSpot banner. Real, a consent setting, fails the tweak test like Brovanture
apps: KeyPro already runs a webshop, configurator (https://www.keypro.nl/configurator/), Mijn KeyPro accounts and service requests. Bas Anneveldt told the Groninger Ondernemers Courant (https://www.groningerondernemerscourant.nl/nieuws/keypro-biedt-alternatief-voor-fast-furniture-verrek-je-kunt-ook-meubels-huren) some items never come back and pieces see up to 40 clients, nothing shows a tracking gap they'd name, so no app pitch
social: opened with tools/social-audit.js, Instagram keypro_furnishing 1,133 followers latest 2026-09-30, hooftenpetiet 167 followers latest 2025-06-25 (dormant 463 days), Facebook 8 and 197, LinkedIn KeyPro 1,822 followers and 27 employees via tools/fetch-walled.py. The dormant Hooft & Petiet account is small next to KeyPro's active one
squad: vacancies on https://www.keypro.nl/werken-bij-keypro/ and https://hooftenpetiet.nl/vacatures/ are delivery and fitting staff and two internships, no development roles, an investor backed group with its own web suppliers ("webrealisatie CONTENT voor elkaar" on Hooft & Petiet), no squad signal
verdict: NO_STRONG_ANGLE, a digitally mature, investor backed group, the findings are a consent setting, a dormant second Instagram and eight stale sitemap entries. Google News via tools/news.py, KeyPro 11 results (DVHN 2026-09-28, Wonen360 2026-07-02 15 year anniversary, RTV Noord 2025-11-22), "Willem Straat" 10, "Hooft & Petiet" 2. Revisit if ReShare launches its platform
```
