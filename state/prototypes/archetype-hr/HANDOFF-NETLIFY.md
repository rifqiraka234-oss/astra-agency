# Netlify handoff — Archetype HR prototype

The Netlify connector is not available in this build session (no `enabledInChat`,
no CLI, no token — same constraint as every prior build). Copy the block below
as the prompt for a Netlify-enabled session.

---8<--- PROMPT STARTS ---8<---

Please deploy one finished HTML file to Netlify as a new site. Do not edit the
file in any way.

**Repo:** `rifqiraka234-oss/astra-agency`
**Branch:** `claude/workflow-docs-update-cxm8ih`
**File:** `state/prototypes/archetype-hr/index.html`

Note: `state/prototypes/` is listed in `.gitignore`, but this file was
deliberately force-added, so a fresh clone of that branch will contain it. If
`git clone` plus `git checkout claude/workflow-docs-update-cxm8ih` does not
show the file, run `git ls-files state/prototypes/archetype-hr/` to confirm
it is tracked before assuming it is missing.

**Verify you have the right file before deploying:**

- byte size: `274011`
- sha256: `1d3058b52981ab308cba5ed19f3cf68a1a16eed25b27d2472d11f3d12c4384ba`
- `<title>`: `Archetype HR — See the walkthrough`

```bash
stat -c%s state/prototypes/archetype-hr/index.html   # expect 274011
sha256sum state/prototypes/archetype-hr/index.html   # expect 1d3058b529...
```

If either value differs, stop and say so rather than deploying.

**Site name (exact):** `astra-archetypehr-prototype`
So the URL should be `https://astra-archetypehr-prototype.netlify.app`.
Do not accept a random Netlify subdomain; if that name is taken, report back
rather than inventing a different one.

**Deploy:** single self contained file, everything inlined, no build step.
Deploy as `index.html` at the site root.

**After deploying, confirm the deploy is real:**

1. `curl -sI https://astra-archetypehr-prototype.netlify.app` returns `200`.
2. `curl -s https://astra-archetypehr-prototype.netlify.app | wc -c` matches `274011`.
3. `curl -s https://astra-archetypehr-prototype.netlify.app | sha256sum` matches the hash above.
4. The `<title>` on the live URL matches exactly.
5. Open it and confirm: the step-rail navigation switches between all 5
   stages (Survey Design, Employee Participation, Analysis & Reporting,
   Manager Review, Better Conversations), the archetype profile bars render,
   the manager dashboard table renders with status pills, and both founder
   photos (Jori Chykerda, Greg Hussey) load correctly in the closing stage.

**Then report back the live URL plus those check results. Do not send the
link to Jori yourself** — outreach for this one stays with Raka.

---8<--- PROMPT ENDS ---8<---

## Context for whoever picks this up

Jori Chykerda (Co-Founder & CEO, Archetype HR) replied to the original
prototype offer with "we have already prototyped this. What exactly did
your team put together?" — Raka's explicit direction was to build something
"MIND BLOWING" in response, since Jori's own team apparently already built
something internally. This build is a full interactive walkthrough of
Archetype HR's own real 5-stage process, centered on one fictional employee
record end to end, including a real archetype profile screen and manager
dashboard screen that do not exist anywhere on Archetype HR's live site
today. Both founder photos are mechanically verified against the client's
own `/about/` page via `tools/verify_portraits.py` (PASS on both). The page
carries `noindex, nofollow` since it is an unlisted concept for one
recipient. Full reasoning and the Brand Evidence Pack are in `RATIONALE.md`
next to this file — internal only, never for the client.
