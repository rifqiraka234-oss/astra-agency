/**
 * lib/money/numbering.ts, gapless invoice numbers (AST-2026-053).
 *
 *   const number = await nextInvoiceNumber(t, 2026);          // inside the issuing transaction
 *
 * One row per series and year in invoice_number_series, locked with
 * SELECT ... FOR UPDATE, so two people issuing at once queue on the row and get
 * consecutive numbers, and a rolled back issue hands its number back (a Postgres
 * sequence would leave a gap). The first number of a year continues after the
 * highest number already on an invoice of that series and year, so the sample
 * and imported numbers are never reused.
 */
import type { Tx } from '../db';

export const DEFAULT_SERIES = 'AST';

export function formatInvoiceNumber(series: string, year: number, n: number): string {
  return `${series}-${year}-${String(n).padStart(3, '0')}`;
}

/** 'AST-2026-041' -> { series: 'AST', year: 2026, n: 41 }. */
export function parseInvoiceNumber(number: string): { series: string; year: number; n: number } | null {
  const m = number.match(/^([A-Z]{2,5})-(\d{4})-(\d+)$/);
  return m ? { series: m[1], year: Number(m[2]), n: Number(m[3]) } : null;
}

/** Take the next number of a series and year. Call inside the transaction that issues the invoice. */
export async function nextInvoiceNumber(t: Tx, year: number, series: string = DEFAULT_SERIES): Promise<string> {
  if (!/^[A-Z]{2,5}$/.test(series)) throw new Error(`Bad invoice series ${series}`);
  if (!Number.isInteger(year) || year < 2000 || year > 2999) throw new Error(`Bad invoice year ${year}`);
  const pattern = `^${series}-${year}-(\\d+)$`;
  await t`
    insert into invoice_number_series (series, year, last_number)
    select ${series}, ${year}, coalesce(max(substring(external_number from ${pattern})::int), 0)
      from invoices where external_number ~ ${pattern}
    on conflict (series, year) do nothing`;
  const [row] = await t<{ last_number: number }[]>`
    select last_number from invoice_number_series where series = ${series} and year = ${year} for update`;
  const next = row.last_number + 1;
  await t`update invoice_number_series set last_number = ${next} where series = ${series} and year = ${year}`;
  return formatInvoiceNumber(series, year, next);
}
