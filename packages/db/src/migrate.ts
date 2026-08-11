import { readdir, readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import type pg from 'pg';
import { getPool, withTransaction } from './client.js';

/**
 * Migrations are plain SQL files applied in filename order inside a
 * transaction, recorded in `schema_migrations`. Deliberately small: a
 * migration framework is another dependency between the operator and a
 * working database at 2am.
 */

const MIGRATIONS_DIR = join(dirname(fileURLToPath(import.meta.url)), '..', 'migrations');

export interface MigrationResult {
  readonly applied: readonly string[];
  readonly alreadyApplied: readonly string[];
}

export async function migrate(migrationsDir = MIGRATIONS_DIR): Promise<MigrationResult> {
  const pool = getPool();
  await pool.query(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      name        text PRIMARY KEY,
      applied_at  timestamptz NOT NULL DEFAULT now()
    )
  `);

  const files = (await readdir(migrationsDir))
    .filter((name) => name.endsWith('.sql'))
    .sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));

  const existing = await pool.query<{ name: string }>('SELECT name FROM schema_migrations');
  const applied = new Set(existing.rows.map((row) => row.name));

  const newlyApplied: string[] = [];
  for (const file of files) {
    if (applied.has(file)) continue;
    const sql = await readFile(join(migrationsDir, file), 'utf8');
    await withTransaction(async (client: pg.PoolClient) => {
      await client.query(sql);
      await client.query('INSERT INTO schema_migrations (name) VALUES ($1)', [file]);
    });
    newlyApplied.push(file);
  }

  return {
    applied: newlyApplied,
    alreadyApplied: files.filter((file) => applied.has(file)),
  };
}
