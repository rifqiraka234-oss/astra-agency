# Handoff note — prototype rebuilds & hosting

Updated 2026-08-12. All three prototypes have been **rebuilt from scratch on
real client assets** after a design audit found the first versions were
strategically fine but visually generic and interchangeable, and failed the
new spec's hard gates (`docs/prototype-build-spec.md`, rewritten same day).

Delete this file once all three are hosted and sent.

## Status: all three rebuilt, QA'd, sent to Raka. Not yet hosted.

Nothing was ever sent to any lead (state/prototypes.jsonl is still empty),
so there is no "old link" to replace. Hosting will produce fresh URLs.

Prototype folders live under `state/prototypes/` (gitignored by design, so
they are on THIS container's disk only, not in git). Each was also sent to
Raka directly via the chat, so he has the HTML files in hand.

### 1. Rosalie Voortman — `state/prototypes/rosalie-voortman/`
- `RosalieVoortman_Prototype.html` (~1.6MB) + `RosalieVoortman_Research_Summary.md`
- Rebuilt entirely on HER OWN real photography (Aimee the Label FW26, Aimee
  at Modefabriek, interiors, on-location), pulled from rosalievoortman.com.
  Zero stock. Dark gallery, Familjen Grotesk, "Chapters" tab sequencer.
- Self-score 92/100. Netlify name: `astra-rosalie-voortman-prototype`.
- Note: built against rosalievoortman.com (her wedding/brand site), NOT the
  funeral-photography joint brand voortman-baumhauer.nl. Confirm the thread
  was about her own brand work before sending.

### 2. Point Audit — `state/prototypes/point-audit-v2/`
- `PointAudit_Prototype.html` (~490KB) + `PointAudit_Research_Summary.md`
- Rebuilt on THEIR real product screens (mobile audit, report, action plan,
  performance). No stock hotels, no invented "Riva Aubert" data. Clinical
  blue, Schibsted Grotesk, "Follow one finding" stepper.
- Self-score 91/100. Netlify name: `astra-point-audit-prototype`.
- Low-pressure send for Lisa (she said she's not shopping). English page on a
  French product = deliberate; flag to her.

### 3. that Animation Company — `state/prototypes/that-animation-v2/`
- `ThatAnimationCompany_Prototype.html` (~7MB, real video embedded) +
  `ThatAnimationCompany_Research_Summary.md`
- Rebuilt to LEAD WITH MOTION: their real 2D reel + real 3D turntable,
  embedded and playing. Old build had zero video. Their real fonts (Libre
  Baskerville), real red, honest credit ownership (Avery & Masa credited as
  a collaboration, not solo).
- Self-score 90/100, ONE caveat: video playback could not be visually
  confirmed in-session (sandbox Chromium can't decode h264). **Open it in a
  real browser and confirm both reels play before sending.**
- Netlify name: `astra-that-animation-company-prototype`.

## Hosting (still the one blocker)
Netlify connector is authenticated at org level but `enabledInChat:false`
for the working chat, so it can't be driven from here. Options:
1. Enable Netlify for the chat (UI toggle), then deploy each folder.
2. Host from the other session where Netlify is already enabled (would need
   the files copied across — they're gitignored, so not automatic).
3. Raka drags each sent HTML onto Netlify Drop manually (no tool needed).
Whichever path: deploy under the `astra-[slug]-prototype` names above,
`noindex` is already set on each page, and confirm each live URL loads on
desktop and mobile before sending.

## After hosting: sending
Per lead, low-friction message, no-dash guardrail on the message text (not
the URL). Then append a row to `state/prototypes.jsonl` per lead
(date, contactId, companyName, promisedConcept, angleNumber, netlifyUrl,
researchSummaryPath, sentAt, outcome:"pending") and commit.

## Still pending, separate
- Dr. Ragueneau: a Stalled check-in nudge was drafted but held back pending
  explicit approval. Do not send without it.
