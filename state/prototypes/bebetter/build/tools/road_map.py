#!/usr/bin/env python3
"""The road map for the home page. Natural Earth land (public domain, world-atlas@2.0.2 land-50m, from jsDelivr) turned
into a halftone of copper dots over the stretch of Europe they drove, with the stops placed by their coordinates.
Writes build/data/road.json, which build.py turns into one SVG. Run with the TopoJSON path as the argument."""
import json, math, sys, os
from PIL import Image, ImageDraw

topo = json.load(open(sys.argv[1]))
sx, sy = topo['transform']['scale']; tx, ty = topo['transform']['translate']
arcs = []
for arc in topo['arcs']:
    x = y = 0; pts = []
    for dx, dy in arc:
        x += dx; y += dy; pts.append((x * sx + tx, y * sy + ty))
    arcs.append(pts)
def ring(idx):
    out = []
    for i in idx:
        a = arcs[i] if i >= 0 else arcs[~i][::-1]
        out.extend(a if not out else a[1:])
    return out
polys = []
for g in topo['objects']['land']['geometries']:
    if g['type'] == 'Polygon': polys.append([ring(r) for r in g['arcs']])
    elif g['type'] == 'MultiPolygon':
        for p in g['arcs']: polys.append([ring(r) for r in p])

# the frame, west of the Dutch coast to east of Prague, Mercator
LON0, LON1, LAT0, LAT1 = 1.2, 16.8, 47.6, 55.2
def merc(lat): return math.log(math.tan(math.pi / 4 + math.radians(lat) / 2))
W = 1000
H = round(W * (merc(LAT1) - merc(LAT0)) / math.radians(LON1 - LON0))
def proj(lon, lat):
    return ((lon - LON0) / (LON1 - LON0) * W, (merc(LAT1) - merc(lat)) / (merc(LAT1) - merc(LAT0)) * H)

S = 4
img = Image.new('L', (W * S, H * S), 0); d = ImageDraw.Draw(img)
for p in polys:
    for k, r in enumerate(p):
        pts = [(x * S, y * S) for x, y in (proj(lon, lat) for lon, lat in r)]
        if len(pts) > 2: d.polygon(pts, fill=255 if k == 0 else 0)
step = 11
dots = []
for gy in range(step // 2, H, step):
    off = (step // 2) if (gy // step) % 2 else 0
    for gx in range(off + step // 2, W, step):
        if img.getpixel((gx * S, gy * S)) > 0: dots.append((gx, gy))

stops = [
    ('home', 'Rotterdam', 51.9225, 4.4792),
    ('koln', 'Köln', 50.9375, 6.9603),
    ('breda', 'Breda', 51.5719, 4.7683),
    ('praha', 'Praha', 50.0755, 14.4378),
    ('gorinchem', 'Gorinchem', 51.8306, 4.9742),
]
out = {'w': W, 'h': H, 'step': step, 'dots': dots, 'stops': [{'key': k, 'name': n, 'xy': [round(v, 1) for v in proj(lon, lat)]} for k, n, lat, lon in stops],
       'source': 'Natural Earth 1:50m land via world-atlas@2.0.2 (jsDelivr), public domain. City coordinates from their town centres.'}
json.dump(out, open(os.path.join(os.path.dirname(__file__), '..', 'data', 'road.json'), 'w'))
print(W, H, len(dots), 'dots', [(s['name'], s['xy']) for s in out['stops']])
