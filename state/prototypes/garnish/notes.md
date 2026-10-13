# The Garnish Collective, corporate ordering site, v2. Build notes, 2026-10-13

Lead. Chris Hale (Christopher Colin Hale), founder and head chef, The Garnish Collective, sole director of
THE GARNISH COLLECTIVE LTD 16179771. lemlist ctc_do7oK8f27qGMC89dA. He said "Sure Raka, would be interested in
seeing your take!" on 12 Oct 21:28 UTC to the SKETCH opener (corporate ordering site, set menus for boxes and
buffets, order and pay online, one tap reorders for regulars like Evri).

NOT SENT. Nothing was sent to anyone, no lemlist write, no commit. The lead session commits and Raka sends.
v1 (deploy 6acdcec9e1da4a850486f9ba, index sha256 98eb9eeb...1007) is in git, this folder now holds v2.

## Live

- URL https://astra-garnish-prototype.netlify.app (same site as v1, site id fe9f6751-04d5-48cd-8812-62f86b44c320,
  team 6a75917309221b32b3265992)
- Deploy id **6acdf7abad1ad241ec2a099f** (host heading wording), state ready, published 2026-10-13 09:19 UTC, current
  deploy. Permalink https://6acdf7abad1ad241ec2a099f--astra-garnish-prototype.netlify.app .
  Earlier v2 deploys, 6acded528fd7878b63c3ed39 (08:35), 6acdee06d36c44e0c4659161 (08:39, alt text fix),
  6acdf5bbb52ac933c470a0e3 (09:11, final round).
- Access controls read back from get-project after the deploy, requiresSSOTeamLogin false, requiresPassword false.
- sha256 index.html **f059d086569188c868e17007bf4448f2972403ab5ba3ca3078ef0d6c2a7146d6** (106,438 bytes)
- Deployed from a clean folder holding only index.html, img/, fonts/ and netlify.toml (publish ".", no command).

## The reanalysis (agreed with Raka before the rebuild)

v1 worked but read like a SaaS checkout. A sticky "Ticket £162.00" pill, a monospace receipt following you down the
page, a four item feature strip, an invoices table, a demo dashboard and EXAMPLE tags on nearly every line. Its story
was office logistics (an ONS hybrid working chart), so Chris, his food and the feeling of the occasion came second,
when his own site leads with "a luxury events and catering company", "led by MasterChef finalist Chris Hale" who has
cooked "for royalty, world-class athletes, and A-list celebrities". The order was a long form in five blocks, and the
look was flat green, Poppins, Cormorant and DM Mono in a generic layout.

v2 keeps the goal (an office manager or EA orders chef made catering online, and a regular reorders in one tap) and
earns it differently. The page is an invitation from Chris's kitchen, read top to bottom like an evening, and the
order is the reply card. Dropped from v1, the ONS chart and all stats, the feature strip, the sticky cart, the
receipt, the invoices table, the dashboard, Poppins and DM Mono, the tag soup. Kept, v1's working date, lead time,
minimum and postcode logic, rewritten under a reply card, and v1's verified facts, dishes and images.

## The flow, one line per section (as first shipped, see the final round section for the current order)

1. **The invitation.** His plated food full bleed in a stepped gold frame, his wordmark under a sunburst, "Chef made
   catering for the office, ordered online.", one button to the menus, a live cut off line, a green wax seal with his
   TGC monogram pressing in at the frame's foot.
2. **The host.** Chris Hale, founder, head chef and MasterChef UK quarter finalist, his own claims (royalty, world
   class athletes, A list celebrities), an arched photo of his plated desserts and a tilted calling card.
3. **The larder.** "Nothing is forced, except the Rhubarb." in gold, his sustainability commitment as six drawn
   items (allotment, beehives, local suppliers, composting, pickling and his carrot top pesto, nose to tail), two
   framed photos of his food.
4. **The bill of fare.** Three printed menu cards (Bags & Boxes, Buffets, a wide Christmas 2026 card) with dotted
   leaders to the price, his dishes in plain type and example contents in italics, his "No boxes. No set menus. Just
   Christmas, your way." as the frame for every menu being a starting point.
5. **The reply card.** Three steps (I Choose a card, II Reply, III Seal it). One card that reads as a sentence,
   "Please prepare the [menu] for [12] guests, on [date], delivered by [time]. Of them [V, VE, GF, DF]. Bring it to
   [company, street, town postcode]. Yours, [name], and kindly reply to [email]." The bill sits on the card. Settle it
   by card or on account with an optional PO, then "Seal and send" stamps the seal and opens the confirmation.
6. **The usual.** One calling card ("Your usual", the demo account or the visitor's own kept order), one button,
   "Send it again for Thursday 15 October", and "Change it first".
7. **Said of us.** The Evri words, verbatim, as a pinked edged press clipping, name and role as on his About page.
8. **Grander occasions.** Canapés, Installed Edible Displays, Tailored Event Service, Bar Hire in arched frames,
   each to his enquiry form, the Christmas canapé party and three course dinner as priced to order, and a "Write to
   Chris" card with his phone, email and the 24 hour reply from his own enquiry page.
9. **The close.** A gold sunburst with his monogram as a medallion, "with compliments", his own line "Because good
   food has a way of bringing people together.", his contacts, wordmark, and the concept line with the footnote.

## The signature scene

A banquet table seen from above in gold line art sits beside the reply card and is driven by it. Every guest gets a
place setting that draws itself in (a ribboned box for box menus, plate, cutlery and glass for buffets, crackers and a
candle garland at Christmas), dietary needs appear as paper place cards (V, VE, GF, DF) at the right seats, and the
table lengthens and splits into more tables as the headcount rises (up to four tables, then "and N more places").

## Teardown, 2026-10-13 07:35 to 08:05 UTC (RULES section 5)

Method. 95 URLs queued in two passes, 89 distinct sites (five pass two entries were corrected URLs for pass one sites, and partyingredients.co.uk redirects to Searcys). Each site rendered in Chromium (proxy CA pinned) at 1440 and 390, fold plus four
frames down the scroll, with a runtime fingerprint (words, images, videos, SVGs, WebGL, sticky elements, running
animations, style mutations while scrolling, libraries, loaded fonts, CTA labels). Any site that walled or failed was
re-run with every request served through a local curl_cffi fetcher (real Chrome TLS fingerprint). A second pass
removed cookie, country and newsletter overlays. All contact sheets were looked at, then re-looked at in seven review
sheets before writing the lines below. Scripts, JSON and shots are in the session scratch, v2/td/.

**63 of 89 sites rendered and looked at, 26 not.** Fingerprint, then what it teaches this build.

Caterers, UK and abroad
1. Social Pantry (socialpantry.co.uk). EB Garamond and futura, 38 images, 12,079px long. "London's leading independent,
   female founded and sustainable catering company" leads, the values are the hero. Desktop CSS failed through our
   fetcher, phone render used.
2. Create (createfood.co.uk). Alegreya Sans, sage green blocks, a rotating "Since 1993" roundel stamped on the hero
   food shot. The stamp as brand moment.
3. The Admirable Crichton (admirable-crichton.co.uk). Swiper carousel of plated food, black and orange blocks, "Request
   a Quote". Busy, no single idea per screen.
4. Dine (dine.co.uk, Leeds). Yorkshire's luxury caterer. Blue glass dessert hero, venue carousel, Muli. Generic
   WordPress grammar under good food photography.
5. By Word of Mouth (bywordofmouth.co.uk). Dala Floda serif, a bw/m monogram roundel over the hero film, B Corp badge.
   Monogram over food works.
6. Moving Venue (movingvenue.com). Black, Made Mirage display type huge and centred, "London's most experienced
   caterer for over 40 years and counting". Typography only hero.
7. AP&Co, Alison Price (alisonprice.co.uk). Rose header, "STYLE. TASTE. LUXURY." over one plated dish full bleed,
   Cormorant Garamond. One plate full bleed is the strongest food hero in the set.
8. Ampersand Events (ampersandevents.co.uk). Script logo, collage of plated food, 118 words. Thin.
9. Searcys (searcys.co.uk, partyingredients.co.uk redirects here). Spaced caps wordmark, Christmas banqueting hall
   hero, "Christmas is coming". Seasonal story first.
10. Dish (foodbydish.com). "food by dish" lowercase over a hazy chef shot, Cormorant, 84 words. Mood over menu.
11. Pinch Food Design (pinchfooddesign.com, New York). A mobile of drawn coloured shapes, WebGL, IBM Plex Mono. Art
    direction as illustration, not photography.
12. Peter Callahan (petercallahan.com, New York). Pink, a red monogram, "The Art of Exceptional Entertaining", canapés
    in red cups shot from above in rows. Symmetry and repetition of food.
13. Lenôtre (lenotre.com, Paris). Pâtisserie hero, products with prices and basket buttons. Shop grammar.
14. Jimmy Garcia Catering (jimmygarciacatering.com). Garamond Premier and a handwritten script for headings, venue
    photos, "Seasonal Menus" in the nav. Script used as a flourish only.
15. Rocket (rocketfood.com). Film hero (H.264, not playable in our Chromium), "London's leading luxury caterer",
    four image cards. Case studies of venues.

Hospitality and food houses
16. The Ritz (theritzlondon.com). 16 videos, Old Style MT, "Two Michelin Star Dining", centred serif caps. Restraint.
17. Claridge's (maybourne.com). Sang Bleu serif, "Centuries of Enduring Artistry", one booking button, Art Deco
    interiors photographed.
18. The Savoy (thesavoylondon.com). GSAP, ScrollTrigger and Lenis, 24,290 style mutations while scrolling, 9 videos,
    "Feel the glamour of it all". Motion led, a booking bar glued to the viewport.
19. Fortnum & Mason (fortnumandmason.com). Two coats of arms either side of the wordmark, teal and pink, hampers in
    scenes. Heritage as ornament.
20. Bettys (bettys.co.uk). 169 images, Advent calendar hero, "Next day delivery" and "Handcrafted in our Harrogate Craft
    Bakery since 1919" in a strip. The Yorkshire heritage line done quietly.
21. The Wolseley (thewolseley.com). Victor Serif, "Where everyone has a story to tell", centred tracked caps, dark
    candlelit photography. The closest tonal reference.
22. sketch (sketch.london). WebGL floating patterned shapes on pink, 48 words. Art first, information later.
23. Dishoom (dishoom.com). A centred quotation on near black, Cheltenham and Gill Sans, "View menus" and "Book a table".
    Story by quote.
24. Hawksmoor (thehawksmoor.com). URW Classico caps, gold buttons, 2,052 words, steak and Sunday roast photography.
25. Bob Bob Ricard (bobbobricard.com). A huge Art Deco BBR monogram over the dining room, pink and blue. The single
    best Gatsby move in the set, the monogram as architecture.
26. Brasserie Zédel (brasseriezedel.com). Arapey and a cursive, Art Deco menu cards stacked as objects, "Menus" as a
    stamp. Menus as printed cards.
27. The Beaumont (thebeaumont.com). GSAP and ScrollTrigger, Siena serif, black hero, cocktail and plate photography.
28. The Ivy Collection (ivycollection.com). Bodoni Seventy Two, a booking widget over the hero, a newsletter modal.
29. The Connaught (maybourne.com). Felix Titling, "A place of rare belonging", a legacy section, shop section.
30. Grantley Hall (grantleyhall.co.uk, North Yorkshire). A GH 1680 crest centred on white, gold book button, 75
    images, wedding and rooms stories. The crest as hero.
31. L'Enclume (lenclume.co.uk). Black film panel, Simon Rogan photographed, "connected to our farm". Farm to plate
    story, close to his larder.
32. The Fat Duck (thefatduck.co.uk). GSAP, a drawn "Fable Tree" Christmas menu as an illustrated card with the story
    beside it, Cormorant. A menu as an artwork.
33. Eleven Madison Park (elevenmadisonpark.com). One plate on white, a laurel mark, 62 words, "Book on Resy".
34. noma (noma.dk). Reckless serif, dark green, "Copenhagen 2026", produce photographed as still life.
35. Ruinart (ruinart.com). Saol, cream and gold, bottles in a row. Champagne palette.
36. Nightjar (barnightjar.com). Poiret One, a speakeasy badge, dark red, "Book your table". Deco type done cheaply.
37. Mr Fogg's (mr-foggs.com). Victorian ornament, red and cream, 222 SVGs, a "Now Open" cart illustration. Theatre.
38. Death & Co (deathandcompany.com). Diplomata SC with a drawn cocktail glass emblem over each photograph. Emblem as
    a constant.
39. The Star Inn at Harome (thestaratharome.co.uk, North Yorkshire). Michelin and Yorkshire awards as badges, thatched
    inn, "Our Menus" as three framed cards. Yorkshire luxury, menus as cards.
40. Gleneagles (gleneagles.com). Portrait serif, a framed green "Eat & Drink" card with stepped corners. Stepped frame.
41. Rosewood London (rosewoodhotels.com). Engravers Gothic caps, cream, gilded detail photography.
42. Hotel Café Royal (hotelcaferoyal.com). 23 videos, "Two of the world's most renowned chefs" with portraits.
43. Moët & Chandon (moet.com). GSAP, a soft focus bottle hero, red wordmark, "Live a moment suspended in time".
44. Maxim's de Paris (maxims-de-paris.com). Condensed caps over Belle Époque photos, "Les prestations traiteur" with a
    drawn mascot. The caterer arm of a legend.

Storytelling, invitation and luxury brands
45. Trudon (trudon.com). EB Garamond and a crest, candles as objects in dark rooms. Product as still life.
46. Paperless Post (paperlesspost.com). 126 running animations, RSVP chips on an invitation card. The reply mechanic.
47. Minted (minted.com). Wedding invitations as a grid of real cards with style roundels. Discount modal on scroll.
48. Crane (crane.com). "Perfection in Stationery Since 1801", hands engraving a plate, "Luxurious Printing Processes".
    Engraving as craft proof.
49. Floris (florislondon.com). Caslon, "British family perfumers since 1730", bottles on rich red.
50. Ralph Lauren (ralphlauren.co.uk). Spaced caps over film stills, "Fall/Holiday 2026". Spaced caps lockup.
51. Tiffany (tiffany.co.uk). Blue, Sterling serif, Elsa Peretti heart. Colour as brand.
52. Bridgerton on Netflix Tudum. Wisteria and lilac, an Empire line dress from behind, episodes as cards. The Regency
    look the brief cites.
53. Cartier (cartier.com). Film tiles, Brilliant Cut serif, panther tales. Story through film.
54. Assouline (assouline.com). Didot caps, books as objects, "Celebrating the art of refined living".
55. Le Petit Chef (lepetitchef.com). Projection mapped dinner, Playfair, locations as cards. Table as theatre.

Corporate ordering, for what their flow does well (v1's teardown, rerun today)
56. ezCater. Address and category chips first, rails of food. Speed of start.
57. CaterCow. "Reliable, on time corporate catering", address search, reviews beside the hero.
58. PAUL UK catering. Card grid with "Serves 6 to 10", price and basket per card, "Order by 12pm for next day".
59. itsu Leeds. The rule in one sentence, order by 6pm for next day, minimum £60.
60. Wenzel's. "Order before 3pm today for tomorrow's lunch" in the hero.
61. Feedr sandwich platters. One page per category, three step how it works, client logos.
62. Ottolenghi catering. Chef led and editorial, photography first, packages, an FAQ on notice and dietary needs.
63. GAIL's. "Order by 11am for delivery on Thursday" in the top strip, seasonal story first.

**Not counted, and why.** Rhubarb (rhubarb.net reset on https and 503 on plain http, the proxy reached it, the site
didn't answer). Bubble Food (blank render both paths). Lettice (lettice.co.uk is for sale, letticeevents.co.uk behind
Cloudflare). Mustard, Vacherin and Chester Boyd (parked domains). Harrogate Food & Drink and the first Jimmy Garcia and
Rocket guesses (no DNS, corrected URLs then rendered). Eden Caterers, Olivier Cheng and Potel et Chabot (502 on both
paths). The Man Behind the Curtain (domain now serves an unrelated casino page). Hodroyd Hall (502). Aesop, Perrier
Jouët, the Met Opera Gatsby page, Hermès, Dior (bot walls on every path). Awwwards (502). Annabel's, Penhaligon's and
Pierre Hermé desktop (blank renders). Smythson, Papier, Black Swan at Oldstead, Ladurée and Diptyque (modals covered
the page on both passes). None of these is evidence about the site, only that we couldn't look.

**What the teardown decided.** Copy the monogram as architecture (Bob Bob Ricard), the stamp as the brand moment
(Create, Death & Co), centred spaced caps (The Wolseley, Ralph Lauren), menus as printed cards (Zédel, The Star at
Harome, The Fat Duck), food shot from above in rows (Peter Callahan, his own brochure), one plate full bleed (Alison
Price), the heritage line said quietly (Bettys, Crane), and the reply mechanic people know (Paperless Post). From the
ordering leaders keep only the rules (cut off, minimum, serves) written as sentences. Refuse address box heroes,
marketplace grids, basket tiles, sticky totals, booking bars glued to the viewport, modals and carousels.

**Bench render (addition 44), against Alison Price and Create at 1440.** Thinnest, Create (one idea per screen but
little material and a cookie bar over every frame). Most material on screen, ours (a full menu, a working order and
a scene in the space where they show one photo and a paragraph). Template pick, none of the three, ours least of all,
because its concept names its own furniture. Two honest weaknesses found and fixed, our hero photo was darker than
Alison Price's (the overlay was lifted at the edges) and the reply scene opened on an empty table (it now opens on a
lunch box for 12, the hero's own example, so the table is laid on arrival).

## Art direction note (written after the teardown, before any page code, unchanged)

**The idea.** The page is an evening invitation from Chris's kitchen. It opens like a card arriving under a wax seal,
introduces the host, shows what's in the larder, lays the bill of fare on the table, and the order is the reply card
you send back. Regulars get a calling card. Great Gatsby gives the structure (symmetry, gold line, fans, stepped
frames, deep green and near black). Bridgerton gives the paper (cream laid stock, engraved caps, a wax seal, a little
copperplate script). The food is his, photographed like a feast.

**Palette, his colours, decided not defaulted.** Night green #00241A (his LinkedIn tiles) and #001A13 for the dark
chapters. Brochure paper #EDE3D9 for the light chapters, his site cream for cards (#F7F2EA used for the card stock).
His brochure ink #425852 for body on paper (6.0 to 1), logo ink #042015 for headings (13.6 to 1). Gold as foil,
never yellow. #C9A86A for line and type on green (7.3 to 1), #E8D5A6 highlights (11.4 to 1), #9C7A43 hairlines on
paper (decorative only), #7A5C2B for gold text on paper (4.9 to 1). Errors #8A2A1B (6.8 to 1). Saturation comes from
his food photography, the frame stays two tone, as his brochure does. Rhythm alternates dark and light, nine chapters.

**Type.** Cormorant Garamond (his brochure face) for body, menus and italic headlines. Italiana (OFL) as the Art Deco
display face in tracked capitals. Cormorant SC 600 for engraved labels, buttons and place cards. Pinyon Script (OFL)
for four flourishes only ("with compliments" twice, "The favour of a reply", "Your usual"). Self hosted latin subsets.
No sans, no monospace. Digits inside Italiana headings are set in Cormorant (Italiana's old style 2 and 4 read oddly).

**Motifs, gold line in SVG.** A sunburst fan crowning the hero and every chapter, stepped deco corners on every
frame and table, arched frames for photographs, his brochure's four point sparkle, a green wax seal with his TGC
monogram embossed in gold (his file recoloured by an SVG filter, never redrawn), laid paper texture, dotted leaders
on the menus, a pinked press clipping.

**Nomenclature.** The host, The larder, The bill of fare, The reply card, The usual, Said of us, Grander occasions.
I Choose a card, II Reply, III Seal it. "Choose this card", "Seal and send", "Send it again", "Sealed and sent".
Menu cards, reply card, calling card, place cards. Empty table, "The table is laid once you choose a card".

**Motion.** Gold frames draw themselves once, the hero seal presses in, place settings draw in as guests are added,
the seal stamps the reply card. Reveals from a throttled scroll check. prefers-reduced-motion stills all of it. No
smooth scrolling. Nothing waits on an animation.

**Image treatment.** His photographs only, full colour, never captioned, never tinted, framed in arches or stepped
frames with a gold keyline. LinkedIn tiles cropped to the top of the file so his overlaid captions never show.

## Sources, with fetch times (UTC, 13 Oct 2026)

- His site, fetched fresh 08:15:52, home, /about-1, /about-1-1, /corporate, /barhire, /enquire, all 200. 32 claims on
  the page string matched against that text (MasterChef quarter finalist wording, founder and head chef, royalty and
  athletes and celebrities, the Evri quote and attribution, all six larder items, the four corporate services and
  their wording, Hodroyd Hall, the 24 hour reply, the enquiry form fields, the phone number), 32 of 32 found, and a
  negative control ("MasterChef UK winner", "cooked for presidents") correctly not found.
- His LinkedIn company page, fetched 08:16, 200. "MasterChef 2016" in the tagline, "Because good food has a way of
  bringing people together", the canapé wording ("from elegant classics to more creative, flavour-packed bites",
  "options to suit different dietary requirements", "drinks receptions, private parties"), "beautifully cooked
  steak", "cooked and served fresh", "slow-cooked pork belly", all found.
- His brochure "Corporate Christmas Packages" (LinkedIn document), re-fetched 07:38:51, byte identical to v1's copy,
  sha256 7dd122bb...388e. Text layer checked for every Christmas dish, "from £12pp", "from £18pp", "£8pp", "Includes
  serving staff, setup, disposable plates & cutlery", "No boxes. No set menus. Just Christmas, your way.", "Rhubarb &
  custard millefeuille", "Plated or Feasting Style", all found.
- Companies House and the 2016 press for MasterChef as recorded in v1's notes (not re-fetched, nothing new rests on
  them beyond what his own site and LinkedIn say).
- Bank holidays, England and Wales, gov.uk dates as in v1 (25 and 28 Dec 2026, 1 Jan, 26 and 29 Mar, 3 and 31 May,
  30 Aug, 27 and 28 Dec 2027).

## Images and fonts

Every file, hash and source is in `image-sources.txt`. Eight images reused from v1 (plated, dessertrow, emblem,
sliders, steak, paella, bar, private dining) and his wordmark were re-fetched from source at 08:35 and matched the
deployed bytes, 9 of 9. Four new photos are embedded images from his own brochure, resized only, and were zoomed at
full size for other brands' text, faces or logos, none found. Not used from the brochure, the bar photo (a menu card
in it) and the hands photo. v1's wordmark file was a Wix "fill" rendition that cropped the left arm of the T. v2
uses his original upload, untransformed.

No photo is captioned. Alt text describes only what's visible. Dish photos sit only next to the dish he posted them as
(sliders with the hot and cold buffet, steak with the steakhouse buffet, paella with paella). The plated desserts, the
pork belly, the canapés and the plates of sliced meat are his brochure's own photos, shown without a dish name.

## Every number and figure on the page

His own, cited on the page as from his 2026 brochure
- Christmas hot sandwich menu from £12 a head, desserts £8 a head, "serving staff, set up, disposable plates and
  cutlery included". Christmas grazing table from £18 a head. All Christmas dish names.
- 24 hour reply (his enquiry page). Phone 07899 767279 and feasting@garnishcollective.com (his footer and brochure).
- MasterChef UK quarter finalist, 2016 (his site and LinkedIn tagline).

EXAMPLE figures, marked † on the page, footnoted "† Example prices, minimums, contents, lead times, delivery charges
and invoice terms, written for this concept for Chris to set."
- Breakfast box £9.50, from 6. Lunch box £13.50, from 6. Banquet style package £16.50, from 10.
- Hot and cold buffet £21, from 15. Steakhouse buffet £27, from 15. Paella for the team £15, from 20.
- Christmas minimums 10 (hot sandwich) and 15 (grazing table). His prices, our minimums.
- Order by 2pm, the working day before for boxes and packages, two working days before for buffets, five working days'
  notice for Christmas, Christmas dates 16 November to 23 December 2026, Monday to Friday, bank holidays skipped.
- Delivery local to WF, LS, BD, HD, HX and S70 to S75 postcodes, free over £150, otherwise £12. Buffet set up
  included locally. Grazing table set up, Chris confirms. Outside the area, Chris confirms.
- On account, 30 days. Delivery and set up times 7.30am to 6pm in half hours.
- The reply card opens on a lunch box for 12, £162.00.
- Example contents now read "with seasonal salads and something sweet" (hot and cold buffet) and "with roast potatoes
  and seasonal salads" (steakhouse buffet), shortened in the final round.
- Example box and buffet contents, in italics on the menus (pastry, yoghurt and granola, fruit and juice, a filled roll
  or flatbread, salads, sharing boards, breads and dips, roast potatoes, bread and green salad, something sweet).
- Demo account "Your Company Ltd" (labelled "Demo account, a made up company"), Thursday team lunch, 14 lunch boxes, 2
  vegetarian, 1 vegan, 1 gluten free, delivered by 12.30pm Thursdays, Floor 3, 1 Example Street, Wakefield WF1 2AB,
  £189.00 (14 x 13.50), on account, note "Ask at reception".
- Order references "Order TGC" plus four random digits.

## QA (local over http, and live after deploy)

- Cold load, nothing forced, at 1440, 1080, 768, 420, 390 and 360 locally and at 1440 and 390 live. 0 page errors,
  0 console errors or warnings, 0 failed requests, 0 responses over 400, 20 of 20 reveals fired, 11 of 11 gold frames
  drew (the 12th sits in the closed dialog), 17 of 17 images decoded, all five fonts loaded, scrollWidth equals the
  viewport at every width, no element outside the viewport, scroll-behavior auto.
- Order exercised end to end through the UI with a fixed UK clock (Tue 13 Oct 10am), at 1440 and 390 locally and at
  1440 and 390 live, values read back from the page.
  - Boxes. 14 lunch boxes, 2 vegetarian, 1 vegan, 1 gluten free, WF1 2AB, card. "Fourteen lunch boxes at £13.50 each,
    £189.00", delivery free, £189.00, 14 settings and 4 place cards drawn, sealed, confirmation shown, kept as usual.
  - Small box order. 9 lunch boxes to S70 2AB, £121.50 plus £12 delivery, £133.50.
  - Buffet with dietary needs, out of area, on account. Steakhouse buffet for 30, 6 V, 2 VE, 3 GF, M1 1AE, PO 4471,
    a nut allergy note. £810.00 "plus the part Chris confirms", 30 settings and 11 place cards, confirmation reads
    "On account, purchase order 4471".
  - Christmas. Hot sandwich menu for 25 with desserts, LS1 4AP, card. First date offered Monday 16 November. "25
    guests from £12.00 a head, £300.00", "Desserts for 25 at £8.00 a head, £200.00", set up included, from £500.00.
  - Grazing table for 25, from £450.00, "Set up, Chris confirms".
  - One tap reorder. The visitor's kept usual sent again for Monday 16 November, and it survived a reload. The demo
    account sent again for Thursday 15 October, on account, £189.00.
  - Validation. With the card cleared, sealing lists "Choose a card first.", "Choose a time.", the missing address
    parts and "Add your name and an email we can reply to.", and blocks the seal.
  - Clock tests. 3.30pm Tuesday gives Thursday 15 Oct, Friday 10am gives Monday 19 Oct, Saturday gives Tuesday 20 Oct,
    24 Dec 10am gives Tuesday 29 Dec (25 and 28 Dec skipped), 18 Dec closes Christmas ("Christmas 2026 orders have
    closed here. Write to Chris about anything later."). A bug found and fixed here, the closed state had said the
    window ran to 23 December and then named 29 December as the first date.
- Screenshots of every section at 1440 and 390 in four rounds, all looked at. Fixed along the way, the fan symbol
  rendering as black half circles, the header wordmark colliding with the nav, his cropped wordmark file, a near
  black hero, menu names wrapping beside their prices, Italiana's old style digits, a dead drop cap and stray quote
  mark in the clipping, the larder photo upscaled, the phone address fields leaving lone commas, the confirmation
  dialog opening scrolled to its foot on phones, the stamp staying on after a new card was chosen, an unbalanced
  three column bill of fare (now two cards plus a wide Christmas card), the empty table on arrival.
- Copy, every visible string captured across all states (all eight menus, five postcodes, errors, dialogs, toasts,
  the usual in both forms, three clocks), 579 lines. 0 colons, 0 dash characters outside URLs and emails (stepper
  minus glyphs drawn as SVG), 1 exclamation mark, inside the Evri quote. No country named. "finalist" only ever as
  "quarter finalist". Detector controls fired on "a: b", "a - b", "a — b", "wow!" and "Bali". Contractions in our
  copy include don't, isn't, it's, he'll, you'd, delivery's, set up's, week's. Concept line at the top, in the
  confirmation and in the footer.
- NO-AI-SLOP section 8, run verbatim on the visible text and the HTML. 0 banned words in the copy (HTML hits are the
  CSS transform property), one banned phrase, "when it comes to", inside Stacey Dockerty's quote, kept as her words.
  0 hedges, 0 paired adjectives, 0 uncontracted verbs, 0 em dashes, 0 emoji (control fired). Authored prose, 102
  sentences, 2 to 34 words.
- Build rules. No inline grid styles, every grid track minmax(0,1fr), no scroll-behavior smooth, favicon (his
  monogram), charset utf-8, both script blocks parse in the local file and in the downloaded live file, a noscript
  line on the reply card giving his phone and email.
- Live. 200, title "Order chef made catering | The Garnish Collective", live HTML byte identical to the deployed file
  and to this folder's index.html (sha256 b65211cc...c72a, no Netlify injection), 18 of 18 assets fetched live and
  byte matched, visible text in every state identical to local apart from the random order references,
  netlify.toml not served (404), SSO and password off. Control host astra-qualigraf-prototype returned 200 through the
  same path.
- One correction after the first deploy. Zooming the brochure photos showed I'd written "sliced beef" in an alt text
  for a meat I can't identify, changed to "sliced seared meat" and redeployed (6acdee06...).

## Must not ship as is

1. Every † figure, prices, minimums, cut off, lead times, the Christmas window, delivery areas and charges, set up
   inclusions, invoice terms and time slots. All examples for Chris to set.
2. Every italic line on the box and buffet menus. Chris writes the real contents.
3. Menu names "Breakfast box", "Lunch box", "Hot and cold buffet", "Steakhouse buffet", "Paella for the team" are
   ours, built from his product lines and posts.
4. The demo account, its order and address. Made up.
5. Payment is a demo, no payment provider, no order inbox, no confirmation email, no VAT treatment, no allergen
   statement or terms. A real build needs all of them.
6. A kept usual lives in the visitor's browser only. A real account system is needed.
7. "noindex" in the head, take it off at launch.
8. Process lines that are our assumption, "In the live site this goes straight to the kitchen", "Chris replies if
   anything needs a word", "Chris confirms the delivery or travel", and the reply card opening on a lunch box for 12.
9. The phone number and email are his, from his site and brochure. Confirm he wants them on an ordering page.
10. "Every menu is where Chris starts, not where he stops." and "These don't fit on a card" are our lines, written to
    honour his brochure's "No boxes. No set menus." Check he's happy with them.

## For Raka, before the delivery message

- The page now reads as Chris's own site, an invitation and a reply card, with no SaaS furniture. Say what it does in
  the delivery message, choose a menu card, reply in one card, see the price on it, pay by card or on account with a
  PO, and send the usual again in one tap.
- His brochure says "No boxes. No set menus." and then prints menus. The page uses that line as the frame for every
  menu being a starting point.
- The Evri quote stays word for word, so it keeps "when it comes to" and the one exclamation mark.
- His site says both "MasterChef finalist" and "former MasterChef UK quarter-finalist". The page only uses quarter
  finalist.
- Two things in his brochure he may want to know, not for the message. The three course dinner price reads "From
  E45pp" and the canapé line reads "(Canapes from £per canape, per, person)", an unfilled template. Neither is shown.

## Couldn't verify

- Whether his LinkedIn, site and brochure photos were all shot at his own events. They're his uploads and his
  brochure's, uncaptioned on the page, and nothing claims more than that.
- What the meat on the brochure's page 8 plates is, so the page doesn't name it.
- Real prices, minimums, lead times or delivery area. He publishes none outside the Christmas brochure.
- Whether the brochure's September 2026 "from" prices still hold.
- The 63 teardown renders are of what our browser could load today. 26 of the 89 sites could not be looked at, listed
  above, and nothing is concluded about them.

## Final round (coordinator's seven fixes, 09:00 to 09:15 UTC)

Raka's question was "is this the final final thing that will make us win his deal". Seven fixes, one line before and
after each, then the full QA again.

1. **Flow, proof before the ask.** Before, Invitation, Host, Larder, Bill of fare, Reply card, Usual, Said of us,
   Occasions, Close. After, Invitation, Host, Larder, **Said of us**, Bill of fare, Reply card, Usual, Occasions,
   Close. The clipping sits on his forest green #183E30 with a sunburst rule, and Occasions moved to cream so the
   rhythm doesn't repeat. Nav before, The host, The larder, Occasions | Menus, Order, Your usual. After, six items in
   page order, The host, The larder, Menus | Order, Your usual, Occasions.
2. **The host needs the host.** Before, an arch of plated desserts. After, Chris himself, cropped tight from the
   photo in his homepage bio block. tools/verify_portraits.py (read in full first) was run against a fresh render of
   https://www.garnishcollective.com/ (08:57 UTC, 200). Its own containment function puts the first "Hale" (the intro
   paragraph) in a card whose only image is his logo, and the second "Hale" (the bio block, "We are proud to be led
   by the incredible Chris Hale") in a card whose only image is Strata_InfluencerEvent_Sep23_086.jpg. With the bio
   block section as source, the tool printed **PASS Chris Hale** and **ALL PORTRAITS CORRECTLY PAIRED**, the
   embedded re-encode of his published upload matching byte for byte (ff49e3ed95393b92). Controls, the full page body
   as source fails (pairs the logo), and a wrong image under his name fails ("does not match the client's own
   photo"). The photo shows two guests either side and phones in the foreground, so it's cropped to Chris only (box
   x 2169 to 3616, y 2329 to 4138 of 5464x8192, no guests' faces, no table, and no workwear sleeve patch, which
   carries another brand's emblem). The crop was reproduced byte for byte from a fresh fetch of his upload (source
   sha256 9d2903aa...4b2c, crop f1cbe041...df4b). Alt text "Chris Hale, head chef of The Garnish Collective, at work",
   no caption, no event or venue named. The other photo of him (Venue_08.jpg beside the intro) wasn't used, the
   tool doesn't pair it, its card holds the logo. dessertrow.jpg left the page and the deploy.
3. **Hero headline.** Before, "CHEF MADE CATERING / for the office, ordered online." under "Chris Hale's kitchen,
   Yorkshire". After, "A CHEF'S TABLE / for the office, ordered online." under "Corporate catering from Yorkshire",
   and the lede names him, "Lunch boxes, buffets and Christmas menus from the kitchen of Chris Hale, MasterChef UK
   quarter finalist. Choose a card and reply, and it's booked."
4. **No clip art.** Before, a ribboned gift box on Bags & Boxes, a cloche on Buffets, a six icon larder grid and a
   wall of circles for Installed Edible Displays. After, three ornaments drawn in the sunburst's hand, a stepped deco
   hamper with a diamond clasp under radiating lines, a tiered stand crowned by a small sunburst, and the same tiered
   stand drawn large in the gold arch for Edible Displays. The larder is an editorial ledger, I to VI in engraved
   Cormorant SC numerals, italic entries between gold rules, no icons.
5. **Wording.** (a) Before, "Every menu is where Chris starts, not where he stops." After, "Each card is only where
   Chris starts.", with the swap line under it, now "Say what you'd swap when you reply, even for something that
   isn't on the card." (b) Before, "THE KITCHEN REPLIES WITHIN 24 HOURS" as the events headline. After, "TELL CHRIS
   ABOUT THE OCCASION", and the 24 hour reply is a quiet clause in the body. (c) A full reread against both
   standards cut, "founder, head chef and a" (now "head chef, and a"), the three item Thursday line, "the same food,
   the same time and the same address", a third usual tick, "Launches, dinners and bars" (now "Launches and
   dinners"), "the venue" from the occasions lede, "private parties" from canapés, "brand launches, product launches"
   (now "launch days"), "Design, catering and the guests' evening", "classic pours", "where to set up" from the notes
   label, "something for everyone" from Buffets, and a double "and" from the footer. Kept on purpose, his own words
   (royalty, world class athletes and A list celebrities, his brochure's included list, the Evri quote) and real menu
   contents.
6. **Phone.** Before, at 390 the banquet table sat above the reply card, about 600px of scene before the first
   field. After, at 1080px and below the card comes first and a compact table sits under the bill, above Settle it.
   It seats up to 32 at a smaller scale over two tables (12 fit one table), then "and N more places at further
   tables". Desktop keeps the full table beside the card.
7. **Don't touch what works.** The reply card sentence, the bill, Settle it, Seal and send, the usual card, the
   Christmas card, the clipping style, the close, the † footnote and the concept line are unchanged (the scene moves
   on phones only, the footer sentence lost one clause).

### Final round QA

- Cold load, nothing forced, local at 1440, 1080, 768, 420, 390 and 360, live at 1440 and 390. 0 page errors, 0
  console errors, 0 failed requests, 20 of 20 reveals, 11 of 11 frames, 17 of 17 images decoded, no overflow.
- Every section screenshotted at 1440 and 390 locally (three rounds) and live, all looked at. Fixed on the way,
  Italiana numerals in the ledger (III spaced out, IV read as I\, now Cormorant SC), a phone kicker wrapping, a
  compact table splitting 12 into 10 and 2. Compact table checked at 12, 14, 30, 25 and 60 guests.
- Order tests at 1440 and 390, local and live, values read back. 14 lunch boxes with dietary needs to WF1 2AB by
  card, £189.00. 9 lunch boxes to S70 2AB, £133.50. Steakhouse buffet for 30 with dietary needs to M1 1AE on account
  with PO 4471, £810.00 plus travel Chris confirms. Christmas hot sandwich menu for 25 with desserts to LS1 4AP, from
  £500.00. Grazing table for 25, from £450.00. The visitor's own usual sent again (survives a reload) and the demo
  account sent again for Thursday 15 October, £189.00. Validation blocks an empty seal. Clock tests unchanged
  (Tuesday 3.30pm, Friday, Saturday, 24 Dec, and Christmas closed from 18 Dec).
- Copy, 583 visible lines in every state. 0 colons, 0 dashes, 1 exclamation mark inside the Evri quote, no country,
  no "finalist" without "quarter", no not X but Y. NO-AI-SLOP section 8, 0 banned words, one banned phrase inside
  the Evri quote, 0 hedges, 0 paired adjectives, 0 uncontracted verbs, 0 em dashes, 0 emoji.
- Claims recheck for anything new, against his pages fetched 08:15 and 08:57 UTC. "MasterChef UK quarter finalist"
  and "head chef" (home), "based in Yorkshire" (home), canapés for "drinks receptions" and "corporate events"
  (LinkedIn), "Brand Launch Days" and "Networking Events", "multi-course dining", "front-of-house", "Hodroyd Hall, or
  delivered at location of your choice", "craft cocktails" and "bespoke drinks menus", "savoury and sweet
  selections" (corporate page), "within 24 hours" (enquire page). All found.
- Live. 200, title unchanged, live HTML byte identical to the deployed file and to this folder (5aa0d245...f6e1),
  18 of 18 assets byte matched, dessertrow.jpg and netlify.toml 404, visible text identical to local in every state
  apart from random order references, SSO and password off, control host 200.

### Must not ship as is, additions

11. "A chef's table" and "Corporate catering from Yorkshire" are our lines. "Each card is only where Chris starts"
    and "Tell Chris about the occasion" are ours too.
12. The host photo is his own upload from his homepage, cropped. Confirm he's happy to have it on an ordering page
    and with the crop (it's from a garden event with guests, all cropped out).

### Host heading wording (09:15 to 09:20 UTC)

The italic under CHRIS HALE read "head chef, and a MasterChef UK quarter finalist." The preferred replacement,
"founder, head chef and MasterChef UK quarter finalist.", was tried and measured character by character. It broke as
"founder, head chef and MasterChef / UK quarter finalist." at both 1440 and 390, splitting the show's name, so the
fallback was used as instructed. The line is now "head chef and MasterChef UK quarter finalist.", which breaks
as "head chef and MasterChef UK / quarter finalist." at both widths. (A non breaking space in "MasterChef UK" would
also keep the founder version clean, "founder, head chef and / MasterChef UK quarter finalist", if Raka prefers it.)
Nothing else changed, the diff against the previous deploy is that one line. Rechecked, "founder and head chef" and
"former MasterChef UK quarter-finalist" on his homepage, 0 colons, dashes or exclamation marks in the line, cold load
0 errors at 1440 and 390 locally and live, live HTML byte identical (f059d086...46d6), 18 of 18 assets byte matched,
both scripts parse in the live file, Host section screenshotted at both widths locally and live and looked at.

