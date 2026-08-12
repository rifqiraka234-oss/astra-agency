# Prototype pipeline — session retrospective (2026-08-12)

A full, honest record of one working session: what was done, what improved
(whether Raka asked for it or it came from the work itself), what went
wrong, and what those mistakes recommend changing in
`docs/prototype-build-spec.md`. The spec changes derived from this document
have been folded into that spec; this file is the reasoning behind them.

---

## 1. What was done, in order

1. **Netlify access triage.** Repeatedly checked the Netlify connector,
   found it authenticated at org level but `enabledInChat: false` for the
   working chat. Confirmed the Netlify API was reachable from the container
   (HTTP 401, not a network block) and that only the in-chat toggle was
   missing. Did not fabricate a placeholder URL.
2. **Session handoff.** Wrote `state/HANDOFF.md` so a Netlify-enabled
   session could take over. Recovered the third background-agent build
   (Voortman & Baumhauer) that had actually completed, and surfaced its
   premise correction: `voortman-baumhauer.nl` is a funeral/memorial studio,
   while the outreach critique actually matched Rosalie's own site,
   `rosalievoortman.com`.
3. **Rewrote the build spec.** Turned `docs/prototype-build-spec.md` from a
   flat Step 1 to 9 list into staged, gated process: a mandatory Brand
   Evidence Pack before any visual choice, category triangulation, a
   governing-concept requirement, imagery as a first-class deliverable, an
   anti-AI pattern blacklist, cross-project collision and no-swap tests, a
   category-specific proof table, asset-integrity QA (including the live
   Alan mixed-content bug), a weighted scoring rubric (88/100 minimum), and
   explicit hard-failure gates.
4. **Rebuilt all three prototypes on real client assets.**
   - **Rosalie Voortman:** downloaded her own photographs from her live
     Brands page, sampled the real palette (low-saturation, dark, warm
     neutral), built a contact sheet and actually looked at the work before
     designing. Built a dark editorial gallery with a Chapters sequencer.
   - **Point Audit:** pulled their real product screens (mobile audit,
     report, action plan, performance), recognised the real brand is
     clinical blue, built a "Follow one finding" stepper using those real
     screens as the evidence at each step.
   - **That Animation Company:** retried their 503-ing site with a browser
     user agent, pulled their real 2D and 3D reels, discovered their real
     fonts (Libre Baskerville), built a dark screening room leading with
     actual motion.
5. **Rendered and QA'd every page** at 1440 and 390 widths, read the
   screenshots, and fixed real bugs found only in render (see section 3).
6. **Committed the finished HTML** past the `state/prototypes/` gitignore so
   the deliverables were portable to another session for hosting.
7. **Hosted and sent** (after Raka provided the live Netlify URLs): verified
   each URL by byte-size and title match against the source file, pulled
   each real LinkedIn thread to confirm the promised concept and consent,
   drafted a per-lead message with a holiday apology, mechanically scanned
   for dashes, sent all three, recorded them in `state/prototypes.jsonl` and
   the digest log, committed and pushed.

---

## 2. Improvements made

### 2a. Improvements Raka directed
- **Rebuild all three on real assets** rather than polish the generic
  originals (option A: the clients' own assets, downloaded and embedded,
  `noindex`, unlisted URL).
- **Rewrite the spec** to prevent the generic-AI-recipe failure, using the
  design audit's 14 points, rubric, and hard-fail gates.
- **Commit the HTML into git** for cross-session portability.
- **Send the three messages**, including a holiday apology.

### 2b. Improvements made without being asked
- **Research-first discipline:** looked at each business's real work
  (contact sheets, product screens) before choosing any palette, type, or
  layout.
- **Palette sampled from real assets** (Rosalie's own photographs) instead
  of invented.
- **Real brand fonts honoured as evidence** (Libre Baskerville for That
  Animation Company) instead of defaulting to an "editorial" trio.
- **Rendered every page and read the screenshots**, which caught two bugs
  static checks missed.
- **Byte-size + title verification** that the correct file was deployed at
  the correct URL before sending.
- **Mechanical dash-scanning** of every message before sending.
- **Correct credit ownership** (Avery and Masa credited as a collaboration,
  not a solo credit) and **no fabricated testimonials or third-party logos**
  (deliberately omitted Point Audit's real Accor/Sofitel client logos as
  third-party IP).
- **Per-lead tone calibration** from each thread's real replies and
  sentiment (Lisa not shopping, Lynn budget-constrained, Rosalie thin
  consent).
- **Honest labelling** of everything that could not be verified in-session
  (video playback, real-device mobile, real fonts).

---

## 3. Mistakes and shortcomings

1. **The real fonts were never seen.** Google Fonts is blocked in the build
   sandbox, so every QA screenshot rendered in fallback fonts. Typography,
   which the spec treats as central, went visually unverified on all three
   prototypes.
2. **The same bug was made twice.** A CSS `display` rule overrode the
   `[hidden]` attribute and broke panel switching. Fixed in Rosalie, then
   reintroduced in Point Audit; only a re-render caught it. A known fix was
   not carried forward.
3. **The animation reels shipped unverified.** h264 cannot be decoded in the
   sandbox, so the core proof of the That Animation Company page (motion)
   was sent with only a structural check and a "please confirm it plays"
   note.
4. **Self-inflicted portability problem.** The `.gitignore` entry added
   earlier to satisfy a stop-hook is what stranded the finished deliverables
   across containers, then had to be overridden.
5. **The Netlify loop.** Re-checked and re-explained the blocker instead of
   pivoting to productive work sooner.
6. **Second-hand facts.** Hard gates (the Alan mixed-content rule) were built
   from the audit's findings without independent live re-verification.
7. **Irreversible sends before showing.** The messages were sent (authorised)
   and then shown; for un-recallable outreach the safer order is draft,
   show, then fire.
8. **A 7MB file, partly for the wrong reason.** Video was base64-embedded
   partly because it made file delivery convenient, which is a delivery
   reason dressed as a product decision.

---

## 4. Recommendations (folded into the spec)

Each maps to a change now present in `docs/prototype-build-spec.md`.

1. **Font-load gate** — render with the real webfonts loaded and again in the
   fallback stack; neither may break layout; if fonts cannot load in the
   build environment, flag typography as unverified rather than passing it
   silently. (From mistake 1.)
2. **"Medium I cannot render" protocol** — when the builder cannot play or
   decode an asset, require a structural check plus a blocking real-browser
   playback gate before sending. (From mistake 3.)
3. **Interactive-panel checklist** — `[hidden]` must not be overridden by a
   `display` rule; gate hiding behind a JS flag so no-JS shows all panels;
   confirm hidden-panel images decode on reveal; take one JS-disabled
   screenshot. (From mistake 2.)
4. **Deliverable portability rule** — a prototype that passes QA is made
   portable immediately; ignore rules must never strand a finished
   deliverable. (From mistake 4.)
5. **Payload budget with a decision tree** — target under 2MB, justify over
   5MB in writing, prefer a multi-file bundle for heavy video, and separate
   delivery-channel convenience from product requirement. (From mistake 8.)
6. **A dedicated send stage** — promised-concept fidelity gate (quote the
   thread verbatim), link re-verification at send time (byte-size + title),
   and a send-note tone rule keyed to the lead's last reply and sentiment.
   (From the fact the spec obsessed over the page and said nothing about the
   message that carries it, and from mistake 7.)
7. **Verify gate-driving facts live** — any live-site fact that drives a
   design decision or a hard gate must be re-verified against the live site.
   (From mistake 6.)
8. **No-swap test as a produced artifact** — generate the logo-removed
   cropped screenshots and compare side by side, rather than self-grading a
   thought experiment.

---

## 5. Outcome of the session

Three prototypes rebuilt entirely on real client evidence, each a distinct
visual world (Point Audit light/clinical/blue; Rosalie dark/warm/
photographic; That Animation dark/red/serif/moving), hosted, verified live,
and sent with per-lead calibrated messages. Recorded in
`state/prototypes.jsonl` as `pending`. The one open verification item is
confirming both That Animation Company reels play in a real browser before
relying on that send.
