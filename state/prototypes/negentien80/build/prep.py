"""Prepare data for the Negentien80 calculator build.
Outputs build/data.json with: map paths (provinces, simplified), dealer list with lat/lon and
map x/y, and a compact PC4 centroid string for the offline postcode fallback.
Sources: PDOK provinciegebied (CC BY 4.0), PDOK Locatieserver for dealer addresses,
CBS postcode4 2024 via PDOK WFS (CC BY 4.0) for PC4 centroids."""
import json, math, os, sys

RAW = sys.argv[1]
OUT = sys.argv[2]
LAT0, LON0, K = 53.56, 3.30, 200.0
CL = math.cos(math.radians(52.15))


def proj(lon, lat):
    return round((lon - LON0) * CL * K, 1), round((LAT0 - lat) * K, 1)


def dp(pts, eps):
    if len(pts) < 3:
        return pts
    (x1, y1), (x2, y2) = pts[0], pts[-1]
    dx, dy = x2 - x1, y2 - y1
    n = math.hypot(dx, dy) or 1e-9
    dmax, idx = 0, 0
    for i in range(1, len(pts) - 1):
        x0, y0 = pts[i]
        d = abs(dy * x0 - dx * y0 + x2 * y1 - y2 * x1) / n
        if d > dmax:
            dmax, idx = d, i
    if dmax > eps:
        return dp(pts[: idx + 1], eps)[:-1] + dp(pts[idx:], eps)
    return [pts[0], pts[-1]]


def ring_area(r):
    return abs(sum(r[i][0] * r[i + 1][1] - r[i + 1][0] * r[i][1] for i in range(len(r) - 1))) / 2


prov = json.load(open(os.path.join(RAW, 'prov_cbs.json')))  # CBS gebiedsindelingen 2024, provincie_gegeneraliseerd (land only)
paths = []
for f in prov['features']:
    g = f['geometry']
    polys = g['coordinates'] if g['type'] == 'MultiPolygon' else [g['coordinates']]
    d = []
    for poly in polys:
        ring = [proj(x, y) for x, y in poly[0]]
        if ring_area(ring) < 6:  # drop tiny islands and slivers (map units squared)
            continue
        h = len(ring) // 2
        s = dp(ring[: h + 1], 0.9)[:-1] + dp(ring[h:], 0.9)
        if len(s) < 4:
            continue
        d.append('M' + 'L'.join(f'{x:g},{y:g}' for x, y in s) + 'Z')
    paths.append({'code': f['properties'].get('statcode'), 'naam': f['properties'].get('naam') or f['properties'].get('statnaam'), 'd': ''.join(d)})

dealers = json.load(open(os.path.join(RAW, 'dealers_geo.json')))
dl = []
for dd in dealers:
    lon, lat = map(float, dd['pdok']['centroide_ll'][6:-1].split())
    x, y = proj(lon, lat)
    dl.append({'naam': dd['name'], 'adres': dd['addr'], 'postcode': dd['pc'], 'plaats': dd['town'], 'web': dd['web'],
               'lat': round(lat, 5), 'lon': round(lon, 5), 'x': x, 'y': y})

pc4 = json.load(open(os.path.join(RAW, 'pc4', 'pc4_centroids.json')))
# compact, "1011:52373,4906" style without colon: pc4 then lat*1000 offset from 50000, lon*1000
parts = []
for k in sorted(pc4, key=int):
    lat, lon = pc4[k]
    parts.append(f"{k}{int(round(lat*1000))-50000:04d}{int(round(lon*1000)):04d}")
pcs = ''.join(parts)  # fixed width 12 chars per entry
assert all(len(p) == 12 for p in parts), 'width'

vb = proj(7.25, 50.74)
json.dump({'provinces': paths, 'dealers': dl, 'pc4': pcs, 'viewBox': [0, 0, vb[0], vb[1]]}, open(OUT, 'w'), ensure_ascii=False)
print('provinces', len(paths), 'path chars', sum(len(p['d']) for p in paths), 'dealers', len(dl), 'pc4', len(parts), 'chars', len(pcs), 'viewBox', vb)
for p in paths:
    print(' ', p['code'], p['naam'], len(p['d']))
