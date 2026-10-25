# Research notes, Mentor Bilali, MagenDarm Zentrum Oberaargau (MDZO), 2026-10-25

Session astra-agency-cf (24052593). Evidence folder
/tmp/claude-0/-home-user-astra-agency/24052593-7323-58b2-9e3f-744f7080d43c/scratchpad/leads/mdzo/ (raw lemlist pulls in
lemraw/, both crawls in pass1/ and pass2/, raw HTML in raw/, every Next.js chunk in js/, all 15 PDFs with text in pdfs/,
full page screenshots of all 11 pages desktop and phone in shots/, outside pages in ext/, the claim recheck in recheck/).

Raka's angle call, 25 Oct, word for word: "modern website to get more sales and gtm to retain and have loyal customers,
this is such a ppt website also".

## In plain words

Mentor runs his own gastroenterology practice in Langenthal, opened 2 Dec 2024 after he left the hospital (SRO), three
doctors, eight staff, three endoscopy rooms, two more staff joining 1 Nov and a new specialist on 1 Jan when Dr. Huber
retires. Patients are mostly sent by their GP. On the website a GP refers through a PDF form that asks to be sent from
Adobe Acrobat, and a patient gets PDFs to fill in, sign and bring, plus prep sheets, with questions going to the phone.
So the angle is a modern site that does that work online, which is Raka's "modern website", translated for a doctor.

## Thread and record

- `python3 tools/lemlist.py thread ctc_57ZdWuBtxThjA46JZ`, 2026-10-25 13.18 UTC, control ctc_ch3vFcKAkjQdMKDCg 6 items ok,
  this contact 0 items. `lemlist.py inbox` list (176 lines) has no Bilali, MagenDarm or mdzo hit. Queue has one row for
  him, RESEARCH_QUEUED 25 Oct, nothing SENT anywhere in state or logs.
- Contact record `GET /api/contacts/ctc_57ZdWuBtxThjA46JZ`: firstName Mentor, lastName Bilali, jobTitle "Leiter und
  Inhaber", tagline "MD, Leiter und Inhaber", location Langenthal, one campaign cam_BRBXAzzDKMfC4fSCS (W5 TEST 50 Owners
  of clinics, law and accounting firms, GDPR), leadId lea_vgX2BikReaRp8vDKw. Activities: visit 13 Oct, invite 14 Oct,
  linkedinInviteAccepted 2026-10-25T06:15:46Z. Company fields on the activity: companyName MagenDarm Zentrum Oberaargau,
  companyDomain mdzo.ch, companyFoundedOn 2024, companyEmployeeCount 3 (stale, the site shows 11 people),
  companyLocation wrongly "Langenthal, Landkreis Bad Kreuznach, Germany" (the HQ field says Langenthal, Switzerland).
- Tagline and jobTitle agree, the domain is theirs (it names the practice and him), no "former" anywhere.

## The person, outside lemlist

- mdzo.ch home and /uber-uns.html, read 25 Oct 2026 (the whole site was redeployed 23 Oct 2026 15.44 UTC per
  Last-Modified), "Dr. med. Mentor Bilali, Leiter und Inhaber, Facharzt FMH Gastroenterologie & FMH Allgemeine Innere
  Medizin". /doctor-details-mb.html "Ab 12/24: Leiter und Inhaber MagenDarm Zentrum Oberaargau", before that Chefarzt
  Gastroenterologie SRO and Praxis Gastroenterologie Oberaargau AG 01/21 to 11/24.
- Every practice PDF is headed "Dr. med. Mentor Bilali" and the patient data notice calls him "die oben genannte
  Arztpraxis", so the practice runs under his name. MDZO itself is not in Zefix (searches MagenDarm, MagenDarm Zentrum,
  Zentrum Oberaargau, Bilali), which fits a sole practice under his name.
- Zefix, Gastroenterologie Oberaargau AG CHE-217.721.178 (the SRO linked practice), SHAB 12 Feb 2025, "Ausgeschiedene
  Personen ... Bilali, Mentor", so he left the old practice when he opened his own.
- Comparis (MedReg data), https://www.comparis.ch/gesundheit/arzt/kanton-bern/langenthal/bilali-mentor-7601000782717 read
  through tools/fetch-walled.py, "Aktive Berufsausübungsbewilligung", MDZO Gruppenpraxis Melchnaustrasse 1 is his
  "Hauptstandort", Facharzt Gastroenterologie 2018, AIM 2015, "Dieser Standort bietet keine Online-Terminbuchung an".
- MedReg itself (medregom.admin.ch) refused by our proxy, written down as walled.
- LinkedIn company page https://www.linkedin.com/company/magendarm (fetch-walled, 200), 71 followers, "Founded 2024",
  latest post 11 months ago, "1-Jahres-Jubiläum! Tag der offenen Tür am 29.11.25 ... Mentor Bilali und das gesamte Team".
- Unter-Emmentaler, 3 Dec 2024, page 7 (https://www.bern-cci.ch/files/sektion-wvo/Events/2024_Kleiner_Wirtschaftsgipel/UE_03_12_seite07.pdf),
  "Oberaargau erhält ein MagenDarm Zentrum", opened 2 Dec 2024 in the former Vögele Shoes space, "Ich wollte etwas
  Eigenes aufbauen", eight person team with two specialists treating "die zugewiesenen Patientinnen und Patienten",
  three endoscopy rooms, "Leute mit einer gewissen Angst und Unsicherheit zu uns kommen", a shortage of specialists and
  rising demand, more specialists to join early 2025.

## Personal LinkedIn, six routes

1. tools/fetch-walled.py https://www.linkedin.com/in/mentor-bilali-145241a2, 999, 1,530 bytes, walled.
2. Web search "Mentor Bilali" Gastroenterologie Langenthal, OneDoc, Comparis and the UE PDF, no LinkedIn headline.
3. Company page posts through fetch-walled, one post visible, the Nov 2025 open day, signed by him.
4. People data, Comparis (MedReg) above, Zefix for doctogo GmbH below.
5. tools/news.py "Mentor Bilali", 10 results (Albinfo 2023 to 2026, UE 2024).
6. Albinfo profiles, president of the Albanian Doctors' Association of Switzerland 2024 to 2026 (23 Mar 2024), and the
   Dec 2025 feature on MDZO.

## The site, both passes

- tools/crawl.py twice, 12 URLs each, 11 at 200 and /formulare 404 (the Vorbereitung page links the consent line to
  /formulare without .html, Apache 404 on a direct load, small). Texts identical between passes.
- Pages: home, Über uns, Unser Angebot, Vorbereitung, Formulare, Kooperationen, Aktuell, Kontakt, three doctor pages.
  Next.js static export on a Bootstrap medical template (class names "Feautes section", "single-schedule",
  "time-sidual", a 404 view with lorem ipsum "Aenean eget sollicitudin lorem" left in the bundle). html lang="en", every
  page titled "MagenDarm". Copyright "Urheberrecht 2024". Logo blur metadata "Creation 2024:10:16".
- site-audit.js, render trusted, 0 page errors, 0 failed requests, no banner, no privacy link, controls fired. Then my
  own Playwright pass, full page screenshots of all 11 pages at 1440 wide and iPhone 13, all opened. Only 404s were
  Next.js prefetch payloads and the hero's url(undefined), nothing a visitor sees.
- What a visitor sees. Home, hero with the name and tagline over the reception photo, three big coloured circles
  (Kontakt, Öffnungszeiten Mo to Fr 07.30 to 12.00 and 12.30 to 17.00, Telefonzeiten Mo to Fr 08.00 to 12.00 and
  13.00 to 17.00), six service teasers cut with "...", a blank gap, two doctor cards (Bilali, Huber), footer. Buttons
  only "Erfahren Sie mehr" (to Über uns) and two "Alle ansehen". On a phone the circles stack one under another.
  Über uns, a 20 MB clinic video (H.264, our Chromium can't play it, the file is 200 at /videos/MagenDarm-Clinic.mp4),
  three text panels, 11 real staff portraits. Unser Angebot, 15 services as accordions, the full descriptions are in the
  page bundle (checked, e.g. Koloskopie "Darmkrebsvorsorge, insbesondere ab dem 50. Lebensjahr", IBD "Regelmäßige
  Kontrolluntersuchungen"), so no "nothing explained" claim is made. A home card click goes to /unser-angebot#slug.
- How the practice works, from its own pages.
  - Referral. Kontakt "Anmeldeformular für Zuweisungen. Klicken Sie auf das Anmeldeformular um es für Zuweisungen
    aufzurufen", a fillable PDF (https://mdzo.ch/docs/Anmeldung-PDF.pdf, made Jun 2024, edited 22 Oct 2024) whose
    Senden button mails mdzo@hin.ch and says "** Hinweis: Bitte verwenden Sie Adobe Acrobat Reader zum Senden." Header
    still Dr. Bilali alone. Kooperationen "Ihr Zuweiser kann uns sensible Patientendaten via HIN zukommen lassen ... an
    mdzo@hin.ch".
  - Booking. Phone in Telefonzeiten, or the general contact form (posts to /send-mail.php, five fields). No booking
    widget in any of the 19 chunks (grep onedoc, doctolib, calendly, booking, control "Termin" found in Vorbereitung and
    the form handler found by "fetch("). Comparis agrees, no online booking. Not used in the message, a call before an
    endoscopy is a model (RULES 0F).
  - Preparation. Vorbereitung "In den beiliegenden Informationsblättern ... Bitte mitbringen Krankenkassenkarte,
    Medikamentenliste, Personalienblatt ausgefüllt und unterschrieben, Einverständniserklärung-(en) ausgefüllt und
    unterschrieben, Patienteninformation zum Umgang mit Personendaten unterschrieben", questions "während unserer
    Öffnungszeiten". Formulare, 15 PDFs (Word exports Sep 2024 to Jan 2025), consent and questionnaire per exam, the
    Personalienblatt "Bitte in Blockschrift ausfüllen", PLENVU and Moviprep prep sheets. Personalienblatt also says
    missed appointments without 24h notice "können ... mit CHF 75.00 in Rechnung gestellt werden".
  - Team change. Aktuell, Florida Ulrich leaves 26.10.2026, Ramona Schneider (Sekretariat) and Franziska Pfluger (MPA
    Endoskopie) join 01.11.2026, Dr. Thomas Huber retires 31.12.2026, Dr. Ana Maria Kunz (Gastroenterologin) joins
    01.01.2027. Home still shows Huber as one of two doctors.
  - Kooperationen copy for MediData describes Medidata Solutions (clinical trials SaaS), not the Swiss billing network the
    Personalienblatt means. Small, proof only.

## Outside sources

- Albinfo 2 Dec 2025 (https://www.albinfo.ch/gastroenterologu-dr-mentor-bilali-nje-nga-mjeket-me-te-kerkuar-nga-shqiptaret-e-zvicres/),
  in Albanian, says MDZO treated "mbi katër mijë pacientë" (over 4,000 patients) in under a year, patients from all over
  Switzerland for regular checks and preventive exams, and that Albanian speaking patients seek him out. A media claim,
  not his own words, kept out of the message.
- Albinfo 10 Nov 2025, open day 29 Nov 2025, QR code to mdzo.ch.
- Albinfo 7 Nov 2023 interview, "doctogo", a patient app he developed "së bashku me ekipin" (with his team), a personal
  record of documents, appointments and medication reminders, built because patients arrive without the right documents.
  Zefix doctogo GmbH CHE-241.569.385, Bassersdorf, registered 13 Jul 2021, "Bilali, Mentor ... Gesellschafter und
  Vorsitzender der Geschäftsführung". www.doctogo.ch last modified 11 Mar 2023 with placeholder FAQ ("Hier kommt eine
  Frage"), the App Store id1619327411 and Play Store com.doctogo.app pages both 404 (controls, another App Store app and
  WhatsApp, 200 in the same minute). So the app looks discontinued.
- Beriflapp (https://beriflapp.com/), a Zurich software house at Technopark, lists "Doctogo" among its clients and hosts
  the Matomo that mdzo.ch loads (analytics.beriflapp.com, site id 8). So he has a development partner, very likely the
  one behind this site. The biggest flag for Raka.
- OneDoc https://onedoc.ch/en/gastroenterologist/langenthal/p459/dr-mentor-bilali, an unclaimed profile with the old SRO
  address St. Urbanstrasse 67 and phone 062 916 31 31, "cannot be booked on OneDoc yet". Not theirs to own, not used.
- Wayback, the availability API (archive.org) shows a capture of https://www.mdzo.ch/ on 2025-07-06, status 200. The
  snapshot itself and the CDX list reset through our proxy every time (curl, fetch-walled), walled. Common Crawl index
  also reset. The design's age rests on the 2024 copyright, the 2024 logo metadata, PDFs from Sep 2024 and the Dec 2024
  opening, so the site is about 22 months old, not just built.
- Social, tools/social-audit.js, Instagram https://www.instagram.com/magendarm.zoa 124 followers, 4 posts, latest
  2025-12-31, LinkedIn https://www.linkedin.com/company/magendarm 71 followers, Facebook
  https://www.facebook.com/magendarm.zoa 402 followers, post dates walled.
- GDPR sweep, tools/eu-view.py from Stockholm, 2 first party cookies (_pk_id.8, _pk_ses.8, Matomo) set before any click,
  third party host analytics.beriflapp.com, no consent code, no privacy page or Impressum on the site (site-audit, control
  fired), the data notice only as a patient PDF. Swiss nDSG territory. Never the angle (RULES 0E).
- News, tools/news.py de, control Volkswagen 100 then 102. Company 3 (Albinfo x2, UE). Person 10. Region (Langenthal OR
  Oberaargau) gastro 6 (Medinside 1 Mar 2025 Solothurn seeks a Chefarzt Gastroenterologie, BZ 2020 SRO grows).
  Industry "Gastroenterologie Praxis" 63, "TARDOC Pauschalen Gastroenterologie" 4, Medinside 18 Feb 2026 "Tardoc führt
  zu «Abrechnungstrick» bei Gastroenterologen", Ktipp 23 Feb 2026, SRF 7 May 2026 on flat rate billing errors, Medinside
  12 May 2026 "Darmkrebs-Screening bleibt gesichert", Medinside 24 Aug 2026 Schaffhausen's endopraxis closes at once.
  Practices are under new tariff and cost pressure in 2026, context only. Medinside article pages themselves 404 on the
  slugs tried, the Google News items are the source.
- Bern colorectal screening programme, run by the Krebsliga beider Basel since 1 June 2022 (berner-aerzte.ch and
  krebsliga notices in search), linked from Kooperationen. Not new, not used.

## Pain table

| # | Pain | Proof | Cost for him | Would he name it | Incumbent | Verdict |
|---|---|---|---|---|---|---|
| 1 | Referrals and patient paperwork run on PDFs and the phone | Kontakt, the Acrobat note in the PDF, Vorbereitung, Formulare | Front desk hours on every referral and every patient, three people in the Sekretariat (Schick, Trüssel, Plüss) and a fourth (Schneider) joining 1 Nov | Likely, he built an app in 2023 because patients arrive without the right papers | Beriflapp maintains the site, doctogo is gone | CHOSEN, biggest, it touches every patient and every GP |
| 2 | The look, Raka's "ppt website" | Screenshots, template classes, circles, cut teasers, blank gap, German only, Huber still on home | Trust for a practice of three specialists | Maybe | Beriflapp | Folded into "modern", never named |
| 3 | Recalls and follow ups (Raka's "retain") | IBD "Regelmäßige Kontrolluntersuchungen", Vorsorge from 50, liver monitoring | Lost follow ups | Can't be seen from outside, his own app had reminders and was pulled | Practice software, doctogo | Not in the message, a flag and a sketch extra |
| 4 | Findability | OneDoc old SRO address, our search didn't return mdzo.ch | Patients sent to the hospital line | Not theirs, small | | Dropped |
| 5 | Social | 4 Instagram posts, last 31 Dec 2025 | Small for a referral practice under FMH rules | No | | Dropped |
| 6 | GDPR, nDSG | Matomo cookies before any click, no privacy page | 50 euro fix | | | Sweep only |
| 7 | AI "did you know", bowel prep | Two page German PLENVU PDF, the CHF 75 no show fee | Repeat colonoscopies, lost slots | Clinical, likely | Possibly doctogo style tools | Alternative if Raka prefers the AI shape |

## Flags for Raka

1. He co-owns a health app company (doctogo GmbH, chair of management) and a Zurich software house, Beriflapp, lists
   doctogo as a client and runs the analytics on mdzo.ch. He has developers, and his app looks pulled from both stores.
   Expect "we have our own developers" as the likeliest no.
2. Demand looks strong (4,000+ patients in year one per Albinfo, a specialist shortage per the UE article), so "more
   sales" was translated into easier GP referrals and less front desk load, never "losing patients" (RULES 0G point 4).
3. Raka's "retain" (recalls) isn't in the message. It can't be seen from outside and his own app already tried
   reminders. It can go into the sketch.
4. docs/gtm-plan.md puts clinic owners in Tier 2, "only with the AI workflow did you know message". Raka's live call for
   this lead was the website, so that's what's drafted.
5. Albinfo says Albanian speaking patients come to him from all over Switzerland and the site is German only. Real, but it
   rests on ethnicity and a media claim, so it's left out.
