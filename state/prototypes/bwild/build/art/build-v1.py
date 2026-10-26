"""BWILD prototype. One page that runs the Luminous Vest launch and sells the Adventure Vest. Writes ../site.
Every product line, price and number comes from data/site.json (read on their pages 26 Oct 2026), the daylight
numbers are worked out here with astral for the page as it loads without script, and again live in js/site.js."""
import datetime, html as H, json, os, shutil
from zoneinfo import ZoneInfo
from astral import Observer
from astral.sun import sunrise, sunset

B = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(B, '..', 'site')
D = json.load(open(os.path.join(B, 'data', 'site.json')))
MAN = json.load(open(os.path.join(B, 'data', 'media.json')))
SLASH = open(os.path.join(B, 'art', 'slashes.paths')).read().split('\n')
AD, LU, VIS = D['adventure'], D['luminous'], D['visibility']
used = set()

def esc(s): return H.escape(s, quote=True)
def eur(c): return '€{:,.0f}'.format(c / 100) if c % 100 == 0 else '€{:,.2f}'.format(c / 100)
def hm(m): return '{:02d}.{:02d}'.format(m // 60, m % 60)

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

def sky_line(cid, t):
    c = city(cid); r, s = day_minutes(c, TODAY); rm, sm = round(r), round(s)
    if t < r:
        return f'Today in {c["name"]} the sun rises at {hm(rm)}, so you’d start {dur(rm - t)} before it, in the dark.'
    if t > s:
        return f'Today in {c["name"]} the sun sets at {hm(sm)}, so you’d start {dur(t - sm)} after it, in the dark.'
    nxt = next((x[0] for x in YEAR if x[3]), None)
    return f'Today in {c["name"]} that’s daylight.' + (f' From {fmt_day(nxt)} it won’t be.' if nxt else ' It stays light at this time all year.')

def dur(m):
    m = int(round(m)); h, mm = divmod(m, 60)
    if h and mm: return f'{h} {"hour" if h == 1 else "hours"} {mm} {"minute" if mm == 1 else "minutes"}'
    if h: return f'{h} {"hour" if h == 1 else "hours"}'
    return f'{mm} {"minute" if mm == 1 else "minutes"}'

# ------------------------------------------------------------------ pictures
def pic(key, alt, sizes='100vw', cls='', eager=False, attrs=''):
    m = MAN[key]; ss = m['sizes']; ext = 'png' if m.get('alpha') else 'jpg'
    for w, _ in ss: used.update([f'{key}-{w}.webp', f'{key}-{w}.{ext}'])
    ws = ', '.join(f'/media/{key}-{w}.webp {w}w' for w, _ in ss)
    js = ', '.join(f'/media/{key}-{w}.{ext} {w}w' for w, _ in ss)
    w, h = ss[-1]
    load = 'eager" fetchpriority="high' if eager else 'lazy'
    c = f' class="{cls}"' if cls else ''
    return f'<picture><source type="image/webp" srcset="{ws}" sizes="{sizes}"><img{c} src="/media/{key}-{ss[0][0]}.{ext}" srcset="{js}" sizes="{sizes}" width="{w}" height="{h}" alt="{esc(alt)}" loading="{load}" decoding="async"{attrs}></picture>'

def film(key, label='', cls=''):
    """Their own loop, still frame first. The page script plays it only on screen, never under reduced motion or data saver."""
    used.update([f'{key}.mp4', f'{key}.webm', f'{key}-poster.jpg'])
    m = MAN['film-' + key]
    aria = f' aria-label="{esc(label)}"' if label else ' aria-hidden="true"'
    return (f'<video class="film{(" " + cls) if cls else ""}" muted loop playsinline preload="none" poster="/media/{key}-poster.jpg" '
            f'width="{m["w"]}" height="{m["h"]}" data-film{aria}><source data-src="/media/{key}.webm" type="video/webm">'
            f'<source data-src="/media/{key}.mp4" type="video/mp4"></video>')

def slashes(cls='', inner=''):
    paths = ''.join(f'<path d="{d}"/>' for d in SLASH)
    return f'<svg class="sl {cls}" viewBox="0 0 268 340" aria-hidden="true" focusable="false">{inner}{paths}</svg>'

def slash_clip(cid):
    """A clipPath takes shapes only, never a group, so each blade carries the scale itself."""
    paths = ''.join(f'<path transform="scale({1/268:.7f} {1/340:.7f})" d="{d}"/>' for d in SLASH)
    return f'<clipPath id="{cid}" clipPathUnits="objectBoundingBox">{paths}</clipPath>'

LOGO = '<span class="logo-w">' + pic('logo', 'BWILD', '160px', eager=True) + '</span><span class="logo-i">' + pic('logoink', 'BWILD', '160px') + '</span>'
FAV = ("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' fill='%2308090B'/%3E"
       "%3Cpath d='M20 50 L30 12 L33 12 L24 50Z M30 54 L42 8 L45 8 L34 54Z M40 50 L50 14 L53 14 L44 50Z' fill='%23fff'/%3E%3C/svg%3E")
MINUS = '<svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" focusable="false"><path d="M2 8h12" stroke="currentColor" stroke-width="1.6"/></svg>'
PLUS = '<svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" focusable="false"><path d="M2 8h12M8 2v12" stroke="currentColor" stroke-width="1.6"/></svg>'

# ------------------------------------------------------------------ page
def head():
    return f'''<!doctype html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>BWILD | The Luminous Vest and the Adventure Vest</title>
<meta name="description" content="The BWILD Luminous Vest, reflective all the way round. Reserve for €1 and lock 30% off at the Kickstarter launch. The Adventure Vest is on sale now, €98.">
<meta name="robots" content="noindex, nofollow">
<meta name="theme-color" content="#08090B">
<link rel="icon" href="{FAV}">
<link rel="preload" href="/fonts/mona-sans-latin-standard-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/css/site.css">
<script>document.documentElement.classList.add('js');if(matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('rm')</script>
</head>
<body>
<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><defs>{slash_clip('slclip')}</defs></svg>
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
    c = city(DEF_CITY)
    opts = ''.join(f'<option value="{x["id"]}"{" selected" if x["id"] == DEF_CITY else ""}>{x["name"]}</option>' for x in D['cities'])
    return f'''<section class="hero" id="run" data-hdr-tone="sky" aria-labelledby="hero-h">
  <div class="sky" data-sky aria-hidden="true"><canvas class="stars" data-stars></canvas><div class="horizon"></div></div>
  <div class="wrap hero-g">
    <div class="hero-copy">
      <p class="kick">The Luminous Vest · coming to Kickstarter</p>
      <h1 id="hero-h">Sunrise or night?</h1>
      <p class="hero-sub">If you could keep one run for the rest of the year, which would it be?</p>
      <div class="pick" role="group" aria-label="Your run"><button type="button" data-pick="sunrise" aria-pressed="true">Sunrise</button><button type="button" data-pick="night" aria-pressed="false">Night</button></div>
      <div class="clock">
        <button type="button" class="step" data-dt="-5" aria-label="Five minutes earlier">{MINUS}</button>
        <div class="time" role="slider" tabindex="0" aria-label="Your run starts at" aria-valuemin="240" aria-valuemax="1380" aria-valuenow="{DEF_T}" aria-valuetext="{hm(DEF_T)}" data-time><span data-o="time">{hm(DEF_T)}</span></div>
        <button type="button" class="step" data-dt="5" aria-label="Five minutes later">{PLUS}</button>
      </div>
      <p class="where"><label for="city">Running in</label> <select id="city" data-city>{opts}</select></p>
      <p class="skyline" data-o="skyline" aria-live="polite">{sky_line(DEF_CITY, DEF_T)}</p>
      <div class="buy"><a class="btn solid" href="#reserve" data-hero-cta>Reserve for €1</a><p class="buy-p">30% off at launch. Join {LU["runners"]} runners.</p></div>
      <p class="alt"><a href="#adventure">Or buy the Adventure Vest today, {eur(AD["price"])}</a></p>
    </div>
    <div class="hero-art" aria-hidden="true">
      <div class="disc sun" data-sun>{pic('sundisc', '', '(max-width: 760px) 70vw, 500px', eager=True)}</div>
      <div class="disc moon" data-moon>{pic('moon', '', '(max-width: 760px) 70vw, 500px')}</div>
    </div>
  </div>
</section>'''

def headlights():
    b, t = VIS['bfu'], VIS['tcs']
    cls = lambda d: ' class="k up"' if d == b else (' class="k"' if d == t else '')
    ticks = ''.join(f'<li style="--p:{(VIS["start"] - d) / VIS["start"]:.4f}"{cls(d)}><span>{d} m</span></li>' for d in (300, 200, b, t, 50, 0))
    return f'''<section class="hl" id="seen" data-hl data-hdr-tone="night" aria-labelledby="hl-h">
  <script>(function(s){{if(!document.documentElement.classList.contains('rm'))s.classList.add('live')}})(document.currentScript.parentNode)</script>
  <div class="hl-stick">
    <div class="road" aria-hidden="true"><div class="beam"></div><div class="lanes"></div><div class="glare"></div></div>
    <div class="hl-vest vest" aria-hidden="true" data-vest>{pic('lumback', '', '(max-width: 760px) 70vw, 420px')}<span class="lit panel"></span><span class="lit slash"></span></div>
    <div class="torch" aria-hidden="true"></div>
    <div class="wrap hl-copy">
      <h2 id="hl-h" class="kick">Headlights behind you</h2>
      <ol class="ruler" aria-hidden="true">{ticks}</ol>
      <p class="dist" aria-hidden="true"><b data-o="dist">{VIS["start"]}</b> <span>m to the runner</span></p>
      <ol class="caps">
        <li data-at="{VIS['start']}"><p>A car comes up behind you on an unlit road, {VIS["start"]} m back.</p></li>
        <li data-at="{b}"><p><b>{b} m.</b> Reflective material, however small, is visible in dipped headlights from here.</p><p class="src">BFU, the Swiss Council for Accident Prevention</p></li>
        <li data-at="{t}"><p><b>{t} m.</b> What a car at {VIS["tcsSpeed"]} km/h on a wet road needs to stop.</p><p class="src">TCS, Touring Club Schweiz</p></li>
        <li data-at="{VIS['end']}"><p class="big">Seen with up to {b - t} m to spare.</p><p>The Luminous Vest is reflective all the way round, the three slashes and the panel below them.</p><a class="btn solid" href="#reserve" data-hl-cta>Reserve for €1</a></li>
      </ol>
    </div>
  </div>
</section>'''

def dark_year():
    n = DARK_N; best, bs = streak(YEAR)
    st = (f'The longest stretch runs from {fmt_day(YEAR[bs][0])} to {fmt_day(YEAR[bs + best - 1][0])}, {best} runs in a row.' if best else 'At this time it stays light all year.')
    months = []
    for i, x in enumerate(YEAR):
        if x[0].day == 1: months.append(f'<li style="--x:{i / 365:.4f}">{x[0].strftime("%b")}</li>')
    hours = ''.join(f'<li style="--y:{(h * 60 - 240) / 1140:.4f}">{h:02d}.00</li>' for h in (4, 8, 12, 16, 20))
    return f'''<section class="yr" id="dark" data-hdr-tone="night" aria-labelledby="yr-h">
  <div class="wrap yr-g">
    <div class="yr-t">
      <p class="kick">Your next 365 runs</p>
      <h2 id="yr-h"><span data-o="darkn">{n}</span> of them start in the dark.</h2>
      <p class="lead">Drag the line to your time. Every lit mark is a run that starts before sunrise or after sunset in <span data-o="cityname">{city(DEF_CITY)["name"]}</span>, worked out from the sun’s position for each day.</p>
      <p class="yr-s" data-o="streak">{st}</p>
      <a class="btn solid" href="#reserve">Reserve for €1</a>
    </div>
    <figure class="chart" data-chart>
      <figcaption class="sr" data-o="chartsum">Daylight for the next 365 days in {city(DEF_CITY)["name"]}, with a run at {hm(DEF_T)} marked. {n} of the 365 runs start in the dark.</figcaption>
      <div class="ch-plot"><canvas data-yr aria-hidden="true"></canvas><div class="ch-line" data-yrline aria-hidden="true" style="--y:{(DEF_T - 240) / 1140:.4f}"><span data-o="time2">{hm(DEF_T)}</span></div>
      <ol class="ch-y" aria-hidden="true">{hours}</ol><ol class="ch-x" aria-hidden="true">{"".join(months)}</ol></div>
      <p class="ch-k" aria-hidden="true"><i class="k-d"></i> daylight <i class="k-r"></i> your run in the dark</p>
    </figure>
  </div>
</section>'''

FEATS = [
    ('f-visible', 'Seen from every angle', '360° reflective. It reflects light from every direction, so drivers and cyclists see you clearly in low light.'),
    ('f-breathe', 'Breathable and light', 'Ultralight, breathable fabrics keep the air moving, so you stay cool and comfortable.'),
    ('f-fit', 'No bounce', 'Adjustable straps keep it locked in. Move freely and forget it’s there.'),
    ('f-hydrate', 'Water on board', 'Soft flasks sit close at hand without costing you any freedom of movement.'),
    ('f-grab', 'Everything in reach', 'Phone, keys and gels in quick grab pockets up front and a zip pocket that keeps them safe.'),
    ('f-urban', 'City to trail', 'A sleek vest for city streets and wild trails.'),
]

def features():
    tiles = ''.join(f'<li><div class="ft-f">{film(k)}</div><h3>{t}</h3><p>{p}</p></li>' for k, t, p in FEATS)
    return f'''<section class="ft" id="vest" data-hdr-tone="night" aria-labelledby="ft-h">
  <div class="wrap">
    <p class="kick">The Luminous Vest</p>
    <h2 id="ft-h">Urban to trail, without the safety gear look.</h2>
    <ul class="ft-l">{tiles}</ul>
  </div>
</section>'''

def reserve():
    ex = datetime.datetime.fromisoformat(LU['exampleLaunch'])
    return f'''<section class="rs" id="reserve" data-hdr-tone="night" aria-labelledby="rs-h">
  <div class="wrap rs-g">
    <div class="rs-t">
      <p class="kick">Kickstarter launch</p>
      <h2 id="rs-h">Lock in {LU["discount"]}% for {eur(LU["deposit"])}.</h2>
      <ol class="steps"><li><b>1</b><span>Leave your email for early access.</span></li><li><b>2</b><span>Reserve with a {eur(LU["deposit"])} deposit to secure {LU["discount"]}% off.</span></li><li><b>3</b><span>Pledge on Kickstarter at launch.</span></li></ol>
      <div class="cd" data-cd data-at="{LU['exampleLaunch']}"><p class="cd-l">Launch in</p><p class="cd-n"><span><b data-o="cdd">00</b> days</span><span><b data-o="cdh">00</b> h</span><span><b data-o="cdm">00</b> min</span><span><b data-o="cds">00</b> s</span></p>
      <p class="cd-x">Example date, {ex.day} {ex.strftime("%B %Y")}. The real date goes here the day it’s set.</p></div>
      <form class="rs-f" data-rs novalidate>
        <label class="fld"><span>Email for early access</span><input name="email" type="email" autocomplete="email" required placeholder="you@example.com"></label>
        <p class="rs-run"><span class="lab">Your run</span> <span data-o="runline">Sunrise · {hm(DEF_T)} · {city(DEF_CITY)["name"]}</span></p>
        <p class="err" data-err role="alert" hidden></p>
        <button class="btn solid wide" type="submit">Reserve for {eur(LU["deposit"])}</button>
        <p class="fine">Join {LU["runners"]} runners. This prototype charges nothing and sends nothing.</p>
      </form>
    </div>
    <div class="bib-w" aria-live="polite">
      <article class="bib" data-bib>
        <div class="bib-top">{pic('logoink', 'BWILD', '140px')}<p>Luminous Vest<br>Launch reservation</p></div>
        <p class="bib-n" data-o="bibn">0000</p>
        <p class="bib-run"><span data-o="bibrun">Sunrise · {hm(DEF_T)} · {city(DEF_CITY)["name"]}</span></p>
        <div class="bib-strip"><span>{LU["discount"]}% off at launch</span>{slashes('bib-sl')}</div>
        <p class="bib-stamp" aria-hidden="true">Reserved</p>
      </article>
      <p class="rs-done" data-done hidden></p>
    </div>
  </div>
</section>'''

def story():
    photos = ''.join(f'<li>{pic(k, a, "(max-width: 760px) 70vw, 30vw")}</li>' for k, a in [
        ('dune', 'A runner in a BWILD vest on the crest of a red sand dune'), ('alps', 'Trail runners in BWILD vests on an alpine path'),
        ('snow', 'A runner in a BWILD vest in a snowy forest'), ('sunset', 'A runner in a BWILD vest facing the low sun')])
    return f'''<section class="st" id="story" data-hdr-tone="night" aria-labelledby="st-h">
  <div class="wrap st-g">
    <div class="st-film" aria-hidden="true"><div class="st-film-in">{film('swisspeaks')}</div></div>
    <div class="st-t">
      <p class="kick">Swiss Peaks, 4 September 2025</p>
      <h2 id="st-h">Built out there, where courage meets freedom.</h2>
      <p class="lead">We ran the Swiss Peaks, 100 km with over 6,000 m of climbing, in BWILD vests. It wasn’t about winning or proving something. Every climb, every hour in the dark, every shiver shaped what this vest became.</p>
      <blockquote class="q"><p>So I decided to take the risk, invest my savings and start BWILD. Not just to make a vest, but to make a promise.</p><p class="by">Lupo, BWILD founder</p></blockquote>
    </div>
  </div>
  <ul class="st-ph">{photos}</ul>
</section>'''

def adventure():
    specs = ''.join(f'<div><dt>{k}</dt><dd>{v}</dd></div>' for k, v in AD['specs'])
    box = ''.join(f'<li>{x}</li>' for x in AD['box'])
    return f'''<section class="ad" id="adventure" data-hdr-tone="day" aria-labelledby="ad-h">
  <div class="wrap ad-g">
    <div class="ad-media">
      <div class="ad-film">{film('product')}</div>
      <div class="ad-shots">{pic('vestflasks', 'The BWILD Adventure Vest with its two blue soft flasks', '(max-width: 760px) 44vw, 260px')}{pic('back', 'The Adventure Vest worn, seen from the back', '(max-width: 760px) 44vw, 260px')}</div>
    </div>
    <div class="ad-t">
      <p class="kick ink">On sale now</p>
      <h2 id="ad-h">The Adventure Vest. It carries what you need and nothing more.</h2>
      <p class="price"><b>{eur(AD["price"])}</b> <span>Two flasks included. Free shipping for the launch.</span></p>
      <dl class="specs">{specs}</dl>
      <p class="lab">In the box</p><ul class="box">{box}</ul>
      <blockquote class="rv"><p>“{AD["review"][0]}”</p><p class="by">{AD["review"][1]}</p></blockquote>
      <button class="btn solid ink wide" type="button" data-add>Add to cart, {eur(AD["price"])}</button>
      <p class="fine">30 days to return it unused. Europe in 2 to 4 business days.</p>
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
    return f'''<section class="fq" id="faq" data-hdr-tone="day" aria-labelledby="fq-h">
  <div class="wrap fq-g"><h2 id="fq-h">Before you reserve.</h2><div class="fq-l">{items}</div></div>
</section>'''

PAGE_DATA = json.dumps({'cities': D['cities'], 'picks': D['picks'], 'adventure': {'price': AD['price']}, 'luminous': LU, 'visibility': VIS}, ensure_ascii=False).replace('</', '<\\/')

def foot():
    return f'''</main>
<footer class="ftr" data-hdr-tone="night"><div class="wrap">
<blockquote class="ftr-q"><p>The world needs dreamers and the world needs doers. But above all, the world needs dreamers who do.</p><p class="by">Sarah Ban Breathnach</p></blockquote>
<div class="ftr-g">
<div>{pic('logo', 'BWILD', '160px')}<p>Dare to live. Designed in Switzerland and tested in the Alps.</p></div>
<div><h2>Shop</h2><ul><li><a href="#seen">The Luminous Vest</a></li><li><a href="#adventure">The Adventure Vest</a></li><li><a href="#faq">FAQ</a></li></ul></div>
<div><h2>Follow</h2><ul><li><a href="https://www.instagram.com/bwildnow/" rel="noopener">Instagram</a></li><li><a href="https://www.tiktok.com/@bwildoutdoors" rel="noopener">TikTok</a></li><li><a href="https://www.linkedin.com/company/bwildoutdoors" rel="noopener">LinkedIn</a></li></ul></div>
<div><h2>Contact</h2><ul><li><a href="mailto:info@bwildoutdoors.com">info@bwildoutdoors.com</a></li><li><a href="mailto:lupo@bwildoutdoors.com">lupo@bwildoutdoors.com</a></li></ul></div>
</div>
<p class="base">BWILD OÜ, registered in Estonia, reg. no. 17188516. Prototype by Astra agency, October 2026. Nothing on this site is charged or sent.</p>
</div></footer>
<aside class="sbar" data-sbar aria-label="Reserve" aria-hidden="true"><div class="wrap sbar-in"><p data-o="sbar">€1 today · 30% off at launch · Sunrise {hm(DEF_T)} {city(DEF_CITY)["name"]}</p><a class="btn solid" href="#reserve" tabindex="-1">Reserve</a></div></aside>
<div class="cart" data-cart role="dialog" aria-modal="true" aria-labelledby="cart-h" hidden><div class="cart-in">
<h2 id="cart-h">Your cart</h2><div data-cartbody><p>Nothing in it yet.</p></div>
<p class="fine">Prototype. Checkout runs through the shop on the real site, nothing is charged here.</p>
<button class="btn" type="button" data-cart-close>Close</button></div></div>
<script type="application/json" data-d>{PAGE_DATA}</script>
<script src="/js/site.js" defer></script>
</body></html>'''

def build():
    if os.path.exists(OUT): shutil.rmtree(OUT)
    os.makedirs(OUT)
    page = head() + hero() + headlights() + dark_year() + features() + reserve() + story() + adventure() + faq() + foot()
    open(os.path.join(OUT, 'index.html'), 'w').write(page)
    for d in ('css', 'js', 'fonts'):
        shutil.copytree(os.path.join(B, d), os.path.join(OUT, d))
    os.makedirs(os.path.join(OUT, 'media'))
    used.update(['lumback-419.webp', 'lumpanel-419.png', 'lumslash-419.png', 'vest-540.webp'])  # read by the stylesheet and the cart
    for f in sorted(used):
        shutil.copy(os.path.join(B, 'media', f), os.path.join(OUT, 'media', f))
    open(os.path.join(OUT, 'robots.txt'), 'w').write('User-agent: *\nDisallow: /\n')
    open(os.path.join(OUT, '_headers'), 'w').write('/*\n  X-Robots-Tag: noindex, nofollow\n')
    # every in page link has its target
    import re
    for ref in set(re.findall(r'href="#([a-z-]+)"', page)):
        assert f'id="{ref}"' in page, ref
    print('built', OUT, len(used), 'media files', 'dark runs', DARK_N, 'today', TODAY)

if __name__ == '__main__':
    build()
