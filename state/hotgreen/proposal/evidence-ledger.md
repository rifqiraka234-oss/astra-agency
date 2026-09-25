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
