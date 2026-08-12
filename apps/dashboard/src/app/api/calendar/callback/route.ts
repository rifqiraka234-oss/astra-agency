import { NextResponse } from 'next/server';
import { exchangeCodeForRefreshToken, verifyOAuthState } from '@astra/integrations';
import { getPool, markConnectionStatus, saveIntegrationCredentials, recordAudit } from '@astra/db';
import { config, currentSession } from '@/lib/auth';

/**
 * Completes the calendar consent flow.
 *
 * The signed state is verified before the code is exchanged, so a callback
 * the operator was tricked into following cannot connect someone else's
 * calendar. The refresh token is encrypted before it reaches Postgres and is
 * never logged or echoed back to the browser.
 */
export async function GET(request: Request): Promise<NextResponse> {
  const settings = config();
  const dashboard = new URL('/settings', settings.APP_BASE_URL);

  if (!(await currentSession())) {
    return NextResponse.redirect(new URL('/login', settings.APP_BASE_URL));
  }

  const params = new URL(request.url).searchParams;
  const error = params.get('error');
  if (error) {
    dashboard.searchParams.set('calendar', `denied:${error}`);
    return NextResponse.redirect(dashboard);
  }

  const code = params.get('code');
  const state = params.get('state');
  if (!code || !state) {
    dashboard.searchParams.set('calendar', 'missing-code');
    return NextResponse.redirect(dashboard);
  }

  const parsedState = verifyOAuthState(state, settings.SESSION_SECRET);
  if (!parsedState || parsedState.accountEmail !== settings.CALENDAR_ACCOUNT_EMAIL) {
    await recordAudit(getPool(), {
      actor: 'dashboard',
      action: 'CALENDAR_OAUTH_STATE_REJECTED',
      reasonCode: 'CSRF',
    });
    dashboard.searchParams.set('calendar', 'bad-state');
    return NextResponse.redirect(dashboard);
  }

  const provider = settings.CALENDAR_PROVIDER === 'google' ? 'google' : 'microsoft';
  const result = await exchangeCodeForRefreshToken(
    {
      provider,
      clientId: provider === 'google' ? settings.GOOGLE_CLIENT_ID : settings.MICROSOFT_CLIENT_ID,
      clientSecret:
        provider === 'google' ? settings.GOOGLE_CLIENT_SECRET : settings.MICROSOFT_CLIENT_SECRET,
      tenantId: settings.MICROSOFT_TENANT_ID || undefined,
      redirectUri: `${settings.APP_BASE_URL}/api/calendar/callback`,
    },
    code,
  );

  const providerKey = provider === 'google' ? 'GOOGLE_CALENDAR' : 'MICROSOFT_CALENDAR';

  if (!result.ok) {
    await markConnectionStatus(getPool(), providerKey, settings.CALENDAR_ACCOUNT_EMAIL, {
      status: 'ERROR',
      error: result.error,
    });
    dashboard.searchParams.set('calendar', 'exchange-failed');
    return NextResponse.redirect(dashboard);
  }

  await saveIntegrationCredentials(getPool(), {
    provider: providerKey,
    accountIdentifier: settings.CALENDAR_ACCOUNT_EMAIL,
    credentials: { refreshToken: result.refreshToken },
    scopes: result.scopes,
  });

  await recordAudit(getPool(), {
    actor: 'dashboard',
    action: 'CALENDAR_CONNECTED',
    // Scopes are recorded; the token is not, and never leaves the encrypted column.
    payload: { provider: providerKey, scopes: result.scopes },
  });

  dashboard.searchParams.set('calendar', 'connected');
  return NextResponse.redirect(dashboard);
}
