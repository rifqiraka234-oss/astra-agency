# Marjolein Schoot Uiterkamp, Billie Swim (billieswim.com)

ctc_vmg2iAtNxvpSW7d93, lea_MHtNLjtyyDrGQRxhk, campaign W1b (cam_7gnHSf6GvvGy8gH3n). Research 2026-10-11, 11:08 to 11:58 UTC.

## 1. Thread

- `get_inbox_conversation(ctc_vmg2iAtNxvpSW7d93)` at 11:08 UTC: 0 activities, `nextPage` null, totalItems 0. LinkedIn sync "recent", last synced 10:56 UTC.
- Positive control in the same minute: `ctc_ch3vFcKAkjQdMKDCg` came back with its 2 known items (the 2026-10-01 connect note and the 2026-10-07 opener to Noah).
- Second way: `get_inbox_conversations` sentOnly, search "Schoot Uiterkamp" gives one conversation, ibx_xb24z9ydEEj7EoYj9, lastRepliedAt null, preview is our connect note only.
- Third way: lead activity history `GET /api/activities?leadId=lea_MHtNLjtyyDrGQRxhk`. conditionChosen 2026-10-09 14:07, visit 14:10, like of her post 14:19, connect note `linkedinInviteDone` 2026-10-10 14:46:53 ("Hi Marjolein, saw your business and thought it was cool..."), `linkedinInviteAccepted` 2026-10-10 15:20:30. Nothing after.
- Fourth way: grep of state/, logs/, research_notes/, reports/ for the name, both IDs and "billie". No hit (the only matches were "Marjolein Van Keep", a different person, and the string 8848 inside a French SIREN).
- **Shape: OPENER.** No reply, nothing sent beyond the connect note. The thread view is empty because connect notes sometimes don't show in the thread (known, RULES batch 8), the activities endpoint and sentOnly both show it.

## 2. Record

lemlist lead record (search_campaign_leads by id) and contact `GET /api/contacts/ctc_vmg2iAtNxvpSW7d93`.
- jobTitle "Founder", tagline "BILLIE SWIM, House of SU", companyName BILLIE SWIM, companyDomain billieswim.com, location Amsterdam. No summary, jobDescription or experience fields are on this record (the lead was added via MCP with variables only).
- Company record cpn_rXfbQHCaFueKfGzst: description "At BILLIE SWIM, we embrace slow fashion...", employeeCount 2, followers 125, Retail Apparel and Fashion, B2C.
- Reconciled. Tagline, company and title agree. No "former" or "ex". "House of SU" is a separate LinkedIn page (it shows in Billie Swim's "similar pages"), most likely her own umbrella (S U for Schoot Uiterkamp). Not resolved, not used.
- The site's About page names her: "Billie Swim was founded by Marjolein Schoot Uiterkamp" (https://www.billieswim.com/pages/about-us).

## 3. Ownership, statutory

- Legal notice on her site: "Billie Swim, Business Registration Number: 91312639" (https://www.billieswim.com/policies/legal-notice).
- KvK data for 91312639 via liza.nl (sourced from KVK): Billie Swim, Active, **Eenmanszaak** (sole proprietorship), established 08-09-2023, 1036 KR Amsterdam, principal activity retail sale of clothing (https://www.liza.nl/en/91312639/billie-swim). North Data had no hit on the number.
- An eenmanszaak is owned by one natural person. The register extract shown does not print the owner's name (KvK only shows it on a paid extract), so ownership rests on the eenmanszaak form plus her own founder statements on the site, FashionUnited, Marie Claire and JAN. **Owner, HIGH in substance.**
- Side job, her own words in Marie Claire (2026-06-09): "Daarnaast werk ik al meer dan tien jaar bij Karl Lagerfeld, waar ik nu freelance werk binnen het sustainability team." Billie Swim runs next to that freelance work.

## 4. Prior notes

None. grep of state/*.md, state/*.jsonl, logs/ for "Schoot", "Uiterkamp", "Billie", ctc_vmg2iAtNxvpSW7d93, lea_MHtNLjtyyDrGQRxhk found nothing about her.

## 5. Deep research

### 5a. The whole site

- **Pass 1**: `tools/crawl.py https://billieswim.com --max 150`, 150 URLs read, 15 from sitemaps, stopped at the cap because Shopify variant URLs multiply (6,310 queued), 67 distinct pages.
- **Pass 2**: `tools/crawl.py https://www.billieswim.com --max 150`, 150 URLs, 89 distinct pages, plus a full read of every one of the 64 sitemap URLs and the 6 policy pages (70 pages, all 200, texts in billie_full/full.json). Every page read.
- **Catalogue**: products.json, 25 products, 317 size variants, 281 marked available. Newest products published 2026-07-01 (Biarritz Crinkle and Ikaria Crinkle). Nothing new since July.
- **Render**: site-audit.js printed RENDER NOT TRUSTED (12 of 12 failed assets served fine by curl, ours). render-via-curl.js on the home page served 267 requests with 0 curl errors, desktop and phone screenshots opened. A modern, well photographed Shopify store with a newsletter popup offering 10% off, colour tabs, reviews 5.00 from 32, blog and press. Nothing dated about it.
- **Wholesale page** (nav label WHOLESALE, URL /pages/stockists): render-via-curl.js 188 served, 0 curl errors, screenshot opened. Heading "Wholesale", one sentence, "If you're a retailer interested in carrying Billie Swim, we'd love to hear from you — please reach out at hello@billieswim.com.", then the press line, the newsletter box and a consumer "Shop now" grid. The main content HTML has no mailto link at all, the address is plain text, the only hrefs are /collections/tops, /bottoms, /cover-ups.
- **Absence, four layers**: grep of both crawls and the 70 page full read for lookbook, line sheet, linesheet, stockist, "sold at", retailer, PDF, all zero except the wholesale sentence itself. Positive control, the same method on the closest Amsterdam peer GEZZINA finds a STOCKISTS page naming Wolf & Badger, PRO-IDEE, Ludwig Beck and three Dutch boutiques (https://gezzina.com/pages/stockists) and a BECOME PARTNER page naming its "SPRING SUMMER 2027 lookbook" (https://gezzina.com/pages/become-partner).
- **Other site findings (tweaks, not the angle)**: /pages/faq, /pages/sale, /pages/shipping and /pages/contact are empty template pages that sit in the sitemap (unlinked from the nav). The footer social links are written `facebook.com/billieswim` and `instagram.com/billieswim` without https, so they resolve to 404 pages on her own domain (crawl shows 10 such 404s, a correct https Instagram link exists elsewhere on the page). The AI Use Policy says she uses AI generated imagery "as a small team". Shipping policy, free EU shipping over €200, UK duties covered. Returns by emailing hello@billieswim.com, the same inbox as wholesale and press.
- **Blog**: 12 posts, newest two dated 2026-06-01 (Prinsengracht pop-up, FashionUnited feature), "Black Friday Isn't Our Wave" 2025-11-24.

### 5b. Social

- `tools/social-audit.js` on the accounts in her HTML. Instagram https://www.instagram.com/billieswim/ via /embed/, 3,254 followers, 244 posts, latest 2026-10-07. Dated posts parsed from the embed: 2026-10-07 (Biarritz Ring set, video), 09-29, 09-21, 09-17, 09-15, then 08-19. Every caption ends "Shop ... via link in bio". Control in the same run, glamouruk, read with its 2026-10-11 post.
- Facebook https://www.facebook.com/billieswim login wall, UNKNOWN.
- LinkedIn company https://www.linkedin.com/company/billie-swim 129 followers, 2 to 10 employees. Posts read in full via fetch-walled: Maredamare ("Back from Maredamare ... introduce Billie Swim to buyers and industry professionals from across the world ... retailers are looking for distinctive new brands ... Interested in our SS27 collection? We would love to hear from you! Please email us at hello@billieswim.com", about 2 months ago), JAN Magazine feature, Ellen Hoog wearing Bari One Piece for the JAN cover, Crinkle launch, fourth pop-up on Prinsengracht 24 to 28 June, FashionUnited and Marie Claire features.
- Google Maps payload: listing "Billie Swim", category Badmodewinkel, no rating shown.
- Benchmarks opened through the same embed route, handles taken from each brand's own HTML: GEZZINA 1,680 (latest 2026-08-15), WALLIEN 28,671, MYMARINI 58,655, Soft Revolt 16,810, peony 226,209, Hunza G 555,048, Love Stories 376,127. Billie's 3,254 and weekly posting is ahead of the closest independent Amsterdam peer. Social is not where she's short.

### 5c. The owner (LinkedIn, six routes, plus interviews)

1. curl https://www.linkedin.com/in/marjoleinschootuiterkamp and /recent-activity/all/, both 999.
2. Web search "Marjolein Schoot Uiterkamp" LinkedIn, no profile result, only other Marjoleins and a Groningen professor of the same surname.
3. Web search site:linkedin.com/posts with her name and Billie Swim, nothing indexed.
4. People data, the company page lists 2 to 10 employees, lemlist company employeeCount 2.
5. Her own post that lemlist liked, activity 7500462807268839424 (decodes to 2026-09-01 08:01 UTC), read in full via fetch-walled. Her words, "The best swim seasons are built in the coldest months", "The new summer 2027 collection is still taking shape", "Being a seasonal brand makes cash flow an ongoing balancing act. Revenue peaks when the weather gets warmer, but many of the biggest investments happen months earlier: fabrics, samples, production, inventory, photography and marketing." Profile shows 1,714 followers, 126 posts.
6. Interviews read in full: FashionUnited 2026-04-23 (https://fashionunited.be/nieuws/business/billie-swim-groeit-vanuit-merkidentiteit-met-focus-op-beleving-en-selectieve-partners/2026042348715), Marie Claire work week 2026-06-09, JAN Magazine 8/2026 (online 2026-07-25), Glamour UK quote on her blog ("ex Karl Lagerfeld sustainability expert").

What the interviews say, quoted.
- FashionUnited: launched 2025, D2C first, "Het merk is recent gestart met externe distributie en is aangesloten bij het internationale platform About You, waardoor het inmiddels in zeven landen zichtbaar is." "Daarnaast bezoekt Schoot Uiterkamp internationale vakbeurzen om potentiële verkooppartners te ontmoeten." "Voor 2026 richt Billie Swim zich op het verder uitbouwen van het partnernetwerk, met een duidelijke rol voor fysieke verkooppunten." Hardest thing in her words, "Hoe bereik ik nou die vrouw en hoe leg ik dat merk uit? Dat was ongetwijfeld het meest uitdagende." SS26 in four drops, production in a solar powered atelier in Indonesia, sizes XS to XXL.
- Marie Claire: "van klantvragen beantwoorden en content maken tot pop-ups organiseren en 's avonds laat nog bestellingen inpakken", answering mails on the sofa every evening, "Soms voelt het alsof ik tien banen tegelijk heb – van founder tot logistiek".

### 5d. News

`tools/news.py` nl, control Heineken 100. Company "Billie Swim" 10, person 6, regional (Amsterdam badmode) 45, industry 47. en run, control Tesco. Opened at source: JAN (two pieces), Marie Claire (two), Beau Monde, LINDA (Ikaria swimsuit in a roundup), FashionUnited (interview, Soft Revolt, Viveh), Cosmopolitan NL. Walled, headline only: HLN 2026-07-28 "Nederlands swimwearmerk Billie Swim opent pop-up in Nationalestraat" (Antwerp, DPG privacy gate then WAF 403), Het Parool 2025-07-21 (DPG gate), De Ondernemer on GEZZINA (DPG gate), FashionNetwork on Berné 1921 (403).

### 5e. Registers and filings

KvK 91312639 eenmanszaak since 2023-09-08. A sole proprietorship files no public accounts, so no staff count or balance sheet exists to read. No insolvency or name change found.

### 5f. Jobs

No careers page in the sitemap, no vacancy anywhere in the crawl, LinkedIn company page shows no jobs. Help comes from her husband and friends at pop-ups (Marie Claire).

### 5g. Industry and region

- Swim runs on two calendars. Uphance, 2026-08-28: "Swim has a preseason wholesale window that closes in September and October for the following resort and summer" (https://www.uphance.com/blog/swimwear-apparel-ops-seasonality-playbook/). Maredamare 2026 (Florence, 18 to 20 July) was the "Anteprima Collezioni PE2027", over 200 brands with collections for summer 2027 (https://www.maredamare.eu/), and its 2026 exhibitor list includes BILLIE SWIM, tagged Brand Sostenibile (https://maredamare.underbeach.eu/espositori-2026/). The next big swim fair, UNIQUE by Mode City, is 23 to 25 January 2027 in Paris (tradefest).
- Peers: GEZZINA (Amsterdam, three countries per De Ondernemer headline) lists stockists and offers its SS27 lookbook by email. WALLIEN has a retailer finder. peony has a stockist page. Hunza G, MYMARINI, Love Stories are much bigger. Soft Revolt (Amsterdam) sells online only with fittings by appointment, the same early stage pattern.
- Small Dutch D2C fashion is fragile. Viveh, D2C plus wholesale via a fashion agent, stopped in May 2026 "omdat de omstandigheden niet aansluiten bij wat nodig is om het merk verder te laten groeien" (FashionUnited 2026-05-11).
- Wholesale tooling exists and she uses none of it visibly: JOOR (digital linesheets, virtual showrooms), Ankorstore, Shopify B2B, About You Marketplace (where she already sells to consumers).
- Regulation. EU Directive 2024/825 (EmpCo) applies from 27 September 2026 and bans generic environmental claims without proof (EUR-Lex). Billie's claims are specific (100% recycled polyamide, OEKO-TEX Standard 100, GRS) and she is herself a sustainability professional, so this is low risk for her and not an angle.

### 5h. Privacy from the EU

`tools/eu-view.py https://www.billieswim.com --shopify`, from Stockholm, 4 first party cookies (localization, cart_currency, _shopify_essential, shop_bin), 0 third party cookies before a click. The Shopify banner is enabled with regionVisibility covering every EU country and GB, NL included. Third party hosts are hCaptcha, judge.me, Instafeed, Stoq (pre order and back in stock) and Shopify. Clean. site-audit.js from Ohio said GEO VOID, as it should.

## 6. What she's facing right now

1. Billie Swim is young and small. A KvK sole proprietorship from September 2023, the first collections launched in 2025, and JAN calls it a brand "in zijn tweede seizoen" (KvK via liza.nl, FashionUnited 2026-04-23, JAN 8/2026).
2. She runs it largely alone next to freelance sustainability work for Karl Lagerfeld, answering customer questions, making content, running pop-ups and packing orders at night, with returns, press and wholesale all going to one inbox (Marie Claire 2026-06-09, refund policy, wholesale page).
3. Her declared push for 2026 is moving from selling direct to selective retail partners, About You in seven countries plus trade fairs and physical stores (FashionUnited 2026-04-23).
4. She showed summer 2027 at Maredamare in July and has asked buyers to email her for SS27 (Maredamare exhibitor list, Billie Swim LinkedIn company post).
5. INFERENCE, rests on clue 4 and the Uphance calendar: the boutique orders for summer 2027 are being decided this autumn, so October is the month her wholesale year is won or lost.
6. INFERENCE, rests on her own 1 September post: cash is tight in exactly these months, because fabric, samples and production for 2027 get paid now while swim revenue only arrives when it's warm, which makes wholesale pre orders the money that matters most right now.
7. The consumer side is in its quiet season. Instagram still posts a set a week with "shop via link in bio", 281 of 317 variants are in stock, and nothing new has been published since 1 July (Instagram embed, products.json).
8. The place a buyer lands on is one sentence with an email address in plain text, no lookbook, no line sheet, no stockists, then a consumer shop grid, while her closest Amsterdam peer lists its stockists and names its SS27 lookbook (wholesale page render, GEZZINA pages).
9. Getting found and explained is still the thing she calls hardest, despite real press in Glamour UK, Vogue UK, Tatler and JAN (FashionUnited quote, press page).
10. INFERENCE, rests on clue 2 and clue 8: every buyer conversation runs through her own inbox at night, so the buyers she met in Florence and the ones she hasn't met yet both wait on her to reply before they see anything they can order from.

## 7. Clues record

```
clues
  2026-04-23 https://fashionunited.be/nieuws/business/billie-swim-groeit-vanuit-merkidentiteit-met-focus-op-beleving-en-selectieve-partners/2026042348715 About You, trade fairs, 2026 focus on the partner network
  2026-06-09 https://marieclaire.nl/artikel/687729/zo-ziet-de-werkweek-van-billie-swim-founder-marjolein-schoot-uiterkamp-eruit freelance at Karl Lagerfeld, ten jobs at once, mails at night
  2026-07-18 https://maredamare.underbeach.eu/espositori-2026/ BILLIE SWIM exhibits at the summer 2027 preview
  ~2026-08   https://www.linkedin.com/company/billie-swim "Interested in our SS27 collection? ... email us"
  2026-08-28 https://www.uphance.com/blog/swimwear-apparel-ops-seasonality-playbook/ preseason wholesale closes Sept and Oct
  2026-09-01 https://www.linkedin.com/feed/update/urn:li:activity:7500462807268839424/ cash flow, 2027 collection still taking shape
  2026-10-11 https://www.billieswim.com/pages/stockists one sentence, plain text email
sources with nothing       HLN and Parool walled (DPG), Facebook walled, no careers, no newsletter archive
inference                  her wholesale year for summer 2027 is being decided this autumn, through a page that gives buyers nothing to look at, rests on clues 1, 3, 4, 5 and 7
contradictions             GEZZINA also sends its lookbook by email, so email for the lookbook is normal. What GEZZINA has and Billie lacks is the stockist list and a named SS27 lookbook. Buyers can also browse the consumer shop
grade                      SUPPORTED
impact aimed at            winning SS27 retail partners before the preseason window closes
```

## 8. Judge, every candidate angle

| Angle | Proof | What it costs her | Would she name it | Incumbent | Do they sell it | Verdict |
|---|---|---|---|---|---|---|
| B, wholesale site for growth | Wholesale page is one sentence and a plain text email, 0 lookbook, line sheet or stockist hits across 70 pages, peer control finds both | Each boutique that doesn't order for SS27 is a season of orders lost, and pre orders are what fund 2027 production (inference, her cash flow post) | Yes, "connecting with the right retail partners" is her own goal | She builds the Shopify site herself (theme 53), About You is a consumer marketplace, no agent or showroom found | No | **CHOSEN, with A as the second half** |
| A, AI workflow for the company | Every wholesale enquiry, return and press mail goes to hello@billieswim.com, she answers at night next to freelance work, she's selecting partners one by one | Hours per buyer and slow follow up in the one window that counts | Probably, she calls visibility her hardest problem | None visible | No | Folded into the winner as the buyer finding and follow up workflow |
| C, personal AI for the owner | Ten jobs at once, freelance Lagerfeld work, mails on the sofa (Marie Claire) | Her evenings, real but not a revenue line | Maybe, personal | None | No | Runner up. True, but the message would quote her Marie Claire week, and the money sits in wholesale |
| D, social and branding | Instagram 3,254, weekly posts, latest 2026-10-07, press in Glamour, Vogue, Tatler, JAN | Little, she's ahead of GEZZINA on followers and cadence | She'd say reach is hard, but the channel is working | She does it herself with AI imagery | No | Not chosen |
| Consumer website | Modern Shopify, render clean. Empty FAQ, Sale, Shipping, Contact template pages, footer social links 404 | Tweaks, an afternoon each | No | Herself | No | Favours only |
| GDPR | eu-view.py clean, banner list covers NL and the EU | Nothing | No | Shopify | No | Not chosen |
| Build Squad | One founder, no developers, no product team | Nothing to supplement | No | n/a | No | Not applicable |

**Winner, B with A.** It's the costliest because it sits on her own 2026 goal, it's time boxed (preseason wholesale for summer 2027 closes this autumn), and it's the line that pays her up front while consumer swim is out of season. It's also the one nobody else around her is doing.

## 9. Verdict

OPENER, websites and AI workflows, "the wholesale site that wins Billie Swim stockists". Confidence MEDIUM. Facts are verified live, the buyer behaviour and the timing are inference worded as likely.

Flags for Raka.
- She is a sustainability professional (Karl Lagerfeld). Never pitch green claims to her.
- She builds her own Shopify, so the offer has to be the wholesale outcome, not "a page".
- The Antwerp pop-up (HLN headline 2026-07-28) is unread, walled. Not used.
- First name in lemlist is right (Marjolein). Company styled "Billie Swim" in her prose and "BILLIE SWIM" in the logo, the draft uses Billie Swim.

## 10. Draft (copied byte for byte from drafts.md, where the full gate sits)

OPENER
```
Hi Marjolein, saw Billie Swim, looks interesting!

However, your wholesale page is one sentence asking retailers to email you, with no lookbook, line sheet or stockist list to look at. This causes boutique buyers picking next summer's brands to go with the labels they can judge without waiting for a reply.

Especially, when you are building your network of retail partners for summer 2027, the boutiques that commit their budgets this autumn likely spend them on labels they could judge faster.

I run Astra agency. We build websites and AI workflows for brands like Unilever, AXA, Pertamina. I built a stroopwafel brand from zero with my family and ran its partnerships, so I know what a buyer wants to see before taking on a new brand.

Shall I send you over what the wholesale site that wins Billie Swim stockists looks like?
```

## 11. Red team (separate pass, 2026-10-11 ~11:50 to 11:58 UTC)

| Sentence | Source reopened | Tried to prove it false | Result |
|---|---|---|---|
| your wholesale page is one sentence asking retailers to email you | https://www.billieswim.com/pages/stockists refetched, curl render screenshot | Looked for a second paragraph, a form, a PDF or a mailto in the main HTML. Only hrefs are three collection links, the press line is about press. Her verb is "please reach out at", "asking retailers to email you" doesn't upgrade it | HOLDS |
| with no lookbook, line sheet or stockist list to look at | 70 page full read and both crawls | grep for lookbook, line sheet, linesheet, stockist, PDF, all 0. Control GEZZINA finds both. Her Instagram bio isn't readable through the embed, so a link in bio could hold a lookbook, which is why the sentence is scoped to the wholesale page | HOLDS, scoped |
| boutique buyers picking next summer's brands go with labels they can judge without waiting | INFERENCE | GEZZINA also sends its lookbook on request, so email alone is normal, and buyers can browse the consumer shop | KEPT as inference, the gap is the missing stockist list and lookbook, not email |
| building your network of retail partners | FashionUnited 2026-04-23 | Her words "het verder uitbouwen van het partnernetwerk", building out the network, matched not upgraded | HOLDS |
| for summer 2027 | Maredamare 2026 exhibitor list, LinkedIn company post | Her 1 Sept post says the 2027 collection is "still taking shape", yet her company page asks buyers about SS27, wholesale sells from samples | HOLDS |
| the boutiques that commit their budgets this autumn likely spend them on labels they could judge faster | Uphance 2026-08-28 | The first version said "won't carry Billie Swim until 2028". In season reorders exist and UNIQUE by Mode City runs 23 to 25 January 2027, so that was too hard | REWRITTEN, now inference worded likely |
| I built a stroopwafel brand from zero with my family and ran its partnerships | docs/astra-master-context.md 2A | Eten Maar's partners weren't swim boutiques. The sentence claims general buyer sense, not swim experience | KEPT, mild stretch flagged |
| the wholesale site that wins Billie Swim stockists | the offer | She edits her own Shopify, a single page is a tweak she could do. The offer is the whole wholesale outcome, line sheet, terms, stockists, buyer area and the AI follow up | KEPT, tweak risk flagged |

## 12. Source list, every distinct URL actually opened (173)

Own site first where crawled, outside sources listed first. Walled or errored pages are marked by their status. Searches that returned only snippets are not counted.

1. https://www.instagram.com/billieswim/embed/ (200 curl Instagram)
2. https://www.linkedin.com/in/marjoleinschootuiterkamp (999 curl)
3. https://www.linkedin.com/in/marjoleinschootuiterkamp/recent-activity/all/ (999 curl)
4. https://www.linkedin.com/feed/update/urn:li:activity:7500462807268839424/ (200 fetch-walled The best swim seasons are built in the coldest months. While most peop)
5. https://www.linkedin.com/company/billie-swim (200 fetch-walled BILLIE SWIM | LinkedIn)
6. https://www.firenzefiera.it/en/news/the-new-beachwear-collections-on-show-with-maredamare-at-fortezza-da-basso-from-july-19-to-21 (200 curl The New Beachwear Collections on show with Maredamare at Fortezza da B)
7. https://www.maredamare.eu/ (200 curl Maredamare 2026 • 18.19.20 Luglio 2026 • International Beachwear Fair)
8. https://www.fibre2fashion.com/trade-fairs/maredamare-2026-65823 (200 curl Maredamare - 2026 (July 2026), Florence - Italy - Trade Show & Fairs)
9. https://www.marieclaire.nl/ (200 curl Marie Claire | Op Marie Claire kun je terecht voor jouw dagelijkse dos)
10. https://fashionunited.com/companies/billie-swim (200 curl BILLIE SWIM wholesale collection)
11. https://maredamare.underbeach.eu/espositori-2026/ (200 curl Espositori 2026 • Maredamare 2026 • 18.19.20 Luglio 2026 • Internation)
12. https://www.uphance.com/blog/swimwear-apparel-ops-seasonality-playbook/ (200 curl Apparel operations for swimwear brands: preseason, drops, and dead wee)
13. https://www.hln.be/antwerpen/nederlands-swimwearmerk-billie-swim-opent-pop-up-in-nationalestraat~afb7431b/ (200 fetch-walled DPG Media Privacy Gate)
14. https://www.jan-magazine.nl/mode/a73200486/duurzame-badkleding/ (200 curl 3 duurzame Nederlandse swimwear brands voor mooie badkleding)
15. https://marieclaire.nl/artikel/687729/zo-ziet-de-werkweek-van-billie-swim-founder-marjolein-schoot-uiterkamp-eruit (200 curl Zo ziet de werkweek van Billie Swim founder Marjolein Schoot Uiterkamp)
16. https://marieclaire.nl/artikel/689441/marie-claire-tipt-van-de-leukste-pop-up-aan-de-gracht-tot-culinair-genieten (200 curl Marie Claire tipt: van de leukste pop-up aan de gracht tot culinair ge)
17. https://www.deondernemer.nl/actueel/lisa-geertjes-gezzina-bijenkorf-badmodemerk-drie-landen~6f004be (200 fetch-walled DPG Media Privacy Gate)
18. https://gezzina.com/ (200 curl GEZZINA® | Luxury Swimwear)
19. https://gezzina.com/pages/stockists (200 curl STOCKISTS – GEZZINA)
20. https://www.lovestoriesintimates.com/ (200 curl Love Stories Intimates | Lingerie & Whateverwear for Women)
21. https://www.wallien.com/ (200 curl Women's Wetsuits & Sustainable Swimwear – WALLIEN)
22. https://www.wallien.com/en-us (200 curl Women's Wetsuits & Sustainable Swimwear – WALLIEN)
23. https://www.wallien.com/en-us/pages/retailers (200 curl Find a WALLIEN retailer near you)
24. https://www.mymarini.com/ (200 curl MYMARINI – Designer swimsuits and bikinis)
25. https://hunzag.com/ (200 curl Hunza G | One Size Fit Swimwear & Bikinis | Original Crinkle ™)
26. https://www.hunzag.com/ (200 curl Hunza G | One Size Fit Swimwear & Bikinis | Original Crinkle ™)
27. https://www.peonyswimwear.com/ (200 curl Discover peony | Luxury Swimwear and Resortwear – peony AUS)
28. https://www.peonyswimwear.com/pages/stockist (200 curl Stockists – peony AUS)
29. https://gezzina.com/pages/become-a-partner (404 curl 404 Not Found – GEZZINA)
30. https://gezzina.com/pages/become-partner (200 curl BECOME PARTNER – GEZZINA)
31. https://www.parool.nl/ps/van-bad-tot-spijkermode-en-van-slipper-tot-fiets-met-deze-16-amsterdamse-producten-ga-je-zonnig-de-zomer-in~b1f5d10d/ (200 fetch-walled DPG Media Privacy Gate)
32. https://www.linda.nl/mode/wil-je-zien/badkleding-zomer-trends/ (200 curl Nog lastminute op zoek naar leuke badkleding? - LINDA.nl)
33. https://beaumonde.nl/artikel/689497/beau-mondes-weekendtips-week-26-juni-2026 (200 curl Beau Monde's weekendtips: van Zuid-Limburg tot het hoge noorden! | Bea)
34. https://fashionunited.nl/nieuws/mode/soft-revolt-breidt-assortiment-uit-met-sportbeha-voedingsbeha-en-swimwear/2026082770399 (200 curl Soft Revolt breidt assortiment uit met sportbeha, voedingsbeha en swim)
35. https://nl.fashionnetwork.com/news/Berne-1921-herlancering-in-volle-gang-met-nieuw-logo-debuut-in-resortwear-en-uitbreiding-naar-de-verenigde-staten-en-griekenland,1854046.html (403 fetch-walled Just a moment...)
36. https://fashionunited.nl/nieuws/mode/vivian-hoorn-trekt-stekker-uit-kledingmerk-viveh/2026051168938 (200 curl Vivian Hoorn trekt stekker uit kledingmerk Viveh)
37. https://www.cosmopolitan.com/nl/fashion/g71430414/mooiste-bikini-merken/ (200 curl Dit zijn de mooiste bikinimerken volgens de Cosmo-redactie)
38. https://www.jan-magazine.nl/mode/g71852319/asymmetrische-badpakken/ (200 curl One-shoulder badpakken zijn de chicste badpaktrend van zomer 2026)
39. https://eur-lex.europa.eu/eli/dir/2024/825/oj/eng (200 curl Directive - EU - 2024/825 - EN - EUR-Lex)
40. https://www.acm.nl/nl/onderwerpen/verkoop-aan-consumenten/eerlijke-handel/duurzaamheidsclaims (404 curl 404 Pagina niet gevonden / Page not found | ACM)
41. https://www.rijksoverheid.nl/onderwerpen/afval/uitgebreide-producentenverantwoordelijkheid-textiel (404 curl)
42. https://www.aboutyou.nl/merken/billie-swim (200 curl)
43. https://tradefest.io/en/event/unique-by-mode-city (200 curl UNIQUE by Mode City 2027)
44. https://www.textilwirtschaft.de/fashion-management/splash-neue-swimwear-messe-in-paris-129730 (200 curl Splash: Neue Swimwear-Messe in Paris)
45. https://www.joor.com/ (200 curl JOOR | B2B Wholesale Fashion Platform for Brands & Retailers)
46. https://www.ankorstore.com/ (200 curl Ankorstore | Wholesale Marketplace Home to Europe's Best Brands)
47. https://www.shopify.com/b2b (200 curl B2B Commerce Platform - Shopify)
48. https://partner.aboutyou.com/ (200 curl ABOUT YOU Marketplace)
49. https://www.wolfandbadger.com/us/designers/gezzina/ (403 fetch-walled Just a moment...)
50. https://maredamare.underbeach.eu/espositori-2025/ (200 curl Espositori 2025 • Maredamare 2026 • 18.19.20 Luglio 2026 • Internation)
51. https://www.liza.nl/en/91312639/billie-swim (KvK data via liza.nl, Billie Swim eenmanszaak, est 08-09-2023, Amsterdam 1036 KR)
52. https://www.northdata.com/91312639 (North Data search by KvK number, no hit (walled-reader 200))
53. https://fashionunited.be/nieuws/business/billie-swim-groeit-vanuit-merkidentiteit-met-focus-op-beleving-en-selectieve-partners/2026042348715 (FashionUnited interview 2026-04-23, read in full)
54. https://www.facebook.com/billieswim (social-audit.js, login wall, UNKNOWN)
55. https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fwww.billieswim.com (eu-view.py from Stockholm, 4 first party cookies, clean)
56. https://www.google.com/search?tbm=map&hl=nl&q=Billie+Swim+Amsterdam (Maps payload, category Badmodewinkel)
57. https://www.instagram.com/gezzinaofficial/embed/ (benchmark, 1680 followers, latest 2026-08-15)
58. https://www.instagram.com/wallien.official/embed/ (benchmark, 28671 followers, latest 2026-10-11)
59. https://www.instagram.com/mymarini_swimwear/embed/ (benchmark, 58655 followers, latest 2026-10-10)
60. https://www.instagram.com/peony/embed/ (benchmark, 226209 followers)
61. https://www.instagram.com/hunzag/embed/ (benchmark, 555048 followers)
62. https://www.instagram.com/lovestoriesintimates/embed/ (benchmark, 376127 followers)
63. https://www.instagram.com/softrevolt/embed/ (benchmark, 16810 followers)
64. https://www.instagram.com/glamouruk/embed/ (positive control, 673549 followers, latest 2026-10-11)
65. https://news.google.com/rss/search?q=%22Billie%20Swim%22&hl=nl&gl=NL&ceid=NL:nl (tools/news.py company, 10 results, control Heineken 100)
66. https://news.google.com/rss/search?q=%22Marjolein%20Schoot%20Uiterkamp%22&hl=nl&gl=NL&ceid=NL:nl (tools/news.py person, 6 results)
67. https://www.billieswim.com/sitemap.xml (200 curl)
68. https://www.billieswim.com/pages/faq (200 curl FAQ – Billie Swim)
69. https://www.billieswim.com/pages/sale (200 curl Sale – Billie Swim)
70. https://www.billieswim.com/pages/contact (200 curl Contact – Billie Swim)
71. https://www.billieswim.com/pages/shipping (200 curl Shipping – Billie Swim)
72. https://www.billieswim.com/pages/ai-use-policy-billie-swim (200 curl AI Use Policy – Billie Swim)
73. https://www.billieswim.com/collections/new-arrivals (200 curl Shop All – Billie Swim)
74. https://www.billieswim.com/collections/bridal (200 curl Bridal – Billie Swim)
75. https://www.billieswim.com/collections/unisize-crinkle-collection (200 curl Unisize Crinkle collection – Billie Swim)
76. https://www.billieswim.com/products.json (Shopify catalogue, 25 products, availability per variant)
77. https://www.billieswim.com/pages/stockists (render-via-curl.js, 188 served, 0 curl errors, screenshot opened)
78. https://www.billieswim.com/ (render-via-curl.js desktop and phone, 267 served, 0 curl errors, screenshots opened)
79. https://billieswim.com/ (crawl 200 Billie Swim)
80. https://www.billieswim.com/agents.md (crawl 200)
81. https://www.billieswim.com/blogs/news (crawl 200 News – Billie Swim)
82. https://www.billieswim.com/blogs/the-billie-swim-blog (crawl 200 The Billie Swim Blog)
83. https://www.billieswim.com/blogs/the-billie-swim-blog/what-is-slow-fashion-and-why-it-matters-for-billie-swim (crawl 200 What is Slow Fashion? And Why It Matters for Billie Swim)
84. https://www.billieswim.com/blogs/the-billie-swim-blog/why-oeko-tex%C2%AE-standard-100-matters-and-why-we-care-at-billie-swim (crawl 200 Why OEKO-TEX® Standard 100 Matters — And Why We Care at Bill)
85. https://www.billieswim.com/blogs/the-billie-swim-blog/how-to-care-for-your-sustainable-swimwear-so-it-lasts-for-years-because-good-things-deserve-to-last (crawl 200 How to care for your swimwear, so it lasts for years. Becaus)
86. https://www.billieswim.com/blogs/the-billie-swim-blog/billie-swim-featured-in-glamour-uk (crawl 200 Billie Swim Featured in Glamour UK!)
87. https://www.billieswim.com/blogs/the-billie-swim-blog/in-her-bikini-what-women-are-saying-about-billie-swim (crawl 200 In Her Billie Bikini: What Women Are Saying About Billie Swi)
88. https://www.billieswim.com/blogs/the-billie-swim-blog/nm (crawl 200 Our First Pop-Up in Amsterdam Was a Dream – Thank You! – Bi)
89. https://www.billieswim.com/blogs/the-billie-swim-blog/why-we-dont-do-black-friday-billie-swim (crawl 200 Black Friday Isn’t Our Wave — Here’s Why Billie Swim Sits Th)
90. https://www.billieswim.com/blogs/the-billie-swim-blog/billie-swim-featured-in-fashionunited (crawl 200 Billie Swim featured in FashionUnited)
91. https://www.billieswim.com/blogs/the-billie-swim-blog/billie-swim-pop-up-on-the-prinsengracht (crawl 200 Billie Swim - Pop-Up on the Prinsengracht)
92. https://billieswim.com/.well-known/ucp (crawl 200)
93. https://billieswim.com/collections/new-arrivals (crawl 200 Shop All – Billie Swim)
94. https://billieswim.com/collections/tops (crawl 200 Tops – Billie Swim)
95. https://billieswim.com/collections/bottoms (crawl 200 Bottoms – Billie Swim)
96. https://billieswim.com/collections/cover-ups (crawl 200 Cover Ups – Billie Swim)
97. https://billieswim.com/collections/one-pieces (crawl 200 One Pieces – Billie Swim)
98. https://billieswim.com/collections/bridal (crawl 200 Bridal – Billie Swim)
99. https://billieswim.com/products/the-most-fabulous-gift-card (crawl 200 The Most Fabulous Gift Card – Billie Swim)
100. https://billieswim.com/collections/billies-classics (crawl 200 Classic – Billie Swim)
101. https://billieswim.com/collections/biarritz (crawl 200 Biarritz Edit – Billie Swim)
102. https://billieswim.com/collections/ribbed (crawl 200 The Ribbed Swim Edit – Billie Swim)
103. https://billieswim.com/pages/size-guide (crawl 200 Size Guide – Billie Swim)
104. https://billieswim.com/pages/sustainability (crawl 200 Impact – Billie Swim)
105. https://billieswim.com/pages/about-us (crawl 200 About Billie Swim)
106. https://billieswim.com/pages/press (crawl 200 Press – Billie Swim)
107. https://billieswim.com/pages/stockists (crawl 200 Wholesale – Billie Swim)
108. https://billieswim.com/products/biarritz-crinkle-bottom (crawl 200 Biarritz Crinkle Bottom – Billie Swim)
109. https://billieswim.com/products/biarritz-crinkle-bottom-copy (crawl 200 Biarritz Crinkle Top – Billie Swim)
110. https://billieswim.com/products/biarritz-crinkle-top-copy (crawl 200 Ikaria Crinkle One Piece – Billie Swim)
111. https://billieswim.com/products/monaco-crinkle-sarong (crawl 200 Monaco Crinkle Sarong – Billie Swim)
112. https://billieswim.com/products/sardegna-strappy-bottom (crawl 200 Sardegna Strappy Bottom – Billie Swim)
113. https://billieswim.com/products/maldives-bottom (crawl 200 Maldives Bottom – Billie Swim)
114. https://billieswim.com/products/santorini-triangle-top (crawl 200 Santorini Triangle Top – Billie Swim)
115. https://billieswim.com/products/biarritz-ring-cheeky-bottom (crawl 200 Biarritz Cheeky Bottom – Billie Swim)
116. https://billieswim.com/products/gathered-skirt (crawl 200 Gathered Skirt – Billie Swim)
117. https://billieswim.com/products/biarritz-ring-top (crawl 200 Biarritz Ring Top – Billie Swim)
118. https://billieswim.com/products/biarritz-bottom (crawl 200 Biarritz Bottom – Billie Swim)
119. https://billieswim.com/products/biarritz-one-piece-1 (crawl 200 Biarritz One Piece - High Leg – Billie Swim)
120. https://billieswim.com/products/sardegna-top (crawl 200 Sardegna Top – Billie Swim)
121. https://billieswim.com/products/bari-one-piece (crawl 200 Bari One Piece – Billie Swim)
122. https://billieswim.com/products/sardegna-triangle-top (crawl 200 Sardegna Triangle Top – Billie Swim)
123. https://billieswim.com/products/sardegna-one-piece (crawl 200 Sardegna One Piece – Billie Swim)
124. https://billieswim.com/blogs/the-billie-swim-blog (crawl 200 The Billie Swim Blog)
125. https://billieswim.com/blogs/the-billie-swim-blog/billie-swim-pop-up-on-the-prinsengracht (crawl 200 Billie Swim - Pop-Up on the Prinsengracht)
126. https://billieswim.com/blogs/the-billie-swim-blog/billie-swim-featured-in-fashionunited (crawl 200 Billie Swim featured in FashionUnited)
127. https://billieswim.com/blogs/the-billie-swim-blog/why-we-dont-do-black-friday-billie-swim (crawl 200 Black Friday Isn’t Our Wave — Here’s Why Billie Swim Sits Th)
128. https://billieswim.com/blogs/the-billie-swim-blog/nm (crawl 200 Our First Pop-Up in Amsterdam Was a Dream – Thank You! – Bi)
129. https://billieswim.com/policies/shipping-policy (crawl 200 Shipping policy – Billie Swim)
130. https://billieswim.com/policies/refund-policy (crawl 200 Refund policy – Billie Swim)
131. https://billieswim.com/policies/legal-notice (crawl 200 Legal notice – Billie Swim)
132. https://billieswim.com/policies/privacy-policy (crawl 200 Privacy policy – Billie Swim)
133. https://billieswim.com/policies/terms-of-service (crawl 200 Terms of service – Billie Swim)
134. https://billieswim.com/policies/contact-information (crawl 200 Contact information – Billie Swim)
135. https://www.billieswim.com/.well-known/ucp (crawl 200)
136. https://www.billieswim.com/collections/tops (crawl 200 Tops – Billie Swim)
137. https://www.billieswim.com/collections/bottoms (crawl 200 Bottoms – Billie Swim)
138. https://www.billieswim.com/collections/cover-ups (crawl 200 Cover Ups – Billie Swim)
139. https://www.billieswim.com/collections/one-pieces (crawl 200 One Pieces – Billie Swim)
140. https://www.billieswim.com/products/the-most-fabulous-gift-card (crawl 200 The Most Fabulous Gift Card – Billie Swim)
141. https://www.billieswim.com/collections/billies-classics (crawl 200 Classic – Billie Swim)
142. https://www.billieswim.com/collections/biarritz (crawl 200 Biarritz Edit – Billie Swim)
143. https://www.billieswim.com/collections/ribbed (crawl 200 The Ribbed Swim Edit – Billie Swim)
144. https://www.billieswim.com/pages/size-guide (crawl 200 Size Guide – Billie Swim)
145. https://www.billieswim.com/pages/sustainability (crawl 200 Impact – Billie Swim)
146. https://www.billieswim.com/pages/about-us (crawl 200 About Billie Swim)
147. https://www.billieswim.com/pages/press (crawl 200 Press – Billie Swim)
148. https://www.billieswim.com/policies/shipping-policy (crawl 200 Shipping policy – Billie Swim)
149. https://www.billieswim.com/policies/refund-policy (crawl 200 Refund policy – Billie Swim)
150. https://www.billieswim.com/policies/legal-notice (crawl 200 Legal notice – Billie Swim)
151. https://www.billieswim.com/policies/privacy-policy (crawl 200 Privacy policy – Billie Swim)
152. https://www.billieswim.com/policies/terms-of-service (crawl 200 Terms of service – Billie Swim)
153. https://www.billieswim.com/policies/contact-information (crawl 200 Contact information – Billie Swim)
154. https://www.billieswim.com/blogs/the-billie-swim-blog?page=2 (crawl 200 The Billie Swim Blog – Page 2)
155. https://www.billieswim.com/products/biarritz-crinkle-bottom (crawl 200 Biarritz Crinkle Bottom – Billie Swim)
156. https://www.billieswim.com/products/biarritz-crinkle-bottom-copy (crawl 200 Biarritz Crinkle Top – Billie Swim)
157. https://www.billieswim.com/products/biarritz-crinkle-top-copy (crawl 200 Ikaria Crinkle One Piece – Billie Swim)
158. https://www.billieswim.com/products/monaco-crinkle-sarong (crawl 200 Monaco Crinkle Sarong – Billie Swim)
159. https://www.billieswim.com/products/sardegna-strappy-bottom (crawl 200 Sardegna Strappy Bottom – Billie Swim)
160. https://www.billieswim.com/products/maldives-bottom (crawl 200 Maldives Bottom – Billie Swim)
161. https://www.billieswim.com/products/santorini-triangle-top (crawl 200 Santorini Triangle Top – Billie Swim)
162. https://www.billieswim.com/products/biarritz-ring-cheeky-bottom (crawl 200 Biarritz Cheeky Bottom – Billie Swim)
163. https://www.billieswim.com/products/gathered-skirt (crawl 200 Gathered Skirt – Billie Swim)
164. https://www.billieswim.com/products/biarritz-ring-top (crawl 200 Biarritz Ring Top – Billie Swim)
165. https://www.billieswim.com/products/biarritz-bottom (crawl 200 Biarritz Bottom – Billie Swim)
166. https://www.billieswim.com/products/biarritz-one-piece-1 (crawl 200 Biarritz One Piece - High Leg – Billie Swim)
167. https://www.billieswim.com/products/sardegna-top (crawl 200 Sardegna Top – Billie Swim)
168. https://www.billieswim.com/products/bari-one-piece (crawl 200 Bari One Piece – Billie Swim)
169. https://www.billieswim.com/products/sardegna-triangle-top (crawl 200 Sardegna Triangle Top – Billie Swim)
170. https://www.billieswim.com/products/sardegna-one-piece (crawl 200 Sardegna One Piece – Billie Swim)
171. https://billieswim.com/collections/new-arrivals?page=2 (crawl 200 Shop All – Page 2 – Billie Swim)
172. https://www.billieswim.com/collections/new-arrivals?page=2 (crawl 200 Shop All – Page 2 – Billie Swim)
173. https://www.billieswim.com/cart/52267219616087:1?ucp/version=2026-08-25&context/payment/0/handler=dev.shopify.shop_pay (crawl 200 Billie Swim)
