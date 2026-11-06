/**
 * npm run db:migrate
 * Applies db/migrations/*.sql in lexical order, each in its own transaction,
 * and records the file name in schema_migrations. Already applied files are skipped.
 * A changed file that was already applied is reported, not re-run.
 */
import './env';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { sql, closeDb } from '../lib/db';

export async function migrate(log = console.log): Promise<number> {
  await sql`create table if not exists schema_migrations (
    name text primary key,
    checksum text not null,
    applied_at timestamptz not null default now()
  )`;
  const dir = path.join(process.cwd(), 'db', 'migrations');
  const files = fs.readdirSync(dir).filter((f) => /^\d{3}_.*\.sql$/.test(f)).sort();
  const applied = new Map(
    (await sql<{ name: string; checksum: string }[]>`select name, checksum from schema_migrations`).map((r) => [r.name, r.checksum]),
  );
  let count = 0;
  for (const file of files) {
    const body = fs.readFileSync(path.join(dir, file), 'utf8');
    const checksum = crypto.createHash('sha256').update(body).digest('hex').slice(0, 16);
    if (applied.has(file)) {
      if (applied.get(file) !== checksum) log(`  changed after apply, not re-run: ${file}`);
      continue;
    }
    await sql.begin(async (t) => {
      await t.unsafe(`set local app.source = 'migration'`);
      await t.unsafe(body);
      await t`insert into schema_migrations (name, checksum) values (${file}, ${checksum})`;
    });
    log(`  applied ${file}`);
    count++;
  }
  log(count ? `Migrated, ${count} file(s) applied.` : 'Nothing to migrate.');
  return count;
}

if (require.main === module) {
  migrate()
    .catch((err) => {
      console.error(err);
      process.exitCode = 1;
    })
    .finally(() => closeDb());
}
