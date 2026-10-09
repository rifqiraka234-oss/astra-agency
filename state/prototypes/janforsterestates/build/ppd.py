# Build the embedded dataset from HM Land Registry Price Paid Data + UK HPI (July 2026) + ONS PIPR (Aug 2026).
import csv, json, re, sys, statistics, collections, datetime
D = sys.argv[1]
OUT = sys.argv[2]
LO, HI = '2025-08-01', '2026-07-31'
# --- HPI: monthly index per LA per type
HPI = collections.defaultdict(dict)   # (la_upper, type) -> {yyyy-mm: index}
HPI_LATEST = {}
TYPES = {'D': 'Detached', 'S': 'SemiDetached', 'T': 'Terraced', 'F': 'Flat'}
with open(f'{D}/hpi-full-2026-07.csv', newline='', encoding='utf-8') as f:
    for r in csv.DictReader(f):
        dd, mm, yy = r['Date'].split('/')
        ym = f'{yy}-{mm}'
        if ym < '2016-01':
            continue
        la = r['RegionName'].upper()
        for t, k in TYPES.items():
            v = r[k + 'Index']
            if v:
                HPI[(la, t)][ym] = float(v)
        if ym == '2026-07':
            HPI_LATEST[la] = r
# --- PPD
rows = []
status = collections.Counter(); cats = collections.Counter(); skipped = collections.Counter()
for fn in ('pp-2025.csv', 'pp-2026.csv'):
    with open(f'{D}/{fn}', newline='', encoding='utf-8') as f:
        for r in csv.reader(f):
            pc = r[3].strip()
            if not re.match(r'^NE\d', pc):
                continue
            date = r[2][:10]
            if not (LO <= date <= HI):
                continue
            status[r[15]] += 1; cats[r[14]] += 1
            if r[14] != 'A': skipped['cat B'] += 1; continue
            if r[15] == 'D': skipped['deleted'] += 1; continue
            if r[4] not in TYPES: skipped['type O'] += 1; continue
            if r[5] == 'Y': skipped['new build'] += 1; continue
            rows.append(dict(id=r[0], price=int(r[1]), date=date, pc=pc, t=r[4], la=r[12].upper()))
print('status', status, 'cats', cats, 'skipped', skipped, 'kept', len(rows))
# dedupe by transaction id (keep last)
byid = {}
for r in rows: byid[r['id']] = r
rows = list(byid.values()); print('after dedupe', len(rows))
# --- index each sale to July 2026 with its own LA and type
miss = collections.Counter()
for r in rows:
    ser = HPI.get((r['la'], r['t']))
    ym = r['date'][:7]
    if not ser or ym not in ser or '2026-07' not in ser:
        miss[r['la']] += 1; r['adj'] = r['price']; continue
    r['adj'] = r['price'] * ser['2026-07'] / ser[ym]
print('index misses', miss)
# --- group
def outcode(pc): return pc.split()[0]
def sector(pc):
    a = pc.split(); return a[1][0] if len(a) > 1 and a[1] else '?'
dist = collections.defaultdict(lambda: {'la': collections.Counter(), 's': collections.defaultdict(lambda: collections.defaultdict(list))})
lagrp = collections.defaultdict(lambda: collections.defaultdict(list))
for r in rows:
    oc = outcode(r['pc'])
    dist[oc]['la'][r['la']] += 1
    dist[oc]['s'][sector(r['pc'])][r['t']].append(round(r['adj'] / 500))
    lagrp[r['la']][r['t']].append(r['adj'])
def title_la(s):
    return {'NEWCASTLE UPON TYNE': 'Newcastle upon Tyne', 'NORTH TYNESIDE': 'North Tyneside', 'SOUTH TYNESIDE': 'South Tyneside',
            'GATESHEAD': 'Gateshead', 'NORTHUMBERLAND': 'Northumberland', 'SUNDERLAND': 'Sunderland', 'COUNTY DURHAM': 'County Durham'}.get(s, s.title())
out = {'d': {}, 'la': {}, 'meta': {}}
def pct(arr, q):
    a = sorted(arr); i = (len(a) - 1) * q / 100; lo = int(i); hi = min(lo + 1, len(a) - 1)
    return a[lo] + (a[hi] - a[lo]) * (i - lo)
for oc in sorted(dist, key=lambda x: int(x[2:])):
    g = dist[oc]
    la = g['la'].most_common(1)[0][0]
    out['d'][oc] = {'la': title_la(la), 's': {s: {t: sorted(v) for t, v in tt.items()} for s, tt in sorted(g['s'].items())}}
for la, tt in lagrp.items():
    h = HPI_LATEST.get(la)
    ent = {'p': {t: [round(pct(v, q) / 500) for q in range(0, 101)] for t, v in tt.items()}, 'n': {t: len(v) for t, v in tt.items()}}
    if h:
        ent['hpi'] = {'avg': int(h['AveragePrice']), 'chg': float(h['12m%Change']),
                      'D': [int(h['DetachedPrice']), float(h['Detached12m%Change'])],
                      'S': [int(h['SemiDetachedPrice']), float(h['SemiDetached12m%Change'])],
                      'T': [int(h['TerracedPrice']), float(h['Terraced12m%Change'])],
                      'F': [int(h['FlatPrice']), float(h['Flat12m%Change'])]}
    out['la'][title_la(la)] = ent
out['meta'] = {'n': len(rows), 'from': LO, 'to': HI, 'hpi': 'July 2026', 'ppd_update': '28 September 2026'}
# --- 10 year HPI series for the story chart (Newcastle, North Tyneside, by type, Januarys + latest)
ser = {}
with open(f'{D}/hpi-full-2026-07.csv', newline='', encoding='utf-8') as f:
    for r in csv.DictReader(f):
        if r['RegionName'] in ('Newcastle upon Tyne', 'North Tyneside', 'North East'):
            dd, mm, yy = r['Date'].split('/')
            if yy >= '2016':
                ser.setdefault(r['RegionName'], []).append([f'{yy}-{mm}', int(r['AveragePrice'])] + [int(r[k + 'Price']) if r[k + 'Price'] else None for k in TYPES.values()])
out['series'] = ser
h=HPI_LATEST['NORTH EAST']; out['ne'] = {'avg': int(h['AveragePrice']), 'chg': float(h['12m%Change'])}
raw = collections.defaultdict(list)
for r in rows:
    if outcode(r['pc']) == 'NE3':
        raw[r['t']].append(round(r['price'] / 500))
out['ne3raw'] = {t: sorted(v) for t, v in raw.items()}
for t in 'DSTF':
    v = [x * 500 for x in out['ne3raw'][t]]
    print('NE3 RAW', t, 'n', len(v), 'p10', pct(v, 10), 'p25', pct(v, 25), 'p50', pct(v, 50), 'p75', pct(v, 75), 'p90', pct(v, 90))
json.dump(out, open(OUT, 'w'), separators=(',', ':'))
import os; print('bytes', os.path.getsize(OUT))
# summaries for the story
for oc in ('NE3', 'NE7', 'NE12', 'NE25', 'NE26', 'NE29', 'NE30', 'NE6', 'NE2'):
    if oc in out['d']:
        g = out['d'][oc]
        for t in 'DSTF':
            arr = sorted(sum([s.get(t, []) for s in g['s'].values()], []))
            if arr:
                print(oc, g['la'], t, 'n', len(arr), 'p10', pct(arr, 10) * 500, 'p50', pct(arr, 50) * 500, 'p90', pct(arr, 90) * 500, 'min', arr[0] * 500, 'max', arr[-1] * 500)
        print(oc, 'sectors', {s: sum(len(v) for v in tt.values()) for s, tt in g['s'].items()})
print('districts', len(out['d']))
