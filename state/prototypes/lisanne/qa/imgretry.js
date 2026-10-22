// Every image's first request fails on purpose, the page has to recover alone. A permanent failure has to stop after 3 tries.
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox'] });
  for (const [w, h] of [[1440, 900], [390, 844]]) {
    const p = await b.newPage({ viewport: { width: w, height: h } }); const seen = {}; let perm = 0;
    await p.route(/\/img\/.*\.jpg/, r => { const f = r.request().url().split('/img/')[1].split('?')[0]; seen[f] = (seen[f] || 0) + 1; if (f === 'ww-q.jpg' && w === 1440) { perm++; return r.abort(); } return seen[f] === 1 ? r.abort() : r.continue(); });
    await p.goto('http://127.0.0.1:8765/site-plan/'); await p.waitForTimeout(9000);
    const st = await p.evaluate(() => [...document.images].filter(i => i.getAttribute('src').includes('.jpg')).map(i => [i.currentSrc.split('/').pop(), i.naturalWidth > 0]));
    const broken = st.filter(x => !x[1]).map(x => x[0]);
    console.log(w, 'images', st.length, 'loaded', st.filter(x => x[1]).length, 'broken', JSON.stringify(broken), 'first try failed for', Object.keys(seen).length, 'files', w === 1440 ? 'permanent failure requests ' + perm : '');
    await p.close();
  }
  await b.close();
})();
