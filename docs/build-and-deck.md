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
| The Gmail connector wraps every link it writes in a google.com/url redirect with a ust stamp about 24h ahead, in drafts and in sent mail (raw MIME of the 25 Oct meeting brief and the 9 Oct Acquitas reply, where Kyson's quoted links stay plain). After the stamp a click shows Google's redirect notice first (H&P, 25 Oct) | A prototype link that goes by email is sent by Raka from Gmail with the link pasted fresh, or goes on LinkedIn. Read the draft back with get_draft before calling it ready |
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

## When the owner says "it feels like an ecommerce site", put people in it (CustomKit v3, 2026-09-23)

Raka's words, "If you look at adidas or nike, its all about the feel ... They use pictures and
images and videos to showcase people." A redesign with good type and colour still read as a
shop, because every picture was a product. What fixed it, and the rules it left.

- **Read how the reference brands do it before building.** Nike and adidas lead with people in
  motion, full bleed, with a few words over the top, and tell a short story in chapters. Copy
  that structure, not their slogans.
- **Footage licence is read from the item page, never assumed.** On Mixkit the visible page does
  not say which licence applies. The page JSON's `copyrightNotice` does, `"Free"` is commercial
  use, `"Mixkit Restricted License"` is personal only and is excluded. Pexels, Pixabay and
  Unsplash were bot walled from the container.
- **Logo check every clip frame by frame.** Sports stock is full of adidas stripes, molten balls
  and branded banners. Contact sheets of frames caught fourteen rejects.
- **Stock people are never captioned as the client's customers.** Decorative, `aria-hidden`, no
  caption, and the handover says their own shoots replace it.
- **Ship WebM before MP4.** The QA Chromium can't decode H.264, so a WebM source listed first is
  the only way to prove playback in QA. Poster frames for reduced motion and slow networks.
- **Play only in view, give a pause button, never autoplay under reduced motion.**
- **A blurry clip at full bleed is a no.** The hands clip was fine small and soft full screen,
  so the chapter used another shot.
- **A relative `url()` inside a CSS custom property set inline is not safe.** It can resolve
  against the stylesheet rather than the page. Put the image in a class in the CSS file.
- **curl on a Lovable style site returns a 2 KB shell.** Every claim count came back 0, which is
  the failed detector, not an absence. Render in Chromium before counting anything.

## When Raka says "it looks so simple", go to product launch level (Qualigraf, 2026-09-28)

Built for Steven Garratt, Qualigraf UK, live at https://astra-qualigraf-prototype.netlify.app.
Source, research and handover in `state/prototypes/qualigraf/`. v1 was cream, split sections and
framed screenshots, clean and correct, and Raka's verdict was "Bro… can we not like do a full
redesign of the page?? Like the page looks so simple". v1 is kept in `build/v1pages/`.

**What v2 did, and it's the default for a B2B software site from now on.**
- Screenshot five launch pages first (apple.com product page, vercel.com, linear.app/features,
  framer.com, notion.com/product) and write down the shared moves before any CSS.
- A dark canvas with the client's own colours as light (radial glows), and one light chapter for rhythm.
- The product as the hero object, a big window that starts tilted and flattens on scroll, with live
  UI cards floating around it.
- A sticky scroll story for the workflow, the screen swaps as the text moves, with a progress rail.
- A bento grid of live UI fragments (typing transcript, bars filling, search typing then results,
  a CSS phone, a looping film with a LIVE chip). Every fragment maps to a real feature and the
  footnote says examples show sample data.
- Huge statement type revealed word by word, full bleed photography with parallax, a marquee.

**Hiccups and the rule each leaves.**

| What happened | The rule now |
|---|---|
| The mobile menu opened as a 58px strip | `backdrop-filter` on the header makes it the containing block for `position:fixed` children. Keep the mobile nav outside the header |
| Their product PNGs already carry a device bezel, inside my window frame it was double framed | Crop to the inner screen by scanning for the screen colour, and check the crop didn't eat the app's own sidebar |
| The navy logo vanished on the dark header | Swap to the light logo whenever the header goes dark |
| Inner page SVG charts had dark text written for a light page | After a theme change, grep every SVG for dark fills and recolour |
| `tools/verify_portraits.py` expects base64 portraits in one file | Run its containment function against the client's page and byte match the files by hash. Never loosen the tool |
| Lighthouse flags the statement's dimmed words | A transient scroll state, full contrast once revealed and under reduced motion. Say so in the handover |

## When Raka says "go beyond the top 50", build a story, not a nicer page (Qualigraf v3, 2026-09-28)

His words on v2, "take like the top 50 companies in the world ... Check their website ... Does it
tell a story? What kind of media do you need to tell the story?" What worked, and the rules it left.

- **Screenshot the references in one scripted run, and say how many actually rendered.** 47 were
  queued, 30 rendered, 17 were bot walled and stayed walled on a retry. Report the 30, never "top
  50 studied". Script and metrics (video, canvas, svg, sticky, words) are in the session scratch,
  and the pattern list is in the Qualigraf handover.
- **Pick one protagonist and move it through time.** "One sample decision, from the forward plan to
  six years later" gave eight chapters, each with its own medium. A chapter bar makes the length
  feel like a story rather than a scroll. Make it hide when idle, because a fixed pill over content
  annoys.
- **Every chapter gets a different kind of media.** Canvas particles, a dial, an animated diagram
  with a before and after toggle, a dated strip with a stamp, a photo with a live HUD, a pipeline, a
  searchable wall, a named map animation, a globe, plus the client's own film loops. Two chapters in
  a row with the same medium reads as a template.
- **Their logo is a shape. Use it.** Sampling their curl path into a particle target made the hero
  theirs and nobody else's.
- **Let the visitor put their own numbers in (Spotify Wrapped).** Only user inputs and plain
  arithmetic, with the defaults labelled as sample figures, so nothing in it is a claim.
- **A quiz beats a paragraph (Premier League, NBA).** Work the answers by hand, then run them
  through the site's own code. Both have to agree before it ships. Without JS, show the answers.
- **Drop a comparison rather than ship it on one source.** The Elizabeth Tower height was only
  reachable on Wikipedia, so the stack got a ruler and a person instead.
- **A copy line inside an animation is still a claim.** The quiz score said Qualigraf counts clear
  days. Nothing verified that, so it went.
- **Old absolute positioning survives a markup move.** The phone kept `position:absolute` from the
  first CSS after it moved into the copy column and sat on the vote panel. Reset position and
  transform when a component changes home.
- **Netlify rewrites HTML.** Pretty URLs turn `platform.html` into `/platform` and form processing
  strips `data-netlify`. Byte matching fails on every page for those reasons alone, so compare the
  parsed DOM with links normalised, then fetch every rewritten link.
- **A video can log as aborted in a fast QA scroll.** The browser cancels the download when the film
  leaves view. Confirm with a direct fetch and a rerun before calling it broken.

| Hiccup | Rule |
|---|---|
| Delivery draft still promised "a scroll through the eight stations" after v3 removed it | Reread the delivery draft against the live site after every rebuild |
| Draft note said 79 words and 4 contractions, it was 80 and 2 | Count with a tool, possessives aren't contractions |
| Stamp covered the late report chip | Screenshot after the animation's last delay, not at a fixed time |
| Colon in a webcast timecode | The colon ban covers UI text too, dots work |

## When Raka says "you just put icing on their cake", change the language, not the effects (Qualigraf v4, 2026-09-28)

His words on v3, "we have just taken what they've done and put an icing cake on it ... You didn't
redesign it." v3 had kept v2's dark SaaS layout, their screenshots in window frames and card grids,
and added motion on top. Effects on an inherited layout still read as the inherited layout.

- **A redesign changes four things at once, or it isn't one.** Palette and type, the page grammar
  (how a section is built), the story spine, and the media. v4 went from dark SaaS to paper and
  ink, a serif, sans and mono trio, sections numbered like agenda items, and a story built on
  public data. Keep the old source untouched in its own folder so a rollback costs nothing.
- **Get past the bot walls before studying anyone.** A local fetcher with a real browser TLS
  fingerprint (curl_cffi impersonation) routed through Playwright took the teardown from 30 of 47
  to 57 of 65. Report the walled ones by name.
- **Fingerprint the sites, don't just look at them.** Count at runtime the libraries, WebGL
  canvases, videos, sticky elements, clip-path masks, blend modes and style mutations while
  scrolling. The numbers say what the best actually do (Apple is film in pinned scenes, Stripe uses
  WebGL only where it means something), which a screenshot can't.
- **The concept should come from what the client makes.** Qualigraf makes the public record, so the
  site is built like an agenda and its record. That's the step past "a nicer version of their site".
- **Real public data beats any illustration.** Surrey's shadow meetings across twelve council sites,
  parsed from the hub, and ONS boundaries for the map. Name the source on the page and say what
  could only be read second hand.
- **Stock film needs its licence read on the clip's own page.** Mixkit mixes a Free and a Restricted
  licence, 14 of 21 first picks were Restricted. Films stay decorative and are never captioned as
  the client or a real place in their work.
- **Run Lighthouse accessibility on every page after a palette change.** v4 failed on grey mono
  labels on paper, ink3 labels on colour fields, plum text at 70 percent, a coral that's too light
  for text on paper, and a film caption that had inherited white text onto a paper chip. A text
  shade of each brand colour (`--coral-t`) fixes most of it without changing the brand.
- **WebGL scores badly in this container's Lighthouse.** It renders on the CPU (swiftshader), so a
  60 fps hero shows as minutes of blocking time. Say that plainly next to the number, don't hide it.

| Hiccup | Rule |
|---|---|
| A function named `two` overwrote an element variable named `two` | Don't reuse short names across one script scope |
| `.d1` meant both a display size and a reveal delay | One class name, one meaning, rename the delays |
| `c-span-N c-start-N` combined into a broken grid line | Write span and start as separate properties |
| Map pins with labels collided | Numbered pins plus a key |
| Globe faced the Pacific | Rotation is minus 90 degrees minus the longitude, check with a screenshot |
| Static map built before its data loaded | Reset the scene stage after the data arrives |
| Lighthouse flagged mid-reveal elements | Separate animation states from real contrast failures before fixing |
| The stamp covered the case citation at phone width | Screenshot every overlay at 360 and 420, not just desktop |

## When Raka says "she could do this herself", the Qualigraf bar applies to every prototype (Hire Quality Talent, 2026-09-29)

v1 for Ciara Neal was her own copy on a clean navy and gold template, six pages, correct and tested,
and Raka's verdict was that she could have done it herself. The Qualigraf rules had been written as
if they were Qualigraf's. They're now RULES.md section 5, for every build.

What v2 did in about an hour on top of v1.
- **Teardown**, 30 recruitment, executive search and consulting sites through the curl_cffi
  pipeline, 26 rendered (Bain, Robert Walters, McKinsey and the FT walled), on top of Qualigraf's 57.
  The executive search leaders are editorial and restrained, the recruiting software sites float
  candidate cards, Korn Ferry leads with film.
- **The signature scene came from her logo.** Her mark is a magnifying glass, so the homepage opens
  on a canvas field of the market for one role with a gold lens that magnifies it and finds the
  strong fits who aren't applying, with example candidate cards labelled as illustration.
- **The story on real data.** ONS VACS02 (manufacturing vacancies 95k to 48k since 2022), KPMG and REC
  (candidate supply rising, engineering one of two sectors with rising permanent vacancies), Make UK
  (36% of manufacturing vacancies hard to fill for skills, against 24%). Each cited on the page.
- **A pinned funnel**, 1,200 to 240 to 60 to 18 to 4 to 1, on her own six stage process, labelled as
  an example.
- **Films**, Mixkit Free licence only, 8 of the first 20 industrial candidates were Restricted.
- **Tools on their own inputs**, a fee comparison where the visitor sets the salary and what they pay now.

| Hiccup | Rule |
|---|---|
| The phone card sat on the headline | Place the scene's overlay by viewport, a side by side layout on phones |
| The funnel's first stage was all gold, before anything was selected | Colour means selected, the whole market starts neutral |
| The chart's period labels read "Mar-May" | Data labels are copy too, "Mar to May" |
| No JavaScript left a tall empty pinned section | Every pinned scene gets an html:not(.js) static fallback |
| The industries film tiles linked to the page they sat on | Tiles that link elsewhere on one page are plain blocks on the target page |

## When Raka says "love it man! keep making stuff like this", this is the stuff (Hertling v3, 2026-10-22)

Noah Hertling, a one person IT firm in Reinbek, said yes to seeing "the Hertling online presence that wins Hamburg
clients". v2 was correct and sales first, and Raka's verdict was "something out of the 2010s ... it needs to be done
€6000 euro worth at least", and of the presence sketch, "is this the best you can do?". v3 was built in one day and he
signed it off with the words above. Live, https://astra-hertling-prototype.netlify.app/ and
https://astra-hertling-presence.netlify.app/. Source, state/prototypes/hertling (handover.md, research/
art-direction-v3.md, research/strategy-facts.md).

### What made it, repeat all of it

1. **One idea from the lead's own words, carried by the whole page.** His promise is IT with no black box, so the page
   runs from night to daylight, and light means documented. Colour tells the story before a word is read.
2. **A redesign changes four things at once**, palette and type, page grammar, story spine and media (the Qualigraf v4
   rule). Geist, Geist Mono and Instrument Serif italic for the one phrase per headline that carries the feeling.
   Signal blue and ice on near black, frost and paper for daylight. Every font OFL, self hosted, licence read.
3. **No islands.** Chapters edge to edge, handing over through their gradients, never a border. Glass only where a thing
   is held (the form, a window, floating chips).
4. **Their logo is the hero object.** His mark sampled into a network of nodes on a canvas, lit by the pointer, with
   example device labels. Placed by measuring the text, never by guesswork, tested at 9 sizes in both languages.
5. **Scroll scenes that show the promise.** A black cube that turns to glass with the network inside, a documentation
   window that flattens as it arrives, a band from his logo that draws the three steps, a dial for the self check.
   Each scene writes CSS variables only, and each has a static state for no JavaScript and for reduced motion.
6. **Full bleed media of their place, licence checked twice.** Mixkit Free films, each fetched singly. Wikimedia
   Commons stills with the licence read on the file page, a credit on the page and in the Impressum when the licence
   asks for one. Hamburg at blue hour and Schloss Reinbek did more for "local" than any sentence.
7. **One action everywhere.** Header button, phone bar, a button per service, the self check result, the booking form.
8. **The growth plan is a second site in Astra's voice**, 12 chapters. Where they stand (today's screenshots), the market
   (official counts and Eurostat rings), why now (dated triggers, here Microsoft's end of support list), the
   competition (a ratings chart and a wall of 17 rivals, every cell checked), positioning, the journey with what's
   built and what's next, the new site in screenshots, local pages, Google and reviews, LinkedIn posts, offer and
   prices with a calculator the reader moves, the first 90 days with what gets measured, the team with the partner
   disclosure. Every figure in one data file, every chart computed from it, every source named under it.
9. **Every number reopened on the day it ships.** A research agent re-verified the plan's facts with three checks each.
   Then I rechecked the ones it didn't cover, and one count from the day before failed ("Zuverlässig on 9 of 17", really
   7 or 10 by method), so the number was cut.

### The QA that ran, and the floor it sets

Copy audit with a planted control. axe on every page, two languages, desktop and phone (40 runs). Overflow at nine
widths from 1920 down to 320 (180 loads). Text spilling out of its box with a planted control caught every load. Header
at 13 widths. Hero at 9 sizes. The booking form end to end with POSTs intercepted. Every interaction by mouse and
keyboard. Films checked to play only in view and never under reduced motion. Live, every file hashed against the
deploy, cold loads at 1440 and 390.

### Every hiccup, and the rule it leaves

| Hiccup | Rule |
|---|---|
| A layout class `.in` collided with the reveal class `in` and centred everything | Never name a layout class after a state class (`.in`, `.on`, `.live`, `.bar`) |
| The menu button sat half off screen at 360 and below | The overflow suite's floor is 320. Below 400px the language switch moves into the menu |
| Test scripts clicked a header control that phones no longer show | Scripts act the way a visitor can at that width, through the menu on phones |
| White 10px numbers on the new signal blue failed contrast | Small text on a brand fill gets a deeper shade of the fill, checked with axe |
| A table built from ul and li with ARIA roles failed | ARIA tables are divs with roles, never lists with roles |
| axe measured an entrance animation halfway | Reduced motion switches every reveal transition off, and axe waits for reveals to finish |
| The brand name, set to never wrap, spilled out of a heading and a table cell | Big headings and narrow cells may break the brand at its hyphen, or the heading steps down a size |
| A daylight photo darkened behind the headline read as murky trees | Put the photo beside the words with a fade from the text side, don't bury it under them |
| "DOCUMENTATIO / N" in a narrow column head on phones | Narrow tables number their columns on phones with a key above, full names kept for screen readers |
| Competitor names written with spans to dodge the dash check | Proper nouns go on the audit's allow list as written, never disguised |
| A quoted WordPress post title carried an exclamation mark | Describe a quoted title instead of misquoting it |

## Hooft & Petiet v2, rebuilt after "it looks like a Claude website" (25 Oct 2026)

Raka's words on v1, "a typical Claude and ChatGPT website … it just feels like it's a 500 euro website". The rules it
left are in `docs/RULES.md` section 5, first two paragraphs. What actually worked, so the next build starts here.
1. **Write the four lines first** (who lands, what they think in order, their goal, the one action) and cut every
   section that doesn't move them. H&P went from eleven sections to seven, home page words roughly halved.
2. **Render real premium sites that day and measure them.** 37 tried, 28 loaded (research/v2/shots, ref.jsonl). Buttons
   were square on nearly all of them, 12 to 14px caps, grounds white or barely warm, colour from photos, one flat field
   at most, headlines regular weight. Copying those measurements did more than any effect.
3. **Make the action a bar, not a button,** where the visitor has something to book (Plum Guide, Hoxton, Ace). The H&P
   bar carries type, number, month and duration into the quote form.
4. **Type test before building.** Three hero variants rendered side by side, Newsreader beat EB Garamond and an all sans
   version on screen.
5. **Traps hit.** A white version of a logo made by flattening all pixels wiped out lettering that was white inside a
   coloured shape (KeyPro's "key"), so map each colour, don't flatten. A focus call on a menu still at visibility hidden
   silently fails, so focus on the next frame. A long Dutch compound ("Calamiteitenwoningen") overflowed at 320px in a
   two column tile, check 320 every time. A reveal scale on a band image only looked like overflow, the real culprit was
   the word. When a prototype is rebuilt, the delivery email's description of it has to be reread, v1's line described
   scenes v2 no longer has.
Brief, research and plan, `state/prototypes/hooftenpetiet/research/v2/brief.md`. Live at the same two URLs.

## Hooft & Petiet v3, the wow layer on v2's flow (25 Oct 2026)

Raka on v2, "it feels like it's so plain and basic … Now you've done the flow, but not the artistic value. It needs to
have a wow effect." v3 kept every v2 section, question order and the one action, and added one signature idea per site
taken from their own words. Brief in state/prototypes/hooftenpetiet/research/v3/brief.md, engine in build3/js/fx.js.

**What carried the wow.** H&P, a living WebGL gradient that moves from dawn to dusk down the page, photos set inside a
giant headline as an arch window and their house shape, the arch opening into the full room with the lights coming on
(their promise, "direct bewoonbaar zodra de sleutel wordt overgedragen"), a sticky arch that swaps photo per row, a giant
kinetic line with photos in the words, a hover photo per home type, a concave panorama, a lit window at dusk. ReShare, a
particle sculpture that re-forms into four pieces of furniture with a life counter, a 3D photo ring with Re, Share and
Living, doors on moving gradients, a cycle that draws round.

**Traps, each one cost a pass.**

| Trap | What happened | The rule |
|---|---|---|
| A sticky hero under a sticky header and a note bar | The availability bar sat 106px below the fold at scroll 0 | Stick at the header's height, height 100svh minus it, and lift the bar by the note's height |
| A concave ring built with the wrong sign | rotateY on the figures and the ring added instead of cancelled, the panorama rendered nothing at all | Check a 3D scene in a screenshot before writing any other code around it |
| A transparent sticky header over a WebGL canvas made with alpha false | Chromium composited black under the header and in clipped shapes | Make the context alpha true and give the header a 1% trace of colour. Then scan every screen for pure black with the grain overlay off, because the grain hid the fault |
| Headless screenshots of a page with WebGL | The capture still drops the canvas under the header, though canvas readback shows every row drawn | Read the canvas pixels back before believing a screenshot about the canvas, and keep a CSS gradient under it so any gap is colour |
| mediump in a noise shader | The permute and hash overflow at half precision on phones | highp with a mediump fallback, and a hash that keeps its numbers small |
| A photo per service row picked for the look | Two came from job ads, and the caption beside the photo names the service | Pair a photo with a service only when their own page for that service carries it. hp-images.json maps every image to its pages |
| Lazy images clipped to nothing under reduced motion | Never loaded, so the static page showed one photo where seven were promised | Let the swap run without animation under reduced motion rather than freezing it |
| A word fill effect | axe flags every word not yet read | Accept it as a reading effect only if reduced motion and screen readers get the full text, and say so in the handover |

## Saavedra, the Hertling v3 recipe on a restaurant (25 Oct 2026)

Julien Salvat said yes to "a sketch of the Saavedra catering and events site". Built the same day to the Hertling v3
bar, French first with an English switch. The idea is their own poster line, "Menos palabras, más empanadas", and the
page runs through a team's day, the sky following the clock. A box builder sizes the order at card prices and hands the
headcount to a one step quote. The growth plan opens on the co-founder's own July post naming catering as the next
step. Live, https://astra-saavedra-prototype.netlify.app/ and https://astra-saavedra-plan.netlify.app/. Source and
handover, state/prototypes/saavedra.

### Every hiccup, and the rule it leaves

| Hiccup | Rule |
|---|---|
| A JSON data block (the opening hours, `[[["12:00"...`) looked like a `[[fr||en]]` pair and the translation pass ate half a form | The build fails on any `[[` that isn't a clean pair, and JSON in the page puts a space between brackets |
| A translated label nested inside another translated label broke the same form on one page and not another | Never nest language pairs, build the pieces side by side. The build check catches it |
| `var per` inside a loop shadowed the function `per()` and the box builder died, while its layout test passed | A test that counts things off the board must also assert the things exist. Every negative UI test gets a positive assertion, the same rule as absence claims |
| A 16h "goûter" step in the day scene, when the shop is closed from 14h30 to 18h30 | A day or timeline scene only shows formats inside the business's published hours. Read the hours first (Zelty, Uber Eats and Google agreed) |
| The scroll scene's sun crossed the paragraph at 18h30 | Moving decoration takes a path through empty space, behind the clock on desktop and the empty top half on phones |
| Pastel pink headline words on light blue failed axe at 1.5 to 1 | Keep the brand's pastel for dark grounds, add a deeper shade of it for text on light ones |
| Two of their own photos carried third party bottle labels | Their own photos get the third party check too, crop it out or drop the photo |
| An agent said the menu was four images, it was three plus two decorations. Two counts of nearby offices differed by two | Agent facts are a candidate list. Recount what you'll print, and when two careful counts differ, print what both support (300+) |
| New Netlify projects came up with team login on | Switch SSO off on every new project before the first deploy, then check a cold load sees the page |
| Netlify rewrites the form tag on pages with a form | Live hashing will show those pages as different. Diff them, the form tag should be the only change |
| Raka's "no Claude look" rule landed on the branch mid build, and the first deploy still had pill buttons with arrows, floating stickers, glows, photo fades, a soft shadow form card and a three step block | Pull the branch before the first deploy as well as at the start, because rules change during the day. Then check the build against RULES section 5's banned list item by item before anyone sees it |

**Found in the final live pass (H&P v3, 25 Oct).** A radial glow whose visible area crosses a section's top or bottom
edge leaves a faint straight seam where the next section starts, so keep every glow's visible radius inside its section,
or put adjacent dark sections in one wrapper with one background. A three column form bar (two fields and a button)
cut "Bijvoorbeeld 24" at 1440, a placeholder is content and needs its full width at every size. And a live sweep can
fail one load because the proxy aborts a stylesheet (it arrives as text/plain), so before calling the site broken,
fetch the file directly several times and reload the page, Netlify served text/css every time.

### v3, the same evening. One order carried down the page

**Raka signed it off on 25 Oct, "Brooo amazing! Write in the mds to always make these kind of plans and prototypes."**
So this is the recipe to repeat, written into `docs/RULES.md` section 5. The delivery went out the same afternoon
without the "spent the whole day" line, which he cut and which is gone from the skeleton in CLAUDE.md.

Raka on the restyled build, "be more creative in animations, videos, photos, things, graphs, whatever, think about the
DESIRED UX UI user action and how the whole flow guides them". What worked, so it gets repeated.

1. **Write the flow as a table before touching code** (research/flow.md). Each row is the visitor's question at that
   point, what they see and do, and the moment that answers it. The moments came out of the questions, not the other
   way round.
2. **One state, every display reads it.** A single order (headcount, format, appetite, deal, drink, recipes) written by
   every control and read by the hero number, the empanada line, the table, the ticket, the per head rows, the bar at the
   bottom, the stub above the form, the hidden form field and the fallback mail. Nothing is typed twice, and the form
   arrives filled in.
3. **The hero is the first input.** "Vous êtes combien ?" with a giant draggable number is both the headline and the
   first answer, and the sun turns with it. Drag is sideways on touch so the page still scrolls.
4. **A graph that is also a control.** The per head rows switch the order when tapped, and the plan's 120 dot wall is a
   slider. A chart the visitor can move gets read.
5. **Film only where it means something, and never claimed.** Two Mixkit Free fire loops, no people, masked into their
   sun and their arch. Still frames as posters, played only on screen, never under reduced motion or data saver, and the
   handover asks for their own footage.

| Hiccup | Rule |
|---|---|
| `.oc-rows span`, `.fm-chips span`, `.fmt-list li span`, `.card-boxes span` also hit the language spans inside, so every chip drew a box inside a box and price fonts landed on descriptions. Two of these shipped in the first deploy unnoticed | On a bilingual build every descendant `span` selector is a bug. Use child selectors (`label > span`), and grep the CSS for ` span {` before each deploy |
| French thousands rendered as "1227,00" in the display font, the narrow no break space U+202F isn't in the subset | Replace U+202F with U+00A0 in every formatted number, in the page script and in the build's static copy |
| The static no JS price said 10,22 and the script said 10,23 | Round the build's copy the way the browser does, from the shortest decimal, half up (`Decimal(repr(v))`). Check a tie (10.225) both ways |
| A box of 6 stretched to the row height of the boxes of 12 and looked like three empanadas were missing | Flex rows of different sized objects get `align-items: center`. Look at the last box, not the first |
| The form test missed once with a 560 px overshoot while axe loaded the machine | A smooth scroll followed by a timed focus isn't a landing. Land on `scrollend` with a timer fallback, re-align if off by more than 40 px, then focus |
| Rebuilding while the long QA runs were going produced a 404 font in the overflow run | Never run the build while a QA chain is running. Note the build's hash when the chain starts and check it's unchanged when it ends |
| The fire masked into the sun with `hard-light` turned their yellow sun brown | Test blend modes side by side on the real frame. `overlay` kept the brand yellow and let the flames move inside it |
| The plan's coworking map labels were pills with a soft shadow, missed by the restyle | Check the plan site against the banned list too, not only the client's site |

### Hooft & Petiet v3.1, the plan for a two brand group (25 Oct 2026)

Raka's "Do itt" on an honest review of v3 (the sites were strong, the plan was missing). Live,
https://astra-hooftenpetiet-plan.netlify.app/, beside the two sites. Source build-plan/ in state/prototypes/hooftenpetiet.
What carried over from Saavedra and worked again. Every figure in one data file, the charts computed from it, and a
functional test that works every sum out on its own from that file, then runs once more with a planted fault per check.

| Hiccup | Rule |
|---|---|
| A photo of a woman setting a welcome card sat beside "Brenda de Wilde's line", so a reader would take her for Brenda | A photo next to a named person's words is read as that person. Use a photo with nobody in it unless the client's own page names who it shows |
| Brenda's line went into the first draft shortened, "Alleen de koffer moet nog worden uitgepakt", the article says "nog door de bewoners worden uitgepakt" | A quote used as a headline is copied from the page, never from memory or a note, and checked against the page before the build |
| "Four projects in their words" when two of the four quotes are clients, one a resident and one H&P's own project manager | Before counting quotes as client proof, label each quote by who said it |
| A dark section mid page set the page light dark, and the next light section's first lines sat dark on dark until its top reached mid screen. axe with motion on caught it, 274 nodes | Mid page dark sections carry their own opaque background and keep the page light warm (data-tone stays light, data-hdr="dusk" turns the header). Only the last section may set a dark page light |
| A hidden chart tooltip kept its desktop position after a resize and widened the page by 43 px at 320 | Hidden tooltips are display none, not opacity 0, and close on resize. Test overflow after a resize, not only on a fresh load |
| The week stepper's minus was the U+2212 minus sign, which the dash scan rightly flags | Draw plus and minus as SVG lines, so the page carries no dash glyph at all |
| The two superseded email versions in the drafts file failed the drafts gate as openers and as repeats of the live one | Move superseded versions to a sibling file marked GATE ARCHIVED, so the gate judges only what could be sent |
| The new Netlify project came up with team SSO on, again | Switch SSO off right after create-new-project, before the first deploy, every time |

### Fae Club, the Saavedra recipe on a fantasy ball (25 Oct 2026)

Elle Lawrence said yes to "a sketch of the new Fae Club site", and Raka asked for the prototype and the plan. Built the
same evening. Live, https://astra-faeclub-prototype.netlify.app/ and https://astra-faeclub-plan.netlify.app/. Source and
handover, state/prototypes/faeclub. The hero is their own question, "Who will you be?", answered from their dress code,
and the answer goes onto the cover of a storybook that opens through the night in their words and photos and dives into
their photo of the hall. One ticket carries down the page to a QR that forms on the ticket. The plan's signature control
is the route a ticket takes, pay in full or in 3, today or the new site, with the stops that are hers marked.

| Hiccup | Rule |
|---|---|
| The first book photo was counted as the largest paint while it sat hidden under the closed cover, phone Lighthouse 68 | Photos inside a scene that opens on scroll load when the scene gets near them, not at page load. The scene's first frame is what the visitor sees, so that's what gets loaded first |
| On phones the hero copy faded out and left an empty band above the book | When the words above a pinned object leave, the object moves into the space they leave |
| White words on their bright hall floor were unreadable at the end of the dive | A caption on a photo gets a shade that fades in with the caption and only where the words sit. That's legibility, not the banned dark overlay on every photo |
| The left base page faded in while the cover was mid turn and read as a flat sage panel | Nothing appears on the far side of a turning page until the page has passed upright |
| The prototype note was cut off with an ellipsis on phones | Notes that say a page is a prototype wrap on phones, they're never truncated |
| Wix pages rendered at 390 showed the desktop layout cut off | Today's screenshots of a Wix site come from the desktop render, and a phone render is only used after it's been looked at |
| check-drafts read the archive marker's words inside a sentence of a live drafts file and skipped the whole file | Never write the marker's words in a live drafts file's prose. Check the gate printed a draft count, not ARCHIVED |
| `pkill -f "http.server 8705"` matched its own shell and killed the command twice (exit 144) | Find the server's PID with ps filtered on the python process, or start it as a background task, never pkill a pattern that's also in the command line |
| A local server started inside a folder the build deletes and recreates served nothing after the rebuild | Serve with `python3 -m http.server <port> -d <absolute path>` so it follows the path, not the old folder |
| The plan's sticky frame showed the previous caption's screenshot while the next caption was being read | Pick the active caption by position, the last one whose top has passed 60% of the screen, and test that caption i shows frame i |
| Inactive captions dimmed to 45% failed contrast in axe | Never dim text to show state. Mark the active item with a rule and a brighter heading, keep every line at full contrast |
| Klarna's own UK pay in 3 page couldn't be read, retailer pages said 30 and 60 days, Stripe's page said every two weeks | When two sources disagree on a provider's terms, the build labels its dates as an example and the plan says the provider sets them |
| One rival from the first research (Through The Veil) had already happened and its page returned 410 | Rivals in a chart are reopened on the day and dropped once their date has passed. The day's search found a rival on the same night as the client's ball, which was worth more than the old one |
| Raka's word "prototype" against the 0G rule of one screen when there's no budget sign | Build what he asked for by name, and put the budget flag at the top of the report and in the drafts file |

### Fae Club v2, after "its an art company and the website is not artsy enough" (25 Oct 2026, evening)

Raka on v1, "Take the design 10x further with the art the animations the colours gradients and all!!! Come on". v1
was correct, on brand and calm, and that was the problem for a company whose product is a night of fantasy. What made v2,
repeat it for any lead whose business is an experience.
1. **Find the hero inside their own mark.** Their logo's C is a crescent with a fairy scattering stars. Traced from
   their own logo file with potrace (cut out by connected shape so the letters stay behind, upsampled 4x, the frame
   curve dropped) into one crisp vector, then made the hero, huge, in moving foil, her stars turned into a live stream.
   The interaction came out of the mark, her stardust gathers the guest's portrait.
2. **A colour script, not a palette.** One WebGL sky behind the page whose colours move through the jewel tones their
   audience lives in (rendered from the Sarah J. Maas and FairyLoot sites that evening), eased by the section in view,
   tinted by the visitor's own choice.
3. **Everything you'd hold gets a material.** Velvet and gilt for the cover, parchment and gilt edges for pages, foil
   that tilts for invitations, liquid gold in arches for money, wax for a seal.
4. **Their architecture as the frame.** The Spanish Hall's arches became the photo frames and the payment arches.

| Hiccup | Rule |
|---|---|
| A liquid wave inside a clip-path arch was twice the arch's width and the page scrolled sideways at every width | clip-path hides, it doesn't contain. Anything animated inside a clipped shape gets overflow hidden on the clipped box too |
| The scroll scene's class was added by the deferred script, which now waited behind a new art script, and the moon jumped at 2.7 s (CLS 0.14) | A layout that changes when script arrives is switched on by a one line inline script at the top of its section, not by the deferred bundle |
| The moon's halo had a hard circular edge | Glows use closest-side gradients that reach zero inside their box, never a border-radius cutting a gradient that hasn't faded |
| The wax seal sat on the ticket reference on phones | Stamps and seals sit across an edge (the band's foot), never on data |
| The art loop on the plan, a document, cost 770 ms of blocking time on phones | Decoration on a reading page starts on the first scroll or touch. The hero of a prototype may start at load, with a low power mode that halves the work when frames run slow |
| The late start let a mouse move draw sparkles before their sprites existed, and the plan test caught a script error | Every entry point of an art layer checks one ready flag. A delayed start needs its own test pass |
| A translucent header turned grey over the plan's paper chapters and failed contrast | Glass only over a ground you control. Over paper the header is near opaque |
| The guest ring read as scattered and its bottom portrait sat on the label | Shapes made of small photos need a visible line joining them and room below the arc |
| The first cross fade from moon to book ghosted | Sequence a hand over, the first thing leaves before the next arrives, the one object that travels (the portrait) carries the eye across |
| numpy and scipy weren't on /usr/local/bin/python3 | `python3 -m pip install` for the python the build runs on |

### Fae Club v3, the route to the ticket (25 Oct 2026, late evening)

Raka on v2, "i love the art, just one last recheck or redo; does this website make it super easy to tell the story
and guide the intended audience to the intended action?". It told the story and didn't guide. The art had grown around
the flow table until the action was 9.5 screens away. **Run this walk on every build before it ships, and answer his
two questions in the handover, who it's for and the one action.**

`state/prototypes/faeclub/qa/guide-walk.js <url> <out dir>` scrolls the home page half a screen at a time at 390 and
1440 and prints, for each step, whether the sticky bar is on and how many ticket actions are on screen. It also
screenshots the hero, the scroll scene and the screen after it. The standard it sets.
1. **The first screen carries the price and the action**, worked out from the data, beside the first input. The
   immersive scene is the second path ("Or scroll to open the book"), never the only one.
2. **No half screen without a way to the action**, from the top to the checkout. The bar starts when the hero's own
   call leaves, not after the scene, and steps aside wherever another call is on screen.
3. **The emotional peak ends on the action.** The best line in the scene gets the button under it.
4. **Headings tell the truth about stock.** "Two ways in" over a sold out tier promised a choice that wasn't there.
5. **The fear gets its proof where it's asked.** The solo guest's own words belong in "Coming on your own?", not at the
   foot of the page.
6. **Every visitor in the four lines has a route on a phone.** A hidden nav with no menu left the second visitor about
   21 screens from her page. Each page's header calls its own action (the retreat says Reserve).
7. **A bar on a phone leads with the price**, or the ellipsis eats the one thing it's for.

| Hiccup | Rule |
|---|---|
| The phone menu panel at 97% opacity let the hero's gold type show through | A menu over a busy page is solid, with a shadow under it |
| In reduced motion the bar and the flat hall button showed together | Whatever hides the bar beside a call checks the call each mode actually renders |
| The phone bar's text "1 ticket · Enchanted · Pay in..." lost its price to the ellipsis | Rule 7 above |

### BeBetter, the Saavedra v3 recipe on a gymwear brand (25 Oct 2026)

Laurens van Dorp said yes to "a sketch of the new BeBetter site", promised as "a more professional BeBetter site that
sells the line and has its own page where gyms design and order their custom kit". Live,
https://astra-bebetter-prototype.netlify.app/ (the kit page is /gyms/) and https://astra-bebetter-plan.netlify.app/.
Source and handover, state/prototypes/bebetter. The idea came from their own work. Every custom kit they've posted shares
one grammar, a washed tee from the back, the gym's name across the shoulders, an emblem, EST and a city. So the kit
page is that back, full screen, and the visitor's gym is printed on it as they type, then every control changes the
same garment. The teardown (53 sites) found 6 of 44 apparel sites showing a garment from the back and none letting you
change it.

What carried over and worked again. The four lines and the flow table before any code, one state written by every
control and read by every display (the four garment symbols, the work order, the bar, the stub, the form and the mail),
a planted control on every test, and the plan's numbers in one data file with their sources.

| Hiccup | Rule |
|---|---|
| The print colour variable was called `--ink`, the same name as the page's ink, and the whole page turned tan when the script set it | Garment and brand variables get names nothing else uses (`--print`, `--g`). Grep the CSS for every custom property kit.js sets before the first build |
| The size run's wrapper had class `sr`, which is the screen reader only utility, so every bar was 1 px wide and invisible | Utility class names are reserved. Grep the CSS for a class before giving it to a component |
| Classes on a wrapper never reached the garment, because a `<use>` copy is styled from its symbol's place in the defs | Everything that changes inside a `<use>` is a CSS custom property (`display:var(--v-mono)`), set on `<html>`. They inherit into the shadow tree, classes don't |
| An aria-label built as `{L(en, nl)} XS` put two language spans inside an attribute and broke the HTML | A language pair is a whole attribute value or nothing. The build now fails on any `l-en` span inside an attribute |
| A blur filter on a perfectly vertical fold path drew a hard line | Filter regions default to the bounding box, and a straight line has no width. Use `filterUnits="userSpaceOnUse"` on soft shading |
| An SVG with `width:auto` inside an inline block wrapper rendered at zero size | Give the SVG `aspect-ratio` and a height, and the wrapper `width:fit-content` |
| The clock scene was wrapped twice, once by the page and once by its own builder, and its quotes floated over the next section | A component builder returns only its inside, the page owns the wrapper |
| The plan's source times were typed from memory and some were wrong | Metadata is copied from the facts file, never typed. Where the file has no time, say the session window |
| Two plan lines said more than the sources. "The one brand that designs" (Eigen Label also designs lines) and "gyms sign most of their members in January" (operators say 25 to 40% more that month) | Reread every plan sentence against its row in strategy-facts.md before the build, and state the limits of a search under the sources |
| Their own kit artwork carried a Nike swoosh on the teddy's shoe (Bookaleap), a stand photo a BOSS logo, another Monster crates | The third party check covers the client's own designs as well as their photos. Crop it, or leave it out and tell them |
| "By June we'd made custom kit with 10 gyms" when their post says "working with" | Quote their verb |
| The drafts gate failed a €2,500 price quote, its money rule only allows a figure that quantifies a loss | Don't game the gate. Put the priced version in its own file, flag it, and let Raka decide |
| The hidden RECEIVED stamp at scale 1.6 poked out of the screen at 390, caught only because the overflow control run listed every offender | Read the control run's full output, not only whether it caught the plant |
| `a && b && (tests) &` backgrounded the whole chain, so nothing printed and it looked as if nothing ran | Background only the test runner, never the end of an `&&` chain |
| The inbox routine drafted a holding reply to Laurens ("I'll put the sketch together this week") while the sketch was being built, so two different messages to one lead sat in drafts | Before writing a delivery draft, grep state/ for every draft to that contactId and archive the one it replaces, with a line saying why |
| A build hash compared with absolute paths before and relative paths after reported a change that wasn't there | Hash the same path strings both times, or hash the file contents only. Rebuild twice to prove the build is deterministic before believing a change |
| "Never dim text to show state" landed from another build mid session, and the clock's future quotes were dimmed to 50% (axe passed at large size) | Pull before the final deploy and check the build against rules added that day. Reveal what comes next, never dim it |

The plan's spine came from the facts agent finding BeBetter on the Sport Ondernemers Expo exhibitor list for 4 Nov, the
only Apparel entry of 97. They're already selling to gym owners face to face, so the plan builds on that instead of
pitching gyms as new, and the delivery names the fair. The film is one Mixkit Free loop (a hand wrap, no face) played
only inside a huge 1%, knocked out with multiply and outlined in their tan, because their creed is the one place film
means something on a brand with no footage of its own.

#### BeBetter v2, the art layer (25 Oct 2026, evening)

Raka on v1, "supperr basic ... really just a cheap website ... make it like something they havent ever seen before. but
still simple and tell the story and GUIDES THE AUDIENCE TO THE INTENDED ACTION". v1 had the flow and no wow layer. v2 kept
every section's job and gave each one a signature moment built from the brand's own material, after rendering about 24
award sites that evening (research/award-v2.md). The teddy, traced from their own PNG into the five tones a screen
printer would separate, is printed live one pull at a time. Their creed, 1.01 to the power of the day, is a dial of 365
bars that the scroll turns. The drop is a tag you swing. Their stand photos are tees on a rail. Their year on the road is a
halftone map with a van. On the kit page the screen frame drops for every pull and a SOLD OUT stamp lands at four hours.

| Hiccup | Rule |
|---|---|
| A local variable `L` in the dial builder shadowed the language helper `L()`, and the build died with "float is not callable" | Never give a local the name of a module helper. The language helper is one letter, so locals are words |
| The dial's bars flew off the screen when turned, because CSS `transform-origin` with `transform-box:view-box` on an SVG group with a negative viewBox didn't rotate about the centre in Chromium | Rotate SVG groups with the `transform` attribute, `rotate(a)` about the user space origin, and put the origin at the centre with the viewBox |
| A reveal class on the chart's text (`.in` sets visibility visible) beat the zoom's hide rule, so the lines showed through the flying bars | When two states set visibility, the later state's selector must be more specific than every earlier one. Test the hand off frame, not only the end frames |
| The road scene never updated after a fast jump, because the loop cleared its dirty flag while the IntersectionObserver hadn't yet marked the section visible | Cheap scroll scenes recompute on every scroll, gated by nothing async. The scene test jumps straight to the end of each pinned section to catch it |
| An absolutely positioned map with `grid-area` set took the grid cell as its containing block and landed in the wrong place | An absolute grid child uses its grid area as the containing block. Give it `grid-area:1/1/-1/-1` to place it against the whole grid |
| `@keyframes stamp` in the new stylesheet silently replaced the work order's RECEIVED stamp of the same name | Grep every keyframe name across all CSS before adding one. Names are global |
| `box-shadow` on the clip-path hang tag vanished, clip-path clips it | Put `filter:drop-shadow()` on the unclipped parent |
| The moving window light and the swinging door hanger pushed the page wider at 390 | Anything that moves or rotates sits inside `overflow:clip` (which doesn't break sticky), and pendulums get a small maximum angle |
| The kit page promised "watch it print" but the squeegee only pulled on blur or Enter | If the copy promises a reaction, the reaction happens on the gesture the copy names. The print now pulls 650 ms after typing stops |
| The film test failed once the film was retired, and the retired film and unused photos would still have shipped | Retire the test with the feature and replace it with one for what's new. The build now copies only media a page references |

#### BeBetter v2.1, the type (26 Oct 2026)

Raka loved v2 apart from one thing, "the choice of fonts! They look cheap as f. Not exclusive". The font names pulled
off 25 premium fashion and gymwear homepages that morning settled it (RULES section 5, "The type has to look expensive
too"). Every site face moved to Mona Sans (OFL, variable weight 200 to 900 and width 75 to 125%) and Fragment Mono
(OFL). Headlines are weight 520 with tracking at minus .045em, the big numbers (the dial's 37.8×, the tag's 27.10, the
map's month, SOLD OUT) are condensed 75 to 78% at 640 to 800. Their serif wordmark stays as the logo. Anton, Graduate
and Pirata One stay only as the garment lettering choices.

| Hiccup | Rule |
|---|---|
| A font swap touches every `font:` shorthand that names a weight, so a plain family replace would have left every headline at 400 in a grotesk | Sweep the rules with a script that rewrites weight, line height and tracking together, sized by the rule's own font size, and grep for the old family names after |
| The garment text and kit.js both measured the side text and motto in the old fonts | When a family changes, grep the JS for family names too. Fit by measurement only works if it measures the font that renders |
| The plan's screenshots of the kit page showed the old type | Screenshots of our own pages inside another artefact are build inputs. Retake them after any visual change |

### BWILD, a launch site and a plan with the cost (26 Oct 2026)

Lupo said yes to the SKETCH and asked for "your vision and expected cost". Raka, "lets do it. dont repeat wrong
mistakes". The Saavedra v3 recipe with every Fae Club v3 route rule from the first build. Their Instagram question
"Sunrise or night?" is the hero's input, the sky is the sun's real position at the runner's minute, headlights come up a
dark road and the logo's three slashes flare at the BFU's 140 m, a year of daylight counts their dark runs, and the €1
prints a race bib. The plan is the first to carry Astra's own price, one recommendation and one smaller start, because
the lead asked for the cost in writing. State and URLs in state/prototypes/bwild/handover.md.

| Hiccup | Rule |
|---|---|
| The research said "no Kickstarter page found" off a Kickstarter search. Their own SAVE THE DATE button links to a live prelaunch page | Before any absence claim about their launch, store or booking, read the hrefs of every button on their own pages. A search of a third party site is never the control |
| A grep of six pages for a presale href found none, and "the site never links to the presale" was one line away. The bar's link lives in Squarespace's announcementBarSettings JSON | On a site builder, read the settings JSON in the home HTML (announcement bar, popup, footer) as well as the hrefs. Squarespace keeps the bar's link there |
| The film check ran after the test had scrolled the whole page, so every film had loaded and the check failed for the wrong reason. Fixing the test then showed a real fault, all nine films loaded at the top | Test lazy loading on a fresh page before any scroll. An IntersectionObserver fires once for every target on observe with isIntersecting false, so the wake handler must do nothing for an unwoken element that isn't intersecting |
| Mona Sans draws a slashed zero in its tabular figures, so "90" read as "9θ" | Use proportional figures for display numbers. Where a number changes in place, measure the widest value across its whole range in the page and fix the box to that width in em |
| The sticky bar hid for the whole reserve section, so the header button was the only action on screen there. Then it sat on top of the email field | The bar steps aside for every visible element of the action itself (any reserve link and the form), not for a section's bounds. The walk counts, at every half screen, the bar, the in page actions and the header button |
| The RESERVED stamp at top:61% covered "GENEVA" in the run line at 320 and 390 | Anchor an overlay to the thing it sits on (bottom of the strip), and test overlap mechanically at 320, 390, 768, 1024 and 1440 with getBoundingClientRect |
| The lit panel at brightness(4.2) became a flat white box with a torn edge where the gathered hem fell under the mask threshold | Light reflective material at about 1.5 so the folds stay, and smooth a mask's ragged edge with a median filter over its per column contour |
| A film inside three floating slashes beside the road was unreadable and sat apart from the scene | One object on the road. A film that can't be read at its size is cut from the scene, not shrunk into it |
| Chromium got a 404 on the Adventure Vest page while curl got 200 with the product | tools/render-via-curl.js before any claim, and say in the handover that the 404 is ours |
| check-drafts failed the delivery on €2,500, because a currency figure in a message must be a loss figure | A quote lives on the plan page, the message says the cost is there. Don't argue a gate by hand |
| The plan's chapters alternated cream and black, the RULES section 5 tell | One bright chapter only, the figure that carries the argument (here LaunchBoom's 30×), everything else on their night |
| Another session marked Lupo "waiting on Raka's price" while this one was building for him | The moment a session takes a lead's next message, append a queue row saying so and push, so the other session doesn't draft a second reply |

### BWILD v2, the art build (26 Oct 2026)

Raka sent v1 back the same afternoon, "i feel like this is a normal CLAUDE website ... it really doesnt have a wow
effect". v2 kept every flow and goal and rebuilt the art around the light of one run, from first light through dusk and
night to the next dawn. Their slashes open onto their golden film, a WebGL sky sets behind a ridge traced from their film,
the runner's dark runs come out as stars, their render plays each spec in orange, and their bear opens onto the Swiss
Peaks. The RULES section 5 rule that the first build is the art build was written from the same words on Honey It's
Handled the same day. Every hiccup below was found by a screenshot, a measurement or a check, none by reading the code.

| Hiccup | Rule |
|---|---|
| The sticky header sat in the page's flow, so the hero started 64 px down and its last link fell off a 900 px screen | An overlay header takes `margin-bottom:calc(-1 * var(--hh))`, and the first screen test measures every hero action against `innerHeight`, not the section's own box |
| Inside their slashes the film showed mostly white sky | Find where the subject sits across the whole film (a contact sheet at one frame a second), then scale the film and move its centre onto the mask's centre, easing back to the screen's centre as the mask opens. Grade it warm so the bright frames read as light, not paper |
| The stars sat behind the headline, and on a phone the slice of a 1440 wide SVG showed a third of the year | Data drawn behind words gets its own SVG laid out in real pixels from the screen's size, in a region measured clear of the copy (a gap of 59 px at 1440 checked with getBoundingClientRect), and its own layout on a phone |
| The stars in crisp arcs under month labels read as a chart, one of the RULES tells | Scatter a data field with a seeded jitter big enough that it reads as the thing it pictures, keep the shape of the data in it, quieten the axis. Tapping still gives the exact value |
| One fixed sky behind sections with white and black text. At each boundary the sky changed while the last section's words were still on screen, white words on peach | A section whose text needs a particular ground paints that ground itself. The shared sky only shows under chapters that agree on it, and a painted band carries one ground into the next (night to peach as first light, peach to night as dusk) |
| The star SVG's own box took pointer events over the copy layer, so the clock couldn't be clicked | A full screen decorative SVG gets `pointer-events:none`, and only its live marks take `pointer-events:all` |
| `inert` on the faded hero copy took the page's only h1 out of the accessibility tree once the slashes opened | Make the controls inert, never the heading. axe at the end of the scroll catches it, axe at the top doesn't |
| ADVENTURE in the heading was wider than a 320 px screen, and the page panned 43 px sideways though body had `overflow-x:clip` | body's overflow is handed to the viewport, where clip behaves as hidden and scrollTo still pans. Test `scrollTo(200, y)` then read scrollX at 320 and 360, and size one word headlines to the narrowest screen |
| Headless Chromium has no H.264, so it fetched the mp4, failed, and fetched the webm, doubling every film in Lighthouse | Name the codecs in each source's type (`avc1.64001F`, `vp9`), so a browser that can't play one never fetches it, and list the smaller file first. Here the x264 files were the smaller |
| The 2.4 MB hero film and nine posters loaded before anything else on a phone | An upright phone cut of the hero film behind a `media` source, the hero film and the WebGL sky started after `load`, every poster from `data-poster` a screen away. Phone weight 3.2 MB to 1.6 MB |
| Mobile Lighthouse 58, mostly long tasks in sky.js | Prove the cause before writing it down. The renderer string said SwiftShader, and blocking sky.js alone gave 78. Then cap the sky at 30 frames a second and rest it while it's covered, and report the live number |
| An edit script failed halfway through, after build.py had changed and before site.js had, so the hero film stopped playing, and 19 of 19 checks still passed | Run multi file edits as separate calls or check every assertion before writing any file. And add the check that would have caught it (here, the hero film plays after load, with a plant that stubs play) |
| Netlify skipped two v2 uploads, "Skipped due to account credit usage exceeded" | Read the deploy's error before touching the build. Commit and push first, retry later, and keep the delivery unsent while the live URL still serves the old build |

### Honey It's Handled v2, the art build (26 Oct 2026, evening)

Raka on v1, "i feel like this is a normal CLAUDE website ... be an artist ... shapes, gradients, animations photos,
GRAPHICS, to tell the story". v1 was one pale marble texture, serif and italic, a kicker on every heading and her photos in
small boxes. v2 is built in build-v2/ writing site-v2/ beside it, live at https://astra-honeyitshandled-prototype.netlify.app/
(deploy 6adfaa7fe2823bf3291bc4c3) once Raka added Netlify credit, and also one file from tools/bundle-site.py. Source and handover, state/prototypes/honeyitshandled (research/v2-brief.md,
art-direction-v2.md, flow-v2.md, the v2 section of handover.md).

**What made it, repeat it.**
1. **Her own post is the story.** Her 15 Sep caption ("It starts long before the guests arrive. With an idea. And a lot of
   little decisions. Every detail considered. So when the doors open... there's nothing left to do but celebrate.") gave
   the section headings in her words and the order, and her 17 June "Something Off-White. Something Blue. Something Red."
   gave the colour script, once from off white to blue to red. Read every caption on the lead's Instagram before the
   flow, the spine is often already written.
2. **The hero asks who you are, and the answer re-sets the page.** "What are we celebrating?" with three answers, the
   couple, the host and the company. Each answer swaps the words, the photo under the lens, the night behind the doors, the
   order of her two nights, the help options, the form type, the letter and every button, so all three visitors get their
   own route and action from one page (the Honey v1 tell was a single text link for the second and third visitor).
3. **Every signature moment is made from her own material.** Her traced HH as WebGL lacquer, her HH split into two
   doors, her "17 tabs open" as the planner that is the help control, her figures (125, 570+) as windows onto her own film
   and photo, her studio photos as stickers in her own die cut grammar, a mirror ball of facets cut from 30 of her photos,
   her envelope sticker for the sealed letter.
4. **Type from the field, rendered that day.** 26 fashion houses and event producers, nearly all one grotesk and square
   buttons. Mona Sans alone (520 for headlines, width 75 at 760 for the figures, width 125 caps for her own short lines)
   and Fragment Mono for data. Her wordmark is the only serif.
5. **One state, three paths.** `{path, date, place, kind, guests, help, tabs, first}` per path, so switching back keeps
   each visitor's own choices, and the letter, the bar, the planner card and the 17 all read it.

| Hiccup | Rule |
|---|---|
| The figure masks were `url("data:...")` inside a double quoted style attribute, the attribute broke and the 125 and 570+ came out empty | Percent encode every quote inside a data URI mask and wrap it in single quotes. Screenshot the mask before building anything around it |
| The guest markers' `--x` carried a `%` into `calc(... * var(--x) / 100)`, the calc was invalid and the markers fell to the wrong end | Custom properties used in calc arithmetic are unitless numbers. Units go on at the end |
| A Python edit sliced the file between two markers, the first marker also sat earlier in the vertex shader, the slice was empty and `replace('', new)` wrote the new text between every character of lacquer.js | Assert a slice isn't empty before replacing it, or use exact text edits. Committing work in progress every hour is what let `git checkout` undo it |
| The launch offer checkbox and the letter's first name were both `name="first"`, and a test filled the checkbox | Every control name is unique across the page, not only inside its form |
| v1 shipped the Apple mark on Elise's laptop in her best photo, nobody zoomed a portrait | The third party check zooms portraits too, laptops, phones, cups and bags. Here the mark is painted out of the cut out and the handover says so, she should know |
| rembg's isnet model made the laptop lid half transparent. BiRefNet kept it whole | Try two cut out models on the real photo and look at the result on a coloured ground before choosing |
| The media prep ran four BiRefNet cut outs in one process, was killed for memory (exit 137) after the first, and never wrote the manifest, so the build used an hour old manifest, three old cut outs and none of the new photo sizes, while every test passed | Heavy model steps run one per process with a sidecar file each, the prep asserts every step's exit code, and the manifest's time is checked against the newest media file before the final build |
| Lighthouse phone 63, TBT 3.5 s, from the lacquer: a per pixel JS loop building the height field, and frames running nonstop on a CPU renderer | Build fields with canvas compositing (`lighter` and `multiply`) instead of a pixel loop, start decoration on idle after load, rest it once settled and wake it on a hand, cap the frame rate on slow devices. 76 to 80 after |
| On phones the lens walked down the photo with the scroll, and each frame read layout twice, long tasks while nothing visible moved | Measure a scene's geometry once (and on resize or a path change), then move it by writing CSS variables only. Start scroll driven scenes only when they're near the screen |
| `readPixels` returned zeros, and once the lacquer rested there was no frame to read at all | Read WebGL pixels inside a `requestAnimationFrame` after the page draws, look over several frames on a slow device, wake a resting scene with a real pointer first |
| A plant changed the ball canvas's id, the test's frame callback threw, its promise never resolved, and the plant run hung for fifteen minutes | Every evaluate that waits on a frame or an event carries its own timeout |
| The bar stepped aside for the letter section as soon as its top (the mirror ball) showed, leaving a half screen with no action on phones | The bar steps aside for the form's fields, not for the section that holds them |
| "4 February 2027" at 11 vw ran under the right hand column | Size a figure that changes in place to its own column with container units (`min(13.6cqi, 196px)`), and test the longest value |
| ball.js loaded media/facets.jpg from a string in the script, bundle-site.py inlined every attribute and missed it, and the ball was blank in the bundle | Any file a script loads is named in an HTML attribute (`data-src`), so the bundle and the build's copy list both see it |
| Copy said "Every photo and the film are hers" and "her own aftermovie" while the Pro League photos credit Kaat DM | Say where footage is from ("from her page"), never who made it, unless the page says so |
| The local server was a background task with the default limit and died mid chain | Start servers with the long limit, and give a long QA chain its own fresh server |
| `pkill -f` matched its own shell again (exit 144), and the build ran twice while a QA chain was going | The Fae Club and Saavedra rules hold. Find PIDs with ps, and rerun the whole chain on one hash after any build |
| A plant added a MutationObserver that re-added a class on every attribute change, `classList.add` writes the attribute even when the class is there, the page looped in microtasks and the plant run hung | A plant breaks the page once. Never plant an observer that writes to what it observes |
| Three plants were blind, the check read only `[data-o="cta"]` while the plant moved a button out of that set, and a plant listener on the textarea ran before the page's own and was undone by it | A check reads what the visitor sees (every visible call to the letter), and a plant that overrides a handler is registered after the page's. Run plant mode and read every PASS, 33 of 36 caught became 36 of 36 |
| The bar counted a field a few px under the header as on screen while the walk didn't, one half screen with nothing on the company path at 390 | The bar and the walk share one definition of on screen, the same margin from the header and the bar |

### Honey It's Handled v3, a wedding (26 Oct 2026, late evening)

Raka on v2, "it doesn't give me wedding vibes ... it should be magical ... a big picture or a video as a hero ... It's not
exclusive". v2 was built from her two non wedding nights and felt like a nightclub. v3 is built in build-v3/ writing
site-v3/, not deployed (Raka wants the HTML first), one file from tools/bundle-site.py with the Events page as #events in the
same document. Source and handover, state/prototypes/honeyitshandled (research/v3-brief.md, art-direction-v3.md,
flow-v3.md, the v3 section of handover.md).

**What made it, repeat it.**
1. **The hero is the thing they sell, in film.** Four slow cuts from one licence checked wedding shoot (bouquet and lace, a
   dress being buttoned, her hand on his shoulder, a rose in candle light), no faces, one loop that ends on its first frame,
   her wordmark and her own line over it. Chapters drawn from the same shoot read as one couple's day.
2. **Her own rhyme is the spine and the colour.** "Something Off-White. Something Blue. Something Red." (17 June) gave three
   chapters and the reply card in all three at once, an off white card on her blue sealed in her red.
3. **Exclusive is her offer, not a word.** "A few special couples" made the site an invitation and the enquiry a reply card,
   names in foil script, sealed in wax. A thin serif (Fraunces at opsz 144, weights 200 to 300, the free face closest to
   Canela Thin on Passalacqua), her own Figtree for text, Pinyon Script only for the names, square buttons, seven sections.
4. **Magic from the wedding itself.** A WebGL veil the scroll lifts, her 17 tabs as candle lights at blue hour, petals that
   part round the hand, foil names, a wax seal. Each one has a still state and none plays under reduced motion.
5. **Titles on swatches, not glows.** Each chapter title sits on a flat swatch of its own colour, her palette as paper
   samples. It solved contrast over film and removed the last glow.

| Hiccup | Rule |
|---|---|
| The best veil film (Mixkit 8888) and six others read "Mixkit Restricted License", personal use only, though their JSON-LD licence link says videoFree | Read each Mixkit item's `copyrightNotice` and its download box text, never the licence link alone |
| Pexels walled curl, fetch-walled and Chromium | No item is used whose own page couldn't be read, however good the clip |
| Unsplash's download link sits behind an Anubis proof of work for curl | Read the photo page in Chromium (it passes), take the file from images.unsplash.com, the page's og:image |
| New Mixkit items (six digit ids) list no mp4 on the page, the download endpoint answers with an HTML modal | The modal's `data-download--modal-url-value` is the file, fetch that singly |
| Her Instagram embed now shows only the newest six posts and the 17 June brand reveal had dropped off | Read an older caption through its own /p/<code>/embed/captioned/ |
| The type test showed six "serifs" all in Figtree, the font family's double quotes sat inside a double quoted style attribute | Quote families in single quotes inside attributes, and check the computed family before judging a face |
| The first veil was vertical sine folds and read as a corrugated curtain | A veil hangs from a crown, folds radiate from a point above the screen, uneven, low contrast, lace at the hem. Look at it mid lift at six scroll points |
| Two seals shared SVG gradient and filter ids, the build's id check stopped it | Inline SVGs drawn twice get an id suffix per instance, and the build asserts unique ids before it writes |
| Seals and shadows inside a clip-path deckled card would be cut off | The clipped card sits in an unclipped wrapper that carries the seal and the drop-shadow |
| The events form reused name="first", "email" and "message" from the wedding form | Every control name is unique across the document, the second form's names get a prefix |
| Petals seeded above the screen took 10 to 30 s to reach the middle, the test found none there | Seed a scene's particles across the screen as well as above it, and test a pointer effect on a placed cluster (a test hook) so it can't pass or fail by chance |
| The sticky petal canvas with `margin-bottom:-100svh` slid past its section and drew over Elise | A sticky layer with a negative margin can leave its section, give the section `overflow:clip` (sticky still works) |
| Contrast over film, axe can't judge it, 26 of 56 lines measured low, and the first run measured the bar under the text | Measure words on pictures from pixels (qa/contrast-v3.js, the 90th percentile behind the line), bring each line between header and bar first, then fix by design, not by darkening the film |
| The fix by shades read as glows behind the titles | Put the words on a flat field of the brand's own colour instead |
| The bar check passed with the bar hidden, it read the class | A check reads what is drawn (display, size, position), the RULES rule again |
| The walk found four half screens on the events page with no way to the enquiry, the bar and the walk counted differently | One `actions()` list and one on screen rule shared by the bar and the walk, and every page's first screen carries its own action |
| The phone bar's ellipsis ate the help, as on Fae Club. The two line fix still cut the Events date ("Sat 20 Mar 20...") and every state at 320, because only the default state at 390 was looked at, and the test compared the words, not whether they fit | On phones the bar's button is one word (Reply, Enquire) and the details wrap. A test sets every state on both pages at 320 to 430 and fails on any text wider than its box, with a plant that puts the ellipsis back |
| Light labels at the edges were clipped by the stage | Align a label to the side its anchor sits near, per breakpoint |
| The event meta lines and "When's your I do?" sat over headings as small caps kickers | Facts go under the heading, a question is set as a line of the voice, never as a kicker |
| A rerun of the media prep changed the hashes of films it didn't touch, VP9 isn't byte identical run to run | Hash media and run the QA chain after the last prep, never compare across preps |
| A full page screenshot without script showed no posters, while every image had decoded | Judge a no script page from viewport screenshots while scrolling and from decode counts, not one fullPage capture |
