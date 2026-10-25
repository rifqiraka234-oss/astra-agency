// node clip.js   text that spills out of its own box (a word wider than its cell), every page, both languages, 1440/1024/390/360.
// Each load first plants a control, a 40px box holding a long German word, and the run only counts if the control is caught.
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox'] });
  const pages = ['/', '/entreprises/', '/privatisation/', '/devis/', '/devis/merci/', '/menu/', '/equipe/', '/commander/', '/mentions-legales/', '/confidentialite/'].map(x => ['http://127.0.0.1:8791', x]).concat(process.env.PLAN ? [['http://127.0.0.1:8792', '/']] : []);
  let bad = 0, ctl = 0, runs = 0;
  for (const w of [1440, 1024, 390, 360]) for (const lang of ['fr', 'en']) for (const [host, path] of pages) {
    const p = await b.newPage({ viewport: { width: w, height: 900 }, reducedMotion: 'reduce' });
    await p.goto(host + path + (lang === 'en' ? '?lang=en' : ''), { waitUntil: 'networkidle' });
    await p.evaluate(async () => { for (let t = 0; t < document.body.scrollHeight; t += 500) { scrollTo(0, t); await new Promise(r => setTimeout(r, 15)); } });
    const r = await p.evaluate(() => {
      const c = document.createElement('div'); c.id = 'clip-ctl'; c.style.cssText = 'width:40px;position:absolute;left:0;top:0'; c.innerHTML = '<span style="display:block">Établissements</span>'; document.body.appendChild(c);
      const out = [];
      document.querySelectorAll('body *').forEach(e => {
        if (!e.getClientRects().length) return;
        const s = getComputedStyle(e);
        if (s.visibility === 'hidden' || s.display === 'inline' || s.display === 'contents') return;
        if (!['visible', 'clip', 'hidden'].includes(s.overflowX) && !(s.overflowX === 'auto' || s.overflowX === 'scroll') ) return;
        if (s.overflowX === 'auto' || s.overflowX === 'scroll') return;
        const own = [...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim()) || [...e.children].some(k => getComputedStyle(k).display === 'inline' && k.textContent.trim());
        if (!own || e.closest('svg, .sr, .fm-hp, .skip')) return;
        let vh = false; for (let a = e; a && !vh; a = a.parentElement) { const c = getComputedStyle(a); vh = c.position === 'absolute' && c.clip !== 'auto' && a.getBoundingClientRect().width <= 1; }
        if (vh) return;   // visually hidden on purpose, read by screen readers only
        if (e.scrollWidth > e.clientWidth + 1 && e.clientWidth > 0) out.push((e.id || e.tagName) + '.' + (typeof e.className === 'string' ? e.className : '') + ' "' + e.textContent.trim().slice(0, 30) + '" ' + e.scrollWidth + '>' + e.clientWidth);
      });
      c.remove();
      return out;
    });
    runs++;
    const caught = r.some(x => x.startsWith('SPAN.') && x.includes('Établissements')) || r.some(x => x.includes('clip-ctl'));
    if (caught) ctl++;
    const real = r.filter(x => !x.includes('Établissements" ') || !x.startsWith('SPAN.') ? !x.includes('"Établissements"') || true : false).filter(x => !(x.startsWith('SPAN.') && x.includes('"Établissements"')));
    if (real.length) { bad++; console.log(w, lang, host.slice(-4), path, JSON.stringify(real.slice(0, 6))); }
    await p.close();
  }
  console.log('runs', runs, 'control caught', ctl, 'loads with clipped text', bad);
  await b.close();
})();
