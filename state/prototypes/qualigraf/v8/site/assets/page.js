// A country page. The hero sentence writes one state, and every date, label, chip and the form read it.
import { subscribe, setState, tokens, fill, fromIso, iso, KNOWN_UNTIL } from './state.js';
import { mount } from './ribbons.js';

const P = window.PAGE || {};
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const clamp = v => Math.min(1, Math.max(0, v));
try { localStorage.setItem('qg-country', P.country || ''); } catch (e) {}

// the track, built once
const ST = P.stations || [], n = ST.length, list = $('.stations'), segs = $('.rail-segs');
ST.forEach((s, i) => {
  const li = document.createElement('li'); li.className = 'station'; li.style.setProperty('--c', s.c);
  li.innerHTML = `<h3></h3><p class="date"></p><p class="law"></p><p class="what"></p><img class="st-shot" alt="" loading="lazy">`;
  $('h3', li).textContent = s.n; $('.what', li).textContent = s.what; $('.st-shot', li).src = '../assets/img/' + s.img;
  list.appendChild(li);
  const e = document.createElement('span'); e.style.setProperty('--c', s.c); e.title = s.n; segs.appendChild(e);
});

// the sentence writes the state
const sel = $('#committee'), size = $('#size'), date = $('#mdate'), pd = $('.pick-date');
if (pd && date) pd.addEventListener('click', () => { try { date.showPicker(); } catch (e) { date.focus(); } });
if (date) {
  const today = new Date(); date.min = iso(new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate())));
  if (P.rules === 'uk') date.max = KNOWN_UNTIL;
  date.addEventListener('change', () => { if (date.value && date.value >= date.min && (!date.max || date.value <= date.max)) setState({ date: fromIso(date.value) }); });
}
if (sel) sel.addEventListener('change', () => setState({ committee: sel.value }));
if (size) size.addEventListener('change', () => setState({ size: size.value }));

// everything else reads it
subscribe(s => {
  const t = tokens(s);
  $$('[data-bind]').forEach(el => { const v = t[el.dataset.bind]; if (v != null) el.textContent = v; });
  $$('[data-fill]').forEach(el => { el.textContent = fill(el.dataset.fill, t); });
  const h = $('#f-meeting-hidden'); if (h) h.value = t.summary;
  $$('.station').forEach((el, i) => {
    const x = ST[i];
    $('.date', el).textContent = fill(!t.key && x.dateNoKey != null ? x.dateNoKey : x.date, t);
    $('.law', el).textContent = fill(!t.key && x.lawNoKey != null ? x.lawNoKey : x.law, t);
  });
  if (sel && sel.value !== s.committee) sel.value = s.committee;
  if (size && size.value !== s.size) size.value = s.size;
  if (date && date.value !== iso(s.date)) date.value = iso(s.date);
  // the live card on the hero blinks once when its date changes
  const live = $('.live'); if (live) { live.classList.remove('tick'); void live.offsetWidth; live.classList.add('tick'); }
});

// the art. Their Q opens onto the room. Then their product rises out of ribbons that braid as it comes up
const qh = $('.qhero'), qwin = $('.qwin'), qpic = $('.qwin picture'), qimg = $('.qwin img'), qcopy = $('.qhero .hero-copy'), qbeat = $('.qbeat');
const product = $('.product'), stage = $('.stage');
let rise = 0;
mount($('.product .art'), { merge: () => rise, x: 0, y: .6, rz: .12, ry: -.3, spread: 4.4, mx: 0, my: 1.2 });
mount($('.invite .art'), { merge: () => 1, x: 0, y: -.1, rx: -.1, rz: .06, ry: -.18, mx: 0, my: -.1, count: 7, spread: 3 });

const QW = 350.065, QH = 389.03, FX = .15, FY = .47, S_END = 70;
const ease = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
let box = null;
function measure() {
  const W = innerWidth, H = innerHeight, phone = W < 760;
  const h0 = phone ? H * .38 : Math.min(H * .82, 760), w0 = h0 * QW / QH;
  box = { W, H, h0, w0, left: phone ? (W - w0) / 2 : W - w0 - Math.max(24, W * .03), top: phone ? H * .06 : (H - h0) / 2 + 26 };
}
measure();
const RMq = matchMedia('(prefers-reduced-motion: reduce)').matches;
function qframe(p) {
  const e = ease(clamp(p / .72)), b = box;
  const s = Math.exp(e * Math.log(S_END));
  const px0 = b.left + FX * b.w0, py0 = b.top + FY * b.h0;
  const px = px0 + (b.W / 2 - px0) * e, py = py0 + (b.H / 2 - py0) * e;
  // the window's own box is the Q's box, clipped to the screen, and the photo stays still behind it
  const L = px - FX * b.w0 * s, T = py - FY * b.h0 * s, QWs = b.w0 * s, QHs = b.h0 * s;
  const l = Math.max(0, L), t = Math.max(0, T), r = Math.min(b.W, L + QWs), btm = Math.min(b.H, T + QHs);
  Object.assign(qwin.style, { left: l + 'px', top: t + 'px', width: Math.max(0, r - l) + 'px', height: Math.max(0, btm - t) + 'px' });
  Object.assign(qpic.style, { left: -l + 'px', top: -t + 'px', width: b.W + 'px', height: b.H + 'px' });
  if (e > .985) { qwin.style.webkitMaskImage = 'none'; qwin.style.maskImage = 'none'; }
  else {
    qwin.style.webkitMaskImage = ''; qwin.style.maskImage = '';
    const ms = QWs + 'px ' + QHs + 'px', mp = (L - l) + 'px ' + (T - t) + 'px';
    qwin.style.webkitMaskSize = ms; qwin.style.maskSize = ms; qwin.style.webkitMaskPosition = mp; qwin.style.maskPosition = mp;
  }
  qimg.style.transform = 'scale(' + (1.22 - .22 * e).toFixed(4) + ')';
  const co = 1 - clamp((p - .04) / .22);
  qcopy.style.opacity = co.toFixed(3); qcopy.style.transform = 'translateY(' + (-40 * (1 - co)).toFixed(1) + 'px)';
  qcopy.querySelectorAll('form, .hero-acts').forEach(el => { el.inert = co < .05; });
  qbeat.style.opacity = clamp((p - .62) / .18).toFixed(3);
}

// scroll
const top = $('.top'), track = $('.track'), rail = $('.rail'), phonebar = $('.phonebar'), shots = $$('.screens img');
const wide = matchMedia('(min-width: 980px)');
let lastIdx = -1;
function onScroll() {
  const hr = qh.getBoundingClientRect();
  const p = RMq ? 0 : clamp(-hr.top / Math.max(1, qh.offsetHeight - innerHeight));
  qframe(p);
  const pr = product.getBoundingClientRect();
  rise = clamp((innerHeight - pr.top) / (innerHeight * .9));
  stage.style.setProperty('--rise', rise.toFixed(3));
  top.classList.toggle('dark', pr.bottom > 70);
  if (phonebar) phonebar.classList.toggle('show', hr.top < -innerHeight * .12);
  if (!wide.matches || !track) return;
  const tr = track.getBoundingClientRect();
  const tp = clamp(-tr.top / Math.max(1, track.offsetHeight - innerHeight));
  const idx = Math.min(n - 1, Math.floor(tp * n + .0001));
  if (idx !== lastIdx) {
    lastIdx = idx;
    $$('.station').forEach((el, i) => el.classList.toggle('on', i === idx));
    $$('.rail-segs span').forEach((el, i) => { el.classList.toggle('lit', i <= idx); el.classList.toggle('now', i === idx); });
    shots.forEach((el, i) => el.classList.toggle('on', i === idx));
  }
}
addEventListener('scroll', () => requestAnimationFrame(onScroll), { passive: true });
addEventListener('resize', () => { measure(); onScroll(); });
onScroll();

// films play only in view, and never under reduced motion
const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
const io = new IntersectionObserver(es => es.forEach(e => { const v = e.target; if (RM) { v.pause(); return; } if (e.isIntersecting) v.play().catch(() => {}); else v.pause(); }), { threshold: .2 });
$$('video.film').forEach(v => { v.removeAttribute('autoplay'); v.pause(); io.observe(v); });

// the form, a preview until the live build wires it to Qualigraf's own handler
const book = $('.book');
if (book) book.addEventListener('submit', e => {
  e.preventDefault();
  const f = e.currentTarget, msg = $('.form-msg', f), M = P.form || {};
  const bad = $$('input[required]', f).filter(i => !i.value.trim() || (i.type === 'email' && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(i.value)));
  if (bad.length) { msg.textContent = M.missing || 'Please fill in every field.'; bad[0].focus(); return; }
  msg.textContent = fill(M.thanks || 'Thanks.', { summary: ($('#f-meeting-hidden') || {}).value || '' });
});
