/**
 * lib/delivery/parse.ts, zod pieces shared by agent F's server actions. Pure.
 *
 *   const schema = z.object({ budget_amount: money(), due_date: dateKey(), organization_id: uuid() });
 *   schema.safeParse({ budget_amount: str(fd, 'budget_amount'), ... })
 */
import { z } from 'zod';

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** Optional uuid, null when empty. */
export const uuid = (message = 'Pick one from the list') =>
  z
    .string()
    .nullable()
    .refine((v) => v === null || UUID.test(v), message);

/** Required uuid. */
export const uuidRequired = (message: string) => z.string({ message }).regex(UUID, message);

/** Optional money amount as a numeric string with up to 2 decimals. '€ 3.400,50' style input is not accepted, '3400.50' is. */
export const money = (opts: { negative?: boolean; message?: string } = {}) =>
  z
    .string()
    .nullable()
    .transform((v) => (v === null ? null : v.replace(/[€\s]/g, '').replace(/,(?=\d{3}(\D|$))/g, '')))
    .refine((v) => v === null || (opts.negative ? /^-?\d{1,12}(\.\d{1,2})?$/ : /^\d{1,12}(\.\d{1,2})?$/).test(v), opts.message ?? 'Enter an amount like 3400 or 3400.50');

/** Optional decimal (hours, quantity). */
export const decimal = (opts: { negative?: boolean; max?: number; message?: string } = {}) =>
  z
    .string()
    .nullable()
    .transform((v) => (v === null ? null : v.replace(',', '.').trim()))
    .refine((v) => v === null || (opts.negative ? /^-?\d{1,10}(\.\d{1,2})?$/ : /^\d{1,10}(\.\d{1,2})?$/).test(v), opts.message ?? 'Enter a number like 1 or 1.5')
    .refine((v) => v === null || opts.max === undefined || Math.abs(Number(v)) <= opts.max, `At most ${opts.max}`);

/** Optional 'YYYY-MM-DD'. */
export const dateKey = (message = 'Pick a date') =>
  z
    .string()
    .nullable()
    .refine((v) => v === null || (/^\d{4}-\d{2}-\d{2}$/.test(v) && !Number.isNaN(Date.parse(`${v}T12:00:00Z`))), message);

/** Optional URL, https added when the scheme is missing. */
export const url = () =>
  z
    .string()
    .nullable()
    .transform((v) => (v === null ? null : /^[a-z]+:\/\//i.test(v) ? v : `https://${v}`))
    .refine((v) => {
      if (v === null) return true;
      try {
        new URL(v);
        return true;
      } catch {
        return false;
      }
    }, 'Enter a web address');

/** One of an option list's values, or null. */
export const oneOf = (values: readonly string[], message = 'Pick one from the list') =>
  z
    .string()
    .nullable()
    .refine((v) => v === null || values.includes(v), message);
