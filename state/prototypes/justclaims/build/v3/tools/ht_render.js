/* Prints a still as a halftone with the same shader the site runs live (site-v3/assets/ht.js), so a still and the
   film beside it share one screen. node ht_render.js <in.jpg> <out.png> <cssW> <cssH> '<json opts>' [scale]
   The PNG is written at scale times the css size so the dots stay crisp on a 2x screen. */
const fs = require('fs'), path = require('path');
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
(async () => {
  const [inp, out, cw, ch, js = '{}', scale = '2'] = process.argv.slice(2);
  const o = JSON.parse(js); o.keep = true; o.dpr = +scale; o.w = +cw; o.h = +ch;
  const ht = fs.readFileSync(path.join(__dirname, '..', '..', '..', 'site-v3', 'assets', 'ht.js'), 'utf8');
  const mime = inp.endsWith('.png') ? 'image/png' : 'image/jpeg';
  const data = 'data:' + mime + ';base64,' + fs.readFileSync(inp).toString('base64');
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox', '--use-gl=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist'] });
  const p = await b.newPage({ viewport: { width: 400, height: 300 } });
  await p.setContent(`<canvas id=c style="width:${cw}px;height:${ch}px"></canvas><script>${ht}</script>`);
  const url = await p.evaluate(async ({ data, o }) => {
    const img = new Image(); img.src = data; await img.decode();
    const c = document.getElementById('c'); const m = HT.mount(c, img, o); if (!m) return 'NOGL'; m.draw();
    return c.toDataURL('image/png');
  }, { data, o });
  if (url === 'NOGL') { console.log('no webgl'); process.exit(1); }
  fs.writeFileSync(out, Buffer.from(url.split(',')[1], 'base64'));
  console.log('wrote', out, fs.statSync(out).size); await b.close();
})();
