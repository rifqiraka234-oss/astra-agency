# Qualigraf UK site, handover (2026-09-28)

Live: https://astra-qualigraf-prototype.netlify.app (Netlify site `astra-qualigraf-prototype`,
id 1ce634b7-82ce-4ecb-993a-a4a26e6eb0d3, deploy 6aba877f84e491673a56289b, team SSO off, forms on).
Source: `state/prototypes/qualigraf/build/` (pages, build.py, close.html). Output: `site/`.
Research, evidence pack and art direction: `research.md` in this folder.

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
