# Robin Conway, XMP SaaS Ltd, ctc_7hNbkAjk4urRmcjji

## STOP FLAGS
None. Thread holds 0 activities, no reply, sole director and 75%+ owner at Companies House.

## Thread (2026-10-07 16:05 UTC)
- get_inbox_conversation(ctc_7hNbkAjk4urRmcjji) page 1, totalItems 0, nextPage null, sync "recent".
- Positive control ctc_ch3vFcKAkjQdMKDCg same minute, 2 items.
- sentOnly "Robin Conway", 1 hit, same contactId, lastSentAt 2026-10-07 06:50 UTC, preview the connect note, lastRepliedAt null. myConversations "Conway", 0.
- search_campaign_leads lea_7CNN8QBckaeFZqAWu, W1b only. State and logs grep, only W1b load files. Shape, OPENER.

## Record
jobTitle "Founder, XMP", tagline "Founder @ XMP | Helping UK infrastructure operations gain control of delivery, stay compliant, and bill faster with a unified platform | Built from 10+ years running telecoms operations", Worcester, 1-10.

## Ownership (Companies House, via tools/fetch-walled.py, the plain curl got 403)
- https://find-and-update.company-information.service.gov.uk/company/16179678, XMP SAAS LIMITED, active, incorporated 13 January 2025, The Crown Offices, Martley WR6 6PA, SIC 62012.
- /officers, 1 officer, CONWAY Robin Stuart, director since 13 January 2025, 0 resignations.
- /persons-with-significant-control, Robin Stuart Conway, shares 75% or more, votes 75% or more, right to appoint directors.
- /filing-history, micro accounts to 31 Jan 2026 filed 7 Oct 2026, share allotment 19 Dec 2025 (capital GBP 116), new articles 4 Jun 2026.
- Micro accounts note 3, "Average number of employees during the period was 1". No money figure used.
- https://xmp.world/about lists "Robin Conway Chief Executive Officer" and "Martin Montgomery Chief Revenue Officer". A web search on Martin Montgomery with XMP found nothing more.

## Website, two passes
- tools/crawl.py pass 1, 150 pages (cap, 3034 queued links, nearly all hsLang and kb variants), pass 2, 150 pages, equal. Sitemap has 35 non kb URLs plus the knowledge base. Every non kb page text read.
- site-audit.js on the homepage, HubSpot, RENDER NOT TRUSTED (10 of 10 failed assets fine over direct fetch), GEO VOID (consent code). So its screenshots are void. Second render, my own Playwright full page render (scripts/shots.js), 3 to 4 failed requests per page, images decoded, screenshots of home, /services, /partner, /case-study/innov8 at 1440 and home at 390, opened.
- Homepage, hero "Seamless management of your people, projects, and processes", subline "tailored for utilities, renewables and construction businesses". "Trusted by service delivery leaders" with three logos, Innov8, JET Network Solutions, Total E&M. Stats render as +45% faster time to billing, +100% of operations covered, +30% saving in management resources, no source given. One quote, Adam Eatock, Founder, Innov8. Book a demo goes to /contact-us.
- /case-study/innov8, the only case study. /resources/tag/case-study lists only "Innov8 Transforms Business Management with XMP" (28 Oct 2025). Control, the same tag page lists that one item, so the listing works. "View More" on the case study goes to a 146814312.hs-sites-eu1.com URL that returns 404.
- /services, in the sitemap, not in the nav. Rendered and visible, "Benefit one", "Benefit two", "Benefit three", "Benefit four", "Case Study Example ... Lets look to use a case study around design project management here that covers mobile telecoms", a quote "XMP has transformed how we manage our field operations. We've seen a 30% increase in efficiency" from "Sarah Johnson, Operations Director, GreenTech Utilities" shown three times next to a PRESO logo, and an FAQ answer "By the same illusion which lifts the horizon of the sea ..." (filler text). Buttons on it link to "##".
- /partner, 10% referral commission, a "Lorem ipsum" string in the HTML text but not visible in the render, so not used.
- /pricing, "Early Access, Early adopter package", no prices, "pricing based on your team size".
- Events from their own posts. /resources/takeaways-from-connected-britain-2026 (16 Sep 2026), "We exhibited for the first time - ever! - at Connected Britain on 9-10 September 2026 ... in the Startup Zone", and "reconnect with existing connections and customers, built up over several years of developing XMP before its official launch". /resources/meet-xmp-at-connected-britain-solar-storage-live-2026, Solar & Storage Live NEC 22 to 24 Sep, Robin pitching for Startup of the Year. /resources/safer-sites-smarter-delivery-xmp-at-uk-construction-week-and-mats-2026, UK Construction Week 29 Sep to 1 Oct, MATS 25 Nov. Connected Britain 2026 award page (terrapinn.com), XMP a Startup of the Year finalist, winner Zim Connection.
- Blog, 11 posts May to Sep 2026, almost all telecoms.

## GDPR
tools/eu-view.py from Stockholm, 2 first party Cloudflare cookies, requests to HubSpot and region1.google-analytics.com before a click. Consent code present. Likely cookieless or consent mode pings, no cookie set. Not chosen.

## Social
social-audit.js on https://www.linkedin.com/company/xmp-saas-ltd/ (from their footer), UNKNOWN, login wall. No other account in their HTML.

## News
tools/news.py en, control (default) full. "XMP SaaS" 0. "Robin Conway" 18, none his (a Worcester pub reopening in 2025 is "The Crown" at Martley per the Worcester News title, the same building as XMP's registered office, not used). Regional, Openreach FTTP build plan 2025. Industry (altnet full fibre build contractors) 55, ISPreview 2026-09-18 FullFibre Ltd cutting jobs, 2026-07-22 Netomnia 100 staff on redundancy notice, 2026-05-08 Pulse Fibre into administration, Telegraph 2026-06-07 "Britain's rural broadband boom turns to bust". The fibre build market his first buyers sit in is consolidating.

## LinkedIn routes (Robin is owner and contact)
1. curl /in/robin-conway-6b7541314, 999. 2. Web search "Robin Conway" XMP telecoms, only the late GSMA CEO Rob Conway. 3. site:linkedin.com "Robin Conway" XMP, nothing. 4. Company page via social-audit.js, UNKNOWN. 5. His own words, the event posts and /about. 6. lemlist tagline.

## Capacity and process
1 average employee to Jan 2026, a CRO on the about page, a content writer (Natalie Cregan-Evans) on one post. Four trade shows between 9 Sep and 25 Nov. A partner referral programme. Demo booked through the contact form. Pricing not public.

## Candidate pains, with disproof attempts
1. Proof for buyers across four sectors. One case study, one quote, three logos, while the hero targets utilities, renewables and construction and the event calendar adds solar and construction. Disproof, case study tag listing (Innov8 only, control works), grep "Total E&M" (logo plus a /services placeholder card only), "JET" (logo only). HOLDS.
2. Finding and following up the right contractors. INFERENCE from 1 employee, first ever exhibition in Sep, four shows in three months, a market where altnets are cutting work. A small team usually follows up a show by hand and can't tell which contacts are growing. The AI workflow scores UK contractors from Companies House SIC codes (42220, 43210, 61900), director tenure, hiring and framework or tender wins, and drafts the follow up. CHOSEN with 1, as one sales engine.
3. Placeholder /services page with a sample testimonial. Real, visible, in the sitemap, a tweak to delete. Used as the visible symptom of pain 1.
4. GDPR. Not chosen, see above.
5. Build Squad. One employee and an AI roadmap ("Continual development and improvement with a roadmap including AI assistance"). A real alternative, flagged, not Raka's angle.

## Judge
| Pain | Proof | Cost to him | Would he name it | Incumbent takes it |
|---|---|---|---|---|
| Thin proof plus finding the right contractors, one sales engine | 1 case study, placeholder testimonial page, 1 employee, 4 shows | Every demo not booked is a year of licences lost, in a young SaaS on early adopter pricing | Yes, a founder at launch is measured on new customers | HubSpot holds the contacts, it doesn't build or score the list |
| Placeholder page | /services render | Embarrassing, small alone | Yes once seen | His own team in an hour |
| Developer capacity | 1 employee, AI roadmap | Real, unproven | Maybe | Contractors |
| GDPR | Consent code present | Low | No | n/a |

Winner, the sales engine, costliest, because new customers are the whole game at launch and both the list and the proof are missing pieces.

## Red team (separate pass, 16:45 UTC)
| Sentence | What I opened | Result |
|---|---|---|
| "one customer story, Innov8's" | /resources/tag/case-study, homepage quotes, /about quotes | HOLDS. Three logos exist, so the message says customer story, not customer |
| "your Services page still shows a placeholder quote from a Sarah Johnson" | Playwright render of /services, text visible three times, sitemap lists /services | HOLDS. Not in the nav, so the message doesn't say "your homepage" |
| "taking XMP from telecoms into construction and renewables" | homepage hero, Solar & Storage Live and UK Construction Week posts | HOLDS |
| "who'll want proof from firms like theirs" | inference | Worded as likely |
| Betty Blocks credential | docs/astra-master-context.md 2A, "account selection, messaging and multi-channel outreach; automation-driven revenue workflows covering enrichment, scoring" | HOLDS |
| Stats +45% etc. | rendered, unsourced | Not used, no claim made about them |

## Source list
1. https://xmp.world/ 2. https://xmp.world/services 3. https://xmp.world/case-study/innov8 4. https://xmp.world/resources/tag/case-study 5. https://xmp.world/about 6. https://xmp.world/pricing 7. https://xmp.world/partner 8. https://xmp.world/resources/takeaways-from-connected-britain-2026 9. https://xmp.world/resources/meet-xmp-at-connected-britain-solar-storage-live-2026 10. https://xmp.world/resources/safer-sites-smarter-delivery-xmp-at-uk-construction-week-and-mats-2026 11. https://xmp.world/sitemap.xml 12. https://find-and-update.company-information.service.gov.uk/company/16179678/officers 13. https://find-and-update.company-information.service.gov.uk/company/16179678/persons-with-significant-control 14. https://find-and-update.company-information.service.gov.uk/company/16179678/filing-history 15. https://www.terrapinn.com/conference/connected-britain/2026-Award-Winners.stm 16. https://news.google.com/rss (tools/news.py) 17. https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fxmp.world%2F

## Open questions
What Martin Montgomery runs day to day, and whether XMP already uses a list tool. Whether the shows produced a contact list waiting for follow up.
