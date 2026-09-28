"""The HotGreen superset, one source of truth.

Every item Astra's proposal page and Josh's concept site offer, merged and de-duplicated, with the
client copy, effort, price, set menu and dates. Run it to regenerate items.json, gantt.mmd, the
generated tables in the brief, and the Gantt preview.

    python3 items.py

Price rule (proposed, Raka to confirm): effort days x EUR 450, rounded to the nearest EUR 250.
EUR 450 sits between the internal ad hoc rates in docs/astra-master-context.md section 5
(development about EUR 375 a day, strategy and design about EUR 550 a day).
"""
import datetime as dt
import json
import os
import re

HERE = os.path.dirname(os.path.abspath(__file__))
RATE = 450
JOSH = 'https://hotgreen.astraagency.nl'
ASTRA = 'https://astra-hotgreen-proposal.netlify.app'
START = '2026-10-12'  # assumed kick off, a Monday

FAMILIES = [
    ('A', 'We fix it', 'Fixes to your current website.'),
    ('B', 'Investor proof', 'A website update for investors.'),
    ('C', 'Increase your credibility', 'Branding and a website redesign.'),
    ('D', 'Let prospects and investors see the proof', 'Business case tools on your website.'),
    ('E', 'Optimise your inbound and outbound flow', 'Website forms, a CRM and outreach.'),
    ('F', 'AI helpers', 'AI tools that do the weekly reading and drafting.'),
]

SET_MENUS = [
    ('SM1', 'Investor ready', 'For the raise', 'Oct to Nov 2026, four weeks',
     'Make the proof investors look for easy to find, with one set of numbers behind it.', True),
    ('SM2', 'Look the part', 'For buyers and investors', 'Nov 2026 to Feb 2027',
     'Look like the equipment supplier you are, on the site and in every document.', False),
    ('SM3', 'Pipeline', 'For plant leads', 'Dec 2026 to Mar 2027',
     'Turn interest from plants into enquiries you can count and follow up.', False),
    ('SM4', 'Pilot and seed', 'For the demonstrator and the seed round', 'Jan to Sep 2027',
     'Collect the demonstrator evidence, tell the story when it’s in, and get ready for the seed round.', False),
]

MONTHLY = [
    ('Care', 650, 'Keeps the calculator, the funding finder and the AI helpers running and up to date, plus small changes to the site.'),
    ('Content', 650, 'The monthly thirty minute interview turned into a month of LinkedIn posts (C8).'),
    ('Outbound', 1300, 'Campaigns to screened sites, written and run by us (E5).'),
]

# code, name, what it is, what you get, what changes, origin, days, set menu (or None for a la carte),
# [(start, end)] windows (empty means any time), concept links [(label, url)], note for Josh
ITEMS = [
    # A
    ('A1', 'The fix list', 'Twelve fixes to your current site, two of them legal.',
     'The list, checked on your live site on 25 September 2026, with what to change and where.',
     'You can make the quick fixes yourselves this week.',
     'Astra', 0, None, [('2026-10-05', '2026-10-09')],
     [('The fix list', ASTRA + '/fixes')],
     'Free. Port the twelve items from Appendix C. Recheck each one on the live site the day the page ships, Sanya planned to fix titles and SEO herself.'),
    ('A2', 'We make the fixes', 'We make the twelve fixes in your Framer site.',
     'Titles, alt text, headings, the spec table as real text, structured data for search, and analytics set up.',
     'Search engines and screen readers can read every page, and nobody at HotGreen spends an afternoon on it.',
     'Both', 2, None, [('2026-10-12', '2026-10-16')],
     [('Spec table as text', JOSH + '/site/solutions')],
     'Your Foundation fixes, minus the legal pages, which are now A3. Optional, Sanya said she would try the quick fixes herself.'),
    ('A3', 'Legal pages and company details', 'The pages a UK company website needs.',
     'A privacy notice linked from every form, a cookie policy and banner, website terms, an accessibility statement, and your company details in the footer. Drafts for your lawyer to approve.',
     'The two legal gaps on the fix list are closed.',
     'Both', 2, 'SM1', [('2026-10-12', '2026-10-23')],
     [('Privacy policy', JOSH + '/site/privacy'), ('Cookie policy', JOSH + '/site/cookies')],
     'Your Legal drafts. Fill the company number and registered office from Appendix B.'),
    # B
    ('B1', 'One set of numbers', 'A shared fact sheet.',
     'Every public figure agreed once with your engineers, with its basis and date written beside it. The site, the decks, LinkedIn and the calculator all use it.',
     'Three savings figures become one, with its basis.',
     'Both', 2, 'SM1', [('2026-10-12', '2026-10-16')],
     [('Example screen', ASTRA + '/img/ex/numbers.webp')],
     'Your Numbers sheet. It has no concept page yet, link our screen or build one.'),
    ('B2', 'Homepage proof', 'A new homepage story.',
     'Your backers named in words, a dated timeline from founding to first deliveries, and how the HotStack works in one diagram.',
     'An investor finds the technology, the traction and the company without leaving the page.',
     'Both', 4, 'SM1', [('2026-10-19', '2026-10-30')],
     [('Home', JOSH + '/site')],
     'Your Website upgrade, homepage part. Apply the milestone fixes in section 5.'),
    ('B3', 'Investor page', 'A page just for investors, with a request form.',
     'Who backs you, your stage, the investment case, and a form that goes straight to Georgia. The deck goes out on request.',
     'Investors get their own route instead of the form everyone shares.',
     'Both', 3, 'SM1', [('2026-10-19', '2026-10-30')],
     [('Investors', JOSH + '/site/investors')],
     ''),
    ('B4', 'News and press', 'A news page and a press kit.',
     'Every article about HotGreen so far, approved company facts, logos and photos, and a press contact.',
     'The coverage that already exists lives on your own site.',
     'Both', 3, 'SM1', [('2026-10-26', '2026-11-06')],
     [('News', JOSH + '/site/news')],
     ''),
    ('B5', 'Monthly update page', 'A public version of Georgia’s monthly investor email.',
     'A page and a short template. Each month the private email gets a short public post.',
     'A dated post every month from now to the seed round, taken from an email she already writes.',
     'Astra', 2, 'SM1', [('2026-11-02', '2026-11-06')],
     [('Example screen', ASTRA + '/img/ex/monthly.webp')],
     'New to your site. Build a concept page at /site/updates in the same style as News.'),
    ('B6', 'Seed deck and one pager', 'Your investor deck in your brand.',
     'A seed deck with an editable master, a one page investor summary and a short update deck.',
     'Every investor document tells the same story with the same numbers.',
     'Josh', 6, 'SM1', [('2026-10-19', '2026-11-06')],
     [('Seed deck', JOSH + '/collateral/deck'), ('One pager', JOSH + '/collateral/one-pager')],
     'Your Deck design.'),
    ('B7', 'Data room and investor tracker', 'A seed data room with tracked access.',
     'Folders and an index ready for your lawyers and accountants to fill, a simple investor tracker and an update template.',
     'Diligence runs from one link, and you see which investor read what.',
     'Both', 3, 'SM4', [('2027-06-07', '2027-06-18')],
     [('Example screen', ASTRA + '/img/ex/dataroom.webp')],
     'Our Data room plus your Investor ops.'),
    ('B8', 'Demonstrator evidence plan', 'What each approver needs to see from the demonstrator.',
     'Before the install, a one page list per approver, from engineering to finance, of the data to collect.',
     'The demonstrator collects the evidence investors and buyers will ask for.',
     'Astra', 2, 'SM4', [('2027-01-11', '2027-01-22')],
     [('Example screen', ASTRA + '/img/ex/evidence.webp')],
     ''),
    ('B9', 'Demonstrator results page', 'The results page, once the unit runs.',
     'A page with the results each approver asked for, with live data if CCEP agrees.',
     'Anyone signing off an order or an investment sees the evidence in one place.',
     'Astra', 3, 'SM4', [('2027-06-07', '2027-07-02')],
     [('Example screen', ASTRA + '/img/ex/evidence.webp')],
     'Starts when the first data arrives. The bar is a planning estimate.'),
    ('B10', 'Pilot and fleet dashboard', 'A live dashboard for installed units.',
     'COP, uptime and CO₂ avoided per site, a private view for the data room and a public highlights view.',
     'Every installed HotStack keeps proving itself.',
     'Josh', 10, None, [('2027-07-05', '2027-08-13')],
     [('Dashboard', JOSH + '/tools/dashboard')],
     'Shown with simulated data, keep saying so.'),
    # C
    ('C1', 'Positioning and message', 'A workshop and a short message guide.',
     'One clear line on what HotGreen makes and who it’s for, the proof ranked behind it, and the mission on top. Built from your brand guidelines.',
     'Every page, deck and post tells the same story.',
     'Astra', 5, 'SM2', [('2026-11-16', '2026-11-27')],
     [('Example screen', ASTRA + '/img/ex/positioning.webp')],
     'Run with Luna, per the debrief. Do not name Luna in client copy unless Raka says so.'),
    ('C2', 'New look in Framer', 'A redesign of the pages you choose.',
     'New layouts built inside your Framer site, from the concept pages you’ve seen here. You keep editing them yourselves.',
     'The site looks like the equipment supplier you are.',
     'Both', 10, 'SM2', [('2027-01-04', '2027-01-29')],
     [('The concept site', JOSH + '/site')],
     'Your whole concept site is the example for this item.'),
    ('C3', 'Product pages and datasheets', 'A page and a datasheet for each HotStack model.',
     'HotStack 120 and 220 pages with the specs as real text, a PDF datasheet each, and a page per application, pasteurisation, brewing, distillation, drying and sterilisation.',
     'A plant engineer can read, search and download the specs, which today sit inside one image.',
     'Both', 6, 'SM2', [('2027-01-18', '2027-02-05')],
     [('Solutions', JOSH + '/site/solutions')],
     ''),
    ('C4', 'Working with HotGreen', 'A page for procurement teams.',
     'Company details, the warranty and service approach, spares, the certification route and how an install runs.',
     'Finance, legal and procurement find their answers before they need a call.',
     'Astra', 2, 'SM2', [('2027-02-01', '2027-02-12')],
     [('Example screen', ASTRA + '/img/ex/working.webp')],
     'New to your site. Build a concept page at /site/working-with-us.'),
    ('C5', 'Product visuals', 'Two diagrams you can use everywhere.',
     'How the HotStack works, and a boiler against HotStack comparison, as web graphics and slides.',
     'The idea lands in seconds, on the site and in every deck.',
     'Josh', 3, 'SM2', [('2026-11-30', '2026-12-11')],
     [('How it works', JOSH + '/site')],
     ''),
    ('C6', 'Careers page', 'A page for the people you’re hiring.',
     'Open roles, how you work and what you offer, with an application form.',
     'Engineers see a company worth joining.',
     'Josh', 1, None, [],
     [('Careers', JOSH + '/site/careers')],
     'Their workshop is in Datchet, per their job ad. Mark any location as a placeholder.'),
    ('C7', 'Sales deck and technical brief', 'Documents for plant buyers.',
     'A customer sales deck, a technical brief for engineers and a one page summary for the finance director, as templates with first drafts written with you.',
     'Every buyer gets the right document for their role.',
     'Josh', 6, 'SM3', [('2027-02-15', '2027-03-05')],
     [('Sales deck', JOSH + '/collateral/sales-deck')],
     'Your Customer sales deck plus Technical brief and CFO summary. Remove the IETF slide content, section 5.'),
    ('C8', 'LinkedIn content engine', 'A monthly posting plan and templates.',
     'Post and carousel templates in your brand, the first month of posts, and a monthly thirty minute interview we turn into posts. You post them yourselves.',
     'The company page and Georgia’s profile carry every milestone as it happens.',
     'Both', 4, 'SM3', [('2026-12-07', '2026-12-18')],
     [('Carousels', JOSH + '/collateral/carousels'), ('Posts', JOSH + '/collateral/posts')],
     'Setup price only. The monthly interview is the Content option, EUR 650 a month.'),
    ('C9', 'Pilot story', 'The demonstrator story, told when the results are in.',
     'A case study page, a press release, a LinkedIn campaign and media outreach, subject to CCEP’s approval. A short video is optional and priced separately.',
     'The results reach investors and buyers in the months before the seed round.',
     'Josh', 8, 'SM4', [('2027-07-05', '2027-07-30')],
     [('Social images', JOSH + '/collateral/social')],
     'Your Case study and press release plus Pilot video and LinkedIn campaign. Video filming is not in the price.'),
    # D
    ('D1', 'Savings and CO₂ calculator', 'A smaller version of your business case model, on your site.',
     'Steam demand, hours, country and the customer’s own energy prices go in. Cost, carbon and payback come out, with every assumption shown. Default prices come from official statistics for each country.',
     'A prospect sees their own numbers, and you get an enquiry with steam data attached.',
     'Both', 8, 'SM3', [('2026-12-07', '2027-01-29')],
     [('Calculator', JOSH + '/tools/calculator')],
     'Add the country switch, section 5. Runs on their model once they share it.'),
    ('D2', 'Steam demand estimator', 'Start from the gas bill.',
     'A plant enters its yearly gas use and gets its steam demand in MW and the number of HotStack modules.',
     'Plants that don’t know their steam demand can still get a number.',
     'Josh', 2, None, [('2027-02-15', '2027-03-12')],
     [('Estimator', JOSH + '/tools/estimator')],
     'Pairs with D1.'),
    ('D3', 'Fit check', 'Seven questions and a clear answer.',
     'A scored result with the main reasons and a next step. Every answer can go to your CRM.',
     'Your engineers spend their time on sites that fit.',
     'Josh', 2, None, [('2027-02-15', '2027-03-12')],
     [('Fit check', JOSH + '/tools/fit-check')],
     ''),
    ('D4', 'HotStack configurator', 'Size an installation in a minute.',
     'Modules stack from 0.5 MW to 10 MW on screen, with the grid connection each size needs.',
     'A buyer sees what their installation looks like before the first call.',
     'Josh', 3, None, [('2027-02-15', '2027-03-12')],
     [('Configurator', JOSH + '/tools/configurator')],
     ''),
    ('D5', 'Savings report', 'A branded report for each plant.',
     'A PDF made from the calculator inputs, for your engineers to check and send.',
     'Every serious enquiry leaves with a document for its board.',
     'Josh', 4, None, [('2027-02-15', '2027-03-12')],
     [('Report', JOSH + '/tools/report')],
     'Your ROI report generator. Replace the IETF row, section 5.'),
    ('D6', 'Funding finder', 'The support a customer can claim, by country.',
     'Country, company size and project size go in. The matching schemes come out, each with the date it was last checked.',
     'The first question after payback gets answered on the spot.',
     'Both', 5, 'SM3', [('2027-01-18', '2027-02-12')],
     [('Example screen', ASTRA + '/img/ex/funding.webp')],
     'Our Funding finder plus your Subsidy finder idea. Seed it with Appendix A.'),
    ('D7', 'EU heat auction guide', 'A one page guide to the €1bn EU heat auction.',
     'What the auction pays, who can bid, and how a food or drink plant bids with a HotStack, plus a technical sheet with your COP and capacity.',
     'Your EU prospects hear about it from you before it opens in early December.',
     'Astra', 2, None, [('2026-10-19', '2026-10-30')],
     [('Example screen', ASTRA + '/img/ex/auction.webp')],
     'Time critical, it has to exist before the auction opens. Facts in Appendix A.'),
    ('D8', 'Country funding guides', 'A guide for each market you sell in.',
     'Web pages and PDFs for the Netherlands and the UK first, more on request, each with the date it was checked.',
     'Prospects build the business case with support already in it.',
     'Both', 3, None, [],
     [],
     'Your Subsidy guides. UK is capital allowances, not IETF. Facts in Appendix A.'),
    ('D9', 'Technology comparison', 'An honest comparison of the options for steam.',
     'Gas boiler, electric boiler, electrode boiler with storage and HotStack, side by side.',
     'Buyers see where the HotStack wins and why.',
     'Josh', 2, None, [], [], 'Idea, no concept yet.'),
    ('D10', 'Carbon cost scenarios', 'What steam from gas could cost over ten years.',
     'The cost of steam from gas under different carbon prices, year by year.',
     'Finance teams see the risk of staying on gas.',
     'Josh', 3, None, [], [], 'Idea, no concept yet.'),
    # E
    ('E1', 'Enquiry routes and pilot programme page', 'The right form for every visitor.',
     'Separate routes for plants, investors, partners, careers and press, and a pilot programme page with a qualification form.',
     'Each enquiry reaches the right person with the right details, and the waitlist becomes a number.',
     'Both', 3, 'SM3', [('2026-12-07', '2026-12-18')],
     [('Contact', JOSH + '/site/contact'), ('Pilot programme', JOSH + '/site/pilot')],
     ''),
    ('E2', 'Site assessment tool', 'An internal tool for your engineers.',
     'An enquiry’s steam demand, temperatures, hours and metering data go in, your sizing and business case model runs on it, and a first draft comes out for an engineer to check.',
     'Your engineer checks a draft instead of building one. We measure the hours it saves.',
     'Astra', 10, None, [('2027-03-29', '2027-05-07')],
     [('Example screen', ASTRA + '/img/ex/assessment.webp')],
     ''),
    ('E3', 'CRM setup', 'A CRM set up around sites.',
     'HubSpot or the CRM you prefer, with each site tracked by boiler age, planned shutdowns and budget dates, lead routing and a short follow up sequence.',
     'Every site in the pipeline has its next date.',
     'Both', 4, 'SM3', [('2027-02-01', '2027-02-12')],
     [('Example screen', ASTRA + '/img/ex/tracker.webp')],
     ''),
    ('E4', 'Target list', 'A researched list of plants to approach.',
     'Built from public registers. The UK emissions trading register alone lists 68 food and drink sites run by 50 companies. Screened with your engineers for temperature and fuel.',
     'A ready list for the day outbound starts.',
     'Astra', 4, 'SM4', [('2027-06-21', '2027-07-02')],
     [('Example screen', ASTRA + '/img/ex/targets.webp')],
     'The 68 by type is in Appendix A.'),
    ('E5', 'Outbound, run by us', 'Campaigns written and run by us.',
     'Messages to screened sites, inside each country’s rules, once there’s data from the demonstrator.',
     'Meetings with plants that fit.',
     'Astra', 3, 'SM4', [('2027-07-05', '2027-07-16')],
     [('Example screen', ASTRA + '/img/ex/outbound.webp')],
     'Setup price only. Running it is the Outbound option, EUR 1,300 a month.'),
    ('E6', 'Search plan', 'How plants and investors find you.',
     'Keyword research, a site structure for applications and funding guides, and a six month content plan your team can run.',
     'Engineers searching for electric steam find HotGreen.',
     'Josh', 3, None, [], [], 'Your SEO and AI search plan idea.'),
    ('E7', 'Dutch and German versions', 'Your key pages in Dutch and German.',
     'Key pages, the calculator and the national funding guides, when you start selling in the Netherlands and Germany.',
     'Plants read about the HotStack in their own language.',
     'Josh', 6, None, [], [], 'Later. Idea, no concept yet.'),
    # F
    ('F1', 'Regulation and funding digest', 'A weekly email.',
     'Official UK and EU sources checked every week and summarised in one email, plus a dated regulation page on your site.',
     'Scope 1 to 3, ETS and funding changes reach you without anyone going looking.',
     'Astra', 4, None, [('2027-03-01', '2027-03-26')],
     [('Example screen', ASTRA + '/img/ex/digest.webp')],
     'Needs the Care option to keep running.'),
    ('F2', 'Competitor watch', 'A monthly email.',
     'New products, patents and grants from the companies you compete with.',
     'A competitor’s launch reaches you the month it happens.',
     'Astra', 3, None, [('2027-03-22', '2027-04-02')],
     [('Example screen', ASTRA + '/img/ex/watch.webp')],
     'Needs the Care option to keep running.'),
    ('F3', 'Content helper', 'A drafting tool for posts and articles.',
     'News items, LinkedIn posts and search articles drafted from your agreed numbers and the digest. You approve every piece.',
     'Regular posts without starting from a blank page.',
     'Both', 4, None, [('2027-04-05', '2027-04-23')],
     [('Example screen', ASTRA + '/img/ex/content.webp')],
     'Our Content helper plus your Founder content service idea.'),
    ('F4', 'Investor update helper', 'Georgia’s monthly email, drafted from a short form.',
     'A draft of the investor email and its public version, made at the same time.',
     'Her monthly update starts from a draft.',
     'Astra', 2, None, [('2027-03-08', '2027-03-19')],
     [('Example screen', ASTRA + '/img/ex/update.webp')],
     ''),
    ('F5', 'Technical question assistant', 'Answers for engineers and investors.',
     'An assistant that answers only from your approved documents and hands over to a person when it can’t.',
     'Common technical questions get answered at any time of day.',
     'Josh', 5, None, [], [], 'Your Technical Q&A assistant idea.'),
    ('F6', 'Grant writing assistant', 'Drafts for grant applications.',
     'Applications drafted from your approved text blocks. You stay the author.',
     'Each application starts from your best previous answers.',
     'Josh', 4, None, [], [], 'Idea, no concept yet.'),
    ('F7', 'Prospect signal alerts', 'A weekly alert when a target plant shows a buying signal.',
     'Changes in the emissions trading registers, and capex or sustainability news at your target companies, checked every week and added to your CRM.',
     'You hear about a plant planning a change while there’s still time to talk.',
     'Astra', 4, None, [('2027-07-19', '2027-07-30')], [],
     'From the opportunities map, F5. Only worth it once outbound starts. No concept yet, show the Idea tag. Needs the Care option to keep running.'),
]

# name, start, end (None for a point), certainty note, source
MILESTONES = [
    ('SDE++ round, Netherlands', '2026-10-27', '2026-11-26', 'fixed', 'RVO, rvo.nl SDE++ aanvragen'),
    ('EU heat auction opens, early December', '2026-12-01', '2026-12-11', 'expected', 'European Commission news, 24 Sep 2026'),
    ('Demonstrator goes in, first half of 2027', '2027-01-04', '2027-06-30', 'window', 'Sanya, call of 24 Sep 2026'),
    ('Innovate UK project ends', '2027-05-31', None, 'fixed', 'UKRI GtR 10192195'),
    ('Seed round, around Q3 2027', '2027-07-01', '2027-09-30', 'window', 'Sanya, call of 24 Sep 2026'),
]


def price(days):
    return int(round(days * RATE / 250.0) * 250)


def d(s):
    return dt.date.fromisoformat(s)


def build():
    items = []
    for code, name, what, get, change, origin, days, sm, wins, links, note in ITEMS:
        for a, b in wins:
            assert d(a).weekday() == 0 and d(b).weekday() == 4 and d(a) <= d(b), (code, a, b)
        items.append(dict(code=code, family=code[0], name=name, what=what, get=get, changes=change,
                          origin=origin, days=days, price_eur=price(days), set_menu=sm,
                          windows=[dict(start=a, end=b) for a, b in wins], links=[dict(label=l, url=u) for l, u in links],
                          note_for_josh=note))
    codes = [i['code'] for i in items]
    assert len(codes) == len(set(codes)) == 46
    menus = []
    for sid, name, who, when, line, rec in SET_MENUS:
        its = sorted([i for i in items if i['set_menu'] == sid], key=lambda i: (i['windows'][0]['start'], i['code']))
        menus.append(dict(id=sid, name=name, for_whom=who, when=when, line=line, recommended=rec,
                          items=[i['code'] for i in its], days=sum(i['days'] for i in its),
                          price_eur=sum(i['price_eur'] for i in its),
                          start=min(w['start'] for i in its for w in i['windows']),
                          end=max(w['end'] for i in its for w in i['windows'])))
    return items, menus


CLIENT_FIELDS = ('name', 'what', 'get', 'changes')
BANNED = re.compile(r'\b(delve|leverage|utili[sz]e|harness|unlock|unleash|empower|elevate|streamline|seamless|robust|'
                    r'cutting edge|state of the art|best in class|world class|bespoke|holistic|innovative|groundbreaking|'
                    r'comprehensive|meticulous|curated|pivotal|crucial|paramount|impactful|scalable|turnkey|landscape|'
                    r'ecosystem|realm|synergy|furthermore|moreover|additionally|ultimately|essentially|journey|ensure|'
                    r'potential|opportunit\w*|simply|actually|really|genuinely)\b', re.I)
HYPHEN_OK = ('Coca-Cola',)


def copy_problems(text):
    probs = []
    t = text
    for ok in HYPHEN_OK:
        t = t.replace(ok, '')
    if ':' in t:
        probs.append('colon')
    if re.search('[‒–—―]', t):
        probs.append('dash')
    if re.search(r'\w-\w|\s-\s', t):
        probs.append('hyphen')
    m = BANNED.search(t)
    if m:
        probs.append('banned word ' + m.group(0))
    return probs


def main():
    items, menus = build()
    bad = []
    for i in items:
        for f in CLIENT_FIELDS:
            p = copy_problems(i[f])
            if p:
                bad.append((i['code'], f, p, i[f]))
    for m in menus:
        for f in ('name', 'for_whom', 'when', 'line'):
            p = copy_problems(m[f])
            if p:
                bad.append((m['id'], f, p, m[f]))
    for b in bad:
        print('COPY PROBLEM', b)
    assert not bad
    data = dict(generated=dt.date.today().isoformat(), assumed_start=START, day_rate_eur=RATE,
                price_rule='effort days x EUR 450, rounded to the nearest EUR 250, excluding VAT',
                families=[dict(letter=a, name=b, line=c) for a, b, c in FAMILIES],
                set_menus=menus, monthly=[dict(name=a, eur_per_month=b, what=c) for a, b, c in MONTHLY],
                milestones=[dict(name=a, start=b, end=c, certainty=e, source=f) for a, b, c, e, f in MILESTONES],
                items=items)
    with open(os.path.join(HERE, 'items.json'), 'w') as f:
        json.dump(data, f, ensure_ascii=False, indent=1)
    print('items', len(items), 'menus', [(m['id'], m['price_eur'], m['start'], m['end']) for m in menus])
    print('a la carte total', sum(i['price_eur'] for i in items if not i['set_menu']))
    print('everything total', sum(i['price_eur'] for i in items))
    return data


if __name__ == '__main__':
    main()
