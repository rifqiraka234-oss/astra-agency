#!/usr/bin/env python3
"""Qualigraf UK v4, "the public record". Assembles build4/pages/*.html into ../site/.

Each page starts with <!--{"title","desc","nav","mods":[...]}-->. mods are ES modules in
assets/v4/ loaded only on that page (hero3d, globe3d). Tokens, {{AR}} arrow, {{BOOK}} Stuart's
diary, {{CLOSE}} the shared close, {{I:name}} an icon, {{CURL:colour}} their brand tile, {{ITEM:n:label:ref}}
an agenda item header.
"""
import os, re, json, glob, importlib.util

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.normpath(os.path.join(HERE, '..', 'site'))
spec = importlib.util.spec_from_file_location('v3', os.path.join(HERE, '..', 'build', 'build.py'))
v3 = importlib.util.module_from_spec(spec); spec.loader.exec_module(v3)
ICONS, curl, BOOK, FAV = v3.ICONS, v3.curl, v3.BOOK, v3.FAV

AR = '<svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h9M8.5 4l4 4-4 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>'

NAV = [('platform.html', 'Platform', 'platform'), ('ai-minutes.html', 'AI Minutes', 'ai'), ('new-councils.html', 'New councils', 'lgr'),
       ('roles.html', 'Who it’s for', 'roles'), ('security.html', 'Security', 'security'), ('about.html', 'About', 'about'),
       ('resources.html', 'Resources', 'resources')]

def header(cur):
    links = ''.join(f'<a href="{h}"' + (' aria-current="page"' if k == cur else '') + f'><i>{i+1}</i>{t}</a>' for i, (h, t, k) in enumerate(NAV))
    mlinks = ''.join(f'<a href="{h}"><i>{i+1:02d}</i>{t}</a>' for i, (h, t, k) in enumerate(NAV))
    return f'''<a class="skip" href="#main">Skip to content</a>
<header class="hdr">
  <div class="wrap">
    <a class="brand" href="index.html" aria-label="Qualigraf UK home"><img src="assets/img/logo-uk.svg" alt="Qualigraf UK" width="125" height="38"></a>
    <nav class="nav" aria-label="Main">{links}</nav>
    <div class="hdr-cta"><a class="b b-ink" href="contact.html">Book a walkthrough</a></div>
    <button class="menu-btn" type="button" aria-expanded="false" aria-controls="mnav" aria-label="Menu"><span></span><span></span></button>
  </div>
</header>
<nav class="mnav" id="mnav" aria-label="Mobile">{mlinks}<a href="contact.html"><i>08</i>Contact</a><a class="b b-ink" href="contact.html">Book a walkthrough {AR}</a></nav>'''

FOOTER = f'''<footer class="ftr">
  <div class="wrap">
    <p class="big" aria-hidden="true">Every decision, <em>kept.</em></p>
    <div class="fcols">
      <div>
        <a class="brand" href="index.html" aria-label="Qualigraf UK home"><img src="assets/img/logo-uk-light.svg" alt="Qualigraf UK" width="139" height="42"></a>
        <p class="small" style="color:#A9AFBD;margin-top:16px;max-width:26rem">Committee management for UK councils. Reports, sign offs, agenda packs, paperless meetings, decisions and the public record, kept together by topic.</p>
        <address>Qualigraf UK<br>53 Chapel Street, Mow Cop<br>Stoke-on-Trent ST7 4NS</address>
      </div>
      <div><h2>Platform</h2><ul>
        <li><a href="platform.html">The committee cycle</a></li>
        <li><a href="platform.html#meeting">Paperless meetings</a></li>
        <li><a href="ai-minutes.html">AI Minutes</a></li>
        <li><a href="platform.html#publication">Publish and stream</a></li>
        <li><a href="security.html">Security and quality</a></li></ul></div>
      <div><h2>For</h2><ul>
        <li><a href="roles.html#democratic-services">Democratic Services</a></li>
        <li><a href="roles.html#members">Members</a></li>
        <li><a href="roles.html#it">IT and information governance</a></li>
        <li><a href="new-councils.html">New councils</a></li></ul></div>
      <div><h2>Company</h2><ul>
        <li><a href="about.html">About Qualigraf UK</a></li>
        <li><a href="resources.html">Resources</a></li>
        <li><a href="https://qualigraf.com/uk/press-release-ceo/">News</a></li>
        <li><a href="contact.html">Contact</a></li></ul></div>
      <div><h2>Talk to us</h2><ul>
        <li><a href="tel:+447741080343">+44 7741 080343</a></li>
        <li><a href="mailto:info@qualigraf.com">info@qualigraf.com</a></li>
        <li><a href="{BOOK}" rel="noopener" target="_blank">Book a call with Stuart</a></li></ul></div>
    </div>
    <div class="bot">
      <span>&copy; 2026 Qualigraf. Product screens and examples on this site show sample data.</span>
      <span class="regions"><a href="https://qualigraf.com/uk/your-rights-and-privacy-uk/">Privacy</a><a href="https://qualigraf.com/uk/complaints-procedure-uk/">Complaints procedure</a><a href="https://qualigraf.com/uk/quality-uk/">Quality</a><a href="https://qualigraf.com/nl/homepage-nl/">Nederland</a><a href="https://qualigraf.com/fr/homepage-fr/">France</a><a href="https://qualigraf.com/en_ca/homepage-ca/">Canada</a></span>
    </div>
  </div>
</footer>'''

def page(meta, body):
    t = meta['title']; desc = meta['desc']; nav = meta.get('nav', '')
    full = t if t.startswith('Qualigraf') else f'{t} | Qualigraf UK'
    mods = ''.join(f'\n<script type="module" src="assets/v4/{m}.js"></script>' for m in meta.get('mods', []))
    return f'''<!doctype html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>{full}</title>
<meta name="description" content="{desc}">
<meta property="og:title" content="{full}">
<meta property="og:description" content="{desc}">
<meta property="og:type" content="website">
<meta name="theme-color" content="#F3EEE3">
<link rel="icon" href="{FAV}">
<link rel="preload" href="assets/fonts/source-serif-4-latin-opsz-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="assets/fonts/source-sans-3-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="assets/v4/v4.css">
<link rel="stylesheet" href="assets/v4/scenes.css">
<script>document.documentElement.className+=' js';</script>
</head>
<body class="p-{nav or 'x'}">
{header(nav)}
<main id="main">
{body}
</main>
{FOOTER}
<script src="assets/vendor/gsap.min.js" defer></script>
<script src="assets/vendor/ScrollTrigger.min.js" defer></script>
<script src="assets/v4/v4.js" defer></script>{mods}
</body>
</html>
'''

SYS = [('Surrey County Council','e','mycouncil.surreycc.gov.uk'),('Elmbridge','e','mygov.elmbridge.gov.uk'),('Epsom and Ewell','e','democracy.epsom-ewell.gov.uk'),('Mole Valley','e','molevalleydc.sharepoint.com'),('Reigate and Banstead','e','reigate-banstead.moderngov.co.uk'),('Tandridge','e','tandridge.moderngov.co.uk'),
       ('Guildford','w','democracy.guildford.gov.uk'),('Woking','w','moderngov.woking.gov.uk'),('Waverley','w','modgov.waverley.gov.uk'),('Surrey Heath','w','surreyheath.moderngov.co.uk'),('Runnymede','w','democracy.runnymede.gov.uk'),('Spelthorne','w','democracy.spelthorne.gov.uk')]
def surrey_static():
    M = json.load(open(os.path.join(OUT, 'assets', 'v4', 'england_map.json')))
    MT = json.load(open(os.path.join(OUT, 'assets', 'v4', 'shadow_meetings.json')))
    counts = {}
    for side in MT.values():
        for r in side: counts[r['system']] = counts.get(r['system'], 0) + 1
    rows = ''.join(f'<tr><td>{"East Surrey" if sd == "e" else "West Surrey"}</td><td>{nm}</td><td>{host}</td><td>{counts.get(nm, 0)}</td></tr>' for nm, sd, host in SYS)
    paths, cent = '', {}
    for o in M['lads']:
        if not o['s']: continue
        paths += f'<path class="{o["s"]}" d="{o["d"]}"/>'
        nums = [float(v) for v in re.findall(r'-?[\d.]+', o['d'])]; xs, ys = nums[0::2], nums[1::2]
        cent[o['n']] = ((min(xs) + max(xs)) / 2, (min(ys) + max(ys)) / 2)
    sb = M['surrey']; cent['Surrey County Council'] = ((sb[0] + sb[2]) / 2 + 2, (sb[1] + sb[3]) / 2 + 4)
    pins = ''.join(f'<g class="pin"><circle cx="{cent[nm][0]:.1f}" cy="{cent[nm][1]:.1f}" r="3.1"/><text x="{cent[nm][0]:.1f}" y="{cent[nm][1] + 1.2:.1f}" font-size="3.2" text-anchor="middle">{i + 1}</text></g>' for i, (nm, sd, host) in enumerate(SYS))
    vb = f'{sb[0] - 10:.1f} {sb[1] - 10:.1f} {sb[2] - sb[0] + 20:.1f} {sb[3] - sb[1] + 20:.1f}'
    return rows, paths, pins, vb
SY_ROWS, SY_PATHS, SY_PINS, SY_VB = surrey_static()

CLOSE = open(os.path.join(HERE, 'close.html')).read() if os.path.exists(os.path.join(HERE, 'close.html')) else ''

def item(m):
    n, lab, ref = (m.group(1).split('|') + ['', ''])[:3]
    r = f'<span class="iref">{ref}</span>' if ref else ''
    return f'<header class="ih"><span class="ino">Item {n}</span><span class="ilab">{lab}</span>{r}</header>'

def fill(body):
    body = body.replace('{{SYROWS}}', SY_ROWS).replace('{{SYMAP}}', f'<svg class="sy-map" viewBox="{SY_VB}" preserveAspectRatio="xMidYMid meet"><g class="lads">{SY_PATHS}</g><g class="pins">{SY_PINS}</g></svg>')
    body = body.replace('{{CLOSE}}', CLOSE).replace('{{AR}}', AR).replace('{{BOOK}}', BOOK)
    body = re.sub(r'\{\{ITEM:([^}]*)\}\}', item, body)
    body = re.sub(r'\{\{I:(\w+)\}\}', lambda m: ICONS[m.group(1)], body)
    body = re.sub(r'\{\{CURL:(\w+)\}\}', lambda m: curl(m.group(1)), body)
    left = re.findall(r'\{\{[^}]*\}\}', body)
    assert not left, left
    return body

def main():
    n = 0
    for f in sorted(glob.glob(os.path.join(HERE, 'pages', '*.html'))):
        src = open(f).read()
        m = re.match(r'\s*<!--(\{.*?\})-->\s*', src, re.S)
        meta = json.loads(m.group(1)); body = src[m.end():]
        html = page(meta, fill(body))
        if os.path.basename(f) == '404.html':
            html = re.sub(r'(href|src)="(?!https?:|mailto:|tel:|#|/|data:)', r'\1="/', html)
        open(os.path.join(OUT, os.path.basename(f)), 'w').write(html); n += 1
    print('built', n, 'pages')

if __name__ == '__main__':
    main()
