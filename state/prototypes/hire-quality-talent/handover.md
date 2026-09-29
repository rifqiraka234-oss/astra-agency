# Hire Quality Talent site, handover (2026-09-29)

Live https://astra-hire-quality-talent-prototype.netlify.app , Netlify site `astra-hire-quality-talent-prototype`
(8d294110-c536-49e5-a197-884ef4b4d803), deploy 6abbb0eb62618868afa0e52d (v2), team SSO off, forms on.
Source `pages/` plus `build.py`, output `site/`. Rebuild with `python3 build.py`.

## v2, after Raka's note (2026-09-29)
Raka on v1, "it looks like something she can do herself". v2 is to the Qualigraf bar.
- Teardown, 30 recruitment, search and consulting sites, 26 rendered, plus Qualigraf's 57.
- Homepage story, 01 the lens field (canvas, her magnifying glass, example candidate cards labelled
  as illustration), 02 ONS manufacturing vacancies chart, 03 Make UK hard to fill bars, 04 a pinned
  funnel 1,200 to 1 on her six stages (labelled an example), 05 sector films, 06 both sides of the
  table, 07 fee comparison on the visitor's own numbers, 08 PRECISE as a set of letters to click.
- Inner pages gained the films (industries), the two sides split (about) and the comparison (pricing).
- Data, ONS VACS02 released 15 Sep 2026, KPMG and REC Report on Jobs 7 Sep 2026, Make UK blog, each
  cited on the page. Films, 8 Mixkit clips, each page's copyrightNotice read as "Free".
- QA, 12 local and 12 live runs clean, interactions tested (comparison at four settings, funnel through
  six stages, films play, pause and stay paused, PRECISE, chart labels), reduced motion and no JS fall
  back to static steps, copy 0 colons, 0 dashes, 0 exclamation marks. 39 assets byte matched live.

## Why it exists
Ciara Neal said yes on 28 Sep to us putting the site together, after our opener named a homepage
titled "Navigation Bar" and an empty Pricing page, and our reply quoted the 500 euro floor. Raka on
29 Sep, "Ciara we needa make a prototype".

## What it is
Six pages, home, services (clients and candidates), industries, about, pricing, contact. Navy and gold
from her logo, Cormorant Garamond and Manrope self hosted, the logo cut to a transparent mark and
wordmark from her own image. Every sentence comes from her live pages, rewritten without dashes and
colons. The Pricing page has three ways to work, a fee estimator at her 10% starting rate, and six
questions.

## Placeholders, tagged "To confirm" on the page
1. The fee basis, first year base salary. Her site says "fees from 10%" and nothing on what of.
2. Executive search "quoted after the discovery call".
3. Fractional talent acquisition "day or monthly rate".
4. When the fee is paid, and any rebate period.
5. Her founder section on About, photo and background.
6. The privacy notice link, her current one points at "#".

## Must change before she publishes
- Remove the draft bar and the noindex tag in `build.py`.
- The contact form posts to Netlify Forms on our project. On her own host it needs her handler.

## QA done
- 12 local runs (6 pages at 1440 and 390), 0 errors, 0 failed requests, 0 overflow after a footer
  fix, 0 undecoded images, every reveal fired.
- Estimator at 20k, 45k, 85k and 200k gives 2,000, 4,500, 8,500 and 20,000 pounds.
- Contact form, empty (3 fields flagged), bad email, sent state, the service preselect from the query.
- Menu opens and closes on Escape.
- Copy, 0 colons, 0 dashes after fixing "in-house", 0 exclamation marks, contractions on every page.
- Live, 13 assets byte matched, 6 pages DOM identical to the build, cold load at both widths clean,
  unknown path 404.
