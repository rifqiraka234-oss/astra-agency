# Systemhaus-Hertling, handover. 21 Oct 2026

## What it is, in plain words

Noah Hertling runs a one person IT firm in Reinbek, registered April 2026. Our 7 Oct message said Hamburg firms
comparing IT partners pick the ones that show proof, and he has none yet, no Google reviews, one LinkedIn follower, a
homepage that names no client. He said yes to seeing "the Hertling online presence that wins Hamburg clients".

So this is his whole site rebuilt to show proof a brand new firm can show today, plus a sketch of his Google profile,
a review card and his first LinkedIn posts. The site turns his own promise, "IT-Betreuung ohne Blackbox", into the
spine: his logo is the hero, a black box opens into a documented network, and a sample of the documentation he
promises stands in for the client logos he doesn't have yet.

## Links

- Live, https://astra-hertling-prototype.netlify.app/ (noindex, SSO off, forms on)
- Presence sketch, https://astra-hertling-presence.netlify.app/ (its own site, Astra's voice, English, so the note
  never sits inside his site)
- Netlify project astra-hertling-prototype, id ddfbb769-744c-46cb-9780-caead079d70a. Deploys 6ad9107f0d978d86b28bb065,
  6ad911c6a296cc1b62c8171b, 6ad913d380c3a75924cb6871, final 6ad914d70552650b29ea252b.
- Netlify project astra-hertling-presence, id 75256c91-c631-4bdb-a4d0-33882f720a18, deploy 6ad914caca1ab9374665367e.
- Source state/prototypes/hertling/build, `python3 build.py` writes ../site and ../site-presence. No dependencies
  beyond Python 3.
- Research research.md, copy deck copy.md, teardown research/teardown/TEARDOWN.md, data research/data/DATA.md, assets
  research/assets/ASSETS.md, no-swap sheet research/c5-no-swap-2026-10-21.jpg.

## Pages

Start, Leistungen, Selbsttest, Über uns, Kontakt (with a thank you page), Bewertung, Impressum, Datenschutz. The
presence sketch is a separate one page site. German by default, every line in English too (DE EN switch, remembered per browser).

Home, in order. His logo as the hero with his own headline. The black box that opens on scroll into a documented
network with a change log. One contact, Noah's card and a map of Reinbek to Hamburg (15.74 km straight line). Five
facts from Eurostat, the BSI and Statistikamt Nord, each with its source. The four Bausteine, each with a working demo
(a WLAN planner you drag, a support timeline, a permissions matrix, a month of backups). A documentation sample with
five tabs (network with a clickable 24 port switch, devices, logins, backups, change log). How it starts in four steps.
The self check teaser over a rain film. Contact and FAQ.

## What's his and what's ours

His, word for word or nearly, every service line, the four values, the founding sentence, the hero headline, the
closing question, his hours, address, phone, mail and register data.

Ours, and he has to say yes to each, marked [CONFIRM].

1. [CONFIRM] The order of the four start steps (Kennenlernen, Bestandsaufnahme, Dokumentation, Laufende Betreuung).
2. [CONFIRM] FAQ "Wem gehört die Dokumentation? Ihnen. Sie bekommen sie vollständig, auch wenn Sie später den Anbieter
   wechseln." Strong trust line, but it's a commitment he hasn't made.
3. [CONFIRM] FAQ "Was kostet das?" says a quote follows the first conversation. His site has no prices. 4 of 17 Hamburg
   competitors publish one (hagel from 29 euros per workstation), worth raising with him.
4. [CONFIRM] Über uns "Und wenn Noah mal ausfällt? Dann steht alles in der Dokumentation." Implies clients can reach
   the documentation.
5. [CONFIRM] The Selbsttest is our idea, ten questions, scored in the browser, nothing stored or sent.
6. [CONFIRM] FAQ "Für wen passt das eher nicht? Für Firmen, die rund um die Uhr Bereitschaft brauchen." True to his
   Mo to Fr 8 to 18 hours, but it's his call to say it out loud.
7. [CONFIRM] Practices shown in the documentation sample (password safe, weekly copy off site, monthly restore test)
   are example data, labelled as such on the page, not claims about how he works.
8. Hardware sales are in his register purpose, not on his site. Left out.

## Example data, and where it's labelled

The office in the black box, the WLAN planner, the support timeline, the permissions matrix, the backup calendar, the
documentation sample, the self check preview and the LinkedIn post images are one consistent made up office (12
workstations, the same rooms, the same dates, the same printer fix at 09.31 on Wed 14 Oct). Every one carries a
visible "Beispiel" label, the documentation header says "Beispielbüro", and the footer says plans, logs and results
show example data. All dates checked against the calendar (the 2 Oct and 4 Sep restore tests both fall on Fridays).
The facts chapter is real data, each figure rechecked at source on 21 Oct (research.md table).

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
- Wire the form to his existing WordPress handler (his honeypot field is also called "website"). Here it posts to
  Netlify Forms. Two labelled test submissions went in on 21 Oct 19:22 UTC (one with, one without JavaScript), both
  reached Netlify (last submission time updated) and both were held by its spam filter (verified count 0), almost
  certainly the TEST wording and the .invalid address.
- Replace the Google button on /bewertung/ with the "Rezensionen erhalten" link from his Business Profile. It now opens
  a Maps search for his listing.
- The review card QR encodes the Netlify URL of /bewertung/. Regenerate it for his domain.
- A real photo of Noah would lift trust more than anything else. 5 of 17 Hamburg competitors show a face. None is used
  here because none is verified.

## Assets and licences

- Stills, Wikimedia Commons, CC0 or public domain, no credit needed, licence read two ways (ASSETS.md). Used,
  still-switch-patch-cables (Leistungen, Netzwerk), still-desk-laptop-notebook (Support, the weakest provenance, an
  anonymous Unsplash CC0 import), still-rain-window-tiled-roof (Cloud), still-hard-drive-platter (Sicherheit),
  still-speicherstadt-canal (Über uns). None is captioned as his office, staff or clients.
- Film, Mixkit 2846 "Window on a rainy day", Stock Video Free License. The agent bulk downloaded 95 clips by script,
  which Mixkit's terms clause 9 forbids, so this one clip was fetched again on its own from its item page on 21 Oct,
  licence read again (copyrightNotice Free, videoFree), bytes identical. The other 19 clips are unused.
- Fonts, Schibsted Grotesk and Fragment Mono, SIL Open Font License, self hosted.
- Map, OpenStreetMap boundaries via Nominatim, credited on the map.
- LinkedIn post images, rendered from the site's own components.

## QA record, 21 Oct

- Copy audit over every visible string, alt, aria label and meta in both languages, with a planted control file that
  trips every check. 0 colons, 0 dashes outside the proper nouns Systemhaus-Hertling and Schleswig-Holstein, 0 slop
  words, 0 hedges, 0 exclamations. One flag left by design, "which it is" on the presence page, which can't contract.
- axe 4.10, WCAG 2.2 AA plus best practice, 10 pages, German and English, 1440 and 390, 40 runs, 0 violations, and
  the standalone presence build again, 0.
- Overflow, console errors and failed requests, 10 pages, 2 languages, 8 widths from 1920 to 360, 160 loads, 0 problems.
- Hero headline against the band and pillars at 7 sizes, all clear.
- Interactions exercised end to end, WLAN drag, keys, second access point (51 to 96 to 99 or 100 percent), documentation
  tabs and switch ports by mouse and keyboard, self check by pointer and keyboard reproducing the home preview exactly
  (45 percent), contact form validation, prefill from the self check, failure fallback to a written mail, live
  submission with and without JavaScript, language switch on every component.
- No JavaScript, every page readable, no hidden text, no English leaking.
- Reduced motion, film never downloads, reveals and bars static.
- Live, every file fetched and byte matched against the deployed folders, site 31 plus the contact page, which differs
  only where Netlify rewrites the form tag, presence 19 of 19. The old /presence/ path on the site now returns 404. Film plays live (206 range request). QR decoded back to the live review URL.
- C5 no-swap, hero side by side with Schumacher, BidX, Garnish and Healthy Secrets, no shared recipe.

## G1 score, honest

| Dimension | Weight | Score | Why |
|---|---|---|---|
| Brand specificity | 15 | 14 | His logo is the hero, his words, colours, town and promise. Inner pages use a standard layout |
| Narrative and pacing | 15 | 13 | Calm, then the black box unease, then glass, data, demos, proof, a first step |
| Imagery and art direction | 15 | 12 | Strong diagrams and data, but the photos are generic CC0 and none shows him or his work |
| Workflow completeness | 15 | 14 | Find, compare, self check, contact, start, document, care, review, all there. No prices |
| Real proof and human trust | 15 | 12 | Register, real contact, live hours, a labelled sample of the work. No face, no client yet |
| Buyer fit and objections | 10 | 9 | Bausteine single or ongoing, on site or remote, hours, ownership, cost, who it's not for |
| Conversion completeness | 5 | 5 | Self check to prefilled message to confirmation, phone everywhere, form live |
| Interaction and accessibility | 5 | 5 | axe 0, keyboard on every control, reduced motion |
| Technical reliability | 5 | 5 | Every file verified live on both sites, 0 of 160 loads with a problem |
| Total | 100 | 89 | One under the bar of 90 |

No G2 hard failure. The gap is the same as BidX, imagery and trust, and both need his own material, a photo of him at
work and a first client who agrees to be named. That's the honest thing to ask him for on the call.
