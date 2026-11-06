import { describe, expect, it } from 'vitest';
import { withRollback } from '../helpers';
import { createApiKey, listApiKeys, revokeApiKey, verifyApiKey } from '../../lib/integrations/api-keys';
import { listRules, ruleRuns, runSummary, workerBacklog } from '../../lib/automations/queries';
import { lemlistStatus } from '../../lib/integrations/lemlist-sync';

describe('api keys', () => {
  it('stores only a hash, verifies a live key and refuses a revoked one', async () => {
    await withRollback(async (t) => {
      const [u] = await t<{ id: string }[]>`select id from users where email = 'raka@astra.local'`;
      const { id, key, prefix } = await createApiKey(t, { name: 'test-e', scopes: ['read', 'nonsense'] }, u.id);
      expect(key.startsWith(prefix)).toBe(true);
      const [row] = await t<{ key_hash: string; scopes: string[] }[]>`select key_hash, scopes from api_keys where id = ${id}`;
      expect(row.key_hash).not.toContain(key);
      expect(row.scopes).toEqual(['read']);
      expect(await verifyApiKey(key, t)).toMatchObject({ id, scopes: ['read'] });
      expect(await verifyApiKey(key + 'x', t)).toBeNull();
      expect(await revokeApiKey(t, id)).toBe(true);
      expect(await verifyApiKey(key, t)).toBeNull();
      expect((await listApiKeys(t)).some((k) => k.id === id && k.revoked_at)).toBe(true);
      // The audit log never sees the hash.
      const audit = await t<{ new_data: Record<string, unknown> }[]>`select new_data from audit_log where table_name = 'api_keys' and record_id = ${id}`;
      expect(audit.every((a) => !a.new_data || !('key_hash' in a.new_data))).toBe(true);
    });
  });
});

describe('settings reads', () => {
  it('lists the built in rules with steps and summaries', async () => {
    const rules = await listRules();
    const keys = rules.map((r) => r.key);
    for (const k of ['deal_won_start_delivery', 'lead_reply_move', 'deal_no_next_step', 'quarterly_checkin', 'invoice_late', 'invoice_mark_late']) expect(keys).toContain(k);
    for (const r of rules) {
      expect(Array.isArray(r.steps)).toBe(true);
      expect(runSummary(r)).not.toMatch(/[–—]/);
      await ruleRuns(r.id, 5);
    }
    const b = await workerBacklog();
    expect(typeof b.pending).toBe('number');
    const s = await lemlistStatus();
    expect(typeof s.counts.contacts).toBe('number');
  });
});
