# Prototype hosting lessons, 2026-08-12

A session record from the first real multi prototype Netlify deploy run. It
exists so the next session (human or Cloud Routine) does not repeat the same
mistakes. Everything here is written down because the container is stateless
and this reflection would otherwise vanish when the session ends.

The concrete rules distilled from this record now live in the CLAUDE.md
"Prototype build and meeting booking" section. This file is the full story
and reasoning behind those rules.

## 1. What the session actually did

Task from Raka: "Deploy all three prototypes and rename each to the
organisation's name prototype."

The three prototypes had been built by a different session and committed to a
sibling branch, not to the branch this session started on.

1. Confirmed Netlify was connected (`get-user`: authenticated as Rifqi
   Rakamulya, Free plan, 2 pre existing sites).
2. Located the prototype files. They were not in this container's working
   tree. After a filesystem search came up empty, found them via
   `git fetch origin` on the sibling branch `claude/workflow-docs-update-cxm8ih`
   (commit `7e2bd41`), then `git checkout origin/<branch> -- state/prototypes/`
   to pull the HTML plus research summaries in.
3. Copied each HTML into a clean `index.html` in an isolated publish directory.
4. Created three Netlify sites under team `rifqiraka234`:
   - `astra-rosalie-voortman-prototype`
   - `astra-point-audit-prototype`
   - `astra-that-animation-company-prototype`
5. Deployed each with a `netlify.toml` pointing `publish` at the single file
   directory, driven by the `deploy-site` MCP tool plus its returned
   `npx @netlify/mcp ... --proxy-path <token>` command.
6. Verified each public URL with an unauthenticated `curl`. All three returned
   HTTP 401 because the team had "require SSO team login" enabled.
7. Cleared SSO team login via `update-visitor-access-controls`, per site.
8. Re verified: all three now return HTTP 200 with the correct page titles.
9. Cleaned up the deploy scaffolding (`.deploy/`, `netlify.toml`, `.netlify/`,
   the checked out `state/prototypes/`) so the branch working tree ended clean.

Final live URLs (public, HTTP 200, served over https):

| Prototype | URL |
| --- | --- |
| Rosalie Voortman Photography | https://astra-rosalie-voortman-prototype.netlify.app |
| Point Audit | https://astra-point-audit-prototype.netlify.app |
| That Animation Company | https://astra-that-animation-company-prototype.netlify.app |

## 2. Mistakes and shortcomings

Written plainly so they are not softened.

1. **Declared the files missing without checking sibling branches.** This is a
   multi session, git as database setup. A prototype built by one session and
   sitting on another `claude/*` branch is the normal case, not an edge case.
   The search only covered the working tree and this session's own branch, so
   the files looked absent and Raka had to point to the branch with a
   screenshot. One `git fetch origin && git branch -r` would have found them.

2. **Corrupted a signed deploy token by hand transcription.** The proxy path
   token for the second site got a stray character while being pasted, which
   produced a 401 Unauthorized and a wasted deploy attempt. Long secrets must
   never be retyped.

3. **Did not check existing projects before creating three.** The account
   already had two sites. They were never enumerated. If a prototype for one of
   these companies already existed, this run would have created a duplicate.

4. **Deployed the whole repo, not just the HTML.** The `deploy-site` proxy
   command uploads the entire repo to Netlify's build system. The `netlify.toml`
   correctly limited what got served to the single file, but the whole repo,
   including `state/*.jsonl` files that carry real lead names, companies, and
   draft messages, was transmitted to the build infrastructure on every deploy.
   Nothing sensitive was served publicly, but it left the boundary needlessly.

5. **Did not anticipate the SSO 401 wall even after seeing the flag.** The very
   first site creation response showed `requiresSSOTeamLogin: true`. The flag
   was noticed but all three were deployed anyway, and the 401 was only fixed
   after verification caught it. Without the unauthenticated curl check, three
   links that 401 for every prospect would have been handed over as "done."

6. **Over trusted the "all-projects" access control toggle.** One
   `update-visitor-access-controls` call with `appliesTo: all-projects` only
   cleared the single site whose id was passed. The other two stayed at 401
   until the call was repeated per site. Verification caught it.

7. **Read the wrong coding context.** Called `get-netlify-coding-context` with
   `blobs`, which returned storage docs irrelevant to a static HTML deploy.

8. **Left the state row unrecorded.** The playbook says the deployer appends a
   `state/prototypes.jsonl` row with the `netlifyUrl` and `outcome: pending`.
   This run deployed but recorded nothing, only flagged the gap.

## 3. What was improved, and by whom

Improvements Raka asked for directly:

- Rename each site to the organisation's name prototype rather than a generic
  Netlify subdomain. Done via the `astra-[slug]-prototype` convention.

Improvements made without being asked:

- Refused to fake a deploy when the files genuinely were not in the container,
  rather than inventing a plausible URL.
- Matched the screenshot's commit hash to find the exact sibling branch instead
  of guessing.
- Verified each public URL with an unauthenticated curl, which caught the SSO
  401 wall. This is the single check that kept the run from shipping broken
  links.
- Confirmed page titles actually rendered, not just that the site responded.
- Checked and used the https variant of each URL, since Netlify presents the
  default as http.
- Retried transient 502s from the API proxy instead of treating them as hard
  failures.
- Left the branch working tree clean and did not commit the roughly 9 MB of
  prototype HTML, honoring the playbook rule that keeps built HTML out of the
  repo.

## 4. Recommendations

Each maps to something that actually happened above. The ones marked "folded
in" are now part of the CLAUDE.md prototype section.

- **A. Cross session file discovery (folded in).** Before concluding a built
  file is missing, `git fetch origin` and search every branch, for example
  `git log --all --diff-filter=A -- '*Prototype*.html'`. Prototypes are
  routinely built on a different branch than the one deploying them.

- **B. SSO 401 wall (folded in).** New sites on this team inherit
  `requireSSOTeamLogin`, which returns 401 to anyone outside the team,
  including every prospect. Disable SSO team login and password protection
  right after creating a site.

- **C. Verify as a logged out stranger (folded in).** "It loads for me" is not
  the test, because the operator is logged into Netlify. Curl the https URL
  with no Netlify session and assert HTTP 200 before sending any link.

- **D. Deploy from an isolated directory (folded in).** Copy the HTML to a
  clean empty directory as `index.html` and deploy only that. Never deploy from
  the repo root, which would upload lead data to the hosting build system.

- **E. Check for an existing site first (folded in).** Run `get-projects` and
  look for a site already named `astra-[slug]-prototype` before creating one,
  so retries and re runs do not create duplicates.

- **F. Retry site naming (folded in).** Angle 1 owns `astra-[slug]-prototype`.
  A genuinely different retry angle deploys to a distinct name such as
  `astra-[slug]-prototype-angle2`, so the pending original is not clobbered.

- **G. Who records the state row (folded in).** Whoever runs the deploy owns
  the `state/prototypes.jsonl` row, including which branch it is committed to
  when the HTML was built on a different branch.

- **H. Never hand type signed tokens (folded in).** Run a returned signed
  command without retyping it. Manual transcription corrupts the signature.

- **I. Transient 502 retry (folded in).** Netlify MCP calls can 502
  transiently. Retry with backoff before treating it as a real failure, the
  same posture the repo already takes for git operations.

- **J. Prototype URLs are public and self identifying (folded in).** A named
  subdomain like `astra-rosalie-voortman-prototype.netlify.app` publicly
  announces, and lets search engines index, that ASTRA is pitching that named
  prospect, and hosts a mockup of their brand. Add a `noindex` robots meta tag,
  or password protect the site, so the mockup is reachable by link but not
  crawlable. This is a privacy and reputation call the playbook did not
  previously address.
