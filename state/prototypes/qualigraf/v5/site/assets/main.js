// The page. The hero sentence writes one state, and every date, label and the form read it.
import { subscribe, setState, timeline, longDate, shortDate, fromIso, iso, KNOWN_UNTIL } from './state.js';

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const clamp = v => Math.min(1, Math.max(0, v));

// Station copy. Every product line is checked against Qualigraf's own UK pages, read 5 Nov 2026. Long-term planner, Workflow,
// Information Advisor (built-in audit trail), Council information, Paperless Meetings, Publish & Stream.
// Dates and statutes come from state.js, where each rule is cited.
const STATIONS = [
  { n: 'Forward plan', c: '#37BAC5',
    date: tl => tl.keyNotice ? `Notice open to the public by ${longDate(tl.keyNotice)}` : 'On the forward plan and the meeting calendar',
    law: tl => tl.keyNotice ? '28 clear days before a key decision. Regulation 9, SI 2012/2089' : 'The 28 clear days notice applies to key executive decisions',
    what: 'The Long-term planner tracks milestones and deadlines by topic or theme, so the whole year is in view.' },
  { n: 'Report', c: '#37BAC5',
    date: () => 'Your own report deadline', law: () => 'Set by your constitution and your timetable',
    what: 'Drafted in the built in editor, with colleagues sharing updates in real time. The content is reused as the decision moves on.' },
  { n: 'Sign off', c: '#FE764A',
    date: () => 'Legal, finance, then the portfolio holder', law: () => 'Your approval route, strict or light',
    what: 'Approval paths for each document type, strict or flexible, and a built in audit trail behind every step.' },
  { n: 'Agenda pack', c: '#FE764A',
    date: tl => `Open to the public by ${longDate(tl.agenda)}`, law: () => 'Five clear days. Section 100B, Local Government Act 1972',
    what: 'The agenda and its documents come together for the meeting. Publish them for public access, or keep them confidential when required.' },
  { n: 'Meeting', c: '#F4B63F',
    date: tl => longDate(tl.meeting), law: () => 'In the room or remote',
    what: 'Members review the agenda, take private notes and vote in apps for iOS, Windows and Android, in person or remote.' },
  { n: 'Decision', c: '#F4B63F',
    date: tl => longDate(tl.meeting),
    law: tl => tl.committee.key ? 'A written record of the decision and its reasons. Regulation 12, SI 2012/2089' : 'Recorded in the minutes of the meeting',
    what: 'Minutes, decisions and action items are recorded automatically and linked, so the important details don\'t get lost.' },
  { n: 'Publication', c: '#7A5D7B',
    date: () => 'Published once, everywhere it needs to be', law: () => 'Agenda, decisions, minutes and webcast',
    what: 'Set your publishing preferences once. Content reaches the right channels automatically, and webcasts carry speaker names and voting results.' },
  { n: 'Archive', c: '#2A3C5E',
    date: tl => `Open to the public until ${longDate(tl.minutesUntil)}`,
    law: tl => `Six years, section 100C. Background papers until ${longDate(tl.papersUntil)}, section 100D`,
    what: 'Meeting materials, decisions and action items stay linked to their topic, and search finds them when you need them. The knowledge stays when people move on.' },
];

// build the stops on the rail and the stations, once
const stops = $('.stops'), list = $('.stations');
STATIONS.forEach((s, i) => {
  const li = document.createElement('li'); li.className = 'stop'; li.style.setProperty('--c', s.c); li.style.left = (i / 7 * 100) + '%';
  li.innerHTML = `<i></i><b><span>0${i + 1}</span>${s.n}</b>`; stops.appendChild(li);
  const st = document.createElement('li'); st.className = 'station'; st.style.setProperty('--c', s.c); st.dataset.i = i;
  st.innerHTML = `<div><h3><span>0${i + 1}</span>${s.n}</h3><p class="date"></p></div><div><p class="law"></p><p class="what">${s.what}</p></div>`;
  list.appendChild(st);
});
const stamps = $('.stamps');
STATIONS.forEach(s => { const e = document.createElement('em'); e.style.setProperty('--c', s.c); e.hidden = true; stamps.appendChild(e); });

// the hero sentence writes the state
const sel = $('#committee'), date = $('#mdate');
$('.pick-date').addEventListener('click', () => { try { date.showPicker(); } catch (e) { date.focus(); } });
const today = new Date(); date.min = iso(new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()))); date.max = KNOWN_UNTIL;
sel.addEventListener('change', () => setState({ committee: sel.value }));
date.addEventListener('change', () => { if (date.value && date.value >= date.min && date.value <= date.max) setState({ date: fromIso(date.value) }); });

// everything else reads it
subscribe(s => {
  const tl = timeline(s);
  const summary = `${tl.committee.label}, ${longDate(tl.meeting)}`;
  const binds = { committee: tl.committee.label, meeting: longDate(tl.meeting), meetingShort: shortDate(tl.meeting), summary };
  $$('[data-bind]').forEach(el => { const v = binds[el.dataset.bind]; if (v != null) el.textContent = v; });
  $('#f-meeting-hidden').value = summary;
  $$('.station').forEach((el, i) => { $('.date', el).textContent = STATIONS[i].date(tl); $('.law', el).textContent = STATIONS[i].law(tl); });
  if (sel.value !== s.committee) sel.value = s.committee;
  if (date.value !== iso(s.date)) date.value = iso(s.date);
});

// scroll, the hero gathers the papers, the track moves the file
const hero = $('.hero'), heroPin = $('.hero-pin'), track = $('.track'), rail = $('.rail'), phonebar = $('.phonebar');
const wide = matchMedia('(min-width: 900px)');
let lastIdx = -1;
function onScroll() {
  const hr = hero.getBoundingClientRect();
  const hp = clamp(-hr.top / Math.max(1, hero.offsetHeight - innerHeight));
  window.__heroP = hp;
  heroPin.style.setProperty('--beat', clamp((hp - .62) / .2).toFixed(3));
  phonebar.classList.toggle('show', hp > .42 || hr.bottom < innerHeight * .5);
  if (!wide.matches) return;
  const tr = track.getBoundingClientRect();
  const tp = clamp(-tr.top / Math.max(1, track.offsetHeight - innerHeight));
  rail.style.setProperty('--prog', tp.toFixed(4));
  const idx = Math.min(7, Math.floor(tp * 8 + .0001));
  if (idx !== lastIdx) {
    lastIdx = idx;
    $$('.station').forEach((el, i) => el.classList.toggle('on', i === idx));
    $$('.stop').forEach((el, i) => { el.classList.toggle('done', i <= idx); el.classList.toggle('on', i === idx); });
    $$('.stamps em').forEach((el, i) => { el.hidden = i > idx; });
  }
}
addEventListener('scroll', () => requestAnimationFrame(onScroll), { passive: true });
addEventListener('resize', onScroll);
onScroll();

// the form, a preview until the final build wires it to Qualigraf's own handler
$('.book').addEventListener('submit', e => {
  e.preventDefault();
  const f = e.currentTarget, msg = $('.form-msg', f);
  const bad = $$('input[required]', f).filter(i => !i.value.trim() || (i.type === 'email' && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(i.value)));
  if (bad.length) { msg.textContent = 'Please add your name, your council and a work email.'; bad[0].focus(); return; }
  msg.textContent = `Thanks. This preview doesn't send anything yet. In the live site the UK team gets your request for ${$('#f-meeting-hidden').value}.`;
});
