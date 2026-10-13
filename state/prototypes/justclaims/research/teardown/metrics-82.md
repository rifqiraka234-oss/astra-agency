# Teardown for justclaims.eu, what the best sites measurably do

Measured 12 Oct 2026, 1440x900, cold load then a full scripted scroll (100px per 40ms wheel steps). Raw per-site JSON: `fingerprints.jsonl`. Screenshots: `shots/<slug>-fold.jpg`, `-full(-N).jpg`, and `-frames.jpg` (eight frames down the scroll, which is what shows pinned scenes). Consent, tag-manager and analytics scripts were blocked in the render, so cookie walls mostly do not cover the shots (A4E's banner and a few others still show). Embeds that did not load here (the YouTube player on justclaims.eu, a Figma video) are our side, not theirs.

## 1. Counts

- **Queued:** 98 sites (the 85 on the brief's list, with a few URLs corrected, plus 13 substitutes added when sites were walled, parked or redirected).
- **Rendered and fingerprinted:** 82 (A 11, B 17, C 12, D 14, E 12, F 13, G 3). Of these, **3 (Lusion, Resn, Immersive Garden) are fingerprinted but my frames caught only the preloader**, so I did not study what they do. Apple Watch is the category hub, not a product page (the Ultra 3 and Series 11 URLs redirect to /watch/); Apple Watch SE 3 is the product page.
- **Excluded after rendering:** oneskysolutions.com (parked, for sale), claimcompass.eu (redirects to airhelp.com).
- **Walled, 12 by name.** Every one was tried four ways: direct Chromium (proxy CA pinned by key, verification on), then Chromium with every request fulfilled by curl_cffi under a chrome, then safari, then firefox TLS fingerprint. The Cloudflare ones were also probed with curl_cffi edge, safari_ios, chrome_android, tor and chrome131 fingerprints. All stayed blocked.
  - Cloudflare managed challenge, HTTP 403 "Just a moment": clio, lexology, breitling (Navitimer page), lufthansagroup, eurowings, discover, swiss. ig.ft.com answers 200 with the same challenge page.
  - Akamai "Access Denied" 403: mckinsey. Plain 403: nytimes (interactive page). Imperva/Incapsula challenge frame, 0 words: airbus.
  - activetheory: 5 words, never got past its loader under any method. That is our side failing to load it, not a verdict, so it is unstudied.
- **Queued, not measured (our failure, not a verdict on them):** vercel, raycast. My software-WebGL renderer hung on their heavy canvases while the machine sat at load 20 to 35 from another job, even with a 700s allowance. Not counted anywhere below.

## 2. Metrics per rendered site

Scroll = page height in viewports. Vid = video elements (autoplay attribute). Cv/GL = canvas elements / WebGL canvases. Stage = sticky element at least 45% of viewport tall inside a parent at least 1.8 times taller (a pinned scene). Clip, Blend, Mut = clip-path elements, mix-blend-mode elements, style/class mutations during the scroll. Libs: ST = ScrollTrigger, FM = framer-motion, 'bundle' string matches are not proof of use.

| Cat | Site | Scroll | Words | Vid (auto) | Cv/GL | Stage / pin | Clip | Blend | Mut | Libs | Hero (auto-read) |
|---|---|---|---|---|---|---|---|---|---|---|---|
| A | airhelp | 7.1 | 794 | 1 (0) | 0/0 | 0 / 0 | 9 | 0 | 90 | Lenis FM Swiper | image |
| A | claimflights | 14 | 3006 | 0 (0) | 0/0 | 0 / 0 | 1 | 0 | 94 | - | type-only |
| A | compensair | 3.1 | 374 | 0 (0) | 0/0 | 0 / 0 | 0 | 0 | 64 | - | image-bg |
| A | euclaim | 5.1 | 894 | 0 (0) | 0/0 | 0 / 0 | 0 | 0 | 2 | - | image |
| A | fairplane | 7.2 | 839 | 0 (0) | 0/0 | 0 / 0 | 13 | 0 | 364 | Lottie | type-only |
| A | flightright | 10.1 | 885 | 0 (0) | 0/0 | 0 / 0 | 1 | 0 | 65 | Swiper | image |
| A | igt-solutions | 6.9 | 1170 | 5 (5) | 0/0 | 0 / 0 | 0 | 0 | 69 | Lottie Swiper | image-bg |
| A | june-tech | 12.1 | 1585 | 0 (0) | 0/0 | 0 / 0 | 17 | 0 | 3 | FM | image-bg |
| A | justclaims-now | 6.8 | 210 | 0 (0) | 0/0 | 0 / 0 | 1 | 0 | 3 | GSAP+ST Wix | image |
| A | passenger-care | 8.1 | 938 | 0 (0) | 0/0 | 0 / 0 | 0 | 7 | 0 | - | type-only |
| A | skyrefund | 4.1 | 411 | 0 (0) | 0/0 | 0 / 0 | 0 | 0 | 68 | - | type-only |
| B | a4e | 6.1 | 400 | 2 (2) | 0/0 | 0 / 0 | 0 | 5 | 1227 | GSAP+ST Lenis Lottie Swiper Webflow | video |
| B | accelya | 10.5 | 1541 | 0 (0) | 0/0 | 0 / 0 | 0 | 0 | 637 | FM | image |
| B | amadeus | 6 | 1150 | 7 (7) | 0/0 | 0 / 0 | 0 | 0 | 45 | - | video |
| B | boeing | 8 | 829 | 1 (0) | 0/0 | 0 / 0 | 70 | 0 | 155 | Swiper | video |
| B | cirium | 7 | 553 | 0 (0) | 0/0 | 0 / 0 | 6 | 0 | 10 | - | image |
| B | easa | 1 | 48 | 0 (0) | 0/0 | 0 / 0 | 0 | 0 | 0 | - | image-bg |
| B | eurocontrol | 5.2 | 611 | 0 (0) | 0/0 | 0 / 0 | 1 | 0 | 78 | - | image |
| B | flightradar24 | 1 | 331 | 0 (0) | 2/2 | 0 / 0 | 2 | 0 | 302 | deck.gl | webgl |
| B | iata | 3.3 | 472 | 0 (0) | 0/0 | 0 / 0 | 2 | 0 | 16 | Lottie | image |
| B | ibsplc | 4.5 | 728 | 0 (0) | 0/0 | 0 / 0 | 0 | 0 | 14 | GSAP | image |
| B | lhsystems | 5.3 | 742 | 1 (1) | 0/0 | 0 / 0 | 2 | 0 | 501 | GSAP+ST Swiper | video |
| B | lufthansa-technik | 8.5 | 707 | 1 (1) | 0/0 | 0 / 0 | 0 | 0 | 65 | - | image |
| B | navitaire | 3.8 | 289 | 0 (0) | 0/0 | 0 / 0 | 2 | 0 | 18 | - | image |
| B | oag | 6 | 891 | 0 (0) | 0/0 | 0 / 0 | 0 | 0 | 336 | FM Swiper | image-bg |
| B | rolls-royce | 4.3 | 474 | 0 (0) | 0/0 | 0 / 0 | 0 | 0 | 1079 | - | image-bg |
| B | sabre | 10.9 | 1040 | 1 (1) | 0/0 | 0 / 0 | 130 | 0 | 550 | - | video |
| B | sita | 6.5 | 856 | 1 (1) | 0/0 | 0 / 7 | 1 | 0 | 1439 | GSAP+ST Lenis Swiper | video |
| C | allenovery | 6.9 | 475 | 0 (0) | 0/0 | 1 / 0 | 69 | 0 | 333 | GSAP+ST | image |
| C | complyadvantage | 4.7 | 542 | 0 (0) | 0/0 | 0 / 0 | 1 | 0 | 60 | - | type-only |
| C | docusign | 11.6 | 1302 | 0 (0) | 1/0 | 0 / 0 | 10 | 0 | 34 | Lottie | type-only |
| C | freshfields | 4.7 | 507 | 1 (1) | 0/0 | 0 / 0 | 0 | 0 | 1 | - | video |
| C | harvey | 10.6 | 949 | 0 (0) | 1/1 | 0 / 0 | 3 | 0 | 952 | GSAP+ST FM | image |
| C | ironclad | 13.3 | 835 | 0 (0) | 0/0 | 0 / 0 | 0 | 0 | 20 | GSAP+ST Lottie Swiper | type-only |
| C | legora | 12.9 | 761 | 3 (2) | 0/0 | 1 / 0 | 0 | 0 | 2690 | Lenis FM | video |
| C | linklaters | 4.9 | 215 | 0 (0) | 0/0 | 0 / 0 | 4 | 0 | 273 | GSAP+ST Lenis | image |
| C | luminance | 9.6 | 598 | 1 (1) | 0/0 | 3 / 0 | 1 | 0 | 578 | Lenis FM | type-only |
| C | onetrust | 6.9 | 644 | 0 (0) | 0/0 | 0 / 0 | 0 | 0 | 522 | Lottie | type-only |
| C | thomsonreuters-legal | 4.4 | 622 | 0 (0) | 0/0 | 0 / 0 | 0 | 0 | 18 | - | image |
| C | vanta | 12.1 | 690 | 0 (0) | 0/0 | 0 / 0 | 24 | 1 | 450 | GSAP+ST Lottie FM Webflow | type-only |
| D | apple-ipad-pro | 34.4 | 4310 | 16 (0) | 0/0 | 0 / 1 | 63 | 0 | 1780 | three | image |
| D | apple-watch | 8.1 | 2732 | 0 (0) | 0/0 | 0 / 0 | 36 | 0 | 331 | - | type-only |
| D | apple-watch-se | 30 | 6252 | 3 (0) | 0/0 | 1 / 1 | 65 | 0 | 4493 | three | type-only |
| D | arc | 6.8 | 401 | 4 (4) | 0/0 | 0 / 0 | 9 | 4 | 3 | - | image |
| D | attio | 19.5 | 1903 | 0 (0) | 2/0 | 2 / 0 | 10 | 39 | 1698 | FM | type-only |
| D | figma | 9.7 | 409 | 0 (0) | 0/0 | 0 / 0 | 17 | 0 | 1462 | three Rive FM | image-bg |
| D | framer | 11.9 | 1028 | 7 (2) | 0/0 | 1 / 0 | 1 | 5 | 4125 | FM | video |
| D | linear | 11.1 | 1488 | 0 (0) | 0/0 | 0 / 0 | 13 | 16 | 358 | - | image |
| D | mercury | 13 | 1570 | 5 (0) | 1/1 | 0 / 0 | 31 | 0 | 115 | three FM | video |
| D | notion | 5.2 | 345 | 1 (1) | 0/0 | 0 / 0 | 3 | 6 | 30 | - | type-only |
| D | pitch | 15.9 | 1336 | 0 (0) | 1/1 | 1 / 0 | 1 | 0 | 53629 | Lenis three Lottie FM | webgl |
| D | ramp | 15.5 | 1408 | 3 (3) | 9/1 | 1 / 0 | 24 | 0 | 641 | Lottie FM | video |
| D | rippling | 11.7 | 1249 | 0 (0) | 1/0 | 0 / 0 | 10 | 0 | 48 | GSAP+ST Lottie FM | image |
| D | stripe | 16.5 | 2337 | 0 (0) | 13/6 | 0 / 0 | 90 | 5 | 1072 | three | webgl |
| E | basement | 7.5 | 393 | 4 (0) | 2/1 | 4 / 0 | 0 | 0 | 116 | three FM | webgl |
| E | bloomberg-graphics | 5.1 | 643 | 0 (0) | 0/0 | 0 / 0 | 0 | 0 | 0 | Lottie | unclear |
| E | ciechanowski-watch | 83.3 | 8097 | 0 (0) | 93/0 | 0 / 0 | 0 | 0 | 0 | - | type-only |
| E | flightaware | 6.2 | 272 | 0 (0) | 1/1 | 0 / 0 | 0 | 0 | 68 | FM mapbox | image |
| E | immersive-g | 1 | 325 | 0 (0) | 12/1 | 0 / 0 | 0 | 0 | 639 | GSAP+ST Lenis three Lottie | webgl |
| E | locomotive | 7.3 | 306 | 1 (0) | 2/2 | 0 / 0 | 1 | 1 | 423 | GSAP+ST Lenis Loco three Swiper | video |
| E | lusion | 1 | 878 | 0 (0) | 2/1 | 0 / 0 | 0 | 0 | 1212 | three | webgl |
| E | owid | 5.4 | 2716 | 0 (0) | 0/0 | 0 / 0 | 0 | 0 | 64 | - | image-bg |
| E | pudding | 7.5 | 565 | 0 (0) | 0/0 | 0 / 0 | 1 | 0 | 50 | - | unclear |
| E | resn | 1 | 9 | 0 (0) | 6/1 | 0 / 0 | 0 | 0 | 29 | GSAP three | webgl |
| E | reuters-graphics | 5.8 | 833 | 0 (0) | 0/0 | 0 / 0 | 44 | 0 | 2 | - | type-only |
| E | stripe-press | 7.6 | 273 | 1 (0) | 2/1 | 0 / 0 | 12 | 13 | 204 | three | webgl |
| F | audemars-piguet | 10.1 | 628 | 3 (3) | 0/0 | 0 / 0 | 1 | 0 | 14171 | GSAP+ST Lottie Swiper | image |
| F | hodinkee | 11.3 | 1297 | 0 (0) | 0/0 | 0 / 0 | 1 | 0 | 122 | - | image |
| F | iwc | 7.2 | 371 | 2 (1) | 0/0 | 0 / 0 | 19 | 0 | 205 | GSAP+ST Swiper | video |
| F | jaeger-lecoultre | 5.8 | 496 | 7 (7) | 1/0 | 0 / 0 | 9 | 0 | 289 | three | video |
| F | longines | 8.1 | 1114 | 2 (1) | 0/0 | 0 / 0 | 18 | 0 | 2048 | FM Swiper | video |
| F | mondaine | 4.5 | 581 | 0 (0) | 0/0 | 0 / 0 | 3 | 0 | 769 | GSAP+ST Loco Swiper | iframe |
| F | nomos | 7.2 | 281 | 0 (0) | 0/0 | 0 / 0 | 1 | 5 | 88 | Swiper | type-only |
| F | omega | 7.3 | 759 | 3 (0) | 0/0 | 1 / 0 | 2 | 0 | 664 | GSAP+ST Lenis Lottie FM Swiper | video |
| F | patek | 9.5 | 558 | 3 (0) | 0/0 | 0 / 0 | 0 | 0 | 1383 | GSAP+ST Lenis Lottie | video |
| F | rolex | 4.4 | 181 | 1 (1) | 0/0 | 2 / 0 | 8 | 0 | 27 | GSAP+ST FM | video |
| F | sbb-clock | 3.3 | 298 | 0 (0) | 0/0 | 0 / 0 | 3 | 0 | 14 | GSAP+ST | unclear |
| F | ulysse-nardin | 6.9 | 1014 | 5 (0) | 0/0 | 0 / 0 | 6 | 0 | 26 | FM Swiper | image |
| F | vacheron | 8.4 | 293 | 1 (1) | 0/0 | 0 / 0 | 3 | 0 | 456 | Lenis FM Swiper | video |
| G | heathrow | 5.8 | 597 | 0 (0) | 0/0 | 0 / 0 | 31 | 0 | 207 | - | image |
| G | klm | 6.5 | 490 | 0 (0) | 0/0 | 0 / 0 | 0 | 0 | 1538 | - | image |
| G | tuifly | 2.4 | 192 | 0 (0) | 0/0 | 0 / 0 | 0 | 0 | 0 | - | image |

Hero labels are automatic (largest media at the fold), so 'image' includes product UI. I corrected them by eye only where the text below says so.
