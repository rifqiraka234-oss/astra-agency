# HotGreen proposal page. Handover

**Version 2 (25 Sep evening).** Families A to F, Raka's names for C, D and E, simpler words, a big sketch per
group and a small one per piece. Every sketch says Sketch, Example or Real data on it. See the last section
of `../evidence-ledger.md` for the new facts. The v1 build is kept as `build_v1.py.bak`.

**Not sent.** Nothing goes to Sanya or Georgia without Raka's word.

| | |
|---|---|
| Live | https://astra-hotgreen-proposal.netlify.app |
| Fix list | https://astra-hotgreen-proposal.netlify.app/fixes |
| Netlify site id | 14611325-495c-4474-b822-132bf2e632f6 |
| Deploy id | 6ab684d3419ce40a0fa17268 |
| Team SSO | switched off, checked in the project record |
| Source | `build.py` here, `python3 build.py` writes `out/` |

## Checked before handing over

- Every fact rechecked live on 25 Sep, three ways, see `../evidence-ledger.md`, last section.
- Cold load QA (`tools/deck-qa/qa.js`) on both pages. No page errors, no console errors, no 4xx,
  81 of 81 reveals fired naturally, all images decoded, no sideways scroll at 420 px.
- Every section screenshotted at 1440 and 390 px and looked at.
- Shortlist exercised end to end. Pick, the timeline chip lights up, the list and the email link
  update, it survives a reload, unpick and clear work, the tray shows the count.
- Live. Both pages 200 with their titles, every image and the font byte match the build, the HTML
  differs only by Netlify rewriting `fixes.html` to `/fixes`, the live script parses, the live
  render has no login wall, and the proposal to fix list and back links work.
- Copy. Zero colons, zero en or em dashes, the only hyphen is Coca-Cola, 35 contractions, no banned
  words (every "solutions" hit is HotGreen's own name or page), no banned phrases.

## Before it's sent

1. **Prices.** The recap promised "impact, timeline and investment for each piece". The page has no
   prices and says a price and a date come after the call. Raka and Josh decide.
2. **Recheck the fix list on the day.** Sanya said she'd fix titles and SEO herself within two weeks of
   Georgia getting back. Any item she's fixed comes out, and the count in the heading changes with it.
3. **Recheck the live facts on the day**, per RULES section 1 check B. The ledger lists each one with
   its source.
4. **Word count.** About 2,900 words of visible text including 24 repeated card labels and the
   timeline chips. The prose is closer to 2,000. The deck guide is about 1,600, so trim if Raka wants.
5. **Email.** The "Email me" button opens a message to rifqiraka234@gmail.com with the picked pieces,
   as on the SotoCat deck.

## Choices Raka should confirm

- The page leads with "Your proof is stronger than your website", the same idea as the August deck.
- The mockups in section 05 are labelled "sketches, not final screens". The site assessment rows
  are marked as example rows.
- The two photos are the ones from the August HotGreen deck, industrial scenes, not HotGreen's.
- The partner section reuses the approved SotoCat wording, four of its project images, and the
  disclosure line.

## Version 3, the decluttered rebuild (25 September 2026, evening)

Raka's brief, "easier to understand ... declutter it ... use real pictures ... improve the quality really
really really ... do a three times check". The research and the plan are in `DESIGN-v3.md`.

**Live.** https://astra-hotgreen-proposal.netlify.app, deploy `6ab6a373620347764a081d82`, same site id.
Nothing has been sent to HotGreen.

**What changed.**
- Seven numbered steps with a slim bar at the top that shows where you are. One idea per step. 797 words
  on the main path, down from about 3,400 in version 2.
- The six parts are six tiles. "See it" opens one panel per part with a large example screen for every
  item, so 25 example screens in all. Picking is per part (A to F), not per item.
- Every example screen is a finished looking HTML mock (`mocks.py`, rendered by `render_all.sh`) built
  on HotGreen's own logo, product image, specs, published numbers, backers and the UK ETS register data.
  Anything invented is labelled once on the screen, and results that need their model are blurred.
- Three real Unsplash photos of brewing and fermentation, licence checked three ways, credits in
  `DESIGN-v3.md`.

**Rebuild.** Serve this folder on 8793 (`python3 -m http.server 8793`), then `./render_all.sh` and
`python3 build.py`. The fix list screenshot `assets/img/ex/fixes.webp` comes from `shot_fixes.js` against
`out/` served on 8794, and `render_all.sh` leaves it alone.

**Caught in the three pass check and fixed before deploy.**
- A demonstrator screen said "50 kW HotStack". The grant says a 50 kWth heat pump and HotStack modules
  are 0.5 MW, so it now says "demonstration heat pump".
- "Three different savings numbers" sat under "On your website", but only 30% is on the site. It's now a
  separate line naming where each figure appears.
- The enquiry form screen promised "reply the same day". Nothing from HotGreen says that, so it's gone.
- The fact sheet screen marked 1,500 t CO2 per MW and 4x as "Basis to add". The Solutions page footnote
  calls them estimates, so they're now labelled "Estimate".

**Checks run on this version.** Copy audit on every visible word including panel captions, alt text and
the 25 screens, zero colons, dashes or hyphens (Coca-Cola aside), the only uncontracted phrases are
clause final ("Where you are"). Interaction test 62 of 62 on desktop and phone, locally and live. QA
harness clean on the live download. 32 of 32 live assets byte matched, HTML identical apart from
Netlify's rewrite of the fix list link. SSO off.

**Still open before it's sent.** Prices (the recap promised "investment for each piece"), and part A
says we'll make the fixes for free. Both are Raka's and Josh's call.
