# Manufacturing and engineering as a target segment for QuasiScience (as of 28 October 2026, UK and Europe)

Labelling used throughout: **[SF]** sourced fact (URL given), **[VC]** vendor claim (a seller's own number, treat as marketing), **[INF]** my inference, **[UNV]** could not verify. Research used about 30 search and fetch calls. WebSearch returned summaries rather than full pages in most cases, so items marked [SF] from search results rest on the search summary plus the linked page title, and each is flagged where I only saw the summary. Several things the brief asked for could not be found. These are listed under Gaps in each section and are not filled in with guesses.

Read this first: QuasiScience's proof points could not be confirmed on its own website. See the first Gap under Key Question 1.

## 1. Which company types and size bands buy this, which titles own the budget, and what do they care about and fear

### Takeaway
The best-evidenced buyers are UK and EU firms that must prove a physical product is safe or durable and that currently do it with expensive physical tests: component makers (civil, aerospace, automotive tier suppliers), machinery and industrial equipment makers (hit by the EU Machinery Regulation from 20 January 2027), defence suppliers (budget growing, SME share small) and battery and advanced-materials firms. Titles and fears below are mostly inference. I found no sourced persona survey of Head of R&D or Head of Testing buyers, so the persona cards should be treated as hypotheses to test, not facts.

### Cited Findings
- QuasiScience's own homepage lists these services: Simulation and Optimisation, Machine Learning and AI, Automation, Data Science, Cybersecurity, Tech Strategy. It shows five case studies (F1 materials performance testing, retail recommendation engines, a drone "for Ukraine's front line", art book digitisation, intelligent information management with "90% time savings"). FIPMEC and Kioko appear only as logos. Numbers on the page include "+35% cycle time reduction", "+30% mean efficiency gain", "293 simulations monthly". [VC] [QuasiScience homepage](https://quasiscience.com)
- The homepage does not state target industries explicitly. Testimonials mention global manufacturing, retail and energy infrastructure. [SF] [QuasiScience homepage](https://quasiscience.com)
- Cranfield, Fogsphere, a unified materials data platform, the FIPMEC damper twin and the EUR 100,000 per test figure were NOT found on the homepage I fetched. [UNV] [QuasiScience homepage](https://quasiscience.com). Sales must get the underlying case study pages or a signed-off one pager before quoting any of these externally.
- A Cranfield study of digital twins in manufacturing (survey of 99 responses plus 14 expert interviews, mostly UK organisations, with a defence bias per the preprint) found the main obstacles were lack of expertise, funding and interoperability, and reported that completed digital twin projects reach breakeven in under two years on average. [SF, via search summary only] [Cranfield repository](https://dspace.lib.cranfield.ac.uk/handle/1826/19940), [MDPI paper](https://www.mdpi.com/2504-2289/7/3/126/html)
- A June 2023 survey of UK SME manufacturers (Leeds University Business School toolkit) lists disruption from long training times as the top digital adoption challenge; top motivations were responsiveness, quality and accuracy, efficiency, flexibility and transparency. [SF, partial extract] [Leeds toolkit](https://business.leeds.ac.uk/download/downloads/id/492/toolkit-user-guide---industrial-digital-technology-adoption-toolkit-for-uk-manufacturers.pdf)
- McKinsey states 70% of C-suite technology executives at large enterprises are exploring or investing in digital twins. [SF, large enterprise only, seen through search summary] [McKinsey](https://www.mckinsey.com/capabilities/operations/our-insights/digital-twins-from-one-twin-to-the-enterprise-metaverse)
- Altair (a simulation vendor, now part of Siemens) survey of 2,007 executives: 69% leveraging digital twins, 67% expect physical prototyping to end in 3 to 6 years. [VC, vendor survey, sample is business and IT executives, not only manufacturers] [Altair investor PDF](https://investor.altair.com/node/12361/pdf)
- UK defence: Defence Industrial Strategy published 8 September 2025 with GBP 250m of Defence Growth Deals over five years. Reported goal of GBP 2.5bn more MoD spend with SMEs by 2028. Babcock notes SMEs receive about 4% of defence expenditure. [SF] [DSEI Gateway](https://www.dsei.co.uk/news/uk-unveils-new-defence-industrial-strategy-backed-gp250m), [Babcock PDF](https://www.babcockinternational.com/wp-content/uploads/2026/01/Unlocking-SME-Potential-In-Defence.pdf)
- Battery and advanced manufacturing: UKRI funded a feasibility study for a digital twin of the UK Battery Industrialisation Centre (UKBIC) for quality and yield improvement, within GBP 27.6m of Faraday Battery Challenge awards. [SF] [Current News](https://current-news.co.uk/ukri-invests-a-further-27-6-million-towards-battery-innovation-projects)

### Inferences
- [INF] Best-fit size band: roughly 50 to 1,000 employees. Large enough to have a test programme and a simulation or R&D function, too small to have an in-house HPC team or a seven figure Ansys or Siemens estate. This band is my reasoning from the licence and skills evidence below, not a sourced segmentation.
- [INF] Priority segments, ranked by how many independent timing signals point at them: (1) machinery and industrial equipment makers selling into the EU, (2) defence supply chain SMEs, (3) battery and advanced materials, (4) aerospace and automotive tier suppliers, (5) civil and infrastructure component makers (the FIPMEC pattern), (6) motorsport. Motorsport has no sourced timing event in this research. It is a credibility segment rather than a volume segment.
- [INF] Budget owners and likely roles (hypotheses): Head of R&D or Engineering Director (owns prototyping spend and the case for fewer tests), Head of Testing or Test Manager (owns lab cost and certification schedule, probably the economic champion), CTO or Head of Digital (owns data platform and integrations, probably blocks or approves), Operations Director (production and supply chain simulation, downtime), Head of Health and Safety or EHS (computer vision safety), Finance Director (signs above a threshold I could not source).
- [INF] What each cares about and fears: R&D leads fear a late test failure that resets a certification programme. Testing heads fear losing the physical evidence a notified body or customer insists on, so lead with "fewer tests, same evidence" and not "replace testing". CTOs fear another data silo and integration debt. Operations directors fear unplanned stoppages. Everyone fears a vendor that disappears after the pilot (relevant because QuasiScience is a small firm). None of this is from a persona survey.

### Gaps
- No sourced list of company counts per segment and size band (for example ONS or Make UK counts of UK advanced manufacturers with 50 to 1,000 staff). Would need ONS Business Population Estimates or Companies House SIC code extracts.
- No sourced persona research (surveys of R&D or testing heads on budget authority, procurement thresholds, buying committee size). Gartner and Forrester material is paywalled and I did not find a public summary.
- QuasiScience case studies (FIPMEC EUR 100,000 per test per damper, Cranfield one third cost, Fogsphere, Kioko, materials data platform) not located on quasiscience.com. Could be on subpages, PDFs or LinkedIn that my single homepage fetch did not reach.
- Motorsport and civil component maker segments: no sourced market data found.

## 2. The main pains and their sourced costs

### Takeaway
The best sourced numbers are about unplanned downtime (Fluke and Censuswide 2025), engineer shortage (Stonehaven, Manpower, Royal Academy of Engineering) and certification cost for aircraft ("tens of millions of dollars" to first flight). I could NOT source clean numbers for the cost per destructive test, prototype iteration cost, test failure rates or lab notebook data silo cost, so those must come from QuasiScience's own case studies (vendor claims) or be left out of outbound copy.

### Cited Findings
- Unplanned downtime, Fluke and Censuswide 2025 survey of 600 senior manufacturing leaders in UK, Germany and US: 68% of UK respondents reported unplanned downtime in the past year (Germany 60%, US 55%, global 61%). 17% of UK cases lasted up to 72 hours. Reported weekly cost to UK manufacturers up to GBP 982m. [SF, vendor commissioned survey so also [VC]] [The Manufacturer, 30 Oct 2025](https://www.themanufacturer.com/articles/different-patterns-same-fragility-downtime-in-the-uk-germany-and-the-us/)
- CONFLICT: other coverage of the same research gives up to GBP 736m per week for the UK. Do not quote a UK weekly figure without picking one and citing it. [SF, conflicting] [Logistics IT](https://www.logisticsit.com/articles/2025/11/03/unplanned-downtime-costs-uk-manufacturers-up-to-£736m-every-week,-exposing-critical-resilience-vulnerabilities) versus the Manufacturer link above.
- A blog attributes GBP 1.36m per hour average downtime cost for larger UK manufacturers to the same survey. I could not verify this against the original report. [UNV] [ITEMIT blog](https://itemit.com/blog/downtime-in-manufacturing/)
- Engineer shortage: Stonehaven research projects a shortfall of about 1 million engineers in the UK by 2030, with a fifth of the workforce retiring in five years and about 59,000 roles a year hard to fill. [SF, consultancy research, seen through trade summary] [Society of Engineers](https://soe.org.uk/resources/uk-faces-shortfall-of-1-million-engineers-by-2030/)
- Manpower Q2 2025: 77% of engineering employers report difficulty finding candidates with needed skills. [SF] [ManpowerGroup UK](https://www.manpowergroup.co.uk/uk-engineering-employment-outlook-q2-2025/)
- The Royal Academy of Engineering's Engineers 2030 final report (November 2025) states there is a chronic and growing shortfall in UK engineering skills capacity. [SF] [Engineering Council](https://www.engc.org.uk/news-and-insights/news/engineers-2030-publishes-final-report-calling-for-urgent-action-to-address-uk-skills-crisis/)
- Certification cost: certification for a new aircraft can cost an airframer "10s of millions of dollars" to reach first flight, and FAA mandated physical testing has the largest effect on spend. No percentage given. Post dated 3 April 2018. [SF, vendor blog, Siemens, old] [Siemens Simcenter blog](https://blogs.sw.siemens.com/simcenter/driving-down-the-cost-of-airplane-programs-requires-certification-by-analysis/)
- Prototype reduction: Incisiv survey of consumer products and industrial machinery executives reported digital twins cut physical prototypes and product development time by 30 to 35%. [VC, Siemens sponsored primer, small sample] [Incisiv primer](https://www.incisiv.com/hubfs/ebook/Siemens/CPR/CPR%20-%20The%20Definitive%20Digital%20Twin%20Primer%20-%20Delivering%20on%20the%20Next%20Generation%20of%20Product%20Lifecycle%20Management.pdf)
- McKinsey: digital twins can reduce time to deploy new AI capabilities by up to 60% and capex and opex by up to 15%. [SF but enterprise wide, not about prototyping, seen via summary] [McKinsey](https://www.mckinsey.com/capabilities/operations/our-insights/digital-twins-from-one-twin-to-the-enterprise-metaverse)
- Cloud HPC saving, an independent comparable: Pipistrel estimated cloud HPC simulation at 10 times cheaper than in-house, saving about EUR 30k a year against EUR 300,000 for occasional aircraft airflow simulation. [VC, project case study, Cineca] [Cineca](https://www.hpc.cineca.it/poc/hpc-cloud-based-simulation-of-light-aircraft-aerodynamics/). A Fortissimo case cites about EUR 2,500 a year for 8 cloud cores. [VC] [EFFRA](https://portal.effra.eu/result/show/381). These make QuasiScience's "one third of traditional HPC cost" claim look conservative, but its own claim is unsourced here.
- Licence cost: no current official Ansys price list exists. Third party estimates are $20k to $65k for 4-core CFD bundles and about $5k per 1-core HPC add-on; older perpetual list prices around $22,000 Mechanical and $20,000 Fluent. [UNV, forum and third party, may be outdated] [The Pricer](https://www.thepricer.org/ansys-cost/)
- SimScale (cloud simulation) publishes tiers: Community free (2,000 core hours, 10 simulations, 16 cores), Mechanical and Professional by request, Enterprise custom, no per core hour rate listed. [SF] [SimScale pricing](https://www.simscale.com/pricing/)

### Inferences
- [INF] Safest outbound pain framing is the one backed by independent numbers: engineer shortage plus downtime. For test cost, ask the prospect their own cost per test and let them size it, then use the FIPMEC EUR 100,000 figure only as a labelled vendor claim.
- [INF] The Fluke GBP 982m versus GBP 736m conflict suggests quoting only "about two thirds of UK manufacturers had unplanned downtime in the past year" (68%).
- [INF] Computer vision safety and supply chain simulation pains have no sourced cost in this research. Use RIDDOR or HSE injury statistics and plant level downtime data in a follow up.

### Gaps
- No sourced cost per destructive test, per prototype iteration, or per certification campaign for civil components, automotive tier suppliers, or machinery. Searches returned only the aircraft "tens of millions" line.
- No sourced test failure rate or rework rate.
- No sourced cost of data silos in lab notebooks or materials testing data (would need a materials informatics source such as Granta or Citrine; not searched).
- No sourced UK HSE accident cost figures for the safety monitoring offer.
- Make UK Manufacturing Outlook 2026 figures not found.
- Current HPC and licence price: no official source.

## 3. Regulatory and market events that create timing in 2026 to 2028

### Takeaway
The cleanest dated trigger is the EU Machinery Regulation applying from 20 January 2027 with no transition period, which pulls AI, cybersecurity and technical file work forward for every machine maker selling into the EU or Northern Ireland. Defence spending, EU steel protection from 1 July 2026 and the Digital Product Passport roll-out add softer, industry-specific timing.

### Cited Findings
- Regulation (EU) 2023/1230 on machinery applies from 20 January 2027. Notified body provisions applied from 20 January 2024. Adopted 14 June 2023. [SF] [EU-OSHA](https://osha.europa.eu/en/legislation/directive/regulation-20231230eu-machinery). Directive 2006/42/EC stays applicable until it is replaced; one source says it applies until 19 January 2027. [SF, secondary] [Gowling WLG, Feb 2026](https://gowlingwlg.com/en/insights-resources/articles/2026/uk-machinery-legislation-what-the-governments-response-means-for-advanced-manufacturing). I could not load the EUR-Lex text itself, so the Article 54 wording is unverified against the Official Journal. [UNV]
- Content that matters for simulation and ML sales: machinery with self-evolving behaviour using machine learning for safety functions needs notified body assessment; connected machinery must resist cyber attack; security updates must cover the expected lifetime; technical documentation kept 10 years; digital instructions allowed. "No transition period". [SF, law firm summary] [Gowling WLG](https://gowlingwlg.com/en/insights-resources/articles/2026/uk-machinery-legislation-what-the-governments-response-means-for-advanced-manufacturing); also [Intertek on self-evolving behaviour](https://assuranceinaction.intertek.com/post/102l71g/self-evolving-behaviour-in-machinery-what-it-really-means-for-ai-compliance). "Self-evolving behaviour" has no official technical definition yet. [SF, same source]
- UK government response on machinery published 25 February 2026: implement EU Regulation 2023/1230 in Northern Ireland by October 2026; Great Britain continues to accept CE marked machinery meeting the EU regulation; plans to update the Supply of Machinery (Safety) Regulations 2008 with GB tailored measures. [SF] [Gowling WLG](https://gowlingwlg.com/en/insights-resources/articles/2026/uk-machinery-legislation-what-the-governments-response-means-for-advanced-manufacturing)
- CE and UKCA: GB still recognises CE marking, alongside or instead of UKCA, under the Product Safety and Metrology (Amendment) Regulations 2024. A UKCA mark may be on a label or accompanying document, rather than the product, until 11pm on 31 December 2027. Guidance first published 31 March 2026. Sector exceptions include construction products and medical devices. [SF] [GOV.UK UKCA guidance](https://www.gov.uk/guidance/using-the-ukca-marking). Note: I saw an older report that CE recognition for construction products would end 30 June 2025 but did not confirm what happened. [UNV] [Fieldfisher](https://www.fieldfisher.com/en/insights/uk-government-extends-the-recognition-of-the-ce-mark-in-great-britain-indefinitely)
- Digital Product Passport: first mandatory passport is for batteries on 18 February 2027 (EV, light transport and industrial batteries above 2 kWh) under Regulation (EU) 2023/1542. [SF via search summary of several secondary sites; not checked against the Official Journal] [Circular Economy Europe DPP timeline](https://circulareconomy.europa.eu/node/10371). ESPR 2025 to 2030 working plan lists iron and steel (2026) and aluminium (2027) among priority groups, with textiles, furniture, mattresses and tyres. Commission opened stakeholder consultation on the iron and steel delegated act on 6 July 2026, to 12 August 2026. [SF, secondary] [CDX summary](https://public.cdxsystem.com/web/cdx/w/espr-delegated-act-on-iron-and-steel-commission-opens-stakeholder-consultation), [One Click LCA](https://oneclicklca.com/en/resources/articles/first-espr-working-plan). Dates for delegated act adoption and application are indicative and sources disagree. [UNV for firm dates]
- Defence spend: 2025 Spending Review set defence at 2.6% of GDP by April 2027 including intelligence; NATO Hague summit 2025 commitment to 3.5% of GDP core defence by 2035; OBR estimate of about GBP 40bn extra a year. The Strategic Defence Review proposed GBP 6bn for munitions manufacturing and at least six new energetics and munitions factories. Roughly 60,000 jobs by 2029 to 2030 targeted. Affordability is questioned. [SF, secondary summaries] [Pinsent Masons](https://www.pinsentmasons.com/out-law/news/strategic-defence-spark-uk-manufacturing-drive), [Institute for Government](https://www.instituteforgovernment.org.uk/explainer/uk-defence-spending), [IBISWorld](https://www.ibisworld.com/blog/uk-defence-spending-economic-growth-budget/44/1126/)
- Defence Industrial Strategy 2025 (8 September 2025): GBP 250m Defence Growth Deals, SME action plan, Defence Office for Small Business Growth, streamlined commercial pathway. [SF] [DSEI Gateway](https://www.dsei.co.uk/news/uk-unveils-new-defence-industrial-strategy-backed-gp250m), [Twobirds summary](https://cm.twobirds.com/en/insights/2025/uk/making-defence-an-engine-for-growth-the-uk-governments-defence-industrial-strategy-2025--key-takeawa). No digital twin or simulation provision found. [UNV]
- EU steel: Regulation (EU) 2026/1384 replaced the safeguard on 1 July 2026. Duty free quotas cut about 47% to roughly 18.3 million tonnes a year, 50% out of quota duty (up from 25%), "melt and pour" origin evidence required from 1 October 2026. [SF, trade press] [Eurometal](https://eurometal.net/eu-proposes-post-2026-steel-trade-regime-50-tariffs/), [SMM](https://news.metal.com/newscontent/104018661-eus-permanent-steel-safeguard-takes-hold-50-out-of-quota-duty-quotas-cut-47)
- US tariffs: as of a UK Parliament briefing dated 5 May 2026 (via search summary) UK steel and aluminium faced 25% US tariffs, not 50%, and the 10% baseline remains for most UK goods. Derivative product list expanded by 407 classifications. [SF, secondary; US position may have changed since May 2026] [Full Fact](https://fullfact.org/news/tariffs-trump-explainer/), [City AM](https://www.cityam.com/?p=2336793). I did not verify any October 2026 change. [UNV]
- Events: MACH 2026 ran 20 to 24 April 2026 at the NEC Birmingham. [SF, a listing] [Steel Technology](https://www.steel-technology.com/events/mach-2026). Dates for Hannover Messe 2027, Farnborough 2026 and DSEI 2027 not confirmed. [UNV]

### Inferences
- [INF] "Why now" for machinery makers: 20 January 2027 is under three months from 28 October 2026. Any product that is redesigned, newly launched or substantially modified after that date comes under the Regulation. (Gowling says no transition period; the ABB summary found in search says machines already on the market are not affected unless substantially modified.) The pitch is validating ML based safety functions and cybersecurity behaviour in simulation before notified body review. This is a link between the regulation and simulation I drew myself; no source says simulation is a required route.
- [INF] Battery makers and suppliers face 18 February 2027 for passports, so product data, materials data and traceability platforms are in scope. Link to the materials performance data platform offer.
- [INF] Steel using fabricators and component makers face higher input cost uncertainty from 1 July 2026, so optimising material use through simulation instead of over-engineering has a cost angle.
- [INF] Defence suppliers: sell on speed to qualification and low cost test iteration for SMEs entering the supply chain, not on the headline budget.

### Gaps
- Official Journal text of Regulation 2023/1230 Article 54 not retrieved (EUR-Lex fetch returned nothing); entry into force date (19 July 2023) rests on a search summary of a secondary site.
- Firm adoption dates for ESPR delegated acts: sources disagree; one cited Commission Decision (EU) 2026/1736 on DPP standards but I could not confirm it.
- No source confirming Digital Product Passport registry launch (a headline dated 14 July 2026 existed but no body).
- No current US tariff position as at October 2026; no UK steel measures covered.
- UK Industrial Strategy and Advanced Manufacturing Sector Plan items not searched.
- Product specific certification deadlines (for example aviation, rail, medical) not searched.

## 4. Which buying signals could be automated, and the data sources

### Takeaway
Signal sources that exist and are public: Innovate UK and UKRI grant data (file based, with Companies House numbers), the Innovation Funding Service competition pages, job boards, Companies House, Find a Tender, regulatory notices, and LinkedIn themes. I verified only a few exist in a usable form. I did not verify any API specifications, so each source below needs a feasibility check before building.

### Cited Findings
- UKRI publishes open data on Innovate UK funded projects back to 2004, and the spreadsheet includes company numbers that can be matched to Companies House. [SF, via a third party data platform] [The Data City](https://docs.thedatacity.com/our-data/third-party-data/innovate-uk-data), [Help Data City](https://help.thedatacity.com/knowledge/innovate-uk-data)
- Innovate UK Smart grants open competitions four times a year. Competition pages sit on the Innovation Funding Service. [SF] [NI Business Info](https://nibusinessinfo.co.uk/content/innovate-uk-funding-how-does-it-work), [Faraday Battery Challenge round 3 example](https://apply-for-innovation-funding.service.gov.uk/competition/241/overview)
- Past example of a relevant award: GBP 27.6m Faraday Battery Challenge round including a UKBIC digital twin feasibility study (2023). [SF] [Current News](https://current-news.co.uk/ukri-invests-a-further-27-6-million-towards-battery-innovation-projects). I did not find any 2026 digital twin specific competition. [UNV]
- Regulatory trigger lists: Official Journal of the EU, GOV.UK UKCA and machinery guidance pages (guidance has dated updates: published 31 March 2026, declaration of conformity template updated 21 August 2026). [SF] [GOV.UK](https://www.gov.uk/guidance/using-the-ukca-marking)

### Inferences
- [INF] Proposed signal list, ranked by my estimate of intent strength (none of these thresholds are tested):
  1. Innovate UK or other grant award to a manufacturer where the project title mentions simulation, digital twin, test, qualification, materials, battery or machinery. Source: UKRI/Innovate UK open data joined to Companies House by company number. Lag: awards publish after the fact.
  2. Job ads for CFD, FEA, simulation engineer, test engineer, materials engineer, data engineer or "digital twin" at a manufacturer with 50 to 1,000 staff. Sources: Indeed, LinkedIn Jobs, Reed, Totaljobs, Find a Job (GOV.UK), company career pages. A hire signals active budget; a repeat ad signals the skills gap pain. I did not verify scraping terms or APIs for any of these.
  3. New product launch, new plant or capacity announcement, certification or CE and UKCA announcements. Sources: trade press (The Engineer, Professional Engineering, Manufacturing Management, The Manufacturer), Make UK news, company press pages, Google News alerts.
  4. Funding rounds for hardware or deep tech scale ups (Fogsphere and Kioko are examples of this profile). Sources: Companies House filings (SH01 share allotments), Beauhurst or Crunchbase (paid), press.
  5. Defence supply chain entry: Find a Tender and Contracts Finder awards, Defence Growth Deal and Defence Office for Small Business Growth announcements. Sources: gov.uk procurement notices.
  6. Machinery makers with CE marked connected or AI products: product pages mentioning ML or connectivity, trade fair exhibitor lists (MACH, Hannover Messe).
  7. LinkedIn themes: posts by R&D and testing leaders on test backlogs, certification delays, HPC licence costs, digital twin pilots. lemlist has a `search_linkedin_post_engagers` tool in this environment which could pull engagers on relevant posts. I did not use it.
  8. Negative or timing signals: layoffs in engineering, administration filings, and new owners (Companies House) change the budget picture.
- [INF] Scoring approach: weight machinery regulation relevance (EU sales, ML or connected product) highest through January 2027, weight job ads next, grants next.

### Gaps
- I did not verify any API: Innovation Funding Service has no confirmed public API; Companies House streaming API, Find a Tender API, 360Giving, Gateway to Research were searched but returned nothing usable. Check the Companies House developer hub, Find a Tender service documentation and UKRI Gateway to Research developer pages directly.
- Job board terms of service and API access not checked.
- No evidence tested for conversion rates of any signal.

## 5. Alternatives buyers use today and their weaknesses for mid sized buyers

### Takeaway
The incumbent landscape consolidated in 2025: Synopsys completed its roughly USD 35bn Ansys acquisition on 17 July 2025 and Siemens completed its roughly USD 10bn Altair acquisition in March 2025. That creates account churn risk and licence uncertainty, which is a "why now" for mid sized firms. Weaknesses below are inference from pricing structure; I found no sourced customer satisfaction data.

### Cited Findings
- Synopsys and Ansys: announced 16 January 2024, completed 17 July 2025, about USD 35bn cash and stock; UK CMA cleared in Phase 1 subject to divestitures. [SF] [via search summary](https://www.privsource.com/acquisitions/deal/X0SZ6n)
- Siemens completed acquisition of Altair Engineering in March 2025 at about USD 10bn enterprise value, folding simulation, HPC and AI into Xcelerator. [SF] [NAFEMS](https://www.nafems.org/about-us/media/news/industrynews1003/siemens-completes-10-billion-acquisition-of-altair-engineering/), [audioXpress](https://audioxpress.com/news/siemens-completes-acquisition-of-altair-engineering)
- Ansys offers annual or perpetual concurrent licensing and a pay per use "Elastic" model including Ansys Cloud hardware. [SF] [Ansys blog](https://ansys.com/ja-jp/blog/breaking-down-barrier-to-innovation-with-ansys-elastic-licensing)
- SimScale is a cloud native alternative with a free tier and quote based paid plans. [SF] [SimScale pricing](https://www.simscale.com/pricing/)
- Dassault Systemes pitches "Certification by Analysis" for aerospace to reduce physical testing. [VC] [3DS](https://www.3ds.com/industries/aerospace-defense/certification-analysis)
- Cost reference points as in Key Question 2 (third party Ansys estimates, Pipistrel cloud HPC). [UNV for Ansys]

### Inferences
- [INF] Weaknesses for mid sized buyers: tool licences are priced per seat and per core, require trained specialists (the engineer shortage makes this worse), and are a toolbox rather than a delivered outcome. Cloud tools (SimScale) lower the infrastructure barrier but still need in house simulation skills. Consultancies are project priced and leave no reusable capability. In house builds depend on scarce staff.
- [INF] QuasiScience's differentiation to test: F1 engineering heritage, delivering the model and the data platform as an outcome, and integrating with the customer's existing CAD and testing tools (the Kioko pattern). None of this is sourced beyond QuasiScience's own claims.
- [INF] Do not criticise Ansys or Siemens by name in outreach. Position as complementary: "keep your solver, remove the test bench time".

### Gaps
- No sourced customer satisfaction, switching rate or price comparisons for Ansys, Siemens Simcenter, Dassault SIMULIA, SimScale, COMSOL.
- Dassault SIMULIA ownership or recent deals not covered.
- No UK specific list of simulation consultancies and their rates.
- No sourced evidence on in house versus outsourced shares.

## 6. Where these personas spend time and how they prefer to be approached

### Takeaway
I found almost no sourced evidence on channel preference for engineering buyers. What exists is trade event and press names, which are inference as to relevance. Treat this section as a research-to-do list.

### Cited Findings
- MACH 2026 took place 20 to 24 April 2026 at NEC Birmingham (the main UK machine tool and manufacturing technology show). [SF, listing] [Steel Technology](https://www.steel-technology.com/events/mach-2026)
- Trade titles that appeared in my results as covering manufacturing downtime, skills and digital twins: The Manufacturer, Manufacturing Management, Machinery.co.uk, The Engineer, Operations Engineer, Drives and Controls. [SF that they publish this content] e.g. [The Manufacturer](https://www.themanufacturer.com/articles/different-patterns-same-fragility-downtime-in-the-uk-germany-and-the-us/), [Machinery.co.uk](https://www.machinery.co.uk/articles/new-research-reveals-the-true-cost-of-manufacturing-downtime-in-2025), [The Engineer](https://www.theengineer.co.uk/government-announces-246m-battery-investment)
- Support bodies that engineers and SME manufacturers engage with: Made Smarter (SME survey of 200 Lancashire manufacturers found fragmented awareness of support and funding), Innovate UK KTN, Catapults. [SF, regional] [Made Smarter](https://www.madesmarter.uk/resources/news-made-smarter-market-research-reveals-need-for-manufacturers-to-digitalise-to-survive-recover-and-grow-1/)
- Defence community channels: DSEI, ADS Group, Defence Office for Small Business Growth. [SF that they exist] [ADS](https://www.adsgroup.org.uk/blog/des-2025-strategy/)

### Inferences
- [INF] Likely channels: LinkedIn (titles above), trade press, NAFEMS and engineering society events, Innovate UK consortium building, regional Catapult and Made Smarter networks, conference talks by F1 engineers. Not validated.
- [INF] Preferred approach for technical buyers is typically a specific, number led opener tied to one product programme plus a short technical proof (an example model, benchmark or case study), with no demo request in the first message. This is a general sales practice view, not sourced here. The existing Astra rules in the repository (specific research, no AI tone, nothing sent without Raka's approval) apply to any outreach built from this.
- [INF] Because the vendor case study numbers are unverified on the company website, lead with questions about the prospect's own test costs, and cite QuasiScience results only after sign off.

### Gaps
- No sourced channel preference data (survey of engineering decision makers) was found.
- LinkedIn group, newsletter and podcast usage by R&D and testing heads: not researched.
- Event dates for Hannover Messe 2027, Farnborough 2026 and DSEI 2027 not confirmed.
- Regional clusters (Midlands, Northwest, Silverstone/Motorsport Valley) not researched.

## Overall list of things to verify before outbound use
1. QuasiScience case study pages and numbers: FIPMEC EUR 100,000 per test per damper, Cranfield one third HPC cost, Fogsphere, Kioko, materials data platform. Not on the homepage fetched.
2. Text of Regulation 2023/1230 Article 54 from EUR-Lex.
3. Which Fluke downtime weekly figure to use (GBP 982m versus GBP 736m); hourly cost figure unverified.
4. Current US tariff position and ESPR delegated act timing.
5. Existence and terms of any API for each automated signal source.
