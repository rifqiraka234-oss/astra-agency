# Hire Quality Talent site, handover (2026-09-29)

Live https://astra-hire-quality-talent-prototype.netlify.app , Netlify site `astra-hire-quality-talent-prototype`
(8d294110-c536-49e5-a197-884ef4b4d803), deploy 6abba420d30c15a0b2f3e072, team SSO off, forms on.
Source `pages/` plus `build.py`, output `site/`. Rebuild with `python3 build.py`.

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
