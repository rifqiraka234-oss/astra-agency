import type { ReactNode } from 'react';
import Link from 'next/link';
import { config, currentSession } from '@/lib/auth';
import './globals.css';

export const metadata = {
  title: 'Astra reply agent',
  description: 'Private operator dashboard',
};

// Nothing here may be cached: the whole point is to show current state.
export const dynamic = 'force-dynamic';

export default async function RootLayout({ children }: { children: ReactNode }) {
  const session = await currentSession();
  const settings = config();

  return (
    <html lang="en">
      <body>
        {session ? (
          <>
            {/* The kill switch is visible on every page, not buried in
                settings, so its state is never a surprise during an incident. */}
            <KillSwitchBanner
              killSwitchOn={settings.isKillSwitchOn}
              mode={settings.RUNTIME_MODE}
              liveSend={settings.ALLOW_LIVE_LEMLIST_SEND}
            />
            <header className="topbar">
              <strong>Astra reply agent</strong>
              <nav>
                <Link href="/queue">Queue</Link>
                <Link href="/errors">Errors</Link>
                <Link href="/settings">Settings</Link>
                <Link href="/audit">Audit</Link>
              </nav>
              <span className="operator">{session.email}</span>
            </header>
          </>
        ) : null}
        <main>{children}</main>
      </body>
    </html>
  );
}

function KillSwitchBanner({
  killSwitchOn,
  mode,
  liveSend,
}: {
  killSwitchOn: boolean;
  mode: string;
  liveSend: boolean;
}) {
  const sending = !killSwitchOn && mode === 'LOW_RISK_AUTO' && liveSend;
  return (
    <div className={killSwitchOn ? 'banner banner-safe' : sending ? 'banner banner-live' : 'banner banner-quiet'}>
      {killSwitchOn ? (
        <>
          <strong>Kill switch ON.</strong> Every external write is blocked. Mode: {mode}.
        </>
      ) : sending ? (
        <>
          <strong>Live sending is ON.</strong> Mode: {mode}. Allowlisted low-risk messages can go
          out automatically.
        </>
      ) : (
        <>
          <strong>No sending.</strong> Mode: {mode}. Nothing reaches a prospect automatically.
        </>
      )}
    </div>
  );
}
