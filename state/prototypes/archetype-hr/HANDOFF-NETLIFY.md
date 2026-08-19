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

- byte size: `507704`
- sha256: `bffdd7e4378aca1bf3ecf5aecff7fa48524bd5c53106d9fd4de133f0d931a0dc`
- `<title>`: `Archetype HR — Engagement happens one person at a time`

```bash
stat -c%s state/prototypes/archetype-hr/index.html   # expect 507704
sha256sum state/prototypes/archetype-hr/index.html   # expect bffdd7e437...
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
2. `curl -s https://astra-archetypehr-prototype.netlify.app | wc -c` matches `507704`.
3. `curl -s https://astra-archetypehr-prototype.netlify.app | sha256sum` matches the hash above.
4. The `<title>` on the live URL matches exactly.
5. Open it and confirm: the top nav switches between all 5 routes (Home,
   How It Works, The Archetype Library, For Managers, Join the Waitlist);
   the wall of 14 motivation signatures renders on the dark section of the
   home page; the archetype library gallery renders all 14 forms; the
   manager dashboard shows a small signature in every table row; the
   waitlist form shows red error states on an empty submit and reaches the
   success panel on a valid one; and both founder photos (Jori Chykerda,
   Greg Hussey) load in the About section of the home route.

**Then report back the live URL plus those check results. Do not send the
link to Jori yourself** — outreach for this one stays with Raka.

---8<--- PROMPT ENDS ---8<---

## Context for whoever picks this up

Jori Chykerda (Co-Founder & CEO, Archetype HR) replied to the original
prototype offer with "we have already prototyped this. What exactly did
your team put together?" — Raka's explicit direction was to build something
"MIND BLOWING" in response, since Jori's own team apparently already built
something internally. This is the second build. The first was a competent light SaaS page and
Raka rejected it as not good enough; re-checked against the spec it tripped
five hard failures, so it was rebuilt from the art direction up. This
version is a 5-route site built on a generated "motivation signature"
system, where every employee is drawn as an organic bloom computed from
their own profile values, so the wall of 14 distinct forms argues the
client's own thesis ("engagement happens one person at a time") as an image
rather than a headline. Both founder photos are mechanically verified against the client's
own `/about/` page via `tools/verify_portraits.py` (PASS on both). The page
carries `noindex, nofollow` since it is an unlisted concept for one
recipient. Full reasoning and the Brand Evidence Pack are in `RATIONALE.md`
next to this file — internal only, never for the client.
