# Anu Pitman, Anu Pitman Accountancy, ctc_YR7cc276Goo7Fdi2F, lea_56mdqojn2dDp8gMGY

**Shape: NUDGE allowed (one opener, no promise). Verdict: NO_STRONG_ANGLE. No draft.**

## 1. Thread (get_inbox_conversation 2026-10-07 ~06:12 UTC, totalItems 1, nextPage null)
WE SENT A REAL OPENER. NO REPLY. The connect note isn't recorded in this thread.
- 2026-08-31 15:31 ours, "it never shows you're FMAAT and Xero certified, and there's no easy way to book a first call, so
  someone comparing accountants gets no reason to trust you yet and no obvious next step ... want me to send it over?"

## 2. Record and ownership
lemlist: jobTitle "Business Owner", summary "founder of Anu Pitman Accountancy", "FMAAT qualified, ACCA part-qualified, and
Xero certified". /privacy/ "Legal status: Sole trader" (crawled today). Owner. Note, /about/ now says "I'm ACCA qualified"
while her LinkedIn summary says "ACCA part-qualified". Not ours to raise, flagged only.

## 3. Prior research (candidates)
6 Oct nudge KILLED by red team: she sells workflow design, app integrations and dashboards, and Xero shipped a month end agent
in Aug 2026. Brief for this pass: A is out, test the rest.

## 4. The angles
### B. Website for sales or growth
- crawl.py twice: 13 URLs each pass, 6 real pages at 200 (home, about, growth plans, contact, legal, privacy), 7 crawler
  artefacts at 404. All six read.
- site-audit.js: IONOS MyWebsite NOW, 0 page errors, 0 cookies and 0 third parties before a click, banner with Reject.
  Desktop and phone screenshots opened, light blue header, logo, stock photo of hands at a laptop and calculator, headline
  "Accountancy for Growing Businesses in the Scottish Borders", one "Get Started" button.
- Growth: /growth-plans/ now sells three priced plans, "Foundation Growth ... from £350 / month", "Scale-Up Partner ... Built
  for established firms hitting £250k–£750k turnover ... from £750 / month", "Virtual CFO ... scaling past £1M+ ... from
  £1,500 / month". Her Instagram, a post of late September (one of the five newest, all dated 24 Sep to 6 Oct), says
  "Website updated with some exciting new plans!". So she's moving up market right now.
- The gap: no client name, testimonial or review anywhere on the six pages, and a web search for reviews found none. A
  £1,500 a month CFO offer sold from a template page with a stock photo is a real B story.
- Why it still fails. August's message already told her "someone comparing accountants gets no reason to trust you yet".
  "No proof on the site" is the same trust criticism, and RULES 1B says a point ignored once isn't sent again. Adding
  testimonials is also an afternoon in IONOS (tweak test), and as a new 2026 practice she may not have quotable clients yet.
- **Verdict B: real, but a repeat of the ignored August point. Not chosen.**
### C. Personal AI workflow
- Sole trader, does delivery, sales and content herself (Reels posted 24 Sep to 6 Oct), promises "Real availability" and
  on the CFO plan "unlimited email/phone support".
- But she sells "Complete oversight and design of your internal financial workflow", "Advanced apps integrated to sync your
  inventory or CRM", "Custom live dashboards", "Receipt capture apps", she's a Xero and QuickBooks specialist, and her
  pitch is a human you "can actually get hold of". Pitching her automation for her own week runs into the same skip rule the
  red team used. **Verdict C: out.**
### A. Out per the brief.
### D. Social media and branding
- Accounts in her homepage HTML (curl 2026-10-07): instagram.com/apaccountancy, facebook.com/Anupitmanaccountancy,
  linkedin.com/company/anu-pitman-accountancy. (site-audit's rendered pass said "social NONE LINKED", so the links sit in
  markup that doesn't render as anchors. The earlier sweeps missed them for the same reason.)
- Instagram embed 2026-10-07: 89 followers, 31 posts, newest 2026-10-06 21:08 and 20:40 (Reels), 2026-09-29, 09-28, 09-27,
  09-24. Captions are on topic (expenses, VAT threshold and first hire, the new plans) plus one personal weekend post.
  Control mubiscookies.official read in the same session. Facebook 23 followers, dates UNKNOWN. LinkedIn UNKNOWN (wall).
- She posts several times a week. Small audience, but alive and on message, and for a local accountant referrals and
  Google beat Instagram. **Verdict D: active, no costly gap. Not chosen.**

## 5. Judge
| Angle | Proof | Cost | Would she name it | Incumbent | Verdict |
|---|---|---|---|---|---|
| B | new £350 to £1,500 plans, no client proof on 6 pages | real, unquantifiable | maybe | herself, IONOS | No, repeats August |
| C | sole trader doing everything | hours | maybe | she sells workflow design | Out |
| A | out per brief | | | | Out |
| D | 6 posts in 13 days, 89 followers | small | no | herself | No |

**NO_STRONG_ANGLE.** Runner up for Raka, if he wants to override RULES 1B: the up market move (new plans late September)
against a template site with no client proof. I don't recommend it.

## Sources opened today
lemlist thread and record; https://www.ap-accountancy.co.uk/ , /about/ , /growth-plans/ , /contact/ , /legal/ , /privacy/
(x2); instagram.com/apaccountancy/embed; facebook.com/Anupitmanaccountancy; linkedin company page (walled);
linkedin.com/in/anu-pitman-fmaat-218125160 (999); web searches for reviews and for her name (nothing); news.google.com via
tools/news.py (company 0, person 1 unrelated 2018, industry MTD items Small Business UK 2026-09-22, control Tesco 102).
