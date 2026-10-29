// Rendered DOM innerText for every sitemap URL, 4s apart, with café term counts.
// usage: node dom_text.js <hs_dir>
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const SPKI = require('/home/user/astra-agency/tools/proxy-ca-spki')();
const fs = require('fs');
const path = require('path');
const HS = process.argv[2];
const locs = f => [...fs.readFileSync(path.join(HS, 'raw', f), 'utf8').matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map(m => m[1]);
const urls = [...locs('pages-sitemap.xml'), ...locs('store-products-sitemap.xml')];
const TERMS = ['Gut Health Club', 'Wildpretmarkt', 'Café', 'Cafe', 'Eröffnung', 'Öffnungszeiten'];
(async () => {
  const b = await chromium.launch({
    executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
    args: ['--no-sandbox', `--ignore-certificate-errors-spki-list=${SPKI}`],
  });
  const ctx = await b.newContext({ viewport: { width: 1440, height: 1000 }, locale: 'de-AT' });
  const out = [];
  fs.mkdirSync(path.join(HS, 'pages_dom'), { recursive: true });
  for (const u of urls) {
    const enc = encodeURI(decodeURI(u));
    const p = await ctx.newPage();
    let status = null, text = '', igText = '';
    try {
      const r = await p.goto(enc, { waitUntil: 'load', timeout: 90000 });
      status = r && r.status();
      await p.waitForTimeout(2500);
      for (let y = 0; y < 15000; y += 900) { await p.evaluate(v => window.scrollTo(0, v), y); await p.waitForTimeout(250); }
      await p.waitForTimeout(2000);
      text = await p.evaluate(() => document.body.innerText);
      // text inside the Instagram feed widget, if any (the widget root has the comp id seen in SSR)
      igText = await p.evaluate(() => {
        const roots = [...document.querySelectorAll('[id^="comp-mlfmi4cs"]')];
        return roots.map(r => r.innerText).join('\n');
      });
    } catch (e) { text = 'ERROR ' + String(e).slice(0, 120); }
    await p.close();
    const slug = (new URL(u).pathname.replace(/^\//, '').replace('product-page/', 'product-') || 'home');
    fs.writeFileSync(path.join(HS, 'pages_dom', decodeURIComponent(slug) + '.txt'), text);
    const rec = { url: u, status, chars: text.length, control_HealthySecrets: (text.match(/Healthy Secrets/g) || []).length, control_Impressum: (text.match(/Impressum/g) || []).length };
    for (const t of TERMS) {
      const all = (text.split(t).length - 1);
      const inIg = (igText.split(t).length - 1);
      rec[t] = `${all - inIg}${inIg ? ' (+' + inIg + ' in IG widget)' : ''}`;
    }
    out.push(rec);
    console.log(JSON.stringify(rec));
    await new Promise(r => setTimeout(r, 4000));
  }
  fs.writeFileSync(path.join(HS, 'cafe_check_dom.json'), JSON.stringify(out, null, 1));
  await b.close();
})();
