# NOT SENT. Approved by Raka 7 Nov, 'Send tomorrow morning all', scheduled Sun 8 Nov 07.34 Amsterdam.

Approved text from state/drafted_2026-11-07-openers-review-2.md, Dominic section, copied out of the file by script with only the four space markdown indent removed. It already reads "looks cool." with a full stop, so no change was needed.

Thread pulled 2026-11-07 13.41 UTC with tools/lemlist.py, control ctc_ch3vFcKAkjQdMKDCg 9 items ok, ctc_dMJAtuzQC4dJL3f5A 0 items. Inbox listing (198 conversations) has no second contact for Ingleby or Coupe. Contact record shows one campaign, cam_7gnHSf6GvvGy8gH3n, lea_T8AE265PqvE3dnDQm. State files grep on name, company, contactId, leadId, the LinkedIn slug and the domain, no SENT row, only the queue (UNRESEARCHED) and the 7 Nov review file.

### Dominic Ingleby, Coupe, ctc_dMJAtuzQC4dJL3f5A

> Flags. (1) The Corporate Events "contact us" button on /services emails contact@coupevents.co.uk, one "e" short. That domain is NXDOMAIN on Google and Cloudflare DNS, while coupeevents.co.uk resolves with an Outlook MX, so a company using that button gets a bounce. It supports the angle and isn't in the message, but Raka may want to tell him on the call. The Spritz and Brand buttons use the right address. (2) The homepage and /services link Instagram to the bare instagram.com/squarespace placeholder, and only /about links the real coupedrinksmcr. (3) Dominic also holds a job, Operations Director at Battambang, Astoria and Loft Social (lemlist tagline), and became director of a second company, INGLEBY HOSPITALITY LTD, on 9 Sep 2026. Coupe has three equal owners, so Niall Peters or Florence Morgan may read it too. (4) The company is nine months old (incorporated 3 Feb 2026).

```gate
lead: Dominic Ingleby, lemlist jobTitle Co-Founder, tagline "Operations Director at Battambang + Astoria + Loft Social | Co-Founder at Coupe", Manchester, contact record read 2026-11-07 13.41 UTC. Companies House COUPE EVENTS LTD 17010331, active, incorporated 3 February 2026, SIC 56210 event catering, registered office 19 Blenheim Avenue Manchester M16 8JT (his own correspondence address). Officers, INGLEBY Dominic James, active director since 3 Feb 2026, identity verified, plus MORGAN Florence Isobel F and PETERS Niall John. PSC register, all three hold more than 25% but not more than 50% of shares and votes. The site ties to the company by domain and email, contact@coupeevents.co.uk. ctc_dMJAtuzQC4dJL3f5A, lea_T8AE265PqvE3dnDQm, cam_7gnHSf6GvvGy8gH3n. Thread 0 items, control 9
site pass 1: 6 URLs, tools/crawl.py on https://www.coupeevents.co.uk, 4 from the sitemap, all 200, every page read (home, /page which mirrors home, services, about, contact). Five unique pages, the whole site
site pass 2: 6 URLs, tools/crawl.py again, all 200, plus site-audit.js on /services and / (0 failed requests, guard quiet) desktop and phone screenshots opened, and render-via-curl.js on / (two full page parts opened). Services, a black Squarespace page, "Corporate Events & Weddings" in a large serif, the price list and one CONTACT US button. Home, the logo over a video our Chromium can't play (H.264, RULES 1C, not a finding), CONTACT US, four photos, a clients carousel (TOPSHOP, THG, DEPT and more), then "let's collaborate" with an enquiry form (name, email, "I'd Like A Bar For", guest count, message)
deep analysis: a nine month old Manchester mobile cocktail bar company run by three directors. Three offers on /services, Corporate Events & Weddings ("weddings, summer socials, Christmas parties", cocktails from 10.00, non alc from 6.00, bar hire 500.00), a Spritz Bar (bar hire 500.00) and Brand Events ("engaging clients & teams", "get in touch and we'll tailor a quote"). Every offer ends in a mailto "contact us". The only other route is the homepage enquiry form and the email address. No shop, booking calendar or checkout (/shop, /store, /book and /booking all 404, /cart is Squarespace's empty default, the sitemap lists 4 URLs). Clients shown, TOPSHOP, THG and DEPT. INFERENCE, the company work arrives only when a company already knows Coupe exists and writes in
owner linkedin: Route 1 https://www.linkedin.com/in/dominic-ingleby-b6427b158 curl 301 to the authwall, /recent-activity/all/ 301. Route 2 web search "Dominic Ingleby" Coupe Manchester cocktail, nothing about him. Route 3 Companies House, director and PSC of COUPE EVENTS LTD and director of INGLEBY HOSPITALITY LTD 17448858 since 9 Sep 2026. Route 4 tools/news.py "Dominic Ingleby", 10 hits, none about him (the actor Lee Ingleby, Ingleby Barwick). Route 5 the lemlist record and tagline. Route 6 Instagram https://www.instagram.com/coupedrinksmcr through social-audit.js
contact linkedin: same person as the owner, the lemlist record, the tagline "Co-Founder at Coupe" and the Companies House officer and PSC entries agree
google news: tools/news.py en 2026-11-07, company "Coupe Events" OR "Coupe drinks" Manchester 0 hits, person "Dominic Ingleby" 10 hits none about him, control Tesco 102, so the empty result counts
regional news: tools/news.py (Manchester Christmas party bookings 2026) x (mobile cocktail bar corporate events UK), 4 hits, Secret Manchester New Year's Eve parties (30 Dec 2025), I Love Manchester on Soho House and hidden bars, background only
industry news: tools/news.py mobile cocktail bar corporate events UK, 24 hits, Bar Magazine "The Rise of Pop-Up Cocktail Experiences: How Mobile Bars Are Transforming Events" (28 Feb 2025), The Argus on a cocktail company hiring mixologists for parties and events (26 Oct 2026), The Spirits Business, plus the trade press by name (Bar Magazine, The Spirits Business), background only
sources:
1. https://www.coupeevents.co.uk/services
2. https://www.coupeevents.co.uk/
3. https://www.coupeevents.co.uk/about
4. https://www.coupeevents.co.uk/contact
5. https://www.coupeevents.co.uk/sitemap.xml
6. https://find-and-update.company-information.service.gov.uk/company/17010331
7. https://find-and-update.company-information.service.gov.uk/company/17010331/officers
8. https://find-and-update.company-information.service.gov.uk/company/17010331/persons-with-significant-control
9. https://find-and-update.company-information.service.gov.uk/officers/1DUK9uJD854H-ec-gobNUSvIr44/appointments
10. https://www.instagram.com/coupedrinksmcr
11. https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fwww.coupeevents.co.uk%2F
12. https://dns.google/resolve?name=coupevents.co.uk&type=MX
13. https://news.google.com/rss (tools/news.py)
14. https://www.addtoevent.co.uk/suppliers/coupe (a different Coupe, Yorkshire, Seki Lynch, per the search result, page didn't render for curl, tier G, not theirs, not used)
pains: 4 judged. (1) a corporate and Christmas party offer that only waits for companies to write in, with no outbound channel to Manchester companies, CHOSEN, Raka's angle. (2) website, a stylish Squarespace site whose corporate mailto points at a domain that doesn't exist and whose Instagram link is the Squarespace placeholder, both small fixes, proof points only. (3) social, Instagram 363 followers, 28 posts, last post 6 Aug 2026 (93 days, dormant), a branding job, smaller. (4) GDPR, no banner and no consent code, cookies from Stockholm 4 with Typekit and Google fonts, never the angle
chosen: (1), hottest and biggest, it's November and Manchester companies are booking Christmas parties now, and one corporate party or brand event is worth more than a single private booking, and it's the outreach angle Raka picked
owner reply: "We already work with THG and DEPT" | already in hand | those clients came to them, the site's only routes are the mailto buttons and the enquiry form and nothing reaches a company that hasn't heard of Coupe, https://www.coupeevents.co.uk/services every offer ends "contact us"
worth: €3,500+, an AI powered outreach flow, a list of Manchester office managers, HR and event leads, personal outreach with the THG and DEPT work, and booked Christmas parties and brand events
still there: Companies House lists Dominic James Ingleby as an active director and PSC of COUPE EVENTS LTD, read 2026-11-07 | https://find-and-update.company-information.service.gov.uk/company/17010331/officers
budget: company clients THG, TOPSHOP and DEPT on the homepage, three directors, a professional photo shoot (CocktailsJune2026_JodyHartley image files) | https://www.coupeevents.co.uk/
variant: B, matches the contactId, and the draft names the AI powered outreach flow so it sits outside the A/B test by the 4 Nov rule
sweep website: crawled twice, 6 URLs each, site-audit.js and render-via-curl screenshots opened, a stylish young Squarespace site, a mistyped corporate mailto and a placeholder Instagram link, small, not chosen
sweep gdpr: site-audit.js no banner and no consent code against its control, tools/eu-view.py from Stockholm 4 cookies with Typekit and gstatic, no privacy link, checked, never the angle (RULES 0E)
sweep apps: three directors, one offer menu, enquiries by mailto and form, no manual job described on the site (crawl of 6 URLs), the outreach flow is the chosen build
sweep social: tools/social-audit.js, Instagram https://www.instagram.com/coupedrinksmcr 363 followers 28 posts latest 6 Aug 2026 (dormant 93 days), the only real account, linked from /about only, not chosen
sweep squad: a three director drinks company with no tech team or job posts on the site (crawl of 6 URLs), nothing to staff, not chosen
thread: problem the services page sells Christmas parties and corporate events but only waits for companies to write in | cost Manchester teams booking Christmas drinks now go elsewhere | offer an AI powered outreach flow that finds Manchester companies planning Christmas parties and corporate events | link Christmas, corporate
lead read: Dominic reads that his services page sells Christmas parties and corporate events but waits for companies to find Coupe, while Manchester teams book now, then gets offered a flow that finds those companies, one thread
claims:
your services page sells Christmas parties and corporate events, https://www.coupeevents.co.uk/services "Corporate Events & Weddings" and "weddings, summer socials, Christmas parties"
every one waits for a company to find you and get in touch, https://www.coupeevents.co.uk/services every offer ends in a mailto "contact us" or "get in touch", and https://www.coupeevents.co.uk/ has only the enquiry form and email, no shop or booking route (/shop, /book, /booking 404, sitemap of 4 URLs)
Coupe is in Manchester, https://find-and-update.company-information.service.gov.uk/company/17010331 registered office Manchester M16 8JT, and the Instagram handle coupedrinksmcr linked from https://www.coupeevents.co.uk/about
INFERENCE, Manchester teams are likely booking their Christmas drinks right now, the season and the Christmas parties offer on https://www.coupeevents.co.uk/services, worded likely
recheck: every claim reopened 2026-11-07 13.53 UTC with a live fetch of /services ("Corporate Events & Weddings", "Christmas parties", "contact us", "get in touch" all present). Disproof tried, looked for any instant route a company could book without writing in, a shop, a calendar, a checkout or a booking page (sitemap, /shop, /store, /book, /booking 404, /cart the empty default), a listing of theirs on a booking marketplace (the Add to Event "Coupe" is a different Yorkshire business), and a booking link on Instagram (bio not readable, UNKNOWN). None found. Facts hold, the one inference is worded likely, confidence MEDIUM
```

SKETCHB
```
Hi Dominic, Coupe looks cool.

However, your services page sells Christmas parties and corporate events, yet every one waits for a company to find you and get in touch. Manchester teams are likely booking their Christmas drinks right now.

I'd suggest an AI powered outreach flow that finds Manchester companies planning Christmas parties and corporate events and gets Coupe's bar in front of whoever's organising them.

Shall I send you a sketch of the flow for Coupe?
```
