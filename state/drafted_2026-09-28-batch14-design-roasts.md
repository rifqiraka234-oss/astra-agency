# Batch 14, 2026-09-28. Cleverise, ASK Wear, Leadership Through Data, rejudged on design. NOT SENT.

Raka opened all three from the Netherlands and sent screenshots. Every banner has a refuse button on the
first screen (Cleverise "Deny", ASK Wear "Alles afwijzen", Leadership Through Data "Reject All"), so the
consent angle is dead for all three and stays out. His words, "all these websites are so ugly and shit
lol i beg you try different ways to open it and roast it and analyse it".

What was run today on each. tools/roast.js-style Chromium renders at 1440, 1920 and an iPhone 13 profile,
each full page after scrolling to the bottom, with request counts, bytes, fonts, headings and the nav's
position and colour. Leadership Through Data, walled earlier, rendered after waiting out its cookie
challenge and reloading. The ASK Wear branches grid was checked for a carousel (static, no links), and
two branch URLs were probed.

---

## Peter Van Gulick, Cleverise. OPENER.

**In plain words.** Cleverise launched in February 2026, two founders with 35 years in the process
industry building AI agents. Their homepage is a big C logo inside circles, a paragraph, four "Why"
cards and four value cards, Empathy, Innovation, Openness and Integrity, which any company could claim.
Their actual proof sits in a Dutch blog post from May. Alfred reads Q88 vessel documents at terminals
and turns hours of manual entry per ship into minutes. A terminal or plant manager checking a brand new
AI supplier needs that proof first. We'd put Alfred on the homepage.

```gate
lead: Peter van Gulick, co founder of Cleverise B.V. with Pieter Klaren, named "businesspartner Peter van Gulick" in the KOBR article listed on https://cleverise.nl/news/ , ctc_ExuGxPLfni8pCkz4h. He asked "What business do you have?" on 4 Sep and our answer ended on a question he never answered
site pass 1: 14 URLs by tools/crawl.py on 28 Sep, homepage, our way of working, our story, news, three posts, contact, cookie policy
site pass 2: Chromium full page renders at 1440, 1920 and iPhone 13 today, 40 requests and about 800 KB each, headings read, nav positions read
deep analysis: WordPress and Elementor. At 1440 wide the nav breaks onto two lines, "Contact Us" drops to a second row (nav top 6 px against 52 px), matching Raka's own screenshot. Nav links rgb(94,103,130) on the navy background. The homepage is the C mark in concentric circles, three paragraphs, "Book a meeting", four "Why Cleverise" cards, four "Our Values" cards (Empathy, Innovation, Openness, Integrity) and the same circle graphic again beside "Our Story". No product screen, no client, no number on the homepage. On a phone the first screen is the logo, a centred menu icon and the circles. The proof lives at https://cleverise.nl/digitale-butler-alfred-terminals-q88-documentverwerking/ , 18 May 2026, in Dutch, "Wat voorheen uren kostte per schip, wordt teruggebracht naar minuten", and on https://cleverise.nl/our-story/ , "an engineer gets 50% of their administrative time back". Complianz banner with Deny on the first layer per Raka's NL screenshot
owner linkedin: company page https://www.linkedin.com/company/cleverisebv 253 followers via tools/social-audit.js. Two founders per the launch post of February 2026 on https://cleverise.nl/news/
contact linkedin: his lemlist record, "Founder at Cleverise, AI assistants for industrial operations, DCS, MES, ERP and real-time systems"
google news: tools/news.py nl, Cleverise 1 result, KOBR 2026-03-24 "Met onze AI past het systeem zich aan in plaats van de mens", "Peter van Gulick" the same article, control Heineken 100
regional news: tools/news.py Bodegraven Reeuwijk with AI procesindustrie, the same KOBR piece on their ZIE 2026 appearance
industry news: tools/news.py AI procesindustrie 73 results, Synergy AI on a European hosted platform (Computable 2026-09-22), a crowded AI vendor field for industrial buyers
sources:
1. https://cleverise.nl/ (rendered at three widths)
2. https://cleverise.nl/digitale-butler-alfred-terminals-q88-documentverwerking/
3. https://cleverise.nl/our-story/
4. https://cleverise.nl/news/
5. https://cleverise.nl/our-way-of-working/
6. https://www.linkedin.com/company/cleverisebv
7. https://kobr.nl/ via https://news.google.com/rss/search?q=Cleverise (tools/news.py)
8. https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fcleverise.nl (0 Google ads)
9. https://www.computable.nl/ via tools/news.py industry search
10. Raka's NL screenshots of cleverise.nl, 2026-09-28
11. https://www.linkedin.com/in/raka-mulya-b92885196 (the credential)
pains: 4 judged. (1) First clients for a February 2026 launch, industrial buyers need proof before they trust a new AI supplier, and the homepage holds values and no proof, the costliest we can fix. (2) Nav breaking onto two lines at 1440, low contrast grey links, a tweak. (3) Consent, Deny on the first layer, dead. (4) No hiring, no squad fit
chosen: the proof missing from the homepage, the costliest, because Alfred's hours to minutes result is the one thing a terminal manager needs and it sits in a Dutch blog post
sweep website: the angle. Values and circles on https://cleverise.nl/ , proof on https://cleverise.nl/digitale-butler-alfred-terminals-q88-documentverwerking/ , nav wrap at 1440 in the render and in Raka's screenshot
sweep gdpr: dead. Raka's NL screenshot shows Complianz with Accept, Deny and View preferences on the first layer of https://cleverise.nl
sweep apps: they build AI agents themselves per https://cleverise.nl/our-way-of-working/ , not a buyer for tools
sweep social: opened with tools/social-audit.js, LinkedIn company 253 followers, fine for a firm launched in February
sweep squad: two founders, no open roles in the crawl of https://cleverise.nl , no capacity evidence
claims:
your homepage shows a logo in circles and four value cards, https://cleverise.nl/ render 2026-09-28, the C mark in circles and Empathy, Innovation, Openness, Integrity
Alfred's hours to minutes result sits in a May blog post, https://cleverise.nl/digitale-butler-alfred-terminals-q88-documentverwerking/ 18 May 2026, "Wat voorheen uren kostte per schip, wordt teruggebracht naar minuten"
winning Cleverise's clients in its first year, https://cleverise.nl/news/ launch post February 2026
ran go to market at Betty Blocks, a platform companies use to build their own apps, docs/astra-master-context.md section 2A, https://www.linkedin.com/in/raka-mulya-b92885196
thread: problem the homepage shows values and circles while the Alfred proof sits in a blog post | cost a terminal or plant manager vetting a new AI supplier sees no proof | offer the homepage with Alfred at work | link homepage
lead read: Peter reads that his homepage leads with circles and values while Alfred's result hides in a blog, that a manager checking a new supplier needs that proof, and gets offered the homepage with Alfred at work, one thread
recheck: rendered at three widths today, the Dutch sentence quoted from the post, the launch date from their own news page. Thesis confidence MEDIUM HIGH
```

### Peter, OPENER

```
Hi Peter, saw Cleverise, looks interesting!

However, your homepage shows a logo in circles and four value cards, and Alfred's hours to minutes result sits in a May blog post. This causes a terminal manager deciding on a new AI supplier to see values and no proof.

Especially, when you are winning Cleverise's clients in its first year, the proof they need is the one piece the homepage leaves out.

I run Astra agency. We build websites and apps for brands like Unilever, AXA, Pertamina. I ran go to market at Betty Blocks, a platform companies use to build their own apps, so I've seen a working demo close what a values page can't.

Shall I send you over what the homepage with Alfred at work looks like?
```

---

## Stefan van der Heijden, ASK Wear. OPENER.

**In plain words.** ASK Wear is Stefan and Anouk, fitting workwear on site across Brabant and Limburg.
They wrote eight branch pages of about 900 words each, bouw, transport, automotive, installatietechniek,
groenvoorziening, fysio en fitness, horeca and retail. The branches section on the homepage ignores
them. It's eight cards reading Automotive three times, Infra & GWW twice, Bouw twice and Industrie
once, none of them clickable, and Infra & GWW and Industrie have no page at all. An owner of a transport
firm or a restaurant scrolling for their trade finds nothing. We'd rebuild that section.

```gate
lead: Stefan van der Heijden, Mede-eigenaar of ASK Wear per his lemlist record and "Eigenaar - Account Manager" under his photo on https://askwear.nl/ , with Anouk Krekels "Eigenaar - Back office", ctc_sCoFYXP34MiTGkvGq. He asked "what kind of business do you have?" on 4 Sep and our answer ended on a question he never answered
site pass 1: 28 URLs by tools/crawl.py on 28 Sep, all 200, homepage, over ons, contact, eight branche pages, five brand pages
site pass 2: Chromium full page renders at 1440, 1920 and iPhone 13 today, 147 requests and about 4.5 MB, plus a viewport screenshot of the branches grid held 4 seconds and a DOM read of every branch card's heading, position and link
deep analysis: WordPress with Elementor. The homepage branches section is a static grid of eight cards in two rows, headings at y 3074 "AUTOMOTIVE, INFRA & GWW, AUTOMOTIVE, BOUW" and at y 3735 "INDUSTRIE, INFRA & GWW, AUTOMOTIVE, BOUW", no card has a link, and a welder photo sits over one Automotive label. https://askwear.nl/branches/infra-gww/ and https://askwear.nl/branches/industrie/ answer 404, https://askwear.nl/branches/automotive/ answers 200. The eight real branch pages (bouw, transport, automotive, installatietechniek, groenvoorziening, fysio-en-fitness, horeca, retail) run 848 to 977 words each and none is linked from that section. No H1 on the homepage. Four Google font families loaded in every weight (Inter, Poppins, Montserrat, Lato). A cart showing EUR 0,00 in the header while https://askwear.nl/branches/bouw/ says "ASK Wear is geen webshop". CookieYes with Alles afwijzen on the first layer per Raka's NL screenshot. The hero slider overflow (body 1540 wide at 1440) is clipped, scrollWidth 1440, not visible, not used
owner linkedin: company page https://www.linkedin.com/company/ask-wear/ 15 followers via tools/social-audit.js. Owners named on the homepage
contact linkedin: his lemlist record, tagline "Eigenaar ASK Wear"
google news: tools/news.py nl, "ASK Wear" 0 results, "Stefan van der Heijden" 10 results about other people, control Heineken 100
regional news: tools/news.py Brabant bedrijfskleding, 53 results, JamesB10 growing as a total partner for club and company clothing (VoetbalJournaal 2026-04-17)
industry news: tools/news.py bedrijfskleding, 100 results, Interpromo taking over MOC Bedrijfskleding after its bankruptcy (Noordhollands Dagblad 2026-09-24), a consolidating market
sources:
1. https://askwear.nl/ (rendered at three widths, branches DOM read)
2. https://askwear.nl/branches/
3. https://askwear.nl/branches/bouw/
4. https://askwear.nl/branches/transport/
5. https://askwear.nl/branches/horeca/
6. https://askwear.nl/branches/infra-gww/ (404)
7. https://askwear.nl/branches/industrie/ (404)
8. https://www.linkedin.com/company/ask-wear/
9. https://www.instagram.com/askwear.nl (via tools/social-audit.js)
10. https://webbkoll.5july.net/en/results?url=http%3A%2F%2Faskwear.nl (0 Google ads)
11. https://news.google.com/rss/search?q=bedrijfskleding (tools/news.py)
12. https://www.linkedin.com/in/raka-mulya-b92885196 (the credential)
13. https://www.noordhollandsdagblad.nl/ via tools/news.py, Interpromo taking over MOC Bedrijfskleding 2026-09-24
pains: 4 judged. (1) Winning SME teams by trade, the homepage branch section shows three trades, repeats Automotive three times and links nowhere, while eight branch pages sit unlinked, the costliest we can fix. (2) Four font families and no H1, speed and search, part of (1)'s rebuild. (3) Consent, Alles afwijzen on the first layer, dead. (4) Reorder portal, our hypothesis only, not used
chosen: the branches section, the costliest, because it's the part of the homepage built to send each owner to their own trade and it sends nobody anywhere
sweep website: the angle. Eight cards, Automotive three times, no links, two branch URLs at 404, on https://askwear.nl/ and the DOM read
sweep gdpr: dead. Raka's NL screenshot shows CookieYes with Aanpassen, Alles afwijzen and Accepteer alles on the first layer of https://askwear.nl
sweep apps: reorder portal floated in chat on 4 Sep, not a pain on https://askwear.nl/branches/bouw/ , kept out
sweep social: opened with tools/social-audit.js, LinkedIn 15, Instagram 21 followers and 3 posts, Facebook 145, small and active
sweep squad: a two owner workwear firm, not a squad fit per https://askwear.nl
claims:
your homepage lists Automotive three times under branches, https://askwear.nl/ DOM read 2026-09-28, headings AUTOMOTIVE at three of eight cards, screenshot of the grid
Transport, Horeca and Retail not at all, the same DOM read, the eight headings are Automotive, Infra & GWW, Bouw, Industrie only, while https://askwear.nl/branches/transport/ , /horeca/ and /retail/ exist
the page you wrote for it, https://askwear.nl/branches/transport/ and seven more branch pages of 848 to 977 words in the 28 Sep crawl
winning teams across Brabant and Limburg one fitting at a time, https://askwear.nl/ "Wij rijden door Brabant en Limburg om bedrijven op locatie te adviseren"
built a food brand from zero and ran its acquisition and conversion, docs/astra-master-context.md section 2A, https://www.linkedin.com/in/raka-mulya-b92885196
thread: problem the branches section repeats Automotive and leaves out the trades they wrote pages for | cost an owner scrolling for their trade misses it | offer the fixed branches section | link branches
lead read: Stefan reads that his branches section shows Automotive three times and leaves out transport, horeca and retail, that owners looking for their trade miss the pages he wrote, and gets offered the fixed branches section, one thread
recheck: the grid screenshotted and held 4 seconds to rule out a carousel, the headings read from the DOM, the 404s probed today. Thesis confidence HIGH
```

### Stefan, OPENER

```
Hi Stefan, saw ASK Wear, looks interesting!

However, your homepage lists Automotive three times under branches, and Transport, Horeca and Retail not at all. This causes an owner scrolling for their own trade to miss the page you wrote for it.

Especially, when you are winning teams across Brabant and Limburg one fitting at a time, the owner who can't find their trade is a visit you never get to make.

I run Astra agency. We build websites and apps for brands like Unilever, AXA, Pertamina. I built a food brand from zero and ran its acquisition and conversion, so I know a visitor who can't find their own case leaves.

Shall I send you over what the fixed branches section looks like?
```

---

## Jacqueline Stockwell, Leadership Through Data. OPENER.

**In plain words.** Jacqueline is CEO and founder of Leadership Through Data, training information
leaders for AI and Copilot. She sells the EMPOWER Accelerator at 725 pounds a month and an Information
Leader Accelerator at 208 pounds a month. The homepage opens with "Be Authentic. Be Compliant. Be
Empowered." and her own photo, then fills the page with a globe in a hand, a laptop group shot, a robot,
plasticine figures and a hand placing five gold stars. It also loads 19.5 MB of images, pictures
uploaded at 2400 pixels wide and shown at 595. People buying a personal programme at that price are
buying her, and the page shows her once. We'd rebuild the homepage around her.

```gate
lead: Jacqueline Stockwell, CEO and founder of Leadership Through Data per her lemlist summary "I'm Jacqueline Stockwell, the CEO and founder of Leadership Through Data" and the caption "Jacqueline Stockwell, CEO & Founder" on https://www.leadershipthroughdata.com/ , ctc_hYkMQaD4Qw5QrHACN. UK office Sible Hedingham, company no. 11087569 in the footer
site pass 1: 29 URLs of https://jakispeaks.com crawled by tools/crawl.py on 28 Sep, and the https://www.leadershipthroughdata.com/ homepage rendered in desktop Chromium after waiting out its connection check and reloading, with every image's natural size and bytes
site pass 2: 29 URLs, the https://jakispeaks.com crawl read again from its crawl file, plus an iPhone 13 render of the LTD homepage (95 requests, about 20 MB) and Raka's own NL screenshot of the hero
deep analysis: WordPress with Avada. Three H1s (Be Authentic. / Be Compliant. / Be Empowered.), emoji H2s on the pricing cards. After the hero photo of Jacqueline the images are a globe in a hand, a group at a laptop, a woman in front of a team, a robot, plasticine figures climbing, a hand under a dark background and a hand placing five gold stars. Total image bytes 19,518,786 in the render, the largest Coaching-for-Information-Leaders.png at 5,350,990 bytes, Microsoft-eLearning-Courses.png 4,767,645, several 2400x1600 originals shown at 595 px. Pricing on the homepage, 21-Day Sprint free, Information Leader Accelerator 208 pounds per month, EMPOWER Accelerator 725 pounds per month. A black box "Please accept cookies to access this content" covers the right edge for anyone who hasn't accepted. Reject All on the first layer per Raka's screenshot. No filename says stock, so the message describes the pictures and never calls them stock
owner linkedin: /in/jacquelinestockwell linked from jakispeaks.com, 999 to us. Company number 11087569 in the footer of https://www.leadershipthroughdata.com/
contact linkedin: her lemlist tagline, "International Best-Selling Author multi award winning dyslexic entrepreneur"
google news: tools/news.py en, "Jacqueline Stockwell" 3 results, a Dyslexia Award nominee list (Charity Today News 2026-09-15), "Leadership Through Data" 10 results none about the firm, control Tesco 100
regional news: tools/news.py UK information management with information governance Copilot, 45 results, "The NHS Copilot rollout exposes the governance gap behind enterprise AI ambition" (IT Brief UK 2026-08-06), the exact demand she sells into
industry news: tools/news.py information governance Copilot, 76 results, Microsoft consolidating Copilot (2026-09-26), buyers flooded with AI readiness offers
sources:
1. https://www.leadershipthroughdata.com/ (rendered at three widths, images measured)
2. https://jakispeaks.com/ (crawled)
3. https://jakispeaks.com/speaking/
4. https://www.charitytoday.co.uk/ via https://news.google.com/rss/search?q=%22Jacqueline%20Stockwell%22 (tools/news.py)
5. https://itbrief.co.uk/ via tools/news.py regional search
6. https://webbkoll.5july.net/en/results?url=http%3A%2F%2Fjakispeaks.com
7. https://www.instagram.com/jakispeaks (14 followers, last post 5 Mar, via tools/social-audit.js)
8. Raka's NL screenshot of leadershipthroughdata.com, 2026-09-28
9. https://www.linkedin.com/in/jacquelinestockwell (linked, 999 to us)
10. https://www.linkedin.com/in/raka-mulya-b92885196 (the credential)
11. https://find-and-update.company-information.service.gov.uk/company/11087569 (the footer number, not opened)
pains: 4 judged. (1) Selling a 725 pound a month programme that buyers take on trust in her, while the homepage fills with generic pictures and shows her once, the costliest we can fix. (2) 19.5 MB of images, slow on a phone, part of (1)'s rebuild. (3) Consent, Reject All on the first layer, dead. (4) Social, Instagram dormant since March, small
chosen: the page that sells her with pictures that aren't her, the costliest, because the EMPOWER buyer is buying Jacqueline and the headline promises authenticity
sweep website: the angle. The pictures and weights read from https://www.leadershipthroughdata.com/ today, the broken /podcasts-books/ button on https://jakispeaks.com a tweak
sweep gdpr: dead. Raka's NL screenshot shows Customise, Reject All and Accept All on the first layer of https://www.leadershipthroughdata.com
sweep apps: MemberSpace sign in on https://jakispeaks.com and courses on the LTD site, the delivery tools exist
sweep social: opened with tools/social-audit.js, Instagram 14 followers, last post 5 Mar 2026, TikTok 6 followers, LinkedIn 999
sweep squad: a training company, no developer roles on https://www.leadershipthroughdata.com , not a squad fit
claims:
your homepage says Be Authentic, https://www.leadershipthroughdata.com/ H1 "Be Authentic." render and Raka's screenshot 2026-09-28
shows a robot, a globe in a hand and five gold stars instead of you, https://www.leadershipthroughdata.com/ render, sections "Where are you on the journey", "Why AI readiness starts with information readiness" and "About Leadership Through Data"
selling EMPOWER as a monthly programme, https://www.leadershipthroughdata.com/ pricing card "EMPOWER Accelerator ... Per month + local taxes"
the page shows you once, https://www.leadershipthroughdata.com/ render 2026-09-28, her photo in the hero is the only picture of her on the homepage
ran campaigns at Betty Blocks for a year and a half, docs/astra-master-context.md section 2A, https://www.linkedin.com/in/raka-mulya-b92885196
thread: problem the homepage promises authenticity and shows generic pictures instead of her | cost the leaders weighing a 725 pound programme buy her, and see her once | offer the homepage built around her | link homepage
lead read: Jacqueline reads that her homepage says Be Authentic and then shows a robot, a globe and gold stars, that EMPOWER buyers are buying her, and gets offered the homepage built around her, one thread
recheck: rendered after the challenge cleared, prices read from the page, image sizes measured in the render. Whether each picture is licensed stock is unknown, so the message names what they show. Thesis confidence MEDIUM
```

### Jacqueline, OPENER

```
Hi Jacqueline, saw Leadership Through Data, looks interesting!

However, your homepage says Be Authentic, then shows a robot, a globe in a hand and five gold stars instead of you. This causes an information leader weighing EMPOWER to meet a generic page for a very personal programme.

Especially, when you are selling EMPOWER as a monthly programme, the leaders you want are buying you, and the page shows you once.

I run Astra agency. We build websites and apps for brands like Unilever, AXA, Pertamina. I ran campaigns at Betty Blocks for a year and a half, so I've had to prove which pages actually brought in leads.

Shall I send you over what the homepage built around you looks like?
```
