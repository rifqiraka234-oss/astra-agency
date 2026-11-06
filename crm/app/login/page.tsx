import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { LoginForm } from './LoginForm';

export const metadata: Metadata = { title: 'Sign in' };

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  if (await getCurrentUser()) redirect('/');
  const { next } = await searchParams;
  const sample = process.env.SAMPLE_DATA === 'true';
  return (
    <main className="login">
      <div className="login-card">
        <div className="row" style={{ gap: 10 }}>
          <div className="brand-mark" aria-hidden="true">
            A
          </div>
          <div style={{ fontWeight: 600, fontSize: 16, letterSpacing: '-0.01em' }}>Astra CRM</div>
        </div>
        <div className="stack-sm" style={{ gap: 4 }}>
          <h1 className="page-title" style={{ fontSize: 24 }}>
            Sign in
          </h1>
          <p className="muted text-13" style={{ margin: 0 }}>
            For Raka, Josh and Luna. Ask Raka for an account.
          </p>
        </div>
        <LoginForm next={next} />
        {sample ? (
          <p className="small muted" style={{ margin: 0 }}>
            <span className="sample-badge">Sample data</span> Local accounts are printed by npm run db:seed.
          </p>
        ) : null}
      </div>
    </main>
  );
}
