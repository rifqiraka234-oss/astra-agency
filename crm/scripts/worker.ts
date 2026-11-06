/**
 * npm run worker            runs forever: events as they arrive (LISTEN domain_events), schedules every minute
 * npm run worker -- --once  one pass over due events and schedules, then exits
 *
 * The automation engine lives in lib/automations/engine.ts. Nothing here sends a
 * message: rules that would talk to someone draft an outbound message for approval.
 */
import './env';
import { sql, closeDb } from '../lib/db';
import { processPending, runSchedules } from '../lib/automations/engine';

const once = process.argv.includes('--once');

function log(...args: unknown[]) {
  console.log(new Date().toISOString(), ...args);
}

async function pass(): Promise<void> {
  const events = await processPending({ limit: 500 });
  for (const e of events) {
    const runs = e.runs.map((r) => `${r.rule} ${r.status}${r.error ? ` (${r.error})` : ''}`).join(', ') || 'no rules';
    log(`event ${e.eventId} ${e.type}: ${runs}${e.processed ? '' : ', will retry'}`);
  }
  const schedules = await runSchedules(new Date());
  for (const s of schedules) {
    if (s.status === 'not_due' || s.status === 'already') continue;
    log(`schedule ${s.rule} ${s.runKey}: ${s.status}${s.created ? `, ${s.created} changes` : ''}${s.note ? `, ${s.note}` : ''}${s.error ? `, ${s.error}` : ''}`);
  }
  if (once) log(`pass done, ${events.length} events, ${schedules.filter((s) => s.status !== 'not_due' && s.status !== 'already').length} schedule runs`);
}

async function main() {
  if (once) {
    await pass();
    return;
  }
  log('worker started');
  let wake: (() => void) | null = null;
  await sql.listen('domain_events', () => wake?.());
  let stopping = false;
  const stop = () => {
    stopping = true;
    wake?.();
  };
  process.on('SIGINT', stop);
  process.on('SIGTERM', stop);
  while (!stopping) {
    try {
      await pass();
    } catch (err) {
      log('pass failed', err instanceof Error ? err.message : err);
    }
    await new Promise<void>((resolve) => {
      wake = resolve;
      setTimeout(resolve, 60_000);
    });
    wake = null;
  }
  log('worker stopped');
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(() => closeDb());
