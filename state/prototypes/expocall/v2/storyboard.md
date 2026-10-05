# ExpoCall hotels page v2, art direction and storyboard (2026-10-05)

Mode: conversion landing page (one buyer decision, sized to Chris's ask, "how your page for hotels would look").
What we promised (3 Oct nudge): "a page where each trade can hear a real call for their business". What he asked (4 Oct): the hotel one. So the centre is HEARING a hotel call.

## Concept sentence (C1)

One night on the desk at a 20 room hotel, told by the reception clock. The page gets darker from six in the evening, sits in the small hours, and turns to morning at seven. Every call is a stamped entry in the night book that you can play, and the only thing moving while the hotel sleeps is Alex's waveform, lifted bar for bar from the ExpoCall mark.

Layers it controls (9): colour (the sky colour is the hour), typography (the clock times are the chapter numbers, set huge in their JetBrains Mono), composition (a clock rail runs down the page), navigation (a fixed clock pill shows the hour of the chapter you're in, hides when idle), interaction (you play the calls), motion (the logo waveform), section transitions (each chapter starts with its time), copy voice (night book entries, short, past tense, times written 23.12), UI demonstration (phone call screen, then the morning inbox).

Brand adjectives, with evidence
- Always on. "24/7/365 inbound" on every trade page compliance strip; homepage "Your business. Available 24/7."
- Human sounding. Homepage "human-sounding inbound receptionists"; demo page "Hear how she effortlessly handles a prospect's questions".
- Plain spoken British. Plumber page voice, "you're finally sat down after a long day of jobs", "the job's already gone".

Anti adjectives: robotic, Silicon Valley, luxury brochure.

Why not generic SaaS or our last three: Qualigraf v4 was paper and ink with a serif, sans and mono trio and agenda numbering. Hire Quality Talent was navy and gold with a magnifier canvas. CustomKit was paper white with condensed athletic type. This page has no serif at all (ExpoCall's own two families only, DM Sans and JetBrains Mono, both read from their CSS), its colour is a sky that changes with the hour, and its hero object is their own mark turned into a live waveform.

## Palette (their colours as light at night)

- night `#060d1f`, their ink `#0a1628`, their homepage navy `#0d1b3e` (rgb 13,27,62)
- their blue `#0d47a1` for primary buttons, lifted to `#4d8dff` for text links on dark
- their teal dot `#00C2A8` is Alex (waveform, live captions, "Alex" labels)
- their amber `#ff7a30` is the lamp at reception and the guest's side of the call
- their paper `#f5f8fa` and line `#e1e8ed` arrive at dawn
- AA checked for every text pair before CSS, and Lighthouse after.

Type: DM Sans (Google Fonts, OFL) for everything that reads, opsz axis for huge statement type at 7 to 10vw with tight tracking. JetBrains Mono (OFL) for clock times, call timers, captions metadata. Both are ExpoCall's own (embed CSS).

## Chapters (each one a different medium, never two the same in a row)

| # | Clock | Heading (a claim) | Medium | Evidence | Visitor after |
|---|---|---|---|---|---|
| 0 | 18.00 | Someone rings reception at eleven at night. Alex picks up. | Signature canvas, the nine bars of the ExpoCall mark sampled from their logo PNG, idling like a breath, playing the late arrival call in sync when pressed | their logo; example call audio | "I can hear it, and it's theirs" |
| 1 | 18.05 | In hotels under 30 rooms, the phone books more nights than the website. | Animated bar chart, channel shares for hotels under 30 rooms | HOTREC European Hotel Distribution Study 2026, annex 4, p174 and p175 (reference year 2025) | "the phone is a real channel" |
| 2 | 18.00 to 07.00 | One night at a 20 room hotel, call by call. | Pinned scroll scene, an SVG hotel front with 20 windows that light and go dark with the hour, a moving clock and night book entries. Static fallback without JS | fictional hotel, labelled once | "the night has a shape" |
| 3 | 18.12 to 23.12 | Four calls from tonight, start to finish. | Phone call screen with real audio (text to speech, labelled), call timer, waveform from the audio's own levels, live captions word by word, then Alex's note | example calls; Live features only (calendar booking, SMS, email) | "it handles my guests" |
| 4 | 01.40 | A family from Madrid rings at twenty to two. Alex answers in Spanish. | Huge "42" built from waveform bars, a short Spanish call with English captions | pricing page "42+ Languages" | "foreign guests covered" |
| 5 | 03.00 | Put your own hotel's numbers in. | Calculator tool, sample defaults labelled, plain arithmetic, OTA commission range from the European Commission study | EC market study 2022, s4.3.2 p101 | "worth it for me" |
| 6 | 07.00 | By seven, every call from the night is waiting as a summary. | Dawn. Photograph (licensed, credited, decorative) with an inbox UI of the night's call summaries landing one by one | pricing page "Call Summaries", "Call Transcripts", "Email Notifications" | "my morning is easier" |
| 7 | 07.30 | Mews is next. | Connection diagram, Live integrations lit, Mews dashed with their status "Launching shortly" | /integrations wording verbatim | "it fits my systems" |
| 8 | end | That was an example voice. This is Alex. | Their real recording, labelled in their own words, then plan pointer, the three real CTAs, compliance strip | demo page label; pricing page; homepage CTAs | "book the walkthrough" |

Pace: immersive hero, compressed proof (chart), slow pinned night, close detail (calls), surprise (Spanish), participation (calculator), quiet dawn, practical (Mews), ending stack.

## Ending (E8)

Trust (the real recording), fit (Professional plan "For hospitality"), practical (600 calls, four concurrent), risk (UK compliance strip), next step (Book a System Walkthrough), a secondary route for someone not ready (Test the Voice Agent, Alex calls you; or ring 0800 11 26 486).

## Truth rules carried

- Quillmarsh House is fictional (web searched, no hotel uses it), labelled once in the night chapter. Calls carry an "Example call" chip.
- Synthetic voices are said to be synthetic, on the player itself. ExpoCall's own recording is labelled with the words on their demo page.
- No LIVE badge on anything scripted. No prices or rates for the fictional hotel's rooms. Nothing from /hotelcallscoringexample.
- Mews uses the /integrations wording, not the homepage's "Native Mews Integration".
- noindex stays.
