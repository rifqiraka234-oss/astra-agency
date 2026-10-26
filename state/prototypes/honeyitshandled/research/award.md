# References rendered 26 Oct 2026, for the Honey It's Handled prototype

Raka, "artsy, push your art limits with the animations, graphs, pictures, features gradients and all". RULES section 5
asks for award level work rendered that day and the fonts of five or more premium sites in her own field.

Two passes in Chromium at 1440 (swiftshader WebGL), three frames each, load, one scroll, two scrolls. Pass one 12.08 to
12.14 UTC, 43 sites, 4.5 s waits. Pass two 12.16 to 12.25 UTC, the 15 WebGL sites again with 11 s waits so loaders could
finish. Frames, fonts and button shapes in the scratchpad (honeyproto/award, refs.json, refs2.json, shots, shots2,
sheetA to sheetE). awwwards.com reset our connection both ways (curl and tools/fetch-walled.py, 502), so the award list
came from thefwa.com's homepage that morning (its three FWA of the Day sites) plus the studios behind recent Awwwards
winners, opened directly. Not reachable or walled, fete-ny.com and lavenderandrose.co.uk (tunnel refused), aesop,
jacquemus and bottega veneta (403), locomotive.ca (bot check), hermes.com (restricted).

## Award level, what each does that we can use

| Site | What it does | Take |
|---|---|---|
| quynh.moe (FWA of the Day, 26 Oct) | A clock drawn as a fan of thin radiating strokes, "12:19" at its centre, on paper white beside a saturated illustration | Time drawn as strokes you can count. Our days are strokes too |
| daikifujita.com (FWA of the Day) | A black stage and one bracketed word, [ENTER], before anything shows | One word as the first act is enough when it's the right word |
| activetheory.net | A glass ring in deep navy with gold dust trailing through the frame | Light with depth, some of it in front of the subject |
| dogstudio.co | Feathers and a wolf sculpted in an aurora of violet and teal, huge serif type over it | Colour as light behind the subject, not a flat fill |
| igloo.inc | Particles assembling a geometric form on cool grey, slowly | A shape that builds itself, one mark at a time |
| resn.co.nz | Shards that gather into a diamond with the words inside it | The mark as a window that holds something |
| obys.agency | A single column of images scrolling between two brackets | One frame, many moments passing through it |
| lusion.co | A loader counting to 100, then soft lit objects in a rounded window | A count that means something can be the arrival |
| ohzi.io | One glowing cube whose colour shifts as you scroll | One object, its colour carrying the chapters |
| makemepulse.com | Lowercase headline staggered over three lines across the page | Lines placed, not stacked |
| rejouice.com | A wordmark set the full width of the screen | Her wordmark can be that big |
| 14islands.com | Two words placed far apart on a grey field | Space between words as composition |
| studiofreight.com | A wall of small frames around one centred line | Many small pictures around one line |
| aristidebenoist.com | Vertical slices of photos side by side on black | A photo cut into slices that open |
| hellomonday.com | Clarendon Light at 80 px on white, one word per screen | Light weight serif, very large, on paper |
| basement.studio, cuberto.com, sennep.com, unseen.co, rejouice | Studio sites, pill buttons and grey cards on several | What not to copy for her, the pill and the card are on the banned list |

## Her own field, premium wedding and event planners, fonts pulled off the page

| Site | Display | Text | Button | What the page does |
|---|---|---|---|---|
| calderclark.com | Ivy Presto Display, weight 300, 54 px | Le Monde Livre 300, Proxima Nova | square, uppercase 12.5 px | Full bleed field of flowers, her monogram over it, press logos in a band |
| marcyblum.com | Freight Big Pro, Big Caslon | | square | One stacked monogram on blush, almost nothing else |
| colincowie.com | Didot | Avenir Light 300 | 4 px | Video hero, caps headline in a thin serif |
| sarahhaywood.com | Meno Banner, 35 px | Manrope 14 px, uppercase tracked labels | | One bride in a full bleed room, then "Orchestrating the exceptional" in light caps on paper |
| rafanellievents.com | Dejanire Headline, weight 300, 88 px | Nunito | 2 px | A light serif headline over a full bleed tent of flowers |
| mindyweiss.com | Escrow Banner | Azo Sans | | A couple tiny against a huge peach wall, the photo carries the colour |
| lisavorce.com | Futura PT 300, tracked | Futura PT | | A tight crop of hands and cocktails, film grain, editorial |
| alisonevents.com | Nixie One 58 px | Clarkson, Europa | | Monogram logo, thin type, video |
| bashplease.com | Domaine (caps), Dawnora | Clarkson, Futura PT | square, 1 px border | Full bleed landscape, thin caps over it |
| jovemeyerevents.com | Minerva Modern, Gopher | Josefin Sans | 300 px pill | Loud colour bars, the one that reads cheapest |
| Luxury houses for paper and objects | Hermès EB Garamond with Manrope and Overpass Mono, Papier Self Modern with Suisse Intl, Diptyque Saint Germain with Apercu Pro | | square on all three | |

What the expensive ones share. A light weight, high contrast serif at display size (Ivy Presto 300, Dejanire 300, Didot,
Freight Big, Meno, Escrow), set large in sentence case or thin caps, with a quiet sans for text (Proxima, Avenir,
Manrope, Futura Light, Azo), square buttons, white or barely warm grounds, and the photograph carrying the colour. The
one that reads cheap (Jove Meyer) uses pill buttons and loud bars. Elise's own site uses Cormorant Garamond, Dancing
Script and Figtree.

## The type we ship, from this

- Noto Serif Display (Google, OFL), one variable family with weight 100 to 900 and width 62.5 to 100%, upright and
  italic. Upright at weight 260 to 320 for headlines, the Ivy Presto and Dejanire register. Italic at width 66 to 70%
  for the date and the big moments only, because at that width it sits closest to the lettering of her own wordmark
  (rendered side by side, research note in art-direction.md). Never an italic second half inside a headline.
- Mona Sans (GitHub, OFL) for text and controls, the Manrope and Proxima role.
- Fragment Mono (OFL) for counts and dates in small labels, the Hermès Overpass Mono role, used sparingly.
- Dancing Script (OFL) only on the card inside her envelope, because her own stickers use it ("You enjoy it. I'll
  handle it.").
- Her wordmark and her HH stay her own artwork, traced from her PNGs, never set in a font.
