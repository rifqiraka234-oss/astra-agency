# Silent accepted backlog — v0.1 campaign, found 2026-08-11

Full scan of all 513 leads across `cam_PryZp5LuvQv8NznHh` (v0.1) and
`cam_Co5CJXrpPFf5MRAfD` (v0.2), cross-referencing each lead's activity log
(`linkedinInviteAccepted` with no subsequent personalized message and no
reply) against the 46 live inbox conversations.

**51 people accepted the LinkedIn connection and never received Raka's
personalized follow-up message**, so they never had anything to reply to.
Confirmed root cause: v0.1 ("Outreach Only") has no automated second-touch
step, the personalized "I had a look at your business" message has always
been a manual send. This is the ongoing backlog situation the inbox triage
spec's Silent accepted tier exists to catch.

Sorted oldest accept first (most overdue):

| Days | Name | Company | Accepted |
|---|---|---|---|
| 26 | Amir G'nia | Ad-Wise Agency | 2026-07-16 |
| 24 | Fabrice Beauchêne | Glyx Therapeutics | 2026-07-18 |
| 22 | Anthony Roux | Lums AI | 2026-07-20 |
| 22 | Abdullatif Al-Zaeem | LIVSHO | 2026-07-20 |
| 21 | Axel Fleury | EDOUARD KOEHN MASTER WATCHMAKER | 2026-07-21 |
| 21 | Connor Bosco | Elevate Marketing | 2026-07-21 |
| 21 | Dr. Ph.D. | Infinity Biosciences GmbH | 2026-07-21 |
| 21 | Ferry Haas | NFJ Solutions | 2026-07-21 |
| 21 | Nives Rombini | Navis Bio | 2026-07-21 |
| 20 | Daniel Förster | Thane Alaric | 2026-07-22 |
| 20 | Niels Alten | Vimi Vino | 2026-07-22 |
| 20 | Alessio Monterosso | Ariana Naturals | 2026-07-22 |
| 20 | Yasin Tipiler | The Sales Academy | 2026-07-22 |
| 20 | Maarten Ectors | Greentic.ai | 2026-07-22 |
| 19 | Cristian Andriesei | Eldy | 2026-07-23 |
| 19 | Benedicte Overdijk | House of Wood BV | 2026-07-23 |
| 19 | Mark-Paul Burgersdijk | Rhijenhof | 2026-07-23 |
| 19 | Harold Engelen | Grenzeloos Gastvrij | 2026-07-23 |
| 18 | Marjorie Pigaux | Olo Suite | 2026-07-24 |
| 18 | Malcolm Amonoo | Seventh Studios | 2026-07-24 |
| 17 | Hendrik Rolshausen | Prevent | 2026-07-25 |
| 17 | Balaram Gajra | Camrose Value Drug Mart & Travel Clinic | 2026-07-25 |
| 17 | Niklas Mocker | dotega | 2026-07-25 |
| 16 | Mark Preston | Hypergility | 2026-07-26 |
| 16 | Simon Wilmes | Snorly GmbH | 2026-07-26 |
| 16 | Steven Prins | Bulgarian Wine Hub | 2026-07-26 |
| 16 | Evie Barker | Barker Longhorn | 2026-07-26 |
| 15 | Paul Prescott | Raise Your Game Limited | 2026-07-27 |
| 14 | Aditya Taneja | Mapler AIx Inc. | 2026-07-28 |
| 14 | Teodor Marian | Palmyra | 2026-07-28 |
| 14 | Tracey Stewart | Motzu Labs Inc. | 2026-07-28 |
| 14 | Ayub Shoaib | NOMW Health | 2026-07-28 |
| 14 | Mudabbir | amuu | 2026-07-28 |
| 14 | Bharat Suchith | Buddha Kalari | 2026-07-28 |
| 14 | Wilco Drijver | D&Z Domotica | 2026-07-28 |
| 14 | Clara Champion | Dafolle | 2026-07-28 |
| 14 | Yagiz Abik | 5U AI | 2026-07-28 |
| 14 | John Nabuurs | Precision Construction Components | 2026-07-28 |
| 14 | Mezabine Hatim | Maven Intel | 2026-07-28 |
| 13 | Neeraj Sharma | Nesh Group Limited | 2026-07-29 |
| 13 | Orion D. | Omnilabs Research | 2026-07-29 |
| 12 | Mushtaq Taher | RentX Rewards | 2026-07-30 |
| 12 | Jenna Goodwin | Raven Photography | 2026-07-30 |
| 12 | Martijn Dijk | StriData | 2026-07-30 |
| 9 | Debby Alles | Sportcafé de Kogge | 2026-08-02 |
| 8 | Guy Casters | BRIGHT-RISE | 2026-08-03 |
| 8 | Jon Cockley | Handsome Frank Illustration Agency | 2026-08-03 |
| 8 | Amna Abdulla | L'MANE | 2026-08-03 |
| 6 | Craig Walton | Dumfries & Galloway Chamber of Commerce | 2026-08-05 |
| 5 | Danny Velt | Tentopia | 2026-08-06 |
| 5 | Rohith Devanathan | Veeran Advisory | 2026-08-06 |

Full machine-readable version: `state/silent_accepted_queue.jsonl`.

## What this list is not

This is not a list of leads whose invite is still pending, or who declined,
or who already got a pitch and just haven't replied yet, all of those were
excluded during the scan. Every name above genuinely accepted the
connection and has had zero outreach since beyond the generic invite.

## Recommended next step

No messages have been drafted yet, per Raka's request this run is the
identification pass only. Drafting a genuine opener for each (per the
spec's quality bar: real observation about their business, a real
structural gap, a named concept, no generic filler) requires the same
per-company research as the enrichment pipeline's Stage 1/2/4, so this is
sized to run as its own batch job across one or more future sessions
rather than folding into a single daily triage digest.
