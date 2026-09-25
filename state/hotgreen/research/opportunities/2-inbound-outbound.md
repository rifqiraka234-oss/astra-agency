# HotGreen, opportunity research 2. The inbound and outbound go to market system a tiny industrial hardware team could run

Research only. Nobody was contacted, no form was submitted, nothing was signed up for. Every URL below was accessed on **25 September 2026** unless another date is given. Working files (rendered page text, downloaded spreadsheets and PDFs) are in `scratchpad/gtm2/src/`.

**Labels.** VERIFIED means read on the primary source in this session. SECONDARY means read on a secondary source or a search summary only. COMPANY CLAIM means a vendor or company saying something about itself or its own data. INFERENCE means my reasoning from the evidence. UNVERIFIED means I could not confirm it.

**Three check rule.** Every claim that would change a recommendation (law, price, data residency, the Framer integration) was (1) reopened and quoted, (2) tested for being outdated, with 2025 and 2026 changes looked for, and (3) confirmed by a second independent source where one exists. Where a check could not be completed it says so in the row.

This file builds on, and does not repeat, `state/hotgreen/dossier.md`, `research/site-audit.md` and `research/market-context.md`. Where I rely on those files I say so.

---

## 0. Headline findings

1. **HotGreen's form will break any automation before it starts.** The live contact form (re checked today, site published 13 Aug 2026) has a Message textarea named `lastname`, the same name as the Last name field. Framer's own webhook documentation says it sends JSON "using input names as JSON keys". So a webhook into any CRM would receive one `lastname` key for two different values. VERIFIED (both halves), consequence INFERENCE.
2. **UK B2B cold email to company staff is legal without consent, but it is not rule free, and the fines went up on 5 February 2026.** PECR regulation 22 only covers "individual subscribers". Regulation 23 (identity, valid opt out address) covers everyone. UK GDPR still applies to named people. PECR breaches of regulation 22 and 23 now carry the "higher maximum amount", £17,500,000 or 4% of worldwide turnover, after the Data (Use and Access) Act 2025. VERIFIED on legislation.gov.uk.
3. **Germany is the opposite.** UWG section 7(2) no. 2 treats advertising by "elektronischer Post" without "vorherige ausdrückliche Einwilligung des Adressaten" as always an unreasonable nuisance, with no B2B carve out. Phone to businesses only needs presumed consent. VERIFIED on gesetze-im-internet.de, confirmed by IHK Nord Westfalen. This matters because HotGreen's March 2026 job ad preferred German speakers.
4. **The Netherlands is stricter than most people assume.** Telecommunicatiewet article 11.7(3) only lets you email a business without consent if you use contact details the business itself designated and published for receiving commercial communications. VERIFIED on wetten.overheid.nl (version in force 15 Aug 2026). ACM/OPTA guidance says the spam ban applies "aan consumenten of bedrijven".
5. **LinkedIn automation is a breach of the User Agreement (effective 3 Nov 2025), section 8.2.** It bans bots or "unauthorized automated methods to ... send or redirect messages". VERIFIED. The lemlist Multichannel plan sells "LinkedIn automation" (VERIFIED on lemlist's pricing page), so using it puts the sender's personal LinkedIn account at risk.
6. **Speed to lead matters, but the famous numbers are mostly B2C.** HBR 2011 audited 2,241 US firms, 37% replied within an hour, 23% never replied, average 42 hours. The "7 times" and "60 times" findings come from a separate study of 29 B2C and 13 B2B firms. The widely quoted "odds drop 80% after 5 minutes" is not in the HBR article at all (I checked the text). VERIFIED.
7. **Buyers of complex equipment research alone, then want a human to confirm fit.** Gartner (June 2025, 632 buyers) found 61% prefer a rep free experience overall, but buyers "prefer to seek seller input" when "determining whether a product or service fits their company's needs", 73% avoid suppliers who send irrelevant outreach, and 69% report inconsistencies between a supplier's website and its sellers. VERIFIED. HotGreen's own channels quote different savings, CO2 and temperature figures (dossier section 10), which is exactly that inconsistency.
8. **The capex decision is slow and finance led.** A PwC study for DENEFF (Oct 2025) says companies' payback thresholds are "often limited by internal target values of roughly three years", while industrial heat pumps with waste heat recovery average a payback of "5+ years", and "investment budgets are approved centrally but operating costs are borne at the plant level". VERIFIED. ACEEE (Dec 2024) models typical boiler lifetimes of 20 years (small) and 40 years (medium to large), and notes boilers "are still being replaced like for like". VERIFIED.
9. **There is a free, official list of the largest UK food and drink combustion sites.** The UK ETS compliance report (published 22 Jun 2026) has 68 open installation accounts with food (NACE 10) or beverage (NACE 11) codes, 66 of them reporting 2025 emissions totalling about 2.26 MtCO2e. My analysis of the government spreadsheet, VERIFIED. CCEP has no installation account in it, which fits the dossier's point that most mid size plants sit below the 20 MW threshold.
10. **No part of this stack needs lemlist or Clay at HotGreen's scale.** Their market is a few hundred sites, not tens of thousands of contacts. INFERENCE, from the account counts above and the tool pricing in section 4.

---

## 1. Inbound lead handling, what the evidence says

### 1.1 Speed to lead

| # | Claim | Label | Source |
|---|---|---|---|
| 1.1a | HBR audited 2,241 US companies with a web test lead. "37% responded to their lead within an hour, and 16% responded within one to 24 hours, 24% took more than 24 hours ... and 23% of the companies never responded at all. The average response time, among companies that responded within 30 days, was 42 hours." | VERIFIED | Oldroyd, McElheran, Elkington, "The Short Life of Online Sales Leads", HBR, March 2011, https://hbr.org/2011/03/the-short-life-of-online-sales-leads |
| 1.1b | A separate study "involved 1.25 million sales leads received by 29 B2C and 13 B2B companies in the U.S." Firms that tried to contact within an hour "were nearly seven times as likely to qualify the lead ... as those that tried to contact the customer even an hour later ... and more than 60 times as likely as companies that waited 24 hours or longer." Qualify means "a meaningful conversation with a key decision maker". | VERIFIED | Same |
| 1.1c | The HBR article's own causes of slow response include "retrieving leads from CRM systems' databases daily rather than continuously" and routing rules based on "geography and fairness". | VERIFIED | Same |
| 1.1d | Falsification check. The claims that "odds drop 80% after five minutes" or "21 times more likely within five minutes" are often attributed to HBR. The HBR text contains no "5 minutes", "five minutes", "80%" or "21 times". Those figures come from other, older vendor linked studies and should not be cited as HBR. | VERIFIED (absence checked in the article HTML) | Same |
| 1.1e | Newer primary test. Workato submitted demo requests to 114 B2B companies. Average time to a personalised email "11 hours and 54 minutes", nearly 20% never replied by email, 31% called back, "More than 99% of companies aren't responding within 5 minutes". Companies using lead routing tools replied in "3 hours and 32 minutes" against nearly 13 hours without. | COMPANY CLAIM (vendor research, software buyers, page dated 19 Mar 2026, original fieldwork date not stated) | Workato, "B2B Lead Response Times, What We Learned from 114 Companies", https://www.workato.com/the-connector/lead-response-time-study/ |
| 1.1f | Judgement. Both studies are about software and consumer style leads where the buyer is shopping several vendors that week. A plant engineer asking about a 0.5 MW module is on a months long clock. The transferable lesson is not "call in five minutes", it is that leads die in queues nobody checks, and that routing plus an instant acknowledgement fixes most of it. | INFERENCE | From 1.1a to 1.1e and section 2 |

### 1.2 How B2B buyers of complex purchases want to engage

| # | Claim | Label | Source |
|---|---|---|---|
| 1.2a | "61% of B2B buyers prefer an overall rep free buying experience." Survey of 632 B2B buyers, August to September 2024. "73% of B2B buyers actively avoid suppliers who send irrelevant outreach." | VERIFIED | Gartner press release, 25 Jun 2025, https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-sales-survey-finds-61-percent-of-b2b-buyers-prefer-a-rep-free-buying-experience |
| 1.2b | Same release. "for buying tasks requiring contextual intelligence, such as determining whether a product or service fits their company's needs, buyers prefer to seek seller input." And "69% of B2B buyers report inconsistencies between information on the sales organization's website and that provided by sellers." | VERIFIED | Same |
| 1.2c | Gartner, March 2026. 67% of buyers prefer a rep free experience. | SECONDARY (search result title only, gartner.com returned a Cloudflare challenge) | https://www.gartner.com/en/newsroom/press-releases/2026-03-09-gartner-sales-survey-finds-67-percent-of-b2b-buyers-prefer-a-rep-free-experience |
| 1.2d | Gartner, 20 May 2026. 69% of B2B buyers validate AI generated insights with sales reps. Survey of 645 buyers, Aug to Sep 2025, average of seven information sources, 45% used GenAI. | SECONDARY (search summaries of the release on gartner.com, BusinessWire and Barchart. All three pages blocked our fetchers) | https://www.gartner.com/en/newsroom/press-releases/2026-05-20-gartner-survey-finds-sixty-nine-percent-of-b-two-b-buyers-turn-to-sales-reps-to-validate-ai-generated-insights |
| 1.2e | 6sense 2025 Buyer Experience Report, "more than 4,000 buyers" in North America, EMEA and APAC. Journey split moved to "60/40 between research and seller engagement". "94% of buying groups ranked preferred vendors before first contact" and "ultimately purchased from that preliminary favorite 77% of the time." Average buying cycle "shortened from about 11 months in 2024 to 10 months in 2025". | VERIFIED (press release). Sample is mostly technology purchases | 6sense newsroom, 12 Nov 2025, https://6sense.com/newsroom/the-timeline-for-influencing-b2b-buyers-is-shrinking-insights-from-6senses-2025-buyer-experience-report/ |
| 1.2f | Buyers initiate first contact "over 80% of the time". | SECONDARY (search summary of the 6sense report, not in the release I read) | https://6sense.com/science-of-b2b/buyer-experience-report-2025/ |
| 1.2g | Forrester, State of Business Buying 2026. "The typical buying decision now includes 13 internal stakeholders and nine external influencers." "More than 60% of business buyers now make use of a trial", rising to 78% for purchases of $10 million or more. "Procurement professionals are decision makers in 53% of business buying cycles". | VERIFIED (press release, sample and dates not stated on the page) | Forrester, 21 Jan 2026, https://www.forrester.com/press-newsroom/forrester-2026-the-state-of-business-buying/ |
| 1.2h | Engineers specifically. TREW Marketing and GlobalSpec, 2025. "60% of the buying process happening online before engineers engage with sales", "73% of technical buyers rely on vendor websites and online technical publications", "70% of engineers rarely or never use AI to evaluate vendors", "75% of engineers plan to attend at least one in person industry event in 2025". A syndicated headline says 62%, so the exact share differs between their own pages. | VERIFIED (blog summary of the report, full report not downloaded, sample and geography not stated) | TREW Marketing blog, 4 Mar 2025, https://www.trewmarketing.com/blog/2025-state-of-marketing-to-engineers-research, and PR Newswire release 3 Mar 2025 |
| 1.2i | The 95:5 idea. John Dawes (Ehrenberg Bass, for the LinkedIn B2B Institute) estimated that for services switched about every five years "Only 20% are in the market for those services in a given year and just 5% in a given quarter." The ratio depends on how often the thing is bought. | VERIFIED (Ehrenberg Bass page, about 2021) | https://marketingscience.info/news-and-insights/ehrenberg-bass-95-of-b2b-buyers-are-not-in-the-market-for-your-products |
| 1.2j | Applied to boilers that last 20 to 40 years (section 2), the in market share for a boiler replacement is far below 5% a quarter at any single site. HotGreen's "mapped deployments based on manufacturing cycles" is the right instinct. The job of the system is to be remembered and correctly timed, not to push. | INFERENCE | 1.2i plus 2.1 |

### 1.3 Form length and qualification trade offs

| # | Claim | Label | Source |
|---|---|---|---|
| 1.3a | Zuko analysed "1,362 different forms in the Zuko database over a 12 month period". Mean abandonment at the field level was Password 10.50%, Email 6.41%, Phone 6.28%, Name 5.27%, Postcode 4.82%, Address 4.32% (medians roughly half). | COMPANY CLAIM (form analytics vendor, own platform data, mixed B2C and B2B, no date) | https://www.zuko.io/blog/which-form-fields-cause-the-biggest-ux-problems |
| 1.3b | Falsification check. Aggregator pages repeat precise figures such as "the optimal number of fields for B2B is 3 to 5 (Forrester 2024)" and "conversion drops 4.1% per extra field (HubSpot 2024)". I could not trace either to a primary publication, so they are not used here. | UNVERIFIED | Search summaries only |
| 1.3c | What peers in this exact market ask. Skyven's Galileo form asks for baseload steam in bands (0 to 8, 8 to 13, 13 to 38, 38 to 75, over 75 t/h), whether steam pressure is under 21 barg, whether steam temperature is under 215°C, available waste heat in temperature bands, country, work environment (plant or corporate office), and interest in a demo centre visit. Every technical question has an "I don't know" option. The page says "estimates are enough to move forward" and asks for "someone knowledgeable about your plant's equipment and energy use". | VERIFIED (re rendered today, independently of the earlier market-context read) | https://skyven.co/galileo/ |
| 1.3d | Qpinch asks for capacity in MW, pressure out, temperature in and out. AtmosZero asks heat load or flow, pressure, minimum pressure, and reason. GEA gates its eCalculator behind name, email, company and country. | SECONDARY (from `research/market-context.md` section 1.5, rendered by the earlier session, not re checked by me) | https://qpinch.com/simulation-request, https://atmoszero.energy/analysis/, https://www.gea.com/en/campaigns/heat-pump/savings-calculator/ |
| 1.3e | Judgement. The form length evidence is weak and mostly consumer. In a market of a few hundred plants, each enquiry is worth a lot and the cost of a wrong fit is an engineer's week. So a longer, banded form with "I don't know" answers is the right trade here, as long as it asks only what changes the next step. Skyven's design is the model. | INFERENCE | 1.3a to 1.3d |

### 1.4 A qualification form for industrial process heat, field by field

Every field is tied to a reason it changes the reply. HotGreen's own published limits come from their Solutions page via the dossier (HotStack 120, air source, up to 120°C, 2 bar max. HotStack 220, waste heat source, up to 220°C, 25 bar. 0.5 MW modules to 10 MW).

| Field | Format | Why it matters | Evidence |
|---|---|---|---|
| Who are you (plant or site engineering, energy or sustainability, procurement or finance, corporate, investor, press, other) | Single select, first question, routes the rest | Investors and press should never see the plant questions. Skyven splits plant from corporate office | Skyven form (1.3c), dossier pain 3 |
| Site country and postcode or region | Select plus short text | Electricity to gas ratio and regulation differ by country, UK ETS covers only large sites | market-context Part 3, UK ETS data (5.1) |
| Sector and product | Select | Food and drink sub sector drives temperatures and hours | UK ETS NACE mix (5.1) |
| Heat carrier and temperature needed (hot water, steam, both), in bands up to 120°C, 120 to 220°C, above 220°C, don't know | Banded select | Decides HotStack 120 versus 220 versus not a fit | HotGreen spec (dossier section 9), BPA step 1 "temperature and heat requirements for each usage point" |
| Steam pressure needed (up to 2 bar, 2 to 25 bar, above 25, don't know) | Banded select | HotStack 120 tops out at 2 bar, HotStack 220 at 25 bar | HotGreen spec, Skyven asks the same |
| Heat demand (steam t/h or MW thermal) in bands | Banded select | Sizes modules at 0.5 MW each | Skyven bands, Qpinch MW |
| Available waste heat and its temperature band | Banded select | Their own CoP rises from 2.8 to 4.5 with a 50°C source. The case often only closes with a warm source | HotGreen spec, market-context 3.3, BPA step 2 "sources of waste heat", DENEFF on waste heat |
| Operating pattern (shifts per day, days per week, seasonal) | Select | Running hours drive savings and payback | BPA step 3b "magnitude and timing of heat required", deck calculator inputs (dossier section 6) |
| Current heat source and fuel (gas boiler, oil, biomass, electric, CHP) | Select | Biomass sites showed poor heat pump economics in BPA's study, electric resistance sites very good ones | BPA Industrial Heat Pump Market Study, 2024 |
| Boiler age or planned replacement year | Select in five year bands plus "replacement already planned" | The single best timing signal (section 2) | ACEEE boiler lifetimes, 1.2i |
| Next planned shutdown or maintenance window | Month and year, optional | Installs are scheduled into downtime (section 2.3) | HotGreen "3 to 5 days" install claim, shutdown sources (2.3) |
| Decision timeline and budget status (exploring, budget in next plan, budget approved) | Select | Central capex approval is the gate (section 2.2) | DENEFF study |
| What is driving this (energy cost, customer or group net zero target, carbon cost, boiler end of life, other) | Multi select | Tells the reply which case to make. AtmosZero asks the same | AtmosZero form (1.3d), CCEP shadow carbon price (market-context) |
| Name, work email, company, role, optional phone | Text | Phone optional keeps abandonment down | Zuko (1.3a) |
| Consent and privacy notice link | Checkbox plus link | There is no privacy notice anywhere on the site today | site-audit.md, ICO B2B guidance (4.3) |

INFERENCE on the layout. Two steps. Step one is role, email and company. Step two only appears for plant roles. Investors get a different short form. Every technical field has "don't know".

---

## 2. Long sales cycles and capex timing

### 2.1 Boiler lifetimes, the replacement clock

| # | Claim | Label | Source |
|---|---|---|---|
| 2.1a | ACEEE's scenario "assumes typical lifetimes of 20 years for small boilers and 40 years for medium to large boilers". "we are not even close to reaching the technical potential of typical end of life replacement because boilers are still being replaced like for like rather than with lower emitting alternative systems." Food and beverage is one of four subsectors modelled. | VERIFIED (US analysis) | Chen and Hoffmeister, ACEEE Topic Brief, Dec 2024, https://www.aceee.org/sites/default/files/pdfs/net-zero_industry_by_2050_-_a_scenario_analysis_of_boiler_replacement_with_industrial_heat_pumps.pdf |
| 2.1b | Miura America, a boiler maker. "The typical life cycle for a boiler is 15 to 25 years". | COMPANY CLAIM (undated) | https://miuraboiler.com/best-practices-for-industrial-steam-boiler-maintenance/ |
| 2.1c | CIBSE Guide M publishes indicative economic life expectancies for building services plant, updated in 2026. The figure for steam boilers could not be read (paywalled). | UNVERIFIED | https://www.cibse.org/knowledge-research/knowledge-portal/guide-m11-life-expectancy-2023/ |
| 2.1d | Judgement. The two sources disagree (15 to 25 against 20 to 40) and neither is UK food specific. Treat boiler age as a band the customer tells you, not a number you assume. | INFERENCE | 2.1a to 2.1c |

### 2.2 How the investment decision is actually made

| # | Claim | Label | Source |
|---|---|---|---|
| 2.2a | "A range of business criteria are typically assessed, including the payback period, often limited by internal target values of roughly three years." | VERIFIED | PwC for DENEFF, "Process heat in industry, understanding investment decisions of companies", Oct 2025, published Feb 2026, https://deneff.org/wp-content/uploads/2026/02/20260203_DENEFF_Study-Process-heat-in-industry_Understanding-investment-decisions-of-companies.pdf |
| 2.2b | Same study, summary table. "Steam over Industrial heat pumps with waste heat recovery", average payback "5+ years". Main barriers "High CAPEX", "OPEX disadvantage due to electricity prices", "Uncertainty about future price ratios", "Lack of internal expertise", "Lack of implementation examples", "Limited grid connection capacities and lengthy approval procedures". | VERIFIED (German market focus, 15 case studies plus expert interviews) | Same, p.21 |
| 2.2c | Same study. "investment budgets are approved centrally but operating costs are borne at the plant level", and "decision makers often lack complete or adequately processed information about technical potentials, actual savings, or operational risks." It recommends NPV over simple payback because payback "systematically disadvantag[es] long term measures". | VERIFIED | Same |
| 2.2d | CCEP applies "an internal shadow carbon price of €100/tCO2e" to Scope 1 and 2 capex and plans about €385m for emissions reduction in 2025 to 2027, of which €75m is capex. | SECONDARY for me (verified on SEC EDGAR by the earlier session, `research/market-context.md` 2.7) | CCEP 2025 Annual Report and 20 F, https://www.sec.gov/Archives/edgar/data/1650107/000165010726000029/cce-20251231.htm |
| 2.2e | Judgement. The person who fills in the form (plant engineer) is not the person who approves the money (central capex committee) and neither pays the same bill. So the pipeline needs to track two things per site, technical fit and where the site sits in the group's capital plan, and HotGreen needs a finance grade business case (NPV, carbon price) as well as an engineering one. | INFERENCE | 2.2a to 2.2d, Forrester 13 stakeholders (1.2g) |

### 2.3 Shutdowns and install windows

| # | Claim | Label | Source |
|---|---|---|---|
| 2.3a | "Most food production plants will undergo shutdowns 1 to 4 times a year." | COMPANY CLAIM (industrial cleaning contractor, undated) | Hydro Cleansing, https://hydro-cleansing.com/blog/food-production-facility-services-conducted-during-shutdowns |
| 2.3b | HotGreen itself says installation can take "as quick as 3 to 5 days" into existing pipework. | COMPANY CLAIM (dossier section 9, their Solutions page) | https://www.hotgreensolutions.com/solutions |
| 2.3c | Judgement. A 3 to 5 day install fits inside a planned shutdown, which is a selling point, and it means every opportunity has a hard date the customer already knows. Asking for the next shutdown on the form, and storing it on the site record, is what turns "mapped out deployments" into a calendar. | INFERENCE | 2.3a, 2.3b |

### 2.4 Proof, reference sites and the buying group

| # | Claim | Label | Source |
|---|---|---|---|
| 2.4a | Interviews with high temperature heat pump makers. "It is also crucial to have companies as demo customers that operate the first units", and makers invite end customers "for an on site visit to see the demonstration units in operation to build trust in the market (i.e., seeing is believing)". "none of the heat pump manufacturers interviewed has yet implemented HaaS in connection with industrial heat pumps." | VERIFIED | Arpagaus et al., "Review of Business Models for Industrial Heat Pumps", ECOS 2023 proceedings, https://www.proceedings.com/content/069/069564-0068open.pdf |
| 2.4b | "Lack of implementation examples" is a named barrier. | VERIFIED | DENEFF study (2.2b) |
| 2.4c | Judgement. This supports Sanya's plan to start outbound after the first CCEP deployment. Before a reference site exists, outbound mainly produces "call us when you have one running". The inbound system and the CCEP case study are the precondition for outbound, not an alternative to it. | INFERENCE | 2.4a, 2.4b, transcript |

### 2.5 Sales cycle length for industrial heat pumps

No primary source gave a measured sales cycle length for industrial heat pumps. 6sense's 10 months (1.2e) is across all B2B, mostly technology. UNVERIFIED for this market. Asking HotGreen what their own pipeline shows is the honest route.

---

## 3. CRM and pipeline tools for a 1 to 6 person team

### 3.1 Framer forms, what connects to what

| # | Claim | Label | Source |
|---|---|---|---|
| 3.1a | Framer forms "Send submissions to email, Google Sheets, or custom webhooks", with "built in spam protection and rate limiting". | VERIFIED (article dated 15 Sep 2026) | https://www.framer.com/help/articles/how-can-i-add-a-contact-form-to-my-framer-website/ |
| 3.1b | Webhook destination. "Framer sends form submissions as JSON to the webhook via an HTTP POST request", input names become the JSON keys, each request carries `Framer-Signature` (SHA 256, signed with your secret) and `Framer-Webhook-Submission-Id`, the endpoint must return 2xx, "Framer will retry the request up to 5 times", and "Redirects (3xx responses) are not followed". | VERIFIED (15 Sep 2026) | https://www.framer.com/help/articles/framer-form-webhook-setup/ |
| 3.1c | HubSpot forms are a native Framer component, dragged onto the page. "All visual and functional customizations must be made within HubSpot." | VERIFIED (dated 25 Sep 2026) | https://www.framer.com/help/articles/how-to-add-hubspot-forms-to-your-website/ |
| 3.1d | Framer documents sending form submissions straight into a Clay table via a Clay webhook. Its integrations page also lists Formspark, Mailchimp, Marketo, Typeform, Intercom and Zapier related routes. | VERIFIED | https://www.framer.com/help/articles/connect-framer-forms-to-clay/, https://www.framer.com/help/integrations/ |
| 3.1e | HotGreen's live form, re checked today. `<input ... name="lastname" placeholder="Smith">` and `<textarea required name="lastname" placeholder="Hi,">`, email field named `Email`, first name not required, and zero occurrences of "privacy" in the contact page HTML. | VERIFIED (curl of https://www.hotgreensolutions.com/contact, "Published Aug 13, 2026") | Also in `research/site-audit.md` |
| 3.1f | Consequence. Through a webhook both values arrive under one `lastname` key, so either the surname or the message is lost or merged, depending on the receiver. Needs a one minute rename before any CRM work. | INFERENCE (not tested, nothing submitted) | 3.1b plus 3.1e |

### 3.2 CRM options, prices read on the vendors' own pages today

Prices are USD as displayed to our UK located browser unless stated. UK VAT and local currency may differ.

| Tool | Free tier | Paid entry, per seat per month | Sequences (automated follow up) | Framer connection | Data residency | Label and check notes |
|---|---|---|---|---|---|---|
| **HubSpot** Sales Hub / Starter Customer Platform | "Free for up to 2 users. No credit card required." | Starter "$7/mo/seat" on annual, "$20/mo/seat" monthly, but the Starter page says "$7/mo or $10/mo per seat based on plan. Offer available for a limited time", new customers only, list price $20 | Sequences listed under Professional, "$90/mo/seat" annual plus a required "$1,500" onboarding fee | Native HubSpot form component in Framer (3.1c) | An "European Union Data Center" is listed (Germany, per a search summary of HubSpot's knowledge base), but "Customers who only use free services will be assigned a data center in the United States." No UK centre. HubSpot "relies on the UK extension to the EU U.S. DPF" (certified 26 Sep 2023) | VERIFIED on https://www.hubspot.com/pricing/sales, https://www.hubspot.com/products/crm/starter, https://www.hubspot.com/data-centers, https://legal.hubspot.com/eu-us-dpf. Outdated check, the $7 is a time limited promotion. Second source, pricing blogs agree the base price is $20 |
| **Attio** | Free, "Up to 3 seats" | Plus $35 annual, $44 monthly, up to 10 seats. Pro $79 annual, $99 monthly | "Call Intelligence & sequences" on Pro | Webhook. Attio workflows have a "Webhook received" trigger ("starts a workflow when an external application sends a request to a provided URL") and "Create or update record", and the block library is "Available on all plans" | Not published on any page I could read. Privacy policy says data "may be stored or transferred outside of the United Kingdom (UK) or European Economic Area" | Prices VERIFIED on https://attio.com/pricing. Workflow VERIFIED on https://attio.com/help/reference/automations/workflows/workflows-block-library. Residency UNVERIFIED |
| **Pipedrive** | None, 14 day trial | Lite $14, Growth $39, Premium $59, Ultimate $79 annual (monthly $24, $49, $79, $99) | Growth includes "Sequences", "structured, repeatable lead nurturing workflows using manual emails and follow up tasks" | Web Forms come with LeadBooster, included on Premium and Ultimate, add on below | Hosts in "AU (Sydney), CA (Montreal), EU (Frankfurt), EU (Dublin), UK (London), US East, US West". "UK, for non EU European and EMEA clients", with the caveat "company accounts can be hosted in different data centers" | Prices SECONDARY (pipedrive.com returned a Cloudflare block. saasswitcher.com, 14 Sep 2026, and a search summary of several guides agree on $14/$39/$59/$79). Plans, forms and hosting VERIFIED on https://support.pipedrive.com/en/article/new-pipedrive-plans and https://support.pipedrive.com/en/article/how-secure-is-my-data-in-pipedrive (both updated 3 Sep 2026) |
| **folk** | 14 day trial, no free plan | Standard "$24 /member/month" billed yearly, Premium $48, Enterprise from $80 | "Email sequences" from Premium | Zapier and Make apps, REST API | Not checked | VERIFIED on https://www.folk.app/pricing (annual view only) |
| **Zoho CRM** | "Forever free, for 3 users" | Standard US$14, Professional US$23, Enterprise US$40 per user per month. The page shows the same figure under Monthly and Annually, so the billing basis is not confirmed. "Data capture via forms" from Standard | Workflow automation on Free, cadences not checked | Webhook via Zapier or Zoho Flow, not checked | Zoho lists servers in "the United States, Netherlands, Ireland, India, China, and Australia". A UK data centre was announced for Q2 2026, and an April 2026 article said it was not live yet | Prices VERIFIED on https://www.zoho.com/en-us/crm/zohocrm-pricing.html (US page, UK page 404). Hosting VERIFIED on Zoho help. UK centre status UNVERIFIED (Data Centre Review, 9 Apr 2026) |

**UK data transfer check (outdated test).** The EU U.S. DPF, which the UK extension rides on, was upheld by the EU General Court in Latombe v Commission on 3 Sep 2025 and an appeal (C 703/25 P) was filed on 31 Oct 2025. SECONDARY (search summaries of IAPP and WilmerHale). So US hosting is lawful today with a live legal risk. INFERENCE, for a company selling to EU groups an EU or UK hosted CRM avoids the question entirely.

---

## 4. Outbound for industrial B2B, tools and law

### 4.1 Enrichment and sequencing tools, prices read today

| Tool | What you pay | What it does | Label |
|---|---|---|---|
| **lemlist** | Email plan "$69" monthly or "$55" per month yearly, "Unlimited users", "50,000 emails/mo". Multichannel "$109" or "$87" per user per month, "5 senders per user", "LinkedIn automation". Data add on from $16 to $20 a month for "2k credits/mo (400 emails or 100 phones)". Buying intent signals add on $21 to $29 a month, "100 signals/mo" | Sequences across email and LinkedIn, lead database, enrichment, signals | VERIFIED https://www.lemlist.com/pricing |
| **Clay** | Free, "6K actions/yr", "1.2K data credits/yr", "Run up to 200 rows per table". Launch "$167/mo" monthly, made up of actions from $54 plus data credits from $113. Growth "$446/mo" | Enrichment waterfalls across "150+ providers", AI web research ("Claygent"), job change and news signals, its own sequencer | VERIFIED https://www.clay.com/pricing |
| **Apollo** | Free, "900 credits per seat per year", "2 Sequences". Basic "$49" per seat per month annual, Professional "$79", Organization "$119" (min 3 seats) | Contact database, sequences, "Real time Form Enrichment", website visitor identification | VERIFIED https://www.apollo.io/pricing |

Falsification note on data sources. LinkedIn removed the Apollo.io and Seamless.ai company pages on 6 Mar 2025. LinkedIn never said why, and Apollo said the removal "does not disrupt Apollo's services". SECONDARY, MarTech, 8 May 2025, https://martech.org/a-pair-of-lead-gen-providers-have-disappeared-from-linkedin/. It shows the data supply behind these tools is contested.

### 4.2 Deliverability, the part that takes real setup

| # | Claim | Label | Source |
|---|---|---|---|
| 4.2a | Gmail, all senders. SPF or DKIM, valid forward and reverse DNS, TLS, spam rate in Postmaster Tools "below 0.3%". Senders of 5,000 or more a day also need SPF and DKIM and DMARC, alignment, and "one click unsubscribe". Effective 1 Feb 2024. | VERIFIED | Google Workspace Admin Help, https://support.google.com/a/answer/81126 |
| 4.2b | Outlook.com high volume senders (5,000 or more a day) must pass SPF, DKIM and DMARC (at least p=none). From 5 May 2025 non compliant mail was routed to Junk, then rejected with "550 5.7.515". | SECONDARY (search summary of Microsoft's Tech Community post, page did not load for me) | https://techcommunity.microsoft.com/blog/microsoftdefenderforoffice365blog/strengthening-email-ecosystem-outlook%e2%80%99s-new-requirements-for-high%e2%80%90volume-senders/4399730 |
| 4.2c | Judgement. HotGreen will never be near 5,000 a day, so the bulk rules do not bind. SPF, DKIM and DMARC on their domain are still worth doing once, because the same records protect their normal email. Astra's own domain bounced on 13 Sep (dossier section 8), which shows how easily this goes wrong. | INFERENCE | 4.2a, 4.2b, dossier |

### 4.3 The law, country by country

**United Kingdom**

| # | Rule | Label and three checks | Source |
|---|---|---|---|
| UK1 | PECR reg 22 "applies to the transmission of unsolicited communications by means of electronic mail to individual subscribers." Reg 22(2) needs prior consent unless the soft opt in in 22(3) applies. | VERIFIED. (1) Quoted, revised to 5 Feb 2026. (2) Outdated test, DUAA 2025 amended reg 22 on 5 Feb 2026, adding only a charity soft opt in (22(3A)). (3) Second source, ICO B2B page | https://www.legislation.gov.uk/uksi/2003/2426/regulation/22 |
| UK2 | "corporate subscriber" means a company, a Scottish partnership, a corporation sole, or "any other body corporate or entity which is a legal person distinct from its members". "individual" includes "an unincorporated body of such individuals". "electronic mail" means "any text, voice, sound or image message sent over a public electronic communications network which can be stored in the network or in the recipient's terminal equipment until it is collected". | VERIFIED | PECR reg 2, https://www.legislation.gov.uk/uksi/2003/2426/regulation/2 |
| UK3 | Reg 23 applies to all direct marketing email. No disguised or concealed sender identity, and a valid address for opt out requests. | VERIFIED | https://www.legislation.gov.uk/uksi/2003/2426/regulation/23 |
| UK4 | ICO. "You can email or text any corporate body (a company, Scottish partnership, limited liability partnership or government body)", keep a do not email list. "Sole traders and some partnerships are treated as individuals". | VERIFIED. Outdated test, the page says "Due to changes made by the Data (Use and Access) Act, this guidance is under review and may be subject to change." | https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guide-to-pecr/electronic-and-telephone-marketing/electronic-mail-marketing/ |
| UK5 | ICO B2B page. "The PECR rule on direct marketing by electronic mail does not apply to corporate subscribers" but for named people you need "a lawful basis from the UK GDPR", must give privacy information, and must honour the absolute right to object to direct marketing. | VERIFIED, same DUAA review banner | https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/business-to-business-marketing/ |
| UK6 | UK GDPR Article 6(11), inserted by DUAA and in force from 5 Feb 2026 for remaining purposes. Examples of processing that may be necessary for a legitimate interest include "(a) processing that is necessary for the purposes of direct marketing". | VERIFIED. Outdated test, this is the 2025 to 2026 change. Second source, ICO says the Act "clarifies that direct marketing can be a legitimate interest" | https://www.legislation.gov.uk/eur/2016/679/article/6, https://ico.org.uk/about-the-ico/what-we-do/legislation-we-cover/data-use-and-access-act-2025/the-data-use-and-access-act-2025-what-does-it-mean-for-organisations/ |
| UK7 | UK GDPR Article 14(3). Where data was not obtained from the person (enrichment tools, scraped lists), privacy information must be given "within a reasonable period ... at the latest within one month" or "at the latest at the time of the first communication", and 14(2)(f) requires the source. | VERIFIED | https://www.legislation.gov.uk/eur/2016/679/article/14 |
| UK8 | Penalties. PECR Schedule 1 para 18 applies DPA 2018 s.157 so that infringements of "regulation 5, 6, 7, 8, 14, 19, 20, 21, 21A, 21B, 22, 23, 24 or 32B(4) or (5)" attract "the higher maximum amount", which s.157(5) sets at "£17,500,000 or 4% of the undertaking's total annual worldwide turnover ... whichever is higher". The whole of Schedule 1 was substituted on 5 Feb 2026 by DUAA s.142(1) and Sch. 13 (S.I. 2026/82), with the list of regulations adjusted by s.116(4). | VERIFIED on both statutes. Second source, Blake Morgan and Clifford Chance summaries (SECONDARY) say the cap was £500,000 before and that the ICO applies the new cap only to conduct after 5 Feb 2026 | https://www.legislation.gov.uk/uksi/2003/2426/schedule/1, https://www.legislation.gov.uk/ukpga/2018/12/section/157 |
| UK9 | Whether a LinkedIn direct message is "electronic mail" under PECR was not settled by any ICO page I could read. The definition in UK2 is wide. | UNVERIFIED, treat as if it might be | PECR reg 2 |

**Germany**

| # | Rule | Label and three checks | Source |
|---|---|---|---|
| DE1 | UWG s.7(2). An unreasonable nuisance is always assumed "1. bei Werbung mit einem Telefonanruf gegenüber einem Verbraucher ohne dessen vorherige ausdrückliche Einwilligung oder gegenüber einem sonstigen Marktteilnehmer ohne dessen zumindest mutmaßliche Einwilligung, 2. bei Werbung unter Verwendung einer automatischen Anrufmaschine, eines Faxgerätes oder elektronischer Post, ohne dass eine vorherige ausdrückliche Einwilligung des Adressaten vorliegt". So email to a business needs prior express consent. A phone call to a business needs at least presumed consent. | VERIFIED. (1) Quoted from the current consolidated text. (2) Outdated test, the text reads "Nr. 2" for email, which reflects the post 2021 renumbering, and the existing customer exception is s.7(3). (3) Second source below | https://www.gesetze-im-internet.de/uwg_2004/__7.html |
| DE2 | IHK Nord Westfalen. "E Mail Werbung ist nur in Ausnahmefällen erlaubt", the term "elektronische Post" "ist allerdings weit zu verstehen und umfasst z. B. auch SMS, Facebook und WhatsApp Nachrichten". For calls to non consumers "die mutmaßliche Einwilligung des Adressaten ausreichend", but "Der allgemeine Sachbezug mit den von dem angerufenen Unternehmen angebotenen Dienstleistungen reicht für die Annahme einer mutmaßlichen Einwilligung nicht aus." | VERIFIED. Note the page still cites the old paragraph number (Nr. 3) for email, so it predates the renumbering, but the substance matches DE1 | https://www.ihk.de/nordwestfalen/recht/rechtsthemen/wettbewerbsrecht/werbung-per-telefon-telefax-oder-e-mail-3614212 |
| DE3 | Judgement. A German plant cannot be cold emailed lawfully. Routes that remain are a well researched phone call where there is a concrete reason to assume interest, trade events, partners and integrators, content, and inbound. LinkedIn messages may count as "elektronische Post" on IHK's reading. | INFERENCE | DE1, DE2 |

**Netherlands**

| # | Rule | Label and three checks | Source |
|---|---|---|---|
| NL1 | Tw art. 11.7(1). Electronic messages for "ongevraagde communicatie voor commerciële ... doeleinden" are banned "tenzij de verzender kan aantonen dat de desbetreffende eindgebruiker daarvoor voorafgaand toestemming heeft verleend". Art. 11.7(3). No consent is needed for a "rechtspersoon of een natuurlijke persoon die handelt in de uitoefening van zijn beroep of bedrijf" only if "de verzender gebruik maakt van elektronische contactgegevens die door de desbetreffende eindgebruiker voor het ontvangen van ongevraagde communicatie voor commerciële ... doeleinden zijn bestemd en bekendgemaakt". Art. 11.7(7) requires the sender's real identity and a valid address for stopping. | VERIFIED. (1) Quoted from the version valid 15 Aug 2026. (2) Outdated test, the current version was fetched, no newer version shown. (3) Second source below | https://wetten.overheid.nl/BWBR0009950/2026-08-15 |
| NL2 | OPTA (now ACM), 12 Jan 2011. Article 11.7 "is van toepassing op het verzenden van ongevraagde communicatie ... aan consumenten of bedrijven door middel van ... elektronische berichten zoals e mail", and "mag alleen als de verzender vooraf beschikt over toestemming van de ontvanger". ACM's current business spam page says only companies you were or are a customer of may send you unsolicited advertising. | VERIFIED (old letter, current page) | https://www.acm.nl/sites/default/files/old_publication/publicaties/10143_uitleg-aan-marktpartijen-spamverbod-telemarketingregels-2011-01-20.pdf, https://www.acm.nl/nl/telecom/zakelijk-abonnement-voor-bellen-en-internet/spam |

**France and the EU generally**

| # | Rule | Label | Source |
|---|---|---|---|
| EU1 | ePrivacy Directive art. 13(1) requires prior consent for direct marketing email, and art. 13(5) says "Paragraphs 1 and 3 shall apply to subscribers who are natural persons. Member States shall also ensure ... that the legitimate interests of subscribers other than natural persons ... are sufficiently protected." So each country chooses its B2B rule, which is why the UK, Germany and the Netherlands differ. | VERIFIED on the 2002 text as held by legislation.gov.uk. The consolidated EUR Lex text would not load, so the 2009 amendments were not re checked | https://www.legislation.gov.uk/eudr/2002/58/article/13 |
| EU2 | The proposed ePrivacy Regulation that would have replaced this patchwork was withdrawn. The Commission announced it on 11 Feb 2025 and "the current ePrivacy Directive and its national transposition laws will remain in force." | SECONDARY (Hunton, 14 Feb 2025. A search summary adds formal withdrawal in the Official Journal on 6 Oct 2025, not checked) | https://www.hunton.com/privacy-and-information-security-law/european-commission-withdraws-eprivacy-regulation-and-ai-liability-directive-proposals |
| FR1 | CNIL. B2B prospecting is allowed when "l'objet de la sollicitation est en rapport avec la profession de la personne démarchée", the person was informed and can object. Generic addresses such as info@ and contact@ "ne sont pas soumises aux principes rappelés ci dessus". | VERIFIED (page dated 10 Jun 2026) | https://www.cnil.fr/fr/la-prospection-commerciale-par-courrier-electronique-sms-mms-et-automate-dappel |

**LinkedIn**

| # | Rule | Label | Source |
|---|---|---|---|
| LI1 | User Agreement, effective 3 Nov 2025, section 8.2. You agree not to "Develop, support or use software, devices, scripts, robots or any other means or processes (such as crawlers, browser plugins and add ons or any other technology) to scrape or copy the Services", and not to "Use bots or other unauthorized automated methods to access the Services, add or download contacts, send or redirect messages ... or otherwise drive inauthentic engagement". | VERIFIED | https://www.linkedin.com/legal/user-agreement |
| LI2 | LinkedIn Help. "we don't permit the use of any third party software, including 'crawlers', bots, browser plug ins, or browser extensions that scrape, modify the appearance of, or automate activity on LinkedIn's website." Members who do "risk having their accounts restricted or shut down." | VERIFIED (article about two years old) | https://www.linkedin.com/help/linkedin/answer/a1341387 |

**Channel by country summary** (INFERENCE from the rows above, not legal advice)

| Channel | UK company staff | UK sole trader | Germany | Netherlands | France |
|---|---|---|---|---|---|
| Cold email to a named work address | Allowed with identity, opt out, UK GDPR legitimate interest, Art 14 notice by first message | Consent or soft opt in only | Not without prior express consent | Only to addresses the firm published for this purpose, otherwise consent | Allowed if relevant to their job, informed, can object |
| Cold phone call | Allowed unless TPS or CTPS registered (not checked here) | Same | Presumed consent needed, a concrete reason | Not checked | Not checked |
| Manual LinkedIn message | Platform allowed. PECR status unsettled | Same | May be "elektronische Post" | Unclear | Unclear |
| Automated LinkedIn (lemlist Multichannel, similar) | Breaches LinkedIn User Agreement everywhere | | | | |

---

## 5. Account based and signal based approaches

### 5.1 Public signals that actually exist, checked today

| Signal | What I found | Label | Source |
|---|---|---|---|
| UK ETS participation and emissions | The "Compliance Report, emissions and surrenders" (published 22 Jun 2026) lists every installation with emissions 2021 to 2025, permit ID, regulator and NACE code. My filter on NACE 10xx and 11xx found 78 food and drink installation accounts, 68 open, 66 with 2025 emissions totalling 2,255,418 tCO2e, median 19,120 t. Largest groups by type, oils and fats 10, dairies 8, spirits 8, potatoes 6, beer 5, sugar 5, malt 5. Account holders include AB InBev UK, Arla Foods, British Sugar, Cargill, Nestlé UK, Diageo Scotland, Heineken UK, Kerry Ingredients, Molson Coors, Muller, Walkers, Tate and Lyle Sugars, Premier Foods. Caveats found by testing the filter. Some food sites' energy centres are run by third parties under an energy NACE code (for example "E.on Connecting Energies Limited, Britvic Energy Centre", 21,148 t in 2025), so NACE alone misses sites. CCEP has no installation account. | VERIFIED (own analysis of the government file, `gtm2/src/ukets_compliance.xlsx`) | https://reports.view-emissions-trading-registry.service.gov.uk/ets-reports.html |
| UK ETS installation operators and allocations | Separate file per year, 784 rows for 2026, with account holder, installation name, permit ID, regulated activity, first year and free allocation. Published 25 Sep 2026. | VERIFIED | Same page |
| Science based targets | The SBTi Target Dashboard lists companies with validated targets or commitments, by sector and location, with near term and net zero status, target years and date published. "14271" companies at the time of reading. Downloadable in Excel. "updated every Thursday". | VERIFIED | https://sciencebasedtargets.org/target-dashboard |
| Planning applications | The national planning application dataset says "The planning application dataset is incomplete and is not yet ready for use." Its collector last ran 17 Sep 2025. So planning signals mean checking each council's portal. | VERIFIED | https://www.planning.data.gov.uk/dataset/planning-application |
| Energy price moves | DESNZ quarterly non domestic prices, next update 29 Sep 2026. Dutch TTF up more than 130% since the start of 2026. | SECONDARY for me (verified by the earlier session, `research/market-context.md` 2.5) | market-context.md |
| Grants and demos | Innovate UK projects are listed on Gateway to Research, which is where HotGreen's own CCEP project was found. IETF is closed. | SECONDARY for me (dossier section 10, market-context 2.6) | https://gtr.ukri.org |

### 5.2 Signal based outbound in industrial markets, examples

| # | Claim | Label | Source |
|---|---|---|---|
| 5.2a | Verkada, a physical security hardware company, uses Clay to target "niche ideal customer profiles such as IT directors, Homeowners Associations (HOAs), industrial businesses", enriching directories with "domains, industries, and LinkedIn profiles" and sending direct mail to priority accounts. No results figures beyond "nearly doubled match rates". | COMPANY CLAIM (Clay case study, undated) | https://www.clay.com/customers/verkada |
| 5.2b | lemlist sells "Buying intent signals", "Real time signals from events that show lead interest", 100 a month from $21. Clay sells job change, promotion, new hire, company news and web intent signals. Neither lists UK ETS, SBTi or boiler age signals. | VERIFIED (pricing pages) | lemlist and Clay pricing pages |
| 5.2c | I found no primary source where an industrial heat or process equipment vendor documents its own signal based outbound. | UNVERIFIED | |
| 5.2d | Judgement. The generic signal products track hiring and funding, which say little about a boiler house. The signals that matter here (ETS emissions, SBTi commitments, a group's published capex plan, boiler age, next shutdown, energy price) are public or customer supplied, and none of them is sold as a lemlist or Clay signal. That is where Astra's version can be different from what Astra itself uses. | INFERENCE | 5.1, 5.2a, 5.2b |

---

## 6. What a small team can set up alone, and what AI still cannot do

| Task | Afternoon job with no code tools or an AI assistant? | Evidence |
|---|---|---|
| Rename the form fields, add a privacy notice link, turn on email notifications | Yes, an hour | Framer help (3.1a), site audit |
| Framer form to CRM by webhook (Attio workflow, Clay table, Zapier) or HubSpot form component | Yes, an afternoon, with an AI assistant writing the mapping | Framer help (3.1b to 3.1d), Attio block library (3.2) |
| Auto acknowledgement email plus a Slack or email alert to Sanya | Yes | Workato routing finding (1.1e) |
| Set up a CRM with custom fields for site, temperature, boiler age, next shutdown | Yes to install. The hard part is choosing the fields and keeping them filled, which is judgement and habit rather than tooling | DENEFF (2.2), 1.4 |
| Build a target list from the UK ETS file and the SBTi dashboard | Yes. I did the ETS filter in minutes. Knowing which rows are real prospects (third party energy centres, sites above 220°C, biomass sites) takes domain knowledge | 5.1, BPA biomass finding |
| SPF, DKIM, DMARC and a warmed sending domain | Half a day if someone has DNS access, and easy to get wrong | Google (4.2a), Astra's own bounce (dossier 8) |
| Legal mapping per country and channel, and a legitimate interest assessment | Not safely in an afternoon. The rules differ country to country and the ICO's own guidance is "under review" after DUAA | Section 4.3 |
| An honest savings or payback estimate for a prospect | No. It needs their business case model, their tariffs and a finance view. Generic inputs show a UK site paying more | market-context Part 3, DENEFF payback gap |
| AI agents running the CRM unattended | Not yet reliable. On Salesforce's CRMArena Pro benchmark "leading LLM agents achieve only around 58% single turn success", "approximately 35% in multi turn settings", and "agents exhibit near zero inherent confidentiality awareness". Tested on models available in May 2025, so it may overstate today's failure rate | VERIFIED, Huang et al., arXiv 2505.18878, 24 May 2025, https://arxiv.org/abs/2505.18878 |
| Replacing the human conversation | No. Buyers want seller input on fit (Gartner 2025), 69% validate AI answers with reps (Gartner 2026, SECONDARY), 70% of engineers rarely or never use AI to evaluate vendors (TREW 2025), and reference site visits build trust (Arpagaus 2023) | Sections 1.2, 2.4 |

---

## 7. What this means for HotGreen (INFERENCE throughout)

Each item says what Astra could build or set up, the evidence behind it, and whether HotGreen could plausibly do it themselves with AI tools.

1. **Fix the form plumbing first, before anything else is sold.** Rename the textarea from `lastname` to `message`, make first name genuinely required or optional, add a privacy notice and link it from the form, and switch on a webhook. Evidence, 3.1b, 3.1e, UK5. **Self service, yes.** Sanya can do this in an hour once she has Framer access. It is a quick win to mention, not a paid bucket (dossier section 7 point 6 already warns against selling her things she will do for free).

2. **Three doors instead of one form.** A plant enquiry path with the banded qualification form in 1.4, a short investor path (name, fund, what they want, deck request) that goes to Georgia, and a partner or press path. Evidence, Gartner buyers want seller input on fit (1.2b), Skyven splits plant from corporate (1.3c), Sanya's "everyone goes down the same path" (dossier pain 3). **Self service, partly.** The fields are easy in Framer. Deciding which answers mean HotStack 120, HotStack 220 or "not a fit", and writing the reply for each, needs their engineers plus someone who has designed intake flows. That is Astra's piece.

3. **An instant, useful reply rather than a fast call.** The form returns a one page "what we'd need to size this" note and a same day human reply target, with an alert to Sanya's phone. For a site that answered the technical questions, the reply could show which module family fits and what data an engineer would ask for next. Evidence, HBR and Workato on queues and routing (1.1), Skyven "estimates are enough to move forward" (1.3c). **Self service, yes for the alert and template. The fit logic is item 2.**

4. **A pipeline built around sites and dates, not contacts.** Records for Group, Site, Opportunity. Site fields for temperature band, pressure band, heat demand band, waste heat, fuel, boiler age band, next shutdown, and whether the site is in the UK ETS or the group has an SBTi target. Opportunity stages that include "central capex submission" and "budget approved", with a finance contact on every opportunity. A calendar view of shutdowns and boiler replacement years is the "mapped out deployments" turned into a tool Sanya can run. Evidence, ACEEE lifetimes (2.1a), DENEFF central budgets and payback gap (2.2), Forrester 13 stakeholders and procurement in 53% of cycles (1.2g), shutdown claims (2.3). **Self service, the software yes, the design no.** Any of the CRMs in 3.2 can hold this. Knowing that the capex committee and the next shutdown are the real stage gates is the value.

5. **Which CRM.** For a one person commercial function selling into UK and EU groups, the choice turns on hosting and cost, not features. HubSpot free is the fastest to wire to Framer but a free only account is hosted in the US and sequences cost $90 a seat plus $1,500 onboarding. Pipedrive publishes UK and EU hosting and has sequences from Growth (price SECONDARY). Attio has webhook workflows on every plan but no published region. Zoho has an EU centre and a free tier for 3 users. Evidence, 3.2. **Self service, yes.** This is a comparison Sanya could run with an AI assistant in an hour. Astra's value is making the choice once, with the data model in item 4, not the install.

6. **One source of numbers across site, deck and sellers.** Every figure on the site, the calculator and in Sanya's emails comes from one maintained sheet (the business case model), with a date. Evidence, Gartner found 69% of buyers see website versus seller inconsistencies (1.2b), and HotGreen's own channels disagree on savings, CO2, temperature and currency (dossier section 10). **Self service, partly.** Keeping it in sync is discipline. Wiring the calculator to it is a build.

7. **A small, signal led account list, ready for after the first deployment.** Start from the 68 UK ETS food and drink installations, add SBTi committed food and drink groups, remove sites that fail the temperature or fuel screen, and add the group's capex plan and any known boiler age. Keep it to low hundreds of sites. Evidence, 5.1, 1.2i. **Self service, the list yes, the judgement no.** The raw filter is minutes of work. Screening out third party energy centres, biomass sites and anything above 220°C needs their engineers.

8. **Outbound that respects the law and the platform.** UK company staff by email with identity, opt out, a legitimate interest assessment and an Article 14 notice in the first message. Germany by phone with a concrete reason, events and partners, not email. Netherlands only to published commercial addresses, otherwise warm routes. France job relevant email with opt out. LinkedIn by hand from Georgia's and Sanya's own accounts, no automation. Evidence, 4.3. **Self service, not safely.** This is where a small team is most likely to get it wrong, and PECR fines now reach £17.5m or 4%.

9. **Reference first, outbound second.** Build the CCEP demonstrator case page and a "come and see it running" offer before outbound starts, and log every site visit in the CRM. Evidence, Arpagaus "seeing is believing" and DENEFF "lack of implementation examples" (2.4). **Self service, the content yes, with what they are allowed to say about CCEP still an open question (dossier section 12).**

10. **The "same tools as Astra" worry.** At HotGreen's scale none of lemlist, Clay or Apollo is needed to start. The expensive part of those tools is volume enrichment and sequencing across thousands of contacts, and HotGreen's addressable list is hundreds of sites where 73% of buyers punish irrelevant outreach (1.2a). What makes Astra's proposal different from Astra's own stack is the data model (site, boiler, shutdown, capex) and the signals (ETS, SBTi, boiler age), none of which the generic tools sell (5.2d). If volume grows after 2027, a sequencer can be added on top of the same CRM. Recommending lemlist Multichannel's LinkedIn automation to a client would put their CEO's LinkedIn account at risk (LI1, LI2).

**What HotGreen genuinely cannot do alone in an afternoon.** The fit logic behind the qualification form, the data model around capex and shutdowns, the legal channel map, the finance grade business case behind any calculator, and the judgement of which ETS rows are real prospects. Everything else on the list above an AI assistant can now do with them.

---

## 8. Source table

Access date for all rows is 25 Sep 2026.

| No. | Title | Publisher | Date | URL | Primary or secondary | Supports | Reliability |
|---|---|---|---|---|---|---|---|
| 1 | Privacy and Electronic Communications (EC Directive) Regulations 2003, regs 2, 22, 23, Sch 1 | legislation.gov.uk | Revised to 5 Feb 2026 | https://www.legislation.gov.uk/uksi/2003/2426/regulation/22 | Primary | UK1 to UK3, UK8 | High, the law itself |
| 2 | Data Protection Act 2018, s.157 | legislation.gov.uk | Current | https://www.legislation.gov.uk/ukpga/2018/12/section/157 | Primary | UK8 fine levels | High |
| 3 | UK GDPR Articles 6 and 14 | legislation.gov.uk | Revised to 24 Sep 2026 | https://www.legislation.gov.uk/eur/2016/679/article/6 | Primary | UK6, UK7 | High |
| 4 | Electronic mail marketing, and Business to business marketing | ICO | Undated, "under review" after DUAA | https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/business-to-business-marketing/ | Primary (regulator guidance) | UK4, UK5 | High, but flagged as under review |
| 5 | The DUAA, what does it mean for organisations | ICO | 19 Jun 2025, updated 19 Jun 2026 | https://ico.org.uk/about-the-ico/what-we-do/legislation-we-cover/data-use-and-access-act-2025/the-data-use-and-access-act-2025-what-does-it-mean-for-organisations/ | Primary | UK6 second source | High |
| 6 | Gesetz gegen den unlauteren Wettbewerb, s.7 | Bundesministerium der Justiz, gesetze-im-internet.de | Current | https://www.gesetze-im-internet.de/uwg_2004/__7.html | Primary | DE1 | High |
| 7 | Werbung per Telefon, Telefax oder E Mail | IHK Nord Westfalen | Undated, pre renumbering | https://www.ihk.de/nordwestfalen/recht/rechtsthemen/wettbewerbsrecht/werbung-per-telefon-telefax-oder-e-mail-3614212 | Secondary (chamber guidance) | DE2 | Medium high, paragraph numbers stale |
| 8 | Telecommunicatiewet art. 11.7 | wetten.overheid.nl | Version from 15 Aug 2026 | https://wetten.overheid.nl/BWBR0009950/2026-08-15 | Primary | NL1 | High |
| 9 | Toelichting artikel 11.7 Tw, and Spam (zakelijk abonnement) | OPTA, now ACM | 12 Jan 2011, and current page | https://www.acm.nl/sites/default/files/old_publication/publicaties/10143_uitleg-aan-marktpartijen-spamverbod-telemarketingregels-2011-01-20.pdf | Primary (regulator) | NL2 | Medium high, letter is old |
| 10 | Directive 2002/58/EC art. 13 | legislation.gov.uk (EU text as retained) | 2002 text | https://www.legislation.gov.uk/eudr/2002/58/article/13 | Primary | EU1 | High for 2002 text, 2009 amendments not re checked |
| 11 | European Commission withdraws ePrivacy Regulation proposal | Hunton Andrews Kurth | 14 Feb 2025 | https://www.hunton.com/privacy-and-information-security-law/european-commission-withdraws-eprivacy-regulation-and-ai-liability-directive-proposals | Secondary | EU2 | Medium high (law firm) |
| 12 | La prospection commerciale par courrier électronique | CNIL | 10 Jun 2026 | https://www.cnil.fr/fr/la-prospection-commerciale-par-courrier-electronique-sms-mms-et-automate-dappel | Primary (regulator) | FR1 | High |
| 13 | User Agreement | LinkedIn | Effective 3 Nov 2025 | https://www.linkedin.com/legal/user-agreement | Primary | LI1 | High |
| 14 | Prohibited software and extensions | LinkedIn Help | About 2024 | https://www.linkedin.com/help/linkedin/answer/a1341387 | Primary | LI2 | High |
| 15 | Are more lead gen providers disappearing from LinkedIn? | MarTech | 8 May 2025 | https://martech.org/a-pair-of-lead-gen-providers-have-disappeared-from-linkedin/ | Secondary | 4.1 note | Medium, LinkedIn never confirmed the reason |
| 16 | The Short Life of Online Sales Leads | Harvard Business Review | Mar 2011 | https://hbr.org/2011/03/the-short-life-of-online-sales-leads | Primary | 1.1a to 1.1d | High for what it measured, old and mostly B2C |
| 17 | B2B Lead Response Times, 114 companies | Workato | Page 19 Mar 2026 | https://www.workato.com/the-connector/lead-response-time-study/ | Primary (vendor test) | 1.1e | Medium low, small sample, vendor |
| 18 | Gartner Sales Survey Finds 61% of B2B Buyers Prefer a Rep Free Buying Experience | Gartner | 25 Jun 2025 | https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-sales-survey-finds-61-percent-of-b2b-buyers-prefer-a-rep-free-buying-experience | Primary (press release) | 1.2a, 1.2b | Medium high, survey detail in paid report |
| 19 | Gartner releases of 9 Mar 2026 and 20 May 2026 | Gartner, via search results | 2026 | https://www.gartner.com/en/newsroom/press-releases/2026-05-20-gartner-survey-finds-sixty-nine-percent-of-b-two-b-buyers-turn-to-sales-reps-to-validate-ai-generated-insights | Secondary (not readable) | 1.2c, 1.2d | Medium, snippet only |
| 20 | 2025 Buyer Experience Report press release | 6sense | 12 Nov 2025 | https://6sense.com/newsroom/the-timeline-for-influencing-b2b-buyers-is-shrinking-insights-from-6senses-2025-buyer-experience-report/ | Primary (vendor research) | 1.2e | Medium, vendor, tech heavy sample |
| 21 | The State Of Business Buying, 2026 | Forrester | 21 Jan 2026 | https://www.forrester.com/press-newsroom/forrester-2026-the-state-of-business-buying/ | Primary (press release) | 1.2g | Medium high |
| 22 | 2025 State of Marketing to Engineers | TREW Marketing and GlobalSpec | 4 Mar 2025 | https://www.trewmarketing.com/blog/2025-state-of-marketing-to-engineers-research | Primary summary | 1.2h | Medium, 60% versus 62% discrepancy, sample not stated |
| 23 | 95% of B2B buyers are not in the market for your products | Ehrenberg Bass Institute | About 2021 | https://marketingscience.info/news-and-insights/ehrenberg-bass-95-of-b2b-buyers-are-not-in-the-market-for-your-products | Primary (author's institute) | 1.2i | Medium high as a model, not a measurement for this category |
| 24 | Which form fields cause the biggest UX problems? | Zuko | Undated | https://www.zuko.io/blog/which-form-fields-cause-the-biggest-ux-problems | Primary (vendor data) | 1.3a | Medium low, mixed B2C |
| 25 | Galileo assessment and intake form | Skyven Technologies | 2026 | https://skyven.co/galileo/ | Primary (competitor page) | 1.3c, 1.4 | High for what the form asks |
| 26 | Industrial Heat Pump Market Study | Bonneville Power Administration, prepared by Cascade Energy | Mar 2024 | https://www.bpa.gov/-/media/Aep/energy-efficiency/emerging-technologies/202403-industrial-heat-pump-market-study.pdf | Primary | 1.4 scoping steps, biomass finding | High, US sites |
| 27 | Net zero industry by 2050, boiler replacement with industrial heat pumps | ACEEE | Dec 2024 | https://www.aceee.org/sites/default/files/pdfs/net-zero_industry_by_2050_-_a_scenario_analysis_of_boiler_replacement_with_industrial_heat_pumps.pdf | Primary (NGO analysis) | 2.1a | Medium high, US, scenario assumptions |
| 28 | Best practices for industrial steam boiler maintenance | Miura America | Undated | https://miuraboiler.com/best-practices-for-industrial-steam-boiler-maintenance/ | Company claim | 2.1b | Low to medium |
| 29 | Process heat in industry, understanding investment decisions of companies | PwC for DENEFF | Oct 2025, published Feb 2026 | https://deneff.org/wp-content/uploads/2026/02/20260203_DENEFF_Study-Process-heat-in-industry_Understanding-investment-decisions-of-companies.pdf | Primary | 2.2a to 2.2c, 2.4b | High, German focus |
| 30 | Review of Business Models for Industrial Heat Pumps | Arpagaus et al., ECOS 2023 | Jun 2023 | https://www.proceedings.com/content/069/069564-0068open.pdf | Primary (peer reviewed conference) | 2.4a | Medium high |
| 31 | Food production facility services during shutdowns | Hydro Cleansing | Undated | https://hydro-cleansing.com/blog/food-production-facility-services-conducted-during-shutdowns | Company claim | 2.3a | Low |
| 32 | Framer Help, contact forms, webhooks, HubSpot forms, Clay, integrations | Framer | 15 to 25 Sep 2026 | https://www.framer.com/help/articles/framer-form-webhook-setup/ | Primary | 3.1a to 3.1d | High |
| 33 | HotGreen contact page HTML | HotGreen Ltd | Published 13 Aug 2026 | https://www.hotgreensolutions.com/contact | Primary | 3.1e | High |
| 34 | Sales Hub pricing, Starter page, data centers, EU U.S. DPF | HubSpot | Current | https://www.hubspot.com/pricing/sales | Primary (vendor) | 3.2 | High for prices shown, promo is time limited |
| 35 | Pricing, and workflows block library | Attio | Current | https://attio.com/pricing | Primary (vendor) | 3.2 | High for prices, residency unknown |
| 36 | Plans, and How secure is my data | Pipedrive support | 3 Sep 2026 | https://support.pipedrive.com/en/article/how-secure-is-my-data-in-pipedrive | Primary (vendor) | 3.2 hosting, plan features | High |
| 37 | Pipedrive pricing in 2026 | SaaS Switcher | 14 Sep 2026 | https://www.saasswitcher.com/blog/pipedrive-pricing | Secondary | 3.2 Pipedrive prices | Medium |
| 38 | Pricing | folk | Current | https://www.folk.app/pricing | Primary (vendor) | 3.2 | High |
| 39 | CRM pricing, and Where are your data centers hosted | Zoho | Current | https://www.zoho.com/en-us/crm/zohocrm-pricing.html | Primary (vendor) | 3.2 | Medium high, US page only |
| 40 | Zoho confirms launch plans for UK data centre | Data Centre Review | 9 Apr 2026 | https://datacentrereview.com/2026/04/zoho-confirms-launch-plans-for-uk-data-centre/ | Secondary | 3.2 Zoho UK | Medium |
| 41 | Pricing | lemlist | Current | https://www.lemlist.com/pricing | Primary (vendor) | 4.1, 5.2b | High |
| 42 | Pricing, and Verkada customer story | Clay | Current | https://www.clay.com/pricing | Primary (vendor) | 4.1, 5.2a, 5.2b | High for prices, story is marketing |
| 43 | Pricing | Apollo.io | Current | https://www.apollo.io/pricing | Primary (vendor) | 4.1 | High |
| 44 | Email sender guidelines | Google | Effective 1 Feb 2024 | https://support.google.com/a/answer/81126 | Primary | 4.2a | High |
| 45 | Outlook requirements for high volume senders | Microsoft, via search summary | Apr 2025 | https://techcommunity.microsoft.com/blog/microsoftdefenderforoffice365blog/strengthening-email-ecosystem-outlook%e2%80%99s-new-requirements-for-high%e2%80%90volume-senders/4399730 | Secondary | 4.2b | Medium |
| 46 | UK ETS public reports, compliance report and operator allocations | UK Emissions Trading Registry | 22 Jun 2026 and 25 Sep 2026 | https://reports.view-emissions-trading-registry.service.gov.uk/ets-reports.html | Primary (government data) | 5.1 | High, NACE coding imperfect |
| 47 | Target Dashboard | Science Based Targets initiative | Weekly | https://sciencebasedtargets.org/target-dashboard | Primary | 5.1 | High |
| 48 | Planning application dataset | MHCLG, planning.data.gov.uk | Collector last ran 17 Sep 2025 | https://www.planning.data.gov.uk/dataset/planning-application | Primary | 5.1 | High (for the fact it is incomplete) |
| 49 | CRMArena Pro | Huang et al., Salesforce AI Research, arXiv | 24 May 2025 | https://arxiv.org/abs/2505.18878 | Primary (preprint) | Section 6 | Medium high, models now a year old |
| 50 | Latombe v Commission coverage | IAPP, WilmerHale, via search summaries | Sep to Dec 2025 | https://iapp.org/news/a/european-general-court-dismisses-latombe-challenge-upholds-eu-us-data-privacy-framework | Secondary | 3.2 transfer risk | Medium |

**Count.** 50 numbered sources, of which 40 are primary (the law, regulators, vendors' own pages and data, original research) and 10 secondary or company claims. Several rows bundle more than one page from the same publisher. The ones doing the most work are rows 1 to 3, 6, 8, 12, 13, 16, 18, 29, 32, 34 and 46.

---

## 9. Could not verify

- **Pipedrive prices on Pipedrive's own page.** pipedrive.com returned a Cloudflare block to both fetchers. Prices are from a dated secondary source that says it matches the official page.
- **Gartner's March 2026 (67%) and May 2026 (69%) releases.** Cloudflare challenge on gartner.com, BusinessWire and Demand Gen Report. Figures are from search summaries.
- **Microsoft's Outlook sender requirements page.** Did not load. Figures are from a search summary.
- **Attio data hosting region.** Not published on any Attio page I could read.
- **Whether Zoho's UK data centre is live.** Announced for Q2 2026, not live on 9 Apr 2026, not listed on Zoho's help page today.
- **A measured sales cycle length for industrial heat pumps.** No primary source found. The 6sense 10 months is all B2B.
- **How often UK food plants shut down, and how far ahead.** Only a contractor's blog claim (1 to 4 a year).
- **CIBSE Guide M boiler life figures.** Paywalled.
- **The consolidated ePrivacy Directive on EUR Lex.** Blocked. The 2002 text was used. The Official Journal date of the ePrivacy Regulation withdrawal (6 Oct 2025) is from a search summary only.
- **Whether a LinkedIn message is "electronic mail" under PECR, or "elektronische Post" under UWG.** No regulator page settles it. IHK's broad reading includes Facebook and WhatsApp messages.
- **UK TPS and CTPS rules for B2B calls, and Dutch and French phone rules.** Not researched in this pass.
- **An industrial equipment vendor documenting its own signal based outbound.** None found. The Verkada story is the nearest and is thin.
- **Form length effects for high value B2B.** Only vendor and aggregator data. Aggregator figures attributed to Forrester and HubSpot could not be traced.
- **Whether HotGreen's current form submissions arrive intact.** Not tested, because nothing was submitted. Sanya can check a recent submission.
- **TREW and GlobalSpec sample size and geography, and the original fieldwork date of the Workato test.**
- **Clay, lemlist and Apollo data residency.** Not checked.
- **HubSpot free CRM contact and form limits.** Not shown on the pricing page I read.
- **Web search budget.** The shared session's web search limit was reached near the end, so the last checks used direct fetches only.
