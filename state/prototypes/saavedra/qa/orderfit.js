// every format, appetite and headcount at four widths. No box may sit outside the table, the box count and the ticket
// total must match the card sums worked out here independently, and the form must carry the same headcount and format.
const { chromium } = require('playwright');
const P12 = 40.9, P6 = 20.9, DEAL = { classic: 13.9, miamor: 15.9 }, DRINK = { quilmes: 6.5, limonade: 4.5, none: 0 };
const fr = v => v.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(/ /g, ' ') + ' €';
(async () => {
  const b = await chromium.launch(); let bad = 0, runs = 0;
  for (const w of [1440, 1024, 390, 320]) {
    const p = await b.newPage({ viewport: { width: w, height: 900 }, reducedMotion: 'reduce' }); const errs = []; p.on('pageerror', e => errs.push(String(e)));
    await p.goto('http://localhost:8791/entreprises/', { waitUntil: 'networkidle' });
    const cases = [];
    for (const k of [2, 3, 4]) for (const n of [1, 4, 5, 9, 17, 20, 33, 40, 61, 80, 99, 120, 160]) cases.push(['bureau', k, n, 'quilmes', 'classic']);
    for (const n of [1, 4, 12, 25, 40, 41, 80, 120]) for (const deal of ['classic', 'miamor']) cases.push(['dejeuner', 3, n, 'quilmes', deal]);
    for (const n of [4, 15, 33, 60]) for (const drink of ['quilmes', 'limonade', 'none']) cases.push(['afterwork', 3, n, drink, 'classic']);
    for (const [fmt, k, n, drink, deal] of cases) {
      const r = await p.evaluate(async ([fmt, k, n, drink, deal]) => {
        const click = s => { const e = document.querySelector(s); e.checked = true; e.dispatchEvent(new Event('change', { bubbles: true })); };
        click('input[name="o-format"][value="' + fmt + '"]');
        if (fmt !== 'dejeuner') click('input[name="o-k"][value="' + k + '"]');
        if (fmt === 'dejeuner') click('input[name="o-deal"][value="' + deal + '"]');
        if (fmt === 'afterwork') click('input[name="o-drink"][value="' + drink + '"]');
        const big = document.querySelector('[data-o-big]'); big.focus();
        big.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', bubbles: true }));
        await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
        const f = document.querySelector('#devis [data-pers]'); f.value = n; f.dispatchEvent(new Event('change', { bubbles: true }));
        await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
        const st = document.querySelector('.tb-boxes').getBoundingClientRect();
        const bx = [...document.querySelectorAll('[data-o-stack] .bx')];
        const out = bx.filter(e => { const r = e.getBoundingClientRect(); return r.top < st.top - 1 || r.bottom > st.bottom + 1 || r.left < st.left - 1 || r.right > st.right + 1; }).length;
        return { boxes: bx.length, out, total: document.querySelector('[data-t-total]').textContent, n: document.querySelector('[data-o="n"]').textContent, formN: f.value, formFmt: (document.querySelector('#devis input[name="format"]:checked') || {}).value, cmd: document.querySelector('#devis input[name="commande"]').value };
      }, [fmt, k, n, drink, deal]);
      let want, total;
      if (fmt === 'dejeuner') { want = n; total = n * DEAL[deal]; }
      else { const e = n * k; let b12 = Math.floor(e / 12), rr = e - b12 * 12, b6 = 0; if (rr > 6) b12++; else if (rr > 0) b6 = 1; want = b12 + b6; total = b12 * P12 + b6 * P6 + (fmt === 'afterwork' ? n * DRINK[drink] : 0); }
      const okTotal = r.total === fr(total), okForm = r.formN === String(n) && r.formFmt === fmt && r.n === String(n) && r.cmd.includes(fr(total));
      runs++;
      if (r.out || r.boxes !== want || !okTotal || !okForm) { bad++; console.log(w, fmt, k, n, drink, deal, 'want', want, fr(total), JSON.stringify(r).slice(0, 300)); }
    }
    if (errs.length) { bad++; console.log(w, 'page errors', errs.slice(0, 2)); }
    await p.close();
  }
  console.log('runs', runs, 'failed', bad); await b.close();
})();
