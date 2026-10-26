# Honey It's Handled v2, the art direction (26 Oct 2026)

Raka on v1, "i feel like this is a normal CLAUDE website ... be an artist ... shapes, gradients, animations photos,
GRAPHICS, to tell the story, whats the vibe of the brand". The brief is research/v2-brief.md. The flow is
research/flow-v2.md. This file is what the eye gets, where each piece comes from, and what was rendered today to choose it.

## What was rendered today, 15.36 to 15.56 UTC

All in Chromium at 1440 by 900 with swiftshader WebGL, two frames each (load plus 7 s, then a scroll), the fonts, the
button radius, the canvas and video count read off the page. Frames and fingerprints in the session scratchpad
(honey-v2/award, award.jsonl and house.jsonl, sheets sheetA, sheetA1, sheetH, sheetH1).

**Where the award list came from.** awwwards.com reset our connection again (curl reset by peer, tools/fetch-walled.py
502 on all three browser fingerprints, Chromium ERR_CONNECTION_RESET). siteinspire.com sits behind a Vercel security
checkpoint. godly.website now redirects to recent.design. So the list is thefwa.com's homepage rendered today (FWA of the
Day and the cases under it), cssdesignawards.com's winners on its homepage, and recent.design/websites. 34 award sites,
every one 200.

**Award level, what each does that we take.**

| Site | What it does | What we take |
|---|---|---|
| gregorcollienne.com | A name set huge in the middle of an off white page, his photographs scattered round it at different depths, drifting with the pointer | Elise's chapter. Her cut outs scattered round one line, moving at different depths |
| emotion-agency.com | Photos stacked as thin cards in deep perspective, fanned through space | Her 17 tabs fan in depth, not flat |
| belenjones.com | Client names set as huge outlined caps, one solid, over a turning black slab | A number set so big it's architecture (570+, 125) |
| quynh.moe (FWA) | Time drawn as a fan of thin strokes round a clock | Thin rules as the only ornament, data drawn not boxed |
| daikifujita.com (FWA) | One bracketed word on black before anything else | The first screen asks one thing |
| grandecharte.co | A field of white plaster reliefs, lit from one side | Material you want to touch. Her HH as lacquer, not a flat fill |
| becaneparis.com | A manifesto in wide caps, nothing else on white | Wide caps for her own lines, set once |
| infiastudios.com | A dark library room in 3D, a window of evening light | Light coming through a gap tells you a room is behind it (the doors) |
| matteocourquin.com, ellioteriksson.com | Dense mono grids of work | What not to do for her. Grids of boxes read as a tool |
| dream-with-ai.com, halfthesky.app | Cormorant Garamond plus mono | The serif plus italic look Raka called Claude. Not for us |
| postevand.com, fora-concept.com | One grotesk at poster size, photos full bleed | Type as the frame, the photo as the colour |
| metic.studio, redcollar.co, emotion-agency | Pill buttons (999 px, 72 px) | On the banned list, square buttons only |

**Her own field, fashion houses and event producers, fonts pulled off the page.** 26 tried, 23 loaded
(rotate-birger-christensen.com tunnel refused, jacquemus.com and sezane.com 403 or bot check, daniellefrankel.com now
belongs to someone else).

| Site | Face | Button | Note |
|---|---|---|---|
| bureaubetak.com (fashion show producer) | PP Mori, Helvetica | square | A wordmark on white and nothing else until you enter |
| villaeugenie.com (show and event producer, Brussels) | ABC Monument Grotesk | square | White page, a scatter of event photos at different sizes, city names along the foot |
| therow.com | Basic Commercial | 2 px | |
| toteme.com | Toteme Sans 300 | square | |
| khaite.com | Fakt Pro, ITC Galliard for the logo | square | |
| ganni.com | Helvetica Neue for Ganni | square | Playful photos, plain type |
| driesvannoten.com (Antwerp) | Akzidenz Grotesk Pro, Aktiv Grotesk | square | |
| acnestudios.com | Helvetica Now Text | square | |
| ceciliebahnsen.com (couture, bridal adjacent) | Neue Haas Unica | 3 px | |
| self-portrait.com | ABC Diatype, Amazonia for the logo | square | |
| realisationpar.com | Akzidenz Grotesk BQ | square | |
| rouje.com | Diatype | square | |
| stinegoya.com | Akkurat Mono | square | |
| loewe.com | Avus | square | |
| mansurgavriel.com | Supreme LL | | |
| nanushka.com | ABC Arizona Text 200 | square | The one light serif house |
| lemaire.fr | EB Garamond with Brown | square | |
| rimearodaky.com (bridal) | EB Garamond, Cormorant | square | |
| sarahhaywood.com (wedding planner) | Meno Banner, Manrope | | |
| halfpennylondon.com (bridal) | Futura PT, Poppins | square | Reads cheapest of the bridal set |
| galvanlondon.com | Jost | square | Reads cheap |

**What the expensive ones share.** One grotesk for everything (Akzidenz, Helvetica, Unica, Diatype, Monument, Fakt,
Mori), set small and plain, square buttons, the photograph carrying every colour, and the logo as the only display face.
The two that read cheap use Poppins, Futura and Jost. The serif houses are the quiet minority, and a serif headline with an
italic second half is exactly what Raka sent back.

## The type we ship

- **Mona Sans** (GitHub, OFL, already licensed in build/fonts), one variable family, weight 200 to 900, width 75 to 125.
  Headlines weight 520, tracking minus 0.045em, sentence case, the Akzidenz and Diatype register. The huge numbers (570+,
  125, the date, 17) at width 75, weight 760, proportional figures. Her own short lines set once in wide caps (width 125,
  weight 380, tracking 0.02em), the Becane and Monument register. Text 16 to 18 px at weight 420.
- **Fragment Mono** (OFL) for the run sheet, the tabs and photo credits only. Never a kicker over a heading.
- **Her wordmark and her HH stay her own artwork**, traced from her PNGs (build/art/trace.py, v1), never set in a font.
  Noto Serif Display and Dancing Script are gone.

## The idea, from her own words

Her post of 15 Sep 2026 is the story. "You enjoy. We handle. It starts long before the guests arrive. With an idea. And a
lot of little decisions. Every detail considered. Every piece falling into place. So when the doors open... there's
nothing left to do but celebrate." Her brand reveal of 17 June gives the colour script, "Something Off-White. Something
Blue. Something Red.", and the wit, "HONEY because we're the reassuring voice in the chaos. IT'S HANDLED because once
you call us, it genuinely is." and "Type A, so you don't have to be."

So the page is her post, in her three colours. Off white is the idea, blue is the little decisions behind the scenes, red
is the night when the doors open. Two layers all the way down, the calm front (yours) and the controlled chaos behind it
(hers), and the visitor keeps getting to peek behind and then gets put back in the moment.

## Signature moments, each made from her own material

1. **Her HH in living lacquer** (hero, "With an idea"). Her monogram, traced from her own file, poured in her red as a
   glossy liquid on her off white. It pours in from the top on arrival, settles, and ripples like honey under the
   pointer (on phones, under a touch), with her powder blue in its highlights. WebGL, a height field made from the traced
   path in the browser, lit with a fake studio environment in her three colours. The light in it shifts with the path the
   visitor picks. Static, a gradient filled SVG of the same mark.
2. **Behind the curtain** ("Every detail considered"). One of her own photographs of a room set for one of her nights,
   full bleed, and the pointer is a lens. Through it the same room shows as a cyanotype in her blue with her own words
   pinned to it (the atmosphere, the styling, suppliers, logistics, the flow of the evening), and a planner's card with
   the visitor's own date, guests and help on it. A button flips the whole photo to the details and back, which is also
   the phone and keyboard route. On phones the lens travels down the photo as you scroll. Static, a fixed lens.
3. **Seventeen tabs** ("And a lot of little decisions"). "Usually found with 17 tabs open" (her About page) as a real
   planner with 17 paper index tabs on its fore edge, each one a thing her own pages say she handles. It's the control
   for the help. Full planning pulls every tab out in her red, partial planning lets the visitor hand over the tabs they
   choose, day coordination leaves every tab with the couple and pulls out one long red tab, the day itself. The count
   reads "Elise holds 17 of 17". The graph is the planner.
4. **The doors are her HH** ("So when the doors open"). Her monogram is two letters H. As the visitor scrolls, the two
   halves of the HH become two tall lacquer doors that part, light comes through the gap, and her nights are behind them.
5. **Her nights, full bleed, numbers as architecture.** The Handelsbeurs under its iron and glass roof edge to edge with
   570+ set the height of the screen, and Cinco Cero with 125 the same size, the Cinco Cero aftermovie from her page (the dance floor) playing
   inside the figures. The visitor's own number is the third figure, dragged along a line where 125 and 570 are marked.
6. **Elise as stickers** ("Type A, so you don't have to be."). Her own studio photos cut out with a white die cut edge,
   like the stickers she had printed, scattered on her blue round one line, drifting at different depths with the
   pointer, slapped on one by one as they arrive. Her "A little more Elise" lines are die cut stickers too, and they peel
   up at a corner when touched.
7. **The final dance** ("there's nothing left to do but celebrate"). A mirror ball built from facets of her own event
   photos turns above the letter and throws light across her red. The enquiry arrives already written. Sending spins the
   ball up, folds the letter into her red envelope and presses her HH sticker on, "Consider it handled."

## Colour, shape and motion between the moments

- **Colour script, not a palette.** Her off white rgb(249,247,246) for the idea, her blue rgb(211,233,238) and a deeper
  ink of it rgb(32,72,86) for the decisions, her red rgb(150,33,34) and a lacquer shadow rgb(92,14,18) for the night. The
  grounds hand over through gradients, never a border, and only once each, off white into blue, blue into red through
  the doors. Gradients are lacquer, cyanotype and light through a gap, never a purple hero, a glow behind a card or a dark
  overlay on a photo (a caption on a photo gets a shade only where its words sit).
- **Shape.** Her HH, her envelope and her die cut sticker edge are the only shapes. Square buttons and square photo
  edges, no rounded cards, no pills, no chips.
- **Motion that means something.** Pour and ripple (the hero), a lens that follows (behind the curtain), tabs that slide
  and flip (the decisions), doors that part (the night), stickers that slap on and peel (Elise), a ball that turns and
  throws light (the dance), and a letter that folds and seals. No fade only reveals.
- **Grain.** A fine film grain over the photographs only, so her photos and the lacquer don't read as flat screen colour.

## Media

Her photos only, from honeyitshandled.com, the originals her pages serve (static.wixstatic.com/media/<id>), downloaded
26 Oct. build-v2/media/manifest.json has every file's source id, the page it sits on today, its alt text there, the
sha256 of the original and any crop or edit. The film is the Cinco Cero aftermovie on her /cincocero page, never claimed as her own footage. No stock
photos and no stock film, a stock couple would read as her wedding. Her /weddings photos stay out (origin unknown).

Third party check, every photo zoomed at full size. Two found that v1 missed or that are new.
- **The Apple mark on the laptop in "Elise with a book on her head"** (42a973_b81dcffa, /about). v1 shipped it. In v2
  the mark is painted out of our cut out with the lid's own grey, and the handover says so, because it's an edit to her
  photo she should know about.
- **Table cards with a small mark** on the Pro League tables (42a973_9b1433cd, ec5dab30). Left out. The Handelsbeurs hall
  keeps v1's crop to the top 65.5%, clear of the sponsor wall.

## Rules kept

No serif headline with an italic second half, no kicker over a heading, no pill buttons or sliding arrows, no cream and
indigo turns, no count up numbers with a source line under each, no three pillars, no rounded soft shadow cards, no logo
marquee, no cute illustration scenes, no chips, no floating pill. One texture under every section is the v1 tell, so each
chapter has its own material (lacquer, cyanotype, paper tabs, die cut vinyl, night photographs, mirror light). Every
scene has a still state for reduced motion and a complete page without script.
