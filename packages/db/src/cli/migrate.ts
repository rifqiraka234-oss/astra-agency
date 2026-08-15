import { loadEnvFile } from '@astra/core';
import { closePool } from '../client.js';
import { migrate } from '../migrate.js';

// .env must be loaded before the pool reads DATABASE_URL.
loadEnvFile();

const result = await migrate();
if (result.applied.length === 0) {
  console.log(`No new migrations. ${result.alreadyApplied.length} already applied.`);
} else {
  console.log(`Applied ${result.applied.length} migration(s):`);
  for (const name of result.applied) console.log(`  ${name}`);
}
await closePool();
