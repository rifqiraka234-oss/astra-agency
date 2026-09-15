# WisTree deck — handover and open items
Live: https://astra-wistree-deck.netlify.app
Restructured again 2026-09-15 (v3, on Raka's call). sha256 of deployed file
03f3969b44416b570676ccb420b2adc5fa83d70778eba4128f8eb6336aef8d08 (44,606 bytes).
v2 was 6cf41043f20768cede67eea974d53ce2ac98d8ec9c75ef5aae820d4356e99bd9 (34,455 bytes).
v1 was 8d16ca3d6ad53cbe8d313b7869701617b2278aab9622ce28f0dcde4515158a9c (37,749 bytes).

## Version history and why
**v1** was built before checking it against the thread. It opened with three sections
of site audit Karim never asked for and only reached his actual question in section 7.

**v2** cut the audit to an appendix and answered only his question, the scale. Correct
but narrow. It informed and did not sell.

**v3, current, Raka's call.** Full deck arc. Analysed, problem, prototype,
infrastructure, what else we can build, who we are, book a call. The site findings stay
in the appendix. The new material is the architecture of the benchmark service and a
section on the AI work we would pick up alongside their own engineers.

## Structure, v3
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

## QA record, v3
Cold load, nothing forced: 0 pageerrors, 0 console errors, 61 of 61 reveal elements
fired naturally, 9 sections. Quiz exercised end to end, max path returns 100 / Kritisch with
the benchmark marker drawn. Single inline script block parses on the live file. No
horizontal overflow at 420px, tables scroll inside their own containers. Every section
screenshotted at 1400px and the hero at 420px.
Visible copy: 0 em dashes, 0 en dashes, 0 colons, 36 contractions, 2,472 words, no
banned terms from the NO-AI-SLOP list.
Live file diff against the deployed file is 720 bytes of Netlify HUD markup only.
