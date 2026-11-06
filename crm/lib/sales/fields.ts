/**
 * lib/sales/fields.ts, how the deal and lead property panels read their forms,
 * and how a thrown error becomes a result a client component can show. Pure.
 *
 *   const { patch, errors } = parsePatch(DEAL_FIELD_SPECS, fd);   // only keys present in the form
 *   catch (e) { return toSalesResult(e); }                          // StageMoveError, SalesError, ForbiddenError
 */
import { fromDatetimeLocal } from '../format';
import type { RequiredField } from '../stages';
import {
  DEAL_TYPES, FORECAST_CATEGORIES, LEAD_LABELS, LOST_REASONS, PRICING_MODELS, PRIORITIES, RESEARCH_STATUSES,
} from '../options';

export type FieldSpec =
  | { type: 'text'; label: string; required?: boolean; max?: number }
  | { type: 'url'; label: string }
  | { type: 'money'; label: string }
  | { type: 'int'; label: string; min?: number; max?: number }
  | { type: 'date'; label: string }
  | { type: 'datetime'; label: string }
  | { type: 'select'; label: string; options: { value: string }[] }
  | { type: 'currency'; label: string }
  | { type: 'user'; label: string }
  | { type: 'bool'; label: string };

export const DEAL_FIELD_SPECS: Record<string, FieldSpec> = {
  name: { type: 'text', label: 'Name', required: true, max: 200 },
  amount: { type: 'money', label: 'Amount' },
  currency: { type: 'currency', label: 'Currency' },
  close_date: { type: 'date', label: 'Expected close' },
  owner_user_id: { type: 'user', label: 'Owner' },
  deal_type: { type: 'select', label: 'Deal type', options: DEAL_TYPES },
  priority: { type: 'select', label: 'Priority', options: PRIORITIES },
  forecast_category: { type: 'select', label: 'Forecast category', options: FORECAST_CATEGORIES },
  forecast_probability: { type: 'int', label: 'Probability override', min: 0, max: 100 },
  pricing_model: { type: 'select', label: 'Pricing model', options: PRICING_MODELS },
  next_step: { type: 'text', label: 'Next step', max: 500 },
  angle: { type: 'text', label: 'Angle', max: 500 },
  source: { type: 'text', label: 'Source', max: 200 },
  meeting_at: { type: 'datetime', label: 'Meeting date' },
  build_card_url: { type: 'url', label: 'Build card link' },
  prototype_url: { type: 'url', label: 'Prototype URL' },
  quote_ref: { type: 'text', label: 'Quote', max: 100 },
  decision_date: { type: 'date', label: 'Decision date' },
  signer: { type: 'text', label: 'Signer', max: 200 },
  start_date: { type: 'date', label: 'Start date' },
  won_reason: { type: 'text', label: 'Won reason', max: 500 },
  lost_reason: { type: 'select', label: 'Lost reason', options: LOST_REASONS },
  lost_competitor: { type: 'text', label: 'Competitor or alternative', max: 200 },
};

export const LEAD_FIELD_SPECS: Record<string, FieldSpec> = {
  name: { type: 'text', label: 'Label', max: 200 },
  owner_user_id: { type: 'user', label: 'Owner' },
  label: { type: 'select', label: 'Temperature', options: LEAD_LABELS },
  source: { type: 'text', label: 'Source', max: 100 },
  campaign: { type: 'text', label: 'Campaign', max: 200 },
  research_status: { type: 'select', label: 'Research status', options: RESEARCH_STATUSES },
  angle: { type: 'text', label: 'Angle', max: 1000 },
  angle_worth_eur: { type: 'money', label: 'Worth' },
  status_note: { type: 'text', label: 'Board chip', max: 60 },
  next_step: { type: 'text', label: 'Next step', max: 500 },
  linkedin_accepted_at: { type: 'datetime', label: 'LinkedIn accepted' },
  opener_sent_at: { type: 'datetime', label: 'Opener sent' },
  auto_progress_enabled: { type: 'bool', label: 'Auto progress' },
};

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** Parse one value by its spec. Returns [value] or an error message. */
export function parseValue(spec: FieldSpec, raw: string | null): { value: unknown } | { error: string } {
  const s = raw === null ? '' : raw.trim();
  if (s === '') {
    if (spec.type === 'text' && spec.required) return { error: `${spec.label} is required` };
    if (spec.type === 'bool') return { value: false };
    return { value: null };
  }
  switch (spec.type) {
    case 'text':
      if (spec.max && s.length > spec.max) return { error: `Keep it under ${spec.max} characters` };
      return { value: s };
    case 'url': {
      const v = /^[a-z]+:\/\//i.test(s) ? s : `https://${s}`;
      try {
        new URL(v);
        return { value: v };
      } catch {
        return { error: 'Enter a web address' };
      }
    }
    case 'money': {
      const v = s.replace(/[€\s,]/g, '');
      if (!/^\d{1,12}(\.\d{1,2})?$/.test(v)) return { error: 'Enter an amount like 14500 or 14500.50' };
      return { value: v };
    }
    case 'int': {
      if (!/^-?\d+$/.test(s)) return { error: 'Enter a whole number' };
      const n = Number(s);
      if (spec.min !== undefined && n < spec.min) return { error: `At least ${spec.min}` };
      if (spec.max !== undefined && n > spec.max) return { error: `At most ${spec.max}` };
      return { value: n };
    }
    case 'date':
      if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) return { error: 'Enter a date' };
      return { value: s };
    case 'datetime': {
      const d = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(s) && !/[zZ]|[+-]\d{2}:?\d{2}$/.test(s) ? fromDatetimeLocal(s) : new Date(s);
      if (!d || Number.isNaN(d.getTime())) return { error: 'Enter a date and time' };
      return { value: d };
    }
    case 'select':
      if (!spec.options.some((o) => o.value === s)) return { error: 'Pick one of the options' };
      return { value: s };
    case 'currency':
      if (!/^[A-Za-z]{3}$/.test(s)) return { error: 'Use a three letter code like EUR' };
      return { value: s.toUpperCase() };
    case 'user':
      if (!UUID.test(s)) return { error: 'Pick a user' };
      return { value: s };
    case 'bool':
      return { value: s === 'on' || s === 'true' || s === '1' };
  }
}

/** Read every spec'd key present in the form. Checkboxes count as present with "<key>.present". */
export function parsePatch(specs: Record<string, FieldSpec>, fd: FormData): { patch: Record<string, unknown>; errors: Record<string, string> } {
  const patch: Record<string, unknown> = {};
  const errors: Record<string, string> = {};
  for (const [key, spec] of Object.entries(specs)) {
    const present = fd.has(key) || (spec.type === 'bool' && fd.has(`${key}.present`));
    if (!present) continue;
    const raw = fd.get(key);
    const res = parseValue(spec, typeof raw === 'string' ? raw : null);
    if ('error' in res) errors[key] = res.error;
    else patch[key] = res.value;
  }
  return { patch, errors };
}

/** What every sales action returns to its client component. */
export type SalesResult =
  | { ok: true; id?: string; href?: string; message?: string }
  | {
      ok: false;
      error: string;
      code?: 'required_fields' | 'reason_required' | 'forbidden' | 'not_found' | 'already_qualified' | 'suppressed' | 'duplicate_lead' | 'invalid' | 'error';
      /** For required_fields, every required field of the stage with values. */
      fields?: RequiredField[];
      /** For required_fields, the keys still empty. */
      missing?: string[];
      href?: string;
      fieldErrors?: Record<string, string>;
    };

/** Turn a thrown error into a SalesResult. Unknown errors are logged and given a plain message. */
export function toSalesResult(err: unknown): SalesResult {
  const e = err as { name?: string; code?: string; message?: string; fields?: RequiredField[]; missing?: RequiredField[]; href?: string; status?: number };
  if (e?.name === 'StageMoveError') {
    if (e.code === 'required_fields') {
      return { ok: false, code: 'required_fields', error: e.message ?? 'Fill in the required fields', fields: e.fields ?? [], missing: (e.missing ?? []).map((m) => m.field_key) };
    }
    if (e.code === 'reason_required') return { ok: false, code: 'reason_required', error: e.message ?? 'Give a reason' };
    return { ok: false, code: e.code === 'not_found' ? 'not_found' : 'invalid', error: e.message ?? 'That move is not allowed' };
  }
  if (e?.name === 'SalesError') return { ok: false, code: e.code as never, error: e.message ?? 'That did not work', href: e.href };
  if (e?.name === 'ForbiddenError' || e?.status === 403) return { ok: false, code: 'forbidden', error: e.message ?? "You don't have permission to do that" };
  if (e?.code === '23514' || e?.code === '22P02' || e?.code === '22007' || e?.code === '22008' || e?.code === '22003') {
    return { ok: false, code: 'invalid', error: 'One of the values is not valid, check the fields and try again' };
  }
  console.error('[sales]', err);
  return { ok: false, code: 'error', error: 'Something went wrong, nothing was saved. Try again.' };
}
