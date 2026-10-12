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

def header(cur):
    links = ''.join(f'<a href="{h}"' + (' aria-current="page"' if k == cur else '') + f'>{t}</a>' for h, t, k in NAV)
    mlinks = ''.join(f'<a href="{h}">{t}</a>' for h, t, k in NAV)
    return f'''<a class="skip" href="#main">Skip to content</a>
<header class="nav2" data-nav>
  <a class="brand" href="index.html" aria-label="justclaims.eu home">{LOGO}</a>
  <nav class="links" aria-label="Main">{links}</nav>
  <div class="nav-r">
    <a class="days" href="new-rules.html#timeline" title="Days until Regulation (EU) 2026/2202 applies"><i class="pulse" aria-hidden="true"></i><b data-days-n>{DAYS}</b> days to apply</a>
    <a class="b pri sm" href="request-a-demo.html">Request a walkthrough</a>
    <button class="menu" type="button" aria-expanded="false" aria-controls="mnav" aria-label="Menu"><span></span><span></span></button>
  </div>
</header>
<nav class="mnav2" id="mnav" aria-label="Mobile"><a href="index.html">Home</a>{mlinks}<a href="claim-clock.html">Claim clock</a><a href="readiness.html">Readiness check</a><a class="b pri" href="request-a-demo.html">Request a walkthrough</a></nav>
<aside class="draft" aria-label="Draft status"><i aria-hidden="true"></i>Draft for CHS Claims Handling Solutions, not live. Anything tagged To confirm needs your check.</aside>'''

FOOTER = f'''<footer class="foot">
  <div class="wrap foot-in">
    <div class="foot-brand">{LOGOTAG}<p>Passenger claims management for airlines. A product of CHS Claims Handling Solutions GmbH, founded in 2017 by aviation attorneys.</p></div>
    <div><h2>The new rules</h2><ul><li><a href="new-rules.html">The time limits on one ruler</a></li><li><a href="claim-clock.html">Claim clock</a></li><li><a href="readiness.html">Readiness check</a></li><li><a href="96-hour-notice.html">The 96 hour notice</a></li><li><a href="30-days-to-pay-or-justify.html">30 days to pay or justify</a></li></ul></div>
    <div><h2>justclaims.eu</h2><ul><li><a href="platform.html">Platform</a></li><li><a href="customers.html">Customers</a></li><li><a href="resources.html">Resources</a></li><li><a href="about.html">About</a></li><li><a href="request-a-demo.html">Request a walkthrough</a></li></ul></div>
    <div><h2>CHS Claims Handling Solutions GmbH</h2><ul><li>Güterplatz 1</li><li>60327 Frankfurt am Main</li><li><a href="tel:+4969380299910">+49 69 380 299 910</a></li><li><a href="https://www.justclaims.eu/imprint" rel="noopener">Imprint</a></li><li><a href="https://www.justclaims.eu/privacy-policy" rel="noopener">Privacy policy</a></li><li><a href="https://www.linkedin.com/company/justclaims/" rel="noopener">LinkedIn</a></li></ul></div>
  </div>
  <div class="wrap foot-bot"><span>&copy; 2026 CHS Claims Handling Solutions GmbH</span><span>Rules quoted from the Official Journal, <a href="{OJ}" rel="noopener" target="_blank">Regulation (EU) 2026/2202</a></span></div>
</footer>'''

CTA = f'''<section class="scene cta2" id="cta"><div class="wrap cta-in">
  <span class="pill rv"><i class="dot amber"></i><b data-days-n>{DAYS}</b>&nbsp;days until the rules apply</span>
  <h2 class="h-l rv" style="--d:1">See your claims handling against the <em>new clocks.</em></h2>
  <p class="lead rv" style="--d:2">A live demo tailored to you. We take the 96 hour notice and the 30 day answer and set them beside the way you handle a claim today.</p>
  <div class="row rv" style="--d:3"><a class="b pri" href="request-a-demo.html">Request a walkthrough {AR}</a><a class="b gl" href="readiness.html">Take the readiness check</a></div>
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

def page(meta, body):
    t = meta['title']; full = 'justclaims.eu, ' + t if meta.get('home') else t + ' | justclaims.eu'
    js = ''.join(f'<script src="assets/{x}.js" defer></script>' for x in meta.get('extra', []) if os.path.exists(os.path.join(OUT, 'assets', x + '.js')))
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
<link rel="stylesheet" href="assets/v2.css">
<script>document.documentElement.className+=' js';</script>
</head>
<body class="p-{meta.get('nav', 'x')}" data-applies="{CL['applies']}" data-force="{CL['entersIntoForce']}" data-oj="{OJ}" data-built="{TODAY.isoformat()}">
<div class="sky" aria-hidden="true"></div><div class="grain" aria-hidden="true"></div>
{header(meta.get('nav', ''))}
<main id="main">
{body}
</main>
{FOOTER}
<script src="assets/v2.js" defer></script>{js}
</body>
</html>
'''

def render(name):
    srcp = open(os.path.join(V2, 'pages', name), encoding='utf-8').read()
    m = re.match(r'\s*<!--(\{.*?\})-->\s*', srcp, re.S); meta = json.loads(m.group(1)); body = srcp[m.end():]
    for _ in range(3):
        body = re.sub(r'\{\{INC:([a-z0-9\-]+)\}\}', lambda mm: open(os.path.join(V2, 'pages', '_parts', mm.group(1) + '.html'), encoding='utf-8').read(), body)
    rate, courts = G['chart_rate'](), G['chart_courts'](); tr, tc = G['chart_tables']()
    rep = {'{{AR}}': AR, '{{TBC}}': TBC, '{{CTA}}': CTA, '{{DAYS}}': str(DAYS), '{{FORCEDAYS}}': str((FORCE - TODAY).days), '{{OJ}}': OJ,
           '{{NCLOCKS}}': str(len(CL['clocks'])), '{{HORIZON}}': horizon(), '{{RULERLIST}}': G['rulerlist'](), '{{HOURGRID}}': G['hour_grid'](),
           '{{CHARTRATE}}': chart_v2(rate, 'cr') + tr, '{{CHARTCOURTS}}': chart_v2(courts, 'cc') + tc, '{{READYMAP}}': G['readiness_map'](),
           '{{G96}}': gauge(48, 48, 40), '{{G30}}': gauge(30, 30, 26), '{{G9}}': gauge(36, 36, 31), '{{GDAYS}}': gauge(40, 40, 34),
           '{{CLOCKSJSON}}': '<script type="application/json" id="clocks-data">' + json.dumps({'clocks': CL['clocks'], 'quotes': CL['quotes'], 'applies': CL['applies'], 'force': CL['entersIntoForce']}, ensure_ascii=False).replace('</', '<\\/') + '</script>'}
    for k, v in rep.items(): body = body.replace(k, v)
    body = re.sub(r'\{\{SDIAL:(\d)\}\}', lambda mm: G['story_dial'](int(mm.group(1))), body)
    body = re.sub(r'\{\{LAW:([a-z0-9\-]+)\}\}', lambda mm: G['law'](mm.group(1)), body)
    left = re.findall(r'\{\{[A-Z:a-z0-9\-]+\}\}', body)
    if left: raise SystemExit(f'{name}: unreplaced tokens {left}')
    return page(meta, body)

if __name__ == '__main__':
    os.makedirs(os.path.join(OUT, 'assets', 'data'), exist_ok=True)
    shutil.copy(os.path.join(B1, 'data', 'clocks.json'), os.path.join(OUT, 'assets', 'data', 'clocks.json'))
    only = os.environ.get('ONLY'); built = []
    for f in sorted(os.listdir(os.path.join(V2, 'pages'))):
        if not f.endswith('.html') or (only and f != only): continue
        html_out = render(f)
        # pages not yet rebuilt in v2 link to the live v1 site, so the preview has no dead links
        V1 = 'https://astra-justclaims-prototype.netlify.app/'
        have = set(x for x in os.listdir(os.path.join(V2, 'pages')) if x.endswith('.html'))
        html_out = re.sub(r'href="([a-z0-9\-]+\.html)((?:#[^"]*|\?[^"]*)?)"', lambda mm: f'href="{mm.group(1)}{mm.group(2)}"' if mm.group(1) in have else f'href="{V1}{mm.group(1)}{mm.group(2)}"', html_out)
        open(os.path.join(OUT, f), 'w', encoding='utf-8').write(html_out); built.append(f)
    print('v2 built', len(built), 'pages', ', '.join(built), '| days to apply', DAYS)
