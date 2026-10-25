# Saavedra, catering and events side, art direction (25 Oct 2026)

Julien Salvat said yes on 25 Oct to "a sketch of the Saavedra catering and events site, with sharing boxes for offices,
private hire and a quote request in one step" (our 21 Oct opener). The bar is the Hertling v3 recipe, RULES section 5
and the last section of docs/build-and-deck.md. One idea from their own words carried by the whole page, no islands,
their mark as the hero object, full bleed media of their place, and a growth plan on its own site.

## What their own site says and shows (rendered 25 Oct, 5 pages, tools/crawl.py and site-audit.js)

- Tagline "Fabrique d'empanadas cuites au feu de bois", 48 rue Condorcet, Paris 75009, Contact@saavedraparis.fr.
- L'équipe, "la simplicité, la générosité, et cette manière unique de vivre autour de la nourriture", "Saavedra, c'est
  aussi un quartier de Buenos Aires", "Notre mission est simple : faire découvrir & redécouvrir l'empanada", "des
  empanadas façonnées à la main, des recettes travaillées, une cuisson au feu de bois, et une expérience rapide,
  chaleureuse, sans compromis sur la qualité".
- Their own posters on Nos produits, "Menos palabras, más empanadas" and "Para los socios del Saavedra Club", a Buenos
  Aires colectivo, tote bags and tees, wood fired empanadas with charred spots, people eating with their hands.
- Palette, celeste rgb(189,227,250) #bde3fa, azul rgb(3,74,145) #034a91, crema rgb(253,226,206) #fde2ce, rosa
  rgb(242,156,182) #f29cb6. The colours of the Argentine flag plus the pink of their posters.
- Type, BLOCKB for the giant SAAVEDRA, MTM Palma for headings and nav, Aktiv Grotesk, Panchi mono for the address. All
  licensed to them through Typekit or their designer, so none can be reused.
- Illustration in blue line, the Sol de Mayo sun, a gaucho on horseback ringed by the letters S A A V E D R A, a runner
  carrying a tray of empanadas, a heart.

## The idea

**Menos palabras, más empanadas.** Their own poster line, fewer words, more empanadas. For a company it becomes the
catering promise, less admin and more empanadas, and the page behaves like it. Big poster words instead of paragraphs,
pictures instead of explanation, and a quote request in one step that a visitor fills in by moving one slider.

**The page is a team's day.** Each format lives at its hour and the colour of the page follows the sun. Midi in their
celeste for the office boxes and team lunches, the afternoon in crema, 18h30 in rosa and gold for the afterwork, 20h in
deep azul with the glow of the wood fire for private hire, then celeste again for the quote, "et demain midi". Their sun
is the hero mark and it crosses the sky as the page scrolls, until at night it becomes the fire.

## Palette, theirs, used as the day

| Token | Value | Use |
|---|---|---|
| celeste | #bde3fa | midi, the hero, the quote |
| azul | #034a91 | ink on light, buttons, the night |
| noche | #021b38 | private hire, footer |
| crema | #fde2ce | the afternoon, cards held in a hand |
| rosa | #f29cb6 | 18h30, mono labels on dark, stickers |
| sol | #f6b40e | the sun, the Argentine flag's gold, used sparingly |
| brasa | #ff6a2b | embers, only at night |
| papel | #fffaf3 | text surfaces in daylight |

## Type, open licence, chosen for their character

- Bagel Fat One for the giant poster words (their BLOCKB is heavy and rounded). OFL, read in OFL.txt and METADATA.pb.
- Big Shoulders Display, 700 to 900, condensed uppercase headings and nav (their MTM Palma is condensed). OFL.
- Hanken Grotesk for reading (their Aktiv Grotesk). OFL.
- Space Mono for the address, times and labels (their Panchi mono, in rosa). OFL.
- Spanish phrases from their own posters only, never invented ones.

## Grammar

- Chapters edge to edge, each a time of day, handing over through a gradient of the sky. No card on a grey page.
- Their photos full bleed or as tilted prints with tape and sticker edges, the collage language of their Nos produits
  page, never a uniform grid.
- Stickers and stamps in their style for the facts that matter (devis en une étape, à partir de 6 personnes if they
  confirm it).
- Motion with a reason, the sun crossing the day, the runner carrying the tray from rue Condorcet across the 9e, a box
  filling with empanadas as the headcount slider moves, embers drifting at night. Every scene has a still state for
  reduced motion and no JavaScript.
- French first, every line in English beside it, the switch in the header.

## Pages

Accueil (the shop, with the companies side front and centre), Entreprises (boxes, team lunches, afterwork), Privatisation
(the restaurant at night), Devis (the one step request), Menu (in words, transcribed from their printed card), L'équipe,
Commander (pickup on Zelty, delivery on Deliveroo), Mentions légales and Confidentialité (templates marked for their
advisor). The growth plan sits on its own site in Astra's voice, English.

## Never

- A photo captioned as their premises, staff or customers unless it's theirs and their own site uses it that way.
- A person named on a photo.
- A capacity, delivery radius, lead time or minimum order they haven't published. Those sit in the form as questions
  and in the handover as CONFIRM.
- Their poster with a recognisable public figure, or any third party logo.
