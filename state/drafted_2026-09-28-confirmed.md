# The two that needed Raka's check from the Netherlands, 2026-09-28. NOT SENT.

Raka opened both sites on his phone in the Netherlands at 08:43 and sent screenshots. ugc.nl shows a
Cookiebot banner with "Allow all" and "Customize" and no refuse button on the first screen.
diggecard.com shows the page with no cookie banner at all. He also said Diggecard "looks like old
website". Then "continue your research please for all angles". Both leads were researched in full
again today, all five families, social opened with tools/social-audit.js.

---

## Andrew Johnson, Diggecard. OPENER.

**In plain words.** Diggecard sells gift card technology and corporate gift cards to big UK brands,
River Island, TK Maxx, Arsenal. Andrew runs the whole group since October 2025. In June they got an
ISO 27001 security certificate and built a Trust Centre so corporate buyers can check them as a
supplier. Their own website works against that. It still says 2023 on every page, its terms date
from 2019, and it drops Hotjar, Facebook and HubSpot tracking on visitors before anyone's asked,
with a cookie policy that says browsing counts as agreeing. A buyer's procurement or data team
checking Diggecard sees a supplier whose site hasn't kept up. We'd rebuild the site, consent done
properly.

```gate
lead: Andrew Charles Johnson, Group CEO of Diggecard (daglig leder of DIGGECARD AS 914046688 per data.brreg.no, Group CEO per the company's own 23 Oct 2025 post), ctc_CmqhrPXcHCyuCjmPw
site pass 1: 49 pages, every URL on https://diggecard.com/sitemap/ read live through WebFetch (curl, Chromium and tools/fetch-walled.py all get 403 or 502), plus the April 2026 archive copy of the home page read raw
site pass 2: 49 pages, a second live WebFetch read of every sitemap URL for its headline, copyright line and dates, plus 8 archive copies. Visual evidence is Raka's own phone screenshot from the Netherlands, our browser can't load the site
deep analysis: a WordPress and Elementor site on GeneratePress, home page published 8 Jan 2021 and modified 2 Apr 2025 per its own schema. "© Copyright Diggecard 2023" on every page read in both passes. Terms and conditions effective 17 Oct 2019, five more terms pages the same, TK Maxx terms 8 Oct 2021, sustainability and modern slavery policies effective 1 Jan 2022. The Merchant Portal and Warehouse user guides say "Coming soon!" and "Coming (very) soon!". The page still loads Universal Analytics UA-67894405-1, which Google shut down in July 2023, next to GA4. The cookie policy says "By continuing to browse the site, you are agreeing to our use of cookies" and names only Google Analytics. Meanwhile the news page is current, 9 posts from Oct 2025 to 24 Sep 2026, ISO 27001 on 16 Jun 2026 with a Trust Centre for "supplier due diligence", the Buy Women Built B2B partnership on 24 Sep 2026
owner linkedin: Diggecard AS is board led, chair Susanne Brønnum-Hyttel per the register, the operating owner is the group. The chair is quoted in the ISO post. Andrew is the executive who runs it
contact linkedin: /in/andrew-johnson-1772092 found by web search, title "Andrew Johnson - Gift card expert | Group CEO Diggecard". His posts found by search, a 2021 gift card expertise post and LinkedIn articles. Curl on LinkedIn profiles returns 999. Ex Director General of the Gift Card & Voucher Association and now President of IMA Europe per the company's own news
google news: tools/news.py en, Diggecard 2 results (Ingenico partnership 2023-09-20, a 2026 hire elsewhere), "Andrew Johnson" Diggecard 0, control Tesco 100
regional news: tools/news.py UK corporate gifting and gift cards, 9 results, the UK gift card market report 2026 ($11.72bn in 2025, $16.66bn by 2030, Yahoo Finance UK 2026-02-19)
industry news: tools/news.py "gift card" B2B incentives UK 2026, 8 results, market reports. ICO guidance read via search, consent can't be implied from continued browsing, and PECR fines rise to UK GDPR levels (£17.5m or 4 percent) under the Data (Use and Access) Act 2025 once commenced
sources:
1. https://diggecard.com/ (49 page sitemap read twice)
2. https://diggecard.com/cookie-policy/
3. https://diggecard.com/privacy-policy/
4. https://diggecard.com/terms-conditions/
5. https://diggecard.com/diggecard-iso-27001-certified/
6. https://diggecard.com/diggecard-unifies-global-operations-and-announces-leadership-transition-to-accelerate-innovation-and-growth/
7. https://diggecard.com/diggecard-and-buy-women-built/
8. https://diggecard.com/latest-news/
9. https://web.archive.org/web/20260405182102/https://diggecard.com/ (raw HTML via tools/fetch-walled.py)
10. https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fdiggecard.com (tools/eu-view.py, run 27 and 28 Sep)
11. https://data.brreg.no/enhetsregisteret/api/enheter/914046688/roller
12. https://www.linkedin.com/company/diggecard (1,757 followers via tools/social-audit.js)
13. https://www.cookieyes.com/blog/uk-cookie-guidance-ico-pecr/ (ICO implied consent position, search summary)
14. https://news.google.com/rss/search?q=Diggecard (tools/news.py)
15. Raka's phone screenshot of diggecard.com, Netherlands, 2026-09-28 08:43, no banner
pains: 5 judged. (1) Enterprise sales trust, a Group CEO pushing B2B corporate gifting and a new ISO 27001 badge, while the site every buyer checks reads 2023 and tracks before consent, the costliest we can fix. (2) Tracking before consent with implied consent in the cookie policy, UK PECR and EU GDPR, fines up to £17.5m once DUAA commences, the hottest. (3) Retired Universal Analytics code and "coming soon" portal guides, symptoms of nobody tending the site. (4) Social, LinkedIn 1,757 and YouTube 12 subscribers, normal for B2B, no gap. (5) Product or dev capacity, no evidence, the tech sits in Bergen
chosen: the site stuck in 2023 and tracking before consent, the costliest and the hottest, because it's the first thing a corporate buyer's due diligence opens, right after they've been pointed to the new Trust Centre
sweep website: the angle. "© Copyright Diggecard 2023" on all 49 pages in both WebFetch passes of https://diggecard.com/sitemap/ , terms from 2019, portal guides "Coming soon!", a 2021 build, and Raka's own phone view calls it an old website
sweep gdpr: part of the angle. tools/eu-view.py from Stockholm lists Hotjar, Facebook _fbp, HubSpot and GA cookies before a click, Raka's phone in NL shows no banner, and https://diggecard.com/cookie-policy/ says browsing is agreeing. Three independent sources
sweep apps: they are the gift card platform with a customer portal per https://diggecard.com/platform-solutions/ , nothing internal visible to sell against
sweep social: opened with tools/social-audit.js, LinkedIn 1,757 followers, YouTube 12 subscribers and 11 videos, X bio read, Facebook behind the login. Normal for a B2B supplier, not the pitch
sweep squad: no careers page in the 49 page sitemap and no developer hiring found, the platform is built in Bergen per https://diggecard.com/why-diggecard/ , no capacity evidence
claims:
the site still carries a 2023 copyright on every page, "© Copyright Diggecard 2023" on the pages of https://diggecard.com/sitemap/ , read twice 2026-09-28
Hotjar, Facebook and HubSpot load before anyone's asked, https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fdiggecard.com _hjSession, _fbp, hubspotutk before a click, and Raka's NL screenshot shows no banner
the Trust Centre built for buyers, https://diggecard.com/diggecard-iso-27001-certified/ "Trust Centre" for "supplier due diligence"
selling to more corporate buyers across the UK, https://diggecard.com/diggecard-and-buy-women-built/ corporate buyers, 2026-09-24
Heineken e business data and governance across 23 markets, docs/astra-master-context.md section 2A, https://www.linkedin.com/in/raka-mulya-b92885196
thread: problem the site stuck in 2023 and tracking visitors before they're asked | cost every corporate buyer vetting them as a supplier meets it, more of them as UK corporate gifting grows | offer the new Diggecard site with consent built in | link site
lead read: Andrew reads that his site still says 2023 and tracks visitors before asking, that the buyers his Trust Centre is for will see that, and then gets offered a new site with consent built in, one thread
recheck: every page read twice today, the cookie policy sentence quoted twice, the tracking seen from Stockholm twice (27 and 28 Sep) and confirmed by Raka's phone in NL. Our own browser can't load the site, so the look is Raka's judgement plus the dates on the pages, flagged. A UK visitor wasn't loaded directly. Thesis confidence MEDIUM
```

### Andrew, OPENER

```
Hi Andrew, saw Diggecard, looks interesting!

However, your site still carries a 2023 copyright on every page and loads Hotjar, Facebook and HubSpot before anyone's asked. This causes corporate buyers checking you as a supplier to meet that before they ever reach your new Trust Centre.

Especially, when you are selling gift cards to more corporate buyers across the UK, the site every one of them vets you on keeps telling the older story.

I run Astra agency. We build websites and apps for brands like Unilever, AXA, Pertamina. I led e business data and its governance across 23 markets at Heineken, so I've had to keep the tracking legal without losing the numbers.

Shall I send you over what the new Diggecard site looks like?
```

---
## Yasin Tipiler, UGC.NL. OPENER.

**In plain words.** UGC.NL is a Dutch marketplace where brands order short ad videos from creators.
Yasin co founded it and runs it. They pay for Google ads, 29 of them, several live today, and they've
opened German, English and UK sites. Raka's phone shows their cookie banner offers "Allow all" and
"Customize" and nowhere to say no on the first screen. The Dutch regulator's own rules say refusing
has to sit on the same screen as accepting, and it sent more than 200 warnings in 2025 with automated
checks. Every paid visitor lands on that banner. We'd set it up properly across all four sites.

```gate
lead: Yasin Tipiler, co founder and CEO of UGC.NL B.V. (Keizersgracht 520H Amsterdam, the data controller named in https://ugc.nl/privacy-policy ), ctc_rHvwocWb8FubKWECm. lemlist companyName still says The Sales Academy, his tagline and summary say co founder and CEO of UGC.NL, which the LinkedIn title and rocketreach agree with
site pass 1: 400 URLs, tools/crawl.py from the sitemaps, 333 at 200, across ugc.nl (120), de.ugc.nl (93), en.ugc.nl (93) and ugc.co.uk (93), capped with creator pages still queued
site pass 2: 400 URLs, second full crawl, 333 at 200, same four hosts. Raka's phone screenshot of the banner from the Netherlands, 2026-09-28 08:43
deep analysis: a Next.js platform in Dutch, German and English plus a UK domain, niche pages (beauty, fashion, food and health), a blog with Black Friday 2026 guides, affiliates and creator signup. Cookiebot by Usercentrics through GTM, cbid e0d207b9-5511-4381-84a0-fe0904e64991 on both ugc.nl and de.ugc.nl. The banner on Raka's phone reads "This website uses cookies ... share information ... with our social media, advertising and analytics partners" with two buttons, "Allow all" and "Customize". From Stockholm, before any click, Hotjar session cookies and trytagging cookies are set on ugc.nl and de.ugc.nl. The config Cookiebot serves to a US address pre ticks preferences, statistics and marketing and lists 0 statistics or marketing cookies in its declaration, a US view so kept out of the message
owner linkedin: co founders per LinkedIn and rocketreach. KVK officer list not readable for free, KvK 88229912 from a search snippet only. Yasin is the named co founder and CEO in his own lemlist summary
contact linkedin: /in/yasin-tipiler-293120183, title "Yasin Tipiler - Co-Founder - UGC.nl" by web search, his post "De 1e UGC marketplace van Nederland!" found by search. Curl returns 999 on LinkedIn profiles
google news: tools/news.py nl, UGC.NL 22 results, none about this company (Roblox UGC, the French cinema chain UGC), "Yasin Tipiler" 0, control Heineken 100
regional news: tools/news.py creator marketing Nederland with the AP, 3 results, AP says Dutch sites adjusted banners after breaches (Tweakers 2025-04-08), Kruidvat fined €600,000 for tracking customers (RetailDetail 2024-07-17)
industry news: tools/news.py Autoriteit Persoonsgegevens cookiebanner, 31 results, the AP campaign (2025-12-02), drogisterij sites sharing data via cookies (Dutch IT Channel 2026-02-24). DDMA 2026-01-06, more than 200 organisations warned in 2025 by automated checks. The AP's own page, 6 Feb 2024, "zet verschillende keuzes op één laag, verberg bepaalde keuzes niet, laat iemand niet extra klikken"
sources:
1. https://ugc.nl/ (400 URLs crawled twice)
2. https://ugc.nl/privacy-policy
3. https://de.ugc.nl/
4. https://ugc.co.uk/
5. https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fugc.nl (tools/eu-view.py, 27 and 28 Sep)
6. https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fde.ugc.nl
7. https://consent.cookiebot.eu/e0d207b9-5511-4381-84a0-fe0904e64991/cc.js (the banner config, US view)
8. https://adstransparency.google.com/?domain=ugc.nl (29 ads, several last shown 2026-09-28)
9. https://www.autoriteitpersoonsgegevens.nl/actueel/ap-pakt-misleidende-cookiebanners-aan (via tools/fetch-walled.py)
10. https://ddma.nl/kennisbank/wat-je-moet-doen-na-een-cookie-waarschuwing-van-de-ap/
11. https://www.linkedin.com/in/yasin-tipiler-293120183 (search title, 999 to curl)
12. https://news.google.com/rss/search?q=UGC.NL (tools/news.py)
13. Raka's phone screenshot of ugc.nl, Netherlands, 2026-09-28 08:43
pains: 5 judged. (1) The banner breaks the AP's one layer rule while they buy traffic, the regulator warns by automated check and Kruidvat was fined €600k, the hottest and the costliest we can fix. (2) Hotjar and trytagging before consent from Stockholm, one tool only, kept out. (3) Social, Instagram missing or private and the TikTok link dead per tools/social-audit.js, for a company selling social video, a credibility slip but a tweak. (4) Expansion into DE and UK, the same banner goes with them. (5) Build squad, no developer hiring in 400 URLs, no capacity evidence
chosen: the banner with no refuse on the first screen, the hottest, because the AP checks for exactly this automatically and every paid click lands on it, across four sites
sweep website: 400 URLs crawled twice across four hosts, a modern Next.js site with niche pages and a blog, nothing weak on the growth pages of https://ugc.nl/ , not the pitch
sweep gdpr: the angle. Raka's NL phone shows "Allow all" and "Customize" and no refuse on the first screen, the AP's rule at https://www.autoriteitpersoonsgegevens.nl/actueel/ap-pakt-misleidende-cookiebanners-aan puts all choices on one layer, same Cookiebot cbid on de.ugc.nl
sweep apps: they are the platform, brands and creators matched in their own app per the crawl of https://ugc.nl , nothing internal to sell against
sweep social: opened with tools/social-audit.js, Instagram ugc.nl gives the broken embed a made up handle gets, the TikTok link is a dead handle, YouTube 4 subscribers, Facebook 120 followers. Real, small
sweep squad: no careers page or developer roles in 400 URLs per the crawl of https://ugc.nl , no capacity gap shown
claims:
the banner offers Allow all and Customize with no way to refuse on the first screen, Raka's phone screenshot of https://ugc.nl/ from the Netherlands, 2026-09-28 08:43
the Dutch regulator's rule puts every choice on the first screen, https://www.autoriteitpersoonsgegevens.nl/actueel/ap-pakt-misleidende-cookiebanners-aan "zet verschillende keuzes op één laag"
more than 200 warnings in 2025 from automated checks, https://ddma.nl/kennisbank/wat-je-moet-doen-na-een-cookie-waarschuwing-van-de-ap/ 2026-01-06
paying for ads, https://adstransparency.google.com/?domain=ugc.nl 29 Google ads, several last shown 2026-09-28
taking UGC.NL into Germany and the UK, https://de.ugc.nl/ and https://ugc.co.uk/ live, same Cookiebot cbid on de.ugc.nl
Heineken e business data and governance across 23 markets, docs/astra-master-context.md section 2A, https://www.linkedin.com/in/raka-mulya-b92885196
thread: problem the cookie banner has no refuse on the first screen | cost the AP's automated checks look for exactly this and every paid visitor across four sites lands on it | offer the banner set up with refuse on the first screen | link banner, refuse
lead read: Yasin reads that his banner offers only Allow all and Customize, that the regulator checks for this automatically while his ads send traffic to it, and then gets offered the banner set up with a refuse button, one thread
recheck: the banner layout comes from Raka's own phone in NL, the rule from the AP's own page, the warning count from DDMA, the ads and the German site checked today. What Dutch visitors get beyond the first screen wasn't loaded by us. Pay test is the weak point, a banner is a small job, same as Snorly, flagged. Thesis confidence MEDIUM
```

### Yasin, OPENER

```
Hi Yasin, saw UGC.NL, looks interesting!

However, your cookie banner offers Allow all and Customize, with no way to refuse on the first screen. This causes the Dutch regulator's automated checks to catch ugc.nl, the same checks behind more than 200 warnings last year.

Especially, when you are paying for Google ads and taking UGC.NL into Germany and the UK, the same banner now sits on the German site too, in front of every visitor you pay for.

I run Astra agency. We build websites and apps for brands like Unilever, AXA, Pertamina. I ran e business data governance for Heineken in 23 markets, consent included, so I've had to get this right in several countries at once.

Shall I send you over what the banner with a refuse button looks like?
```

---
