# Accepted the connection request, never sent anything

Generated 2026-09-13. **Scan complete**, both campaigns, every lead.

**Method.** `search_campaign_leads` with `include: ["activities"]`, paged 50 at
a time. A lead qualifies when its activity log contains `linkedinInviteAccepted`
and the only `linkedinSent` entry (if any) is the generic connect note. This is
the ONLY reliable test. The `sentOnly` inbox list cannot be used, because it
mixes accepted contacts with invites that are still pending, and there is no
LinkedIn connection-status custom field on this team despite what the inbox
triage spec claims.

**Coverage.** `cam_PryZp5LuvQv8NznHh` (Small Business Owners v0.1), all 799
leads, offsets 0 through 750. `cam_Co5CJXrpPFf5MRAfD` (v0.2 Auto Enrichment),
all 18 leads. **91 found, all of them in v0.1.**

v0.2 contributed nothing. It holds 18 leads, only David Limousin and Jamie Hardy
ever accepted, and both already got a real researched message.

A large share of v0.1 shows `linkedinWithdrawInvitationDone`. Those invites were
pulled back and never connected, which is why the qualifying count is far below
the raw lead count.

## The list

Recent accepts first, since those are the warmest.

| # | Name | Company | Role | Accepted |
|---|---|---|---|---|
| 1 | Irem Unlu Demir | DemirX Partners | Founder | 12 Sep |
| 2 | Seydouba Fissa Sylla | waaly | Co-fondateur | 10 Sep |
| 3 | Muhammad Ahmed Sarfraz | Accupe | CEO & Founder | 10 Sep |
| 4 | Luke Dear | Richardson Design Associates | Director | 08 Sep |
| 5 | Katie Goodier | Therapeutic Fit | Founder, movement therapist | 08 Sep |
| 6 | Paul Briant | Centre de Thérapie Laser, Bordeaux | Co-fondateur | 08 Sep |
| 7 | Robert Fennis | Emerge Numerics B.V. | Owner | 08 Sep |
| 8 | Mark Langens | Movion | Owner | 08 Sep |
| 9 | Mandy Kerley | Aptiq Works Limited | Co-Founder & Fractional COO | 07 Sep |
| 10 | Jojanneke van 't Land | WiseHuman | Founder | 07 Sep |
| 11 | Jean Claude Adabunu | Académie ADABS | Founder, BIM & low carbon training | 07 Sep |
| 12 | Patrick Killeen | Head and Heart CIC | Founder & Solutions Architect | 07 Sep |
| 13 | Manon Picot | Calanque Conciergerie | Co-fondatrice | 07 Sep |
| 14 | Luis Perona | Coach in the Box | Co-Founder & CEO | 07 Sep |
| 15 | James Thornton | JigiWeb | Founder | 07 Sep |
| 16 | Nico Wußk | Nicura | Gründer | 07 Sep |
| 17 | Nina Jameson | Gehirngerecht Positionieren | Geschäftsführerin | 07 Sep |
| 18 | Russell Upton | audopia | | 07 Sep |
| 19 | Stuart Barron | Barron Escapes Ltd | Founder | 07 Sep |
| 20 | Léa Janoray | Le Goût des Confidences | Co-fondatrice, indie magazine | 07 Sep |
| 21 | Ziad Al-Nuss | TechCare Systems | Founder & CEO | 07 Sep |
| 22 | William M. | Relatiq | Founder, AI | 07 Sep |
| 23 | Leen van 't Veen | Metrix Solutions | Managing Director, Owner | 06 Sep |
| 24 | Robert van Glabbeek | Cryptofocus.nl | CEO & founder | 06 Sep |
| 25 | Lars Tibben | Studio Live Productions | Co-Founder | 06 Sep |
| 26 | Martijn Mol | Remarx | Co-Founder, cybersecurity | 06 Sep |
| 27 | Niklas Hanf | Solvio-Workshop | Gründer und Inhaber | 06 Sep |
| 28 | Jana Münzenberg | She Climbs | Mitgründerin | 05 Sep |
| 29 | Yolanda Heeren | YOOS! Design | Oprichter, workplace design | 05 Sep |
| 30 | James Stewart | Bamboo Invest Limited | Co-Founder & CEO | 05 Sep |
| 31 | Louise Hewitson | Thrive Counselling and Consultancy | Co-Founder & Director | 05 Sep |
| 32 | Sébastien Alotto | MYSA Energy | Fondateur | 04 Sep |
| 33 | Farha Mohammad | Rivière Consult | Founder | 02 Sep |
| 34 | David Marian | CLUUE | Co-Founder, Product & Engineering | 30 Aug |
| 35 | Andy Tidd | Juntos Solutions | Founder | 30 Aug |
| 36 | Yero Sow | Wayne Padel | Fondateur | Aug |
| 37 | Jochen Matzer | NF1 SmartTech | Geschäftsführer | Aug |
| 38 | Samer Al-Waealy | Brightnerds® | Founder | Aug |
| 39 | Visakh Pillai | AutoDevPro Tech | Founder | Aug |
| 40 | Romain Garcin | Agence Mediatik | Fondateur | Aug |
| 41 | Manuela Eilers | LEBENSWEG | Inhaberin | Aug |
| 42 | Marcel van Milt | Inner Leadership Institute | Oprichter | Aug |
| 43 | Sylvia Randazzo | L'OFFICE DES ARTISTES | Fondatrice | Aug |
| 44 | Gijs van den Hombergh | Noventes | Mede-eigenaar | Aug |
| 45 | Kevin Rato | SURGEOR | Co-Founder | Aug |
| 46 | Lydie Smets | SoniForm | Zaakvoerder | Aug |
| 47 | Katie Vlaardingerbroek | Theaterstudio KRIP | Mede-eigenaar | Aug |
| 48 | Julia Wilckens | PowerPitch | Gründerin | Aug |
| 49 | Debby Alles | Sportcafé de Kogge | Mede-eigenaar | Aug |
| 50 | Guy Casters | BRIGHT-RISE | Zaakvoerder | Aug |
| 51 | Shail Ma | Clean Valley CIC | Co-Founder | Aug |
| 52 | Muhammad Akbar | Aksonz | Founder | Aug |
| 53 | Jon Cockley | Handsome Frank | Co-Founder | Aug |
| 54 | Neeraj Sharma | Nesh Group | Founder | Aug |
| 55 | Mushtaq Taher | RentX Rewards | Co-Founder | Aug |
| 56 | Dr. Ramedani | Rejuvalize | Inhaber | Aug |
| 57 | Aditya Taneja | Mapler AIx | Co-Founder | Aug |
| 58 | Daan Erisman | tuftuf | Mede-eigenaar | Aug |
| 59 | Tracey Stewart | Motzu Labs | Co-Founder | Aug |
| 60 | Mudabbir 孟達柏 | amuu | Co-Founder | Aug |
| 61 | Antoine Levi | Ciaccia Levi | Co-Founder | Aug |
| 62 | Jose Barbosa | z3leads | Founder | Aug |
| 63 | Emily R. | Alquimia Legal | Founder | Aug |
| 64 | Krijn Roosjen | Kinspot | Mede-eigenaar | Aug |
| 65 | Frederik Decruy | DECRUY TRANSPORT | Zaakvoerder | Aug |
| 66 | Mike Kokken | Stichting wysiwyg | Mede-eigenaar | Aug |
| 67 | Christelle Dupuy | PalindromeX | Co-Founder & CEO | 21 Aug |
| 68 | Frank Wallrapp | Twogee Biotech | CEO & Co-Founder | 18 Aug |
| 69 | Carolien Leeraar | MicroMovements | Co-Owner | 17 Aug |
| 70 | Fernando Gomes | DS PRIVATE MATOSINHOS | Co-Owner | 11 Aug |
| 71 | Lars Vagevuur | WebMar | Co-Owner | 10 Aug |
| 72 | Katrin Kempe | duwerk | CEO & Co-Founder | 10 Aug |
| 73 | Rohith Devanathan | Veeran Advisory | Founder | 06 Aug |
| 74 | Marjan Verhoeven | Peter Van Der Leegte Veilingen | Co-owner, Finance & Ops | 03 Aug |
| 75 | Romy Abbrederis | Lobby | CEO & Co-Founder | 30 Jul |
| 76 | Orion D. | Omnilabs Research | Co-founder & CEO | 29 Jul |
| 77 | Paul Prescott | Raise Your Game Limited | Founder | 27 Jul |
| 78 | Simon Wilmes | Snorly GmbH | Co-Founder & CEO | 26 Jul |
| 79 | Hendrik Rolshausen | Prevent | Co-Founder & CEO | 25 Jul |
| 80 | Balaram Gajra | Camrose Value Drug Mart & Travel Clinic | Pharmacy Manager/Owner | 25 Jul |
| 81 | Niklas Mocker | dotega | Founder | 25 Jul |
| 82 | Hau-Quoc Phan | Spa Holistique Ayurveda | Co-Owner | 24 Jul |
| 83 | Jean-Christophe Conticello | GIANTS | Founder | 24 Jul |
| 84 | Harold Engelen | Grenzeloos Gastvrij | Mede-eigenaar | 23 Jul |
| 85 | Daniel Förster | Thane Alaric | Founder & Lead Architect | 22 Jul |
| 86 | Yasin Tipiler | The Sales Academy | Founder | 22 Jul |
| 87 | Nives Rombini | Navis Bio | Co-Founder | 21 Jul |
| 88 | Connor Bosco | Elevate Marketing | Co-Owner | 21 Jul |
| 89 | Ferry de Haas | NFJ Solutions | Co-Owner | 21 Jul |
| 90 | Anthony Roux | Lums AI | CEO & Co-founder | 20 Jul |
| 91 | Abdullatif Al-Zaeem | LIVSHO | Co-Founder & CEO | 20 Jul |

Rows 32 and 27 replied to the connect note itself (a thumbs up, and a "nice to
meet you") but never received a real message, so they still belong here.

Twelve nationalities across the list. Selecting by fit rather than by country,
as the ICP rule requires.

## Rows the queue has already ruled on

Do not research these blind, the earlier verdict stands unless new evidence
overrides it explicitly.

- **Jon Cockley, Handsome Frank** and **Orion D., Omnilabs Research**, both
  marked `NO_STRONG_ANGLE`. Real proof, real clients, no honest gap.
- **Simon Wilmes, Snorly**, marked `NO_STRONG_ANGLE` for the same reason.
- **Niklas Mocker, dotega**, marked `NO_STRONG_ANGLE`.
- **Hendrik Rolshausen, Prevent**, `BLOCKED_NEEDS_INFO`. prevent.de redirects to
  an unrelated ias-gruppe.de, so the domain is not theirs.
- **Yasin Tipiler, The Sales Academy**, `BLOCKED_NEEDS_INFO`.
  thesalesacademy.nl is "Salespiration" by a different founder.
- **Aditya Taneja, Mapler AIx**, `BLOCKED_NEEDS_INFO`. mapler.com serves an
  unrelated luxury hospitality brand.
- **Mudabbir, amuu**, **Emily R., Alquimia Legal**, **Neeraj Sharma, Nesh
  Group**, all `BLOCKED_NEEDS_INFO` on identity ambiguity.
- **Niklas Hanf, Solvio-Workshop**, held. Solvio already runs a
  "Problem-Solv(io)er" self assessment, which is exactly the lead magnet we
  would have proposed. His tool page returns 200 but reads empty to our
  fetcher, which is UNKNOWN, not broken. Needs Raka to open it on his phone.

## Accepted is NOT the same as invited

These were drafted for on 2026-09-13 before this check and **cannot be sent**,
because the invite was never accepted. The research on each is sound and worth
keeping for whenever they do accept.

- Robert Kenward, Disrupt Search. Invite 07 Sep. Angle, the Fitability
  trademarked framework has a whole page and zero inputs.
- Tim Steinnus, SELLENGERS. Invite 06 Sep. Angle, a single page site with
  "Marken" fourteen times and no brand list.
- Lisanne de Jong-Vanhommerig. Invite 06 Sep. Angle, strong employment law
  articles with no capture under them.
- Jelle de Vries, EduOs Web. Invite 07 Sep. Angle, a full product rewrite
  described only as a rewrite, 1,602 characters on the homepage.
- Sander Dongelmans, MrBricky. Invite 08 Sep. Angle needs rework anyway, he is
  a WordPress and React developer, so a build feature is the wrong pitch.
  His listed domain is mrbricky.com, not the .nl that was researched.
