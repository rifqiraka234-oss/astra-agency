#!/usr/bin/env python3
"""Coworking spaces around 48 rue Condorcet, from the same OpenStreetMap tiles as the map, with walking distance on the
street graph. Writes data/coworkings.json and assets/plan-cowork.svg for the growth plan.

    python3 tools/cowork.py /tmp/claude-0/saav/map

Tags read, amenity=coworking_space or office=coworking. Entries of the same name within 60 m are one place. Data ©
OpenStreetMap contributors, ODbL, tiles fetched 25 Oct 2026."""
import glob
import heapq
import json
import math
import os
import sys
import xml.etree.ElementTree as ET

HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
D = sys.argv[1]
SHOP = (48.8802767, 2.3434391)
k_lat = 111320.0
k_lon = 111320.0 * math.cos(math.radians(SHOP[0]))
R = 1250
W, H = 1200, 900
half_x = R
half_y = half_x * H / W


def dist(a, b):
    return math.hypot((a[1] - b[1]) * k_lon, (a[0] - b[0]) * k_lat)


def xy(lat, lon):
    return (W / 2 + (lon - SHOP[1]) * k_lon / half_x * W / 2, H / 2 - (lat - SHOP[0]) * k_lat / half_y * H / 2)


found = []
for f in sorted(glob.glob(os.path.join(D, 'tile_*.xml'))):
    root = ET.parse(f).getroot()
    nodes = {n.get('id'): (float(n.get('lat')), float(n.get('lon'))) for n in root.iter('node')}
    for el in list(root.iter('node')) + list(root.iter('way')):
        t = {x.get('k'): x.get('v') for x in el.findall('tag')}
        if not (t.get('amenity') == 'coworking_space' or t.get('office') == 'coworking'):
            continue
        if el.tag == 'node':
            pt = (float(el.get('lat')), float(el.get('lon')))
        else:
            pts = [nodes[n.get('ref')] for n in el.findall('nd') if n.get('ref') in nodes]
            if not pts:
                continue
            pt = (sum(p[0] for p in pts) / len(pts), sum(p[1] for p in pts) / len(pts))
        addr = ' '.join(x for x in (t.get('addr:housenumber'), t.get('addr:street')) if x)
        found.append({'osm': f'{el.tag}/{el.get("id")}', 'name': t.get('name') or '', 'addr': addr, 'pt': pt})

places = []
for p in sorted(found, key=lambda x: dist(SHOP, x['pt'])):
    twin = next((q for q in places if q['name'].split()[0].lower() == p['name'].split()[0].lower() and dist(q['pt'], p['pt']) < 60), None)
    if twin:
        twin['osm'] += ' ' + p['osm']
        twin['addr'] = twin['addr'] or p['addr']
        continue
    places.append(dict(p))

# walking distance on the same street graph as tools/map.py
osm = json.load(open(os.path.join(D, 'osm-small.json')))
N = {int(k): tuple(v) for k, v in osm['nodes'].items()}
WALK = {'footway', 'pedestrian', 'residential', 'living_street', 'service', 'tertiary', 'secondary', 'primary', 'unclassified', 'steps', 'path', 'cycleway', 'trunk', 'trunk_link', 'primary_link', 'secondary_link', 'tertiary_link'}
g = {}
for w in osm['ways'].values():
    t = w['tags']
    nd = [n for n in w['nd'] if n in N]
    if t.get('highway') in WALK and t.get('foot') != 'no' and t.get('area') != 'yes':
        for a, b in zip(nd, nd[1:]):
            d = dist(N[a], N[b])
            g.setdefault(a, []).append((b, d))
            g.setdefault(b, []).append((a, d))
s = min(g, key=lambda n: dist(N[n], SHOP))
best = {s: 0}
q = [(0, s)]
while q:
    d, u = heapq.heappop(q)
    if d > best.get(u, 1e18):
        continue
    for v, w in g[u]:
        if d + w < best.get(v, 1e18):
            best[v] = d + w
            heapq.heappush(q, (d + w, v))
reach = list(best)
for p in places:
    n = min(reach, key=lambda n: dist(N[n], p['pt']))
    p['straight_m'] = round(dist(SHOP, p['pt']))
    p['walk_m'] = round(best[n] + dist(N[n], p['pt']) + dist(N[s], SHOP))
    p['walk_min'] = max(1, round(p['walk_m'] / (5000 / 60)))
    p['xy'] = [round(c, 1) for c in xy(*p['pt'])]
    p['pt'] = [round(c, 7) for c in p['pt']]

json.dump({'source': 'OpenStreetMap contributors, ODbL, api.openstreetmap.org map calls in 9 tiles fetched 25 Oct 2026, tags amenity=coworking_space or office=coworking, walking distance on the street graph at 5 km/h',
           'shop': [round(c, 1) for c in xy(*SHOP)], 'w': W, 'h': H, 'radius_m': R, 'places': places},
          open(os.path.join(HERE, 'data', 'coworkings.json'), 'w'), ensure_ascii=False, indent=1)

# the plan's map, streets from the same data, a dot per place and rings at 500 m and 1 km
DRAW = {'primary': 4.4, 'secondary': 3.6, 'tertiary': 3, 'residential': 2, 'living_street': 1.8, 'unclassified': 1.8, 'pedestrian': 2}
out = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" class="pmap">']
for hw, sw in DRAW.items():
    paths = []
    for w in osm['ways'].values():
        if w['tags'].get('highway') != hw:
            continue
        pts = [xy(*N[n]) for n in w['nd'] if n in N]
        if len(pts) > 1 and any(-40 < x < W + 40 and -40 < y < H + 40 for x, y in pts):
            paths.append('M' + ' L'.join(f'{x:.0f} {y:.0f}' for x, y in pts))
    out.append(f'<g class="pm-st" stroke-width="{sw}"><path d="{" ".join(paths)}"/></g>')
sx, sy = xy(*SHOP)
for m in (500, 1000):
    out.append(f'<circle class="pm-ring" cx="{sx:.1f}" cy="{sy:.1f}" r="{m / half_x * W / 2:.1f}"/>')
for i, p in enumerate(places):
    x, y = p['xy']
    out.append(f'<g class="pm-dot" data-i="{i}" transform="translate({x} {y})"><circle r="9"/></g>')
out.append(f'<g class="pm-shop" transform="translate({sx:.1f} {sy:.1f})"><circle r="15"/><circle class="pm-shop-c" r="6"/></g>')
out.append('</svg>')
open(os.path.join(HERE, 'assets', 'plan-cowork.svg'), 'w').write(''.join(out))
for p in places:
    print(p['straight_m'], p['walk_m'], p['walk_min'], p['name'], '|', p['addr'], p['osm'])
print(len(places), 'places,', sum(1 for p in places if p['straight_m'] <= 1000), 'within 1 km straight,', sum(1 for p in places if p['walk_min'] <= 10), 'within 10 min walk')
