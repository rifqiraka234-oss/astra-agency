# How UK grant consultancies and AI grant tools win clients

Research for the BidX (bidx.ai) go to market design. Compiled 21 October 2026. Read only, nothing submitted, no sign ups, nobody contacted.

Labels used on every claim
* **VERIFIED** means I opened the source in this session and the fact is what the page or tool literally shows (a count, a price, a date, an ad).
* **CLAIMED** means the firm's own marketing says it. I opened the page, but the figure itself is unaudited.
* **INFERRED** means my reading of the evidence, not something any source states.

Working files (all in `/tmp/claude-0/-home-user-astra-agency/3eb57ba4-cf6b-5d03-9c5f-6f974020ac75/scratchpad/gtm-research/`)
* `serp/d_q*.txt` holds the rendered search results, one file per query.
* `sitemaps/*.txt` holds every URL counted per firm.
* `shots/` holds the ad library and Ads Transparency screenshots.
* `pages/` holds the raw HTML of the homepages and pricing pages.

---

## 0. Method, controls and what I could not access

**Search rankings.** Google UK served a captcha ("google.com/sorry") to headless Chromium, so I could not read Google UK rankings directly. Bing, fetched directly, returned unrelated junk to the bot (Roblox results for a grants query). The usable proxy was DuckDuckGo with the UK region (`kl=uk-en`), rendered in Chromium, about 30 to 40 organic results per query. DuckDuckGo results come mostly from Bing's index, so **treat every rank below as a proxy for Google UK, not Google UK itself.** I triangulated with the built in WebSearch tool, which is US based. Raw results are in `serp/`.

**Content counts.** I read each firm's `robots.txt` and walked its XML sitemaps (script `gtm-scripts/sitemap.py`). The counts are what the sitemap lists on 21 Oct 2026. Counts are **VERIFIED as sitemap counts**. A sitemap can include junk pages. RedKnight's, for example, still lists theme demo pages.

**Paid ads.**
* Meta Ad Library (UK, active ads, keyword search) rendered in Chromium. The positive control "r&d tax credits" returned about 2,500 results, so the method detects ads when they exist.
* Google Ads Transparency Center (region GB, any time) rendered in Chromium. The positive control monzo.com returned about 2K ads.
* Trustpilot was read through WebFetch. The positive control monzo.com returned 73,607 reviews, so a zero on a firm's profile is a real zero.

**Could not access, and why**
* Google UK SERPs. Captcha.
* Google Business / Maps reviews. Not attempted after the Google captcha. **No Google review counts appear in this report.**
* LinkedIn Ad Library. A Cloudflare block in Chromium and a 403 in WebFetch.
* Trustpilot through curl and the TLS impersonation tool. 403, "Verifying Connection". WebFetch worked.
* innovationfunding.com through curl. Incapsula 403. WebFetch showed the redirect.
* frameworkinnovation.com. Connection reset through the proxy, so it was not profiled.
* Google Ads Transparency showed "Trouble loading ads" or a 429 rate limit for leyton.com, fundsquire.co.uk and grantedai.com, so their counts are **unknown**. Myriad's single ad would not open (429).
* Myriad has no sitemap (`robots.txt` returns 404), so its content is not counted.
* LinkedIn company pages were read as public previews through WebFetch, so post dates are relative ("2 days ago") as of 21 Oct 2026.

---

## 1. Market context that shapes every channel

* **Smart grants have been paused since January 2025.** Kreston Reeves, 20 Mar 2025, says "In January this year, Innovate UK... paused its Smart Grants programme". https://www.krestonreeves.com/news/whats-next-for-uk-smart-grants/ VERIFIED (I opened the article). People still search "innovate uk smart grant", but the results are now mostly old competition pages and "status and alternatives" content (see section 2). INFERRED: search demand for the old flagship call now has nowhere obvious to go.
* **The base rate of winning is low.** GrantTree's FOI data shows the July 2022 Smart round funded 45 of 1,019 applications, which is 4.4%. https://granttree.co.uk/blog/grant-funding/new-data-reveals-fierce-competition-for-smart-grants VERIFIED (I opened it). The FOI figures are CLAIMED by GrantTree.
* **The free alternative is partly closed.** The Innovate UK Business Growth service (the old EDGE) says "New requests into the service, outside of the above, have been paused as part of the current planning cycle". https://iuk-business-connect.org.uk/business-growth/ VERIFIED.
* **BridgeAI Deployment Catalyst opened on 21 Oct 2026, today.** Its three strands offer £100k to £200k each and close on 8 Dec 2026, per RedKnight's LinkedIn post and the UKRI opportunity pages in the results. The UKRI page is at https://www.ukri.org/opportunity/bridgeai-deployment-catalyst-ai-for-operational-systems/ (seen in search results, not opened). The open and close dates are VERIFIED through RedKnight's LinkedIn post.

---

## 2. Who ranks for the grant searches (DuckDuckGo UK proxy, 19 queries)

Each line gives the first position of every tracked firm. Government sources (ukri.org, gov.uk, the Innovation Funding Service, Innovate UK Business Connect) hold most of the top slots on the informational queries. All results are VERIFIED as rendered on 21 Oct 2026, from the files in `serp/`.

| Query | Commercial firms seen (first position) |
|---|---|
| innovate uk smart grant | IUK Business Connect #8, echogrant #9, **GrantTree #18 and #31**, Swoop #24, Grantify #27, PNO #29, Kreston Reeves #32, hicrafty #36, grantspark.co.uk #37, MPA #39. Positions 1 to 6 are all government pages. |
| bridgeai deployment catalyst | IUK BC #2, **GrantUp #7** (a guide), **RedKnight #10** (a 14 Oct 2026 post), **Granted AI #13** (programmatic grant page), **TBAT #15**, ZenGrants #26 |
| innovate uk grants for startups | Subvention #1, IUK BC #4, GrantUp #18, FI Group #31. On the US based WebSearch tool, GrantTree's "Business Grants for UK Startups" guide was result #1. |
| how to apply for innovate uk grant | IUK BC #3 (its "Innovate UK Grants: How to apply" guide). No consultancy in the top 31. |
| innovate uk investor partnerships | IUK BC #1. No consultancy in the top 25. |
| **innovate uk grant consultant** | Framework Innovation #1, **BAM Innovation #2, GrantUp #3**, Inogrant #4, **Tatton (ukgrantfunding.co.uk) #5**, **TBAT #6, GrantTree #9, RedKnight #10**, FI Group #16, Grantify #21, Inventya #29 |
| **innovate uk grant writer** | BAM #1, GrantUp #2, Inogrant #3, Framework #6, Streets Innovation #7, Inventya #14, RedKnight #21, TBAT #24 |
| **grant writing services uk** | **GrantUp #1**, EchoGrant #3, BAM #7, Streets #10, Inogrant #11, Inventya #12, Framework #14, FI Group #18, TBAT #19, Tatton #22, RedKnight #24 |
| eic accelerator consultant uk | Segler Consulting #1, FI Group #3, GrantUp #4, RedKnight #10 (5 of the top 40), Grantify #11, GrantTree #12 |
| nihr i4i grant writer | **RedKnight #1** (6 of the top 16), BAM #4, GrantUp #6, Inventya #7 |
| biomedical catalyst grant consultant | IUK BC #2, BAM #3, Tatton #4, GrantUp #6, GrantTree #13, RedKnight #17, Kene #18 |
| r&d grant funding consultants uk | **Tatton #1, GrantTree #2, TBAT #3**, Inogrant #9, ForrestBrown #11, GrantUp #14, Myriad #15, Inventya #19, Kene #29 |
| grant writer london | grant-writers.co.uk #1, **GrantUp #2**, Upwork #3, **GrantTree #4**, BAM #5 |
| innovate uk grant success rate | **EchoGrant #1**, Myriad #6, ZenGrants #8, RedKnight #15, TBAT #16, GrantTree #17 |
| ai grant writing tool uk | ai4work, grantsai.co.uk, FunderMatcher and others first. EchoGrant #15, ZenGrants #19, Granted AI #21. |

What the rankings show (INFERRED from the table)
* Informational queries ("how to apply", "investor partnerships", "innovate uk funding") are effectively owned by government sites. Consultancies only win **commercial intent** queries ("consultant", "writer", "services") and **competition name** queries, where speed of publishing matters.
* **GrantUp is the most consistent commercial ranker.** It appears on 10 of the 19 queries, and its 213 programmatic `/grants/` pages are part of why.
* Smaller specialist firms (BAM Innovation, Framework Innovation, Inogrant) outrank the big names on "consultant" and "writer". Domain size is not the moat on these terms.
* **Leyton, Ryan, Myriad (on grant terms) and Fundsquire are nearly invisible** on grant searches.

---

## 3. Firm by firm

### 3.1 GrantTree (granttree.co.uk), London

**Content and SEO**
* The sitemap lists 449 URLs, including **279 blog posts**. By category that is 99 grant funding, 92 R&D tax, 38 "innovative", 23 funding news and 15 company news. There are also 4 `grant_opportunity` pages and 54 `/what-comes-next/` pages. https://granttree.co.uk/sitemap_index.xml VERIFIED.
* It publishes a competition post for most live calls, titled to the pattern "[Call]: Grants of up to £X for [audience]". Recent examples are Battery Innovation Concept Development Round 3 (closes 2 Dec 2026), Frontier AI SME Champions and UK Germany Bilateral CR&D Round 5. They are listed on https://granttree.co.uk/ VERIFIED.
* Post sitemap `lastmod` counts are 14 in September 2026 and 8 so far in October 2026. VERIFIED. INFERRED: about 8 to 14 competition posts a month.
* It ranks #9 on "innovate uk grant consultant", #2 on "r&d grant funding consultants uk" and #4 on "grant writer london" (section 2).
* Its newsletter is "Grants Watch, a monthly roundup of funding opportunities", plus a monthly newsletter. https://granttree.co.uk/services/innovation-grants/ CLAIMED.

**Lead magnets**
* A **Grants Eligibility Quiz** with 8 questions. The last question is a **work email (personal domains rejected)**, so the result is gated. https://granttree.co.uk/resources/grants-eligibility-quiz/ VERIFIED.
* The "Business Grants for UK Startups" guide, an R&D tax calculator, an R&D eligibility quiz and on demand R&D webinars. They are listed in the homepage navigation and the sitemap. VERIFIED.

**Partnerships**
* The homepage has a "Partner with GrantTree" section offering "significant discounts to members of our partner networks, for both the referrer and the referred company". It also offers to "analyse your network, client book or investment portfolio for companies that are eligible". https://granttree.co.uk/ VERIFIED that the text exists. Discount levels are not published.
* Fundsquire lists GrantTree as a "Trusted advisor" partner. https://fundsquire.co.uk/partners/ VERIFIED.
* It offers grant advance funding with an unnamed "funding partner". https://granttree.co.uk/services/innovation-grants-advance-funding/ VERIFIED.

**Paid**
* Google Ads Transparency shows **36 ads** for granttree.co.uk in the UK (any time). Two image creatives were **last shown 21 Oct 2026**. https://adstransparency.google.com/advertiser/AR00066174107317698561?region=GB VERIFIED (screenshot `shots/gads_adv_granttree.png`).
* Almost every creative is **R&D tax**, with hooks such as "How Much R&D Tax Relief Can You Claim?", "Free R&D Pre-Claim Checklist", "R&D Tax Experts, File in Just Two Weeks" and an on demand webinar.
* Only **one grant search ad** appeared: "Innovate UK, Funding Now Available, Innovate UK Grants". Its sitelinks are "Are You Eligible?" and "Check Your Grant Eligibility". VERIFIED.
* The sitemap has PPC landing pages such as `/contact-us-tc-ppc-mobile-optimised/` and `/landing-page-rd-tax-relief-claim-with-granttree-googlei/`. VERIFIED.
* Meta Ad Library for "granttree" shows no active ads. VERIFIED.

**Outbound and social**
* LinkedIn has 4,708 followers and 33 employees listed. The two visible posts are both about 4 months old (Innovation Loans changes, the new EOI stage). https://www.linkedin.com/company/granttree/ VERIFIED. INFERRED: organic LinkedIn activity is low.

**Pricing and proof**
* The Grants Full Service Write terms set a **Setup Fee payable on engagement and non-refundable**, plus a **Success Fee on the Actual Award**. The success fee is triggered by the success notification and runs for 24 months for the same opportunity. It is charged on the whole award even when part goes to consortium partners. One revision is included and there is **no guarantee**. The amounts sit in the engagement letter, not the terms. https://granttree.co.uk/terms-grants-fsw-v1/ VERIFIED.
* Stated success rate is "65%+" in the headline but "over 60%" in the body. Secured funding is "£500 million+" in the hero but "nearly £400 million" in the partner section. https://granttree.co.uk/services/innovation-grants/ and https://granttree.co.uk/ CLAIMED, and the figures contradict each other.
* Its service tiers are Full Write, Grants Collaborate (coaching) and Grant Review. The review is "feedback in as little as 48 hours" from active assessors. https://granttree.co.uk/services/grant-review/ CLAIMED.
* Trustpilot shows **0 reviews and an unclaimed profile**. https://uk.trustpilot.com/review/granttree.co.uk VERIFIED.

### 3.2 RedKnight Consultancy (redknightconsultancy.co.uk), Cardiff area

**Company basics.** Founded 2015 by Peter Quantick and Dayne Hodgson. https://redknightconsultancy.co.uk/about/ CLAIMED. The phone prefix is 029 (Cardiff), which is INFERRED as the location.

**Content and SEO**
* The sitemap lists **434 posts** from 2018 to 2026, including 55 dated 2026 and 56 dated 2025. https://redknightconsultancy.co.uk/sitemap_index.xml VERIFIED.
* Its competition posts are fast. "Up to £200,000 for AI Deployment" was posted on 14 Oct 2026 and ranks #10 on "bridgeai deployment catalyst". VERIFIED.
* It holds **#1 on "nihr i4i grant writer"** and owns 6 of the top 16 results (section 2).
* It runs a Mailchimp newsletter (a list-manage.com form on the homepage). VERIFIED.

**Lead magnets**
* The "Grant Matcher" is a **partnership with Get Business Grants**. Its "Find Grants" button goes to getbusinessgrants.com. https://redknightconsultancy.co.uk/funding/ VERIFIED. INFERRED: an affiliate style relationship.
* It also offers a "5 step self-assessment" checklist and a free consultation. https://redknightconsultancy.co.uk/grant-bid-writers/ VERIFIED.

**Partnerships.** None named apart from Get Business Grants. https://redknightconsultancy.co.uk/about/ VERIFIED.

**Paid.** Google Ads Transparency shows 0 ads. The Meta Ad Library shows no active ads. VERIFIED.

**Outbound and social**
* LinkedIn has 1,135 followers and 3 employees. It posts a call alert roughly every few days, for example UK Singapore CRD (2 days ago), BridgeAI and NIHR i4i (1 week ago) and the Defence Innovation open call. https://www.linkedin.com/company/redknight/ VERIFIED.

**Pricing and proof**
* It runs a "mixed model". The upfront fee is "based on the page limit of the application" and the success fee is a "% of the grant". It states "we cannot offer a no win no fee service". It claims "success rate typically falls between 38% and 50%". https://redknightconsultancy.co.uk/frequently-asked-questions/ VERIFIED as text. The rate is CLAIMED.
* The homepage counters read £37.3M secured, 304 proposals, **36.3% success rate** and a 23:1 ROI on fees. An older counter set on the **same page** reads £26.8M, 270 proposals and 37.16%. https://redknightconsultancy.co.uk/ VERIFIED that both are shown. The figures are CLAIMED.
* Trustpilot shows 0 reviews (profile claimed July 2020). VERIFIED.

### 3.3 TBAT Innovation (tbat.co.uk), Castle Donington, part of the Dains accountancy group since 3 Sep 2025

**Content and SEO**
* The sitemap lists 841 URLs: **300 posts, 204 `/funding-calls/` pages** (its Funding Finder), 61 knowledge pages, **56 event pages**, 37 case studies and 16 sector pages. https://tbat.co.uk/sitemap_index.xml VERIFIED.
* It ranks #3 on "r&d grant funding consultants uk", #6 on "innovate uk grant consultant" and #15 on BridgeAI. VERIFIED.
* It has a newsletter signup site wide. https://tbat.co.uk/grant-funding-finder-search/ VERIFIED.

**Lead magnets**
* The "Are you Grant Funding ready?" checklist is ungated. https://tbat.co.uk/are-you-grant-funding-ready/ VERIFIED.
* An R&D tax calculator is in the header. VERIFIED.
* **Free monthly Funding Drop-in Clinics**, 1 to 1, on the last Wednesday of each month since 23 Feb 2022. https://tbat.co.uk/funding-drop-in-clinics/ CLAIMED.
* A free webinar, "A Guide to Innovation Funding in the UK & Europe", on 12 Nov 2026 with SPRK Capital, followed by optional free 1 to 1s. https://www.linkedin.com/company/tbat-innovation-ltd/ VERIFIED (post seen).

**Partnerships (the strongest ecosystem play in the set)**
* **Dains Group**, "one of the UK's fastest-growing accountancy and advisory firms", ranked 29th in the Accountancy Age Top 100, with 1,000+ people. TBAT joined on 03 Sep 2025. https://tbat.co.uk/tbat-innovation-joins-the-dains-group/ VERIFIED as text. The Dains figures are CLAIMED.
* A **Partner Referral Scheme** for accountants, solicitors, patent attorneys, financial advisers, design agencies and trade bodies. The reward is a cash fee or a discount for the referee, paid when the referee's invoice is paid. No amount is published. https://tbat.co.uk/tbat-partner-referral-scheme-faqs/ VERIFIED (page dated 14 Jun 2022).
* **The Innovation Challenge.** An annual programme of free workshops (March to July 2026), a competition and a finalist showcase on 7 Oct 2026, with a **£50,000 cash prize** and a £100k support package. The headline sponsor is Shakespeare Martineau (a law firm), the platinum sponsor is **Barclays Eagle Labs**, and the prize is backed by Kappika Ventures and Pera. https://tbat.co.uk/the-innovation-challenge/ VERIFIED as text.
* "Partners and Pastries" networking breakfasts appear in the navigation. VERIFIED.
* A monthly "partner spotlight" blog series features Forresters IP, Shakespeare Martineau, Medilink Midlands and others. These are sitemap URLs, VERIFIED as URLs.
* It is an "official partner of the Innovate UK No Limits platform" (21 Jul 2025). https://tbat.co.uk/tbat-innovation-joins-forces-with-innovate-uks-no-limits-platform/ VERIFIED.

**Paid.** Google Ads Transparency shows 0 ads. The Meta Ad Library has no relevant ads (the one keyword match was an unrelated advertiser). VERIFIED.

**Outbound and social**
* LinkedIn has 4,866 followers and 26 employees, with daily activity. Recent posts cover Innovation Challenge winners, the webinar, call roundups and a Barclays Eagle Labs founder event. https://www.linkedin.com/company/tbat-innovation-ltd/ VERIFIED.

**Pricing and proof**
* Grant fees are not published anywhere I opened. VERIFIED that they are absent.
* It claims 4,500+ projects, 20+ years and "Over £107.5 million" secured. https://tbat.co.uk/ CLAIMED.
* Trustpilot shows 0 reviews (claimed Oct 2018). VERIFIED.

### 3.4 Inventya (inventya.com), Warrington, North West

**Content and SEO**
* The sitemap lists 989 URLs: **583 `/calls/` pages**, 140 news, 40 case studies and 15 events. https://www.inventya.com/sitemap.xml VERIFIED.
* It ranks in positions 12 to 29 on the commercial queries and #7 on "nihr i4i grant writer". VERIFIED.
* It has a newsletter, a members area ("premium content", log in) and downloads. https://www.inventya.com/ VERIFIED.

**Partnerships (structural)**
* It describes itself as a "service partner for... Innovate UK Business Growth (previously Innovate UK EDGE)" and a "delivery partner for the Enterprise Europe Network". https://www.inventya.com/ CLAIMED. Its IUK Business Growth North West page books discovery calls on an inventya.com calendar. https://www.inventya.com/iuk-business-growth VERIFIED.
* INFERRED: delivering the publicly funded programme puts Inventya in front of high growth SMEs before they buy a paid service. That route is now partly closed, because new Business Growth requests are paused (section 1).
* Named partners include Funding Circle, Crowdcube, UKBAA, Finpoint, Geldards (law), Bionow, OBN and the Business Growth Hub. https://www.inventya.com/our-partners VERIFIED as a list.
* The **referral scheme** pays £200 as a voucher or donation for an individual, or **5% of the referred client's first year invoice** for a company, on grant writing referrals. R&D tax referrals pay £300 to £700. https://www.inventya.com/referral-scheme VERIFIED.
* The grants arm grew by acquisition. Inventya merged with Cresco Innovation in November 2021, per https://www.inventya.com/news/inventya-grants-limited-announces-merger-with-cresco-innovation-limited (seen in search results, not opened, so treat as CLAIMED). It also posts as "Innova Grants, part of the Inventya Group" on LinkedIn. VERIFIED (repost seen).

**Paid**
* Google Ads Transparency shows 0 ads for inventya.com. VERIFIED.
* The homepage loads a Google Ads conversion tag (AW-773155013) and the LinkedIn Insight tag (snap.licdn.com, px.ads.linkedin.com). VERIFIED in the HTML. INFERRED: it runs retargeting or ran LinkedIn ads. The LinkedIn Ad Library was blocked, so this is unconfirmed.
* The Meta Ad Library shows no ads. VERIFIED.

**Outbound and social.** LinkedIn has 3,876 followers and 66 employees. Activity is events and awards (Lloyds British Business Excellence Awards finalist, a Bionow BioCap panel, Prolific North). https://www.linkedin.com/company/inventya/ VERIFIED.

**Pricing and proof**
* Its terms (version 26-04) say "the payment of the Fees is not conditional upon the success of the grant funding application". Success fees fall due "upon notification by the funding body... irrespective of whether the Client accepts the grant award offer". Retainers are billed monthly in advance. https://www.inventya.com/terms-conditions-26-04 VERIFIED.
* A testimonial calls its model "low risk... not available through other bid writing services". https://www.inventya.com/ CLAIMED.
* Trustpilot shows 0 reviews (claimed Sept 2026). VERIFIED.

### 3.5 Myriad Associates (myriadassociates.com), London and Market Harborough, plus Ireland and France

**Content and SEO**
* There is no sitemap. The first page of `/resources/news/` shows 30 articles, all dated 2026, mostly creative tax relief and R&D tax. https://www.myriadassociates.com/resources/news/ VERIFIED.
* It has 7 eBooks, **none on grants**. https://www.myriadassociates.com/resources/ebooks/ VERIFIED.
* It ranks #6 on "innovate uk grant success rate" and #15 on "r&d grant funding consultants uk". VERIFIED.

**Lead magnets.** All of them are for tax: an R&D tax calculator, an Advance Notification Form checker and the Tax Cloud self serve portal. https://www.myriadassociates.com/ VERIFIED.

**Partnerships.** It targets innovation consultants, trade associations, IP attorneys, **VCs and investors**, banks, solicitors and **accountants**, with "an attractive and flexible referral scheme" on a referral fee basis. No percentage is given. https://www.myriadassociates.com/partner-with-us/ VERIFIED.

**Paid.** Google Ads Transparency shows "1 ad". The detail page would not open (429). Meta shows none. The site has the LinkedIn Insight tag. VERIFIED.

**Outbound and social.** LinkedIn has 700 followers and 16 employees. Posts are about creative tax relief and BICS, with no grant posts visible. https://uk.linkedin.com/company/myriad-rndtax-creativetax-grants VERIFIED.

**Pricing and proof**
* It is the only firm in the set that **publishes R&D tax prices**: a tiered fee of 15% on the first £50k of benefit falling to 1% above £1m, a minimum of £5,000 + VAT, or a fixed fee from £7,500 + VAT. https://www.myriadassociates.com/pricing/rd-tax-credits-pricing/ VERIFIED.
* Grant fees are not published. https://www.myriadassociates.com/services/rd-grants/innovate-uk/ VERIFIED that they are absent.
* Grant proof is EU heavy: "€300 Million+ in Grants secured in just 3 years" and 32 Horizon Europe EIC wins. The "15/15 in 3 applications" and "five projects scoring 15/15" lines contradict each other on the same page. https://www.myriadassociates.com/services/rd-grants/ CLAIMED.
* Trustpilot shows 0 reviews and an unclaimed profile. VERIFIED.

### 3.6 Ryan, including Catax and Granted Consultancy

**Structure**
* Ryan acquired Catax (Manchester, 100+ specialists, 7,000+ clients, "99.99% success rate on all claims") on 8 Mar 2022. https://ryan.com/insights/press-room/ryan-acquires-united-kingdoms-leading-commercial-r-and-d-and-capital VERIFIED as text. The figures are CLAIMED.
* Catax then acquired **Granted Consultancy** (Exeter, founded 2010, "more than £200 million" secured, "nearly 200 clients each year", 30+ staff) on 4 Jan 2023. Ryan called the combination "one of the largest innovation grants practices in the UK". https://ryan.com/insights/press-room/catax-a-ryan-company-acquires-leading-grant-funding-firm-granted VERIFIED as text. The figures are CLAIMED.
* **The brands have been folded into Ryan.** catax.com redirects to innovationfunding.com, which redirects (301) to `ryan.com/eu/tax-services/government-funding/` with `utm_campaign=redirect-innovationfunding-2026`. VERIFIED by curl and the WebFetch redirect.

**Content, SEO and lead magnets**
* The destination page has **no funding totals, no success rates, no calculators or guides, and no case studies**. Its only call to action is "SPEAK WITH AN EXPERT". https://ryan.com/eu/tax-services/government-funding/ VERIFIED.
* The R&D grant writing page shows the same pattern. https://ryan.com/europe/practice-areas/innovation-funding/grant-funding/rd-grant-writing/ VERIFIED.
* Ryan does not appear in any of the 19 grant SERPs. VERIFIED.

**Partnerships.** None named on the pages above. VERIFIED that they are absent.

**Paid**
* Google Ads Transparency shows 15 UK ads for ryan.com. Nearly all are business rates appeals ("No Win, No Fee Reduction"). One is "UK Government Grants, UK Innovation Funding". https://adstransparency.google.com/advertiser/AR00901754394117144577?region=GB VERIFIED (screenshot `shots/gads_adv_ryan.png`).
* Meta was not tested ("ryan" is too generic a keyword).

**Pricing and proof**
* No grant fees are published. VERIFIED.
* Trustpilot for ryan.com shows **2.7 out of 5 from 144 reviews**, with the catax.com and innovationfunding.com profiles merged in. Complaints are about termination fees and invoices exceeding savings. One September 2025 review praises grant writing help. https://uk.trustpilot.com/review/innovationfunding.com VERIFIED.
* INFERRED: Granted and Catax had brand equity and past clients in grants. That brand presence is now gone, which leaves an opening.

### 3.7 Leyton UK (leyton.com/uk)

* **No grant service any more.** The UK navigation lists R&D tax, energy tax, capital allowances, patent box, land remediation, creative relief, business rates and VAT. `https://leyton.com/uk/grants/` **redirects to `/uk/patent-box/`**. `/uk/grant-funding/`, `/uk/innovation-funding/` and `/uk/innovate-uk-grants/` all return 404. Only a "Grants" blog category is left. VERIFIED by curl.
* The UK sitemap lists 301 URLs, 161 of them insights or news. https://leyton.com/uk/sitemap_index.xml VERIFIED.
* Lead magnets include the white paper "The complete guide to R&D tax credits 2026 edition", webinars and a podcast. These are homepage links, VERIFIED.
* Its **partner programme** targets accountants, associations, PE and VC firms and trade bodies, and offers "co-branded marketing content and dedicated support", training, joint webinars and case studies. Named partners include AIMA, Back British Metals, SEHTA and the Founders and Funding Podcast. No fee is stated. https://leyton.com/uk/interested-in-partnering/ VERIFIED.
* Trustpilot shows **4.6 out of 5 from 212 reviews**, claimed, with invited reviews and a paid plan. https://uk.trustpilot.com/review/leyton.com VERIFIED.
* Paid search is unknown, because the Ads Transparency page did not load. The Meta keyword "leyton" returns only Leyton (east London) local ads, which tells us nothing. VERIFIED that the method failed for this firm.
* INFERRED: Leyton's R&D tax clients currently have no in house grant offer. They are a referral pool for a grants firm.

### 3.8 Fundsquire (fundsquire.co.uk), a lender and a partner type, not a writer

* It sells R&D tax credit loans, **Grant Advance** ("up to 90% of the next milestone", minimum loan £40k, "as little as 5 days") and revenue based finance. Most government grants are eligible, including Innovate UK, DASA and the research councils. https://fundsquire.co.uk/grant-advance/ CLAIMED.
* Its partners page lists GrantTree, ABGi and Grant Thornton as "Trusted advisors", plus SeedLegals, Xero, Airwallex, AWS, Stripe and Whitespace. No referral terms are given. https://fundsquire.co.uk/partners/ VERIFIED.
* The sitemap lists 174 URLs. The footer reads "© 2021", and a COVID-19 hub is still in the navigation. https://fundsquire.co.uk/ VERIFIED. INFERRED: the site is barely maintained.
* It has a Meta pixel, the LinkedIn Insight tag and Hotjar on the homepage. VERIFIED in the HTML. The Meta Ad Library shows no active ads. VERIFIED. Google Ads did not load.
* Trustpilot has no profile (404). VERIFIED.
* INFERRED: BidX should treat Fundsquire as a partner, not a competitor. Grant advance lenders want a supply of winners, and grant writers want a cash flow answer for winners.

### 3.9 Innovate UK Business Connect (iuk-business-connect.org.uk), the free alternative

* It has the largest content footprint in the market. The sitemap lists **9,829 URLs**: 3,665 news, **1,935 opportunities**, **1,668 events**, 880 projects and 518 case studies. https://iuk-business-connect.org.uk/sitemap_index.xml VERIFIED.
* It ranks #1 to #4 on most informational queries ("innovate uk grant", "how to apply", "investor partnerships", "grant help") and #2 on BridgeAI. VERIFIED (section 2).
* Its free help is a written how to apply guide, a financial planning guide, a reasonable adjustments service, a phone and email advice line and a mailing list for funding opportunities. https://iuk-business-connect.org.uk/how-we-help/innovation-funding-and-support/innovate-uk-grants-how-to-apply/ VERIFIED. **It offers no application writing or review.** VERIFIED that the page does not mention either.
* **Innovate UK Business Growth** (1 to 1 growth specialists and the funding and investment readiness service) has **paused new requests**. https://iuk-business-connect.org.uk/business-growth/ VERIFIED.
* INFERRED: the free route is strong on finding the call, consortium building and briefings, and weak on writing. That leaves the writing gap open and makes the free briefing events a place to meet applicants.

### 3.10 GrantUp (grantup.co.uk), the strongest modern challenger

The footer address is in Dorking, Surrey. LinkedIn says London HQ, founded 2012, 54 employees.

**Content and SEO**
* The sitemap lists 361 URLs: **213 programmatic `/grants/` pages**, 51 insights, 34 case studies and 19 sector pages, plus Innovate UK sub guides (investor partnerships, Biomedical Catalyst, KTP, loans). https://grantup.co.uk/sitemap.xml VERIFIED.
* It shows up in 10 of the 19 SERPs, including **#1 on "grant writing services uk"** and #2 on "innovate uk grant writer" and "grant writer london". VERIFIED.
* It runs a UK grant directory: "300+ live UK grant competitions tracked... free to browse, no email required". https://grantup.co.uk/ CLAIMED.

**Lead magnets.** A **9 question eligibility checker** promoted as "no email required". https://grantup.co.uk/eligibility VERIFIED (the page shows "1 of 9"). Also an R&D tax calculator, a "Grant Funding Canvas", a non-dilutive funding guide and a health and medtech funding guide. These are sitemap URLs, VERIFIED as URLs.

**Partnerships.** It is an "official partner of **SETsquared**", an official partner of **Grow London Local** (London & Partners, which "refers London small businesses to GrantUp"), and a partner of Stotles Bids. It targets accountants, incubators and business networks. https://grantup.co.uk/partners VERIFIED as text.

**Paid**
* The **Meta Ad Library shows 6 active ads, all started on 14 Sep 2026.** The hook is "Attention innovative UK companies developing a new product... I can show you how to access £200k–£1.5M+... click this ad and answer a few questions to see if your project could qualify". The headline is "Get £200k to £1.5M in Grant Funding". The proof line is "£190M+... over the last 4 years". Screenshot `shots/meta_grantup_full.png`, library ID 1722644995458704. VERIFIED.
* Google Ads Transparency shows 0 ads for grantup.co.uk. VERIFIED.

**Outbound and social.** LinkedIn has 1,899 followers. It posts call alerts and promoted the "Unlimited" six month plan a month ago. https://www.linkedin.com/company/grant-up/ VERIFIED.

**Pricing and proof**
* "Grant funding engagements have a minimum upfront setup fee starting from £1,750, plus a success fee payable on award". R&D tax is a success fee only, "typically 10%". "Unlimited" is a "paid six month retainer... no fee per application", plus a success fee, with no price published. https://grantup.co.uk/ , https://grantup.co.uk/partners and https://grantup.co.uk/unlimited VERIFIED.
* It claims a "90%+ per-engagement success rate" and over 80% per application, "based on work where we accepted the engagement", plus £190m+ won. https://grantup.co.uk/ CLAIMED.
* Trustpilot shows **4.1 out of 5 from 26 reviews**, 88% five star and 12% one star. The complaints cover eligibility being raised only after payment, poor post submission communication and a missed call. https://uk.trustpilot.com/review/grantup.co.uk VERIFIED.
* EchoGrant's comparison page describes GrantUp as charging "no percentage of the award" with a "no-win-no-fee option". GrantUp's own site contradicts that, and GrantUp's own site is the version used here. https://echogrant.com/resources/best-grant-writing-services-uk VERIFIED that the contradiction exists.

### 3.11 Tatton Consulting (ukgrantfunding.co.uk)

* It ranks **#1 on "r&d grant funding consultants uk"**, #4 on "biomedical catalyst grant consultant" and #5 on "innovate uk grant consultant". VERIFIED.
* It **publishes prices**. "Full application" is **from £3,500 + 7 to 12% success fee**, with free resubmission support. "Success only support" (review and edit) is **from £0 + 10 to 15% approval fee**. "Strategic Grants Partner" is **from £1,495 per month + 8% approval fee**. Its lead form requires the box "I confirm my project costs are above £150,000". https://ukgrantfunding.co.uk/services-pricing/ VERIFIED.
* Its homepage claims "£125m+ Funding Secured", "90%+ Success Rate", "75% First-Time Win Rate", "The UK's Only 5/5-Rated Grants Partner", "Only 'No-Win, No-Fee' Innovate UK Provider", a "Free 'Chance of Success' Assessment" and "Partner of Leading UK Incubators & Accelerators". https://ukgrantfunding.co.uk/ CLAIMED. No Trustpilot profile exists (404). VERIFIED.
* Observation, no inference drawn: BidX's homepage also shows "£125M+ secured" (https://www.bidx.ai/ VERIFIED). The matching figure is worth checking internally before it is used in competitive copy.

### 3.12 Other consultancies that rank

* **BAM Innovation** (Warminster) is #1 to #5 on "writer", "consultant", Biomedical Catalyst and NIHR. Its directors claim "more than 300 grants (£150m+)", come from university research development (Bath, UCL) and include an Innovate UK assessor. https://www.baminnovation.co.uk/ CLAIMED. INFERRED: a small founder led firm that wins on niche SEO plus founder credibility.
* **Streets Innovation** is #7 on "innovate uk grant writer" and #10 on "grant writing services uk". It is part of **Streets, "a Top 40 UK accountancy firm"** with 500+ staff. https://streetsinnovation.uk/about-streets/ VERIFIED as text. This is a second accountant owned grants practice, alongside TBAT and Dains.
* **Framework Innovation** is #1 on "innovate uk grant consultant". It could not be fetched (connection reset).
* **Inogrant** sits at #3 or #4 on the "writer" and "consultant" queries. https://inogrant.co.uk/ was fetched, but its success rate counters render as "0%" without JS, so its rate is unknown.

### 3.13 AI grant tools

| Tool | Market | Price | Proof and positioning | Channels seen |
|---|---|---|---|---|
| **Granted AI** (grantedai.com) | Mostly US (140K+ grants, 133K foundations, NIH/NSF), but it has programmatic UK competition pages | $29/month Basic, **$89/month Professional ($57/month billed annually)**. "Win a grant in 12 months or get a full refund" if 3+ proposals are submitted. It says a grant writer costs "$5K – $15K per proposal". https://grantedai.com/pricing VERIFIED (rendered) | It ranks #13, #14 and #29 on BridgeAI with UK pages. VERIFIED | Google Ads conversion tag (AW-1025794968) in the HTML. VERIFIED. The Transparency check hit a 429 |
| **ZenGrants** (zengrants.co) | UK, Innovate UK | £69 or £99 per month (£55 or £79 on an annual plan). It claims "grant consultants charge £5K–£15K per application". https://www.zengrants.co/pricing VERIFIED, https://www.zengrants.co/ CLAIMED | Comparison and blog content. #8 on "innovate uk grant success rate" | 0 Google ads, 0 Meta ads. VERIFIED |
| **EchoGrant** (echogrant.com, "Powered by Cavefish") | UK SMEs and charities | Free score in 30 seconds with no signup. £250 full assessment. **Done for you from £2,500, with 50% refunded if not shortlisted.** No success fee. https://echogrant.com/ VERIFIED | **#1 on "innovate uk grant success rate"**, #3 on "grant writing services uk". It publishes the comparison page "Best Grant Writing Services UK", which states "Five to fifteen per cent of the award is common" as the success fee norm. CLAIMED | 0 Google ads, 0 Meta ads. VERIFIED |
| **GrantSpark** (grantspark.ai) | UK | Free early access. "Never takes success fees". It scrapes your website and fit scores 267 live grants. https://www.grantspark.ai/pricing VERIFIED | Not in the SERPs I ran | 0 Google ads, 0 Meta ads. VERIFIED |
| **GrantIQ** (grantiq.co.uk) | UK and EU | Free, then **£39 per month** Starter, **£149 per month** Professional, which is "for consultants" and multi client. https://grantiq.co.uk/pricing VERIFIED | #5 on "innovate uk grant success rate" with a blog post | 0 Meta ads. VERIFIED |

INFERRED: AI tools compete on **price anchoring** (each one quotes the £5k to £15k consultant fee) and **instant scoring**. None shows meaningful paid acquisition in the UK. Their SEO weapon is programmatic competition pages.

---

## 4. The adjacent R&D tax market and what transfers

| Firm | Growth pattern seen | Source and label |
|---|---|---|
| **ForrestBrown** | **Accountant channel as a product.** A dedicated "R&D accountant partners" page with a named liaison, the "R&D bites" newsletter, webinars and in person events, and accountant case studies (Old Mill "Top 40 firm", HSJ Accountants, Freestone Jacobs). | https://forrestbrown.co.uk/r-and-d-accountant-partners/ VERIFIED |
| | **Research as PR to the channel.** A survey of 250 UK accountants (Censuswide, May 2025, published 19 Aug 2025). For example, 80% say claims take longer than a year ago. | https://forrestbrown.co.uk/news/accountant-r-and-d-survey-2025/ VERIFIED |
| | **Paid search at scale.** About 300 Google ads (UK, any time), mostly local "Maps" style search ads for "R&D Tax Relief" and "Claim R&D Tax Relief". | https://adstransparency.google.com/advertiser/AR14709604106457055233 VERIFIED |
| | **Moving into grants** with a grant finder (9 pages), a "Grant Scan" newsletter and a fee model of a fixed fee for step 1, then a % of the grant offered. Wins listed range from £300k to £38m. | https://forrestbrown.co.uk/grant-advisory-and-application-support/ VERIFIED as text. Wins CLAIMED |
| | Trustpilot shows 2.8 out of 5 from 3 reviews. | https://uk.trustpilot.com/review/forrestbrown.co.uk VERIFIED |
| **Kene Partners** | **Review engine.** Trustpilot shows 4.8 out of 5 from 56 reviews (21 in the last 12 months), on a paid plan, with invited reviews and replies to nearly all of them. | https://uk.trustpilot.com/review/kene.partners VERIFIED |
| | **Grants as an SEO land grab.** 189 `/grants/` pages, **weekly Grant Alerts every Tuesday**, a monthly newsletter and a "free eligibility scorecard" that takes "less than 5 minutes" across R&D tax, grants and patent box. | https://kene.partners/sitemap.xml VERIFIED. https://kene.partners/rd-innovation-grants CLAIMED |
| | Google ads shows 0. | VERIFIED |
| **Lumo** (lumo.tax, Durham) | **Accountant referrals with tools for the partner.** Accountants "benefit financially from every eligible claim made through your referral" and get training, case studies and **an eligibility checker for their clients**. There is a public calculator, a podcast and trade body tie ups (NEAA, NEPIC, from search results, not opened). | https://lumo.tax/partner-with-us/ VERIFIED. https://lumo.tax/rd-tax-credit-calculator/ VERIFIED |
| | 3 Google ads, an AW conversion tag and HubSpot. | VERIFIED |
| **Catax** | **Acquired, then dissolved into Ryan.** It was bought by Ryan in 2022. Catax then bought Access2Funding (2022) and Granted Consultancy (2023). By 2026 its domain 301s into a generic Ryan page. Trustpilot for the merged Ryan profile is 2.7. | Section 3.6, VERIFIED |

What transfers to grants (INFERRED from the evidence above)
1. **Accountants are the distribution channel in R&D tax, and the grant firms are copying it through ownership.** TBAT sits inside Dains, Streets Innovation inside Streets, and Granted inside Ryan. The independents (GrantTree, Myriad, Inventya, GrantUp) run referral schemes, but only Inventya publishes the reward (5% of the first year invoice). ForrestBrown's playbook is the model: liaison, newsletter, CPD style events, partner case studies and an annual survey.
2. **Calculators and instant checkers are standard in R&D tax** (Myriad, TBAT, GrantTree, Lumo, Kene, GrantUp). In grants the equivalent is the eligibility quiz. GrantTree gates its quiz behind a work email, GrantUp's is "no email", and EchoGrant gives a free 30 second score. A grants specific *value* calculator, of the "what would a £X grant at 70% intervention mean for runway" kind, is not visible at any of these firms.
3. **Reviews compound.** Leyton (212) and Kene (56) invest in Trustpilot. Every pure grants firm except GrantUp has zero.
4. **Advance funding is the bundle.** GrantTree and Fundsquire both pair winning with cash flow.

---

## 5. Channel by firm summary

Key: ● means strong evidence, ◐ means some, ○ means none found. Every cell traces to section 3 or 4.

| Firm | Competition SEO and alerts | Lead magnet | Partners and referral | Paid search (Google) | Paid social (Meta) | LinkedIn and events | Public pricing | Reviews (Trustpilot) |
|---|---|---|---|---|---|---|---|---|
| GrantTree | ● 279 posts, monthly Grants Watch | ● 8 question quiz (gated) | ◐ partner discounts, Fundsquire | ● 36 ads, almost all R&D tax | ○ | ◐ 4.7k followers, low cadence | ◐ terms only | ○ 0 |
| RedKnight | ● 434 posts, #1 NIHR | ◐ Grant Matcher (affiliate) | ○ | ○ 0 | ○ | ◐ 1.1k followers, frequent call posts | ◐ model, no numbers | ○ 0 |
| TBAT | ● 300 posts + 204 call pages | ◐ checklist, free monthly clinics | ● Dains, referral scheme, Eagle Labs, law firm | ○ 0 | ○ | ● 4.9k followers, Innovation Challenge, webinars | ○ | ○ 0 |
| Inventya | ● 583 call pages | ◐ members content | ● IUK Business Growth NW, EEN, 5% referral | ○ 0 (AW tag present) | ○ | ◐ awards, conferences | ○ (terms only) | ○ 0 |
| Myriad | ◐ 2026 news, little on grants | ○ for grants | ◐ referral fee scheme | ◐ 1 ad | ○ | ○ 700 followers, no grant posts | ● R&D tax only | ○ 0 |
| Ryan (Catax, Granted) | ○ | ○ | ○ | ◐ 15 ads, 1 grant | n/t | n/t | ○ | ◐ 2.7 / 144 |
| Leyton UK | ○ (grants dropped) | ● R&D white paper, webinars | ● co-branded partner programme | ? did not load | ○ | n/t | ○ | ● 4.6 / 212 |
| Fundsquire | ○ | ○ | ◐ advisor partner list | ? did not load | ○ | n/t | ○ | ○ none |
| GrantUp | ● 213 grant pages, #1 for "services" | ● 9 question checker (no email) | ● SETsquared, Grow London Local | ○ 0 | ● 6 ads since 14 Sep 2026 | ◐ 1.9k followers | ● £1,750+ setup + success fee | ● 4.1 / 26 |
| Tatton | ◐ live opportunities | ◐ free assessment | ◐ accelerators (CLAIMED) | n/t | n/t | n/t | ● £3,500 + 7 to 12% | ○ no profile |
| IUK Business Connect | ● 1,935 opportunity pages, 1,668 events | ● guides | public body | n/a | n/a | n/a | free | n/a |
| AI tools | ◐ programmatic pages | ● instant score or free tier | ○ | ○ | ○ | n/t | ● £39 to £149 per month, $29 to $89 per month | n/t |

n/t means not tested. ? means the tool failed to load.

---

## 6. Pricing norms (what is actually published)

| Model | Who | Numbers | Label |
|---|---|---|---|
| Setup fee + success fee | GrantTree, RedKnight, GrantUp, Tatton, Inventya | GrantUp **from £1,750** setup. Tatton **from £3,500 + 7 to 12%**. GrantTree and RedKnight do not publish numbers. RedKnight scales its upfront fee to the page limit. | VERIFIED |
| Success only review | Tatton | **£0 + 10 to 15%** | VERIFIED |
| Retainer for serial applicants | Tatton, GrantUp, Inventya | Tatton **£1,495 per month + 8%**. GrantUp runs a 6 month "Unlimited" retainer, price not published. Inventya bills retainers monthly in advance. | VERIFIED |
| Fixed fee, no success fee | EchoGrant | **£250** assessment, **from £2,500** done for you, 50% refund if not shortlisted | VERIFIED |
| Fixed fee then % of grant offered | ForrestBrown | Not published | VERIFIED as structure |
| Software | ZenGrants, GrantIQ, Granted AI | £39 to £149 per month, $29 to $89 per month | VERIFIED |
| Market norm claims | EchoGrant | "Five to fifteen per cent of the award is common" | CLAIMED |
| Market norm claims | ZenGrants, Granted AI | Consultants charge £3k to £15k upfront, or $5k to $15k per proposal | CLAIMED |
| No win no fee | RedKnight explicitly refuses it. Tatton claims to be the "Only 'No-Win, No-Fee' Innovate UK Provider" while publishing a £3,500 minimum for full applications. Inventya's fees are "not conditional upon the success". | | VERIFIED as text |
| Contract traps the EIC Board warns about | Success fees are "often tapered", consultant fees "are not eligible costs", and the applicant "remain[s] liable to pay the fee" if they do not sign the grant. Watch exclusivity and IP clauses. | https://eic.ec.europa.eu/document/download/9d67cfb3-25e0-4dfb-958b-b5d80d74ed7f_en (PDF, 28 Feb 2025) | VERIFIED |
| R&D tax benchmark (adjacent) | Myriad publishes 15% falling to 1% tiered, with a minimum of £5k. GrantUp R&D is "typically 10%". Myriad's industry page puts the market at 15 to 30% of benefit. | https://www.myriadassociates.com/pricing/rd-tax-credits-pricing/rd-tax-consultancy-fees-prices-costs-in-the-uk/ | VERIFIED as text, figures CLAIMED |

**Stated win rates** (all CLAIMED, none audited). GrantTree "65%+" or "over 60%". RedKnight 36.3% on the homepage and 38 to 50% in the FAQ. GrantUp above 90% per engagement and above 80% per application "where we accepted the engagement". Tatton 90%+ per engagement and 75% first time. The market base rate is about 4.4% on Smart (FOI 2022). INFERRED: the high numbers are all filtered ("accepted engagements"), and only RedKnight publishes a number that looks unfiltered.

---

## 7. Gaps BidX could exploit (INFERRED unless a source is given)

1. **Paid acquisition is almost empty for grants.** Among every grants firm checked, only GrantUp runs Meta ads, and only since 14 Sep 2026. On Google, GrantTree's 36 ads are almost entirely R&D tax, and RedKnight, TBAT, Inventya, GrantUp, Kene, EchoGrant, ZenGrants, GrantSpark and BidX itself show 0. The Meta keyword "innovate uk grant" returns no ads. (Sections 3.1, 3.10 and 3.13, all VERIFIED.)
2. **Reviews are a vacuum.** GrantTree, RedKnight, TBAT, Inventya and Myriad all have **0 Trustpilot reviews**. A deliberate review engine on the Kene model could become BidX's proof moat quickly.
3. **The free route is partly shut.** IUK Business Growth has paused new requests, and Smart has been paused since January 2025. Content that answers "what replaced Smart" and "where do I get help now" serves stranded demand.
4. **Orphaned brands and books.** Catax and Granted are folded into a generic ryan.com page with no grant proof and no lead magnets, and the Ryan Trustpilot score is 2.7. Leyton UK has dropped grants entirely, so `/uk/grants/` now redirects to patent box. Both firms have large R&D tax client bases with no visible grant offer. That makes them referral or white label targets, along with R&D tax only firms such as Lumo.
5. **The accountant channel in grants is underbuilt for independents.** Only the accountancy owned practices (TBAT in Dains, Streets Innovation) have it structurally. A published referral fee, a no poaching promise and a ForrestBrown style partner newsletter and CPD session would be first in the grants niche. ForrestBrown's own guidance on what accountants expect stresses visibility, flexible scope and fees tied to outcome. https://forrestbrown.co.uk/news/what-accountants-expect-from-r-and-d-tax-partners/ VERIFIED.
6. **London ecosystem partnerships.** GrantUp already holds Grow London Local (London & Partners) and SETsquared. TBAT holds Barclays Eagle Labs (Midlands). London accelerators, university incubators and the Fundsquire style lenders are the obvious next targets for BidX.
7. **Auditable proof.** Competitors' headline numbers contradict themselves on their own pages: GrantTree's £500m vs £400m and 65% vs 60%, RedKnight's two counter sets, Myriad's 15/15 claims. A published, checkable win list, for example linked to public UKRI award records, would stand out.
8. **Speed on new competitions.** BridgeAI opened today. RedKnight, GrantUp, TBAT and Granted AI already rank with pages for it, and GrantTree publishes 8 to 14 call posts a month. Winning a competition query means publishing within days of the briefing, plus an alert list.
9. **Gated vs ungated tools.** GrantTree gates its quiz behind a work email. GrantUp and EchoGrant are open. Nobody offers a grant value or runway calculator, and nobody offers a score against the live call's actual assessment questions *before* a sales call.
