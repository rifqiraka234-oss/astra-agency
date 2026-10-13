#!/usr/bin/env python3
"""justclaims.eu prototype, v3, the flight documents design language.
Reuses the verified data of build.py (clocks, verbatim quotes, the annex, the readiness questions, the chart numbers)
and writes new templates to ../../site-v3/. v1 stays in ../../site/ and v2 in ../../site-v2/.

The grammar. Airport wayfinding for navigation and section signs, a split flap board for the deadlines, flight progress
strips for the fifteen time limits, an approach chart for one claim, a punch card for the 96 hours, newspaper charts,
an exhibit for the product, a boarding pass for the claim clock. Sans for the system, serif for the law, mono for codes."""
import os, re, json, math, shutil, datetime, html
V3 = os.path.dirname(os.path.abspath(__file__))
B1 = os.path.abspath(os.path.join(V3, '..'))
src = open(os.path.join(B1, 'build.py'), encoding='utf-8').read().split("if __name__ == '__main__':")[0]
G = {'__file__': os.path.join(B1, 'build.py'), '__name__': 'v1'}
exec(compile(src, os.path.join(B1, 'build.py'), 'exec'), G)
CL, E, DAYS, OJ, TBC, LP = G['CL'], G['E'], G['DAYS'], G['OJ'], G['TBC'], G['LP']
TODAY, APPLIES, FORCE, PUB = G['TODAY'], G['APPLIES'], G['FORCE'], G['PUB']
OUT = os.path.abspath(os.path.join(B1, '..', 'site-v3'))
SITE_URL = 'https://astra-justclaims-v3.netlify.app'
V1 = 'https://astra-justclaims-prototype.netlify.app/'
CLK = {c['id']: c for c in CL['clocks']}

# ---- marks
wx0, wy0, wx1, wy1 = LP['box']['word']; tx0, ty0, tx1, ty1 = LP['box']['tag']
LOGO = f'<svg class="logo" viewBox="{wx0} {wy0} {wx1-wx0} {wy1-wy0}" role="img" aria-label="justclaims.eu"><path class="m" d="{LP["just"]}"/><path class="c" d="{LP["claims"]}"/></svg>'
LOGOTAG = f'<svg class="logo" viewBox="{wx0} {wy0} {wx1-wx0} {ty1-wy0}" role="img" aria-label="justclaims.eu, it\'s about time"><path class="m" d="{LP["just"]}"/><path class="c" d="{LP["claims"]}"/><path class="c" d="{LP["tag"]}"/></svg>'
def ARW(d='r', cls=''):
    """the wayfinding arrow. A heavy shaft and an open right angle head, the way airport signs draw it"""
    rot = {'r': 0, 'd': 90, 'l': 180, 'u': 270, 'ur': -45, 'dr': 45}[d]
    return (f'<svg class="arw {cls}" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><g transform="rotate({rot} 12 12)">'
            f'<path d="M2.5 12H19.5M12.2 4.7 19.5 12l-7.3 7.3" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="butt" stroke-linejoin="miter"/></g></svg>')
AR = ARW('r')

def sr(t): return f'<span class="sr">{E(t)}</span>'

# ---- split flap cells. Static markup shows the final characters, so the board reads with no script.
def flaps(text, cls='', drum='a'):
    cells = ''.join(f'<span class="fl"><span class="u"><b>{"&nbsp;" if c == " " else E(c)}</b></span><span class="d"><b>{"&nbsp;" if c == " " else E(c)}</b></span></span>' for c in text)
    return f'<span class="flaps {cls}" data-flap="{E(text)}" data-drum="{drum}" aria-hidden="true">{cells}</span>'
def module(text, alts=()):
    a = ' data-alts="' + E('|'.join(alts)) + '"' if alts else ''
    return f'<span class="mod" data-mod="{E(text)}"{a} aria-hidden="true"><span class="u"><b>{E(text)}</b></span><span class="d"><b>{E(text)}</b></span></span>'

# ---- the wayfinding sign that opens each section. Number, arrow, German above, English below.
def sign(n, de, en, arrow='d'):
    return (f'<div class="sign"><span class="sg-n">{n}</span>{ARW(arrow, "sg-a")}<span class="sg-t"><span class="de" lang="de">{E(de)}</span><span class="en">{E(en)}</span></span></div>')

# ---- header, footer
NAV = [('new-rules.html', 'The new rules', 'rules'), ('platform.html', 'Platform', 'platform'), ('customers.html', 'Customers', 'customers'),
       ('resources.html', 'Resources', 'resources'), ('about.html', 'About', 'about')]
def header(cur):
    links = ''.join(f'<a href="{h}"' + (' aria-current="page"' if k == cur else '') + f'>{t}</a>' for h, t, k in NAV)
    mlinks = ''.join(f'<a href="{h}">{t}{AR}</a>' for h, t, k in NAV)
    return f'''<a class="skip" href="#main">Skip to content</a>
<aside class="draft" aria-label="Draft status">Draft for CHS Claims Handling Solutions, not live. Anything tagged To confirm needs your check.</aside>
<header class="bar" data-bar>
  <a class="brand" href="index.html" aria-label="justclaims.eu home">{LOGO}</a>
  <nav class="links" aria-label="Main">{links}</nav>
  <a class="bar-days" href="new-rules.html#timeline">{flaps(f"{DAYS:03d}", "sm", "n")}<span class="sr"><span data-days-n>{DAYS}</span> days until the rules apply</span><span aria-hidden="true">days until the rules apply</span></a>
  <a class="bar-cta" href="request-a-demo.html">Request a walkthrough{AR}</a>
  <button class="menu" type="button" aria-expanded="false" aria-controls="mnav"><span class="sr">Menu</span><i></i><i></i></button>
</header>
<nav class="mnav" id="mnav" aria-label="Mobile"><a href="index.html">Home{AR}</a>{mlinks}<a href="claim-clock.html">Claim clock{AR}</a><a href="readiness.html">Readiness check{AR}</a><a class="mnav-cta" href="request-a-demo.html">Request a walkthrough{AR}</a></nav>'''

FOOTER = f'''<footer class="foot">
  <div class="wrap foot-g">
    <div class="foot-brand">{LOGOTAG}<p>Passenger claims management for airlines. A product of CHS Claims Handling Solutions GmbH, founded in 2017 by aviation attorneys.</p>
      <address>Güterplatz 1<br>60327 Frankfurt am Main<br><a href="tel:+4969380299910">+49 69 380 299 910</a></address></div>
    <nav aria-label="The new rules"><h2>The new rules</h2><a href="new-rules.html">The time limits on one ruler</a><a href="claim-clock.html">Claim clock</a><a href="readiness.html">Readiness check</a><a href="96-hour-notice.html">The 96 hour notice</a><a href="30-days-to-pay-or-justify.html">30 days to pay or justify</a><a href="extraordinary-circumstances.html">Extraordinary circumstances</a></nav>
    <nav aria-label="justclaims.eu"><h2>justclaims.eu</h2><a href="platform.html">Platform</a><a href="customers.html">Customers</a><a href="resources.html">Resources</a><a href="about.html">About</a><a href="request-a-demo.html">Request a walkthrough</a><a href="https://www.justclaims.eu/imprint" rel="noopener">Imprint</a><a href="https://www.justclaims.eu/privacy-policy" rel="noopener">Privacy policy</a><a href="https://www.linkedin.com/company/justclaims/" rel="noopener">LinkedIn</a></nav>
    <div class="colophon"><h2>Colophon</h2>
      <p>Rules quoted word for word from the Official Journal, <a href="{OJ}" rel="noopener">Regulation (EU) 2026/2202</a>.</p>
      <p>Set in Barlow, a grotesk that takes after California's highway signs and number plates, Newsreader for the text of the law, and B612 Mono, the face Airbus commissioned for its cockpit screens.</p>
      <p>Photographs from Pexels and film from Mixkit, stock, printed here as halftones. None of it shows CHS, its people or its customers.</p></div>
  </div>
  <div class="wrap foot-bot"><span>&copy; 2026 CHS Claims Handling Solutions GmbH</span><span>Regulation (EU) 2026/2202 applies from 23 October 2027</span></div>
</footer>'''

def cta(n='08'):
    return f'''<section class="cta" id="walkthrough" aria-labelledby="cta-h">
  <div class="wrap">
    {sign(n, 'Vorführung', 'A walkthrough', 'r')}
    <a class="cta-sign" href="request-a-demo.html">
      <span class="cta-arw">{ARW('r')}</span>
      <span class="cta-t"><span id="cta-h" class="cta-h">Request a walkthrough</span><span class="cta-s">A live demo tailored to you. We take the 96 hour notice and the 30 day answer and set them beside the way you handle a claim today.</span></span>
    </a>
    <div class="cta-row">
      <div class="cta-board"><span class="lbl"><span lang="de">noch</span> · to go</span>{flaps(f"{DAYS:03d}", "md", "n")}<span class="lbl"><span class="sr" data-days-n>{DAYS}</span> days until the rules apply</span></div>
      <a class="sg-link" href="readiness.html">Take the readiness check{AR}</a>
      <a class="sg-link" href="claim-clock.html">Open the claim clock{AR}</a>
    </div>
  </div>
</section>'''

# ---- the board. Seven clocks that touch a claim, ordered by length the way a departures board orders by time.
BOARD = [
    ('ack-now', 'NOW', 'Acknowledge the request', '7(9)'),
    ('arrival-3h', '3 H', 'Late by more than 3 h, right to compensation', '6(4)'),
    ('notice-96h', '96 H', 'Send the claim notice to the passenger', '7(4)'),
    ('ack-7wd', '7 WD', 'Confirm receipt of a complaint', '15a(2)'),
    ('reply-30d', '30 D', 'Pay, or justify not paying', '7(9)'),
    ('complaint-1m', '1 MO', 'Reasoned reply to a complaint *', '15a(2)'),
    ('file-9m', '9 MO', 'Passenger files the request', '7(9)'),
]
def board():
    rows = []
    duties = [b[2] for b in BOARD]
    for i, (cid, lim, duty, art) in enumerate(BOARD):
        c = CLK[cid]; who = 'AIRLINE' if c['who'] == 'airline' else 'PASSENGER'
        alts = [duties[(i + 2) % len(duties)], duties[(i + 5) % len(duties)]]
        whoflap = flaps(who.ljust(9), 'who', 'a') if who == 'AIRLINE' else f'<span class="lang" data-alt="FLUGGAST ">{flaps(who, "who", "a")}</span>'
        rows.append(f'<tr class="w-{c["who"]}"><th scope="row">{flaps(lim.ljust(4), "lim", "a")}{sr(c["label"])}</th>'
                    f'<td class="b-duty"><a href="#c-{cid}">{module(duty, alts)}<span class="b-txt">{E(duty)}</span></a></td>'
                    f'<td class="b-art">{flaps(art.ljust(6), "fa", "a")}{sr(c["art"])}</td>'
                    f'<td class="b-who">{whoflap}{sr("Airline" if c["who"] == "airline" else "Passenger")}</td></tr>')
    return f'''<div class="board" data-board>
  <div class="bd-head">
    <h2 class="bd-title"><span lang="de">Fristen</span><span>Deadlines</span></h2>
    <p class="bd-clock"><span class="lbl"><span lang="de">Gilt ab</span> · Applies</span><b>23.10.2027</b></p>
    <p class="bd-clock"><span class="lbl"><span lang="de">noch</span> · to go</span>{flaps(f"{DAYS:03d}", "md", "n")}<span class="lbl"><span class="sr" data-days-n>{DAYS}</span> <span lang="de">Tage</span> · days</span></p>
  </div>
  <table class="bd-t">
    <caption class="sr">Seven time limits in Regulation (EU) 2026/2202 that touch a claim for compensation, shortest first</caption>
    <thead><tr><th scope="col"><span lang="de">Frist</span> Limit</th><th scope="col"><span lang="de">Pflicht</span> Duty</th><th scope="col"><span lang="de">Artikel</span> Article</th><th scope="col"><span lang="de">Wer</span> Who</th></tr></thead>
    <tbody>{''.join(rows)}</tbody>
  </table>
  <p class="bd-foot">* Or, in duly justified cases, say that a final reply will follow in less than two months. Art. 15a(2). Every row opens the sentence it comes from.</p>
</div>'''

# ---- flight progress strips, all fifteen limits. The length column is one log scale, so the rack reads as a ruler.
CLAIMS = {'ack-now', 'arrival-3h', 'notice-96h', 'ack-7wd', 'reply-30d', 'complaint-1m', 'file-9m'}
LMIN, LMAX = math.log10(0.1), math.log10(10000)
def lx(h): return max(0.0, (math.log10(max(h, 0.01)) - LMIN) / (LMAX - LMIN) * 100)
SCALE_T = [(1, '1 h'), (24, '1 d'), (168, ''), (730.5, '1 mo'), (8766, '1 yr')]
def first_sentence(s):
    m = re.match(r'(.+?\.)(\s+.+)?$', s, re.S)
    return (m.group(1), (m.group(2) or '').strip()) if m else (s, '')
def strips():
    out = []
    for c in sorted(CL['clocks'], key=lambda c: c['hours']):
        one, rest = first_sentence(c['duty'])
        who = 'Airline duty' if c['who'] == 'airline' else 'Passenger right'
        pos = lx(c['hours'])
        ticks = ''.join(f'<i style="left:{lx(h):.2f}%"></i>' for h, _ in SCALE_T)
        out.append(f'''<li class="strip w-{c['who']}{' cl' if c['id'] in CLAIMS else ''}" id="c-{c['id']}">
<details><summary>
<span class="s-hold" aria-hidden="true"></span>
<span class="s-lim"><i>Limit</i><b>{E(c['label'][0].upper() + c['label'][1:])}</b></span>
<span class="s-duty"><i>{who}</i><b>{E(one)}</b><span class="s-st">Starts when {E(c['starts'])}.</span></span>
<span class="s-art"><i>Article</i><b>{E(c['art'])}</b></span>
<span class="s-len" aria-hidden="true"><span class="s-sc">{ticks}<b style="width:{pos:.2f}%"></b></span></span>
<span class="s-tog" aria-hidden="true"><i></i></span>
</summary>
<div class="s-body">{f'<p class="s-rest">{E(rest)}</p>' if rest else ''}<div class="lawq"><span class="lq-k">{E(c['art'])}</span><q class="law">{E(c['quote'])}</q><a class="lq-src" href="{OJ}" rel="noopener">Official Journal, Regulation (EU) 2026/2202</a></div></div>
</details></li>''')
    labels = ''.join(f'<span style="left:{lx(h):.2f}%">{t}</span>' for h, t in SCALE_T if t)
    return f'''<div class="rack" data-rack>
  <div class="rack-ctl"><div class="tabs" role="group" aria-label="Which strips to mark"><button type="button" aria-pressed="false" data-f="claims">Claims handling, 7</button><button type="button" aria-pressed="true" data-f="all">All 15</button></div>
  <p class="legend"><span class="k a"></span>Airline duty <span class="k p"></span>Passenger right</p></div>
  <div class="rack-h" aria-hidden="true"><span>Limit</span><span>Duty, and when it starts</span><span>Article</span><span class="rh-sc">{labels}</span></div>
  <ol class="strips">{''.join(out)}</ol>
</div>'''

# ---- the approach chart. One claim as a route. Planned route dashed, flown route solid, each leg at its own scale.
FIX = [  # x, y, ident, label, leg label to the next fix, ticks on that leg
    (70, 470, 'ARRIVAL', 'over 3 h late', None, 0),
    (300, 470, 'NOTICE', '96 h', '96 H', 4),
    (470, 330, 'REQUEST', 'within 9 mo', '9 MO', 9),
    (700, 330, 'ANSWER', '30 d', '30 D', 30),
    (840, 190, 'COMPLAINT', '', None, 0),
]
def approach():
    segs, fixes, legs = [], [], []
    for i in range(1, len(FIX)):
        x0, y0 = FIX[i - 1][:2]; x1, y1 = FIX[i][:2]
        segs.append(f'M{x0} {y0}L{x1} {y1}')
        mx, my = (x0 + x1) / 2, (y0 + y1) / 2; ang = math.degrees(math.atan2(y1 - y0, x1 - x0))
        lab, nt = FIX[i][4], FIX[i][5]
        tk = ''
        if nt:
            L = math.hypot(x1 - x0, y1 - y0) - 60
            tk = ''.join(f'<line x1="{-L/2 + L*k/nt:.1f}" y1="14" x2="{-L/2 + L*k/nt:.1f}" y2="{22 if k in (0, nt) else 19}"/>' for k in range(nt + 1))
        lb = f'<g class="lb" transform="rotate({-ang:.2f})"><rect x="-34" y="-46" width="68" height="28"/><text x="0" y="-26">{lab}</text></g>' if lab else ''
        legs.append(f'<g class="leg" data-i="{i}" transform="translate({mx:.1f} {my:.1f}) rotate({ang:.2f})"><g class="lt">{tk}</g>{lb}'
                    f'<path class="dir" d="M-6 -5 2 0-6 5"/></g>')
    for i, (x, y, ident, lab, _, _) in enumerate(FIX):
        up = i in (2, 4)
        fixes.append(f'<g class="fix" data-i="{i}" transform="translate({x} {y})"><path class="tri" d="M0 -11 10 7H-10Z"/>'
                     f'<text class="id" x="{0 if up else 0}" y="{-24 if up else 34}" text-anchor="middle">{ident}</text>'
                     f'<text class="sub" x="0" y="{-42 if up else 52}" text-anchor="middle">{lab}</text></g>')
    hx, hy = FIX[-1][:2]
    hold = (f'<g class="hold" transform="translate({hx} {hy})"><path class="rt" d="M0 0H90A32 32 0 0 1 90 64H0A32 32 0 0 1 0 0Z"/>'
            f'<text class="hld" x="45" y="38" text-anchor="middle">HOLD</text><text class="hs" x="45" y="88" text-anchor="middle">7 WD · 1 MO</text></g>')
    # one continuous subpath. Chrome restarts a dash pattern at every moveto, which would ink every leg at once
    route = f'M{FIX[0][0]} {FIX[0][1]}' + ''.join(f'L{x} {y}' for x, y, *_ in FIX[1:]) + f'H{hx+90}A32 32 0 0 1 {hx+90} {hy+64}H{hx}A32 32 0 0 1 {hx} {hy}'
    seg = [math.hypot(FIX[i][0] - FIX[i-1][0], FIX[i][1] - FIX[i-1][1]) for i in range(1, len(FIX))]
    total = sum(seg) + 2 * 90 + math.pi * 32 * 2
    acc, stops = 0, [0]
    for L in seg: acc += L; stops.append(acc / total)
    north = '<g class="north" transform="translate(940 520)"><path d="M0 -26 7 0 0 -6 -7 0Z"/><text y="18" text-anchor="middle">N</text></g>'
    sb = '<g class="sbar" transform="translate(70 560)"><path d="M0 0H160M0 -5V5M40 -3V3M80 -5V5M120 -3V3M160 -5V5"/><text x="0" y="22">Each leg is drawn at the scale of its own clock</text></g>'
    return (f'<svg class="appr" viewBox="0 0 1000 600" data-stops="{",".join(f"{x:.4f}" for x in stops)}" role="img" aria-label="A route chart of one claim. It lands more than three hours late, the claim notice follows within 96 hours, the passenger files within nine months, the airline answers within 30 days, and a complaint goes into a hold of seven working days and one month.">'
            f'<g class="grid">{"".join(f"<line x1=\"{x}\" y1=\"20\" x2=\"{x}\" y2=\"580\"/>" for x in range(100, 1000, 100))}{"".join(f"<line x1=\"20\" y1=\"{y}\" x2=\"980\" y2=\"{y}\"/>" for y in range(100, 600, 100))}</g>'
            f'<path class="plan" d="{route}"/><path class="flown" pathLength="1" d="{route}"/>{"".join(legs)}{hold}{"".join(fixes)}{north}{sb}</svg>')

# ---- the punch card for the 96 hours
def punchcard():
    rows = []
    for d in range(4):
        cells = ''.join(f'<i style="--k:{d*24+h}"><span>{h:02d}</span></i>' for h in range(24))
        rows.append(f'<div class="pc-r"><span class="pc-d"><span lang="de">Tag</span> Day {d+1}</span><div class="pc-c">{cells}</div></div>')
    return f'''<div class="card" data-card aria-hidden="true">
  <div class="pc-top"><span>Art. 7(4)</span><span>96 hours, one position for each</span><span>justclaims.eu</span></div>
  {''.join(rows)}
  <div class="pc-bot"><span class="mono">0</span><span class="mono pc-ruler"></span><span class="mono">96</span></div>
</div>'''

# ---- newspaper charts on paper. One ink, one highlight, direct labels, the source underneath.
RATE, COURT = G['RATE'], G['COURT']
def chart_rate():
    x0, x1, y0, y1, vmax = 20, 580, 300, 30, 40.0
    X = lambda i: x0 + i * (x1 - x0) / (len(RATE) - 1); Y = lambda v: y0 - v / vmax * (y0 - y1)
    grid = ''.join(f'<line class="gl{" base" if g == 0 else ""}" x1="{x0}" x2="{x1+50}" y1="{Y(g):.1f}" y2="{Y(g):.1f}"/><text class="gt" x="{x1+50}" y="{Y(g)-6:.1f}" text-anchor="end">{g}{"%" if g == 40 else ""}</text>' for g in (0, 10, 20, 30, 40))
    pts = [(X(i), Y(v)) for i, (_, v) in enumerate(RATE)]
    line = 'M' + 'L'.join(f'{x:.1f} {y:.1f}' for x, y in pts)
    yrs = ''.join(f'<text class="yt" x="{X(i):.1f}" y="{y0+24}" text-anchor="middle">{"’" + str(y)[2:] if 0 < i < len(RATE) - 1 else y}</text>' for i, (y, _) in enumerate(RATE))
    ends = (f'<circle class="dt" cx="{pts[0][0]:.1f}" cy="{pts[0][1]:.1f}" r="5"/><text class="vl" x="{pts[0][0]+10:.1f}" y="{pts[0][1]-12:.1f}">8.0%</text>'
            f'<circle class="dt hi" cx="{pts[-1][0]:.1f}" cy="{pts[-1][1]:.1f}" r="7"/><text class="vl big" x="{pts[-1][0]-14:.1f}" y="{pts[-1][1]-16:.1f}" text-anchor="end">37.5%</text>')
    note = f'<g class="ann"><path d="M{X(4):.1f} {Y(20.6)-10:.1f}V{Y(31):.1f}H{X(4)-20:.1f}"/><text x="{X(4)-26:.1f}" y="{Y(31)+4:.1f}" text-anchor="end">2015, one in five</text></g>'
    return (f'<svg class="ch" viewBox="0 0 640 340" role="img" aria-label="Line chart. The share of eligible passengers who claimed and received compensation rose from 8.0 percent in 2011 to 37.5 percent in 2018.">'
            f'{grid}<path class="ln" pathLength="1" d="{line}"/>{note}{ends}{yrs}</svg>')
def chart_courts():
    x0, x1, y0, y1, vmax = 20, 560, 280, 30, 140000.0
    n = len(COURT); slot = (x1 - x0) / n; bw = slot * .62
    Y = lambda v: y0 - v / vmax * (y0 - y1)
    grid = ''.join(f'<line class="gl{" base" if g == 0 else ""}" x1="{x0}" x2="{x1+60}" y1="{Y(g):.1f}" y2="{Y(g):.1f}"/><text class="gt" x="{x1+60}" y="{Y(g)-6:.1f}" text-anchor="end">{g//1000}{"k" if g else ""}</text>' for g in (0, 50000, 100000))
    bars = ''
    for i, (yr, c, t) in enumerate(COURT):
        cx = x0 + slot * (i + .5); h = c / vmax * (y0 - y1); hi = (yr == 2024)
        bars += (f'<rect class="cb{" hi" if hi else ""}" x="{cx-bw/2:.1f}" y="{y0-h:.1f}" width="{bw:.1f}" height="{h:.1f}"/>'
                 f'<text class="vl{" big" if hi else ""}" x="{cx:.1f}" y="{y0-h-10:.1f}" text-anchor="middle">{c:,}</text>'
                 f'<text class="yt" x="{cx:.1f}" y="{y0+24}" text-anchor="middle">{yr}</text>'
                 f'<text class="st" x="{cx:.1f}" y="{y0+44}" text-anchor="middle">{100*c/t:.1f}%</text>')
    return (f'<svg class="ch" viewBox="0 0 640 340" role="img" aria-label="Bar chart. Flight passenger rights cases concluded by German district courts, 28,514 in 2021, 55,887 in 2022, 108,092 in 2023, 134,496 in 2024 and 123,938 in 2025.">'
            f'{grid}{bars}</svg>')

HTS = {  # name: (css width, css height, alt). Rendered by tools/ht_render.js from the stock and client files listed in tools/ht_all.sh
    'runway': (1600, 460, ''), 'apron': (720, 480, ''), 'hero': (560, 616, ''),
    'steppler': (320, 320, 'Ulrich Steppler'), 'brecke': (320, 320, 'Katja H. Brecke'),
    'winglet': (640, 520, ''), 'window': (640, 520, ''), 'wing': (640, 520, ''), 'rain': (640, 520, ''), 'trails': (640, 520, ''), 'fog': (640, 520, ''), 'apron2': (640, 520, '')}
CAPS = {'winglet': 'Stock photograph of a winglet at dusk, printed as a halftone.', 'window': 'Stock photograph of a cabin window at sunrise, printed as a halftone.',
        'wing': 'Stock photograph of a wing above cloud, printed as a halftone.', 'rain': 'Stock photograph of rain on glass at night, printed as a halftone.',
        'trails': 'Stock photograph of light trails over a runway at night, printed as a halftone.', 'fog': 'Stock photograph of a fogged window, printed as a halftone.',
        'apron2': 'Stock photograph of apron markings at dusk, printed as a halftone.'}

# ---- the head of an inner page, from the page's own meta. A sign, the title, the deck, the actions, a plate or the live film, a docket.
def pagehead(m):
    sg = m.get('sign'); h = m['h1']; deck = m.get('deck', ''); acts = m.get('acts', []); fig = m.get('fig'); dk = m.get('docket', [])
    a = ''.join(f'<a class="{"sg-btn" if i == 0 else "sg-link"}" href="{u}"' + (' rel="noopener"' if u.startswith('http') else '') + f'>{E(t)}{AR}</a>' for i, (u, t) in enumerate(acts))
    f = ''
    if fig == 'clock':
        f = ('<figure class="phd-f"><div class="htv" data-htv data-pitch="4.2" data-lo=".22" data-hi=".95" data-gam="1.15" data-fx=".5" data-fy=".42">'
             f'{ht("hero", *HTS["hero"])}<video muted loop playsinline preload="none" poster="assets/film/03-wall-clock-mixkit28886-poster.jpg" data-src="assets/film/03-wall-clock-mixkit28886.mp4" data-webm="assets/film/03-wall-clock-mixkit28886.webm" tabindex="-1" aria-hidden="true"></video></div>'
             '<figcaption>Stock film of a wall clock, printed live as a halftone.</figcaption></figure>')
    elif fig:
        f = f'<figure class="phd-f plate">{ht(fig, *HTS[fig])}<figcaption>{CAPS[fig]}</figcaption></figure>'
    d = ''
    if dk: d = '<dl class="docket row">' + ''.join(f'<div{" class=\"hot\"" if len(x) > 2 and x[2] else ""}><dt>{E(x[0])}</dt><dd>{x[1]}</dd></div>' for x in dk) + '</dl>'
    return (f'<section class="phd{" nofig" if not f else ""}" aria-labelledby="h1"><div class="wrap phd-g"><div class="phd-t">'
            + (sign(sg[0], sg[1], sg[2], sg[3] if len(sg) > 3 else 'd') if sg else '')
            + f'<h1 id="h1">{h}</h1>' + (f'<p class="deck">{deck}</p>' if deck else '') + (f'<div class="acts">{a}</div>' if a else '') + d
            + f'</div>{f}</div></section>')

# ---- the reform as a board. Every date from the Official Journal text, as v1 verified them. A row for today goes in by script.
TL = [('2013-11-12', 'The Economic and Social Committee\'s opinion is published.', 'Cited in the preamble. OJ C 327.'),
      ('2014-02-05', 'Parliament\'s position is dated 5 February 2014.', ''),
      ('2025-09-29', 'The Council adopts its position at first reading.', 'Published in the Official Journal on 30 Oct 2025.'),
      ('2026-01-21', 'Parliament adopts its position.', ''),
      ('2026-06-15', 'The Conciliation Committee approves the joint text.', ''),
      ('2026-07-07', 'Parliament adopts its legislative resolution.', ''),
      ('2026-07-13', 'The Council adopts its decision.', ''),
      ('2026-09-16', 'The regulation is signed in Strasbourg.', ''),
      ('2026-10-02', 'It is published in the Official Journal.', 'L series, 2026/2202.'),
      ('2026-10-22', 'It enters into force.', 'The twentieth day after publication, Art. 3 of Regulation 2026/2202.'),
      ('2027-10-23', 'It applies.', 'The Commission also has to adopt the implementing acts for the rights label and for reimbursement by airports by this date. Art. 3a(8) and Art. 11(7) of Regulation 261/2004 as amended.'),
      ('2031-10-23', 'The Commission reports.', 'On the Annex list and on how the regulation works, including the feasibility of further automation of requests for and payments of compensation for delays. Art. 17 of Regulation 261/2004 as amended.')]
def tlboard():
    rows = []
    for ds, ev, sub in TL:
        dt = datetime.date.fromisoformat(ds); key = ds in ('2026-10-22', '2027-10-23')
        st = 'APPLIES' if ds == '2027-10-23' else ('IN FORCE' if ds == '2026-10-22' else ('DONE' if dt <= TODAY else 'DUE'))
        rows.append(f'<tr class="tl-r{" key" if key else ""}" data-date="{ds}"><th scope="row">{flaps(dt.strftime("%d %b %y").upper(), "dt", "a")}<span class="sr">{dt.day} {dt.strftime("%B %Y")}</span></th>'
                    f'<td class="tl-e"><b>{E(ev)}</b>{f"<span>{E(sub)}</span>" if sub else ""}</td><td class="tl-s">{flaps(st.ljust(8), "st", "a")}<span class="sr">{st.title()}</span></td></tr>')
    return f'''<div class="board tlb" data-board data-tl>
  <div class="bd-head"><h2 class="bd-title"><span lang="de">Chronik</span><span>The reform, in dates</span></h2>
    <p class="bd-clock"><span class="lbl"><span lang="de">Gilt ab</span> · Applies</span><b>23.10.2027</b></p></div>
  <table class="bd-t tl-t"><caption class="sr">The dates of Regulation (EU) 2026/2202, from the Official Journal text</caption>
    <thead><tr><th scope="col"><span lang="de">Datum</span> Date</th><th scope="col"><span lang="de">Ereignis</span> Event</th><th scope="col"><span lang="de">Stand</span> Status</th></tr></thead>
    <tbody>{''.join(rows)}</tbody></table>
  <p class="bd-foot">Every date comes from the Official Journal text of Regulation (EU) 2026/2202, from its preamble, its footnotes and its articles. The 2 October 2026 date is on the Official Journal's own header.</p>
</div>'''
def ht(name, w, h, alt='', cls=''):
    """a halftone still, prerendered by tools/ht_render.js"""
    return f'<img class="ht {cls}" src="assets/img/ht/{name}.png" width="{w}" height="{h}" alt="{E(alt)}" loading="lazy" decoding="async">'

def page(meta, body):
    t = meta['title']; full = 'justclaims.eu, ' + t if meta.get('home') else t + ' | justclaims.eu'
    js = ''.join(f'<script src="assets/{x}.js" defer></script>' for x in meta.get('extra', []) if os.path.exists(os.path.join(OUT, 'assets', x + '.js')))
    return f'''<!doctype html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>{E(full)}</title>
<meta name="description" content="{E(meta['desc'])}">
<meta property="og:title" content="{E(full)}">
<meta property="og:description" content="{E(meta['desc'])}">
<meta property="og:type" content="website">
<meta property="og:image" content="{SITE_URL}/assets/img/og.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#111312">
<meta name="robots" content="noindex">
{'<base href="/">' if meta.get('base') else ''}<link rel="icon" href="assets/img/favicon.svg" type="image/svg+xml">
<link rel="preload" href="assets/fonts/barlow-semi-condensed-latin-600-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="assets/fonts/barlow-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="assets/fonts/newsreader-latin-opsz-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="assets/v3.css">
<script>document.documentElement.className+=' js';</script>
</head>
<body class="p-{meta.get('nav', 'x')}{' ' + meta['cls'] if meta.get('cls') else ''}" data-applies="{CL['applies']}" data-force="{CL['entersIntoForce']}" data-oj="{OJ}" data-built="{TODAY.isoformat()}">
{header(meta.get('nav', ''))}
<main id="main">
{body}
</main>
{FOOTER}
<script src="assets/ht.js" defer></script><script src="assets/v3.js" defer></script>{js}
</body>
</html>
'''

def render(name):
    srcp = open(os.path.join(V3, 'pages', name), encoding='utf-8').read()
    m = re.match(r'\s*<!--(\{.*?\})-->\s*', srcp, re.S); meta = json.loads(m.group(1)); body = srcp[m.end():]
    for _ in range(3):
        body = re.sub(r'\{\{INC:([a-z0-9\-]+)\}\}', lambda mm: open(os.path.join(V3, 'pages', '_parts', mm.group(1) + '.html'), encoding='utf-8').read(), body)
    tr, tc = G['chart_tables']()
    rep = {'{{AR}}': AR, '{{TBC}}': TBC, '{{CTA}}': cta(f"{len(re.findall(r'\{\{SIGN:', body)) + 1:02d}"), '{{DAYS}}': str(DAYS), '{{FORCEDAYS}}': str((FORCE - TODAY).days), '{{OJ}}': OJ,
           '{{NCLOCKS}}': str(len(CL['clocks'])), '{{BOARD}}': board(), '{{STRIPS}}': strips(), '{{APPROACH}}': approach(), '{{PUNCH}}': punchcard(),
           '{{CHARTRATE}}': chart_rate() + tr, '{{CHARTCOURTS}}': chart_courts() + tc, '{{READYMAP}}': G['readiness_map'](),
           '{{ARD}}': ARW('d'), '{{ARU}}': ARW('ur'),
           '{{CLOCKSJSON}}': '<script type="application/json" id="clocks-data">' + json.dumps({'clocks': CL['clocks'], 'quotes': CL['quotes'], 'applies': CL['applies'], 'force': CL['entersIntoForce']}, ensure_ascii=False).replace('</', '<\\/') + '</script>'}
    rep.update({'{{TLBOARD}}': tlboard(), '{{ANNEX}}': G['annex_html'](), '{{READYQS}}': G['readiness_qs'](), '{{CLOCKROWS}}': G['clockrows']()})
    if meta.get('h1'): body = pagehead(meta) + body
    for k, v in rep.items(): body = body.replace(k, v)
    body = re.sub(r'\{\{SIGN:([^|}]+)\|([^|}]+)\|([^|}]+)(?:\|([a-z]+))?\}\}', lambda mm: sign(mm.group(1), mm.group(2), mm.group(3), mm.group(4) or 'd'), body)
    body = re.sub(r'\{\{HT:([a-z0-9]+)\}\}', lambda mm: ht(mm.group(1), *HTS[mm.group(1)]), body)
    body = body.replace('{{LOGOW}}', LOGO)
    body = re.sub(r'\{\{LAW:([a-z0-9\-]+)\}\}', lambda mm: G['law'](mm.group(1)), body)
    body = re.sub(r'\{\{FLAP:([^}]+)\}\}', lambda mm: flaps(mm.group(1)) + (sr(mm.group(1).strip()) if mm.group(1).strip() else ''), body)
    left = re.findall(r'\{\{[A-Z:a-z0-9\-|]+\}\}', body)
    if left: raise SystemExit(f'{name}: unreplaced tokens {left}')
    return page(meta, body)

if __name__ == '__main__':
    # the rules data is embedded in each page that needs it, so no separate data file is published
    only = os.environ.get('ONLY'); built = []
    have = set(x for x in os.listdir(os.path.join(V3, 'pages')) if x.endswith('.html'))
    for f in sorted(have):
        if only and f != only: continue
        out = render(f)
        # pages not yet rebuilt in v3 link to the live v1 site, so the preview has no dead links
        out = re.sub(r'href="([a-z0-9\-]+\.html)((?:#[^"]*|\?[^"]*)?)"', lambda mm: f'href="{mm.group(1)}{mm.group(2)}"' if mm.group(1) in have else f'href="{V1}{mm.group(1)}{mm.group(2)}"', out)
        open(os.path.join(OUT, f), 'w', encoding='utf-8').write(out); built.append(f)
    print('v3 built', len(built), 'pages', ', '.join(built), '| days to apply', DAYS)
