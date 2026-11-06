import { describe, expect, it } from 'vitest';
import { amsterdamTime } from '../../lib/format';
import {
  addBusinessMinutes,
  businessMinutesBetween,
  computeSla,
  pausedIntervals,
  slaText,
  slaUrgency,
  type SlaInput,
} from '../../lib/service/sla';

const A = (day: string, time: string) => amsterdamTime(day, time);
const HIGH = { firstReplyMinutes: 240, resolveMinutes: 1020 };
const MEDIUM = { firstReplyMinutes: 480, resolveMinutes: 2550 };
const LOW = { firstReplyMinutes: 960, resolveMinutes: 5100 };

describe('business minutes, Mon to Fri 09:00 to 17:30 Amsterdam', () => {
  it('counts only business time across a weekend', () => {
    // Fri 6 Nov 17:00 to Mon 9 Nov 10:00 is 30 minutes on Friday and 60 on Monday.
    expect(businessMinutesBetween(A('2026-11-06', '17:00'), A('2026-11-09', '10:00'))).toBe(90);
    // A whole weekend counts nothing.
    expect(businessMinutesBetween(A('2026-11-07', '08:00'), A('2026-11-08', '20:00'))).toBe(0);
    // A full business day is 8.5 hours.
    expect(businessMinutesBetween(A('2026-11-09', '00:00'), A('2026-11-10', '00:00'))).toBe(510);
  });

  it('adds business minutes over the weekend', () => {
    // Opened Fri 16:30 with a 4 hour target: 1h on Friday, 3h on Monday, due Mon 12:00.
    expect(addBusinessMinutes(A('2026-11-06', '16:30'), 240)?.toISOString()).toBe(A('2026-11-09', '12:00').toISOString());
    // Opened on Saturday, the clock starts Monday 09:00.
    expect(addBusinessMinutes(A('2026-11-07', '11:00'), 60)?.toISOString()).toBe(A('2026-11-09', '10:00').toISOString());
  });

  it('follows the wall clock across the end of daylight saving', () => {
    // Fri 23 Oct 17:00 CEST plus 60 minutes: 30 on Friday, then Mon 26 Oct 09:30 CET (08:30 UTC).
    expect(addBusinessMinutes(A('2026-10-23', '17:00'), 60)?.toISOString()).toBe('2026-10-26T08:30:00.000Z');
  });
});

describe('computeSla', () => {
  const weekendTicket = (now: Date): SlaInput => ({
    openedAt: A('2026-11-06', '16:30'),
    firstRepliedAt: null,
    closedAt: null,
    events: [{ at: A('2026-11-06', '16:30'), pauses: false }],
    policy: HIGH,
    now,
  });

  it('runs a first reply clock over a weekend', () => {
    const sat = computeSla(weekendTicket(A('2026-11-07', '12:00')));
    expect(sat.firstReply.status).toBe('running');
    expect(sat.firstReply.usedMinutes).toBe(60);
    expect(sat.firstReply.remainingMinutes).toBe(180);
    expect(sat.firstReply.dueAt?.toISOString()).toBe(A('2026-11-09', '12:00').toISOString());
    expect(slaText(sat.firstReply, 'first_reply')).toBe('First reply due in 3h');

    const monLate = computeSla(weekendTicket(A('2026-11-09', '11:15')));
    expect(monLate.firstReply.status).toBe('due_soon');
    expect(monLate.firstReply.remainingMinutes).toBe(45);

    const overdue = computeSla(weekendTicket(A('2026-11-09', '12:30')));
    expect(overdue.firstReply.status).toBe('overdue');
    expect(slaText(overdue.firstReply, 'first_reply')).toBe('First reply overdue by 30m');
    expect(slaUrgency(overdue.firstReply)).toBeLessThan(slaUrgency(monLate.firstReply));
  });

  it('pauses both clocks while waiting on the client', () => {
    const base: Omit<SlaInput, 'now'> = {
      openedAt: A('2026-11-09', '09:00'),
      firstRepliedAt: A('2026-11-09', '10:00'),
      closedAt: null,
      events: [
        { at: A('2026-11-09', '09:00'), pauses: false }, // New
        { at: A('2026-11-09', '10:00'), pauses: true }, // Waiting on client
      ],
      policy: MEDIUM,
    };
    const paused = computeSla({ ...base, now: A('2026-11-10', '15:00') });
    expect(paused.paused).toBe(true);
    expect(paused.firstReply.status).toBe('met');
    expect(paused.resolution.status).toBe('paused');
    expect(paused.resolution.usedMinutes).toBe(60); // 09:00 to 10:00 only
    expect(paused.resolution.dueAt).toBeNull();
    expect(slaText(paused.resolution, 'resolution')).toBe('Paused, 41h 30m left');

    // The client answers Tue 10:00, the clock resumes with 2490 minutes left.
    const resumed = computeSla({
      ...base,
      events: [...base.events, { at: A('2026-11-10', '10:00'), pauses: false }],
      now: A('2026-11-10', '11:00'),
    });
    expect(resumed.paused).toBe(false);
    expect(resumed.resolution.status).toBe('running');
    expect(resumed.resolution.usedMinutes).toBe(120);
    // 60 used Monday, then 2490 from Tue 10:00: Tue 450, Wed to Fri 1530, Mon 16 Nov 510 = 2490, due Mon 17:30.
    expect(resumed.resolution.dueAt?.toISOString()).toBe(A('2026-11-16', '17:30').toISOString());
  });

  it('pause spanning a weekend counts nothing on either side', () => {
    const pauses = pausedIntervals([
      { at: A('2026-11-06', '16:00'), pauses: false },
      { at: A('2026-11-06', '17:00'), pauses: true },
      { at: A('2026-11-09', '11:00'), pauses: false },
    ]);
    expect(pauses).toHaveLength(1);
    // Fri 16:00 to 17:00 counts, then nothing until Mon 11:00, then 11:00 to 12:00.
    expect(businessMinutesBetween(A('2026-11-06', '16:00'), A('2026-11-09', '12:00'), undefined, pauses)).toBe(120);
    expect(addBusinessMinutes(A('2026-11-06', '16:00'), 90, undefined, pauses)?.toISOString()).toBe(A('2026-11-09', '11:30').toISOString());
  });

  it('stops the clocks at first reply and close (ticket 104)', () => {
    const sla = computeSla({
      openedAt: A('2026-10-14', '10:00'),
      firstRepliedAt: A('2026-10-14', '13:00'),
      closedAt: A('2026-10-15', '11:30'),
      events: [
        { at: A('2026-10-14', '10:00'), pauses: false },
        { at: A('2026-10-14', '10:05'), pauses: false },
        { at: A('2026-10-14', '13:00'), pauses: true },
        { at: A('2026-10-15', '11:30'), pauses: false },
      ],
      policy: LOW,
      now: A('2026-11-06', '11:00'),
    });
    expect(sla.firstReply.status).toBe('met');
    expect(slaText(sla.firstReply, 'first_reply')).toBe('Met, 3h');
    expect(sla.resolution.status).toBe('met');
    expect(sla.resolution.usedMinutes).toBe(180);
  });

  it('marks a clock missed when it stopped after the target', () => {
    const sla = computeSla({
      openedAt: A('2026-11-09', '09:00'),
      firstRepliedAt: A('2026-11-09', '14:00'),
      closedAt: null,
      events: [],
      policy: HIGH,
      now: A('2026-11-09', '15:00'),
    });
    expect(sla.firstReply.status).toBe('missed');
    expect(slaText(sla.firstReply, 'first_reply')).toBe('Missed by 1h');
  });
});
