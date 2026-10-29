# Notes WOW: what the best sites do over time (intro, cursor, scroll)

Run date **28 Oct 2026**. Every claim below comes from frames I captured and looked at, or from counters read at runtime in a real Chrome on the real GPU. Times are milliseconds after navigation commit. Scroll points are wheel distance in px at 1440x900 (one viewport is 900). Where a number is my visual estimate rather than a DOM measurement, it says "≈ (visual)".

This builds on `notes-17A-top50.md`, which holds the static first-screen fingerprints. This file is about **motion over time**.

---

## 1. Counts (read this first)

- **28 sites attempted:** 12 from the top-50 list, plus 16 new ones found today on awwwards.com and thefwa.com.
- **23 rendered at both 1440x900 and 390x844:** all 12 from the top-50 list and 11 of the 16 new ones.
- **5 did not render.** All 5 were new; none was an age gate. Nothing was entered or bypassed.
  - **Spylt Milk** (Tubik, SOTD 14 Mar 2025): `spylt.com` redirects to `spylt.com/password`, a closed Shopify storefront. That counts as walled.
  - **Eislab** (Huy Phan, SOTD 25 May 2025, FWA of the Day 18 Feb 2025): the server answers 308 to itself on `/`, `/en` and `/en-us`, which gives ERR_TOO_MANY_REDIRECTS. The site is broken.
  - **Bored Cow** (Manufactur, SOTD 12 Apr 2024): `tryboredcow.com` now serves an unrelated Dutch online-casino page. The domain has lapsed and the brand site is gone.
  - **Death Chef** (Studio Freight, SOTD 3 Jan 2024, FWA of the Day 28 Jan 2023): `lunchbox.studiofreight.com/game` redirects to `studiofreight.com/game`, which is a 404.
  - **Moooor** (ET Studio, SOTD 29 Jan 2025): HTTP 500 "Unexpected Server Error" at both sizes.
- **Age gates: 0 of the 28.** The alcohol sites from the top-50 list were deliberately left out.
- **Intro buttons clicked: 2.**
  - Planetoño "START" landed on the second run. The first run clicked before the button was live, so that run saw only the loader.
  - Red Riding Hood's Quest "Start the story".
  - No links, forms or log-ins were touched.
- **Consent:** declined on Ponpon Mania ("decline") and Activehop ("DECLINE"). Koffiracha's banner was hidden with CSS. The other sites showed no banner, or only a small corner widget that was left in place.
- **Promo popup:** Mate Libre's "Get 10% off your first order" newsletter modal appears about 10 s in. It was closed with its own "I'm good for now" button. No email was entered.
- **Award level:** all 23 rendered sites are Awwwards Site of the Day or higher.
  - Site of the Year: Lusion 2023, Igloo Inc 2024, Lando Norris 2025, from the top-50 notes.
  - Site of the Month: Oryzo (Apr 2026), Zentry (Aug 2024).
  - FWA of the Day confirmed on 8 case pages I rendered today, listed in the table.
- **Award pages checked today** are listed in section 3. FWA slugs that returned 404 are not claimed:
  - `gelato-la-boca`, `koffiracha`, `tripletta-pizza`, `tripletta`, `grab-go`, `activehop`, `more-nutrition`, `spylt`, `spylt-milk`, `eis-lab`, `bored-cow`, `mana`.

## 2. How the run worked

- **Script:** `C:\Users\RifqiRakamulya\Documents\Astra\charlie\_tools\research-wow\wow-capture.js`, using Node 24 and playwright-core.
- **Browser:** installed Chrome, headless, with `--use-angle=d3d11 --ignore-gpu-blocklist --enable-gpu`. The renderer logged as "ANGLE (Intel, Intel(R) Arc(TM) 130V GPU) Direct3D11", so WebGL rendered properly.
  - Sites ran one at a time, so intro timings are not distorted by other pages. CIAO was re-run alone after an overlap, and the earlier run is discarded.
- **Screenshots:** CDP `Page.captureScreenshot` (JPEG), with the clip offset by the visual viewport. CDP clips are in document coordinates, so a fixed clip goes blank once the page scrolls; my first attempt did exactly that and was redone.
- **Passes per site:**
  - **INTRO, 1440:** a frame every 250 ms for 6 s after commit, 24 or 25 frames. Frames are labelled with the real ms.
  - **INTRO, 390x844** (isMobile, hasTouch, DPR 2): a frame every 500 ms for 4 s.
  - **Consent and intro button:** after the intro, consent was rejected or hidden, and a whitelisted intro button ("start", "enter", "start the story", …) was clicked if one was present. For Planetoño and Red Riding Hood, 3 s of frames after the click are in `-click.png`.
  - **CURSOR:** the mouse moves in a slow arc, from lower-left over the top to lower-right, in 6 legs of 12 sub-steps at 40 ms. One frame per leg.
    - Each frame is labelled with Δ, the mean pixel change from the first cursor frame.
    - Δ also includes autoplaying video, so it was read against the frames themselves.
  - **SCROLL:** a 120 px wheel step every 60 ms, through 8 viewports (7,200 px).
    - Every 450 px (half a viewport) the script waits 200 ms, samples the runtime counters and captures a frame.
    - Frames are labelled with wheel distance and the real scrollY. scrollY stays 0 on virtual-scroll (WebGL) sites.
    - It then wheels fast to the end of the page to count every picture.
- **Runtime counters:**
  - WebGL contexts (getContext hooked before page scripts) and their viewport coverage at every scroll sample.
  - `__THREE__`, `gsapVersions` / `window.gsap`, `ScrollTrigger.getAll()` (pins, scrub), a Lenis instance with its options, and the `lenis` class on html.
  - Split-text spans (4 or more single-character or single-word spans in one parent) and how many carried inline transform/opacity styles at a sample.
  - Unique clip-path elements, and how many changed value between samples ("animated").
  - Masks and blend modes.
  - Distinct `<img>` of 150 px or more, CSS background images of 120 px or more, `<video>`, and network image requests.
  - AudioContext / `new Audio()` and audio file requests.
  - Page-transition libraries: Barba, Swup, Taxi, Highway.
  - `document.getAnimations()` tallies and computed `transition-timing-function` across the whole DOM.
  - Ease strings, durations and `lerp` values grepped from the JS and CSS bodies.
- **Strips:** `build-strips.js` (sharp). Each frame is downscaled to 360 px wide with a label bar, in one horizontal strip per pass.
  - Review grids (6 columns) are in `review\`.
  - All strips and grids were opened and read by me before writing section 4.

---

## 3. Per-site table

**Legend:**

- **GL:** WebGL contexts / mean share of the viewport covered by a GL canvas during the scroll pass.
- **Pin/stk:** GSAP pin-spacers / sticky elements held for more than one viewport.
- **Pics:** distinct DOM images ≥150 px (+ CSS backgrounds) / videos / network image requests.
- **Split:** split spans found (animated).
- **Clip:** clip-path elements (animated).
- **Type:** the largest visible headline, px and % of viewport width. "≈" means a visual estimate where the type sits in canvas, WebGL or SVG.
- **Ease:** the dominant measured curve, from computed CSS, runtime GSAP tweens or the bundle.

| # | Site (URL) | Award pages checked | GL · three | Motion libs (runtime / bundle) | Pin / stk | Pics img / vid / net | Split (anim) | Clip (anim) · mask · blend | Cursor · sound · page transitions | Hero type 1440 (390) | Ease, measured |
|---|---|---|---|---|---|---|---|---|---|---|---|
| w01 | [CIAO Energy](https://www.ciaoenergy.com/) | [Awwwards SOTD 30 Jul 2026](https://www.awwwards.com/sites/ciao-energy-launch-website) | 1 / 100% · r161 | GSAP 3.15 global, ScrollTrigger (14), Lenis lerp 0.1, SplitText | 0 / 0 (fixed GL stage) | 0 / 7 / 18 | 462 (418) | 0 · 1 · screen 2 | none · AudioContext 1, 4 audio files · — | DOM 14 px; "ZERO BULLSHIT" ≈200 px ≈14vw (visual) | GSAP: 0.5 s power2.inOut ×50; 0.63–0.86 s power3.out staggers |
| w02 | [/zeroz (Otsuka)](https://otsuka-air.jp/) | [Awwwards SOTD 24 Aug 2026](https://www.awwwards.com/sites/zeroz-brand-site) | 1 / 100% · r164 | GSAP 3.14, ScrollTrigger, Lenis lerp 0.1 duration 1.2, Barba, CustomEase | 0 / 12 | 42 / 4 / 193 | 0 | 21 (7) · 6 · — | none · none · Barba | ≈70 px ≈5vw (canvas) | CSS cubic-bezier(0.3,0.26,0.38,1) at 300/500 ms (151 + 143 + 69 transitions) |
| w03 | [Crav Burgers](https://www.cravburgers.shop/) | [Awwwards SOTD 13 Jun 2026](https://www.awwwards.com/sites/crav-burgers) | 0 · — | GSAP 3.15, ScrollTrigger, Lenis, MorphSVG | 0 / 0 | 25 / 0 / 10 | 4 (4) | 16 (8) inset+polygon · 0 · overlay 1 | small follower dot seen (cursor not hidden) · none · — | **432 px = 30vw** Mouse Memoirs (39 px = 10vw) | CSS overshoot cubic-bezier(0.45,0.85,0.34,1.12); GSAP sine.inOut / power2.out, 0.5 / 1 / 0.4 / 0.75 s |
| w04 | [Don Molinico](https://www.donmolinico.es/) | [Awwwards SOTD 25 Apr 2026](https://www.awwwards.com/sites/don-molinico) | 0 · — | GSAP 3.11, ScrollTrigger, Lenis | 0 / 2 | 7 / 0 / 10 | 0 | **228 (224 inset wrappers)** · 0 · — | none · none · — | **216 px = 15vw** condensed (≈70 px ≈18vw) | **transform 1250 ms cubic-bezier(0.19,1,0.22,1) ×397 running** |
| w05 | [Planetoño](https://www.planetono.space) | [Awwwards SOTD 14 Mar 2026](https://www.awwwards.com/sites/planetono) | 2 / 88% · (three in bundle) | GSAP 3.13, ScrollTrigger, Lenis (lerp 0.075/0.1 in bundle), Rive, Lottie, Flip | 0 / 0 | 2 / 0 / 5 (+5 GLB) | 4 (4) | 7 · 1 · — | **custom rocket cursor (cursor: none in all 6 frames)** · AudioContext 2, 11 audio files · — | 60 px 4.2vw (29 px 7.5vw) | CSS 550 ms cubic-bezier(0.25,1,0.5,1); elastic.out(1,1) |
| w06 | [Savor](https://savor.it/) | [Awwwards SOTD 10 Sep 2025](https://www.awwwards.com/sites/savor) | 2 / 100% · — | GSAP 3.12, ScrollTrigger, Lenis, SplitText, DrawSVG, CustomEase, Rive (4) | 0 / 2 | 24 / 3 / 31 | 211 (211) | 18 (9) inset · 2 · — | none · Sound On/Off toggle · — | ≈90 px ≈6vw serif (visual) | transform 0.8 s cubic-bezier(0,0,0,1); power2.out / sine.out |
| w07 | [Ponpon Mania](https://ponpon-mania.com/) | [Awwwards SOTD 22 Oct 2025](https://www.awwwards.com/sites/ponpon-mania) | 6 / 100% · — | GSAP 3.13, ScrollTrigger, Matter.js, SplitText, fluid shader | virtual scroll | 0 / 0 / 0 (177 KTX2) | 0 | 0 · 0 · — | none · none · — | illustration-led (35 px UI) | elastic.out(1.1,0.8), power2.out; 1 s and 0.3 s dominate |
| w08 | [Oryzo AI](https://oryzo.ai) | [Awwwards SOTD 13 Apr 2026, SOTM Apr 2026](https://www.awwwards.com/sites/oryzo-ai) | 2 / 100% · r178 (Lusion mod) | GSAP, SplitText, Rive (4), SDF smin, fluid | 0 / 2 | 31 / 2 / 127 | **1,550 (592)** | 0 · 1 · — | none · none · — | wordmark 123 px 8.5vw | overshoots cubic-bezier(0.18,0.89,0.32,1.2), (0.34,1.2,0.64,1) |
| w09 | [Lusion](https://lusion.co/) | [Awwwards SOTD 2 Oct 2023 / SOTY 2023](https://www.awwwards.com/sites/lusion-v3), [FWA](https://thefwa.com/cases/lusion-v3) | 1 / 100% · r158 | SplitText, fluid (no GSAP) | virtual scroll | 0 / 0 / 50 | 669 (60) | 0 · 0 · exclusion 1 | **pile pushed by cursor, Δ 48.5 (largest)** · 16 audio files + MUTE · — | loader counter 115 px 8vw; headline 36 px | transform 0.4 s cubic-bezier(0.4,0,0.1,1) / (0.35,0,0,1) |
| w10 | [Igloo Inc](https://www.igloo.inc/) | [Awwwards SOTD 23 Jul 2024 / SOTY 2024](https://www.awwwards.com/sites/igloo-inc), [FWA](https://thefwa.com/cases/igloo-inc) | 2 / 100% · r165 | GSAP 3.12, ScrollTrigger, CustomEase, fluid | virtual scroll | 0 / 0 / 49 (20 GLB, 45 KTX2) | 0 | 0 · 0 · — | WebGL parallax Δ 15 · AudioContext 1, 18 audio files · — | no DOM type (0 words) | GSAP none (scrubbed), sine.out; 2 / 3 / 7.5 s for camera moves |
| w11 | [Lando Norris](https://landonorris.com/) | [Awwwards SOTD 17 Nov 2025 / SOTY 2025](https://www.awwwards.com/sites/lando-norris), [FWA](https://thefwa.com/cases/lando-norris) | 3 / 100% · r174 | GSAP 3.13, ScrollTrigger, Lenis lerp 0.1, SplitText, Rive (8), Taxi | 0 / 3 | 42+1 / 0 / 68 | 300 (61) | **208 (86)** inset 155 / ellipse 31 / polygon 22 · 17 · saturation 5, plus-lighter 5, difference 1 | none · none · Taxi | portrait-led; h1 38 px; serif marquee ≈150 px (visual) | **750 ms cubic-bezier(0.65,0.05,0,1)** on 48 opacity + 32 transform; elastic.out(1,0.75) |
| w12 | [Zentry](https://zentry.com/) | [Awwwards SOTD 28 Aug 2024 / SOTM](https://www.awwwards.com/sites/zentry), [FWA](https://thefwa.com/cases/zentry) | 3 / 51% · r163 | GSAP 3.13, ScrollTrigger **41 triggers all scrub: true**, Lenis, SplitText, Spline, Rapier, Rive | 0 / 3 | 6 / 16 / 20 | 9 (9) | 14 (4) path() · 0 · — | WebGL Δ 12 · AudioContext 2 · — | **180 px = 12.5vw** | power4.out / power3.out / expo.out, 0.8–1.2 s; transform 0.6 s cubic-bezier(0.19,1,0.22,1) |
| w14 | [Gelato La Boca](https://gelatolaboca.com/) | [Awwwards SOTD 2 Nov 2024](https://www.awwwards.com/sites/gelato-la-boca) · FWA slug 404 | 0 · — | GSAP 3.12 global, ScrollTrigger (21; **scrub 1.5 / 1.2 / 0.8** + true), MorphSVG, Matter.js, SplitText | **3 pins** / 0 | **164** / 1 / 166 | 14 | 27 (15) · 0 · — | none · none · — | **177 px = 12.3vw** (67 px = 17.2vw) | scrubbed tweens ease none 1 s; 0.64–0.76 s; CSS spins 10 / 15 / 25 s linear |
| w17 | [Mana Yerba Mate](https://en.manayerbamate.com/) | [Awwwards SOTD 13 Mar 2023 + Dev 7.8 (Animations 9.2)](https://www.awwwards.com/sites/mana-yerba-mate); card shows a SOTY badge, but the page lists only SOTD + Dev, so SOTY is not claimed · [FWA of the Day 6 Apr 2023](https://thefwa.com/cases/mana-yerba-mate) | 2 / 22% · r141 | GSAP 3.10, ScrollTrigger, Lenis, Lottie, MorphSVG | 1 / 0 | 30 / 0 / 39 | 31 (20) | 133 SVG-url (5) · **39** · — | none · none · — | intro headline ≈110 px ≈7.6vw (65 px = 16.7vw) | **300 ms cubic-bezier(0.65,0,0.09,1.38)** (overshoot); power4.inOut 0.6–1 s |
| w18 | [Hungry Tiger](https://www.eathungrytiger.com/) | [Awwwards SOTD 9 Aug 2025](https://www.awwwards.com/sites/hungry-tiger) · [FWA of the Day 27 Jun 2025](https://thefwa.com/cases/hungry-tiger) | 0 (3 × 2D canvas) · — | GSAP 3.11 global, ScrollTrigger **11, all scrub: true**, SplitText, Lenis, Lottie | 0 / 1 | 9+4 / 0 / 25 | 143 | 0 · 2 · overlay, multiply, difference 2 | none · none · — | **213 px = 14.8vw** Salmond (55 px = 14.1vw) | GSAP power1.out staggers 0.6 / 1 / 1.4 / 1.8 / 2.2 s; bundle cubic-bezier(0.19,1,0.22,1) |
| w19 | [Organimo](https://www.organimo.com/) (Unseen) | [Awwwards SOTD 5 Apr 2024](https://www.awwwards.com/sites/organimo) · [FWA of the Day 23 Mar 2024](https://thefwa.com/cases/organimo) | 1 / 100% · r151 | GSAP 3.11, ScrollTrigger, Lenis, SplitText, Taxi, CustomEase | virtual scroll | 7 / 0 / 27 (36 GLB, 73 KTX2) | 15 | 0 · 4 · hard-light 1 | WebGL parallax Δ 23 · AudioContext 2, "click anywhere to enable audio" · Taxi | ≈100 px ≈7vw serif (visual) | transform **2000 ms cubic-bezier(0.075,0.82,0.165,1)** ×60 |
| w20 | [Little Red Riding Hood's Quest](https://ai-quest.lusion.co/) (Lusion) | [Awwwards SOTD 5 Jul 2023](https://www.awwwards.com/sites/little-red-riding-hoods-quest) · [FWA of the Day 26 Jun 2023](https://thefwa.com/cases/little-red-riding-hoods-quest) | 2 / 100% · r148 | Rive (3), Lottie, fluid (no GSAP) | click-driven | 1+1 / 0 / 106 | 0 | 23 SVG-url · 4 · — | none · AudioContext 1, 23 audio files · — | illustrated title lockup | 500 ms cubic-bezier(0.33,1,0.68,1); 4 s / 6 s ambient |
| w21 | [Koffiracha](https://www.koffiracha.com/) | [Awwwards SOTD 20 Dec 2024](https://www.awwwards.com/sites/koffiracha) · FWA slug 404 | 0 (9 × 2D canvas) · — | GSAP 3.12, ScrollTrigger, SplitText, Flip, Barba, Lottie | 0 / 1 | 14+1 / 2 / **616 (613 over 30 KB = frame sequence)** | 0 | 0 · 5 · — | none · none · Barba | **≈260 px ≈18vw** (h1 260 px) | power2.out / power4.out; **elastic(0.3,0.5), back.out(1.5)**; 0.5 / 1.5 / 2 s |
| w22 | [Mate Libre](https://matelibre.com/) (Locomotive) | [Awwwards SOTD 3 Oct 2023](https://www.awwwards.com/sites/mate-libre) · [FWA of the Day 12 Oct 2023](https://thefwa.com/cases/mate-libre) | 0 · — | GSAP 3.15, ScrollTrigger, Lenis, SplitText | 0 / 5 | 17 / 0 / 20 | 0 | 41 (**29**) inset 25 / polygon 16 · 0 · — | hero slideshow (Δ is autoplay) · none · — | 86 px 6vw (48 px 12.3vw) | **600 ms cubic-bezier(0.38,0.005,0.215,1)** ×55 |
| w25 | [Tripletta Pizza](https://www.triplettapizza.com/) | [Awwwards SOTD 4 Apr 2025](https://www.awwwards.com/sites/tripletta-pizza) · FWA slugs 404 | 0 · — | GSAP 3.12, ScrollTrigger, Lenis, Lottie, Barba | 0 / 0 (infinite loop scroll) | 19 / 0 / 20 | 0 | 9 SVG-url · 0 · multiply 4 | none · none · Barba | **≈270 px ≈18.8vw** wordmark; loader city names ≈130 px | **250 ms cubic-bezier(0.585,0.001,0.25,1)**; power2.inOut |
| w26 | [Grab & Go](https://grabandgo.pt/) | [Awwwards SOTD 5 Mar 2024](https://www.awwwards.com/sites/grab-go) · [FWA of the Day 9 Mar 2024](https://thefwa.com/cases/grabgo) | 4 / 100% · r160 | GSAP 3.15, ScrollTrigger, Lenis lerp 0.1, Matter.js, Rive (11), Lottie | 2 pins / 0 | **276** / 4 / 352 | 0 | 23 SVG-url · **305** · screen 3 | none · AudioContext 1, 11 audio files · — | 72 px 5vw (59 px 15.1vw) | **1 s cubic-bezier(0.075,0.82,0.165,1)** ×669 transforms |
| w27 | [Activehop](https://www.active-hop.com/) | [Awwwards SOTD 1 Oct 2025](https://www.awwwards.com/sites/activehop) · FWA slug 404 | 3 / 100% · r172 (R3F) | GSAP 3.13, ScrollTrigger, Lenis | 0 / **7** | 8 / 0 / 13 | 7 | 0 · 0 · — | none · none · — | no headline (3D bottle) | color 300 ms cubic-bezier(0.4,0,0.2,1); marquees 50 s linear |
| w28 | [MORE Nutrition](https://more-nutrition.webflow.io/) | [Awwwards SOTD 3 Nov 2025](https://www.awwwards.com/sites/more-nutrition) · FWA slug 404 | 0 (4 × 2D canvas) · — | GSAP 3.15 global, ScrollTrigger (19; scrub true / 0.7), SplitText, DrawSVG, CustomEase, Lenis (lerp 0.18 in bundle) | 0 / 1 | 20+1 / 3 / 245 (229 over 30 KB = sequence) | 4 (4) | 1 · 0 · color-burn 1 | none · Sound on/off toggle · — | 112 px 7.8vw; "More" wordmark ≈300 px (visual) | 350 ms cubic-bezier(0.72,0.17,0.17,1); **CSS linear() spring 950 ms, peak 1.142** |
| ✗ | [Spylt Milk](https://www.spylt.com/) | [Awwwards SOTD 14 Mar 2025](https://www.awwwards.com/sites/spylt-milk) | — | WALLED: Shopify `/password` | | | | | | | |
| ✗ | [Eislab](https://eis-lab.de/en-us) | [Awwwards SOTD 25 May 2025](https://www.awwwards.com/sites/eislab) · [FWA of the Day 18 Feb 2025](https://thefwa.com/cases/eislab) | — | BROKEN: 308 redirect loop | | | | | | | |
| ✗ | [Bored Cow](https://tryboredcow.com/) | [Awwwards SOTD 12 Apr 2024](https://www.awwwards.com/sites/bored-cow-2) | — | GONE: domain now serves an unrelated casino page | | | | | | | |
| ✗ | [Death Chef](https://lunchbox.studiofreight.com/game) | [Awwwards SOTD 3 Jan 2024](https://www.awwwards.com/sites/death-chef) · [FWA of the Day 28 Jan 2023](https://thefwa.com/cases/death-chef) | — | GONE: 404 | | | | | | | |
| ✗ | [Moooor](https://www.moooor.com/) | [Awwwards SOTD 29 Jan 2025](https://www.awwwards.com/sites/moooor) | — | BROKEN: HTTP 500 | | | | | | | |

**Other award pages read to find candidates:**

- Awwwards studio profiles:
  - [Lusion](https://www.awwwards.com/lusion/), [Resn](https://www.awwwards.com/resn/), [Immersive Garden](https://www.awwwards.com/immersivegarden/), [14islands](https://www.awwwards.com/14islands/)
  - [Locomotive](https://www.awwwards.com/locomotive/), [Hello Monday](https://www.awwwards.com/hellomonday/), [Dogstudio](https://www.awwwards.com/dogstudio/), [Studio Freight](https://www.awwwards.com/studiofreight/)
  - [Tubik](https://www.awwwards.com/tubik/), [ToyFight](https://www.awwwards.com/toyfight/)
  - The Active Theory, Unseen, Abeto and Darkroom profile slugs returned no site cards.
- The [Food & Drink archive](https://www.awwwards.com/websites/food-drink/) pages 1–70.
- Awwwards search for: ice cream, candy, chocolate, dessert, cookie, bakery, gelato, donut, toy, waffle, cereal, soda, snack, sweets, cake, pastry, juice, milk, lemonade, popcorn, pizza.

**Fresh food SOTDs found but out of the 2023–26 window or not chosen:**

- Out of the window: J Dilla's Donuts (2021), Cream Co. (2018), Kerrygold Magical Pantry (2022), Mr Pops (2022), Unreal Mission chocolates (2017).
- Not chosen: Lusion's My Little Storybook (2021), 14islands Blob Mixer (2021).

**Studios reached through client work in the set:**

- Lusion: Oryzo, Red Riding Hood, plus Lusion's own site.
- Resn: Savor, Zentry.
- Unseen: Organimo.
- Locomotive: Mate Libre.
- Abeto: Igloo.
- Studio Freight: Death Chef (gone).
- Immersive Garden, 14islands, Hello Monday and Dogstudio have no food or playful client work in 2023–26 on their profiles. Their own sites are in the top-50 notes.

### Phone (390x844, first 4 s)

Contact sheet: `C:\Users\RifqiRakamulya\Documents\Astra\charlie\_research\wow\review\phone-4s-sheet.png`.

- **Hero visible at 4 s on 8 of 23:** Ponpon, Oryzo, Gelato La Boca, Hungry Tiger, Koffiracha, Mate Libre, Igloo, /zeroz.
- **Still in a branded loader or a kinetic intro at 4 s on 15 of 23:**
  - CIAO (logo at 40%), Crav (wipe starting), Don Molinico (logo panel), Planetoño (wordmark), Savor (flat butter yellow), Lusion (bar).
  - Lando (flat lime), Zentry (Z mark), Mana (headline typing), Organimo (counter), Red Riding Hood ("Once upon a time").
  - Tripletta ("PARIS"), Grab & Go (logo), Activehop (consent sheet over the frost), MORE (flat sage).
- **The phone keeps the same intro choreography,** scaled; none of the 23 swaps it for a different one.
  - What gets cut on the phone is WebGL: Grab & Go drops from 4 contexts to 0, Zentry and Activehop from 3 to 1, Mana from 2 to 1.
- **Display type gets relatively larger on the phone,** 12–18vw: Gelato 17.2vw, Mana 16.7vw, Grab & Go 15.1vw, Hungry Tiger 14.1vw, Mate Libre 12.3vw, Crav 10vw.

---

## 4. Per-site WOW moment (seen in the strips)

Strip files live in `C:\Users\RifqiRakamulya\Documents\Astra\charlie\_research\wow\`:

- `<id>-<slug>-1440-intro.png`, `-1440-cursor.png`, `-1440-scroll.png`, `-390-intro.png`
- `-1440-click.png` for Planetoño and Red Riding Hood

- **w01 CIAO Energy**
  - **WOW** at wheel 960–1800: the camera pushes from a line-up of floating cans under a halo light into one can.
    - The can rotates and is held through four feature chapters, with an icon index down the right.
    - It ends at wheel 6840–7200 in violet fog, with "ZERO BULLSHIT" set behind the can.
  - **Built:** one fixed full-bleed three.js canvas (GLB cans, clearcoat + sheen), camera driven by scroll, Lenis lerp 0.1, and GSAP power3.out 0.63–0.86 s staggers on 418 split spans.
  - **Intro:** the chrome logo fills with light as a loader for more than 6 s.
- **w02 /zeroz**
  - **WOW** at about 12 s, on the first scroll, while the page holds scrollY at 0 for 960 px of wheel: one glowing orb blooms into a white-green flash, which reveals the pack floating in a green-lit 3D room.
  - The orb then stays as a white disc behind copy that changes on scroll, across 12 sticky scenes.
  - **Intro:** black for the full 6 s (FCP 10.8 s), the slowest in the set.
- **w03 Crav Burgers**
  - **WOW** at 0.26–6.0 s: the loader builds a cartoon burger layer by layer.
    - Status lines change about every 250–500 ms ("Toasting the artisan bun…", "Searing the glazed patty…", "Ready to crav!") over a yellow progress bar.
    - Three curved bands (red, orange, maroon) sweep up at 4.0–4.5 s.
    - "THE BURGER" lands at 432 px (30vw) at 5.25 s.
    - The real burger photo rises between the letters with cartoon eyes and a "CRAV" sticker by 6.0 s.
  - **Built:** DOM/SVG with GSAP, no WebGL. Scroll adds wavy section edges and a full-bleed macro of hands holding the burger.
- **w04 Don Molinico**
  - **WOW** at 3.0–5.5 s: a red brand panel holds the logo (3.26–4.75 s), then shrinks into the nav logo tab while a full-bleed overhead table photo and the 216 px headline rise out of masks.
  - **Built:** 224 `inset()` clip wrappers whose children translate with CSS `transform 1250ms cubic-bezier(0.19,1,0.22,1)`.
- **w05 Planetoño**
  - **WOW** after START at +0–1.5 s: the red screen collapses into an oval portal on yellow, the tray with the mascot, burger and fries slides out of it, and a "GALAXY BITE" burst pops.
  - **Then** at wheel 1440–6360, "How it works" builds the meal in 4 steps with a 1-2-3-4 pill: the burger layers fall into a stack, fries, donut and toy drop in, and a takeaway box folds shut.
  - **Built:** WebGL toon GLBs, Rive and sound.
- **w06 Savor**
  - **WOW** at 2.75–4.5 s: a butter-yellow curtain lifts on a macro film of a brush glazing brioche while "Feel good fats from scratch" rises letter by letter.
  - **On scroll** (wheel 480–2280): the hero shrinks into an oval window in cream, which opens into full-bleed butter macro.
  - A thin hand-drawn line, with a butter droplet riding it, then leads the eye down through oil, tree rings and forest.
  - **Built:** DrawSVG + SplitText (211 spans) over video.
- **w07 Ponpon Mania**
  - **WOW** at 4.2–4.8 s: the blinking mascot-face loader shrinks to a dot, the screen floods periwinkle, and the mascot's silhouette comes back as a window that grows into a starburst frame showing the whole illustrated scene.
  - Wheel input then drops physics balls and balloons into the scene (Matter.js, 6 WebGL canvases).
- **w08 Oryzo AI**
  - **WOW** at 5.5–5.65 s: a CAD blueprint of the coaster snaps into the photoreal product on a cutting mat. The blueprint has construction lines and a radial progress ring from 2.4 to 4.5 s.
  - **Then** at wheel 480–2760, the coaster flies off the mat and spins edge-on in a dark void.
- **w09 Lusion**
  - **WOW** on the first mouse move after the odometer % loader: a rounded card of glossy 3D shapes is shoved around by the cursor (Δ 48.5, the largest in the set).
  - **On scroll,** a blue 3D ribbon snakes through the sections and the reel plane bends.
- **w10 Igloo Inc**
  - **WOW** at wheel 480–1440: the igloo's ice bricks lift apart and float (an exploded view), and the camera flies through cloud with chromatic aberration.
  - At wheel 4560–7200 the ice re-forms into a glowing logo ring.
  - **Loader:** a hairline bar on grey for more than 6 s.
- **w11 Lando Norris**
  - **WOW** at 3.40–3.79 s: his race number "4" appears tiny with his portrait inside, and scales past the screen in about 390 ms.
  - At 5–6 s a 3D helmet visor sweeps across his face.
  - **On scroll:** the portrait shrinks into a card inside a giant serif marquee, a lime signature scribbles itself over it, and pixel-step lime blocks wipe the headlines in.
- **w12 Zentry**
  - **WOW** on the first scroll (wheel 0–960): a skewed violet polygon window unfolds to full screen around an iridescent WebGL form with 180 px "REDEFINE REALITY".
  - A tilted 3D card holding a hand-and-orb video then flattens to full width.
  - **Built:** 41 ScrollTriggers, all `scrub: true`.
- **w14 Gelato La Boca**
  - **WOW** at 5.5 s: a hard cut from an outlined headline to cobalt blue, with 12 overhead gelato tubs in a ring around "IT'S GELATO TIME!" (177 px) and an Order Now pill in the middle.
  - **At wheel 960–2760:** a script "New" writes itself, 3D-shadow "FLAVOR" slams up, and a toy taxi drives in carrying a tub (3 GSAP pins, scrub 0.8–1.5).
- **w17 Mana Yerba Mate**
  - **WOW** at 1.5–5.0 s: "INFUSED OF BIO ENERGY" types letter by letter, each letter flashing a brand colour before it settles black.
  - Green bubbles grow and merge to flood the screen (4.25–4.75 s), the can drops in (5.0 s), and illustrated flowers, a sun and a character pop round it (6.6 s).
  - **At wheel 480–3240:** the can tumbles down into the next section and lands open, with fizz bubbles.
- **w18 Hungry Tiger**
  - **WOW** at wheel 960–7200: a photographic jar turns through every angle as you scroll ("A new angle of flavor", "Unwrap the adventure"). At the end it tips over and the sauce pours out.
  - **Built:** a 2D-canvas frame sequence on 11 scrubbed ScrollTriggers. There is no loader; the 213 px headline is there from first paint.
- **w19 Organimo**
  - **WOW** at wheel 1440–3240: the camera dives past the rock holding the 3D jar into pink cloud.
  - It comes out in a pastel sea of floating columns, shells, goldfish and bubbles.
  - **Loader:** a gold line triangle and a counter, still showing at 8.5 s.
- **w20 Little Red Riding Hood's Quest**
  - **WOW** at 4.75–6.0 s: "Once upon a time…" types in, then the storybook title assembles glyph by glyph.
  - **After "Start the story"** (+0.75–4.5 s): the painted scene fades in greyscale, and the red cloak floods with colour first.
- **w21 Koffiracha**
  - **WOW** at 0.5–1.5 s: type about twice the viewport ("TANGY") zooms out to fit "SPICY TANGY SWEET", while the bottle flies in diagonally and lands across it.
  - **On scroll,** the bottle rides through every section: a wall of "POUR POUR POUR", then "HOT COUPLE HOTTER SAUCE". It is a 613-frame image sequence on canvas.
- **w22 Mate Libre**
  - **WOW** at 0.5–1.25 s: from black, the headline rises out of a mask and the full-bleed still-life photo fades up, settled by 1.25 s. The slideshow wipes horizontally at 5.75 s.
  - **On scroll:** the hero shrinks into a rounded card, and a bonsai photo opens like two doors (wheel 5040–5880).
- **w25 Tripletta Pizza**
  - **WOW** at 2.0–3.75 s: city names cut every ~250 ms, each on its own full-screen colour (Paris green, Marseille orange, Lyon, Toulouse red, Rennes blue, Lille, Versailles, Bordeaux), landing on "Montrouge".
  - The red panel then lifts (4.5–5.0 s) onto the flaming-hair mascot between giant TRIPLETTA type.
  - The scroll loops forever and recolours on each lap (scrollY jumps from 5,375 back to 442).
- **w26 Grab & Go**
  - **WOW** at 5.75–6.0 s: the orange panel slides away to reveal an illustrated street with the Grab & Go shop under a **striped awning**.
  - **Then** a 3D paper cup tumbles out of the shop into the next section.
  - At wheel 6840–7200 the page ends with a physics pile of branded cups behind the CTA.
- **w27 Activehop**
  - **WOW** at 4.5–5.0 s: a frosted-glass loader panel shrinks into the frosted nav pill.
  - **At wheel 1440–5880:** the 3D bottle stays pinned while rows of flavour words (DROP / TRAIL / RAD) slide past in opposite directions, and the bottle's label swaps colour per flavour.
- **w28 MORE Nutrition**
  - **WOW** at 5.0–5.75 s: the "More" wordmark writes itself stroke by stroke.
  - **At wheel 480–960:** curved ribbons of "IT'S A MATCH(A)" text sweep across the screen, and the tub travels and turns between benefit cards (an image sequence).

---

## 5. What the time-based numbers say

### The first 3 seconds (1440, cold cache, this connection)

- **What is on screen at 3.0 s:**
  - Branded loader motion: 12 of 23 (CIAO, Crav, Don Molinico, Ponpon, Oryzo, Lusion, Lando, Mana, Organimo, Red Riding Hood, Tripletta, Activehop).
  - A flat or blank screen: 7 of 23 (zeroz, Igloo, Zentry, Gelato with only its nav, Grab & Go, MORE, Planetoño).
  - A settled or revealing hero: 4 of 23 (Hungry Tiger, Koffiracha, Mate Libre, Savor mid-curtain).
- **Loader style, all 23:**
  - **The loader is branded motion: 14.** It is a logo, the mascot, a drawing of the product, kinetic type or a counter.
  - **Flat colour, then a reveal: 6.**
  - **No loader at all: 3.** Hungry Tiger, Koffiracha and Mate Libre show the hero within 1.5 s.
  - Not one loader is a generic spinner on white. The only small spinners (Activehop's "LOADING", MORE's corner spinner) sit on a brand-coloured field.
- **Time to a readable hero:**
  - Median **5.5 s.** In order: 0, 0.75, 1.5, 3.0, 3.8, 4.8, 5.0 ×4, 5.25, 5.5, 5.6, 6.0 ×3, then more than 6 s ×7 (CIAO, zeroz, Planetoño, Lusion, Igloo, Zentry, Organimo).
  - **The food brands cluster at 5.0–6.0 s:** Crav, Don Molinico, Gelato, Mana, Tripletta, Grab & Go, Activehop, MORE.
  - **The pure-WebGL studio pieces run past 6 s.**
- **How the hero is opened:** 15 of 23 open it (out of a loader, or straight from first paint) with a shaped or physical move, not a fade:
  - curved bands (Crav)
  - the panel collapsing into the logo (Don Molinico)
  - an oval portal (Planetoño)
  - a curtain lift (Savor)
  - a mascot-shaped window (Ponpon)
  - a drawing becoming the product (Oryzo)
  - a glyph zoom (Lando)
  - a bubble flood (Mana)
  - a panel lifting (Tripletta, Grab & Go)
  - frost shrinking into the nav (Activehop)
  - a wordmark writing itself (MORE)
  - a hard cut to colour (Gelato)
  - a type zoom-out (Koffiracha)
  - a mask rise (Mate Libre)
- **What is revealed first:** the brand mark or mascot on 8; kinetic type on 4 (Mana, Tripletta, Red Riding Hood, Koffiracha); the product as a drawing on 1 (Oryzo); a % counter on 1 (Lusion).
- **What reads as "expensive":** the wait is filled with something that belongs to the brand and moves on a beat of 250–500 ms. Crav's lines, Tripletta's cities and Mana's letters all change every 250–500 ms.
- **The loader exit is fast:** 340–600 ms for the shape move.
  - Ponpon 4.42→4.76 s; Lando 3.40→3.79 s; Planetoño 0→0.5 s after click; Crav's bands 4.0→4.5 s.
  - It is followed by a slower settle of 0.75–1.25 s.
- **For Charlie's:** a branded loader of **at most 2.6 s** that exits through a shape in about 450 ms and has the hero readable by about **3.0 s**.
  - That is faster than the food median (5.5 s) and still feels made-to-order.
  - Gate it on real asset decode, with a minimum of 1.8 s so it never flashes.

### Type size

- **7 of 23 lead with display type of 12vw or more,** and 6 of those 7 are food brands:
  - Crav 30vw, Tripletta ≈18.8vw, Koffiracha ≈18vw, Don Molinico 15vw, Hungry Tiger 14.8vw, Zentry 12.5vw, Gelato 12.3vw.
- **8 sit at 5–9vw**, product or photo led: Oryzo, MORE, Mana, Organimo, Savor, Mate Libre, Grab & Go, zeroz.
- **8 have no big DOM headline;** a 3D scene, a portrait or an illustration is the hero.
- **Fonts:** the food heroes use condensed or chunky display faces at line-height 0.8–0.92:
  - Mouse Memoirs, Modak (Crav), "super-med" condensed (Don), Salmond (Hungry Tiger), The Bystander Collection (Gelato).
  - The words are short: 1–3 per line.
- **On the phone, display type gets relatively bigger** (12–18vw), not smaller.

### How much of the first screen is picture (visual, settled hero)

- **Full-bleed picture or scene: 12 of 23.**
  - Photo or film: Don Molinico, Savor, Mate Libre.
  - 3D: CIAO, zeroz, Oryzo, Igloo, Organimo, Activehop.
  - Illustration: Ponpon, Red Riding Hood, Grab & Go.
- **Cut-out product on flat colour plus giant type: 11 of 23.** The product takes about 15–30% of the screen and the type 35–60%:
  - Crav (≈25% burger), Gelato (12 tubs ≈30%), Hungry Tiger (jar ≈15%), Koffiracha (bottle ≈20%), Mana (can + stickers ≈45%), MORE (tub ≈20%), Tripletta (mascot ≈30%), Lando (portrait ≈60%), Planetoño (tray ≈40%), Lusion (3D card ≈70%), Zentry.
- **The food brands split roughly half and half.** Neither archetype uses a stock-looking photo: it is their own product, shot or modelled.

### How much picture per page (counted)

- **Distinct DOM images (150 px or more):**
  - Grab & Go 276, Gelato 164, zeroz 42, Lando 43, Oryzo 31, Mana 30, Crav 25, Savor 24, MORE 21, Tripletta 19, Mate Libre 17, Koffiracha 15, Hungry Tiger 13.
  - The WebGL sites keep their pictures as textures: 49–106 network image requests with 0 DOM images (Lusion, Igloo, Red Riding Hood).
- **Frame sequences:** 3 sites drive a product turn or pour from hundreds of frames.
  - Koffiracha: 613 image requests over 30 KB.
  - MORE: 229 over 30 KB.
  - Hungry Tiger: a 2D-canvas sequence.
- **Video:** on 9 of 23 (Zentry 16, CIAO 7, zeroz 4, Grab & Go 4, Savor 3, MORE 3, Oryzo 2, Koffiracha 2, Gelato 1). It is a texture and a moment, not the main carrier.

### Easing and duration, measured

Measured from computed transitions and getAnimations across the whole DOM:

| Site | Duration | Curve | Count |
|---|---|---|---|
| Don Molinico | 1250 ms | cubic-bezier(0.19,1,0.22,1) (expo.out) | 397 running transforms |
| Grab & Go | 1 s | cubic-bezier(0.075,0.82,0.165,1) (circ.out) | 669 |
| Organimo | 2000 ms | cubic-bezier(0.075,0.82,0.165,1) | 60 |
| Savor | 0.8 s | cubic-bezier(0,0,0,1) | 12 |
| Planetoño | 550 ms | cubic-bezier(0.25,1,0.5,1) (quart.out) | 18 |
| Lando Norris | 750 ms | cubic-bezier(0.65,0.05,0,1) | 80 |
| Mate Libre | 600 ms | cubic-bezier(0.38,0.005,0.215,1) | 55 |
| MORE | 350 ms | cubic-bezier(0.72,0.17,0.17,1) | 40 |
| Tripletta | 250 ms | cubic-bezier(0.585,0.001,0.25,1) | 112 |
| zeroz | 300 / 500 ms | cubic-bezier(0.3,0.26,0.38,1) | 151 / 69 |
| Lusion | 400 ms | cubic-bezier(0.4,0,0.1,1) | 19 |
| Mana | 300 ms | cubic-bezier(0.65,0,0.09,1.38) (overshoot) | 22 |
| MORE | 950 ms | CSS `linear()` spring, peak 1.142 at 24% | 6 |

**Runtime GSAP tweens** (only 4 sites expose `window.gsap`):

- CIAO: 0.5 s power2.inOut ×50, 0.63–0.86 s power3.out staggers ×93.
- Hungry Tiger: power1.out staggers 0.6–2.2 s.
- Gelato: scrubbed ease "none" over 1 s; expo 1.2–1.5 s.
- MORE: 0.85 s default (power1.out), 1.25–1.5 s power1.inOut.

**Bundles:**

- Durations most present across the 23: 0.5 s (19 bundles), 1 s (16), 0.4 s (12), 0.6, 0.8 and 2 s (11 each), 1.5 s (9), 1.2 s (6).
- Most present ease names: power2.out (13), power2.inOut (12), power4.out (9), power3.out (8), expo.inOut (7).
- GSAP's own ease table is in every GSAP bundle, so the plain names "expo" and "power4" mean nothing on their own.
- Bouncy eases are used for stickers and playful bits: elastic.out(1,1) (Planetoño), elastic.out(1,0.75) (Lando), elastic.out(1.1,0.8) (Ponpon), elastic(0.3,0.5) and back.out(1.5) (Koffiracha), cubic-bezier(0.45,0.85,0.34,1.12) (Crav).

**Smooth scroll and scrub:**

- Lenis is on 17 of 23. Every instance that exposed its options used `lerp: 0.1` (CIAO, zeroz, Lando, Grab & Go); zeroz also set `duration: 1.2`. Bundles also carry 0.075 (Planetoño) and 0.18 (MORE).
- ScrollTrigger is on 20 of 23. Scrub was `true` on Zentry (41 triggers) and Hungry Tiger (11), and numeric 0.7–1.5 on Gelato and MORE.

**The house style these numbers add up to:**

- **Reveals** are a sharp ease-out (expo / quart / circ .out) over **0.55–1.25 s**.
- **Panel and page moves** use a strong ease-in-out (cubic-bezier(0.65,0.05,0,1) or (0.38,0.005,0.215,1)) over **0.6–0.75 s**.
- **Small UI** is 0.25–0.35 s.
- **Stickers and mascots** get a spring or overshoot (peak 1.08–1.14).
- **Scrubbed timelines** use ease "none" with `scrub: 0.8–1.5`.
- **Lenis** runs at `lerp 0.1`.
- **Ambient loops** are linear: 10–60 s for spins and marquees, 2–7.5 s for 3D camera drift.

### Library presence across the 23

| Library | Sites |
|---|---|
| GSAP | 21 |
| ScrollTrigger | 20 |
| Lenis | 17 |
| Text splitting | 15 |
| WebGL | 15 |
| three.js `__THREE__` exposed (r141–r178) | 12 |
| Lottie | 8 |
| Rive | 7 |
| Matter.js | 3 (Ponpon, Gelato, Grab & Go) |
| Page-transition libraries | 5: Barba on zeroz, Koffiracha, Tripletta; Taxi on Lando, Organimo |
| Sound (AudioContext or audio files) | 10 |
| Custom cursor (system cursor hidden) | 1 (Planetoño's themed rocket) |
| Virtual scroll (WebGL- or click-driven) | 5 |
| Sticky or pinned scenes held over a viewport | 15 |

- GSAP's SplitText, DrawSVG, MorphSVG, Flip and CustomEase all appear in this set. They now ship in the free `gsap` package, so none is a licence cost.

---

## 6. The WOW move catalogue (ranked)

Ranked by how often the strips show the move as *the* moment on an award site, times how well it fits Charlie's own material:

- the purple top hat (`charlies-prototype\research\hat-paths.json`)
- the lilac drip (`drip-sdf.json`, `_tools\drips`)
- the scalloped striped awning (purple, teal, mustard, lilac)
- festoon bulbs
- their dessert photos (cut-outs in `_tools\cutout`)
- their sweets

**Phone perf scale:**

- **low:** transforms and opacity only.
- **moderate:** full-screen repaints or one canvas.
- **high:** WebGL scenes, physics or large sequences.

Stack for all of these: vanilla JS + GSAP (core + ScrollTrigger, plus the free plugins named) + Lenis (`lerp: 0.1`, `lenis.on('scroll', ScrollTrigger.update)`, `gsap.ticker.add(t => lenis.raf(t*1000))`, `gsap.ticker.lagSmoothing(0)`), with three.js only where stated.

### 1. A loader that builds the product (the wait is the first joke)

- **What the visitor sees:** the brand's object assembles itself on a brand-coloured field, with cheeky status lines and a thin progress bar, then the screen opens.
- **Timing:**
  - Beats every **250–500 ms.** Crav's lines change at 1.25, 1.5, 1.75, 2.0, 2.26 and 2.76 s.
  - Loader exit at **4.0–4.75 s** on these sites. For Charlie's, compress it to **1.8–2.6 s**.
- **Sites and strips:**
  - Crav `w03-crav-burgers-1440-intro.png` (the burger builds)
  - Oryzo `w08-oryzo-ai-1440-intro.png` (CAD drawing, then the real product)
  - Ponpon `w07-ponpon-mania-1440-intro.png` (the mascot face blinks)
  - Mana `w17-mana-yerba-mate-1440-intro.png` (letters in brand colours)
  - Red Riding Hood `w20-red-riding-hood-quest-1440-intro.png`
- **Build:**
  - One fixed `<div class="loader">` holding inline SVG layers: hat brim, crown, band; waffle, scoop, drip.
  - `gsap.timeline()` drops each layer from y -60 with `back.out(1.6)` over 0.45 s, staggered 0.3 s. The status `<p>` swaps text on the same beats.
  - Progress is `Promise.all` over the hero image `decode()` + `document.fonts.ready`. The timeline loops its last beat until that resolves, with a minimum of 1.8 s and a cap of 3.5 s.
- **Phone perf:** low.
- **For Charlie's:**
  - On purple, the top hat drops onto a plate, then a waffle builds under it layer by layer: waffle, scoop, lilac drip running down, sprinkles, cherry.
  - Lines: "Warming the waffle iron…", "Dripping the lilac…", "Counting the sprinkles…", "Hat on. Showtime."

### 2. The brand silhouette becomes the window (shape-mask portal)

- **What the visitor sees:** a tiny shape (mascot, number, logo) holds the picture inside it, then grows past the edges of the screen until the full hero is revealed.
- **Timing:** **340–600 ms** for the grow (Ponpon 4.42→4.76 s; Lando 3.40→3.79 s; Planetoño 0→0.5 s), then the hero settles over 0.75–1.25 s.
- **Sites and strips:**
  - Ponpon `w07-ponpon-mania-1440-intro.png`
  - Lando `w11-lando-norris-1440-intro.png`
  - Planetoño `w05-planetono-1440-click.png`
  - Don Molinico `w04-don-molinico-1440-intro.png` (the panel collapses into the nav logo tab)
  - Zentry `w12-zentry-1440-scroll.png` (a polygon frame opens)
- **Build:**
  - A full-screen SVG overlay in purple with `<mask>`: a white rect, plus the hat path from `hat-paths.json` in black. That cuts a hat-shaped hole.
  - `transform-box: fill-box; transform-origin: 50% 60%` on the path.
  - `gsap.fromTo(path, {scale: 0.04}, {scale: 45, duration: 0.55, ease: 'power3.in'})`.
  - At the same time, the hero photo goes `scale 1.18 → 1` over 1.2 s `expo.out`. The overlay is removed on complete.
- **Phone perf:** moderate. One full-screen mask repaint per frame for about 0.5 s. Test on a mid-range Android.
  - Fallback: `clip-path: circle()` on the hero.
- **For Charlie's:**
  - The loader ends with the hat on its own. Its crown opening becomes the hole, and the parlour hero (the dessert counter under the striped awning) is seen through the hat as it grows.
  - This is ownable: nobody else has the hat.

### 3. Exploded stack that assembles on scroll (build-your-own as choreography)

- **What the visitor sees:** a pinned stage. As you scroll, the dessert's layers fall into place one by one, and a 1-2-3-4 step indicator fills.
- **Timing:**
  - About 4–5 viewports for 4 steps (Planetoño wheel 1440–6360).
  - Each layer falls with ease-in then lands with a small overshoot.
  - Scrub 0.8–1.2.
- **Sites and strips:**
  - Planetoño `w05-planetono-1440-scroll.png` ("How it works": burger, fries, donut, toy, box closes)
  - Igloo `w10-igloo-inc-1440-scroll.png` (the reverse: bricks lift apart)
  - Crav's loader, `w03-crav-burgers-1440-intro.png`
- **Build:**
  - Section `height: 500vh`, an inner `position: sticky; top: 0; height: 100vh`. This is CSS sticky: 15 of 23 use sticky or pinned scenes, and only 3 use GSAP pins.
  - One `gsap.timeline({scrollTrigger: {trigger, start: 'top top', end: 'bottom bottom', scrub: 1}})`.
  - Per layer: `.from(layer, {y: '-110vh', rotate: gsap.utils.random(-12, 12), ease: 'power2.in', duration: 1})` then `.to(layer, {scaleY: 0.94, yoyo: true, repeat: 1, duration: 0.15})` for the squash.
  - The step pills toggle `is-active` with `onUpdate` by timeline progress.
  - Layers are their own cut-out photos (WebP with alpha) or SVG.
- **Phone perf:** low. Transforms only; keep it to 6–8 layers.
- **For Charlie's:** this is the build-your-own.
  - Steps: 1 Base (waffle, crepe or cookie dough), 2 Sauce (the lilac drip pours over it), 3 Toppings (sweets rain on), 4 Hat on (the top hat lands with a bounce).
  - The last step's CTA is "Order this one".

### 4. The hero object travels with the reader (tumbles, lands, spills)

- **What the visitor sees:** the product leaves the hero and moves down the page with you. It turns, lands in the next section, and at the end tips over and pours.
- **Timing:** scrubbed. Mana's can tumbles over wheel 480–3240 (about 3 viewports); Hungry Tiger's jar turns 360° over about 6 viewports, then spills at wheel 7200.
- **This is the most common food and drink signature in the set: 7 of 23.**
  - Mana `w17-mana-yerba-mate-1440-scroll.png`
  - Hungry Tiger `w18-hungry-tiger-1440-scroll.png`
  - Koffiracha `w21-koffiracha-1440-scroll.png`
  - MORE `w28-more-nutrition-1440-scroll.png`
  - Grab & Go `w26-grab-go-1440-scroll.png`
  - Activehop `w27-activehop-1440-scroll.png`
  - CIAO `w01-ciao-energy-1440-scroll.png`
- **Build, option A** (photo-real, what Hungry Tiger, Koffiracha and MORE do):
  - Shoot their shake or sundae on a turntable, 48–72 frames, plus a 24-frame pour. Export WebP at 900 px wide, about 25–40 KB each.
  - Draw to one `<canvas>` with `drawImage(frames[i])`, where `i = Math.round(self.progress * (n-1))` in a ScrollTrigger `onUpdate`. Only redraw when `i` changes.
  - Preload after the hero is shown, at idle.
- **Build, option B** (cheaper, uses existing assets): a fixed cut-out PNG moved with GSAP MotionPathPlugin along an SVG path that weaves between section anchors, `rotation: 'auto'` plus extra spins, and scale up or down per section.
- **Build, option C:** three.js GLB of the hat (Mana and Grab & Go do this with a can or cup).
- **Phone perf:**
  - A: moderate. 2–3 MB of frames, lazy.
  - B: low.
  - C: high.
- **For Charlie's:**
  - The top hat (B, now; C later) tumbles from the hero and lands on each section's dessert like a lid.
  - Or a photographed shake turns while flavour words change (A).
  - Finale: the hat tips and lilac sauce pours out of it (a 24-frame pour or an SVG drip).

### 5. Mega type with the real dessert bursting between the letters

- **What the visitor sees:** a word bigger than the screen lands (zooming out or slamming up), and the real product photo comes up between and in front of the letters.
- **Timing:**
  - Koffiracha's type zoom-out takes **1.0 s** (0.5→1.5 s), with the bottle landing at the same time.
  - Crav's type lands at 5.25 s; the burger rises 5.5–6.0 s.
  - Use `expo.out` 1.0–1.2 s for the type and `back.out(1.4)` 0.9 s for the product, 0.15 s after.
- **Sites and strips:**
  - Crav `w03-crav-burgers-1440-intro.png` (432 px = 30vw)
  - Koffiracha `w21-koffiracha-1440-intro.png` (≈18vw)
  - Gelato `w14-gelato-la-boca-1440-scroll.png` (3D-shadow "FLAVOR")
  - Hungry Tiger (14.8vw), Don Molinico (15vw), Tripletta (≈18.8vw)
- **Build:**
  - `h1 { font-size: clamp(88px, 26vw, 420px); line-height: .82; letter-spacing: -.02em }` in their chunky display face.
  - Two copies of the word, one behind the photo and one in front, clipped to the top half with `clip-path: inset(0 0 52% 0)`. The waffle then sits *in* the word.
  - Type: `gsap.from(h1, {scale: 2.6, duration: 1.1, ease: 'expo.out'})`.
  - Photo: `gsap.from(img, {yPercent: 60, rotate: -10, duration: .9, ease: 'back.out(1.4)', delay: .15})`.
  - On the phone, keep the word at 14–18vw on 2 lines.
- **Phone perf:** low.
- **For Charlie's:** "WAFFLES." or "CHARLIE'S" in purple on mustard, with the real waffle-stack cut-out bursting through, the top hat tipping onto the last letter, and a round "new" sticker that springs in.

### 6. Sections that pour into each other (a liquid or shaped wipe in the brand's own material)

- **What the visitor sees:** instead of a cut or a fade, the next colour arrives as a shape: curved bands, bubbles merging, a curtain lifting, an oval opening.
- **Timing:** **400–600 ms** for an intro wipe (Crav bands 4.0→4.5 s; Mana bubble flood 4.25→4.75 s; Savor curtain 2.75→3.25 s). Scrubbed when it happens on scroll.
- **Sites and strips:**
  - Crav `w03-crav-burgers-1440-intro.png` and its wavy edges in `-scroll.png`
  - Mana `w17-mana-yerba-mate-1440-intro.png`
  - Savor `w06-savor-1440-intro.png` and `-scroll.png` (the oval window)
  - Tripletta and Grab & Go (panel lifts)
- **Build:**
  - An SVG drip curtain: one `<path>` per drip column, with keyframes as precomputed `d` strings (short drip → long drip → full cover). Tween them with MorphSVG, or interpolate the control points yourself; all paths must have the same point count.
  - The drips are offset 0–120 ms with `stagger: {each: .04, from: 'random'}` and `ease: 'power2.in'`, 0.6 s.
  - Section tops carry the scalloped awning edge as an SVG `clip-path`. Its scallop depth is driven by Lenis velocity (`lenis.on('scroll', e => gsap.to(edge, {'--depth': clamp(e.velocity)}))`) so the awning flaps as you scroll.
  - The `drip-sdf.json` work can drive a shader version later.
- **Phone perf:** low (SVG path tween) to moderate (full-width path repaint).
- **For Charlie's:** between the hero and the menu, the lilac drip runs down the screen and becomes the menu's background. Every section starts with a striped scalloped awning edge.

### 7. Hard colour-cut roll call (rapid words, each a full-screen colour)

- **What the visitor sees:** a word per beat, each on a different full-screen brand colour, fast enough to feel like a flip-book, landing on the name.
- **Timing:** **250 ms per word** (Tripletta 2.0–3.75 s, 8 words). Mana's per-letter colour flash runs 1.5–2.75 s.
- **Sites and strips:**
  - Tripletta `w25-tripletta-pizza-1440-intro.png`
  - Mana `w17-mana-yerba-mate-1440-intro.png`
- **Build:**
  - An array of `{word, bg, fg}`. Use `gsap.timeline({repeat: 0})` with `.set(el, {textContent: w.word, backgroundColor: w.bg, color: w.fg}, i*0.25)`. No tweening: hard cuts are the point.
  - The last word holds 0.6 s, then the panel lifts with `yPercent: -100`, 0.7 s, `cubic-bezier(0.65,0.05,0,1)`.
  - Respect `prefers-reduced-motion`: show the last word only.
- **Phone perf:** low.
- **For Charlie's:** "WAFFLES / SHAKES / COOKIE DOUGH / CREPES / SUNDAES / SWEETS / CHARLIE'S" across purple, teal, mustard and lilac, with festoon bulbs blinking on each cut. It can *be* the loader for return visits (sessionStorage), with the hat build on the first visit.

### 8. A line that draws itself and carries a droplet (scroll-drawn path, script write-on)

- **What the visitor sees:** a hand-drawn line, scribble or script word draws itself as you scroll, sometimes with an object riding its tip.
- **Timing:**
  - MORE's wordmark writes in **750 ms** (5.0→5.75 s).
  - Gelato's "New" writes over about 0.5 viewport.
  - Savor's line runs about 5 viewports, scrubbed.
- **Sites and strips:**
  - Savor `w06-savor-1440-scroll.png`
  - Lando `w11-lando-norris-1440-scroll.png` (signature)
  - Gelato `w14-gelato-la-boca-1440-scroll.png`
  - MORE `w28-more-nutrition-1440-intro.png`
  - Lusion `w09-lusion-1440-scroll.png` (3D ribbon)
- **Build:**
  - An SVG path with `stroke-dasharray: L; stroke-dashoffset: L`.
  - `gsap.to(path, {strokeDashoffset: 0, ease: 'none', scrollTrigger: {scrub: 1}})`, or `drawSVG: '0% 100%'`.
  - For the droplet, a MotionPathPlugin tween on the same ScrollTrigger: `motionPath: {path, align: path, alignOrigin: [.5,.5]}`.
- **Phone perf:** low.
- **For Charlie's:** a lilac drip line runs from the hero down the whole menu with a single drip-drop riding its tip, and "Charlie's" in script writes itself in the footer.

### 9. A ring of real product photos orbiting the headline

- **What the visitor sees:** top-down shots of the actual product circle slowly around the headline and the order button.
- **Timing:** appears at 5.5 s on Gelato with a hard cut; the orbit runs **10–25 s per turn**, linear. Gelato's CSS spins are 10 s, 15 s and 25 s.
- **Sites and strips:**
  - Gelato `w14-gelato-la-boca-1440-intro.png`
  - Mana (stickers popping around the can) `w17-mana-yerba-mate-1440-intro.png`
- **Build:** a container `animation: spin 24s linear infinite`, with each item placed by `rotate(i*30deg) translateY(-38vmin)`. Items counter-rotate so the photos stay upright. Pause on `:hover`, and stop under reduced motion.
- **Phone perf:** low.
- **For Charlie's:** 10–12 overhead shots of their own desserts (waffle, shake top, cookie dough tub, crepe) orbit "WHAT'S IT TO BE?" with the Order button in the middle, and festoon bulbs on an inner ring. The menu becomes the hero.

### 10. Masked photo reveals on a long expo-out (done properly)

- **What the visitor sees:** a photo is uncovered by its frame while the image inside settles from slightly zoomed. Doors part, pixel blocks step in, or a scallop edge wipes across.
- **Timing:** **1.0–1.25 s** `cubic-bezier(0.19,1,0.22,1)` (Don Molinico: 397 running at once), or 0.6–0.75 s with the strong in-out (Mate Libre, Lando).
- **Sites and strips:**
  - Don Molinico `w04-don-molinico-1440-scroll.png`
  - Mate Libre `w22-mate-libre-1440-scroll.png` (bonsai doors)
  - Lando `w11-lando-norris-1440-scroll.png` (pixel-step blocks)
- **Build:**
  - Wrapper `clip-path: inset(100% 0 0 0)` → `inset(0)`, with the inner `img` scale 1.2 → 1 on the same tween.
  - `ScrollTrigger.batch('.reveal', {onEnter: b => gsap.to(b, {...})})`.
  - For Charlie's, the wipe edge is a scalloped polygon instead of a straight inset.
- **Phone perf:** low.
- **Honesty note:** a straight inset reveal is common, close to an AI default. The two things that lift it are the long expo-out with inner scale, and an edge shape that belongs to the brand.
- **For Charlie's:** each menu photo is "unwrapped" with the scalloped awning edge, like a sweet wrapper.

### 11. Pinned product, flavour swap, opposed word rows

- **What the visitor sees:** the product stays centre-screen while huge rows of flavour words slide in opposite directions behind it, and the product changes to match each flavour.
- **Timing:** about 1 viewport per flavour (Activehop wheel 1440–5880 for 3 flavours).
- **Sites and strips:**
  - Activehop `w27-activehop-1440-scroll.png`
  - CIAO `w01-ciao-energy-1440-scroll.png` (can held over 4 chapters)
- **Build:**
  - A sticky stage.
  - Rows: `xPercent` scrubbed in opposite directions, one per flavour.
  - Product: a stack of photos per flavour, swapped by a `clip-path: inset()` wipe at each third of progress.
- **Phone perf:** low.
- **For Charlie's:** a shake cup pinned centre, with "BUBBLEGUM / BISCOFF / STRAWBERRY" rows sliding. The shake photo swaps per flavour, and the awning stripe colour behind it follows.

### 12. A physics pile of their sweets (the playful finale)

- **What the visitor sees:** branded things fall and pile up at the bottom of the page, or are tossed into a scene. You can poke them.
- **Timing:** starts when the section enters. Bodies settle in about 1.5–2.5 s.
- **Sites and strips:**
  - Grab & Go `w26-grab-go-1440-scroll.png` (a pile of cups behind the CTA)
  - Ponpon `w07-ponpon-mania-1440-scroll.png`
  - Gelato (Matter.js flavour chunks)
- **Build:**
  - Matter.js. Static floor and walls. 40–60 bodies on the phone (120 on desktop) dropped at 40 ms intervals, `restitution 0.35`, `friction 0.1`.
  - Render as positioned `<img>` sprites, or one 2D canvas.
  - `Sleeping.set` once still. Pause the runner when off-screen (IntersectionObserver).
  - Mouse or touch: `MouseConstraint`.
- **Phone perf:** moderate.
- **For Charlie's:** a "pick'n'mix" footer where their sweets (cola bottles, mini marshmallows, sprinkles) and three tiny top hats pour out of a giant hat and pile behind "COME IN, WE'RE OPEN".

### 13. Camera dive into the next world (into the hat)

- **What the visitor sees:** the camera falls into an opening (cloud, light, a window) and comes out in a new place.
- **Timing:** scrubbed over 1.5–2 viewports (Organimo wheel 1440–3240). zeroz's light burst takes about 1 viewport of wheel while scroll is held.
- **Sites and strips:**
  - Organimo `w19-organimo-1440-scroll.png`
  - zeroz `w02-zeroz-1440-scroll.png`
  - Igloo `w10-igloo-inc-1440-scroll.png`
  - Savor (the oval window)
- **Build:**
  - 2D: layered PNG or SVG of the hat's crown opening, `scale 1 → 30` around the opening's centre, scrubbed. A dark radial vignette goes to full black at 60%, then the striped parlour scene fades in at `scale 1.2 → 1`.
  - A three.js version only if the hat is already modelled.
- **Phone perf:** low (2D) to high (3D).
- **For Charlie's:** "step inside": the reader falls into the top hat and lands under the festoon bulbs of the parlour, as the transition from the hero to "Our parlour".

### 14. Selective colour bloom

- **What the visitor sees:** a scene appears in greyscale, and one brand colour floods in first, then the rest.
- **Timing:** 0.75–4.5 s after the click on Red Riding Hood. For a web hero, 1.2–1.8 s.
- **Sites and strips:** Red Riding Hood `w20-red-riding-hood-quest-1440-click.png` and `-scroll.png`.
- **Build:**
  - CSS: the colour photo over a greyscale copy, with the colour layer masked by a hand-painted mask PNG of only the lilac drips and the stripes.
  - Animate `mask-size`, or a radial `mask-image` position from the drip outward, then fade the full colour in.
  - WebGL alternative: one fragment shader `mix(gray, color, smoothstep(t-0.2, t, maskTex.r))`.
- **Phone perf:** low (CSS) to moderate (shader).
- **For Charlie's:** the parlour photo arrives grey, the lilac drip and awning stripes bloom into colour first, then the desserts.

### 15. A cursor-reactive hero object (with tilt on the phone)

- **What the visitor sees:** the hero's objects lean away from, or get pushed by, the pointer.
- **Timing:** springs settle in 0.4–0.8 s.
- **Sites and strips:**
  - Lusion `w09-lusion-1440-cursor.png` (Δ 48.5, the clearest)
  - Organimo `w19-organimo-1440-cursor.png` (parallax Δ 23)
  - Planetoño (custom rocket cursor)
- **Build:**
  - Per topping sprite, `gsap.quickTo(el, 'x', {duration: .6, ease: 'power3'})`, fed by `(el - pointer)` repulsion within 160 px.
  - Phone: `deviceorientation` gamma/beta after a tap, using the iOS `DeviceOrientationEvent.requestPermission`.
- **Phone perf:** low.
- **For Charlie's:** the sprinkles and mini marshmallows around the hero waffle scatter from the cursor, and the hat tips toward it.
- **Honesty note:** do not hide the system cursor. 1 of 23 does, and only with a themed object.

---

## 7. What not to do (the AI default, checked against the set)

- **Fade-up on every block** (opacity 0 → 1, y 40 → 0, 0.6 s).
  - It exists as a secondary reveal on most of these sites, but it is never the WOW moment in any strip.
  - If used, it is the floor, not the idea.
- **Glowing gradient blobs, mesh gradients, glass cards.**
  - None of the 23 heroes is a gradient blob.
  - Oryzo's rainbow AI edge glow (`w08-oryzo-ai-1440-scroll.png`, wheel 5400–6840) is a deliberate parody of exactly that.
  - Frosted glass appears once, as Activehop's nav pill.
  - Do not recommend any of these.
- **A generic spinner or progress bar on white:** 0 of 23. Every loader sits on a brand colour and most show brand content.
- **A blob that follows the cursor:** 0 of 23. Planetoño's custom cursor is a rocket that belongs to its story.
- **A marquee ticker as the main move.**
  - Tripletta, Mate Libre and Activehop use marquees, but always behind something else (a pinned product, a photo).
  - On its own it reads as a template.
- **Typewriter text on its own.**
  - Red Riding Hood and Mana type text, but always with a second beat: the glyph assembly, or the colour flash plus the bubble flood.

---

## 8. Files

- **Strips (deliverable),** in `C:\Users\RifqiRakamulya\Documents\Astra\charlie\_research\wow\`:
  - `w01-…` to `w28-…`, with `-1440-intro.png`, `-1440-cursor.png`, `-1440-scroll.png`, `-390-intro.png`, and `-1440-click.png` (w05, w20).
  - The 5 non-rendered sites keep their strips as evidence of the error pages.
- **Review grids:** `…\_research\wow\review\*-grid.png` and `phone-4s-sheet.png`.
- **Raw frames:** `…\_research\wow\frames\<id>-<slug>\<vp>\` (JPEG, 720 px wide on desktop, 360 px on phone).
- **Scripts,** all read-only against the sites, in `C:\Users\RifqiRakamulya\Documents\Astra\charlie\_tools\research-wow\`:
  - `wow-capture.js` (capture and fingerprint), `build-strips.js`, `digest.js`, `phone-sheet.js`
  - `awwwards-search.js`, `aw-site.js`, `fwa-check2.js`
  - `sites-wow.json`, `raw\*.json` (every counter per site and viewport), `digest.txt` / `digest.json`, `strip-metrics.json` (per-frame luma and Δ)
  - `aw-sites.jsonl`, `food-awards.txt` (every award site found in the Food & Drink archive), `fwa-results.txt`, `run.log`
