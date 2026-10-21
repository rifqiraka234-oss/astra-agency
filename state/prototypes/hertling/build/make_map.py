#!/usr/bin/env python3
"""Draws partials/map.svg from OpenStreetMap boundaries (Nominatim, data/places.json, fetched 21 Oct 2026).
Equirectangular projection scaled by cos(latitude). Prints the straight line distance used on the page."""
import json
import math
import os

HERE = os.path.dirname(os.path.abspath(__file__))
P = json.load(open(os.path.join(HERE, 'data', 'places.json')))
BASE = (float(P['Birkenweg 18, 21465 Reinbek']['lat']), float(P['Birkenweg 18, 21465 Reinbek']['lon']))
CITY = (float(P['Hamburg']['lat']), float(P['Hamburg']['lon']))
TOWNS = ['Reinbek', 'Glinde', 'Barsbüttel', 'Oststeinbek', 'Wentorf bei Hamburg']
LAT0 = 53.56
K = math.cos(math.radians(LAT0))
# frame, west of Hamburg's centre to east of Reinbek
W0, E0, S0, N0 = 9.90, 10.34, 53.45, 53.66
WIDTH = 1000
HEIGHT = round(WIDTH * (N0 - S0) / ((E0 - W0) * K))


def xy(lon, lat):
    return ((lon - W0) * K / ((E0 - W0) * K) * WIDTH, (N0 - lat) / (N0 - S0) * HEIGHT)


def rings(g):
    if g['type'] == 'Polygon':
        return [g['coordinates'][0]]
    if g['type'] == 'MultiPolygon':
        return [p[0] for p in g['coordinates']]
    return []


def path(g):
    out = []
    for ring in rings(g):
        pts = [xy(*c) for c in ring]
        out.append('M' + ' L'.join(f'{x:.1f} {y:.1f}' for x, y in pts) + 'Z')
    return ''.join(out)


def centroid(g):
    pts = [c for r in rings(g) for c in r]
    return sum(p[0] for p in pts) / len(pts), sum(p[1] for p in pts) / len(pts)


def km(a, b):
    R = 6371.0
    p1, p2 = math.radians(a[0]), math.radians(b[0])
    dp, dl = p2 - p1, math.radians(b[1] - a[1])
    h = math.sin(dp / 2) ** 2 + math.cos(p1) * math.cos(p2) * math.sin(dl / 2) ** 2
    return 2 * R * math.asin(math.sqrt(h))


def main():
    hh = P['Hamburg']['geojson']
    parts = [f'<svg class="map-svg" viewBox="0 0 {WIDTH} {HEIGHT}" focusable="false" aria-hidden="true">',
             f'<path class="map-hh" d="{path(hh)}"/>']
    labels = []
    for t in TOWNS:
        g = P[t]['geojson']
        parts.append(f'<path class="map-town{" map-home" if t == "Reinbek" else ""}" d="{path(g)}"/>')
        lon, lat = centroid(g)
        x, y = xy(lon, lat)
        labels.append((t.replace(' bei Hamburg', ''), x, y))
    bx, by = xy(BASE[1], BASE[0])
    cx, cy = xy(CITY[1], CITY[0])
    parts.append(f'<path class="map-route" d="M{bx:.1f} {by:.1f} L{cx:.1f} {cy:.1f}"/>')
    parts.append(f'<circle class="map-city" cx="{cx:.1f}" cy="{cy:.1f}" r="7"/>')
    parts.append(f'<circle class="map-base-r" cx="{bx:.1f}" cy="{by:.1f}" r="22"/><circle class="map-base" cx="{bx:.1f}" cy="{by:.1f}" r="8"/>')
    parts.append('</svg>')
    d = km(BASE, CITY)
    # label offsets in map units, placed by eye so nothing collides
    OFF = {'Reinbek': (14, 52), 'Glinde': (-6, -4), 'Barsbüttel': (-30, -40), 'Oststeinbek': (-28, 14), 'Wentorf': (-48, 34)}
    tags = [f'<span class="map-l map-l-hh" style="left:{(cx - 150) / WIDTH * 100:.1f}%;top:{(cy + 26) / HEIGHT * 100:.1f}%">Hamburg</span>']
    for name, x, y in labels:
        dx, dy = OFF.get(name, (0, 0))
        cls = ' map-l-home' if name == 'Reinbek' else ''
        tags.append(f'<span class="map-l{cls}" style="left:{(x + dx) / WIDTH * 100:.1f}%;top:{(y + dy) / HEIGHT * 100:.1f}%">{name}</span>')
    tags.append(f'<span class="map-dist" style="left:{(bx * .62 + cx * .38) / WIDTH * 100:.1f}%;top:{((by + cy) / 2 - 46) / HEIGHT * 100:.1f}%">[[{round(d)} km Luftlinie<span class="map-x"> in die Innenstadt</span>||{round(d)} km<span class="map-x"> to the city centre</span> as the crow flies]]</span>')
    tags.append('<span class="map-osm">© OpenStreetMap</span>')
    html = f'<div class="map" style="aspect-ratio:{WIDTH}/{HEIGHT}">' + ''.join(parts) + ''.join(tags) + '</div>\n'
    open(os.path.join(HERE, 'partials', 'map.svg'), 'w').write(html)
    print(f'map {WIDTH}x{HEIGHT}, base to city {d:.2f} km')


if __name__ == '__main__':
    main()
