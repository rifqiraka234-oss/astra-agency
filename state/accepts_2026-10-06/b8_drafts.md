<!-- Batch 8 judge pass, 2026-10-06 about 19:20 to 20:10 UTC. One opener, two closed. Nothing sent, no lemlist writes, no commit. Every thread re pulled immediately before drafting, and again before any send. -->
# Batch 8, three leads, judged and drafted, 2026-10-06

Screen for all three, run 2026-10-06 about 19:23 UTC. get_inbox_conversation returned 0 activities, nextPage null, for ctc_CLQ5T3DEaeG2SMG9d, ctc_mQBx2Mr64rqs7v4Qu and ctc_4a2LnTP8kLSHufaRh, and the positive control ctc_JYWKs8LSRDxAreesA (taken from state/drafted_2026-10-06-personal.md) came back with 10 activities in the same minute. sentOnly searches for "Hemmert", "Bergé" and "Khochaba" each show only our generic connect note for that contactId (13:08 UTC 6 Oct, 14:01 UTC 3 Oct, 14:07 UTC 6 Oct), lastRepliedAt null. A grep of state/ and logs/ for every name, company, domain, contactId and leadId finds only the copies of today's evidence in state/accepts_2026-10-06/, so there's no prior verdict and nothing was sent.

## Frank Hemmert, Baked (Hemmert & Narcy GbR), ctc_CLQ5T3DEaeG2SMG9d

Verdict DRAFT, angle GDPR and legal as the proof, offer the legally safe Baked shop. Confidence MEDIUM.

Plain words. Baked is a small Berlin cookie and brownie bakery with an online shop that takes orders. The Imprint link in the footer of every page opens a "can't find this page" screen, the real imprint still shows its VAT number as DE XXXXXXXXXXX, and the English privacy text says "[insert email address]". In Germany that's what gets a shop a lawyer's warning letter, and nobody at a one baker business with a co owner who has a day job has fixed it in a year.

Pain table.

| # | Pain | Fact and URL | What it costs them | Pay | Tweak | Unprompted |
|---|---|---|---|---|---|---|
| 1 | Legal basics broken on a shop that takes orders | footer Imprint href /impressum is a 404 on every page, VAT "DE XXXXXXXXXXX", privacy "[insert email address]", privacy page covers only hosting while Weglot, Adobe fonts and reCAPTCHA load, no terms or withdrawal page in the sitemap, https://www.get-baked.store/impressum https://www.get-baked.store/imprint https://www.get-baked.store/data-privacy | an Abmahnung under UWG or a DDG fine, per IHK Düsseldorf, against a two partner GbR, plus trust at checkout | yes at the 500 euro floor, a complete legal set plus a shop that covers its own data use | borderline, each item is small, but it's a DIY Squarespace site with no web person and it's sat broken since about Oct 2025 | yes, a warning letter is the thing every German shop owner fears | CHOSEN |
| 2 | Café and catering orders through one free text form | https://www.get-baked.store/forcafes "easy ordering", https://www.get-baked.store/contact-me-business generic form, no price list | slower café orders, but no volume is visible | unproven | no | unknown | not chosen, no proof of demand |
| 3 | Newest product only on Instagram | Peanut Inferno, 2026-09-22 posts on https://www.instagram.com/getbaked.berlin/ , not in the store crawl | a few lost sales on a festival limited edition | no | yes, a tweak | no | not chosen |
| 4 | Social quiet April to September | social-audit.js, 95 followers, six visible posts | small | no | yes | no | not chosen |
| 5 | Personal AI workflow for Frank | only the tagline "Data Annotator at DataAnnotation", nothing on what eats his week | unknown | unknown | n/a | no | not chosen, and he works in AI data himself |
| 6 | Build Squad | a one baker food business, https://www.get-baked.store/aboutme | none | no | n/a | no | not applicable |

Why the others lose. The café ordering workflow is the bigger sale on paper, but no clue shows how many cafés order or that the inbox is a problem, so it would be invented pain. The rest are tweaks. The legal gap is proven on their own pages three ways and has a real, named cost in Germany.

Falsification. I opened the page that would prove it wrong, the real imprint at /imprint (200), so the message says the LINK opens a missing page, not that there's no imprint. I clicked the footer link in Chromium from /store, it landed on /impressum showing "We couldn't find the page you were looking for" (screenshot footer_click.png opened), and curl gave 404 for /impressum with /imprint, /data-privacy and example.com at 200 in the same minute. I also checked for a German language copy with a different link, and there's no hreflang alternate and the sitemap has no /de pages. The privacy placeholder was quoted from a fresh fetch. I left out the ODR claim (unverified), the outdated § 55 RStV (true but legal jargon), and the claim that the Imprint is missing (it isn't, it's unlinked).

Flag for Raka. Two partners, and only Adélaïde is named in the German imprint, while the English one names both and makes Frank content responsible. The message talks about the shop, never about who bakes. The credential tail differs from the Melba wording. "Heineken's global data and insights lead, where data governance was part of the job" is the approved text, and "so I know what a privacy page can't leave out" is new (red team cut "a shop's legal pages", since data governance backs a privacy page and not imprint law, and the Melba tail "keep your numbers and still ask first" is about tracking consent, which this message never raises). If you'd rather keep the exact approved tail, say so. Red team also cut "costly" from block two, a competitor can't charge lawyer costs for imprint or privacy faults against a firm this size since 2020, so the honest risk is warning letters, mostly from associations, and a fine.

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

## Nicolas Bergé, BRG CASH (Promocash Narbonne), ctc_mQBx2Mr64rqs7v4Qu

Verdict NO_DRAFT, NO_STRONG_ANGLE. Confidence HIGH that nothing honest survives.

Plain words. Nicolas bought the Promocash wholesale franchise in Narbonne a year ago and runs it with 22 staff. Everything a customer touches online, the website, the store page and since 2 October a new national ordering app, belongs to Promocash head office, so there's nothing there for us to fix. The only things he says he wants, more local fruit and veg suppliers and fast service, are handshake and phone work, and nothing in his own words says he's short of time.

Pain table.

| # | Pain | Fact and URL | Cost | Pay | Tweak | Unprompted | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | Local producer partnerships | his words "développer les partenariats avec les filières locales, notamment celles des fruits et légumes", https://www.lindependant.fr/2025/11/05/une-nouvelle-gerance-pour-lenseigne-promocash-de-narbonne-13034857.php | unknown, sourcing is relationship work and franchise listing rules aren't public | no proof | n/a | yes as a goal, not as a tool need | fails, an AI workflow doesn't find him farmers |
| 2 | Following up restaurant accounts | sales background, "Réactivité et flexibilité" same article | inferred only | unknown | n/a | no | fails, invented pain |
| 3 | Customer ordering | national app launched, https://www.observatoiredelafranchise.fr/indiscretions-actualite/PROMOCASH-promocash-digitalise-la-relation-client-avec-une-appli-mobile-84668.htm , 2026-10-02 | covered by head office | n/a | n/a | n/a | the franchisor already solves it, RULES 4A rule 7 |
| 4 | Website and GDPR | corporate page https://www.promocash.com/ecommerce/magasin/a007R00000wy6jsQAA/narbonne , _ga before consent from Stockholm | the franchisor's to fix | n/a | n/a | n/a | not his |
| 5 | His LinkedIn page quiet two months, seasonal hiring | https://www.linkedin.com/company/promocashnarbonne 514 followers | small | no | yes | no | fails tweak test |
| 6 | Personal AI workflow | nothing in his own material on how his week goes | unknown | n/a | n/a | n/a | the brief forbids inventing it |

Falsification. I reopened both pages the verdict rests on at 19:33 UTC. The Observatoire article is dated 2026-10-02 and says the app is meant "faire gagner un temps précieux aux restaurateurs", which kills any ordering or reorder tool. L'Indépendant 2025-11-05 still reads "son propre patron", 22 staff and the filières locales quote, and nowhere does it name a process that eats hours. Note, the researcher saw cam_PryZp5LuvQv8NznHh as paused at 19:06 UTC.

```sweep
lead: Nicolas Bergé, gérant of BRG CASH EURL (SIREN 991264359, since 12 Sep 2025), the Promocash Narbonne franchisee, ctc_mQBx2Mr64rqs7v4Qu. Thread re pulled 2026-10-06 19:23 UTC, 0 activities, sentOnly shows only our 3 Oct connect note, control 10 items. Owner per https://www.pappers.fr/entreprise/brg-cash-991264359 and https://www.lindependant.fr/2025/11/05/une-nouvelle-gerance-pour-lenseigne-promocash-de-narbonne-13034857.php
website: no domain of his own, https://narbonne.promocash.com/ 301s to the corporate homepage and the store page https://www.promocash.com/ecommerce/magasin/a007R00000wy6jsQAA/narbonne is the franchisor's Salesforce template, identical across stores, nothing he can change, off limits
gdpr: tools/eu-view.py from Stockholm on the corporate store page set _ga and _ga_GHD3BY01LK before a click under a OneTrust banner, real but Promocash France's site, https://www.promocash.com , not his to fix
apps: ordering, scanning, pickup choice and invoices are in the national app launched 2026-10-02 per https://www.observatoiredelafranchise.fr/indiscretions-actualite/PROMOCASH-promocash-digitalise-la-relation-client-avec-une-appli-mobile-84668.htm , and his own stated goals in L'Indépendant, local producer partnerships and fast service, are relationship work with no process visible to automate
social: tools/social-audit.js on https://www.linkedin.com/company/promocashnarbonne read 514 followers, 10 posts in six months, none in the last two, a seasonal hiring post, small and a tweak, no Facebook or Instagram tied to him
squad: a cash and carry wholesaler with 22 staff per https://www.lindependant.fr/2025/11/05/une-nouvelle-gerance-pour-lenseigne-promocash-de-narbonne-13034857.php , builds no software, nothing to supplement
verdict: NO_STRONG_ANGLE. Default angles A, B and C all hunted. A, the franchisor's new app already covers ordering and nothing else he runs is visibly manual. B, no site of his own. C, nothing in his own words about his time. Re-test if he posts about a local sourcing or sales problem of his own
```

## Adad-Nirari Khochaba, Evergoods Life GmbH (Nature Nation), ctc_4a2LnTP8kLSHufaRh

Verdict NO_DRAFT, NO_STRONG_ANGLE with an incumbent flag. Confidence MEDIUM to HIGH.

Plain words. Adad runs Nature Nation, a supplement and skincare shop on Shopify. Its GDPR fault is real and proven. German visitors get Meta, TikTok, Microsoft and Google ad cookies before they agree to anything. But the shop's Google ads are run by nexgeon GmbH, an e commerce traffic company registered at the same Wiesbaden address as his company, with "web development" in its registered purpose. So he already has an e commerce team next door, and the fix is a few settings changes for them. That's Tomatoworld's lesson 2. Our diagnosis would just become free input for his own partner.

New evidence found on this judge pass, not in the researcher's file.
- tools/eu-view.py --ads naturenation.de, run 19:36 UTC. 17 Google ads on naturenation.de, every one with the advertiser "Nexgeon GmbH", first shown 2025-08-19, last shown 2026-10-06.
- https://nexgeon.com/de/impressum (200, 19:40 UTC), "NEXGEON GmbH Ostring 11 65205 Wiesbaden Vertreten durch: Armen Georgi Sardarian HRB: 25710". The homepage https://nexgeon.com/de/ is titled "Nexgeon - Ihr kompetenter Partner im E-commerce", with fashion traffic portals.
- https://www.naturenation.de/policies/legal-notice (200, 19:40 UTC), "Evergoods Life GmbH Ostring 11 65205 Wiesbaden ... HRB 35167 ... Geschäftsführer: Herr Khochaba". The same address.
- North Data, nexgeon GmbH HRB 25710, via tools/fetch-walled.py, gives the purpose "IT services, web development, project development, management and conception" and Armen Sardaryan as MD since 2011. Evergoods' other shareholder is unknown (Premium), so whether nexgeon or Sardarian is the co founder is inference and goes nowhere near a message.

Pain table.

| # | Pain | Fact and URL | Cost | Pay | Tweak | Unprompted | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | Ad pixels before consent for German shoppers | eu-view.py rerun 19:36 UTC, _fbp, _ttp, _uetvid, _gcl_au, _clck before a click, Shopify banner regionVisibility ["AX"], Pandectes first layer offers only Einstellungen and Annehmen | Abmahnung risk since BGH 27 Mar 2025, a fine, trust | would be yes | fails, a banner region and a Pandectes template change for an in house e commerce partner | maybe | the incumbent rule, not ours |
| 2 | Stock not keeping up with 385 products | 21 sold out in products.json, 4 of 5 homepage supplement tiles "Ausverkauft" | lost sales | unproven cause | n/a | maybe | inference, stock likely sits in the supplier platforms |
| 3 | Pflegeplan and WhatsApp replies | Klaviyo and Zoko already automate it, "in wenigen Sekunden", https://www.naturenation.de/pages/pflegeguide | none shown | no | n/a | no | already automated |
| 4 | Content volume | 126 blog posts in Sep 2026 | none | no | n/a | no | they already run a content pipeline |
| 5 | evergoods.de Wix holding page, socials linked to Wix's own accounts | https://www.evergoods.de/ | small, the company doesn't trade there | no | yes | no | tweak |
| 6 | Small organic social | Instagram 414 followers, quiet 33 days | small for a paid traffic shop | no | yes | no | not chosen |
| 7 | Personal AI for Adad | tagline only, lecturing unverified | unknown | n/a | n/a | n/a | weak |
| 8 | Build Squad | consumer brand, and its web partner is next door | none | no | n/a | no | not applicable |

Falsification of the strongest pick. I reran the EU view to see whether the GDPR fault holds. It does. Then I looked for who already runs the shop's marketing, and the ads lookup named an e commerce company at his own address. That killed the pitch, not the fault.

Flag for Raka. If you'd still like to send something, the only honest message is a short heads up about the AX only banner as a favour, with no pitch. Don't send that as an opener. Your call.

```sweep
lead: Adad-Nirari Khochaba, sole Geschäftsführer of Evergoods Life GmbH (HRB 35167 Wiesbaden), brand Nature Nation, ctc_4a2LnTP8kLSHufaRh. Thread re pulled 2026-10-06 19:23 UTC, 0 activities, sentOnly "Khochaba" shows only the 14:07 UTC connect note, control 10 items. Ownership per https://www.naturenation.de/policies/legal-notice and https://www.northdata.com/Evergoods%20Life%20GmbH,%20Wiesbaden/HRB%2035167
website: https://www.naturenation.de/ is a professional paid Shopify Flow theme with 385 products and heavy tooling, and only the holding page https://www.evergoods.de/ is a Wix template with socials linked to Wix's own accounts, a tweak that doesn't trade, not chosen
gdpr: tools/eu-view.py --shopify from Stockholm on https://www.naturenation.de , run 19:36 UTC, _fbp, _ttp, _uetvid, _gcl_au and _clck before any click, Shopify banner regionVisibility AX only, real and the hottest fault, but a settings change for the e commerce partner at the same address, https://nexgeon.com/de/impressum Ostring 11 65205 Wiesbaden
apps: Klaviyo, Zoko, Loox and AfterShip already run the Pflegeplan and support per https://www.naturenation.de/pages/pflegeguide , 126 blog posts in September show a content pipeline exists, and the 21 sold out products point at supplier stock, not a tool we'd build
social: tools/social-audit.js on the links in their HTML, https://www.instagram.com/naturenation.de/ 414 followers latest post 2026-09-03, Facebook 665, TikTok walled, small organic reach for a shop that sells on paid traffic, not the costliest pain
squad: a consumer brand per https://www.naturenation.de/ whose Google ads run under nexgeon GmbH, registered purpose IT services and web development, https://www.northdata.com/Nexgeon%20GmbH , so the build capacity sits next door already
verdict: NO_STRONG_ANGLE. The GDPR fault is real, but an existing e commerce and web partner at the same address runs the ads, so our diagnosis would be free input for them (ICP lesson, Tomatoworld, point 2). A favour note about the AX only banner is Raka's call, not an opener
```
