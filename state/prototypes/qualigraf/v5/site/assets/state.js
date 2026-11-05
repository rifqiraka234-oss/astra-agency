// One state, carried down the page. The hero sentence writes it. The 3D file, the track, the invitation and the form read it.
//
// The law behind every date, read on legislation.gov.uk on 5 Nov 2026.
//   28 clear days before a key decision, the notice is open to the public. Reg 9(2), SI 2012/2089.
//   Five clear days before the meeting, agenda and reports are open to inspection. s100B(3), Local Government Act 1972.
//   Minutes, agenda and reports stay open for six years beginning with the date of the meeting. s100C(1).
//   Background papers, four years beginning with the date of the meeting. s100D(2), principal councils in England.
// Clear days. The day of publication and the day of the meeting don't count, and only weekday working days do
// (R v Swansea City Council, ex p Elitestone Ltd (1993) 66 P & CR 422, per Local Government Lawyer and NALC's topic note).
// We also leave out bank holidays, the cautious reading, so a date here is never later than the law allows.
// Bank holidays, England and Wales, gov.uk/bank-holidays.json, read 5 Nov 2026.

export const BANK_HOLIDAYS = new Set([
  '2026-01-01', '2026-04-03', '2026-04-06', '2026-05-04', '2026-05-25', '2026-08-31', '2026-12-25', '2026-12-28',
  '2027-01-01', '2027-03-26', '2027-03-29', '2027-05-03', '2027-05-31', '2027-08-30', '2027-12-27', '2027-12-28',
  '2028-01-03', '2028-04-14', '2028-04-17', '2028-05-01', '2028-05-29', '2028-08-28', '2028-12-25', '2028-12-26',
]);
export const KNOWN_UNTIL = '2028-12-31';

const DAY = 864e5;
export const utc = (y, m, d) => new Date(Date.UTC(y, m - 1, d));
export const iso = t => t.toISOString().slice(0, 10);
export const fromIso = s => { const [y, m, d] = s.split('-').map(Number); return utc(y, m, d); };
const back = t => new Date(t.getTime() - DAY);
export const isWorking = t => { const w = t.getUTCDay(); return w !== 0 && w !== 6 && !BANK_HOLIDAYS.has(iso(t)); };

// The latest day to publish so that n clear working days sit between publication and the meeting.
// If that day falls on a weekend or a bank holiday we go back to the last working day, when the offices are open.
export function publishBy(meeting, n) {
  let t = back(meeting), c = 0;
  for (;;) { if (isWorking(t)) c++; if (c === n) break; t = back(t); }
  let p = back(t);
  while (!isWorking(p)) p = back(p);
  return p;
}
// "Until the expiration of the period of N years beginning with the date of the meeting", so the last day is the day before the anniversary.
export function openUntil(meeting, years) {
  return back(utc(meeting.getUTCFullYear() + years, meeting.getUTCMonth() + 1, meeting.getUTCDate()));
}

const WD = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MO = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export const longDate = t => `${WD[t.getUTCDay()]} ${t.getUTCDate()} ${MO[t.getUTCMonth()]} ${t.getUTCFullYear()}`;
export const shortDate = t => `${WD[t.getUTCDay()].slice(0, 3)} ${t.getUTCDate()} ${MO[t.getUTCMonth()].slice(0, 3)} ${t.getUTCFullYear()}`;
export const dayMonth = t => `${t.getUTCDate()} ${MO[t.getUTCMonth()]} ${t.getUTCFullYear()}`;

// Sample items, never presented as a real council's business.
export const COMMITTEES = {
  cabinet: { label: 'Cabinet', key: true, item: 'Item 6, Local Plan update' },
  council: { label: 'Full Council', key: false, item: 'Item 7, Motion on the High Street' },
  planning: { label: 'Planning Committee', key: false, item: 'Item 4, Land at Mill Lane' },
};

const state = { committee: 'cabinet', date: utc(2027, 3, 11) };
const subs = new Set();
export const getState = () => ({ ...state });
export function setState(part) {
  Object.assign(state, part);
  subs.forEach(f => f(getState()));
}
export function subscribe(f) { subs.add(f); f(getState()); return () => subs.delete(f); }

// Everything the page shows for one meeting, worked out once.
export function timeline(s = state) {
  const c = COMMITTEES[s.committee], M = s.date;
  return {
    committee: c,
    meeting: M,
    keyNotice: c.key ? publishBy(M, 28) : null,
    agenda: publishBy(M, 5),
    minutesUntil: openUntil(M, 6),
    papersUntil: openUntil(M, 4),
  };
}
