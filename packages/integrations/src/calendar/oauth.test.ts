import { describe, expect, it } from 'vitest';
import { buildAuthorizationUrl, createOAuthState, verifyOAuthState } from './oauth.js';

const SECRET = 'a-session-secret-long-enough-to-sign-with';
const ACCOUNT = 'raka@astra.agency';

describe('OAuth state', () => {
  it('round-trips a state it signed itself', () => {
    const parsed = verifyOAuthState(createOAuthState(SECRET, ACCOUNT), SECRET);
    expect(parsed?.accountEmail).toBe(ACCOUNT);
  });

  it('rejects a state signed with a different secret', () => {
    // This is the attack that matters: without it, a crafted callback could
    // attach an attacker's calendar to the operator's account.
    const forged = createOAuthState('a-completely-different-secret', ACCOUNT);
    expect(verifyOAuthState(forged, SECRET)).toBeNull();
  });

  it('rejects a tampered account email', () => {
    const state = createOAuthState(SECRET, ACCOUNT);
    const [, signature] = state.split('.');
    const evil = Buffer.from(
      JSON.stringify({ nonce: 'x', accountEmail: 'attacker@example.test', at: Date.now() }),
    ).toString('base64url');
    expect(verifyOAuthState(`${evil}.${signature}`, SECRET)).toBeNull();
  });

  it('rejects a state older than the window', () => {
    const state = createOAuthState(SECRET, ACCOUNT);
    const elevenMinutes = Date.now() + 11 * 60 * 1000;
    expect(verifyOAuthState(state, SECRET, 10 * 60 * 1000, elevenMinutes)).toBeNull();
  });

  it('rejects a state timestamped in the future', () => {
    const state = createOAuthState(SECRET, ACCOUNT);
    const twoMinutesAgo = Date.now() - 2 * 60 * 1000;
    expect(verifyOAuthState(state, SECRET, 10 * 60 * 1000, twoMinutesAgo)).toBeNull();
  });

  it('rejects malformed states without throwing', () => {
    for (const state of ['', 'nodot', 'a.b.c', '..', 'Zm9v.Zm9v']) {
      expect(() => verifyOAuthState(state, SECRET)).not.toThrow();
      expect(verifyOAuthState(state, SECRET)).toBeNull();
    }
  });

  it('produces a different state every time', () => {
    expect(createOAuthState(SECRET, ACCOUNT)).not.toBe(createOAuthState(SECRET, ACCOUNT));
  });
});

describe('authorization URLs', () => {
  const base = {
    clientId: 'client-123',
    clientSecret: 'secret-456',
    redirectUri: 'https://astra.example/api/calendar/callback',
  };

  it('asks Google for offline access and forced consent', () => {
    // Without both of these Google issues no refresh token, and the
    // connection would silently die after an hour.
    const url = new URL(
      buildAuthorizationUrl({ ...base, provider: 'google' }, 'state-value'),
    );
    expect(url.origin + url.pathname).toBe('https://accounts.google.com/o/oauth2/v2/auth');
    expect(url.searchParams.get('access_type')).toBe('offline');
    expect(url.searchParams.get('prompt')).toBe('consent');
    expect(url.searchParams.get('state')).toBe('state-value');
    expect(url.searchParams.get('scope')).toContain('calendar.events');
  });

  it('asks Microsoft for offline_access', () => {
    const url = new URL(
      buildAuthorizationUrl(
        { ...base, provider: 'microsoft', tenantId: 'tenant-789' },
        'state-value',
      ),
    );
    expect(url.pathname).toContain('tenant-789');
    expect(url.searchParams.get('scope')).toContain('offline_access');
    expect(url.searchParams.get('state')).toBe('state-value');
  });

  it('never puts the client secret in the authorization URL', () => {
    for (const provider of ['google', 'microsoft'] as const) {
      const url = buildAuthorizationUrl({ ...base, provider, tenantId: 't' }, 'state');
      expect(url).not.toContain(base.clientSecret);
    }
  });
});
