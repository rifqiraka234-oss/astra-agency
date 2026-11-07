/**
 * lib/format.ts, display formatting and exact money maths. Pure, safe in client
 * code. Everything is shown in Europe/Amsterdam time, English, design style.
 * Render numbers inside an element with class "mono" (Geist Mono).
 *
 *   formatMoney('14500.00')            -> '€14,500'
 *   formatMoney('1700.5')              -> '€1,700.50'
 *   formatMoney(3045, 'EUR', 2)        -> '€3,045.00'
 *   formatPercent(60)                  -> '60%'
 *   formatDate('2026-11-30')           -> '30 Nov'          (year added when not this year)
 *   formatDateLong('2026-11-30')       -> '30 Nov 2026'
 *   formatDay(date)                    -> 'Fri 6 Nov'
 *   formatDateTime(date)               -> '5 Nov 17:40'
 *   formatRelativeDay(date)            -> 'Today', 'Yesterday', 'Tomorrow', else 'Wed 4 Nov'
 *   formatRelativeDay(date, { time: true }) -> 'Today 14:00'
 *   formatAgo(date)                    -> 'just now', '3 min ago', '2 h ago', 'Yesterday', '28 Oct'
 *   formatMinutes(130)                 -> '2h 10m'
 *   formatDays(9)                      -> '9 days'
 *   initials('Raka Mulya')             -> 'RM'
 *   sumMoney(['1.10', '2.20'])         -> '3.30'   (exact, BigInt cents)
 *   vatAmount('14500', 21)             -> '3045.00'
 */

export const APP_TZ = 'Europe/Amsterdam';
export const APP_LOCALE = 'en-GB';

type DateInput = Date | string | number | null | undefined;

const DATE_ONLY = /^\d{4}-\d{2}-\d{2}$/;

/** Parse a Date, an ISO string or a 'YYYY-MM-DD' date (taken as that Amsterdam day at noon). */
export function toDate(input: DateInput): Date | null {
  if (input === null || input === undefined || input === '') return null;
  if (input instanceof Date) return Number.isNaN(input.getTime()) ? null : input;
  if (typeof input === 'string' && DATE_ONLY.test(input)) {
    // Noon UTC is the same calendar day in Amsterdam all year.
    return new Date(`${input}T12:00:00Z`);
  }
  const d = new Date(input);
  return Number.isNaN(d.getTime()) ? null : d;
}

const partsFmt = new Intl.DateTimeFormat('en-GB', {
  timeZone: APP_TZ,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
  weekday: 'short',
});

export type ZonedParts = { year: number; month: number; day: number; hour: number; minute: number; weekday: string };

/** Calendar parts of a moment in Amsterdam time. */
export function zonedParts(d: Date): ZonedParts {
  const p: Record<string, string> = {};
  for (const part of partsFmt.formatToParts(d)) p[part.type] = part.value;
  return {
    year: Number(p.year),
    month: Number(p.month),
    day: Number(p.day),
    hour: Number(p.hour) % 24,
    minute: Number(p.minute),
    weekday: p.weekday,
  };
}

/** 'YYYY-MM-DD' of the Amsterdam day the moment falls on. */
export function dayKey(input: DateInput): string | null {
  if (typeof input === 'string' && DATE_ONLY.test(input)) return input;
  const d = toDate(input);
  if (!d) return null;
  const p = zonedParts(d);
  return `${p.year}-${String(p.month).padStart(2, '0')}-${String(p.day).padStart(2, '0')}`;
}

/** Today's 'YYYY-MM-DD' in Amsterdam. */
export function todayKey(now: Date = new Date()): string {
  return dayKey(now)!;
}

/** Whole days from day a to day b ('YYYY-MM-DD' keys or dates). Positive when b is later. */
export function daysBetween(a: DateInput, b: DateInput): number {
  const ka = dayKey(a);
  const kb = dayKey(b);
  if (!ka || !kb) return 0;
  return Math.round((Date.parse(`${kb}T00:00:00Z`) - Date.parse(`${ka}T00:00:00Z`)) / 86_400_000);
}

/** Add days to a 'YYYY-MM-DD' key. */
export function addDaysKey(key: string, days: number): string {
  const d = new Date(Date.parse(`${key}T12:00:00Z`) + days * 86_400_000);
  return d.toISOString().slice(0, 10);
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function keyParts(key: string) {
  const [y, m, d] = key.split('-').map(Number);
  const weekday = WEEKDAYS[new Date(Date.UTC(y, m - 1, d)).getUTCDay()];
  return { y, m, d, weekday };
}

/** '6 Nov', or '6 Nov 2025' when not the current year. */
export function formatDate(input: DateInput, now: Date = new Date()): string {
  const key = dayKey(input);
  if (!key) return '';
  const { y, m, d } = keyParts(key);
  const thisYear = keyParts(todayKey(now)).y;
  return y === thisYear ? `${d} ${MONTHS[m - 1]}` : `${d} ${MONTHS[m - 1]} ${y}`;
}

/** '30 Nov 2026', always with the year. */
export function formatDateLong(input: DateInput): string {
  const key = dayKey(input);
  if (!key) return '';
  const { y, m, d } = keyParts(key);
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

/** 'Fri 6 Nov' (plus the year when it is more than half a year away). */
export function formatDay(input: DateInput, now: Date = new Date()): string {
  const key = dayKey(input);
  if (!key) return '';
  const { y, m, d, weekday } = keyParts(key);
  const far = Math.abs(daysBetween(todayKey(now), key)) > 183;
  return far ? `${weekday} ${d} ${MONTHS[m - 1]} ${y}` : `${weekday} ${d} ${MONTHS[m - 1]}`;
}

/** 'Friday 6 November', for page headings. */
export function formatDayLong(input: DateInput): string {
  const d = toDate(input);
  if (!d) return '';
  return new Intl.DateTimeFormat('en-GB', { timeZone: APP_TZ, weekday: 'long', day: 'numeric', month: 'long' })
    .format(d)
    .replace(',', '');
}

/** '14:00' in Amsterdam time. */
export function formatTime(input: DateInput): string {
  const d = toDate(input);
  if (!d) return '';
  const p = zonedParts(d);
  return `${String(p.hour).padStart(2, '0')}:${String(p.minute).padStart(2, '0')}`;
}

/** '5 Nov 17:40', timeline style. */
export function formatDateTime(input: DateInput, now: Date = new Date()): string {
  const d = toDate(input);
  if (!d) return '';
  return `${formatDate(d, now)} ${formatTime(d)}`;
}

/** 'Today', 'Yesterday', 'Tomorrow', else 'Wed 4 Nov'. With { time: true } adds ' 14:00'. */
export function formatRelativeDay(input: DateInput, opts: { time?: boolean; now?: Date } = {}): string {
  const d = toDate(input);
  if (!d) return '';
  const now = opts.now ?? new Date();
  const diff = daysBetween(todayKey(now), dayKey(d));
  let label: string;
  if (diff === 0) label = 'Today';
  else if (diff === -1) label = 'Yesterday';
  else if (diff === 1) label = 'Tomorrow';
  else label = formatDay(d, now);
  const dateOnly = typeof input === 'string' && DATE_ONLY.test(input);
  return opts.time && !dateOnly ? `${label} ${formatTime(d)}` : label;
}

/** A due date as the task lists show it. All day tasks show the day only. */
export function formatDue(dueAt: DateInput, allDay = false, now: Date = new Date()): string {
  if (!dueAt) return 'No due date';
  return formatRelativeDay(dueAt, { time: !allDay, now });
}

/** 'just now', '3 min ago', '2 h ago', 'Yesterday', then the date. */
export function formatAgo(input: DateInput, now: Date = new Date()): string {
  const d = toDate(input);
  if (!d) return '';
  const secs = Math.round((now.getTime() - d.getTime()) / 1000);
  if (secs < 0) return formatRelativeDay(d, { time: true, now });
  if (secs < 60) return 'just now';
  const mins = Math.floor(secs / 60);
  if (mins < 60) return `${mins} min ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24 && daysBetween(d, now) === 0) return `${hours} h ago`;
  if (daysBetween(d, now) === 1) return 'Yesterday';
  return formatDate(d, now);
}

/** 130 -> '2h 10m', 45 -> '45m', 120 -> '2h'. */
export function formatMinutes(total: number | null | undefined): string {
  if (total === null || total === undefined || Number.isNaN(total)) return '';
  const sign = total < 0 ? '-' : '';
  const m = Math.abs(Math.round(total));
  const h = Math.floor(m / 60);
  const r = m % 60;
  if (h === 0) return `${sign}${r}m`;
  return r ? `${sign}${h}h ${r}m` : `${sign}${h}h`;
}

/** 1 -> '1 day', 9 -> '9 days'. */
export function formatDays(n: number | null | undefined): string {
  if (n === null || n === undefined) return '';
  return `${n} ${Math.abs(n) === 1 ? 'day' : 'days'}`;
}

// ---------------------------------------------------------------- money

const SYMBOLS: Record<string, string> = { EUR: '€', USD: '$', GBP: '£' };

/** Exact cents from a numeric string or number. '1700.5' -> 170050n. */
export function toCents(value: string | number | bigint | null | undefined): bigint {
  if (value === null || value === undefined || value === '') return 0n;
  if (typeof value === 'bigint') return value * 100n;
  const s = typeof value === 'number' ? value.toFixed(2) : String(value).trim();
  const m = s.match(/^(-)?(\d*)(?:\.(\d*))?$/);
  if (!m) throw new Error(`Not a money amount: ${value}`);
  const whole = BigInt(m[2] || '0');
  const fracDigits = (m[3] ?? '').padEnd(3, '0');
  let cents = whole * 100n + BigInt(fracDigits.slice(0, 2));
  if (Number(fracDigits[2]) >= 5) cents += 1n; // half up on the third decimal
  return m[1] ? -cents : cents;
}

/** Cents back to a numeric string for the database. 170050n -> '1700.50'. */
export function fromCents(cents: bigint): string {
  const neg = cents < 0n;
  const abs = neg ? -cents : cents;
  return `${neg ? '-' : ''}${abs / 100n}.${String(abs % 100n).padStart(2, '0')}`;
}

/** Exact sum of numeric strings. */
export function sumMoney(values: (string | number | null | undefined)[]): string {
  return fromCents(values.reduce<bigint>((acc, v) => acc + toCents(v), 0n));
}

/** amount times a factor (quantity, percent / 100), rounded half up to cents. */
export function multiplyMoney(amount: string | number, factor: number | string): string {
  const cents = toCents(amount);
  const f = String(factor);
  const [w, frac = ''] = f.replace('-', '').split('.');
  const scale = 10n ** BigInt(frac.length);
  const num = BigInt(w || '0') * scale + BigInt(frac || '0');
  const signed = f.startsWith('-') ? -num : num;
  const raw = cents * signed;
  const half = scale / 2n;
  const rounded = raw >= 0n ? (raw + half) / scale : -((-raw + half) / scale);
  return fromCents(scale === 1n ? raw : rounded);
}

/** VAT on a net amount at a percentage rate. vatAmount('14500', 21) -> '3045.00'. */
export function vatAmount(net: string | number, ratePct: number | string): string {
  return multiplyMoney(multiplyMoney(net, ratePct), 0.01);
}

/**
 * '€14,500' for whole amounts, '€1,700.50' otherwise. decimals forces 0 or 2.
 * Null or empty shows '' so tables stay quiet.
 */
export function formatMoney(
  value: string | number | null | undefined,
  currency = 'EUR',
  decimals?: 0 | 2,
): string {
  if (value === null || value === undefined || value === '') return '';
  const cents = toCents(value);
  const neg = cents < 0n;
  const abs = neg ? -cents : cents;
  const whole = (abs / 100n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const frac = abs % 100n;
  const showCents = decimals === 2 || (decimals === undefined && frac !== 0n);
  const symbol = SYMBOLS[currency] ?? `${currency} `;
  let body = showCents ? `${whole}.${String(frac).padStart(2, '0')}` : whole;
  if (decimals === 0 && frac >= 50n) {
    body = ((abs + 50n) / 100n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  return `${neg ? '-' : ''}${symbol}${body}`;
}

/** 60 -> '60%'. */
export function formatPercent(value: number | string | null | undefined): string {
  if (value === null || value === undefined || value === '') return '';
  const n = Number(value);
  return `${Number.isInteger(n) ? n : n.toFixed(1)}%`;
}

/** 'Raka Mulya' -> 'RM', 'Luna' -> 'LU'. */
export function initials(name: string | null | undefined): string {
  if (!name) return '?';
  const words = name.trim().split(/\s+/).filter((w) => /[a-z0-9]/i.test(w[0] ?? ''));
  if (words.length === 0) return '?';
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
}

// Legal forms and filler words that say nothing about which company it is.
const ORG_SKIP_WORDS = new Set([
  'bv', 'nv', 'vof', 'cv', 'gmbh', 'ag', 'ug', 'kg', 'ltd', 'limited', 'llc', 'llp', 'inc', 'corp', 'co', 'plc',
  'sarl', 'sas', 'sa', 'srl', 'spa', 'bvba', 'oy', 'ab', 'as', 'aps', 'the', 'and', 'of', 'de', 'het',
]);

/**
 * Organization avatar initials: the first letters of the first two words that are not
 * a legal form or filler ("Atlas Freight BV" -> "AF", "Brouwerij De Kade" -> "BK",
 * "Maison Orée" -> "MO"), the first two letters of a one word name ("Snorly" -> "SN").
 */
export function orgInitials(name: string | null | undefined): string {
  if (!name) return '?';
  const words = name
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .split(/[\s&+/,]+/)
    .map((w) => w.replace(/[^A-Za-z0-9]/g, ''))
    .filter(Boolean);
  const kept = words.filter((w) => !ORG_SKIP_WORDS.has(w.toLowerCase()));
  const use = kept.length ? kept : words;
  if (use.length === 0) return '?';
  if (use.length === 1) return use[0].slice(0, 2).toUpperCase();
  return (use[0][0] + use[1][0]).toUpperCase();
}

/** 'deal_won' -> 'Deal won'. For enum values without a label in lib/options.ts. */
export function humanize(value: string | null | undefined): string {
  if (!value) return '';
  const s = value.replace(/_/g, ' ').trim();
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/**
 * The real moment for an Amsterdam wall clock time, DST aware.
 * fromAmsterdamWallClock(2026, 11, 6, 14, 0) -> Date for 6 Nov 2026 14:00 in Amsterdam.
 */
export function fromAmsterdamWallClock(year: number, month: number, day: number, hour = 0, minute = 0): Date {
  const guess = Date.UTC(year, month - 1, day, hour, minute);
  let result = guess;
  for (let i = 0; i < 2; i++) {
    const p = zonedParts(new Date(result));
    const shown = Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute);
    result += guess - shown;
  }
  return new Date(result);
}

/** fromAmsterdamWallClock for a 'YYYY-MM-DD' key and an 'HH:MM' time. */
export function amsterdamTime(key: string, time = '00:00'): Date {
  const [y, m, d] = key.split('-').map(Number);
  const [h, min] = time.split(':').map(Number);
  return fromAmsterdamWallClock(y, m, d, h, min);
}

/** ISO or Date to the value a datetime-local input wants, in Amsterdam time ('2026-11-06T14:00'). */
export function toDatetimeLocal(input: DateInput): string {
  const d = toDate(input);
  if (!d) return '';
  return `${dayKey(d)}T${formatTime(d)}`;
}

/** A datetime-local value ('2026-11-06T14:00') read as Amsterdam time, to a Date. */
export function fromDatetimeLocal(value: string | null | undefined): Date | null {
  if (!value) return null;
  const m = value.match(/^(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2})/);
  if (!m) return toDate(value);
  return amsterdamTime(m[1], m[2]);
}
