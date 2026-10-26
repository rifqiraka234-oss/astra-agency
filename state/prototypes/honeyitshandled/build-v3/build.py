#!/usr/bin/env python3
"""Honey It's Handled v3, a wedding. Writes ../site-v3/.

The site is her invitation. A wedding film opens it, her rhyme "Something Off-White. Something Blue. Something Red." runs
as three chapters of one couple's year with her, and the enquiry is the reply card, sealed with her HH in red wax. One
state carries down the page into the card. The Events page is a second view of the same document (#events), so the
single file bundle keeps both. Every line of hers is in data/site.json with its source. Art research/art-direction-v3.md,
flow research/flow-v3.md, media art/prep_v3.py and media/manifest.json. Only files a page references are copied.

    /usr/local/bin/python3 build.py
"""
import os, json, shutil, html as H, datetime, re, hashlib

B = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.normpath(os.path.join(B, '..', 'site-v3'))
D = json.load(open(os.path.join(B, 'data', 'site.json')))
MAN = json.load(open(os.path.join(B, 'media', 'manifest.json')))
MK = json.load(open(os.path.join(B, 'art', 'marks.json')))
HH = open(os.path.join(B, 'art', 'hh.path')).read().strip()
WORD = open(os.path.join(B, 'art', 'word.path')).read().strip()
LOCK = open(os.path.join(B, 'art', 'lockup.path')).read().strip()
L = {k: v['t'] for k, v in D['lines'].items()}
E = D['events']
used = set()

def esc(s): return H.escape(s, quote=True)

WD = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
MO = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
def long_date(d): return f'{WD[d.weekday()]} {d.day} {MO[d.month - 1]} {d.year}'
def short_date(d): return f'{WD[d.weekday()][:3]} {d.day} {MO[d.month - 1][:3]} {d.year}'
def join(xs): return xs[0] if len(xs) == 1 else ', '.join(xs[:-1]) + ' and ' + xs[-1]

# ------------------------------------------------------------------ the sentences the page script also writes (site.js)
DEF_DATE = datetime.date(2027, 6, 12)
DEF = {'date': DEF_DATE, 'place': 'local', 'guests': 100, 'help': 'full', 'first': True}
HELP = {h['id']: h for h in D['help']}
def place_words(p): return 'here in Belgium' if p == 'local' else 'somewhere abroad'
def message_wedding(date, place, guests, help_, first):
    s = f'Hi Elise, we’re getting married on {long_date(date)}, {place_words(place)}, with about {guests} guests. '
    s += {'full': 'We’d love full planning', 'day': 'We’d love you to coordinate the day itself'}.get(help_, 'We’d love your help with part of the planning')
    s += ', and we’d like to be one of your first couples.' if first and date.year in D['offerYears'] else '.'
    return s
def bar_wedding(date, place, guests, help_):
    return f'{short_date(date)} · {"Belgium" if place == "local" else "Abroad"} · {guests} guests · {HELP[help_]["name"]}'
DEF_MSG = message_wedding(DEF_DATE, 'local', 100, 'full', True)
DEF_BAR = bar_wedding(DEF_DATE, 'local', 100, 'full')
EV_DEF_DATE = datetime.date(2027, 3, 20)
def message_event(kind, date, guests, team):
    what = 'a private event' if kind == 'private' else 'a company event'
    s = f'Hi Elise, we’re planning {what} on {long_date(date)} for about {guests} guests'
    return s + (', and we’d like you in our team as a freelance event manager.' if team else ', and we’d love you to handle it.')
EV_DEF_MSG = message_event('private', EV_DEF_DATE, 60, False)

# ------------------------------------------------------------------ media helpers
def webp(key, alt, sizes, cls='', eager=False, attrs=''):
    m = MAN[key]; ss = sorted(m['sizes'], key=lambda s: s[0])
    for w, _ in ss: used.add(f'{key}-{w}.webp')
    srcset = ', '.join(f'media/{key}-{w}.webp {w}w' for w, _ in ss)
    w, h = ss[-1]
    load = 'eager" fetchpriority="high' if eager else 'lazy'
    c = f' class="{cls}"' if cls else ''
    return f'<img{c} src="media/{key}-{ss[0][0]}.webp" srcset="{srcset}" sizes="{sizes}" width="{w}" height="{h}" alt="{esc(alt)}" loading="{load}" decoding="async"{attrs}>'

def film(key, poster_key, sizes='100vw', eager=False, tall=None):
    """A film that loads only near the screen, plays only on it, never under reduced motion or data saver. The poster
    is a picture under the video, so the page is whole without script."""
    files = MAN[key]['files'] if key in MAN else []
    srcs = []
    if tall:
        used.update([f'{tall}.webm', f'{tall}.mp4'])
        srcs += [f'<source media="(max-aspect-ratio: 4/5)" data-src="media/{tall}.webm" type=\'video/webm; codecs="vp9"\'>',
                 f'<source media="(max-aspect-ratio: 4/5)" data-src="media/{tall}.mp4" type=\'video/mp4; codecs="avc1.640028"\'>']
    used.update([f'{key}.webm', f'{key}.mp4'])
    srcs += [f'<source data-src="media/{key}.webm" type=\'video/webm; codecs="vp9"\'>',
             f'<source data-src="media/{key}.mp4" type=\'video/mp4; codecs="avc1.640028"\'>']
    m = MAN[poster_key] if poster_key in MAN else None
    ps = m['poster'] if m and 'poster' in m else None
    pk = poster_key + '-poster'
    for w, _ in ps: used.add(f'{pk}-{w}.webp')
    srcset = ', '.join(f'media/{pk}-{w}.webp {w}w' for w, _ in ps)
    w, h = sorted(ps)[-1]
    tall_src = ''
    if tall:
        tp = MAN[poster_key]['posterTall']; used.add(f'{pk}-tall-{tp[0][0]}.webp')
        tall_src = f'<source media="(max-aspect-ratio: 4/5)" srcset="media/{pk}-tall-{tp[0][0]}.webp">'
    load = 'eager" fetchpriority="high' if eager else 'lazy'
    return (f'<div class="film" data-film="{key}"><picture class="poster">{tall_src}<img src="media/{pk}-{sorted(ps)[0][0]}.webp" srcset="{srcset}" sizes="{sizes}" '
            f'width="{w}" height="{h}" alt="" loading="{load}" decoding="async"></picture>'
            f'<video muted playsinline loop preload="none" aria-hidden="true" tabindex="-1">{"".join(srcs)}</video></div>')

def mark(d, w, h, cls, label=None, pad=0):
    a = f'role="img" aria-label="{esc(label)}"' if label else 'aria-hidden="true"'
    return f'<svg class="{cls}" viewBox="{-pad} {-pad} {w + 2 * pad} {h + 2 * pad}" {a} focusable="false"><path fill-rule="evenodd" d="{d}"/></svg>'

HW, HHt = MK['hh']['w'], MK['hh']['h']
WW, WH = MK['word']['w'], MK['word']['h']
LW, LH = MK['lockup']['w'], MK['lockup']['h']
PLUS = '<svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" focusable="false"><path d="M8 2v12M2 8h12" stroke="currentColor" stroke-width="1.3"/></svg>'
MINUS = '<svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" focusable="false"><path d="M2 8h12" stroke="currentColor" stroke-width="1.3"/></svg>'
def chev(rot): return f'<svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" focusable="false"><path d="M10.5 2.5 5 8l5.5 5.5" fill="none" stroke="currentColor" stroke-width="1.3" transform="rotate({rot} 8 8)"/></svg>'
FAV = "data:image/svg+xml," + f"%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='-60 -60 {HW + 120} {HHt + 120}'%3E%3Crect x='-60' y='-60' width='{HW + 120}' height='{HHt + 120}' fill='%23962122'/%3E%3Cpath fill='%23FBF7F0' d='{HH.replace(' ', '%20')}'/%3E%3C/svg%3E"

# ------------------------------------------------------------------ the wax seal, her HH pressed into red wax (an SVG we draw)
def seal_svg(sfx, cls='seal-svg'):
    import math, random
    rnd = random.Random(17); pts = []
    for i in range(48):
        a = i / 48 * math.tau; r = 100 + rnd.uniform(-5, 6) + (7 if i % 9 == 0 else 0)
        pts.append((math.cos(a) * r, math.sin(a) * r))
    d = 'M' + ' '.join(f'{x:.1f} {y:.1f}' for x, y in pts) + 'Z'
    s = 118 / HW
    return (f'<svg class="{cls}" viewBox="-120 -120 240 240" aria-hidden="true" focusable="false"><defs>'
            f'<radialGradient id="wx{sfx}" cx="38%" cy="32%" r="75%"><stop offset="0" stop-color="#c0393a"/><stop offset=".55" stop-color="#962122"/><stop offset="1" stop-color="#5e1012"/></radialGradient>'
            f'<filter id="emb{sfx}" x="-20%" y="-20%" width="140%" height="140%"><feOffset dx="-1.4" dy="-1.6" in="SourceAlpha" result="o1"/><feFlood flood-color="#4a0b0d" flood-opacity=".75"/><feComposite in2="o1" operator="in" result="sh"/>'
            f'<feOffset dx="1.6" dy="1.8" in="SourceAlpha" result="o2"/><feFlood flood-color="#e8807c" flood-opacity=".55"/><feComposite in2="o2" operator="in" result="hi"/>'
            f'<feMerge><feMergeNode in="hi"/><feMergeNode in="sh"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>'
            f'<path d="{d}" fill="url(#wx{sfx})"/><circle r="74" fill="none" stroke="#5e1012" stroke-opacity=".45" stroke-width="2"/><circle r="71" fill="none" stroke="#d65a58" stroke-opacity=".35" stroke-width="1.2"/>'
            f'<g filter="url(#emb{sfx})" transform="translate({-HW * s / 2:.1f} {-HHt * s / 2:.1f}) scale({s:.4f})"><path fill-rule="evenodd" d="{HH}" fill="#8a1c1e"/></g></svg>')

# ------------------------------------------------------------------ the deckled edge of the cards, one path reused
def deckle_clip():
    import random
    rnd = random.Random(5); pts = []
    n = 90
    for i in range(n + 1): pts.append((i / n, rnd.uniform(0, .006)))
    for i in range(n + 1): pts.append((1 - rnd.uniform(0, .004), i / n))
    for i in range(n + 1): pts.append((1 - i / n, 1 - rnd.uniform(0, .006)))
    for i in range(n + 1): pts.append((rnd.uniform(0, .004), 1 - i / n))
    return 'polygon(' + ','.join(f'{x * 100:.2f}% {y * 100:.2f}%' for x, y in pts) + ')'
DECKLE = deckle_clip()

# ------------------------------------------------------------------ shared controls (one state, many instances)
def date_ctl(pfx, label='Your wedding date'):
    years = ''.join(f'<button type="button" class="yr" data-year="{y}" aria-pressed="{"true" if y == 2027 else "false"}">{y}</button>' for y in (2027, 2028, 2029))
    return f'''<div class="ctl-row" role="group" aria-label="{esc(label)}">
      <button type="button" class="sq" data-step="-7" aria-label="A week earlier">{chev(0)}</button>
      <button type="button" class="sq" data-step="7" aria-label="A week later">{chev(180)}</button>
      <label class="pick"><span>Pick a date</span><input type="date" data-k="date" value="{DEF_DATE.isoformat()}" min="2026-11-01" max="2029-12-31" aria-label="{esc(label)}"></label>
      <button type="button" class="tl" data-nodate aria-pressed="false">No date yet</button>
      <span class="years" data-years hidden><span class="lab">Sometime in</span>{years}</span>
    </div>'''

def place_ctl(pfx):
    return f'''<fieldset class="ctl-row opts" data-place-ctl><legend class="sr">Here or abroad?</legend>
      <label class="opt"><input type="radio" name="place-{pfx}" value="local" data-k="place" checked><span>Here in Belgium</span></label>
      <label class="opt"><input type="radio" name="place-{pfx}" value="abroad" data-k="place"><span>Somewhere abroad</span></label>
    </fieldset>'''

def guests_ctl(pfx, k='guests', label='Guests', val=100):
    return f'''<div class="ctl-row guests" role="group" aria-label="{esc(label)}"><span class="lab" aria-hidden="true">{esc(label)}</span>
      <button type="button" class="sq" data-g="-10" data-gk="{k}" aria-label="Ten fewer guests">{MINUS}</button>
      <output class="g-n" data-o="{k}" aria-live="polite">{val}</output>
      <button type="button" class="sq" data-g="10" data-gk="{k}" aria-label="Ten more guests">{PLUS}</button></div>'''

def help_ctl(pfx, menu=False):
    rows = ''
    for h in D['help']:
        chk = ' checked' if h['id'] == 'full' else ''
        if menu:
            rows += f'<label class="course"><input type="radio" name="help-{pfx}" value="{h["id"]}" data-k="help"{chk}><span class="c-n">{esc(h["name"])}</span><span class="c-l">{esc(h["line"])}</span></label>'
        else:
            rows += f'<label class="opt"><input type="radio" name="help-{pfx}" value="{h["id"]}" data-k="help"{chk}><span>{esc(h["name"])}</span></label>'
    if menu: return rows
    return f'<fieldset class="ctl-row opts"><legend class="sr">How much help?</legend>{rows}</fieldset>'

# ------------------------------------------------------------------ head and header
def head():
    title = 'Honey it’s Handled, wedding planner in Antwerp'
    desc = 'Elise plans weddings in Belgium and abroad from Antwerp, and she’s looking for a few special couples to be her very first. Something Off-White. Something Blue. Something Red.'
    return f'''<!doctype html>
<html lang="en-GB" data-help="full" data-view="home">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{esc(title)}</title>
<meta name="description" content="{esc(desc)}">
<meta name="robots" content="noindex, nofollow">
<meta name="theme-color" content="#F6F0E6">
<link rel="icon" href="{FAV}">
<link rel="preload" href="fonts/fraunces-display-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="fonts/figtree-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="css/site.css">
<script>(function(h){{h.classList.add('js');try{{if(matchMedia('(prefers-reduced-motion: reduce)').matches)h.classList.add('rm');var c=navigator.connection;if(c&&c.saveData)h.classList.add('save');if(/^#(events|ev-)/.test(location.hash))h.dataset.view='events'}}catch(e){{}}}})(document.documentElement)</script>
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<header class="hdr" data-hdr>
  <a class="logo" href="#top" aria-label="Honey it’s Handled, back to the top">{mark(WORD, WW, WH, 'word')}</a>
  <nav class="nav" aria-label="Main">
    <button class="mbtn" type="button" aria-expanded="false" aria-controls="mnav">Menu</button>
    <div class="nl" id="mnav">
      <a href="#off-white" data-nav="home">Weddings</a>
      <a href="#events" data-nav="events">Events</a>
      <a href="#elise" data-nav="home">Elise</a>
      <a class="nl-cta" href="#reply" data-cta data-cta-home>Be one of the first</a>
      <a class="nl-cta" href="#ev-reply" data-cta data-cta-ev>Tell me about your event</a>
    </div>
  </nav>
  <a class="btn hbtn" href="#reply" data-cta data-cta-home>Be one of the first</a>
  <a class="btn hbtn" href="#ev-reply" data-cta data-cta-ev>Tell me about your event</a>
</header>
<main id="main">
'''

# ------------------------------------------------------------------ 1. the film
def hero():
    return f'''<div class="view home" id="home">
<section class="hero" id="top" aria-labelledby="h-top" data-tone="film">
  {film('hero', 'hero', eager=True, tall='hero-tall')}
  <div class="hero-shade" aria-hidden="true"></div>
  <div class="hero-t">
    {mark(LOCK, LW, LH, 'lockup', 'Honey it’s Handled, wedding and event agency')}
    <h1 id="h-top">{esc(L["hero"])}</h1>
    <div class="acts"><a class="btn btn-ivory" href="#reply" data-cta data-hero-cta>{esc(L["cta"])}</a><a class="tl tl-ivory" href="#events">Planning an event?</a></div>
  </div>
  <p class="hero-note">A prototype by Astra agency. The films and wedding photos stand in for her own, and nothing here is sent.</p>
</section>
'''

# ------------------------------------------------------------------ 2. the invitation
def invite():
    p = L['palette']
    spine = (f'<a href="#off-white" class="sp sp-off"><span class="nw">{esc(p[0])}</span></a>'
             f'<a href="#blue" class="sp sp-blue">{esc(p[1])}</a><a href="#red" class="sp sp-red">{esc(p[2])}</a>')
    return f'''<section class="invite" id="invited" aria-labelledby="h-inv">
  {mark(HH, HW, HHt, 'inv-hh')}
  <h2 id="h-inv">{esc(L["offerTitle"])}</h2>
  <p class="inv-t">{esc(L["offerText"])}</p>
  <p class="inv-y">{esc(L["offerYears"])}</p>
  <nav class="spine" aria-label="Three chapters of your year with Elise">{spine}</nav>
</section>
'''

# ------------------------------------------------------------------ 3. something off white
def off_white():
    d = DEF_DATE
    return f'''<section class="ch ch-off" id="off-white" aria-labelledby="h-off">
  <div class="pin" data-pin="off">
    <div class="stage" data-stage="off">
      {film('off', 'off')}
      <canvas class="veil" data-veil aria-hidden="true"></canvas>
      <div class="stage-t sw" data-veil-t>
        <h2 id="h-off"><span class="nw">{esc(L["palette"][0])}</span></h2>
        <p class="stage-l">{esc(L["off"])}</p>
      </div>
    </div>
  </div>
  <div class="off-body">
    <figure class="still still-a">{webp('lace', 'Buttons being fastened on the back of a beaded lace wedding dress, in black and white', '(max-width: 700px) 60vw, 26vw')}</figure>
    <figure class="still still-b">{webp('veil', 'The lace back of a wedding dress under a long veil, in black and white', '(max-width: 700px) 52vw, 22vw')}</figure>
    <div class="when" role="group" aria-labelledby="h-when">
      <p class="when-q" id="h-when">When’s your I do?</p>
      <p class="sent" aria-live="polite"><span data-o="sentence">We’re saying I do on <b data-o="dateLong">{long_date(d)}</b>, <b data-o="place">here in Belgium</b>, with about <b data-o="guestsN">100</b> guests.</span></p>
      <div class="ctls">
        {date_ctl('w')}
        {place_ctl('w')}
        {guests_ctl('w')}
      </div>
      <p class="offer-note" data-o="offerNote">A 2027 date. You could be one of her first couples.</p>
      <p class="answers">{esc(L["answers"])}</p>
    </div>
  </div>
</section>
'''

# ------------------------------------------------------------------ 4. something blue
def blue():
    # 17 lights hanging at different heights, placed by hand so none sits on the words (desktop, then phone)
    pos = [(8, 16), (17, 34), (24, 12), (31, 44), (38, 22), (45, 9), (52, 36), (58, 18), (64, 47), (70, 11), (76, 30),
           (82, 15), (88, 40), (93, 22), (14, 54), (86, 58), (60, 60)]
    posm = [(10, 14), (24, 30), (38, 10), (52, 26), (66, 12), (80, 28), (91, 13), (16, 46), (32, 56), (46, 42), (60, 52),
            (74, 44), (88, 54), (8, 66), (28, 74), (70, 70), (90, 76)]
    lights = ''
    for i, (name, _) in enumerate(D['lights']):
        x, y = pos[i]; xm, ym = posm[i]
        dl = (i * 37 % 23) / 10
        al = 'l' if x < 16 else 'r' if x > 84 else 'c'
        alm = 'l' if xm < 22 else 'r' if xm > 78 else 'c'
        lights += (f'<li><button type="button" class="lt" data-light="{i}" data-al="{al}" data-alm="{alm}" aria-pressed="true" style="--x:{x}%;--y:{y}%;--xm:{xm}%;--ym:{ym}%;--dl:{dl:.1f}s">'
                   f'<span class="lt-s" aria-hidden="true"></span><span class="lt-h" aria-hidden="true"></span><span class="lt-f" aria-hidden="true"></span><span class="lt-n">{esc(name)}</span></button></li>')
    return f'''<section class="ch ch-blue" id="blue" aria-labelledby="h-blue">
  <div class="stage blue-stage" data-stage="blue">
    {film('blue', 'blue')}
    <ul class="lights" data-lights aria-label="Seventeen things Elise keeps open, lit when she holds them">{lights}</ul>
    <div class="stage-t blue-t sw">
      <h2 id="h-blue">{esc(L["palette"][1])}</h2>
      <p class="stage-l">{esc(L["blue"])}</p>
      <p class="count" aria-live="polite"><span data-o="count">Elise holds 17 of 17.</span> <span class="tabs-l">{esc(L["tabs"])}</span></p>
    </div>
  </div>
  <div class="blue-body">
    <div class="menu-wrap"><fieldset class="menu" style="clip-path:{DECKLE}">
      <legend class="menu-h">{esc(L["helpTitle"])}</legend>
      {mark(HH, HW, HHt, 'menu-hh')}
      {help_ctl('m', menu=True)}
      <p class="menu-note" data-o="menuNote">Every light is lit. Tap one to hand it back.</p>
    </fieldset></div>
  </div>
</section>
'''

# ------------------------------------------------------------------ 5. something red, the day and the final dance
def red():
    return f'''<section class="ch ch-red" id="red" aria-labelledby="h-red">
  <canvas class="petals" data-petals aria-hidden="true"></canvas>
  <div class="stage red-stage" data-stage="red">
    {film('red', 'red')}
    <div class="stage-t red-t sw">
      <h2 id="h-red">{esc(L["palette"][2])}</h2>
      <p class="stage-l">{esc(L["red"])}</p>
    </div>
  </div>
  <div class="stage dance-stage" data-stage="dance">
    {film('dance', 'dance')}
    <div class="stage-t dance-t">
      <p class="dance-l">{esc(L["dance"])}</p>
      <a class="btn btn-ivory" href="#reply" data-cta>{esc(L["cta"])}</a>
    </div>
  </div>
</section>
'''

# ------------------------------------------------------------------ 6. elise
def elise():
    q = D['quote']
    return f'''<section class="elise" id="elise" aria-labelledby="h-elise">
  <figure class="el-a">{webp('elise-bw', 'Elise Laeven, founder of Honey it’s Handled, smiling, in black and white', '(max-width: 760px) 86vw, 40vw')}</figure>
  <figure class="el-b">{webp('elise-sit', 'Elise Laeven sitting on a step in a black suit', '(max-width: 760px) 46vw, 18vw')}</figure>
  <div class="el-t">
    <h2 id="h-elise">{esc(L["typeA"])}</h2>
    <p class="el-i">{esc(L["intro"])}</p>
    <p>{esc(L["believe"])}</p>
    <p>{esc(L["years"])}</p>
    <blockquote class="q"><p>“{esc(q["one"])}”</p><footer>{esc(q["who"])}, on his 50th birthday, Cinco Cero. <a class="tl" href="#ev-private">Her events</a></footer></blockquote>
    <a class="btn" href="#reply" data-cta>{esc(L["cta"])}</a>
  </div>
</section>
'''

# ------------------------------------------------------------------ 7. the reply card
def reply():
    found = ''.join(f'<option>{esc(f)}</option>' for f in D['form']['found'])
    nxt = ''.join(f'<li><b>{esc(a)}</b> {esc(b)}</li>' for a, b in D['next'])
    return f'''<section class="reply" id="reply" aria-labelledby="h-reply">
  <div class="reply-h">
    <h2 id="h-reply">{esc(L["tell"])}</h2>
    <p>{esc(L["pinterest"])}</p>
  </div>
  <form class="rform" data-reply="wedding" action="mailto:{D["contact"]["email"]}" method="post" enctype="text/plain" novalidate>
    <div class="card-wrap"><div class="card" data-card style="clip-path:{DECKLE}">
      {mark(HH, HW, HHt, 'card-hh')}
      <div class="names">
        <label class="nm"><span class="sr">Your first name</span><input name="first" autocomplete="given-name" placeholder="Your name" data-k="n1" required aria-required="true"><span class="foil" data-foil="n1" aria-hidden="true"></span></label>
        <span class="amp" aria-hidden="true">&amp;</span>
        <label class="nm"><span class="sr">Your partner’s first name</span><input name="partner" autocomplete="off" placeholder="your partner’s" data-k="n2"><span class="foil" data-foil="n2" aria-hidden="true"></span></label>
      </div>
      <p class="c-l1">are saying I do</p>
      <p class="c-l2" data-o="cardDate">on {long_date(DEF_DATE)}</p>
      <p class="c-l3" data-o="cardPlace">here in Belgium, with about 100 guests</p>
      <p class="c-l4" data-o="cardHelp">and would love Elise’s full planning</p>
      <p class="c-l5" data-o="cardFirst">as one of her first couples</p>
      <p class="card-err" data-err="first" hidden>Your name first, so Elise knows who’s writing.</p>
    </div><div class="seal" data-seal aria-hidden="true">{seal_svg("w")}</div></div>
    <details class="day" data-day>
      <summary>Change the date, place, guests or help</summary>
      <div class="ctls">{date_ctl('r')}{place_ctl('r')}{guests_ctl('r')}{help_ctl('r')}</div>
    </details>
    <div class="fields">
      <label class="f"><span>Email address</span><input type="email" name="email" autocomplete="email" required aria-required="true" data-k="email"><span class="f-err" data-err="email" hidden>An email address Elise can answer.</span></label>
      <label class="f"><span>Phone <i>optional</i></span><input type="tel" name="phone" autocomplete="tel" data-k="phone"></label>
      <label class="f f-wide"><span>{esc(L["tell"])}</span><textarea name="message" rows="4" data-f="message" required aria-required="true">{esc(DEF_MSG)}</textarea><span class="f-err" data-err="message" hidden>A line or two about your plans, please.</span></label>
      <p class="rewrite" data-rewrite-wrap hidden><button type="button" class="tl" data-rewrite>Write it again from my choices</button></p>
      <label class="f"><span>{esc(L["foundQ"])} <i>optional</i></span><select name="found" data-k="found"><option value="">Choose one</option>{found}</select></label>
      <label class="check" data-first-wrap><input type="checkbox" name="firstcouples" data-k="first" checked><span>We’d like to be one of the first couples</span></label>
      <input type="hidden" name="celebrating" value="Wedding" data-o="celebrating">
    </div>
    <div class="send-row">
      <button class="btn send" type="submit">{esc(L["handled"])}</button>
      <p class="proto">This prototype sends nothing. On her live site your reply goes straight to Elise.</p>
    </div>
    <div class="sealed" data-sealed hidden tabindex="-1">
      <p class="sealed-h">Consider it handled.</p>
      <p>Your reply is sealed. In this prototype nothing leaves the page, so <a class="tl" data-mail href="mailto:{D["contact"]["email"]}">send it from your own email</a> and it reaches Elise with everything above in it.</p>
      <button type="button" class="tl" data-unseal>Change something</button>
    </div>
  </form>
  <div class="next"><h3>{esc(L["nextTitle"])}</h3><ol>{nxt}</ol></div>
</section>
</div>
'''

# ------------------------------------------------------------------ the events page, a second view
def events():
    c, p, t = E['cinco'], E['pro'], E['team']
    q = D['quote']
    kinds_p = ''.join(f'<option value="{i}">{esc(k)}</option>' for i, k in enumerate(E['private']))
    kinds_c = ''.join(f'<option value="{i}">{esc(k)}</option>' for i, k in enumerate(E['company']))
    found = ''.join(f'<option>{esc(f)}</option>' for f in D['form']['found'])
    used.update(['night.webm', 'night.mp4', 'night-poster.webp'])
    night = ('<div class="film film-night" data-film="night"><picture class="poster"><img src="media/night-poster.webp" width="960" height="540" alt="" loading="lazy" decoding="async"></picture>'
             '<video muted playsinline loop preload="none" aria-hidden="true" tabindex="-1"><source data-src="media/night.webm" type=\'video/webm; codecs="vp9"\'><source data-src="media/night.mp4" type=\'video/mp4; codecs="avc1.42E01E"\'></video></div>')
    return f'''<div class="view ev" id="events" aria-labelledby="h-ev" tabindex="-1">
<section class="ev-hero" data-tone="film">
  {webp('tent', 'A tent Elise set for Cinco Cero before the guests arrived, string lights, a long white bar and green chairs', '100vw', cls='ev-hero-img')}
  <div class="hero-shade" aria-hidden="true"></div>
  <div class="ev-hero-t">
    <h1 id="h-ev">{esc(E["title"]["t"])}</h1>
    <p>{esc(E["sub"]["t"])}</p>
    <a class="btn btn-ivory ev-cta" href="#ev-reply" data-cta data-hero-cta>Tell me about your event</a>
    <ul class="ev-ways">
      <li><a href="#ev-private" data-ev-go="private">A private celebration</a></li>
      <li><a href="#ev-company" data-ev-go="company">A company event</a></li>
      <li><a href="#ev-team" data-ev-go="team">Elise in your team</a></li>
    </ul>
  </div>
</section>
<section class="ev-part ev-private" id="ev-private" aria-labelledby="h-cinco">
  <div class="ev-media">{night}<p class="cap">{esc(c["film"])}.</p></div>
  <div class="ev-t">
    <h2 id="h-cinco">{esc(c["name"])}</h2>
    <p class="meta">{esc(c["kind"])} · {esc(c["date"])} · {c["guests"]} guests</p>
    <p class="ev-l">{esc(c["brief"])}</p>
    <blockquote class="q"><p>“{esc(q["one"])} {esc(q["two"])}”</p><footer>{esc(q["who"])}</footer></blockquote>
    <a class="btn" href="#ev-reply" data-cta data-ev-set="private">Plan a private event</a>
  </div>
  <div class="ev-pics">
    <figure>{webp('sign', 'The Cinco Cero welcome sign at night', '(max-width: 760px) 44vw, 16vw')}</figure>
    <figure>{webp('lamp', 'A heat lamp over the Cinco Cero buffet', '(max-width: 760px) 44vw, 16vw')}</figure>
  </div>
</section>
<section class="ev-part ev-company" id="ev-company" aria-labelledby="h-pro">
  <div class="ev-media ev-pro-pics">
    <figure class="pro-a">{webp('hall', 'The iron and glass roof and galleries of the Handelsbeurs in Antwerp, set for the Pro League Awards', '(max-width: 760px) 92vw, 44vw')}</figure>
    <figure class="pro-b">{webp('tables', 'Tables laid from above at the Pro League Awards', '(max-width: 760px) 60vw, 22vw')}</figure>
    <p class="cap">{esc(p["credit"])}</p>
  </div>
  <div class="ev-t">
    <h2 id="h-pro">{esc(p["name"])}</h2>
    <p class="meta">{esc(p["kind"])} · {esc(p["date"])} · {esc(p["guests"])} guests</p>
    <p class="ev-l">{esc(p["text"])}</p>
    <p>{esc(p["scenes"])} {esc(p["timing"])}</p>
    <a class="btn" href="#ev-reply" data-cta data-ev-set="company">Plan a company event</a>
  </div>
</section>
<section class="ev-part ev-team" id="ev-team" aria-labelledby="h-team">
  <div class="ev-t">
    <h2 id="h-team">Elise in your team</h2>
    <p class="ev-l">She also joins production teams as “{esc(t["quote"])}”.</p>
    <p>You hand her the parts you want held, and she runs them with your people, before the day and on it.</p>
    <a class="btn" href="#ev-reply" data-cta data-ev-set="team">Ask Elise to join your team</a>
  </div>
</section>
<section class="reply ev-reply" id="ev-reply" aria-labelledby="h-evr">
  <div class="reply-h">
    <h2 id="h-evr">Tell me about your event.</h2>
    <p>{esc(E["enjoy"]["t"])}</p>
  </div>
  <form class="rform" data-reply="event" action="mailto:{D["contact"]["email"]}" method="post" enctype="text/plain" novalidate>
    <div class="card-wrap"><div class="card card-ev" data-card style="clip-path:{DECKLE}">
      {mark(HH, HW, HHt, 'card-hh')}
      <fieldset class="ev-type"><legend>{esc(L["celebratingQ"])}</legend>
        <label class="opt"><input type="radio" name="ev-type" value="private" data-e="type" checked><span>Private Event</span></label>
        <label class="opt"><input type="radio" name="ev-type" value="company" data-e="type"><span>Corporate Event</span></label>
      </fieldset>
      <label class="check team-check" data-team-wrap hidden><input type="checkbox" name="ev-team" data-e="team"><span>Elise in our team, as a freelance event manager</span></label>
      <label class="f"><span>The occasion</span><select name="ev-occasion" data-e="kind" data-kinds-private="{esc(json.dumps(E['private']))}" data-kinds-company="{esc(json.dumps(E['company']))}">{kinds_p}</select></label>
      <div class="ev-row">
        <label class="f"><span>The date</span><input type="date" data-e="date" value="{EV_DEF_DATE.isoformat()}" min="2026-11-01" max="2029-12-31"></label>
        {guests_ctl('e', 'evGuests', 'Guests', 60)}
      </div>
      <div class="names names-ev">
        <label class="nm"><span class="sr">Your name</span><input name="ev-name" autocomplete="name" placeholder="Your name" data-e="name" required aria-required="true"><span class="foil" data-foil="ename" aria-hidden="true"></span></label>
      </div>
      <label class="f co" data-co-wrap hidden><span>Company <i>optional</i></span><input name="ev-company" autocomplete="organization" data-e="company"></label>
      <p class="card-err" data-err="first" hidden>Your name first, so Elise knows who’s writing.</p>
    </div><div class="seal" data-seal aria-hidden="true">{seal_svg("e")}</div></div>
    <div class="fields">
      <label class="f"><span>Email address</span><input type="email" name="ev-email" autocomplete="email" required aria-required="true" data-e="email"><span class="f-err" data-err="email" hidden>An email address Elise can answer.</span></label>
      <label class="f"><span>Phone <i>optional</i></span><input type="tel" name="ev-phone" autocomplete="tel" data-e="phone"></label>
      <label class="f f-wide"><span>{esc(L["tell"])}</span><textarea name="ev-message" rows="4" data-f="message" required aria-required="true">{esc(EV_DEF_MSG)}</textarea><span class="f-err" data-err="message" hidden>A line or two about your plans, please.</span></label>
      <p class="rewrite" data-rewrite-wrap hidden><button type="button" class="tl" data-rewrite>Write it again from my choices</button></p>
      <label class="f"><span>{esc(L["foundQ"])} <i>optional</i></span><select name="ev-found" data-e="found"><option value="">Choose one</option>{found}</select></label>
      <input type="hidden" name="ev-celebrating" value="Private Event" data-o="evCelebrating">
    </div>
    <div class="send-row">
      <button class="btn send" type="submit">{esc(L["handled"])}</button>
      <p class="proto">This prototype sends nothing. On her live site your message goes straight to Elise.</p>
    </div>
    <div class="sealed" data-sealed hidden tabindex="-1">
      <p class="sealed-h">Consider it handled.</p>
      <p>Your message is sealed. In this prototype nothing leaves the page, so <a class="tl" data-mail href="mailto:{D["contact"]["email"]}">send it from your own email</a> and it reaches Elise with everything above in it.</p>
      <button type="button" class="tl" data-unseal>Change something</button>
    </div>
  </form>
</section>
</div>
'''

# ------------------------------------------------------------------ footer and the bar
def foot():
    c = D['contact']
    DATA_JSON = json.dumps({'lights': [l[0] for l in D['lights']], 'dayLights': D['dayLights'], 'offerYears': D['offerYears'],
                            'helpNames': {h['id']: h['name'] for h in D['help']}, 'email': c['email']}, ensure_ascii=False).replace('[[', '[ [').replace('</', '<\\/')
    return f'''</main>
<footer class="foot" id="foot">
  {mark(LOCK, LW, LH, 'foot-lock', 'Honey it’s Handled, wedding and event agency')}
  <div class="foot-c">
    <p><span>{esc(L["email"])}</span> <a href="mailto:{c["email"]}">{c["email"]}</a></p>
    <p><span>{esc(L["phone"])}</span> <a href="tel:{c["phoneHref"]}">{c["phone"]}</a></p>
    <p><a href="{c["instagram"]}" rel="noopener">Instagram</a> <a href="{c["linkedin"]}" rel="noopener">LinkedIn</a> <a href="#events">Events</a></p>
  </div>
  <p class="foot-n">A prototype by Astra agency for Honey it’s Handled, not her live site. The films and wedding photos on the wedding page are stock, standing in for footage from her first couples. Photos of Elise, Cinco Cero and the Pro League Awards are hers. KBO {c["kbo"]}, Antwerp.</p>
</footer>
<aside class="bar" data-bar aria-label="Your enquiry so far" aria-hidden="true">
  <p class="bar-s"><span class="bl" data-o="bar">{esc(DEF_BAR)}</span><span class="bs"><span data-o="barDate">{esc(short_date(DEF_DATE))}</span><span data-o="barMore">100 guests · Full planning</span></span></p>
  <a class="btn bar-b" href="#reply" data-bar-cta tabindex="-1">Be one of the first</a>
</aside>
<script type="application/json" id="hih-data">{DATA_JSON}</script>
<script src="js/veil.js" defer></script>
<script src="js/petals.js" defer></script>
<script src="js/site.js" defer></script>
</body>
</html>
'''

def build():
    if os.path.isdir(OUT): shutil.rmtree(OUT)
    os.makedirs(os.path.join(OUT, 'media')); os.makedirs(os.path.join(OUT, 'css')); os.makedirs(os.path.join(OUT, 'js')); os.makedirs(os.path.join(OUT, 'fonts'))
    page = head() + hero() + invite() + off_white() + blue() + red() + elise() + reply() + events() + foot()
    # checks before anything is written
    assert '[[' not in page
    assert page.count('id="reply"') == 1 and page.count('id="events"') == 1
    ids = re.findall(r'\sid="([^"]+)"', page); dup = {i for i in ids if ids.count(i) > 1}
    assert not dup, dup
    names = re.findall(r'<(?:input|select|textarea)[^>]*\bname="([^"]+)"', page)
    open(os.path.join(OUT, 'index.html'), 'w', encoding='utf-8').write(page)
    for f in sorted(used):
        shutil.copy(os.path.join(B, 'media', f), os.path.join(OUT, 'media', f))
    for f in ('site.css',): shutil.copy(os.path.join(B, 'css', f), os.path.join(OUT, 'css', f))
    for f in ('site.js', 'veil.js', 'petals.js'): shutil.copy(os.path.join(B, 'js', f), os.path.join(OUT, 'js', f))
    for f in os.listdir(os.path.join(B, 'fonts')): shutil.copy(os.path.join(B, 'fonts', f), os.path.join(OUT, 'fonts', f))
    shutil.copy(os.path.join(B, 'media', 'grain.png'), os.path.join(OUT, 'media', 'grain.png'))
    nf = f'''<!doctype html><html lang="en-GB"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Not found, Honey it’s Handled</title><meta name="robots" content="noindex, nofollow"><link rel="icon" href="{FAV}"><link rel="stylesheet" href="/css/site.css"></head>
<body class="nf"><main class="nf-m">{mark(HH, HW, HHt, 'inv-hh')}<h1>This page isn’t here.</h1><p>The wedding page and the events are a click away.</p><p><a class="btn" href="/">The wedding page</a> <a class="tl" href="/#events">Events</a></p></main></body></html>'''
    open(os.path.join(OUT, '404.html'), 'w', encoding='utf-8').write(nf)
    open(os.path.join(OUT, 'netlify.toml'), 'w').write('[[headers]]\n  for = "/*"\n  [headers.values]\n    X-Robots-Tag = "noindex, nofollow"\n\n[[redirects]]\n  from = "/events"\n  to = "/#events"\n  status = 302\n')
    open(os.path.join(OUT, 'robots.txt'), 'w').write('User-agent: *\nDisallow: /\n')
    h = hashlib.sha256()
    for root, _, fs in sorted(os.walk(OUT)):
        for f in sorted(fs):
            p = os.path.join(root, f); h.update(os.path.relpath(p, OUT).encode()); h.update(open(p, 'rb').read())
    size = sum(os.path.getsize(os.path.join(r, f)) for r, _, fs in os.walk(OUT) for f in fs)
    print('site-v3 written,', len(used), 'media files,', round(size / 1e6, 2), 'MB, hash', h.hexdigest()[:16], ', names', len(names), 'unique', len(set(names)))

if __name__ == '__main__':
    build()
