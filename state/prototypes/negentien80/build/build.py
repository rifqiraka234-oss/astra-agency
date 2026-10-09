"""Build site/index.html from template.html plus data.json plus the CBS series.
usage: python3 -I build.py <n80b dir>"""
import json, os, sys

B = sys.argv[1]
tpl = open(os.path.join(B, 'build', 'template.html'), encoding='utf-8').read()
data = json.load(open(os.path.join(B, 'build', 'data.json'), encoding='utf-8'))

# Addresses exactly as listed on https://negentien80.nl/full-service-dealers/ (fetched 2026-10-09),
# except Contempera, where that page writes "Overtoom 135 – 137" with spaces and an en dash; the
# N80 Full service page writes "Overtoom 135-137", which is used here.
listed = {
    'Arc Living': ('Langstraat 277', '6691 EE', 'Gendt'),
    'Contempera': ('Overtoom 135-137', '1054 HG', 'Amsterdam'),
    'Chapter One': ('Loopkantstraat 14C', '5405 NB', 'Uden'),
    'De Woonwinkel': ('Boschweg 80', '5481 EH', 'Schijndel'),
    'Colijn Interieur': ('Verdamstraat 6', '2313 PN', 'Leiden'),
    'Luxx Living Studio': ('Tanneskampke 1', '5221 BT', '’s-Hertogenbosch'),
    'Net Iets-Anders': ('Busselbundersweg 1', '5467 LT', 'Veghel'),
    'Studio Uijterwaal': ('Marktstraat 5', '1411 CX', 'Naarden'),
    'Toz Living': ('Weijen 24', '5388 HN', 'Nistelrode'),
    'Van Eijndhoven Vloeren': ('Industrieweg 23', '5281 RW', 'Boxtel'),
    'Snoeijen Luijten Interieur': ('Kapelstraat 63', '5591 HD', 'Heeze'),
}
# Snoeijen Luijten. The dealers page says Kapelstraat 65. Their own site (https://interieurwerkopmaat.nl/ footer and
# /contact/, 2026-10-09) and the N80 Full service page both say Kapelstraat 63, so 63 is used.
# Website overrides, both checked 2026-10-09.
# Chapter One. The dealers page links https://chapterone.nl/nl, which returns 404 "Pagina niet gevonden". The N80 Full
# service page links https://chapterone.nl/ (200, names the Loopkantstraat 14C showroom), which is used.
# Toz Living. The dealers page links https://www.tozwinkel.nl/, which failed certificate checks over https from our side and
# over plain http forwards (301) to https://www.tozliving.com/ (200, "Toz Living", Weijen 24 5388HN Nistelrode), which is used.
web_override = {'Chapter One': 'https://chapterone.nl/', 'Toz Living': 'https://tozliving.com/'}
# PDOK Locatieserver 2026-10-09, q "Kapelstraat 63 5591HD" type adres, resolved "Kapelstraat 63a, 5591HD Heeze"
# POINT(5.57962028 51.3806189). Same projection as prep.py.
geo_override = {'Snoeijen Luijten Interieur': (51.3806189, 5.57962028)}
import math
def proj(lon, lat):
    return round((lon - 3.30) * math.cos(math.radians(52.15)) * 200.0, 1), round((53.56 - lat) * 200.0, 1)
assert len(data['dealers']) == 11
for d in data['dealers']:
    a, pc, pl = listed[d['naam']]
    d['adres'], d['postcode'], d['plaats'] = a, pc, pl
    if d['naam'] in web_override: d['web'] = web_override[d['naam']]
    if d['naam'] in geo_override:
        lat, lon = geo_override[d['naam']]
        d['lat'], d['lon'] = round(lat, 5), round(lon, 5)
        d['x'], d['y'] = proj(lon, lat)

cbs = json.load(open(os.path.join(B, 'raw', 'cbs_cv.json')))['value']
data['cbs'] = [{'p': r['Perioden'], 'v': r['GunstigeTijdVoorGroteAankopen_8']} for r in cbs]
assert data['cbs'][0]['p'] == '2024MM01' and data['cbs'][-1]['p'] == '2026MM09' and len(data['cbs']) == 33
assert all(r['v'] < 0 for r in data['cbs'])

js = 'window.N80DATA = ' + json.dumps(data, ensure_ascii=False, separators=(',', ':')) + ';'
assert '</script' not in js
assert tpl.count('/*__DATA__*/') == 1
out = tpl.replace('/*__DATA__*/', js)
os.makedirs(os.path.join(B, 'site'), exist_ok=True)
open(os.path.join(B, 'site', 'index.html'), 'w', encoding='utf-8').write(out)
print('index.html', len(out.encode('utf-8')), 'bytes')
