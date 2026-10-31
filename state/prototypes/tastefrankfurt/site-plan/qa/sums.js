// The plan's sums. Reads plan.json on its own and recomputes every figure the page shows: the findings, what one party
// and a season of parties are worth at 20 random slider positions, the price line and the weeks. Then the same against a
// planted fault, a minimum order of 1,700 € in place of their 1,800 €, which it has to catch.
//   node qa/sums.js [base url]   (serve the folder first, default http://127.0.0.1:5340)
const { chromium } = require('playwright-core');
const fs = require('fs'), path = require('path');
const BASE = (process.argv[2] || 'http://127.0.0.1:5340').replace(/\/$/, '');
const P = JSON.parse(fs.readFileSync(path.join(__dirname, '../plan.json'), 'utf8'));
const eur = n => Math.round(n).toLocaleString('en-GB') + ' €';
const one = (g, pp) => Math.max(P.prices.minimum_order_net_eur, g * pp);
let seed = 30102026; const rnd = () => (seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648;
const pickStep = (a, b, s) => a + Math.round(rnd() * (b - a) / s) * s;

async function run(b, planted) {
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  if (planted) await ctx.route('**/js/plan.js', async r => { const res = await r.fetch(); const body = (await res.text()).replace('Math.max(D.prices.minimum_order_net_eur, g.guests * g.pp)', 'Math.max(1700, g.guests * g.pp)'); await r.fulfill({ response: res, body }); });
  const p = await ctx.newPage(); await p.goto(BASE + '/', { waitUntil: 'load' }); await p.waitForTimeout(500);
  const text = await p.evaluate(() => document.body.innerText.replace(/\s+/g, ' '));
  const bad = [];
  for (const f of P.findings.filter(f => ['screens', 'pages', 'price', 'reviews'].includes(f.id))) if (!text.includes(f.line)) bad.push('finding missing ' + f.id);
  for (const f of ['screens', 'desktop']) { const v = P.findings.find(x => x.id === f).value; if (!text.includes(String(v))) bad.push(`figure ${v} not on the page`); }
  let n = 0;
  for (let i = 0; i < 20; i++) {
    // the first two are small parties under the minimum order, so the floor is always tested
    const small = [[30, 45], [35, 50]][i], g = small ? small[0] : pickStep(P.worth_defaults.guests_min, P.worth_defaults.guests_max, 5), pp = small ? small[1] : pickStep(P.prices.typical_low_eur_pp, P.prices.typical_high_eur_pp, 1), ev = pickStep(P.worth_defaults.events_min, P.worth_defaults.events_max, 1);
    const r = await p.evaluate(([g, pp, ev]) => { const set = (n, v) => { const e = document.querySelector(`[name="${n}"]`); e.value = v; e.dispatchEvent(new Event('input', { bubbles: true })); }; set('w-guests', g); set('w-pp', pp); set('w-events', ev); return { one: document.querySelector('[data-out="one"]').textContent, season: document.querySelector('[data-out="season"]').textContent, site: document.querySelector('[data-out="site"]').textContent }; }, [g, pp, ev]);
    n++;
    if (r.one !== eur(one(g, pp))) bad.push(`${g} guests at ${pp} €, one party "${r.one}", want "${eur(one(g, pp))}"`);
    if (r.season !== eur(one(g, pp) * ev)) bad.push(`${g} x ${pp} x ${ev}, season "${r.season}", want "${eur(one(g, pp) * ev)}"`);
    const k = P.price_eur / one(g, pp);
    if (P.price_eur && !r.site.includes(k < 1 ? Math.round(k * 100) + ' percent' : k.toFixed(1))) bad.push(`site line "${r.site}"`);
  }
  if (P.price_eur && !text.includes(P.price_eur.toLocaleString('en-GB') + ' € for the whole site')) bad.push('price headline');
  if (P.weeks) { const w = await p.evaluate(() => [...document.querySelectorAll('.phases b')].map(b => parseInt(b.textContent, 10))); if (w.reduce((a, b) => a + b, 0) !== P.weeks) bad.push(`phases add to ${w.join('+')}, not ${P.weeks}`); }
  await ctx.close();
  return { n, bad };
}
(async () => {
  const b = await chromium.launch({ channel: 'chrome', headless: true });
  const c = await run(b, false), pl = await run(b, true);
  await b.close();
  const lines = [
    `${c.bad.length ? 'FAIL' : 'PASS'}  plan sums  ${c.n} slider positions, the findings, ${P.price_eur ? 'the price' : 'no price set yet'}, ${P.weeks ? 'the weeks' : 'no weeks set yet'}, all recomputed from plan.json${c.bad.length ? '. ' + c.bad.slice(0, 4).join(' | ') : ''}`,
    `${pl.bad.length ? 'plant caught' : 'DETECTOR BROKEN'}  a minimum order of 1,700 € planted, ${pl.bad.length} mismatches found`,
  ];
  const res = lines.join('\n') + `\n${c.bad.length ? 'FAIL' : 'PASS'}${pl.bad.length ? ', every plant caught' : ', DETECTOR BROKEN'}\n`;
  console.log(res); fs.writeFileSync(path.join(__dirname, 'last-run.txt'), `qa/sums.js ${new Date().toISOString()}\n` + res);
  process.exit(!pl.bad.length ? 2 : c.bad.length ? 1 : 0);
})().catch(e => { console.log('ERROR', e.message); process.exit(2); });
