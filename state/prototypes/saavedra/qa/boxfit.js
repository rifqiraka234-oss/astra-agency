// every headcount and appetite at four widths, no box may sit outside the board
const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch(); let bad = 0, runs = 0;
  for (const w of [1440, 1024, 390, 320]) {
    const p = await b.newPage({ viewport: { width: w, height: 900 }, reducedMotion: 'reduce' }); const errs = []; p.on('pageerror', e => errs.push(String(e)));
    await p.goto('http://localhost:8791/entreprises/', { waitUntil: 'networkidle' });
    for (const k of [2, 3, 4]) for (const n of [4, 5, 9, 17, 20, 33, 40, 61, 80, 99, 120]) {
      const r = await p.evaluate(([n, k]) => {
        document.querySelector('input[name="faim"][value="' + k + '"]').click();
        const s = document.querySelector('#bb-n'); s.value = n; s.dispatchEvent(new Event('input'));
        const st = document.querySelector('.bb-stage').getBoundingClientRect();
        const bx = [...document.querySelectorAll('.bx')];
        const out = bx.filter(e => { const r = e.getBoundingClientRect(); return r.top < st.top - 1 || r.bottom > st.bottom + 1 || r.left < st.left - 1 || r.right > st.right + 1; }).length;
        const e = n * k; let b12 = Math.floor(e / 12), r = e - b12 * 12, b6 = 0; if (r > 6) b12++; else if (r > 0) b6 = 1;
        return { boxes: bx.length, want: b12 + b6, out, txt: document.querySelector('[data-box-out]').textContent, e: getComputedStyle(document.querySelector('[data-box-stack]')).getPropertyValue('--e') };
      }, [n, k]);
      runs++; if (r.out || r.boxes !== r.want || r.boxes === 0) { bad++; console.log(w, n, k, JSON.stringify(r)); }
    }
    if (errs.length) { bad++; console.log(w, 'page errors', errs.slice(0, 2)); }
    await p.close();
  }
  console.log('runs', runs, 'with boxes off the board', bad); await b.close();
})();
