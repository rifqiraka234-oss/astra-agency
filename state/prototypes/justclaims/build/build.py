#!/usr/bin/env python3
"""justclaims.eu prototype. Assembles pages/*.html into ../site/.
Each page starts with <!--{"title","desc","nav","extra":[...],"cls"}-->.
Tokens in a page body: {{AR}} arrow, {{TBC}} to-confirm tag, {{CTA}} the shared closing section, {{WING}} the winglet svg,
{{LAW:id}} a verbatim legal quote from data/clocks.json, {{CLOCKROWS}} the duty table rows, {{RULERLIST}} the static ruler list,
{{ANNEX}} the extraordinary circumstances list, {{DAYS}} days from today to application (build time, replaced live by JS)."""
import os, re, json, glob, datetime, html, shutil
HERE = os.path.dirname(os.path.abspath(__file__)); OUT = os.path.join(HERE, '..', 'site'); os.makedirs(OUT, exist_ok=True)
CL = json.load(open(os.path.join(HERE, 'data', 'clocks.json'), encoding='utf-8'))
LP = json.load(open(os.path.join(HERE, 'assets-src', 'logo-paths.json')))
TODAY = datetime.date.fromisoformat(os.environ.get('BUILD_DATE', '2026-10-12'))
APPLIES = datetime.date.fromisoformat(CL['applies']); FORCE = datetime.date.fromisoformat(CL['entersIntoForce'])
DAYS = (APPLIES - TODAY).days
OJ = 'https://eur-lex.europa.eu/eli/reg/2026/2202/oj/eng'
SITE_URL = 'https://astra-justclaims-prototype.netlify.app'
E = html.escape

# ---- logo, traced from the client's own PNG (tools/trace_logo.py)
# the word crop picked up the tops of four tagline letters (y 713 to 720). Drop any subpath that starts below the baseline.
def _drop_below(d, y):
    keep = []
    for part in re.split(r'(?=M)', d):
        if not part.strip(): continue
        ys = [float(v) for v in re.findall(r'[-\d.]+\s+([-\d.]+)', part)]
        if ys and min(ys) > y: continue
        keep.append(part)
    return ''.join(keep)
LP['claims'] = _drop_below(LP['claims'], 700)
LP['box']['word'][3] = 710
wx0, wy0, wx1, wy1 = LP['box']['word']; tx0, ty0, tx1, ty1 = LP['box']['tag']; gx0, gy0, gx1, gy1 = LP['box']['wing']
LOGO = f'<svg class="logo" viewBox="{wx0} {wy0} {wx1-wx0} {wy1-wy0}" role="img" aria-label="justclaims.eu"><path class="m" d="{LP["just"]}"/><path class="c" d="{LP["claims"]}"/></svg>'
LOGOTAG = f'<svg class="logo" viewBox="{wx0} {wy0} {wx1-wx0} {ty1-wy0}" role="img" aria-label="justclaims.eu, it\'s about time"><path class="m" d="{LP["just"]}"/><path class="c" d="{LP["claims"]}"/><path class="c" d="{LP["tag"]}"/></svg>'
WING = f'<svg class="wing" viewBox="{gx0} {gy0} {gx1-gx0} {gy1-gy0}" aria-hidden="true" focusable="false"><path class="m" d="{LP["wing_mint"]}"/><path class="c" d="{LP["wing_char"]}"/></svg>'
AR = '<svg class="ar" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h9M8.5 4l4 4-4 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>'
TBC = '<span class="tbc" title="Placeholder for CHS to confirm">To confirm</span>'

NAV = [('new-rules.html', 'The new rules', 'rules'), ('platform.html', 'Platform', 'platform'), ('customers.html', 'Customers', 'customers'),
       ('resources.html', 'Resources', 'resources'), ('about.html', 'About', 'about')]

def header(cur):
    links = ''.join(f'<a href="{h}"' + (' aria-current="page"' if k == cur else '') + f'>{t}</a>' for h, t, k in NAV)
    mlinks = ''.join(f'<a href="{h}">{t}</a>' for h, t, k in NAV)
    return f'''<a class="skip" href="#main">Skip to content</a>
<aside class="draftbar" aria-label="Draft status">Draft site for CHS Claims Handling Solutions. Not live. Anything tagged To confirm needs your check.</aside>
<header class="hdr"><div class="wrap">
  <a class="brand" href="index.html" aria-label="justclaims.eu home">{LOGO}</a>
  <nav class="nav" aria-label="Main">{links}</nav>
  <a class="daychip" href="new-rules.html#timeline" data-days title="Days until Regulation (EU) 2026/2202 applies"><b data-days-n>{DAYS}</b><span> days to apply</span></a>
  <a class="btn" href="request-a-demo.html"><span>Request a walkthrough</span></a>
  <button class="menu-btn" type="button" aria-expanded="false" aria-controls="mnav" aria-label="Menu"><span></span><span></span></button>
</div></header>
<nav class="mnav" id="mnav" aria-label="Mobile"><a href="index.html">Home</a>{mlinks}<a href="claim-clock.html">Claim clock</a><a href="readiness.html">Readiness check</a><a class="btn" href="request-a-demo.html"><span>Request a walkthrough</span></a></nav>'''

FOOTER = f'''<footer class="ftr night"><div class="wrap">
  <div class="fcols">
    <div class="fbrand">{LOGOTAG}<p>Passenger claims management for airlines. A product of CHS Claims Handling Solutions GmbH, founded in 2017 by aviation attorneys.</p></div>
    <div><h2>The new rules</h2><ul><li><a href="new-rules.html">The time limits on one ruler</a></li><li><a href="claim-clock.html">Claim clock</a></li><li><a href="readiness.html">Readiness check</a></li><li><a href="96-hour-notice.html">The 96 hour notice</a></li><li><a href="30-days-to-pay-or-justify.html">30 days to pay or justify</a></li></ul></div>
    <div><h2>justclaims.eu</h2><ul><li><a href="platform.html">Platform</a></li><li><a href="customers.html">Customers</a></li><li><a href="resources.html">Resources</a></li><li><a href="about.html">About</a></li><li><a href="request-a-demo.html">Request a walkthrough</a></li></ul></div>
    <div><h2>CHS Claims Handling Solutions GmbH</h2><ul class="addr"><li>Güterplatz 1</li><li>60327 Frankfurt am Main</li><li><a href="tel:+4969380299910">T +49 69 380 299 910</a></li><li><a href="https://www.justclaims.eu/imprint" rel="noopener">Imprint</a></li><li><a href="https://www.justclaims.eu/privacy-policy" rel="noopener">Privacy policy</a></li><li><a href="https://www.linkedin.com/company/justclaims/" rel="noopener" target="_blank">LinkedIn</a></li></ul></div>
  </div>
  <div class="fbot"><span>&copy; 2026 CHS Claims Handling Solutions GmbH</span><span>Rules quoted from the Official Journal, <a href="{OJ}" rel="noopener" target="_blank">Regulation (EU) 2026/2202</a></span></div>
</div></footer>'''

CTA = f'''<section class="cta night"><div class="wrap">
  <div class="cta-in">
    <p class="mono lab">{DAYS} days until the rules apply</p>
    <h2>See your claims handling against the new clocks.</h2>
    <p class="lead">A live demo tailored to you. We take the 96 hour notice and the 30 day answer and set them beside the way you handle a claim today.</p>
    <div class="row"><a class="btn mint" href="request-a-demo.html"><span>Request a walkthrough {AR}</span></a><a class="btn line" href="readiness.html"><span>Take the readiness check</span></a></div>
  </div>
</div></section>'''

# ---- generated fragments from the verified data
def law(cid):
    q = CL['quotes'].get(cid) or {c['id']: c['quote'] for c in CL['clocks']}[cid]; return f'<q class="law">{E(q)}</q>'
def clockrows():
    rows = []
    for c in sorted(CL['clocks'], key=lambda c: c['hours']):
        who = 'Airline' if c['who'] == 'airline' else 'Passenger'
        rows.append(f'<tr id="c-{c["id"]}" class="who-{c["who"]}"><th scope="row"><span class="mono dur">{E(c["label"])}</span></th><td>{E(c["duty"])}<span class="starts">Starts when {E(c["starts"])}.</span></td><td class="mono art">{E(c["art"])}</td><td>{who}</td></tr>')
    return '\n'.join(rows)
def rulerlist():
    out = []
    for c in sorted(CL['clocks'], key=lambda c: c['hours']):
        out.append(f'<li class="rl who-{c["who"]}" data-id="{c["id"]}"><span class="mono dur">{E(c["label"])}</span><span class="rl-b"><b>{E(c["duty"])}</b><span class="mono art">{E(c["art"])} · starts when {E(c["starts"])}</span></span></li>')
    return '\n'.join(out)
ANNEX = [
 ('1', 'Circumstances not arising from the operation of the aircraft', [
  ('1(a)', 'natural disasters which are incompatible with the safe operation of the flight;'),
  ('1(b)', 'environmental disasters that do not originate from the operating air carrier and which are incompatible with the safe operation of the flight;'),
  ('1(c)', 'meteorological conditions or damage to the aircraft caused by meteorological events which are incompatible with the safe operation of the flight;'),
  ('1(d)', 'war or insurrection which is incompatible with the safe operation of the flight;'),
  ('1(e)', 'serious cross-border threats to health falling within the scope of Article 2(1) or (4) of Regulation (EU) 2022/2371 of the European Parliament and of the Council (*1) which are incompatible with the safe operation of the flight;')]),
 ('2', 'Incidents related to a passenger', [
  ('2(a)', 'unruly passenger incidents within the meaning of the Montreal Protocol 2014 which are incompatible with the safe operation of the flight, which necessitate the interruption or deviation of the flight, or which delay the flight departure, unless the operating air carrier caused the occurrence of that behaviour;'),
  ('2(b)', 'health risks or medical emergencies discovered at short notice before the flight departure, or necessitating the interruption or deviation of the flight;')]),
 ('3', 'Other incidents', [
  ('3(a)', 'damage caused by acts of sabotage or terrorism, which is incompatible with the safe operation of the flight;'),
  ('3(b)', 'security risks or damage caused by other unlawful acts, which are incompatible with the safe operation of the flight, provided that the situation is beyond the actual control of the operating air carrier;'),
  ('3(c)', 'hidden manufacturing or design defects, revealed by the manufacturer or a competent authority, which are incompatible with the safe operation of the flight;'),
  ('3(d)', 'air traffic management or airport capacity restrictions, or closure of airspace, including runway closures by the authorities, provided that the event results from a decision that was beyond the actual control of the operating air carrier;'),
  ('3(e)', 'partial or full unscheduled closure of an airport, including a general airport system failure, a power outage, an electronic communications collapse, or the activation of the contingency plan by the airport managing body incompatible with the scheduled and safe operation of the flight;'),
  ('3(f)', 'a generalised breakdown of the refuelling system provided that the situation is not intrinsically linked to the operation of the aircraft and that it is beyond the actual control of the operating air carrier;'),
  ('3(g)', 'strikes at essential service providers such as an airport managing body, air navigation service providers, or groundhandling service providers which air carriers do not effectively choose within the meaning of Directive 96/67/EC, provided that those strikes are beyond the actual control of the operating air carrier or the group of companies to which that air carrier belongs;'),
  ('3(h)', 'strikes at the operating air carrier, provided that those strikes originate from demands that only public authorities can satisfy and that are therefore beyond the actual control of the operating air carrier or the group of companies to which that air carrier belongs;'),
  ('3(i)', 'damage to the aircraft, on the ground or in the air, caused by third parties for whom the air carrier is not responsible, by animals or by foreign objects, and which is incompatible with the safe operation of the flight;'),
  ('3(j)', 'contaminated runway of an airport which is incompatible with the safe operation of the flight, provided the contamination does not originate from the air carrier;'),
  ('3(k)', 'after departure, serious health risks or medical emergencies of a crew member necessitating the interruption or deviation of the flight;'),
  ('3(l)', 'operational shortcomings of airport essential service providers, such as an airport managing body, air navigation service providers, and groundhandling service providers which air carriers do not effectively choose within the meaning of Directive 96/67/EC, provided that the operating air carrier was unable to exercise effective control over those essential service providers.')])]
def annex_html():
    out = []
    for gid, gtitle, items in ANNEX:
        out.append(f'<div class="ax-group" data-g="{gid}"><h3 class="ax-h"><span class="mono">{gid}</span> {E(gtitle)}</h3><ul>')
        for iid, txt in items:
            out.append(f'<li><button type="button" class="ax-item" data-ax="{iid}"><span class="mono ax-id">Annex {iid}</span><q class="law">{E(txt)}</q></button></li>')
        out.append('</ul></div>')
    return '\n'.join(out)
def verify_annex():
    REG = open(os.path.join(HERE, '..', 'research', 'regulation', 'regulation_2026_2202.txt'), encoding='utf-8').read()
    n = lambda s: re.sub(r'\s+', ' ', s.replace('’', "'").replace('‘', "'").replace('“', '"').replace('”', '"').replace(' ', ' ')).strip()
    R = n(REG)
    for gid, gt, items in ANNEX:
        for iid, txt in items:
            if n(txt) not in R: raise SystemExit('ANNEX TEXT NOT IN REGULATION ' + iid)
        if n(gt).lower() not in R.lower(): raise SystemExit('ANNEX GROUP TITLE NOT IN REGULATION ' + gid)
verify_annex()


# ---- the year dial, one tick per day from publication (2 Oct 2026) to application (23 Oct 2027)
import math
PUB = datetime.date.fromisoformat(CL['published'])
NDAYS = (APPLIES - PUB).days            # ticks, 386
def _pt(r, deg): a = math.radians(deg); return 320 + r * math.sin(a), 320 - r * math.cos(a)
def year_dial():
    n = NDAYS; tick = []; lbl = []
    months = []
    d = PUB
    for i in range(n):
        dt = PUB + datetime.timedelta(days=i)
        major = dt.day == 1; week = (i % 7 == 0)
        deg = i / n * 360
        r1 = 300; r0 = 276 if major else (286 if week else 290)
        x1, y1 = _pt(r1, deg); x0, y0 = _pt(r0, deg)
        tick.append(f'<line class="t{" M" if major else ""}" x1="{x0:.2f}" y1="{y0:.2f}" x2="{x1:.2f}" y2="{y1:.2f}"/>')
        if major:
            tx, ty = _pt(252, deg); name = dt.strftime('%b'); name = name + (" " + dt.strftime('%y') if dt.month == 1 else "")
            lbl.append(f'<text class="lbl" x="{tx:.1f}" y="{ty:.1f}">{name}</text>')
    ticks = ''.join(tick)
    fx, fy = _pt(312, (FORCE - PUB).days / n * 360)
    ax, ay = _pt(318, 0)
    ring = f'<circle class="ring" cx="320" cy="320" r="304"/><circle class="ring" cx="320" cy="320" r="236" stroke-dasharray="2 6"/>'
    base = f'<svg class="dial dim" viewBox="-60 -64 760 760" aria-hidden="true" focusable="false">{ring}<g>{ticks}</g>{"".join(lbl)}</svg>'
    bright = f'<svg class="dial bright" viewBox="-60 -64 760 760" aria-hidden="true" focusable="false"><g>{ticks}</g></svg>'
    marks = (f'<svg class="dial marks" viewBox="-60 -64 760 760" aria-hidden="true" focusable="false">'
             f'<circle class="mk in" cx="{fx:.1f}" cy="{fy:.1f}" r="6"/><text class="mklbl" x="{fx+14:.1f}" y="{fy-10:.1f}">In force 22 Oct 2026</text>'
             f'<circle class="mk" cx="{ax:.1f}" cy="{ay-10:.1f}" r="8"/><text class="mklbl amber" x="{ax:.1f}" y="{ay-32:.1f}" text-anchor="middle">Applies 23 Oct 2027</text></svg>')
    # the hand, the traced winglet standing upright (it leans 30 degrees in the logo), base inside the ring, tip at the ticks
    hand = (f'<svg viewBox="-60 -64 760 760" aria-hidden="true" focusable="false"><g class="hand-g" transform="translate(320 150) rotate(30) scale(0.38) translate(-836 -404)">'
            f'<path class="m" d="{LP["wing_mint"]}"/><path class="c" d="{LP["wing_char"]}"/></g></svg>')
    alt = f'Dial with one tick for each of the {n} days from publication of Regulation (EU) 2026/2202 on 2 October 2026 to the day it applies, 23 October 2027.'
    return (f'<div class="dialwrap" id="yeardial" data-n="{n}" data-start="{PUB.isoformat()}" data-today="{(TODAY-PUB).days}" role="img" aria-label="{alt}" style="--s:{(TODAY-PUB).days/n*360:.2f}deg">'
            f'{base}{bright}<div class="dial-hand">{hand}</div>{marks}'
            f'<div class="dial-c"><span class="n" data-days-n>{DAYS}</span><span class="u">days until the rules apply</span>'
            f'<span class="t2" data-days-hm>Regulation (EU) 2026/2202</span></div><div class="hit" data-hit></div><div class="dial-tip" data-tip></div></div>')

# ---- story dials, one per clock, each at its own scale. All ticks are lit in the static markup, the script dims and lights them while pinned.
def _hand():
    return (f'<g class="hand-g" transform="translate(320 150) rotate(30) scale(0.36) translate(-836 -404)"><path class="m" d="{LP["wing_mint"]}"/><path class="c" d="{LP["wing_char"]}"/></g>')
def story_dial(i):
    S = {
     1: dict(n=48, major=12, labels={12: '1 h', 24: '2 h'}, thr=36, top='', reach=38.4, label='3 h', alt='A four hour dial with a tick every five minutes. The three hour mark is amber.'),
     2: dict(n=96, major=24, labels={24: '1 d', 48: '2 d', 72: '3 d'}, thr=0, top='96 h', reach=96, label='96 h', alt='A 96 hour dial with a tick every hour and a mark each day. The 96th hour is amber at the top.'),
     3: dict(n=273, major=None, labels={}, thr=0, top='9 mo', reach=41, label='9 mo', alt='A nine month dial with a tick every day. A request arrives on day 41.'),
     4: dict(n=30, major=5, labels={5: '5', 10: '10', 15: '15', 20: '20', 25: '25'}, thr=0, top='30 d', reach=30, label='30 d', alt='A 30 day dial with a tick every day. Day 30 is amber at the top.'),
     5: dict(n=30, major=5, labels={5: '5', 10: '10', 15: '15', 20: '20', 25: '25'}, thr=0, top='1 mo', reach=30, label='1 mo', inner=7, alt='Two rings, an outer ring of 30 days standing for one month and an inner ring of seven working days. The seventh working day and the thirtieth day are amber at the top.'),
    }[i]
    n = S['n']; out = []; lbl = []; R = 290
    for k in range(n):
        deg = k / n * 360
        if S['major']: major = (k % S['major'] == 0)
        else: major = (k > 0 and int(k * 9 / n * 1.0000001) != int((k - 1) * 9 / n * 1.0000001))
        over = (S['thr'] and k >= S['thr'])
        x1, y1 = _pt(R, deg); x0, y0 = _pt(R - (26 if major else 14), deg)
        cls = 't' + (' M' if major else '') + (' over' if over else '')
        out.append(f'<line class="{cls}" data-k="{k}" x1="{x0:.2f}" y1="{y0:.2f}" x2="{x1:.2f}" y2="{y1:.2f}"/>')
        if S['labels'].get(k): tx, ty = _pt(238, deg); lbl.append(f'<text class="lbl" x="{tx:.1f}" y="{ty:.1f}">{S["labels"][k]}</text>')
    if i == 3:
        for m in range(1, 9):
            k = m * 273 / 9; tx, ty = _pt(238, k / 273 * 360); lbl.append(f'<text class="lbl" x="{tx:.1f}" y="{ty:.1f}">{m}</text>')
    inner = ''
    if S.get('inner'):
        m = S['inner']; parts = []
        for k in range(m):
            deg = k / m * 360; x1, y1 = _pt(176, deg); x0, y0 = _pt(150, deg)
            parts.append(f'<line class="t M in2" data-k="{k}" x1="{x0:.2f}" y1="{y0:.2f}" x2="{x1:.2f}" y2="{y1:.2f}"/>')
        inner = '<g class="inner">' + ''.join(parts) + '</g>'
        tx, ty = _pt(124, 0); lbl.append(f'<text class="lbl" x="{tx:.1f}" y="{ty:.1f}">7 wd</text>')
    tx, ty = _pt(318, 0)
    thr = ''
    if S['thr'] == 0: thr = f'<circle class="mk" cx="{tx:.1f}" cy="{ty-10:.1f}" r="8"/><text class="mklbl amber" x="{tx:.1f}" y="{ty-32:.1f}" text-anchor="middle">{S["top"]}</text>'
    else:
        ax, ay = _pt(318, S['thr'] / n * 360); thr = f'<circle class="mk" cx="{ax:.1f}" cy="{ay:.1f}" r="8"/><text class="mklbl amber" x="{ax-18:.1f}" y="{ay+5:.1f}" text-anchor="end">3 h</text>'
    ev = ''
    if i == 3:
        ax, ay = _pt(318, 41 / 273 * 360); ev = f'<circle class="mk in" cx="{ax:.1f}" cy="{ay:.1f}" r="7"/><text class="mklbl" x="{ax+16:.1f}" y="{ay-8:.1f}">Day 41</text>'
    if i == 1:
        ax, ay = _pt(318, S['reach'] / n * 360); ev = f'<circle class="mk in" cx="{ax:.1f}" cy="{ay:.1f}" r="7"/>'
    svg = (f'<svg class="dial sdl" viewBox="-60 -64 760 760" role="img" aria-label="{S["alt"]}"><circle class="ring" cx="320" cy="320" r="304"/>'
           f'<g class="ticks">{"".join(out)}</g>{inner}{"".join(lbl)}{thr}{ev}</svg>')
    return (f'<div class="sd" data-n="{n}" data-reach="{S["reach"]}" data-thr="{S["thr"]}" data-i="{i}">{svg}'
            f'<div class="sd-hand"><svg viewBox="-60 -64 760 760" aria-hidden="true" focusable="false">{_hand()}</svg></div>'
            f'<div class="sd-c"><span class="sd-v mono" data-v></span><span class="sd-u mono" data-u></span></div></div>')

# ---- readiness check, ten questions, each tied to an article
RQ = [
 ('The 96 hour notice', 'A journey ends and the passenger may be owed compensation. Do you send them the right and clear instructions within 96 hours?', 'Art. 7(4)', '96-hour-notice.html'),
 ('Durable medium, date and time', 'Is that message sent electronically, on a durable medium, with the date and time on it?', 'Art. 7(4), Art. 14(7)', '96-hour-notice.html'),
 ('Proof of the notice', 'For any passenger, can you show whether and when you provided the notice?', 'Art. 14(7)', '96-hour-notice.html'),
 ('No account or app', 'Can a passenger access your information, forms and replies without creating an account or installing an app?', 'Art. 14(7)', 'new-rules.html#duties'),
 ('Acknowledging a request', 'Do you acknowledge every request for compensation immediately, on a durable medium?', 'Art. 7(9)', '30-days-to-pay-or-justify.html'),
 ('Pay or justify in 30 days', 'Do you pay, or give a justification, within 30 calendar days of receiving a request?', 'Art. 7(9)', '30-days-to-pay-or-justify.html'),
 ('Extraordinary circumstances', 'When you rely on an extraordinary circumstance, do you name the Annex item, or the event and why it counts, and explain the causal link and the reasonable measures?', 'Art. 7(9), Art. 6c', 'extraordinary-circumstances.html'),
 ('Form of payment', 'Do you pay by electronic bank transfer, and record the passenger\'s explicit consent on a durable medium before any other means, such as a voucher?', 'Art. 7(7), Art. 8a', 'new-rules.html#duties'),
 ('Third party mandates', 'When a third party files for a passenger, can you ask for evidence of their mandate?', 'Art. 7(9)', 'new-rules.html#duties'),
 ('Complaints', 'Do you confirm a complaint within seven working days and, within one month, give a reasoned reply or, in duly justified cases, say a final reply will follow in under two months?', 'Art. 15a(2)', 'new-rules.html#table'),
]
def readiness_qs():
    out = []
    for i, (topic, q, art, href) in enumerate(RQ, 1):
        opts = ''.join(f'<label><input type="radio" name="rq{i}" value="{v}"><span>{t}</span></label>' for v, t in (('y', 'Yes'), ('p', 'Partly'), ('n', 'No'), ('u', 'Not sure')))
        out.append(f'<fieldset class="rq" data-i="{i}" data-topic="{E(topic)}" data-art="{E(art)}" data-href="{E(href)}"><legend><span class="mono rq-n">{i:02d}</span><span class="rq-q">{E(q)}</span><span class="art mono">{E(art)}</span></legend><div class="seg">{opts}</div></fieldset>')
    return '\n'.join(out)
def readiness_map():
    n = len(RQ); parts = []
    for i in range(n):
        a0 = i / n * 360 + 1.2; a1 = (i + 1) / n * 360 - 1.2
        def P(r, a): x, y = _pt(r, a); return f'{x:.1f} {y:.1f}'
        d = f'M{P(206,a0)} A206 206 0 0 1 {P(206,a1)} L{P(118,a1)} A118 118 0 0 0 {P(118,a0)} Z'
        mx, my = _pt(162, (a0 + a1) / 2); half = f'M{P(206,a0)} A206 206 0 0 1 {P(206,a1)} L{P(162,a1)} A162 162 0 0 0 {P(162,a0)} Z'
        parts.append(f'<g class="wd" data-i="{i+1}"><path class="wd-b" d="{d}"/><path class="wd-h" d="{half}"/><text x="{mx:.1f}" y="{my:.1f}">{i+1}</text></g>')
    return (f'<svg class="rmap" viewBox="-20 -20 680 680" role="img" aria-label="A ring of ten segments, one for each readiness question, filled as the questions are answered">{"".join(parts)}</svg>')

# ---- charts, drawn from numbers verified in research/data (Steer 2020 Figure 2.11, Destatis table 24231-03)
RATE = [(2011, 8.0), (2012, 10.1), (2013, 11.6), (2014, 15.0), (2015, 20.6), (2016, 26.4), (2017, 28.9), (2018, 37.5)]
COURT = [(2021, 28514, 798529), (2022, 55887, 716538), (2023, 108092, 752424), (2024, 134496, 801351), (2025, 123938, 818189)]
def chart_rate():
    x0, x1, y0, y1, vmax = 64, 616, 292, 36, 40.0
    pts = [(x0 + 28 + i * (x1 - x0 - 28) / (len(RATE) - 1), y0 - v / vmax * (y0 - y1)) for i, (_, v) in enumerate(RATE)]
    grid = ''.join(f'<line class="gl" x1="{x0}" x2="{x1}" y1="{y0 - g/vmax*(y0-y1):.1f}" y2="{y0 - g/vmax*(y0-y1):.1f}"/><text class="gt" x="{x0-10}" y="{y0 - g/vmax*(y0-y1)+5:.1f}" text-anchor="end">{g}%</text>' for g in (0, 10, 20, 30, 40))
    line = 'M' + ' L'.join(f'{x:.1f} {y:.1f}' for x, y in pts)
    area = line + f' L{pts[-1][0]:.1f} {y0} L{pts[0][0]:.1f} {y0} Z'
    dots = ''.join(f'<circle class="dt{" last" if i == len(RATE)-1 else ""}" cx="{x:.1f}" cy="{y:.1f}" r="{7 if i == len(RATE)-1 else 5}" style="transition-delay:{.5 + i*.09:.2f}s"/><text class="vt{" last" if i == len(RATE)-1 else ""}" x="{x:.1f}" y="{y-14:.1f}" text-anchor="middle" style="transition-delay:{.55 + i*.09:.2f}s">{v}%</text><text class="yt" x="{x:.1f}" y="{y0+24}" text-anchor="middle">{yr}</text>' for i, ((yr, v), (x, y)) in enumerate(zip(RATE, pts)))
    return (f'<svg class="cv" viewBox="0 0 660 330" role="img" aria-label="Line chart. The share of eligible passengers who claimed and received compensation rose from 8.0 percent in 2011 to 37.5 percent in 2018.">'
            f'{grid}<path class="ar" d="{area}"/><path class="ln" pathLength="1" d="{line}"/>{dots}</svg>')
def chart_courts():
    x0, x1, y0, y1, vmax = 64, 636, 270, 40, 140000.0
    n = len(COURT); slot = (x1 - x0) / n; bw = slot * .56
    grid = ''.join(f'<line class="gl" x1="{x0}" x2="{x1}" y1="{y0 - g/vmax*(y0-y1):.1f}" y2="{y0 - g/vmax*(y0-y1):.1f}"/><text class="gt" x="{x0-10}" y="{y0 - g/vmax*(y0-y1)+5:.1f}" text-anchor="end">{g//1000}k</text>' for g in (0, 50000, 100000, 140000))
    bars = ''
    for i, (yr, c, t) in enumerate(COURT):
        cx = x0 + slot * (i + .5); h = c / vmax * (y0 - y1); last = (i == n - 1)
        bars += (f'<rect class="bar{" last" if last else ""}" x="{cx-bw/2:.1f}" y="{y0-h:.1f}" width="{bw:.1f}" height="{h:.1f}" style="transition-delay:{i*.1:.2f}s"/>'
                 f'<text class="vt{" last" if last else ""}" x="{cx:.1f}" y="{y0-h-10:.1f}" text-anchor="middle" style="transition-delay:{.5+i*.1:.2f}s">{c:,}</text>'
                 f'<text class="yt" x="{cx:.1f}" y="{y0+24}" text-anchor="middle">{yr}</text>'
                 f'<text class="st" x="{cx:.1f}" y="{y0+44}" text-anchor="middle">{100*c/t:.1f}%</text>')
    return (f'<svg class="cv" viewBox="0 0 660 330" role="img" aria-label="Bar chart. Flight passenger rights cases concluded by German district courts, 28,514 in 2021, 55,887 in 2022, 108,092 in 2023, 134,496 in 2024 and 123,938 in 2025.">'
            f'{grid}{bars}</svg>')
def chart_tables():
    r = '<div class="sr"><table><caption>Share of eligible passengers who claimed and received compensation, weighted average</caption><tr><th>Year</th><th>Percent</th></tr>' + ''.join(f'<tr><td>{y}</td><td>{v}</td></tr>' for y, v in RATE) + '</table></div>'
    c = '<div class="sr"><table><caption>Flight passenger rights cases concluded by German district courts</caption><tr><th>Year</th><th>Flight cases</th><th>All civil cases</th></tr>' + ''.join(f'<tr><td>{y}</td><td>{a}</td><td>{t}</td></tr>' for y, a, t in COURT) + '</table></div>'
    return r, c

def phfig(fig):
    if not fig: return ''
    if fig.get('vid'):
        v = fig['vid']
        m = (f'<div class="ph-m tint"><video muted loop playsinline preload="none" poster="assets/film/{v}-poster.jpg" data-src="assets/film/{v}.mp4" data-webm="assets/film/{v}.webm" aria-hidden="true" tabindex="-1"></video></div>')
        cap = 'Stock film from Mixkit, recoloured to match this site.'
    else:
        m = f'<div class="ph-m"><img src="assets/img/ph/{fig["img"]}.jpg" alt="" width="1200" height="800" decoding="async"></div>'
        cap = 'Stock photograph from Pexels, recoloured to match this site.'
    return f'<figure class="ph-fig rv d2">{m}<figcaption class="mono">{cap}</figcaption></figure>'

def hour_grid():
    rows = ''.join(f'<div class="hgr"><span class="hgl mono">Day {d+1}</span>' + ''.join(f'<i style="--k:{d*24+h}"></i>' for h in range(24)) + '</div>' for d in range(4))
    return f'<div class="hg" data-hg aria-hidden="true">{rows}</div>'

def page(meta, body):
    t = meta['title']; full = 'justclaims.eu, ' + t if meta.get('home') else t + ' | justclaims.eu'
    extra = meta.get('extra', [])
    css = ''.join(f'<link rel="stylesheet" href="assets/{x}.css">' for x in extra if os.path.exists(os.path.join(OUT, 'assets', x + '.css')))
    js = ''.join(f'<script src="assets/{x}.js" defer></script>' for x in extra if os.path.exists(os.path.join(OUT, 'assets', x + '.js')))
    return f'''<!doctype html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>{E(full)}</title>
<meta name="description" content="{E(meta['desc'])}">
<meta property="og:title" content="{E(full)}">
<meta property="og:description" content="{E(meta['desc'])}">
<meta property="og:type" content="website">
<meta property="og:image" content="{SITE_URL}/assets/img/og.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="justclaims.eu. The claim notice will have a deadline. A grid of 96 cells, one for each hour of Article 7(4).">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#0C1716">
<meta name="robots" content="noindex">
<link rel="icon" href="assets/img/favicon.svg" type="image/svg+xml">
<link rel="preload" href="assets/fonts/b612-latin-700-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="assets/fonts/b612-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="assets/fonts/b612-mono-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="assets/site.css">{css}
<script>document.documentElement.className+=' js';</script>
</head>
<body class="p-{meta.get('nav', 'x')} {meta.get('cls', '')}" data-applies="{CL['applies']}" data-force="{CL['entersIntoForce']}" data-oj="{OJ}" data-built="{TODAY.isoformat()}">
{header(meta.get('nav', ''))}
<main id="main">
{body}
</main>
{FOOTER}
<script src="assets/site.js" defer></script>{js}
</body>
</html>'''

def render(name):
    src = open(os.path.join(HERE, 'pages', name), encoding='utf-8').read()
    m = re.match(r'\s*<!--(\{.*?\})-->\s*', src, re.S)
    meta = json.loads(m.group(1)); body = src[m.end():]
    body = (body.replace('{{AR}}', AR).replace('{{TBC}}', TBC).replace('{{CTA}}', CTA).replace('{{WING}}', WING).replace('{{LOGO}}', LOGO)
            .replace('{{CLOCKROWS}}', clockrows()).replace('{{RULERLIST}}', rulerlist()).replace('{{ANNEX}}', annex_html())
            .replace('{{DAYS}}', str(DAYS)).replace('{{YEARDIAL}}', year_dial()).replace('{{OJ}}', OJ).replace('{{FORCEDAYS}}', str((FORCE - TODAY).days)))
    for _ in range(3):
        body = re.sub(r'\{\{INC:([a-z0-9\-]+)\}\}', lambda mm: open(os.path.join(HERE, 'pages', '_parts', mm.group(1) + '.html'), encoding='utf-8').read(), body)
        body = (body.replace('{{AR}}', AR).replace('{{TBC}}', TBC).replace('{{WING}}', WING).replace('{{YEARDIAL}}', year_dial())
                .replace('{{CLOCKROWS}}', clockrows()).replace('{{RULERLIST}}', rulerlist()).replace('{{ANNEX}}', annex_html())
                .replace('{{DAYS}}', str(DAYS)).replace('{{OJ}}', OJ).replace('{{FORCEDAYS}}', str((FORCE - TODAY).days)).replace('{{NCLOCKS}}', str(len(CL['clocks']))))
    body = re.sub(r'\{\{SDIAL:(\d)\}\}', lambda mm: story_dial(int(mm.group(1))), body)
    _tr, _tc = chart_tables(); body = body.replace('{{CHARTRATE}}', chart_rate() + _tr).replace('{{CHARTCOURTS}}', chart_courts() + _tc)
    body = body.replace('{{HOURGRID}}', hour_grid()).replace('{{PHFIG}}', phfig(meta.get('fig')))
    body = body.replace('{{READYQS}}', readiness_qs()).replace('{{READYMAP}}', readiness_map())
    body = body.replace('{{CLOCKSJSON}}', '<script type="application/json" id="clocks-data">' + json.dumps({'clocks': CL['clocks'], 'quotes': CL['quotes'], 'applies': CL['applies'], 'force': CL['entersIntoForce']}, ensure_ascii=False).replace('</', '<\\/') + '</script>')
    body = body.replace('{{CTA}}', CTA)
    body = re.sub(r'\{\{LAW:([a-z0-9\-]+)\}\}', lambda mm: law(mm.group(1)), body)
    left = re.findall(r'\{\{[A-Z:a-z0-9\-]+\}\}', body)
    if left: raise SystemExit(f'{name}: unreplaced tokens {left}')
    return meta, page(meta, body)

if __name__ == '__main__':
    os.makedirs(os.path.join(OUT, 'assets', 'data'), exist_ok=True)
    shutil.copy(os.path.join(HERE, 'data', 'clocks.json'), os.path.join(OUT, 'assets', 'data', 'clocks.json'))
    only = os.environ.get('ONLY')
    built = []
    for f in sorted(glob.glob(os.path.join(HERE, 'pages', '*.html'))):
        name = os.path.basename(f)
        if only and name != only: continue
        meta, out = render(name)
        open(os.path.join(OUT, name), 'w', encoding='utf-8').write(out); built.append(name)
    print('built', len(built), 'pages', ', '.join(built), '| days to apply from', TODAY, '=', DAYS)
