# Dan Waterfall-Chapman, Utee Ltd 17107724 and Extracted Ltd 12511482, ctc_eGXerDBzTghqprWZh. Four angle re pass, b10_socialB, 2026-10-07

Read only. Nothing sent, no lemlist writes, no commit. Opened 2026-10-07 between 06:00 and 06:35 UTC.

## STOP FLAGS

- Thread: ONLY OUR CONNECT NOTE. `get_inbox_conversation(ctc_eGXerDBzTghqprWZh)` returned 0 activities, totalItems 0, nextPage null, sync "recent" 05:57:59Z. Positive control in the same minute: ctc_D5F2nC69pjMjAuvk2 came back with 3 items. sentOnly search "Waterfall" returned the connect note "Hi Dan, saw your business and thought it was cool 😀 I'm a business owner too! Would love to connec..." with lastSentAt 2026-10-05 06:11 UTC and lastRepliedAt null. **The shape would be an OPENER.**
- Owner: YES. Companies House shows Daniel Charles Chapman as director of UTEE LTD 17107724 (incorporated 22 Mar 2026, 23 Broad Street, Bath) and a 25 to 50% PSC since 22 Mar 2026. Antonia Waterfall is the other 25 to 50% PSC (notified 8 Sep 2026) and a director since 25 Aug 2026. He has also been a director of EXTRACTED LTD 12511482 since 11 Mar 2020, alongside Antonia Waterfall, Chump Investments Ltd and Millrace Marketing Ltd.
- Funding fact. On 18 Sep 2026 Utee filed new articles, removal of pre emption rights, an allotment resolution, varied share rights and a share subdivision dated 7 Sep, with allotments on 7 and 8 Sep 2026 (filing history).
- Unrelated name to rule out: TikTok @utee belongs to "rmargis" and @myutee is a Thai personal account. Neither is theirs.
- lemlist record lea_2LeGW9oFa5JbuBd5Y, campaign "founders: new businesses with marketing hires" (running). Tagline "Co-Founder @ Extracted/Utee/Downstairs | 7-figure DTC operator". The summary's figures (4,000 subscribers, £1.7m) are self reported and stay out of any message, as the prior row says.

## Prior research (candidates, re tested)

- 2026-10-05 and 10-06 NO_STRONG_ANGLE. He builds the Utee portal in house, and the red team killed the pre launch site angle because he builds the store himself. Pre consent ad cookies on extracted.co.uk count as a favour only.
- **Re tested today with `git clone` of https://github.com/ExtractedFSD/Utee.** 70 commits from 11 Jun to 6 Oct 2026. The newest are "Auth: branded sign-in code email template (#31)" and "Clinic: generated patient report with electronic signatures (#30)", both on 6 Oct. Branches are named claude/..., so he builds with an AI coding agent. HOLDS.

## Angle 1, WEBSITE for sales or growth (B)

- https://myutee.com/ 302s to /password, title "– Utee". The page shows the stock Shopify "Opening soon" screen: "Utee", "Opening soon", "Sign up for our newsletter to be the first to know when we launch", one email box. Screenshot dan-desktop.png opened: plain black on white, none of the Utee brand (no pink and maroon, no Cooper wordmark, no Cherry Healey). crawl.py passes 1 and 2 each read the single password page. site-audit.js gives Shopify, GEO VOID (privacy-banner consent code), 6 cookies and 1 third party for a US visitor, and no social links.
- The live Utee supplement sells on Extracted, https://extracted.co.uk/products/utee (site-audit.js render trusted, 0 page errors, screenshot danutee-desktop.png opened). It's a polished pink Utee pack page with "Revolutionary urinary tract support", Trustpilot, a Wellness From Within Awards 2026 finalist badge and subscribe at £39.99. The HTML holds a stale "Black Friday Has Arrived! ... BFSAVE30" countdown at 00, which wasn't visible in the screenshot, so it's a hidden template block and not usable.
- The repo holds a full Utee design system: logo, Cooper and Poppins type, pink and maroon colours, four photo styles and brand guideline pages, plus Utee_OnePager_Stage_1_v2.pdf. The readme says "Parent studio/agency: extracted". The brand already exists, made in house.
- Growth: SEIS/EIS style round articles and allotments in Sep 2026. The test launches "next year with Llusern Scientific" per med-techinsights.com (7 Sep 2026, Giovanna Forte, opened).
- **Verdict: fails.** The holding page is a pre launch default he is visibly replacing himself (theme and design system committed). That's the red team's KILL, and it still holds.

## Angle 2, PERSONAL AI WORKFLOW for the owner (C)

- He runs two companies with his wife and codes the Utee portal himself with an AI coding agent (the claude/ branches).
- **Fails.** He already runs AI on his own work daily. An AI workflow offer would be selling him what he does himself.

## Angle 3, AI APP or WORKFLOW for the company (A)

- The manual jobs are kit codes, lab sheets, triage, clinic reports and fulfilment. All of them are being built in the repo now (#23 to #31, 1 to 6 Oct).
- **Fails**, already being built in house.

## Angle 4, SOCIAL MEDIA, INSTAGRAM and BRANDING (D)

| Account | URL source | Read | Facts |
|---|---|---|---|
| Instagram @extracted.co.uk | extracted.co.uk HTML, the only social link | /embed/ at 06:0x UTC, with getbaked.berlin as control in the same minute (95 followers, 2026-09-22 posts returned) | **12,847 followers, 464 posts.** Newest six on 2026-10-06 (video, nutritionist on vitamin D), 10-04, 10-02 (founder @toni.waterfall on Menopause Awareness Month), 10-01, 09-30 (September roundup), 09-27. **That's six posts in ten days**, mostly reels and carousels with a nutritionist and the founder on camera. |
| LinkedIn /company/myutee | lemlist companyLinkedinUrl, not their HTML | Chromium 06:3x UTC | "Utee, Retail Health and Personal Care Products, Urinary Health Care", website myutee.com, 2 to 10 employees, **no description and no posts shown**, follower count not shown |
| Utee Instagram or TikTok | none linked from myutee.com or extracted.co.uk | TikTok probes with the @tiktok control (videoCount 1510): @utee, @myutee, @utee.uk and @uteehealth are not theirs or don't exist. Instagram @myutee hit a 401 rate limit, UNKNOWN | No Utee only account found. Not proven absent. |
| Press | news.py en, control Tesco 102 | Daily Mail 2026-05-29 "I've finally found a solution to my chronic UTIs", NutraIngredients 2026-02-03 "Startup's UTI innovation delivers critical prevention", NutraIngredients 2025-06-10 on Dan and ABSORB. Titles only, not opened. |
| Hiring | WebSearch snippet of linkedin.com/company/extracted, not opened | A part time Bath store and office role that will "create standout content". In house content capacity is growing (tier G). |

Benchmark. Not built, because the comparison that matters is internal. Their own parent brand already runs one of the most active accounts in this whole batch (six posts in ten days, 12.8k followers, founder and nutritionist on camera). Baked had 95 followers and a 157 day gap. Utee will launch into Extracted's audience, with Cherry Healey as co creator.

Branding read. One clear Utee brand (wordmark, pink to maroon, Cooper, "Created by women, for women") on the packs, the product page and the design system. The only off brand surface is the stock Shopify password page, which is temporary.

**Verdict: fails.** Social and branding are run in house and run well. An agency pitch would compete with their own content team and a founder who posts.

## Build Squad

Two founders shipping a portal daily with an AI agent. Not an agency, no capacity gap visible.

## JUDGE

| Angle | Proof | What it costs them | Would they name it | Incumbent | Verdict |
|---|---|---|---|---|---|
| B website | myutee.com stock "Opening soon" page | nothing yet, the launch is 2027 | no, it's their own work in progress | Dan himself, theme and design system committed | fails |
| C personal AI | codes with an AI agent daily | n/a | no | himself | fails |
| A AI app | portal jobs all in the repo, commits to 6 Oct | n/a | no | himself | fails |
| D social and brand | Extracted 12,847 followers, six posts in ten days, full Utee brand system | none visible | no | in house content team, now hiring for content | fails |

**Verdict: NO_STRONG_ANGLE, said honestly.** All four came back with a capable in house owner already on it. The pre consent ad cookies on extracted.co.uk (6 Oct) remain a favour if he replies. Re test when the Utee test launches in 2027 or if a Utee only account opens and stalls. Confidence HIGH.

## Sources opened

1. https://myutee.com/ and /password (curl, Chromium)
2. https://extracted.co.uk/ (curl)
3. https://extracted.co.uk/products/utee (curl, site-audit.js)
4. https://find-and-update.company-information.service.gov.uk/company/17107724/officers
5. .../company/17107724/persons-with-significant-control
6. .../company/17107724/filing-history
7. .../company/12511482/officers
8. https://github.com/ExtractedFSD/Utee (git clone, log, readme, design-system/readme.md)
9. https://www.instagram.com/extracted.co.uk/embed/
10. https://www.linkedin.com/company/myutee (Chromium)
11. https://med-techinsights.com/2026/09/29/it-has-taken-too-long-the-singular-anomaly-around-medtech-innovation-investment/
12. https://www.tiktok.com/@utee , @myutee , @utee.uk , @uteehealth , control @tiktok
13. news.google.com RSS through tools/news.py (two runs)
