/**
 * npm run sync:lemlist [-- --dry-run] [--limit N] [--campaign cam_...] [--all-leads]
 *
 * Read only pull from lemlist into the local database. See lib/integrations/lemlist-sync.ts.
 * Prints counts only, never a contact list. Real lead data stays in the local database.
 */
import './env';
import { closeDb } from '../lib/db';
import { syncLemlist } from '../lib/integrations/lemlist-sync';

function arg(name: string): string | undefined {
  const i = process.argv.indexOf(name);
  return i >= 0 ? process.argv[i + 1] : undefined;
}

async function main() {
  const dryRun = process.argv.includes('--dry-run');
  const limitRaw = arg('--limit');
  const limit = limitRaw ? Number(limitRaw) : undefined;
  if (limitRaw && (!Number.isInteger(limit) || (limit as number) < 1)) throw new Error('--limit wants a whole number above 0');
  const report = await syncLemlist({
    dryRun,
    limit,
    campaignId: arg('--campaign'),
    allLeads: process.argv.includes('--all-leads'),
    log: (m) => console.log(m),
  });
  console.log('');
  console.log(dryRun ? 'DRY RUN, everything rolled back' : 'Sync written to the local database');
  console.log(`campaigns          ${report.campaigns.map((c) => `${c.name} (${c.synced} of ${c.accepts} accepted)`).join('; ') || 'none'}`);
  console.log(`contacts synced    ${report.contactsSynced} (created ${report.contactsCreated}, matched ${report.contactsMatched})`);
  console.log(`contacts to review ${report.contactsToReview} (same name, nothing to confirm), held ${report.contactsHeldForReview} (same LinkedIn or email, other name)`);
  console.log(`organizations new  ${report.organizationsCreated}`);
  console.log(`leads              created ${report.leadsCreated}, updated ${report.leadsUpdated}`);
  console.log(`threads pulled     ${report.threadsPulled}, ${report.threadItems} items`);
  console.log(`activities         created ${report.activitiesCreated}, already there ${report.activitiesExisting}`);
  console.log(`thread mismatches  ${report.mismatches.length}${report.mismatches.length ? ' ' + report.mismatches.map((m) => `${m.contactId} ${m.problem}`).join('; ') : ''}`);
  console.log(`lead.replied       ${report.repliesEmitted}`);
  console.log(`errors             ${report.errors.length}${report.errors.length ? ' ' + report.errors.slice(0, 5).map((e) => `${e.contactId} ${e.error}`).join('; ') : ''}`);
  console.log(`lemlist requests   ${report.requests}, all GET`);
  if (report.errors.length) process.exitCode = 2;
}

main()
  .catch((err) => {
    console.error(err instanceof Error ? err.message : err);
    process.exitCode = 1;
  })
  .finally(() => closeDb());
