# Revios — prototype rationale

**Contact:** Erisan Olasheni (Founder/CEO, Revios)
**Company:** Revios (revios.net) — B2C platform for real video and audio product reviews. Tagline "the world's first platform where product reviews can't lie."
**Angle #1.** Erisan replied "Sure, let me see" to the sketch we offered: the current site drops a first-time visitor straight into a review feed, so someone who has never posted never learns why Revios beats the reviews they skim on Amazon, and they leave before contributing. This is a homepage that earns that trust in the first few seconds.

## Governing concept (v2, research-grounded, "level 1500")
A scroll-driven, cinematic story engineered on real behavioural science and real
2026 data, not decoration. The emotional arc: HOPE (a real human review already
playing) -> THE CRISIS (a dark, dread beat where real cited stats count up and a
wall of fake 5-star reviews gets stamped BOT / AI WRITTEN / PAID / FAKE) -> THE
TURN (light returns; a real *negative* review proves honesty; "you cannot fake a
face and a voice", backed by Edelman 2026) -> WHY IT'S TRUE (pillars) -> THE WORLD
(real trending) -> YOUR VOICE (gamified add-a-review + Reviewer of the Week ring)
-> PEAK-END ("never get fooled by five stars again"). Mechanisms: kinetic hero
type, count-ups, the fake-wall stamping, magnetic cursor-following CTAs, cursor
glow, playing waveform + captions, reveal-on-scroll, a light->dark->light journey
that does the emotional work. Grounded in: interactive content converts ~93%
better than static; peer video is the most-trusted format (Edelman 2026); 71%
abandon brands they find manipulative, so honesty (real stats, real content,
showing the negative) IS the conversion strategy.

## What is real
- **Brand:** Revios's own logo (the teal peace-sign mark), its teal (#66A5AD) palette, product photos and content, pulled from revios.net.
- **Trending reviews:** the real trending list from the site — real review titles and real usernames (@damicoco, @jedidiah, @jacy-mic123, @hazelkim22, @woungliem, @gloria, @rich_love234). Real product thumbnails used where the title-to-product pairing is certain (Facefacts Ceramide gel, Sonic toothbrush, Pears baby oil); category-tinted tiles elsewhere so no image is mispaired.
- **Reviewer of the Week:** real — Erisan told us Revios rewards the two most helpful reviews each week.

## What is demo / labelled
- The "text review" example (Anon_buyer_92, "Amazing product!!!") is illustrative, to contrast against a real Revios review.
- User avatars are monograms, not real face photos, so no portrait is shown unverified.
- No invented star ratings or metrics. Footer states it is an ASTRA-built sample using Revios's own real content, not affiliated.

## Interaction / QA
- Hero flip (text vs real) with auto-reveal + playing waveform; category filter on the trending grid; per-card play affordance; reveal-on-scroll.
- Trending cards are pre-rendered in HTML so they render with JS off.
- Playwright: 0 console errors, 0 overflow at 1280/1024/768/414/390/360, no broken images, flip + player + Tech filter (3 of 8) all work, no-JS shows all 8 cards + 21 reveals.
- Self-contained single file: 6 woff2 faces + logo + 3 product images embedded.

**Artifact:** state/prototypes/revios/index.html
**Bytes:** 306263
**sha256:** 61b75113c4b66ad34fd9f7425387b073d5ccd33b0bc6863bd67829845397531a
**Netlify site (to create):** astra-revios-prototype
