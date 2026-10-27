#!/usr/bin/env node
/* The look gate for a prototype, run before Raka sees anything. It fails like check-drafts.py fails a message.

     node tools/check-build.js <site folder or URL> --action "<css>" [--page /path/] [--allow-font "Name"] [--shots dir]
     node tools/check-build.js state/prototypes/x/site --action ".bar a, a[href='#book']" --shots /tmp/x-shots
     --shots writes the first screen at both sizes for the first look, --sections every section for the final look.

   It serves a folder itself, loads each page at 1440x900 and 390x844, and measures what Raka has sent builds back for
   (docs/reviews/2026-10-27-prototype-process-audit.md). The Claude look, from RULES section 5: banned faces, an italic
   half in headlines, a kicker over the headings, pill buttons and chips, arrow glyphs, soft shadow cards, marquees,
   count ups, chapters taking turns light and dark, too many sections. Contrast and dimmed text are axe's job in the full QA. Plain: no art layer at all. The first
   screen: how much of it is their picture, film or mark. The route: the walk test, every half screen from the top to the
   foot with a way to the action that isn't the header, at desktop and phone.

   Then it plants every fault into the same page and runs again. Each check has to fail on its plant, or the run says
   DETECTOR BROKEN and exits 2, because a pass from a check that can't fail means nothing (the absence rule).

   What it can't judge, and nothing here pretends to. Whether the page has a wow moment, feels like what they sell, or
   looks expensive. That's the build card and the first screen Raka sees (docs/build-card.md). This gate only makes sure
   he never sees a build that fails on something a script could have caught.

   Exit 0 pass, 1 a check failed, 2 a detector failed its plant or the page didn't load. */
const { chromium } = require('playwright');
const http = require('http'), fs = require('fs'), path = require('path');

const args = process.argv.slice(2);
const opt = (k, many) => { const v = []; args.forEach((a, i) => { if (a === k) v.push(args[i + 1]); }); return many ? v : v[0]; };
const TARGET = args[0];
if (!TARGET || TARGET.startsWith('--')) { console.log('usage: node tools/check-build.js <site folder or URL> --action "<css>" [--page /x/] [--allow-font Name] [--shots dir] [--sections dir] [--json out] [--no-plant]'); process.exit(2); }
const PAGES = opt('--page', true).length ? opt('--page', true) : ['/'];
const ACTION = opt('--action') || null;
const ALLOW = opt('--allow-font', true).map(s => s.toLowerCase());
const SHOTS = opt('--shots'), JSONOUT = opt('--json'), SECTIONS = opt('--sections');
const PLANT = !args.includes('--no-plant');
const VIEWS = [['desk', 1440, 900], ['phone', 390, 844]];

// The faces RULES section 5 names, plus the template defaults the CustomKit and Hooft & Petiet builds were sent back with.
const BANNED = ['inter', 'space grotesk', 'montserrat', 'poppins', 'archivo', 'nunito', 'roboto', 'open sans', 'lato', 'raleway',
  'dm sans', 'plus jakarta sans', 'manrope', 'anton', 'bebas neue', 'oswald', 'libre caslon display', 'libre caslon text',
  'playfair display', 'dm serif display'];

const LIMITS = {
  italic: 1,      // headlines with an italic part. One can be a quote, two is the AI pattern
  kickerShare: 0.34, // share of headlines with a small caps label right above
  pills: 0,       // pill shaped buttons and links
  chips: 2,       // pill shaped tags and chips
  arrows: 0,      // arrow glyphs in a button or link
  cards: 2,       // rounded boxes with a soft shadow
  sections: 10,   // top level blocks on a home page. RULES section 5 names eleven as the Hooft & Petiet v1 tell
  turns: 4,       // light and dark chapters taking turns
  hero: 0.35,     // share of the first screen that is picture, film, canvas or their mark, at each size
  gaps: 0,        // half screens with no way to the action
};

function serve(dir) {
  const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.mjs': 'text/javascript', '.json': 'application/json',
    '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.avif': 'image/avif', '.gif': 'image/gif',
    '.woff2': 'font/woff2', '.woff': 'font/woff', '.ttf': 'font/ttf', '.otf': 'font/otf', '.mp4': 'video/mp4', '.webm': 'video/webm', '.ico': 'image/x-icon', '.txt': 'text/plain', '.xml': 'application/xml' };
  const srv = http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0].split('#')[0]);
    let f = path.join(dir, p);
    if (!f.startsWith(path.resolve(dir))) { res.writeHead(403); return res.end(); }
    try { if (fs.statSync(f).isDirectory()) f = path.join(f, 'index.html'); } catch (e) {}
    fs.stat(f, (err, st) => {
      if (err) { res.writeHead(404); return res.end('404'); }
      const type = types[path.extname(f).toLowerCase()] || 'application/octet-stream';
      const range = req.headers.range;
      if (range && /^bytes=/.test(range)) {
        const [a, b] = range.replace('bytes=', '').split('-'); const s = +a, e = b ? +b : st.size - 1;
        res.writeHead(206, { 'Content-Type': type, 'Content-Range': `bytes ${s}-${e}/${st.size}`, 'Accept-Ranges': 'bytes', 'Content-Length': e - s + 1 });
        return fs.createReadStream(f, { start: s, end: e }).pipe(res);
      }
      res.writeHead(200, { 'Content-Type': type, 'Content-Length': st.size, 'Accept-Ranges': 'bytes' });
      fs.createReadStream(f).pipe(res);
    });
  });
  return new Promise(r => srv.listen(0, '127.0.0.1', () => r(srv)));
}

const timed = (p, ms, what) => Promise.race([p, new Promise((_, rej) => setTimeout(() => rej(new Error('timeout ' + what)), ms))]);

// Everything below runs inside the page.
const INPAGE = `
window.__cb = (function () {
  const vw = () => innerWidth, vh = () => innerHeight;
  const alpha = c => { const m = c && c.match(/rgba?\\(([^)]+)\\)/); if (!m) return c === 'transparent' ? 0 : 1; const p = m[1].split(/[ ,\\/]+/).filter(Boolean); return p.length > 3 ? parseFloat(p[3]) : 1; };
  const lum = c => { const m = c && c.match(/rgba?\\(([^)]+)\\)/); if (!m) return null; const p = m[1].split(/[ ,\\/]+/).filter(Boolean).map(parseFloat); return (0.2126 * p[0] + 0.7152 * p[1] + 0.0722 * p[2]) / 255; };
  const shown = e => { const r = e.getBoundingClientRect(), s = getComputedStyle(e); return r.width > 1 && r.height > 1 && s.visibility !== 'hidden' && s.display !== 'none' && r.bottom > 0 && r.top < vh() && r.right > 0 && r.left < vw(); };
  const opac = e => { let o = 1; for (let n = e; n && n.nodeType === 1; n = n.parentElement) o *= +getComputedStyle(n).opacity; return o; };
  const inHeader = e => !!e.closest('header, nav, [role=banner], [role=navigation]') && !e.closest('main');
  const ownText = e => [...e.childNodes].filter(n => n.nodeType === 3).map(n => n.textContent).join('').trim();
  const clickables = () => [...document.querySelectorAll('a[href], button, [role=button], input[type=submit], input[type=button]')];
  const heads = () => [...document.querySelectorAll('h1, h2, h3')].filter(h => h.textContent.trim().length > 1 && getComputedStyle(h).display !== 'none');
  const firstFamily = s => (s.fontFamily || '').split(',')[0].replace(/["']/g, '').trim().toLowerCase();

  function looksLikeButton(e) {
    const s = getComputedStyle(e), r = e.getBoundingClientRect();
    const filled = alpha(s.backgroundColor) >= 0.5 || /gradient|url\\(/.test(s.backgroundImage);
    const bordered = parseFloat(s.borderTopWidth) >= 1 && alpha(s.borderTopColor) >= 0.3 && parseFloat(s.borderBottomWidth) >= 1;
    return (filled || bordered) && r.height >= 26 && r.height <= 120 && r.width >= 40 && e.textContent.trim().length >= 2;
  }
  // The walk counts the header button and the bar too (the BWILD and Honey walks). The first screen doesn't, the action
  // sits in the page beside the first input (Fae Club v3, rule 1).
  function actions(sel, withHeader) {
    const all = sel ? [...document.querySelectorAll(sel)] : clickables().filter(looksLikeButton);
    return all.filter(e => shown(e) && opac(e) > 0.3 && !e.closest('[inert], [aria-hidden=true], footer') && (withHeader || !inHeader(e)));
  }
  function pillish(e) {
    const s = getComputedStyle(e), r = e.getBoundingClientRect();
    if (r.height < 18 || r.height > 90 || r.width < r.height * 1.3) return false;
    const filled = alpha(s.backgroundColor) >= 0.15 || /gradient/.test(s.backgroundImage);
    const bordered = parseFloat(s.borderTopWidth) >= 1 && alpha(s.borderTopColor) >= 0.2;
    if (!filled && !bordered) return false;
    const rad = parseFloat(s.borderTopLeftRadius), rad2 = parseFloat(s.borderBottomRightRadius);
    return rad >= r.height / 2 - 2 && rad2 >= r.height / 2 - 2;
  }
  function look() {
    const out = { fonts: {}, italic: [], kickers: 0, headCount: 0, pills: [], chips: [], arrows: [], cards: 0, dimmedIds: [] };
    // faces actually drawn, by role
    const roles = [['head', 'h1, h2, h3'], ['body', 'p, li'], ['ui', 'a, button, label']];
    for (const [role, sel] of roles) for (const e of document.querySelectorAll(sel)) {
      if (!e.textContent.trim() || getComputedStyle(e).display === 'none') continue;
      const f = firstFamily(getComputedStyle(e)); const k = role + ':' + f; out.fonts[k] = (out.fonts[k] || 0) + 1;
      if (role === 'head' && /(^|,)\\s*serif\\s*$/.test(getComputedStyle(e).fontFamily)) out.fonts['serif-voice:' + f] = (out.fonts['serif-voice:' + f] || 0) + 1;
    }
    const H = heads(); out.headCount = H.length;
    for (const h of H) {
      // the tell is the mix, a roman headline with an italic half. A headline set wholly in italic is a choice
      const styles = new Set(); const tw = document.createTreeWalker(h, NodeFilter.SHOW_TEXT);
      for (let t = tw.nextNode(); t; t = tw.nextNode()) if (t.textContent.trim()) styles.add(/italic|oblique/.test(getComputedStyle(t.parentElement).fontStyle) ? 'i' : 'r');
      if (styles.size === 2) out.italic.push(h.textContent.trim().slice(0, 50));
      let k = h.previousElementSibling;
      if (!k && h.parentElement && h.parentElement.children.length <= 3) k = h.parentElement.previousElementSibling;
      while (k && !k.textContent.trim() && k.previousElementSibling) k = k.previousElementSibling;
      if (k && getComputedStyle(k).display !== 'none') {
        const s = getComputedStyle(k), t = k.textContent.trim();
        const caps = s.textTransform === 'uppercase' || (t === t.toUpperCase() && /[A-Za-zÀ-ÿ]/.test(t));
        if (t.length >= 2 && t.length <= 60 && parseFloat(s.fontSize) <= 15 && caps && !/^h[1-6]$/i.test(k.tagName)) out.kickers++;
      }
    }
    // skip links and closed menus aren't drawn, so they don't count
    const drawn = e => { const s = getComputedStyle(e), r = e.getBoundingClientRect(); return s.display !== 'none' && s.visibility !== 'hidden' && r.width > 0 && r.left + scrollX > -50 && r.top + scrollY > -50 && opac(e) > 0.05; };
    for (const e of clickables()) {
      if (!drawn(e)) continue;
      if (pillish(e)) out.pills.push(e.textContent.trim().slice(0, 30) || e.getAttribute('aria-label') || e.tagName);
      if (/[→↗➔➝⟶↘⇢➜⟵←↙↖↓↑]/.test(e.textContent)) out.arrows.push(e.textContent.trim().slice(0, 30));
    }
    for (const e of document.querySelectorAll('span, li, small, em, b, strong, div, p')) {
      if (e.children.length > 1) continue; const t = e.textContent.trim();
      if (t.length < 2 || t.length > 32 || e.closest('a, button') || !drawn(e)) continue;
      const r = e.getBoundingClientRect(); if (r.height > 44) continue;
      if (pillish(e)) out.chips.push(t);
    }
    for (const e of document.querySelectorAll('body *')) {
      const s = getComputedStyle(e); if (s.boxShadow === 'none' || s.display === 'none') continue;
      const r = e.getBoundingClientRect(); if (r.width < 140 || r.height < 100) continue;
      if (parseFloat(s.borderTopLeftRadius) < 8 || alpha(s.backgroundColor) < 0.6) continue;
      const blur = s.boxShadow.split(/,(?![^(]*\\))/).some(sh => { const n = sh.replace(/rgba?\\([^)]*\\)/g, '').trim().split(/\\s+/).map(parseFloat).filter(x => !isNaN(x)); return !/inset/.test(sh) && (n[2] || 0) >= 8; });
      if (blur) out.cards++;
    }
    // an endless sideways loop carrying words or logos, the logo marquee. An empty grain or noise layer isn't one
    const carries = e => e && ((e.textContent || '').trim().length >= 10 || e.querySelectorAll('img, svg').length >= 3);
    out.marquee = document.getAnimations().filter(a => { try { if (a.effect.getComputedTiming().iterations !== Infinity || !carries(a.effect.target)) return false;
      return a.effect.getKeyframes().some(k => /translate(X|3d)?\\(\\s*-?[1-9][\\d.]*%/.test(k.transform || '') || /translateX\\(\\s*-?\\d{3,}/.test(k.transform || '')); } catch (e) { return false; } })
      .map(a => (a.effect.target && a.effect.target.className + '' || 'loop').slice(0, 30)).concat([...document.querySelectorAll('marquee')].map(() => 'marquee'));
    return out;
  }
  function blocks() {
    const main = document.querySelector('main');
    const root = main && main.children.length > 1 ? main : document.body;
    return [...root.children].filter(e => !/^(SCRIPT|STYLE|NOSCRIPT|TEMPLATE|LINK|META)$/.test(e.tagName) && !e.matches('header, nav, footer, dialog, [hidden]') && e.offsetHeight >= 240);
  }
  function bgOf(e) {
    for (let n = e; n; n = n.parentElement) { const s = getComputedStyle(n); if (alpha(s.backgroundColor) >= 0.5) return s.backgroundColor; }
    return 'rgb(255, 255, 255)';
  }
  function structure() {
    const B = blocks(); const tones = B.map(b => { const l = lum(bgOf(b)); return l == null ? '?' : l > 0.5 ? 'L' : 'D'; });
    let turns = 0; for (let i = 1; i < tones.length; i++) if (tones[i] !== tones[i - 1]) turns++;
    return { sections: B.length, tones: tones.join(''), turns };
  }
  function mediaAt(x, y) {
    // fixed canvases and grain layers can sit after body in the stack, so body and html are skipped, not the end
    for (const e of document.elementsFromPoint(x, y)) {
      if (e === document.body || e === document.documentElement) continue;
      const t = e.tagName;
      if (opac(e) < 0.2) continue;
      if (t === 'IMG' || t === 'VIDEO' || t === 'CANVAS' || t === 'PICTURE') return true;
      if (t === 'svg' || t === 'SVG') { const r = e.getBoundingClientRect(); if (r.width * r.height >= 0.08 * vw() * vh()) return true; }
      const s = getComputedStyle(e);
      if (/url\\(/.test(s.backgroundImage) && !/repeat(?!-)/.test(s.backgroundRepeat.replace('no-repeat', ''))) { const r = e.getBoundingClientRect(); if (r.width * r.height >= 0.08 * vw() * vh()) return true; }
      if (/url\\(/.test(s.maskImage || s.webkitMaskImage || '') && e.querySelector('img, video, canvas')) return true;
      if (alpha(s.backgroundColor) >= 0.95 && opac(e) >= 0.95) return false;
    }
    return false;
  }
  // decorative film and canvas are set to ignore the pointer, so the hit test skips them unless every element takes it
  function hero() {
    const st = document.createElement('style'); st.textContent = '*{pointer-events:auto!important}'; document.head.appendChild(st);
    let n = 0, hit = 0;
    for (let i = 0; i < 24; i++) for (let j = 0; j < 16; j++) { n++; if (mediaAt((i + 0.5) * vw() / 24, (j + 0.5) * vh() / 16)) hit++; }
    st.remove();
    return +(hit / n).toFixed(2);
  }
  function dimmed() {
    const ids = [];
    for (const e of document.querySelectorAll('p, li, h1, h2, h3, h4, blockquote, figcaption, dd, td')) {
      if (!shown(e) || ownText(e).length < 25) continue;
      const s = getComputedStyle(e); const o = opac(e) * alpha(s.color);
      if (o < 0.55) { if (!e.dataset.cbId) e.dataset.cbId = Math.random().toString(36).slice(2, 9); ids.push(e.dataset.cbId); }
    }
    return ids;
  }
  function stillDimmed(id) {
    const e = document.querySelector('[data-cb-id="' + id + '"]'); if (!e || !shown(e)) return null;
    const o = opac(e) * alpha(getComputedStyle(e).color); return o < 0.55 ? ownText(e).slice(0, 50) : null;
  }
  function art() {
    const sig = [];
    const big = e => { const r = e.getBoundingClientRect(); return r.width >= 200 && r.height >= 150; };
    if ([...document.querySelectorAll('canvas')].some(big)) sig.push('canvas');
    if ([...document.querySelectorAll('video')].some(big)) sig.push('film');
    if ([...document.querySelectorAll('svg')].some(s => big(s) && s.querySelectorAll('path, circle, rect, line, polygon, use, ellipse, polyline').length >= 15)) sig.push('svg scene');
    let rich = 0;
    const walk = rules => { for (const r of rules) { try {
      if (r.cssRules && !(r instanceof CSSKeyframesRule)) walk(r.cssRules);
      if (r instanceof CSSKeyframesRule) for (const k of r.cssRules) { const t = k.style.transform || ''; if (/rotate|scale|skew|matrix|perspective/.test(t) || k.style.clipPath || k.style.filter || k.style.backgroundPosition || k.style.maskPosition || k.style.webkitMaskPosition || k.style.rotate || k.style.scale || [...k.style].some(p => p.startsWith('--') || p === 'offset-distance' || p === 'stroke-dashoffset')) { rich++; break; } }
    } catch (e) {} } };
    for (const ss of document.styleSheets) { try { walk(ss.cssRules); } catch (e) {} }
    if (rich) sig.push(rich + ' rich keyframes');
    return sig;
  }
  function scriptVars() { return [...document.querySelectorAll('[style*="--"]')].map(e => e.getAttribute('style')).join('|'); }
  return { look, structure, hero, actions, dimmed, stillDimmed, art, scriptVars, shown };
})();
`;

// The faults, planted into the page so every detector proves it can fail.
const PLANTS = {
  look: `(() => { document.querySelectorAll('h1, h2, h3').forEach(h => { const k = document.createElement('p'); k.style.cssText = 'font:600 12px/1 sans-serif;letter-spacing:.15em;text-transform:uppercase'; k.textContent = 'Our story'; h.before(k); });
    const s = document.createElement('section'); s.setAttribute('data-cb-plant', '1');
    s.innerHTML = '<p style="font:600 12px/1 sans-serif;letter-spacing:.15em;text-transform:uppercase">— Our approach</p><h2 style="font-family:Montserrat,sans-serif">We make it <em style="font-style:italic">effortless</em></h2>'
      + '<p style="font:600 12px/1 sans-serif;letter-spacing:.15em;text-transform:uppercase">Why us</p><h2>Built for <i style="font-style:italic">growth</i></h2>'
      + '<p style="font:600 12px/1 sans-serif;letter-spacing:.15em;text-transform:uppercase">Results</p><h2>Numbers that matter</h2>'
      + '<a href="#x" style="display:inline-block;padding:14px 28px;border-radius:999px;background:#3b3bd6;color:#fff">Book a call →</a>'
      + '<span style="display:inline-block;padding:4px 12px;border-radius:999px;background:#eee">Fast</span><span style="display:inline-block;padding:4px 12px;border-radius:999px;background:#eee">Secure</span><span style="display:inline-block;padding:4px 12px;border-radius:999px;background:#eee">Modern</span>'
      + [1,2,3].map(i => '<div style="width:260px;height:180px;display:inline-block;margin:10px;border-radius:16px;background:#fff;box-shadow:0 10px 30px rgba(0,0,0,.12)">card</div>').join('')
      + '<style>@keyframes cbmarq{to{transform:translateX(-50%)}}</style><div style="white-space:nowrap;animation:cbmarq 20s linear infinite">Unilever AXA Pertamina Unilever AXA Pertamina</div>'
      ;
    (document.querySelector('main') || document.body).appendChild(s); s.scrollIntoView(); })()`,
  structure: `(() => { const m = document.querySelector('main') && document.querySelector('main').children.length > 1 ? document.querySelector('main') : document.body;
    for (let i = 0; i < 10; i++) { const s = document.createElement('section'); s.setAttribute('data-cb-plant', '1'); s.style.cssText = 'height:300px;background:' + (i % 2 ? '#141432' : '#f6f1e7'); m.appendChild(s); } })()`,
  hero: `(() => { const st = document.createElement('style'); st.textContent = 'img,video,canvas,picture,svg{visibility:hidden!important} *{background-image:none!important}'; document.head.appendChild(st); })()`,
  walk: `(sel) => { const st = document.createElement('style'); st.textContent = (sel || 'a, button, [role=button], input[type=submit]') + '{visibility:hidden!important}'; document.head.appendChild(st); }`,
  // loaded with the page's own scripts off, so nothing can redraw what this removes
  art: `(() => { document.querySelectorAll('canvas, video, svg').forEach(e => e.remove()); for (const ss of document.styleSheets) { try { for (let i = ss.cssRules.length - 1; i >= 0; i--) if (ss.cssRules[i] instanceof CSSKeyframesRule) ss.deleteRule(i); } catch (e) {} } })()`,
};

async function measure(browser, base, page, view, plant) {
  const [tag, w, h] = view;
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1, javaScriptEnabled: plant !== 'art' });
  const p = await ctx.newPage(); const errs = [];
  p.on('pageerror', e => errs.push(e.message));
  const url = base.replace(/\/$/, '') + page;
  const res = await p.goto(url, { waitUntil: 'load', timeout: 60000 }).catch(e => null);
  if (!res || res.status() >= 400) { await ctx.close(); return { error: 'load ' + (res ? res.status() : 'failed') + ' ' + url }; }
  await p.waitForTimeout(plant === 'art' ? 300 : 2500);
  const ev = (f, a) => timed(p.evaluate(f, a), 20000, 'evaluate');
  await ev(INPAGE);
  const walkSteps = !plant ? Infinity : plant === 'walk' ? 6 : 0;
  if (plant === 'hero') await ev(PLANTS.hero);
  if (plant === 'walk') await ev(new Function('sel', 'return (' + PLANTS.walk + ')(sel)'), ACTION);
  if (plant === 'art') await ev(PLANTS.art);
  if (plant === 'structure') await ev(PLANTS.structure);
  if (plant === 'hero') await p.waitForTimeout(300);
  const r = { view: tag, errors: errs };
  r.hero = await ev(() => window.__cb.hero());
  if (SHOTS && !plant) { fs.mkdirSync(SHOTS, { recursive: true }); await p.screenshot({ path: path.join(SHOTS, `${page.replace(/\W+/g, '_') || 'home'}-${tag}-first-screen.png`) }); }
  // the walk, half a screen at a time, with the dimmed text noted as it passes
  const vars0 = await ev(() => window.__cb.scriptVars());
  const H = await ev(() => document.documentElement.scrollHeight - innerHeight);
  const gaps = []; let steps = 0;
  for (let y = 0; y <= H + 1 && steps < walkSteps; y += h / 2) {
    await ev(v => scrollTo(0, v), y); await p.waitForTimeout(160); steps++;
    const n = await ev(sel => window.__cb.actions(sel, true).length, ACTION);
    if (!n) gaps.push(+(y / h).toFixed(1));
    if (y === 0) r.firstAction = await ev(sel => window.__cb.actions(sel, false).length, ACTION);
  }
  r.walk = { steps, gaps };
  // the final look, every top level block from the top at both sizes, and the middle and end of anything taller
  if (SECTIONS && !plant) {
    fs.mkdirSync(SECTIONS, { recursive: true });
    const tops = await ev(() => { const m = document.querySelector('main'); const root = m && m.children.length > 1 ? m : document.body;
      const list = [...root.children]; const hd = document.querySelector('body > header'), ft = document.querySelector('body > footer, main + footer');
      return [...new Set([...(hd ? [hd] : []), ...list, ...(ft ? [ft] : [])])].filter(e => !/^(SCRIPT|STYLE|NOSCRIPT|TEMPLATE|LINK|META)$/.test(e.tagName) && e.offsetHeight >= 120)
        .map(e => ({ top: e.getBoundingClientRect().top + scrollY, h: e.offsetHeight })); });
    let i = 0; const tagp = page.replace(/\W+/g, '_').replace(/^_|_$/g, '') || 'home';
    for (const b of tops) for (const y of (b.h > 1.5 * h ? [b.top, b.top + (b.h - h) / 2, b.top + b.h - h] : [b.top])) {
      await ev(v => scrollTo(0, v), y); await p.waitForTimeout(600);
      await p.screenshot({ path: path.join(SECTIONS, `${tagp}-${tag}-${String(++i).padStart(2, '0')}.png`) });
    }
    r.sectionShots = i;
  }
  r.scriptVarsChanged = (await ev(() => window.__cb.scriptVars())) !== vars0;
  if (plant === 'look') await ev(PLANTS.look);
  Object.assign(r, await ev(() => window.__cb.look()));
  Object.assign(r, await ev(() => window.__cb.structure()));
  r.art = await ev(() => window.__cb.art());
  if (r.scriptVarsChanged) r.art.push('scroll writes CSS variables');
  await ctx.close();
  return r;
}

function judge(page, res, isHome) {
  const out = [];
  const add = (check, fail, detail) => out.push({ page, check, fail, detail });
  const d = res.desk, ph = res.phone;
  const fonts = Object.keys(d.fonts).filter(k => !k.startsWith('serif-voice:'));
  const banned = [...new Set(fonts.map(k => k.split(':')[1]).filter(f => BANNED.includes(f) && !ALLOW.includes(f)))];
  add('fonts', banned.length > 0, banned.length ? 'banned faces drawn ' + banned.join(', ') : 'faces ' + [...new Set(fonts.map(k => k.split(':')[1]))].join(', '));
  const serif = Object.keys(d.fonts).filter(k => k.startsWith('serif-voice:')).map(k => k.split(':')[1]);
  if (serif.length) out.push({ page, check: 'serif voice', fail: false, warn: true, detail: 'headlines in a serif (' + [...new Set(serif)].join(', ') + '), allowed only when the card shows the field sets one' });
  add('italic', d.italic.length > LIMITS.italic, d.italic.length + ' headlines with an italic part' + (d.italic.length ? ', ' + d.italic.slice(0, 3).map(t => '"' + t + '"').join(' ') : ''));
  const ks = d.headCount ? d.kickers / d.headCount : 0;
  add('kickers', ks > LIMITS.kickerShare && d.kickers >= 3, d.kickers + ' of ' + d.headCount + ' headlines have a small caps kicker above');
  const pills = [...new Set([...d.pills, ...ph.pills])];
  add('pills', pills.length > LIMITS.pills, pills.length + ' pill buttons' + (pills.length ? ', ' + pills.slice(0, 4).map(t => '"' + t + '"').join(' ') : ''));
  const chips = [...new Set([...d.chips, ...ph.chips])];
  add('chips', chips.length > LIMITS.chips, chips.length + ' pill chips or tags' + (chips.length ? ', ' + chips.slice(0, 4).map(t => '"' + t + '"').join(' ') : ''));
  const arrows = [...new Set([...d.arrows, ...ph.arrows])];
  add('arrows', arrows.length > LIMITS.arrows, arrows.length + ' arrow glyphs in buttons or links' + (arrows.length ? ', ' + arrows.slice(0, 3).map(t => '"' + t + '"').join(' ') : ''));
  add('cards', Math.max(d.cards, ph.cards) > LIMITS.cards, Math.max(d.cards, ph.cards) + ' rounded boxes with a soft shadow');
  add('marquee', d.marquee.length > 0, d.marquee.length ? 'endless sideways loops, ' + d.marquee.slice(0, 3).join(', ') : 'no marquee');
  add('art', d.art.length === 0, d.art.length ? d.art.join(', ') : 'no canvas, film, SVG scene, rich keyframes or scroll driven variables');
  if (isHome) {
    add('sections', d.sections > LIMITS.sections, d.sections + ' top level sections');
    add('turns', d.turns > LIMITS.turns, d.turns + ' light and dark turns (' + d.tones + ')');
  }
  add('hero', d.hero < LIMITS.hero || ph.hero < LIMITS.hero, 'first screen is ' + Math.round(d.hero * 100) + '% picture, film or mark at desktop, ' + Math.round(ph.hero * 100) + '% on a phone');
  const g = { desk: d.walk.gaps, phone: ph.walk.gaps };
  if (!ACTION) { add('walk', true, 'not judged, pass --action with the selector from card line 2'); add('first screen action', true, 'not judged, pass --action'); return out; }
  add('walk', g.desk.length + g.phone.length > LIMITS.gaps, (g.desk.length + g.phone.length) + ' half screens with no way to the action' + (g.desk.length ? ', desktop at ' + g.desk.slice(0, 6).join(' ') + ' screens' : '') + (g.phone.length ? ', phone at ' + g.phone.slice(0, 6).join(' ') : ''));
  const fa = [d.firstAction, ph.firstAction];
  add('first screen action', !fa[0] || !fa[1], (!fa[0] || !fa[1]) ? 'no action in the page on the first screen' + (!fa[0] ? ' at desktop' : '') + (!fa[1] ? ' on a phone' : '') + ', only the header or nothing' : 'the first screen carries the action in the page at both sizes');
  return out;
}

(async () => {
  let base = TARGET, srv = null;
  if (!/^https?:/.test(TARGET)) { if (!fs.existsSync(TARGET)) { console.log('no such folder ' + TARGET); process.exit(2); } srv = await serve(path.resolve(TARGET)); base = 'http://127.0.0.1:' + srv.address().port; }
  const browser = await chromium.launch({ args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader', '--autoplay-policy=no-user-gesture-required'] });
  const all = [], raw = {}; let broken = false;
  for (const pg of PAGES) {
    const res = {};
    for (const v of VIEWS) { res[v[0]] = await measure(browser, base, pg, v, null); if (res[v[0]].error) { console.log('LOAD FAILED ' + res[v[0]].error); process.exit(2); } }
    raw[pg] = res;
    const verdicts = judge(pg, res, pg === '/' || pg === PAGES[0]);
    all.push(...verdicts);
    if (PLANT) {
      const planted = {};
      for (const kind of ['look', 'structure', 'hero', 'walk', 'art']) {
        const pr = {}; for (const v of VIEWS) pr[v[0]] = await measure(browser, base, pg, v, kind);
        for (const x of judge(pg, pr, true)) planted[x.check] = planted[x.check] || (x.fail ? kind : false);
      }
      raw[pg].plants = planted;
      for (const x of verdicts) if (!x.warn && planted[x.check] === false) { x.broken = true; broken = true; }
    }
  }
  if (srv) srv.close(); await browser.close();
  // count ups, read from the build's own scripts and pages. The pattern is tested on a planted line first
  const COUNT = /count-?up|countTo\b|data-count(-to|er)?=|animateValue|odometer/i;
  if (!COUNT.test('<b data-count-to="120">0</b>')) broken = true;
  if (!/^https?:/.test(TARGET)) {
    const hits = []; const walkDir = d => { for (const f of fs.readdirSync(d)) { const q = path.join(d, f), st = fs.statSync(q);
      if (st.isDirectory()) walkDir(q); else if (/\.(js|html)$/.test(f) && st.size < 3e6 && COUNT.test(fs.readFileSync(q, 'utf8'))) hits.push(path.relative(TARGET, q)); } };
    walkDir(TARGET); all.push({ page: '*', check: 'count ups', fail: hits.length > 0, detail: hits.length ? 'count up code in ' + hits.slice(0, 3).join(', ') : 'no count up code' });
  }
  console.log('check-build ' + TARGET + (ACTION ? '  action "' + ACTION + '"' : '  (no --action, the generic finder was used)'));
  for (const x of all) console.log((x.broken ? 'DETECTOR BROKEN' : x.warn ? 'WARN' : x.fail ? 'FAIL' : 'pass').padEnd(16) + (x.page + ' ' + x.check).padEnd(30) + x.detail);
  if (SECTIONS) console.log('section shots ' + Object.values(raw).reduce((n, r) => n + (r.desk.sectionShots || 0) + (r.phone.sectionShots || 0), 0) + ' in ' + SECTIONS);
  const errs = [...new Set(Object.values(raw).flatMap(r => [...(r.desk.errors || []), ...(r.phone.errors || [])]))];
  if (errs.length) console.log('page errors ' + errs.slice(0, 5).join(' | '));
  if (JSONOUT) fs.writeFileSync(JSONOUT, JSON.stringify({ target: TARGET, raw, verdicts: all }, null, 1));
  const failed = all.filter(x => x.fail).length;
  console.log(broken ? 'DETECTOR BROKEN, a check could not fail on its plant, so its pass means nothing' : failed ? `FAIL  ${failed} check${failed > 1 ? 's' : ''} failed. Fix the build before anyone sees it.` : 'PASS  nothing a script can catch. The card and the first screen Raka sees are still the gate.');
  process.exit(broken ? 2 : failed ? 1 : 0);
})().catch(e => { console.log('ERROR ' + e.message); process.exit(2); });
