# HotGreen Solutions. Platform, compliance and search research (opps 5)

Research date and access date for every source: **25 September 2026**. Research only. No form was submitted,
nobody was contacted, no account was created.

**How to read this file.** Every claim carries a source tag like [S12]. Each tag resolves to a URL, publisher and
date in the source table at the end. Labels:

- **VERIFIED**: read on a primary source in this session (quoted or checked directly).
- **SECONDARY**: read on a reputable secondary source in this session, primary not reachable.
- **COMPANY CLAIM**: a vendor's own statement about itself, read in this session, not independently tested.
- **INFERENCE**: my reasoning from verified facts.
- **UNVERIFIED**: could not be confirmed in this session.

Claims that change a recommendation carry a "Checks" line: (1) primary reopened and quoted, (2) active attempt to
prove it false or outdated, with 2025 and 2026 changes looked for, (3) a second independent confirmation.

Raw evidence (fetched HTML, rendered text, screenshots, PDFs) is in
`/tmp/claude-0/-home-user-astra-agency/7c4b4d4b-8b03-55a1-8fd2-a24093beb264/scratchpad/opps5/raw/`.

---

## The eight things that matter most

1. **The founder is right, and the details matter.** Since 16 June 2026 Framer ships "Framer Agents", which edit an
   existing live Framer site across all pages and accept pasted screenshots, wireframes and even hand drawn sketches as
   references. Framer's own agents page lists the prompt "I'm attaching a screenshot of our Webflow site. Rebuild it as
   closely as possible in Framer." VERIFIED [S1][S6][S5][S9]. Its own help page still advises building "one section at a
   time" [S6], and Framer admits early testers spent "up to $300 in tokens building a complete site" [S4].
2. **Most of Sanya's SEO fixes are now one prompt each.** Framer publishes example agent prompts that match HotGreen's
   defects almost word for word: "Set up SEO metadata for every page including the page title, meta description, and
   Open Graph image" and "Add descriptive alt text to every image that's missing it" [S1]. VERIFIED.
3. **HotGreen currently breaks two clear UK legal duties on its site.** It shows no company number, place of
   registration or registered office (Companies Act 2006 trading disclosure rules, SI 2015/17 reg 25) [S22][S24][S25],
   and it collects names and emails with no privacy notice (UK GDPR Art 13) [S29][S30]. It also likely breaches the
   E-Commerce Regulations 2002 reg 6 (no email address or geographic address on the site) [S27][S28]. VERIFIED law,
   VERIFIED site state, applicability of reg 6 is INFERENCE.
4. **Cookies are not the problem, disclosure is.** The site sets zero cookies and zero local storage (VERIFIED live
   [S69]). But the Framer analytics script runs for every visitor, and since 5 February 2026 the analytics exception to
   the consent rule only applies if visitors get "clear and comprehensive information" and "a simple means of
   objecting" [S31][S32][S33]. HotGreen gives neither. PECR penalties now reach £17.5m or 4% of turnover [S31][S34].
   Real enforcement risk for a three page B2B site is low (INFERENCE from [S35][S36][S37][S38]).
5. **Google Fonts from Google is a live German risk, not a settled one.** LG München I (20 Jan 2022) held it unlawful
   without consent [S39]. Abusive mass claims were later rejected [S40], and on 28 Aug 2025 the German Federal Court of
   Justice referred the core questions to the CJEU, now case C-654/25 [S41][S42]. The fix in Framer is to upload the
   fonts as custom fonts [S19]. VERIFIED.
6. **The European Accessibility Act does not apply to HotGreen.** It covers listed services "provided to consumers",
   and exempts microenterprises providing services [S44]. VERIFIED. Alt text and live text remain good practice
   (WCAG 2.2 SC 1.1.1 Level A, SC 1.4.5 Level AA) [S46].
7. **What AI agents actually receive from HotGreen is thin.** Framer serves a markdown copy of each page to AI tools.
   HotGreen's home page markdown reads "Some of our key funders and partners are:" followed by nothing, and the
   Solutions markdown contains none of the spec table (no 120°C, 220°C, bar, CoP or delivery dates) [S21][S69].
   VERIFIED. An AI search engine asked for HotStack specs replied "The search results don't contain specific data on a
   product called "HotStack" heat pump" [S67]. VERIFIED (observed).
8. **Buyers do use AI, but it is not the only thing.** G2's July 2026 survey: 82% of software buyers sourced
   recommendations from an AI chatbot in 24 months, yet review sites (38%) overtook AI chatbots (37%) as the top
   shortlist source [S61]. Forrester (Jan 2026) says genAI searches are the starting point, then buyers lean on
   networks and trials [S60]. VERIFIED. None of these surveys covers industrial capital equipment specifically.

---

## Part A. The platform: what Framer is and is not, as of September 2026

### A1. Framer's AI features

**Names and timeline.**
- **Framer Agents**, launched 16 June 2026 with Framer 3.0. VERIFIED. Framer's blog: "Today we launched Framer 3.0,
  bringing AI agents to the canvas to help you design, write, analyze, and organize your sites" [S5]. The press release
  dateline reads "AMSTERDAM & SAN FRANCISCO, June 16, 2026" [S9].
- **External Agents** (Claude Code, Codex in ChatGPT, Cursor, Gemini connect to a Framer project), marked "PREVIEW" and
  "Free during preview" on the pricing page [S3][S8]. VERIFIED.
- **Workshop** (AI code component builder) and **AI Translate** still exist and consume credits: "Agent chat, Workshop
  chat or AI translations" [S7]. VERIFIED.
- **Wireframer**, the 2025 prompt to page tool: `framer.com/wireframer/` now returns the same page as `framer.com/ai/`
  (identical 2,126,069 byte response) [S2]. VERIFIED that the URL now serves the AI agent page. INFERENCE: Wireframer
  has been folded into Agents.

**What the agent does.** VERIFIED from Framer's own pages [S1][S2][S6].
- Edits existing sites. The agents page leads with "Update your existing site" and "The agent updates copy, structure,
  sections, and layout across your site while keeping everything editable on the canvas." Example prompts: "Find all
  text that says "2025" and update it to "2026" across the entire project" [S1].
- Takes images. Help article, updated 15 Sep 2026: "The Agent can accept any image as a reference, screenshots,
  wireframes, exported mockups, or even hand-drawn sketches" [S6]. Credits blog: "generate pages from scratch or a
  screenshot" [S5]. Engineering blog: "Paste a screenshot of the thing you're pointing at and your results jump
  noticeably" and "We also got the agent good at recreating and remixing images and whole sites" [S4].
- Rebuilds from a live site or URL: "Here's a URL of our current site. Rebuild its structure and visual style in
  Framer" [S1].
- SEO and accessibility: page titles, meta descriptions, Open Graph, alt text, heading hierarchy, semantic tags, broken
  links, contrast [S1]. The agent can also "generat[e] JSON-LD metadata from your CMS for specific pages" [S4]
  (COMPANY CLAIM).
- CMS: creates collections, fields, imports CSV or JSON, migrates from WordPress or Notion [S1].
- Code components: "Custom login state in the nav, a dynamic pricing calculator, hand-rolled WebGL effects" [S4]
  (COMPANY CLAIM). These are client side React components (see A12).
- Analytics questions answered in chat, "Built on our ClickHouse setup" [S4] (COMPANY CLAIM).
- Safety: agent edits happen on a branch, "You and your agents always work on a copy of your project, never the live
  version" [S4]. Branching with previews is a Pro plan feature [S3]. VERIFIED.
- Models: the picker offers "GPT, Sonnet, Opus, or Fable" [S1][S2]. VERIFIED as displayed.

**Limits.** VERIFIED unless marked.
- Framer's own advice: "For the best results, start by generating a single section instead of an entire page" [S6].
- Cost: typical credit use "Generate a landing page ~300, Make a page responsive ~150, Large edit ~100, Small edit ~50"
  on the base model [S5]. Basic includes 1,000 credits a month, Pro 3,000 [S3][S5]. Credit features pause at 100% of
  the allowance [S7].
- Real money: "generating a single page with GPT-5.5 runs about $3, and a medium edit lands around $0.50. Some early
  testers have spent up to $300 in tokens building a complete site" [S4] (COMPANY CLAIM, as of 16 Jun 2026).
- Non determinism: "agents are non-deterministic. Ask the same thing twice and you get two different answers" [S4].
- Creativity: "Claude tends to produce a fairly narrow band of creative outcomes ... everything starts to rhyme" [S4]
  (COMPANY CLAIM, Framer's own admission).
- Copying: "Don't copy someone's design. It backfires, it can get you in legal trouble, and AI doesn't change those
  rules" [S4].
- Framer's own view of the market: "The old path often meant picking a template and hiring a freelancer to customize
  it, and that customization and maintenance work can now go to an agent" [S4] (COMPANY CLAIM, but it is the exact
  risk the founder raised).

**Checks on "Framer AI can build or change a whole site from a pasted image".**
(1) Reopened [S1] and [S6], quotes above. (2) Tried to prove it false or narrower: Framer's own help recommends
section by section work [S6], and cost and quality limits exist [S4], so "whole site from one image in one go" is
overstated, "rebuild pages from screenshots and edit the whole site by prompt" is accurate. (3) Independent: the
Business Wire release syndicated on Yahoo Finance says "They can edit pages, components, styles, CMS content, SEO
settings, and publishing" [S9]. **Verdict: VERIFIED with that nuance.**

### A2. Framer CMS

VERIFIED from the pricing page, rendered in both billing modes [S3].

| | Free | Basic | Pro | Enterprise |
|---|---|---|---|---|
| CMS collections | 10 (per FAQ) | 2 | 10, then $40 per 10 (max 40) | Custom |
| CMS items | not stated in table | 1,000 | 2,500, then $20 per 10,000 (max 40,000) | Custom |
| Pages | 1,000 (per FAQ) | 30 | 150, then $20 per 100 (max 700) | Custom |

**Programmatic writes.** VERIFIED.
- Plugin API: "lets you sync the CMS with external data sources, update the canvas, or modify your site settings", but
  "to use a Plugin, Framer has to be open" [S10].
- **Server API** (npm package `framer-api`): "You can update and publish your Framer projects with a simple script from
  any server at any time, without opening the Framer project" [S10]. Authentication is a per project API key from Site
  Settings [S10]. It is still described as beta: "During beta, using the API will be free of charge. Exact cost is TBD"
  [S10]. It uses WebSockets, not REST, and "is not in any way transactional" [S10].
- Developer changelog shows active change: v4.1.0 (4 Aug 2026) added a Publishing API and Branching API; v5.0.0 (8 Sep
  2026) added CMS array fields with breaking changes; v5.1.0 (24 Sep 2026) draft pages [S11]. `createManagedCollection`
  arrived in v3.10.2 (21 Jan 2026) [S11].
- External Agents are recommended for "Bulk CMS work", "External content syncs", "Import items from files or APIs"
  [S8].

**What that enables for HotGreen** (INFERENCE): a News or Press collection that a script or an external agent fills
from a source HotGreen already maintains, for example a Notion table or a spreadsheet, then publishes. Framer's own
example: "Import the "Changelog" Notion database into the CMS using the Notion API. Sync every hour" [S1]. Basic's 2
collections are enough for News plus Team; Pro is needed for staging and redirects.

### A3. Forms

VERIFIED [S13], all three help articles updated 15 Sep 2026.
- Destinations: "Send submissions to email, Google Sheets, or custom webhooks", with "built-in spam protection and rate
  limiting".
- Built in integrations: "Formspark, Calendly, HubSpot, Intercom, and Typeform"; newsletter capture via "Loops.so,
  Mailchimp, Formspark, GetWaitlist"; any other provider via an Embed component.
- Webhooks: "Framer sends form submissions as JSON ... The JSON uses the names of the inputs as keys". Framer retries
  "up to 5 times" on non 2xx, does not follow redirects, and supports HMAC signing with a secret of at least 32
  characters via a `Framer-Signature` header.
- Native field types listed: Text, Checkbox, Radio, Select. **No file upload field is listed** (absence in the official
  list, VERIFIED; that no upload exists at all is INFERENCE).

**Why this matters for HotGreen.** The audit found the Message textarea is named `lastname`, the same name as the Last
name input [site-audit.md]. Since Framer keys JSON by input name, one value can overwrite the other. INFERENCE, strong.
Nothing was submitted to test it.

### A4. Localisation

VERIFIED [S3][S18]. Localisation launched 3 Oct 2023. It is a paid add-on, "$20 per locale", "Up to 20" locales on
Basic and Pro. Auto Translate keeps canvas and CMS content translated using AI models and consumes credits; "If you run
out of credits, Localization remains fully accessible", manual translation still works. Framer manages `lang` and
`hreflang` automatically (search result summary of Framer help, SECONDARY). HotGreen today serves `lang="en"` only with
no `hreflang` [site-audit.md].

### A5. Site search

"Site search: Find anything on your site instantly" is ticked for Basic, Pro and Enterprise [S3], confirmed on a
rendered screenshot of the comparison table. VERIFIED.

### A6. Analytics, and whether Framer sets cookies

- COMPANY CLAIM [S14]: "Framer Analytics does not use cookies and does not generate any persistent identifiers. No
  cookie consent is needed in order to use Framer's built-in analytics tool." It hashes "the IP address and user agent
  with a daily rotating secret (salt)". The same page adds: "as a creator of a Framer Site you are responsible for
  ensuring that your site is GDPR compliant which includes clearly and accurately describing to your visitors what
  information you collect".
- VERIFIED on HotGreen live [S69]: zero cookies before interaction, empty `localStorage` and `sessionStorage`, a script
  from `events.framer.com/script?v=2`, and POSTs to `events.framer.com/anonymous` carrying
  `"event":"published_site_pageview"`, the URL, `"timezone"` and `"locale"`.
- Analytics history is 30 days on Basic, 90 on Pro, unlimited on Enterprise [S3]. VERIFIED.
- See Part B3 for why "no cookie" does not mean "nothing to disclose" under UK law since February 2026.

### A7. Cookie banner options

VERIFIED [S15]. Framer has a native Cookie Banner component "designed to work with Google Tag Manager and Google
Consent Mode", with preview and reopen trigger settings. Framer's own compliance checklist for a banner: "1) accept and
deny buttons, 2) auto-block cookies until user gives consent, 3) granular cookie consent option to users via Settings,
and a 4) link to a Cookie Policy" [S14]. Marketplace plugins exist (Cookie Consent Hub, ConsentBit), not evaluated.

### A8. Hosting location

VERIFIED [S17]. "All of Framer's services are hosted in Amazon Web Services (AWS) facilities in the United States,
with additional hosting infrastructure across Europe and Asia-Pacific, and global acceleration across 200+ edge
locations via AWS CloudFront." Sites are served from an anycast network whose IP ranges "have no single geographic
location". Framer B.V. is registered in Amsterdam (search summary of Framer DPA, SECONDARY). INFERENCE: form submissions
and analytics are processed by Framer with US infrastructure involved, which is an international transfer HotGreen's
privacy notice must mention (UK GDPR Art 13(1)(f)) [S29].

### A9. Plan prices

VERIFIED on the rendered pricing page with the billing toggle in both positions [S3].

| Plan | Billed yearly | Billed monthly | AI credits | Notes |
|---|---|---|---|---|
| Free | $0 | $0 | 500 to try | Framer domain only, no custom domain |
| Basic | $10 a month | $15 a month | 1,000 a month | 2 CMS collections, 50 GB, 30 pages, 20 hosting locations, no redirects, no staging, no static files |
| Pro | $30 a month | $45 a month | 3,000 a month | 10 collections, 100 GB, 150 pages, 300+ locations, redirects, staging, branching, 50 static files |
| Enterprise | Custom | Custom | Volume | SSO, SCIM, uptime guarantee |

Add-ons: extra editor $20 a month, content editor $10, locale $20 each, Convert (A/B testing and funnels) $50 per
500,000 events, Advanced hosting $200 [S3]. Prices exclude sales tax [S3]. Framer says existing paid site plans do not
change "unless you choose to switch" [S5], so HotGreen may be on a legacy plan (UNVERIFIED which).

### A10. SEO and AI readability features Framer already has

VERIFIED [S20][S21].
- Per page titles and descriptions in site settings, CMS page metadata, alt text, video posters, automatic
  `sitemap.xml` and `robots.txt` [S20].
- JSON-LD via custom code in the head, including CMS variables such as `{{Title | json}}` [S20].
- Markdown for AI tools: "When an AI agent requests a page with the Accept: text/markdown HTTP header, Framer returns a
  markdown version instead of HTML", also via `?md` [S21]. Tested on HotGreen, see C6.
- `llms.txt` hosting: static file hosting "is available on the Pro and Enterprise plans" and Framer says the file "is
  optional" [S21].

### A11. What Framer cannot do (so where a custom build is genuinely needed)

- **Per user access.** Built in password protection "places one shared password in front of the site. It does not
  create individual users, roles, or account-specific access controls" and it is site wide [S16]. VERIFIED. Per user
  logins need third party plugins (FrameAuth, PageLock appear on Framer's marketplace, not evaluated, SECONDARY).
  INFERENCE: an investor data room with named users, per document permissions, download logs and revocation is not a
  native Framer capability.
- **Server side logic.** Framer's Fetch feature needs your own endpoint: "the easiest way is to use a
  function-as-a-service platform ... A popular option is Cloudflare Workers" [S12]. Code components are React on the
  page [S4]. INFERENCE: a savings calculator whose model must stay private, or that writes leads to a CRM with
  validation, needs a backend outside Framer. A simple public calculator can live in a Framer code component.
- **Server API is not an app runtime.** It edits and publishes projects, is beta, has cold starts, "is not in any way
  transactional" [S10]. VERIFIED.
- **File uploads in native forms** are not in the documented field list [S13]. INFERENCE: RFQ with drawings or site data
  needs a third party form or custom backend.
- **Static files and redirects** need Pro [S3]. VERIFIED.

### Framer can versus cannot

| Need | Framer can (native) | Needs plugin, add-on or plan upgrade | Needs a custom build outside Framer | Source |
|---|---|---|---|---|
| Unique titles, meta, OG per page | Yes, and agent can do it by prompt | | | [S1][S20] |
| Alt text on every image | Yes, agent prompt exists | | | [S1] |
| Rebuild a page from a screenshot or URL | Yes (Agents) | Credits beyond plan allowance | | [S1][S6][S7] |
| Replace spec image with live text table | Yes | | | [S1] (layout prompts) |
| News or Press page from CMS | Yes | Pro if more than 2 collections | | [S3] |
| Automated CMS sync from Notion, sheet or API | | Server API (beta) or External Agents | A small script or scheduled job to run it | [S10][S8] |
| Contact form to email, Sheets, webhook | Yes | HubSpot, Typeform integrations | CRM logic beyond a webhook | [S13] |
| Audience routing on the form | Yes, a Select or Radio field | | | [S13] |
| File upload on a form | Not documented | Third party embed | Or custom backend | [S13] |
| German or other language version | | Localisation add-on $20 per locale | | [S3][S18] |
| Site search | Yes, all paid plans | | | [S3] |
| Privacy friendly analytics | Yes, built in | | | [S14] |
| Cookie consent banner | Yes, component with Consent Mode | Marketplace CMPs | | [S15] |
| Self hosted fonts | Yes, upload as custom fonts | | | [S19] |
| JSON-LD structured data | Yes, custom code in head | | | [S20] |
| Markdown copy for AI agents | Yes, automatic | | | [S21] |
| llms.txt | | Pro plan (static files) | | [S21][S3] |
| Staging, branching, redirects | | Pro | | [S3] |
| Single shared password | Yes | | | [S16] |
| Named user logins, roles, audit trail (investor data room) | No | Third party membership plugins | Yes for anything auditable | [S16] |
| Calculator with private model or server validation | Client side only | | Yes, backend such as a serverless function | [S12][S4] |
| Signed webhook into a CRM with enrichment and dedupe | Webhook out only | Zapier style tools | Yes for robust logic | [S13] |

---

## Part B. Compliance a UK company website must meet, and what applies to HotGreen

HotGreen Ltd facts used below, VERIFIED on the Companies House register [S26]: company number 16035994, "Private
limited Company", active, incorporated 23 October 2024, registered office "167-169 Great Portland Street, 5th Floor,
London, England, W1W 5PF". Place of registration England and Wales (INFERENCE from an unprefixed number and an English
registered office).

### B1. Trading disclosures on the website

- **Registered name.** SI 2015/17 reg 24(2): "Every company shall disclose its registered name on its websites" [S22].
  VERIFIED.
- **Further particulars.** Reg 25(1)(c) and (2): every company shall disclose on "its websites" "the part of the United
  Kingdom in which the company is registered; the company's registered number; the address of the company's registered
  office" [S22]. VERIFIED.
- **Sanction.** Reg 28: failure "without reasonable excuse" is an offence by the company and every officer in default,
  "a fine not exceeding level 3 on the standard scale" plus a daily default fine [S22]. Companies Act 2006 s.83: a
  company in breach can have contract claims dismissed if the defendant shows loss from the breach [S23]. VERIFIED.
- **Checks.** (1) Reopened regs 24 and 25 and quoted. (2) Looked for changes: legislation.gov.uk states "There are
  currently no known outstanding effects" for regs 24, 25 and 28 as of 25 Sep 2026 [S22]. (3) Second and third
  confirmation: Companies House guidance updated 21 July 2026 says a company must display its name "on websites" [S24],
  and GOV.UK says "On business letters, order forms and websites, you must show: the company's registered number; its
  registered office address; where the company is registered (England and Wales, Scotland or Northern Ireland)" [S25].
- **HotGreen today.** Footer reads "HotGreen™ Solutions is the trading name of HotGreen Ltd" on all three pages, and
  nothing else [S69]. So the registered name duty is met. Number, place of registration and registered office are
  missing. **Legal requirement, not met.**

### B2. Electronic Commerce Regulations 2002, general information

- Reg 6(1) requires an information society service provider to make available "the name of the service provider", "the
  geographic address at which the service provider is established", "his electronic mail address", and register details
  and registration number [S27]. VERIFIED.
- Is a brochure site an information society service? The UK definition points to the E-Commerce Directive, whose recital
  18 says these services "extend to services which are not remunerated by those who receive them, such as those
  offering on-line information or commercial communications" [S28]. VERIFIED text. Application to HotGreen is
  **INFERENCE (strong)**.
- **HotGreen today.** No email address, no `mailto:` link, no phone, no address anywhere on the three pages [S69].
  **Likely legal requirement, not met.**

### B3. UK GDPR Article 13, privacy notice for the contact form

- Art 13(1): "Where personal data relating to a data subject are collected from the data subject, the controller shall,
  at the time when personal data are obtained, provide" identity and contact details, purposes and legal basis,
  recipients, and transfer information [S29]. VERIFIED on legislation.gov.uk, "up to date with all changes known to be in
  force on or before 24 September 2026".
- **2026 change.** Art 13(2)(ca) now requires "the right to make a complaint to the controller under section 164A of the
  2018 Act", inserted 19 June 2026 [S29]. DPA 2018 s.164A was inserted "19.6.2025 for specified purposes, 19.6.2026 in so
  far as not already in force" [S29]. The ICO says the DUAA "requires you to take steps to help people who want to make
  complaints ... such as providing an electronic complaints form" and to acknowledge within 30 days [S34]. VERIFIED.
- **Checks.** (1) Reopened Art 13 and quoted. (2) Looked for 2025 and 2026 changes: found (ca) above and pending edits
  from S.I. 2026/386 not yet applied to the text [S29]. (3) Independent: ICO "You must provide privacy information to
  individuals at the time you collect their personal data from them" [S30], and Framer's own help makes the site owner
  the controller for form data [S14].
- **HotGreen today.** The four field form sits on every page and the word "privacy" appears nowhere [S69]. Names and
  business emails are personal data. **Legal requirement, not met.**

### B4. PECR cookie and tracking rules, and what the Data (Use and Access) Act 2025 changed

- **Commencement.** DUAA s.112 (new PECR reg 6), Sch 12 (new exceptions) and Sch 13 (enforcement) came into force on
  **5 February 2026** by S.I. 2026/82, made 29 January 2026 [S31][S32]. VERIFIED.
- **Scope widened.** New reg 6(2)(b): gaining access "includes a reference to collecting or monitoring information
  automatically emitted by the terminal equipment" [S31]. VERIFIED.
- **Analytics exception.** Sch A1 para 5: no consent needed where the sole purpose is "to collect information for
  statistical purposes about how a website ... is used with a view to making improvements", the data is shared only with
  someone assisting that aim, "the subscriber or user is provided with clear and comprehensive information about the
  purpose", and "is given a simple means of objecting, free of charge ... and does not object". Para 5(2): the exception
  does not cover "collecting or monitoring information automatically emitted by the terminal equipment" [S31]. VERIFIED.
- **ICO reading.** "Regulation 6 of PECR applies whenever the use of scripts and tags accesses or stores information on
  a user's device" [S33]. For a third party analytics provider you must "tell your users that you do so; and explain
  what the third party does with the information it collects", and the provider must be a processor [S33]. A simple
  objection can be "your 'statistical purposes' or 'appearance' toggles on by default, with the ability for users to
  change them to off at any time" [S33]. The ICO's own site banner does exactly that (observed, analytics toggle "On"
  with an "Off" option) [S38]. VERIFIED.
- **Fines.** DUAA Sch 13 para 18 applies the DPA 2018 "higher maximum amount" to breaches of "regulation 5, 6, 7, 8, 14,
  19 ..." [S31]. DPA 2018 s.157: higher maximum is "£17,500,000 or 4% of the undertaking's total annual worldwide
  turnover", whichever is higher [S31]. ICO: the DUAA "brings the enforcement powers under PECR into line with UK GDPR, so
  that enforcement mechanisms and penalties are the same in most cases" [S34]. VERIFIED.
- **Checks.** (1) Reopened s.112, Sch 12, Sch 13, SI 2026/82 and quoted. (2) Tried to disprove "commenced": SI 2026/82
  reg 2 lists s.112, Sch 12 and Sch 13 as in force 5 Feb 2026 [S32]; legislation.gov.uk annotations agree [S31]. (3)
  Independent: ICO DUAA pages [S34] and final storage and access guidance published 29 April 2026 [S37].
- **HotGreen today** [S69]. No cookies, no storage, so no consent banner is required for what runs now. The Framer
  analytics script reads locale and timezone and sends them to Framer on every page view. INFERENCE: this is within reg 6
  as the ICO reads scripts, and the statistical exception is available only once HotGreen tells visitors about it and
  offers a free way to object. Framer's own "no cookie banner needed" line [S14] is about consent, not about this
  information duty. **Legal requirement (information plus objection), not met. Consent banner not required today.**

### B5. ICO cookie enforcement 2025 and 2026

VERIFIED [S35][S36][S37][S38].
- 23 Jan 2025: ICO announced it would bring "the UK's top 1,000 websites into compliance"; it had assessed the top 200
  and "communicated concerns to 134" [S35].
- 4 Dec 2025: "979 of the top 1,000 websites met the ICO's compliance checks"; 564 fixed after ICO engagement; "in 17
  cases, issuing preliminary enforcement notices"; the checks targeted advertising cookies set before choice and whether
  rejecting was as easy as accepting [S36].
- 29 Apr 2026: final storage and access guidance published, covering "cookies, tracking pixels, device fingerprinting";
  "99% of the UK's top 1,000 websites now meet compliance standards for cookie banners" [S37].
- ICO enforcement listing, newest 25 actions (20 May to 7 Aug 2026): PECR penalties for calls and texts (for example KRA
  Consultancy fined £300,000 under regs 22 and 23), none about cookies [S38].
- INFERENCE: enforcement effort is aimed at high traffic sites and advertising tracking. HotGreen's legal exposure here is
  low, and the fix is cheap.

### B6. Google Fonts loaded from Google, the German rulings

- **LG München I, 20 Jan 2022, 3 O 17493/20.** The court databases (gesetze-bayern.de, rewis.io) blocked our fetcher,
  so the ruling is read through the German Bundestag research service paper WD 10-3000-038/22 (completed 11 Nov 2022)
  [S39]: no legitimate interest "da es für die Nutzung von Google-Fonts nicht erforderlich ist, dass beim Aufruf der
  Website eine Verbindung zu einem Google-Server hergestellt ... wird"; claims for injunction under § 823 and § 1004 BGB
  and damages under Art 82 GDPR; the court stressed loss of control over data sent to Google in the USA. SECONDARY
  (official parliamentary analysis). The €100 figure appears in multiple secondary summaries, not in the Bundestag text I
  read (UNVERIFIED on primary).
- **Later rulings.** LG München I, 30 Mar 2023, 4 O 13063/22: a claimant who used a crawler to provoke visits could not
  claim injunction or damages, and claims were abusive under § 242 BGB; earlier similar rulings LG Baden-Baden (11 Oct
  2022, 3 O 277/22) and AG Ludwigsburg (28 Feb 2023, 8 C 1361/22) [S40]. SECONDARY.
- **Now at the CJEU.** BGH, VI ZR 258/24, 28 Aug 2025, a Google Fonts case: proceedings stayed and three questions
  referred, including whether a dynamic IP address is personal data merely because a third party could identify the
  user, and whether provoked mass violations can ground damages [S41]. VERIFIED (BGH decision PDF). Registered as
  **C-654/25 (Undelam)**, lodged 6 Oct 2025 [S42]. VERIFIED. No judgment found (UNVERIFIED whether decided).
- **Context that weakens part of the 2022 reasoning.** The 2022 court relied on the USA being an unsafe third country.
  The EU US Data Privacy Framework adequacy decision dates from 10 July 2023, and on 3 Sep 2025 the General Court
  dismissed the challenge to it (T-553/23 Latombe) [S43]. VERIFIED. The "not necessary, you can host locally" limb of the
  reasoning is untouched (INFERENCE).
- **Checks.** (1) Primary court text not reachable, so the official Bundestag analysis was quoted. (2) Tried to find
  2025 and 2026 changes: found the BGH referral, C-654/25 and the DPF ruling above. (3) Independent: Der Betrieb [S40],
  BGH PDF [S41].
- **HotGreen today.** Requests go to `fonts.googleapis.com` and `fonts.gstatic.com` for Noto Sans, Space Grotesk and DM
  Sans on every page [S69]. Framer serves fonts picked from its Google tab "sourced from fonts.google.com" [S19];
  uploaded custom fonts avoid that. **Good practice in the UK (no UK ruling found). A legal risk in Germany only if EU
  GDPR applies to HotGreen via Art 3(2) targeting (INFERENCE, the site shows € figures), and the question is currently
  before the CJEU.**

### B7. European Accessibility Act

- Art 2(2): applies to listed "services provided to consumers after 28 June 2025": electronic communications,
  audiovisual access, passenger transport elements, consumer banking, e-books, and "e-commerce services" [S44]. VERIFIED.
- "'e-commerce services' means services provided at a distance ... at the individual request of a consumer with a view
  to concluding a consumer contract" and "'consumer' means any natural person who purchases ... for purposes which are
  outside his trade, business, craft or profession" [S44]. VERIFIED.
- Art 4(5): "Microenterprises providing services shall be exempt"; microenterprise means fewer than 10 persons and
  turnover or balance sheet not over EUR 2 million [S44]. VERIFIED.
- **Checks.** (1) EUR-Lex text quoted. (2) Looked for a B2B hook: none in Art 2(2). (3) European Commission page lists
  the same product and service categories [S45].
- **HotGreen.** A UK B2B brochure site selling industrial heat pumps to companies, no consumer contracts, team of six
  [dossier]. **Does not apply.** INFERENCE: the Equality Act 2010 duty for UK service providers was not checked in this
  session (UNVERIFIED).

### B8. WCAG on alt text and text in images

- SC 1.1.1 Non-text Content, Level A: "All non-text content that is presented to the user has a text alternative that
  serves the equivalent purpose" [S46]. VERIFIED.
- SC 1.4.5 Images of Text, Level AA: "If the technologies being used can achieve the visual presentation, text is used to
  convey information rather than images of text", except customisable or essential; "Logotypes ... are considered
  essential" [S46]. VERIFIED.
- WAI tutorial: a linked logo is a functional image whose alt should say where it goes ("Example.com homepage" rather
  than "Example.com logo"); an unlinked logo's alt is the organisation name; charts and data tables need a long
  description [S47]. VERIFIED.
- **HotGreen.** Every image has empty alt (29 on Home, 7 on Solutions, 2 on Contact in the rendered DOM at 1440 px)
  [S69]. The spec table is an image of text that HTML could render. **Good practice for HotGreen, not met.**

### Part B summary table

| Requirement | Legal or good practice for HotGreen | Source | Meets it now? | Evidence (25 Sep 2026) |
|---|---|---|---|---|
| Registered name on website | Legal (SI 2015/17 reg 24(2)) | [S22][S24][S25] | Yes | Footer "trading name of HotGreen Ltd" [S69] |
| Company number, place of registration, registered office on website | Legal (reg 25) | [S22][S24][S25] | **No** | Footer has none of the three [S69] |
| Email address and geographic address available | Legal, likely (E-Commerce Regs reg 6, applicability INFERENCE) | [S27][S28] | **No** | No mailto, no address, no phone [S69] |
| Privacy notice at point of collection | Legal (UK GDPR Art 13) | [S29][S30] | **No** | "privacy" absent on all pages [S69] |
| Notice names Framer and US transfers, Google fonts recipient | Legal (Art 13(1)(e) and (f)) | [S29][S17] | **No** | No notice exists |
| Right to complain to the controller, complaints process | Legal since 19 Jun 2026 (Art 13(2)(ca), DPA s.164A) | [S29][S34] | **No** | No notice or complaints route |
| Analytics disclosed with a free way to object | Legal since 5 Feb 2026 to use the PECR statistical exception (applicability to Framer's script is INFERENCE) | [S31][S32][S33] | **No** | events.framer.com runs, no information [S69] |
| Consent banner | Not required for what runs now; required if non essential cookies or trackers are added | [S31][S33][S14] | Not needed today | Zero cookies, zero storage [S69] |
| No Google Fonts calls without consent | Good practice in UK; legal risk in Germany if EU GDPR applies; pending at CJEU | [S39][S40][S41][S42] | **No** | fonts.googleapis.com and fonts.gstatic.com on every page [S69] |
| EAA accessibility | Not applicable | [S44][S45] | n/a | B2B, no consumer e-commerce |
| Alt text, no images of text (WCAG 1.1.1, 1.4.5) | Good practice | [S46][S47] | **No** | All alt empty; spec table is a PNG [S69] |
| Unique titles and descriptions, structured data | Good practice (search) | [S48][S51] | **No** | Same title on every page; no JSON-LD [S69] |

---

## Part C. Search and AI search

### C1. Google Search Central guidance

- **Unique titles.** "Make sure every page on your site has a title specified in the <title> element" and avoid
  "repeated or boilerplate text in <title> elements. It's important to have distinct text that describes the content of
  the page in the <title> element for each page on your site" [S48], last updated 2025-12-10. VERIFIED. HotGreen: all
  three pages "HotGreen Solutions" [S69].
- **Alt text.** "The most important attribute when it comes to providing more metadata for an image is the alt text";
  "Google uses alt text along with computer vision algorithms and the contents of the page to understand the subject
  matter of the image" [S49], updated 2026-03-02. VERIFIED.
- **Text inside images.** I looked for an explicit "do not put important text in images" rule in the current image SEO
  guide and the SEO Starter Guide and **did not find one** [S49]. The strongest current Google line is in the AI
  features guide: "Making sure that important content is available in textual form" [S50]. VERIFIED. So the spec table
  argument should rest on WCAG 1.4.5, AI readability and that Google line, not on an older "Google cannot read images"
  claim.
- **Organization structured data.** "Adding organization structured data to your home page can help Google better
  understand your organization's administrative details and disambiguate your organization in search results ...
  There are no required properties" [S51], updated 2026-09-08. Examples include `legalName`, `address`, `vatID`,
  `iso6523Code`, `sameAs`, `logo`. VERIFIED.
- **Product structured data.** Product snippets require `name` and "one of the following properties: review,
  aggregateRating, offers" [S52]. VERIFIED. INFERENCE: HotGreen has no price, no reviews, so Product markup will not
  earn a rich result today; it can still describe the product.
- **Article or NewsArticle.** Recommended for news pages, with `headline`, `datePublished`, `dateModified`, `author`,
  `image` [S53], updated 2026-09-08. Only relevant once a news page exists. VERIFIED.
- **Core Web Vitals.** Good thresholds: LCP within 2.5 s, INP under 200 ms, CLS under 0.1 [S54]. For `<video>`, LCP uses
  "the poster image load time or first frame presentation time for videos ... whichever is earlier" [S55]. VERIFIED.
  HotGreen lab LCP was 1.37 s desktop and 2.31 s phone with CLS near 0 [site-audit.md], so the 19.4 MB hero video is
  mainly a data cost for phone visitors, not a proven LCP failure (INFERENCE). Field data could not be pulled (PageSpeed
  API quota exhausted, see Could not verify).

### C2. How B2B buyers now use AI in vendor research

All VERIFIED on the publisher's own release unless marked. Four of the five survey software or tech buyers, not
industrial equipment buyers.

| Publisher | Date | Sample | Key finding | Source |
|---|---|---|---|---|
| Forrester, The State of Business Buying 2026 | 21 Jan 2026 | Buyers' Journey Survey, nearly 18,000 global buyers (search summary; the page quotes the finding) | "While genAI searches are the starting point for B2B buyers, leaders are increasingly relying on their internal and external buying networks"; "More than 60% of business buyers now make use of a trial"; procurement are decision makers in 53% of cycles | [S60] |
| G2, 2026 Buyer Behavior Report | 22 Jul 2026 | 1,000+ B2B software buyers plus 50+ interviews | 82% "sourced software recommendations from an AI chatbot in the last 24 months"; "Review sites (38%) also rose to be the top source shaping which vendors make a buyer's shortlist, surpassing AI chatbots (37%) for the first time" | [S61] |
| G2 research release | 15 Apr 2026 | 1,076 B2B decision makers, March 2026 | "51% of B2B software buyers now begin their software research with an AI chatbot more often than with Google, up from 29% in April 2025"; 71% rely on AI chatbots | [S62] |
| 6sense, 2025 Buyer Experience Report | 12 Nov 2025 | 4,000+ buyers, NA, EMEA, APAC | "94% of buying groups ranked preferred vendors before first contact"; 94% used LLMs, mainly to synthesise research; buyers bought from the early favourite 77% of the time | [S63] (read via WebFetch, direct fetch blocked) |
| TrustRadius, 2026 B2B Buying Disconnect | 15 Jul 2026 | Tech buyers (size not captured) | "63% of buyers used AI during their purchase journey"; "94% of buyers who used AI said they fact-check its responses"; AI recommendations "heavily influenced by trusted third-party content" (their interpretation) | [S64] |
| Gartner | 20 May 2026 | 645 B2B buyers, Aug to Sep 2025 | Buyers used "an average of seven information sources"; "45% said they used GenAI, primarily to gather information on vendors and products"; 69% prefer to validate AI output with sales reps | [S65] (Gartner page bot walled, read on the verbatim Business Wire syndication) |

Falsification note: older 2025 summaries say AI chatbots are the number one shortlist source. G2's own July 2026 data
reverses that (review sites 38% against AI 37%) [S61].

### C3. How AI assistants pick sources (what is actually documented)

- **Google AI Overviews and AI Mode.** "To be eligible to be shown as a supporting link in AI Overviews or AI Mode, a page
  must be indexed and eligible to be shown in Google Search with a snippet"; both "may use a "query fan-out" technique";
  "There are no additional requirements"; "You don't need to create new machine readable files, AI text files, or markup
  to appear in these features. There's also no special schema.org structured data that you need to add" [S50]. VERIFIED.
- **ChatGPT search.** "OAI-SearchBot is used to surface websites in search results in ChatGPT's search features. Sites
  that are opted out of OAI-SearchBot will not be shown in ChatGPT search answers" [S56]. VERIFIED. How results are
  ranked or which search partner feeds it: UNVERIFIED (OpenAI help centre returned 403).
- **Perplexity.** "PerplexityBot is designed to surface and link websites in search results on Perplexity. It is not
  used to crawl content for AI foundation models" [S57]. VERIFIED.
- **HotGreen access.** `robots.txt` is `Allow: /` for all agents; OAI-SearchBot, PerplexityBot, ClaudeBot and Googlebot
  user agents all receive HTTP 200 on `/solutions` [S69]. VERIFIED.
- Nothing beyond crawl access, indexability and text content is documented by the providers themselves. Claims in SEO
  blogs about citation ranking factors were not treated as evidence.

### C4. What a small company can realistically do

- **Consistent facts everywhere.** INFERENCE, grounded in observed inconsistency: the site says industrial heat is "19%"
  of emissions while Tech.eu says "over 20 per cent" [site-audit.md]; Seedtable lists "1.6M USD", Dealroom and PitchBook
  "$2.85M" (unverified); Vestbee calls the firm "Datchet-based" while the registered office is London [S67][S26]. AI
  answers repeat whatever third parties say (C5).
- **Organization JSON-LD with `sameAs`** to LinkedIn, Companies House, Dealroom, Wikidata, and `legalName`, `address`,
  `identifier` [S51]. Framer supports it via custom code [S20].
- **Wikidata.** No item exists for "HotGreen", "HotGreen Solutions" or "HotGreen Ltd" (Wikidata API search, 25 Sep 2026)
  [S66]. Notability requires "a clearly identifiable conceptual or material entity that can be described using serious
  and publicly available references" [S66]. VERIFIED. INFERENCE: the CCEP newsroom, Tech.eu and Companies House likely
  meet that bar; conflict of interest editing norms were not checked.
- **A press or news page** linking the ten external articles the audit found, so the brand's own domain holds the story
  (INFERENCE).
- **Live text for facts.** Google says important content should be in text [S50]; AI tools get Framer's markdown, which
  drops image content (C6). VERIFIED.
- **llms.txt.** A 2024 proposal by Jeremy Howard, v2 modified 10 Aug 2026 [S58]. Google Search: no "AI text files"
  needed [S50]. OpenAI's and Perplexity's crawler pages describe robots.txt controls and do not mention reading llms.txt
  [S56][S57]. Chrome Lighthouse added an agentic browsing audit that flags server errors on `/llms.txt` but marks a 404
  "Not Applicable ... as providing the file is optional at the moment" [S59]. **Verdict: no major provider documents
  using llms.txt for search or citations. Optional, Pro plan only on Framer, low priority.** HotGreen returns 404 today
  [S69].

### C5. What AI search says about HotGreen today (exact record)

| Engine | Time (UTC) | Query | Exactly what came back | Usable? |
|---|---|---|---|---|
| Andi (andisearch.com) | 12:33:52 | "What is HotGreen Solutions" | "I found this information on Vestbee. British HotGreen Solutions raises £1.2M to revolutionize industrial decarbonisation with high-temperature heat pumps. Datchet-based cleantech firm HotGreen Solutions, which builds industrial low-carbon heat pumps, has raised £1.2 million in a pre-seed funding round led by Empirical Ventures. HotGreen Solutions was established in 2024 by Georgia Ware and Andrew Anderson ..." Results list 20 domains; hotgreensolutions.com is 17th, after Vestbee, PitchBook, Tech.eu, Natural Refrigerants, Apple Podcasts, NZTC, Dealroom and others | Yes. Answer is 11 months old, omits the June 2026 round, CCEP deployment and HotStack |
| Andi | 12:34:47 | "industrial high temperature heat pump suppliers for steam in food and beverage UK" | Writeup lists HotGreen under "Specialist/emerging UK suppliers": "HotGreen Solutions (Datchet) [dash] raised £1.2M in 2025, targets food and beverage pasteurisation, brewing and drying with patent-pending isot..." (cut off while drafting). "patent-pending" does not appear on HotGreen's own site [site-audit.md], so it came from third parties | Yes, partial |
| Andi | 12:35:35 | "HotStack heat pump outlet temperature steam pressure COP" | "The search results don't contain specific data on a product called "HotStack" heat pump. Based on general heat pump physics ..." | Yes. Confirms the spec table is invisible |
| Bing Copilot Search | about 12:30 | "What is HotGreen Solutions heat pump company" and "HotGreen Solutions" | "There are no results for this question, please check your spelling or try different keywords." | **No. Control query "What is Coca-Cola Europacific Partners" returned the same message in the same minute, so this is our environment, not HotGreen** |
| Bing web | about 12:30 | "What is HotGreen Solutions"; "HotGreen Solutions heat pump" | Unrelated results (cricket scores; diversity training) | No, bot degraded |
| Google | 12:28:42 | "What is HotGreen Solutions" | "Our systems have detected unusual traffic from your computer network" | No |
| Brave Search | about 12:27 | "HotGreen Solutions" with summary | "Verifying you're not a bot" | No |
| Perplexity | about 12:31 | "What is HotGreen Solutions heat pump company" | Cloudflare "Performing security verification" | No |
| You.com | about 12:32 | same | Redirected to sign in | No |
| DuckDuckGo | about 12:31 | same | "upstream request failed" from our proxy | No |

(In the Andi category answer, "[dash]" stands for a dash character in Andi's original text.)

### C6. What AI agents receive from HotGreen's own site

Framer returns markdown to AI tools [S21]. Fetched with `Accept: text/markdown` and `?md` on 25 Sep 2026 [S69]:
- Home: the Partners section reads "## Partners" then "Some of our key funders and partners are:" and then goes straight
  to "## Applications". The seven backers, CCEP included, do not exist for an AI reader. VERIFIED.
- Solutions: stats (€250k, 1,500, 4x), the waitlist line and the IsoStack bullets are present. Nothing from the spec
  table: no 120°C or 220°C, no 2 or 25 bar, no CoP 2.8 or 4.5, no 0.5 to 10 MW, no delivery years. VERIFIED.
- Every page's front matter carries `title: HotGreen Solutions` and the same description. VERIFIED.

---

## What this means for HotGreen (all INFERENCE)

### What Sanya can realistically do herself with Framer AI

She has the skills she described on the call and Framer now publishes the exact prompts. On Basic's 1,000 credits a
month, at roughly 50 to 100 credits per edit [S5], this is a few days of her time, not a project.
- Unique titles, meta descriptions and OG cards per page (Framer prompt in [S1]).
- Alt text on every image, including naming each backer logo (prompt in [S1]); review the output by hand.
- Footer disclosures: registered name, number, England and Wales, registered office, an email address.
- Fix the form: rename the textarea to `message`, make First name actually required, add a Select for "I am an
  investor / a manufacturer / a partner" [S13].
- Upload Space Grotesk, DM Sans and Noto Sans as custom fonts to stop calls to Google [S19] (font licences UNVERIFIED in
  this session).
- A privacy notice page linked beside each form, covering Framer as processor, US infrastructure, Framer analytics with a
  way to object, Google Fonts if kept, retention, rights, the right to complain to HotGreen and to the ICO. A lawyer or
  a reputable template should sign it off.
- Fix Sera Evcimen's LinkedIn link, the "in on" typo, the product naming.
- Rebuild the spec table as live text (a layout prompt with the PNG attached works as a reference [S6]).
- Compress or replace the 19.4 MB hero video with a poster and a lighter file.

### What genuinely needs Astra

- **The story and the structure, not the pixels.** The audit's core finding is that the site says the wrong things to
  the wrong people. Deciding what an investor, a plant engineer and a procurement lead each need, in what order, with
  which proof, is judgement the agent does not supply (Framer itself says its output "starts to rhyme" [S4]).
- **An investor route with real access control.** Named users, per document permissions, audit trail, revocation. Not
  native to Framer [S16]; needs a custom build or a dedicated data room tool behind the site.
- **A savings calculator that is credible to an engineer.** If the model uses HotGreen's own performance data or must log
  and qualify leads, it needs a backend [S12]; a public client side version can sit in Framer.
- **CRM plumbing.** Signed webhooks into HubSpot or similar with dedupe and routing by audience [S13].
- **Content that proves the machine exists:** a proper spec sheet, a case narrative around the CCEP deployment with
  permission, press page, photography.
- **AI search presence:** consistent facts across Dealroom, PitchBook, LinkedIn, Companies House; a Wikidata item;
  Organization JSON-LD; a news collection that keeps the story current.
- **Compliance drafting** for the privacy notice and complaints route, with legal sign off.

### Quick wins, in order of risk removed per minute

1. Footer trading disclosures plus an email address (legal, minutes).
2. Privacy notice and a link at each form, including the analytics objection line (legal, an hour or two with a
   template).
3. Form field name fix (data loss risk, minutes).
4. Unique titles and descriptions, alt text (search and accessibility, under an hour with the agent).
5. Self host the three fonts (German risk, minutes).
6. Spec table as live text (AI readability, accessibility, an hour).
7. Organization JSON-LD on the home page (disambiguation, under an hour).
8. News or Press collection with the existing ten articles (story and AI answers, half a day).

### On the founder's concern about sending a finished design

The concern is justified. Framer's agents page itself offers "Here's a screenshot of a competitor's site. Build
something similar" [S1], and a Framer agent rebuilds pages from screenshots [S6]. Suggested handling: send reasoning and
partial or low fidelity visuals rather than full page screenshots before commitment, price the thinking and the parts
Framer cannot do (A11), and consider building inside HotGreen's own Framer workspace so Sanya owns the site afterwards.
Framer's pricing page says "Pro Experts get free editor access on any client project" [S3] (how Astra would qualify as
a Pro Expert was not checked).

---

## Source table

All accessed 25 September 2026.

| # | Title | Publisher | Date | URL | Primary or secondary | Supports | Reliability |
|---|---|---|---|---|---|---|---|
| S1 | AI agents for designing, updating, and improving sites | Framer | live Sep 2026 | https://www.framer.com/agents/ | Primary (vendor) | Agent capabilities, screenshot prompts, SEO and alt prompts | High for what the product offers; marketing tone |
| S2 | AI website builder, AI canvas agent (also served at /wireframer/) | Framer | live Sep 2026 | https://www.framer.com/ai/ | Primary (vendor) | Agent overview, models, FAQ, Wireframer URL now same page | High |
| S3 | Pricing (rendered, yearly and monthly) | Framer | live Sep 2026 | https://www.framer.com/pricing/ | Primary | Prices, limits, credits, site search, redirects, static files | High |
| S4 | Building Agents for Framer | Framer (Koen Bok) | 16 Jun 2026 | https://www.framer.com/blog/building-framer-agents/ | Primary (vendor) | Screenshot use, costs, limits, branching, code, analytics | High for intent, company claims on quality |
| S5 | AI credits, simpler plans, and lower prices | Framer | 16 Jun 2026 | https://www.framer.com/blog/ai-credits-simpler-plans-and-lower-prices/ | Primary | Framer 3.0 date, credit costs per task, plan changes | High |
| S6 | How to use Agents | Framer Help | updated 15 Sep 2026 | https://www.framer.com/help/articles/how-to-use-agents/ | Primary | Image references, section by section advice | High |
| S7 | How AI credits and Agent pricing work | Framer Help | Sep 2026 | https://www.framer.com/help/articles/how-ai-credits-and-agents-pricing-work/ | Primary | Credit rules, pause at limit | High |
| S8 | What you can do with Claude Code, Codex in ChatGPT, and other External Agents | Framer Help | Sep 2026 | https://www.framer.com/help/articles/what-you-can-do-with-local-agents/ | Primary | External agents, bulk CMS | High |
| S9 | Framer Launches AI Agents (press release) | Framer via Business Wire, read on Yahoo Finance | 16 Jun 2026 | https://finance.yahoo.com/technology/ai/articles/framer-launches-ai-agents-170000931.html | Primary (syndicated) | Launch date, capabilities, company stats | High for date; stats are company claims |
| S10 | Server API: introduction, quick start, reference, FAQ | Framer Developers | Sep 2026 | https://www.framer.com/developers/server-api-introduction | Primary | Programmatic CMS and publish, beta, not transactional | High |
| S11 | Developer changelog | Framer Developers | v5.1.0 24 Sep 2026 | https://www.framer.com/developers/changelog | Primary | API evolution 2025 to 2026 | High |
| S12 | Fetch introduction | Framer Developers | Sep 2026 | https://www.framer.com/developers/fetch-introduction | Primary | Backend needed for dynamic data | High |
| S13 | Adding a contact form; Connect Framer forms to a webhook; Add different field types | Framer Help | all updated 15 Sep 2026 | https://www.framer.com/help/articles/how-can-i-add-a-contact-form-to-my-framer-website/ ; https://www.framer.com/help/articles/framer-form-webhook-setup/ ; https://www.framer.com/help/articles/add-different-field-types-to-native-form/ | Primary | Destinations, JSON keys by name, signing, field types | High |
| S14 | GDPR and cookies in Framer; How Framer's built-in analytics work | Framer Help | updated 15 Sep 2026 | https://www.framer.com/help/articles/gdpr-and-cookies/ ; https://www.framer.com/help/articles/how-framer-s-built-in-analytics-work/ | Primary (vendor legal view) | No cookies claim, owner responsibility, banner checklist | High for facts, vendor's legal reading |
| S15 | Add a Cookie Banner to your site | Framer Academy | Sep 2026 | https://www.framer.com/academy/lessons/cookie-banner-component/ | Primary | Native banner, Consent Mode | High |
| S16 | Password protection lesson | Framer Academy | Sep 2026 | https://www.framer.com/academy/lessons/password-protection/ | Primary | One shared password, no users or roles | High |
| S17 | Guide to Framer's hosting infrastructure; Security | Framer | Sep 2026 | https://www.framer.com/help/articles/guide-to-framer-hosting-infrastructure/ ; https://www.framer.com/legal/security | Primary | AWS US plus EU and APAC, CDN | High |
| S18 | Auto Translate for Localization; Localization with AI | Framer | 3 Oct 2023 and Sep 2026 | https://www.framer.com/help/articles/auto-translate-for-localization/ ; https://www.framer.com/updates/localization | Primary | Localisation features, credits | High |
| S19 | How fonts are optimized; Adding custom fonts; Google Font Checker plugin | Framer and a marketplace author | Sep 2026 | https://www.framer.com/help/articles/how-are-fonts-optimized-in-framer/ ; https://www.framer.com/help/articles/how-to-add-custom-fonts/ ; https://www.framer.com/marketplace/plugins/google-font-checker/ | Primary (help), secondary (plugin) | Google tab fonts from fonts.google.com; upload alternative | High, plugin medium |
| S20 | Guide to SEO features; Structured data through JSON-LD | Framer Help | Sep 2026 | https://www.framer.com/help/articles/guide-to-seo-features-and-tools/ ; https://www.framer.com/help/articles/structured-data-through-json-ld/ | Primary | Titles, alt, JSON-LD custom code | High |
| S21 | Make your site readable by AI agents; Add an llms.txt file | Framer Help | Sep 2026 | https://www.framer.com/help/articles/make-site-readable-by-ai-agents/ ; https://www.framer.com/help/articles/llms-txt-framer/ | Primary | Markdown for agents; llms.txt Pro only, optional | High |
| S22 | SI 2015/17 regs 24, 25, 27, 28 | legislation.gov.uk | current, no outstanding effects | https://www.legislation.gov.uk/uksi/2015/17/regulation/25 | Primary law | Website trading disclosures, offence | Very high |
| S23 | Companies Act 2006 ss 82 to 84 | legislation.gov.uk | current | https://www.legislation.gov.uk/ukpga/2006/46/section/83 | Primary law | Civil consequence, offence | Very high |
| S24 | Incorporation and names, section 10 | Companies House | updated 21 Jul 2026 | https://www.gov.uk/government/publications/incorporation-and-names/incorporation-and-names | Primary regulator guidance | Name must appear on websites | Very high |
| S25 | Running a limited company: signs, stationery and promotional material | GOV.UK | current | https://www.gov.uk/running-a-limited-company/signs-stationery-and-promotional-material | Primary government guidance | Number, office, place on websites | Very high |
| S26 | HOTGREEN LTD overview, 16035994 | Companies House register | current | https://find-and-update.company-information.service.gov.uk/company/16035994 | Primary record | Number, office, type, date | Very high |
| S27 | Electronic Commerce (EC Directive) Regulations 2002 regs 2 and 6 | legislation.gov.uk | current | https://www.legislation.gov.uk/uksi/2002/2013/regulation/6 | Primary law | Email, address, register details duty | Very high |
| S28 | Directive 2000/31/EC recital 18 | EUR-Lex | 2000 | https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32000L0031 | Primary law | ISS covers online information and commercial communications | Very high |
| S29 | UK GDPR Art 13; DPA 2018 s.164A | legislation.gov.uk | current to 24 Sep 2026 | https://www.legislation.gov.uk/eur/2016/679/article/13 ; https://www.legislation.gov.uk/ukpga/2018/12/section/164A | Primary law | Privacy notice contents, new complaint right | Very high |
| S30 | The right to be informed | ICO | current | https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/individual-rights/the-right-to-be-informed/ | Primary regulator | Notice at time of collection | Very high |
| S31 | Data (Use and Access) Act 2025 s.112, Sch 12, Sch 13; DPA 2018 s.157 | legislation.gov.uk | Royal Assent 19 Jun 2025, in force 5 Feb 2026 | https://www.legislation.gov.uk/ukpga/2025/18/section/112 ; https://www.legislation.gov.uk/ukpga/2025/18/schedule/12 ; https://www.legislation.gov.uk/ukpga/2025/18/schedule/13 ; https://www.legislation.gov.uk/ukpga/2018/12/section/157 | Primary law | New reg 6, exceptions, fines | Very high |
| S32 | S.I. 2026/82, DUAA commencement | legislation.gov.uk | made 29 Jan 2026 | https://www.legislation.gov.uk/uksi/2026/82/made | Primary law | 5 Feb 2026 commencement | Very high |
| S33 | Storage and access technologies guidance: What are the exceptions; What are storage and access technologies | ICO | final Apr 2026 | https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guidance-on-the-use-of-storage-and-access-technologies/what-are-the-exceptions/ | Primary regulator | Scripts in scope, analytics exception conditions | Very high |
| S34 | DUAA: what it means for organisations; Summary of changes, PECR | ICO | latest update 19 Jun 2026 | https://ico.org.uk/about-the-ico/what-we-do/legislation-we-cover/data-use-and-access-act-2025/the-data-use-and-access-act-2025-what-does-it-mean-for-organisations/ | Primary regulator | Penalties aligned with UK GDPR, complaints duty | Very high |
| S35 | ICO takes action to tackle cookie compliance across the UK's top 1,000 websites | ICO | 23 Jan 2025 | https://ico.org.uk/about-the-ico/media-centre/news-and-blogs/2025/01/ico-takes-action-to-tackle-cookie-compliance-across-the-uk-s-top-1-000-websites/ | Primary | 2025 enforcement strategy | Very high |
| S36 | ICO action secures increased cookie compliance | ICO | 4 Dec 2025 | https://ico.org.uk/about-the-ico/media-centre/news-and-blogs/2025/12/ico-action-secures-increased-cookie-compliance/ | Primary | 979 of 1,000, 17 PENs | Very high |
| S37 | Final storage and access technologies guidance published | ICO | 29 Apr 2026 | https://ico.org.uk/about-the-ico/media-centre/news-and-blogs/2026/04/final-storage-and-access-technologies-guidance-published/ | Primary | Final guidance, 99% figure | Very high |
| S38 | Enforcement action listing; ICO site cookie banner | ICO | viewed 25 Sep 2026 | https://ico.org.uk/action-weve-taken/enforcement/ | Primary | No cookie actions in newest 25; toggle model | High (first 25 rows only) |
| S39 | WD 10-3000-038/22, Google Fonts | Deutscher Bundestag, Wissenschaftliche Dienste | 11 Nov 2022 | https://www.bundestag.de/resource/blob/944580/2944801932313b20ae2ece73cb3dd3f2/WD-10-038-22-pdf.pdf | Secondary (official analysis of the ruling) | LG München I 2022 reasoning | High |
| S40 | Google Fonts: Abmahnwelle war rechtsmissbräuchlich | Der Betrieb | 2023 | https://der-betrieb.de/meldungen/google-fonts-abmahnwelle-war-rechtsmissbraeuchlich/ | Secondary (legal trade press) | LG München I 30 Mar 2023, related rulings | Medium high |
| S41 | BGH Beschluss VI ZR 258/24 | Bundesgerichtshof (PDF hosted by CJEU) | 28 Aug 2025 | https://curia.europa.eu/site/upload/docs/application/pdf/2026-02/vi_zr_258-24.pdf | Primary court decision | Referral questions on IP addresses and damages | Very high |
| S42 | C-654/25 Undelam, request for preliminary ruling (Dutch translation) | Netherlands government ECER archive | lodged 6 Oct 2025, received 24 Nov 2025 | https://ecer.minbuza.nl/documents/20142/0/C-654-25+verwijzingsbeslissing.pdf/ce86c249-872e-8687-4e91-e8eddd572952?t=1769691705230 | Primary (official translation) | Case number for the BGH referral | High |
| S43 | Press release 106/25, Latombe v Commission T-553/23 | Court of Justice of the EU | 3 Sep 2025 | https://curia.europa.eu/site/upload/docs/application/pdf/2025-09/cp250106en.pdf | Primary | DPF upheld at first instance | Very high |
| S44 | Directive (EU) 2019/882, European Accessibility Act | EUR-Lex | 2019, applies 28 Jun 2025 | https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32019L0882 | Primary law | Scope, consumer definition, micro exemption | Very high |
| S45 | European Accessibility Act | European Commission | current | https://commission.europa.eu/strategy-and-policy/policies/justice-and-fundamental-rights/disability/union-equality-strategy-rights-persons-disabilities-2021-2030/european-accessibility-act_en | Primary | Covered products and services | High |
| S46 | WCAG 2.2 Recommendation; Understanding SC 1.4.5 | W3C | 12 Dec 2024 | https://www.w3.org/TR/WCAG22/ ; https://www.w3.org/WAI/WCAG22/Understanding/images-of-text.html | Primary standard | SC 1.1.1 Level A, SC 1.4.5 Level AA | Very high |
| S47 | Images tutorial: functional, textual, complex | W3C WAI | current | https://www.w3.org/WAI/tutorials/images/functional/ | Primary guidance | Logo and chart alt practice | Very high |
| S48 | Influencing your title links | Google Search Central | updated 2025-12-10 | https://developers.google.com/search/docs/appearance/title-link | Primary | Unique titles | Very high |
| S49 | Image SEO best practices; SEO Starter Guide | Google Search Central | 2026-03-02; 2025-12-10 | https://developers.google.com/search/docs/appearance/google-images ; https://developers.google.com/search/docs/fundamentals/seo-starter-guide | Primary | Alt text; no explicit text in images rule found | Very high |
| S50 | AI features and your website | Google Search Central | updated 2025-12-10 | https://developers.google.com/search/docs/appearance/ai-features | Primary | AI Overviews eligibility, no AI files, text content | Very high |
| S51 | Organization structured data | Google Search Central | updated 2026-09-08 | https://developers.google.com/search/docs/appearance/structured-data/organization | Primary | Org markup, no required properties | Very high |
| S52 | Product snippet structured data | Google Search Central | updated 2026-09-08 | https://developers.google.com/search/docs/appearance/structured-data/product-snippet | Primary | review, aggregateRating or offers required | Very high |
| S53 | Article structured data | Google Search Central | updated 2026-09-08 | https://developers.google.com/search/docs/appearance/structured-data/article | Primary | NewsArticle properties | Very high |
| S54 | Understanding Core Web Vitals | Google Search Central | updated 2025-12-10 | https://developers.google.com/search/docs/appearance/core-web-vitals | Primary | Thresholds | Very high |
| S55 | Largest Contentful Paint | web.dev (Google) | updated 4 Sep 2025 | https://web.dev/articles/lcp | Primary | Video poster or first frame for LCP | Very high |
| S56 | Overview of OpenAI crawlers | OpenAI | current | https://developers.openai.com/api/docs/bots | Primary | OAI-SearchBot surfaces sites in ChatGPT search | Very high |
| S57 | Perplexity crawlers | Perplexity | current | https://docs.perplexity.ai/docs/resources/perplexity-crawlers | Primary | PerplexityBot surfaces sites | Very high |
| S58 | The /llms.txt file (v2) | llmstxt.org (Jeremy Howard) | 3 Sep 2024, modified 10 Aug 2026 | https://llmstxt.org/ | Primary (proposal author) | What llms.txt is, adoption claims | High for the proposal, adoption claims are the author's |
| S59 | llms.txt audit, Lighthouse agentic browsing | Chrome for Developers | updated 2026-05-05 | https://developer.chrome.com/docs/lighthouse/agentic-browsing/llms-txt | Primary | Optional, 404 is N/A | Very high |
| S60 | Forrester: The State Of Business Buying, 2026 | Forrester | 21 Jan 2026 | https://www.forrester.com/press-newsroom/forrester-2026-the-state-of-business-buying/ | Primary (research firm release) | genAI starting point, trials, procurement | High |
| S61 | New G2 Research: AI Is Reshaping How B2B Software Deals Are Won and Lost | G2 | 22 Jul 2026 | https://company.g2.com/news/buyer-behavior-2026 | Primary (vendor research) | 82% AI sourced, review sites 38% vs AI 37% | Medium high, G2 sells reviews |
| S62 | New G2 Research: Half of B2B Software Buyers Now Start Their Research With AI Chatbots | G2 via PR Newswire | 15 Apr 2026 | https://www.prnewswire.com/news-releases/new-g2-research-half-of-b2b-software-buyers-now-start-their-research-with-ai-chatbots-302742807.html | Primary | 51% start with AI; method | Medium high |
| S63 | The timeline for influencing B2B buyers is shrinking (2025 Buyer Experience Report) | 6sense | 12 Nov 2025 | https://6sense.com/newsroom/the-timeline-for-influencing-b2b-buyers-is-shrinking-insights-from-6senses-2025-buyer-experience-report/ | Primary (read via summariser, direct fetch 403) | 94% rank vendors before contact | Medium, vendor research and indirect read |
| S64 | TrustRadius 2026 B2B Buying Disconnect Report | TrustRadius via PR Newswire | 15 Jul 2026 | https://www.prnewswire.com/news-releases/trustradius-2026-b2b-buying-disconnect-report-reveals-ai-has-changed-how-buyers-research-but-not-what-they-trust-302825792.html | Primary | 63% used AI, 94% fact check | Medium high, vendor research |
| S65 | Gartner Survey Finds 69% of B2B Buyers Turn to Sales Reps to Validate AI-Generated Insights | Gartner via Business Wire (FinancialContent) | 20 May 2026 | https://markets.financialcontent.com/stocks/article/bizwire-2026-5-20-gartner-survey-finds-69-of-b2b-buyers-turn-to-sales-reps-to-validate-ai-generated-insights | Primary (verbatim syndication; gartner.com bot walled) | 645 buyers, 45% used GenAI | High |
| S66 | Wikidata:Notability; wbsearchentities API | Wikidata | current | https://www.wikidata.org/wiki/Wikidata:Notability | Primary | No HotGreen item; notability bar | Very high |
| S67 | Andi AI search, three queries | Andi (andisearch.com) | 25 Sep 2026 12:33 to 12:35 UTC | https://andisearch.com/?q=What%20is%20HotGreen%20Solutions | Primary observation | What an AI search engine says about HotGreen | High as a snapshot, one engine only |
| S68 | Bing Copilot Search, Bing, Google, Brave, Perplexity, You.com, DuckDuckGo attempts | Various | 25 Sep 2026 about 12:27 to 12:32 UTC | https://www.bing.com/copilotsearch?q=HotGreen+Solutions | Primary observation | Environment blocked or degraded, with control | High that these are our failures |
| S69 | HotGreen live site checks (rendered DOM, network capture, storage, robots, sitemap, markdown, llms.txt, crawler UAs) | Own measurement | 25 Sep 2026 | https://www.hotgreensolutions.com/ | Primary observation | Every "HotGreen today" line | High |

Internal references also used: `state/hotgreen/research/site-audit.md` and `state/hotgreen/dossier.md` (Astra's own audit
of 25 Sep 2026), cited as [site-audit.md] and [dossier].

**Count: 69 source rows** (S1 to S69), above the 25 to 35 target because each recommendation changing claim needed its
primary text plus an independent check. Grouped by publisher and document there are about 45 distinct documents across
Framer, UK and EU legislation, the ICO, Companies House, German courts, the CJEU, W3C, Google, OpenAI, Perplexity, and
five survey publishers.

---

## Could not verify

- **The LG München I 2022 judgment text itself.** gesetze-bayern.de returned a bot check and rewis.io blocked us. Read
  via the Bundestag analysis instead. The €100 damages figure is only in secondary summaries.
- **The LG München I 30 Mar 2023 judgment (4 O 13063/22)** on a primary court site. Secondary only [S40]; the LG
  München I 2023 press releases 1 to 40 contain no Google Fonts item.
- **Whether C-654/25 has been decided or has an Advocate General opinion.** InfoCuria not reached. No judgment found.
- **Gartner's page directly** (bot wall); used the verbatim Business Wire syndication.
- **6sense's page directly** (403); used a fetch summariser, so figures are one step removed.
- **OpenAI's ChatGPT search help article** (403): how ChatGPT ranks sources and which search partners feed it.
- **Framer Agents launch release on businesswire.com** (403); read the Yahoo Finance syndication.
- **Field Core Web Vitals for hotgreensolutions.com.** PageSpeed Insights API returned HTTP 429, daily quota exceeded.
  The site is probably too small to have CrUX field data anyway (INFERENCE).
- **Any consumer AI assistant answer** from Google AI Overviews, ChatGPT, Perplexity, Copilot, Brave or You.com. All were
  blocked, bot degraded or required sign in from this environment. Only Andi returned a usable answer.
- **The WebSearch tool budget ran out** late in the session, so the Equality Act 2010 position for a UK B2B website, the
  licences of Space Grotesk, DM Sans and Noto Sans, and Framer's `hreflang` behaviour on a primary page were not
  checked.
- **Which Framer plan HotGreen is on.** Not visible from outside.
- **Whether the duplicated `lastname` field actually loses data.** Would need a test submission, which was out of scope.
- **Framer Pro Experts eligibility** for Astra.
