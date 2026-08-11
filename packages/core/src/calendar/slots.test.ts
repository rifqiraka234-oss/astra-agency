import { describe, expect, it } from 'vitest';
import { DEFAULT_SCHEDULING_CONFIG, type SchedulingConfig } from '../config/scheduling.js';
import { generateSlots, isAvailabilityFresh, describeSlotsForMessage } from './slots.js';
import { utcToZonedParts, zonedWallToUtc, timeZoneOffsetMs } from './timezone.js';

const TZ = 'Europe/Amsterdam';

const baseInput = (overrides: Partial<Parameters<typeof generateSlots>[0]> = {}) => ({
  // Friday 7 August 2026, 08:00 Amsterdam (06:00 UTC, summer time).
  now: new Date('2026-08-07T06:00:00Z'),
  config: DEFAULT_SCHEDULING_CONFIG,
  busy: [],
  reservations: [],
  durationMinutes: 20,
  bufferMinutes: 10,
  minNoticeHours: 4,
  searchBusinessDays: 5,
  maxSlots: 3,
  ...overrides,
});

const localOf = (instant: Date) => utcToZonedParts(instant, TZ);

describe('timezone arithmetic', () => {
  it('resolves the Amsterdam offset correctly on both sides of the DST change', () => {
    expect(timeZoneOffsetMs(new Date('2026-08-07T10:00:00Z'), TZ)).toBe(2 * 60 * 60 * 1000);
    expect(timeZoneOffsetMs(new Date('2026-01-07T10:00:00Z'), TZ)).toBe(1 * 60 * 60 * 1000);
  });

  it('round-trips a wall clock time through UTC across the autumn change', () => {
    // 25 October 2026 is the autumn transition in the EU.
    const instant = zonedWallToUtc(
      { year: 2026, month: 10, day: 26, hour: 9, minute: 30 },
      TZ,
    );
    const parts = utcToZonedParts(instant, TZ);
    expect([parts.hour, parts.minute]).toEqual([9, 30]);
  });
});

describe('slot generation', () => {
  it('never proposes a slot inside the Monday 10:30-11:15 exclusion', () => {
    const result = generateSlots(baseInput({ maxSlots: 40, searchBusinessDays: 5 }));
    const mondayHits = result.slots.filter((slot) => {
      const parts = localOf(slot.start);
      const minutes = parts.hour * 60 + parts.minute;
      const endParts = localOf(slot.end);
      const endMinutes = endParts.hour * 60 + endParts.minute;
      return parts.weekday === 'MONDAY' && minutes < 11 * 60 + 15 && endMinutes > 10 * 60 + 30;
    });
    expect(mondayHits).toHaveLength(0);
  });

  it('never proposes a slot inside the Tuesday 09:30-10:30 exclusion', () => {
    const result = generateSlots(baseInput({ maxSlots: 40 }));
    const tuesdayHits = result.slots.filter((slot) => {
      const parts = localOf(slot.start);
      const minutes = parts.hour * 60 + parts.minute;
      const endParts = localOf(slot.end);
      const endMinutes = endParts.hour * 60 + endParts.minute;
      return parts.weekday === 'TUESDAY' && minutes < 10 * 60 + 30 && endMinutes > 9 * 60 + 30;
    });
    expect(tuesdayHits).toHaveLength(0);
  });

  it('never proposes a weekend slot', () => {
    const result = generateSlots(baseInput({ maxSlots: 40 }));
    const weekend = result.slots.filter((slot) => {
      const weekday = localOf(slot.start).weekday;
      return weekday === 'SATURDAY' || weekday === 'SUNDAY';
    });
    expect(weekend).toHaveLength(0);
  });

  it('respects the minimum notice window', () => {
    const now = new Date('2026-08-07T06:00:00Z');
    const result = generateSlots(baseInput({ now, minNoticeHours: 4 }));
    const earliest = result.slots[0];
    expect(earliest).toBeDefined();
    expect(earliest!.start.getTime()).toBeGreaterThanOrEqual(now.getTime() + 4 * 3600 * 1000);
  });

  it('applies buffers around a busy event', () => {
    // Busy 13:00-13:30 Amsterdam on Monday 10 August 2026.
    const busyStart = zonedWallToUtc({ year: 2026, month: 8, day: 10, hour: 13, minute: 0 }, TZ);
    const busyEnd = zonedWallToUtc({ year: 2026, month: 8, day: 10, hour: 13, minute: 30 }, TZ);
    const result = generateSlots(
      baseInput({ busy: [{ start: busyStart, end: busyEnd }], maxSlots: 60, bufferMinutes: 10 }),
    );
    const conflicting = result.slots.filter(
      (slot) =>
        slot.start < new Date(busyEnd.getTime() + 10 * 60_000) &&
        slot.end > new Date(busyStart.getTime() - 10 * 60_000),
    );
    expect(conflicting).toHaveLength(0);
  });

  it('excludes a slot already reserved for another prospect', () => {
    const unbuffered = generateSlots(baseInput({ maxSlots: 1, bufferMinutes: 0 }));
    const first = unbuffered.slots[0];
    expect(first).toBeDefined();

    const withReservation = generateSlots(
      baseInput({
        maxSlots: 1,
        bufferMinutes: 0,
        reservations: [{ start: first!.start, end: first!.end }],
      }),
    );
    expect(withReservation.slots[0]?.start.toISOString()).not.toBe(first!.start.toISOString());
  });

  it('spreads options across at least two days when possible', () => {
    const result = generateSlots(baseInput({ maxSlots: 3 }));
    const days = new Set(result.slots.map((slot) => slot.localDate));
    expect(days.size).toBeGreaterThanOrEqual(2);
  });

  it('honours a full-day blackout', () => {
    const config: SchedulingConfig = {
      ...DEFAULT_SCHEDULING_CONFIG,
      blackoutDates: [{ date: '2026-08-10', label: 'offsite' }],
    };
    const result = generateSlots(baseInput({ config, maxSlots: 40 }));
    expect(result.slots.some((slot) => slot.localDate === '2026-08-10')).toBe(false);
  });

  it('reports no availability when the whole horizon is busy', () => {
    const result = generateSlots(
      baseInput({
        busy: [{ start: new Date('2026-08-07T00:00:00Z'), end: new Date('2026-09-07T00:00:00Z') }],
      }),
    );
    expect(result.slots).toHaveLength(0);
    expect(result.reasonCodes).toContain('NO_SLOTS_AVAILABLE');
  });

  it('keeps every slot inside the configured workday', () => {
    const result = generateSlots(baseInput({ maxSlots: 60 }));
    for (const slot of result.slots) {
      const start = localOf(slot.start);
      const end = localOf(slot.end);
      expect(start.hour * 60 + start.minute).toBeGreaterThanOrEqual(9 * 60);
      expect(end.hour * 60 + end.minute).toBeLessThanOrEqual(18 * 60);
    }
  });
});

describe('availability freshness', () => {
  const now = new Date('2026-08-07T10:00:00Z');

  it('accepts a query from 30 seconds ago', () => {
    expect(isAvailabilityFresh(new Date(now.getTime() - 30_000), now, 60)).toBe(true);
  });

  it('rejects a query from 61 seconds ago', () => {
    expect(isAvailabilityFresh(new Date(now.getTime() - 61_000), now, 60)).toBe(false);
  });

  it('rejects a query timestamped in the future', () => {
    expect(isAvailabilityFresh(new Date(now.getTime() + 1_000), now, 60)).toBe(false);
  });
});

describe('slot rendering', () => {
  const slot = {
    start: zonedWallToUtc({ year: 2026, month: 8, day: 11, hour: 14, minute: 0 }, TZ),
    end: zonedWallToUtc({ year: 2026, month: 8, day: 11, hour: 14, minute: 20 }, TZ),
    localDate: '2026-08-11',
  };

  it('labels Amsterdam time when the prospect timezone is unknown', () => {
    const [line] = describeSlotsForMessage([slot], { operatorTimeZone: TZ });
    expect(line).toContain('Amsterdam time');
    expect(line).toContain('14:00');
  });

  it('shows both zones when the prospect timezone is explicitly known', () => {
    const [line] = describeSlotsForMessage([slot], {
      operatorTimeZone: TZ,
      prospectTimeZone: 'America/New_York',
    });
    expect(line).toContain('New York time');
    expect(line).toContain('Amsterdam time');
  });
});
