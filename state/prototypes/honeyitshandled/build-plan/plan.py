#!/usr/bin/env python3
"""The plan beside the Honey It's Handled prototype, in Astra's voice, English, on its own site.
Writes ../site-plan/. Every figure comes from data/plan.json, every chart is computed from it, and every source sits
under what it supports. How each figure was checked is in ../research/plan-facts.md.

Media. Today's screenshots of honeyitshandled.com and her own brand files are read from the session scratchpad on the
first run and kept as resized copies in build-plan/media, so later rebuilds work without the scratchpad. The prototype's
screens come from build-plan/shots (node shots/capture.js <url> shots) once research/PROTOTYPE_LIVE.txt exists."""
import os, json, shutil, re, html as H, random, math

B = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(B, '..', 'site-plan')
SHOTS = os.path.join(B, 'shots')
LIVE = os.path.join(B, '..', 'research', 'PROTOTYPE_LIVE.txt')
SCR = os.environ.get('HONEY_SCRATCH', '/tmp/claude-0/-home-user-astra-agency/24052593-7323-58b2-9e3f-744f7080d43c/scratchpad/hplan')
D = json.load(open(os.path.join(B, 'data', 'plan.json')))
ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII']
MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
used = set()


def proto_url():
    """The prototype's live URL once the prototype agent has verified its final deploy, else None (placeholder mode)."""
    if not os.path.exists(LIVE):
        return None
    m = re.search(r'https://[^\s]+', open(LIVE).read())
    return m.group(0).rstrip('/') + '/' if m else None


PROTO = proto_url()


def esc(s):
    return H.escape(s, quote=True)


def num(n):
    return '{:,}'.format(n)


def eur(v):
    """Rounded half up, the way the browser's Math.round does it, never Python's half to even."""
    from decimal import Decimal, ROUND_HALF_UP
    return '€' + '{:,}'.format(int(Decimal(repr(v)).quantize(Decimal('1'), rounding=ROUND_HALF_UP)))


def pct(a, b):
    return '{:.0f}%'.format(a / b * 100) if b else '0%'


# ------------------------------------------------------------------ media

def media():
    """Resize every image the page uses once into build-plan/media, from the scratchpad originals."""
    from PIL import Image
    md = os.path.join(B, 'media')
    os.makedirs(md, exist_ok=True)
    jobs = []
    # today's screenshots of her site, desktop render at 1440 x 900, 26 Oct 2026
    for name, f in (('t-home', 'home-00.png'), ('t-offer', 'weddings-03.png'), ('t-events', 'private-03.png'), ('t-jan', 'kopie_van_events_1-02.png')):
        jobs.append(('shot', os.path.join(SCR, 'today', f), name, (1200, 750)))
    # her Cinco Cero photos, named "Honey it's Handled_Cinco Cero_n" on her site, 1365 x 2048
    for name, i in (('c-sign', 'e2ab84ce2da74778a10350270cf55792'), ('c-hall', '8e6b7c2f009844769666a1e45573256b'),
                    ('c-ball', '2dc29647937646469164f7f8fa16dbf0'), ('c-night', '427f62a1f26148caaf6c412ba7c974b6')):
        jobs.append(('photo', os.path.join(SCR, 'assets', f'42a973_{i}~mv2.jpg'), name, (560, 840)))
    # her envelope sticker, 6000 x 3375 with a transparent field around it
    jobs.append(('sticker', os.path.join(SCR, 'assets', '42a973_3f8b90380c9542dd826d2c05acbdffc4~mv2.png'), 'envelope', (720, 0)))
    # the prototype's screens, once they exist
    if PROTO:
        for s in D['built']['shots']:
            jobs.append(('shot', os.path.join(SHOTS, s['img'] + '.png'), s['img'], (1200, 750)))
        for p in D['built']['phones']:
            jobs.append(('shot', os.path.join(SHOTS, p['img'] + '.png'), p['img'], (520, 1126)))
    for kind, src, name, size in jobs:
        jp = os.path.join(md, name + ('.png' if kind == 'sticker' else '.jpg'))
        if os.path.exists(jp) and (not os.path.exists(src) or os.path.getmtime(jp) >= os.path.getmtime(src)):
            continue
        assert os.path.exists(src), 'missing source and no saved copy for ' + name
        im = Image.open(src)
        if kind == 'sticker':
            im = im.convert('RGBA').crop(im.convert('RGBA').split()[3].getbbox())
            w = size[0]
            im = im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
            im.quantize(colors=256, method=Image.Quantize.FASTOCTREE).save(jp, optimize=True)
            im.save(os.path.join(md, name + '.webp'), 'WEBP', quality=86, method=6)
            continue
        im = im.convert('RGB')
        tw, th = size
        r = max(tw / im.width, th / im.height)
        im = im.resize((math.ceil(im.width * r), math.ceil(im.height * r)), Image.LANCZOS)
        l, t = (im.width - tw) // 2, (im.height - th) // 2 if kind == 'photo' else 0
        im = im.crop((l, t, l + tw, t + th))
        im.save(jp, 'JPEG', quality=80, optimize=True, progressive=True)
        im.save(os.path.join(md, name + '.webp'), 'WEBP', quality=78, method=6)


def pic(name, alt, w, h, cls='', eager=False, ext='jpg'):
    used.update([name + '.webp', name + '.' + ext])
    load = 'eager" fetchpriority="high' if eager else 'lazy'
    c = f' class="{cls}"' if cls else ''
    return (f'<picture><source type="image/webp" srcset="/media/{name}.webp"><img{c} src="/media/{name}.{ext}" width="{w}" '
            f'height="{h}" alt="{esc(alt)}" loading="{load}" decoding="async"></picture>')


def ch(n, name):
    return f'<p class="chn"><span class="chn-n">{ROMAN[n - 1]}</span><span class="chn-t">{name}</span></p>'


def src(s):
    return f'<p class="src">{esc(s)}</p>'


def seg(label, attr, items, cur):
    b = ''.join(f'<button type="button" class="tg" {attr}="{esc(str(k))}" aria-pressed="{"true" if str(k) == str(cur) else "false"}">{esc(t)}</button>' for k, t in items)
    return f'<div class="seg" role="group" aria-label="{esc(label)}">{b}</div>'


# ------------------------------------------------------------------ II, the field of weddings

def dots_layout(n, w, h):
    """Columns and pitch for n dots in a w by h box, the same sums plan.js uses."""
    cols = max(1, math.ceil(math.sqrt(n * w / h)))
    rows = math.ceil(n / cols)
    pitch = min(w / cols, h / rows)
    return cols, rows, pitch


def picks(n, k, seed=7):
    """Which dots are hers, spread over the field. Deterministic, the same in plan.js (Park and Miller, small enough
    that JavaScript's doubles stay exact)."""
    out, s, seen = [], seed, set()
    while len(out) < min(k, n):
        s = (s * 48271) % 2147483647
        i = s % n
        if i not in seen:
            seen.add(i)
            out.append(i)
    return out


def field_png(n, k, path, w=1100, h=380):
    """The default state of the field as a picture, for readers without script. Drawn with the same layout."""
    from PIL import Image, ImageDraw
    S = 2
    im = Image.new('RGB', (w * S, h * S), (211, 233, 238))
    dr = ImageDraw.Draw(im)
    cols, rows, p = dots_layout(n, w, h)
    ox, oy = (w - cols * p) / 2, (h - rows * p) / 2
    r = max(0.9, p * 0.32)
    mine = set(picks(n, k))
    for i in range(n):
        x, y = ox + (i % cols + .5) * p, oy + (i // cols + .5) * p
        if i in mine:
            continue
        dr.ellipse([(x - r) * S, (y - r) * S, (x + r) * S, (y + r) * S], fill=(109, 110, 112))
    for i in mine:
        x, y = ox + (i % cols + .5) * p, oy + (i // cols + .5) * p
        R = max(4.5, p * .9)
        dr.ellipse([(x - R * 2.2) * S, (y - R * 2.2) * S, (x + R * 2.2) * S, (y + R * 2.2) * S], outline=(150, 33, 34), width=2 * S)
        dr.ellipse([(x - R) * S, (y - R) * S, (x + R) * S, (y + R) * S], fill=(150, 33, 34))
    im = im.resize((w, h), Image.LANCZOS)
    im.save(path, 'PNG', optimize=True)


def market():
    m = D['market']
    sc = {s['key']: s for s in m['scopes']}
    cur = sc[m['scope_def']]
    k = m['couples']['def']
    one_in = round(cur['n'] / k)
    data = json.dumps({'scopes': m['scopes'], 'def': m['scope_def']}).replace('[[', '[ [')
    used.add('field.png')
    # the trend, province of Antwerp, 2015 to 2024
    ys, ps = m['years'], m['prov_series']
    W, Hh, top, bot = 520, 180, 26, 30
    lo, hi = 5000, 8500
    xs = [20 + i * (W - 40) / (len(ys) - 1) for i in range(len(ys))]
    yv = [top + (hi - v) / (hi - lo) * (Hh - top - bot) for v in ps]
    pts = ' '.join(f'{x:.1f},{y:.1f}' for x, y in zip(xs, yv))
    lab = ''
    for i in (0, 5, 9):
        anchor = 'start' if i == 0 else ('end' if i == 9 else 'middle')
        lab += f'<text x="{xs[i]:.1f}" y="{yv[i] - 10:.1f}" text-anchor="{anchor}" class="tv">{num(ps[i])}</text>'
    yl = ''.join(f'<text x="{x:.1f}" y="{Hh - 8}" text-anchor="middle" class="ty">{y}</text>' for x, y in zip(xs, ys) if y in (2015, 2018, 2020, 2022, 2024))
    dots_svg = ''.join(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="{4.5 if i == 9 else 2.6}" class="{"hi" if i == 9 else ""}"/>' for i, (x, y) in enumerate(zip(xs, yv)))
    trend = f'''<figure class="trend"><svg viewBox="0 0 {W} {Hh}" role="img" aria-labelledby="tr-t"><title id="tr-t">Weddings registered in the province of Antwerp each year from 2015 to 2024, from {num(ps[0])} to {num(ps[-1])}, with a low of {num(min(ps))} in 2020</title>
<polyline points="{pts}" class="tl"/>{dots_svg}{lab}{yl}</svg>
<figcaption>Province of Antwerp, weddings a year, 2015 to 2024</figcaption></figure>'''
    rows = ''.join(f'<tr><th scope="row">{y}</th><td>{num(a)}</td><td>{num(b)}</td></tr>' for y, a, b in zip(ys, ps, m['city_series']))
    return f'''<div class="fld" data-field>
  <div class="fld-ctl">
    {seg("Where", "data-scope", [(s["key"], s["label"]) for s in m["scopes"]], m["scope_def"])}
    <div class="rg"><label for="fld-k">Couples a year</label><div class="rg-in"><input id="fld-k" type="range" min="{m["couples"]["min"]}" max="{m["couples"]["max"]}" step="{m["couples"]["step"]}" value="{k}" aria-valuetext="{k} couples"><output for="fld-k" data-o="k">{k}</output></div></div>
  </div>
  <div class="fld-cv"><canvas id="field" width="1100" height="380" aria-hidden="true"><img src="/media/field.png" width="1100" height="380" alt=""></canvas></div>
  <p class="fld-out" data-o="out" aria-live="polite"><b data-o="k2">{k}</b> couples is <b>1 in <span data-o="one">{num(one_in)}</span></b> weddings registered <span data-o="where">{esc(cur["in"])}</span> in 2024, <span data-o="n">{num(cur["n"])}</span> in all.</p>
  <p class="fld-key">Each dot is one wedding registered in 2024. Yours are the red ones.</p>
  <script type="application/json">{data}</script>
</div>
<div class="two mk-low">
  {trend}
  <div><p class="lead sm">{esc(m["abroad_line"])}</p>
  <details class="tvw"><summary>Show the years as a table</summary><table><thead><tr><th scope="col">Year</th><th scope="col">Province of Antwerp</th><th scope="col">City of Antwerp</th></tr></thead><tbody>{rows}</tbody></table></details></div>
</div>'''


# ------------------------------------------------------------------ III, the wedding year

def reached(year, m, lead, now):
    """Month m (1 to 12) of year, booked lead months ahead, has reached its booking month by now."""
    return year * 12 + (m - 1) - lead <= now['y'] * 12 + (now['m'] - 1)


def book_label(year, m, lead):
    t = year * 12 + (m - 1) - lead
    return f'{MON[t % 12]} {str(t // 12)[2:]}'


def calendar():
    c = D['calendar']
    ms, now, Y, L = c['months'], c['now'], c['year_def'], c['lead']['def']
    tot = sum(ms)
    got = sum(v for i, v in enumerate(ms) if reached(Y, i + 1, L, now))
    W, Hh, top, bot = 960, 300, 34, 54
    gap = 10
    bw = (W - gap * 11) / 12
    mx = max(ms)
    bars = ''
    for i, v in enumerate(ms):
        h = (v / mx) * (Hh - top - bot)
        x = i * (bw + gap)
        y = Hh - bot - h
        on = reached(Y, i + 1, L, now)
        bars += (f'<g class="cb{" on" if on else ""}" data-i="{i}"><rect x="{x:.1f}" y="{y:.1f}" width="{bw:.1f}" height="{h:.1f}"/>'
                 f'<text class="cv" x="{x + bw / 2:.1f}" y="{y - 8:.1f}" text-anchor="middle">{num(v)}</text>'
                 f'<text class="cm" x="{x + bw / 2:.1f}" y="{Hh - bot + 20:.1f}" text-anchor="middle">{MON[i]}</text>'
                 f'<text class="ck" x="{x + bw / 2:.1f}" y="{Hh - bot + 40:.1f}" text-anchor="middle" data-k="{i}">{book_label(Y, i + 1, L)}</text></g>')
    marks = ''.join(f'<li><b>{mk["m"]}</b><span>{esc(mk["t"])}</span></li>' for mk in c['marks'])
    lo, hi = c['lead']['min'], c['lead']['max']
    ticks = ''.join(f'<i style="--x:{(mk["m"] - lo) / (hi - lo):.4f}"></i>' for mk in c['marks'])
    data = json.dumps({'months': ms, 'now': now, 'mon': MON}).replace('[[', '[ [')
    rows = ''.join(f'<tr><th scope="row">{MON[i]} {Y}</th><td>{num(v)}</td><td data-t="{i}">{book_label(Y, i + 1, L)}</td><td data-r="{i}">{"Reached" if reached(Y, i + 1, L, now) else "Not yet"}</td></tr>' for i, v in enumerate(ms))
    return f'''<div class="cal" data-cal>
  <div class="cal-ctl">
    {seg("Wedding year", "data-year", [(y, str(y)) for y in c["years"]], Y)}
    <div class="rg"><label for="cal-l">Months ahead the planner is booked</label><div class="rg-in rg-mk"><input id="cal-l" type="range" min="{lo}" max="{hi}" step="{c["lead"]["step"]}" value="{L}" aria-valuetext="{L} months"><output for="cal-l" data-o="l">{L}</output><span class="rg-t" aria-hidden="true">{ticks}</span></div></div>
  </div>
  <figure class="cal-fig">
    <svg class="cal-svg" viewBox="0 {-4} {W} {Hh + 4}" role="img" aria-labelledby="cal-t"><defs><linearGradient id="calOn" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#B4453F"/><stop offset=".38" stop-color="#962122"/><stop offset=".62" stop-color="#7A1A1C"/><stop offset="1" stop-color="#962122"/></linearGradient></defs><title id="cal-t">Flemish weddings by month in 2024, used as the shape of a wedding year. Red months have reached their booking month by October 2026.</title>{bars}</svg>
    <figcaption class="cal-out" data-o="out" aria-live="polite">{cal_sentence(Y, L, got, tot, ms, now)}</figcaption>
  </figure>
  <ol class="cal-marks">{marks}</ol>
  <details class="tvw"><summary>Show the months as a table</summary><table><thead><tr><th scope="col">Wedding month</th><th scope="col">Weddings, a year like 2024</th><th scope="col">Planner booked by</th><th scope="col">By October 2026</th></tr></thead><tbody data-rows>{rows}</tbody></table></details>
  <script type="application/json">{data}</script>
</div>'''


def cal_sentence(Y, L, got, tot, ms, now):
    if got == 0:
        first = book_label(Y, 1, L).split()
        return f'Booked {L} months ahead, no {Y} wedding has reached that point yet. The first does in {first[0]} 20{first[1]}.'
    if got == tot:
        return f'Booked {L} months ahead, every {Y} wedding has reached that point, all {num(tot)} in a year like 2024.'
    return f'Booked {L} months ahead, {num(got)} of {num(tot)} weddings in a year like 2024, {pct(got, tot)}, have reached that point for {Y}.'


# ------------------------------------------------------------------ IV, who else they see

def rivals():
    r = D['rivals']
    rows = r['rows']
    view = r['views'][0]['key']
    mx = {'told': 20, 'ig': 10000}

    def bar(row, key):
        v = row[key]
        us = ' us' if row.get('us') else ''
        if v is None:
            return f'<li class="rb{us} nr" data-v=""><span class="rb-n"><b>{esc(row["name"])}</b><small>{esc(row["place"])}</small></span><span class="rb-t"><i style="--x:0"></i></span><span class="rb-v">Not read</span></li>'
        return f'<li class="rb{us}" data-v="{v}"><span class="rb-n"><b>{esc(row["name"])}</b><small>{esc(row["place"])}</small></span><span class="rb-t"><i style="--x:{v / mx[key]:.4f}"></i></span><span class="rb-v">{num(v)}</span></li>'

    bars = ''.join(bar(x, view) for x in rows)
    data = json.dumps({'rows': [{k: x[k] for k in ('name', 'place', 'told', 'ig')} | ({'us': True} if x.get('us') else {}) for x in rows], 'max': mx}).replace('[[', '[ [')
    cols = [('count', 'By its own count'), ('told', 'Weddings told'), ('words', "Couples' words"), ('price', 'A price'), ('season', 'This season')]
    head = ''.join(f'<th scope="col">{esc(t)}</th>' for _, t in cols)
    body = ''
    lst = ''
    for x in rows:
        cells = ''.join(f'<td>{esc(num(x[k]) if isinstance(x[k], int) else x[k])}</td>' for k, _ in cols)
        body += f'<tr{" class=us" if x.get("us") else ""}><th scope="row">{esc(x["name"])}<small>{esc(x["place"])}</small></th>{cells}</tr>'
        dl = ''.join(f'<div><dt>{esc(t)}</dt><dd>{esc(num(x[k]) if isinstance(x[k], int) else x[k])}</dd></div>' for k, t in cols)
        lst += f'<li{" class=us" if x.get("us") else ""}><h3>{esc(x["name"])} <small>{esc(x["place"])}</small></h3><dl>{dl}</dl></li>'
    return f'''<figure class="rv-ch" data-rivals>
  <div class="rv-top"><figcaption class="ch-t" data-o="cap">{esc(r["views"][0]["label"])}</figcaption>{seg("Compare", "data-view", [(v["key"], v["label"]) for v in r["views"]], view)}</div>
  <ol class="rbars" data-o="bars">{bars}</ol>
  <script type="application/json">{data}</script>
</figure>
<div class="rtab"><table><thead><tr><th scope="col">Planner</th>{head}</tr></thead><tbody>{body}</tbody></table></div>
<ol class="rlist">{lst}</ol>'''


# ------------------------------------------------------------------ V, the money

def money():
    m = D['money']
    b, share, ax = m['budget'], m['share'], m['axis_max']
    fee = b['def'] * share
    marks = ''
    for i, mk in enumerate(m['marks']):
        marks += f'<li class="mm{" lo" if i % 2 else ""}" style="--x:{mk["v"] / ax:.4f}"><span class="mm-v">{eur(mk["v"])}</span></li>'
    ticks = ''.join(f'<span style="--x:{v / ax:.4f}">{eur(v)}</span>' for v in range(0, ax + 1, 2500))
    leg = ''.join(f'<li><b>{eur(mk["v"])}</b> {esc(mk["t"])}, {esc(mk["note"])}</li>' for mk in m['marks'])
    surv = ''.join(f'<div><dt>{esc(s["t"])}</dt><dd>{esc(s["v"])}</dd></div>' for s in m['survey'])
    return f'''<div class="two mo-top"><p class="lead">{esc(m["lede"])}</p><dl class="kv">{surv}</dl></div>
<div class="mo" data-money data-share="{share}" data-max="{ax}">
  <div class="rg mo-rg"><label for="mo-b">A couple's wedding budget</label><div class="rg-in"><input id="mo-b" type="range" min="{b["min"]}" max="{b["max"]}" step="{b["step"]}" value="{b["def"]}" aria-valuetext="{eur(b["def"])}"><output for="mo-b" data-o="b">{eur(b["def"])}</output></div></div>
  <div class="mo-sc">
    <div class="mo-line" aria-hidden="true"></div>
    <ol class="mo-mk" aria-hidden="true">{marks}</ol>
    <div class="mo-me" style="--x:{min(fee, ax) / ax:.4f}" data-o="me"><span class="mo-me-v" data-o="fee">{eur(fee)}</span><span class="mo-me-t">15% of the budget</span></div>
    <div class="mo-ax" aria-hidden="true">{ticks}</div>
  </div>
  <p class="mo-out" data-o="out" aria-live="polite">Wedding Dreamworx's 15% of {eur(b["def"])} is <b>{eur(fee)}</b>.</p>
  <ul class="mo-leg">{leg}</ul>
</div>'''


# ------------------------------------------------------------------ VI, why now

def why():
    w = D['why']
    ev = ''.join(f'<li class="ev rv"><span class="ev-d">{esc(e["d"])}</span><div><h3>{esc(e["t"])}</h3><p>{esc(e["p"])}</p></div></li>' for e in w['events'])
    bh = ''.join(f'<li><span class="ev-d">{esc(e["d"])}</span><p>{esc(e["p"])}</p></li>' for e in w['behind'])
    return f'''<div class="tline" data-tline><svg class="ribbon" viewBox="0 0 40 1000" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="rib" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#962122"/><stop offset=".45" stop-color="#C2605A"/><stop offset=".7" stop-color="#7A1A1C"/><stop offset="1" stop-color="#962122"/></linearGradient></defs><path d="M20 0 C 36 120, 4 240, 20 360 S 36 600, 20 720 S 4 900, 20 1000" pathLength="1" class="rib"/></svg><ol class="evs">{ev}</ol></div>
<h3 class="t3 bh-h">Behind it</h3><ul class="bh">{bh}</ul>'''


# ------------------------------------------------------------------ VII, the new site

def built():
    bt = D['built']
    if not PROTO or not bt['shots']:
        return f'<div class="ph" role="note"><p class="ph-t">Placeholder</p><p>{esc(bt["placeholder"])}</p></div>'
    frames = ''.join(f'<div class="bf-i{" on" if i == 0 else ""}" data-i="{i}">{pic(s["img"], "The new Honey It’s Handled site, " + s["alt"], 1200, 750)}</div>' for i, s in enumerate(bt['shots']))
    caps = ''.join(f'<li data-i="{i}"><span class="bc-n">{i + 1:02d}</span><div><h3>{esc(s["h"])}</h3><p>{esc(s["p"])}</p><div class="bc-m">{pic(s["img"], "", 1200, 750)}</div></div></li>' for i, s in enumerate(bt['shots']))
    phones = ''.join(f'<figure>{pic(p["img"], p["alt"], 520, 1126)}</figure>' for p in bt['phones'])
    return f'''<div class="bf" data-bf><ol class="bc">{caps}</ol><div class="bf-stick"><div class="bf-frame">{frames}</div></div></div>
<div class="bt-ph">{phones}</div>
<div class="acts"><a class="btn solid" href="{PROTO}">Open the new site</a></div>'''


# ------------------------------------------------------------------ VIII, the first couples

def first():
    f = D['first']
    rows = ''.join(f'<li class="chl rv"><h3>{esc(c["h"])}</h3><p class="chl-f">{esc(c["fact"])}</p><p class="chl-d"><span class="lb">What we\'d do</span>{esc(c["do"])}</p><p class="chl-n"><span class="lb">The number</span>{esc(c["n"])}</p></li>' for c in f['channels'])
    ph = ''.join(f'<figure class="pr pr{i}">{pic(p["img"], p["alt"], 560, 840)}</figure>' for i, p in enumerate(f['photos']))
    return f'''<ol class="chls">{rows}</ol>
<div class="prints">{ph}</div><p class="prints-cap">{esc(f["photos_cap"])}</p>'''


def gantt():
    out = ''
    for w in D['roadmap']:
        a, b = [int(x) for x in re.findall(r'\d+', w['when'])]
        items = ''.join(f'<li>{esc(t)}</li>' for t in w['items'])
        out += (f'<li class="gt-r"><div class="gt-l"><span class="gt-w">{esc(w["when"])}</span><h3>{esc(w["h"])}</h3></div>'
                f'<div class="gt-track" aria-hidden="true"><i style="--a:{(a - 1) / 12:.4f};--b:{b / 12:.4f}"></i></div><ul>{items}</ul></li>')
    wk = ''.join(f'<span>{i}</span>' for i in range(1, 13))
    return f'<div class="gt"><div class="gt-wk" aria-hidden="true"><span class="gt-wl">Week</span><div>{wk}</div><span class="gt-x"></span></div><ol>{out}</ol></div>'


# ------------------------------------------------------------------ the page

def page():
    c, td, mk, cal, rv, mo, wy, bt, fs, tm, en = (D[k] for k in ('cover', 'today', 'market', 'calendar', 'rivals', 'money', 'why', 'built', 'first', 'team', 'end'))
    facts = ''.join(f'<div><dt>{esc(k)}</dt><dd>{esc(v)}</dd></div>' for k, v in td['facts'])
    tshots = ''.join(f'<figure class="shot">{pic(s["img"], "honeyitshandled.com today, " + s["cap"], 1200, 750)}<figcaption>{esc(s["cap"])}</figcaption></figure>' for s in td['shots'])
    kp = ''.join(f'<li><b>{esc(k["h"])}</b><span>{esc(k["where"])}</span></li>' for k in D['kpis'])
    ppl = ''.join(f'<div class="pp"><h3>{esc(p["name"])}</h3><p class="pp-r">{esc(p["role"])}</p><p>{esc(p["bio"])}</p><a class="u" href="{p["li"]}" rel="noopener">{esc(p["name"].split()[0])} on LinkedIn</a></div>' for p in tm['people'])
    toc = [('today', 'Today'), ('market', 'The market'), ('year', 'When they decide'), ('rivals', 'Who else they see'), ('money', 'The money'),
           ('why', 'Why now'), ('site', 'The new site'), ('first', 'The first couples'), ('days', '90 days'), ('team', 'The team')]
    tocl = ''.join(f'<li><a href="#{a}"><span>{ROMAN[i]}</span>{t}</a></li>' for i, (a, t) in enumerate(toc))
    site_href = PROTO or '#site'
    used.update(['hh-mask.png'])
    fav = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' fill='%23962122'/%3E%3Cpath d='M22 14 14 50M42 14 34 50M18 32h20M30 22 26 42' stroke='%23F9F7F6' stroke-width='4' fill='none'/%3E%3C/svg%3E"
    return f'''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{esc(D["meta"]["title"])}</title>
<meta name="description" content="{esc(D["meta"]["desc"])}">
<meta name="robots" content="noindex, nofollow">
<meta name="theme-color" content="#F9F7F6">
<link rel="icon" href="{fav}">
<link rel="preload" href="/fonts/mona-sans-latin-standard-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/css/plan.css">
<script>document.documentElement.classList.add('js');if(matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('rm')</script>
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<header class="hdr"><div class="wrap hdr-in">
<a class="hb" href="#top" aria-label="The plan, back to the top"><span class="hb-hh" aria-hidden="true"><i></i></span><span class="hb-t">The plan</span><span class="hb-s">for Honey It's Handled, by Astra</span></a>
<nav aria-label="The new site and the contact"><a class="hl" href="{site_href}">The new site</a><a class="btn sm" href="{en["mail"]}">{esc(en["cta"])}</a></nav>
</div></header>
<main id="main">

<section class="cv" id="top" aria-labelledby="cv-h">
  <div class="wrap cv-in">
    <div class="cv-txt">
      <p class="cv-by">{esc(c["by"])}</p>
      <h1 id="cv-h" class="cv-h">{esc(c["h"])}</h1>
      <p class="lead">{esc(c["lede"])}</p>
      <div class="acts"><a class="btn solid" href="#today">Read the plan</a><a class="btn" href="{site_href}">The new site</a></div>
    </div>
    <div class="cv-art" aria-hidden="true"><div class="hh"><canvas id="satin" width="900" height="800"></canvas></div><p class="hh-k">Your monogram, in your three colours</p></div>
  </div>
  <div class="wrap"><nav class="toc" aria-label="Chapters"><ol>{tocl}</ol></nav></div>
</section>

<section class="sec ow" id="today" aria-labelledby="t-h">
  <div class="wrap">
    {ch(1, "Today")}
    <div class="hd"><h2 id="t-h" class="t1">{esc(td["h"])}</h2></div>
    <div class="two"><p class="lead">{esc(td["lede"])}</p><dl class="kv">{facts}</dl></div>
    <figure class="qt"><blockquote><p>{esc(td["quote"])}</p></blockquote><figcaption>{esc(td["quote_src"])}</figcaption></figure>
    <div class="shots">{tshots}</div>
    {src(td["src"])}
  </div>
</section>

<section class="sec bl" id="market" data-prev="ow" aria-labelledby="m-h">
  <div class="wrap">
    {ch(2, "The market")}
    <div class="hd"><h2 id="m-h" class="t1">{esc(mk["h"])}</h2><p class="lead">{esc(mk["lede"])}</p></div>
    {market()}
    {src(mk["src"])}
  </div>
</section>

<section class="sec bl" id="year" aria-labelledby="y-h">
  <div class="wrap">
    {ch(3, "When they decide")}
    <div class="hd"><h2 id="y-h" class="t1">{esc(cal["h"])}</h2><p class="lead">{esc(cal["lede"])}</p></div>
    {calendar()}
    {src(cal["src"])}
  </div>
</section>

<section class="sec ow" id="rivals" data-prev="bl" aria-labelledby="r-h">
  <div class="wrap">
    {ch(4, "Who else they see")}
    <div class="hd"><h2 id="r-h" class="t1">{esc(rv["h"])}</h2><p class="lead">{esc(rv["lede"])}</p></div>
    {rivals()}
    <p class="lead after">{esc(rv["after"])}</p>
    {src(rv["src"])}
  </div>
</section>

<section class="sec ow" id="money" aria-labelledby="mo-h">
  <div class="wrap">
    {ch(5, "The money")}
    <div class="hd"><h2 id="mo-h" class="t1">{esc(mo["h"])}</h2></div>
    {money()}
    <p class="lead after">{esc(mo["after"])}</p>
    {src(mo["src"])}
  </div>
</section>

<section class="sec ow" id="why" aria-labelledby="w-h">
  <div class="wrap">
    {ch(6, "Why now")}
    <div class="hd"><h2 id="w-h" class="t1">{esc(wy["h"])}</h2><p class="lead">{esc(wy["lede"])}</p></div>
    {why()}
    {src(wy["src"])}
  </div>
</section>

<section class="sec ow" id="site" aria-labelledby="s-h">
  <div class="wrap">
    {ch(7, "The new site")}
    <div class="hd"><h2 id="s-h" class="t1">{esc(bt["h"])}</h2><p class="lead">{esc(bt["lede"])}</p></div>
    {built()}
  </div>
</section>

<section class="sec ow" id="first" aria-labelledby="f-h">
  <div class="wrap">
    {ch(8, "The first couples")}
    <div class="hd"><h2 id="f-h" class="t1">{esc(fs["h"])}</h2><p class="lead">{esc(fs["lede"])}</p></div>
    {first()}
    {src(fs["src"])}
  </div>
</section>

<section class="sec ow" id="days" aria-labelledby="d-h">
  <div class="wrap">
    {ch(9, "90 days")}
    <h2 id="d-h" class="t1">Twelve weeks, the site first, then the season.</h2>
    {gantt()}
    <h3 class="t3 kp-h">What we'd count, every month</h3>
    <ul class="kp">{kp}</ul>
  </div>
</section>

<section class="sec ow" id="team" aria-labelledby="tm-h">
  <div class="wrap two">
    <div>{ch(10, "The team")}<h2 id="tm-h" class="t1">Astra, one team with Amwisesa.</h2><p class="lead">{esc(tm["lede"])}</p><p class="lead">{esc(tm["brands"])}</p>{src(tm["disclosure"])}</div>
    <div class="ppl">{ppl}</div>
  </div>
</section>

<section class="end rd" data-prev="ow" aria-labelledby="e-h">
  <canvas class="satin-bg" id="satin2" width="640" height="420" aria-hidden="true"></canvas>
  <div class="env" aria-hidden="true">{pic("envelope", "", 720, 405, ext="png")}</div>
  <div class="wrap end-in">
    <h2 id="e-h" class="end-h">{esc(en["h"])}</h2>
    <p class="lead">{esc(en["lede"])}</p>
    <div class="acts"><a class="btn solid inv" href="{en["mail"]}">{esc(en["cta"])}</a><a class="btn inv" href="{site_href}">The new site</a></div>
    <p class="end-f">{esc(en["foot"])}</p>
  </div>
</section>
</main>
<script src="/js/plan.js" defer></script>
<script src="/js/art.js" defer></script>
</body></html>'''


def build():
    media()
    if os.path.isdir(OUT):
        shutil.rmtree(OUT)
    for d in ('css', 'js', 'fonts', 'media'):
        os.makedirs(os.path.join(OUT, d))
    html = page()
    m = D['market']
    field_png(next(s['n'] for s in m['scopes'] if s['key'] == m['scope_def']), m['couples']['def'], os.path.join(OUT, 'media', 'field.png'))
    used.discard('field.png')
    open(os.path.join(OUT, 'index.html'), 'w').write(html)
    shutil.copy(os.path.join(B, 'css', 'plan.css'), os.path.join(OUT, 'css', 'plan.css'))
    for f in ('plan.js', 'art.js'):
        shutil.copy(os.path.join(B, 'js', f), os.path.join(OUT, 'js', f))
    for f in os.listdir(os.path.join(B, 'fonts')):
        if f.endswith('.woff2'):
            shutil.copy(os.path.join(B, 'fonts', f), os.path.join(OUT, 'fonts', f))
    for u in sorted(used):
        shutil.copy(os.path.join(B, 'media', u), os.path.join(OUT, 'media', u))
    open(os.path.join(OUT, 'robots.txt'), 'w').write('User-agent: *\nDisallow: /\n')
    open(os.path.join(OUT, 'netlify.toml'), 'w').write('[[headers]]\n  for = "/*"\n  [headers.values]\n    X-Robots-Tag = "noindex, nofollow"\n')
    # every reference in the page and the stylesheet has to exist
    css = open(os.path.join(OUT, 'css', 'plan.css')).read()
    refs = re.findall(r'(?:src|href)="(/[^"#?]+)"', html) + [x.split()[0] for s in re.findall(r'srcset="([^"]+)"', html) for x in s.split(', ')]
    refs += re.findall(r'url\((/[^)]+)\)', css)
    for ref in refs:
        assert os.path.exists(os.path.join(OUT, ref.lstrip('/'))), ref
    assert '[[' not in html, 'a [[ in the page'
    print('wrote', OUT, len(html), 'bytes,', len(used), 'media,', 'prototype' if PROTO else 'placeholder mode')


if __name__ == '__main__':
    build()
