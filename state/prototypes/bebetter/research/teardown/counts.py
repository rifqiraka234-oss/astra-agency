#!/usr/bin/env python3
"""Every count in TEARDOWN.md, recomputed from fingerprints.jsonl alone (BeBetter, 2026-10-25).

    python3 -I counts.py > counts.txt

Groups: client, gym, street, custom, motion. 'rendered' = the page was reached and read (not walled, unreached or
replaced). Visual counts use rows whose frames were read (state ok, partial or onescreen_scroller); DOM counts use
every rendered row.
"""
import json, os, statistics as st
from collections import Counter
D = os.path.dirname(os.path.abspath(__file__))
rows = [json.loads(l) for l in open(os.path.join(D, 'fingerprints.jsonl'))]
G = ['client', 'gym', 'street', 'custom', 'motion']
names = lambda rs: ', '.join(r['slug'] for r in rs)
S = lambda r: r['visual'].get('state')
print('# 1. counts')
print('rows', len(rows), dict(Counter(r['cat'] for r in rows)))
for st_ in ['walled', 'unreached', 'replaced']:
    rs = [r for r in rows if S(r) == st_]; print(st_, len(rs), [(r['slug'], r.get('status'), (r.get('title') or '')[:30], (r.get('err') or '')[:40]) for r in rs])
rend = [r for r in rows if S(r) not in ('walled', 'unreached', 'replaced')]
print('rendered', len(rend), dict(Counter(r['cat'] for r in rend)))
print('rendered, not client', len([r for r in rend if r['cat'] != 'client']))
print('states among rendered', dict(Counter(S(r) for r in rend)))
for st_ in ['obscured', 'render_fail', 'intro', 'onescreen_scroller', 'partial']:
    print(' ', st_, names([r for r in rend if S(r) == st_]))
print('replacements', [(r['replaces']['url'], '->', r['url']) for r in rows if r.get('replaces')])
print('pass', dict(Counter(r.get('pass') for r in rows)))
vis = [r for r in rend if S(r) in ('ok', 'partial', 'onescreen_scroller') and r['cat'] != 'client']
print(f'\n# 2. visual tags, non-client rows with read frames n={len(vis)}')
for g in G[1:] + ['all']:
    rs = [r for r in vis if g == 'all' or r['cat'] == g]
    if not rs: continue
    v = [r['visual'] for r in rs]
    k = lambda key: (sum(bool(x.get(key)) for x in v), names([r for r in rs if r['visual'].get(key)]))
    print(f'## {g} n={len(rs)}')
    for key in ['people', 'back', 'ugc', 'ticker', 'poster', 'countdown', 'dark', 'promo_modal']:
        n, who = k(key); print(f'  {key:<12} {n:>2}  {who}')
    print('  layout', dict(Counter(x.get('layout') for x in v)))
print('\n# 3. DOM fingerprints per group (rendered rows)')
med = lambda xs: st.median([x for x in xs if x is not None]) if [x for x in xs if x is not None] else None
for g in G:
    rs = [r for r in rend if r['cat'] == g]
    if not rs: continue
    c = lambda f: (sum(1 for r in rs if f(r)), names([r for r in rs if f(r)]))
    print(f'## {g} n={len(rs)}')
    for lab, f in [('video in DOM', lambda r: (r.get('videos') or 0) > 0), ('video in first screen', lambda r: len((r.get('first') or {}).get('videos', [])) > 0),
                   ('webgl canvas', lambda r: (r.get('webgl') or 0) > 0), ('pinned sticky scene', lambda r: (r.get('pinned') or 0) > 0),
                   ('marquee class', lambda r: (r.get('marquee') or 0) > 0), ('countdown or timer element', lambda r: (r.get('countdownEls') or 0) > 0),
                   ('countdown text', lambda r: bool((r.get('facts') or {}).get('countdownText'))), ('password page', lambda r: r.get('passwordPage')),
                   ('shopify', lambda r: 'shopify' in r.get('libs', [])), ('gsap or ScrollTrigger', lambda r: any(l in r.get('libs', []) for l in ['gsap', 'ScrollTrigger'])),
                   ('three.js', lambda r: 'THREE' in r.get('libs', [])), ('lenis', lambda r: 'Lenis' in r.get('libs', [])),
                   ('doc height 900 (inner scroller or one screen)', lambda r: r.get('height') == 900),
                   ('3+ big rounded cards', lambda r: (r.get('cards') or 0) >= 3), ('3+ full-bleed bands', lambda r: (r.get('fullBleed') or 0) >= 3),
                   ('words drop', lambda r: (r.get('offer') or {}).get('drop', 0) > 0), ('words sold out', lambda r: (r.get('offer') or {}).get('soldOut', 0) > 0),
                   ('words waitlist or early access', lambda r: (r.get('offer') or {}).get('waitlist', 0) > 0), ('words community', lambda r: (r.get('offer') or {}).get('community', 0) > 0),
                   ('words custom', lambda r: (r.get('offer') or {}).get('custom', 0) > 0), ('reviews text', lambda r: bool((r.get('facts') or {}).get('reviews'))),
                   ('fabric weight or wash words', lambda r: bool((r.get('facts') or {}).get('fabric'))), ('model size note', lambda r: bool((r.get('facts') or {}).get('modelSize')))]:
        n, who = c(f); print(f'  {lab:<46} {n:>2}  {who}')
    print('  median height', med([r.get('height') for r in rs]), ' median words', med([r.get('words') for r in rs]), ' median imgs', med([r.get('imgs') for r in rs]))
    print('  h1 faces', Counter(r.get('faceH1') for r in rs).most_common(14))
print('\n# 4. custom group: subpages and click-throughs')
for r in [r for r in rows if r['cat'] == 'custom']:
    print(' ', r['slug'][:48], S(r), 'subpages', [s['url'] for s in r['subpages']], 'config', [c['tag'] for c in r['config']])
print('\n# 5. palettes (DOM bg by painted area), rendered rows')
for r in rend:
    print(f"  {r['cat']:<7} {r['slug'][:44]:<44} {' '.join(r.get('paletteBg', [])[:4])}")
