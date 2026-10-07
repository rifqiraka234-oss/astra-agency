# b8_claire evidence. Claire Enders CBE, Enders Analysis Limited

Researched 2026-10-06, 19:05 to 19:40 UTC. Read only. Nothing sent, no lemlist writes, no git.

## STOP FLAGS

- Thread: NO STOP. `get_inbox_conversation(ctc_sQPTmkW8KGwkediDD)` returned 0 items, totalItems 0, nextPage null (19:06 UTC, linkedinSync "recent" 18:58). Positive control in the same session: `ctc_27mqQ2pvCXMP3kgJs` (Chris Flood) returned full, totalItems 7. The list endpoint (`sentOnly`, search "Claire Enders") shows only our connect note, `lastSentAt 2026-09-24T05:16:37Z`, preview "Hi Claire, saw your business and thought it was cool 😀 I'm a business owner too! Would love to conn", `lastRepliedAt null`. `myConversations` search returned 0. So she has never replied and we've sent nothing past the connect note. OPENER shape if anything goes.
- Owner: CONFIRMED. Companies House SC170417. She's the sole active director (appointed 5 Dec 1996) and the only active PSC, "Ownership of voting rights 75% or more".
- Not closed: company Active, accounts to 31 Dec 2025 filed 29 Sep 2026.
- Domain: right. endersanalysis.com footer reads "Company Registration Number: SC170417".
- FLAG FOR RAKA: the lemlist record says campaign `cam_PryZp5LuvQv8NznHh` has `"status": "paused"`. CLAUDE.md says v0.1 is the only running campaign. Re-check before any send.
- FLAG: she's a senior public figure (CBE, Fellow of the RTS, gave an IBC 2026 keynote, quoted by the FT and BBC). The brief says a weak angle is worse than none, and nothing below clears that bar.

## Thread
No messages. The connect note from 2026-09-24 appears only in the list preview, not as an activity. She accepted on 2026-10-06 at 14:23 UTC, which matches the list's `lastActivityAt 2026-10-06T14:23:07Z`.

## Record (search_campaign_leads id lea_QpsBog3YHrHe3u6F7)
- jobTitle "Chief Executive Officer". tagline "CEO@ Enders Analysis | Strategic Business Insights in Telecoms, Media & Technology". companyName Enders Analysis, domain endersanalysis.com, 11 to 50 staff, founded 1997, London. No "former" or "ex" anywhere.
- summary (her own words): "Over 160 companies, and all relevant regulators and industry trade bodies subscribe to an endless stream of expert analysis in TMT. The annual conference - Enders TMT Leaders Live - is an annual landmark event." It also lists 140+ charities, The Multibank, the Northwood Trust, the V&A Dundee, the Dundee University Life Sciences labs strategy, Glyndebourne advisor and Freeman of the City Guild of Entrepreneurs.
- Tagline, company and job all agree. Her own site's team page also lists her as "Chief Executive Officer".
- Discrepancy, resolved: mrweb.com (24 Feb 2025) named "CEO Douglas McCabe". Today his name appears nowhere on the site (grep for "mccabe" across all 13 fetched pages returned 0), and the team page lists Claire as CEO. Her CEO title holds as of today.

## Ownership (statutory)
- Overview https://find-and-update.company-information.service.gov.uk/company/SC170417 says ENDERS ANALYSIS LIMITED, Active, incorporated 5 Dec 1996, registered office Whitehall House, 33 Yeaman Shore, Dundee, SIC 70229, previously named CLAIRE ENDERS LIMITED until 11 Jul 2000.
- /officers lists ENDERS, Claire Whitmore as the active Director since 5 Dec 1996, identity verified. Thorntons Law LLP resigned as secretary on 27 Nov 2025.
- /persons-with-significant-control lists Claire Whitmore Enders as active since 6 Apr 2016, "Ownership of voting rights - 75% or more".
- Accounts to 31 Dec 2025 (xhtml filed 29 Sep 2026): "average monthly number of persons (including directors) employed ... 2025 22, 2024 24". Total equity £2,783,032 (prior year £2,059,778). This is for judging only and goes in no message.
- Verdict: she owns it and runs it.

## Prior research
- `grep -w -i enders` over state/ and /tmp/claude-0/agents/ found no queue row and no drafted file. The only hit is her linkedinUrl in /tmp/claude-0/agents/audit/v01.json, a pool list. (A loose "enders" grep only matched the word "renders".) First research ever.

## Website (www.endersanalysis.com, opened 19:08 to 19:30 UTC)
- Stack: `<meta name="Generator" content="Drupal 11 (https://www.drupal.org); Commerce 3">` with a custom `enders_theme`. Drupal 11 came out in 2024, so the site was built or upgraded recently. Not WordPress.
- Crawl pass 1: 150 pages, all 200, 2697 URLs in sitemaps, capped with 6228 queued. Pass 2: 150 pages, same result (pass 2 >= pass 1 holds). 149 of the 150 are /reports/ archive pages going back to 2009. So the nav pages were fetched one by one. Every one returned 200: /about, /about/team, /about/events, /about/vacancies, /reports, /analysts-in-the-media, /subscribers, /contact, /cookie-policy, /terms-of-use, /user/login.
- Nav, from the rendered DOM: Home, About us (Meet the team, Our events, Work with us), Reports, Analysts in the media, Our subscribers, Contact. The Privacy Policy link goes to a Mailchimp hosted PDF (mcusercontent.com/.../Privacy_Notice_Website.02.pdf).
- Desktop screenshot: a serif ENDERS | ANALYSIS wordmark, a pink Contact button, a hero that reads "Rigorous Fearless Independent" over the Thames at dusk, then dark navy cards with dated reports (6 October 2026) and video cards of Claire on Sky News. It looks current and well kept. Phone screenshots (site-audit's and an iPhone profile render) fit the screen. The hero text animates ("Rig", "Fe" captured mid animation). No visual defect seen.
- site-audit: 0 page errors, 1 failed request, no RENDER NOT TRUSTED.
- /about/team says "The team of 30 is led by economists and financial, business and systems' analysts". 17 people are named. Claire O'Brien is "Director of Events & Head of Client Services" and "organises industry-leading events such as our annual TMT conference ... manages our client relationships and business development". Thomas Thomson is Director of Business Development. Katie Woodward is Office Administrator. Niamh Burns is Media Policy Lead and "has led reports on ... AI in the media".
- /about/vacancies: no listing text, just the footer. No open roles.
- /contact: "Subscriptions include: Invitations to our annual conference ... 100-120 research reports distributed direct to your inbox; Access to the full archive of research on our website". It then lists Enhancements, "Calls, meetings and presentations; Advisory and strategic projects on a bespoke and confidential basis". The "Get in touch" button opens a modal form with 7 fields (name, email, company, position, country, telephone, message).
- Report paywall, clicked in Chromium on /reports/mission-possible-skydances-financial-future, "Access report" (/reports/access/5828). It opens the modal "If you already subscribe", with one email field and this text: "Please enter your email address to confirm that you are a subscriber. Then click Email to have it sent to you." There's no login in the nav, though Drupal's /user/login does exist. Each report page shows a free summary, report number (2026-085), authors and sector tags. One sector tag is "AI" (/reports?f[0]=sectors:529).
- /subscribers lists about 170 named organisations, among them Ofcom, CMA, DCMS, the European Commission, BBC, Netflix, Google, Meta, Amazon, McKinsey and JP Morgan.
- Free alerts: a Mailchimp signup on every page ("Enter your email address here to be alerted when we publish a new report").
- Conference site https://enderstmtleaderslive.com/ (linked from /about/events) returns 200, title "Enders TMT Leaders Live 2026: Shaping Digital Futures". It's a static page (links index.html, full-agenda.html, speakers.html, sponsors.html) with a Contentful asset PDF and a Google map. It reads "4th June 2026 | Convene, 133 Houndsditch" with speakers Kate Alessi (Google), Larry Tanz (Netflix), Dame Melanie Dawes (Ofcom), Mike Fries (Liberty Global) and Claire. It has no tickets, no registration and no form. The only contact is mailto:enders@enderstmtleaderslive.com. Attendance comes with the subscription ("Invitations to our annual conference"), so ticketing isn't needed. The June event is still the front page four months later.

## GDPR (EU and UK visitor)
- eu-view.py (Webbkoll, Stockholm, nothing clicked) on www.endersanalysis.com found 6 cookies set before any click: `_hjSessionUser_1714943`, `_hjSession_1714943`, `_gid`, `_gat_UA-19550015-1`, `_ga_CX00MSNWWY`, `_ga`. It recorded 7 third party requests to 5 hosts: region1.google-analytics.com, script.hotjar.com, static.hotjar.com, www.google-analytics.com, www.googletagmanager.com.
- site-audit.js (local Chromium, a separate path from Webbkoll) reported "gdpr banner NONE FOUND [absence, confirmed against a working control] | reject NOT FOUND", "no consent code of any kind in the HTML", and trackers before consent static.hotjar.com, googletagmanager, google-analytics. Its detector control found a banner on the synthetic page, so the absence is real. The two paths agree.
- /cookie-policy is generic template text ("As is common practice with almost all professional websites this site uses cookies"). It names Google Analytics only and says nothing of Hotjar. It tells visitors to disable cookies in their own browser ("it is recommended that you do not disable cookies").
- The privacy notice PDF (3 pages, read with pypdf) never mentions Hotjar, analytics or cookies. It does say "When we process personal data about you, we do so with your consent".
- The conference site set 0 cookies and called fonts.googleapis.com and maps.googleapis.com before any click (Google Fonts loaded remotely).
- Certificates: openssl through the egress proxy shows the proxy's own CA, so that test can't be read. Webbkoll loaded both sites over https with no error. No certificate claim.

## Social (URLs taken from their own HTML)
- LinkedIn company /company/68186 (enders-analysis). social-audit couldn't read it. fetch-walled.py (Chrome) returned 200 and showed "5,296 followers", "View all 30 employees" and post ages of 1d, 4d, 5d, 5d and 1w. The account is active.
- X twitter.com/EndersAnalysis: the bio reads "Market-leading technology, media and telecoms insight since 1997". Follower and post counts are UNKNOWN.
- Vimeo /endersanalysis: 5 followers, 30 videos.
- YouTube link /watch?v=_N7I-NWXQP0 is one video, "Claire Enders: $1 Trillion Spent on European Streaming", apparently on a "Next TMT" channel. Whose channel it is stays UNKNOWN.
- Her personal LinkedIn returned 999 (Firefox) and was unreadable through social-audit. UNKNOWN.

## News (news.py; control 'Tesco' 200 with 102 results; company 50 results; person 31 results)
- 2026-09-29, Campaign UK: "Enders Analysis founder sounds alarm over rise of unregulated TV content". Its source page returned 403 and I couldn't resolve the real URL, so it's a headline only.
- 2026-07-14, ibc.org (opened): her IBC2026 keynote "Too Big to Compete? Media Consolidation in 2026", covering "how media companies are using consolidation, partnerships, acquisitions and divestments to compete".
- 2026-06-05, inpublishing.co.uk (opened): the PPA x Enders report "Humans and Machines: The Everywhere Equation". It says "AI is making trusted editorial brands more important" and "78% of UK adults preferring human-driven content". Claire is quoted: "Trusted media is a fundamental good, built on original work, editorial judgement...".
- 2025-02-24, mrweb.com (opened): "Enders Analysis Research Leader Steps Down". Dr Alice Enders left after twenty years, with no successor named.
- Wayback CDX: web.archive.org reset the connection three times and WebFetch is blocked from it. The control archive.org returned 200. Last redesign date UNKNOWN, though the Drupal 11 generator tag points to 2024 or later.

## LinkedIn routes
1. The /in/ profile curl gave 999. 2. A web search for her name plus the company brought up deloitte.co.uk, show.ibc.org and magnetic.media speaker pages, no posts. 3. A post search found nothing at source. 4. The company page through fetch-walled worked (above). 5. Her own words on the site: the /about and /about/team bios. 6. The lemlist record summary (above).

## Capacity and growth
- Headcount from the register went 24 (2024) to 22 (2025). The site claims "team of 30", LinkedIn shows 30 employees, and 17 are named. No vacancies.
- No funding (a private firm she owns more than 75% of). No new market, product or office found. The research leader left in Feb 2025. Output: report 2026-085 was published on 6 Oct 2026, and the site promises "100-120 research reports" a year.
- It isn't an agency or studio, so Build Squad doesn't apply.

## Process
- A new subscriber fills a 7 field form, then sales follows up (BD director plus head of client services). There's no pricing, trial or self serve. It's a B2B annual contract.
- An existing subscriber enters an email in the access modal and gets the report by email. Being added to the distribution list goes through a 6 field form.
- The 100-120 reports a year go "direct to your inbox". Free alerts run through Mailchimp.
- The conference is invitation only for subscribers, with a mailto contact and no registration flow.
- "Analysts in the media" is a curated feed of press quotes (/analysts-in-the-media returned 200).

## Candidate pains per angle, each with a disproof attempt

**1 Website holding back growth.** The fair candidate is the subscriber journey: no self serve, an email-only report gate, a 7 field "Get in touch" form (/contact and /reports/access/5828, opened 19:2x UTC). Disproof: enterprise research sold to about 170 named organisations (Ofcom, McKinsey, Netflix) is contract and sales led, and the subscription bundles conference invites and analyst calls that can't be bought by card. The site is Drupal 11 with a custom theme and reports dated today, and both screenshots look current. Verdict: weak. A self serve paywall wouldn't fit how they sell.

**2 GDPR (UK and EU view).** This is the strongest on evidence. GA (including a legacy `UA-19550015-1` tag) and Hotjar set 6 cookies before any click. There's no banner. The cookie policy names GA only, and the privacy PDF never mentions analytics or Hotjar. Two independent paths (Webbkoll Stockholm and local Chromium, with a passed control) agree. Disproof attempt: I searched the home HTML for any consent code and found none, and read the cookie policy and privacy PDF in full for Hotjar and analytics, with no mention. It holds. Against it: fixing it is close to the tweak test (a consent setup on a modern Drupal site, an afternoon for their developer). The firm advises Ofcom, the CMA and the European Commission, which makes the finding sharper and also riskier to raise. Pitching a CBE founder on her cookie banner reads as cheeky. Under the four signals rule it's signal 1, but there's no bigger growth story behind it to carry the pitch.

**3 Apps and AI workflows (company and personal).** Candidates: 100-120 reports a year from 17 to 22 people, hand curated media quotes, events run by one director who also heads client services. Disproof: the firm publishes AI analysis itself ("AI" is a sector tag, Niamh Burns leads "AI in the media" reports, and the Tech & media quarterly is titled "The AI fightback begins"). Its public stance is human editorial judgement (her PPA quote, "original work, editorial judgement"). I found no job ad or own words describing manual pain. For the personal angle, her load is visible (140+ charities, Multibank, Northwood Trust, Dundee labs, Glyndebourne), but it's philanthropy and private life. She has an events director, a BD director and an office administrator, so an AI workflow pitch about her week would quote her private commitments back at her. Verdict: not credible from evidence. Pitching AI workflows to a firm that analyses AI for regulators is the "cheeky" outcome the brief warns about.

**4 Social.** LinkedIn is active (posts 1d to 1w old, 5,296 followers). Vimeo has 30 videos and 5 followers, which is small, but video reaches people through press and Sky News appearances. No pain.

**5 Build Squad.** Not applicable. It's a research firm, not an agency or product team, with no hiring.

## The three strongest, ranked
1. GDPR: GA plus Hotjar set 6 cookies before consent with no banner, and the policy doesn't disclose Hotjar (Webbkoll results URL above, site-audit b8_claire.json, /cookie-policy, privacy PDF).
2. Conference site: the 4 June 2026 event is still the only content four months later, with mailto as the only contact (enderstmtleaderslive.com). Small, and not a pain the owner would name.
3. Subscriber journey: no self serve and an email-only access gate (/reports/access/5828, /contact). This fits their sales model, so it's weak.

Researcher's read (the judge decides): NO_STRONG_ANGLE is the honest outcome. The GDPR fact is real, but there's no bigger thing behind it and it would land as a tweak said to a senior figure.

## Source list (opened this session)
find-and-update.company-information.service.gov.uk (search, SC170417 overview, officers, PSC, filing history, 2025 accounts xhtml); endersanalysis.com (/, /about, /about/team, /about/events, /about/vacancies, /reports, /reports/mission-possible-skydances-financial-future, /reports/access/5828, /subscribe_modal/subscribe, /subscribe_modal/our_subscribers, /analysts-in-the-media, /subscribers, /contact, /cookie-policy, /terms-of-use, /user/login, 2 x 150 crawl pages); mcusercontent.com privacy PDF; enderstmtleaderslive.com; webbkoll.5july.net (2 sites); linkedin.com/company/enders-analysis (walled fetch); twitter.com/EndersAnalysis; vimeo.com/endersanalysis; youtube.com/watch?v=_N7I-NWXQP0; ibc.org; inpublishing.co.uk; mrweb.com; news.google.com RSS. That's 13 or more domains.

## Open questions
- Is v0.1 really paused? lemlist says paused.
- The Campaign UK 29 Sep article went unread (403).
- Wayback redesign history is unreachable.
- Her personal LinkedIn posts are UNKNOWN.

Artefacts: b8_claire-desktop.png, b8_claire-phone.png, phone-iphone.png, access-modal.png, conf-desktop.png, b8_claire.json, euview.log, pages/, pass1/, pass2/, acc2025.xhtml, privacy.pdf.
