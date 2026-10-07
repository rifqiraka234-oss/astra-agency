<!-- Four angle re-judge, batch b11_C, 2026-10-07. NOTHING SENT. Re pull each thread and reopen every claim immediately before any send. -->
# Four angle re-judge, b11_C, 2026-10-07

One opener (Systemhaus Hertling). dotega was killed by the red team and gets a sweep. RentX gets a sweep and no draft. Fabien Llobell, Yoeri Sanstra and Ramar Nadar replied to us in August and September, so they were stopped and flagged, no draft.

### Niklas Mocker, dotega, ctc_Wg9Bv7Z7vMqpNQx78

No draft. KILLED by the red team on 2026-10-07, see /tmp/claude-0/agents/b11_C/redteam.md. Evidence /tmp/claude-0/agents/b11_C/niklas_mocker.md.

```sweep
lead: Niklas Mocker, CEO and Co-Founder of dotega GmbH, Stuttgart, ctc_Wg9Bv7Z7vMqpNQx78, lea_4nrkzads8hBRKrfy3, thread re pulled 2026-10-07 06:28 UTC holds only our 2026-07-25 connect note, nextPage null, control ctc_MtGBXP6wEwP95GWdy 4 items the same minute
website: tools/crawl.py read 108 URLs twice on https://www.dotega.de , modern site, magazine posting about three articles a week through 7 Oct 2026, 10 city pages, 42 Google reviews, nothing a rebuild would add, not chosen
gdpr: tools/eu-view.py from Stockholm on https://www.dotega.de , 0 cookies and only Usercentrics and the GTM loader before a click, clean, not chosen
apps: https://www.dotega.de/preise already sells "dotega AI Assistenz" and https://www.dotega.de/leistungen lists AI invoice recognition, they build AI themselves with in house developers, not chosen
social: Instagram https://www.instagram.com/dotega.de/embed/ re read 2026-10-07, 168 followers, 7 posts, newest 2026-09-17, Facebook 65 followers via tools/social-audit.js, so the gap is real, but https://www.dotega.de/karriere names "Jan · Chief Marketing Officer" who "verantwortet das Marketing bei dotega" and "entwickelt Kampagnen", an incumbent owns the channel and chose search, email and webinars, so the pitch would criticise their CMO and the cost can't be shown, not chosen
squad: https://www.dotega.de/ueber-uns says developers in a team of 13 and https://www.dotega.de/karriere hires only a customer support role, no build capacity gap, not applicable
verdict: NO_STRONG_ANGLE, the prior verdict stands. Every angle is either already built in house or owned by a named CMO, and no source shows WEG owners choose a provider on Instagram
```

### Noah Hertling, Systemhaus Hertling, ctc_ch3vFcKAkjQdMKDCg

Social and branding angle (D) for a new local service firm. Evidence /tmp/claude-0/agents/b11_C/noah_hertling.md. Flag for Raka, a one person UG from April 2026, budget is the risk.

```gate
lead: Noah Hertling, Geschäftsführer of Systemhaus-Hertling UG (haftungsbeschränkt), Reinbek, ctc_ch3vFcKAkjQdMKDCg, leadId lea_tuhwBfjkSfYhxquPt. https://systemhaus-hertling.com/impressum/ "Vertreten durch Geschäftsführer: Noah Joel Hertling", Amtsgericht Lübeck HRB 27513 HL. North Data page for HRB 27513 HL opened via tools/fetch-walled.py, Musterprotokoll filings 16 Mar and 9 Apr 2026. lemlist jobTitle "Geschäftsführer", tagline "Geschäftsführer bei Systemhaus-Hertling UG". Thread pulled 2026-10-07 about 06:15 UTC, 0 items, nextPage null, control ctc_MtGBXP6wEwP95GWdy 4 items the same minute. sentOnly search Hertling 1 hit, our connect note 2026-09-07, lastRepliedAt null. Queue rows BLOCKED (wrong person, superseded) then NO_STRONG_ANGLE, no SENT row
site pass 1: 13 URLs by tools/crawl.py with the WordPress sitemaps on https://systemhaus-hertling.com , every page text read
site pass 2: 13 URLs, second full crawl equal to pass 1, site-audit.js render trusted with 0 failed requests, desktop and phone screenshots opened, a clean navy and teal WordPress site with a status card hero
deep analysis: A one person IT firm registered in spring 2026 selling network setup, support, cloud and security to small firms in Hamburg and around. The site is new and tidy but carries no proof at all, no client, no case, no photo and no name outside the Impressum, the contact form opens the mail program. The Google listing reads no reviews, the LinkedIn page has one follower, no social account is linked. For a firm that sells ongoing support, the first clients decide everything and nothing yet tells a Hamburg business owner why to pick him
owner linkedin: route 1 curl https://www.linkedin.com/in/noah-hertling-7a507130a 999. Route 2 web search "Systemhaus-Hertling" OR "Systemhaus Hertling" Reinbek, no result for the firm at all, only directories. Route 3 company page https://www.linkedin.com/company/systemhaus-hertling-ug-haftungsbeschr%C3%A4nkt via tools/social-audit.js, 1 follower, IT Services and IT Consulting. Route 4 Google Maps render, the listing exists. Route 5 his words on https://systemhaus-hertling.com/ueber-uns/ . Route 6 lemlist record and North Data
contact linkedin: same person as the owner, Impressum and lemlist agree, same six routes
google news: tools/news.py de, "Systemhaus Hertling" 0, "Noah Hertling" 0, control Volkswagen 100
regional news: tools/news.py (Reinbek OR Glinde OR Stormarn) IT-Dienstleister Mittelstand, 0 results
industry news: tools/news.py IT-Dienstleister Mittelstand, 43 results, CRN DE 2026-07-30 on Systemhäuser and the Mittelstand investment backlog, digitalbusiness CLOUD 2026-06-16 on stagnating demand
sources:
1. https://systemhaus-hertling.com/
2. https://systemhaus-hertling.com/leistungen/
3. https://systemhaus-hertling.com/ueber-uns/
4. https://systemhaus-hertling.com/kontakt/
5. https://systemhaus-hertling.com/impressum/
6. https://www.northdata.com (Systemhaus-Hertling UG, HRB 27513 HL)
7. https://www.google.com/maps/search/IT%20Systemhaus%20Reinbek (Chromium render)
8. https://www.google.com/maps/search/Systemhaus%20Hertling%20Reinbek (Chromium render, pin on Birkenweg)
9. https://www.linkedin.com/company/systemhaus-hertling-ug-haftungsbeschr%C3%A4nkt
10. https://www.linkedin.com/in/noah-hertling-7a507130a (999, walled)
11. https://webbkoll.5july.net (tools/eu-view.py on https://systemhaus-hertling.com)
12. https://news.google.com/rss (tools/news.py, company, person, region, industry, control)
13. https://www.google.com/maps/search/IT%20Service%20Hamburg%20kleine%20Unternehmen (Chromium render, peers)
pains: 5 judged. (A) AI workflow for his support, fails, no client or volume fact and he sells IT setup himself. (B) website, a new tidy site, the leftovers (Hello world, Sample Page, mailto form) are afternoon fixes, folded in as symptoms only. (C) personal AI, fails, no day job or second business visible. (D) being found and chosen, Google listing with no reviews where every Reinbek peer has a rating, LinkedIn page with one follower, no client or person on the site, CHOSEN. (E) Build Squad, one person, nothing to staff
chosen: (D), the costliest for him right now, because a new support firm lives on its first clients and every proof surface a Hamburg buyer checks is empty
sweep website: tools/crawl.py read 13 URLs twice on https://systemhaus-hertling.com , new tidy WordPress site, no client, case or person named outside the Impressum, Hello world and Sample Page live, folded into the offer
sweep gdpr: tools/eu-view.py from Stockholm on https://systemhaus-hertling.com , 0 cookies, only fonts.googleapis.com and fonts.gstatic.com, a remote fonts tweak, not chosen
sweep apps: https://systemhaus-hertling.com/leistungen/ sells support and documentation of every change but no client or volume fact, he sells IT himself, not chosen
sweep social: tools/social-audit.js on https://www.linkedin.com/company/systemhaus-hertling-ug-haftungsbeschr%C3%A4nkt 1 follower, site-audit.js found no social account linked against its control, Google Maps render lists the firm with no reviews while IT-Reinbek 5,0, Base2 4,7, Sellenschlo 5,0 and RA-MICRO 4,0 show ratings, CHOSEN
sweep squad: one Geschäftsführer per https://systemhaus-hertling.com/impressum/ , no vacancies, no backlog, not applicable
thread: problem the Google listing has no reviews, the LinkedIn page one follower and the homepage names no client | cost Hamburg firms comparing IT partners pick the ones that show proof | offer the Hertling online presence that wins Hamburg clients | link Hamburg, client
lead read: Noah reads that a Hamburg firm checking him finds no reviews, one LinkedIn follower and no client on the site, so it picks someone who shows proof, that as a new firm each of those is ongoing support he never gets to quote, and gets offered the online presence, website, Google profile and LinkedIn, that wins Hamburg clients, one thread
claims:
your Google listing has no reviews yet, https://www.google.com/maps/search/IT%20Systemhaus%20Reinbek Chromium render of "IT Systemhaus Reinbek" 2026-10-07 about 06:45 UTC, "Systemhaus-Hertling UG (haftungsbeschränkt) Keine Rezensionen IT-Berater · Birkenweg 18", pin confirmed on a second render of "Systemhaus Hertling Reinbek"
your LinkedIn page has one follower, https://www.linkedin.com/company/systemhaus-hertling-ug-haftungsbeschr%C3%A4nkt via tools/social-audit.js 2026-10-07, "1 follower"
your homepage names no client, https://systemhaus-hertling.com/ both crawls and the desktop and phone screenshots, no client, logo, case or testimonial, and none on /leistungen/ or /ueber-uns/ either
ongoing support, https://systemhaus-hertling.com/leistungen/ "als laufende Betreuung kombinieren"
new firm, register filings 16 Mar and 9 Apr 2026 on https://www.northdata.com (HRB 27513 HL), © 2026 on https://systemhaus-hertling.com/
Eten Maar credential, https://www.linkedin.com/in/raka-mulya-b92885196 and docs/astra-master-context.md section 2A, CEO and CMO 2020 to 2024, "Founded and scaled a stroopwafel brand from zero with five relatives"
recheck: every claim reopened 2026-10-07 06:15 to 07:00 UTC and to rerun before any send (thread, Maps render, LinkedIn page, homepage). Every fact is proven at source, the risk is budget for a one person UG with its VAT number still pending, confidence MEDIUM
```

OPENER
```
Hi Noah, saw Systemhaus Hertling, looks interesting!

However, your Google listing has no reviews yet, your LinkedIn page has one follower, and your homepage names no client. This causes Hamburg firms comparing IT partners to go with the ones that show proof.

Especially, when you are winning your first clients as a new firm, the business that signs with someone else is ongoing support you'll never get to quote.

I run Astra agency. We build branding and websites and social media management for brands like Unilever, AXA, Pertamina. I built a stroopwafel brand from zero with my family, so I know how a new name earns its first customers.

Shall I send you over what the Hertling online presence that wins Hamburg clients looks like?
```

### Mushtaq Taher, RentX Rewards, ctc_a5ZNoyKHLFEhjudiu

No draft. Evidence /tmp/claude-0/agents/b11_C/mushtaq_taher.md.

```sweep
lead: Mushtaq Taher, CEO and Founder of RentX Rewards Limited, ctc_a5ZNoyKHLFEhjudiu, lea_disrW5ypcBp7fchKK, thread 2026-10-07 holds only our 2026-07-30 connect note, also Managing Director of Nixacom, which sells AI onboarding and credit tools to West African banks per his lemlist summary
website: tools/crawl.py read 150 URLs on https://rentxrewards.com , helplines on https://rentxrewards.com/en/contact still read +880 1700-000000 and +880 9600-000000, but https://digitomark.com/portfolio/rentx built the brand and site, an edit for the incumbent, not chosen
gdpr: site-audit.js on https://rentxrewards.com/en found no consent code, 0 cookies and no tracker before a click, a Bangladesh consumer market where the EU view does not apply, not chosen
apps: Nixacom sells AI onboarding and credit infrastructure per the lemlist summary and tools/news.py (We are Tech 2026-05-07), an owner who sells AI is skipped for A and C, and Dcastalia built the app
social: tools/social-audit.js on the four accounts in their HTML, Facebook https://www.facebook.com/rentxrewards/ 15,529 followers, Instagram 1,108 followers 179 posts newest 2026-09-29 posting every two to five days with 0 comments on the newest six, YouTube 18 videos 2 subscribers, Android 100+ downloads with 289 installs on https://play.google.com/store/apps/details?id=com.rentxrewards.prod , the closest angle but LOW, Facebook post engagement is behind the login and the August 2026 Mutual Trust Bank partnership means users may pay through the bank, so installs undercount users
squad: https://digitomark.com/portfolio/rentx built the brand and website and Dcastalia built the app, so outside builders already cover the work and no capacity gap is visible, not applicable
verdict: NO_STRONG_ANGLE, social is active rather than dead, the one gap (content without engagement) can't be judged on the channel that matters in Bangladesh, Facebook, so confidence stays LOW and nothing is shown
```
