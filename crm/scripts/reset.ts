/**
 * npm run db:reset  (local only)
 * Drops and recreates the public schema, then migrates and seeds.
 * Refuses unless DATABASE_URL points at localhost.
 */
import './env';
import { sql, closeDb } from '../lib/db';
import { migrate } from './migrate';
import { seed } from '../db/seed';

async function main() {
  const url = new URL(process.env.DATABASE_URL ?? 'postgres://astra:astra@localhost:5432/astra_crm');
  if (!['localhost', '127.0.0.1', '::1', '[::1]'].includes(url.hostname)) {
    throw new Error(`db:reset refuses to run against ${url.hostname}, it only resets a localhost database`);
  }
  console.log(`Resetting ${url.hostname}${url.pathname}`);
  await sql.unsafe('drop schema public cascade');
  await sql.unsafe('create schema public');
  await sql.unsafe('grant all on schema public to public');
  await migrate();
  await seed();
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(() => closeDb());
