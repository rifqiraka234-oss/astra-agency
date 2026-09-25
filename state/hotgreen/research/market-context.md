# HotGreen Solutions: competitor websites, regulation context and calculator inputs

Prepared 25 September 2026 for the Astra Agency proposal to HotGreen Solutions (hotgreensolutions.com). Research only. Nobody was contacted.

**How to read the labels**

- **[Confirmed]** means law in force, a final government decision, or official published statistics.
- **[Proposal]** means a proposal, a consultation or a plan that isn't final yet.
- **[Company claim]** means a company says it about itself on its own site.
- **[Secondary]** means the source is a broker, law firm, trade press or aggregator rather than the primary body.
- **[Derived]** means arithmetic we did on the cited figures. It isn't a published number.
- **[Unverified]** means we couldn't confirm it from a primary source.

All web pages were accessed on 25 Sep 2026 unless a different date is given. Page text was read with curl or WebFetch. Forms and gated tools were rendered in headless Chromium to read their fields. No form was submitted.

---

## 0. Headline findings for the proposal

1. **CCEP has named HotGreen in its own annual report.** Coca-Cola Europacific Partners' *2025 Annual Report and Form 20-F* (p.229) says: "In 2025, we invested €1.7 million in three start-ups ... Hot Green – pioneering heat pump technology supporting decarbonising our energy inefficient boilers on our sites." ([SEC EDGAR, CCEP FY2025 20-F](https://www.sec.gov/Archives/edgar/data/1650107/000165010726000029/cce-20251231.htm)) [Confirmed, as a statement by CCEP]. This is the kind of third-party proof that established equipment providers put on their sites. HotGreen's site doesn't show it today.
2. **At official average prices, UK energy-only savings don't work.** DESNZ's latest non-domestic prices (Q1 2026) put the UK electricity-to-gas price ratio at about 4.8 to 5.5 across the large-user bands. At COP 2.8 against a boiler at 85.7% efficiency, a heat pump only saves money when the ratio is below about 3.3 [Derived, see Part 3]. EU industrial ratios for H2 2025 run from 1.9 to 3.3, with Ireland at 4.3 [Derived from Eurostat]. So an honest public calculator fed with UK averages will show a cost increase for many UK sites. The savings case then rests on the site's own contract prices, carbon cost where the site is in the UK ETS, internal carbon prices (CCEP uses €100/t), and current wholesale moves. HotGreen's site claims "Reduce your energy bill by 30%", "€250k /year saved" and "4x more energy efficient than a traditional boiler" ([hotgreensolutions.com/solutions](https://www.hotgreensolutions.com/solutions)) [Company claim]. "4x" implies a COP of about 3.4 against an 85.7% boiler, not 2.8 [Derived]. These numbers need reconciling before a live calculator goes public.
3. **HotGreen's UK and F&B competitors are getting bigger fast.**
   - Johnson Controls launched the Sabroe HitemHP (up to 122°C) on 15 Sep 2026.
   - Copeland agreed to acquire SPH in Oct 2025, with Spirax Group keeping a minority stake and selling SPH through its channels.
   - Heaten lists a 1.2 MWth unit for Dornoch Distillery (UK) for Q4 2026.
   - Futraheat has a steam heat pump running at Hepworth Brewery (UK).
   - AtmosZero took a strategic OEM investment from Mitsubishi Heavy Industries in Mar 2026.

   Sources are in Part 1.
4. **Most regulation doesn't bind a mid-size UK F&B site directly yet.**
   - The UK ETS only covers combustion above 20 MW rated thermal input.
   - UK and EU ETS linking was agreed in principle in May 2025 but isn't concluded. The summit meant to seal it was postponed after Keir Starmer resigned.
   - EU ETS2 will put a carbon price on gas for small EU industry from 2028.
   - The UK electricity levy relief scheme (BICS) excludes most food and drink (only sugar, starch, and oils and fats SIC codes qualify).
   - The IETF is closed to new applicants, and we found no successor capital grant.
   - The pressure that does bind comes from buyers: CCEP targets Net Zero across Scopes 1, 2 and 3 by 2040, a 47% cut in Scope 1 and 2 by 2030, and applies a €100/t internal shadow carbon price to Scope 1 and 2 capex.

---

## PART 1. Competitor and comparative websites

### 1.1 Who was reviewed

14 companies are profiled in full (7 per group), plus short notes on 7 more.

| # | Company | Group | Site reviewed | Why included |
|---|---|---|---|---|
| A1 | Spirax Sarco (Spirax Group) | Established | https://www.spiraxsarco.com | Steam system incumbent in F&B, sells "industrial heat pumps", minority owner of SPH |
| A2 | GEA | Established | https://www.gea.com/en/products/heat-pumps/ | F&B equipment major with heat pumps and a savings eCalculator |
| A3 | Johnson Controls, Sabroe | Established | https://www.sabroe.com/ and johnsoncontrols.com | Launched 122°C HitemHP on 15 Sep 2026 |
| A4 | Everllence (formerly MAN Energy Solutions) | Established | https://www.everllence.com | Mega heat pumps up to 300°C steam, isothermal compressors |
| A5 | Siemens Energy | Established | https://www.siemens-energy.com | Low carbon industrial heat offer |
| A6 | Star Refrigeration | Established (UK) | https://www.star-ref.co.uk | UK industrial heat pumps (Neatpump) |
| A7 | Clade Engineering Systems | Established (UK) | https://clade-es.com | UK heat pump maker, Groupe Atlantic backed |
| B1 | AtmosZero | Startup (US) | https://atmoszero.energy | Closest analogue: air-source steam heat pump "Boiler 2.0" |
| B2 | Skyven Technologies | Startup (US, NL, BE) | https://skyven.co | Steam heat pumps, Energy-as-a-Service, Galileo assessment tool |
| B3 | Heaten | Startup (NO, DE) | https://heaten.com | Large piston heat pumps, UK distillery reference |
| B4 | SPH Sustainable Process Heat | Startup, now Copeland | https://spheat.de/?lang=en | Steam heat pump startup acquired by an incumbent |
| B5 | Qpinch | Startup (BE) | https://qpinch.com | Economics page with live commodity prices, simulation form |
| B6 | Futraheat | Startup (UK) | https://futraheat.com | UK peer with a brewery steam install |
| B7 | Rondo Energy | Startup (US) | https://www.rondo.com | Thermal battery, the clearest "looks big" example, HEINEKEN customer |

**Notes on names in the brief.** "Olvondo" at olvondo.com is a parked page ("Parked"). The company trades at https://olvondotech.no/. We couldn't find an industrial heat pump company called "Futurebay". FutureBay Energy Storage (https://futurebay.uk.com/) is a storage company, so we used Futraheat, a UK steam heat pump startup, instead [Unverified that this was the intended company]. sph-energy.com, futurebay.eu and epcon.no returned 502 through our proxy. SPH's live domain is spheat.de and Epcon's is epcon.org.

### 1.2 Group A profiles: established equipment providers

#### A1. Spirax Sarco
- **Headline (verbatim).** "In a volatile energy market, efficiency is your constant". Page title "Spirax Sarco | First for Steam Solutions" ([home](https://www.spiraxsarco.com/)).
- **Mission or specs.** Leads on efficiency and reliability, followed by product spotlights (steam traps, smart positioners, PID controllers) and services. The sustainability page headline is "Your partner in thermal energy decarbonisation and steam optimisation", with a four-stage pathway (Diagnose, Optimise, Manage, Decarbonise). The Decarbonise stage lists "Industrial heat pumps", "SteamVolt - zero emission electric steam generation" and "SteamBattery" ([your-sustainability](https://www.spiraxsarco.com/your-sustainability)).
- **Proof.**
  - Named customer stories on the homepage, for example Nestlé, with water use down about 900 m³ a month and review time cut from 2 to 3 hours to 10 minutes ([customer-stories/nestle](https://www.spiraxsarco.com/customer-stories/nestle)).
  - Anonymised results with numbers on the sustainability page: "Food manufacturing: £600K annual saving via steam optimisation ... 4,767 GJ/month fuel reduction".
- **Calculator.** No savings or ROI calculator. There are about 20 free engineering calculators (valve sizing, steam pipe sizing, flash steam, steam flow to heat rating and others), a product sizing suite and steam tables ([resources-and-design-tools](https://www.spiraxsarco.com/resources-and-design-tools), [steam tables](https://www.spiraxsarco.com/resources-and-design-tools/steam-tables/saturated-water-line)).
- **Regulation content.** "Remove Scope 1 carbon emissions" appears as a benefit. We found no ETS, CBAM, SECR, CSRD or grant content on the pages reviewed.
- **Audience routing.**
  - A location and language selector.
  - An industry selector (Brewing and distilling, Food and beverage and others).
  - A Learning and resources hub and "Learn about steam".
  - Careers sends people to spiraxgroup.com. Investors sit on the group site ([spiraxgroup.com/en/investors](https://www.spiraxgroup.com/en/investors)).
- **Newsroom.** None linked from the spiraxsarco.com homepage. News lives at group level (we didn't verify the exact URL).
- **Heat pump link.** Copeland's SPH announcement says "Spirax Group will maintain minority ownership and market SPH solutions through its sales channels" ([Copeland, 23 Oct 2025](https://www.copeland.com/en-us/news/copeland-expands-industrial-heat-pump-portfolio-with-agreement-to-acquire-sustainable-process-heat)).

#### A2. GEA
- **Headline (verbatim).** Corporate: "Engineering for a better world" ([gea.com/en](https://www.gea.com/en/)). Heating and refrigeration hub: "Energy efficient solutions for industrial applications" ([heating-refrigeration](https://www.gea.com/en/heating-refrigeration/)). Heat pump page: "Heat pumps", with the intro "Heat to cool - Using GEA heat pumps to cool our warming planet" ([products/heat-pumps](https://www.gea.com/en/products/heat-pumps/)).
- **Mission or specs.** Mission-flavoured taglines, but backed by scale everywhere: the footer says "GEA is listed in the DAX and the STOXX® Europe 600 Index" and is in the DAX 50 ESG and MSCI Global Sustainability indices. A big company can afford mission language because the proof is already there.
- **Proof.** Named references on the heat pump page: Aurivo (Ireland, "cut CO2 emissions by 80%"), Mars Inc. (Netherlands), Wipasz (Poland), Bunhill 2 Energy Centre (London), Gateshead Mine Water Scheme (UK) and EON Malmö.
- **Calculator.** "Heat Pump eCalculator", "Fill out the form and calculate your savings now" ([campaigns/heat-pump/savings-calculator](https://www.gea.com/en/campaigns/heat-pump/savings-calculator/)). The rendered page asks for first name, last name, email address, company name, country and agreement to terms **before** any calculation. The savings inputs and outputs only appear after submission, which we didn't do, so they are [Unverified].
- **Regulation content.** None found on the heat pump page.
- **Audience routing.** Top nav: Products & Services, About us, Sustainability, **Investors** ([/en/investors/](https://www.gea.com/en/investors/)), **Media** ([/en/media/](https://www.gea.com/en/media/)), Careers, plus a customer login.
- **Newsroom.** Yes (Media).

#### A3. Johnson Controls, Sabroe
- **Headline (verbatim).** Sabroe: "Industrial refrigeration and heating, for more than 125 years" ([sabroe.com](https://www.sabroe.com/)). JCI industrial hub: "Industrial Refrigeration and Heating" ([johnsoncontrols.com/industrial-refrigeration](https://www.johnsoncontrols.com/industrial-refrigeration)).
- **Mission or specs.** Heritage and reliability first ("Reliability, sustainability, efficiency" is an H2 on the JCI hub).
- **Proof.**
  - Case studies on Sabroe (New Aalborg University Hospital, Vattenfall Berlin and others).
  - Fleet-level impact release: "In 2025, global customers saved an estimated 32% in annual heating costs while cutting greenhouse gas emissions by an estimated 55% (1.6 million metric tons), compared to a conventional gas boiler" ([press release, May 2026](https://www.johnsoncontrols.com/media-center/news/press-releases/2026/05/20/johnson-controls-heat-pumps-deliver-reduction-in-annual-heating-costs)). The release doesn't disclose the method.
  - New product: "Johnson Controls electrifies energy-intensive industries with new heat pumps that can triple energy efficiency and lower operating costs", **15 Sep 2026**. Sabroe HitemHP gives outputs up to 122°C, runs on butane and isobutane, and is made in Holme, Denmark. An unnamed case shows "reduce energy costs by more than 91%" against electric boilers ([PR Newswire](http://www.prnewswire.com/news-releases/johnson-controls-electrifies-energy-intensive-industries-with-new-heat-pumps-that-can-triple-energy-efficiency-and-lower-operating-costs-302878360.html)).
- **Calculator.** No public savings calculator found. Sabroe has "Sales Tools", described as guided product selection.
- **Regulation content.** The HitemHP release mentions refrigerants "aligning with upcoming EU regulations" and the "Clean Industrial Deal". We found no ETS, CBAM or Scope content on the site pages reviewed.
- **Audience routing.** Investors ([investors.johnsoncontrols.com](https://investors.johnsoncontrols.com/)), Media Center, Careers, Authorized Partners (channel partners), Customer Stories, and **Capital Funding Solutions** (financing).
- **Newsroom.** Yes ([media-center/news](https://www.johnsoncontrols.com/media-center/news)).

#### A4. Everllence (formerly MAN Energy Solutions)
- **Headline (verbatim).** "Everllence - Moving big things to zero". Title: "Everllence | Formerly MAN Energy Solutions" ([everllence.com](https://www.everllence.com/)).
- **Mission or specs.** A mission tagline, carried by heavy industrial proof. The process heat page opens on cost and emissions, then gives specs: 60 to 300°C supply, 10 to 100 MWth per heat pump unit, steam up to 300°C ([heat pumps for process industries](https://www.everllence.com/energy/solutions/heat-pumps/industrial-processes)).
- **Proof.**
  - A references campaign page with capacity and CO₂ per project, for example Aalborg at about 177 MWth and 210,000 t CO₂ a year, Cologne at about 150 MWth, and Boston steam at about 200°C, each with downloadable factsheets ([heat-pump-references](https://www.everllence.com/energy/campaigns/heat-pump-references)).
  - The Boston project, "largest steam heat pump in the world", 35 MW ([press release, 4 Nov 2025](https://www.everllence.com/company/press-releases/details/2025/11/04/everllence-to-deliver-mega-heat-pump-for-boston-s-district-energy-network)).
  - Isothermal compressors: "1,500+ isothermal compressors installed worldwide" ([isothermal](https://www.everllence.com/industries/products/compressors/isothermal)). Relevant because HotGreen's IsoStack is also sold on isothermal compression.
- **Calculator.** No heat pump savings calculator. It has niche engineering calculators (methane number, marine engine) and an upgrade advisor.
- **Regulation content.** The process heat page mentions "CO2 taxes" and "CO₂ certificate costs" in general terms.
- **Audience routing.** By market (Marine, Energy, Industries), plus Company, Career, Press & Media, Events and ExpertTalks, and a customer extranet ("Nexus").
- **Newsroom.** Yes, and very active: about 20 dated press releases between 22 Jun and 14 Sep 2026 ([press-releases](https://www.everllence.com/company/press-releases)). One reads "Volkswagen Group enters into exclusive arrangement with Bain Capital for sale of majority stake in Everllence" ([25 Jun 2026](https://www.everllence.com/company/press-releases/details/2026/06/25/volkswagen-group-enters-into-exclusive-arrangement-with-bain-capital-for-sale-of-majority-stake-in-everllence)).

#### A5. Siemens Energy
- **Headline (verbatim).** "Energy technology powering tomorrow's energy systems". Title: "Let's make tomorrow different today" ([home](https://www.siemens-energy.com/global/en/home.html)). Low carbon heat page: "Decarbonizing heat, particularly in industrial settings and district heating systems, is critical." ([low-carbon-heat](https://www.siemens-energy.com/global/en/home/products-services/solutions-usecase/low-carbon-heat.html)).
- **Mission or specs.** Mission-led at corporate level. The heat page lists solution categories (Turbo Heaters, MVR compressors, ORC) without product specs.
- **Proof.** None on the heat page (no named references and no figures). Corporate proof sits in investor publications.
- **Calculator.** None found.
- **Regulation content.** None on the heat page.
- **Audience routing.** Solutions by use case, Careers, Investor Relations ([IR](https://www.siemens-energy.com/global/en/home/investor-relations.html)), Press releases.
- **Newsroom.** Yes.
- **Relevance.** Low for F&B steam. Included as the example of a giant whose heat page is thin, which shows that scale alone doesn't make a page persuasive.

#### A6. Star Refrigeration (UK)
- **Headline (verbatim).** The H1 is just "Star Refrigeration". The strapline is "The UK's largest independent industrial refrigeration engineering company", and the brand line is "We are in business to secure a better future for our customers" ([star-ref.co.uk](https://www.star-ref.co.uk/)).
- **Mission or specs.** Specs, service and scale. Examples:
  - "Operating costs and reliability are key to our customers and represent 80%+ of a system's total life cycle cost."
  - "life expectancy of a minimum of 20 years"
  - "A team of 400+ office and engineering staff at 11 locations across the UK"
- **Proof.**
  - Neatpump heat pumps at 700 kW to 10,000 kW, water-source models up to 120°C ([industrial heat pumps](https://www.star-ref.co.uk/product-categories/heatpumps/)).
  - Drammen district heating (2011) and Queens Quay ("60% lower carbon footprint than burning gas").
  - A Tesco case (10% energy savings across eight sites).
  - Awards: Sustainable Supplier of the Year, Investors in People Platinum, Cold Chain Federation platinum member.
  - Certificates published as pages: ISO 9001, ISO 14001, ISO 45001, CHAS, PED and PER, plus a Modern Slavery Statement and Gender Pay Gap page.
- **Calculator.** None found.
- **Regulation content.** "Regulatory Compliance Advice" as a maintenance service (refrigerant rules). Nothing on ETS, CBAM or Scope reporting.
- **Audience routing.** "Tell us where you're coming from / Choose a sector", with 13 sectors including Brewing and Distilling, Dairy and Food Manufacturing. There is a large careers section (apprenticeships, ex-forces fast track), 11 branch pages, and CPD presentations and roadshows. No investor page (private company).
- **Newsroom.** Yes ([news](https://www.star-ref.co.uk/news/)), plus "Smart Thinking" insights.

#### A7. Clade Engineering Systems (UK)
- **Headline (verbatim).** "AIR SOURCE HEAT PUMPS MADE IN THE UK" ([clade-es.com](https://clade-es.com/)).
- **Mission or specs.** Specs and origin first. The industrial page lists named models with kW at stated ambient and flow temperatures (for example Maple CO2 SN/400: up to 400 kW at −5°C ambient, 70°C flow), each with a datasheet ([industrial heat pumps](https://clade-es.com/products/industrial-heat-pumps/)).
- **Proof.**
  - Case studies ([case-studies](https://clade-es.com/case-studies/)).
  - B Corp Certified.
  - "Groupe Atlantic makes major investment in Clade Engineering Systems", which puts Clade next to Ideal Commercial Heating, Hamworthy, ACV and Keston. The same page says "Founded in 1985 ... has deployed over 500 natural refrigerant appliances" ([groupe-atlantic-partnership](https://clade-es.com/groupe-atlantic-partnership/)).
  - Downloadable brochure, T&Cs of sale, and an employer's liability certificate.
- **Calculator.** None found.
- **Regulation and grant content.** Yes.
  - A Funding hub covering PSDS, SHDF, Heat-as-a-Service and "Plug Me In" ([funding](https://clade-es.com/funding/)).
  - A finance page: "spread the investment cost over 15 years" ([finance-funding-grants](https://clade-es.com/finance-funding-grants/)). That page also lists a "Clean Heat Grant", which we couldn't match to a current UK scheme [Unverified].
  - A PSDS explainer. All of this is public sector and commercial building funding, not industrial process heat.
- **Audience routing.** A Partnership Program for installers (Become a Partner, Partner Benefits, Workshop Calendar), "Contact your Senior Sales Engineer", CPD seminars, technical guides, ESG, Engineering Jobs and a blog.
- **Newsroom.** A blog and news signup. No press room.

### 1.3 Group B profiles: heat pump and electrified steam startups

#### B1. AtmosZero (US)
- **Headline (verbatim).** "Full steam ahead", then "Industrial steam heat pump boilers designed to future-proof the boiler room." and "At AtmosZero, thinking about steam is all we do." ([atmoszero.energy](https://atmoszero.energy/)).
- **Mission or specs.** A product-led, confident voice with one clear idea: "Boiler 2.0 ... Air-sourced, drop-in, electrified steam heat pump boiler replacement to eliminate Scope 1 emissions" ([technology](https://atmoszero.energy/technology/)). The published specs are thin: "150°C+", "COP 2", "70% turndown", "2X more efficient ... than today's electric boilers". The homepage stats are about the market (50% of process heat, 8% of global primary energy, 2.25 Gt), not about the product.
- **Proof.**
  - Partner logo bar with no alt text. The image filenames indicate ARPA-E, Energy Impact Partners, AENU, 2150, Constellation, The Engine and Colorado State University [Unverified beyond filenames].
  - Press logos (New York Times, Volts).
  - No named customer on the homepage. It links a Bloomberg feature on New Belgium Brewing.
  - The newsroom lists a $21M Series A (20 Feb 2024), a "Strategic OEM Investment from Mitsubishi Heavy Industries" (23 Mar 2026), a European operations launch (3 Oct 2023) and board appointments ([newsroom](https://atmoszero.energy/newsroom/)).
- **Calculator.** "See if Boiler 2.0 fits your steam system: CHECK BOILER COMPATIBILITY" goes to a **gated form**, "Free site-specific analysis. Run the numbers on your steam system." ([analysis](https://atmoszero.energy/analysis/)). The fields:
  - First and last name, company, email and phone.
  - "Average flow rate or heat load", with units kW(th), MBH, MMBTU, lb/hr or kg/hr.
  - "Current boiler output temp / pressure desired" (e.g. 60 psig).
  - "Minimum steam pressure used in the facility".
  - "Reason for investigating the technology", with options Corporate mandates, SBTI, Energy efficiency, **Emissions penalties**, Economic drivers, **Simplified compliance**, Other.
  - A free text box.

  There is no instant output. AtmosZero runs the numbers and replies.
- **Regulation content.** Only the reason options in that form and "eliminate Scope 1 emissions".
- **Audience routing.** Technology, Tech Specs, Markets (Food and Beverage, Pharma and Chemicals, District Heating), The Team, Resources, Newsroom, Careers and "Let's Talk". No investor page.
- **Newsroom.** Yes. Items run to 1 Sep 2026.

#### B2. Skyven Technologies (US, with NL and BE offices)
- **Headline (verbatim).** "Industrial Steam at Lower Cost than Traditional Boilers", then "Skyven delivers emissions-free industrial steam at prices lower than natural gas." ([skyven.co](https://skyven.co/)).
- **Mission or specs.** Economics first, with hard numbers right under the headline: "40% Lower cost of steam (typical)", "COP up to 8.0", "215 °C Max steam temperature", "20.7 barg Max steam pressure" [Company claims]. The mission sits on the About page: "Skyven is revolutionizing the technology and economics of industrial steam."
- **Proof.**
  - A named customer testimonial with name and title: "Darrin Monteiro, SVP of Sustainability, California Dairies, Inc."
  - A news item, "Skyven Arcturus Heat Pump Achieves COP of 8.0", from a European demo (Jul 2026).
  - The About page aggregates team track record into company-sized numbers: "40-person team", "$300M" EaaS capital facility, "35+ countries" EPC network, "$200M+" equipment delivered, "250+" sites assessed, plus offices in Texas, California, **Nijmegen (NL)** and **Antwerp (BE)**, investors listed (Voyager, Climatic, Volo Earth, Re-Wire, Kyotherm) and awards ([about-us](https://skyven.co/about-us/)).
  - Recognition logos: DOE Better Plants, Renewable Thermal Collaborative and others.
- **Calculator.** "Galileo Assessment". "Galileo provides a preliminary view of the coefficient of performance (COP) and annual cost savings ... Done in minutes, not months." ([galileo](https://skyven.co/galileo/)).
  - Outputs: "Net annual cost savings, Site-specific COP, Steam generation capacity, Emissions reductions."
  - Inputs come through "a one-hour call ... or asynchronously via email", covering "steam demand, on-site heat sources, and energy costs".
  - The intake form asks for baseload steam band (0 to 8, 8 to 13, 13 to 38, 38 to 75, over 75 t/h), steam pressure under 21 barg (Y/N), steam temperature under 215°C (Y/N), available waste heat band, country, and interest in a demo centre visit.
  - The page claims Galileo has been used "at over 130 sites, yielding over $1B in total fuel savings potential" [Company claim].
  - The tool is gated and staffed. It isn't a self-serve calculator.
- **Regulation content.** Yes, as articles. "The Clean Industrial Deal Intends To Transform European Manufacturing" (Apr 2025), IRA explainers, "Understanding the Implications of the New SEC Carbon Reporting Guidelines", and an SBTi explainer ([news](https://skyven.co/news/the-clean-industrial-deal-intends-to-transform-european-manufacturing/)).
- **Audience routing.** Technology, Approach (Our Process, Galileo, Deployment: "Energy-as-a-Service: No CapEx, zero payback period" or CapEx), About (Story, Team, Careers), Resources (Library, News, FAQ). No investor page.
- **Newsroom.** Yes ([news](https://skyven.co/news/)).

#### B3. Heaten (Norway, Germany)
- **Headline (verbatim).** "The biggest piston-based industrial high-temperature heat pump", sitting under the eyebrow "YOUR INDUSTRIAL PROCESS. FOSSIL FREE." ([heaten.com](https://heaten.com/)).
- **Mission or specs.** Scale and specs first: "90 up to 180°C steam and 200°C water", "1 to 50 MW th", high COP "at as low as 20% thermal load". The mission appears as a problem line: "High energy costs? Stringent CO₂ targets? We have the answer!"
- **Proof.**
  - A **References** page, "Real projects. Real performance. Real learnings.", with 10 projects. Each gives customer, place, application, MWth, temperature, install quarter and model. Examples: Beneo (BE, 1 MWth, Q4 2024), Südzucker Offenau and Rain (DE, 2025), INNIO Jenbacher (AT, 2026), and **Dornoch Distillery (UK, 1.2 MWth, up to 120°C, Q4 2026)** ([references](https://heaten.com/references)).
  - Homepage imagery tagged for Bayer, **Mars** and Südzucker.
  - Ownership: "AI Alpine ... controlled by Advent International, acquired Heaten" ([press release, 3 Oct 2024](https://heaten.com/news/strategic_partnership_advent_international)), with an INNIO strategic partnership and an Innovation Norway loan.
- **Calculator.** None. It has a **Funding** service instead: "START ELIGIBILITY ASSESSMENT" and "eligible projects may receive up to 70% of costs as grants or financial incentives (program- and country-dependent)" [Company claim]. The steps run Program fit, Application support, Pilot delivery, Compliance and reporting. The embedded form only asks for first name, last name, email and consent ([funding](https://heaten.com/funding)).
- **Regulation content.** The Funding page covers national and EU programmes in general terms. It also has a Sustainability page.
- **Audience routing.** Products, Technology, Funding, Applications (Pulp and Paper, Textile, Distilleries), Events ("Meet HEATEN on the road"), Company (References, Sustainability, News, Career), DATASHEETS as a standing CTA, and EN, DE and ES versions. No investor page.
- **Newsroom.** Yes ([news](https://heaten.com/news)).

#### B4. SPH Sustainable Process Heat, now part of Copeland (Germany)
- **Headline (verbatim).** "Recycling heat. Saving energy costs. Reducing CO2 emissions. With industrial heat pumps made by SPH.", with the banner "SPH is now Part of Copeland" ([spheat.de](https://spheat.de/?lang=en)).
- **Mission or specs.** Benefits, then specs: "ThermBooster™ heat pump generates temperatures of up to 175 °C for steam and 180 °C for water" and "Proven technology dating back more than 30 years". A vision paragraph sits lower down.
- **Proof.** The acquisition itself. Copeland, 23 Oct 2025: "Copeland Expands Industrial Heat Pump Portfolio with Agreement to Acquire SPH Sustainable Process Heat". The release quotes a McKinsey view that "The European steam heat pump segment is poised for as much as double-digit growth" and notes that Spirax Group keeps a minority stake ([Copeland](https://www.copeland.com/en-us/news/copeland-expands-industrial-heat-pump-portfolio-with-agreement-to-acquire-sustainable-process-heat)).
- **Calculator.** None found on the homepage (other pages not checked in full).
- **Regulation content.** None found on the homepage.
- **Audience routing.** Thermbooster, Services (Consultancy, System Configuration, Production, Service), Company, Career, Contact, Blog, News, Media, Glossary.
- **Newsroom.** Yes ([news](https://spheat.de/news?lang=en)), plus a Media page.

#### B5. Qpinch (Belgium)
- **Headline (verbatim).** "Carbon Neutral Energy From Waste Heat", then "Carbon neutral steam at the lowest variable cost in industry." ([qpinch.com](https://qpinch.com/)).
- **Mission or specs.** Economics and specs: lifts "80°C to 120°C and 120°C to 210°C", "A mere 40kW of electrical input translates into one MW of steam", "verified 15MW production" [Company claims]. It has a mission block ("Our mission").
- **Proof.** An awards bar (Solar Impulse, Royal Society of Chemistry, ICIS, Essenscia, Port of Antwerp) and a VCA safety certification logo. There's an "Industry leaders with commercial installations" section, but the logos carry no names in the markup.
- **Calculator.** The "Economics" page, "Build your business case for using QHT technology" ([economics](https://qpinch.com/economics)), shows a **date-stamped commodity panel**: "Commodity price 11/09/2026 Gas TTF per MWh: €79.52 EAU ETS CO2 per Ton: €84.98". It sets that against "Variable cost per ton of steam in Euro": "Gas boiler + ETS: €65.71, Gas boiler + CSS: €80.24, MVR: €20.06, Qpinch: €2.43" [Company claim], plus an abatement cost curve.

  The actual simulation is a gated form, "Introduce your project details" ([simulation-request](https://qpinch.com/simulation-request)). It asks for name, business email, phone, job function, industry (Refineries, Petrochemical, Food and Beverage, Recycling, Carbon Capturing), capacity need in MW, pressure out, temperature in, temperature out, and project details. There is no instant output.
- **Regulation content.** Yes, on the Economics page: "Carbon Rates soaring", the "Fit for 55" milestone, ETS price in the panel, and Scope 2 savings.
- **Audience routing.** Industries, Economics, Technology, People, News, FAQ, Contact. Jobs and Press are just mailto links. No investor page.
- **Newsroom.** A blog with a News tag ([blog](https://qpinch.com/blog)).

#### B6. Futraheat (UK)
- **Headline (verbatim).** "Game-changing heat pump technology" ([futraheat.com](https://futraheat.com/)).
- **Mission or specs.** Technology-led: "TurboClaw ... oil-free, sub-MW design ... process steam up to 200°C". Greensteam 360 is a "300kW unit" with a "60°C temperature lift" and "steam up to 150°C".
- **Proof.**
  - A press logo bar (BBC, The Guardian, The Engineer, Everything Electric).
  - A Hepworth Brewery install photo. The newsroom's latest item is Energy Live News, 14 Jan 2026, "Sussex brewery heat pump slashes emissions from steam brewing".
  - The homepage still says "We will be installing our first units with early-adopter industrial customers in 2024", which reads as stale copy in 2026.
- **Calculator.** None.
- **Regulation content.** None found.
- **Audience routing.** TurboClaw, Greensteam, About us, News, Get in touch. No careers, investor or partner pages.
- **Newsroom.** Yes, as press coverage links ([news](https://futraheat.com/news/)).

#### B7. Rondo Energy (US, thermal battery)
- **Headline (verbatim).** "Lowest-Cost Industrial Heat & Power" ([rondo.com](https://www.rondo.com/)).
- **Mission or specs.** Economics first. Benefits are grouped as Profitable ("No 'Green Premium'"), Sustainable ("Eliminate scope 1 & 2 emissions"), Flexible, Safe, Proven and Future-Proof, with specs such as "98% energy efficient" and "2MWth to over 100MWth".
- **Proof.**
  - "over 400MWhs of announced projects and 3GWhs of partnerships" and "11 commercial developments ... more than $160 million in funding" [Company claims].
  - An investor logo bar headed "Rondo's Investors Include Leading Global Companies": Breakthrough Energy, Microsoft, Rio Tinto, Energy Impact Partners, SCG, Titan Cement, Aramco, SABIC, H&M (from logo alt text).
  - A Customers page, "Trusted Partner to Industry Leaders", listing **HEINEKEN (NL, 100 MWh, heat-as-a-service)**, Covestro, Siam Cement and others ([customers](https://www.rondo.com/customers)).
  - Tier-one press (CNBC, NBC, Newsweek, Canary Media).
- **Calculator.** None.
- **Regulation content.** Only "Eliminate scope 1 & 2 emissions".
- **Audience routing.** Our Technology, Customers, Resources, Company (Careers), Contact, News and Press Releases filters ([news-press](https://www.rondo.com/news-press)). No investor page, but investors are shown on the homepage.
- **Newsroom.** Yes.

### 1.4 Short notes on the others

- **Antora (US, thermal battery).** "The Future of Industrial Heat & Power" ([antora.com](https://www.antora.com/)). The site is built on scale proof: "Project Big Stone ... from an empty lot to delivering energy in under 12 months" for POET, a factory tour ("Inside Our San Jose, California Factory"), and headlines from Bloomberg ("Battery Startup Raises $550 Million", 30 Jul 2026), WSJ and Reuters. The investor logo wall has no alt names for most. There's an Insights and press hub ([insights](https://www.antora.com/insights)). No calculator.
- **Kraftblock (DE, thermal storage).** "Resilient Thermal Storage for Industries", and lower down "Kraftblock is on a mission to decarbonize the industry." ([kraftblock.com](https://www.kraftblock.com/)). Proof is a cost whitepaper ("From 30% to 150% can be saved on wholesale electricity" [Company claim]), an Eneco CEO quote, FT and Forbes logos, a press kit ([press](https://www.kraftblock.com/press)) and projects. No calculator.
- **Enerin (NO).** "REACH YOUR NET-ZERO GOALS" ([enerin.no](https://www.enerin.no/)). It leads on market-level statistics ("Europe could save 300 Terrawatt hours"), a company timeline back to 2000, and customer quotes from Pelagia and Cargill. It has a "2026 ONS SME Innovation Award" news item and a Media Assets page. No calculator.
- **Olvondo Technology (NO).** The real site is https://olvondotech.no/ ("Lower your carbon footprint, increase your profit"). Proof is by association: "Tetra Pak to Offer HighLift by Olvondo" and FrieslandCampina items. It also publishes "New Report: Available Subsidies for Industrial Heat Pumps in Europe" ([link](https://olvondotech.no/new-report-available-subsidies-for-industrial-heat-pumps-in-europe/)). olvondo.com is parked.
- **Epcon (NO, MVR).** MVR heat pumps. The IEA HPT Annex 58 sheet describes 1.2 MW of waste heat producing 120°C steam ([PDF](https://heatpumpingtechnologies.org/annex58/wp-content/uploads/sites/70/2024/02/epcon-mvr-hpannex58final.pdf), [epcon.org](https://www.epcon.org/technologies/mvr-heat-pump)). The site wasn't reviewed in depth.
- **Mayekawa (JP).** A corporate MYCOM site with no hero headline ([mayekawa.com](https://www.mayekawa.com/)) and a heat pump product area ([heat_pumps](https://mayekawa.com/products/heat_pumps/)). It is building an ammonia and pentane cascade producing 145°C steam for Stella Polaris ([NaturalRefrigerants.com](https://naturalrefrigerants.com/mayekawa-ammonia-pentane-cascade-heat-pump-will-heat-steam-to-145c-for-prawn-producer-stella-polaris/), [Secondary]).
- **Kobelco (JP).** A group corporate site ([kobelco.co.jp/english](https://www.kobelco.co.jp/english/)). Its SGH165 steam heat pump makes 135 to 175°C steam at about 624 kWth, with COP 1.9 to 3.0 depending on lift ([IEA HPT Annex 58 sheet](https://heatpumpingtechnologies.org/annex58/wp-content/uploads/sites/70/2022/07/technologykobelcosgh165.pdf)).

### 1.5 Calculators and savings tools compared

| Company | Tool | Self-serve result? | Inputs | Outputs | Link |
|---|---|---|---|---|---|
| GEA | Heat Pump eCalculator | Only after giving name, email, company and country | Contact details first. Technical inputs unknown | Unknown (not submitted) | [link](https://www.gea.com/en/campaigns/heat-pump/savings-calculator/) |
| Qpinch | Economics page plus simulation form | Page shows fixed dated figures. Simulation is gated | Industry, MW, pressure out, temperature in and out | Page: € per tonne steam for boiler plus ETS vs alternatives. Simulation by reply | [economics](https://qpinch.com/economics), [form](https://qpinch.com/simulation-request) |
| Skyven | Galileo Assessment | No. A call or email, "done in minutes" | Steam band, pressure and temperature checks, waste heat band, energy costs on the call | Net annual savings, site COP, steam capacity, emissions reduction | [link](https://skyven.co/galileo/) |
| AtmosZero | "Check Boiler Compatibility" | No. The team runs the numbers | Heat load or flow with units, pressure, minimum pressure, reason (incl. emissions penalties, compliance) | By reply | [link](https://atmoszero.energy/analysis/) |
| Heaten | Funding eligibility assessment | No | Contact details | Funding route by reply | [link](https://heaten.com/funding) |
| Spirax Sarco | Engineering calculators | Yes, instant | Sizing inputs (pipes, valves, flash steam, heat rating) | Engineering values, not money | [link](https://www.spiraxsarco.com/resources-and-design-tools) |

**What this means.** None of the 14 has an instant, public, transparent savings calculator for industrial steam. The startups all run "tools" that are really gated lead forms with an engineer behind them. A self-serve calculator that shows its assumptions and sources would be unusual in this set. The gap exists partly because at current UK prices an honest self-serve tool will often show a loss (Part 3), which is likely why competitors keep it behind a form.

### 1.6 Patterns

**What "credible equipment provider" looks like on a website, concretely**

1. **The headline says what they make and for whom, often with a scale or heritage qualifier.** Examples: "for more than 125 years" (Sabroe), "The UK's largest independent..." (Star), "MADE IN THE UK" (Clade), "First for Steam Solutions" (Spirax).
2. **Proof density: named customers with numbers.** Examples: Nestlé water savings (Spirax), Aurivo −80% CO₂ (GEA), Aalborg 177 MWth and 210,000 t CO₂ a year (Everllence), Queens Quay −60% carbon (Star), fleet-level 32% cost and 55% emissions (JCI). The numbers sit next to the customer's name.
3. **Institutional paperwork, published as pages.** ISO 9001, 14001 and 45001, PED, CHAS, B Corp, T&Cs of sale, modern slavery and gender pay pages. It's dull, and the dullness is what signals an institution.
4. **Engineering depth you can use without talking to sales.** Datasheets per model, sizing calculators, steam tables, technical guides, CPD seminars.
5. **Service footprint.** Branch pages, staff counts, 24/7 callout, maintenance contracts, spares and training.
6. **Audience routing in the top nav.** Investors, Media, Careers and Partners or Installers are separate doors. Industry and location selectors. Customer extranets (Everllence "Nexus", GEA login).
7. **A dated, frequent newsroom.** Everllence published about 20 releases in three months.
8. **Financing as a product.** JCI Capital Funding Solutions, Clade's 15-year Heat-as-a-Service, Skyven's EaaS.
9. **Mission language does appear** (GEA "Engineering for a better world", Everllence "Moving big things to zero", Siemens Energy), but only as a tagline sitting on top of the proof. When the proof is missing, the mission line is all a visitor sees, and that reads as a startup. This matches what HotGreen's Engagement Manager said on the call.

**Startups that look big while staying distinctive**

- **Skyven** is the best model for HotGreen.
  - An economics headline with four hard numbers.
  - A named tool (Galileo) and a named product line (Arcturus).
  - Two deployment models (EaaS or CapEx).
  - A named customer testimonial with a job title.
  - European offices.
  - Team track record rolled up into company-scale numbers.

  It stays distinctive through naming and the COP 8 claim.
- **Heaten** looks big through a structured References table (10 projects with MWth, °C, quarter and model), datasheets as a standing CTA, an events calendar, and a funding service. Its differentiating line is "We recycle your industrial heat and bring it back to work".
- **Rondo** and **Antora** borrow scale from others: corporate investor logos, tier-one press, project MWh and GWh totals, factory photography. Rondo keeps a distinct voice ("No 'Green Premium'").
- **AtmosZero** stays distinctive through focus ("thinking about steam is all we do", "Boiler 2.0") and a strategic OEM investor. It's thinner on proof (COP 2, no named customer on the homepage).
- **SPH** and **Clade** show the endgame: being bought by or partnered with an incumbent (Copeland with Spirax, Groupe Atlantic) becomes the strongest credibility line on the site.

**Where HotGreen's site sits today, for contrast** ([home](https://www.hotgreensolutions.com/), [solutions](https://www.hotgreensolutions.com/solutions))

- **Headline and positioning.** "Ultra-efficient low carbon steam for industry", then "HotGreen is on a mission to save manufacturers money while cutting carbon." Mission-first.
- **Navigation.** Home, Solutions, Contact. No newsroom, careers, investor or partner routes, and no datasheet.
- **Numbers.** Solutions carries "€250k /year saved ... for a typical facility", "1,500 TCO₂/year avoided per MW", "4x more energy efficient than a traditional boiler" and "Reduce your energy bill by 30%". The only caveat given is "estimates based on projected product performance".
- **Call to action.** "Join our waitlist now for 2027 and 2028 deployments".
- **Missing proof.** The CCEP Ventures investment disclosed by CCEP isn't shown.

---

## PART 2. Regulation and policy context, September 2026

Focus: a UK or EU food and beverage manufacturer burning natural gas in boilers for process steam.

### 2.0 Context that moved in 2026

- **UK political change.** On 22 Jun 2026, Keir Starmer announced his resignation ([NPR, 22 Jun 2026](https://www.npr.org/2026/06/22/nx-s1-5866231/keir-starmer-resigns)), and Andy Burnham is now Prime Minister ([Euronews, 22 Sep 2026](https://www.euronews.com/2026/09/22/british-prime-minister-burnham-declines-to-rule-out-rejoining-eu)). The July UK and EU summit that was expected to seal an ETS link was postponed. Contexte reported that Costa said it "will be postponed due to Starmer's resignation" ([Contexte](https://www.contexte.com/eu/news/energy/euuk-summit-set-to-consider-ets-link-up-will-be-postponed-due-to-starmers-resignation-costa-says_269832)). Burnham says a summit is "expected to take place at some point later this year" ([Euronews](https://www.euronews.com/2026/09/22/british-prime-minister-burnham-declines-to-rule-out-rejoining-eu)).
- **Gas price shock.** Dutch TTF rose "more than 130% since the start of 2026", with "The Strait of Hormuz ... 'effectively closed'", Norwegian outages and EU storage "only around 57% full at the beginning of August" ([Euronews, 20 Aug 2026](https://www.euronews.com/business/2026/08/20/europes-gas-prices-have-doubled-with-the-worst-yet-to-come)). A broker market report for 25 Sep 2026 gives NBP day-ahead at "190.00 p/therm", TTF front month at "€75.11/MWh" and UK day-ahead baseload power at "£161.23/MWh" ([Prestige Business Solutions, 25 Sep 2026](https://www.prestigebusiness.energy/marketreports/energy-market-update25-sep2026)) [Secondary]. Official non-domestic price statistics (Part 3) only run to Q1 2026, so they don't show this move yet.

### 2.1 UK ETS

- **Scope** [Confirmed].
  - Power and industry combustion installations with "total rated thermal input exceeding 20 MW", plus aviation.
  - Domestic maritime from 1 Jul 2026 (ships of 5,000 GT or more).
  - A Hospital and Small Emitter opt-out for sites under 25,000 tCO₂e a year.
  - About 1,000 stationary installations.

  Source: ICAP UK ETS page (information current through Dec 2025), https://icapcarbonaction.com/en/ets/uk-emissions-trading-scheme-uk-ets. Maritime and Phase II confirmed in ICAP's summary of the 19 Dec 2025 decisions: https://icapcarbonaction.com/en/news/uk-announces-major-policy-decisions-and-launches-new-consultations-ets-expansion

  **Meaning for F&B.** Only sites with more than 20 MW of combustion capacity are in, and some of those opt out as small emitters. Many mid-size F&B plants pay no ETS price today.
- **Price** [Confirmed unless marked].
  - 2025 average auction price £48.05/t (ICAP).
  - The UK ETS Authority set **£49.41/t** as the carbon price for the 2026 scheme year (civil penalties), determined 28 Nov 2025 from the average UKA Dec futures settlement over the 12 months to 11 Nov 2025 ([gov.uk](https://www.gov.uk/government/publications/determinations-of-the-uk-ets-carbon-price/uk-ets-carbon-price-for-use-in-civil-penalties-2026)).
  - Auction Reserve Price raised from £22 to **£28** in 2026, inflation-linked after that (ICAP, Dec 2025).
  - Market: UKA Dec-26 settled at **£59.77/t** (24 Sep 2026, reported 25 Sep) [Secondary, broker report above].
- **Changes in 2025 and 2026** [Confirmed].
  - Waste incineration: voluntary MRV from Jan 2026, full inclusion 2028.
  - Greenhouse gas removals: inclusion from 2029.
  - Phase II runs 2031 to 2040.
  - Free allocation review finalised Nov 2025, with a phase-out for UK CBAM sectors starting 2027.
  - International maritime was consulted on until 20 Jan 2026 [Proposal].
  - The 20 MW threshold wasn't changed. An old BEIS evidence gathering on lowering it produced no decision that we found.
- **Linking with the EU ETS.**
  - Agreed in principle on 19 May 2025.
  - Formal negotiations started the week of 19 Jan 2026 ([Carbon Pulse](https://carbon-pulse.com/468944/); [ICAP](https://icapcarbonaction.com/en/news/eu-and-uk-commit-linking-emissions-trading-systems-landmark-cooperation-agreement)).
  - A linking announcement was expected at a July 2026 summit ([Veyt, 27 May 2026](https://veyt.com/eu-ets/ets-linkage-eu-uk-summit-13-july/)), but the summit was postponed (2.0).
  - **Status on 25 Sep 2026: not concluded, and not legally binding** [Proposal]. We found no report of a signed linking agreement.

### 2.2 EU ETS and EU ETS2

- **EU ETS (ETS1)** [Confirmed].
  - Covers "combustion installations with >20 MW thermal rated input".
  - 2025 average auction price **€73.43/t**. 2026 cap 1,185.4 MtCO₂e ([ICAP EU ETS](https://icapcarbonaction.com/en/ets/eu-emissions-trading-system-eu-ets)).
  - The official 2026 reference price is the CBAM certificate price, the weighted average of EU ETS auction clearing prices: **Q1 2026 €75.36, Q2 2026 €75.28** (published 7 Apr and 6 Jul 2026, Q3 due 5 Oct 2026) ([European Commission](https://taxation-customs.ec.europa.eu/carbon-border-adjustment-mechanism/price-cbam-certificates_en)).
  - Market: EUA Dec-26 at **€86.96/t** (24 Sep 2026) [Secondary].
- **EU ETS review proposal, 17 Jul 2026** [Proposal] ([ICAP](https://icapcarbonaction.com/en/news/eu-commission-publishes-eu-ets-review-proposal)).
  - Free allocation extended to 2040. "From 2031, all free allocation is made fully conditional upon operators submitting a verified decarbonisation investment plan."
  - Linear reduction factor of 3.7% for 2031 to 2035 and 1.7% from 2036.
  - MSR changes.
  - A new Industrial Decarbonisation Bank ([ClearBlue Markets summary](https://www.clearbluemarkets.com/knowledge-base/the-eu-ets-review-proposal-july-2026-relief-for-industry-stability-for-the-market), [Secondary]).
  - The impact assessment found lowering the 20 MW threshold unnecessary because ETS2 covers smaller emitters.
  - Linked to the 2040 target of 90% net reduction.
  - EU leaders aim for agreement by the end of Q1 2027.
- **EU ETS2** [Confirmed]. "The ETS2 will become fully operational in 2028." It covers "fuel combustion in buildings, road transport and additional sectors (mainly small industry not covered by the existing EU ETS)", and fuel suppliers are the regulated entities. Price stability: in the first two years, if the price "exceeds €45 (in 2020 prices)", extra allowances may be released. Commission page, updated 2 Sep 2026: https://climate.ec.europa.eu/areas-action/carbon-markets/ets2-buildings-road-transport-and-additional-sectors_en. The one-year delay from 2027 was agreed on 9 Dec 2025 ([Euronews](https://www.euronews.com/my-europe/2025/12/10/carbon-tax-on-buildings-and-transport-delayed-to-2028-under-eu-climate-deal)).

  **Meaning for EU F&B.** Plants below 20 MW that burn gas will see a carbon cost passed through in their gas price from 2028. For EU sites, this is the clearest "changing rules" story HotGreen can tell. The UK has no equivalent.

### 2.3 CBAM, UK and EU

- **EU CBAM** [Confirmed].
  - Definitive regime since 1 Jan 2026 for cement, iron and steel, aluminium, fertilisers, electricity and hydrogen ([Commission](https://taxation-customs.ec.europa.eu/carbon-border-adjustment-mechanism_en)).
  - Regulation (EU) 2025/2083 (in force 20 Oct 2025) brought in a 50 tonne a year per importer threshold, moved certificate sales to February 2027 for 2026 imports, and moved the annual declaration deadline to 30 Sep ([ICAP](https://icapcarbonaction.com/en/news/eu-adopts-simplifications-cbam-rules-ahead-compliance-phase-starting-2026); [Mayer Brown](https://www.mayerbrown.com/en/insights/publications/2025/10/eu-adopts-cbam-simplification-regulation-10-key-amendments-and-challenges-ahead), [Secondary]).
  - UK goods aren't exempt. A reciprocal exemption depends on ETS linking ([S&P Global, Dec 2025](https://www.spglobal.com/energy/en/news-research/latest-news/energy-transition/121725-no-cbam-exemption-for-uk-before-definitive-phase-begins-hoekstra), [Secondary]).
- **UK CBAM** [Confirmed]. Starts **1 Jan 2027** under Finance Act 2026, Part 5 ([legislation.gov.uk](https://www.legislation.gov.uk/ukpga/2026/11/part/5)), with regulations SI 2026/802 and SI 2026/809 ([802](https://www.legislation.gov.uk/uksi/2026/802/made), [809](https://www.legislation.gov.uk/uksi/2026/809/made)).
  - Sectors: aluminium, cement, fertiliser, hydrogen, iron and steel. "Glass and ceramics excluded from 2027 scope". "Indirect emissions deferred until 2029 earliest" (ICAP, Dec 2025).
  - A £50,000 a year import value threshold is reported by secondary sources ([greencalculus](https://greencalculus.com/standards/uk-cbam/)) [Secondary].
- **Meaning for F&B.** CBAM doesn't apply to food and drink products. The effect is indirect, through packaging (aluminium cans) and agricultural inputs (fertiliser). Glass bottles are outside UK CBAM.

### 2.4 Scope 1, 2 and 3 reporting

- **UK, current law** [Confirmed]. SECR (Streamlined Energy and Carbon Reporting) still applies to quoted companies and large unquoted companies and LLPs (energy use and Scope 1 and 2). A government consultation on streamlining SECR is planned for 2026 but had not launched as of 2 Aug 2026 ([UK SRS explainer](https://uksrs.org.uk/secr-requirements), [Secondary]).
- **UK SRS** [Confirmed, voluntary]. UK SRS S1 and S2 (ISSB-based) were published on **25 Feb 2026** for voluntary use. The Scope 3 relief isn't time-limited in the UK version ([Global Financial Regulatory Blog](https://www.globalfinregblog.com/2026/03/uk-government-publishes-final-sustainability-and-climate-related-reporting-standards/)).
- **FCA CP26/5** [Proposal]. Would require UK SRS reporting by listed companies for periods from **1 Jan 2027**, replacing TCFD, with a one-year Scope 3 deferral. Published 30 Jan 2026, closed 20 Mar 2026, and the Policy Statement is "Not yet published", expected autumn 2026 ([FCA](https://www.fca.org.uk/publications/consultation-papers/cp26-5-sustainability-disclosures); [Linklaters](https://sustainablefutures.linklaters.com/post/102mfet/uk-srs-fca-proposes-mandatory-climate-disclosures-from-2027-except-for-scope-3)). A consultation on private companies is expected later in 2026 [Proposal] ([Novata](https://www.novata.com/resources/blog/uk-sustainability-reporting-standards/), [Secondary]).
- **EU CSRD after Omnibus I** [Confirmed].
  - Published in the OJ on 26 Feb 2026, in force 18 Mar 2026.
  - Scope narrowed to EU companies with "more than 1,000 employees and a net annual turnover exceeding €450 million".
  - The directive "puts certain limits on the sustainability information that reporting undertakings may request from companies in their value chain with fewer than 1,000 employees".
  - Transposition by 19 Mar 2027 ([Latham & Watkins, 27 Feb 2026](https://www.lw.com/en/insights/eu-sustainability-omnibus-published-in-the-official-journal)).
- **Meaning for F&B.** Large buyers like CCEP still report in full, and Scope 3 is over 90% of CCEP's footprint (2.7). Mid-size suppliers are now shielded from some mandatory data requests, but commercial pressure (SBTi targets, supplier programmes) continues.

### 2.5 The UK electricity to gas price ratio and levies

- **The ratio** [Confirmed data, Derived ratio]. DESNZ Q1 2026 non-domestic prices including CCL give electricity/gas ratios of about **4.8 to 5.5** across the medium to very large bands (full table in Part 3). For 2025 as a whole, the ratio for "Large" users was 5.88.
- **Government position** [Confirmed statement]. The Carbon Budget and Growth Delivery Plan (Oct 2025) says: "The price disparity between electricity and gas needs to be addressed to make it more attractive for consumers to install clean technologies like heat pumps." (p.214 printed, PDF p.215). It adds that industrial electrification "will require support to overcome barriers associated with high electricity prices and capital costs as well as electricity grid access" (PDF p.210) ([CBGDP PDF](https://assets.publishing.service.gov.uk/media/6901d0c2a6048928d3fc2b55/carbon-budget-and-growth-delivery-plan-report.pdf)).
- **What has actually changed** [Confirmed].
  - Climate Change Levy main rates are now equal: from 1 Apr 2026, **£0.00801/kWh for both electricity and natural gas**. "Rebalancing was completed in 2024" ([HMRC](https://www.gov.uk/government/publications/climate-change-levy-rates-from-1-april-2026/climate-change-levy-changes-to-rates-from-1-april-2026)).
  - From April 2026 to 2028/29, 75% of **domestic** Renewables Obligation costs move to the Exchequer, and ECO ends. **This is domestic only** ([gov.uk, 17 Dec 2025](https://www.gov.uk/government/publications/energy-bill-reductions-statement-to-energy-suppliers/energy-bill-reductions-statement-to-energy-suppliers)).
  - The **British Industrial Competitiveness Scheme (BICS)** exempts eligible manufacturers from RO and FiT levies (from Apr 2027) and Capacity Market costs (from Oct 2027), worth around £35 to £40 per MWh and "up to 25%" of electricity cost ([gov.uk, 15 Apr 2026](https://www.gov.uk/government/news/government-cuts-electricity-bill-for-10000-manufacturers-in-boost-for-uk-competitiveness)). Applications run from 1 Oct to 30 Nov 2026 ([guidance, 10 Aug 2026](https://www.gov.uk/government/publications/british-industrial-competitiveness-scheme-business-guidance/british-industrial-competitiveness-scheme-guidance-for-applicants)).
  - **Most food and drink is not eligible.** The final eligible SIC list (version 2, 8 Jul 2026) includes only **1041 oils and fats, 1062 starches, 1081 sugar** from divisions 10 and 11. Dairy, brewing, distilling and soft drinks are not on it ([eligible codes XLSX](https://assets.publishing.service.gov.uk/media/6a6c9ba4862aaf18d9c62acd/annex-a-british-industrial-competitiveness-scheme-sic-hs-codes.xlsx); the NFU says food and drink "remains ineligible", [17 Apr 2026](https://www.nfuonline.com/news/agriculture-excluded-from-bics/)).
  - British Industry Supercharger: from 2026 the network charge discount for the most energy-intensive firms rises from 60% to 90% (CBGDP PDF p.210). This applies to energy-intensive industries only.
- **Not done** [Proposal or advocacy only]. No government has committed to moving non-domestic electricity levies onto gas or into taxation. The MCS Foundation made the case in a Feb 2026 report ([PDF](https://mcsfoundation.org.uk/wp-content/uploads/2026/02/MCSF-Rebalancing-Electricity-Levies-in-the-UK-Report-Final.pdf)) [Secondary, advocacy].

### 2.6 Grants and fiscal support for industrial heat

**UK**

- **Industrial Energy Transformation Fund (IETF)** [Confirmed]. "Following the 2025 Spending Review, there will be no further extension of the Industrial Energy Transformation Fund (IETF), and the planned second competition window of IETF Phase 3 will not take place" (3 Jul 2025). Existing projects are funded to 2028 ([gov.uk IETF collection, updated 25 Jun 2026](https://www.gov.uk/government/collections/industrial-energy-transformation-fund); CBGDP PDF p.210).
- **Industrial Heat Recovery Support (IHRS)** [Confirmed]. "closed to applications in July 2020, and completed in March 2022" ([gov.uk](https://www.gov.uk/guidance/industrial-heat-recovery-support-programme-how-to-apply)).
- **Scottish Industrial Energy Transformation Fund** [Confirmed]. "funding profiled from 2021 to 2026". No new round confirmed on the page ([gov.scot](https://www.gov.scot/collections/scottish-industrial-energy-transformation-fund-sietf/)).
- **Newer scheme.** We found **no successor UK capital grant for industrial heat** as of 25 Sep 2026. The CBGDP promises "A refreshed Industrial Decarbonisation Plan" "in due course" (PDF p.209) [Proposal]. A secondary site mentions an "Industrial Support Scheme" from 2027 [Unverified].
- **Climate Change Agreements** [Confirmed]. The new scheme "started in January 2026 and will run until 31 March 2033" ([Food and Drink Federation](https://www.fdf.org.uk/fdf/business-guidance-hubs/environmental-sustainability/climate-change-agreements/)). CCA holders pay reduced CCL at 8% of the main rate for electricity and 11% for gas from 1 Apr 2026 (HMRC link above). Food and drink is a CCA sector.
- **Capital allowances.** A new 40% first-year allowance for main rate plant from 1 Jan 2026, and the main pool writing-down allowance falls from 18% to 14% from Apr 2026 ([PKF Francis Clark](https://pkf-francisclark.co.uk/insights/budget-2025-what-are-the-main-changes-to-capital-allowances/)) [Secondary].

**EU, brief**

- Netherlands SDE++ 2026: applications from 27 Oct to 26 Nov 2026. Industrial heat pumps are in scope, and permits are still needed in 2026 ([RVO](https://www.rvo.nl/nieuws/meer-tijd-voor-aanvraag-sde-2026)) [Confirmed].
- The EU Innovation Fund continues, and an Industrial Decarbonisation Bank is part of the ETS review [Proposal].
- Heaten's "up to 70% of costs as grants" is a [Company claim].

### 2.7 Buyer pressure: CCEP and other F&B majors

**Coca-Cola Europacific Partners.** All from the *2025 Annual Report and Form 20-F*, https://www.sec.gov/Archives/edgar/data/1650107/000165010726000029/cce-20251231.htm. cocacolaep.com blocked our fetcher (Cloudflare).

- **Targets.**
  - "We aim to reach Net Zero emissions (Scope 1, 2 and 3) by 2040", including the "2030 target to reduce absolute GHG emissions (Scope 1, 2 and 3) by 30% versus 2019".
  - Scope 1 and 2: "Our target is to reduce emissions from these sources by 47% between 2019 and 2030".
  - Scope 3: FLAG −33.3% and non-FLAG −27.5% by 2030 vs 2019.
  - The updated targets (adding the Philippines and FLAG) "are currently awaiting validation from the SBTi" (p.230 to 231). [Confirmed as company targets]
- **Progress.**
  - KPI "18.9%" absolute reduction in Scope 1, 2 and 3 since 2019.
  - Scope 3 "−16.6% 2025 reduction from baseline".
  - "Over 90% of our GHG emissions are Scope 3".
  - The Scope 1 and 2 chart shows "−42.0% 2025 reduction from baseline", with a footnote on "forecast reduction vs 2019 baseline". Check the chart on p.231 before quoting this figure.
- **Money and method.**
  - "We apply an internal shadow carbon price of €100/tCO2e to support the business case for future Capex investments to reduce our Scope 1 and 2 GHG emissions" (p.229).
  - "In 2025, we invested €18 million in energy efficiency and other carbon reduction initiatives, such as replacing a gas boiler with an electric boiler".
  - About €385 million planned for emissions reduction in 2025 to 2027, of which €75 million is capex.
  - RE100 member, "nearly at 100% renewable electricity in Europe".
- **HotGreen.** "Hot Green – pioneering heat pump technology supporting decarbonising our energy inefficient boilers on our sites" is listed among CCEP Ventures' 2025 investments (€1.7 million across three start-ups) (p.229).
- **Suppliers.** Risk controls include "Supplier GHG emissions reduction targets and engagement programme". CCEP collects "supplier-specific carbon footprints" from strategic ingredient suppliers and is a member of the REfresh Alliance on renewable energy across the supply chain.
- **Carbon pricing view.** The 20-F doesn't mention the EU or UK ETS. Its scenario analysis assumes carbon pricing legislation affecting the beverage industry "between 2030 and 2035, depending on the emission pathway". That suggests CCEP doesn't treat ETS compliance as a material direct cost today [Derived reading].

**Other majors**

- **PepsiCo.** The pep+ REnew programme supports "over 250 companies" moving suppliers to renewable electricity. 2030 goals: −42% Scope 3 energy and industry, −30% FLAG ([PepsiCo, 28 Apr 2026](https://www.pepsico.com/newsroom/press-releases/2026/pepsico-givaudan-smurfit-westrock-statkraft-sign-10-year-renewable-energy-agreement-across-europe)) [Confirmed as company statement].
- **Unilever.** The Supplier Climate Programme asks priority suppliers to set science-based targets, report progress and provide product carbon footprints ([unilever.com page](https://www.unilever.com/suppliers/supplier-climate-programme/), which returned 403 to us; content taken from secondary summaries) [Unverified].
- **The Coca-Cola Company.** Its public supplier requirements page only requires compliance with environmental law. It contains no GHG target requirement ([link](https://www.coca-colacompany.com/policies-and-practices/human-and-workplace-rights/supplier-requirements)).

### 2.8 Confirmed versus proposal, at a glance

| Item | Status on 25 Sep 2026 |
|---|---|
| UK ETS covers combustion over 20 MW, £49.41 2026 penalty price, ARP £28 | Confirmed |
| UK ETS maritime 2026, waste 2028, GGR 2029, Phase II to 2040 | Confirmed |
| UK and EU ETS link | Agreed in principle (May 2025). Negotiating. Summit postponed. Not concluded |
| EU ETS review (free allocation tied to decarbonisation plans from 2031) | Proposal (17 Jul 2026) |
| EU ETS2 from 2028 covering small industry | Confirmed |
| EU CBAM definitive regime from 2026, 50 t threshold, certificates on sale Feb 2027 | Confirmed |
| UK CBAM from 1 Jan 2027 | Confirmed (Finance Act 2026) |
| UK SRS S1 and S2 | Confirmed, voluntary |
| Listed companies on UK SRS from 2027 | Proposal (FCA CP26/5, policy statement pending) |
| CSRD Omnibus I thresholds (1,000 employees, €450m) | Confirmed. Member states transpose by Mar 2027 |
| CCL equalised gas and electricity | Confirmed |
| BICS electricity levy relief from Apr 2027 | Confirmed, but excludes most F&B |
| Moving non-domestic levies from electricity to gas | Not proposed by government. Advocacy only |
| IETF | Closed to new applicants. No successor found |
| New CCA scheme 2026 to 2033 | Confirmed |

---

## PART 3. Inputs for a public savings calculator

### 3.1 The logic the inputs have to feed

For a given heat demand Q (kWh of useful heat a year):

- **Gas boiler.** Gas bought = Q ÷ boiler efficiency. Cost = gas bought × gas price. Scope 1 = gas bought × gas emission factor. Carbon cost = Scope 1 × carbon price, but only if the site is in an ETS, or if the user opts to apply an internal price.
- **Heat pump.** Electricity bought = Q ÷ COP. Cost = electricity bought × electricity price. Scope 2 (location-based) = electricity bought × grid factor.
- **Energy-only breakeven.** The heat pump is cheaper to run when (electricity price ÷ gas price) < (COP ÷ boiler efficiency) [Derived, standard algebra].

The steam energy per tonne comes from steam tables at the user's pressure and feedwater temperature. Spirax Sarco publishes free steam tables at https://www.spiraxsarco.com/resources-and-design-tools/steam-tables/saturated-water-line. We didn't extract values because they depend on the user's inputs.

### 3.2 Latest published inputs

| Input | Latest figure | Basis and notes | Source (date) |
|---|---|---|---|
| **UK non-domestic electricity price** incl. CCL, excl. VAT, Q1 2026 (provisional) | Medium (2,000 to 19,999 MWh/yr) **24.999 p/kWh**. Large (20,000 to 69,999) **23.925**. Very Large (70,000 to 150,000) **21.925**. Extra Large (over 150,000) **21.422**. Excl. CCL: 24.458, 23.366, 21.457, 20.973 | Averages of supplier surveys, "fully delivered prices" excluding VAT | DESNZ QEP Tables 3.4.1 and 3.4.2, published 30 Jun 2026, **next update 29 Sep 2026**. https://www.gov.uk/government/statistical-data-sets/gas-and-electricity-prices-in-the-non-domestic-sector (file: https://assets.publishing.service.gov.uk/media/6a4247b8db380b085e94aaeb/table_341__2_.xlsx) |
| **UK non-domestic gas price** incl. CCL, Q1 2026 | Medium (2,778 to 27,777 MWh/yr) **4.549 p/kWh**. Large (27,778 to 277,777) **4.456**. Very Large (277,778 to 1,111,112) **4.534**. Excl. CCL: 4.123, 4.187, 4.200 | As above (UK gas is priced on gross CV) | Same file |
| UK annual 2025, incl. CCL | Electricity Medium 25.905, Large 24.401, Very Large 22.095. Gas Medium 4.684, Large 4.149, Very Large 4.217 p/kWh | Annual averages | Same file |
| **EU industrial electricity price**, H2 2025, excl. VAT and recoverable taxes, band IE (20,000 to 69,999 MWh) | EU27 **€0.1342/kWh**. DE 0.1595. NL 0.1166. FR 0.0853. BE 0.1311. IE 0.1970 | Bi-annual. 2026-S1 not yet published | Eurostat nrg_pc_205, dataset updated 24 Sep 2026. https://ec.europa.eu/eurostat/databrowser/view/nrg_pc_205/default/table |
| **EU industrial gas price**, H2 2025, band I4 (100,000 to 999,999 GJ) | EU27 **€0.0483/kWh**. DE 0.0546. NL 0.0569. FR 0.0448. BE 0.0399. IE 0.0457 | As above | Eurostat nrg_pc_203, updated 24 Sep 2026. https://ec.europa.eu/eurostat/databrowser/view/nrg_pc_203/default/table |
| **Natural gas emission factor (UK)** | **0.18231 kgCO₂e/kWh (gross CV)**. 0.20199 (net CV). CO₂ only: 0.18194 (gross) | Scope 1, 2026 factor set, version 1.2 | UK Government GHG Conversion Factors 2026, published 11 Jun 2026, updated 31 Jul 2026. https://www.gov.uk/government/publications/greenhouse-gas-reporting-conversion-factors-2026 |
| Natural gas well-to-tank (Scope 3) | 0.03021 kgCO₂e/kWh (gross CV) | Optional | Same |
| **UK grid electricity factor** (for heat pump Scope 2, location-based) | **0.13096 kgCO₂e/kWh** generation. Plus T&D 0.01299 (Scope 3) | 2026 factor set | Same |
| EU grid factor | Use the EEA indicator by country. We didn't extract numbers (interactive chart) | Location-based | https://www.eea.europa.eu/en/analysis/indicators/greenhouse-gas-emission-intensity-of-1-1762418255/greenhouse-gas-emission-intensity (modified 6 Nov 2025) |
| **Boiler efficiency, typical fleet** | **85.7%** combustion efficiency for natural gas (HHV/gross basis, "boilers equipped with feedwater economizers or air preheaters and 3% oxygen in flue gas") | A ceiling for combustion. Real fuel-to-steam efficiency is lower once blowdown and cycling losses are counted. Make it editable | US DOE Steam Tip Sheet #15, Jan 2012. https://www.energy.gov/sites/prod/files/2014/05/f16/steam15_benchmark.pdf |
| Boiler efficiency, best new | ETL criterion: "minimum net thermal efficiency of 92.0%" at 100% and 30% load (gas). That is **about 83.0% on a gross basis** [Derived using 0.18231 ÷ 0.20199 = 0.9026] | Best-in-class listed products, not the installed fleet | DESNZ Energy Technology List, steam boilers. https://etl.energysecurity.gov.uk/products/boiler-equipment/steam-boilers |
| Boiler radiation loss | "between 0.3 and 0.5%" for a well insulated boiler of 5 MW or more | Context only | Spirax Sarco. https://www.spiraxsarco.com/learn-about-steam/the-boiler-house/boiler-efficiency-and-combustion |
| **UK ETS carbon price (official)** | **£49.41/t** for 2026 | Average UKA Dec futures settlement, 12 months to 11 Nov 2025 | UK ETS Authority determination, 28 Nov 2025. https://www.gov.uk/government/publications/determinations-of-the-uk-ets-carbon-price/uk-ets-carbon-price-for-use-in-civil-penalties-2026 |
| UK ETS, other references | 2025 average auction £48.05. ARP £28 (2026). Market Dec-26 **£59.77** (24 Sep 2026) [Secondary] | Market price moves daily | ICAP (above). Prestige market report 25 Sep 2026 (above) |
| **EU carbon price (official)** | **€75.28/t** (Q2 2026). €75.36 (Q1 2026) | Weighted average of EU ETS auction clearing prices | European Commission CBAM certificate price, published 6 Jul 2026. https://taxation-customs.ec.europa.eu/carbon-border-adjustment-mechanism/price-cbam-certificates_en |
| EU carbon, other | 2025 average auction €73.43. Market EUA Dec-26 €86.96 (24 Sep 2026) [Secondary] | | ICAP, Prestige |
| Internal carbon price (example) | **€100/tCO₂e** | CCEP's shadow price for Scope 1 and 2 capex | CCEP 2025 Annual Report and 20-F, p.229 |
| **UK Climate Change Levy** | £0.00801/kWh for **both** electricity and gas (from 1 Apr 2026). CCA holders pay 8% (electricity) and 11% (gas) of that | Already inside DESNZ "incl. CCL" prices. Needed only if the user enters contract prices without CCL | HMRC. https://www.gov.uk/government/publications/climate-change-levy-rates-from-1-april-2026/climate-change-levy-changes-to-rates-from-1-april-2026 |
| UK BICS relief (future) | £35 to £40/MWh off electricity from Apr and Oct 2027, **eligible SIC codes only** | Most F&B not eligible | gov.uk, 15 Apr 2026 (above) |
| Wholesale context (not for defaults) | NBP day-ahead 190.00 p/therm, about 6.48 p/kWh [Derived, 29.3071 kWh per therm]. UK day-ahead power £161.23/MWh | Shows that 2026 prices have moved past the Q1 official data | Prestige market report 25 Sep 2026 [Secondary] |

### 3.3 What the official numbers imply [Derived]

**Electricity ÷ gas price ratios from the tables above**

| Market (period) | Bands | Ratio |
|---|---|---|
| UK (Q1 2026, incl. CCL) | Medium ÷ Medium | 5.50 |
| UK (Q1 2026, incl. CCL) | Large ÷ Large | 5.37 |
| UK (Q1 2026, incl. CCL) | Very Large ÷ Large | 4.92 |
| UK (Q1 2026, incl. CCL) | Very Large ÷ Very Large | 4.84 |
| UK (2025 annual) | Large ÷ Large | 5.88 |
| EU27 (H2 2025) | IE ÷ I4 | 2.78 |
| Germany | | 2.92 |
| Netherlands | | 2.05 |
| France | | 1.90 |
| Belgium | | 3.29 |
| Ireland | | 4.31 |

**Breakeven ratio**, COP ÷ boiler efficiency:

- COP 2.8 against 85.7%: **3.27**
- COP 2.8 against 83.0%: **3.37**
- COP 2.0 against 85.7%: **2.33**

**Carbon adder on gas**, using 0.18231 kg/kWh:

- £49.41/t: about 0.90 p/kWh
- £59.77/t: about 1.09 p/kWh
- €75.28/t: about 1.37 c/kWh
- €100/t: about 1.82 c/kWh

**Reading.** At COP 2.8, HotGreen beats a gas boiler on running cost at EU27 average, German, Dutch, French and Belgian industrial prices, before any carbon price. At UK average official prices it doesn't, even with the UK ETS price added (for example Large: 23.925 ÷ (4.456 + 0.90) = 4.47, still above 3.27). The UK case depends on:

- the site's actual contract prices, which the calculator has to let users enter
- on-site or PPA electricity
- the 2026 wholesale gas rise that isn't in the official data yet
- BICS eligibility, which rules out most F&B
- an internal carbon price such as CCEP's €100/t

This is arithmetic on published averages. It isn't a finding about any specific site.

### 3.4 Honest defaults and caveats for the calculator

- **Let users edit every input.** Show the official default beside each one, with its source and date, the way Qpinch date-stamps its commodity panel. Update the DESNZ defaults each quarter (next due 29 Sep 2026) and Eurostat twice a year.
- **Ask whether the site is in the UK or EU ETS.** Only apply the ETS price if the answer is yes. Otherwise offer an optional "internal carbon price" field.
- **Keep the basis consistent.** UK gas prices and the 0.18231 factor are both gross CV. DOE's 85.7% is also gross (HHV). ETL's 92% is net.
- **Report Scope 1 avoided and Scope 2 added separately**, with the location-based grid factor. Many buyers like CCEP buy renewable electricity (RE100), so their market-based Scope 2 is lower.
- **HotGreen's own inputs must come from HotGreen.** COP at a stated source and sink temperature (the brief says up to 2.8), turndown, and parasitic loads. The website's "4x", "30%" and "€250k" claims need reconciling with COP 2.8 first (0.0).
- **Leave out anything without a public source for now.** That covers capex, maintenance cost, grant percentages, and wholesale forward curves.

### 3.5 Gaps and things we couldn't verify

- The GEA eCalculator's inputs and outputs are hidden behind a contact form. We didn't submit it.
- unilever.com and cocacolaep.com blocked our fetcher. CCEP facts came from its SEC filing instead.
- We found no public figure for typical in-use (seasonal) efficiency of UK industrial steam boilers, so treat 85.7% as a combustion ceiling.
- EU country grid emission factors weren't extracted.
- Current (Q3 2026) official UK non-domestic prices are due 29 Sep 2026, four days after this note.
- "Futurebay" as named in the brief couldn't be identified as an industrial heat pump company.
