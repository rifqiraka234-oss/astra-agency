# Systemhaus-Hertling, handover. 21 Oct 2026, v2

## What it is, in plain words

Noah Hertling runs a one person IT firm in Reinbek, registered April 2026. Our 7 Oct message said Hamburg firms
comparing IT partners pick the ones that show proof, and he has none yet, no Google reviews, one LinkedIn follower, a
homepage that names no client. He said yes to seeing "the Hertling online presence that wins Hamburg clients".

His goal is more clients. So v2 is built to sell. Every page walks a visitor to one step, a first conversation with
Noah (a short booking form or a call), and the proof a brand new firm can show today sits on the way there. The
presence sketch does the same for Google and LinkedIn, posts from Noah himself, each ending in one next step.

## Why v2 (Raka, 21 Oct evening, "put yourself in his shoes")

v1 in his shoes. It looked good and it didn't sell. Too long, too technical, a chapter of Eurostat figures, a demo in
every section, the self check as the main button with no way to leave a number, photos of hardware and no people, and
posts from a company page nobody follows, with no next step in them.

What v2 changes, and the reason for each.

| Change | Why it sells |
|---|---|
| One main action everywhere, "Kennenlerngespräch vereinbaren", in the header, hero, steps and a sticky bar on phones | One clear next step converts better than four competing ones |
| A three field booking form (name, phone or mail, best time) on the home page and Kontakt | Leaving a number is the smallest possible yes |
| "Kommt Ihnen das bekannt vor?" with four situations, each linking to its Baustein | A visitor who sees their own problem keeps reading |
| Real people in the imagery, framed in his logo's pillars and band | Buyers picture themselves, hardware photos don't do that |
| The person section, "Sie sprechen mit dem, der Ihre Systeme betreut" | His one person firm becomes the selling point |
| Three steps, the first is just a conversation | Lowers the risk of the first move |
| Demos moved to Leistungen, each Baustein ends in "Über Ihr Netzwerk sprechen" and prefills the form | Proof where people compare, a door to the call right after it |
| Self check kept as the second path, its result goes into the form | Captures the visitor who isn't ready to call |
| Facts chapter cut to one line with its source | Credibility without a lecture |
| Posts from Noah's own profile, each ending in a call or booking line, plus an honest photo slot | A page with one follower reaches nobody, a person does |

## Links

- Live, https://astra-hertling-prototype.netlify.app/ (noindex, SSO off, forms on)
- Presence sketch, https://astra-hertling-presence.netlify.app/ (its own site, Astra's voice, English, so the note
  never sits inside his site)
- Netlify project astra-hertling-prototype, id ddfbb769-744c-46cb-9780-caead079d70a. v1 final 6ad914d70552650b29ea252b,
  v2 6ad925fc0a94a08e345fc045.
- Netlify project astra-hertling-presence, id 75256c91-c631-4bdb-a4d0-33882f720a18. v1 6ad914caca1ab9374665367e, v2
  6ad92612a6a7d26e9ff5f6ae.
- Source state/prototypes/hertling/build, `python3 build.py` writes ../site and ../site-presence. No dependencies
  beyond Python 3.
- Research research.md, copy deck copy.md, teardown research/teardown/TEARDOWN.md, data research/data/DATA.md, assets
  research/assets/ASSETS.md, no-swap sheets research/c5-no-swap-2026-10-21.jpg (v1) and
  research/c5-no-swap-v2-2026-10-21.jpg (v2).

## Pages

Start, Leistungen, Selbsttest, Über uns, Kontakt (with a thank you page), Bewertung, Impressum, Datenschutz. The
presence sketch is a separate one page site. German by default, every line in English too (DE EN switch, remembered per
browser).

Home, in order. His own headline with the booking button and his number beside it, a film framed by his logo, three
promises. "Kommt Ihnen das bekannt vor?" with four situations and one Eurostat line. The black box that opens on scroll
into a documented network with a change log. The four Bausteine as picture cards. The documentation sample with five
tabs. The person section with his card and the map. Three steps to start. The self check over the rain film. The booking
form with the FAQ beside it. On phones a bar with Anrufen and Termin vereinbaren appears once the hero buttons scroll
away and hides again at the form.

Leistungen. Each Baustein with his own bullets, a working demo (WLAN planner, support timeline, permissions matrix,
backup calendar), typical reasons to call, and a link to the conversation about it. Kontakt. His card, then the booking
form. Selbsttest. Ten questions, the result offers "Ergebnis im Kennenlerngespräch besprechen" first.

## What's his and what's ours

His, word for word or nearly, every service line, the four values, the founding sentence, the hero headline, the
closing question, his hours, address, phone, mail and register data. "Ihre IT ohne Blackbox" on the hero card is his
"IT-Betreuung ohne Blackbox" shortened.

Ours, and he has to say yes to each, marked [CONFIRM].

1. [CONFIRM] The first conversation as the main offer, with a callback time choice (Vormittags, Nachmittags, Egal) and
   "Noah Hertling meldet sich persönlich". Nothing says it's free, he decides that.
2. [CONFIRM] The three start steps (Kennenlerngespräch, Bestandsaufnahme, Laufende Betreuung). v1 had four.
3. [CONFIRM] FAQ "Wem gehört die Dokumentation? Ihnen. Sie bekommen sie vollständig, auch wenn Sie später den Anbieter
   wechseln." Strong trust line, but it's a commitment he hasn't made.
4. [CONFIRM] FAQ "Was kostet das?" says a quote follows the first conversation. His site has no prices. 4 of 17 Hamburg
   competitors publish one (hagel from 29 euros per workstation), worth raising with him.
5. [CONFIRM] Über uns "Und wenn Noah mal ausfällt? Dann steht alles in der Dokumentation." Implies clients can reach
   the documentation.
6. [CONFIRM] The Selbsttest is our idea, ten questions, scored in the browser, nothing stored or sent until the visitor
   sends the form themselves.
7. [CONFIRM] FAQ "Für wen passt das eher nicht? Für Firmen, die rund um die Uhr Bereitschaft brauchen." True to his
   Mo to Fr 8 to 18 hours, but it's his call to say it out loud.
8. [CONFIRM] The four "Kommt Ihnen das bekannt vor?" situations and the "Typische Anlässe" on Leistungen are typical
   reasons firms call, written by us, not quotes from his clients. They're set as quotes without a name on purpose.
9. [CONFIRM] The three posts are written in his voice. Post 1 paraphrases his own founding sentence in the first
   person, post 3 offers to check which machines still run Windows 10, which is our idea.
10. [CONFIRM] Practices shown in the documentation sample (password safe, weekly copy off site, monthly restore test)
    are example data, labelled as such on the page, not claims about how he works.
11. Hardware sales are in his register purpose, not on his site. Left out.

## Example data, and where it's labelled

The office in the black box, the WLAN planner, the support timeline, the permissions matrix, the backup calendar, the
documentation sample, the self check preview and the post images are one consistent made up office (12 workstations,
the same rooms, the same dates, the same printer fix at 09.31 on Wed 14 Oct, the same "Finanzen" folder restored on
Fri 2 Oct). Every one carries a visible "Beispiel" label, the documentation header says "Beispielbüro", and the footer
says plans, logs and results show example data. The one statistic on the home page and the one on the self check result
are real, both refetched from the Eurostat API at 20:5x UTC on 21 Oct (isoc_cisce_ic E_SEC2IUSVF DE 10 to 49, 2024 survey,
20.69 percent, shown as "Gut jede fünfte", and isoc_cisce_ra E_SECPOL2 DE 10 to 49, 2024, 33.88 percent). Windows 10's
end of support on 14 October 2025 was reread on Microsoft's own support page the same evening.

## Legal pages, changed from his live text [CONFIRM with his advisor]

- Impressum cites § 5 DDG, not § 5 TMG. The TMG was repealed on 14 May 2024 (IHK Bonn, IHK Nürnberg).
- The EU OS platform link is gone. The platform closed on 20 July 2025, and the old link now lands on a page saying so.
  His § 36 VSBG sentence stays.
- Datenschutz keeps his IONOS hosting statement (true for his own hosting, not for this Netlify preview), drops the
  sentence saying the form sends through the mail program, and adds three true sections for this build, the self check
  runs in the browser, fonts are self hosted, the language choice is stored locally.
- Free tips for the call, not pitched (RULES 0E). His live Datenschutz still shows the template note "Dieser Text ist
  eine allgemeine Vorlage und ersetzt keine Rechtsberatung", and says the form uses the mail program while his live
  form posts to WordPress.

## Before it goes on his own domain

- Remove the noindex meta and the X-Robots-Tag header.
- Wire the booking form to his existing WordPress handler (his honeypot field is also called "website"). Here it posts
  to Netlify Forms as "termin" (fields sprache, seite, name, firma, kontakt, zeit, anliegen). One labelled live test went
  in at 20:5x UTC on 21 Oct ("ASTRA QA TEST v2", a .invalid address), POST 200 and the thank you showed. The v1 tests
  were held by Netlify's spam filter, this one likely too. The old "kontakt" form is still registered from v1, unused.
- Replace the Google button on /bewertung/ with the "Rezensionen erhalten" link from his Business Profile. It now opens
  a Maps search for his listing.
- The review card QR encodes the Netlify URL of /bewertung/. Regenerate it for his domain.
- A real photo of Noah is the one thing only he can add, and it would lift trust more than anything else. 5 of 17
  Hamburg competitors show a face. The person section and the posts use his logo and an honest placeholder until then.

## Assets and licences

- Film and stills from film, Mixkit, Stock Video Free License. 2846 rain (self check section), 42617 office team (hero
  film), 39841 man working late (still, "Kommt Ihnen das bekannt vor?"), 233 woman on a desk phone (still, Support
  card), 42620 two people on laptops (still, Cloud card). The agent bulk downloaded 95 clips by script, which Mixkit's
  terms clause 9 forbids, so each of the five used was fetched again on its own from its item page, licence read again
  ("Free"), bytes identical (ASSETS.md, both v1 and v2 tables). The other clips are unused. None is captioned as his
  office, staff or clients, and his name never sits on a clip.
- Stills, Wikimedia Commons, CC0 or public domain, no credit needed, licence read two ways (ASSETS.md). Used,
  still-switch-patch-cables (Netzwerk card), still-hard-drive-platter (Sicherheit card), still-speicherstadt-canal (Über
  uns). v1's still-desk-laptop-notebook and still-rain-window-tiled-roof (sup-desk.jpg, cld-roof.jpg) and the WLAN
  post image are no longer referenced anywhere, they're still in the deploy folders, unused.
- Fonts, Schibsted Grotesk and Fragment Mono, SIL Open Font License, self hosted.
- Map, OpenStreetMap boundaries via Nominatim, credited on the map.
- Post images, rendered from the site's own components.

## QA record v2, 21 Oct evening

- Copy audit over every visible string, alt, aria label and meta in both languages, both sites, with a planted control
  file that trips every check (11 flags). 0 colons, 0 dashes outside the proper nouns Systemhaus-Hertling and
  Schleswig-Holstein, 0 slop words, 0 hedges, 0 exclamations. Main site 0, presence 0.
- axe 4.10, WCAG 2.2 AA plus best practice, 9 pages and the presence site, German and English, 1440 and 390, 40 runs, 0
  violations. The first run caught the support timeline mid animation (contrast 1.6), fixed by switching that animation
  off for reduced motion.
- Overflow, console errors and failed requests, 10 pages, 2 languages, 8 widths from 1920 to 360, 160 loads, 0.
- Text spilling out of its own box, 80 loads at 1440, 1024, 390 and 360, each with a planted control caught 80 of 80.
  Found and fixed the permissions matrix ("Geschäftsführung" became "Leitung", "Buchhaltung" became "Finanzen" across
  the example office). The only remaining hits are the documentation table's header row, hidden on phones on purpose
  for screen readers.
- Header at 13 widths from 981 to 1920, both languages, with and without JavaScript, 42 checks, 0 wrapped or
  overlapping items. Found and fixed "Über uns" and the header button wrapping at 1280, and the language switch pushed
  off screen at 1041.
- Hero at 7 sizes, both languages, 14 checks. Booking button inside the first screen every time, headline and buttons
  never touch the frame, the card stays inside the film. Controls confirm the overlap detector fires.
- Booking form, 29 of 29 checks with POSTs intercepted. Prefill from the self check and from a Baustein, both languages,
  own text kept on a switch, junk parameters ignored, validation of name and phone or mail, honeypot, a good request on
  Kontakt and on the home page (every field arrives, seite says where), failure falls back to a ready written mail, and
  the phone bar hides at the hero and the form.
- Interactions, WLAN planner on Leistungen 51 to 96 to 99 percent at 1440 and 390, documentation tabs and switch ports by
  mouse and keyboard, self check end to end at 45 percent, black box at 4 widths.
- No JavaScript, 7 pages, nothing hidden, no English leaking. Reduced motion, neither film downloads.
- Live, both deploys fetched file by file and hashed. Site 36 of 38 byte identical, the other two (home and Kontakt)
  differ only where Netlify rewrites the form tag. Presence 19 of 19. Netlify registered the "termin" form with every
  field and the honeypot. Live test POST 200, films stream (206), 0 broken images on a phone.
- C5 no-swap, the v2 hero beside Schumacher, BidX, Garnish and Healthy Secrets, no shared recipe.

## G1 score v2, honest

| Dimension | Weight | v1 | v2 | Why |
|---|---|---|---|---|
| Brand specificity | 15 | 14 | 14 | His logo frames the film, his words, colours, town and promise |
| Narrative and pacing | 15 | 13 | 14 | Recognition, black box, Bausteine, proof, the person, three steps, the form. Shorter |
| Imagery and art direction | 15 | 12 | 13 | People and film now, framed in his mark. Still stock, still no photo of him |
| Workflow completeness | 15 | 14 | 14 | Find, compare, self check, book, start, document, review. No prices |
| Real proof and human trust | 15 | 12 | 12 | Register, real contact, live hours, a labelled sample. No face, no client yet |
| Buyer fit and objections | 10 | 9 | 9 | Single or ongoing, on site or remote, hours, ownership, cost, who it's not for |
| Conversion completeness | 5 | 5 | 5 | One action everywhere, three field form, prefill, fallback, phone bar |
| Interaction and accessibility | 5 | 5 | 5 | axe 0, keyboard on every control, reduced motion |
| Technical reliability | 5 | 5 | 5 | Every file verified live on both sites |
| Total | 100 | 89 | 91 | Over the bar of 90 by one |

No G2 hard failure. The gap left is the same, trust and imagery, and only Noah can close it, a photo of him at work and
a first client who agrees to be named.
