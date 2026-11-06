# Build card, Qualigraf v6. A front door and four country flows. 6 Nov 2026

Raka, 6 Nov. Choose the country first, a different flow per country, a hero page, a story that flows the way Steven sells,
proof and customer cases, and nothing that looks like Claude Code made it. His slop list, verbatim: tags and pills, excessive
italics, Instrument Serif, negative kerning, over the top detailed UI, overusing dividers, colour shades and opacities,
containers with borders, overly detailed diagrams, verbose and redundant text, breadcrumbs, section numbering, eyebrows,
dithering, ASCII images, squiggles, excessive mono fonts, all caps subtitles, full stops in titles, gradient backgrounds.

Built from `build.py`, which writes `site/index.html` and `site/{uk,fr,nl,ca}/index.html` from one content dict per country.

## A. The visitor and the action

1. **Who lands.** A Head of Democratic Services, griffier, DGS or clerk, a year or more before a contract changes (Steven,
   4 Nov). Then the officer asked to look at it. Then Steven himself, who has to put one site in front of four country managers.
2. **The one action.** A walkthrough or demo built around their own meeting. `.act` in the hero, the pinned track, every
   section's way down, the invitation and the phone bar. On the front door, the country rows and the office links.
3. **The flow.** Front door, "Where is your council?", then per country. Hero (their meeting, written as a sentence), the
   papers fold into one file, the file travels the stations of a decision with that country's own deadlines, who it's for,
   proof, security, the people, the invitation already filled in.
4. **The one state.** UK, Canada and the Netherlands, `{committee, date}`. France, `{date, commune size}`, because the
   convocation delay is three or five jours francs by size. The 3D file's label, the track, the invitation and the form read it.

## B. What each country's flow is for (Steven, 4 Nov)

| Country | Job of the site | What changes in the flow |
|---|---|---|
| UK | New logos, early adopters | Statutory dates computed (reg 9, s100B, s100C, s100D), ADSO sponsor, Steven and Stuart, "Book a walkthrough" |
| Canada | New logos | No dates computed (province rules). A product tour from their own demo municipality. Blair in Oshawa. "Book a demo" |
| France | Maintain, mass market to small communes, workflow heavy | Their services as the stations, convocation computed in jours francs by commune size, publicity rule by size, SecNumCloud hosting, their two published quotes. "Demander une démonstration" |
| Netherlands | Grow public sector | Their modules from idea to e-depot, Gemeentewet art 19 named but no days computed, their frontrunners, Rob in Dordrecht. "Plan een kennismakingsgesprek" |

The front door doesn't redirect. It lists the visitor's country first, from the country they chose last time or their
browser language, so a shared council laptop still offers all four. Their live site redirects; that's Steven's call.

## C. The look, and the slop list checked one by one

- **Type.** Mona Sans (OFL, GitHub) for headings at 700 to 750, no negative tracking, sentence case, no full stops. Source Sans 3,
  their own body face, for reading. No mono anywhere, no serif, no italics. Instrument Serif, Fraunces, Geist, Space Grotesk avoided.
- **Colour.** Navy and white lead. Cream with coral is the look avoid-ai-design names as the Claude look, and their cream page made
  v5 read that way, so cream is gone. Coral is the action only. Teal, mustard and plum appear only as the station colours on the rail.
  One pale mist tint for alternate bands and one navy chapter, the invitation running into the footer. No gradients, no opacity tints.
- **Shapes.** No borders round blocks, no dividers, no shadows, no pills or chips, no badges or dots, square buttons with no arrows.
  The rail is solid colour segments that light up, not a gradient.
- **No eyebrows, numbering, breadcrumbs or caps labels.** v5's mono station numbers are gone.
- **Hero art.** The 3D papers, cut from 600 to 190 (130 on the front door) after the first render looked like noise. Papers on the
  headline side sit further back so they read small and pale.
- **Text.** Shorter than v5 per section, one idea per heading.
- `tools/check-build.js`, all five pages, exit 0, no detector broken (fonts, italics, kickers, pills, chips, arrows, cards, marquee,
  art, sections, turns, hero share, walk test, first screen action, count ups).

## D. Proof, and what we did NOT do

Raka asked for customer cases. **None are published anywhere we could find**, in English, Dutch or French (searched 6 Nov), and
Qualigraf's own pages have no case study. So the proof is only what Qualigraf publishes itself.
- "Over 400 clients across Europe", ADSO sponsor page. "Près de 200 collectivités déjà connectés", their French homepage.
- Frontrunner logos, exactly the sets on their own UK, NL and FR homepages.
- The two French quotes, verbatim with their own anonymous attributions and a link, **French page only**. Their testimonials page
  pads them with the same boilerplate paragraph repeated, so they're used carefully.
- No invented case, quote or number. The first UK and Canadian go lives (Steven, "a couple of months") are the cases to write next.

## E. QA run on 6 Nov

- Rendered every page at 1440 and 390, every screen looked at. Zero page errors, zero failed requests, no horizontal overflow.
- axe 4.10.2, 10 runs (5 pages, 2 sizes), clean.
- Dates. UK on 4 meetings, FR on 3, cross checked against a separate Python calculation, all match. UK 11 Mar 2027 Cabinet,
  key notice by Fri 29 Jan 2027, agenda by Wed 3 Mar, open until Thu 10 Mar 2033, background papers until Mon 10 Mar 2031.
  FR 11 Mar 2027, sent by Fri 5 Mar (3 500 and over) or Sun 7 Mar (under 3 500).
- Forms on all four pages, empty submit names the fields and focuses the first, bad email focuses the email, a good one shows
  the preview message with the meeting.
- Copy on rendered text, 0 em or en dashes, 0 colons, 0 banned words, 0 uncontracted English verbs, control file proves the
  checker catches both. Hyphens left only in names, addresses, references and French spelling (Stoke-on-Trent, L2121-12,
  procès-verbal, Alsace-Moselle, Bodegraven-Reeuwijk, week-end). e-depot uses a no break hyphen so it doesn't split.
- Portraits are Qualigraf's own files, hashes bc4f3264 (Steven) and 62f9c93b (Stuart) as verified on 28 Sep. Blair and Rob from
  their CA and NL homepages, each beside their own name there.

## F. For Steven to confirm before anything goes live

1. "Qualigraf is working with its first UK councils now" (UK proof). From his call, not published.
2. His Civica Modern.Gov line on the UK team section.
3. The French quotes, real and usable, or replaced by named ones.
4. AI Notulen on the NL page follows the NL site. The UK site still says AI Minutes is coming soon, so the UK page doesn't sell it.
5. French and Dutch copy needs a native read. Written from their own pages, not by a native speaker.
6. Zenon, their heading face, is locked to their Adobe kit. Mona Sans stands in.
7. Forms aren't wired. The front door doesn't redirect.

## Sources

- Their pages, saved 6 Nov, qualigraf.com/uk, /en_ca, /fr, /nl homepages and /fr/temoignages-clients-collectivites/.
- https://www.adso.co.uk/qualigraf/
- https://www.assemblee-nationale.fr/dyn/11/questions/QANR5L11QE29767.pdf (jours francs)
- https://www.collectivites-locales.gouv.fr/publicite-et-entree-en-vigueur-des-actes-des-collectivites-locales (L2131-1, 1 July 2022)
- https://github.com/funboy322/avoid-ai-design and https://www.paralect.com/blog/signs-of-ai-slop-in-design (what reads as AI made)
- Law and bank holidays behind the UK dates, `site/assets/state.js` header.
