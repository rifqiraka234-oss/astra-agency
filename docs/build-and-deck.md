# The build toolchain and everything corrected across the WisTree deck

> **Moved out of `CLAUDE.md` on 2026-09-21 to make it readable.** Nothing was changed, only relocated. `docs/RULES.md` outranks this file.
>
> Exact paths, rendering, QA, images, deploying, deck architecture, and the full audit of corrections Raka made across five deck rebuilds. Open it before building anything.

## The build toolchain (verified 2026-09-15, use these exact paths)

A fresh container has all of this. Do not go rediscovering it, and do not install
what is already here.

### Rendering and QA

- **Chromium** `/opt/pw-browsers/chromium-1194/chrome-linux/chrome`
- **Playwright** `require('/opt/node22/lib/node_modules/playwright')`, launch with
  `args:['--no-sandbox']`
- **Live Chromium DOES work on most hosts, once you stop mistaking the proxy's own CA
  for the site's certificate (2026-09-19).** Every live render failed with
  `net::ERR_CERT_AUTHORITY_INVALID`, and curl failed with "self signed certificate"
  and "no alternative certificate subject name matches", which reads exactly like
  four broken sites. It was one broken renderer. All outbound HTTPS is re terminated
  at the egress proxy, so every tool has to trust `/root/.ccr/ca-bundle.crt`. curl
  takes `--cacert`. Chromium ignores the system and NSS stores, so pin the proxy CA
  by key instead of turning verification off, which is never allowed.

  ```
  openssl x509 -in /root/.ccr/agent-proxy-ca.crt -pubkey -noout \
    | openssl pkey -pubin -outform der | openssl dgst -sha256 -binary | openssl enc -base64
  # then launch with args:['--no-sandbox','--ignore-certificate-errors-spki-list=<that hash>']
  ```

  **This matters beyond tooling. A TLS error seen through the proxy is never evidence
  about the lead's site.** Two leads in that batch looked like they had certificate
  faults, which would have been a strong angle and a completely false one. After the
  fix they returned a plain 502 from the proxy and the honest verdict was
  `BLOCKED_NEEDS_INFO`. Before writing any claim about a certificate, a security
  warning or a dead site, check whether a known good host goes through the same path
  in the same minute.
- **A Sucuri "Robot Challenge Screen" that becomes a hard 403 is our address being
  blocked**, not a broken site. Nothing on our side fixes it, so the row records that
  and the unblock is a different session or Raka's own browser.
- **A 502 "upstream request failed" is not the end of the diagnosis, and the cause is
  sometimes the angle (2026-09-19).** The egress refuses to relay an origin whose
  certificate does not validate, and it reports that as a flat 502, which reads like
  our problem. Run this and it tells you whose problem it actually is.

  ```
  getent hosts <domain>                                  # DNS resolving at all
  curl -sSv --cacert /root/.ccr/ca-bundle.crt https://<domain>/ -o /dev/null
  curl -sS -o /dev/null -w "%{http_code}\n" http://<domain>/   # plain http
  ```

  Read the verbose output for two lines. `CONNECT tunnel established, response 200`
  means the proxy did its job and everything after it is the origin. Then the
  `subject:` line is the certificate the origin actually served.

  Both live cases came out of this. **agilearch.nl serves a self signed certificate**,
  and **milticocoaching.com serves a certificate whose subject is CN=wordpress.com**,
  which does not cover the domain. Both return **200 on plain http**, so the sites are
  up and only the secure side is broken, which means a real visitor on an https link
  meets a full page browser interstitial. That is the "live domain but no real website"
  build opportunity, arrived at from what looked like a tooling failure.

  **Confirm it properly before asserting it, and the cheapest confirmation is the site
  itself.** Plain http returning 200 lets you read every page, walk the flow and pull
  the prices, so a blocked lead usually is not blocked at all, it is a normal research
  job over http plus one verified fault. That is how both of these went from dead rows
  to drafts in one pass.

### The four signals that are always worth a pitch (Raka, 2026-09-19)

His list, and it is a standing rule rather than a one off. When research turns up any
of these, the lead is pitchable and the row is never closed as blocked.

1. **A GDPR or privacy problem.**
2. **A certificate problem**, which the visitor experiences as a security warning.
3. **WordPress**, especially a bought theme, a plugin shop bolted on, or a stack held
   together with plugins.
4. **A site that looks like 1990 or 2000.** The greppable proof is in the dated site
   section above.

**And write it so a normal person feels it, never as an IT report.** His words, "make
it non toooo technical you know." The owner does not care what a certificate is, he
cares that people are turning around at his door. So name what the visitor SEES and
what it costs, and keep every piece of jargon out of the message.

| Do not write | Write |
|---|---|
| an invalid TLS certificate, a name mismatch on the SSL | a browser throws a full page warning before your site loads |
| the origin serves a self signed cert | your address doesn't open |
| HTTP 200 on port 80 but the 443 listener is misconfigured | the plain address works, the secure one does not |
| a WordPress instance running Easy Digital Downloads | your shop |
| the DNS A record points at a parked host | there is nothing there yet |

**The tweak test still applies and it bites hardest here.** "Renew your certificate" is
an afternoon of work, so it is a task and nobody buys an agency for a task. Use the
fault as the PROOF and sell the thing behind it. Marcel's certificate is the proof, the
job is the booking and checkout side of a shop holding ten products. William's holding
page is the proof, the job is that the brand he goes to market under has no site at all.

**Say what you saw, not what you diagnosed.** A first person report is true whatever
the cause turns out to be, it reads like a human rather than a scanner, and if we have
somehow got it wrong the lead corrects us and that is still a reply.

## Building a deck, everything Raka corrected across the WisTree build (2026-09-14 and 15)

One deck was rebuilt five times in two days. Every version failed on something he
had to point out, and one note he had to give **twice**. This section is that
whole audit so the next deck starts at v5 rather than v1.

### The alignment gate, before a single line of HTML

**Re read the actual thread and check the artefact answers two separate things.
What we promised to send, and what they asked for.** Those are not the same, and
v1 failed on both. Raka's question was "what did we say we want to send to karim
and what did karim say, does it align fully with what you created for the deck?"
The honest answer was no. We had promised a short deck on the scale he was
building. We built twelve sections, a third of which was an uninvited website
audit, and his actual question only appeared in section 7.

Run this before building, not after. Quote their own words back into the research
file, then check each planned section against them. A section that serves neither
the promise nor their question does not go in.

### The arc, which is Raka's and is now the default shape

Analysed, problem, prototype, infrastructure, what else we can build, who we are,
book a call. His words. A deck that only informs has failed. v2 was accurate,
narrow and sold nothing, which is its own kind of miss.

1. **What we looked at.** Their own words quoted back, and the research surface.
2. **What we found.** The problem, with the competitor or market evidence.
3. **The prototype.** The working thing, on the page, that they can use.
4. **What sits behind it.** The infrastructure, so they can see it is real work.
5. **Where else we could help.** The seeds, named concretely (see below).
6. **Who we are.** Astra, the delivery structure, real delivered work, and Raka.
7. **Next step.** One ask, and a booking link.

### Say what the thing actually is

**"Is it a dashboard, is it an app, is it a CRM or what?"** Raka, on finding
section 5 full of headings like "Capture, the expensive step". That names nothing.
A buyer cannot picture it, cannot price it, and cannot forward it to anyone.

Every offer carries a type and a plain name. Internal web app. Customer facing.
Dashboard. Email and in app. Customer portal. Onboarding flow. CRM hookup. The
worked fix, all four rewritten in one pass.

| Abstraction | What it should say |
|---|---|
| Capture, the expensive step | **Internal web app.** A review app for your team |
| Answers that show where they came from | **Customer facing.** The assistant your customers actually use |
| A knowledge map that draws itself | **Dashboard.** A dashboard the customer logs into |
| Alerts when knowledge is about to walk | **Email and in app.** Alerts when knowledge is about to walk |

The closing line names objects too, not categories. "A customer portal. An
onboarding flow. A CRM hookup so a finished check lands with the right person."

### Use images, and show what it would look like

**"Use images man!!! And also like the what else we can do make also how it looks
like!"** Stage L already said every section carries a real photograph or a real
sourced graphic. It was ignored for four versions. Three kinds of image, all of
which earned their place:

- **Real photography**, licence free, never captioned as the client's premises,
  staff or customers. The portrait guardrail in the Guardrails section still binds.
- **Real screenshots of real delivered work.** The Unilever, GPay and MWX images
  were extracted from `ASTRA_AGENCY_Deck_Short.pdf` with PyMuPDF. They turned a
  section of text boxes into actual proof. The "also by our delivery partner"
  disclosure travels with them, always.
- **UI mockups of the things we are offering to build.** Inline SVG, in the deck's
  palette, showing the actual screen. A review queue with a transcript on one side
  and drafted items on the other. An answer card with its source chips. A process
  map with criticality per node. An alert that names the step, the person count and
  the retirement window. Describing a dashboard is worth far less than drawing it.

### Language, and the note he had to give twice

**"Your language is too literate. Would you present that to someone on a deck? No.
Check your language again as if you're presenting it to an executive, because
most of them are."** The first pass at this was too gentle and he repeated the
note verbatim. Both passes are recorded here because the second caught what the
first left standing.

**Never narrate the artefact inside the artefact.** Do not tell the reader what
language something is in, that a list is below, that a section is coming, or how
we reached a decision. State the substance and stop.

| Wrote | Should have written |
|---|---|
| "The questions themselves are in German, because that is who answers them. Everything they ask about is below in English." | "Built from your own six methodology steps." |
| "What the six questions ask", over restated questions | "What it measures", over six named dimensions |
| "What the score says back" | "Where a score lands" |
| "Three calls we made" | "Three constraints" |
| "Not advice on what to build. Just the four things we would pick up first..." | Deleted. The heading already carried it. |
| "And who actually wrote this" | "Raka Mulya" |
| "Karim, you said you're building a scale that gives a first indication of knowledge fragility and compares a company against others its size." | "Karim, the scale you described has two halves." |
| "Two jobs, and they're not the same job." | "Two jobs in one sentence. The second is the one worth owning." |
| "The check is one file with no server." | Deleted. Implementation trivia. |
| "so selling something a buyer hasn't decided he needs yet is first hand rather than theoretical" | "Selling something a buyer hasn't decided he needs yet is not theory here." |

Three tells to grep for. **A heading that names a thing is weaker than one that
claims a thing.** **A sentence that tells the reader what is about to happen should
be deleted, because the next sentence is about to happen anyway.** And **a trailing
clause starting "so" or "which is" is usually the writer explaining what he just
said.**

The self check. Read every heading alone and rewrite any that labels instead of
asserts. Then read every sentence and delete any clause that would still be
obvious with it gone.

### English, always, and no error lists

**"Use English unless it's really needed in German, like the questionnaire. I
don't speak German btw."** The deck is English throughout, including every diagram
label. The only exception is a working artefact a non English speaker will
actually use, and when that happens **an English explanation sits beside it** so
Raka can read the whole thing. Concept mockups are English, because they are
sketches rather than shipping UI.

**"You don't need to show what's error like the 404s and all."** Broken links,
typos, conflicting job titles and freemail addresses do not go in a client deck.
They are research, they stay in `research.md`, and they can be handed over
separately as a favour. Putting them in front of the buyer reads as a telling off.

### Simpler, and shorter

**"It feels so wordy and just haaard to follow, it needs to flow well."** and
**"Language man, you don't need to over complicate things."** v3 was 2,472 words.
The version that shipped was about 1,600. One point per section, one idea per
paragraph, and the diagram carries what a paragraph would otherwise argue.
