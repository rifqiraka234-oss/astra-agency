/* Honey It's Handled v2. One state carried down the page, {path, date, place, kind, guests, help, tabs, first}. Every
   control writes it, every display reads it, and the letter arrives written. Scroll scenes write CSS variables only. */
(() => {
  'use strict';
  const H = document.documentElement;
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const DATA = JSON.parse($('#hih-data').textContent);
  const P = DATA.paths, TABS = DATA.tabs, YEARS = DATA.offerYears;
  const qs = new URLSearchParams(location.search);
  const RM = H.classList.contains('rm');
  const SAVE = !!(navigator.connection && navigator.connection.saveData);
  const WD = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const MO = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const pd = s => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
  const iso = d => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  const TODAY = (() => { const t = qs.get('today'); if (t) return pd(t); const n = new Date(); return new Date(n.getFullYear(), n.getMonth(), n.getDate()); })();
  const MIN = pd('2026-11-01'), MAX = pd('2029-12-31');
  const daysTo = d => Math.round((d - TODAY) / 864e5);
  const bigDate = d => d.getDate() + ' ' + MO[d.getMonth()] + ' ' + d.getFullYear();
  const longDate = d => WD[d.getDay()] + ' ' + bigDate(d);
  const shortDate = d => WD[d.getDay()].slice(0, 3) + ' ' + d.getDate() + ' ' + MO[d.getMonth()].slice(0, 3) + ' ' + d.getFullYear();
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const join = xs => xs.length < 2 ? (xs[0] || '') : xs.slice(0, -1).join(', ') + ' and ' + xs[xs.length - 1];
  const tabWord = t => t === 'Plan B for plan B' ? 'plan B for plan B' : t === 'Plan B' ? 'plan B' : t === 'The Pinterest board' ? 'the Pinterest board' : t[0].toLowerCase() + t.slice(1);
  const KIND = {
    private: ['a milestone birthday or anniversary', 'a private party', 'a dinner or a garden party', 'an engagement party', 'a celebration of my own'],
    company: ['a company dinner or celebration', 'a product launch or brand activation', 'an award ceremony or gala', 'a networking event or reception', 'a company anniversary or team event']
  };

  // ------------------------------------------------------------------ the state
  const slot = k => { const d = pd(P[k].defaultDate); return { date: d, noDate: false, year: d.getFullYear(), guests: P[k].guests, help: P[k].help[0].id, tabs: new Set(), kind: k === 'company' ? 2 : 0 }; };
  const S = { path: 'wedding', place: 'local', first: true, dirty: false, sent: false, p: { wedding: slot('wedding'), private: slot('private'), company: slot('company') } };
  const cur = () => S.p[S.path];
  const ALL = TABS.map((_, i) => i);
  const held = () => { const c = cur(); if (c.help === 'full' || c.help === 'whole') return ALL; if (c.help === 'day') return []; return [...c.tabs].sort((a, b) => a - b); };
  const helpName = () => P[S.path].help.find(h => h.id === cur().help).name;
  const offerOn = () => S.path === 'wedding' && YEARS.includes(cur().noDate ? cur().year : cur().date.getFullYear());

  function message() {
    const c = cur(), when = c.noDate ? `in ${c.year}, no date yet` : `on ${longDate(c.date)}`, words = held().map(i => tabWord(TABS[i]));
    if (S.path === 'wedding') {
      const where = S.place === 'local' ? 'here in Belgium' : 'somewhere abroad';
      let s = `Hi Elise, we’re getting married ${when}, ${where}, with about ${c.guests} guests. `;
      s += c.help === 'full' ? 'We’d love full planning' : c.help === 'day' ? 'We’d love you to coordinate the day itself' : 'We’d love help with ' + (words.length ? join(words) : 'part of the planning');
      return s + (offerOn() && S.first ? ', and we’d like to be one of your first couples.' : '.');
    }
    if (S.path === 'private') {
      let s = `Hi Elise, I’m planning ${KIND.private[c.kind]} ${when}, for about ${c.guests} guests. `;
      return s + (c.help === 'whole' ? 'I’d love you to handle the whole event.' : 'I’d love you to coordinate ' + (words.length ? join(words) : 'it on the day') + '.');
    }
    let s = `Hi Elise, we’re planning ${KIND.company[c.kind]} ${when}, for about ${c.guests} guests. `;
    if (c.help === 'whole') return s + 'We’d like you to run the whole production.';
    if (c.help === 'coord') return s + 'We’d like you to coordinate ' + (words.length ? join(words) : 'it with our team') + '.';
    return s + 'We’d like to hire you as a freelance event manager in our team' + (words.length ? ', for ' + join(words) : '') + '.';
  }
  const celebrating = () => S.path === 'wedding' ? (S.place === 'local' ? 'Wedding' : 'Destination Wedding') : S.path === 'private' ? 'Private Event' : 'Corporate Event';
  const dateShort = () => cur().noDate ? cur().year + ', no date yet' : shortDate(cur().date);
  const barText = () => `${P[S.path].short} · ${dateShort()} · ${cur().guests} guests · ${helpName()}`;
  function guestsLine(g) {
    if (g < 125) return 'Fewer than Cinco Cero’s 125, a long table or a few round ones.';
    if (g === 125) return 'Exactly Cinco Cero’s 125.';
    if (g < 570) return 'Between her two nights, more than Cinco Cero, fewer than the Pro League Awards.';
    return 'As many as the Pro League Awards ’26, or more.';
  }

  // ------------------------------------------------------------------ render, every display reads the state
  const out = (k, v) => $$(`[data-o="${k}"]`).forEach(e => { if (e.textContent !== v) e.textContent = v; });
  let lastBig = '';
  function render(flip) {
    const c = cur(), path = S.path;
    H.dataset.path = path; H.dataset.help = c.help; H.dataset.place = S.place;
    $$('input[name="path"]').forEach(i => { i.checked = i.value === path; });
    out('cta', P[path].cta);
    out('whenQ', P[path].when);
    const big = c.noDate ? String(c.year) : bigDate(c.date);
    out('weekday', c.noDate ? 'No date yet, sometime in' : WD[c.date.getDay()]);
    out('dateBig', big);
    if (flip && big !== lastBig && !RM) { const e = $('.dd'); e.classList.remove('flip'); void e.offsetWidth; e.classList.add('flip'); }
    lastBig = big;
    const n = c.noDate ? null : daysTo(c.date);
    out('dateCount', c.noDate ? 'Any day in ' + c.year + ' is a good start for a first talk.' : n === 1 ? 'Tomorrow' : n + ' days from today');
    const din = $('input[name="date"]'); if (din && !c.noDate && din.value !== iso(c.date)) din.value = iso(c.date);
    $('[data-nodate]').setAttribute('aria-pressed', String(c.noDate));
    $('[data-years]').hidden = !c.noDate;
    $$('.yr').forEach(b => b.setAttribute('aria-pressed', String(+b.dataset.year === c.year)));
    $$('input[name="place"]').forEach(i => { i.checked = i.value === S.place; });
    $('input[name="firstcouples"]').checked = S.first;
    $('[data-offer]').hidden = !offerOn();
    $('[data-offer-off]').hidden = path !== 'wedding' || offerOn();
    ['private', 'company'].forEach(k => $$(`input[name="kind-${k}"]`).forEach(i => { i.checked = +i.value === S.p[k].kind; }));
    ['wedding', 'private', 'company'].forEach(k => $$(`input[name="help-${k}"]`).forEach(i => { i.checked = i.value === S.p[k].help; }));
    // the planner
    const h = new Set(held());
    $$('.tab').forEach(b => b.setAttribute('aria-pressed', String(h.has(+b.dataset.tab))));
    $('#tabs').style.setProperty('--held', c.help === 'day' ? '0' : (h.size / 17).toFixed(4));
    out('tabsQ', path === 'company' ? 'How should Elise work with you?' : 'How much should Elise take on?');
    out('tabCount', c.help === 'day' ? 'You hold all 17. Elise takes the day itself.' : `Elise holds ${h.size} of 17.`);
    out('tabsHint', (c.help === 'full' || c.help === 'whole') ? 'Tap a tab to keep it yourself.' : c.help === 'day' ? 'Tap a tab to hand it over as well.' : h.size ? 'Tap a tab to take it back.' : 'Tap the tabs she should take.');
    // the plan card under the lens
    out('planWhat', path === 'wedding' ? 'Your wedding' : path === 'private' ? 'Your celebration' : 'Your event');
    out('planDate', dateShort());
    out('planPlace', path === 'wedding' ? (S.place === 'local' ? 'here in Belgium' : 'somewhere abroad') : KIND[path][c.kind]);
    out('planGuests', `About ${c.guests} guests`);
    out('planHelp', c.help === 'day' || c.help === 'full' || c.help === 'whole' ? helpName() : `${helpName()}, ${h.size} of 17 tabs`);
    out('lensCap', path === 'company' ? 'The Handelsbeurs set for the Pro League Awards ’26, 25 May 2026. Photo by Kaat DM' : 'Cinco Cero, a 50th birthday, 28 August 2026');
    // guests
    out('guests', String(c.guests));
    const r = $('input[name="guests"]'); if (+r.value !== c.guests) r.value = c.guests; r.setAttribute('aria-valuetext', c.guests + ' guests');
    out('guestsLine', guestsLine(c.guests));
    out('guestsQ', path === 'company' ? 'How many guests are you expecting?' : 'How many people are coming?');
    // the letter
    const sel = $('select[name="celebrating"]'); sel.value = celebrating();
    const ta = $('[data-f="message"]'); if (!S.dirty) ta.value = message();
    $('[data-rewrite-row]').hidden = !S.dirty;
    out('bar', barText());
    out('peek', $('[data-lens]').classList.contains('peek') ? 'Back to the moment' : 'See what Elise sees');
    mail();
    try { localStorage.setItem('hih-path', path); } catch (e) {}
  }
  function mail() {
    const f = $('[data-letter]'), v = n => (f.elements[n].value || '').trim();
    const name = [v('first'), v('last')].filter(Boolean).join(' ');
    const subject = `${P[S.path].short} enquiry${name ? ' from ' + name : ''}`;
    const lines = [name, v('email'), v('phone'), '', 'What are we celebrating? ' + v('celebrating'), '', v('message'), '', v('found') ? 'How did you find Honey, it’s Handled? ' + v('found') : ''].filter((l, i, a) => l !== '' || (a[i - 1] !== '' && i));
    $('[data-mail]').href = `mailto:${DATA.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
  }

  // ------------------------------------------------------------------ the controls write the state
  const set = (o, flip) => {
    if (o.path && P[o.path]) S.path = o.path;
    const c = cur();
    if ('date' in o) { c.date = new Date(clamp(o.date, MIN, MAX)); c.noDate = false; c.year = c.date.getFullYear(); }
    if ('noDate' in o) c.noDate = o.noDate;
    if ('year' in o) c.year = o.year;
    if ('place' in o) S.place = o.place;
    if ('first' in o) S.first = o.first;
    if ('kind' in o) c.kind = o.kind;
    if ('guests' in o) c.guests = clamp(Math.round(o.guests), 10, 600);
    if ('help' in o) { c.help = o.help; if (o.tabs) c.tabs = new Set(o.tabs); else if (!['full', 'whole', 'day'].includes(o.help)) c.tabs = new Set(); }
    else if (o.tabs) c.tabs = new Set(o.tabs);
    render(flip);
  };
  window.HIH = { set, S, get: () => ({ path: S.path, ...cur(), tabs: held(), message: message(), bar: barText(), celebrating: celebrating(), offer: offerOn() }), message, barText };

  document.addEventListener('change', e => {
    const t = e.target, n = t.name;
    if (n === 'path') set({ path: t.value }, true);
    else if (n === 'place') set({ place: t.value });
    else if (n === 'firstcouples') set({ first: t.checked });
    else if (n === 'kind-private' || n === 'kind-company') set({ kind: +t.value });
    else if (/^help-/.test(n)) set({ help: t.value });
    else if (n === 'date' && t.value) set({ date: pd(t.value) }, true);
    else if (n === 'celebrating' || n === 'found') mail();
  });
  document.addEventListener('input', e => {
    const t = e.target;
    if (t.name === 'guests') set({ guests: +t.value });
    else if (t.dataset.f === 'message') { S.dirty = true; $('[data-rewrite-row]').hidden = false; mail(); }
    else if (t.closest && t.closest('[data-letter]')) mail();
  });
  document.addEventListener('click', e => {
    const t = e.target.closest('button, a');
    if (!t) return;
    if (t.dataset.step) { const c = cur(); const base = c.noDate ? new Date(c.year, 5, 1) : c.date; set({ date: new Date(base.getFullYear(), base.getMonth(), base.getDate() + +t.dataset.step) }, true); }
    else if (t.hasAttribute('data-nodate')) set({ noDate: !cur().noDate }, true);
    else if (t.dataset.year) set({ year: +t.dataset.year }, true);
    else if (t.dataset.g) set({ guests: cur().guests + +t.dataset.g });
    else if (t.classList.contains('tab')) {
      const i = +t.dataset.tab, c = cur(), h = new Set(held());
      const part = S.path === 'wedding' ? 'partial' : (c.help === 'freelance' ? 'freelance' : 'coord');
      if (h.has(i)) h.delete(i); else h.add(i);
      set({ help: part, tabs: [...h] });
    }
    else if (t.hasAttribute('data-peek')) { const L = $('[data-lens]'); L.classList.toggle('peek'); t.setAttribute('aria-pressed', String(L.classList.contains('peek'))); render(); }
    else if (t.hasAttribute('data-rewrite')) { S.dirty = false; render(); $('[data-f="message"]').focus(); }
    else if (t.dataset.go) set({ path: t.dataset.go }, true);
    else if (t.classList.contains('peel')) t.setAttribute('aria-pressed', String(t.getAttribute('aria-pressed') !== 'true'));
    else if (t.classList.contains('mbtn')) { const o = $('#mnav').classList.toggle('open'); t.setAttribute('aria-expanded', String(o)); }
    if (t.closest('#mnav') && t.tagName === 'A') { $('#mnav').classList.remove('open'); $('.mbtn').setAttribute('aria-expanded', 'false'); }
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && $('#mnav').classList.contains('open')) { $('#mnav').classList.remove('open'); $('.mbtn').setAttribute('aria-expanded', 'false'); $('.mbtn').focus(); } });

  // ------------------------------------------------------------------ the letter, sealed
  $('[data-letter]').addEventListener('submit', e => {
    e.preventDefault();
    const f = e.currentTarget, err = $('[data-err]'), bad = [];
    const need = [['first', 'your first name'], ['last', 'your last name'], ['email', 'an email address Elise can answer']];
    need.forEach(([n]) => f.elements[n].removeAttribute('aria-invalid'));
    need.forEach(([n, w]) => { const v = f.elements[n].value.trim(); if (!v || (n === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v))) { bad.push(w); f.elements[n].setAttribute('aria-invalid', 'true'); } });
    if (!f.elements.message.value.trim()) bad.push('a few words about what you’re planning');
    if (bad.length) { err.textContent = 'Elise needs ' + join(bad) + '.'; const first = f.querySelector('[aria-invalid="true"]') || f.elements.message; first.focus(); return; }
    err.textContent = ''; mail(); S.sent = true;
    out('sealedLine', `Your ${S.path === 'wedding' ? 'wedding' : S.path === 'private' ? 'celebration' : 'event'} letter is sealed. In the live version it’s with Elise now.`);
    window.dispatchEvent(new CustomEvent('hih-sent'));
    const done = () => { f.hidden = true; const s = $('[data-sealed]'); s.hidden = false; s.focus({ preventScroll: true }); s.scrollIntoView({ block: 'start', behavior: RM ? 'auto' : 'smooth' }); bar(); };
    if (RM) done(); else { f.classList.add('folding'); setTimeout(done, 820); }
  });

  // ------------------------------------------------------------------ reveals, the bar, the header tone
  const io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); if (en.target.matches('.planner')) setTimeout(() => en.target.classList.add('settled'), 1200); } }), { threshold: 0.18 });
  $$('.planner, .eli-stage').forEach(e => RM ? e.classList.add('is-in', 'settled') : io.observe(e));
  const hdr = $('[data-hdr]'), sbar = $('[data-sbar]');
  const tones = $$('[data-tone]').filter(e => e !== hdr);
  function bar() {
    const vh = innerHeight, hb = hdr.getBoundingClientRect().bottom, bt = vh - (sbar.offsetHeight || 64);
    const vis = e => { const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0 && r.top < bt - 8 && r.bottom > hb + 8 && getComputedStyle(e).visibility !== 'hidden'; };
    const calls = $$('main [data-cta]').filter(e => e.offsetParent !== null && vis(e));
    // the bar steps aside for every visible call and for the letter itself, and stays away once it's sealed
    const fields = S.sent ? [$('[data-sealed]')] : $$('[data-letter] input, [data-letter] textarea, [data-letter] .send');
    const formIn = fields.some(e => { const r = e.getBoundingClientRect(); return r.top < bt - 8 && r.bottom > hb + 8; });
    const on = !calls.length && !formIn && !S.sent && scrollY > 60;
    sbar.classList.toggle('is-on', on); sbar.setAttribute('aria-hidden', String(!on)); $('a', sbar).tabIndex = on ? 0 : -1;
    const y = hb + 2; let tone = 'light';
    for (const s of tones) { const r = s.getBoundingClientRect(); if (r.top <= y && r.bottom > y) { tone = s.dataset.tone; break; } }
    if (hdr.dataset.tone !== tone) hdr.dataset.tone = tone;
  }

  // ------------------------------------------------------------------ scroll scenes, CSS variables only
  const doors = $('.doors'), zoom = $('[data-zoom]'), zf = $('.zoom-full'), fw = $('.fig-win');
  const prog = (el, a = 0, b = 1) => { const r = el.getBoundingClientRect(), span = r.height - innerHeight; if (span <= 0) return 1; return clamp((-r.top / span - a) / (b - a), 0, 1); };
  const ease = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  function scenes() {
    if (!RM) {
      doors.style.setProperty('--p', ease(prog(doors, 0.08, 0.72)).toFixed(4));
      const z = prog(zoom, 0.05, 0.85), W = innerWidth, Hh = innerHeight, ar = 2.35;
      const base = Math.min(W * 0.9, Hh * 0.66 * ar);
      fw.style.setProperty('--ms', (base * (1 + Math.pow(z, 2.2) * 9)).toFixed(1) + 'px');
      zoom.style.setProperty('--f', clamp((z - 0.42) / 0.4, 0, 1).toFixed(3));
    }
    lensScroll();
  }
  let ticking = false;
  const onScroll = () => { if (ticking) return; ticking = true; requestAnimationFrame(() => { ticking = false; scenes(); bar(); }); };
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', () => { geo = null; onScroll(); lensPlace(lens.x, lens.y); }, { passive: true });

  // ------------------------------------------------------------------ the lens
  const L = $('[data-lens]'), ring = $('.ring');
  const lens = { x: 0.62, y: 0.46, tx: 0.62, ty: 0.46, live: false, touched: false };
  // the stage and image box are measured once (and again on resize or a new path), so moving the lens only writes
  // CSS variables and never forces a layout of the page
  let geo = null;
  function measure() {
    const s = L.getBoundingClientRect(), img = [...L.querySelectorAll('.lens-img')].find(e => e.offsetParent !== null);
    if (!img) return null;
    const b = img.getBoundingClientRect();
    geo = { img, W: s.width, H: s.height, ox: b.left - s.left, oy: b.top - s.top, path: S.path };
    L.style.setProperty('--lr', Math.round(clamp(Math.min(s.width, s.height) * 0.2, 96, 190)) + 'px');
    return geo;
  }
  function lensPlace(fx, fy) {
    // fx, fy are fractions of the stage. The mask is on the image box, so convert to its coordinates.
    if (!geo || geo.path !== S.path) measure();
    if (!geo) return;
    geo.img.style.setProperty('--mx', (fx * geo.W - geo.ox).toFixed(1) + 'px'); geo.img.style.setProperty('--my', (fy * geo.H - geo.oy).toFixed(1) + 'px');
    L.style.setProperty('--rx', (fx * 100).toFixed(2) + '%'); L.style.setProperty('--ry', (fy * 100).toFixed(2) + '%');
  }
  function lensLoop() {
    lens.x += (lens.tx - lens.x) * 0.16; lens.y += (lens.ty - lens.y) * 0.16;
    lensPlace(lens.x, lens.y);
    if (Math.abs(lens.tx - lens.x) + Math.abs(lens.ty - lens.y) > 0.0008) requestAnimationFrame(lensLoop); else lens.live = false;
  }
  function lensTo(fx, fy, now) {
    lens.tx = clamp(fx, 0.04, 0.96); lens.ty = clamp(fy, 0.06, 0.94);
    if (now || RM) { lens.x = lens.tx; lens.y = lens.ty; lensPlace(lens.x, lens.y); return; }
    if (!lens.live) { lens.live = true; requestAnimationFrame(lensLoop); }
  }
  L.addEventListener('pointermove', e => { const s = L.getBoundingClientRect(); if (e.pointerType === 'touch') lens.touched = true; lensTo((e.clientX - s.left) / s.width, (e.clientY - s.top) / s.height); });
  L.addEventListener('pointerdown', e => { const s = L.getBoundingClientRect(); lens.touched = true; lensTo((e.clientX - s.left) / s.width, (e.clientY - s.top) / s.height); });
  // on a phone, until it's touched, the lens walks down the room as the page scrolls
  const PATH = [[0.5, 0.42], [0.38, 0.6], [0.6, 0.78], [0.52, 0.5]];
  function lensScroll() {
    if (lens.touched || matchMedia('(hover: hover)').matches || RM) return;
    const r = L.getBoundingClientRect();
    if (r.bottom < -100 || r.top > innerHeight + 100) return;
    const t = clamp((innerHeight - r.top) / (innerHeight + r.height), 0, 1) * (PATH.length - 1);
    const i = Math.min(PATH.length - 2, Math.floor(t)), f = t - i;
    lensTo(PATH[i][0] + (PATH[i + 1][0] - PATH[i][0]) * f, PATH[i][1] + (PATH[i + 1][1] - PATH[i][1]) * f);
  }

  // ------------------------------------------------------------------ Elise's stickers drift with the hand
  const stage = $('[data-eli]');
  if (stage && !RM) stage.addEventListener('pointermove', e => {
    if (e.pointerType !== 'mouse') return;
    const s = stage.getBoundingClientRect(), dx = (e.clientX - s.left) / s.width - 0.5, dy = (e.clientY - s.top) / s.height - 0.5;
    $$('.stk', stage).forEach(k => { const d = +getComputedStyle(k).getPropertyValue('--d') || 0.5; k.style.setProperty('--px', (-dx * 46 * d).toFixed(1) + 'px'); k.style.setProperty('--py', (-dy * 34 * d).toFixed(1) + 'px'); });
  });

  // ------------------------------------------------------------------ her film, only on screen, never under reduced motion or data saver
  const film = $('[data-film]'), vid = film && $('video', film);
  if (vid && !RM && !SAVE) {
    new IntersectionObserver(es => es.forEach(en => {
      if (en.isIntersecting) { if (vid.preload !== 'auto') { vid.preload = 'auto'; vid.load(); } const p = vid.play(); if (p) p.then(() => film.classList.add('playing')).catch(() => {}); }
      else { vid.pause(); }
    }), { threshold: 0.2 }).observe(film);
  }

  // ------------------------------------------------------------------ start
  try { const saved = localStorage.getItem('hih-path'); if (saved && P[saved] && !qs.get('today')) S.path = saved; } catch (e) {}
  render();
  scenes(); bar();
  addEventListener('load', () => requestAnimationFrame(() => { scenes(); bar(); }));
  new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { geo = null; lensPlace(lens.x, lens.y); } }), { rootMargin: '300px 0px' }).observe(L);
})();
