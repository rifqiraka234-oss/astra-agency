# Batch 9, the redo of every "no angle" lead with all four families. 2026-09-25. NOT SENT.

Raka, 2026-09-25, "do a batch of redo the ones before? Like really we cant do an angle on any of
them? We have website is shit angle for growth, we have gdpr angle, we have the building apps for
efficiency and growth angle, we also have social media, did we test on all of them? This is
mandatory." Now RULES.md 4A rule 13 and a check-drafts.py gate.

## How the pool was rebuilt

- **336 acceptances**, pulled fresh from lemlist this morning (four activity pages, 100 + 100 +
  100 + 36, 336 unique leads, newest Pierre-Lou 2026-09-24 21:04). None new since yesterday.
- Joined to the queue's latest row per contact. **44 sat at NO_STRONG_ANGLE (38) or
  BLOCKED_NEEDS_INFO (6).**
- **All 44 threads pulled one by one** (`get_inbox_conversation`, 44 calls). Controls in the same
  session, Wessel van Noort's and Jon Cockley's threads came back full.
  - **10 had ALREADY been sent a real message**, while the queue still said NSA or blocked.
    Anouk van der Haak, Alexandre Aoun, Frank Reinders, Benjamin Zekavica, Alice Martin, Amna
    Abdulla, Cameron Syme, Josh Fairbairn, Evie Barker, Axel Fleury. Out of the redo, they're
    Stalled, not Silent. The queue is stale on all ten.
  - 20 connect note only, 14 empty (recent accepts, lemlist doesn't record those connect notes).
- **About half are "who", not "what", and no angle family changes that.** Competitors (Luis Raab
  significa, Dan Kavanagh Ignition Search, Cédric Morel Hula Hoop, Connor Bosco Elevate, Yasin
  Tipiler UGC.NL, Ollie Bartlett Collier Pickard, and Harold Engelen below), not the owner
  (Andrew Johnson Diggecard, Mandy Kerley Aptiq, Shail Ma Clean Valley, Fernando Gomes), a listed
  plc (Peter Borup Quadrise), acquired (Jean-Christophe Conticello, Wemanity Reply), funded
  startups and deep tech (Romy Abbrederis Lobby, Hendrik Rolshausen Prevent, Orion D. Omnilabs,
  Fabrice Beauchêne Glyx, Rohith Devanathan Scrubmarine, Mushtaq Taher RentX), an arts stichting
  (Mike Kokken), a club canteen (Debby Alles), a closed domain (Aditya Taneja), a newsroom (Marek
  Pruszewicz Dialogue Earth), a governance data firm led by a hired DG (David Risser).
- **The ten redone here** are the owner led businesses where a family could exist.
  **Harold Engelen came out on the record.** His own lemlist experience lists "Mede-eigenaar,
  Website voor Horeca", and websitevoorhoreca.com names him and says "Een nieuwe website bouwen
  duurt meestal acht tot twaalf weken". A competitor. **Romain Coquio** replaced him.

## THE GEO TRAP, found on this batch, and it touches four sent messages

This container exits in Columbus, Ohio (ipinfo.io and the Cloudflare trace, both US). WebFetch
(Council Bluffs) and r.jina.ai (North Charleston) are US too. GDPR doesn't cover a US visitor, so a
site with Cookiebot, Usercentrics, Complianz, Shopify's banner or Google consent mode region
defaults shows us no banner and runs its trackers. **A "trackers before consent" finding from here
only holds when the page has no consent code at all.** site-audit.js now says so on every run.
Four messages sent 2026-09-21 made that claim, see `logs/inbox/2026-09-25-geo-trap-gdpr-sends.md`.
Burton Clinic and Aurevia were very likely wrong, Markoni stands, AutoDevPro can't be read.

---

## Marjan Verhoeven, Peter van der Leegte Veilingen. OPENER.

**In plain words.** They're a machine trading and auction business in Nuenen, founded 2023, and
the name says auctions. But the auction part of their site is a copy of the buy and sell text
and its "running auctions" button does nothing. Meanwhile Industrial Auctions, the Eindhoven
online auction house, just auctioned the machines of Esro Vlees, the bankrupt meat processor in
Nuenen itself, closing yesterday. The costliest pain is that the auction work in their own
town goes to the platforms that let buyers bid online, and Astra can build that auction module.

**Check A.** Thread `ctc_G7wn7qLMJebwJn7Qt`, connect note 2026-08-03 only, pulled this morning.
The 2026-09-21 audit lists her under connect note only. search_campaign_leads
`lea_wz97DoSgZoG8yozf5`, v0.1 only, status done. Queue, only verdict rows, never SENT.

**Who.** lemlist `jobTitle` "Co-owner | Finance & Operations", tagline "Co-owner | Opkoop &
veiling van (gebruikte) machines, inventaris en metalen". KVK 91835879. The holding's owners
aren't public, so her co ownership rests on her own profile, as the earlier batch noted.

```gate
lead: Marjan Verhoeven, Peter van der Leegte Veilingen B.V., ctc_G7wn7qLMJebwJn7Qt, lea_wz97DoSgZoG8yozf5
site pass 1: 87 pages, tools/crawl.py, every page read, Joomla
site pass 2: 87 pages, second full crawl, plus the services page opened in Chromium, the Lopende veilingen button clicked and screenshotted against Bekijk ons aanbod as control
deep analysis: Menu Home, Huidig aanbod, Over ons, Onze diensten, Contact. About 15 machines listed with price and Bel ons, e.g. Matsuura MC-800VG at 12500. The word online appears on no page. The Veilingen block on /onze-diensten repeats the In en verkoop paragraph word for word, and its Lopende veilingen button is a bare button type=button with no href and no handler. Clicked in Chromium the URL stays on /onze-diensten while the control button navigates to /huidig-aanbod. Footer links Veilingen, Onderhandse verkoop and the rest all point to /onze-diensten. No consent code, GA and GTM load for everyone, Google Fonts remote.
owner linkedin: Peter van der Leegte, /in/petervanderleegte curl 999 on www and nl. Search title "Peter van der Leegte" only. His earlier firm Peter van der Leegte B.V. (since 2013) sold stock through Troostwijk online auctions in Feb and Nov 2013 per faillissementsdossier. petervanderleegte.nl gives a Mijndomein parked page on http and times out on https, WebFetch 503, r.jina.ai timeout, logged UNKNOWN.
contact linkedin: Marjan, /in/marjanverhoeven curl 999, recent activity 429. Search on her name with the company returns nothing personal. Company page 200 on curl, 445 followers, last four posts read, 2025-10-02 to 2025-11-27, the last one ten months ago, about transport and valuation, none about an auction.
google news: tools/news.py nl, "Peter van der Leegte" 2 results (2017 and 2019, unrelated), "Marjan Verhoeven" 3 unrelated, control Heineken 100
regional news: tools/news.py (Nuenen OR Eindhoven OR Brabant) machineveiling, 12 results, Esro Vlees Nuenen inventory auctioned 2026-09-15, worldwide interest 2026-09-22, Industrial Auctions founder profile 2026-05-11
industry news: tools/news.py machineveiling OR veiling machines, 54 results, Dome Auctions Solex 2026-08-03, Troostwijk agricultural 2026-06-22, Uitslag Oldenzaal online 2026-05-26, all online
sources:
1. https://www.petervanderleegteveilingen.nl/ (87 pages, twice)
2. https://www.petervanderleegteveilingen.nl/onze-diensten (clicked in Chromium)
3. https://www.linkedin.com/company/peter-van-der-leegte-veilingen
4. https://www.faillissementsdossier.nl/veiling/142267/online-veiling-machines-en-inventaris-wegens-faillissement-esro-vlees-bv-in-nuenen
5. https://www.industrial-auctions.com/nl/
6. https://drimble.nl/regio/noord-brabant/veldhoven/106885075/ad-begon-op-zijn-52ste-met-online-veiling-nu-krijgen-machines-vanuit-eindhoven-een-tweede-leven.html
7. https://www.northdata.com/Peter%20van%20der%20Leegte%20Veilingen%20B%C2%B7V%C2%B7,%20Nuenen/KVK%2091835879
8. https://www.faillissementsdossier.nl/veiling/12298/peter-van-der-leegte-metaalbewerking-metalworking-te-eindhoven.aspx
9. https://www.faillissementsdossier.nl/veiling/6088/peter-van-der-leegte-metaalbewerking-metaalbewerkingmachines-te-eindhoven.aspx
10. https://www.iveindhoven.com/en/ (checked, a dealer, not an online auction, not used)
11. https://news.google.com/rss/search?q=machineveiling (tools/news.py, three searches)
pains: 5 judged. Auction work in their own town going to online platforms. No way to bid on their site. LinkedIn silent ten months. GA without consent. A one person scale against national platforms.
chosen: the auction jobs going to online platforms, costliest, a single liquidation like Esro fills a whole online sale, and hottest, it closed 2026-09-24 in Nuenen
sweep website: the auction section on https://www.petervanderleegteveilingen.nl/onze-diensten is the buy and sell text copied, its button goes nowhere (clicked, control navigates), machines are call us listings. A symptom, the fix alone is small
sweep gdpr: no consent code of any kind in the HTML, so the US egress doesn't matter, GA and GTM and Google Fonts load for every visitor, privacy page not linked from the homepage per site-audit.js with its control. Real, but a small fix, not the angle
sweep apps: no online bidding anywhere on 87 pages, while Industrial Auctions ran the Esro sale in Nuenen online per https://www.faillissementsdossier.nl/veiling/142267. An online auction module, lots, bids, closing times, is a 5k to 50k build. The angle
sweep social: company page https://www.linkedin.com/company/peter-van-der-leegte-veilingen last posted 2025-11-27, 445 followers, no social linked from the site per site-audit.js. Secondary
claims:
the Veilingen section repeats the buy and sell text, https://www.petervanderleegteveilingen.nl/onze-diensten
the Lopende veilingen button goes nowhere, https://www.petervanderleegteveilingen.nl/onze-diensten
Industrial Auctions just auctioned Esro's machines in Nuenen online, https://www.faillissementsdossier.nl/veiling/142267/online-veiling-machines-en-inventaris-wegens-faillissement-esro-vlees-bv-in-nuenen
Betty Blocks go to market, docs/astra-master-context.md, https://www.bettyblocks.com/
recheck: all reopened 2026-09-25. Button clicked twice paths, markup read and Chromium click with control. Esro auction closed 24 Sep 2026 16:00, auction house Industrial Auctions, viewing Nuenen. Industrial Auctions phone +31 40, Eindhoven. Weak spots, her ownership rests on her profile, and the sister site petervanderleegte.nl couldn't be read. Thesis confidence MEDIUM
```

**Pain table.**

| Pain | Level | Cost to them | Proven | Pay test | Verdict |
|---|---|---|---|---|---|
| Auction work in Nuenen goes to online platforms | Company, region | Whole liquidation sales, the commission and the buyers | Esro sale by Industrial Auctions, closed 24 Sep | **Yes**, an online auction module | **The angle** |
| No bidding on their own site | Company | Every consignor who wants an auction | Yes, clicked with a control | Only as the module above | Symptom |
| LinkedIn silent since Nov 2025 | Company | Consignor reach | Yes | No | Context |
| GA without consent | Company | Small fine risk | Yes, no consent code | No, a tiny fix | Park |

### Marjan, OPENER

```
Hi Marjan, saw Peter van der Leegte Veilingen, looks interesting!

However, your site is showing the Veilingen section with the buy and sell text copied into it, and the Lopende veilingen button doesn't go anywhere. This causes a company clearing out a hall to find no auction of yours to join, and buyers nowhere to bid.

Especially, when you are organising auctions while Industrial Auctions just auctioned Esro's machines in Nuenen online, the clearance jobs in your own town go to whoever lets buyers bid from anywhere.

I run Astra agency. We build websites and apps for brands like Unilever, AXA, Pertamina. I ran go to market at Betty Blocks, a platform companies use to build their own apps, so I know what it takes to put a process like bidding online.

Shall I send you over what the online auction page looks like?
```

---

## Steven Uitentuis, QWIC. NO_STRONG_ANGLE, with a GDPR check only Raka can do

```sweep
lead: Steven Uitentuis, QWIC, CEO since Dec 2025 (RetailTrends and nieuwsfiets 2025-12-11), ctc_uiZnjF5t5mX8ZDJtc
website: qwic.nl and qwic.de rebuilt, new Elan and Signal with Bosch motors launched 2026-05-01 per nieuwsfiets, dealer locator and dealer signup work, screenshots taken by site-audit.js. Nothing weak on the growth pages
gdpr: Cookiebot is in the HTML, so the US egress hides the EU banner, site-audit.js prints GEO VOID. From the US 20 cookies and Criteo, LinkedIn, Facebook and DoubleClick load before a click, which proves nothing for a Dutch visitor. Needs Raka from NL, incognito
apps: dealer.qwic.nl is their own dealer portal, a React app, linked from https://www.qwic.nl, so the dealer ordering tool already exists. Nothing to sell there
social: instagram qwic_ebikes, facebook qwicnl and linkedin company all linked from their HTML per site-audit.js, Instagram returns 429 to us so recency is unread
verdict: NO_STRONG_ANGLE, unless Raka's NL check shows trackers firing before consent on a brand with 400 dealers
```

## Simon Wilmes, Snorly. NO_STRONG_ANGLE, with a GDPR check only Raka can do

```sweep
lead: Simon Wilmes, Snorly GmbH, Co-Founder and CEO, ctc_eb8ySnZEpFiroQaXH
website: snorly.de 166 pages crawled (16 rate limited), Shopify, full journal and an insurer guide, strong content. site-audit.js said RENDER NOT TRUSTED so no visual finding is claimed
gdpr: Shopify customerPrivacy and privacy-banner in the HTML and a GTM container with 126 consent references, so GEO VOID. From the US, Clarity, Facebook, Taboola and DoubleClick load pre click. On a snoring and sleep apnoea product that's health data if it happens in the EU. Needs Raka from NL, incognito
apps: the at home impression order flow runs on Shopify and the founder builds, per his lemlist summary. No process gap found on the crawl
social: only a WhatsApp link in the HTML per site-audit.js with its control, no Instagram or Facebook linked, for a DTC brand buying Meta and Taboola ads. Real, but not a 5k build
verdict: NO_STRONG_ANGLE, and the strongest GDPR candidate if Raka sees trackers before the banner, because it's health
```

## Matthias Ufer, Schumacher Verfahrenstechnik. NO_STRONG_ANGLE

```sweep
lead: Matthias Ufer, Schumacher Verfahrenstechnik GmbH, Geschäftsführender Gesellschafter, ctc_3L5hXyZ8hWrh8tAGC
website: 71 pages crawled twice capable, modern Framer build with service pages per process, an English cooling systems page and a DIN 2303 defence welding page, Angebot in 24 Stunden. Strong, an agency (avermann.eu) already runs it per the earlier note
gdpr: site-audit.js found a consent banner with a reject button, 0 cookies and 0 trackers before a click, consent code present so a US read, but zero trackers even for the US. Clean
apps: the Materialabverkauf page asks buyers to pick in a database, copy the selection and paste it into a form, per the crawl. Clunky but a stock clearance sideline, small. Quoting promised in 24 hours, no evidence it's a bottleneck
social: no social linked from the HTML per site-audit.js with its control. A LinkedIn company page exists per lemlist. News empty, control Volkswagen 100
verdict: NO_STRONG_ANGLE. Watch for defence growth signals, it's the SBZ pattern if they start hiring
```

## Karin Andersson, The Real Olive Company. NO_STRONG_ANGLE

```sweep
lead: Karin Andersson, The Real Olive Company, Joint CEO and co founder 1998, ctc_XknfFnBmAo83YYeqh
website: 380 pages crawled. The Where to buy page prints the raw [wpsl] shortcode where the stockist finder should be, and lists Waitrose, Ocado, Abel and Cole and Osolocal2u. A broken finder, a small fix
gdpr: no consent code of any kind in the HTML, so valid for every visitor. GA and Google Ads load before a click, while their own Legal Stuff page says a cookie control system lets users allow or disallow cookies on the first visit. True and embarrassing, but a banner is a small fix
apps: the trade meze solution for pubs, bars and stadia runs on a samples and prices form at https://therealolivecompany.co.uk/meze/, D2C subscriptions run on WooCommerce per the crawl. No evidence of an ordering bottleneck
social: instagram realoliveco linked from their HTML, 429 to us so recency unread
verdict: NO_STRONG_ANGLE. Correction to the earlier note, OLLY'S is not theirs, it's Olly Hiscocks' brand (ollys-snacks.com, Forbes 2026-07-03), in 236 Tesco and 460 Sainsbury's since April per retailtimes. A competitor entering chilled olives, which is the costliest pain and not one we build for
```

## Paul Prescott, Raise Your Game. NO_STRONG_ANGLE

```sweep
lead: Paul Prescott, Raise Your Game Limited, CEO and co founder, ctc_HQWRGkBGkYT69xsb9
website: 400 pages crawled, capped, 377 are prize pages. Modern, partner wall of Spurs, City in the Community, Newcastle United and Birmingham City foundations, screenshot looked at. A Spurs mascot prize for 19 September still leads the carousel, small
gdpr: no consent code in the HTML, GA and GTM load for every visitor, privacy.php and cookie.php exist. Small fix
apps: they are the platform themselves, the homepage https://www.raise-your-game.com/ says draws are set up by the club and paid through Stripe. Nothing to sell against
social: no social linked on any of 400 pages per the crawl, for a fan facing prize business. Real, but the clubs' own channels carry the draws
verdict: NO_STRONG_ANGLE
```

## Niklas Mocker, dotega. NO_STRONG_ANGLE

```sweep
lead: Niklas Mocker, dotega, CEO and co founder, ctc_Wg9Bv7Z7vMqpNQx78
website: 103 pages crawled, complete funnel with ten city pages, prices, FAQ, webinars and an app login at app.dotega.de per the crawl. Strong. RENDER NOT TRUSTED on assets, no visual claim made
gdpr: Usercentrics in the HTML, so GEO VOID, only GTM loads from the US. Needs NL to judge, low priority
apps: they build their own software, the crawl of https://www.dotega.de found an app login at app.dotega.de. Not a buyer for tools
social: linkedin company, instagram dotega.de and a facebook page are all linked from their HTML per site-audit.js, active channels, no gap to sell
verdict: NO_STRONG_ANGLE
```

## Severin Kloos, Dariuz. NO_STRONG_ANGLE

```sweep
lead: Severin Kloos, Dariuz, Algemeen directeur, ctc_CJGZpaRQxRpP7Qb8e
website: 89 pages crawled, Salient and WPBakery bought theme, content for gemeenten and SW bedrijven, the earlier image breakage was our fetch path. Decent
gdpr: Complianz banner with reject, 0 cookies and 0 trackers before a click per site-audit.js. Clean
apps: they sell their own methodology and Dariuz HRM software to municipalities per the lemlist description. Not a buyer for tools
social: linkedin company, a youtube video and twitter.com/dariuznl are linked from the HTML per site-audit.js. A B2G seller, social isn't where gemeenten buy
verdict: NO_STRONG_ANGLE
```

## Emily R., Alquimia Legal. NO_STRONG_ANGLE

```sweep
lead: Emily Levy R., Alquimia Legal, Co-Owner, ctc_rMYGbmu7Piu5Pmwei
website: the record's alquimialawyers.com has no DNS (site-audit.js NO_DNS, control example.com 200). The live firm is alquimialegal.mx, Wix, rendered, with an English version per the earlier note
gdpr: no consent code, no trackers before a click, 7 first party cookies only, privacy page at /politica-de-privacidad per site-audit.js. Clean, and a Mexican firm
apps: trademark and patent registration for international clients per her lemlist summary, a correspondent practice. No process evidence on https://alquimialegal.mx
social: linkedin, instagram alquimialegalmx, facebook and WhatsApp all linked from the HTML per site-audit.js
verdict: NO_STRONG_ANGLE
```

## Romain Coquio, Carrefour Contact Mesnil-Roc'h. NO_STRONG_ANGLE

```sweep
lead: Romain Coquio, SARL EMAROM, gérant with Anne Coquio, SIREN 504393612, 10 to 19 staff, per recherche-entreprises.api.gouv.fr
website: no site of his own, lemlist companyDomain is carrefour.fr, and the store appears on https://www.icatalogue.fr/w/11780 and directories he can't change. Rule 8 franchise, the offer would have to be something he owns
gdpr: nothing of his to test, he has no own domain per the lemlist record, and the Carrefour network pages belong to Carrefour, not to EMAROM
apps: the lemlist description lists home delivery, Mondial Relay and a butcher. A delivery order tool is thinkable, but a village superette's volume fails the 5k to 50k pay test on this evidence
social: a LinkedIn company page exists per lemlist, no Facebook page for the store surfaced in search. His own tagline is @Tilkal traceability, a second job
verdict: NO_STRONG_ANGLE
```
