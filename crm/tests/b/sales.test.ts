import { afterAll, describe, expect, it } from 'vitest';
import { closeDb, type Tx } from '../../lib/db';
import { moveStage, StageMoveError } from '../../lib/stages';
import {
  addDealContact, addLineItem, createDeal, createLead, createQuote, deleteLineItem, disqualifyLead, qualifyLead,
  removeDealContact, SalesError, updateLineItem, updateQuote,
} from '../../lib/sales/service';
import { lineNet, lineTotals } from '../../lib/sales/totals';
import { stageId, withRollback } from '../helpers';

afterAll(() => closeDb());

type Fixture = { user: { id: string; name: string }; orgId: string; contactId: string; leadId: string };

/** A user, an organization, a contact with email and LinkedIn, and a lead in Connected. */
async function fixture(t: Tx, tag = 'b'): Promise<Fixture> {
  const [user] = await t<{ id: string; name: string }[]>`
    insert into users (email, name, role) values (${`sales-${tag}@astra.local`}, 'Sales Tester', 'admin') returning id, name`;
  const [org] = await t<{ id: string }[]>`insert into organizations (name) values (${`Test Fietsen ${tag}`}) returning id`;
  const [contact] = await t<{ id: string }[]>`
    insert into contacts (first_name, last_name, primary_org_id, linkedin_url, linkedin_url_normalised)
    values ('Hanna', ${`Tester ${tag}`}, ${org.id}, ${`https://www.linkedin.com/in/hanna-tester-${tag}/`}, ${`linkedin.com/in/hanna-tester-${tag}`})
    returning id`;
  await t`insert into contact_emails (contact_id, email, is_primary) values (${contact.id}, ${`Hanna.${tag}@Test-Fietsen.example`}, true)`;
  const connected = await stageId(t, 'lead', 'connected');
  const [lead] = await t<{ id: string }[]>`
    insert into leads (contact_id, organization_id, pipeline_id, stage_id, owner_user_id, source, angle, angle_worth_eur)
    select ${contact.id}, ${org.id}, pipeline_id, id, ${user.id}, 'lemlist', 'Bookings lost to a phone only flow', 4500
      from pipeline_stages where id = ${connected}
    returning id`;
  return { user, orgId: org.id, contactId: contact.id, leadId: lead.id };
}

async function events(t: Tx, aggregateId: string) {
  const rows = await t<{ type: string }[]>`select type from domain_events where aggregate_id = ${aggregateId} order by id`;
  return rows.map((r) => r.type);
}

describe('qualify a lead (rolled back)', () => {
  it('needs the first Sales stage gate, then creates the linked deal, moves the lead and emits events', async () => {
    await withRollback(async (t) => {
      const f = await fixture(t, 'q1');

      // Discovery booked needs a meeting date, and a failed attempt changes nothing.
      const err = await qualifyLead(t, { leadId: f.leadId, actor: f.user }).catch((e) => e);
      expect(err).toBeInstanceOf(StageMoveError);
      expect(err.code).toBe('required_fields');
      expect(err.missing.map((m: { field_key: string }) => m.field_key)).toEqual(['meeting_at']);
      const [{ n: dealsBefore }] = await t<{ n: number }[]>`select count(*)::int as n from deals where lead_id = ${f.leadId}`;
      expect(dealsBefore).toBe(0);

      const { dealId, stage } = await qualifyLead(t, {
        leadId: f.leadId,
        actor: f.user,
        dealName: 'Lesson booking app',
        values: { meeting_at: '2026-11-12T10:00' },
      });
      expect(stage.key).toBe('discovery_booked');

      const [deal] = await t<{ name: string; organization_id: string; lead_id: string; amount: string; stage_key: string; owner_user_id: string; angle: string; meeting_at: Date }[]>`
        select d.name, d.organization_id, d.lead_id, d.amount, s.key as stage_key, d.owner_user_id, d.angle, d.meeting_at
          from deals d join pipeline_stages s on s.id = d.stage_id where d.id = ${dealId}`;
      expect(deal).toMatchObject({
        name: 'Lesson booking app',
        organization_id: f.orgId,
        lead_id: f.leadId,
        amount: '4500.00', // from the lead's worth
        stage_key: 'discovery_booked',
        owner_user_id: f.user.id,
        angle: 'Bookings lost to a phone only flow',
      });
      // 10:00 Amsterdam wall clock, stored as an instant.
      expect(deal.meeting_at).toBeInstanceOf(Date);

      const dc = await t<{ contact_id: string; role: string; is_primary: boolean }[]>`
        select contact_id, role, is_primary from deal_contacts where deal_id = ${dealId}`;
      expect(dc).toEqual([{ contact_id: f.contactId, role: 'decision_maker', is_primary: true }]);

      const [lead] = await t<{ stage_key: string; converted_deal_id: string; qualified_at: Date | null }[]>`
        select s.key as stage_key, l.converted_deal_id, l.qualified_at
          from leads l join pipeline_stages s on s.id = l.stage_id where l.id = ${f.leadId}`;
      expect(lead.stage_key).toBe('qualified');
      expect(lead.converted_deal_id).toBe(dealId);
      expect(lead.qualified_at).not.toBeNull();

      const dealHistory = await t<{ from_stage_id: string | null; amount: string; probability: number }[]>`
        select from_stage_id, amount, probability from stage_transitions where object_type = 'deal' and record_id = ${dealId}`;
      expect(dealHistory).toEqual([{ from_stage_id: null, amount: '4500.00', probability: 15 }]);

      const [org] = await t<{ lifecycle_stage: string }[]>`select lifecycle_stage from organizations where id = ${f.orgId}`;
      expect(org.lifecycle_stage).toBe('opportunity');

      const acts = await t<{ title: string; deal: boolean; lead: boolean }[]>`
        select a.title,
               exists (select 1 from activity_links l where l.activity_id = a.id and l.deal_id = ${dealId}) as deal,
               exists (select 1 from activity_links l where l.activity_id = a.id and l.lead_id = ${f.leadId}) as lead
          from activities a where a.title like 'Lead qualified%'
           and a.id in (select activity_id from activity_links where lead_id = ${f.leadId})`;
      expect(acts).toEqual([{ title: 'Lead qualified, deal created in Discovery booked', deal: true, lead: true }]);

      expect(await events(t, dealId)).toEqual(['record.created', 'deal.stage_changed']);
      expect(await events(t, f.leadId)).toEqual(['lead.stage_changed']);

      // Twice is refused and points at the deal.
      const again = await qualifyLead(t, { leadId: f.leadId, actor: f.user, values: { meeting_at: '2026-11-12T10:00' } }).catch((e) => e);
      expect(again).toBeInstanceOf(SalesError);
      expect(again).toMatchObject({ code: 'already_qualified', href: `/deals/${dealId}` });
    });
  });
});

describe('disqualify a lead (rolled back)', () => {
  it('do not contact suppresses the contact by id, LinkedIn and email, and blocks new leads', async () => {
    await withRollback(async (t) => {
      const f = await fixture(t, 'd1');
      const { suppressed } = await disqualifyLead(t, { leadId: f.leadId, reason: 'do_not_contact', note: 'Asked us to stop', actor: f.user });
      expect(suppressed).toBe(3);

      const rows = await t<{ kind: string; value: string }[]>`
        select kind, value from suppression_list where contact_id = ${f.contactId} order by kind`;
      expect(rows).toEqual([
        { kind: 'contact', value: f.contactId },
        { kind: 'email', value: 'hanna.d1@test-fietsen.example' },
        { kind: 'linkedin', value: 'linkedin.com/in/hanna-tester-d1' },
      ]);
      const [c] = await t<{ do_not_contact: boolean }[]>`select do_not_contact from contacts where id = ${f.contactId}`;
      expect(c.do_not_contact).toBe(true);

      const [lead] = await t<{ stage_key: string; disqualify_reason: string; disqualified_at: Date | null }[]>`
        select s.key as stage_key, l.disqualify_reason, l.disqualified_at from leads l join pipeline_stages s on s.id = l.stage_id where l.id = ${f.leadId}`;
      expect(lead).toMatchObject({ stage_key: 'disqualified', disqualify_reason: 'do_not_contact' });
      expect(lead.disqualified_at).not.toBeNull();
      expect(await events(t, f.leadId)).toEqual(['lead.stage_changed']);

      // A suppressed contact can't get a new lead or be qualified.
      await expect(createLead(t, { actor: f.user, contactId: f.contactId })).rejects.toMatchObject({ code: 'suppressed' });
      await expect(qualifyLead(t, { leadId: f.leadId, actor: f.user, values: { meeting_at: '2026-11-12T10:00' } })).rejects.toMatchObject({
        code: 'suppressed',
      });
    });
  });

  it('other reasons do not suppress, and an unknown reason is refused', async () => {
    await withRollback(async (t) => {
      const f = await fixture(t, 'd2');
      await expect(disqualifyLead(t, { leadId: f.leadId, reason: 'because', actor: f.user })).rejects.toBeInstanceOf(StageMoveError);
      const { suppressed } = await disqualifyLead(t, { leadId: f.leadId, reason: 'no_strong_angle', actor: f.user });
      expect(suppressed).toBe(0);
      const [{ n }] = await t<{ n: number }[]>`select count(*)::int as n from suppression_list where contact_id = ${f.contactId}`;
      expect(n).toBe(0);
      const [c] = await t<{ do_not_contact: boolean }[]>`select do_not_contact from contacts where id = ${f.contactId}`;
      expect(c.do_not_contact).toBe(false);
    });
  });

  it('a second open lead for the same contact is refused', async () => {
    await withRollback(async (t) => {
      const f = await fixture(t, 'd3');
      await expect(createLead(t, { actor: f.user, contactId: f.contactId })).rejects.toMatchObject({ code: 'duplicate_lead', href: `/leads/${f.leadId}` });
      // A new contact and organization by name work, and the lead enters New with history.
      const { leadId } = await createLead(t, { actor: f.user, newContact: { firstName: 'Piet', lastName: 'de Vries' }, newOrganization: { name: 'Piet Bouw' } });
      const [row] = await t<{ stage_key: string; contact: string; org: string; transitions: number }[]>`
        select s.key as stage_key, c.full_name as contact, o.name as org,
               (select count(*)::int from stage_transitions st where st.object_type = 'lead' and st.record_id = l.id) as transitions
          from leads l join pipeline_stages s on s.id = l.stage_id join contacts c on c.id = l.contact_id
          join organizations o on o.id = l.organization_id where l.id = ${leadId}`;
      expect(row).toEqual({ stage_key: 'new', contact: 'Piet de Vries', org: 'Piet Bouw', transitions: 1 });
    });
  });
});

describe('stage gates on deals (rolled back)', () => {
  it('create into a gated stage needs its fields; lost needs a lost reason; moving back needs a reason', async () => {
    await withRollback(async (t) => {
      const f = await fixture(t, 'g1');
      const negotiation = await stageId(t, 'sales', 'negotiation');
      const proposal = await stageId(t, 'sales', 'proposal_sent');
      const lost = await stageId(t, 'sales', 'lost');
      const won = await stageId(t, 'sales', 'won');

      const err = await createDeal(t, { actor: f.user, name: 'Gate test', organizationId: f.orgId, stageId: negotiation }).catch((e) => e);
      expect(err).toBeInstanceOf(StageMoveError);
      expect(err.missing.map((m: { field_key: string }) => m.field_key).sort()).toEqual(['decision_date', 'next_step']);

      await expect(createDeal(t, { actor: f.user, name: 'Closed start', stageId: won })).rejects.toMatchObject({ code: 'invalid' });

      const { dealId } = await createDeal(t, {
        actor: f.user,
        name: 'Gate test',
        organizationId: f.orgId,
        contactId: f.contactId,
        stageId: negotiation,
        amount: '€12,000',
        values: { next_step: 'Pricing call', decision_date: '2026-11-20' },
      });
      const [d] = await t<{ amount: string; next_step: string; decision_date: string }[]>`
        select amount, next_step, decision_date from deals where id = ${dealId}`;
      expect(d).toEqual({ amount: '12000.00', next_step: 'Pricing call', decision_date: '2026-11-20' });
      expect(await events(t, dealId)).toEqual(['record.created', 'deal.stage_changed']);

      // Lost without a reason is blocked and lists the field.
      const lostErr = await moveStage(t, { objectType: 'deal', recordId: dealId, toStageId: lost, actor: { type: 'user', id: f.user.id } }).catch((e) => e);
      expect(lostErr).toMatchObject({ code: 'required_fields', missing: [expect.objectContaining({ field_key: 'lost_reason', input_type: 'select' })] });

      // Back to Proposal sent needs a reason (its own fields, amount and quote, must be there too).
      await t`update deals set quote_ref = 'Q-TEST-1' where id = ${dealId}`;
      await expect(
        moveStage(t, { objectType: 'deal', recordId: dealId, toStageId: proposal, actor: { type: 'user', id: f.user.id } }),
      ).rejects.toMatchObject({ code: 'reason_required' });
      const back = await moveStage(t, { objectType: 'deal', recordId: dealId, toStageId: proposal, reason: 'Scope changed', actor: { type: 'user', id: f.user.id } });
      expect(back.changed).toBe(true);

      const res = await moveStage(t, { objectType: 'deal', recordId: dealId, toStageId: lost, values: { lost_reason: 'no_budget' }, actor: { type: 'user', id: f.user.id } });
      expect(res.toStage.state).toBe('lost');
      // Failed attempts emit nothing: created, entered, moved back, lost.
      expect(await events(t, dealId)).toEqual(['record.created', 'deal.stage_changed', 'deal.stage_changed', 'deal.stage_changed', 'deal.lost']);
    });
  });
});

describe('line item totals', () => {
  it('works out net per line, VAT per rate and the total exactly', () => {
    // The Deal design: four lines, subtotal 14,500, VAT 21% 3,045.
    const design = [
      { quantity: '1', unit_price: '6500', discount_pct: '0', tax_rate: '21' },
      { quantity: '1', unit_price: '3000', discount_pct: '0', tax_rate: '21' },
      { quantity: '1', unit_price: '3500', discount_pct: '0', tax_rate: '21' },
      { quantity: '1', unit_price: '1500', discount_pct: '0', tax_rate: '21' },
    ];
    expect(lineTotals(design)).toEqual({
      subtotal: '14500.00',
      vat: '3045.00',
      total: '17545.00',
      discount: '0.00',
      byRate: [{ rate: '21.00', base: '14500.00', vat: '3045.00' }],
    });
    // Discounts and fractional quantities round half up to cents.
    expect(lineNet({ quantity: '2', unit_price: '1500', discount_pct: '10' })).toBe('2700.00');
    expect(lineNet({ quantity: '1.5', unit_price: '99.99', discount_pct: '0' })).toBe('149.99'); // 149.985
    expect(lineNet({ quantity: '3', unit_price: '0.10', discount_pct: '33.33' })).toBe('0.20'); // 0.200010
    // Mixed rates, VAT per rate on the summed base.
    const mixed = lineTotals([
      { quantity: '1', unit_price: '100.05', tax_rate: '21' },
      { quantity: '1', unit_price: '100.05', tax_rate: '21' },
      { quantity: '1', unit_price: '50', tax_rate: '9' },
      { quantity: '1', unit_price: '200', tax_rate: '0' },
    ]);
    expect(mixed.subtotal).toBe('450.10');
    expect(mixed.byRate).toEqual([
      { rate: '21.00', base: '200.10', vat: '42.02' }, // 42.021
      { rate: '9.00', base: '50.00', vat: '4.50' },
      { rate: '0.00', base: '200.00', vat: '0.00' },
    ]);
    expect(mixed.vat).toBe('46.52');
    expect(mixed.total).toBe('496.62');
    expect(lineTotals([])).toMatchObject({ subtotal: '0.00', vat: '0.00', total: '0.00', byRate: [] });
  });

  it('line item edits keep the deal amount on the subtotal, and a quote snapshots the lines (rolled back)', async () => {
    await withRollback(async (t) => {
      const f = await fixture(t, 'l1');
      const { dealId } = await createDeal(t, { actor: f.user, name: 'Lines test', organizationId: f.orgId, values: { meeting_at: '2026-11-12T10:00' } });
      const a = await addLineItem(t, dealId, { name: 'Booking flow', quantity: '1', unitPrice: '6500' });
      expect(a.subtotal).toBe('6500.00');
      const b = await addLineItem(t, dealId, { name: 'Staff dashboard', quantity: '2', unitPrice: '1750', discountPct: '10' });
      expect(b.subtotal).toBe('9650.00');
      await updateLineItem(t, a.id, { quantity: '2' });
      const [d1] = await t<{ amount: string }[]>`select amount from deals where id = ${dealId}`;
      expect(d1.amount).toBe('16150.00');
      await expect(addLineItem(t, dealId, { quantity: '1' })).rejects.toMatchObject({ code: 'invalid' });

      const q = await createQuote(t, dealId, { actor: f.user });
      expect(q.version).toBe(1);
      expect(q.number).toMatch(/^Q-\d{4}-\d{3}$/);
      const snap = await t<{ name: string; quantity: string }[]>`select name, quantity from line_items where quote_id = ${q.id} order by position`;
      expect(snap).toEqual([
        { name: 'Booking flow', quantity: '2.00' },
        { name: 'Staff dashboard', quantity: '2.00' },
      ]);
      const [ref] = await t<{ quote_ref: string }[]>`select quote_ref from deals where id = ${dealId}`;
      expect(ref.quote_ref).toBe(q.number);
      await updateQuote(t, q.id, { status: 'sent', actor: f.user });
      const [sent] = await t<{ status: string; sent_at: Date | null }[]>`select status, sent_at from quotes where id = ${q.id}`;
      expect(sent.status).toBe('sent');
      expect(sent.sent_at).not.toBeNull();
      const q2 = await createQuote(t, dealId, { actor: f.user });
      expect(q2.version).toBe(2);
      expect(q2.number).not.toBe(q.number);

      // Removing a line leaves the quote alone and moves the amount.
      await deleteLineItem(t, b.id);
      const [d2] = await t<{ amount: string }[]>`select amount from deals where id = ${dealId}`;
      expect(d2.amount).toBe('13000.00');
      const [{ n }] = await t<{ n: number }[]>`select count(*)::int as n from line_items where quote_id = ${q.id}`;
      expect(n).toBe(2);

      // Contacts with roles, one primary at a time.
      const [other] = await t<{ id: string }[]>`insert into contacts (first_name, last_name) values ('Tom', 'Bakker l1') returning id`;
      await addDealContact(t, { dealId, contactId: f.contactId, role: 'decision_maker', isPrimary: true });
      const dc = await addDealContact(t, { dealId, contactId: other.id, role: 'champion', roleNote: 'Day to day user', isPrimary: true });
      const roles = await t<{ contact_id: string; role: string; is_primary: boolean }[]>`
        select contact_id, role, is_primary from deal_contacts where deal_id = ${dealId} order by role`;
      expect(roles).toEqual([
        { contact_id: other.id, role: 'champion', is_primary: true },
        { contact_id: f.contactId, role: 'decision_maker', is_primary: false },
      ]);
      await removeDealContact(t, dc.id);
      const [{ n: left }] = await t<{ n: number }[]>`select count(*)::int as n from deal_contacts where deal_id = ${dealId}`;
      expect(left).toBe(1);
    });
  });
});
