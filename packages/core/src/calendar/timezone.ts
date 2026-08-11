import { WEEKDAYS, type Weekday } from '../domain/enums.js';

/**
 * Timezone arithmetic.
 *
 * Everything is stored and compared as UTC instants. Conversion happens only
 * at the two boundaries where a human is involved: generating slots inside
 * the operator's working hours, and rendering a time in a message. DST
 * offsets are never computed by hand; they come from the ICU database via
 * Intl, which is the only source that is right twice a year.
 */

export interface ZonedParts {
  readonly year: number;
  /** 1-12. */
  readonly month: number;
  readonly day: number;
  readonly hour: number;
  readonly minute: number;
  readonly second: number;
  readonly weekday: Weekday;
}

const partsFormatterCache = new Map<string, Intl.DateTimeFormat>();

function partsFormatter(timeZone: string): Intl.DateTimeFormat {
  let formatter = partsFormatterCache.get(timeZone);
  if (!formatter) {
    formatter = new Intl.DateTimeFormat('en-US', {
      timeZone,
      hourCycle: 'h23',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      weekday: 'short',
    });
    partsFormatterCache.set(timeZone, formatter);
  }
  return formatter;
}

const SHORT_WEEKDAY_TO_ENUM: Record<string, Weekday> = {
  Sun: 'SUNDAY',
  Mon: 'MONDAY',
  Tue: 'TUESDAY',
  Wed: 'WEDNESDAY',
  Thu: 'THURSDAY',
  Fri: 'FRIDAY',
  Sat: 'SATURDAY',
};

export function utcToZonedParts(instant: Date, timeZone: string): ZonedParts {
  const parts = partsFormatter(timeZone).formatToParts(instant);
  const lookup = (type: Intl.DateTimeFormatPartTypes): string =>
    parts.find((part) => part.type === type)?.value ?? '';

  const weekday = SHORT_WEEKDAY_TO_ENUM[lookup('weekday')];
  if (weekday === undefined) {
    throw new Error(`Could not resolve weekday for ${instant.toISOString()} in ${timeZone}`);
  }

  return {
    year: Number(lookup('year')),
    month: Number(lookup('month')),
    day: Number(lookup('day')),
    hour: Number(lookup('hour')),
    minute: Number(lookup('minute')),
    second: Number(lookup('second')),
    weekday,
  };
}

/** Offset of `timeZone` from UTC at a given instant, in milliseconds. */
export function timeZoneOffsetMs(instant: Date, timeZone: string): number {
  const parts = utcToZonedParts(instant, timeZone);
  const asUtc = Date.UTC(
    parts.year,
    parts.month - 1,
    parts.day,
    parts.hour,
    parts.minute,
    parts.second,
    instant.getUTCMilliseconds(),
  );
  return asUtc - instant.getTime();
}

/**
 * Convert a wall-clock time in `timeZone` to the UTC instant it names.
 *
 * Two passes are needed because the offset depends on the instant we are
 * trying to find. On the DST "spring forward" gap the named time does not
 * exist; we return the instant the clock jumps to rather than inventing one,
 * and callers filter it out because it will not match the requested hour.
 */
export function zonedWallToUtc(
  wall: { year: number; month: number; day: number; hour: number; minute: number },
  timeZone: string,
): Date {
  const naive = Date.UTC(wall.year, wall.month - 1, wall.day, wall.hour, wall.minute, 0, 0);
  const firstGuess = new Date(naive - timeZoneOffsetMs(new Date(naive), timeZone));
  const secondOffset = timeZoneOffsetMs(firstGuess, timeZone);
  return new Date(naive - secondOffset);
}

/** True when `instant` renders as exactly the requested wall-clock time. */
export function wallTimeRoundTrips(
  instant: Date,
  wall: { year: number; month: number; day: number; hour: number; minute: number },
  timeZone: string,
): boolean {
  const parts = utcToZonedParts(instant, timeZone);
  return (
    parts.year === wall.year &&
    parts.month === wall.month &&
    parts.day === wall.day &&
    parts.hour === wall.hour &&
    parts.minute === wall.minute
  );
}

export function parseTimeOfDay(value: string): { hour: number; minute: number } {
  const match = /^([01][0-9]|2[0-3]):([0-5][0-9])$/.exec(value);
  if (!match) throw new Error(`Invalid time of day: ${value}`);
  return { hour: Number(match[1]), minute: Number(match[2]) };
}

export function minutesSinceMidnight(parts: Pick<ZonedParts, 'hour' | 'minute'>): number {
  return parts.hour * 60 + parts.minute;
}

export function timeOfDayToMinutes(value: string): number {
  const { hour, minute } = parseTimeOfDay(value);
  return hour * 60 + minute;
}

export function isoDateInZone(instant: Date, timeZone: string): string {
  const parts = utcToZonedParts(instant, timeZone);
  return `${parts.year.toString().padStart(4, '0')}-${parts.month
    .toString()
    .padStart(2, '0')}-${parts.day.toString().padStart(2, '0')}`;
}

export function weekdayOf(instant: Date, timeZone: string): Weekday {
  return utcToZonedParts(instant, timeZone).weekday;
}

export function isWeekday(value: string): value is Weekday {
  return (WEEKDAYS as readonly string[]).includes(value);
}

const displayFormatterCache = new Map<string, Intl.DateTimeFormat>();

/**
 * Human-facing rendering, e.g. "Tuesday 12 August, 14:00". The zone label is
 * added by the caller: a time without an explicit zone in an outbound message
 * is a policy violation, not a formatting choice.
 */
export function formatSlotForHuman(
  instant: Date,
  timeZone: string,
  locale = 'en-GB',
): string {
  const key = `${timeZone}|${locale}`;
  let formatter = displayFormatterCache.get(key);
  if (!formatter) {
    formatter = new Intl.DateTimeFormat(locale, {
      timeZone,
      hourCycle: 'h23',
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      hour: '2-digit',
      minute: '2-digit',
    });
    displayFormatterCache.set(key, formatter);
  }
  return formatter.format(instant);
}

export function addDaysInZone(instant: Date, days: number, timeZone: string): Date {
  const parts = utcToZonedParts(instant, timeZone);
  return zonedWallToUtc(
    {
      year: parts.year,
      month: parts.month,
      day: parts.day + days,
      hour: parts.hour,
      minute: parts.minute,
    },
    timeZone,
  );
}
