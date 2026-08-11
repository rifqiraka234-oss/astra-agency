import pg from 'pg';

/**
 * Postgres access.
 *
 * Two things here matter beyond ordinary pooling:
 *
 *  - `withTransaction` is the boundary every state change runs inside, so an
 *    illegal transition or a failed policy check rolls back before any
 *    integration is called.
 *  - `withContactLock` takes a session-level advisory lock keyed by contact,
 *    which is what stops two workers analyzing or sending for the same
 *    conversation at the same time.
 */

const { Pool } = pg;

export type Sql = pg.Pool | pg.PoolClient;

let pool: pg.Pool | undefined;

export function getPool(connectionString?: string): pg.Pool {
  if (!pool) {
    pool = new Pool({
      connectionString: connectionString ?? process.env['DATABASE_URL'],
      max: Number(process.env['DATABASE_POOL_MAX'] ?? 10),
      idleTimeoutMillis: 30_000,
      connectionTimeoutMillis: 10_000,
      application_name: 'astra-reply-agent',
    });
    pool.on('error', (error) => {
      // An idle client error must not take the process down; the pool replaces
      // the client and the next query reconnects.
      console.error(JSON.stringify({ level: 'error', msg: 'idle postgres client error', error: error.message }));
    });
  }
  return pool;
}

export async function closePool(): Promise<void> {
  if (pool) {
    await pool.end();
    pool = undefined;
  }
}

export async function withTransaction<T>(
  run: (client: pg.PoolClient) => Promise<T>,
  existing?: pg.PoolClient,
): Promise<T> {
  if (existing) return run(existing);

  const client = await getPool().connect();
  try {
    await client.query('BEGIN');
    const result = await run(client);
    await client.query('COMMIT');
    return result;
  } catch (error) {
    try {
      await client.query('ROLLBACK');
    } catch {
      // Rollback failure is reported through the original error, which is the
      // one that actually explains what went wrong.
    }
    throw error;
  } finally {
    client.release();
  }
}

/** Stable 64-bit lock key derived from a contact id. */
export function advisoryLockKey(contactId: string): bigint {
  let hash = 0xcbf29ce484222325n;
  for (const byte of Buffer.from(contactId, 'utf8')) {
    hash ^= BigInt(byte);
    hash = BigInt.asUintN(64, hash * 0x100000001b3n);
  }
  // Postgres advisory locks take a signed 64 bit integer.
  return BigInt.asIntN(64, hash);
}

export interface ContactLock {
  readonly acquired: boolean;
}

/**
 * Run `work` while holding an exclusive advisory lock for the contact. When
 * the lock is already held elsewhere the callback is not run at all and
 * `acquired` is false: the caller reschedules instead of racing.
 */
export async function withContactLock<T>(
  contactId: string,
  work: (client: pg.PoolClient) => Promise<T>,
): Promise<{ acquired: false } | { acquired: true; result: T }> {
  const client = await getPool().connect();
  const key = advisoryLockKey(contactId).toString();
  try {
    const locked = await client.query<{ pg_try_advisory_lock: boolean }>(
      'SELECT pg_try_advisory_lock($1::bigint)',
      [key],
    );
    if (locked.rows[0]?.pg_try_advisory_lock !== true) {
      return { acquired: false };
    }
    try {
      return { acquired: true, result: await work(client) };
    } finally {
      await client.query('SELECT pg_advisory_unlock($1::bigint)', [key]);
    }
  } finally {
    client.release();
  }
}

export async function query<T extends pg.QueryResultRow = pg.QueryResultRow>(
  sql: Sql,
  text: string,
  params: readonly unknown[] = [],
): Promise<T[]> {
  const result = await sql.query<T>(text, params as unknown[]);
  return result.rows;
}

export async function queryOne<T extends pg.QueryResultRow = pg.QueryResultRow>(
  sql: Sql,
  text: string,
  params: readonly unknown[] = [],
): Promise<T | null> {
  const rows = await query<T>(sql, text, params);
  return rows[0] ?? null;
}
