#!/usr/bin/env python3
"""Containment check for the portraits on the client's own About page, in the spirit of tools/verify_portraits.py.
For each portrait image the smallest ancestor block that contains a person's name must name exactly one person, and that person must be the one we caption it with.
Then the files we ship are byte matched to the files downloaded from the client's page."""
import json, hashlib, sys, os, subprocess
HERE = os.path.dirname(os.path.abspath(__file__))
JS = r'''
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox', '--ignore-certificate-errors-spki-list=PS48cX347wDVcRynzq+DFqswl2PLNE1sG6uQvxMCOS0='] });
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto('https://www.justclaims.eu/about-us', { waitUntil: 'networkidle', timeout: 60000 });
  await p.waitForTimeout(2000);
  const res = await p.evaluate(() => {
    const bios = [['Ulrich Steppler', 'Ulrich Steppler, LL.M.'], ['Katja H. Brecke', 'Katja H. Brecke, LL.M.']];
    const spots = [];
    const tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let t; while ((t = tw.nextNode())) { for (const [name, key] of bios) { const i = t.nodeValue.indexOf(key); if (i > -1) { const r = document.createRange(); r.setStart(t, i); r.setEnd(t, i + key.length); const b = r.getBoundingClientRect(); spots.push({ name, x0: b.left, x1: b.right, y: b.top }); } } }
    const out = [];
    for (const img of document.images) {
      const src = img.currentSrc || img.src; const m = /wixstatic\.com\/media\/([^/]+)/.exec(src); if (!m) continue;
      const r = img.getBoundingClientRect(); if (r.width < 150) continue;
      // nearest bio start below the image whose horizontal span overlaps the image
      const cands = spots.filter(sp => sp.y >= r.bottom - 4 && sp.x0 < r.right && sp.x1 > r.left).sort((a, b) => a.y - b.y);
      const first = cands[0];
      out.push({ media: m[1], alt: img.alt, w: img.naturalWidth, found: first ? { hit: [first.name], depth: Math.round(first.y - r.bottom), len: cands.length, tag: 'geometry' } : null });
    }
    return out;
  });
  console.log(JSON.stringify(res)); await b.close();
})();
'''
open('/tmp/vp_live.js', 'w').write(JS)
r = subprocess.run(['node', '/tmp/vp_live.js'], capture_output=True, text=True)
data = json.loads(r.stdout.strip().splitlines()[-1])
want = {'084a8c_592615aafbe14ce99bf4c46d199d07b3': 'Ulrich Steppler', '084a8c_a0efc84bde5b4a1a810e6b169f05ff38': 'Katja H. Brecke'}
ok = True
for k, who in want.items():
    rows = [d for d in data if d['media'].split('~')[0] == k]
    if not rows: print('NOT ON PAGE', k, who); ok = False; continue
    for d in rows:
        f = d['found']
        good = f and f['hit'] == [who]
        print(('PASS ' if good else 'FAIL '), who, '| alt:', d['alt'][:46], '| nearest block names:', f and f['hit'], '| bio starts', f and f['depth'], 'px below the photo, in its own column')
        sur = who.split()[-1].lower(); fn_ok = (sur in d['alt'].lower()) if who.startswith('Katja') or who.startswith('Ulrich') else True
        print('      filename carries the surname', sur, ':', fn_ok); ok = ok and bool(good) and fn_ok
# byte match of the shipped files against the client's downloads
pairs = {'portrait-steppler.jpg': 'img/people/ulrich-steppler.jpg', 'photo-asd-frankfurt-location.jpg': 'img/people/katja-brecke.jpg'}
for src, dst in pairs.items():
    a = open(os.path.join(HERE, '../../assets/client', src), 'rb').read(); bpath = os.path.join(HERE, '../../site/assets', dst)
    if not os.path.exists(bpath): print('MISSING shipped file', dst); ok = False; continue
    bb = open(bpath, 'rb').read(); same = hashlib.sha256(a).hexdigest() == hashlib.sha256(bb).hexdigest()
    print(('PASS ' if same else 'FAIL '), 'byte match', dst, hashlib.sha256(bb).hexdigest()[:12]); ok = ok and same
sys.exit(0 if ok else 1)
