// One state per page, carried down it. The hero sentence writes it. The 3D file, the track and the form read it.
// Each country brings its own rules, read at the source on 5 and 6 Nov 2026.
//
// UK, England. Reg 9(2) SI 2012/2089, 28 clear days before a key decision. s100B(3) LGA 1972, five clear days for the
// agenda and reports. s100C(1), six years. s100D(2), four years for background papers. Clear days are weekday working
// days, never the day of publication or of the meeting (R v Swansea CC ex p Elitestone 1993, per Local Government Lawyer
// and NALC). Bank holidays left out too, the cautious reading. Bank holidays from gov.uk/bank-holidays.json.
// France. CGCT L2121-11 and L2121-12, three days below 3 500 inhabitants, five jours francs from 3 500. Whole days, the
// day of sending and the day of the meeting don't count, and a weekend or public holiday in between doesn't extend the
// delay. Assemblée nationale written question 29767 (ministerial answer, its example, a meeting on the 5th, sent by the
// 1st), confirmed by question 54871. Alsace-Moselle small communes follow local law.
// Netherlands. Gemeentewet article 19 sets no number of days, the council's own rules of procedure do. Nothing computed.
// Canada. Rules differ by province. Nothing computed.

export const BH_EW = new Set([
  '2026-01-01', '2026-04-03', '2026-04-06', '2026-05-04', '2026-05-25', '2026-08-31', '2026-12-25', '2026-12-28',
  '2027-01-01', '2027-03-26', '2027-03-29', '2027-05-03', '2027-05-31', '2027-08-30', '2027-12-27', '2027-12-28',
  '2028-01-03', '2028-04-14', '2028-04-17', '2028-05-01', '2028-05-29', '2028-08-28', '2028-12-25', '2028-12-26',
]);
export const KNOWN_UNTIL = '2028-12-31';
const DAY = 864e5;
export const utc = (y, m, d) => new Date(Date.UTC(y, m - 1, d));
export const iso = t => t.toISOString().slice(0, 10);
export const fromIso = s => { const [y, m, d] = s.split('-').map(Number); return utc(y, m, d); };
const shift = (t, n) => new Date(t.getTime() + n * DAY);
const workingEW = t => { const w = t.getUTCDay(); return w !== 0 && w !== 6 && !BH_EW.has(iso(t)); };

// UK. The latest day to publish so n clear working days sit between publication and the meeting.
export function clearDaysBefore(meeting, n) {
  let t = shift(meeting, -1), c = 0;
  for (;;) { if (workingEW(t)) c++; if (c === n) break; t = shift(t, -1); }
  let p = shift(t, -1);
  while (!workingEW(p)) p = shift(p, -1);
  return p;
}
export const openUntil = (meeting, years) => shift(utc(meeting.getUTCFullYear() + years, meeting.getUTCMonth() + 1, meeting.getUTCDate()), -1);
// France. n jours francs, so n whole days between the sending day and the meeting day.
export const joursFrancsBefore = (meeting, n) => shift(meeting, -(n + 1));

const NAMES = {
  en: { wd: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], mo: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'] },
  fr: { wd: ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'], mo: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'] },
  nl: { wd: ['zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag'], mo: ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'] },
};
export function longDate(t, lang) {
  const k = lang.slice(0, 2), N = NAMES[k] || NAMES.en, wd = N.wd[t.getUTCDay()], d = t.getUTCDate(), mo = N.mo[t.getUTCMonth()], y = t.getUTCFullYear();
  if (lang === 'en-CA') return `${wd}, ${mo} ${d}, ${y}`;
  if (k === 'fr') return `${wd} ${d === 1 ? '1er' : d} ${mo} ${y}`;
  return `${wd} ${d} ${mo} ${y}`;
}
export function shortDate(t, lang) {
  const k = lang.slice(0, 2), N = NAMES[k] || NAMES.en, d = t.getUTCDate(), mo = N.mo[t.getUTCMonth()], y = t.getUTCFullYear();
  if (lang === 'en-CA') return `${mo} ${d}, ${y}`;
  return `${k === 'fr' && d === 1 ? '1er' : d} ${mo} ${y}`;
}

const P = window.PAGE || {};
const first = a => (a && a[0] && a[0].v) || null;
const state = { committee: first(P.committees), size: first(P.sizes), date: fromIso(P.defaultDate || '2027-03-11') };
const subs = new Set();
export const getState = () => ({ ...state });
export function setState(part) { Object.assign(state, part); subs.forEach(f => f(getState())); }
export function subscribe(f) { subs.add(f); f(getState()); return () => subs.delete(f); }

// Every value the page can show for one meeting, as text, in the page's language.
export function tokens(s = state) {
  const lang = P.lang || 'en-GB', M = s.date;
  const c = (P.committees || []).find(x => x.v === s.committee) || {};
  const z = (P.sizes || []).find(x => x.v === s.size) || {};
  const t = { committee: c.label || '', item: c.item || '', meeting: longDate(M, lang), meetingShort: shortDate(M, lang), key: !!c.key, size: z.label || '' };
  if (P.rules === 'uk') {
    t.agenda = longDate(clearDaysBefore(M, 5), lang);
    t.keyNotice = longDate(clearDaysBefore(M, 28), lang);
    t.until6 = longDate(openUntil(M, 6), lang);
    t.until4 = longDate(openUntil(M, 4), lang);
  }
  if (P.rules === 'fr') {
    const n = z.days || 5;
    t.days = String(n);
    t.convocation = longDate(joursFrancsBefore(M, n), lang);
  }
  Object.assign(t, c.tokens || {}, z.tokens || {});
  t.summary = fill(P.summary || '{committee}, {meeting}', t);
  return t;
}
export const fill = (tpl, t) => String(tpl).replace(/\{(\w+)\}/g, (m, k) => (t[k] != null ? t[k] : m));
