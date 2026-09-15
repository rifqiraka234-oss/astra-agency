# WisTree deck — handover and open items
Live URL: https://astra-wistree-deck.netlify.app

**WARNING, 2026-09-15. The live URL is NOT the current deck.** The imagery pass
(v5) could not be deployed. Netlify rejected two deploy attempts with
`Skipped due to account credit usage exceeded` (deploy ids 6aa96a47494ba99baaeee4ee
and 6aa96a77000db62461acc87e, both state `error`, `skipped: true`). This is a
billing limit on the Netlify account, not a fault in the build. The live site
still serves v4 text-only, and `/img/hero.jpg` returns 404 there. Redeploy this
folder once the account has credit, then re-verify the five images load and
re-check the byte diff.
Imagery pass 2026-09-15 (v5, current in repo, NOT deployed).
sha256 7ffca5b7633c7a95a7fa11dd7a73db1de66de7b35c9b2ce469effe376de87aa9
(51,327 bytes), plus `img/` with five files, 775 KB total.
v4 (last version actually live) was
095ac106d824a6c5f012f91fcc2f49d175e5a84bd03a2a75e09ac839f8e92cc0 (36,870 bytes).
v3 was 03f3969b44416b570676ccb420b2adc5fa83d70778eba4128f8eb6336aef8d08 (44,606 bytes).
v2 was 6cf41043f20768cede67eea974d53ce2ac98d8ec9c75ef5aae820d4356e99bd9 (34,455 bytes).
v1 was 8d16ca3d6ad53cbe8d313b7869701617b2278aab9622ce28f0dcde4515158a9c (37,749 bytes).

## Version history and why
**v1** was built before checking it against the thread. It opened with three sections
of site audit Karim never asked for and only reached his actual question in section 7.

**v2** cut the audit to an appendix and answered only his question, the scale. Correct
but narrow. It informed and did not sell.

**v3, Raka's call.** Full deck arc. Analysed, problem, prototype,
infrastructure, what else we can build, who we are, book a call. The site findings stay
in the appendix. The new material is the architecture of the benchmark service and a
section on the AI work we would pick up alongside their own engineers.

**v4, current.** Same arc, much leaner. Raka's note was that v3 read wordy and
was hard to follow, that it should be English unless German is genuinely needed,
and that the site error list had no place in it. So the appendix is gone
entirely, the diagram and all prose are English, and the word count dropped from
2,472 to 1,567. The German that remains is only the questionnaire itself, which
is what a German plant manager actually answers, and section 3 now carries an
English explanation of all six questions and the four score bands beside it so a
non German speaker can follow the whole thing. Section 6 was rewritten from the
official Astra deck, so it now carries the real company, the Amwisesa delivery
structure, the three named deliveries and Raka himself.

## Structure, v4
Hero, then:
1. What you asked for. His quote, the two jobs.
2. What we found. The free competitor, and why the comparison is the half to build.
3. Try it. The German questionnaire, with the English gloss beside it.
4. What sits behind it. The architecture diagram, English labels.
5. Where else we could help. Four AI and workflow builds, framed as capacity.
6. Who we are. Astra, the delivery structure, the three deliveries, and Raka.
7. Next step. Are these the right six questions, plus the booking link.

No appendix. The site findings (404s, typo, conflicting titles, freemail, empty
Download page) are cut from the deck. They stay recorded in research.md and can
still be handed over separately if Raka wants, but they are not part of this
artefact.

## Structure, v3, superseded
Hero, then:
1. What we looked at. His quote, the two jobs in it, the research surface.
2. What we found. WiMa·Check gives the indication away free, the comparison is the
   defensible half, the convincing is currently done live by a founder, Destatis.
3. So we built it. Three design calls, then the working six question Schnellcheck.
4. What sits behind it. Architecture diagram of the scoring service, benchmark
   database, percentile logic and PDF generation, plus where the results flow.
5. Where else this goes. Five AI and workflow builds, framed as capacity alongside
   their own engineers rather than as advice to an AI company.
6. Who you would be working with. Raka's record, and the check above as the sample.
7. Next step. Are these the right six questions, plus the Calendly.
Anhang. The seven site findings, free.

## Honesty calls made in v3, do not quietly reverse them
- **No client list.** The only delivered work in this repo is unrequested prospect
  concepts (Tomatoworld, Greentic). Calling those clients to another prospect would be
  fabrication. Section 6 carries Raka's verified employment record plus the live tool
  as the sample. If real delivered client work exists, it belongs here and does not yet.
- **David Marian is not named** in section 5, although naming him would have been
  sharper. Their own two pages give him conflicting titles (Head of Finance on one,
  Head of Product & Engineering on the other), so we cannot say which is current.
- **No claim that we made a dating error on the rebrand.** Our 13 Sep message said
  CLUUE and the logo went up in September, but we cannot establish which came first,
  so the deck says only that our first message still called them CLUUE.
- **Section 5 opens by conceding they have engineers.** Walking into an AI company
  with AI advice reads badly. Framed as capacity it reads as partnership. Keep it.

## Must be fixed before this is used for anything beyond showing Karim
1. **The comparison curve in the WKI Schnellcheck is a placeholder shape, not data.**
   It is labelled as such inside the tool and again in section 7, and it must never
   ship to a real visitor as if it were a real distribution. Until WisTree has a real
   distribution from their pilots, the honest version shows the score alone.
2. **The scoring weights are ours.** Six questions, four options, 0 to 3 each, summed
   and scaled to 0 to 100. Karim owns the framework and the deck asks him to correct
   them. Nothing about the weighting is presented as validated.
3. **noindex is set** (`<meta name="robots" content="noindex,nofollow">`). That stays
   while this is a private deck.

## Still outstanding
Karim was asked "anything you'd want it to steer clear of?" and has not answered. This
deck has not been sent and must not be sent without Raka's explicit go.

## Verified at build time, 2026-09-15
Four homepage links to /die-cluue-methodik/ (404), /die-wistree-methodik/ (200),
the WKI typo appearing exactly once, zero forms and zero email inputs, the Calendly
live at 200, both partner logos present, job titles conflicting across two pages,
three freemail addresses on Kontakt, and zero citation markers on the homepage.
Destatis figure taken from the primary press release, not a secondary summary.

## QA record, v4
Cold load, nothing forced: 0 pageerrors, 0 console errors, 48 of 48 reveal elements
fired naturally, 8 sections. Quiz exercised end to end, max path returns 100 / Kritisch with
the benchmark marker drawn. Single inline script block parses on the live file. No
horizontal overflow at 420px, tables scroll inside their own containers. Every section
screenshotted at 1400px and the hero at 420px.
Visible copy: 0 em dashes, 0 en dashes, 0 colons, 18 contractions, 1,444 words, no
banned terms from the NO-AI-SLOP list.
Live file diff against the deployed file is 720 bytes of Netlify HUD markup only.

## Register rule for this deck, and for every deck after it (Raka, 2026-09-15)

**Never narrate the artefact inside the artefact.** The reader is an executive.
He does not need to be told what language something is in, that a list is below,
that a section is coming, or how we arrived at a decision. State the substance
and stop. Raka's words, "would you present that to someone on a deck? No."

The specific failures in the first cut of v4, all fixed, all worth recognising
again:

| Wrote | Should have written |
|---|---|
| "The questions themselves are in German, because that is who answers them. Everything they ask about is below in English." | "Built from your own six methodology steps, in the language of the person answering." |
| "What the six questions ask" over a list of restated questions | "What it measures", over six named dimensions (single points of failure, documentation drift, undocumented exceptions, retirement exposure, handover in practice, access at the decision) |
| "What the score says back" | "Where a score lands" |
| "Three calls we made" | "Three constraints" |
| "Not advice on what to build. Just the four things we would pick up first if we were working alongside you." | Deleted. The heading already carried it. |
| "A sketch of the shape, not an implementation plan. Stack and hosting follow whatever you already run." | "Stack and hosting follow whatever you already run." |
| "And who actually wrote this" | "Raka Mulya" |
| "If talking is easier than marking up a document, a call works just as well." | "Or we talk it through." |
| "plus a working version you can try on this page" | "and the first half already works" |
| "You also said the detailed WKI analysis is step two. So this follows your order." | "The detailed WKI analysis is step two. This is step one." |

**Raka had to give this note twice, so one pass was not enough.** The second
pass caught what the first left standing:

| Wrote | Should have written |
|---|---|
| "Karim, you said you're building a scale that gives a first indication of knowledge fragility and compares a company against others its size." | "Karim, the scale you described has two halves." |
| "Two jobs, and they're not the same job." | "Two jobs in one sentence. The second is the one worth owning." |
| "The part that tells him whether that number is normal or not." | "Whether that number is normal." |
| "Built from your own six methodology steps, in the language of the person answering." | "Built from your own six methodology steps." |
| "The check is one file with no server." | Deleted. Implementation trivia. |
| "which is usually what actually blocks a pilot" | "which is what usually blocks a pilot" |
| "Getting 23 places to count the same thing the same way is the same problem as a benchmark group." | "Getting 23 markets to count one thing the same way is exactly the benchmark problem." |
| "so selling something a buyer hasn't decided he needs yet is first hand rather than theoretical" | "Selling something a buyer hasn't decided he needs yet is not theory here." |

The pattern behind all of them. Explaining the furniture, restating the brief
back, apologising in advance, narrating our own process, and defining a term
straight after using it. A heading that labels a list is weaker than a heading
that asserts something. A sentence that tells the reader what is about to happen
should be deleted, because the next sentence is about to happen anyway. And a
clause that begins "so" or "which is" at the end of a sentence is usually the
writer explaining what he just said, which is the tell to grep for.

**The self check before any deck ships.** Read every heading alone. If a heading
names a thing rather than claims a thing, rewrite it. Then read every sentence
and delete any clause that would still be obvious with it gone.

## Imagery, v5

**Photographs, both Unsplash, both licence free and neither presented as WisTree's.**
`img/hero.jpg`, engineers conferring over a laptop on an automotive development
floor, sits behind the hero under a dark gradient with the tree canvas dropped to
0.22 opacity so it reads as a watermark rather than scribble over the people.
`img/machinist.jpg`, an experienced machinist at a lathe, runs full bleed between
sections 1 and 2, captioned "The person the whole process quietly depends on.
Photograph, Unsplash." **The caption deliberately does not claim this is a WisTree
customer, site or employee**, per the portrait guardrail in CLAUDE.md.

**Three real product screenshots**, extracted from the official Astra deck PDF
(page 5) with PyMuPDF and re-encoded. `img/w-unilever.jpg`, `img/w-gpay.jpg`,
`img/w-mwx.jpg`. These are the genuine article and sit under the "also by our
development partner" heading, which stays.

**Four UI mockups**, inline SVG, no external assets. A capture review queue turning
a transcript into draft elements, an assistant answer carrying its source chips, a
process knowledge map with criticality per step, and an early warning card firing on
a step whose knowledge rests on one person near retirement. All in English, unlike
the questionnaire, because they are concept sketches rather than shipping UI.

Image QA, run in Chromium against the built page. Zero responses at 400 or above,
all five files decoded with non zero natural dimensions, no horizontal overflow at
420px, and every image carries real alt text.

## Astra facts used in section 6, and their source
All from the official deck Raka supplied 2026-09-15 and now transcribed into
CLAUDE.md. Boutique digital and innovation agency in the Netherlands. Grow,
Optimise, Innovate. Delivery partner Amwisesa in Indonesia, 10+ years, web and
mobile, warehouse/franchise/retail/F&B systems, clinic/spa/fleet/leisure
platforms. The deck's own line "Dutch project management and strategy, with
proven international development capacity". Three named deliveries, Unilever
1001 Ramadhan Inspiration across 48 brands, the GPay app, MWX AI Market. The
domain astraagency.nl.

**The disclosure is mandatory.** The deck heads that page "Selected Work (also
by our delivery partner)", so section 6 uses "Selected work, also by our
development partner". Do not reword that into "our clients". These are Amwisesa
deliveries as much as Astra ones.

**Joshua van Zeelt is deliberately absent.** He is the named contact on the
official deck, but this artefact goes out inside Raka's own LinkedIn thread, so
putting another person's phone and email in it would confuse the thread. The
domain is named, the individual is not.
