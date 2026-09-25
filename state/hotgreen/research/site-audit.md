> Repo copy, 25 September 2026. The raw fetches (`raw/`), Wayback snapshots (`wb/`) and the full
> screenshot set this report cites stayed in the session scratchpad and are not committed. The seven
> images kept beside this file are `site-home-hero-desktop.jpg`, `site-home-hero-phone.jpg`,
> `site-home-full-desktop.jpg`, `site-solutions-full-desktop.jpg`, `site-contact-full-desktop.jpg`,
> `site-spec-table-is-an-image.png` and `site-backer-logos-unlabelled.png`.

# HotGreen Solutions, live site audit (25 Sep 2026)

Target: https://www.hotgreensolutions.com (apex and hotgreen.co.uk both redirect here).
Research only. No form was submitted and nobody was contacted.

All files named below sit in this scratchpad folder. `raw/` holds the fetched HTML
(`f_home`, `f_solutions`, `f_contact`, `f_404`), the Framer search index (`si_*.json`) and
the page bundles (`js/*.mjs`). `wb/` holds Wayback Machine snapshots. `render-report.json`
is the rendered DOM dump per page and viewport. `audit/hotgreen-audit.json` is the output of
`tools/site-audit.js`. `proto/index.html` and `deck/index.html` are the two Astra artefacts.

**One tooling caveat before the screenshots.** The homepage hero is an autoplaying H.264
MP4. Playwright's Chromium cannot decode H.264, so `hotgreen-home-desktop-00.png` and
`hotgreen-home-phone-00.png` show an empty pale hero. That is our renderer and NOT a site
defect. The faithful hero is `hotgreen-home-desktop-hero-with-video.png` and
`hotgreen-home-phone-hero-with-video.png`, rendered live with only the video swapped for a
local VP9 transcode of the same file. `hotgreen-home-hero-video-frames.png` shows frames
from the original MP4.

---

## 1. Verdicts on what Sanya said on the call (24 Sep 2026)

| # | Claim | Verdict | Evidence |
|---|---|---|---|
| a | "All our title pages have the same name" | **VERIFIED** | `<title>HotGreen Solutions</title>` on `/`, `/solutions`, `/contact` and even the 404 page (`raw/f_*`, `si_searchIndex-6AcOpXhnxqzS.json`). The meta description, `og:title`, `og:description`, `og:image` and `twitter:*` are also identical on every page. Only `canonical` and `og:url` differ. Wayback shows the homepage title was the lowercase "hotgreen" on 7 Oct 2025 (`wb/home_20251007215841.html`), changed to "HotGreen Solutions" by 7 Nov 2025. |
| b | "No alt text in any of the images" | **VERIFIED** | Every `<img>` in the served HTML carries an empty `alt` attribute. Home 42 of 42, Solutions 14 of 14, Contact 6 of 6, 404 6 of 6 (`raw/f_*`, counts include Framer's hidden breakpoint copies). In the rendered DOM, 29 visible images on Home and 7 on Solutions, all `alt=""` (`render-report.json`). This covers the wordmark (so the Home link has no accessible name), all seven partner logos, all seven team headshots and the spec table. Four carousel slide photos on Solutions are CSS backgrounds with no text alternative at all. |
| c | "A lot of the things are standalone images rather than HTML" | **PARTLY** | Most copy IS live HTML. Home shows about 586 visible words of real text including every heading, the mission copy, applications and all seven bios; the Solutions stats and the IsoStack points are live text. But the two things that matter most for credibility are images. (1) The whole HotStack 120 vs HotStack 220 spec table (source, outlet temperature, max steam pressure, both CoP rows, modular output, availability) is one PNG, `dAN8eieNfKosStSba3t4fu4VA4U.png`, copied here as `hotgreen-solutions-spec-table-image.png`. None of its words exist in the DOM or the Framer search index (grep of `raw/f_solutions`, `si_*.json`). On a phone it renders 358 px wide and is unreadable (`hotgreen-solutions-phone-04.png`). (2) All seven funders and partners, including Coca-Cola Europacific Partners and Empirical Ventures, exist only as logo images with empty alt. The names appear nowhere in visible text, only as internal Framer layer names such as `data-framer-name="CocaCola"`. So the claim is overstated on volume and right on importance. |
| d | "We're not really showing up" in search | **PARTLY, leaning VERIFIED** | The brand is findable, but mostly through other people's pages. On the search tool available here (a US engine, not Google UK, so directional only) the own homepage ranked 9th of 9 for "HotGreen Solutions", 7th for "hotgreen heat pump", 8th for "HotGreen", 6th for "HotGreen steam", behind Dealroom, Tech.eu, PitchBook, Vestbee, LinkedIn, the CCEP newsroom and The Grocer. For a category query ("industrial high temperature heat pump UK startup food and beverage steam") the own site did not appear at all; HotGreen only showed through Vestbee and Tech.eu while competitor Futraheat showed through pv magazine. The own result titles are the bare "HotGreen Solutions" for both `/` and `/solutions`. For "HotStack heat pump HotGreen" the engine found no HotStack content anywhere. Contributing causes on the site: identical titles and descriptions, no structured data, 3 URL sitemap with no `lastmod`, specs locked in an image, several `h1` per page. See section 5. |
| e | Not really updated in about a year; does not reflect the current stage | **PARTLY** | The site is not frozen. The HTML carries `<!-- Published Aug 13, 2026 at 9:54 PM UTC -->` and Wayback shows real edits: five investor logos incl. CCEP added between 7 Oct and 7 Nov 2025; the spec table image and the "2027 and 2028 deployments" waitlist heading added between Oct 2025 and the 6 Feb 2026 publish; Ben Vellacott added by 6 Feb 2026; Sera Evcimen added by the 22 May 2026 publish (`wb/`). But the story layer has not moved. Hero, mission, applications copy (typo included) are word for word the same as on 7 Oct 2025. The hero video file is `Last-Modified: Tue, 09 Sep 2025`. The Solutions page text and images are identical between the 6 Feb 2026 snapshot and today. The 13 Aug 2026 publish changed no visible text or image on Home compared with the 12 Jun 2026 snapshot. And none of the current stage is stated anywhere in text: no £1.2M pre-seed, no Empirical lead, no CCEP investment, trial or accelerator, no first deployment date, no talks with other majors, no seed raise. So: the team and logo rows get patched, the narrative is about a year old. |
| f | Investors and customers "all have to go down the same path" | **VERIFIED** | Nav and footer are only Home, Solutions, Contact, plus a LinkedIn icon. Every CTA ends at one identical 4 field form (First name, Last name, Email, Message): "Learn more about our solutions" goes to `/solutions`, "Join our Waitlist" goes to `/contact`, and the same form is embedded at the foot of every page. No audience selector, no investor page, no deck or data room, no case study, no download, no calculator, no email address or phone number (`render-report.json` links and inputs, `raw/f_*`). |
| g | There is no press or news page | **VERIFIED** | The Framer route table in `js/script_main.DZhriuBJ.mjs` lists exactly four routes, `/`, `/404`, `/contact`, `/solutions`, and the CMS collection map is empty (`br={}`). `/news`, `/press`, `/media`, `/blog`, `/insights`, `/about`, `/team`, `/investors`, `/careers` all return 404. The site links to none of the coverage that exists (Tech.eu 20 Oct 2025, Vestbee, The Grocer, CCEP newsroom, Empirical Ventures news, NZTC Pioneer portfolio, StartupHub, Startup Story, startupmag, SignalBase; see section 5). |
| h | Reads as a mission focused startup rather than a credible equipment provider | **VERIFIED** | The homepage's second `h1` is literally "HotGreen is on a mission to save manufacturers money while cutting carbon." In the visible text of all three pages the words customer, investor, patent, CCEP, Coca, certification, warranty, service, datasheet, quote and case study each occur zero times (`render-report.json`). The primary product CTA is "Join our Waitlist", not a site assessment or quote. The only technical spec sheet is a picture. No address, phone, company number or privacy notice. The only product visual is a CGI render; the rest is generic brewery photography with no HotGreen unit in real use. Credit where due: the team block is strong (real headshots, bios citing Oliver Wyman, Alfa Laval, Atlas Copco, Centrica, IAM300). |

### Extra defects found that Sanya did not mention

1. **Sera Evcimen's LinkedIn icon opens Ben Vellacott's profile.** The link inside her card is `https://www.linkedin.com/in/benvellacott/?originalSubdomain=uk`, confirmed by DOM ancestry and by hovering her card (`hotgreen-home-desktop-sera-hover.png`, `raw/f_home` shows Ben's URL twice and no URL for Sera). Her card was added by the 22 May 2026 publish, so it looks copied from Ben's.
2. **The contact form's Message box is named `lastname`**, the same `name` as the Last name field: `<textarea required name="lastname" placeholder="Hi,">` (`raw/f_contact`, same on every page). Framer posts the raw FormData, so both values go out under one key. What arrives in their inbox was not tested because nothing was submitted; worth asking Sanya to open a recent submission and check the message and surname both came through. "First name*" is labelled required but has no `required` attribute. The example email is `jane@gmail.com`.
3. **No privacy notice anywhere.** The form collects name and email on every page, and the word "privacy" appears zero times in any page (`grep -ic privacy raw/f_*`). No cookie banner either; `tools/site-audit.js` found zero cookies before interaction, and the only third parties are Framer's own hosts plus Google Fonts (Noto Sans, Space Grotesk, DM Sans) loaded from Google (`audit/hotgreen-audit.json`).
4. **Three product names on one page.** Desktop `h1` "Introducing the HotStack", phone `h1` "Introducing the HotStack 300", the spec table image "HotStack 120" and "HotStack 220". The desktop and phone carousel copy has drifted too ("adjustable compression ratio" vs "infinitely variable compression ratio"; "energy bill" vs "energy bills") (`js/FPahGFBIlhaZrk-...mjs`, `render-report.json`).
5. **Heading structure.** Home phone renders seven `h1` (hero, mission, Partners, Applications, Our leadership & advisors, Get in touch, plus one empty). Solutions marks "€250k", "1,500" and "4x" as `h1`.
6. **Copy slips.** "Our current focus in on the Food and Beverage sector" (present since at least 7 Oct 2025). "Pasteurisation" next to "Sterilization". Sterilization reuses the Pasteurisation icon (`hotgreen-home-desktop-03.png`; the layer name "Pasteurisation" appears 9 times in `raw/f_home`).
7. **Hero has no button.** The first CTA on the homepage appears in the second section.

---

## 2. Per page table

Counts of `<img>` are from the served HTML, which contains Framer's desktop, tablet and phone copies; visible counts are from the rendered DOM at 1440 px.

| Field | `/` (Home) | `/solutions` | `/contact` |
|---|---|---|---|
| Status | 200 | 200 | 200 |
| `<title>` | HotGreen Solutions | HotGreen Solutions | HotGreen Solutions |
| Meta description | "HotGreen Solutions is an industrial high-temperature heat pump company providing process heat from electricity." | identical | identical |
| Visible `h1` (desktop) | "Ultra-efficient low carbon steam for industry"; "HotGreen is on a mission to save manufacturers money while cutting carbon."; "Get in touch" | "Introducing the HotStack: A low carbon heat pump solution for industry"; "€250k"; "1,500"; "4x"; carousel heading; "Get in touch" | "Get in touch" |
| Canonical | https://www.hotgreensolutions.com/ | .../solutions | .../contact |
| OG | og:type website, og:title and og:description as above, og:image `m3XIcJalJenO2Tsd0XLm1zVY.jpg` (1280x720 product render, `hotgreen-og-image.jpg`), og:url self | same, og:url self | same, og:url self |
| Robots meta | `max-image-preview:large` | same | same (404 page is `noindex`) |
| Structured data | none | none | none |
| Visible words | about 586 | about 223 | about 47 |
| `<img>` served / empty alt | 42 / 42 | 14 / 14 | 6 / 6 |
| Text inside images | 7 partner logos (names only in images); wordmark | the full HotStack 120 vs 220 spec table | wordmark only |
| Forms / fields | 1 visible form: firstname (not required), lastname, Email, textarea named lastname; 12 hidden honeypot inputs | same form | same form |
| CTAs | "Learn more about our solutions" x2 to `/solutions`; 7 LinkedIn profile links on team cards; form Submit | "Join our Waitlist" to `/contact`; form Submit | form Submit only |
| Nav / footer | Home, Solutions, Contact; footer same plus LinkedIn company page and "HotGreen™ Solutions is the trading name of HotGreen Ltd" | same | same |
| Measured transfer (lab, no throttling) | 2.75 MB desktop, 2.66 MB phone, **plus a 19.4 MB hero MP4** our Chromium did not fetch | 4.10 MB desktop, 2.06 MB phone | 0.38 MB |
| Lab LCP / CLS | 1.37 s (H1) / 0.001 desktop; 2.31 s (image) / 0 phone | 0.74 s / 0.001 desktop | 0.36 s / 0 |

`robots.txt` allows everything and points at the sitemap. `sitemap.xml` lists `/`, `/contact`, `/solutions`, with no `lastmod`, `changefreq` or `priority`. Favicons are set (light and dark SVG plus apple touch icon). `lang="en"`, no `hreflang`.

**Framer markers.** `<meta name="generator" content="Framer 74b9e1d">`, `server: Framer/2127774`, `data-framer-ssr-released-at="2026-08-12T12:02:11Z"`, `data-framer-page-optimized-at` 13 Aug 2026 (Solutions, Contact) and 15 Aug 2026 (Home), HTTP `last-modified: Sat, 15 Aug 2026 10:11:27 GMT`, HTML comment "Published Aug 13, 2026 at 9:54 PM UTC". Framer's on page editing iframe (`framer.com/edit`) and `events.framer.com` load for every visitor.

**Weight and Core Web Vitals-ish observations** (lab only, fast connection, not field data).
- Hero video `BMQ7MVlvu7zlrRMQIsBc6Sgx9g.mp4`: 19,361,712 bytes, 10 s, 1440x800, H.264 at about 15 Mbps, and it carries an AAC stereo audio track that is never heard because the video is muted. It is a single source with no mobile variant, set to autoplay and loop on phone as well.
- Team headshots are served "lossless" at about 0.83 and 0.85 MB each for 320x401 px cards (`McOKa7fiV09zTnO5pVB3Pt7Y.jpg`, `FpXrAExeZMykguCSGJA5JJNA.jpg`).
- Solutions brewery photo `aOke0YSxvV2FIPDUBqHas9LWvlQ.jpeg` arrives at 2.96 MB on desktop; a carousel photo `IQBU8Max6Rl0zP6Rd5ENwuK3qQ4.jpeg` loads at its full 6048 px width (1.15 MB) on phone.
- Originals uploaded far larger than needed: product render PNG 4996x3823 (2.2 MB), Applications background PNG 8000x4500, a 6624x4421 JPEG.
- Zero page errors, zero failed requests, CLS effectively 0 on all pages.

---

## 3. The visual read

**It looks current, not dated.** This is a 2024 to 2026 Framer site and a stranger would not call it old. Dark forest green (`rgb(0,29,17)`) sections alternating with a pale mint (`rgb(236,244,237)`) and one bright green accent (`rgb(57,203,103)`) on pill buttons. Type is Space Grotesk throughout with DM Sans on buttons and Noto Sans only in the footer line. A floating rounded "glass" nav bar, soft mint to lilac gradient backgrounds, thin green wave line graphics, rounded cards with green borders. Motion is gentle: fade and rise on scroll, an autoplaying partner logo carousel, a four slide photo carousel on Solutions, team cards that flip to a bio on hover (`hotgreen-home-desktop-team-hover.png`).

**Imagery.** The hero is a 10 second loop that opens on a CGI render of the green HotGreen unit standing in a brewery, then cuts to beer bottles on a filling line (`hotgreen-home-hero-video-frames.png`). Below that, stills of beer bottles, a beer tap and brewery tanks. Seven real team headshots in mixed styles (studio grey, hedge, Italian street), which reads warm but not corporate. The Solutions hero is a clean product render on dark green (`hotgreen-solutions-desktop-00.png`). No photograph shows a HotGreen unit on a real site, which is fair for a company whose first deployment is 2027, but it also means nothing on the page proves the machine exists outside a render.

**How it feels to an investor.** Tidy and trustworthy on the surface, and the team block does real work. But the investor has to decode logos to learn who backed them (no alt, no captions, no "led by"), finds no round size, no traction statement, no IP statement ("patent-pending" never appears), no press, and no route of their own. It reads as a pre-seed brochure.

**How it feels to a Coca-Cola procurement or plant engineer.** The hero promises "low carbon steam for industry" and then the imagery is craft beer. The numbers they would actually check (outlet temperature, steam pressure, CoP, modular output, availability) sit in a small PNG table that cannot be copied, searched or read on a phone, next to "Join our Waitlist". There is no datasheet, no install or integration detail beyond "3-5 days", no service, warranty or standards language, no phone number, no address. Their own employer's logo is on the page with no explanation of the relationship. It feels like a startup asking for patience rather than a supplier ready to be specified.

**Phone.** Layout holds, nothing overflows. Weak spots are the unreadable spec table image (`hotgreen-solutions-phone-04.png`), carousel arrows sitting on top of the slide heading (`hotgreen-solutions-phone-03.png`), a one logo at a time partner carousel, and seven full width team cards stacked into a long scroll.

---

## 4. Every factual claim on the site, and what is stale

| Claim on the site | Where | Status against the call and public record |
|---|---|---|
| "Ultra-efficient low carbon steam for industry" | Home hero | Unchanged since at least 7 Oct 2025 |
| "industrial heating process, collectively responsible for 19% of global emissions" | Home mission | Press (Tech.eu) says "over 20 per cent". Minor mismatch |
| "since industrial heat pumps were first deployed 150 years ago, no one has realised mass market adoption" | Home mission | Unchanged |
| Partners: Coca-Cola Europacific Partners, Empirical Ventures, Deep Science Ventures, First Imagine!, Conduit EIS Impact Fund, Almanac Ventures, Net Zero Technology Centre (logos only) | Home carousel, `hotgreen-partner-logos.png` | Matches the £1.2M pre-seed (led by Empirical, CCEP strategic participation) reported Oct 2025, but the site never says so. CCEP's role as investor, trial host and accelerator is invisible |
| "Our current focus in on the Food and Beverage sector": pasteurisation, brewing, distillation, drying, sterilization; future pharma, chemicals, pulp and paper, textiles | Home Applications | Unchanged since Oct 2025; typo still live |
| Team: Georgia Ware CEO, Andrew Anderson CTO, Sera Evcimen VP Technical Operations, Ben Vellacott Senior Heat Pump Engineer, Charles Clark Head of IP, Anders Nyander Manufacturing Advisor, Corey Blackman Technology Advisor | Home team | Seven people shown. Sanya (Engagement Manager, joined end of August 2026) is not on it. Sera's LinkedIn link is Ben's |
| "€250k /year saved in energy bills versus using a traditional boiler for a typical facility" | Solutions stat | Wording changed from "an average EU facility" (Oct 2025). Press phrases it as "$250,000 savings per MW annually" |
| "1,500 TCO₂/year avoided per MW of installation" | Solutions stat | Unchanged |
| "4x more energy efficient than a traditional boiler" | Solutions stat | Matches press |
| "*Numbers provided are estimates based on projected product performance..." | Solutions | Honest disclaimer, live text |
| "Reduce your energy bill(s) by 30%"; "install your heat pump in as quick as 3-5 days"; "compatible with airsource, groundsource or waste heat streams. And, the only solution that lets you switch post-installation" | Solutions carousel | Live text, rotates, desktop and phone versions differ |
| HotStack 120: air source, up to 120°C, 2 bar, CoP 2.8 (10 to 120°C) and 4.5 (50 to 120°C), 0.5 MW stackable to 10 MW, "Currently taking 2026 orders for 2027 delivery". HotStack 220: waste heat, up to 220°C, 25 bar, same CoP rows, "2027 orders for 2028 delivery" | Solutions, image only | "2026 orders" is three months from expiring. Product names conflict with "HotStack" and "HotStack 300" elsewhere on the page |
| "Join our waitlist now for 2027 and 2028 deployments" | Solutions | Updated from "2026 and 2027" between Oct 2025 and Feb 2026. Consistent with a first deployment in Q1 to Q2 2027 but says nothing about it |
| IsoStack compressor: single stage 110°C lift, 10 to 100% turndown, modular and stackable | Solutions | Unchanged since Feb 2026; "patent-pending" absent |
| "HotGreen™ Solutions is the trading name of HotGreen Ltd" | Footer | No company number, address, email, phone, privacy link or copyright line. No copyright year exists, so none is stale |

**Missing entirely, per the call and public sources:** the £1.2M pre-seed and who led it; CCEP as investor, trial host and accelerator; the first deployment in a Coca-Cola plant around Q1 to Q2 2027; talks with other food and beverage majors; the planned seed raise; NZTC Pioneer portfolio membership; the patent-pending isothermal compressor; any press link. Dealroom and PitchBook list total funding of $2.85M, which also appears nowhere (unverified here).

---

## 5. Search presence

Tool used is a US based search engine, so rankings are directional and are not Google UK.

| Query | Own site position | What ranks above it |
|---|---|---|
| HotGreen Solutions | 9th of 9 (`/`) | Dealroom, Tech.eu, PitchBook, Vestbee, LinkedIn, CCEP newsroom, The Grocer, SignalBase |
| hotgreen heat pump | 7th of 9 | Tech.eu, Vestbee, CCEP, The Grocer, Net Zero Technology Centre, StartupHub |
| HotGreen | 8th of 10 | Dealroom, Tech.eu, PitchBook, Vestbee, LinkedIn, CCEP, NZTC |
| HotGreen steam | 6th of 9 | Vestbee, Deep Science Ventures job board, Tech.eu, StartupHub, SignalBase |
| HotGreen steam heat pump industrial | 8th of 9 | Dealroom, Tech.eu, NZTC, The Grocer, StartupHub, a DOE brief, hotgreen.co.uk |
| HotStack heat pump HotGreen | `/solutions` 8th of 10 | The engine reported no HotStack content anywhere |
| industrial high temperature heat pump UK startup food and beverage steam | absent | pv magazine on Futraheat, Vestbee and Tech.eu on HotGreen, Danfoss, Envirotec (Johnson Controls), Enertime |

Observations. Their own result title is the bare "HotGreen Solutions" for every page. A separate result for `hotgreen.co.uk` shows the more descriptive title "HotGreen: Industrial Heat Pump Solutions", yet that domain now 301 redirects to `http://www.hotgreensolutions.com` (plain http) and then 308 to https, so the better title belongs to a page that no longer exists. The snippets search engines show are drawn almost entirely from third party press. A Google Search Console verification tag is present on the site. Press coverage exists and is linkable: Tech.eu (20 Oct 2025), Vestbee, The Grocer ("CCEP to trial UK startup's ultra-efficient heat pump"), CCEP newsroom ("CCEP invests in heating innovation with HotGreen Solutions"), Empirical Ventures news, NZTC Pioneer portfolio, StartupHub.ai, Startup Story, startupmag, SignalBase, Deep Science Ventures job board.

Sources: [Tech.eu](https://tech.eu/2025/10/20/hotgreen-solutions-raises-ps12m-for-ultra-efficient-heat-pumps/), [Vestbee](https://www.vestbee.com/insights/articles/hot-green-solutions-raises-1-2-m), [The Grocer](https://www.thegrocer.co.uk/news/ccep-to-trial-uk-startups-ultra-efficient-heat-pump/710598.article), [CCEP](https://www.cocacolaep.com/news-and-stories/hotgreen-heat-pumps/), [Empirical Ventures](https://www.empiricalventures.vc/news/hot-green-raise-preseed-to-build-ultra-efficient-industrial-heat-pumps), [NZTC](https://www.netzerotc.com/pioneer-portfolio/hotgreen/), [Dealroom](https://app.dealroom.co/companies/hotgreen_solutions), [PitchBook](https://pitchbook.com/profiles/company/770250-52), [pv magazine](https://www.pv-magazine.com/2024/10/09/uk-startup-unveils-industrial-heat-pump-for-hot-water-steam-generation/), [Envirotec](https://envirotecmagazine.com/2026/09/16/high-temperature-heat-pump-targets-industrial-process-heat/).

---

## 6. Audience journeys

| Audience | What they click | Where they land | Anything for them specifically |
|---|---|---|---|
| Investor | Home, scroll to Partners and team, then Contact | The same 4 field form | Nothing. No round, no traction, no IP, no deck, no press, no investor contact. Backers visible only as unlabelled logos |
| Customer or plant engineer | "Learn more about our solutions", then "Join our Waitlist" | `/solutions`, then `/contact`, the same form | Stats with a disclaimer and a spec table image. No datasheet, no calculator or business case, no case study, no integration, service or warranty detail, no phone |
| Partner or accelerator | Home, then Contact | The same form | Nothing distinct. The CCEP relationship is not described |

Downloadable deck: none (no PDF or download link on any page). Case study: none. Press mentions: none on site. Calculator or business case tool: none. The only routes out are LinkedIn profiles and the company LinkedIn page.

---

## 7. Astra prototype check

**https://astra-hotgreen-prototype.netlify.app** returns **200**, 212,894 bytes, `<title>` reads "HotGreen" then an em dash then "ultra-efficient low carbon steam for industry" (verbatim title, contains an em dash). The live file is byte for byte the repo copy `state/prototypes/hotgreen/index.html` (sha256 `b1d902f8...`, 212,710 bytes) except the Netlify HUD script appended at the end.

Sections, in order: nav; hero, `h1` "Turn cold air into industrial steam."; `#traction`; `#problem` ("Industry runs on heat. Heat runs on carbon."); `#technology` ("One stage. 10°C air to 120°C steam."); `#efficiency` (isothermal vs adiabatic chart); `#audiences` ("Three ways to move this forward", Back the lift / Trial it on a real line / Cut heat cost and carbon); `#sectors` ("In production now" / "Next horizons"); `#team` (seven names, monogram badges); `#faq`; `#contact` with an Investor / Pilot partner / Manufacturer toggle and a form; footer.

**It contains no cost savings or business case calculator.** Zero range inputs, zero selects, only the 4 form inputs, and the strings "saving", "calculat", "payback", "£", "€" occur zero times (`proto/index.html`).

**The tool Sanya liked is in the deck, not the prototype.** https://astra-hotgreen.netlify.app ("HotGreen x Astra", 200, 738,250 bytes) section 06, "The savings tool a serious visitor plays with", has three live sliders, steam demand in MW (`#mw`, 0.5 to 10), gas price (`#gp`, 25 to 90) and running hours (`#hr`, 2,000 to 8,760), with an output `#outSave` (`deck/index.html`). This matches the note already in `state/hotgreen/dossier.md`. Worth saying back to her accurately.

Two things to flag on the prototype before it is shown again. The sectors heading "In production now" could be read as units in production, while the first deployment is Q1 to Q2 2027. And its rationale (`state/prototypes/hotgreen/RATIONALE.md`) says no photography existed on their site, but Wayback shows real team headshots on the live site since at least 7 Oct 2025, so the monogram badges were a choice we did not need to make.

---

## 8. Screenshot and file index

Homepage desktop, scrolled: `hotgreen-home-desktop-00.png` to `-09.png`, `-full.png`; hero as a real browser shows it: `hotgreen-home-desktop-hero-with-video.png`; hover states: `hotgreen-home-desktop-team-hover.png`, `hotgreen-home-desktop-sera-hover.png`.
Homepage phone: `hotgreen-home-phone-00.png` to `-10.png`, `-full.png`, `hotgreen-home-phone-hero-with-video.png`.
Hero video frames: `hotgreen-home-hero-video-frames.png`.
Solutions desktop: `hotgreen-solutions-desktop-00.png` to `-08.png`, `-full.png`. Solutions phone: `hotgreen-solutions-phone-00.png` to `-09.png`, `-full.png`.
Contact: `hotgreen-contact-desktop-00.png`, `-01.png`, `-full.png`; `hotgreen-contact-phone-00.png` to `-02.png`, `-full.png`.
Evidence images: `hotgreen-partner-logos.png`, `hotgreen-solutions-spec-table-image.png`, `hotgreen-og-image.jpg`.
Tool output: `audit/hotgreen-audit.json`, `audit/hotgreen-audit-desktop.png`, `audit/hotgreen-audit-phone.png`.
