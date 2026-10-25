// node form.js   the kit request end to end. Validation first, then a send that is captured and read, the logo chosen in the
// studio must arrive in the form's file field and in the payload. Then a failed send must offer the whole kit as a mail.
// FAULT=1 expects a gym name the page never had, and the run must fail.
const { chromium } = require('playwright');
const { SITE } = require('./pages');
const fs = require('fs');
(async () => {
  const b = await chromium.launch();
  const fails = [], ok = (c, m) => { if (!c) fails.push(m); };
  const png = '/tmp/claude-0/bb/testlogo.png';
  fs.writeFileSync(png, Buffer.from('iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAKklEQVR42mNk+M9Qz0AEYBxVSF+FjP///2egyMj0MzMw/AflwE0kDGoBAH3vB/7cZSOPAAAAAElFTkSuQmCC', 'base64'));
  for (const mode of ['ok', 'fail']) {
    const p = await b.newPage({ viewport: { width: 1280, height: 900 } });
    let post = null, posts = 0;
    await p.route('**/*', r => { if (r.request().method() === 'POST') { posts++; post = r.request().postDataBuffer(); return r.fulfill({ status: mode === 'ok' ? 200 : 500, body: 'x' }); } return r.continue(); });
    await p.goto(SITE + '/gyms/?gym=Kracht%20Test', { waitUntil: 'networkidle' });
    await p.waitForTimeout(400);
    ok(await p.inputValue('#k-name') === 'Kracht Test', 'name arrives from the address');
    await p.click('label.em-o:has(input[value="logo"])');
    await p.setInputFiles('#k-logo', png);
    await p.waitForTimeout(400);
    const formFile = await p.evaluate(() => { const f = document.querySelector('[data-form-logo]').files; return f.length ? f[0].name : ''; });
    ok(formFile === 'testlogo.png', 'the studio logo copied into the form file field, got ' + formFile);
    ok(await p.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--v-logo').trim() === 'inline'), 'the logo shows on the garment');
    await p.locator('#send').scrollIntoViewIfNeeded();
    ok(await p.inputValue('#f-gym') === 'Kracht Test', 'gym prefilled in the form');
    // validation, nothing sent while the email is missing
    await p.fill('#f-name', 'Sam'); await p.click('.fm-go'); await p.waitForTimeout(300);
    ok(posts === 0, 'nothing sent without an email');
    ok(await p.isVisible('[data-err="email"].on'), 'email error shown');
    await p.fill('#f-mail', 'sam@example.com'); await p.fill('#f-msg', 'Twee kleuren graag');
    await p.click('.fm-go'); await p.waitForTimeout(2600);
    ok(posts === 1, 'one send, got ' + posts);
    const body = post ? post.toString('latin1') : '';
    const field = n => { const m = body.match(new RegExp('name="' + n + '"\\r\\n\\r\\n([\\s\\S]*?)\\r\\n--')); return m ? m[1] : null; };
    ok(field('form-name') === 'kit', 'form-name kit');
    ok(field('gym') === (process.env.FAULT ? 'Nope' : 'Kracht Test'), 'gym in the payload ' + field('gym'));
    ok(field('email') === 'sam@example.com' && field('name') === 'Sam', 'name and email in the payload');
    ok((field('kit') || '').includes('Gym: KRACHT TEST') && (field('kit') || '').includes('Middle: Your logo, testlogo.png') && /Total: \d+/.test(field('kit') || ''), 'kit summary in the payload');
    ok(/name="logo"; filename="testlogo.png"/.test(body), 'logo file in the payload');
    ok(field('language') === 'en', 'language in the payload');
    if (mode === 'ok') {
      ok(await p.isVisible('[data-form-ok]'), 'thanks shown');
      ok(await p.isHidden('form[data-form]'), 'form hidden after sending');
      ok(await p.evaluate(() => document.querySelector('[data-wo-sheet]').classList.contains('stamped')), 'work order stamped');
      ok((await p.textContent('[data-ok-name]')).includes('Sam'), 'thanks by name');
    } else {
      ok(await p.isVisible('[data-form-fail]'), 'failure message shown');
      const href = await p.getAttribute('[data-form-fail] [data-form-mailto]', 'href');
      const mail = decodeURIComponent(href || '');
      ok(mail.startsWith('mailto:BeBettergrowth@gmail.com') && mail.includes('Gym: KRACHT TEST') && mail.includes('Twee kleuren graag') && mail.includes('attach our logo'), 'mail fallback carries the kit ' + mail.slice(0, 80));
      ok(await p.isVisible('form[data-form]'), 'form still there after a failed send');
    }
    await p.close();
  }
  console.log(fails.length ? 'FAIL\n  ' + fails.join('\n  ') : 'PASS');
  await b.close();
  process.exit(fails.length ? 1 : 0);
})();
