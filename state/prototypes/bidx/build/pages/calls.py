"""/calls/, every competition on the Innovation Funding Service, and a page for each, in Innovate UK's own words."""
import re
from html import escape as esc

from .common import load_calls, days_left, fdate, sdate, odds, SIZE, LEAD, THEME, short_name, STARTUP, board

GUIDE_FOR = {2599: 'bridgeai-deployment-catalyst', 2598: 'bridgeai-deployment-catalyst', 2597: 'bridgeai-deployment-catalyst',
             2595: 'investor-partnerships', 2580: 'investor-partnerships'}


def _key(t):
    return re.sub(r'[^a-z0-9]', '', t.lower())


def lines(xs):
    """The brief's lines as HTML. Bullets become a list, and a bullet that repeats a sentence already shown is dropped."""
    out, seen, items = '', set(), []
    for x in (x.strip() for x in xs if x.strip()):
        k = _key(x.lstrip('- '))
        if k in seen or any(k and k in o for o in seen):
            continue
        seen.add(k)
        if x.startswith('- '):
            items.append(f'<li>{esc(x[2:].strip())}</li>')
            continue
        if items:
            out += '<ul>' + ''.join(items) + '</ul>'
            items = []
        out += f'<p>{esc(x)}</p>'
    if items:
        out += '<ul>' + ''.join(items) + '</ul>'
    return out


def board_page(B, calls):
    rows = ''
    for c in sorted(calls, key=lambda c: c['closes']):
        d = days_left(c['closes'])
        cls = 'now' if d <= 7 else ('soon' if d <= 21 else '')
        o = odds(c)
        tags = f'{c["lead"]} {c["theme"]}' + (' startup' if c['id'] in STARTUP else '')
        rows += (f'<tr data-tags="{tags}"><td><a href="/calls/{c["slug"]}/">{esc(c["name"])}</a><small>{esc(SIZE[c["id"]])}</small></td>'
                 f'<td class="hide-s">{LEAD[c["lead"]]}<small>{THEME[c["theme"]] if THEME[c["theme"]] != LEAD[c["lead"]] else ""}</small></td><td class="hide-s">{str(o) + "%" if o else "Not stated"}</td>'
                 f'<td class="{cls}" data-close="{c["closes"]}"><span class="dotf dl-n">{d:02d}</span><small>{sdate(c["closes"])}, 11am</small></td></tr>')
    body = f'''<section class="ghero"><div class="wrap hero-g" style="align-items:end">
  <div><h1 class="h-l">Every Innovate UK call open now.</h1>
  <p class="lede">{len(calls)} competitions on the Innovation Funding Service today, nearest deadline first. Each one links to a page with its rules, as Innovate UK wrote them.</p></div>
  <div>{board(calls, n=4, title="Closing soonest for startups")}</div>
</div></section>
<section class="sec tight"><div class="wrap">
  <div class="filters" data-filter="ctab" data-empty="ctab-empty">
    <div class="tabs" role="group" aria-label="Filter calls"><button type="button" data-tag="all" aria-pressed="true">All</button><button type="button" data-tag="startup" aria-pressed="false">For startups</button><button type="button" data-tag="sme" aria-pressed="false">SME can lead</button><button type="button" data-tag="ai" aria-pressed="false">AI</button><button type="button" data-tag="battery" aria-pressed="false">Batteries</button><button type="button" data-tag="bio" aria-pressed="false">Engineering biology</button><button type="button" data-tag="health" aria-pressed="false">Health</button></div>
    <label class="sr" for="ctab-q">Search calls</label><input id="ctab-q" type="search" placeholder="Search by name or sector">
    <span class="count"></span>
  </div>
  <table class="ctable"><thead><tr><th>Call</th><th class="hide-s">Who can lead</th><th class="hide-s">Odds</th><th>Days left</th></tr></thead><tbody id="ctab">{rows}</tbody></table>
  <p id="ctab-empty" hidden style="margin-top:16px">No call matches that filter. <a href="/fit/">Check your fit</a> and we&rsquo;ll match you instead.</p>
  <p class="small" style="margin-top:18px">Read from the Innovation Funding Service on 20 October 2026. Every call closes at 11am UK time. The EIC Accelerator takes short proposals any time, batched on the first Tuesday of each month, and Innovation Loans are paused until January 2027.</p>
</div></section>'''
    return B.page('Innovate UK calls open now | BidX', 'Every Innovate UK competition open on the Innovation Funding Service, with closing dates, sizes, odds and who can lead.',
                  '/calls/', body, cur='/calls/')


def call_page(B, c):
    d = days_left(c['closes'])
    o = odds(c)
    guide = GUIDE_FOR.get(c['id'])
    rows = [('Opens', esc(c['opens_text'])), ('Closes', esc(c['closes_text']) + ' UK time'), ('Funding type', esc(c['type']))]
    if c['size']:
        rows.append(('Project size', lines(c['size'])))
    if c['duration']:
        rows.append(('Length', lines(c['duration'])))
    if c['rates']:
        rows.append(('Grant rates', lines(c['rates'])))
    rows.append(('Who can apply', lines(c['who'].split('\n'))))
    if c['odds']:
        rows.append(('Chance of success', esc(c['odds'])))
    if c['questions']:
        rows.append(('Questions', f'{c["questions"]} in the application'))
    kv = ''.join(f'<dt>{esc(a)}</dt><dd>{b}</dd>' for a, b in rows)
    keep = lambda t: re.sub(r'\s*Find out more about[^.]*\.', '', t.replace(' .', '.')).strip()
    assess = ''.join(f'<p>{esc(keep(a))}</p>' for a in c['assess'] if not a.startswith('-') and keep(a))
    assess = f'<blockquote class="fq">{assess}<cite>Innovate UK, the competition brief</cite></blockquote>' if assess else ''
    pot = ''.join(f'<p>{esc(p)}</p>' for p in c['pot'] if _key(p) != _key(c['summary']))
    pot = f'<h3>The funding</h3><blockquote class="fq">{pot}<cite>Innovate UK, the competition brief</cite></blockquote>' if pot else ''
    side = (f'<div class="callout">{B.glyph("ggggggga", "big")}<div><b>There&rsquo;s a guide for this call</b><p><a href="/guides/{guide}/">Read the guide</a>, who should apply, the money worked through and where points go.</p></div></div>' if guide else '')
    body = f'''<section class="ghero"><div class="wrap">
  <div class="crumbs"><a href="/calls/">Open calls</a><span aria-hidden="true">/</span><span>{esc(short_name(c))}</span></div>
  <h1 class="h-l" style="max-width:980px">{esc(c["name"])}</h1>
  <p class="lede">{esc(c["summary"])}</p>
  <div class="gmeta"><span>{LEAD[c["lead"]]} can lead</span><span>{THEME[c["theme"]]}</span><span>{c["status"]}</span></div>
  <div class="facts-b">
    <div data-close="{c["closes"]}"><b class="dl-n">{d:02d}</b><span class="dl-u">days left</span></div>
    <div><b>{sdate(c["closes"])}</b><span>closes at 11am UK time</span></div>
    <div><b>{str(o) + "%" if o else "None"}</b><span>{"Innovate UK&rsquo;s stated odds" if o else "odds stated for this call"}</span></div>
    <div><b>{c["questions"] or "None"}</b><span>{"questions in the application" if c["questions"] else "question count given"}</span></div>
  </div>
</div></section>
<div class="wrap art">
<nav class="toc" aria-label="On this page"><b>On this page</b><a href="#rules">The rules</a><a href="#scoring">How it&rsquo;s scored</a><a href="#next">Next step</a></nav>
<article class="prose">
<h2 id="rules">The rules, in Innovate UK&rsquo;s words</h2>
<dl class="kv">{kv}</dl>
{pot}
{side}
<h2 id="scoring">How it&rsquo;s scored</h2>
{assess or "<p>The brief sets out the assessment process on the Innovation Funding Service.</p>"}
<h2 id="next">Next step</h2>
<p>Read the full brief before you start. It has the scope, the eligible costs and the dates for the briefing events.</p>
<p><a class="btn sec" href="{c["url"]}">The brief on the Innovation Funding Service {B.ICON["ext"]}</a></p>
<div class="endcta"><h2>Is this your call?</h2><p>On a free funding call we&rsquo;ll check it against your roadmap, show you where applications like yours usually lose points, and tell you straight if it&rsquo;s not worth it this round.</p>
<div class="ctas" style="margin-top:20px"><a class="btn pri" href="{B.BOOK}">Book FREE funding call</a><a class="btn sec" href="/fit/">Check your fit</a></div></div>
<p class="srcs">Taken from <a href="{c["url"]}">the competition page</a> on the Innovation Funding Service, read on 20 October 2026. Content there is under the Open Government Licence v3.0.</p>
</article></div>'''
    return B.page(f'{short_name(c)}, closes {sdate(c["closes"])} | BidX', f'{c["summary"][:150]}', f'/calls/{c["slug"]}/', body, cur='/calls/')


def build(B):
    calls = load_calls()
    out = [('calls/index.html', board_page(B, calls))]
    for c in calls:
        out.append((f'calls/{c["slug"]}/index.html', call_page(B, c)))
    return out
