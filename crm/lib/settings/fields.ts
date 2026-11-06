/**
 * lib/settings/fields.ts, managing custom field definitions (server only).
 * Every write takes a transaction handle so actions and tests share one path.
 *
 *   const id = await tx((t) => saveField(t, input, user.id), { userId: user.id });
 *   await tx((t) => setFieldArchived(t, id, true), { userId: user.id });
 *   const dupes = await findDuplicateValues(sql, 'organization', 'kvk_number');
 *
 * Unique rules. Turning unique on first looks for values shared by two or more
 * live records and refuses with that list. Otherwise it creates a partial unique
 * expression index on (custom ->> 'key') where deleted_at is null, named
 * cf_uq_<field id>. Turning it off, or archiving the field, drops the index.
 */
import { z } from 'zod';
import type { Db, Tx } from '@/lib/db';
import { FIELD_TYPE_LABELS, type CustomObjectType, type FieldType } from '@/lib/fields';
import { CUSTOM_OBJECTS, OBJECT_TABLES, reservedKeys } from './core-fields';
import { NUMERIC_CORE_FIELDS, parseExpression } from './calc';
import { ADDABLE_TYPES, NUMERIC_TYPES, ROLLUP_FNS, TYPES_WITH_OPTIONS, UNIQUE_CAPABLE, rollupRelation } from './field-config';
import { SettingsError } from './errors';

const KEY_RE = /^[a-z][a-z0-9_]{0,62}$/;

/** The column that names a record of each object, for duplicate lists. */
export const LABEL_SQL: Record<CustomObjectType, string> = {
  organization: 'r.name',
  contact: 'r.full_name',
  lead: "coalesce(r.name, 'Lead')",
  deal: 'r.name',
  project: 'r.name',
  ticket: "'#' || r.number || ' ' || r.subject",
  invoice: "coalesce(r.title, r.external_number, 'Invoice')",
  task: 'r.title',
};

function tableOf(objectType: CustomObjectType): string {
  const table = OBJECT_TABLES[objectType];
  if (!table) throw new SettingsError('Unknown object');
  return table;
}

function safeKey(key: string): string {
  if (!KEY_RE.test(key)) throw new SettingsError('Internal names use lower case letters, digits and underscores');
  return key;
}

/** cf_uq_<32 hex>, always under the 63 character identifier limit. */
export function uniqueIndexName(fieldId: string): string {
  const hex = fieldId.replace(/-/g, '').toLowerCase();
  if (!/^[0-9a-f]{32}$/.test(hex)) throw new SettingsError('Bad field id');
  return `cf_uq_${hex}`;
}

export type DuplicateValue = { value: string; count: number; records: { id: string; label: string }[] };

/** Values of a custom key shared by two or more live records. */
export async function findDuplicateValues(db: Db, objectType: CustomObjectType, key: string): Promise<DuplicateValue[]> {
  const table = tableOf(objectType);
  const k = safeKey(key);
  const rows = await db.unsafe<{ value: string; count: number; records: { id: string; label: string }[] }[]>(
    `select r.custom ->> '${k}' as value, count(*)::int as count,
            json_agg(json_build_object('id', r.id, 'label', ${LABEL_SQL[objectType]}) order by r.created_at) as records
       from ${table} r
      where r.deleted_at is null and nullif(r.custom ->> '${k}', '') is not null
      group by 1 having count(*) > 1
      order by 2 desc, 1
      limit 50`,
  );
  return rows.map((r) => ({ value: r.value, count: r.count, records: r.records }));
}

/** Create the partial unique index for a field. Refuses when values already repeat. */
export async function ensureUniqueIndex(t: Tx, field: { id: string; object_type: CustomObjectType; internal_name: string; label: string }): Promise<void> {
  const dupes = await findDuplicateValues(t, field.object_type, field.internal_name);
  if (dupes.length) {
    const first = dupes[0];
    throw new SettingsError(
      `${field.label} can't be unique yet. ${dupes.length === 1 ? 'One value is' : `${dupes.length} values are`} shared by more than one record, for example "${first.value}" on ${first.records.map((r) => r.label).join(' and ')}. Fix or merge those first.`,
      { is_unique: 'Existing values repeat' },
      { duplicates: dupes },
    );
  }
  const table = tableOf(field.object_type);
  const k = safeKey(field.internal_name);
  const name = uniqueIndexName(field.id);
  await t.unsafe(`create unique index if not exists ${name} on ${table} ((custom ->> '${k}')) where deleted_at is null`);
}

export async function dropUniqueIndex(t: Tx, fieldId: string): Promise<void> {
  await t.unsafe(`drop index if exists ${uniqueIndexName(fieldId)}`);
}

/** True when the unique index of a field exists. */
export async function hasUniqueIndex(db: Db, fieldId: string): Promise<boolean> {
  const [row] = await db<{ n: number }[]>`select count(*)::int as n from pg_indexes where schemaname = 'public' and indexname = ${uniqueIndexName(fieldId)}`;
  return (row?.n ?? 0) > 0;
}

const optionSchema = z.object({ value: z.string().trim().min(1).max(100), label: z.string().trim().min(1, 'Give every option a label').max(100) });

export const fieldInputSchema = z.object({
  id: z.string().uuid().nullable().optional(),
  objectType: z.enum(CUSTOM_OBJECTS.map((o) => o.value) as [CustomObjectType, ...CustomObjectType[]]),
  internalName: z.string().trim().max(63).optional().default(''),
  label: z.string({ message: 'Give the field a label' }).trim().min(1, 'Give the field a label').max(80, 'At most 80 characters'),
  fieldType: z.enum(ADDABLE_TYPES as [FieldType, ...FieldType[]], { message: 'Pick a type' }),
  groupId: z.string().uuid().nullable().optional(),
  newGroupName: z.string().trim().max(60).nullable().optional(),
  helpText: z.string().trim().max(300).nullable().optional(),
  isRequired: z.boolean().default(false),
  isUnique: z.boolean().default(false),
  options: z.array(optionSchema).max(200).default([]),
  validation: z
    .object({ min: z.number().nullable().optional(), max: z.number().nullable().optional(), maxLength: z.number().int().positive().max(10000).nullable().optional() })
    .default({}),
  config: z.record(z.string(), z.unknown()).nullable().default(null),
});
export type FieldInput = z.input<typeof fieldInputSchema>;

type FieldRow = {
  id: string;
  object_type: CustomObjectType;
  internal_name: string;
  label: string;
  field_type: FieldType;
  is_unique: boolean;
  archived_at: Date | null;
};

async function cleanConfig(t: Tx, objectType: CustomObjectType, type: FieldType, key: string, config: Record<string, unknown> | null): Promise<Record<string, unknown> | null> {
  if (type === 'calculation') {
    const expression = String(config?.expression ?? '').trim();
    const numericCustoms = await t<{ internal_name: string }[]>`
      select internal_name from field_definitions
       where object_type = ${objectType} and archived_at is null and field_type in ('number', 'currency', 'percent')
         and internal_name <> ${key}`;
    const allowed = [...(NUMERIC_CORE_FIELDS[objectType] ?? []), ...numericCustoms.map((r) => r.internal_name)];
    const res = parseExpression(expression, allowed);
    if (!res.ok) throw new SettingsError('Check the expression', { expression: res.error });
    return { expression };
  }
  if (type === 'rollup') {
    const relKey = String(config?.relation ?? '');
    const rel = rollupRelation(objectType, relKey);
    if (!rel) throw new SettingsError('Pick what to roll up', { relation: 'Pick a related object' });
    const fn = String(config?.fn ?? '');
    if (!ROLLUP_FNS.some((f) => f.value === fn)) throw new SettingsError('Pick a function', { fn: 'Pick sum, count, minimum, maximum or average' });
    let field: string | null = null;
    if (fn !== 'count') {
      field = String(config?.field ?? '');
      let ok = rel.fields.some((f) => f.key === field);
      if (!ok && rel.customOf && KEY_RE.test(field)) {
        const [hit] = await t<{ n: number }[]>`
          select count(*)::int as n from field_definitions
           where object_type = ${rel.customOf} and internal_name = ${field} and field_type in ('number', 'currency', 'percent') and archived_at is null`;
        ok = (hit?.n ?? 0) > 0;
        if (ok) field = `custom.${field}`;
      } else if (!ok && field.startsWith('custom.') && rel.customOf) {
        const bare = field.slice(7);
        const [hit] = await t<{ n: number }[]>`
          select count(*)::int as n from field_definitions
           where object_type = ${rel.customOf} and internal_name = ${bare} and field_type in ('number', 'currency', 'percent') and archived_at is null`;
        ok = (hit?.n ?? 0) > 0;
      }
      if (!ok) throw new SettingsError('Pick a number field to roll up', { field: 'Pick a number field of the related object' });
    }
    return { relation: rel.key, fn, field, openOnly: Boolean(config?.openOnly) && Boolean(rel.openWhere) };
  }
  if (type === 'record_link') {
    const target = String(config?.target ?? '');
    if (!CUSTOM_OBJECTS.some((o) => o.value === target)) throw new SettingsError('Pick what it links to', { target: 'Pick an object' });
    return { target };
  }
  return null;
}

/** Create or edit a custom field. Returns the field id. */
export async function saveField(t: Tx, raw: FieldInput, userId: string | null): Promise<string> {
  const parsed = fieldInputSchema.safeParse(raw);
  if (!parsed.success) {
    const fe: Record<string, string> = {};
    for (const i of parsed.error.issues) fe[String(i.path[0] ?? '_')] ??= i.message;
    throw new SettingsError('Check the highlighted fields', fe);
  }
  const input = parsed.data;
  const objectType = input.objectType;

  let existing: FieldRow | null = null;
  if (input.id) {
    const [row] = await t<FieldRow[]>`
      select id, object_type, internal_name, label, field_type, is_unique, archived_at from field_definitions where id = ${input.id} for update`;
    if (!row) throw new SettingsError('That field no longer exists');
    if (row.object_type !== objectType) throw new SettingsError('A field cannot move to another object');
    existing = row;
  }

  // Internal name: set once, never changed.
  const key = existing ? existing.internal_name : input.internalName;
  const type: FieldType = existing ? existing.field_type : input.fieldType;
  if (existing && input.internalName && input.internalName !== existing.internal_name) {
    throw new SettingsError('The internal name cannot change after the field is created', { internalName: 'Fixed after creation' });
  }
  if (existing && input.fieldType !== existing.field_type) {
    throw new SettingsError('The type cannot change after the field is created, add a new field instead', { fieldType: 'Fixed after creation' });
  }
  if (!existing) {
    if (!KEY_RE.test(key)) {
      throw new SettingsError('Check the highlighted fields', { internalName: 'Start with a letter, then lower case letters, digits or underscores' });
    }
    if (reservedKeys(objectType).has(key)) {
      throw new SettingsError('Check the highlighted fields', { internalName: `${key} is a core field of this object, pick another name` });
    }
    const [taken] = await t<{ archived_at: Date | null }[]>`
      select archived_at from field_definitions where object_type = ${objectType} and internal_name = ${key}`;
    if (taken) {
      throw new SettingsError('Check the highlighted fields', {
        internalName: taken.archived_at ? `${key} belongs to an archived field, restore that one instead` : `${key} is already used`,
      });
    }
  }

  // Options.
  let options: { value: string; label: string }[] | null = null;
  if (TYPES_WITH_OPTIONS.includes(type)) {
    if (input.options.length === 0) throw new SettingsError('Add at least one option', { options: 'Add at least one option' });
    const values = input.options.map((o) => o.value);
    if (new Set(values).size !== values.length) throw new SettingsError('Two options have the same value', { options: 'Option values must differ' });
    const labels = input.options.map((o) => o.label.toLowerCase());
    if (new Set(labels).size !== labels.length) throw new SettingsError('Two options have the same label', { options: 'Option labels must differ' });
    options = input.options;
  }

  // Validation rules.
  const v = input.validation;
  const validation: Record<string, number> = {};
  if (NUMERIC_TYPES.includes(type)) {
    if (typeof v.min === 'number') validation.min = v.min;
    if (typeof v.max === 'number') validation.max = v.max;
    if (validation.min !== undefined && validation.max !== undefined && validation.min > validation.max) {
      throw new SettingsError('Minimum is above maximum', { validation: 'Minimum is above maximum' });
    }
  }
  if ((type === 'text' || type === 'textarea') && typeof v.maxLength === 'number') validation.maxLength = v.maxLength;

  const config = await cleanConfig(t, objectType, type, key, input.config);

  const computed = type === 'calculation' || type === 'rollup';
  const isRequired = computed ? false : input.isRequired;
  const isUnique = UNIQUE_CAPABLE.includes(type) ? input.isUnique : false;
  if (input.isUnique && !UNIQUE_CAPABLE.includes(type)) {
    throw new SettingsError(`${FIELD_TYPE_LABELS[type]} fields can't be unique`, { isUnique: 'Not for this type' });
  }

  // Group, picked or new.
  let groupId = input.groupId ?? null;
  const newGroup = input.newGroupName?.trim();
  if (newGroup) {
    const [g] = await t<{ id: string }[]>`
      insert into field_groups (object_type, name, position)
      values (${objectType}, ${newGroup}, coalesce((select max(position) + 1 from field_groups where object_type = ${objectType}), 0))
      on conflict (object_type, name) do update set name = excluded.name
      returning id`;
    groupId = g.id;
  } else if (groupId) {
    const [g] = await t<{ object_type: string }[]>`select object_type from field_groups where id = ${groupId}`;
    if (!g || g.object_type !== objectType) throw new SettingsError('Pick a group of this object', { groupId: 'Pick a group of this object' });
  }

  const row = {
    label: input.label,
    group_id: groupId,
    options: options === null ? null : t.json(options),
    validation: Object.keys(validation).length ? t.json(validation) : null,
    config: config === null ? null : t.json(config as never),
    help_text: input.helpText || null,
    is_required: isRequired,
    is_unique: isUnique,
  };

  let id: string;
  if (existing) {
    // Unique switched on: check values before saving anything.
    if (isUnique && !existing.archived_at) await ensureUniqueIndex(t, { ...existing, label: input.label });
    if (!isUnique && existing.is_unique) await dropUniqueIndex(t, existing.id);
    await t`update field_definitions set ${t(row as Record<string, any>)} where id = ${existing.id}`;
    id = existing.id;
  } else {
    const [pos] = await t<{ p: number }[]>`
      select coalesce(max(position) + 1, 0)::int as p from field_definitions where object_type = ${objectType}`;
    const [created] = await t<{ id: string }[]>`
      insert into field_definitions ${t({
        ...row,
        object_type: objectType,
        internal_name: key,
        field_type: type,
        created_by: userId,
        position: pos.p,
      } as Record<string, any>)}
      returning id`;
    id = created.id;
    if (isUnique) await ensureUniqueIndex(t, { id, object_type: objectType, internal_name: key, label: input.label });
  }
  return id;
}

/** Archive (hide everywhere, keep the values) or restore a field. */
export async function setFieldArchived(t: Tx, fieldId: string, archived: boolean): Promise<void> {
  const [f] = await t<FieldRow[]>`
    select id, object_type, internal_name, label, field_type, is_unique, archived_at from field_definitions where id = ${fieldId} for update`;
  if (!f) throw new SettingsError('That field no longer exists');
  if (archived) {
    await dropUniqueIndex(t, f.id);
    await t`update field_definitions set archived_at = now() where id = ${f.id}`;
  } else {
    if (f.is_unique) await ensureUniqueIndex(t, f);
    await t`update field_definitions set archived_at = null where id = ${f.id}`;
  }
}

/** Move a field one place up or down within its object. */
export async function moveField(t: Tx, fieldId: string, dir: 'up' | 'down'): Promise<void> {
  const [f] = await t<{ id: string; object_type: string; position: number }[]>`select id, object_type, position from field_definitions where id = ${fieldId}`;
  if (!f) return;
  const rows = await t<{ id: string }[]>`
    select id from field_definitions where object_type = ${f.object_type} order by position, created_at for update`;
  const ids = rows.map((r) => r.id);
  const i = ids.indexOf(f.id);
  const j = dir === 'up' ? i - 1 : i + 1;
  if (i < 0 || j < 0 || j >= ids.length) return;
  [ids[i], ids[j]] = [ids[j], ids[i]];
  for (let p = 0; p < ids.length; p++) await t`update field_definitions set position = ${p} where id = ${ids[p]} and position <> ${p}`;
}

export type FieldListRow = {
  id: string;
  internal_name: string;
  label: string;
  field_type: FieldType;
  group_id: string | null;
  group_name: string | null;
  options: { value: string; label: string }[] | null;
  validation: { min?: number; max?: number; maxLength?: number } | null;
  config: Record<string, unknown> | null;
  help_text: string | null;
  is_required: boolean;
  is_unique: boolean;
  archived_at: Date | null;
  position: number;
  values_count: number;
};

/** Every field of an object, archived ones last, with how many records hold a value. */
export async function listFields(db: Db, objectType: CustomObjectType): Promise<FieldListRow[]> {
  const table = tableOf(objectType);
  const defs = await db<Omit<FieldListRow, 'values_count'>[]>`
    select f.id, f.internal_name, f.label, f.field_type, f.group_id, g.name as group_name, f.options, f.validation, f.config,
           f.help_text, f.is_required, f.is_unique, f.archived_at, f.position
      from field_definitions f left join field_groups g on g.id = f.group_id
     where f.object_type = ${objectType}
     order by f.archived_at is not null, f.position, f.created_at`;
  if (!defs.length) return [];
  const counts = await db.unsafe<{ key: string; n: number }[]>(
    `select k.key, count(*)::int as n from ${table} r, jsonb_object_keys(r.custom) k(key)
      where r.deleted_at is null and r.custom ->> k.key is not null and r.custom ->> k.key <> ''
      group by k.key`,
  );
  const byKey = new Map(counts.map((c) => [c.key, c.n]));
  return defs.map((d) => ({ ...d, values_count: byKey.get(d.internal_name) ?? 0 }));
}

export async function listGroups(db: Db, objectType: CustomObjectType) {
  return db<{ id: string; name: string; position: number }[]>`
    select id, name, position from field_groups where object_type = ${objectType} order by position, name`;
}
