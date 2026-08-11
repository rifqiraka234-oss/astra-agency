import type { TimeInterval } from '@astra/core';

/**
 * The calendar abstraction.
 *
 * Exactly one provider is active at a time, chosen by CALENDAR_PROVIDER. Both
 * implementations return raw free/busy intervals and let
 * `@astra/core`'s `generateSlots` decide what is offerable, rather than asking
 * the provider to suggest meeting times. Provider suggestion endpoints rank
 * results by heuristics that change without notice and cannot express the
 * operator's recurring exclusions, and "the API suggested it" is not a
 * defensible reason to have booked over someone's standup.
 */

export interface FreeBusyQuery {
  readonly calendarEmail: string;
  readonly windowStart: Date;
  readonly windowEnd: Date;
}

export type FreeBusyResult =
  | { readonly ok: true; readonly busy: readonly TimeInterval[]; readonly queriedAt: Date }
  | { readonly ok: false; readonly error: string; readonly queriedAt: Date };

export interface CreateEventInput {
  readonly calendarEmail: string;
  readonly title: string;
  readonly description: string;
  readonly start: Date;
  readonly end: Date;
  readonly timeZone: string;
  readonly attendeeEmail: string;
  /** Idempotency hint. Providers that support it will not double-create. */
  readonly requestId: string;
  readonly addConferencing: boolean;
}

export interface CreatedEvent {
  readonly providerEventId: string;
  readonly eventWebUrl: string | null;
  readonly conferenceUrl: string | null;
}

export interface CalendarProvider {
  readonly name: 'google' | 'microsoft' | 'none';
  getFreeBusy(query: FreeBusyQuery): Promise<FreeBusyResult>;
  createEvent(input: CreateEventInput): Promise<CreatedEvent>;
  /** Connection health for the dashboard's connect/reconnect controls. */
  checkConnection(calendarEmail: string): Promise<{ connected: boolean; detail: string }>;
}

/**
 * The provider used when CALENDAR_PROVIDER is `none`. Every query fails, which
 * makes the controller create a handoff. That is the correct behaviour for an
 * unconfigured calendar: an empty busy list would look like total
 * availability and offer the prospect every slot in the week.
 */
export class DisconnectedCalendarProvider implements CalendarProvider {
  readonly name = 'none' as const;

  async getFreeBusy(): Promise<FreeBusyResult> {
    return {
      ok: false,
      error: 'No calendar provider is configured (CALENDAR_PROVIDER=none).',
      queriedAt: new Date(),
    };
  }

  async createEvent(): Promise<CreatedEvent> {
    throw new Error('No calendar provider is configured; refusing to create an event.');
  }

  async checkConnection(): Promise<{ connected: boolean; detail: string }> {
    return { connected: false, detail: 'CALENDAR_PROVIDER is none.' };
  }
}

/** Merge overlapping busy intervals so slot filtering is O(n) and stable. */
export function mergeIntervals(intervals: readonly TimeInterval[]): TimeInterval[] {
  const sorted = [...intervals].sort((a, b) => a.start.getTime() - b.start.getTime());
  const merged: TimeInterval[] = [];

  for (const interval of sorted) {
    const last = merged.at(-1);
    if (last && interval.start <= last.end) {
      if (interval.end > last.end) {
        merged[merged.length - 1] = { start: last.start, end: interval.end };
      }
      continue;
    }
    merged.push({ start: interval.start, end: interval.end });
  }
  return merged;
}
