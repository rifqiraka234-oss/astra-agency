# NOT SENT. Approved by Raka 7 Nov, 'Send all at 07.28', scheduled Sun 8 Nov 07.28 Amsterdam.

Approved text from state/drafted_2026-11-07-openers-review.md, Enrique section, copied byte for byte with no change (REPLY, so the "looks cool!" rule doesn't apply). This replaces state/drafted_2026-11-06-reply-enrique.md, the Christmas gift draft, which must never be sent.

Thread pulled 2026-11-07 07.19 UTC with tools/lemlist.py, control ctc_ch3vFcKAkjQdMKDCg 9 items ok, ctc_mwjMZR4mJkQPLNNwX 1 item, THEM 2026-11-06 12.23 "Thanks Raka", nothing from us. Inbox listing (197 conversations) shows him once, turn US. State files grep on name, company, contactId, lea_y8LmtNj6zJzM2Pq8Z, the LinkedIn slug and the domain, no SENT row, the queue's latest row is UNRESEARCHED.

### Enrique Fernández, Tinto Coffee Experience, ctc_mwjMZR4mJkQPLNNwX

> Flags. (1) He wrote first, "Thanks Raka", so this is a REPLY. (2) lemlist says Lima, Peru and "Co-Founder of Tinto". The Impressum says "Tinto Coffee Ihn Enrique Fernandez, Johannisstraße 3, 10117 Berlin", a sole trader he owns, and the Impressum wins. (3) Budget is thin. The terms say "§19 UStG (German small business regulation), no VAT is charged", which means last year's turnover sat under the small business limit, 184 Instagram followers and 26 on Facebook. A €2,500 flow may be a stretch for him, Raka's call. (4) No FAQ exists (/faq, /faqs and /pages/faq all 404, and the sitemap lists none), and a "Plans & Pricing" page is the empty Wix default, "No plans available" with the template's "I'm a paragraph" text.

```gate
lead: Enrique Fernández, lemlist jobTitle Founder, tagline "Serial Entrepreneur | Co-Founder of Tinto | ...", contact record read 2026-11-07 07.21 UTC. Owner per https://www.tintocoffeexp.com/legal/legal-notice "Tinto Coffee Ihn Enrique Fernandez, Johannisstraße 3, 10117 Berlin", VAT DE452731420, "represented by Enrique Fernandez", read live 2026-11-07 07.32 UTC. Einzelunternehmen, so no Handelsregister entry to read. ctc_mwjMZR4mJkQPLNNwX, lea_y8LmtNj6zJzM2Pq8Z, cam_7gnHSf6GvvGy8gH3n. Thread 1 item (his "Thanks Raka"), control 9
site pass 1: 19 URLs, tools/crawl.py on https://www.tintocoffeexp.com, 18 from the sitemap, all 200, every page read (home, about, contact, blog and 3 posts, all products, 4 product pages, Origins Kit DE landing page, plans and pricing, legal notice, privacy, terms, returns)
site pass 2: 19 URLs, tools/crawl.py again, all 200, plus site-audit.js desktop and phone screenshots opened, a Wix site with the TINTO logo over coffee cherries, a 15% off email popup and a Usercentrics banner, plus the 15 links in the homepage HTML
deep analysis: a one person Berlin roaster brand selling Colombian specialty coffee online since the Aug 2025 launch. The shop is three 250g bags (Sumapaz 12,90 €, Inga de Aponte 12,00 €, Las Hermosas 12,50 €) and the Origins Coffee Kit 3 x 70g at 12,10 € with free DHL delivery, "kein Abo, keine Verpflichtung", a "BLACK TINTO · Buy 3 products, get free shipping" banner, and a blog on brewing methods and grind sizes at home. Contact "questions, feedback, collaborations" with an email and WhatsApp. Across all 19 pages, 0 hits for wholesale, Großhandel, B2B, office, Büro, Firmen, Unternehmen, corporate, gift, Geschenk, Christmas, Weihnacht, gastro, bulk or 1kg ("business" hits only "business days" and "small business regulation"), control "Probierset" on 19 of 19 pages and "Origins" on 10. INFERENCE, offices are the steady weekly buyer of coffee and companies buy gifts at Christmas, and Tinto has no route for either
owner linkedin: Route 1 https://www.linkedin.com/in/kykefernandez curl 999. Route 2 web search "Enrique Fernández" Tinto coffee Berlin, nothing about him. Route 3 no register entry for a sole trader, the Impressum names him. Route 4 the about page names no founder. Route 5 the lemlist record. Route 6 the company LinkedIn https://www.linkedin.com/company/tintocoffeexp through social-audit.js, walled, UNKNOWN
contact linkedin: same person as the owner, the Impressum and the lemlist record agree on the person, they disagree on the city and the Impressum wins
google news: tools/news.py de 2026-11-07, company "Tinto Coffee" Berlin 0 hits, person "Enrique Fernandez Tinto" 0 hits, control Volkswagen 100, so the empty result counts
regional news: tools/news.py (Kaffeerösterei Berlin) x (Bürokaffee Firmen OR Weihnachtsgeschenke Firmen), 0 hits, control 100
industry news: tools/news.py Bürokaffee Firmen OR Weihnachtsgeschenke Firmen Mitarbeiter 2026, 2 hits, Bilanz "Gratiskaffee? Ein Muss für jede Firma" (16 Apr 2024), WirtschaftsWoche "Was der Bürokaffee über die Firmenkultur verrät" (7 Mar 2018), headlines only, background for the inference
sources:
1. https://www.tintocoffeexp.com/
2. https://www.tintocoffeexp.com/about
3. https://www.tintocoffeexp.com/contact
4. https://www.tintocoffeexp.com/legal/legal-notice
5. https://www.tintocoffeexp.com/category/all-products
6. https://www.tintocoffeexp.com/origins-kit-de
7. https://www.tintocoffeexp.com/post/5-brewing-methods-5-grind-sizes-how-to-choose-the-right-one-without-overthinking-it
8. https://www.tintocoffeexp.com/pricing-plans/list
9. https://www.tintocoffeexp.com/legal/terms-%26-conditions
10. https://www.instagram.com/tintocoffeexp/
11. https://www.facebook.com/tintocoffeexp
12. https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fwww.tintocoffeexp.com
13. https://news.google.com/rss (tools/news.py)
14. https://www.linkedin.com/company/tintocoffeexp (walled, UNKNOWN, not read)
15. https://ca.trustpilot.com/review/tintocoffeexp.com (403 on curl, the search summary says TrustScore 3.4, tier G, not used)
pains: 4 judged. (1) a consumer only shop with no route for Berlin companies, the steady weekly and Christmas buyer, CHOSEN, Raka's angle. (2) social, Instagram 184 followers and 22 posts, latest 19 Oct, Facebook 26, small and young, real but a branding job. (3) website, a clean Wix shop with an empty default pricing page and no FAQ, small fixes. (4) GDPR, Usercentrics banner with Deny, but from Stockholm 19 cookies before a click including HubSpot, never the angle
chosen: (1), biggest, one office ordering every week outweighs many one off home orders, and it's the outreach angle Raka picked
owner reply: "We're just starting, home customers first" | then companies are the faster way to steady volume, and the shop already has a sampler a company can try | https://www.tintocoffeexp.com/origins-kit-de "Das Origins Kit — probiere alle drei"
worth: €3,000+, an AI powered outreach flow, a list of Berlin office managers and HR leads, personal outreach with the Origins Kit as a trial, and a company order page
still there: the Impressum names Enrique Fernandez as owner, read live 2026-11-07, and Instagram posted 19 Oct | https://www.tintocoffeexp.com/legal/legal-notice
budget: thin, a sole trader under the §19 UStG small business rule, running Usercentrics and HubSpot on the site (tiers unknown) | https://www.tintocoffeexp.com/legal/terms-%26-conditions
variant: REPLY, outside the A/B test
sweep website: crawled twice, 19 URLs each, screenshots opened, a clean young Wix shop for home buyers, no company page found against a working control, chosen as the route for the flow
sweep gdpr: site-audit.js GEO VOID (Usercentrics), tools/eu-view.py from Stockholm 19 cookies before a click including HubSpot __hstc and hubspotutk, checked, never the angle (RULES 0E)
sweep apps: a one person shop on Wix with HubSpot, no manual job described on the site (crawl of 19 URLs), the outreach flow is the chosen build
sweep social: tools/social-audit.js, Instagram https://www.instagram.com/tintocoffeexp/ 184 followers 22 posts latest 19 Oct 2026, Facebook 26, LinkedIn walled UNKNOWN, small, not chosen
sweep squad: a sole trader with no tech team or job posts (crawl of 19 URLs), nothing to staff, not chosen
thread: problem the shop is set up for home brewers and there's no page for office managers and HR teams to order from | cost the weekly office coffee and the Christmas gifts go elsewhere | offer an AI powered outreach flow that finds those office managers and HR leads in Berlin and gets Tinto in front of them | link office managers
lead read: Enrique reads that his shop speaks to home brewers while Berlin office managers buy every week and have no page to order from, then gets offered an AI powered outreach flow that finds those office managers, one thread
claims:
Tinto is in Berlin, https://www.tintocoffeexp.com/legal/legal-notice "Johannisstraße 3, 10117 Berlin" and https://www.tintocoffeexp.com/ "Colombian Coffee Culture, Roasted in Berlin"
the shop is set up for home brewers, https://www.tintocoffeexp.com/category/all-products three 250g bags and a 3 x 70g kit, https://www.tintocoffeexp.com/origins-kit-de "kein Abo", and the blog on brewing at home https://www.tintocoffeexp.com/post/5-brewing-methods-5-grind-sizes-how-to-choose-the-right-one-without-overthinking-it
there's no page for them to order from, the 19 crawled pages and the homepage links, 0 hits for office, Büro, Firmen, B2B, wholesale, gift, Geschenk, corporate, control "Probierset" 19 of 19, https://www.tintocoffeexp.com/
INFERENCE, office managers and HR teams in Berlin buy coffee every week and gifts every Christmas, a general fact about offices, not about Tinto, background https://news.google.com/rss (Bilanz 16 Apr 2024 "Gratiskaffee? Ein Muss für jede Firma"), written as fact in Raka's approved text
INFERENCE, the company orders come in steadily, the outcome of the offer, not a fact
recheck: every claim reopened 2026-11-07 07.32 UTC with a live fetch of the home, legal notice, blog post and pricing pages, and the absence grep run over pass 1 with its control. Disproof tried, looked for a company page, a FAQ, subscription plans, a bulk size and a gift offer on every page and by direct URL (/faq, /faqs, /pages/faq, /business, /b2b and /wholesale all 404), and the pricing page holds "No plans available". The about page has no company line. Facts hold. The one sentence stated as fact that isn't about Tinto is the office buying habit, which is Raka's wording and general, confidence MEDIUM
```

REPLY
```
Hi Enrique, thanks for connecting, Tinto looks cool!

However, the shop is set up for home brewers, while office managers and HR teams in Berlin buy coffee every week and gifts every Christmas, and there's no page for them to order from.

I'd suggest an AI powered outreach flow that finds those office managers and HR leads in Berlin and gets Tinto in front of them, so the company orders come in steadily.

Shall I send you a sketch of the flow for Tinto?
```
