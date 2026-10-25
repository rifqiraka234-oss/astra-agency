# Saavedra, handover. 25 Oct 2026

## What it is, in plain words

Saavedra is an empanada kitchen at 48 rue Condorcet, Paris 9e, a SARL opened 10 June 2026 by Julien Salvat and
Grégoire Colas (register, SIREN 103 109 583). Our 21 Oct opener said the site never mentions catering, team lunches,
afterwork drinks, private hire or company events, so offices nearby only find Deliveroo and click and collect. Julien
replied on 25 Oct, "Yes you can send me a sketch with pleasure".

Two things are built, to the Hertling v3 bar (RULES section 5).

1. Their site, French first with an English switch, rebuilt around their own poster line "Menos palabras, más
   empanadas" and given a door for companies. The page runs through a team's day inside their opening hours, 12h30
   boxes, 13h team lunch, 18h30 afterwork, 20h private hire, and the sky follows the clock. A box builder sizes the
   order at card prices and hands the headcount to a one step quote.
2. A growth plan on its own site in Astra's voice, English, 12 chapters, built around Grégoire's own July post, "Et
   développer notre activité traiteur, les déjeuners d'équipe, les afterworks, les privatisations et les événements
   d'entreprise".

## The restyle, same afternoon

Raka's 25 Oct rules reached this session after the first deploy (RULES section 5, "No Claude look" and "Simple is not
plain", and the GTM plan's call ask). The build was restyled before anything was sent. Gone, pill buttons with a sliding
arrow (now rectangles like their own site's buttons), the floating stickers, the glow behind the sun, the gradient
fades over photos (now a hard edge), the soft shadow form card, boxed route buttons and chips, the "how it works"
three step block, the quote steps, and the team teaser on the home page (7 sections now, Entreprises 8). Kept, the
day scene, the box builder, the map and runner, their photos and posters, which are the wow layer. The four lines the
rule asks for are in research/four-lines.md.

## Links

- Site, https://astra-saavedra-prototype.netlify.app/ (noindex, SSO off, forms on). Netlify project
  astra-saavedra-prototype, id 4d43b892-48f8-4f26-bc77-123e35b887b9. Deploy 6addede04591120839515eed (restyle), first 6adde0777e8ec8850af2e7c6.
- Growth plan, https://astra-saavedra-plan.netlify.app/ (noindex, SSO off). Netlify project astra-saavedra-plan, id
  de92524a-2f7e-4275-9aac-36f255994008. Deploy 6addedff992048886003d118 (restyle), first 6adde094677867ddd1d971b6.
- Source, state/prototypes/saavedra/build. `python3 build.py` writes ../site and ../site-plan. `python3 tools/map.py
  /tmp/claude-0/saav/map/osm-small.json` and `python3 tools/cowork.py /tmp/claude-0/saav/map` regenerate the two maps
  from the OpenStreetMap tiles. No dependencies beyond Python 3 and Pillow for the photo sizes.
- Research, research/art-direction.md, research/strategy-facts.md (every plan figure, three checks each), research/
  teardown/TEARDOWN.md (58 reference sites, 17 catering pages counted), research/assets/own/ (their own drawings and
  photos, manifest.json, contact.jpg).
- Delivery draft, state/drafted_2026-10-25-julien-delivery.md. NOT SENT.
- The holding reply, state/drafted_2026-10-25-julien-reply.md, is no longer needed now the sketch is ready. NOT SENT.

## The site, page by page

| Page | What it does |
|---|---|
| Accueil | Their arch logo rises letter by letter in front of their sun, poster band, a drifting strip of their photos, the day scene (four hours, the sun sets behind the clock, embers at night), then dawn into the quote "Et demain midi ?", the oven with their own sentence, the nine recipes, ordering, the barrio |
| Entreprises | Poster hero, the box builder (12h30), the 9e on foot with their runner carrying the tray along real streets, team lunch (13h), afterwork (18h30), private hire teaser (20h), how it works, FAQ, the quote |
| Privatisation | Night hero with embers, the occasions, the whole card, three questions, the quote preset to private hire |
| Devis, Merci | The one step quote on its own, and the thank you page a no JavaScript POST lands on |
| Menu | Their printed card typeset as text from the three card images, Carne, Verduras, lunch deals, Dulces, sauces, drinks |
| L'équipe | Their own équipe text, colons rewritten, gaucho drawing, two of their photos |
| Commander | Click and collect on Zelty, Deliveroo, Uber Eats (their site links only the first two), hours |
| Mentions légales, Confidentialité | Templates, register numbers filled in, the rest marked for their adviser |

## What's theirs and what's ours

Theirs, word for word or nearly, the poster line, the tagline, the équipe text, the card with every price, the
address, mail, hours (Zelty and Uber Eats, slot for slot identical), the register numbers, their drawings (traced from
their own PNGs) and their photos.

Ours, and they have to say yes to each, marked [CONFIRM].

1. [CONFIRM] Private hire as an offer at all, and the restaurant's capacity. Nothing on the site states a capacity, the
   FAQ says the reply tells them what fits.
2. [CONFIRM] Delivery for events. The site says pickup, or tell us where and we'll say how it arrives. Day to day
   delivery is Deliveroo, which their own click and collect page says includes offices.
3. [CONFIRM] Card prices shown as the reference. The box builder says "Au prix de la carte" and the quote sets the event
   price. A catering price, minimum and lead time are theirs to set. None is invented.
4. [CONFIRM] Afterwork drinks served at the office. The site says at the office or at ours, say which in the quote.
5. [CONFIRM] The reply line "Julien et Grégoire vous répondent avec un devis". No reply time is promised.
6. [CONFIRM] The ratings shown (Google 5,0 from 138, Deliveroo 4,7 from 31, Uber Eats 4,5 from 28, read 25 Oct) carry
   "octobre 2026" and need refreshing before launch.
7. [CONFIRM] The plan's three posts are drafts in their voice, labelled "Draft, not posted".
8. [CONFIRM] The plan's suggestion to take company orders from one box of 12, and the box walk to coworking spaces.

## Example data, and where it's labelled

None on the site. The box builder computes from their real card prices and says it's a suggestion. The plan's
calculator is labelled "A scenario at card prices to size the opportunity, not a forecast."

## Never on this build

- No photo is captioned as their premises, staff or customers. Alt text says what the photo shows, never who.
- No person is named on a photo.
- Their footballer poster and the "Empanadas de Dios" sticker (a recognisable public figure) are not used. Neither is
  the Deliveroo logo or the bus photo with a third party badge.
- The OpenStreetMap name at the address, Amor Mio, is never used for them. The plan tells them to fix it.
- Photo 16 (a tray with a legible Le Sauvageon bottle label) is not used. Photo 15 is used with the top 24 % cropped off,
  where a La Vie Fraîche label showed out of focus. Both flagged by the imagery agent and checked by eye.
- The runner drawing could read as a nod to Mafalda (imagery agent). It carries the map and the order section, it isn't
  the hero. Worth asking them before it goes further.
- The traced SVGs are ours, from their PNGs. Ask Saavedra for the real vector files before launch.

## Legal pages [CONFIRM with their adviser]

Mentions légales has SAAVEDRA, SARL (nature juridique 5499), SIREN 103 109 583, SIRET 103 109 583 00015, the address
and mail from the register, and highlighted gaps for share capital, RCS city, VAT number, publication director and host.
Confidentialité describes the quote form truthfully and leaves retention and the form provider for them to fill. The
site sets no cookie, it keeps the chosen language in localStorage.

## Before it goes on their own domain

- Remove the noindex meta and the X-Robots-Tag header.
- Decide where quote requests land. Here they post to Netlify Forms as "devis", with a ready written mail to
  Contact@saavedraparis.fr if sending fails.
- Point Google's menu link at /menu/ and add the Entreprises link to the Google profile.
- Refresh the ratings line.

## Assets and licences

- Every photo and drawing is theirs, taken from saavedraparis.fr (research/assets/own/manifest.json). Photos resized to
  1600 and 800 wide. Drawings traced to SVG from their PNGs with potrace, colour set by the page.
- Maps, OpenStreetMap contributors, ODbL, credited under each map and in the legal notice. Routes are shortest walks on
  the street graph, minutes at 5 km/h, said under the map.
- Fonts, Bagel Fat One, Big Shoulders Display, Hanken Grotesk, Space Mono, SIL Open Font License, licences read,
  self hosted. Their own Typekit fonts can't be reused, these were chosen to match.
- No stock photo or film is used. The imagery agent's Mixkit films are on disk and unused, people in stock clips would
  read as their customers.

## QA record, 25 Oct

Scripts are in qa/ (they expect the two preview servers on 8791 and 8792).

- Copy audit, every visible string, alt, aria label and meta, French and English, both sites, 0 flags. A planted
  control tripped colon, dash, slop word, uncontracted and exclamation in the same session. Proper nouns with a hyphen
  (Saint-Georges, Île-de-France, Patchwork Sainte-Cécile, La Casa Deskeo – Victoire) are on the allow list as written.
- Rendered copy after the scripts ran (box builder, open now line, calculator), 22 loads, clean apart from the planted
  control and an allowed proper noun.
- axe, WCAG 2.2 AA plus best practice, 11 pages, 2 languages, 1440 and 390, 44 runs, 0 violations. Fixed on the way,
  pink text on light backgrounds (now a deeper pink, the pastel stays on blue and night), the label pink on blue
  chips, the footer word.
- Overflow, console errors and failed requests, 11 pages, 2 languages, 9 widths from 1920 to 320, 198 loads, 0.
- Text spilling out of its box, 88 loads, control caught 88 of 88, 0 spills. Fixed, poster headlines at 1440 and 360,
  the footer mail at 1024, the order page card titles, the plan's team cards on phones (an inline grid, now a class),
  the month chart values on phones.
- Quote form, 45 of 45 with POSTs intercepted, on every page that has it, French and English, prefill from the address
  and from the box builder, validation, stepper, honeypot, the mail fallback when sending fails, and the no JavaScript
  POST to /devis/merci/.
- Box builder, 33 headcounts and 3 appetites at 4 widths, 132 of 132 with the right number of boxes and none off the
  board. An earlier version of this test passed while the script was broken because it never checked boxes existed,
  it now does.
- No JavaScript, nothing hidden, French only, the default boxes drawn in the page. Reduced motion, every scene still.
- After the restyle, everything above was run again. axe 44 runs 0, overflow 198 loads 0, spills 88 loads 0 with the
  control caught 88 times, copy 0 flags both sites, form 45 of 45, box builder 132 of 132, no JavaScript nothing hidden.
- Live, both sites hashed file by file. Site 61 of 65 identical, the 4 pages with the form differ only by Netlify's
  form tag rewrite, checked by diff. Plan 45 of 45. Netlify registered the form "devis" with its honeypot. Cold loads
  at 1440 and 390, 22 of 22 at 200 with the right title, 0 broken images, X-Robots-Tag noindex on every page.

## What I'd flag to Raka first

- The 16h "goûter" step was cut. Their hours are 12h to 14h30 and 18h30 to 22h, so a 16h format would have promised
  something they can't do. The day is now 12h30, 13h, 18h30, 20h.
- The teardown agent said their menu is four images. It's three card images plus two decorative drawings, so the plan
  says three.
- The two offices counts disagree by two (306 by my recount, 308 by the agent's), the plan says 300+.
