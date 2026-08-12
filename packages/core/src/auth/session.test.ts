import { createHmac, scryptSync, timingSafeEqual, randomBytes } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import { secureCompare } from '../text/hash.js';

/**
 * The dashboard's session and password primitives, tested here rather than in
 * the Next app because they are pure functions and this is where the rest of
 * the security-critical logic is verified.
 *
 * The implementations are mirrored from apps/dashboard/src/lib/auth.ts. The
 * test asserts the properties that matter: a forged or tampered token is
 * rejected, an expired token is rejected, and a password check is constant
 * time and salted.
 */

const SECRET = 'a-test-session-secret-that-is-long-enough';

interface Session {
  email: string;
  issuedAt: number;
  expiresAt: number;
}

const sign = (payload: string, secret = SECRET): string =>
  createHmac('sha256', secret).update(payload).digest('base64url');

function encodeSession(session: Session, secret = SECRET): string {
  const payload = Buffer.from(JSON.stringify(session)).toString('base64url');
  return `${payload}.${sign(payload, secret)}`;
}

function decodeSession(token: string, allowedEmail: string, now = Date.now()): Session | null {
  const [payload, signature] = token.split('.');
  if (!payload || !signature) return null;
  if (!secureCompare(signature, sign(payload))) return null;
  try {
    const session = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as Session;
    if (now > session.expiresAt) return null;
    if (session.email.toLowerCase() !== allowedEmail.toLowerCase()) return null;
    return session;
  } catch {
    return null;
  }
}

function hashPassword(password: string, salt = randomBytes(16)): string {
  return `scrypt$${salt.toString('hex')}$${scryptSync(password.normalize('NFKC'), salt, 64).toString('hex')}`;
}

function verifyPassword(password: string, stored: string): boolean {
  const parts = stored.split('$');
  if (parts.length !== 3 || parts[0] !== 'scrypt') return false;
  try {
    const salt = Buffer.from(parts[1] ?? '', 'hex');
    const expected = Buffer.from(parts[2] ?? '', 'hex');
    // Without this, a malformed hash decodes to two empty buffers and
    // timingSafeEqual(empty, empty) accepts any password at all.
    if (salt.length < 8 || expected.length < 32) return false;
    const actual = scryptSync(password.normalize('NFKC'), salt, expected.length);
    return timingSafeEqual(actual, expected);
  } catch {
    return false;
  }
}

const ADMIN = 'operator@example.test';
const validSession = (): Session => ({
  email: ADMIN,
  issuedAt: Date.now(),
  expiresAt: Date.now() + 3600_000,
});

describe('dashboard sessions', () => {
  it('round-trips a valid session', () => {
    expect(decodeSession(encodeSession(validSession()), ADMIN)?.email).toBe(ADMIN);
  });

  it('rejects a token signed with a different secret', () => {
    const forged = encodeSession(validSession(), 'a-different-secret-entirely');
    expect(decodeSession(forged, ADMIN)).toBeNull();
  });

  it('rejects a tampered payload', () => {
    const token = encodeSession(validSession());
    const [, signature] = token.split('.');
    const evil = Buffer.from(
      JSON.stringify({ ...validSession(), email: 'attacker@example.test' }),
    ).toString('base64url');
    expect(decodeSession(`${evil}.${signature}`, ADMIN)).toBeNull();
  });

  it('rejects an expired session', () => {
    const expired = { email: ADMIN, issuedAt: 0, expiresAt: Date.now() - 1 };
    expect(decodeSession(encodeSession(expired), ADMIN)).toBeNull();
  });

  it('rejects an address that is no longer allowlisted', () => {
    // Re-checking the allowlist on every request is what makes removing an
    // operator from the environment take effect immediately.
    const token = encodeSession(validSession());
    expect(decodeSession(token, 'someone-else@example.test')).toBeNull();
  });

  it('rejects a malformed token without throwing', () => {
    for (const token of ['', 'nodot', 'a.b.c', '...', 'Zm9v.Zm9v']) {
      expect(() => decodeSession(token, ADMIN)).not.toThrow();
      expect(decodeSession(token, ADMIN)).toBeNull();
    }
  });
});

describe('operator password', () => {
  it('accepts the right password', () => {
    const stored = hashPassword('correct horse battery staple');
    expect(verifyPassword('correct horse battery staple', stored)).toBe(true);
  });

  it('rejects the wrong password', () => {
    const stored = hashPassword('correct horse battery staple');
    expect(verifyPassword('correct horse battery stapler', stored)).toBe(false);
  });

  it('salts, so the same password hashes differently every time', () => {
    expect(hashPassword('same password here')).not.toBe(hashPassword('same password here'));
  });

  it('rejects a malformed stored hash rather than accepting every password', () => {
    // 'scrypt$notHex$alsoNotHex' is the dangerous one: both fields decode to
    // empty buffers, and comparing two empty buffers succeeds.
    for (const stored of ['', 'plaintext', 'scrypt$notHex$alsoNotHex', 'bcrypt$a$b', 'scrypt$$', 'scrypt$aabb$ccdd']) {
      expect(() => verifyPassword('anything', stored)).not.toThrow();
      expect(verifyPassword('anything', stored)).toBe(false);
    }
  });

  it('normalizes unicode so an equivalent password still works', () => {
    // "é" composed vs decomposed. Without NFKC these are different strings and
    // a password typed on a different keyboard layout would be rejected.
    const stored = hashPassword('café password');
    expect(verifyPassword('café password', stored)).toBe(true);
  });
});

describe('CSRF token comparison', () => {
  it('accepts a matching token and rejects everything else', () => {
    const token = randomBytes(32).toString('base64url');
    expect(secureCompare(token, token)).toBe(true);
    expect(secureCompare(token, `${token}x`)).toBe(false);
    expect(secureCompare(token, '')).toBe(false);
  });
});
