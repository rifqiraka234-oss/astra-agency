# Qualigraf UK site, handover (2026-09-28)

Live: https://astra-qualigraf-prototype.netlify.app (Netlify site `astra-qualigraf-prototype`,
id 1ce634b7-82ce-4ecb-993a-a4a26e6eb0d3, deploy 6abaab61565aa92c51580665 (v4), team SSO off, forms on).
Source: `state/prototypes/qualigraf/build4/` (pages, build.py, close.html), v3 source kept in `build/`. Output: `site/`.
Research, evidence pack and art direction: `research.md` in this folder.

## v4, "the public record" (after Raka's third note, 2026-09-28)

Raka on v3, "we've just taken what they've done and put an icing cake on it. You didn't redesign
it." He was right, v3 was v2's dark SaaS layout with effects added. v4 replaces the design language,
the story and the media on all ten pages. Source is `build4/` (pages, build.py, close.html), the v3
source in `build/` is untouched, and a copy of the v3 output sits outside the repo.

- **Teardown first.** 65 sites queued (tech, sport, consulting, cars and luxury, media, WebGL
  studios, and Granicus, Diligent and Civica). 57 rendered and fingerprinted at runtime, 8 walled
  after every method (Red Bull, Tesla, adidas, Active Theory, WHOOP, LVMH, Civica, Lusion). Method,
  counts and what each site teaches are in `research.md`, "v4".
- **Design language.** Warm paper and black ink, Source Serif 4, Source Sans 3 and Source Code Pro,
  every section numbered like an agenda item with a mono reference note, Qualigraf's coral, teal,
  mustard and plum as full bleed colour fields. A navy UK logo made from their light logo.
- **Story spine, on real data.** Surrey's two new councils publish their shadow meetings across
  twelve council websites today (53 meetings, 15 committees, read from the Surrey LGR Hub). A pinned
  map of England (ONS boundaries, 296 districts) zooms to Surrey, pins the twelve systems and folds
  them into two. Then the life of one decision, film led, to the record it leaves.
- **Media.** A three.js hero where 620 agenda pages fly in, stack, press into a pack and become a
  tablet showing their own meeting screen. A three.js dot globe of the four country teams. Eleven
  films (Mixkit Free Licence only, decorative, never captioned as Qualigraf or a council). A horizontal
  pinned strip of eight panels, a stamped casefile, a live vote scoreboard, an AI Minutes pipeline,
  an archive search, the paper calculator, the clear days quiz and calculator, a day one checklist
  and a vesting day countdown.

### v4 items Steven should confirm (in addition to the list below)

1. **The Surrey framing.** "Two councils, twelve websites" is the hub's own listing on 28 Sep 2026.
   Only two meeting pages could be opened directly from here (Epsom and Ewell, Spelthorne), the rest
   wall this network, so the site credits the hub. It's a sensitive live example for a sales site,
   and Steven may prefer it unnamed or softened.
2. **The films are stock and decorative.** Big Ben, a night city, a typewriter, a library and others.
   None claims to show a UK council.
3. **The product screens are still their Canadian demo council ("Clearwater Ridge")** inside the
   tablet and the strip. The footer's sample data line covers them.
4. **Sample UI on the homepage**, the scoreboard (31, 12, 3), the AI Minutes pipeline, the archive's
   1,584 sample documents and the casefile, all labelled sample on screen.

### QA done on v4

- 70 runs, 10 pages at 360, 420, 768, 1024, 1280, 1440 and 1920 wide, after the contrast fixes.
  All 70 had 0 page errors, 0 failed requests, 0 horizontal page overflow and 0 undecoded images.
  The 14 runs on index and new councils flagged only elements wider than the screen that sit
  inside clipping containers on purpose (the Surrey map SVG, the scrolling sources table), checked
  by walking each to its clipping parent.
- Live, deploy 6abaab61565aa92c51580665, all 116 assets byte matched, 9 pages 200 with their titles and a parsed DOM identical to the build once Netlify's pretty URLs and form attributes are normalised, every rewritten link 200, every cross page anchor present, unknown path 404 page, cold load in Chromium on 3 pages with 0 errors, 0 failed requests, 0 undecoded images.
- Interaction tests, films play and pause and stay paused, Surrey scene through all four stages
  (296 paths, 53 meetings, 12 rows), paper calculator on three input sets, strip translate, quiz,
  stamp, scoreboard, pipeline, archive search and an XSS probe, globe drag, menu and Escape, every
  form's empty, bad email, failure and success states, clear days calculator on four dates, checklist,
  countdown, the static Surrey map.
- No JS and reduced motion, content complete, the map and table pre-rendered at build.
- Copy, 0 dashes in prose, 0 colons, 0 banned words, 0 exclamation marks, contractions throughout.
  The one "not X but Y" is Rens's own quote, verbatim.
- Lighthouse, accessibility 100 on nine pages after contrast fixes (grey labels darkened, a text
  coral for coral on paper, ink labels on colour fields, plum text at full strength, a film caption
  that had gone white on paper). Index is 97, the remaining flags are the AI Minutes pipeline's
  steps that sit dimmed until they light up in turn. Best practices and SEO 100 everywhere.
  Performance, 79 on new councils and 44 on the homepage in this container, where WebGL runs on the
  CPU (swiftshader) under Lighthouse's throttling. On a machine with a GPU the hero is cheap, but
  it's the page's weakest number and worth knowing.

## What changed after Raka's note

Raka on v1 (cream, split sections, small framed screenshots): "the page looks so simple".
v2 is a full redesign, not a reskin. The v1 CSS, JS and pages are kept in `build/site-v1.css`,
`build/site-v1.js` and `build/v1pages/`.

- References studied first and screenshotted, apple.com/ipad-pro, vercel.com, linear.app/features,
  framer.com, notion.com/product. Shared moves, dark canvas, the product lit as the hero object,
  bento grids of live UI, sticky scroll storytelling, huge statement type, full bleed photography.
- Direction, "the chamber at night, lit by the agenda". Deep navy canvas with Qualigraf's own coral,
  teal, mustard and plum as light. Light cream chapter for the European proof, for rhythm.
- Hero, a tilted product window that flattens as you scroll, four floating live cards (agenda pack,
  sign off route, a vote tallying, publication), then the eight station track with a file moving.
- The committee cycle is now a sticky scroll story, the screen swaps through eight real screens as
  the text moves, with a progress rail.
- Bento of live UI, AI Minutes (waveform plus transcript typing), the Member app (phone with a note
  and vote buttons), search (typing then results), webcast (looping film with LIVE and a lower third),
  votes (bars filling), planner, publication.
- Full bleed parallax chamber photography, word by word statement reveal, count ups, marquee.

## v3, after Raka's second note (2026-09-28, 15.30 to 16.10 UTC)

Raka on v2: take the top 50 sites in tech, sport and consulting, then go beyond them. Tell a story,
with every kind of media it needs.

- **References.** 47 sites queued and screenshotted at 1440 (full page plus fold, plus counts of
  video, canvas, svg, sticky elements and words). 30 rendered. 17 were walled by bot checks and
  stayed walled on a retry with a less automated browser, Tesla, OpenAI, Samsung, Sony, adidas,
  Red Bull, F1, Under Armour, McKinsey, BCG, Bain, PwC, BMW, Mercedes, Rolex, LVMH and the NYT
  interactive. What was taken from the 30. Apple and Stripe light the product, and every Linear
  chapter carries live UI. Anthropic, Nike and Porsche use full bleed imagery with big type.
  Spotify Wrapped makes the visitor's own numbers the story. The Premier League and NBA run live
  tables, quizzes and polls. Stripe has a globe. The Pudding writes playful data essays.
- **The story.** The homepage follows one sample decision through time. A canvas hero, where 1,150
  papers drift, gather into Qualigraf's own curl mark (sampled from their logo path), then line up
  on the eight station track as you scroll. Then the product window, the track and the logos.
  Then "Your committee year, wrapped", a paper calculator on the visitor's own numbers, with a stack
  drawn against a person for scale and the East Sussex tender line "reduce printing and circulation
  costs". Then eight chapters with a chapter bar.
  1. Ninety days out, the planner and a 28 clear days dial.
  2. Six weeks out, their people film, the sign off route by email (tangled, animated) against the
     route in Qualigraf (a file travelling through four sign offs), and the worklist.
  3. Five clear days, the Joicey strip (days fall in, the late report drops onto clear day 5, the
     permission is stamped quashed), a three question clear days quiz, and the calculator.
  4. Meeting night, a chamber photo with a slow zoom and a live webcast panel (timecode, speakers
     changing, agenda, speaker queue, the vote counting up to carried), plus a Member's tablet note.
  5. The morning after, the AI Minutes pipeline, recording, transcript, minutes, published.
  6. Six years on, their track film and an archive wall of 1,872 sample documents over six years.
     Search lights the matches. Three sample searches have real results from their demo file names.
  7. The map is changing, the twelve Surrey councils by name turning into East and West Surrey, the
     vesting day countdown.
  8. Four countries, a dotted globe (Natural Earth land, world atlas 110m) with arcs from Dordrecht
     to France, Canada and the UK, the numbers, logos and certifications.
- **Inner pages.** New councils now carries the named Surrey animation in place of the block chart.
  Resources carries the quiz. The other seven pages stay at v2.
- **Kept honest.** The Elizabeth Tower comparison was dropped because parliament.uk, Britannica and
  Visit London all walled us and Wikipedia alone is one source. The stack uses a metre ruler and a
  person for scale instead. The quiz line that implied Qualigraf counts clear days was cut, since
  what's verified is deadline tracking, publishing rules and alerts. The webcast timecode uses dots,
  not colons.
- v2 sources kept, `build/index-v2.html`, `build/site-v2-live.css`, `build/site-v2-live.js`. v3 adds
  `site/assets/story.css`, `story.js` and `globe-dots.json`, loaded only on pages that list
  `"extra":["story"]` in their page header.

## Site Completeness Contract, final status

| Route | Status |
|---|---|
| Home | built |
| Platform, eight stations in depth, modules, connections | built |
| AI Minutes, how it works, outputs diagram, 5 hour trial form | built |
| New councils, Surrey 12 to 2, timeline, countdown, day one checklist | built |
| Who it's for, table plus Democratic Services, Members, IT, residents | built |
| Security and quality, standards table | built |
| About, story timeline, one platform diagram, people, ADSO | built |
| Resources, clear days calculator, statutory guide, webinar and news, updates form | built |
| Contact, walkthrough form, Stuart's direct lines and diary link | built |
| 404 | built |
| Pricing | deferred, no public prices exist, never invented |
| UK case studies | blocked, the two UK councils being implemented aren't public |
| Privacy, complaints, cookies | linked to Qualigraf's live pages |

## Scoring (G1) and gates

| Dimension | Weight | Score | Why |
|---|---|---|---|
| Brand specificity | 15 | 14 | Their logo, curl tiles, palette, illustrations, portraits, film and fonts, in UK council language |
| Narrative and pacing | 15 | 14 | Hook, the idea, the eight station story, meeting night, the law, roles, new councils, proof, people, close |
| Imagery and art direction | 15 | 14 | Real product UI throughout, their own film, CC0 UK chambers, live UI fragments, charts |
| Workflow completeness | 15 | 14 | Full loop forward plan to archive, exceptions (general exception, special urgency) in the guide |
| Real proof and human trust | 15 | 13 | Steven and Stuart with verified portraits and real quotes, certifications, European clients. No named UK council yet |
| Buyer fit and objections | 10 | 10 | Democratic Services, Members, IT, residents, FAQ |
| Conversion completeness | 5 | 5 | Three validated forms with success and error states, phone, email, diary link |
| Interaction and accessibility | 5 | 5 | Keyboard, aria, reduced motion, no-JS render. Lighthouse on v2 home, accessibility 96, performance 84, best practices 100, SEO 100. The only contrast flag is the statement's dimmed words before they light up on scroll, full contrast once revealed and under reduced motion |
| Technical reliability | 5 | 5 | 0 errors, 0 failed requests, 7 widths, live bytes matched |
| **Total** | 100 | **94** | No hard failure found |

## QA done on v3 (2026-09-28)

- All 10 pages at 1440, 1280, 1024, 768, 414, 390 and 360, 70 runs. 0 page errors, 0 console
  errors, 0 failed requests, 0 overflow, every reveal fired, every image decoded.
- Every v3 component exercised in Chromium. Hero canvas measured at three scroll points (field,
  curl, line). Paper calculator on four input sets including 1,1,1 and 0. Sign off route plays the
  email view then switches, and stays on email when the visitor picks it. Joicey stamp and chip
  land. Quiz right and wrong paths and the score. Webcast timecode, speaker change, vote to
  carried, film playing. Pipeline stages. Archive chips, free text, empty, and an HTML injection
  string (rendered as text, 0 images). Surrey stages. Globe drawn after its dots load. Chapter bar
  follows the chapter, hides when idle and at the end.
- Quiz answers checked twice, by hand and through the site's own calculator, 15 Oct 2026 gives
  Wednesday 7 October, 5 Jan 2027 gives Wednesday 23 December 2026, 1 Apr 2027 gives Monday 22
  March 2027.
- Reduced motion, the hero isn't pinned, every animated part shows its end state, nothing hidden.
  No JS, every section readable and the quiz shows its answers. The only empty element is the
  hero's closing line, which only exists with scripts on.
- Copy, 0 colons, 0 banned words, 0 "not X but Y", 0 exclamation marks, 126 contractions. Hyphens
  only in the product name "Long-term planner", Stoke-on-Trent and verbatim quotes.
- Lighthouse on the v3 home, accessibility 97, performance 89, best practices 100, SEO 100. The
  only contrast flag is still the statement's dimmed words before they light up.
- Live, deploy 6aba906c5bb37ec76206371d. 69 assets byte matched. The 10 pages parse to the same
  DOM as the build apart from Netlify's pretty URLs and its form processing, which strips
  data-netlify and the honeypot attribute. All 12 rewritten links return 200. Live cold loads of
  home, new councils and resources at 1440 and 390, 0 errors. One run logged people.webm as
  aborted, the browser cancelling the download when the film scrolled out of view. The file is 200
  and 136,554 bytes live, and two reruns were clean.

## QA done on v2 (2026-09-28)

- Cold load, all 10 pages at 1440, 1280, 1024, 768, 414, 390 and 360. 0 page errors, 0 console
  errors, 0 failed requests, 0 horizontal overflow (tables and the marquee scroll inside their own box).
- Every reveal fired on a natural scroll, count equals total on every page.
- Scroll story, steps 1 to 8 each switched the panel and rail to the matching screen, all decoded.
- Videos play in view (WebM listed first, our Chromium can't play H.264), pause button works.
- Forms, empty submit flags 5 fields and focuses the first, bad email flagged, a failed POST shows
  the error box with Stuart's phone and email, a 200 shows the success state.
- Calculator checked by hand against Elitestone clear days and GOV.UK bank holidays on five dates.
- No-JS, every section readable, nothing stuck hidden.
- Copy audit on rendered text, 0 dashes, 0 colons, 0 banned words, 0 "not X but Y", 127 contractions,
  the only scaffolding word is the single approved footnote.
- Portraits, both are Qualigraf's own illustrated portraits, each inside its own card on their site
  with an alt naming the person (steven.png on /en/homepage/, stuart.png on /uk/homepage-uk/), and
  byte identical to their files (sha256 bc4f3264..., 62f9c93b...). tools/verify_portraits.py expects
  base64 images in one file, so its containment function was run against their pages directly and
  the byte check done by hash. The tool itself was not loosened.
- Live, all 10 pages 200 with matching title and text, all 66 assets byte matched, live scripts parse.

## Steven should confirm before he publishes it

1. **AI Minutes status.** The current UK homepage says "COMING SOON", the UK AI Minutes page offers
   a 5 hour free trial. The build follows the AI Minutes page.
2. **"Two UK councils are already implementing it."** From Steven's own LinkedIn post, about two
   months old. If either is live now, or can be named, that's the strongest proof on the site.
3. **Product screens are their own sample data**, a Canadian demo council ("Clearwater Ridge").
   UK sample screens (a cabinet, a scrutiny committee) would read better. Screens with "Highway 401"
   and a wildfire story were left out for that reason.
4. **The live UI fragments are ours**, built from their real features (vote 31, 12, 3, a transcript
   on their own demo item 4.1, a note, search results from their demo file names). Covered by the
   footnote "Product screens and examples on this site show sample data."
5. **Chamber photos** are CC0 from Wikimedia Commons (Michael D Beckwith), Sheffield Town Hall,
   Worcester Guildhall, Halifax Town Hall, Chester Town Hall, The Athenaeum. Not captioned and not
   named in alt text, but a local officer might recognise one. Their own photography replaces them.
6. **Forms post to Netlify Forms on our project.** On their WordPress site they point at their own
   handler.
7. **Process wording is ours**, "We set it up around a real meeting of yours" and the three next
   steps in the closing section.
8. **Numbers are theirs**, "400+ clients across Europe" (ADSO sponsor page), "nearly 200" French
   authorities (their French site), "around 40 years" in Democratic Services (Stuart's LinkedIn post).
   Founding year left out because their sources disagree, 2006 on the Dutch careers page and 2009
   on ADSO and LinkedIn.
9. **Verbatim quotes keep their hyphens** ("decision-making", "first-hand").
10. Add a noindex tag or not, it's their call. The build has none.
11. **v3 sample data.** The webcast panel (timecode, speaker roles, agenda items 3 to 6), the AI
    Minutes transcript and minutes, the archive wall of 1,872 sample documents and its results, and
    the "Two hours forty of Full Council" recording are illustrations built on their demo item 4.1
    and demo file names. The panel and archive say "sample" on screen, and the footnote covers the
    rest.
12. **Paper calculator defaults** (120 meetings, 12 packs, 150 pages) are starting numbers, labelled
    as sample figures. The 0.1 mm a sheet is a rough office paper figure and says "about".
13. **The East Sussex quote** is from their 2025 tender on Contracts Finder, used as a named public
    source. Steven may prefer it unnamed.

## Claims ledger (facts on the site and where they come from)

- Features and wording, qualigraf.com/uk pages, legislative, information-advisor, council-information,
  workflow, paperless-meetings, long-term-planner, ai-minutes, publish-stream, quality (all rendered
  2026-09-28). Integrations YouTube, Zoom, Teams, from /nl/griffie/.
- Certifications, /uk/information-advisor-uk/ and /uk/quality-uk/ (ISO 27001, 27002, ISAE 3000 Type 2,
  ISO 9001, ISO 16175, GDPR, WCAG 2.1 AA, Cyber Essentials, audit trail).
- 28 clear days, reg 9, 5 clear days, LGA 1972 s100B, general exception and special urgency, regs 10
  and 11, decision records, regs 12 and 13, six and four years, s100C and s100D, all read on
  legislation.gov.uk. Clear days excluding weekends and bank holidays, R v Swansea CC ex p Elitestone
  (1993), via Local Government Lawyer.
- Joicey v Northumberland [2014] EWHC 3657, Local Government Lawyer "A strict test".
- Surrey, twelve councils to two from April 2027 (Mole Valley DC), shadow authorities since the May
  2026 elections and vesting day 1 April 2027 (Surrey LGR Hub), 7 Sep 2026 review, four areas
  withdrawn, others paused, Surrey unaffected (Capsticks).
- Company history, DocWolves and Qualigraf working together since 2011 and merged (Silicon Canals,
  9 May 2023), Steven appointed Group CEO (UK press release, 20 Jan 2026), Rens stays on the board.
- ADSO silver sponsor, adso.co.uk/qualigraf.
- Webinar "Improving Governance, Transparency and Efficiency in Local Government", August 2026,
  Steven's LinkedIn post.
