# Jan Forster Estates, instant valuation tool. Notes and handover

Built 2026-10-09 for Melissa Carman (Jan Forster Estates, Dennison Property Services Ltd 16809033, contact ctc_fyP4ArYJKGDxjPL8u).
Live: https://astra-janforsterestates-prototype.netlify.app
Netlify site id 5520c12a-2f8d-4fb9-8796-0886caa1a45d, deploy id 6ac8f30de7e622fbe3540990 (state ready, published 2026-10-09 13:58:47 UTC).
index.html sha256 ded8ab93a2f93e13c88aaee4f6e943d360333952d9ccca4209524b0a41aa2187, 160,506 bytes. Live copy fetched after deploy has the same hash.
Visitor access, SSO team login switched OFF and no password (confirmed in the update-visitor-access-controls response, requiresSSOTeamLogin false). An unauthenticated curl gets the page, not a login.
Nothing was sent to anyone. Not committed (lead session commits).

## What it is

One page, their brand. An owner picks sell or let (their own form's wording), enters an NE postcode, type, bedrooms, condition and up to three extras, and gets an instant range with no email gate.
- Sell. The range is read off real resales of that property type in their postcode sector (30 or more sales), else the postcode district (15 or more), else the council area. Each sale is indexed to July 2026 with the UK HPI for its own council area and type. Answers pick a 30 percentile slice of those sales. Bounds round outward to 2,500 / 5,000 / 10,000 / 25,000.
- Let. ONS PIPR August 2026 average rent for the council area by bedrooms and by type. Range spans the two, at least 6% each side of their mean, then condition (5%) and extras (2% each).
- The result shows the comps as a dot chart with the range drawn as their roof mark, the HPI average and annual change for that type and area, the percentile slice, and the source. Then Book your accurate valuation, routed to Gosforth (sales) or Gosforth (Property Management) (lettings), demo form labelled and sending nothing.
- Story spine. Hero quotes their own 25 Aug article line ("A home is only worth what someone is willing to pay for it."). Section 02, NE3 semis spread (eight in ten between 159,000 and 579,000) with their own quote about the house across the street. Section 03, method and the example weights. Section 04, UK HPI chart, July 2026 averages and Newcastle rents.

## Sources, all fetched 2026-10-09

| Data | Source | Detail |
|---|---|---|
| Resales | HM Land Registry Price Paid Data, pp-2025.csv and pp-2026.csv from price-paid-data.publicdata.landregistry.gov.uk, both last-modified 28 Sep 2026 | NE postcodes, completion dates 2025-08-01 to 2026-07-31, category A only, D/S/T/F only, new builds excluded. 13,058 sales kept (2,986 cat B and 439 new builds dropped). Embedded as prices in units of 500, no addresses |
| Index and averages | UK HPI full file UK-HPI-full-file-2026-07.csv (publicdata.landregistry.gov.uk), July 2026 release published 16 Sep 2026 per gov.uk collection page | Newcastle 207,547 (+4.1%), North Tyneside 205,744 (+6.5%), North East 166,943 (+4.9%), semi Newcastle 238,190 (+5.4%) |
| Rents | ONS Price Index of Private Rents workbook, 16 September 2026 release, Table 1, August 2026 | Newcastle 1,215 (+9.3%), 1 bed 814, 2 bed 1,007, 3 bed 1,194, 4+ 1,837, D 1,697, S 1,263, T 1,293, F 993 |
| Branches | https://www.janforsterestates.com/branches | Gosforth, 29 Princes Road, Brunton Park, Gosforth NE3 5TT, 0191 236 2070. Gosforth (Property Management), Polwarth House, 55 Polwarth Drive, Brunton Park, Gosforth NE3 5NJ, 0191 236 2680. "one focused on property sales and the other specialising in everything related to landlords and tenants" |
| Their words | /valuations ("Why Jan Forster?" four lines, "lastest" typo corrected to latest, "in-depth" written "in depth" for the dash ban), /about/news/valuing-your-property-dont-make-mistake (25 Aug 2026) | Hero line and the across the street quote are verbatim |
| Brand | Their logo.svg and logo-white.svg downloaded byte for byte, favicon-32x32.png. app.css: --primary #EE7328, --dark #465562, --green #2EA1A1, light orange #FFF0E8. Fonts Tenon and IvyMode via Typekit kit csy6ojo | Typekit is domain locked and licensed to them, so OFL stand ins self hosted from Fontsource (Albert Sans for Tenon, Gloock for IvyMode, IBM Plex Mono for labels) |
| Photos | Their own, from their site. images/media/area-guides/Gosforth Area Guide.png (semi with their orange line) and images/media/Sales 2509.png (family kitchen) | Decorative, alt empty, no caption. Neither is captioned as their premises, staff or customers |

## Triple check of the numbers

- NE3 semis headline. ppd.py gives n 237, p10 159,200, p90 579,200. Independent awk pass over the raw CSVs gives the same n 237, p10 159,200, median 278,000, p90 579,200.
- Tool results. An independent Python recompute straight from the CSVs and HPI file (no shared code) gives A NE3 5 semi 3 bed good, n 43, 310,000 to 380,000, and B NE30 terraced 2 bed needs updating, n 94, 265,000 to 340,000. Both match the page.
- HPI. The CSV values match the Land Registry linked data API (landregistry.data.gov.uk/data/ukhpi/region/<area>/month/2026-07.json) for Newcastle, North Tyneside and North East, all fields used. The UK row (272,611, +0.7% month, +1.4% year) matches the UK HPI app page.
- Rents. The workbook values match the ONS local page https://www.ons.gov.uk/visualisations/housingpriceslocal/E08000021/ (1,215, +9.3% from 1,112, 1 bed 814, 2 bed 1,007, 3 bed 1,194).
- Hero dots. 665 NE3 resales and 15 over 1m, same count from the embedded data and from awk on the raw CSVs.

## Teardown, 34 queued, 23 rendered (Playwright, proxy CA pinned, 1440 and 390 screenshots in scratch teardown/)

| Site | What it does well |
|---|---|
| Brunton Residential valuation (lead.pro) | Postcode, type, beds, timing and reason as one stacked card on a Tyne photo. Five fields before any figure |
| Rook Matthews Sayer valuation | Three routes side by side with a Potential Accuracy star rating each. Honest about what an algorithm can and can't know |
| Rightmove sold prices | Sold prices by area as the way in, line illustrations, Instant online valuations as a separate promise |
| Purplebricks | Serif headline, a row of big stats under the hero, Book a free valuation in the nav on every page |
| Purplebricks house valuation (strike.co.uk redirect) | Same stats row, valuation copy written as a question |
| Yopa | Postcode to local branch finder with a map, orange Book a free valuation in the nav |
| Zillow | One field and a huge question headline, then edit your home's details for a more accurate estimate |
| Redfin | Line drawn illustration in one accent colour, nearby sales and trends promised up front |
| Opendoor | Warm full bleed photo, one address field, trust stats in a row under it |
| Chimnie | Illustrated hero, free report per location, search first |
| Mouseprice | Anti reference. Dense dated search panel, broken image icons |
| Sanderson Young (NE rival) | Full bleed Tyneside landscape with a location caption (Axwell Park Road, Blaydon), How much is my home worth link in the hero |
| UK HPI app (Land Registry) | Plain statement of month, price and change. The tone to borrow for citations |
| Your Move | Get the best price, Book a free valuation, or start with an online valuation. Two tiers in one line |
| Savills | Dusk photo hero, type and bedroom filters inline in the search bar |
| Knight Frank | Dark hero, property type tiles with photos (coastal, village, period) |
| Housemetric | Explains its own method in a side panel, price per sqm from Land Registry plus EPC |
| Domain (AU) | Tabbed buy, rent, sold card, clean white search |
| OnTheMarket | Instant valuation and rent checker as tabs beside search, "Find out your home's value, instantly" strip |
| Reeds Rains | Book a free valuation and "or start with an online valuation" as primary and secondary |
| PropertyData | Valuation types as icon cards (house or flat, commercial, HMO) with what each uses |
| Foxtons | "Find out your home's sales or rental value" strip under search, sales and rent in one ask |
| Compass (US) | Big serif headline over architecture photo, one search bar |

Walled or wrong URL, not counted: Zoopla (Cloudflare 403), Hamptons (403), getagent (Vercel 429), Bridgfords (403), Homipi (403), Pattinson (403), Realtor.com (429), Foxtons /valuation 404, Nationwide calculator 404 twice, Purplebricks /instant-valuation 404. Their own site rendered too (home, valuations).

What it led to. Show the figure without an email gate (Brunton and most lead.pro tools gate it). Name the accuracy tier honestly (RMS). Sell and let in one tool (Foxtons, OnTheMarket). Citation tone from the UK HPI app. One accent line drawing language (Redfin), which here is their own roof mark.

## QA, results

- Cold load local, 1440 and 390. 0 pageerror, 0 console errors, 0 bad responses, reveals 39 of 39 fired by scrolling, nothing forced. 4 of 4 images decoded, all 6 fonts loaded. scrollWidth equals viewport at 1440 and 390, no overflow offenders.
- Tool exercised with 10 input sets (scripts/exercise.js). A NE3 5TT semi 3 good 310,000 to 380,000 (sector, 43 sales). B NE30 4BA terraced 2 needs updating 265,000 to 340,000 (district fallback, 94). C ne25 8hy detached 5 renovated with two extras 540,000 to 740,000 (district, 71). D NE2 flat 1 bed 160,000 to 225,000 (outcode only, 108). E NE26 2AB detached 4, too few locally, council area fallback with the quantile bar, 310,000 to 405,000 (351). F let NE6 5HY flat 2 bed 925 to 1,075 a month. G let NE29 semi 3 renovated plus garden 900 to 1,050 a month. H SW1A 1AA, I hello, J NE99 1AA all give the right error and dim the stale result. Booking form, empty submit, missing consent and bad email all caught, valid submit shows the demo confirmation routed to the right branch.
- Screenshots of every section at 1440 and 390, looked at. Fixed on the way, hero lost its side padding, range wrapped off the column, roof line ran through the dots, stats run on, a 1m stack spike, an on chart note overlapping dots, mobile tool sat below the phone block.
- NO-AI-SLOP section 8 grep on the extracted visible copy (846 unique lines across 9 states). No banned words, phrases, hedges, paired adjectives, uncontracted verbs, em dashes, emoji or exclamation marks. On the raw HTML the only word hits are CSS transform properties.
- Colon and dash scan on all visible text, aria labels, alt, title and SVG text, URLs stripped. 0 hits. Contractions present (here's, it's, that's, can't, we'll, we'd, you'll, you'd, you're, I've).
- Scripts parse, local and live download, 2 of 2.
- Live. HTTP 200, title "Instant Valuation | Jan Forster", HTML byte identical to the deployed file (same sha256), all 11 asset paths 200 and byte matched. Live cold load in Chromium at 1440 and 390, 0 page errors, 0 failed requests, 39 of 39 reveals, 665 hero dots, tool run live (NE12 6GD terraced 3 good, 155,000 to 175,000, 46 sales).

## Must not ship as is

1. The weights that move the range (bedroom steps against a usual of flat 2, terraced 3, semi 3, detached 4; condition one step; extras half a step; one step equals 10 percentiles; band 30 percentiles; lettings 5% and 2%). They're ours and labelled Example on the page. Their valuers set the real ones.
2. The booking form is a demo and sends nothing. It needs wiring to their CRM or the existing Book a Valuation endpoint, with their reCAPTCHA and consent wording.
3. Fonts are OFL stand ins for Tenon and IvyMode. Live would use their Typekit kit.
4. The data is a snapshot to July 2026 (prices) and August 2026 (rents). Live needs a monthly refresh job from the same two Land Registry files and the ONS workbook.
5. meta robots noindex is on. Remove at launch.
6. Their "lastest" typo was corrected and "in-depth" written without the hyphen in the four Why Jan Forster lines. Tell them.
7. "Rather talk it through" names both branch numbers from /branches. Confirm they want both on a sales page.

## Things not verified

- Whether Brunton's or RMS's tools return a figure. Not run, as that sends a fake lead to a third party.
- That sell versus let routing matches how their two branches actually split valuation requests. Inferred from the /branches description and footer numbers.
- Recent months in Price Paid are under registered (completion to registration lag), so May to July 2026 sales are fewer than they'll end up being. Stated as registered by the 28 September update in the footer.
