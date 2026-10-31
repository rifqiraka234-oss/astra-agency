// Section 19, checks 4 to 6, each run clean and then against a planted fault it has to catch.
//   node qa/sums.js [base url]      (serve the folder first, default http://127.0.0.1:5310)
// sums: reads offer.json on its own, drives 30 random parties through Home, and compares its own guide band and minimum
//   with the page, the chalk board in the drawer and the hidden fields, to the euro. Plant, a wrong per head figure.
// state: answers made on Home are still there on /menues/ and in the drawer on /referenzen/, the hidden fields carry
//   them. Plant, a field that doesn't update.
// menu: every line, dish, drink and dessert in offer.json is on /menues/ as text, in German and in English. Plant, a
//   dish taken out.
const { chromium } = require('playwright-core');
const fs = require('fs'), path = require('path');
const BASE = (process.argv[2] || 'http://127.0.0.1:5310').replace(/\/$/, '');
const O = JSON.parse(fs.readFileSync(path.join(__dirname, '../offer.json'), 'utf8'));
const out = []; let failed = 0, broken = 0;
const log = (ok, name, detail) => { out.push(`${ok ? 'PASS' : 'FAIL'}  ${name.padEnd(22)} ${detail}`); if (!ok) failed++; };
const plant = (caught, name, detail) => { out.push(`${caught ? 'plant caught' : 'DETECTOR BROKEN'}  ${name.padEnd(14)} ${detail}`); if (!caught) broken++; };

// our own reading of their price page, nothing taken from the site's code
const wed = O.prices.weddings.match(/(\d+) bis (\d+) €/).slice(1).map(Number);
const PP = { hochzeit: wed, empfang: [O.prices.simple_buffet_from_eur_pp, O.prices.typical_high_eur_pp] };
const band = (a, g) => { const pp = PP[a] || [O.prices.typical_low_eur_pp, O.prices.typical_high_eur_pp]; return [Math.max(O.prices.minimum_order_net_eur, g * pp[0]), Math.max(O.prices.minimum_order_net_eur, g * pp[1])]; };
const de = n => n.toLocaleString('de-DE');
const expectText = ([lo, hi]) => hi <= O.prices.minimum_order_net_eur ? `ab ${de(O.prices.minimum_order_net_eur)} €` : `${de(lo)} bis ${de(hi)} €`;
// a seeded random, so a failing party can be replayed
let seed = 20261030; const rnd = () => (seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648;
const pick = a => a[Math.floor(rnd() * a.length)];

async function fresh(b, opt = {}) {
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  if (opt.route) await ctx.route(opt.route.match, opt.route.fn);
  const p = await ctx.newPage(); return p;
}
async function sums(b, planted) {
  const p = await fresh(b, planted ? { route: { match: '**/', fn: async r => { const res = await r.fetch(); let body = await res.text(); body = body.replace(/"lo":45/, '"lo":47'); await r.fulfill({ response: res, body }); } } } : {});
  await p.goto(BASE + '/', { waitUntil: 'load' }); await p.waitForTimeout(600);
  const OCC = ['weihnachtsfeier', 'firmenfeier', 'sommerfest', 'empfang', 'hochzeit', 'geburtstag'], LINES = ['american', 'french', 'fusion', 'unklar'], PLACES = ['buero', 'innenhof', 'lager', 'firmengelaende', 'dachterrasse', 'location'];
  const bad = []; let n = 0;
  for (let i = 0; i < 30; i++) {
    const a = pick(OCC), g = Math.round((30 + rnd() * 1970) / 10) * 10, l = pick(LINES), pl = pick(PLACES);
    await p.evaluate(([a, g, l, pl]) => { document.querySelector(`[data-occ="${a}"]`).click(); const r = document.querySelector('#eat-g'); r.value = g; r.dispatchEvent(new Event('input', { bubbles: true })); document.querySelector(`[data-linie="${l}"]`).click(); document.querySelector(`[data-platz="${pl}"]`).click(); }, [a, g, l, pl]);
    const r = await p.evaluate(() => { document.querySelector('.hd-ask').click(); const f = document.querySelector('form.enq'); const v = n => f.elements.namedItem(n).value; const res = { page: document.querySelector('.price-band').textContent.trim(), board: [...document.querySelectorAll('.board-lines li')].map(li => li.textContent).find(x => /Richtwert/.test(x)) || '', guests: v('Anzahl_Gaeste'), anlass: v('Anlass'), ort: v('Ort'), menues: v('Ausgewaehlte_Menues'), linie: v('Linie') }; document.querySelector('#anfrage').close(); return res; });
    const want = expectText(band(a, g)); n++;
    const errs = [];
    if (r.page !== want) errs.push(`page "${r.page}"`);
    if (r.board !== 'Richtwert ' + want) errs.push(`board "${r.board}"`);
    if (r.guests !== String(g)) errs.push(`Anzahl_Gaeste ${r.guests}`);
    if (r.anlass !== a) errs.push(`Anlass ${r.anlass}`);
    if (r.linie !== l) errs.push(`Linie ${r.linie}`);
    if (l !== 'unklar' && !r.menues.includes({ american: 'American', french: 'French', fusion: 'Fusion' }[l])) errs.push(`Ausgewaehlte_Menues "${r.menues}"`);
    if (!r.ort) errs.push('Ort empty');
    if (errs.length) bad.push(`${a} ${g} ${l} ${pl}, want "${want}", ${errs.join(', ')}`);
  }
  await p.context().close();
  return { n, bad };
}
async function state(b, planted) {
  const p = await fresh(b, planted ? { route: { match: '**/js/site.js', fn: async r => { const res = await r.fetch(); let body = await res.text(); body = body.replace("v('Anzahl_Gaeste', S.gaeste);", ''); await r.fulfill({ response: res, body }); } } } : {});
  await p.goto(BASE + '/', { waitUntil: 'load' }); await p.waitForTimeout(500);
  await p.evaluate(() => { document.querySelector('[data-occ="sommerfest"]').click(); const r = document.querySelector('#eat-g'); r.value = 240; r.dispatchEvent(new Event('input', { bubbles: true })); document.querySelector('[data-linie="fusion"]').click(); document.querySelector('[data-platz="innenhof"]').click(); });
  await p.goto(BASE + '/menues/', { waitUntil: 'load' }); await p.waitForTimeout(500);
  const m = await p.evaluate(() => ({ bar: document.querySelector('.bar-sum').textContent, hd: document.querySelector('.hd-ask .ask-state').textContent, line: (document.querySelector('[data-linie][aria-checked="true"]') || {}).dataset }));
  await p.evaluate(() => document.querySelector('[data-add="desserts"][data-item="Churros"]').click());
  await p.goto(BASE + '/referenzen/', { waitUntil: 'load' }); await p.waitForTimeout(500);
  const r = await p.evaluate(() => { document.querySelector('.hd-ask').click(); const f = document.querySelector('form.enq'), v = n => f.elements.namedItem(n).value; return { anlass: v('Anlass'), gaeste: v('Anzahl_Gaeste'), linie: v('Linie'), ort: v('Ort'), speisen: v('Ausgewaehlte_Speisen'), menues: v('Ausgewaehlte_Menues'), board: [...document.querySelectorAll('.board-lines li')].map(li => li.textContent).join(' | ') }; });
  await p.context().close();
  const errs = [];
  if (!/Sommerfest/.test(m.bar) || !/240/.test(m.bar) || !/Innenhof/.test(m.bar)) errs.push(`bar on /menues/ "${m.bar}"`);
  if (!/240/.test(m.hd)) errs.push(`header on /menues/ "${m.hd}"`);
  if (!m.line || m.line.linie !== 'fusion') errs.push('line not chosen on /menues/');
  if (r.anlass !== 'sommerfest') errs.push('Anlass ' + r.anlass);
  if (r.gaeste !== '240') errs.push('Anzahl_Gaeste ' + r.gaeste);
  if (r.linie !== 'fusion' || !/Fusion/.test(r.menues)) errs.push(`Linie ${r.linie}, Menues "${r.menues}"`);
  if (!/Innenhof, draußen/.test(r.ort)) errs.push('Ort ' + r.ort);
  if (!/Churros/.test(r.speisen)) errs.push('Ausgewaehlte_Speisen ' + r.speisen);
  return { errs, board: r.board, ort: r.ort, speisen: r.speisen };
}
async function menu(b, planted) {
  const p = await fresh(b, planted ? { route: { match: '**/menues/', fn: async r => { const res = await r.fetch(); let body = await res.text(); body = body.replace(/<li class="rise"><h3><span data-l="de">Originale Currywurst[\s\S]*?<\/li>/, ''); await r.fulfill({ response: res, body }); } } } : {});
  await p.goto(BASE + '/menues/', { waitUntil: 'load' }); await p.waitForTimeout(400);
  const txt = await p.evaluate(() => { const g = l => [...document.querySelectorAll(`main [data-l="${l}"]`)].map(e => e.textContent).join(' \n '); return { de: g('de'), en: g('en'), li: [...document.querySelectorAll('.dishes > li')].map(li => [li.querySelector('h3 [data-l="de"]').textContent, li.querySelector('h3 [data-l="en"]').textContent, li.querySelector('p [data-l="en"]').textContent]) }; });
  await p.context().close();
  const tidy = s => s.replace(/: /g, ', ').trim();
  const want = [...Object.values(O.menu_lines).filter(x => x.label).map(x => [x.label, ...x.items]).flat(), ...O.dishes.mains.map(d => d.name), ...O.dishes.drinks.items.map(d => d.name), ...O.dishes.desserts.items.map(d => d.name), ...O.dishes.addons.items];
  const texts = [...O.dishes.mains, ...O.dishes.drinks.items, ...O.dishes.desserts.items].map(d => tidy(d.text));
  const missing = [...want.filter(w => !txt.de.includes(w)), ...texts.filter(t => !txt.de.replace(/\s+/g, ' ').includes(t.replace(/\s+/g, ' ')))];
  const enEmpty = txt.li.filter(([d, e, t]) => !e.trim() || !t.trim()).map(x => x[0]);
  const count = O.dishes.mains.length + O.dishes.drinks.items.length + O.dishes.desserts.items.length;
  return { missing, enEmpty, items: txt.li.length, count, want: want.length + texts.length };
}

(async () => {
  const b = await chromium.launch({ channel: 'chrome', headless: true });
  const s = await sums(b, false); log(!s.bad.length, 'sums /', `${s.n} random parties, page, chalk board and hidden fields agree with offer.json to the euro${s.bad.length ? '. ' + s.bad.slice(0, 3).join(' | ') : ''}`);
  const sp = await sums(b, true); plant(sp.bad.length > 0, 'sums', `a per head figure of 47 € planted in place of 45 €, ${sp.bad.length} of ${sp.n} parties caught`);
  const st = await state(b, false); log(!st.errs.length, 'state / to /referenzen/', st.errs.length ? st.errs.join(' | ') : `Sommerfest, 240 guests, Fusion and Innenhof from Home, Churros from /menues/, all in the drawer on /referenzen/. Ort "${st.ort}", Speisen "${st.speisen}"`);
  const stp = await state(b, true); plant(stp.errs.length > 0, 'state', 'Anzahl_Gaeste planted so it never updates, caught: ' + (stp.errs[0] || 'NOTHING'));
  const m = await menu(b, false); log(!m.missing.length && !m.enEmpty.length && m.items === m.count, 'menu /menues/', `${m.want} lines, dishes, drinks, desserts and their texts from offer.json found in German, ${m.items} of ${m.count} items each with English${m.missing.length ? ', missing ' + m.missing.slice(0, 4).join(' / ') : ''}${m.enEmpty.length ? ', no English for ' + m.enEmpty.join(', ') : ''}`);
  const mp = await menu(b, true); plant(mp.missing.length > 0 || mp.items !== mp.count, 'menu', `Originale Currywurst planted out of the page, caught: ${mp.missing.slice(0, 2).join(' / ') || mp.items + ' of ' + mp.count}`);
  await b.close();
  const res = out.join('\n') + `\n${failed ? 'FAIL ' + failed : 'PASS'}${broken ? ', DETECTOR BROKEN ' + broken : ', every plant caught'}\n`;
  console.log(res); fs.writeFileSync(path.join(__dirname, 'last-sums.txt'), `qa/sums.js ${new Date().toISOString()}\n` + res);
  process.exit(broken ? 2 : failed ? 1 : 0);
})().catch(e => { console.log('ERROR', e.message); process.exit(2); });
