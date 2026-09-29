# New accepts, 2026-09-29. Full research, all five angles. NOT SENT, waiting on Raka's word.

Two people accepted since the last reconciliation (count now 347, 344 plus Alisia, Enrique and Jim).
Both threads pulled per contact on 2026-09-29, both empty apart from the connect note (Jim's 22 Sep
connect note shows on the sentOnly list), positive control Ciara's thread came back full in the same
minute.

---

## Jim Cuckson, Intemax. OPENER. ctc_DB4f7hMWwZXF7vnPK

**In plain words.** Jim runs Intemax, a family farm supply business near Chesterfield with about 26
people. It started as Interhatch in 1999, selling to poultry farms, and in March 2025 it renamed
itself Intemax to go after pig and dairy farms too. Its website lists thousands of products and
not one of them shows a price. Every product says "Login for prices", and a new farmer has to
register and wait for someone at Intemax to verify the account before they see anything. So the
dairy and pig farmers Intemax is now chasing, who don't have an account yet, can't see what
anything costs, while rivals like Dalton Supplies show prices on every page. We'd build the new
customer sign up that gets a farmer to his prices without the wait.

```gate
lead: Jim Cuckson, CEO of Intemax, ctc_DB4f7hMWwZXF7vnPK, lea_2gAXpCxyemwbP89JR. Intemax is a trading name of PEAKBRIDGE GLOBAL LTD (09308819) per https://www.intemax.co.uk/terms-and-conditions . Companies House, James Cuckson (born May 1982) active director of Peakbridge since 13 Nov 2014 alongside Mark Cuckson and Warwick Grinnell, founders Peter and Rachel Cuckson resigned 2 Apr 2026, share subdivision and variation of rights filed Apr 2026. Also sole director of INTEMAX LTD (16249424, inc 13 Feb 2025, PSC Peakbridge) and director and 75%+ PSC of INTERHATCH LIMITED (12470626, dormant). Meet the team page lists "Jim Cuckson CEO". An owner of a family business, the business is his
site pass 1: 3,436 URLs from https://www.intemax.co.uk/sitemap.xml, every one fetched in parallel (12 workers, curl, 3 retries), 3,434 at 200 and 2 at 404, text of every page read by script into /tmp/claude-0/intemax/all.json. tools/crawl.py also started and was cut at its 600 s cap, so the parallel fetch is the full pass
site pass 2: second full read, 3,436 pages again by a second script path, 14 information pages read in full by hand (about-us, meet-the-team, onfarm-support, case-studies, testimonials, resource-centre, asset-finance, credit-application, vitamin-usage-calculator, eggfast-calculator, water-treatment/service-package, terms-and-conditions, contact-us, new-products, register, sign-in), screenshots of the category page and the register page desktop (render-via-curl, 0 curl errors) and the homepage live in Chromium, phone view via site-audit. The homepage curl render timed out, the live Chromium render and site-audit screenshot were used for it, and nothing visual about the homepage is claimed
deep analysis: a trade supply shop on the Web Wizard 2 platform (classic ASP, jQuery 1.12 and 3.6 both loaded). 0 of 3,434 live pages shows a single pound price, a regex that finds 25 prices on daltonsupplies.com and 33 on afssupplies.co.uk in the same minute. 2,928 pages carry "Login for prices". The register page says "This facility is currently active for customers within the United Kingdom and Ireland who currently have a trading account with Interhatch or would like to set one up. One of our team will be in touch shortly once your account has been verified." A separate credit application form asks for bank details, trade references and a fax number. The vitamin and EggFast calculators are behind the login too. The rebrand is unfinished, 43 page titles still end "| Interhatch", the register and asset finance pages say Interhatch, and 270 pages share the homepage's title. A hidden "Where would you like to go" popup carries lorem ipsum text, but its trigger is commented out in /scripts/app/main.js and it renders display none, so no visitor sees it and it's not claimed. The resource centre videos are YouTube embeds that play, the "upgrade your browser" text is fallback only
owner linkedin: route 1 curl /in/jim-cuckson-4670a2a1 999, /recent-activity/all/ 301 to login, tools/fetch-walled.py 999. Route 2 web search "Jim Cuckson" Intemax, headline not shown, rocketreach names him CEO in Stafford. Route 3 search linkedin.com/posts intemax, found the company's 28 Mar 2025 rename post (activity 7311352881637478400, decoded to 2025-03-28), read via WebFetch, "we're now extending our dependable supply and on-farm support to other types of intensive farm", with Warwick Grinnell's comment "the next chapter in our journey starts". Route 4 rocketreach org chart, 22 employees, Jim CEO, Mark Cuckson Operations and Technical Director. Route 5 company page via tools/social-audit.js, 2,841 followers. Route 6 X @intemax1 bio, Facebook IntemaxUK 1,027 followers, the Facebook rename video. His personal posts stay walled
contact linkedin: same person as the owner, Companies House names James Cuckson as director and the team page names Jim Cuckson CEO, lemlist jobTitle and tagline "Chief Executive Officer", no disagreement. Same six routes as above
google news: tools/news.py en, "Intemax" 1 result, Farmers Weekly 2026-01-12 "5 new products to improve dairy efficiency", "Jim Cuckson" 0, control Tesco 101
regional news: tools/news.py (Chesterfield OR Derbyshire poultry farm) with the industry terms, 9 results, the 2025 to 2026 bird flu housing orders, nothing on Intemax
industry news: tools/news.py poultry farm supplies UK OR avian influenza biosecurity UK, 50 results, EFSA urging stronger biosecurity 2026-09-23, Defra funded biosecurity vet visits June 2026, government plans against African swine fever May 2026. Biosecurity demand is up in poultry and now pigs, which is the market Intemax is moving into. Trade press read, Farmers Weekly, Farmers Guardian, Agriland UK
sources:
1. https://www.intemax.co.uk/sitemap.xml (3,436 URLs, all fetched)
2. https://www.intemax.co.uk/register (text and screenshot)
3. https://www.intemax.co.uk/dairy-equipment/calf-rearing (screenshot, "Login for prices" on every product)
4. https://www.intemax.co.uk/about-us
5. https://www.intemax.co.uk/meet-the-team
6. https://www.intemax.co.uk/credit-application
7. https://www.intemax.co.uk/terms-and-conditions
8. https://find-and-update.company-information.service.gov.uk/company/09308819/officers
9. https://find-and-update.company-information.service.gov.uk/company/16249424/persons-with-significant-control
10. https://find-and-update.company-information.service.gov.uk/company/12470626/persons-with-significant-control
11. https://www.linkedin.com/posts/intemax_interhatch-has-a-new-name-after-25-years-activity-7311352881637478400-zp81
12. https://rocketreach.co/intemax-management_b683a537c9ebaea3
13. https://www.linkedin.com/company/intemax (tools/social-audit.js)
14. https://www.facebook.com/IntemaxUK/ (tools/social-audit.js)
15. https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fwww.intemax.co.uk (tools/eu-view.py)
16. https://www.daltonsupplies.com/collections/biosecurity (competitor, 25 prices shown)
17. https://www.afssupplies.co.uk/product-category/chemicals-treatment/disinfectants/ (competitor, 33 prices shown)
18. Google News via tools/news.py, Farmers Weekly 2026-01-12 on Intemax dairy products
19. https://www.intemax.co.uk/scripts/app/main.js (popup trigger commented out)
pains: 6 judged. (1) No price anywhere and a manual account check before a new farmer sees one, while the company's own goal is winning pig and dairy farms that have no account yet, and rivals of the same size show prices. Costliest, it's every new customer of the expansion. (2) The rename is unfinished, 43 titles and the register page still say Interhatch, a symptom and a quick fix. (3) 270 pages share the homepage title, so products are hard to find by name in search, real and mid sized. (4) GDPR, a "by continuing your visit, you accept" banner with no reject, and from Stockholm 25 cookies set before any click including _ga, _gcl_au and HubSpot's __hstc and hubspotutk. They sell into Ireland, so GDPR applies directly, a fine and trust risk but a smaller spend for him. (5) Apps, account opening runs on a register form plus a credit application with bank details and a fax field, verified by staff, the same bottleneck as (1) from the inside. (6) Social is healthy, LinkedIn 2,841 and Facebook 1,027, no angle
chosen: (1) with (5) behind it, the costliest and the hottest. It sits on the goal the company announced in March 2025, every pig and dairy farmer they chase arrives without an account, and the fix is a build (instant trade sign up, guide prices, a portal) that passes the pay test for a business of about 26 people
sweep website: 0 of 3,434 pages on https://www.intemax.co.uk show a price, 2,928 say Login for prices, the register page asks for a trading account with Interhatch and a staff verification, control prices found on daltonsupplies.com in the same minute
sweep gdpr: from Stockholm per tools/eu-view.py https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fwww.intemax.co.uk , 25 cookies before any click including _ga, _gcl_au, __hstc and hubspotutk, banner reads "By continuing your visit, you accept their use" with Accept All and Preferences in the register page screenshot. Real, second in cost
sweep apps: account opening on https://www.intemax.co.uk/register and https://www.intemax.co.uk/credit-application is manual, staff verify every account, calculators behind the login, the same bottleneck as the website angle, folded into it
sweep social: opened with tools/social-audit.js, LinkedIn https://www.linkedin.com/company/intemax 2,841 followers, Facebook IntemaxUK 1,027 followers, X @intemax1 bio matches the site, YouTube unreadable from here. Healthy, no angle
sweep squad: no developer roles on https://www.intemax.co.uk/meet-the-team , a farm supplier that buys its web platform, not a squad fit
claims:
your site shows no price on any product, https://www.intemax.co.uk/sitemap.xml all 3,436 pages fetched 2026-09-29, 0 of 3,434 live pages with a pound price, 2,928 with "Login for prices", control https://www.daltonsupplies.com/collections/biosecurity 25 prices found by the same method
a new farmer waits for your team to verify the account before seeing one, https://www.intemax.co.uk/register "One of our team will be in touch shortly once your account has been verified", screenshot 2026-09-29, and "Login for prices" on https://www.intemax.co.uk/dairy-equipment/calf-rearing
taking Intemax beyond poultry into pig and dairy farms, https://www.intemax.co.uk/about-us "we looked to provide the same support across other intensive farm types, such as pig and dairy. That's when we rebranded from Interhatch to Intemax", and https://www.linkedin.com/posts/intemax_interhatch-has-a-new-name-after-25-years-activity-7311352881637478400-zp81
led global ecommerce insights at Heineken and got 23 markets serving themselves, https://www.linkedin.com/in/raka-mulya-b92885196 , "Global E-Business Data & Insights Lead, The HEINEKEN Company ... enabled 23 markets with self-serve insights" per docs/astra-master-context.md section 2A
thread: problem no price on the site and a new farmer waits for the team to verify his account | cost a pig or dairy farmer comparing suppliers orders where he can see a price, and every one the expansion chases is new | offer the new customer account sign up that gets him to his prices | link account
lead read: Jim reads that his site shows no price and a new farmer waits for his account to be verified, that the pig and dairy farmers he's chasing are all new, and gets offered the new customer account sign up, one thread
recheck: 2026-09-29 13.3x UTC second pass, /resources/catalogues lists no catalogue and no PDF, the brochure is order only, a web search for Intemax prices returns only its own login gated product pages, no marketplace listing. Register sentence reopened and screenshotted 2026-09-29, the zero price count rebuilt from all 3,436 pages the same day with a working control, the about page sentence quoted. Thesis confidence MEDIUM, because B2B account pricing is often deliberate, so the message offers a faster way to the prices rather than calling hidden prices a mistake
```

### Jim, OPENER

```
Hi Jim, saw Intemax, looks interesting!

However, your site shows no price on any product, and a new farmer waits for your team to verify the account before seeing one. This causes a dairy or pig farmer comparing suppliers to order from whoever shows them a price first.

Especially, when you are taking Intemax beyond poultry into pig and dairy farms, the wait hits every farmer you're chasing, because none of them has an account yet.

I run Astra agency. We build websites and apps for brands like Unilever, AXA, Pertamina. I led global ecommerce insights at Heineken, where we got 23 markets serving themselves instead of waiting on a person.

Shall I send you over what the new customer account sign up looks like?
```

---

## Enrique Aliste, IEDES. NO_STRONG_ANGLE, not a business he owns. ctc_772z2yF7mQPYDkeky

**In plain words.** Enrique is a geography professor at Université Paris 1 Panthéon-Sorbonne and,
since 25 September 2025, director of IEDES, the university's institute for development studies.
It's a public university department, not a business, and its website runs on the university's
own platform. There's nothing he owns for us to sell to.

```sweep
lead: Enrique Aliste Almuna, Directeur, Institut d'études du développement de la Sorbonne, ctc_772z2yF7mQPYDkeky. Tagline "Professeur des Universités, Université de Paris 1 Panthéon-Sorbonne ... Profesor Titular, Universidad de Chile". https://iedes.pantheonsorbonne.fr/liedes-en-bref/nos-equipes lists "Enrique Aliste Almuna, PR géographe, Directeur de l'IEDES", appointed per the 25 Sep 2025 board minutes on the same site
website: https://iedes.pantheonsorbonne.fr/ rendered by tools/site-audit.js, a modern page on the Université Paris 1 Drupal platform, screenshot opened, managed centrally by the university, nothing for him to commission
gdpr: tarteaucitron consent code, 0 third party requests and 2 cookies before a click per tools/site-audit.js on https://iedes.pantheonsorbonne.fr/ , GEO VOID from the US, and a university data protection office owns it anyway
apps: a public teaching and research unit, procurement by public tender through Université Paris 1, per https://iedes.pantheonsorbonne.fr/ , not a small business buyer
social: opened with tools/social-audit.js links from https://iedes.pantheonsorbonne.fr/ , Facebook iedesparis1 and the university's own Instagram, X and YouTube, run by the institute and the university
squad: no product or build team at https://iedes.pantheonsorbonne.fr/ , not a squad fit
verdict: NO_STRONG_ANGLE, a public university department with nothing he owns to sell to. Google News via tools/news.py fr, "IEDES Sorbonne" 0, "Enrique Aliste" 1 (Slate.fr 2025-04-03 quoting him on climate), control Carrefour 101
```
