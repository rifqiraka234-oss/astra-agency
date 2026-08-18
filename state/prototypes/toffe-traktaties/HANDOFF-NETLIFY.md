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

- byte size: `1955863`
- sha256: `1a2219e00bfdb1ba10474a6b5814e3ea781e19ec6af4de690861e05435ed6c9a`
- `<title>`: `Toffe Traktaties — Originele kant-en-klare traktaties, zelf ontworpen`

```bash
stat -c%s state/prototypes/toffe-traktaties/index.html   # expect 1955863
sha256sum state/prototypes/toffe-traktaties/index.html   # expect 1a2219e00b...
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
2. `curl -s https://astra-toffetraktaties-prototype.netlify.app | wc -c` matches `1955863`.
3. `curl -s https://astra-toffetraktaties-prototype.netlify.app | sha256sum` matches the hash above.
4. The `<title>` on the live URL matches exactly.
5. Open it and confirm: the hero product photo loads, the assortment gallery
   (18 photos) all load, the personalisation photo loads, and every button
   (Bekijk het assortiment, Iets speciaals nodig, FAQ links, footer links)
   points to a real toffetraktaties.nl URL, not a dead link.

**Then report back the live URL plus those check results. Do not send the
link to Hein yourself** — outreach for this one stays with Raka. The message
is already drafted and waiting.

---8<--- PROMPT ENDS ---8<---

## Context for whoever picks this up

Hein Bilterijst already asked for this directly ("Wel even benieuwd wat je
hebt. Wat wilde je sturen?"). He is expecting a link, not a video. The page
carries `noindex, nofollow` on purpose since it is an unlisted concept for one
recipient. Full reasoning and the Brand Evidence Pack are in `RATIONALE.md`
next to this file — internal only, never for the client.
