import { randomBytes, scryptSync } from 'node:crypto';

/**
 * The canonical operator password hash format.
 *
 * This is plain JavaScript with no build step on purpose: the setup path has
 * to work on a fresh checkout, on Windows, before anything is compiled. It
 * must stay byte-compatible with `verifyPassword` in
 * `apps/dashboard/src/lib/auth.ts`, and `scripts/password.test.ts` asserts
 * exactly that so the two cannot drift apart.
 *
 * The separator is a colon rather than `$`: Next.js loads .env through
 * dotenv-expand, which treats `$name` in a value as a variable reference and
 * silently substitutes it, so a `$`-delimited hash arrives mangled and nobody
 * can sign in.
 */
export function hashPassword(password, salt = randomBytes(16)) {
  const derived = scryptSync(password.normalize('NFKC'), salt, 64);
  return `scrypt:${salt.toString('hex')}:${derived.toString('hex')}`;
}

/** Matches the dashboard's own minimum. Shorter passwords are refused. */
export const MIN_PASSWORD_LENGTH = 12;
