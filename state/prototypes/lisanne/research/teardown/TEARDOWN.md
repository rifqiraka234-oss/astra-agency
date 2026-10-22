# Reference teardown for the Lisanne build, 2026-10-22

`teardown.js` (copied from the Hertling run), Chromium 1194 through the egress proxy, SPKI pinned, 1440x900 plus one
390px frame, five frames down each page. 54 queued in `sites.txt`, 48 rendered with HTTP 200 and usable.

Not usable, by name. robinai.com (net::ERR_ABORTED on our side), decagon.ai (screenshot timeout on our side), plus pages
covered by consent or locale pop ups on later frames (front.com, intercom.com/fin, glean.com, mistral.ai, missiveapp.com,
attio.com frame 0 corner). Frame 0 and the DOM counts were used for those. None of this is evidence about those sites.

## Counts across the 48

- Fonts. Inter on 14 of 48, the most used face by far. Legal brands lean on a serif for headlines (Harvey's own serif,
  Spellbook's Arizona Mix, Smokeball's Messina Serif, Flank's DM Serif Display, the Dutch bar's DM Serif Text).
- Median page 9,315 px tall, 9 sections, 949 words, 1 video, 51 inline SVGs. GSAP on 15, ScrollTrigger on 8.
- Her own site, Sabon LT Pro and Inter, 5,560 px, 810 words, no video.

## What transfers, and where it goes

1. **Product in the first screen.** Harvey, Attio, Linear, Cursor, Filevine, MyCase and Sierra all put the real app UI
   in a framed window right under the headline. Our pitch hero shows her intake desk, not an illustration.
2. **A serif for legal trust, a grotesk for the tool.** Matches her own Sabon plus Inter. EB Garamond (OFL, same
   Garamond roots as Sabon) for headlines, Inter for the app.
3. **Greet the user in the app.** Attio's "Good morning, Alex". The desk opens on "Goedemorgen, Lisanne".
4. **Security as a block of plain checks.** Fyxer and Supio list SOC 2, HIPAA, GDPR as ticks. Ours lists the Dutch
   bar's own recommendations with how each is met, which is the version a Dutch lawyer trusts.
5. **One big quote about hours.** Hebbia's "It used to take our team 12 hours a day ... now in an hour or two". We have no
   client quote yet, so the equivalent is the Clio figure, sourced under it, never a made up testimonial.
6. **Stats as a row of three.** Ramp's "Up to 5%+, 85%, 3x". Ours are her own inputs in a calculator, labelled as hers.
7. **Self checks the gov.uk way.** One question per screen, plain words, a "Start nu" button, sources at the foot. The
   re-integration check follows that, it's the clearest pattern for someone who's ill and worried.
8. **Show the workflow as a flow.** n8n's "Build the agent. Understand its workflow." The architecture chapter draws
   the real flow, with the EU boundary and her approval as a visible gate.
9. **Intake framed as lost clients.** Lawmatics leads with "Where is your intake costing you clients?". Closest US
   product to what we're building, for law firms that buy software, not a one lawyer practice in Limburg.

Contact sheets, `sheet-legal-a.jpg`, `sheet-legal-b.jpg`, `sheet-ai-a.jpg`, `sheet-ai-b.jpg` and the `-f2` middle frames.
