# Schumacher Verfahrenstechnik, online spec form for quotes. Build notes

Lead: Matthias Ufer, CEO, Schumacher Verfahrenstechnik GmbH, ctc_3L5hXyZ8hWrh8tAGC. Built 2026-10-09 by a build subagent. Nothing sent. Not committed (lead session commits).

## Live

- URL: https://astra-schumacher-prototype.netlify.app
- Netlify site id 92981739-442a-4148-b791-5f6dc6422a07, deploy id 6ac8f735215a5327e7a84bce (state ready, published 2026-10-09T14:16:29Z)
- Team SSO switched off and no password (update-visitor-access-controls returned requiresSSOTeamLogin false, requiresPassword false). Plain curl of the live URL returns the page, not a login.
- index.html sha256 8343ce24e885fedb79ec798fa77a6047340f83ee4edde202d0d56628cf47f384, 107,255 bytes. Live HTML hash is identical (no Netlify HUD injected on this deploy).
- Files in this folder are exactly the deployed set: index.html, netlify.toml, assets/ (13 files).

## What the page does

1. Buyer picks a product line, cooling components, static mixers or certified welded parts. Each line has its own fieldsets built from Schumacher's own parameters (mixer fields mirror their Anfragedokument PDF field for field, cooling fields follow their /cooling-systems capability list plus supply and return temperatures, welded fields follow /schweissexpertise).
2. Every numeric field takes metric or imperial, per field or with one global switch, converts live underneath ("= 79.25 US gpm"), accepts comma decimals and shows how it read an ambiguous entry ("Read as 12.5 m³/h").
3. Validation: required marks, whole number checks, absolute zero, email, and warnings drawn from their own limits (650 bar hydrostatic test, DN 3 to DN 1,600, 1 to 600 units, minus 40 to plus 120 °C, return colder than supply).
4. A live technical drawing redraws from the inputs (manifold, vessel, heat exchanger, cooling system, static mixer with inlet A, inflow B and length C as on their PDF sketch, welded spool with weld callouts and inspection chips), plus engineering read backs (water heat check, flow per kW, velocity at DN, Reynolds number and flow regime, mixing ratio, viscosity ratio, test to operating pressure).
5. A fixed format spec sheet (title block, drawing, numbered sections, SI value with the buyer's entry alongside, missing items in red) shown on screen, printable to two A4 pages, copyable as text, ending on the promise for that line in their words. Send is a labelled demo.

## Teardown, 44 pages queued, 31 rendered with usable content

Rendered with Playwright through the proxy CA pin (scripts/teardown.js in the session scratch). One line each.

1. Komax, Heat Exchangers RFQ (komax.com/contact/heat-exchangers-rfq). Splits process data into Tubeside and Shell Side blocks with the unit inside every label, and offers a general quote route for buyers missing data.
2. Komax, Liquid-to-Liquid RFQ. One RFQ page per product type, min, max and operating flow plus viscosity and fluids to be mixed.
3. Komax, Custody Transfer Static Mixer RFQ. Density, viscosity, line size and flange rating as required fields.
4. Primix quote survey (primixquotes.com). Seven step wizard with a sidebar stepper, a Metric or Imperial switch that names every unit, EU or outside EU, fluid group, save and return later. The category leader for this exact tool.
5. Primix, static mixer quote and price request page. Explains what drives the price and lists the data needed before the form.
6. Ross, Request a Quote (mixers.com/quote). Long single form with product and application checkboxes, no process data at all.
7. Koflo, Request a Quote. Two routes, help me choose versus in stock, each with a stated response time.
8. Protolabs Network (Hubs), instant quote. Technology cards beside a big CAD drop zone, the file is the spec.
9. Protolabs, get a quote. Account creation before any spec, a gate.
10. Delta GoCool 1500 CDU page. A Request a Quote button over a spec page, but the form only takes contact details.
11. STULZ, 13 tips for better CDU specs. The parameter list a cooling spec needs, supply and return temperatures, flow per kW, approach, wetted materials, filtration.
12. ACT, manifolds page. Explains the manifold's role in two phase cooling, contact form only.
13. CoolIT, contact page. Type of enquiry dropdown, no technical fields.
14. Stamixco, contact page. Generic contact form.
15. Statiflo, contact page. Quotation by feedback form or phone.
16. Motivair home. Product tiles for direct to chip cooling, quote page itself walled.
17. Vertiv home. Region switch and product finder.
18. CoolIT home. Two clear entry buttons, server or data centre.
19. Boyd home. Industry tiles, thin on product data.
20. Alfa Laval home. Corporate, catalogue led.
21. Koflo home. Product render as hero, quote button pinned in the header.
22. Stamixco home. Element photography and four system tiles.
23. Primix home. Big product renders, survey linked from the nav.
24. Komax home. RFQ links per product in the footer.
25. Ross home. Product hero with a request quote link in the utility bar.
26. Swagelok home. Part number search front and centre.
27. Protolabs home. Get Instant Quote as the primary button everywhere.
28. Hubs home. Instant quote promise with trust badges beside the CTA.
29. Typeform home. Form preview as the hero object, one question at a time.
30. Stripe home. Dense, footnoted numbers and a clear CTA hierarchy.
31. Rittal home. Rendered under a cookie wall only.

Walled or failed, not counted: Xometry (Cloudflare 403), nVent (403), Motivair quote page (403 Access Denied), SWEP (502), Kelvion (502), Lauda (502), Misumi (tunnel failed), Sulzer and Fluitec (404 on the paths tried), Typeform template (404), Protolabs sample quote (blank), Statiflo home (spinner only), Linear (blank in capture).

What transferred. Primix's unit switch and fluid group step, Komax's per product field blocks with units in labels, Koflo's response time per route, Hubs' drawing upload. What nobody did, so it's the edge here: a live drawing of the buyer's own part, read backs computed from their numbers, and a fixed spec sheet the engineer receives.

## Brand

- Logo: their own PNG from https://onecdn.io/media/7c8c5b59-e262-4485-86ef-cc003130dfd7/full (670 x 180, RGBA). Footer white logo is their own footer logo image (onecdn media 34a870e5, grayscale on black) with luminance turned into alpha, not redrawn. Favicon is their own favicon (onecdn media 49768343).
- Colours from computed styles on /cooling-systems: blue rgb(15,104,178) #0F68B2, text rgb(39,43,45), grey rgb(68,79,80), black. Type: Inter (theirs, self hosted from Fontsource, OFL) plus IBM Plex Mono (ours, OFL) for units and data.
- Our grammar: a drafting sheet. Grid paper, A to H frame ticks, title blocks, dimension lines, mono labels.
- Photos, all theirs from their own pages: manifold render (onecdn f53fdc76, their cooling page product card), static mixer cutaway (onecdn ee5767fa, their mixer page hero, top 14 px grey band cropped), welded bend with their own watermark (onecdn 5e7881d0, their welding page), building (onecdn 03cb6d75, shown next to their address on their pages, captioned with the address only). Zoomed for third party text, none found. No portraits, no people.

## Sources for every number on the page

- Bitkom press release "Rechenzentren in Deutschland: KI treibt das Wachstum", Berlin, 10 November 2025, https://www.bitkom.org/Presse/Presseinformation/Rechenzentren-Deutschland-KI-treibt-Wachstum , fetched 2026-10-09 HTTP 200. Quotes used: AI capacity "von derzeit 530 Megawatt auf dann 2.020 Megawatt Anschlussleistung", all German data centres "2025 um 9 Prozent auf 2.980 Megawatt gewachsen", "2030 von 5.000 Megawatt überschritten". Second way, weaker: web search results for cio.de and nordkurier.de coverage report the same 530 and 2,020 MW (search summaries, not opened). Chart widths computed, 2,980/5,000 = 59.6 %, 530/5,000 = 10.6 %, 2,020/5,000 = 40.4 %, the over 5,000 MW bar is drawn at 5,000.
- Energieeffizienzgesetz § 11, https://www.gesetze-im-internet.de/enefg/__11.html , fetched 2026-10-09 HTTP 200. (1) before 1 Jul 2026, PUE 1.5 from 1 Jul 2027, 1.3 from 1 Jul 2030. (2) from 1 Jul 2026, PUE 1.2 and 10 % reused energy, 15 % planned from 1 Jul 2027, 20 % from 1 Jul 2028, reached within two years of start.
- IEA Energy and AI was the first choice for a global number but iea.org is Cloudflare walled from here (curl 403, curl_cffi 403, Chromium "Just a moment", WebFetch 403), so it's not on the page.
- Schumacher's own facts, all fetched 2026-10-09 13:24 UTC, every page HTTP 200, control example.com 200: /cooling-systems (DN 3 to DN 1,600, hydrostatic test up to 650 bar, X ray and dye penetrant testing, 1 to 600 units, minus 40 to plus 120 °C, materials, certificates, pilot racks, prototypes and serial production, "First technical read-back within 24 hours.", +49 2261 546620, info@schumacher-vt.de), /statische-mischer (four element types and their descriptions, connection types, plastics, industries, "Auslegung und Angebot innerhalb weniger Tage", callback step), /schweissexpertise ("Angebote innerhalb von 24 Stunden", processes, VT2, X ray film, 3.000 m², defence, shipbuilding, pressure systems, plant engineering, "Wir schließen Lieferlücken"), / ("seit 1996", "Jede Auslegung passt Werkstoff, Geometrie und Wandstärke an Ihre Prozessparameter an", vessels "Jede Naht wird dokumentiert, jede Charge ist rückverfolgbar"), Anfragedokument PDF (sha256 05091ec5..., fields ASME, DGRL, PED, S.E.P, Betriebsdruck, Einbaulänge C, Werkstoff, per medium name, fluid group 1 or 2, vapour pressure above 0.5 bar, Durchfluss m³/h, Temperatur, Viskosität mPa.s, Dichte, Anschluss A and B).

## QA, all run before deploy and again on the live URL

- Cold load, nothing forced, 1440 and 390: 0 page errors, 0 console errors, 0 failed or 4xx requests, 7 of 7 images decoded, all 6 font faces loaded, scrollWidth equals viewport at both widths. Same result on the live URL.
- No reveal states to force. The only animations are CSS (headline rise, flow dashes) and they're off under reduced motion.
- Tool exercised with three input sets, values read back. Set 1, cooling example metric: ΔT 10 K, water heat check 209.3 kW, 104.7 % of the 200 kW load, 1.5 l/min per kW, 0.995 m/s at DN 80, 12 of 13 required. Switched to imperial: flow 79.2516 US gpm "= 18 m³/h", 86 °F, 87.0226 psi, back to metric returns 18 exactly. Return 77 °F below supply gives the swap warning. Set 2, mixer typed by hand, comma decimal "12,5" read as 12.5, Medium 2 in l/min converted to 1.8 m³/h: total 14.3 m³/h, 1 part in 7.94, viscosity ratio 55.56, 2.02 m/s at DN 50, Re 100,950 turbulent, Leitstrom and V element pointer for gas into liquid. Adding a third medium moved required from 21 to 27. Set 3, welded part typed by hand: test 700 bar warns at the 650 bar limit, 7× test to operating, 135 kg total. Errors: 1.5 units, "abc", bad email all flagged. Send blocked with the count, then sent after consent, showing "QUOTE WITHIN 24 HOURS." Same run on the live URL, 0 errors.
- Hand check of the maths: 18 × 1.163 × 10 = 209.3. 40.8 m³/h at DN 100, 40.8/3600/0.007854 = 1.443 m/s, Re = 999 × 1.443 × 0.1 / 0.0011 = 131,051, matches the read back.
- Print: two A4 pages for the mixer example, title block, drawing, sections, promise line.
- Every section screenshotted at 1440 and 390 and looked at. Fixes made from looking: drawing title block collided with the C dimension, return label crossed hose lines, mixer "type to advise" crossed the elements, words cut mid way in the title block, DN round tripped through inches to 80.01 (DN is now a fixed metric field), building photo rendered at the wrong aspect, product cards too tall on a phone.
- NO-AI-SLOP section 8 grep: index.html banned words only "transform" in CSS and SVG attributes, visible text 0 banned words, 0 phrases, 0 hedges, 0 paired adjectives, 0 uncontracted verbs, 0 em dashes, 0 emoji, 0 exclamation marks. Positive control file with "seamless", an em dash, "it is" and a rocket emoji was caught on every line. Prose sentence length stdev 8.7.
- Colon and dash scan over every visible string the page can show (838 unique lines across all three lines, examples, imperial, messages, sheet, sent panel, SVG text, options, placeholders, alt text): 0 colons, one hyphen in "Tri-Clamp" (a trademark, proper noun exemption). Positive control caught a planted colon, hyphen and en dash.
- Live: HTTP 200, title "Request a quote | Schumacher Verfahrenstechnik", HTML sha256 identical to the deployed file, 13 of 13 assets 200 and byte matched, the one script block parses (node --check) from the downloaded live HTML.

## Must not ship as is

1. The form sends nothing. Wire submit and file upload to their mail or CRM, then remove the demo wording in the send panel.
2. Example values. "Load example values" fills every line with made up data (Example GmbH, Example contact, name@example.com, EX 001, a 16 port direct to chip manifold, process water and polymer solution, a 12 off defence spool). The hero drawings show the same examples. All labelled as examples on screen and on the sheet. Remove or keep labelled.
3. The concept strip at the top, the Astra line in the footer and the noindex meta tag come off.
4. Our assumptions written in their voice, for them to confirm: "that sheet is what our engineers quote from" (hero), "On the live page this sheet goes straight to our team in Wiehl with your files attached" (send panel), "Our engineers read your data back to you, with any open questions" (cooling next step), "Buyers spec in the units their own datasheets use", and "Warmer return water is easier to reuse, so the cooling form asks for supply and return temperatures up front".
5. Promise wording. Their English page says "First technical read-back within 24 hours." The page drops the hyphen ("read back") under our no dash rule. The welded part line ("Quote within 24 hours") and the mixer line ("Design and quote within a few days") are translations of their German pages. The brief asked to end on the 24 hour promise, but their mixer page promises a few days, so the mixer sheet ends on that instead of inventing 24 hours for mixers.
6. Read back thresholds and hints are ours, labelled as pointers: laminar below Re 2,300, the X element pointer above 1,000 mPa·s, the water heat check at about 4.19 kJ/kg·K. Mixer descriptions in the hints are translations of their own copy.
7. The reference number format "RFQ yymmdd XXXX (demo)" is invented. They'd set their own.
8. DN is a metric field only, NPS goes in the notes.
9. The privacy tick links to their real English privacy policy, which doesn't yet mention this form.

## Couldn't verify

- IEA global data centre figures, walled four ways, left out.
- Whether Schumacher's product renders are photographs or generated images. They're their own published product images, used as their product cards use them, never captioned as installed equipment.
- Lighthouse not run.
