# NOT SENT. Approved by Raka 7 Nov, 'Send tomorrow morning all', scheduled Sun 8 Nov 07.34 Amsterdam.

Approved text from state/drafted_2026-11-07-openers-review-2.md, Ilan section, copied out of the file by script with only the four space markdown indent removed (REPLY, so the "looks cool" rule doesn't apply). This replaces state/drafted_2026-11-07-reply-ilan.md, the plain reply, which must never be sent as well.

Thread pulled 2026-11-07 13.41 UTC with tools/lemlist.py, control ctc_ch3vFcKAkjQdMKDCg 9 items ok, ctc_9DbLn6rNaGTgnyHGN 2 items, both THEM 2026-11-07 12.13 "Hi" and "How are you", nothing from us. Inbox listing (198 conversations) shows him once, turn US. Contact record shows one campaign, cam_xFYYBzvfSHk83epvw, lea_xfGxJYi4zmjub4GWo. State files grep on name, company, contactId, leadId, the LinkedIn slug and the domain, no SENT row, the queue's latest row is REPLY_DRAFTED (the plain reply, never sent), the other hits are the 7 Nov drafts, logs/inbox/2026-11-07-1256-inbox-check.md and base64 noise in a prototype file.

### Ilan Oxman, Aerials Amsterdam, ctc_9DbLn6rNaGTgnyHGN

> Flags. (1) Ownership. Aerials Amsterdam is a trade name of Aleph Consulting B.V., KVK 88730840 (the site's terms and privacy pages), and KVK confirms that B.V., registered 27 Dec 2022 at Derkinderenstraat 47 Amsterdam, activity an ICT consultancy. The free KVK view shows no director, and no free register tied the B.V. to Ilan (OpenCorporates and Oozo don't name him). Him as founder rests on the site, the about page "founded by Ilan Oxman", his teacher page "Founder & Aerial Silks Instructor" and the 8 Jun 2026 post "Meet Ilan Oxman, Founder of Aerials Amsterdam". An ICT consultancy B.V. fits his lemlist tagline as a Senior Product Manager, an inference. (2) He has a day job in product (tagline), and the 8 Jun post says he "stepped back from regular teaching" and is "mainly focused on running the gym". (3) Aerials already sells through Airbnb Experiences (a hen party experience), Expedia (a beginner class) and Urban Sports Club, all seen only as search results (tier G), none of them a team day channel for companies.

```gate
lead: Ilan Oxman, lemlist jobTitle "Founder & Head teacher", tagline "Senior Product Manager | AI & Contact Center Products | ... | B2B SaaS", Amsterdam, contact record read 2026-11-07 13.41 UTC. KVK, Aleph consulting B.V. 88730840, Besloten Vennootschap, registered 2022-12-27, Derkinderenstraat 47 1062DA Amsterdam, read with node tools/kvk-search.js 2026-11-07 with the control Sagapo Coffee 98234374 returned in the same call ("Aerials Amsterdam" itself returns three unrelated businesses). The site says "Aerials Amsterdam is a trade name of Aleph Consulting B.V." and names Ilan as founder on three pages. ctc_9DbLn6rNaGTgnyHGN, lea_xfGxJYi4zmjub4GWo, cam_xFYYBzvfSHk83epvw. Thread 2 items (his "Hi" and "How are you"), control 9
site pass 1: 89 URLs, tools/crawl.py on https://www.aerials.amsterdam, 35 from the sitemaps, all 200, every page read (home, about, teachers and 8 teacher pages, the class pages for silks, hoop and sling, absolute beginners, try aerial, teens in EN and NL, workshops, open training, pricing, group events, hen party, kids parties EN and NL, private lessons, studio rental, FAQ, terms, privacy, blog with 18 posts and the tag pages)
site pass 2: 89 URLs, tools/crawl.py again, 85 at 200 and 4 at 429, the 4 (studiorental, one teacher page, two tag pages) refetched one by one at 200, same URL set as pass 1. Plus site-audit.js on /group-events (guard quiet) desktop and phone screenshots opened, a white Wix page in the red Aerials brand, "Private events & parties", the "team outing" line, a red CONTACT US button and a group photo on silks, the cookie banner at the foot
deep analysis: an aerial arts gym in Amsterdam West (Studio Sloterdijk, Kabelweg 22, 5.7 metre ceilings, 8 rigging points), founded 2013 as a weekly workshop, 8 teachers on /teachers. Revenue lines from its own pages, drop ins and class packs (trial 18 €, 10 classes 200 €), memberships from 75 € a month, private lessons 120 €, studio rental 25 to 55 € an hour, kids parties, hen parties, teen courses and group events. /group-events, "team outing", "Perfect for ... Team building & corporate outings", "Cost €25 per person (minimum 5 person bookings)", "Maximum 20 people per booking", and a "Request a group lesson" form. Corporate wording appears on 1 of the 89 pages, /group-events, against the control "Groups & Parties" in the nav on 85. No page for companies, no list of company clients. INFERENCE, the team outing line is filled by whoever happens to find the group page
owner linkedin: Route 1 https://www.linkedin.com/in/ilanoxman curl 301 to the authwall, /recent-activity/all/ 301. Route 2 web search "Ilan Oxman" Aerials Amsterdam founder product manager, nothing about him. Route 3 KVK, Aleph consulting B.V., no officer in the free view. Route 4 the site's founder post https://www.aerials.amsterdam/post/meet-ilan-oxman-founder-aerials-amsterdam dated 2026-06-08. Route 5 the lemlist record. Route 6 Instagram https://www.instagram.com/aerials_amsterdam/ through social-audit.js
contact linkedin: same person as the owner, the lemlist jobTitle "Founder & Head teacher" and the site's about, teacher and founder pages agree on the person
google news: tools/news.py nl 2026-11-07, company "Aerials Amsterdam" 1 hit, De Orkaan 25 Oct 2025 on a Zaanse aerial athlete, not about them, person "Ilan Oxman" 0 hits, control Heineken 60, so the empty result counts
regional news: tools/news.py (teamuitje Amsterdam bedrijfsuitje 2026) x (teambuilding bedrijfsuitjes trends), 8 hits, DagjeWeg Amsterdam workshops agenda (19 Jun 2026), JAN Magazine and Harper's BAZAAR uitagenda, background only
industry news: tools/news.py teambuilding bedrijfsuitjes trends, 7 hits, Dutchcowboys "Dit is de trend in bedrijfsuitjes in 2025" (17 Mar 2025), Papendal "Events in 2026, 4x de belangrijkste trends" (2 Dec 2025), Stad + Groen on green company outings (16 Aug 2025), plus the trade press by name (Dutchcowboys, Papendal events), background only
sources:
1. https://www.aerials.amsterdam/group-events
2. https://www.aerials.amsterdam/about-us
3. https://www.aerials.amsterdam/teachers/ilan-oxman
4. https://www.aerials.amsterdam/post/meet-ilan-oxman-founder-aerials-amsterdam
5. https://www.aerials.amsterdam/terms-and-conditions
6. https://www.aerials.amsterdam/pricing
7. https://www.aerials.amsterdam/studiorental
8. https://www.kvk.nl/zoeken (tools/kvk-search.js, KVK 88730840)
9. https://www.instagram.com/aerials_amsterdam/
10. https://www.facebook.com/AerialsAmsterdam/
11. https://www.tiktok.com/@aerials.amsterdam
12. https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fwww.aerials.amsterdam%2Fgroup-events
13. https://news.google.com/rss (tools/news.py)
14. https://opencorporates.com/companies/nl/88730840 (no officer named, not used for ownership)
15. https://urbansportsclub.com/en/venues/aerials-amsterdam-cla (search result only, tier G)
pains: 4 judged. (1) a team building and corporate outings offer for up to 20 that only waits for companies to find the group page, CHOSEN, Raka's angle. (2) social, Instagram 2,756 followers, 430 posts, latest 1 Nov, Facebook 1,447, active, not a pain. (3) website, a busy Wix site with full pricing and forms, it works, a look job at most. (4) GDPR, a Wix banner with Decline All, from Stockholm 5 first party cookies before a click, checked, never the angle
chosen: (1), biggest, one company team day of 20 at 25 € each is 500 € in an afternoon against an 18 € trial, and it's the outreach angle Raka picked
owner reply: "We get our groups through Airbnb and the hen party page" | a model, not a gap | those channels sell hen parties and single classes to individuals, and the only corporate wording on 89 pages is the group events line with a request form, https://www.aerials.amsterdam/group-events
worth: €3,000+, an AI powered outreach flow, a list of Amsterdam HR and office managers planning team days, personal outreach with the studio and the group offer, and booked group sessions
still there: the founder post dated 2026-06-08 says he is "mainly focused on running the gym", and Instagram posted 1 Nov 2026 | https://www.aerials.amsterdam/post/meet-ilan-oxman-founder-aerials-amsterdam
budget: a B.V. with 8 teachers, its own rigged studio and paid memberships | https://www.aerials.amsterdam/teachers
variant: REPLY, outside the A/B test
sweep website: crawled twice, 89 URLs each, site-audit.js screenshots of /group-events opened, a working Wix site with prices and forms, not chosen
sweep gdpr: site-audit.js GEO VOID (Google consent mode), tools/eu-view.py from Stockholm 5 first party cookies before a click and Wix, Sentry and Google hosts, banner with Decline All, checked, never the angle (RULES 0E)
sweep apps: classes, memberships and rentals already book online, groups by request form, no manual job described beyond that (crawl of 89 URLs), the outreach flow is the chosen build
sweep social: tools/social-audit.js, Instagram https://www.instagram.com/aerials_amsterdam/ 2,756 followers 430 posts latest 1 Nov 2026, Facebook 1,447 followers with post dates behind the login, TikTok 121 followers walled, active, not chosen
sweep squad: a gym B.V. with no tech team or job posts on the site (crawl of 89 URLs), nothing to staff, not chosen
thread: problem the group events page sells team building and corporate outings for up to 20 but waits to be found | cost Amsterdam companies planning a team day never think of an aerial class | offer an AI powered outreach flow that finds Amsterdam companies planning team days and gets the group sessions in front of them | link group, Amsterdam companies
lead read: Ilan reads that his group events page already sells team building for up to 20 but companies rarely think of aerial, then gets offered a flow that finds Amsterdam companies planning team days, one thread
claims:
your group events page already sells team building and corporate outings, https://www.aerials.amsterdam/group-events "Perfect for ... Team building & corporate outings" and "Cost €25 per person (minimum 5 person bookings)"
for up to 20 people, https://www.aerials.amsterdam/group-events "Maximum 20 people per booking"
Aerials Amsterdam is in Amsterdam, https://www.aerials.amsterdam/group-events "Studio Sloterdijk Kabelweg 22 1014 BB Amsterdam"
INFERENCE, Amsterdam companies planning a team day likely never think of an aerial class unless someone shows them, worded likely, rests on corporate wording on 1 of 89 pages https://www.aerials.amsterdam/group-events
recheck: every claim reopened 2026-11-07 13.53 UTC with a live fetch of /group-events ("Team building & corporate outings", "Maximum 20 people per booking", "Request a group lesson", "Kabelweg 22" all present). Disproof tried, searched all 89 pages for corporate, company, bedrijf and team building and found only /group-events, and searched the web for a company or team day listing of theirs and found only Airbnb (hen party), Expedia (beginner class) and Urban Sports Club (classes), none aimed at companies. Thread still only his two messages at 13.41 UTC. Facts hold, ownership rests on the site plus the KVK entity, confidence MEDIUM
```

REPLY
```
Hi Ilan, doing well, thanks! How about you, how's Aerials Amsterdam going?

I had a look, and your group events page already sells team building and corporate outings for up to 20 people. Amsterdam companies planning a team day likely never think of an aerial class unless someone shows them.

I'd suggest an AI powered outreach flow that finds Amsterdam companies planning team days and gets your group sessions in front of whoever organises them.

Shall I send you a sketch of the flow for Aerials?
```
