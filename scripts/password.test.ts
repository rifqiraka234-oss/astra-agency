import { describe, expect, it } from 'vitest';
import { scryptSync, timingSafeEqual } from 'node:crypto';
import { hashPassword, MIN_PASSWORD_LENGTH } from './lib/password.mjs';

/**
 * The setup script generates the password hash in plain JavaScript, and the
 * dashboard verifies it in TypeScript. Two implementations of one format is
 * exactly how a "correct password rejected" bug ships, so this pins them
 * together: the assertions below are the dashboard's `verifyPassword` logic,
 * applied to what the setup script actually produces.
 */

/** Copied deliberately from apps/dashboard/src/lib/auth.ts. */
const MIN_SALT_BYTES = 8;
const MIN_HASH_BYTES = 32;

function verifyPassword(password: string, stored: string): boolean {
  const parts = stored.split(':');
  if (parts.length !== 3 || parts[0] !== 'scrypt') return false;
  try {
    const salt = Buffer.from(parts[1] ?? '', 'hex');
    const expected = Buffer.from(parts[2] ?? '', 'hex');
    if (salt.length < MIN_SALT_BYTES || expected.length < MIN_HASH_BYTES) return false;
    const actual = scryptSync(password.normalize('NFKC'), salt, expected.length);
    return timingSafeEqual(actual, expected);
  } catch {
    return false;
  }
}

describe('setup password hash', () => {
  it('produces a hash the dashboard accepts', () => {
    const hash = hashPassword('correct horse battery staple');

    expect(verifyPassword('correct horse battery staple', hash)).toBe(true);
  });

  it('rejects the wrong password', () => {
    const hash = hashPassword('correct horse battery staple');

    expect(verifyPassword('Correct horse battery staple', hash)).toBe(false);
    expect(verifyPassword('', hash)).toBe(false);
  });

  it('uses the colon separator that survives dotenv-expand', () => {
    const hash = hashPassword('correct horse battery staple');

    // A `$` anywhere in the value would be read as a variable reference when
    // Next.js loads .env, and the hash would arrive mangled.
    expect(hash).not.toContain('$');
    expect(hash.split(':')).toHaveLength(3);
    expect(hash.startsWith('scrypt:')).toBe(true);
  });

  it('salts every hash, so the same password never yields the same line', () => {
    expect(hashPassword('correct horse battery staple')).not.toBe(
      hashPassword('correct horse battery staple'),
    );
  });

  it('produces a salt and digest long enough to clear the dashboard guard', () => {
    const [, salt, digest] = hashPassword('correct horse battery staple').split(':');

    expect(Buffer.from(salt ?? '', 'hex').length).toBeGreaterThanOrEqual(MIN_SALT_BYTES);
    expect(Buffer.from(digest ?? '', 'hex').length).toBeGreaterThanOrEqual(MIN_HASH_BYTES);
  });

  it('normalizes unicode, so a password typed on another keyboard still matches', () => {
    // The same string in NFD and NFC form must verify against one another.
    const nfc = 'café-password-123';
    const nfd = 'café-password-123';

    expect(verifyPassword(nfd, hashPassword(nfc))).toBe(true);
  });

  it('agrees with the dashboard on the minimum length', () => {
    expect(MIN_PASSWORD_LENGTH).toBe(12);
  });
});
