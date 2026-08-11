import type { TimeInterval } from '@astra/core';
import {
  mergeIntervals,
  type CalendarProvider,
  type CreateEventInput,
  type CreatedEvent,
  type FreeBusyQuery,
  type FreeBusyResult,
} from './provider.js';

/**
 * Scriptable calendar for TEST mode and tests.
 *
 * Supports the two behaviours worth testing beyond the happy path: a query
 * that fails (which must produce a handoff, never an empty busy list), and a
 * slot that becomes busy between the proposal and the booking.
 */
export class FakeCalendarProvider implements CalendarProvider {
  readonly name = 'google' as const;
  readonly createdEvents: CreateEventInput[] = [];

  busy: TimeInterval[] = [];
  shouldFailQuery = false;
  shouldFailCreate = false;
  /** Injected before the next query only, to simulate a slot being taken. */
  private pendingBusy: TimeInterval[] | null = null;

  constructor(busy: TimeInterval[] = []) {
    this.busy = busy;
  }

  /** Make the next free/busy query see an extra busy block. */
  becomesBusy(interval: TimeInterval): void {
    this.pendingBusy = [...this.busy, interval];
  }

  async getFreeBusy(_query: FreeBusyQuery): Promise<FreeBusyResult> {
    if (this.shouldFailQuery) {
      return { ok: false, error: 'simulated calendar outage', queriedAt: new Date() };
    }
    const busy = this.pendingBusy ?? this.busy;
    this.pendingBusy = null;
    return { ok: true, busy: mergeIntervals(busy), queriedAt: new Date() };
  }

  async createEvent(input: CreateEventInput): Promise<CreatedEvent> {
    if (this.shouldFailCreate) {
      throw new Error('simulated event creation failure');
    }
    // Idempotent on requestId, matching how the real providers behave.
    const existing = this.createdEvents.find((event) => event.requestId === input.requestId);
    if (existing) {
      return {
        providerEventId: `evt_fake_${input.requestId}`,
        eventWebUrl: `https://calendar.example/evt_fake_${input.requestId}`,
        conferenceUrl: null,
      };
    }
    this.createdEvents.push(input);
    this.busy = [...this.busy, { start: input.start, end: input.end }];
    return {
      providerEventId: `evt_fake_${input.requestId}`,
      eventWebUrl: `https://calendar.example/evt_fake_${input.requestId}`,
      conferenceUrl: input.addConferencing ? 'https://meet.example/fake' : null,
    };
  }

  async checkConnection(): Promise<{ connected: boolean; detail: string }> {
    return { connected: !this.shouldFailQuery, detail: 'fake calendar' };
  }
}
