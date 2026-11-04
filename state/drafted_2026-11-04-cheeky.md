# Opener, 2026-11-04. Cameron Young, Cheeky Charging. NOT SENT.

Raka, 3 Nov, on the GTM angle draft, "At Astra agency we build websites and AI workflows for brands like Unilever, AXA,
Pertamina. delete / the ai powered outreach flow", then 4 Nov "yeah do it and send today". Credential line removed on his
word. His contactId draws arm A of the opener test, so with no credential line this one is logged outside the test.

### Cameron Young, Cheeky Charging, ctc_jFXCMdHuM4mXHr6t2

> Flags. (1) Cheeky Charging Ltd, 15348193, incorporated 13 Dec 2023, Cameron Malcolm Young sole Active Director, the
> press page gives the same number. Bootstrapped, "We're small, we build fast, and we're bootstrapped". (2) The homepage
> map is a static image (assets/london-map.jpg), sample data, never quoted. The real proof is the case studies page, 40+
> live venues, £8k+ commission paid this year, Bluebird Café, BFI Southbank, Mercato Metropolitano. (3) Budget is the soft
> spot, a bootstrapped two role team, the €500 start fits. (4) Their press page says they're "building AI-native
> operations from day one", so an AI powered flow speaks their language.

```gate
lead: Cameron Malcolm Young, founder and sole Active Director of CHEEKY CHARGING LTD, 15348193, incorporated 13 December 2023, SIC 77299, 128 City Road London (https://find-and-update.company-information.service.gov.uk/company/15348193/officers read 2026-11-04). About page "Cheeky Charging Ltd was founded in 2024 by Cam Young", press page "Cam Young Founder & CEO" and "Company number 15348193". lemlist jobTitle Founder, tagline "Founder, Cheeky Charging | Portable phone chargers in UK venues | We're hiring", Ealing. ctc_jFXCMdHuM4mXHr6t2, W1b, accepted 3 Nov 19.53 UTC. Thread 0 items, control 8
site pass 1: 12 URLs, tools/crawl.py on https://cheekycharging.com (10 from the sitemap), all 200, every page read (home, venues, case studies, about, press, support, careers with both role views, terms, privacy, cookies)
site pass 2: 12 URLs, tools/crawl.py again, all 200, plus site-audit.js desktop and phone screenshots opened, a modern pink and navy site, and the homepage link map read, eight menu links ("For venues", "Venue login", "Work for us", "About", "Case studies", "Press", "Help & FAQ", "See how it works for venues") carry no href while the pages exist at /venues, /about and the rest
deep analysis: a UK power bank rental network. Customers rent from a station in a venue, first 5 minutes free, £3 for 30 minutes, £8 daily cap, no deposit, return anywhere. Venues pay nothing, "100% free for venues", "Revenue on every charge", "No lock-in", branded units, live in five minutes. The venue page says "The power bank rental market is crowded" and competes on no £20 deposit and price matching. The case studies page says "We've paid commission to more than 40 UK venues" and "40+ live venues · £8k+ paid in commission this year", naming Bluebird Café (since May 2025), BFI Southbank and Mercato Metropolitano. Careers lists a Venue Sales Lead in London or Manchester, "£14 an hour + commission on every venue you win and keep", "Sign up bars, pubs, clubs, gyms, hotels and events", "You can walk into a bar and start a conversation", and a Venue Operations Runner in London. The homepage asks "Nothing near you yet? Tell us where we should be next". INFERENCE, growth is venue count, venues are won by walk ins, and a station is only useful to customers when others sit nearby, so the order venues get signed in matters
owner linkedin: Route 1 https://www.linkedin.com/in/cam-young walled. Route 2 Google News "Cameron Young" 60, all the golfer, never used. Route 3 Companies House, sole director. Route 4 the about and press pages, founder and CEO. Route 5 the company LinkedIn https://il.linkedin.com/company/cheekycharging through social-audit.js, unreadable. Route 6 the lemlist record
contact linkedin: same person as the owner, the register, the press page and the lemlist record agree
google news: tools/news.py en 2026-11-04, "Cheeky Charging" 3 hits, none about them, "Cameron Young" 60 about the golfer, control Tesco 102
regional news: tools/news.py (London bars phone charging) x (power bank rental UK), 11, Consegic power bank rental market report (23 May 2024), Money Saving Expert free phone charging (22 Jul 2021)
industry news: tools/news.py power bank rental UK, plus competitor coverage found in search, ChargedUp in Stonegate pubs (Morning Advertiser 16 Apr 2019) and O2 Academy venues, opened only as background, not in the message
sources:
1. https://cheekycharging.com/
2. https://cheekycharging.com/venues
3. https://cheekycharging.com/case-studies
4. https://cheekycharging.com/about
5. https://cheekycharging.com/press
6. https://cheekycharging.com/careers
7. https://find-and-update.company-information.service.gov.uk/company/15348193/officers
8. https://www.instagram.com/cheekycharging
9. https://il.linkedin.com/company/cheekycharging
10. https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fcheekycharging.com
11. https://news.google.com/rss (tools/news.py)
pains: 4 judged. (1) a crowded market where new venues are won by someone walking into each bar, while the app only helps customers where stations cluster, CHOSEN. (2) eight dead menu links including "For venues", real but a ten minute fix, out (RULES 0E). (3) social, Instagram 245 followers with no posts, small next to (1). (4) GDPR, a banner with a reject, 0 cookies before a click, never the angle
chosen: (1), biggest, venue count is the whole business and it's the GTM angle Raka picked
owner reply: "We've got a sales lead walking the bars already" | true, that's the point | the flow fills that rep's day with venues that already said come by, around the stations they have (https://cheekycharging.com/careers "You can walk into a bar and start a conversation")
worth: €4,000+, an AI powered outreach flow, a ranked list of bars, gyms and hotels around the live stations in London and Manchester, personal outreach with the free unit offer, and booked visits for the sales lead
still there: Cameron sole director on the officers page read 2026-11-04 | https://find-and-update.company-information.service.gov.uk/company/15348193/officers
budget: 40+ live venues and £8k+ commission paid this year, bootstrapped | https://cheekycharging.com/case-studies
variant: B, by Raka's edit (credential line removed), though variant_for gives A, so it's logged outside the A/B test
sweep website: crawled twice, 12 URLs, screenshots opened, modern, eight dead menu links are a small fix, not chosen
sweep gdpr: site-audit.js found a banner with a reject against its control, tools/eu-view.py from Stockholm 0 cookies, checked, never the angle (RULES 0E)
sweep apps: they run their own app and an "AI-first live chat" per https://cheekycharging.com/press, the outreach flow is the chosen build
sweep social: tools/social-audit.js, Instagram https://www.instagram.com/cheekycharging 245 followers and no posts read, LinkedIn unreadable, not chosen
sweep squad: two operational roles on https://cheekycharging.com/careers, sales and ops, no tech roles, not chosen
thread: problem a crowded market where new stations come from someone walking into each bar | cost venues near their units sign with whoever reaches them first | offer an AI powered outreach flow that finds venues around the stations, offers the free unit and books the sales lead's visits | link stations
lead read: Cameron reads that his own page calls the market crowded and that venues are won one walk in at a time, then gets offered an AI powered outreach flow that finds venues around his stations and books visits, one thread
claims:
your venue page calls the power bank market crowded, https://cheekycharging.com/venues "The power bank rental market is crowded"
new stations come from someone walking into each bar, https://cheekycharging.com/careers "Sign up bars, pubs, clubs, gyms, hotels and events" and "You can walk into a bar and start a conversation"
INFERENCE, venues near the units likely sign with whoever reaches them first, rests on the crowded market line on https://cheekycharging.com/venues, worded likely
recheck: 2026-11-04 ~08.30 UTC, venues, careers, case studies, about and press pages read in crawl pass 2, the register fetched. Disproof tried, the case studies page also invites inbound ("List your venue"), so not every venue is a walk in, and the homepage map is a static image so no station count from it is used. Facts hold, confidence MEDIUM
```

SKETCHB
```
Hi Cameron, Cheeky Charging looks cool.

However, your venue page calls the power bank market crowded, and new stations still come from someone walking into each bar. Venues near the units you already have likely sign with whoever reaches them first.

I'd suggest an AI powered outreach flow that finds bars, gyms and hotels around your stations and books visits for your sales lead with the free unit offer.

Shall I send you a sketch of the AI powered outreach flow?
```
