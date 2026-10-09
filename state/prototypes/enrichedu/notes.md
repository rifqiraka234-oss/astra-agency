# Enrich Education Recruitment, per candidate charge breakdown (built 2026-10-09)

For Nick Richards, Enrich Education Recruitment Ltd (Companies House 16119130, active, registered
office 3rd Floor, 86-90 Paul Street, London EC2A 4NE, read 14:05Z). Lead contact ctc_MDdiddoYGMJGaDFHn.
Nothing has been sent. The lemlist thread was NOT pulled by this build session and must be pulled
before any message that links this page.

## Live

- URL https://astra-enrichedu-prototype.netlify.app/
- Netlify site id 0f17ce14-dbe7-4ebc-86f4-7c17e1b01614, deploy id 6ac8f44a1c6d681435b9c200,
  state ready, published 2026-10-09T14:04:00Z, permalink
  https://6ac8f44a1c6d681435b9c200--astra-enrichedu-prototype.netlify.app
- Team SSO OFF and password OFF (requiresSSOTeamLogin false, requiresPassword false), set before
  the deploy and re-read after it.
- index.html sha256 55a1e82a9f0c052b55a563c296c21c4eb9fceae7750dc7cf9c4462c4cbb37f45, 81,804 bytes.
  The live download is byte-identical (no HUD injected on this deploy).

## What it does

1. The agency enters a booking (candidate reference, role, GCA role category, trust, start date,
   days a week, weeks), the candidate's daily pay (PAYE through the agency), the holiday pay basis
   (12.07% rolled up on top, rolled up inside the daily pay, or not rolled up), weekly or monthly
   payroll, under 21, pension enrolled and rate, Apprenticeship Levy, and the fee as pounds a day or
   a percentage of daily pay.
2. It works out each DfE line per day, per week and for the whole booking. Daily pay, holiday pay,
   employer NI and employer pension (both per pay period against the 2026 to 27 thresholds),
   optional levy, then pay and on costs, supplier fee and total charge.
3. It checks the fee against the GCA RM6376 maximum for the role category and says how far under or
   over it is, and what share of the total the fee is.
4. The live document can be printed or saved as an A4 PDF, copied as plain text, or shared as a link
   that opens the breakdown on its own (doc view) for the trust. A batch keeps several candidates on
   the device and prints them one per page.
5. The story around it: DfE's own words on per candidate breakdowns, the £1.4bn spend, DfE's own
   £308 example day split three ways, the eight fee caps as a chart that follows the picked role, a
   live method section (NI and pension threshold diagrams, NI per day by days a week, the 12.07%
   strip) and a rates table where every rate links to its gov.uk page.

## Example and placeholder data on the page (all labelled on the page)

- Example candidate daily pay £110. It sits inside "£105 - £120 Per Day" on Enrich's own KS2 LSA
  advert (https://www.enrichedu.co.uk/jobs/ks2-lsa, read 13:24:55Z). Labelled "Example" in the hero
  card, the field hint and the olive band on the document.
- Example supplier fee £30 a day. Ours, not Enrich's price. Labelled the same way.
- Example role "KS2 LSA", "in Camden, five days a week", 12 weeks, category Support staff, not SEND
  (the advert says "This is not a traditional 1:1 TA position").
- The hero leaf chart is drawn from that example day (£110.00, £13.28, £15.61, £2.98, £30.00, total
  £171.87).
- The example band follows the figures into the batch, the share link, the doc view and the PDF, and
  disappears per figure once that figure is changed (tested).

## Must not ship as is

1. The £110 pay and £30 fee defaults, and the "KS2 LSA in Camden" hero card. Enrich's own pay and fee
   replace them, or the example stays visibly labelled.
2. `<meta name="robots" content="noindex">` comes off when Enrich publishes it.
3. The concept strip at the top, the footer line and "Made with a concept tool by Astra Agency" on the
   document come off or change when Enrich adopts it.
4. The reference number format (EE + date + a 4 character hash of the inputs) is ours. Enrich may want
   its own numbering.
5. Every rate is the 2026 to 27 figure checked 9 October 2026, hard coded as defaults and in the copy.
   It needs updating for 2027 to 28 (April 2027), and whenever DfE changes the fee caps.
6. "Figures exclude VAT" is a statement about this tool. Enrich's VAT position isn't known.
7. Doc view line "A charge breakdown shared with you by Enrich Education Recruitment" assumes Enrich is
   the sender, which is only true once they use it.
8. The method is a straight percentage on earnings above each threshold per pay period. Enrich's
   payroll provider should confirm it matches their own payroll (HMRC table method rounding, pension
   scheme earnings basis, postponement, holiday pay basis). The footer says it isn't tax advice.

## Sources, every one fetched live on 2026-10-09 (UTC)

| What | URL | Fetched | Exact text used |
|---|---|---|---|
| DfE mandate guidance | https://get-help-buying-for-schools.education.gov.uk/guidance-supply-staff-mandate | 13:24:53Z, 200 | "Agencies must provide you with a transparent breakdown of their charges on a per candidate basis." / "candidate/worker daily pay", "on costs (National Insurance, pension contribution etc)", "supplier fee" / "From September 2026, single and multi-academy trusts are mandated to procure supply staff through the Government Commercial Agency (GCA) 'Supply Teachers and Education Recruitment' framework agreement" / "must ensure their costs are no higher than the rates offered by the GCA framework" / "Supply staff pay and conditions should not be affected" / "many agencies have agreed lower charges" |
| DfE fee cap table, image on that page | https://images.ctfassets.net/o6csh136j1jr/2yUJAhNb0KBAVm6yYWnFvT/feba41491a86e1e854096377dcfa8802/GCA_supplier_fees.png | 200, 38,425 B | STEM £45, Non-STEM £40, support non-SEND £36, support SEND £38, senior £55, facilities £36, admin £32, other £34. Read at 2x zoom |
| DfE Buying for Schools blog, 29 Apr 2026 | https://buyingforschools.blog.gov.uk/2026/04/29/a-better-deal-on-agency-supply-staff-what-the-new-supply-teachers-and-education-recruitment-framework-means-for-schools-and-trusts/ | 13:32:55Z, 200 | "approximately £1.4 billion a year on agency supply staff" / "schools usually receiving a bulk daily charge or consolidated monthly invoice" / example table, candidate pay £200, on cost 18.5% £37, supplier fee £71, total £308 / the eight caps in text, all eight identical to the image (independent second read) / "would save a minimum of £26 per day, per candidate" |
| HMRC rates and thresholds 2026 to 2027 | https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2026-to-2027 | 13:26:08Z, 200 (content API) | Secondary threshold £96 a week, £417 a month. Category A employer 15%. Category M (under 21) 0% up to UST £967 a week, £4,189 a month. Apprenticeship Levy 0.5%, allowance £15,000, pay bill over £3 million. Employment Allowance £10,500 |
| DWP AE thresholds review 2026/27 | https://www.gov.uk/government/publications/review-of-the-automatic-enrolment-earnings-trigger-and-qualifying-earnings-band-for-202627 | 13:26:52Z, 200 | Trigger £10,000, LEL £6,240, UEL £50,270 kept for 2026 to 2027 |
| The Pensions Regulator, earnings thresholds | https://www.thepensionsregulator.gov.uk/employers/new-employers/im-an-employer-who-has-to-provide-a-pension/declare-your-compliance/ongoing-duties-for-employers/earnings-thresholds | 13:27:31Z, 200 | 2026-2027, 1 week £120 / £192 / £967, 1 month £520 / £833 / £4,189 (independent of the DWP annual figures, consistent with them) |
| gov.uk workplace pensions | https://www.gov.uk/workplace-pensions/what-you-your-employer-and-the-government-pay | 13:26:08Z, 200 | Employer minimum 3% from April 2019. Joining page, "aged between 22 and State Pension age", "earn at least £10,000 per year" |
| DBT holiday pay reforms | https://www.gov.uk/government/publications/simplifying-holiday-entitlement-and-holiday-pay-calculations/holiday-pay-and-entitlement-reforms-from-1-january-2024 | 13:28:40Z, 200 | "12.07% of a worker's total pay", rolled up "for irregular hour and part-year workers only", "5.6 weeks ... divided by 46.4 working weeks", "clearly marked as a separate item on each payslip" |
| gov.uk holiday entitlement | https://www.gov.uk/holiday-entitlement-rights | 13:26:08Z, 200 | 12.07% accrual and rolled up pay allowed for irregular hours and part year workers (second source for 12.07%) |
| Enrich KS2 LSA advert | https://www.enrichedu.co.uk/jobs/ks2-lsa | 13:24:55Z, 200 | "£105 - £120 Per Day" |
| Enrich home, brand | https://www.enrichedu.co.uk/ | 13:24:54Z, 200 | Logo c20eed_0adae44f7dcc4d87920786692a9c00fa~mv2.png and favicon c20eed_9cb8135589a44f28a7016f84b4e9aef3~mv2.jpg (both shipped byte-identical, never redrawn). Colours #0E3A30, #155244, #0B2B24, #B5AE4F, #1B4F17, rgb(247,244,238), theme greens 177,211,187 / 127,168,139 / 64,124,81. Poppins body, Adobe Caslon theme heading font |
| Companies House | https://find-and-update.company-information.service.gov.uk/company/16119130 | 14:05:56Z, 200 | ENRICH EDUCATION RECRUITMENT LTD, active, incorporated 4 December 2024 |
| Control | https://example.com/ | 13:24:55Z, 200 | same minute as the first fetches |

Not on the page by instruction. Enrich is absent from the RM6376 supplier CSV (0 hits, 208 suppliers,
https://www.gca.gov.uk/agreements/RM6376:1/lot-suppliers/csv, 13:33:15Z). The CSV was used only to
find competitor domains for the teardown.

Fonts, self hosted from Fontsource 5.3.0 via jsdelivr, all SIL OFL. Poppins (Enrich's own), Libre
Caslon Display and Text (echoes the Adobe Caslon in their Wix theme), IBM Plex Mono. No third party
requests at runtime.

## Teardown, 23 pages rendered across two Playwright passes (proxy CA pinned)

Walled or wrong path, not studied: Clearly Education (WordPress 429), uktaxcalculators.co.uk and the
MoneyHelper pension calculator (Cloudflare 403), deel.com/resources path (404), remote.com calculator
path (404).

| Site | What it does well |
|---|---|
| Wise, pricing/send-money | The benchmark for a fee breakdown. Amount in, every fee its own line, total and what arrives, big tabular numbers in one card |
| Stripe, pricing | Big rate numbers stated as the rule ("1.5% + 20p"), nothing hidden behind "contact us" for standard use |
| Apple, buy MacBook Air | Sticky summary keeps the running total in view while options change |
| listentotaxman | Yearly, monthly and weekly columns side by side for every line. Dense, but per period columns are right |
| thesalarycalculator.co.uk | "I want to see the breakdown for a salary of" as a sentence, tabs for the edge cases |
| Deel, UK employer costs 2026 guide | Names employer NI and pension as on costs with 2026 thresholds, tables plus prose |
| gov.uk, calculate holiday entitlement | One question per step, plain verbs, each term linked to its rule |
| GCA, RM6376 agreement page | Key facts as label and value pairs, no adjectives |
| Zen Educate, home and /schools | Platform tone and app mockups, says "transparent pricing" and leads with RM6376 approval. No breakdown tool |
| TeacherActive | News post on its RM6376 Lot 1 place, search first, no pricing |
| Tradewind, home and /schools | Poppins, yellow on blue, search box hero. Schools page is partnership copy, no charges |
| Teaching Personnel | Photo hero, "flexible workforce partner", myTP app mockups |
| Supporting Education (Protocol) | Trust logos as a proof strip (Delta, Ark, REAch2, United Learning) |
| Sanza Teaching Agency (London) | Purple and yellow, London skyline line art, search first |
| Simply Education | Dark navy with rocket shapes, 18 locations, Cookiebot wall |
| Dunbar Education | Clean white, big proof numbers (20,000+, 500+ schools and MATs) |
| ANZUK Education | Light blue blob shapes, illustrated people, three CTAs |
| Ethos Education | Line illustration, very little content |
| Supply Desk | Red bars and dropdown search, older look |
| Engage Education | Red accent, floating candidate cards, "Explore our Frameworks" link, no fees |
| Hays Education | Cookie wall over everything, italic serif accents |

Finding. None of the education agencies offers a per candidate charge breakdown a school can see or
use. The framework members advertise membership and stop there. The fee transparency leaders (Wise,
Stripe) and the payroll calculators gave the pattern used here, inputs on one side, an itemised live
result with per period columns on the other, every rule stated.

## Design

Concept, the document a trust files. Their own warm paper (247,244,238) and deep green ink #0E3A30,
their olive #B5AE4F reserved for the agency's own line (the fee), their logo and theme greens for the
on costs. Signature scene, their mark is five translucent leaves and the breakdown has five lines once
holiday pay is split out, so the hero is a leaf chart (leaf area proportional to each line, numbered
pins plus a key, drawn from the example day and labelled). Section rhythm paper, green, paper, tone,
green, paper. Contrast checked before CSS (ink on paper 11.48, olive on deep green 5.48, olive text
shade #5E5A1F on paper 6.47, muted #4A5F58 on paper 6.23). No photographs were used, so no stock or
licence risk, and nothing is captioned as Enrich's staff, schools or candidates.

## QA results

- Cold load, local (port 8947, title checked first) and live: 0 page errors, 0 console errors, 0
  failed requests, reveals 19 of 19 fired naturally, images 3 of 3 decoded.
- An early QA run hit a sibling build's server on port 8791 ("Instant Valuation | Jan Forster").
  Those numbers were discarded and every run since checks the title first.
- Overflow, none at 1440, 420, 390 and 360 (scrollWidth equals viewport).
- Screenshots of every section at 1440 and 390, looked at, four rounds. Fixed after looking, the
  rotated example stamp covering the document title (now a band), bar labels inheriting the segment
  colour, "Line 1" wrapping, the caps axis offset, a small hero chart, the total row colliding on a
  phone, the rates table squashed on a phone (now stacked), the role category select truncated.
- Tool exercised with three input sets plus blank, read back from the rendered document, and every
  value matched an independent Python Decimal implementation to the penny.
  - Set 1, example (110, 5 days, 12 weeks, weekly, rolled up on top, 3%, £30), 110.00, 13.28, 15.61,
    2.98, subtotal 141.87, fee 30.00, total 171.87, week 859.35, booking 10,312.20.
  - Set 2 (185 inside holiday, 3 days, 6 weeks, monthly, 5% pension, levy on, 15% fee, Teacher not
    STEM), 165.08, 19.92, 22.94, 7.25, 0.93, subtotal 216.12, fee 27.75, total 243.87, booking 4,389.66.
  - Set 3 (95, 2 days, 4 weeks, under 21, not rolled up, not enrolled, £40, Support staff SEND),
    total 135.00, booking 1,080.00, fee flagged £2.00 over the £38 cap.
  - NI per day by days a week, 4.09, 11.29, 13.69, 14.89, 15.61 (set 1), matched.
  - Rate edit to 16% NI gave 16.65 and the "Uses edited rates" warning, and reset restored 15.61.
- Copy link, copy as text, batch of two, print all (two docs), real A4 PDF (two pages, one per
  candidate, example band on both), shared link opening the doc view with main hidden, and "Open the
  full tool" restoring the inputs. All run locally and again against the live URL, 0 errors.
- NO-AI-SLOP section 8 grep over the visible text in five tool states plus print output, alt, aria,
  title and meta. No banned words, phrases, hedges, paired adjectives, uncontracted verbs, em dashes,
  emoji or exclamation marks. Over index.html, only CSS and SVG `transform` properties and JS `!`
  operators. Detector proven on a planted line.
- Colon and dash grep over the same text with URLs and emails removed. 0 colons, 0 hyphens, 0 en
  dashes, 0 em dashes. Detector proven on a planted colon.
- 10 contractions on the page as loaded. Prose sentences 3 to 40 words, standard deviation 8.8.
- Live verification. HTTP 200, title "Charge breakdown | Enrich Education Recruitment", index.html
  byte-identical to the deployed file, all 11 assets 200 and sha256 matched, the one script block in
  the downloaded live HTML parses, live visible text identical to local, cold load at 1440 and 390
  with 0 errors and fonts served from the site.

## Could not verify

- Enrich's real fee, the real pay for the KS2 LSA booking (only the advertised band), and whether
  Enrich uses rolled up holiday pay or weekly PAYE payroll for its supply staff.
- Whether the Camden school is in an academy trust (the advert doesn't name it).
- Rates on the GCA Agency Supply Portal (behind DfE Sign-in).
- That HMRC's table method gives the same pennies as the straight percentage used here.
- Teardown sites listed above as walled.
