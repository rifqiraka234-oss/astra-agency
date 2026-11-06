/**
 * lib/money/ageing.ts, receivables ageing and the invoice state machine. Pure.
 *
 *   ageingBucket('2026-10-29', '2026-11-06')   -> '1_30'   (8 days late)
 *   daysLate('2026-10-29', '2026-11-06')       -> 8
 *   canMove('open', 'paid')                    -> true
 *
 * Days late are computed from the due date and today, never stored. An invoice
 * counts in the ageing view while it is open or late.
 */
import { daysBetween } from '../format';
import type { Option } from '../options';

export type InvoiceState = 'draft' | 'open' | 'paid' | 'late' | 'void';

export type AgeingBucket = 'current' | '1_30' | '31_60' | '60_plus';

export const AGEING_BUCKETS: (Option & { value: AgeingBucket })[] = [
  { value: 'current', label: 'Current' },
  { value: '1_30', label: '1 to 30 days late' },
  { value: '31_60', label: '31 to 60 days late' },
  { value: '60_plus', label: 'Over 60 days late' },
];

/** Whole days past the due date, 0 when not yet due or no due date. */
export function daysLate(dueDate: string | null | undefined, today: string): number {
  if (!dueDate) return 0;
  return Math.max(0, daysBetween(dueDate, today));
}

export function ageingBucket(dueDate: string | null | undefined, today: string): AgeingBucket {
  const d = daysLate(dueDate, today);
  if (d <= 0) return 'current';
  if (d <= 30) return '1_30';
  if (d <= 60) return '31_60';
  return '60_plus';
}

/** Is the invoice waiting for money. */
export function isReceivable(state: string): boolean {
  return state === 'open' || state === 'late';
}

/** Allowed moves, the same table the invoices_guard trigger enforces. draft to open goes through issueInvoice. */
export const INVOICE_MOVES: Record<InvoiceState, InvoiceState[]> = {
  draft: ['open', 'void'],
  open: ['paid', 'late', 'void'],
  late: ['paid', 'open', 'void'],
  paid: [],
  void: [],
};

export function canMove(from: string, to: string): boolean {
  return (INVOICE_MOVES[from as InvoiceState] ?? []).includes(to as InvoiceState);
}
