/**
 * lib/service/sla.ts, ticket SLA clocks in business hours. Pure, no database,
 * safe in client code. Loaders that read a ticket live in lib/service/tickets.ts.
 *
 *   const sla = computeSla({
 *     openedAt, firstRepliedAt, closedAt,
 *     events: [{ at, pauses: false }, { at, pauses: true }],   // ticket_status_events, oldest first
 *     policy: { firstReplyMinutes: 240, resolveMinutes: 1020, businessHours: DEFAULT_BUSINESS_HOURS },
 *     now,
 *   });
 *   sla.firstReply.status  // 'running' | 'due_soon' | 'overdue' | 'paused' | 'met' | 'missed'
 *   slaText(sla.firstReply, 'first_reply')  // 'First reply due in 2h 10m', 'Met, 3h'
 *
 * Business hours are Monday to Friday 09:00 to 17:30 Europe/Amsterdam unless the
 * policy says otherwise (days are ISO weekdays, 1 is Monday). Time in a stage that
 * pauses the SLA (Waiting on client) does not count on either clock. Daylight
 * saving is handled because every window is built from Amsterdam wall clock time.
 * Public holidays are not in V1.
 */
import { addDaysKey, amsterdamTime, dayKey, formatMinutes } from '../format';

export type BusinessHours = { tz?: string; days: number[]; start: string; end: string };

export const DEFAULT_BUSINESS_HOURS: BusinessHours = { tz: 'Europe/Amsterdam', days: [1, 2, 3, 4, 5], start: '09:00', end: '17:30' };

export type Interval = { start: Date; end: Date | null };

const MINUTE = 60_000;

/** ISO weekday (1 Monday ... 7 Sunday) of a 'YYYY-MM-DD' key. */
function isoWeekday(key: string): number {
  const [y, m, d] = key.split('-').map(Number);
  const w = new Date(Date.UTC(y, m - 1, d)).getUTCDay();
  return w === 0 ? 7 : w;
}

/** The business window of one Amsterdam day, or null on a closed day. */
export function businessWindow(key: string, bh: BusinessHours = DEFAULT_BUSINESS_HOURS): { start: Date; end: Date } | null {
  if (!bh.days.includes(isoWeekday(key))) return null;
  const start = amsterdamTime(key, bh.start);
  const end = amsterdamTime(key, bh.end);
  return end > start ? { start, end } : null;
}

/** Merge and sort pause intervals. An open ended pause (end null) runs forever. */
function normalisePauses(pauses: Interval[]): Interval[] {
  const sorted = pauses
    .filter((p) => p.end === null || p.end > p.start)
    .map((p) => ({ start: p.start, end: p.end }))
    .sort((a, b) => a.start.getTime() - b.start.getTime());
  const out: Interval[] = [];
  for (const p of sorted) {
    const last = out[out.length - 1];
    if (last && (last.end === null || p.start <= last.end)) {
      if (last.end !== null && (p.end === null || p.end > last.end)) last.end = p.end;
      continue;
    }
    out.push(p);
  }
  return out;
}

/** [start, end) minus the pauses, as active pieces. */
function subtractPauses(start: Date, end: Date, pauses: Interval[]): { start: Date; end: Date }[] {
  let pieces = [{ start, end }];
  for (const p of pauses) {
    const next: { start: Date; end: Date }[] = [];
    for (const piece of pieces) {
      const pEnd = p.end ?? new Date(8.64e15);
      if (pEnd <= piece.start || p.start >= piece.end) {
        next.push(piece);
        continue;
      }
      if (p.start > piece.start) next.push({ start: piece.start, end: p.start });
      if (pEnd < piece.end) next.push({ start: pEnd, end: piece.end });
    }
    pieces = next;
  }
  return pieces;
}

/** Business minutes between two moments, leaving out paused time. */
export function businessMinutesBetween(from: Date, to: Date, bh: BusinessHours = DEFAULT_BUSINESS_HOURS, pauses: Interval[] = []): number {
  if (to <= from) return 0;
  const merged = normalisePauses(pauses);
  let ms = 0;
  const lastKey = dayKey(to)!;
  for (let key = dayKey(from)!; key <= lastKey; key = addDaysKey(key, 1)) {
    const w = businessWindow(key, bh);
    if (!w) continue;
    const s = w.start > from ? w.start : from;
    const e = w.end < to ? w.end : to;
    if (e <= s) continue;
    for (const piece of subtractPauses(s, e, merged)) ms += piece.end.getTime() - piece.start.getTime();
  }
  return Math.round(ms / MINUTE);
}

/**
 * The moment `minutes` business minutes after `from`, skipping paused time.
 * Null when an open ended pause starts before the target is reached (the clock is stopped).
 */
export function addBusinessMinutes(from: Date, minutes: number, bh: BusinessHours = DEFAULT_BUSINESS_HOURS, pauses: Interval[] = []): Date | null {
  const merged = normalisePauses(pauses);
  let left = Math.max(0, minutes) * MINUTE;
  const openPause = merged.find((p) => p.end === null);
  let key = dayKey(from)!;
  for (let guard = 0; guard < 3700; guard++, key = addDaysKey(key, 1)) {
    const w = businessWindow(key, bh);
    if (!w) continue;
    const s = w.start > from ? w.start : from;
    if (w.end <= s) continue;
    if (openPause && openPause.start <= s) return null;
    for (const piece of subtractPauses(s, w.end, merged)) {
      const len = piece.end.getTime() - piece.start.getTime();
      if (left === 0) return piece.start;
      if (len >= left) return new Date(piece.start.getTime() + left);
      left -= len;
    }
    if (openPause && openPause.start < w.end) return null;
  }
  return null;
}

export type StatusEvent = { at: Date; pauses: boolean };

/** Paused stretches from the status log: a pause runs from a pausing status to the next status. */
export function pausedIntervals(events: StatusEvent[]): Interval[] {
  const sorted = [...events].sort((a, b) => a.at.getTime() - b.at.getTime());
  const out: Interval[] = [];
  let open: Date | null = null;
  for (const e of sorted) {
    if (e.pauses && open === null) open = e.at;
    else if (!e.pauses && open !== null) {
      out.push({ start: open, end: e.at });
      open = null;
    }
  }
  if (open !== null) out.push({ start: open, end: null });
  return out;
}

export type SlaStatus = 'running' | 'due_soon' | 'overdue' | 'paused' | 'met' | 'missed';

export type SlaClock = {
  status: SlaStatus;
  targetMinutes: number;
  /** Business minutes counted so far, or until the clock stopped. */
  usedMinutes: number;
  /** Business minutes left (negative when overdue). */
  remainingMinutes: number;
  /** When the target is (or was) reached. Null while paused with time left. */
  dueAt: Date | null;
  /** When the clock stopped (first reply or close), null while running. */
  stoppedAt: Date | null;
};

export type SlaPolicy = { firstReplyMinutes: number; resolveMinutes: number; businessHours?: BusinessHours | null };

export type SlaInput = {
  openedAt: Date;
  firstRepliedAt: Date | null;
  closedAt: Date | null;
  events: StatusEvent[];
  policy: SlaPolicy;
  now?: Date;
};

export type SlaResult = { firstReply: SlaClock; resolution: SlaClock; paused: boolean };

/** Due soon when a quarter of the target or an hour is left, whichever is smaller. */
export function dueSoonThreshold(targetMinutes: number): number {
  return Math.min(60, Math.round(targetMinutes / 4));
}

function clock(target: number, input: SlaInput, stopAt: Date | null, pauses: Interval[], paused: boolean, now: Date): SlaClock {
  const bh = input.policy.businessHours ?? DEFAULT_BUSINESS_HOURS;
  const end = stopAt ?? now;
  const used = businessMinutesBetween(input.openedAt, end, bh, pauses);
  const remaining = target - used;
  if (stopAt) {
    // Pauses after the stop do not matter, only the stretch up to it.
    const dueAt = addBusinessMinutes(input.openedAt, target, bh, pauses.filter((p) => p.start < stopAt));
    return { status: used <= target ? 'met' : 'missed', targetMinutes: target, usedMinutes: used, remainingMinutes: remaining, dueAt, stoppedAt: stopAt };
  }
  const dueAt = addBusinessMinutes(input.openedAt, target, bh, pauses);
  let status: SlaStatus;
  if (remaining <= 0) status = 'overdue';
  else if (paused) status = 'paused';
  else if (remaining <= dueSoonThreshold(target)) status = 'due_soon';
  else status = 'running';
  return { status, targetMinutes: target, usedMinutes: used, remainingMinutes: remaining, dueAt, stoppedAt: null };
}

/** Both SLA clocks of a ticket. */
export function computeSla(input: SlaInput): SlaResult {
  const now = input.now ?? new Date();
  const pauses = pausedIntervals(input.events).filter((p) => p.start < now);
  const paused = pauses.some((p) => p.end === null);
  return {
    firstReply: clock(input.policy.firstReplyMinutes, input, input.firstRepliedAt ?? (input.closedAt ? input.closedAt : null), pauses, paused, now),
    resolution: clock(input.policy.resolveMinutes, input, input.closedAt, pauses, paused, now),
    paused,
  };
}

export const SLA_TONES: Record<SlaStatus, 'grey' | 'blue' | 'amber' | 'green' | 'red'> = {
  running: 'blue',
  due_soon: 'amber',
  overdue: 'red',
  paused: 'grey',
  met: 'green',
  missed: 'red',
};

/** 'First reply due in 2h 10m', 'Close overdue by 1h', 'Met, 3h', 'Paused, 4h left'. */
export function slaText(c: SlaClock, which: 'first_reply' | 'resolution'): string {
  const what = which === 'first_reply' ? 'First reply' : 'Close';
  switch (c.status) {
    case 'met':
      return `Met, ${formatMinutes(c.usedMinutes)}`;
    case 'missed':
      return `Missed by ${formatMinutes(-c.remainingMinutes)}`;
    case 'overdue':
      return `${what} overdue by ${formatMinutes(Math.max(1, -c.remainingMinutes))}`;
    case 'paused':
      return `Paused, ${formatMinutes(c.remainingMinutes)} left`;
    default:
      return `${what} due in ${formatMinutes(c.remainingMinutes)}`;
  }
}

/** Sort weight for lists: overdue first, then due soon, running by time left, paused, then stopped clocks. */
export function slaUrgency(c: SlaClock): number {
  switch (c.status) {
    case 'overdue':
      return -1e9 + c.remainingMinutes; // most overdue first
    case 'due_soon':
    case 'running':
      return c.remainingMinutes;
    case 'paused':
      return 1e8 + c.remainingMinutes;
    default:
      return 1e9;
  }
}
