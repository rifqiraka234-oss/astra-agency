#!/usr/bin/env python3
"""Draws the walk from Stephansplatz to Wildpretmarkt 1 as an inline SVG, from raw OpenStreetMap data.

Input  research/osm-wildpretmarkt.xml, fetched 19 Oct 2026 from
       https://api.openstreetmap.org/api/0.6/map?bbox=16.3672,48.2075,16.3745,48.2118 (ODbL).
Output build/map.svg. The café pin uses the building position Nominatim gives for Wildpretmarkt 1
(48.2101517, 16.3712777), read by the research pass.
"""
import math
import os
import xml.etree.ElementTree as ET

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, '..', 'research', 'osm-wildpretmarkt.xml')
OUT = os.path.join(HERE, 'map.svg')

W, H = 900, 640
LAT0, LON0, LAT1, LON1 = 48.2078, 16.3678, 48.2116, 16.3742
KX = math.cos(math.radians((LAT0 + LAT1) / 2))
SX = W / ((LON1 - LON0) * KX)
SY = H / (LAT1 - LAT0)
S = min(SX, SY)
CAFE = (48.2101517, 16.3712777)


def xy(lat, lon):
    x = (lon - LON0) * KX * S
    y = (LAT1 - lat) * S
    return round(x, 1), round(y, 1)


root = ET.parse(SRC).getroot()
nodes = {n.get('id'): (float(n.get('lat')), float(n.get('lon'))) for n in root.iter('node')}
node_tags = {n.get('id'): {t.get('k'): t.get('v') for t in n.iter('tag')} for n in root.iter('node')}

streets, buildings, church, cafe_bld = [], [], [], []
labels = {}
for w in root.iter('way'):
    tags = {t.get('k'): t.get('v') for t in w.iter('tag')}
    pts = [nodes[nd.get('ref')] for nd in w.iter('nd') if nd.get('ref') in nodes]
    if len(pts) < 2:
        continue
    d = 'M' + ' L'.join(f'{x},{y}' for x, y in (xy(*p) for p in pts))
    if 'building' in tags:
        if tags.get('amenity') == 'place_of_worship' or tags.get('building') in ('cathedral', 'church'):
            church.append(d + 'Z')
        elif tags.get('addr:street') == 'Wildpretmarkt' and tags.get('addr:housenumber') == '1':
            cafe_bld.append(d + 'Z')
        else:
            buildings.append(d + 'Z')
    elif tags.get('highway') in ('pedestrian', 'living_street', 'residential', 'service', 'unclassified',
                                 'tertiary', 'secondary', 'footway', 'primary'):
        if tags.get('highway') == 'footway' and tags.get('footway') in ('sidewalk', 'crossing'):
            continue
        if tags.get('area') == 'yes' or (tags.get('highway') == 'pedestrian' and pts[0] == pts[-1]):
            streets.append(('area', d + 'Z'))
        else:
            streets.append(('line', d))
        n = tags.get('name')
        if n:
            mid = pts[len(pts) // 2]
            labels.setdefault(n, []).append(xy(*mid))

entrances = [xy(*nodes[i]) for i, t in node_tags.items()
             if t.get('railway') == 'subway_entrance' and i in nodes]

out = [f'<svg class="map" viewBox="0 0 {W} {H}" role="img" aria-labelledby="mapT mapD" xmlns="http://www.w3.org/2000/svg">',
       '<title id="mapT">Karte vom Stephansplatz zum Wildpretmarkt 1</title>',
       '<desc id="mapD">Die Gassen der Wiener Innenstadt zwischen Stephansplatz und Wildpretmarkt. Der Gut Health Club liegt am Wildpretmarkt 1, wenige Gehminuten vom Stephansdom.</desc>',
       f'<rect width="{W}" height="{H}" class="m-bg"/>']
out += [f'<path d="{d}" class="m-area"/>' for k, d in streets if k == 'area']
out += [f'<path d="{d}" class="m-st"/>' for k, d in streets if k == 'line']
out += [f'<path d="{d}" class="m-b"/>' for d in buildings]
out += [f'<path d="{d}" class="m-ch"/>' for d in church]
out += [f'<path d="{d}" class="m-cafe"/>' for d in cafe_bld]
for x, y in entrances:
    out.append(f'<g class="m-u" transform="translate({x},{y})"><rect x="-9" y="-9" width="18" height="18" rx="3"/><text y="5" text-anchor="middle">U</text></g>')
show = ['Stephansplatz', 'Brandstätte', 'Rotenturmstraße', 'Tuchlauben', 'Hoher Markt', 'Bauernmarkt', 'Graben', 'Jasomirgottstraße']  # Goldschmiedgasse collided with Jasomirgottstraße
for n in show:
    if n in labels:
        pts = labels[n]
        x, y = pts[len(pts) // 2]
        if 0 < x < W and 0 < y < H:
            out.append(f'<text class="m-l{" key" if n == "Stephansplatz" else ""}" x="{x}" y="{y}">{n}</text>')  # key, the one label phones keep
cx, cy = xy(*CAFE)
out.append(f'<g class="m-pin" transform="translate({cx},{cy})"><circle r="26" class="m-pulse"/><circle r="11"/><text x="18" y="-16" class="m-pl">Gut Health Club</text><text x="18" y="2" class="m-ps">Wildpretmarkt 1</text></g>')
# the attribution sits under the map as bilingual HTML, so a rounded corner can't clip it
out.append('</svg>')
open(OUT, 'w').write('\n'.join(out))
print('map', len(streets), 'streets', len(buildings), 'buildings', len(church), 'church', len(cafe_bld), 'cafe', len(entrances), 'U', 'labels', [n for n in show if n in labels], 'cafe xy', (cx, cy))
