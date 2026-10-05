<!-- Drafts from the 2026-10-05 evening signals pass (Raka, "are you sure there are no signals... A an app, B a better website"). Nothing here is sent. -->
# Signals pass, 2026-10-05 evening

Signals agents re-ran Jamie Vaughan, Shirah Mansaray, Florent Dal Ben-Salles, Michael Isichei and Bert Christiaens
against two questions, A an app for efficiency and B a website or better website, plus Raka's four standing
signals (build-and-deck.md, 2026-09-19). Each draft then went to a red team.

| Lead | A | B | Outcome |
|---|---|---|---|
| Shirah Mansaray | no | SIGNAL, the Legal Academy CIC (May 2026) has no website | Opener below, red team FIX applied |
| Bert Christiaens | no | SIGNAL, Wallonia expansion, French site 16 pages vs 183 Dutch | Next reply, waits for his answer, kept in /tmp/claude-0/agents/b5_bert/signals.md |
| Michael Isichei | no | weak, GDPR leak and bought theme, pay doubtful | Red team running |
| Jamie Vaughan | no | weak, GDPR leak and no client results | Red team FIX, recommend hold, recheck SH share sub division doc around 12 Oct |
| Florent Dal Ben-Salles | no | no, B2B page exists, rebuilt Apr 2026 | No draft |

### Shirah Mansaray, Themis Crown Legal Academy, ctc_SYhzxxMTBCWtodyt6

Red team fixes applied: "watch one" and "reaching" removed because the filing is a plan, not proof it runs; the
articles' wording no longer quoted back; the word of mouth line no longer claims her network misses them (she is
Vice Chair of a legal mentoring scheme per search results). Flags: naming the Academy shows we read the register;
the food brand credential is a stretch for an education CIC and nothing in 2A fits better.

```gate
lead: Dr Shirah Z Mansaray (register name Zirabamuzale, greeting Shirah), director and member of Themis Crown Legal Academy C.I.C. 17240583 (incorporated 25 May 2026, directors and PSCs Ana Vilhete and Dr Shirah Zirabamuzale) and director and 25 to 50% PSC of Themis Crown Advocates Ltd 15561948, SRA 8008980, ctc_SYhzxxMTBCWtodyt6. lemlist jobTitle "Partner and Co- founder". Thread re-pulled 2026-10-05 ~17:56 UTC, 0 activities, nextPage null, control ctc_bF7KcGsTjT23mo3ye full with 2 sends in the same minute, sentOnly search "Shirah" returns only the 4 Oct "Hi Dr" connect note with lastRepliedAt null, teamConversations "Mansaray" 0, state grep finds only today's NO_STRONG_ANGLE queue row and the batch5 roster line, no send anywhere
site pass 1: 34 pages from the sitemap of https://www.themiscrown.com/ , every page read (pass1/crawl.json, evidence.md section 5), the Academy has no site of its own to crawl, 4 searches and 7 domains checked
site pass 2: 34 pages, second full crawl matching pass 1 (pass2/crawl.json), grepped for academy, masterclass and career with 0 hits, screenshots of home desktop and phone, team and immigration fees, homepage refetched live 2026-10-05 for consent code
deep analysis: The firm site is a clean 2025 Wix rebuild with fee pages per service, Trustpilot quotes and an SRA badge. It serves the law firm and nothing else. The founders' 2026 moves are a non lawyer governance director (21 May), the Legal Academy CIC (25 May) with a filed plan of recorded and live masterclasses, workshops, Q&A sessions, CV coaching, field trips and digital certificates for law graduates from inner city boroughs across England and Wales, and ABS status (6 Jul). Nothing on the web carries the Academy, so the new venture has no front door
owner linkedin: route 1 curl https://www.linkedin.com/in/shirah-z-mansaray 999 (evidence.md). Route 2 web search "Themis Crown Academy masterclass law graduates Ana Vilhete Shirah", the profile title "Dr Shirah Z Mansaray - Themis Crown Advocates" and Ana's profile "Ana Vilhete., EMBA (US/UK)", walled. Route 3 site:linkedin.com "Themis Crown" academy, 0 relevant. Route 4 Companies House officer pages for both companies. Route 5 her own words, the team bio on https://www.themiscrown.com/team and her Calendly event list through the booking API. Route 6 lemlist tagline "Solicitor-Advocate | Partner at Themis Crown Advocates | Coaching Executive Leaders to Their Next Level"
contact linkedin: same person as the owner, the register name Zirabamuzale is tied to Mansaray by the SRA record, the firm's team page and her directorships, same six routes
google news: tools/news.py en, "Themis Crown" 0 results, "Shirah Mansaray" 0, control Tesco 102
regional news: tools/news.py (London) ("social mobility" law graduates training contract), 42 results, 2026-08-31 Non-Billable "Why City law firms are starting the social mobility push before university", 2026-07-15 South West Londoner "London law students call for greater access to the legal profession"
industry news: tools/news.py "social mobility" law graduates training contract, 53 results, 2026-05-22 RollOnFriday "City partner withdraws £75 mentoring after backlash", 2026-05-19 Law Society Gazette "SQE at five", headlines only, used as context for demand, plus the SRA register as the regulator
sources:
1. https://find-and-update.company-information.service.gov.uk/company/17240583
2. https://find-and-update.company-information.service.gov.uk/company/17240583/filing-history (CICINC PDF, pages 17, 35, 36 read)
3. https://find-and-update.company-information.service.gov.uk/company/15561948/filing-history
4. https://find-and-update.company-information.service.gov.uk/company/15561948/officers
5. https://find-and-update.company-information.service.gov.uk/company/15561948/persons-with-significant-control
6. https://www.sra.org.uk/consumers/register/organisation/?sraNumber=8008980
7. https://www.themiscrown.com/team
8. https://www.themiscrown.com/immigration-fees
9. https://www.themiscrown.com/academy (404)
10. https://dns.google/resolve?name=themiscrownacademy.com&type=A (and six more names, NXDOMAIN, control themiscrown.com resolves)
11. https://calendly.com/api/booking/profiles/shirah-mansaray/event_types
12. https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fwww.themiscrown.com%2F
13. https://web.archive.org/web/20241217063251id_/http://www.themiscrown.com/
14. https://uk.trustpilot.com/review/themiscrown.com (evidence.md)
15. https://www.instagram.com/themiscrown.advocates (tools/social-audit.js)
pains: 10 judged. (1) The Legal Academy CIC has a filed plan of recorded and live masterclasses and certificates and no website anywhere, costliest and newest. (2) Its absence, the proof for 1. (3) Her Free Mentoring Session, a clue. (4) ABS licence, disproved as funding. (5) Trackers before consent with no banner on the firm site, real, a toggle on its own and an insult risk. (6) Firm site era, certificate, stack, clean. (7) Dead Calendly link, looping cards, cut copy, stale news, tweaks. (8) Scattered intake, unproven. (9) Headcount growth, unmeasurable. (10) The Academy's sign up and certificate tool, folded into 1
chosen: (1), the costliest and the hottest, a venture registered four months ago whose whole programme (recorded masterclasses, sign up, certificates) needs a place online that doesn't exist, which is a build, not a tweak
sweep website: firm site https://www.themiscrown.com/ crawled twice, 34 pages, a clean 2025 Wix rebuild with tweak level slips only. The Academy has no site at all, 4 searches, /academy 404, 7 domains NXDOMAIN with a resolving control, chosen
sweep gdpr: tools/eu-view.py from Stockholm on https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fwww.themiscrown.com%2F , LinkedIn Insight, Google Analytics and Tag Manager before a click, consentPolicy empty in the live HTML, Wix shop privacy policy, real, kept out of this thread
sweep apps: intake on https://www.themiscrown.com/immigration-fees "mandatory client onboarding process" plus three form types and five Calendly links, cost unproven against 4.5 from 28 on Trustpilot, the Academy's sign up and certificate tool is folded into the website offer
sweep social: tools/social-audit.js on the accounts in the site's HTML, https://www.instagram.com/themiscrown.advocates 304 followers, 206 posts, latest 2026-10-02, Facebook 5, TikTok 65 walled, LinkedIn company walled, no Academy account linked from the firm HTML, captions unreadable so UNKNOWN
sweep squad: a 16 person law firm per https://www.themiscrown.com/team and a new education CIC, no product or build team, Build Squad does not apply
thread: problem the Academy has no website, so law graduates have no way to find the Academy's masterclasses or sign up for one | cost as it opens to graduates across England and Wales, the further it reaches past London the less word of mouth carries it | offer the Academy site that fills the masterclasses | link masterclasses, sign
lead read: Shirah reads that we looked for the Legal Academy and found no website, so graduates can't find its masterclasses or sign up, that word of mouth carries less the further past London it reaches, and gets offered the Academy site that fills its masterclasses, one thread
claims:
Themis Crown Legal Academy exists, https://find-and-update.company-information.service.gov.uk/company/17240583 "THEMIS CROWN LEGAL ACADEMY C.I.C." incorporated 25 May 2026, Shirah a director, rechecked 2026-10-05 ~17:55 UTC
I couldn't find your website, 4 web searches 2026-10-05, https://www.themiscrown.com/academy 404, 0 mentions across 34 crawled pages, themiscrownacademy .com .org .co.uk, themiscrownlegalacademy .com .org .co.uk and academy.themiscrown.com NXDOMAIN on https://dns.google/resolve with themiscrown.com resolving as control, rechecked 2026-10-05 ~18:05 UTC
the Academy's masterclasses (planned activity, the message never says one has run), CIC36 Section B in the incorporation PDF on https://find-and-update.company-information.service.gov.uk/company/17240583/filing-history "Delivering recorded and live masterclasses on UK legal essentials, legal drafting and legal ethics", page 35 read 2026-10-05
law graduates, Articles object 2 on page 17 of the incorporation PDF at https://find-and-update.company-information.service.gov.uk/company/17240583/filing-history "To promote the employability and career development of law graduates and early-career legal professionals", read 2026-10-05
graduates across England and Wales, Articles object 1 on page 17 of the incorporation PDF at https://find-and-update.company-information.service.gov.uk/company/17240583/filing-history "inner-city boroughs across England and Wales", read 2026-10-05, paraphrased so it does not quote her articles back
Instagram and LinkedIn company posts, red team read the 6 newest Instagram captions and about 12 LinkedIn company posts 2026-10-05, none mention the Academy, https://www.instagram.com/themiscrown
recheck: 2026-10-05 ~18:05 UTC, register page, PDF pages 17, 35 and 36, the DNS lookups with control and the /academy 404 all redone this pass, thread re-pulled empty with a full control. Thesis confidence MEDIUM, every fact is statutory or checked with a control, the soft link is whether the Academy is launching now, which the offer lets her answer, and Instagram and LinkedIn posts are UNKNOWN so a sign up link there can't be ruled out
```

OPENER
```
Hi Shirah, saw Themis Crown Legal Academy, looks interesting!

I couldn't find your website, and that leaves law graduates with no way to find the Academy's masterclasses or sign up for one.

Especially, when you are opening the Academy to graduates across England and Wales, the further it reaches past London, the less word of mouth will carry it.

I run Astra agency. We build websites and apps for brands like Unilever, AXA, Pertamina. I built a food brand from zero with my family, so I know a launch only fills when people can find it and sign up in one go.

Shall I send you over what the Academy site that fills your masterclasses looks like?
```
