import { redirect } from 'next/navigation';
import {
  checkLoginRateLimit,
  clientKey,
  config,
  createSession,
  currentSession,
  resetLoginRateLimit,
  verifyPassword,
} from '@/lib/auth';

export const dynamic = 'force-dynamic';

/**
 * Login.
 *
 * One operator, one allowlisted address, a scrypt-hashed password and a
 * throttle. No password reset flow and no email link: an emailed URL must
 * never be sufficient to act, and the simplest way to guarantee that is for
 * email to play no part in authentication at all.
 */
export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (await currentSession()) redirect('/queue');

  const params = await searchParams;
  const settings = config();
  const passwordHash = process.env['OPERATOR_PASSWORD_HASH'] ?? '';

  async function signIn(formData: FormData): Promise<void> {
    'use server';

    const key = await clientKey();
    if (!checkLoginRateLimit(key)) {
      redirect('/login?error=throttled');
    }

    const email = String(formData.get('email') ?? '').trim();
    const password = String(formData.get('password') ?? '');
    const hash = process.env['OPERATOR_PASSWORD_HASH'] ?? '';

    // Both checks always run, so a wrong address and a wrong password fail
    // the same way and take the same time.
    const emailOk = email.toLowerCase() === config().ADMIN_EMAIL.toLowerCase();
    const passwordOk = hash.length > 0 && verifyPassword(password, hash);

    if (!emailOk || !passwordOk) {
      redirect('/login?error=invalid');
    }

    resetLoginRateLimit(key);
    await createSession(config().ADMIN_EMAIL);
    redirect('/queue');
  }

  return (
    <div className="login panel">
      <h1 style={{ fontSize: 18, marginTop: 0 }}>Astra reply agent</h1>
      <p className="muted">Private operator dashboard. Access is limited to one allowlisted address.</p>

      {passwordHash.length === 0 ? (
        <p className="error">
          OPERATOR_PASSWORD_HASH is not set, so nobody can sign in. Generate one with{' '}
          <code className="mono">npm run dashboard:hash-password</code> and put it in .env.
        </p>
      ) : null}

      {params.error === 'invalid' ? (
        <p className="error">That address and password combination was not accepted.</p>
      ) : null}
      {params.error === 'throttled' ? (
        <p className="error">Too many attempts. Wait fifteen minutes and try again.</p>
      ) : null}

      <form action={signIn}>
        <p>
          <label htmlFor="email" className="muted">
            Email
          </label>
          <br />
          <input id="email" name="email" type="email" autoComplete="username" required style={{ width: '100%' }} />
        </p>
        <p>
          <label htmlFor="password" className="muted">
            Password
          </label>
          <br />
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            style={{ width: '100%' }}
          />
        </p>
        <button className="primary" type="submit" disabled={passwordHash.length === 0}>
          Sign in
        </button>
      </form>

      <p className="muted" style={{ marginTop: 18 }}>
        Mode: {settings.RUNTIME_MODE}. Kill switch: {settings.isKillSwitchOn ? 'on' : 'off'}.
      </p>
    </div>
  );
}
