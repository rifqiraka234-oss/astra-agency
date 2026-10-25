# Research, Qasim Abbas Mirza, EQ Nexus, ctc_v9emK8ZL5pcaLB4b6, 2026-10-25

Session astra-agency-cf (24052593), research 13.18 to 13.40 UTC. Scratch evidence in
/tmp/claude-0/-home-user-astra-agency/24052593-7323-58b2-9e3f-744f7080d43c/scratchpad/leads/eqnexus/ (lemlist raw pulls,
Companies House pages, both crawls, site-audit JSON and screenshots, full page renders in r1/ and r2/, the LinkedIn company
page rendered in rli/ and fetched raw in li_company_raw.html, the Rozee job post in rroz/, Enfixo and two US competitor
pages, the recheck/ folder from 13.38 UTC).

## In plain words

EQ Nexus is a 14 month old London registered company that places remote paralegals, working from managed offices in
Pakistan, with law firms for a fixed monthly fee (£799 a month on the site, $999 a month for US firms on LinkedIn). Qasim
founded it and owns it outright. On LinkedIn the company now sells to UK and US firms, and since 5 Oct it also sells
marketing to law firms (social media, content, personal branding, SEO, website development and redesign). The website still
only talks to UK firms in pounds and SRA terms, and says nothing about the US or the new marketing line. Raka's angle,
"website and gtm to get more sales", is drafted as a US sales system, an AI outreach workflow that books consultations with
US firms plus a US page on the site.

**Raka should know before he reads the draft.** (1) Since 5 Oct EQ Nexus sells website development, SEO and social media
to law firms, so it now partly sells what we sell, which is on the don't pitch list in docs/gtm-plan.md. Their own site was
built by Enfixo Technologies, a Pakistani software agency that also sells AI automation. That's why the draft leads with
outbound to US firms, which neither EQ Nexus nor its lead generation page does, and keeps the website part to one US page.
(2) The model is close to a staffing firm ("We recruit top-tier paralegals and deliver their expertise through a flexible
non-employment model"), and recruiters are on the same list. (3) It's small and young, sole director born 1998, a virtual
office address, 4 employees shown on LinkedIn, first accounts not filed yet, so budget is the weak point.

## Thread and never messaged checks

- `python3 tools/lemlist.py thread ctc_v9emK8ZL5pcaLB4b6`, 13.18 UTC and again 13.38 UTC. Control ctc_ch3vFcKAkjQdMKDCg
  6 items ok both times. This lead 0 items, all pages.
- `GET /api/contacts/ctc_v9emK8ZL5pcaLB4b6`, one campaign only, cam_BRBXAzzDKMfC4fSCS (W5 TEST 50 Owners of clinics, law and
  accounting firms, GDPR), leadId lea_R66GcGeDjEGpzHHP2, leadStatus "LinkedIn invite accepted".
- Inbox, both pages of `GET /api/inbox` read, 174 conversations, no Qasim, Mirza, Nexus or eqnexus anywhere in them
  (Lisanne and the Noah control both present).
- State grep. Only the 25 Oct RESEARCH_QUEUED row in state/silent_accepted_queue.jsonl, row 3 of state/next_batch_ranked.md,
  and an old test record in state/people_db_test50_2026-10-05.json (leadId lea_MbfaAD6iWD3QyBjap, a test DB, not a campaign).
  No SENT row anywhere.

## The lemlist record against itself (RULES 0B)

jobTitle "Founder", companyName "EQ Nexus", companyDomain eqnexus.org, tagline "Founder, EQ Nexus | Helping UK & US Law
Firms Build Dedicated Legal Support Teams", location United Kingdom. Tagline, company and domain agree. No "former", no
second employer.

## The person, outside lemlist

- Companies House, EQ NEXUS LIMITED 16661644, incorporated 20 Aug 2025, active, SIC 82990, registered office Office 253, 60
  Tottenham Court Road, Fitzrovia, London W1T 2EW. One officer, MIRZA, Qasim Abbas, director since 20 Aug 2025, born April
  1998, identity verified. PSC, the same man, 75% or more of shares and votes. First accounts due 20 May 2027, confirmation
  statement 17 Aug 2026 with no updates.
  https://find-and-update.company-information.service.gov.uk/company/16661644/officers and /persons-with-significant-control,
  read 13.20 UTC.
- The site ties the company to him twice. https://eqnexus.org/who-we-are and https://eqnexus.org/founder-qasim name "Qasim
  Abbas Mirza - Founder", and https://eqnexus.org/contact gives the same Office 253, 60 Tottenham Court Road address as the
  register. The privacy policy says "Our operations are based in Pakistan".
- His background per the site, an associate at RIAA Barker Gillette (Pakistan), cross jurisdictional UK, UAE and Pakistan.
- LinkedIn /in/qasim-abbas-mirza, 999 on curl and on tools/fetch-walled.py (firefox). Web search on his name with EQ Nexus,
  nothing. Search for linkedin.com/posts with his slug, nothing. Google News on his name, 0 (control Tesco 102).

## The site, both passes

`python3 tools/crawl.py https://eqnexus.org`, pass 1 and pass 2, 25 URLs each (23 at 200, two 404s, a Cloudflare email
protection page and /gdpr lowercase, the real page is /GDPR). No sitemap (404), robots.txt allows all. Every page read.
`node tools/site-audit.js https://eqnexus.org eqn`, render trusted, 5 of their own assets 404 on a second fetch too
(template leftovers named demo-lawyer-home-icon and the favicon). Full page renders desktop and iPhone 13 of the home,
pricing, contact, FAQs, blog, careers, lead generation, our advantage, who we are, real estate, founder and how it works,
all opened.

What the site is, as a whole.
- A custom build (XSRF-TOKEN and eqnexus_session cookies, Laravel style), "Developed by Enfixo Technologies", "© 2025 eqnexus.org". A dark hero slider with stock
  photos of lawyers, three slogans ("AI Does Not Take Responsibility We Do"), then "Office Based Paralegals £799/Month",
  six practice areas (housing disrepair, real estate, corporate and commercial, family, personal injury, immigration), the
  founder card and his quote. The look is current. It isn't the angle.
- One action, "Book a Free Consultation", a form posting to /book-consultation with name, email, mobile, organisation,
  date, a time slot (09AM to 09PM), designation, number of paralegals and a comment. "Book Free Strategy Call" too.
- Audience, UK firms only. "EQ Nexus delivers dedicated paralegal support designed for UK law firms" (home), the vision "the
  most trusted growth partner for law firms in England and Wales" (/who-we-are), "law firms primarily in England and Wales"
  (/term-condition), pricing against an in house paralegal at "£26,000 - £32,000+ Annually" with "PAYE, National Insurance,
  Pension Contributions" (/pricing), "SRA/GDPR Aligned" (home). 0 hits for US, USA, United States, America or $ on all 23
  pages crawled twice and in the raw HTML of 10 pages. Positive control, the same grep gives 10 on the LinkedIn company HTML
  and 2 on staffvirtual.com.
- Proof. No named client firm, no testimonial, no case study on any page. Stats that disagree, home "96% Retention Rate,
  98% Satisfaction Rate", /our-advantage "100% Customer Retention with 99% Satisfaction Rate" and "97% Employee Retention".
- Leftovers. /FAQs carries six Lorem Ipsum answers about "orders" in a tab that isn't shown by default (raw HTML has them,
  the rendered default tab doesn't). /blogs is "Our Blog is Coming Soon" while /legal-content-writing sells blog writing to
  law firms. Small, kept as proof, never the angle.
- How they sell, as their own pages show it. A referral incentive for clients, "£50/Referral/Month for 12 months"
  (/pricing). Careers lists "Sales Partner (UK Focused), Commission based contractors, No cap on clients, Recurring
  commission (Upto 24 months)" next to "Paralegal (Pakistan)". They also sell "Lead Generation" to law firms, consumer
  enquiries for family, immigration and conveyancing ("targeted forms, relevant content funnels and optional call
  vetting"), and "Legal Content Writing".
- Contract terms disagree too. /term-condition and /pricing say a three month rolling contract at £799 per paralegal,
  /FAQs says "No long-term contracts are required ... hourly, daily, or monthly", /how-works says hourly, per project or
  monthly retainer.

## LinkedIn company page, social, the GTM side

- https://www.linkedin.com/company/eq-nexus , rendered in Chromium (rli/) and fetched raw with tools/fetch-walled.py
  (li_company_raw.html), both agree. Tagline "Dedicated, Fully Managed Paralegal & Marketing Support for UK & US Law Firms".
  About "EQ Nexus works with law firms across the UK and US ... From social media management and legal content creation to
  personal branding, SEO, website development and redesign ... For enquiries, contact info@eqnexus.org or visit
  eqnexus.org." 1,192 followers, 4 employees shown, size band 11-50, founded 2025.
- Posts, dated from the page's own datePublished. 29 Sep small firms. 2 Oct "getting ready to launch a new service ... To
  the clients who have already trusted us with it, thank you". 5 Oct "We're launching marketing services at EQ Nexus".
  10 Oct "Previous UK/US legal experience" poll. 12 Oct and 17 Oct referrals posts. 14 Oct "US median paralegal salary in
  legal services: $61,770. EQ Nexus junior paralegal support: $999/month". 19 Oct "Your website might gets visitors. So why
  isn't your firm getting more inquiries?". 21 Oct admin load. 24 Oct plain language. Reactions 3 to 9 per post. An older
  post, "work full UK or US hours". Every post's call to action is a DM.
- Rozee.pk, "Employment Law Paralegal | Lahore, Pakistan | EQ Nexus", published 30 Jul 2026, "at least three years of
  paralegal experience, particularly within a U.S. law firm environment handling employment law cases", discovery,
  depositions. https://www.rozeegpt.ai/seeker/eq-nexus-employment-law-paralegal-151565 rendered in Chromium 25 Oct ("This employer is
  no longer accepting CVs"). So US firms are
  a live market, not a plan.
- `node tools/social-audit.js eqn`. Instagram https://www.instagram.com/eqnexusofficial/ 6 followers, 44 posts, newest
  2026-10-25. Facebook https://web.facebook.com/profile.php?id=61578348991794 3 followers, post dates behind login.
  LinkedIn via the /about/ link UNKNOWN, retried with `--urls https://www.linkedin.com/company/eq-nexus`, 1,192 followers.
- Google Ads Transparency, 0 ads on eqnexus.org (tools/eu-view.py --ads). A Meta pixel is installed.
- Enfixo Technologies, https://enfixo.com/ , "Software & Digital Product Development", web, app, AI chatbots and agents,
  process automation, SEO. The incumbent for their site.

## News, region, industry

- tools/news.py en, "EQ Nexus" 1 (an unrelated 2023 Nature paper), "Qasim Abbas Mirza" 0, control Tesco 102.
- Regional (UK OR London) legal outsourcing, 47, Freshfields paralegal redundancies (RollOnFriday 12 Sep 2025 and 24 Apr
  2026), A&O Shearman cutting support teams (RollOnFriday 8 May 2026), "Is This the End of the Big Law Back Office?" (Law.com
  30 Nov 2025).
- US, (United States OR US) offshore or virtual paralegal, 17, the HIRE Act proposal on outsourcing payments (McDermott Will
  & Schulte 1 Oct 2025), LPO market sizing (Fortune Business Insights 6 Nov 2025).
- US competitors opened at source. Legal Soft "Get a Case Manager & Paralegal for $1,497/Month"
  (https://www.legalsoft.com/impact-on-your-law-firm), StaffVirtual "Legal Process Outsourcing (LPO) for Law Firms", US law
  wording (https://www.staffvirtual.com/industries/law-firms). Both sell to US firms in dollars on US facing pages.
- Wayback Machine, connection reset on curl, 502 on fetch-walled, refused on WebFetch. Walled, so the site's age rests on
  "© 2025" and the Aug 2025 incorporation.

## GDPR sweep, never the angle

site-audit from Ohio, no banner, no consent code at all, so no geo rule. tools/eu-view.py from Stockholm, 3 first party
cookies including _fbp, 18 requests to 5 third party hosts including connect.facebook.net and www.facebook.com, before any
click. A Meta pixel firing before consent for a UK or EU visitor. A 50 euro fix, kept as a note.

## Pain table

| # | Pain | Proof | Cost to him | Would he name it | Incumbent or trap | Verdict |
|---|---|---|---|---|---|---|
| 1 | The US is a live market on LinkedIn and in hiring, the site only talks to UK firms, and no US route exists beyond LinkedIn posts | LinkedIn About and 14 Oct $999 post, Rozee 30 Jul, 0 US hits on 23 pages with control, Sales Partner "UK Focused", 0 Google ads | Every US firm that checks the site or never sees a post, at $999 a month per paralegal, recurring | Yes, it's the market he's opening | Not what they sell (their lead gen is consumer enquiries, their marketing is inbound for law firms). Enfixo could build it, nothing shows it in hand | CHOSEN, hottest and biggest |
| 2 | The 5 Oct marketing line (social, personal branding, SEO, website development) isn't on the site | LinkedIn About and 5 Oct post, 0 hits for social media, personal brand or website development on the site, control 3, 3 and 1 on LinkedIn | Marketing clients who check the site | Likely | They sell websites now, pitching a site to them is the trap | Not chosen |
| 3 | No proof, no named firm, testimonial or case study, stats that disagree | 23 pages, 0 hits | Trust for a firm handing files to a remote team | Maybe | Law firm clients may refuse to be named, NDA trap | Not chosen |
| 4 | Lorem Ipsum FAQs in a hidden tab, blog Coming Soon, contract terms that disagree | /FAQs raw HTML, /blogs, /term-condition against /FAQs | Small | No | 50 bucks test fails | Proof only |
| 5 | Meta pixel before consent | eu-view.py Stockholm | Small | No | Compliance fix | Never the angle |
| 6 | Founder runs sales, recruiting and HR for placed paralegals | Sole director, 4 employees, commission partners | Hours | Maybe | Invisible inside | Not chosen |
| 7 | Build Squad for their new website development service | LinkedIn About, Enfixo credit | Capacity | Maybe later | Enfixo is already their builder | Not chosen |

## The draft and its owner reply

Drafted in state/drafted_2026-10-25-angle-eqnexus.md, SKETCH shape, Astra line "we build websites and AI workflows". The
likeliest no is "We build websites and do marketing ourselves now". The offer's core is outbound to US firms, which neither
their marketing (inbound for law firms' clients) nor their lead generation (consumer enquiries) covers, and their own site
still shows neither the US offer nor the 5 Oct launch, so it isn't in hand. Confidence MEDIUM.
