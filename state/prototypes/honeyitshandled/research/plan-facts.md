# Honey It's Handled plan, every figure and how it was checked (26 Oct 2026)

Every line here was opened today, 26 Oct 2026, in this session, between 11.58 and 12.20 UTC unless the line gives
another time. Raw pages, renders and spreadsheets are in the session scratchpad (hplan/raw, hplan/src, hplan/today,
hplan/ig*). Three checks for every number, as Hertling v3 did. Check 1 is the source opened today. Check 2 tries to break
it (a recount, a sum that has to close, the page that would disprove it). Check 3 is a second path that doesn't share a
failure mode with the first. Where a number only has two checks, the line says so.

Every figure the page prints lives in `build-plan/data/plan.json`. Every chart is computed from that file at build time
and again in the browser. `qa/plan-honey-func.js` works the sums out on its own from the same file.

## Her own pages (honeyitshandled.com, read 11.58 to 12.01 UTC while she was editing)

| Fact | Where | Checked |
|---|---|---|
| Sitemap lastmod 2026-10-26 for every page, nine URLs, four of them new today (/foto-s-pla-26, /kopie-van-events, /kopie-van-foto-s-pla-26, /kopie-van-events-1) | /sitemap.xml and /pages-sitemap.xml | 1 curl of both. 2 every URL fetched, all 200. 3 Chromium render of the two new event pages |
| Nav now reads HOME, ABOUT, WEDDINGS, EVENTS, CONTACT. /private-events heading "EVENTS, BEAUTIFULLY HANDLED." | /private-events | 1 render text. 2 raw HTML. 3 screenshot looked at (today/private-00) |
| Two events told, CINCO CERO "PRIVATE EVENT · 50TH BIRTHDAY" and PRO LEAGUE AWARDS "CORPORATE EVENT · AWARD SHOW" | /private-events | 1 render text. 2 hrefs read in raw HTML (/kopie-van-events-1 and /kopie-van-events, two each). 3 screenshot today/private-03 |
| "On May 25th, 2026, the Handelsbeurs in Antwerp set the stage for the Pro League Awards, bringing together over 570 guests" | /kopie-van-events | 1 render text. 2 raw HTML, same sentence. 3 "570+ guests" again in THE RESULT block on the same page |
| Cinco Cero, "50th birthday celebration", 125 guests, 28.08.2026 | /kopie-van-events-1 for the occasion, Instagram 8 Sep 2026 post for "125 guests" and "CINCO CERO • 28.08.2026" | 1 render. 2 raw HTML. 3 Instagram caption read through /embed/ at 12.02 UTC |
| Jan Geysen's words, "The collaboration with Elise from Honey it's Handled was amazing, from the initial meeting to the end of the party!" (the plan quotes only "amazing, from the initial meeting to the end of the party") | /kopie-van-events-1 | 1 render. 2 raw HTML, name JAN GEYSEN. 3 Instagram 10 Sep 2026, "A special thank you to Jan for trusting HONEY IT'S HANDLED" |
| /weddings, three services (FULL PLANNING, PARTIAL PLANNING, WEDDING DAY COORDINATION), the four steps (DREAM, PLAN, CREATE, CELEBRATE), "WILL YOU BE ONE OF OUR FIRST 'I DO'?", "Saying 'I do'  in 2027 or 2028?" | /weddings | 1 render. 2 raw HTML. 3 screenshot today/weddings-03 |
| No wedding of her own told. Wedding photos carry alt "Honey it's Handled_Wedding" with no names | all nine pages | 1 render text of every page. 2 grep of raw HTML for "real wedding", couple names, "testimonial". 3 control, the same grep finds "Cinco" and "JAN GEYSEN" where they are |
| No prices | all nine pages | 1 grep for €, prijs, price, vanaf. 2 render text read. 3 control, the same grep finds € on flowerytales.be |
| The form, "What are we celebrating?" Wedding, Destination Wedding, Private Event, Corporate Event, Other. "How did you find Honey, it's Handled?" Instagram, Google, Event, Referral, Other | /contact | 1 the options JSON in raw HTML. 2 render shows both dropdowns. 3 the same form on the home page |
| "Whether there's already a date, a Pinterest board with 847 pins or simply an idea" | home | 1 render. 2 raw HTML |
| KBO 1032.568.265, Laeven, Elise, begin 1 January 2026, web address www.honeyitshandled.com since 2 August 2026 | kbopub.economie.fgov.be, read 12.09 UTC | 1 KBO page. 2 the brief's earlier read (09.45 UTC) agrees. 3 her own About and the Instagram intro of 19 Aug 2026 |

**Rechecked 12.52 UTC.** She renamed the pages while we worked. The sitemap still lists nine pages, now /events,
/cincocero, /proleagueawards, /gallerycincocero and /galleryproleagueawards2026 beside home, /weddings, /about and
/contact. The old URLs answer 301. The raw HTML of /cincocero (JAN GEYSEN and "from the initial meeting to the end of the
party"), /proleagueawards ("On May 25th, 2026", "over 570 guests"), /events (both nights, "freelance event manager") and
/weddings ("WILL YOU BE ONE OF OUR FIRST", "2027 or 2028") carries the same words. Renders of home, /weddings and /events
at 12.53 match the 11.58 screenshots. /cincocero met a Wix check at 12.54 (429, ours), so its screenshot stays the one
from 12.01 under its old URL, same words.

Screenshots for chapter I were taken from the desktop render at 1440 at 11.58 to 12.01 UTC (Wix, so no phone render is
used, Fae Club hiccup). Files hplan/today/*.png.

## Her channels

| Fact | Where | Checked |
|---|---|---|
| Instagram 137 followers, 6 posts, newest 15 Sep 2026 | instagram.com/honeyitshandled/embed/, 12.02 UTC | 1 rendered text. 2 follower count in the page's own data (edge_followed_by 137) and six post timestamps converted (17 Jun, 5 Aug, 19 Aug, 8 Sep, 10 Sep, 15 Sep 2026). 3 the research note's 10.40 UTC read gave the same |
| 17 Jun 2026 post, "meet the palette: Something Off-White. Something Blue. Something Red." | the embed | 1 caption text. 2 the prototype agent read the same line independently at 12.03 |
| LinkedIn company page 154 followers, 1 employee | linkedin.com/company/honey-its-handled, tools/social-audit.js, 12.04 UTC | 1 Chromium read. 2 the research note at 09.30 gave 154. Two checks only, LinkedIn has no second public path |

## The market, Statbel (official statistics)

Source page https://statbel.fgov.be/en/themes/population/partnership/marriages, rendered in Chromium at 12.03 UTC
(curl and fetch-walled met an F5 challenge, Chromium passed it). News item "48,589 marriages in 2024", dated 12 March
2026. Workbook "Marriages in 2024" (BE_Huwelijken_2024_FR.xlsx), downloaded by clicking the page's own link at 12.04.

| Fact | Checked |
|---|---|
| Belgium 2024, 48,589 marriages registered, +4.3% on 2023 (46,564) | 1 web page text and table. 2 workbook Tab1 and Tab2, months sum to 48,589, regions 44,199 plus abroad 4,390 = 48,589. 3 Statistiek Vlaanderen page cites Statbel, allesvoorjehuwelijk.nl (a third party) prints 48.589 |
| Flemish Region 2024, 27,147, +6.7% (25,435 in 2023) | 1 web page table. 2 Tab2 months sum to 27,147, the five Flemish provinces sum to 27,147. 3 Statistiek Vlaanderen, "In 2024 werden in het Vlaamse Gewest 27.100 huwelijken gesloten ... (+6,7%)", published 16 Jul 2026 |
| Flemish Region 2024 by month, Jan 810, Feb 1,218, Mar 1,249, Apr 2,091, May 3,416, Jun 3,962, Jul 2,859, Aug 4,056, Sep 3,213, Oct 1,932, Nov 1,082, Dec 1,259 | 1 Tab2 row "Région flamande" of the 2024 block. 2 sum 27,147 equals the region total. 3 the shape agrees with House of Weddings' own survey ("De populairste maanden om te trouwen in 2025 en 2026 zijn mei, juni en september"), independent of Statbel. Two of three numeric checks, the third is a shape check |
| Province of Antwerp 2024, 7,919. 2015 to 2024, 7,068, 7,122, 7,310, 7,352, 7,158, 5,709, 6,287, 7,786, 7,566, 7,919 | 1 Tab1 "Province d'Anvers". 2 Tab3 by sex, 7,658 + 124 + 137 = 7,919, and the Flemish provinces sum to the region. 3 none outside Statbel found today (provincial pages not reachable), so this rests on two tables of the system of record |
| City of Antwerp (municipality) 2024, 2,496, 2023 2,277 | 1 Tab1 row "Anvers" under the arrondissement. 2 below the arrondissement total (4,504) and the province (7,919). Two checks |
| Abroad 2024, 4,390 (9%). Statbel's footnote counts weddings in embassies and consulates in Belgium in that line too | 1 web page "9% of marriages were celebrated abroad". 2 Tab3 row "Étranger" 4,390 and its footnote. 3 regions plus abroad close to 48,589 |
| Geography is the place of marriage, and the count includes every marriage with at least one partner resident in Belgium | the workbook's Métadonnées sheet and the web page's description, both read |

## When couples decide

| Fact | Where | Checked |
|---|---|---|
| Wedding Dreamworx, "Graag werken we minstens 1 volledig jaar (en bij voorkeur 1,5 jaar) met jullie samen" | weddingdreamworx.be/faq/, 12.07 | 1 curl text. 2 the same page's next line, "we per jaar een gelimiteerd aantal koppels aannemen". 3 Blossoms Together's 18 month timeline below, from a different planner |
| Blossoms Together, "een tijdlijn die koppels vanaf achttien maanden voor de trouw door de voorbereiding loodst", by Lobke Aertgeerts (Laakdal), Made in, 3 Jul 2026 | made-in.be article, fetch-walled 12.10 (curl 403) | 1 article text, datePublished 2026-07-03. 2 The Blossom House profile on trendytrouwen.be, "Lobke Aertgeerts, weddingplanner sinds 2019 ... een heel huis vol tools ... voor wie zelf de touwtjes in handen wil nemen". 3 two sources, different hosts |
| House of Weddings Nationale Huwelijksenquête 2025 (article 5 Jun 2026, "Ruim 1.000 respondenten", "Meer dan 80% van de respondenten zijn vrouwen", "72,8% is woonachtig in Vlaanderen"). Engagement 15.5 months on average, 13.4 for couples already married, 17.7 for couples planning now. "2 op 3 koppels starten hun trouwplanning meteen na het aanzoek." Proposals most in May, then December and September. Budget about €31,750 for engaged couples, €25,500 to €27,000 for married ones, €21,339 in 2022. Pinterest 65.3%, House of Weddings 65%, Instagram 56% as inspiration. 9.8% of engaged couples want to marry abroad, 4.3% of married ones did | houseofweddings.com/nl/inspiratie-en-tips/trouwen-in-2025-nationale-huwelijksenquete, Chromium render 12.11 (curl 429) | 1 article text. 2 the same publisher's 24 Sep 2026 article repeats €31,750, 84% over budget and the planners line. 3 allesvoorjehuwelijk.nl prints €31.750 and 17,7 maanden with House of Weddings as source. The sample is self selected, mostly women, and the plan says so under every chart that uses it |
| Art of Events (Sophie Ickmans) in the same article, "wij trouwfeesten vaak twee jaar op voorhand verkopen" | same | 1 article. Quoted as one planner's words only |

## Who else couples see (each opened today, 12.07 to 12.18 UTC)

| Planner | Fact | Checked |
|---|---|---|
| Wedding Dreamworx, Wilrijk (BTW BE0670.709.369 on its terms page), Hera "weddingplanner en wedding styliste sinds 2015" | 9 weddings told by couple name, the same 9 portfolio pages counted from the home page and from both real-weddings pages, 7 signed couple quotes (2018 to 2022) on the home page. Price, "rekenen op gemiddeld zo'n 15% van je trouwbudget", "het merendeel van onze klanten werkt met budgetten tussen € 50.000 – € 150.000". Instagram not readable today (the embed said the profile link may be broken), so no follower count is printed | 1 curl of home, FAQ, over-hera, algemene-voorwaarden. 2 portfolio hrefs counted (9 distinct from the home page). 3 Chromium font pass loaded the same home |
| Salon Weddings, Antwerp, founded 2017 ("In 2017 startten we", portfolio page) | Home page "95 koppels mogen bijstaan", "8 Jaar ervaring" and 1 couple quote (Tara + Lorenz). Its older Antwerp page still says 76 couples and 6 years, so the plan uses the home page. 19 distinct wedding story pages (/weddings/...) across the portfolio's pages, counted from the hrefs of all four portfolio pages. Instagram 9,909 followers, 587 posts. Three posts on 24 Nov 2025, "The end of an era", "Salon Weddings stopt", "naarmate de maanden voorbij gingen bleef het stil voor 2026. Té stil", "Er staan nog drie mooie huwelijken op de planning", "staan we open voor een overname" | 1 curl of the Antwerp page and the portfolio. 2 their own site's Instagram feed shows the three "The end of an era" posts (curl). 3 the posts read through the Instagram embed in Chromium, timestamps 2025-11-24. A web search found no press on it |
| Flowerytales, Wilrijk (privacy page, BTW BE 0756.712.440) | "maximaal 10 huwelijken per jaar", "Met meer dan 50 huwelijken op de planning", 4 weddings on the portfolio page (4 portfolio hrefs), 4 named couple quotes on the home page (one is a proposal). "Prijs vanaf €5950 excl. btw" for planning and styling, "Prijs vanaf €3150 excl. btw" for styling, both "excl. huur materiaal en transport". Instagram 3,831 followers, 256 posts | 1 curl of home, portfolio, trouwen-belgie, privacy. 2 prices read again in the raw HTML. 3 Instagram embed in Chromium |
| Bliss Weddings, Wilrijk, Lissa, KBO 1019.606.689 begin 4 February 2025 | 1 couple quote (Britt & Thomas, who "had haar werk al van dichtbij gezien bij een ander huwelijk van familie"), a gallery without names, no price. Instagram 163 followers, 12 posts, newest 18 Oct 2026. Listed to meet at Trouw & Trends Brasschaat, 21 Feb 2027 | 1 curl home, Chromium render of /testimonials and /gallery. 2 KBO page for the number printed on its site. 3 trendytrouwen.be profile "Te ontmoeten op deze beurzen 21 feb 2027 Trouw & Trends Brasschaat", Instagram handle taken from that profile |
| Bring us a dream, Overijse (Flemish Brabant) | mariages.net listing, "Tarif à partir de 350€", "de 350€ jusqu'à 10.000€", 5.0 from 5 reviews | 1 fetch-walled (curl 403). 2 the price appears twice on the page. Two checks. Used only for the price range |

## How the rivals chart counts

"Weddings told" is the number of distinct wedding story pages on each planner's own site (couple or place named), opened
26 Oct. Bliss Weddings has a photo gallery with no names, counted 0. Honey It's Handled has two event pages and no
wedding, counted 0. "Couples' words" is counted on the page named in the cell.

## Why now (dated)

| Fact | Where | Checked |
|---|---|---|
| Marry Me Mechelen, fourth edition, Sunday 1 Nov 2026, 11 to 17, Salons Van Dijck, free | radioreflex.be 12 Oct 2026, marrymemechelen.be, 12.13 | 1 Radio Reflex article. 2 the fair's own site, "Zondag 1 november 2026 11:00 — 17:00 Salons Van Dijck". 3 Google News lists GVA and Nieuwsblad 14 Oct on the same fair |
| Trouw & Trends Brasschaat, 21 Feb 2027, 11u to 17u, Kasteel van Brasschaat. Mechelen, 28 Feb 2027, Van der Valk Hotel. Free tickets "vanaf maandag 16 november 2026" | trendytrouwen.be fair pages, 12.06 | 1 each fair page. 2 the fair list on the Antwerp province page shows both dates. 3 Bliss Weddings' profile lists Brasschaat 21 Feb 2027 |
| Het Bruidsparadijs trouwbeurs, Sunday 31 Jan 2027, 10u to 17u, Straalstraat 2, 2170 Merksem, "Ga jij trouwen in 2027, 2028 of zelfs nog later?" | bruidsparadijs.be, 12.06 | 1 curl. 2 the date appears four times on the page. Two checks |
| Salon Weddings stopped, 24 Nov 2025 | above | above |
| Blossoms Together, 3 Jul 2026 | above | above |

## Computed in the plan, from the figures above

- The wedding year. For a wedding in month m of year Y and a planner booked L months ahead, the booking month is (Y, m)
  minus L. It counts as reached when that month is October 2026 or earlier. Weights are the Flemish 2024 months.
  2027 with 12 months, Jan to Oct, 24,806 of 27,147, 91.4%. 2027 with 18, all twelve, 100%. 2028 with 12, none, 0%.
  2028 with 18, Jan to Apr, 5,368, 19.8%. 2028 with 24, Jan to Oct, 24,806, 91.4%.
- One in how many. N couples a year against the province's 7,919 is 1 in 7,919 / N weddings, rounded. 10 couples is
  1 in 792. Against the city's 2,496, 10 is 1 in 250. Against Flanders' 27,147, 10 is 1 in 2,715.
- Growth 2023 to 2024. Province 7,566 to 7,919 is +4.7%. City 2,277 to 2,496 is +9.6%.
- Wedding Dreamworx's rule of thumb on a budget the reader sets. 15% of €31,750 is €4,762.50, shown as €4,763, rounded half
  up in the build and in the browser alike (the no script test compares them).
- Flowerytales' from prices are excl. VAT. The plan prints them as published and says so.

## Type, read today

Fonts pulled off premium wedding planner sites in Chromium at about 12.15 UTC. Mindy Weiss, Escrow Banner and Azo Sans.
Lisa Vorce, Futura PT, LFT Etica Display and Freight Big Pro. Easton Events, Baskervville, Gothic A1 and Montserrat. Art
of Events, a custom face with Urbanist and Cormorant Infant. Flowerytales, Antic Didone, Libre Baskerville and Open Sans.
Wedding Dreamworx, TAN Garland and Rubik. Elise's own site, Cormorant Garamond, Dancing Script and Helvetica, with her
wordmark and HH monogram as images. Three hosts didn't load through our proxy (fete-ny.com, bowerbirdevents.co.uk,
sandyandbabcock.com). The plan is Astra's document, so it uses the pairing that passed on BeBetter v2.1, Mona Sans and
Fragment Mono (both OFL, licence files in build-plan/fonts), and her own logo files carry her serif.

## Not used, and why

- De weddingplanners on NET5 (Televizier, 24 Oct 2026). A Dutch channel, nothing ties it to Flemish couples.
- GVA's piece on Zita and Lisa (23 Apr 2026). Walled today, not opened, so not used.
- Wedding Dreamworx's "Het zelf plannen van een trouwfeest kost gemiddeld meer dan 200 uur, volgens experten". No source
  named. House of Weddings' "200 tot 400 uur" is its own estimate from hours a day times months, also not used as a fact.
- A count of planners on Trendy Trouwen or House of Weddings. The listings are paid or labelled directories, not the
  market, and their pages paginate.
- Pro League Awards photos. Credited "by Kaat DM", a third party photographer, and full of league marks.
- Her portraits and the /weddings photos. Portraits aren't needed in a plan, and the wedding photos' origin isn't stated.
- Anything about her Google listing. We didn't open one, so the plan says nothing about it.
