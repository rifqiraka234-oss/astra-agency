#!/usr/bin/env python3
"""HotGreen proposal page, version 3. Seven numbered steps, one idea each, six parts that open into
full size examples. Writes out/index.html and out/fixes.html.

Facts, sources and checks are in ../evidence-ledger.md. The design rules are in DESIGN-v3.md.
The example screens come from mocks.py through render_all.sh.
"""
import html, os, shutil

HERE = os.path.dirname(os.path.abspath(__file__))
A = os.path.join(HERE, 'assets')
OUT = os.path.join(HERE, 'out')
MAIL = 'rifqiraka234@gmail.com'
E = html.escape


def read(p):
    with open(os.path.join(A, p), encoding='utf-8') as f:
        return f.read()


MARK = ('<svg class="astra-mark" viewBox="0 0 48 48" fill="none" aria-hidden="true"><path d="M24 3 L45 45 H3 Z" '
        'stroke="url(#ag)" stroke-width="2.4" stroke-linejoin="round"/><path d="M24 18 L34 39 H14 Z" fill="url(#ag2)"/>'
        '<defs><linearGradient id="ag" x1="3" y1="3" x2="45" y2="45"><stop stop-color="#ff7a45"/><stop offset="1" '
        'stop-color="#8fd14f"/></linearGradient><linearGradient id="ag2" x1="14" y1="18" x2="34" y2="39"><stop '
        'stop-color="#8fd14f"/><stop offset="1" stop-color="#cbab6e"/></linearGradient></defs></svg>')
FAVICON = ("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Crect width='48' "
           "height='48' rx='10' fill='%230a1016'/%3E%3Cpath d='M24 7 L42 42 H6 Z' fill='none' stroke='%23ff7a45' "
           "stroke-width='3' stroke-linejoin='round'/%3E%3Cpath d='M24 20 L32 37 H16 Z' fill='%238fd14f'/%3E%3C/svg%3E")

ON = 'Oct to Nov 2026'
DF = 'Dec 2026 to Feb 2027'
MJ = 'Mar to Jun 2027'
JS_ = 'Jul to Sep 2027'

# letter, name, what it is, lead image, items (code, name, one line, when, image, what the picture is)
GROUPS = [
    ('A', 'We fix it', 'Fixes to your current website, free.', 'fixes', [
        ('A', 'The fix list', 'Twelve fixes to your current site, two of them legal. We give you the list, or make the changes for you.', ON, 'fixes', 'Your live site, checked 25 September 2026'),
    ]),
    ('B', 'Investor proof', 'A website update for investors.', 'homeproof', [
        ('B1', 'One set of numbers', 'Every public figure agreed once with your engineers, with its basis written down.', ON, 'numbers', 'Real data, the numbers you publish today'),
        ('B2', 'Homepage proof', 'Your backers named, a dated timeline, and the demonstrator as it is today.', ON, 'homeproof', 'Sketch, filled with your real facts'),
        ('B3', 'Investor page', 'Who backs you, your stage, and a form that goes straight to Georgia.', ON, 'investor', 'Sketch, filled with your real facts'),
        ('B4', 'Press kit', 'Every article about HotGreen so far, plus approved facts, logos and photos.', ON, 'press', 'Sketch, with the real articles'),
        ('B5', 'Monthly update page', 'A short public version of Georgia’s monthly investor email.', ON, 'monthly', 'Example layout'),
        ('B6', 'Demonstrator results page', 'What each approver needs to see, then the results once the unit runs.', DF + ', then ' + JS_, 'evidence', 'Sketch'),
        ('B7', 'Data room', 'Folders for the seed round, and you see which investor read what.', JS_, 'dataroom', 'Example data'),
    ]),
    ('C', 'Increase your credibility', 'Branding and a website redesign.', 'product', [
        ('C1', 'Positioning and message', 'A workshop and a short guide. One clear line on what HotGreen makes and who it’s for.', DF, 'positioning', 'Example'),
        ('C2', 'New look in Framer', 'New layouts for the pages you choose. You still edit them yourselves.', DF, 'lookfeel', 'Sketch, next to your homepage today'),
        ('C3', 'Product pages and datasheets', 'A page and a PDF datasheet for each HotStack model, with the specs as text.', DF, 'product', 'Sketch, with your real specs'),
        ('C4', 'Working with HotGreen', 'Warranty, service, spares and how an install works, for procurement teams.', DF, 'working', 'Sketch'),
        ('C5', 'LinkedIn plan, on the side', 'A monthly posting plan with drafts. You post them yourselves.', ON, 'linkedin', 'Example draft'),
    ]),
    ('D', 'Let prospects and investors see the proof', 'A business case web app on your site.', 'calculator', [
        ('D1', 'Savings calculator', 'A smaller version of your business case model. A customer enters their site and prices, and sees cost, carbon and payback.', DF, 'calculator', 'Sketch. The figures would come from your model'),
        ('D2', 'Funding finder', 'The grants a customer can claim in their country, with the date each one was checked.', DF, 'funding', 'Sketch, with real schemes'),
        ('D3', 'EU heat auction guide', 'A one page guide for EU prospects. The €1bn auction is expected to open in early December.', ON, 'auction', 'Sketch, with the real rules'),
    ]),
    ('E', 'Optimise your inbound and outbound flow', 'Website forms, a CRM and outreach.', 'assessment', [
        ('E1', 'Enquiry forms', 'Separate forms for investors, site assessments, customers, partners and press.', DF, 'routes', 'Sketch'),
        ('E2', 'Site assessment tool', 'Enquiries arrive with steam data. Your model drafts, your engineer checks. We’d measure the hours it saves.', MJ, 'assessment', 'Example data'),
        ('E3', 'Pipeline tracker', 'A CRM built around sites, with boiler age, shutdowns and budget dates.', MJ, 'tracker', 'Example data'),
        ('E4', 'Target list', 'The UK emissions trading register alone lists 68 food and drink sites run by 50 companies.', JS_, 'targets', 'Real data'),
        ('E5', 'Outbound', 'Once there’s data from the demonstrator, we write and run the campaigns.', JS_, 'outbound', 'Example'),
    ]),
    ('F', 'AI helpers', 'AI tools that do the weekly reading and drafting.', 'digest', [
        ('F1', 'Regulation and funding digest', 'A weekly email on Scope 1 to 3, ETS and funding changes.', MJ, 'digest', 'Example issue, with real 2026 items'),
        ('F2', 'Competitor watch', 'A monthly email on competitors’ products, patents and grants.', MJ, 'watch', 'Example'),
        ('F3', 'Content helper', 'Drafts posts and articles from your agreed numbers. You approve each one.', MJ, 'content', 'Example drafts'),
        ('F4', 'Investor update helper', 'Drafts Georgia’s monthly investor email from a short form.', MJ, 'update', 'Example'),
    ]),
]
assert sum(len(g[4]) for g in GROUPS) == 25

# period, what's happening, (letter, which items)
WHEN = [
    (ON, 'Before the demonstrator goes in', [('A', 'The fix list'), ('B', 'B1 to B5'), ('C', 'C5, LinkedIn plan'), ('D', 'D3, heat auction guide')]),
    (DF, 'The EU heat auction, expected to open in early December', [('B', 'B6, demonstrator plan'), ('C', 'C1 to C4'), ('D', 'D1 and D2'), ('E', 'E1, enquiry forms')]),
    (MJ, 'The demonstrator, planned for the first half of 2027', [('E', 'E2 and E3'), ('F', 'F1 to F4')]),
    (JS_, 'The seed round, planned for around Q3', [('B', 'B6 results, B7 data room'), ('E', 'E4 and E5')]),
]
STEPS = [('s1', 'Where you are'), ('s2', 'What we found'), ('s3', 'What we’d build'), ('s4', 'When'),
         ('s5', 'Where to start'), ('s6', 'Who we are'), ('s7', 'Next step')]
NAME = {g[0]: g[1] for g in GROUPS}
SHORT = {'A': 'Fixes', 'B': 'Investor proof', 'C': 'Credibility', 'D': 'Proof for prospects', 'E': 'Inbound and outbound', 'F': 'AI helpers'}

WORK = [
    ('w-pertamina.jpg', 'Two screens from the Pertamina drilling calculator app', 'Pertamina, drilling engineering app',
     '470 drilling engineering formulas rebuilt as a phone calculator that works offline, for engineers on offshore rigs.'),
    ('w-worldbank.jpg', 'The eHDW dashboard with village counts and service scores', 'World Bank, stunting monitoring',
     'An app and dashboard for the World Bank and a national ministry that collects child health data across a whole country, online or offline.'),
    ('w-bango.jpg', 'The Bango app on three phones, with a map of nearby street food stalls', 'Unilever, Bango app',
     'A street food finder for Unilever’s Bango brand on iPhone, Android and BlackBerry. It won Gold for Mobile App and Best in Show at the 2015 MMA Smarties.'),
]


def label(n, text):
    return f'<div class="label rv"><span class="num">{n}</span><span>{E(text)}</span></div>'


def nxt(href, text):
    return f'<a class="next rv" href="#{href}">{E(text)} <span aria-hidden="true">↓</span></a>'


def tile(g):
    letter, name, what, lead, items = g
    return (f'<article class="tile g{letter} rv" data-g="{letter}" data-name="{E(name)}">'
            f'<button class="shot" type="button" data-open="{letter}" aria-label="See {E(name)}"><img src="img/ex/{lead}.webp" alt="" loading="lazy"></button>'
            f'<div class="body"><div class="top"><span class="letter">{letter}</span><h3>{E(name)}</h3></div>'
            f'<p class="what">{E(what)}</p>'
            f'<div class="acts"><button class="btn sm" type="button" data-open="{letter}">See it</button>'
            f'<button class="add" type="button" data-pick="{letter}" aria-pressed="false"><span class="tick" aria-hidden="true"></span><span class="t-off">Add</span><span class="t-on">Added</span></button></div></div></article>')


def dialog(g):
    letter, name, what, lead, items = g
    rows = ''.join(
        f'<button class="item" type="button" aria-pressed="false" data-src="img/ex/{img}.webp" data-alt="{E(n)}, example screen" '
        f'data-title="{E(c + " " + n if c != "A" else n)}" data-kind="{E(kind)}"><span class="code">{E(c)}</span>'
        f'<span><span class="ih">{E(n)}</span><span class="ip">{E(line)}</span><span class="when">{E(when)}</span></span></button>'
        for c, n, line, when, img, kind in items)
    extra = ('<a class="btn sm" href="fixes.html">Open the full fix list</a>' if letter == 'A' else '')
    return (f'<dialog id="dlg-{letter}" class="g{letter}" aria-labelledby="dt-{letter}"><div class="dlg">'
            f'<div class="dhead"><span class="letter">{letter}</span><div><h3 id="dt-{letter}">{E(name)}</h3><p>{E(what)}</p></div>'
            '<button class="x" type="button" data-close aria-label="Close">×</button></div>'
            f'<div class="dbody"><div class="viewer"><div class="frame"><div class="chrome"><i></i><i></i><i></i></div>'
            f'<img src="img/ex/{lead}.webp" alt="" loading="lazy"></div><p class="cap"></p><a class="full" href="img/ex/{lead}.webp" target="_blank" rel="noopener">Open full size</a></div>'
            f'<div class="items">{rows}</div></div>'
            f'<div class="dfoot"><button class="add" type="button" data-pick="{letter}" aria-pressed="false"><span class="tick" aria-hidden="true"></span>'
            f'<span class="t-off">Add {letter} to my list</span><span class="t-on">{letter} is on my list</span></button>{extra}<span class="sp"></span>'
            '<button class="btn sm ghost" type="button" data-close>Close</button></div></div></dialog>')


def when_block():
    cols = ''
    for dates, what, chips in WHEN:
        ch = ''.join(f'<button class="gchip g{l}" type="button" data-open="{l}"><span class="letter">{l}</span><span>{E(SHORT[l])}<small>{E(t)}</small></span></button>' for l, t in chips)
        cols += f'<div class="period rv"><span class="dates">{E(dates)}</span><h3>{E(what)}</h3>{ch}</div>'
    return f'<div class="when4">{cols}</div>'


def page(title, desc, body, script=True):
    return ('<!doctype html>\n<html lang="en-GB">\n<head>\n<meta charset="utf-8">\n'
            '<meta name="viewport" content="width=device-width,initial-scale=1">\n'
            f'<title>{E(title)}</title>\n<meta name="description" content="{E(desc)}">\n'
            '<meta name="robots" content="noindex,nofollow">\n'
            f'<link rel="icon" href="{FAVICON}">\n'
            '<link rel="preload" href="fonts/plex-mono-500.woff2" as="font" type="font/woff2" crossorigin>\n'
            f'<style>{read("v3.css")}</style>\n</head>\n<body>\n{body}\n'
            + (f'<script>{read("v3.js")}</script>\n' if script else '') + '</body>\n</html>\n')


def index():
    steps = ''.join(f'<a href="#{i}"><b>{n}</b><span>{E(t)}</span></a>' for n, (i, t) in enumerate(STEPS, 1))
    facts = [('01', 'Seed round, planned for around Q3 2027', ''),
             ('02', 'First unit goes into a Coca-Cola Europacific Partners site in the first half of 2027', ''),
             ('03', '“a very credible and reliable equipment provider rather than a startup”', 'How you want HotGreen to come across, from our call on 24 September')]
    fl = ''.join(f'<div class="fact rv"><b>{a}</b><p>{E(b)}{f"<small>{E(c)}</small>" if c else ""}</p></div>' for a, b, c in facts)
    yes = ['CCEP’s 2025 annual report names HotGreen as one of its three startup investments',
           'Innovate UK funds a 50 kW demonstration at a CCEP site',
           'Empirical Ventures, Tech.eu and Vestbee covered the £1.2m raise']
    no = ['Backers shown as logos only, with no names',
          'No mention of the raise, the grant or the demonstrator',
          'The specs sit inside one image']
    ul = lambda xs: '<ul>' + ''.join(f'<li>{E(x)}</li>' for x in xs) + '</ul>'
    startsteps = [('B', 'B1', 'Agree one set of numbers with your engineers'),
                  ('B', 'B2 and B3', 'Put the proof on your homepage and add an investor page'),
                  ('D', 'D1', 'Build the savings calculator on the same numbers')]
    ss = ''.join(f'<div class="stepx g{l} rv"><b style="background:var(--c)">{i}</b><p>{E(t)}<small>{E(c)}</small></p></div>' for i, (l, c, t) in enumerate(startsteps, 1))
    needs = ['Your business case model, or the inputs behind it', 'Thirty minutes with an engineer to agree the numbers',
             'Access to Framer and your brand guidelines', 'What you can say in public about CCEP, the demonstrator and your investors']
    work = ''.join(f'<div class="wk rv"><div class="im"><img src="img/{f}" alt="{E(a)}" loading="lazy"></div><div class="tx"><h3>{E(t)}</h3><p>{E(p)}</p></div></div>' for f, a, t, p in WORK)
    body = f'''
<header class="bar"><a class="brand" href="#top">{MARK}<span>Astra Agency</span></a><nav class="steps" aria-label="Steps">{steps}</nav></header>

<section id="top" class="sec">
  <div class="photo kettle" aria-hidden="true"></div><div class="veil" aria-hidden="true"></div>
  <div class="wrap">
    <p class="kick">Proposal for HotGreen · September 2026</p>
    <h1 class="cover-h">Your proof is stronger than your <em>website</em>.</h1>
    <p class="cover-sub">Six things we can build for you, and when each one fits.</p>
    <div class="cover-row"><a class="btn" href="#s1">Start <span aria-hidden="true">↓</span></a><span>Prepared for Sanya Chhugani and Georgia Ware</span></div>
  </div>
</section>

<section id="s1" class="sec dark" data-step>
  <div class="wrap">
    <div class="split">
      <div>
        {label(1, 'Where you are')}
        <h2 class="h2 rv">Investors first. Customers are already coming in.</h2>
        <div class="facts">{fl}</div>
      </div>
      <div class="figure-photo rv"><img src="img/photo-fermenters.jpg" alt="" loading="lazy"></div>
    </div>
    {nxt('s2', 'Next, what we found')}
  </div>
</section>

<section id="s2" class="sec paper" data-step>
  <div class="wrap">
    {label(2, 'What we found')}
    <h2 class="h2 rv">Your best proof isn’t on your website.</h2>
    <div class="two">
      <div class="col yes rv"><h3><i aria-hidden="true">✓</i>Elsewhere online</h3>{ul(yes)}</div>
      <div class="col no rv"><h3><i aria-hidden="true">✕</i>On your website</h3>{ul(no)}</div>
    </div>
    <p class="also rv">The savings figure also changes with where you read it. It’s <b>30%</b> on your Solutions page, <b>40%</b> “compared to competitors” on LinkedIn, and <b>up to 50%</b> in Empirical’s announcement.</p>
    {nxt('s3', 'Next, what we’d build')}
  </div>
</section>

<section id="s3" class="sec deep" data-step>
  <div class="wrap">
    {label(3, 'What we’d build')}
    <h2 class="h2 rv">Six parts. Pick the ones you want.</h2>
    <p class="intro rv">Open any part to see what it looks like, then add it to your list.</p>
    <div class="tiles">{''.join(tile(g) for g in GROUPS)}</div>
    {nxt('s4', 'Next, when each part fits')}
  </div>
</section>

<section id="s4" class="sec paper" data-step>
  <div class="wrap">
    {label(4, 'When')}
    <h2 class="h2 rv">When each part fits.</h2>
    {when_block()}
    {nxt('s5', 'Next, where we’d start')}
  </div>
</section>

<section id="s5" class="sec dark" data-step>
  <div class="wrap">
    {label(5, 'Where to start')}
    <h2 class="h2 rv">Start with B and D.</h2>
    <p class="intro rv">They help with investors and customers at the same time, and they run on the same numbers.</p>
    <div class="startcard">
      <div class="stepsx">{ss}</div>
      <div class="needbox rv"><h3>What we’d need from you</h3><ul>{''.join(f'<li>{E(n)}</li>' for n in needs)}</ul></div>
    </div>
    {nxt('s6', 'Next, who we are')}
  </div>
</section>

<section id="s6" class="sec paper" data-step>
  <div class="wrap">
    {label(6, 'Who we are')}
    <h2 class="h2 rv">Astra and Amwisesa build it as one team.</h2>
    <p class="intro rv">The team behind Astra has shipped for Unilever, Pertamina and the World Bank. Astra runs the strategy and the project from the Netherlands, and Amwisesa, our development partner, builds.</p>
    <div class="work">{work}</div>
    <p class="disc rv">Built by Amwisesa, Astra’s development partner, often through the brand’s own agency. Screens are from Amwisesa’s credentials.</p>
    <div class="people">
      <div class="person rv"><h3>Raka Mulya</h3><span class="role">Go to market architect and entrepreneur</span><p>Led global ebusiness data and insights at Heineken across 23 markets, and ran global go to market for Betty Blocks, the low code platform. Now runs sales and channel operations at efficy, a European CRM company. He also founded a stroopwafel brand from nothing and scaled it. Your contact at Astra.</p><a href="https://www.linkedin.com/in/raka-mulya-b92885196/" rel="noopener" target="_blank">LinkedIn</a></div>
      <div class="person rv"><h3>Joshua van Zeelt</h3><span class="role">Founder of Astra Agency and JML Agency</span><p>Builds custom websites, software and apps from the first conversation to launch. Studied artificial intelligence at VU Amsterdam and holds an MSc in Strategic Entrepreneurship from RSM Erasmus. Spent seven years coordinating projects at Schiphol, where he helped develop an asset app that forecasts maintenance.</p><a href="https://www.linkedin.com/in/joshua-van-zeelt/" rel="noopener" target="_blank">LinkedIn</a></div>
    </div>
    {nxt('s7', 'Next, pick your parts')}
  </div>
</section>

<section id="s7" class="sec" data-step>
  <div class="photo tanks" aria-hidden="true"></div><div class="veil2" aria-hidden="true"></div>
  <div class="wrap">
    {label(7, 'Next step')}
    <h2 class="h2 rv">Pick your parts on a thirty minute call.</h2>
    <p class="intro rv">Tell us which parts you want, and we’ll send a price and a date for each.</p>
    <div class="pick rv"><h3>Your list</h3><div id="picked" class="picked"></div><p id="empty" class="empty">Nothing on it yet. Press Add on any part above.</p>
      <div class="acts"><a id="mail" class="btn" data-to="{MAIL}" href="mailto:{MAIL}?subject=HotGreen%20proposal">Email me</a><button id="clear" class="btn ghost" type="button" hidden>Clear the list</button></div></div>
  </div>
</section>

<footer>{MARK}<p>Astra Agency, prepared for HotGreen Solutions, September 2026<br>The product image and logo are HotGreen’s own. Photos from Unsplash.</p></footer>
{''.join(dialog(g) for g in GROUPS)}
'''
    return page('HotGreen x Astra, the proposal',
                'Six things Astra would build for HotGreen, what each looks like, and when each one fits.', body)


FIXES_LEGAL = [
    ('Your footer needs your company details',
     'A UK company has to show its registered name, company number, where it’s registered and its registered office on its website, under regulation 25 of the Company, Limited Liability Partnership and Business (Names and Trading Disclosures) Regulations 2015. The footer says “HotGreen™ Solutions is the trading name of HotGreen Ltd” and stops there. From Companies House, the line to add is HotGreen Ltd, registered in England and Wales, company number 16035994, registered office 167 to 169 Great Portland Street, 5th Floor, London W1W 5PF.'),
    ('Your contact form needs a privacy notice',
     'The form collects names and email addresses, so article 13 of the UK GDPR requires privacy information at the point you collect them, usually a privacy notice linked from the form. Since 19 June 2026 that notice also has to tell people they can complain to you about how their data is used, and you need an easy way for them to do it, such as a complaint form. The site has no privacy page today. The same page is the place to say the site uses Framer’s own analytics.'),
]
FIXES_REST = [
    ('Each page needs its own title',
     'You spotted this one and the next two on the call. Home, Solutions and Contact all use the title “HotGreen Solutions”, and so does the page not found screen.'),
    ('The images need alt text',
     'None of the 62 images across the three pages has any, including the seven partner logos and the seven team photos.'),
    ('The spec table works better as text',
     'The HotStack 120 and 220 comparison on the Solutions page is one image, so its numbers aren’t on the page as text and an engineer can’t search or copy them. A Framer table or a simple text grid will do.'),
    ('Your backers appear only as logos',
     'The homepage says “Some of our key funders and partners are” and then shows seven logos, with no names in the text.'),
    ('The contact form’s Message field shares a name with Last name',
     'Both are called “lastname”, so the two can arrive mixed up wherever submissions are sent on. Worth checking a recent submission. “First name” is also marked with an asterisk but isn’t required.'),
    ('Sera’s LinkedIn icon opens Ben’s profile',
     'The LinkedIn icon on Sera Evcimen’s card links to Ben Vellacott’s profile.'),
    ('The product name changes on a phone',
     'On a phone the Solutions page opens with “Introducing the HotStack 300”. On a laptop it says “Introducing the HotStack”, and the spec table names HotStack 120 and HotStack 220.'),
    ('The availability line needs a new date before January',
     'The spec table says “Currently taking 2026 orders for 2027 delivery”.'),
    ('The homepage video is heavy for a phone',
     'It’s a 19.4 MB file, which is a lot on mobile data. A shorter or compressed version, or a still image on phones, keeps the look.'),
    ('Your fonts can live in Framer',
     'The site loads its fonts from Google. Uploading them as custom fonts in Framer means a visitor’s browser never has to contact Google.'),
]


def fixes():
    def items(xs, start, cls):
        return ''.join(f'<div class="fxi {cls}"><span class="n">{i:02d}</span><div><h3>{E(t)}</h3><p>{E(p)}</p></div></div>'
                       for i, (t, p) in enumerate(xs, start))
    body = f'''
<header class="bar"><a class="brand" href="./">{MARK}<span>Astra Agency</span></a></header>
<section class="fixpage sec dark">
  <div class="wrap">
    <a class="back" href="./#s3">← Back to the proposal</a>
    <div class="label"><span class="num" style="background:var(--gA)">A</span><span>We fix it</span></div>
    <h1 class="h2">Twelve fixes for your website, two of them legal.</h1>
    <p class="intro">Free. Make them yourselves in Framer, or we’ll make them for you. Checked on the live site on 25 September 2026.</p>
    <p class="fxh">Two that are legal requirements</p>
    <div class="fx">{items(FIXES_LEGAL, 1, 'legal')}</div>
    <p class="fxh">The rest, in the order we’d do them</p>
    <div class="fx">{items(FIXES_REST, 3, '')}</div>
  </div>
</section>
<footer>{MARK}<p>Astra Agency, prepared for HotGreen Solutions, September 2026</p></footer>
'''
    return page('HotGreen x Astra, the fix list', 'Twelve fixes for hotgreensolutions.com, checked on 25 September 2026.', body, script=False)


def main():
    if os.path.isdir(OUT):
        shutil.rmtree(OUT)
    os.makedirs(OUT)
    os.makedirs(os.path.join(OUT, 'img'))
    keep = ['photo-kettle.jpg', 'photo-fermenters.jpg', 'photo-tanks.jpg', 'w-pertamina.jpg', 'w-worldbank.jpg', 'w-bango.jpg']
    for f in keep:
        shutil.copy(os.path.join(A, 'img', f), os.path.join(OUT, 'img', f))
    shutil.copytree(os.path.join(A, 'img', 'ex'), os.path.join(OUT, 'img', 'ex'))
    shutil.copytree(os.path.join(A, 'fonts'), os.path.join(OUT, 'fonts'))
    for name, fn in (('index.html', index), ('fixes.html', fixes)):
        with open(os.path.join(OUT, name), 'w', encoding='utf-8') as f:
            f.write(fn())
    with open(os.path.join(OUT, 'netlify.toml'), 'w') as f:
        f.write('[build]\n  publish = "."\n')
    print('built', sorted(os.listdir(OUT)), len(os.listdir(os.path.join(OUT, 'img', 'ex'))), 'examples')


if __name__ == '__main__':
    main()
