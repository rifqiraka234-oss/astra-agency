import { NextResponse } from 'next/server';
import { buildAuthorizationUrl, createOAuthState } from '@astra/integrations';
import { config, currentSession } from '@/lib/auth';

/**
 * Starts the calendar consent flow.
 *
 * Authenticated, because this is the step that decides *whose* calendar the
 * agent will read. The `state` parameter is signed with SESSION_SECRET so a
 * crafted callback cannot attach a different calendar to this account.
 */
export async function GET(): Promise<NextResponse> {
  if (!(await currentSession())) {
    return NextResponse.redirect(new URL('/login', config().APP_BASE_URL));
  }

  const settings = config();
  if (settings.CALENDAR_PROVIDER === 'none') {
    return NextResponse.json(
      { error: 'CALENDAR_PROVIDER is none; set it to google or microsoft first' },
      { status: 400 },
    );
  }
  if (!settings.CALENDAR_ACCOUNT_EMAIL) {
    return NextResponse.json({ error: 'CALENDAR_ACCOUNT_EMAIL is not set' }, { status: 400 });
  }

  const state = createOAuthState(settings.SESSION_SECRET, settings.CALENDAR_ACCOUNT_EMAIL);
  const url = buildAuthorizationUrl(
    {
      provider: settings.CALENDAR_PROVIDER,
      clientId:
        settings.CALENDAR_PROVIDER === 'google'
          ? settings.GOOGLE_CLIENT_ID
          : settings.MICROSOFT_CLIENT_ID,
      clientSecret:
        settings.CALENDAR_PROVIDER === 'google'
          ? settings.GOOGLE_CLIENT_SECRET
          : settings.MICROSOFT_CLIENT_SECRET,
      tenantId: settings.MICROSOFT_TENANT_ID || undefined,
      redirectUri: `${settings.APP_BASE_URL}/api/calendar/callback`,
    },
    state,
  );

  return NextResponse.redirect(url);
}
