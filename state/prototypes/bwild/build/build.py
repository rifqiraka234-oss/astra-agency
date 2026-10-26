"""BWILD prototype, v2. One page that follows the light of a run, first light to night and the next dawn, runs the
Luminous Vest launch and sells the Adventure Vest. Writes ../site. Every product line, price and number comes from
data/site.json (read on their pages 26 Oct 2026). Their words are quoted as they wrote them. The daylight numbers are
worked out here with astral for the page as it loads without script, and again live in js/site.js.
The art is theirs, the bear traced from the last frame of their brand film (art/trace_bear.py), the three claw slashes
from their logo, the ridge from the opening of their brand film (art/make_shapes.py). v1 is kept in art/build-v1.py."""
import datetime, html as H, json, os, re, shutil
from zoneinfo import ZoneInfo
from astral import Observer
from astral.sun import sunrise, sunset

B = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(B, '..', 'site')
D = json.load(open(os.path.join(B, 'data', 'site.json')))
MAN = json.load(open(os.path.join(B, 'data', 'media.json')))
SLASH = open(os.path.join(B, 'art', 'slashes.paths')).read().split('\n')
def _path(name):
    wh, d = open(os.path.join(B, 'art', name + '.path')).read().split('\n', 1)
    w, h = (int(float(x)) for x in wh.split()); return w, h, d
BEAR, WORD = _path('bear'), _path('wordmark')
RIDGE = json.load(open(os.path.join(B, 'art', 'ridge.json')))['y']
AD, LU, VIS = D['adventure'], D['luminous'], D['visibility']
used = set()

def esc(s): return H.escape(s, quote=True)
def eur(c): return '€{:,.0f}'.format(c / 100) if c % 100 == 0 else '€{:,.2f}'.format(c / 100)
def hm(m): return '{:02d}.{:02d}'.format(int(m) // 60, int(m) % 60)

# ------------------------------------------------------------------ daylight, the same rule as the page script
def city(cid): return next(c for c in D['cities'] if c['id'] == cid)

def day_minutes(c, d):
    tz = ZoneInfo(c['tz']); ob = Observer(c['lat'], c['lon'])
    r = sunrise(ob, d, tzinfo=tz); s = sunset(ob, d, tzinfo=tz)
    return r.hour * 60 + r.minute + r.second / 60, s.hour * 60 + s.minute + s.second / 60

def year_of(cid, t, start):
    c = city(cid); out = []
    for i in range(365):
        d = start + datetime.timedelta(days=i)
        r, s = day_minutes(c, d)
        out.append((d, r, s, t < r or t > s))
    return out

TODAY = datetime.datetime.now(ZoneInfo('Europe/Zurich')).date()
DEF_CITY, DEF_T = 'geneva', D['picks']['sunrise']
YEAR = year_of(DEF_CITY, DEF_T, TODAY)
DARK_N = sum(1 for x in YEAR if x[3])

def fmt_day(d): return '{} {}'.format(d.day, d.strftime('%B'))

def streak(year):
    best, cur, bs, cs = 0, 0, None, None
    for i, x in enumerate(year):
        if x[3]:
            if cur == 0: cs = i
            cur += 1
            if cur > best: best, bs = cur, cs
        else: cur = 0
    return best, bs

def dur(m):
    m = int(round(m)); h, mm = divmod(m, 60)
    if h and mm: return f'{h} {"hour" if h == 1 else "hours"} {mm} {"minute" if mm == 1 else "minutes"}'
    if h: return f'{h} {"hour" if h == 1 else "hours"}'
    return f'{mm} {"minute" if mm == 1 else "minutes"}'

def sky_line(cid, t):
    c = city(cid); r, s = day_minutes(c, TODAY); rm, sm = round(r), round(s)
    if t < r: return f'Today in {c["name"]} the sun rises at {hm(rm)}, so a {hm(t)} run starts {dur(rm - t)} before it, in the dark.'
    if t > s: return f'Today in {c["name"]} the sun sets at {hm(sm)}, so a {hm(t)} run starts {dur(t - sm)} after it, in the dark.'
    nxt = next((x[0] for x in YEAR if x[3]), None)
    return f'Today in {c["name"]} a {hm(t)} run is in daylight.' + (f' From {fmt_day(nxt)} it won’t be.' if nxt else '')

# ------------------------------------------------------------------ the stars, one per run that starts in the dark
SKY_W, SKY_H = 1440, 900
# where the stars go on a 1440 by 900 screen, right of the words and above the ridge. js/site.js lays them out the same
# way in real pixels, and on a phone in a band above the words.
SX0, SX1, SY0, SY1 = .5 * SKY_W, .96 * SKY_W, .17 * SKY_H, .6 * SKY_H
def hsh(i, k):
    """The same hash as js/site.js, IEEE doubles on both sides, so the no script page and the live page agree."""
    import math
    v = math.sin(i * 12.9898 + k * 78.233) * 43758.5453
    return v - math.floor(v)
def star_xy(i, m):
    """Day i across the sky from today to a year on, higher the deeper in the dark the run starts. The jitter is seeded
    by the day with hsh(), the same rule as js/site.js, so a star keeps its place when the run changes."""
    x = SX0 + i / 364 * (SX1 - SX0) + (hsh(i, 1) - .5) * 22
    y = SY1 - min(m, 150) / 150 * (SY1 - SY0) + (hsh(i, 2) - .5) * 70
    r = 1.1 + min(m, 90) / 90 * 2.1
    return x, y, r

def stars_svg():
    out = []
    for i, (d, r, s, dark) in enumerate(YEAR):
        m = (r - DEF_T) if DEF_T < r else (DEF_T - s) if DEF_T > s else 0
        x, y, rr = star_xy(i, m if dark else 0)
        out.append(f'<circle class="{"on" if dark else ""}" cx="{x:.1f}" cy="{y:.1f}" r="{rr:.2f}" style="--d:{(i * 37 % 100) / 100:.2f}"/>')
    months = ''.join(f'<text x="{SX0 + i / 364 * (SX1 - SX0):.0f}" y="{SY0 - 26:.0f}" data-i="{i}">{x[0].strftime("%b")}</text>' for i, x in enumerate(YEAR) if x[0].day == 1)
    return ''.join(out), months

def ridge_paths():
    """Their mountain is the front layer on the right, rising to its peak as in their film. Two lower ranges behind it."""
    n = len(RIDGE)
    front = 'M0 900 L0 738 ' + ' '.join(f'L{560 + i / (n - 1) * 880:.1f} {598 + y * 190:.1f}' for i, y in enumerate(RIDGE)) + ' L1440 900 Z'
    import math
    def back(base, amp, f1, f2, ph):
        pts = ' '.join(f'L{x:.0f} {base - amp * (0.55 * math.sin(x / f1 + ph) + 0.3 * math.sin(x / f2 + ph * 2.1) + 0.15 * math.sin(x / 37 + ph)):.1f}' for x in range(0, 1441, 24))
        return f'M0 900 {pts} L1440 900 Z'
    return back(640, 70, 210, 97, .7), back(700, 54, 160, 71, 2.3), front

# ------------------------------------------------------------------ pictures and films
def pic(key, alt, sizes='100vw', cls='', eager=False, attrs=''):
    m = MAN[key]; ss = m['sizes']; ext = 'png' if m.get('alpha') else 'jpg'
    for w, _ in ss: used.update([f'{key}-{w}.webp', f'{key}-{w}.{ext}'])
    ws = ', '.join(f'/media/{key}-{w}.webp {w}w' for w, _ in ss)
    js = ', '.join(f'/media/{key}-{w}.{ext} {w}w' for w, _ in ss)
    w, h = ss[-1]
    load = 'eager" fetchpriority="high' if eager else 'lazy'
    c = f' class="{cls}"' if cls else ''
    return f'<picture><source type="image/webp" srcset="{ws}" sizes="{sizes}"><img{c} src="/media/{key}-{ss[0][0]}.{ext}" srcset="{js}" sizes="{sizes}" width="{w}" height="{h}" alt="{esc(alt)}" loading="{load}" decoding="async"{attrs}></picture>'

# the codecs named, so a browser that can't play one never fetches it. High profile, level 3.1 covers every film here
TYPE = {'mp4': 'video/mp4; codecs=&quot;avc1.64001F&quot;', 'webm': 'video/webm; codecs=&quot;vp9&quot;'}

def by_size(key):
    """Their film in both codecs, the smaller file first, since a browser takes the first one it can play."""
    fs = [(os.path.getsize(os.path.join(B, 'media', f'{key}.{x}')), x) for x in ('webm', 'mp4')]
    return [x for _, x in sorted(fs)]

def film(key, label='', cls='', attrs=''):
    """Their own film. The still frame and the film both wait until it comes near the screen (js/site.js), and it only
    plays on screen, never under reduced motion or data saver."""
    used.update([f'{key}.mp4', f'{key}.webm', f'{key}-poster.jpg'])
    m = MAN['film-' + key]
    aria = f' aria-label="{esc(label)}"' if label else ' aria-hidden="true"'
    src = ''.join(f'<source data-src="/media/{key}.{x}" type="{TYPE[x]}">' for x in by_size(key))
    return (f'<video class="film{(" " + cls) if cls else ""}" muted loop playsinline preload="none" data-poster="/media/{key}-poster.jpg" '
            f'width="{m["w"]}" height="{m["h"]}" data-film{attrs}{aria}>{src}</video>')

def slashes(cls='', inner=''):
    paths = ''.join(f'<path d="{d}"/>' for d in SLASH)
    return f'<svg class="sl {cls}" viewBox="0 0 268 340" aria-hidden="true" focusable="false">{inner}{paths}</svg>'

def bear(cls=''):
    w, h, d = BEAR
    return f'<svg class="bear {cls}" viewBox="0 0 {w} {h}" aria-hidden="true" focusable="false"><path d="{d}"/></svg>'

def wordmark(cls=''):
    w, h, d = WORD
    return f'<svg class="wm {cls}" viewBox="0 0 {w} {h}" aria-hidden="true" focusable="false"><path d="{d}"/></svg>'

LOGO = '<span class="logo-w">' + pic('logo', 'BWILD', '160px', eager=True) + '</span>'
FAV = ("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' fill='%2308090B'/%3E"
       "%3Cpath d='M20 50 L30 12 L33 12 L24 50Z M30 54 L42 8 L45 8 L34 54Z M40 50 L50 14 L53 14 L44 50Z' fill='%23fff'/%3E%3C/svg%3E")
MINUS = '<svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" focusable="false"><path d="M2 8h12" stroke="currentColor" stroke-width="1.8"/></svg>'
PLUS = '<svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" focusable="false"><path d="M2 8h12M8 2v12" stroke="currentColor" stroke-width="1.8"/></svg>'
PIN = '<svg class="pin" viewBox="0 0 60 18" aria-hidden="true" focusable="false"><path d="M6 9h44a5 5 0 1 0 0-.01" fill="none" stroke="#9aa0a8" stroke-width="2.2"/><path d="M6 9c0-3 2-5 5-5h4" fill="none" stroke="#c7ccd2" stroke-width="2.2"/><circle cx="6" cy="9" r="3.4" fill="#b9bec5"/></svg>'

# ------------------------------------------------------------------ page
def head():
    return f'''<!doctype html>
<html lang="en-GB" data-sky="dawn">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>BWILD | Dare to live. The Luminous Vest and the Adventure Vest</title>
<meta name="description" content="The BWILD Luminous Vest, reflective all the way round. Reserve for €1 and lock 30% off at the Kickstarter launch. The Adventure Vest is on sale now, €98.">
<meta name="robots" content="noindex, nofollow">
<meta name="theme-color" content="#120E1F">
<link rel="icon" href="{FAV}">
<link rel="preload" href="/fonts/mona-sans-latin-standard-italic.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/mona-sans-latin-standard-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/media/gold-poster.jpg" as="image" fetchpriority="high">
<link rel="stylesheet" href="/css/site.css">
<script>document.documentElement.classList.add('js');if(matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('rm')</script>
</head>
<body>
<canvas class="sky" id="sky" aria-hidden="true"></canvas>
<div class="grain" aria-hidden="true"></div>
<a class="skip" href="#main">Skip to content</a>
<aside class="note" aria-label="About this site">Prototype by Astra agency for BWILD. Not the live site, nothing is charged or sent.</aside>
<header class="hdr" data-hdr><div class="wrap hdr-in">
<a class="logo" href="#run" aria-label="BWILD, back to the top">{LOGO}</a>
<nav aria-label="Main"><button class="mbtn" type="button" aria-expanded="false" aria-controls="mnav">Menu</button><div class="nl" id="mnav"><a href="#seen">Luminous Vest</a><a href="#adventure">Adventure Vest</a><a href="#story">Our story</a><a href="#faq">FAQ</a></div>
<button class="cart-b" type="button" data-cart-open aria-haspopup="dialog">Cart <span data-o="cartn">0</span></button>
<a class="btn solid sm" href="#reserve">Reserve €1</a></nav>
</div></header>
<main id="main">
'''

def hero():
    used.update(['claw-mask.svg'])
    return f'''<section class="hero" id="run" data-sky="dawn" data-goal="reserve" aria-labelledby="hero-h">
  <script>(function(s){{if(!document.documentElement.classList.contains('rm'))s.classList.add('live')}})(document.currentScript.parentNode)</script>
  <div class="hero-stick">
    <div class="claw" data-claw aria-hidden="true">
      <video class="claw-film" muted loop playsinline preload="none" poster="/media/gold-poster.jpg" width="1280" height="720" data-hero-film>{''.join(f'<source media="(max-width: 760px)" src="/media/gold-p.{x}" type="{TYPE[x]}">' for x in by_size('gold-p'))}{''.join(f'<source src="/media/gold.{x}" type="{TYPE[x]}">' for x in by_size('gold'))}</video>
      <i class="claw-edge"></i>
    </div>
    <div class="wrap hero-in" data-hero-copy>
      <p class="hero-k">The Luminous Vest <span>coming to Kickstarter</span></p>
      <h1 id="hero-h" class="shout">Dare<br>to live.</h1>
      <p class="hero-lede">Reflective all the way round, for every run that starts in the dark.</p>
      <div class="when" role="group" aria-label="When do you run?"><span class="when-q">When do you run?</span><button type="button" data-pick="sunrise" aria-pressed="true"><i class="sun-g" aria-hidden="true"></i>Sunrise</button><button type="button" data-pick="night" aria-pressed="false"><i class="moon-g" aria-hidden="true"></i>Night</button></div>
      <p class="when-line" data-o="skyline" aria-live="polite">{sky_line(DEF_CITY, DEF_T)}</p>
      <div class="buy"><a class="btn solid" href="#reserve" data-hero-cta>Reserve for {eur(LU["deposit"])}</a><p class="buy-p">{LU["discount"]}% off at launch.<br>Join {LU["runners"]} runners.</p></div>
      <p class="alt"><a href="#adventure">Or shop the Adventure Vest today, {eur(AD["price"])}</a></p>
    </div>
    <div class="hero-words" data-hero-words aria-hidden="true"><p class="shout">To choose courage over comfort.<br>To chase meaning over medals.</p><p class="by">Lupo, BWILD founder</p></div>
  </div>
</section>'''

def dark_scene():
    n = DARK_N; best, bs = streak(YEAR)
    stars, months = stars_svg()
    b1, b2, fr = ridge_paths()
    opts = ''.join(f'<option value="{x["id"]}"{" selected" if x["id"] == DEF_CITY else ""}>{x["name"]}</option>' for x in D['cities'])
    st = f'The longest stretch runs from {fmt_day(YEAR[bs][0])} to {fmt_day(YEAR[bs + best - 1][0])}, {best} runs in a row.' if best else ''
    return f'''<section class="dk" id="dark" data-sky="sundown" data-goal="reserve" aria-labelledby="dk-h">
  <script>(function(s){{if(!document.documentElement.classList.contains('rm'))s.classList.add('live')}})(document.currentScript.parentNode)</script>
  <div class="dk-stick">
    <svg class="dk-sky" viewBox="0 0 {SKY_W} {SKY_H}" data-starsky aria-hidden="true" focusable="false"><g class="dk-months" data-months>{months}</g><g class="dk-stars" data-stars>{stars}</g></svg>
    <svg class="dk-art" viewBox="0 0 {SKY_W} {SKY_H}" preserveAspectRatio="xMidYMax slice" aria-hidden="true" focusable="false">
      <path class="rg rg1" d="{b1}"/><path class="rg rg2" d="{b2}"/><path class="rg rg3" d="{fr}" data-ridge/>
      <g class="lamp" data-lamp><circle r="22" class="lamp-g"/><circle r="3.2" class="lamp-c"/></g>
    </svg>
    <p class="dk-tip" data-tip role="status" aria-live="polite"></p>
    <div class="wrap dk-copy">
      <figure class="dk-q" data-dkq><blockquote><p class="shout s2">Every climb, every hour in the dark, every shiver shaped what this vest became.</p></blockquote><figcaption>BWILD, on running the Swiss Peaks</figcaption></figure>
      <div class="dk-n" data-dkn>
        <h2 id="dk-h" class="shout s2"><span data-o="darkn">{n}</span> of your next 365 runs start in the dark.</h2>
        <p class="dk-run">Every star up there is one of them, worked out from the sun for <label class="sr" for="city">City</label><select id="city" data-city>{opts}</select> at <span class="dk-t"><button type="button" class="step" data-dt="-5" aria-label="Five minutes earlier">{MINUS}</button><b data-o="time" role="slider" tabindex="0" aria-label="Your run starts at" aria-valuemin="240" aria-valuemax="1380" aria-valuenow="{DEF_T}" aria-valuetext="{hm(DEF_T)}" data-time>{hm(DEF_T)}</b><button type="button" class="step" data-dt="5" aria-label="Five minutes later">{PLUS}</button></span>. Tap one for its date.</p>
        <p class="dk-s" data-o="streak">{st}</p>
        <a class="btn solid" href="#reserve">Be seen. Reserve for {eur(LU["deposit"])}</a>
      </div>
    </div>
    <p class="sr" data-o="chartsum">{n} of the next 365 runs at {hm(DEF_T)} in {city(DEF_CITY)["name"]} start before sunrise or after sunset.</p>
  </div>
</section>'''

def flare():
    b, t = VIS['bfu'], VIS['tcs']
    used.update(['lumback-419.webp', 'lumpanel-419.png', 'lumslash-419.png'])
    return f'''<section class="fl" id="seen" data-sky="night" data-goal="reserve" data-hl aria-labelledby="fl-h">
  <script>(function(s){{if(!document.documentElement.classList.contains('rm'))s.classList.add('live')}})(document.currentScript.parentNode)</script>
  <div class="fl-stick">
    <div class="fl-amb" aria-hidden="true">{film('f-urban')}</div>
    <div class="fl-beam l" aria-hidden="true"></div><div class="fl-beam r" aria-hidden="true"></div>
    <div class="fl-vest vest" aria-hidden="true" data-vest>{pic('lumback', '', '(max-width: 760px) 70vw, 420px')}<span class="lit panel"></span><span class="lit slash"></span><canvas class="spark" data-spark></canvas></div>
    <i class="fl-streak" aria-hidden="true"></i>
    <div class="wrap fl-copy">
      <h2 id="fl-h" class="fl-k">Headlights behind you, on an unlit road</h2>
      <p class="dist" aria-hidden="true"><b data-o="dist">{VIS["start"]}</b><span>m</span></p>
      <ol class="caps">
        <li data-at="{VIS['start']}"><p>A car comes up behind you, {VIS["start"]} m back. Its dipped headlights reach you first.</p></li>
        <li data-at="{b}"><p><b>{b} m.</b> Reflective material, however small, is visible in dipped headlights from here.</p><p class="src">BFU, the Swiss Council for Accident Prevention</p></li>
        <li data-at="{t}"><p><b>{t} m.</b> What a car at {VIS["tcsSpeed"]} km/h on a wet road needs to stop.</p><p class="src">TCS, Touring Club Schweiz</p></li>
        <li data-at="40"><p class="shout s3">Seen with {b - t} m to spare.</p><p>The Luminous Vest is reflective all the way round, the three slashes and the panel below them.</p><a class="btn solid" href="#reserve" data-hl-cta>Reserve for {eur(LU["deposit"])}</a></li>
      </ol>
    </div>
  </div>
</section>'''

FEATS = [
    ('f-visible', 'Seen from every angle', '360° reflective. It reflects light from every direction, so drivers and cyclists see you clearly in low light.'),
    ('f-urban', 'City to trail', 'A sleek vest for city streets and wild trails, without the safety gear look.'),
    ('f-fit', 'No bounce', 'Adjustable straps keep it locked in. Move freely and forget it’s there.'),
    ('f-breathe', 'Breathable and light', 'Ultralight, breathable fabrics keep the air moving, so you stay cool.'),
    ('f-hydrate', 'Water on board', 'Soft flasks sit close at hand without costing you any freedom of movement.'),
    ('f-grab', 'Everything in reach', 'Phone, keys and gels in quick grab pockets and a zip pocket that keeps them safe.'),
]

def features():
    tiles = ''.join(f'<li class="ft-{i}"><div class="ft-f">{film(k)}</div><div class="ft-t"><span class="ft-n">{i + 1:02d}</span><h3>{t}</h3><p>{p}</p></div></li>' for i, (k, t, p) in enumerate(FEATS))
    return f'''<section class="ft" id="vest" data-sky="night" data-goal="reserve" aria-labelledby="ft-h">
  <div class="wrap">
    <h2 id="ft-h" class="shout s2">Urban to trail,<br>without the safety gear look.</h2>
    <ul class="ft-l">{tiles}</ul>
  </div>
</section>'''

def reserve():
    ex = datetime.datetime.fromisoformat(LU['exampleLaunch'])
    return f'''<section class="rs" id="reserve" data-sky="night" data-own data-goal="reserve" aria-labelledby="rs-h">
  <div class="rs-bear" aria-hidden="true">{bear()}</div>
  <div class="wrap rs-g">
    <div class="rs-t">
      <h2 id="rs-h" class="shout">Lock in {LU["discount"]}%<br>for {eur(LU["deposit"])}.</h2>
      <ol class="steps"><li><b>1</b><span>Leave your email for early access.</span></li><li><b>2</b><span>Reserve with a {eur(LU["deposit"])} deposit to secure {LU["discount"]}% off.</span></li><li><b>3</b><span>Pledge on Kickstarter at launch.</span></li></ol>
      <div class="cd" data-cd data-at="{LU['exampleLaunch']}"><p class="cd-n"><span><b data-o="cdd">00</b> days</span><span><b data-o="cdh">00</b> h</span><span><b data-o="cdm">00</b> min</span><span><b data-o="cds">00</b> s</span></p>
      <p class="cd-x">To an example launch date, {ex.day} {ex.strftime("%B %Y")}. The real date goes here the day it’s set.</p></div>
      <form class="rs-f" data-rs novalidate>
        <label class="fld"><span>Email for early access</span><input name="email" type="email" autocomplete="email" required placeholder="you@example.com"></label>
        <p class="rs-run"><span class="lab">Your run</span> <span data-o="runline">Sunrise · {hm(DEF_T)} · {city(DEF_CITY)["name"]}</span></p>
        <p class="err" data-err role="alert" hidden></p>
        <button class="btn solid ink wide" type="submit">Reserve for {eur(LU["deposit"])}</button>
        <p class="fine">Join {LU["runners"]} runners. This prototype charges nothing and sends nothing.</p>
      </form>
    </div>
    <div class="bib-w" aria-live="polite">
      <article class="bib" data-bib>
        {PIN}{PIN.replace('class="pin"', 'class="pin r"')}
        <div class="bib-top">{bear('bib-bear')}<p>Luminous Vest<br>Launch reservation</p></div>
        <p class="bib-n" data-o="bibn">0000</p>
        <p class="bib-run"><span data-o="bibrun">Sunrise · {hm(DEF_T)} · {city(DEF_CITY)["name"]}</span></p>
        <div class="bib-strip"><span>{LU["discount"]}% off at launch</span>{slashes('bib-sl')}</div>
        <p class="bib-stamp" aria-hidden="true">Reserved</p>
      </article>
      <p class="rs-done" data-done hidden></p>
    </div>
  </div>
</section>'''

# the render's own shot for each spec, seconds into their product film
SPECS = [
    (9.5, 11.0, 'Comfort fit', 'One size, fully adjustable, 84 to 120 cm around the chest.'),
    (11.5, 14.0, 'Breathable mesh', '207 g for the whole vest.'),
    (14.0, 16.4, 'Adjustable straps', 'Stable, no bounce running.'),
    (16.5, 18.4, 'All in one storage', '7 L and 10 pockets.'),
    (18.5, 20.5, 'Two 500 ml flasks', 'Soft flasks, each marked DARE TO LIVE.'),
    (25.5, 27.5, 'The BWILD pouch', 'For your essentials, in the box.'),
    (28.0, 30.0, 'Reflective details', 'For the road home.'),
]

def adventure():
    items = ''.join(f'<li data-seg="{a}:{b}"><span class="sp-n">{i + 1:02d}</span><h3 class="shout s3">{t}</h3><p>{p}</p></li>' for i, (a, b, t, p) in enumerate(SPECS))
    box = ''.join(f'<li>{x}</li>' for x in AD['box'])
    return f'''<section class="ad" id="adventure" data-sky="night" data-own data-goal="buy" aria-labelledby="ad-h">
  <div class="wrap ad-top">
    <p class="ad-k">On sale now</p>
    <h2 id="ad-h" class="shout">The Adventure Vest.</h2>
    <p class="ad-lede">It carries what you need and nothing more. Designed in Switzerland and tested in the Alps.</p>
  </div>
  <div class="wrap ad-g">
    <div class="ad-stick"><div class="ad-film" data-adfilm>{film('productseek', '', 'seek', ' data-seek')}</div></div>
    <ol class="ad-specs">{items}</ol>
  </div>
  <div class="wrap ad-buy">
    <div class="ad-shots">{pic('vestflasks', 'The BWILD Adventure Vest with its two blue soft flasks', '(max-width: 760px) 44vw, 300px')}{pic('back', 'The Adventure Vest worn, seen from the back', '(max-width: 760px) 44vw, 300px')}</div>
    <div class="ad-price">
      <p class="price"><b>{eur(AD["price"])}</b><span>Two flasks included.<br>Free shipping for the launch.</span></p>
      <p class="lab">In the box</p><ul class="box">{box}</ul>
      <blockquote class="rv"><p>“{AD["review"][0]}”</p><p class="by">{AD["review"][1]}</p></blockquote>
      <button class="btn solid ink wide" type="button" data-add>Add to cart, {eur(AD["price"])}</button>
      <p class="fine">30 days to return it unused. Europe in 2 to 4 business days.</p>
    </div>
  </div>
</section>'''

PHOTOS = [('alps', 'Trail runners in BWILD vests on an alpine path'), ('dune', 'A runner in a BWILD vest on the crest of a red sand dune'),
          ('snow', 'A runner in a BWILD vest in a snowy forest'), ('goldback', 'A runner in a BWILD vest facing the low sun'),
          ('ridge', 'A runner in a BWILD vest walking towards a mountain ridge in low sun'), ('moon', 'A runner in a BWILD vest against a full orange moon'),
          ('dunetall', 'A lone runner far below a sand dune')]

def story():
    used.update(['bear-mask.svg'])
    ph = ''.join(f'<li class="ph ph{i}">{pic(k, a, "(max-width: 760px) 46vw, 24vw")}</li>' for i, (k, a) in enumerate(PHOTOS))
    return f'''<section class="st" id="story" data-sky="night" data-own data-goal="reserve" aria-labelledby="st-h">
  <script>(function(s){{if(!document.documentElement.classList.contains('rm'))s.classList.add('live')}})(document.currentScript.parentNode)</script>
  <div class="st-pin"><div class="st-stick">
    <div class="st-bear" data-bearwin aria-hidden="true">{film('swisspeaks')}</div>
    <div class="wrap st-t" data-st-t>
      <p class="st-k">Swiss Peaks, 4 September 2025</p>
      <h2 id="st-h" class="shout">Built<br>out there.</h2>
      <p class="lead">We ran the Swiss Peaks, 100 km with over 6,000 m of climbing, in BWILD vests. It wasn’t about winning or proving something. It was about daring to live.</p>
    </div>
    <p class="st-over shout s2" data-st-over aria-hidden="true">Where courage<br>meets freedom.</p>
  </div></div>
  <div class="st-run">
    <div class="wrap st-q"><blockquote><p class="shout s2">So I decided to take the risk, invest my savings and start BWILD. Not just to make a vest, but to make a promise.</p></blockquote><p class="by">Lupo, BWILD founder</p></div>
    <ul class="phs" aria-label="BWILD out there">{ph}</ul>
    <div class="wrap join">
      <h2 class="shout s2">Run with BWILD.</h2>
      <p>The BWILD club runs on Strava, and the next adventures go up on Instagram first.</p>
      <p class="join-a"><a class="btn ink" href="https://www.strava.com/clubs/2035366" rel="noopener">Join the club on Strava</a><a class="btn ink" href="https://www.instagram.com/bwildnow/" rel="noopener">Follow @bwildnow</a></p>
    </div>
  </div>
</section>'''

FAQS = [
    ('What’s the €1 for?', 'It reserves your 30% off. Leave your email for early access, reserve for €1, then pledge on Kickstarter at launch.'),
    ('When does the Luminous Vest launch?', 'On Kickstarter. Everyone who leaves an email gets early access.'),
    ('What size should I choose?', 'One size. The straps adjust to fit most runners, lean to broad, 84 to 120 cm around the chest. Still unsure? Write to us, we’re real humans behind the screen.'),
    ('What comes with the Adventure Vest?', 'The vest, two 500 ml soft flasks and a BWILD pouch for essentials, in premium packaging, all for €98.'),
    ('Can I return it?', 'Yes. You have 30 days to return the vest unused, in its original condition.'),
    ('Do you ship internationally?', 'Across the world. Europe takes 2 to 4 business days, outside Europe 5 to 10, and shipping is free for the launch.'),
    ('What makes BWILD different?', 'Premium performance without the premium price tag, because the outdoors should be for everyone, not just those who can afford €200 gear.'),
    ('Do you work with run clubs or creators?', 'Absolutely. If you’re building community or believe in our mission, write to <a href="mailto:lupo@bwildoutdoors.com">lupo@bwildoutdoors.com</a>.'),
]

def faq():
    items = ''.join(f'<details><summary>{q}</summary><p>{a}</p></details>' for q, a in FAQS)
    return f'''<section class="fq" id="faq" data-sky="night" data-own data-goal="reserve" aria-labelledby="fq-h">
  <div class="wrap fq-g"><h2 id="fq-h" class="shout s2">Before you<br>reserve.</h2><div class="fq-l">{items}</div></div>
</section>'''

PAGE_DATA = json.dumps({'cities': D['cities'], 'picks': D['picks'], 'adventure': {'price': AD['price']}, 'luminous': LU, 'visibility': VIS}, ensure_ascii=False).replace('</', '<\\/')

def foot():
    return f'''</main>
<footer class="ftr" data-sky="night" data-own><div class="wrap">
<div class="ftr-mark" aria-hidden="true">{bear('ftr-bear')}{wordmark('ftr-wm')}</div>
<blockquote class="ftr-q"><p>The world needs dreamers and the world needs doers. But above all, the world needs dreamers who do.</p><p class="by">Sarah Ban Breathnach</p></blockquote>
<div class="ftr-g">
<div><p class="ftr-dt">Dare to live. Designed in Switzerland and tested in the Alps.</p></div>
<div><h2>Shop</h2><ul><li><a href="#seen">The Luminous Vest</a></li><li><a href="#adventure">The Adventure Vest</a></li><li><a href="#faq">FAQ</a></li></ul></div>
<div><h2>Run with us</h2><ul><li><a href="https://www.strava.com/clubs/2035366" rel="noopener">Strava club</a></li><li><a href="https://www.instagram.com/bwildnow/" rel="noopener">Instagram</a></li><li><a href="https://www.tiktok.com/@bwildoutdoors" rel="noopener">TikTok</a></li></ul></div>
<div><h2>Contact</h2><ul><li><a href="mailto:info@bwildoutdoors.com">info@bwildoutdoors.com</a></li><li><a href="mailto:lupo@bwildoutdoors.com">lupo@bwildoutdoors.com</a></li></ul></div>
</div>
<p class="base">BWILD OÜ, registered in Estonia, reg. no. 17188516. Prototype by Astra agency, October 2026. Nothing on this site is charged or sent.</p>
</div></footer>
<aside class="sbar" data-sbar aria-label="Next step" aria-hidden="true"><div class="wrap sbar-in">
<div class="sb-g" data-sbg="reserve"><p data-o="sbar">€1 today · 30% off at launch · Sunrise {hm(DEF_T)} {city(DEF_CITY)["name"]}</p><a class="btn solid" href="#reserve" tabindex="-1">Reserve</a></div>
<div class="sb-g" data-sbg="buy" hidden><p>The Adventure Vest · {eur(AD["price"])} · two flasks included</p><button class="btn solid" type="button" data-add tabindex="-1">Add to cart</button></div>
</div></aside>
<div class="cart" data-cart role="dialog" aria-modal="true" aria-labelledby="cart-h" hidden><div class="cart-in">
<h2 id="cart-h">Your cart</h2><div data-cartbody><p>Nothing in it yet.</p></div>
<p class="fine">Prototype. Checkout runs through the shop on the real site, nothing is charged here.</p>
<button class="btn" type="button" data-cart-close>Close</button></div></div>
<script type="application/json" data-d>{PAGE_DATA}</script>
<script src="/js/sky.js" defer></script>
<script src="/js/site.js" defer></script>
</body></html>'''

def rel(d):
    """An absolute M/L polyline as one move and relative steps."""
    pts = [tuple(map(int, xy.split())) for xy in re.findall(r'[ML](-?\d+ -?\d+)', d)]
    if len(pts) < 2 or re.search(r'[^MLZ\d\s-]', d): return d
    out = f'M{pts[0][0]} {pts[0][1]}l'
    for (x0, y0), (x1, y1) in zip(pts, pts[1:]):
        dx, dy = x1 - x0, y1 - y0
        out += (f'{dx}' if dx < 0 or out.endswith('l') else f' {dx}') + (f'{dy}' if dy < 0 else f' {dy}')
    return out + ('z' if 'Z' in d else '')

def masks():
    """The claw and the bear as mask images for CSS, white on nothing."""
    os.makedirs(os.path.join(OUT, 'media'), exist_ok=True)
    open(os.path.join(OUT, 'media', 'claw-mask.svg'), 'w').write('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 268 340">' + ''.join(f'<path fill="#fff" d="{d}"/>' for d in SLASH) + '</svg>')
    w, h, d = BEAR
    open(os.path.join(OUT, 'media', 'bear-mask.svg'), 'w').write(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}"><path fill="#fff" d="{d}"/></svg>')
    c = re.sub(r'd="([^"]+)"', lambda m: 'd="' + rel(m.group(1)) + '"', open(os.path.join(B, 'art', 'contours.svg')).read())
    for name, col in (('contours-w.svg', 'rgba(255,255,255,.10)'), ('contours-k.svg', 'rgba(60,32,20,.16)')):
        open(os.path.join(OUT, 'media', name), 'w').write(c.replace('currentColor', col))

def build():
    if os.path.exists(OUT): shutil.rmtree(OUT)
    os.makedirs(OUT)
    page = head() + hero() + dark_scene() + flare() + features() + reserve() + adventure() + story() + faq() + foot()
    open(os.path.join(OUT, 'index.html'), 'w').write(page)
    for d in ('css', 'js', 'fonts'):
        shutil.copytree(os.path.join(B, d), os.path.join(OUT, d))
    masks()
    used.update(['vest-540.webp', 'gold.webm', 'gold.mp4', 'gold-poster.jpg', 'gold-p.webm', 'gold-p.mp4'])  # the cart's thumbnail, the hero film
    for f in sorted(used):
        if f.endswith('.svg'): continue
        shutil.copy(os.path.join(B, 'media', f), os.path.join(OUT, 'media', f))
    open(os.path.join(OUT, 'robots.txt'), 'w').write('User-agent: *\nDisallow: /\n')
    open(os.path.join(OUT, '_headers'), 'w').write('/*\n  X-Robots-Tag: noindex, nofollow\n')
    for ref in set(re.findall(r'href="#([a-z-]+)"', page)):
        assert f'id="{ref}"' in page, ref
    for ref in re.findall(r'(?:src|href|poster)="(/[^"#?]+)"', page) + [x.split()[0] for s in re.findall(r'srcset="([^"]+)"', page) for x in s.split(', ')]:
        assert os.path.exists(os.path.join(OUT, ref.lstrip('/'))), ref
    print('built', OUT, len(used), 'media files', 'dark runs', DARK_N, 'today', TODAY)

if __name__ == '__main__':
    build()
