// Computed fonts and colours of visible text, plus section backgrounds, per page.
// usage: node computed_styles.js <out_json> url1 url2 ...
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const SPKI = require('/home/user/astra-agency/tools/proxy-ca-spki')();
const fs = require('fs');
const [out, ...urls] = process.argv.slice(2);
(async () => {
  const b = await chromium.launch({
    executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
    args: ['--no-sandbox', `--ignore-certificate-errors-spki-list=${SPKI}`],
  });
  const ctx = await b.newContext({ viewport: { width: 1440, height: 1000 }, locale: 'de-AT' });
  const res = {};
  for (const u of urls) {
    const p = await ctx.newPage();
    await p.goto(u, { waitUntil: 'load', timeout: 90000 });
    await p.waitForTimeout(2500);
    for (let y = 0; y < 12000; y += 800) { await p.evaluate(v => window.scrollTo(0, v), y); await p.waitForTimeout(250); }
    await p.waitForTimeout(1500);
    res[u] = await p.evaluate(() => {
      const text = {}, bgs = {};
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      let n;
      while ((n = walker.nextNode())) {
        const s = n.textContent.trim();
        if (!s || s.length < 2) continue;
        const el = n.parentElement;
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) continue;
        const cs = getComputedStyle(el);
        if (cs.visibility === 'hidden' || cs.display === 'none') continue;
        const key = `${cs.fontFamily.split(',')[0].replace(/["']/g, '')} | ${cs.fontWeight} | ${cs.fontStyle} | ${cs.color}`;
        text[key] = text[key] || { chars: 0, sizes: new Set(), samples: [] };
        text[key].chars += s.length;
        text[key].sizes.add(cs.fontSize);
        if (text[key].samples.length < 3) text[key].samples.push(s.slice(0, 60));
      }
      for (const el of document.querySelectorAll('section, header, footer, [data-testid="columns"], [data-mesh-id]')) {
        const c = getComputedStyle(el).backgroundColor;
        if (c && c !== 'rgba(0, 0, 0, 0)') bgs[c] = (bgs[c] || 0) + 1;
      }
      for (const el of document.querySelectorAll('div')) {
        const c = getComputedStyle(el).backgroundColor;
        const r = el.getBoundingClientRect();
        if (c && c !== 'rgba(0, 0, 0, 0)' && r.width > 200 && r.height > 60) bgs[c] = (bgs[c] || 0) + 1;
      }
      const outT = Object.entries(text).map(([k, v]) => ({ style: k, chars: v.chars, sizes: [...v.sizes], samples: v.samples }))
        .sort((a, b) => b.chars - a.chars);
      return { text: outT, backgrounds: bgs };
    });
    await p.close();
    await new Promise(r => setTimeout(r, 4000));
  }
  fs.writeFileSync(out, JSON.stringify(res, null, 1));
  await b.close();
  for (const [u, v] of Object.entries(res)) {
    console.log('\n== ' + u);
    v.text.slice(0, 18).forEach(t => console.log(`  ${String(t.chars).padStart(5)}  ${t.style}  ${t.sizes.join('/')}  e.g. ${JSON.stringify(t.samples[0])}`));
    console.log('  backgrounds', JSON.stringify(v.backgrounds));
  }
})();
