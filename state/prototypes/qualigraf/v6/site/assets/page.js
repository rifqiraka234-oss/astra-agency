// A country page. The hero sentence writes one state, and every date, label and the form read it.
import { subscribe, setState, tokens, fill, fromIso, iso, KNOWN_UNTIL } from './state.js';

const P = window.PAGE || {};
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const clamp = v => Math.min(1, Math.max(0, v));
try { localStorage.setItem('qg-country', P.country || ''); } catch (e) {}

// the track, built once from the page's stations
const ST = P.stations || [];
const stops = $('.stops'), list = $('.stations'), n = ST.length;
ST.forEach((s, i) => {
  if (stops) { const li = document.createElement('li'); li.className = 'stop'; li.style.setProperty('--c', s.c); li.style.left = (i / Math.max(1, n - 1) * 100) + '%'; li.innerHTML = `<i></i><b></b>`; $('b', li).textContent = s.n; stops.appendChild(li); }
  const st = document.createElement('li'); st.className = 'station'; st.style.setProperty('--c', s.c);
  st.innerHTML = `<div class="st-a"><h3></h3><p class="date"></p></div><div class="st-b"><p class="law"></p><p class="what"></p></div>`;
  $('h3', st).textContent = s.n; $('.what', st).textContent = s.what;
  list && list.appendChild(st);
});
const segs = $('.rail-segs');
if (segs) ST.forEach(s => { const e = document.createElement('span'); e.style.setProperty('--c', s.c); segs.appendChild(e); });

// the hero sentence writes the state
const sel = $('#committee'), size = $('#size'), date = $('#mdate');
const pd = $('.pick-date');
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
  const h = $('#f-meeting-hidden'); if (h) h.value = t.summary;
  $$('.station').forEach((el, i) => {
    const x = ST[i], nk = !t.key && x.dateNoKey != null;
    $('.date', el).textContent = fill(nk ? x.dateNoKey : x.date, t);
    $('.law', el).textContent = fill(!t.key && x.lawNoKey != null ? x.lawNoKey : x.law, t);
  });
  if (sel && sel.value !== s.committee) sel.value = s.committee;
  if (size && size.value !== s.size) size.value = s.size;
  if (date && date.value !== iso(s.date)) date.value = iso(s.date);
});

// scroll. The hero gathers the papers, the track moves the file along the rail
const hero = $('.hero'), heroPin = $('.hero-pin'), track = $('.track'), rail = $('.rail'), phonebar = $('.phonebar');
const wide = matchMedia('(min-width: 900px)');
let lastIdx = -1;
function onScroll() {
  if (hero) {
    const hr = hero.getBoundingClientRect();
    const hp = clamp(-hr.top / Math.max(1, hero.offsetHeight - innerHeight));
    window.__heroP = hp;
    heroPin.style.setProperty('--beat', clamp((hp - .62) / .2).toFixed(3));
    if (phonebar) phonebar.classList.toggle('show', hp > .42 || hr.bottom < innerHeight * .5);
  }
  if (!wide.matches || !track || !rail) return;
  const tr = track.getBoundingClientRect();
  const tp = clamp(-tr.top / Math.max(1, track.offsetHeight - innerHeight));
  const idx = Math.min(n - 1, Math.floor(tp * n + .0001));
  rail.style.setProperty('--at', (idx / Math.max(1, n - 1)).toFixed(4));
  if (idx !== lastIdx) {
    lastIdx = idx;
    $$('.station').forEach((el, i) => el.classList.toggle('on', i === idx));
    $$('.stop').forEach((el, i) => { el.classList.toggle('done', i <= idx); el.classList.toggle('on', i === idx); });
    $$('.rail-segs span').forEach((el, i) => el.classList.toggle('lit', i <= idx));
  }
}
addEventListener('scroll', () => requestAnimationFrame(onScroll), { passive: true });
addEventListener('resize', onScroll);
onScroll();

// the form, a preview until the live build wires it to Qualigraf's own handler
const book = $('.book');
if (book) book.addEventListener('submit', e => {
  e.preventDefault();
  const f = e.currentTarget, msg = $('.form-msg', f), M = P.form || {};
  const bad = $$('input[required]', f).filter(i => !i.value.trim() || (i.type === 'email' && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(i.value)));
  if (bad.length) { msg.textContent = M.missing || 'Please fill in every field.'; bad[0].focus(); return; }
  msg.textContent = fill(M.thanks || 'Thanks.', { summary: ($('#f-meeting-hidden') || {}).value || '' });
});
