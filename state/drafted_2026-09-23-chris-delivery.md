<!-- GATE ARCHIVED -->
# Draft v4, 2026-09-23. Chris Flood, CustomKit. SENT 2026-09-23 18.05 UTC on Raka's word, act_uHTeDtzFdTcJNz5gM. "CIMB Niaga" changed to "CIMB bank" at his request before sending.

v4 follows Raka's note "we know u built stuff from AI, but we're gonna do much better than AI
to redesign your website and get you more cash. We need to win against AI thats our selling
point". v2 and v3 are in `state/drafted_2026-09-23-chris-delivery-v2-archived.md`. Thread
pulled after the v3 deploy, `get_inbox_conversation` ctc_27mqQ2pvCXMP3kgJs, 3 activities,
nextPage null, newest his reply 23 Sep 13.34 UTC. Pull it again right before sending.

## Chris Flood, CustomKit. DELIVERY. ctc_27mqQ2pvCXMP3kgJs

```
Chris, here are the sketches, and we took them a bit further than sketches.

I can see your sites were built in Lovable. A brand checking you out today finds pages that give different minimums and different lead times, and the deck lays them out side by side.
https://astra-customkit-deck.netlify.app

So we redesigned it the way an AI builder won't. We read all 75 pages across both sites and set one schedule and one minimum per product for you to confirm. Your real reviews and kit renders sit up front, and it opens on footage of teams playing, licensed stock until you shoot your own. It's built to turn more brand enquiries into paid orders.
https://astra-customkit-prototype.netlify.app

After launch you'd have people behind it too, to wire the brief form into your inbox, take payment for design bookings and set up club stores. Our development partner has built shops and payment apps for CIMB bank and GPay.

You said the site's changing over the coming months. Could we do 30 minutes next week and go through it together?
```

Notes for Raka on v4.

- **Naming Lovable is the AI line, and it's proven.** Checked in their live code 2026-09-23,
  three separate traces. customkit.com's script carries Lovable's preview login code
  (`lovable-preview-auth`, `lovable.dev`). customkit.uk's script sets its thank you page
  address to `https://ck2.lovable.app/thank-you`. design.customkit.com's share image is a
  Lovable preview screenshot (`...lovable.app-1775173437584.png`). All three serve
  `/~flock.js`, which example.com (the control) does not.
- **It never says AI caused the problems.** A person could have written contradicting pages
  too, so the two sentences sit side by side and Chris draws the line himself.
- **"More cash" is written as what the site is built for, with no figure.** Nothing we have
  lets us promise an amount, and the numbers rule bans a made up one.
- **He may be proud of the Lovable build.** His company page says CustomKit was "rebuilt from
  the ground up" after the acquisition, and customkit.com sells an "I designed this in
  ChatGPT" service. The message states it as a fact and moves on, no judgement words.
- **Closes on a call**, 30 minutes, "next week" assumes you're free.
- The two optional lines from v2 still apply.

Claims in v4, each re-testable.

- "your sites were built in Lovable", the three code traces above, fetched live 2026-09-23.
- "pages that give different minimums", rendered live 2026-09-23. /custom-teamwear "No
  minimum order quantity applies", /custom-golf-apparel "Production runs from 15 units",
  /why-us "10 units or 10,000", /white-label-manufacturing "initial run is 25 units",
  design.customkit.com/prices "Minimum order 10 garments".
- "different lead times", rendered live 2026-09-23. /manufacturer-for-clubs-and-teams "3–5
  weeks", /custom-golf-apparel and /white-label-manufacturing "4–6 weeks", /why-us "as little
  as 4 weeks".
- "the deck lays them out side by side", deck section 04 The terms.
- "all 75 pages across both sites", live sitemaps 2026-09-23, customkit.com 51, customkit.uk
  24, every one rendered in this session's crawl, zero missing.
- "one schedule and one minimum per product for you to confirm", the split flap schedule and
  the per garment minimums in the FAQ, handover "Choices Chris should confirm".
- "your real reviews and kit renders up front", nine Trustpilot reviews word for word, six
  kit designer renders in the kit room.
- "footage of teams playing, licensed stock", Mixkit Free licence, handover v3.
- "club stores", customkit.com/clubs-and-teams, live 2026-09-23.
- "take payment for design bookings", the booking copy promises card payment, handover item 1.
- "Our development partner has built shops and payment apps for CIMB bank and GPay" (Raka's wording 2026-09-23, CIMB Niaga is a bank),
  docs/partner/amwisesa-credentials.md rows 104 and 105.
- "You said the site's changing over the coming months", his reply 23 Sep.
