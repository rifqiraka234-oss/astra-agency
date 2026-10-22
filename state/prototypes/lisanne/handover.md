# De Jong - Vanhommerig advocatuur, handover. 22 Oct 2026, v1

## What it is, in plain words

Lisanne de Jong - Vanhommerig runs a one lawyer employment practice in Hoensbroek. Our 22 Oct opener said solo lawyers
bill about two hours of an eight hour day and offered "an AI workflow that handles the admin around each case, from new
enquiries to client updates and invoices, set up privately". She answered "Yes, that's interesting, thanks!" at 10.46 UTC.
Raka asked for research first (state/research_2026-10-22-lisanne-ai-workflow.md), then said build it, "make it easy to
understand and clear ... how the app looks like ... REAL and she can use it ... the architechture ... proof of outcome
... kpis ... a KILLER SIMPLE COMPLETE AND WINNING PITCH". Nothing sent.

Two things are built, the Hertling v3 pattern.
1. **The app, in Dutch, working.** A start screen with two doors. The re-integration wegwijzer for employees (first sick
   day, what's going on, their week, UWV's step plan with dates, warnings with sources, one button to send it to her).
   The intakebureau for Lisanne (four made up enquiries across her three lanes, a paste box that reads any enquiry,
   cards with quoted dates, fatal deadlines moved past weekends and holidays, a conflict check against her own list, a
   document list, a draft reply, a draft engagement letter with her terms, approve and decline, a deadlines page, a
   results page with the KPIs, settings). Everything runs in the browser, nothing is sent, the ribbon says so.
2. **The pitch, in English, v2 (22 Oct 15.20 UTC).** Raka, "make the whole pitch flow better, easier to understand and
   simpler, not info overload ... the reader can follow the journey one by one easily". v1 had eleven dense chapters.
   v2 is six numbered chapters, each answering one question in order, with a tracker across the top that fills as she
   reads, and a "Next" link closing every chapter.
   01 The problem, two hours of eight (Clio). 02 The desk, one made up case (Laura Smeets) followed through four steps,
   one picture each, "you only take the last". 03 For employees, the check from her about page. Then try it. 04 Privacy,
   the diagram and four plain points, with the Bedrock reasoning and the seven NOvA rows behind "show more". 05 What you
   get, the calculator and a week 1, week 4, then row. 06 How we start, the four week plan, then the next step and who
   builds it. Cut from v1, the deadline grid with her €2,000 own risk (one thread, time on admin) and the five KPI grid
   (three numbers now, inside the proof row).

## The one idea

Her headline ends in a line, "dan gericht verder ___", and her logo carries the same line. Her mark's orange hatch
strokes settle into that line in both heroes, every section label ends in it, the timeline on each card is drawn as it,
and the pitch's progress bar is it. The app is named after her own words, "Gericht verder".

## Links

- App, https://astra-dejongvanhommerig-prototype.netlify.app/ , Netlify project astra-dejongvanhommerig-prototype, id
  5916cc2a-47db-4eb3-8386-2b9039998260, deploy 6ada13f29c8ebc36d56f3337 (first deploy 6ada13017ff5b9430af58282).
- Pitch, https://astra-dejongvanhommerig-plan.netlify.app/ , Netlify project astra-dejongvanhommerig-plan, id
  6ab0927b-ba88-4316-98a6-ed7981bcda9d, v2 deploy 6ada2ae4667067634218bd24 (v1 6ada13f9cdf2135f96b7b56b, first deploy
  6ada131bfeb6f0d181d50619).
- Both, team SSO switched off, no password, X-Robots-Tag noindex. Deployed from clean copies in /tmp, never the repo.
- Source, site-app (index.html, app.css, app.js) and site-plan (index.html, img), no build step. Research in research/
  (teardown, brand, legal/LEGAL.md). QA scripts in qa/.
- Delivery draft, state/drafted_2026-10-22-lisanne-delivery.md. NOT SENT.

## QA that ran, 22 Oct

- Engine on all four examples plus the paste example and extra date formats (qa/engine.js), right kinds, right terms.
- Every screen at 1440 and 390 walked and screenshotted, zero page errors (qa/shots.js, qa/tall.js).
- axe on 8 pages at 2 widths, 16 runs, all clean after fixes (qa/axe.js).
- Overflow and spill at 9 widths from 320 to 1920 across 11 screens, 99 loads, 0 problems, planted control caught.
- Copy audit of all visible text on both sites and every app state, planted control caught, only her name and Dutch
  hyphenated words left (qa/copy.js).
- Keyboard, the employee check, the paste window with Escape, the calculator.
- Live, 32 of 32 files byte matched, titles right, noindex on, cold loads at 1440 and 390 with all 25 reveals, no broken
  images, approve and the employee check run on the live app (qa/live.js).

## QA on pitch v2, 22 Oct 15.00 to 15.25 UTC

- Cold loads at 1440 and 390, 21 of 21 reveals, no broken images, no errors (qa/plan.js).
- The tracker at 7 widths from 320 to 1440 (qa/tracker.js), 91 checks, 0 problems. Hidden on the hero, the right chapter
  marked in all 8 sections, no clipped label, chapter links land under the bar, both "show more" panels open, no
  overflow. Control run with a wrong expected chapter and a forced long label, both caught.
- axe at 1440 and 390, closed and with the panels open and the tracker showing, all clean, the app pages clean too.
- Overflow at 9 widths across 11 screens, 99 loads, 0 problems.
- Copy audit with the panels opened (verified they're in the audited text), control caught, only her name flagged.
  NO-AI-SLOP section 8 grep clean, its hits are the CSS transform property and "stays as it is".
- The privacy claims refetched at source at 15.10 UTC. AWS data retention and data protection, the three NOvA lines,
  Anthropic's "Only "us" and "global" are available", the eu regions on the AWS model regions page.
- Live, 24 of 24 files byte matched, live HTML identical to the repo file, noindex on, title right, the four v1
  screenshots now 404, cold loads at 1440 and 390 clean, the app still approves and runs the employee check (qa/live.js).
- The delivery draft still describes the plan page correctly, so it's unchanged.

## Facts and where they came from (all read 22 Oct)

Clio figures via LawNext and Canadian Lawyer. Art. 7:670b, 7:686a lid 4 BW, art. 358 lid 2 Rv, Algemene termijnenwet art.
1, 3, 4, all at wetten.overheid.nl. UWV's stappenplan and deskundigenoordeel pages and Rijksoverheid, rendered. NOvA
Aanbevelingen AI in de advocatuur. Anthropic data residency (only us and global), AWS Bedrock model regions (eu. profile),
data retention (zero retention mode) and data protection (providers have no access). Her terms (hourly, 50% urgency,
14 days, €500,000 cover, €2,000 own risk), privacy statement, about page, contact page. Details in research/legal/LEGAL.md
and state/research_2026-10-22-lisanne-ai-workflow.md.

## Must change or be decided before anything ships to her as a product

1. **Her hourly rate** is a placeholder in the engagement letter, highlighted, set in Instellingen.
2. **Every line of legal content** (the wegwijzer texts, warnings, document lists, draft wording) is hers to approve.
   The pitch says so.
3. **The Claude model** must be one whose Bedrock `allowed_modes` includes `none`, checked at setup. Some models
   (Fable 5 and 5.1) require `aws_review` and can't run with zero retention.
4. **AI Act article 50.** The wegwijzer uses fixed rules, no AI, in this sketch. If the live version adds an AI written
   summary for the employee, the first screen says it's automated. Only third party summaries read so far.
5. **The Copilot objection** is answered in the research file as an argument, not tested. Don't put it in writing to
   her without checking.
6. **The Clio figures** are 2023 and North American. Said as Clio's research on the page.
7. **Price.** The pitch says "one fixed price, agreed before anything starts" and names no number. Raka's call. Our
   research estimate for the intake desk was €3,000 to €5,000, the employee check €3,000 to €6,000, both guesses.
8. **Colons in legal citations** (7:686a, 7:670b) are kept, that's how Dutch law is cited. Dutch words with hyphens
   (re-integratie, e-mail, 42e-weeksmelding) are correct spelling and kept in the Dutch app.
9. **The calculator's starting numbers** (4 enquiries a week, 40 and 10 minutes) are labelled as our guesses.
10. **The made up companies** were checked against KVK, Vellmer Logistiek, Brunsveld Zorggroep, Terwinsel Bouw,
    Rechtshulp Mergelland, Heuvelland Metaal and Geleenbeek Techniek returned no results (control Sagapo found).
    Kroonhof Groothandel matched a real address and was dropped.

## Hiccups and the rule each leaves

| Hiccup | Rule |
|---|---|
| Screenshots in the pitch were squashed | Any img with width and height attributes needs height:auto in CSS |
| The hero lede was dark on teal | A section's background class decides text colour, the hero isn't .teal, give it its own rule |
| The kicker was 1.7 to 1 on teal, and axe passed it | axe can't measure text on a gradient, compute contrast by hand for every text colour on a gradient |
| "Beste mevrouw De Jong" became a client name | Strip the recipient's own name from every name the reader extracts |
| An exit deal produced dismissal deadlines | No opzegging means no 7:686a lid 4 sub a and b terms, the law decides which terms exist, not the date |
| A conflict hit still got a substantive reply | When the conflict check hits, the draft only acknowledges |
| Two deadlines landed on a Saturday | Read the Algemene termijnenwet and move fatal terms, say so on the card |
| Enter in the date field did nothing | Enter submits a single question step |
| The overflow and copy checks needed proof | Plant a control in every negative check, both caught theirs |
| v1 of the pitch put eleven chapters in front of her | One question per chapter, numbered, a tracker, detail behind "show more", follow one case instead of describing features |
| Wide card crops were unreadable on a phone | Art direct with picture and a phone sized crop taken from the app at 390 |
| The phone crop caught the app's fixed bottom menu | Hide fixed and sticky elements before cropping |
| Tracker labels hidden with display none left the links nameless | Hide visually, keep the name for screen readers |
| A closed details panel isn't in innerText | Open every panel before the copy audit, and check the text is really there |
| Calculator ids c1 to c4 clashed with the new chapter ids | Check every id after renaming sections |
