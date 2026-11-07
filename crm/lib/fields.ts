/**
 * lib/fields.ts, custom fields. Definitions live in field_definitions (managed on
 * /settings/fields by agent D), values live in each record's custom jsonb keyed
 * by internal_name. This module reads the definitions, validates values and
 * builds the groups PropertiesPanel renders.
 *
 *   const defs = await getFieldDefinitions('organization');
 *   const raw = parseCustomForm(defs, formData);                 // reads inputs named "custom.<internal_name>"
 *   const res = validateCustom(defs, raw, { partial: true });    // { ok, value } or { ok: false, errors }
 *   if (res.ok) await t`update organizations set custom = custom || ${t.json(res.value)} where id = ${id}`;
 *   const groups = customPropertyGroups(defs, org.custom, { users }); // PropertyGroup[] for PropertiesPanel
 *
 * Core fields are not here, each record page builds those groups itself with
 * the same PropertyField shape (see components/records/PropertiesPanel).
 */
import { z } from 'zod';
import { sql, type Db } from './db';
import { normEmail, normPhone } from './normalize';
import { formatDate, formatDateTime, formatMoney, formatPercent } from './format';
import type { Option } from './options';

export { FIELD_TYPE_LABELS, COMPUTED_FIELD_TYPES } from './field-types';
export type { CustomObjectType, FieldType } from './field-types';
import { COMPUTED_FIELD_TYPES, type CustomObjectType, type FieldType } from './field-types';

export type FieldDefinition = {
  id: string;
  object_type: CustomObjectType;
  internal_name: string;
  label: string;
  group_id: string | null;
  group_name: string | null;
  group_position: number | null;
  field_type: FieldType;
  options: Option[] | null;
  validation: { min?: number; max?: number; pattern?: string; maxLength?: number } | null;
  config: Record<string, unknown> | null;
  help_text: string | null;
  is_required: boolean;
  is_unique: boolean;
  is_sensitive: boolean;
  default_value: unknown;
  position: number;
  archived_at: Date | null;
};

/** The input a PropertiesPanel field renders. Matches FieldType plus readonly for computed values. */
export type PropertyInputType = Exclude<FieldType, 'file' | 'calculation' | 'rollup' | 'record_link'> | 'readonly';

/** One row in a PropertiesPanel group. */
export type PropertyField = {
  /** Form input name. Core fields use the column name, custom fields "custom.<internal_name>". */
  key: string;
  label: string;
  type: PropertyInputType;
  /** Raw value for the edit input ('YYYY-MM-DD' for dates, numeric string for money). */
  value: string | number | boolean | string[] | null;
  /** What the read view shows. Empty shows a dash free "Not set". */
  display: string;
  /** Optional link for the read view, for example the account manager's page. */
  href?: string;
  options?: Option[];
  required?: boolean;
  editable?: boolean;
  custom?: boolean;
  help?: string;
  /** Render the display in Geist Mono (money, numbers). */
  mono?: boolean;
};

export type PropertyGroup = {
  name: string;
  fields: PropertyField[];
  /** Default true when any field is editable. */
  editable?: boolean;
};

/** Active definitions for an object type, ordered by group then position. */
export async function getFieldDefinitions(
  objectType: CustomObjectType,
  opts: { includeArchived?: boolean } = {},
  db: Db = sql,
): Promise<FieldDefinition[]> {
  const rows = await db<FieldDefinition[]>`
    select f.id, f.object_type, f.internal_name, f.label, f.group_id, g.name as group_name, g.position as group_position,
           f.field_type, f.options, f.validation, f.config, f.help_text, f.is_required, f.is_unique, f.is_sensitive,
           f.default_value, f.position, f.archived_at
      from field_definitions f
      left join field_groups g on g.id = f.group_id
     where f.object_type = ${objectType}
       and (${opts.includeArchived ?? false} or f.archived_at is null)
     order by coalesce(g.position, 999), g.name nulls last, f.position, f.label`;
  return rows;
}

const empty = (v: unknown) => (v === '' || v === undefined ? null : v);

function schemaFor(def: FieldDefinition): z.ZodType<unknown> {
  const v = def.validation ?? {};
  let base: z.ZodType<unknown>;
  switch (def.field_type) {
    case 'number':
    case 'percent': {
      let n = z.coerce.number({ message: 'Enter a number' });
      if (typeof v.min === 'number') n = n.min(v.min, `At least ${v.min}`);
      if (typeof v.max === 'number') n = n.max(v.max, `At most ${v.max}`);
      if (def.field_type === 'percent') n = n.min(0, 'At least 0').max(100, 'At most 100');
      base = n;
      break;
    }
    case 'currency':
      base = z
        .union([z.string(), z.number()])
        .transform((x) => String(x).replace(/[€\s,]/g, ''))
        .refine((x) => /^-?\d{1,12}(\.\d{1,2})?$/.test(x), 'Enter an amount like 1500 or 1500.50');
      break;
    case 'date':
      base = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Enter a date');
      break;
    case 'datetime':
      base = z
        .string()
        .refine((x) => !Number.isNaN(Date.parse(x)), 'Enter a date and time')
        .transform((x) => new Date(x).toISOString());
      break;
    case 'select': {
      const allowed = (def.options ?? []).map((x) => x.value);
      base = z.string().refine((x) => allowed.includes(x), 'Pick one of the options');
      break;
    }
    case 'multiselect': {
      const allowed = (def.options ?? []).map((x) => x.value);
      base = z
        .union([z.array(z.string()), z.string()])
        .transform((x) => (Array.isArray(x) ? x : x.split(';').map((s) => s.trim()).filter(Boolean)))
        .refine((arr) => arr.every((x) => allowed.includes(x)), 'Pick from the options');
      break;
    }
    case 'checkbox':
      base = z.union([z.boolean(), z.string()]).transform((x) => x === true || x === 'true' || x === 'on' || x === '1');
      break;
    case 'user':
    case 'record_link':
      base = z.string().uuid('Pick a record');
      break;
    case 'email':
      base = z.string().transform((x, ctx) => {
        const e = normEmail(x);
        if (!e) ctx.addIssue({ code: 'custom', message: 'Enter an email address' });
        return e ?? x;
      });
      break;
    case 'phone':
      base = z.string().transform((x, ctx) => {
        const p = normPhone(x);
        if (!p) ctx.addIssue({ code: 'custom', message: 'Enter a phone number' });
        return x.trim();
      });
      break;
    case 'url':
      base = z.string().transform((x, ctx) => {
        const withScheme = /^[a-z]+:\/\//i.test(x.trim()) ? x.trim() : `https://${x.trim()}`;
        try {
          new URL(withScheme);
        } catch {
          ctx.addIssue({ code: 'custom', message: 'Enter a web address' });
        }
        return withScheme;
      });
      break;
    default: {
      let s = z.string().trim();
      const max = v.maxLength ?? (def.field_type === 'textarea' ? 10000 : 500);
      s = s.max(max, `At most ${max} characters`);
      if (v.pattern) s = s.regex(new RegExp(v.pattern), 'Not in the expected format');
      base = s;
    }
  }
  if (def.field_type === 'checkbox') return z.preprocess((x) => (x === undefined ? false : x), base);
  return z.preprocess(empty, base.nullable());
}

export type ValidateResult =
  | { ok: true; value: Record<string, unknown> }
  | { ok: false; errors: Record<string, string>; value: Record<string, unknown> };

/**
 * Validate and coerce custom values. Unknown keys and computed fields are dropped.
 * partial: only check keys present in input (inline edits). Otherwise required
 * fields must have a value (create).
 */
export function validateCustom(
  defs: FieldDefinition[],
  input: Record<string, unknown>,
  opts: { partial?: boolean } = {},
): ValidateResult {
  const value: Record<string, unknown> = {};
  const errors: Record<string, string> = {};
  for (const def of defs) {
    if (def.archived_at || COMPUTED_FIELD_TYPES.includes(def.field_type) || def.field_type === 'file') continue;
    const present = Object.prototype.hasOwnProperty.call(input, def.internal_name);
    if (opts.partial && !present) continue;
    const res = schemaFor(def).safeParse(input[def.internal_name]);
    if (!res.success) {
      errors[def.internal_name] = res.error.issues[0]?.message ?? 'Not valid';
      continue;
    }
    const out = res.data;
    if (def.is_required && (out === null || out === '' || (Array.isArray(out) && out.length === 0))) {
      errors[def.internal_name] = `${def.label} is required`;
      continue;
    }
    if (present || out !== null) value[def.internal_name] = out;
  }
  return Object.keys(errors).length ? { ok: false, errors, value } : { ok: true, value };
}

/** Read inputs named "<prefix><internal_name>" from a form. Multi selects use repeated inputs. */
export function parseCustomForm(defs: FieldDefinition[], form: FormData, prefix = 'custom.'): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const def of defs) {
    const name = prefix + def.internal_name;
    if (def.field_type === 'multiselect') {
      if (form.has(name)) out[def.internal_name] = form.getAll(name).map(String).filter(Boolean);
    } else if (def.field_type === 'checkbox') {
      // An unchecked box sends nothing, a hidden "<name>.present" input marks it as on the form.
      if (form.has(name) || form.has(`${name}.present`)) out[def.internal_name] = form.get(name) === 'on' || form.get(name) === 'true';
    } else if (form.has(name)) {
      out[def.internal_name] = String(form.get(name) ?? '');
    }
  }
  return out;
}

/** Display text for a stored custom value. */
export function formatFieldValue(
  def: Pick<FieldDefinition, 'field_type' | 'options'>,
  value: unknown,
  ctx: { users?: { id: string; name: string }[] } = {},
): string {
  if (value === null || value === undefined || value === '' || (Array.isArray(value) && value.length === 0)) return '';
  switch (def.field_type) {
    case 'currency':
      return formatMoney(String(value));
    case 'percent':
      return formatPercent(value as number);
    case 'date':
      return formatDate(String(value));
    case 'datetime':
      return formatDateTime(String(value));
    case 'checkbox':
      return value ? 'Yes' : 'No';
    case 'select':
      return def.options?.find((x) => x.value === value)?.label ?? String(value);
    case 'multiselect':
      return (value as string[]).map((v) => def.options?.find((x) => x.value === v)?.label ?? v).join(', ');
    case 'user':
      return ctx.users?.find((u) => u.id === value)?.name ?? 'Unknown user';
    default:
      return String(value);
  }
}

function inputTypeFor(t: FieldType): PropertyInputType {
  if (t === 'calculation' || t === 'rollup' || t === 'file' || t === 'record_link') return 'readonly';
  return t;
}

/**
 * PropertyGroups for a record's custom values, grouped by field group. Fields
 * without a group land in "Custom fields". Pass users for user fields.
 */
export function customPropertyGroups(
  defs: FieldDefinition[],
  custom: Record<string, unknown> | null | undefined,
  ctx: { users?: { id: string; name: string }[]; editable?: boolean } = {},
): PropertyGroup[] {
  const groups = new Map<string, PropertyField[]>();
  const values = custom ?? {};
  for (const def of defs) {
    if (def.archived_at) continue;
    const raw = values[def.internal_name];
    const type = inputTypeFor(def.field_type);
    const options =
      def.field_type === 'user' ? ctx.users?.map((u) => ({ value: u.id, label: u.name })) : def.options ?? undefined;
    const field: PropertyField = {
      key: `custom.${def.internal_name}`,
      label: def.label,
      type,
      value: (raw ?? null) as PropertyField['value'],
      display: formatFieldValue(def, raw, ctx),
      options,
      required: def.is_required,
      editable: (ctx.editable ?? true) && type !== 'readonly',
      custom: true,
      help: def.help_text ?? undefined,
      mono: def.field_type === 'currency' || def.field_type === 'number' || def.field_type === 'percent',
    };
    const name = def.group_name ?? 'Custom fields';
    groups.set(name, [...(groups.get(name) ?? []), field]);
  }
  return [...groups.entries()].map(([name, fields]) => ({ name, fields }));
}

/**
 * Merge custom groups into core groups with the same name, so a custom field in
 * group "About" shows inside the core About card.
 */
export function mergePropertyGroups(core: PropertyGroup[], custom: PropertyGroup[]): PropertyGroup[] {
  const out = core.map((g) => ({ ...g, fields: [...g.fields] }));
  for (const g of custom) {
    const hit = out.find((x) => x.name.toLowerCase() === g.name.toLowerCase());
    if (hit) hit.fields.push(...g.fields);
    else out.push(g);
  }
  return out;
}
