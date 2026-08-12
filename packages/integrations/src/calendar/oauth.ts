import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto';
import { requestForm } from '../http.js';
import { GOOGLE_CALENDAR_SCOPES } from './google.js';
import { MICROSOFT_CALENDAR_SCOPES } from './microsoft.js';

/**
 * Delegated OAuth for the calendar providers.
 *
 * Two things here are load-bearing:
 *
 *  - The `state` parameter is signed, not just random. An attacker who can get
 *    the operator to follow a crafted callback URL could otherwise connect
 *    *their* calendar to the operator's account, which would leak every slot
 *    the agent later proposes.
 *  - Consent is requested with `prompt=consent` / `access_type=offline` so a
 *    refresh token is actually issued. Without it the connection silently
 *    works for an hour and then stops, which is the worst possible failure
 *    shape for a scheduling system.
 */

export type CalendarOAuthProvider = 'google' | 'microsoft';

export interface OAuthConfig {
  readonly provider: CalendarOAuthProvider;
  readonly clientId: string;
  readonly clientSecret: string;
  /** Microsoft only. */
  readonly tenantId?: string;
  readonly redirectUri: string;
}

// --- signed state ------------------------------------------------------------

export function createOAuthState(secret: string, accountEmail: string): string {
  const nonce = randomBytes(16).toString('base64url');
  const payload = Buffer.from(JSON.stringify({ nonce, accountEmail, at: Date.now() })).toString(
    'base64url',
  );
  return `${payload}.${signState(payload, secret)}`;
}

export interface ParsedOAuthState {
  readonly nonce: string;
  readonly accountEmail: string;
  readonly at: number;
}

/** Rejects a forged, tampered or stale state. Ten minutes is generous. */
export function verifyOAuthState(
  state: string,
  secret: string,
  maxAgeMs = 10 * 60 * 1000,
  now = Date.now(),
): ParsedOAuthState | null {
  const [payload, signature] = state.split('.');
  if (!payload || !signature) return null;

  const expected = signState(payload, secret);
  const provided = Buffer.from(signature);
  const computed = Buffer.from(expected);
  if (provided.length !== computed.length || !timingSafeEqual(provided, computed)) return null;

  try {
    const parsed = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as ParsedOAuthState;
    if (typeof parsed.at !== 'number' || now - parsed.at > maxAgeMs || now < parsed.at - 60_000) {
      return null;
    }
    if (typeof parsed.accountEmail !== 'string' || parsed.accountEmail.length === 0) return null;
    return parsed;
  } catch {
    return null;
  }
}

function signState(payload: string, secret: string): string {
  return createHmac('sha256', secret).update(payload).digest('base64url');
}

// --- authorization URL -------------------------------------------------------

export function buildAuthorizationUrl(config: OAuthConfig, state: string): string {
  if (config.provider === 'google') {
    const url = new URL('https://accounts.google.com/o/oauth2/v2/auth');
    url.searchParams.set('client_id', config.clientId);
    url.searchParams.set('redirect_uri', config.redirectUri);
    url.searchParams.set('response_type', 'code');
    url.searchParams.set('scope', GOOGLE_CALENDAR_SCOPES.join(' '));
    // Both are required for Google to return a refresh token at all.
    url.searchParams.set('access_type', 'offline');
    url.searchParams.set('prompt', 'consent');
    url.searchParams.set('state', state);
    return url.toString();
  }

  const tenant = config.tenantId ?? 'common';
  const url = new URL(`https://login.microsoftonline.com/${tenant}/oauth2/v2.0/authorize`);
  url.searchParams.set('client_id', config.clientId);
  url.searchParams.set('redirect_uri', config.redirectUri);
  url.searchParams.set('response_type', 'code');
  // offline_access is what makes Microsoft issue a refresh token.
  url.searchParams.set('scope', MICROSOFT_CALENDAR_SCOPES.join(' '));
  url.searchParams.set('response_mode', 'query');
  url.searchParams.set('state', state);
  return url.toString();
}

// --- code exchange -----------------------------------------------------------

interface TokenExchangeResponse {
  readonly access_token?: string;
  readonly refresh_token?: string;
  readonly expires_in?: number;
  readonly scope?: string;
}

export type ExchangeResult =
  | { readonly ok: true; readonly refreshToken: string; readonly scopes: readonly string[] }
  | { readonly ok: false; readonly error: string };

export async function exchangeCodeForRefreshToken(
  config: OAuthConfig,
  code: string,
): Promise<ExchangeResult> {
  const tokenUrl =
    config.provider === 'google'
      ? 'https://oauth2.googleapis.com/token'
      : `https://login.microsoftonline.com/${config.tenantId ?? 'common'}/oauth2/v2.0/token`;

  try {
    const response = await requestForm<TokenExchangeResponse>(tokenUrl, {
      integration: config.provider === 'google' ? 'google-calendar' : 'microsoft-calendar',
      form: new URLSearchParams({
        client_id: config.clientId,
        client_secret: config.clientSecret,
        code,
        grant_type: 'authorization_code',
        redirect_uri: config.redirectUri,
        ...(config.provider === 'microsoft'
          ? { scope: MICROSOFT_CALENDAR_SCOPES.join(' ') }
          : {}),
      }),
    });

    if (!response.refresh_token) {
      // Connecting without a refresh token would appear to work and then stop
      // an hour later, so it is treated as a failed connection.
      return {
        ok: false,
        error:
          'The provider did not return a refresh token. Revoke the existing consent and connect again so a fresh token is issued.',
      };
    }

    return {
      ok: true,
      refreshToken: response.refresh_token,
      scopes: response.scope?.split(' ') ?? [],
    };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : String(error) };
  }
}
