"""Gantt preview and Mermaid source, generated from items.json.

    python3 items.py && python3 gantt.py

Writes gantt-preview.html (open in a browser, or screenshot it) and gantt.mmd.
The preview is the reference for Josh's build, the spec is section 6 of the brief.
"""
import datetime as dt
import html
import json
import os

HERE = os.path.dirname(os.path.abspath(__file__))
data = json.load(open(os.path.join(HERE, 'items.json')))
items = data['items']
menus = data['set_menus']

T0, T1 = dt.date(2026, 10, 1), dt.date(2027, 10, 1)
LABEL_W, PX_DAY, ROW, BAR = 290, 2.6, 26, 14
W = LABEL_W + int((T1 - T0).days * PX_DAY) + 20
COL = dict(bg='#001d11', ink='#e9f2ec', ink2='#a9bdb1', grid='rgba(255,255,255,0.08)', fill='#27a150',
           outline='#8a9a90', band='rgba(233,242,236,0.07)', hatch='rgba(233,242,236,0.16)', brk='rgba(255,255,255,0.035)')


def x(s):
    day = dt.date.fromisoformat(s) if isinstance(s, str) else s
    return LABEL_W + (day - T0).days * PX_DAY


def esc(s):
    return html.escape(s, quote=True)


rows = []  # (kind, payload)
rows.append(('head', 'Your milestones'))
for ms in data['milestones']:
    rows.append(('ms', ms))
for m in menus:
    rows.append(('head', f"{m['name']}  ·  €{m['price_eur']:,}  ·  {m['when']}"))
    for c in m['items']:
        rows.append(('item', next(i for i in items if i['code'] == c)))
timed = [i for i in items if not i['set_menu'] and i['windows']]
rows.append(('head', 'À la carte, with a timing reason'))
for i in sorted(timed, key=lambda i: i['windows'][0]['start']):
    rows.append(('item', i))
anytime = [i for i in items if not i['set_menu'] and not i['windows']]

TOP = 40
H = TOP + len(rows) * ROW + 30
svg = [f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}" role="img" '
       f'aria-label="Timeline of every part, October 2026 to September 2027">']
svg.append(f'<rect width="{W}" height="{H}" fill="{COL["bg"]}"/>')
svg.append('<defs><pattern id="hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">'
           f'<line x1="0" y1="0" x2="0" y2="6" stroke="{COL["ink2"]}" stroke-width="2"/></pattern></defs>')
svg.append(f'<rect x="{x("2026-12-21")}" y="{TOP - 6}" width="{x("2027-01-04") - x("2026-12-21")}" height="{H - TOP - 18}" fill="{COL["brk"]}"/>')
svg.append(f'<text x="{(x("2026-12-21") + x("2027-01-04")) / 2}" y="{H - 10}" fill="{COL["ink2"]}" font-size="10" text-anchor="middle">Break</text>')
m = T0
while m < T1:
    nm = dt.date(m.year + (m.month == 12), m.month % 12 + 1, 1)
    svg.append(f'<line x1="{x(m)}" y1="{TOP - 16}" x2="{x(m)}" y2="{H - 24}" stroke="{COL["grid"]}"/>')
    lab = m.strftime('%b') + (f' {m.year}' if m.month in (1, 10) else '')
    svg.append(f'<text x="{(x(m) + x(nm)) / 2}" y="{TOP - 20}" fill="{COL["ink2"]}" font-size="11" text-anchor="middle">{lab}</text>')
    m = nm
y = TOP
for kind, p in rows:
    if kind == 'head':
        svg.append(f'<text x="16" y="{y + 18}" fill="{COL["ink"]}" font-size="12.5" font-weight="700">{esc(p)}</text>')
        svg.append(f'<line x1="16" y1="{y + 24}" x2="{W - 10}" y2="{y + 24}" stroke="{COL["grid"]}"/>')
    elif kind == 'ms':
        ms = p
        svg.append(f'<text x="16" y="{y + 17}" fill="{COL["ink2"]}" font-size="11.5">{esc(ms["name"])}</text>')
        tip = f"{ms['name']}, {ms['start']}" + (f" to {ms['end']}" if ms['end'] else '') + f", source {ms['source']}"
        if ms['end']:
            x0, x1 = x(ms['start']), x(ms['end']) + PX_DAY
            svg.append(f'<rect x="{x0 + 0.75}" y="{y + (ROW - BAR) / 2 + 0.75}" width="{x1 - x0 - 1.5}" height="{BAR - 1.5}" rx="4" '
                       f'fill="url(#hatch)" stroke="{COL["ink2"]}" stroke-width="1.5"><title>{esc(tip)}</title></rect>')
        else:
            cx, cy = x(ms['start']), y + ROW / 2
            svg.append(f'<path d="M{cx} {cy - 7} l7 7 l-7 7 l-7 -7 z" fill="{COL["ink"]}"><title>{esc(tip)}</title></path>')
    else:
        i = p
        svg.append(f'<text x="16" y="{y + 17}" fill="{COL["ink2"]}" font-size="11.5">'
                   f'<tspan fill="{COL["ink"]}" font-weight="600">{i["code"]}</tspan>  {esc(i["name"])}</text>')
        for w in i['windows']:
            x0, x1 = x(w['start']), x(w['end']) + PX_DAY
            tip = f"{i['code']} {i['name']}, {w['start']} to {w['end']}, {i['days']} days, €{i['price_eur']:,}"
            if i['set_menu']:
                svg.append(f'<rect x="{x0}" y="{y + (ROW - BAR) / 2}" width="{x1 - x0}" height="{BAR}" rx="4" fill="{COL["fill"]}"><title>{esc(tip)}</title></rect>')
            else:
                svg.append(f'<rect x="{x0 + 0.75}" y="{y + (ROW - BAR) / 2 + 0.75}" width="{x1 - x0 - 1.5}" height="{BAR - 1.5}" rx="4" fill="none" '
                           f'stroke="{COL["outline"]}" stroke-width="1.5"><title>{esc(tip)}</title></rect>')
    y += ROW
svg.append('</svg>')

legend = (f'<div class="lg"><span><i class="f"></i>In a set menu</span><span><i class="o"></i>À la carte, suggested timing</span>'
          f'<span><i class="h"></i>Your milestones</span><span><b class="dm">◆</b>A date</span><span>Dates assume we start on Monday 12 October 2026</span></div>')
anyl = '<p class="any">Any time, no timing reason. ' + ', '.join(f"{i['code']} {esc(i['name'])}" for i in anytime) + '.</p>'
page = f'''<!doctype html><html lang="en"><head><meta charset="utf-8"><title>HotGreen timeline preview</title>
<style>body{{margin:0;background:{COL["bg"]};color:{COL["ink"]};font:14px/1.4 "DM Sans",system-ui,sans-serif}}
.wrap{{padding:24px 28px}} h1{{font:600 26px/1.2 "Space Grotesk",system-ui,sans-serif;margin:0 0 6px}}
.lg{{display:flex;gap:22px;flex-wrap:wrap;color:{COL["ink2"]};font-size:12.5px;margin:10px 0 14px}}
.lg i{{display:inline-block;width:22px;height:10px;border-radius:3px;margin-right:7px;vertical-align:-1px}}
.lg .f{{background:{COL["fill"]}}} .lg .o{{border:1.5px solid {COL["outline"]}}}
.lg .h{{border:1.5px solid {COL["ink2"]};background:repeating-linear-gradient(45deg,{COL["ink2"]} 0 1.5px,transparent 1.5px 4px)}} .lg .dm{{margin-right:7px}}
.sc{{overflow-x:auto}} .any{{color:{COL["ink2"]};font-size:12.5px;max-width:1100px}}</style></head>
<body><div class="wrap"><h1>When each part fits.</h1>{legend}<div class="sc">{"".join(svg)}</div>{anyl}</div></body></html>'''
open(os.path.join(HERE, 'gantt-preview.html'), 'w').write(page)

# Mermaid, for a quick look in any Markdown viewer. Code, so its colons are syntax, not copy.
mm = ['gantt', '    title HotGreen, when each part fits', '    dateFormat YYYY-MM-DD', '    axisFormat %b %y']
for mnu in menus:
    mm.append(f"    section {mnu['name']}")
    for c in mnu['items']:
        i = next(i for i in items if i['code'] == c)
        for k, w in enumerate(i['windows']):
            mm.append(f"    {i['code']} {i['name'].replace(':', '')} :{i['code'].lower()}{k}, {w['start']}, {w['end']}")
mm.append('    section A la carte')
for i in sorted(timed, key=lambda i: i['windows'][0]['start']):
    w = i['windows'][0]
    mm.append(f"    {i['code']} {i['name']} :done, {i['code'].lower()}, {w['start']}, {w['end']}")
mm.append('    section Your milestones')
for n, ms in enumerate(data['milestones']):
    if ms['end']:
        mm.append(f"    {ms['name']} :crit, ms{n}, {ms['start']}, {ms['end']}")
    else:
        mm.append(f"    {ms['name']} :milestone, ms{n}, {ms['start']}, 0d")
open(os.path.join(HERE, 'gantt.mmd'), 'w').write('\n'.join(mm) + '\n')
print('rows', len(rows), 'svg', W, 'x', H, 'anytime', len(anytime))
