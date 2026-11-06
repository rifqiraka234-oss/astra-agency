/**
 * lib/sales/totals.ts, line item maths for deals and quotes. Pure and exact
 * (bigint cents), safe in client code.
 *
 *   lineNet({ quantity: '2', unit_price: '1500', discount_pct: '10' })   -> '2700.00'
 *   lineTotals(lines)  -> { subtotal: '14500.00', vat: '3045.00', total: '17545.00',
 *                            byRate: [{ rate: '21.00', base: '14500.00', vat: '3045.00' }] }
 *
 * Net per line is quantity times unit price, less the discount, rounded half up
 * to cents. VAT is worked out per rate on the summed base (as an invoice shows
 * it), so rounding happens once per rate, not once per line.
 */
import { fromCents, toCents } from '../format';

export type LineMoneyInput = {
  quantity: string | number;
  unit_price: string | number;
  discount_pct?: string | number | null;
  tax_rate?: string | number | null;
};

/** Default NL rate for new lines. */
export const DEFAULT_TAX_RATE = '21.00';

/** A decimal string as an integer scaled by 10^places, half up past the last place. */
function scaled(value: string | number | null | undefined, places: number): bigint {
  if (value === null || value === undefined || value === '') return 0n;
  const s = typeof value === 'number' ? value.toFixed(places + 1) : String(value).trim();
  const m = s.match(/^(-)?(\d*)(?:\.(\d*))?$/);
  if (!m) throw new Error(`Not a number: ${value}`);
  const frac = (m[3] ?? '').padEnd(places + 1, '0');
  let n = BigInt(m[2] || '0') * 10n ** BigInt(places) + BigInt(frac.slice(0, places) || '0');
  if (Number(frac[places]) >= 5) n += 1n;
  return m[1] ? -n : n;
}

/** Divide and round half away from zero. */
function divRound(a: bigint, b: bigint): bigint {
  const neg = a < 0n !== b < 0n;
  const x = a < 0n ? -a : a;
  const y = b < 0n ? -b : b;
  const q = (x * 2n + y) / (2n * y);
  return neg ? -q : q;
}

/** Net amount of one line in cents. */
export function lineNetCents(line: LineMoneyInput): bigint {
  const price = toCents(line.unit_price);
  const qty = scaled(line.quantity, 2); // hundredths
  const discBp = scaled(line.discount_pct ?? 0, 2); // hundredths of a percent
  // price (cents) * qty/100 * (10000 - disc)/10000
  return divRound(price * qty * (10000n - discBp), 100n * 10000n);
}

/** Net amount of one line as a numeric string. */
export function lineNet(line: LineMoneyInput): string {
  return fromCents(lineNetCents(line));
}

/** Discount taken off one line, as a numeric string. */
export function lineDiscount(line: LineMoneyInput): string {
  const gross = divRound(toCents(line.unit_price) * scaled(line.quantity, 2), 100n);
  return fromCents(gross - lineNetCents(line));
}

export type LineTotals = {
  subtotal: string;
  vat: string;
  total: string;
  discount: string;
  byRate: { rate: string; base: string; vat: string }[];
};

/** Subtotal excluding VAT, VAT per rate and the total. */
export function lineTotals(lines: LineMoneyInput[]): LineTotals {
  const bases = new Map<string, bigint>();
  let subtotal = 0n;
  let discount = 0n;
  for (const l of lines) {
    const net = lineNetCents(l);
    subtotal += net;
    discount += toCents(lineDiscount(l));
    const rateKey = fromCents(scaled(l.tax_rate ?? DEFAULT_TAX_RATE, 2));
    bases.set(rateKey, (bases.get(rateKey) ?? 0n) + net);
  }
  let vat = 0n;
  const byRate = [...bases.entries()]
    .sort((a, b) => Number(b[0]) - Number(a[0]))
    .map(([rate, base]) => {
      const v = divRound(base * scaled(rate, 2), 10000n);
      vat += v;
      return { rate, base: fromCents(base), vat: fromCents(v) };
    });
  return { subtotal: fromCents(subtotal), vat: fromCents(vat), total: fromCents(subtotal + vat), discount: fromCents(discount), byRate };
}

/** '21.00' -> '21%', '9.50' -> '9.5%'. */
export function rateLabel(rate: string | number): string {
  const n = Number(rate);
  return `${Number.isInteger(n) ? n : n.toString()}%`;
}
