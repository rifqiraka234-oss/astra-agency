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

// the art. Loose ribbons in the hero braid into one strand as the product rises, and stay braided behind the form
const hero = $('.hero'), invite = $('.invite');
let heroP = 0;
mount($('.hero .art'), { merge: () => heroP, x: 6.6, y: 1.2, rz: .5, spread: 3.2, mx: 0, my: .4 });
mount($('.invite .art'), { merge: () => 1, x: 0, y: -.1, rx: -.1, rz: .06, ry: -.18, mx: 0, my: -.1, count: 7, spread: 3 });

// scroll
const top = $('.top'), stage = $('.stage'), track = $('.track'), rail = $('.rail'), phonebar = $('.phonebar'), shots = $$('.screens img');
const wide = matchMedia('(min-width: 980px)');
let lastIdx = -1;
function onScroll() {
  const hr = hero.getBoundingClientRect();
  heroP = clamp(-hr.top / Math.max(1, hr.height * .7));
  top.classList.toggle('dark', hr.bottom > 70);
  if (stage) stage.style.setProperty('--rise', heroP.toFixed(3));
  if (phonebar) phonebar.classList.toggle('show', hr.bottom < innerHeight * .6);
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
addEventListener('resize', onScroll);
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
