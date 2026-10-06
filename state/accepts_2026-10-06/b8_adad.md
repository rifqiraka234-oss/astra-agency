# Evidence, Adad-Nirari Khochaba, Evergoods Life GmbH / Nature Nation, ctc_4a2LnTP8kLSHufaRh

Researcher b8_adad, 2026-10-06 ~19:10 to 20:00 UTC. Read only. Nothing sent, no lemlist writes, no git.

## STOP FLAGS

- Thread activity: NONE. 0 items on `get_inbox_conversation`. The sentOnly list holds only our connect note (sent 2026-10-06 14:07 UTC, accepted 16:04 UTC). He has never replied, and we have sent nothing beyond the connect note.
- Not owner: NO STOP. The register and both Impressums name him as the only Geschäftsführer. "Co-Founder" means there is probably a second shareholder. North Data shows "One known shareholder" behind a paywall, so his stake is unconfirmed.
- Closed: no. Wrong domain: no. evergoods.de is his. **But evergoods.de is not where the business trades.** It is a one page Wix holding site. The consumer business is the brand **Nature Nation** on **naturenation.de, which runs on Shopify** (paid theme "Flow"), not on a DIY builder. **W1b's premise only fits the holding page, not the shop.** Read the angle sections with that in mind.

## Thread

- `get_inbox_conversation(ctc_4a2LnTP8kLSHufaRh)` returned totalItems 0, nextPage null, and linkedinSync was "recent", 2026-10-06T18:58:51Z. The caller's positive control from ~19:05 came back full, but I did not rerun a control myself in this session.
- `get_inbox_conversations` search "Adad-Nirari Khochaba":
  - sentOnly returned 1 conversation, ibx_qbex5swd2YZFXm3Te, lastSentAt 2026-10-06T14:07:40Z, preview "Hi Adad-Nirari, saw your business and thought it was cool 😀 I'm a business owner too! Would love to" (the connect note), lastRepliedAt null, isYourTurn false.
  - myConversations returned 0.
- Status: Silent accepted, opener territory.

## Record (search_campaign_leads id lea_4kZ5hqiXvmHi7zafq)

jobTitle "Co-Founder & Managing Director". companyName "Evergoods Life GmbH". companyDomain evergoods.de. Industry Manufacturing. Size 1-10. Location Wiesbaden, Hesse. Tagline "Lecturer | Business Psychologist | Entrepreneur". companyLinkedinUrl /company/evergoods-life-gmbh. Status inProgress, campaign W1b running.
The record has no summary or experience fields. The tagline doesn't contradict companyName, and there's no "former" or "ex". Nothing in the record names Nature Nation, so the link comes from the Impressum (below).

## Ownership, statutory

- North Data (fetched via fetch-walled.py, as chrome, 200), https://www.northdata.com/Evergoods%20Life%20GmbH,%20Wiesbaden/HRB%2035167
  - Amtsgericht Wiesbaden HRB 35167, EUID DEM1906.HRB35167, Ostring 11, 65205 Wiesbaden.
  - "26 Jul 2024 Registration · Managing Director: Adadnirari Khochaba · Capital: €25,000 · Legal form: GmbH".
  - Gesellschafterliste and Satzung dated 7 Jun 2024. "30 Oct 2024 Wordmark: 'Nature Nation'".
  - Purpose (EN gloss) "development, trade and distribution of goods and consumer goods, in particular foodstuffs such as fo..." (truncated on the page).
  - "One known shareholder", Premium only.
- North Data person page https://www.northdata.com/Khochaba,%20Adadnirari,%20Wiesbaden/rlc lists one network company, Evergoods Life GmbH. No other companies appear.
- evergoods.de/impressum "Geschäftsführer: Herr Khochaba ... HRB 35167 ... USt-ID DE369265341".
- naturenation.de/policies/legal-notice gives the same: "Evergoods Life GmbH Ostring 11 ... HRB 35167 ... Geschäftsführer: Herr Khochaba", email hallo@naturenation.de. **This ties Nature Nation to him statutorily.**
- Verdict: he runs the company (sole MD). He co-owns it per his title. The exact stake is not visible.

## Prior research

`grep -rn "khochaba|evergoods|4a2LnTP8" state/` returned no hits. There is no prior verdict and no prior draft.

## Website 1, evergoods.de (Wix)

- Stack: `<meta name="generator" content="Wix.com Website Builder">`, siteRevision 42, "isPremiumDomain":true.
- crawl.py pass 1 read 4 pages (3 from sitemaps), all 200, all de. Pass 2 also read 4 pages, same 200s, so pass 2 >= pass 1.
- Pages are /, /impressum and /datenschutz. START, INFO, BRANDS, KUNDEN and KONTAKT are anchors on the one homepage.
- Homepage text:
  - "Evergoods Life Natural Products for Health and Well-Being".
  - Über uns, with "leidenschaftliches Team" (passionate team) and "internationale Standards in der Gesundheitsförderung zu setzen" (to set international standards in health promotion).
  - "Unsere Brand Nature Nation" (logo links to http://www.naturenation.de).
  - Kunden is a general paragraph with no customer names.
  - Kontakt has a newsletter field and info@evergoods.de. Footer "© 2024 Evergoods Life GmbH".
- Impressum lists "Bildquellen: https://wix.com/" (image sources are Wix stock).
- Screenshots opened:
  - Desktop shows a full width stock photo of a snowy mountain lake, the wordmark "Evergoods Life" letter spaced, and the subtitle on a grey highlight bar. Facebook, X and Instagram icons sit in the footer, with a Wix chat widget "Wollen wir chatten?".
  - Phone shows only the header and the mountain photo above the fold.
- site-audit.js reported 0 page errors and 14 failed requests. It did not print RENDER NOT TRUSTED.
- **Every link clicked (hrefs from the HTML):**
  - https://www.evergoods.de (7×), /impressum, /datenschutz, mailto:info@evergoods.de.
  - http://www.naturenation.de (2×, the brand logo).
  - **https://www.facebook.com/wix, https://www.instagram.com/wix and https://www.twitter.com/wix.** These are the template's default social icons, still pointing at Wix's own accounts. social-audit confirms instagram.com/wix has 893,575 followers and 2,621 posts, so it's Wix's account, not theirs.
- Datenschutz: the controller is Evergoods Life GmbH, with phone +49 177 400 8392.

## Website 2, naturenation.de (Shopify, the actual shop)

- Stack: `Shopify.theme = {"name":"OHNE 55€ Curcuma-Geschenk v2 (PDP + Cart)", "schema_name":"Flow","schema_version":"39.2.0","theme_store_id":801}`, a paid Shopify theme. The live theme's name ("ohne" means "without") suggests they're A/B testing a gift offer.
- crawl.py pass 1 hit the 150 cap (de 112, en 37) with 47,445 links queued. Pass 2 also hit 150 (en 148). Both caps were filled by blog and product URLs.
- So I also fetched every URL in sitemap_pages_1.xml, all **83 static pages**, and extracted their body text into pg/*.txt. The sitemap lists 162 blog URLs. products.json returns **385 products**.
- Text I read in full: home, uber-uns, haufige-fragen, pflegeguide, test1, test1-1, test1adasd and legal-notice. The others got a keyword scan.
- site-audit.js printed **RENDER NOT TRUSTED** (12 of 12 failed assets are fine over direct fetch), so its screenshots are void. I ran render-via-curl.js and opened parts 0, 1, 3 and 5. It still printed "Still gaps", so I make no broken image claims.
- What the curl render shows:
  - Part 0: a nav with 9 categories and a Propolis Salbe hero, with the cookie popup "Wir respektieren deine Privatsphäre" offering [Einstellungen] [Annehmen]. A WhatsApp bubble, a "+ 30.000 ZUFRIEDENE KUNDEN" strip, and Bestseller tiles. Tallow Creme shows "1238 Bewertungen" and Kollagen "816 Bewertungen".
  - Part 1: "DEUTSCHES LABOR, DERMATOLOGISCH GEPRÜFT, MADE IN GERMANY, IN-HOUSE FORSCHUNG". Bienenwelt tiles, one marked "Ausverkauft".
  - Part 3: in the Nahrungsergänzung row, **4 of 5 visible tiles say "Ausverkauft"** (Magnesium 400, OPC, Curcuma + Piperin, Ashwagandha KSM-66).
  - Part 5: footer with AGB, Datenschutz, Impressum, Kontakt, Widerrufsrecht, Versand and Datenschutz-Einstellungen, plus a newsletter "10% GESCHENKT".
- Social URLs from their HTML: instagram.com/naturenation.de/, facebook.com/profile.php?id=61573077034075 and tiktok.com/@nature_nationde.
- Catalogue facts from products.json, fetched 2026-10-06:
  - 385 products. Created dates run from 2024-07-17 to 2026-09-01.
  - Monthly additions: 2026-02 had 82 (80 of them vendor "ChanceToBrand"). 2026-06 had 149 (147 of them vendor "Selfnamed").
  - Vendor totals: Nature Nation 149, Selfnamed 148, ChanceToBrand 80.
  - **21 products have no available variant (sold out)**, and 10 of those are ChanceToBrand.
- The vendor names look like white-label or private-label supply platforms. That's an inference from the names, unverified. It sits awkwardly next to "IN-HOUSE FORSCHUNG", so treat it as sensitive and keep it out of any message.
- **Public test pages.** /pages/test1, /pages/test1-1 and /pages/test1adasd all return 200, are listed in sitemap_pages_1.xml, and have no robots meta.
  - test1 (body 0) is empty.
  - test1-1 and test1adasd carry placeholder copy: "+56k Lisa, Sabine & 56.434+ andere Personen sind absolut begeistert! Schutz vor aggressiven Stechmücken am ganzen Körper!" (gloss: 56k people love it, protection from mosquitoes). Also "Nature Nation Mücken-Abwehrbänder (Platzhalter)" (mosquito bands, placeholder), "4,9 / 5 Sterne (1.200+ Bewertungen)" and "Jetzt 40% Rabatt", next to an Ashwagandha product.
  - The homepage says "Über 30.000 zufriedene Kunden", so the test pages claim a different number.
- Blog: per sitemap_blogs lastmod, 126 entries are September 2026 and 15 are August 2026. The atom feed shows up to 11 posts published on 2026-09-10 alone. The topics are symptom SEO ("pickel-im-intimbereich", "nagelpilz", "cholesterinwerte-bei-frauen-ab-60").
- FAQ (haufige-fragen) covers Health-Claims-Verordnung (the EU health claims rules), labs ("Unabhängige Labore in Deutschland"), packaging and shelf life. Delivery appears on the test pages: "Lieferzeit 1–3 Werktage ... bis 12 Uhr ... am selben Tag versendet" (1 to 3 working days, same day dispatch before noon).
- Apps loaded, from the EU third party hosts: Klaviyo (email/forms), Zoko (WhatsApp commerce), Loox (reviews), Vitals, AfterShip/Automizely (tracking), Zipify OCU (upsell), Gropulse GTM, wetracked.io pixel, Clarity, Pandectes and iubenda. Shopify agents.md and agentic sitemap are also present. **The shop is heavily tooled already.**

## GDPR from the EU (tools/eu-view.py, Webbkoll Stockholm, nothing clicked)

- evergoods.de: 7 first party cookies (ssr-caching, server-session-bind, __cf_bm, XSRF-TOKEN, hs, svSession, bSession). Third party hosts are Wix, Sentry, Google identitytoolkit and firebaseio.
  - The site-audit detector found no consent banner, and its synthetic control passed.
  - No marketing or analytics trackers. All 7 cookies are Wix session/security cookies, so the point is weak.
- **naturenation.de** (also with --shopify):
  - 19 cookies before any click, including **_fbp (Meta), _ttp (TikTok), _uetvid (Microsoft Ads), _gcl_au (Google Ads), _clck/_clsk (Clarity), __kla_id (Klaviyo) and _shopify_marketing**.
  - Requests to ad.doubleclick.net, googleads.g.doubleclick.net, c.bing.com, clarity.ms, analytics, klaviyo and wetracked.io.
  - Shopify banner settings: `"banner":{"enabled":true,"regionVisibility":["AX"]}`. Shopify's own banner shows only on the Åland Islands, so for DE and SE visitors Shopify treats tracking as allowed.
  - Pandectes config in the HTML: `"blocker":{"isActive":true,...}` and `"cookiesBlockedByDefault":"7"`, geolocation globalVisibility true.
  - **The first layer template is `{{preferences}}{{allow}}`**, so the first screen offers only "Einstellungen" and "Annehmen". "Alles ablehnen" exists only inside the preferences popup. The curl render screenshot matches, with two buttons.
  - The pixels still fire from Stockholm despite the blocker. My guess, not verified, is that Shopify web pixels and apps rely on Shopify's consent API, which the AX-only setting leaves "allowed".
  - iubenda is also loaded, so two consent tools run side by side.
  - This is one of the four always-pitch signals (GDPR). The proof is visitor facing: a German shopper sees "Annehmen" with no equal "Ablehnen", and the ad pixels are already set.

## Social (social-audit.js, URLs from their own HTML)

- Instagram @naturenation.de: 414 followers, 126 posts, latest 2026-09-03 (33 days ago).
- Facebook page 61573077034075: 665 followers, 0 reviews ("Not yet rated").
- TikTok @nature_nationde: 29 followers, 717 likes. The tool marked it walled, so treat it as UNKNOWN, not empty.
- LinkedIn /company/evergoods-life-gmbh: 44 followers, "Food and Beverage Manufacturing".
- evergoods.de social icons go to Wix's own accounts (control: instagram.com/wix has 893,575 followers).
- Gap: the shop claims "30.000 zufriedene Kunden" but has 414 Instagram followers, and posting has paused for 33 days.

## News (tools/news.py, de)

- The control 'Volkswagen' returned 100.
- Company "Nature Nation" returned 1 result, a false positive (Wochenblatt Paraguay, 2026-07-27, about chicharrón).
- Person returned 0. Regional (Wiesbaden OR Hessen) plus Nahrungsergänzungsmittel returned 0.
- Industry returned 100. Opened at source:
  - borncity.com, 2026-09-15, "Vitamin B12: BfR warnt vor Höchstmengen über 25 µg täglich". The BfR (Germany's federal risk assessment institute) advises a maximum of 25 µg B12 per daily dose in supplements, as an advisory rather than a binding rule.
  - pta-in-love.de, 2021-03-26, on the BfR maximum levels. Vitamin D 20 µg, B12 25 µg, iodine 100 µg.
  - Headlines on 2026-10-06 (unopened): "Bei jedem zweiten Magnesium-Präparat gibt es Kritik" (Joyn), Öko-Test on B12, Verbraucherzentrale warnings.
- Industry context: German supplement sellers are under consumer press and regulator scrutiny on dosing this month. That's real, but it isn't a problem we build for.

## LinkedIn routes (owner = contact, same person)

1. curl /in/adad-nirari-khochaba returned 999. 2. fetch-walled.py returned 999 as firefox (1530 bytes).
3. A web search for "Adad-Nirari Khochaba" returned only Assyrian kings.
4. Posts search ("Khochaba" plus Business Psychologist / Wirtschaftspsychologe / Evergoods) returned nothing.
5. The company page (via social-audit) shows 44 followers, with no people visible.
6. His own words: neither site names him beyond "Herr Khochaba".
7. lemlist tagline "Lecturer | Business Psychologist | Entrepreneur".

**The lecturer claim is UNVERIFIED.** Searches for Khochaba plus Dozent, Lehrbeauftragter, Hochschule Wiesbaden or Frankfurt returned nothing. The "next to a day job" signal for angle C rests only on the tagline.

## Capacity and growth

- The company was registered 2024-07-26, with €25k capital, size 1-10 (lemlist).
- No team page, no Karriere or jobs page. "karriere|stellenangebot|team" got 0 hits across 233 texts. Control: the same scan found "whatsapp" and "abo".
- Growth, all on their own pages:
  - The catalogue went from 6 products (Jul 2024) to 385 (Sep 2026), with 231 added in Feb and Jun 2026.
  - 83 landing pages.
  - Blog went from 5 to 6 posts a month to 126 last modified in Sep 2026.
  - "Über 30.000 zufriedene Kunden". "Über 12.000 Pflegepläne verschickt".
  - Reviews: 1238 on Tallow and 816 on Kollagen.
- No funding found. Wayback CDX returned a connection reset twice (ours), so the last redesign date is UNKNOWN.

## Process (how a customer orders and gets help)

- Orders go through the Shopify cart. There's a member subscription ("Im praktischen Abo ... 10% Rabatt auf jede Lieferung", a subscription with 10% off every delivery).
- Support is a WhatsApp bubble (Zoko) and email. There's no phone number on the shop.
- **Pflegeplan flow (/pages/pflegeguide):**
  - A QR code on the pack preselects the product ("Über deinen QR-Code erkannt"). The customer picks email or WhatsApp.
  - "Teil 5 Individuell auf deine Ziele abgestimmt ... Wir passen deinen Plan darauf an" (Part 5, tailored to your goals ... we adapt your plan to them).
  - "Über 12.000 Pflegepläne verschickt". Email arrives "in wenigen Minuten" (in a few minutes), WhatsApp "Antwort in wenigen Sekunden" (answer in a few seconds).
  - The first send is clearly automated (Klaviyo, Zoko). Whether the step 5 tailoring is done by hand is UNKNOWN.
- Stock: 21 of 385 products are sold out, including the four supplements on the homepage row.

## Candidate pains per angle, with disproof attempts

**1 Website (W1b premise)**
- 1a. evergoods.de is a one page Wix template, with stock mountain image ("Bildquellen: https://wix.com/"), social icons still linked to Wix's own accounts, a "Kunden" section that names no customers, and one brand. Source: evergoods.de, opened ~19:15 UTC.
  - Disproof: is it meant to sell? No. It's a holding page, and the trade happens on naturenation.de. So it only matters to a retailer, partner or investor checking the company.
  - Size: small, a tweak test fail on its own (relinking the icons takes minutes). The only use is as proof for "the Evergoods site doesn't show the company behind 30,000 customers".
- 1b. naturenation.de shows sold out tiles on its homepage supplement row (4 of 5) and 21 sold out SKUs in total (render part 3, products.json).
  - Disproof: out of stock is an inventory issue, not a site defect. The site correctly says "Ausverkauft".
- 1c. Public test pages in the sitemap carry placeholder "Mücken-Abwehrbänder (Platzhalter)" and "56.434+" and "1.200+ Bewertungen" claims, which conflict with the homepage's 30,000 (/pages/test1adasd, /pages/test1-1).
  - Disproof: no internal link found to them, so a visitor only lands there from search or the sitemap. Real and embarrassing, but a tweak.
- The shop itself is NOT on a DIY builder and looks professional, so W1b's premise fails for the trading business.

**2 GDPR (always-pitch signal) — STRONGEST**
- 2a. From Stockholm, before any click, naturenation.de sets the Meta, TikTok, Microsoft Ads, Google Ads and Clarity cookies. Shopify's banner region is ["AX"] only. Pandectes' first layer has no reject button. Two consent tools run at once. Sources: Webbkoll run ~19:35 UTC and the HTML config.
  - Disproof attempts: (i) checked whether the Pandectes blocker is on (it is, so the leak isn't a missing tool, it's a misconfiguration). (ii) A rerun with --shopify gave the same 19 cookies. (iii) The banner text includes "Ablehnen", but the first layer template omits it.
  - Positive control: eu-view.py reports banners and blocks on other sites, and site-audit's synthetic control passed this run.
  - Caveat: I could not render the page from an EU egress (ours is US), so what an EU visitor sees visually is inferred from the config plus the US curl render.

**3 Apps and AI (angle A)**
- 3a. Stock and reorder planning across 385 SKUs from at least 3 supply sources, 21 sold out, run by a 1-10 team.
  - Disproof: they may plan stock in the supplier platforms already. Not visible either way, so medium-low proof.
- 3b. The Pflegeplan's "Wir passen deinen Plan darauf an" step and WhatsApp replies across 385 products. An AI workflow could answer the goal follow ups.
  - Disproof: Klaviyo and Zoko already automate the first send in "Sekunden". Zoko sells AI chat features, and I can't see whether they use them. 12,000 plans suggests automation already exists. Medium-low.
- 3c. Content volume (126 posts in Sep 2026, 11 on one day).
  - Disproof: that rate almost certainly means an AI or bulk content pipeline already exists. **Ruled out** as a pitch.
- They don't sell AI themselves.

**4 Social**
- 4a. 30,000 customers claimed versus 414 Instagram followers, 665 Facebook, 29 TikTok, 44 LinkedIn, and Instagram silent for 33 days. Disproof: a performance marketing shop can sell on ads with a small organic following, so medium-low.

**5 Build Squad**: not applicable. It's a consumer brand, not an agency or product team.

**C, the owner personally**: one named MD, sole on the register, with a tagline listing three roles. The lecturing is unverified, so this is weak until confirmed.

## Three strongest

1. **GDPR on the shop.** From an EU visitor's view, the Meta, TikTok, Microsoft and Google ad pixels fire before any choice. The first cookie screen offers only "Einstellungen / Annehmen". Shopify's banner is set to the Åland Islands only. The proof is strong and it's an always-pitch signal. The bigger outcome is a compliant shop whose ad data still counts.
2. **Stock and range growth outrunning operations.** The range grew to 385 products, 231 of them added in Feb and Jun 2026 from two supplier platforms, and 21 are sold out, including 4 of 5 homepage supplements. Proof is medium (the facts are solid, the cause is inferred). This is an angle A candidate for a stock and reorder workflow.
3. **The company face doesn't match the business.** evergoods.de is a Wix one pager with stock imagery and social icons linked to Wix's own accounts, plus public placeholder test pages on the shop with conflicting customer counts. This is the W1b website angle but weak on cost, since evergoods.de doesn't trade. Best used as proof.

## Ruled out

- W1b "the DIY builder holds back the business": the shop is on paid Shopify and looks professional. Only the holding page is DIY.
- An AI content workflow: they're already publishing at scale.
- Build Squad: not their kind of business.
- A GDPR point on evergoods.de: only Wix session cookies.
- Regulatory dosing news: real, but not something we'd build for.

## Source list (opened this session)

1. https://www.evergoods.de/ (plus /impressum and /datenschutz)
2. https://www.naturenation.de/ (plus 83 /pages/*, products.json pages 1 to 3, sitemaps, blogs/news.atom)
3. https://www.naturenation.de/policies/legal-notice
4. https://www.naturenation.de/pages/pflegeguide
5. https://www.naturenation.de/pages/test1adasd
6. https://www.northdata.com/Evergoods%20Life%20GmbH,%20Wiesbaden/HRB%2035167
7. https://www.northdata.com/Khochaba,%20Adadnirari,%20Wiesbaden/rlc
8. https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fwww.naturenation.de
9. https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fwww.evergoods.de
10. https://www.instagram.com/naturenation.de/
11. https://www.facebook.com/profile.php?id=61573077034075
12. https://www.tiktok.com/@nature_nationde (walled)
13. https://www.linkedin.com/company/evergoods-life-gmbh
14. https://www.linkedin.com/in/adad-nirari-khochaba (999, walled)
15. https://borncity.com/news/vitamin-b12-bfr-warnt-vor-hoechstmengen-ueber-25-µg-taeglich/
16. https://www.pta-in-love.de/b12-jod-und-co-bfr-aktualisiert-hoechstmengen-fuer-nem
17. Google News RSS via tools/news.py (4 queries plus control)
18. https://web.archive.org/cdx (connection reset, UNKNOWN)

That's 13 domains in total.

## Open questions

- His exact shareholding and the co-founder's identity (Gesellschafterliste, behind North Data Premium or handelsregister.de).
- Where and whether he lectures.
- What an EU visitor's render actually shows (needs an EU browser, or Raka opening it from NL).
- Whether the Pflegeplan tailoring and WhatsApp replies are handled by hand.
- Who handles stock (supplier platforms or in-house).
- The last redesign date (Wayback reset, worth a retry).

Files: home.html, nn.html, pass1/, pass2/, nn_pass1/, nn_pass2/, pg/ (83 pages), prod1-3.json, northdata.txt, nd_person.txt, b8_adad-desktop.png, b8_adad-phone.png, /tmp/claude-0/b8_nn-curlrender-part0..5.png
