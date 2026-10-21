# Design reference teardown for Systemhaus-Hertling

Run on 2026-10-21. Read only. Every site was rendered with `teardown.js` (Chromium 1194 through the egress proxy, SPKI pinned, viewport 1440x900, locale en-GB, five desktop frames down the page plus one 390px mobile frame). Fingerprints are in `fingerprints.jsonl` and screenshots are in `shots/` (`<slug>__0..4.jpg` desktop, `<slug>__m.jpg` mobile). Proof facts were read from the render and cross-checked against each homepage's HTML text. Where a fact came only from a search result or from my own reasoning, it is marked INFERRED.

**Labels.** `[V]` means VERIFIED, seen in the render or present in the page HTML fetched on 2026-10-21. `[I]` means INFERRED, from a search snippet, a filename or my own reading, and not confirmed on the page.

---

## 1. Counts

| | n |
|---|---|
| Queued in `sites.txt` | **60** (1 client baseline, 17 comp_hh, 11 comp_de, 11 msp_world, 20 design) |
| Rendered (HTTP 200 in Chromium) | **57** |
| Walled or unavailable, not described anywhere in this file | **3** |

**Walled or unavailable, by name.** Each was retried once in Chromium and once with `tools/fetch-walled.py` (curl_cffi Chrome, Safari and Firefox TLS fingerprints).

- **electric.ai** (msp_world). Cloudflare "Just a moment..." 403 in Chromium twice, and 403 through curl_cffi.
- **ramsac.com** (msp_world). Same Cloudflare 403 in Chromium twice and through curl_cffi.
- **sva.de** (comp_de). HTTP 503 "Dienst derzeit extern nicht verfügbar" in Chromium and curl_cffi. This is an outage or block on their side or ours. It is not evidence about their site.

The screenshots of these three in `shots/` show only the wall page. Their rows in `fingerprints.jsonl` describe the wall, not the site.

**Rendered but partly obscured.** These sites are kept, with the caveat noted.
- **stripe.com.** A product modal ("Accept and optimize payments globally") is open on every frame. The script's cookie clicker matches `/^accept/i`, so it probably clicked a product tile `[I]`. Its DOM fingerprints still count, but it is excluded from the visual pattern counts.
- **nothing.tech.** A store-locator modal ("Looks like you're in United States") covers every frame. Excluded from the visual pattern counts.
- **posthog.com.** The page reports a height of 900 because the content scrolls inside a fake desktop window, so all five frames show the same first screen.
- **Consent or locale modals over frames 1 to 4.** helltho.de, connectit24.de, nts.eu, bechtle.com (country picker) and itm8.com (language picker). Frame 0 and the HTML were used for these.
- **Animations caught mid-play.** mx-it.com frame 0 (intro blur), sellenschlo-it.de frames 1 to 4 (fade-in), cloudflare.com frame 1 (blank), notion.com frame 2 (skeleton), resend.com frame 2 (white box).
- **Mid-count counters.** Values caught mid-count on mars-solutions.de and datagroup.de are not quoted. The HTML targets are used instead.

**How the Hamburg list was built.** All seven named firms were found and confirmed by their own page or Impressum.
- **hagel-it.de**, named on the page `[V]`.
- **layer-x-it.de** (layer-x.de redirects there), title "IT-Dienstleister Hamburg Layer-X" `[V]`.
- **fl-itservice.de**, with a Hamburg office at Cremon 11 `[V]`.
- **it-reinbek.de.** The Impressum names Dominik Schäfer, Schröders Stieg 6b, 21465 Reinbek `[V]`.
- **base2itc.de.** The domain came from its elioplus and TANSS profiles. The footer reads Base2 IT Consult GmbH, Sollredder 6, Wentorf `[V]`.
- **sellenschlo-it.de** (sellenschlo.de answered NinjaFirewall 403). The page names Michael Sellenschlo, Gründer & Inhaber `[V]`.
- **ra-micro-hh.de.** The domain came from RA-MICRO's own VOP-Adressliste PDF. The page reads RA-MICRO Hamburg Systemhaus GmbH `[V]`.

Ten more were added from searches and directory names and confirmed by their own pages: running-bit.de, buergel-it.de, it-service247.de, helltho.de, matic-tec.de, pcprofi-systems.de (Ahrensburg), connectit24.de (Ahrensburg), novotec.de, it-concept.hamburg and arconda.ag.

Considered but not queued:
- schanzen-it.de, in WordPress maintenance mode (503).
- comspot.de, an Apple retailer and not an IT service firm.
- allmeling.de, an empty particle canvas.

Google search results for every Hamburg query I ran were dominated by hagel-it.de's own landing pages, including pages targeting Bergedorf, Wandsbek, Walddörfer and Ahrensburg `[V, from the search results]`. Its Ahrensburg page names Hertling's home turf directly: "Vor Ort in Ahrensburg, Bad Oldesloe, Reinbek, Glinde und Bargteheide übernimmt unser eigene…" `[V, page fetched]`.

---

## 2. Hamburg and German competitors

The client baseline is systemhaus-hertling.com. It is light, navy and teal, set in IBM Plex Sans and Mono, with a "SYSTEM · STATUS" card in the hero. The page is 2,327px tall with 270 words, 2 images (both the logo), no people, no proof and no prices `[V]`. Its "IT-Betreuung ohne Blackbox" block makes three claims: Persönlicher Ansprechpartner, Vor Ort und remote, and Dokumentiert von Anfang an `[V]`.

### 2a. Hamburg and the east of Hamburg (17 rendered)

| Name | URL | Proof shown | Prices | Look | Notable |
|---|---|---|---|---|---|
| hagel IT-Services GmbH | hagel-it.de | Google widget "Ausgezeichnet, basierend auf 46 Bewertungen" with named reviewer cards and "Alle Bewertungen auf Google ansehen" `[V]`. Hero chips "4,9/5 aus 5.000+ Tickets/Jahr, gemessen via TANSS" and "32 Mitarbeiter" `[V]`. "150+ Kunden · seit 2004", "Inhabergeführt" `[V]`. "Microsoft Partner" badge `[V]`. "Beste IT-Dienstleister 2026, brand eins / Statista" `[V]`. Testimonials with client logo, photo, name and role, e.g. Kristin Reiher (Inhaberin) and Yanina Jacht (Les Mills Germany) `[V]`. Fallstudien and Kundenstimmen pages `[V]`. SLA "unter 4 Stunden Reaktionszeit", "99,5 % SLA-Erfüllung", critical faults "in der Regel innerhalb von 30 Minuten" `[V]`. | Yes. "ab 29 € pro Arbeitsplatz und Monat" (Kjello line) `[V]`. "ab 50 €" full service appears only in search snippets `[I]`. | White, orange CTA, Figtree/Outfit. Office photo hero with floating stat chips and 3D isometric service art. Very long page (15,173px) `[V]`. Whether the hero photo is their own office is unknown, since the filenames are generic ("modern-workplace-team.webp") and the site also uses files named stock-*.jpg and unsplash `[I]`. | The benchmark. Free "Microsoft-365-Härtungs-Check — kostenlos, quelloffen, nur lesend" `[V]`. Customer portal "Kjello" with "Echte Bildschirme aus Kjello — keine aufgehübschten Werbebilder" `[V]`. "Monatliche Security-Berichte" in the nav `[V]`. Switch promise "Dienstleister-Wechsel in 4 – 8 Wochen, ohne Ausfall", and "Wir übernehmen Zugänge und Dokumentation vom bisherigen Dienstleister" `[V]`. Situation picker "Welche Situation passt?" `[V]`. Floating chat with a woman's photo `[V]`. |
| Layer-X | layer-x-it.de | Stat tiles "20+ Zufriedene Kunden / 10 Partner / 7 Zertifikate" `[V]`. "5★ Google Bewertungen" with no count `[V]`. ProvenExpert seal fixed bottom right, "10 Bewertungen" `[V]`. Two named testimonials with photos (Michael Bittermann, GF Gewerbepark Wanzlitz; Julia Marquardt, GF) `[V]`. "< 2h Reaktionszeit", "65% Probleme gelöst in 30 Minuten" `[V]`. Vendor logos Dell, Microsoft, Placetel, Sophos, UniFi, Veeam `[V]`. | Yes, a **Preisrechner** page. Client-Arbeitsplatz €70/Monat, virtueller Server €149, physischer Server €169, virtueller Desktop €60, all plus MwSt. `[V]` | Blue-purple gradient, typewriter headline, cartoon vector of three office workers, Titillium Web `[V]`. | Free "IT-Sicherheitscheck" page `[V]`. Sister company "WolkenBunker Provider GmbH", "Cloud Made in Hamburg" `[V]`. Process named "Layer 3 … Layer X" `[V]`. |
| FL-ITService | fl-itservice.de | Hero collage of three portrait photos of men in black polos `[V]`, presented beside "Jetzt unser Team kennenlernen", so probably their team `[I]`. Client logo strip (Zanders Garten- und Landschaftsbau, Garthe Pharmaservice, Heurs, Werner Götzkes, Seniorenservice MA and others) `[V]`. Team page `[V]`. | Yes, in a PDF (AGB_Preisliste.pdf, linked in the footer). €120 per hour on site, remote or phone. Billed per started 30 minutes on site and per started 15 minutes otherwise (the line is cut off in the text extraction). Travel €20 flat up to 40 km, then €0.40/km `[V]`. | Dark slate header bar, orange buttons, Poppins, blog cards on 3CX and SIP trunks `[V]`. | Head office in Nettetal (NRW, +49 2153), Hamburg office at Cremon 11 `[V]`. "Produkt von Lehmann / Nienhaus GbR" `[V]`. |
| IT-Reinbek (Dominik Schäfer) | it-reinbek.de | No reviews, no logos, no face `[V]`. Promises "Kostenfreie Vorabanalyse", "Antwort binnen 24 Stunden", "Vor Ort in Reinbek" `[V]`. "Wir verkaufen keine Hardware und erhalten keine Provisionen" `[V]`. | "Klare, faire Preise", no numbers. Discounts for "Schülerinnen, Schüler und Studierende" `[V]`. | Teal/white template. Hero is a washed-out stock laptop photo (files named *-unsplash-*) `[V]`. "Schnell. Flexibel. Zuverlässig." `[V]`. WhatsApp button, chat bubble and reCAPTCHA badge stacked on mobile `[V]`. | Hertling's nearest geographic rival, also in Reinbek with a mobile number in the Impressum `[V]`. Also serves private individuals and students, so it leans towards consumers `[V]`. |
| Base2 IT Consult GmbH | base2itc.de | None on the homepage. Links to Referenzen, Partner and Team pages `[V]`. 175 words in the rendered body `[V]`. | None `[V]`. | Thin Lato on white, low-poly line-network background, hamburger-only nav, six grey uppercase tiles that render empty `[V]`. | Wentorf, Sollredder 6 `[V]`. RA-MICRO's partner list gives RA-MICRO Hamburg Systemhaus the same address `[I, from that PDF]`. 27 employees per a 2023 TANSS case study `[I, search snippet]`. |
| Sellenschlo IT | sellenschlo-it.de | Hero photo of two men at laptops, one in a polo with the red Sellenschlo "S" `[V]`. Owner named on the page, "Michael Sellenschlo, Gründer & Inhaber" `[V]`. "IT-Dienstleistungen aus Hamburg seit 2003", "über 20 Jahren Erfahrung" `[V]`. Testimonials page `[V]`. Project cards tagged "Netzwerkinstallation · Hamburg" `[V]`. Partner carousel (IT-Service.Network, Placetel, noSpam) `[V]`. | None `[V]`. | White, red CTA, Outfit/Poppins, neon "AI" stock tiles (shield, clouds, racks), accessibility widget `[V]`. | The only Hamburg homepage with a `<video>` element `[V]`. |
| RA-MICRO Hamburg Systemhaus GmbH | ra-micro-hh.de | Contact table by function with direct dial numbers (Vertrieb, Zentrale, Technik, Support) `[V]`. "Mehr als 100 Jahre Erfahrung in anwaltlicher Kanzleiorganisation". Support staff are trained Rechtsanwalts- und Notarfachangestellte `[V]`. "Zertifizierungen u.a. bei Microsoft" in text `[V]`. | None `[V]`. | Light, thin Roboto, Heinrich-Hertz-Turm photo, quote headline „Sie bleiben Anwalt - wir kümmern uns um Ihre EDV" `[V]`. | Vertical niche (law firms and notaries) `[V]`. |
| running bit GmbH | running-bit.de | None. Zero images `[V]`. "feste Antwortzeiten" with no number `[V]`. | None `[V]`. | Default WordPress theme, text only, empty "Archive" and "Kategorien" widgets, green cookie bar `[V]`. | GF Christian Rath, Eifflerstraße, Hamburg `[V, Impressum]`. |
| Bürgel IT | buergel-it.de | None `[V]`. | None `[V]`. | Bought theme ("Powered by Spintech WordPress Theme"), navy/orange, stock and vector art `[V]`. Typos "Indiviudelle Beratung" and "Sofwareentwicklung", and theme filler left in ("Generous Holidays, Friday Teatime, Well Stocked Fridge") `[V]`. | Oststeinbek, Möllner Landstraße 54b, next door to Glinde `[V]`. Mixes .NET development with network administration `[V]`. |
| IT Service247 (DT Handel & Consulting GmbH) | it-service247.de | "Microsoft Solutions Partner" `[V]`. Client logo grid (Notruf Helden, VitalSet, bechtle, Intermed, Nevotec, FernUniversität in Hagen, Atlantic and others) `[V]`. Vendor logos Microsoft, WordPress, Hetzner, Zoho `[V]`. BVMW "Der Mittelstand" badge `[V]`. | Yes. "Rundum-IT-Servicepaket 650 € im Monat, feste Rate", with M365 mail, telephony, website CMS and after-hours on-call listed `[V]`. | Blue/yellow, busy header with a mobile hotline number, slider hero, isometric icons, text-to-speech widget `[V]`. | Also sells web design, SEO and ads `[V]`. |
| HELLTHO GmbH & Co. KG | helltho.de | Group photo of several men in dark shirts `[V]`, presumably the team `[I]`. Nothing else. | None `[V]`. | Plain white/blue, four line icons. A Borlabs consent modal covers the whole mobile first screen `[V]`. | Bargkoppelweg 67, 22145 Hamburg `[V]`. |
| Matic-Tec.de (Martin Otto, one person) | matic-tec.de | Founder's own studio portrait in the hero and again in "about" `[V]`. First-person copy throughout `[V]`. No reviews, logos or prices `[V]`. | "planbarer Festpreis", no number `[V]`. | White and blue, founder photo card, Du-form, minimal, 616 words `[V]`. | **Closest to Hertling's positioning.** "IT, für die sich endlich jemand verantwortlich fühlt" `[V]`. Outcomes "dokumentierte Systeme", "ein Ansprechpartner für alles" and "Änderungen, Zugriffe und Systeme bleiben nachvollziehbar dokumentiert" `[V]`. "Bei mir landest Du nicht in einem Callcenter" `[V]`. Free "IT-Betriebscheck", "Keine E-Mail nötig. Dauert max. 10 Minuten", "keinen Newsletter, keinen Anruf, keine Werbung" `[V]`. A "Und für wen nicht" section `[V]`. Niche is Finanzdienstleister and Unternehmensberatungen up to 50 staff `[V]`. Hamburg 22119 `[V]`. |
| PCProfi-Systems GmbH | pcprofi-systems.de | Stat tiles "IT-Service seit 2009", "Zertifiziert", "Gelöste Tickets pro Jahr 15.000", "24/7" monitoring, "SLA-Erfüllung 99,9%" `[V]`. Partner logos 3CX Silver, Veeam, easybell, ESET, Microsoft Partner, Securepoint `[V]`. | None `[V]`. | Navy LED-wall stock hero, flat illustrations, Roboto `[V]`. | Ahrensburg, Stormarn `[V]`. "Ticket erstellen" and "Anmelden" in the nav `[V]`, next to the copy "keine Tickets, die tagelang liegen bleiben" `[V]`. |
| ConnectIT24 | connectit24.de | Testimonials with photo, name, role, company logo and 5/5 (Physioteam Ahrensburg / Inken Wilde, Inveda.net / Dirk Pappelbaum, Versicherung Schury UG / Martin Schury) `[V]`. Counters "20+ Jahre, 1.000+ Kunden & Partner, 2.000+ Projekte, 1 ConnectIT24-Team" `[V]`. "Bewerten Sie uns auf Google" link `[V]`. | "transparent, kalkulierbar", no number `[V]`. | Blue abstract 3D stock banner. A full-screen consent modal covers the mobile first screen `[V]`. | Ahrensburg, "von Hamburg bis Lübeck", "seit 2001". Also a "Digitalagentur" building MVPs `[V]`. |
| novotec | novotec.de | Google review carousel (WiserReview widget, reviews dated 2026, "Geprüfte Bewertung") `[V]`. Partner logos Wortmann, 3CX Advanced, Aruba (HPE), Dell `[V]`. Father-and-son story "Martin und Marvin Osterhof", "aktuell 12 Mitarbeiterinnen und Mitarbeitern", "IT-Kümmerer" `[V]`. | "zum kalkulierbaren Monatstarif", no amount `[V]`. | Light grey with violet and green, Inter, rounded cards over a stock server-room photo `[V]`. | "Leise IT. Lauter Erfolge." A "Systemhaus-Wechsel in drei Schritten" switch section `[V]`. Booking calendar for a free Erstberatung `[V]`. |
| IT Concept Hamburg (Gino Marcucci) | it-concept.hamburg | Owner portrait "Gino Marcucci, Inhaber" `[V]`. Client names in text (Lufthansa, TU Hamburg, Schön Klinik Hamburg Eilbek) `[V]`. "Das sagen Kunden über IT-Concept Hamburg" section `[V]`. | None `[V]`. | Avada-style stock (businessman with floating finance numbers), red keyword-bolded SEO text, 2,611 words `[V]`. | **Already argues for documentation on its homepage.** "Zu einem guten IT Service gehört die Dokumentation der IT Infrastruktur", followed by a list of what gets documented: printers, phones, servers, WLAN access points, PCs per room and their age, software, IP plan, DHCP, passwords, backup concept and emergency plans `[V]`. |
| Arconda Systems AG | arconda.ag | "Größter 3CX-Partner in Norddeutschland", "5x 3CX Platinum Partner" `[V]`. "über 600 Cloud-Kunden" `[V]`. Reference logos (Hildebrandt, HanseMerkur, elis, Dello, Rovell Hotels, Tom Tailor) `[V]`. "TSI-Zertifiziert und DSGVO-Konform" `[V]`. | None `[V]`. | Peach-to-orange gradient, centred wordmark, 3D cloud and rack renders `[V]`. | Hosted cloud, 3CX and alarm servers for hotels and care homes. Since 1995, with branches in Hamburg, Berlin and Singen `[V]`. |

### 2b. Germany (10 rendered, 1 unavailable)

| Name | URL | Proof shown | Prices | Look | Notable |
|---|---|---|---|---|---|
| Bechtle | bechtle.com | "16.000 Mitarbeitende, 112 Nationen, 766 Azubis, 70.000 Kunden" `[V]`. A customer story (wind-turbine PLM) as the hero `[V]`. | Webshop product prices only (patch cable €10,39, iPhone €767,62), no service prices `[V]`. | Corporate green, shop-first homepage `[V]`. | Not a model for a one-person firm. |
| CANCOM | cancom.de | "1992, München, 80+ Standorte, 5.300 Mitarbeiter, SDAX, 200+ Technologie Partner" `[V]`. "Über 40.000+ Kunden vertrauen uns" with logos (Serviceplan, Münchenstift, Klinikum Peine, Caritas, BayWa) `[V]`. | None `[V]`. | White with a red vertical side rail, skyline photo, lavender rounded panels `[V]`. | A red emergency box, "Sie haben einen Cyber-Security Vorfall?", with a 24/7 phone number and "vom BSI qualifizierter APT-Response-Dienstleister" `[V]`. |
| netgo | netgo.de | Award badges (Bester MSP 2025 ChannelPartner, Service Provider Awards, kununu Top Company) `[V]`. Photo of the team on stage with certificates `[V]`. "ISO 9001:2015 · kiwa zertifiziert" `[V]`. | None `[V]`. | Near-black and orange, dark stock hero slider `[V]`. | A persistent webinar popup on frames 2 to 4 `[V]`. |
| DATAGROUP | datagroup.de | "Zertifiziert nach ISO 27001, ISO 9001 und SOC 2", "Über 4.000 IT-Spezialist*innen" `[V]`. Case studies with numbers ("rund 17.000 Tickets pro Monat", "80 % Erstlösungsquote", Harry-Brot) `[V]`. SAP Gold Partner `[V]`. | None. Copy "Transparent kalkulierbar" `[V]`. | White and red, executive photo hero, red icon counters `[V]`. | "Ein zentraler Ansprechpartner" as a bullet `[V]`. |
| Medialine | medialine.com | Podcast with CEO and COO (Hörhammer) `[V]`. A "Hacked?" button in the header `[V]`. | None `[V]`. | Dark blue tech stock, neon AI imagery `[V]`. | |
| SVA | sva.de | Unavailable (503). Not described. | | | |
| deeploi (Berlin) | deeploi.io | Named testimonials with photo and "role @ company" (Jana Theisel @ Peec AI, Kieu Pham @ HOLY Energy) `[V]`. Eight linked "Case Study" pages `[V]`. Claims "90 % Less Manual IT Effort, 95 % Faster…" `[V]`. "As seen in" press logos (Handelsblatt, WirtschaftsWoche, t3n, golem.de and others) `[V]`. ISO 27001, DSGVO and NIS2 claims `[I, search snippet]`. | A Pricing page in the nav `[V]`, amounts not checked. | Blue-green gradient. A tabbed product tour in a MacBook frame shows the real dashboard. Scroll-scrubbed text reveal with 17,449 style mutations `[V]`. | The German example of "show the actual product" `[V]`. |
| mars solutions | mars-solutions.de | Badge "Bester IT-Dienstleister 2026 Platz 1 Computerwoche ChannelPartner" `[V]`. "über 20 Jahre Erfahrung, mehr als 60 Mitarbeiter, über 300 aktiv betreute Kunden, mehr als 47.000 bearbeitete Tickets pro Jahr" `[V]`. ISO 27001 data centres `[V]`. GF quote with photo (Ralf Schwarzmaier) `[V]`. | A "Full Managed IT Kalkulator" is linked `[V]`, amounts not checked. | Crimson corporate, circuit-board stock `[V]`. | Offers an "IT-Notfallkarte" `[V]`. |
| NTS | nts.eu | **Live customer-satisfaction scores on the homepage**, "Kundenzufriedenheit letzte Woche 1.07, letzter Monat 1.06, Durchschnitt 2025 1.08" `[V]`, probably on the school-grade scale where 1 is best `[I]`. Counters in the HTML: 910 Team, 27 Standorte, 338 Mio € Konzernumsatz 2025, 1000 Kunden, 793 Certifications `[V]`. | None `[V]`. | Orange duotone knight, "MEET THE THREAT HUNTERS" `[V]`. | The only German site in the set that publishes a running service metric `[V]`. |
| mx-itsolutions | mx-it.com | "Apple Premium Technical Partner und Jamf Elite Partner" `[V]`. A team row of named people with roles (Memoji avatars) `[V]`. A testimonial with name and role (Johannes Kliesch, Gründer & GF) `[V]`. "Reaktionszeiten von unter einer Stunde", Mo–Fr 9–18 `[V]`. "30 Mitarbeitenden" `[V]`. | "Ein fester Fixpreis pro Monat, oder Abrechnung nach Zeit", no number `[V]`. | Apple-like white, Neue Montreal, squircle-masked photos, Lenis with GSAP ScrollTrigger `[V]`. | The best-designed German MSP in the set. A "Kostenfreie IT-Analyse" CTA in a floating pill nav `[V]`. |
| IT-HAUS | it-haus.com | A customer quote list, "Das sagen unsere Kunden über uns" `[V]`. "Gründung 1998" `[V]`. | "monatliche Pauschale", no number `[V]`. | Black and green forest photo, Poppins `[V]`. | A "Cyber Security Check" CTA `[V]`. |

**Across the 17 Hamburg homepages** (from the HTML, with the regex checked against cloudflare.com and notion.com where it does find their status links):
- **Public status page.** 0 of 17 `[V]`.
- **Published price.** 4 of 17 `[V]`. They are hagel (ab 29 €/AP), Layer-X (calculator, €70 per client per month), IT Service247 (650 €/Monat package) and FL-ITService (€120/h, in a PDF).
- **Review count shown.** 2 of 17 `[V]`. hagel shows 46 Google reviews and Layer-X a ProvenExpert seal with 10. Layer-X's Google mention is "5★" with no count. novotec shows a Google review carousel with no total.
- **A named person's face.** 5 of 17 `[V]`: Matic-Tec (founder), IT Concept (owner), hagel (testimonial faces), Layer-X (two testimonial photos) and ConnectIT24 (customer faces). FL-ITService, Sellenschlo and HELLTHO show staff photos without naming the people in them.
- **A free check or analysis (beyond a free first call).** 4 of 17 `[V]`: hagel (M365-Härtungs-Check tool), Layer-X (IT-Sicherheitscheck page), Matic-Tec (IT-Betriebscheck tool) and IT-Reinbek (kostenfreie Vorabanalyse). A free first consultation is close to universal (hagel, Layer-X, Sellenschlo, ConnectIT24, novotec and others).
- **Vendor logo row on the homepage.** 6 of 17 `[V]`: Layer-X, Sellenschlo, IT Service247, PCProfi, novotec and Arconda. hagel shows a single "Microsoft Partner" badge.

---

## 3. What the best MSP sites do to earn trust that the Hamburg ones don't

The sources are nine rendered MSP sites: centrexit.com, speedster-it.com, rocketit.com, networkfish.com, integrisit.com, airit.co.uk, kleri.com, itm8.com and itsjefen.no.

| Move | Who does it (all `[V]`) | Hamburg equivalent |
|---|---|---|
| **Ratings from several platforms, with scores, in the hero.** | Speedster has "Google 4.7, Trustpilot 4.4, Clutch 5.0" in the first screen, linked to a /reviews/ page, plus an embedded Google Map of the office showing its rating. Integris has a badge row (Clutch, Google Reviews, CRN MSP 500, Inc.). | Only hagel (46 Google) and Layer-X (10 ProvenExpert) show a count. |
| **Per-user price plus a calculator in the first two screens.** | Speedster has "From £25 per user/month", "1–25 users… No long contracts", a "Calculate your price" button and "IT Support Pricing" in the nav. | hagel and Layer-X do. Most don't. |
| **A founder who signs and invites direct contact.** | centrexIT has "A Note From Our Founder… Dylan Natter, Founder & CEO. Want to reach me directly?". Rocket IT has a founder cut-out (Matt Hyatt) and an origin story ("Founded in 1995 from a rented apartment near Atlanta"). | Matic-Tec, and IT Concept partly. |
| **Measured continuity of people, not just "fester Ansprechpartner".** | centrexIT has "6+ year average tenure, 4x the industry average", a testimonial "…the same three people. That continuity is worth more than any SLA.", and the counters "292/292 Satisfied (90 days)" and "5,570+ Tickets resolved (90 days)". | Everyone says "fester Ansprechpartner". Nobody measures it. |
| **Entry by situation instead of by service.** | centrexIT, "How do we usually start?": Leaving your IT vendor, Outsourcing IT for the first time, Lost our IT person, Security incident, compliance pressure. | hagel ("Welche Situation passt?") and novotec (switching section). |
| **Friction removed from the first step, and said out loud.** | centrexIT: "2 min Cyber IT readiness check. Free. No email required." / "30 min Talk to our team. No pitch.". Network Fish: a free on-site survey where an engineer "leaves you with a written report. No charge.", with "Usually responds within 2 hours" under the form. | Matic-Tec ("Keine E-Mail nötig"). |
| **Confidentiality used as a stance.** | centrexIT anonymises testimonials by role and says why: "We keep company names confidential because privacy is non-negotiable". | None. |
| **Ops transparency in the header.** | ITsjefen (Trondheim) has "Driftsmeldinger" (service status messages) and "Fjernhjelp" as the two header buttons, and names ISO27001, EN50600 and NSM GP2.0 in the intro. | None (0 of 17). |
| **Customer stories led by one hard number.** | Kleri: "45 000 dokumenter. Én felles oversikt.". Air IT: "78% self-service requests resolved within 5 minutes", "16+ years", "1646+ customer partnerships". | hagel has Fallstudien. The rest don't. |
| **Own staff photographed in branded clothing, in their own office.** | Speedster has an engineer in a branded jacket facing the London skyline. Air IT has staff with a branded mug and an "AIR" polo. itm8 has staff photos in its accordion panels. | hagel, FL-ITService and Sellenschlo come closest. The other Hamburg sites use stock. |
| **Process as visible steps.** | Rocket IT has a scroll-driven three steps (Roadmap, Foundation, Activation) with isometric art, built on GSAP ScrollTrigger. | Matic-Tec (Verstehen, Struktur schaffen, Betreiben, Weiterentwickeln). |

What none of them do, and Hamburg doesn't either: no MSP homepage in the set shows an actual piece of client documentation, a change log or a handover file. That gap fits "IT ohne Blackbox" exactly. The nearest are hagel's real Kjello portal screens and deeploi's real dashboard.

---

## 4. Design patterns across the design leaders, with the fingerprint numbers

There are 20 design sites. DOM counts below are over all 20. Visual pattern counts are over 18 (stripe and nothing excluded because a modal covered them). The comparison groups are comp_hh (17), comp_de (10 rendered) and msp_world (9 rendered).

| Fingerprint | design (20) | comp_hh (17) | comp_de (10) | msp_world (9) | client |
|---|---|---|---|---|---|
| Uses `clip-path` (masked or rounded media) | **19** | 8 | 5 | 4 | 0 |
| Uses `backdrop-filter` (frosted bars and panels) | **15** | 3 | 4 | 2 | 0 |
| Uses `mix-blend-mode` | **15** | 1 | 2 | 1 | 0 |
| Has a `<video>` | **7** (31 videos: Apple 8, Framer 7, Resend 5, Mercury 5, Arc 4, Cloudflare 1, Notion 1) | 1 | 3 | 3 | 0 |
| Live WebGL context | **4** (Stripe, Raycast, Resend, Mercury). three.js loaded on 5 (plus Cloudflare) | 0 | 0 | 0 | 0 |
| Has a `<canvas>` | 9 | 1 | 0 | 0 | 0 |
| More than 10 running Web Animations | 9 (Linear 522, Cloudflare 237, Stripe 80, Tines 46, Mercury 30, Raycast 27, PostHog 22, Attio 20, Warp 11) | 5 | 1 | 1 | 0 |
| More than 500 scroll-linked style mutations over 4 scroll steps | 5 (Attio 2,491, Apple 1,833, Cloudflare 1,725, Framer 641, Vanta 583) | **0** | 6 (deeploi 17,449, mx-it 6,162, IT-HAUS 3,139…) | 2 (Air IT 5,887, Rocket IT 977) | 0 |
| GSAP / ScrollTrigger / Lenis | 2 / 1 / 1 | 3 / 0 / 0 | 3 / 1 / 1 | 3 / 2 / 0 | none |
| A monospace face loaded | **13** | 0 | 0 | 0 | yes (IBM Plex Mono) |
| A serif display or text face loaded | 5 (Notion, Tines, Resend, Vanta, Attio) | 0 | 0 | 0 | no |
| Median page height | 8,489px | 4,224px | 8,191px | 7,597px | 2,327px |
| Median words | 1,248 | 579 | 838 | 1,070 | 270 |
| Median `<section>` count | 8.5 | 6 | 0 (most built without `<section>`) | 10 | 4 |
| Median `<svg>` count | 100.5 | 5 | 21.5 | 15 | 0 |

"Sticky" in the script counts `position: sticky` and `fixed` together (median 5 for design). It can't tell a sticky scroll scene from a fixed header, so the sticky scenes below were counted by looking at the frames.

**Structural moves seen in the frames** (over 18 renderable design sites, every site named so it can be checked):

1. **Real product UI or live data in the first viewport, 8 of 18.** Linear (an issue view), 1Password (admin console), Framer (live prompt box), Notion (app window "Ramp HQ"), Arc (browser with real tabs), Attio (app window), PostHog (the whole site is an OS window) and Warp (an animated "fig. 1 — the factory" grid with live counters "224 TASKS · 11 ACTIVE · 1,422 PRS SHIPPED"). Product UI appears further down on most of the rest (Tailscale, Vanta, Mercury, Resend, Tines, Vercel).
2. **A logo strip or press ticker right under the hero, 6 of 18.** Vercel, 1Password, Notion, Tines, Vanta (pinned to the bottom of the viewport on every frame) and Arc (press quotes from Bloomberg, Inverse, Fast Company).
3. **Quantified customer outcomes rather than adjectives.** Tailscale ("1,000+ hours saved", "25x", "90% reduction in internal support requests"), 1Password ("Reddit saw 100% deployment to 3K staff in weeks"), Warp ("Cutting our cost per PR from $80 to $30") and Vercel ("Notion powers millions of agent conversations daily on Vercel").
4. **Testimonials with a name, a title and a company, set large.** Linear (Gabriel Peal, OpenAI; Nik Koblov, Ramp, on pastel and acid-yellow cards), Vanta (Megan Snyder, big serif quote), Notion (three duotone video cards, Cursor, Faire and Ramp) and Raycast (Guillermo Rauch, Marques Brownlee).
5. **Mono "system" labels and figure numbering.** Warp ("[ fig. 3 · open at every layer ]", bracketed nav codes [C] [S] [Q]), Tines ("THE NEW REALITY FOR IT AND SECURITY") and Linear (Berkeley Mono). The client's mono eyebrows already belong to this family. No competitor uses it.
6. **One sticky step list driving a swapping visual.** Attio (a left list Build pipeline, Convert leads… against a workflow diagram), Warp (a sticky section nav), Apple (a sticky local nav: Overview, Tech Specs, Compare, Buy). Among the MSPs, Rocket IT does it with scroll-driven steps.
7. **Alternating dark and light bands, or one bold colour field per section.** Cloudflare (full-bleed orange hero and footer CTA), Warp (an electric-blue case-study band), Arc (blue wavy-edge bands) and Mercury (a light hero, then dark product sections).
8. **Specific feature grids instead of generic service cards.** Resend's "Reach humans, not spam folders" names DNSBL tracking, BIMI, DMARC and dedicated IPs. Each cell is a concrete mechanism, not "IT-Sicherheit".
9. **Price on the homepage, 3 of 18.** Cloudflare (Free, Pro, Business and Contract plan cards), Apple ("From $1299 or $108.25/mo.") and PostHog ("97% of users pay us $0").
10. **Status linked in the footer.** Cloudflare (cloudflarestatus.com), Notion (notion-status.com) and Tines ("Status" in the footer frame).
11. **Restraint as a stance.** teenage.engineering is 153 words and one black-and-white photo of its New York store with "NOW OPEN! WED–SUN 11AM–7PM". Notion's whole homepage is 357 words.

---

## 5. Recommendations for a one-person firm selling "IT ohne Blackbox"

### Ten moves

1. **Make the hero show the thing itself, an excerpt of a documentation file, not a status mock.** For example, a change-log entry with date, what changed, why, how to roll it back, and who did it (Noah), next to a network-plan fragment. That is the leaders' "real UI in the hero" move (8 of 18) applied to Hertling's actual product. Label it plainly as an example until there are clients. hagel already wins trust with "echte Bildschirme", so a mock that looks like a mock would lose.
2. **Put Noah's face, name and mobile number in the first screen, in the first person.** "One fixed contact" only proves itself when you can see the contact. Only Matic-Tec does this in Hamburg. centrexIT and Rocket IT show the pattern abroad. The current site has the 0152 number in the top bar but no person.
3. **Publish prices.** Show an hourly rate and a monthly price per workstation, with an itemised "what's included". The local anchors are hagel "ab 29 €/AP", Layer-X "€70 per client per month", IT Service247 "650 €/Monat" and FL-ITService "€120/h". 13 of 17 Hamburg sites hide prices, and a "no blackbox" firm that hides its price contradicts itself. A small calculator in the Layer-X or Speedster style is optional.
4. **Show what the client holds at the end.** A specimen table of contents of the documentation folder (access register, licence register, network plan, backup and restore test log, emergency plan, change log). Optionally a downloadable blank template. IT Concept writes this list as a paragraph of SEO text. Hertling can show it as the product.
5. **Answer the one-person risk before anyone asks.** "Was passiert, wenn ich ausfalle oder Sie wechseln wollen?" Everything is documented, all admin access stays with the client, and a handover file comes free on exit. This turns the weakness of being one person into the proof of "ohne Blackbox". hagel advertises taking over "Zugänge und Dokumentation vom bisherigen Dienstleister". Hertling can promise the reverse direction.
6. **A free check with no e-mail.** For example a "Blackbox-Check" with about 10 questions on whether the business could run its IT without its current provider (Who has the admin passwords? Is there a restore test? Who owns the M365 tenant?), with the result shown on screen. Precedents are Matic-Tec (10 min, no e-mail), centrexIT (2 min, "No email required") and hagel (M365 check).
7. **Situation entry points instead of four service cards.** Neues Büro einrichten, IT-Dienstleister wechseln, Der IT-Kollege ist weg, Nach einem Vorfall, Microsoft 365 aufräumen. These follow centrexIT's "How do we usually start?" and hagel's "Welche Situation passt?".
8. **A response promise with a number Noah can keep alone, plus a public availability or status line.** Competitors print "< 2h" (Layer-X), "< 1 Stunde" (mx-it), "within 2 hours" (Network Fish) and "24 Stunden" (IT-Reinbek). One honest number (for example "Rückruf am selben Werktag, Mo–Fr 8–18") beats a big one. Then a small public page for status, holidays and cover arrangements, in the style of ITsjefen's "Driftsmeldinger". 0 of 17 Hamburg competitors have one.
9. **Proof that doesn't need clients yet.** A worked example labelled as an example (the documentation of a fictional 12-person office), any certificates Noah personally holds, the Reinbek address with an on-site radius and travel times, "gegründet 2026" said openly, and a "Für wen das ist / für wen nicht" block (Matic-Tec is the only local site with one). Add a Google review count only once real reviews exist.
10. **Keep the existing type system and add depth.** IBM Plex Mono labels match 13 of 20 design leaders and none of the competitors. Add one real photo set of Noah working on real equipment in real local places. Add masked or rounded media (clip-path on 19 of 20 leaders), and one sticky step section for onboarding (week 1 inventory, week 2 documentation, week 3 handover of the folder, then ongoing), as Attio, Warp and Rocket IT do. Raise the page from 270 words to roughly 800 to 1,200 of specific content. Keep the mobile first screen free of overlays.

### Five things to avoid, because nearly every competitor already does them

1. **Generic tech stock photography.** Data-centre aisles, glowing shields, hands on laptops, a businessman with floating numbers, LED walls. Seen on IT-Reinbek, IT Concept, PCProfi, Sellenschlo, novotec, Bürgel, ConnectIT24, Medialine, mars, netgo and IT Service247 `[V]`.
2. **Interchangeable adjective slogans.** "Schnell. Flexibel. Zuverlässig." (IT-Reinbek), "kompetent und zuverlässig" (Base2), "Zuverlässig und Kompetent" (IT Concept). "zuverlässig" appears in the visible text of 9 of 17 Hamburg homepages `[V]`.
3. **Counter tiles that a new firm can't fill or verify.** "20+ Zufriedene Kunden", "15.000 gelöste Tickets", "1.000+ Kunden & Partner", "Zertifiziert" as a stat `[V]`. A spring-2026 firm would have to invent them. Don't.
4. **Vendor-logo rows as proof** (Microsoft, Veeam, Sophos, 3CX, ESET, Dell, UniFi), seen on 6 of 17 homepages `[V]`. They show what a firm resells, not how it works. Show only certifications Noah personally holds.
5. **Overlay clutter on the first screen.** Full-screen consent walls (HELLTHO, ConnectIT24), chat bubbles, WhatsApp buttons, ProvenExpert seals, text-to-speech and accessibility widgets stacked over the content on mobile (Layer-X, FL-ITService, IT-Reinbek, IT Service247, Sellenschlo) `[V]`. If the site runs no non-essential tracking, it may need no consent modal at all `[I, a legal question to confirm, not a fact checked here]`.

---

## Appendix. Per-site fingerprints (all 60 queued rows)

The three walled rows (electric.ai, ramsac.com, sva.de) describe the wall page, not the site.

| cat | site | HTTP | height px | words | sections | imgs | svgs | sticky/fixed | clip-path | blend | backdrop-blur | canvas | WebGL | video | running anims | scroll mutations | libs | fonts (first 3) |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| client | systemhaus-hertling.com | 200 | 2327 | 270 | 4 | 2 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 6 | 8 | - | IBM Plex Mono, IBM Plex Sans |
| comp_hh | www.hagel-it.de | 200 | 15173 | 1061 | 19 | 85 | 299 | 8 | 1 | 2 | 2 | 0 | 0 | 0 | 57 | 244 | - | Figtree, Outfit |
| comp_hh | layer-x-it.de | 200 | 10015 | 947 | 9 | 28 | 60 | 5 | 0 | 0 | 14 | 0 | 0 | 0 | 30 | 85 | - | titilliumweb, titilliumwebSemiBold |
| comp_hh | www.base2itc.de | 200 | 2620 | 175 | 3 | 11 | 3 | 2 | 0 | 0 | 0 | 1 | 0 | 0 | 0 | 21 | - | Lato |
| comp_hh | fl-itservice.de | 200 | 3264 | 291 | 0 | 39 | 14 | 5 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 93 | lottie, Swiper | Poppins |
| comp_hh | it-reinbek.de | 200 | 6138 | 654 | 8 | 12 | 11 | 9 | 2 | 0 | 3 | 0 | 0 | 0 | 22 | 54 | - | tabler-icons, Roboto |
| comp_hh | sellenschlo-it.de | 200 | 10377 | 579 | 0 | 22 | 24 | 1 | 0 | 0 | 0 | 0 | 0 | 1 | 8 | 127 | Swiper | Outfit, Inter, Poppins |
| comp_hh | www.ra-micro-hh.de | 200 | 1895 | 321 | 0 | 3 | 2 | 3 | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | - | Roboto |
| comp_hh | running-bit.de | 200 | 1868 | 196 | 4 | 0 | 4 | 1 | 2 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | - | - |
| comp_hh | www.buergel-it.de | 200 | 3422 | 375 | 6 | 32 | 0 | 5 | 1 | 0 | 0 | 0 | 0 | 0 | 37 | 80 | - | FontAwesome, Montserrat |
| comp_hh | it-service247.de | 200 | 4294 | 605 | 6 | 49 | 25 | 13 | 7 | 0 | 0 | 0 | 0 | 0 | 5 | 465 | gsap | fl-icons, Font Awesome 6 Free, Font Awesome 5 Free |
| comp_hh | www.helltho.de | 200 | 2473 | 444 | 13 | 3 | 1 | 6 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 98 | gsap | Font Awesome 5 Free, SSGizmo |
| comp_hh | matic-tec.de | 200 | 5718 | 616 | 0 | 3 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | - | Font Awesome 5 Brands, Font Awesome 5 Pro |
| comp_hh | pcprofi-systems.de | 200 | 4224 | 346 | 11 | 14 | 0 | 5 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 18 | - | Roboto, FontAwesome |
| comp_hh | www.connectit24.de | 200 | 3517 | 873 | 26 | 9 | 5 | 2 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 104 | - | eicons, hindsiliguri, Font Awesome 5 Brands |
| comp_hh | novotec.de | 200 | 8536 | 1158 | 5 | 123 | 50 | 7 | 4 | 0 | 0 | 0 | 0 | 0 | 28 | 230 | splide | Inter |
| comp_hh | it-concept.hamburg | 200 | 8811 | 2611 | 30 | 8 | 0 | 3 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 75 | gsap | entypo-fontello |
| comp_hh | arconda.ag | 200 | 3987 | 334 | 0 | 22 | 35 | 3 | 16 | 0 | 0 | 0 | 0 | 0 | 1 | 245 | - | NonBreakingSpaceOverride, Inter var, Hind |
| comp_de | www.cancom.de | 200 | 8928 | 753 | 0 | 32 | 1 | 19 | 3 | 0 | 3 | 0 | 0 | 0 | 4 | 314 | lottie | ElegantIcons, Gotham |
| comp_de | www.bechtle.com | 200 | 6143 | 3014 | 1 | 63 | 126 | 7 | 169 | 0 | 0 | 0 | 0 | 0 | 1 | 109 | - | BechtleWeb, icomoon |
| comp_de | www.netgo.de | 200 | 6423 | 1050 | 8 | 109 | 301 | 14 | 0 | 0 | 2 | 0 | 0 | 0 | 1 | 578 | Swiper | ff-tisa-sans-web-pro |
| comp_de | www.datagroup.de | 200 | 9161 | 1814 | 0 | 46 | 11 | 9 | 2 | 0 | 1 | 0 | 0 | 0 | 1 | 1255 | Swiper | Titillium Web |
| comp_de | www.sva.de | 503 | 900 | 90 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | - | - |
| comp_de | www.medialine.com | 200 | 7453 | 481 | 0 | 27 | 14 | 8 | 0 | 18 | 0 | 0 | 0 | 0 | 24 | 524 | - | Hind, Linearicons |
| comp_de | www.deeploi.io | 200 | 10218 | 619 | 9 | 95 | 49 | 6 | 7 | 1 | 0 | 0 | 0 | 4 | 2 | 17449 | gsap | Inter, Sora |
| comp_de | www.nts.eu | 200 | 6418 | 621 | 0 | 56 | 29 | 5 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 323 | gsap | URW Geometric, swiper-icons |
| comp_de | www.mars-solutions.de | 200 | 6105 | 571 | 10 | 13 | 74 | 9 | 0 | 0 | 0 | 0 | 0 | 4 | 5 | 187 | Swiper | FontAwesome, Roboto |
| comp_de | mx-it.com | 200 | 10064 | 1149 | 0 | 230 | 2 | 4 | 2 | 0 | 9 | 0 | 0 | 0 | 2 | 6162 | gsap, ScrollTrigger, Lenis, Swiper | Neue Montreal |
| comp_de | www.it-haus.com | 200 | 10692 | 922 | 0 | 85 | 0 | 11 | 0 | 0 | 0 | 0 | 0 | 1 | 1 | 3139 | Swiper | Poppins SemiBold W600, Poppins Regular W400, dashicons |
| msp_world | electric.ai | 403 | 900 | 37 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 8 | - | - |
| msp_world | rocketit.com | 200 | 10788 | 669 | 4 | 43 | 1 | 8 | 0 | 0 | 0 | 0 | 0 | 0 | 3 | 977 | gsap, ScrollTrigger | Ultimate-Icons |
| msp_world | centrexit.com | 200 | 12734 | 2036 | 17 | 20 | 117 | 9 | 4 | 0 | 8 | 0 | 0 | 0 | 11 | 64 | - | Plus Jakarta Sans |
| msp_world | integrisit.com | 200 | 6622 | 1070 | 0 | 34 | 15 | 11 | 8 | 0 | 0 | 0 | 0 | 0 | 1 | 154 | Swiper, framer | neue-haas-grotesk-display, neue-haas-grotesk-text |
| msp_world | www.ramsac.com | 403 | 900 | 37 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 8 | - | - |
| msp_world | www.airit.co.uk | 200 | 7299 | 1116 | 14 | 88 | 162 | 22 | 0 | 7 | 6 | 0 | 0 | 4 | 0 | 5887 | gsap, rive | Montserrat, Montserrat-SemiBold |
| msp_world | networkfish.com | 200 | 11499 | 2246 | 12 | 30 | 11 | 2 | 2 | 0 | 0 | 0 | 0 | 0 | 1 | 97 | Swiper | Barlow, Roboto |
| msp_world | www.speedster-it.com | 200 | 7597 | 1513 | 10 | 9 | 0 | 7 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 4 | - | Raleway, Font Awesome 6 Brands, Font Awesome 6 Free |
| msp_world | itsjefen.no | 200 | 1451 | 90 | 0 | 8 | 1 | 2 | 0 | 0 | 0 | 0 | 0 | 1 | 0 | 0 | - | din-2014 |
| msp_world | www.kleri.com | 200 | 8341 | 857 | 12 | 674 | 88 | 4 | 2 | 0 | 0 | 0 | 0 | 2 | 3 | 84 | gsap, ScrollTrigger | ABC Solar, DM Sans |
| msp_world | itm8.com | 200 | 6470 | 420 | 1 | 28 | 25 | 10 | 0 | 0 | 0 | 0 | 0 | 0 | 7 | 112 | - | Miriam Libre, Fira Sans, Font Awesome 6 Free |
| design | www.apple.com/macbook-air | 200 | 32269 | 6014 | 13 | 114 | 98 | 13 | 42 | 1 | 5 | 0 | 0 | 8 | 9 | 1833 | - | SF Pro Display, SF Pro Text, SF Pro Icons |
| design | linear.app | 200 | 9960 | 1445 | 8 | 39 | 231 | 3 | 13 | 18 | 3 | 0 | 0 | 0 | 522 | 173 | - | Inter Variable, Berkeley Mono |
| design | vercel.com | 200 | 5333 | 352 | 10 | 17 | 51 | 9 | 10 | 3 | 0 | 2 | 0 | 0 | 1 | 26 | - | Geist Mono, GeistSans |
| design | stripe.com | 200 | 15241 | 2811 | 17 | 50 | 341 | 10 | 98 | 5 | 3 | 10 | 6 | 0 | 80 | 173 | THREE | sohne-var, SourceCodePro |
| design | www.cloudflare.com | 200 | 7052 | 1475 | 18 | 14 | 247 | 3 | 8 | 2 | 30 | 0 | 0 | 1 | 237 | 1725 | gsap, THREE | Apercu Mono Pro, STK Bureau Sans |
| design | tailscale.com | 200 | 5766 | 1513 | 6 | 55 | 151 | 5 | 24 | 1 | 0 | 0 | 0 | 0 | 2 | 11 | - | inter, mdio |
| design | 1password.com | 200 | 7477 | 450 | 5 | 15 | 20 | 2 | 0 | 0 | 0 | 2 | 0 | 0 | 2 | 0 | - | agileSans |
| design | www.framer.com | 200 | 10742 | 1050 | 6 | 90 | 118 | 5 | 1 | 5 | 8 | 0 | 0 | 7 | 1 | 641 | framer | GT Walsheim Medium, Input Mono Regular, Inter |
| design | www.notion.com | 200 | 4731 | 357 | 3 | 60 | 28 | 5 | 3 | 6 | 1 | 0 | 0 | 1 | 3 | 20 | - | NotionInter, Lyon Text |
| design | www.raycast.com | 200 | 15983 | 1746 | 0 | 117 | 169 | 2 | 7 | 10 | 21 | 1 | 1 | 0 | 27 | 106 | THREE | Inter, GeistMono, jetBrainsMono |
| design | arc.net | 200 | 6125 | 401 | 5 | 4 | 35 | 3 | 9 | 4 | 1 | 0 | 0 | 4 | 4 | 3 | - | Marlin, Inter, InterVariable |
| design | teenage.engineering | 200 | 2285 | 153 | 6 | 3 | 17 | 3 | 30 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | - | te-20, te-40 |
| design | nothing.tech | 200 | 7614 | 212 | 9 | 13 | 29 | 5 | 1 | 1 | 13 | 0 | 0 | 0 | 0 | 67 | Lenis | Geist Variable, Geist Mono Variable, NType82-Regular |
| design | www.tines.com | 200 | 7404 | 791 | 5 | 17 | 124 | 4 | 15 | 0 | 10 | 4 | 0 | 0 | 46 | 102 | - | Roobert, Reckless, Roobert Mono |
| design | resend.com | 200 | 12319 | 2151 | 12 | 73 | 99 | 4 | 13 | 4 | 4 | 1 | 1 | 5 | 9 | 439 | THREE | inter, aBCFavorit, domaine |
| design | www.vanta.com | 200 | 9625 | 726 | 9 | 75 | 51 | 18 | 13 | 1 | 5 | 0 | 0 | 0 | 0 | 583 | gsap, ScrollTrigger, lottie | SC Ripley, Soehne, Roboto |
| design | mercury.com | 200 | 13011 | 1570 | 14 | 46 | 102 | 5 | 31 | 0 | 12 | 1 | 1 | 5 | 30 | 85 | THREE | arcadia, arcadiaDisplay |
| design | www.warp.dev | 200 | 9363 | 1803 | 11 | 69 | 24 | 6 | 3 | 0 | 0 | 2 | 0 | 0 | 11 | 31 | - | theFuture, azeretSemiMono, Matter |
| design | attio.com | 200 | 17599 | 1749 | 13 | 73 | 409 | 11 | 11 | 40 | 9 | 2 | 0 | 0 | 20 | 2491 | - | JetBrains Mono, inter, interDisplay |
| design | posthog.com | 200 | 900 | 802 | 1 | 76 | 206 | 4 | 47 | 2 | 26 | 0 | 0 | 0 | 22 | 0 | - | Source Code Pro, RoundHog |

**Visual review notes.** The per-site notes written while viewing the contact sheets are kept for audit next to this file in `visual_notes.md`.
