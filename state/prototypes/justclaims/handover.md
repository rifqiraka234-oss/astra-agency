# justclaims.eu, handover. 2026-10-12

One artefact, built for Ulrich Steppler after his yes to the offer in the opener, "Shall I send you over what the justclaims site ready for the new rules looks like?". Nothing has been sent to him. The acknowledgement and the delivery message are drafts for Raka.

| | |
|---|---|
| Live URL | https://astra-justclaims-prototype.netlify.app |
| Netlify site id | 779d17d7-a42c-4682-b485-0b455d35c5b5 |
| Deploy id | 6accc401688660894f4f6e20 |
| Pages | 13, all in `site/`, assembled by `build/build.py` from `build/pages/` and committed as finished HTML |

The project was created with team SSO on. It was switched off and forms were switched on, as on the earlier prototypes.

## v3, the redesign (12 October 2026, afternoon). Not sent, not yet chosen

Raka judged v1 dated and v2 "feels like Claude built it". v3 is a full rebuild of all 13 pages in a new design language, flight documents. The analysis of why v2 read as Claude built, and what v3 does about each tell, is in `research/teardown/ai-tells.md`.

| | |
|---|---|
| Live URL | https://astra-justclaims-v3.netlify.app |
| Netlify site id | 2c5b089a-eeb3-4140-bc77-2464a3a10671 |
| Deploy id | 6accd9ac64d840c90953ca25 |
| Source | `build/v3/build_v3.py` and `build/v3/pages/`, output in `site-v3/`. It execs the top half of `build/build.py`, so the clocks, the 31 verbatim quotes, the 19 Annex items, the readiness questions and the chart numbers are the same verified data v1 uses |
| v2, kept for reference | https://astra-justclaims-v2.netlify.app, source in `build/v2/` and `site-v2/`, home page only |

**What it is.** A split flap departures board of the seven deadlines that touch a claim, bilingual German and English as on Frankfurt's boards. All 15 time limits as flight progress strips in a rack, with one log scale so the rack reads as a ruler. One claim drawn as an approach chart with the complaint as a holding pattern. The 96 hours as a punched card. Newspaper charts. The claim screen as an exhibit. The claim clock as a boarding pass. Stock photographs and the clock film printed as real halftone screens with a second yellow ink, by a WebGL shader (`site-v3/assets/ht.js`), the film live and the stills prerendered by the same shader (`build/v3/tools/ht_all.sh`, deterministic, all 12 plates regenerate byte for byte). Barlow, Newsreader for the law only, B612 Mono for codes, all SIL OFL and self hosted.

**Content.** Every word of copy and every legal quote is carried over from v1 as verified, except headings and a few leads written for the new layout and the colophon, each checked against its source. Corrections made while rebuilding. The colophon first said Barlow was "drawn from road and airport signs", and its own README says California highway signs and number plates, so it was fixed. A line saying every article number links to the Official Journal was untrue and was cut. The resources lead said each explainer "ends on what the text leaves open", which the third one doesn't, so it was cut. The approach chart's arrival label read "3 h late", which is not over the threshold, and now reads "over 3 h late". The board shows Art. 15a(2) with a lowercase a.

**How v3 was verified.**
- Copy audit, 13 pages, 0 issues. The audit now also exempts people's own words quoted verbatim (`q.say`, Ulrich's "win-win" in the 2023 release) and numeric identifiers such as Destatis table 24231-03.
- axe-core, WCAG 2.1 A and AA plus best practice, 13 pages at 1440 and 420, 26 runs, 0 violations after fixes (the draft line outside a landmark, the day counter link losing its name at 420, a link colour on a yellow button, two low contrast labels).
- Page QA, 13 pages at 1440 and 420, local and again live. 0 page errors, 0 responses at 400 or above, every image decoded, no sideways overflow, and every split flap checked to land on its own text after its spin (24 on the home page, 28 on the new rules page).
- No JS and reduced motion, 5 pages each way. No hidden text, no page errors. The board, the route and the strips all read with no script. The claim clock and the readiness map say plainly that they need JavaScript.
- Interactive parts, local and live. A board row opens its strip, the rack filter marks 7 and dims 8, the boarding pass at 2 h shows no compensation and at 3 h 50 min on the over 3,500 km band shows EUR 600 with the Art. 7(2) note, the claim clock's six dates, the readiness check to the demo form with the answers carried, the form refusing an empty send (4 fields flagged), the product tabs and pins, an Annex item opening to its conditions and five steps, and the timeline's row for today.
- Live. All 46 assets byte match the build. Netlify's pretty URL processing rewrote the internal links in the 13 HTML files (`new-rules.html` to `/new-rules`) and reformatted attributes, so I compared the visible text and the embedded rules data of every page with the build, and all 13 are identical. Every rewritten internal link returns 200. The live halftone film plays from the WebM. The form is detected with all nine fields. One labelled test submission reached Netlify at 13:05:40 UTC and was filed as spam, most likely for its example.com address, so it shows in no inbox. It can be deleted from the project's spam list.
- Portraits. The two newspaper portraits are printed from the same files `verify_portraits_live.py` passed on v1 (sha256 identical to the client's own images), and sit above the same names.

**Before v3 could go to Ulrich.** Raka picks v3, v1, or neither. If v3, the delivery draft's link changes, or v3 is deployed onto the v1 URL so the drafted message stands as written. The "must change before live" list below applies to v3 as well. v3 carries 17 To confirm tags against v1's 20, on the same claims. The home page shows one claim screen instead of three, so the threshold tag sits on the platform page only, and the resources page tags the explainers' date once instead of three times.

## What was promised, and what was built

| The opener said | The site does |
|---|---|
| The site's latest news is August 2023 and no page mentions the new EC261 rules | The whole site is about Regulation (EU) 2026/2202, with its dates, 15 time limits, 19 Annex items and the tools, every legal quote verbatim from the Official Journal |
| The new rules set 96 hour notices and 30 day replies | The home page, a pinned five clock story, two explainer pages and a calculator are built on those two clocks |
| Legal teams will check the site | Every duty carries its article, every quote carries the Official Journal link, and the places where the text is silent say so (the start of the 96 hours, the counting of the 30 days) |
| "the justclaims site ready for the new rules" | The existing product, brand, logo and people, with the new rules set beside what the platform already does. Each product capability that is not already in justclaims's own copy is tagged **To confirm** |

## How it was verified

Evidence counts, not assurances.

- **Cold load at 1440 and 420, all 13 pages, 26 loads.** Zero page errors, zero console errors, zero responses at 400 or above, every image decoded, no horizontal overflow, every reveal fired without being forced. `node qa_all.js`, the harness is in the session scratch and its logic is the same as `tools/deck-qa/qa.js` across pages.
- **Interactive parts exercised end to end.** The deadline ruler (every marker, both filters, deep links), the pinned claim story (five stages at five scroll positions), the claim clock (four cases, including a 31 May 2028 flight whose nine months clamp to 28 February 2029, a delay under three hours and a 700 minute delay), the readiness check (all four answers on all ten questions), the Annex explorer (all 19 items), the product tabs and pins, the 96 cell time lapse.
- **No JS and reduced motion.** Six pages loaded both ways. No hidden text, the pinned story falls back to a plain sequence of dials, no page errors.
- **Accessibility.** axe-core with the WCAG 2.1 A and AA and best practice rule sets on all 13 pages at both widths. Zero violations after the fixes (the first run found a name mismatch on the ruler markers, a footer link with no underline, a table scroller with nothing focusable, a missing landmark and two heading jumps, all fixed).
- **Legal quotes.** 83 quotes on the built pages. 80 were matched against the regulation text again by a second script that shares no code with the build's own check, normalising quotes and spaces. The other three are the Discover and Skift testimonials, matched against the justclaims.eu pages they come from. The build itself also refuses to run if any of the 31 data quotes or any of the 19 Annex items is not verbatim.
- **Independent legal read.** A separate reviewer with no sight of my notes was given the regulation and the page text and asked to classify every factual claim about the rules. First pass, 169 claims, 118 supported, 39 supported but loose, 6 unsupported, 6 wrong. I checked all twelve unsupported and wrong items against the regulation text myself, and all twelve held. They were fixed, along with the loose ones that could mislead a lawyer. The reviewer then re-read the revised site, 183 claims, 163 supported, 19 loose, 0 unsupported, 1 wrong, which was "every deadline" in the new-rules page title and "All deadlines on one ruler" in the footer. I fixed that and most of the remaining loose items afterwards, and that last round was not read a third time. Details in `research.md` section 10. A lawyer at CHS should still read the three explainers.
- **Links.** 620 references checked, every file and anchor resolves. The 20 external links to justclaims.eu pages and LinkedIn all return 200. The EUR-Lex link is the ELI path from the Publications Office metadata. EUR-Lex itself answers scripted requests with a challenge page, so it was not fetched.
- **Copy.** `build/tools/copy_audit.py` over the 13 pages and over the text the tools write at run time (52 captured states). Zero banned words or phrases from NO-AI-SLOP, zero colons, em dashes, en dashes or exclamation marks in prose, no uncontracted verbs outside verbatim quotes. The only hyphen left is the identifier in a source line, table 24231-03. "Journey" stays because the regulation defines it (Art. 2(v)).
- **Portraits.** `build/tools/verify_portraits_live.py` PASS for both. The shipped files are byte identical to the client's own images, and each sits above the right name inside its own column on the client's About page.
- **Live.** Deploy 6accc401688660894f4f6e20. All 13 pages return 200 and a random path returns the designed 404. All 47 assets byte match the build. The visible text and the inline scripts of all 13 pages are identical to the build. 26 live loads in Chromium at 1440 and 420, zero page errors, zero responses at 400 or above, every image decoded, no overflow, every reveal fired. Live, I also exercised the days counter, the pinned story, the ruler card, the film (both the window chapter and the claim clock page play from the WebM), the calculator, the readiness check and the Annex panel. The form is detected by Netlify with its nine fields and a honeypot. A test post by curl reached it, all nine fields mapped, and I deleted it. The browser submissions from the headless test did not show up in the submissions list, most likely because Netlify filtered them as spam, so a submission from a real browser is not yet proven.

## Must change before this goes anywhere near live

1. **Take the draft bar and `noindex` off.** The black bar on every page says this is a draft for CHS. Every page has `<meta name="robots" content="noindex">`.
2. **The form posts to our Netlify, not to CHS.** The walkthrough form validates, posts, and shows its confirmation, but the submission lands in Astra's Netlify forms, and the confirmation says "We'll come back to you", which is a promise on CHS's behalf. Point it at CHS before anyone outside this thread uses it. The readiness result travels in the message field through `?ready=`.
3. **og:image** points at the Netlify domain. Change it on launch.
4. **Imprint and privacy links** point to the current justclaims.eu pages. The new site would need its own.
5. **The German version.** justclaims.eu has German posts. This build is English only.
6. **The three explainers are drafts.** They are written from the regulation text by us and tagged Draft, 12 October 2026. CHS's lawyers, who are partners at ARNECKE SIBETH DABELSTEIN, will want to rewrite them in their own words. They are better placed to than we are.

## To confirm, with CHS (20 tags on the site, grouped here)

These are statements about the product that justclaims's own copy does not make. Each is tagged on the page.

- A scheduled 96 hour notice with date and time (platform, home).
- The deadline field can hold the 30 calendar day limit (home product section).
- Each check result keeps a date and time (home product section).
- The scope check follows the new definition of delay at arrival and time of arrival from 23 October 2027 (home product section).
- The delay threshold is a rule in the platform, not a fixed number (home product section).
- A justification can be built from the Annex.
- A mandate check for third party claims.
- Seven working days and one month tracked for complaints.
- Dates and times on every message.
- The demo can cover the new rules in the way the page describes.
- Testimonial use (the Eurowings Discover quotes) and a link for each press mention.
- The Discover and TUI fly logos and the press logos (Skift, WirtschaftsWoche, CAPA) are shown because the current justclaims.eu shows them. CHS should confirm it holds the right to show them.

## Deliberate choices a reviewer should know about

- **The 96 hour start.** The text says "the termination of the journey" and does not say which moment. The claim clock takes the scheduled arrival plus the delay, says so, and cites Art. 2(v) and Art. 2(x).
- **Counting.** The 30 days count the day a request arrives as day 0. The regulation does not say. The page says this is the tool's convention and that counsel should check it.
- **Nine months** count in calendar months from the date of departure, clamped to the last day of a shorter month.
- **Dates.** Entry into force 22 October 2026 and application 23 October 2027 come from Art. 3 of the Official Journal text and the Publications Office metadata. One Italian trade article gives 23 October 2027 for entry into force, which is wrong, and was not used.
- **Two public statistics, nothing else.** The Steer claim rate for 2011 to 2018 and the Destatis flight cases concluded by German district courts for 2021 to 2025. Each is drawn from the primary file and each says what it is not. A Europe wide count does not exist and the EUR 8 billion airline lobby figure has no method, so neither is shown.
- **Imagery.** The wing still behind the "claim notice" chapter is the client's own hero photograph, recoloured, and on screens at least 900px wide a stock film plays over it. Every other photograph and film is stock (Pexels and Mixkit, free licences, provenance in `assets/PROVENANCE.md`), recoloured to the site's palette, captioned as stock on the page, and none is described as the client's premises, staff or customers. One photograph is a crop because the full frame shows airline names, and one apron photograph is cropped because its stand sign reads mirrored. One of the four films, the wing at dusk with a faint mark on the winglet, was not used.
- **Film loads only on screens at least 900px wide,** with no reduced motion and no data saver. Everyone else gets the still.
- **The logo is the client's own PNG, traced to vector.** The trace had picked up the tops of four tagline letters under the wordmark. They are cut.
- **The cockpit face.** B612 and B612 Mono, the typeface Airbus and ENAC designed for cockpit displays, is open source (SIL OFL) and self hosted. It is there because the client's own line is "It's about time" and the product writes lead time as `00d 20h 53min`.
- **Amber means a deadline and nothing else.**
- **The 96 cell time lapse is decorative,** it runs a made up example, and the caption says it is played at speed.
- **Readiness check.** Nothing leaves the page. The answers go to the demo form only if the visitor clicks through.

## Incumbent flags

- The current justclaims.eu is a Wix site. Its imprint credits "Concept, Design & Realisation" to **simple & pure, a digital product agency** (simple.mt), so an agency relationship may exist. The opener is an offer to show what the site could look like, not a pitch to replace anyone, and the delivery message follows that.
- The current justclaims.eu disagrees with itself on the commercial register number. The imprint says HRB 1089923 and the privacy policy says HRB 108923, both Local Court Frankfurt am Main. The new site prints neither. Checking the register would tell which is right, and it may be worth telling him, at your discretion.
- justclaims.eu today shows a wing photograph behind grey type, 210 words and a press logo wall. The teardown found that the 11 airline claims and legal tech sites in its peer group share one look, and that none of them draws time as an instrument.

## Research on file

`research.md` here is the working file. The regulation text and metadata are in `research/regulation/`, the crawl of the current site in `research/site-now/`, the 82 site teardown in `research/teardown/` (REPORT.md, the metrics table, 283 screenshots), the verified data sources in `research/data/`, and the stock imagery in `assets/stock/` with `assets/PROVENANCE.md` and `REJECTED.md`.

## Build tools added in this folder

`build/tools/copy_audit.py` (visible text audit), `build/tools/media.py` (stock photographs to the site's duotone and the film copies), `build/tools/trace_logo.py` (logo to vector), `build/tools/verify_portraits_live.py`, `build/data/make_clocks.py`. Nothing in the repo's own `tools/` was changed.
