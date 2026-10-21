# BidX, how it wins clients today (research run 21 Oct 2026, 12:30 to 13:10 UTC)

Read only. Nothing was submitted, no account was created, nothing was booked. Two app modals were opened by
clicking "Get Started" to see where the button leads; neither form was filled.

Labels. **VERIFIED** = opened at source this session (page, file or statutory record named). **CLAIMED** = the
company or person says it about themselves, source opened, not independently checked. **INFERRED** = my reading of
verified facts, reasoning given. **SNIPPET** = only seen in a search result, not opened (kept out of conclusions).

Evidence on disk (HTML, rendered text, screenshots, scripts):
`/tmp/claude-0/-home-user-astra-agency/3eb57ba4-cf6b-5d03-9c5f-6f974020ac75/scratchpad/gtm-research/bidx-funnel-work/`
(`raw/`, `shots/`, `scripts/`). Other agents write to `gtm-research/raw` and `gtm-research/shots`, so my copies are in
`bidx-funnel-work/`.

---

## 0. Corrections and additions to what was "already known"

| Known item | Status today | Evidence |
|---|---|---|
| "/landing is an ad style page" | **WRONG.** `https://www.bidx.ai/landing` returns `301` to `https://www.bidx.ai`. It is a catch-all redirect: `/contact`, `/terms`, `/privacy-policy`, `/lp2`, `/eligible`, `/stay-tuned` all 301 to home too. The 20 Oct crawl (`state/prototypes/bidx/research/crawl-pass1.json`) also recorded `/landing` as the identical 370-word homepage. The site logo links to `/landing`. The only ad style page on bidx.ai is `/lp1`. A second ad style page exists on the app, `https://app.bidx.ai/landing` (section 2). | VERIFIED, `curl -D -` headers 12:31 UTC |
| Google Ads tag AW-16776043498 | Correct, and there is more. Every page also loads GTM container `GTM-54S5RJRQ` (version 33). It holds GA4 `G-GZFGNRWGQ8`, **15 Google Ads conversion labels**, and a **Meta pixel `1295291375233483` that fires on every page view**. Triggers reference `quiz.bidx.ai`, `google.bidx.ai`, `guide.bidx.ai`, `/eligible`, `/eligible2`, `/eligible3`, `/stay-tuned`, `/ebook-thank-you-page`, Tally form submits and Calendly events. | VERIFIED, `https://www.googletagmanager.com/gtm.js?id=GTM-54S5RJRQ` decoded |
| Booking widget | Correct. Hosted on **GoHighLevel / LeadConnector** (`get.bidx.ai` CNAME `brand.ludicrous.cloud`, scripts from `leadconnectorhq.com`). Title "Book Your FREE Meeting & Win £/€100K-£/€2M+ Grant Funding (W)", 30 min. The upfront question has **four** options and the £3K one is a different product: "£3K - You write it and our expert team reviews and optimises it". | VERIFIED, rendered `https://get.bidx.ai/widget/bookings/book-your-free-consultation-and-win-100k-2m-funding` |
| Meta ads Oct to Dec 2025, inactive | Confirmed. 17 Oct 2025 to 12 Dec 2025, none active today. Detail in 1.4. | VERIFIED |
| Trustpilot 0 reviews | Confirmed, 0 reviews, profile **claimed Dec 2025**. | VERIFIED, rendered `https://uk.trustpilot.com/review/bidx.ai` |
| £125M+ / 312 founders | The same "£125 million" figure appears on Grow London Local's listing **for GrantUp**, and BidX's own About page attributes "more than £125M" to Aaron personally. BidX was incorporated 12 Oct 2023. | VERIFIED text; INFERRED that BidX's headline proof is Aaron's career / GrantUp figure, not BidX-only wins |
| Aaron = Innovate UK assessor | GrantUp team page still lists "Innovate UK assessor" under his name. | CLAIMED, `https://grantup.co.uk/team` |
| New, not in the known list | Both founders now run **Panda** (panda.new, an AI app builder, LaunchX Limited 17214690, directors Simon and Aaron since 12 May 2026). Both LinkedIn profiles show Panda as current company. BidX's PSC changed on 9 Apr 2026 to **Quantro Group Limited** (16956368, holding company, both founders directors since 12 Jan 2026). | VERIFIED, Companies House and `https://panda.new/terms` |

---

## 1. Every acquisition channel, ranked by apparent weight today

### Ranking (weight = what is live and fed today, not what was built once)

| # | Channel | Live now? | Weight | Label |
|---|---|---|---|---|
| 1 | Founder network, referrals and direct outreach | Probably | Highest by elimination | INFERRED |
| 2 | Website to booking widget to pre-call guide (the one conversion path) | Yes | High, it is where every channel lands | VERIFIED |
| 3 | LinkedIn: company page plus founders' personal reach (30K followers combined) | Page exists, no posting | Low, dormant asset | VERIFIED |
| 4 | Retargeting audiences (Meta pixel, Google Ads, GA4 still firing) | Tracking yes, ads no | Latent | VERIFIED |
| 5 | Paid social (Meta) | No, stopped 12 Dec 2025 | Zero now | VERIFIED |
| 6 | Google Ads | 0 ads visible in Ads Transparency | Zero visible | VERIFIED + INFERRED |
| 7 | Organic search / content | 5-URL sitemap, empty blog | Near zero | VERIFIED |
| 8 | Reviews, press, events, podcasts, partnerships, directories | None found for BidX | Zero | VERIFIED with controls |

Why #1 is inferred. Every paid and content channel is off or empty, yet the booking path is still maintained (two booking systems
live, a pre-call guide carrying current pricing). The supporting signals: Simon's LinkedIn says "Simon can introduce you to
10+ people at BidX"; the BidX LinkedIn page shows **134 employees** against "2-10" on a duplicate page, which reads
like an associate writer network; the privacy notice says marketing opt-out is by replying "Not interested"
(`https://app.bidx.ai/privacy-policy`), wording typical of cold email, and says they obtain data "from public
databases, joint marketing partners... intent data... for targeted advertising"; the booking calendar title ends in
"(W)", which suggests source-tagged calendars. None of this proves an outbound engine, so it stays INFERRED.

### 1.1 The website and the one conversion path (VERIFIED)

- bidx.ai is 5 pages in its sitemap (`https://www.bidx.ai/sitemap.xml`): `/`, `/about-us`, `/blog`, `/lp1`,
  `/book-your-free-meeting-win-100k-2m-grant-funding`. All lastmod `2026-10-20T14:37:38+00:00`. robots allows all.
- Every CTA on every page goes to the GHL booking widget. Nav = Home, About. Footer = Contact (also the widget),
  Privacy and Terms (both on `app.bidx.ai`).
- `/lp1` still carries a legacy Calendly link `https://calendly.com/d/cnx3-ngj-zk2/book-your-free-meeting-win-100k-2m-grant-funding?month=2025-09`,
  and `/book-your-free-meeting-win-100k-2m-grant-funding` embeds that Calendly. Two booking systems live at once.
- `/lp1` copy: "UK's #1 Founder Funding Platform", "Only 25 founders accepted per cycle to guarantee wins", "17×
  faster than manual research", "99.9% uptime guarantee", testimonials attributed only to "Sustainable tech
  startup", "Renewable energy startup", "Healthcare startup" (CLAIMED, unnamed).
- Booking form fields (rendered today): name, email, company, phone, website or LinkedIn, "What are you building and
  why?", grant size (£/€100K to 500K, 500K to 1M, 1M+), use of funds (four eligible, one marked ineligible), monthly
  revenue (pre-revenue to £50K+), and "What could you invest upfront" (£3K review / £7.5K one / £12.5K two / £15K
  three applications).
- **The pre-call guide** at `https://guide.bidx.ai/` (Vite app on Vercel) is a full-screen iframe of a Google Doc
  `https://docs.google.com/document/d/1YidAC1EzwvoO99tJGB2HE_vLiMiBKeCVYrpaIYaKmu8/edit`, titled "Unlock £/€100K–£/€2M+
  in Grant Funding in 120 Days", viewable by anyone with the link (renders with "Request edit access" and "Sign in"
  in Google's chrome; export is blocked, 401). GTM counts a visit to `guide.bidx.ai` as a Google Ads conversion. What
  it says (CLAIMED unless noted):
  - "70% Application success rate", "£125M+", "312+ founders funded".
  - Wins: Flock Mobility £600K+, Fornax £393K, Complete Building Control £250K, Fluence £75K, Act For Change £75K.
    Testimonials from Terry Yoell (Flock) and Mel Singh (CBC).
  - Own grant: £99,350 Innovate UK, GtR ref 10105102 (not re-derived, per brief).
  - **Pricing, the only place it is public**: Single £7,500 + VAT; Two £12,500 + VAT ("RECOMMENDED"); Three £15,000
    + VAT ("BEST VALUE"); further application £5,000 + VAT within a 12-month service period; **success fee 2.5%** of
    grant received, or a 1% upfront buyout; upgrade within 30 days with credit.
  - "Triple Risk Reversal": Technical Concept in five business days or refund; no suitable route, full refund; no
    grant cash, no success fee.
  - Founders' bios: Aaron "40+ grants won for his own startups", "Multiple technology businesses, two exits"; Simon
    "$1B+ public and private contracts helped teams win", "Boeing, Airbus, HSBC, Barclays, HMRC, FCA".
  - Scope now includes EU: "Horizon Europe, EIC Accelerator", amounts in £/€.

### 1.2 LinkedIn (VERIFIED, read signed-out)

| Account | Followers | Posting | Source |
|---|---|---|---|
| BidX company `linkedin.com/company/bidx-ai` | **894** | **No posts** in the signed-out feed (0 post cards; same method pulled 10 posts from GrantUp's page in the same session) | tagline "Unlock £100K-£2M Grant Funding in 120 days", "Software Development", "51-200 employees" (CLAIMED), "134 employees", founded 2024 |
| Duplicate BidX page `linkedin.com/company/bidxai` | **5** | none | "Win up to 4x 6-7 figure innovation grants at the lowest industry cost with our AI-powered platform", 2-10 employees |
| Simon Dutta `linkedin.com/in/simondutta` | **17K**, 500+ connections | Last original post **10 May 2024**. Visible posts all Oct 2023 to May 2024. Recent activity is likes only (2 days to 3 weeks ago). | current company **Panda**, University of Birmingham, service "Growth Marketing" |
| Aaron Mason `linkedin.com/in/aaronmase` | **13K** (13,433 on a post page), 500+ connections | Original posts 12 Sep 2025, 24 Mar 2026, 9 Jun 2026. **None mention BidX.** Many likes through 20 Oct 2026. | current company **Panda**, University of Surrey |
| BidX AI Facebook page `facebook.com/61568890847364` | **112** | post dates walled | via `tools/social-audit.js` |

Post dates decoded from LinkedIn activity IDs. Engagement on Simon's best post (the £293k client win, 10 May 2024):
120 reactions, 21 comments. His BidX £100K grant announcement (14 Dec 2023): 41 reactions, 18 comments. Aaron's
EU patient transport consortium call (9 Jun 2026): 40 reactions, 6 comments.

### 1.3 Google Ads (VERIFIED + INFERRED)

- Ads Transparency Center, region UK, any time: **bidx.ai 0 ads, get.bidx.ai 0 ads**. Positive control in the same
  run: granttree.co.uk 36 ads. Advertiser search "BidX", "Bidx Limited", "BIDX LTD" returns only BidX GmbH (DE) and
  BIDX1 TECHNOLOGY LIMITED (IE). No BIDX LIMITED advertiser.
- Yet GTM holds 15 conversion actions, click triggers on "Get started for free", "Check your eligibility", "Apply
  now" pointing at `https://google.bidx.ai/`, and a quiz at `quiz.bidx.ai`. **Both subdomains are now NXDOMAIN**
  (Google DNS status 3), while `guide.bidx.ai`, `get.bidx.ai`, `app.bidx.ai` resolve.
- INFERRED: a Google Ads funnel was set up (a dedicated `google.bidx.ai` landing page and a quiz) and has since been
  torn down; ads either ran on domains no longer shown or never served at scale. Not provable from outside.

### 1.4 Meta ads (VERIFIED)

- Page "BidX AI", page link `facebook.com/61568890847364`.
- First results page for keyword "grant funding" bidx, UK, all statuses: **12 creative groups, about 95 ad versions,
  17 Oct 2025 to 12 Dec 2025**, Facebook, Instagram, Messenger, Audience Network, Threads.
- Primary text on every one: "Use Grant Funding to Build New Products, Expand Your Team, and Grow Your Business
  Without Giving Away Equity. Apply Today". Link caption "Take our 60-Second Quiz, See if you Qualify", CTA "Learn
  More", display URL `www.bidx.ai`.
- Image hooks: "Startups & SMEs, are you missing out? £100k–£2m Technology grants. Are you eligible? Check eligibility";
  "Startups or SMEs doing £5K+/mo? £100K–£2M Startups and SMEs claim grant funding. 60-second quiz. Zero dilution";
  "£100K–£2M TECH grant funding to hire engineers and launch faster". Several video versions would not play.
- Active today: none. Same keyword with `active_status=active` returns "No ads match", while the control query
  "grant funding" active returns ~150 active ads from others in the same minute. "BidX AI" exact phrase, active, also
  none. (The page-ID view returned 0 even for "all", so it was not used.)

### 1.5 Organic, reviews, press, events, partnerships, directories

- Organic: 5 indexed URLs, blog has no posts, no lead magnet on bidx.ai. VERIFIED.
- Name collision: "BidX" is also bidx.io (German Amazon ads tool, acquired May 2025), BidX1 (property auctions),
  Infotech BidX (US construction bids, the Capterra listing), BidX Markets. Trustpilot's "people also looked at"
  for bidx.ai shows bidx.io and BidX1. Google News for "BidX OR bidx.ai" returns 25 items, none about this company.
  VERIFIED (`tools/news.py`, control "Tesco" 100 results).
- Press, podcasts, webinars, events for BidX or the founders as BidX: none found. Founders' name search in Google
  News returned 0. VERIFIED negative with control.
- Partnerships: none stated on bidx.ai. The pre-call guide says "we can also introduce match-funding providers"
  (CLAIMED, unnamed).
- Directories: TheOrg `https://theorg.com/org/bidx-ai` (unverified profile, "89 people", "Grant Management 82
  people", tagline "Unlock £300B+ in Government Grants & Tenders with AI"); StudySmarter Talents
  `https://talents.studysmarter.co.uk/companies/bidx-ai/` describes it wrongly as an ad-bidding company; Dealroom
  `https://app.dealroom.co/companies/bidx_ai` returned 403; Capterra and G2 "BidX" are other companies. No Clutch,
  GoodFirms or Product Hunt listing found (search only).

---

## 2. The app (app.bidx.ai)

All VERIFIED by rendering in Chromium today unless labelled.

- Stack: Bubble (`bubble_page_name`, Bubble CDN), app id `bidx-65813`. Matches the Sidetool case study
  (`https://www.sidetool.co/case-studies/bidx/`).
- **Root** `https://app.bidx.ai/` redirects to `/bidx-login?view=login`: "Welcome back! Email, Password, Forgot
  Password?, Login" beside "Find the right grants faster with AI... Get started in minutes. PARTNERS [Google,
  Microsoft, Amazon logos]". **No sign-up link on that screen.** `?view=signup` renders an empty left pane.
- **Grant Finder** `https://app.bidx.ai/grant-finder` is public. Logged out it shows **"0 grants found"** and "No
  Matching Grants Found", even after removing the "Open" filter and clicking "Browse all available grants" (20 s
  wait; the Elasticsearch calls return 200, so the page works and returns nothing to visitors). It offers "Free Grant
  Alerts" email capture, claims "3x Faster Applications", "67% Higher Success Rate" (CLAIMED), footer "© 2025".
  Its "Get Started" opens a modal "Wait! Don't miss out on Grant Opportunities... Schedule Free Consultation...
  15-minute call", so even the app routes to a call.
- **App landing** `https://app.bidx.ai/landing`, title "BidX - Unlock £100K-£2M Grant Funding in 100 days", a prompt
  box ("Growing my AI-powered learning app for schools"), Innovate UK / EIC / NIHR logos. Its "Get Started" opens
  **"Create an account" (Name, Website, Email, Password, T&C)**. This is the only self-serve sign-up route found,
  and nothing on bidx.ai links to this page.
- **Pricing** `https://app.bidx.ai/subscription`, public but unlinked: Free Forever £0 (Grant Finder and Tender Finder,
  search only); Launch £417/month (£5,000/year, 12-month commitment, Grants AI Writer, "£5,000 for a dedicated grant
  writer for a single application"); Growth £1,000/month (£12,000/year, grants plus bids/tenders AI writer, live chat
  with writers); Enterprise custom. "Get started" did nothing logged out. The app config also holds an older plan set
  (Free 10,000 words, "Grant Only" £500/month, "Bid Only" £500/month, "Grant & Bid" £1,000/month) with Stripe **test**
  price IDs only. Free tier: yes, search only. Trial: a "trial" plan value exists in config; no trial offer shown.
- **ProposeX inside the same app.** `https://app.bidx.ai/join` and `/start` are titled "ProposeX - Send
  AI-Personalised Proposals, Build to Close", "Send Your First Proposal, It's Free", "Sign up with LinkedIn / Sign up
  with Email", "10 free/ month". The app's og:image is `proposex-logo.svg`, and the page list includes
  `proposal-sign`, `proposal-invoice`, `proposal-print`. INFERRED: the BidX app was built on a ProposeX proposal-tool
  base and still carries it.
- Does the main site link to the app? **Only to `app.bidx.ai/privacy-policy` and `/terms-of-use`.** No login, no
  sign-up, no Grant Finder link on any bidx.ai page. `/lp1` describes the app's five modules but its CTAs go to the
  booking widget.
- Role of the app, INFERRED: a sales prop and back-office tool for the service, not an acquisition channel. Visitors
  can't reach it from the site, the public finder is empty, and its own CTA is a consultation.

---

## 3. GrantUp (grantup.co.uk)

- Entity: GRANT UP LIMITED 12822566, directors Dr Aaron David Mason (since 18 Aug 2020, DOB Oct 1985, same as BidX
  director) and Sarah Collins (since 17 Dec 2025, also MD on the site). Dorking, Surrey. VERIFIED, Companies House.
- What it does: done-for-you grant writing (Innovate UK, UKRI, Horizon Europe, EIC, ESA, ARIA, defence), a 6-month
  "Unlimited" retainer, award reporting and claims, R&D tax relief at ~10% success fee. 19 specialists, PhD writers,
  four named consultants take sales calls. Fees "from £1,750" upfront plus success fee. Claims £190m+ won, ">90% per
  engagement", ">25x average ROI". CLAIMED, `https://grantup.co.uk/`, `/about`, `/team`, `/partners`, `/unlimited`.
- How it markets itself (VERIFIED):
  - SEO content machine: sitemap of **361 URLs** (213 grant pages, 51 insights, 34 case studies, 19 sector pages),
    36 pages modified since 1 Sep 2026, latest 19 Oct 2026. robots.txt explicitly allows GPTBot, ChatGPT-User,
    CCBot and other AI crawlers.
  - Free tools: 9-question eligibility checker with "no email required", R&D tax calculator, "Grant Funding Canvas
    2026", non-dilutive and health/medtech guides, live grant directory with deadlines.
  - LinkedIn `linkedin.com/company/grant-up`: **1,899 followers**, 10 posts between 17 Aug and 29 Sep 2026, open
    calls, UKRI policy news, consultant spotlights, the Unlimited launch.
  - Partners: SETsquared, Grow London Local (London & Partners), Stotles. The Stotles and Grow London Local pages
    exist and list GrantUp.
  - Trustpilot: 26 reviews, 4.1, claimed Dec 2022. Booking adds people to a "Grant Alerts" newsletter.
  - Ads: 0 in Google Ads Transparency (UK) and no active Meta ads for "grantup".
- Compete or feed? INFERRED, it competes more than it feeds:
  - Same buyer (UK startups and SMEs going for Innovate UK and EU calls), same founder.
  - GrantUp's homepage argues against BidX's model: "EXPERTS, NOT SOFTWARE... A growing number of 'grant platforms'
    hand you a template... Assessors... can tell."
  - GrantUp is cheaper to start (from £1,750 vs BidX £7,500).
  - No link either way: no "BidX" on any GrantUp page rendered, no "GrantUp" on bidx.ai or in the pre-call guide.
    LinkedIn lists each as the other's "similar page", and BidX's £125M proof matches GrantUp's older figure.
  - Possible feeding is invisible from outside (shared writers, referrals between the two).

---

## 4. What Aaron and Simon publicly care about, in their own words

### Aaron Mason (Co-founder, Product & AI)
- Building AI products, repeatedly. Founded Combine.AI (Emma.ai, Eric.ai meeting assistants), Thoughtified (acquired
  2013), Wildsense, ManagePlaces, Snap Out; now Panda. "Automating the automatable" (SETsquared,
  `https://www.setsquared.co.uk/setsquared-at-20/combine-ai-aaron-mason/`).
- Learning by failing. "I was terrible at everything to start with... It's about having the mindset to realise you're
  terrible and then working to improve." "Being able to see your errors and self-correct is an important
  entrepreneurial skill." (Surrey Research Park interview, 2 Aug 2023,
  `https://surrey-research-park.com/news/interview-with-aaron-mason/`)
- Grants as his own fuel. "SETsquared Surrey gave us support and the opportunity to apply for and achieve grant
  funding." Combine AI was "Awarded multiple Innovate UK grants totalling over £1m".
- Assessor's view. "Our clients get PhD-level subject matter experts and former assessors... who know exactly what an
  assessor is looking for." (GrantUp team page)
- EU consortium brokering. 9 Jun 2026: "Know an innovative EU patient transport provider?... a €2m EU-funded
  project... Approx. €1m in grant funding is available for the patient transport partner." 12 Sep 2025: EU gaming
  virtual-world grant project partners.
- No-code builders. 24 Mar 2026: "If you're looking for a top-tier no-code developer... shipping complex products
  quickly without cutting corners." (fits Bubble for BidX and Panda)
- Mentoring founders since 2019 on "early-stage financing, product strategy and development, technical strategy".
- Recent likes (signals, weak): AI plugins for Claude (Chronograph), London Tech Leaders on AI and tech leadership,
  procurement wins.

### Simon Dutta (Co-founder, Growth & GTM)
- Customer-first, revenue-first. "Be obsessed with your customers, not your products. Deliver value. Get paid."
  "No one cares about what you do. They care about what you can do for them." (Feb to Mar 2024)
- "From 'viable' to 'buyable'... no more MVP but an MBP, a Minimum Buyable Product." (21 Mar 2024)
- BidX origin story. "Built an MVP in 4 weeks → Won a £100,000 Government Innovation grant in 6 weeks → Became revenue
  generating in just 4 days." (8 Mar 2024) "Big Win for BidX.ai! ...£100,000 Innovation Grant! With a little help from
  our BidX bidding platform." (14 Dec 2023)
- Grants as a levelling tool. "Empowering challengers and disrupters. Levelling the playing field through smart funding
  solutions... Could you use £250k-£750k in non-dilutive capital... DM me." (10 May 2024)
- "Unpopular take: Coding skills can actually hinder tech founders." (13 Oct 2023)
- Growth playbooks with qualification. His own consultancy Outgrowth (`https://www.outgrowth.io/`, same Shelton
  Street address) runs "Take 60-Sec Quiz, Grab Playbook" into a free 30-minute consultation, the same pattern as
  BidX's Meta ads. His posts ended with "DM 'Scale'" and "book your free GTM strategy call".
- Bio on bidx.ai: "$1B in public and private contracts... Boeing, Airbus, Barclays, HMRC and the FCA... Third startup.
  One previous exit." (CLAIMED)

### Both, now
- **Panda** (`https://panda.new/`): "Build apps and get customers by chatting with AI." "Panda replaces $50K+ developers
  and marketers so non-technical founders can get to revenue faster." "27,830 apps built" (CLAIMED). Free / $24 /
  $81 a month. LinkedIn About: "We're here to make money. The establishment told you software was complicated. They
  charged you £15,000 for a weekend's work." Panda's LinkedIn page has 4 followers. INFERRED: since May 2026 their
  public energy has gone to Panda, which explains the silent BidX LinkedIn.

---

## 5. What changed on bidx.ai since 20 October

- **Nothing on the pages.** Homepage HTML today is **byte-identical** (md5 `36ba7c20...`) to the copy saved 20 Oct
  14:33 UTC (`scratchpad/bidx/dl/home_bidx.ai.html`). Blog HTML identical to the 20 Oct 18:40 copy. Visible text of
  `/`, `/about-us`, `/blog`, `/lp1` and the booking page has the same word count and zero word differences against the
  20 Oct crawl. VERIFIED.
- Sitemap lastmod for all 5 URLs is `2026-10-20T14:37:38Z`. INFERRED: the site was last published at that moment; the
  homepage saved four minutes earlier matches today's, so that publish did not change the homepage.
- Off-site, the latest dated changes found are before 20 Oct: confirmation statement filed 16 Oct 2026 "with updates"
  (Companies House filing history). Nothing on Meta, Google Ads, LinkedIn page or Trustpilot changed in a way I could
  date to after 20 Oct.

---

## 6. The biggest gaps in the funnel

1. **No live demand channel.** Meta stopped 12 Dec 2025, no visible Google ads, no content. Yet the stack still
   collects: Meta pixel and 15 Google Ads conversions fire on every page, and the quiz and Google landing subdomains
   they point at no longer resolve. Retargeting audiences are being built and not used. (VERIFIED + INFERRED)
2. **30K founder followers sitting idle.** Simon (17K) last posted May 2024; Aaron (13K) has not posted about BidX in
   the visible feed; the company page (894) shows no posts. Their recent attention is on Panda. (VERIFIED)
3. **Zero content while the sister brand owns search.** bidx.ai has 5 URLs and an empty blog; GrantUp, same founder,
   publishes a guide every few days and has 213 grant pages. Founders searching for help find GrantUp, not BidX.
   (VERIFIED)
4. **The app is outside the funnel.** Not linked from the site, root is login-only, the public Grant Finder shows 0
   grants to visitors, the only sign-up sits on an unlinked page, pricing is unlinked and contradicts the service
   (app £5,000/year vs £7,500 per application), and ProposeX pages are still live inside it. (VERIFIED)
5. **One high-friction door.** Every route ends in an 11-field booking form that asks for phone, revenue and how much
   they can pay upfront. Founders not ready to book have nowhere to go: no lead magnet, no alerts on bidx.ai, two
   booking systems (GHL and a legacy Calendly) in parallel. (VERIFIED)
6. **Proof that doesn't hold up on inspection.** 0 Trustpilot reviews on a profile claimed ten months ago; `/lp1`
   testimonials are anonymous; three different success rates (70% in the guide, "67% higher" in the app, GrantUp's
   ">90%"); the £125M headline is Aaron's career figure. The pre-call guide is a raw Google Doc with "Request edit
   access" in the toolbar. (VERIFIED facts, INFERRED reading)
7. **Name collision and brand mess.** Four other "BidX" companies outrank it; a duplicate LinkedIn page; a directory
   listing that calls it an ad-bidding firm. (VERIFIED)
8. **Channel conflict with GrantUp.** Same founder, same buyer, cheaper entry price and public copy attacking "grant
   platforms". (VERIFIED copy, INFERRED conflict)

---

## 7. What I couldn't access, plainly

- **LinkedIn**: personal profiles rendered signed-out once each (Aaron first time; Simon only after 999 and 429 refusals on
  earlier tries);
  experience sections are masked, so job titles at BidX/Panda and tenure are unknown. The BidX company page showed
  no posts in the guest view; LinkedIn may hide some posts from guests, so "no posts" means none visible signed-out.
- **Google search** (`www.google.com`): blocked with a captcha (HTTP 429 "unusual traffic") from this container, curl
  and Chromium both. Used the WebSearch tool and LinkedIn guest pages instead. Snippet-only claims were not used as
  evidence (e.g. an X bio for @simon_dutta; that profile now returns 404, control @UKRI_News loads).
- **Meta Ad Library**: signed-out; the page-ID view returned 0 even for "all" (unreliable), so keyword search with
  active/all controls was used. Only the first results page (sorted by impressions) was read; there may be more
  BidX creatives below it.
- **Google Ads Transparency**: shows what Google serves there; ads on dead subdomains or old accounts may not appear.
- **Wayback Machine and crt.sh**: connection reset / 502 through the proxy, so the history of `quiz.bidx.ai`,
  `google.bidx.ai` and the ebook page could not be recovered.
- **Dealroom**: 403. **Trustpilot** via curl: walled, read in Chromium instead.
- Facebook page posts: behind login, follower count only.

---

## 8. Sources opened this session

bidx.ai: `https://www.bidx.ai/`, `/about-us`, `/blog`, `/lp1`, `/book-your-free-meeting-win-100k-2m-grant-funding`,
`/sitemap.xml`, `/robots.txt`, redirect checks on `/landing` `/contact` `/terms` `/privacy-policy` `/lp2` `/eligible`
`/eligible2` `/stay-tuned` `/ebook-thank-you-page`.
Tracking: `https://www.googletagmanager.com/gtm.js?id=GTM-54S5RJRQ`. DNS: `https://dns.google/resolve` for quiz, google,
blog, grants, guide, get, app, www.
Funnel: `https://get.bidx.ai/widget/bookings/book-your-free-consultation-and-win-100k-2m-funding`,
`https://guide.bidx.ai/`, `https://docs.google.com/document/d/1YidAC1EzwvoO99tJGB2HE_vLiMiBKeCVYrpaIYaKmu8/edit`.
App: `https://app.bidx.ai/` (to `/bidx-login?view=login`), `/bidx-login?view=signup`, `/grant-finder`, `/landing`,
`/subscription`, `/join`, `/start`, `/privacy-policy`, `/terms-of-use`, Bubble dynamic.js for `bidx-login`.
Ads: `https://adstransparency.google.com/?region=GB&domain=bidx.ai` (also get.bidx.ai, grantup.co.uk, panda.new,
control granttree.co.uk), `https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=GB&q=%22grant%20funding%22%20bidx&search_type=keyword_unordered&media_type=all`
and its `active` twin, control `q="grant funding"` active.
LinkedIn: `https://www.linkedin.com/company/bidx-ai/`, `/company/bidxai/`, `/company/grant-up/`,
`/company/panda-new`, `https://www.linkedin.com/in/simondutta/`, `https://uk.linkedin.com/in/aaronmase`,
`https://uk.linkedin.com/posts/aaronmase_help-excel-googlesheets-activity-6991040470533431296-o-iw`.
Facebook: `https://www.facebook.com/61568890847364/`. X: `https://x.com/simon_dutta` (404), control `x.com/UKRI_News`.
Companies House: `/company/15207532/officers`, `/persons-with-significant-control`, `/filing-history`,
`/officers/Cv-Z8FpUjgCms8J64XDcwF7-AwY/appointments` (Aaron), `/officers/EvKNvC1XTQQkx3eK_n91W97AhGg/appointments`
(Simon), `/company/17214690` (LaunchX), `/company/16956368` (Quantro), `/company/12822566/officers` (Grant Up).
GrantUp: `https://grantup.co.uk/`, `/about`, `/team`, `/partners`, `/unlimited`, `/contact`, `/eligibility`,
`/testimonials`, `/services`, `/sitemap.xml`, `/robots.txt`; `https://www.stotles.com/partners/grantup`;
`https://www.growlondonlocal.london/get-connected/grant-writing-and-rd-tax-relief-services/`.
Panda: `https://panda.new/`, `/pricing`, `/terms`, `/privacy`. Outgrowth: `https://www.outgrowth.io/`.
Reviews and directories: `https://uk.trustpilot.com/review/bidx.ai`, `https://uk.trustpilot.com/review/grantup.co.uk`,
`https://theorg.com/org/bidx-ai`, `https://talents.studysmarter.co.uk/companies/bidx-ai/`,
`https://www.capterra.co.uk/software/1107653/BidX`, `https://neuronfeed.com/startups/bidx`,
`https://www.sidetool.co/case-studies/bidx/`.
Interviews: `https://surrey-research-park.com/news/interview-with-aaron-mason/`,
`https://www.setsquared.co.uk/setsquared-at-20/combine-ai-aaron-mason/`,
`https://www.enterprisenation.com/get-connected/k9p7s6n4-aaron-mason/`.
News: `python3 tools/news.py` (Google News RSS), control "Tesco".
