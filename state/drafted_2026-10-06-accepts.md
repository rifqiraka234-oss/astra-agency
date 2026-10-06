<!-- New accepts 2026-10-06. Red teamed. Nothing sent. Re pull thread and reopen /impressum, /imprint, /data-privacy, /forcafes before sending. -->
# New accept opener, 2026-10-06

### Frank Hemmert, Baked, ctc_CLQ5T3DEaeG2SMG9d

Red team FIX applied (risk wording toned down to match UWG 13(4) and DDG 33, Heineken ending narrowed to the privacy page). Evidence state/accepts_2026-10-06/.

```gate
lead: Frank Hemmert, co owner (Gesellschafter) of Hemmert & Narcy GbR trading as baked., Sonnenallee 161, 12059 Berlin, ctc_CLQ5T3DEaeG2SMG9d, leadId lea_tjmpcyz9Yn3RJYuuv, lemlist jobTitle Co-Founder, campaign W1b. https://www.get-baked.store/imprint English block "Represented by the partners Ms. Adélaïde Narcy and Mr. Frank Hemmert", reopened 2026-10-06 19:24 UTC. A GbR has no Handelsregister entry, northdata search returned no company. Tagline "Data Annotator at DataAnnotation" is a current side job, not a former owner signal, the shop trades. Thread re pulled 19:23 UTC, 0 activities, nextPage null, control ctc_JYWKs8LSRDxAreesA 10 items same minute, sentOnly "Hemmert" shows only the 13:08 UTC connect note
site pass 1: 56 URLs, tools/crawl.py with the Squarespace sitemap plus link crawl, every page text read, by the b8_frank researcher 2026-10-06 19:05 to 19:40 UTC
site pass 2: 56 URLs, second full crawl equal to pass 1, site-audit.js render trusted with 0 failed requests, desktop and phone screenshots of home opened, store, about, for cafés, business contact form rendered in Playwright, plus my own refetch of home, store, forcafes, imprint, impressum and data privacy and a Chromium click on the footer Imprint link at 19:26 UTC
deep analysis: A modern, well photographed Squarespace shop for a one woman Lichtenberg bakery. Consumers order cookie and brownie batches for next day pickup through the cart, cafés and catering get one generic contact form. The legal layer was never finished. The footer Imprint link on every page goes to /impressum, a 404, while the real page sits unlinked at /imprint with a VAT placeholder and German and English blocks that name different representatives. The privacy page covers only Squarespace hosting, says nothing about cookies, reCAPTCHA, Weglot, Adobe fonts or order data, and its English block still reads "[insert email address]". No terms, withdrawal or shipping page in the sitemap
owner linkedin: Adélaïde Narcy, the other partner and the baker. Route 1, no profile URL on the site or in lemlist to fetch. Route 2, web search "Adélaïde Narcy" baked Berlin returned nothing about her. Route 3, posts search, nothing. Route 4, people data sites, nothing found. Route 5, company page https://www.linkedin.com/company/baked-berlin read via social-audit.js, "Hemmert & Narcy GbR, Caterers". Route 6, her own words on https://www.get-baked.store/aboutme "I am your baker, Adélaïde", "a one-woman bakery"
contact linkedin: Frank is a co owner, same business, confirmed by the English imprint and lemlist jobTitle. Route 1 curl https://www.linkedin.com/in/frank-hemmert-73b68a129 999. Route 2 search "Frank Hemmert" Berlin, no matching person. Route 3 search with DataAnnotation and baked, nothing. Route 4 company page as above. Route 5 his words on the site, none beyond the imprint. Route 6 lemlist record, tagline only, no summary
google news: tools/news.py de, "baked. Berlin" 0, "Hemmert Narcy" 0, "Frank Hemmert" 1 unrelated (2024 Main Post Leubach), control Volkswagen 100
regional news: tools/news.py Berlin cookies, Berliner Zeitung 2025-11-20 on Annis Cookie Kitchen and Round & Edgy, nothing on baked. Berlin Chili Fest 4 to 6 Sep 2026 at Berliner Berg opened at lepetitjournal.com
industry news: tools/news.py Online Shop Impressum Abmahnung, plus the IHK Düsseldorf Impressum guidance opened at source, January 2026, "leicht erkennbar, unmittelbar erreichbar und ständig verfügbar" and "eine Abmahnung wegen Verstoßes gegen das UWG", and the IHK Rheinhessen and Händlerbund pages found in the same search
sources:
1. https://www.get-baked.store/
2. https://www.get-baked.store/store
3. https://www.get-baked.store/imprint
4. https://www.get-baked.store/impressum
5. https://www.get-baked.store/data-privacy
6. https://www.get-baked.store/forcafes
7. https://www.get-baked.store/contact-me-business
8. https://www.get-baked.store/aboutme
9. https://www.get-baked.store/sitemap.xml
10. https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fwww.get-baked.store (tools/eu-view.py)
11. https://www.instagram.com/getbaked.berlin/
12. https://www.facebook.com/getbaked.berlin
13. https://www.linkedin.com/company/baked-berlin
14. https://www.linkedin.com/in/frank-hemmert-73b68a129 (999, walled)
15. https://www.northdata.com (search Hemmert & Narcy GbR, no register entry)
16. https://lepetitjournal.com/berlin/agenda/spectacles/berlin-chili-fest-2026-le-festival-epice
17. https://www.ihk.de/duesseldorf/recht-und-steuern/recht/internetrecht/impressum-5109750
18. https://www.haendlerbund.de/de/news/aktuelles/wissenssnack/kurz-erklaert-kein-impressum-strafe
19. https://news.google.com/rss (tools/news.py, company, person, region, industry, control)
pains: 6 judged. (1) legal basics broken on a shop that takes orders, footer Imprint 404, VAT and email placeholders, privacy page silent on cookies and order data, no terms, chosen. (2) café and catering orders through one free text form, no volume proof. (3) newest product only on Instagram, a tweak. (4) social quiet April to September, a tweak. (5) personal AI for Frank, only a tagline. (6) Build Squad, not applicable
chosen: (1), the costliest proven pain, because a German shop with a broken Imprint link and placeholder legal text is exposed to an Abmahnung or a DDG fine per IHK Düsseldorf, it touches every order page, and the bigger outcome is a shop that's legally safe to keep growing
sweep website: https://www.get-baked.store/ modern Squarespace shop, render trusted, 0 failed requests, not dated, café ordering via one form at https://www.get-baked.store/contact-me-business and Peanut Inferno missing from the store, both small or unproven, not chosen
sweep gdpr: tools/eu-view.py from Stockholm on https://www.get-baked.store , 1 first party cookie and Weglot plus Adobe Typekit requests before a click, banner with reject present, privacy page https://www.get-baked.store/data-privacy covers only hosting and shows "[insert email address]", footer Imprint link 404, chosen as the legal thread
sweep apps: café and catering requests by free text on https://www.get-baked.store/forcafes and https://www.get-baked.store/contact-me-business , an ordering workflow fits but no café count or order volume is visible anywhere, not chosen
sweep social: tools/social-audit.js on the links in their HTML, https://www.instagram.com/getbaked.berlin/ 95 followers, 33 posts, latest 2026-09-22, Facebook 18 followers with dates behind login, small and active enough, not chosen
sweep squad: a one woman bakery per https://www.get-baked.store/aboutme , no developers, no product team, nothing to supplement, not applicable
thread: problem the shop's Imprint link opens a missing page and the privacy page has a placeholder email | cost a shop taking online orders risks legal warning letters and fines, more likely as more people find it | offer the legally safe Baked shop | link shop
lead read: Frank reads that his shop's Imprint link goes nowhere and his privacy page still has a placeholder, that a shop taking orders in Germany can get warning letters for that and the risk grows as more people find it, and gets offered the legally safe Baked shop, one thread
claims:
your shop's Imprint link opens a missing page, https://www.get-baked.store/ and https://www.get-baked.store/store footer anchor "Imprint" href "/impressum", https://www.get-baked.store/impressum HTTP 404 "We couldn't find the page you were looking for", clicked in Chromium 19:26 UTC, curl 19:24 UTC, controls /imprint 200 and example.com 200
the privacy page has a placeholder email, https://www.get-baked.store/data-privacy "Email: [insert email address]", fetched 19:24 UTC
a shop that takes online orders, https://www.get-baked.store/store "Order by 15:00 on the previous day" with cart and batch options, fetched 19:24 UTC
risk legal warning letters and fines, https://www.ihk.de/duesseldorf/recht-und-steuern/recht/internetrecht/impressum-5109750 "eine Abmahnung wegen Verstoßes gegen das UWG erfolgen kann", opened 19:30 UTC, and https://www.gesetze-im-internet.de/ddg/__33.html § 33 (2) Nr. 1 with § 5 (1), a fine up to fünfzigtausend Euro for Impressum information given "nicht, nicht richtig oder nicht vollständig", opened by the red team 19:52 UTC. "costly" was cut because https://www.gesetze-im-internet.de/uwg_2004/__13.html (4) bars a competitor from charging its lawyer costs for exactly these faults, and § 13a (2) bars a penalty on a first warning to a firm under 100 staff, associations still can
adding new flavours, https://www.get-baked.store/store "More flavours coming soon." and https://www.instagram.com/getbaked.berlin/ Peanut Inferno launched for Berlin Chili Fest, 2026-09-22
selling to cafés, https://www.get-baked.store/forcafes "Your friendly neighbourhood supplier for quality cookies and brownies ... I deliver directly to your café", fetched 19:24 UTC
Heineken credential, docs/astra-master-context.md section 2A, Global E-Business Data and Insights Lead, data governance across regions, https://www.theheinekencompany.com and https://www.linkedin.com/in/raka-mulya-b92885196 , wording from the approved Melba line in state/drafted_2026-10-06-simple.md
recheck: 2026-10-06 19:24 to 19:31 UTC, home, store, imprint, impressum, data privacy and forcafes refetched with curl and the legal lines grepped from the fresh copies, the footer link clicked in Chromium and the screenshot opened, sitemap read, four terms and withdrawal paths 404, IHK page opened. Thesis confidence MEDIUM, every fact is on their own pages, that a warning letter is likely is inference, and each fix alone is small, so the offer has to be the whole legally safe shop
```

OPENER
```
Hi Frank, saw Baked, looks interesting!

However, your shop's Imprint link opens a missing page, and the privacy page still has a placeholder email. This causes a shop that takes online orders to risk legal warning letters and fines.

Especially, when you are adding new flavours and selling to cafés, the more people find the shop, the likelier it's spotted.

I run Astra agency. We build websites for brands like Unilever, AXA, Pertamina. I was Heineken's global data and insights lead, where data governance was part of the job, so I know what a privacy page can't leave out.

Shall I send you over what the legally safe Baked shop looks like?
```
