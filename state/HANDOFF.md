# Handoff note — prototype build & hosting pipeline

Written 2026-08-11 because Netlify is enabled in a different session than this
one; picking up there needs this exact state. Delete this file once hosting
is done and the leads are sent (it's a handoff scratch note, not permanent
documentation).

## Where things stand

All doc/spec/state work is committed and pushed to
`claude/workflow-docs-update-cxm8ih` (HEAD `6bb4816`). Nothing local is
uncommitted. The inbox recheck (Silent Accepted queue, v0.2 auto-message
check, 4 resolved threads) is done and pushed. Three prototype builds were
kicked off for the "Ready for a mockup" leads surfaced by that recheck.

## Prototype build status (3 total)

Prototype HTML/research files are gitignored on purpose
(`state/prototypes/` — see `.gitignore` and CLAUDE.md's own note that these
are working artifacts, not repo content). That means **they exist only on
this container's disk right now** and will NOT be visible in a fresh
session/container unless copied over first.

1. **Point Audit** (Lisa Bouamra) — DONE, reviewed, sound.
   - `state/prototypes/point-audit/Point_Audit_Prototype.html` (39369 bytes,
     816 lines)
   - `state/prototypes/point-audit/Point_Audit_Research_Summary.md`
   - Checked: valid DOCTYPE, viewport meta, external deps limited to Google
     Fonts + 3 Pexels image URLs, zero dead `href="#"`, has
     `prefers-reduced-motion`.
   - Concept: "Group Command Center" interactive multi-property dashboard,
     fictional 9-property demo ("Riva & Aubert Hotels"), clearly labelled
     illustrative in 3 places.
   - Important: Lisa said she's not currently shopping for this. The send
     note must stay low-key, no pressure, no call ask, per the research
     summary's explicit instruction.
   - Netlify site name to use: `astra-point-audit-prototype`.

2. **That Animation Company** (Lynn Chadwick / Steve Cooke) — DONE, reviewed,
   sound.
   - `state/prototypes/that-animation-company/ThatAnimationCompany_Prototype.html`
     (31150 bytes, 863 lines)
   - `state/prototypes/that-animation-company/ThatAnimationCompany_Research_Summary.md`
   - Checked: valid lowercase doctype, external deps limited to Google Fonts
     only (no images, deliberate), one `href="#"` traced and confirmed
     non-dead (JS sets a real mailto: href on page load via `render()` at
     line 859).
   - Concept: standalone "Production Partner" page, 2D/3D proof side by
     side, 3-step scope tool replacing the blank-email contact page. Scoped
     to fit their existing GoDaddy site, not a redesign, respects Lynn's
     stated budget constraint.
   - Netlify site name to use: `astra-that-animation-company-prototype`.

3. **Voortman & Baumhauer / Rosalie Voortman** — DONE, agent-reviewed with
   high self-QA scores, still needs a human sanity read before sending
   given the premise correction below.
   - `state/prototypes/voortman-baumhauer/VoortmanBaumhauer_Prototype.html`
     (385KB, single self-contained file, images embedded as base64, only
     external dep is Google Fonts)
   - `state/prototypes/voortman-baumhauer/VoortmanBaumhauer_Research_Summary.md`
     (170 lines)
   - Checked: 0 dead `href="#"`, `prefers-reduced-motion` present, JS
     syntax-checked with `node --check`.
   - **Important premise correction found during research, read before
     sending anything:** the original brief assumed "Voortman & Baumhauer"
     was one wedding+funeral business with brand work buried inside. Live
     evidence doesn't support that. There are two separate real sites:
     `voortman-baumhauer.nl` (joint brand with Malou von Baumhauer) is
     **100% funeral/memorial photography** (uitvaartfotografie), nothing
     else on it. The site that actually matches the original outreach
     critique (mixed Dutch/English, wedding-led, a buried "Brands" chapter)
     is Rosalie's **own separate site, `rosalievoortman.com`**, which
     already has a real (if thin) Brands page with three published
     packages (€450/€695/€995). The agent built the prototype against that
     real page, not the funeral-photography joint site. This is flagged in
     the research summary as a hypothesis not yet confirmed by Rosalie
     herself, and is worth a one-line confirmation before sending: make
     sure the outreach thread this replies to was actually about
     `rosalievoortman.com`, not the funeral-photography joint brand, before
     using this prototype.
   - Concept: "One shoot, everywhere it needs to work" — pick one of 3
     illustrative small-business archetypes, then a destination (Website
     Hero / Instagram Grid / Press Kit / Pitch Deck); same photo drops into
     all 4 live mockups while a problem/direction/use panel updates
     alongside. Reuses Rosalie's real chapter names and real pricing
     verbatim. Bespoke film-contact-sheet design motif (Fraunces + Work
     Sans + Caveat), distinct from the other two prototypes.
   - Self-QA came back 8-10/10 across all 10 criteria; only mobile
     experience scored 8 (CSS/DOM verified statically, never opened in an
     actual browser/device since none was available to that agent) — do an
     actual browser open before sending, not just a code read.
   - One cosmetic loose end: the HTML `<title>` tag still reads "For Your
     Brand — Rosalie Voortman Photography" (generic), left over from before
     the premise correction; worth a quick check that no other stray
     "brand photography" boilerplate slipped through elsewhere in the copy.
   - Netlify site name to use: `astra-voortman-baumhauer-prototype`
     (keeping this name since it matches how the lead is filed in lemlist,
     even though the actual site being pitched is `rosalievoortman.com`).

## Netlify hosting (blocked in this session, should work in the other one)

- Naming convention: `astra-[company-slug]-prototype`, lowercase, spaces to
  hyphens, strip anything not alphanumeric/hyphen. Never a generic
  auto-generated subdomain.
- Deploy each single HTML file as its own new Netlify site under that name.
- **Visually confirm each deployed URL loads correctly, desktop and mobile,
  before sending it anywhere.** Do not send an unverified link.

## After hosting: sending

Send each prototype link to its lead via lemlist `send_message` (channel
linkedin, sendUserId `usr_27bdxG7jzTn2rucGB`), voice per
`docs/astra-master-context.md` section 9, no-dash guardrail applies to the
message text (not the Netlify URL slug, hyphens there are structural).

- **Lisa Bouamra (Point Audit):** low-pressure, "we already had this
  sketched, thought it might be useful," no urgency, no call ask.
- **Lynn Chadwick (That Animation Company):** brief, respects her stated
  budget constraint, frames it as a small add-on not a redesign.
- **Rosalie Voortman:** tailor once her prototype/research summary exists;
  her prior consent was a thin "OK" so keep it low friction.

After each send, append a row to `state/prototypes.jsonl`:
`date, contactId, companyName, promisedConcept, angleNumber, netlifyUrl,
researchSummaryPath, sentAt, outcome: "pending"`. Commit and push.

## Also still pending, separate from the prototype pipeline

- Dr. Ragueneau: a Stalled check-in nudge was drafted in the inbox recheck
  (Calendly call booked for 2026-08-07, date passed, no follow-up either
  way) but explicitly held back per an earlier instruction ("send them all,
  except the gilrisk one" was ambiguous on this one) — do not send without
  fresh explicit approval.

## Files to check first in the new session

1. This file.
2. `CLAUDE.md` "Prototype build and meeting booking" section — full
   mechanics (hosting/retry/meeting-booking/briefing).
3. `docs/prototype-build-spec.md` — the actual research/build quality bar.
4. `state/prototypes/` on disk (only present on a container that inherits
   this one's filesystem — otherwise copy the two completed HTML+summary
   pairs above across manually before doing anything else, since they took
   real research work to produce).
