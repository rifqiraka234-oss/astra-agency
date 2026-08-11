import type { SchedulingConfig } from '../config/scheduling.js';
import { REASON_CODES, type ReasonCode } from '../domain/reason-codes.js';
import {
  isoDateInZone,
  timeOfDayToMinutes,
  utcToZonedParts,
  wallTimeRoundTrips,
  zonedWallToUtc,
} from './timezone.js';

/**
 * Deterministic slot generation.
 *
 * Availability is computed here, from live free/busy data supplied by the
 * caller, rather than delegated to a provider's ranking endpoint. Provider
 * ranking changes over time and cannot express the operator's recurring
 * exclusions, and "the API suggested it" is not a defensible reason to have
 * double-booked someone's standup.
 */

export interface TimeInterval {
  readonly start: Date;
  readonly end: Date;
}

export interface BusyInterval extends TimeInterval {
  readonly source: 'CALENDAR' | 'RESERVATION' | 'EXCLUSION' | 'BLACKOUT';
  readonly label?: string;
}

export interface SlotGenerationInput {
  readonly now: Date;
  readonly config: SchedulingConfig;
  /** Live free/busy result. Must come from a successful query. */
  readonly busy: readonly TimeInterval[];
  /** Active internal reservations, so two prospects never get the same slot. */
  readonly reservations: readonly TimeInterval[];
  readonly durationMinutes: number;
  readonly bufferMinutes: number;
  readonly minNoticeHours: number;
  readonly searchBusinessDays: number;
  /** Candidate start times are aligned to this grid, in minutes. */
  readonly granularityMinutes?: number;
  readonly maxSlots?: number;
}

export interface GeneratedSlot {
  readonly start: Date;
  readonly end: Date;
  /** YYYY-MM-DD in the operator timezone, used to spread options over days. */
  readonly localDate: string;
}

export interface SlotGenerationResult {
  readonly slots: readonly GeneratedSlot[];
  readonly reasonCodes: readonly ReasonCode[];
  readonly searchedThrough: Date;
}

const DEFAULT_GRANULARITY_MINUTES = 15;
const DEFAULT_MAX_SLOTS = 3;

export function generateSlots(input: SlotGenerationInput): SlotGenerationResult {
  const { config, now } = input;
  const timeZone = config.timezone;
  const granularity = input.granularityMinutes ?? DEFAULT_GRANULARITY_MINUTES;
  const maxSlots = input.maxSlots ?? DEFAULT_MAX_SLOTS;

  const earliestStart = new Date(now.getTime() + input.minNoticeHours * 60 * 60 * 1000);
  const workingDays = new Set(config.workingDays);

  const blocked = [
    ...input.busy.map((interval) => ({ ...interval, source: 'CALENDAR' as const })),
    ...input.reservations.map((interval) => ({ ...interval, source: 'RESERVATION' as const })),
  ];

  const candidates: GeneratedSlot[] = [];
  let businessDaysScanned = 0;
  let dayOffset = 0;
  let searchedThrough = now;

  // Bounded loop: at most a calendar month is scanned even if every day is
  // excluded, so a misconfigured calendar cannot spin here.
  while (businessDaysScanned < input.searchBusinessDays && dayOffset <= 45) {
    const dayStartParts = utcToZonedParts(
      new Date(now.getTime() + dayOffset * 24 * 60 * 60 * 1000),
      timeZone,
    );
    dayOffset += 1;

    if (!workingDays.has(dayStartParts.weekday)) continue;
    businessDaysScanned += 1;

    const localDate = `${dayStartParts.year.toString().padStart(4, '0')}-${dayStartParts.month
      .toString()
      .padStart(2, '0')}-${dayStartParts.day.toString().padStart(2, '0')}`;

    const fullDayBlackout = config.blackoutDates.some(
      (blackout) => blackout.date === localDate && blackout.start === undefined,
    );
    if (fullDayBlackout) continue;

    const dayExclusions = collectDayExclusions(config, dayStartParts.weekday, localDate);

    const workdayStart = timeOfDayToMinutes(config.workday.start);
    const workdayEnd = timeOfDayToMinutes(config.workday.end);

    for (
      let minute = ceilToGrid(workdayStart, granularity);
      minute + input.durationMinutes <= workdayEnd;
      minute += granularity
    ) {
      const wall = {
        year: dayStartParts.year,
        month: dayStartParts.month,
        day: dayStartParts.day,
        hour: Math.floor(minute / 60),
        minute: minute % 60,
      };
      const start = zonedWallToUtc(wall, timeZone);

      // On the spring-forward gap the requested wall time does not exist.
      if (!wallTimeRoundTrips(start, wall, timeZone)) continue;

      const end = new Date(start.getTime() + input.durationMinutes * 60 * 1000);
      searchedThrough = end > searchedThrough ? end : searchedThrough;

      if (start < earliestStart) continue;

      // The slot must also end inside the workday in local terms, which is not
      // implied by the minute arithmetic across a DST boundary.
      const endParts = utcToZonedParts(end, timeZone);
      if (endParts.hour * 60 + endParts.minute > workdayEnd) continue;

      if (overlapsAny(minute, minute + input.durationMinutes, dayExclusions)) continue;

      const bufferedStart = new Date(start.getTime() - input.bufferMinutes * 60 * 1000);
      const bufferedEnd = new Date(end.getTime() + input.bufferMinutes * 60 * 1000);
      if (blocked.some((interval) => intervalsOverlap(bufferedStart, bufferedEnd, interval))) {
        continue;
      }

      candidates.push({ start, end, localDate });
    }
  }

  const slots = spreadAcrossDays(candidates, maxSlots);
  const reasonCodes: ReasonCode[] = [];
  if (slots.length === 0) reasonCodes.push(REASON_CODES.NO_SLOTS_AVAILABLE);

  return { slots, reasonCodes, searchedThrough };
}

interface MinuteRange {
  readonly startMinute: number;
  readonly endMinute: number;
}

function collectDayExclusions(
  config: SchedulingConfig,
  weekday: SchedulingConfig['workingDays'][number],
  localDate: string,
): MinuteRange[] {
  const ranges: MinuteRange[] = [];
  for (const exclusion of config.recurringExclusions) {
    if (exclusion.weekday !== weekday) continue;
    ranges.push({
      startMinute: timeOfDayToMinutes(exclusion.start),
      endMinute: timeOfDayToMinutes(exclusion.end),
    });
  }
  for (const blackout of config.blackoutDates) {
    if (blackout.date !== localDate) continue;
    if (blackout.start === undefined || blackout.end === undefined) continue;
    ranges.push({
      startMinute: timeOfDayToMinutes(blackout.start),
      endMinute: timeOfDayToMinutes(blackout.end),
    });
  }
  return ranges;
}

function overlapsAny(startMinute: number, endMinute: number, ranges: readonly MinuteRange[]): boolean {
  return ranges.some((range) => startMinute < range.endMinute && endMinute > range.startMinute);
}

export function intervalsOverlap(start: Date, end: Date, other: TimeInterval): boolean {
  return start < other.end && end > other.start;
}

function ceilToGrid(minute: number, granularity: number): number {
  return Math.ceil(minute / granularity) * granularity;
}

/**
 * Prefer options spread across at least two days: three consecutive slots on
 * one afternoon reads as "here is my one free hour" and converts worse.
 */
function spreadAcrossDays(
  candidates: readonly GeneratedSlot[],
  maxSlots: number,
): GeneratedSlot[] {
  if (candidates.length === 0) return [];

  const byDate = new Map<string, GeneratedSlot[]>();
  for (const candidate of candidates) {
    const list = byDate.get(candidate.localDate) ?? [];
    list.push(candidate);
    byDate.set(candidate.localDate, list);
  }

  const dates = [...byDate.keys()].sort();
  const chosen: GeneratedSlot[] = [];

  // Round-robin across days, earliest slot of each day first.
  let round = 0;
  while (chosen.length < maxSlots && round < 10) {
    let addedThisRound = false;
    for (const date of dates) {
      if (chosen.length >= maxSlots) break;
      const slot = byDate.get(date)?.[round];
      if (slot) {
        chosen.push(slot);
        addedThisRound = true;
      }
    }
    if (!addedThisRound) break;
    round += 1;
  }

  return chosen.sort((a, b) => a.start.getTime() - b.start.getTime());
}

/**
 * Free/busy data has a shelf life. Composing an offer from a query that is
 * even a minute old risks offering a slot the operator just accepted.
 */
export function isAvailabilityFresh(
  queriedAt: Date,
  now: Date,
  freshnessSeconds: number,
): boolean {
  const ageMs = now.getTime() - queriedAt.getTime();
  return ageMs >= 0 && ageMs < freshnessSeconds * 1000;
}

export interface SlotRenderOptions {
  readonly operatorTimeZone: string;
  /** Only set when the prospect's zone is actually known, never inferred. */
  readonly prospectTimeZone?: string | null;
  readonly locale?: string;
}

export function describeSlotsForMessage(
  slots: readonly GeneratedSlot[],
  options: SlotRenderOptions,
): string[] {
  return slots.map((slot) => {
    const operatorLabel = `${formatWithZone(slot.start, options.operatorTimeZone, options.locale)} ${
      zoneLabel(options.operatorTimeZone)
    }`;
    if (!options.prospectTimeZone || options.prospectTimeZone === options.operatorTimeZone) {
      return operatorLabel;
    }
    const prospectLabel = `${formatWithZone(slot.start, options.prospectTimeZone, options.locale)} ${
      zoneLabel(options.prospectTimeZone)
    }`;
    return `${prospectLabel} (${operatorLabel})`;
  });
}

function formatWithZone(instant: Date, timeZone: string, locale = 'en-GB'): string {
  return new Intl.DateTimeFormat(locale, {
    timeZone,
    hourCycle: 'h23',
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
  }).format(instant);
}

function zoneLabel(timeZone: string): string {
  // "Europe/Amsterdam" -> "Amsterdam time". Explicit by design: an unlabelled
  // time in an outbound message is a policy violation.
  const city = timeZone.split('/').at(-1)?.replace(/_/g, ' ') ?? timeZone;
  return `${city} time`;
}

export { isoDateInZone };
