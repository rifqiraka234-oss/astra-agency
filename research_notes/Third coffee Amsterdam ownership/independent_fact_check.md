# Independent fact check: ownership claims on "Third." (Wielingenstraat 22) and Restaurant El Encanto (Scheldeplein 18), Amsterdam

All observations were made on 2026-09-25 between 20:04 and 20:15 UTC, unless a different time is given. This is an adversarial re-derivation. I did not read the earlier researchers' notes before finishing it. Privacy scope: business-role information only. Registered addresses that may be residential, phone numbers and personal details are left out on purpose.

Source-independence note: North Data, company.info, drimble, compadex and verif all republish KvK (Handelsregister) data, so they count as **one** underlying source. kvk.nl itself could not be queried: its search page is a JS app, and the backend it calls (`production-site-nl.kvk.bloomreach.cloud/resourceapi/zoeken`) returned only CMS page structure, no register data. I did not try to get around the keyed KvK API. The official Gemeenteblad (officielebekendmakingen.nl, via the `repository.overheid.nl` SRU API) *was* reachable and is used as the independent primary source wherever it applies.

## Summary: which claims hold?

### Takeaway
| # | Claim | Verdict |
|---|---|---|
| 1 | Website third.amsterdam, "Modern Bakery and Coffee", address, email, @third_nl, "OPENING SOON" | HOLDS WITH CAVEAT: all true of the site, but "OPENING SOON" is stale. Third's LinkedIn says it opened 7 Aug 2026, with the official opening party on 25 Sep 2026 |
| 2 | third.nl: 2005-07-29, InterNetX, Strato, broken WordPress, no visible link | HOLDS WITH CAVEAT: record "last changed" 2026-02-20, registrant redacted |
| 3 | third.amsterdam registered 2025-06-11; WP single user slug "racod" | HOLDS WITH CAVEAT: user display name is "admin". The RACOD link is corroborated by a racod.nl email in the survey form config |
| 4 | Survey page: small pastries bakery, light horeca permit | HOLDS (verbatim) |
| 5 | Third Grounds B.V., KvK 97420980, 2 Jul 2025, Wielingenstraat 22, purpose bread/pastries/coffee | HOLDS WITH CAVEAT: KvK republishers only (one underlying source) |
| 6 | Director = Deap Bouwvisie Holding B.V. (83754407) → Codfried, J.; racod testimonial; Deap Bouwvisie (61300772) at Wielingenstraat 22 | Mostly HOLDS, but WEAKER THAN STATED on "the director": company.info shows **one more** officer besides Deap Holding. Deap Bouwvisie's own site gives a different visiting address |
| 7 | LinkedIn title "Andrew El Safoury - Third \| Modern Bakery & Coffee" | HOLDS. Stronger than stated: Third's own LinkedIn page reposted a post naming him "founder" |
| 8 | El Encanto KvK 91130379, 21 Aug 2023, Scheldeplein 18, steakhouse prep activity, "Ayad, E." + 1 hidden, VOF | HOLDS WITH CAVEAT: KvK republishers only. VOF legal form seen only in search snippets |
| 9 | Formerly Djago; exploitatie + alcohol licences granted 3 Sep 2026 after withdrawals on 25 Mar 2026 | HOLDS WITH CAVEAT: the alcohol application was closed "door gemeente" (by the municipality), not withdrawn by the applicant. A further application was withdrawn in June 2026 |
| 10 | ~60 m apart, same block, joint 2026 permit | HOLDS WITH CAVEAT: 59 m measured. Same perimeter block and permit, but **different BAG buildings** (panden) |
| 11 | elencanto.nl / el-encanto.nl parked at Argeweb, registered 2023-10-10, owner unknown | HOLDS (registrar of record is Realtime Register, with Argeweb as reseller/host) |
| 12 | No co-mention; no shared person/entity/contact | HOLDS as a negative finding (11 queries, 0 co-mentions). Instagram and Google Maps were not inspectable |
| 13 | lemlist | SKIPPED (as instructed) |

### Cited Findings
- See each claim section below for the evidence behind these verdicts.

### Inferences
- The core ownership chain (Third, Third Grounds B.V., Deap Bouwvisie Holding B.V., Codfried) is well supported. It is now also corroborated by a non-registry source: a LinkedIn post that Third reposted, in which Robert Guerain says he and "Jürgen Codfried" are investors behind the scenes. The biggest correction is operational status: Third is open, not "opening soon".

### Gaps
- No direct KvK extract (paid, or needs an API key). Officer roles (bestuurder vs. procuratiehouder; vennoot) and the identity of the "one more" officer at Third Grounds and at El Encanto are unverified.

## Claim 1: Third. uses third.amsterdam; "Modern Bakery and Coffee"; Wielingenstraat 22, 1078 KK; hello@third.amsterdam; @third_nl; "OPENING SOON"

### Takeaway
**HOLDS WITH CAVEAT.** Every literal element is on the site. The email is not on the homepage, though: it appears on the survey-success and privacy pages. More importantly, "OPENING SOON" is stale. The homepage was last modified 2025-08-27, and Third's own LinkedIn says the shop opened on 7 Aug 2026.

### Cited Findings
- Homepage `<title>` is "Modern Bakery and Coffee". Visible text: "OPENING SOON meaning the craft of speciality coffee "Third Wave" feeling as a social place beyond home and work "Third Place" FOLLOW US ON Third_nl Wielingenstraat 22 1078 KK Amsterdam". It links to `https://www.instagram.com/third_nl/`. Generator: WordPress 7.1.2. [third.amsterdam](https://third.amsterdam/) (fetched 20:04Z)
- WP REST site name: "Modern Bakery and Coffee". [wp-json](https://third.amsterdam/wp-json/)
- "hello@third.amsterdam" appears on the survey-success page ("kunt u ons altijd mailen via hello@third.amsterdam") and in the privacy statement ("E-mail: hello@third.amsterdam"). It does not appear on the homepage HTML. [survey-succes](https://third.amsterdam/survey-succes/), [privacy-verklaring](https://third.amsterdam/privacy-verklaring/)
- Page dates from the WP API: Home created 2025-07-24, modified 2025-08-27. Survey created 2025-08-27, modified 2025-08-30. Privacy statement "Versie: 1.0 | Laatste update: 27-08-2025", controller named "Third Amsterdam". [WP pages API](https://third.amsterdam/wp-json/wp/v2/pages)
- Contradicting "opening soon": the LinkedIn post of 2026-08-25 reads "On the 7th of August, we opened the doors to our very first Third location in Amsterdam Zuid, right in the heart of the Rivierenbuurt … 📍Wielingenstraat 22". [Third LinkedIn company page](https://nl.linkedin.com/company/third_coffee) (fetched 20:11Z)

### Inferences
- The website's opening banner has not been updated since August 2025. For outreach purposes Third is an operating business (soft open since 7 Aug 2026, official opening 25 Sep 2026).

### Gaps
- The Instagram profile could not be read (see the "Instagram and maps" section).

## Claim 2: third.nl is unrelated/abandoned (reg. 2005-07-29, InterNetX, Strato, broken WordPress)

### Takeaway
**HOLDS WITH CAVEAT.** The registration date, registrar, hosting and broken page are all confirmed. But the domain record was changed as recently as 2026-02-20, and the registrant is redacted. "No visible connection" is accurate; "unrelated" cannot be proven.

### Cited Findings
- RDAP: status active. "registration" 2005-07-29T09:48:24Z; "last changed" 2026-02-20T21:24:15Z. The registrar entity is "Domain Robot", Johanna-Dachs-Str. 55, Regensburg, DE (InterNetX's address), and the contact handles carry the suffix "-INETX". Registrant: "REDACTED FOR PRIVACY". NS: shades19.rzone.de, docks04.rzone.de. [SIDN RDAP third.nl](https://rdap.sidn.nl/domain/third.nl) (20:04Z)
- A record 81.169.145.146 → RIPE netname "STRATO-RZG-KA", "STRATO AG". [RIPE RDAP](https://rdap.db.ripe.net/ip/81.169.145.146)
- `https://third.nl/` fails the TLS handshake ("sslv3 alert handshake failure"). `http://third.nl/` returns only: "Your PHP installation appears to be missing the MySQL extension which is required by WordPress." [third.nl](http://third.nl/) (20:04Z)

### Inferences
- The 2026 "last changed" date probably reflects a renewal or registrar update, so someone still maintains the registration. Nothing on the page ties it to Third.

### Gaps
- Registrant identity (redacted).

## Claim 3: third.amsterdam registered 2025-06-11; WP user slug "racod" (RACOD web agency)

### Takeaway
**HOLDS WITH CAVEAT.** The date is confirmed via the IANA bootstrap and the .amsterdam RDAP. There is exactly one WP user, with slug "racod", but its display name is "admin". The RACOD attribution is independently corroborated by the survey form, which sends responses to a racod.nl address.

### Cited Findings
- The IANA RDAP bootstrap maps "amsterdam" to `https://rdap.nic.amsterdam/`. [IANA dns.json](https://data.iana.org/rdap/dns.json)
- RDAP: "registration" 2025-06-11T07:00:56Z; "expiration" 2027-06-11T07:00:56Z; "last changed" 2026-06-11. Registrar "Metaregistrar BV Applications" (IANA ID 2288). NS nsn1/nsn2.mijndomein.nl. Registrant redacted (handle "REDACTED-SIDN", NL). [RDAP third.amsterdam](https://rdap.nic.amsterdam/domain/third.amsterdam) (20:04Z)
- `/wp-json/wp/v2/users` returns one object: `"id":1,"name":"admin", … "link":"https://third.amsterdam/author/racod/","slug":"racod"`. [WP users](https://third.amsterdam/wp-json/wp/v2/users) (20:04Z)
- The survey page's Divi form is configured as `et_pb_contact_form email="hello@third.amsterdam, rodney@racod.nl"`. [WP page 37 content](https://third.amsterdam/wp-json/wp/v2/pages/37)
- racod.nl: "RACOD Website's & Webshops", "KvK: 78249023". [racod.nl](https://www.racod.nl/) (20:05Z)

### Inferences
- RACOD built and administers the site and receives survey responses. That is a supplier relationship, not evidence of ownership.

### Gaps
- None material.

## Claim 4: Neighbour survey says Third. will open a small pastries bakery at Wielingenstraat 22 and apply for a light horeca permit

### Takeaway
**HOLDS** (verbatim).

### Cited Findings
- "Beste buurtbewoner, Wij van Third. gaan op de locatie Wielingenstraat 22 een kleinschalige pastries bakery openen inclusief de mogelijkheid om een lekker kopje koffie drinken. Om een extra fijne beleving voor de gast aan te bieden (voor u dus) willen wij een vergunning voor lichte horeca aanvragen voor de locatie." Form title: "Buurtenquête – Third. Wielingenstraat 22". [third.amsterdam/survey](https://third.amsterdam/survey/) (20:04Z)
- The survey also asks about "een gevelterras van 10–12 stoelen" and hours "Ochtend tot begin avond (08:00 – 19:00)" or "Alleen overdag (08:00 – 17:00)". [survey](https://third.amsterdam/survey/)

### Inferences
- None beyond the text.

### Gaps
- No Gemeenteblad record of a horeca, terrace or change-of-use permit specifically for Wielingenstraat 22 was found. The SRU search `"Wielingenstraat 22" AND creator=Amsterdam` returned only the two block-wide façade permit notices. Whether a light-horeca permit was applied for or granted is unverified.

## Claim 5: Third Grounds B.V., KvK 97420980, registered 2 Jul 2025 at Wielingenstraat 22, purpose bread/pastries/coffee

### Takeaway
**HOLDS WITH CAVEAT.** Consistent across North Data, company.info and verif, but these are all KvK republishers, so this is one underlying source. There is no official-publication confirmation, as B.V. formations are not published in the Staatscourant (SRU "Third Grounds": 0 hits).

### Cited Findings
- North Data JSON-LD: `"foundingDate":"2025-07-02"`, `"streetAddress":"Wielingenstraat 22","postalCode":"1078 KK"`, `"name":"Third Grounds B.V."`, `"makesOffer":"Sale and manufacture of bread, pastries, coffee and similar/related products."`. [North Data](https://www.northdata.com/Third%20Grounds%20B%C2%B7V%C2%B7%20i%C2%B7o%C2%B7,%20Amsterdam/KVK%2097420980) (20:05Z)
- company.info (marked "Bron: KVK 24-09-2026"): trade name Third Grounds B.V., Wielingenstraat 22 1078KK Amsterdam. SBI 47241 (Detailhandel in brood en banket), 10710 (Vervaardiging van brood en vers banketbakkerswerk), 10830 (Verwerking van thee en koffie). Vestigingsnummer 000062664069. [company.info](https://companyinfo.nl/organisatieprofiel/detailhandel-in-brood-en-banket/third-grounds-b-v-amsterdam-97420980-000062664069) (20:05Z)
- verif.com (search snippet only): "created in 2025", local ID 868043631. [verif](https://www.verif.com/en/company/Third-Grounds-B-V--68d9cb4012992303384410df/)

### Inferences
- The search-indexed North Data URL slug reads "Third Grounds B·V· i·o·", which suggests the entity was first registered as "i.o." (in oprichting, in formation). The current page title drops it.

### Gaps
- Not confirmed directly at kvk.nl.

## Claim 6: Director chain (Deap Bouwvisie Holding B.V. → Codfried, J.), racod.nl testimonial, Deap Bouwvisie at Wielingenstraat 22

### Takeaway
**Mostly HOLDS, but WEAKER THAN STATED on "the director".** Deap Bouwvisie Holding B.V. is listed as algemeen directeur of Third Grounds, but company.info shows **one additional natural or legal person** in management. The Codfried, J. link and the testimonial are confirmed. Deap Bouwvisie (61300772) is tied to postcode 1078KK and to "Wielingenstraat 22" by drimble's page title. However, the firm's own website gives a different visiting address.

### Cited Findings
- Third Grounds B.V. management: "Deap Bouwvisie Holding B.V., Algemeen directeur Van 2025 **Nog 1 natuurlijke personen en/of rechtspersonen**". The embedded page data reads `management:{total:2,manager:{name:"Deap Bouwvisie Holding B.V.",…function:"Algemeen directeur",role:"Bestuurder",activeFrom:"2025"}`. [company.info Third Grounds](https://companyinfo.nl/organisatieprofiel/detailhandel-in-brood-en-banket/third-grounds-b-v-amsterdam-97420980-000062664069) (Bron: KVK 24-09-2026)
- Deap Bouwvisie Holding B.V.: "Management Codfried, J., Van 2021"; SBI 70102. The embedded data reads `management:{total:1,manager:{name:"Codfried, J.",…role:"Bestuurder",activeFrom:"2021"}`, which makes him the sole listed officer. The registered address is a different Amsterdam address, not Wielingenstraat, and is omitted here because it may be residential. [company.info Deap Holding](https://companyinfo.nl/organisatieprofiel/overige-activiteiten-van-hoofdkantoren/deap-bouwvisie-holding-b-v-amsterdam-83754407-000049906712) (Bron: KVK 08-04-2026). North Data: founded 2021-08-26, "Holding activities", balance sheets filed for 2023–2025. [North Data](https://www.northdata.com/Deap%20Bouwvisie%20Holding%20B%C2%B7V%C2%B7,%20Amsterdam/KVK%2083754407)
- racod.nl testimonial, verbatim: "Heeft mij tot op heden zeer professioneel geholpen met het realiseren van logo's, mijn websites, brochures, filmpjes en nog veel meer. … Een aanrader voor elke ondernemer! Jurgen Codfried , CEO @ Deap Bouw Visie". [racod.nl](https://www.racod.nl/) (20:05Z)
- Deap Bouwvisie (KvK 61300772): company.info address shows only "1078KK Amsterdam" (street suppressed), website deapbv.nl, SBI 71120 and 41000. [company.info](https://companyinfo.nl/organisatieprofiel/activiteiten-van-ingenieurs-en-overig-technisch-ontwerp-en-advies/deap-bouwvisie-amsterdam-61300772-000030413788) (Bron: KVK 12-01-2026). Drimble page title: "Alles over Deap Bouwvisie Wielingenstraat 22 op Drimble.nl"; the body is JS-only and was not readable. [drimble](https://drimble.nl/bedrijf/amsterdam/000030413788/deap-bouwvisie.html). North Data: founded 2014-08-22, address "Amsterdam" only. [North Data](https://www.northdata.com/Deap%20Bouwvisie,%20Amsterdam/KVK%2061300772)
- Contrasting: deapbv.nl contact page reads "Bezoekadres: Gyroscoopweg 25 1042 AC Amsterdam KvK: 61300772". [deapbv.nl/contact](https://deapbv.nl/contact/) (20:06Z)
- Independent (non-registry) corroboration: a post by Robert Guerain, reposted by Third, reads "Dit nieuwe concept wordt gerund door founder en horeca-icoon Andrew El Safoury. Mooi om samen met Jürgen Codfried achter de schermen als investeerder betrokken te zijn…". [Third LinkedIn](https://nl.linkedin.com/company/third_coffee) (20:11Z)

### Inferences
- Codfried's role in Third is corroborated by two independent routes: the registry chain and a LinkedIn post. The unnamed second officer of Third Grounds could plausibly be linked to Robert Guerain, the other self-described investor, but this is **unverified**.
- "Deap Bouwvisie is registered at Wielingenstraat 22" is supported only by an aggregator page title plus a matching postcode. Treat it as probable, not proven.

### Gaps
- The identity and role of the second Third Grounds officer, and whether Deap Holding is sole or joint shareholder. Both need a paid KvK extract.

## Claim 7: LinkedIn "Andrew El Safoury - Third | Modern Bakery & Coffee"

### Takeaway
**HOLDS**, and it is stronger than stated: Third's own LinkedIn company page reposts content naming him as founder and operator.

### Cited Findings
- Search result title: "Andrew El Safoury - Third | Modern Bakery & Coffee" → `https://nl.linkedin.com/in/andrew-el-safoury-031328143`. A direct fetch returned HTTP 999 (LinkedIn anti-bot), so the profile body was not read. [LinkedIn profile](https://nl.linkedin.com/in/andrew-el-safoury-031328143) (search 20:10Z)
- Third's company page reposted the Guerain post quoted above ("founder en horeca-icoon Andrew El Safoury"). It also reposted a post by "Nizar": "Een vriend van mij, Andrew El Safoury heeft een nieuwe koffie speciaalzaak geopend: Third … Andrew is horecaondernemer". [Third LinkedIn](https://nl.linkedin.com/company/third_coffee)

### Inferences
- Andrew El Safoury is the operating founder. His name does not appear in the registry chain I could see, so he may be the unnamed second officer or a shareholder, or he may have no registry role. Unverified.

### Gaps
- His formal role at Third Grounds B.V. Search snippets also associate him with other entities ("Safoury B.V.", director since 2015; "This Is Staff"). These were not fetched or verified.

## Claim 8: Restaurant El Encanto: KvK 91130379, 21 Aug 2023, Scheldeplein 18, steakhouse preparatory activity, "Ayad, E." + 1 hidden partner, VOF

### Takeaway
**HOLDS WITH CAVEAT.** The date, address, activity text and officers are confirmed via North Data and company.info, which are one underlying KvK source. The VOF legal form appears only in compadex/drimble search snippets; the compadex page returned a Cloudflare 403.

### Cited Findings
- North Data JSON-LD: `"foundingDate":"2023-08-21"`, Scheldeplein 18, 1078 GR, `"makesOffer":"Taking preparatory actions to establish a steakhouse restaurant."`, `"member":[]`. [North Data](https://www.northdata.com/Restaurant%20El%20Encanto,%20Amsterdam/KVK%2091130379) (20:12Z)
- company.info: "Management Ayad, E., Van 2023 Nog 1 natuurlijke personen en/of rechtspersonen"; SBI 56111 (Exploitatie van restaurants); Scheldeplein 18 1078GR; vestigingsnummer 000056817983. The embedded page data reads `management:{total:2,manager:{name:"Ayad, E.",…role:"Vennoot",activeFrom:"2023"}`. "Vennoot" (partner) supports the VOF legal form. [company.info](https://companyinfo.nl/organisatieprofiel/exploitatie-van-restaurants/restaurant-el-encanto-amsterdam-91130379-000056817983) (Bron: KVK 08-04-2026)
- VOF: search-engine summaries of compadex/drimble state "Restaurant El Encanto (Vennootschap onder firma)", with data updated 12 Feb 2026. [compadex](https://www.compadex.com/nl/businesses/nl/restaurant-el-encanto-91130379-56817983) (snippet only; 403 on fetch)

### Inferences
- The two-person management listing is consistent with a two-partner VOF.

### Gaps
- The KvK role label (vennoot) and the identity of the second partner.

## Claim 9: Scheldeplein 18 formerly Djago; El Encanto licences granted 3 Sep 2026 after withdrawals on 25 Mar 2026

### Takeaway
**HOLDS WITH CAVEAT.** The dates are exactly right per the official Gemeenteblad. But the alcohol application was **"Ingetrokken aanvraag door gemeente"** (closed by the municipality), not withdrawn by the applicant. There was also a third application, filed in June 2026 and withdrawn by the applicant.

### Cited Findings
- Djago: "Besluit (Verlenging) exploitatievergunning voor bedrijf Indonesisch Restaurant Djago - Scheldeplein 18 - 1078GR", sent 23-06-2023 (Z/23/2164176). [gmb-2023-280451](https://zoek.officielebekendmakingen.nl/gmb-2023-280451.html)
- Granted, exploitatie: "Besluit (Nieuw) exploitatievergunning voor bedrijf El Encanto - Scheldeplein 18 … Soort bedrijf: Alcohol verstrekkend bedrijf - dagzaak; Soort inrichting: restaurant; Openingstijden Zo-Do: 7.00 tot 1.00; Vrij-Za: 7.00 tot 3.00; Terras: Ongebouwd … tot 0.00; Verzonden naar aanvrager op: 03-09-2026; Kenmerk Z/26/3157323". Published 2026-09-08. [gmb-2026-420280](https://zoek.officielebekendmakingen.nl/gmb-2026-420280.html). Application received 04-07-2026. [gmb-2026-326815](https://zoek.officielebekendmakingen.nl/gmb-2026-326815.html)
- Granted, alcohol: "Verleend: alcoholwetvergunning voor bedrijf El Encanto … Verzonden naar aanvrager op: 03-09-2026; Kenmerk Z/26/3157598". [gmb-2026-420327](https://zoek.officielebekendmakingen.nl/gmb-2026-420327.html)
- Earlier exploitatie application Z/25/2923847 (received 24-04-2025, [gmb-2025-187368](https://zoek.officielebekendmakingen.nl/gmb-2025-187368.html)). "De aanvrager trok het verzoek … in", sent 25-03-2026. [gmb-2026-146988](https://zoek.officielebekendmakingen.nl/gmb-2026-146988.html)
- Earlier alcohol application Z/25/2923897: "Ingetrokken aanvraag door gemeente", sent 25-03-2026. [gmb-2026-146815](https://zoek.officielebekendmakingen.nl/gmb-2026-146815.html)
- Additional: a terrace + exploitatie application Z/26/3138900 was received 04-06-2026 ([gmb-2026-270654](https://zoek.officielebekendmakingen.nl/gmb-2026-270654.html)) and withdrawn by the applicant, sent 17-06-2026 ([gmb-2026-294699](https://zoek.officielebekendmakingen.nl/gmb-2026-294699.html)).

### Inferences
- "Ingetrokken door gemeente" usually means the file was closed administratively, for example as incomplete. The exact reason is not in the notice.

### Gaps
- None for dates. Whether El Encanto is actually trading is covered in the "Instagram and maps" section.

## Claim 10: ~60 m apart, same building block, joint 2026 permit

### Takeaway
**HOLDS WITH CAVEAT.** The measured distance is **59.0 m**. Both addresses are in the same perimeter block and are named in the same 2026 façade permit. BAG shows them as **different buildings (panden)**, though, whose nearest walls are 41 m apart.

### Cited Findings
- PDOK Locatieserver:
  - Wielingenstraat 22, 1078KK: `POINT(4.88910702 52.34447658)`, RD (121058, 484179), VBO 0363010000868264.
  - Scheldeplein 18, 1078GR: `POINT(4.88997241 52.34451617)`, RD (121117, 484183), VBO 0363010000805999.
  - Both are in buurt "Wielingenbuurt".
  - Haversine distance 59.0 m (RD Euclidean 59.1 m).
  - Sources: [PDOK Wielingenstraat](https://api.pdok.nl/bzk/locatieserver/search/v3_1/free?q=Wielingenstraat%2022%20Amsterdam), [PDOK Scheldeplein](https://api.pdok.nl/bzk/locatieserver/search/v3_1/free?q=Scheldeplein%2018%20Amsterdam) (20:08Z)
- BAG (PDOK WFS):
  - Wielingenstraat 22 is in pand **0363100012091479**, gebruiksdoel "kantoorfunctie", 130 m², bouwjaar 1931, "Pand in gebruik".
  - Scheldeplein 18 is in pand **0363100012140524**, gebruiksdoel "bijeenkomstfunctie", 181 m², bouwjaar 1931, status "Verbouwing verblijfsobject" / "Verbouwing pand".
  - The polygons are 40.99 m apart at nearest points. They connect through a chain of 5 intervening panden that touch each other.
  - Source: [PDOK BAG WFS](https://service.pdok.nl/lv/bag/wfs/v2_0) (20:08–20:09Z)
- Joint permit: "Besluit omgevingsvergunning reguliere procedure gedeeltelijk verleend Scheldestraat 56-116, Scheldeplein 2-20, Wielingenstraat 2-22". Omschrijving "het aanpassen van de kozijnen en balkons aan de voorgevels". Sent 16-04-2026. Zaakadres list includes "Scheldeplein 18 1078GR" and "Wielingenstraat 22 1078KK". Z2025-054524. [gmb-2026-186511](https://zoek.officielebekendmakingen.nl/gmb-2026-186511.html). Application notice published 2026-02-18: [gmb-2026-75521](https://zoek.officielebekendmakingen.nl/gmb-2026-75521.html). A related crane/scaffold permission for the renovation was granted in May 2026: [bgr-2026-1094](https://repository.overheid.nl/frbr/officielepublicaties/bgr/2026/bgr-2026-1094/1/xml/bgr-2026-1094.xml)

### Inferences
- A single façade permit covering about 60 addresses suggests one owner or managing party for the block. That points to a shared landlord, not shared operators. This is an inference and was not checked in the Kadaster.

### Gaps
- Property ownership of either unit (needs a paid Kadaster lookup).

## Claim 11: elencanto.nl and el-encanto.nl parked at Argeweb, registered 2023-10-10, ownership unknown

### Takeaway
**HOLDS.** Nuance: the registrar of record is Realtime Register B.V.; Argeweb provides the nameservers and parking page.

### Cited Findings
- elencanto.nl was registered 2023-10-10T18:56:42Z. Registrar "Realtime Register", Zwolle. NS ns1.argewebhosting.eu, ns2.argewebhosting.com, ns3.argewebhosting.nl. [SIDN RDAP](https://rdap.sidn.nl/domain/elencanto.nl) (20:09Z)
- el-encanto.nl was registered 2023-10-10T18:56:29Z, with the same registrar and NS. [SIDN RDAP](https://rdap.sidn.nl/domain/el-encanto.nl)
- Both sites show the page title "geregistreerd via Argeweb" and the text "Dit domein is geregistreerd in opdracht van een klant van Argeweb." [elencanto.nl](http://elencanto.nl/), [el-encanto.nl](http://el-encanto.nl/)
- elencanto.amsterdam and restaurantelencanto.nl are unregistered (RDAP 404, "free").

### Inferences
- The two domains were registered 13 seconds apart, seven weeks after the VOF's KvK registration (21 Aug 2023). That suggests the El Encanto founders, but it is not proof.

### Gaps
- Registrant identity (redacted).

## Claim 12: No source mentions Third and El Encanto together; no shared person, entity or contact

### Takeaway
**HOLDS** as a negative finding. 11 targeted web queries, plus official-publication and sitemap searches, produced zero co-mentions and zero shared names or contacts. The only links are physical: the same perimeter block, the same façade permit, and neighbour Sab's Deli (Scheldeplein 20) catering Third's opening party.

### Cited Findings
- Web queries run between 20:13 and 20:14Z. None returned a page mentioning both businesses, or a shared person or contact:
  1. `"Third Grounds" "El Encanto"`: Santa Barbara hotel and K-drama only.
  2. `"third.amsterdam" Encanto`: El Encanto hair salon (Reguliersdwarsstraat, unrelated) only.
  3. `"Codfried" "El Encanto"`: US El Encanto venues only.
  4. `"Codfried" Ayad Amsterdam`: unrelated individuals.
  5. `"El Safoury" "El Encanto"`: unrelated.
  6. `"Deap Bouwvisie" Scheldeplein`: Deap pages and an unrelated Scheldeplein 1-5 project, with no link.
  7. `"third_nl" Encanto`: Disney *Encanto* only.
  8. `"El Safoury" Ayad Amsterdam horeca`: El Safoury results only, no Ayad link.
  9. `"Third" "Wielingenstraat 22" Scheldeplein Encanto`: separate pages for each business, none joint.
  10. `"Restaurant El Encanto" Ayad`: US restaurants only.
  11. `"El Encanto" steakhouse Amsterdam Rivierenbuurt opening 2026`: no Amsterdam steakhouse coverage.
- The Gemeenteblad SRU "El Encanto" search returned 9 records, all El Encanto permits plus one unrelated 2016 Bonaire notice, with no Third, Deap or Codfried mention. [SRU](https://repository.overheid.nl/sru)
- The deapbv.nl sitemap (122 URLs) and racod.nl sitemap (41 URLs) contain no URL matching schelde, encanto, third, wieling, djago, steak or horeca. [deapbv.nl](https://deapbv.nl/wp-sitemap.xml), [racod.nl](https://www.racod.nl/wp-sitemap.xml)
- Neighbour link (not El Encanto): Third's opening-party post thanks "Verais and FLOW Spritzer B.V. … And Sab's Deli for some good food". OSM places Sab's Deli at Scheldeplein 20, next door to Scheldeplein 18. [Third LinkedIn](https://nl.linkedin.com/company/third_coffee), [OSM node 2817924003](https://www.openstreetmap.org/node/2817924003)

### Inferences
- There is no evidence of common ownership. Absence of evidence is limited by what search engines index: hidden KvK partners and officers, Instagram and Google Maps were not inspectable.

### Gaps
- The hidden second partner at El Encanto and the second officer at Third Grounds. Either could in principle create an overlap, and only a KvK extract would settle it.

## Instagram @third_nl and map listing status

### Takeaway
**COULD NOT VERIFY** Instagram details or Google/Apple Maps status. OSM shows Scheldeplein 18 as **vacant** (check_date 2026-02-15) and no POI at Wielingenstraat 22. BAG shows Scheldeplein 18 under renovation.

### Cited Findings
- `instagram.com/third_nl/` redirects to the login page with HTTP 429 (curl and WebFetch). The search snippet shows only the title "Third. (@third_nl) · Amsterdam". Bio, follower count, posts and follows could not be read. [Instagram](https://www.instagram.com/third_nl/)
- Google Maps and Apple Maps query URLs returned JS shells with no listing data. [Google Maps](https://www.google.com/maps/search/?api=1&query=Third+Wielingenstraat+22+Amsterdam)
- OSM (Overpass via maps.mail.ru mirror; overpass-api.de reset the connection) and Nominatim:
  - Scheldeplein 18 is node 2817921974 `shop=vacant`, `check_date=2026-02-15`.
  - Wielingenstraat 22 is node 2817924075, address only.
  - There are no OSM objects named Third, El Encanto or Djago nearby. The only "El Encanto" in Amsterdam on OSM is the unrelated hair salon.
  - Source: [OSM node 2817921974](https://www.openstreetmap.org/node/2817921974)
- For comparison, Third's LinkedIn page (146 followers, "Horeca", "Opgericht 2025", HQ Wielingenstraat 22) shows it is trading. [Third LinkedIn](https://nl.linkedin.com/company/third_coffee)

### Inferences
- El Encanto was licensed on 3 Sep 2026, but I found no evidence it has opened: OSM shows vacant in Feb 2026, BAG shows renovation, there is no web presence, and both domains are parked.

### Gaps
- Instagram bio and followers, and Google Maps status. These need a logged-in browser.

## New facts the claims omit

### Takeaway
Third is **open**: soft opening 7 Aug 2026, official opening 25 Sep 2026. Andrew El Safoury is its **founder and operator**, and **Robert Guerain and Jürgen Codfried are self-described investors**. El Encanto has a long 2024–2026 building-permit trail, including a change of use to horeca category 4.

### Cited Findings
- Third's LinkedIn posts:
  - 2026-08-25: opened 7 Aug.
  - 2026-09-07: "On the 25th of September, we'll celebrate the official opening … Time: 18:00".
  - 2026-09-22: "Our official Opening Party".
  - 2025-12-27: hiring a Barista in Amsterdam-Zuid.
  - Source: [Third LinkedIn](https://nl.linkedin.com/company/third_coffee)
- The Guerain post (reposted by Third) names Andrew El Safoury as founder, and Guerain plus Jürgen Codfried as investors "achter de schermen". [Third LinkedIn](https://nl.linkedin.com/company/third_coffee)
- Third Grounds B.V. has a second, unnamed officer. [company.info](https://companyinfo.nl/organisatieprofiel/detailhandel-in-brood-en-banket/third-grounds-b-v-amsterdam-97420980-000062664069)
- Survey form responses go to rodney@racod.nl as well as hello@third.amsterdam. [WP page 37](https://third.amsterdam/wp-json/wp/v2/pages/37)
- Wielingenstraat 22 was marketed from 2025-02-04 as "WINKELRUIMTE TE HUUR", 98 m², energy label D, status now "Verhuurd". [KRK Makelaars](https://krk.nl/bedrijven/verkocht-verhuurd/wielingenstraat-22-amsterdam-b103981). BAG, by contrast, records the unit as kantoorfunctie, 130 m². [PDOK BAG WFS](https://service.pdok.nl/lv/bag/wfs/v2_0)
- Scheldeplein 18 omgevingsvergunning trail:
  - Replace the extension "met behoud van de bijeenkomstfunctie": received 17-12-2024, withdrawn 29-04-2025. [gmb-2025-41927](https://zoek.officielebekendmakingen.nl/gmb-2025-41927.html), [gmb-2025-190577](https://zoek.officielebekendmakingen.nl/gmb-2025-190577.html)
  - Two structural openings: granted 08-07-2025. [gmb-2025-303427](https://zoek.officielebekendmakingen.nl/gmb-2025-303427.html)
  - "omzetten van het gebruik naar horeca categorie 4 ter plaatse van de aanbouw en installaties … (legalisatie)": received 29-09-2025, **gedeeltelijk verleend** 30-06-2026. [gmb-2025-448530](https://zoek.officielebekendmakingen.nl/gmb-2025-448530.html), [gmb-2026-317182](https://zoek.officielebekendmakingen.nl/gmb-2026-317182.html)
- Deap Bouwvisie advertises omgevingsvergunning services. [deapbv.nl/vergunning](https://deapbv.nl/vergunning/). No evidence connects it to either address's permits.

### Inferences
- For B2B outreach, the decision-makers at Third are Andrew El Safoury as operator and the investor group of Codfried (via Deap Bouwvisie Holding) and Guerain. El Encanto's partners ("Ayad, E." and one other) show no link to Third.

### Gaps
- The Instagram profile, the Google Maps listings, KvK officer roles, and the Kadaster ownership of both units.

## Comparison with the earlier research notes (read only after my verification was finished)

### Takeaway
The earlier notes agree with my findings on claims 2–6 and 8–12, including the BAG pand IDs, the Gemeenteblad dates, the "door gemeente" nuance and the hidden second officers. **The one material disagreement is operating status and founder role.** `third_founders_press_social.md` and `third_el_encanto_connection.md` say Third "has not opened yet" and that "founder" is "not confirmed by any quotable source". Third's own LinkedIn company page contradicts both points.

### Cited Findings
- Third's LinkedIn page shows three things. Opened 7 Aug 2026 (post of 2026-08-25). Official opening 25 Sep 2026 at 18:00 (posts of 2026-09-07 and 2026-09-22). And a reposted Guerain post naming "founder en horeca-icoon Andrew El Safoury" and Guerain + "Jürgen Codfried" as investors. [Third LinkedIn](https://nl.linkedin.com/company/third_coffee) (20:11Z)
- My own copy of company.info confirms the embedded role data cited in `third_el_encanto_connection.md` (Ayad, E. = "Vennoot") and `andrew_el_safoury_role.md` (Deap Holding = "Bestuurder", total 2). [company.info El Encanto](https://companyinfo.nl/organisatieprofiel/exploitatie-van-restaurants/restaurant-el-encanto-amsterdam-91130379-000056817983)

### Inferences
- The Guerain post independently supports the Codfried–El Safoury partnership that `andrew_el_safoury_role.md` derived from a Spanish BORME record and a 2019 deapbv.nl post. I did not re-check those two sources.

### Gaps
- I did not independently verify the BORME record, the 2019 Deap "Adam Horeca groep" post, the "31 Apartments" role, or the Sweetella and This Is Staff details from the earlier notes.
