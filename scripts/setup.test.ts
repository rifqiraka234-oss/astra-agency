import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, copyFileSync, writeFileSync } from 'node:fs';
import { scryptSync, timingSafeEqual } from 'node:crypto';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { loadEnvFile, parseEnv } from '@astra/core';

/**
 * Exercises the actual setup script end to end.
 *
 * The previous setup path was documented but never executed as written: it
 * assumed `openssl` and a bash shell, and none of the entry points loaded
 * `.env` at all, so every command failed on a fresh machine. These tests run
 * the real script and then assert the file it produces is one the application
 * can genuinely boot from.
 */

const repoRoot = join(import.meta.dirname, '..');

let workDir: string;

beforeEach(() => {
  workDir = mkdtempSync(join(tmpdir(), 'astra-setup-'));
});

afterEach(() => {
  rmSync(workDir, { recursive: true, force: true });
});

/** Runs setup.mjs against an isolated copy of the repo's .env.example. */
function runSetup(answers: string, existingEnv?: string): string {
  copyFileSync(join(repoRoot, '.env.example'), join(workDir, '.env.example'));
  if (existingEnv !== undefined) writeFileSync(join(workDir, '.env'), existingEnv);

  // The script resolves paths from its own location, so it is copied next to
  // the fixture rather than being pointed at it.
  const scriptDir = join(workDir, 'scripts');
  execFileSync('cp', ['-r', join(repoRoot, 'scripts'), scriptDir]);

  execFileSync('node', [join(scriptDir, 'setup.mjs')], {
    input: answers,
    encoding: 'utf8',
    stdio: ['pipe', 'pipe', 'pipe'],
  });

  return readFileSync(join(workDir, '.env'), 'utf8');
}

/** The dashboard's own verification logic, from apps/dashboard/src/lib/auth.ts. */
function verifyPassword(password: string, stored: string): boolean {
  const parts = stored.split(':');
  if (parts.length !== 3 || parts[0] !== 'scrypt') return false;
  const salt = Buffer.from(parts[1] ?? '', 'hex');
  const expected = Buffer.from(parts[2] ?? '', 'hex');
  if (salt.length < 8 || expected.length < 32) return false;
  return timingSafeEqual(scryptSync(password.normalize('NFKC'), salt, expected.length), expected);
}

describe('npm run setup', () => {
  it('produces an .env whose password actually authenticates', () => {
    const env = parseEnv(runSetup('raka@example.com\nmysecretpassword123\n'));

    expect(env.get('ADMIN_EMAIL')).toBe('raka@example.com');
    expect(verifyPassword('mysecretpassword123', env.get('OPERATOR_PASSWORD_HASH') ?? '')).toBe(
      true,
    );
    expect(verifyPassword('wrong-password', env.get('OPERATOR_PASSWORD_HASH') ?? '')).toBe(false);
  });

  it('fills every value the config schema requires to start', () => {
    const env = parseEnv(runSetup('raka@example.com\nmysecretpassword123\n'));

    for (const key of [
      'ENCRYPTION_KEY',
      'SESSION_SECRET',
      'ADMIN_EMAIL',
      'ENABLED_CAMPAIGN_IDS',
      'EXPECTED_LEMLIST_TEAM_ID',
      'LEMLIST_WEBHOOK_SECRET',
      'OPERATOR_PASSWORD_HASH',
      'DATABASE_URL',
    ]) {
      expect(env.get(key), `${key} should have a value`).toBeTruthy();
    }
  });

  it('generates a 32 byte base64 encryption key, as the schema demands', () => {
    const env = parseEnv(runSetup('raka@example.com\nmysecretpassword123\n'));

    expect(Buffer.from(env.get('ENCRYPTION_KEY') ?? '', 'base64')).toHaveLength(32);
    expect(Buffer.from(env.get('SESSION_SECRET') ?? '', 'base64').length).toBeGreaterThanOrEqual(32);
  });

  it('leaves every live-action gate closed', () => {
    const env = parseEnv(runSetup('raka@example.com\nmysecretpassword123\n'));

    expect(env.get('RUNTIME_MODE')).toBe('TEST');
    expect(env.get('GLOBAL_KILL_SWITCH')).toBe('true');
    for (const flag of [
      'ALLOW_LIVE_LEMLIST_SEND',
      'ALLOW_LIVE_CAMPAIGN_IMPORT',
      'ALLOW_LIVE_CALENDAR_WRITE',
      'ALLOW_LIVE_NETLIFY_DEPLOY',
      'ALLOW_LIVE_WEBHOOK_REGISTRATION',
    ]) {
      expect(env.get(flag), `${flag} must default closed`).toBe('false');
    }
  });

  it('never overwrites a value that is already set', () => {
    const existing = readFileSync(join(repoRoot, '.env.example'), 'utf8')
      .replace(/^ENCRYPTION_KEY=.*$/m, 'ENCRYPTION_KEY=keep-me-exactly-as-i-am')
      .replace(/^ADMIN_EMAIL=.*$/m, 'ADMIN_EMAIL=existing@example.com');

    // Only the password is still missing, so only the password is asked for.
    const env = parseEnv(runSetup('mysecretpassword123\n', existing));

    expect(env.get('ENCRYPTION_KEY')).toBe('keep-me-exactly-as-i-am');
    expect(env.get('ADMIN_EMAIL')).toBe('existing@example.com');
    expect(env.get('OPERATOR_PASSWORD_HASH')).toMatch(/^scrypt:/);
  });

  it('refuses a password under the minimum rather than accepting it', () => {
    // Five short answers exhausts the retry budget and exits non-zero.
    expect(() => runSetup('raka@example.com\n' + 'short\n'.repeat(6))).toThrow();
  });
});

describe('.env loading', () => {
  it('does not override a variable already in the environment', () => {
    writeFileSync(join(workDir, '.env'), 'ASTRA_DOTENV_PRECEDENCE=from-file\n');
    process.env['ASTRA_DOTENV_PRECEDENCE'] = 'from-shell';

    try {
      const result = loadEnvFile(workDir);

      expect(process.env['ASTRA_DOTENV_PRECEDENCE']).toBe('from-shell');
      expect(result.skipped).toContain('ASTRA_DOTENV_PRECEDENCE');
    } finally {
      delete process.env['ASTRA_DOTENV_PRECEDENCE'];
    }
  });

  it('loads a variable that is not already set', () => {
    writeFileSync(join(workDir, '.env'), 'ASTRA_DOTENV_NEW=from-file\n');

    try {
      loadEnvFile(workDir);

      expect(process.env['ASTRA_DOTENV_NEW']).toBe('from-file');
    } finally {
      delete process.env['ASTRA_DOTENV_NEW'];
    }
  });

  it('does not expand $ references, which would mangle the password hash', () => {
    const hash = 'scrypt:abc$def:0123456789';
    const parsed = parseEnv(`OPERATOR_PASSWORD_HASH=${hash}\n`);

    expect(parsed.get('OPERATOR_PASSWORD_HASH')).toBe(hash);
  });

  it('ignores comments and blank lines', () => {
    const parsed = parseEnv('# a comment\n\nA=1\n  # indented comment\nB=2\n');

    expect([...parsed.entries()]).toEqual([
      ['A', '1'],
      ['B', '2'],
    ]);
  });

  it('strips surrounding quotes', () => {
    const parsed = parseEnv('A="quoted"\nB=\'single\'\nC=bare\n');

    expect(parsed.get('A')).toBe('quoted');
    expect(parsed.get('B')).toBe('single');
    expect(parsed.get('C')).toBe('bare');
  });
});
