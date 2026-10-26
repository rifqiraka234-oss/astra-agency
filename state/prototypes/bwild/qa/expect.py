"""Independent daylight numbers for the BWILD tests, worked out with astral (not the page's NOAA code).
For every city in build/data/site.json, sunrise and sunset in local minutes for the 365 days from today."""
import datetime, json, os
from zoneinfo import ZoneInfo
from astral import Observer
from astral.sun import sunrise, sunset
B = os.path.dirname(os.path.abspath(__file__))
D = json.load(open(os.path.join(B, '..', 'build', 'data', 'site.json')))
out = {}
for c in D['cities']:
    tz = ZoneInfo(c['tz']); ob = Observer(c['lat'], c['lon']); today = datetime.datetime.now(tz).date(); rows = []
    for i in range(365):
        d = today + datetime.timedelta(days=i)
        r = sunrise(ob, d, tzinfo=tz); s = sunset(ob, d, tzinfo=tz)
        rows.append([r.hour * 60 + r.minute + r.second / 60, s.hour * 60 + s.minute + s.second / 60, d.isoformat()])
    out[c['id']] = rows
json.dump(out, open(os.path.join(B, 'expect.json'), 'w'))
print('wrote expect.json for', len(out), 'cities from', today)
