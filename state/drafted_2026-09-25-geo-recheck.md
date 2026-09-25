# The four GDPR sends of 21 Sep and the two NL checks, redone from inside the EU. 2026-09-25

Raka, "recheck/reresearch these, if its still shit can we find another angle?"

**How the EU view was got this time, so it does not depend on Raka opening anything.**
`tools/eu-view.py`, built today. It runs Webbkoll, a scanner run by a Swedish foundation, which
loads the page from Stockholm and clicks nothing. Proof it is in the EU, Cloudflare answered it
with a cf-ray ending ARN (Stockholm Arlanda) and Google served it www.google.se. Controls,
Markoni (no consent code) came back full of trackers from Sweden, allbirds.eu (Shopify banner set
for every EEA country) came back with essential cookies only.

**Every thread pulled today before any of this was written.** Chris, Stephanie, Visakh and Marko,
2 messages each, connect note then the 21 Sep GDPR message, no reply from anyone. Steven (QWIC)
empty. Simon (Snorly) the connect note of 26 Jul only. Positive control, Chris's thread came back
full in the same minute.

| Lead | What a European visitor actually gets | Verdict |
|---|---|---|
| Marko, Markoni | From Stockholm 15 cookies, `_ga`, YouTube, doubleclick, Google Fonts, no consent code at all | **Our message stands.** No action |
| Visakh, AutoDevPro | From Stockholm `_ga` and `_ga_ST5Z96J2WL` set before a click, Google's own consent tool (Funding Choices) loaded. Whether its notice shows can't be seen from a scanner | **Half right.** Analytics before permission holds in the EU. "No consent notice showing" can't be confirmed and is probably wrong. He's a job seeking tester running a free platform, not a buyer. **No message** |
| Chris, Burton Clinic | Site Kit consent mode, everything DENIED by default for GB and the EEA, and no consent tool installed. Webbkoll is blocked by Cloudflare, so the EU behaviour comes from Aurevia, same plugin and version hash, 0 cookies from Stockholm | **Our message was wrong for UK visitors.** Correction plus a new angle below |
| Stephanie, Aurevia | Same Site Kit setup, BE in the denied list. From Stockholm 0 cookies, Analytics and AdSense send cookieless pings | **Our message was wrong.** Correction plus a new angle below |
| Steven, QWIC | Cookiebot. From Stockholm 1 functional cookie, Criteo's loader script only, no ad cookies | **Clean.** Stays NO_STRONG_ANGLE |
| Simon, Snorly | Shopify's own banner is switched on **for Austria only**. From Stockholm 19 cookies, Meta, Taboola, Microsoft, Clarity, Klaviyo, Google Ads, before a click | **Strong GDPR opener.** Draft below |

**The new angle for Chris and Stephanie is the true version of what we got backwards.** Their
Google plugin blocks Analytics and Ads for UK and EU visitors until someone agrees, and there is no
banner to agree with. So nobody is tracked, and Google says so itself, "Without a third-party
consent management plugin that allows visitors to provide consent, user data is not tracked in
Google Ads and Google Analytics reporting" (sitekit.withgoogle.com, consent mode page). Both of
them paid for Google Ads this year (Transparency Center), so the ads they bought couldn't tell them
which click turned into a booking or a quote request. The correction and the new angle are one
thread, which is why they sit in one message.

---

## Chris Burton, The Burton Clinic. CORRECTION.

**In plain words.** We told Chris his site tracks UK visitors before asking. It's the opposite.
His Google plugin switches Google Analytics and Ads off for UK visitors until they agree, and his
site has no banner to agree with, so Google never counts anyone in the UK. He ran a Google ad from
April to July, and it couldn't show him which clicks booked. He's hiring physios, so he needs to
know what fills the diary.

**Evidence, reopened today.**
- `gtag('consent','default')` with analytics, ads, storage all `denied`, region list includes GB,
  in the live HTML of https://www.burtonclinic.co.uk/ . Plugins in the HTML, google-site-kit,
  genesis-blocks, js_composer_salient, salient-core, salient-portfolio. No consent plugin.
- In Chromium the dataLayer holds one consent call, `default`, and never an `update`. Tag ids fired,
  GT-P85J7FKV, AW-17725543311 (Google Ads), G-6152TTNQL1 (Analytics).
- No banner in the desktop screenshot. site-audit.js had said "banner yes", that was its own bug,
  `ok` matched inside "Book now". Fixed today, rerun prints NONE FOUND against a working control.
- His own cookie policy, updated 7 Jan 2026, tells visitors to manage preferences "via our cookie
  banner". There isn't one.
- Google Ads Transparency Center, domain burtonclinic.co.uk, advertiser MR CHRISTOPHER JAMES BURTON,
  one ad, first shown 2026-04-21, last shown 2026-07-16.
- Google's own words, Site Kit consent mode page, quoted above. Google Ads help 10548233,
  without ad cookies advertisers "are no longer able to directly tie users' ad interactions to
  conversions", and conversion modelling needs 700 ad clicks per 7 days per country.
- GA4 help 11161109, "your reports only include data available from users who consented".
- Webbkoll from Stockholm is BLOCKED on his site by Cloudflare, so the EU behaviour is read from
  Aurevia, identical Site Kit build (same consent mode script hash 755f1678e260138d789e), 0 cookies.
- Hiring, https://www.burtonclinic.co.uk/physio-jobs-at-the-burton-clinic/ , "the fastest growing
  Physiotherapy and Sports Injury Clinic in Norwich", in the main nav today.

**What I left out.** YouTube still sets its own cookies from the video on his homepage, so "the
site sets no cookies" would be false. The message only talks about Analytics and Ads. The founder
page also carries a paragraph of template filler text ("Pityful a rethoric question..."), a tweak,
not the angle.

<!-- GATE ARCHIVED, SENT 2026-09-25T09:58:57Z as act_vJmMR6xsPCZPWhGuP on Raka's explicit word, verified verbatim, one copy. -->

### Chris, CORRECTION

```
Hi Chris, I need to correct my last message. I checked your site from outside the UK, which is where I went wrong. For someone in Norwich your Google plugin holds back the Analytics and Ads cookies until they agree, and there's no cookie banner on the site to agree with, so nobody ever does.

This means the Google ad you ran from April to July couldn't tie a UK click to a booking, and Analytics leaves every UK visitor out of your reports.

Especially, when you are growing the team and need the new diaries full, you can't see which page or ad is actually filling them.

I run Astra agency. We build websites and apps for brands like Unilever, AXA, Pertamina. I built a food brand from zero with my family and ran its marketing, so I've had to know which spend actually brought customers in.

Shall I send you over what the banner and tracking setup looks like?
```

---

## Stephanie De Decker, Aurevia Syndic. CORRECTION.

**In plain words.** Same story as Chris. We told her Google was tracking Belgian visitors before
asking. It isn't, it's switched off for them until they agree, and there's no banner to agree
with, so Google never counts anyone in Belgium. She paid for Google Ads from May to August, and
they couldn't show her which clicks turned into a quote request. Her own privacy page promises a
cookie banner that isn't there.

**Evidence, reopened today.**
- Live HTML of https://aureviasyndic.be/ , the same Site Kit consent default, BE in the denied list,
  only google-site-kit in the plugin paths, no consent plugin.
- Chromium, dataLayer holds `default` only. Tag ids GT-55V9DCN7, AW-18137700322 (Google Ads),
  G-4K29RY027D. An AdSense slot sits on the page unfilled, 0x0, so no ads show and it isn't claimed.
- Webbkoll from Stockholm, 0 cookies, requests to region1.google-analytics.com and
  pagead2.googlesyndication.com, cookieless pings as Google documents.
- site-audit.js, banner NONE FOUND against a working control. Desktop screenshot opened, no banner.
- Her privacyverklaring says analytics cookies are only placed after consent "via de cookiebanner".
- Google Ads Transparency Center, domain aureviasyndic.be, advertiser Stephanie De Decker, two ads,
  first shown 2026-05-04 and 2026-05-11, last shown 2026-08-22 and 2026-08-26.
- Local pages https://aureviasyndic.be/syndicus-geel/ and https://aureviasyndic.be/syndicus-westerlo/ ,
  a quote form at https://aureviasyndic.be/offerte/ . KBO 1000.295.078, started 26 Sep 2023.

<!-- GATE ARCHIVED, SENT 2026-09-25T09:59:01Z as act_jvS9GWGyvXvCiucQi on Raka's explicit word, verified verbatim, one copy. -->

### Stephanie, CORRECTION

```
Hi Stephanie, I owe you a correction on my last message. I looked at your site from outside Belgium, and that's where it went wrong. For a Belgian visitor, Google's plugin on your site keeps its Analytics and Ads cookies off until someone agrees, and since the site has no banner to agree on, nobody can.

This means the Google ads you ran from May to August couldn't tie a Belgian click to an offerte request, and your Analytics leaves every Belgian visitor out.

Especially, when you are winning buildings around Geel and Westerlo, you can't see which ad or page actually brings a VME to ask for a quote.

I run Astra agency. We build websites and apps for brands like Unilever, AXA, Pertamina. I ran campaigns at Betty Blocks for a year and a half, so I've had to prove which ones actually brought in leads.

Shall I send you over what the fixed banner and Ads tracking looks like?
```

---

## Visakh Pillai, AutoDevPro. No message.

From Stockholm, `_ga`, `_ga_ST5Z96J2WL` and `FCCDCF` are set before a click and
fundingchoicesmessages.google.com loads. So "Analytics running before permission" holds for EU
readers. "No consent notice showing" can't be seen by a scanner and, with Google's own consent tool
loading, is probably wrong. Our fetch still gets a robot challenge, 202. His lemlist summary says he
is "actively looking for job as a tester" and AutoDevPro is a free platform. The 2026-08 research
already had him as NO_STRONG_ANGLE for that reason. A correction for half a sentence to someone who
isn't a buyer costs more than it fixes. Raka's call if he wants one.

## Marko Markovic, Markoni. Stands.

From Stockholm, 15 cookies (`_ga`, `_ga_WBP4PJK7GX`, sourcebuster, five YouTube), Google Analytics,
doubleclick, Google Fonts, and no consent code in 87 KB of HTML. Our 21 Sep message said fourteen
cookies, fonts from Google and no notice. It holds for a German visitor. No action.

---

## Steven Uitentuis, QWIC. NO_STRONG_ANGLE

```sweep
lead: Steven Uitentuis, QWIC, CEO since Dec 2025, ctc_uiZnjF5t5mX8ZDJtc, thread empty today with Chris's full thread as control
website: qwic.nl rebuilt, dealer locator and dealer signup work, the 2026-09-25 batch 9 sweep with site-audit.js screenshots, unchanged
gdpr: python3 tools/eu-view.py https://www.qwic.nl from Stockholm, 1 cookie (wpml language), Cookiebot loads, only Criteo's loader script ld.js requested and no ad cookie set. The banner holds trackers back for an EU visitor. Clean
apps: dealer.qwic.nl is their own dealer portal linked from https://www.qwic.nl, nothing to sell there
social: instagram qwic_ebikes, facebook qwicnl, linkedin company, all linked from their HTML per site-audit.js
squad: an e bike brand with its own product team, not an agency, no build capacity gap found on https://www.qwic.nl/
verdict: NO_STRONG_ANGLE, the GDPR check Raka was going to do from NL is done from Sweden and it's clean
```

---

## Simon Wilmes, Snorly. OPENER.

**In plain words.** Snorly sells custom anti snoring splints online, €495, made in German dental
labs. Their Shopify cookie banner is switched on for Austria only. So a German visitor never sees a
banner, and Meta, Taboola, Microsoft and Google Ads all load on them straight away, on a site about
snoring and sleep apnoea. They're growing on paid ads, four Google ads live this week, one new on 15
Sep. Since the BGH ruled in March 2025, a competitor can send an Abmahnung over data protection
breaches. We set the banner up properly for Germany.

```gate
lead: Simon Wilmes, Snorly GmbH, Co-Founder and CEO, Geschäftsführer per the Impressum, ctc_eb8ySnZEpFiroQaXH, lea_ckBQX5DhW73xzvYxG
site pass 1: 166 pages, tools/crawl.py from the sitemaps, 148 at 200, 12 rate limited 429, 6 at 503
site pass 2: 166 pages, second full crawl an hour later, 133 at 200, 33 rate limited. The rate limit is theirs, Shopify throttling our crawler
deep analysis: Shopify store, one product sold under about 30 keyword landing pages (schlafapnoe-schiene, schnarchschiene-fur-manner, 20-rabatt), which is how a paid ads business builds. €495 or from €23.25 a month, 60 night guarantee, 4.8 stars over 84 reviews, 1,000+ customers, Dr. Jacob Kölln on the medical board, WhatsApp advice from Marie Steinke. Country selector DE, AT, NL, GR, all German copy, no hreflang. Datenschutzerklärung dated 11.01.2024 names Google Analytics on legitimate interest, Google Ads and unnamed session recordings, never Meta, Taboola, Microsoft or Klaviyo, never a banner. site-audit.js says RENDER NOT TRUSTED on this site, so no visual claim is made
owner linkedin: /in/simon-wilmes-196ba213a returned 429 to curl today. His lemlist record read in full, summary "nearly a decade in refineries and power plants", then web3, digital health and e commerce, Co-Founder and CEO Snorly, Co-Founder BELEAF, bp Superintendent Maintenance and Reliability
contact linkedin: same person as the owner. Company page https://www.linkedin.com/company/snorly-gmbh 200, 10 followers, 2 to 10 employees, founded 2024, employees Simon Wilmes and Dr. Jacob Kölln
google news: tools/news.py de, "Snorly GmbH" 0 results, Snorly 2 results (a 2022 FOCUS piece and a 2021 Stiftung Warentest piece on snoring aids, neither about them), "Simon Wilmes" 1 unrelated 2018 result. Control Volkswagen 92
regional news: tools/news.py (Hamburg) (Schnarchschiene OR Schlafapnoe OR Cookie-Banner Abmahnung), 2 results, Anwalt.de 2026-04-13 Abmahnung im Online-Handel 2026
industry news: tools/news.py, 13 results. Anwalt.de 2025-11-21 on the EU plan to cut cookie banners, checked at blog.eprivacy.eu, third party tracking stays under consent and it isn't adopted. Dr. Stoll und Sauer 2025-11-26, 268 suits over the Meta Pixel at OLG Stuttgart
sources:
1. https://snorly.de/ (166 pages, twice)
2. https://snorly.de/pages/datenschutzerklarung-von-snorly-de
3. https://snorly.de/pages/impressum-von-snorly-de
4. https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fsnorly.de (tools/eu-view.py, run twice)
5. https://snorly.de/api/unstable/graphql.json (the banner's own settings, regionVisibility AT)
6. https://adstransparency.google.com/?domain=snorly.de (17 ads, advertiser Snorly GmbH)
7. https://www.linkedin.com/company/snorly-gmbh
8. https://www.dr-datenschutz.de/bgh-ermoeglicht-leichtere-abmahnung-von-datenschutzverstoessen/
9. https://blog.eprivacy.eu/?p=2733
10. https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fallbirds.eu%2F (control)
11. https://news.google.com/rss/search?q=Snorly (tools/news.py)
12. https://www.linkedin.com/in/simon-wilmes-196ba213a (429, record read in lemlist)
pains: 4 judged. Banner on for Austria only while paid traffic lands from Germany, the costliest, an Abmahnung plus a cease and desist with a contractual penalty. Privacy policy two years old and missing Meta, Taboola, Microsoft and Klaviyo, same problem, one symptom. NL and GR on the country selector with German only copy, not proven to be a goal. No social beyond WhatsApp, small
chosen: the banner switched on for Austria only, the costliest, because every Google and Meta click from Germany lands on it and a competitor can now act on it
sweep website: strong, 4.8 stars over 84 reviews, 1,000+ customers, clear €495 offer and guarantee, per the 166 page crawl of https://snorly.de/ . Not the pitch
sweep gdpr: the angle. Shopify banner regionVisibility is ["AT"] from their own Storefront API, and tools/eu-view.py from Stockholm shows Meta, Taboola, Bing, Clarity, Klaviyo and Google Ads cookies before a click. Control allbirds.eu, banner set for the whole EEA, essential cookies only from Stockholm
sweep apps: the at home impression order flow runs on Shopify with a WhatsApp advisor, no process gap in the crawl of https://snorly.de/ , and Simon builds things himself per his lemlist summary
sweep social: only a WhatsApp link in their HTML per site-audit.js with its control, no Instagram or Facebook linked, small next to the GDPR exposure
sweep squad: a D2C brand, not an agency and not hiring developers per https://www.linkedin.com/company/snorly-gmbh , no Build Squad fit
claims:
cookie banner only switched on for Austria, https://snorly.de/api/unstable/graphql.json banner regionVisibility ["AT"], reopened 2026-09-25
Meta, Taboola, Microsoft and Google Ads load without being asked, https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fsnorly.de via tools/eu-view.py, _fbp, t_pt_gid, _uetsid, _clck, _gcl_au
a site about snoring and sleep apnoea, https://snorly.de/products/schlafapnoe-schiene and their LinkedIn about text
growing on paid ads, https://adstransparency.google.com/?domain=snorly.de 17 Google ads, four last shown 2026-09-24 or 25, one first shown 2026-09-15
the BGH ruling last year, 27 March 2025, I ZR 186/17, I ZR 222/19, I ZR 223/19, https://www.dr-datenschutz.de/bgh-ermoeglicht-leichtere-abmahnung-von-datenschutzverstoessen/
Heineken e business data and governance across 23 markets, docs/astra-master-context.md section 2A, https://www.linkedin.com/in/raka-mulya-b92885196
thread: problem the cookie banner only switched on for Austria | cost every paid click from Germany lands on it and a competitor can act on it | offer the banner set up for Germany with the tracking inside it | link banner
lead read: Simon reads that his cookie banner only runs in Austria, that every ad click from Germany lands on that and a competitor can now act on it, and then gets offered the banner set up for Germany, one thread
recheck: banner setting read two ways, the store's own API and the Stockholm visit, and the control shop behaves the opposite way with the opposite setting. A German visitor was not loaded directly, Sweden is outside his banner list exactly like Germany, so it's inferred from his own setting, flagged. Pay test is the weak point, a banner and tracking setup is a small job, flagged to Raka. Thesis confidence MEDIUM
```

<!-- GATE ARCHIVED, SENT 2026-09-25T09:59:03Z as act_2tNSSwYjkixcsf5qY on Raka's explicit word, verified verbatim, one copy. -->

### Simon, OPENER

```
Hi Simon, saw Snorly, looks interesting!

However, your cookie banner is only switched on for Austria. This causes German visitors to be tracked by Meta, Taboola, Microsoft and Google Ads without being asked, on a site about snoring and sleep apnoea.

Especially, when you are growing Snorly on paid ads, the exposure grows with every ad click from Germany, and since the BGH ruling last year a competitor can send you an Abmahnung over it.

I run Astra agency. We build websites and apps for brands like Unilever, AXA, Pertamina. I led e business data and its governance across 23 markets at Heineken, so I've had to keep the tracking legal without losing the numbers.

Shall I send you over what the banner setup for Germany looks like?
```
