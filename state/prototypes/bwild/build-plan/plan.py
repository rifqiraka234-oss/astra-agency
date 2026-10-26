#!/usr/bin/env python3
"""The plan beside the BWILD prototype, in Astra's voice, English, on its own site.
Writes ../site-plan/. Every figure comes from data/plan.json or is worked out here with astral, the same way the
prototype does it. How each figure was checked is in ../research/facts.md, 'Rechecked for the plan'."""
import os, json, shutil, re, html as H, importlib.util
from PIL import Image

B = os.path.dirname(os.path.abspath(__file__))
PB = os.path.join(B, '..', 'build')
OUT = os.path.join(B, '..', 'site-plan')
D = json.load(open(os.path.join(B, 'data', 'plan.json')))
PROTO = 'https://astra-bwild-prototype.netlify.app'
ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X']
used = set()

# the prototype's own daylight maths, so the plan and the site can't disagree
_spec = importlib.util.spec_from_file_location('proto', os.path.join(PB, 'build.py'))
P = importlib.util.module_from_spec(_spec); _spec.loader.exec_module(P)
SITE = P.D

def esc(s): return H.escape(s, quote=True)

def streak_line(cid, t):
    year = P.year_of(cid, t, P.TODAY); n, i = P.streak(year)
    a, b = year[i][0], year[i + n - 1][0]
    return f'A {P.hm(t)} run in {P.city(cid)["name"]} starts in the dark every day from {P.fmt_day(a)} to {P.fmt_day(b)}, {n} runs in a row.', sum(1 for x in year if x[3])

# ------------------------------------------------------------------ media

def media():
    """Today's pages (taken 26 Oct 2026, in today/) and the final prototype (shots/), resized once into media/."""
    md = os.path.join(B, 'media'); os.makedirs(md, exist_ok=True)
    jobs = [(os.path.join(B, 'today', n + '-d.png'), 't-' + n, (1200, 750)) for n in ('home', 'lum', 'presale', 'shop')]
    jobs += [(os.path.join(B, 'shots', n + '-d.png'), n + '-d', (1200, 750)) for n in ('s-hero', 's-dark', 's-seen', 's-paid', 's-adv', 's-bear')]
    jobs += [(os.path.join(B, 'shots', n + '-m.png'), n + '-m', (520, 1126)) for n in ('s-hero', 's-dark')]
    for src, name, size in jobs:
        jp = os.path.join(md, name + '.jpg')
        if os.path.exists(jp) and os.path.exists(src) and os.path.getmtime(jp) >= os.path.getmtime(src): continue
        assert os.path.exists(src), 'missing ' + src
        im = Image.open(src).convert('RGB').resize(size, Image.LANCZOS)
        im.save(jp, 'JPEG', quality=80, optimize=True, progressive=True)
        im.save(os.path.join(md, name + '.webp'), 'WEBP', quality=78, method=6)

def shot(name, alt, w, h, cls='', eager=False):
    used.update([name + '.webp', name + '.jpg'])
    load = 'eager" fetchpriority="high' if eager else 'lazy'
    return f'<picture><source type="image/webp" srcset="/media/{name}.webp"><img class="{cls}" src="/media/{name}.jpg" width="{w}" height="{h}" alt="{esc(alt)}" loading="{load}" decoding="async"></picture>'

def photo(key, alt, sizes, eager=False):
    """One of BWILD's own photos, from the prototype's media set."""
    sizes_ = sorted(json.load(open(os.path.join(PB, 'data', 'media.json')))[key]['sizes'])
    files = [f'{key}-{s[0]}' for s in sizes_]
    for f in files: used.update(['p:' + f + '.jpg', 'p:' + f + '.webp'])
    ws = ', '.join(f'/media/{f}.webp {s[0]}w' for f, s in zip(files, sizes_))
    js = ', '.join(f'/media/{f}.jpg {s[0]}w' for f, s in zip(files, sizes_))
    w, h = sizes_[-1]
    load = 'eager" fetchpriority="high' if eager else 'lazy'
    return f'<picture><source type="image/webp" srcset="{ws}" sizes="{sizes}"><img src="/media/{files[0]}.jpg" srcset="{js}" sizes="{sizes}" width="{w}" height="{h}" alt="{esc(alt)}" loading="{load}" decoding="async"></picture>'

def slashes(cls=''): return P.slashes(cls)  # their logo's three slashes, traced once for the prototype

def ch(n, name): return f'<p class="chn"><span class="chn-n">{ROMAN[n - 1]}</span><span class="chn-t">{name}</span></p>'

def src(s): return f'<p class="src">{s}</p>'

# ------------------------------------------------------------------ the route, a control

KLABEL = {'pop': 'A different offer first', 'away': 'Leaves your site', 'bad': 'No €1 offer', 'now': '30% off locked'}

def stops_html(key):
    out = ''
    for i, s in enumerate(D['route']['routes'][key]['stops']):
        k = s.get('k', '')
        tag = f'<span class="rs-k">{KLABEL[k]}</span>' if k else ''
        out += f'<li class="rs {k}" style="--i:{i}"><span class="rs-o" aria-hidden="true"></span><div class="rs-x"><b>{esc(s["t"])}</b><span>{esc(s["p"])}</span>{tag}</div></li>'
    return out

def route():
    r = D['route']; key = 'bar'
    data = json.dumps({'routes': r['routes'], 'labels': KLABEL}, ensure_ascii=False).replace('[[', '[ [')
    btns = ''.join(f'<button type="button" class="btn" data-rt="{k}" aria-pressed="{"true" if k == key else "false"}">{esc(v["label"])}</button>' for k, v in r['routes'].items())
    return f'''<div class="rt" data-route>
  <div class="seg" role="group" aria-label="Where the runner starts">{btns}</div>
  <ol class="rail" data-rail aria-live="polite">{stops_html(key)}</ol>
  <p class="rt-sum" data-sum aria-live="polite">{esc(r["routes"][key]["sum"])}</p>
  <script type="application/json" data-routes>{data}</script>
</div>'''

# ------------------------------------------------------------------ the dark year, a control

def dark():
    cid, t = 'geneva', SITE['picks']['sunrise']
    year = P.year_of(cid, t, P.TODAY); n = sum(1 for x in year if x[3])
    rows, cur = [], None
    for x in year:
        k = (x[0].year, x[0].month)
        if k != cur: rows.append((x[0], [])); cur = k
        rows[-1][1].append(x)
    cells = ''.join(f'<div class="dk-row"><span>{d0.strftime("%b")} ’{d0.strftime("%y")}</span><div class="dk-cells" style="--d:{d0.day}">' + ''.join(f'<i class="{"on" if x[3] else ""}"></i>' for x in xs) + '</div></div>' for d0, xs in rows)
    opts = ''.join(f'<option value="{c["id"]}"{" selected" if c["id"] == cid else ""}>{c["name"]}</option>' for c in SITE['cities'])
    data = json.dumps({'cities': SITE['cities']}, ensure_ascii=False)
    return f'''<form class="dk" data-dark onsubmit="return false" aria-label="Runs in the dark over the next year">
  <div class="dk-ctl">
    <label for="dk-c">City</label>
    <select id="dk-c" data-c>{opts}</select>
    <label for="dk-t">Run starts at</label>
    <div class="dk-in"><input id="dk-t" type="range" min="240" max="1380" step="5" value="{t}" aria-valuetext="{P.hm(t)}" data-t><output for="dk-t" data-o="t">{P.hm(t)}</output></div>
  </div>
  <div class="dk-res">
    <p class="dk-big"><b data-o="n">{n}</b> <span>of the next 365 runs start in the dark</span></p>
    <div class="dk-strip" data-strip aria-hidden="true">{cells}</div>
    <p class="dk-key" aria-hidden="true"><i class="on"></i> a run in the dark <i></i> a run in daylight</p>
  </div>
  <script type="application/json" data-cities>{data}</script>
</form>'''

def gantt():
    W = 6; out = ''
    for w in D['roadmap']:
        nums = [int(x) for x in re.findall(r'\d+', w['when'])]; a, b = nums[0], nums[-1]
        items = ''.join(f'<li>{esc(t)}</li>' for t in w['items'])
        out += f'''<li class="gt-r"><div class="gt-l"><span class="gt-w">{w["when"]}</span><h3>{w["h"]}</h3></div>
<div class="gt-track" aria-hidden="true"><i style="--a:{(a - 1) / W:.4f};--b:{b / W:.4f}"></i></div><ul>{items}</ul></li>'''
    wk = ''.join(f'<span>{i}</span>' for i in range(1, W + 1))
    return f'<div class="gt"><div class="gt-wk" aria-hidden="true"><span class="gt-wl">Week</span><div>{wk}</div></div><ol>{out}</ol></div>'

# ------------------------------------------------------------------ the page

def page():
    c, td, rt, dk, wo, bt, un, co, tm, en = (D[k] for k in ('cover', 'today', 'route', 'dark', 'worth', 'built', 'under', 'cost', 'team', 'end'))
    sl, _ = streak_line('geneva', SITE['picks']['sunrise'])
    found = ''.join(f'<li><p>{sl if f["t"] == "STREAK_LINE" else esc(f["t"])}</p><span>{f["src"]}, {D["meta"]["today"]}</span></li>' for f in c['found'])
    facts = ''.join(f'<div><dt>{k}</dt><dd>{esc(v)}</dd></div>' for k, v in td['facts'])
    tshots = ''.join(f'<figure>{shot(s["img"], s["cap"] + ", " + D["meta"]["today"], 1200, 750)}<figcaption>{esc(s["cap"])}</figcaption></figure>' for s in td['shots'])
    frames = ''.join(f'<div class="bf-i{" on" if i == 0 else ""}" data-i="{i}">{shot(s["img"], "The new BWILD site, " + s["h"].lower().rstrip("?"), 1200, 750)}</div>' for i, s in enumerate(bt['shots']))
    caps = ''.join(f'<li data-i="{i}"><span class="bc-n">{i + 1:02d}</span><div><h3>{esc(s["h"])}</h3><p>{esc(s["p"])}</p><div class="bc-m">{shot(s["img"], "", 1200, 750)}</div></div></li>' for i, s in enumerate(bt['shots']))
    phones = ''.join(f'<figure>{shot(p["img"], p["alt"], 520, 1126)}</figure>' for p in bt['phones'])
    items = ''.join(f'<div><dt><span>{i + 1:02d}</span>{k}</dt><dd>{esc(v)}</dd></div>' for i, (k, v) in enumerate(un['items']))
    incl = ''.join(f'<li>{esc(x)}</li>' for x in co['items'])
    kp = ''.join(f'<li><b>{k["h"]}</b><span>{k["where"]}</span></li>' for k in D['kpis'])
    ppl = ''.join(f'<div class="pp"><h3>{p["name"]}</h3><p class="pp-r">{p["role"]}</p><p>{p["bio"]}</p><a class="u" href="{p["li"]}" rel="noopener">{p["name"].split()[0]} on LinkedIn</a></div>' for p in tm['people'])
    toc = [('today', 'Today'), ('route', 'The route'), ('dark', 'The dark'), ('worth', 'The €1'), ('built', 'Built'),
           ('under', 'Underneath'), ('cost', 'The cost'), ('weeks', 'Six weeks'), ('team', 'The team')]
    tocl = ''.join(f'<li><a href="#{a}"><span>{ROMAN[i]}</span>{t}</a></li>' for i, (a, t) in enumerate(toc))
    fav = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' fill='%2308090B'/%3E%3Cpath d='M22 50 30 14M32 54 40 10M42 50 50 14' stroke='%23fff' stroke-width='5' stroke-linecap='round'/%3E%3C/svg%3E"
    return f'''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{esc(D["meta"]["title"])}</title>
<meta name="description" content="{esc(D["meta"]["desc"])}">
<meta name="robots" content="noindex, nofollow">
<meta name="theme-color" content="#08090B">
<link rel="icon" href="{fav}">
<link rel="preload" href="/fonts/mona-sans-latin-standard-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/css/plan.css">
<script>document.documentElement.classList.add('js');if(matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('rm')</script>
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<header class="hdr"><div class="wrap hdr-in">
<a class="hb" href="#top">{slashes('hb-sl')}<span class="hb-t">The plan</span><span class="hb-s">for BWILD, by Astra</span></a>
<nav aria-label="The prototype and the contact"><a class="d" href="{PROTO}/">The prototype</a><a class="btn sm solid" href="{en["mail"]}">{en["cta"]}</a></nav>
</div></header>
<main id="main">

<section class="cv" id="top" aria-labelledby="cv-h">
  <div class="cv-art" aria-hidden="true">{photo("lum", "", "(max-width: 860px) 100vw, 60vw", eager=True)}</div>
  <div class="wrap cv-in">
    <p class="cv-by">{c["by"]}</p>
    <h1 id="cv-h" class="cv-h">{c["h"]}</h1>
    <p class="lead">{c["lede"]}</p>
    <div class="acts"><a class="btn solid" href="{PROTO}/">Open the prototype</a><a class="btn" href="#cost">See the cost</a></div>
  </div>
  <div class="wrap"><ol class="found">{found}</ol>
  <nav class="toc" aria-label="Chapters"><ol>{tocl}</ol></nav></div>
</section>

<section class="sec" id="today" aria-labelledby="t-h">
  <div class="wrap">
    {ch(1, "Today")}
    <div class="two"><h2 id="t-h">{td["h"]}</h2><p class="lead">{esc(td["lede"])}</p></div>
    <dl class="kv">{facts}</dl>
    <div class="tshots">{tshots}</div>
    {src(td["src"])}
  </div>
</section>

<section class="sec" id="route" aria-labelledby="r-h">
  <div class="wrap">
    {ch(2, "The route")}
    <div class="two"><h2 id="r-h">{rt["h"]}</h2><p class="lead">{rt["lede"]}</p></div>
    {route()}
    {src(rt["src"])}
  </div>
</section>

<section class="sec" id="dark" aria-labelledby="d-h">
  <div class="wrap">
    {ch(3, "The dark")}
    <div class="two"><h2 id="d-h">{dk["h"]}</h2><p class="lead">{dk["lede"]}</p></div>
    {dark()}
    <p class="lead dk-use">{dk["use"]}</p>
    {src(dk["src"])}
  </div>
</section>

<section class="sec bone" id="worth" aria-labelledby="w-h">
  <div class="wrap wo">
    <div>{ch(4, "The €1")}<h2 id="w-h">{wo["h"]}</h2></div>
    <div class="wo-fig"><p class="wo-big">{wo["big"]}</p><p class="wo-l">{wo["label"]}</p></div>
    <p class="lead wo-p">{esc(wo["lede"])}</p>
    {src(wo["src"])}
  </div>
</section>

<section class="sec" id="built" aria-labelledby="b-h">
  <div class="wrap">
    {ch(5, "Built")}
    <div class="two"><h2 id="b-h">{bt["h"]}</h2><p class="lead">{bt["lede"]}</p></div>
    <div class="bf" data-bf>
      <ol class="bc">{caps}</ol>
      <div class="bf-stick"><div class="bf-frame">{frames}</div></div>
    </div>
    <div class="bt-ph">{phones}</div>
    <div class="acts"><a class="btn solid" href="{PROTO}/">Open the prototype</a></div>
  </div>
</section>

<section class="sec" id="under" aria-labelledby="u-h">
  <div class="wrap">
    {ch(6, "Underneath")}
    <div class="two"><h2 id="u-h">{un["h"]}</h2><p class="lead">{un["lede"]}</p></div>
    <dl class="un">{items}</dl>
    {src(un["src"])}
  </div>
</section>

<section class="sec cost" id="cost" aria-labelledby="c-h">
  <div class="wrap co">
    <div class="co-l">
      {ch(7, "The cost")}
      <h2 id="c-h">{co["h"]}</h2>
      <p class="lead">{co["lede"]}</p>
      <div class="co-split" aria-label="How it's paid"><div><b>€{co["price"] // 2:,}</b><span>to start</span></div><div><b>€{co["price"] - co["price"] // 2:,}</b><span>when it's live</span></div></div>
    </div>
    <div class="co-r">
      <h3 class="co-h">What's in it</h3>
      <ul class="co-in">{incl}</ul>
      <div class="co-small"><h3>{co["small_h"]}</h3><p>{co["small_p"]}</p></div>
      <p class="co-not">{co["not"]}</p>
    </div>
  </div>
</section>

<section class="sec" id="weeks" aria-labelledby="g-h">
  <div class="wrap">
    {ch(8, "Six weeks")}
    <h2 id="g-h">Six weeks to launch ready, the €1 first.</h2>
    {gantt()}
    <p class="lead gt-after">{D["after"]}</p>
    <h3 class="kp-h">What we’d measure, every week</h3>
    <ul class="kp">{kp}</ul>
  </div>
</section>

<section class="sec" id="team" aria-labelledby="tm-h">
  <div class="wrap two">
    <div>{ch(9, "The team")}<h2 id="tm-h">Astra, one team with Amwisesa.</h2><p class="lead">{tm["lede"]}</p><p class="lead">{tm["brands"]}</p>{src(tm["disclosure"])}</div>
    <div class="ppl">{ppl}</div>
  </div>
</section>

<section class="end" aria-labelledby="e-h">
  <div class="wrap end-in">
    {slashes('end-sl')}
    <h2 id="e-h">{en["h"]}</h2>
    <p class="lead">{en["lede"]}</p>
    <div class="acts"><a class="btn solid" href="{en["mail"]}">{en["cta"]}</a><a class="btn" href="{PROTO}/">Open the prototype</a></div>
    <p class="end-f">{en["foot"]}</p>
  </div>
</section>
</main>
<script src="/js/plan.js" defer></script>
</body></html>'''

def build():
    media()
    if os.path.isdir(OUT): shutil.rmtree(OUT)
    for d in ('css', 'js', 'fonts', 'media'): os.makedirs(os.path.join(OUT, d))
    html = page()
    open(os.path.join(OUT, 'index.html'), 'w').write(html)
    shutil.copy(os.path.join(B, 'css', 'plan.css'), os.path.join(OUT, 'css', 'plan.css'))
    shutil.copy(os.path.join(B, 'js', 'plan.js'), os.path.join(OUT, 'js', 'plan.js'))
    for f in os.listdir(os.path.join(PB, 'fonts')):
        shutil.copy(os.path.join(PB, 'fonts', f), os.path.join(OUT, 'fonts', f))
    for u in sorted(used):
        if u.startswith('p:'): shutil.copy(os.path.join(PB, 'media', u[2:]), os.path.join(OUT, 'media', u[2:]))
        else: shutil.copy(os.path.join(B, 'media', u), os.path.join(OUT, 'media', u))
    open(os.path.join(OUT, 'robots.txt'), 'w').write('User-agent: *\nDisallow: /\n')
    open(os.path.join(OUT, '_headers'), 'w').write('/*\n  X-Robots-Tag: noindex, nofollow\n')
    for ref in re.findall(r'(?:src|href)="(/[^"#?]+)"', html) + [x.split()[0] for s in re.findall(r'srcset="([^"]+)"', html) for x in s.split(', ')]:
        assert os.path.exists(os.path.join(OUT, ref.lstrip('/'))), ref
    for ref in re.findall(r'href="#([^"]+)"', html):
        assert f'id="{ref}"' in html, ref
    assert '[[' not in html, 'a [[ in the page'
    print('wrote', OUT, len(html), 'bytes,', len(used), 'media,', streak_line('geneva', SITE['picks']['sunrise'])[0])

if __name__ == '__main__':
    build()
