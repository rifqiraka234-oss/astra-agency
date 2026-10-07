# Oussama El Khattabi, CARRIER IN, ctc_aC7H6Zj7NQi4y78o7, lea_jv6ne8SRMaJDraYka

## VERDICT: CLOSED_NOT_ICP. He isn't an owner or a legal officer of CARRIER IN. No draft.

Plain words. CARRIER IN belongs to its founder, Sébastien Rousseau, through a holding company and an
Andorran company he represents. Oussama holds the job title "Directeur général" but he isn't on the
register as a director or officer of CARRIER IN, its holding, or any French company. His own LinkedIn
tagline names a different job, "Directeur de l'exploitation et de la gestion - SPL" (an SPL is a
publicly owned local company), so he may not even be at CARRIER IN any more.

## Thread (2026-10-07 ~16:03 UTC, sync "recent" 16:02:47Z)
- get_inbox_conversation ctc_aC7H6Zj7NQi4y78o7: 0 activities, totalItems 0, nextPage null.
- Positive control ctc_ch3vFcKAkjQdMKDCg same minute: 2 items (connect note 2026-10-01, opener 2026-10-07). Method works.
- get_inbox_conversations sentOnly "Oussama El Khattabi": one hit, connect note 2026-09-20 13:13 UTC, lastRepliedAt null.
- myConversations "Khattabi": 0.
- Shape would have been OPENER. He never replied.

## Record (search_campaign_leads lea_jv6ne8SRMaJDraYka)
- jobTitle "Directeur général", tagline "Directeur de l'exploitation et de la gestion - SPL", companyType "Partnership",
  companySize 11-50, campaign v0.1 (status paused today), companyDescription still says expansion to
  Germany and the UK "in 2014" (stale LinkedIn text).
- Tagline vs jobTitle disagree. Tagline names an operations and management director role at an "SPL".
  Per CLAUDE.md 0B, when tagline and record disagree the tagline has been right both times.

## Ownership, statutory (all fetched 2026-10-07)
1. recherche-entreprises.api.gouv.fr, CARRIER IN SIREN 508132263 (SAS, created 2008-09-22, NAF 49.41B,
   20 to 49 staff in 2024, 6 establishments of which 1 open, the Orvault head office).
   dirigeants: only "CARRIER IN DEVELOPPEMENT" (SIREN 840034979), Président de SAS.
2. Same API, CARRIER IN DEVELOPPEMENT (holding, SAS à associé unique, created 2018-06-01, capital 1,124,200 EUR).
   dirigeants: "C.I.G.A SLU", Président. It also presides CARRIER IN 85, CARRIER IN RENT, CARRIER IN MULTISERVICES (2026-03).
3. BODACC (bodacc-datadila.opendatasoft.com) 2024-12-27 for 840034979: "Président partant : Rousseau,
   Sébastien Daniel Cyril ; nomination du Président : C.I.G.A SLU représenté par ROUSSEAU Sébastien
   Daniel Cyril Adresse : 17 Carrer del Pedral ... Encamp" (Andorra). So the founder controls the group
   through his Andorran company.
4. societe.com CARRIER IN: mandataires CARRIER IN DEVELOPPEMENT (président) and Sébastien Rousseau (former
   président 2013 to 2020, gérant before). No El Khattabi.
   societe.com CARRIER IN DEVELOPPEMENT: Rousseau former président to 2025-04-09, C.I.G.A SLU since. No El Khattabi.
5. carrier-in.com/transports-baud/: "Aujourd'hui dirigée par M. Rousseau".
6. Person search, API q="oussama el khattabi" 0 results; q="oussama khattabi" 1 result, a closed sole trader
   in Labège (training), not him. Positive control same API q="sebastien rousseau" code_postal 44700 returned SCI ROUSSEAU.
7. Walled: pappers.fr (Cloudflare 403 via fetch-walled.py and WebFetch), annuaire-entreprises.data.gouv.fr
   (Incapsula). Written down as walled, not empty.
8. Web search "Oussama El Khattabi" with Carrier In, with SPL, with linkedin: no page ties him to either.
   LinkedIn /in/oussama-el-khattabi-ba9616206 not fetched beyond the lemlist record (999 expected).

Conclusion: a salaried manager with a DG title (a "directeur général" in a French SAS can be named by
statutes without registration, but nothing registered or published shows him as an officer or a
shareholder), and his tagline points to another employer. Raka's rule: hired manager with no stake,
stop with CLOSED_NOT_ICP.

## Site (done before the verdict landed, kept for whoever picks this up)
- crawl.py twice, 11 URLs each (8 x 200, 3 x 404 crawler paths), same both passes. Pages: home, notre-groupe,
  transport, stockage, transports-baud, contact, carrieres. No mentions légales, no privacy link
  (site-audit.js NO LINK FOUND, confirmed against its control).
- Their words: "plus de 60 véhicules ... 7j/7 et 24h/24", "Chaque transport est dédié à un seul client",
  "entreprise de transport et logistique sur-mesure de 70 personnes", site counts disagree with itself
  (6 pôles, 4 plateformes, 9 plateformes, 5 plateformes de stockage), register shows 1 open establishment.
  Quotes are by phone or a generic contact form (first name, last name, email, comment). BAUD page:
  "Demandez votre devis détaillé au 02 51 93 28 66 ou via notre formulaire de contact".
- site-audit.js: WordPress, Bridge theme, Elementor, 0 page errors, favicon 404 (theirs). Desktop screenshot
  opened, footer and contact block with map, dark header.

## If Raka overrides (his call, not drafted)
The apps angle from clues would be the quote to dispatch flow: every job dedicated to one client, 7 days
a week, quotes by phone and a free text form, so each request is likely priced, planned and confirmed by
hand. The owner to write to is Sébastien Rousseau, not in lemlist.

## Sources
1. https://recherche-entreprises.api.gouv.fr/search?q=carrier%20in&code_postal=44700
2. https://recherche-entreprises.api.gouv.fr/search?q=carrier%20in%20developpement
3. https://bodacc-datadila.opendatasoft.com/api/explore/v2.1/catalog/datasets/annonces-commerciales/records (registre 840034979 and 508132263)
4. https://www.societe.com/societe/carrier-in-508132263.html
5. https://www.societe.com/societe/carrier-in-developpement-840034979.html
6. https://www.carrier-in.com/ and /notre-groupe/ /transport/ /stockage/ /transports-baud/ /contact/ /carrieres/
7. https://www.pappers.fr/entreprise/carrier-in-508132263 (walled)
8. https://annuaire-entreprises.data.gouv.fr/dirigeants/508132263 (walled)
9. lemlist search_campaign_leads lea_jv6ne8SRMaJDraYka, get_inbox_conversation, get_inbox_conversations
10. Web searches on his name (soccerway and namesakes only)
