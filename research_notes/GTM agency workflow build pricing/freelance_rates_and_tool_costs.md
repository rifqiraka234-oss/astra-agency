# Freelancer and AI automation agency rates for GTM and outreach workflow builds, and the monthly tool costs such a system carries

Research date 2026-10-07. Every vendor price below was read from the vendor's own page on 2026-10-07 unless the line says otherwise. Where a page renders prices in the browser only, the HTML payload was parsed or a second fetch path was used, and that is stated. Currency is given exactly as shown. "$" on a US vendor page is read as USD; where the page itself names USD it says so. No FX conversions are made in these notes.

Evidence labels used below.
- **[LIST]** published list price, read on the vendor's own page.
- **[LISTING]** a freelancer's own published package or rate on a marketplace, read on the listing itself.
- **[REPORTED]** a figure from a blog, guide, community post or job post (opened and read, but not a list price and often from a party with a commercial interest).
- **[SNIPPET ONLY]** seen only in a search engine summary, the source page was NOT opened or could not be opened. Treat as a lead, not a fact.

---

## Q1. What do Clay experts, n8n or Make experts and AI automation freelancers charge (Upwork, Contra, Fiverr Pro, Malt), hourly and per project, for GTM or outbound workflow builds?

### Takeaway
The bottom of the market is extremely low and is set by Fiverr, where Clay, n8n and lemlist gigs start at a median of $20 to $50 and offshore hourly offers sit at a median of $20 to $30 per hour; credible single workflow packages from established sellers on Fiverr and Contra land at roughly $150 to $1,000 for one Clay table or one n8n workflow, $450 to $2,000 for a connected enrichment plus CRM or multi tool build, and $750 to $4,000 for a "full outbound engine". In Western Europe the reported freelance norm is day rates of about 450 to 950 EUR (France), with a simple workflow quoted at 800 to 1,500 EUR and a full sales system at 6,000 to 15,000 EUR; senior US/EU Clay contract work is reported at $80 to $90 per hour.

### Cited Findings

**Fiverr, parsed from the live search result pages on 2026-10-07 (prices are each gig's cheapest package, "starting at", in USD as the page payload states `"currency":{"code":"USD"}`). [LISTING]**
- Search "n8n" (48 gigs): starting price median $50, interquartile range $30 to $85, min $10, max $1,000. 23 of the 48 gigs also offer an hourly rate, median $20/hr, interquartile range $15 to $35/hr, max $150/hr. Seller countries: Pakistan 19, Bangladesh 13, Nigeria 10, India 2, one each Israel, Germany, US, Kenya. [Fiverr n8n gigs](https://www.fiverr.com/gigs/n8n)
- Search "n8n lead generation automation" (44 gigs): starting price median $47.50, interquartile range $21 to $54, max $295; hourly offers (23 gigs) median $30/hr, interquartile range $20 to $50/hr, max $100/hr. Mostly Pakistan 13, Nigeria 11, India 6, Bangladesh 5. [Fiverr search](https://www.fiverr.com/search/gigs?query=n8n%20lead%20generation%20automation&pro_only=true)
- Search "clay" filtered to Clay.com GTM gigs (31 gigs after removing pottery and claymation): starting median $25, interquartile range $15 to $30, max $150; hourly offers (13 gigs) median $25/hr, max $50/hr; 19 of 31 sellers in Nigeria. [Fiverr clay gigs](https://www.fiverr.com/gigs/clay)
- Search "clay enrichment workflow" (46 gigs): starting median $25, max $1,000; hourly offers (16 gigs) median $27.50/hr, max $200/hr. Nigeria 26, Pakistan 8, UK 4. [Fiverr search](https://www.fiverr.com/search/gigs?query=clay%20enrichment%20workflow&pro_only=true)
- Search "lemlist" (48 gigs): starting median $20, max $120; hourly offers (9 gigs) median $25/hr, max $100/hr. Nigeria 14, UK 13, Bangladesh 7, Pakistan 6. [Fiverr lemlist gigs](https://www.fiverr.com/gigs/lemlist)
- Note on method. The `pro_only=true` URL parameter did not restrict results to Fiverr Pro sellers (most results carried `is_pro: false`), so "Fiverr Pro" figures below come from individual gigs flagged `is_pro: true` in the payload. Hourly values were stored in cents (`hourly_rate` 15000 = $150), confirmed against the gig page field `"hourlyRate":{"priceInCents":15000}`.

**Fiverr sample gigs with full package ladders (gig pages opened 2026-10-07; package prices stored in cents, delivery in hours, converted here). [LISTING]**
- dbpmark (Israel, Top Rated, flagged Pro), "build n8n automations, ai agents and smart business workflows": Essential Workflow $1,000, 7 days, "Single automated workflow connecting 2-3 tools with standard logic and error handling"; Business Automation $2,000, 14 days, "Multi-step automation system with AI integration, 4-6 tool connections"; Enterprise System $4,000, 21 days; hourly $150. [Fiverr gig](https://www.fiverr.com/dbpmark/build-n8n-automations-ai-agents-and-smart-business-workflows)
- sanderver (Netherlands, flagged Pro), "build complete crm automation systems to boost your b2b lead generation": Lead Flow Blueprint $295, 4 days (mapping only); Lead Engine Build $1,500, 7 days, "capture, routing, follow-up and 8 automations in your CRM"; Full B2B Engine $2,460, 14 days; hourly $100. [Fiverr gig](https://www.fiverr.com/sanderver/build-complete-crm-automation-systems-to-boost-your-b2b-lead-generation)
- riteshosta (India, Top Rated, flagged Pro), "be your clay automation expert": Clay Table Build $150, 5 days, "one specific Clay workflow built and connected"; Enrichment + CRM Pipeline $450, 10 days; Full Outbound Engine $750, 14 days, "from ICP definition to emails landing in inboxes"; hourly $50. [Fiverr gig](https://www.fiverr.com/riteshosta/be-your-clay-automation-expert)
- zaintanvir (Pakistan), "be your GTM engineer": single package $1,000, 14 days, hourly $32 (from search payload, gig page not opened). [Fiverr gig](https://www.fiverr.com/zaintanvir/be-your-gtm-engineer)
- Gig pages carry a buyer service fee rule of 5.5% in their pricing configuration (`service_fee_rules ... rate 0.055`), so the buyer pays above the package price. [Fiverr gig](https://www.fiverr.com/dbpmark/build-n8n-automations-ai-agents-and-smart-business-workflows)

**Contra. [LISTING]**
- Octavian Ciulei (Targoviste, Romania), "Build a n8n or Make Automation in 7 Days": starting at $750 USD, 7 days, "This service covers one clearly defined workflow and its required integrations"; multi workflow systems, custom APIs and data cleanup excluded and scoped as a follow on. [Contra listing](https://contra.com/s/AFBPoMMr-build-a-n8n-or-make-automation-in-7-days)
- Christian Lang (Munich, Germany, Contra Pro), "Custom Clay Workflow for B2B Outbound & Enrichment": "Contact for pricing", 4 days, rating 5.00 from 3 paid projects, offered as fixed price or monthly retainer; deliverable is a Clay table that finds, enriches and filters contacts and connects to Lemlist, Instantly or HubSpot, one revision round. [Contra listing](https://contra.com/s/NgBelP7A-custom-clay-workflow-for-b2-b-outbound-and-enrichment)
- [SNIPPET ONLY] Soham Nehra (Jaipur, India) n8n automation from $25/hr; Daniel Flow (Lagos) lead gen and CRM automation from $500, 1 week. Pages not opened. [Contra Soham Nehra](https://contra.com/s/76ERvmAB-n8n-automation)

**Upwork. Not readable directly (see Gaps). Secondary figures:**
- [REPORTED] Ad Snipper (updated 1 July 2026, sells $15/hr embedded automation staff, so conflicted): Upwork mid level n8n freelancers "$40 to $100 per hour"; US, Canada or Western Europe "onshore" n8n developers "$80 to $150 per hour" (attributed to Upwork's n8n page); senior specialists "$125 to $250 plus per hour" (attributed to doit.software). No sample or method stated. [Ad Snipper](https://adsnipper.com/blog/hire-n8n-developer/)
- [SNIPPET ONLY] Upwork client posted budgets far lower, one part time n8n role "$3.00 - $10.00 Hourly" and an AI automation contract to hire role "$5.00 - $20.00 Hourly". Pages walled, not opened. [Upwork job](https://www.upwork.com/jobs/~022068684209256223431); [Upwork job](https://www.upwork.com/freelance-jobs/apply/Automation-Developer-Freelance-hrs-week-n8n-Make-Integration_~022073007234761939229/)
- [SNIPPET ONLY] A freelancer guide says entry level n8n gigs on Upwork sit at GBP 15 to 25 per hour and suggests pricing the first ten jobs at GBP 20 to 30. [lilachbullock.com](https://www.lilachbullock.com/n8n-remote-automation-jobs/)

**Clay specific contract and freelance rates. [REPORTED]**
- Clay community market analysis (Bharat D., 18 Nov 2025) of 2,930 GTM Engineer listings across LinkedIn, Slack and Upwork: "Average salary: $106K full-time | $28/hr freelance"; "Tool operators ($60-90K) vs. System architects ($100-160K)". Method not stated. [Clay community](https://community.clay.com/x/content-and-events/pggslsppidrb/comprehensive-gtm-engineer-market-analysis-2930-jo)
- Clay community job post (Carlton P., 23 June 2026, later marked filled): fractional GTM and operations engineer, "$80-90/hr", about 10 to 20 hrs/week, "Remote. (USA & Europe Only)", scope includes complex tables, Salesforce/HubSpot/Outreach connections and credit governance. [Clay community](https://community.clay.com/x/part-time-jobs/b0d6qfabon6z/hiring-fractional-gtm-and-operations-engineer-for)
- Clay community job post (Vanessa G., 7 Apr 2025): GTM engineer "$5K-7.5K/month", "1+ years Clay experience with client work", managing client campaigns and Clay plus outbound tool plus CRM setups. [Clay community](https://community.clay.com/x/jobs/3wk9jl8lufjg/hiring-go-to-market-engineer-5k-75kmonth-available)
- [SNIPPET ONLY] A Clay expert profile (Cody Carnes) was summarised as listing a "$5000 one-time" done for you in house outbound build and "$497/hour" consulting. The profile URL now returns 404 (tested 2026-10-07 at both www.clay.com/experts/cody and the /en/ redirect), so this is unverifiable. [clay.com/experts/cody](https://clay.com/experts/cody)
- [SNIPPET ONLY] hiretalent.ph lists Philippine VAs with Clay skills at $5 to $7 per hour. [hiretalent.ph](https://hiretalent.ph/tool/clay)

**Malt and the French/EU market.**
- [REPORTED] lefreelance.fr (9 July 2026, updated 4 Aug 2026), n8n automation consultant TJM: Junior "300 a 450 EUR/jour", Confirme "450 a 700 EUR/jour", Senior "700 a 950 EUR/jour", Expert niche "900 a 1 200 EUR/jour". Project prices: simple workflow "800 a 1 500 EUR"; workflow with API, error handling and documentation "2 000 a 4 500 EUR"; full sales or support system "6 000 a 15 000 EUR"; audit 3 to 5 days "1 500 a 4 000 EUR"; Make/Zapier to n8n migration "3 000 a 12 000 EUR"; self hosted n8n plus first workflows "4 000 a 15 000 EUR". A second table in the same article gives a single workflow at "800 a 3 500 EUR" and a complete system at "5 000 a 20 000 EUR" (internal inconsistency). It cites Malt's tech barometer average for an experienced developer of "576 EUR/jour" and Malt Tech Trends 2026 reporting n8n project growth of "+1390 %". [lefreelance.fr](https://lefreelance.fr/articles/devenir-consultant-automation-n8n-freelance/)
- [REPORTED] Studeria (20 July 2026, sells its own AI accelerator programme): "Les integrateurs d'automatisations affichent des TJM de 700 a 1 500 euros par jour en 2026", attributed in its FAQ to Malt, Hays and Free-Work barometers; recommends pricing a turnkey workflow at "entre un dixieme et un quart de la valeur annuelle" it creates for the client. No euro figures for audit or maintenance. [Studeria](https://www.studeria.fr/articles-de-blog/vendre-automatisation-ia-offre-freelance)
- [SNIPPET ONLY] Individual Malt profiles: Mathieu Nesseir, "Automatisation No-Code/Low-Code - n8n | Make", 600 EUR/day, Paris, 3 to 7 years; Sandro Berchier, "Expert automatisation N8n & IA", 700 EUR/day, Fribourg CH, 0 to 2 years; an unnamed Paris "Consultant automatisation IA | n8n et CRM" at 280 EUR/day. Profiles returned Cloudflare 403 on every path tried, so not verified. [Malt profile](https://www.malt.fr/profile/mathieunesseir1); [Malt profile](https://www.malt.fr/profile/sandroberchier)

**Other freelancer data points.**
- [REPORTED] Layer3Labs (updated 2 July 2026, no sources, "illustrations rather than quotes", builds automation for clients): freelancer hourly "$50 to $150 per hour". [Layer3Labs](https://www.layer3labs.io/roi/ai-automation-agency-cost)
- [SNIPPET ONLY] A freelancer write up describes a lead routing build for a small events business, 2.5 days build and test, billed GBP 850 upfront plus GBP 60 per month hosting and monitoring. Source page not opened. [lilachbullock.com](https://www.lilachbullock.com/n8n-remote-automation-jobs/)
- [SNIPPET ONLY] Freelancer.co.uk n8n profiles at $40 (Pakistan) and $52 (Egypt) per hour. [Freelancer.co.uk](https://www.freelancer.co.uk/freelancers/skills/n8n)

### Inferences
- The market splits into three bands. (1) Offshore gig floor, $10 to $165 starting prices and $7 to $35 per hour, dominated by Pakistan, Nigeria and Bangladesh sellers. (2) Established marketplace sellers with packaged builds, roughly $150 to $1,000 for one Clay table or one n8n workflow and $1,500 to $4,000 for a connected multi tool outbound or CRM system. (3) EU/US specialists, 450 to 950 EUR per day in France and $80 to $150 per hour onshore.
- A build fee of a few hundred euros for one outbound workflow sits inside band (2) and above band (1); it would be at or below the cheapest Western European single workflow quote reported (800 EUR, lefreelance.fr) and the cheapest Contra fixed price found ($750).
- Fiverr "starting at" prices usually buy a scoped down first package (often 2 to 5 days), so they overstate how cheap a complete outbound system is. The three package ladders above show the complete system tier at roughly 5x the starting price.

### Gaps
- **Upwork could not be read directly.** Seven Upwork URLs (`/hire/n8n-developers/`, `/hire/clay-experts/`, `/hire/make-com-experts/`, `/hire/lemlist-experts/`, `/hire/ai-automation-specialists/`, `/freelance-jobs/n8n/` and one job post) all returned "Challenge - Upwork" HTTP 403 through plain curl, a Chrome/Safari/Firefox TLS impersonating client, and the WebFetch tool. Positive control: the same impersonating client returned 200 for fiverr.com, chatgpt.com and help.openai.com in the same session, so the block is Upwork specific. All Upwork figures above are secondary or snippet only.
- **Malt could not be read directly.** malt.fr profiles and the Malt rate barometer (malt.fr/t/barometre-tarifs) returned Cloudflare "Just a moment" 403 on three paths. No official Malt average for n8n, Make or Clay work was obtained.
- **Reddit (r/n8n, r/automation, r/agency, r/coldemail) could not be read.** The search tool refuses reddit.com and the JSON search endpoint returned 403. No Reddit pricing anecdotes are included.
- **No Upwork or Contra listing specific to lemlist sequence builds with a published price was found**, beyond Fiverr lemlist setup gigs (median $20 starting).
- **LinkedIn posts by automation freelancers stating prices were not found or not readable** in this pass.

---

## Q2. What do small AI automation agencies charge for a single workflow build versus a monthly maintenance retainer?

### Takeaway
Published agency figures cluster at $2,000 to $15,000 for one workflow build and $3,000 to $15,000+ per month for GTM or Clay retainers, with named Clay agencies starting at $4,000 to $6,500 per month; maintenance only retainers for already built workflows are reported much lower, 300 to 1,500 EUR per month in France and $500 to $1,500 per month for small businesses in US agency guides. Nearly all of these figures come from agencies marketing their own services.

### Cited Findings
- [LIST] Clay's own Solutions Partner directory (186 partners, fetched 2026-10-07) offers a budget filter whose only options are "any budget", "$5k+ a month" and "$10k+ a month", and a minimum engagement filter of "1 month", "3 months", "6 months" and "12 months". Partner cards show tiers (Elite Studio, Studio, Advanced Artisan) but no individual prices. Parsed from the page payload. [Clay experts](https://www.clay.com/experts)
- [REPORTED] Supered, "Clay Agency: How to Pick One" (Matt Bolian, 2 Oct 2026, prices "checked on October 2, 2026"): The GTM Engineering Company "$4,000-a-month starter tier" and "$6,000-a-month growth tier"; Workflows.io "From $5,000 a month, quarterly commitment"; Spring Drive "From around $5,000 a month up to $30,000+ for particular projects"; The Playbook Agency "Contact data from $1,000, outbound from $4,500, RevOps and Clay engineering from $6,500". Clay tiers per the article: Elite Studio, Studio, Advanced Artisan, Artisan. The article notes the agency consumes the client's own Clay credits, so Clay's bill stacks on the retainer. [Supered](https://www.supered.io/blog/clay-agency/)
- [REPORTED] SalesCaptain (self described "#1 Enterprise Clay Partner"): "Monthly retainers range from roughly $3,000 to $15,000 depending on complexity and scope", stated as a market figure, not SalesCaptain's own price. [SalesCaptain](https://www.salescaptain.io/clay-agency)
- [REPORTED] Layer3Labs (updated 2 July 2026, US agencies, no sources, illustrative): "$2,000 to $12,000 per workflow"; fixed fee projects "$5,000 to $75,000"; single workflow project "$5,000 to $15,000 (two to four weeks)"; multi workflow "$15,000 to $50,000 (six to twelve weeks)"; monthly retainer "$3,000 to $20,000 per month"; agency hourly "$100 to $300 per hour for senior US-based talent". No outbound specific pricing. [Layer3Labs](https://www.layer3labs.io/roi/ai-automation-agency-cost)
- [REPORTED] lefreelance.fr maintenance tiers for n8n work: "300 a 600 EUR/mois : surveillance legere, petites corrections, 1 point mensuel"; "800 a 1 500 EUR/mois : monitoring, corrections, amelioration continue, documentation"; "2 000 EUR et plus : systeme critique, SLA". [lefreelance.fr](https://lefreelance.fr/articles/devenir-consultant-automation-n8n-freelance/)
- [SNIPPET ONLY, agency marketing pages not opened] Cuebytes: simple workflow $500 to $2,500 one time, retainers $1,000 to $5,000+, custom AI workflow builds $5,000 to $25,000. Developersmatrix: single step workflow $800 to $2,500; retainers basic maintenance $500 to $1,200, active management with one new workflow a month $1,200 to $2,500, full partnership $4,500 to $8,000. Taskip: small business retainers $500 to $1,500 per month, mid market $1,500 to $4,000. The Crunch: "fixed fee first build plus small monthly fee" as the dominant 2026 model, example $5,000 plus $1,000 per month. Evolvai: multi system builds $8,000 to $25,000. Jadasquad citing Digital Agency Network: retainers $500 to $5,000+, and prices "fell about a third between 2024 and 2026"; Developersmatrix citing Clutch claims retainers rose about 35% year on year (the two claims conflict, neither verified). [Cuebytes](https://cuebytes.com/blog/ai-automation-agency-cost); [Developersmatrix](https://developersmatrix.com/blog/ai-automation-agency-pricing-2026); [Taskip](https://taskip.net/ai-automation-agency-pricing/); [The Crunch](https://thecrunch.io/ai-automation-agency-cost/); [Evolvai](https://evolvaiagents.com/blog/how-much-does-an-ai-automation-agency-cost-in-2026-real-pricing-breakdown/); [Jadasquad](https://www.jadasquad.com/blog/ai-automation-agencies)
- [SNIPPET ONLY] Modern Inbound estimates Clay agencies bill $5,000 to $20,000 per month; LeadHaste says agencies typically charge $3,000 to $8,000 per month and prices its own managed system at $2,500 per month after a free pilot. Not opened. [Modern Inbound](https://moderninbound.com/blog/clay-vs-cold-email-agency); [LeadHaste](https://leadhaste.com/blog/how-to-use-clay-for-cold-email)
- [SNIPPET ONLY] A seller on a freelancing site estimates n8n builds at $500 to $5,000 per build and maintenance contracts at $200 to $500 per month; a separate blog places productized retainers (solo operator, 4 to 8 client automations) at $1,200 to $3,500 per month per client; an r/n8n mirror post mentions four clients paying EUR 300 per month for an AI appointment setter. None opened. [smartremotegigs.com](https://smartremotegigs.com/software/n8n/); [r/n8n mirror](https://nyc1.lr.ggtyler.dev/r/n8n/top)

### Inferences
- Single workflow build vs retainer, as a rule of thumb from the opened sources: a one workflow build is quoted at roughly 800 to 4,500 EUR by French freelancers and $2,000 to $15,000 by US agencies, while a pure maintenance retainer is quoted at 300 to 1,500 EUR per month (France) or $500 to $1,500 per month (US small business). Managed outbound or Clay "GTM engineering" retainers are a different product at $3,000 to $15,000 per month because they include running campaigns.
- The Clay partner directory's lowest explicit budget band being "$5k+ a month" implies that Clay certified partners position at or above $5,000 per month; anything priced in the hundreds sits well below the Clay partner ecosystem and competes with Fiverr and Contra sellers instead.

### Gaps
- No small agency was found that publishes an exact per workflow GTM build price on its own site with a date; agency figures are guides written by agencies about the market.
- No independent survey (Clutch, Upwork research, Malt barometer) with a sample size for automation agency retainers was opened.

---

## Q3. Current list prices (2026) of Clay, lemlist, Apollo, Instantly, Smartlead, HeyReach, n8n cloud, Make, Claude Pro or Team, and ChatGPT Plus or Team for a single user, and which plans are needed for LinkedIn plus email

### Takeaway
For one user, the LinkedIn plus email capable options are lemlist Multichannel at $109 per month monthly or $87 per month on yearly billing (the cheaper Email plan has no LinkedIn automation), or an email sender (Smartlead from $39, Instantly from $47) paired with HeyReach at $79 per LinkedIn sender per month; Clay starts at $185 per month monthly ($167 annual) and only its Growth plan ($495 monthly, $446 annual) has CRM sync and HTTP API; n8n cloud starts at EUR 24 per month monthly (EUR 20 annual); Claude Pro and ChatGPT Plus are both $20 per month, while ChatGPT Business needs at least 2 seats and Claude Team at least 2 seats.

### Cited Findings

**Clay [LIST], clay.com/pricing, "$" (USD), read via the page and cross checked in raw HTML.**
- Free: 100 data credits/mo, 500 actions/mo, "Unlimited seats and tables", "Run up to 200 rows per table", Claygent and bring your own API key. Excludes CRM integrations, HTTP API and data warehouse connections. [Clay pricing](https://www.clay.com/pricing)
- Launch: headline "$167/mo" on annual billing ("Starts at $54/mo" actions plus $113/mo data credits); monthly billing "Starts at $60/mo" actions (15K actions/mo) plus "2.5K/mo ($125/mo)" data credits, which totals $185/mo, matching the FAQ "Launch (starting at $185/mo)". Adds phone enrichment, job change and signal tracking, "email campaign integrations", up to 50,000 rows per table. Still no CRM sync and no HTTP API. [Clay pricing](https://www.clay.com/pricing)
- Growth ("Recommended"): headline "$446/mo" annual ($185 actions plus $261 data credits); monthly $205 (40K actions) plus $290 (6K data credits) = $495/mo, matching the FAQ "Growth (starting at $495/mo)". Adds "Auto-sync & enrich CRM", "Integrate with any HTTP API", webhooks, web intent signals. [Clay pricing](https://www.clay.com/pricing)
- Enterprise: custom, annual commitment. [Clay pricing](https://www.clay.com/pricing)
- Conflicts on Clay's own page: the Launch card label says "3K data credits/mo" while the price ladder and FAQ say 2.5K (2,500) per month; one extraction listed "email campaign launch" as excluded on Free while the FAQ says Free includes "Clay Sequencer for email"; rollover terms differ between FAQ and comparison table. [Clay pricing](https://www.clay.com/pricing)
- [REPORTED] Secondary sources disagree on Launch (one gives $185 annual and $209 monthly), and one places Enterprise floor near $30,000 a year. [Docket via search](https://www.docket.io/resources/research/clay-pricing); [Landbase](https://www.landbase.com/blog/clay-pricing)

**lemlist [LIST], lemlist.com/pricing, "$", read via two paths (rendered and raw HTML).**
- Email plan: "$69 $55 / month", "Users Unlimited", "50,000 emails /mo", "Unlimited users & Email senders", email and phone finder, 650M+ leads database, warm up, CRM integrations and API. [lemlist pricing](https://www.lemlist.com/pricing)
- Multichannel plan: "$109 $87 / month", priced by "User(s)", "Features of the email plan + 5 senders per user", "Unlimited emails & messages", "LinkedIn automation", "SMS automation", "WhatsApp automation add-on", "Built-in call dialer & VoIP". [lemlist pricing](https://www.lemlist.com/pricing)
- Billing toggle: Monthly, Quarterly "Save 10%", Yearly "Save 20%"; $69 and $109 are monthly, $55 and $87 yearly (69 x 0.8 = 55.2, 109 x 0.8 = 87.2, consistent). [lemlist pricing](https://www.lemlist.com/pricing)
- Data add ons: Lead data enrichment "$20 $16 / month", "2k credits /mo (400 emails or 100 phones)"; Buying intent signals $29 monthly or $21 yearly for 100 signals/mo. Enterprise custom. [lemlist pricing](https://www.lemlist.com/pricing)
- For LinkedIn plus email in lemlist, Multichannel is the plan: LinkedIn automation appears only from Multichannel up. [lemlist pricing](https://www.lemlist.com/pricing)

**Apollo. Primary page shows no prices to a non logged in fetch; figures are [REPORTED].**
- apollo.io/pricing (fetched 2026-10-07) describes Free, Basic ("Individual sellers doing regular outbound. Includes email sequencing and core integrations"), Professional and Custom, but the price and credit numbers load client side; parsing the HTML found only template strings like "{price}/month per seat". The page says the free plan "stays free with no time limit", free plan email connections are Gmail only, and non paying users on a verified corporate domain have a cap of 10,000 credits per account per month (100 for non corporate domains). [Apollo pricing](https://www.apollo.io/pricing)
- [REPORTED] Docket ("Pricing information last verified April 2026", citing apollo.io/pricing): per user, Free $0; Basic $60 monthly or $49 annual; Professional $94 monthly or $79 annual (100 mobile and 2,000 export credits/mo, 10,000 data credits/yr); Organization $149 monthly or $119 annual. [Docket](https://docket.io/resources/research/apollo-pricing)
- [SNIPPET ONLY] Conflict: CostBench and Landbase list monthly billing at $59, $99 and $149 per user; Organization has a 3 seat minimum per several guides. [Landbase](https://www.landbase.com/blog/apollo-pricing); [CostBench](https://costbench.com/software/sales-intelligence/apollo-io)

**Instantly [LIST], instantly.ai/pricing, "$", read via two paths.**
- Outreach Growth: $47/mo monthly, $37.6/mo yearly; "Unlimited Email Accounts", "Unlimited Email Warmup", 1,000 uploaded contacts, 5,000 emails monthly. Hypergrowth: $97 monthly, $77.6 yearly, 25,000 contacts, 125,000 emails/mo. Light Speed $358 monthly, $286.3 yearly. [Instantly pricing](https://instantly.ai/pricing)
- Credits (lead database and AI): Growth Credits $47/mo for 1,500 credits; Supersonic and Hyper credits from $97 or $197 (the page lists both figures in different sections). [Instantly pricing](https://instantly.ai/pricing)
- Bundles: Starter $94 monthly or $85 yearly (5,000 emails, 1,000 contacts, 1,500 credits, 450M+ lead database); Scale $194 or $175; Agency $555 or $500. [Instantly pricing](https://instantly.ai/pricing)
- Inconsistencies on the page: Hypergrowth shown at $358/mo in the bundle detail and $97/mo on the plan cards. [Instantly pricing](https://instantly.ai/pricing)
- The plan cards list email limits only; HeyReach's page describes "native integrations with Instantly and Smartlead to send multichannel campaigns", which is how LinkedIn is usually added to Instantly or Smartlead. [HeyReach pricing](https://www.heyreach.io/pricing)

**Smartlead [LIST], smartlead.ai/pricing, USD per the page's structured data, read via two paths.**
- Base $39/month monthly or $32.5/month yearly ($390/yr): 2,000 contacts, 6,000 email sends, 2,000 verified emails. Pro $94 or $78.3 ($939.6/yr): 30,000 contacts, 90,000 sends. Unlimited Smart $174 or $144.5: 150,000 sends. Unlimited Prime $379 or $314.6: 500,000 sends. "Annual billing saves 17%". Promo "50% off on your first month on any plan". [Smartlead pricing](https://www.smartlead.ai/pricing)
- Mailbox add on (SmartSenders), useful as a reference cost for cold email mailboxes: Google via Zapmail "$13/domain/year" plus "$4.5/mailbox/month"; Outlook via InfraInbox $16/domain/year plus $5/mailbox/month; pre warmed Google or Outlook $18/domain/year plus $9/mailbox/month. [Smartlead pricing](https://www.smartlead.ai/pricing)

**HeyReach [LIST], heyreach.io/pricing, "$", read via two paths.**
- Growth: "$79 /mo - sender" monthly; $71 per seat per month quarterly ($213 per quarter); $63 per seat per month yearly ($756 per year). Includes all LinkedIn actions (connection requests, messages, follow ups, voice notes, profile views), unified inbox, native Instantly and Smartlead integrations, Clay/Make/Zapier/HubSpot integrations, API and webhooks, "100 enrichment credits per sender" one time. [HeyReach pricing](https://www.heyreach.io/pricing)
- Agency $999/mo for 25 senders ($899 quarterly, $799 yearly, $9,590 billed yearly); Unlimited $2,999/mo (fair use cap 300 senders); "Early stage program", "A heavily discounted plan", for under $250,000 ARR, fewer than 5 people and new customers, price not shown. [HeyReach pricing](https://www.heyreach.io/pricing)

**n8n [LIST], n8n.io/pricing, EUR, read via the rendered page and the page's own price payload.**
- Free cloud plan: "0EUR", 50 executions, "Run your first workflows and agents in the cloud". [n8n pricing](https://n8n.io/pricing/)
- Starter: EUR 24 monthly, EUR 240 yearly (shown as "20EUR /mo, billed annually"), 2,500 executions, 5 concurrent. [n8n pricing](https://n8n.io/pricing/)
- Pro: EUR 60 monthly or EUR 600 yearly ("50EUR /mo, billed annually") for 10,000 executions; EUR 145 monthly or EUR 1,450 yearly for 50,000 executions. "For solo builders and small teams running automations in production." [n8n pricing](https://n8n.io/pricing/)
- Business (self hosted): EUR 800 monthly or EUR 8,000 yearly ("667EUR /mo, billed annually") for 40,000 executions. Enterprise: contact sales. "All plans include unlimited users & workflows and every integration. Pricing based on monthly workflow executions, regardless of complexity." Community Edition: "A standard, self-hosted version of n8n is available on GitHub." [n8n pricing](https://n8n.io/pricing/)
- The public toggle shows annual figures; the monthly figures (24, 60, 145, 800) come from the page's own pricing data (`"price":"24"`, `"annualPrice":"240"`). [n8n pricing](https://n8n.io/pricing/)

**Make [LIST, with an unresolved conflict], make.com/en/pricing.**
- Read 2026-10-07: Free "$0/mo", up to 1,000 credits/mo, 2 active scenarios, 15 minute minimum interval; Core "$12/mo", Pro "$21/mo", Teams "$38/mo", each "Price for 10k credits/mo", unlimited active scenarios, 1 minute interval; Enterprise custom. A "Pay monthly / Pay annually" toggle with "Save 15% or more!" exists, but the extracted text does not show which billing cycle the $12/$21/$38 figures belong to. [Make pricing](https://www.make.com/en/pricing)
- [REPORTED] Conflict: Jetadmin ("Pricing checked September 26, 2026") lists Core $9 annual ($108/yr) or $10.59 monthly, Pro $16 or $18.82, Teams $29 or $34.12, for 10,000 credits. Make's page could not be reached a second way (Cloudflare 403 to curl and to the impersonating client), so which is current is unresolved. [Jetadmin](https://www.jetadmin.io/blog/make-pricing/)

**Claude [LIST], claude.com/pricing, read via two paths (WebFetch and a browser TLS client), both agree.**
- Free $0. Pro "$17 Per month with annual subscription discount ($200 billed up front). $20 if billed monthly." Max "From $100 Per month" (5x or 20x Pro usage). [Claude pricing](https://claude.com/pricing)
- Team, "For teams of 2 to 150": Standard seat "$20 Per seat / month if billed annually. $25 if billed monthly."; Premium seat "$100 Per seat / month if billed annually. $125 if billed monthly." Enterprise "US$20/seat/month, billed annually" plus usage at API rates. [Claude pricing](https://claude.com/pricing)
- API per million tokens (input / output): Fable 5.1 $10 / $50; Opus 5.5 $4 / $20; Sonnet 5.5 $2 / $10; Haiku 5.5 $0.10 / $0.50 for prompts up to 100K tokens ($0.50 / $2.50 above). Batch processing saves 50%. Web search "$10 / 1K searches". [Claude pricing](https://claude.com/pricing)

**ChatGPT [LIST], OpenAI pages read with a browser TLS client (plain fetch returned 403).**
- Plus: "Price: $20/month (billed monthly)." [OpenAI Help Center](https://help.openai.com/en/articles/6950777-what-is-chatgpt-plus)
- Business (the page's own price keys are still named `team`, e.g. `prices.chatgpt.team.monthly.2026`): "Standard seats remain $25 per user per month, or $20 per user per month when billed annually"; "Premium seats cost $125 per user per month, or $100 per user per month when billed annually"; page update "August 25, 2026: Premium seats are now available on ChatGPT Business". [OpenAI](https://openai.com/index/premium-seats-chatgpt-business)
- Minimum seats: chatgpt.com/pricing FAQ, "Business plans are available starting at 2 users", and footnote "*2+ users, billed annually". The same page describes Pro as "From / month" with "Your choice of 3 usage tiers"; the actual Pro and Go price numbers are injected client side by geography and were not captured. [ChatGPT pricing](https://chatgpt.com/pricing)
- [SNIPPET ONLY] Pro at $100 or $200 per month and Go at $8 per month; Business seat price fell $5 on 2 April 2026. Not verified on an OpenAI page. [Elephas](https://elephas.app/resources/chatgpt-business-pricing)

### Inferences
- The single user floor for an AI chat seat is $20 per month (Claude Pro monthly or ChatGPT Plus) or $17 per month (Claude Pro annual). A business/team seat for one person is not available on either: Claude Team and ChatGPT Business both start at 2 seats, so a solo buyer's floor there is $50 per month monthly or $40 per month annual (2 x $25 or 2 x $20), arithmetic from the list prices.
- For a Clay based workflow that pushes enriched rows into a sequencer through an HTTP API or syncs a CRM, the Growth plan ($495 monthly) is required; Launch ($185) covers enrichment plus Clay's own named sequencer integrations only. This roughly triples the Clay line in a stack.
- n8n's per execution pricing (a whole workflow run counts once) makes it materially cheaper than Make's per credit pricing for multi step enrichment workflows; Make's Free plan (1,000 credits, 2 scenarios) and n8n's Free (50 executions) are both too small for production outbound.

### Gaps
- Apollo's current list prices could not be read from apollo.io directly; the figures are Docket's April 2026 verification and conflict with other guides on monthly pricing.
- Make's billing cycle for $12/$21/$38 is unconfirmed and conflicts with a 26 Sept 2026 third party snapshot.
- ChatGPT Go and Pro exact prices were not captured from an OpenAI page.
- LinkedIn Sales Navigator and Google Workspace prices (common extra costs) were not researched in this pass.
- Prices are as seen from this session's network location; several vendors localise currency (ChatGPT injects prices by geography, Fiverr has a currency switcher), so EU or UK visitors may see EUR or GBP prices that are not simple conversions.

---

## Q4. What does a minimal stack for one user doing LinkedIn plus email outreach cost per month in total?

### Takeaway
Using only list prices read on 2026-10-07, a working one user LinkedIn plus email stack costs about $129 to $149 per month on monthly billing ($104 to $120 on annual) if built on lemlist Multichannel plus one AI seat, about $138 per month ($113 annual) if built on Smartlead plus HeyReach plus one AI seat, and about $331 per month plus EUR 24 ($285 plus EUR 20 annual) if Clay Launch, Instantly, HeyReach, n8n and an AI seat are combined, before mailboxes, domains and LLM API usage, which add a few dollars to tens of dollars at small volumes.

### Cited Findings
- lemlist Multichannel $109 monthly or $87 yearly per user covers email plus LinkedIn in one tool; its data add on is $20 or $16 per month for 2k credits. [lemlist pricing](https://www.lemlist.com/pricing)
- Smartlead Base $39 or $32.5; Instantly Growth $47 or $37.6; HeyReach Growth $79, $71 or $63 per sender. [Smartlead pricing](https://www.smartlead.ai/pricing); [Instantly pricing](https://instantly.ai/pricing); [HeyReach pricing](https://www.heyreach.io/pricing)
- Clay Launch $185 monthly or $167 annual; Growth $495 or $446. [Clay pricing](https://www.clay.com/pricing)
- n8n Starter EUR 24 monthly or EUR 20 annual; Community Edition self hosted from GitHub. [n8n pricing](https://n8n.io/pricing/)
- Claude Pro $20 monthly or $17 annual; ChatGPT Plus $20 monthly. [Claude pricing](https://claude.com/pricing); [OpenAI Help Center](https://help.openai.com/en/articles/6950777-what-is-chatgpt-plus)
- Cold email mailbox reference cost: $4.5 per mailbox per month plus $13 per domain per year (Google via Zapmail through Smartlead). [Smartlead pricing](https://www.smartlead.ai/pricing)
- Claude API: Sonnet 5.5 $2 input and $10 output per million tokens; Haiku 5.5 $0.10 and $0.50; web search $10 per 1,000 searches. [Claude pricing](https://claude.com/pricing)
- [REPORTED] A real stack posted in the Clay community (27 Nov 2024, so older prices) for 500 emails per day listed 13 tools, including Clay EUR 331/month, Smartlead EUR 89, La Growth Machine EUR 60, OpenAI API EUR 150, Google Workspace EUR 172.50 for 25 users, with a stated total of "~EUR 1,102.75 excl. VAT"; the listed items excluding the EUR 195 domains sum to EUR 1,055.50 (including a EUR 35 verifier line with no period stated), so the post's own total does not reconcile. A reply called the OpenAI cost high for that volume. [Clay community](https://community.clay.com/x/general/k65603ba8kac/evaluating-a-tech-stack-for-efficient-cold-email-s)
- [SNIPPET ONLY] A Clay expert profile claimed a setup sending 10,000 targeted emails a month runs on about $200 per month in tech costs (profile now 404). [clay.com/experts/cody](https://clay.com/experts/cody)

### Inferences (all totals are my arithmetic from the list prices above; monthly billing first, annual equivalent in brackets; USD unless marked)
- **Stack A, all in one.** lemlist Multichannel $109 + Claude Pro $20 = **$129/mo** ($87 + $17 = $104). Adding lemlist's data add on gives **$149/mo** ($120). Adding n8n Starter for custom AI research steps adds EUR 24 (EUR 20). This is the cheapest single vendor route to LinkedIn plus email.
- **Stack B, cheapest split.** Smartlead Base $39 + HeyReach Growth $79 + Claude Pro or ChatGPT Plus $20 = **$138/mo** ($32.5 + $63 + $17 = $112.50). Lead data from Apollo's free plan; automation on n8n Community Edition self hosted or n8n's 50 execution free plan. Plus one domain and two mailboxes at the Smartlead reference rate, about $9 per month plus $13 per year.
- **Stack C, Clay centric (closest to the "Clay table plus n8n plus sequencer plus Claude" brief).** Clay Launch $185 + Instantly Growth $47 + HeyReach Growth $79 + Claude Pro $20 = **$331/mo + EUR 24 n8n Starter** ($167 + $37.6 + $63 + $17 = $284.60 + EUR 20). If the build needs Clay's HTTP API or CRM sync, Clay Growth replaces Launch and the total rises by $310/mo monthly ($279 annual).
- **LLM API usage at small volumes.** Assuming about 4,000 input tokens and 400 output tokens per lead for research plus a drafted message: Sonnet 5.5 costs about $0.012 per lead, so about $12 per 1,000 leads; Haiku 5.5 about $0.0006 per lead, so about $0.60 per 1,000 leads. Two web searches per lead add $0.02 per lead, so about $20 per 1,000 leads. These token counts are assumptions, not measurements.
- So the recurring tool bill a small client carries for a minimal LinkedIn plus email system is roughly $105 to $150 per month for the lean stacks and $285 to $350 per month (plus EUR 20 to 24) for a Clay based one, which is the cost a one off build fee should be compared against.

### Gaps
- Mailbox and domain costs outside Smartlead's reseller (for example Google Workspace direct pricing) were not researched.
- LinkedIn account costs (Sales Navigator or Premium), often used alongside HeyReach or lemlist, were not researched.
- VPS cost for self hosting n8n Community Edition was not researched.
- Real token counts per lead for a Claude research plus messaging step were not measured; the API estimate rests on assumptions.

---

## Q5. UK specific data sources, Companies House (free) versus paid databases such as FAME by Bureau van Dijk, with indicative FAME pricing

### Takeaway
Companies House data is free, both through its API (600 requests per 5 minutes per application, registration and an API key required) and as a free monthly bulk CSV snapshot of all live companies; FAME (Moody's Analytics, formerly Bureau van Dijk) publishes a UK public sector price list on G-Cloud 14 that starts at GBP 34,100 a year for up to 5 named users (about GBP 6,820 per user), with a minimum 12 month contract and modules such as API access at 20% of base price, so it is far outside a small client's budget.

### Cited Findings
- Companies House launch notice (22 June 2015): "all public digital data held on the UK register of companies is now accessible free of charge" and "Free access to the data is available both through a web service and an application program interface (API)". [GOV.UK](https://www.gov.uk/government/news/launch-of-the-new-companies-house-public-beta-service)
- Companies House API rate limit: "You can make up to 600 requests within a five-minute period", exceeding it returns HTTP 429 for the rest of the window, higher limits available on request. [Companies House developer specs](https://developer-specs.company-information.service.gov.uk/guides/rateLimiting)
- API access requires registration: "You must register a user account with Companies House to explore and perform tests with the Companies House API", with API keys, stream keys or OAuth tokens. The current developer pages do not themselves state a price. [Companies House developer hub](https://developer.company-information.service.gov.uk/get-started)
- Free Company Data Product: a downloadable snapshot of basic company data for all live companies, ZIP files of CSV, "provided free of charge", updated "within 5 working days of the previous month end"; latest file seen BasicCompanyDataAsOneFile-2026-10-01.zip (471Mb), page "Last Updated: 01/10/2026". [Companies House download](https://download.companieshouse.gov.uk/en_output.html)
- FAME on G-Cloud 14, supplier "MOODY'S ANALYTICS UK LIMITED", headline "GBP 550 a user a year", covering "over 17 million active and inactive companies", "Up to 20 years of financial history", "Over 300 search criteria". [Digital Marketplace](https://www.applytosupply.digitalmarketplace.service.gov.uk/g-cloud/services/761658342676099)
- FAME G-Cloud 14 pricing document (file dated 2024-05-01, public sector pricing): named user base prices per year, up to 5 users GBP 34,100 (average GBP 6,820 per user); up to 10 GBP 50,050 (GBP 5,005); up to 15 GBP 68,475; up to 20 GBP 82,500 (GBP 4,125); up to 30 GBP 109,950; up to 40 GBP 128,400; up to 50 GBP 115,500 (as printed, lower than the 40 user tier); up to 100 GBP 154,000; up to 500 GBP 275,000 (GBP 550 per user, the source of the headline figure); up to 10,000 GBP 1,650,000 (GBP 165). Modules: Market line reports 5% of base, News and M&A news 5%, Beneficial ownership 10%, Risk flags 20 to 40%, API 20% of base, iXBRL and data feed POA. "Minimum contract period is 12 months"; "Full access free trials are available (excluding export function)"; price depends on seats and modules; training included. [G-Cloud 14 pricing PDF](https://assets.applytosupply.digitalmarketplace.service.gov.uk/g-cloud-14/documents/720211/761658342676099-pricing-document-2024-05-01-1447.pdf)
- [SNIPPET ONLY] A comparison article cites about GBP 31,000 a year for up to 5 users and GBP 75,000 for up to 20, from 2022 documentation; and a 2022 public sector document priced news and sanctions modules at 10% and 20% of base. These are older and consistent in scale with the 2024 list. [Business Data Guide](https://www.businessdataguide.com/blog/comparisons/dun-bradstreet-uk-vs-bureau-van-dijk-fame); [G-Cloud 13 pricing PDF](https://assets.applytosupply.digitalmarketplace.service.gov.uk/g-cloud-13/documents/702741/582446135221966-pricing-document-2022-05-18-1014.pdf)
- [SNIPPET ONLY] UK universities license FAME through Jisc (agreement 1 Dec 2022 to 30 Nov 2025, prices not public). [Jisc](https://subscriptionsmanager.jisc.ac.uk/catalogue/2873)

### Inferences
- The "GBP 550 a user a year" G-Cloud headline is misleading for a small buyer; it is the per user average at the 500 user tier. The realistic entry point is GBP 34,100 a year for up to 5 users, plus 20% (about GBP 6,820) if API access is wanted, on G-Cloud public sector terms; commercial pricing was not found and may differ.
- For a small UK client, Companies House's free API plus the free monthly bulk file covers company identity, officers, filing history and accounts filings at zero data cost, with the 600 requests per 5 minutes limit (about 172,800 requests per day at the cap) being the only practical constraint; FAME's value (financial history, ownership, scoring) is priced for institutions.

### Gaps
- No current commercial (non public sector) FAME price list was found; Moody's does not publish one.
- Companies House's current developer pages were not found to state "free" explicitly; the free status rests on the 2015 GOV.UK launch notice and on the free bulk product page.
- Other paid UK SME data sources (for example Endole, Creditsafe, Beauhurst, Dun and Bradstreet UK) were not priced in this pass.
