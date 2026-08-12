# Rosalie Voortman — Research Summary & Rationale

Rebuild (v2). The first attempt used three unrelated stock photos (a laptop
flat lay, an empty cafe, pottery) for a photographer, which is an automatic
hard failure under the current spec: for a photographer the photography is
the product. This version is built entirely from her own real work.

## Governing concept
"Her brand work, sequenced into chapters the way she actually delivers a
shoot." The site is a gallery, not a layout with photos dropped in. It
controls composition (staggered editorial spreads, one per chapter),
imagery (her own frames only), colour (near black so the photographs are
the only colour on the page), copy voice (quiet, craft first), and
interaction (a Chapters tab set that answers the original outreach critique:
"Brands already has a chapter, it just isn't given a chapter's worth of
room").

## Brand evidence (sourced)
- **Real work, verified on her live site** (rosalievoortman.com/brands):
  every image on the page is hers, pulled from that page's own CDN. Chapters
  used: Aimee the Label FW26, Aimee at Modefabriek, interiors/details,
  on-location.
- **Aimee the Label + Modefabriek are real** (verified independently via
  Modefabriek and FashionUnited press, and Rosalie's own Stories/Fashion
  page): she shot Aimee's winter collection in Amsterdam and documented them
  at Modefabriek in photo and video. So naming these as real client work is
  factual, not invented.
- **Her real register** (sampled from her own images): low saturation, dark,
  warm neutral, roughly a third true black and white. Deliberate motion blur
  kept in several frames. The design system is built from that evidence, not
  from a generic "artsy" palette.
- **Pricing** (€450 / €695 / €995) is taken verbatim from her real Brands
  page packages. Package names ("The Refresh / Edit / Collection") are
  descriptive labels I assigned; confirm or swap for her real names before
  publishing.

## Typography
Familjen Grotesk, single family. Chosen for a quiet, contemporary Northern
European editorial feel that stays out of the way of the photographs. Not a
serif, specifically to avoid the "editorial serif + sans + mono" AI recipe
and to differentiate from the other two prototypes in this batch.

## Asset provenance
| Asset | Source | Type | Rights note |
|---|---|---|---|
| All 11 photographs | rosalievoortman.com/brands (her own CDN) | Client-owned real work | Downloaded and embedded, not hotlinked. Confirm she's happy to have her own work shown back in a concept before any public link. |

Nothing on the page is stock. No fabricated testimonial. No invented client.

## QA
- Rendered 1440 + 390. Hero (her real B&W Aimee frame) shows above the fold.
- 0 horizontal overflow either width. All 11 images verified to real pixels
  (the 7 in hidden tabs decode when their tab opens; confirmed 0 broken
  after clicking through).
- 0 dead links, only Google Fonts external, no mixed content, reduced-motion
  respected, JS valid. Fixed one sticky-header overlap found in render.
- `noindex` set; email/phone are placeholders (hello@rosalievoortman.com,
  +31 6 …) — confirm her real contact before sending.

## Weighted score (self-assessed): 92/100
Brand specificity 24/25 · Art direction 18/20 · Imagery & proof 20/20 ·
Story 13/15 · Copy 9/10 · UX 4/5 · Technical 4/5. No hard failures.

## To confirm before publishing
1. She's comfortable with her Aimee/Modefabriek work in a concept mockup.
2. Real package names and contact details.
3. A quick browser open on a real device (mobile checked via CSS + emulation
   only).
