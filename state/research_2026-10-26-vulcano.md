# Research, Vulcano Smaak (Antonio Pirozzi), 2026-10-26

Session astra-agency-cf (24052593), 09.30 to 10.01 UTC. Raka's angle call, word for word, "modern non wix website to..
idk get more sales wtv". Draft in state/drafted_2026-10-26-angle-vulcano.md (SKETCH, check-drafts PASS). Evidence folder
/tmp/claude-0/-home-user-astra-agency/24052593-7323-58b2-9e3f-744f7080d43c/scratchpad/leads/vulcano.

## The angle in plain words

Antonio and Giuseppe run an Italian lunchroom in the lobby of an office building on a business park in Capelle aan den
IJssel. They also sell business lunches and catering to companies, and pushed fixed price business lunch menus with office
delivery on Instagram in July. Their website is a free Wix page shown inside a frame, it shrinks to the desktop layout on a
phone, and it carries none of those business lunch menus, no catering prices and no way to ask for a quote. Four other
caterers already sell office lunches online in Capelle with prices, one of them Italian. So the pitch is a proper Vulcano
site of their own, built around business lunches and catering.

## Thread and record

- `tools/lemlist.py thread ctc_dbdS2Hgi9Ad4npHJe`, 09.40 and 09.58 UTC, 0 items, control ctc_ch3vFcKAkjQdMKDCg 6 items.
- lemlist contact record (GET /api/contacts) and the W1b accepted export, read 09.31 UTC. jobTitle Owner, companyName
  Vulcano Smaak, companyDomain vulcanosmaak.nl, companyType Partnership, companyFoundedOn 2025, companyEmployeeCount 2,
  location Gouda, companyLocation Capelle aan den IJssel, linkedinUrl /in/antoniopirozzi, leadId lea_Priqty7xvERfMpr2M,
  tagline "Driving international business growth through strategic partnerships and customer-centric sales". The tagline
  names no other employer and no "former". It reads like a sales career, so Vulcano may sit next to a day job. Not settled.
- Repo grep before research. Only the RESEARCH_QUEUED row in state/silent_accepted_queue.jsonl (26 Oct, this session) and
  two mentions in logs/inbox/2026-10-26-*.md as a new accept. No SENT row anywhere.

## The person, outside lemlist

- KVK, tools/kvk-search.js 2026-10-26, control Sagapo Coffee 98234374 came back. KVK 97892777, Vulcano Smaak, Vennootschap
  Onder Firma, hoofdvestiging, registered 2025-07-17, Cypresbaan 3 2908LT Capelle aan den IJssel, "Lunchroom en
  cateringservice aan de Cypresbaan 3 te Capelle a/d IJssel." The free register does not name VOF partners.
- North Data (through tools/fetch-walled.py, the plain fetch got 429) and companyinfo.nl, same KVK number and purpose, SBI
  56111 and 56210, no partner names. companyinfo shows "Nieuwe registratie" 24 Jul 2025.
- LinkedIn company page https://www.linkedin.com/company/vulcano-smaak rendered in Chromium 09.50 UTC. "Medewerkers van
  Vulcano Smaak, Antonio Pirozzi" linking https://nl.linkedin.com/in/antoniopirozzi (the lemlist slug), 2 people, 23
  followers, Partnerschap, founded 2025, About "Born from the shared vision of two entrepreneurs, Antonio from Naples and
  Giuseppe from Catania". One post, the hiring post (activity 7394430128220553216, decoded 12 Nov 2025), "We're looking for
  a part-time team member (20 hours per week)".
- The site's About says "Antonio from Naples and Giuseppe from Catania" too, and the menu PDF linked from the site has
  Author "Antonio Pirozzi", Creator Canva, created 15 Sep 2026, title "Nuovo Menu". The Wix site lives at antoniojp.wixstudio.com.
- His own LinkedIn, six routes. /in/antoniopirozzi 999 through fetch-walled and curl, /recent-activity/all/ 999, Chromium
  lands on the authwall. Web search "Antonio Pirozzi" Vulcano, nothing. A search adding his city was refused by the search
  tool. "Vulcano Smaak" linkedin posts, nothing. companyinfo and North Data name no one. Instagram and the PDF metadata above.
- Verdict, role confirmed outside lemlist (company page plus the PDF author plus the site's About). still there passes.

## The site, both passes

- vulcanosmaak.nl returns 470 bytes, `<frameset>` with `<frame src="https://antoniojp.wixstudio.com/my-site-2">`, title
  "vulcanosmaak.nl", description "Italiaans Lunchbar", keywords "focacciasandwiches lunch catering aperitivo italian food
  arancino cannoli", no viewport tag. A records 15.197.225.128 and 3.33.251.168 (GoDaddy forwarding), NS domaincontrol.com.
- www.vulcanosmaak.nl is NXDOMAIN on Google DNS (09.34) and Cloudflare DNS (09.35 and 09.58), control www.example.com resolves.
  site-audit.js on the www host printed NO_DNS with control example.com 200.
- SIDN RDAP, registered 2025-07-15 at GoDaddy, last changed 2025-12-11. Mail on Zoho EU. The DMARC record reports to
  "mailto:tuo@email.com", a template placeholder (small, not used).
- crawl.py pass 1 and pass 2, 6 URLs each on the Wix site, all 200, plus 1 on vulcanosmaak.nl each. Pages: home (273 words),
  /menu and /menu?menu=dinner-menu (Wix sample "Dinner Menu", tofu skewers, peanut crusted steak, classic burger, cocktails
  €1,50), /online-ordering ("Online Orders (New)", pickup address "500 Terry Francine Street, San Francisco, CA 94158", sample
  dishes), /experiences ("We're not offering any experiences at the moment. Check back soon."). Only the home is linked. The
  sitemap index lists restaurants-menu-sitemap.xml (lastmod 2025-11-11) and pages-sitemap.xml (lastmod 2026-09-23).
- Home, rendered and scrolled, desktop and phone, every viewport shot opened. "Built on WIX STUDIO" bar, VULCANO wordmark,
  a tagliatelle hero (alt "Image by sorin popa", Wix stock media prefix nsplsh_), "Authentic Italian Lunch Bar", About Us,
  "Get a taste of Italy" with Our Menu (the PDF, new tab) and Order Now (thuisbezorgd.nl/menu/vulcano-smaak, new tab), a
  black band "Aperitief | Private Events | Catering", three blocks Food Shop, Aperitif, Catering (stock photos credited to
  Julie MARTINS, Markus Spiske, Mr.Brand Studio), the interior photo (their own, 1.jpg), Instagram, Facebook, LinkedIn
  icons, the volcano mark, footer 0102004584, info@vulcanosmaak.nl, © 2025 by Vulcano Smaak, Cypresbaan 3.
  Catering block, word for word, "Corporate events, team lunches, celebrations, meetings. Our team crafts extraordinary
  experiences tailored to impress your guests at events, large and small. Let us handle the details while you enjoy
  delectable offerings that ignite conversations. From intimate gatherings to corporate functions, our commitment remains
  deliciously the same." No link, no price, no form.
- Phone, the important one. vulcanosmaak.nl on iPhone 13 and Pixel 5 emulation, the page and the frame lay out at 980 wide
  with no viewport tag, so the desktop layout is shown shrunk (screenshot framedP-first.png). The direct Wix URL lays out at
  390 and 393 with its mobile layout. Measured twice, 09.45 and 10.00 UTC.
- Rendered counts on all 4 sitemap pages (forms.js), forms 0, inputs 0, mailto 0, tel 0, business lunch 0, office 0, quote 0,
  offerte 0, prijs 0, delivery 0 except the sample /online-ordering. Controls, catering 2 and team lunch 1 on the home, euro
  27 on /menu, and the same script on https://rivington.ch/reservation gives forms 1, inputs 18.
- Menu PDF, 5 pages, read in full with pdftotext. Fresh pasta (ravioli €15, tagliatelle €13), lunch menu (focaccia
  sandwiches €8.50 to €9, pinsa €9, lasagna €14, arancini €7), snacks, drinks, and an About page, "OUR SERVICES INCLUDE,
  Catering for corporate and private events, Italian aperitifs on-site or at external locations, Made-to-order & pick-up
  options for private dinners at home ... Ask us for more information or a personalised proposal." Wifi "O&M Gast", the
  building's guest network. No business lunch menu, no catering prices.
- Link targets read from the framed page. Order Now and Our Menu open in a new tab, so nothing breaks inside the frame.
- Wix's free plan carries the "Built on Wix Studio" header, forum.wixstudio.com/t/built-on-wix-studio/71834 (30 Jun 2025,
  "In the free plan of Wix Studio we will get the banner"). So nothing was paid for this site.
- Wayback Machine, unreachable twice (connection reset, the control example.com failed the same way). Unknown, not empty.

## Where they are and who they sell to

- Cypresbaan 3 is OFMO, Office & More, a multi tenant building run by Kantoortehuur010, "prachtige ontvangsthal met
  lunchroom", offices from 19 m², salons and light industrial units (https://www.kantoortehuur010.nl/new-gallery). The lunchroom
  was "Lunchroom Coffee & More". A search snippet of the old Coffee & More Facebook page says it was taken over by Vulcano
  from 1 October 2025 (tier G, the page is behind the login, not used).
- Google Maps, rendered 09.53 UTC. Vulcano Smaak, 4,7 stars, Italiaans restaurant, Cypresbaan 3, Monday 10.00 to 17.00,
  "Bestelling plaatsen thuisbezorgd.nl", website vulcanosmaak.nl, +31 10 200 4584 (the site's number, so the listing is
  theirs). The map shows CapelleXL, Campus Delta offices, ERIKS and the Hoofdweg next to them.
- Thuisbezorgd listing, walled four ways (curl 403, fetch-walled 403, Chromium Cloudflare check, WebFetch 403, the Takeaway
  API 403). A search snippet says 4.4 from 33 reviews and a €1,99 delivery fee (tier G, not used).
- Instagram through the public embed (social-audit.js and a direct read). 211 followers, 52 posts. Own posts, 30 Jun 2026
  parmigiana joke, 2 Jul 2026 the business lunch post (DaTVR10Mqza), 4 Jul pizza joke, 17 Jul summer hours ("From August
  10th to August 24th ... Monday – Friday 11:00 AM – 7:00 PM"). 4 Aug and 17 Aug are Étoile hair private party collabs with
  "Location @vulcanosmaak". The business lunch post, word for word, "Looking for the perfect business lunch? Treat your team
  or clients to authentic Italian cuisine with our fixed-price business lunch menus, tailored to your budget. ✅ Custom menus
  for every budget ✅ Lunch at our lunch bar ✅ Office delivery available ✅ Fresh, homemade Italian dishes prepared with
  passion ... Send us a message for a personalized quote and let us take care of lunch!" 4 likes.
- Facebook https://www.facebook.com/profile.php?id=61583318837171, 36 followers through the Page Plugin, posts behind the login.

## Competitors selling office lunches online in Capelle, opened at source 09.55 UTC

- Delibert, "Op de bedrijventerreinen langs de Hoofdweg, in Capelle-West en in kantoorwijken zoals Fascinatio, Schollevaar
  en Oostgaarde werken dagelijks duizenden mensen", "Bestel je vóór 16:00, dan leveren we de volgende dag", "Bestellen gaat
  volledig online". https://www.delibert.nl/broodjes-bestellen-capelle-aan-den-ijssel
- Stadskeuken, Italian business lunches, delivery area includes Capelle aan den IJssel, "Luxe lunchpakket – Sociaal &
  Royaal € 14,95" with focaccia, schiacciata, mortadella, online cart. https://stadskeuken.nl/bedrijfslunches/
- Ideaal Catering, "Kantoorlunch vanaf €10,95 p.p", "Lunchbuffet vanaf €11,95 p.p", order online or ask for an offerte.
  https://ideaalcatering.nl/lunch-bestellen/lunch-capelle-aan-den-ijssel/
- Daily's Rivium, "Bedrijfslunch bestellen via de webshop ... Dit doen wij in Capelle aan den IJssel en omgeving".
  https://www.dailysrivium.nl/sitemap/lp/bedrijfslunch/capelle-aan-den-ijssel.html

## News, tools/news.py nl, control Heineken 100 every run

- Company and person, "Vulcano Smaak" 0, "Antonio Pirozzi" 0, "Vulcano Capelle" 0, "Vulcano lunchroom" 0, "Office & More
  Capelle" 0, "OFMO Cypresbaan" 0.
- Regional, (Capelle aan den IJssel) (lunchroom catering bedrijfslunch) 4, (Capelle aan den IJssel) (bedrijfscatering kantoor
  lunch) 4, (Rotterdam) (zakelijke lunch catering) 6, incl. "Hoe bedrijven rond Maassluis hun vergaderlunch slim
  organiseren" (maassluis.nu 30 Sep 2026, headline only, the article link didn't resolve).
- Industry, bedrijfscatering kantoor lunch 64, "Waarom persoonlijke bedrijfscatering thuishoort op de HR-agenda" (PW. 16 Oct
  2026), zakelijke lunch catering 8, Leo Catering top of the MT1000 (30 Sep 2025), Social Deal picks Vermaat (1 Oct 2025).

## The sweep, all five

| Family | Evidence | Verdict |
|---|---|---|
| Website | Free Wix Studio site in a frame, desktop layout at 980 wide on phones, no form, no catering prices, no business lunch menus, stock food photos, www doesn't resolve, sample pages published | CHOSEN |
| GDPR | eu-view.py from Stockholm, 7 first party cookies, 0 third party, 122 requests to 7 Wix hosts. No privacy link (site-audit.js, with control) | Checked, never the angle |
| Apps and tools | A quote and pre order flow for business lunches. Folded into the site, two partners and one part timer | Folded |
| Social | Instagram 211, own last post 17 Jul 2026, Facebook 36, LinkedIn 23, all opened with social-audit.js | Real, not chosen, Raka's call is the site |
| Build Squad | A lunchroom and caterer, KVK activity says so | Not a fit |

## Pain table

| Pain | Proof | What it likely costs a year (internal estimate, never in the message) | Would they name it | Pay test |
|---|---|---|---|---|
| (1) Site can't sell business lunches and catering, and looks like a free Wix page | Instagram post 2 Jul, rendered pages, PDF, phone measurement | One team lunch of 15 at about €15 a head is about €225. One lost a week is roughly €11k of revenue a year. Estimate | Yes, they advertise it themselves | €3,000+ site, passes on value, budget is the doubt |
| (2) No channel to the companies around them | Four competitors selling online in Capelle, Delibert names the Hoofdweg | Same money as (1) | Yes | Folded into (1) |
| (3) Quote and ordering tool | Instagram asks for DMs for quotes | Hours of DMs, small at this size | Maybe | Too small alone |
| (4) Social quiet since mid July | Embed dates | Hard to put a number on | Maybe | Not chosen |
| (5) www missing, sample pages live | DNS two resolvers, sitemap | Small | No | 50 bucks test fails, proof only |
| (6) GDPR | eu-view.py | None worth pitching | No | Never the angle |

Costliest and proven, (1). Raka's angle holds and gets a money question, company lunches and catering.

## Owner reply test

- "Companies just call or message us, every offer is custom." A model, not a gap. Ruled out by their own post selling
  "fixed-price business lunch menus" and "Custom menus for every budget", and the offer keeps the quote as a request.
- "We just made the site." Just built. Ruled out, live since at least Nov 2025, © 2025, edited Sep 2026, free Wix plan, so
  nothing paid.
- "That's not our listing." Not theirs. Every source used is linked from their own site or carries their phone.
- "We took the catering page off." Removed on purpose. No sign a catering page ever existed (sitemaps list only the four
  pages, Wayback unreachable). Not claimed, the message says what the catering section has now.
- "An agency is already on it." Already in hand. No sign in posts or the site, the pages sitemap was last edited 23 Sep 2026
  and nothing new is live. Recheck in the minute before sending.

## Flags for Raka

1. Out of the GTM profile (lunchroom, W1b consumer campaign). The angle is aimed at the B2B half.
2. Budget is thin. Two partners, one part time hire, free Wix plan, opened autumn 2025.
3. His tagline reads like a sales job, Vulcano may be next to it.
4. Wix sample pages (San Francisco pickup address, sample dinner menu) are live but unlinked. Proof for the sketch.

## Counts

Pages read twice, 7 and 7. Sources used, 24 (21 opened, 3 walled), 18 domains. Profiles, the company page read, his own
walled on six routes. News, 10 queries with controls. Confidence MEDIUM.
