# Draft, 2026-10-13. Chris Hale, The Garnish Collective, the sketch delivery. NOT SENT, waiting on Raka's word.

Thread pulled 2026-10-13 ~06:35 UTC, 3 items, nextPage null. Newest is ours, 05:46 UTC, "I'm putting the sketch together
now and I'll send it over in the next day or two." He hasn't answered "How's the corporate side going for you?" yet.
What he said yes to, 12 Oct 21:28 UTC, was "a sketch of the Garnish corporate ordering site", set menus for boxes and
buffets, order and pay online, and one tap reorders for regulars.

The site, https://astra-garnish-prototype.netlify.app , deploy 6acdcec9e1da4a850486f9ba, files in
`state/prototypes/garnish/`, the builder's notes in `state/prototypes/garnish/notes.md`.

Checked again in this session, separately from the builder, 2026-10-13 06:25 to 06:35 UTC.
- Live HTML 200, title "Corporate ordering | The Garnish Collective", sha256 98eb9eeb...d1007 identical to the local
  file. All 20 asset files fetched live and byte matched.
- Cold load in Chromium at 1440 and 390, 0 page errors, 0 console errors, 0 failed requests, 0 horizontal overflow,
  14 of 14 images decoded. Every screen at both widths screenshotted and looked at.
- Rendered live text, 252 lines, 0 colons, 0 dashes outside URLs and emails, the only exclamation mark is inside the
  Evri quote, no banned words, no country but the UK.
- Facts reopened at the source.
  - Evri quote, word for word, https://www.garnishcollective.com/about-1 .
  - "MasterChef UK quarter finalist", his own homepage says "former MasterChef UK quarter-finalist".
  - Hodroyd Hall, his corporate page says "Venue partnership at Hodroyd Hall, or delivered at location of your choice".
  - "Nothing is forced, except the Rhubarb", composting, air miles, local suppliers, "our own allotment and beehives",
    all on https://www.garnishcollective.com/about-1-1 , fetched 200.
  - ONS 28%, 45%, 27% and 3%, all in "Who are the hybrid workers?", ONS 11 November 2024, fetched 200.
  - Christmas prices, his brochure PDF "Corporate Christmas Packages" (Canva, 22 Sep 2026, 10 pages), from £18pp
    grazing table p3, from £12pp hot sandwich menu p4, desserts £8pp p4. Read from the PDF the builder pulled off his
    LinkedIn document post. The LinkedIn post itself is walled from here.

## Chris Hale, The Garnish Collective. ctc_do7oK8f27qGMC89dA

DELIVERY
```
Chris, here's the sketch.

It's the corporate ordering site, and it all works. Pick a box or buffet menu, set the headcount and dietary needs, choose a date, then pay or put it on account. Regulars reorder their usual in one tap.

Try it yourself.
https://astra-garnish-prototype.netlify.app

Your Christmas packages are in there too, with the prices from your brochure. The prices marked example are yours to set.

What do you think?
```

Notes for Raka.
- **I didn't open with "I spent the whole day building this."** It wouldn't be true, the build took under an hour.
  "Here's the sketch" picks up the word we used with him. Put your line back if you'd rather.
- **His own brochure says "No boxes. No set menus. Just Christmas, your way."** So the message never says "set menus",
  and on the site every menu is a starting point the customer can change in the notes. Canapés and the three course
  dinner go to "Ask Chris" for a price.
- **What's made up, all labelled on the page.** Every box and buffet price (£9.50 to £27 a head), the minimums, the
  2pm cut off and lead times, the delivery area and charges (free from £150, £12 otherwise), 30 day invoice terms,
  and the demo account "Your Company Ltd" with three saved orders and invoices. Payment is a demo, no card fields,
  nothing charged.
- **His real numbers on it.** Christmas hot sandwiches from £12 a head, desserts £8, grazing table from £18, cited to
  the brochure.
- **Photos.** All 12 are his own, from his site and LinkedIn, byte matched. The builder left out every photo showing
  other brands (Netflix, Nivea, Johnnie Walker and more) and anything that might be another caterer's work.
- Two things in his brochure he may want to know about, not for the message. The dinner reads "From E45pp", with an E
  where the £ should be. Canapés read "£per canape", with no figure. Neither is shown on the site.
