# Draft v3, 2026-09-23. Chris Flood, CustomKit. NOT SENT, waiting on Raka.

v3 follows Raka's note "Create or draft the message to win a meeting and deal with them.
Emphasising we do more things AI that cant do". It replaces v2, now in
`state/drafted_2026-09-23-chris-delivery-v2-archived.md`. Whole thread pulled after the v3 deploy, `get_inbox_conversation`
ctc_27mqQ2pvCXMP3kgJs, 3 activities, nextPage null, totalItems 3, newest his reply 23 Sep
13.34 UTC. Pull it again right before sending.

## Chris Flood, CustomKit. DELIVERY. ctc_27mqQ2pvCXMP3kgJs

```
Chris, here are the sketches, and we took them a bit further than sketches.

The deck walks through what a brand sees on customkit.com today and where you're taking it.
https://astra-customkit-deck.netlify.app

Then we redesigned your site from scratch, with teams and brands together and a front door for each. It opens on footage of teams playing, licensed stock for now, ready for your own shoots.
https://astra-customkit-prototype.netlify.app

A lot of the day went on the part an AI builder won't do for you. We read every page on both your sites and checked every number on ours against your own pages, your reviews and Companies House, and the deck shows where your pages disagree with each other.

Going live needs people too, to wire the brief form into your inbox, take payment for design bookings, set up club stores and keep it all running after launch. Our development partner has built shops and payment apps for CIMB Niaga and GPay, so that side's covered.

You said the site's changing over the coming months. Could we do 30 minutes next week? I'll walk you through it and you can tell me what's planned.
```

Notes for Raka on v3.

- **It closes on a call, not "What do you think?".** The delivery shape in CLAUDE.md says close
  on a real question because the artefact is the ask. You asked for a message that wins the
  meeting, so it asks for 30 minutes. "Next week" assumes you're free, change it if not.
- **The AI point is made about the work, never about his site.** customkit.com has a page
  called "I designed this in ChatGPT" that sells AI designed kit to his own customers, so
  knocking AI in general could land badly. The line says what an AI builder won't do and then
  what we did.
- **The two contradictions I left out on purpose.** Live today, his golf page says "No minimum
  order quantity" and "Production runs from 15 units" in the same answer, and lead times read
  3 to 5 weeks on the clubs pages and 4 to 6 on golf and white label. Both could be defended as
  different products, so the message only points to the deck, which already lists them.
- **No price.** Nothing quoted, the 5k to 50k band stays for the call.
- **Longer than a normal delivery**, 189 words against 60 to 80, because it carries the
  pitch too. If you want it shorter, the paragraph starting "Going live" is the one to cut.
- The two optional lines from v2, in `state/drafted_2026-09-23-chris-delivery-v2-archived.md`, still apply (the "two sites makes sense" line and the
  price correction).

Claims in v3, each re-testable.

- "We read every page on both your sites", customkit.com/sitemap.xml 51 URLs and
  customkit.uk/sitemap.xml 24 URLs, re-fetched live 2026-09-23, every one of the 75 rendered
  and saved in this session's crawl, zero missing.
- "checked every number on ours against your own pages, your reviews and Companies House", research.md
  sections "What the build uses" and "v3", claims re-rendered live 2026-09-23.
- "the deck shows where your pages disagree", deck section 04 The terms, the lead time row
  lists the answers his pages give.
- "It opens on footage of teams playing, licensed stock", homepage reel, Mixkit Free licence,
  handover v3.
- "club stores", customkit.com/clubs-and-teams, rendered live 2026-09-23, "Dedicated online
  club stores can be set up".
- "take payment for design bookings", the brand design booking copy promises a card payment
  step (handover, must change item 1).
- "Our development partner has built shops and payment apps for CIMB Niaga and GPay",
  docs/partner/amwisesa-credentials.md rows 104 and 105, Tempat Niaga online shop for CIMB
  Niaga, GPay payments app. Partner disclosed in the sentence itself.
- "You said the site's changing over the coming months", his reply 23 Sep, "Our website is
  going to go through many changes over the coming months".
