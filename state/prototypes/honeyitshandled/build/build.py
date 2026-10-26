#!/usr/bin/env python3
"""Honey It's Handled prototype, writes ../site/. One wedding carried down the page (date, here or abroad, guests, the
help, first couples), from the hero's date to her letter, which arrives filled in. Every fact and line is in
data/site.json with its source, the flow is ../research/flow.md, the art ../research/art-direction.md. Her own photos
only (art/prep_media.py), her marks traced from her own PNGs (art/trace.py)."""
import os, json, shutil, html as H, datetime, math, re, hashlib

B = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(B, '..', 'site')
D = json.load(open(os.path.join(B, 'data', 'site.json')))
MAN = json.load(open(os.path.join(B, 'media', 'manifest.json')))
MK = json.load(open(os.path.join(B, 'art', 'marks.json')))
HH = open(os.path.join(B, 'art', 'hh.path')).read()
WORD = open(os.path.join(B, 'art', 'word.path')).read()
LOCK = open(os.path.join(B, 'art', 'lockup.path')).read()
TODAY = datetime.date.fromisoformat(D['built'])
DEF = datetime.date.fromisoformat(D['defaultDate'])
used = set(['fibre.jpg'])

def esc(s): return H.escape(s, quote=True)

# ------------------------------------------------------------------ the same sums the page script does
WD = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
MO = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
def long_date(d): return f'{WD[d.weekday()]} {d.day} {MO[d.month - 1]} {d.year}'
def short_date(d): return f'{WD[d.weekday()][:3]} {d.day} {MO[d.month - 1][:3]} {d.year}'
def days_to(d): return (d - TODAY).days
SVC = {s['id']: s for s in D['services']}
def step_in(n, svc):
    s = SVC[svc]
    if 'stepInDays' in s: return max(0, n - s['stepInDays'])
    return round(n * s['stepIn'])
def message(date, place, guests, svc, first):
    where = 'here in Belgium' if place == 'local' else 'somewhere abroad'
    when = f'on {long_date(date)}' if date else 'in 2027'
    helpw = {'full': 'We’d love full planning', 'partial': 'We’d love help with part of the planning', 'day': 'We’d love you to coordinate the day itself'}[svc]
    s = f'Hi Elise, we’re getting married {when}, {where}, with about {guests} guests. {helpw}'
    s += ', and we’d like to be one of your first couples.' if first else '.'
    return s

# ------------------------------------------------------------------ pictures
def pic(key, alt, sizes='100vw', cls='', eager=False, lazy_ok=True):
    m = MAN[key]; ss = sorted(m['sizes'], key=lambda s: s[0])
    for w, _ in ss: used.update([f'{key}-{w}.jpg', f'{key}-{w}.webp'])
    js = ', '.join(f'/media/{key}-{w}.jpg {w}w' for w, _ in ss)
    ws = ', '.join(f'/media/{key}-{w}.webp {w}w' for w, _ in ss)
    w, h = ss[-1]
    load = 'eager" fetchpriority="high' if eager else 'lazy'
    c = f' class="{cls}"' if cls else ''
    return f'<picture><source type="image/webp" srcset="{ws}" sizes="{sizes}"><img{c} src="/media/{key}-{ss[0][0]}.jpg" srcset="{js}" sizes="{sizes}" width="{w}" height="{h}" alt="{esc(alt)}" loading="{load}" decoding="async"></picture>'

def svg_mark(d, w, h, cls, label=None, extra=''):
    a = f'role="img" aria-label="{esc(label)}"' if label else 'aria-hidden="true"'
    return f'<svg class="{cls}" viewBox="0 0 {w} {h}" {a} focusable="false"{extra}><path fill-rule="evenodd" d="{d}"/></svg>'

HHW, HHH = MK['hh']['w'], MK['hh']['h']
WW, WH = MK['word']['w'], MK['word']['h']
LW, LH = MK['lockup']['w'], MK['lockup']['h']
CHEV_L = '<svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" focusable="false"><path d="M10.5 2.5 5 8l5.5 5.5" fill="none" stroke="currentColor" stroke-width="1.4"/></svg>'
CHEV_R = '<svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" focusable="false"><path d="M5.5 2.5 11 8l-5.5 5.5" fill="none" stroke="currentColor" stroke-width="1.4"/></svg>'
FAV = "data:image/svg+xml," + f"%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='-40 -40 {HHW + 80} {HHH + 80}'%3E%3Crect x='-40' y='-40' width='{HHW + 80}' height='{HHH + 80}' fill='%23F9F7F6'/%3E%3Cpath fill='%23962122' d='{HH.replace(' ', '%20')}'/%3E%3C/svg%3E"

# ------------------------------------------------------------------ head and header
def head():
    title = 'Wedding planner in Antwerp, here and abroad | Honey it’s Handled'
    desc = 'Tell Elise your date and she’ll handle the rest. Wedding planning in Antwerp and abroad, full planning, partial planning or the day itself, and a launch offer for the first couples marrying in 2027 or 2028.'
    return f'''<!doctype html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{esc(title)}</title>
<meta name="description" content="{esc(desc)}">
<meta name="robots" content="noindex, nofollow">
<meta name="theme-color" content="#F9F7F6">
<link rel="icon" href="{FAV}">
<link rel="preload" href="/fonts/noto-serif-display-latin-standard-italic.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/noto-serif-display-latin-standard-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/mona-sans-latin-standard-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/media/fibre.jpg" as="image" fetchpriority="high">
<link rel="stylesheet" href="/css/site.css">
<script>(function(h){{h.classList.add('js');try{{if(matchMedia('(prefers-reduced-motion: reduce)').matches)h.classList.add('rm')}}catch(e){{}}}})(document.documentElement)</script>
</head>
<body>
<canvas class="paper" id="paper" aria-hidden="true"></canvas>
<a class="skip" href="#main">Skip to content</a>
<aside class="note" aria-label="About this site">Prototype by Astra agency for Honey it’s Handled. Not the live site, nothing is sent.</aside>
<header class="hdr" data-hdr><div class="hdr-in">
<a class="logo" href="#top" aria-label="Honey it’s Handled, back to the top">{svg_mark(WORD, WW, WH, 'word')}</a>
<nav class="nav" aria-label="Main"><button class="mbtn" type="button" aria-expanded="false" aria-controls="mnav">Menu</button><div class="nl" id="mnav"><a href="#year">Weddings</a><a href="#nights">Events</a><a href="#elise">About</a><a href="#letter" class="nl-cta">Tell me everything</a></div><a class="btn hbtn" href="#letter" data-cta>Tell me everything</a></nav>
</div></header>
<main id="main">
'''

# ------------------------------------------------------------------ hero
def envelope(date):
    return f'''<div class="env" data-env aria-hidden="true">
  <div class="env-shadow"></div>
  <div class="env-back"></div>
  <div class="card">
    <div class="card-in">
      {svg_mark(LOCK, LW, LH, 'card-lock')}
      <p class="card-s">You say I do</p>
      <p class="card-d" data-o="cardDate">{D_cardDate(date)}</p>
      <p class="card-s r">I’ll handle the rest.</p>
    </div>
  </div>
  <div class="env-front"><svg class="env-folds" viewBox="0 0 400 300" preserveAspectRatio="none" focusable="false"><path d="M0 300 L188 176 M400 300 L212 176" fill="none" vector-effect="non-scaling-stroke"/></svg></div>
  <div class="env-flap"><div class="flap-out"></div><div class="flap-in"></div></div>
  <div class="seal"><svg viewBox="-90 -90 {HHW + 180} {HHH + 180}" focusable="false"><path class="seal-b" d="{HH}"/><path class="seal-f" fill-rule="evenodd" d="{HH}"/></svg></div>
</div>'''

def D_cardDate(d): return f'{d.day} {MO[d.month - 1]} {d.year}'

def hero():
    n = days_to(DEF)
    return f'''<section class="hero" id="top" data-act="0" aria-labelledby="h-when">
  <div class="wrap hero-g">
    <div class="hero-t">
      <p class="lab">Wedding planner in Antwerp, here and abroad</p>
      <h1 id="h-when" class="h1">When’s your I&nbsp;do?</h1>
      <div class="when" data-when>
        <p class="when-wd" data-o="weekday">{WD[DEF.weekday()]}</p>
        <p class="when-big" data-o="dateBig" data-drag aria-live="polite">{D_cardDate(DEF)}</p>
        <div class="when-ctl">
          <button class="ib" type="button" data-step="-1" aria-label="A week earlier">{CHEV_L}</button>
          <label class="pick"><span>Pick your date</span><input type="date" data-f="date" value="{DEF.isoformat()}" min="{D['minDate']}" max="{D['maxDate']}"></label>
          <button class="ib" type="button" data-step="1" aria-label="A week later">{CHEV_R}</button>
          <button class="tb" type="button" data-nodate aria-pressed="false">No date yet</button>
        </div>
        <p class="when-sub mono" data-o="dateSub">{n} days from today</p>
      </div>
      <div class="hero-act">
        <a class="btn solid" href="#letter" data-cta data-hero-cta>Tell me everything</a>
        <p class="offer-line" data-o="offerLine">Saying I do in 2027 or 2028? Be one of the first couples, with an exclusive launch offer.</p>
      </div>
    </div>
    <div class="hero-o">{envelope(DEF)}</div>
  </div>
</section>'''

# ------------------------------------------------------------------ the year, your days drawn as her HH
def year():
    n = days_to(DEF)
    steps = ''.join(f'<li data-stepi="{i}"{" class=is-on" if i == 0 else ""}><b>{s["name"]}</b><span>{s["line"]}</span></li>' for i, s in enumerate(D['steps']))
    sw = ''.join(f'<button type="button" data-help="{s["id"]}" aria-pressed="{"true" if s["id"] == "full" else "false"}">{s["name"]}</button>' for s in D['services'])
    notes = ''.join(f'<li data-note="{i}"><span>{x["t"]}</span></li>' for i, x in enumerate(D['details']))
    return f'''<section class="year" id="year" data-act="1" aria-labelledby="h-year">
  <script>(function(s){{var h=document.documentElement;if(!h.classList.contains('rm'))s.classList.add('is-live')}})(document.currentScript.parentNode)</script>
  <div class="year-run">
  <div class="year-stick">
    <div class="wrap year-g">
      <div class="year-t">
        <p class="lab">Something blue</p>
        <h2 id="h-year" class="h2">I think ahead, so you don’t have to.</h2>
        <p class="count"><span class="count-n" data-o="days">{n}</span><span class="count-l">days from today to <span data-o="dateShort">{long_date(DEF)}</span>, every one of them drawn here</span></p>
        <p class="inkday mono" data-o="inkDay">One stroke for each of the {n} days</p>
        <ol class="steps" aria-label="How the planning runs">{steps}</ol>
        <div class="sw3" role="group" aria-label="How much you’d like handled">{sw}</div>
      </div>
      <div class="year-art">
        <div class="days-box">
          <svg class="days-static" viewBox="0 0 {HHW} {HHH}" aria-hidden="true" focusable="false"><defs><pattern id="hatch" width="22" height="22" patternUnits="userSpaceOnUse" patternTransform="rotate(16)"><path d="M6 0v16" stroke="#962122" stroke-width="7" stroke-linecap="round"/></pattern></defs><path d="{HH}" fill="url(#hatch)" fill-rule="evenodd"/><path d="{HH}" fill="none" stroke="#962122" stroke-opacity=".35" stroke-width="1.5"/></svg>
          <canvas class="days" data-days aria-hidden="true"></canvas>
          <ul class="notes" aria-label="Details Elise handles">{notes}</ul>
        </div>
        <p class="days-key"><span class="k-her">Days Elise carries</span><span class="k-you">Days you carry</span></p>
      </div>
    </div>
  </div>
  </div>
  <div class="wrap help">
    <p class="help-line" data-o="helpLine">{SVC['full']['line']}</p>
    <p class="fine">The drawing has one stroke for every day from today to your date. Where Elise steps in on a partial plan or for the day itself is agreed with you, the split shown for those is an example.</p>
    <a class="btn solid" href="#letter" data-cta>Tell me everything</a>
  </div>
</section>'''

# ------------------------------------------------------------------ the hall, how many guests
def hall_layout():
    """Round tables of ten, seen from above, in staggered rows like the overhead photo of the Handelsbeurs."""
    cols, rows = 10, 6
    W, Hh = 1000, 760
    tables = []
    for r in range(rows):
        for c in range(cols):
            x = 60 + c * 96 + (48 if r % 2 else 0)
            y = 78 + r * 124
            if x > W - 50: x -= 96 * cols - 0  # never happens with these numbers
            tables.append((x, y))
    return W, Hh, tables

def hall():
    W, Hh, tables = hall_layout()
    per = D['guests']['perTable']
    g = D['guests']['default']
    seats, tops = [], []
    seat_xy = []
    for ti, (x, y) in enumerate(tables):
        tops.append(f'<circle class="tt" cx="{x}" cy="{y}" r="24"/>')
        for k in range(per):
            a = -math.pi / 2 + k * 2 * math.pi / per
            sx, sy = x + 35 * math.cos(a), y + 35 * math.sin(a)
            i = ti * per + k
            seat_xy.append((sx, sy))
            seats.append(f'<circle class="st{" is-on" if i < g else ""}" cx="{sx:.1f}" cy="{sy:.1f}" r="6"/>')
    def mark(n, label, sub, cls, side):
        tx, ty = tables[(n - 1) // per]
        lx = tx + (70 if side > 0 else -70)
        return (f'<g class="mk {cls}"><circle cx="{tx}" cy="{ty}" r="46" class="mk-ring"/>'
                f'<text x="{tx}" y="{ty - 55}" text-anchor="middle" class="mk-t">{esc(label)}</text></g>')
    cc, pr = D['nights']['cinco'], D['nights']['pro']
    marks = mark(cc['guests'], f'Cinco Cero, {cc["guests"]}', 'a 50th birthday', 'mk-cc', 1) + mark(pr['guests'], f'Pro League Awards, {pr["guestsText"]}', 'an award show', 'mk-pl', -1)
    return W, Hh, ''.join(tops), ''.join(seats), marks

def compare(g):
    cc, pr = D['nights']['cinco']['guests'], D['nights']['pro']['guests']
    if g < cc - 10: return f'{g} guests. A little smaller than Cinco Cero’s {cc}.'
    if g <= cc + 10: return f'{g} guests. About the size of Cinco Cero, {cc}.'
    if g < pr: return f'{g} guests. More than Cinco Cero’s {cc}, fewer than the {D["nights"]["pro"]["guestsText"]} at the Pro League Awards.'
    return f'{g} guests. The size of the Pro League Awards, {D["nights"]["pro"]["guestsText"]}.'

def nights():
    W, Hh, tops, seats, marks = hall()
    g = D['guests']
    cc, pr, q = D['nights']['cinco'], D['nights']['pro'], D['quote']
    used.update(['night.webm', 'night.mp4', 'night-poster.jpg', 'hh-mask.svg'])
    return f'''<section class="hall" id="nights" data-act="1" aria-labelledby="h-hall">
  <div class="wrap hall-g">
    <div class="hall-t">
      <h2 id="h-hall" class="h2">How many people are coming?</h2>
      <div class="gnum"><output class="gnum-n" data-o="guests" data-gdrag>{g['default']}</output><span class="gnum-l">guests</span></div>
      <label class="rng"><span class="sr">Number of guests</span><input type="range" min="{g['min']}" max="{g['max']}" step="5" value="{g['default']}" data-f="guests" aria-valuetext="{g['default']} guests"></label>
      <div class="sw2" role="group" aria-label="Where you’re getting married"><button type="button" data-place="local" aria-pressed="true">Here in Belgium</button><button type="button" data-place="destination" aria-pressed="false">Somewhere abroad</button></div>
      <p class="hall-read" data-o="hallRead">{compare(g['default'])}</p>
    </div>
    <figure class="hall-fig">
      <svg class="hall-svg" viewBox="0 0 {W} {Hh}" role="img" aria-label="A hall of round tables seen from above, ten seats to a table, with your guests filled in and Elise’s two nights marked" focusable="false"><g class="tops">{tops}</g><g class="seats" data-seats>{seats}</g>{marks}</svg>
      <figcaption><span class="hk"><i class="hk-you"></i>Your guests, ten to a table</span><span class="hk"><i class="hk-ring"></i>Ringed, the tables where Cinco Cero’s {cc['guests']} guests and the Pro League Awards’ {pr['guestsText']} would end</span></figcaption>
    </figure>
  </div>
  <div class="wrap nights">
    <article class="night cc" aria-labelledby="h-cc">
      <div class="night-film" data-film>
        <div class="film-box"><div class="film-mask"><video muted loop playsinline preload="none" aria-hidden="true" tabindex="-1"><source src="/media/night.webm" type="video/webm"><source src="/media/night.mp4" type="video/mp4"></video><img class="film-still" src="/media/night-poster.jpg" width="960" height="540" alt="" loading="lazy" decoding="async"></div>
        <svg class="film-line" viewBox="0 0 {HHW} {HHH}" aria-hidden="true" focusable="false"><path d="{HH}" fill="none" vector-effect="non-scaling-stroke"/></svg></div>
        <p class="film-cap mono">Cinco Cero, from the aftermovie</p>
      </div>
      <div class="night-b">
        <p class="lab">{cc['kind']} · {cc['dateText']}</p>
        <h3 id="h-cc" class="h3">{cc['name']}</h3>
        <p class="night-n"><span class="nn">{cc['guests']}</span> guests</p>
        <p>{cc['line']}</p>
        <figure class="night-q">{pic('cc-sign', 'The Cinco Cero sign on an easel against a brick wall, two candles at its foot', '(max-width: 760px) 40vw, 220px')}<blockquote><p>“{q['text']}.”</p><footer>{q['who']}</footer></blockquote></figure>
      </div>
    </article>
    <article class="night pl" aria-labelledby="h-pl">
      <div class="night-ph">
        <figure class="ph-tall">{pic('pl-hall', 'The iron and glass roof and the carved galleries of the Handelsbeurs in Antwerp', '(max-width: 760px) 92vw, 420px')}</figure>
        <figure class="ph-sq">{pic('pl-above', 'Round tables laid for dinner in the Handelsbeurs, seen from above in shafts of light', '(max-width: 760px) 60vw, 300px')}</figure>
      </div>
      <div class="night-b">
        <p class="lab">{pr['kind']} · {pr['dateText']}</p>
        <h3 id="h-pl" class="h3">{pr['name']}</h3>
        <p class="night-n"><span class="nn">{pr['guestsText']}</span> guests</p>
        <p>{pr['text']}</p>
        <p class="credit">Photos by Kaat DM.</p>
      </div>
    </article>
    <p class="other">Planning a birthday, a dinner or a company night? <a href="#letter" data-celebrate="Private Event">Tell me about it</a></p>
  </div>
</section>'''

# ------------------------------------------------------------------ Elise
def elise():
    e = D['elise']
    tabs = ''.join(f'<i style="--t:{i}"></i>' for i in range(17))
    more = ''.join(f'<li><b>{a}</b><span>{b}</span></li>' for a, b in e['more'])
    return f'''<section class="elise" id="elise" data-act="1" aria-labelledby="h-elise">
  <div class="wrap elise-g">
    <div class="elise-ph"><figure class="elise-ph1">{pic('elise-play', 'Elise Laeven with a book on her head, a glass, a shoe and a laptop in her hands', '(max-width: 760px) 92vw, 520px')}</figure>
    <figure class="elise-ph2">{pic('elise-phone', 'Elise Laeven on her phone, a gold notebook under her arm', '(max-width: 760px) 40vw, 230px')}</figure></div>
    <div class="elise-t">
      <p class="lab">Meet Elise</p>
      <h2 id="h-elise" class="h2">The person behind the handled.</h2>
      <p class="lead">{e['lines'][0]}</p>
      <p>{e['lines'][1]}</p>
      <p>{e['lines'][2]}</p>
      <div class="planner" aria-label="A little more Elise" role="group"><div class="tabs" aria-hidden="true">{tabs}</div><ul>{more}</ul></div>
    </div>
  </div>
</section>'''

# ------------------------------------------------------------------ the day, in red, and the launch offer
def day():
    o = D['offer']
    return f'''<section class="day" id="day" data-act="2" aria-labelledby="h-day">
  <div class="day-deboss" aria-hidden="true"><svg viewBox="-30 -30 {HHW + 60} {HHH + 60}" focusable="false"><path fill-rule="evenodd" d="{HH}" filter="url(#deboss)"/><defs><filter id="deboss" x="-10%" y="-10%" width="120%" height="120%"><feFlood flood-color="#4d0c0e" flood-opacity=".75" result="d"/><feComposite in="d" in2="SourceAlpha" operator="out" result="o"/><feGaussianBlur in="o" stdDeviation="5" result="ob"/><feOffset in="ob" dx="7" dy="9" result="os"/><feComposite in="os" in2="SourceAlpha" operator="in" result="sh"/><feFlood flood-color="#c4474a" flood-opacity=".55" result="l"/><feComposite in="l" in2="SourceAlpha" operator="out" result="lo"/><feGaussianBlur in="lo" stdDeviation="3" result="lb"/><feOffset in="lb" dx="-4" dy="-5" result="ls"/><feComposite in="ls" in2="SourceAlpha" operator="in" result="hl"/><feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="sh"/><feMergeNode in="hl"/></feMerge></filter></defs></svg></div>
  <div class="wrap day-in">
    <span class="drop" data-drop aria-hidden="true"></span>
    <p class="lab">Something red</p>
    <h2 id="h-day" class="h-moment">The details are mine, the moment is yours.</h2>
    <p class="day-date" data-o="dateLong">{long_date(DEF)}</p>
    <p class="day-cta"><a class="btn light" href="#letter" data-cta>Tell me everything</a></p>
  </div>
  <div class="wrap offer-g">
    <figure class="offer-ph">{pic('env-tiles', 'A Honey it’s Handled sticker of a red envelope and a cream card, on red tiles', '(max-width: 760px) 70vw, 420px')}</figure>
    <div class="offer">
      <p class="lab">Exclusive launch offer</p>
      <h3 class="h3">{o['title']}</h3>
      <p>{o['text']}</p>
      <label class="chk"><input type="checkbox" data-f="first" checked><span>We’d like to be one of the first couples</span></label>
      <p class="offer-note" data-o="offerNote" hidden>The launch offer is for weddings in 2027 or 2028.</p>
      <a class="btn light" href="#letter" data-cta>Tell me everything</a>
    </div>
  </div>
</section>'''

# ------------------------------------------------------------------ the letter
def letter():
    f = D['form']
    cel = ''.join(f'<option{" selected" if c == "Wedding" else ""}>{c}</option>' for c in f['celebrating'])
    found = '<option value="">Select an option</option>' + ''.join(f'<option>{c}</option>' for c in f['found'])
    nxt = ''.join(f'<li><b>{a}</b><span>{b}</span></li>' for a, b in D['next'])
    msg = message(DEF, 'local', D['guests']['default'], 'full', True)
    c = D['contact']
    return f'''<section class="letter" id="letter" data-act="2" aria-labelledby="h-letter">
  <div class="wrap letter-g">
    <div class="letter-t">
      <h2 id="h-letter" class="h2">Tell me everything.</h2>
      <p>The date, the place, the people, the Pinterest board, I want to hear it all. It’s already written from what you chose above, so change anything you like.</p>
      <p class="sign">Can’t wait to hear from you, Elise</p>
    </div>
    <div class="letter-w">
    <form class="lform" data-letter novalidate>
      <div class="two"><label class="fld"><span>First name</span><input name="first" autocomplete="given-name" required></label>
      <label class="fld"><span>Last name</span><input name="last" autocomplete="family-name" required></label></div>
      <div class="two"><label class="fld"><span>Email address</span><input name="email" type="email" autocomplete="email" required></label>
      <label class="fld"><span>Phone <em>optional</em></span><input name="phone" type="tel" autocomplete="tel"></label></div>
      <label class="fld"><span>What are we celebrating?</span><select name="celebrating" data-f="celebrating" required>{cel}</select></label>
      <label class="fld"><span>Tell me everything</span><textarea name="message" rows="5" required data-f="message">{msg}</textarea></label>
      <button class="rewrite" type="button" data-rewrite hidden>Write it again from my choices</button>
      <label class="fld"><span>How did you find Honey, it’s Handled? <em>optional</em></span><select name="found">{found}</select></label>
      <p class="err" data-err role="alert" hidden></p>
      <button class="btn solid send" type="submit">Consider it handled</button>
      <p class="fine">This prototype sends nothing. On the live site your letter goes straight to Elise.</p>
    </form>
    <div class="post" data-post hidden>
      <div class="post-env" aria-hidden="true">{envelope(DEF).replace('data-env', 'data-env2').replace('data-o="cardDate"', 'data-o="cardDate2"')}</div>
      <div class="post-t" tabindex="-1" data-post-t>
        <h3 class="h3">Consider it handled.</h3>
        <p data-o="postLine">Your letter is sealed. Elise will be in touch.</p>
        <ol class="next">{nxt}</ol>
        <p class="fine"><a data-mail href="mailto:{c['email']}">Or send it from your own email</a></p>
      </div>
    </div>
    </div>
  </div>
</section>'''

# ------------------------------------------------------------------ bar and footer
def bar():
    return f'''<aside class="sbar" data-sbar aria-label="Your wedding so far" aria-hidden="true"><div class="sbar-in"><p><b data-o="barDate">{short_date(DEF)}</b><span class="sbar-sep"> · </span><span data-o="barRest">{D['guests']['default']} guests · Full planning</span></p><a class="btn solid" href="#letter" tabindex="-1">Tell me everything</a></div></aside>'''

def foot():
    c = D['contact']
    return f'''</main>
<footer class="ftr" data-act="2"><div class="wrap">
<div class="ftr-lock">{svg_mark(LOCK, LW, LH, 'lock', "Honey it’s Handled, wedding and event agency")}</div>
<div class="ftr-g">
<p><span>Prefer email?</span><a href="mailto:{c['email']}">{c['email']}</a></p>
<p><span>Rather call?</span><a href="tel:{c['phoneHref']}">{c['phone']}</a></p>
<p><span>Follow along</span><a href="{c['instagram']}" rel="noopener">Instagram</a> <a href="{c['linkedin']}" rel="noopener">LinkedIn</a></p>
</div>
<p class="base">© 2026 Honey it’s Handled, Elise Laeven, Antwerp. Company number {c['kbo']}. Pro League Awards photos by Kaat DM. Prototype by Astra agency, October 2026. Nothing on this page is sent.</p>
</div></footer>
{bar()}
<script src="/js/site.js" defer></script>
<script src="/js/art.js" defer></script>
</body></html>'''

def page():
    return head() + hero() + year() + nights() + elise() + day() + letter() + foot()

# ------------------------------------------------------------------ write
def build():
    if os.path.isdir(OUT): shutil.rmtree(OUT)
    os.makedirs(OUT)
    html = page()
    data = {'today': D['built'], 'defaultDate': D['defaultDate'], 'offerYears': D['offerYears'], 'minDate': D['minDate'], 'maxDate': D['maxDate'],
            'guests': D['guests'], 'services': D['services'], 'steps': D['steps'], 'details': D['details'],
            'nights': {k: {'guests': v['guests'], 'name': v['name'], 'guestsText': v.get('guestsText', str(v['guests']))} for k, v in D['nights'].items()},
            'email': D['contact']['email'], 'hh': HH, 'hhW': HHW, 'hhH': HHH}
    html = html.replace('</main>', '<script type="application/json" id="hih-data">' + json.dumps(data, ensure_ascii=False).replace('</', '<\\/') + '</script>\n</main>', 1)
    open(os.path.join(OUT, 'index.html'), 'w').write(html)
    for d in ('css', 'js', 'fonts'):
        shutil.copytree(os.path.join(B, d), os.path.join(OUT, d))
    os.makedirs(os.path.join(OUT, 'media'))
    # the HH as a mask for the film
    open(os.path.join(B, 'media', 'hh-mask.svg'), 'w').write(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {HHW} {HHH}"><path fill="#fff" fill-rule="evenodd" d="{HH}"/></svg>')
    for f in sorted(used): shutil.copy(os.path.join(B, 'media', f), os.path.join(OUT, 'media', f))
    open(os.path.join(OUT, 'robots.txt'), 'w').write('User-agent: *\nDisallow: /\n')
    open(os.path.join(OUT, 'netlify.toml'), 'w').write('[[headers]]\n  for = "/*"\n  [headers.values]\n    X-Robots-Tag = "noindex, nofollow"\n')
    open(os.path.join(OUT, '404.html'), 'w').write('<!doctype html><html lang="en-GB"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex"><title>Not here | Honey it’s Handled</title><link rel="icon" href="' + FAV + '"><style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#F9F7F6;color:#962122;font:300 clamp(28px,5vw,56px)/1.1 Georgia,serif;text-align:center;padding:24px}a{color:#333;font:14px/1.4 system-ui,sans-serif;display:block;margin-top:20px}</style></head><body><div>This page isn’t here.<a href="/">Back to the start</a></div></body></html>')
    # checks, every local reference exists and every in page anchor has its target
    refs = re.findall(r'(?:src|href|poster)="(/[^"#?]+)"', html) + [x.split()[0] for t in re.findall(r'srcset="([^"]+)"', html) for x in t.split(', ')]
    for r in refs:
        assert os.path.exists(os.path.join(OUT, r.lstrip('/'))), r
    css = open(os.path.join(OUT, 'css', 'site.css')).read()
    for r in re.findall(r'url\((/[^)]+)\)', css):
        assert os.path.exists(os.path.join(OUT, r.lstrip('/'))), r
    for ref in re.findall(r'href="#([\w-]+)"', html):
        assert f'id="{ref}"' in html, ref
    assert '[[' not in html
    h = hashlib.sha256()
    for dp, dn, fn in sorted(os.walk(OUT)):
        for f in sorted(fn): h.update(open(os.path.join(dp, f), 'rb').read())
    print('built', OUT, len(used), 'media files', 'hash', h.hexdigest()[:16])

if __name__ == '__main__':
    build()
