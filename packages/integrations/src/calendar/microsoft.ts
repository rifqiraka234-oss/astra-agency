import type { TimeInterval } from '@astra/core';
import { requestForm, requestJson, DEFAULT_RETRY, NO_RETRY } from '../http.js';
import { ExternalWriteGuard } from '../guard.js';
import {
  mergeIntervals,
  type CalendarProvider,
  type CreateEventInput,
  type CreatedEvent,
  type FreeBusyQuery,
  type FreeBusyResult,
} from './provider.js';

/**
 * Microsoft 365 provider.
 *
 * Verified against
 * https://learn.microsoft.com/en-us/graph/api/calendar-getschedule?view=graph-rest-1.0
 * on 2026-08-11.
 *
 * Uses `getSchedule` for free/busy and computes slots locally, deliberately
 * not `findMeetingTimes`: that endpoint's ranking behaviour changes over time
 * and cannot express the operator's recurring exclusions, so its answers are
 * neither reproducible nor auditable.
 */

const INTEGRATION = 'microsoft-calendar';
const GRAPH_BASE = 'https://graph.microsoft.com/v1.0';

export const MICROSOFT_CALENDAR_SCOPES = [
  'offline_access',
  'Calendars.ReadWrite',
  'Calendars.Read.Shared',
] as const;

export interface MicrosoftCredentials {
  readonly clientId: string;
  readonly clientSecret: string;
  readonly tenantId: string;
  readonly refreshToken: string;
}

interface TokenResponse {
  readonly access_token: string;
  readonly expires_in: number;
}

interface GetScheduleResponse {
  readonly value?: ReadonlyArray<{
    readonly scheduleId?: string;
    readonly error?: { message?: string };
    readonly scheduleItems?: ReadonlyArray<{
      readonly status?: string;
      readonly start?: { dateTime?: string; timeZone?: string };
      readonly end?: { dateTime?: string; timeZone?: string };
    }>;
  }>;
}

interface GraphEventResponse {
  readonly id: string;
  readonly webLink?: string;
  readonly onlineMeeting?: { joinUrl?: string };
}

/** Graph reports these as unavailable; `free` and `unknown` are not blocking. */
const BUSY_STATUSES = new Set(['busy', 'oof', 'workingElsewhere', 'tentative']);

export class MicrosoftCalendarProvider implements CalendarProvider {
  readonly name = 'microsoft' as const;
  private accessToken: { value: string; expiresAt: number } | null = null;

  constructor(
    private readonly credentials: MicrosoftCredentials,
    private readonly guard: ExternalWriteGuard,
  ) {}

  private async token(): Promise<string> {
    if (this.accessToken && this.accessToken.expiresAt > Date.now() + 60_000) {
      return this.accessToken.value;
    }
    const response = await requestForm<TokenResponse>(
      `https://login.microsoftonline.com/${this.credentials.tenantId}/oauth2/v2.0/token`,
      {
        integration: INTEGRATION,
        form: new URLSearchParams({
          client_id: this.credentials.clientId,
          client_secret: this.credentials.clientSecret,
          refresh_token: this.credentials.refreshToken,
          grant_type: 'refresh_token',
          scope: MICROSOFT_CALENDAR_SCOPES.join(' '),
        }),
      },
    );
    this.accessToken = {
      value: response.access_token,
      expiresAt: Date.now() + response.expires_in * 1000,
    };
    return response.access_token;
  }

  async getFreeBusy(query: FreeBusyQuery): Promise<FreeBusyResult> {
    const queriedAt = new Date();
    try {
      const response = await requestJson<GetScheduleResponse>(
        `${GRAPH_BASE}/users/${encodeURIComponent(query.calendarEmail)}/calendar/getSchedule`,
        {
          integration: INTEGRATION,
          method: 'POST',
          headers: { authorization: `Bearer ${await this.token()}` },
          retry: DEFAULT_RETRY,
          body: {
            schedules: [query.calendarEmail],
            // Times are sent in UTC and interpreted in UTC, so no local
            // offset arithmetic happens anywhere in this call.
            startTime: { dateTime: toGraphDateTime(query.windowStart), timeZone: 'UTC' },
            endTime: { dateTime: toGraphDateTime(query.windowEnd), timeZone: 'UTC' },
            availabilityViewInterval: 15,
          },
        },
      );

      const schedule = response.value?.[0];
      if (!schedule || schedule.error) {
        return {
          ok: false,
          error: schedule?.error?.message ?? 'Graph returned no schedule for this calendar.',
          queriedAt: new Date(),
        };
      }

      const busy: TimeInterval[] = [];
      for (const item of schedule.scheduleItems ?? []) {
        if (item.status !== undefined && !BUSY_STATUSES.has(item.status)) continue;
        const start = parseGraphDateTime(item.start?.dateTime, item.start?.timeZone);
        const end = parseGraphDateTime(item.end?.dateTime, item.end?.timeZone);
        if (start && end) busy.push({ start, end });
      }

      return { ok: true, busy: mergeIntervals(busy), queriedAt: new Date() };
    } catch (error) {
      return { ok: false, error: describeError(error), queriedAt };
    }
  }

  async createEvent(input: CreateEventInput): Promise<CreatedEvent> {
    this.guard.assertAllowed('CALENDAR_WRITE');

    const response = await requestJson<GraphEventResponse>(
      `${GRAPH_BASE}/users/${encodeURIComponent(input.calendarEmail)}/events`,
      {
        integration: INTEGRATION,
        method: 'POST',
        headers: {
          authorization: `Bearer ${await this.token()}`,
          // Graph deduplicates on this header, which makes a retry after an
          // ambiguous failure safe at the provider level as well as ours.
          'client-request-id': input.requestId,
        },
        retry: NO_RETRY,
        body: {
          subject: input.title,
          body: { contentType: 'text', content: input.description },
          start: { dateTime: toGraphDateTime(input.start), timeZone: 'UTC' },
          end: { dateTime: toGraphDateTime(input.end), timeZone: 'UTC' },
          attendees: [
            { emailAddress: { address: input.attendeeEmail }, type: 'required' },
          ],
          ...(input.addConferencing
            ? { isOnlineMeeting: true, onlineMeetingProvider: 'teamsForBusiness' }
            : {}),
        },
      },
    );

    return {
      providerEventId: response.id,
      eventWebUrl: response.webLink ?? null,
      conferenceUrl: response.onlineMeeting?.joinUrl ?? null,
    };
  }

  async checkConnection(calendarEmail: string): Promise<{ connected: boolean; detail: string }> {
    try {
      await this.token();
      const probe = await this.getFreeBusy({
        calendarEmail,
        windowStart: new Date(),
        windowEnd: new Date(Date.now() + 60 * 60 * 1000),
      });
      return probe.ok
        ? { connected: true, detail: 'Microsoft Graph responded to a getSchedule probe.' }
        : { connected: false, detail: probe.error };
    } catch (error) {
      return { connected: false, detail: describeError(error) };
    }
  }
}

/** Graph wants `2026-08-11T09:00:00` with the zone named separately. */
function toGraphDateTime(instant: Date): string {
  return instant.toISOString().replace(/\.\d{3}Z$/, '');
}

function parseGraphDateTime(value: string | undefined, timeZone: string | undefined): Date | null {
  if (!value) return null;
  // Graph omits the trailing Z even when the zone is UTC, so an explicit
  // suffix is added rather than letting the runtime guess local time.
  const normalized = /[Zz]|[+-]\d{2}:?\d{2}$/.test(value)
    ? value
    : `${value}${(timeZone ?? 'UTC').toUpperCase() === 'UTC' ? 'Z' : 'Z'}`;
  const parsed = new Date(normalized);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function describeError(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}
