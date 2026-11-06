/**
 * lib/money/vat.ts, invoice maths. Pure and exact (BigInt cents through lib/format.ts),
 * safe in client code.
 *
 *   const totals = invoiceTotals(lines, 'nl_21');
 *   totals.subtotal      '14500.00'
 *   totals.vatByRate     [{ rate: '21', base: '14500.00', vat: '3045.00' }]
 *   totals.vat           '3045.00'
 *   totals.total         '17545.00'
 *   totals.note          null, or 'Reverse charge' / 'Export outside the EU, 0% VAT'
 *
 * Rules (V1, to be signed off by the accountant):
 *   nl_21           Dutch VAT. Each line keeps its own rate (21, 9 or 0), new lines default to 21.
 *   nl_9            Dutch VAT, new lines default to 9. Lines keep their own rate.
 *   reverse_charge  EU business customer, every line 0%, the invoice says "Reverse charge".
 *   export          Customer outside the EU, every line 0%.
 *   outside_scope   No VAT applies, every line 0%.
 * A line's net is quantity times unit price, rounded to cents, less its discount
 * (rounded to cents). VAT is computed per rate on the summed net of that rate,
 * which is how Art. 226 shows it ("taxable amount per rate"). Credit notes use
 * negative quantities and the same maths.
 */
import { formatPercent, fromCents, multiplyMoney, toCents } from '../format';
import type { Option } from '../options';

export type VatTreatment = 'nl_21' | 'nl_9' | 'reverse_charge' | 'export' | 'outside_scope';

export const VAT_TREATMENT_OPTIONS: Option[] = [
  { value: 'nl_21', label: 'NL 21%' },
  { value: 'nl_9', label: 'NL 9%' },
  { value: 'reverse_charge', label: 'EU reverse charge' },
  { value: 'export', label: 'Export outside the EU, 0%' },
  { value: 'outside_scope', label: 'Outside the scope of VAT' },
];

const EU = new Set(['AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE']);

/** A starting treatment from the customer's country: NL 21%, another EU country reverse charge, elsewhere export. */
export function suggestTreatment(country: string | null | undefined): VatTreatment {
  const c = (country ?? '').trim().toUpperCase();
  if (!c || c === 'NL') return 'nl_21';
  return EU.has(c) ? 'reverse_charge' : 'export';
}

/** Rates a line may carry under a Dutch treatment. */
export const NL_LINE_RATES: Option[] = [
  { value: '21', label: '21%' },
  { value: '9', label: '9%' },
  { value: '0', label: '0%' },
];

export function isVatTreatment(v: unknown): v is VatTreatment {
  return typeof v === 'string' && VAT_TREATMENT_OPTIONS.some((o) => o.value === v);
}

/** Does this treatment charge Dutch VAT on the lines. */
export function chargesVat(treatment: VatTreatment): boolean {
  return treatment === 'nl_21' || treatment === 'nl_9';
}

/** The rate a new line gets under a treatment. */
export function defaultLineRate(treatment: VatTreatment): number {
  if (treatment === 'nl_21') return 21;
  if (treatment === 'nl_9') return 9;
  return 0;
}

/** The rate that actually applies to a line under a treatment. */
export function effectiveRate(treatment: VatTreatment, lineRate: string | number | null | undefined): string {
  if (!chargesVat(treatment)) return '0';
  const n = Number(lineRate ?? defaultLineRate(treatment));
  return String(Number.isFinite(n) ? n : defaultLineRate(treatment));
}

/** The words the invoice must carry for a treatment. */
export function treatmentNote(treatment: VatTreatment): string | null {
  if (treatment === 'reverse_charge') return 'Reverse charge';
  if (treatment === 'export') return 'Export outside the EU, 0% VAT';
  if (treatment === 'outside_scope') return 'Outside the scope of VAT';
  return null;
}

/** '12.5' -> '0.125', '21' -> '0.21'. Exact decimal shift, no float. */
function percentFactor(pct: string | number): string {
  const s = String(pct).trim();
  const m = s.match(/^(-)?(\d*)(?:\.(\d*))?$/);
  if (!m) throw new Error(`Not a percentage: ${pct}`);
  const digits = `${m[2] || '0'}${m[3] ?? ''}`;
  const scale = (m[3] ?? '').length + 2;
  const padded = digits.padStart(scale + 1, '0');
  return `${m[1] ?? ''}${padded.slice(0, padded.length - scale)}.${padded.slice(padded.length - scale)}`;
}

/** pct percent of an amount, rounded half up to cents once. percentOf('6559.99', 21) -> '1377.60'. */
export function percentOf(amount: string | number, pct: string | number): string {
  return multiplyMoney(amount, percentFactor(pct));
}

export type LineInput = {
  quantity: string | number;
  unit_price: string | number;
  discount_pct?: string | number | null;
  tax_rate?: string | number | null;
};

export type LineTotals = { gross: string; discount: string; net: string; rate: string };

/** One line, exact. */
export function lineTotals(line: LineInput, treatment: VatTreatment): LineTotals {
  const gross = multiplyMoney(line.unit_price, String(line.quantity));
  const discountPct = line.discount_pct === null || line.discount_pct === undefined || line.discount_pct === '' ? '0' : String(line.discount_pct);
  const discount = percentOf(gross, discountPct);
  const net = fromCents(toCents(gross) - toCents(discount));
  return { gross, discount, net, rate: effectiveRate(treatment, line.tax_rate) };
}

export type InvoiceTotals = {
  lines: LineTotals[];
  subtotal: string;
  discount: string;
  vatByRate: { rate: string; label: string; base: string; vat: string }[];
  vat: string;
  total: string;
  note: string | null;
};

/** Subtotal, VAT per rate and total for a set of lines. */
export function invoiceTotals(lines: LineInput[], treatment: VatTreatment): InvoiceTotals {
  const computed = lines.map((l) => lineTotals(l, treatment));
  const byRate = new Map<string, bigint>();
  for (const l of computed) byRate.set(l.rate, (byRate.get(l.rate) ?? 0n) + toCents(l.net));
  const rates = [...byRate.keys()].sort((a, b) => Number(b) - Number(a));
  const vatByRate = rates.map((rate) => {
    const base = fromCents(byRate.get(rate)!);
    const vat = percentOf(base, rate);
    const label = chargesVat(treatment) ? `VAT ${formatPercent(rate)}, NL` : treatmentNote(treatment) ?? 'VAT 0%';
    return { rate, label, base, vat };
  });
  const subtotalC = computed.reduce((a, l) => a + toCents(l.net), 0n);
  const vatC = vatByRate.reduce((a, r) => a + toCents(r.vat), 0n);
  return {
    lines: computed,
    subtotal: fromCents(subtotalC),
    discount: fromCents(computed.reduce((a, l) => a + toCents(l.discount), 0n)),
    vatByRate,
    vat: fromCents(vatC),
    total: fromCents(subtotalC + vatC),
    note: treatmentNote(treatment),
  };
}
