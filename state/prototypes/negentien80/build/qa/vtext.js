// dump all visible text (after a search and a submitted form) plus alt, aria-label, placeholder, title, option text
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const SPKI = require('/home/user/astra-agency/tools/proxy-ca-spki')();
(async () => {
  const b = await chromium.launch({ args: ['--no-sandbox', `--ignore-certificate-errors-spki-list=${SPKI}`] });
  const p = await b.newPage({ viewport: { width: 1440, height: 1000 } });
  await p.goto(process.argv[2], { waitUntil: 'networkidle' });
  const grab = async () => p.evaluate(() => {
    const t = document.body.innerText;
    const attrs = [...document.querySelectorAll('[alt],[aria-label],[placeholder],[title]')].map(e => ['alt', 'aria-label', 'placeholder', 'title'].map(a => e.getAttribute(a)).filter(Boolean).join(' | '));
    const svgt = [...document.querySelectorAll('svg text, svg title')].map(e => e.textContent);
    const opts = [...document.querySelectorAll('option')].map(o => o.textContent);
    return [t, attrs.join('\n'), svgt.join('\n'), opts.join('\n'), document.title, document.querySelector('meta[name=description]').content].join('\n');
  });
  let out = await grab();
  // states: plooi hints, banen text, search result, form errors, done
  await p.locator('input[name=plooi][value=wave]').check({ force: true }); await p.locator('input[name=rail][value=roede]').check({ force: true });
  await p.fill('#hoogte', '320'); out += '\n' + await grab();
  await p.locator('input[name=plooi][value=ringen]').check({ force: true }); await p.locator('input[name=rail][value=wand]').check({ force: true }); out += '\n' + await grab();
  await p.fill('#q', 'xyzqq'); await p.click('#searchform button'); await p.waitForTimeout(2500); out += '\n' + await grab();
  await p.fill('#q', '5481 EH'); await p.click('#searchform button'); await p.waitForTimeout(2500);
  await p.click('#send'); out += '\n' + await grab();
  await p.fill('#naam', 'A'); await p.fill('#mail', 'a@b.nl'); await p.check('#ok'); await p.click('#send'); await p.waitForTimeout(200); out += '\n' + await grab();
  process.stdout.write(out);
  await b.close();
})();
