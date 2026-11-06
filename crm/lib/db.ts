/**
 * lib/db.ts, the one database connection (postgres.js, no ORM).
 *
 * Usage
 *   import { sql, tx } from '@/lib/db';
 *
 *   // reads, anywhere on the server
 *   const rows = await sql<{ id: string; name: string }[]>`
 *     select id, name from organizations where deleted_at is null order by name`;
 *
 *   // writes, always in a transaction that carries the actor for the audit log
 *   const id = await tx(async (t) => {
 *     const [org] = await t`insert into organizations ${t({ name, owner_user_id: user.id })} returning id`;
 *     await emit(t, 'record.created', { type: 'organization', id: org.id });
 *     return org.id as string;
 *   }, { userId: user.id });
 *
 * Notes for feature agents
 *   * Column names come back snake_case, exactly as in the migrations.
 *   * numeric (money) comes back as a string. Never parseFloat money for maths,
 *     use the helpers in lib/format.ts. date columns come back as 'YYYY-MM-DD'
 *     strings, timestamptz as JS Date.
 *   * The session time zone is Europe/Amsterdam, so current_date and crm_today()
 *     are the Dutch day.
 *   * jsonb parameters go through t.json(value), or pass the object inside
 *     t({ ... }) helpers which serialise it.
 *   * Dynamic rows: `t\`insert into deals ${t(row)}\`` and `t\`update deals set ${t(row, cols)}\``
 *     want Record<string, any>; cast a Record<string, unknown> before passing it.
 *   * tx() runs set_config('app.user_id') and set_config('app.source') locally,
 *     the audit trigger reads both. Pass { userId } on every user write.
 */
import postgres from 'postgres';

export type Sql = postgres.Sql<{}>;
/** A transaction handle. Same API as `sql`. Every lib function that writes takes one. */
export type Tx = postgres.TransactionSql<{}>;
/** Either the pool or a transaction, for helpers that can run in both. */
export type Db = Sql | Tx;

const DEFAULT_LOCAL_URL = 'postgres://astra:astra@localhost:5432/astra_crm';

function databaseUrl(): string {
  const url = process.env.DATABASE_URL;
  if (url) return url;
  if (process.env.NODE_ENV === 'production') throw new Error('DATABASE_URL is not set');
  return DEFAULT_LOCAL_URL;
}

function create(): Sql {
  return postgres(databaseUrl(), {
    max: Number(process.env.DB_POOL_MAX ?? 10),
    idle_timeout: 20,
    onnotice: () => {},
    connection: { TimeZone: 'Europe/Amsterdam', application_name: 'astra-crm' },
    types: {
      // Keep date columns as plain 'YYYY-MM-DD' strings, no time zone shifts.
      date: {
        to: 1082,
        from: [1082],
        serialize: (x: string | Date) => (x instanceof Date ? x.toISOString().slice(0, 10) : x),
        parse: (x: string) => x,
      },
    },
  }) as unknown as Sql;
}

// One pool per process, survives Next.js dev hot reloads.
const g = globalThis as unknown as { __astraSql?: Sql };
export const sql: Sql = g.__astraSql ?? (g.__astraSql = create());

export type TxOptions = {
  /** The signed in user. Recorded as the actor in audit_log. */
  userId?: string | null;
  /** Where the change came from: ui (default), automation, sync, import, seed, script. */
  source?: string;
};

/** Run fn in a transaction with the audit actor set. Rolls back if fn throws. */
export async function tx<T>(fn: (t: Tx) => Promise<T>, opts: TxOptions = {}): Promise<T> {
  const result = await sql.begin(async (t) => {
    const trx = t as unknown as Tx;
    await trx`select set_config('app.user_id', ${opts.userId ?? ''}, true),
                     set_config('app.source', ${opts.source ?? 'ui'}, true)`;
    return fn(trx);
  });
  return result as T;
}

/** True when err is a Postgres unique violation, optionally on a given index or constraint name. */
export function isUniqueViolation(err: unknown, constraint?: string): boolean {
  const e = err as { code?: string; constraint_name?: string } | null;
  if (!e || e.code !== '23505') return false;
  return constraint ? e.constraint_name === constraint : true;
}

/** Close the pool. Scripts call this at the end so the process exits. */
export async function closeDb(): Promise<void> {
  await sql.end({ timeout: 5 });
  g.__astraSql = undefined;
}
