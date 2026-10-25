// Fae Club functional checks. usage: node fae-func.js <base url> [plant]
// Every expected sum is worked out here from build/data/site.json. With "plant", each check gets a fault first and
// must FAIL, so a pass in normal mode means the check can see.
const { chromium } = require('playwright');
const fs = require('fs');
const base = process.argv[2].replace(/\/$/, ''), plant = process.argv[3] === 'plant';
const D = JSON.parse(fs.readFileSync('/home/user/astra-agency/state/prototypes/faeclub/build/data/site.json', 'utf8'));
const res = []; const ok = (n, p, info) => res.push({ n, p: !!p, info });
const gbp = p => '£' + (p / 100).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const split = (t, n) => { const b = Math.floor(t / n); return [t - b * (n - 1)].concat(Array(n - 1).fill(b)); };
const one = t => t.price + t.vat + t.fee;
(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  const p = await ctx.newPage(); const errs = [];
  p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  await p.goto(base + '/', { waitUntil: 'networkidle' }); await p.waitForTimeout(800);
  const txt = s => p.evaluate(s => { const e = document.querySelector(s); return e ? e.textContent.trim() : null; }, s);

  // 1 the hero is the first input, the character writes the cover and the ticket
  if (plant) await p.evaluate(() => document.querySelector('.ch[data-ch="outlaw"]').addEventListener('click', e => e.stopImmediatePropagation(), true));
  await p.click('.ch[data-ch="outlaw"]'); await p.waitForTimeout(300);
  const h1 = await p.evaluate(() => ({ cov: (document.querySelector('.cov-o.on') || {}).dataset ? document.querySelector('.cov-o.on').dataset.ch : null, as: document.querySelector('[data-o="tkas"]').textContent, pressed: document.querySelector('.ch[data-ch="outlaw"]').getAttribute('aria-pressed') }));
  ok('hero choice writes cover and ticket', h1.cov === 'outlaw' && h1.as === 'arriving as an outlaw' && h1.pressed === 'true', h1);

  // 2 the book turns with the scroll and ends in the hall
  if (plant) await p.addStyleTag({ content: '.tale.live .leaf{transform:none!important}' });
  const rot = async f => { await p.evaluate(f => { const t = document.querySelector('[data-tale]'); scrollTo(0, t.offsetTop + (t.offsetHeight - innerHeight) * f); }, f); await p.waitForTimeout(450); return p.evaluate(() => ({ live: document.querySelector('[data-tale]').classList.contains('live'), m: [...document.querySelectorAll('.leaf')].map(l => { const t = getComputedStyle(l).transform; return t === 'none' ? 1 : +t.split(',')[0].replace('matrix3d(', '').replace('matrix(', ''); }), hv: getComputedStyle(document.querySelector('.tale-hall')).visibility, ho: +getComputedStyle(document.querySelector('[data-tale]')).getPropertyValue('--ho') })); };
  const r0 = await rot(0), r1 = await rot(0.45), r2 = await rot(0.999);
  ok('book turns and dives into the hall', r0.live && r0.m[0] > 0.99 && r1.m[0] < -0.99 && r1.m.some(v => v > 0.99) && r2.m.slice(0, -1).every(v => v < -0.99) && r2.hv === 'visible' && r2.ho > 0.9, { r0, r1, r2 });

  // 3 guests, two of you, pay in 3 to the penny
  await p.evaluate(() => document.querySelector('#solo').scrollIntoView()); await p.waitForTimeout(200);
  if (plant) await p.evaluate(() => { const o = document.querySelector('[data-o="now"]'); new MutationObserver(() => { if (o.textContent !== '£1.00') o.textContent = '£1.00'; }).observe(o, { childList: true, characterData: true, subtree: true }); });
  await p.click('#solo [data-q="1"]'); await p.waitForTimeout(250);
  const e = D.events.ftb.tiers[0], tot2 = one(e) * 2, p3 = split(tot2, 3);
  const s3 = await p.evaluate(() => ({ qty: document.querySelector('[data-o="qty"]').textContent, lit: document.querySelectorAll('.g-o.on').length, line: document.querySelector('[data-o="line"]').textContent, total: document.querySelector('.sum [data-o="total"]').textContent, now: document.querySelector('[data-o="now"]').textContent, pay: document.querySelector('[data-o="paybtn"]').textContent, bars: [0, 1, 2].map(i => document.querySelector('[data-o="p' + i + '"]').textContent), sbar: document.querySelector('[data-o="sbar"]').textContent }));
  ok('two guests, pay in 3 sums', s3.qty === '2' && s3.lit === 2 && s3.line === '2 × Enchanted Tier' && s3.total === gbp(tot2) && s3.now === gbp(p3[0]) && s3.pay === 'Pay ' + gbp(p3[0]) + ' now' && JSON.stringify(s3.bars) === JSON.stringify(p3.map(gbp)) && s3.sbar.includes(gbp(p3[0])), { s3, want: { tot: gbp(tot2), p3: p3.map(gbp) } });

  // 4 pay in full, one bar and the whole sum today
  if (plant) await p.evaluate(() => document.querySelector('#spread [data-plan="full"]').addEventListener('click', e => e.stopImmediatePropagation(), true));
  await p.click('#spread [data-plan="full"]'); await p.waitForTimeout(250);
  const s4 = await p.evaluate(() => ({ off: [...document.querySelectorAll('[data-pb] li')].map(l => l.classList.contains('off')), now: document.querySelector('[data-o="now"]').textContent, pressed: [...document.querySelectorAll('[data-plan="full"]')].every(b => b.getAttribute('aria-pressed') === 'true') }));
  ok('pay in full', JSON.stringify(s4.off) === '[false,true,true]' && s4.now === gbp(tot2) && s4.pressed, s4);
  await p.click('#spread [data-plan="three"]').catch(() => {}); await p.waitForTimeout(150);

  // 5 the payment dates are today and the next two months
  const dts = await p.evaluate(() => [1, 2].map(i => document.querySelector('[data-o="d' + i + '"]').textContent));
  const M = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], t = new Date();
  const am = n => { const y = t.getFullYear(), m = t.getMonth() + n, last = new Date(y, m + 1, 0).getDate(); return new Date(y, m, Math.min(t.getDate(), last)); };
  const want5 = [am(1), am(2)].map(d => d.getDate() + ' ' + M[d.getMonth()]);
  if (plant) await p.evaluate(() => { document.querySelector('[data-o="d1"]').textContent = '1 Jan'; });
  const dts2 = plant ? await p.evaluate(() => [1, 2].map(i => document.querySelector('[data-o="d' + i + '"]').textContent)) : dts;
  ok('payment dates', JSON.stringify(dts2) === JSON.stringify(want5), { dts2, want5 });

  // 6 the Night Club in the same checkout, with VAT
  await p.evaluate(() => document.querySelector('#checkout').scrollIntoView()); await p.waitForTimeout(200);
  if (plant) await p.evaluate(() => { document.querySelector('select[data-f="event"]').addEventListener('change', e => e.stopImmediatePropagation(), true); });
  await p.selectOption('select[data-f="event"]', 'nc'); await p.waitForTimeout(250);
  const nc = D.events.nc.tiers[0], ntot = one(nc) * 2, n3 = split(ntot, 3);
  const s6 = await p.evaluate(() => ({ ev: document.querySelector('[data-o="tkev"]').textContent, vat: !document.querySelector('.sum .vat').hidden, vatv: document.querySelector('[data-o="vat"]').textContent, total: document.querySelector('.sum [data-o="total"]').textContent, now: document.querySelector('[data-o="now"]').textContent, radios: [...document.querySelectorAll('input[name="tier"]')].map(i => [i.value, i.checked, i.disabled]) }));
  ok('Night Club in the same checkout', s6.ev === 'The Night Club' && s6.vat && s6.vatv === gbp(nc.vat * 2) && s6.total === gbp(ntot) && s6.now === gbp(n3[0]) && JSON.stringify(s6.radios) === JSON.stringify([['standard', true, false], ['vip', false, true]]), { s6, want: [gbp(ntot), gbp(n3[0])] });
  await p.selectOption('select[data-f="event"]', 'ftb').catch(() => {}); await p.waitForTimeout(200);

  // 7 one stock count, Royal sold out everywhere
  if (plant) await p.evaluate(() => { const r = document.querySelector('input[name="tier"][value="royal"]'); if (r) r.disabled = false; });
  const s7 = await p.evaluate(() => ({ radio: (document.querySelector('input[name="tier"][value="royal"]') || {}).disabled, card: !!document.querySelector('[data-tier="royal"] .sold'), btn: !!document.querySelector('[data-pick="royal"]') }));
  ok('Royal sold out in one place', s7.radio === true && s7.card && !s7.btn, s7);

  // 8 paying issues the QR straight away, and an empty name is caught first
  await p.fill('input[name="name"]', ''); await p.fill('input[name="email"]', 'elle@example.com');
  let unplant = null;
  if (plant) await p.evaluate(() => { window.__stop = e => { e.preventDefault(); e.stopImmediatePropagation(); }; document.querySelector('[data-co]').addEventListener('submit', window.__stop, true); });
  await p.click('.pay'); await p.waitForTimeout(200);
  if (plant) await p.evaluate(() => document.querySelector('[data-co]').removeEventListener('submit', window.__stop, true));
  const s8a = await p.evaluate(() => ({ err: !document.querySelector('[data-co] [data-err]').hidden, paid: document.querySelector('[data-tk]').classList.contains('paid') }));
  if (plant) await p.evaluate(() => { window.qrcode = function () { return { addData() {}, make() {}, getModuleCount() { return 21; }, isDark() { return false; } }; }; });
  await p.fill('input[name="name"]', 'Morgana Vale'); await p.click('.pay'); await p.waitForTimeout(1700);
  const s8 = await p.evaluate(() => { const c = document.querySelector('.qr canvas'), text = c.getAttribute('data-text'); let want = -1; try { const q = qrcode(0, 'M'); q.addData(text); q.make(); want = 0; const n = q.getModuleCount(); for (let r = 0; r < n; r++) for (let k = 0; k < n; k++) if (q.isDark(r, k)) want++; } catch (e) {} const px = c.getContext('2d').getImageData(0, 0, c.width, c.height).data; let dark = 0; for (let i = 0; i < px.length; i += 4) if (px[i] < 80) dark++; return { paid: document.querySelector('[data-tk]').classList.contains('paid'), mods: +c.getAttribute('data-modules'), want, dark, name: document.querySelector('[data-o="tkname"]').textContent, ref: document.querySelector('[data-o="tkref"]').textContent, done: document.querySelector('[data-co]').parentNode.querySelector('[data-done]').textContent }; });
  ok('empty name caught before paying', s8a.err && !s8a.paid, s8a);
  ok('QR issued on payment', s8.paid && s8.mods > 100 && s8.mods === s8.want && s8.dark > 2000 && s8.name === 'Morgana Vale' && /^FTB27-ENC-/.test(s8.ref) && s8.done.includes('elle@example.com') && s8.done.includes('nothing is charged'), s8);

  // 9 the sticky bar shows after the book and hides at the checkout
  const sb = async y => { await p.evaluate(y => scrollTo(0, y), y); await p.waitForTimeout(500); return p.evaluate(() => document.querySelector('[data-sbar]').classList.contains('on')); };
  const atTop = await sb(0);
  const midY = await p.evaluate(() => document.querySelector('#tickets').offsetTop);
  if (plant) await p.addStyleTag({ content: '[data-sbar]{display:none!important}' });
  const mid = await sb(midY);
  const midVis = await p.evaluate(() => { const r = document.querySelector('[data-sbar]').getBoundingClientRect(); return r.height > 0 && r.top < innerHeight; });
  const atCo = await sb(await p.evaluate(() => document.querySelector('#checkout').offsetTop));
  ok('sticky bar shows and hides', !atTop && mid && midVis && !atCo, { atTop, mid, midVis, atCo });

  ok('no script errors on home', errs.length === 0, errs.slice(0, 3));

  // 10 the retreat plan, sums to the penny
  const errs2 = [];
  const r = await ctx.newPage(); r.on('pageerror', e => errs2.push(e.message));
  await r.goto(base + '/valkyrie-retreat/', { waitUntil: 'networkidle' }); await r.waitForTimeout(400);
  const setM = async n => { await r.evaluate(n => { const x = document.querySelector('[data-r="months"]'); x.value = n; x.dispatchEvent(new Event('input')); }, n); await r.waitForTimeout(150); };
  const read = () => r.evaluate(() => ({ b: [...document.querySelectorAll('[data-rb] b')].map(x => x.textContent), tot: document.querySelector('[data-o="rtotal"]').textContent, btn: document.querySelector('[data-o="rpbtn"]').textContent }));
  const R = D.retreat, cases = [];
  if (plant) await r.evaluate(() => { const mr = document.querySelector('[data-r="months"]'); mr.addEventListener('input', e => e.stopImmediatePropagation(), true); });
  for (const [n, f] of [[4, false], [7, false], [4, true], [1, true]]) {
    await r.evaluate(f => { const fr = document.querySelector('[data-r="friend"]'); if (fr.checked !== f) fr.click(); }, f); await setM(n);
    const got = await read(), tot = R.price - (f ? R.friendOff : 0), want = split(tot, n);
    cases.push({ n, f, ok: JSON.stringify(got.b) === JSON.stringify(want.map(gbp)) && got.tot === gbp(tot) && got.btn.endsWith(gbp(want[0])), got, want: want.map(gbp) });
  }
  ok('retreat payment plan sums', cases.every(c => c.ok), cases.filter(c => !c.ok));
  if (plant) await r.evaluate(() => document.querySelector('[data-rp]').addEventListener('submit', e => { e.preventDefault(); e.stopImmediatePropagation(); }, true));
  await r.fill('[data-rp] input[name="name"]', 'Morgana'); await r.fill('[data-rp] input[name="email"]', 'm@example.com'); await r.click('[data-rp] button[type=submit]'); await r.waitForTimeout(200);
  const rd = await r.evaluate(() => document.querySelector('.rt-plan [data-done]').textContent);
  ok('retreat reservation confirms the plan', /Morgana/.test(rd) && /payment/.test(rd) && /nothing is sent/.test(rd), rd);
  ok('no script errors on the retreat', errs2.length === 0, errs2);

  // 11 a past event leaves the site on its own
  const past = await b.newPage(); await past.clock.setFixedTime(new Date('2026-11-02T10:00:00'));
  await past.goto(base + '/', { waitUntil: 'networkidle' });
  if (plant) await past.evaluate(() => { document.getElementById('night-club').hidden = false; });
  const s11 = await past.evaluate(() => ({ card: document.getElementById('night-club').hidden, opt: !!document.querySelector('select[data-f="event"] option[value="nc"]') }));
  ok('past Night Club removed after 30 Oct', s11.card && !s11.opt, s11);

  // 12 nothing sticks out at nine widths, on both pages
  const ow = [];
  for (const u of ['/', '/valkyrie-retreat/']) {
    const q = await b.newPage(); await q.goto(base + u, { waitUntil: 'networkidle' });
    for (const w of [320, 360, 390, 414, 600, 768, 1024, 1280, 1920]) { await q.setViewportSize({ width: w, height: 900 }); await q.waitForTimeout(200); ow.push([u, w, await q.evaluate(() => document.documentElement.scrollWidth - innerWidth)]); }
    if (plant && u === '/') { await q.evaluate(() => { const d = document.createElement('div'); d.style.cssText = 'width:3000px;height:2px'; document.body.appendChild(d); }); ow.push(['plant', 0, await q.evaluate(() => document.documentElement.scrollWidth - innerWidth)]); }
  }
  ok('no overflow at nine widths', ow.every(x => x[2] <= 0), ow.filter(x => x[2] > 0));
  await b.close();
  for (const x of res) console.log((x.p ? 'PASS ' : 'FAIL ') + x.n + (x.p && !plant ? '' : '  ' + JSON.stringify(x.info).slice(0, 500)));
  console.log(res.filter(x => x.p).length + ' of ' + res.length + ' pass' + (plant ? ' (plant mode, every check but the two script error checks should FAIL)' : ''));
})();
