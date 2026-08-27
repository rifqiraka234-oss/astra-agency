# Netlify handoff — HotGreen prototype

Netlify connector not available in this build session. Copy the block below
into a Netlify-enabled session. Do not edit the HTML.

---8<--- PROMPT STARTS ---8<---

Please deploy one finished HTML file to Netlify as a new site. Do not edit
the file in any way.

**Repo:** `rifqiraka234-oss/astra-agency`
**Branch:** `claude/workflow-docs-update-cxm8ih`
**File:** `state/prototypes/hotgreen/index.html`

Note: `state/prototypes/` is in `.gitignore`, but this file was force-added,
so a fresh clone of that branch contains it. If it seems missing, run
`git ls-files state/prototypes/hotgreen/` to confirm it is tracked.

**Verify you have the right file before deploying:**

- byte size: `212710`
- sha256: `b1d902f855e82e36cf4bf864da387395c725de76580533d259de87f733410732`
- `<title>`: `HotGreen — ultra-efficient low carbon steam for industry`

```bash
stat -c%s state/prototypes/hotgreen/index.html   # expect 212710
sha256sum state/prototypes/hotgreen/index.html   # expect b1d902f855...
```

If either value differs, stop and say so rather than deploying.

**Site name (exact):** `astra-hotgreen-prototype`
So the URL should be `https://astra-hotgreen-prototype.netlify.app`.
Do not accept a random Netlify subdomain; if that name is taken, report back
rather than inventing a different one.

**Deploy:** single self-contained file, everything inlined, no build step.
Deploy as `index.html` at the site root.

**After deploying, confirm the deploy is real:**

1. `curl -sI https://astra-hotgreen-prototype.netlify.app` returns `200`.
2. `curl -s https://astra-hotgreen-prototype.netlify.app | wc -c` matches `212710`.
3. `curl -s https://astra-hotgreen-prototype.netlify.app | sha256sum` matches the hash.
4. The `<title>` on the live URL matches exactly.
5. Open it and confirm: the animated thermal hero renders (cold-to-hot
   particle field), the heat-pump cycle diagram and the isothermal-vs-
   adiabatic chart both draw, the three-audience cards set the contact form
   role, the FAQ items open, and the contact form validates and shows a
   success state. Check reduced-motion falls back to a static gradient.

**Then report back the live URL plus those check results.** Outreach to
Georgia Ware (the lead) stays with Raka / the session driving her thread.

---8<--- PROMPT ENDS ---8<---

## Context
Georgia Ware (CEO, HotGreen Solutions) replied "yes please" and said they are
mid-redesign — so this doubles as a reference for that redesign. The page is
`noindex, nofollow`. Full reasoning and score are in `RATIONALE.md` — internal
only, never for the client.
