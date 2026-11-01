# Breakout Box host calculator, sourced defaults

Read 2026-11-01. Every id below is a row in `data.json` in this folder, with the exact sentence and URL. Every output on the page is an estimate and the page has to say so next to the result.

## What the page works out

```
plays per month    = stays per month × share of stays that play
earnings per month = plays per month × price per play
rent, net a month  = earnings per month − £60                 (p2_rent_price)
buy, payback       = £350 ÷ earnings per month, in months     (p1_buy_price)
yearly earnings    = earnings per month × 12
```

The host keeps all of it and sets the price (p3_revenue_share, whose note quotes "You set the pricing and the contents for the boxes."). Games beyond the two sets that come in the box (p6_contents), and the snacks and drinks that fill it, cost extra and aren't priced on their page (p7_supplies_extra). That's why there's an optional fill cost below.

## Slider 1. Stays per month

**Default 2.5 stays a month for one let. Range 0.5 to 8, step 0.5.** Estimate.

No source publishes stays per month, so it's derived as occupancy × days in the month ÷ average stay.

Holiday cottage market, Key Data UK index, 2025 (k1 to k10)

| Month 2025 | Occupancy | Nights booked | Average stay | Stays |
|---|---|---|---|---|
| July | 54% | 0.54 × 31 = 16.7 | 5.2 | 3.2 |
| August | 61% | 0.61 × 31 = 18.9 | 5.3 | 3.6 |
| September | 54% | 0.54 × 30 = 16.2 | 5.3 | 3.1 |
| October | 43% | 0.43 × 31 = 13.3 | 4.8 | 2.8 |
| November | 27% | 0.27 × 30 = 8.1 | 4.5 | 1.8 |
| Average July to November | | | | 2.9 |

Whole UK short let market, VisitBritain with Lighthouse data (m4 to m22). This includes city flats and long stays, so stays run longer and turnovers lower.

| Month | Occupancy | Average stay | Stays |
|---|---|---|---|
| June 2025 | 43% | 6.7 | 0.43 × 30 ÷ 6.7 = 1.9 |
| July 2025 | 48% | 6.3 | 0.48 × 31 ÷ 6.3 = 2.4 |
| August 2025 | 54% | 6.9 | 0.54 × 31 ÷ 6.9 = 2.4 |
| November 2025 | 37% | 9.1 | 0.37 × 30 ÷ 9.1 = 1.2 |
| December 2025 | 40% | 7.4 | 0.40 × 31 ÷ 7.4 = 1.7 |
| January 2026 | 35% | 13.6 | 0.35 × 31 ÷ 13.6 = 0.8 |
| March 2026 | 37% | 8.1 | 0.37 × 31 ÷ 8.1 = 1.4 |
| May 2026 | 45% | 6.4 | 0.45 × 31 ÷ 6.4 = 2.2 |
| June 2026 | 47% | 6.7 | 0.47 × 30 ÷ 6.7 = 2.1 |

Floors and ceilings that bound the slider

| Check | Arithmetic | Stays a month |
|---|---|---|
| England business rates test, 70 nights let a year (g6), at the 5.5 night Sykes group stay (a1) | 70 ÷ 5.5 ÷ 12 | 1.1 |
| Wales business rates test, 182 nights let (g7) | 182 ÷ 5.5 ÷ 12 | 2.8 |
| Best Sykes location's average, Castleton, 51 bookings a year (s2) | 51 ÷ 12 | 4.3 |
| Busiest Cornwall cottage in its agency, 61 bookings in 2025 (a4) | 61 ÷ 12 | 5.1 |
| Glamping cabin at 65% occupancy (gl4, 2022 data) and a 2.67 night stay (gl1) | 0.65 × 30.4 ÷ 2.67 | 7.4 |
| Cross check, Sykes takes about 128 people per property a year (s5). At an assumed 3.5 people a booking | 128 ÷ 3.5 ÷ 12 | 3.0 |

Why 2.5. It sits under the Key Data July to November average of 2.9, which leaves out the quiet January to March months, and above the whole market figures, which carry long city stays. The 8 ceiling covers a glamping unit with short stays. A top cottage does about 5.

**Optional fourth control, units sharing one box, 1 to 10, default 1.** The box fits in a car boot and sets up in under 10 minutes (p5_setup_portable), so one box can serve several cottages or pods on one site. Total stays = stays per unit × units. The page doesn't say this, it's our inference from portability, so label it that way.

## Slider 2. Share of stays that play

**Default 20%. Range 5% to 60%, step 5.** This is an assumption for the host to set. We found no source that measures how many guests pay for an in stay game. Say so on the page.

What it's anchored to

* Families and adult groups make up 26% + 29% = 55% of Sykes group cottage bookings, couples 42% and solo 4% (a2). That 55% is the natural team audience, so it's a sensible upper reference for a cottage.
* Glamping is couples first and only about 13% of bookings bring children (gl2). Use 10% or less for pods.
* The one conversion rate we could open is 10.8% for hotel upsell offers, a vendor figure from 2020 (x4). That's weak, and only a lower anchor.
* Only 17.6% of short lets sell any extra at all (x1), so most guests have never been offered one.
* Rain is the draw. In July a 5.5 night stay expects about 1.7 rainy days in Camborne (9.80 ÷ 31 × 5.5), 1.9 in Aberporth (10.67 ÷ 31 × 5.5) and 1.9 at Valley on Anglesey (10.50 ÷ 31 × 5.5) (r1 to r3). Ambleside gets 2,103 mm of rain a year, about twice Camborne's 1,076 mm (r4). In one small 2023 survey of a holiday park's own audience, 41% said rain hit their plans while away (r5).

Why 20%. About 1 in 3 of the 55% who arrive as families or groups (0.55 × 0.36 ≈ 0.20). Twice the hotel upsell rate seems fair for a rainy day game that's sitting in the house, but that's a judgement, not data.

## Slider 3. Price per play

**Default £40 per team. Range £15 to £100, step £5.** Estimate, the host sets it (p3_revenue_share).

| Where | 2 players | 4 players | 6 players | id |
|---|---|---|---|---|
| Cliffhanger Rooms, Lake District | £56 | £88 | £108 | e1 |
| Locked In, Camborne, Cornwall | £60 | £104 | £132 | e2 |
| Escape Hunt, Leeds | £60 | £92 | £126 | e3 |
| Escape Hunt, Oxford Street, London | £84 | £144 | £186 | e4 |
| Escape Hunt print and play game at home | from £14.99 | | | e5 |

Venue totals are per person prices × players, our multiplication. Breakout Box is played by teams of up to six for 60 to 90 minutes (p4), the same team size venues use (e6).

Why £40. A family of four pays £88 in the Lake District and £104 in Cornwall, so £40 is under half that, without the drive. It's well above a print at home game, because the box comes with locks, props and snacks. £15 at the bottom matches the print at home price, £100 at the top matches a local venue for four.

## Payback at the defaults, one let

2.5 stays × 20% = **0.5 plays a month**. 0.5 × £40 = **£20 a month**, **£240 a year**. Estimate.

**Renting at £60 a month.** £20 − £60 = −£40 a month, −£480 a year. It never pays back at these defaults. Renting breaks even at £60 ÷ £40 = 1.5 plays a month, which needs 1.5 ÷ 0.20 = 7.5 stays a month, or 60% of stays playing at 2.5 stays.

**Buying at £350.** £350 ÷ £20 = **17.5 months** to pay back. Year one ends at £240 − £350 = −£110. By the end of year two it's £480 − £350 = +£130 ahead, then £240 a year. That's before extra games or supplies (p7).

**With a £5 fill cost per play** (snacks and drinks, an assumption, the host sets it). 0.5 × (£40 − £5) = £17.50 a month. Buying pays back in £350 ÷ £17.50 = 20 months. Renting loses £42.50 a month.

## Two example setups worth showing as presets

Both are estimates and the numbers for each come from the sliders above.

| Setup | Stays a month | Play share | Plays | Earnings a month | Rent net a month | Buy payback |
|---|---|---|---|---|---|---|
| One cottage (default) | 2.5 | 20% | 0.5 | £20 | −£40 | 17.5 months |
| Busy month, one cottage (Key Data August, k2 and k7) | 3.57 | 20% | 0.71 | £28.56 | −£31.44 | 12.3 months |
| Three cottages sharing one box | 7.5 | 20% | 1.5 | £60 | £0 | 5.8 months |
| Glamping site, 4 pods at 6.7 stays each (gl4 2019 59% occupancy, gl1) | 26.9 | 10% | 2.7 | £107.52 | +£47.52 | 3.3 months |

## The flag for Raka

At the sourced single cottage defaults, renting loses money and buying takes about 18 months to pay back. The box only earns its rent where it serves several units, so a glamping site or a host with three or more lets. The page can say that plainly. It's a stronger pitch to multi unit sites than to single cottages, and that matches who the product page says it's for, hospitality in general (p8_settings_named). Neither the Breakout Box page nor their home page, both fetched 2026-11-01, mentions holiday lets, glamping, cottages or hotels by name (a grep for "escape" and "hospitality" found them, so the check works). That targeting came from the brief.

## Why an extra earner matters now, for the page copy

* The Furnished Holiday Lettings tax regime ended on 6 April 2025 for Income Tax and Capital Gains Tax (g1, g2). Mortgage interest relief is now limited to basic rate (g3). HMRC expects it to raise £120m in 2026 to 2027, rising to £210m in 2028 to 2029 (g4).
* Rising operational costs are owners' top worry (s3).
* Supply is up 4% year on year to 441,193 UK short lets in December 2025 (m1), and "Most of 2025 has seen occupancy rates decline compared to the previous year." (m13). Key Data calls it "a more price-driven market" (k11).
* Owners are already spending to win bookings. 32% upgraded tech or entertainment, the most common improvement (s4).

## Market numbers the page can use, all estimates

* 441,193 UK short term rental properties, December 2025, with 74,000 in the South West (m1, m2). Do not use any 2026 count, VisitBritain withdrew them (m3).
* £25,600 average gross income for a Sykes holiday let in 2025 (s1).
* Average daily rate £330 in August 2025 and £343 in June 2026, per property per night (m24, m26).
* Glamping is the second fastest growing property type at Sykes (s6). Market size USD 131.5m in 2025 from a paid IMARC summary (gl6), forecast up to £380m by 2032 from a Glampingstays survey (gl7). Treat both sizes as context, the methods aren't public.

## What we could not source

* **Share of guests who'd pay for an in stay game.** Nothing measures it. Slider 2 is an assumption and the page must say so.
* **A UK wide year round turnover figure for holiday cottages.** Derived above from monthly occupancy and stay length. Key Data only covers July to November 2025 in the edition we could open.
* **Average party size.** Only property capacity (m28, 29% of booked nights at 1 to 2 guest homes, 41% at 3 to 5, 30% at 6 or more) and booking type (a2) were found.
* **UK glamping site count and current glamping occupancy and nightly rate.** The latest occupancy we could open is 2022 (gl4). The only nightly rate is one showcased listing at £171 (gl5). Pitchup's pricing page blocked us. Glampingstays' own report returned 403, so its figures come through FarmingUK.
* **Small hotel stays per month.** England hotel room occupancy was 79% in 2025 (h1) but no small hotel stay length could be opened, so hotels set their own stays.
* **Lake District rain days.** The Ambleside station publishes rainfall in mm but no rain day count (r4).
* **Cost of extra games and supplies.** Not priced on the Breakout Box page (p7). The £5 fill cost is an assumption.
