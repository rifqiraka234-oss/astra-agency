"""Builds the brief for Josh from brief_template.md and items.json, then checks every copy block.

    python3 items.py && python3 gantt.py && python3 build_brief.py

Writes ../BRIEF-FOR-JOSH-merged-proposal.md. Exits non zero if any copy block breaks the writing rules.
"""
import ast
import datetime as dt
import json
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
from items import copy_problems  # noqa: E402

data = json.load(open(os.path.join(HERE, 'items.json')))
items, menus = data['items'], data['set_menus']
byc = {i['code']: i for i in items}
MN = dict(zip(range(1, 13), 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec'.split()))


def span(w):
    a, b = dt.date.fromisoformat(w['start']), dt.date.fromisoformat(w['end'])
    if a.year == b.year and a.month == b.month:
        return f'{a.day} to {b.day} {MN[a.month]} {a.year}'
    if a.year == b.year:
        return f'{a.day} {MN[a.month]} to {b.day} {MN[b.month]} {a.year}'
    return f'{a.day} {MN[a.month]} {a.year} to {b.day} {MN[b.month]} {b.year}'


def months(i):
    if not i['windows']:
        return 'Any time'
    a = dt.date.fromisoformat(i['windows'][0]['start'])
    b = dt.date.fromisoformat(i['windows'][-1]['end'])
    if (a.year, a.month) == (b.year, b.month):
        return f'{MN[a.month]} {a.year}'
    if a.year == b.year:
        return f'{MN[a.month]} to {MN[b.month]} {a.year}'
    return f'{MN[a.month]} {a.year} to {MN[b.month]} {b.year}'


def eur(n):
    return 'Free' if n == 0 else f'€{n:,}'


menu_name = {m['id']: m['name'] for m in menus}

out = []
for f in data['families']:
    out.append(f"**{f['letter']}. {f['name']}.** {f['line']}\n")
    out.append('| Code | Item | Days | Price | When | Set menu | Concept | From |')
    out.append('|---|---|---|---|---|---|---|---|')
    for i in [i for i in items if i['family'] == f['letter']]:
        when = '; '.join(span(w) for w in i['windows']) or 'Any time'
        links = ', '.join(f"[{l['label']}]({l['url']})" for l in i['links']) or 'Idea'
        out.append(f"| {i['code']} | {i['name']} | {i['days'] or ''} | {eur(i['price_eur'])} | {when} | "
                   f"{menu_name.get(i['set_menu'], 'À la carte')} | {links} | {i['origin']} |")
    out.append('')
ITEMS_TABLE = '\n'.join(out)

out = ['| Set menu | For | When | Items | Days | Price |', '|---|---|---|---|---|---|']
for m in menus:
    out.append(f"| {m['name']}{' (recommended start)' if m['recommended'] else ''} | {m['for_whom']} | {m['when']} | "
               f"{', '.join(m['items'])} | {m['days']} | €{m['price_eur']:,} |")
out.append('')
out.append('The line under each set menu name.\n')
out.append('```copy')
for m in menus:
    out.append(m['name'])
    out.append(m['for_whom'] + '. ' + m['when'] + '.')
    out.append(m['line'])
    out.append('€{:,}'.format(m['price_eur']))
out.append('```')
MENUS_TABLE = '\n'.join(out)

out = ['```copy']
for mo in data['monthly']:
    out.append(f"{mo['name']}, €{mo['eur_per_month']:,} a month")
    out.append(re.sub(r'\s*\((C8|E5)\)', '', mo['what']))
out.append('```')
MONTHLY_TABLE = '\n'.join(out)

out = []
for f in data['families']:
    out.append(f"### {f['letter']}. {f['name']}\n")
    for i in [i for i in items if i['family'] == f['letter']]:
        cost = 'Free' if i['price_eur'] == 0 else f"{i['days']} days, {eur(i['price_eur'])}"
        out.append(f"**{i['code']} {i['name']}**. {cost}, {months(i)}"
                   f"{', in ' + menu_name[i['set_menu']] if i['set_menu'] else ', à la carte'}.")
        out.append('```copy')
        out.append(i['name'])
        out.append(i['what'])
        out.append('What you get')
        out.append(i['get'])
        out.append('What changes')
        out.append(i['changes'])
        out.append('```')
        if i['note_for_josh']:
            out.append(f"Note for you, not for the page. {i['note_for_josh']}")
        out.append('')
ITEM_COPY = '\n'.join(out)

MERMAID = open(os.path.join(HERE, 'gantt.mmd')).read().rstrip('\n')

src = open(os.path.join(HERE, '..', 'web', 'build.py')).read()
tree = ast.parse(src)
lists = {}
for node in tree.body:
    if isinstance(node, ast.Assign) and isinstance(node.targets[0], ast.Name) and node.targets[0].id in ('FIXES_LEGAL', 'FIXES_REST'):
        lists[node.targets[0].id] = ast.literal_eval(node.value)
fx = ['```copy', 'Twelve fixes for your website, two of them legal.', 'Two that are legal requirements']
n = 1
for t, p in lists['FIXES_LEGAL']:
    fx += [f'{n:02d} {t}', p]
    n += 1
fx.append('The rest')
for t, p in lists['FIXES_REST']:
    fx += [f'{n:02d} {t}', p]
    n += 1
fx.append('```')
assert n - 1 == 12
FIXES = '\n'.join(fx)

tpl = open(os.path.join(HERE, 'brief_template.md')).read()
for k, v in dict(ITEMS_TABLE=ITEMS_TABLE, MENUS_TABLE=MENUS_TABLE, MONTHLY_TABLE=MONTHLY_TABLE,
                 ITEM_COPY=ITEM_COPY, MERMAID=MERMAID, FIXES=FIXES).items():
    assert tpl.count('{{' + k + '}}') == 1, k
    tpl = tpl.replace('{{' + k + '}}', v)
assert '{{' not in tpl

# curly apostrophes inside copy blocks, the way the approved page writes them
def curl(block):
    return re.sub(r"(\w)'(\w)", '\\1’\\2', block)
tpl = re.sub(r'```copy\n(.*?)```', lambda m: '```copy\n' + curl(m.group(1)) + '```', tpl, flags=re.S)

# check every copy block
bad = []
blocks = re.findall(r'```copy\n(.*?)```', tpl, flags=re.S)
lines = [l for b in blocks for l in b.split('\n') if l.strip()]
QUOTED_OK = ('climate-tech',)  # inside Georgia's verbatim quote, only in Appendix A, not a copy block
for l in lines:
    p = copy_problems(l)
    if p:
        bad.append((p, l))
text = '\n'.join(lines)
contr = len(re.findall(r"\b\w+’(s|t|re|ll|ve|d|m)\b", text))
print('copy blocks', len(blocks), 'lines', len(lines), 'words', len(re.findall(r'\w+', text)), 'contractions', contr)
for b in bad:
    print('COPY PROBLEM', b)
dst = os.path.join(HERE, '..', 'BRIEF-FOR-JOSH-merged-proposal.md')
open(dst, 'w').write(tpl)
print('wrote', os.path.relpath(dst, HERE), len(tpl), 'chars')
sys.exit(1 if bad else 0)
