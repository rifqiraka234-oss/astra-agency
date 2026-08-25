# Netlify handoff — Toffe Traktaties prototype

The Netlify connector is not available in this build session (no `enabledInChat`,
no CLI, no token — same constraint as every prior build). Copy the block below
as the prompt for a Netlify-enabled session.

---8<--- PROMPT STARTS ---8<---

Please deploy one finished HTML file to Netlify as a new site. Do not edit the
file in any way.

**Repo:** `rifqiraka234-oss/astra-agency`
**Branch:** `claude/workflow-docs-update-cxm8ih`
**File:** `state/prototypes/toffe-traktaties/index.html`

Note: `state/prototypes/` is listed in `.gitignore`, but this file was
deliberately force-added, so a fresh clone of that branch will contain it. If
`git clone` plus `git checkout claude/workflow-docs-update-cxm8ih` does not
show the file, run `git ls-files state/prototypes/toffe-traktaties/` to
confirm it is tracked before assuming it is missing.

**Verify you have the right file before deploying:**

- byte size: `2492541`
- sha256: `a0247e5111d5f9d24ca74e2d57ead00e1b681acb584a3d3196c80de90da10c7d`
- `<title>`: `Toffe Traktaties — Kant-en-klare traktaties met naam en leeftijd`

```bash
stat -c%s state/prototypes/toffe-traktaties/index.html   # expect 2492541
sha256sum state/prototypes/toffe-traktaties/index.html   # expect a0247e5111...
```

If either value differs, stop and say so rather than deploying.

**Site name (exact):** `astra-toffetraktaties-prototype`
So the URL should be `https://astra-toffetraktaties-prototype.netlify.app`.
Do not accept a random Netlify subdomain; if that name is taken, report back
rather than inventing a different one.

**Deploy:** single self contained file, everything inlined, no build step.
Deploy as `index.html` at the site root.

**After deploying, confirm the deploy is real:**

1. `curl -sI https://astra-toffetraktaties-prototype.netlify.app` returns `200`.
2. `curl -s https://astra-toffetraktaties-prototype.netlify.app | wc -c` matches `2492541`.
3. `curl -s https://astra-toffetraktaties-prototype.netlify.app | sha256sum` matches the hash above.
4. The `<title>` on the live URL matches exactly.
5. Open it and confirm: real products with prices show in the first screen
   (four in the hero, then a grid of 25), the date-and-occasion check tool
   returns a verdict, the class-size calculator updates the total and the
   free-shipping bar, all 25 product photos load, and every button points to
   a real toffetraktaties.nl URL (product, category, shop, cart), not a dead
   link.

**This is a redeploy of the same site.** It replaces the previous version at
`astra-toffetraktaties-prototype.netlify.app` in place, so Hein's existing
link shows the revised page. Same site name, new content.

**Then report back the live URL plus those check results. Do not send
anything to Hein yourself** — outreach for this one stays with Raka.

---8<--- PROMPT ENDS ---8<---

## Context for whoever picks this up

Hein Bilterijst already asked for this directly ("Wel even benieuwd wat je
hebt. Wat wilde je sturen?"). He is expecting a link, not a video. The page
carries `noindex, nofollow` on purpose since it is an unlisted concept for one
recipient. Full reasoning and the Brand Evidence Pack are in `RATIONALE.md`
next to this file — internal only, never for the client.
