# Katie Vlaardingerbroek, Theaterstudio KRIP, ctc_k5wbLRKyPJYio6aj8, lea_LtxfL5qF8bJoN592m. Four angle re-judge 2026-10-07

**Verdict: NUDGE, angle A (an AI workflow for the company), confidence MEDIUM. Two flags for Raka before it goes.** In plain words, KRIP is a new theatre foundation in Zwolle for makers with a disability. It runs on care money, funds and subsidies all at once, and every fund gets its own file. That money side is Katie's job. So the offer is an AI workflow for KRIP's fund applications and reports. The website problem we raised in September is gone.

**Flag 1, budget (Tomatoworld lesson).** It's a non profit stichting. Its own policy plan puts total 2026 to 2027 spend at 71,500 euros (Het Podium Op! is 41,910 of that). It's tiny, but inside the new 500 euro floor. The figure stays out of the message.
**Flag 2, decision maker.** Katie is co-founder (lemlist jobTitle "Zakelijk leider en co-founder") and zakelijk leider in the core team. She isn't on the board, which is chair Jacoba Evelien Dijkema-Woertink, treasurer Marloes Selles-Homminga and secretary Tirza Kater. The core team acts "uitsluitend onder verantwoordelijkheid van en namens het bestuur" (only under the board's responsibility and on its behalf). She'd need the treasurer to say yes.

## Thread (pulled 06:12 and again 06:29 UTC, control Cristian's thread 2 items in the same minute)
- totalItems 2, nextPage null.
- 2026-09-02 12:07 OUT connect note.
- 2026-09-21 07:59 OUT opener, "theaterstudiokrip.nl doesn't open. It bounces between two versions of its own address ..." and an offer to build the site.
- No reply, no last message promise, no follow up. One opener, so a NUDGE is allowed. sentOnly "Vlaardingerbroek" returns only this contact.
- The 21 Sep claim no longer holds. https://theaterstudiokrip.nl/ returns 200 today, title "Home | Theaterstudio Krip", screenshot opened. The nudge says so up front and doesn't repeat it.

## Record and ownership
- lemlist jobTitle "Zakelijk leider en co-founder", tagline "Auteur Nederland Therapieland, oprichter KV Kennisontwikkeling, zakelijk leider Studio KRIP". KV Kennisontwikkeling couldn't be tied to her by search, so it's not used.
- Statutory, policy plan p.2 KvK 42074718, RSIN 869589817, deed 2 June 2026. North Data search lists "Stichting Studio KRIP, Zwolle, KvK 42074718" (fetch-walled, 2026-10-07).
- https://www.theaterstudiokrip.nl/team-members "Katie Vlaardingerbroek KRIP KERNTEAM Zakelijk leider", reopened 06:29 UTC.

## Website (B)
- crawl.py pass 1 12 URLs (10 from sitemaps, 11 at 200, 1 lowercase ANBI URL 404 while the linked uppercase one is 200), pass 2 12 URLs, every page read. Wix site, new house style. Home, KRIP crew, over ons, informatie (6 PDFs), contact form, agenda (open days Fri 13 Nov and Fri 12 Feb at Domusica, first show June 2027), three news items, ANBI page, newsletter signup.
- site-audit.js, no RENDER NOT TRUSTED, 29 failed requests, but the desktop screenshot opened shows a complete page, blue nav, "Jouw Podium, Jouw Talent", Agenda and Over KRIP buttons, an embedded YouTube intro "We stellen aan je voor aan KRIP". Modern and complete. B fails.

## Apps for the company (A), CHOSEN
- Policy plan https://www.theaterstudiokrip.nl/_files/ugd/4dbf16_3bfb80c4f98d41a58ff94d881695ee60.pdf (16 pages, read in full, redownloaded byte identical 06:29 UTC).
  - 10.2 "Studio KRIP werkt vanuit een meervoudig financieringsmodel" (a mixed funding model), Wmo, Wlz, PGB, fondsen, subsidies, giften, sponsoring, partner contributions, ticket sales, workshops.
  - 6, the foundation works partly by "het aanvragen en ontvangen van subsidies, fondsen, giften" (applying for and receiving subsidies, funds, gifts).
  - 10.5 "Per project of fonds wordt een apart projectdossier bijgehouden" (a separate project file is kept per project or fund), with cost centres to keep care money, project grants and own income apart.
  - 10.1, a clear split between care money, subsidies and own income is "een essentieel uitgangspunt" (an essential principle).
  - 7.3 Katie as zakelijk leider joins up "planning, partnerschappen, publieksbereik, financiële borging" (planning, partnerships, audience reach, securing the finances). The core team reports in writing to the board at least yearly. Lisa van Doorn handles PR, intakes and care contracts.
  - 6.4 Het Podium Op! runs September 2026 to July 2027.
- Disproof attempt. Searched the plan and all 12 pages for an existing fundraiser, bureau or software, none named. "Administratie en kwaliteitsborging" is listed as a cost line, so nobody outside is named for it. The job is real and visible in their own document. Whether Katie writes the applications herself is INFERENCE, so the message only says the money side sits with her (fact, 7.3).

## Personal AI workflow (C)
- Katie is also an author. Trouw 25 Feb 2026, NPO Radio 1 6 Dec 2025, Jacobidebat Utrecht July 2026 (tools/news.py nl, person query 10 results, control Heineken 100). An EO piece is about her own health, which is personal life and never used. C overlaps A, and A is the company's cost, so A is chosen.

## Social and branding (D)
- Their HTML links no social account (homepage grep, rendered anchors). The policy plan says "Studio KRIP heeft een website en is zichtbaar via social media".
- social-audit.js on the lemlist companyLinkedinUrl https://www.linkedin.com/company/theaterstudio-krip hit the login wall, UNKNOWN. WebFetch on the same URL gave 104 followers, 3 employees, posts 1 week, 3 weeks, 1 month, 2 months x2, 3, 4, 5 x2 and 6 months old, recruiting guest teachers and makers. That's active, and Lisa van Doorn (a communications adviser) runs PR in house. No Instagram found by search. A missing social link in the footer is an afternoon's tweak. Not chosen.

## News
- tools/news.py nl, "Studio KRIP" 0, Katie 10 (book coverage), control Heineken 100.

## Four angle table
| Angle | Proof | What it costs them | Would she name it | Incumbent | Verdict |
|---|---|---|---|---|---|
| A company AI, fund and care money admin | policy plan 6, 7.3, 10.2, 10.5 | every fund and care stream carries its own file and reporting, on a three person team that also teaches every Friday. Survival depends on funds | likely, it's her role | none named | CHOSEN, costliest and hottest, Het Podium Op! is funded and running now |
| C personal AI | author with media rounds, KRIP business lead | her hours | maybe | none | folded into A |
| B website | 12+12 pages, screenshot, complete | none | no | graphic designer and Wix | fails |
| D social | LinkedIn 104 followers, weekly posts, comms lead in house | small | no | Lisa van Doorn | fails |

Sources (12, 6+ domains), theaterstudiokrip.nl home, team-members, agenda, informatie, ANBI page, nieuws, policy plan PDF, northdata.com, linkedin.com/company/theaterstudio-krip (WebFetch), news.google.com via news.py (Trouw, NPO Radio 1, UITagenda), the lemlist thread and record, linkedin.com/in/katie-vlaardingerbroek-70134b22b (999, walled).
