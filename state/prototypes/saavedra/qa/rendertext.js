// the copy as a visitor sees it after the scripts ran, every page, both languages: colons, dashes, exclamation marks
const { chromium } = require('playwright');
const pages = ['/', '/entreprises/', '/privatisation/', '/devis/', '/devis/merci/', '/menu/', '/equipe/', '/commander/', '/mentions-legales/', '/confidentialite/'].map(x => ['http://localhost:8791', x]).concat([['http://localhost:8792', '/']]);
const ALLOW = ['Saint-Georges', 'Île-de-France', 'La Casa Deskeo – Victoire', 'Patchwork Sainte-Cécile', 'saavedraparis.fr/click-collect', '/click-collect', 'divinaempanada.com/service-traiteur', 'api-adresse.data.gouv.fr'];
(async () => {
  const b = await chromium.launch(); let flags = 0;
  for (const lang of ['fr', 'en']) for (const [h, path] of pages) {
    const p = await b.newPage({ viewport: { width: 1280, height: 900 }, reducedMotion: 'reduce' });
    await p.goto(h + path + (lang === 'en' ? '?lang=en' : ''), { waitUntil: 'networkidle' });
    await p.evaluate(() => { const s = document.querySelector('#bb-n'); if (s) { s.value = 33; s.dispatchEvent(new Event('input')); } });
    await p.waitForTimeout(300);
    let t = await p.evaluate(() => document.body.innerText);
    if (path === '/' && h.endsWith('8791') && lang === 'fr') t += '\nCONTROL: une phrase – avec un tiret';
    for (const a of ALLOW) t = t.split(a).join('');
    t = t.replace(/https?:\/\/\S+|\S+@\S+/g, '');
    const bad = t.split('\n').filter(l => /[:–—!]/.test(l) || / - /.test(l));
    flags += bad.length;
    if (bad.length) console.log(lang, h.slice(-4), path, JSON.stringify(bad.slice(0, 6)));
    await p.close();
  }
  console.log('flagged lines', flags, '(1 is the planted control)'); await b.close();
})();
