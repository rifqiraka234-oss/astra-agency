#!/usr/bin/env node
/**
 * Read the Dutch KVK register for a name or KVK number, the statutory check RULES 0B asks for.
 *
 *   node tools/kvk-search.js "sagapo" 96694750
 *
 * kvk.nl/zoeken ignores ?q= in its URL, a plain request to its JSON endpoint is refused with
 * 400 "profileId is required", and the free directories (openkvk, drimble) sit behind
 * Cloudflare. So this renders kvk.nl/zoeken in Chromium, types each query into the box and
 * prints the JSON the page itself receives from web-api.kvk.nl/zoeken/v3/search, one line per
 * registered business: kvkNummer, rechtsvorm, inschrijvingsdatum, address, activity, trade names.
 * Found and tested 2026-10-22 on Sagapo Coffee (98234374) and De Jong - Vanhommerig advocatuur
 * (96694750). An empty result only counts as empty when a known business, run in the same call,
 * comes back.
 */
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const SPKI = require('./proxy-ca-spki')();

(async () => {
  const queries = process.argv.slice(2);
  if (!queries.length) { console.log('usage: node tools/kvk-search.js "<name or KVK number>" [...]'); process.exit(2); }
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
    args: ['--no-sandbox', `--ignore-certificate-errors-spki-list=${SPKI}`] });
  const ctx = await b.newContext({ viewport: { width: 1280, height: 900 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36' });
  const p = await ctx.newPage();
  for (const q of queries) {
    let data = null;
    const onResp = async r => {
      // Only the response for THIS query. On reload the page re-runs the previous search, and
      // without this check the second query printed the first one's result (2026-10-22).
      const u = r.url();
      if (u.includes('web-api.kvk.nl/zoeken/v3/search') &&
          new URL(u).searchParams.get('q') === q) { try { data = await r.json(); } catch (e) {} }
    };
    p.on('response', onResp);
    await p.goto('https://www.kvk.nl/zoeken/', { waitUntil: 'domcontentloaded', timeout: 60000 }).catch(e => console.log('goto', e.message));
    await p.waitForTimeout(4000);
    const c = p.locator('button:has-text("Alleen standaard cookies")').first();
    if (await c.count()) { await c.click().catch(() => {}); await p.waitForTimeout(800); }
    const inp = p.locator('input[type="search"], input[name="q"], input[placeholder*="bedrijfsnaam"]').first();
    await inp.fill(q).catch(e => console.log('fill', e.message));
    await inp.press('Enter').catch(() => {});
    for (let i = 0; i < 20 && !data; i++) await p.waitForTimeout(500);
    p.off('response', onResp);
    const items = (data && data.data && data.data.items) || [];
    console.log(`== "${q}"  ${data ? items.length + ' result(s)' : 'NO RESPONSE CAPTURED, unknown, not empty'}`);
    for (const it of items) {
      const a = it.bezoeklocatie || {};
      console.log(`  KVK ${it.kvkNummer} | ${it.naam} | ${it.rechtsvormOmschrijving || ''} | ${it.inschrijvingstype || ''} | registered ${it.inschrijvingsdatum || '?'} | ${[a.straat, a.huisnummer, a.postcode, a.plaats].filter(Boolean).join(' ')} | ${it.activiteitomschrijving || ''} | names ${(it.huidigeHandelsNamen || []).join(', ')}${it.oudeHandelsnamen ? ' | old ' + it.oudeHandelsnamen.join(', ') : ''}`);
    }
  }
  await b.close();
})();
