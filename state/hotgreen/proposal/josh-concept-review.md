# Review of Josh's HotGreen concept site, 28 September 2026

Site: https://hotgreen.astraagency.nl (login held by Raka and Josh, not stored here). Signed in and crawled
40 pages in Chromium, plus the full text of both decks including hidden slides. Every claim below was
checked against a source reopened today.

## What it is

A menu page ("Set menus" Seed-Ready, Pipeline, Pilot Launch, plus à la carte items) where most items link
to a working concept in HotGreen's style. A full redesigned HotGreen site (home, solutions, investors, news,
careers, pilot programme, contact, privacy, cookies, terms, accessibility), six working tools (savings
calculator, gas bill estimator, fit check, configurator, ROI report, pilot and fleet dashboard) and
collateral (seed deck 16 slides, sales deck 12 slides, one-pager, LinkedIn carousels and posts, social images).

## What checks out

| Claim | Source reopened |
|---|---|
| Spec table, COP 2.8 and 4.5, 2 bar and 25 bar, 0.5 MW to 10 MW, 2026 orders for 2027 delivery | HotGreen spec image, ledger rows 38, 70, 141 |
| €250k, 1,500 t CO2 per MW, 30%, 3 to 5 day install | Live Solutions page, fetched and rendered 25 Sep |
| 19% of global emissions, 150 years, mission line | Live homepage text, 25 Sep |
| Georgia's "elephant in the climate-tech room" quote | Empirical release, refetched 28 Sep, word for word (trimmed at the start) |
| Team bios, Charles Clark IAM300, Corey Blackman SaltX, Georgia ex Oliver Wyman and Hexxcell | HotGreen team section, research/linkedin-news.md rows 244 to 250 |
| Founded 2024 | Companies House, incorporated 23 Oct 2024 |
| Calculator and sales deck arithmetic | Recomputed. 2 MW, 6,000 h, gas 40, power 110, boiler 85%. Air €93,277 and 17%, waste heat €271,373 and 48%, break even ratios 3.3 and 5.3. CO2 figures imply 0.183 t/MWh gas and 0.150 t/MWh power |

## What is wrong or unsupported

0. **UK IETF offered as a funding route** in the sales deck (slide 10), the ROI report, the subsidy guides
   and LinkedIn post c7. gov.uk, last updated 25 June 2026, "IETF closed, July 2025 ... No successor fund
   is planned." Reopened 28 Sep 2026. The live UK routes are capital allowances, full expensing for
   companies (new plant bought from 1 April 2023) and the 40% first year allowance (new main rate plant
   bought from 1 January 2026), both reopened on gov.uk 28 Sep 2026.

1. **Pilot date "End 2026".** On the home milestones, investor stats, news facts, one-pager, seed deck
   (slides 9, 11, 12), sales deck (slide 9) and a social image. Sanya on 24 Sep, transcript line 106,
   "aiming to deploy around quarter two, quarter one quarter 2 of 2027". The Innovate UK project runs to
   31 May 2027. Should read first half of 2027.
2. **Funding stops at October 2025.** Every page gives £1.2M pre-seed as the funding. Companies House SH01
   shows a second allotment on 12 June 2026 (£708,065.28 at £49.92 a share), and HotGreen's own LinkedIn
   post of 18 June 2026 announces "an acceleration round" with Ponderosa Ventures. Ponderosa is on no page
   and in no backer row. The amount was never published, so mention the round, not the figure.
3. **"Patent-pending" IsoStack.** On the investors page, one-pager, press boilerplate and seed deck
   slide 5. Not on HotGreen's site, not in the Empirical release. research/opportunities/6 and 1 list it
   as unverified. Ask HotGreen before it's used.
4. **The Innovate UK grant and the 100+ Accelerator appear nowhere.** Both are among their strongest
   public proof points. The grant is GtR project 10192195, £399,076, a 50 kWth heat pump installed and
   tested at a CCEP site. HotGreen was selected for Cohort 7 of the 100+ Accelerator (company post
   27 May 2026), which is AB InBev's programme co-sponsored with The Coca-Cola Company, Colgate-Palmolive,
   Danone, Mondelēz and Unilever (100accelerator.com, 28 Sep 2026). CCEP is not a sponsor, so never
   write "CCEP accelerator". CORRECTED 28 Sep 2026, the first version of this row said "CCEP 100+
   Accelerator", which was wrong.
5. **Internal inconsistencies.** Emissions share 19% on home and one-pager, "19 to 20%" on investors.
   Boiler efficiency 90% on home, 85% in the calculator and sales deck.
6. **Placeholders we can already fill.** Company number 16035994 and registered office 167 to 169 Great
   Portland Street, 5th Floor, London W1W 5PF (Companies House).
7. **House writing rules.** 59 em or en dashes and about 94 colons across the pages, which CLAUDE.md
   bans in anything we ship. Hyphenated compounds throughout as well.
