/**
 * npm run backfill:sales [-- --dry-run]
 *
 * Two repairs for imported data, see lib/sales/backfill.ts. Safe to run again.
 *   1. Disqualify reasons for imported disqualified leads from their close reason.
 *   2. Lead stage history (stage_transitions, source 'backfill') from stored dates.
 * Prints counts. Leads and deals still without a reason are listed by name, they
 * need a person to pick one.
 */
import './env';
import { closeDb, tx } from '../lib/db';
import { backfillDisqualifyReasons, backfillLeadTransitions } from '../lib/sales/backfill';

class Rollback extends Error {}

const table = (rows: { reason: string | null; count: number }[]) =>
  rows.map((r) => `    ${(r.reason ?? '(no reason)').padEnd(20)} ${String(r.count).padStart(5)}`).join('\n');

async function main() {
  const dryRun = process.argv.includes('--dry-run');
  try {
    await tx(
      async (t) => {
        const reasons = await backfillDisqualifyReasons(t);
        const total = (rows: { count: number }[]) => rows.reduce((a, r) => a + r.count, 0);
        console.log(dryRun ? 'DRY RUN, everything rolled back' : 'Backfilled in the local database');
        console.log('');
        console.log(`Disqualified leads by reason, before (${total(reasons.before)})`);
        console.log(table(reasons.before));
        console.log(`Set from close_reason  ${Object.entries(reasons.updated).map(([k, v]) => `${k} ${v}`).join(', ') || 'nothing to do'}`);
        console.log(`Disqualified leads by reason, after (${total(reasons.after)})`);
        console.log(table(reasons.after));
        console.log('');
        console.log(`Disqualified leads still without a reason  ${reasons.leadsWithoutReason.length}`);
        for (const l of reasons.leadsWithoutReason) console.log(`    ${l.id}  ${l.title}  queue status ${l.queue_status ?? 'none'}, close reason ${l.close_reason ?? 'none'}`);
        console.log(`Lost deals without a reason  ${reasons.dealsWithoutReason.length}`);
        for (const d of reasons.dealsWithoutReason) console.log(`    ${d.id}  ${d.name}  ${d.pipeline}, ${d.stage}`);
        console.log('');

        const history = await backfillLeadTransitions(t);
        const created = Object.values(history.created).reduce((a, n) => a + n, 0);
        console.log(`Lead stage history  ${history.leadsChecked} imported leads checked, ${history.leadsChanged} given history, ${created} transitions created`);
        for (const [stage, n] of Object.entries(history.created)) console.log(`    ${stage.padEnd(14)} ${String(n).padStart(5)}`);
        console.log(
          `  evidence not used  after the first recorded move ${history.dropped.afterRecordedHistory}, ` +
            `out of date order ${history.dropped.outOfOrder}, past the stage the import recorded ${history.dropped.pastFirstStage}`,
        );
        console.log(`  import time rows folded into the backfilled stage entry  ${history.collapsed ?? 0}`);
        if (dryRun) throw new Rollback();
      },
      { source: 'backfill' },
    );
  } catch (err) {
    if (!(err instanceof Rollback)) throw err;
  }
}

main()
  .catch((err) => {
    console.error(err instanceof Error ? err.message : err);
    process.exitCode = 1;
  })
  .finally(() => closeDb());
