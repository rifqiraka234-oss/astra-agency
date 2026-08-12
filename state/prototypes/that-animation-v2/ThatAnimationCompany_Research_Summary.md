# that Animation Company — Research Summary & Rationale

Rebuild (v2). The first attempt contained zero images and zero video and
used CSS gradient frames as "production proof" for an animation studio,
which is an automatic hard failure: an animation studio's proof is motion.
This version leads with their real reels.

## Governing concept
"A producer sees the studio move before reading a word about pipeline." The
page opens on a real playing reel, and the signature device is a screening
room that switches between their real 2D and real 3D work. Concept controls
imagery (real video + real stills), motion (the reels are the hero, not a
decoration), colour (dark screening room so the colourful frames pop, their
real red as accent), typography (their own Libre Baskerville, elevated), and
copy (a producer's language: pipeline, ownership, delivery).

## Brand evidence (sourced)
- **Real video, from their live site** (thatanimationcompany.com, GoDaddy /
  wsimg CDN): a 2D studio reel ("smash down") and a 3D turntable
  ("S22 Rotation", a modelled red-bin prop). Both downloaded and embedded.
  This is the actual motion the old build was missing.
- **Real stills**: the 2D sci-fi character frame and the 3D prop frame are
  their own production thumbnails (1920×1080), used as posters and stills.
- **Real fonts**: their live site uses Libre Baskerville (the red "that"
  wordmark) + Source Sans Pro. This prototype uses their real fonts, which
  is the sanctioned exception to the "editorial serif" anti-pattern: it is
  evidence-based brand fidelity, not a default. Their real accent is red.
- **Real credits, correct ownership** (from their site + earlier verified
  research): PakaPaka = 2D, full pipeline in house (their claim). Avery and
  Masa = 3D, in production, "with Avery and Masa Media" — the page does NOT
  claim solo ownership of it, matching how their own site frames it.
- **Real founders** (verified via trade press, Jan 2025 launch): Lynn
  Chadwick (distribution/enterprise: Huminah Huminah, Sinking Ship, Corus,
  Nelvana) and Steve Cooke (production/animation: Huminah Huminah, Halifax
  Film, DHX, IoM). Stated as on their own About page.
- **Real contact**: scooke@ and lchadwick@thatanimationcompany.com, from
  their contact page. The "Start a project" mailto pre-fills a scoped brief,
  which is the strategic idea (a production-partner scope) carried over from
  v1 — that idea was sound; only its execution lacked real work.

## Deliberate choices (factual integrity)
- **No fabricated testimonial.** There is a real public quote (Irene Weibel)
  on their site; not included here because I don't have it verbatim in this
  build. Can be added, attributed, later.
- **No invented projects, no invented clients, no metrics.** Only their two
  real named productions appear.

## Asset provenance
| Asset | Source | Type | Rights note |
|---|---|---|---|
| 2D reel (smashdown.mp4) | thatanimationcompany.com CDN | Client-owned work | Downloaded + embedded (not hotlinked). Confirm permission before public link. |
| 3D reel (S22_Rotation.mp4) | thatanimationcompany.com CDN | Client-owned work | Same. |
| 2D + 3D stills/posters | their production thumbnails | Client-owned | Same. |

## QA
- Rendered 1440 + 390. Real 2D character art shows above the fold with a
  play affordance. 0 horizontal overflow either width.
- Reel switch verified (2D/3D swaps poster + copy + credit, pauses the other
  video). Native controls load (metadata decoded).
- 0 dead links, only Google Fonts external, no mixed content, reduced-motion
  respected, JS valid. `noindex` set.
- **Video playback not visually confirmed in-sandbox**: this environment's
  headless Chromium can't decode h264, so I verified the mp4s are valid, the
  `<video>` markup and posters are correct, and metadata loads — but I could
  not screenshot the motion itself. Open it in a real browser to confirm
  both reels play before sending. This is the one genuine unverified item.
- File is ~7MB because the real video is embedded to keep it a single,
  dependency-free file. Fine for a concept link; for permanent hosting the
  video could be served as separate optimised files instead.

## Weighted score (self-assessed): 90/100, with one caveat
Brand specificity 23/25 · Art direction 18/20 · Imagery & proof 19/20 ·
Story 13/15 · Copy 9/10 · UX 4/5 · Technical 4/5. No hard failures on the
evidence, BUT technical reliability is provisional until the video is
confirmed playing in a real browser (see QA). Do that check before sending.

## To confirm before publishing
1. They're fine with their reels/stills in a concept mockup.
2. Both reels actually play (real-browser check).
3. Whether to add their real Irene Weibel testimonial (verbatim).
