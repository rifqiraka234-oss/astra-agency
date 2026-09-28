#!/usr/bin/env python3
"""Assemble the Qualigraf UK site from pages/*.html plus one shared head, header and footer.

Each page starts with a JSON comment, <!--{"title":..,"desc":..,"nav":..}-->. Tokens in the page
body are replaced here, so nine pages can't drift apart:
  {{I:name}}       an icon (Qualigraf's own stage icons for sign, agenda, decide, archive)
  {{CURL:colour}}  Qualigraf's brand tile, the cream curl on a colour square
  {{AR}}           arrow for buttons
  {{TRACK}}        the committee cycle track with its eight stations
  {{CLOSE}}        the shared closing stack (next steps, alternatives)
"""
import os, re, json, glob

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.normpath(os.path.join(HERE, '..', 'site'))
CURL = open(os.path.join(HERE, 'curl.path')).read().strip()
STAGE = json.load(open(os.path.join(HERE, 'stageicons.json')))

BOOK = 'https://outlook.office.com/bookwithme/user/b598dc005ac742af96033c71ed47e5ee@qualigraf.com?anonymous&amp;ismsaljsauthenabled&amp;ep=plink'

def stage(k):
    return '<svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">' + ''.join(f'<path d="{d}"/>' for d in STAGE[k]) + '</svg>'

S = 'fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"'
ICONS = {
    'sign': stage('sign'), 'agenda': stage('agenda'), 'decide': stage('decide'), 'archive': stage('archive'),
    'plan': f'<svg viewBox="0 0 32 32" {S} aria-hidden="true"><rect x="4.5" y="7" width="23" height="21" rx="2.5"/><path d="M4.5 13h23M11 4v6M21 4v6M10 18h4M18 18h4M10 23h4"/></svg>',
    'write': f'<svg viewBox="0 0 32 32" {S} aria-hidden="true"><path d="M19 4H8.5A2.5 2.5 0 0 0 6 6.5v19A2.5 2.5 0 0 0 8.5 28h15a2.5 2.5 0 0 0 2.5-2.5V11z"/><path d="M19 4v7h7M11 17h10M11 22h6"/></svg>',
    'meet': f'<svg viewBox="0 0 32 32" {S} aria-hidden="true"><rect x="4" y="5" width="24" height="16" rx="2.5"/><path d="M11 28h10M16 21v7"/><circle cx="12" cy="12" r="2.5"/><circle cx="20" cy="12" r="2.5"/><path d="M8.5 18c.8-1.8 2-2.7 3.5-2.7s2.7.9 3.5 2.7M16.5 18c.8-1.8 2-2.7 3.5-2.7s2.7.9 3.5 2.7"/></svg>',
    'publish': f'<svg viewBox="0 0 32 32" {S} aria-hidden="true"><circle cx="16" cy="16" r="3"/><path d="M10.3 21.7a8 8 0 0 1 0-11.4M21.7 10.3a8 8 0 0 1 0 11.4M6.1 25.9a14 14 0 0 1 0-19.8M25.9 6.1a14 14 0 0 1 0 19.8"/></svg>',
    'check': f'<svg viewBox="0 0 24 24" {S} aria-hidden="true"><path d="M4.5 12.5l5 5 10-11"/></svg>',
    'shield': f'<svg viewBox="0 0 24 24" {S} aria-hidden="true"><path d="M12 3l8 3v6c0 4.5-3.4 8.2-8 9-4.6-.8-8-4.5-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/></svg>',
    'clock': f'<svg viewBox="0 0 24 24" {S} aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/></svg>',
    'users': f'<svg viewBox="0 0 24 24" {S} aria-hidden="true"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.8-3.6 3.3-5.5 6.5-5.5s5.7 1.9 6.5 5.5"/><circle cx="17" cy="9" r="2.8"/><path d="M16.5 14.6c2.6.1 4.3 1.8 5 4.9"/></svg>',
    'search': f'<svg viewBox="0 0 24 24" {S} aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5L21 21"/></svg>',
    'spark': f'<svg viewBox="0 0 24 24" {S} aria-hidden="true"><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M18 6l-2.5 2.5M8.5 15.5L6 18"/></svg>',
    'video': f'<svg viewBox="0 0 24 24" {S} aria-hidden="true"><rect x="3" y="6" width="13" height="12" rx="2"/><path d="M16 10.5l5-3v9l-5-3"/></svg>',
    'bell': f'<svg viewBox="0 0 24 24" {S} aria-hidden="true"><path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15z"/><path d="M10 20.5a2 2 0 0 0 4 0"/></svg>',
    'lock': f'<svg viewBox="0 0 24 24" {S} aria-hidden="true"><rect x="5" y="10.5" width="14" height="10" rx="2"/><path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5"/></svg>',
    'globe': f'<svg viewBox="0 0 24 24" {S} aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 3.7 5.6 3.7 9s-1.2 6.4-3.7 9c-2.5-2.6-3.7-5.6-3.7-9S9.5 5.6 12 3z"/></svg>',
    'mail': f'<svg viewBox="0 0 24 24" {S} aria-hidden="true"><rect x="3" y="5.5" width="18" height="13" rx="2"/><path d="M3.5 7l8.5 6 8.5-6"/></svg>',
    'phone': f'<svg viewBox="0 0 24 24" {S} aria-hidden="true"><path d="M6.5 3.5h3l1.5 4-2 1.5a11 11 0 0 0 6 6l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4.5 5.7a2 2 0 0 1 2-2.2z"/></svg>',
    'cal': f'<svg viewBox="0 0 24 24" {S} aria-hidden="true"><rect x="3.5" y="5" width="17" height="15.5" rx="2"/><path d="M3.5 9.5h17M8 3v4M16 3v4"/></svg>',
    'doc': f'<svg viewBox="0 0 24 24" {S} aria-hidden="true"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h4"/></svg>',
    'link': f'<svg viewBox="0 0 24 24" {S} aria-hidden="true"><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/></svg>',
    'tablet': f'<svg viewBox="0 0 24 24" {S} aria-hidden="true"><rect x="5" y="2.5" width="14" height="19" rx="2.5"/><path d="M11 18.5h2"/></svg>',
    'ok': '<svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="30" fill="#37BAC5"/><path d="M19 33l9 9 17-19" fill="none" stroke="#1B2740" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
}
AR = '<svg class="ar" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h9M8.5 4l4 4-4 4" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></svg>'
COL = {'navy': '#2A3C5E', 'coral': '#FE764A', 'teal': '#37BAC5', 'plum': '#7A5D7B', 'mustard': '#F4B63F'}

def curl(c):
    return f'<svg viewBox="0 0 150 150" aria-hidden="true"><rect width="150" height="150" fill="{COL[c]}"/><path fill-rule="evenodd" clip-rule="evenodd" d="{CURL}" fill="#FCF9EB"/></svg>'

STATIONS = [('plan', 'Forward plan'), ('write', 'Report'), ('sign', 'Sign off'), ('agenda', 'Agenda pack'),
            ('meet', 'Meeting'), ('decide', 'Decision'), ('publish', 'Publication'), ('archive', 'Archive')]
FILE_SVG = '<svg class="file" viewBox="0 0 44 34" aria-hidden="true"><path d="M3 6a3 3 0 0 1 3-3h11l4 4h17a3 3 0 0 1 3 3v19a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3z" fill="#F4B63F"/><path d="M3 12h38v17a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3z" fill="#F8C75E"/><rect x="9" y="17" width="16" height="2.6" rx="1.3" fill="#1B2740" opacity=".55"/><rect x="9" y="22.5" width="11" height="2.6" rx="1.3" fill="#1B2740" opacity=".35"/></svg>'
TRACK = ('<div class="track" aria-label="The committee cycle, from forward plan to archive"><div class="track-line"></div>' + FILE_SVG +
         '<ol class="stations">' + ''.join(f'<li><span class="dot">{ICONS[k]}</span>{t}</li>' for k, t in STATIONS) + '</ol></div>')

NAV = [('platform.html', 'Platform', 'platform'), ('ai-minutes.html', 'AI Minutes', 'ai'), ('new-councils.html', 'New councils', 'lgr'),
       ('roles.html', 'Who it’s for', 'roles'), ('security.html', 'Security', 'security'), ('about.html', 'About', 'about'),
       ('resources.html', 'Resources', 'resources')]

def header(cur):
    links = ''.join(f'<a href="{h}"' + (' aria-current="page"' if k == cur else '') + f'>{t}</a>' for h, t, k in NAV)
    mlinks = ''.join(f'<a href="{h}">{t}</a>' for h, t, k in NAV)
    return f'''<a class="skip" href="#main">Skip to content</a>
<header class="hdr">
  <div class="wrap">
    <a class="brand" href="index.html" aria-label="Qualigraf UK home"><img src="assets/img/logo-uk-light.svg" alt="Qualigraf UK" width="132" height="40"></a>
    <nav class="nav" aria-label="Main">{links}</nav>
    <div class="hdr-cta"><a class="btn btn-c btn-sm" href="contact.html">Book a walkthrough</a></div>
    <button class="menu-btn" type="button" aria-expanded="false" aria-controls="mnav" aria-label="Menu">
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 8h16M4 16h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
    </button>
  </div>
</header>
<nav class="mnav" id="mnav" aria-label="Mobile">{mlinks}<a href="contact.html">Contact</a><a class="btn btn-c" href="contact.html">Book a walkthrough {AR}</a></nav>'''

FOOTER = f'''<footer class="ftr">
  <div class="wrap">
    <div class="top">
      <div>
        <a class="brand" href="index.html" aria-label="Qualigraf UK home"><img src="assets/img/logo-uk-light.svg" alt="Qualigraf UK" width="139" height="42"></a>
        <p>Committee management for UK councils. Reports, sign offs, agenda packs, paperless meetings, decisions and the public record, kept together by topic.</p>
        <address class="addr">Qualigraf UK<br>53 Chapel Street, Mow Cop<br>Stoke-on-Trent ST7 4NS</address>
      </div>
      <div><h2 class="fh">Platform</h2><ul>
        <li><a href="platform.html">The committee cycle</a></li>
        <li><a href="platform.html#meeting">Paperless meetings</a></li>
        <li><a href="ai-minutes.html">AI Minutes</a></li>
        <li><a href="platform.html#publication">Publish and stream</a></li>
        <li><a href="security.html">Security and quality</a></li></ul></div>
      <div><h2 class="fh">For</h2><ul>
        <li><a href="roles.html#democratic-services">Democratic Services</a></li>
        <li><a href="roles.html#members">Members</a></li>
        <li><a href="roles.html#it">IT and information governance</a></li>
        <li><a href="new-councils.html">New councils</a></li></ul></div>
      <div><h2 class="fh">Company</h2><ul>
        <li><a href="about.html">About Qualigraf UK</a></li>
        <li><a href="resources.html">Resources</a></li>
        <li><a href="https://qualigraf.com/uk/press-release-ceo/">News</a></li>
        <li><a href="contact.html">Contact</a></li></ul></div>
      <div><h2 class="fh">Talk to us</h2><ul>
        <li><a href="tel:+447741080343">+44 7741 080343</a></li>
        <li><a href="mailto:info@qualigraf.com">info@qualigraf.com</a></li>
        <li><a href="{BOOK}" rel="noopener" target="_blank">Book a call with Stuart</a></li></ul></div>
    </div>
    <div class="bot">
      <span>&copy; 2026 Qualigraf. All rights reserved.</span>
      <span class="regions"><a href="https://qualigraf.com/uk/your-rights-and-privacy-uk/">Privacy</a><a href="https://qualigraf.com/uk/complaints-procedure-uk/">Complaints procedure</a><a href="https://qualigraf.com/uk/quality-uk/">Quality</a><a href="https://qualigraf.com/nl/homepage-nl/">Nederland</a><a href="https://qualigraf.com/fr/homepage-fr/">France</a><a href="https://qualigraf.com/en_ca/homepage-ca/">Canada</a></span>
    </div>
    <p class="note-foot">Product screens and examples on this site show sample data.</p>
  </div>
</footer>'''

FAV = "data:image/svg+xml," + "%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 150 150'%3E%3Crect width='150' height='150' rx='28' fill='%232A3C5E'/%3E%3Cpath fill='%23FCF9EB' fill-rule='evenodd' d='" + CURL.replace(' ', '%20') + "'/%3E%3C/svg%3E"

def page(meta, body):
    t = meta['title']; desc = meta['desc']; nav = meta.get('nav', '')
    full = t if t.startswith('Qualigraf') else f'{t} | Qualigraf UK'
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
<meta name="theme-color" content="#FEFAEB">
<link rel="icon" href="{FAV}">
<link rel="preload" href="assets/fonts/source-serif-4-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="assets/fonts/source-sans-3-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="assets/site.css">
<script>document.documentElement.className+=' js';</script>
</head>
<body>
{header(nav)}
<main id="main">
{body}
</main>
{FOOTER}
<script src="assets/site.js" defer></script>
</body>
</html>
'''

CLOSE = open(os.path.join(HERE, 'close.html')).read() if os.path.exists(os.path.join(HERE, 'close.html')) else ''

def fill(body):
    body = body.replace('{{TRACK}}', TRACK).replace('{{CLOSE}}', CLOSE).replace('{{AR}}', AR).replace('{{BOOK}}', BOOK)
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
