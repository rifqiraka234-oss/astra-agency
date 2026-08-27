# Netlify handoff — Zynox prototype

The Netlify connector is not available in this build session. Copy the block
below into a Netlify-enabled session to deploy. Do not edit the HTML.

---8<--- PROMPT STARTS ---8<---

Please deploy one finished HTML file to Netlify as a new site. Do not edit
the file in any way.

**Repo:** `rifqiraka234-oss/astra-agency`
**Branch:** `claude/workflow-docs-update-cxm8ih`
**File:** `state/prototypes/zynox/index.html`

Note: `state/prototypes/` is in `.gitignore`, but this file was force-added,
so a fresh clone of that branch contains it. If it seems missing, run
`git ls-files state/prototypes/zynox/` to confirm it is tracked.

**Verify you have the right file before deploying:**

- byte size: `1412285`
- sha256: `e893db5e35a03c9c5732ec8403564a462731f5e30b0091c69f0861fb932ae8a8`
- `<title>`: `Zynox — CNC draai- en freesmachines, tot op de micron`

```bash
stat -c%s state/prototypes/zynox/index.html   # expect 1412285
sha256sum state/prototypes/zynox/index.html   # expect e893db5e35...
```

If either value differs, stop and say so rather than deploying.

**Site name (exact):** `astra-zynox-prototype`
So the URL should be `https://astra-zynox-prototype.netlify.app`.
Do not accept a random Netlify subdomain; if that name is taken, report back
rather than inventing a different one.

**Deploy:** single self-contained file, everything inlined, no build step.
Deploy as `index.html` at the site root.

**After deploying, confirm the deploy is real:**

1. `curl -sI https://astra-zynox-prototype.netlify.app` returns `200`.
2. `curl -s https://astra-zynox-prototype.netlify.app | wc -c` matches `1412285`.
3. `curl -s https://astra-zynox-prototype.netlify.app | sha256sum` matches the hash.
4. The `<title>` on the live URL matches exactly.
5. Open it and confirm: the dark machine-hall hero loads, the catalog shows
   18 machines with real specs and "Prijs op aanvraag" (no €0,00), the
   category filter works, clicking "Bekijk machine" opens a machine-detail
   view with a full spec table, and the offerte form validates and shows a
   success state.

**Then report back the live URL plus those check results.** Outreach to Cas
Maasakkers (the lead) stays with Raka / the session driving his thread.

---8<--- PROMPT ENDS ---8<---

## Context
Cas Maasakkers (co-owner, Zynox) asked to see this after the silent-accepted
opener about the €0,00 pricing. The page carries `noindex, nofollow`. Full
reasoning and the score are in `RATIONALE.md` next to this file — internal
only, never for the client.
