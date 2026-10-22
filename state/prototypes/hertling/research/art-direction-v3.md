# Systemhaus-Hertling v3, art direction (22 Oct 2026)

Raka on v2: "It looks like something out of the 2010s. Needa make it more sleek man. No islands and all. Colours.
Gradients. Animations pictures. Whatever. Looks so basic ... Everything looks like a 100euro job it needs to be done
€6000 euro worth at least." His own definition of dated (RULES 4A): "Squary, things in islands, it doesn't flow, a lot
of gaps." And the rule from Qualigraf v4: a redesign changes four things at once, palette and type, page grammar, story
spine and media, or it isn't one. v2's source is kept untouched in build/v2pages/.

## What v2 got wrong, looked at next to the 57 site teardown

- Light grey page, white cards with hairline borders and 24px radii floating on it. Islands, every section.
- Schibsted Grotesk at one weight of seriousness, navy on grey, one blue button. Reads like a 2015 Bootstrap theme.
- Media sat inside boxes. The leaders put film and photos full bleed (Apple 8 videos, Framer 7, Mercury 5).
- No light, no depth. 15 of 20 design leaders use backdrop-filter, 15 of 20 mix-blend-mode, 19 of 20 clip-path.
  v2 used almost none of it.
- "Kommt Ihnen das bekannt vor?" is Matic-Tec's own section ("Kommt Dir das bekannt vor?"). Copying a competitor's
  line is the opposite of positioning. Gone.

## The concept, from his promise

His promise is "IT-Betreuung ohne Blackbox". So the site is the black box opening. It starts at night, a dark canvas
where his network sits unseen, and the visitor's cursor is a torch that lights it up device by device. Every chapter
after that is a little lighter, deep blue, then twilight over Hamburg, then morning, and the booking at the end sits in
full daylight. Light means documented. The page's own colour tells the story without a word.

His logo is two blue pillars joined by a grey band. The band is the line that runs through the page: it draws the
network in the hero, it carries the three steps, it underlines the booking.

## Palette, from his logo, used as light

| Token | Value | Use |
|---|---|---|
| night | #04070d | hero, footer |
| ink | #070e1a | first chapters |
| deep | #0a1c33 | the glass box, the services |
| navy | #0d2c4d | twilight |
| logo blue | #08558a to #0a5c8d | the mark, deep accents |
| signal blue | #1a8fe0 | buttons, glows, links on dark |
| ice | #8fd3ff | highlights, the torch, serif accents on dark |
| steel to silver | #8d959d to #d3d9de | the band, secondary text on dark |
| frost | #eaf3fb | daylight chapters |
| paper | #f6f9fc | daylight surfaces |
| ink text | #0b1626 | text on light |
| mint | #3ddc97 | "online", "documented", the live dot only |

Gradients are light sources, never decoration: radial glows in signal blue and ice behind the subject, a slow aurora
in the booking chapter, the steel band as a linear gradient. Every text pair checked for AA before it ships.

## Type

Geist (variable, 300 to 800) for everything, tight tracking on display sizes (minus 0.045em at 120px). Instrument
Serif italic for the one phrase in each headline that carries the feeling ("Auch wenn gerade niemand hinschaut."),
set in an ice to silver gradient on dark and logo blue on light. Geist Mono for system labels, timestamps and the
example data, the language of his own documentation. All SIL Open Font License, self hosted, licence read in each
font's OFL.txt and METADATA.pb.

## Page grammar

- Chapters, full bleed, edge to edge. No section sits in a card on a grey page. Sections hand over to each other
  through their gradients, never through a border.
- Glass only where a thing is held: the booking form, the documentation window, the floating status chips. Frosted
  (backdrop-filter), with a 1px inner light edge, never a grey hairline box.
- Media full bleed or masked (clip-path), with parallax or a slow push in. Film plays only in view, never under reduced
  motion, a poster otherwise.
- One label system, mono, numbered like his documentation ("01 · Blackbox"). No pills around numbers.
- Big statement type revealed line by line. One idea per screen.
- The header is glass and changes ink with the chapter under it.

## Chapters on the home page

0. Night. The torch over his network, his H drawn in nodes. "Ihre IT läuft. Auch wenn gerade niemand hinschaut."
   Book a first conversation, or call, with the live line.
1. Ink. Full bleed film of an office after hours. The four questions nobody asks while it runs, one per scroll step.
   One Eurostat number, counted up, with its source.
2. Deep. The glass box. A black cube in 3D that turns to glass as you scroll, the network inside lights up, the change
   log writes itself.
3. Deep blue. Four Bausteine as one sticky full bleed film or photo per service, the list beside it. No cards.
4. Navy. The documentation as a real window floating at an angle, flattening as it arrives, live chips around it.
5. Twilight. Hamburg full bleed at blue hour. Reinbek to the city on a glowing map line. "Sie sprechen mit dem, der
   Ihre Systeme betreut."
6. Morning. Three steps on the band, drawn as you scroll.
7. Day. The self check as a dial filling to an example result.
8. Full daylight. The booking, a frosted form over a soft aurora, the FAQ as open lines.
Footer back to night, his name set huge.

## References this is measured against (from the teardown, all rendered 21 Oct)

Apple MacBook Air (film in pinned scenes, sticky local nav), Linear (dark canvas, real UI in the hero), Raycast (light
streaks on black), Resend (a black glass cube, serif display on dark), Framer (glowing prompt as hero object), Mercury
(a light hero then dark product sections), Arc (colour bands), Attio (sticky list driving a swapping visual), deeploi
(scroll scrubbed word reveal), Vanta (big serif quote). None of the 17 Hamburg competitors does any of this.
