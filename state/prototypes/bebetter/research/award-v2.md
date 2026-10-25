# BeBetter v2, the art layer (25 Oct 2026, evening)

Raka on v1, "you can do 100x better in terms using the animations, features, shapes, pictures, graphs, and gradients ...
it doesnt have a WOW factor supperr basic ... make it like something they havent ever seen before. but still simple and
tell the story and GUIDES THE AUDIENCE TO THE INTENDED ACTION", and "feel free to get to the internet to find
inspiration. artsy and out of the box".

## Rendered today, and what each gave (shots in /tmp/claude-0/bb/insp, sources listed on Awwwards Fashion, Sports and
Sites of the Day pages read 25 Oct)

| Site | Seen | Taken |
|---|---|---|
| Nick Ho, Site of the Day 11 Oct 2026 (sport) | A race number set huge over a black and white portrait, stats down the side, giant outline words behind a photo strip | Numbers as heroes, a counter in the corner that means something |
| Igloo Inc | An object drawn from points and lines that turns solid | The teddy built up in visible stages, not faded in |
| Huy Phan Vol.2, Site of the Day 14 Oct | Photos as planes flying in 3D perspective | Their photos hung in space, not in a grid |
| MSCHF | The whole site as a numbered index, terminal type, colour per line | A day counter running through the page |
| Lacoste Ace Breaker, Site of the Day 3 Aug (sport) | The campaign is a game you play | Things you grab and move, the tag you swing, the rail you drag |
| Miu Miu A House That We Shaped, Site of the Day 25 Aug | Spaced capitals as the opening | Type that sets itself |
| OFFF Forum, Signal-A | The wordmark edge to edge, justified type wall to wall | The footer wordmark across the whole width |
| From the earlier pass (refs/REFS.md) | Fitdrop's physics drop, Capitolium's plinths, Pas Normal's people rhythm | Physics as the wow, a hang tag and a rail |

Walled or blank in this browser, not described, Format (403), Cartier (Access Denied), Gentle Monster (403), Justin
Jefferson (did not load), Ascension, Forge and Overworld (stopped at an Enter screen).

## The idea

Everything on the site compounds, "1% better every day", and the engraved teddy is the hero object. The teddy is traced
from their own PNG into five tonal layers, which are exactly a screen printer's colour separations. So the teddy is
printed live, one colour per pull, the same craft the custom kit page sells.

## Home, one year scrolled

1. The print. A black stage, two stage lights sweeping (conic gradients, their EVLS stage), the teddy printed in five
   pulls of a squeegee, dark brown, copper, tan, cream, the blue of his shorts, then a copper foil sheen. The wordmark
   in outline behind him. A DAY counter in the corner starts at 001.
2. The compound. The teddy small at the centre of a radial chart of 365 bars, bar length 1.01 to the power of the day.
   Scroll is the days. The chart grows into a sunburst, the teddy grows 37.8 times and the view flies into the star on
   his belt, which opens into the drop.
3. The drop. A copper ground. A black hang tag on a string, 27.10 and the days to go, that you can grab and swing.
4. The rail. Their photos cut into oversized tee shapes on hangers along a rail, swinging when you drag or scroll, each
   with a tag saying where it was taken.
5. The road. A halftone map of Europe in copper dots, the van driving Rotterdam, Köln, Breda, Praha and on to Gorinchem
   as you scroll, a photo card flipping up at each stop.
6. The door for gyms. The tee on a hanger, the name printed onto it as they type.
7. The footer wordmark edge to edge.

## For gyms

1. The press. Stage light, the tee tilting toward the pointer, the screen frame dropping, the squeegee pulling the ink,
   the frame lifting, a wet sheen crossing the print.
2. Sold out. The light over the rail moves from morning to afternoon across the four hours, tees lifting off with blur,
   a stopwatch, and a rubber stamp SOLD OUT slamming down at the end.
3. Hungary. The message arriving, then 200 tiny tees filling a waffle chart.
4. The kits on a lit stage with reflections, dragged like a carousel.
5. The studio garment turns in 3D for the front, tilts toward the pointer.

Every scene has a still state with no script and under reduced motion, writes classes or CSS variables, and nothing
lazy loads.

## What changed while building it

- The road shows the month of each stop in the corner (APR, MAY, OCT, 4 NOV) instead of a drive time. We have no
  source for how long any drive took, so no hours appear.
- The road's photo cards pile up like polaroids over the North Sea instead of sitting at each stop, because Rotterdam,
  Breda and Gorinchem are too close together on the map for cards to sit beside them.
- The dial turns so the current day sits under a notch at the top, like a watch bezel, instead of a hand sweeping.
- The 1% film is gone. The printed teddy and the dial carry the creed now.
- For gyms, the print pulls by itself 650 ms after typing stops, so "watch it print" on the home page is true.
