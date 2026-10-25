#!/usr/bin/env python3
"""BeBetter site, the line and custom kit for gyms. Assembles build/pages/*.html into ../site/ (and ../site-plan/).

Each page source starts with <!--{"title": "[[EN||NL]]", "desc": "[[EN||NL]]", "nav": "key", "path": "out/path.html"}-->.
Copy is bilingual inline, [[English||Nederlands]]. Inline text becomes two spans, text holding block tags becomes two
divs, attr="[[..||..]]" becomes the English attribute plus data-nl-attr, and <option>[[..||..]]</option> carries its
Dutch in data-nl. English is the default and the no-JS state, site.js swaps. Pages with "bare": true go to ../site-plan/,
Astra's growth plan, so Astra's voice never sits inside their site.
"""
import glob
import hashlib
import html
import json
import os
import re
import shutil

import garment

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, '..', 'site')
OUT2 = os.path.join(HERE, '..', 'site-plan')
FACTS = json.load(open(os.path.join(HERE, 'data', 'facts.json')))
MAIL = FACTS['mail']
COMMUNITY = FACTS['community']
SHOP = FACTS['shop']

TOK = re.compile(r'\[\[(.*?)\|\|(.*?)\]\]', re.S)
BLOCK = re.compile(r'<(p|div|ul|ol|li|h[1-6]|section|figure|table|br)\b')
PLUS = '<svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M3 8h10M8 3v10" stroke="currentColor" stroke-width="2.2" stroke-linecap="square"/></svg>'
MINUS = '<svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M3 8h10" stroke="currentColor" stroke-width="2.2" stroke-linecap="square"/></svg>'

NAV = [('line', '/#line', 'The line', 'De collectie'),
       ('gyms', '/gyms/', 'For gyms', 'Voor gyms'),
       ('drop', '/#drop', 'Drop 27.10', 'Drop 27.10')]


def L(en, nl):
    return f'[[{en}||{nl}]]'


def svg(name, cls='', title=None):
    s = open(os.path.join(HERE, 'assets', name)).read()
    lab = f' role="img" aria-label="{title}"' if title else ' aria-hidden="true"'
    return re.sub(r'<svg\b', f'<svg class="{cls}"{lab} focusable="false"', s, count=1)


# ---------------------------------------------------------------- the kit, one state for the whole page
GARMENTS = {'black': ['Washed black', 'Washed zwart', '#242321'], 'grey': ['Washed grey', 'Washed grijs', '#57554f'],
            'navy': ['Navy', 'Navy', '#1e2739'], 'bone': ['Ecru', 'Ecru', '#e3dccd']}
INKS = {'sand': ['Sand', 'Zand', '#d9b98a'], 'white': ['Off white', 'Gebroken wit', '#f0ece3'], 'royal': ['Royal blue', 'Koningsblauw', '#2f55e0'],
        'red': ['Red', 'Rood', '#c9382b'], 'black': ['Black', 'Zwart', '#141312']}
STYLES = {'college': ['College', 'College', 'Graduate'], 'gothic': ['Gothic', 'Gothic', 'Pirata One'], 'block': ['Block', 'Block', 'Anton']}
EMBLEMS = {'crest': ['Crest with your initials', 'Embleem met je initialen'], 'teddy': ['Our teddy', 'Onze teddy'],
           'logo': ['Your logo', 'Je eigen logo'], 'none': ['Just the name', 'Alleen de naam']}
PIECES = {'tee': ['Oversized tee', 'Oversized tee'], 'hood': ['Hoodie', 'Hoodie']}
SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
RUN = {'tee': [0, 6, 12, 12, 8, 2], 'hood': [0, 4, 8, 8, 4, 0]}


def kit_data():
    d = {'garments': GARMENTS, 'inks': INKS, 'styles': STYLES, 'emblems': EMBLEMS, 'pieces': PIECES, 'sizes': SIZES,
         'run': RUN, 'mail': MAIL}
    return f'<script type="application/json" id="bb-kit-data">{re.sub(r"([\[\]])(?=[\[\]])", r"\1 ", json.dumps(d, ensure_ascii=False))}</script>'


def swatch(name, value, en, nl, colour, checked, kind):
    return (f'<label class="sw sw-{kind}"><input type="radio" name="{name}" value="{value}"{" checked" if checked else ""}>'
            f'<span class="sw-c" style="--c:{colour}"></span><span class="sw-l">{L(en, nl)}</span></label>')


def hero_field():
    return f"""<div class="hf">
  <label class="hf-l" for="k-name">{L("Your gym's name", "De naam van je gym")}</label>
  <div class="hf-row">
    <input id="k-name" class="hf-in" type="text" maxlength="22" autocomplete="organization" spellcheck="false" placeholder="{L('Type it here', 'Typ hem hier')}" data-k="name">
    <a class="btn hf-go" href="#studio">{L("Make it yours", "Maak hem af")}</a>
  </div>
</div>"""


def studio():
    pieces = ''.join(f'<label class="pc"><input type="checkbox" name="k-piece" value="{k}"{" checked" if k == "tee" else ""}><span class="pc-b">{garment.use(k + "-back", "pc-g")}</span><span class="pc-l">{L(*v)}</span></label>' for k, v in PIECES.items())
    garms = ''.join(swatch('k-garment', k, v[0], v[1], v[2], k == 'black', 'g') for k, v in GARMENTS.items())
    inks = ''.join(swatch('k-ink', k, v[0], v[1], v[2], k == 'sand', 'i') for k, v in INKS.items())
    styles = ''.join(f'<label class="ps"><input type="radio" name="k-style" value="{k}"{" checked" if k == "college" else ""}><span class="ps-w" style="font-family:\'{v[2]}\'" data-k-word>YOUR GYM</span><span class="ps-l">{L(v[0], v[1])}</span></label>' for k, v in STYLES.items())
    ems = ''
    for k, v in EMBLEMS.items():
        ems += f'<label class="em-o"><input type="radio" name="k-emblem" value="{k}"{" checked" if k == "crest" else ""}><span>{L(*v)}</span></label>'
    return f"""<div class="st-g">
  <div class="st-view">
    <div class="st-tabs" role="group" aria-label="{L('Which piece to look at', 'Welk stuk je bekijkt')}" data-k-tabs></div>
    <div class="st-stage" data-k-stage>
      <div class="gw">{garment.use('tee-back', 'st-garment', 'The kit, as you build it')}<span class="sq" data-sq aria-hidden="true"></span></div>
    </div>
    <button type="button" class="st-flip" data-k-flip aria-pressed="false"><span class="l-side" data-k-side>{L('Show the front', 'Bekijk de voorkant')}</span></button>
  </div>
  <div class="st-ctl">
    <fieldset class="cg"><legend>{L('Which pieces', 'Welke stukken')}</legend><div class="pcs">{pieces}</div></fieldset>
    <fieldset class="cg"><legend>{L('Garment colour', 'Kleur van het stuk')}</legend><div class="sws">{garms}</div></fieldset>
    <fieldset class="cg"><legend>{L('Lettering', 'Letters')}</legend><div class="pss">{styles}</div></fieldset>
    <fieldset class="cg"><legend>{L('Print colour', 'Kleur van de print')}</legend><div class="sws">{inks}</div></fieldset>
    <fieldset class="cg"><legend>{L('In the middle', 'In het midden')}</legend><div class="ems">{ems}</div>
      <div class="up" data-k-up hidden>
        <label class="up-b" for="k-logo"><span>{L('Choose your logo', 'Kies je logo')}</span><small>{L('PNG, JPG or SVG, up to 5 MB', 'PNG, JPG of SVG, tot 5 MB')}</small></label>
        <input id="k-logo" type="file" accept="image/png,image/jpeg,image/svg+xml,image/webp" data-k-logo>
        <p class="up-n" data-k-logo-name aria-live="polite"></p>
      </div>
    </fieldset>
    <div class="cg cg-t">
      <label for="k-motto">{L('Motto', 'Motto')} <small>{L('optional', 'mag leeg')}</small></label><input id="k-motto" type="text" maxlength="28" data-k="motto" placeholder="{L('Under the emblem', 'Onder het embleem')}">
      <label for="k-city">{L('City', 'Stad')} <small>{L('optional', 'mag leeg')}</small></label><input id="k-city" type="text" maxlength="16" data-k="city" autocomplete="address-level2">
      <label for="k-year">{L('Since', 'Sinds')} <small>{L('optional', 'mag leeg')}</small></label><input id="k-year" type="text" inputmode="numeric" maxlength="4" pattern="[0-9]{{4}}" data-k="year" placeholder="2019">
    </div>
  </div>
</div>"""


def sizerun():
    groups = ''
    for k, v in PIECES.items():
        bars = ''
        for i, s in enumerate(SIZES):
            n = RUN[k][i]
            bars += (f'<div class="sb" data-size="{s}"><b class="sb-n" data-sb-n>{n}</b>'
                     f'<div class="sb-t" role="slider" tabindex="0" aria-valuemin="0" aria-valuemax="300" aria-valuenow="{n}" aria-label="{L(v[0] + ' ' + s, v[1] + ' ' + s)}" data-sb style="--v:{min(1, n / 40):.3f}"><i></i></div>'
                     f'<span class="sb-s">{s}</span>'
                     f'<span class="sb-pm"><button type="button" data-sb-step="-1" aria-label="{L("One less " + s, "Eén minder " + s)}">{MINUS}</button><button type="button" data-sb-step="1" aria-label="{L("One more " + s, "Eén meer " + s)}">{PLUS}</button></span></div>')
        groups += f"""<div class="sr-g" data-sr="{k}"{'' if k == 'tee' else ' hidden'}>
  <p class="sr-h"><span>{L(*v)}</span><b data-sr-tot>{sum(RUN[k])}</b></p>
  <div class="sr-bars">{bars}</div>
</div>"""
    return f"""<div class="szr">
  {groups}
  <p class="sr-note">{L('These numbers are only an example. Set them to what your members wear.', 'Deze aantallen zijn maar een voorbeeld. Zet ze op wat je leden dragen.')}</p>
</div>
<div class="rack" data-rack aria-hidden="true"><div class="rack-bar"></div><div class="rack-in" data-rack-in></div></div>
<p class="rack-tot"><b data-k-total>{sum(RUN['tee'])}</b> <span data-k-total-w>{L('pieces on the rail', 'stuks aan het rek')}</span></p>"""


def order():
    rows = [('gym', 'Gym', 'Gym', 'YOUR GYM'), ('city', 'City', 'Stad', '·'), ('year', 'Since', 'Sinds', '·'),
            ('pieces', 'Pieces', 'Stukken', 'Oversized tee'), ('garment', 'Garment', 'Stof', 'Washed black'),
            ('style', 'Lettering', 'Letters', 'College'), ('ink', 'Print', 'Print', 'Sand'),
            ('emblem', 'Middle', 'Midden', 'Crest with your initials'), ('motto', 'Motto', 'Motto', '·')]
    li = ''.join(f'<div class="wo-r"><dt>{L(a, b)}</dt><dd data-wo="{k}">{v}</dd></div>' for k, a, b, v in rows)
    sz = ''.join(f'<th scope="col">{s}</th>' for s in SIZES)
    body = ''
    for k, v in PIECES.items():
        cells = ''.join(f'<td data-wo-n="{k}-{s}">{RUN[k][i]}</td>' for i, s in enumerate(SIZES))
        body += f'<tr data-wo-row="{k}"{"" if k == "tee" else " hidden"}><th scope="row">{L(*v)}</th>{cells}<td class="wo-t" data-wo-t="{k}">{sum(RUN[k])}</td></tr>'
    return f"""<div class="wo" data-wo-sheet>
  <div class="wo-top">
    {svg('wordmark.svg', 'wo-mark', 'BeBetter')}
    <p class="wo-k">{L('Kit request', 'Kit aanvraag')}<span data-wo-date></span></p>
  </div>
  <div class="wo-flats" data-wo-flats>
    <figure>{garment.use('tee-back', 'wo-g')}<figcaption>{L('Back', 'Achter')}</figcaption></figure>
    <figure>{garment.use('tee-front', 'wo-g')}<figcaption>{L('Front', 'Voor')}</figcaption></figure>
  </div>
  <dl class="wo-l">{li}</dl>
  <table class="wo-sz"><caption class="sr">{L('Sizes', 'Maten')}</caption><thead><tr><th scope="col"><span class="sr">{L('Piece', 'Stuk')}</span></th>{sz}<th scope="col">{L('Total', 'Totaal')}</th></tr></thead><tbody>{body}</tbody>
  <tfoot><tr><th scope="row" colspan="{len(SIZES) + 1}">{L('All together', 'Alles samen')}</th><td class="wo-t" data-wo-total>{sum(RUN['tee'])}</td></tr></tfoot></table>
  <p class="wo-logo" data-wo-logo hidden>{L('Logo attached', 'Logo bijgevoegd')} <span data-wo-logo-name></span></p>
  <div class="wo-stamp" aria-hidden="true">{L('Received', 'Ontvangen')}</div>
</div>"""


def kitform():
    opt = f' <small>{L("optional", "mag leeg")}</small>'
    mail = f'<a href="mailto:{MAIL}" data-form-mailto>{MAIL}</a>'
    return f"""<div class="stub" data-stub><p><span>{L('Your kit', 'Je kit')}</span><b data-stub-t>YOUR GYM · Oversized tee · 40</b></p><a href="#studio">{L('Change it', 'Aanpassen')}</a></div>
<form class="fm" name="kit" method="POST" action="/gyms/sent/" enctype="multipart/form-data" data-netlify="true" netlify-honeypot="website" data-form novalidate>
  <input type="hidden" name="form-name" value="kit">
  <input type="hidden" name="language" value="en" data-form-lang>
  <input type="hidden" name="kit" value="" data-form-kit>
  <div class="fm-row">
    <div class="fm-f"><label for="f-gym">{L('Gym', 'Gym')}</label><input id="f-gym" name="gym" type="text" autocomplete="organization" required aria-describedby="e-gym" data-form-gym><p class="fm-e" id="e-gym" data-err="gym">{L("Add your gym's name.", 'Vul de naam van je gym in.')}</p></div>
    <div class="fm-f"><label for="f-name">{L('Your name', 'Je naam')}</label><input id="f-name" name="name" type="text" autocomplete="name" required aria-describedby="e-name"><p class="fm-e" id="e-name" data-err="name">{L('Add your name.', 'Vul je naam in.')}</p></div>
  </div>
  <div class="fm-row">
    <div class="fm-f"><label for="f-mail">{L('Email', 'Mail')}</label><input id="f-mail" name="email" type="email" autocomplete="email" required aria-describedby="e-mail"><p class="fm-e" id="e-mail" data-err="email">{L('An email we can send your design to.', 'Een mailadres waar we je ontwerp naartoe kunnen sturen.')}</p></div>
    <div class="fm-f"><label for="f-phone">{L('Phone', 'Telefoon')}{opt}</label><input id="f-phone" name="phone" type="tel" autocomplete="tel"></div>
  </div>
  <div class="fm-row">
    <div class="fm-f"><label for="f-date">{L('Needed by', 'Nodig voor')}{opt}</label><input id="f-date" name="needed_by" type="date"></div>
    <div class="fm-f"><label for="f-ig">{L("Your gym's Instagram or site", 'Instagram of site van je gym')}{opt}</label><input id="f-ig" name="link" type="text" autocomplete="url"></div>
  </div>
  <div class="fm-f fm-file"><label for="f-logo">{L('Logo', 'Logo')}{opt}</label><input id="f-logo" name="logo" type="file" accept="image/png,image/jpeg,image/svg+xml,image/webp" data-form-logo></div>
  <div class="fm-f"><label for="f-msg">{L('Anything else', 'Nog iets')}{opt}</label><textarea id="f-msg" name="message" rows="3" data-form-msg></textarea></div>
  <p class="fm-hp" aria-hidden="true"><label>Website <input name="website" tabindex="-1" autocomplete="off"></label></p>
  <button class="btn btn-lg fm-go" type="submit">{L('Send the kit', 'Kit versturen')}</button>
  <p class="fm-note">{L('We only use this to answer your request. See the <a href="/privacy/">privacy note</a>.', 'We gebruiken dit alleen om je aanvraag te beantwoorden. Zie de <a href="/privacy/">privacyverklaring</a>.')}</p>
  <p class="fm-fail" data-form-fail hidden>{L(f"That didn't go through. Write to us at {mail}, your kit is already in the mail.", f"Dat ging niet goed. Mail ons op {mail}, je kit staat al in de mail.")}</p>
</form>
<div class="ok" data-form-ok hidden tabindex="-1">
  <div class="ok-scene" aria-hidden="true">
    <div class="ok-sheet"><span class="ok-mark">{svg('wordmark.svg', 'ok-wm')}</span><span class="ok-line" data-ok-gym></span><span class="ok-line s"></span><span class="ok-line s"></span><span class="ok-stamp">{L('Received', 'Ontvangen')}</span></div>
    <div class="ok-bag"><span class="ok-handle"></span>{svg('wordmark.svg', 'ok-bwm')}</div>
  </div>
  <h3 class="d3">{L('Got it.', 'Binnen.')} <span data-ok-name></span></h3>
  <p>{L('We\'ll come back to you with your design and a price.', 'We komen bij je terug met je ontwerp en een prijs.')}</p>
</div>"""


def kitbar():
    return f"""<div class="kbar" data-kbar aria-hidden="true" inert>
  <p class="kbar-t"><b data-kbar-gym>YOUR GYM</b><span class="kbar-x"> × BeBetter</span><span class="kbar-n" data-kbar-n>Oversized tee · 40</span></p>
  <a class="btn kbar-go" href="#send">{L('Send the kit', 'Kit versturen')}</a>
</div>"""


def clock():
    """Their first gym kit, sold out in four hours, in their words. A rail of tees empties as the hand runs four hours."""
    tees = ''.join(f'<i style="--i:{i}"><svg class="hg" viewBox="0 0 60 26"><use href="#mini-hanger"/></svg><svg class="tt" viewBox="0 0 60 64"><use href="#mini-tee"/></svg></i>' for i in range(24))
    ticks = ''.join(f'<line x1="0" y1="-92" x2="0" y2="{-80 if h % 3 else -74}" transform="rotate({h * 30})"/>' for h in range(12))
    return f"""<svg class="defs" width="0" height="0" aria-hidden="true" focusable="false"><defs><symbol id="mini-hanger" viewBox="0 0 60 26"><path d="M30 13V8a4 4 0 1 0-4-4M30 13L6 24h48z"/></symbol><symbol id="mini-hood" viewBox="0 0 60 64"><path d="M22 2c2 7 14 7 16 0l12 5 9 40-9 2-5-26v39H15V23l-5 26-9-2 9-40z"/><path class="pr" d="M24 16h12v3H24z"/></symbol><symbol id="mini-tee" viewBox="0 0 60 64"><path d="M21 2c4 3 14 3 18 0l12 4 8 13-9 6-4-3v40H14V22l-4 3-9-6 8-13z"/><path class="pr" d="M24 16h12v3H24z"/></symbol></defs></svg>
<div class="ck-dial" aria-hidden="true"><svg viewBox="-100 -100 200 200"><circle r="96" class="ck-face"/>{ticks}<path class="ck-sweep" data-ck-sweep d="M0 0L0 -96A96 96 0 0 1 0 -96Z"/><line class="ck-h" x1="0" y1="0" x2="0" y2="-58" data-ck-hand/><line class="ck-m" x1="0" y1="0" x2="0" y2="-84" data-ck-min/><circle r="5" class="ck-pin"/></svg><b class="ck-t" data-ck-t>0h</b></div>
    <div class="ck-rail" aria-hidden="true"><span class="ck-bar"></span><div class="ck-tees">{tees}</div></div>
    <div class="ck-q">
      <p class="ck-l ck-1">“Within minutes, they started selling.”</p>
      <p class="ck-l ck-2">“Four hours later…”</p>
      <p class="ck-l ck-3">“Everything was sold out.”</p>
    </div>"""


KITS = [('k-siem', 'Team Siem', 'Washed black, sand print, their goose on the back', 'Washed zwart, zandkleurige print, hun gans op de rug'),
        ('k-ag', 'American Gym Antwerp', 'Gothic lettering, arched, EST and the city beside the emblem', 'Gothic letters in een boog, EST en de stad naast het embleem'),
        ('k-human', 'Human Sports', 'Navy, off white gothic across the shoulders', 'Navy, gebroken witte gothic over de schouders'),
        ('k-summer', 'BeBetter Summer Club', 'Our own embroidery, on ecru', 'Ons eigen borduurwerk, op ecru')]


def rail():
    items = ''
    for name, title, en, nl in KITS:
        items += f'<figure class="kr-i">{img(name, "kr-img", sizes="(max-width: 700px) 86vw, 560px")}<figcaption><b>{title}</b><span>{L(en, nl)}</span></figcaption></figure>'
    return f'<div class="kr" data-kr tabindex="0" role="region" aria-label="{L("Kits we made, drag to see more", "Kits die we maakten, sleep voor meer")}"><div class="kr-in">{items}</div></div>'


# ---------------------------------------------------------------- photos, said plainly. Never who, never "our customers"
ALT = {
    'p-arena': ('Our teddy, arms wide, in the empty hall before the EVLS PRO SHOW in Prague', 'Onze teddy met open armen in de lege hal voor de EVLS PRO SHOW in Praag'),
    'p-pose': ('Our teddy posing in the hall in Prague', 'Onze teddy poseert in de hal in Praag'),
    'p-crowd': ('People going through the rails at our stand', 'Mensen bij de rekken op onze stand'),
    'p-bag': ('A black BeBetter bag handed over at the stand', 'Een zwarte BeBetter tas wordt overhandigd op de stand'),
    'p-builder': ('A Teddy Builder back print, worn at the show', 'Een Teddy Builder print op de rug, gedragen op de beurs'),
    'p-fibo': ('Our FIBO stand, the Teddy Builder tee in front and the teddy on the wall', 'Onze FIBO stand, het Teddy Builder shirt vooraan en de teddy op de muur'),
    'p-wall': ('The teddy wall on our FIBO stand', 'De teddymuur op onze FIBO stand'),
    'p-fibo2': ('Our FIBO stand with the roll up banner', 'Onze FIBO stand met de banner'),
    'p-siggis': ('Our stand at SIGGI\'S in Breda, the banner reads Supporting you to become better 1% everyday', 'Onze stand op SIGGI\'S in Breda, op de banner staat Supporting you to become better 1% everyday'),
    'k-siem': ('The Team Siem kit, front and back', 'De Team Siem kit, voor en achter'),
    'k-ag': ('The American Gym Antwerp kit, front and back', 'De American Gym Antwerp kit, voor en achter'),
    'k-human': ('The Human Sports kit, from the back', 'De Human Sports kit, van achteren'),
    'k-summer': ('BeBetter Summer Club embroidered on an ecru tee', 'BeBetter Summer Club geborduurd op een ecru shirt'),
}
PH = {p['name']: p for p in json.load(open(os.path.join(HERE, 'data', 'photos.json')))}


def img(name, cls='', sizes='(max-width: 900px) 100vw, 50vw'):
    """Every image loads straight away, no lazy loading. Laurens will most likely open this on his phone."""
    en, nl = ALT[name]
    w, h = PH[name]['w'], PH[name]['h']
    small = f'/media/{name}-800.jpg 800w, ' if w > 800 else ''
    return (f'<img class="{cls}" src="/media/{name}-800.jpg" srcset="{small}/media/{name}.jpg {w}w" sizes="{sizes}" width="{w}" height="{h}" '
            f'alt="{L(en, nl)}" decoding="async">')


# ---------------------------------------------------------------- home
def mini():
    return f"""<div class="mini" data-mini>
  <div class="mini-g"><div class="gw">{garment.use('tee-back', 'mini-garment')}<span class="sq" data-sq aria-hidden="true"></span></div></div>
  <div class="mini-f">
    <label for="m-gym">{L("Your gym's name", 'De naam van je gym')}</label>
    <input id="m-gym" type="text" maxlength="22" autocomplete="organization" spellcheck="false" placeholder="{L('Type it here', 'Typ hem hier')}" data-k="name">
    <a class="btn" href="/gyms/" data-mini-go>{L('Design the kit', 'Ontwerp de kit')}</a>
  </div>
</div>"""


def drop():
    return f"""<div class="dr" data-drop data-date="{FACTS['drop']}">
  <p class="dr-d" aria-hidden="true"><span>27</span><span class="dr-dot">.</span><span>10</span></p>
  <div class="dr-t">
    <p class="dr-when" data-drop-when>{L('New collection, live on 27 October', 'Nieuwe collectie, live op 27 oktober')}</p>
    <p class="dr-how" data-drop-how>“Earn early access by joining our Instagram community.”</p>
    <a class="btn btn-lg" href="{COMMUNITY}" rel="noopener" data-drop-go>{L('Join for early access', 'Doe mee voor early access')}</a>
    <a class="btn btn-lg" href="{SHOP}" rel="noopener" data-drop-shop hidden>{L('Shop the new collection', 'Shop de nieuwe collectie')}</a>
  </div>
  <figure class="dr-p">{img('p-bag', 'dr-img', sizes='(max-width: 820px) 100vw, 30vw')}</figure>
</div>"""


STOPS = [
    ('koln', 'APR', 'KÖLN', 'FIBO', 'p-fibo2', '“€10.000+ in just 4 days at FIBO.”', '“€10.000+ in just 4 days at FIBO.”',
     '16 to 19 April 2026, the biggest fitness expo in the world. We were the youngest ever to stand there with our own brand.',
     '16 tot 19 april 2026, de grootste fitnessbeurs ter wereld. Nog nooit stond er iemand zo jong met een eigen merk.'),
    ('breda', 'MAY', 'BREDA', "SIGGI'S", 'p-siggis', '“we are already building our stand at the next event SIGGI’S, in Breda for the whole weekend”',
     '“we are already building our stand at the next event SIGGI’S, in Breda for the whole weekend”',
     'May 2026, a whole weekend in Breda.', 'Mei 2026, een heel weekend in Breda.'),
    ('praha', 'OCT', 'PRAHA', 'EVLS PRO SHOW', 'p-crowd', '“we drove from Rotterdam all the way to Prague, which took us about 9 hours”',
     '“we drove from Rotterdam all the way to Prague, which took us about 9 hours”',
     'October 2026, one of the biggest bodybuilding stages in Europe.', 'Oktober 2026, een van de grootste bodybuildingpodia van Europa.'),
]


def tour():
    """The road, as the back of a tour tee. A stop is a button, its photo and their own line beside the tee."""
    btns = ''
    for i, (k, date, city, show, pic, *_rest) in enumerate(STOPS):
        btns += f'<button type="button" class="tr-s{" cur" if i == 0 else ""}" data-stop="{k}" aria-pressed="{"true" if i == 0 else "false"}"><span class="tr-d">{date}</span><span class="tr-c">{city}</span><span class="tr-w">{show}</span></button>'
    btns += f'<p class="tr-s tr-next"><span class="tr-d">{L("OCT", "OKT")}</span><span class="tr-c">{L("NEXT", "VOLGENDE")}</span><span class="tr-w">{L("end of October", "eind oktober")}</span></p>'
    panes = ''
    for i, (k, date, city, show, pic, qen, qnl, en, nl) in enumerate(STOPS):
        panes += f'<figure class="tr-p" data-pane="{k}"{"" if i == 0 else " hidden"}>{img(pic, "tr-img", sizes="(max-width: 900px) 100vw, 40vw")}<figcaption><p class="tr-q">{qen}</p><p>{L(en, nl)}</p></figcaption></figure>'
    return f"""<div class="tr">
  <div class="tr-tee">{garment.tour_svg()}
    <div class="tr-list" role="group" aria-label="{L('Stops on the road', 'Stops onderweg')}">{btns}</div>
  </div>
  <div class="tr-ps">{panes}</div>
</div>"""


def curve():
    """1% better every day, the curve you can drag. 1.01 to the power of the day, nothing else."""
    W, H, P = 640, 360, 30
    top = 1.01 ** 365
    pts = ' '.join(f'{P + d / 365 * (W - 2 * P):.1f},{H - P - (1.01 ** d - 1) / (top - 1) * (H - 2 * P):.1f}' for d in range(0, 366, 5))
    grid = ''.join(f'<line x1="{P}" x2="{W - P}" y1="{H - P - (v - 1) / (top - 1) * (H - 2 * P):.1f}" y2="{H - P - (v - 1) / (top - 1) * (H - 2 * P):.1f}"/><text x="{W - P + 6}" y="{H - P - (v - 1) / (top - 1) * (H - 2 * P) + 4:.1f}">{v}×</text>' for v in (1, 10, 20, 30))
    d0 = 180
    x0 = P + d0 / 365 * (W - 2 * P)
    y0 = H - P - (1.01 ** d0 - 1) / (top - 1) * (H - 2 * P)
    return f"""<div class="cv" data-cv>
  <p class="cv-r"><span class="cv-day">{L('Day', 'Dag')} <b data-cv-day>{d0}</b></span><span class="cv-x"><b data-cv-x>{1.01 ** d0:.2f}</b>×</span></p>
  <svg class="cv-svg" viewBox="0 0 {W} {H}" role="img" aria-label="{L('Getting 1% better every day, over a year. After 365 days that\'s 37.8 times where you started.', 'Elke dag 1% beter, een jaar lang. Na 365 dagen is dat 37,8 keer waar je begon.')}">
    <g class="cv-grid">{grid}</g>
    <polyline class="cv-line" points="{pts}"/>
    <polyline class="cv-done" points="{pts}" data-cv-done/>
    <line class="cv-drop" x1="{x0:.1f}" x2="{x0:.1f}" y1="{y0:.1f}" y2="{H - P}" data-cv-drop/>
    <circle class="cv-dot" cx="{x0:.1f}" cy="{y0:.1f}" r="9" data-cv-dot/>
  </svg>
  <input class="cv-in js-only" type="range" min="1" max="365" value="{d0}" aria-label="{L('Day', 'Dag')}" data-cv-in>
  <p class="cv-n">{L('1.01 to the power of the days. A year of it comes to 37.8 times.', '1,01 tot de macht van het aantal dagen. Een jaar lang komt uit op 37,8 keer.')}</p>
</div>"""


# ---------------------------------------------------------------- Astra's plan, graphs you move, every number from data/plan.json
PLAN = json.load(open(os.path.join(HERE, 'data', 'plan.json')))


def dots():
    """Every Dutch gym CBS counts, one dot each. The ones with a clothing shop in tan. A slider lights the gyms BeBetter adds."""
    n, share = PLAN['gyms_cbs']['v'], PLAN['shop_share']['v']
    shop = round(n * share)
    cols, gap = 70, 9
    rows = -(-n // cols)
    import random
    rnd = random.Random(26)
    order = list(range(n))
    rnd.shuffle(order)
    shops = set(order[:shop])
    c = ''.join(f'<circle cx="{(i % cols) * gap + 5}" cy="{(i // cols) * gap + 5}" r="3.1"{" class=\"s\"" if i in shops else ""}/>' for i in range(n))
    free = [i for i in order[shop:]]
    data = json.dumps({'n': n, 'free': free[:200]})
    return f"""<div class="dw" data-dw>
  <svg class="dw-svg" viewBox="0 0 {cols * gap + 1} {rows * gap + 1}" role="img" aria-label="2,310 Dutch gyms, about {shop} of them with a clothing shop">{c}</svg>
  <script type="application/json" data-dw-data>{data}</script>
  <div class="dw-k"><span class="dw-key s">about {shop} gyms with a clothing shop</span><span class="dw-key">{n - shop:,} without one</span><span class="dw-key b">the gyms you add</span></div>
  <label class="dw-l" for="dw-n">Gyms you add in a year <b data-dw-n>10</b></label>
  <input id="dw-n" class="dw-in" type="range" min="0" max="120" value="10" data-dw-in>
  <p class="dw-r" data-dw-r>10 gyms is 0.4% of the gyms in the Netherlands.</p>
</div>"""


def lead():
    """Yes on 4 November, the kit arrives so many weeks later. The weeks are theirs to set, nothing is assumed."""
    return """<div class="lt" data-lt data-yes="2026-11-04" data-jan="2027-01-04">
  <div class="lt-axis" aria-hidden="true">
    <span class="lt-m" style="--x:0">Nov</span><span class="lt-m" style="--x:.326">Dec</span><span class="lt-m" style="--x:.663">Jan</span>
    <span class="lt-yes" style="--x:.033"><b>4 Nov</b>the fair</span>
    <span class="lt-jan" style="--x:.696"><b>4 Jan</b>the January rush</span>
    <span class="lt-bar" data-lt-bar style="--a:.033;--b:.489"></span>
    <span class="lt-dot" data-lt-dot style="--x:.489"></span>
  </div>
  <label class="lt-l" for="lt-w">Your weeks from a yes to the kit at their door <b data-lt-w>6</b></label>
  <input id="lt-w" class="lt-in" type="range" min="1" max="12" value="6" data-lt-in>
  <p class="lt-r" data-lt-r>A gym that says yes at the fair has its kit on 16 December, in time for January.</p>
</div>"""


def calc():
    """Pieces a year from gyms and pieces per gym. A price per piece is theirs to type, it starts empty."""
    return """<div class="cc" data-cc>
  <div class="cc-c"><label for="cc-g">Gyms a year <b data-cc-gv>10</b></label><input id="cc-g" type="range" min="1" max="60" value="10" data-cc-g></div>
  <div class="cc-c"><label for="cc-p">Pieces per gym <b data-cc-pv>200</b></label><input id="cc-p" type="range" min="20" max="400" step="10" value="200" data-cc-p><small>200 was the Hungary order</small></div>
  <div class="cc-c"><label for="cc-e">Your price per piece, in euros</label><input id="cc-e" type="text" inputmode="decimal" placeholder="Type your own" data-cc-e></div>
  <p class="cc-r"><b data-cc-n>2,000</b> pieces a year<span data-cc-rev></span></p>
</div>"""


def shots():
    items = [('plan-hero', 'The name goes on the back as they type.'), ('plan-studio', 'Pieces, colours, lettering and their logo, all on one garment.'),
             ('plan-sizes', 'The size run is the control, and the rail fills.'), ('plan-order', 'The brief you design from, filled in as they go.'),
             ('plan-sent', 'Sent. Stamped and into the bag.')]
    out = ''
    for name, cap in items:
        f = os.path.join(HERE, 'media', 'plan', name + '.jpg')
        w, h = (1200, 900)
        if os.path.exists(f):
            from PIL import Image
            w, h = Image.open(f).size
        out += f'<figure class="ps-i"><img src="/media/{name}.jpg" width="{w}" height="{h}" alt="{cap}" decoding="async"><figcaption>{cap}</figcaption></figure>'
    return f'<div class="psx" tabindex="0" role="region" aria-label="Five frames of the custom kit page">{out}</div>'


# ---------------------------------------------------------------- the page
def i18n(src):
    for m in re.finditer(r'\[\[', src):
        sep, nxt = src.find('||', m.end()), src.find('[[', m.end())
        if nxt != -1 and (sep == -1 or nxt < sep):
            raise SystemExit('nested [[ ]] near: ' + src[max(0, m.start() - 60):m.start() + 120])

    def attr(m):
        return f'{m.group(1)}="{m.group(2)}" data-nl-{m.group(1)}="{html.escape(m.group(3), quote=True)}"'
    src = re.sub(r'([\w-]+)="\[\[(.*?)\|\|(.*?)\]\]"', attr, src, flags=re.S)

    def opt(m):
        return f'<option{m.group(1)} data-nl="{html.escape(m.group(3), quote=True)}">{m.group(2)}</option>'
    src = re.sub(r'<option([^>]*)>\[\[(.*?)\|\|(.*?)\]\]</option>', opt, src, flags=re.S)

    def text(m):
        en, nl = m.group(1), m.group(2)
        tag = 'div' if (BLOCK.search(en) or BLOCK.search(nl)) else 'span'
        return f'<{tag} class="l-en">{en}</{tag}><{tag} class="l-nl" lang="nl">{nl}</{tag}>'
    prev = None
    while prev != src:
        prev = src
        src = TOK.sub(text, src)
    if '[[' in src or '||' in re.sub(r'<script.*?</script>', '', src, flags=re.S):
        raise SystemExit('a language pair was left unconverted')
    bad = re.search(r'<[^>]*="[^"]*<(span|div) class="l-', src)
    if bad:
        raise SystemExit('a language pair landed inside an attribute: ' + bad.group(0)[:160])
    return src


def split(s):
    m = TOK.fullmatch(s.strip())
    return (m.group(1), m.group(2)) if m else (s, s)


def header(nav):
    links = ''.join(f'<a href="{href}"{" aria-current=\"page\"" if key == nav else ""}>{L(en, nl)}</a>' for key, href, en, nl in NAV)
    lang = f'<div class="lang" role="group" aria-label="{L("Language", "Taal")}"><button type="button" data-lang="en" aria-pressed="true">EN</button><button type="button" data-lang="nl" aria-pressed="false">NL</button></div>'
    cta = f'<a class="btn top-cta" href="#send">{L("Send your kit", "Stuur je kit")}</a>' if nav == 'gyms' else f'<a class="btn top-cta" href="/gyms/">{L("Kit for your gym", "Kit voor je gym")}</a>'
    return f'''<a class="skip" href="#main">{L('Skip to content', 'Naar de inhoud')}</a>
<header class="top" data-top>
  <a class="brand" href="/" aria-label="{L('BeBetter, home', 'BeBetter, home')}">{svg('wordmark.svg', 'brand-mark')}</a>
  <nav class="nav" aria-label="{L('Main', 'Hoofdmenu')}">{links}<a href="{SHOP}" rel="noopener">{L('Shop', 'Shop')}</a></nav>
  <div class="top-r">
    {lang}
    {cta}
    <button class="menu-b" type="button" aria-expanded="false" aria-controls="menu">{L('Menu', 'Menu')}</button>
  </div>
</header>
<div class="menu" id="menu" hidden>
  <nav aria-label="{L('Menu', 'Menu')}">{links}<a href="{SHOP}" rel="noopener">{L('Shop', 'Shop')}</a></nav>
  {lang.replace('class="lang"', 'class="lang menu-lang"')}
  <a class="menu-mail" href="mailto:{MAIL}">{MAIL}</a>
</div>'''


def bar():
    return f'''<a class="skip" href="#main">Skip to content</a>
<header class="top pl-top" data-top lang="en">
  <a class="brand" href="{FACTS['site_url']}">{svg('wordmark.svg', 'brand-mark')}<span class="pl-name">Growth plan, by Astra</span></a>
  <div class="top-r"><a class="btn top-cta" href="{FACTS['site_url']}">Open the new site</a></div>
</header>'''


def footer():
    return f'''<footer class="foot">
  <div class="foot-in">
    <div class="foot-brand">{svg('wordmark.svg', 'foot-mark')}<p>{L('Gymwear and streetwear in one. 1% better every day.', 'Gymwear en streetwear in één. Elke dag 1% beter.')}</p></div>
    <div><h2 class="fh">{L('Write to us', 'Mail ons')}</h2><p><a href="mailto:{MAIL}">{MAIL}</a></p></div>
    <div><h2 class="fh">{L('For gyms', 'Voor gyms')}</h2><p><a href="/gyms/">{L('Design your kit', 'Ontwerp je kit')}</a><br><a href="/gyms/#send">{L('Send a request', 'Stuur een aanvraag')}</a></p></div>
    <div><h2 class="fh">{L('Elsewhere', 'Elders')}</h2><p><a href="{COMMUNITY}" rel="noopener">{L('Instagram community', 'Instagram community')}</a><br><a href="{FACTS['linkedin']}" rel="noopener">LinkedIn</a><br><a href="{SHOP}" rel="noopener">{L('Shop', 'Shop')}</a></p></div>
  </div>
  <div class="foot-b"><span>© 2026 BeBetter Official · KVK {FACTS['kvk']} · Poortugaal</span><span><a href="/privacy/">{L('Privacy', 'Privacy')}</a></span></div>
</footer>'''


def page(meta, body, assets):
    t_en, t_nl = split(meta['title'])
    d_en, d_nl = split(meta['desc'])
    js = ''.join(f'<script src="/assets/{j}?v={assets[j]}" defer></script>' for j in ['site.js'] + meta.get('js', []))
    bare = meta.get('bare')
    doc = f'''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title data-nl="{html.escape(t_nl, quote=True)}">{t_en}</title>
<meta name="description" content="{html.escape(d_en, quote=True)}" data-nl-content="{html.escape(d_nl, quote=True)}">
<meta name="robots" content="noindex, nofollow">
<meta name="theme-color" content="#0d0d0c">
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
<link rel="preload" href="/fonts/libre-caslon-display-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/archivo-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/site.css?v={assets['site.css']}">
<script>document.documentElement.classList.add('js');if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('motion');{'' if bare else "try{var l=new URLSearchParams(location.search).get('lang')||localStorage.getItem('bb-lang');if(l==='en'||l==='nl')document.documentElement.lang=l}catch(e){}"}</script>
{js}
</head>
<body class="{meta.get('body', '')}">
{bar() if bare else header(meta.get('nav'))}
<main id="main">
{body}
</main>
{'' if bare else footer()}
</body>
</html>
'''
    return i18n(doc)


def tokens(body):
    for k, v in {'{{MAIL}}': MAIL, '{{COMMUNITY}}': COMMUNITY, '{{SHOP}}': SHOP, '{{KVK}}': FACTS['kvk'],
                 '{{LINKEDIN}}': FACTS['linkedin'], '{{PLAN}}': FACTS['plan_url'], '{{SITE}}': FACTS['site_url']}.items():
        body = body.replace(k, v)
    body = re.sub(r'\{\{SVG ([\w.-]+)(?: ([\w -]+))?\}\}', lambda mm: svg(mm.group(1), mm.group(2) or ''), body)
    body = re.sub(r'\{\{IMG ([\w-]+)(?: ([\w -]+))?\}\}', lambda mm: img(mm.group(1), mm.group(2) or ''), body)
    body = re.sub(r'\{\{TEE ([\w-]+)(?: ([\w -]+))?\}\}', lambda mm: garment.use(mm.group(1), mm.group(2) or ''), body)
    for tok, fn in (('{{DEFS}}', garment.defs), ('{{KITDATA}}', kit_data), ('{{HERO}}', hero_field), ('{{STUDIO}}', studio),
                    ('{{SIZERUN}}', sizerun), ('{{ORDER}}', order), ('{{FORM}}', kitform), ('{{BAR}}', kitbar),
                    ('{{CLOCK}}', clock), ('{{RAIL}}', rail), ('{{MINI}}', mini), ('{{DROP}}', drop), ('{{TOUR}}', tour),
                    ('{{CURVE}}', curve), ('{{DOTS}}', dots), ('{{LEAD}}', lead), ('{{CALC}}', calc), ('{{SHOTS}}', shots)):
        if tok in body:
            body = body.replace(tok, fn())
    return body


def build():
    for d in (OUT, OUT2):
        if os.path.isdir(d):
            shutil.rmtree(d)
    os.makedirs(os.path.join(OUT, 'assets'))
    shutil.copytree(os.path.join(HERE, 'fonts'), os.path.join(OUT, 'fonts'), ignore=shutil.ignore_patterns('OFL-*', 'fonts.css'))
    assets = {}
    for f in sorted(glob.glob(os.path.join(HERE, 'assets', '*'))):
        name = os.path.basename(f)
        shutil.copy(f, os.path.join(OUT, 'assets', name))
        assets[name] = hashlib.sha1(open(f, 'rb').read()).hexdigest()[:8]
    css = open(os.path.join(HERE, 'fonts', 'fonts.css')).read() + ''.join(open(p).read() for p in sorted(glob.glob(os.path.join(HERE, 'css', '*.css'))))
    open(os.path.join(OUT, 'assets', 'site.css'), 'w').write(css)
    assets['site.css'] = hashlib.sha1(css.encode()).hexdigest()[:8]
    for p in sorted(glob.glob(os.path.join(HERE, 'js', '*.js'))):
        name = os.path.basename(p)
        shutil.copy(p, os.path.join(OUT, 'assets', name))
        assets[name] = hashlib.sha1(open(p, 'rb').read()).hexdigest()[:8]
    shutil.copytree(os.path.join(HERE, 'media'), os.path.join(OUT, 'media'), ignore=shutil.ignore_patterns('plan'))
    for src in sorted(glob.glob(os.path.join(HERE, 'pages', '*.html'))):
        raw = open(src).read()
        m = re.match(r'<!--(.*?)-->\s*', raw, re.S)
        meta = json.loads(m.group(1))
        body = tokens(raw[m.end():])
        out = os.path.join(OUT2 if meta.get('bare') else OUT, meta['path'])
        os.makedirs(os.path.dirname(out), exist_ok=True)
        open(out, 'w').write(page(meta, body, assets))
        print('wrote', ('plan/' if meta.get('bare') else '') + meta['path'], os.path.getsize(out))
    if os.path.exists(os.path.join(OUT2, 'index.html')):
        shutil.copytree(os.path.join(OUT, 'assets'), os.path.join(OUT2, 'assets'))
        shutil.copytree(os.path.join(OUT, 'fonts'), os.path.join(OUT2, 'fonts'))
        plan_src = open(os.path.join(OUT2, 'index.html')).read()
        os.makedirs(os.path.join(OUT2, 'media'), exist_ok=True)
        for name in sorted(set(re.findall(r'/media/([\w-]+\.(?:jpg|png|webp))', plan_src))):
            src = os.path.join(HERE, 'media', name)
            if not os.path.exists(src):
                src = os.path.join(HERE, 'media', 'plan', name)
            shutil.copy(src, os.path.join(OUT2, 'media', name))
    for d in (OUT, OUT2):
        if os.path.isdir(d):
            open(os.path.join(d, 'netlify.toml'), 'w').write(
                '[[headers]]\n  for = "/*"\n  [headers.values]\n    X-Robots-Tag = "noindex, nofollow"\n')


if __name__ == '__main__':
    build()
