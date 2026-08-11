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
 * Google Calendar provider.
 *
 * Verified against:
 *   https://developers.google.com/workspace/calendar/api/v3/reference/freebusy/query
 *   https://developers.google.com/workspace/calendar/api/v3/reference/events/insert
 * on 2026-08-11.
 *
 * Uses delegated OAuth with the least privilege that still works:
 * `calendar.freebusy` would be enough for reading, but creating the event
 * needs `calendar.events`, so that is the scope requested. The refresh token
 * is supplied by the caller already decrypted and is never logged.
 */

const INTEGRATION = 'google-calendar';
const TOKEN_URL = 'https://oauth2.googleapis.com/token';
const API_BASE = 'https://www.googleapis.com/calendar/v3';

export const GOOGLE_CALENDAR_SCOPES = [
  'https://www.googleapis.com/auth/calendar.events',
  'https://www.googleapis.com/auth/calendar.freebusy',
] as const;

export interface GoogleCredentials {
  readonly clientId: string;
  readonly clientSecret: string;
  readonly refreshToken: string;
}

interface TokenResponse {
  readonly access_token: string;
  readonly expires_in: number;
}

interface FreeBusyResponse {
  readonly calendars?: Record<
    string,
    { readonly busy?: ReadonlyArray<{ start: string; end: string }>; readonly errors?: unknown[] }
  >;
}

interface EventResponse {
  readonly id: string;
  readonly htmlLink?: string;
  readonly hangoutLink?: string;
  readonly conferenceData?: { readonly entryPoints?: ReadonlyArray<{ uri?: string }> };
}

export class GoogleCalendarProvider implements CalendarProvider {
  readonly name = 'google' as const;
  private accessToken: { value: string; expiresAt: number } | null = null;

  constructor(
    private readonly credentials: GoogleCredentials,
    private readonly guard: ExternalWriteGuard,
  ) {}

  private async token(): Promise<string> {
    if (this.accessToken && this.accessToken.expiresAt > Date.now() + 60_000) {
      return this.accessToken.value;
    }
    const body = new URLSearchParams({
      client_id: this.credentials.clientId,
      client_secret: this.credentials.clientSecret,
      refresh_token: this.credentials.refreshToken,
      grant_type: 'refresh_token',
    });
    // The OAuth token endpoint is the one form-encoded call in this adapter,
    // so it uses the shared client's form mode rather than the JSON path.
    const response = await requestForm<TokenResponse>(TOKEN_URL, {
      integration: INTEGRATION,
      form: body,
      retry: DEFAULT_RETRY,
    });

    this.accessToken = {
      value: response.access_token,
      expiresAt: Date.now() + response.expires_in * 1000,
    };
    return response.access_token;
  }

  async getFreeBusy(query: FreeBusyQuery): Promise<FreeBusyResult> {
    const queriedAt = new Date();
    try {
      const response = await requestJson<FreeBusyResponse>(`${API_BASE}/freeBusy`, {
        integration: INTEGRATION,
        method: 'POST',
        headers: { authorization: `Bearer ${await this.token()}` },
        retry: DEFAULT_RETRY,
        body: {
          timeMin: query.windowStart.toISOString(),
          timeMax: query.windowEnd.toISOString(),
          items: [{ id: query.calendarEmail }],
        },
      });

      const calendar = response.calendars?.[query.calendarEmail];
      if (!calendar || (calendar.errors?.length ?? 0) > 0) {
        return {
          ok: false,
          error: `Google returned errors for ${query.calendarEmail}`,
          queriedAt: new Date(),
        };
      }

      const busy: TimeInterval[] = (calendar.busy ?? []).map((block) => ({
        start: new Date(block.start),
        end: new Date(block.end),
      }));
      return { ok: true, busy: mergeIntervals(busy), queriedAt: new Date() };
    } catch (error) {
      return { ok: false, error: describeError(error), queriedAt };
    }
  }

  async createEvent(input: CreateEventInput): Promise<CreatedEvent> {
    this.guard.assertAllowed('CALENDAR_WRITE');

    const url = new URL(`${API_BASE}/calendars/${encodeURIComponent(input.calendarEmail)}/events`);
    url.searchParams.set('sendUpdates', 'all');
    if (input.addConferencing) url.searchParams.set('conferenceDataVersion', '1');

    const response = await requestJson<EventResponse>(url.toString(), {
      integration: INTEGRATION,
      method: 'POST',
      headers: { authorization: `Bearer ${await this.token()}` },
      // Event creation is never retried automatically: a retry after an
      // ambiguous timeout is how a prospect gets two invitations.
      retry: NO_RETRY,
      body: {
        summary: input.title,
        description: input.description,
        start: { dateTime: input.start.toISOString(), timeZone: input.timeZone },
        end: { dateTime: input.end.toISOString(), timeZone: input.timeZone },
        attendees: [{ email: input.attendeeEmail }],
        ...(input.addConferencing
          ? {
              conferenceData: {
                createRequest: {
                  requestId: input.requestId,
                  conferenceSolutionKey: { type: 'hangoutsMeet' },
                },
              },
            }
          : {}),
      },
    });

    return {
      providerEventId: response.id,
      eventWebUrl: response.htmlLink ?? null,
      conferenceUrl:
        response.hangoutLink ?? response.conferenceData?.entryPoints?.[0]?.uri ?? null,
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
        ? { connected: true, detail: 'Google Calendar responded to a free/busy probe.' }
        : { connected: false, detail: probe.error };
    } catch (error) {
      return { connected: false, detail: describeError(error) };
    }
  }
}

function describeError(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}
