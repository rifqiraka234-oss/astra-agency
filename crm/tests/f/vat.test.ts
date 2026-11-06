import { describe, expect, it } from 'vitest';
import { invoiceTotals, lineTotals, percentOf } from '../../lib/money/vat';
import { ageingBucket, canMove, daysLate } from '../../lib/money/ageing';
import { formatInvoiceNumber, parseInvoiceNumber } from '../../lib/money/numbering';
import { projectBudget, parseHours } from '../../lib/delivery/projects';

const LINES = [
  { quantity: '1', unit_price: '6500.00', discount_pct: '0', tax_rate: '21' },
  { quantity: '2', unit_price: '33.33', discount_pct: '10', tax_rate: '21' },
  { quantity: '1', unit_price: '100.00', discount_pct: '0', tax_rate: '9' },
];

describe('VAT totals per treatment', () => {
  it('NL 21% keeps each line rate and rounds VAT per rate', () => {
    const t = invoiceTotals(LINES, 'nl_21');
    expect(t.lines[1]).toEqual({ gross: '66.66', discount: '6.67', net: '59.99', rate: '21' });
    expect(t.subtotal).toBe('6659.99');
    expect(t.vatByRate).toEqual([
      { rate: '21', label: 'VAT 21%, NL', base: '6559.99', vat: '1377.60' },
      { rate: '9', label: 'VAT 9%, NL', base: '100.00', vat: '9.00' },
    ]);
    expect(t.vat).toBe('1386.60');
    expect(t.total).toBe('8046.59');
    expect(t.note).toBeNull();
  });

  it('NL 9% puts lines without their own rate at 9%', () => {
    const t = invoiceTotals([{ quantity: '3', unit_price: '19.99' }], 'nl_9');
    expect(t.subtotal).toBe('59.97');
    expect(t.vatByRate).toEqual([{ rate: '9', label: 'VAT 9%, NL', base: '59.97', vat: '5.40' }]);
    expect(t.total).toBe('65.37');
  });

  it('EU reverse charge charges no VAT and carries the note', () => {
    const t = invoiceTotals(LINES, 'reverse_charge');
    expect(t.subtotal).toBe('6659.99');
    expect(t.vat).toBe('0.00');
    expect(t.total).toBe('6659.99');
    expect(t.note).toBe('Reverse charge');
    expect(t.vatByRate).toHaveLength(1);
    expect(t.vatByRate[0].label).toBe('Reverse charge');
  });

  it('export outside the EU is 0%', () => {
    const t = invoiceTotals(LINES, 'export');
    expect(t.vat).toBe('0.00');
    expect(t.total).toBe('6659.99');
    expect(t.note).toBe('Export outside the EU, 0% VAT');
  });

  it('a credit note is the exact negative of the invoice', () => {
    const neg = LINES.map((l) => ({ ...l, quantity: `-${l.quantity}` }));
    const t = invoiceTotals(neg, 'nl_21');
    expect(t.subtotal).toBe('-6659.99');
    expect(t.vat).toBe('-1386.60');
    expect(t.total).toBe('-8046.59');
  });

  it('rounds once, half up', () => {
    expect(percentOf('0.05', 9)).toBe('0.00');
    expect(percentOf('0.50', 9)).toBe('0.05'); // 0.045 rounds up
    expect(percentOf('100', '12.5')).toBe('12.50');
    expect(lineTotals({ quantity: '0.5', unit_price: '85.01' }, 'nl_21').net).toBe('42.51');
  });
});

describe('ageing and states', () => {
  it('buckets by days past due', () => {
    expect(ageingBucket('2026-11-20', '2026-11-06')).toBe('current');
    expect(ageingBucket('2026-11-06', '2026-11-06')).toBe('current');
    expect(daysLate('2026-10-29', '2026-11-06')).toBe(8);
    expect(ageingBucket('2026-10-29', '2026-11-06')).toBe('1_30');
    expect(ageingBucket('2026-09-20', '2026-11-06')).toBe('31_60');
    expect(ageingBucket('2026-08-01', '2026-11-06')).toBe('60_plus');
  });

  it('allows only the documented moves', () => {
    expect(canMove('draft', 'open')).toBe(true);
    expect(canMove('open', 'paid')).toBe(true);
    expect(canMove('late', 'paid')).toBe(true);
    expect(canMove('paid', 'open')).toBe(false);
    expect(canMove('void', 'open')).toBe(false);
    expect(canMove('draft', 'paid')).toBe(false);
  });

  it('formats and parses numbers', () => {
    expect(formatInvoiceNumber('AST', 2026, 53)).toBe('AST-2026-053');
    expect(formatInvoiceNumber('AST', 2026, 1234)).toBe('AST-2026-1234');
    expect(parseInvoiceNumber('AST-2026-041')).toEqual({ series: 'AST', year: 2026, n: 41 });
  });
});

describe('project budget', () => {
  it('values billable time at budget over hours', () => {
    const b = projectBudget({ budget_amount: '3400.00', budget_hours: '40.00', hourly_rate: null }, { total_minutes: 1860, billable_minutes: 1860 });
    expect(b.rate).toBe('85.00');
    expect(b.usedValue).toBe('2635.00');
    expect(b.percent).toBe(77.5);
    expect(b.tone).toBe('green');
  });

  it('parses hours in three ways', () => {
    expect(parseHours('1.5')).toBe(90);
    expect(parseHours('1,25')).toBe(75);
    expect(parseHours('1:30')).toBe(90);
    expect(parseHours('45m')).toBe(45);
    expect(parseHours('abc')).toBeNull();
  });
});
