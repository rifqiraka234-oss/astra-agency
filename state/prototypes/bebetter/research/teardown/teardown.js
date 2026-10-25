// Adapted from state/prototypes/hertling/research/teardown/teardown.js (2026-10-21).
// Same render loop: Chromium 1194 through the egress proxy, SPKI pinned, 1440x900, five desktop
// frames down the page, one 390px mobile frame, 3 workers. Changes for SAAVEDRA (2026-10-25):
//  - sites.txt rows are cat|url|locale (locale optional, default en-GB, fr-FR for Paris sites)
//  - French consent buttons added to the overlay clicker
//  - extra fingerprints: palette by painted area, heading/body faces, pinned-scene and marquee
//    candidates, full-bleed bands vs cards, illustration and photo counts, PDF links, iframes
//  - catering facts read off the page text (offer words, per person price, minimum, lead time,
//    radius, proof) with the matched snippet kept, and every form's fields read off the DOM
//  - the rendered text and HTML are saved to text/ and html/ so every fact can be re-read
// Adapted again for BEBETTER (2026-10-25), copied from state/prototypes/saavedra/research/teardown/:
//  - locales en-GB (default), nl-NL, de-DE; Dutch and German consent buttons added to the clicker
//  - the catering facts are replaced by apparel facts: drop, countdown, sold out, waitlist, community,
//    custom kit, quote words (counts), and snippets for minimum order, lead time, prices, 'from' prices,
//    volume tiers, fabric weight and wash words, model size notes, reviews, trust lines
//  - first screen facts read before any scroll: video in view, h1 text, visible buttons, first screen text
//  - countdown and timer elements, product links and password pages counted off the DOM
//  - no bot wall is bypassed: a wall is recorded as status and title only
// Usage: node teardown.js [sites file] [out jsonl]
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs');
const CHROME = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const spki = fs.readFileSync(__dirname + '/spki.txt', 'utf8').trim();
const SITES = process.argv[2] || __dirname + '/sites.txt';
const OUTF = process.argv[3] || __dirname + '/fingerprints.jsonl';
const sites = fs.readFileSync(SITES, 'utf8').trim().split('\n').filter(l => l && !l.startsWith('#')).map(l => l.split('|'));
const OUT = __dirname + '/shots'; fs.mkdirSync(OUT, { recursive: true });
fs.mkdirSync(__dirname + '/text', { recursive: true }); fs.mkdirSync(__dirname + '/html', { recursive: true });
const slug = u => u.replace(/^https?:\/\/(www\.)?/, '').replace(/\W+/g, '_').replace(/_+$/, '');

// Runs in the page. Returns DOM facts plus catering facts.
function pageFacts() {
  const W = window.innerWidth, VH = window.innerHeight;
  const all = [...document.querySelectorAll('body *')];
  let sticky = 0, clip = 0, blend = 0, blur = 0, pinned = 0, fullBleed = 0, cards = 0, radiusBig = 0;
  const bg = {}, txt = {};
  const hex = c => { const m = c.match(/rgba?\(([^)]+)\)/); if (!m) return null; const p = m[1].split(',').map(s => parseFloat(s)); if (p.length === 4 && p[3] < 0.5) return null; return '#' + p.slice(0, 3).map(v => Math.round(v).toString(16).padStart(2, '0')).join(''); };
  const bodyBg = hex(getComputedStyle(document.body).backgroundColor) || hex(getComputedStyle(document.documentElement).backgroundColor) || '#ffffff(default)';
  for (const e of all) {
    const cs = getComputedStyle(e);
    if (cs.position === 'sticky' || cs.position === 'fixed') sticky++;
    if (cs.position === 'sticky' && e.offsetHeight > 300 && e.parentElement && e.parentElement.offsetHeight > 1.5 * VH) pinned++;
    if (cs.clipPath && cs.clipPath !== 'none') clip++;
    if (cs.mixBlendMode && cs.mixBlendMode !== 'normal') blend++;
    if (cs.backdropFilter && cs.backdropFilter !== 'none') blur++;
    if (cs.display === 'none' || cs.visibility === 'hidden') continue;
    const r = e.getBoundingClientRect(); const area = Math.max(0, r.width) * Math.max(0, r.height);
    const b = hex(cs.backgroundColor);
    if (b && area > 2000) bg[b] = (bg[b] || 0) + area;
    if (r.width >= W * 0.97 && r.height >= 280 && (b && b !== bodyBg || cs.backgroundImage !== 'none')) fullBleed++;
    const rad = parseFloat(cs.borderTopLeftRadius) || 0;
    if (rad >= 12 && r.width > 160 && r.width < W * 0.6 && r.height > 160) { radiusBig++; if (cs.boxShadow !== 'none' || (b && b !== bodyBg)) cards++; }
    if (e.childNodes.length && [...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim().length > 2)) { const t = hex(cs.color); if (t) txt[t] = (txt[t] || 0) + e.textContent.trim().length; }
  }
  const top = (o, n) => Object.entries(o).sort((a, b) => b[1] - a[1]).slice(0, n).map(([k, v]) => k);
  const canv = [...document.querySelectorAll('canvas')]; let webgl = 0; for (const c of canv) { try { if (c.getContext('webgl2') || c.getContext('webgl')) webgl++; } catch (e) {} }
  const src = [...document.scripts].map(s => s.src).join(' ') + ' ' + Object.keys(window).join(' ');
  const libs = ['gsap', 'ScrollTrigger', 'THREE', 'lottie', 'Lenis', 'Swiper', 'framer', 'rive', 'splide', 'barba', 'locomotive', 'swup', 'webflow', 'squarespace', 'shopify', 'wix', 'elementor', 'wordpress'].filter(l => src.toLowerCase().includes(l.toLowerCase()));
  const fonts = [...new Set([...document.fonts].filter(f => f.status === 'loaded').map(f => f.family.replace(/["']/g, '')))].slice(0, 10);
  const face = sel => { const e = document.querySelector(sel); return e ? getComputedStyle(e).fontFamily.split(',')[0].replace(/["']/g, '').trim() : null; };
  const text = document.body.innerText || '';
  const words = text.split(/\s+/).filter(Boolean).length;
  const vids = [...document.querySelectorAll('video')];
  const marquee = document.querySelectorAll('marquee, [class*="marquee" i], [class*="ticker" i], [class*="Marquee"], [data-marquee]').length;
  const bigSvg = [...document.querySelectorAll('svg')].filter(s => { const r = s.getBoundingClientRect(); return r.width > 150 && r.height > 150; }).length;
  const imgs = [...document.images];
  const bigImg = imgs.filter(i => i.getBoundingClientRect().width >= 600).length;
  const svgImg = imgs.filter(i => /\.svg(\?|$)/i.test(i.currentSrc || i.src)).length;
  const pdfs = [...document.querySelectorAll('a[href]')].filter(a => /\.pdf(\?|#|$)/i.test(a.href)).map(a => ((a.innerText || '').trim().slice(0, 40) + ' -> ' + a.href).slice(0, 200)).slice(0, 8);
  const iframes = [...document.querySelectorAll('iframe')].map(f => (f.src || '').slice(0, 160)).filter(Boolean).slice(0, 8);
  // catering facts, snippet kept so a reader can check the match is real
  const flat = text.replace(/\s+/g, ' ');
  const grab = (re, n = 3) => { const out = []; let m; const g = new RegExp(re.source, re.flags.includes('g') ? re.flags : re.flags + 'g'); while ((m = g.exec(flat)) && out.length < n) { out.push(flat.slice(Math.max(0, m.index - 70), m.index + m[0].length + 70)); } return out; };
  const cnt = re => (flat.match(new RegExp(re.source, 'gi')) || []).length;
  const R = {
    drop: /\bdrops?\b|\bdropping\b|new release|\blaunch(es|ing)?\b|restock|nieuwe collectie|neue kollektion/i,
    countdown: /countdown|dropping (in|soon)|coming soon|binnenkort|\b\d{1,2}\s?d(ays)?\s?:?\s?\d{1,2}\s?h(ours|rs)?\b/i,
    soldOut: /sold out|uitverkocht|ausverkauft/i,
    waitlist: /wait ?list|notify me|early access|be the first|vroege toegang|get notified|join the list/i,
    community: /communit(y|ies)|ambassadors?|\bathletes?\b|run club|join the (club|team|family|movement)|our family/i,
    custom: /\bcustom\b|maatwerk|op maat|personali[sz]|eigen logo|your (own )?logo|design your|ontwerp je|zelf ontwerpen|gestalte|configurat|konfigur|teamwear|clubkled|vereinsausstattung/i,
    quote: /offerte|\bquote\b|enquir|inquir|angebot anfordern|anfrage|request a/i,
  };
  const P = {
    moq: /minimum (order|bestel\w*|afname|quantit\w*|of \d+)|min(\.|imum)? ?\d+ ?(pcs|pieces|stuks|st\.|stück|items|units|shirts)|(from|vanaf|ab|starting at) \d+ (pieces|pcs|stuks|stück|items|units|shirts|kits|hoodies|tees)|no minimums?|geen minimum|ohne mindest\w*|mindestbestell\w*|mindestmenge|\bmoq\b|vanaf 1 stuk|ab 1 stück|from (just )?1 (item|piece)/i,
    leadTime: /\d+\s?(-|to|tot|bis|–)?\s?\d*\s?(working |business )?(days|weeks|werkdagen|weken|dagen|werktage|wochen|tage)\b|lead ?time|levertijd|lieferzeit|production time|productietijd|turnaround|delivery time/i,
    priceFrom: /(from|vanaf|ab|starting at|starting from)\s*(€|£|\$|eur)\s?\d+[\d.,]*|(from|vanaf|ab)\s*\d+[\d.,]*\s?(€|£)/i,
    price: /(€|£|\$)\s?\d+[\d.,]*|\d+[\d.,]*\s?(€|£)/i,
    tiers: /staffel\w*|volume discount|bulk (discount|pricing)|quantity discount|kwantumkorting|mengenrabatt|the more you order/i,
    fabric: /\d{3}\s?(gsm|g\/m²|g\/m2|gr\b|grams?)|stone ?wash\w*|acid ?wash\w*|vintage wash\w*|garment dyed|heavyweight|oversized|boxy fit|pump cover/i,
    modelSize: /model (is|wears|draagt|trägt)[^.]{0,40}|wears (a )?size \w+|size guide|maattabel|größentabelle|fit guide/i,
    reviews: /\breviews?\b|★|\b\d[.,]\d\s?\/\s?5\b|trustpilot|google reviews?|beoordelingen|bewertungen/i,
    trust: /trusted by|our clients|clients include|as seen (in|on)|featured in|worn by|we work with|clubs? (trust|use)|\d[\d.,]*\+?\s*(clubs|teams|gyms|vereine|verenigingen|customers|klanten|kunden)\b/i,
    countdownText: /dropping (in|soon)|coming soon|binnenkort|\b\d{1,2}\s?d(ays)?\s?:?\s?\d{1,2}\s?h(ours|rs)?\b|\d{1,2}\s?:\s?\d{2}\s?:\s?\d{2}/i,
  };
  const offer = {}; for (const k in R) offer[k] = cnt(R[k]);
  const facts = {}; for (const k in P) facts[k] = grab(P[k]);
  // forms: every visible field, labelled by label, aria-label, placeholder or name
  const forms = [...document.querySelectorAll('form')].map(f => {
    const fields = [...f.querySelectorAll('input, select, textarea')].filter(i => !['hidden', 'submit', 'button'].includes((i.type || '').toLowerCase())).map(i => {
      let lab = ''; if (i.id) { const l = document.querySelector(`label[for="${CSS.escape(i.id)}"]`); if (l) lab = l.innerText.trim(); }
      if (!lab && i.closest('label')) lab = i.closest('label').innerText.trim();
      lab = lab || i.getAttribute('aria-label') || i.placeholder || i.name || '';
      const r = i.getBoundingClientRect();
      return { t: (i.tagName === 'INPUT' ? i.type : i.tagName.toLowerCase()), l: lab.replace(/\s+/g, ' ').slice(0, 50), vis: r.width > 0 && r.height > 0, req: i.required };
    });
    const btn = f.querySelector('button, input[type=submit]');
    return { action: (f.getAttribute('action') || '').slice(0, 120), n: fields.length, nVisible: fields.filter(x => x.vis).length, fields: fields.slice(0, 30), submit: btn ? (btn.innerText || btn.value || '').trim().slice(0, 40) : '' };
  }).filter(f => f.n > 0);
  const anchors = [...document.querySelectorAll('a[href]')].filter(a => /custom|teamwear|club|gym|coach|b2b|wholesale|quote|offerte|maatwerk|bulk|corporate|team ?order|configurat|konfigur|design|ontwerp|gestalt|community|drop|ambassador|collab/i.test(a.href + ' ' + a.innerText)).map(a => ((a.innerText || '').trim().replace(/\s+/g, ' ').slice(0, 40) + ' -> ' + a.href).slice(0, 180));
  return {
    sticky, pinned, clip, blend, blur, canvases: canv.length, webgl, videos: vids.length, videoAutoplay: vids.filter(v => v.autoplay || v.muted).length, marquee,
    svgs: document.querySelectorAll('svg').length, bigSvg, imgs: imgs.length, bigImg, svgImg,
    h1: document.querySelectorAll('h1').length, h2: document.querySelectorAll('h2').length, sections: document.querySelectorAll('section').length,
    words, anims: (document.getAnimations ? document.getAnimations().length : 0), libs, fonts,
    faceH1: face('h1') || face('h2'), faceBody: face('p') || face('body'),
    bodyBg, paletteBg: top(bg, 6), paletteText: top(txt, 4), fullBleed, cards, radiusBig,
    pdfs, iframes, offer, facts, forms, anchors: [...new Set(anchors)].slice(0, 30),
    countdownEls: document.querySelectorAll('[class*="countdown" i], [id*="countdown" i], [class*="timer" i], [data-countdown]').length,
    productLinks: new Set([...document.querySelectorAll('a[href*="/products/"], a[href*="/product/"], a[href*="/p/"]')].map(a => a.href.split('?')[0])).size,
    passwordPage: /\/password/.test(location.pathname) || !!document.querySelector('form[action*="password"]'),
    generator: (document.querySelector('meta[name=generator]') || {}).content || null,
  };
}


// First screen, read before any scroll: what a visitor sees in the first 900px.
function firstScreen() {
  const VH = innerHeight, VW = innerWidth;
  const inView = e => { const r = e.getBoundingClientRect(); return r.bottom > 0 && r.top < VH && r.width > 0 && r.height > 0 && r.right > 0 && r.left < VW; };
  const vids = [...document.querySelectorAll('video')].filter(inView).map(v => { const r = v.getBoundingClientRect(); return { w: Math.round(r.width), h: Math.round(r.height), playing: !v.paused, src: (v.currentSrc || '').slice(0, 120) }; });
  const h1 = [...document.querySelectorAll('h1')].filter(inView).map(e => e.innerText.replace(/\s+/g, ' ').trim().slice(0, 120));
  const btns = [...document.querySelectorAll('a, button')].filter(inView).map(e => (e.innerText || '').replace(/\s+/g, ' ').trim()).filter(t => t && t.length < 40);
  const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); let t = '', n;
  while ((n = w.nextNode()) && t.length < 900) { const p = n.parentElement; if (!p || !n.textContent.trim()) continue; const cs = getComputedStyle(p); if (cs.display === 'none' || cs.visibility === 'hidden') continue; const r = p.getBoundingClientRect(); if (r.top < VH && r.bottom > 0 && r.width > 0) t += n.textContent.trim().replace(/\s+/g, ' ') + ' | '; }
  const bigImgs = [...document.images].filter(inView).filter(i => i.getBoundingClientRect().width >= VW * 0.45).length;
  return { videos: vids, h1, buttons: [...new Set(btns)].slice(0, 25), text: t.slice(0, 900), bigImgs };
}

// Third pass only (HIDE_OVERLAYS=1): hide short promo overlays that reopen on scroll. A modal is a fixed or
// absolute layer over 20% of the viewport with z-index >= 10 and under 700 characters of text that reads
// as a promo. Its first 80 characters go into res.hidden so the report can say exactly what was removed.
async function hidePromos(p, res) {
  if (process.env.HIDE_OVERLAYS !== '1') return;
  const h = await p.evaluate(() => {
    const VW = innerWidth, VH = innerHeight, out = [];
    for (const e of document.querySelectorAll('body *')) {
      const cs = getComputedStyle(e); if (cs.position !== 'fixed' && cs.position !== 'absolute') continue;
      if (cs.display === 'none' || cs.visibility === 'hidden') continue;
      const r = e.getBoundingClientRect(); if (r.width * r.height < 0.2 * VW * VH || (parseInt(cs.zIndex) || 0) < 10) continue;
      const t = (e.innerText || '').replace(/\s+/g, ' ').trim();
      if (t.length > 700) continue;
      if (/discount|newsletter|sign ?up|subscribe|e-shop|unlock|mystery|% off|offer|friends of|get mine|first order|korting|nieuwsbrief|rabatt|early access|join the|welcome|10%|15%|20%/i.test(t)) { e.style.setProperty('display', 'none', 'important'); out.push(t.slice(0, 80)); }
    }
    document.documentElement.style.overflow = 'auto'; document.body.style.overflow = 'auto';
    return out; });
  for (const x of h) if (!res.hidden.includes(x)) res.hidden.push(x);
}

const CONSENT = [/yes, i am fine with cookies/i, /^oke$/i, /^that.s ok$/i, /accept all/i, /alles accepteren/i, /alle cookies accepteren/i, /accepteer alle/i, /alle akzeptieren/i, /alle cookies akzeptieren/i, /^accepteren$/i, /^akzeptieren$/i, /^akkoord/i, /^accept/i, /agree/i, /got it/i, /^ok$/i, /allow all/i, /alles toestaan/i, /alle erlauben/i, /einverstanden/i];
async function consent(p, res, t) {
  // one pass over visible buttons in the page (and open shadow roots one level down), clicked in CONSENT order
  const hit = await p.evaluate((src) => {
    const res = src.map(x => new RegExp(x[0], x[1]));
    const els = [];
    const walk = root => { for (const e of root.querySelectorAll('button, [role=button], a, input[type=button], input[type=submit]')) els.push(e); for (const h of root.querySelectorAll('*')) if (h.shadowRoot) for (const e of h.shadowRoot.querySelectorAll('button, [role=button], a')) els.push(e); };
    walk(document);
    const vis = els.filter(e => { const r = e.getBoundingClientRect(); const cs = getComputedStyle(e); return r.width > 0 && r.height > 0 && cs.visibility !== 'hidden' && cs.display !== 'none'; });
    for (const re of res) for (const e of vis) { const tx = (e.innerText || e.value || e.getAttribute('aria-label') || '').replace(/\s+/g, ' ').trim(); if (tx && tx.length < 40 && re.test(tx)) { e.click(); return tx; } }
    return null;
  }, CONSENT.map(r => [r.source, r.flags])).catch(() => null);
  if (hit) { res.clicked = (res.clicked ? res.clicked + ' | ' : '') + hit; await p.waitForTimeout(700); return true; }
  return false;
}
async function one(b, cat, url, locale) {
  const s = slug(url); const res = { cat, url, slug: s, locale, hidden: [] };
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, locale, userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', extraHTTPHeaders: { 'Accept-Language': locale === 'nl-NL' ? 'nl-NL,nl;q=0.9,en;q=0.8' : locale === 'de-DE' ? 'de-DE,de;q=0.9,en;q=0.8' : 'en-GB,en;q=0.9' } });
  const p = await ctx.newPage();
  try {
    await p.addInitScript(() => { window.__mut = 0; new MutationObserver(m => { window.__mut += m.length; }).observe(document, { attributes: true, subtree: true, attributeFilter: ['style', 'class', 'transform'] }); });
    const r = await p.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
    res.status = r && r.status(); res.finalUrl = p.url(); await p.waitForTimeout(3500 + (parseInt(process.env.EXTRA_WAIT) || 0));
    // consent and region overlays, most specific first (consent() is retried before every frame, 2026-10-25 BeBetter: Gymshark's banner arrived late)
    await consent(p, res, 500);
    // promo and notice modals (added 2026-10-25 after Anahi, Big Mamma and Carnar were covered on every frame)
    res.closed = 0;
    for (let k = 0; k < 3; k++) {
      await p.keyboard.press('Escape').catch(() => {}); await p.waitForTimeout(300);
      const n = await p.evaluate(() => { let c = 0; for (const e of document.querySelectorAll('[aria-label*="close" i], [aria-label*="sluiten" i], [aria-label*="schließen" i], [aria-label*="dismiss" i], .klaviyo-close-form, button.close, .modal-close, .popup-close, .pum-close, .sqs-popup-overlay-close, [class*="close-button" i], [class*="closeButton"], [class*="popup__close" i], [class*="modal__close" i], .mfp-close, .eicon-close, .dialog-close-button')) { const r = e.getBoundingClientRect(); const cs = getComputedStyle(e); if (r.width > 0 && r.height > 0 && cs.visibility !== 'hidden' && r.width < 120) { try { e.click(); c++; } catch (x) {} } } return c; });
      res.closed += n; if (!n) break; await p.waitForTimeout(700);
    }
    // region pickers, 'no thanks' links, small x buttons inside any big fixed overlay, then age gates
    for (const t of [/stay here/i, /fine here/i, /^no,? thanks?$/i, /^no thank you$/i, /^nee,? bedankt$/i, /^nein,? danke$/i, /^continue shopping$/i, /^no thanks, i.ll pay full price$/i]) {
      try { const btn = p.getByRole('button', { name: t }).first(); if (await btn.isVisible({ timeout: 300 })) { await btn.click({ timeout: 1500 }); res.closed++; await p.waitForTimeout(600); } } catch (e) {}
      try { const a = p.getByText(t).first(); if (await a.isVisible({ timeout: 300 })) { await a.click({ timeout: 1500 }); res.closed++; await p.waitForTimeout(600); } } catch (e) {}
    }
    res.closed += await p.evaluate(() => {
      let c = 0; const VW = innerWidth, VH = innerHeight;
      const overlays = [...document.querySelectorAll('body *')].filter(e => { const cs = getComputedStyle(e); if (cs.position !== 'fixed' && cs.position !== 'absolute') return false; const r = e.getBoundingClientRect(); return r.width * r.height > 0.2 * VW * VH && (parseInt(cs.zIndex) || 0) >= 10 && cs.display !== 'none' && cs.visibility !== 'hidden'; });
      for (const o of overlays) { for (const b of o.querySelectorAll('button, a, [role=button], span, div')) { const t = (b.innerText || '').trim(); const r = b.getBoundingClientRect(); if (r.width > 0 && r.width < 64 && r.height > 0 && r.height < 64 && /^(|×|✕|✖|x|X|close|sluiten|schließen)$/i.test(t) && (b.tagName !== 'DIV' && b.tagName !== 'SPAN' || b.onclick || b.getAttribute('role') === 'button' || /close/i.test(b.className + ' ' + (b.getAttribute('aria-label') || '')))) { try { b.click(); c++; break; } catch (x) {} } } }
      return c; });
    await p.waitForTimeout(700);
    if (/over 21|21 years|over 18|legal drinking age/i.test(await p.evaluate(() => document.body.innerText.slice(0, 20000)))) {
      try { const y = p.getByRole('button', { name: /^yes$/i }).first(); if (await y.isVisible({ timeout: 500 })) { await y.click({ timeout: 1500 }); res.ageGate = 'yes clicked'; await p.waitForTimeout(800); } } catch (e) {}
    }
    await p.waitForTimeout(1200); await consent(p, res, 300);
    res.title = await p.title();
    await hidePromos(p, res);
    res.first = await p.evaluate(firstScreen);
    await p.screenshot({ path: `${OUT}/${s}__0.jpg`, type: 'jpeg', quality: 60, timeout: 90000 });
    const H = await p.evaluate(() => document.documentElement.scrollHeight);
    res.height = H; const mut0 = await p.evaluate(() => window.__mut);
    for (let i = 1; i <= 4; i++) { await p.evaluate(y => window.scrollTo(0, y), Math.round(H * i / 5)); await p.waitForTimeout(1100); if (!res.clicked) await consent(p, res, 150); await hidePromos(p, res); await p.screenshot({ path: `${OUT}/${s}__${i}.jpg`, type: 'jpeg', quality: 55 }); }
    res.scrollMutations = (await p.evaluate(() => window.__mut)) - mut0;
    await p.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight)); await p.waitForTimeout(800);
    Object.assign(res, await p.evaluate(pageFacts));
    fs.writeFileSync(`${__dirname}/text/${s}.txt`, await p.evaluate(() => document.body.innerText || ''));
    fs.writeFileSync(`${__dirname}/html/${s}.html`, await p.content());
    await p.setViewportSize({ width: 390, height: 844 }); await p.evaluate(() => window.scrollTo(0, 0)); await p.waitForTimeout(1200); await hidePromos(p, res);
    await p.screenshot({ path: `${OUT}/${s}__m.jpg`, type: 'jpeg', quality: 55 });
    res.ok = true;
  } catch (e) { res.ok = false; res.err = String(e).slice(0, 200); }
  await ctx.close(); return res;
}
(async () => {
  const proxy = process.env.HTTPS_PROXY || process.env.https_proxy;
  const b = await chromium.launch({ executablePath: CHROME, args: ['--no-sandbox', '--ignore-certificate-errors-spki-list=' + spki].concat(process.env.GPU === '1' ? ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--autoplay-policy=no-user-gesture-required'] : []), proxy: proxy ? { server: proxy } : undefined });
  const out = fs.createWriteStream(OUTF);
  const q = sites.slice(); const workers = [];
  for (let w = 0; w < 4; w++) workers.push((async () => { while (q.length) { const [cat, url, loc] = q.shift(); const r = await one(b, cat, url, loc || 'en-GB'); out.write(JSON.stringify(r) + '\n'); console.log(r.ok ? 'OK ' : 'ERR', r.status || '', url, r.title ? '| ' + r.title.slice(0, 50) : '', r.err ? r.err.slice(0, 80) : ''); } })());
  await Promise.all(workers); out.end(); await b.close();
})();
