# Systemhaus-Hertling, research for the presence build. 21 Oct 2026

Internal. Every fact below was opened at its source on 21 Oct 2026 unless it says otherwise. Labels, VERIFIED (opened
and read), CLAIMED (their own words about themselves), INFERRED (our reading), UNVERIFIED (seen only second hand).

## The lead

- Noah Hertling, contactId ctc_ch3vFcKAkjQdMKDCg, leadId lea_tuhwBfjkSfYhxquPt, campaign v0.1 (paused).
- lemlist record, jobTitle "Geschäftsführer", tagline "Geschäftsführer bei Systemhaus-Hertling UG (Haftungsbeschränkt)",
  companyDomain systemhaus-hertling.com, location Glinde, company location Reinbek, companyFoundedOn 2026. Tagline and
  company agree, the domain is his (Impressum below). VERIFIED.
- Thread, 5 items, pulled 21 Oct 14:5x UTC. 1 Oct connect note, 7 Oct opener, 12 Oct bump, 20 Oct 15:32 his yes
  ("Hello Raka, I hope you are fine. Yes that would be great. Thank you very much"), 21 Oct 12:33 ours ("I'll have it
  ready for you later this week. Which clients would you most like to win in Hamburg?"). He hasn't answered that.
- What we promised (7 Oct, act_BE4uTQGADccwdM7n6), "Shall I send you over what the Hertling online presence that wins
  Hamburg clients looks like?" Block two, "your Google listing has no reviews yet, your LinkedIn page has one follower,
  and your homepage names no client. This causes Hamburg firms comparing IT partners to go with the ones that show
  proof." Block four offered "branding and websites and social media management".

## The three opener claims, rechecked 21 Oct afternoon

1. Google listing, no reviews. Google Maps search "IT Systemhaus Reinbek" lists "Systemhaus-Hertling UG
   (haftungsbeschränkt) · Keine Rezensionen · IT-Berater · Birkenweg 18", beside Sellenschlo IT 5,0 and RA-MICRO
   Hamburg 4,0. His own place page shows "Rezension schreiben" and no rating, hours set (opens 08:00), phone
   +49 1522 7441804, website linked. Control, hagel IT-Services' page shows 4,9. VERIFIED (Chromium render, screenshots
   /tmp/claude-0/hertling/maps-*.png).
2. LinkedIn page, one follower. social-audit.js read "1 follower" on
   linkedin.com/company/systemhaus-hertling-ug-haftungsbeschränkt, and fetch-walled.py read "1 follower" and "1
   employee" (Noah) a second way, with Microsoft's page reading 29,341,417 followers through the same path as the
   control. No posts on the page. VERIFIED.
3. Homepage names no client. His homepage HTML has 0 hits for Kunde, Referenz, Partner, zertifiziert, Microsoft,
   Bewertung, Sterne, Fallstudie, Projekt, and its only image is his logo (twice). Control, hagel-it.de's homepage
   returns "150+ Kunden", "4,9 / 5 Sterne", "Fallstudien", "Partner Microsoft". VERIFIED.

## The company

- Impressum, "Systemhaus-Hertling UG (haftungsbeschränkt), Birkenweg 18, 21465 Reinbek", "Vertreten durch
  Geschäftsführer: Noah Joel Hertling", Amtsgericht Lübeck HRB 27513 HL, USt-ID "Beantragt – wird nach Erteilung
  ergänzt", phone 0152 27441804, info@systemhaus-hertling.com. VERIFIED.
- North Data (fetch-walled.py), "27.04.2026 Eintragung · GF: N. H. · Kapital: 300,00 €", Musterprotokoll 16.03.2026 and
  09.04.2026, Gegenstand "die Erbringung von IT-Dienstleistungen, insbesondere IT-Beratung, Systemadministration,
  Netzwerktechnik, Einrichtung, Verkauf, Wartung und Support von Hard- und Software sowie damit verbundene
  Dienstleistungen." VERIFIED.
- LinkedIn company page, "IT Services and IT Consulting, Reinbek", 1 employee, Founded 2026, About text matches the
  lemlist companyDescription. VERIFIED.
- Noah's own profile (linkedin.com/in/noah-hertling-7a507130a) returned 429 to fetch-walled.py. A web search summary
  says it lists Berufliche Schule ITECH Elbinsel Wilhelmsburg (a Hamburg IT vocational school). UNVERIFIED, so it stays
  off the site. Routes tried, fetch-walled.py (429), web search on name plus place (search result title "Noah Hertling
  - Systemhaus-Hertling UG (Haftungsbeschränkt)"), web search on the slug (nothing), company page (no posts), his site
  (no personal page), news (0). A Facebook page "noahhtg10" came up in search and is not tied to him by anything, ignored.
- News, tools/news.py de, company 0, person 0, control Volkswagen 99. Regional and industry results are generic.
- Web search for the firm returns nothing about it beyond the register sites. VERIFIED negative with a control.

## His site, two full crawls

- tools/crawl.py, 13 URLs both passes (9 from sitemaps), all 200. Pages, Startseite, Leistungen, Über uns, Kontakt,
  Impressum, Datenschutz, plus WordPress leftovers ("Hello world!" post, "Sample Page", Uncategorized archive), the
  login page and xmlrpc. Custom theme "systemhaus-hertling" v1.1, WordPress 7.0.2, logo uploaded July 2026.
- site-audit.js, render trusted, 0 page errors, 0 failed requests, desktop and phone screenshots opened. Navy, teal,
  IBM Plex Sans and Mono, uppercase mono eyebrow, a dark "System · Status" card, coded tiles NET SUP CLD SEC, "01 ·
  Direkt" numbering. Clean, recent, and the look of an AI builder default. 0 cookies before consent, Google Fonts
  loaded remotely (a tweak, not an angle). No social links. Contact form posts to wp-admin/admin-post.php with a nonce and a honeypot field (refetched 21 Oct evening, an earlier note here said mailto, wrong).
- His theme tokens, ink #16233d, teal #0e7c7b, amber #e2a73e, paper #f6f7f9. His logo's own colours, blue about
  #08558a to #0a5c8d, steel grey #7e848a to #969da3. The teal and amber are the theme's, not the logo's.

## His own words, the raw material for the copy (CLAIMED)

- Hero, "Ihre IT läuft. Auch wenn gerade niemand hinschaut."
- "Systemhaus-Hertling betreut Netzwerke, Server und Arbeitsplätze für kleine und mittlere Unternehmen in Hamburg und
  Umgebung – von der Einrichtung bis zum laufenden Support."
- "IT-Betreuung ohne Blackbox." "Persönlicher Ansprechpartner. Sie sprechen mit den Menschen, die Ihre Systeme auch
  tatsächlich betreuen – ohne Ticket-Warteschleife." "Vor Ort und remote. Unterstützung in Hamburg und Umgebung sowie
  per Fernwartung, wenn es schnell gehen muss." "Dokumentiert von Anfang an. Jede Änderung an Ihrer Infrastruktur wird
  dokumentiert, damit Ihre IT keine Blackbox bleibt."
- "Support-Hotline: Mo–Fr, 8–18 Uhr." "Einsatzgebiet Hamburg und Umgebung, remote deutschlandweit."
- Four Bausteine, with his bullets.
  - IT-Infrastruktur & Netzwerke, "Netzwerkplanung und -aufbau für Büros und Standorte", "Strukturierte Verkabelung und
    WLAN-Ausleuchtung", "Einrichtung von Switches, Routern und Firewalls", "Dokumentation der Infrastruktur für spätere
    Änderungen".
  - IT-Support & Wartung, "Support bei Störungen an Arbeitsplätzen, Servern und Netzwerk", "Fernwartung für schnelle
    Hilfe ohne Vor-Ort-Termin", "Regelmäßige Wartung und Updates", "Fester Ansprechpartner statt wechselnder Tickets".
  - Cloud-Lösungen, "Einrichtung von E-Mail- und Kollaborationsdiensten", "Migration bestehender Daten in die Cloud",
    "Rechte- und Freigabenverwaltung", "Laufende Betreuung und Ansprechpartner bei Fragen".
  - IT-Sicherheit, "Absicherung von Netzwerk, Servern und Endgeräten", "Backup-Konzepte und Wiederherstellungstests",
    "Rechte- und Zugriffsmanagement", "Sensibilisierung von Mitarbeitenden für IT-Sicherheit".
- Über uns, founded "mit einem klaren Ziel ... einen IT-Partner an die Seite zu stellen, der erreichbar ist, versteht, wie
  IT im Alltag eines Unternehmens genutzt wird, und Entscheidungen nachvollziehbar erklärt statt sie hinter Fachbegriffen
  zu verstecken." Four values, Regional verwurzelt, Klar in der Kommunikation, Direkt erreichbar ("Kein Callcenter"),
  Dokumentiert ("nicht nur im Kopf gemerkt").
- Register, "Einrichtung, Verkauf, Wartung und Support von Hard- und Software". The site doesn't mention selling
  hardware, the register does.

## Competitors seen on Google Maps, 21 Oct (VERIFIED, ratings only, review counts not shown in the list view)

"IT Service Hamburg kleine Unternehmen", SYMPLASSON 4,8 (sponsored, "30+ Jahre IT-Erfahrung"), hagel IT-Services 4,9,
IT Dienstleister Hamburg 5,0, FL-ITService 5,0, Fechner-IT 4,9, IT-Service Johannsen 5,0, IT-Services Hamburg e.K. 5,0,
IT-Nunweiler 4,6, Layer-X 5,0, HCS IT Services 5,0, Systempartner Hamburg 4,2. Near Reinbek, Sellenschlo IT 5,0 and
RA-MICRO Hamburg Systemhaus 4,0. Every one of them has a rating, Hertling has none.
hagel IT posts on its Google profile ("Vom Inhaber", 1 day ago), its own Hamburg security index of 812 companies
measured on 1 Oct 2026 for DMARC. Its homepage publishes contract terms ("Vertrag im Klartext Laufzeit, Preise,
Garantie"), "150+ Kunden", "seit 2004", locations Hamburg, Bremen, Kiel, Lübeck.

## Pre build gate (prototype spec K5)

1. Interest. A polite yes after a bump (K1 risk), but we promised it in writing for this week and Raka said build. Pass
   on Raka's word.
2. The problem is his. A firm registered in April 2026 with no reviews, one follower and no client named has to win its
   first clients, and every rated peer beside him shows proof he can't show yet. He'd name "first clients" himself.
   INFERRED, MEDIUM.
3. The job matches. His goal is SME clients in Hamburg and around, and the build is the presence that earns them.
4. Craft. His site is recent (logo uploaded July 2026) and built on a custom theme, so the RULES 0D trap "just built"
   applies. The build can't be pitched as a new or nicer site. It has to do selling jobs his site doesn't do yet,
   proof before reviews, a free first step, a review path, a Google profile and LinkedIn that look alive. And he builds
   IT himself, so it has to be well past what he'd make with an AI builder.

## Figures for the site, each reopened by me on 21 Oct evening (independent of the agent's pulls)

| Figure | Value | How I rechecked |
|---|---|---|
| German firms 10 to 49 staff, IT services down from hardware or software failure, 2023 | 20.69 % | Eurostat API isoc_cisce_ic, indic E_SEC2IUSVF, size 10-49, time 2024 (incidents in 2023) |
| Same, down from an attack from outside | 3.34 % | same call, E_SEC2IUSVA |
| Same, any incident with consequences | 23.4 % (0 to 9 staff 15.87 %) | same call, E_SEC2IANY |
| Reference year is 2023 | EU27 GE10 E_SEC2IANY 2024 = 21.54 | matches Eurostat Statistics Explained "In 2023, more than 1 in 5 EU enterprises (21.54%)" (agent opened the PDF, my API value agrees) |
| German firms 10 to 49, IT tasks done by external suppliers, 2023 | 75.98 % (only external 38.42 %) | Eurostat isoc_ske_fct E_IT_EXT, E_IT_EXTQ |
| German firms 10 to 49 employing IT specialists, 2024 | 15.55 % (0 to 9, 7.1 %) | Eurostat isoc_ske_itspe E_ITSP2 |
| German firms 10 to 49 with documents on IT security measures, 2024 | 33.88 % | Eurostat isoc_cisce_ra E_SECPOL2 |
| Backup to a separate location, 10 to 49, 2024 | 88.77 % | same, E_SECMOSBU. High, so no chart may imply small firms lack backups |
| BSI, KMU and regional providers | "...stellen teils fest, dass es in ihrer Region entweder zu wenig qualifizierte Dienstleister gibt oder nur solche, die nicht zu ihrer eigenen Unternehmensgröße passen." | opened medien.bsi.bund.de/lagebericht/de/gefaehrdungslage-der-kleinen-und-mittleren-unternehmen |
| BSI, small firms and IT staff | "Gerade die Kleinst‑ (unter 10 Beschäftigte) und die kleinen (unter 50 Beschäftigte) Unternehmen verfügen oftmals nicht über das erforderliche Personal..." | same page |
| BSI, reported attacks | "Rund 80 Prozent der im Jahr 2024 angezeigten Angriffe zielten auf KMU." | opened medien.bsi.bund.de/lagebericht/de/cybercrime. Keep "angezeigten" |
| BSI, CyberRisikoCheck | "erfüllen die Unternehmen im Schnitt jedoch nur knapp 56 Prozent der absoluten Grundanforderungen" | opened /it-sicherheit-fuer-kmus |
| Hamburg legal units 2024 by staff | 102,696 total, 87,418 with 0 to under 10, 11,985 with 10 to under 50 | re-downloaded statistik-nord.de JB2024HH_12.xlsx, sheet 12.8 "Zusammen" row (Stand 30.09.2025). Largest sector M (freiberufliche, wissenschaftliche, technische Dienstleistungen) 23,241, of which 21,147 under 10 |
| Distance from his street to the Hamburg city point | 15.74 km straight line | computed from OSM Nominatim coordinates (Birkenweg 18 Reinbek and the Hamburg city node) |

## Teardown (agent, 21 Oct), research/teardown/TEARDOWN.md

57 of 60 rendered (electric.ai, ramsac.com walled, sva.de 503). The findings that shape the build, all from the agent and spot
checked where they drive a decision: no Hamburg competitor of 17 has a public status page, only 5 show a named face, only
4 publish a price, hagel IT (46 Google reviews, ab 29 € per Arbeitsplatz) names Reinbek and Glinde on its Ahrensburg page,
IT Concept Hamburg already writes "documented" in SEO text, so Hertling has to show documentation, not claim it.

## Open, to research

- Teardown of competitors, best MSP sites and design leaders, research/teardown/TEARDOWN.md (agent, running).
- Public data for the story, research/data/DATA.md (agent, running).
- Licensed film and photos, research/assets/ASSETS.md (agent, running).

## Legal pages, rechecked 21 Oct evening (for the Impressum and Datenschutz pages)

- His Impressum cites "Angaben gemäß § 5 TMG". The TMG was repealed on 14 May 2024 and the duty moved unchanged to
  § 5 DDG (IHK Bonn, IHK Nürnberg, steuertipps.de, it-recht-kanzlei.de). VERIFIED. The build cites § 5 DDG. [CONFIRM]
- His Impressum links the EU OS platform. Regulation (EU) 2024/3228 ended it on 20 July 2025 (IHK Oldenburg, Fulda,
  Bayreuth, Händlerbund, wbs.legal), and ec.europa.eu/consumers/odr/ now redirects to a page reading "The Online dispute
  resolution (ODR) platform is now closed". VERIFIED two ways. The build drops the link and keeps his § 36 VSBG sentence.
- His Datenschutz still shows the template note "Dieser Text ist eine allgemeine Vorlage und ersetzt keine
  Rechtsberatung. Prüfen Sie ihn vor Veröffentlichung..." and says the form sends "direkt per E-Mail-Programm", while his
  live form posts to wp-admin/admin-post.php. VERIFIED (both pages refetched). Not an angle (RULES 0E), a handover tip.
- Hosting named in his Datenschutz, IONOS SE, Montabaur. Kept as his production statement, flagged in the handover.
