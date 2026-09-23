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

**What he meant by "error pages", clarified by Raka on 2026-09-23.** The ban is on
screenshots of pages that **failed to load**. A blank render, a browser error screen, a
proxy 403 or a timeout is our failure, not a finding, and it never goes in a deck. A
**verified problem on their live site that a visitor really hits** is different, and it can
go in when Raka asks for "what's missing" (SotoCat, where the survey layer blocking every
click and the dead sign up buttons were the whole case). It still has to pass the triple
check, and small housekeeping stays in `research.md` as above.

### Simpler, and shorter

**"It feels so wordy and just haaard to follow, it needs to flow well."** and
**"Language man, you don't need to over complicate things."** v3 was 2,472 words.
The version that shipped was about 1,600. One point per section, one idea per
paragraph, and the diagram carries what a paragraph would otherwise argue.

## Site plus analysis deck for a warm lead who asked to see our work (SotoCat, 2026-09-23)

Rebuilt from the session transcript, not from memory or a compaction summary. Sergey
Shalunov (SotoCat, `ctc_Puf9L7o8nDTyDNn2Q`) replied "Please show me your projects." Raka
briefed the job at 07.11, it was built, checked and live by 08.48, reworked with the
partner credentials between 09.15 and 09.41, and the delivery went out at 09.52 on his word.
Live: https://astra-sotocat-prototype.netlify.app and https://astra-sotocat-deck.netlify.app.
Source, handover and research are in `state/prototypes/sotocat/`.

### The brief, as Raka gave it. Use it as the checklist for the next one

**The deck.** Raka and Josh "prepare the documents" and show the prototype. It has to cover:
- the company and its current website, "what it's missing", "analyze really in screenshot"
- "what the company's also aiming at", their goals
- what we're going to do, and "how that website that we're gonna create for them is gonna help them"
- (added 09.15) big brand examples of the partner's work "to create credibility, make it big",
  and what Raka and Josh do, also for credibility

**The website.**
- "do not cut corners, take your time to research, take your time to build it"
- "twenty twenty six standard" design, modern. Look at big SaaS companies and Apple for reference
- "pictures is really important, put pictures", "put graphs as well, if needed"
- "the whole overall flow is thought in UX UI, it's clear, it's understandable, it's easy to follow"
- "it has all the features, it blows their mind" on design, functionality, colours, fonts, shapes
- "make sure the website is actually a reflection of their business, don't hallucinate"
- "as if they were to be having this live tomorrow", "final production level", "annotations are not needed"

**The working rules.**
- "Make zero mistakes. Do not make false assumptions."
- "recheck it again two times to make sure all of the instructions are being followed, at least two times, but more is better"
- "just do it", come back only when done or with a really urgent question

### The order of work that got it done in one pass

1. Pull the whole thread and the lemlist record. Grep the queue and `prototypes.jsonl` for the lead.
2. Map every page of their site. Screenshot each one at desktop and phone width, twice:
   once as a visitor sees it and once underneath any overlay. Label which is which.
3. Research to the prospect master standard. Companies House for every company named on the
   site, their blog for their own goals, their code for anything you'll rebuild (the savings
   calculator formula came from their JS, not from guessing at outputs), and primary sources
   for any law or date (GOV.UK, not search summaries).
4. Read Stage C and the last three builds' fonts and colours before choosing art direction.
   Screenshot five reference sites. Write the art direction into `research.md` before any HTML.
5. Assets first. Their logo from their own SVG, their font, photography with ids recorded,
   everything compressed, and each page loading only its own images.
6. A small build script with shared header and footer, so nine pages can't drift apart.
   Commit it and check it reproduces the shipped HTML byte for byte.
7. Build the homepage alone, render it, look at it, fix it. Only then write the other pages.
8. A claims pass on every page against their own copy (see the table below), then the
   portrait gate, then every interactive part exercised, then the copy audit.
9. The deck last, so its screenshots of our build are the final build.
10. Deck QA harness on a cold load, both widths, then the copy audit again.
11. Deploy, switch SSO off, verify live (below), then draft, gate, handover, state rows, log, push.
12. Nothing is sent until Raka says send. Re pull the thread right before, copy the text out
    of the draft file, send, pull again and byte compare.

### Every hiccup, what it cost, and the rule it leaves

| What happened | The rule now |
|---|---|
| **Research and evidence** | |
| Their landlord survey overlay blurred every screenshot, so the first shots were useless | Read the overlay's own script and hide it with its own function, only for the "underneath" shots. Always keep the as a visitor sees it shots too, because the overlay was the biggest finding |
| Two screenshots failed with "upstream request failed" | Proxy, not their site. Retry before recording anything |
| Search summaries disagreed on a Renters' Rights Act date | Dates and law come from GOV.UK itself |
| Unsplash download links sit behind a bot check | Take the direct image URLs from the search page, record each photo id in `research.md` |
| Rendering their logo from a local file was blocked | Serve it over a local http server and render that |
| **The build (site)** | |
| An f string broke on the container's Python version | Test the build script on one page before writing nine |
| The first homepage copy invented product detail. A tenancy type, "language models" where they say natural language processing, "access notes", "arrives in the next release", SotoCat "watching the arrival" and telling tenants the plumber is late, a report sent to landlords, a property history, contractor matching "by distance" | **Every capability on a prospect's site must be in their own words somewhere.** Run a claims pass against their pages before the first render. Features they call future get "coming in a future release", which is their own phrasing |
| Chart bar heights were rounded by eye (83 against 83.3) | Compute chart geometry from the data |
| Inline `grid-template-columns` styles never collapsed on a phone. Grids overflowed on long words | No inline grid styles, use a class with a phone breakpoint. Always `minmax(0,1fr)`, never `1fr` |
| A desktop only hero grid rule broke the phone layout | Scope desktop overrides inside `@media (min-width:...)` |
| Nested `<svg>` inside the diagram took the wrong width | Use `<g transform>` inside one svg |
| "1,000 and over" wrapped badly on a phone chart | Short axis labels, "1,000+" |
| Calculator showed "1 units" and a stray minus sign | Pluralise and format every computed string, then test the edges |
| The portrait tool stopped at the surname in the page's meta tags | Run it on the page body. Never loosen the containment test itself |
| Fragment headings survived to the copy audit, twice on the site and again in the deck | Headings are full claims. Run the audit before the first render as well as after |
| Gas safety advice was ours, not the gas networks' | Safety advice follows the official wording |
| **The deck** | |
| Stats were wrong on first write. "13 pages" was 15, "8 posts read in full" was 4 of 8, and Fixflo's "working demo" was really a "Get quote" button | Recount every number on the page it came from. Open the competitor's first screen before describing it |
| The QA harness said 30 of 75 reveals and lazy images unloaded | CSS `scroll-behavior:smooth` fools the harness. No smooth scroll on anything we QA |
| A missing favicon gave a console 404 | Inline a data URI favicon on every deck |
| A caption had doubled punctuation | Read every caption aloud |
| **Deploy and live** | |
| New Netlify projects default to team SSO, so Sergey would have hit a login | Switch SSO off on every lead facing project, as on astra-wistree-deck |
| Live HTML never hash matches, because Netlify rewrites links to pretty URLs | Hash compare the assets. For HTML compare the visible text |
| A live screenshot showed the deck hero half empty | A progressive JPEG caught mid load. Check the file before "fixing" anything |
| The QA harness can't load the live URL (proxy certificate) | Curl the live HTML and assets into a folder, serve it, QA that. Or pin the proxy CA by key, see the toolchain section |
| **Draft and state** | |
| `check-drafts.py` rejected the URLs for their colon and hyphens | Now fixed in the tool, URLs are stripped first, and a prose colon still fails as a control |
| "yourself" twice in a row in the draft | Read the draft aloud |
| A `sed` edit broke on its own delimiter and stopped the chain before the state rows were written | Edit files with Python and asserted replacements, never sed on text with slashes |
| A chain with `;` committed a draft the checker had failed | Chain the checker with `&&` so a fail stops the commit |
| **Strategy** | |
| Our 22 Sep message said "there's nothing I'd touch" about a site whose survey layer was already blocking every click. It was written from the HTML without rendering | Render and look before praising a site, same as before criticising one. The delivery message owned it in one line, which Raka approved |
| The deck named Josh as the contact | Raka is the contact on his leads unless he says otherwise |

### What Raka changed after seeing it, now standing rules for any deck like this

- **Partner credibility comes from `docs/partner/amwisesa-credentials.md`.** Big brands first,
  Unilever, Pertamina, World Bank. Only the 2015 Smarties award is verified, quote nothing else.
- **One team framing.** "Astra and Amwisesa work as one team", credited "Built by Amwisesa,
  Astra's development partner". He asked for "partnering together to create these things".
  Astra started in Jan 2026 and the projects go back to 2015, so that wording would be
  checkable and false. Tell him when an ask like this can't be done as worded, and do the
  honest version.
- **No country in client copy.** No Indonesia, Jakarta, Bali or Southeast Asia.
- **Bios sound senior.** Titles and scale, no degrees for Raka. Josh from his own LinkedIn.
  The approved wording is in the live deck and in `docs/astra-company-profile.md`. Check
  every timeline word against the dates ("before any of that" was false, the stroopwafel
  brand overlapped Heineken).
- **LinkedIn links under names, not email.** The closing button is "Email me", for Raka.
- **The delivery message says what the site does.** Name the features, and check each one
  in the build first. Count pages without the 404.

### Settled, error pages (Raka, 2026-09-23)

The WisTree "no 404s" line meant screenshots of a site that **couldn't load**, never real
problems a visitor hits. So the SotoCat deck was right to show the survey layer, the dead sign
up buttons, the wrong company in the terms and the unanswerable cookie banner, all proven
three ways. A page we failed to render never goes in, which is also what `site-audit.js`
enforces when it prints `RENDER NOT TRUSTED`.

## When the prospect's own site is AI generated, redesign it, don't inherit it (CustomKit, 2026-09-23)

Raka on the first CustomKit build, which took customkit.com's gold, Space Grotesk and Inter:
"their website and everything is all generated by AI... think outside of your AI box... a
full on redesign of everything... it still feels like the lovable and AI stuff". He also
asked for customkit.com and customkit.uk to be combined.

**The rule.** Before taking a prospect's colours and fonts, look at where they came from. A
dark background, one gold or purple accent, Space Grotesk or Inter, pill buttons, rounded
cards with icons, numbered "01" kicker pills and fade up reveals are the Lovable and v0
default, and copying them copies the problem. When the site reads like that, the brief is a
redesign. Keep their facts, their logo and their product renders, and replace everything
else. Say so in the handover, as the "Choices Chris should confirm" list did.

**How the v2 was found, and it's the order to follow next time.**
1. Screenshot five to eight sites from the prospect's own category that are known for design,
   not SaaS templates (for sportswear, Satisfy, Mundial, Bandit, Soar, Pas Normal Studios).
   Write down what they share. Here, paper white, hairline black rules, condensed athletic
   display type with mono labels, flat loud colour blocks and square photos.
2. Pick one metaphor from the prospect's world and let it set every choice. CustomKit got a
   matchday programme crossed with a factory spec sheet, so duotone printed photos, a split
   flap scoreboard for lead times, swing tag price cards, a player card for the founder.
3. Check every colour pair for AA before writing CSS, and pick type that isn't the default
   (Big Shoulders Display, Archivo, IBM Plex Mono here, all OFL from Fontsource).
4. Build the homepage alone, screenshot it at both widths, fix, then the rest.

**Hiccups on the redesign, and the rule each leaves.**

| What happened | The rule now |
|---|---|
| A clip-path wipe reveal never fired, every headline stayed hidden | Chromium's IntersectionObserver treats an element clipped to zero as not intersecting. Trigger reveals from a throttled `getBoundingClientRect` check, or observe a wrapper |
| Two stock photos carried other brands, a VISA logo on a golf polo and FORZA PADEL on a ball, plus an Acne Studios book in a third | **Zoom into every stock photo at full size before it ships** and look for text. A prospect's site showing another brand implies a relationship that doesn't exist |
| Painting and inpainting the logos out left visible patches | Don't retouch. Crop, swap, or replace with something drawn (the padel slot became a to scale court plan in SVG) |
| Unsplash search and its JSON endpoint both hit a bot wall | Plan to reuse recorded ids or draw the asset. Don't burn time on a wall |
| "Nine reviews on Trustpilot" when the page has 54 | A count needs its window in the same sentence, "nine since April" |
| "Six of our designs, 13 colours" read as their colour range | Anything we chose for the demo is labelled as ours, "13 colours to try here" |
| The QA harness could only load index.html | `tools/deck-qa/qa.js` now takes `PAGE=other.html`. Run it on every page of a multi page site |
| A resize rule keyed on the name "new-m" shrank new-make.jpg | Key image sizes on an explicit list, never a filename prefix |
| A screenshot caught an animated canvas mid fade | Capture artefact screenshots with `reducedMotion: 'reduce'` so motion is at rest |
