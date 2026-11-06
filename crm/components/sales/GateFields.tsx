'use client';
/**
 * Inputs for a stage's required fields (stage_required_fields), used by the
 * gate dialog, the stage path panel, the create deal form and the qualify dialog.
 *
 *   <GateFields fields={fields} missing={['decision_date']} users={users} prefix="gate." />
 *
 * Inputs are uncontrolled and named prefix + field_key. datetime inputs post
 * Amsterdam wall clock time ('2026-11-20T14:00').
 */
import type { RequiredField } from '@/lib/stages';
import { toDatetimeLocal } from '@/lib/format';
import { Field, Input, Select, Textarea } from '@/components/ui';

export type GateUser = { id: string; name: string };

function inputValue(f: RequiredField): string {
  if (!f.value) return '';
  if (f.input_type === 'date') return f.value.slice(0, 10);
  if (f.input_type === 'datetime') return toDatetimeLocal(f.value);
  return f.value;
}

export function GateFields({
  fields,
  missing = [],
  users = [],
  prefix = '',
  idPrefix = 'gate',
}: {
  fields: RequiredField[];
  missing?: string[];
  users?: GateUser[];
  prefix?: string;
  idPrefix?: string;
}) {
  return (
    <>
      {fields.map((f) => {
        const id = `${idPrefix}-${f.field_key}`;
        const name = `${prefix}${f.field_key}`;
        const invalid = missing.includes(f.field_key);
        const common = { id, name, required: true, invalid, defaultValue: inputValue(f) };
        let control;
        switch (f.input_type) {
          case 'textarea':
            control = <Textarea {...common} rows={2} placeholder="Required" />;
            break;
          case 'number':
            control = <Input {...common} type="number" step="any" placeholder="Required" />;
            break;
          case 'money':
            control = <Input {...common} inputMode="decimal" className="mono" placeholder="Required, for example 8000" />;
            break;
          case 'date':
            control = <Input {...common} type="date" />;
            break;
          case 'datetime':
            control = <Input {...common} type="datetime-local" />;
            break;
          case 'url':
            control = <Input {...common} type="text" inputMode="url" placeholder="Required, a link" />;
            break;
          case 'select':
            control = <Select {...common} options={f.options ?? []} placeholder="Pick one" />;
            break;
          case 'user':
            control = <Select {...common} options={users.map((u) => ({ value: u.id, label: u.name }))} placeholder="Pick a person" />;
            break;
          default:
            control = <Input {...common} type="text" placeholder="Required" />;
        }
        return (
          <Field key={f.field_key} label={f.label} htmlFor={id} required error={invalid ? 'Required to enter this stage' : undefined}>
            {control}
          </Field>
        );
      })}
    </>
  );
}

/** Read the gate inputs back out of a form into { field_key: value }. */
export function readGateValues(form: HTMLFormElement, fields: RequiredField[], prefix = ''): Record<string, string> {
  const fd = new FormData(form);
  const out: Record<string, string> = {};
  for (const f of fields) {
    const v = fd.get(`${prefix}${f.field_key}`);
    if (typeof v === 'string') out[f.field_key] = v;
  }
  return out;
}
