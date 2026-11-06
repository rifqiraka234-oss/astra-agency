/**
 * lib/settings/computed.ts, values of calculation and rollup fields. They are
 * computed when read, never stored (SPEC hard rule 5). Record pages can merge
 * them into the custom values before building property groups:
 *
 *   const defs = await getFieldDefinitions('organization');
 *   const computed = await computedValues('organization', org.id, defs);   // { open_deal_value: 24500 }
 *   const groups = customPropertyGroups(defs, { ...org.custom, ...computed }, { users });
 */
import { sql, type Db } from '@/lib/db';
import type { CustomObjectType, FieldDefinition } from '@/lib/fields';
import { OBJECT_TABLES } from './core-fields';
import { evaluateExpression, parseExpression } from './calc';
import { rollupRelation, type RollupConfig } from './field-config';

const FN_SQL: Record<string, string> = { sum: 'sum', count: 'count', min: 'min', max: 'max', avg: 'avg' };

/** One rollup value for one record, or null when nothing is related. */
export async function computeRollup(objectType: CustomObjectType, recordId: string, config: RollupConfig, db: Db = sql): Promise<number | null> {
  const rel = rollupRelation(objectType, config.relation);
  const fn = FN_SQL[config.fn];
  if (!rel || !fn) return null;
  let target = '*';
  if (config.fn !== 'count') {
    const f = String(config.field ?? '');
    if (f.startsWith('custom.')) {
      const key = f.slice(7);
      if (!/^[a-z][a-z0-9_]{0,62}$/.test(key)) return null;
      target = `nullif(r.custom ->> '${key}', '')::numeric`;
    } else if (rel.fields.some((x) => x.key === f)) {
      target = `r.${f}`;
    } else {
      return null;
    }
  }
  const where = [rel.where.replace('$id', '$1'), config.openOnly && rel.openWhere ? rel.openWhere : null].filter(Boolean).join(' and ');
  const [row] = await db.unsafe<{ v: string | null }[]>(`select ${fn}(${target})::text as v from ${rel.table} r where ${where}`, [recordId]);
  if (row?.v === null || row?.v === undefined) return config.fn === 'count' ? 0 : null;
  return Math.round(Number(row.v) * 100) / 100;
}

/** Values of every calculation and rollup field of a record, keyed by internal name. */
export async function computedValues(
  objectType: CustomObjectType,
  recordId: string,
  defs: FieldDefinition[],
  db: Db = sql,
): Promise<Record<string, number | null>> {
  const wanted = defs.filter((d) => !d.archived_at && (d.field_type === 'calculation' || d.field_type === 'rollup'));
  if (!wanted.length) return {};
  const out: Record<string, number | null> = {};
  for (const d of wanted.filter((x) => x.field_type === 'rollup')) {
    out[d.internal_name] = await computeRollup(objectType, recordId, d.config as unknown as RollupConfig, db);
  }
  const calcs = wanted.filter((x) => x.field_type === 'calculation');
  if (calcs.length) {
    const table = OBJECT_TABLES[objectType];
    const [rec] = await db.unsafe<Record<string, unknown>[]>(`select * from ${table} where id = $1`, [recordId]);
    if (rec) {
      const values: Record<string, unknown> = { ...rec, ...((rec.custom as Record<string, unknown>) ?? {}), ...out };
      if (objectType === 'deal') {
        const [w] = await db<{ probability: number }[]>`select probability from v_deal_weighted where deal_id = ${recordId}`;
        values.probability = w?.probability ?? 0;
      }
      for (const d of calcs) {
        const parsed = parseExpression(String((d.config as { expression?: string } | null)?.expression ?? ''));
        out[d.internal_name] = parsed.ok ? evaluateExpression(parsed.ast, values) : null;
      }
    }
  }
  return out;
}
