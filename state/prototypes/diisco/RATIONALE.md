# Diisco venue console — prototype rationale

**Contact:** Alex Temprell (Director & Co-Founder, Diisco)
**Company:** Diisco (diisco.app) — UK hospitality gig/staffing platform, pre-launch.
**Angle #1.** Alex replied "Sure send it over" to the opener: the worker side of
Diisco is strong, but the venue side (the paying side) has no clear signup or a
look at how posting a shift works. This sample builds that venue side.

## Governing concept
A complete **venue staffing app**, not one floating screen. It answers the venue's
real job to be done: "I am short staffed for an upcoming service, fill the gap fast
with someone rated who will show up, and let me see my rota is covered." Three
screens behind a persistent nav (Tonight, Post a shift, My team):
- **Tonight** dashboard: the venue (The Copper Still, Shoreditch), a stat row
  (shifts this week / filled / open), highlighted open gaps, and the week's rota
  grouped by day, filled shifts showing the assigned worker.
- **Fill a shift**: tapping a gap opens the match console in context, prefilled
  with that gap. Post it, a radar scans the ranked pool, rated staff stream in
  with glowing rings, and one tap confirms.
- The loop **closes**: on confirm the gap disappears from "needs filling", the
  stat counts update, the rota row flips to filled with the worker's avatar and a
  mint highlight, and a toast confirms. The job is visibly done.
- **My team**: the venue's rated regulars, rebookable in a tap.
Dark cinematic Diisco register throughout (near-black plum, neon purple/mint/blue
glow, real logo and fonts), mobile gets a native-style bottom tab bar.

## What is real
- **Brand:** Diisco's own logo (SVG), colours (deep purple #31125D, bright
  purple #A414D9, blue #1863DC, mint #3CC89E, orange #D85822, lilac) and fonts
  (Schibsted Grotesk + Kumbh Sans), pulled from diisco.app.
- **Venue flow:** Register, Post a Shift (role/date/pay rate), Review Applicants
  (ranked workers), Confirm & Pay (secure payment on check-in) — verbatim from
  Diisco's "How It Works for Venues".
- **Value props:** flat fee per shift, ranked worker access, build your venue
  rep — Diisco's own copy.
- **Testimonials:** The Marlowe Inn (Edinburgh), Salt & Thyme (Bristol), Marco B.
  — real quotes from Diisco's site.
- **Media:** Leeds Today and The Business Desk logos, real, from the site.

## What is demo, clearly labelled
- Applicant profiles (names, ratings, scores) and the posted shift are
  **demonstration data**, labelled "Sample data" in the applicants panel, "Demo"
  in the console header, and spelled out in the footer. No real worker is
  depicted; avatars are coloured initials, no photographs.
- The flat fee is described, never given an invented number (Diisco publishes
  "simple flat fee per shift" without a figure, so neither do we).
- Footer states it is an ASTRA-built sample, not a live Diisco product, no
  affiliation/endorsement implied.

## Interaction / QA
- Post a shift → 6 ranked applicants stream in with a staggered reveal and a
  live count; Confirm books one (mint state), dims the rest, and shows a
  confirmation bar echoing the posted shift terms.
- Playwright: 0 console errors, 0 horizontal overflow at 1440/1024/768/390/360,
  no broken images. No-JS: all applicants and sections render (form still
  posts server-less-style via the static fallback list).
- Reduced-motion honoured; reveals gated behind html.js.
- Self-contained single file: 6 woff2 faces + logo + media logos embedded.

**Artifact:** state/prototypes/diisco/index.html
**Bytes:** 229847
**sha256:** 108e53615afb827041669c204df7251241e2656be67093b59a100369abf5dc20
**Netlify site (to create):** astra-diisco-prototype
