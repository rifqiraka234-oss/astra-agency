#!/usr/bin/env python3
"""justclaims.eu prototype, v2 design language. Reuses the verified data and fragments of build.py
(clocks, verbatim quotes, dials, charts, readiness map) and writes new templates to ../../site-v2/.
v1 stays untouched in ../../site/."""
import os, re, json, math, shutil, datetime, html
V2 = os.path.dirname(os.path.abspath(__file__))
B1 = os.path.abspath(os.path.join(V2, '..'))
src = open(os.path.join(B1, 'build.py'), encoding='utf-8').read().split("if __name__ == '__main__':")[0]
G = {'__file__': os.path.join(B1, 'build.py'), '__name__': 'v1'}
exec(compile(src, os.path.join(B1, 'build.py'), 'exec'), G)
CL, E, DAYS, OJ, AR, TBC, LOGO, LOGOTAG = G['CL'], G['E'], G['DAYS'], G['OJ'], G['AR'], G['TBC'], G['LOGO'], G['LOGOTAG']
TODAY, APPLIES, FORCE, PUB, NDAYS = G['TODAY'], G['APPLIES'], G['FORCE'], G['PUB'], G['NDAYS']
OUT = os.path.abspath(os.path.join(B1, '..', 'site-v2'))
SITE_URL = 'https://astra-justclaims-v2.netlify.app'

NAV = [('new-rules.html', 'The new rules', 'rules'), ('platform.html', 'Platform', 'platform'), ('customers.html', 'Customers', 'customers'),
       ('resources.html', 'Resources', 'resources'), ('about.html', 'About', 'about')]

HOME_NAV = [('#how', 'How it works', 'how'), ('#rules', 'The new rules', 'rules'), ('#customers', 'Customers', 'customers'), ('about.html', 'About', 'about')]
def header(cur):
    nav = HOME_NAV if cur == 'home' else NAV
    links = ''.join(f'<a href="{h}"' + (' aria-current="page"' if k == cur else '') + f'>{t}</a>' for h, t, k in nav)
    mlinks = ''.join(f'<a href="{h}">{t}</a>' for h, t, k in nav)
    cta = '#walkthrough' if cur == 'home' else 'request-a-demo.html'
    days = '#rules' if cur == 'home' else 'new-rules.html#timeline'
    return f'''<a class="skip" href="#main">Skip to content</a>
<header class="nav2" data-nav>
  <a class="brand" href="index.html" aria-label="justclaims.eu home">{LOGO}</a>
  <nav class="links" aria-label="Main">{links}</nav>
  <div class="nav-r">
    <a class="days" href="{days}" title="Days until Regulation (EU) 2026/2202 applies"><i class="pulse" aria-hidden="true"></i><b data-days-n>{DAYS}</b> days to apply</a>
    <a class="b pri sm" href="{cta}">Request a walkthrough</a>
    <button class="menu" type="button" aria-expanded="false" aria-controls="mnav" aria-label="Menu"><span></span><span></span></button>
  </div>
</header>
<nav class="mnav2" id="mnav" aria-label="Mobile"><a href="index.html">Home</a>{mlinks}<a href="readiness.html">Readiness check</a><a class="b pri" href="{cta}">Request a walkthrough</a></nav>
<aside class="draft" aria-label="Draft status"><i aria-hidden="true"></i><span class="d-l">Draft for CHS Claims Handling Solutions, not live. Anything tagged To confirm needs your check.</span><span class="d-s">Draft for CHS, not live. To confirm tags need your check.</span></aside>'''

FOOTER = f'''<footer class="foot">
  <div class="wrap foot-in">
    <div class="foot-brand">{LOGOTAG}<p>Passenger claims management for airlines. A product of CHS Claims Handling Solutions GmbH, founded in 2017 by aviation attorneys.</p></div>
    <div><h2>The new rules</h2><ul><li><a href="new-rules.html">The time limits on one ruler</a></li><li><a href="claim-clock.html">Claim clock</a></li><li><a href="readiness.html">Readiness check</a></li><li><a href="96-hour-notice.html">The 96 hour notice</a></li><li><a href="30-days-to-pay-or-justify.html">30 days to pay or justify</a></li></ul></div>
    <div><h2>justclaims.eu</h2><ul><li><a href="platform.html">Platform</a></li><li><a href="customers.html">Customers</a></li><li><a href="resources.html">Resources</a></li><li><a href="about.html">About</a></li><li><a href="request-a-demo.html">Request a walkthrough</a></li></ul></div>
    <div><h2>CHS Claims Handling Solutions GmbH</h2><ul><li>Güterplatz 1</li><li>60327 Frankfurt am Main</li><li><a href="tel:+4969380299910">+49 69 380 299 910</a></li><li><a href="https://www.justclaims.eu/imprint" rel="noopener">Imprint</a></li><li><a href="https://www.justclaims.eu/privacy-policy" rel="noopener">Privacy policy</a></li><li><a href="https://www.linkedin.com/company/justclaims/" rel="noopener">LinkedIn</a></li></ul></div>
  </div>
  <div class="wrap foot-bot"><span>&copy; 2026 CHS Claims Handling Solutions GmbH</span><span>Rules quoted from the Official Journal, <a href="{OJ}" rel="noopener" target="_blank">Regulation (EU) 2026/2202</a></span></div>
</footer>'''

def cta(alt=None):
    """the last chapter of every inner page. The same action as the home page, a walkthrough, and one gentler way in"""
    href, label = alt or ('readiness.html', 'Take the readiness check')
    return f'''<section class="sx cta2" id="cta" data-step aria-labelledby="cta-h"><div class="wrap cta-in">
  <span class="pill rv"><i class="dot amber"></i>Next step</span>
  <h2 id="cta-h" class="h-l rv" style="--d:1">See it on <em>your</em> claims.</h2>
  <p class="lead rv" style="--d:2">A live walkthrough tailored to your airline. We take the 96 hour notice and the 30 day answer and set them beside the way you handle a claim today.</p>
  <div class="row rv" style="--d:3"><a class="b pri" href="request-a-demo.html">Request a walkthrough {AR}</a><a class="b gl" href="{href}">{label}</a></div>
  <p class="cta-days rv" style="--d:4"><i class="pulse" aria-hidden="true"></i><b data-days-n>{DAYS}</b> days until the new rules apply</p>
</div></section>'''

# ---- the horizon. The 386 days from publication to application as ticks on a wide arc, the days left glowing from mint to amber.
def _mix(a, b, t): return '#' + ''.join(f'{round(int(a[i:i+2],16)*(1-t)+int(b[i:i+2],16)*t):02x}' for i in (1, 3, 5))
def horizon():
    W, H, R = 2400, 560, 2100
    cx, cy = W / 2, R + 120
    span = 46.0                                    # degrees of arc across the width
    done = (TODAY - PUB).days
    ticks, labels = [], []
    for i in range(NDAYS + 1):
        dt = PUB + datetime.timedelta(days=i)
        ang = math.radians(-span / 2 + span * i / NDAYS)
        major = dt.day == 1 or i in (0, NDAYS)
        L = 46 if major else (26 if i % 7 == 0 else 16)
        x1, y1 = cx + R * math.sin(ang), cy - R * math.cos(ang)
        x0, y0 = cx + (R - L) * math.sin(ang), cy - (R - L) * math.cos(ang)
        if i < done: col, cls = '#5b6e6a', 'p'
        else: col, cls = _mix('#8ff0d2', '#ffb547', ((i - done) / max(1, NDAYS - done)) ** 1.6), 'f'
        ticks.append(f'<line class="{cls}{" M" if major else ""}" style="--i:{i}" x1="{x0:.1f}" y1="{y0:.1f}" x2="{x1:.1f}" y2="{y1:.1f}" stroke="{col}"/>')
        if dt.day == 1 and dt.month in (1, 4, 7):
            lx, ly = cx + (R - 84) * math.sin(ang), cy - (R - 84) * math.cos(ang)
            nm = dt.strftime('%b') + (' ' + dt.strftime('%Y') if dt.month == 1 else '')
            labels.append(f'<text class="hz-m" x="{lx:.1f}" y="{ly:.1f}">{nm}</text>')
    def at(i, r):
        a = math.radians(-span / 2 + span * i / NDAYS); return cx + r * math.sin(a), cy - r * math.cos(a)
    fx, fy = at((FORCE - PUB).days, R + 26); tx, ty = at(done, R + 26); ex, ey = at(NDAYS, R + 26)
    marks = (f'<circle class="hz-dot now" cx="{tx:.1f}" cy="{ty:.1f}" r="11"/>'
             f'<circle class="hz-dot end" cx="{ex:.1f}" cy="{ey:.1f}" r="11"/>'
             f'<text class="hz-k" x="{tx-30:.1f}" y="{ty+11:.1f}" text-anchor="end">Today</text>'
             f'<text class="hz-k amber" x="{ex+30:.1f}" y="{ey+11:.1f}" text-anchor="start">Applies 23 Oct 2027</text>')
    alt = f'An arc of {NDAYS} ticks, one for each day from publication on 2 October 2026 to application on 23 October 2027. The days still to come glow from mint to amber.'
    return (f'<div class="horizon" role="img" aria-label="{alt}"><svg viewBox="0 50 {W} 420" preserveAspectRatio="xMidYMid meet" aria-hidden="true">'
            f'<defs><radialGradient id="hzglow" cx="50%" cy="100%" r="70%"><stop offset="0" stop-color="#66cbb0" stop-opacity=".35"/><stop offset="1" stop-color="#66cbb0" stop-opacity="0"/></radialGradient></defs>'
            f'<ellipse cx="{cx}" cy="560" rx="{W*.62}" ry="300" fill="url(#hzglow)"/>'
            f'<g class="hz-t">{"".join(ticks)}</g>{"".join(labels)}{marks}</svg></div>')

# ---- small luminous gauges for the instrument cluster
def gauge(n, lit, amber_from=None, label=''):
    out = []
    for k in range(n):
        a = math.radians(-120 + 240 * k / max(1, n - 1)); r1, r0 = 46, 38 if k % max(1, n // 8) == 0 else 41
        x1, y1, x0, y0 = 50 + r1 * math.sin(a), 52 - r1 * math.cos(a), 50 + r0 * math.sin(a), 52 - r0 * math.cos(a)
        cls = 'g-t' + (' am' if amber_from is not None and k >= amber_from else '')
        out.append(f'<line class="{cls}" style="--k:{k}" x1="{x0:.2f}" y1="{y0:.2f}" x2="{x1:.2f}" y2="{y1:.2f}"/>')
    return f'<svg class="gauge" viewBox="0 0 100 92" aria-hidden="true" focusable="false" style="--n:{n}">{"".join(out)}</svg>'

# ---- charts, the v1 svg with gradients added
def chart_v2(svg, gid):
    defs = (f'<defs><linearGradient id="{gid}-a" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8ff0d2" stop-opacity=".45"/><stop offset="1" stop-color="#8ff0d2" stop-opacity="0"/></linearGradient>'
            f'<linearGradient id="{gid}-b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8ff0d2"/><stop offset="1" stop-color="#2b7d6b"/></linearGradient>'
            f'<linearGradient id="{gid}-c" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff" stop-opacity=".22"/><stop offset="1" stop-color="#ffffff" stop-opacity=".05"/></linearGradient></defs>')
    svg = svg.replace('role="img"', f'role="img" data-g="{gid}"', 1)
    svg = re.sub(r'(<svg[^>]*>)', r'\1' + defs, svg, count=1)
    svg = svg.replace('class="ar"', f'class="ar" fill="url(#{gid}-a)"').replace('class="bar last"', f'class="bar last" fill="url(#{gid}-b)"').replace('class="bar"', f'class="bar" fill="url(#{gid}-c)"')
    svg = re.sub(r'<rect class="bar([^"]*)" ([^>]*?)/>', lambda m: f'<rect class="bar{m.group(1)}" rx="10" {m.group(2)}/>', svg)
    return svg

import hashlib
def rulerlist2():
    """the time limits as a list, for a screen too narrow for the ruler. The ones that touch a claim first, the rest folded"""
    cs = sorted(CL['clocks'], key=lambda c: c['hours'])
    def li(c): return f'<li class="rl who-{c["who"]}" data-id="{c["id"]}"><span class="mono dur">{E(c["label"])}</span><span class="rl-b"><b>{E(c["duty"])}</b><span class="mono art">{E(c["art"])}, starts when {E(c["starts"])}</span></span></li>'
    rest = [c for c in cs if not c.get('claims')]
    return ''.join(li(c) for c in cs if c.get('claims')) + f'<li class="rl-more"><details><summary>The other {len(rest)} time limits</summary><ul>{"".join(li(c) for c in rest)}</ul></details></li>'
def ver(rel):
    try: return hashlib.sha1(open(os.path.join(OUT, rel), 'rb').read()).hexdigest()[:10]
    except FileNotFoundError: return '0'
IC = {'peak': '<path d="M3 17l5-6 4 4 4-7 5 9"/>', 'pay': '<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M3 10h18M7 15h3"/>',
      'check': '<circle cx="12" cy="12" r="9"/><path d="M8 12.5l2.6 2.5L16 9.5"/>', 'x': '<circle cx="12" cy="12" r="9"/><path d="M9 9l6 6M15 9l-6 6"/>',
      'globe': '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z"/>',
      'shield': '<path d="M12 3l7 3v5c0 4.5-3 8.3-7 10-4-1.7-7-5.5-7-10V6l7-3z"/><path d="M9 12l2 2 4-4"/>',
      'scale': '<path d="M12 4v16M5 20h14M6 8h12M6 8l-3 6h6l-3-6zM18 8l-3 6h6l-3-6z"/>', 'mail': '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
      'clock': '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>', 'doc': '<path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5M10 13h6M10 17h6"/>',
      'user': '<circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/>', 'lock': '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
      'cal': '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>', 'noapp': '<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M4 4l16 16"/>',
      'eye': '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>', 'access': '<circle cx="12" cy="4.5" r="2"/><path d="M5 9h14M12 9v12M8 21l4-7 4 7"/>',
      'users': '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c1-3.5 3.6-5.5 6.5-5.5s5.5 2 6.5 5.5"/><circle cx="17" cy="9" r="2.5"/><path d="M17 14.5c2.3 0 4 1.5 4.7 4"/>',
      'bed': '<path d="M3 18V7M3 14h18v4M21 14v-2a3 3 0 0 0-3-3h-7v5"/><circle cx="7" cy="11" r="2"/>', 'search': '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
      'hand': '<path d="M9 12V5.5a1.5 1.5 0 0 1 3 0V11m0-6.5a1.5 1.5 0 0 1 3 0V11m0-4.5a1.5 1.5 0 0 1 3 0V15a6 6 0 0 1-6 6h-1a6 6 0 0 1-4.7-2.3L4 15.5a1.6 1.6 0 0 1 2.5-2L9 16"/>',
      'bolt': '<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>', 'chart': '<path d="M4 20V4M4 20h16M8 16v-4M12 16V8M16 16v-6"/>', 'link': '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>'}
def icon(n): return f'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">{IC[n]}</svg>'
PH = {'ph-wing': (1333, 750), 'ph-circ': (1200, 800), 'ph-lost': (1200, 800), 'ph-new': (1200, 750), 'ph-notice': (1200, 557), 'ph-ready': (1200, 1053), 'ph-res': (1200, 800), 'ph-thirty': (1200, 800)}
def toc(chapters):
    items = ''.join(f'<li><a href="#{cid}"><b>{i}</b><span>{E(lbl)}</span></a></li>' for i, (cid, lbl) in enumerate(chapters, 1))
    items += f'<li class="last"><a href="#cta"><b>{len(chapters) + 1}</b><span>Next step</span></a></li>'
    return f'<ol class="toc rv" style="--d:5" aria-label="On this page">{items}</ol>'
def hero(h, chapters):
    """the opening of every inner page. A stock picture or film, what the page is about in two lines, and the chapters ahead"""
    if h.get('vid'):
        v = h['vid']
        media = (f'<img src="assets/film/{v}-poster.jpg" alt="" width="1280" height="720" fetchpriority="high">'
                 f'<video muted loop playsinline preload="none" poster="assets/film/{v}-poster.jpg" data-src="assets/film/{v}.mp4" data-webm="assets/film/{v}.webm" data-min="760" tabindex="-1"></video>')
        cap = 'Background, stock film.'
    else:
        wd, ht = PH[h['img']]
        media = f'<img src="assets/img/ph/{h["img"]}.jpg" alt="" width="{wd}" height="{ht}" fetchpriority="high">'
        cap = 'Background, stock photograph.'
    lines = ' '.join(f'<span class="ln"><span>{l}</span></span>' for l in h['h1'])
    acts = ''.join(f'<a class="b {"pri" if i == 0 else "gl"}" href="{href}">{lbl}{" " + AR if i == 0 else ""}</a>' for i, (href, lbl) in enumerate(h.get('acts', [])))
    dot = ' amber' if h.get('amber') else ''
    short = ' short' if h.get('short') else ''
    return f'''<section class="ph2{short}" id="top" aria-labelledby="h1">
  <div class="ph2-media" aria-hidden="true">{media}</div>
  <div class="wrap ph2-in">
    <span class="pill rv"><i class="dot{dot}"></i>{h['pill']}</span>
    <h1 id="h1" class="h-xl split">{lines}</h1>
    <p class="lead rv" style="--d:3">{h['lead']}</p>
    {f'<div class="row rv" style="--d:4">{acts}</div>' if acts else ''}
  </div>
  <div class="wrap ph2-toc">{toc(chapters) if chapters else ''}</div>
  <p class="film-cap">{cap}</p>
</section>'''
def jp(chapters):
    """the pill at the foot of the screen, one link per chapter of the page and the next step last"""
    items = ''.join(f'<a href="#{cid}"><b>{i}</b><span>{E(lbl)}</span></a>' for i, (cid, lbl) in enumerate(chapters, 1))
    items += f'<a class="last" href="#cta"><b>{len(chapters) + 1}</b><span>Next step</span></a>'
    return f'<nav class="jp" aria-label="Chapters on this page" data-jp>{items}</nav>'
def page(meta, body):
    t = meta['title']; full = 'justclaims.eu, ' + t if meta.get('home') else t + ' | justclaims.eu'
    js = ''.join(f'<script src="assets/{x}.js?v={ver("assets/" + x + ".js")}" defer></script>' for x in meta.get('extra', []) if os.path.exists(os.path.join(OUT, 'assets', x + '.js')))
    return f'''<!doctype html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>{E(full)}</title>
<meta name="description" content="{E(meta['desc'])}">
<meta property="og:title" content="{E(full)}">
<meta property="og:description" content="{E(meta['desc'])}">
<meta property="og:type" content="website">
<meta property="og:image" content="{SITE_URL}/assets/img/og.jpg">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#05090B">
<meta name="color-scheme" content="dark">
<meta name="robots" content="noindex">
<link rel="icon" href="assets/img/favicon.svg" type="image/svg+xml">
<link rel="preload" href="assets/fonts/funnel-display.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="assets/fonts/geist.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="assets/v2.css?v={ver('assets/v2.css')}">
<script>document.documentElement.className+=' js';</script>
</head>
<body class="p-{meta.get('nav', 'x')}" data-applies="{CL['applies']}" data-force="{CL['entersIntoForce']}" data-oj="{OJ}" data-built="{TODAY.isoformat()}">
<div class="sky" aria-hidden="true"></div><div class="grain" aria-hidden="true"></div>
{header(meta.get('nav', ''))}
<main id="main">
{body}
</main>
{FOOTER}
<script src="assets/v2.js?v={ver('assets/v2.js')}" defer></script>{js}
</body>
</html>
'''

def render(name):
    srcp = open(os.path.join(V2, 'pages', name), encoding='utf-8').read()
    m = re.match(r'\s*<!--(\{.*?\})-->\s*', srcp, re.S); meta = json.loads(m.group(1)); body = srcp[m.end():]
    if meta.get('hero'): body = hero(meta['hero'], meta.get('chapters')) + '\n' + body
    for _ in range(3):
        body = re.sub(r'\{\{INC:([a-z0-9\-]+)\}\}', lambda mm: open(os.path.join(V2, 'pages', '_parts', mm.group(1) + '.html'), encoding='utf-8').read(), body)
    for cid, _ in meta.get('chapters', []):
        if not re.search(r'<section[^>]*\bid="' + re.escape(cid) + r'"[^>]*\bdata-step', body): raise SystemExit(f'{name}: chapter {cid} has no section with data-step')
    rate, courts = G['chart_rate'](), G['chart_courts'](); tr, tc = G['chart_tables']()
    alt = meta.get('cta2')
    rep = {'{{AR}}': AR, '{{TBC}}': TBC, '{{CTA}}': cta(tuple(alt) if alt else None), '{{ANNEX}}': G['annex_html'](), '{{READYQS}}': G['readiness_qs'](), '{{CLOCKROWS}}': G['clockrows'](), '{{DAYS}}': str(DAYS), '{{FORCEDAYS}}': str((FORCE - TODAY).days), '{{OJ}}': OJ,
           '{{NCLOCKS}}': str(len(CL['clocks'])), '{{HORIZON}}': horizon(), '{{RULERLIST}}': rulerlist2(), '{{HOURGRID}}': G['hour_grid'](),
           '{{CHARTRATE}}': chart_v2(rate, 'cr') + tr, '{{CHARTCOURTS}}': chart_v2(courts, 'cc') + tc, '{{READYMAP}}': G['readiness_map'](),
           '{{LOGO}}': LOGO, '{{CAL31}}': '<div class="cal-g" aria-hidden="true">' + ''.join(f'<i class="{"d0" if k == 0 else "d30" if k == 30 else ""}"></i>' for k in range(31)).replace(' class=""', '') + '</div>', '{{G96}}': gauge(48, 48, 40), '{{G30}}': gauge(30, 30, 26), '{{G9}}': gauge(36, 36, 31), '{{GDAYS}}': gauge(40, 40, 34),
           '{{CLOCKSJSON}}': '<script type="application/json" id="clocks-data">' + json.dumps({'clocks': CL['clocks'], 'quotes': CL['quotes'], 'applies': CL['applies'], 'force': CL['entersIntoForce']}, ensure_ascii=False).replace('</', '<\\/') + '</script>'}
    for k, v in rep.items(): body = body.replace(k, v)
    body = re.sub(r'\{\{IC:([a-z]+)\}\}', lambda mm: icon(mm.group(1)), body)
    body = re.sub(r'\{\{SDIAL:(\d)\}\}', lambda mm: G['story_dial'](int(mm.group(1))), body)
    body = re.sub(r'\{\{LAW:([a-z0-9\-]+)\}\}', lambda mm: G['law'](mm.group(1)), body)
    left = re.findall(r'\{\{[A-Z:a-z0-9\-]+\}\}', body)
    if left: raise SystemExit(f'{name}: unreplaced tokens {left}')
    if meta.get('chapters'): body += '\n' + jp(meta['chapters'])
    return page(meta, body)

if __name__ == '__main__':
    only = os.environ.get('ONLY'); built = []
    for f in sorted(os.listdir(os.path.join(V2, 'pages'))):
        if not f.endswith('.html') or (only and f != only): continue
        html_out = render(f)
        # pages not yet rebuilt in v2 link to the live v1 site, so the preview has no dead links
        V1 = 'https://astra-justclaims-prototype.netlify.app/'
        have = set(x for x in os.listdir(os.path.join(V2, 'pages')) if x.endswith('.html'))
        html_out = re.sub(r'href="([a-z0-9\-]+\.html)((?:#[^"]*|\?[^"]*)?)"', lambda mm: f'href="{mm.group(1)}{mm.group(2)}"' if mm.group(1) in have else f'href="{V1}{mm.group(1)}{mm.group(2)}"', html_out)
        html_out = html_out.replace('new-rules.html#duties', 'new-rules.html#proof').replace('new-rules.html#table', 'new-rules.html#ruler')
        if f == '404.html':  # served at any missing path, so every local link and asset is made absolute
            html_out = re.sub(r'(src|href|poster|data-src|data-webm)="(?!https?:|#|/|mailto:|tel:|data:)', r'\1="/', html_out)
        open(os.path.join(OUT, f), 'w', encoding='utf-8').write(html_out); built.append(f)
    print('v2 built', len(built), 'pages', ', '.join(built), '| days to apply', DAYS)
