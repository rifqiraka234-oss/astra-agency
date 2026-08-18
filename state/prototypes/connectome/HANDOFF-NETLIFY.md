# Netlify handoff — Connectome prototype

The Netlify connector is not available in the session that built this
(`enabledInChat: false`, no CLI on PATH, no `NETLIFY_AUTH_TOKEN` in the
container — all three re-checked on 2026-08-18). Everything below is what a
Netlify-enabled session needs to deploy it. **Copy the block between the
markers as the prompt for that session.**

---8<--- PROMPT STARTS ---8<---

Please deploy one finished HTML file to Netlify as a new site. Do not edit the
file in any way.

**Repo:** `rifqiraka234-oss/astra-agency`
**Branch:** `claude/workflow-docs-update-cxm8ih`
**File:** `state/prototypes/connectome/index.html`

Note: `state/prototypes/` is listed in `.gitignore`, but this file was
deliberately force-added, so a fresh clone of that branch will contain it. If
`git clone` plus `git checkout claude/workflow-docs-update-cxm8ih` does not
show the file, run `git ls-files state/prototypes/connectome/` to confirm it
is tracked before assuming it is missing.

**Verify you have the right file before deploying:**

- byte size: `1233017`
- sha256: `4e987716c04a2158c010a1d12f8a30bffba9da647354ce643f1b5c20dfe66a9b`
- `<title>`: `Connectome — Brain measurement studio, Soho London`

```bash
stat -c%s state/prototypes/connectome/index.html   # expect 1233017
sha256sum state/prototypes/connectome/index.html   # expect 4e987716c0...
```

If either value differs, stop and say so rather than deploying. A mismatch
means the branch moved on and the build needs re-verifying.

**Site name (exact):** `astra-connectome-prototype`
So the URL should be `https://astra-connectome-prototype.netlify.app`.
Do not accept a random Netlify subdomain; if that name is taken, report back
rather than inventing a different one.

**Deploy:** it is a single self contained file. Everything (fonts, images,
CSS, JS) is inlined, so there are no other assets to upload and no build step.
Deploy it as `index.html` at the site root.

**After deploying, confirm the deploy is real, do not just eyeball that a page
loaded:**

1. `curl -sI https://astra-connectome-prototype.netlify.app` returns `200`.
2. `curl -s https://astra-connectome-prototype.netlify.app | wc -c` matches
   `1233017`.
3. `curl -s https://astra-connectome-prototype.netlify.app | sha256sum`
   matches the hash above.
4. The `<title>` on the live URL matches exactly.
5. Open it and click through all six nav items (The visit, Your baseline,
   What you receive, How it works, Soho studio, Book a scan). Each should
   swap the whole view. On "Your baseline", click all five visit buttons and
   confirm the chart gains a point each time and the reading text changes.

**Then report back the live URL plus those check results. Do not send the link
to the lead yourself** — outreach for this one stays with Raka. The message is
already drafted and waiting.

---8<--- PROMPT ENDS ---8<---

## Context for whoever picks this up

- The lead is Lucas Scherdel, Co-Founder and CEO of Connectome. He replied
  "is it a video?" on 2026-08-18 and was told it is a short webpage mockup
  walking through a scan visit end to end. He is expecting it.
- The page carries `<meta name="robots" content="noindex, nofollow">` on
  purpose, since it is an unlisted concept for one recipient.
- Full reasoning, evidence sourcing and the coverage ledger are in
  `RATIONALE.md` next to this file. That document is internal, for Raka and
  the next builder. It must never be sent to the client.
