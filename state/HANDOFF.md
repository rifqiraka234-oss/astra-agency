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

3. **Voortman & Baumhauer** (Rosalie Voortman) — NOT DONE.
   - `state/prototypes/voortman-baumhauer/` exists but is empty.
   - First attempt crashed on a platform session-limit error mid-build with
     zero output. Second attempt was relaunched as background agent
     `ae43d72f5ebd6a641` in this session, prompted to do self-QA scoring
     EARLY (not as the last step) to avoid losing the real work to another
     possible session-limit crash. As of this handoff it had not yet
     reported completion.
   - Whoever picks this up: check whether that background agent produced
     anything before assuming zero progress (previous crashes still left
     complete files behind twice out of three times). If still empty,
     relaunch it fresh following `docs/prototype-build-spec.md` Steps 1-9,
     using the other two research summaries above as the quality/rigor bar.
   - Netlify site name to use: `astra-voortman-baumhauer-prototype`.

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
