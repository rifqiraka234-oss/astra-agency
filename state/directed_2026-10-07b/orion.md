# Orion Dai Yuhui, Omnilabs Research Ltd 16176116, Omnihuman, ctc_JiMGgwH639YbSSZfE, lea_kxtJHsgdRbhkg5pW6. Directed angle b14_B, 2026-10-07

Read only. Nothing sent, no lemlist writes, no commit. Opened 2026-10-07 between 17:08 and 18:00 UTC.

## STOP FLAGS

- Thread, ONLY OUR CONNECT NOTE. get_inbox_conversation(ctc_JiMGgwH639YbSSZfE) returned 1 item, totalItems 1, nextPage null, sync "recent" 17:08:07Z. 2026-07-29 02:34 UTC, us to him, "Hi Orion, saw your business and thought it was cool 😀 I'm a business owner too! Would love to connect and share ideas! ☺️". No reply. Positive control ctc_ch3vFcKAkjQdMKDCg returned its 2 known items (connect note 1 Oct, opener 7 Oct) in the same minute. myConversations "Orion" 0. Shape OPENER.
- Activities (GET /api/activities leadId): linkedinInviteAccepted 2026-07-29 02:34:40Z, then a campaign step linkedinWithdrawInvitationDone 2026-08-16. The withdraw ran after the accept, so it should be a no op, but confirm he is still a 1st degree connection before sending.
- Owner check. lemlist jobTitle "Co-founder & CEO", seniority "Ownership / Firm Leadership". Companies House 16176116 (opened today) lists him as active director since 8 Apr 2025, resident in Singapore. **The only PSC is Lucie Legrandois, 75% or more of shares** (notified 10 Jan 2025). So he is co-founder, CEO and director, not a majority holder. Passes the brief's "co-founder or CEO" bar.
- **INCUMBENT, stronger than the prior note said.** Footer "Made by Blurry Works". Blurry Works Instagram caption (re read today via /embed/captioned) "We've started an ongoing partnership with @omnilabsresearch ... Our first piece of work for them defines the brand, digital identity and web design ahead of the team introducing Omnihuman more widely." And Orion's own post on the company LinkedIn page (raw HTML read today) says the mixed reality tool shown at the Apple Developer Centre was "developed in collaboration between Omnilabs Research and Blurry Works". Blurry holds web design AND co built the product software. The website half of the offer competes with a close partner.
- Regulatory. Omnihuman is not CE marked yet (digitalhealth.london, 10 Nov 2025, next steps clinical evaluation, QMS, CE marking). Pre market promotion of a medical device has limits, so the "sign up" in the offer must be interest registration, never a sale.

## Evidence, live today

| Fact | Source |
|---|---|
| One page Webflow site, crawl pass 1 = 1 page, pass 2 = 1 page, nav anchors only #hero #problem #product #team #contact | tools/crawl.py, raw HTML hrefs |
| The asks on the page: contact form (name, email, message) beside "Contact us to register your interest to join our clinical trials", and "Book a 30min session with the team to chat about collaboration or participation in trials" linking calendly.com/talk-to-omnihuman/30min | https://omnilabs-research.com/ HTML |
| No waitlist, sign up, newsletter, pricing, partner, NHS, hospital or insurer words in the HTML. Positive control, the same grep found "Makerversity" 1 and "Blurry" 2 | grep on the saved HTML |
| Screenshots opened. Desktop, clean modern hero "mixed reality rehabilitation", pixel hand, blue Book a Call pill. Phone stacks cleanly. 0 page errors, render trusted, no banner, 1 cookie, no trackers, no consent code | site-audit.js |
| Product used "in hospital and home settings" with a clinician progress dashboard, SaMD, CE marking next | https://digitalhealth.london/radiant-cersi-innovator-support-programme-omnilabs-research-accelerates-regulatory-roadmap-through-expert-led-support |
| "Our vision for 2030, to see 100,000 stroke survivors across the UK, EU, and Singapore using Omnihuman for self-administered rehabilitation, bridging in-patient and out-patient care" | Orion's post, reposted on https://uk.linkedin.com/company/omnilabs-research (raw HTML) |
| "70% of the surveyed participants would want to purchase Omnihuman when it becomes commercially available" | same page, his Chapter 1 post |
| Venture Café London showcase on "continuity of care from hospitals to homes, and in enhancing Clinician's productivity in Clinical settings" | same page |
| Two interns joined two months ago, Clinical Research and Design Engineering ("bringing Omnihuman units from design through manufacturing") | same page |
| LIHE MedTech Venture Builder cohort 3, Foundation Stage, "clinical, regulatory, ethical, funding, and investor insights" | same page, repost |
| Instagram 58 followers, 7 posts, newest 2026-05-29 (131 days). LinkedIn company 524 followers. Control getbaked.berlin 96 followers, newest 2026-09-22 | tools/social-audit.js |
| News, company 2, person 5, region 76, industry 100, control Tesco 103 | tools/news.py en |

## Who the buyer is, from their own material

Two sides. The rehab team (clinicians and the hospital to home pathway, "Clinician's productivity", the progress dashboard, "bridging in-patient and out-patient care") and the stroke survivor at home ("70% ... would want to purchase"). Who pays is not stated anywhere they publish (no NHS, insurer or price on any page). The message names rehab teams only, because that is the side their site has nothing for, and it never names a payer.

## Judge table, versions of the directed angle

| Version | Proof | Cost to them | Would he name it | Incumbent | Verdict |
|---|---|---|---|---|---|
| A launch site for rehab teams and survivors, plus an AI sales workflow that finds, scores and approaches rehab teams | Site is one page with trial and collaboration asks only. The 2030 goal spans three countries and two settings | Every rehab team for the rollout found one by one, two founders and two interns (inference from size) | Likely, the goal is his own post | Blurry on the site half, nobody visible on the sales half | **CHOSEN**, costliest, it sits on his stated 2030 goal |
| B trial recruitment workflow | Contact form plus Calendly for trials | Small volume, recruitment runs through clinical partners (S3 Lab collabs per prior evidence) | Maybe | Clinical partners | smaller |
| C insurer or NHS buyer pages | No payer named anywhere | Unknown, no payer evidence | No | Blurry | unproven, dropped |
| D site only | One page | A tweak for Blurry Works | No, his partner built it | Blurry | fails the incumbent check |

## Inference used (worded as likely, never as seen)

- "At your stage most of that is found one rehab team at a time." Clues, company incorporated 10 Jan 2025, 2 to 10 staff on LinkedIn, two founders plus two interns, no sales hire visible, the 2030 three country goal.

## Red team

1. "one page" reopened, crawl x2 and the raw hrefs, holds.
2. "contact form and call link ask about trials and collaboration", reopened, the form sits under "register your interest to join our clinical trials" and the call is for "collaboration or participation in trials". Their verbs kept, holds.
3. "no page made for rehab teams and nothing to sign up for". Tried to disprove, grep for waitlist, sign up, newsletter, clinician page, hospital, partner, all 0 with the control matching. The contact form could carry a message, so the draft says "nothing to sign up for", not "no way to contact". Holds.
4. "stroke survivors across the UK, EU and Singapore" is his own 2030 post, reopened in raw HTML. Number left out per the numbers rule. Holds.
5. Killed in the red team, an earlier block two said the survivors also had no page made for them. False, the homepage speaks to them ("Omnihuman unlocks your full rehabilitation potential, from home"). Cut to rehab teams only.
6. Blurry risk. Block two is factual about the stage, it doesn't call the site bad. Still a partner made it, so it may be forwarded to them. Flag kept.
7. Credential, Betty Blocks GTM workflows covering enrichment, scoring, routing and follow up, docs/astra-master-context.md 2A. "found, scored and followed up accounts" matches.

Confidence MEDIUM. Facts hold, the cost is inference, and the site half collides with Blurry Works.

## Sources (12, 8 domains)

1. https://omnilabs-research.com/ (curl, crawl x2, site-audit.js, both screenshots)
2. https://find-and-update.company-information.service.gov.uk/company/16176116 and /officers, /persons-with-significant-control, /filing-history
3. https://digitalhealth.london/radiant-cersi-innovator-support-programme-omnilabs-research-accelerates-regulatory-roadmap-through-expert-led-support
4. https://uk.linkedin.com/company/omnilabs-research (raw HTML, posts)
5. https://www.instagram.com/omnilabsresearch/ (social-audit.js)
6. https://www.instagram.com/p/DYXbjt1jNSE/embed/captioned/ (Blurry Works caption)
7. https://calendly.com/talk-to-omnihuman/30min (href only)
8. https://prototypesforhumanity.com/en/prototypes/omnihuman (template only, nothing readable)
9. https://www.hra.nhs.uk/.../development-and-initial-testing-of-an-innovative-rehab-portable-device (ruled out, a UWS study, not theirs)
10. news.google.com RSS via tools/news.py (company, person, region, industry, control)
11. lemlist record lea_kxtJHsgdRbhkg5pW6, thread, activities
12. https://www.linkedin.com/in/orion-d-4338ab166/ (curl 999)
