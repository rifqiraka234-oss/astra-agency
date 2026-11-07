import { describe, expect, it } from 'vitest';
import { withRollback } from '../helpers';
import { findExistingOrg } from '../../lib/integrations/match';

describe('import organization matching', () => {
  it('gives a name only organization its domain instead of making a second one', async () => {
    await withRollback(async (t) => {
      const [bare] = await t<{ id: string }[]>`insert into organizations (name) values ('Qa Matchco GmbH') returning id`;
      expect(await findExistingOrg(t, { domain: 'qa-matchco-test.com', name: 'QA Matchco' })).toBe(bare.id);
      const [d] = await t<{ organization_id: string }[]>`select organization_id from organization_domains where domain_normalised = 'qa-matchco-test.com'`;
      expect(d.organization_id).toBe(bare.id);
      // Now the name finds it too, and a different domain with the same name is a different company.
      expect(await findExistingOrg(t, { domain: null, name: 'Qa Matchco' })).toBe(bare.id);
      expect(await findExistingOrg(t, { domain: 'qa-matchco-other.com', name: 'Qa Matchco' })).toBeNull();
    });
  });
});
