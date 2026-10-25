// node form.js   the one step quote request end to end on every page that has it, POSTs intercepted (nothing reaches Netlify).
const { chromium } = require('playwright');
const H = 'http://localhost:8791';
(async () => {
  const b = await chromium.launch();
  const out = [];
  const T = (name, ok, info) => { out.push([ok ? 'PASS' : 'FAIL', name, info === undefined ? '' : JSON.stringify(info)]); };
  async function page(path, status, w) {
    const p = await b.newPage({ viewport: { width: w || 1280, height: 900 } });
    const posts = [], errs = [];
    p.on('pageerror', e => errs.push(String(e)));
    await p.route('**/*', r => { if (r.request().method() === 'POST') { posts.push(r.request().postData()); return r.fulfill({ status, body: 'x' }); } return r.continue(); });
    await p.goto(H + path, { waitUntil: 'networkidle' });
    return { p, posts, errs };
  }
  const val = (p, s) => p.$eval(s, e => e.value);
  const fmt = p => p.$eval('[data-form] input[name="format"]:checked', e => e.value);
  const tomorrow = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Paris' }).format(new Date(Date.now() + 86400000));
  const later = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Paris' }).format(new Date(Date.now() + 20 * 86400000));

  // 1. what arrives in the address
  { const { p, errs } = await page('/devis/?personnes=35&format=afterwork', 200);
    T('prefill personnes and format from the address', (await val(p, '[data-pers]')) === '35' && (await fmt(p)) === 'afterwork', [await val(p, '[data-pers]'), await fmt(p)]);
    T('earliest date is tomorrow, Paris time', (await p.$eval('[data-form] input[name="date"]', e => e.min)) === tomorrow, await p.$eval('[data-form] input[name="date"]', e => e.min));
    T('no page errors 1', !errs.length, errs); await p.close(); }
  { const { p } = await page('/devis/?personnes=abc&format=%3Cscript%3E', 200);
    T('bad address values ignored', (await val(p, '[data-pers]')) === '20' && (await fmt(p)) === 'bureau', [await val(p, '[data-pers]'), await fmt(p)]); await p.close(); }
  { const { p } = await page('/privatisation/', 200);
    T('private hire page starts on privatisation', (await fmt(p)) === 'privatisation', await fmt(p)); await p.close(); }

  // 2. the order on Entreprises hands everything to the form on the same page
  { const { p, errs } = await page('/entreprises/', 200);
    await p.$eval('[data-o-range]', e => { e.value = 47; e.dispatchEvent(new Event('input')); });
    await p.waitForTimeout(200);
    await p.click('.tk [data-o-go]'); await p.waitForTimeout(1400);
    const st = await p.evaluate(() => ({ pers: document.querySelector('#devis [data-pers]').value, fmt: document.querySelector('#devis input[name="format"]:checked').value, top: Math.round(document.getElementById('devis').getBoundingClientRect().top), cmd: document.querySelector('#devis input[name="commande"]').value, bon: document.querySelector('[data-bon-txt]').textContent, focus: document.activeElement.name }));
    T('order sets headcount, format and the order line, scrolls to the form, focuses the date', st.pers === '47' && st.fmt === 'bureau' && Math.abs(st.top) < 120 && /12 × Box de 12/.test(st.cmd) && /47 personnes/.test(st.bon) && st.focus === 'date', st);
    await p.click('input[name="o-format"][value="afterwork"]', { force: true }); await p.waitForTimeout(200);
    T('format chosen in the order reaches the form', await fmt(p) === 'afterwork', await fmt(p));
    T('no page errors 2', !errs.length, errs); await p.close(); }
  { const { p } = await page('/entreprises/?personnes=12&format=dejeuner', 200);
    const st = await p.evaluate(() => ({ n: document.querySelector('[data-o="n"]').textContent, pers: document.querySelector('#devis [data-pers]').value, fmt: document.querySelector('#devis input[name="format"]:checked').value, cmd: document.querySelector('#devis input[name="commande"]').value }));
    T('address headcount and format reach the order and the form', st.n === '12' && st.pers === '12' && st.fmt === 'dejeuner' && /12 × Saavedra Classic/.test(st.cmd), st); await p.close(); }

  // 3. stepper
  { const { p } = await page('/devis/', 200);
    await p.click('[data-step="1"]'); await p.click('[data-step="1"]');
    const up = await val(p, '[data-pers]');
    await p.fill('[data-pers]', '1'); await p.click('[data-step="-1"]');
    T('stepper adds and never goes under 1', up === '22' && (await val(p, '[data-pers]')) === '1', [up, await val(p, '[data-pers]')]); await p.close(); }

  // 4. validation
  { const { p, posts } = await page('/devis/', 200);
    await p.click('.fm-go'); await p.waitForTimeout(150);
    const st = await p.evaluate(() => ({ n: document.querySelector('[name="nom"]').getAttribute('aria-invalid'), c: document.querySelector('[name="contact"]').getAttribute('aria-invalid'), d: document.querySelector('[name="date"]').getAttribute('aria-invalid'), e: [...document.querySelectorAll('.fm-e.on')].length, focus: document.activeElement.name }));
    T('empty submit flags name, contact and date and focuses name', st.n === 'true' && st.c === 'true' && st.d === 'true' && st.e === 3 && st.focus === 'nom', st);
    T('empty submit sends nothing', posts.length === 0, posts.length);
    for (const [v, good] of [['abc', false], ['12345', false], ['06 12 34 56 78', true], ['+33 9 86 00 00 00', true], ['a@b', false], ['julien@example.fr', true]]) {
      await p.fill('[name="contact"]', v); await p.$eval('[name="contact"]', e => e.dispatchEvent(new Event('blur')));
      const inv = await p.$eval('[name="contact"]', e => e.getAttribute('aria-invalid'));
      T(`contact "${v}" ${good ? 'accepted' : 'refused'}`, (inv === 'false') === good, inv);
    }
    await p.close(); }

  // 5. honeypot
  { const { p, posts } = await page('/devis/', 200);
    await p.fill('[name="nom"]', 'Test'); await p.fill('[name="contact"]', '06 12 34 56 78'); await p.fill('[name="date"]', later);
    await p.$eval('input[name="website"]', e => e.value = 'spam');
    await p.click('.fm-go'); await p.waitForTimeout(300);
    T('honeypot sends nothing', posts.length === 0, posts.length);
    T('honeypot still sees thanks', await p.$eval('[data-form-ok]', e => !e.hidden)); await p.close(); }

  // 6. a good request on every page with the form, French and English
  for (const [path, pg, f, lang] of [['/devis/', 'devis', 'bureau', 'fr'], ['/entreprises/', 'entreprises', 'bureau', 'fr'], ['/entreprises/?lang=en', 'entreprises', 'bureau', 'en'], ['/privatisation/', 'privatisation', 'privatisation', 'fr'], ['/devis/?lang=en', 'devis', 'bureau', 'en']]) {
    const { p, posts, errs } = await page(path, 200);
    await p.fill('[name="nom"]', 'Test Personne'); await p.fill('[name="entreprise"]', 'Test SAS'); await p.fill('[name="contact"]', 'test@example.fr'); await p.fill('[name="date"]', later);
    if (await p.$('[name="message"]')) await p.fill('[name="message"]', 'Pot de départ');
    await p.click('.fm-go'); await p.waitForTimeout(500);
    const body = Object.fromEntries(new URLSearchParams(posts[0] || ''));
    T(`${path} posts once`, posts.length === 1, posts.length);
    T(`${path} order line ${pg === 'entreprises' ? 'carried' : 'empty'}`, pg === 'entreprises' ? /5 × Box (de|of) 12/.test(body.commande || '') && /204[.,]50/.test(body.commande || '') : body.commande === '', body.commande);
    T(`${path} body complete`, body['form-name'] === 'devis' && body.nom === 'Test Personne' && body.entreprise === 'Test SAS' && body.contact === 'test@example.fr' && body.date === later && body.personnes === '20' && body.format === f && body.langue === lang && body.page === pg && body.website === '', body);
    const st = await p.evaluate(() => ({ formHidden: document.querySelector('[data-form]').hidden, ok: !document.querySelector('[data-form-ok]').hidden, focus: document.activeElement === document.querySelector('[data-form-ok]') }));
    T(`${path} thanks shown and focused`, st.formHidden && st.ok && st.focus, st);
    T(`${path} no page errors`, !errs.length, errs);
    await p.close();
  }

  // 7. failure, the request becomes a ready written mail
  for (const lang of ['fr', 'en']) {
    const { p, posts } = await page('/devis/' + (lang === 'en' ? '?lang=en' : ''), 500);
    await p.fill('[name="nom"]', 'Test Personne'); await p.fill('[name="contact"]', 'test@example.fr'); await p.fill('[name="date"]', later);
    await p.click('.fm-go'); await p.waitForTimeout(500);
    const st = await p.evaluate(l => ({ fail: !document.querySelector('[data-form-fail]').hidden, href: document.querySelector('[data-form-fail] .l-' + l + ' [data-form-mailto]').href, btn: document.querySelector('.fm-go').disabled, formShown: !document.querySelector('[data-form]').hidden }), lang);
    const m = decodeURIComponent(st.href);
    T(`failure ${lang} shows the fallback, form kept, button back`, st.fail && st.formShown && !st.btn, st);
    T(`failure ${lang} mail carries the request`, m.startsWith('mailto:Contact@saavedraparis.fr?subject=' + (lang === 'en' ? 'Quote request' : 'Demande de devis')) && m.includes('Test Personne') && m.includes('test@example.fr') && m.includes(later), m);
    T(`failure ${lang} attempted one POST`, posts.length === 1); await p.close();
  }

  // 8. without JavaScript the form still posts to Netlify and lands on the thank you page
  { const c = await b.newContext({ javaScriptEnabled: false }); const p = await c.newPage();
    await p.goto(H + '/devis/');
    const f = await p.$eval('form[name="devis"]', e => ({ action: e.getAttribute('action'), method: e.getAttribute('method'), netlify: e.getAttribute('data-netlify'), hidden: e.querySelector('[name="form-name"]').value }));
    const r = await p.goto(H + '/devis/merci/');
    T('no JS form is a real Netlify form with a thank you page', f.action === '/devis/merci/' && f.method === 'POST' && f.netlify === 'true' && f.hidden === 'devis' && r.status() === 200, f);
    await c.close(); }

  out.forEach(r => console.log(r.join('  ')));
  console.log('failed', out.filter(r => r[0] === 'FAIL').length, 'of', out.length);
  await b.close();
})();
