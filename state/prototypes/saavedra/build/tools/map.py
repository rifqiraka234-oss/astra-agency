#!/usr/bin/env python3
"""The 9e around 48 rue Condorcet, drawn from OpenStreetMap, with walking routes from the shop computed on the street graph.

    python3 tools/map.py /tmp/claude-0/saav/map/osm-small.json

Writes assets/map-9e.svg (streets, parks, routes, the shop) and data/routes.json (each route's length along the streets,
in metres). Data © OpenStreetMap contributors, ODbL. The shop's point is Nominatim's for "48 rue Condorcet, 75009 Paris"
(48.8802767, 2.3434391, read 25 Oct 2026). OSM still names that point Amor Mio, a name we never use."""
import heapq
import json
import math
import os
import sys

HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SHOP = (48.8802767, 2.3434391)
R = 860  # metres shown around the shop
W, H = 1200, 860
osm = json.load(open(sys.argv[1]))
N = {int(k): tuple(v) for k, v in osm['nodes'].items()}
WAYS = osm['ways']

k_lat = 111320.0
k_lon = 111320.0 * math.cos(math.radians(SHOP[0]))
half_x = R * 1.3
half_y = half_x * H / W


def xy(lat, lon):
    dx = (lon - SHOP[1]) * k_lon
    dy = (lat - SHOP[0]) * k_lat
    return (W / 2 + dx / half_x * W / 2, H / 2 - dy / half_y * H / 2)


def inside(p, m=40):
    return -m < p[0] < W + m and -m < p[1] < H + m


def dist(a, b):
    return math.hypot((a[1] - b[1]) * k_lon, (a[0] - b[0]) * k_lat)


WALK = {'footway', 'pedestrian', 'residential', 'living_street', 'service', 'tertiary', 'secondary', 'primary', 'unclassified', 'steps', 'path', 'cycleway', 'trunk', 'trunk_link', 'primary_link', 'secondary_link', 'tertiary_link'}
DRAW = {'primary': 5.2, 'secondary': 4.2, 'tertiary': 3.4, 'residential': 2.4, 'living_street': 2.2, 'unclassified': 2.2, 'pedestrian': 2.6, 'trunk': 5.2}

g = {}
streets = {k: [] for k in DRAW}
parks = []
for wid, w in WAYS.items():
    t = w['tags']
    nd = [n for n in w['nd'] if n in N]
    if len(nd) < 2:
        continue
    hw = t.get('highway')
    if hw in WALK and t.get('foot') != 'no' and t.get('area') != 'yes':
        for a, b in zip(nd, nd[1:]):
            d = dist(N[a], N[b])
            g.setdefault(a, []).append((b, d))
            g.setdefault(b, []).append((a, d))
    if hw in DRAW:
        pts = [xy(*N[n]) for n in nd]
        if any(inside(p) for p in pts):
            streets[hw].append(pts)
    if t.get('leisure') in ('park', 'garden') and nd[0] == nd[-1]:
        pts = [xy(*N[n]) for n in nd]
        if any(inside(p, 0) for p in pts):
            parks.append(pts)


def nearest(pt, pool=None):
    return min(pool or g, key=lambda n: dist(N[n], pt))


# only nodes reachable on foot from the shop, so a footway island never ends a route
_s = nearest(SHOP)
REACH = {_s}
_st = [_s]
while _st:
    u = _st.pop()
    for v, _ in g.get(u, []):
        if v not in REACH:
            REACH.add(v)
            _st.append(v)


def route(a, b):
    s, e = nearest(a, REACH), nearest(b, REACH)
    best = {s: 0}
    prev = {}
    q = [(0, s)]
    while q:
        d, u = heapq.heappop(q)
        if u == e:
            break
        if d > best.get(u, 1e18):
            continue
        for v, w in g.get(u, []):
            nd_ = d + w
            if nd_ < best.get(v, 1e18):
                best[v] = nd_
                prev[v] = u
                heapq.heappush(q, (nd_, v))
    path = [e]
    while path[-1] != s:
        path.append(prev[path[-1]])
    path.reverse()
    return path, best[e]


# destinations, the centroid of each OSM object carrying that name (tools/map.py reads them from places.json, written
# from the same tiles), named as the place, never as a business
PL = json.load(open(os.path.join(os.path.dirname(sys.argv[1]), 'places.json')))
DEST = [
    ('pigalle', 'Place Pigalle', 'Place Pigalle', tuple(PL['Place Pigalle'])),
    ('saintgeorges', 'Place Saint-Georges', 'Place Saint-Georges', tuple(PL['Place Saint-Georges'])),
    ('montholon', 'Square Montholon', 'Square Montholon', tuple(PL['Square Montholon'])),
    ('anvers', "Square d'Anvers", "Square d'Anvers", tuple(PL["Square d'Anvers"])),
]
routes = []
for key, fr, en, pt in DEST:
    path, m = route(SHOP, pt)
    pts = [xy(*N[n]) for n in path]
    d = 'M' + ' L'.join(f'{x:.1f} {y:.1f}' for x, y in pts)
    routes.append({'key': key, 'fr': fr, 'en': en, 'm': round(m), 'd': d, 'end': [round(pts[-1][0], 1), round(pts[-1][1], 1)]})


def poly(pts, close=False):
    return 'M' + ' L'.join(f'{x:.1f} {y:.1f}' for x, y in pts) + (' Z' if close else '')


out = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" class="map9">']
out.append('<g class="mp-parks">' + ''.join(f'<path d="{poly(p, True)}"/>' for p in parks) + '</g>')
for hw in ['residential', 'living_street', 'unclassified', 'pedestrian', 'tertiary', 'secondary', 'primary', 'trunk']:
    if streets[hw]:
        out.append(f'<g class="mp-st mp-{hw}" stroke-width="{DRAW[hw]}">' + ''.join(f'<path d="{poly(p)}"/>' for p in streets[hw]) + '</g>')
out.append('<g class="mp-routes">' + ''.join(f'<path class="mp-r" data-route="{r["key"]}" d="{r["d"]}"/>' for r in routes) + '</g>')
sx, sy = xy(*SHOP)
out.append(f'<g class="mp-shop" transform="translate({sx:.1f} {sy:.1f})"><circle r="16"/><circle class="mp-shop-c" r="7"/></g>')
out.append('</svg>')
svg = ''.join(out)
open(os.path.join(HERE, 'assets', 'map-9e.svg'), 'w').write(svg)
json.dump({'shop': [round(sx, 1), round(sy, 1)], 'w': W, 'h': H, 'metres_shown': R, 'routes': [{k: r[k] for k in ('key', 'fr', 'en', 'm', 'end')} for r in routes],
           'source': 'OpenStreetMap contributors, ODbL, api.openstreetmap.org map calls in 9 tiles, 25 Oct 2026, routes by shortest walking path on the street graph'},
          open(os.path.join(HERE, 'data', 'routes.json'), 'w'), ensure_ascii=False, indent=1)
print('map', len(svg), 'bytes', {k: len(v) for k, v in streets.items()}, 'parks', len(parks))
for r in routes:
    print(r['key'], r['m'], 'm')
