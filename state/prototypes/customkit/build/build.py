#!/usr/bin/env python3
"""Assemble the CustomKit prototype pages from one shared head, header and footer.

Each file in pages/ starts with a JSON comment, <!--{"title":..,"desc":..,"nav":..}-->,
followed by the page body. Run it and the finished HTML lands in ../site.
"""
import os, re, json, glob

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.normpath(os.path.join(HERE, '..', 'site'))
BASE = 'https://astra-customkit-prototype.netlify.app/'

NAV = [('make.html', 'What we make', 'make'), ('white-label.html', 'White label', 'white'),
       ('brand-design.html', 'Brand design', 'brand'), ('launch.html', 'Drops and stores', 'launch'),
       ('process.html', 'How it works', 'process'), ('founder.html', 'Founder', 'founder'),
       ('reviews.html', 'Reviews', 'reviews')]

ARROW = '<svg class="ar" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h9M8.5 4l4 4-4 4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>'
STAR = '<svg viewBox="0 0 20 20" aria-hidden="true"><path fill="currentColor" d="M10 1.8l2.5 5.2 5.7.8-4.1 4 1 5.6L10 14.7l-5.1 2.7 1-5.6-4.1-4 5.7-.8z"/></svg>'
STARS = '<span class="stars" role="img" aria-label="Five stars">' + STAR * 5 + '</span>'

FAV = ("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 32 32%27%3E"
       "%3Crect width=%2732%27 height=%2732%27 rx=%276%27 fill=%27%230b0c0e%27/%3E"
       "%3Cpath d=%27M7 20.5h18%27 stroke=%27%23b49a64%27 stroke-width=%272%27/%3E"
       "%3Ctext x=%2716%27 y=%2717%27 text-anchor=%27middle%27 font-family=%27Arial%27 font-weight=%27700%27 font-size=%2712%27 fill=%27%23fff%27%3ECK%3C/text%3E%3C/svg%3E")


COLS = [('gold','#b49a64','Gold'),('black','#16181b','Black'),('white','#f1f1ec','White'),('navy','#1c2b4a','Navy'),
        ('royal','#1f5bbf','Royal blue'),('sky','#7db2df','Sky blue'),('red','#b8261f','Red'),('claret','#6b1d33','Claret'),
        ('green','#1f6b3b','Green'),('orange','#d7661d','Orange'),('yellow','#e3bf2a','Yellow'),('teal','#17a393','Teal'),('grey','#4a4d52','Charcoal')]
DESIGNS = [('vortex','Vortex'),('ripple','Ripple'),('paint','Paint'),('voltz','Voltz'),('classic07','Classic 07'),('hoops','Hoops')]

def studio(design='vortex', c1='gold', c2='black'):
    dz = ''.join(f'<button type="button" data-dv="{k}" aria-label="{n}" aria-pressed="{str(k==design).lower()}"><img src="img/r-{k}.webp" alt="" width="760" height="1050" loading="lazy"></button>' for k, n in DESIGNS)
    s1 = ''.join(f'<button type="button" data-c1v="{k}" aria-label="Colour one, {n}" aria-pressed="{str(k==c1).lower()}" style="background:{h}"></button>' for k, h, n in COLS)
    s2 = ''.join(f'<button type="button" data-c2v="{k}" aria-label="Colour two, {n}" aria-pressed="{str(k==c2).lower()}" style="background:{h}"></button>' for k, h, n in COLS)
    return f'''<div class="sheet" data-studio data-design="{design}" data-c1="{c1}" data-c2="{c2}">
  <div class="sheet-top"><b>Spec sheet</b><span class="st"><i></i>Awaiting your sign off</span></div>
  <div class="sheet-body">
    <div class="garment"><canvas role="img" aria-label="CustomKit shirt design in your chosen colours" width="760" height="1050"></canvas></div>
    <div class="callouts">
      <div class="co"><b>Fully sublimated</b><span>Unlimited colours, gradients and patterns</span></div>
      <div class="co"><b>Your label</b><span>Your branding on every label, tag and package</span></div>
      <div class="co"><b>Crest, sponsors, names</b><span>Placed exactly where you want them</span></div>
      <div class="co"><b>Fabric</b><span>Chosen from 200+ performance fabrics</span></div>
    </div>
  </div>
  <div class="sheet-ctl">
    <div class="ctl-row"><span class="lab">Design</span><div class="designs">{dz}</div></div>
    <div class="ctl-row"><span class="lab">Colour one</span><div class="sw">{s1}</div></div>
    <div class="ctl-row"><span class="lab">Colour two</span><div class="sw">{s2}</div></div>
    <div class="sheet-foot"><p data-name>Vortex in gold and black</p><a class="btn btn-dark btn-sm" data-brief href="start.html?design={design}&amp;c1={c1}&amp;c2={c2}">Brief us on this design {ARROW}</a></div>
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
<meta name="theme-color" content="#0b0c0e">
<link rel="icon" href="{FAV}">
<link rel="preload" href="fonts/spacegrotesk.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="fonts/inter.woff2" as="font" type="font/woff2" crossorigin>
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
    links = ''.join(f'<a href="{h}"{AC if k == cur else ""}>{t}</a>' for h, t, k in NAV)
    mlinks = ''.join(f'<a href="{h}">{t}</a>' for h, t, k in NAV)
    return f'''<a class="skip" href="#main">Skip to content</a>
<div class="bar">Ordering kit for a club or team? <a href="clubs.html">Design it online and see club prices</a></div>
<header class="hdr">
  <div class="wrap">
    <a class="brand" href="index.html" aria-label="CustomKit home"><img src="img/logo.png" width="420" height="153" alt="CustomKit"></a>
    <nav class="nav" aria-label="Main">{links}</nav>
    <div class="hdr-cta"><a class="btn btn-gold btn-sm" href="start.html">Start a project</a></div>
    <button class="menu-btn" type="button" aria-expanded="false" aria-controls="mnav" aria-label="Menu">
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true"><path d="M3 7h16M3 15h16" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
    </button>
  </div>
  <nav class="mnav" id="mnav" aria-label="Mobile">{mlinks}<a href="clubs.html">Clubs and teams</a>
    <a class="btn btn-gold" href="start.html">Start a project</a>
  </nav>
</header>'''

FOOTER = f'''<footer class="ftr">
  <div class="wrap">
    <div class="top">
      <div class="about">
        <a class="brand" href="index.html" aria-label="CustomKit home"><img src="img/logo.png" width="420" height="153" alt="CustomKit" style="width:124px"></a>
        <p>Design, sampling, manufacturing and fulfilment for sportswear and apparel brands, creators, clubs and organisations.</p>
      </div>
      <div><h4>Make</h4><ul>
        <li><a href="make.html">What we make</a></li>
        <li><a href="white-label.html">White label manufacturing</a></li>
        <li><a href="brand-design.html">Brand design service</a></li>
        <li><a href="launch.html">Drops and webstores</a></li>
        <li><a href="clubs.html">Clubs and teams</a></li></ul></div>
      <div><h4>Company</h4><ul>
        <li><a href="process.html">How it works</a></li>
        <li><a href="founder.html">Meet the founder</a></li>
        <li><a href="reviews.html">Reviews</a></li>
        <li><a href="https://customkit.com/blog">Guides and blog</a></li>
        <li><a href="https://customkit.com/supplier-application">Become a manufacturing partner</a></li></ul></div>
      <div><h4>Talk to us</h4><ul>
        <li><a href="start.html">Start a project</a></li>
        <li><a href="mailto:hello@customkit.com">hello@customkit.com</a></li>
        <li><a href="https://www.trustpilot.com/review/customkit.com" target="_blank" rel="noopener">Trustpilot</a></li>
        <li><a href="https://www.linkedin.com/company/custom-kit-group-limited" target="_blank" rel="noopener">LinkedIn</a></li></ul></div>
    </div>
    <div class="bot">
      <span>&copy; <span id="yr">2026</span> Custom Kit Group Limited. Registered in England and Wales, company number 16899649. 5 The Grange, Bolton Road, Turton, Bolton BL7 0AW.</span>
      <span><a href="https://customkit.com/privacy">Privacy</a> &nbsp; <a href="https://customkit.com/terms">Terms</a> &nbsp; <a href="https://customkit.com/returns-policy">Returns</a></span>
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
