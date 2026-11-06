/** npm run db:seed, see db/seed.ts. Idempotent, safe to run again. */
import './env';
import { closeDb } from '../lib/db';
import { seed } from '../db/seed';

seed()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(() => closeDb());
