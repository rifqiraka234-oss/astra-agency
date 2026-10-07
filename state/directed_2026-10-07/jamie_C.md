# Jamie Bolding, Restless, ctc_4XQDxYiE3NkeqKPEy, lea_qGRRo8XoP6ito6m2D

Plain words. Jamie owns most of Restless, a London AI social agency started this year. The whole agency
sells itself on Antenna, its own AI platform. Their team page shows four founders and no one who builds
software, and all three open jobs are on the client side. Our offer is a squad of developers who build
Antenna next to them in half the time at half the price. Caveat for Raka: Jamie also owns a small software
company, Coda Labs, which very likely builds Antenna, so he does have some build capacity already.

## Thread
- get_inbox_conversation 2026-10-07 ~16:03 UTC: 0 items, nextPage null. Control ctc_ch3vFcKAkjQdMKDCg 2 items same minute.
- sentOnly "Jamie Bolding": connect note 2026-10-06 06:14 UTC, lastRepliedAt null. myConversations "Bolding" 0.
- Co-founder Jamie Vaughan ctc_KjnfaAkXxqrFTJSAa thread 0 items today, he was judged NO_STRONG_ANGLE in b11_D and got nothing. No double pitch.
- Shape OPENER.

## Record and ownership
- lemlist: jobTitle "Co-Founder", tagline "Building create or die & Restless. Ex Jungle Creations", jobDescription "An AI-native creative performance agency, working with the most ambitious consumer brands to drive growth", 1 to 10 staff, campaign "founders: new businesses with marketing hires" running.
- Companies House 16879495 RESTLESS MARKETING SERVICES LIMITED: directors Bolding, Poulter, Vaughan (Devina Seth resigned 31 May 2026, still on the team page). PSCs Poulter 25 to 50%, Coda Labs Ltd 50 to 75%. Filings 02 Oct 2026 SH02 share sub-division, 28 Sep 2026 AA01.
- Coda Labs Ltd 12520585: sole PSC James Edward Bolding 75%+, director and secretary since 17 Mar 2020, SIC 62012 business and domestic software development, formerly PACKCHAT LIMITED until 11 Jul 2025. Accounts to 31 Mar 2025, average staff 7 (3 the year before). So Jamie is majority owner of Restless through his own software company. (Accounts figures are not for any message.)
- His 7 appointments: Laced Gummies Ltd (Sep 2026), Restless Marketing Services, Restless Marketing Ltd (dissolved), Oriri Bookings, Oriri House, Jungle Creations Employee Trustees (dissolved), Coda Labs.
- team page: "Jamie Bolding Co-Founder & Chairman. Built and sold Jungle Creations". LBB: executive chairman.
- "create or die": createordie.ai exists, one line Framer page "We build AI apps to improve human lives", no names, not tied to him. Not used.

## Capacity evidence (the directed angle)
| Fact | Source |
|---|---|
| "Our proprietary AI platform", "all powered by Antenna", "Powered by Antenna" | https://restless.co/ , /antenna |
| "We didn't add AI to an agency. We built an agency on AI." | homepage, screenshot opened |
| Team page, four co-founders, MD, CEO, CCO, Chairman, nobody else | https://restless.co/team reopened 16:17 UTC |
| 3 open roles, Performance Manager, Creative Strategist, Mid Weight Social Creative, none technical | https://careers.restless.co/jobs |
| Performance Manager "working with the product and road testing features to shape the tools our clients use every day" | job 7971909 |
| Creative Strategist "Use Restless' internal AI tools to produce briefs at high volume" | job 7973092 |
| "We launched 5-6 months ago", "We're still small" | job 8467727, careers home |
| Clients Cowshed, Rapport, Off Market Cars | LBB 2026-04-23 |
| Jamie, "we are building everything around AI with a new model for creative intelligence" | LBB 2026-04-23 |
| No funding round filed (no SH01 allotment) | Companies House filing history |
| Disproof, grep of all 23 crawled pages, team HTML and careers for engineer, developer, CTO, product team, built by, Coda, none | crawl.json, curl 16:17 UTC |
| Counter evidence, Jamie's own Coda Labs is a software dev company with 7 average staff to Mar 2025 | Companies House |

Verdict on "large engineering team or no build need": neither. No engineering team shown at Restless, a product with a roadmap and client tools, and a small related software company that probably does the building. Build Squad fits as "extend the team", not "you have nobody".

## Judge table
| Pain | Proof | Cost to him | Would he name it | Incumbent | Verdict |
|---|---|---|---|---|---|
| Antenna roadmap speed, the agency's whole pitch | team page, job ads, homepage | Biggest, Antenna is the reason a brand picks Restless over any social agency, slow features cap how many brands they serve | Likely, founders of a product led agency think about roadmap daily | Coda Labs team, unknown size today | CHOSEN, Raka's angle |
| GA, GTM, LinkedIn Insight before consent, no consent code | site-audit.js | UK GDPR and PECR risk, small for a B2B agency | Maybe | Their Webflow person, an afternoon | Not chosen |
| No case studies on the site | crawl | Some lost pitches | Maybe | Their own designers | Tweak test fails |
| Instagram 141 followers, last post 2026-08-19 | social-audit.js | Small, they sell social | No | Themselves | Not chosen |
| Personal AI workflow for a chairman of several companies | appointments list | Unknown | No | They build AI | Not chosen |

## Five angles
Website modern Webflow, 0 page errors, screenshots opened. GDPR, trackers before consent with no consent code (US egress, but no consent code means no geo rule exists). Apps, they build their own. Social, social-audit.js read Instagram 141 followers, 15 posts, latest 2026-08-19, LinkedIn 515 followers, latest post 14 days ago. Squad, chosen.

## Red team (separate pass, 2026-10-07 16:15 to 16:20 UTC)
- "your whole agency runs on Antenna": homepage "We work across social, performance, creator and insights, all powered by Antenna", holds. Their verb is "powered by", "runs on" is the same strength, not stronger. Holds.
- "your team page shows four founders and nobody whose job is building it": team page refetched, four names, four founder titles, word boundary grep for engineer, developer, CTO found nothing. Holds. Risk, Jamie knows Coda Labs builds it, so he may read it as "you didn't look". Kept because it's literally what the page shows, and the offer is framed as building "next to your team".
- "your strategists and media buyers ... usually wait on new Antenna features": INFERENCE, worded "usually". Rests on the job ads saying those roles road test features. Could be false if Coda Labs ships fast. Kept, flagged.
- "signing more brands in your first year": founded 2026 (about page), three clients named at launch, three client side roles open. Holds, "more brands" is direction, not a number.
- "in half the time at half the price": Raka's claim, verbatim, flagged.
- "I lead a squad of senior developers": the same line Raka approved in earlier Build Squad drafts, delivery is Amwisesa per docs/astra-company-profile.md. Flag, the disclosure travels if he asks who builds.
- Clue check: the message never mentions job ads or hiring. "strategists and media buyers" are named as people who'd use Antenna, which is the consequence, not the clue.
- check-drafts.py exit 0.

Confidence MEDIUM.

## Final message
Hi Jamie, saw Restless, looks interesting!

However, your whole agency runs on Antenna, yet your team page shows four founders and nobody whose job is building it. This causes your strategists and media buyers to usually wait on new Antenna features until someone has time to build them.

Especially, when you are signing more brands in your first year, the features every new client leans on only ship as fast as the people building them.

I run Astra agency. We build websites and apps for brands like Unilever, AXA, Pertamina. I lead a squad of senior developers who'd build Antenna next to your team in half the time at half the price, so your founders stay with the brands.

Shall I send you over what the squad that ships your Antenna roadmap looks like?
