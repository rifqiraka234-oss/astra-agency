# The flow, as built. Charlie's Desserts prototype

29 Oct 2026. The flow table from the brief (section 9), refined in the card (line 3) and now as it stands in the
final build. One order object is carried down the whole page (`js/state.js`), so nothing is typed twice. The order
bar is on every screen, and the walk check (qa/check.js) confirms an order action that a tap can reach at every
half screen at 390 and 1440.

| # | Chapter | The visitor's question | What they see and do | The moment that answers it | Medium |
|---|---|---|---|---|---|
| 1 | The hat (`#open`) | "Is this the place?" | Their shop at dusk under their striped awning and festoon bulbs. "What are you making?", their own line "Everything on our menu is available for your own creation from £5" and the six bases with their prices | The shutter with their sign on it rolls up, the bulbs light one by one, their top hat drops onto the counter, flips over like a magician's hat and the dessert they pick rises out of it in a swirl of sweets. Scroll and the hat tips its opening to you, you fall in, and their lilac drips flood down | Real time 3D (three.js in a worker), their photos as cut outs |
| 2 | Make it (`#make`) | "Can I have it my way?" | Their dessert big in their lilac menu world under the menu's own drips, a giant word behind it. Base, twelve sauces, nineteen toppings, a scoop, how many, each at its menu price | **The pour.** A sauce floods the menu drips at the top and a stream falls and drizzles across the waffle (or coats the shake and runs down it), glossy, in its real colour. Toppings rain down in 3D, bounce and settle. Each landing prints a line on the ticket and ticks the bar's price | WebGL pour shader, 3D toppings with physics |
| 3 | Favourites (`#favourites`) | "What do people get?" | Six of their named favourites with their photos in arch, awning scallop and drip frames, at menu price | "Make it yours" lands the favourite in the builder already dressed, its sauces pouring and its toppings raining. Its menu price holds, extras go on top, removing something never lowers it | Their photos, a pinned sideways reel on desktop |
| 4 | The whole menu (`#menu`) | "What else is there?" | Every item and price on their menu as text, in their own groups, with their photos in their shapes. A hat beside anything that opens in the builder | Their drips run down as the menu arrives. Tap a row and it opens in the builder or goes on the order. The pick and mix wall is their own macro of fizzy sweets, and it parts round your finger | Type, their photos, a WebGL photo that parts |
| 5 | The roll call (`#roll`) | "Is it all really this good?" | Waffles, Shakes, Cookie dough, Sundaes, Frozen yoghurt, Pick & mix, then their logo, "Every one of them, straight from Charlie’s" | Their lilac menu pours into it, then hard cuts on their own colours as you scroll, each dessert bursting through its word in giant type, ending on their logo on the evening purple the order chapter opens on | Type and cut outs, scroll driven |
| 6 | The order (`#order`) | "Can I get it now?" | Shop, collect or delivery, a time inside opening hours in UK time, name and phone, already holding the whole creation | The golden ticket in real foil that tilts with the cursor or the phone, their creation drawn on it, prints and gets stamped "Ordered". No Uber anywhere | The ticket, CSS foil |
| 7 | Birthdays and celebrations (`#party`) | "Can we book for the party?" | A giant number to drag, 1 to 10 or more, the shop, the occasion, a day, a time in UK time, a name and a phone | A chair pops in round their striped table for each guest, and the booking ends on a golden table ticket stamped "Confirmed" | A drawn table, the ticket |
| 8 | Two shops (`#shops`) | "Where are you?" | Brighouse (open every day, 12 to 10, FSA 5) and Huddersfield (hours to confirm, frozen yoghurt, FSA 4), each with Order and Book | Their two shopfronts in their stripes, the awnings swinging down | Drawn shopfronts |
| 9 | Foot | "Anything else?" | Hours, addresses, socials, the FSA links, the prototype note | The order bar is still there | Type |

## The one state

```
order   = { shop, mode, base, size, preset, sauces[], toppings[], extras[], qty, creation, items[], time, address, name, phone, total }
booking = { shop, partySize, date, time, occasion, name, phone }
```
Every control writes it and every display reads it, the hero's bases, the builder, the favourites, the menu rows, the
ticket, the bar, the golden ticket and the order form. Menu items that aren't built (a sharer, a hot drink, The
Ultimate Box) go in `items[]` beside the creation, so visitor 3's order works the same way.
