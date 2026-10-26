# Honey It's Handled v3, the art direction (26 Oct 2026, evening)

Brief, research/v3-brief.md. Raka on v2, "it doesn't give me wedding vibes ... it should be magical ... a big picture or a
video as a hero ... It's not exclusive". This file is what the eye gets and why, from what was rendered today. The flow is
research/flow-v3.md.

## What was rendered today, 19.51 to 19.54 UTC (her own site 19.44 to 19.49)

All in Chromium at 1440 by 900, two frames each (load plus 7 s, then five wheel steps), fonts, button radius, video and
canvas count and page height read off the page. Frames and fingerprints in the session scratchpad (honey-v3/award, plan,
house and aw .jsonl, sheets refs/sheet-plan, sheet-house, sheet-aw, sheet-pace).

**Luxury wedding planners, 12 tried, 10 loaded** (lavenderandrose.co.uk and siobhancravenrobins.com refused the tunnel).

| Site | Display face | Text face | Hero | What we take |
|---|---|---|---|---|
| sarahhaywood.com | Meno Banner, 94 px caps | Manrope | Full bleed bride in a library, wordmark centred | The wordmark centred over the photograph, one small line under it |
| joyproctor.com | Cormorant Garamond 400, wide tracked caps | Adobe Garamond | Full bleed film of a tent at sunset | Film carries the hero. Their italic "for" and "with" inside caps is the tell we avoid |
| feteinfrance.com | Ivyora Display 400 caps | Ivyora Text | Full bleed aerial of a ceremony | Thin caps nav, a lot of air, photos at different sizes |
| fetenyc.com | Essonnes Display | Inter 300 | A table photograph | One light display serif with a quiet sans |
| mindyweiss.com | Escrow Banner | Azo Sans | Full bleed couple on stairs | Photography first, no boxes |
| marcyblum.com | Big Caslon | Freight Big | Type only on nude | The restraint |
| colincowie.com | Didot caps | Avenir Light | Film (failed to play headless) | |
| weddingdreamworx.be, blissweddings.be, flowerytales.be | TAN Garland, Dancing Script, Antic Didone | Rubik, Brandon, Open Sans | Photos with cookie walls | Her Flemish rivals. Script headings and rounded buttons read cheaper |

**Couture houses and luxury hotels, 18 tried, 17 loaded** (oetkercollection.com answered 429).

| Site | Display face | Text face | What we take |
|---|---|---|---|
| passalacqua.it | Canela Thin 100, 70 px, sentence case ("Oh beloved places, I have found you.") | Switzer Light | A thin serif at 70 px in sentence case reads more expensive than any caps. Full bleed Lake Como |
| sirenuse.it | Epicene Display 100, 60 px ("A world apart.") | Epicene Text Light | One short line, very thin, a lot of air |
| aman.com | Lyon Display and Lyon Text | Whitney 10 px, tracked | Small tracked sans for labels |
| belmond.com | Sebenta 500 | Gotham | Full bleed film under a centred wordmark |
| chevalblanc.com | ttRamillas 48 px | Neue Montreal | |
| villadeste.com | Narrow Light Italic 69 px | Figtree and Helvetica | Figtree, Elise's own sans, on a five star hotel |
| hotelilpellicano.com | Roller Script | Helvetica Neue | A script used once, for a feeling |
| moniquelhuillier.com | EB Garamond | Graphik | Six films on the home page |
| zuhairmurad.com | Metropolis | | A veil in the wind, full bleed |
| verawang.com, eliesaab.com, galialahav.com, jennypackham.com (Bellefair), pronovias.com, reemacra.com, rosewoodhotels.com, borgoegnazia.com | | | Photography and film carry all the colour, square or flat buttons, nothing rounded |

**Award level wedding sites.** CSS Design Awards' own search for "wedding" (curl, 200) gave the list, thefwa.com's search
didn't render a result list for us (it renders client side, three unrelated cases came back) and Awwwards still refuses us.
Rendered with two candle houses, 10 tried, 8 loaded (weddingtalesantorini.com answered 403, cire-trudon.com reset the
connection).

| Site | Award | What it does | What we take |
|---|---|---|---|
| thewillardsonwedding.com | CSSDA | Jubilee at 280 px, the couple's names set as architecture, rotated, a camellia | The names are the hero of the invitation, huge, in script |
| boutiqueweddings.cz | CSSDA | A full bleed bride, a 120 px serif line running across her | Type over film, set large and calm |
| wedding.s-tmro.com (Yuri and Tomo) | CSSDA | A wedding invitation as a site, the date set big, a photo inside a curved mask, Italianno script | The site is the invitation, and the reply is the action |
| wedding.tonami-komuro.com | CSSDA | Powder blue, a flower, one script word | Powder blue is a wedding colour, not a tech one |
| marieguillaume.com | CSSDA | Names in a 203 px display face | |
| obsesd.dk, duesudue-wedding.com, weddingtalesantorini.com (403) | CSSDA | | Nothing for us |

**What the expensive ones share, measured.** A thin or light high contrast serif, set large and in sentence case
(Passalacqua 70 px at weight 100, Sirenuse 60 px at 100), never bold. A quiet sans small for everything else (Whitney 10
px, Switzer, Manrope, Figtree). Square or flat buttons (the first visible button read 5 px radius or less on 18 of the 23 planner,
couture and hotel pages that had one, several of them cookie or skip buttons, so it's the house style more than a
measured call to action). Full bleed photography or film carrying every colour. Page heights 4,076 to 8,571 px at 1440
wide on 20 of 27, five to nine screens, a lot of air. The cheap
ones use scripts for headings, rounded buttons and Poppins, Jost or Open Sans.

## The type we ship, tested side by side today

Six display serifs were set over a frame of the hero film and as a chapter title on ivory (scratchpad honey-v3/typetest,
t1.jpg and t2.jpg): Cormorant 300, Newsreader 250 at opsz 72, Bellefair, Gilda Display, Bodoni Moda at opsz 96, and
Fraunces at opsz 144. Bodoni lost its hairlines over film, Gilda and Bellefair read dated, Cormorant is the face every
generated wedding site uses. Fraunces at the largest optical size, weight 200 to 300, SOFT 0, WONK 0 is the closest free
face to Canela Thin, the Passalacqua register, and it held over film.

- **Fraunces** (OFL, Undercase Type), variable, opsz 144 for display, weight 220 to 300, sentence case, tracking minus
  0.02em. Never bold, never italic. Display only.
- **Figtree** (OFL, Erik Kennedy), weight 400 and 500. It's the sans Elise's own site already ships (her Wix fonts
  c724d4_3a1deba5 and c724d4_ba67570b, name table read today, "Figtree", OFL), so her own voice carries on. Labels in
  Figtree 500 at 11 to 12 px with 0.14em tracking, never above a heading.
- **Pinyon Script** (OFL), only for the couple's names on the invitation, the one place a script belongs (Willardson,
  Yuri and Tomo). Eight scripts were set side by side, Pinyon read as engraved and stayed legible, Ballet was too ornate
  for a typed name, Great Vibes and Parisienne read as templates.
- **Her wordmark and her HH** stay her own artwork, traced in v1 (build/art/trace.py), never set in a font.

## The idea, from her own words

The page is her invitation. Her launch offer asks "a few special couples to become part of the very first Honey it's
Handled weddings", so the visitor is invited, not sold to. A wedding film opens it, her palette line from 17 June is the
spine ("Something Off-White. Something Blue. Something Red."), one couple's year with her runs through the three, and
the enquiry is the reply card, in all three colours at once, an off white card on her blue, closed with her HH in red wax.

- **Off white is the idea.** The dress, the first idea, the date. A veil the scroll lifts.
- **Blue is the planning behind the scenes.** "I think ahead, so you don't have to." Her 17 tabs as 17 lights at blue
  hour.
- **Red is the day itself.** "The details are mine, the moment is yours." Candles, red petals, the final dance in
  silhouette at dusk.

## The magical moments, five, each from her story

1. **The veil.** A sheer tulle veil hangs over the Off White chapter's film, drawn in WebGL (a fine hexagonal net, soft
   folds that move with a slow wind and the pointer, a scalloped lace hem). Scrolling lifts it from the hem, the centre
   first, the way a veil is lifted, and the dress underneath comes clear. Without WebGL or under reduced motion there's no
   veil and the film or its still shows plain.
2. **Seventeen lights at blue hour.** Her "Usually found with 17 tabs open" as 17 candle lights hanging in the Blue
   chapter's film, breathing, each one a thing her pages say she handles. Her three ways to help are a menu card in her
   blue ink, and choosing one lights the candles she'd hold. Partial planning lets the visitor light the ones they want
   to hand her. Hover or focus a light and its name shows.
3. **Petals that part.** Petals in her red, her powder blue and ivory drift down over the Red chapter and part around the
   pointer or a finger. They start as the candles end, the hand over from blue to red.
4. **Foil names.** The couple types their names on the invitation and they appear in script, in red foil that catches
   the light as the pointer moves.
5. **The wax seal.** Sending presses her HH into red wax across the card's lower edge, with a squash, a little spread of
   wax and a settle. "Consider it handled."

## Colour, shape and motion between the moments

- **Ivory, powder blue, her red.** Ivory paper rgb(246,240,230) and a lighter card ivory rgb(251,247,240), ink
  rgb(42,36,32). Her blue rgb(211,233,238) for grounds and a deep blue ink rgb(29,58,72) for text on it. Her red
  rgb(150,33,34) for the seal, the foil and one or two marks a screen, and a deeper rgb(126,26,28) for small red text.
  Not red and black. Film carries the rest of the colour.
- **Grounds hand over, never a border.** Ivory into blue hour at the end of Off White, blue into the red of the candles.
  A caption on film gets a shade only where its words sit. No dark overlay on any photo.
- **Shape.** Square buttons with a 1 px rule, square photo edges, the deckled invitation card, the round wax seal. No
  rounded cards, no pills, no chips.
- **Motion is slow.** Films play only in view. Easing is long (700 to 1,200 ms), the veil lifts with the scroll, the
  lights breathe on 4 to 7 s cycles. Sound is never on.
- **Grain.** A faint film grain over the films only.

## Media, licence read on each item's own page, each file fetched singly

Films are Mixkit, under the Mixkit Stock Video Free License (each item page's `copyrightNotice` reads "Free" and its
download box says "for commercial or personal use, under the Mixkit Stock Video Free License"; the licence itself, read
on mixkit.co/license, "can be used in your commercial and non-commercial projects, for free ... Attribution is not
required"). Seven of the 70 item pages read today said "Mixkit Restricted License", personal use only, and are out,
including the best veil film (8888, "Bride tosses veil while dressing for wedding"). Stills are Unsplash under the
Unsplash License (each photo page reads "Free to use under the Unsplash License", read between 20.04 and 20.19 UTC, no Unsplash+ item).
Pexels walls us (Cloudflare "Just a moment" on curl, tools/fetch-walled.py on all three fingerprints, and Chromium), so
no Pexels item is used because its own page couldn't be read.

| Where | Item | Licence page |
|---|---|---|
| Hero film, cut 1 | Mixkit 5184, Bride at her wedding holding bouquet | https://mixkit.co/free-stock-video/bride-at-her-wedding-holding-bouquet-5184/ |
| Hero film, cut 2 | Mixkit 5183, Bridesmaid helping to put on a wedding dress | https://mixkit.co/free-stock-video/bridesmaid-helping-to-put-on-a-wedding-dress-5183/ |
| Hero film, cut 3 | Mixkit 5206, A bride's hand on the groom's shoulder at their wedding | https://mixkit.co/free-stock-video/a-brides-hand-on-the-grooms-shoulder-at-their-wedding-5206/ |
| Hero film, cut 4 | Mixkit 5224, Sequence of a decorated wedding table | https://mixkit.co/free-stock-video/sequence-of-a-decorated-wedding-table-5224/ |
| Off White film | Mixkit 5190, Beautiful wedding dress hanging in a white room | https://mixkit.co/free-stock-video/beautiful-wedding-dress-hanging-in-a-white-room-5190/ |
| Blue film | Mixkit 5213, Decorations on the ceiling of a wedding party | https://mixkit.co/free-stock-video/decorations-on-the-ceiling-of-a-wedding-party-5213/ |
| Red film | Mixkit 51655, A romantic dinner table adorned with lit candles, rose petals | https://mixkit.co/free-stock-video/a-romantic-dinner-table-adorned-with-lit-candles-rose-petals-51655/ |
| The final dance | Mixkit 101211, Couple silhouette at colorful sunset | https://mixkit.co/free-stock-video/couple-silhouette-at-colorful-sunset-101211/ |
| Off White stills | Unsplash DTLT9ESXM9s, grayscale photo of beaded lace gown | https://unsplash.com/photos/grayscale-photo-of-beaded-lace-gown-DTLT9ESXM9s |
| | Unsplash HqatjVNJ31A, a white dress with lace | https://unsplash.com/photos/a-white-dress-with-lace-HqatjVNJ31A |

Five of the films (5183 to 5224) come from one shoot, so the hero and the chapters read as one couple's day. Nobody's
face is in any frame we use, hands, lace, flowers, candles and a silhouette only. Every frame was looked at for marks,
5224's menu cards carry a printed monogram, so the hero takes only its first five seconds (a rose, white flowers and candle
light). None of it is captioned or implied as her wedding, her couple or her work. The note bar says the films and the
wedding photos are stand ins, and the handover says she'd replace them with footage from her first couples, which is
what her launch offer collects.

**Her own pictures.** Elise in black and white (42a973_8887369f, /weddings, alt "Honey it's Handled_Elise Laeven") and
sitting (42a973_6059565d, /, the same alt), both zoomed at full size, a plain belt buckle, no marks, no edit needed. Her
wordmark and HH, traced from her own PNGs. On the Events page, her Cinco Cero and Pro League photographs and her Cinco
Cero aftermovie cut, as prepared in v2 (build-v2/media/manifest.json), with the Kaat DM credit. Her /weddings photos
stay out.

## Rules kept (RULES section 5)

No serif headline with an italic second half (no italics in any heading). No kicker over a heading. No pill buttons, no
sliding arrows. No cream and indigo chapters taking turns, the ground runs once, ivory, blue hour, red, then her blue
for the reply. No gradient hero, no glow behind a card, no overlay darkening a photo. No count up numbers. No three
pillars, no four facts with top rules, no rounded soft shadow cards (the invitation is a paper object with a deckled
edge, flagged in the handover), no logo marquee, no illustration scenes, no chips, no floating pill. Seven sections on
the home page.
