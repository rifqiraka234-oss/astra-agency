# ASTRA PROSPECT RESEARCH & EVIDENCE MASTER

**Companion to:** `ASTRA_COMMERCIAL_ANGLE_MASTER.md`  
**Purpose:** Tell an AI agent exactly how to research a prospect deeply enough to choose the strongest Astra commercial angle with very high confidence, while distinguishing verified evidence from inference and refusing to invent business problems.

**Status:** Canonical prospect-research operating manual  
**Version:** 1.0  
**Date:** 2 September 2026  
**Internal / confidential**

---

# 0. THE MISSION

Your job is not to find a clever observation.

Your job is to answer, as accurately as public evidence allows:

1. **What does this company actually do?**
2. **Who buys from it, uses it, influences it and pays for it?**
3. **How does the company appear to make money?**
4. **What stage is the business at?**
5. **Is it growing, shrinking, changing direction or stable?**
6. **What is the company publicly trying to achieve now?**
7. **What customer-facing, operational, innovation or delivery bottlenecks are actually evidenced?**
8. **Which of those bottlenecks has the highest commercial consequence?**
9. **Can Astra credibly solve it?**
10. **Why is that angle stronger than the alternatives?**
11. **What evidence could prove the angle wrong?**
12. **What remains unknown and must be validated before pitching?**

The desired standard is **very high practical confidence**, not fake mathematical certainty.

Never claim “95% statistically certain” unless there is a genuine statistical basis.

Instead, use this operating interpretation:

> **95%+ CONFIDENCE STANDARD = enough independent, current, high-quality evidence that a reasonable expert would be surprised if the central diagnosis were materially wrong.**

If this standard cannot be met, say so.

Possible outcomes:

- `HIGH_CONFIDENCE_ANGLE`
- `GOOD_ANGLE_WITH_MINOR_UNCERTAINTY`
- `VALIDATE_FIRST`
- `DIFFERENT_LONG_TERM_ANGLE`
- `NO_STRONG_ANGLE`

---

# 1. THIS DOCUMENT'S ROLE

The Astra AI system should use three separate layers:

### Layer 1 — Astra context
What Astra is, how it works, what it sells, commercial model, positioning, tone and guardrails.

### Layer 2 — This research master
How to discover and verify what is true about a particular prospect.

### Layer 3 — Commercial angle master
How to convert verified research into competing Astra opportunities and select the strongest one.

The order matters.

**Research first. Diagnose second. Sell third.**

Never start by selecting an Astra service and then search for evidence that justifies it.

---

# 2. ABSOLUTE RESEARCH RULES

1. Verify the correct legal/company identity before analysing.
2. Verify the person and current role.
3. Verify the official domain.
4. Use current information.
5. Open the actual website; search snippets are discovery aids, not sufficient analysis.
6. Review multiple relevant website pages.
7. Review recent company activity.
8. Review the decision-maker's public activity when available.
9. Search for evidence outside the company's own marketing.
10. Separate:
   - verified fact;
   - company claim;
   - directly observed user experience;
   - inference;
   - hypothesis;
   - unknown.
11. Search for evidence that contradicts your preferred angle.
12. Prefer two independent supporting signals for any important inferred problem.
13. Do not infer internal inefficiency solely from industry stereotypes.
14. Do not infer financial health from visual polish.
15. Do not infer growth from one job vacancy.
16. Do not infer demand from social-media activity alone.
17. Do not infer poor conversion from a weak-looking website without conversion data.
18. Do not infer “manual work” merely because an email address is available.
19. Do not infer founder dependency merely because the founder posts frequently.
20. Do not infer a need for Build Squad merely because developers are being hired.
21. Treat third-party estimates as supporting evidence, not ground truth.
22. Treat AI-generated company summaries as leads to investigate, not authoritative facts.
23. When reliable evidence conflicts, investigate the conflict.
24. When a critical unknown remains, downgrade confidence.
25. It is better to return `NO_STRONG_ANGLE` than manufacture a pitch.

---

# 3. SOURCE HIERARCHY

Not all sources deserve equal trust.

Use this hierarchy when deciding what a fact is worth.

## TIER A — PRIMARY / AUTHORITATIVE

Highest weight.

Examples:

- official company website;
- official product documentation;
- official pricing;
- official careers pages;
- official press releases;
- company filings;
- regulator databases;
- official corporate registries;
- annual reports;
- investor presentations;
- government procurement records;
- official app-store listings controlled by the company;
- official customer portal/help centre;
- direct public statements by named executives.

Use Tier A to verify:

- company identity;
- product/service offering;
- locations;
- legal existence;
- leadership;
- official claims;
- current launches;
- jobs;
- public strategy;
- formal partnerships;
- financial or company-record facts where available.

Important:
A company's own claims are authoritative about **what the company says**, but not automatically proof that the claim is objectively true.

---

## TIER B — STRONG FIRST-PARTY / PLATFORM DATA

Examples:

- LinkedIn company page;
- LinkedIn Sales Navigator;
- LinkedIn founder/employee profiles;
- LinkedIn job listings;
- company posts;
- employee counts and headcount-growth indicators;
- GitHub organisation controlled by the company;
- public product changelog;
- marketplace/vendor profiles controlled by the company.

Useful for:

- headcount;
- growth direction;
- hiring;
- functional investment;
- leadership changes;
- company positioning;
- product activity;
- timing signals.

LinkedIn caveat:
Employee/headcount information is based on member profiles and platform data. It is valuable directional evidence, not an audited workforce count.

---

## TIER C — INDEPENDENT HIGH-QUALITY SOURCES

Examples:

- reputable business press;
- established trade publications;
- government or university coverage;
- recognised industry bodies;
- partner/customer announcements;
- credible interviews;
- conference speaker bios;
- investor/funder portfolio pages.

Useful for corroborating:

- funding;
- expansion;
- launches;
- partnerships;
- market entry;
- acquisitions;
- leadership changes;
- strategic priorities.

---

## TIER D — STRUCTURED COMMERCIAL DATA PROVIDERS

Examples:

- Crunchbase;
- Dealroom;
- PitchBook;
- Similarweb;
- Semrush;
- Ahrefs;
- BuiltWith;
- Wappalyzer;
- Apollo;
- Clay enrichment;
- Tracxn;
- other reputable company/technology datasets.

Useful for:

- discovering possible funding;
- approximate employee counts;
- technology stack;
- traffic trends;
- domain changes;
- market activity;
- company categorisation.

Rule:
Treat as **supporting / discovery evidence** unless corroborated.

Do not turn an estimated metric into a prospect-facing fact.

---

## TIER E — CUSTOMER / COMMUNITY EVIDENCE

Examples:

- Google Reviews;
- Trustpilot;
- G2;
- Capterra;
- app-store reviews;
- Reddit;
- industry forums;
- social comments.

Useful for:

- recurring customer questions;
- UX problems;
- onboarding friction;
- service issues;
- desired functionality;
- product confusion;
- expectation mismatch.

Rule:
One review proves one person's experience, not a systemic company problem.

Look for recurring patterns across multiple recent reviews.

---

## TIER F — EMPLOYEE-SENTIMENT SOURCES

Examples:

- Glassdoor;
- Indeed employee reviews;
- anonymous workplace forums.

Can reveal hypotheses about:

- systems;
- workload;
- management;
- process;
- growth;
- change.

But reliability is mixed.

Never pitch an operational problem as fact based solely on anonymous employee reviews.

---

## TIER G — SEARCH SNIPPETS / AI SUMMARIES

Examples:

- Google/Bing snippets;
- search-engine generated answers;
- LinkedIn Account IQ;
- generic AI summaries;
- scraped company databases with no transparent sourcing.

Use only to discover:

- keywords;
- events;
- possible pages;
- possible leads.

Then verify through better sources.

---

# 4. CURRENT HIGH-VALUE DATA SOURCES

## LinkedIn / Sales Navigator

When available, inspect:

- company headcount;
- company headcount growth over the previous 12 months;
- department headcount;
- department headcount growth;
- open job opportunities;
- recent account activity;
- leadership;
- employee composition;
- decision-makers;
- recent posts;
- recent role changes;
- geography;
- industry;
- company size;
- founder activity.

Sales Navigator's current account filters can expose company headcount growth, department growth, open jobs and recent activity.

This is especially useful for identifying **change**, but must be interpreted carefully.

---

## Dutch companies — KVK Handelsregister

For a Netherlands-based prospect, use KVK where relevant to validate:

- legal/trade name;
- existence;
- start date;
- activities;
- location;
- legal form;
- officials;
- branch information;
- working-person counts where available;
- filings and historical company information;
- annual accounts when available and worth the cost/research depth.

Do not assume an annual account describes the company's current condition; filings are historical.

---

## UK companies — Companies House

Useful for:

- incorporation;
- registered office;
- officers;
- filings;
- accounts;
- previous names;
- charges;
- insolvency-related information;
- company history.

Remember:
Filed information is public record, but even Companies House warns that filing accuracy is not fully verified by the registry.

---

## Private-market / funding databases

Crunchbase, Dealroom, PitchBook and similar tools can help discover:

- funding rounds;
- investors;
- acquisitions;
- employee estimates;
- founding dates;
- market categories;
- leadership changes.

Corroborate major events through:

- company announcement;
- investor announcement;
- reputable press;
- registry filing.

---

## Website traffic tools

Similarweb, Semrush and Ahrefs may provide:

- estimated visits;
- traffic trend;
- traffic sources;
- search visibility;
- competitor comparisons.

Important:
These are estimates.

For small websites, uncertainty can be large or the service may show insufficient data.

Never write:

> “Your traffic fell by 34%.”

unless the company itself publicly provides verified analytics.

Use instead:

> “Third-party traffic estimates suggest a downward trend, but this would need to be checked against your own analytics.”

Usually this belongs in internal analysis, not outreach.

---

## Technology detection

Use:

- BuiltWith;
- Wappalyzer;
- browser developer tools;
- public page source;
- network calls when accessible;
- job descriptions;
- documentation;
- vendor case studies.

Potentially detect:

- CMS;
- ecommerce;
- booking;
- CRM scripts;
- analytics;
- marketing automation;
- payments;
- customer portals;
- support software.

Caution:
Technology detection can be wrong, stale or incomplete.

The existence of a tool also does not prove the company uses it well.

---

# 5. THE RESEARCH DEPTH STANDARD

Do not stop after “website + LinkedIn.”

For a high-value personalised prospect, aim to understand the company from **at least five distinct evidence lenses**.

Recommended lenses:

1. Official website / product.
2. Company LinkedIn.
3. Founder / decision-maker LinkedIn.
4. Recent news / press / partnerships / launches.
5. Jobs / hiring / employee composition.
6. Customer voice.
7. Corporate / financial records.
8. Technology / product footprint.
9. Competitors / category baseline.
10. Traffic / search data when relevant.

Not every company will have evidence in every lens.

High confidence comes from **triangulation**, not from hitting a fixed number of websites.

---

# 6. MINIMUM RESEARCH STOP CONDITIONS

Do not choose a final angle until all of the following are answered.

## Identity
- Correct company? `YES/NO`
- Correct current person? `YES/NO`
- Correct role? `YES/NO`
- Correct official domain? `YES/NO`

Any `NO` or unresolved identity issue = stop.

## Business
- What is sold?
- Who buys?
- Who uses?
- How does revenue likely occur?
- Geographic market?
- Approximate stage / scale?
- Main commercial motion?
- Important audiences?

## Change
At least determine whether there is credible evidence of:

- growth;
- contraction;
- hiring;
- expansion;
- fundraising;
- product launch;
- rebrand/repositioning;
- acquisition;
- new market;
- leadership change;
- no notable recent change.

## Problem
For the winning angle, identify:

- one primary problem;
- who experiences it;
- where the evidence comes from;
- commercial consequence;
- at least one plausible alternative explanation;
- disconfirming evidence searched for.

## Astra fit
- Astra capability fit?
- likely budget/implementation fit?
- decision-maker relevance?
- angle stronger than alternatives?
- prototype useful or unnecessary?

If these cannot be answered, research is incomplete.

---

# 7. STEP 1 — IDENTITY RESOLUTION

Never analyse until identity is resolved.

Search:

- `[person full name] [company]`
- `[company] official`
- `site:linkedin.com/in "[person full name]" "[company]"`
- `site:linkedin.com/company "[company]"`
- `"[company]" "[city/country]"`
- official registry when relevant.

Confirm:

- current employer;
- current title;
- founder/owner/director status;
- company domain;
- city/country;
- whether several companies use the same name;
- whether the website is active;
- whether the person has moved;
- whether the company has renamed or pivoted.

### Identity hard failures

Stop and do not personalise if:

- person has left the company;
- domain belongs to a different business;
- company appears dormant;
- company was acquired and no longer operates independently;
- LinkedIn company and website describe materially different businesses and cannot be reconciled.

---

# 8. STEP 2 — BUILD THE BUSINESS MODEL IN PLAIN ENGLISH

Do not copy the tagline.

Answer:

### Offer
What exactly is sold?

### Buyer
Who signs/pays?

### User
Who uses the product/service?

### Influencer
Who influences the decision?

### Revenue mechanism
Examples:

- one-off project;
- recurring subscription;
- transaction fee;
- commission;
- retainer;
- licensing;
- advertising;
- sponsorship;
- ticketing;
- ecommerce;
- service hours;
- membership;
- usage-based;
- marketplace take rate.

### Sales motion
Examples:

- self-service;
- inbound demo;
- referral;
- founder-led;
- account-based;
- channel partner;
- ecommerce;
- tender;
- outbound sales.

### Delivery model
Examples:

- consulting;
- software;
- physical product;
- hybrid service/software;
- marketplace;
- agency;
- field service;
- manufacturing;
- logistics.

### Stage
Possible labels:

- pre-launch;
- pre-revenue;
- early;
- early traction;
- growth;
- established SME;
- mature;
- restructuring / contraction.

Do not guess the stage from age alone.

---

# 9. STEP 3 — WEBSITE RESEARCH: EXACTLY WHAT TO OPEN

Do not analyse only the homepage.

Open, when available:

1. Homepage
2. About
3. Product
4. Services
5. Individual service pages
6. Pricing
7. Industries / use cases
8. Customers / case studies
9. Partners
10. Contact
11. Demo / booking
12. Forms
13. Checkout
14. Signup
15. Login / portal entry
16. Help centre / FAQ
17. Documentation
18. Blog / resources
19. News
20. Careers
21. Investor page
22. Events
23. Legal/privacy/terms when relevant to understanding geography/product
24. Language variants
25. Mobile experience
26. External handoff platforms

Follow at least one realistic journey.

Example:

`Homepage → service → case → form → confirmation`

or:

`Homepage → product → pricing → signup`

or:

`Event → partner page → partnership enquiry`

or:

`Logistics service → quote → customer status`

---

# 10. WEBSITE QUESTIONS BY COMMERCIAL LAYER

## COMPREHENSION

- Can a new visitor explain the company after 5–10 seconds?
- Is the core offer concrete?
- Does the site use category jargon before explaining value?
- Are product/service names understandable?
- Does the visitor need prior industry knowledge?

Potential Grow angles:
G01 Offer Clarity, G02 Service Routing, G03 Audience Segmentation.

---

## AUDIENCE RECOGNITION

- Who appears to be addressed?
- Are multiple audiences mixed together?
- Are buyers, users, partners and investors given separate routes?
- Does each audience see relevant proof?

Potential angles:
G03, G12 Partner Acquisition, G13 Investor Comprehension, G14 Recruitment.

---

## DECISION SUPPORT

- Can someone compare offers?
- Is pricing or scope explained appropriately?
- Are case studies specific enough?
- Are objections answered?
- Is there proof at the point of decision?
- Is there a clear next step?

Potential angles:
G07 Proof Transfer, G08 Case Study Architecture, G16 Comparison, G17 Expectation Setting.

---

## CONVERSION

- What CTAs exist?
- Is one generic CTA used everywhere?
- Does a high-intent user reach the next step quickly?
- Does a low-intent user have a lower-commitment path?
- Are forms appropriately sized?
- Are external systems disconnected?

Potential angles:
G04 Intent Routing, G09 Booking Friction, G10 Lead Qualification, G21 Abandoned Handover.

---

## SELF-SERVICE

- Can customers answer routine questions themselves?
- Can they see status?
- Access documents?
- Update details?
- Submit structured requests?
- Book/change something?

Potential angles:
G19, O01, O02, O15, O18.

---

## POST-SALE

- What happens after purchase?
- Is onboarding visible?
- Are instructions clear?
- Is support reactive?
- Are reports delivered?
- Can customers see value/results?

Potential angles:
G18, O10, O11.

---

# 11. STEP 4 — LINKEDIN COMPANY RESEARCH

Review the company page for:

- current description;
- employee count;
- stated company size;
- headquarters;
- locations;
- specialties;
- website;
- recent posts;
- product announcements;
- customer wins;
- partnerships;
- awards;
- events;
- hiring;
- expansion;
- new leadership;
- acquisition;
- rebrand;
- fundraising;
- new markets.

If Sales Navigator is available, inspect:

- 12-month company headcount growth;
- department headcount growth;
- job opportunities;
- recent activities;
- account alerts;
- leadership changes.

Record dates.

### Do not say “growing” from one number alone.

A high-confidence growth conclusion should ideally have multiple signals, such as:

- positive 12-month LinkedIn headcount growth;
- several current open roles;
- expanding departments;
- announced market/product expansion;
- customer/contract growth;
- funding;
- office/location expansion;
- rising transaction/usage metrics publicly reported.

---

# 12. STEP 5 — FOUNDER / DECISION-MAKER LINKEDIN

Read enough recent activity to understand priorities.

Prioritise the previous 90–180 days, then go further back if needed for context.

Look for posts about:

- growth;
- hiring;
- customers;
- sales;
- partnerships;
- fundraising;
- operations;
- new products;
- customer complaints/questions;
- internal projects;
- scaling;
- automation;
- AI;
- digital transformation;
- websites/branding;
- market expansion;
- delivery capacity;
- freelancers/agencies;
- launches;
- delays;
- lessons learned;
- strategic changes.

Also inspect:

- title;
- time in role;
- prior relevant experience;
- whether they are likely economic buyer;
- whether another stakeholder is more appropriate.

### High-value founder language

Direct statements such as:

- “we’re hiring because…”
- “we’re expanding into…”
- “we are launching…”
- “we’ve outgrown…”
- “customers kept asking for…”
- “we currently do this manually…”
- “our biggest challenge is…”
- “we need to improve…”
- “we’re looking for a partner…”
- “we want to scale…”
- “we have more demand than…”

These can become very strong evidence.

Still preserve context and date.

---

# 13. STEP 6 — EMPLOYEE AND TEAM COMPOSITION RESEARCH

When available, inspect the organisation's visible employee mix.

Ask:

- Is sales expanding?
- Is marketing expanding?
- Is operations expanding?
- Is engineering expanding?
- Is customer success expanding?
- Is there a new product function?
- Are there new senior hires?
- Are many people newly joined?
- Is one department shrinking?

Possible interpretations:

### Sales/marketing hiring
May indicate growth ambition or demand-generation investment.

### Operations/customer service hiring
May indicate growing workload—but does not prove inefficient systems.

### Engineering/product hiring
May indicate product investment—but could reduce Build Squad need.

### Multiple implementation/project roles
May indicate delivery growth and possible capacity constraints.

### Repeated replacement roles
Could simply be turnover.

Do not overinterpret without supporting evidence.

---

# 14. STEP 7 — JOB POSTINGS: ONE OF THE BEST PROBLEM SOURCES

Job descriptions often reveal operational reality more clearly than marketing pages.

Search:

- company careers page;
- LinkedIn Jobs;
- Indeed;
- sector job boards;
- Google query:
  - `"[company]" jobs`
  - `"[company]" vacancy`
  - `"[company]" "Excel"`
  - `"[company]" "CRM"`
  - `"[company]" "ERP"`
  - `"[company]" "manual"`
  - `"[company]" "reporting"`
  - `"[company]" "coordinate"`
  - `"[company]" "customer enquiries"`

Look for phrases such as:

- maintain spreadsheets;
- update CRM;
- reconcile data;
- prepare weekly/monthly reports;
- manually process;
- coordinate orders;
- schedule technicians;
- handle customer status queries;
- manage shared mailbox;
- upload documents;
- consolidate information;
- create quotations;
- monitor stock;
- plan routes;
- collect approvals;
- liaise between departments;
- chase documents;
- maintain multiple systems;
- create presentations/reports from data;
- manage freelancer network.

### Interpretation rule

One job task = hypothesis.

Several roles mentioning the same repeated task + other evidence = stronger operational problem.

Example:

Job 1:
“Maintain order tracker in Excel.”

Job 2:
“Coordinate warehouse status with customers.”

Website:
No customer portal.

Help page:
Customers instructed to email for order status.

This combination strongly supports a customer-operations / workflow hypothesis.

---

# 15. STEP 8 — NEWS, PRESS, PARTNERSHIPS AND CHANGE EVENTS

Search:

- `"[company]" news`
- `"[company]" funding`
- `"[company]" investment`
- `"[company]" partnership`
- `"[company]" launches`
- `"[company]" acquisition`
- `"[company]" expansion`
- `"[company]" new office`
- `"[company]" contract`
- `"[company]" customer`
- `"[company]" 2026`
- `"[company]" 2025`

Look for:

- funding;
- acquisition;
- merger;
- major contract;
- product launch;
- new market;
- new office;
- rebrand;
- leadership change;
- major customer;
- new channel partner;
- certification;
- regulatory change affecting product;
- facility expansion.

These are strong **timing signals**.

A company may have had the same problem for years, but a change event can make it commercially urgent now.

---

# 16. STEP 9 — CUSTOMER VOICE

Search, where relevant:

- Google Reviews;
- Trustpilot;
- G2;
- Capterra;
- app-store reviews;
- Reddit;
- customer comments;
- social replies;
- public support forums.

Extract repeated patterns.

Possible categories:

- hard to understand;
- slow response;
- difficult booking;
- status uncertainty;
- confusing setup;
- missing feature;
- reporting gaps;
- billing confusion;
- support burden;
- unclear pricing;
- onboarding difficulty;
- unreliable information;
- navigation difficulty.

### Recurrence standard

Do not call something systemic based on one review.

Prefer:

- several independent recent reviews;
- same theme across different platforms;
- theme also visible in website/help flow;
- company itself acknowledges the issue.

Customer reviews are especially valuable when they corroborate an observed journey problem.

---

# 17. STEP 10 — HELP CENTRE, FAQ AND DOCUMENTATION

These sources reveal what customers repeatedly need help with.

Look for:

- “How do I check status?”
- “Contact support to…”
- “Email us if…”
- manual forms;
- PDF downloads;
- repeated data requests;
- workarounds;
- missing self-service;
- complex onboarding;
- integrations;
- account-management limits.

A large FAQ is not automatically a problem.

Ask whether the information reflects:

- genuine product complexity;
- poor UX;
- lack of self-service;
- regulatory needs;
- advanced user needs.

---

# 18. STEP 11 — COMPETITOR BASELINE

Research 2–5 realistic competitors or substitutes.

Purpose:

- understand category norms;
- identify expected decision information;
- detect differentiators;
- detect missing journeys;
- avoid criticising something normal for the category;
- see whether the prospect has a genuine opportunity to differentiate.

Do not use competitors merely to say:

> “Competitor X has feature Y, so you need it too.”

Ask:

- What questions do competitors help buyers answer?
- What self-service exists?
- What proof is standard?
- How do they segment audiences?
- What does this prospect uniquely do better?
- What competitor pattern should **not** be copied?

---

# 19. STEP 12 — TECHNOLOGY AND SYSTEM FOOTPRINT

Where useful, inspect:

- CMS;
- ecommerce platform;
- booking system;
- payments;
- CRM scripts;
- analytics;
- marketing automation;
- customer support;
- portal technology;
- product application;
- integrations.

Potential sources:

- BuiltWith;
- Wappalyzer;
- page source;
- browser network data;
- public docs;
- vacancies;
- vendor/customer case studies.

Use tech evidence to answer:

- Is the company digitally sophisticated?
- Is a proposed system already in place?
- Is the website likely easy/hard to extend?
- Is there a major platform migration underway?
- Are there fragmented tools?

Never infer an operational failure just because several tools exist.

---

# 20. STEP 13 — FINANCIAL AND COMPANY-HEALTH SIGNALS

Only use when relevant to lead qualification or timing.

Potential evidence:

- official filings;
- annual accounts;
- funding;
- acquisitions;
- revenue claims;
- customer counts;
- headcount change;
- layoffs;
- facility expansion;
- contract wins.

### Avoid false certainty

Revenue is not the same as budget.

Funding is not the same as willingness to buy.

Headcount reduction is not automatically distress.

A profitable established SME with flat headcount may be an excellent Astra prospect.

The goal is not to judge the company financially.

The goal is to understand whether the proposed project is plausible and timely.

---

# 21. HOW TO DETERMINE WHETHER A COMPANY IS GROWING

Do not use a single growth signal.

Build a **Growth Evidence Stack**.

## Very strong growth signals

- audited/reported revenue growth;
- official customer/transaction growth;
- LinkedIn 12-month headcount growth confirmed by employee trends;
- multiple net-new permanent roles;
- new office/facility;
- geographic expansion;
- funding specifically for scaling;
- acquisition;
- large new contracts;
- significant production/capacity expansion.

## Strong supporting signals

- new leadership roles;
- expanding sales/customer-success teams;
- several simultaneous job openings;
- repeat product launches;
- increasing partner ecosystem;
- new international pages;
- substantial customer announcements.

## Weak supporting signals

- social follower growth;
- founder enthusiasm;
- one vacancy;
- one new customer;
- website traffic estimate;
- press mentions.

### Growth verdicts

`CONFIRMED_GROWTH`
Use when multiple strong sources agree.

`LIKELY_GROWTH`
Good evidence but not definitive.

`MIXED_SIGNALS`
Growth in some dimensions, contraction/stability in others.

`STABLE`
No meaningful growth evidence.

`CONTRACTION_OR_RESTRUCTURE`
Multiple credible negative headcount/closure/restructuring signals.

`UNKNOWN`
Insufficient evidence.

### Why growth matters to Astra

Growth can increase relevance of:

- G06 Founder Dependency;
- G18 Customer Onboarding;
- G19 Self-Service;
- O01 Status Portal;
- O08 Handover Reliability;
- O09 Operational Dashboard;
- O20 Scaling Without Admin Headcount;
- B01 Capacity Overflow;
- B04 Backlog Acceleration;
- B08 Temporary Surge.

But growth alone does **not** prove any of these problems.

---

# 22. HOW TO IDENTIFY A REAL PROBLEM ASTRA CAN SOLVE

For each possible problem, seek four evidence types.

## 1. EXISTENCE
Does the relevant process/journey actually exist?

## 2. FRICTION
Is there evidence the process is confusing, manual, slow, fragmented or constrained?

## 3. CONSEQUENCE
Could the friction meaningfully affect a business outcome?

## 4. TIMING
Why might it matter now?

Example:

### Hypothesis
Customer status portal.

**Existence:**  
Company handles ongoing orders/projects.

**Friction:**  
Customers are told to email for updates; operations job mentions answering status enquiries.

**Consequence:**  
Repeated coordination consumes staff time and customers lack self-service visibility.

**Timing:**  
Headcount/customer volume is growing.

Now the angle is much stronger than:

> “A portal would be cool.”

---

# 23. GROW PROBLEM RESEARCH SIGNALS

## Offer clarity / service routing

Research:

- homepage;
- service pages;
- navigation;
- search-result descriptions;
- founder explanation;
- customer reviews;
- competitor category structure.

Strong evidence:

- company needs several paragraphs before naming concrete service;
- two or more materially different offers are mixed;
- founder explains business much more clearly on LinkedIn than website;
- visitors must understand internal terminology.

Disconfirmers:

- category is specialist and audience knows the terminology;
- landing pages already route audiences cleanly.

---

## Audience segmentation

Research:

- industries;
- customer types;
- use cases;
- navigation;
- case studies;
- campaigns;
- company posts.

Strong evidence:

- company explicitly serves very different buyers;
- same page gives every audience same proof and CTA;
- customer needs differ materially.

Disconfirmers:

- buying process is genuinely identical.

---

## Founder dependency

Research:

- founder posts;
- team page;
- sales organisation;
- webinars;
- website depth;
- booking flow;
- customer journey.

Strong evidence:

- founder is clearly primary salesperson/explainer;
- repeated founder-led demos or consultations;
- little scalable information elsewhere;
- company publicly mentions founder capacity/scaling.

Disconfirmers:

- mature sales team;
- deliberate founder-led premium model;
- strong digital education already exists.

---

## Proof / credibility

Research:

- testimonials;
- customer logos;
- case studies;
- LinkedIn announcements;
- partner pages;
- independent mentions.

Strong evidence:

- rich proof exists publicly but not near buying decisions;
- projects have meaningful outcomes but case pages show only screenshots/logos.

Disconfirmers:

- proof is intentionally private due confidentiality;
- sales relies on references under NDA.

---

## Lead qualification

Research:

- forms;
- sales process;
- pricing;
- service complexity;
- job descriptions;
- contact instructions.

Strong evidence:

- high-ticket/custom offering;
- generic form gathers almost no useful context;
- sales team must manually clarify basics.

Disconfirmers:

- low-volume/high-touch business where short form is deliberate;
- qualification happens effectively via referral.

---

## Partner acquisition

Research:

- partner/sponsor pages;
- existing partners;
- founder posts;
- event materials;
- partnership announcements;
- enquiry route.

Strong evidence:

- partnerships matter commercially;
- partner proposition is vague;
- no structured activation examples;
- generic contact form.

Disconfirmers:

- partnerships are invitation-only;
- sales is managed via a mature sponsorship deck and outbound process.

---

## Investor comprehension

Research:

- funding;
- investor page;
- technology claims;
- pitch-related public material;
- founder interviews;
- technical papers.

Strong evidence:

- company is actively raising;
- technology story spans several horizons;
- evidence vs future vision is unclear.

Disconfirmers:

- public website is intentionally consumer-facing;
- investor data room/pitch already handles it.

---

## Booking / application

Research:

- CTA;
- booking tool;
- form steps;
- mobile experience;
- confirmation;
- rescheduling;
- eligibility.

Strong evidence:

- unnecessary steps;
- broken handoff;
- unclear commitment;
- repeated questions;
- high-intent visitor cannot complete action smoothly.

Disconfirmers:

- friction is intentionally required for compliance/qualification.

---

# 24. OPTIMISE PROBLEM RESEARCH SIGNALS

Operational problems are harder to verify publicly.

Use more caution.

Best public evidence sources:

1. job descriptions;
2. help centre;
3. customer instructions;
4. employee process descriptions;
5. product/service workflow;
6. implementation partner case studies;
7. customer reviews;
8. founder posts;
9. public demos;
10. operational PDFs/forms.

## Spreadsheet dependency

Strong evidence:

- job descriptions explicitly mention maintaining operational trackers;
- downloadable spreadsheet templates are part of workflow;
- repeated manual consolidation.

Weak evidence:

- one employee lists Excel as a skill.

---

## Email-driven operations

Strong evidence:

- customers instructed to send structured operational requests by email;
- shared mailbox central to process;
- job roles process requests manually;
- attachments and status updates move by email.

Weak evidence:

- contact email exists.

---

## Duplicate data entry

Strong evidence:

- job descriptions explicitly mention updating multiple systems;
- public process requires re-entering the same data;
- integration vacancies/projects mention synchronisation.

Weak evidence:

- company uses more than one SaaS tool.

---

## Status chasing

Strong evidence:

- FAQ says “email/call us for status”;
- reviews mention lack of status visibility;
- customer-service role handles updates;
- volume/growth increases likely load.

---

## Reporting burden

Strong evidence:

- recurring reports manually assembled;
- job description explicitly consolidates data;
- customer proof delivered as repeated PDFs;
- multiple data sources involved.

---

## Handover failures

Strong evidence:

- sales/delivery roles explicitly coordinate handover;
- forms collect incomplete information;
- customer reviews mention repeated explanations;
- public process has many handoffs.

Caution:
Internal handover quality is often impossible to confirm publicly.

Use `VALIDATE_FIRST` if the central claim is internal.

---

# 25. INNOVATE PROBLEM RESEARCH SIGNALS

Innovation angles need evidence of an opportunity or unresolved decision.

Research:

- founder vision posts;
- product roadmap;
- interviews;
- funding use;
- hackathons;
- concept launches;
- waitlists;
- beta programmes;
- product vacancies;
- customer feature requests;
- new-market announcements.

Strong signals:

- explicit new product idea;
- prototype/waitlist;
- customers requesting capability;
- company exploring AI/new platform;
- several possible directions;
- technical uncertainty;
- need to validate market before build.

Do not pitch Innovate merely because the company is “innovative.”

---

# 26. BUILD SQUAD PROBLEM RESEARCH SIGNALS

Research:

- engineering vacancies;
- agency portfolio;
- freelancer use;
- employee composition;
- delivery announcements;
- product roadmap;
- client work;
- founder posts;
- outsourcing/partner announcements.

Strong signals:

- repeated hard-to-fill developer roles;
- large backlog;
- agency explicitly needs technical partners;
- work volume exceeds team;
- founder discusses capacity;
- agency offers design/marketing but refers technical builds elsewhere;
- temporary project surge.

Disconfirmers:

- recently hired complete technical team;
- development is core IP requiring fully internal ownership;
- outsourcing restrictions;
- no visible demand/backlog.

---

# 27. TIMING / BUYING-TRIGGER RESEARCH

An angle can be correct but badly timed.

Search for “why now?”

High-value triggers:

- new funding;
- launch;
- rebrand;
- new market;
- hiring;
- acquisition;
- rapid growth;
- new CEO/CMO/COO/Head of Product;
- new product;
- customer volume growth;
- operational expansion;
- new facility;
- partner programme;
- upcoming event;
- new regulation;
- website rebuild announcement;
- technology migration;
- major client win;
- product backlog;
- recruiting difficulty;
- service expansion.

Score timing:

`5 = explicit active priority`
`4 = strong recent trigger`
`3 = plausible current relevance`
`2 = evergreen`
`1 = weak`
`0 = no evidence`

Do not manufacture urgency.

---

# 28. EVIDENCE LEDGER

Maintain this before angle selection.

```yaml
evidence:
  - id: E01
    statement:
    source_url:
    source_type:
    source_tier: A|B|C|D|E|F|G
    published_or_observed_date:
    retrieved_date:
    evidence_class: VERIFIED_FACT|COMPANY_CLAIM|OBSERVED_UX|INFERENCE|HYPOTHESIS|UNKNOWN
    supports:
    contradicts:
    confidence: HIGH|MEDIUM|LOW
    notes:
```

Every major conclusion should point back to evidence IDs.

---

# 29. CLAIM CLASSIFICATION

## VERIFIED_FACT

Supported directly by authoritative evidence.

Example:
The company has an office in Rotterdam.

---

## COMPANY_CLAIM

The company says it is true.

Example:
“Trusted by 500 organisations.”

Do not silently convert this to independently verified fact.

---

## OBSERVED_UX

Directly experienced during research.

Example:
The partnership route ends in the same generic contact form as consumer enquiries.

This is usually strong evidence of the digital experience itself.

---

## INFERENCE

Reasonable conclusion from evidence.

Example:
This may create extra qualification work.

Must be expressed with uncertainty.

---

## HYPOTHESIS

Possible explanation worth testing.

Example:
The team may be handling status updates manually.

Never present as fact.

---

## UNKNOWN

No reliable evidence.

Do not fill the gap.

---

# 30. TRIANGULATION RULES

## Rule A — Simple public fact

One Tier A source can be enough.

Example:
Official website lists three offices.

---

## Rule B — Company claim

Record as company claim even from Tier A.

Example:
“Market leader.”

Seek independent confirmation if commercially important.

---

## Rule C — Growth conclusion

Prefer at least two independent signal families.

Example:
LinkedIn headcount growth + multiple net-new roles.

Better:
LinkedIn growth + jobs + official expansion announcement.

---

## Rule D — Internal process problem

Require:

- one direct public process signal;
- plus one corroborating signal;

OR

- two/three strong indirect signals from different source types.

Otherwise use `VALIDATE_FIRST`.

---

## Rule E — Customer pain

Prefer:

- repeated reviews;
- plus observable journey evidence;

or company acknowledgement.

---

## Rule F — Commercial priority

Prefer:

- direct executive statement;
- active hiring/investment;
- recent company action.

A generic mission statement is not a current priority.

---

# 31. CONTRADICTION SEARCH

After finding a promising angle, actively search for evidence against it.

Example candidate:
“Customer status portal.”

Search:

- `"[company]" portal`
- `"[company]" login`
- `"[company]" track order`
- `"[company]" customer dashboard`
- `"[company]" app`
- site navigation;
- app stores;
- help centre.

If a portal already exists, determine whether:

- it solves the problem;
- it is limited;
- it is legacy;
- the angle is invalid.

Another example:
“Company is growing.”

Search:

- layoffs;
- closures;
- reduced headcount;
- leadership departures;
- insolvency;
- cancelled expansion.

Do not cherry-pick.

---

# 32. RECENCY RULES

Use dates aggressively.

For dynamic claims:

### 0–90 days
Excellent for priorities, jobs, launches, leadership and current activity.

### 3–12 months
Usually strong contextual evidence.

### 1–2 years
Useful background; do not assume still current.

### 2+ years
Historical unless confirmed again.

Always ask:

> Is this still true today?

If an old article conflicts with current website/LinkedIn, prefer current evidence.

---

# 33. CONFIDENCE SCORING

This is an operational decision aid, not statistical probability.

Score the winning diagnosis.

## Evidence quality — 0–25

25:
Direct authoritative evidence.

20:
Strong first-party/platform evidence.

15:
Good independent evidence.

10:
Structured third-party estimate.

5:
Weak anecdotal evidence.

---

## Cross-source corroboration — 0–20

20:
3+ independent source families agree.

15:
2 independent source families.

8:
Several items from same source family.

0:
Single unsupported signal.

---

## Recency — 0–15

15:
Most relevant evidence <90 days.

12:
<6 months.

8:
<12 months.

4:
1–2 years.

0:
stale/unknown.

---

## Problem directness — 0–15

15:
Problem explicitly stated or directly observable.

10:
Strongly inferred.

5:
Plausible.

0:
Speculative.

---

## Commercial consequence — 0–10

10:
Clear connection to important revenue, capacity, conversion, retention, cost, speed or strategic decision.

5:
Moderate.

0:
Mostly aesthetic/nice-to-have.

---

## Buyer relevance — 0–5

5:
Directly affects the target person's remit.

3:
Likely relevant.

0:
Wrong stakeholder.

---

## Timing evidence — 0–5

5:
Explicit active priority.

3:
Recent trigger.

0:
No why-now evidence.

---

## Contradiction penalty — 0 to -20

0:
No meaningful contradictory evidence.

-5:
minor conflict.

-10:
material uncertainty.

-20:
strong evidence against the diagnosis.

---

## Critical unknown penalty — 0 to -20

Use when the angle depends on hidden facts.

Examples:

- internal workflow;
- customer volume;
- current system;
- capacity constraint.

---

## Operational confidence bands

### 90–100
`HIGH_CONFIDENCE_ANGLE`

Very strong evidence. Central diagnosis would be surprising to find materially wrong.

### 80–89
`GOOD_ANGLE_WITH_MINOR_UNCERTAINTY`

Strong enough for careful outreach.

### 65–79
`VALIDATE_FIRST`

Promising, but ask a smart question before asserting.

### 50–64
`WEAK_HYPOTHESIS`

Do not build the message around it.

### <50
`REJECT_ANGLE`

---

# 34. IMPORTANT: WHY A SCORE OF 95 IS NOT “95% PROBABILITY”

Do not tell users/prospects:

> “We are 95% sure.”

The score measures research quality and evidence convergence.

It does not create a true statistical probability.

Internally, the goal is to reach a standard where the selected angle has:

- high-quality evidence;
- multiple source families;
- recency;
- direct relevance;
- low contradiction;
- no critical unverified assumption.

---

# 35. ANGLE-SPECIFIC VERIFICATION MATRIX — GROW

Use the codes from `ASTRA_COMMERCIAL_ANGLE_MASTER.md`.

| Code | Angle | Seek evidence from | Strongest confirming signal | Key disconfirmer |
|---|---|---|---|---|
| G01 | Offer Clarity | Homepage, product pages, founder posts | Founder explains offer more clearly than site / offer remains abstract | Specialist buyers clearly understand category |
| G02 | Service Routing | Nav, service pages, analytics clues, reviews | Many distinct services with no buyer-oriented path | Existing routes already resolve fit |
| G03 | Audience Segmentation | Industries, personas, cases | Materially different audiences receive same journey | Audiences share same buying needs |
| G04 | Intent Routing | CTAs, forms, content | One CTA handles all readiness levels | Deliberately consultative sales motion |
| G05 | Pre-Sales Education | FAQ, founder content, sales pages | Repeated human explanation is publicly evident | Buyers already get strong self-education |
| G06 | Founder Dependency | Founder posts, team, sales motion | Founder is central explainer/seller + limited scalable journey | Strong sales/customer team exists |
| G07 | Proof Transfer | LinkedIn, cases, partner pages | Strong proof exists but is absent at decision points | Proof confidential/unavailable |
| G08 | Case Study Architecture | Case pages | Cases lack problem/outcome relevance despite strong work | Buyer relies on references/tenders |
| G09 | Booking Friction | Booking journey, reviews | High-intent user faces unnecessary interruption | Friction required for compliance |
| G10 | Lead Qualification | Forms, sales roles | Custom/high-ticket offer enters generic intake | Referral model makes simple form appropriate |
| G11 | Application/Eligibility | Forms, programme pages | Fit matters but process collects little useful data | Everyone is eligible |
| G12 | Partner Acquisition | Sponsor/partner pages | Partnerships matter but value/activation route unclear | Invitation-only partner model |
| G13 | Investor Comprehension | Funding, investor materials | Active fundraising + complex thesis/evidence hierarchy | Public site not investor channel |
| G14 | Recruitment Conversion | Careers, jobs, culture content | Hiring is strategic but candidate journey weak | Applicant supply already strong |
| G15 | Referral Conversion | Referral-heavy service, website | Referred prospects still need major validation | Introduction directly closes sale |
| G16 | Comparison | Packages/products | Buyers need help choosing between materially different offers | Offers are intentionally bespoke |
| G17 | Pricing Expectations | Sales process, enquiry quality | Poor-fit enquiries caused by unclear commercial expectations | Public pricing strategically inappropriate |
| G18 | Customer Onboarding | Help docs, emails, reviews | Complex post-sale setup / repeated onboarding questions | Dedicated effective onboarding already |
| G19 | Self-Service | Help centre, portal, reviews | Routine customer actions require staff | High-touch service intentionally human |
| G20 | Ecommerce Decision Support | Product catalogue, reviews | Choice complexity / wrong-fit risk | Product is simple commodity |
| G21 | Abandoned Handover | External systems | Context/branding/data breaks at handover | External flow is smooth and trusted |
| G22 | Multi-Market Routing | Languages, offices | Visitors must determine local eligibility themselves | One universal offer/process |

---

# 36. ANGLE-SPECIFIC VERIFICATION MATRIX — OPTIMISE

| Code | Angle | Seek evidence from | Strongest confirming signal | Key disconfirmer |
|---|---|---|---|---|
| O01 | Customer Status Portal | FAQ, customer instructions, reviews, jobs | Staff/customer status exchange is visibly manual | Existing portal already solves it |
| O02 | Quote/Request Intake | Quote forms, sales/ops jobs | Requests arrive incomplete and require chasing | Low-volume bespoke intake |
| O03 | Approval Workflow | Job/process docs | Email approvals and ownership confusion visible | Existing workflow system |
| O04 | Spreadsheet Replacement | Jobs, downloads, employee/process docs | Business-critical multi-user tracker / reconciliation | Spreadsheet is low-volume and fit-for-purpose |
| O05 | Email Workflow Replacement | Shared mailbox/process docs | Email acts as task/status engine | Email only used as communication layer |
| O06 | WhatsApp Workflow Replacement | Public process/founder posts | Operational work/assets depend on chats | WhatsApp only relationship channel |
| O07 | Duplicate Data Entry | Jobs, tech docs | Same data explicitly entered in multiple systems | Existing integrations |
| O08 | Handover Reliability | Jobs, reviews, process docs | Repeated cross-team missing-context signals | Structured CRM/workflow already |
| O09 | Operational Dashboard | Reporting jobs, leadership posts | Status manually assembled for management | Existing BI provides timely view |
| O10 | Client Reporting Automation | Reporting process, PDFs | Recurring manual reports from several sources | Low-frequency bespoke reports |
| O11 | Proof/Result Portal | Campaign/project results | Retention/repeat buy depends on repeated proof | Results already self-service/live |
| O12 | Inventory Visibility | Stock process, customer FAQs | Customers/staff repeatedly request stock info | ERP portal already exposes it |
| O13 | Field Operations | Field jobs, forms | Paper/photo/re-entry between field and office | Mature field-service app |
| O14 | Scheduling/Dispatch | Jobs, booking process | Manual allocation/change coordination | Existing scheduling optimisation |
| O15 | Document Collection | Onboarding docs | Staff chase missing documents/versioning | Secure portal already |
| O16 | Compliance Evidence | Audit/process docs | Evidence assembled repeatedly/manually | Specialist compliance platform in place |
| O17 | Multi-Step Order Workflow | Jobs, ops docs | One order crosses teams/tools without shared state | ERP already controls lifecycle |
| O18 | Partner/Supplier Portal | Supplier instructions | External-party coordination repeats via email | EDI/portal already mature |
| O19 | Internal Knowledge | Jobs, public docs | Staff rely on key people/repeated questions | Mature searchable KB |
| O20 | Scale Without Admin Headcount | Growth + repetitive workload | Volume grows and admin coordination grows with it | Process already automated / stable volume |

---

# 37. ANGLE-SPECIFIC VERIFICATION MATRIX — INNOVATE

| Code | Angle | Seek evidence from | Strongest confirming signal | Key disconfirmer |
|---|---|---|---|---|
| I01 | Idea Validation Sprint | Founder posts, roadmap | Concrete idea but weak customer evidence | Already validated/committed |
| I02 | MVP Definition | Product plans/jobs | Feature breadth with uncertain priority | Clearly scoped MVP |
| I03 | Productise Service | Service process, founder vision | Repeatable service with scalable knowledge component | Bespoke human work is core value |
| I04 | New Digital Revenue | Assets/data/audience | Adjacent digital value hypothesis | No buyer/problem evidence |
| I05 | Portal as Product | Customer requests | Utility could become differentiated paid value | Pure cost-centre function |
| I06 | New Market Journey | Expansion | New segment has different buying context | Same buyer/process across markets |
| I07 | AI Validation | AI posts, repetitive knowledge work | Specific task + data + potential measurable value | AI is only trend interest |
| I08 | Workflow Product Concept | Proprietary process | Internal know-how may have external value | No repeated external need |
| I09 | Innovation Prioritisation | Multiple initiatives | Several ideas compete for limited resources | One clear strategic priority |
| I10 | Feasibility Before Commitment | Technical dependencies | Uncertainty materially affects cost/scope | Architecture already proven |

---

# 38. ANGLE-SPECIFIC VERIFICATION MATRIX — BUILD SQUAD

| Code | Angle | Seek evidence from | Strongest confirming signal | Key disconfirmer |
|---|---|---|---|---|
| B01 | Agency Capacity Overflow | Jobs, founder posts, project volume | More work than team can reliably deliver | Stable utilisation |
| B02 | Capability Expansion | Services/portfolio | Clients need technical work agency does not provide | Agency intentionally stays specialised |
| B03 | Freelancer Dependency | Team, jobs, public partner model | Continuity/capacity depends on ad hoc individuals | Stable trusted freelancer bench |
| B04 | Product Backlog | Product jobs, changelog | Customer/roadmap demand exceeds team throughput | Backlog is strategic prioritisation, not capacity |
| B05 | Margin Pressure | Commercial model, outsourcing | Delivery economics constrain competitiveness | High-margin premium model |
| B06 | Maintenance Burden | Support roles, portfolio | Recurring maintenance consumes delivery capacity | Dedicated maintenance team |
| B07 | Specialist Gap | Vacancies, project requirements | Specific capability blocks work | Role successfully filled |
| B08 | Temporary Surge | Launch/migration/deadline | Time-bounded workload spike | No urgency/deadline |

---

# 39. BUSINESS-STAGE RESEARCH MODIFIERS

## Pre-launch / pre-revenue

Look for:

- validation;
- waitlist;
- beta;
- founder/customer interviews;
- product concept;
- fundraising.

Be sceptical of large optimise/build proposals.

---

## Early-stage / founder-led

Look for:

- founder dependency;
- messaging;
- first repeatable sales motion;
- referral flow;
- proof;
- onboarding;
- emerging manual workload.

---

## Growth-stage SME

Look harder at:

- headcount trends;
- operational coordination;
- handovers;
- customer self-service;
- reporting;
- capacity;
- integrations.

---

## Established SME

Look at:

- systems;
- portals;
- service expansion;
- legacy UX;
- process fragmentation;
- succession/key-person dependence;
- digitisation.

---

## Larger mature organisation

Public research may not reveal the true bottleneck.

Prefer:

- specific division/use case;
- public initiative;
- product/market trigger;
- validation question.

Avoid generic “digital transformation” pitches.

---

# 40. SEARCH QUERY LIBRARY

Use exact search patterns.

## Identity

- `"[Company Name]" official`
- `"[Company Name]" [country]`
- `"[Person Name]" "[Company Name]"`
- `site:linkedin.com/in "[Person Name]" "[Company Name]"`
- `site:linkedin.com/company "[Company Name]"`

## Recent activity

- `"[Company Name]" 2026`
- `"[Company Name]" news 2026`
- `"[Company Name]" launch`
- `"[Company Name]" partnership`
- `"[Company Name]" customer`
- `"[Company Name]" expansion`
- `"[Company Name]" funding`
- `"[Company Name]" acquisition`
- `"[Company Name]" hiring`

## Problems / workflows

- `"[Company Name]" "Excel"`
- `"[Company Name]" "manual"`
- `"[Company Name]" "reporting"`
- `"[Company Name]" "status"`
- `"[Company Name]" "email us"`
- `"[Company Name]" "portal"`
- `"[Company Name]" "login"`
- `"[Company Name]" "track"`
- `"[Company Name]" "CRM"`
- `"[Company Name]" "ERP"`
- `"[Company Name]" "customer service"`
- `"[Company Name]" "coordinate"`
- `"[Company Name]" "reconcile"`

## Jobs

- `"[Company Name]" careers`
- `"[Company Name]" jobs`
- `"[Company Name]" vacancy`
- `site:linkedin.com/jobs "[Company Name]"`

## Customer voice

- `"[Company Name]" reviews`
- `"[Company Name]" Trustpilot`
- `"[Company Name]" G2`
- `"[Company Name]" Capterra`
- `"[Company Name]" Reddit`
- `"[Product Name]" problems`
- `"[Product Name]" support`

## Documents

- `site:[domain] filetype:pdf`
- `"[Company Name]" filetype:pdf`
- `"[Company Name]" brochure pdf`
- `"[Company Name]" annual report`
- `"[Company Name]" investor presentation`

## Contradiction search

If hypothesis = portal need:

- `"[Company Name]" customer portal`
- `"[Company Name]" dashboard`
- `"[Company Name]" app`
- `"[Company Name]" login`

If hypothesis = growth:

- `"[Company Name]" layoffs`
- `"[Company Name]" closure`
- `"[Company Name]" restructuring`

If hypothesis = Build Squad:

- `"[Company Name]" engineering team`
- `"[Company Name]" CTO`
- `"[Company Name]" developers`
- `"[Company Name]" technology partner`

---

# 41. RESEARCH ORDER FOR MAXIMUM EFFICIENCY

Use this default sequence.

## PASS 1 — Resolve identity
5–10 authoritative checks.

## PASS 2 — Understand the business
Website + LinkedIn company.

## PASS 3 — Find change signals
Recent posts, founder activity, jobs, news.

## PASS 4 — Follow customer journey
Actual site/forms/booking/signup.

## PASS 5 — Find problem evidence
Jobs, help centre, reviews, process docs, tech.

## PASS 6 — Generate 2–5 angle candidates
Use Angle Master.

## PASS 7 — Search specifically to prove/disprove each candidate
Do not continue broad browsing.

## PASS 8 — Research 2–3 category competitors
Check whether observation is actually unusual/important.

## PASS 9 — Contradiction search
Try to kill the winning angle.

## PASS 10 — Score confidence and select verdict
Only then draft outreach.

---

# 42. ADAPTIVE RESEARCH: DO NOT OVER-RESEARCH RANDOMLY

Deep research does not mean opening 100 irrelevant pages.

The research should become **more targeted as hypotheses emerge**.

Example:

Initial research creates candidates:

1. service routing;
2. partner acquisition;
3. customer portal.

Now search specifically:

- How are services currently selected?
- How are partnerships sold?
- How do current customers interact operationally?

Reject two.

Deepen one.

This is better than collecting miscellaneous company facts.

---

# 43. HOW TO CHOOSE BETWEEN MULTIPLE PROBLEMS

After research, rank candidate problems by:

1. Evidence strength.
2. Commercial consequence.
3. Current timing.
4. Buyer relevance.
5. Astra fit.
6. Implementation plausibility.
7. Differentiation.
8. Prototype leverage.
9. Risk of being wrong.

A common mistake:

Website issue = easiest to see.

Operational issue = potentially more valuable.

The AI must compare both.

Example:

A logistics website looks dated.

But research shows:

- transport + warehousing + picking;
- customers request updates by email;
- operations staff coordinate status manually;
- company is growing.

The customer-operations portal may be dramatically more valuable than a homepage redesign.

---

# 44. RESEARCHING “WHAT PROBLEM DO THEY HAVE?”

Use this diagnostic tree.

```text
WHAT IMPORTANT OUTCOME DOES THE COMPANY APPEAR TO WANT?
                |
                v
WHAT MUST HAPPEN FOR THAT OUTCOME?
                |
                v
WHERE IS THE JOURNEY/PROCESS CONSTRAINED?
                |
                v
IS THE CONSTRAINT OBSERVED OR ONLY ASSUMED?
        |                       |
     OBSERVED                 ASSUMED
        |                       |
        v                       v
WHAT CONSEQUENCE?         FIND MORE EVIDENCE
        |                       |
        v                       v
WHY NOW?                 STILL UNKNOWN?
        |                       |
        v                       v
ASTRA FIT?              VALIDATE_FIRST
        |
        v
COMPARE WITH OTHER ANGLES
```

---

# 45. EXAMPLES OF STRONG RESEARCH CHAINS

## Example A — Growing professional-services company

Evidence:

- LinkedIn headcount increased materially over 12 months;
- five open roles;
- new office announced;
- website still routes all enquiries through founder;
- founder's recent posts explain services much more clearly than website.

Possible candidates:

- G01 Offer Clarity;
- G06 Founder Dependency;
- O20 Scaling Without Admin Headcount.

Do not automatically choose O20.

If no operational workload evidence exists, G06 may be strongest.

---

## Example B — Logistics company

Evidence:

- transport, warehouse and picking services;
- customers instructed to email operational requests;
- job ad mentions coordinating shipment statuses;
- no customer login found;
- company announces new warehouse.

Candidate:

O01 Customer Status Portal / hybrid customer operations portal.

Confidence becomes high because:

- workflow exists;
- friction is directly evidenced;
- business consequence is plausible;
- growth creates timing;
- contradiction search found no portal.

---

## Example C — Design agency

Evidence:

- strong brand/design portfolio;
- no app/backend examples;
- job posts repeatedly seek freelance developers;
- founder announces several new digital-client projects.

Candidate:

B02 Capability Expansion or B01 Capacity Overflow.

Need to determine which:

If work is being rejected due skill → B02.

If capability exists but throughput is insufficient → B01.

---

## Example D — Technology startup

Evidence:

- founder announces fundraising;
- website mixes present prototype, future platform and three markets;
- investor interview focuses on validation milestone;
- no clear investor route.

Candidate:

G13 Investor Comprehension.

Do not pitch generic brand redesign.

---

# 46. LOW-CONFIDENCE TRAPS

Never treat these as enough by themselves.

### “They are hiring.”
Could be replacement hiring.

### “Their LinkedIn follower count is rising.”
Could be campaign activity.

### “Their website looks old.”
Could still convert perfectly.

### “They use WordPress.”
Not a business problem.

### “They have no public prices.”
Normal in B2B.

### “They use Excel.”
Could be ideal.

### “Founder is active.”
Not founder dependency.

### “They have lots of services.”
Not necessarily confusing.

### “They raised money.”
Not proof of budget for Astra.

### “Customers complain.”
One complaint is anecdotal.

### “They have many software tools.”
Not proof of fragmentation.

---

# 47. RED-TEAM QUESTIONS BEFORE ANGLE SELECTION

Answer all.

1. What evidence most strongly supports this angle?
2. What evidence most strongly contradicts it?
3. Could the observed behaviour be intentional?
4. Could the company already solve this privately?
5. Is the problem current?
6. Is it material?
7. Is the affected user important to the business?
8. Does the target person care about it?
9. Is there a bigger bottleneck?
10. Is Astra the right type of supplier?
11. Does the project fit the company's scale?
12. Is implementation plausible?
13. Is the “why now” credible?
14. Are we relying on an estimate?
15. Are we relying on one source?
16. Are we inferring internal pain?
17. Would a founder reasonably say “that's not how it works”?
18. What one question would validate the largest remaining uncertainty?
19. If no prototype were possible, would the angle still be worth discussing?
20. Should the lead be skipped?

---

# 48. REQUIRED FINAL RESEARCH PACK

Before passing the prospect to the reply agent, output:

```yaml
prospect:
  person:
  role:
  company:
  official_domain:
  location:
  identity_confidence:

business_model:
  plain_english_description:
  buyer:
  user:
  revenue_model:
  sales_motion:
  stage:
  geography:
  team_size:
  current_priorities:

change_signals:
  growth_verdict:
  headcount:
  hiring:
  expansion:
  funding:
  product_change:
  leadership_change:
  other:
  confidence:

customer_journey:
  primary_journeys:
  strongest_observed_friction:
  proof_strength:
  conversion_path:
  self_service:
  post_sale:

operations:
  publicly_visible_workflows:
  manual_process_signals:
  systems_and_tools:
  reporting_signals:
  coordination_signals:
  unknowns:

customer_voice:
  recurring_themes:
  evidence_count:
  confidence:

candidate_angles:
  - code:
    name:
    proposition:
    evidence_ids:
    evidence_for:
    evidence_against:
    critical_unknowns:
    commercial_consequence:
    why_now:
    buyer_relevance:
    confidence_score:
    verdict:

winning_angle:
  code:
  name:
  proposition:
  diagnosis:
  evidence_ids:
  why_it_beats_alternatives:
  realistic_business_benefit:
  what_astra_would_change:
  what_must_not_be_claimed:
  largest_remaining_uncertainty:
  validation_question_if_needed:
  prototype_decision:
  research_confidence_score:

final_verdict:
  HIGH_CONFIDENCE_ANGLE |
  GOOD_ANGLE_WITH_MINOR_UNCERTAINTY |
  VALIDATE_FIRST |
  DIFFERENT_LONG_TERM_ANGLE |
  NO_STRONG_ANGLE

sources:
  - source:
    url:
    date:
    tier:
    purpose:
```

---

# 49. WHAT THE REPLY AGENT MAY AND MAY NOT USE

The reply agent may use:

- verified facts;
- directly observed UX;
- carefully worded strong inferences;
- current priorities;
- recent triggers;
- strongest commercially relevant insight.

The reply agent should usually NOT use:

- internal confidence score;
- source count;
- raw research;
- uncertain financial estimates;
- employee-review allegations;
- traffic estimates;
- speculative internal processes;
- every issue discovered.

---

# 50. INTERNAL-PROCESS SAFETY RULE

Optimise and Build Squad angles often depend on private operational facts.

Use this rule:

> If the proposed angle requires knowing exactly how the company works internally, and public evidence does not directly show it, do not write as if it is confirmed.

Instead say something like:

> “I noticed customers are directed to email for shipment updates. If that still means your team is handling status manually, there may be a useful portal angle there.”

This demonstrates insight without pretending to know private operations.

---

# 51. RESEARCH QUALITY GATES

A prospect cannot receive `HIGH_CONFIDENCE_ANGLE` unless:

- identity is fully resolved;
- official domain verified;
- business model understood;
- at least three relevant website pages reviewed;
- recent company activity checked;
- target decision-maker checked when possible;
- growth/change status researched;
- winning problem supported by high-quality evidence;
- at least one independent corroborating source family exists for inferred claims;
- contradiction search completed;
- at least two alternative Astra angles considered;
- target buyer relevance confirmed;
- no critical hidden assumption remains;
- realistic business benefit stated without numerical invention.

If any hard gate fails, downgrade.

---

# 52. RESEARCH FAILURE MODES

## Failure: Source abundance mistaken for confidence
Twenty low-quality pages do not beat one direct official statement.

## Failure: Stale truth
A 2023 article may describe a business that no longer exists in that form.

## Failure: Search-snippet reasoning
Never diagnose from snippets without opening evidence.

## Failure: Confirmation bias
Do not keep searching only for your favourite angle.

## Failure: Website tunnel vision
A weak homepage can distract from a far larger operational problem.

## Failure: LinkedIn theatre
Posting frequently does not equal commercial momentum.

## Failure: Job-post overreach
One role does not prove systemic pain.

## Failure: Competitor copying
Category patterns inform diagnosis; they do not dictate the solution.

## Failure: AI-summary dependency
Account IQ or another AI summary may help discovery, but verify important claims.

## Failure: Fake certainty
Do not use “95%” as decoration.

---

# 53. SOURCE-SPECIFIC CAVEATS

## LinkedIn
Excellent for professional identity, employee trends, hiring and recent executive activity.  
Not audited financial or workforce data.

## Sales Navigator
Useful growth and department signals.  
Treat them as directional first-party platform data.

## KVK
Strong for Dutch registered-company facts and filings.  
Annual accounts describe prior periods and not every company files the same level of detail.

## Companies House
Strong UK public registry source.  
Filed information is not guaranteed by the registry to be factually correct in every respect.

## Crunchbase / Dealroom / PitchBook
Strong discovery tools for private-market activity.  
Corroborate material claims.

## Similarweb
Useful directional web-intelligence estimate.  
Not direct analytics; small sites may have insufficient/noisy data.

## Reviews
Excellent qualitative hypotheses and customer-language source.  
Require patterns, not anecdotes.

## Job boards
Excellent operational clues.  
Roles may be stale, replacement positions or aspirational.

## Technology detectors
Useful clues.  
Can be stale/incomplete and do not reveal quality of usage.

---

# 54. PRACTICAL HIGH-CONFIDENCE EXAMPLE

Candidate angle:
`O20 — Scaling Without Admin Headcount`

Evidence:

E01 — Sales Navigator shows +28% company headcount in 12 months.  
Class: platform evidence.

E02 — Official company page announces expansion into a second location.  
Class: verified company claim.

E03 — Three current job descriptions mention manually coordinating customer requests and updating trackers.  
Class: direct operational clue.

E04 — Help page asks customers to email status questions.  
Class: directly observed workflow.

E05 — No customer portal found after explicit contradiction search.  
Class: observed absence with search caveat.

E06 — Recent founder post says the team is focusing on “scaling operations without losing the personal experience.”  
Class: direct executive priority.

This is a strong chain:

`growth`
→ `more transaction/customer volume`
→ `repetitive coordination remains manual`
→ `administrative load likely scales with volume`
→ `Astra can target the coordination bottleneck`

This is much stronger than:

> “They're growing, so automation could help.”

---

# 55. PRACTICAL VALIDATE-FIRST EXAMPLE

Candidate:
`O07 — Duplicate Data Entry`

Evidence:

- BuiltWith shows several business tools.
- One vacancy says “good Excel skills.”
- Website has a CRM form.

This is not enough.

Do not write:

> “Your team is entering the same data into multiple systems.”

Correct conclusion:

`VALIDATE_FIRST`

Possible discovery question:

> “Out of curiosity, do those customer requests flow straight into your internal system today, or is there still some manual transfer between the website, CRM and operations?”

---

# 56. FINAL MASTER INSTRUCTION FOR CLAUDE

Use this verbatim as the controlling research principle:

> Research the prospect as if your credibility depends on the founder checking every sentence. Resolve identity first. Understand the business model in plain English. Inspect the full customer journey, recent company activity, the decision-maker, hiring, growth, customer voice, relevant operational evidence, corporate records and competitors where useful. Generate evidence, not assumptions. Classify every important claim as verified fact, company claim, observed UX, inference, hypothesis or unknown. For any inferred business problem, triangulate across independent evidence sources and actively search for contradictory evidence. Determine whether the company is growing or changing using multiple signals rather than one vacancy, post or estimate. Generate multiple Astra angle candidates only after research, then perform targeted research to prove or disprove each candidate. Do not call an angle high confidence if a critical internal fact remains unknown. Use VALIDATE_FIRST when a smart question is safer than an assertion. Use NO_STRONG_ANGLE when evidence does not justify a meaningful Astra opportunity. Accuracy and commercial consequence matter more than clever personalisation.

---

# 57. FINAL OPERATING PRINCIPLE

The research agent should not ask:

**“What can Astra sell this company?”**

It should ask:

**“What is actually happening in this company, what important outcome are they trying to achieve, what credible bottleneck stands in the way, and what evidence proves it?”**

Only after that should it ask:

**“Is Astra unusually well suited to help?”**

That is how Astra earns the right to personalise outreach.
