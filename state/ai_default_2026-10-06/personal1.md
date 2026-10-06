<!-- NO DRAFTS -->
# Personal AI workflow pass, tag personal1, 2026-10-06

Read only. Nothing sent, no lemlist write calls, git untouched. Evidence saved in /tmp/claude-0/agents/nsa/p1_ev/.

**What was run (about 13:58 to 14:10 UTC)**
- `get_inbox_conversation` on all four contactIds, page 1, `nextPage` null on all four, LinkedIn sync `recent` 13:55:13Z.
  Positive control in the same minute, Cristian's thread came back with both known items (23 Jul connect note, 26 Aug
  message), so Willem's empty thread is a real negative.
- `search_campaign_leads` by leadId for all four, records read in full (jobTitle, tagline, summary, jobDescription,
  experience list).
- curl of lestud-reformer.fr (home, notre-equipe, contact, nos-tarifs, nos-seances, reserver, notre-concept,
  le-pilates-reformer, all 200), eldy.ch home and a-propos (200), startupticker.ch Eldy funding article (200),
  rtvnoord.nl Willem Straat portrait 22 Nov 2025 (200), datmag.nl 2016 interview (200, personal content only, unused).
- `tools/fetch-walled.py` on all four /in/ profiles, 429 or 999 on all four, so their own LinkedIn words are UNKNOWN
  beyond what lemlist holds.
- `tools/social-audit.js` on instagram.com/lestudreformer (2,156 followers, 30 posts, latest 2026-10-01),
  linkedin.com/company/readystudyglobal (138 followers), linkedin.com/company/106624001 (Eldy) and
  linkedin.com/company/hooftenpetiet (both UNKNOWN, login wall).
- Playwright render of /reserver/ with the proxy CA pinned. The bsport widget did not mount through our path (frames
  read, no timetable), so I counted no classes. Today's 06:4x red team render (15 of 20 classes 5/5 on bsport's own
  waitlist) stands as the latest reading and is not repeated as mine.
- Four web searches, used only to find pages to open. Switalk's own site was not reachable (proxy 502 on three guessed
  hosts, our side, proves nothing), so Switalk rests on his own lemlist summary.
- Red team files read first, state/ai_default_2026-10-06/redteam_nsa03.md (Simon KILL, Richard-Gabriel KILL) and
  redteam_willem.md (KILL), plus nsa01.md (Cristian NO_SIGNAL). No claim they killed is repeated below.

| Lead | Verdict | Why, in one line |
|---|---|---|
| Simon Chuinard | NO_DRAFT | No owner time signal in his own material. Booking and class waitlists already run on bsport, and the waitlist angle was killed this morning |
| Richard-Gabriel Cuzic | NO_DRAFT | He's building Switalk, his own tool for exactly this personal admin problem |
| Willem Straat | NO_DRAFT | 45 staff, his co-owner runs systems and processes, nothing shows Willem's own week eaten |
| Cristian Andriesei | NO_DRAFT | Eldy's own matching "uses AI", and he's a career product chief who builds his own tools |

---

### Simon Chuinard, Le Stud' Pilates Reformer, ctc_QdhtaeDvqahLSQcSM

**Screen.**
- Thread, 1 item, nextPage null. OUTBOUND 2026-09-02T18:41Z, "Hi Simon, thanks for connecting. Had a look at Le Stud
  and the premium reformer positioning really comes through. The one thing holding it back is there is no timetable, no
  prices and no real online booking, the Reserver button just goes to a login ... Want me to?" No reply. One real
  message, so the shape would be a NUDGE.
- Owner. lemlist jobTitle "Co-founder / head coach", tagline "Fitness instructor Spa & Wellness Co-founder : Le Stud'
  Reformer". Register LE STUD SAS, SIREN 992192559, sole dirigeant Simon Chuinard, Président de SAS (read by the red team
  at 07:0xZ today, not reopened by me).
- Personal time signals hunted. https://www.lestud-reformer.fr/notre-equipe/ names two people, Simon and Lauren, who
  "accompagne Simon dans la vie quotidienne du Stud'". One mobile number on every page, "(+33) 06.08.95.97.34".
  https://www.lestud-reformer.fr/nos-tarifs/ "Nos abonnements sont actuellement complet ... nous vous contacterons en
  priorité lorsqu'une place se libère", with 12 month memberships. lemlist summary is about his coaching vision, nothing
  on admin, workload or a second job. The tagline's "Fitness instructor Spa & Wellness" and a search title "Coach sportif
  Indépendant" can't be dated or tied to now, LinkedIn walled.
- Disproof. He doesn't sell AI or automation. He does already run bsport (widget bsport-widget-584013 on /reserver/,
  found in the HTML this pass), which takes bookings and runs class waitlists itself per the red team's check.

**Verdict, NO_DRAFT.** Nothing in his own material shows what eats his week beyond teaching. The only admin signals,
booking and the waitlist, are already automated by bsport or rare (12 month memberships), and the red team killed the
waitlist conclusion this morning ("every freed place sits empty" is false on his own timetable). A personal workflow
message would have to invent his evenings, which the brief bans. Closest call of the four. If Raka wants a touch, it's a
plain friendly check in on the full memberships, not a pitch.

```sweep
lead: Simon Chuinard, co founder and head coach, LE STUD SAS SIREN 992192559, ctc_QdhtaeDvqahLSQcSM, one real message 2026-09-02 unanswered per the lemlist thread pulled 2026-10-06 about 14:00 UTC
website: eight pages curled 2026-10-06 14:03 UTC, https://www.lestud-reformer.fr/nos-tarifs/ memberships full with a Google Form waitlist, booking live on bsport in the /reserver/ HTML, theme demo /contact/ page with a Napa Valley address still public, a cleanup, not chosen
gdpr: a cookie banner with Tout rejeter seen in the Playwright render of https://www.lestud-reformer.fr/reserver/ 2026-10-06, the EU view was not run, no claim made, not chosen
apps: owner time hunted, two people on https://www.lestud-reformer.fr/notre-equipe/ and one mobile number, but bookings and class waitlists already run on bsport and memberships are 12 months, red team redteam_nsa03.md killed the waitlist angle, no visible admin load, not chosen
social: tools/social-audit.js on https://www.instagram.com/lestudreformer/ 2156 followers, 30 posts, latest 2026-10-01, active, captions unreadable from the embed, no angle
squad: a two person studio with no build work, no capacity fact, lemlist record and team page agree, not a squad fit
verdict: NO_STRONG_ANGLE, the personal AI angle has no visible time signal and its only hooks are already automated by bsport
```

---

### Richard-Gabriel Cuzic, Ready Study Global (Switalk), ctc_pAPukszq8MBpRfYrT

**Screen.**
- Thread, 1 item, nextPage null. OUTBOUND 2026-09-05T09:38Z, "Hi Richard-Gabriel, thanks for connecting. You have two
  things running, Ready Study Global and now Switalk with Claudiu, and an inbox plus CRM for solopreneurs is a real
  problem worth solving ... How is Switalk going, still talking to users or already building?" A peer note, no pitch, no
  reply. One real message, so the shape would be a NUDGE.
- Owner. Companies House 14329535, READY STUDY GLOBAL LTD, 1 officer, CUZIC Richard-Gabriel, active director (red team
  read today). lemlist jobTitle "Founder".
- Personal time signal, and it's in his own words, lemlist summary read 2026-10-06. "Running Ready Study Global ... I was
  juggling client messages across Instagram, WhatsApp, email, and LinkedIn daily. Missed messages meant missed students."
  Tagline "Co-Founder @ Switalk ... | Founder @ Ready Study Global | Marketing & Social Media @ UWL". jobDescription
  "Building marketing funnels, CRM systems, and digital campaigns".
- Disproof, and it fails. The same summary says "I'm building Switalk with my co-founder Claudiu, an all-in-one tool
  that brings your inbox, content scheduling, and CRM into one place ... Built for freelancers, creators, and
  solopreneurs who lose clients because messages get buried". His answer to his own admin is the product he's building.
  He also builds CRM systems himself.

**Verdict, NO_DRAFT.** The time signal is real and his own, but he's building the tool for exactly that problem and
pitching to solopreneurs. Offering him an AI workflow for his inbox and admin pitches against his own product. The red
team's kill on the RSG first review angle (the site sells "Human guidance") also still stands. If Raka wants a touch,
the September thread was a peer question about Switalk and the only honest next step is a peer follow up on that, not
a pitch.

```sweep
lead: Richard-Gabriel Cuzic, sole director READY STUDY GLOBAL LTD per the Companies House register 14329535, co founder of Switalk, ctc_pAPukszq8MBpRfYrT, one peer message 2026-09-05 unanswered per the lemlist thread pulled 2026-10-06
website: https://readystudyglobal.com/ a strong modern Astro site per two crawls in nsa03.md, footer sells "Human guidance", no website angle, not chosen
gdpr: CookieYes with gtag consent per the nsa03.md site-audit run, GEO VOID, the EU view was not run, no claim made, not chosen
apps: owner time hunted, lemlist summary says he juggled client messages across Instagram, WhatsApp, email and LinkedIn daily, but he's building Switalk, an inbox, scheduling and CRM tool for solopreneurs, so a personal AI workflow pitches against his own product, not chosen
social: tools/social-audit.js on https://www.linkedin.com/company/readystudyglobal 138 followers 2026-10-06, Instagram and Facebook alive per nsa03.md, small but active, no angle
squad: Switalk has its own full stack co founder Claudiu per the lemlist summary, RSG has no build work shown, not a squad fit
verdict: NO_STRONG_ANGLE, he builds the personal admin tool himself, peer follow up on Switalk is the only honest touch
```

---

### Willem Straat, KeyPro / Hooft & Petiet (ReShare Living Group), ctc_XDgqhRAfzxcTmGKhZ

**Screen.**
- Thread, 0 items, totalItems 0, nextPage null, sync recent 13:55Z. Control, Cristian's thread full in the same minute.
  Never messaged, so the shape would be an OPENER.
- Owner, co-owner. lemlist jobTitle "Mede-eigenaar", jobDescription "Mede-eigenaar van Hooft & Petiet ... Als onderdeel
  van de ReShare Living Group". https://www.rtvnoord.nl/economie/RX-502/hij-werd-uitgelachen-nu-verhuurt-willem-straat-meubels-door-heel-nederland
  (22 Nov 2025, read 2026-10-06) calls Bas Anneveldt "mede-eigenaar" and says Grehamer Invest came in as strategic
  shareholder.
- Personal time signals hunted. Tagline lists four things, "KeyPro meubelverhuur | H&P interieur | ReShare Living Group |
  Circulaire woonoplossingen". But the same RTV Noord piece says the group has "45 medewerkers", locations in Groningen
  and Amsterdam, and "Bas Anneveldt werd mede-eigenaar en maakte KeyPro schaalbaar door het gebruik van slimme systemen
  en processen". Willem's own words there are about ambition and people, "Ik ben het liefst tussen de mensen", "Het
  grootste platform van Europa worden, daar ga ik voor". Nothing says he does sales, the inbox, proposals or posting
  alone. The 2016 DATmag interview is personal morning routine material, off limits and unused.
- Disproof. They don't sell AI, but the group already runs a client portal (portal.keypro.nl) and MoreApp forms per the
  red team, and its systems belong to his co-owner.

**Verdict, NO_DRAFT.** A co-owner of a 45 person, investor backed group whose partner owns systems and processes, with no
visible sign his own week is eaten by admin. Writing one would mean inventing it. The red team's kill of the changeover
angle stands and nothing here replaces it.

```sweep
lead: Willem Straat, mede eigenaar of Hooft & Petiet and co owner of KeyPro within ReShare Living Group, ctc_XDgqhRAfzxcTmGKhZ, lemlist thread 0 items pulled 2026-10-06 with a full control in the same minute
website: hooftenpetiet.nl 64 pages crawled twice in nsa09.md, complete brand site, reshareliving.com still "in ontwikkeling" but visibly being built, not chosen
gdpr: tools/eu-view.py from Stockholm on https://hooftenpetiet.nl per nsa09.md, _ga, _gcl_au and hubspotutk before a click with a HubSpot banner present, a consent setting that fails the tweak test, not chosen
apps: owner time hunted in the lemlist record and https://www.rtvnoord.nl/economie/RX-502/hij-werd-uitgelachen-nu-verhuurt-willem-straat-meubels-door-heel-nederland , 45 staff and co owner Bas runs systems and processes, KeyPro portal and MoreApp already in use per redteam_willem.md, the changeover angle was killed, not chosen
social: tools/social-audit.js on https://www.linkedin.com/company/hooftenpetiet UNKNOWN behind the login 2026-10-06, Instagram hooftenpetiet dormant since 2025-06-25 per nsa09.md, a small side account next to KeyPro's, not chosen
squad: https://hooftenpetiet.nl/vacatures/ lists fitting staff and interns per the nsa09.md crawl, KeyPro's portal shows a builder in house, no capacity fact, not a squad fit
verdict: NO_STRONG_ANGLE, no visible owner time signal and the group already owns its systems
```

---

### Cristian Andriesei, Eldy, ctc_t8TKRJXP6cemMLBBg

**Screen.**
- Thread, 2 items, nextPage null. OUTBOUND 2026-07-23T09:09Z, the connect note "Hi Cristian, saw your business and
  thought it was cool ... Would love to connect and share ideas!". OUTBOUND 2026-08-26T15:18Z, French message, "vous
  affichez plus de 160 familles et 82 avis, mais aucun de ces avis n'est visible et le tarif passe vite en sur demande
  ... On a esquissé une page qui met les vrais avis et un tarif lisible en avant. Je te l'envoie?" No reply. One real
  message, so the shape would be a NUDGE.
- Owner. lemlist jobTitle "Co-Founder & CEO", seniority "Ownership / Firm Leadership". Co-founders Andrew Mastrandonas
  and Yanis Elalamy per search results, not opened, unused.
- Personal time signals hunted. https://www.eldy.ch/a-propos.html "Réunion d'équipe, chaque semaine on revoit ensemble
  la situation de chaque famille accompagnée", "plus de 160 familles". That's a team doing the review, not him alone.
  lemlist summary is a product career, "15 years, 5 startups, 20+ clients", Chief Product Officer at RingMD.
- Disproof, and it fails twice. https://www.startupticker.ch/en/news/eldy-ch-smart-companion-matching-awarded-chf-400-000-financing
  (25 Mar 2025, read 2026-10-06) "Eldy.ch's proprietary smart matching system uses AI to match families with the right
  companion". https://www.eldy.ch/ FAQ "nous combinons une sélection rigoureuse ... avec une technologie de matching".
  The homepage HTML also carries a self built sales pipeline, 17 HTML lines mentioning /sales-pipeline/ (nsa01.md found the
  track-phone-call endpoint).

**Verdict, NO_DRAFT.** He runs an AI product inside his own company and has built digital products for 15 years. Offering
him a personal AI workflow is offering a product chief something he builds himself. Matches the nsa01.md NO_SIGNAL.

```sweep
lead: Cristian Andriesei, Co Founder and CEO of Eldy SA Morges, ctc_t8TKRJXP6cemMLBBg, one real message 2026-08-26 unanswered per the lemlist thread pulled 2026-10-06 about 14:00 UTC
website: https://www.eldy.ch/ curled 2026-10-06 14:03 UTC, price from CHF 42 per hour and reviews now shown, seven canton pages, strong and current, the August points are fixed, not chosen
gdpr: a Swiss company selling in Switzerland, Google Tag Manager in the homepage HTML per nsa01.md, outside the EU view's point, no claim made, not chosen
apps: owner time hunted, weekly team review of every family on https://www.eldy.ch/a-propos.html is a team job, and Eldy already runs AI matching per https://www.startupticker.ch/en/news/eldy-ch-smart-companion-matching-awarded-chf-400-000-financing plus a self built pipeline in the HTML, fails the already run it check
social: tools/social-audit.js on https://www.linkedin.com/company/106624001/ from the site's HTML, UNKNOWN behind the login 2026-10-06, no other account linked, nothing usable
squad: not hiring per the homepage HTML "Nous ne recrutons pas activement", regional partner programme hires field partners not builders, no capacity fact
verdict: NO_STRONG_ANGLE, the owner runs AI in his own product and builds his own tools
```
