# Hooft & Petiet and ReShare Living Group, handover. 25 Oct 2026, v3

For Willem Straat's team at marketing@keypro.nl, on his instruction of 22 Oct ("Please sent you message to
marketing@keypro.nl") and Raka's of 25 Oct ("wait i think we needa send a prototype, thats my thing"). Our 14 Oct opener
offered "a modernised Hooft & Petiet site and a finished ReShare site, built as one family".

**v3 replaces v2, same URLs.** Raka on v2, 25 Oct, "it feels like it's so plain and basic … Now you've done the flow, but
not the artistic value. It needs to have a wow effect." v3 keeps v2's flow (the visitor, their questions in order, the one
action) and adds the art layer planned in research/v3/brief.md after rendering nine award level sites. v1 and v2 stay in
git (build/, build2/), not on the web.

## Live

| Site | URL | Pages |
|---|---|---|
| Hooft & Petiet | https://astra-hooftenpetiet-prototype.netlify.app | / , /verkoopstyling/ , /offerte/ , and /en/ , /en/sales-styling/ , /en/quote/ |
| ReShare Living Group | https://astra-reshare-prototype.netlify.app | / and /en/ |
| The plan, Astra's voice, English | https://astra-hooftenpetiet-plan.netlify.app | / |

Netlify ids, astra-hooftenpetiet-prototype c8d94385-c7d6-43a5-b5b1-9b2b88901ed3 (deploy 6ade136b8c0b761d685afa6c),
astra-reshare-prototype 216660cc-b644-4e72-9ed5-cf4c6ecc79d3 (deploy 6ade1379fff55c2d493f4948),
astra-hooftenpetiet-plan 08f7e9de-aed7-4b7f-8fa6-7fc68de83b05 (deploy 6ade134e75c372f94d80d9b0, new 25 Oct, team SSO came
up on and was switched off before the first deploy). Team SSO off on all three. noindex on every page, X-Robots-Tag
header, disallow robots.txt.

## v3.1, 25 Oct afternoon, Raka's "Do itt"

The three steps from the honest review of v3, all done and live.
1. **The plan, on its own site.** Every figure in build-plan/data/plan.json, every chart computed from it, a source under
   everything. Its signature moment is today's hooftenpetiet.nl turning into the new site as you scroll, the new one
   rising through it in their arch (phone screenshots on phones). Then the heat demand chart (108 to 94 to 87, hover and
   table view, indigo and oak validated together), six dates with a line that draws as you read, the allowance as a
   street of 200 homes you light with a slider (households times €7,926, labelled the statutory minimum at stake, never a
   saving), the rivals table with a switch between your site today and the new one, Brenda's own line in full, the
   journey with built and next, the new sites in a frame that follows the captions, the 26 articles as tiles that read
   out the title Google shows, a HubSpot request example, twelve weeks as bars, the team block word for word from the
   Hertling plan with the partner disclosure. Facts and how each was checked, research/plan/facts.md.
2. **H&P home performance**, Lighthouse 70 to 93 on a phone (geometry cached, WebGL started after load, adaptive frame
   rate, no backdrop blur, one stylesheet, WebP pictures). The badge's name now matches its text.
3. **Projects as case stories**, Portaal, HEF Wonen, Stadgenoot and Cazas Wonen, each with a photo from its own article
   and the quote as published there, translated.

Caught and fixed on the way. The plan's quote photo first showed a woman setting a welcome card, which beside "Brenda de
Wilde's line" reads as Brenda, so it's a sofa with no one in it. Brenda's line was shortened in the first draft, it's
now in full, "Alleen de koffer moet nog door de bewoners worden uitgepakt." The new site row first said "four projects in
their words", two of the four quotes are clients (Danny Mooren, Thierry Farla), one is a resident and one is Brenda, so
it says that. A dark mid page section left the page light dark until the next section reached mid screen, dark text on
dark for a moment, so the page light stays warm under dark sections and the header follows its own marker (fx.js reads
data-hdr, shared with both sites). The hidden chart tooltip widened the page after a resize. The week stepper's minus
was a minus sign character, now a drawn line.

Checked. Plan 14 of 14 functional locally and live, each check also run with a planted fault (13 of 13 caught, the
script error check has nothing to plant). axe clean at 1280 and 390 with reduced motion and at 1440 and 390 after a full
scroll with motion. Copy rules clean (Moving-In is a name). Lighthouse plan 91 phone, 100 desktop, the only contrast hit
is the quote's words before they fill in. H&P and ReShare 69 of 69 locally, axe clean on all 16 views. Live, 180 of 180,
86 of 86 and 43 of 43 files match the build. Live sweep of all 8 site pages at 1440 and 390, 0 broken images, 0 errors,
0 failed requests. Every plan source reopened 25 Oct ~14.45 UTC, Aedes (three pages), Rijksoverheid ("€ 7926" for moves
from 28 February 2026), Dirkzwager, PBL ("heel erg onwaarschijnlijk"), KeyPro ("50% circulair in te kopen"), Moving-In
("9.4/10 Feedback Company"), Furniture Lease ("€ 149,50", "Onze opdrachtgevers aan het woord"). The 26 article titles
fetched again, 12 share one.

Live, after the deploy. H&P and ReShare 69 of 69 functional on the live URLs. Lighthouse on a phone, on the live
compressed sites, H&P 97 (LCP 2.4 s), ReShare 97 (LCP 2.3 s), plan 99 (LCP 2.0 s), best practices 100 on all three.

## Who it's for and what it asks them to do (unchanged from v2)

**H&P.** The project leader at a housing association or renovation contractor who has to move residents out for weeks.
Their questions in order, can you have my homes ready on the contractor's date, will my residents be all right, what do
you take off my hands, have you done this for a corporation like mine, what will it cost. The one action is the
availability bar (soort woning, aantal woningen, vanaf, hoe lang), on the first screen and again at the close.

**ReShare.** Someone checking the group, often a buyer who has to purchase circular. The page explains the name in their
words, then sends them through one of two doors, KeyPro or Hooft & Petiet, or to contact@reshareliving.com.

## The art layer

**H&P, one day in a new home.** A living WebGL gradient behind the page in their lime, a warm oak and a lilac from their
indigo, with grain, moving from dawn at the top through a golden afternoon to a dusk indigo close. The hero is a giant
Newsreader line with their photos set inside the words as an arch window and their house shape, a rotating ring of text
around the lime house ("Projectinrichting · sinds 2010 · Utrecht"), and a warm lamp that follows the cursor. Scrolling
opens the arch into the full room and the lights come on, ending on "Direct bewoonbaar, zodra de sleutel wordt
overgedragen." The residents' quote fills in word by word. "Van sleutel tot uitcheck" is a sticky arch with a photo per
row that wipes in as each row reaches the middle. Logeerwoning, Rustwoning, Wisselwoning run as a giant line with a photo
inside each word, and hovering a home type in the table shows its own photo under the cursor. The projects sit under a
concave panorama of fifteen of their rooms that turns as you scroll. The close is dusk, a window drawn in light, and the
bar again. Verkoopstyling has an arch with a disc, and the gallery as arch, rectangle, circle and house at different depths.

**ReShare, meerdere levens.** A particle sculpture of 1,900 points that forms a chair, a sofa, a lamp and a table in
turn, with a "Leven" counter, in KeyPro's teal and sand, and it scatters from the cursor. A 3D ring of their photos turns
as you scroll with Re, Share and Living and what each stands for in the middle. The two doors open wider on hover, each on
its own moving gradient. The reasoning fills in word by word, the four steps sit on a circle that draws round with a light
travelling on it, and the page ends in a deep forest green.

Reduced motion and no JavaScript get a complete static page (checked). Everything that moves writes transforms, opacity,
clip paths or CSS variables, the canvases pause off screen, the gradient renders at half resolution at 30 frames a second.

## Checked, 25 Oct

- Every line traced to their own pages (research/research.md, v3 section). New in v3, "Projectinrichting en meubelverhuur"
  is their homepage title and "Sinds 2010" is on it (fetched 25 Oct). The three home type photos sit on H&P's own
  /wat-is-een-logeerwoning/, /woningcorporaties-rustwoning-renovatie/ and /wat-is-een-wisselwoning/ pages (fetched live,
  5, 12 and 5 hits). Every hand over photo now comes from the matching service page (research.md lists each one).
- 16 page views screenshotted at 1440 and 390 and looked at, plus the signature scenes frame by frame.
- Functional, 69 of 69 locally. v2's 52 plus the dusk bar, the WebGL light on, the arch growing into the room, the bar
  stepping aside, the photo following the row, the panorama, the hover photo arriving and leaving, the quote filling in,
  the header turning at dusk on both sites, the sculpture drawing and its counter moving, one ring word at a time, the
  cycle drawing round. No sideways scroll at nine widths. No JavaScript and reduced motion, every element visible and
  every image decoded, no canvas created.
- axe, WCAG 2.1 AA plus best practice, clean on all 16 views with reduced motion. With motion on, the only finding is the
  words that haven't filled in yet (they sit at 20% until read), a deliberate reading effect.
- Copy rules over every visible word, alt, label and placeholder, no dashes apart from Oud-West, no colons, no banned words.
- Live, 72 of 72 files on H&P and 40 of 40 on ReShare match the build (assets by sha256, HTML by visible text). Live
  render of every page at 1440 and 390, 0 errors, every image decoded, WebGL on.
- First load 1.1 MB on H&P, 1.8 MB on ReShare.

## Final check, 25 Oct, on the live URLs after the last deploy

- 72 of 72 and 40 of 40 live files match the build again.
- All 8 pages loaded at 1440 and at 390 (phone, touch, DPR 2) and scrolled through slowly, 136 screenshots looked at.
  0 broken images, 0 still loading, 0 sideways overflow, 0 script errors, 0 failed requests, both fonts loaded, gradient
  on. Positive control on the live page, a planted missing image, its 404, a thrown error and a 2,000px div were all caught.
- One phone load of the ReShare home got its stylesheet back aborted as text/plain through our proxy. Netlify served
  text/css on 6 of 6 direct fetches and on 3 of 3 reloads of that page in Chromium, so it was our side.
- Functional suite 69 of 69 against the live URLs, including the nine width overflow check. Every link on every page,
  26, returns 200, with a 404 control.
- Fixed in this pass, the dusk bar's number field cut its placeholder on desktop (now two fields over a full width
  button), and the dusk and forest closes showed faint seams where a glow was cut at a section edge (glows moved inside,
  ReShare's quote and contact now share one background).

## Two things found and fixed on the way

- A fully transparent sticky header over a WebGL canvas made with alpha false composited black in Chromium, and some
  clipped shapes did too. The context is now alpha true and the header keeps a 1% trace of paper. In headless Chromium the
  canvas still isn't drawn under the header in screenshots, though its pixels read back complete (all 422 rows), so on
  that path the CSS gradient underneath shows, never black.
- The gradient shader now runs at high precision with a small hash, because a phone's medium precision would overflow the
  noise and the grain.

## Must not ship as is

- The prototype line at the top and in the footer stays while it's a pitch.
- Photos are their own and only paired with what their own page pairs them with. Partner logos are 8 of the 25 on their
  homepage.
- The 8 to 8,5 dates from 2020. Use a newer measurement if they have one.
- The plan's HubSpot record is an example and says so, and the twelve weeks are our proposal, not an agreed schedule.
- The allowance figure is the statutory minimum per household, and the plan says a lawyer checks the page before it goes live.

## Sending

Gmail draft r3040318523259070641 to marketing@keypro.nl, text in state/drafted_2026-10-22-willem.md, updated for the plan
on 25 Oct ~15.00 UTC and read back. NOT SENT. The Gmail connector wraps every link in a google.com/url redirect that expires after about a day, so
Raka sending it from Gmail himself with the links pasted fresh is the clean way.

## Rebuild

`python3 build-plan/plan.py` regenerates site-plan from build-plan/ (data/plan.json, css/plan.css, js/plan.js, media/
screenshots) plus build3's fonts, site.css, fx.css and fx.js. `python3 build3/build.py` regenerates site-hp and site-rs from build3/ (css/site.css and css/fx.css, js/site.js and
js/fx.js, fonts, media, every word of copy in build.py). Serve each folder at its root.
