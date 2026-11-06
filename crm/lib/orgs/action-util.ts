/**
 * lib/orgs/action-util.ts (agent A), shared bits for the organization and
 * contact server actions: turning InputError into ActionState, and the zod
 * pieces for core property edits.
 */
import { z } from 'zod';
import { fail, type ActionState } from '../forms';
import { ForbiddenError } from '../permissions';
import { InputError } from './mutations';

/** Run an action body, mapping friendly errors to ActionState. Anything else still throws. */
export async function attempt(fn: () => Promise<ActionState>): Promise<ActionState> {
  try {
    return await fn();
  } catch (err) {
    if (err instanceof InputError) {
      return fail(err.message, err.field ? { [err.field]: err.message } : undefined, { duplicate: err.duplicate ?? null });
    }
    if (err instanceof ForbiddenError) return fail(err.message);
    throw err;
  }
}

/** The values of the keys a form actually posted (empty strings become null). */
export function presentValues(fd: FormData, keys: readonly string[]): Record<string, string | null> {
  const out: Record<string, string | null> = {};
  for (const k of keys) {
    if (!fd.has(k)) continue;
    const v = fd.get(k);
    const s = typeof v === 'string' ? v.trim() : '';
    out[k] = s === '' ? null : s;
  }
  return out;
}

const text = (max: number) => z.string().trim().max(max, `At most ${max} characters`).nullable();
const day = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Enter a date').nullable();
const userId = z.string().uuid('Pick a user').nullable();

export const orgPatchSchema = z
  .object({
    name: z.string({ message: 'Give the organization a name' }).trim().min(1, 'Give the organization a name').max(200),
    industry: text(100),
    employee_band: z.enum(['1-10', '11-50', '51-200', '201-500', '501+'], { message: 'Pick a size' }).nullable(),
    address: text(300),
    city: text(100),
    country: z
      .string()
      .trim()
      .toUpperCase()
      .regex(/^[A-Z]{2}$/, 'Use a two letter country code like NL')
      .nullable(),
    kvk_number: text(20),
    vat_number: text(30),
    description: text(2000),
    linkedin_url: text(500),
    owner_user_id: userId,
    account_manager_user_id: userId,
    source: text(200),
    lifecycle_stage: z.enum(['lead', 'opportunity', 'customer', 'former'], { message: 'Pick a lifecycle stage' }),
    relationship_status: z.enum(['prospect', 'onboarding', 'active', 'retainer', 'dormant', 'churned', 'former'], { message: 'Pick a status' }),
    health: z.enum(['on_track', 'at_risk', 'off_track'], { message: 'Pick a health' }).nullable(),
    next_checkin_date: day,
    renewal_date: day,
    checkin_cadence_days: z.coerce.number({ message: 'Enter a number of days' }).int('Whole days').min(1).max(3650).nullable(),
    annual_revenue: z
      .string()
      .transform((x) => x.replace(/[€\s,]/g, ''))
      .refine((x) => /^\d{1,12}(\.\d{1,2})?$/.test(x), 'Enter an amount like 250000')
      .nullable(),
    lawful_basis: z.enum(['legitimate_interest', 'consent', 'contract', 'none'], { message: 'Pick a lawful basis' }),
  })
  .partial();

export const ORG_PATCH_KEYS = Object.keys(orgPatchSchema.shape);

export const contactPatchSchema = z
  .object({
    first_name: z.string({ message: 'Enter a first name' }).trim().min(1, 'Enter a first name').max(100),
    last_name: text(100),
    job_title: text(200),
    tagline: text(300),
    owner_user_id: userId,
    lifecycle_stage: z.enum(['lead', 'opportunity', 'customer', 'former'], { message: 'Pick a lifecycle stage' }),
    lawful_basis: z.enum(['legitimate_interest', 'consent', 'contract', 'none'], { message: 'Pick a lawful basis' }),
    city: text(100),
    country: z
      .string()
      .trim()
      .toUpperCase()
      .regex(/^[A-Z]{2}$/, 'Use a two letter country code like NL')
      .nullable(),
    language: text(50),
    source: text(200),
  })
  .partial();

export const CONTACT_PATCH_KEYS = Object.keys(contactPatchSchema.shape);
