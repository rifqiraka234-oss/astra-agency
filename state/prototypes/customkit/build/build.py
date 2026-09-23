#!/usr/bin/env python3
"""Assemble the CustomKit prototype pages from one shared head, header and footer.

Each file in pages/ starts with a JSON comment, <!--{"title":..,"desc":..,"nav":..}-->,
followed by the page body. Run it and the finished HTML lands in ../site.
"""
import os, re, json, glob

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.normpath(os.path.join(HERE, '..', 'site'))
BASE = 'https://astra-customkit-prototype.netlify.app/'

NAV = [('teams.html', 'Teams', 'teams'), ('BRANDS', 'Brands', 'brands'), ('make.html', 'What we make', 'make'),
       ('process.html', 'How it works', 'process'), ('reviews.html', 'Reviews', 'reviews'), ('founder.html', 'Founder', 'founder')]
BRANDS = [('white-label.html', 'White label', 'Your label on every garment', 'white'),
          ('brand-design.html', 'Brand design', 'A range designed with you, from £495', 'brand'),
          ('launch.html', 'Drops and webstores', 'Sell it, and we make and ship it', 'launch')]
SPORTS = ['Football', 'Rugby', 'Cricket', 'Basketball', 'Netball', 'Athletics', 'Golf', 'Padel', 'Hockey', 'Volleyball',
          'Handball', 'White label', 'Limited drops', 'Webstores', 'Brand design']

ARROW = '<svg class="ar" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M2.5 8h10M8.5 3.5 13 8l-4.5 4.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="square"/></svg>'
STAR = '<svg viewBox="0 0 20 20" aria-hidden="true"><path fill="currentColor" d="M10 1.8l2.5 5.2 5.7.8-4.1 4 1 5.6L10 14.7l-5.1 2.7 1-5.6-4.1-4 5.7-.8z"/></svg>'
STARS = '<span class="stars" role="img" aria-label="Five stars">' + STAR * 5 + '</span>'

FAV = ("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 32 32%27%3E"
       "%3Crect width=%2732%27 height=%2732%27 fill=%27%232b3bff%27/%3E"
       "%3Crect y=%2724%27 width=%2732%27 height=%278%27 fill=%27%23dcf74a%27/%3E"
       "%3Ctext x=%2716%27 y=%2720%27 text-anchor=%27middle%27 font-family=%27Arial Narrow,Arial%27 font-weight=%27700%27 font-size=%2715%27 fill=%27%23fff%27%3ECK%3C/text%3E%3C/svg%3E")


COLS = [('gold','#b49a64','Gold'),('black','#16181b','Black'),('white','#f1f1ec','White'),('navy','#1c2b4a','Navy'),
        ('royal','#1f5bbf','Royal blue'),('sky','#7db2df','Sky blue'),('red','#b8261f','Red'),('claret','#6b1d33','Claret'),
        ('green','#1f6b3b','Green'),('orange','#d7661d','Orange'),('yellow','#e3bf2a','Yellow'),('teal','#17a393','Teal'),('grey','#4a4d52','Charcoal')]
DESIGNS = [('vortex','Vortex'),('ripple','Ripple'),('paint','Paint'),('voltz','Voltz'),('classic07','Classic 07'),('hoops','Hoops')]

def studio(design='vortex', c1='navy', c2='white'):
    dz = ''.join(f'<button type="button" data-dv="{k}" aria-label="{n}" aria-pressed="{str(k==design).lower()}"><img src="img/r-{k}.webp" alt="" width="760" height="1050" loading="lazy"></button>' for k, n in DESIGNS)
    s1 = ''.join(f'<button type="button" data-c1v="{k}" aria-label="Colour one, {n}" aria-pressed="{str(k==c1).lower()}" style="background:{h}"></button>' for k, h, n in COLS)
    s2 = ''.join(f'<button type="button" data-c2v="{k}" aria-label="Colour two, {n}" aria-pressed="{str(k==c2).lower()}" style="background:{h}"></button>' for k, h, n in COLS)
    return f'''<div class="kitroom" data-studio data-design="{design}" data-c1="{c1}" data-c2="{c2}">
  <div class="kr-stage"><span class="kr-tag">Live preview</span><canvas role="img" aria-label="A CustomKit shirt in the design and colours you pick" width="760" height="1050"></canvas><p class="kr-name" data-name>Vortex in navy and white</p></div>
  <div class="kr-ctl">
    <div class="kr-row"><span class="lab">01 Pick a design</span><div class="designs">{dz}</div></div>
    <div class="kr-row"><span class="lab">02 Main colour</span><div class="sw">{s1}</div></div>
    <div class="kr-row"><span class="lab">03 Second colour</span><div class="sw">{s2}</div></div>
    <div class="spec"><div><b>Print</b>Fully sublimated, unlimited colours</div><div><b>Fabric</b>From 200+ performance fabrics</div><div><b>Branding</b>Crest, sponsors, names and numbers</div><div><b>Label</b>Yours, on every label and tag</div></div>
    <div class="kr-foot"><p>Six designs and 13 colours to try here</p><a class="btn b-cob" data-brief href="start.html?design={design}&amp;c1={c1}&amp;c2={c2}">Brief us on this kit {ARROW}</a></div>
  </div>
</div>'''

def head(title, desc, slug):
    url = BASE + ('' if slug == 'index' else slug + '.html')
    return f'''<!doctype html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
{'<base href="/">' if slug == '404' else ''}
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>{title}</title>
<meta name="description" content="{desc}">
<meta name="robots" content="noindex,nofollow">
<meta name="theme-color" content="#f1eee6">
<link rel="icon" href="{FAV}">
<link rel="preload" href="fonts/big-shoulders-display-latin-800-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="fonts/archivo-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="assets/site.css">
<meta property="og:type" content="website">
<meta property="og:title" content="{title}">
<meta property="og:description" content="{desc}">
<meta property="og:url" content="{url}">
<meta property="og:image" content="{BASE}img/og.jpg">
<meta name="twitter:card" content="summary_large_image">
</head>
<body>'''

def header(cur):
    AC = ' aria-current="page"'
    links = ''
    for h, t, k in NAV:
        if h == 'BRANDS':
            cls = ' cur' if cur in ('white', 'brand', 'launch') else ''
            items = ''.join(f'<a href="{bh}"{AC if bk == cur else ""}><b>{bt}</b><span>{bd}</span></a>' for bh, bt, bd, bk in BRANDS)
            links += f'<div class="dd{cls}"><button type="button" aria-expanded="false" aria-haspopup="true">{t}</button><div class="dd-menu">{items}</div></div>'
        else:
            links += f'<a href="{h}"{AC if k == cur else ""}>{t}</a>'
    mlinks = '<a href="teams.html">Teams</a>' + ''.join(f'<a href="{bh}">{bt}</a>' for bh, bt, bd, bk in BRANDS) + ''.join(f'<a class="small" href="{h}">{t}</a>' for h, t, k in NAV if h not in ('BRANDS', 'teams.html'))
    tick = ''.join(f'<span>{x}</span>' for x in SPORTS)
    return f'''<a class="skip" href="#main">Skip to content</a>
<header class="hdr">
  <div class="wrap">
    <a class="brand" href="index.html" aria-label="CustomKit home"><img src="img/logo-ink.png" width="420" height="153" alt="CustomKit"></a>
    <nav class="nav" aria-label="Main">{links}</nav>
    <div class="hdr-cta"><a class="btn b-cob btn-sm" href="start.html">Start a project {ARROW}</a></div>
    <button class="menu-btn" type="button" aria-expanded="false" aria-controls="mnav" aria-label="Menu">
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true"><path d="M2 7h18M2 15h18" stroke="currentColor" stroke-width="2"/></svg>
    </button>
  </div>
  <span class="prog-line" aria-hidden="true"></span>
  <nav class="mnav" id="mnav" aria-label="Mobile">{mlinks}
    <a class="btn b-lime" href="start.html">Start a project {ARROW}</a>
  </nav>
</header>
<div class="tick" aria-label="What we make kit for"><div class="tick-in"><div>{tick}</div><div aria-hidden="true">{tick}</div></div></div>'''

FOOTER = f'''<footer class="ftr">
  <div class="wrap">
    <div class="ftr-top">
      <div class="about">
        <a class="brand" href="index.html" aria-label="CustomKit home"><img src="img/logo.png" width="420" height="153" alt="CustomKit"></a>
        <p>Kit for teams and clubs, and design, sampling, manufacturing and fulfilment for sportswear and apparel brands.</p>
      </div>
      <div><h4>Teams</h4><ul>
        <li><a href="teams.html">Team kit and prices</a></li>
        <li><a href="https://design.customkit.com" target="_blank" rel="noopener">Kit designer</a></li>
        <li><a href="make.html">What we make</a></li>
        <li><a href="start.html">Ask for a quote</a></li></ul></div>
      <div><h4>Brands</h4><ul>
        <li><a href="white-label.html">White label</a></li>
        <li><a href="brand-design.html">Brand design service</a></li>
        <li><a href="launch.html">Drops and webstores</a></li>
        <li><a href="process.html">How it works</a></li></ul></div>
      <div><h4>Company</h4><ul>
        <li><a href="founder.html">Meet the founder</a></li>
        <li><a href="reviews.html">Reviews</a></li>
        <li><a href="mailto:hello@customkit.com">hello@customkit.com</a></li>
        <li><a href="https://www.linkedin.com/company/custom-kit-group-limited" target="_blank" rel="noopener">LinkedIn</a></li>
        <li><a href="https://customkit.com/blog">Guides and blog</a></li>
        <li><a href="https://customkit.com/supplier-application">Become a manufacturing partner</a></li></ul></div>
    </div>
    <p class="ftr-word" aria-hidden="true">Custom<span>kit</span></p>
    <div class="ftr-bot">
      <span>&copy; <span id="yr">2026</span> Custom Kit Group Limited. Registered in England and Wales, company number 16899649. 5 The Grange, Bolton Road, Turton, Bolton BL7 0AW.</span>
      <span><a href="https://customkit.com/privacy">Privacy</a><a href="https://customkit.com/terms">Terms</a><a href="https://customkit.com/returns-policy">Returns</a></span>
    </div>
  </div>
</footer>
<script src="assets/site.js" defer></script>
</body>
</html>
'''

def build():
    n = 0
    for f in sorted(glob.glob(os.path.join(HERE, 'pages', '*.html'))):
        src = open(f, encoding='utf-8').read()
        m = re.match(r'\s*<!--(\{.*?\})-->\s*', src, re.S)
        meta = json.loads(m.group(1))
        body = src[m.end():]
        body = body.replace('{{STUDIO}}', studio()).replace('{{ARROW}}', ARROW).replace('{{STARS}}', STARS)
        slug = os.path.basename(f)[:-5]
        html = head(meta['title'], meta['desc'], slug) + '\n' + header(meta.get('nav', '')) + '\n<main id="main">\n' + body.strip() + '\n</main>\n' + FOOTER
        open(os.path.join(OUT, slug + '.html'), 'w', encoding='utf-8').write(html)
        n += 1
    print('built', n, 'pages')

if __name__ == '__main__':
    build()
