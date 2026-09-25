# Evidence ledger for proposal-v1 and fix-list-v1. Internal

Every fact in the two client documents, where it comes from, and the three checks run on 25 September
2026. Check 1 reopens the source. Check 2 tries to prove it false. Check 3 confirms it a second way that
can't fail the same way. Inference and plans aren't listed, only things HotGreen could check.

Before sending, rule B in `docs/RULES.md` section 1 applies. Every fact below gets reopened again in the
minutes before the send, and one that fails stops it.

## Their own words, from the call

| Claim in the proposal | Source | Check 1 | Check 2 | Check 3 |
|---|---|---|---|---|
| Investors come first | transcript, "investors on board" | Phrase found in `transcript-2026-09-24-call1.md` | Read the whole answer, she chose investors "if I had to choose one", not exclusively | Raka's recap email of 24 Sep says "investors (seed round priority)" |
| Seed around Q3 2027 | transcript, "mid to end of 2027. So kind of water 3 [quarter 3]" | Found | She says it slips if the deployment slips, so the proposal says "planned for around" | Recap email names the seed round as priority |
| First unit into a CCEP site in the first half of 2027 | transcript, "quarter one quarter 2 of 2027" | Found | Checked the grant runs to 31 May 2027, consistent | UKRI grant record says install and test at a CCEP site |
| Customers come through industry contacts and accelerators, outbound after real world data | transcript | Both phrases found | No contrary statement in the call | Georgia's Climate Week ask for introductions (snippet only) is consistent |
| "a very credible and reliable equipment provider rather than a startup" | transcript | Found verbatim | Quoted exactly, no edit | Recap email says "position Hotgreen as a real player, not a startup" |
| Not wanting to lose what makes it different | transcript, "we're not afraid to be different" | Found | Paraphrase, not a quote | Same passage mentions the unusual name |
| Quick fixes in house | transcript, "try my best to do that myself" | Found | Conditional on Framer access from Georgia, the proposal doesn't claim more | Recap email lists SEO and the press page as quick wins |
| Calculator wish, Scope 1 to 3 and ETS wish | transcript | Both phrases found | "one, two, 3 missions" read as Scope 1, 2 and 3 emissions, the only sensible reading next to "ETS" | Recap email mentions "that cost-savings calculator you mentioned" |
| Monthly investor email | transcript | Found | It's Georgia's, stated by Sanya | Only source, marked as their own statement |
| Published brand guidelines | transcript, "We follow those for now" | Found | The question line may be Sanya saying "We do have", either way guidelines exist | Only source |

## Public facts about HotGreen

| Claim | Source | Check 1 | Check 2 | Check 3 |
|---|---|---|---|---|
| CCEP's 2025 annual report names HotGreen as one of three startups it invested in that year | CCEP FY2025 Form 20-F, SEC EDGAR, https://www.sec.gov/Archives/edgar/data/1650107/000165010726000029/cce-20251231.htm | Fetched, text reads "In 2025, we invested €1.7 million in three start-ups ... Hot Green" | Checked the wording says invested, not trialled | Empirical's release names CCEP as a strategic participant in the round |
| UKRI lists an Innovate UK grant for a 50 kW thermal demonstration at a CCEP site, June 2026 to May 2027 | https://gtr.ukri.org/projects?ref=10192195 | Page reads "50-kWth", "install and test their technology at the site of ... CCEP", funded period May 26 to May 27 | GtR API fund record gives 1 Jun 2026 to 31 May 2027, so "June to May" is right and "May to May" was wrong | API and HTML page are different endpoints |
| Empirical, Tech.eu and Vestbee cover the raise | the three article URLs in `research/linkedin-news.md` | All three fetched, titles name the £1.2M raise | NZTC page removed from this sentence, it doesn't mention the raise | Companies House SH01 shows £1,200,001.50 allotted Oct 2025 |
| Homepage says "Some of our key funders and partners are" then logos, no names in text | live homepage, fetched 25 Sep | Phrase found, and Empirical, CCEP, Coca, Europacific, Ponderosa, Innovate UK all count zero | Positive control, the same search finds "Pasteurisation" and "mission" | Site audit screenshot of the logo row |
| The raise, the grant and the demonstrator aren't mentioned | live Home, Solutions, Contact | Whole word search for trial, pilot, grant, demonstration, raise, funding all zero | First pass matched "trial" inside "industrial", caught and redone as whole words | Control, "industrial" found 12 times as a whole word |
| Solutions says "Reduce your energy bill by 30%" | live Solutions page | Found | Only one savings percentage on the page | Site audit recorded the same |
| LinkedIn says 40% "compared to competitors" | linkedin.com/company/hotgreensolutions, rendered | Found, "reduce energy costs by 40% compared to competitors" | The basis is competitors, not a boiler, so the proposal says so | Earlier agent render recorded the same sentence |
| Empirical says "up to 50% energy savings" | Empirical release | Found | The basis is waste heat recovery, the proposal says they measure different things | Tech.eu gives other figures again, not used |
| 100+ guidance quote | https://www.100accelerator.com/faq | Found verbatim | It's their application FAQ, the proposal calls it guidance, not a rule for alumni | Only source |
| HotStack 120 and 220 specs sit inside one image | live Solutions page | "HotStack 120", "2 bar", "25 bar", "4.5", "0.5MW" all zero in the text | Control, "30%" and "waitlist" found on the same page | The image itself was opened and read |
| Five applications | live homepage | Pasteurisation, Brewing, Distillation, Drying, Sterilization found | Their spelling is Sterilization, the proposal writes sterilisation in British English | Site audit list |
| The Innovate UK project runs to 31 May 2027 | GtR API fund end timestamp | 1811718000000 converts to 30 May 2027 23.00 UTC, which is 31 May in the UK | Checked the time zone | GtR page says "May 27" |

## Market and legal facts

| Claim | Source | Check 1 | Check 2 | Check 3 |
|---|---|---|---|---|
| EU €1bn heat auction opens early December 2026 | Commission news, 24 Sep 2026 | Found | Checked it's the call terms, not the opening itself | IF26 terms PDF |
| Heat pumps with a COP of at least 1.5 get a 25% ranking bonus | IF26 terms PDF | "deploy heat pump(s) with Coefficient of Performance (COP) of at least 1.5" | The bonus is for ranking only, the proposal says ranking bonus | News page says the auction incentivises efficient heat pumps |
| UK emissions trading register lists 68 food and drink sites run by 50 companies | UK ETS Compliance Report 2026 xlsx | My own count, NACE 10 and 11, 68 open accounts, 50 account holders | Ran it again including closed accounts, 78, and the text says open sites | Two research agents counted 68 open from the same file with their own code |
| UK company staff can be emailed with a privacy notice and an opt out | PECR regulation 22 | "applies to ... electronic mail to individual subscribers" | Sole traders and some partnerships count as individuals, the text says company staff | UK GDPR article 14 covers the notice, regulation 23 the opt out, per the GTM report |
| Germany needs consent before the first email | UWG section 7(2) no. 2 | Statute text read, "ohne dass eine vorherige ausdrückliche Einwilligung des Adressaten vorliegt" | Checked the phone rule is different, presumed consent for businesses | IHK Nord Westfalen, per the GTM report |
| Default energy prices from official statistics | DESNZ QEP table, Eurostat API | DESNZ file says next update 29 Sep 2026, Eurostat gives half year data | None contrary | Both fetched live |

## The fix list

| Claim | Source | Check 1 | Check 2 | Check 3 |
|---|---|---|---|---|
| Company details required on the website | SI 2015/17 regulation 25 | "Every company shall disclose ... on ... its websites", registered number, office, part of UK | Checked it's in force as revised | Companies House guidance, per the platform report |
| Footer stops at "HotGreen™ Solutions is the trading name of HotGreen Ltd" | live homepage | Found | 16035994 and Great Portland count zero on all pages | Site audit |
| HotGreen Ltd, England and Wales, 16035994, 167 to 169 Great Portland Street | Companies House | Overview page read | Registered office changed 19 Dec 2025, the current one is used | The accounts say "(England and Wales)" |
| Privacy notice needed for the form | UK GDPR article 13 | Article read | Checked the form collects names and emails | ICO guidance, per the platform report |
| Complaints route since 19 June 2026 | ICO statement, 5 Feb 2026 | "complaints procedure which is due to commence on 19 June 2026" | Date has passed, so it applies now | Clifford Chance and others, search results |
| No privacy page | live site | "privacy" zero on three pages, /privacy and /privacy-policy return 404 | Control, the same fetch returns 200 on real pages | Site audit |
| Framer analytics runs | live homepage | `events.framer.com/script` found | Only one instance | Site audit third party list |
| Same title on all pages including the 404 | live pages | All read "HotGreen Solutions", /news 404 too | Checked the 404 is a real not found page | Site audit |
| 62 images with no alt text | live pages | 42, 14 and 6, all empty | Counted every img tag, not a sample | Site audit, same numbers |
| Seven partner logos, seven team photos | homepage | Seven names on the team, seven logos in the audit image | Logo count from the audit image, not recounted today | Team list read today |
| Message field named "lastname" | live contact page | textarea name="lastname" | Both forms on the page, same result | Site audit |
| "First name*" not required | live contact page | Label reads "First name*", input has no required attribute | Last name, Email and Message do carry it | Site audit |
| Sera's LinkedIn icon opens Ben's profile | homepage | Ben's URL appears twice, no URL for Sera | One more team card than LinkedIn URLs | Site audit hover screenshot |
| "Currently taking 2026 orders for 2027 delivery" | spec image | Read in the image | It's in the image, so no text search possible | Site audit |
| Hero video 19.4 MB | framerusercontent mp4 | HEAD, content-length 19,361,712 | Range request gives the same total | Last modified 9 Sep 2025 |
| Fonts load from Google | homepage | 13 references to Google font hosts | Checked they're font requests, not a Google tag | Site audit third party list |

## Astra copy

The Astra and Amwisesa paragraph, the Pertamina sentence, the disclosure line and both bios are copied
from the live SotoCat deck (https://astra-sotocat-deck.netlify.app), which carries Raka's approved
wording. They're partner claims per `docs/partner/amwisesa-credentials.md`, not rechecked here.

## Left out on purpose

- Every price and delivery time. Raka and Josh set those.
- The 100+ Demo Day. The 2026 date isn't published.
- Anything about UK economics at average energy prices. Internal only, see `../opportunities.md` section 3.
- Competitor names. The competitor watch is described without them.
- Time saved in hours. No baseline exists, so the proposal promises to measure it instead.

## Web page, rechecked 25 September 2026 (afternoon)

Built as https://astra-hotgreen-proposal.netlify.app (fix list at /fixes). Every source above was
reopened live again before the build, because the rows above were written before a context
compaction. What each recheck found, and every claim that is new or reworded on the web page.

| Claim on the page | Source reopened | Check 2, tried to break it | Check 3, a second way |
|---|---|---|---|
| CCEP's 2025 annual report names HotGreen as one of three startups | SEC EDGAR 20-F, fetched with a declared user agent after a 403 | Document's own title is "Annual Report and Form 20-F 2025", so "annual report" is its own name | Empirical release lists CCEP as a participant in the round |
| Grant is a twelve month project that ends in May 2027 (reworded from "June 2026 to May 2027") | GtR page shows "Funded Period May 26 to May 27", text says "Over 12 months" | API fund record 1780268400000 to 1811718000000 is 31 May 2026 23.00 UTC to 30 May 2027 23.00 UTC, so 1 Jun to 31 May in the UK. The page and the API disagree on the start month, so the page now names only the end | Two endpoints, HTML and API |
| "Some of our key funders and partners are" then logos | home.html by curl, and rendered in Chromium | Names of all seven backers count zero in the text, positive control "industrial" 12 and "Pasteurisation" 1 | Rendered DOM lists 7 logo images with no alt, logos opened one by one and read (CCEP, Empirical, Deep Science Ventures, First Imagine!, Conduit EIS Impact Fund, Almanac Ventures, Net Zero Technology Centre) |
| Raise, grant and demonstrator not mentioned on any page | All pages in the sitemap (three, /, /contact, /solutions) | Whole word search for trial, pilot, grant, demonstration, demonstrator, raise, raised, funding, investment, all zero | Sitemap lists exactly three pages, so "any page" covers the site |
| 30% on Solutions, 40% on LinkedIn, up to 50% at Empirical | Solutions page text, LinkedIn company page rendered, Empirical release | First count used word boundaries and returned 0 for "30%", a failed detector. Redone without them, 3 hits | LinkedIn render positive control, "HotGreen" 38 times |
| €250k per typical facility on Solutions, $250,000 per MW on LinkedIn (new) | Solutions page "€250k /year saved in energy bills versus using a traditional boiler for a typical facility", LinkedIn "equivalent to $250,000 savings per MW annually" | Checked the bases differ (typical facility against per MW) and the currencies differ | Both read from rendered text, not snippets |
| Phone Solutions page opens with "Introducing the HotStack 300" (new, fix list 09) | Rendered at 390 px | Desktop render reads "Introducing the HotStack", spec image names HotStack 120 and 220 | Phone screenshot opened and read |
| Product pages piece says "each HotStack model" (reworded from naming 120 and 220) | Same renders | The site names three models across breakpoints, so the piece no longer names any | |
| Spec table is one image, availability line reads "Currently taking 2026 orders for 2027 delivery" | Solutions rendered, table cropped and read | "HotStack 120", "2 bar", "25 bar", "0.5MW" all zero in the text | Screenshot crop on the page is from this render |
| EU heat auction "expected to open in early December 2026" (reworded from "opens") | Commission news 24 Sep 2026, "expected to open to bidders in early December 2026" | Wording matched to "expected" | IF26 terms PDF, 15 pages |
| COP of at least 1.5 gets a 25% bonus when bids are ranked | IF26 PDF, "bid bonus of 25% (i.e. reduction of the bid price for the purpose of ranking only)" and "heat pump(s) with Coefficient of Performance (COP) of at least 1.5" | Ranking only, the page says "when bids are ranked" | Commission news says the auction rewards efficient heat pumps |
| 68 food and drink sites run by 50 companies | UK ETS Compliance Report 2026 xlsx, NACE 10 and 11, OPEN | 78 including closed, 10 closed | Second method by NACE description found 56, and all 12 code only rows are food activities the keyword list missed (dairies, tea and coffee, fish, condiments). Control, NACE 24 steel 27 open |
| UK company staff can be emailed with a privacy notice and an opt out | PECR reg 22(1) "individual subscribers" | ICO B2B page, sole traders and some partnerships count as individuals | ICO B2B page, "give a valid address for business to opt out", "you must tell them" under UK GDPR |
| Germany needs consent before the first email | UWG section 7(2) no. 2 text | Phone rule differs (presumed consent for businesses), email does not | |
| Privacy notice, now "article 13 requires privacy information at the point you collect them" | legislation.gov.uk article 13(1) "at the time when personal data are obtained" | | |
| Since 19 June 2026 the notice has to tell people they can complain to you (reworded, more precise) | Article 13(2)(ca) as amended, "the right to make a complaint to the controller under section 164A" | DPA 2018 s164A(2), controller must facilitate complaints "such as providing a complaint form" | ICO DUAA page, updated 19 June 2026, all data protection provisions in force |
| Company details HotGreen Ltd, 16035994, 167 to 169 Great Portland Street, 5th Floor, London W1W 5PF | Companies House overview | Registered office is the current one | Sanya's own email signature of 25 Sep carries the same number and address |
| No privacy page | Sitemap has three pages, /privacy and /privacy-policy 404 | Control, the three sitemap pages return 200 | "privacy" and "cookie" zero on all three pages |
| 62 images, none with alt text | Raw HTML, 42 + 14 + 6 img tags, no alt attribute at all | Every tag counted | Rendered DOM, every visible image alt empty |
| Message textarea named "lastname", First name not required | Raw HTML of all three pages | Both forms per page | Rendered form |
| Sera's LinkedIn icon opens Ben's profile | Rendered homepage, each visible /in/ link climbed to the card holding exactly one name | Positive control, the other six cards resolve to their own person | Six personal LinkedIn URLs for seven people in the raw HTML |
| Homepage video 19.4 MB | HEAD 19,361,712 bytes | Content type video/mp4 | Last modified 9 Sep 2025 |
| Titles all "HotGreen Solutions", including the 404 | /news rendered, 404 status, same title | | |
| Sanya spotted titles, alt text and image only text herself (fix list 03) | Transcript line 124 | | |
| Transcript facts (seed Q3 2027, first unit H1 2027, inbound, quote, quick fixes, calculator, Scope and ETS, monthly email) | Transcript lines 106, 114, 138, 174, 184, 188, 200, 214, 240, 244 | Each read in context | Recap email of 24 Sep (Gmail thread 1a0d2d5971a63502), no newer message in the thread |
| Astra and Amwisesa copy, captions and bios | Live SotoCat deck, fetched and every sentence matched | Pertamina sentence reworded, same facts | docs/partner/amwisesa-credentials.md and docs/astra-company-profile.md |

**Changed from proposal-v1.md on the page.** "Your news page, filled" became "Press kit and coverage pack",
because Sanya said she'd build the news page herself. "Monthly progress, in public" is now placed in
October and November (v1 left it out of the timing table). The grant wording, the auction wording and
the product page wording are as in the table above. One new sentence on €250k against $250,000.

## Version 2 of the page, families A to F with a sketch per piece (25 September 2026, evening)

Raka's changes. C is "Increase your credibility", D is "Let prospects and investors see the proof", E is
"Optimise your inbound and outbound flow", section 4 is "The timeline", simpler language, and a picture of
every group and every piece. New facts that appear only in the sketches, each reopened today.

| Fact in a sketch | Source reopened | Check 2 | Check 3 |
|---|---|---|---|
| SDE++ opens 27 Oct and closes 26 Nov 2026, budget €8bn | rvo.nl/subsidies-financiering/sde/aanvragen, "Startdatum dinsdag 27 oktober 2026", "Einddatum donderdag 26 november 2026", "Totaal budget € 8.000.000.000" | RVO news of 6 Jul 2026 says the round moved a month later, to 27 Oct to 26 Nov | Same dates in the news item, a different page |
| SDE++ industrial heat pump category, at least 500 kWth, COP at least 2.3, halogen free refrigerant, heat used on the same site | rvo.nl CO2 arme warmte page, "Industriële warmtepomp", "minimaal 500 kWth", "COP van minimaal 2,3" | The 2.5 figure on the same page is for other categories (aquathermie, air to water), not this one | Research file 4 recorded the same thresholds on 22 Sep |
| Press dates and headline openings, Empirical 20 Oct 2025 "Hot Green raises £1.2m", Tech.eu 20 Oct 2025 "HotGreen Solutions raises £1.2M", Vestbee 21 Oct 2025 "British HotGreen Solutions raises £1.2M" | The three pages fetched today | Headlines shown only up to the first hyphenated word, with an ellipsis, never reworded | Empirical's own text dates the announcement 16 October, the post is dated 20 Oct, the sketch uses the post date |
| Heat auction subsidy paid for up to five years | Commission news, "fixed premium subsidy ... for up to five years" | IF26 terms, "grant duration will end 5 years after the Entry into Operation" | Two documents |
| 68 UK sites by type, oils and fats 10, dairies 8, spirits 8, potatoes 6, beer 5, sugar 5, malt 5, grain milling 4, eleven other types 17 | UK ETS Compliance Report 2026 xlsx, open accounts, NACE 10 and 11 | Counted twice, by the parsed records and by a raw row pass, identical per code | Sum closes at 68. Bar widths measured in the render, 10.2 px per site on every bar |
| HotStack spec values in the product page sketch | The spec image on the Solutions page, cropped and read today | Values copied cell by cell, "0.5MW stackable up to 10MW" written as "0.5 MW, stackable up to 10 MW" | Earlier site audit read the same table |
| "Install as quick as 3 to 5 days with the air source module" | Solutions page text, "Using our airsource module, we can install your heat pump in as quick as 3-5 days" | The air source qualifier is kept | |
| Mission line and "replace a traditional boiler, existing pipework, no need to redesign" | Homepage and Solutions page text | Paraphrased only where the sketch is labelled a sketch | |
| Product image and logo | framerusercontent.com files used on their own site | Credited in the footer as HotGreen's own | |

Sketch content that is invented to show a layout is labelled on the sketch itself as Example, Example rows,
Example draft or Sketch. Nothing invented shows a number about HotGreen's savings, every result box says
"from your model".
