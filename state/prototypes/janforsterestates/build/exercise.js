const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const BASE = process.env.BASE || 'http://127.0.0.1:8791/index.html';
const OUT = process.argv[2] || 'shots';
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox'] });
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  const p = await ctx.newPage(); const errs = [];
  p.on('pageerror', e => errs.push(String(e)));
  await p.goto(BASE, { waitUntil: 'networkidle' }); await p.waitForTimeout(800);
  const read = async () => p.evaluate(() => ({
    range: document.getElementById('rh').innerText.replace(/\s+/g, ' '),
    desc: document.getElementById('rDesc').innerText, pos: document.getElementById('rPos').innerText,
    facts: [...document.querySelectorAll('#facts div')].map(d => d.innerText.replace(/\n/g, ' | ')),
    err: document.getElementById('pcErr').innerText, ex: !document.getElementById('exlabel').hidden,
    dots: document.querySelectorAll('#resChart circle').length, rects: document.querySelectorAll('#resChart rect').length,
    branchSales: document.getElementById('brSales').classList.contains('on'), branchLet: document.getElementById('brLet').classList.contains('on'),
    msg: document.getElementById('msg').value, bpc: document.getElementById('bpc').value, cap: document.getElementById('resCap').innerText
  }));
  console.log('INITIAL', JSON.stringify(await read()));
  const sets = [
    { name: 'A NE3 5TT semi 3 good', mode: 'sell', pc: 'NE3 5TT', type: 'S', bed: '3', cond: '0', extras: [] },
    { name: 'B NE30 4BA terraced 2 needs updating', mode: 'sell', pc: 'NE30 4BA', type: 'T', bed: '2', cond: '-1', extras: [] },
    { name: 'C NE25 detached 5 renovated + drive + ext', mode: 'sell', pc: 'ne25 8hy', type: 'D', bed: '5', cond: '1', extras: ['drive', 'ext'] },
    { name: 'D NE2 flat 1 good (outcode only)', mode: 'sell', pc: 'NE2', type: 'F', bed: '1', cond: '0', extras: [] },
    { name: 'E small sample NE26 detached 4', mode: 'sell', pc: 'NE26 2AB', type: 'D', bed: '4', cond: '0', extras: [] },
    { name: 'F LET NE6 5HY flat 2 good', mode: 'let', pc: 'NE6 5HY', type: 'F', bed: '2', cond: '0', extras: [] },
    { name: 'G LET NE29 semi 3 renovated + garden', mode: 'let', pc: 'NE29 8QA', type: 'S', bed: '3', cond: '1', extras: ['garden'] },
    { name: 'H non NE postcode', mode: 'sell', pc: 'SW1A 1AA', type: 'S', bed: '3', cond: '0', extras: [] },
    { name: 'I junk', mode: 'sell', pc: 'hello', type: 'S', bed: '3', cond: '0', extras: [] },
    { name: 'J unknown NE outcode', mode: 'sell', pc: 'NE99 1AA', type: 'S', bed: '3', cond: '0', extras: [] },
  ];
  let extrasOn = [];
  for (const s of sets) {
    await p.click(`.seg button[data-mode="${s.mode}"]`);
    await p.fill('#pc', s.pc);
    await p.click(`.types [data-type="${s.type}"]`);
    await p.click(`.beds [data-bed="${s.bed}"]`);
    await p.click(`.conds [data-cond="${s.cond}"]`);
    for (const x of ['drive', 'ext', 'garden']) {
      const on = await p.getAttribute(`.chips [data-extra="${x}"]`, 'aria-pressed') === 'true';
      if (on !== s.extras.includes(x)) await p.click(`.chips [data-extra="${x}"]`);
    }
    await p.click('#tool .go'); await p.waitForTimeout(500);
    console.log(s.name, JSON.stringify(await read()));
    if (s.name.startsWith('C') || s.name.startsWith('F')) await (await p.$('#result')).screenshot({ path: `${OUT}/ex_${s.name[0]}.png` });
  }
  // booking form: empty submit, then valid
  await p.click('#bookForm .go'); await p.waitForTimeout(200);
  console.log('FORM EMPTY', await p.innerText('#formErr'));
  await p.fill('#fn', 'Test'); await p.fill('#ln', 'Person'); await p.fill('#addr', '1 Test Street'); await p.fill('#bpc', 'NE3 1AA'); await p.fill('#ph', '0191 000 0000'); await p.fill('#em', 'test@example.com');
  await p.click('#bookForm .go'); await p.waitForTimeout(200);
  console.log('FORM NO CONSENT', await p.innerText('#formErr'));
  await p.check('#ok'); await p.click('#bookForm .go'); await p.waitForTimeout(200);
  console.log('FORM DONE', await p.innerText('#done'));
  await (await p.$('#book')).screenshot({ path: `${OUT}/ex_book.png` });
  console.log('ERRORS', JSON.stringify(errs));
  await b.close();
})();
