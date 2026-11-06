/**
 * lib/session.ts, the signed session cookie (HS256 JWT via jose). Edge safe, so
 * middleware.ts can verify it without the database. App code uses lib/auth.ts.
 */
import { SignJWT, jwtVerify } from 'jose';

export const SESSION_COOKIE = 'astra_session';
export const SESSION_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export type SessionPayload = {
  sub: string; // user id
  email: string;
  name: string;
  role: 'admin' | 'sales' | 'account_manager';
};

function secretKey(): Uint8Array {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 32) {
    if (process.env.NODE_ENV === 'production') throw new Error('SESSION_SECRET must be set, at least 32 characters');
    return new TextEncoder().encode('astra-crm-local-dev-secret-not-for-production-use');
  }
  return new TextEncoder().encode(secret);
}

export async function signSession(payload: SessionPayload): Promise<string> {
  return new SignJWT({ email: payload.email, name: payload.name, role: payload.role })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(payload.sub)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE}s`)
    .sign(secretKey());
}

export async function verifySession(token: string | undefined | null): Promise<SessionPayload | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secretKey(), { algorithms: ['HS256'] });
    if (!payload.sub) return null;
    return {
      sub: payload.sub,
      email: String(payload.email ?? ''),
      name: String(payload.name ?? ''),
      role: payload.role as SessionPayload['role'],
    };
  } catch {
    return null;
  }
}
