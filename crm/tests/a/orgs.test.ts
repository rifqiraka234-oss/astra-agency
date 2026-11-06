/**
 * Agent A, organizations and contacts. Runs against the local database inside
 * transactions that always roll back (tests/helpers.ts withRollback).
 */
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { closeDb, sql, type Tx } from '../../lib/db';
import { withRollback } from '../helpers';
import {
  InputError,
  addContactEmail,
  addContactPhone,
  addContactRole,
  addNote,
  addOrgDomain,
  createContactAt,
  draftEmail,
  endContactRole,
  orgForEmail,
  removeContactEmail,
  removeOrgDomain,
  setContactDoNotContact,
  setContactLinkedin,
  setOrgDoNotContact,
  setPrimaryDomain,
  setPrimaryEmail,
  updateOrganization,
} from '../../lib/orgs/mutations';
import { getContact, listContacts, listOrganizations, parseContactParams, parseOrgParams } from '../../lib/orgs/queries';
import { organizationsCsv, toCsv } from '../../lib/orgs/csv';

let raka: { id: string; name: string };

beforeAll(async () => {
  const [u] = await sql<{ id: string; name: string }[]>`select id, name from users where email = 'raka@astra.local'`;
  raka = u;
});
afterAll(async () => {
  await closeDb();
});

async function newOrg(t: Tx, name = 'Test Org A'): Promise<string> {
  const [o] = await t<{ id: string }[]>`insert into organizations (name, source) values (${name}, 'test') returning id`;
  return o.id;
}

async function newContact(t: Tx, first = 'Testa', last = 'Person'): Promise<string> {
  const [c] = await t<{ id: string }[]>`insert into contacts (first_name, last_name, source) values (${first}, ${last}, 'test') returning id`;
  return c.id;
}

async function expectInputError(p: Promise<unknown>, match: RegExp | string, field?: string): Promise<InputError> {
  try {
    await p;
  } catch (err) {
    expect(err).toBeInstanceOf(InputError);
    const e = err as InputError;
    expect(e.message).toMatch(match);
    if (field) expect(e.field).toBe(field);
    return e;
  }
  throw new Error('expected an InputError');
}

describe('organization domains', () => {
  it('normalises, makes the first one primary and dedups across organizations', async () => {
    await withRollback(async (t) => {
      const a = await newOrg(t, 'Domain Test One');
      const b = await newOrg(t, 'Domain Test Two');
      expect(await addOrgDomain(t, a, 'https://www.Example-A-test.co.uk/about?x=1')).toBe('example-a-test.co.uk');
      expect(await addOrgDomain(t, a, 'shop.example-a-test.com')).toBe('example-a-test.com');
      const doms = await t<{ domain_normalised: string; is_primary: boolean }[]>`
        select domain_normalised, is_primary from organization_domains where organization_id = ${a} order by created_at, domain_normalised`;
      expect(doms.filter((d) => d.is_primary).map((d) => d.domain_normalised)).toEqual(['example-a-test.co.uk']);

      const err = await expectInputError(addOrgDomain(t, b, 'EXAMPLE-A-TEST.CO.UK'), 'example-a-test.co.uk is already Domain Test One', 'domain');
      expect(err.duplicate?.id).toBe(a);
      await expectInputError(addOrgDomain(t, a, 'example-a-test.com'), 'already on this organization');
    }, raka.id);
  });

  it('matches seeded domains with the design wording', async () => {
    await withRollback(async (t) => {
      const b = await newOrg(t);
      const err = await expectInputError(addOrgDomain(t, b, 'https://www.dekade.nl/taproom'), 'dekade.nl is already Brouwerij De Kade');
      expect(err.duplicate?.href).toMatch(/^\/organizations\//);
    });
  });

  it('never accepts a free mail domain, including ones added to the table', async () => {
    await withRollback(async (t) => {
      const a = await newOrg(t);
      await expectInputError(addOrgDomain(t, a, 'gmail.com'), 'free mail domain');
      await t`insert into free_mail_domains (domain) values ('mailbox-test.example')`;
      await expectInputError(addOrgDomain(t, a, 'mailbox-test.example'), 'free mail domain');
      await expectInputError(addOrgDomain(t, a, 'not a domain'), 'Enter a website');
      expect(await orgForEmail(t, 'someone@gmail.com')).toBeNull();
      expect((await orgForEmail(t, 'Eva@DeKade.nl'))?.name).toBe('Brouwerij De Kade');
    });
  });

  it('the unique index is the backstop', async () => {
    await withRollback(async (t) => {
      const a = await newOrg(t);
      await t`insert into organization_domains (organization_id, domain_normalised) values (${a}, 'backstop-test.nl')`;
      await expect(
        t.savepoint((sp) => sp`insert into organization_domains (organization_id, domain_normalised) values (${a}, 'backstop-test.nl')`),
      ).rejects.toMatchObject({ code: '23505' });
    });
  });

  it('sets the primary domain and promotes another when the primary is removed', async () => {
    await withRollback(async (t) => {
      const a = await newOrg(t);
      await addOrgDomain(t, a, 'first-test.nl');
      await addOrgDomain(t, a, 'second-test.nl');
      const [second] = await t<{ id: string }[]>`select id from organization_domains where domain_normalised = 'second-test.nl'`;
      await setPrimaryDomain(t, a, second.id);
      const primary = async () =>
        (await t<{ d: string }[]>`select domain_normalised as d from organization_domains where organization_id = ${a} and is_primary`).map((r) => r.d);
      expect(await primary()).toEqual(['second-test.nl']);
      await removeOrgDomain(t, a, second.id);
      expect(await primary()).toEqual(['first-test.nl']);
    });
  });
});

describe('contact emails and LinkedIn', () => {
  it('dedups email without case and keeps one primary', async () => {
    await withRollback(async (t) => {
      const a = await newContact(t);
      const b = await newContact(t, 'Other', 'Person');
      expect(await addContactEmail(t, a, ' Testa.Person@Example-Test.NL ')).toBe('testa.person@example-test.nl');
      await addContactEmail(t, a, 'testa@private-test.nl', { type: 'personal' });
      const err = await expectInputError(addContactEmail(t, b, 'TESTA.PERSON@example-test.nl'), 'already belongs to Testa Person', 'email');
      expect(err.duplicate?.id).toBe(a);
      await expectInputError(addContactEmail(t, b, 'eva@dekade.nl'), 'already belongs to Eva Jansen');
      await expectInputError(addContactEmail(t, a, 'nope'), 'Enter an email');

      const [second] = await t<{ id: string }[]>`select id from contact_emails where email = 'testa@private-test.nl'`;
      await setPrimaryEmail(t, a, second.id);
      const prim = async () => (await t<{ email: string }[]>`select email from contact_emails where contact_id = ${a} and is_primary`).map((r) => r.email);
      expect(await prim()).toEqual(['testa@private-test.nl']);
      await removeContactEmail(t, a, second.id);
      expect(await prim()).toEqual(['testa.person@example-test.nl']);
    });
  });

  it('normalises LinkedIn and refuses another contact\'s profile', async () => {
    await withRollback(async (t) => {
      const a = await newContact(t);
      const b = await newContact(t, 'Other', 'Person');
      expect(await setContactLinkedin(t, a, 'https://nl.linkedin.com/in/Testa-Person-123/?trk=x')).toBe('linkedin.com/in/testa-person-123');
      await expectInputError(setContactLinkedin(t, b, 'linkedin.com/in/TESTA-person-123'), 'already belongs to Testa Person', 'linkedin_url');
      await expectInputError(setContactLinkedin(t, b, 'https://linkedin.com/company/acme'), 'Paste a profile link');
      expect(await setContactLinkedin(t, a, 'linkedin.com/in/testa-person-123')).toBe('linkedin.com/in/testa-person-123');
      expect(await setContactLinkedin(t, a, '')).toBeNull();
    });
  });

  it('adds phones, normalised, without repeats on the same contact', async () => {
    await withRollback(async (t) => {
      const a = await newContact(t);
      expect(await addContactPhone(t, a, '06 1234 5678')).toBe('+31612345678');
      await expectInputError(addContactPhone(t, a, '+31 6 12345678'), 'already on this contact');
      await expectInputError(addContactPhone(t, a, '12'), 'Enter a phone number');
    });
  });
});

describe('dated roles', () => {
  it('links a contact, ends the role with an end date and moves the primary organization', async () => {
    await withRollback(async (t) => {
      const c = await newContact(t);
      const oldOrg = await newOrg(t, 'Old Employer Test');
      const newOrgId = await newOrg(t, 'New Employer Test');
      const r1 = await addContactRole(t, { contactId: c, organizationId: oldOrg, relationship: 'owner', buyingRoles: ['decision_maker', 'bogus'], startDate: '2020-01-01' });
      const contact = async () => (await t<{ primary_org_id: string | null }[]>`select primary_org_id from contacts where id = ${c}`)[0];
      expect((await contact()).primary_org_id).toBe(oldOrg);
      const [role] = await t<{ buying_roles: string[]; is_primary: boolean }[]>`select buying_roles, is_primary from contact_org_roles where id = ${r1}`;
      expect(role).toEqual({ buying_roles: ['decision_maker'], is_primary: true });

      await expectInputError(addContactRole(t, { contactId: c, organizationId: oldOrg }), 'already has a current role at Old Employer Test');
      const r2 = await addContactRole(t, { contactId: c, organizationId: newOrgId, title: 'Director', startDate: '2026-04-01' });
      expect((await contact()).primary_org_id).toBe(oldOrg); // second role is not primary unless asked

      await expectInputError(endContactRole(t, r1, '2019-12-31'), 'before the start date', 'end_date');
      await endContactRole(t, r1, '2026-03-31');
      const [ended] = await t<{ is_current: boolean; is_primary: boolean; end_date: string }[]>`
        select is_current, is_primary, end_date from contact_org_roles where id = ${r1}`;
      expect(ended).toEqual({ is_current: false, is_primary: false, end_date: '2026-03-31' });
      expect((await contact()).primary_org_id).toBe(newOrgId);
      const [nowPrimary] = await t<{ is_primary: boolean }[]>`select is_primary from contact_org_roles where id = ${r2}`;
      expect(nowPrimary.is_primary).toBe(true);
      await expectInputError(endContactRole(t, r1, '2026-04-01'), 'already ended');

      // a new current role at the old organization is allowed once the old one ended
      await addContactRole(t, { contactId: c, organizationId: oldOrg, relationship: 'advisor' });
      await endContactRole(t, r2, '2026-11-06');
      expect((await contact()).primary_org_id).toBe(oldOrg);
    });
  });

  it('clears the primary organization when the last role ends', async () => {
    await withRollback(async (t) => {
      const c = await newContact(t);
      const o = await newOrg(t);
      const r = await addContactRole(t, { contactId: c, organizationId: o });
      await endContactRole(t, r, '2026-11-06');
      const [row] = await t<{ primary_org_id: string | null }[]>`select primary_org_id from contacts where id = ${c}`;
      expect(row.primary_org_id).toBeNull();
    });
  });

  it('creates a contact at an organization with dedup on email', async () => {
    await withRollback(async (t) => {
      const o = await newOrg(t);
      const id = await createContactAt(t, { firstName: 'New', lastName: 'Hire', email: 'New.Hire@Hire-Test.nl', ownerUserId: raka.id, organizationId: o, relationship: 'employee', buyingRoles: ['champion'], title: 'Manager', startDate: '2026-11-01' });
      const [c] = await t<{ primary_org_id: string; job_title: string }[]>`select primary_org_id, job_title from contacts where id = ${id}`;
      expect(c).toEqual({ primary_org_id: o, job_title: 'Manager' });
      await expectInputError(
        createContactAt(t, { firstName: 'Again', email: 'new.hire@hire-test.nl', ownerUserId: null, organizationId: o }),
        'already belongs to New Hire',
      );
    });
  });
});

describe('do not contact and suppression', () => {
  it('writes the contact, its emails and LinkedIn to suppression_list, and clears them again', async () => {
    await withRollback(async (t) => {
      const c = await newContact(t);
      await addContactEmail(t, c, 'dnc-test@example-dnc.nl');
      await setContactLinkedin(t, c, 'linkedin.com/in/dnc-test-person');
      await setContactDoNotContact(t, c, true, raka);
      const rows = await t<{ kind: string; value: string }[]>`
        select kind, value from suppression_list where contact_id = ${c} order by kind`;
      expect(rows).toEqual([
        { kind: 'contact', value: c },
        { kind: 'email', value: 'dnc-test@example-dnc.nl' },
        { kind: 'linkedin', value: 'linkedin.com/in/dnc-test-person' },
      ]);
      // an email added later is suppressed too
      await addContactEmail(t, c, 'second-dnc@example-dnc.nl');
      const [later] = await t<{ n: number }[]>`select count(*)::int as n from suppression_list where kind = 'email' and value = 'second-dnc@example-dnc.nl'`;
      expect(later.n).toBe(1);
      const [flag] = await t<{ do_not_contact: boolean; objected_at: Date | null }[]>`select do_not_contact, objected_at from contacts where id = ${c}`;
      expect(flag.do_not_contact).toBe(true);
      expect(flag.objected_at).not.toBeNull();
      expect((await getContact(c, t))?.suppressed).toBe(true);

      await expectInputError(draftEmail(t, { contactId: c, subject: 'Hi', body: 'Hello', actor: raka }), 'marked do not contact');

      await setContactDoNotContact(t, c, false, raka);
      const [left] = await t<{ n: number }[]>`select count(*)::int as n from suppression_list where contact_id = ${c}`;
      expect(left.n).toBe(0);
    }, raka.id);
  });

  it('suppresses every domain of an organization marked do not contact', async () => {
    await withRollback(async (t) => {
      const o = await newOrg(t);
      await addOrgDomain(t, o, 'dnc-org-test.nl');
      await setOrgDoNotContact(t, o, true, raka);
      await addOrgDomain(t, o, 'dnc-org-test.com');
      const rows = await t<{ value: string }[]>`select value from suppression_list where kind = 'domain' and value like 'dnc-org-test.%' order by value`;
      expect(rows.map((r) => r.value)).toEqual(['dnc-org-test.com', 'dnc-org-test.nl']);
      await setOrgDoNotContact(t, o, false, raka);
      const [left] = await t<{ n: number }[]>`select count(*)::int as n from suppression_list where kind = 'domain' and value like 'dnc-org-test.%'`;
      expect(left.n).toBe(0);
    }, raka.id);
  });

  it('drafts an email into the approval queue without sending', async () => {
    await withRollback(async (t) => {
      const [eva] = await t<{ id: string }[]>`select id from contacts where first_name = 'Eva' and last_name = 'Jansen'`;
      const id = await draftEmail(t, { contactId: eva.id, subject: 'Deposit question', body: 'Yes, guests can pay upfront.', actor: raka });
      const [m] = await t<{ status: string; sent_at: Date | null; channel: string }[]>`select status, sent_at, channel from outbound_messages where id = ${id}`;
      expect(m).toEqual({ status: 'awaiting_approval', sent_at: null, channel: 'email' });
    }, raka.id);
  });
});

describe('updates, notes and lists', () => {
  it('updates core columns and merges custom values', async () => {
    await withRollback(async (t) => {
      const o = await newOrg(t);
      await updateOrganization(t, o, { industry: 'Retail', city: 'Delft', bogus: 'x' } as never, { tier_note: 'A' });
      const [row] = await t<{ industry: string; city: string; custom: Record<string, unknown> }[]>`select industry, city, custom from organizations where id = ${o}`;
      expect(row).toEqual({ industry: 'Retail', city: 'Delft', custom: { tier_note: 'A' } });
    });
  });

  it('logs a note and notifies an @mentioned user', async () => {
    await withRollback(async (t) => {
      const o = await newOrg(t, 'Note Test Org');
      const [luna] = await t<{ id: string }[]>`select id from users where email = 'luna@astra.local'`;
      await addNote(t, { body: 'Ask @Luna about the invoice', actor: raka, links: [{ organizationId: o }], recordType: 'organization', recordId: o, recordName: 'Note Test Org', url: `/organizations/${o}` });
      const [a] = await t<{ kind: string; title: string }[]>`
        select a.kind, a.title from activities a join activity_links l on l.activity_id = a.id where l.organization_id = ${o}`;
      expect(a).toEqual({ kind: 'note', title: `Note from ${raka.name}` });
      const n = await t<{ title: string }[]>`select title from notifications where user_id = ${luna.id} and record_id = ${o}`;
      expect(n.map((x) => x.title)).toEqual([`${raka.name} mentioned you on Note Test Org`]);
      await expectInputError(addNote(t, { body: '   ', actor: raka, links: [{ organizationId: o }], recordType: 'organization', recordId: o, recordName: 'x', url: '/' }), 'Write something');
    }, raka.id);
  });

  it('filters, sorts and pages the lists', async () => {
    const all = await listOrganizations(parseOrgParams({}));
    expect(all.total).toBeGreaterThan(0);
    const byValue = await listOrganizations(parseOrgParams({ sort: 'open_value', dir: 'desc' }));
    const values = byValue.rows.map((r) => Number(r.open_deal_value));
    expect([...values].sort((a, b) => b - a)).toEqual(values);
    const dk = await listOrganizations(parseOrgParams({ q: 'dekade.com', lifecycle: 'customer' }));
    expect(dk.rows.map((r) => r.name)).toEqual(['Brouwerij De Kade']);
    const junk = parseOrgParams({ sort: 'drop table', owner: 'not-a-uuid', page: '-3' });
    expect(junk).toMatchObject({ sort: 'name', owner: null, page: 1 });
    const contacts = await listContacts(parseContactParams({ q: 'FINANCE@dekade' }));
    expect(contacts.rows.map((r) => r.full_name)).toEqual(['Sanne de Vries']);
    const pct = await listContacts(parseContactParams({ q: '100%' }));
    expect(pct.total).toBe(0);
  });

  it('writes CSV that a spreadsheet will not execute', async () => {
    expect(toCsv(['a', 'b'], [['=SUM(A1)', 'plain, text']])).toBe("a,b\r\n'=SUM(A1),\"plain, text\"");
    const { rows } = await listOrganizations(parseOrgParams({ q: 'dekade.nl' }));
    const csv = organizationsCsv(rows);
    expect(csv.split('\r\n')[1]).toContain('Brouwerij De Kade,dekade.nl,dekade.nl dekade.com,Food and beverage,Customer');
  });
});
