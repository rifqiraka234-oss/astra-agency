/**
 * lib/reasons.ts, the managed reason lists (table reason_options, migration 700):
 * why a lead was disqualified and why a deal was lost. Admins edit them in
 * /settings/reasons. Records store the key; the label can be renamed any time.
 *
 *   const reasons = await listReasons('lead_disqualify');             // active, in order
 *   const all = await listReasons('deal_lost', { includeArchived: true });
 *   await assertActiveReason(t, 'deal_lost', 'no_budget');           // throws ReasonError
 *   reasonLabel(all, deal.lost_reason)                                // 'No budget'
 *
 * The database is the truth: a trigger on leads and deals refuses a key that is
 * not active, so imports and scripts are held to the same list.
 */
import { sql, type Db } from './db';

export type ReasonType = 'lead_disqualify' | 'deal_lost';

export type ReasonOption = { id: string; key: string; label: string; position: number; is_archived: boolean };

/** Which column holds the reason (and the note) when a record enters a lost stage. */
export const REASON_FIELDS: Record<'lead' | 'deal', { type: ReasonType; field: 'disqualify_reason' | 'lost_reason'; note: 'disqualify_note' | 'lost_note'; label: string }> = {
  lead: { type: 'lead_disqualify', field: 'disqualify_reason', note: 'disqualify_note', label: 'Disqualify reason' },
  deal: { type: 'deal_lost', field: 'lost_reason', note: 'lost_note', label: 'Lost reason' },
};

export const REASON_TYPE_LABELS: Record<ReasonType, string> = {
  lead_disqualify: 'Lead disqualify reasons',
  deal_lost: 'Deal lost reasons',
};

export class ReasonError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ReasonError';
  }
}

export async function listReasons(type: ReasonType, opts: { includeArchived?: boolean } = {}, db: Db = sql): Promise<ReasonOption[]> {
  return db<ReasonOption[]>`
    select id, key, label, position, is_archived from reason_options
     where object_type = ${type} and (${Boolean(opts.includeArchived)} or not is_archived)
     order by is_archived, position, label`;
}

/** { value, label } pairs for a Select. */
export function reasonSelectOptions(reasons: ReasonOption[]): { value: string; label: string }[] {
  return reasons.filter((r) => !r.is_archived).map((r) => ({ value: r.key, label: r.label }));
}

/** The label of a stored key, archived ones included. Unknown keys show as written. */
export function reasonLabel(reasons: ReasonOption[], key: string | null | undefined): string {
  if (!key) return '';
  return reasons.find((r) => r.key === key)?.label ?? key.replace(/_/g, ' ');
}

/** True when the key is an active reason of the list. */
export async function isActiveReason(db: Db, type: ReasonType, key: string | null | undefined): Promise<boolean> {
  if (!key) return false;
  const [row] = await db<{ ok: boolean }[]>`
    select exists (select 1 from reason_options where object_type = ${type} and key = ${key} and not is_archived) as ok`;
  return Boolean(row?.ok);
}

/** Throws ReasonError unless the key is an active reason. */
export async function assertActiveReason(db: Db, type: ReasonType, key: string | null | undefined): Promise<string> {
  const k = typeof key === 'string' ? key.trim() : '';
  if (!k) throw new ReasonError(type === 'lead_disqualify' ? 'Pick a reason to disqualify' : 'Pick a lost reason');
  if (!(await isActiveReason(db, type, k))) throw new ReasonError('That reason is archived or unknown, pick one from the list');
  return k;
}
