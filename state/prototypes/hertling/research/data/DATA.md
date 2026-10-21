# Hertling site data: primary sources, exact figures

Researched 2026-10-21. Every figure below was opened at its source in this session unless labelled otherwise. Source files are saved next to this file so each number can be rechecked without the web.

Labels used
- **VERIFIED**: opened at the original publisher and quoted from the downloaded file or page.
- **VERIFIED (official reproduction)**: opened in an official government document that reproduces an official statistics table; the table itself was not reachable.
- **SECONDARY**: seen only through another document or a search summary; the original was not opened. Do not publish until opened.
- **VENDOR**: opened at source, but the publisher sells security products. Usable with attribution, never as a neutral statistic.
- **NOT FOUND**: no primary source located.

Rules for using these on the site
1. Quote the number exactly as given here, with the source line under the chart. If the copy says "fast jedes vierte", the footnote still carries 23,4 %.
2. Never combine two sources into one number. Derived values (for example 100 minus a share) are marked DERIVED and should be avoided; phrase the original instead ("Nur 15,55 % beschäftigen IT-Fachkräfte").
3. Mind the population of each survey. Eurostat and Bitkom start at 10 employees (Bitkom also at 1 Mio. Euro turnover); Sophos starts at 100 employees. Only Eurostat (via Destatis) and the Statistik Nord register cover firms with 0 to 9 employees.

---

## 1. Eurostat: ICT security incidents by size class, Germany (rank 1 for a chart)

**VERIFIED.** Table `isoc_cisce_ic`, "Security incidents and consequences by size class of enterprise". Unit PC_ENT (percentage of enterprises). NACE aggregate C10-S951_X_K (all activities except agriculture, mining and financial sector). Column "2024" = survey year 2024; the incident question refers to calendar year 2023 (see reference period check below).

| Indicator (Eurostat label, exact) | DE 0 to 9 | DE 10 to 49 | DE 50 to 249 | EU27 10 to 49 |
|---|---|---|---|---|
| E_SEC2IANY "Enterprises experienced any ICT security related incidents leading to: unavailability of ICT services, destruction or corruption of data, disclosure of confidential data (for any reason)" | 15.87 | 23.4 | 30.39 | 19.85 |
| E_SEC2IUSVF "...leading to: unavailability of ICT services due to hardware or software failures" | 13.97 | 20.69 | 27.24 | 16.5 |
| E_SEC2IUSVA "...leading to: unavailability of ICT services due to attack from outside (e.g. Ransomware attacks, Denial of Service attacks)" | 1.69 | 3.34 | 4.24 | 3.15 |
| E_SEC2IDCDF "...leading to: destruction or corruption of data due to hardware or software failures" | 3.2 | 3.36 | 4.26 | 3.69 |
| E_SEC2IDCDA "...leading to: destruction or corruption of data due to infection of malicious software or unauthorised intrusion" | 0.86 | 1.84 | 1.8 | 1.77 |
| E_SEC2ICNF "...leading to: disclosure of confidential data (e.g. due to intrusion, pharming, phishing attack, actions by own employees (intentionally or unintentionally))" | 1.09 | 2.03 | 3.11 | 1.92 |

Same indicators, survey year 2022 (incidents in 2021), DE 10 to 49: E_SEC2IANY 23.66, E_SEC2IUSVF 21.11, E_SEC2IUSVA 3.47. DE 0 to 9: 13.53, 11.5, 1.76.

- URL (data browser): https://ec.europa.eu/eurostat/databrowser/view/isoc_cisce_ic/default/table?lang=en
- URL (exact API calls used): https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/isoc_cisce_ic?geo=DE&geo=EU27_2020&lang=EN and https://ec.europa.eu/eurostat/api/dissemination/sdmx/2.1/data/isoc_cisce_ic?format=TSV&compressed=false
- Dataset last updated: 2026-06-15 (field `updated` in the JSON).
- Files: `eurostat/isoc_cisce_ic.DE_EU27.json`, `eurostat/isoc_cisce_ic.tsv`. The JSON and the TSV were both read and agree on every value above.
- **Reference period check, done three ways.**
  - Eurostat Statistics Explained "ICT security in enterprises" (PDF generated 2025-08-18, "Data from December 2024", `eurostat/eurostat-statistics-explained-ICT-security-in-enterprises.pdf`, PDF page 9): "In 2023, more than 1 in 5 EU enterprises (21.54%) experienced ICT related security incidents leading to consequences such as the unavailability of ICT services, destruction or corruption of data or disclosure of confidential data". The EU27 GE10 value in our 2024 column is 21.54, so the 2024 column = incidents in 2023.
  - Same PDF, page 9: "The most commonly reported consequence caused by ICT security incidents was the unavailability of ICT services due to hardware or software failures (17.97% of enterprises). In comparison, unavailability of ICT services due to attack from outside (e.g. ransomware attacks, Denial of Service attacks) was reported by 3.43% of enterprises."
  - Destatis Qualitätsbericht "Nutzung von IKT in Unternehmen 2024" (`destatis-qualitaetsbericht-ikt-unternehmen-2024.pdf`), German questionnaire, PDF page 17 (10+ employees) and PDF page 30 (short form for 0 to 9): "Sind im Jahr 2023 durch IT-Sicherheitsvorfälle folgende Probleme ...". PDF page 34: the short form "richtet sich an Unternehmen mit 0 bis 9" employees, which is where the DE 0 to 9 values come from.
- Chart idea: the 10 to 49 bar split into "Ausfall durch Hardware- oder Softwarefehler 20,69 %" against "Ausfall durch Angriff von außen 3,34 %". For a support and maintenance firm this is the strongest single fact: most outages in small German firms came from failures, not hackers.

## 2. Eurostat: who runs IT in small German firms (rank 2)

**VERIFIED.** Table `isoc_ske_fct`, "Enterprises - ICT functions performed by size class of enterprise", and `isoc_ske_itspe`, "Enterprises that employ ICT specialists by size class of enterprise". Unit PC_ENT. Column "2024" = survey year 2024.

Reference period, checked in the German questionnaire (Destatis Qualitätsbericht IKT 2024, `destatis-qualitaetsbericht-ikt-unternehmen-2024.pdf`, PDF page 15 for 10+ employees, PDF pages 28 and 29 for 0 to 9):
- ICT functions (E_IT_*) refer to **2023**: "Wer führte im Jahr 2023 die IT-Aufgaben in Ihrem Unternehmen durch (z. B. Instandhaltung der IT-Infrastruktur, Betreuung der Büro-Software, Entwicklung und Betreuung betriebswirtschaftlicher Software und/oder webbasierter Lösungen, IT-Sicherheit und Datenschutz)?" with answers "6.1 Tätige Personen im Unternehmen" and "6.2 Externe Anbieter".
- ICT specialists (E_ITSP2) refer to the **survey period (January 2024)**: "Beschäftigt Ihr Unternehmen eigene IT-Fachkräfte?" Destatis PDF page 5: "Berichtszeitraum ist der Januar des Erhebungsjahres oder, bei ausgewählten Merkmalen, das Vorjahr des Erhebungsjahres."
- So the site says "2023" for the external supplier shares and "2024" for the IT specialist share.

| Indicator (Eurostat label, exact) | DE 0 to 9 | DE 10 to 49 | DE 50 to 249 | EU27 10 to 49 |
|---|---|---|---|---|
| E_IT_EXT "ICT functions are performed by external suppliers" | 52.49 | 75.98 | n/a in this pull | 70.19 |
| E_IT_EXTQ "ICT functions are only performed by external suppliers" | 32.48 | 38.42 | n/a in this pull | 47.92 |
| E_IT_OWNQ "ICT functions are only performed by own employees" | 23.92 | 13.24 | n/a in this pull | 13.52 |
| E_ITSP2 "Enterprise employed ICT/IT specialists" | 7.1 | 15.55 | 47.86 | 14.04 |

E_ITSP2 for DE 10 to 49 over time: 2017 12.27, 2018 13.08, 2019 11.95, 2020 12.42, 2022 15.07, 2024 15.55.

Related, `isoc_cisce_ra`, survey year 2022 (not collected in 2024): E_ITSEC3EXT "The ICT security related activities are carried out by external suppliers" DE 10 to 49 = 67.88, DE 0 to 9 = 44.37.

- URLs: https://ec.europa.eu/eurostat/databrowser/view/isoc_ske_fct/default/table?lang=en ; https://ec.europa.eu/eurostat/databrowser/view/isoc_ske_itspe/default/table?lang=en ; API calls as in section 1 with the table code swapped.
- Dataset last updated: 2026-06-15.
- Files: `eurostat/isoc_ske_fct.DE_EU27.json`, `eurostat/isoc_ske_fct.tsv`, `eurostat/isoc_ske_itspe.DE_EU27.json`, `eurostat/isoc_ske_itspe.tsv`. JSON and TSV agree.
- DERIVED, avoid: "84,45 % haben keine IT-Fachkraft" (100 minus 15.55). Say "Nur 15,55 % der kleinen Unternehmen (10 bis 49) beschäftigen IT-Fachkräfte" instead.

## 3. BSI, "Die Lage der IT-Sicherheit in Deutschland 2025" (rank 3)

Latest edition. Reporting period 1 July 2024 to 30 June 2025. Published 11.11.2025 (BSI press release "BSI-Jahresbericht: Fortschritte bei Cybersicherheit – doch weiterhin hohe Verwundbarkeit", Ort Berlin/Bonn, Datum 11.11.2025, https://www.bsi.bund.de/DE/Service-Navi/Presse/Pressemitteilungen/Presse2025/251111_BSI-Jahresbericht_2025.html, snapshot `snapshots/bsi-presse-2025-11-11-jahresbericht.html`). The BSI lagebericht page says the report "erscheint einmal pro Jahr im November" and no 2026 edition is out as of 2026-10-21.

Two forms were opened: the eight page summary PDF (Impressum "Stand: Oktober 2025", Artikelnummer BSI-LB25/514), file `bsi-lagebericht-2025-zusammenfassung-DE.pdf`, URL https://www.bsi.bund.de/SharedDocs/Downloads/DE/BSI/Publikationen/Lageberichte/Lagebericht2025_Achtseiter.pdf?__blob=publicationFile&v=7 ; and the full online report at https://medien.bsi.bund.de/lagebericht/de/ (snapshots in `snapshots/bsi-lagebericht2025-*.html|txt`).

| Figure | Exact quote | Where | Label |
|---|---|---|---|
| rund 80 % of reported attacks hit KMU | "rund 80 Prozent der angezeigten Angriffe, zum Beispiel mit Ransomware, richteten sich gegen kleine und mittlere Unternehmen (KMU), denen häufig die Mittel und das Wissen fehlen, um sich selbstständig zu schützen." | Summary PDF page 3 | VERIFIED |
| same, online, with year | "Kleine und mittlere Unternehmen standen wieder besonders im Fokus der Angreifer. Rund 80 Prozent der im Jahr 2024 angezeigten Angriffe zielten auf KMU." | https://medien.bsi.bund.de/lagebericht/de/cybercrime | VERIFIED |
| 950 ransomware reports | "Im Jahr 2024 wurden 950 Ransomware‑Angriffe bei den Polizeien in Deutschland zur Anzeige gebracht" | online, /cybercrime; summary PDF page 7 "950 Anzeigen wegen Ransomware-Angriffen ... davon: 72 % mit Datenleaks ... Quelle: Bundeskriminalamt" | VERIFIED (BSI citing BKA) |
| 72 % with data leaks | "So gingen im Jahr 2024 nicht nur 72 Prozent der angezeigten Ransomware‑Vorfälle mit Datenleaks bzw. mit deren Androhung einher." | online, /cybercrime | VERIFIED |
| 119 new vulnerabilities per day, +24 % | "Im aktuellen Berichtszeitraum wurden weltweit durchschnittlich täglich 119 neue Schwachstellen in IT-Systemen bekannt. Das waren rund 24 Prozent mehr als im vergangenen Berichtszeitraum - teilweise bedingt durch Methodeneffekte." | online, /neue-schwachstellen; summary PDF page 3 | VERIFIED |
| 280.000 new malware variants per day | "Im Berichtszeitraum wurden täglich durchschnittlich 280.000 neue Schadprogramm‑Varianten bekannt. Das waren rund 9 Prozent weniger als im vergangenen Berichtszeitraum mit durchschnittlich täglich 309.000 neuen Schadprogramm‑Varianten (–9 %)." | online, /neue-schadsoftware-varianten | VERIFIED |
| KMU meet only 56 % of basic requirements | "Im Berichtszeitraum wurden 600 CyberRisikoChecks nach DIN SPEC 27076 durchgeführt. Im Schnitt erfüllten die Unternehmen dabei nur knapp 56 Prozent der im Check überprüften Anforderungen." | online, /it-sicherheit-fuer-kmus | VERIFIED |
| KMU share of economy | "In Deutschland stehen 3,1 Millionen kleine und mittlere Unternehmen (KMU) vor den Herausforderungen der Digitalisierung und damit einhergehend der Cybersicherheit. Diese Kategorie von Unternehmen macht nach ihrer Anzahl 99,4 Prozent der deutschen Wirtschaftsunternehmen aus." | online, /gefaehrdungslage-der-kleinen-und-mittleren-unternehmen | VERIFIED |
| Regional lack of fitting providers (no number) | "Und diejenigen KMU, die den Bereich IT/IT‑Sicherheit an einen Dienstleister auslagern möchten, stellen teils fest, dass es in ihrer Region entweder zu wenig qualifizierte Dienstleister gibt oder nur solche, die nicht zu ihrer eigenen Unternehmensgröße passen." | same page | VERIFIED |
| Small firms rarely have IT staff (no number) | "Gerade die Kleinst‑ (unter 10 Beschäftigte) und die kleinen (unter 50 Beschäftigte) Unternehmen verfügen oftmals nicht über das erforderliche Personal, das sich um Betrieb und Absicherung der Informationstechnik des Unternehmens kümmert." | same page | VERIFIED |
| Self assessment of small firms (TÜV) | "In einer aktuellen Studie des TÜV-Verbandes bewerten 91 Prozent der kleinen und 90 Prozent der mittleren Unternehmen die Cybersicherheit des eigenen Unternehmens mit „sehr gut/eher gut“." | online, /it-sicherheit-fuer-kmus | SECONDARY for the TÜV number (see section 12) |
| Only about 1 % of the economy under NIS2 | "Da allerdings nur knapp 1 Prozent der deutschen Wirtschaft unter die direkte NIS-2-Regulierung fallen wird, ..." | online, /it-sicherheit-fuer-kmus | VERIFIED |

Note: the summary PDF says "rund 80 Prozent der angezeigten Angriffe"; the base is attacks reported to police (Hellfeld), so the site must say "angezeigte".

## 4. Eurostat: documented security and specific measures, Germany (rank 4)

**VERIFIED.** Table `isoc_cisce_ra`, "Security policy, measures, risks and staff awareness by size class of enterprise". Unit PC_ENT. Survey year 2024, measures in use at the time of the survey. German questionnaire wording, Destatis Qualitätsbericht IKT 2024 PDF page 16: "Nutzt Ihr Unternehmen eine der folgenden Sicherheitsmaßnahmen?" (item "1.5 Datensicherung (Backup) an einem separaten Speicherort") and "Verfügt Ihr Unternehmen über Dokumente zu IT-Sicherheitsmaßnahmen und -verfahren?".

| Indicator (Eurostat label, exact) | DE 0 to 9 | DE 10 to 49 | DE 50 to 249 | EU27 10 to 49 |
|---|---|---|---|---|
| E_SECPOL2 "Enterprises have document(s) on measures, practices or procedures on ICT security" | not collected | 33.88 | 62.99 | 30.31 |
| E_SECMOSBU "ICT security measure used: data backup to a separate location (including backup to the cloud)" | 81.35 | 88.77 | 95.18 | 77.09 |
| E_SECMDUO "ICT security measure used: combination of at least two authentication mechanisms ..." | 35.38 | 39.8 | 58.02 | 36.12 |
| E_SECMRASS "ICT security measure used: ICT risk assessment, i.e. periodically assessment of probability and consequences of ICT security incidents" | 18.26 | 33.55 | 57.4 | 29.35 |
| E_SECMTST "ICT security measure used: ICT security tests" | 20.65 | 36.99 | 62.14 | 29.76 |
| E_SECMLOG "ICT security measure used: maintaining log files for analysis after security incidents" | 31.57 | 54.87 | 77.56 | 40.31 |
| E_SECMSMS1 "ICT security measure used: monitoring system used to detect suspicious activity in the ICT systems ... excluding standalone anti-virus software and default firewall solutions" | 37.15 | 51.28 | 72.23 | 40.6 |
| E_SECAWNONE "Enterprises don't make persons employed aware of their obligations in ICT security related issues" | not collected | 31.08 | 14.87 | 41.76 |
| E_SECAWCTP "... by compulsory training courses or viewing compulsory material" | not collected | 21.52 | 45.08 | 20.38 |
| E_SECMALL "Enterprises using all ICT security measures (as of 2022)" | 2.33 | 5.55 | 12.12 | 3.88 |
| E_SECPREV_CY "The enterprise's ICT security policy was defined or most recently reviewed within the last 12 months" | not collected | 20.54 | 43.69 | 17.98 |

- URL: https://ec.europa.eu/eurostat/databrowser/view/isoc_cisce_ra/default/table?lang=en ; API as above.
- Dataset last updated: 2026-06-15. Files `eurostat/isoc_cisce_ra.DE_EU27.json`, `eurostat/isoc_cisce_ra.tsv` (agree).
- Caution for the backup chart: 88.77 % of small firms say they back up to a separate location. The number is high, so a backup chart should not imply most firms lack backups. Eurostat does not measure restore tests. Use this as "Backup ist Standard, Wiederherstellung wird selten geprüft" only if a source for the second half is found; none was found.

## 5. Bitkom, Wirtschaftsschutz 2026 (rank 5)

Latest edition. **VERIFIED.** Press conference Berlin, 26. August 2026. Presentation `bitkom-wirtschaftsschutz-2026-praesentation.pdf` (22 pages, PDF page = slide number), URL https://www.bitkom.org/sites/main/files/2026-08/bitkom-praesentation-wirtschaftsschutz-2026.pdf. Press release "Angriffe auf die deutsche Wirtschaft: Spur führt immer öfter zu ausländischen Geheimdiensten", Berlin, 26. August 2026, https://www.bitkom.org/Presse/Presseinformation/Angriffe-auf-deutsche-Wirtschaft-Spur-auslaendische-Geheimdienste (snapshot `snapshots/bitkom-wirtschaftsschutz-2026-presseinformation.html|txt`).

Population: "1.003 Unternehmen ab 10 Beschäftigten und einem Jahresumsatz von mindestens 1 Mio. Euro in Deutschland", telephone survey "KW 16 bis KW 23 2026" (press release methodology note; slide 21).

| Figure | Exact quote | Where |
|---|---|---|
| Damage 211 to 270,8 Mrd. Euro | "Die Schäden durch Datendiebstahl, Industriespionage oder Sabotage gingen auf 211 bis 270,8 Milliarden Euro zurück." | press release; slide 4 "Für 2026 ergibt sich ein Korridor zwischen 211 und 270,8 Milliarden Euro" |
| 76 % of damage from cyberattacks | "Auf Cyberattacken entfallen inzwischen 76 Prozent der Gesamtschäden. Vor einem Jahr lag der Anteil bei 70 Prozent, vor fünf Jahren sogar erst bei 59 Prozent. Die Schäden durch Cyberattacken summieren sich damit auf einen Betrag von 160,4 bis 205,8 Milliarden Euro." | press release; slide 12 |
| 96 % affected or suspect it | "Insgesamt waren zuletzt 96 Prozent aller Unternehmen von Datendiebstahl, Industriespionage oder Sabotage betroffen oder vermuten es." | press release; slide 3 |
| 58 % suffered damage from cyberattacks | "Insgesamt haben 6 von 10 Unternehmen (58 Prozent) in den vergangenen zwölf Monaten einen Schaden durch Cyberangriffe erlitten." | press release; slide 15 |
| Ransomware 25 % (2025: 34 %) | "Bei Cyberangriffen richtet Ransomware weiterhin am häufigsten einen Schaden an. Bei 25 Prozent aller Unternehmen haben Angreifer Daten verschlüsselt und wollten sie nur gegen Lösegeld freigeben. Auch hier zeigt sich verglichen mit dem Vorjahr mit 34 Prozent ein deutlicher Rückgang." | press release; slide 14 bar values 2024 31, 2025 34, 2026 25 (base all companies, n=1.003) |
| Why attacks succeeded | "Als wichtigsten Grund dafür, dass ein Angriff auch zu einem Schaden führte, nennen 59 Prozent der geschädigten Unternehmen die unzureichende Erkennung von Sicherheitsvorfällen. Es folgen Fehlkonfigurationen von IT-Systemen (57 Prozent) und ein unzureichendes Identitäts- und Zugriffsmanagement (55 Prozent), erst danach folgen technische Schwachstellen (50 Prozent), veraltete Hard- oder Software (43 Prozent) sowie eine Kompromittierung über externe Dienstleister oder Zulieferer (8 Prozent). Nur 18 Prozent führen die erfolgreichen Cyberangriffe auf ein unzureichendes Sicherheitsbewusstsein der Beschäftigten zurück." | press release; slide 15 (base n=580 damaged firms) |
| Only 43 % very well prepared | "Obwohl sich nur noch 43 Prozent für sehr gut auf Cyberangriffe vorbereitet sehen (2025: 50 Prozent), fällt der Anteil der Unternehmen, die ihre geschäftliche Existenz durch eine erfolgreiche Cyberattacke bedroht sehen, von 59 auf 45 Prozent." | press release; slide 16 |
| Security share of IT budget 18 % | "Der Anteil der IT-Sicherheit am gesamten IT-Budget stagniert wie im Vorjahr bei 18 Prozent. BSI und Bitkom empfehlen, 20 Prozent des IT-Budgets für Sicherheit aufzuwenden." | press release; slide 18 |

Previous edition, kept for comparison only (VERIFIED): Bitkom Wirtschaftsschutz 2025, press conference Berlin, 18. September 2025 (`bitkom-wirtschaftsschutz-2025-pressekonferenz.pdf`, slide 4 "Gesamtschaden pro Jahr 289,2"; slide 3 "Betroffen" 87 in 2025), study report December 2025 (`bitkom-wirtschaftsschutz-2025-studienbericht.pdf`). Bitkom changed method in 2026 (damage corridor instead of one number), so 289,2 and 211 to 270,8 must not be drawn as one trend line without that note.

## 6. Statistikamt Nord: companies in Hamburg by size class (rank 6, the local market)

**VERIFIED.** Statistisches Amt für Hamburg und Schleswig-Holstein, "Statistisches Jahrbuch Hamburg, Berichtsjahr 2024, Kapitel 12 Gesamtwirtschaft", Tabelle 12.8 "Rechtliche Einheiten in Hamburg im Berichtsjahr 2024 nach Beschäftigtengrößenklassen (Stand: 30.09.2025)". © 2025. URL https://www.statistik-nord.de/fileadmin/Dokumente/JB2024HH_12.xlsx (listed on https://www.statistik-nord.de/presse-veroeffentlichungen/statistische-jahrbuecher). File `statistik-nord/JB2024HH_12.xlsx`, sheet "12.8".

Size classes are "Davon mit … sozialversicherungspflichtig Beschäftigten".

| Hamburg, 2024 | Rechtliche Einheiten |
|---|---|
| insgesamt ("Zusammen") | 102696 |
| 0 – unter 10 | 87418 |
| 10 – unter 50 | 11985 |
| 50 – unter 250 | 2659 |
| 250 und mehr | 634 |

Useful rows from the same sheet: M "Erbringung von freiberuflichen, wissenschaftlichen und technischen Dienstleistungen" 23241 total, 21147 under 10, 1704 with 10 to under 50; Q "Gesundheits- und Sozialwesen" 6745 total, 4823 under 10, 1483 with 10 to under 50; F "Baugewerbe" 6237, 5344, 808.

Footnote 2 (exact): "zum Stand 30.09.2025 Rechtliche Einheiten (siehe methodischer Hinweis zum Unternehmensbegriff unter Erläuterungen) mit steuerbarem Umsatz aus Lieferungen und Leistungen und/oder mit sozialversicherungspflichtig Beschäftigten im Berichtsjahr 2024 sowie Sitz in Deutschland"

Independent confirmation: Deutscher Bundestag Drucksache 21/7502 (05.08.2026), Antwort der Bundesregierung "Wirtschaftspolitik nach Betriebsgrößen", PDF page 2, Hamburg row "87.418 11.985 2.659 634 102.696", source line "Unternehmensregister Tabelle 52111-03-02-4-B, Stand: 24.07.2026". Same five numbers. Schleswig-Holstein total also matches (Jahrbuch SH 12.8 "Zusammen 123782 105047 15458 2746 531" against Drucksache "123.782"). File `bundestag-drucksache-21-7502.pdf`, URL https://dserver.bundestag.de/btd/21/075/2107502.pdf.

**Kreis Stormarn: VERIFIED (official reproduction).** Drucksache 21/7502, Anlage 1, PDF page 6, row "Stormarn, Kreis 11757 9991 1456 260 50" (Insgesamt; 0 bis unter 10; 10 bis unter 50; 50 bis unter 250; 250 und mehr abhängig Beschäftigte), 2024, source "Statistische Ämter des Bundes und der Länder, 2026, Unternehmensregister Tabelle 52111-03-02-4-B, Stand: 24.07.2026". Neighbouring Kreise on the same page: Herzogtum Lauenburg 7754, Pinneberg 13479, Segeberg 11718. The original table at regionalstatistik.de needs a login ("Der Zugriff auf die Seite ist ohne Anmeldung zur Zeit nicht möglich.") and the GENESIS API returned 401 for guest access, so it was not opened. The Statistik Nord SH Jahrbuch has no Kreis breakdown. The Hamburg and SH rows of the same Drucksache match Statistik Nord exactly, which is the cross check.

Handelskammer Hamburg: not used. NOT FOUND as a size class table.

## 7. Microsoft end of support (rank 7, a date for a timeline, not a statistic)

**VERIFIED.** All on learn.microsoft.com, snapshots in `snapshots/microsoft/`.

| Item | Exact quote | URL | Page date (ms.date) |
|---|---|---|---|
| Windows 10 end of support | "Windows 10 will reach end of support on October 14, 2025." German page: "Der Support für Windows 10 wird am 14. Oktober 2025 eingestellt." Support dates table: Retirement Date "10/15/2025 6:59:59 AM" (dates shown in Pacific Time) | https://learn.microsoft.com/en-us/lifecycle/products/windows-10-home-and-pro ; https://learn.microsoft.com/de-de/lifecycle/products/windows-10-home-and-pro | 2024-09-17 |
| ESU price for businesses | "Extended Security Updates for organizations and businesses on Windows 10 can be purchased today through the Microsoft Volume Licensing Program, at $61 USD per device for Year One. ... The price doubles every consecutive year, for a maximum of three years." | https://learn.microsoft.com/en-us/windows/whats-new/extended-security-updates | 2025-11-17 |
| ESU term | "Enrolled PCs belonging to a commercial or educational organization can receive security updates for a maximum of three years after end of support for Windows 10." and "The Extended Security Update Program for Windows 10 must be purchased by year. ... Year One starts in November 2025. If you decide to purchase the program in Year Two, you have to pay for Year One too, as ESUs are cumulative." | same | 2025-11-17 |
| ESU excludes support | "ESUs doesn't include the following items: New features, Customer-requested nonsecurity updates, Design change requests" | same | 2025-11-17 |
| Office 2016 | Extended End Date "10/15/2025 6:59:59 AM" (Pacific Time) | https://learn.microsoft.com/en-us/lifecycle/products/microsoft-office-2016 | 2025-04-18 |
| Office 2019 | Extended End Date "10/15/2025 6:59:59 AM" (Pacific Time) | https://learn.microsoft.com/en-us/lifecycle/products/microsoft-office-2019 | 2025-04-18 |
| Products ending 14 Oct 2025 | "Ending Support in 2025" list, Fixed Policy, row ending "| October 14, 2025" includes "Exchange Server 2016", "Exchange Server 2019", "Microsoft Office 2016", "Microsoft Office 2019", "Outlook 2016", "Outlook 2019", "Word 2016", "Word 2019" | https://learn.microsoft.com/en-us/lifecycle/end-of-support/end-of-support-2025 | 2024-11-14 |

DERIVED, avoid unless stated as Microsoft's rule: year two price of 122 USD (61 doubled). As of today (2026-10-21) ESU year one has ended and year two is running.

## 8. NIS2 in Germany (rank 8, context, not a chart)

**VERIFIED.**
- In force: BSI press release "Cybersicherheitsrecht: NIS-2-Umsetzungsgesetz ab morgen in Kraft", Datum 05.12.2025, https://www.bsi.bund.de/DE/Service-Navi/Presse/Pressemitteilungen/Presse2025/251205_NIS-2-Umsetzungsgesetz_in_Kraft.html: "Mit der heutigen Verkündung des Gesetzes zur Umsetzung der NIS-2-Richtlinie und zur Regelung wesentlicher Grundzüge des Informationssicherheitsmanagements in der Bundesverwaltung tritt ab morgen eine umfassende Modernisierung des Cybersicherheitsrechts in Kraft." So in force from 6 December 2025.
- Scale: same release: "Unternehmen müssen selbständig prüfen, ob sie von der NIS-2-Richtlinie betroffen sind und damit künftig zu den rund 29.500 durch das BSI beaufsichtigten Einrichtungen gehören ... Bislang waren etwa 4.500 Organisationen durch das BSI-Gesetz reguliert".
- Law: BSI-Gesetz vom 2. Dezember 2025 (BGBl. 2025 I Nr. 301), gesetze-im-internet.de "Ausfertigungsdatum: 02.12.2025", Vollzitat "zuletzt durch Artikel 8 Absatz 1 des Gesetzes vom 23. Juli 2026 (BGBl. 2026 I Nr. 226) geändert".
- Threshold, § 28 Abs. 2 Nr. 3 BSIG (https://www.gesetze-im-internet.de/bsig_2025/__28.html): wichtige Einrichtungen are entities of the types in Anlagen 1 and 2 that "a) mindestens 50 Mitarbeiter beschäftigen oder b) einen Jahresumsatz und eine Jahresbilanzsumme von jeweils über 10 Millionen Euro aufweisen." Besonders wichtige (§ 28 Abs. 1 Nr. 4): "a) mindestens 250 Mitarbeiter beschäftigen oder b) einen Jahresumsatz von über 50 Millionen Euro und zudem eine Jahresbilanzsumme von über 43 Millionen Euro aufweisen."
- Why it reaches small suppliers, § 30 Abs. 2 BSIG (https://www.gesetze-im-internet.de/bsig_2025/__30.html): measures must include "3. Aufrechterhaltung des Betriebs, wie Backup-Management und Wiederherstellung nach einem Notfall, und Krisenmanagement," and "4. Sicherheit der Lieferkette einschließlich sicherheitsbezogener Aspekte der Beziehungen zu unmittelbaren Anbietern oder Diensteanbietern,". § 30 Abs. 1: "Die Einhaltung der Verpflichtung nach Satz 1 ist durch die Einrichtungen zu dokumentieren."
- Snapshots in `snapshots/nis2/`.
- Site wording: most Hertling clients are below the thresholds. The honest line is that NIS2 regulated customers will ask their suppliers for documented security, not that NIS2 applies to a 12 person office.

## 9. Sophos, State of Ransomware 2026 (rank 9, VENDOR)

**VENDOR.** Survey by Vanson Bourne for Sophos, January to March 2026, 2,158 respondents in organisations with 100 to 5,000 employees, 17 countries. Population is larger than Hertling's clients; label "Herstellerstudie" on the site.

Germany report, "The State of Ransomware in Germany 2026", "A SOPHOS WHITEPAPER - JULY 2026", 139 German respondents, file `sophos-state-of-ransomware-germany-2026-VENDOR.pdf`, URL https://assets.sophos.com/X24WTUEQ/at/cc9b8gwsnwzqt9cqwpc3nv6/sophos-state-of-ransomware-in-germany-2026.pdf
- PDF page 4: "60% of German organizations recovered from a ransomware attack in up to a week, a slight drop from the 64% reported in the 2025 report. 12% took between one and six months to recover, a small increase from the 9% in the 2025 report."
- PDF page 4: "Excluding any ransom payments, the average (mean) cost incurred by German organizations to recover from a ransomware attack in this year's report came in at $1.42 million, a slight decrease from the $1.56 million mean reported in the 2025 report."
- PDF page 3: "61% of German organizations used backups to recover encrypted data, a slight increase from the 59% reported in the 2025 report." and "Poor quality protection (40%) was the most common operational root cause, followed by an unknown security gap and a lack of expertise, which were tied for second at 39% each."

Global report, "The State of Ransomware 2026", file `sophos-state-of-ransomware-2026-VENDOR.pdf`, URL https://assets.sophos.com/X24WTUEQ/at/jbww7pmb8n3gp99wr6hfq4/sophos-state-ransomware-report-2026.pdf
- PDF page 24: "Over half of organizations (55%) recovered from ransomware within one week (16% in less than a day) and 83% recovered within one month. Only 3% took longer than three months."
- PDF page 23: recovery cost excluding ransom "$2.73 million" (2024), "$1.53 million" (2025), "$1.70 million" (2026).
- PDF page 14: "Encryption outcomes varied by organization size, with the largest organizations surveyed (3,001–5,000 employees) most likely to stop attacks before encryption or extortion (46%) compared to just 34% for the smallest (100–250 employees)."
- The 2026 press release was opened only through a summarising fetch tool, not byte for byte; use the PDFs above.

## 10. Bitkom, Arbeitsmarkt für IT-Fachkräfte 2026 (rank 10, why hiring your own admin is hard)

**VERIFIED.** Press release "IT-Fachkräftemangel hat sich in den letzten drei Jahren halbiert", Berlin, 03. September 2026, https://www.bitkom.org/Presse/Presseinformation/IT-Fachkraeftemangel-in-den-letzten-drei-Jahren-halbiert (snapshot `snapshots/bitkom-it-fachkraefte-2026-presseinformation.html`). Report `bitkom-arbeitsmarkt-it-fachkraefte-2026-studienbericht.pdf`, URL https://www.bitkom.org/sites/main/files/2026-09/bitkom-studienbericht-arbeitsmarkt-it-fachkraefte-2026.pdf (PDF title metadata still reads "Studie 2025", the cover and contents say 2026). Survey of 853 and 602 companies "ab 3 Beschäftigten", "zwischen KW 18 und KW 25 des Jahres 2026" (PDF page 3).
- "In Deutschland fehlen 79.000 IT-Fachkräfte. Damit hat sich die Zahl der unbesetzten IT-Stellen im Vergleich zu 2023 fast halbiert: Damals lag sie bei 149.000, 2025 bei 109.000." (press release; report PDF page 7)
- "97 Prozent der Unternehmen mit IT-Stellen haben Schwierigkeiten, diese zu besetzen." (press release; report PDF page 10)
- "Am häufigsten werden jedoch ganz klassisch Fachkräfte für IT-Administration und Systembetrieb gesucht (26 Prozent)" (press release). Report PDF page 11 adds: "Die Ergebnisse basieren auf einer vergleichsweise kleinen Fallzahl von 105 Unternehmen und sind daher in erster Linie als Stimmungsbild einzuordnen." Do not chart the 26 % without that caveat.

## 11. KfW-Digitalisierungsbericht Mittelstand 2025 (rank 11, quote only)

**VERIFIED.** KfW Research, Frankfurt am Main, April 2026, file `kfw-digitalisierungsbericht-mittelstand-2025.pdf`, URL https://www.kfw.de/PDF/Download-Center/Konzernthemen/Research/PDF-Dokumente-Digitalisierungsbericht-Mittelstand/KfW-Digitalisierungsbericht-2025.pdf. PDF page 29 (printed "Seite 25"):
- "Im Mittelstand wurde in den zurückliegenden Jahren knapp ein Drittel der Unternehmen Opfer von Cyberkriminalität." (footnote 77 points to Zimmermann 2023f, KfW Fokus Volkswirtschaft Nr. 419; the underlying number was not opened, so "knapp ein Drittel" is the only usable wording.)
- "Auch die Auslagerung der IT-Sicherheit an spezialisierte IT-Dienstleister kann eine Lösung darstellen. Dazu wäre es hilfreich, das Angebot und die Transparenz darüber gerade bei kleinen und mittleren Unternehmen zu erhöhen."

## 12. Not opened, not found, or not usable

- **BKA, Bundeslagebild Cybercrime 2025: SECONDARY, do not publish yet.** A search summary reported 1.041 ransomware attacks reported in 2025 (2024: 950) and about 90 % aimed at KMU, published 12 May 2026, PDF https://www.bka.de/SharedDocs/Downloads/DE/Publikationen/JahresberichteUndLagebilder/Cybercrime/cybercrimeBundeslagebild2025.pdf?__blob=publicationFile&v=6 . bka.de reset every connection through our proxy (curl 6 tries, HTTP/1.1 and HTTP/2, plus WebFetch 503) while bitkom.org and bsi.bund.de loaded in the same minutes. The failure is on our side. If these numbers are wanted, someone opens the PDF and quotes the page. Until then use the BSI figures in section 3 (950 reports, rund 80 % KMU, year 2024), which are VERIFIED.
- **TÜV-Verband, Cybersecurity Studie 2025: SECONDARY.** Known only via the BSI Lagebericht quote in section 3 (91 % of small and 90 % of medium firms rate their security "sehr gut/eher gut"). tuev-verband.de reset every connection (control host bitkom.org returned 200 in the same minute). Study PDF to open later: https://www.tuev-verband.de/fileadmin/user_upload/Content_local/Studien_local/2025_TUEV-Verband_Cybersecurity-Studie_Studienbericht.pdf
- **How long small firms wait for IT support: NOT FOUND.** No primary German source with a waiting time figure was found (searched BSI, Bitkom, KfW, DsiN, Destatis). The closest primary statements are the BSI quote on regional lack of fitting providers (section 3) and Eurostat on outsourcing (section 2). Do not put a waiting time number on the site.
- **DsiN Praxisreport Mittelstand: NOT FOUND for 2024 to 2026.** The newest edition found is 2021/22 (https://sicher-im-netz.de/wp-content/uploads/2024/03/DsiN-Praxisreport-2021_22.pdf), too old and not opened.
- **Restore tests in small firms: NOT FOUND** as a primary statistic. Eurostat measures backups to a separate location, not restore tests.
- **Destatis Länder table for the Unternehmensregister:** destatis.de timed out repeatedly and GENESIS needs a login, so Statistik Nord (section 6) is the primary for Hamburg.

---

## Best five figures for the site

1. **23,4 % of German firms with 10 to 49 employees had an IT incident with real consequences in 2023, and 20,69 % had IT services go down because of hardware or software failure, against 3,34 % because of an outside attack** (Eurostat `isoc_cisce_ic`, DE, 2024 survey). Why: it is official, it is about firms Hertling's size, and it says that most of the damage comes from failures that maintenance and monitoring prevent. That is a better fit for a support firm than a hacker scare. The 0 to 9 values (15,87 %, 13,97 %, 1,69 %) let the chart include the smallest offices too.
2. **75,98 % of German firms with 10 to 49 employees had IT tasks performed by external suppliers in 2023, and only 15,55 % employed an IT specialist in 2024** (Eurostat `isoc_ske_fct` and `isoc_ske_itspe`, DE, survey 2024). Why: it makes "you need an IT partner" a statement of what is normal rather than a sales line. Pair it with the BSI quote that small firms often find too few providers in their region that fit their size.
3. **Rund 80 % of the ransomware and other attacks reported to police in 2024 were aimed at KMU, out of 950 ransomware reports** (BSI Lagebericht 2025, summary page 3 and /cybercrime). Why: the federal security agency, in German, naming Hertling's exact customer group. Keep the word "angezeigte".
4. **Only 33,88 % of German firms with 10 to 49 employees have documented IT security measures, and 31,08 % do not brief staff on security at all** (Eurostat `isoc_cisce_ra`, DE, 2024). Why: it supports the "documented" part of the pitch directly, and NIS2 (§ 30 BSIG, documentation and supply chain duties, in force since 6 December 2025) explains why customers are starting to ask for documentation.
5. **Hamburg has 87.418 businesses with fewer than 10 employees and 11.985 with 10 to 49** (Statistik Nord Jahrbuch 2024, Tabelle 12.8; matched by Bundestag Drucksache 21/7502). Why: it sizes the local market Hertling serves from Reinbek, and it is the only local number on the list. Stormarn (9.991 and 1.456) can sit beside it with the "official reproduction" note.

Runner up: Bitkom Wirtschaftsschutz 2026, reasons attacks caused damage (59 % unzureichende Erkennung, 57 % Fehlkonfigurationen, 43 % veraltete Hard- oder Software). Strong for a "what we actually fix" chart, but the sample starts at 10 employees and 1 Mio. Euro turnover, so say so in the footnote.
