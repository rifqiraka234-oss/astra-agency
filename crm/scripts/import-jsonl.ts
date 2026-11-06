/**
 * npm run import:jsonl [-- --dry-run] [--state-dir ../state]
 *
 * One off import of state/silent_accepted_queue.jsonl, prototypes.jsonl and
 * meetings.jsonl into the local database. See lib/integrations/jsonl-import.ts.
 * Safe to run again. Prints counts and the status mapping, never a contact list.
 */
import './env';
import path from 'node:path';
import { closeDb } from '../lib/db';
import { importJsonl } from '../lib/integrations/jsonl-import';

function arg(name: string): string | undefined {
  const i = process.argv.indexOf(name);
  return i >= 0 ? process.argv[i + 1] : undefined;
}

async function main() {
  const dryRun = process.argv.includes('--dry-run');
  const stateDir = path.resolve(arg('--state-dir') ?? path.join(process.cwd(), '..', 'state'));
  const r = await importJsonl({ dryRun, stateDir, log: (m) => console.log(m) });
  const q = r.queue;
  console.log(dryRun ? 'DRY RUN, everything rolled back' : 'Imported into the local database');
  console.log(`state dir ${stateDir}`);
  console.log('');
  console.log(`silent_accepted_queue.jsonl  ${q.rows} rows, ${q.people} people (latest row per contactId, else leadId)`);
  console.log(`  rows with neither id, reported not guessed  ${q.withoutId}${q.withoutId ? ` (line numbers ${q.withoutIdSamples.join(', ')}${q.withoutId > q.withoutIdSamples.length ? ', ...' : ''})` : ''}`);
  console.log('');
  console.log('Status mapping, latest row per person');
  const w = Math.max(...q.mapping.map((m) => m.status.length), 6);
  console.log(`  ${'status'.padEnd(w)}  ${'count'.padStart(5)}  ${'stage'.padEnd(12)}  ${'research'.padEnd(12)}  ${'disqualify'.padEnd(18)}  ${'close'.padEnd(14)}  rule`);
  for (const m of q.mapping) {
    console.log(`  ${m.status.padEnd(w)}  ${String(m.count).padStart(5)}  ${m.stage.padEnd(12)}  ${m.researchStatus.padEnd(12)}  ${(m.disqualifyReason ?? '').padEnd(18)}  ${(m.closeReason ?? '').padEnd(14)}  ${m.rule}`);
  }
  console.log('');
  console.log(`  by stage  ${Object.entries(q.stageCounts).sort((a, b) => b[1] - a[1]).map(([k, v]) => `${k} ${v}`).join(', ')}`);
  console.log(`  leads created ${q.leadsCreated}, updated ${q.leadsUpdated} (kept a stage set by hand or automation ${q.leadsKeptUserStage}), without a contact ${q.leadsWithoutContact}`);
  console.log(`  contacts created ${q.contactsCreated}, matched ${q.contactsMatched}, organizations created ${q.organizationsCreated}`);
  console.log(`  research notes ${q.notesCreated}, added to the suppression list ${q.suppressed}`);
  console.log(`prototypes.jsonl  ${r.prototypes.rows} rows, ${r.prototypes.distinct} distinct, activities created ${r.prototypes.created}, already there ${r.prototypes.existing}, no matching person ${r.prototypes.unlinked}`);
  console.log(`meetings.jsonl    ${r.meetings.rows} rows, ${r.meetings.distinct} distinct, activities created ${r.meetings.created}, already there ${r.meetings.existing}, no matching person ${r.meetings.unlinked}`);
  console.log(`errors ${r.errors.length}${r.errors.length ? ' ' + r.errors.slice(0, 5).map((e) => `${e.file} ${e.key} ${e.error}`).join('; ') : ''}`);
  if (r.errors.length) process.exitCode = 2;
}

main()
  .catch((err) => {
    console.error(err instanceof Error ? err.message : err);
    process.exitCode = 1;
  })
  .finally(() => closeDb());
