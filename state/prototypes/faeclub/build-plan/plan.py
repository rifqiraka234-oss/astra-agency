#!/usr/bin/env python3
"""The plan beside the Fae Club prototype, in Astra's voice, English, on its own site.
Writes ../site-plan/. Every figure comes from data/plan.json, every chart is computed from it, and every source sits
under what it supports. How each figure was checked is in ../research/plan-facts.md."""
import os, json, shutil, re, html as H
from PIL import Image

B = os.path.dirname(os.path.abspath(__file__))
PB = os.path.join(B, '..', 'build')
OUT = os.path.join(B, '..', 'site-plan')
SHOTS = os.path.join(B, 'shots')
TODAY = os.environ.get('FAE_TODAY_SHOTS', '/tmp/claude-0/-home-user-astra-agency/535b0528-0e36-5b6e-a11b-9344c62d2e80/scratchpad/fae/today')
D = json.load(open(os.path.join(B, 'data', 'plan.json')))
PROTO = 'https://astra-faeclub-prototype.netlify.app'
used = set()
ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X']

def esc(s): return H.escape(s, quote=True)

def gbp(p): return '£{:,.2f}'.format(p / 100)

def split3(total):
    base = total // 3
    return [total - 2 * base, base, base]

# ------------------------------------------------------------------ media

def media():
    """Screens of today's sites (taken 25 Oct 2026) and of the final prototype, resized once into build-plan/media."""
    md = os.path.join(B, 'media'); os.makedirs(md, exist_ok=True)
    jobs = [(os.path.join(TODAY, n + '-d.png'), 't-' + n, (1200, 750)) for n in ('shop', 'ue', 'dead', 'event', 'enquire')]
    jobs += [(os.path.join(SHOTS, n + '-d.png'), n + '-d', (1200, 750)) for n in ('s-hero', 's-book', 's-hall', 's-tiers', 's-pay3', 's-paid', 's-rt')]
    jobs += [(os.path.join(SHOTS, n + '-m.png'), n + '-m', (520, 1126)) for n in ('s-hero', 's-paid')]
    for src, name, size in jobs:
        jp = os.path.join(md, name + '.jpg')
        if os.path.exists(jp) and os.path.exists(src) and os.path.getmtime(jp) >= os.path.getmtime(src): continue
        if not os.path.exists(src):
            assert os.path.exists(jp), 'missing source and no saved copy for ' + name
            continue
        im = Image.open(src).convert('RGB').resize(size, Image.LANCZOS)
        im.save(jp, 'JPEG', quality=80, optimize=True, progressive=True)
        im.save(os.path.join(md, name + '.webp'), 'WEBP', quality=78, method=6)

def shot(name, alt, w, h, cls='', eager=False):
    used.update([name + '.webp', name + '.jpg'])
    load = 'eager" fetchpriority="high' if eager else 'lazy'
    return f'<picture><source type="image/webp" srcset="/media/{name}.webp"><img class="{cls}" src="/media/{name}.jpg" width="{w}" height="{h}" alt="{esc(alt)}" loading="{load}" decoding="async"></picture>'

def photo(key, alt, sizes, eager=False):
    """One of Fae Club's own photos, from the prototype's media set."""
    sizes_ = sorted(json.load(open(os.path.join(PB, 'media', 'manifest.json')))[key]['sizes'])
    files = [f'{key}-{s[0]}.jpg' for s in sizes_]
    for f in files: used.update(['p:' + f, 'p:' + f[:-4] + '.webp'])
    ws = ', '.join(f'/media/{f[:-4]}.webp {s[0]}w' for f, s in zip(files, sizes_))
    js = ', '.join(f'/media/{f} {s[0]}w' for f, s in zip(files, sizes_))
    w, h = sizes_[-1]
    load = 'eager" fetchpriority="high' if eager else 'lazy'
    return f'<picture><source type="image/webp" srcset="{ws}" sizes="{sizes}"><img src="/media/{files[0]}" srcset="{js}" sizes="{sizes}" width="{w}" height="{h}" alt="{esc(alt)}" loading="{load}" decoding="async"></picture>'

def ch(n, name): return f'<p class="chn"><span class="chn-n">{ROMAN[n - 1]}</span><span class="chn-t">{name}</span></p>'

def src(s): return f'<p class="src">{s}</p>'

# ------------------------------------------------------------------ the route, the signature control

ICON = {
    'bad': '<svg viewBox="0 0 20 20" aria-hidden="true" focusable="false"><line x1="6" y1="6" x2="14" y2="14"/><line x1="14" y1="6" x2="6" y2="14"/></svg>',
    'now': '<svg viewBox="0 0 20 20" aria-hidden="true" focusable="false"><rect x="4" y="4" width="5" height="5"/><rect x="11" y="4" width="5" height="5"/><rect x="4" y="11" width="5" height="5"/><rect x="12" y="12" width="3" height="3"/></svg>',
}
KLABEL = {'bad': 'Can’t be found', 'you': 'You', 'wait': 'Up to 48 hours', 'now': 'Straight away'}

def stops_html(key):
    st = D['route']['routes'][key]['stops']
    out = ''
    for i, s in enumerate(st):
        k = s.get('k', '')
        tag = f'<span class="rs-k">{KLABEL[k]}</span>' if k else ''
        out += f'<li class="rs {k}" style="--i:{i}"><span class="rs-o">{ICON.get(k, "")}</span><div class="rs-x"><b>{s["t"]}</b><span>{s["p"]}</span>{tag}</div></li>'
    return out

def route():
    r = D['route']; key = 't3'
    data = json.dumps({'routes': r['routes'], 'labels': KLABEL, 'icons': ICON}, ensure_ascii=False).replace('[[', '[ [')
    n = len(r['routes'][key]['stops'])
    return f'''<div class="rt" data-route>
  <div class="rt-ctl">
    <div class="seg" role="group" aria-label="How the guest pays"><button type="button" class="btn" data-pay="f" aria-pressed="false">Pays in full</button><button type="button" class="btn" data-pay="3" aria-pressed="true">Pays in 3</button></div>
    <div class="seg" role="group" aria-label="Which site"><button type="button" class="btn" data-when="t" aria-pressed="true">Today</button><button type="button" class="btn" data-when="n" aria-pressed="false">The new site</button></div>
  </div>
  <ol class="rail" data-rail style="--n:{n}" aria-live="polite">{stops_html(key)}</ol>
  <p class="rt-sum" data-sum aria-live="polite">{r["routes"][key]["sum"]}</p>
  <script type="application/json">{data}</script>
</div>'''

# ------------------------------------------------------------------ the price strip, a chart that is a control

MAXP = 30000

def price():
    p = D['price']; rows = ''
    for r in p['rows']:
        x = r['full'] / MAXP
        us = ' us' if r.get('us') else ''
        val = gbp(r['full']) + (f' <small>{r["plus"]}</small>' if r.get('plus') else '')
        extra = ''
        if r.get('us'):
            s3 = split3(r['full'])
            extra = f' data-full="{r["full"]}" data-today="{s3[0]}"'
        rows += f'<li class="pr-r{us}"{extra}><div class="pr-n"><b>{r["name"]}</b><small>{r["note"]}</small></div><div class="pr-t" aria-hidden="true"><i class="pr-l" style="--x:{x:.4f}"></i><span class="pr-d" style="--x:{x:.4f}"></span></div><span class="pr-v" data-v>{val}</span></li>'
    ticks = ''.join(f'<span style="--x:{v / MAXP:.4f}">£{v // 100}</span>' for v in range(0, MAXP + 1, 5000))
    us = next(r for r in p['rows'] if r.get('us')); s3 = split3(us['full'])
    trs = ''.join(f'<tr><th scope="row">{r["name"]}, {r["note"]}</th><td>{gbp(r["full"])}{(" " + r["plus"]) if r.get("plus") else ""}</td><td>{gbp(split3(r["full"])[0]) if r.get("us") else "Not checked"}</td></tr>' for r in p['rows'])
    return f'''<figure class="chart pr" data-price>
  <div class="pr-top">
    <figcaption class="ch-t">What a guest pays on the day they buy</figcaption>
    <div class="seg" role="group" aria-label="Show"><button type="button" class="btn" data-show="full" aria-pressed="true">Full price</button><button type="button" class="btn" data-show="today" aria-pressed="false">Due today with pay in 3</button></div>
  </div>
  <ol class="pr-rows">{rows}</ol>
  <div class="pr-ax" aria-hidden="true">{ticks}</div>
  <p class="pr-out" data-out aria-live="polite">The Fairytale Ball, {gbp(us["full"])} in full.</p>
  <details class="tv"><summary>Show as a table</summary><table><thead><tr><th scope="col">Event and ticket</th><th scope="col">Full price</th><th scope="col">Due today with pay in 3</th></tr></thead><tbody>{trs}</tbody></table></details>
  {src(p["src"])}
</figure>'''

# ------------------------------------------------------------------ the hours, her own estimate

def hours():
    h = D['hours']; o, m = h['orders'], h['mins']
    hrs = o['def'] * m['def'] / 60
    wall = ''.join(f'<i class="{"on" if i < o["def"] // 10 else ""}"></i>' for i in range(o['max'] // 10))
    def fmt(x): return ('%.1f' % x).rstrip('0').rstrip('.')
    return f'''<form class="hr" data-hours onsubmit="return false" aria-label="The hours of RSVPs by hand, your estimate">
  <div class="hr-ctl">
    <label for="hr-o">Pay in 3 orders for one ball</label>
    <div class="hr-in"><input id="hr-o" type="range" min="{o["min"]}" max="{o["max"]}" step="{o["step"]}" value="{o["def"]}" aria-valuetext="{o["def"]} orders"><output for="hr-o" data-o="o">{o["def"]}</output></div>
    <label for="hr-m">Minutes for each, RSVP and QR email</label>
    <div class="hr-in"><input id="hr-m" type="range" min="{m["min"]}" max="{m["max"]}" step="{m["step"]}" value="{m["def"]}" aria-valuetext="{m["def"]} minutes"><output for="hr-m" data-o="m">{m["def"]}</output></div>
  </div>
  <div class="hr-res">
    <p class="hr-big"><b data-o="h">{fmt(hrs)}</b> <span data-o="hu">{"hour" if fmt(hrs) == "1" else "hours"}</span></p>
    <p class="hr-l">of RSVPs by hand for one ball, and <b data-o="g">{o["def"]}</b> guests waiting up to 48 hours for their QR.</p>
    <p class="hr-n">On the new site, none. The QR goes out when the payment clears.</p>
    <div class="hr-wall" aria-hidden="true">{wall}</div>
    <p class="hr-key" aria-hidden="true">Each mark is ten orders</p>
  </div>
</form>'''

def gantt():
    out = ''
    for w in D['roadmap']:
        a, b = [int(x) for x in re.findall(r'\d+', w['when'])]
        items = ''.join(f'<li>{t}</li>' for t in w['items'])
        out += f'''<li class="gt-r"><div class="gt-l"><span class="gt-w">{w["when"]}</span><h3>{w["h"]}</h3></div>
<div class="gt-track" aria-hidden="true"><i style="--a:{(a - 1) / 12:.4f};--b:{b / 12:.4f}"></i></div><ul>{items}</ul></li>'''
    wk = ''.join(f'<span>{i}</span>' for i in range(1, 13))
    return f'<div class="gt"><div class="gt-wk" aria-hidden="true"><span class="gt-wl">Week</span><div>{wk}</div><span class="gt-x"></span></div><ol>{out}</ol></div>'

# ------------------------------------------------------------------ the page

def page():
    c, td, rt, pr, hr, bt, un, re_, tm, en = (D[k] for k in ('cover', 'today', 'route', 'price', 'hours', 'built', 'under', 'retreat', 'team', 'end'))
    found = ''.join(f'<li><p>{f["t"]}</p><span>{f["src"]}, {D["meta"]["today"]}</span></li>' for f in c['found'])
    facts = ''.join(f'<div><dt>{k}</dt><dd>{v}</dd></div>' for k, v in td['facts'])
    tshots = ''.join(f'<figure>{shot(s["img"], s["cap"] + ", " + D["meta"]["today"], 1200, 750)}<figcaption>{s["cap"]}</figcaption></figure>' for s in td['shots'])
    frames = ''.join(f'<div class="bf-i{" on" if i == 0 else ""}" data-i="{i}">{shot(s["img"], "The new Fae Club site, " + s["h"].lower().rstrip("?"), 1200, 750)}</div>' for i, s in enumerate(bt['shots']))
    caps = ''.join(f'<li data-i="{i}"><span class="bc-n">{i + 1:02d}</span><div><h3>{s["h"]}</h3><p>{s["p"]}</p><div class="bc-m">{shot(s["img"], "", 1200, 750)}</div></div></li>' for i, s in enumerate(bt['shots']))
    phones = ''.join(f'<figure>{shot(p["img"], p["alt"], 520, 1126)}</figure>' for p in bt['phones'])
    items = ''.join(f'<div><dt><span>{i + 1:02d}</span>{k}</dt><dd>{v}</dd></div>' for i, (k, v) in enumerate(un['items']))
    kp = ''.join(f'<li><b>{k["h"]}</b><span>{k["where"]}</span></li>' for k in D['kpis'])
    ppl = ''.join(f'<div class="pp"><h3>{p["name"]}</h3><p class="pp-r">{p["role"]}</p><p>{p["bio"]}</p><a class="u" href="{p["li"]}" rel="noopener">{p["name"].split()[0]} on LinkedIn</a></div>' for p in tm['people'])
    toc = [('today', 'Today'), ('route', 'The route'), ('price', 'The price'), ('hours', 'Your hours'), ('built', 'Built'),
           ('under', 'Underneath'), ('retreat', 'The retreat'), ('days', '90 days'), ('team', 'The team')]
    tocl = ''.join(f'<li><a href="#{a}"><span>{ROMAN[i]}</span>{t}</a></li>' for i, (a, t) in enumerate(toc))
    fav = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' fill='%23022B12'/%3E%3Cpath d='M18 54V30a14 14 0 0 1 28 0v24' fill='none' stroke='%23C8B376' stroke-width='4'/%3E%3C/svg%3E"
    return f'''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{esc(D["meta"]["title"])}</title>
<meta name="description" content="{esc(D["meta"]["desc"])}">
<meta name="robots" content="noindex, nofollow">
<meta name="theme-color" content="#022B12">
<link rel="icon" href="{fav}">
<link rel="preload" href="/fonts/bodoni-moda-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/css/plan.css">
<script>document.documentElement.classList.add('js');if(matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('rm')</script>
</head>
<body data-sky="dusk" data-art-late>
<canvas class="sky" id="sky" aria-hidden="true"></canvas><canvas class="motes" id="motes" aria-hidden="true"></canvas><canvas class="fx" id="fx" aria-hidden="true"></canvas>
<a class="skip" href="#main">Skip to content</a>
<header class="hdr"><div class="wrap hdr-in">
<a class="hb" href="#top"><span class="hb-t">The plan</span><span class="hb-s">for Fae Club, by Astra</span></a>
<nav aria-label="The prototype and the contact"><a class="d" href="{PROTO}/">The prototype</a><a class="btn sm" href="{en["mail"]}">{en["cta"]}</a></nav>
</div></header>
<main id="main">

<section class="cv" id="top" data-sky="dusk" aria-labelledby="cv-h">
  <div class="wrap cv-in">
    <div class="cv-txt">
      <p class="cv-by">{c["by"]}</p>
      <h1 id="cv-h" class="cv-h">{c["h"]}</h1>
      <p class="lead">{c["lede"]}</p>
      <div class="acts"><a class="btn solid" href="{PROTO}/">Open the prototype</a><a class="btn" href="#today">Read the plan</a></div>
    </div>
    <div class="cv-arch" aria-hidden="true"><div class="arch">{photo("hall", "", "(max-width: 860px) 86vw, 40vw", eager=True)}</div></div>
  </div>
  <div class="wrap"><ol class="found">{found}</ol>
  <nav class="toc" aria-label="Chapters"><ol>{tocl}</ol></nav></div>
</section>

<section class="sec" id="today" aria-labelledby="t-h">
  <div class="wrap">
    {ch(1, "Today")}
    <h2 id="t-h" class="t1">{td["h"]}</h2>
    <figure class="qt"><blockquote><p>{td["quote"]}</p></blockquote><figcaption>{td["quote_src"]}</figcaption></figure>
    <div class="two">
      <p class="lead">{td["lede"]}</p>
      <dl class="kv">{facts}</dl>
    </div>
    <div class="tshots">{tshots}</div>
    {src(td["src"])}
  </div>
</section>

<section class="sec dark" id="route" data-sky="night" aria-labelledby="r-h">
  <div class="wrap">
    {ch(2, "The route")}
    <div class="two"><h2 id="r-h" class="t1">{rt["h"]}</h2><p class="lead">{rt["lede"]}</p></div>
    {route()}
    {src(rt["src"])}
  </div>
</section>

<section class="sec" id="price" aria-labelledby="p-h">
  <div class="wrap">
    {ch(3, "The price")}
    <div class="two"><h2 id="p-h" class="t1">{pr["h"]}</h2><p class="lead">{pr["lede"]}</p></div>
    {price()}
  </div>
</section>

<section class="sec" id="hours" aria-labelledby="h-h">
  <div class="wrap">
    {ch(4, "Your hours")}
    <div class="two"><h2 id="h-h" class="t1">{hr["h"]}</h2><p class="lead">{hr["lede"]}</p></div>
    {hours()}
    {src(hr["src"])}
  </div>
</section>

<section class="sec dark" id="built" data-sky="toast" aria-labelledby="b-h">
  <div class="wrap">
    {ch(5, "Built")}
    <div class="two"><h2 id="b-h" class="t1">{bt["h"]}</h2><p class="lead">{bt["lede"]}</p></div>
    <div class="bf" data-bf>
      <ol class="bc">{caps}</ol>
      <div class="bf-stick"><div class="bf-frame">{frames}</div></div>
    </div>
    <div class="bt-ph">{phones}</div>
    <div class="acts"><a class="btn solid" href="{PROTO}/">Open the prototype</a><a class="btn" href="{PROTO}/valkyrie-retreat/">The Valkyrie Retreat page</a></div>
  </div>
</section>

<section class="sec" id="under" aria-labelledby="u-h">
  <div class="wrap">
    {ch(6, "Underneath")}
    <div class="two"><h2 id="u-h" class="t1">{un["h"]}</h2><p class="lead">{un["lede"]}</p></div>
    <dl class="un">{items}</dl>
    <p class="lead un-alt">{un["alt"]}</p>
    {src(un["src"])}
  </div>
</section>

<section class="sec rtr" id="retreat" data-sky="aurora" aria-labelledby="re-h">
  <div class="wrap rtr-g">
    <div>
      {ch(7, "The retreat")}
      <h2 id="re-h" class="t1">{re_["h"]}</h2>
      <p class="lead">{re_["lede"]}</p>
      <p class="lead">{re_["how"]}</p>
      <div class="acts"><a class="btn" href="{PROTO}/valkyrie-retreat/">Open the retreat page</a></div>
      {src(re_["src"])}
    </div>
    <figure class="rtr-ph">{shot("s-rt-d", "The new Valkyrie Retreat page, a plan of four monthly payments", 1200, 750)}<figcaption>The retreat page in the prototype, four monthly payments chosen</figcaption></figure>
  </div>
</section>

<section class="sec" id="days" aria-labelledby="w-h">
  <div class="wrap">
    {ch(8, "90 days")}
    <h2 id="w-h" class="t1">Twelve weeks, checkout first.</h2>
    {gantt()}
    <h3 class="t3 kp-h">What we’d measure, every month</h3>
    <ul class="kp">{kp}</ul>
  </div>
</section>

<section class="sec" id="team" aria-labelledby="tm-h">
  <div class="wrap two">
    <div>{ch(9, "The team")}<h2 id="tm-h" class="t1">Astra, one team with Amwisesa.</h2><p class="lead">{tm["lede"]}</p><p class="lead">{tm["brands"]}</p>{src(tm["disclosure"])}</div>
    <div class="ppl">{ppl}</div>
  </div>
</section>

<section class="end" data-sky="late" aria-labelledby="e-h">
  <div class="wrap end-in">
    <h2 id="e-h" class="end-h">{en["h"]}</h2>
    <p class="lead">{en["lede"]}</p>
    <div class="acts"><a class="btn solid" href="{en["mail"]}">{en["cta"]}</a><a class="btn" href="{PROTO}/">Open the prototype</a></div>
    <p class="end-f">{en["foot"]}</p>
  </div>
</section>
</main>
<script src="/js/art.js" defer></script>
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
    shutil.copy(os.path.join(PB, 'js', 'art.js'), os.path.join(OUT, 'js', 'art.js'))  # the same night sky as the prototype
    for f in os.listdir(os.path.join(PB, 'fonts')):
        shutil.copy(os.path.join(PB, 'fonts', f), os.path.join(OUT, 'fonts', f))
    for u in sorted(used):
        if u.startswith('p:'): shutil.copy(os.path.join(PB, 'media', u[2:]), os.path.join(OUT, 'media', u[2:]))
        else: shutil.copy(os.path.join(B, 'media', u), os.path.join(OUT, 'media', u))
    open(os.path.join(OUT, 'robots.txt'), 'w').write('User-agent: *\nDisallow: /\n')
    open(os.path.join(OUT, 'netlify.toml'), 'w').write('[[headers]]\n  for = "/*"\n  [headers.values]\n    X-Robots-Tag = "noindex, nofollow"\n')
    # every reference in the page has to exist
    for ref in re.findall(r'(?:src|href)="(/[^"#?]+)"', html) + [x.split()[0] for s in re.findall(r'srcset="([^"]+)"', html) for x in s.split(', ')]:
        assert os.path.exists(os.path.join(OUT, ref.lstrip('/'))), ref
    assert '[[' not in html.replace('[[headers]]', ''), 'a [[ in the page'
    print('wrote', OUT, len(html), 'bytes,', len(used), 'media')

if __name__ == '__main__':
    build()
