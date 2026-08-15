import { existsSync, readFileSync } from 'node:fs';
import { dirname, join, parse } from 'node:path';

/**
 * Loads `.env` into `process.env`.
 *
 * Next.js does this for the dashboard on its own, but the worker and the
 * database CLIs do not, so every documented command failed in a fresh shell
 * with a connection refused or a config validation error. The fix is to load
 * the file explicitly at each entry point.
 *
 * A variable already present in the environment always wins. That keeps
 * `DATABASE_URL=... npm run db:migrate` working for tests and CI, where the
 * inline value must override whatever the checked-out `.env` happens to say.
 */

export interface LoadEnvResult {
  readonly path: string | null;
  readonly loaded: readonly string[];
  readonly skipped: readonly string[];
}

/** Walks up from `startDir` looking for the first `.env`. */
export function findEnvFile(startDir: string = process.cwd()): string | null {
  const { root } = parse(startDir);
  let current = startDir;

  for (;;) {
    const candidate = join(current, '.env');
    if (existsSync(candidate)) return candidate;
    if (current === root) return null;
    const parent = dirname(current);
    if (parent === current) return null;
    current = parent;
  }
}

/**
 * Minimal parser: `KEY=value`, `#` comments, optional surrounding quotes.
 * Deliberately does not do variable expansion — the operator password hash
 * contains characters an expanding loader would mangle.
 */
export function parseEnv(contents: string): Map<string, string> {
  const values = new Map<string, string>();

  for (const rawLine of contents.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (line.length === 0 || line.startsWith('#')) continue;

    const separator = line.indexOf('=');
    if (separator <= 0) continue;

    const key = line.slice(0, separator).trim();
    if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(key)) continue;

    let value = line.slice(separator + 1).trim();
    const quote = value[0];
    if ((quote === '"' || quote === "'") && value.endsWith(quote) && value.length >= 2) {
      value = value.slice(1, -1);
    }
    values.set(key, value);
  }

  return values;
}

export function loadEnvFile(startDir: string = process.cwd()): LoadEnvResult {
  const path = findEnvFile(startDir);
  if (path === null) return { path: null, loaded: [], skipped: [] };

  const loaded: string[] = [];
  const skipped: string[] = [];

  for (const [key, value] of parseEnv(readFileSync(path, 'utf8'))) {
    if (process.env[key] !== undefined) {
      skipped.push(key);
      continue;
    }
    process.env[key] = value;
    loaded.push(key);
  }

  return { path, loaded, skipped };
}
