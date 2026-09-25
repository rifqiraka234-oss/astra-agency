#!/usr/bin/env python3
"""The example screens for the HotGreen proposal, v3. Writes mocks/index.html, one 1200 by 750 screen per
item. render_mocks.js turns each screen into assets/img/ex/<id>.webp.

Real facts only, from ../evidence-ledger.md. Anything invented to show a layout carries an Example label on
the screen itself. Results that would need HotGreen's own model are blurred and say so.
"""
import html, os

HERE = os.path.dirname(os.path.abspath(__file__))
E = html.escape
LOGO = open(os.path.join(HERE, 'assets', 'hg-logo.svgfrag'), encoding='utf-8').read().strip()
IMG = '../assets/img/'

BACKERS = ['Coca-Cola Europacific Partners', 'Empirical Ventures', 'Deep Science Ventures', 'First Imagine!',
           'Conduit EIS Impact Fund', 'Almanac Ventures', 'Net Zero Technology Centre']
SPEC = [('Source', 'Air', 'Waste heat stream'),
        ('Outlet temperature', 'Up to 120°C', 'Up to 220°C'),
        ('Max steam pressure', '2 bar', '25 bar'),
        ('COP, 10°C to 120°C', '2.8', '2.8'),
        ('COP, 50°C to 120°C', '4.5', '4.5'),
        ('Thermal output', '0.5 MW, stackable to 10 MW', '0.5 MW, stackable to 10 MW'),
        ('Availability', '2026 orders for 2027 delivery', '2027 orders for 2028 delivery')]
ETS = [('Oils and fats', 10), ('Dairies', 8), ('Spirits', 8), ('Potatoes', 6), ('Beer', 5), ('Sugar', 5),
       ('Malt', 5), ('Grain milling', 4), ('Eleven other types', 17)]
assert sum(n for _, n in ETS) == 68

CSS = r"""
*{box-sizing:border-box}
body{margin:0;background:#9aa;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased}
.shot{width:1200px;height:auto;overflow:hidden;position:relative;margin:0 0 24px;background:#fff;color:#14231c}
.shot p{margin:0}
.mark{position:absolute;right:20px;bottom:18px;z-index:9;font:700 12px/1 ui-monospace,Menlo,monospace;letter-spacing:.1em;text-transform:uppercase;padding:7px 11px;border-radius:99px;background:#fff1dc;color:#8a4b12;border:1px solid #f0cf9f}
.mono{font-family:ui-monospace,Menlo,Consolas,monospace}
.btn{display:inline-block;padding:12px 22px;border-radius:99px;background:#39cb67;color:#00140c;font-weight:700;font-size:15px}
.btn.o{background:transparent;border:1.5px solid currentColor;color:inherit}
.btn.sm{padding:8px 14px;font-size:13px}
.chip{display:inline-block;border-radius:99px;padding:6px 12px;font-size:13px;margin:0 6px 8px 0}
.blur{filter:blur(6px);user-select:none}

/* their site */
.site{background:#001d11;color:#ecf4ed;padding-bottom:64px}
.site.light{background:#ecf4ed;color:#062015}
.nav{display:flex;align-items:center;gap:30px;padding:22px 48px;font-size:15px;color:#b9d3c1;border-bottom:1px solid #0b3222}
.light .nav{color:#305a44;border-color:#cfe3d5}
.logo{display:inline-flex;width:132px;color:#ecf4ed}
.light .logo{color:#001d11}
.logo svg{width:100%;height:auto}
.nav .sp{flex:1}
.site .chip{background:#00301d;border:1px solid #0f5a36;color:#dff0e4}
.light .chip{background:#fff;border:1px solid #cfe3d5;color:#1f3d2d}
.kick{font:600 13px/1 ui-monospace,Menlo,monospace;letter-spacing:.14em;text-transform:uppercase;color:#39cb67}
.light .kick{color:#1f8a47}
.shot .h1{font-size:50px;line-height:1.05;letter-spacing:-.02em;font-weight:700;margin:14px 0 18px}
.lead{font-size:19px;line-height:1.5;color:#b9d3c1;max-width:30em}
.light .lead{color:#305a44}
.pad{padding:40px 48px}
.tl{border-left:2px solid #39cb67;padding-left:18px}
.tl div{padding:7px 0;font-size:16px}
.tl b{display:block;font:600 12px ui-monospace,Menlo,monospace;color:#39cb67;margin-bottom:2px}

/* app shell */
.app{display:grid;grid-template-columns:220px 1fr}
.side{background:#0c1a14;color:#b7c9bf;padding:24px 18px;font-size:14px}
.side .logo{width:110px;margin-bottom:26px}
.side div{padding:9px 10px;border-radius:8px;margin-bottom:2px}
.side div.on{background:#18342a;color:#fff;font-weight:600}
.main{background:#f5f7f4;padding:28px 34px 72px;overflow:hidden}
.main h2{font-size:26px;margin:0 0 4px;letter-spacing:-.01em}
.sub{color:#5b6f66;font-size:15px}
.card{background:#fff;border:1px solid #e1e7e1;border-radius:14px;padding:18px 20px}
.tag{display:inline-block;align-self:start;justify-self:end;height:auto;font:600 12px ui-monospace,Menlo,monospace;padding:4px 9px;border-radius:99px;white-space:nowrap}
.t-ok{background:#dcf3e2;color:#1b6b39}.t-wait{background:#fbeccc;color:#7a5413}.t-new{background:#dcecf6;color:#1f5f7f}.t-red{background:#fde0da;color:#9b2d17}.t-grey{background:#e9edea;color:#4d5f57}
table{border-collapse:collapse;width:100%}
th,td{text-align:left;padding:12px 14px;border-bottom:1px solid #e6ebe6;font-size:15px;vertical-align:top}
th{font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#5b6f66;font-weight:600}

/* email */
.mailwrap{background:#eef1ee;padding:26px 60px 72px}
.mail{background:#fff;border-radius:14px;box-shadow:0 10px 30px -18px rgba(0,0,0,.35);overflow:hidden}
.mhead{padding:20px 30px;border-bottom:1px solid #e6ebe6;font-size:14px;color:#5b6f66}
.mhead b{color:#14231c}
.mbody{padding:24px 30px}
.item{padding:16px 0;border-bottom:1px solid #edf0ed}
.item h4{margin:0 0 4px;font-size:18px}
.item .src{font:600 12px ui-monospace,Menlo,monospace;color:#1f8a47}
.item p{margin-top:6px;color:#33483f;font-size:15px;line-height:1.5}

/* document */
.docwrap{background:#dfe4df;padding:34px 0 72px;display:flex;justify-content:center}
.doc{width:820px;background:#fff;border-radius:6px;box-shadow:0 20px 40px -24px rgba(0,0,0,.4);padding:44px 56px}
.doc h1{font-size:32px;margin:0 0 6px;letter-spacing:-.01em}
"""


def shot(sid, body, cls='', mark=None):
    m = f'<span class="mark">{E(mark)}</span>' if mark else ''
    return f'<section class="shot {cls}" id="m-{sid}">{body}{m}</section>'


def nav(light=False, active=None, cta='Request a site assessment'):
    links = ['Product', 'Applications', 'Working with us', 'News', 'Investors']
    ls = ''.join(f'<span style="{"color:#39cb67;font-weight:600" if l == active else ""}">{l}</span>' for l in links)
    return f'<div class="nav"><span class="logo">{LOGO}</span>{ls}<span class="sp"></span><span class="btn sm">{E(cta)}</span></div>'


def side(active):
    items = ['Enquiries', 'Site assessments', 'Pipeline', 'Targets', 'Campaigns', 'Weekly digest', 'Content', 'Investor updates', 'Data room']
    return f'<div class="side"><span class="logo">{LOGO}</span>' + ''.join(f'<div class="{"on" if i == active else ""}">{E(i)}</div>' for i in items) + '</div>'


# ---------------- B ----------------

def m_numbers():
    rows = [('Energy bill saving', [('30%', 'Solutions page'), ('40% compared to competitors', 'LinkedIn'), ('up to 50%', 'Empirical Ventures')], ('3 versions', 't-red')),
            ('Yearly saving', [('€250k a year, typical facility', 'Solutions page'), ('$250,000 a year per MW', 'LinkedIn')], ('2 versions', 't-wait')),
            ('CO2 avoided', [('1,500 t a year per MW', 'Solutions page')], ('Estimate', 't-grey')),
            ('Efficiency', [('4x a traditional boiler', 'Solutions page')], ('Estimate', 't-grey'))]
    tr = ''.join(f'<tr><td style="font-weight:600;width:190px">{E(a)}</td><td>' +
                 ''.join(f'<div style="margin-bottom:6px"><b>{E(v)}</b> <span class="sub">on {E(s)}</span></div>' for v, s in vs) +
                 f'</td><td style="width:150px"><span class="tag {c}">{E(t)}</span></td></tr>' for a, vs, (t, c) in rows)
    body = (f'<div class="app">{side("Content")}<div class="main"><h2>HotGreen fact sheet</h2><p class="sub">Every public number, with where it appears today. Each one gets agreed once with your engineers.</p>'
            f'<div class="card" style="margin-top:20px;padding:6px 8px"><table><tr><th>Claim</th><th>Where it appears today</th><th>Status</th></tr>{tr}</table></div>'
            '<div class="card" style="margin-top:16px;display:flex;gap:26px;align-items:center"><b style="font-size:15px">Once agreed</b>'
            '<span class="sub">Figure</span><span class="sub">Basis</span><span class="sub">Checked by</span><span class="sub">Date</span><span class="sub">Used on the site, deck, LinkedIn and calculator</span></div></div></div>')
    return shot('numbers', body)


def m_homeproof():
    names = ''.join(f'<span class="chip">{E(n)}</span>' for n in BACKERS)
    body = (f'<div class="site" >{nav()}<div class="pad" style="display:grid;grid-template-columns:1.1fr 1fr;gap:30px;align-items:center;padding-bottom:10px">'
            '<div><p class="kick">Industrial heat pumps</p><p class="h1">Steam from electricity, for food and drink plants</p>'
            '<p class="lead">HotGreen heat pumps replace a traditional boiler and use your existing pipework, so there’s no need to redesign your process.</p>'
            '<div style="margin-top:24px;display:flex;gap:12px"><span class="btn">Request a site assessment</span><span class="btn o">See the specs</span></div></div>'
            f'<img src="{IMG}hotstack.webp" style="width:100%"></div>'
            '<div style="display:grid;grid-template-columns:1fr 1fr;gap:40px;padding:14px 48px 0;border-top:1px solid #0b3222;margin:0 48px;padding-left:0;padding-right:0">'
            f'<div><p class="kick" style="margin-bottom:12px">Funders and partners</p>{names}</div>'
            '<div><p class="kick" style="margin-bottom:10px">Where HotGreen stands</p><div class="tl">'
            '<div><b>Oct 2025</b>£1.2m round led by Empirical Ventures</div><div><b>2025</b>One of three startups CCEP invested in</div>'
            '<div><b>2026</b>Innovate UK grant, 50 kW demonstration at a CCEP site</div></div></div></div></div>')
    return shot('homeproof', body, mark='Sketch of your homepage')


def m_investor():
    facts = [('Oct 2025', '£1.2m round closed, led by Empirical Ventures'), ('2025', 'Coca-Cola Europacific Partners invested'),
             ('2026', 'Innovate UK grant for a 50 kW demonstration at a CCEP site'), ('2027', 'Seed round planned')]
    tl = ''.join(f'<div><b>{E(a)}</b>{E(b)}</div>' for a, b in facts)
    field = lambda l: f'<div style="margin-bottom:14px"><div style="font-size:13px;color:#305a44;margin-bottom:5px">{E(l)}</div><div style="height:44px;border:1px solid #cfe3d5;border-radius:10px;background:#fff"></div></div>'
    body = (f'<div class="site light" >{nav(True, "Investors")}<div class="pad" style="display:grid;grid-template-columns:1.1fr .9fr;gap:50px">'
            '<div><p class="kick">For investors</p><p class="h1" style="font-size:44px">Industrial heat pumps, backed and in the field</p>'
            f'<div class="tl" style="margin-top:24px">{tl}</div></div>'
            '<div style="background:#fff;border:1px solid #cfe3d5;border-radius:18px;padding:28px"><p style="font-size:22px;font-weight:700;margin-bottom:6px">Request the investor deck</p>'
            f'<p style="color:#305a44;font-size:15px;margin-bottom:20px">It comes from Georgia Ware, our CEO.</p>{field("Name")}{field("Fund")}{field("Work email")}'
            '<span class="btn" style="display:block;text-align:center">Send request</span></div></div></div>')
    return shot('investor', body, mark='Sketch')


def m_press():
    arts = [('Empirical Ventures', '20 Oct 2025', 'Hot Green raises £1.2m …'),
            ('Tech.eu', '20 Oct 2025', 'HotGreen Solutions raises £1.2M …'),
            ('Vestbee', '21 Oct 2025', 'British HotGreen Solutions raises £1.2M …')]
    cards = ''.join(f'<div style="background:#fff;border:1px solid #cfe3d5;border-radius:16px;padding:22px"><p class="kick" style="color:#1f8a47">{E(o)}</p>'
                    f'<p style="font-size:13px;color:#5b7a67;margin:6px 0 14px">{E(d)}</p><p style="font-size:20px;font-weight:700;line-height:1.3">{E(t)}</p>'
                    '<p style="margin-top:16px;font-size:14px;color:#1f8a47;font-weight:600">Read the article →</p></div>' for o, d, t in arts)
    kit = ''.join(f'<div style="display:flex;justify-content:space-between;padding:12px 0;border-bottom:1px solid #cfe3d5;font-size:15px"><span>{E(x)}</span><span style="color:#1f8a47;font-weight:600">Download</span></div>'
                  for x in ['Logos', 'Product images', 'Fact sheet', 'Team photos'])
    body = (f'<div class="site light" >{nav(True, "News")}<div class="pad"><p class="kick">News</p><p class="h1" style="font-size:44px">HotGreen in the press</p>'
            f'<div style="display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:18px;margin-top:10px">{cards}'
            f'<div style="background:#001d11;color:#ecf4ed;border-radius:16px;padding:22px"><p class="kick">Press kit</p>{kit.replace("#cfe3d5", "#0b3222")}</div></div></div></div>')
    return shot('press', body, mark='Sketch, real articles')


def m_monthly():
    posts = [('November 2026', 'Monthly update'), ('October 2026', 'Monthly update'), ('September 2026', 'Monthly update')]
    feat = (f'<div style="display:grid;grid-template-columns:1fr 1fr;gap:26px;background:#fff;border:1px solid #cfe3d5;border-radius:18px;overflow:hidden">'
            f'<div style="background:#001d11;display:flex;align-items:center;justify-content:center"><img src="{IMG}hotstack.webp" style="width:86%"></div>'
            '<div style="padding:26px 26px 26px 0"><p class="kick" style="color:#1f8a47">November 2026</p><p style="font-size:28px;font-weight:700;margin:10px 0">What we built this month</p>'
            '<p style="color:#305a44;font-size:16px;line-height:1.55">A short public version of the monthly investor email. Progress, what’s next, and where to meet us.</p>'
            '<p style="margin-top:16px;color:#1f8a47;font-weight:600">Read the update →</p></div></div>')
    lst = ''.join(f'<div style="display:flex;justify-content:space-between;padding:16px 4px;border-bottom:1px solid #cfe3d5;font-size:17px"><span><b>{E(a)}</b> · {E(b)}</span><span style="color:#1f8a47">Read →</span></div>' for a, b in posts[1:])
    body = f'<div class="site light" >{nav(True, "News")}<div class="pad"><p class="kick">Monthly updates</p><div style="margin-top:18px">{feat}</div><div style="margin-top:10px">{lst}</div></div></div>'
    return shot('monthly', body, mark='Example')


def m_evidence():
    need = [('Engineering', 'Steam temperature and COP, hour by hour'), ('Operations', 'Uptime and how it follows the production schedule'),
            ('Finance', 'Energy cost per tonne of steam, before and after'), ('Investors', 'Milestones against the plan')]
    rows = ''.join(f'<div style="display:grid;grid-template-columns:130px 1fr;gap:12px;padding:12px 0;border-bottom:1px solid #cfe3d5;font-size:15px"><b>{E(a)}</b><span style="color:#305a44">{E(b)}</span></div>' for a, b in need)
    line = 'M40 150 C90 140 110 90 160 96 S240 70 290 78 S370 60 450 64'
    chart = ('<div style="position:relative"><svg viewBox="0 0 460 210" width="100%" height="210" class="blur"><g stroke="#cfe3d5"><line x1="40" y1="20" x2="40" y2="190"/><line x1="40" y1="190" x2="450" y2="190"/>'
             '<line x1="40" y1="140" x2="450" y2="140" stroke-dasharray="3 5"/><line x1="40" y1="90" x2="450" y2="90" stroke-dasharray="3 5"/><line x1="40" y1="40" x2="450" y2="40" stroke-dasharray="3 5"/></g>'
             f'<path d="{line} L450 190 L40 190 Z" fill="#39cb67" opacity=".16"/><path d="{line}" fill="none" stroke="#1f8a47" stroke-width="4"/></svg>'
             '<div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center">'
             '<p style="background:#fff;border:1px solid #cfe3d5;border-radius:999px;padding:9px 18px;font-size:15px;font-weight:600;color:#12311f">Filled from the unit’s own data</p>'
             '<p style="font-size:13px;color:#5b7a67;margin-top:8px">if CCEP agrees to share it</p></div></div>')
    steps = [('Installed', 'Planned for the first half of 2027', True), ('Running', 'Readings logged every hour', False), ('Results published', 'One page per approver', False)]
    st = ''.join(f'<div style="display:flex;gap:14px;align-items:flex-start"><span style="flex:none;width:30px;height:30px;border-radius:50%;display:grid;place-items:center;font-weight:700;font-size:14px;{"background:#1f8a47;color:#fff" if on else "background:#fff;border:2px solid #b9d3c1;color:#305a44"}">{i}</span>'
                 f'<span><b style="display:block;font-size:16px">{E(a)}</b><span style="font-size:14px;color:#305a44">{E(b)}</span></span></div>' for i, (a, b, on) in enumerate(steps, 1))
    body = (f'<div class="site light" >{nav(True)}<div class="pad"><p class="kick">The CCEP demonstrator</p>'
            '<p class="h1" style="font-size:40px">A 50 kW demonstration heat pump at a Coca-Cola Europacific Partners site, funded by Innovate UK</p>'
            f'<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:20px;background:#fff;border:1px solid #cfe3d5;border-radius:16px;padding:20px 24px;margin-bottom:22px">{st}</div>'
            '<div style="display:grid;grid-template-columns:1fr 1fr;gap:26px">'
            f'<div style="background:#fff;border:1px solid #cfe3d5;border-radius:16px;padding:20px 24px"><p style="font-weight:700;font-size:17px;margin-bottom:4px">What each approver will see</p>{rows}</div>'
            f'<div style="background:#fff;border:1px solid #cfe3d5;border-radius:16px;padding:20px 24px"><p style="font-weight:700;font-size:17px;margin-bottom:8px">Steam temperature, hour by hour</p>{chart}</div></div></div></div>')
    return shot('evidence', body, mark='Sketch')


def m_dataroom():
    folders = ['01 Company', '02 Financials', '03 Technology and IP', '04 Demonstrator', '05 Commercial', '06 Team']
    fl = ''.join(f'<div style="display:flex;align-items:center;gap:12px;padding:13px 16px;border-bottom:1px solid #edf0ed;font-size:16px"><span style="width:22px;height:17px;border-radius:3px;background:#39cb67;display:inline-block"></span>{E(f)}</div>' for f in folders)
    log = [('Investor A', 'Financials', 'today'), ('Investor B', 'Technology and IP', 'yesterday'), ('Investor A', 'Demonstrator', 'yesterday'), ('Investor C', 'Company', '3 days ago')]
    lg = ''.join(f'<tr><td><b>{E(a)}</b></td><td>{E(b)}</td><td class="sub">{E(c)}</td></tr>' for a, b, c in log)
    body = (f'<div class="app">{side("Data room")}<div class="main"><h2>Seed data room</h2><p class="sub">One link for diligence. You see who opened what.</p>'
            f'<div style="display:grid;grid-template-columns:1fr 1.1fr;gap:18px;margin-top:20px"><div class="card" style="padding:4px 0">{fl}</div>'
            f'<div class="card" style="padding:6px 8px"><p style="font-weight:700;padding:10px 14px 0">Who opened what</p><table><tr><th>Investor</th><th>Folder</th><th>When</th></tr>{lg}</table></div></div></div></div>')
    return shot('dataroom', body, mark='Example')


# ---------------- C ----------------

def m_positioning():
    proofs = ['Coca-Cola Europacific Partners invested in 2025', 'Innovate UK funds a 50 kW demonstration at a CCEP site', 'Replaces a traditional boiler and uses the existing pipework']
    pr = ''.join(f'<div style="background:#ecf4ed;border-radius:12px;padding:16px;font-size:15px;line-height:1.4"><b style="display:block;color:#1f8a47;font-size:12px;letter-spacing:.1em;margin-bottom:6px" class="mono">PROOF {i}</b>{E(p)}</div>' for i, p in enumerate(proofs, 1))
    body = (f'<div class="docwrap"><div class="doc"><p class="kick" style="color:#1f8a47">HotGreen message guide</p><h1 style="margin-top:10px">One story, told the same way everywhere</h1>'
            '<p style="font-weight:700;margin:24px 0 8px">The one line</p><div style="background:#ecf4ed;border-radius:12px;padding:18px 20px"><p class="blur" style="font-size:24px;font-weight:700;color:#12311f">What HotGreen makes and who it’s for, in one line</p><p style="font-size:14px;color:#305a44;margin-top:8px">Written together in the workshop</p></div>'
            f'<p style="font-weight:700;margin:22px 0 8px">The proof behind it</p><div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px">{pr}</div>'
            '<p style="font-weight:700;margin:22px 0 8px">The mission, on top</p><p style="font-size:18px">HotGreen is on a mission to save manufacturers money while cutting carbon.</p></div></div>')
    return shot('positioning', body, mark='Example')


def m_lookfeel():
    body = ('<div style="background:#0f1a15;display:grid;grid-template-columns:1fr 1fr;gap:26px;padding:40px 40px 72px">'
            f'<div><p class="kick" style="color:#9fb3a8;margin-bottom:12px">Today</p><img src="{IMG}site-before.jpg" style="width:100%;border-radius:12px;border:1px solid #2a3b33"></div>'
            f'<div><p class="kick" style="margin-bottom:12px">New layout, in your Framer</p><img src="{IMG}ex/homeproof.webp" style="width:100%;border-radius:12px;border:1px solid #2a3b33"></div>'
            '<p style="grid-column:1 / span 2;color:#c9d6cf;font-size:17px;align-self:end">Your pages, rebuilt around the proof. You keep editing them yourselves in Framer.</p></div>')
    return shot('lookfeel', body, mark='Sketch')


def m_product():
    rows = ''.join(f'<tr><td style="color:#4b6b58">{E(a)}</td><td>{E(b)}</td><td>{E(c)}</td></tr>' for a, b, c in SPEC)
    apps = ''.join(f'<span class="chip">{E(a)}</span>' for a in ['Pasteurisation', 'Brewing', 'Distillation', 'Drying', 'Sterilisation'])
    body = (f'<div class="site light" >{nav(True, "Product")}<div class="pad" style="display:grid;grid-template-columns:.85fr 1.15fr;gap:34px;padding-top:28px">'
            f'<div><p class="kick">Product</p><p class="h1" style="font-size:46px;margin-bottom:8px">HotStack</p><p class="lead" style="font-size:17px">Low carbon steam for industry, from air or from a waste heat stream.</p>'
            f'<img src="{IMG}hotstack.webp" style="width:100%;margin-top:6px"><div>{apps}</div></div>'
            f'<div><table style="background:#fff;border-radius:14px;overflow:hidden"><tr><th></th><th>HotStack 120</th><th>HotStack 220</th></tr>{rows}</table>'
            '<div style="display:flex;gap:12px;margin-top:18px"><span class="btn">Download the datasheet</span><span class="btn o">Request a site assessment</span></div></div></div></div>')
    return shot('product', body, mark='Sketch, your real specs')


def m_working():
    steps = [('1', 'Site survey', 'We look at your steam demand, temperatures and hours.'),
             ('2', 'Sizing and business case', 'Your engineer sizes the system and builds the case.'),
             ('3', 'Install', 'As quick as 3 to 5 days with the air source module.'),
             ('4', 'Service', 'Monitoring, maintenance and spares.')]
    st = ''.join(f'<div style="background:#fff;border:1px solid #cfe3d5;border-radius:16px;padding:20px"><span style="display:inline-grid;place-items:center;width:34px;height:34px;border-radius:50%;background:#001d11;color:#ecf4ed;font-weight:700">{a}</span>'
                 f'<p style="font-size:18px;font-weight:700;margin:14px 0 6px">{E(b)}</p><p style="color:#305a44;font-size:15px;line-height:1.45">{E(c)}</p></div>' for a, b, c in steps)
    secs = [('Warranty', 'What’s covered and for how long'), ('Spares', 'What’s kept in stock and how fast it ships'), ('Certification', 'The standards HotStack meets')]
    sc = ''.join(f'<div style="border-top:2px solid #39cb67;padding-top:12px"><p style="font-weight:700;font-size:17px">{E(a)}</p><p style="color:#305a44;font-size:15px;margin-top:4px">{E(b)}</p></div>' for a, b in secs)
    body = (f'<div class="site light" >{nav(True, "Working with us")}<div class="pad"><p class="kick">Working with HotGreen</p><p class="h1" style="font-size:42px">From first survey to steam, in four steps</p>'
            f'<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px">{st}</div><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:26px;margin-top:28px">{sc}</div></div></div>')
    return shot('working', body, mark='Sketch')


def m_linkedin():
    cal = [('Mon 2 Nov', 'The EU heat auction, explained'), ('Mon 9 Nov', 'Inside the HotStack'), ('Mon 16 Nov', 'Meet the engineers'), ('Mon 23 Nov', 'Monthly progress')]
    cl = ''.join(f'<div style="display:flex;gap:12px;align-items:center;padding:12px 0;border-bottom:1px solid #e3e8e3;font-size:15px"><span class="mono" style="width:92px;color:#5b6f66;font-size:13px">{E(a)}</span><b>{E(b)}</b></div>' for a, b in cal)
    post = (f'<div style="background:#fff;border:1px solid #dfe3df;border-radius:12px;overflow:hidden"><div style="display:flex;gap:12px;align-items:center;padding:16px 18px">'
            f'<span style="width:48px;height:48px;border-radius:8px;background:#001d11;display:grid;place-items:center;padding:6px"><span class="logo" style="width:40px">{LOGO}</span></span>'
            '<div><b style="font-size:15px">HotGreen Solutions</b><p style="font-size:13px;color:#5b6f66">Industrial heat pumps</p></div></div>'
            '<p style="padding:0 18px 14px;font-size:15px;line-height:1.5">The EU’s €1bn heat auction is expected to open in early December. Heat pumps with a COP of at least 1.5 get a 25% bonus when bids are ranked. Here’s what that means for food and drink plants.</p>'
            f'<div style="background:#001d11;display:flex;justify-content:center"><img src="{IMG}hotstack.webp" style="width:62%"></div>'
            '<div style="display:flex;justify-content:space-around;padding:12px;font-size:14px;color:#5b6f66;font-weight:600"><span>Like</span><span>Comment</span><span>Repost</span><span>Send</span></div></div>')
    body = (f'<div style="background:#f3f2ef;display:grid;grid-template-columns:1fr 1fr;gap:30px;padding:34px 44px 72px;align-items:start">{post}'
            f'<div><p style="font-size:24px;font-weight:700;margin-bottom:4px">November posting plan</p><p class="sub" style="margin-bottom:10px">Company page and Georgia’s profile. You post them yourselves.</p>{cl}</div></div>')
    return shot('linkedin', body, mark='Example draft')


# ---------------- D ----------------

def m_calculator():
    ins = [('Country', 'Netherlands'), ('Steam demand', '1 MW'), ('Hours a year', '6,000'), ('Steam temperature', '120°C'), ('Gas price', 'Your own, or the official average'), ('Electricity price', 'Your own, or the official average')]
    fi = ''.join(f'<div style="margin-bottom:12px"><div style="font-size:13px;color:#305a44;margin-bottom:5px">{E(a)}</div><div style="height:44px;border:1px solid #cfe3d5;border-radius:10px;background:#fff;padding:11px 14px;font-size:15px;color:{"#8aa596" if "official" in b else "#062015"}">{E(b)}</div></div>' for a, b in ins)
    tiles = ''.join(f'<div style="background:#fff;border:1px solid #cfe3d5;border-radius:14px;padding:16px"><p style="font-size:13px;color:#305a44">{E(t)}</p><p class="blur" style="font-size:30px;font-weight:700;margin-top:8px">{v}</p></div>'
                    for t, v in [('Energy cost a year', '€ 000,000'), ('Carbon cost a year', '€ 00,000'), ('Payback', '0.0 years')])
    bars = ('<svg viewBox="0 0 420 180" width="100%" height="170" class="blur"><rect x="40" y="30" width="110" height="130" rx="6" fill="#9fb3a8"/><rect x="250" y="80" width="110" height="80" rx="6" fill="#39cb67"/></svg>')
    body = (f'<div class="site light" >{nav(True, "Product")}<div class="pad" style="display:grid;grid-template-columns:.8fr 1.2fr;gap:34px;padding-top:26px">'
            f'<div><p class="kick">Savings calculator</p><p style="font-size:30px;font-weight:700;margin:10px 0 16px">Your site, your prices</p>{fi}</div>'
            f'<div><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px">{tiles}</div>'
            f'<div style="background:#fff;border:1px solid #cfe3d5;border-radius:14px;padding:16px;margin-top:12px"><p style="font-size:14px;color:#305a44">Before and after</p>{bars}</div>'
            '<p style="margin-top:12px;font-size:15px;color:#305a44">Figures come from your own business case model. Every assumption is shown.</p>'
            '<div style="margin-top:12px"><span class="btn">Send me this business case</span></div></div></div></div>')
    return shot('calculator', body, mark='Sketch, figures from your model')


def m_funding():
    rows = [('SDE++', 'Netherlands, RVO', 'Open 27 Oct to 26 Nov 2026. €8bn in total. Industrial heat pumps from 500 kWth with a COP of 2.3 or more, halogen free refrigerant.', 'Open soon', 't-ok'),
            ('EU heat auction', 'European Commission', '€1bn. Expected to open in early December 2026. Heat pumps with a COP of at least 1.5 get a 25% ranking bonus.', 'Expected Dec 2026', 't-new')]
    rs = ''.join(f'<div class="card" style="margin-bottom:14px;display:grid;grid-template-columns:1fr auto;gap:18px"><div><p style="font-size:20px;font-weight:700">{E(a)}</p><p class="sub" style="margin:2px 0 8px">{E(b)}</p><p style="font-size:15px;line-height:1.5;color:#33483f">{E(c)}</p></div><span class="tag {k}">{E(t)}</span></div>' for a, b, c, t, k in rows)
    body = (f'<div class="site light" >{nav(True, "Product")}<div class="pad" style="padding-top:28px"><p class="kick">Funding finder</p>'
            '<div style="display:flex;align-items:end;gap:20px;margin:10px 0 20px"><p style="font-size:30px;font-weight:700">Funding for a site in</p><div style="height:48px;border:1px solid #cfe3d5;border-radius:10px;background:#fff;padding:10px 16px;font-size:20px;font-weight:600">Netherlands ▾</div></div>'
            f'{rs}<p class="sub">Last checked 25 September 2026</p></div></div>')
    return shot('funding', body, mark='Sketch, real schemes')


def m_auction():
    facts = [('€1bn', 'Budget, from EU emissions trading revenues'), ('Early Dec 2026', 'Expected to open to bidders'), ('25%', 'Ranking bonus for heat pumps with a COP of at least 1.5'), ('5 years', 'Subsidy paid for up to five years')]
    fc = ''.join(f'<div style="background:#ecf4ed;border-radius:12px;padding:16px"><p style="font-size:26px;font-weight:800;color:#001d11">{E(a)}</p><p style="font-size:14px;color:#305a44;margin-top:4px;line-height:1.4">{E(b)}</p></div>' for a, b in facts)
    steps = ['Check your process heat and your site fit', 'Size the HotStack with our engineers', 'Build the bid with your energy partner']
    sp = ''.join(f'<div style="display:flex;gap:12px;align-items:center;padding:10px 0;font-size:16px"><span style="display:inline-grid;place-items:center;width:28px;height:28px;border-radius:50%;background:#001d11;color:#ecf4ed;font-weight:700;font-size:14px">{i}</span>{E(s)}</div>' for i, s in enumerate(steps, 1))
    body = (f'<div class="docwrap"><div class="doc"><div style="display:flex;justify-content:space-between;align-items:center"><span class="logo" style="width:120px;color:#001d11">{LOGO}</span><span class="sub mono">Guide · Sep 2026</span></div>'
            '<h1 style="margin-top:24px">The EU heat auction, for food and drink plants</h1>'
            f'<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin:22px 0">{fc}</div><p style="font-weight:700;margin-bottom:4px">How to bid with a HotStack</p>{sp}'
            '<p class="sub" style="margin-top:16px;font-size:13px">Source, European Commission, 24 September 2026, and the auction’s terms and conditions.</p></div></div>')
    return shot('auction', body, mark='Sketch, real rules')


# ---------------- E ----------------

def m_routes():
    tabs = ['Investor', 'Site assessment', 'Customer', 'Partner', 'Press']
    tb = ''.join(f'<span style="padding:10px 16px;border-radius:10px;font-size:15px;{"background:#001d11;color:#ecf4ed;font-weight:600" if t == "Site assessment" else "background:#fff;border:1px solid #cfe3d5"}">{E(t)}</span>' for t in tabs)
    fl = ['Company', 'Site location', 'Steam demand', 'Steam temperature', 'Hours a year', 'Current fuel']
    ff = ''.join(f'<div><div style="font-size:13px;color:#305a44;margin-bottom:5px">{E(f)}</div><div style="height:44px;border:1px solid #cfe3d5;border-radius:10px;background:#fff"></div></div>' for f in fl)
    body = (f'<div class="site light" >{nav(True)}<div class="pad" style="padding-top:28px"><p class="kick">Get in touch</p><p style="font-size:30px;font-weight:700;margin:10px 0 18px">What can we help with?</p>'
            f'<div style="display:flex;gap:10px;flex-wrap:wrap">{tb}</div><div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px;margin-top:24px">{ff}</div>'
            '<div style="margin-top:24px;display:flex;align-items:center;gap:16px"><span class="btn">Request a site assessment</span><span class="sub">Goes straight to engineering, with the steam data attached.</span></div></div></div>')
    return shot('routes', body, mark='Sketch')


def m_assessment():
    q = [('Brewery', 'Draft ready', 't-ok', True), ('Dairy', 'Waiting for metering data', 't-wait', False), ('Distillery', 'Engineer checking', 't-new', False), ('Food plant', 'New', 't-grey', False)]
    ql = ''.join(f'<div style="display:flex;justify-content:space-between;align-items:center;padding:14px 16px;border-bottom:1px solid #edf0ed;{"background:#eef7f1" if on else ""}"><b style="font-size:16px">{E(a)}</b><span class="tag {k}">{E(s)}</span></div>' for a, s, k, on in q)
    inp = [('Steam demand', '2 MW'), ('Temperature', '120°C'), ('Hours a year', '5,000'), ('Current fuel', 'Gas')]
    ip = ''.join(f'<div><p class="sub" style="font-size:13px">{E(a)}</p><p style="font-size:18px;font-weight:700">{E(b)}</p></div>' for a, b in inp)
    body = (f'<div class="app">{side("Site assessments")}<div class="main"><h2>Site assessments</h2><p class="sub">Enquiries arrive with steam data. Your model drafts, your engineer checks.</p>'
            f'<div style="display:grid;grid-template-columns:.8fr 1.2fr;gap:18px;margin-top:18px"><div class="card" style="padding:0">{ql}</div>'
            f'<div class="card"><p style="font-size:20px;font-weight:700">Brewery enquiry</p><div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin:14px 0;padding:14px 0;border-top:1px solid #edf0ed;border-bottom:1px solid #edf0ed">{ip}</div>'
            '<p style="font-weight:700;margin-bottom:8px">First draft, from your model</p>'
            '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px"><div style="background:#f5f7f4;border-radius:10px;padding:12px"><p class="sub" style="font-size:13px">Sizing</p><p class="blur" style="font-size:20px;font-weight:700">0 x HotStack 000</p></div>'
            '<div style="background:#f5f7f4;border-radius:10px;padding:12px"><p class="sub" style="font-size:13px">Payback</p><p class="blur" style="font-size:20px;font-weight:700">0.0 years</p></div></div>'
            '<div style="display:flex;gap:10px;margin-top:16px"><span class="btn sm">Approve and send</span><span class="btn sm o">Edit</span></div></div></div></div></div>')
    return shot('assessment', body, mark='Example data')


def m_tracker():
    cols = [('Enquiry', [('Brewery', '18 years', 'Aug 2027')]), ('Assessment', [('Dairy', '22 years', 'Jul 2027'), ('Distillery', '15 years', 'Dec 2027')]),
            ('Proposal', [('Food plant', '25 years', 'Jun 2027')]), ('Budget approved', [('Maltings', '20 years', 'Sep 2027')])]
    cl = ''.join(f'<div style="background:#e9eee9;border-radius:14px;padding:12px"><p style="font-weight:700;font-size:15px;margin:2px 4px 10px">{E(n)} <span class="sub">{len(cs)}</span></p>' +
                 ''.join(f'<div class="card" style="padding:14px;margin-bottom:10px"><b style="font-size:16px">{E(a)}</b><div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:10px;font-size:13px"><span class="sub">Boiler age</span><span>{E(b)}</span><span class="sub">Shutdown</span><span>{E(c)}</span></div></div>' for a, b, c in cs) +
                 '</div>' for n, cs in cols)
    body = f'<div class="app">{side("Pipeline")}<div class="main"><h2>Pipeline, by site</h2><p class="sub">Every site with its next date.</p><div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-top:18px">{cl}</div></div></div>'
    return shot('tracker', body, mark='Example data')


def m_targets():
    top = max(n for _, n in ETS)
    bars = ''.join(f'<div style="display:grid;grid-template-columns:170px 1fr 40px;gap:12px;align-items:center;padding:6px 0;font-size:15px"><span>{E(s)}</span>'
                   f'<span style="height:20px;border-radius:0 5px 5px 0;background:{"#a9b8b0" if "other" in s else "#2f8f4e"};width:{n / top * 100:.1f}%"></span><b style="text-align:right">{n}</b></div>' for s, n in ETS)
    body = (f'<div class="app">{side("Targets")}<div class="main"><h2>68 UK food and drink sites</h2><p class="sub">From the UK emissions trading register, open accounts, by type of plant. Run by 50 companies.</p>'
            f'<div class="card" style="margin-top:18px;padding:20px 26px">{bars}</div><p class="sub" style="margin-top:12px;font-size:13px">Source, UK ETS compliance report 2026. Screened next with your engineers for temperature and fuel.</p></div></div>')
    return shot('targets', body)


def m_outbound():
    st = [('Step 1', 'Email', 'Results from our CCEP demonstrator'), ('Step 2', 'LinkedIn', 'A note from Georgia'), ('Step 3', 'Email', 'Offer of a free site assessment')]
    sl = ''.join(f'<div class="card" style="display:grid;grid-template-columns:90px 110px 1fr;gap:12px;align-items:center;margin-bottom:10px"><span class="mono" style="color:#1f8a47;font-weight:600">{E(a)}</span><span class="tag t-grey" style="justify-self:start">{E(b)}</span><b style="font-size:16px">{E(c)}</b></div>' for a, b, c in st)
    body = (f'<div class="app">{side("Campaigns")}<div class="main"><h2>Campaign, once there’s demonstrator data</h2><p class="sub">Written and run by us, within each country’s rules.</p>'
            f'<div style="display:grid;grid-template-columns:1.3fr .7fr;gap:18px;margin-top:18px"><div>{sl}</div>'
            '<div class="card"><p class="sub">Audience</p><p style="font-size:34px;font-weight:800;margin:6px 0">68 sites</p><p style="font-size:15px;color:#33483f">UK food and drink sites from the target list, screened with your engineers</p></div></div></div></div>')
    return shot('outbound', body, mark='Example')


# ---------------- F ----------------

def m_digest():
    items = [('European Commission, 24 Sep 2026', 'Rules published for the €1bn industrial heat auction', 'Heat pumps with a COP of at least 1.5 get a 25% bonus when bids are ranked. Expected to open to bidders in early December.'),
             ('RVO, Netherlands', 'SDE++ opens 27 October with €8bn', 'Includes an industrial heat pump category from 500 kWth with a COP of at least 2.3.')]
    it = ''.join(f'<div class="item"><p class="src">{E(s)}</p><h4>{E(h)}</h4><p>{E(p)}</p></div>' for s, h, p in items)
    body = (f'<div class="mailwrap"><div class="mail"><div class="mhead"><b>HotGreen weekly</b> to Sanya, Georgia<br><span style="font-size:20px;color:#14231c;font-weight:700;display:block;margin-top:8px">Regulation and funding, this week</span></div>'
            f'<div class="mbody">{it}<div class="item" style="border:0"><h4>Coming up</h4><div style="display:flex;gap:10px;margin-top:8px">'
            '<span class="tag t-ok">27 Oct, SDE++ opens</span><span class="tag t-wait">26 Nov, SDE++ closes</span><span class="tag t-new">Early Dec, EU heat auction</span></div></div></div></div></div>')
    return shot('digest', body, mark='Example issue, real items')


def m_watch():
    secs = [('New products', 'Competitor A adds a higher temperature model'), ('Patents', 'Competitor B files on a compressor design'), ('Grants', 'Competitor C wins a demonstration grant')]
    it = ''.join(f'<div class="item"><p class="src">{E(s)}</p><h4>{E(h)}</h4><p>What it is, why it matters to you, and the link.</p></div>' for s, h in secs)
    body = f'<div class="mailwrap"><div class="mail"><div class="mhead"><b>Competitor watch</b> to Sanya, Georgia<br><span style="font-size:20px;color:#14231c;font-weight:700;display:block;margin-top:8px">What your competitors did this month</span></div><div class="mbody">{it}</div></div></div>'
    return shot('watch', body, mark='Example')


def m_content():
    drafts = [('LinkedIn post', 'Dutch plants can apply for SDE++ from 27 October. Industrial heat pumps from 500 kWth qualify if their COP is at least 2.3.', 'Waiting for you', 't-wait'),
              ('News item', 'The EU publishes the rules for its €1bn industrial heat auction, and what it means for food and drink plants.', 'Approved', 't-ok'),
              ('Search article', 'Industrial heat pumps for breweries, a plain guide to steam from electricity.', 'Drafting', 't-grey')]
    dl = ''.join(f'<div class="card" style="margin-bottom:12px;display:grid;grid-template-columns:1fr auto;gap:16px"><div><p class="sub" style="font-size:13px">{E(a)}</p><p style="font-size:16px;line-height:1.5;margin-top:4px">{E(b)}</p>'
                 + ('<div style="display:flex;gap:10px;margin-top:12px"><span class="btn sm">Approve</span><span class="btn sm o">Edit</span></div>' if k == 't-wait' else '') +
                 f'</div><span class="tag {k}">{E(t)}</span></div>' for a, b, t, k in drafts)
    body = f'<div class="app">{side("Content")}<div class="main"><h2>Content helper</h2><p class="sub">Drafts from your agreed numbers and the weekly digest. Nothing goes out until you approve it.</p><div style="margin-top:18px">{dl}</div></div></div>'
    return shot('content', body, mark='Example drafts')


def m_update():
    fl = [('Milestones this month', '3 bullet points'), ('Numbers', 'Pipeline, cash, team'), ('What you need from investors', 'Introductions, advice')]
    ff = ''.join(f'<div style="margin-bottom:14px"><div style="font-size:13px;color:#305a44;margin-bottom:5px">{E(a)}</div><div style="min-height:60px;border:1px solid #cfe3d5;border-radius:10px;background:#fff;padding:10px;color:#8aa596">{E(b)}</div></div>' for a, b in fl)
    draft = ('<div class="card" ><p class="sub" style="font-size:13px">Draft, ready for Georgia</p><p style="font-size:20px;font-weight:700;margin:6px 0 12px">HotGreen, monthly update</p>'
             '<p style="font-weight:700;margin-top:10px">This month</p><p class="blur" style="line-height:1.6">Three short lines on the month, written from the form.</p>'
             '<p style="font-weight:700;margin-top:12px">Numbers</p><p class="blur" style="line-height:1.6">Pipeline, cash and team, taken from the form.</p>'
             '<p style="font-weight:700;margin-top:12px">How you can help</p><p class="blur" style="line-height:1.6">The introductions you’d like this month.</p>'
             '<p class="sub" style="margin-top:14px">A shorter public version goes to the monthly update page.</p></div>')
    body = f'<div class="app">{side("Investor updates")}<div class="main"><h2>Investor update helper</h2><p class="sub">Fill in a short form. Get a draft email and a public version.</p><div style="display:grid;grid-template-columns:.9fr 1.1fr;gap:18px;margin-top:18px"><div>{ff}</div>{draft}</div></div></div>'
    return shot('update', body, mark='Example')


SCREENS = [m_numbers, m_homeproof, m_investor, m_press, m_monthly, m_evidence, m_dataroom,
           m_positioning, m_product, m_working, m_linkedin,
           m_calculator, m_funding, m_auction,
           m_routes, m_assessment, m_tracker, m_targets, m_outbound,
           m_digest, m_watch, m_content, m_update]
LATE = [m_lookfeel]  # needs the homeproof render first


def main(late=False):
    os.makedirs(os.path.join(HERE, 'mocks'), exist_ok=True)
    body = ''.join(f() for f in (LATE if late else SCREENS))
    with open(os.path.join(HERE, 'mocks', 'late.html' if late else 'index.html'), 'w', encoding='utf-8') as f:
        f.write(f'<!doctype html><html lang="en-GB"><head><meta charset="utf-8"><style>{CSS}</style></head><body>{body}</body></html>')
    print('screens', len(LATE if late else SCREENS))


if __name__ == '__main__':
    import sys
    main('--late' in sys.argv)
