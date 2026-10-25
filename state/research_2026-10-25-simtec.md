# Research notes, Joseph O'Sullivan, Simtec (SIMTEC CONSULT LTD), ctc_MaBhm5iEM4BSse4Pp, 25 Oct 2026

Raka's angle call, 25 Oct, word for word: "modern website that has more sales. This is such a powerpoint website".
Researched 25 Oct 2026, 13.18 to ~14.40 UTC. Evidence folder
/tmp/claude-0/-home-user-astra-agency/24052593-7323-58b2-9e3f-744f7080d43c/scratchpad/leads/simtec/
(crawls pass1, pass1b, pass2, pass2b, raw pages, renders, the hero video and its frames, the gov.uk provider list,
the 2026 accounts, the LinkedIn company page text, lemlist raw responses).

## The angle in plain words

Simtec is a small Cardiff software firm that builds data systems for construction and waste. Since Digital Waste
Tracking became law for waste receiving sites on 1 October 2026, Simtec has been selling waste tracking software on
LinkedIn, and it's on Defra's official list of compatible software providers with two products, Juno and Simtraca.
Its website still says "Construction Management Software" with five bullet points and never mentions Juno, Simtraca
or waste tracking. A waste site picking a provider from Defra's list and clicking through to Simtec probably can't
tell what it sells. Raka's "powerpoint website" read holds, and the sales cost is concrete and current.

## Step 1, the thread

`python3 tools/lemlist.py thread ctc_MaBhm5iEM4BSse4Pp` at 13.18 UTC, control ctc_ch3vFcKAkjQdMKDCg 6 items ok,
Joseph 0 items, all pages. The conversation list (2 pages, 174 conversations) scanned for "ullivan", "simtec" and the
contactId, 0 hits, control Noah Hertling found in the same scan. The contact record lists one campaign only,
cam_iDMXXfaWWg8RkgHpi "W4 TEST 50 Owners of growing agencies and tech firms, Build Squad", leadId lea_HgP3wckGeqzCBC8uZ,
leadStatus "LinkedIn invite accepted". Repo grep, only state/next_batch_ranked.md (rank 1), the queue row
RESEARCH_QUEUED of 25 Oct, and state/people_db_test50_2026-10-05.json (an older test list, leadId lea_uQZqPcupmR5FxwfJf,
same LinkedIn URL, no thread under it seen in the inbox scan). No SENT row anywhere.

## Step 2, the person

- lemlist lead export (W4, state linkedinInviteAccepted): jobTitle "Founder & Managing Director", companyName Simtec,
  companyDomain simtecconsult.com, tagline "What if your software actually worked?", companyFoundedOn 2021,
  companyEmployeeCount 17, Cardiff. Tagline and company agree, no "former" or other employer.
- Companies House, SIMTEC CONSULT LTD 13710785, incorporated 29 Oct 2021, active, SIC 62012 and 62020, registered
  office Illtud House, Station Road, Llantwit Major CF61 1ST (the same address as the site's footer).
  https://find-and-update.company-information.service.gov.uk/company/13710785/officers read 25 Oct ~13.20 UTC.
  O'SULLIVAN, Joseph, active director since 28 Jan 2022, identity verified 20 Mar 2026 (Joseph Dominic O'Sullivan).
  Other directors Andrew Brooks (since 1 Feb 2022) and Andrew John Weedy (since 3 Feb 2023, Leeds address). Rhodri Rhys
  Williams incorporated it and resigned as director 3 Feb 2023.
- PSC, Mr Joseph O'Sullivan, active since 1 Feb 2022, more than 25% but not more than 50% of shares and votes, and the
  right to appoint or remove directors.
  https://find-and-update.company-information.service.gov.uk/company/13710785/persons-with-significant-control
- The company's own About page, "Joseph O'Sullivan Managing Director" (https://simtecconsult.com/about/, read 25 Oct).
- A post of his from the last three months, Simtec's LinkedIn page reposted his post 5 days ago, "At Simtec, we're
  incredibly proud to sponsor Wales Rugby League", and 2 weeks ago "Simtec are proud sponsors of Cardiff Demons RLFC"
  (https://uk.linkedin.com/company/simtec-software, read in Chromium 25 Oct).
- Verdict, still MD and co-owner. Note, lemlist says Founder, the register shows Rhodri Williams incorporated it and
  Joseph joined as director three months later. He's the MD and a 25 to 50% owner, which is what matters.

## Step 3, the site

- site-audit.js, title "Homepage - Simtec - Construction Management Software", WordPress 7.1.3, Elementor and
  WPBakery, obelisk theme, AIOSEO. RENDER NOT TRUSTED, 8 of 12 failed assets served fine directly. So the site-audit
  screenshots were not used.
- The firewall. Every response carries `server: cloudflare` and `x-stackprotect-id`, StackPath's firewall. It refuses
  our requests with an empty 403 at random, then lets the same URL through on a retry. Every 403 in this research is
  ours, never theirs. Retried with 12 second gaps up to 8 times.
- render-via-curl.js, desktop, 146 requests served by curl, 0 curl errors, 0 undecoded images, all their own requests
  under 400. Split into 4 parts, all opened. Phone (390 wide), 146 served, 0 curl errors, two Lottie files refused 403
  (SimtecApp.json, customer-support-chat-1.json, the firewall again, the desktop run loaded the app animation), 5 parts,
  first two opened.
- What a visitor sees, home. "Construction Management Software." then five bullets (Strengthen decision making, Improve
  data sharing, Ensure compliance, Mitigate risk, Enhance profitability) and FIND OUT MORE. Behind it, a background
  video, hosted on staging.simtecconsult.com, 18 seconds, 720x540, H.264 (downloaded on the 4th try, frames tiled and
  looked at): a man watching a trading chart, an aerial earthworks site, a man in hi vis with a tablet by a digger, a
  scientist at a microscope, laptops with charts. Our Chromium can't play H.264, so the renders show the teal low poly
  fallback. The message says nothing about the hero's look. Then "6 reasons why you should install a Simtec solution in
  your business" with an app animation and six icon blocks (Made-to-measure, Multi-platform, Standardisation,
  Geo-location, Reporting & analytics, Single source of truth). Then "A pain-free methodology for all" with five step
  tabs. Then "Industry Feedback", two quotes (Luke Robinson, Costain Group, SMP Alliance; Jonathan Evans, Jacobs). Then
  "Book your free consultation today!" form (name, phone, email, message). Footer "© 2022, simtecconsult.com Website
  designed and built by Roddy.digital".
- Nav from the HTML, Home, Services, About, Testimonials, Contact, and "speak to us" to /contact/. No product page, no
  case study page, no pricing, no blog of their own, no outbound link to any product or app (every href on all five
  pages listed).
- Dates from their own schema. Home published 2022-07-01, modified 2024-02-18. Services modified 2026-03-31. About
  2025-08-12. Testimonials 2024-03-27. Contact 2026-07-27. So the design is from 2022 and they keep editing it.
- Products. Valitrack is named 12 times, only on /testimonials/ (Hydrock, Kier and HS2, CGL, Waste Assess, Costain,
  Jacobs), "Valitrack automated materials management solution". Juno and Simtraca appear nowhere on the site.
- Absence checks, raw HTML of the five pages and the 28 sitemap pages that loaded: juno 0, simtraca 0, "waste tracking"
  0, "transfer note" 0. Positive controls in the same pass, Valitrack 12 and waste 9 on /testimonials/, DoWCoP 1 on the
  home. Second method, Chromium rendered text (curl served, JS run, innerText plus textContent) on home, services and
  about, juno 0, simtraca 0, waste tracking 0, control DoWCoP 2 and Costain 2 on the home. Testimonials and contact
  rendered in pass 2, testimonials juno 0, simtraca 0, waste tracking 0 with controls Valitrack 24 and waste 18
  (innerText plus textContent counts each twice), contact all 0. Pass 2 refetched the 33 sitemap URLs (29 at 200),
  so 34 distinct live pages were read across both passes (5 real, 21 demo posts, 8 demo categories), 0 hits on all.
  Four demo posts were refused by the firewall in both passes and never read.
- Pass 2 screenshots, render-via-curl.js of /services/ desktop and phone and of the Porsche demo post desktop (lorem
  ipsum, author Rhodri Williams, 14 Feb 2022), all opened. A few of their images and animations were refused to us by
  the firewall in these runs, so no visual finding is drawn from those gaps.
- Recheck 14.20 UTC, home 200, same title and hero, juno 0, simtraca 0, waste tracking 0, gov.uk row unchanged,
  control example.com 200, thread re pulled 0 items with control 6.
- Theme demo content left live. post-sitemap.xml (fetched on the 6th try) lists 25 posts, all ThemesCamp demo posts
  ("1968 Porsche 911 Full Restoration Process", "Top 10 Iconic Muscle Cars of All Times", "Hello world!", lorem
  ipsum posts, an "Addiction When Gambling Becomes" demo post listed on the category pages, "Copyright 2022 by
  ThemesCamp" in the post footer), 20 of 25 loaded at 200 and carry the title "... - Simtec - Construction Management
  Software". category-sitemap.xml lists 8 demo categories (classic, edge-case-2, lifestyle, medical, usa-event, blog,
  wordpress, uncategorized), all 8 at 200. page-sitemap.xml refused 403 every time (ours). An afternoon's clean up,
  proof for the sketch, never the angle.
- The About page lists Rhodri Williams as Director. He resigned as a director on 3 Feb 2023 but LinkedIn still lists
  him among Simtec's employees, so he may work there in another role. Andrew Weedy (director since Feb 2023) isn't on
  the page. Not used.
- staging.simtecconsult.com is public, title "Simtec Consult – Digital. Simply Transformed.", uploads only up to
  2022/07, the old Wellington Street Cardiff address, "© 2022 ... Roddy.digital". An older copy, not a new site in
  progress.
- simtraca.com and simtraca.co.uk resolve and show only a parking lander (/lander). simtraca.com was registered on
  17 Jul 2026 at 123-Reg (RDAP). Nothing ties the domains to Simtec, so they're never mentioned, but it's the one sign
  a product site could be planned. Flagged.

## Step 4, social, tools/social-audit.js, all URLs from their own HTML

- LinkedIn https://www.linkedin.com/company/simtec-consult/ (redirects to /company/simtec-software, the page lemlist
  holds), 1,943 followers, "Software for construction data management. Everything you need in one easy-to-use system",
  17 employees listed, posts weekly. The October posts are about Digital Waste Tracking. 3 weeks ago, "As of yesterday,
  Digital Waste Tracking became a legal requirement for permitted and licensed waste receiving sites across England and
  Wales ... At Simtec, we're building waste management software around that principle". 2 weeks ago, "Digital Waste
  Tracking is here ... At Simtec, we build waste management systems around the way your business already works ...
  helping automate the reporting required for Digital Waste Tracking ... drop us a message". 2 months ago, "A Waste
  Transfer Note shouldn't disappear into an inbox". Specialties include "waste" and also "wesites, seo, digital ads,
  content creation ... marketing, and branding".
- Instagram https://www.instagram.com/simtecconsult/ 5 followers, 13 posts, newest 2022-04-12, dormant.
- Facebook https://www.facebook.com/simtecconsult, login wall, unknown.
- X https://twitter.com/simtecCONSULT, bio "Helping the construction sector to streamline its data management through
  the automation of software."

## Step 5, news and the market

- tools/news.py en, "Simtec Consult" 0, "Joseph O'Sullivan Simtec" 0, "Simtec Cardiff" 0, "Joseph O'Sullivan Cardiff
  Demons" 0, control Tesco 102 both runs.
- Regional, (Cardiff OR Wales) (digital waste tracking) 80, Herald.Wales 16 Oct, letsrecycle 16 Oct on Wales DRS
  contracts, MRW 1 Oct "Digital waste tracking requirements launch in England and Wales". (Wales) (construction
  software) 44, nothing on Simtec.
- Industry, digital waste tracking 100, Circular Online 22 Oct "Digital waste tracking: six practical steps for
  receiving sites" (opened, "demonstrate a representative day using examples relevant to your operation" is how sites
  are told to judge providers), Portsmouth News 19 Oct, a rival waste solution rolled out across the UK, letsrecycle
  1 Oct "Digital Waste Tracking goes live". construction software 100, Access Construction agentic AI, RIB Unify.
- gov.wales, "Operators of waste receiving sites must use the Digital Waste Tracking System from 1 October 2026", API
  primary, temporary spreadsheet until October 2027 (https://www.gov.wales/mandatory-digital-waste-tracking-system,
  updated 30 Jun 2026).
- Defra digital blog 28 May 2026, "around 12,000 permitted waste receiving sites that will need to use the digital
  waste tracking service in October 2026", operators' experience is "entirely mediated by the software vendors they
  already use".
- gov.uk "Report receipt of waste: choose a software provider", last updated 23 Oct 2026, 238 providers in the table,
  "The software providers listed below have self-certified that their software complies with the digital waste tracking
  requirements", row "Simtec Consult Limited | Juno and Simtraca". Read by curl and again by WebFetch.
- A rival on the same list, First Mile's Miley page, names the product, shows it in a GIF "in action", and asks "See
  Miley in action, book a live demo" (https://www.thefirstmile.co.uk/the-big-picture/miley-the-waste-tracking-software).
- Circular Online 2 Feb 2026, phase two (carriers, brokers, dealers) mandatory October 2027.
- Statutory accounts to 31 Mar 2026 (filed 13 Jul 2026), average 4 people employed including directors (3 the year
  before). Kept out of every message (RULES 3). LinkedIn's 17 counts everyone who lists Simtec.

## The pain table

| # | Pain | Proof | Cost to him | Current | Pay test | Verdict |
|---|---|---|---|---|---|---|
| 1 | The site sells "Construction Management Software" in five bullets and never names Juno, Simtraca or waste tracking, while Simtec sits on Defra's list of 238 providers that about 12,000 receiving sites choose from | Home HTML and renders, 0 hits on 34 pages raw and the 5 real pages rendered, with controls, gov.uk row, LinkedIn posts | Receiving sites comparing providers likely skip a vendor whose site doesn't show the product, now and again for carriers and brokers in Oct 2027 | Hottest, law since 1 Oct, list updated 23 Oct | Yes, a product led site is €4,000+ | CHOSEN, Raka's angle |
| 2 | 25 theme demo posts and 8 demo categories live under the Simtec title | post-sitemap.xml, 20 posts at 200 | Credibility with a buyer who finds one | Old | No, an afternoon | Proof for the sketch only |
| 3 | About page lists a director who resigned in 2023 and leaves out a current one | About page, Companies House | Small | Old | No | Not used, he may still work there |
| 4 | Instagram dormant since April 2022, 5 followers, linked in the footer | social-audit.js | Small, buyers are on LinkedIn where Simtec posts weekly | Old | No | Not chosen |
| 5 | GDPR, Google Analytics and Tag Manager before any click, no banner, no privacy link | site-audit.js, eu-view.py from Stockholm, 4 GA cookies, 8 third party hosts | A fix, never the angle | Ongoing | No | Sweep only (RULES 0E) |
| 6 | Build Squad, a 4 person firm (accounts) building for a market of 12,000 sites now and more in 2027 | accounts, Defra blog | Capacity, unproven, no job ads found | Possible | Maybe | Later, not the first message |
| 7 | AI workflow for their own sales or admin | nothing visible in their material | none proven | no | no | Not chosen, they build software themselves |

## The owner's reply test

- Their likely no, "Our waste tracking clients come through LinkedIn and conversations, the website isn't where we
  sell." A model, not a gap. Against it, they listed Juno and Simtraca on Defra's public list that receiving sites choose
  from, the LinkedIn page's Website field sends people to http://simtecconsult.com, and the home asks every visitor to
  "Book your free consultation today!" yet names neither product. So the site is part of how new buyers judge them.
- Just built, no. Home published 2022-07-01 per its own schema, footer "© 2022 ... Roddy.digital".
- Not theirs, no. Defra's row names "Simtec Consult Limited", the only active Simtec Consult at Companies House, and
  Simtec's own LinkedIn says it builds the Digital Waste Tracking software.
- Removed on purpose, no. Juno and Simtraca appear on none of the 34 live pages read, and not on the 2022 staging home
  page either (Valitrack 4, juno 0, simtraca 0, waste 0), so there's no sign they were ever on the site and taken off.
- Already in hand, the open risk. No new site on staging, the live pages were edited in March and July 2026 without
  adding either product, simtraca domains park only. A Simtraca site could still be planned. Flagged to Raka.
- "My developers can build that." Simtec is a software house with a marketing manager on the About page and websites in
  its LinkedIn specialties, though its own site was built by Roddy.digital. Flagged.

## Budget sign

Sponsors Wales Rugby League and Cardiff Demons RLFC (his posts reposted by Simtec, 5 days and 2 weeks ago), named
enterprise users Costain, Jacobs, Kier and HS2, a marketing manager on the About page. Caution, the accounts show an
average of 4 people including directors, so pitch the €4,000 end, not more.
