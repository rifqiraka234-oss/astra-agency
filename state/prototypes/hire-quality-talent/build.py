#!/usr/bin/env python3
"""Hire Quality Talent prototype. Assembles pages/*.html into site/.
Each page starts with <!--{"title","desc","nav"}-->. Tokens {{AR}} arrow, {{TBC}} a to-confirm tag, {{CTA}} the shared close."""
import os, re, json, glob
HERE = os.path.dirname(os.path.abspath(__file__)); OUT = os.path.join(HERE, 'site')
AR = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h9M8.5 4l4 4-4 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>'
TBC = '<span class="tbc" title="Placeholder, Ciara to confirm">To confirm</span>'
NAV = [('services.html', 'Services', 'services'), ('industries.html', 'Industries', 'industries'), ('about.html', 'About', 'about'), ('pricing.html', 'Pricing', 'pricing'), ('contact.html', 'Contact', 'contact')]
EMAIL = 'contact@hirequalitytalent.co.uk'; TEL = '07876 734 751'; TELH = '+447876734751'
LI = 'https://www.linkedin.com/company/hire-quality-talent'

CTA = f'''<section class="sec tight cta"><div class="wrap">
  <div><p class="eyebrow">Got a role that's proving hard to fill?</p><h2 class="d2">Tell us what you're trying to achieve. <em>We'll tell you honestly how we can help.</em></h2></div>
  <div style="display:flex;gap:12px;flex-wrap:wrap"><a class="btn gold" href="contact.html">Discuss a role {AR}</a><a class="btn line" href="pricing.html">See our fees</a></div>
</div></section>'''

def header(cur):
    links = ''.join(f'<a href="{h}"' + (' aria-current="page"' if k == cur else '') + f'>{t}</a>' for h, t, k in NAV)
    mlinks = ''.join(f'<a href="{h}">{t}</a>' for h, t, k in NAV)
    return f'''<a class="skip" href="#main">Skip to content</a>
<div class="draftbar">Draft site built for Ciara Neal by Astra. Anything tagged "To confirm" is a placeholder for Ciara to check.</div>
<header class="hdr"><div class="wrap">
  <a class="brand" href="index.html" aria-label="Hire Quality Talent home"><img src="assets/img/mark-112.png" width="40" height="39" alt=""><span>Hire Quality Talent<small>Executive search and recruitment</small></span></a>
  <nav class="nav" aria-label="Main">{links}</nav>
  <a class="btn" href="contact.html">Discuss a role</a>
  <button class="menu-btn" type="button" aria-expanded="false" aria-controls="mnav" aria-label="Menu"><span></span><span></span></button>
</div></header>
<nav class="mnav" id="mnav" aria-label="Mobile"><a href="index.html">Home</a>{mlinks}<a class="btn" href="contact.html">Discuss a role</a></nav>'''

FOOTER = f'''<footer class="ftr"><div class="wrap">
  <div class="cols">
    <div><img class="word" src="assets/img/wordmark-360.png" width="150" height="102" alt="Hire Quality Talent"><p>Specialist recruitment, executive search and fractional talent acquisition. Rooted in industrial, manufacturing and technical markets, recruiting across the UK, Europe and internationally.</p></div>
    <div><h2>Services</h2><ul><li><a href="services.html#headhunting">Recruitment and headhunting</a></li><li><a href="services.html#executive">Executive search</a></li><li><a href="services.html#fractional">Fractional talent acquisition</a></li><li><a href="services.html#hr">HR and people support</a></li></ul></div>
    <div><h2>Company</h2><ul><li><a href="about.html">About</a></li><li><a href="industries.html">Industries</a></li><li><a href="pricing.html">Pricing</a></li><li><a href="services.html#candidates">For candidates</a></li></ul></div>
    <div><h2>Talk to us</h2><ul><li><a href="mailto:{EMAIL}">{EMAIL}</a></li><li><a href="tel:{TELH}">{TEL}</a></li><li><a href="{LI}" rel="noopener" target="_blank">LinkedIn</a></li></ul></div>
  </div>
  <div class="bot"><span>&copy; 2026 Hire Quality Talent. All rights reserved.</span><span>Privacy notice {TBC}</span></div>
</div></footer>'''

def page(meta, body):
    t = meta['title']; full = t if t.startswith('Hire Quality Talent') else f'{t} | Hire Quality Talent'
    return f'''<!doctype html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>{full}</title>
<meta name="description" content="{meta['desc']}">
<meta property="og:title" content="{full}">
<meta property="og:description" content="{meta['desc']}">
<meta name="theme-color" content="#101720">
<meta name="robots" content="noindex">
<link rel="icon" href="assets/img/favicon-64.png">
<link rel="preload" href="assets/fonts/cormorant-garamond-latin-500-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="assets/fonts/manrope-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="assets/site.css">
<link rel="stylesheet" href="assets/story.css">
<script>document.documentElement.className+=' js';</script>
</head>
<body class="p-{meta.get('nav','x')}">
{header(meta.get('nav',''))}
<main id="main">
{body}
</main>
{FOOTER}
<script src="assets/site.js" defer></script>
<script src="assets/story.js" defer></script>
</body>
</html>
'''

def main():
    n = 0
    for f in sorted(glob.glob(os.path.join(HERE, 'pages', '*.html'))):
        src = open(f).read(); m = re.match(r'\s*<!--(\{.*?\})-->\s*', src, re.S)
        meta = json.loads(m.group(1)); body = src[m.end():]
        body = body.replace('{{AR}}', AR).replace('{{TBC}}', TBC).replace('{{CTA}}', CTA).replace('{{EMAIL}}', EMAIL).replace('{{TEL}}', TEL).replace('{{TELH}}', TELH)
        left = re.findall(r'\{\{[^}]*\}\}', body); assert not left, left
        open(os.path.join(OUT, os.path.basename(f)), 'w').write(page(meta, body)); n += 1
    print('built', n, 'pages')

if __name__ == '__main__':
    main()
