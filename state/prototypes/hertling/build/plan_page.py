#!/usr/bin/env python3
"""Writes pages/presence.html, the growth plan for Noah. Astra's voice, English, deployed on its own site.
Every figure on the page comes from data/plan.json, and every chart is computed from it, never drawn by eye."""
import json
import os

HERE = os.path.dirname(os.path.abspath(__file__))
D = json.load(open(os.path.join(HERE, 'data', 'plan.json')))
AR = '<svg class="ar" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M2 8h11M9 3.5 13.5 8 9 12.5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>'
SITE = 'https://astra-hertling-prototype.netlify.app/'


def inc(name):
    return open(os.path.join(HERE, 'partials', name)).read()


def n(v):
    return f'{v:,}'


def market():
    rows = D['market']['rows']
    top = max(r['n'] for r in rows)
    out = []
    for r in rows:
        w = r['n'] / top * 100
        out.append(f'<li><span class="mk-l">{r["label"]}</span><span class="mk-b"><i style="--w:{w:.2f}%"></i></span><b>{n(r["n"])}</b></li>')
    return '<ul class="mk">' + ''.join(out) + '</ul>'


def rings():
    out = []
    for r in D['eurostat']:
        v = r['v']
        out.append(f'''<figure class="ring rv">
  <svg viewBox="0 0 120 120" aria-hidden="true" focusable="false"><circle class="rg-t" cx="60" cy="60" r="50" pathLength="100"/><circle class="rg-a" cx="60" cy="60" r="50" pathLength="100" style="--v:{v / 100:.4f}"/></svg>
  <b>{v:.1f}%</b>
  <figcaption>{r["text"]}<small>{r["src"]}</small></figcaption>
</figure>''')
    return '<div class="rings">' + ''.join(out) + '</div>'


def ratings():
    rows = D['ratings']['rows']
    out = []
    for r in rows:
        if r.get('none'):
            out.append(f'<li class="rt-you"><span>{r["name"]}</span><span class="rt-b"><i style="--w:0%"></i></span><b>{r["label"]}</b></li>')
        else:
            out.append(f'<li><span>{r["name"]}</span><span class="rt-b"><i style="--w:{r["stars"] / 5 * 100:.1f}%"></i></span><b>{r["stars"]:.1f}</b></li>')
    return '<ul class="rt">' + ''.join(out) + '</ul>'


def wall():
    cols = D['wall']['cols']
    yn = lambda v: f'<i class="{"y" if v else "n"}" role="cell" aria-label="{"yes" if v else "no"}"></i>'
    head = ''.join(f'<span role="columnheader"><span class="wh-l">{c}</span><span class="wh-s" aria-hidden="true">{k + 1}</span></span>' for k, c in enumerate(cols))
    key = '<ol class="wall-key" aria-hidden="true">' + ''.join(f'<li>{c}</li>' for c in cols) + '</ol>'
    rows = []
    for r in D['wall']['rows']:
        rows.append(f'<div class="wall-r" role="row"><span class="wa-n" role="rowheader">{r["name"]}</span>{"".join(yn(v) for v in r["v"])}</div>')
    you = ''.join(yn(v) for v in D['wall']['you'])
    tot = [sum(1 for r in D['wall']['rows'] if r['v'][k]) for k in range(len(cols))]
    tots = ''.join(f'<b role="cell">{t} of {len(D["wall"]["rows"])}</b>' for t in tot)
    return f'''<div class="wall" role="table" aria-label="{D["wall"]["title"]}">
  {key}
  <div class="wall-h" role="row"><span role="columnheader"><span class="sr">Firm</span></span>{head}</div>
  <div role="rowgroup">{''.join(rows)}</div>
  <div class="wall-t" role="row"><span role="rowheader">In total</span>{tots}</div>
  <div class="wall-you" role="row"><span class="wa-n" role="rowheader">Systemhaus<span class="brand-dash">-</span>Hertling, the new site</span>{you}</div>
</div>'''


def flow():
    out = []
    for i, s in enumerate(D['flow']):
        chips = ''.join(f'<li><span class="st-{c["s"]}">{"Built" if c["s"] == "built" else "Next"}</span>{c["t"]}</li>' for c in s['parts'])
        out.append(f'<li class="fl-s rv"><span class="fl-k">{i + 1:02d}</span><h3>{s["h"]}</h3><p>{s["p"]}</p><ul>{chips}</ul></li>')
    return '<ol class="fl">' + ''.join(out) + '</ol>'


def prices():
    out = []
    for p in D['prices']:
        out.append(f'<li><b>{p["price"]}</b><span>{p["what"]}</span><small>{p["who"]}</small></li>')
    return '<ul class="px">' + ''.join(out) + '</ul>'


def deadlines():
    dl = D['deadlines']
    out = []
    for i, it in enumerate(dl['items']):
        if it['s'] == 'next':
            out.append(f'<li class="dl-now" aria-label="Today, {dl["today"]}"><span></span><em>Today</em></li>')
        out.append(f'<li class="dl-{it["s"]}"><span class="dl-d">{it["date"]}</span><b>{it["h"]}</b><p>{it["p"]}</p></li>')
    return '<ol class="dl-l">' + ''.join(out) + '</ol>'


def roadmap():
    out = []
    for w in D['roadmap']:
        items = ''.join(f'<li>{t}</li>' for t in w['items'])
        out.append(f'<li class="rm-w rv"><span class="rm-when">{w["when"]}</span><h3>{w["h"]}</h3><ul>{items}</ul></li>')
    return '<ol class="rm">' + ''.join(out) + '</ol>'


def kpis():
    return '<ul class="kp">' + ''.join(f'<li class="rv"><b>{k["h"]}</b><span>{k["where"]}</span></li>' for k in D['kpis']) + '</ul>'


def areas():
    return '<ul class="ar-l">' + ''.join(f'<li><b>{a["town"]}</b><span>{a["note"]}</span></li>' for a in D['areas']) + '</ul>'


def page():
    c = D['cover']
    stats = ''.join(f'<li class="rv"><b>{s["n"]}</b><span>{s["t"]}</span><small>{s["src"]}</small></li>' for s in c['stats'])
    gp = inc('plan-gp.html')
    rc = inc('plan-rc.html')
    li = inc('plan-li.html')
    return f'''<!--{{"title": "[[Growth plan for Systemhaus-Hertling, by Astra||Growth plan for Systemhaus-Hertling, by Astra]]", "desc": "[[How Systemhaus-Hertling wins its first clients in Hamburg, from the first search to the first call. Prepared by Astra.||How Systemhaus-Hertling wins its first clients in Hamburg, from the first search to the first call. Prepared by Astra.]]", "nav": "", "path": "index.html", "bare": true, "body": "plan", "js": ["plan.js"]}}-->
<section class="pl-cover dk" data-tone="dark" lang="en" aria-labelledby="pl-h">
  <div class="pl-cover-aur" aria-hidden="true"><i></i><i></i></div>
  <div class="pl-in">
    <span class="lbl"><span>Growth plan · Systemhaus<span class="brand-dash">-</span>Hertling · October 2026</span></span>
    <h1 id="pl-h" class="d1" data-words>From the first search <span class="it">to the first call.</span></h1>
    <p class="lede rv">{c["lede"]}</p>
    <div class="pl-ctas rv"><a class="btn pri btn-lg" href="{SITE}">Open the new site{AR}</a><a class="btn glass btn-lg" href="#plan-90">The first 90 days</a></div>
    <ul class="pl-stats">{stats}</ul>
  </div>
</section>

<section class="pl-ch dk pl-today" data-tone="dark" lang="en" aria-labelledby="t-h">
  <div class="pl-in pl-two">
    <div>
      <span class="lbl rv">01 · Where you stand</span>
      <h2 id="t-h" class="d2" data-words>A clean start, <span class="it">with nothing to prove it yet.</span></h2>
      <p class="lede rv">{D["today"]["lede"]}</p>
      <ul class="pl-facts rv">{''.join(f'<li><b>{f["k"]}</b><span>{f["v"]}</span></li>' for f in D["today"]["facts"])}</ul>
    </div>
    <figure class="dev rv rv-d1">
      <div class="dev-desk"><img src="/media/plan/today-desktop.jpg" alt="The homepage of systemhaus-hertling.com, desktop" width="1440" height="900" loading="lazy"></div>
      <div class="dev-phone"><img src="/media/plan/today-phone.jpg" alt="The homepage of systemhaus-hertling.com, phone" width="390" height="844" loading="lazy"></div>
      <figcaption>systemhaus<span class="brand-dash">-</span>hertling.com, {D["today"]["shot_date"]}</figcaption>
    </figure>
  </div>
</section>

<section class="pl-ch pl-market dk" data-tone="dark" lang="en" aria-labelledby="m-h">
  <div class="pl-in">
    <span class="lbl rv">02 · The market</span>
    <h2 id="m-h" class="d2" data-words>Thousands of small firms. <span class="it">Three in four already buy their IT help in.</span></h2>
    <div class="pl-two pl-mk">
      <div class="rv">
        <h3 class="pl-sub">Businesses by size, 2024</h3>
        {market()}
        <p class="src">{D["market"]["src"]}</p>
      </div>
      <div class="rv rv-d1">
        <h3 class="pl-sub">German firms with 10 to 49 staff</h3>
        {rings()}
        <p class="src">{D["market"]["src2"]}</p>
      </div>
    </div>
    <p class="pl-read rv"><span>Our reading</span>{D["market"]["reading"]}</p>
    <div class="dl rv">
      <h3 class="pl-sub">Deadlines that make firms call</h3>
      {deadlines()}
      <p class="src">{D["deadlines"]["src"]}</p>
    </div>
    <p class="pl-read rv"><span>Why now</span>{D["deadlines"]["reading"]}</p>
  </div>
</section>

<section class="pl-ch pl-comp" data-tone="light" lang="en" aria-labelledby="c-h">
  <div class="pl-in">
    <span class="lbl rv">03 · The competition</span>
    <h2 id="c-h" class="d2" data-words>Every firm next to you on Google <span class="it">shows stars. You show none yet.</span></h2>
    <div class="pl-two pl-cmp">
      <div class="rv">
        <h3 class="pl-sub">{D["ratings"]["title"]}</h3>
        {ratings()}
        <p class="src">{D["ratings"]["src"]}</p>
      </div>
      <div class="rv rv-d1">
        <h3 class="pl-sub">{D["wall"]["title"]}</h3>
        {wall()}
        <p class="src">{D["wall"]["src"]}</p>
      </div>
    </div>
    <p class="pl-read rv"><span>The gap</span>{D["wall"]["gap"]}</p>
  </div>
</section>

<section class="pl-ch pl-pos dk" data-tone="dark" lang="en" aria-labelledby="p-h">
  <div class="pl-in">
    <span class="lbl rv">04 · Positioning</span>
    <h2 id="p-h" class="d2" data-words>The documented IT partner <span class="it">for small firms east of Hamburg.</span></h2>
    <p class="lede rv">{D["pos"]["lede"]}</p>
    <ol class="pos-g">{''.join(f'<li class="rv"><span class="fl-k">{i + 1:02d}</span><h3>{p["h"]}</h3><p>{p["p"]}</p></li>' for i, p in enumerate(D["pos"]["pillars"]))}</ol>
    <div class="pl-two pos-say rv">
      <div><h3 class="pl-sub">Say and show</h3><ul class="say">{''.join(f'<li>{t}</li>' for t in D["pos"]["say"])}</ul></div>
      <div><h3 class="pl-sub">Leave to the others</h3><ul class="say say-no">{''.join(f'<li>{t}</li>' for t in D["pos"]["avoid"])}</ul></div>
    </div>
    <p class="pl-conf rv">Proposed by Astra. The wording is yours to confirm.</p>
  </div>
</section>

<section class="pl-ch pl-flow" data-tone="light" lang="en" aria-labelledby="f-h">
  <div class="pl-in">
    <span class="lbl rv">05 · The journey</span>
    <h2 id="f-h" class="d2" data-words>Six steps from a search <span class="it">to a client who sends the next one.</span></h2>
    {flow()}
  </div>
</section>

<section class="pl-ch pl-site dk" data-tone="dark" lang="en" aria-labelledby="s-h">
  <div class="pl-in">
    <span class="lbl rv">06 · The website</span>
    <h2 id="s-h" class="d2" data-words>Built to turn a visit <span class="it">into a conversation.</span></h2>
    <p class="lede rv">{D["site"]["lede"]}</p>
    <div class="site-g">
      {''.join(f'<figure class="site-f rv"><div class="site-shot"><img src="/media/plan/{f["img"]}" alt="{f["alt"]}" width="1440" height="900" loading="lazy"></div><figcaption><b>{f["h"]}</b>{f["p"]}</figcaption></figure>' for f in D["site"]["shots"])}
    </div>
    <div class="pl-ctas rv"><a class="btn pri btn-lg" href="{SITE}">Open the new site{AR}</a></div>
  </div>
</section>

<section class="pl-ch pl-local" data-tone="light" lang="en" aria-labelledby="l-h">
  <div class="pl-in pl-two">
    <div>
      <span class="lbl rv">07 · Local search</span>
      <h2 id="l-h" class="d2" data-words>Be the IT firm for Glinde, <span class="it">not just for Hamburg.</span></h2>
      <p class="lede rv">{D["local"]["lede"]}</p>
      {areas()}
      <p class="src rv">{D["local"]["src"]}</p>
    </div>
    <figure class="phone pl-area rv rv-d1" aria-label="Sketch of an area page on the phone">
      <div class="ph-scr lt">
        <div class="ar-top"><span class="ar-mk"></span><span>Systemhaus<span class="brand-dash">-</span>Hertling</span></div>
        <div class="ar-hero"><span class="ar-lbl">[[IT Betreuung in Glinde||IT care in Glinde]]</span><b>[[Ihre IT läuft. Auch in Glinde.||Your IT keeps running. In Glinde too.]]</b><p>[[Vor Ort aus Reinbek, per Fernwartung sofort. Ein fester Ansprechpartner, jede Änderung dokumentiert.||On site from Reinbek, remote straight away. One person to call, every change written down.]]</p><span class="ar-btn">[[Kennenlerngespräch vereinbaren||Book a first conversation]]</span></div>
        <ul class="ar-list"><li>[[Netzwerk und WLAN||Network and wireless]]</li><li>[[Support und Wartung||Support and maintenance]]</li><li>Cloud</li><li>[[Sicherheit und Backup||Security and backup]]</li></ul>
      </div>
      <figcaption>Sketch of the Glinde page</figcaption>
    </figure>
  </div>
</section>

<section class="pl-ch pl-google dk" data-tone="dark" lang="en" aria-labelledby="g-h">
  <div class="pl-in pl-two">
    <div>
      <span class="lbl rv">08 · Google and reviews</span>
      <h2 id="g-h" class="d2" data-words>Every finished job <span class="it">asks for a review.</span></h2>
      <p class="lede rv">{D["google"]["lede"]}</p>
      <ol class="pr-list rv">{''.join(f'<li>{t}</li>' for t in D["google"]["list"])}</ol>
      <div class="pl-rc rv">{rc}</div>
      <p class="pr-try rv">The code on the card works. Scan it with your phone.</p>
    </div>
    <div class="rv rv-d1">{gp}</div>
  </div>
</section>

<section class="pl-ch pl-li" data-tone="light" lang="en" aria-labelledby="li-h">
  <div class="pl-in">
    <span class="lbl rv">09 · LinkedIn</span>
    <h2 id="li-h" class="d2" data-words>People check the person, <span class="it">so the posts come from you.</span></h2>
    <p class="lede rv">{D["li"]["lede"]}</p>
    <div class="li rv" aria-label="Sketch of three LinkedIn posts from Noah's profile">{li}</div>
    <p class="pl-conf rv">The sample posts are in German. The switch at the top shows them in English.</p>
  </div>
</section>

<section class="pl-ch pl-offer dk" data-tone="dark" lang="en" aria-labelledby="o-h">
  <div class="pl-in">
    <span class="lbl rv">10 · Offer and worth</span>
    <h2 id="o-h" class="d2" data-words>A first step that's easy to say yes to, <span class="it">and care that keeps paying.</span></h2>
    <ol class="lad">{''.join(f'<li class="rv"><span class="fl-k">{i + 1:02d}</span><h3>{o["h"]}</h3><p>{o["p"]}</p><small>{o["s"]}</small></li>' for i, o in enumerate(D["offer"]))}</ol>
    <div class="pl-two pl-calc">
      <div class="rv">
        <h3 class="pl-sub">What Hamburg firms publish</h3>
        {prices()}
        <p class="src">{D["prices_src"]}</p>
      </div>
      <form class="calc rv rv-d1" data-calc aria-label="What ongoing care could add up to" onsubmit="return false">
        <h3 class="pl-sub">What ongoing care could add up to</h3>
        <label>Clients on ongoing care <output data-o="c">10</output><input type="range" min="1" max="30" step="1" value="10" data-i="c"></label>
        <label>Workstations per client <output data-o="w">10</output><input type="range" min="2" max="40" step="1" value="10" data-i="w"></label>
        <label>Euros per workstation, per month <output data-o="p">50 €</output><input type="range" min="15" max="90" step="1" value="50" data-i="p"></label>
        <div class="calc-out"><div><span>A month</span><b data-o="m">5,000 €</b></div><div><span>A year</span><b data-o="y">60,000 €</b></div></div>
        <p class="calc-note">Sample figures you can move. 50 € is where hagel IT's managed care starts, used only as a starting point. Your prices are yours to set.</p>
      </form>
    </div>
  </div>
</section>

<section class="pl-ch pl-90" id="plan-90" data-tone="light" lang="en" aria-labelledby="r-h">
  <div class="pl-in">
    <span class="lbl rv">11 · The first 90 days</span>
    <h2 id="r-h" class="d2" data-words>Twelve weeks, <span class="it">four steps, one goal.</span></h2>
    {roadmap()}
    <h3 class="pl-sub pl-kph rv">What we'd measure, every month</h3>
    {kpis()}
  </div>
</section>

<section class="pl-ch pl-team dk" data-tone="dark" lang="en" aria-labelledby="w-h">
  <div class="pl-in">
    <span class="lbl rv">12 · The team</span>
    <h2 id="w-h" class="d2" data-words>Astra, <span class="it">one team with Amwisesa.</span></h2>
    <p class="lede rv">{D["team"]["lede"]}</p>
    <p class="brands rv">{D["team"]["brands"]}</p>
    <p class="src rv">{D["team"]["disclosure"]}</p>
    <div class="ppl">{''.join(f'<div class="pp rv"><b>{p["name"]}</b><span class="pp-r">{p["role"]}</span><p>{p["bio"]}</p><a href="{p["li"]}" rel="noopener">LinkedIn</a></div>' for p in D["team"]["people"])}</div>
  </div>
</section>

<section class="pl-end" data-tone="light" lang="en" aria-labelledby="e-h">
  <div class="bk-aur" aria-hidden="true"><i></i><i></i><i></i></div>
  <div class="pl-in">
    <span class="lbl rv">Next step</span>
    <h2 id="e-h" class="d1" data-words>Give us <span class="it">thirty minutes.</span></h2>
    <p class="lede rv">{D["end"]["lede"]}</p>
    <div class="pl-ctas rv"><a class="btn pri btn-lg" href="{SITE}">Open the new site{AR}</a><a class="btn sec btn-lg" href="mailto:rifqiraka234@gmail.com?subject=Hertling%20growth%20plan">Email me</a></div>
    <p class="pl-foot">{D["end"]["foot"]}</p>
  </div>
</section>
'''


if __name__ == '__main__':
    open(os.path.join(HERE, 'pages', 'presence.html'), 'w').write(page())
    print('wrote pages/presence.html')
