#!/usr/bin/env python3
"""Builds the HotGreen proposal page (v2, families A to F with a sketch for every piece)
and its fix list page into ./out.

Every fact on these pages is listed with its source in ../evidence-ledger.md.
python3 build.py copies ./assets into ./out and writes out/index.html and out/fixes.html.
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


LOGO = read('hg-logo.svgfrag').strip()

MARK = ('<svg class="astra-mark" viewBox="0 0 48 48" fill="none" aria-hidden="true"><path d="M24 3 L45 45 H3 Z" '
        'stroke="url(#ag)" stroke-width="2.4" stroke-linejoin="round"/><path d="M24 18 L34 39 H14 Z" fill="url(#ag2)"/>'
        '<defs><linearGradient id="ag" x1="3" y1="3" x2="45" y2="45"><stop stop-color="#ff7a45"/><stop offset="1" '
        'stop-color="#8fd14f"/></linearGradient><linearGradient id="ag2" x1="14" y1="18" x2="34" y2="39"><stop '
        'stop-color="#8fd14f"/><stop offset="1" stop-color="#cbab6e"/></linearGradient></defs></svg>')
FAVICON = ("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Crect width='48' "
           "height='48' rx='10' fill='%230a1016'/%3E%3Cpath d='M24 7 L42 42 H6 Z' fill='none' stroke='%23ff7a45' "
           "stroke-width='3' stroke-linejoin='round'/%3E%3Cpath d='M24 20 L32 37 H16 Z' fill='%238fd14f'/%3E%3C/svg%3E")

BACKERS = ['Coca-Cola Europacific Partners', 'Empirical Ventures', 'Deep Science Ventures', 'First Imagine!',
           'Conduit EIS Impact Fund', 'Almanac Ventures', 'Net Zero Technology Centre']
TIMELINE = [('Oct 2025', '£1.2m round led by Empirical Ventures'),
            ('2025', 'Named in CCEP’s annual report as one of three startups it invested in'),
            ('2026', 'Innovate UK grant for a 50 kW demonstration at a CCEP site'),
            ('2027', 'First unit at the CCEP site, planned for the first half of the year')]
SPEC = [('Source', 'Air', 'Waste heat stream'),
        ('Outlet temperature', 'Up to 120°C', 'Up to 220°C'),
        ('Max steam pressure', '2 bar', '25 bar'),
        ('COP, 10°C to 120°C', '2.8', '2.8'),
        ('COP, 50°C to 120°C', '4.5', '4.5'),
        ('Thermal output', '0.5 MW, stackable up to 10 MW', '0.5 MW, stackable up to 10 MW'),
        ('Availability', '2026 orders for 2027 delivery', '2027 orders for 2028 delivery')]
APPS = ['Pasteurisation', 'Brewing', 'Distillation', 'Drying', 'Sterilisation']
# UK ETS Compliance Report 2026, open installation accounts with NACE 10 or 11, counted 25 Sep 2026
ETS = [('Oils and fats', 'Manufacture of oils and fats', 10),
       ('Dairies', 'Operation of dairies and cheese making', 8),
       ('Spirits', 'Distilling, rectifying and blending of spirits', 8),
       ('Potatoes', 'Processing and preserving of potatoes', 6),
       ('Beer', 'Manufacture of beer', 5),
       ('Sugar', 'Manufacture of sugar', 5),
       ('Malt', 'Manufacture of malt', 5),
       ('Grain milling', 'Manufacture of grain mill products', 4),
       ('Other types', 'Eleven other food and drink types, one to three sites each', 17)]
assert sum(n for _, _, n in ETS) == 68

GROUPS = [
    ('A', 'gA', 'We fix it', 'Fixes to your current website, free.'),
    ('B', 'g1', 'Investor proof', 'A website update for investors.'),
    ('C', 'g2', 'Increase your credibility', 'Branding and a website redesign.'),
    ('D', 'g3', 'Let prospects and investors see the proof', 'A business case web app on your site.'),
    ('E', 'g4', 'Optimise your inbound and outbound flow', 'Website forms, a CRM and outreach.'),
    ('F', 'g5', 'AI helpers', 'AI tools that do the weekly reading and drafting.'),
]
GCLS = {g: c for g, c, _, _ in GROUPS}

PERIODS = [
    ('p1', 'October and November 2026', 'Before the demonstrator goes in'),
    ('p2', 'December 2026 to February 2027', 'The EU heat auction is expected to open in early December'),
    ('p3', 'March to June 2027', 'The demonstrator goes in, planned for the first half of 2027. The Innovate UK project runs to 31 May 2027'),
    ('p4', 'July to September 2027', 'The seed round'),
]
WHEN = {'p1': 'Oct to Nov 2026', 'p2': 'Dec 2026 to Feb 2027', 'p3': 'Mar to Jun 2027', 'p4': 'Jul to Sep 2027'}


# ---------- the small sketches, one per piece ----------

def lines(*w):
    return ''.join(f'<i class="ln {x}"></i>' for x in w)


def tag(t='Example', real=False):
    return f'<span class="tg{" real" if real else ""}">{E(t)}</span>'


def mv_fixes():
    items = [('Company details in the footer', True), ('Privacy notice for the contact form', True),
             ('A title for each page', False), ('Alt text on 62 images', False), ('Spec table as text', False)]
    rows = ''.join(f'<div class="chk">{E(t)}{"<em>legal</em>" if l else ""}</div>' for t, l in items)
    return f'<div class="mv">{tag("Your site", True)}<p class="mvh">Twelve fixes</p>{rows}<p class="more">and seven more</p></div>'


def mv_numbers():
    fr = ''.join(f'<div class="fr"><span>{E(x)}</span>{lines("")}</div>' for x in ['Figure', 'Compared with', 'Checked by', 'Date'])
    return (f'<div class="mv">{tag()}<p class="mvh">Three numbers today</p><div class="nums3"><s>30%</s><s>40%</s><s>up to 50%</s></div>'
            f'<div class="down">↓</div><div class="fact"><b>Energy cost saving, one agreed figure</b>{fr}</div></div>')


def mv_homeproof():
    names = ''.join(f'<span class="chipx">{E(n)}</span>' for n in BACKERS[:4]) + '<span class="chipx">and three more</span>'
    tl = ''.join(f'<div><b>{E(a)}</b>{E(b)}</div>' for a, b in TIMELINE[:3])
    return (f'<div class="mv site">{tag()}<p class="mk">Funders and partners</p><div class="mvnames">{names}</div>'
            f'<div class="stl">{tl}</div><div class="fade"></div></div>')


def mv_investor():
    f = ''.join(f'<div class="inpx"><label>{E(x)}</label><div class="v"></div></div>' for x in ['Name', 'Fund', 'Email'])
    return (f'<div class="mv">{tag()}<p class="mk">hotgreensolutions.com/investors</p><p class="mvh">For investors</p>'
            '<p>Backed by Empirical Ventures, Coca-Cola Europacific Partners and others. Next round, seed, planned for 2027.</p>'
            f'<div class="row2">{f}<div class="inpx"><label>&nbsp;</label><span class="btnx">Request the deck</span></div></div>'
            '<p class="more">Goes straight to Georgia</p></div>')


def mv_press():
    items = [('Empirical Ventures, 20 Oct 2025', 'Hot Green raises £1.2m …'),
             ('Tech.eu, 20 Oct 2025', 'HotGreen Solutions raises £1.2M …'),
             ('Vestbee, 21 Oct 2025', 'British HotGreen Solutions raises £1.2M …')]
    rows = ''.join(f'<div class="pr"><span>{E(a)}</span><b>{E(b)}</b></div>' for a, b in items)
    return (f'<div class="mv">{tag("Real articles", True)}<p class="mvh">In the press</p>{rows}'
            '<div class="mvchips"><span class="chipx">Logos</span><span class="chipx">Photos</span><span class="chipx">Fact sheet</span></div></div>')


def mv_monthly():
    post = lambda m: f'<div class="fact post"><b>{E(m)}</b>{lines("m", "s")}</div>'
    return (f'<div class="mv">{tag()}<p class="mk">hotgreensolutions.com/updates</p><p class="mvh">Monthly updates</p>'
            f'{post("November 2026")}{post("October 2026")}<div class="fade"></div></div>')


def mv_evidence():
    chk = ''.join(f'<div class="chk">{E(x)}</div>' for x in ['Engineering', 'Finance', 'Procurement', 'Investors'])
    svg = ('<svg viewBox="0 0 120 70" width="100%" height="84" aria-hidden="true"><path d="M4 64 H116 M4 64 V4" stroke="#cfd6cf" stroke-width="1"/>'
           '<path d="M6 50 C30 44, 50 30, 70 32 S100 20, 114 16" fill="none" stroke="#9fb3b8" stroke-width="2" stroke-dasharray="4 3"/></svg>')
    return (f'<div class="mv">{tag()}<div class="row2"><div><p class="mk">Before the install</p><p class="more sm">What each approver needs</p>{chk}</div>'
            f'<div><p class="mk">After it</p><p class="more sm">Results page</p>{svg}<p class="more">Live data, if CCEP agrees</p></div></div></div>')


def mv_dataroom():
    rows = ''.join(f'<div class="fold"><span>{E(x)}</span><i class="who"></i></div>' for x in
                   ['01 Company', '02 Financials', '03 Technology and IP', '04 Demonstrator', '05 Commercial', '06 Team'])
    return (f'<div class="mv">{tag()}<p class="mvh">Seed data room</p><div class="fold head"><span>Folder</span><span>Who opened it</span></div>{rows}</div>')


def mv_positioning():
    return (f'<div class="mv">{tag()}<div class="house"><div class="roof">One clear line on what HotGreen makes and who it’s for</div>'
            '<div class="pill3"><div>Backed by CCEP and Empirical Ventures</div><div>Demonstration at a CCEP site, funded by Innovate UK</div><div>Replaces a traditional boiler, same pipework</div></div>'
            '<div class="base">Your mission, saving manufacturers money while cutting carbon</div></div></div>')


def mv_lookfeel():
    return (f'<div class="mv">{tag()}<p class="mvh">Your pages, new layouts</p><div class="ba">'
            '<figure><img src="img/site-before.jpg" alt="A section of the HotGreen homepage as it is today" loading="lazy"><figcaption>Today</figcaption></figure>'
            f'<figure><div class="newl"><span class="slogo small">{LOGO}</span><i class="gl"></i>{lines("m", "s")}</div><figcaption>New layout, in your Framer</figcaption></figure>'
            '</div></div>')


def mv_product():
    rows = ''.join(f'<div class="sr">{E(t)}</div>' for t in ['Waste heat stream', 'Up to 220°C', 'Up to 25 bar', 'COP 2.8, 10°C to 120°C', '0.5 MW modules'])
    return (f'<div class="mv mint">{tag("Your specs", True)}<div class="sheet"><div><b class="sht">HotStack 220</b><span class="pdf">PDF</span>'
            f'<p class="more sm">Datasheet</p>{rows}</div><img src="img/hotstack.webp" alt="" loading="lazy"></div></div>')


def mv_working():
    steps = [('1', 'Site survey'), ('2', 'Sizing and business case'), ('3', 'Install, as quick as 3 to 5 days with the air source module'), ('4', 'Service')]
    s = ''.join(f'<div><b>{a}</b>{E(b)}</div>' for a, b in steps)
    return (f'<div class="mv">{tag()}<p class="mvh">Working with HotGreen</p><div class="steps">{s}</div>'
            '<span class="chipx">Warranty</span><span class="chipx">Spares</span><span class="chipx">Certification</span><span class="chipx">Contacts</span></div>')


def mv_linkedin():
    cal = ''.join(f'<i class="{"p" if i in (2, 9, 16, 23) else ""}"></i>' for i in range(28))
    return (f'<div class="mv">{tag("Example draft")}<div class="li-post"><div class="li-top"><span class="li-av">{LOGO}</span>'
            '<div><b class="lin">HotGreen Solutions</b><span>Draft for next week</span></div></div>'
            '<p>The EU’s €1bn heat auction is expected to open in early December. Heat pumps with a COP of at least 1.5 get a 25% bonus when bids are ranked. Here’s what that means for food and drink plants.</p></div>'
            f'<div class="cal">{cal}</div><p class="more">One post a week, drafted from your milestones</p></div>')


def mv_calculator():
    ins = ''.join(f'<div class="inpx"><label>{E(a)}</label><div class="v val">{E(b)}</div></div>'
                  for a, b in [('Country', 'Netherlands'), ('Steam demand', '1 MW'), ('Hours a year', '6,000'), ('Your gas price', 'enter yours')])
    return (f'<div class="mv">{tag("Sketch")}<p class="mvh">Your site, your prices</p><div class="row2"><div>{ins}</div>'
            '<div><div class="tile"><span>Energy cost a year</span><b>from your model</b></div><div class="tile gap"><span>Carbon cost a year</span><b>from your model</b></div>'
            '<div class="tile gap"><span>Payback</span><b>from your model</b></div></div></div></div>')


def mv_funding():
    return (f'<div class="mv">{tag("Real schemes", True)}<p class="mk">Example, a site in the Netherlands</p><p class="mvh">Funding you can apply for</p>'
            '<div class="pr"><b>SDE++</b><span>Open 27 Oct to 26 Nov 2026, €8bn. Industrial heat pumps from 500 kWth with a COP of 2.3 or more</span></div>'
            '<div class="pr"><b>EU heat auction</b><span>Expected to open in early December 2026</span></div>'
            '<p class="more">Last checked 25 September 2026</p></div>')


def mv_auction():
    facts = ['€1bn budget', 'Expected to open in early December 2026', '25% ranking bonus for heat pumps with a COP of at least 1.5', 'Subsidy paid for up to five years']
    rows = ''.join(f'<div class="chk">{E(x)}</div>' for x in facts)
    return f'<div class="mv">{tag("Real rules", True)}<p class="mk">One page guide</p><p class="mvh">The EU heat auction, for food and drink plants</p>{rows}</div>'


def mv_routes():
    tabs = ''.join(f'<span class="{"on" if t == "Site assessment" else ""}">{E(t)}</span>' for t in ['Investor', 'Site assessment', 'Customer', 'Partner', 'Press'])
    f = ''.join(f'<div class="inpx"><label>{E(x)}</label><div class="v"></div></div>' for x in ['Steam demand', 'Steam temperature', 'Hours a year', 'Current fuel'])
    return f'<div class="mv">{tag()}<div class="tabs">{tabs}</div><div class="row2">{f}</div><div class="mvbtn"><span class="btnx">Send to engineering</span></div></div>'


def mv_assessment():
    rows = [('Brewery', 'Draft ready', 'ok'), ('Dairy', 'Waiting for metering data', 'wait'), ('Distillery', 'Engineer checking', 'new'), ('Food plant', 'Draft ready', 'ok')]
    r = ''.join(f'<div class="rowq"><span>{E(t)}</span><span class="tag {k}">{E(s)}</span></div>' for t, s, k in rows)
    return f'<div class="mv">{tag("Example rows")}<p class="mk">Internal web app</p><p class="mvh">This week’s enquiries</p>{r}</div>'


def mv_tracker():
    cols = [('Enquiry', 2), ('Assessment', 2), ('Proposal', 1), ('Budget approved', 1)]
    cd = '<div class="cd"><b>Site</b><i class="ln m"></i><span>Boiler age</span><i class="ln s"></i><span>Shutdown</span><i class="ln s"></i></div>'
    c = ''.join(f'<div class="col"><span>{E(n)}</span>{cd * k}</div>' for n, k in cols)
    return f'<div class="mv">{tag()}<p class="mvh">Pipeline, by site</p><div class="kan">{c}</div></div>'


def mv_targets():
    top = max(n for _, _, n in ETS)
    bars = ''.join(
        f'<div class="bar{" oth" if s == "Other types" else ""}" tabindex="0"><span class="t">{E(s)}</span><span class="tr"><span class="f" style="width:{n / top * 100:.1f}%"></span></span>'
        f'<span class="n">{n}</span><span class="tip">{E(full)}, {n} {"site" if n == 1 else "sites"}</span></div>' for s, full, n in ETS)
    table = '<table class="sr-only"><caption>UK food and drink sites in the emissions trading register, by type</caption>' + ''.join(
        f'<tr><th>{E(full)}</th><td>{n}</td></tr>' for _, full, n in ETS) + '</table>'
    return (f'<div class="mv tall">{tag("Real data", True)}<p class="mvh">68 UK food and drink sites, by type</p>'
            f'<div class="bars">{bars}</div>{table}<p class="src">UK ETS compliance report 2026, open accounts</p></div>')


def mv_outbound():
    seq = [('Step 1', 'Email with the demonstrator results'), ('Step 2', 'LinkedIn note from Georgia'), ('Step 3', 'Follow up with a site assessment offer')]
    s = ''.join(f'<div><b>{E(a)}</b><span>{E(b)}</span></div>' for a, b in seq)
    return f'<div class="mv">{tag()}<p class="mvh">A campaign, once there’s data</p><div class="seq">{s}</div><p class="more">Written and sent by us, within each country’s rules</p></div>'


def mv_digest():
    return (f'<div class="mv">{tag("Real 2026 items", True)}<p class="mk">Weekly email</p><p class="mvh">Regulation and funding</p>'
            '<div class="pr"><span>European Commission, 24 Sep 2026</span><b>Rules published for the €1bn industrial heat auction</b></div>'
            '<div class="pr"><span>RVO, Netherlands</span><b>SDE++ opens 27 October with €8bn</b></div><div class="fade"></div></div>')


def mv_watch():
    sec = lambda h: f'<p class="mk sp">{E(h)}</p>{lines("m", "s")}'
    return f'<div class="mv">{tag()}<p class="mvh">Competitor watch, monthly</p>{sec("New products")}{sec("Patents")}{sec("Grants")}</div>'


def mv_content():
    return (f'<div class="mv">{tag("Example draft")}<p class="mk">Waiting for your approval</p><div class="li-post gap"><p class="flush">'
            'Dutch plants can apply for SDE++ from 27 October. Industrial heat pumps from 500 kWth qualify if their COP is at least 2.3.</p></div>'
            '<div class="appr"><span class="btnx">Approve</span><span class="btnx o">Edit</span></div></div>')


def mv_update():
    f = ''.join(f'<div class="inpx"><label>{E(x)}</label><div class="v"></div></div>' for x in ['Milestones this month', 'Numbers', 'What you need from investors'])
    return f'<div class="mv form3">{tag()}<p class="mvh">Monthly update, short form</p>{f}<div class="mvbtn"><span class="btnx">Draft it for Georgia</span></div></div>'


# ---------- the big sketches, one per group ----------

def hv_B():
    names = ''.join(f'<span class="chipx">{E(n)}</span>' for n in BACKERS)
    tl = ''.join(f'<div><b>{E(a)}</b>{E(b)}</div>' for a, b in TIMELINE)
    return (f'<figure class="hv rv"><div class="fbar dark"><i></i><i></i><i></i><span>hotgreensolutions.com</span>{tag("Sketch")}</div>'
            f'<div class="sbody"><nav class="snav" aria-hidden="true"><span class="slogo">{LOGO}</span><span>Product</span><span>Applications</span><span>Working with us</span><span>News</span><span class="sp"></span><span class="btnx o">For investors</span></nav>'
            '<div class="shero"><div><p class="mk">Industrial heat pumps</p><h4>Steam from electricity, for food and drink plants</h4>'
            '<p>HotGreen makes industrial heat pumps that replace a traditional boiler and use your existing pipework, so there’s no need to redesign your process.</p>'
            '<div class="sbtns"><span class="btnx">Request a site assessment</span><span class="btnx o">See the specs</span></div></div>'
            '<img src="img/hotstack.webp" alt="HotGreen’s HotStack heat pump" width="720" height="551"></div>'
            f'<div class="sproof"><div><p class="mk">Funders and partners</p><div class="gap">{names}</div></div><div><p class="mk">Where HotGreen stands</p><div class="stl gap">{tl}</div></div></div>'
            '</div></figure>')


def hv_C():
    rows = ''.join(f'<tr><td>{E(a)}</td><td>{E(b)}</td><td>{E(c)}</td></tr>' for a, b, c in SPEC)
    apps = ''.join(f'<span class="chipx">{E(a)}</span>' for a in APPS)
    return (f'<figure class="hv rv"><div class="fbar"><i></i><i></i><i></i><span>hotgreensolutions.com/hotstack</span>{tag("Your real specs", True)}</div>'
            '<div class="pbody"><div><p class="crumb">Products</p><h4>HotStack</h4>'
            '<p>Low carbon steam for industry, from air or from a waste heat stream.</p>'
            '<img class="pimg" src="img/hotstack.webp" alt="HotGreen’s HotStack heat pump" width="720" height="551">'
            f'<div class="apps">{apps}</div></div>'
            f'<div><table class="spec"><thead><tr><th></th><th>HotStack 120</th><th>HotStack 220</th></tr></thead><tbody>{rows}</tbody></table>'
            '<div class="sbtns"><span class="btnx">Download the datasheet</span><span class="btnx o">Request a site assessment</span></div></div></div></figure>')


def hv_D():
    ins = ''.join(f'<div class="inp"><label>{E(a)}</label><div class="v{" phv" if ph else ""}">{E(b)}</div></div>' for a, b, ph in
                  [('Country', 'Netherlands', False), ('Steam demand', '1 MW', False), ('Hours a year', '6,000', False),
                   ('Steam temperature', '120°C', False), ('Your gas price', 'Enter yours, or use the official average', True),
                   ('Your electricity price', 'Enter yours, or use the official average', True)])
    tiles = ''.join(f'<div class="tile"><span>{E(t)}</span><b>From your model</b></div>' for t in ['Energy cost a year', 'Carbon cost a year', 'Payback'])
    return (f'<figure class="hv rv"><div class="fbar"><i></i><i></i><i></i><span>hotgreensolutions.com/savings</span>{tag("Sketch")}</div>'
            f'<div class="abody"><div class="apane"><p class="mk">Your site</p>{ins}</div>'
            f'<div class="apane2"><p class="mk">Your result</p><div class="tiles">{tiles}</div>'
            '<div class="chartph">A before and after chart of cost and carbon, drawn from your business case model</div>'
            '<div class="fundrow"><b>Funding you can apply for in the Netherlands</b><div class="dates"><span>SDE++, 27 Oct to 26 Nov 2026</span><span>EU heat auction, expected early December 2026</span></div></div>'
            '<p class="note">Every assumption is shown. Default prices come from official statistics, with the date they were last updated.</p></div></div></figure>')


def hv_E():
    n = lambda c, t, hot=False: f'<div class="node{" key" if hot else ""}"><b>{E(c) if c else "&nbsp;"}</b>{E(t)}</div>'
    ar = '<span class="arr" aria-hidden="true">→</span>'
    inbound = ar.join([n('', 'Your website'), n('E1', 'Enquiry forms'), n('E2', 'Site assessment tool', True), n('E3', 'Pipeline tracker', True), n('', 'Proposal')])
    outbound = ar.join([n('E4', 'Target list'), n('E5', 'Campaigns'), n('E3', 'Pipeline tracker', True)])
    return (f'<figure class="hv rv"><div class="fbar"><i></i><i></i><i></i><span>how an enquiry moves</span>{tag("Diagram")}</div>'
            f'<div class="flow"><p class="lname">Inbound, today</p><div class="lane">{inbound}</div>'
            f'<p class="lname second">Outbound, once there’s data from the demonstrator</p><div class="lane">{outbound}</div>'
            '<p class="note">Every site sits in one tracker, whether it found you or you found it.</p></div></figure>')


def hv_F():
    items = [('European Commission, 24 Sep 2026', 'Rules published for the €1bn industrial heat auction',
              'Heat pumps with a COP of at least 1.5 get a 25% bonus when bids are ranked. Expected to open to bidders in early December.'),
             ('RVO, Netherlands', 'SDE++ opens 27 October with €8bn',
              'Includes an industrial heat pump category from 500 kWth with a COP of at least 2.3.')]
    it = ''.join(f'<div class="item"><b>{E(h)}</b><span class="src">{E(s)}</span><p>{E(p)}</p></div>' for s, h, p in items)
    return (f'<figure class="hv rv"><div class="fbar"><i></i><i></i><i></i><span>inbox</span>{tag("Example issue, real 2026 items")}</div>'
            f'<div class="mail"><p class="from">HotGreen weekly, to Sanya and Georgia</p><h5>Regulation and funding, this week</h5>{it}'
            '<div class="item"><b>Coming up</b><div class="dates"><span>27 Oct, SDE++ opens</span><span>26 Nov, SDE++ closes</span><span>Early Dec, EU heat auction expected to open</span></div></div></div></figure>')


HERO = {'B': hv_B, 'C': hv_C, 'D': hv_D, 'E': hv_E, 'F': hv_F}

# id, group, code, name, text, periods, sketch
PIECES = [
    ('fixes', 'A', 'A', 'The fix list', 'Twelve fixes to your current site, two of them legal. We’ll give you the list, or make the changes for you.', ['p1'], mv_fixes),
    ('numbers', 'B', 'B1', 'One set of numbers', 'We agree every public figure with your engineers once, and note where each one comes from. After that the site, the deck and LinkedIn all say the same thing.', ['p1'], mv_numbers),
    ('homeproof', 'B', 'B2', 'Homepage proof section', 'Your backers named, a dated timeline, and the demonstrator described as it is today.', ['p1'], mv_homeproof),
    ('investor', 'B', 'B3', 'Investor page', 'Who backs you, what stage you’re at, and a form that goes straight to Georgia. The deck goes out through a tracked link, so she can see who opened it.', ['p1'], mv_investor),
    ('press', 'B', 'B4', 'Press kit', 'Every article about HotGreen so far, ready for your news page, plus approved facts, logos and photos.', ['p1'], mv_press),
    ('monthly', 'B', 'B5', 'Monthly update page', 'A short public version of Georgia’s monthly investor email.', ['p1'], mv_monthly),
    ('evidence', 'B', 'B6', 'Demonstrator results page', 'Before the install, a list of what each buyer and investor needs to see. After it, a page with the results.', ['p2', 'p4'], mv_evidence),
    ('dataroom', 'B', 'B7', 'Data room', 'Folders and an index for the seed round, and you can see which investor read what.', ['p4'], mv_dataroom),
    ('positioning', 'C', 'C1', 'Positioning and message', 'A workshop and a short guide, built on your brand guidelines. It gives you one clear line on what HotGreen makes and who it’s for.', ['p2'], mv_positioning),
    ('lookfeel', 'C', 'C2', 'New look in Framer', 'New layouts for the pages you choose. You can still edit everything yourselves.', ['p2'], mv_lookfeel),
    ('product', 'C', 'C3', 'Product pages and datasheets', 'A page and a PDF datasheet for each HotStack model with the specs as text, plus a page for each application.', ['p2'], mv_product),
    ('working', 'C', 'C4', 'Working with HotGreen page', 'Warranty, service, spares, certification and how an install works, for your buyers’ procurement teams.', ['p2'], mv_working),
    ('linkedin', 'C', 'C5', 'On the side, a LinkedIn plan', 'A monthly posting plan with drafts for the company page and Georgia’s profile. You post them yourselves.', ['p1'], mv_linkedin),
    ('calculator', 'D', 'D1', 'Savings calculator', 'A smaller version of your business case model. A customer enters their country, steam demand, hours and energy prices, then sees cost, carbon and payback, with every assumption shown.', ['p2'], mv_calculator),
    ('funding', 'D', 'D2', 'Funding finder', 'Shows the grants and tax relief a customer can claim in their country, with the date each one was last checked.', ['p2'], mv_funding),
    ('auction', 'D', 'D3', 'EU heat auction guide', 'The EU’s €1bn heat auction is expected to open in early December 2026, and heat pumps with a COP of at least 1.5 get a 25% bonus in the ranking. A one page guide shows EU prospects how to bid with a HotStack.', ['p1'], mv_auction),
    ('routes', 'E', 'E1', 'Enquiry forms', 'Separate forms for investors, site assessments, customers, partners and press, so each enquiry reaches the right person.', ['p2'], mv_routes),
    ('assessment', 'E', 'E2', 'Site assessment tool', 'An internal web app. An enquiry’s steam data goes in, your sizing and business case model runs, and your engineer checks a first draft instead of starting from scratch. We’d measure the hours it saves.', ['p3'], mv_assessment),
    ('tracker', 'E', 'E3', 'Pipeline tracker', 'A CRM set up around sites, tracking boiler age, planned shutdowns and budget dates.', ['p3'], mv_tracker),
    ('targets', 'E', 'E4', 'Target list', 'Built from public registers. The UK emissions trading register alone lists 68 food and drink sites run by 50 companies.', ['p4'], mv_targets),
    ('outbound', 'E', 'E5', 'Outbound', 'Once there’s data from the demonstrator, we write and run the campaigns within each country’s rules.', ['p4'], mv_outbound),
    ('digest', 'F', 'F1', 'Regulation and funding digest', 'A weekly email on changes to Scope 1 to 3, the ETS and funding, taken from official sources.', ['p3'], mv_digest),
    ('watch', 'F', 'F2', 'Competitor watch', 'A monthly email on competitors’ new products, patents and grants.', ['p3'], mv_watch),
    ('content', 'F', 'F3', 'Content helper', 'Drafts news items, LinkedIn posts and articles from your agreed numbers. You approve each one.', ['p3'], mv_content),
    ('update', 'F', 'F4', 'Investor update helper', 'Drafts Georgia’s monthly investor email from a short form.', ['p3'], mv_update),
]
CHIP_LABEL = {('evidence', 'p2'): 'Demonstrator plan', ('evidence', 'p4'): 'Results page', ('linkedin', 'p1'): 'LinkedIn plan'}
SHORT = {'linkedin': 'LinkedIn plan'}
assert len(PIECES) == 25


def piece_card(p):
    pid, g, code, name, text, pers, mv = p
    when = WHEN[pers[0]] + (' then ' + WHEN[pers[1]] if len(pers) > 1 else '')
    solo = ' solo' if g == 'A' else ''
    label = f'{code} {SHORT.get(pid, name)}'
    return (f'<article class="piece {GCLS[g]}{solo} rv" data-id="{pid}" data-name="{E(label)}">{mv()}'
            f'<h4><span class="code">{E(code)}</span>{E(name)}</h4><p class="get">{E(text)}</p>'
            f'<div class="ph"><span class="when">{E(when)}</span></div>'
            f'<button class="pick" type="button" data-pick="{pid}" aria-pressed="false">'
            '<span class="ico" aria-hidden="true"></span><span class="off-t">Add to shortlist</span>'
            '<span class="on-t">On your shortlist</span></button></article>')


def menu():
    out = []
    for letter, cls, name, what in GROUPS:
        items = [p for p in PIECES if p[1] == letter]
        extra = ''
        if letter == 'A':
            extra = ('<div class="piece gA aside rv"><p class="get">The full list is on its own page, with what to change and where.</p>'
                     '<a class="btn ghost" href="fixes.html">See the twelve fixes →</a></div>')
        out.append(f'<div class="grp {cls}" id="group-{letter}"><div class="gh rv"><span class="gno">{letter}</span><div><h3>{E(name)}</h3>'
                   f'<span class="what">{E(what)}</span></div></div>'
                   + (HERO[letter]() if letter in HERO else '')
                   + '<div class="pieces">' + ''.join(piece_card(p) for p in items) + extra + '</div></div>')
    return ''.join(out)


def chips(per):
    out = []
    for p in PIECES:
        if per in p[5]:
            label = CHIP_LABEL.get((p[0], per), p[3])
            out.append(f'<button class="chip" type="button" data-pick="{p[0]}" aria-pressed="false">'
                       f'<span class="dot {GCLS[p[1]]}" aria-hidden="true"></span><b class="ccode">{E(p[2])}</b>{E(label)}</button>')
    return ''.join(out)


def order():
    months = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
    mh = ''.join(f'<span class="{"y y26" if m == "Oct" else "y y27" if m == "Jan" else ""}">{m}</span>' for m in months)
    ms = [('c-dec pt from', 'Early December 2026', 'EU heat auction expected to open'),
          ('c4-9', 'First half of 2027', 'First unit into the CCEP site, planned'),
          ('c-may pt to', '31 May 2027', 'Innovate UK project ends'),
          ('c10-12', 'Around Q3 2027', 'Seed round, planned')]
    rows = ''.join(f'<div class="ms-row"><div class="ms {c}"><span class="md">{E(d)}</span>{E(t)}</div></div>' for c, d, t in ms)
    phases = ''.join(f'<div class="phase {pid}"><h4>{E(t)}</h4><p class="at">{E(at)}</p><div class="chips">{chips(pid)}</div></div>' for pid, t, at in PERIODS)
    legend = ''.join(f'<span><i class="dot {c}"></i>{l}. {E(n)}</span>' for l, c, n, _ in GROUPS)
    return (f'<div class="legend rv">{legend}</div>'
            f'<div class="tl rv"><div class="months" aria-hidden="true">{mh}</div>{rows}<div class="phases">{phases}</div></div>')


WORK = [
    ('w-pertamina.jpg', 'Two screens from the Pertamina drilling calculator app', 'Pertamina, drilling engineering app',
     '470 drilling engineering formulas rebuilt as a phone calculator that works offline, for engineers on offshore rigs.'),
    ('w-worldbank.jpg', 'The eHDW dashboard with village counts and service scores', 'World Bank, stunting monitoring',
     'An app and dashboard for the World Bank and a national ministry that collects child health data across a whole country, online or offline.'),
    ('w-unilever.jpg', 'The Unilever 1001 Ramadhan Inspiration content and promotion platform', 'Unilever, 1001 Ramadhan Inspiration',
     'A content and promotion platform on web and mobile that handles 48 Unilever brands, each with its own requests.'),
    ('w-bango.jpg', 'The Bango app on three phones, with a map of nearby street food stalls', 'Unilever, Bango app',
     'A street food finder for Unilever’s Bango brand on iPhone, Android and BlackBerry. It won Gold for Mobile App and Best in Show at the 2015 MMA Smarties.'),
]


def page(title, desc, body, script=True):
    css = read('base.css') + read('mock.css')
    return ('<!doctype html>\n<html lang="en-GB">\n<head>\n<meta charset="utf-8">\n'
            '<meta name="viewport" content="width=device-width,initial-scale=1">\n'
            f'<title>{E(title)}</title>\n<meta name="description" content="{E(desc)}">\n'
            '<meta name="robots" content="noindex,nofollow">\n'
            f'<link rel="icon" href="{FAVICON}">\n'
            '<link rel="preload" href="fonts/plex-mono-500.woff2" as="font" type="font/woff2" crossorigin>\n'
            f'<style>{css}</style>\n</head>\n<body>\n<div id="prog"></div>\n{body}\n'
            + (f'<script>{read("app.js")}</script>\n' if script else '') + '</body>\n</html>\n')


def index():
    stats = [('Q3 2027', 'Seed round, planned'),
             ('H1 2027', 'First unit goes into a Coca-Cola Europacific Partners site'),
             ('Inbound', 'Customers find you through industry contacts and accelerators'),
             ('Later', 'Outbound, once there’s real world data')]
    elsewhere = ['CCEP’s 2025 annual report names HotGreen as one of three startups it invested in that year.',
                 'UK Research and Innovation lists your Innovate UK grant for a 50 kW demonstration at a CCEP site. It’s a twelve month project ending in May 2027.',
                 'Empirical Ventures, Tech.eu and Vestbee all wrote about the £1.2m raise.']
    onsite = ['The homepage shows your backers as logos, with no names in the text.',
              'The raise, the grant and the demonstrator aren’t mentioned on any page.',
              'The product specs sit inside one image.']
    nums = [('30%', 'Your Solutions page', '“Reduce your energy bill by 30%”'),
            ('40%', 'Your LinkedIn page', '“reduce energy costs by 40% compared to competitors”'),
            ('Up to 50%', 'Empirical’s announcement', '“up to 50% energy savings”')]
    needs = ['Your business case model, or the inputs behind it',
             'Thirty minutes with an engineer to agree the numbers',
             'Access to Framer and your brand guidelines',
             'What you can say in public about CCEP, the demonstrator and your investors']
    li = lambda xs: ''.join(f'<div class="li"><span class="mk">0{i}</span><span>{E(x)}</span></div>' for i, x in enumerate(xs, 1))
    start = [('B1', 'One set of numbers'), ('B2', 'Homepage proof section'), ('B3', 'Investor page'), ('D1', 'Savings calculator')]
    path = '<span class="ar" aria-hidden="true">→</span>'.join(f'<span class="step"><b>{a}</b>{E(b)}</span>' for a, b in start)
    body = f'''
<section id="cover" class="slide">
  <div class="cover-photo" aria-hidden="true"></div><div class="cover-veil" aria-hidden="true"></div>
  <div class="wrap">
    <div class="brandrow">{MARK}<span class="nm">Astra Agency</span></div>
    <p class="kick cover-k">Proposal for HotGreen</p>
    <h1 class="cover-h">Your proof is <span class="hot">stronger</span> than your <span class="grn">website</span>.</h1>
    <p class="cover-sub">Here’s what we’d build, split into six groups from A to F. Pick the ones you want. The timeline shows when each one fits.</p>
    <div class="cover-meta"><span>Prepared for <b>Sanya Chhugani</b> and <b>Georgia Ware</b></span><span><b>HotGreen Solutions</b></span><span>September 2026</span></div>
    <nav class="toc" aria-label="Sections"><a href="#told">What you told us</a><a href="#proof">What we found</a><a href="#menu">The menu</a><a href="#order">The timeline</a><a href="#start">Where we’d start</a><a href="#team">Who we are</a><a href="#next">Next step</a></nav>
  </div>
</section>

<section id="told" class="slide dark">
  <div class="wrap">
    <div class="eyebrow rv"><span class="kick">1 / What you told us</span><span class="note">on the call, 24 September</span></div>
    <h2 class="lead rv">Investors first, and customers are already <span class="hg">coming in</span>.</h2>
    <div class="stats rv">{''.join(f'<div class="stat"><b>{E(a)}</b><span>{E(b)}</span></div>' for a, b in stats)}</div>
    <blockquote class="q rv"><p>“a very credible and reliable equipment provider rather than a startup”</p><cite>How you want HotGreen to come across, without losing what makes it different</cite></blockquote>
    <p class="say rv">You’ll handle the quick fixes yourselves, SEO and a news page. Later you’d like a small version of your business case model on the site, and something on Scope 1, 2 and 3 and the ETS rules.</p>
  </div>
</section>

<section id="proof" class="slide deep">
  <div class="wrap">
    <div class="eyebrow rv"><span class="kick">2 / What we found</span></div>
    <h2 class="lead rv">Your proof is on other people’s websites, <span class="hl">not yours</span>.</h2>
    <div class="stand">
      <div class="card real rv"><h3>Elsewhere online</h3>{li(elsewhere)}</div>
      <div class="card site rv"><h3>On your website</h3>{li(onsite)}</div>
    </div>
    <div class="shots">
      <figure class="shot rv"><img src="img/site-logos.jpg" width="1200" height="300" alt="The partners row on the HotGreen homepage, showing logos under the line Some of our key funders and partners are" loading="lazy"><figcaption>Your homepage, 25 September 2026. Seven logos in a carousel, no names in the text.</figcaption></figure>
      <figure class="shot rv"><img src="img/site-spec.jpg" width="1000" height="490" alt="The HotStack 120 and HotStack 220 spec table on the HotGreen Solutions page" loading="lazy"><figcaption>Your Solutions page. The spec table is one image.</figcaption></figure>
    </div>
    <div class="three">
      <h3 class="rv">The savings number changes with where you read it.</h3>
      <div class="nums">{''.join(f'<div class="num rv"><b>{E(a)}</b><span class="src">{E(b)}</span><span class="quo">{E(c)}</span></div>' for a, b, c in nums)}</div>
      <p class="say rv">They measure different things, but a reader just sees three numbers.</p>
    </div>
    <div class="std rv"><p>The 100+ Accelerator says a website “should clearly present your technology, traction, and company information to help evaluators assess your solution”. <b>That’s what we’d build to.</b></p></div>
  </div>
</section>

<section id="menu" class="slide dark">
  <div class="wrap">
    <div class="eyebrow rv"><span class="kick">3 / The menu</span><span class="note">six groups, A to F</span></div>
    <h2 class="lead rv">Six groups. <span class="hg">Pick any of them</span>.</h2>
    <p class="say rv">Each group shows what we’d build and roughly what it would look like. The screens are sketches, filled in with your real facts where we have them.</p>
    {menu()}
  </div>
</section>

<section id="order" class="slide deep">
  <div class="wrap">
    <div class="eyebrow rv"><span class="kick">4 / The timeline</span></div>
    <h2 class="lead rv">When each part fits.</h2>
    {order()}
  </div>
</section>

<section id="start" class="slide paper">
  <div class="wrap">
    <div class="eyebrow rv"><span class="kick">5 / Where we’d start</span></div>
    <h2 class="lead rv">Start with <span class="hg">B and D</span>.</h2>
    <p class="say rv">Start with one set of numbers, the homepage proof section and the investor page. The savings calculator comes next, because it runs on the same numbers. Together they help with investors and customers at the same time.</p>
    <div class="path rv">{path}</div>
  </div>
</section>

<section id="need" class="slide dark">
  <div class="wrap">
    <div class="eyebrow rv"><span class="kick">6 / What we need from you</span></div>
    <h2 class="lead rv">Four things we’d need from you.</h2>
    <div class="needs">{''.join(f'<div class="need rv"><span class="n">0{i}</span><p>{E(t)}</p></div>' for i, t in enumerate(needs, 1))}</div>
  </div>
</section>

<section id="team" class="slide paper">
  <div class="wrap">
    <div class="eyebrow rv"><span class="kick">7 / Who we are</span></div>
    <h2 class="lead rv">Astra and Amwisesa build it as <span class="hg">one team</span>.</h2>
    <p class="say rv">The team behind Astra has shipped for Unilever, Pertamina and the World Bank. Astra and Amwisesa work as one team. Astra runs the strategy and the project from the Netherlands, and Amwisesa, our development partner, builds. Their developers have spent more than ten years making apps, websites and management systems for brands like Unilever, Nestlé and IKEA.</p>
    <p class="say rv">For Pertamina they rebuilt 470 drilling engineering formulas as a phone calculator that works offline, for engineers on offshore rigs. It’s the same kind of work as turning your business case model into a tool.</p>
    <div class="work">{''.join(f'<div class="wk rv"><div class="im"><img src="img/{f}" alt="{E(a)}" loading="lazy"></div><div class="tx"><h3>{E(t)}</h3><p>{E(p)}</p></div></div>' for f, a, t, p in WORK)}</div>
    <p class="disc rv">Built by Amwisesa, Astra’s development partner, often through the brand’s own agency. Screens are from Amwisesa’s credentials.</p>
    <div class="people">
      <div class="person rv"><h3>Raka Mulya</h3><span class="role">Go to market architect and entrepreneur</span><p>Led global ebusiness data and insights at Heineken across 23 markets, and ran global go to market for Betty Blocks, the low code platform. Now runs sales and channel operations at efficy, a European CRM company. He also founded a stroopwafel brand from nothing and scaled it. Your contact at Astra.</p><a href="https://www.linkedin.com/in/raka-mulya-b92885196/" rel="noopener" target="_blank">LinkedIn</a></div>
      <div class="person rv"><h3>Joshua van Zeelt</h3><span class="role">Founder of Astra Agency and JML Agency</span><p>Builds custom websites, software and apps from the first conversation to launch. Studied artificial intelligence at VU Amsterdam and holds an MSc in Strategic Entrepreneurship from RSM Erasmus. Spent seven years coordinating projects at Schiphol, where he helped develop an asset app that forecasts maintenance.</p><a href="https://www.linkedin.com/in/joshua-van-zeelt/" rel="noopener" target="_blank">LinkedIn</a></div>
    </div>
  </div>
</section>

<section id="next" class="slide">
  <div class="band" aria-hidden="true"></div><div class="band-veil" aria-hidden="true"></div>
  <div class="wrap">
    <div class="eyebrow rv"><span class="kick">8 / Next step</span></div>
    <h2 class="lead rv">Pick your groups on a <span class="hg">thirty minute call</span>.</h2>
    <p class="say rv">Tell us which parts you want, and we’ll send a price and a date for each.</p>
    <div class="short rv"><h3>Your shortlist</h3><ol id="shortlist"></ol><p id="short-empty" class="empty">Nothing on it yet. Add parts from the menu.</p>
      <div class="acts"><a id="mail" class="btn" data-to="{MAIL}" href="mailto:{MAIL}?subject=HotGreen%20proposal">Email me</a><button id="clear" class="btn ghost" type="button" hidden>Clear the shortlist</button></div></div>
  </div>
</section>

<footer>{MARK}<p>Astra Agency, prepared for HotGreen Solutions, September 2026<br>Screenshots of hotgreensolutions.com taken 25 September 2026. The product image and logo are HotGreen’s own.</p></footer>
<a id="tray" href="#next" hidden><b id="tray-n">0</b><span id="tray-t">parts on your shortlist</span></a>
'''
    return page('HotGreen x Astra, the proposal',
                'What Astra would build for HotGreen, in six groups from A to F, with a sketch of each and the timeline to the seed round.', body)


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
<section class="slide dark">
  <div class="wrap">
    <a class="back" href="./#group-A">← Back to the proposal</a>
    <div class="brandrow">{MARK}<span class="nm">Astra Agency</span></div>
    <div class="eyebrow"><span class="kick">A. We fix it</span><span class="note">checked on the live site, 25 September 2026</span></div>
    <h1 class="lead">Twelve fixes for hotgreensolutions.com, two of them legal.</h1>
    <p class="say">Free. Make them yourselves in Framer, or we’ll make them for you.</p>
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
    shutil.copytree(os.path.join(A, 'img'), os.path.join(OUT, 'img'))
    shutil.copytree(os.path.join(A, 'fonts'), os.path.join(OUT, 'fonts'))
    for name, fn in (('index.html', index), ('fixes.html', fixes)):
        with open(os.path.join(OUT, name), 'w', encoding='utf-8') as f:
            f.write(fn())
    with open(os.path.join(OUT, 'netlify.toml'), 'w') as f:
        f.write('[build]\n  publish = "."\n')
    print('built', sorted(os.listdir(OUT)))


if __name__ == '__main__':
    main()
