#!/usr/bin/env python3
"""Systemhaus-Hertling site. Assembles build/pages/*.html into ../site/.

Each page source starts with <!--{"title": "[[DE||EN]]", "desc": "[[DE||EN]]", "nav": "key", "path": "out/path.html"}-->.
Copy is bilingual inline, [[Deutsch||English]]. Inline text becomes two spans, text holding block tags becomes two
divs, attr="[[..||..]]" becomes the German attribute plus data-en-attr for the English, and
<option>[[..||..]]</option> carries its English in data-en. German is the default and the no-JS state, site.js swaps.
"""
import glob
import hashlib
import html
import json
import os
import re
import shutil

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, '..', 'site')
OUT2 = os.path.join(HERE, '..', 'site-presence')  # Astra's note to Noah, deployed on its own so it never sits inside his site

PHONE = '0152 27441804'
TEL = '+4915227441804'
MAIL = 'info@systemhaus-hertling.com'
ADDR = 'Birkenweg 18, 21465 Reinbek'
MAPS = 'https://www.google.com/maps/search/?api=1&query=Systemhaus-Hertling+UG+Birkenweg+18+21465+Reinbek'

TOK = re.compile(r'\[\[(.*?)\|\|(.*?)\]\]', re.S)
BLOCK = re.compile(r'<(p|div|ul|ol|li|h[1-6]|section|figure|table|br)\b')

NAV = [('start', '/', 'Start', 'Home'),
       ('leistungen', '/leistungen/', 'Leistungen', 'Services'),
       ('check', '/selbsttest/', 'Selbsttest', 'Self check'),
       ('ueber', '/ueber-uns/', 'Über uns', 'About'),
       ('kontakt', '/kontakt/', 'Kontakt', 'Contact')]


def L(de, en):
    return f'[[{de}||{en}]]'


def mark(cls='mark', title=None):
    """His logo, traced from Logo_Systemhaus-Hertling_Klein-Final.png. Two pillars and the band, separately addressable."""
    svg = open(os.path.join(HERE, 'assets', 'mark.svg')).read()
    lab = f' role="img" aria-label="{title}"' if title else ' aria-hidden="true"'
    # every copy gets its own gradient ids, so hiding one copy never strips the colour off the others
    mark.n = getattr(mark, 'n', 0) + 1
    for gid in re.findall(r'id="([^"]+)"', svg):
        svg = svg.replace(f'id="{gid}"', f'id="{gid}-{mark.n}"').replace(f'url(#{gid})', f'url(#{gid}-{mark.n})')
    return svg.replace('<svg ', f'<svg class="{cls}"{lab} focusable="false" ', 1)


def wlan():
    """The WLAN planner, drawn from data/floor.json so the plan and the signal model share one source."""
    f = json.load(open(os.path.join(HERE, 'data', 'floor.json')))
    W, H = f['w'], f['h']
    walls = ''.join(f'<line class="w{min(int(w[4]), 12)}" x1="{w[0]*10}" y1="{w[1]*10}" x2="{w[2]*10}" y2="{w[3]*10}"/>' for w in f['walls'])
    rooms = ''.join(f'<span class="wl-room" style="left:{r.get("at", [r["r"][0]+r["r"][2]/2])[0]/W*100:.2f}%;top:{r.get("at", [0, r["r"][1]+r["r"][3]/2])[1]/H*100:.2f}%">{L(r["de"], r["en"].removeprefix("the ")[:1].upper() + r["en"].removeprefix("the ")[1:])}</span>' for r in f['rooms'])
    ap = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="11"/><path d="M7 12.5a5 5 0 0 1 10 0M9.5 13a2.5 2.5 0 0 1 5 0"/><circle cx="12" cy="15.5" r="1.4"/></svg>'
    data = json.dumps({'w': W, 'h': H, 'aps': f['aps'], 'walls': f['walls'], 'rooms': f['rooms']}, ensure_ascii=False).replace('[[', '[ [').replace(']]', '] ]')  # never a bilingual token
    return f'''<div class="wl" data-wlan>
<span class="ex-tag ex-top">{L(f'Beispielbüro, {W} mal {H} Meter', f'Example office, {W} by {H} metres')}</span>
<script type="application/json">{data}</script>
<div class="wl-stage" style="aspect-ratio:{W}/{H}">
<canvas aria-hidden="true"></canvas>
<svg class="wl-plan" viewBox="0 0 {W*10} {H*10}" aria-hidden="true" focusable="false"><rect class="wo" x="1" y="1" width="{W*10-2}" height="{H*10-2}" rx="3"/>{walls}</svg>
{rooms}
<button type="button" class="wl-ap" aria-label="{L('Access Point verschieben, mit den Pfeiltasten', 'Move the access point with the arrow keys')}">{ap}</button>
<button type="button" class="wl-ap wl-ap2" hidden aria-label="{L('Zweiten Access Point verschieben', 'Move the second access point')}">{ap}</button>
</div>
<div class="wl-read" aria-live="polite"><div><b data-wl-good>51 %</b><span>{L('der Fläche mit gutem Empfang', 'of the floor with a good signal')}</span></div><div class="wl-rooms" data-wl-rooms></div><button type="button" class="btn sec wl-add" data-wl-add aria-pressed="false">{L('Zweiten Access Point setzen', 'Add a second access point')}</button></div>
<ul class="wl-key"><li><i class="s1"></i>{L('stark', 'strong')}</li><li><i class="s2"></i>{L('gut', 'good')}</li><li><i class="s3"></i>{L('schwach', 'weak')}</li><li><i class="s4"></i>{L('kaum', 'barely')}</li></ul>
</div>'''


def cal():
    """September 2026, Monday first. A nightly backup every day, one restore test, one failed night fixed next morning."""
    import calendar
    first, days = calendar.monthrange(2026, 9)
    heads = ''.join(f'<span class="cal-d">{L(de, en)}</span>' for de, en in [('Mo', 'Mon'), ('Di', 'Tue'), ('Mi', 'Wed'), ('Do', 'Thu'), ('Fr', 'Fri'), ('Sa', 'Sat'), ('So', 'Sun')])
    cells = '<i class="c-pad"></i>' * first
    for d in range(1, days + 1):
        cls = 'c-test' if d == 4 else 'c-fail' if d == 17 else 'c-ok'
        cells += f'<i class="{cls}" style="--d:{d}"><span>{d}</span></i>'
    return heads + cells


PORTS = [('t', 'Firewall', 'Firewall', 'Technik', 'tech room'), ('t', 'NAS für Backups', 'Backup NAS', 'Technik', 'tech room'),
         ('t', 'Access Point 1', 'Access point 1', 'Großraum, Mitte', 'open office, centre'),
         ('t', 'Access Point 2', 'Access point 2', 'Archiv', 'archive'),
         ('b', 'Drucker, feste Adresse', 'Printer, fixed address', 'Empfang', 'reception'),
         ('b', 'Arbeitsplatz Empfang', 'Reception workstation', 'Empfang', 'reception'),
         ('b', 'Arbeitsplatz Chefbüro', 'Corner office workstation', 'Chefbüro', 'corner office')] + \
        [('b', f'Arbeitsplatz {n}', f'Workstation {n}', 'Großraum', 'open office') for n in range(1, 11)] + \
        [('b', 'Bildschirm Besprechung', 'Meeting room screen', 'Besprechung', 'meeting room')]


def ports():
    """A 24 port switch, odd ports on top like the real thing. 18 in use, every one labelled."""
    out = []
    for n in list(range(1, 25, 2)) + list(range(2, 25, 2)):
        if n <= len(PORTS):
            g, de, en, rde, ren = PORTS[n - 1]
            lab = L(f'Port {n}, {de}, {rde}', f'Port {n}, {en}, {ren}')
            out.append(f'<button type="button" class="sw-p sw-{g}" data-port="{n}" aria-label="{lab}" tabindex="{0 if n == 3 else -1}"><span>{n}</span></button>')
        else:
            out.append(f'<span class="sw-p sw-free" aria-hidden="true"><span>{n}</span></span>')
    return ''.join(out)


def termin(page):
    """The one booking form, on the home page and on Kontakt. As few fields as a first call needs."""
    opt = '<span class="fm-opt">optional</span>'
    mail = f'<a href="mailto:{MAIL}" data-form-mailto>{MAIL}</a>'
    tel = f'<a href="tel:{TEL}">{PHONE}</a>'
    t = {
        'name': L('Name', 'Name'),
        'name_e': L('Bitte geben Sie Ihren Namen an.', 'Please add your name.'),
        'firma': L('Firma ' + opt, 'Company ' + opt),
        'kontakt': L('Telefon oder Mailadresse', 'Phone or email'),
        'kontakt_e': L('Bitte geben Sie eine Telefonnummer oder eine Mailadresse an, damit wir Sie erreichen.', 'Please add a phone number or an email so we can reach you.'),
        'zeit': L('Wann passt ein Rückruf am besten?', 'When suits a call back best?'),
        'vm': L('Vormittags', 'Mornings'), 'nm': L('Nachmittags', 'Afternoons'), 'eg': L('Egal', 'Any time'),
        'msg': L('Worum geht es? ' + opt, "What's it about? " + opt),
        'go': L('Kennenlerngespräch anfragen', 'Request a first conversation'),
        'note': L('Noah Hertling meldet sich persönlich. Ihre Angaben werden nur dafür genutzt, mehr im <a href="/datenschutz/">Datenschutz</a>.',
                  'Noah Hertling gets back to you himself. Your details are only used for that, more in the <a href="/datenschutz/">privacy notice</a>.'),
        'fail': L(f'Das hat gerade nicht geklappt. Schreiben Sie bitte direkt an {mail} oder rufen Sie an unter {tel}.',
                  f"That didn't go through just now. Please write to {mail} directly or call {tel}."),
        'ok_h': L('Danke, Ihre Anfrage ist angekommen.', 'Thanks, your request has arrived.'),
        'ok_p': L(f'Noah Hertling meldet sich persönlich bei Ihnen. Wenn es eilt, rufen Sie an unter {tel}.',
                  f"Noah Hertling will get back to you himself. If it's urgent, call {tel}."),
    }
    return f"""<form class="fm" name="termin" method="POST" action="/kontakt/danke/" data-netlify="true" netlify-honeypot="website" data-form novalidate>
  <input type="hidden" name="form-name" value="termin">
  <input type="hidden" name="sprache" value="de" data-form-lang>
  <input type="hidden" name="seite" value="{page}">
  <div class="fm-row">
    <div class="fm-f"><label for="f-name">{t['name']}</label><input id="f-name" name="name" type="text" autocomplete="name" required aria-describedby="e-name"><p class="fm-e" id="e-name" data-err="name">{t['name_e']}</p></div>
    <div class="fm-f"><label for="f-firma">{t['firma']}</label><input id="f-firma" name="firma" type="text" autocomplete="organization"></div>
  </div>
  <div class="fm-f"><label for="f-kontakt">{t['kontakt']}</label><input id="f-kontakt" name="kontakt" type="text" autocomplete="tel" required aria-describedby="e-kontakt"><p class="fm-e" id="e-kontakt" data-err="kontakt">{t['kontakt_e']}</p></div>
  <fieldset class="fm-topic">
    <legend>{t['zeit']}</legend>
    <div class="fm-chips">
      <label><input type="radio" name="zeit" value="Vormittags"><span>{t['vm']}</span></label>
      <label><input type="radio" name="zeit" value="Nachmittags"><span>{t['nm']}</span></label>
      <label><input type="radio" name="zeit" value="Egal" checked><span>{t['eg']}</span></label>
    </div>
  </fieldset>
  <div class="fm-f"><label for="f-msg">{t['msg']}</label><textarea id="f-msg" name="anliegen" rows="3"></textarea></div>
  <p class="fm-hp" aria-hidden="true"><label>Website <input name="website" tabindex="-1" autocomplete="off"></label></p>
  <button class="btn pri btn-lg fm-go" type="submit">{t['go']}</button>
  <p class="fm-note">{t['note']}</p>
  <p class="fm-fail" data-form-fail hidden>{t['fail']}</p>
</form>
<div class="fm-ok" data-form-ok hidden tabindex="-1">
  <svg class="fm-ok-i" viewBox="0 0 48 48" aria-hidden="true" focusable="false"><circle cx="24" cy="24" r="22"/><path d="M14 25l7 7 13-15"/></svg>
  <h3>{t['ok_h']}</h3>
  <p>{t['ok_p']}</p>
</div>"""


def fig(key):
    """A licensed photo for a service, from data/figs.json. No entry, no figure. Never captioned as the client's."""
    path = os.path.join(HERE, 'data', 'figs.json')
    figs = json.load(open(path)) if os.path.exists(path) else {}
    f = figs.get(key)
    if not f:
        return ''
    return (f'<figure class="sv-fig"><img src="/media/{f["file"]}" width="{f["w"]}" height="{f["h"]}" loading="lazy" decoding="async" '
            f'alt="{L(f["alt_de"], f["alt_en"])}"></figure>')


def i18n(src):
    def attr(m):
        de, en = m.group(2), m.group(3)
        return f'{m.group(1)}="{de}" data-en-{m.group(1)}="{html.escape(en, quote=True)}"'
    src = re.sub(r'([\w-]+)="\[\[(.*?)\|\|(.*?)\]\]"', attr, src, flags=re.S)

    def opt(m):
        return f'<option{m.group(1)} data-en="{html.escape(m.group(3), quote=True)}">{m.group(2)}</option>'
    src = re.sub(r'<option([^>]*)>\[\[(.*?)\|\|(.*?)\]\]</option>', opt, src, flags=re.S)

    def text(m):
        de, en = m.group(1), m.group(2)
        tag = 'div' if (BLOCK.search(de) or BLOCK.search(en)) else 'span'
        return f'<{tag} class="l-de">{de}</{tag}><{tag} class="l-en" lang="en">{en}</{tag}>'
    prev = None
    while prev != src:
        prev = src
        src = TOK.sub(text, src)
    return src


def split(s):
    m = TOK.fullmatch(s.strip())
    return (m.group(1), m.group(2)) if m else (s, s)


def header(nav):
    links = ''.join(
        f'<a href="{href}"{" aria-current=\"page\"" if key == nav else ""}>{L(de, en)}</a>' for key, href, de, en in NAV)
    return f'''<a class="skip" href="#main">{L('Zum Inhalt', 'Skip to content')}</a>
<header class="top" data-top>
  <a class="brand" href="/" aria-label="Systemhaus-Hertling, Start">{mark('brand-mark')}<span>Systemhaus<span class="brand-dash">-</span>Hertling</span></a>
  <nav class="nav" aria-label="{L('Hauptnavigation', 'Main')}">{links}</nav>
  <div class="top-r">
    <a class="live" data-live href="tel:{TEL}"><i aria-hidden="true"></i><span data-live-t>{L('Montag bis Freitag, 8 bis 18 Uhr', 'Monday to Friday, 8am to 6pm')}</span></a>
    <a class="btn pri top-cta" href="{'#termin' if nav == 'start' else '/kontakt/'}">{L('Termin vereinbaren', 'Book a call')}</a>
    <div class="lang" role="group" aria-label="{L('Sprache', 'Language')}"><button type="button" data-lang="de" aria-pressed="true">DE</button><button type="button" data-lang="en" aria-pressed="false">EN</button></div>
    <button class="menu-b" type="button" aria-expanded="false" aria-controls="menu">{L('Menü', 'Menu')}</button>
  </div>
</header>
<div class="menu" id="menu" hidden>
  <nav aria-label="{L('Menü', 'Menu')}">{links}</nav>
  <a class="menu-call" href="tel:{TEL}">{PHONE}</a>
</div>'''


def bar():
    """The slim bar for Astra's own note to Noah, so it never reads as one of his pages."""
    return f'''<a class="skip" href="#main">Skip to content</a>
<header class="sk-bar" lang="en">
  <a class="sk-b" href="https://astra-hertling-prototype.netlify.app/">{mark('sk-mark')}<span>Sketch for Systemhaus<span class="brand-dash">-</span>Hertling</span></a>
  <span class="sk-by">by Astra</span>
  <div class="lang" role="group" aria-label="Language of the sample posts"><button type="button" data-lang="de" aria-pressed="true">DE</button><button type="button" data-lang="en" aria-pressed="false">EN</button></div>
</header>'''


def footer():
    return f'''<footer class="foot">
  <div class="foot-in">
    <div class="foot-brand">{mark('foot-mark')}<p>Systemhaus<span class="brand-dash">-</span>Hertling UG (haftungsbeschränkt)<br>{L('Betreuung von Netzwerken, Servern und Arbeitsplätzen für kleine und mittlere Unternehmen in Hamburg und Umgebung.', 'IT care for networks, servers and workstations at small and mid sized businesses in Hamburg and around.')}</p></div>
    <div><h2 class="fh">{L('Kontakt', 'Contact')}</h2><p><a href="tel:{TEL}">{PHONE}</a><br><a href="mailto:{MAIL}">{MAIL}</a><br>{ADDR}</p></div>
    <div><h2 class="fh">{L('Erreichbar', 'Hours')}</h2><p>{L('Montag bis Freitag', 'Monday to Friday')}<br>{L('8 bis 18 Uhr', '8am to 6pm')}<br>{L('Vor Ort in Hamburg und Umgebung, per Fernwartung deutschlandweit', 'On site across Hamburg and around, remotely anywhere in Germany')}</p></div>
    <div><h2 class="fh">{L('Seiten', 'Pages')}</h2><p><a href="/leistungen/">{L('Leistungen', 'Services')}</a><br><a href="/selbsttest/">{L('Selbsttest', 'Self check')}</a><br><a href="/ueber-uns/">{L('Über uns', 'About')}</a><br><a href="/kontakt/">{L('Kontakt', 'Contact')}</a></p></div>
  </div>
  <div class="foot-b"><span>© 2026 Systemhaus<span class="brand-dash">-</span>Hertling UG (haftungsbeschränkt)</span><span><a href="/impressum/">Impressum</a> <a href="/datenschutz/">{L('Datenschutz', 'Privacy')}</a></span>
  <span class="note">{L('Netzwerkpläne, Protokolle und Auswertungen auf dieser Website zeigen Beispieldaten.', 'Network plans, logs and results on this site show example data.')}</span></div>
</footer>'''


def page(meta, body, assets):
    t_de, t_en = split(meta['title'])
    d_de, d_en = split(meta['desc'])
    css = ''.join(f'<link rel="stylesheet" href="/assets/{c}?v={assets[c]}">' for c in meta.get('css', ['site.css']))
    js = ''.join(f'<script src="/assets/{j}?v={assets[j]}" defer></script>' for j in ['site.js'] + meta.get('js', []))
    doc = f'''<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title data-en="{html.escape(t_en, quote=True)}">{t_de}</title>
<meta name="description" content="{html.escape(d_de, quote=True)}" data-en-content="{html.escape(d_en, quote=True)}">
<meta name="robots" content="noindex, nofollow">
<meta name="theme-color" content="#f3f5f7">
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
<link rel="preload" href="/fonts/schibsted-grotesk-normal-latin.woff2" as="font" type="font/woff2" crossorigin>
{css}
<script>document.documentElement.classList.add('js');try{{var l=new URLSearchParams(location.search).get('lang')||localStorage.getItem('sh-lang');if(l==='en'||l==='de')document.documentElement.lang=l}}catch(e){{}}</script>
{js}
</head>
<body class="{meta.get('body', '')}">
{bar() if meta.get('bare') else header(meta.get('nav'))}
<main id="main">
{body}
</main>
{'' if meta.get('bare') else footer()}
</body>
</html>
'''
    doc = doc.replace('Systemhaus<span class="brand-dash">-</span>Hertling', '<span class="nm">Systemhaus<span class="brand-dash">-</span>Hertling</span>')
    return i18n(doc)


def build():
    for d in (OUT, OUT2):
        if os.path.isdir(d):
            shutil.rmtree(d)
    os.makedirs(os.path.join(OUT, 'assets'))
    shutil.copytree(os.path.join(HERE, 'fonts'), os.path.join(OUT, 'fonts'), ignore=shutil.ignore_patterns('g.css'))
    assets = {}
    for f in sorted(glob.glob(os.path.join(HERE, 'assets', '*'))):
        name = os.path.basename(f)
        if name in ('mark.svg', 'mark-trace.svg', 'logo-final.png') or os.path.isdir(f):
            continue
        shutil.copy(f, os.path.join(OUT, 'assets', name))
        assets[name] = hashlib.sha1(open(f, 'rb').read()).hexdigest()[:8]
    for f in ['site.css', 'site.js', 'wlan.js', 'check.js', 'scene.js', 'form.js']:
        p = os.path.join(HERE, f)
        if os.path.exists(p):
            shutil.copy(p, os.path.join(OUT, 'assets', f))
            assets[f] = hashlib.sha1(open(p, 'rb').read()).hexdigest()[:8]
    media = os.path.join(HERE, 'media')
    if os.path.isdir(media):
        shutil.copytree(media, os.path.join(OUT, 'media'))
    for src in sorted(glob.glob(os.path.join(HERE, 'pages', '*.html'))):
        raw = open(src).read()
        m = re.match(r'<!--(.*?)-->\s*', raw, re.S)
        meta = json.loads(m.group(1))
        body = raw[m.end():]
        for k, v in {'{{PHONE}}': PHONE, '{{TEL}}': TEL, '{{MAIL}}': MAIL, '{{ADDR}}': ADDR, '{{MAPS}}': MAPS}.items():
            body = body.replace(k, v)
        body = re.sub(r'\{\{MARK(?: ([\w-]+))?\}\}', lambda mm: mark(mm.group(1) or 'mark'), body)
        body = body.replace('{{WLAN}}', wlan())
        body = body.replace('{{CAL}}', cal())
        body = body.replace('{{PORTS}}', ports())
        body = re.sub(r'\{\{TERMIN (\w+)\}\}', lambda mm: termin(mm.group(1)), body)
        body = re.sub(r'\{\{FIG (\w+)\}\}', lambda mm: fig(mm.group(1)), body)
        for inc in re.findall(r'\{\{INC ([\w./-]+)\}\}', body):
            body = body.replace('{{INC ' + inc + '}}', open(os.path.join(HERE, inc)).read())
        out = os.path.join(OUT2 if meta.get('bare') else OUT, meta['path'])
        os.makedirs(os.path.dirname(out), exist_ok=True)
        open(out, 'w').write(page(meta, body, assets))
        print('wrote', meta['path'], os.path.getsize(out))
    # the presence site carries only what its one page uses
    os.makedirs(os.path.join(OUT2, 'media'), exist_ok=True)
    shutil.copytree(os.path.join(OUT, 'assets'), os.path.join(OUT2, 'assets'))
    shutil.copytree(os.path.join(OUT, 'fonts'), os.path.join(OUT2, 'fonts'))
    shutil.copytree(os.path.join(OUT, 'media', 'presence'), os.path.join(OUT2, 'media', 'presence'))
    shutil.rmtree(os.path.join(OUT, 'media', 'presence'))
    for d in (OUT, OUT2):
        open(os.path.join(d, 'netlify.toml'), 'w').write(
            '[[headers]]\n  for = "/*"\n  [headers.values]\n    X-Robots-Tag = "noindex, nofollow"\n')
    return
    open(os.path.join(OUT, 'netlify.toml'), 'w').write(
        '[[headers]]\n  for = "/*"\n  [headers.values]\n    X-Robots-Tag = "noindex, nofollow"\n')


if __name__ == '__main__':
    build()
