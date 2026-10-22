// Print every draft reply, letter, summary and document list the app writes, so the Dutch can be read in full.
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox'] });
  const p = await b.newPage({ viewport: { width: 1280, height: 900 } }); const errs = []; p.on('pageerror', e => errs.push(String(e)));
  const B = 'http://127.0.0.1:8765/site-app/';
  await p.goto(B + '#/bureau'); await p.evaluate(() => localStorage.clear()); await p.reload(); await p.waitForTimeout(400);
  const dump = async (id) => {
    await p.goto(B + '#/bureau/' + id); await p.waitForTimeout(300);
    return p.evaluate(() => ({
      title: document.querySelector('.card h2').textContent,
      chips: [...document.querySelectorAll('.card-head .chip')].map(c => c.textContent.trim()).join(' | '),
      summary: [...document.querySelectorAll('.summary li')].map(l => l.textContent).join(' / '),
      terms: [...document.querySelectorAll('.card .term')].map(t => t.innerText.replace(/\s+/g, ' ')).join('\n    '),
      conflict: document.querySelector('.conflict').innerText.replace(/\s+/g, ' '),
      docs: [...document.querySelectorAll('.docs li')].map(l => l.textContent).join(' / '),
      draft: document.querySelector('#draft').value,
      letter: document.querySelector('.letter').innerText
    }));
  };
  for (const id of ['s1', 's2', 's3', 's4']) { const d = await dump(id); console.log('\n######## ' + id + ' ' + d.title + '  [' + d.chips + ']\nSUMMARY ' + d.summary + '\nTERMS\n    ' + d.terms + '\nCONFLICT ' + d.conflict + '\nDOCS ' + d.docs + '\n--- DRAFT\n' + d.draft + (id === 's4' || id === 's2' ? '\n--- LETTER\n' + d.letter : '')); }
  // pasted, the example and a planted UWV refusal
  for (const [txt, src] of [[null, 'E-mail'], ['Beste mevrouw De Jong,\n\nUWV heeft op 3 oktober de ontslagvergunning geweigerd die mijn werkgever Marlo Transport BV had aangevraagd. Wat betekent dit voor mij?\n\nGroet,\nSanne Weerts', 'Website']]) {
    await p.goto(B + '#/bureau'); await p.click('[data-act=paste]');
    if (txt) await p.fill('#pv', txt); else await p.click('[data-m=ex]');
    await p.selectOption('#ps', src); await p.click('[data-m=go]'); await p.waitForTimeout(400);
    const id = decodeURIComponent(p.url().split('#/bureau/')[1]); const d = await dump(id);
    console.log('\n######## pasted ' + d.title + '  [' + d.chips + ']\nSUMMARY ' + d.summary + '\nTERMS\n    ' + d.terms + '\nDOCS ' + d.docs + '\n--- DRAFT\n' + d.draft);
  }
  console.log('\nerrors', JSON.stringify(errs));
  await b.close();
})();
