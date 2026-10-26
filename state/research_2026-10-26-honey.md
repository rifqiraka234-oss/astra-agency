# Research, 2026-10-26, Elise Laeven, Honey It's Handled, ctc_z9AByAoDiQAssohkn

Raka's angle call, 26 Oct, word for word: "I LOVE IT, a more storytelling artsy website to get more bookings".

Researched 2026-10-26 09.30 to ~10.10 UTC in session 24052593. Evidence folder
/tmp/claude-0/-home-user-astra-agency/24052593-7323-58b2-9e3f-744f7080d43c/scratchpad/leads/honey (site-audit json and
screenshots, crawl pass1 and pass2, full page renders of all five English pages desktop and phone in shots/, raw HTML of
all ten pages in raw_html/, KBO pages in kbo/, the Instagram embed data in ig/). Draft in
state/drafted_2026-10-26-angle-honey.md.

## The angle in plain words

Elise left a five year job at CityCubes, an Antwerp event agency, and started Honey It's Handled this year, a wedding and
private event planner. Her site went live in August and it's pretty, red and blue, with her own branding. It's built to
win her first couples, "Will you be one of our first 'I do'?", but the only real event it tells the story of is Cinco Cero,
a 50th birthday. A couple deciding on a planner for 2027 sees no wedding planned her way. The pitch, inside Raka's
storytelling direction, is a wedding story added to her site, a couple's year with her from first call to final dance,
told through what she already has, the Cinco Cero night and her CityCubes years, ending in the launch offer. Never a new
site, because she just launched this one and posted about it proudly.

## The thread and the person

- `python3 tools/lemlist.py thread ctc_z9AByAoDiQAssohkn`, 09.30 UTC, control ctc_ch3vFcKAkjQdMKDCg 6 items ok, Elise 0
  items, all pages.
- State files, grep for laeven, honey it, honeyitshandled and the contactId. Only the RESEARCH_QUEUED row of 26 Oct in
  silent_accepted_queue.jsonl (this session) and two mentions as a new accept in logs/inbox/2026-10-26-*.md. No send.
- lemlist contact record (`get /api/contacts/ctc_z9AByAoDiQAssohkn`, 09.30 UTC). jobTitle "Oprichter", tagline "Oprichter
  van Honey It's Handled | Wedding & Event Agency Freelance | Event & Project Manager", Antwerp, campaign W1b
  cam_7gnHSf6GvvGy8gH3n, leadId lea_NLHa3AjjwFkwSWrbw, LinkedIn /in/elise-laeven-292726193. The W1b accepted export gives
  companyName Honey It's Handled, companyDomain honeyitshandled.com, companySize 1-10, company LinkedIn
  /company/honey-its-handled. The tagline agrees with companyName. The "Freelance | Event & Project Manager" part says she
  may also take freelance event work, the site's form also offers "Corporate Event".
- KBO, the statutory record, read 26 Oct ~09.45 UTC. Name search "Laeven" lists enterprise 1032.568.265, "Laeven, Elise",
  natural person, active since 1 January 2026. Name search "honey handled" lists establishment unit 2.382.853.203 "Honey
  it's Handled", Ankerrui 12/101, 2000 Antwerpen, under the same enterprise number. Control search "Colruyt" returned 200+.
  The enterprise page
  https://kbopub.economie.fgov.be/kbopub/toonondernemingps.html?ondernemingsnummer=1032568265 says begin date 1 January
  2026, function "Oprichter van een geregistreerde entiteit-natuurlijk persoon Laeven, Elise sinds 1 januari 2026", VAT
  registered since 1 January 2026, e-mail info@honeyitshandled.com and web www.honeyitshandled.com both "sinds 2 augustus
  2026", NACE 82.300 congresses and fairs and 82.990 other business services. So she founded it and owns it, a sole
  trader.
- Her own words on the site, home, "I'm Elise, founder, planner and the person behind Honey it's Handled".

## The site, two passes

- Pass 1, `tools/crawl.py https://www.honeyitshandled.com`, 11 URLs, all 200, 5 from the Wix sitemap (lastmod 2026-09-14
  for every page) plus the five Dutch mirrors and the bare home. English pages: home (325 words), /weddings (511),
  /private-events (274), /about (286), /contact (221). Dutch: /nl, /nl/weddings, /nl/evenementen, /nl/over, /nl/contact,
  the same content. Every page read in full, English and Dutch.
- Pass 2, the second crawl was rate limited by Wix (429 on 6 of 11) at 09.50, rerun after a pause, see the gate for the
  final count. Also full page renders of all five English pages, desktop 1440 and phone, scrolled to load every image, 10
  renders split into 42 parts, every part looked at (shots/), plus site-audit.js desktop and phone.
- site-audit.js, 09.32 UTC. 200, Wix, render trusted (assetsOurFault 0), 0 page errors, 7 failed requests all Wix logging
  and a Cloudflare challenge beacon. No banner and no privacy link, both against a working control. Social links from the
  HTML, https://www.instagram.com/honeyitshandled/ and https://www.linkedin.com/company/honey-its-handled/.
- What a couple sees. A deep red hero with HONEY IT'S HANDLED in a large italic serif and WEDDING & EVENT AGENCY, a moving
  strip "SAYING 'I DO' SOON? BE ONE OF OUR FIRST COUPLES & ENJOY AN EXCLUSIVE LAUNCH OFFER. LET'S TALK" linking to
  /weddings, then "For the moments you'll never want to forget", two tiles (Weddings, Private Events), "A glimpse of the
  good stuff" with a gallery of nine photos all named "Honey it's Handled_Cinco Cero_1..9" and a VIEW PORTFOLIO button, Meet
  Elise, the Honey philosophy and the enquiry form. On the phone render the glimpse section has no photos at all (13 images
  in the phone DOM against 22 on desktop, the nine Cinco Cero photos are absent), a proof point only.
- VIEW PORTFOLIO links to https://www.honeyitshandled.com/private-events, read from the rendered link and again from the raw
  HTML of the home.
- /weddings, "YOUR DAY, BEAUTIFULLY HANDLED.", the three services (full planning, partial planning, wedding day
  coordination), "THE PROCESS" in four words with one line each (Dream, Plan, Create, Celebrate), "NEW CHAPTER. YEARS OF
  EXPERIENCE. ... With nearly 5 years of experience in professional event and project management", and the launch offer,
  "WILL YOU BE ONE OF OUR FIRST 'I DO'? We're looking for a few special couples to become part of the very first Honey it's
  Handled weddings. As one of our first couples, you'll recieve an exclusive launch offer on our wedding planning service, in
  exchange for allowing us to capture and share your celebration as part of our Honey it's Handled story. Saying 'I do' in
  2027 or 2028?". Wedding photos with alt "Honey it's Handled_Wedding", whose weddings they are isn't said, so nothing is
  claimed about them.
- /private-events, "RECENTLY HANDLED Cinco Cero." with the brief, occasion "50th birthday celebration", result, a WATCH THE
  AFTERMOVIE link (its href is the same page) and a 1080p mp4 video element in the page, so the site does carry film.
- /about, five years managing events, no employer named. /contact, the form (what are we celebrating, Wedding, Destination
  Wedding, Private Event, Corporate Event, Other, and how did you find us, Instagram, Google, Event, Referral, Other) and a
  four step what happens next.
- Absence checks with controls, all ten pages EN and NL. "Cinco" found on /private-events and /nl/evenementen (control, the
  method finds an event name), and in the home HTML. No other event, couple or client named anywhere, 0 hits for real
  wedding, review, testimonial, portfolio (except the button), €, prijs, price, vanaf. "CityCubes" 0 hits in the raw HTML of
  all ten pages.
- Wix siteRevision 247 and isPremiumDomain true in the home HTML, a paid plan on her own domain and a lot of edits by her.
  No designer or agency credit in any page or post. Domain registered 2026-04-29 (RDAP verisign, control example.com 1995).
  Wayback has no capture of the domain (availability API, control example.com returned a snapshot).
- When it launched. KBO has the web address since 2 Aug 2026. Instagram 5 Aug 2026, "Turns out branding can be a love
  language too. This is what happens when a wedding & event agency finally gets its own signature • businesscards, stickers,
  a website that doesn't take itself too seriously ... www.honeyitshandled.com". So the site is about twelve weeks old and
  she's proud of it. RULES 0F just built applies in full.

## Social, opened with tools/social-audit.js

- Instagram https://www.instagram.com/honeyitshandled/ 137 followers, 6 posts, newest 2026-09-15 (41 days). Posts, read
  through the embed with their timestamps. 17 Jun 2026 "She's here." brand reveal. 5 Aug 2026 branding and website. 19 Aug
  2026 "Time for an introduction ... After 5 years working at CityCubes, an event agency in Antwerp and a Marketing degree,
  one thing was always clear: I'd start something of my own one day. That 'someday' is now." 8 Sep 2026 "Meet CINCO CERO.
  Our very first private event ... A 50th birthday, 125 guests and one completely custom concept. From the mysterious look &
  feel and branding to the Mexican food ... CINCO CERO • 28.08.2026". 10 Sep 2026 the aftermovie, "A special thank you to
  Jan for trusting HONEY IT'S HANDLED with this one. Our first private event, officially handled." 15 Sep 2026 "You enjoy. We
  handle." Tagged accounts, eliselaeven (personal, unreadable, private or missing) and decocktailfiets (a supplier, 6,223
  followers).
- LinkedIn company https://www.linkedin.com/company/honey-its-handled/ 154 followers, 1 employee, "HONEY IT'S HANDLED is a
  wedding & event agency for the ones who want it all handled".

## Owner LinkedIn, six routes (same person as the contact)

1. tools/fetch-walled.py /in/elise-laeven-292726193, 429 then 999, walled.
2. Web search "Elise Laeven" Honey It's Handled, nothing about her.
3. Web search site:linkedin.com "Honey It's Handled", no LinkedIn page returned.
4. Web searches "Elise Laeven" CityCubes and Laeven CityCubes, nothing.
5. The company page in Chromium through social-audit.js, 154 followers, 1 employee.
6. Instagram, her intro post of 19 Aug 2026 names CityCubes and calls her founder, personal account unreadable.

## News, tools/news.py

- nl, 09.41 UTC. "Honey It's Handled" 0, "Elise Laeven" 0, honeyitshandled 0, control Heineken 100. Region (Antwerpen)
  (weddingplanner) 77, events news only. Industry weddingplanner 100, De weddingplanners on NET5 (Televizier 24 Oct 2026),
  "Blossoms Together uit Laakdal bundelt volledige trouwplanning in één online platform" (Made in, 3 Jul 2026, opened at
  source, a Flemish planner's DIY planning platform for couples who plan without a planner), "De mooiste dag van je leven?
  Vriendinnetjes Zita en Lisa regelen alles" (GVA 23 Apr 2026, a new Flemish planner duo, gva.be walled to our fetch).
- "CityCubes" 14, an Antwerp experiential and event agency, BEA Awards gold 2024 (MediaSpecs 5 Dec 2024), the Bisou Awards
  with Hurae (pub.be 9 Jul 2024), two new partners (made-in.be 2 Feb 2023). Sortlist lists 15 people. Her old employer.
- Region (Antwerpen OR Vlaanderen) (trouwen OR huwelijk OR bruiloft) 100, local wedding news, nothing on planners.

## Benchmarks, Flemish planners, opened at source

- Wedding Dreamworx https://www.weddingdreamworx.be/ , the home leads with "Mooie verhalen – Real weddings", nine couples
  by name and venue (Julie & Tom in Outfort, Antwerpen, Evelien & Jan in a warehouse in Merksem) and two signed
  testimonials.
- Salon Weddings https://salon-weddings.be/weddingplanner-antwerpen/ , "76 koppels mogen bijstaan", "6 Jaar ervaring", a
  selection of Antwerp weddings by couple name.
- Flowerytales https://www.flowerytales.be/ , "Hoe onze koppels terugblikken op hun trouw" with named testimonials, "maximaal
  10 huwelijken per jaar", a free first call.
- Bring us a dream on mariages.net, from €350, its FAQ gives €350 to €10,000 for planner services in Belgium.
- trouwen.nl and statbel.fgov.be walled to curl and fetch-walled, not used.

## GDPR sweep, never the angle

tools/eu-view.py from Stockholm, 7 first party cookies (ssr-caching, server-session-bind, __cf_bm, XSRF-TOKEN, hs,
svSession, bSession), 0 third party cookies, 151 requests to 6 Wix and Sentry hosts. No privacy link on a form that takes a
name, email and phone (site-audit.js, with control). A 50 euro fix, recorded only.

## The pain table

| # | Pain | Proof | Cost to her | Would she name it | Verdict |
|---|---|---|---|---|---|
| 1 | The site asks for first couples but tells no wedding, the only event told is Cinco Cero, View Portfolio opens private events, CityCubes unnamed | crawl, renders, raw HTML, controls | the first 2027 bookings, a full planning job runs to thousands of euros | yes, it's her launch offer | CHOSEN, hottest, Raka's call |
| 2 | Instagram quiet, 137 followers, 6 posts, none since 15 Sep | social-audit.js | couples find planners on Instagram, her form lists it first | likely | a separate thread, noted for later |
| 3 | Hard to find, the brand name plus Antwerpen returns nothing in two searches | web search | Google is the second option on her form | maybe | folded, not the message |
| 4 | Enquiries by hand, one person | the form and KBO | small at her volume today | no | not chosen |
| 5 | No privacy link, no banner | site-audit.js, eu-view.py | a fine risk, small | no | never the angle (RULES 0E) |
| 6 | No prices | crawl | none proven, price on request is normal | no | a model, not a gap |

## Traps checked (RULES 0F)

- Just built. Yes, August 2026, self made and celebrated. So the offer is never a new or changed site, it's the wedding story
  the site doesn't tell yet, built from what she has.
- Not theirs. Every fact is on her own domain, her own Instagram or KBO.
- Removed on purpose. No earlier version exists (no Wayback capture).
- A model, not a gap. Having no weddings is a stage, not a choice, and her launch offer exists to fix it after 2027, the
  pitch is what tells a couple about weddings now.
- Already in hand. Her launch offer will bring wedding stories, but only from couples who book first. Latest post 15 Sep, no
  new site or agency mentioned.

## Flags for Raka

1. The GTM plan says don't pitch consumer businesses or one person firms, and W1b is the consumer campaign it asks to pause.
   Elise is both. You named her, so here it is, the budget sign is thin (one paying client, Cinco Cero, 125 guests, and a
   paid Wix plan with her own branding).
2. The site is twelve weeks old and she made it herself and posted about it with pride, so the message never says the site
   is weak or old. It offers a wedding story on it.
3. The message names CityCubes, which is on her Instagram and not her site. Her own public words, but it shows we read her
   Instagram.
