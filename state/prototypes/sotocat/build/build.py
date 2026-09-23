#!/usr/bin/env python3
"""Assemble the SotoCat prototype pages from one shared head, header and footer."""
import os, re, glob, shutil

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.normpath(os.path.join(HERE, '..', 'site'))
MARK = open(os.path.join(HERE, 'mark.svgfrag')).read()
WORD = open(os.path.join(HERE, 'word.svgfrag')).read()

CAL = 'https://calendly.com/shalls/sergey-shalunov-meeting-room'

def mark_svg(cls='mk', label=None):
    aria = f'role="img" aria-label="{label}"' if label else 'aria-hidden="true"'
    return f'<svg class="{cls}" viewBox="70 0 160 200" {aria}>{MARK}</svg>'

def word_svg(cls='wm'):
    return f'<svg class="{cls}" viewBox="0 224 300 48" aria-hidden="true">{WORD}</svg>'

NAV = [('index.html#how', 'How it works', 'how'), ('pricing.html', 'Pricing', 'pricing'),
       ('contractors.html', 'Contractors', 'contractors'), ('landlords.html', 'Landlords', 'landlords'),
       ('about.html', 'About', 'about'), ('faq.html', 'FAQ', 'faq')]

ARROW = '<svg class="ar" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h9M8.5 4l4 4-4 4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>'

def header(cur):
    AC = ' aria-current="page"'
    links = ''.join(
        f'<a href="{h}"{AC if k == cur else ""}>{t}</a>' for h, t, k in NAV)
    mlinks = ''.join(f'<a href="{h}">{t}</a>' for h, t, k in NAV)
    return f'''<a class="skip" href="#main">Skip to content</a>
<header class="hdr">
  <div class="wrap">
    <a class="brand" href="index.html" aria-label="SotoCat home">{mark_svg()}{word_svg()}</a>
    <nav class="nav" aria-label="Main">{links}</nav>
    <div class="hdr-cta">
      <a class="signin" href="signin.html">Sign in</a>
      <a class="btn btn-blue btn-sm" href="start.html">Start free trial</a>
    </div>
    <button class="menu-btn" type="button" aria-expanded="false" aria-controls="mnav" aria-label="Menu">
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true"><path d="M3 7h16M3 15h16" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
    </button>
  </div>
  <nav class="mnav" id="mnav" aria-label="Mobile">{mlinks}<a href="signin.html">Sign in</a><a href="contact.html">Request a call</a>
    <a class="btn btn-blue" href="start.html">Start 90 days free</a>
  </nav>
</header>'''

SOC_LI = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4v11H3zM9.5 9.5h3.8v1.6h.1c.5-1 1.8-1.9 3.7-1.9 4 0 4.7 2.5 4.7 5.8v5.5h-4v-4.9c0-1.2 0-2.7-1.6-2.7s-1.9 1.3-1.9 2.6v5h-4z"/></svg>'
SOC_YT = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .6 12a31 31 0 0 0 .4 4.8 3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .4-4.8 31 31 0 0 0-.4-4.8zM9.7 15.1V8.9l5.8 3.1z"/></svg>'

FOOTER = f'''<footer class="ftr">
  <div class="wrap">
    <div class="top">
      <div class="about">
        <a class="brand" href="index.html" aria-label="SotoCat home">{mark_svg()}{word_svg()}</a>
        <p>Repairs and maintenance run by AI, for letting agents and the landlords, tenants and contractors around them.</p>
        <div class="soc">
          <a href="https://www.linkedin.com/company/sotocat/" aria-label="SotoCat on LinkedIn" rel="noopener" target="_blank">{SOC_LI}</a>
          <a href="https://www.youtube.com/@SotoCatAI" aria-label="SotoCat on YouTube" rel="noopener" target="_blank">{SOC_YT}</a>
        </div>
      </div>
      <div><h4>Product</h4><ul>
        <li><a href="index.html#how">How it works</a></li>
        <li><a href="pricing.html">Pricing</a></li>
        <li><a href="start.html">Start free trial</a></li>
        <li><a href="{CAL}" target="_blank" rel="noopener">Book a demo</a></li>
        <li><a href="signin.html">Sign in</a></li></ul></div>
      <div><h4>Who it's for</h4><ul>
        <li><a href="start.html">Letting agents</a></li>
        <li><a href="contractors.html">Contractors</a></li>
        <li><a href="landlords.html">Landlords</a></li>
        <li><a href="faq.html#tenants">Tenants</a></li></ul></div>
      <div><h4>Company</h4><ul>
        <li><a href="about.html">About</a></li>
        <li><a href="https://sotocat.com/blog-2/">Blog</a></li>
        <li><a href="faq.html">FAQ</a></li>
        <li><a href="contact.html">Contact</a></li></ul></div>
      <div><h4>Talk to us</h4><ul>
        <li><a href="mailto:support@sotocat.com">support@sotocat.com</a></li>
        <li><a href="tel:+442033999323">+44 20 3399 9323</a></li>
        <li><a href="contact.html">Request a call</a></li></ul></div>
    </div>
    <div class="legal">
      <p>&copy; <span id="yr">2026</span> SotoCat Limited. Registered in England and Wales, company number 17067432. Registered office Cleland House, 32 John Islip Street, London SW1P 4FF.</p>
      <nav aria-label="Legal"><a href="https://sotocat.com/privacy-policy/">Privacy policy</a><a href="https://sotocat.com/terms-of-use/">Terms of use</a></nav>
    </div>
  </div>
</footer>'''

def head(title, desc, extra=''):
    return f'''<!doctype html>
<html lang="en-GB" class="no-js">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{title}</title>
<meta name="description" content="{desc}">
<meta name="robots" content="noindex, nofollow">
<meta name="theme-color" content="#0b0b0c">
<meta property="og:type" content="website">
<meta property="og:site_name" content="SotoCat">
<meta property="og:title" content="{title}">
<meta property="og:description" content="{desc}">
<meta property="og:image" content="https://astra-sotocat-prototype.netlify.app/img/og.jpg">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="img/favicon.svg" type="image/svg+xml">
<link rel="preload" href="fonts/dmsans.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="assets/site.css">
{extra}</head>'''

def build():
    for f in sorted(glob.glob(os.path.join(HERE, 'pages', '*.html'))):
        raw = open(f, encoding='utf-8').read()
        m = re.match(r'<!--meta\n(.*?)\n-->\n', raw, re.S)
        meta = dict(l.split('=', 1) for l in m.group(1).split('\n'))
        body = raw[m.end():]
        body = body.replace('{{ARROW}}', ARROW).replace('{{CAL}}', CAL).replace('{{MARK}}', mark_svg('mk2')).replace('{{MARKFRAG}}', MARK)
        bcls = meta.get('body', '')
        html = head(meta['title'], meta['desc'], meta.get('extra', '')) + f'\n<body class="{bcls}">\n' + header(meta.get('nav', '')) + f'\n<main id="main">\n{body}\n</main>\n' + FOOTER + '\n<script src="assets/site.js" defer></script>\n</body>\n</html>\n'
        name = os.path.basename(f)
        if name == '404.html':
            # served at any path, so every local URL must be root relative
            html = re.sub(r'(href|src)="(?!https?:|mailto:|tel:|#|/)([^"]+)"', r'\1="/\2"', html)
        open(os.path.join(OUT, name), 'w', encoding='utf-8').write(html)
        print('built', name, len(html))

if __name__ == '__main__':
    build()
