/**
 * Test helpers for every area.
 *   await withRollback(async (t) => { ...writes against the real local DB... });
 * Everything inside runs in one transaction that is always rolled back.
 */
import { sql, type Tx } from '../lib/db';

class Rollback extends Error {}

export async function withRollback(fn: (t: Tx) => Promise<void>, userId: string | null = null): Promise<void> {
  try {
    await sql.begin(async (t) => {
      const trx = t as unknown as Tx;
      await trx`select set_config('app.user_id', ${userId ?? ''}, true), set_config('app.source', 'test', true)`;
      await fn(trx);
      throw new Rollback();
    });
  } catch (err) {
    if (!(err instanceof Rollback)) throw err;
  }
}

/** A stage id by pipeline and stage key. */
export async function stageId(t: Tx, pipelineKey: string, stageKey: string): Promise<string> {
  const [row] = await t<{ id: string }[]>`
    select s.id from pipeline_stages s join pipelines p on p.id = s.pipeline_id
     where p.key = ${pipelineKey} and s.key = ${stageKey}`;
  if (!row) throw new Error(`no stage ${pipelineKey}/${stageKey}`);
  return row.id;
}
