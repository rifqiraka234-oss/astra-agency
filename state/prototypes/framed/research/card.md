# Build card, Framed Photobooths, the bookings desk. 3 Nov 2026

Kian Sattarian, owner (KVK 91322820, eenmanszaak, his site "Hoi, ik ben Kian, ik ben Framed begonnen"). ctc_sTr4564J5jSZQthun.
Promise, our 3 Nov opener act_xCEHpyBdP38E5JdWp, "an AI workflow that finds Dutch companies planning a December party or
staff event and drafts your first message to each of them. Shall I send you a sketch of the AI workflow for Framed's
business bookings?" His answer 08.59 UTC, "Yes". Raka, "we can make this so advanced and like let him demo it and also
like let him calculate returns".

## A. The visitor and the action

1. **Who lands.** Kian, alone, on his phone first (he answered on LinkedIn mid morning), later on a laptop. He thinks,
   in order. Is this real or a mock up? Are these real companies, near me, that would actually book a €299 booth? Would
   the messages sound like me, in Dutch? How much work is it for me each week? What does it earn me before December is
   gone? What does it cost and how do we start? Second visitor, Raka on the call, walking him through it. Third, anyone
   Kian forwards it to (a friend who helps at events).
2. **The one action.** Try the desk, then say "set it up". Selector `a[href$="desk/"], a[href$="start/"], .run, .go, a[href="#form"]`.
   First screen carries "Run this week's search" (runs the moment in place) and "Open the desk". Every half screen
   has one of them, phone included.
3. **Flow table**, `research/flow.md`.
4. **The one state.** The strips he approves on the home moment and in the desk are kept (localStorage, try/catch,
   page works without it). They become the "sent" count in the desk, the bookings in his December calendar, and the
   numbers that arrive already filled in on Returns and on the Start form ("12 companies a week, 2 booths, start 10
   Nov").
4b. **Pages and header.** Header on every page, Framed logo left, then Home, Desk, Returns, Start, and the action
   button "Open the desk". Home about 8 screens at 1440. Desk is an app screen with its own tabs (This week,
   Inbox, December, Partners). Returns one long calculator page. Start one screen plus the filled form.

## B. The idea and the feeling

5. **Feeling.** The second the flash goes off at a staff party, everyone crowding the slot for the strip. Night, a
   ring light, a cream print in hand. The hero is his own film framed-2 (a guest in a Santa hat at a December event,
   a strip in her hands), full height, beside the headline.
6. **The one idea, his words.** His homepage asks the visitor "Is de photobooth vrij op jouw datum?". The desk turns it
   round, Framed asks first. Headline "This December, Framed asks first." Every lead the desk finds prints as one of
   his own fotostrips ("Fotostrip in jou stijl", his price card). No other company can use it with the nouns swapped,
   because it is his question, his booth screen ("Strike a pose! De foto wordt gemaakt na de countdown", framed-5) and
   his product.
7. **Their mark as the hero object.** logo.png, the two open rounded brackets around "framed". Traced to SVG at hero
   scale, the brackets draw in round the headline, the same way his homepage frames its photo. The brackets come back
   as the frame on every strip and every desk card.
8. **Signature moment.** "Run this week's search". His booth face (cream body, ring light, lilac screen) counts down
   3, 2, 1 in the screen's own type, the ring light flashes the page white, and a fotostrip prints out of the slot,
   four frames per company. Frame 1 the company, frame 2 why now (the signal, its date, the source), frame 3 the
   first lines of his Dutch message, frame 4 the date stamp he'd offer. Three strips print and fan onto the page, each
   with keep and skip. Measured against Apollo (apollo.io, Season Mix serif with Diatype), Clay (clay.com, Roobert)
   and Attio (attio.com, Inter Display), rendered 3 Nov. None of them prints its leads, all three show tables.
9. **Art in this build.** Yes. Film, the traced brackets, the countdown and flash, the printing strips, a December
   calendar that fills with booked nights, a returns graph you drag.

## C. The look

10. **Type.** Rendered 3 Nov, clay.com Roobert 575, attio.com Inter Display 600 with Inter, apollo.io Season Mix
    (a display serif) with ABC Diatype and Söhne, simplebooth.com Montserrat 900, snappic.com Poppins 700. The two
    photobooth brands are the cheap look RULES names, so we follow the GTM tools. Gloock for the few big lines (his
    own brand face, OFL, fonts/OFL-gloock.txt, like Apollo's serif voice), Mona Sans for all UI and body, Fragment
    Mono for labels and the booth screen. Archivo (his body face) is out per RULES.
11. **Colour script from his material.** Night wine #2A0A10 and his wine #6B131F (his site), ring light white, the
    lilac of his booth screen (framed-5), print cream #F5F2EA and his sand #C9B8A8 for the brackets. The party is dark,
    the flash is white, the print is cream. No indigo, no cream and colour chapters taking turns.
12. **New language.** His site is a centred booking page with cards. Ours is an instrument, a booth that prints, a
    desk of strips, a calendar of nights, no cards.
13. **Media.** All his, from get-framed.com/media, framed-1, 2, 4, 5 (mp4 and poster), logo.png, the ten client logos
    from his homepage. His own business, his own films, used to show his own product. Faces in framed-1 and framed-2
    are his guests as he publishes them, never captioned as anyone. No third party photos.
14. **Tells.** None of RULES 5. Square buttons, no arrows, no pills, no cards with shadows, no count ups, no marquee
    (his logos sit still in one row), no kickers. Checked with check-build.

## D.
15. Beside Saavedra v3 and OneFortyNine. The strips have to make him grin. If they look like a table in a costume, redo.

## Data
- leads.json and partners.json, real organisations, each with a dated public signal and its source opened 2 or 3 Nov
  (research/README.md). Messages are drafts written for this sketch, nothing is sent, the ribbon says so.
- Prices from get-framed.com, €299 per event incl. VAT, travel, setup, unlimited prints, met or zonder begeleiding.
- Returns defaults from research/benchmarks.md, each with its source, every input movable.

## Built 3 Nov, final look

- Home, hero and booth (first look), then the week as one strip with his films, the voice (four companies, his offer underlined as his site says it), December night by night with two sliders, the close with his ten client logos.
- Desk, his film head, then This week (14 companies and 5 venues, keep, edit in Dutch, skip with a reason), Replies (three examples, labelled as examples, book a night), December (his calendar, tap to block), Results (funnel, kept by kind of reason, what skips teach).
- Returns, every input sourced and movable, the chart drags, payback line, his price against five rivals.
- Start, three lanes (Claude, Kian, lemlist), four weeks, the form filled from what he did, copies to LinkedIn, no email address published.
- Line 5 note for the inner pages. Desk, Returns and Start are tools, so the title shares the first screen with his film (28 to 38 percent), check-build warns and passes.
- check-build PASS on all four pages. Copy grep, no colons or dashes in our prose, quotes from sources kept verbatim. NO-AI-SLOP section 8, clean.
- Rechecked 3 Nov, his prices and terms on four of his pages, Djunes and photobooths-huren.nl prices, Belkins 10.5 and 10.9, Instantly 3.43, Expandi 10.4, Robin Radar, Helloprint, UNFC, Sluyter, Hell's Kitchen sources. One claim cut (Robin Radar's growth line, not in its linked source).
