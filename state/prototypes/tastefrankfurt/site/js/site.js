/* Taste Frankfurt prototype by Astra. One enquiry, built as the visitor goes. Every control writes one state, kept in
   sessionStorage across pages, and every display reads it: the header button, the bar, the hero button, the place
   scene, the chalk boards, the guide price and the drawer with its hidden fields named exactly as on
   tastefrankfurt.com/kontakt/. Nothing is ever sent. */
(() => {
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const root = document.documentElement;
  const KEY = 'tf.anfrage', LKEY = 'tf.lang';
  const store = { get(k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } }, set(k, v) { try { sessionStorage.setItem(k, v); } catch (e) {} } };
  const reducedM = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clamp01 = v => v < 0 ? 0 : v > 1 ? 1 : v;
  const smooth = (a, b, x) => { const v = clamp01((x - a) / (b - a)); return v * v * (3 - 2 * v); };
  let OFFER = { lo: 45, hi: 65, lunch: 40, wedLo: 95, wedHi: 180, min: 1800, minGuests: 30, maxGuests: 2000 };
  try { OFFER = JSON.parse($('#tf-offer').textContent); } catch (e) {}

  // the labels each answer shows, in both languages, and the value their own form would carry
  const L = {
    anlass: { weihnachtsfeier: ['Weihnachtsfeier', 'Christmas party'], firmenfeier: ['Firmenfeier', 'Company party'], sommerfest: ['Sommerfest', 'Summer party'], empfang: ['Empfang & Messe', 'Receptions & fairs'], hochzeit: ['Hochzeit', 'Wedding'], geburtstag: ['Geburtstag', 'Birthday'] },
    platz: { buero: ['Büro', 'Office'], innenhof: ['Innenhof', 'Courtyard'], lager: ['Halle', 'Hall'], firmengelaende: ['Firmengelände', 'Company grounds'], dachterrasse: ['Dachterrasse', 'Roof terrace'], location: ['Eventlocation', 'Event venue'] },
    ort: { indoor: ['drinnen', 'indoors'], outdoor: ['draußen', 'outdoors'], beides: ['drinnen und draußen', 'in and out'] },
    linie: { american: ['American Menü', 'American menu'], french: ['French Menü', 'French menu'], fusion: ['Fusion Menü', 'Fusion menu'], unklar: ['Menü noch offen', 'Menu still open'] },
    bar: { cocktail: ['Mobile Cocktail-Bar mit Bartender', 'Mobile cocktail bar with a bartender'], sekt_wein_soft: ['Sekt, Wein und Softdrinks', 'Sekt, wine and soft drinks'], keine: ['Keine Bar', 'No bar'], unklar: ['Bar noch offen', 'Bar still open'] },
  };
  // the dishes on each of their lines, as their /menues/ page lists them
  const ITEMS = { american: [['Burger', 'Burgers'], ['Pommes', 'Fries'], ['Poffertjes', 'Poffertjes'], ['Softdrinks', 'Soft drinks']], french: [['Flammkuchen', 'Flammkuchen'], ['Waffeln', 'Waffles'], ['Softdrinks', 'Soft drinks']], fusion: [['Bowls', 'Bowls'], ['Schaschlik', 'Shashlik'], ['Desserts im Glas', 'Desserts in a glass']] };
  const PLATZ_ORT = { buero: 'indoor', innenhof: 'outdoor', lager: 'indoor', firmengelaende: 'outdoor', dachterrasse: 'outdoor', location: 'indoor' };
  const PLAN = { weihnachtsfeier: 'Christmas party', firmenfeier: 'company party', sommerfest: 'summer party', empfang: 'reception', hochzeit: 'wedding', geburtstag: 'birthday' };

  // ---- language. The two languages sit side by side, the switch shows one
  let lang = store.get(LKEY) === 'en' ? 'en' : 'de';
  const t = (de, en) => lang === 'en' ? en : de;
  const lab = (group, v) => (L[group] && L[group][v]) ? L[group][v][lang === 'en' ? 1 : 0] : '';
  const num = n => Number(n).toLocaleString(lang === 'en' ? 'en-GB' : 'de-DE');
  function setLang(l) {
    lang = l; store.set(LKEY, l); root.dataset.lang = l; root.lang = l;
    $$('[data-set-lang]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.setLang === l)));
    $$('[data-aria-de]').forEach(e => e.setAttribute('aria-label', e.dataset[l === 'en' ? 'ariaEn' : 'ariaDe']));
    $$('[data-alt-de]').forEach(e => e.alt = e.dataset[l === 'en' ? 'altEn' : 'altDe']);
    $$('[data-ph-de]').forEach(e => e.placeholder = e.dataset[l === 'en' ? 'phEn' : 'phDe']);
    $$('option[data-de]').forEach(o => o.textContent = o.dataset[l]);
    const tt = $('meta[name="tf-title-en"]'); if (tt) document.title = l === 'en' ? tt.content : $('meta[name="tf-title-de"]').content;
    render(); document.dispatchEvent(new CustomEvent('tf:lang', { detail: l }));
  }
  $$('[data-set-lang]').forEach(b => b.addEventListener('click', () => setLang(b.dataset.setLang)));

  // ---- the one state
  const DEFAULT = { anlass: 'weihnachtsfeier', ort: '', platz: '', flaeche: '', datum: '', uhrzeit: '', gaeste: '', linie: '', speisen: [], getraenke: [], desserts: [], bar: '', firma: '', name: '', email: '', telefon: '', nachricht: '' };
  let S = { ...DEFAULT };
  try { S = { ...DEFAULT, ...(JSON.parse(store.get(KEY) || 'null') || {}) }; } catch (e) { S = { ...DEFAULT }; }
  // a link from their own site can set the occasion, as /kontakt/?anlass=weihnachtsfeier does today
  try { const a = new URLSearchParams(location.search).get('anlass'); if (a && L.anlass[a]) S.anlass = a; } catch (e) {}
  function set(patch, from) {
    S = { ...S, ...patch }; store.set(KEY, JSON.stringify(S)); render(from);
    document.dispatchEvent(new CustomEvent('tf:state', { detail: { state: { ...S }, from, patch } }));
  }
  // their guide, guests times the per head band, never below the minimum order (offer.json)
  function band(anlass, g) {
    const pp = anlass === 'hochzeit' ? [OFFER.wedLo, OFFER.wedHi] : anlass === 'empfang' ? [OFFER.lunch, OFFER.hi] : [OFFER.lo, OFFER.hi];
    g = Math.max(OFFER.minGuests, Math.min(OFFER.maxGuests, Math.round(+g || 0)));
    return { g, pp, lo: Math.max(OFFER.min, g * pp[0]), hi: Math.max(OFFER.min, g * pp[1]) };
  }
  window.tfState = { get: () => ({ ...S }), set, band };
  const guideText = b => b.hi <= OFFER.min ? t(`ab ${num(OFFER.min)} €`, `from ${num(OFFER.min)} €`) : `${num(b.lo)} ${t('bis', 'to')} ${num(b.hi)} €`;
  const metres = v => v ? v.split(' x ').map(n => lang === 'en' ? n : n.replace('.', ',')).join(' x ') + ' m' : '';
  const dateText = d => new Date(d + 'T12:00:00').toLocaleDateString(lang === 'en' ? 'en-GB' : 'de-DE', { day: 'numeric', month: 'long' });
  function summary() {
    const parts = [];
    if (S.anlass) parts.push(lab('anlass', S.anlass));
    if (S.platz) parts.push(lab('platz', S.platz));
    if (S.flaeche) parts.push(metres(S.flaeche));
    if (S.gaeste) parts.push(`${num(S.gaeste)} ${t('Gäste', 'guests')}`);
    if (S.linie) parts.push(lab('linie', S.linie));
    if (S.datum) parts.push(dateText(S.datum));
    return parts;
  }
  // when Erik or Frederik answer by, 24 hours from now in Frankfurt
  function dueAt() {
    const d = new Date(Date.now() + 864e5), hm = d.toLocaleTimeString('de-DE', { timeZone: 'Europe/Berlin', hour: '2-digit', minute: '2-digit' }).replace(':', '.');
    return { hm, day: d.toLocaleDateString(lang === 'en' ? 'en-GB' : 'de-DE', { timeZone: 'Europe/Berlin', weekday: 'long' }) };
  }
  const dueLines = () => { const d = dueAt(); $$('.bar-due').forEach(e => { e.textContent = t(`Antwort bis morgen, ${d.hm} Uhr`, `Reply by tomorrow, ${d.hm}`); }); $$('[data-due-when]').forEach(e => { e.textContent = t(`morgen, ${d.hm} Uhr`, `tomorrow, ${d.hm}`); }); };

  function render(from) {
    $$('.ask-state').forEach(e => { e.textContent = S.gaeste ? `${num(S.gaeste)} ${t('Gäste', 'guests')} · ` : ''; });
    // the hero button names the occasion
    $$('[data-occ-de]').forEach(e => { e.textContent = L.anlass[S.anlass] ? L.anlass[S.anlass][0] : 'Event'; });
    $$('[data-occ-en]').forEach(e => { e.textContent = PLAN[S.anlass] || 'event'; });
    // the bar writes the party and lights a bulb for every answer
    const bs = $('.bar-sum');
    if (bs) {
      const txt = summary().join(' · ');
      if (bs.textContent !== txt) { bs.textContent = txt; bs.classList.remove('is-writing'); void bs.offsetWidth; bs.classList.add('is-writing'); }
      const n = [S.anlass, S.platz, S.flaeche, S.gaeste, S.datum, S.linie].filter(Boolean).length;
      $$('.bar-bulbs i').forEach((b, i) => b.classList.toggle('on', i < n));
    }
    dueLines();
    $$('[data-occ]').forEach(b => b.setAttribute('aria-checked', String(b.dataset.occ === S.anlass)));
    $$('[data-platz]').forEach(b => b.setAttribute('aria-checked', String(b.dataset.platz === S.platz)));
    $$('[data-linie]').forEach(b => b.setAttribute('aria-checked', String(b.dataset.linie === S.linie)));
    $$('[data-add]').forEach(b => b.setAttribute('aria-pressed', String((S[b.dataset.add] || []).includes(b.dataset.item))));
    $$('[data-bar-pick]').forEach(b => b.setAttribute('aria-pressed', String(S.bar === b.dataset.barPick)));
    $$('.dec .day').forEach(d => d.setAttribute('aria-pressed', String(!!S.datum && S.datum.slice(5, 7) === '12' && +S.datum.slice(8, 10) === +d.dataset.day)));
    $$('[data-guests-input]').forEach(r => { if (document.activeElement !== r) r.value = S.gaeste || 80; });
    $$('.guests-n').forEach(e => { e.textContent = num(S.gaeste || 80); });
    $$('[data-summary]').forEach(e => { const p = summary(); if (p.length > 1) e.textContent = p.join(' · '); });
    chalk(); price();
    $$('[data-guide]').forEach(dg => { const b = band(S.anlass, S.gaeste || 80); dg.textContent = t('Richtwert für ', 'Guide for ') + `${num(b.g)} ${t('Gäste', 'guests')}, ` + guideText(b) + t(' netto. Dein Angebot kommt persönlich.', ' net. Your offer comes from us personally.'); });
    if (from !== 'form') fillForm();
    board();
  }

  // ---- header and the phone menu
  const hd = $('.hd');
  const solid = () => hd && hd.classList.toggle('is-solid', scrollY > 24);
  addEventListener('scroll', solid, { passive: true }); solid();
  const menu = $('#menu'), mbtn = $('.hd-menu');
  function openMenu(open) {
    if (!menu) return; menu.hidden = !open; mbtn.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('menu-open', open);
    if (open) { const f = $('a, button', menu); f && f.focus(); } else mbtn.focus();
  }
  mbtn && mbtn.addEventListener('click', () => openMenu(menu.hidden));
  menu && $$('[data-close-menu]', menu).forEach(b => b.addEventListener('click', () => openMenu(false)));
  addEventListener('keydown', e => { if (e.key === 'Escape' && menu && !menu.hidden) openMenu(false); });

  // ---- every choice on the page writes the state
  $$('[data-occ]').forEach(b => b.addEventListener('click', () => set({ anlass: b.dataset.occ }, 'occ')));
  $$('[data-linie]').forEach(b => b.addEventListener('click', () => set({ linie: b.dataset.linie }, 'linie')));
  $$('[data-bar-pick]').forEach(b => b.addEventListener('click', () => set({ bar: S.bar === b.dataset.barPick ? '' : b.dataset.barPick }, 'bar')));
  $$('[data-add]').forEach(b => b.addEventListener('click', () => { const g = b.dataset.add, list = [...(S[g] || [])], i = list.indexOf(b.dataset.item); if (i < 0) list.push(b.dataset.item); else list.splice(i, 1); set({ [g]: list }, 'add'); }));
  $$('.dec .day').forEach(d => {
    const pick = () => { const now = new Date(), y = now.getMonth() === 11 && now.getDate() > +d.dataset.day ? now.getFullYear() + 1 : now.getFullYear(), v = `${y}-12-${String(d.dataset.day).padStart(2, '0')}`; set({ datum: S.datum === v ? '' : v }, 'dec'); };
    d.addEventListener('click', pick); d.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(); } });
  });

  // the guest number, a slider and a number you drag sideways, the page still scrolls up and down
  $$('[data-guests-input]').forEach(r => r.addEventListener('input', () => set({ gaeste: String(r.value) }, 'guests')));
  $$('[data-guests]').forEach(box => {
    const n = $('.guests-n', box); if (!n) return;
    let x0 = null, g0 = 80;
    n.addEventListener('pointerdown', e => { x0 = e.clientX; g0 = +(S.gaeste || 80); n.setPointerCapture(e.pointerId); });
    n.addEventListener('pointermove', e => { if (x0 == null) return; const step = innerWidth < 761 ? 2.2 : 1.4; let g = Math.round((g0 + (e.clientX - x0) * step * (g0 > 300 ? 4 : 1)) / 10) * 10; g = Math.max(30, Math.min(2000, g)); if (String(g) !== S.gaeste) set({ gaeste: String(g) }, 'guests'); });
    n.addEventListener('pointerup', () => { x0 = null; }); n.addEventListener('pointercancel', () => { x0 = null; });
  });

  // ---- the chalk board on the counter writes the chosen line
  let chalkKey = '';
  function chalk() {
    $$('.chalk-list').forEach(ul => {
      const rows = S.linie && ITEMS[S.linie] ? ITEMS[S.linie].map(i => i[lang === 'en' ? 1 : 0]) : S.linie === 'unklar' ? [t('Wir beraten euch', 'We’ll advise you')] : [t('Wählt oben eine Linie', 'Pick a line above')];
      const extra = (S.speisen || []).filter(x => !rows.includes(x));
      const all = [...rows, ...extra].slice(0, 7), key = all.join('|') + lang;
      if (key === chalkKey && ul.children.length) return; chalkKey = key;
      ul.innerHTML = ''; all.forEach((r, i) => { const li = document.createElement('li'); li.textContent = r; li.style.setProperty('--i', i); ul.appendChild(li); });
      const c = ul.closest('.chalk'); c.classList.remove('is-writing'); void c.offsetWidth; c.classList.add('is-writing');
    });
  }

  // ---- the guide price, a graph you drag
  function price() {
    $$('[data-price]').forEach(box => {
      const svg = $('.price-graph', box), b = band(S.anlass, S.gaeste || 80);
      $('.price-band', box).textContent = guideText(b);
      $('.price-for', box).textContent = t(`für ${num(b.g)} Gäste, ${lab('anlass', S.anlass)}, ${b.pp[0]} bis ${b.pp[1]} € pro Kopf, netto`, `for ${num(b.g)} guests, ${lab('anlass', S.anlass).toLowerCase()}, ${b.pp[0]} to ${b.pp[1]} € a head, net`);
      if (!svg) return;
      const W = 640, H = 330, L0 = 64, R0 = 16, T0 = 16, B0 = 44, gmax = Math.max(300, b.g);
      const ymax = Math.max(gmax * b.pp[1], 2000) * 1.08, X = g => L0 + (g - 30) / (gmax - 30) * (W - L0 - R0), Y = v => H - B0 - v / ymax * (H - T0 - B0);
      const pts = []; for (let g = 30; g <= gmax + .01; g += (gmax - 30) / 60) pts.push(g);
      const lo = pts.map(g => [X(g), Y(Math.max(OFFER.min, g * b.pp[0]))]), hi = pts.map(g => [X(g), Y(Math.max(OFFER.min, g * b.pp[1]))]);
      const P = a => a.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join('');
      const ticksX = [30, 100, 200, 300, ...(gmax > 300 ? [gmax] : [])].map(g => `<text x="${X(g).toFixed(1)}" y="${H - 22}" text-anchor="middle">${num(Math.round(g))}</text>`).join('');
      const stepY = ymax > 60000 ? 20000 : ymax > 20000 ? 5000 : ymax > 8000 ? 2000 : 1000;
      let gy = ''; for (let v = stepY; v < ymax; v += stepY) gy += `<line x1="${L0}" x2="${W - R0}" y1="${Y(v).toFixed(1)}" y2="${Y(v).toFixed(1)}"/><text x="${L0 - 8}" y="${(Y(v) + 4).toFixed(1)}" text-anchor="end">${num(v)} €</text>`;
      const cx = X(b.g), cy = (Y(b.lo) + Y(b.hi)) / 2;
      svg.innerHTML = `<g class="pg-grid">${gy}</g>
        <rect class="pg-floor" x="${L0}" y="${Y(OFFER.min).toFixed(1)}" width="${W - L0 - R0}" height="${(H - B0 - Y(OFFER.min)).toFixed(1)}" opacity=".55"/>
        <line class="pg-floor-line" x1="${L0}" x2="${W - R0}" y1="${Y(OFFER.min).toFixed(1)}" y2="${Y(OFFER.min).toFixed(1)}"/>
        <text class="pg-fl" x="${W - R0}" y="${(Y(OFFER.min) - 8).toFixed(1)}" text-anchor="end">${t('Mindestauftragswert', 'Minimum order')} ${num(OFFER.min)} €</text>
        <path class="pg-band" d="${P(hi)}L${lo.slice().reverse().map(p => p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join('L')}Z"/>
        <path class="pg-hi" d="${P(hi)}"/><path class="pg-lo" d="${P(lo)}"/>
        <line class="pg-cur" x1="${cx.toFixed(1)}" x2="${cx.toFixed(1)}" y1="${T0}" y2="${H - B0}"/>
        <circle class="pg-knob" cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="11"/>
        ${ticksX}<text x="${W - R0}" y="${H - 4}" text-anchor="end">${t('Gäste', 'guests')}</text>`;
      if (!svg.dataset.bound) {
        svg.dataset.bound = 1; let on = false;
        const pick = e => { const r = svg.getBoundingClientRect(), x = (e.clientX - r.left) / r.width * W, gm = Math.max(300, +(S.gaeste || 80)); let g = 30 + (x - L0) / (W - L0 - R0) * (gm - 30); g = Math.max(30, Math.min(300, Math.round(g / 5) * 5)); if (String(g) !== S.gaeste) set({ gaeste: String(g) }, 'price'); };
        svg.addEventListener('pointerdown', e => { on = true; svg.setPointerCapture(e.pointerId); pick(e); });
        svg.addEventListener('pointermove', e => { if (on) pick(e); }); svg.addEventListener('pointerup', () => { on = false; });
      }
    });
  }

  // photos that sit sideways off screen in a strip load before the visitor reaches them
  const early = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { $$('img[loading="lazy"]', e.target).forEach(i => { i.loading = 'eager'; }); early.unobserve(e.target); } }), { rootMargin: '120% 0px' });

  // ---- their events, passing through the wave of their mark as the visitor scrolls, the names riding along under it
  $$('.cases').forEach(sec => {
    const pin = $('.cases-pin', sec), rib = $('.ribbon', sec), strip = $('.ribbon-strip', sec), items = $$('.case', sec), tabs = $$('[data-case-tab]', sec);
    const svg = $('.ribbon-art', sec), path = $('.rb-path', sec), names = $$('.rb-name textPath', sec), bulbG = $('.rb-bulbs', sec), now = $('.case-now', sec), cta = $('[data-case-cta]', sec);
    if (!items.length || !pin || !svg) return;
    sec.classList.add('is-ribbon'); early.observe(sec);
    const n = items.length, NS = 'http://www.w3.org/2000/svg';
    let W = 0, top = 0, th = 0, amp = 0, per = 0, off = 0, lead = 0, pos = 0, want = 0, cur = -1, raf = 0, on = false, bulbs = [], gap = 60;
    function measure() {
      W = pin.clientWidth; const ph = innerWidth < 761, pr = pin.getBoundingClientRect();
      svg.setAttribute('viewBox', `0 0 ${W} ${pin.clientHeight}`);
      const fs = parseFloat(getComputedStyle(svg.querySelector('.rb-name')).fontSize); off = fs * .82 + 14; lead = Math.min(64, Math.max(16, innerWidth * .044));
      const above = $('.cases-top', sec).getBoundingClientRect().bottom - pr.top, below = $('.cases-foot', sec).getBoundingClientRect().top - pr.top, k = ph ? .075 : .08;
      th = Math.max(180, (below - 10 - off - fs * .24 - above - 16) / (1 + 2 * k)); amp = th * k; top = above + 16 + amp; per = W / (ph ? 1.2 : 2.05);
      strip.style.top = (top - amp) + 'px'; strip.style.height = (th + 2 * amp) + 'px'; strip.style.setProperty('--cw', W + 'px');
      gap = ph ? 44 : 58; const count = Math.ceil(W / gap) + 2;
      if (bulbs.length !== count) { bulbG.innerHTML = ''; bulbs = Array.from({ length: count }, () => { const g = document.createElementNS(NS, 'g'); g.innerHTML = '<circle r="10" class="rb-halo"/><circle r="2.7" class="rb-core"/>'; bulbG.appendChild(g); return g; }); }
    }
    function fromScroll() {
      const r = sec.getBoundingClientRect(), total = Math.max(1, sec.offsetHeight - innerHeight), raw = clamp01(-r.top / total) * (n - 1);
      const i = Math.min(n - 2, Math.floor(raw)); want = Math.min(n - 1, i + smooth(.2, .8, raw - i));
    }
    function draw(ts) {
      const phase = (reducedM() ? 0 : ts * .00028) + pos * 1.35, y = x => top + amp * Math.cos(2 * Math.PI * x / per + phase);
      let d = ''; for (let i = 0; i <= 40; i++) { const x = -30 + (W + 60) * i / 40; d += (i ? 'L' : 'M') + x.toFixed(1) + ' ' + y(x).toFixed(1); }
      for (let i = 40; i >= 0; i--) { const x = -30 + (W + 60) * i / 40; d += 'L' + x.toFixed(1) + ' ' + (y(x) + th).toFixed(1); }
      rib.style.clipPath = `path('${d}Z')`;
      strip.style.transform = `translate3d(${(-pos * W).toFixed(1)}px,0,0)`;
      items.forEach((it, i) => { const rel = Math.max(-1.2, Math.min(1.2, i - pos)); it.style.setProperty('--rel', rel.toFixed(3)); const im = it.querySelector('img'), b = (it.dataset.at || '50 50').split(' ').map(Number); if (im) im.style.objectPosition = `${b[0]}% ${Math.max(0, Math.min(100, b[1] - rel * 16)).toFixed(1)}%`; });
      let p = '', acc = 0, px = 0, py = 0; const Ls = [];
      for (let i = 0; i <= 150; i++) { const x = -W + 3 * W * i / 150, yy = y(x) + th + off; if (i) acc += Math.hypot(x - px, yy - py); Ls.push(acc); px = x; py = yy; p += (i ? 'L' : 'M') + x.toFixed(1) + ' ' + yy.toFixed(1); }
      path.setAttribute('d', p);
      const at = x => { const f = Math.max(0, Math.min(149.999, (x + W) / (3 * W) * 150)), i = Math.floor(f); return Ls[i] + (Ls[i + 1] - Ls[i]) * (f - i); };
      names.forEach((tp, i) => tp.setAttribute('startOffset', at((i - pos) * W + lead).toFixed(1)));
      const shift = ((pos * W) % gap + gap) % gap;
      bulbs.forEach((g, k) => { const x = k * gap - shift, tw = reducedM() ? 1 : .78 + .22 * Math.sin(ts / 420 + k * 1.9); g.setAttribute('transform', `translate(${x.toFixed(1)} ${(y(x) - 13).toFixed(1)})`); g.style.opacity = tw.toFixed(2); });
      const c = Math.round(pos);
      if (c !== cur) { cur = c; tabs.forEach((x, k) => x.setAttribute('aria-current', String(k === c))); now.innerHTML = $('.case-line', items[c]).innerHTML; if (cta) cta.dataset.anlass = items[c].dataset.anlass; }
    }
    function tick(ts) { raf = 0; fromScroll(); pos += (want - pos) * (reducedM() ? 1 : .14); if (Math.abs(want - pos) < .0005) pos = want; draw(ts); if (on) raf = requestAnimationFrame(tick); }
    const go = () => { if (!raf) raf = requestAnimationFrame(tick); };
    tabs.forEach((x, k) => x.addEventListener('click', () => { const total = sec.offsetHeight - innerHeight; scrollTo({ top: sec.getBoundingClientRect().top + scrollY + total * k / (n - 1), behavior: reducedM() ? 'auto' : 'smooth' }); }));
    new IntersectionObserver(es => { on = es[0].isIntersecting; if (on) go(); }, { rootMargin: '10% 0px' }).observe(sec);
    addEventListener('resize', () => { measure(); go(); }, { passive: true });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { measure(); go(); });
    measure(); fromScroll(); pos = want; draw(performance.now());
  });

  // ---- the place scene, their stand travelling to your kind of place
  function canPlay() { return !reducedM() && !(navigator.connection && navigator.connection.saveData); }
  $$('.place').forEach(sec => {
    const figs = $$('[data-place-fig]', sec), btns = $$('[data-platz]', sec), lines = $$('[data-place-line]', sec), strip = $('.place-strip', sec);
    if (!figs.length) return; let cur = null, tm = 0; early.observe(sec);
    function show(p, write) {
      const i = figs.findIndex(x => x.dataset.placeFig === p); if (i < 0) return;
      if (write) set({ platz: p, ort: PLATZ_ORT[p] }, 'place');
      if (cur === p) return; const first = cur === null; cur = p;
      strip.style.transform = `translateX(calc(${-i} * (100% + 14px)))`;
      if (!first && !reducedM()) { sec.classList.remove('is-travel'); void sec.offsetWidth; sec.classList.add('is-travel'); clearTimeout(tm); tm = setTimeout(() => sec.classList.remove('is-travel'), 1300); }
      $$('img', figs[i]).forEach(im => { im.loading = 'eager'; });
      lines.forEach(l => l.hidden = l.dataset.placeLine !== p); sec.dataset.current = p;
      figs.forEach((x, k) => { const v = $('video', x); if (v) { if (k === i && canPlay()) v.play().catch(() => {}); else v.pause(); } });
    }
    btns.forEach(b => b.addEventListener('click', () => show(b.dataset.platz, true)));
    show(S.platz && figs.some(x => x.dataset.placeFig === S.platz) ? S.platz : figs[0].dataset.placeFig, false);
    let x0 = null, y0 = 0; const stage = $('.place-stage', sec);
    stage.addEventListener('pointerdown', e => { x0 = e.clientX; y0 = e.clientY; }, { passive: true });
    stage.addEventListener('pointerup', e => { if (x0 == null) return; const dx = e.clientX - x0, dy = e.clientY - y0; x0 = null; if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.4) { const k = (figs.findIndex(x => x.dataset.placeFig === cur) + (dx < 0 ? 1 : -1) + figs.length) % figs.length; show(figs[k].dataset.placeFig, true); } }, { passive: true });
    // the film's poster is set once the strip is near
    new IntersectionObserver((es, o) => { if (!es[0].isIntersecting) return; $$('video[data-poster]', sec).forEach(v => { v.poster = v.dataset.poster; }); o.disconnect(); }, { rootMargin: '120% 0px' }).observe(sec);
    new IntersectionObserver(es => { const on = es[0].isIntersecting; figs.forEach(x => { const v = $('video', x); if (v) { if (on && x.dataset.placeFig === cur && canPlay()) v.play().catch(() => {}); else v.pause(); } }); }, { threshold: 0.2 }).observe(sec);
  });

  // ---- will it fit. Their own two numbers, about 3 x 5 metres on average and 160 x 160 cm at the smallest, to scale
  $$('[data-fit]').forEach(box => {
    const rb = $('[name="fit-b"]', box), rt = $('[name="fit-t"]', box), svg = $('.fit-plan', box), says = $('.fit-says', box), q = s => $(s, svg);
    if (!rb || !svg) return;
    const X0 = 12, Y0 = 12, PW = 238, PH = 146; let K = 13.4, dragK = 0;
    const nm = v => (lang === 'en' ? String(v) : String(v).replace('.', ','));
    let touched = !!S.flaeche;
    if (S.flaeche) { const [b0, t0] = S.flaeche.split(' x ').map(Number); if (b0) rb.value = b0; if (t0) rt.value = t0; }
    const R = (el, x, y, w, h) => { el.setAttribute('x', x.toFixed(1)); el.setAttribute('y', y.toFixed(1)); el.setAttribute('width', Math.max(0, w).toFixed(1)); el.setAttribute('height', Math.max(0, h).toFixed(1)); };
    const Tx = (el, x, y, s) => { el.setAttribute('x', x.toFixed(1)); el.setAttribute('y', y.toFixed(1)); el.textContent = s; };
    function draw(write) {
      const B = +rb.value, D = +rt.value; K = dragK || Math.min(PW / B, PH / D, 40); const w = B * K, h = D * K;
      const avg = (B >= 5 && D >= 3) || (B >= 3 && D >= 5), small = B >= 1.6 && D >= 1.6;
      const sw = !(B >= 5 && D >= 3) && B >= 3 && D >= 5 ? 3 : 5, sd = sw === 5 ? 3 : 5;
      R(q('.fit-space'), X0, Y0, w, h); R(q('.fit-handle'), X0 + w - 6, Y0 + h - 6, 12, 12);
      R(q('.fit-stand'), X0 + 3, Y0 + 3, sw * K, sd * K); q('.fit-stand').classList.toggle('is-over', !avg);
      R(q('.fit-min'), X0 + 3, Y0 + 3, 1.6 * K, 1.6 * K); q('.fit-min').classList.toggle('is-over', !small);
      Tx(q('.fit-sl'), X0 + 3 + (1.6 * K + sw * K) / 2, Y0 + 3 + Math.max(1.6 * K + 14, sd * K / 2 + 4), '3 x 5 m'); Tx(q('.fit-ml'), X0 + 3 + .8 * K, Y0 + 3 + .8 * K + 4, '160');
      Tx(q('.fit-w'), X0 + w / 2, Y0 + h + 17, nm(B) + ' m'); Tx(q('.fit-d'), X0 + w + 9, Y0 + h / 2 + 4, nm(D) + ' m');
      rb.nextElementSibling.textContent = nm(B) + ' m'; rt.nextElementSibling.textContent = nm(D) + ' m';
      if (touched) says.textContent = avg
        ? t(`${nm(B)} x ${nm(D)} m bei euch. Das reicht für unseren Stand, der im Schnitt ca. 3 x 5 Meter braucht.`, `${nm(B)} x ${nm(D)} m at yours. That's room for our stand, which needs about 3 x 5 metres on average.`)
        : small ? t(`${nm(B)} x ${nm(D)} m bei euch. Das reicht für unseren kleinsten Aufbau mit 160 x 160 cm.`, `${nm(B)} x ${nm(D)} m at yours. That fits our smallest setup of 160 x 160 cm.`)
        : t(`${nm(B)} x ${nm(D)} m bei euch. Das ist kleiner als unser kleinster Aufbau mit 160 x 160 cm, schreibt uns trotzdem.`, `${nm(B)} x ${nm(D)} m at yours. That's smaller than our smallest setup of 160 x 160 cm, write to us anyway.`);
      if (write) { touched = true; set({ flaeche: `${B} x ${D}` }, 'fit'); }
    }
    [rb, rt].forEach(r => r.addEventListener('input', () => draw(true)));
    let drag = false;
    const pick = e => { const r = svg.getBoundingClientRect(), s = 300 / r.width, x = (e.clientX - r.left) * s, y = (e.clientY - r.top) * s;
      rb.value = Math.max(1, Math.min(20, Math.round((x - X0) / K * 2) / 2)); rt.value = Math.max(1, Math.min(12, Math.round((y - Y0) / K * 2) / 2)); draw(true); };
    svg.addEventListener('pointerdown', e => { drag = true; dragK = K; svg.setPointerCapture(e.pointerId); pick(e); });
    svg.addEventListener('pointermove', e => { if (drag) pick(e); });
    svg.addEventListener('pointerup', () => { drag = false; dragK = 0; draw(false); });
    document.addEventListener('tf:lang', () => draw(false));
    draw(false);
  });

  // ---- their region draws itself, the cities light up one by one; things rise into view
  const drawn = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-drawn'); drawn.unobserve(e.target); } }), { threshold: 0.3 });
  $$('[data-draw]').forEach(e => drawn.observe(e));
  const rise = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-in'); rise.unobserve(e.target); } }), { threshold: 0.12 });
  $$('.rise').forEach(e => rise.observe(e));

  // ---- the names on /referenzen/, pointing at one shows its own event photo
  $$('[data-names]').forEach(sec => {
    const box = $('.names-photo', sec), img = box && $('img', box); if (!img) return;
    const show = (src, pos) => { if (img.dataset.now === src) return; img.dataset.now = src; box.classList.add('is-swap'); const n = new Image(); n.onload = () => { const pic = img.closest('picture'); if (pic) pic.querySelectorAll('source').forEach(x => x.remove()); img.srcset = ''; img.src = src; img.style.objectPosition = pos || '50% 50%'; box.classList.remove('is-swap'); }; n.src = src; };
    $$('[data-peek]', sec).forEach(l => { const go = () => show(l.dataset.peek, l.dataset.peekPos); l.addEventListener('pointerenter', go); l.addEventListener('focus', go); });
  });

  // ---- the enquiry, in the drawer or on /kontakt/
  const dr = $('#anfrage'), form = $('form.enq'), host = dr || $('.kontakt');
  function openDrawer(patch) {
    if (patch && Object.keys(patch).length) set(patch, 'cta');
    if (!dr) { const f = form && $('[name="Firma"]', form); if (f) { f.scrollIntoView({ block: 'center' }); f.focus({ preventScroll: true }); } return; }
    fillForm(); board(true); dr.classList.remove('is-sent');
    if (typeof dr.showModal === 'function') dr.showModal(); else dr.setAttribute('open', '');
    document.body.classList.add('dr-open');
    const first = $('[name="Firma"]', dr); setTimeout(() => first && first.focus({ preventScroll: true }), 350);
  }
  function closeDrawer() { if (dr) { dr.close ? dr.close() : dr.removeAttribute('open'); } else if (host) host.classList.remove('is-sent'); }
  dr && dr.addEventListener('close', () => document.body.classList.remove('dr-open'));
  dr && dr.addEventListener('click', e => { if (e.target === dr) closeDrawer(); });
  $$('[data-close-drawer]').forEach(b => b.addEventListener('click', closeDrawer));
  document.addEventListener('click', e => {
    const a = e.target.closest('[data-anfragen]'); if (!a) return;
    e.preventDefault(); if (menu && !menu.hidden) openMenu(false);
    const patch = {}; if (a.dataset.anlass) patch.anlass = a.dataset.anlass;
    openDrawer(patch);
  });
  const F = n => form && form.elements.namedItem(n);
  function fillForm() {
    if (!form) return;
    const v = (n, x) => { const el = F(n); if (el && document.activeElement !== el) el.value = x || ''; };
    v('Anlass', S.anlass); v('Wunschdatum', S.datum); v('Uhrzeit', S.uhrzeit); v('Anzahl_Gaeste', S.gaeste); v('Platz', S.platz);
    v('Linie', S.linie); v('Bar', S.bar); v('Firma', S.firma); v('Name', S.name); v('email', S.email); v('Telefon', S.telefon); v('Nachricht', S.nachricht);
    // the hidden fields their inbox already reads, now complete
    const menues = [S.linie && S.linie !== 'unklar' ? L.linie[S.linie][0] : '', S.bar && S.bar !== 'unklar' && S.bar !== 'keine' ? L.bar[S.bar][0] : ''].filter(Boolean);
    v('Ausgewaehlte_Menues', menues.join(', '));
    v('Ausgewaehlte_Speisen', [...(S.speisen || []), ...(S.getraenke || []), ...(S.desserts || [])].join(', '));
    v('Ort', [S.platz ? L.platz[S.platz][0] : '', S.ort ? L.ort[S.ort][0] : '', S.flaeche ? 'Platz ca. ' + S.flaeche.replace(/\./g, ',') + ' m' : ''].filter(Boolean).join(', '));
    v('Anfragequelle', 'Prototyp ' + (location.pathname === '/' ? 'Startseite' : location.pathname));
  }
  form && form.addEventListener('input', e => {
    const n = e.target.name, map = { Anlass: 'anlass', Wunschdatum: 'datum', Uhrzeit: 'uhrzeit', Anzahl_Gaeste: 'gaeste', Platz: 'platz', Linie: 'linie', Bar: 'bar', Firma: 'firma', Name: 'name', email: 'email', Telefon: 'telefon', Nachricht: 'nachricht' };
    if (!map[n]) return; const patch = { [map[n]]: e.target.value };
    if (n === 'Platz') patch.ort = PLATZ_ORT[e.target.value] || '';
    set(patch, 'form');
  });
  // the chalk board beside the form writes their party, line by line
  function board(rewrite) {
    const b = $('.board-lines'); if (!b) return;
    const g = S.gaeste ? band(S.anlass, S.gaeste) : null;
    const rows = [
      lab('anlass', S.anlass) || t('Eure Feier', 'Your party'),
      S.platz ? t('im ', 'at the ') + (lang === 'en' ? lab('platz', S.platz).toLowerCase() : lab('platz', S.platz)) : t('bei euch vor Ort', 'at your place'),
      (S.datum ? dateText(S.datum) : t('Datum offen', 'Date open')) + (S.uhrzeit ? ', ' + S.uhrzeit.replace(':', '.') + t(' Uhr', '') : ''),
      S.gaeste ? `${num(S.gaeste)} ${t('Gäste', 'guests')}` : t('Gäste offen', 'Guests open'),
      S.flaeche ? t(`${metres(S.flaeche)} Platz`, `${metres(S.flaeche)} of room`) : '',
      S.linie ? lab('linie', S.linie) : '',
      S.bar && S.bar !== 'keine' ? lab('bar', S.bar) : '',
      g ? t('Richtwert ', 'Guide ') + guideText(g) : '',
    ].filter(Boolean);
    const key = rows.join('|') + lang;
    if (!rewrite && b.dataset.key === key) return; b.dataset.key = key;
    b.innerHTML = ''; rows.forEach((r, i) => { const li = document.createElement('li'); li.textContent = r; li.style.setProperty('--i', i); b.appendChild(li); });
    b.classList.remove('is-writing'); void b.offsetWidth; b.classList.add('is-writing');
  }
  form && form.addEventListener('submit', e => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    // nothing leaves the page. The board turns and shows when the answer is due, 24 hours from now in Frankfurt
    const due = dueAt(), firm = S.firma || S.name, dt = S.datum ? dateText(S.datum) : '';
    $('.board-sent-for').textContent = t(`Angefragt für ${firm}${dt ? ', ' + dt : ''}`, `Requested for ${firm}${dt ? ', ' + dt : ''}`);
    $('.board-sent-due').textContent = t(`Antwort bis morgen, ${due.hm} Uhr`, `Reply by tomorrow, ${due.hm}`);
    $('.board-sent-day').textContent = t(`Das ist ${due.day}.`, `That's ${due.day}.`);
    host.classList.add('is-sent'); const f = $('.board-sent-close', host); f && f.focus();
  });

  // ---- the bar steps aside wherever an enquiry button or the drawer is already on screen
  const bar = $('.bar');
  if (bar) {
    const inline = $$('[data-anfragen]').filter(x => !x.closest('.bar, .hd, #menu, dialog'));
    const seen = new Set();
    let armed = false; const update = () => bar.classList.toggle('is-away', !armed || seen.size > 0);
    const arm = () => { if (!armed) { armed = true; update(); } };
    setTimeout(arm, 2000); addEventListener('scroll', arm, { once: true, passive: true });
    const io = new IntersectionObserver(es => { es.forEach(e => e.isIntersecting ? seen.add(e.target) : seen.delete(e.target)); update(); }, { rootMargin: '0px 0px -64px 0px' });
    inline.forEach(x => io.observe(x));
  }

  setLang(lang);
  setInterval(dueLines, 30000);
  root.classList.add('js');
})();
