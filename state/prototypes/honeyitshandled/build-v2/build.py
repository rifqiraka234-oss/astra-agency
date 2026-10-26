#!/usr/bin/env python3
"""Honey It's Handled v2, the art build. Writes ../site-v2/.

Her post of 15 Sep 2026 is the spine ("It starts long before the guests arrive ... So when the doors open... there's
nothing left to do but celebrate"), in her three colours, off white, blue, red. Three visitors, three actions, one state
carried down the page from the hero's question to her letter, which arrives written. Every fact and line is in
data/site.json with its source. Flow research/flow-v2.md, art research/art-direction-v2.md.

Media from art/prep_v2.py (her photos, cut outs, cyanotypes, facets, film), the big figures from art/figures.py, her marks
traced in ../build/art/trace.py. Only files a page references are copied.

    /usr/local/bin/python3 build.py
"""
import os, json, shutil, html as H, datetime, re, hashlib

B = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(B, '..', 'site-v2')
D = json.load(open(os.path.join(B, 'data', 'site.json')))
MAN = json.load(open(os.path.join(B, 'media', 'manifest.json')))
MK = json.load(open(os.path.join(B, 'art', 'marks.json')))
FIG = json.load(open(os.path.join(B, 'art', 'figures.json')))
HH = open(os.path.join(B, 'art', 'hh.path')).read()
WORD = open(os.path.join(B, 'art', 'word.path')).read()
LOCK = open(os.path.join(B, 'art', 'lockup.path')).read()
TODAY = datetime.date.fromisoformat(D['built'])
used = set()
P = D['paths']

def esc(s): return H.escape(s, quote=True)

WD = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
MO = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
def big_date(d): return f'{d.day} {MO[d.month - 1]} {d.year}'
def long_date(d): return f'{WD[d.weekday()]} {d.day} {MO[d.month - 1]} {d.year}'
def short_date(d): return f'{WD[d.weekday()][:3]} {d.day} {MO[d.month - 1][:3]} {d.year}'

# ------------------------------------------------------------------ the same sentences the page script writes (site.js)
TABS = [t[0] for t in D['tabs']]
def tab_word(t): return t if t.startswith('Plan B') or t.startswith('The Pinterest') else t[0].lower() + t[1:]
def tab_word2(t): return 'plan B for plan B' if t == 'Plan B for plan B' else ('plan B' if t == 'Plan B' else ('the Pinterest board' if t == 'The Pinterest board' else t[0].lower() + t[1:]))
def join(xs): return xs[0] if len(xs) == 1 else ', '.join(xs[:-1]) + ' and ' + xs[-1]
def message_wedding(date, place, guests, help_, tabs, first):
    where = 'here in Belgium' if place == 'local' else 'somewhere abroad'
    s = f'Hi Elise, we’re getting married on {long_date(date)}, {where}, with about {guests} guests. '
    if help_ == 'full': s += 'We’d love full planning'
    elif help_ == 'day': s += 'We’d love you to coordinate the day itself'
    else: s += 'We’d love help with ' + (join([tab_word2(TABS[i]) for i in tabs]) if tabs else 'part of the planning')
    s += ', and we’d like to be one of your first couples.' if first and date.year in D['offer']['years'] else '.'
    return s
def bar_text(path, date, guests, help_name):
    return f'{P[path]["short"]} · {short_date(date)} · {guests} guests · {help_name}'

# ------------------------------------------------------------------ pictures
def pic(key, alt, sizes='100vw', cls='', eager=False, attrs=''):
    m = MAN[key]; ss = sorted(m['sizes'], key=lambda s: s[0])
    for w, _ in ss: used.update([f'{key}-{w}.jpg', f'{key}-{w}.webp'])
    js = ', '.join(f'media/{key}-{w}.jpg {w}w' for w, _ in ss)
    ws = ', '.join(f'media/{key}-{w}.webp {w}w' for w, _ in ss)
    w, h = ss[-1]
    load = 'eager" fetchpriority="high' if eager else 'lazy'
    c = f' class="{cls}"' if cls else ''
    a = f'alt="{esc(alt)}"' if alt else 'alt=""'
    return f'<picture><source type="image/webp" srcset="{ws}" sizes="{sizes}"><img{c} src="media/{key}-{ss[0][0]}.jpg" srcset="{js}" sizes="{sizes}" width="{w}" height="{h}" {a} loading="{load}" decoding="async"{attrs}></picture>'

def cutout(key, alt, sizes, cls):
    m = MAN[key]; ss = sorted(m['sizes'], key=lambda s: s[1])
    for w, h in ss: used.update([f'{key}-{h}.png', f'{key}-{h}.webp'])
    ws = ', '.join(f'media/{key}-{h}.webp {w}w' for w, h in ss)
    ps = ', '.join(f'media/{key}-{h}.png {w}w' for w, h in ss)
    w, h = ss[-1]
    return f'<picture><source type="image/webp" srcset="{ws}" sizes="{sizes}"><img class="{cls}" src="media/{key}-{ss[0][1]}.png" srcset="{ps}" sizes="{sizes}" width="{w}" height="{h}" alt="{esc(alt)}" loading="lazy" decoding="async"></picture>'

def art_png(key, alt, sizes, cls=''):
    m = MAN[key]; ss = sorted(m['sizes'], key=lambda s: s[0])
    for w, _ in ss: used.update([f'{key}-{w}.png', f'{key}-{w}.webp'])
    ws = ', '.join(f'media/{key}-{w}.webp {w}w' for w, _ in ss)
    ps = ', '.join(f'media/{key}-{w}.png {w}w' for w, _ in ss)
    w, h = ss[-1]
    a = f'alt="{esc(alt)}"' if alt else 'alt=""'
    return f'<picture><source type="image/webp" srcset="{ws}" sizes="{sizes}"><img class="{cls}" src="media/{key}-{ss[0][0]}.png" srcset="{ps}" sizes="{sizes}" width="{w}" height="{h}" {a} loading="lazy" decoding="async"></picture>'

def mark(d, w, h, cls, label=None):
    a = f'role="img" aria-label="{esc(label)}"' if label else 'aria-hidden="true"'
    return f'<svg class="{cls}" viewBox="0 0 {w} {h}" {a} focusable="false"><path fill-rule="evenodd" d="{d}"/></svg>'

HW, HHt = MK['hh']['w'], MK['hh']['h']
WW, WH = MK['word']['w'], MK['word']['h']
LW, LH = MK['lockup']['w'], MK['lockup']['h']
def chev(rot): return f'<svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" focusable="false"><path d="M10.5 2.5 5 8l5.5 5.5" fill="none" stroke="currentColor" stroke-width="1.5" transform="rotate({rot} 8 8)"/></svg>'
PLUS = '<svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" focusable="false"><path d="M8 2v12M2 8h12" stroke="currentColor" stroke-width="1.5"/></svg>'
MINUS = '<svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" focusable="false"><path d="M2 8h12" stroke="currentColor" stroke-width="1.5"/></svg>'
FAV = "data:image/svg+xml," + f"%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='-40 -40 {HW + 80} {HHt + 80}'%3E%3Crect x='-40' y='-40' width='{HW + 80}' height='{HHt + 80}' fill='%23962122'/%3E%3Cpath fill='%23F9F7F6' d='{HH.replace(' ', '%20')}'/%3E%3C/svg%3E"

def fig_mask(text):
    f = FIG[text]
    svg = f"<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 {f['w']} {f['h']}'><path d='{f['d']}'/></svg>"
    enc = svg.replace('%', '%25').replace('<', '%3C').replace('>', '%3E').replace('#', '%23').replace("'", '%27').replace('"', '%22')
    return "url('data:image/svg+xml," + enc + "')", f['w'], f['h']

# ------------------------------------------------------------------ defaults (the page script starts from the same)
DEF = {k: datetime.date.fromisoformat(v['defaultDate']) for k, v in P.items()}
WED = P['wedding']
DEF_MSG = message_wedding(DEF['wedding'], 'local', WED['guests'], 'full', [], True)
DEF_BAR = bar_text('wedding', DEF['wedding'], WED['guests'], 'Full planning')
DAYS = (DEF['wedding'] - TODAY).days

# ------------------------------------------------------------------ head and header
def head():
    title = 'Honey it’s Handled, wedding and event planner in Antwerp'
    desc = 'Elise plans weddings here and abroad, private celebrations and company events from Antwerp. Tell her what you’re celebrating and she’ll handle the rest.'
    return f'''<!doctype html>
<html lang="en-GB" data-path="wedding" data-help="full" data-place="local">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{esc(title)}</title>
<meta name="description" content="{esc(desc)}">
<meta name="robots" content="noindex, nofollow">
<meta name="theme-color" content="#F9F7F6">
<link rel="icon" href="{FAV}">
<link rel="preload" href="fonts/mona-sans-latin-standard-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="css/site.css">
<script>(function(h){{h.classList.add('js');try{{if(matchMedia('(prefers-reduced-motion: reduce)').matches)h.classList.add('rm')}}catch(e){{}}}})(document.documentElement)</script>
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<p class="note">Prototype by Astra agency for Honey it’s Handled. Not her live site, nothing here is sent.</p>
<header class="hdr" data-hdr>
  <a class="logo" href="#top" aria-label="Honey it’s Handled, back to the top">{mark(WORD, WW, WH, 'word')}</a>
  <nav class="nav" aria-label="Main">
    <button class="mbtn" type="button" aria-expanded="false" aria-controls="mnav">Menu</button>
    <div class="nl" id="mnav">
      <a href="#when" data-go="wedding">Weddings</a>
      <a href="#nights">Events</a>
      <a href="#elise">About</a>
      <a class="nl-cta" href="#letter" data-cta>Tell me everything</a>
    </div>
  </nav>
  <a class="btn hbtn" href="#letter" data-cta>Tell me everything</a>
</header>
<main id="main">
'''

# ------------------------------------------------------------------ 1. hero, "With an idea."
def hero():
    opts = ''.join(f'<label class="path"><input type="radio" name="path" value="{k}"{" checked" if k == "wedding" else ""}><span>{esc(v["label"])}</span></label>' for k, v in P.items())
    return f'''<section class="hero" id="top" data-tone="light" aria-labelledby="h-top">
  <div class="hero-art" aria-hidden="true">
    <svg class="hh-still" viewBox="-60 -60 {HW + 120} {HHt + 120}" focusable="false"><defs>
      <linearGradient id="lq" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#c2484a"/><stop offset=".28" stop-color="#962122"/><stop offset=".62" stop-color="#7a171a"/><stop offset="1" stop-color="#4f0b0e"/></linearGradient>
      <linearGradient id="lqh" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset=".22" stop-color="#D3E9EE" stop-opacity="0"/></linearGradient>
      <filter id="lqs" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="22"/></filter></defs>
      <path d="{HH}" fill="#5c0e12" opacity=".16" transform="translate(26 40)" filter="url(#lqs)"/>
      <path fill-rule="evenodd" d="{HH}" fill="url(#lq)"/><path fill-rule="evenodd" d="{HH}" fill="url(#lqh)"/></svg>
    <canvas id="lacquer"></canvas>
  </div>
  <div class="hero-t">
    <h1 id="h-top">What are we celebrating?</h1>
    <fieldset class="paths"><legend class="sr">What are we celebrating?</legend>{opts}</fieldset>
    <p class="hero-sub">Elise plans weddings here and abroad, and private and company events, from Antwerp.</p>
    <div class="acts"><a class="btn" href="#letter" data-cta data-hero-cta><span data-o="cta">{esc(WED["cta"])}</span></a><a class="tl" href="#when">Start with the date</a></div>
  </div>
  <p class="wide hero-line">{esc(D["lines"]["rest"])}</p>
</section>
'''

# ------------------------------------------------------------------ 2. when, and the launch offer
def when():
    d = DEF['wedding']
    private_kinds = ''.join(f'<label class="opt"><input type="radio" name="kind-private" value="{i}"{" checked" if i == 0 else ""}><span>{esc(k)}</span></label>' for i, k in enumerate(P['private']['kinds']))
    company_kinds = ''.join(f'<label class="opt"><input type="radio" name="kind-company" value="{i}"{" checked" if i == 2 else ""}><span>{esc(k)}</span></label>' for i, k in enumerate(P['company']['kinds']))
    years = ''.join(f'<button type="button" class="yr" data-year="{y}" aria-pressed="{"true" if y == 2027 else "false"}">{y}</button>' for y in (2027, 2028, 2029))
    o = D['offer']
    return f'''<section class="when" id="when" data-tone="light" aria-labelledby="h-when">
  <div class="wrap when-g">
    <div class="when-q">
      <h2 id="h-when" data-o="whenQ">{esc(WED["when"])}</h2>
      <p class="date-big" aria-live="polite"><span class="dw" data-o="weekday">{WD[d.weekday()]}</span> <span class="dd" data-o="dateBig">{big_date(d)}</span></p>
      <p class="date-n mono" data-o="dateCount">{DAYS} days from today</p>
      <div class="date-ctl">
        <button type="button" class="step" data-step="-7" aria-label="A week earlier">{chev(0)}</button>
        <button type="button" class="step" data-step="7" aria-label="A week later">{chev(180)}</button>
        <label class="pick"><span>Pick a date</span><input type="date" name="date" value="{d.isoformat()}" min="2026-11-01" max="2029-12-31"></label>
        <button type="button" class="tl nodate" data-nodate aria-pressed="false">No date yet</button>
      </div>
      <div class="years" data-years hidden><span class="mono">Sometime in</span>{years}</div>
    </div>
    <div class="when-side">
      <div class="pp p-wedding">
        <fieldset class="opts two"><legend>Here or abroad?</legend>
          <label class="opt"><input type="radio" name="place" value="local" checked><span>Here in Belgium</span></label>
          <label class="opt"><input type="radio" name="place" value="abroad"><span>Somewhere abroad</span></label>
        </fieldset>
        <div class="offer" data-offer>
          <h3>{esc(o["title"])}</h3>
          <p>{esc(o["text"])}</p>
          <label class="check"><input type="checkbox" name="firstcouples" checked><span>We’d like to be one of the first couples</span></label>
          <a class="btn" href="#letter" data-cta>Tell me everything</a>
        </div>
        <p class="offer-off" data-offer-off hidden>Her launch offer is for weddings in 2027 or 2028. <a class="tl" href="#letter" data-cta>Tell me everything</a></p>
      </div>
      <div class="pp p-private">
        <fieldset class="opts"><legend>What’s the occasion?</legend>{private_kinds}</fieldset>
        <a class="btn" href="#letter" data-cta>Plan my celebration</a>
      </div>
      <div class="pp p-company">
        <fieldset class="opts"><legend>What’s the occasion?</legend>{company_kinds}</fieldset>
        <a class="btn" href="#letter" data-cta>Hire Elise for your event</a>
      </div>
    </div>
  </div>
</section>
'''

# ------------------------------------------------------------------ 3. behind the curtain, "Every detail considered."
TENT_PINS = [(0.30, 0.37, 'the atmosphere', 1), (0.515, 0.455, 'and then, the night came alive', 1), (0.40, 0.60, 'good music', 1),
             (0.86, 0.68, 'good food', 0), (0.09, 0.62, 'suppliers', 0), (0.47, 0.70, 'the styling', 1), (0.62, 0.86, 'the flow of the evening', 1)]
HALL_PINS = [(0.50, 0.55, 'one iconic venue', 1), (0.16, 0.33, 'suppliers', 1), (0.80, 0.42, 'logistics', 1), (0.50, 0.17, 'timing was everything', 1)]
def pins(ps):
    return ''.join(f'<span class="pin{"" if ph else " ph-off"}" style="--x:{x * 100:.1f}%;--y:{y * 100:.1f}%"><i></i><b>{esc(t)}</b></span>' for x, y, t, ph in ps)

def details():
    tent = MAN['tent']['sizes'][-1]; hall = MAN['hall']['sizes'][-1]
    return f'''<section class="det" id="details" data-tone="light" aria-labelledby="h-det">
  <div class="wrap det-head">
    <h2 id="h-det">Every detail considered.</h2>
    <p class="det-l"><span class="q">{esc(D["lines"]["mine"])}</span> Move the lens over her room, or flip the whole photo.</p>
    <button type="button" class="btn ghost" data-peek aria-pressed="false"><span data-o="peek">See what Elise sees</span></button>
  </div>
  <div class="lens" data-lens style="--lx:62%;--ly:46%;--lr:150px">
    <div class="lens-img img-tent" style="--ar:{tent[0] / tent[1]:.4f}">
      <div class="lay under">{pic("tent-cy", "", sizes="(max-width: 700px) 900px, 1600px")}<div class="pins">{pins(TENT_PINS)}</div></div>
      <div class="lay top">{pic("tent", "Cinco Cero, the tent under string lights with a mirror ball, the bar, the standing tables and the buffet set out, nobody there yet", sizes="(max-width: 700px) 900px, 1600px")}</div>
    </div>
    <div class="lens-img img-hall" style="--ar:{hall[0] / hall[1]:.4f}">
      <div class="lay under">{pic("hall-cy", "", sizes="(max-width: 700px) 700px, 1067px")}<div class="pins">{pins(HALL_PINS)}</div></div>
      <div class="lay top">{pic("hall", "The Handelsbeurs in Antwerp set for the Pro League Awards, its galleries and iron roof with the lighting rigged", sizes="(max-width: 700px) 700px, 1067px")}</div>
    </div>
    <div class="ring" aria-hidden="true"></div>
    <aside class="plan" aria-label="Your plan, as Elise would write it">
      <p class="plan-h mono">Honey it’s Handled</p>
      <p class="plan-t" data-o="planWhat">Your wedding</p>
      <p class="plan-r mono"><span data-o="planDate">{short_date(DEF["wedding"])}</span> · <span data-o="planPlace">here in Belgium</span></p>
      <p class="plan-r mono"><span data-o="planGuests">About {WED["guests"]} guests</span> · <span data-o="planHelp">Full planning</span></p>
      <ul class="plan-l mono">
        <li><span>Timeline</span><span>open before breakfast</span></li>
        <li><span>The florist</span><span>she knows where</span></li>
        <li><span>Place cards</span><span>the missing one, noticed</span></li>
        <li><span>Plan B</span><span>ready</span></li>
        <li><span>Plan B for plan B</span><span>ready</span></li>
      </ul>
    </aside>
    <p class="cap mono" data-o="lensCap">Cinco Cero, a 50th birthday, 28 August 2026</p>
  </div>
</section>
'''

# ------------------------------------------------------------------ 4. seventeen tabs, "And a lot of little decisions."
def tabs():
    lis = ''.join(f'<li style="--i:{i}"><button type="button" class="tab" data-tab="{i}" aria-pressed="true"><span>{esc(t)}</span></button></li>' for i, t in enumerate(TABS))
    def help_set(path, default):
        return ''.join(f'''<label class="hopt"><input type="radio" name="help-{path}" value="{h["id"]}"{" checked" if h["id"] == default else ""}><span class="hn">{esc(h["name"])}</span><span class="hl">{esc(h["line"])}</span></label>''' for h in P[path]['help'])
    return f'''<section class="tabs" id="tabs" data-tone="blue" aria-labelledby="h-tabs">
  <div class="wrap tabs-g">
    <div class="planner" data-planner style="--held:1">
      <div class="seventeen" aria-hidden="true"><svg class="sv-o" viewBox="0 0 {FIG["17"]["w"]} {FIG["17"]["h"]}" focusable="false"><path d="{FIG["17"]["d"]}"/></svg><svg class="sv-f" viewBox="0 0 {FIG["17"]["w"]} {FIG["17"]["h"]}" focusable="false"><path d="{FIG["17"]["d"]}"/></svg></div>
      <div class="pl-book" aria-hidden="true">
        <div class="pl-pages"></div>
        <div class="pl-cover">{mark(HH, HW, HHt, 'pl-hh')}<span class="pl-word">{mark(WORD, WW, WH, 'pl-wm')}</span></div>
      </div>
      <ol class="pl-tabs" aria-label="Seventeen things her pages say she handles">{lis}</ol>
      <p class="pl-day" aria-hidden="true"><span>The day itself</span></p>
    </div>
    <div class="tabs-t">
      <h2 id="h-tabs">And a lot of little decisions.</h2>
      <p class="lede" data-o="tabsQ">How much should Elise take on?</p>
      <fieldset class="help pp p-wedding"><legend class="sr">The help you’d like</legend>{help_set("wedding", "full")}</fieldset>
      <fieldset class="help pp p-private"><legend class="sr">The help you’d like</legend>{help_set("private", "whole")}</fieldset>
      <fieldset class="help pp p-company"><legend class="sr">The help you’d like</legend>{help_set("company", "whole")}</fieldset>
      <p class="count"><b data-o="tabCount">Elise holds 17 of 17.</b> {esc(D["tabsLine"])}</p>
      <p class="hint mono" data-o="tabsHint">Tap a tab to keep it yourself.</p>
      <a class="btn" href="#letter" data-cta><span data-o="cta">{esc(WED["cta"])}</span></a>
    </div>
  </div>
</section>
'''

# ------------------------------------------------------------------ 5. Elise, "Type A, so you don't have to be."
def elise():
    more = ''.join(f'<li class="mt" style="--r:{r}deg"><button type="button" class="peel" aria-pressed="false"><span class="mt-a">{esc(a)}</span><span class="mt-b">{esc(b)}</span></button></li>' for (a, b), r in zip(D['elise']['more'], (-4, 3, -2, 5, -3)))
    n = D['name']
    return f'''<section class="eli" id="elise" data-tone="blue" aria-labelledby="h-eli">
  <div class="eli-stage" data-eli>
    <h2 id="h-eli" class="eli-h">{esc(n["typeA"])}</h2>
    <figure class="stk s-book" style="--d:.9;--r:-5deg">{cutout("elise-book", "Elise Laeven with a book balanced on her head, a laptop in one hand and a glass and a pair of heels in the other", "(max-width: 700px) 46vw, 30vw", "stk-i")}</figure>
    <figure class="stk s-phone" style="--d:.5;--r:4deg">{cutout("elise-phone", "Elise on her phone with her gold planner under her arm", "(max-width: 700px) 40vw, 22vw", "stk-i")}</figure>
    <figure class="stk s-sit" style="--d:.7;--r:-2deg">{cutout("elise-sit", "Elise sitting, smiling", "(max-width: 700px) 42vw, 24vw", "stk-i")}</figure>
    <figure class="stk s-walk" style="--d:.35;--r:6deg">{cutout("elise-walk", "Elise walking past in a blur", "(max-width: 700px) 30vw, 16vw", "stk-i")}</figure>
  </div>
  <div class="wrap eli-g">
    <div class="eli-t">
      <p class="eli-intro">{esc(D["elise"]["intro"])}</p>
      <p>{esc(D["elise"]["lines"][0])}</p>
      <p>{esc(D["elise"]["lines"][1])}</p>
    </div>
    <div class="eli-side">
      <p class="wide eli-name">{esc(n["honey"])} {esc(n["handled"])}</p>
      <ul class="more" aria-label="A little more Elise">{more}</ul>
      <a class="btn" href="#letter" data-cta><span data-o="cta">{esc(WED["cta"])}</span></a>
    </div>
  </div>
</section>
'''

# ------------------------------------------------------------------ 6. the doors
def doors():
    hh = f'<svg class="door-hh" viewBox="-80 -60 {HW + 160} {HHt + 120}" aria-hidden="true" focusable="false"><path class="dh-l" fill-rule="evenodd" d="{HH}" transform="translate(-5 -6)"/><path class="dh-d" fill-rule="evenodd" d="{HH}" transform="translate(6 8)"/><path class="dh-m" fill-rule="evenodd" d="{HH}"/></svg>'
    c = D['nights']['cinco']; pr = D['nights']['pro']
    return f'''<section class="doors" id="doors" data-tone="dark" aria-labelledby="h-doors">
  <div class="doors-pin">
    <div class="behind">
      <div class="bh bh-cinco">{pic("disco", "", sizes="100vw")}</div>
      <div class="bh bh-pro">{pic("hall", "", sizes="100vw")}</div>
      <p class="behind-l"><span class="p-only p-wedding p-private">{esc(c["alive"])}</span><span class="p-only p-company">{esc(pr["line"])}</span></p>
    </div>
    <div class="beam" aria-hidden="true"></div>
    <div class="door dl" aria-hidden="true"><div class="door-in">{hh}</div></div>
    <div class="door dr" aria-hidden="true"><div class="door-in">{hh}</div></div>
    <h2 id="h-doors" class="doors-h">So when the doors open…</h2>
  </div>
</section>
'''

# ------------------------------------------------------------------ 7. her nights, and the number
def nights():
    c = D['nights']['cinco']; pr = D['nights']['pro']; q = D['quote']
    m570, w570, h570 = fig_mask('570+'); m125, w125, h125 = fig_mask('125')
    f125 = FIG['125']
    used.update(['night.webm', 'night.mp4', 'night-poster.jpg'])
    return f'''<section class="nights" id="nights" data-tone="dark" aria-labelledby="h-nights">
  <h2 id="h-nights" class="sr">Her nights so far</h2>
  <article class="night n-pro" aria-labelledby="h-pro">
    <div class="zoom" data-zoom>
      <div class="zoom-pin">
        <div class="fig-win" style="--m:{m570};--ar:{w570 / h570:.4f}">{pic("hall", "", sizes="100vw")}</div>
        <div class="zoom-full">{pic("hall", "The Handelsbeurs in Antwerp under its iron and glass roof, set for the Pro League Awards", sizes="100vw")}</div>
        <p class="fig-l mono"><span>{esc(pr["guestsText"])} guests</span><span>{esc(pr["dateText"])}</span></p>
      </div>
    </div>
    <div class="wrap night-t">
      <h3 id="h-pro">{esc(pr["name"])}</h3>
      <p class="meta mono">{esc(pr["kind"])} · {esc(pr["dateText"])} · the Handelsbeurs, Antwerp</p>
      <p class="night-big">{esc(pr["line"])}</p>
      <p>{esc(pr["text"])}</p>
      <p>{esc(pr["scenes"])} {esc(pr["timing"])}</p>
      <p class="credit mono">{esc(pr["credit"])} Words from her Pro League Awards page.</p>
      <div class="acts"><a class="btn p-only p-company" href="#letter" data-cta>Hire Elise for your event</a><a class="btn p-only p-wedding p-private" href="#letter" data-cta><span data-o="cta">{esc(WED["cta"])}</span></a></div>
    </div>
  </article>
  <article class="night n-cinco" aria-labelledby="h-cinco">
    <div class="fig125" style="--m:{m125};--ar:{w125 / h125:.4f}">
      <div class="fig-film" data-film>
        <img class="poster" src="media/night-poster.jpg" width="960" height="540" alt="" loading="lazy" decoding="async">
        <video muted loop playsinline preload="none" poster="media/night-poster.jpg" aria-hidden="true" tabindex="-1"><source src="media/night.webm" type="video/webm"><source src="media/night.mp4" type="video/mp4"></video>
      </div>
      <svg class="fig-line" viewBox="0 0 {f125["w"]} {f125["h"]}" aria-hidden="true" focusable="false"><path d="{f125["d"]}"/></svg>
      <p class="fig-cap mono">Inside the figures, her own Cinco Cero aftermovie</p>
    </div>
    <div class="wrap night-t two">
      <div>
        <h3 id="h-cinco">{esc(c["name"])}</h3>
        <p class="meta mono">{esc(c["kind"])} · {esc(c["dateText"])}</p>
        <p class="night-big">{esc(c["caption"])}</p>
        <p>{esc(c["brief"])}</p>
        <figure class="jan"><blockquote><p>“{esc(q["text"])}”</p></blockquote><figcaption>{esc(q["who"])}</figcaption></figure>
        <div class="acts"><a class="btn p-only p-private" href="#letter" data-cta>Plan my celebration</a><a class="btn p-only p-wedding p-company" href="#letter" data-cta><span data-o="cta">{esc(WED["cta"])}</span></a></div>
      </div>
      <div class="cc-pics">
        <figure class="cc-a">{pic("sign", "The Cinco Cero welcome sign on an easel at night, candles at its feet", sizes="(max-width: 700px) 60vw, 26vw")}</figure>
        <figure class="cc-b">{pic("lamp", "A heat lamp over the Cinco Cero buffet", sizes="(max-width: 700px) 46vw, 18vw")}</figure>
      </div>
    </div>
  </article>
  <div class="gst" data-guests>
    <div class="wrap gst-g">
      <h3 class="gst-q" id="h-gst" data-o="guestsQ">How many people are coming?</h3>
      <p class="gst-n" aria-hidden="true"><span data-o="guests">{WED["guests"]}</span></p>
      <div class="gst-line">
        <input type="range" name="guests" min="10" max="600" step="5" value="{WED["guests"]}" aria-labelledby="h-gst" aria-valuetext="{WED["guests"]} guests">
        <span class="mk" style="--x:{(125 - 10) / 590 * 100:.2f}"><b>125</b> Cinco Cero</span>
        <span class="mk up" style="--x:{(570 - 10) / 590 * 100:.2f}"><b>570+</b> Pro League Awards ’26</span>
      </div>
      <div class="gst-steps"><button type="button" class="step" data-g="-10" aria-label="Ten fewer guests">{MINUS}</button><button type="button" class="step" data-g="10" aria-label="Ten more guests">{PLUS}</button></div>
      <p class="gst-l" data-o="guestsLine">Fewer than Cinco Cero’s 125, a long table or a few round ones.</p>
      <a class="btn" href="#letter" data-cta><span data-o="cta">{esc(WED["cta"])}</span></a>
    </div>
  </div>
</section>
'''

# ------------------------------------------------------------------ 8. the letter, "…there's nothing left to do but celebrate."
def letter():
    cel = ''.join(f'<option{" selected" if o == "Wedding" else ""}>{esc(o)}</option>' for o in D['form']['celebrating'])
    found = '<option value="">Choose one</option>' + ''.join(f'<option>{esc(o)}</option>' for o in D['form']['found'])
    nxt = ''.join(f'<li><b>{esc(a)}</b> {esc(b)}</li>' for a, b in D['next'])
    used.add('facets.jpg'); used.add('ball.png')
    return f'''<section class="fin" id="letter" data-tone="red" aria-labelledby="h-fin">
  <div class="ball-wrap" aria-hidden="true"><span class="ball-wire"></span><img class="ball-still" src="media/ball.png" width="640" height="640" alt="" loading="lazy" decoding="async"><canvas id="ball"></canvas></div>
  <canvas id="spots" aria-hidden="true"></canvas>
  <div class="wrap fin-g">
    <h2 id="h-fin" class="fin-h">…there’s nothing left to do but celebrate.</h2>
    <form class="letter" data-letter novalidate aria-labelledby="h-tell">
      <h3 id="h-tell">{esc(D["lines"]["tell"])}</h3>
      <p class="lt-sub">{esc(D["lines"]["answers"])} It’s written from what you chose, so change anything you like.</p>
      <div class="f2">
        <label class="fld"><span>First name</span><input name="first" autocomplete="given-name" required></label>
        <label class="fld"><span>Last name</span><input name="last" autocomplete="family-name" required></label>
      </div>
      <div class="f2">
        <label class="fld"><span>Email address</span><input name="email" type="email" autocomplete="email" required></label>
        <label class="fld"><span>Phone <i>optional</i></span><input name="phone" type="tel" autocomplete="tel"></label>
      </div>
      <label class="fld"><span>What are we celebrating?</span><select name="celebrating">{cel}</select></label>
      <label class="fld"><span>Tell me everything.</span><textarea name="message" rows="5" data-f="message">{esc(DEF_MSG)}</textarea></label>
      <p class="rewrite" data-rewrite-row hidden><button type="button" class="tl" data-rewrite>Write it again from my choices</button></p>
      <label class="fld"><span>How did you find Honey, it’s Handled? <i>optional</i></span><select name="found">{found}</select></label>
      <p class="err" data-err role="alert"></p>
      <button class="btn send" type="submit">{esc(D["lines"]["handled"].rstrip("."))}</button>
      <p class="fine">This prototype sends nothing. On her live site your letter goes straight to Elise.</p>
    </form>
    <div class="sealed" data-sealed hidden tabindex="-1">
      <div class="env" aria-hidden="true">{art_png("env-open", "", "(max-width: 700px) 70vw, 380px", "env-i")}<span class="seal">{mark(HH, HW, HHt, 'seal-hh')}</span></div>
      <h3>{esc(D["lines"]["handled"])}</h3>
      <p data-o="sealedLine">Your letter is sealed. In the live version it’s with Elise now.</p>
      <ol class="next">{nxt}</ol>
      <p class="fine"><a data-mail href="mailto:{D["contact"]["email"]}">Send the same letter from your own email</a></p>
    </div>
  </div>
</section>
'''

def footer():
    c = D['contact']
    return f'''</main>
<footer class="ftr" data-tone="red">
  <div class="wrap">
    {mark(LOCK, LW, LH, 'ftr-lock', "Honey it’s Handled, wedding and event agency")}
    <div class="ftr-g">
      <p>Prefer email?<br><a href="mailto:{c["email"]}">{c["email"]}</a></p>
      <p>Rather call?<br><a href="tel:{c["phoneHref"]}">{c["phone"]}</a></p>
      <p>Follow along<br><a href="{c["instagram"]}" rel="noopener">Instagram</a> · <a href="{c["linkedin"]}" rel="noopener">LinkedIn</a></p>
    </div>
    <p class="fine">© 2026 Honey it’s Handled, Elise Laeven, Antwerp. Company number {c["kbo"]}. Pro League Awards photos by Kaat DM. Every photo and the film are hers, from honeyitshandled.com. Prototype by Astra agency, October 2026. Nothing on this page is sent.</p>
  </div>
</footer>
<div class="sbar" data-sbar aria-hidden="true"><p class="sbar-t" data-o="bar">{esc(DEF_BAR)}</p><a class="btn" href="#letter" tabindex="-1"><span data-o="cta">{esc(WED["cta"])}</span></a></div>
'''

def data_block():
    keep = {'built': D['built'], 'paths': P, 'tabs': TABS, 'offerYears': D['offer']['years'], 'contact': {'email': D['contact']['email']},
            'nights': {'cinco': {'caption': D['nights']['cinco']['caption']}}}
    return '<script type="application/json" id="hih-data">' + json.dumps(keep, ensure_ascii=False).replace('</', '<\\/') + '</script>\n<script>window.HIH_HH=' + json.dumps(HH) + ';</script>\n'

def page():
    return (head() + hero() + when() + details() + tabs() + elise() + doors() + nights() + letter() + footer() + data_block() +
            '<script src="js/site.js" defer></script>\n<script src="js/lacquer.js" defer></script>\n<script src="js/ball.js" defer></script>\n</body>\n</html>\n')

def build():
    if os.path.isdir(OUT): shutil.rmtree(OUT)
    os.makedirs(os.path.join(OUT, 'media'));
    html = page()
    for d in ('css', 'js', 'fonts'):
        shutil.copytree(os.path.join(B, d), os.path.join(OUT, d))
    for f in sorted(used):
        shutil.copy(os.path.join(B, 'media', f), os.path.join(OUT, 'media', f))
    open(os.path.join(OUT, 'index.html'), 'w').write(html)
    open(os.path.join(OUT, 'robots.txt'), 'w').write('User-agent: *\nDisallow: /\n')
    open(os.path.join(OUT, 'netlify.toml'), 'w').write('[[headers]]\n  for = "/*"\n  [headers.values]\n    X-Robots-Tag = "noindex, nofollow"\n')
    open(os.path.join(OUT, '404.html'), 'w').write(head().split('<main id="main">')[0].replace('</header>', '</header>') +
        '<main id="main" class="nf"><h1>This page isn’t here.</h1><p><a class="btn" href="index.html">Back to Honey it’s Handled</a></p></main></body></html>\n')
    # missing references are a build failure
    refs = set(re.findall(r'(?:src|href|srcset|poster)="(media/[^" ]+)', html)) | set(re.findall(r'(media/[\w.-]+\.\w+) \d+w', html))
    missing = [r for r in refs if not os.path.isfile(os.path.join(OUT, r))]
    assert not missing, missing
    hsh = hashlib.sha256()
    for root, _, fs in sorted(os.walk(OUT)):
        for f in sorted(fs):
            p = os.path.join(root, f); hsh.update(os.path.relpath(p, OUT).encode()); hsh.update(open(p, 'rb').read())
    print('site-v2 written,', len(used), 'media files, index', len(html), 'bytes, hash', hsh.hexdigest()[:16])

if __name__ == '__main__':
    build()
