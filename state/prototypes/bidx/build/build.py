#!/usr/bin/env python3
"""BidX. Builds the public guides site and the outreach desk into ../site/.

    python3 build.py

Data lives in data/. calls.json is the open competitions read from the funder's own pages, guides.py holds the three
long guides, founders.py the desk's sample founders. Pages are Python functions in pages/ that return HTML strings.
JS stays in its own files (site.js, desk.js) and never sits inside an f string.
"""
import hashlib
import html
import json
import os
import re
import shutil
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.normpath(os.path.join(HERE, '..', 'site'))
sys.path.insert(0, HERE)

BOOK = 'https://get.bidx.ai/widget/bookings/book-your-free-consultation-and-win-100k-2m-funding'
PRIVACY = 'https://app.bidx.ai/privacy-policy'
TERMS = 'https://app.bidx.ai/terms-of-use'
LI_SIMON = 'https://www.linkedin.com/in/simondutta/'
LI_AARON = 'https://www.linkedin.com/in/aaronmase/'
ADDRESS = 'BIDX Limited, company number 15207532, London WC2H 9JQ'

esc = html.escape


def read(p):
    with open(os.path.join(HERE, p), encoding='utf-8') as f:
        return f.read()


LOGO_SVG = read('data/logo.svg').replace('width="97" height="38" ', '').replace('<svg ', '<svg role="img" aria-label="BidX" ', 1)


def ver(path):
    """Content hash for cache busting, so a new deploy never meets an old stylesheet."""
    with open(os.path.join(OUT, path.lstrip('/')), 'rb') as f:
        return hashlib.sha256(f.read()).hexdigest()[:10]


def glyph(states, cls='', label=None):
    """The logo's eight dots. states is a string of g, a, r or n (none), one per dot."""
    lab = f' role="img" aria-label="{esc(label)}"' if label else ' aria-hidden="true"'
    dots = ''.join(f'<i class="{s}"></i>' if s != 'n' else '<i></i>' for s in states)
    return f'<span class="glyph {cls}"{lab}>{dots}</span>'


LOGO_STATES = 'raarragg'  # the logo itself, column one red amber amber, column two red red amber, column three green green


ICON = {
    'ar': '<svg class="ar" viewBox="0 0 16 16" aria-hidden="true"><path d="M2 8h11M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    'ext': '<svg class="ar" viewBox="0 0 16 16" aria-hidden="true"><path d="M6 3h7v7M13 3 4 12" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    'search': '<svg viewBox="0 0 20 20" aria-hidden="true" width="18" height="18"><circle cx="9" cy="9" r="6" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="m13.5 13.5 4 4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
    'check': '<svg viewBox="0 0 16 16" aria-hidden="true" width="16" height="16"><path d="m3 8.5 3 3 7-7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    'x': '<svg viewBox="0 0 16 16" aria-hidden="true" width="16" height="16"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
    'li': '<svg viewBox="0 0 16 16" aria-hidden="true" width="15" height="15"><rect x="1" y="1" width="14" height="14" rx="3" fill="currentColor"/><path d="M4.4 6.6v5M4.4 4.3v.1M7.3 11.6V8.9c0-1.4 2.6-1.6 2.6 0v2.7M7.3 6.6v5" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/></svg>',
    'mail': '<svg viewBox="0 0 16 16" aria-hidden="true" width="15" height="15"><rect x="1.5" y="3" width="13" height="10" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="m2 4.5 6 4.5 6-4.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>',
}


def head(title, desc, path, extra_css=''):
    css_v = ver('assets/site.css')
    return f'''<!doctype html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>{esc(title)}</title>
<meta name="description" content="{esc(desc)}">
<link rel="canonical" href="https://bidx.ai{path}">
<meta property="og:title" content="{esc(title)}">
<meta property="og:description" content="{esc(desc)}">
<meta property="og:type" content="website">
<meta name="theme-color" content="#ffffff">
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
<link rel="preload" href="/assets/fonts/hostgrotesk-normal-300-800.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/doto-var.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/site.css?v={css_v}">{extra_css}
<script>document.documentElement.classList.add('js')</script>
</head>
'''


NAV = [('/guides/', 'Guides'), ('/calls/', 'Open calls'), ('/fit/', 'Fit check'), ('/#founders', 'About')]


def header(cur):
    cur_attr = ' aria-current="page"'
    links = ''.join(f'<a href="{h}"{cur_attr if cur == h else ""}>{t}</a>' for h, t in NAV)
    mlinks = ''.join(f'<a href="{h}">{t}</a>' for h, t in NAV)
    return f'''<a class="skip" href="#main">Skip to content</a>
<header class="top" id="top">
  <div class="wrap top-in">
    <a class="logo" href="/" aria-label="BidX home">{LOGO_SVG}</a>
    <nav class="nav" aria-label="Main">{links}</nav>
    <a class="btn pri" href="{BOOK}">Book FREE funding call</a>
    <button class="menu-b" type="button" aria-expanded="false" aria-controls="mnav"><span></span><span class="sr">Menu</span></button>
  </div>
</header>
<nav class="mnav" id="mnav" aria-label="Mobile">{mlinks}<a class="btn pri" href="{BOOK}">Book FREE funding call</a></nav>
'''


def footer():
    return f'''<footer class="foot">
  <div class="wrap">
    <div class="foot-g">
      <div>
        <a class="logo" href="/" aria-label="BidX home">{LOGO_SVG}</a>
        <p style="margin-top:18px;max-width:340px">Grant writer led applications for UK founders, built around how assessors score.</p>
        <p class="small" style="margin-top:18px;color:#a9a7c9">{esc(ADDRESS)}</p>
      </div>
      <div><h2 class="fh">Funding</h2><ul><li><a href="/calls/">Open calls</a></li><li><a href="/guides/">Guides</a></li><li><a href="/fit/">Fit check</a></li></ul></div>
      <div><h2 class="fh">BidX</h2><ul><li><a href="/#founders">Founders</a></li><li><a href="{BOOK}">Book FREE funding call</a></li><li><a href="{LI_SIMON}">Simon on LinkedIn</a></li><li><a href="{LI_AARON}">Aaron on LinkedIn</a></li></ul></div>
      <div><h2 class="fh">Legal</h2><ul><li><a href="{PRIVACY}">Privacy policy</a></li><li><a href="{TERMS}">Terms &amp; Conditions</a></li></ul></div>
    </div>
    <div class="foot-b"><span>&copy; 2026 BidX.ai</span><span>Funding details are taken from each funder&rsquo;s own pages. Always check the official brief before you apply.</span></div>
  </div>
</footer>
'''


def page(title, desc, path, body, cur=None, scripts=('site.js',), extra_css=''):
    js = ''.join(f'<script src="/assets/{s}?v={ver("assets/" + s)}" defer></script>' for s in scripts)
    return (head(title, desc, path, extra_css) + '<body>\n' + header(cur) + '<main id="main">\n' + body +
            '\n</main>\n' + footer() + js + '\n</body>\n</html>\n')


def write(rel, content):
    p = os.path.join(OUT, rel)
    os.makedirs(os.path.dirname(p), exist_ok=True)
    with open(p, 'w', encoding='utf-8') as f:
        f.write(content)


def main():
    os.makedirs(os.path.join(OUT, 'assets'), exist_ok=True)
    for f in ('site.css', 'desk.css', 'site.js', 'desk.js', 'fit.js', 'guides.js'):
        if os.path.exists(os.path.join(HERE, f)):
            shutil.copy(os.path.join(HERE, f), os.path.join(OUT, 'assets', f))
    fav = ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#fff"/>'
           '<circle cx="9" cy="8" r="3" fill="#FF3D57"/><circle cx="9" cy="16" r="3" fill="#FFCA00"/><circle cx="9" cy="24" r="3" fill="#FFCA00"/>'
           '<circle cx="17" cy="8" r="3" fill="#FF3D57"/><circle cx="17" cy="16" r="3" fill="#FF3D57"/><circle cx="17" cy="24" r="3" fill="#FFCA00"/>'
           '<circle cx="25" cy="12" r="3" fill="#00D747"/><circle cx="25" cy="20" r="3" fill="#00D747"/></svg>')
    write('assets/favicon.svg', fav)
    import pages
    for rel, content in pages.build_all(sys.modules[__name__]):
        write(rel, content)
        print('wrote', rel, len(content))
    write('netlify.toml', '[build]\n  publish = "."\n\n[[headers]]\n  for = "/assets/*"\n  [headers.values]\n    Cache-Control = "public, max-age=0, must-revalidate"\n')


if __name__ == '__main__':
    main()
