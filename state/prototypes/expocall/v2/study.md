# Reference study for the ExpoCall hotels page (2026-10-05)

## What was rendered

69 URLs queued in five scripted batches (`work/study2.js`, lists `work/L1.txt` to `L5.txt`). Each page was loaded in Chromium with the proxy CA pinned, then retried through a local curl_cffi fetcher impersonating Chrome (`work/cffi_server.py`) when the first load hit a wall. Per page there's a fold screenshot, up to six frames down the scroll, a full page capture to 9,000px, and a runtime fingerprint covering libraries (GSAP, ScrollTrigger, three, Lottie, Lenis, Swiper, Rive, Framer, Webflow, Next), WebGL canvases, video and audio elements, sticky and fixed elements, clip-path masks, blend modes, backdrop blur, running animations, loaded fonts, and a count of style and class mutations while scrolling. Raw numbers are in `study/fingerprints_all.json`, and the screenshots are in `study/`.

- **Rendered: 62.**
- **Walled after both routes: 6.** SiteMinder, Little Hotelier and Triptease (Cloudflare "Just a moment"), PolyAI's hospitality page, The Pig hotels, and OpenAI's realtime voice page. curl_cffi didn't get past Cloudflare here because the egress proxy re-terminates TLS, so the origin sees the proxy's fingerprint, not ours.
- **Failed: 1.** Retell timed out on the screenshot in batch 1. Its fingerprint from the same load is kept, and its fold shot was taken.
- **Rendered but partly painted, so judged on fingerprint and later frames, not the fold.** Dialpad (blank fold), Linear (black fold mid-load), Aman (its own film player showed an error in our renderer, which is our render, not their site), Air.ai (white fold). The openai.com voice URL redirected to a DevDay recap and isn't counted as a voice reference.

## The three groups, and what each does that we can use

### AI voice and receptionist products (21 rendered)
Bland, Retell, Vapi, Synthflow, Air.ai, Smith.ai, Goodcall, Rosie, Slang, PolyAI, ElevenLabs, Deepgram, Hume, Sesame, Cartesia, My AI Front Desk, Dialzara, Moneypenny, Ruby, Aircall, Dialpad, Loman, Hostie, Newo, Trillet, plus batch 5 (Talkdesk, Lindy, Phonely, Upfirst, AssemblyAI, CallRail).

| Site | What the numbers or the screen show | The move |
|---|---|---|
| **Smith.ai** | The hero right half is a call player, a waveform scrubber (0.49 of 2.29), an industry dropdown ("Law Firms"), transcript lines fading in Agent then Caller, a big play button, and a box reading "This is a recording. Want to hear how our AI handles your real call?" with "Try the live demo" | **The best "hear a call" pattern in the set.** A recording, the transcript in step, the industry chosen by the visitor, and an honest label beside a live demo button. This is the one to beat |
| **Rosie** | 4 audio elements, 5 mentions of "transcript", a phone mock with an incoming call and Decline and Accept buttons, call sample cards per trade | A phone screen makes it a call and not a podcast, and samples are split by trade |
| **ElevenLabs** | 27 audio elements on one page, a chat or voice widget, "Talk to an agent" | Voice is proved by playing voice everywhere, not by describing it |
| **Vapi** | "Start call" in the hero with a use case dropdown ("Customer Support") | The CTA is the call itself |
| **Cartesia** | Voice orbs in a carousel, "Talk to Skylar" | A voice gets a name and a face |
| **Retell** | 13 canvases, 10 sticky elements, a looping "voice visualizer" film | An audio-reactive visual reads as "live" even when silent |
| **Goodcall, Hume** | An animated ring or a field of wave lines as the hero object | A waveform is the category's hero object, so ours has to be one nobody else could own (theirs, from their mark) |
| **Moneypenny, Ruby** | Real people with headsets, GSAP and ScrollTrigger on Moneypenny | UK answering services sell people, so the AI page has to sound human, not look human |
| **Synthflow, Air.ai** | Analyst charts and enterprise claims | The enterprise register, which is wrong for a 20 room hotel |

### Hotel tech and hotel brands (24 rendered)
Mews, Cloudbeds, Canary, HiJiffy, Asksuite, Apaleo, Guesty, Lighthouse, Revinate, Freetobook, eviivo, Oaky, Sonder, Hoxton, Ace Hotel, Aman, Edition, Airbnb.

| Site | What the numbers or the screen show | The move |
|---|---|---|
| **Mews** | A black slab with huge uppercase type beside the real product grid (room rack), 4 product videos | ExpoCall's partner. Bold type and the product doing the work, no stock people |
| **Canary** | Floating node cards ("AI Voice calls in progress", "AI Sales Coordinator") tied by lines, 17 clip masks | The hotel AI category shows the system as connected cards |
| **HiJiffy** | 6 product films, 29 clip masks | Short UI films of each job |
| **Cloudbeds** | Floating photo collage around a centred headline, Lenis, 1,656 style mutations on scroll | Scroll-driven motion with hotel photography |
| **Ace Hotel** | Full bleed film with huge condensed type ("WELCOME TO ACE HOTEL"), 36 clip masks | Hotel brands lead with film and a few huge words |
| **Edition** | Black, one sculptural object, a wordmark | Night, restraint, one object |
| **Hoxton** | A warm flat colour field with huge type and a booking bar | A single warm colour as structure |
| **Freetobook, eviivo** | The small independent hotel's software, bright, product screenshots, "More bookings, more control" | What Chris's buyer already sees from vendors. Competent and plain, so ours has to feel a level above |

### Award level product and story pages (17 rendered)
Linear, Stripe, Vercel, Arc, Apple AirPods Pro, Framer, Notion, Raycast, Pitch, The Pudding, Spotify Wrapped, Granola, Superhuman, Anthropic, Monzo.

| Site | Fingerprint | The move |
|---|---|---|
| **Apple AirPods Pro** | 15 videos, 7 sticky scenes, 68 clip masks, 4,138 style mutations | Pinned scenes, film revealed through masks, one idea per screen |
| **Stripe** | 90 clip masks, 74 running animations | Motion used to explain, a gradient that's the brand |
| **Linear** | 82 running animations, 16 blend modes, 231 SVGs | Product UI drawn in SVG and animated, not screenshotted |
| **Spotify Wrapped** | 150 clip masks, Lottie | Huge type and colour fields, the visitor's own numbers |
| **Pitch** | 5,356 mutations, a WebGL canvas | Scroll scrubbing |
| **Granola** | 63 animations, 6 videos | Calm editorial type plus live UI |
| **The Pudding** | Story chapters, data first | The chart is the argument, sourced on the page |
| **Monzo** | 27 videos, UK voice | Plain British copy over film |

## What makes an AI voice product believable in ten seconds

1. **Sound you can press within the first screen.** Smith.ai, Rosie, ElevenLabs and Vapi all put a play or call button above the fold. Nobody believes a voice from a paragraph.
2. **The transcript moving with the audio.** Smith.ai's lines arrive as they're spoken. Captions in step are proof the audio is the transcript and not a separate claim.
3. **A phone screen.** Rosie's incoming call with Accept and Decline makes it a phone call at a glance.
4. **The visitor picks their situation.** Smith.ai's industry dropdown. For one trade it becomes picking the call (late arrival, rooms, dog, table).
5. **The outcome after the call.** Rosie's "every call summarised, transcribed and recorded". A call that ends with the note the owner actually gets closes the loop.
6. **An honest label next to a live route.** Smith.ai's "This is a recording" box beside "Try the live demo". ExpoCall has the same live route (app.expocall.ai/demo, "Hear Alex call you right now").
7. **Something that moves like sound.** Retell's visualizer, Goodcall's ring, Hume's lines. Ours is ExpoCall's own mark, eight bars, unfolding into the call's real levels.

## What the hotel side adds

- **Film and a few huge words** (Ace, Edition). Night and restraint suit a small hotel at 11pm better than SaaS gradients.
- **Product doing the work, connected systems** (Mews, Canary). ExpoCall's Mews status belongs on the page, in their words.
- **Plain bright vendor pages** (Freetobook, eviivo). This is what Chris's buyers see now, and nobody in the set tells the story of one night.

## Gaps nobody in the set fills

- No voice product shows a hotel's whole night as a timeline of calls. Smith.ai has one call, Rosie has samples, and none put them on a clock.
- No hotel tech page cites the phone's share of bookings, though HOTREC publishes it. Freetobook and eviivo sell bookings without a number.
- Nobody lets a hotelier put in their own numbers for calls after the desk closes.

## So the page will

- Open on a canvas built from ExpoCall's own eight bar mark that unfolds into the waveform of a real playing call (points 1 and 7).
- Prove the phone matters with HOTREC 2026's channel shares for hotels under 30 rooms, sourced on the chart.
- Run one night, 18.00 to 07.00, as a pinned scene with a 20 window hotel front that goes dark with the hour.
- Play four example calls in a phone call screen, with a call timer, levels from the audio, word-by-word captions and Alex's note at the end (points 2 to 5).
- Label the voices as text to speech on the player, then finish on ExpoCall's own recording of Alex, labelled in their words, beside their live demo link (point 6).
- Add a calculator, a Spanish call for the 42 languages, the morning inbox, and the Mews status in their exact wording.

Would it beat Smith.ai for a hotel owner? Smith.ai has one recording and a dropdown. This page has the owner's own night, the calls he actually gets, the note he'd read at seven, the phone's share of his bookings, and his own numbers. That's the test in the final critique pass.
