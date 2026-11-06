/**
 * Invoices against the real local database.
 * The read only tests roll back. The numbering test needs real commits (two
 * transactions racing for the counter row), so it uses its own series TST and
 * year 2099 and removes everything it made afterwards.
 */
import { afterAll, describe, expect, it } from 'vitest';
import { closeDb, sql, type Tx } from '../../lib/db';
import {
  addInvoiceLine,
  createCreditNote,
  createInvoiceDraft,
  InvoiceError,
  issueInvoice,
  setInvoiceState,
  updateInvoiceDraft,
} from '../../lib/money/invoices';
import { withRollback } from '../helpers';

const SERIES = 'TST';
const YEAR = 2099;

async function cleanupNumbering() {
  await sql.begin(async (t) => {
    await t`select set_config('app.invoice_purge', 'on', true), set_config('app.source', 'test', true)`;
    const ids = (await t<{ id: string }[]>`select id from invoices where external_number like ${`${SERIES}-${YEAR}-%`}
                                             or title like 'F numbering test%'`).map((r) => r.id);
    if (ids.length) {
      await t`delete from activities where id in (select activity_id from activity_links where invoice_id = any(${ids}::uuid[]))`;
      await t`delete from invoices where id = any(${ids}::uuid[])`;
    }
    await t`delete from activities where id in (select l.activity_id from activity_links l join organizations o on o.id = l.organization_id where o.name = 'F numbering test org')`;
    await t`delete from organizations where name = 'F numbering test org'`;
    await t`delete from invoice_number_series where series = ${SERIES}`;
  });
}

afterAll(async () => {
  await cleanupNumbering();
  await closeDb();
});

async function savepointError(t: Tx, fn: (sp: Tx) => Promise<unknown>): Promise<Error | null> {
  try {
    await t.savepoint(async (sp) => {
      await fn(sp as unknown as Tx);
    });
    return null;
  } catch (e) {
    return e as Error;
  }
}

describe('issued invoices are read only', () => {
  it('blocks edits to an issued invoice and its lines, in code and in the database', async () => {
    await withRollback(async (t) => {
      const [org] = await t<{ id: string }[]>`insert into organizations (name) values ('F lock test org') returning id`;
      const id = await createInvoiceDraft(t, { organizationId: org.id, title: 'Lock test', vatTreatment: 'nl_21', actorUserId: null });
      await addInvoiceLine(t, id, { name: 'Website build', quantity: '1', unitPrice: '1000.00' });

      // Drafts are editable and have no number.
      await updateInvoiceDraft(t, id, { title: 'Lock test, edited' });
      const [draft] = await t<{ external_number: string | null; total: string }[]>`select external_number, total from invoices where id = ${id}`;
      expect(draft).toEqual({ external_number: null, total: '1210.00' });

      const { number } = await issueInvoice(t, id, { actorUserId: null, issueDate: '2099-03-01', series: 'TSL' });
      expect(number).toBe('TSL-2099-001');

      // The lib refuses with a plain message.
      await expect(updateInvoiceDraft(t, id, { title: 'Changed' })).rejects.toBeInstanceOf(InvoiceError);
      await expect(addInvoiceLine(t, id, { name: 'Extra', quantity: '1', unitPrice: '5' })).rejects.toThrow(/read only/);

      // The database refuses raw writes too.
      expect((await savepointError(t, (sp) => sp`update invoices set title = 'Raw change' where id = ${id}`))?.message).toMatch(/read only/);
      expect((await savepointError(t, (sp) => sp`update invoices set total = 1 where id = ${id}`))?.message).toMatch(/read only/);
      expect((await savepointError(t, (sp) => sp`update line_items set unit_price = 1 where invoice_id = ${id}`))?.message).toMatch(/lines are read only/);
      expect((await savepointError(t, (sp) => sp`delete from line_items where invoice_id = ${id}`))?.message).toMatch(/lines are read only/);
      expect((await savepointError(t, (sp) => sp`delete from invoices where id = ${id}`))?.message).toMatch(/cannot be deleted/);
      expect((await savepointError(t, (sp) => sp`update invoices set state = 'draft', external_number = null where id = ${id}`))?.message).toMatch(/cannot go from open to draft/);

      // State moves that are allowed still work, and paid is final.
      await setInvoiceState(t, id, 'paid', { actorUserId: null, paidOn: '2099-03-10' });
      await expect(setInvoiceState(t, id, 'open', { actorUserId: null })).rejects.toThrow(/cannot become open/);
      expect((await savepointError(t, (sp) => sp`update invoices set state = 'open' where id = ${id}`))?.message).toMatch(/cannot go from paid to open/);

      // Corrections are a negative credit note linked to the original.
      const creditId = await createCreditNote(t, id, { actorUserId: null });
      const [credit] = await t<{ kind: string; credit_of_invoice_id: string; total: string; state: string; external_number: string | null }[]>`
        select kind, credit_of_invoice_id, total, state, external_number from invoices where id = ${creditId}`;
      expect(credit).toEqual({ kind: 'credit_note', credit_of_invoice_id: id, total: '-1210.00', state: 'draft', external_number: null });
      const issuedCredit = await issueInvoice(t, creditId, { actorUserId: null, issueDate: '2099-03-11', series: 'TSL' });
      expect(issuedCredit.number).toBe('TSL-2099-002');
    }, null);
  });

  it('does not let a draft be inserted already issued or numbered', async () => {
    await withRollback(async (t) => {
      expect((await savepointError(t, (sp) => sp`insert into invoices (title, state, external_number) values ('x', 'open', 'TSL-2099-500')`))?.message).toMatch(/start as drafts/);
      expect((await savepointError(t, (sp) => sp`insert into invoices (title, state, external_number) values ('x', 'draft', 'TSL-2099-501')`))?.message).toMatch(/invoices_draft_unnumbered/);
    });
  });
});

describe('gapless numbering', () => {
  it('gives two concurrent issues in separate transactions consecutive numbers, and a rollback leaves no gap', async () => {
    await cleanupNumbering();
    const [org] = await sql<{ id: string }[]>`insert into organizations (name) values ('F numbering test org') returning id`;
    const drafts: string[] = [];
    for (const n of [1, 2, 3, 4]) {
      drafts.push(
        await sql.begin(async (t) => {
          const trx = t as unknown as Tx;
          const id = await createInvoiceDraft(trx, { organizationId: org.id, title: `F numbering test ${n}`, actorUserId: null });
          await addInvoiceLine(trx, id, { name: 'Line', quantity: '1', unitPrice: '100.00' });
          return id;
        }),
      );
    }

    // Two issues race. A takes the counter row, B waits on it until A commits.
    let releaseA!: () => void;
    const aHolding = new Promise<void>((r) => (releaseA = r));
    let aIssued!: (n: string) => void;
    const aNumber = new Promise<string>((r) => (aIssued = r));
    const txA = sql.begin(async (t) => {
      const res = await issueInvoice(t as unknown as Tx, drafts[0], { actorUserId: null, issueDate: `${YEAR}-01-10`, series: SERIES });
      aIssued(res.number);
      await aHolding;
      return res.number;
    });
    const first = await aNumber;
    let bDone = false;
    const txB = sql
      .begin(async (t) => (await issueInvoice(t as unknown as Tx, drafts[1], { actorUserId: null, issueDate: `${YEAR}-01-10`, series: SERIES })).number)
      .then((n) => {
        bDone = true;
        return n;
      });
    await new Promise((r) => setTimeout(r, 300));
    expect(bDone).toBe(false); // B is queued on the locked counter row
    releaseA();
    const [a, b] = await Promise.all([txA, txB]);
    expect(a).toBe(first);
    expect([a, b]).toEqual([`${SERIES}-${YEAR}-001`, `${SERIES}-${YEAR}-002`]);

    // C takes 003 and rolls back while D waits. D gets 003, so the series has no gap.
    let releaseC!: () => void;
    const cHolding = new Promise<void>((r) => (releaseC = r));
    let cIssued!: (n: string) => void;
    const cNumber = new Promise<string>((r) => (cIssued = r));
    const txC = sql
      .begin(async (t) => {
        const res = await issueInvoice(t as unknown as Tx, drafts[2], { actorUserId: null, issueDate: `${YEAR}-01-11`, series: SERIES });
        cIssued(res.number);
        await cHolding;
        throw new Error('roll back C');
      })
      .catch((e: Error) => e.message);
    expect(await cNumber).toBe(`${SERIES}-${YEAR}-003`);
    const txD = sql.begin(async (t) => (await issueInvoice(t as unknown as Tx, drafts[3], { actorUserId: null, issueDate: `${YEAR}-01-11`, series: SERIES })).number);
    await new Promise((r) => setTimeout(r, 200));
    releaseC();
    expect(await txC).toBe('roll back C');
    expect(await txD).toBe(`${SERIES}-${YEAR}-003`);

    const rows = await sql<{ external_number: string | null; state: string }[]>`
      select external_number, state from invoices where id = any(${drafts}::uuid[]) order by external_number nulls last`;
    expect(rows).toEqual([
      { external_number: `${SERIES}-${YEAR}-001`, state: 'open' },
      { external_number: `${SERIES}-${YEAR}-002`, state: 'open' },
      { external_number: `${SERIES}-${YEAR}-003`, state: 'open' },
      { external_number: null, state: 'draft' },
    ]);
    const [counter] = await sql<{ last_number: number }[]>`select last_number from invoice_number_series where series = ${SERIES} and year = ${YEAR}`;
    expect(counter.last_number).toBe(3);
  });

  it('continues after the highest number already used in a year', async () => {
    await withRollback(async (t) => {
      const [{ max }] = await t<{ max: number | null }[]>`
        select max(substring(external_number from '^AST-2026-(\\d+)$')::int) as max from invoices where external_number like 'AST-2026-%'`;
      const [row] = await t<{ last_number: number }[]>`select last_number from invoice_number_series where series = 'AST' and year = 2026`;
      const { nextInvoiceNumber } = await import('../../lib/money/numbering');
      const n = await nextInvoiceNumber(t, 2026);
      const expected = Math.max(row?.last_number ?? 0, max ?? 0) + 1;
      expect(n).toBe(`AST-2026-${String(expected).padStart(3, '0')}`);
    });
  });
});
