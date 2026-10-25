# BeBetter, art direction (25 Oct 2026)

Written after four-lines.md and flow.md and before any CSS. It follows RULES section 5 (no Claude look, simple is
not plain), Raka's feedback collected from the other sessions on 25 Oct (people and emotion like Nike and adidas, not an
e-commerce grid, phone first, say what the business is on landing, the world of the lead and not SaaS), and their own
material.

## The idea, from their own work

Their custom kits all speak one grammar (Team Siem, Bookaleap, American Gym Antwerp, Human Sports, 29 Jun 2026 post).
A washed tee seen from the back, the name across the shoulders, an emblem, a motto, EST and a year. So the custom kit
page IS that back, full screen, and the visitor's gym is printed on it as they type. Every control after it changes the
same garment. Their creed, "1% better every day … small daily improvements compound" (16 Mar 2026), is the home page's
quiet second idea.

## Signature moments, each one from their story

1. **Your name printed on the back.** The hero of For gyms. Typing the gym's name pulls the print across the shoulders,
   a squeegee sweep revealing the ink. Each change of colour or style is pulled again.
2. **The rail that empties in four hours.** Their first gym story, "Within minutes, they started selling. Four hours
   later… Everything was sold out." A rail of tees and a clock. As you scroll the hand runs four hours and the tees come
   off one by one. No photo is paired with it, because the gym isn't named.
3. **The size run fills a rail.** The bars are the control, and every piece hangs on a rail like the rails on their stand.
4. **The work order, stamped and bagged.** On sending, the sheet is stamped RECEIVED and drops into a black BeBetter bag,
   the bag from their stand photo.
5. **The tour back.** The home page's road section is a tour tee back print. Köln, Breda, Praha and the next stop, with
   their photo at each stop and "about 9 hours" in their words.
6. **The compounding curve.** 1.01 to the power of the days, a curve you drag, their creed made into something to play
   with. 365 days of 1% is 37.8 times (1.01^365 = 37.78).

## Type

- Libre Caslon Display 400 for headlines, the closest open licence face to their serif wordmark. Never italic.
- Archivo 400 to 700 for body and controls.
- IBM Plex Mono for garment labels, the work order and the tour dates only. No mono kickers above sections.
- Print faces taken from their kits. Anton for block (Team Siem, Bookaleap), Graduate for college, Pirata One for gothic
  (American Gym Antwerp, Human Sports). All SIL OFL 1.1, licences in build/fonts.

## Colour

Dark first, the colours of their garments and stand. Ink #0d0d0c, washed black #1e1d1b, stand grey #2b2a28, bone
#ece7dd, teddy tan #c08a52 as the whisper (a deeper #8a5a2c for text on light grounds). Royal and red exist only as print
colours on the garment, from Bookaleap and American Gym. No indigo anywhere in the UI.

## The gradients, reinvented

The stone wash is the gradient. An SVG turbulence wash on every garment, art directed per colour, and soft drape shading
painted into the cloth. Their arena photo's stage light carries the home hero. No glow behind anything, no overlay on a
photo.

## Shape and buttons

Square corners everywhere. Buttons are 56 px tall rectangles in bone on dark or ink on light, Archivo 600, no arrows, no
pills. Choices are garment swatches and real labels, never chips. No cards, no shadows, chapters run edge to edge.

## Photography

Every photo is theirs. Third party check on each one. Photo 19 carries a photographer's watermark and photo 28 carries
gym sponsor banners, so 19 isn't used and 28 is cropped to the shirt. No person is named or captioned as a customer,
member, founder or staff. The four kit photos are shown as their work, as their own post shows them.

## Motion

Every scene writes classes or CSS variables and has a still state with no script and under reduced motion. Nothing
lazy loads, because Laurens will most likely open it on his phone.
