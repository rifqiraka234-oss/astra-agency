#!/usr/bin/env python3
"""The plan beside the Hooft & Petiet and ReShare sites, in Astra's voice, English, on its own site.
Writes ../site-plan/. Every figure comes from data/plan.json, every chart is computed from it, and every source sits
under what it supports. Facts and how each was checked are in ../research/plan/facts.md."""
import os, json, shutil, re, html as H, math, datetime
from PIL import Image

B = os.path.dirname(os.path.abspath(__file__))
B3 = os.path.join(B, '..', 'build3')
OUT = os.path.join(B, '..', 'site-plan')
D = json.load(open(os.path.join(B, 'data', 'plan.json')))
HP = 'https://astra-hooftenpetiet-prototype.netlify.app'
RS = 'https://astra-reshare-prototype.netlify.app'
IND, OAK = '#5E4FA2', '#C7823C'   # validated together, light mode, every check passes
used = set()

def esc(s): return H.escape(s, quote=True)

def shot(name, alt, w, h, cls='', eager=False, phone=None):
    used.update([name + '.webp', name + '.jpg'])
    load = 'eager" fetchpriority="high' if eager else 'lazy'
    ph = ''
    if phone:
        used.update([phone + '.webp', phone + '.jpg'])
        ph = f'<source media="(max-width: 760px)" type="image/webp" srcset="/media/{phone}.webp"><source media="(max-width: 760px)" srcset="/media/{phone}.jpg">'
    return f'<picture>{ph}<source type="image/webp" srcset="/media/{name}.webp"><img class="{cls}" src="/media/{name}.jpg" width="{w}" height="{h}" alt="{esc(alt)}" loading="{load}" decoding="async"></picture>'

def photo(key, alt, sizes):
    m = json.load(open(os.path.join(B3, 'media', 'manifest.json')))[key]
    files = sorted(zip(m['files'], m['sizes']), key=lambda x: x[1][0])
    for f, _ in files: used.update(['h:' + f, 'h:' + os.path.splitext(f)[0] + '.webp'])
    w, h = files[-1][1]
    js = ', '.join('/%s %dw' % (f, s[0]) for f, s in files)
    ws = ', '.join('/%s %dw' % (os.path.splitext(f)[0] + '.webp', s[0]) for f, s in files)
    return f'<picture><source type="image/webp" srcset="{ws}" sizes="{sizes}"><img src="/{files[0][0]}" srcset="{js}" sizes="{sizes}" width="{w}" height="{h}" alt="{esc(alt)}" loading="lazy" decoding="async"></picture>'

def ch(n, name):
    return f'<p class="chn"><span class="chn-n">{n:02d}</span><span class="chn-t">{name}</span></p>'

def src(s): return f'<p class="src">{s}</p>'

# ------------------------------------------------------------------ charts, computed from the data

def heat():
    pts = D['market']['heat']
    x0, x1, y0, y1 = 2023, 2035, 80, 112
    W, Hh, L, R, T, Bm = 640, 340, 46, 24, 22, 40
    X = lambda y: L + (y - x0) / (x1 - x0) * (W - L - R)
    Y = lambda v: T + (y1 - v) / (y1 - y0) * (Hh - T - Bm)
    grid = ''.join(f'<line x1="{L}" x2="{W - R}" y1="{Y(v):.1f}" y2="{Y(v):.1f}"/><text x="{L - 10}" y="{Y(v) + 4:.1f}" text-anchor="end">{v}</text>' for v in (80, 90, 100, 110))
    xt = ''.join(f'<text x="{X(y):.1f}" y="{Hh - 12}" text-anchor="middle">{y}</text>' for y in (2024, 2026, 2028, 2030, 2032, 2034))
    path = ' '.join(('M' if i == 0 else 'L') + f'{X(p["y"]):.1f} {Y(p["v"]):.1f}' for i, p in enumerate(pts))
    # today, 25 Oct 2026, as a fraction of the year
    td = datetime.date(2026, 10, 25); tf = 2026 + (td.timetuple().tm_yday - 1) / 365
    marks = ''
    for i, p in enumerate(pts):
        cx, cy = X(p['y']), Y(p['v'])
        lab = f'{p["v"]} kWh per m², {p["t"]}'
        anchor = 'start' if i == 0 else 'middle'
        dx = 12 if i == 0 else 0
        marks += (f'<g class="hc-pt{" hc-real" if i == 0 else ""}" tabindex="0" role="img" aria-label="{esc(lab)}" data-tip="{esc(lab)}">'
                  f'<circle class="hc-hit" cx="{cx:.1f}" cy="{cy:.1f}" r="18"/><circle class="hc-m" cx="{cx:.1f}" cy="{cy:.1f}" r="6"/>'
                  f'<text class="hc-v" x="{cx + dx:.1f}" y="{cy - 16:.1f}" text-anchor="{anchor}">{p["v"]}</text></g>')
    today = f'<line class="hc-today" x1="{X(tf):.1f}" x2="{X(tf):.1f}" y1="{T}" y2="{Hh - Bm}"/><text class="hc-tl" x="{X(tf) + 6:.1f}" y="{T + 12}">today</text>'
    rows = ''.join(f'<tr><th scope="row">{p["y"]}</th><td>{p["v"]}</td><td>{p["t"]}</td></tr>' for p in pts)
    return f'''<figure class="chart hc" data-tipbox>
  <figcaption class="ch-t">{D["market"]["heat_title"]}</figcaption>
  <div class="ch-plot"><svg viewBox="0 0 {W} {Hh}" role="group" aria-label="{esc(D["market"]["heat_title"])}"><g class="ax" aria-hidden="true">{grid}{xt}</g>{today}<path class="hc-l" d="{path}" pathLength="1"/>{marks}</svg><div class="tip" role="status" aria-live="polite"></div></div>
  <details class="tv"><summary>Show as a table</summary><table><thead><tr><th scope="col">Year</th><th scope="col">kWh per m²</th><th scope="col">What it is</th></tr></thead><tbody>{rows}</tbody></table></details>
  {src(D["market"]["heat_src"])}
</figure>'''

def houses():
    a = D['allowance']; n = a['default']
    tot = n * a['amount']
    hs = '<svg viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path d="M10 1.5 19 8v10.5H1V8z"/></svg>'
    grid = ''.join(f'<i class="{"on" if i < n else ""}">{hs}</i>' for i in range(200))
    return f'''<form class="al" data-al onsubmit="return false" aria-label="The moving allowance at stake in a project">
  <div class="al-ctl">
    <label for="al-n">{a["calc_label"]}</label>
    <output class="al-n" for="al-n" data-o="n">{n}</output>
    <input id="al-n" type="range" min="1" max="200" step="1" value="{n}" aria-valuetext="{n} households">
    <div class="al-sum"><span>The statutory minimum at stake</span><b data-o="t">€{tot:,}</b><small data-o="x">{n} times €{a["amount"]:,}</small></div>
    <p class="al-note">{a["calc_note"]}</p>
  </div>
  <div class="al-wall" aria-hidden="true">{grid}</div>
  <script type="application/json">{{ "amount": {a["amount"]} }}</script>
</form>'''

def rivals():
    r = D['rivals']; cols = r['cols']
    def mark(v, c):
        return f'<span role="cell" class="mk {"y" if v else "n"}"><i aria-hidden="true"></i><span class="mk-c" aria-hidden="true">{c}</span><span class="sr">{c}, {"yes" if v else "no"}</span></span>'
    rows = ''
    for i, row in enumerate(r['rows']):
        if row['name'] == 'Hooft & Petiet, new site': continue
        cls = ' us' if row.get('us') else ''
        rows += f'<div class="rv-r{cls}" role="row"{" data-us" if row.get("us") else ""}><span role="rowheader" class="rv-n"><b data-name>{row["name"]}</b><small data-note>{row["note"]}</small></span>{"".join(mark(v, c) for v, c in zip(row["v"], cols))}</div>'
    new = next(x for x in r['rows'] if x['name'] == 'Hooft & Petiet, new site')
    old = next(x for x in r['rows'] if x['name'] == 'Hooft & Petiet today')
    tot = lambda k: sum(1 for x in r['rows'] if x['name'] not in ('Hooft & Petiet, new site',) and x['v'][k])
    head = ''.join(f'<span role="columnheader">{c}</span>' for c in cols)
    data = json.dumps({'old': old, 'new': new, 'cols': cols}, ensure_ascii=False).replace('[[', '[ [')
    return f'''<div class="riv" data-riv>
  <div class="riv-sw" role="group" aria-label="Show Hooft &amp; Petiet">
    <button type="button" aria-pressed="true" data-v="old">Your site today</button><button type="button" aria-pressed="false" data-v="new">With the new site</button>
  </div>
  <div class="riv-t" role="table" aria-label="What a project leader sees on each homepage">
    <div class="rv-r rv-h" role="row"><span role="columnheader"><span class="sr">Firm</span></span>{head}</div>
    <div role="rowgroup">{rows}</div>
  </div>
  <p class="riv-out" data-out aria-live="polite">Hooft &amp; Petiet today shows {sum(old["v"])} of the 4.</p>
  <script type="application/json">{data}</script>
</div>'''

def dots():
    g = D['google']; ps = g['posts']
    lab = {'own': 'The 2020 article, the title is its own', 'copy': 'Carries the 2020 article’s title', 'ok': 'Its own title'}
    cells = ''.join(f'<button type="button" class="dt {p["k"]}" data-tip="{esc(p["title"])}" data-slug="/{esc(p["slug"])}/" aria-label="{esc(lab[p["k"]] + ". /" + p["slug"] + "/")}"></button>' for p in ps)
    pages = ''.join('<i></i>' for _ in range(g['pages']))
    same = sum(1 for p in ps if p['k'] != 'ok')
    return f'''<figure class="chart gd">
  <figcaption class="ch-t">{g["dot_title"]}</figcaption>
  <div class="gd-key"><span><i class="dt copy"></i>Same title, {same}</span><span><i class="dt ok"></i>Own title, {len(ps) - same}</span></div>
  <div class="gd-grid">{cells}</div>
  <p class="gd-read" data-read aria-live="polite">Point at a tile to read the title Google shows for it.</p>
  <p class="ch-t gd-p">And the {g["pages"]} pages, which move across too</p>
  <div class="gd-pages" aria-hidden="true">{pages}</div>
  <details class="tv"><summary>Show as a table</summary><table><thead><tr><th scope="col">Article</th><th scope="col">Title in Google</th></tr></thead><tbody>{"".join(f"<tr><td>/{p['slug']}/</td><td>{esc(p['title'])}</td></tr>" for p in ps)}</tbody></table></details>
  {src(g["src"])}
</figure>'''

def gantt():
    out = ''
    for w in D['roadmap']:
        a, b = [int(x) for x in re.findall(r'\d+', w['when'])]
        items = ''.join(f'<li>{t}</li>' for t in w['items'])
        out += f'''<li class="gt-r"><div class="gt-l"><span class="gt-w">{w["when"]}</span><h3>{w["h"]}</h3></div>
<div class="gt-track" aria-hidden="true"><i style="--a:{(a - 1) / 12:.4f};--b:{b / 12:.4f}"></i></div><ul>{items}</ul></li>'''
    wk = ''.join(f'<span>{i}</span>' for i in range(1, 13))
    return f'<div class="gt"><div class="gt-wk" aria-hidden="true"><span class="gt-wl">Week</span><div>{wk}</div></div><ol>{out}</ol></div>'

# ------------------------------------------------------------------ the page

def page():
    c, td, mk, dt, al, rv, ps, jr, bt, go, hs, tm, en = (D[k] for k in ('cover', 'today', 'market', 'dates', 'allowance', 'rivals', 'position', 'journey', 'built', 'google', 'hubspot', 'team', 'end'))
    found = ''.join(f'<li><p>{f["t"]}</p><span>{f["src"]}</span></li>' for f in c['found'])
    facts = ''.join(f'<div><dt>{f["k"]}</dt><dd>{f["v"]}</dd></div>' for f in td['facts'])
    side = ''.join(f'<li><p>{s["t"]}</p><span>{s["src"]}</span></li>' for s in mk['side'])
    dates, now_done = '', False
    for it in dt['items']:
        if it['s'] == 'next' and not now_done:
            dates += f'<li class="dl-now"><span class="dl-d">{D["meta"]["today"]}</span><b>Today</b></li>'; now_done = True
        dates += f'<li class="dl-{it["s"]}"><span class="dl-d">{it["d"]}</span><div><h3>{it["h"]}</h3><p>{it["p"]}</p></div></li>'
    steps = ''
    for i, s in enumerate(jr['steps']):
        b = ''.join(f'<li>{p["t"]}</li>' for p in s['parts'] if p['s'] == 'Built') or '<li class="none">Nothing yet</li>'
        n = ''.join(f'<li>{p["t"]}</li>' for p in s['parts'] if p['s'] == 'Next') or '<li class="none">Done</li>'
        steps += f'<li class="jr-r"><span class="jr-n">{i + 1}</span><div class="jr-h"><h3>{s["h"]}</h3><p>{s["p"]}</p></div><div class="jr-c"><span class="jr-k">Built</span><ul>{b}</ul></div><div class="jr-c nx"><span class="jr-k">Next</span><ul>{n}</ul></div></li>'
    frames = ''.join(f'<div class="bf-i{" on" if i == 0 else ""}" data-i="{i}">{shot(s["img"], "The new " + ("ReShare" if "rs" in s["img"] else "Hooft & Petiet") + " site, " + s["h"].lower(), 1200, 750)}</div>' for i, s in enumerate(bt['shots']))
    caps = ''.join(f'<li data-i="{i}"><span class="bc-n">{i + 1:02d}</span><div><h3>{s["h"]}</h3><p>{s["p"]}</p><div class="bc-m">{shot(s["img"], "", 1200, 750)}</div></div></li>' for i, s in enumerate(bt['shots']))
    phones = ''.join(f'<figure>{shot(p["img"], p["alt"], 520, 1125)}</figure>' for p in bt['phones'])
    links = ''.join(f'<a class="btn{" solid" if i == 0 else ""}" href="{l["u"]}">{l["t"]}</a>' for i, l in enumerate(bt['links']))
    newp = ''.join(f'<li>{t}</li>' for t in go['new'])
    deal = ''.join(f'<div><dt>{k}</dt><dd>{v}</dd></div>' for k, v in hs['deal'])
    kp = ''.join(f'<li><b>{k["h"]}</b><span>{k["where"]}</span></li>' for k in D['kpis'])
    ppl = ''.join(f'<div class="pp"><h3>{p["name"]}</h3><p class="pp-r">{p["role"]}</p><p>{p["bio"]}</p><a class="u" href="{p["li"]}" rel="noopener">{p["name"].split()[0]} on LinkedIn</a></div>' for p in tm['people'])
    toc = [('today', 'Today'), ('market', 'The market'), ('dates', 'Six dates'), ('allowance', 'The allowance'), ('rivals', 'Rivals'),
           ('promise', 'The promise'), ('journey', 'The journey'), ('built', 'Built'), ('google', 'Google'), ('hubspot', 'HubSpot'), ('days', '90 days'), ('team', 'The team')]
    tocl = ''.join(f'<li><a href="#{a}"><span>{i + 1:02d}</span>{t}</a></li>' for i, (a, t) in enumerate(toc))
    fav = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' fill='%232F2B45'/%3E%3Cpath d='M18 52V30a14 14 0 0 1 28 0v22z' fill='%23C8D020'/%3E%3C/svg%3E"
    return f'''<!doctype html>
<html lang="en" class="site-plan">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{esc(D["meta"]["title"])}</title>
<meta name="description" content="{esc(D["meta"]["desc"])}">
<meta name="robots" content="noindex, nofollow">
<meta name="theme-color" content="#FBFAF7">
<link rel="icon" href="{fav}">
<link rel="preload" href="/fonts/newsreader-latin-opsz-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/css/all.css">
<script>document.documentElement.classList.add('js');if(matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('rm')</script>
</head>
<body class="plan">
<div class="fx-bg" aria-hidden="true"></div><div class="fx-grain" aria-hidden="true"></div>
<a class="skip" href="#main">Skip to content</a>
<header class="hdr ph"><div class="wrap ph-in">
<a class="ph-b" href="#top"><span class="ph-t">The plan</span><span class="ph-s">for Hooft &amp; Petiet and ReShare, by Astra</span></a>
<nav aria-label="The two sites"><a class="d" href="{HP}">Hooft &amp; Petiet</a><a class="d" href="{RS}">ReShare</a><a class="btn sm" href="{en["mail"]}">{en["cta"]}</a></nav>
</div></header>
<main id="main">

<section class="cv" id="top" data-tone="dawn" aria-labelledby="cv-h">
  <div class="wrap cv-in">
    <div class="cv-txt">
      <p class="cv-by">Prepared by Astra, October 2026</p>
      <h1 id="cv-h" class="cv-h">{c["h"]}</h1>
      <p class="lead cv-l">{c["lede"]}</p>
      <div class="acts"><a class="btn solid" href="{HP}">Open Hooft &amp; Petiet</a><a class="btn" href="{RS}">Open ReShare</a></div>
    </div>
    <ol class="found">{found}</ol>
  </div>
  <div class="bx" data-bx>
    <div class="bx-stick">
      <div class="bx-win arch">
        <div class="bx-a">{shot("t-hp", "hooftenpetiet.nl today, the homepage on 25 October 2026", 1200, 833, eager=True, phone="t-hp-phone")}</div>
        <div class="bx-b">{shot("s-hp-hero", "The new Hooft & Petiet homepage", 1200, 750, phone="s-hp-phone")}</div>
      </div>
      <p class="bx-cap"><span class="bx-c1">hooftenpetiet.nl today</span><span class="bx-c2">The new site</span></p>
    </div>
  </div>
  <nav class="wrap toc" aria-label="Chapters"><ol>{tocl}</ol></nav>
</section>

<section class="sec cp" id="today" data-tone="day" aria-labelledby="t-h">
  <div class="wrap">
    {ch(1, "Today")}
    <div class="cp-g">
      <div><h2 id="t-h" class="t1">{td["h"]}</h2><p class="lead">{td["lede"]}</p></div>
      <dl class="kv">{facts}</dl>
    </div>
    <div class="td-shots">
      <figure class="td-rs">{shot("t-rs", "reshareliving.com on 25 October 2026", 1200, 833)}<figcaption>reshareliving.com, {td["shot_date"]}</figcaption></figure>
      <figure class="td-ph">{shot("t-hp-phone", "hooftenpetiet.nl on a phone, 25 October 2026", 520, 885)}<figcaption>hooftenpetiet.nl on a phone</figcaption></figure>
    </div>
    {src(td["src"])}
  </div>
</section>

<section class="sec cp" id="market" data-tone="day" aria-labelledby="m-h">
  <div class="wrap">
    {ch(2, "The market")}
    <div class="cp-g">
      <div><h2 id="m-h" class="t1">{mk["h"]}</h2><p class="lead">{mk["lede"]}</p><ul class="sents">{side}</ul></div>
      {heat()}
    </div>
  </div>
</section>

<section class="sec cp" id="dates" data-tone="gold" aria-labelledby="d-h">
  <div class="wrap">
    {ch(3, "Six dates")}
    <h2 id="d-h" class="t1 cp-w">{dt["h"]}</h2>
    <ol class="dl" data-dl>{dates}</ol>
    {src(dt["src"])}
  </div>
</section>

<section class="sec cp dusk-sec al-sec" id="allowance" data-tone="gold" data-hdr="dusk" aria-labelledby="a-h">
  <div class="wrap">
    {ch(4, "The allowance")}
    <div class="cp-g">
      <h2 id="a-h" class="t1">{al["h"]}</h2>
      <p class="lead">{al["lede"]}</p>
    </div>
    {houses()}
    {src(al["src"])}
  </div>
</section>

<section class="sec cp" id="rivals" data-tone="day" aria-labelledby="r-h">
  <div class="wrap">
    {ch(5, "Rivals")}
    <div class="cp-g">
      <h2 id="r-h" class="t1">{rv["h"]}</h2>
      <p class="lead">{rv["lede"]}</p>
    </div>
    {rivals()}
    {src(rv["src"])}
  </div>
</section>

<section class="sec cp pr" id="promise" data-tone="gold" aria-labelledby="p-h">
  <div class="wrap pr-g">
    <div>
      {ch(6, "The promise")}
      <h2 id="p-h" class="pr-q fill" lang="nl">{ps["h"]}</h2>
      <p class="lead">{ps["lede"]}</p>
      {src(ps["src"])}
    </div>
    <div class="pr-ph arch">{photo("cushion2", "", "(max-width: 900px) 80vw, 34vw")}</div>
  </div>
</section>

<section class="sec cp" id="journey" data-tone="day" aria-labelledby="j-h">
  <div class="wrap">
    {ch(7, "The journey")}
    <h2 id="j-h" class="t1 cp-w">{jr["h"]}</h2>
    <ol class="jr">{steps}</ol>
  </div>
</section>

<section class="sec cp bt" id="built" data-tone="dawn" aria-labelledby="b-h">
  <div class="wrap">
    {ch(8, "Built")}
    <div class="cp-g">
      <h2 id="b-h" class="t1">{bt["h"]}</h2>
      <p class="lead">{bt["lede"]}</p>
    </div>
    <div class="bf" data-bf>
      <ol class="bc">{caps}</ol>
      <div class="bf-stick"><div class="bf-frame">{frames}</div></div>
    </div>
    <div class="bt-ph">{phones}</div>
    <div class="acts">{links}</div>
  </div>
</section>

<section class="sec cp" id="google" data-tone="day" aria-labelledby="g-h">
  <div class="wrap">
    {ch(9, "Google")}
    <div class="cp-g">
      <div><h2 id="g-h" class="t1">{go["h"]}</h2><p class="lead">{go["lede"]}</p>
      <h3 class="t3 np-h">Pages to add</h3><ul class="np">{newp}</ul></div>
      {dots()}
    </div>
  </div>
</section>

<section class="sec cp" id="hubspot" data-tone="day" aria-labelledby="h-h">
  <div class="wrap cp-g">
    <div>{ch(10, "HubSpot")}<h2 id="h-h" class="t1">{hs["h"]}</h2><p class="lead">{hs["lede"]}</p></div>
    <figure class="deal"><figcaption>A request, as it lands in HubSpot</figcaption><dl class="kv">{deal}</dl><p class="src">{hs["deal_note"]}</p></figure>
  </div>
</section>

<section class="sec cp" id="days" data-tone="gold" aria-labelledby="w-h">
  <div class="wrap">
    {ch(11, "90 days")}
    <h2 id="w-h" class="t1 cp-w">Twelve weeks to two live sites and the first numbers.</h2>
    {gantt()}
    <h3 class="t3 kp-h">What we’d measure, every month</h3>
    <ul class="kp">{kp}</ul>
  </div>
</section>

<section class="sec cp" id="team" data-tone="day" aria-labelledby="tm-h">
  <div class="wrap">
    {ch(12, "The team")}
    <div class="cp-g">
      <div><h2 id="tm-h" class="t1">Astra, one team with Amwisesa.</h2><p class="lead">{tm["lede"]}</p><p class="lead">{tm["brands"]}</p>{src(tm["disclosure"])}</div>
      <div class="ppl">{ppl}</div>
    </div>
  </div>
</section>

<section class="sec dusk-sec end" data-tone="gold" data-hdr="dusk" aria-labelledby="e-h">
  <div class="end-glow" aria-hidden="true"></div>
  <div class="wrap end-in">
    <h2 id="e-h" class="end-h">{en["h"]}</h2>
    <p class="lead">{en["lede"]}</p>
    <div class="acts"><a class="btn solid" href="{en["mail"]}">{en["cta"]}</a><a class="btn" href="{HP}">Hooft &amp; Petiet</a><a class="btn" href="{RS}">ReShare</a></div>
    <p class="end-f">{en["foot"]}</p>
  </div>
</section>
</main>
<script src="/js/fx.js" defer></script>
<script src="/js/plan.js" defer></script>
</body></html>'''

def build():
    if os.path.isdir(OUT): shutil.rmtree(OUT)
    for d in ('css', 'js', 'fonts', 'media'): os.makedirs(os.path.join(OUT, d))
    html = page()
    open(os.path.join(OUT, 'index.html'), 'w').write(html)
    css = open(os.path.join(B3, 'css', 'site.css')).read() + '\n' + open(os.path.join(B3, 'css', 'fx.css')).read() + '\n' + open(os.path.join(B, 'css', 'plan.css')).read()
    open(os.path.join(OUT, 'css', 'all.css'), 'w').write(css)
    shutil.copy(os.path.join(B3, 'js', 'fx.js'), os.path.join(OUT, 'js', 'fx.js'))
    shutil.copy(os.path.join(B, 'js', 'plan.js'), os.path.join(OUT, 'js', 'plan.js'))
    for f in os.listdir(os.path.join(B3, 'fonts')):
        if f.endswith('.woff2') or f.startswith('LICENSE'): shutil.copy(os.path.join(B3, 'fonts', f), os.path.join(OUT, 'fonts', f))
    for u in sorted(used):
        if u.startswith('h:'):
            f = u[2:]
            if not os.path.exists(os.path.join(B3, f)) and f.endswith('.webp'):
                Image.open(os.path.join(B3, f[:-5] + '.jpg')).convert('RGB').save(os.path.join(B3, f), 'WEBP', quality=78, method=6)
            os.makedirs(os.path.dirname(os.path.join(OUT, f)), exist_ok=True)
            shutil.copy(os.path.join(B3, f), os.path.join(OUT, f))
        else:
            shutil.copy(os.path.join(B, 'media', u), os.path.join(OUT, 'media', u))
    open(os.path.join(OUT, 'robots.txt'), 'w').write('User-agent: *\nDisallow: /\n')
    open(os.path.join(OUT, 'netlify.toml'), 'w').write('[[headers]]\n  for = "/*"\n  [headers.values]\n    X-Robots-Tag = "noindex, nofollow"\n')
    # every reference in the page has to exist
    for ref in re.findall(r'(?:src|href)="(/[^"#?]+)"', html) + [x.split()[0] for s in re.findall(r'srcset="([^"]+)"', html) for x in s.split(', ')]:
        assert os.path.exists(os.path.join(OUT, ref.lstrip('/'))), ref
    print('wrote', OUT, len(html), 'bytes,', len(used), 'media')

if __name__ == '__main__':
    build()
