/**
 * lib/automations/calendar.ts, pure date helpers for the automation rules.
 * Every day is an Amsterdam 'YYYY-MM-DD' key.
 */
import { addDaysKey } from '../format';

/** 0 Sunday to 6 Saturday for a day key. */
export function weekdayOf(key: string): number {
  const [y, m, d] = key.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d)).getUTCDay();
}

/** The day key n working days (Monday to Friday) after key. */
export function addWorkingDays(key: string, n: number): string {
  let cur = key;
  let left = n;
  while (left > 0) {
    cur = addDaysKey(cur, 1);
    const wd = weekdayOf(cur);
    if (wd !== 0 && wd !== 6) left--;
  }
  return cur;
}

/** First Monday of a month, as a day key. month is 1 to 12. */
export function firstMonday(year: number, month: number): string {
  for (let d = 1; d <= 7; d++) {
    const key = `${year}-${String(month).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    if (weekdayOf(key) === 1) return key;
  }
  throw new Error('unreachable');
}

/** The first Monday of the quarter that starts on or after today, or today's quarter if its first Monday is still ahead. */
export function nextQuarterFirstMonday(today: string): { day: string; quarter: string } {
  const [y, m] = today.split('-').map(Number);
  const qStartMonth = Math.floor((m - 1) / 3) * 3 + 1;
  const thisQ = firstMonday(y, qStartMonth);
  if (thisQ >= today) return { day: thisQ, quarter: `${y}-Q${(qStartMonth + 2) / 3}` };
  const nm = qStartMonth + 3 > 12 ? 1 : qStartMonth + 3;
  const ny = qStartMonth + 3 > 12 ? y + 1 : y;
  return { day: firstMonday(ny, nm), quarter: `${ny}-Q${(nm + 2) / 3}` };
}

/** Whole days from a to b. */
export function dayDiff(a: string, b: string): number {
  return Math.round((Date.parse(`${b}T00:00:00Z`) - Date.parse(`${a}T00:00:00Z`)) / 86_400_000);
}
