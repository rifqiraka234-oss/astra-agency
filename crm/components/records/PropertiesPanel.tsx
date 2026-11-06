'use client';
/**
 * Grouped properties with inline edit (left column of the Organization design).
 *
 *   <PropertiesPanel
 *     groups={[
 *       { name: 'About', fields: [
 *         { key: 'industry', label: 'Industry', type: 'select', value: org.industry, display: org.industry ?? '', options: INDUSTRIES },
 *         { key: 'employee_band', label: 'Employees', type: 'select', value: ..., display: ..., options: EMPLOYEE_BANDS },
 *       ]},
 *       ...customPropertyGroups(defs, org.custom, { users }),          // from lib/fields.ts
 *     ]}
 *     action={updateOrganizationProperties}     // server action (prev: ActionState, fd: FormData) => Promise<ActionState>
 *     hidden={{ id: org.id }}                    // extra inputs sent with every save
 *   />
 *
 * Each group gets an Edit button when an action is passed. The form posts only
 * that group's editable fields (input names = field.key, custom fields are
 * "custom.<internal_name>"), plus "__group" with the group name and the hidden
 * values. datetime inputs post Amsterdam local time, read them with
 * fromDatetimeLocal() from lib/format.ts. Unchecked checkboxes post
 * "<key>.present" so the action knows to store false.
 */
import { startTransition, useActionState, useEffect, useState } from 'react';
import Link from 'next/link';
import type { PropertyField, PropertyGroup } from '@/lib/fields';
import { initialActionState, type ActionState } from '@/lib/forms';
import { toDatetimeLocal } from '@/lib/format';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Textarea } from '../ui/Textarea';

type Action = (prev: ActionState, fd: FormData) => Promise<ActionState>;

function FieldInput({ field, error }: { field: PropertyField; error?: string }) {
  const id = `prop-${field.key}`;
  const v = field.value;
  const common = { id, name: field.key, required: field.required, invalid: Boolean(error) };
  switch (field.type) {
    case 'textarea':
      return <Textarea {...common} rows={3} defaultValue={v === null ? '' : String(v)} />;
    case 'number':
    case 'percent':
      return <Input {...common} type="number" step="any" defaultValue={v === null ? '' : String(v)} />;
    case 'currency':
      return <Input {...common} inputMode="decimal" className="mono" defaultValue={v === null ? '' : String(v)} />;
    case 'date':
      return <Input {...common} type="date" defaultValue={v === null ? '' : String(v).slice(0, 10)} />;
    case 'datetime':
      return <Input {...common} type="datetime-local" defaultValue={v === null ? '' : toDatetimeLocal(String(v))} />;
    case 'select':
    case 'user':
      return <Select {...common} options={field.options ?? []} placeholder="Not set" defaultValue={v === null ? '' : String(v)} />;
    case 'multiselect': {
      const selected = new Set(Array.isArray(v) ? v : []);
      return (
        <div className="row" role="group" aria-labelledby={`${id}-label`}>
          {(field.options ?? []).map((o) => (
            <label key={o.value} className="checkbox">
              <input type="checkbox" name={field.key} value={o.value} defaultChecked={selected.has(o.value)} />
              {o.label}
            </label>
          ))}
        </div>
      );
    }
    case 'checkbox':
      return (
        <label className="checkbox">
          <input type="hidden" name={`${field.key}.present`} value="1" />
          <input type="checkbox" id={id} name={field.key} defaultChecked={Boolean(v)} />
          Yes
        </label>
      );
    case 'email':
      return <Input {...common} type="email" defaultValue={v === null ? '' : String(v)} />;
    case 'phone':
      return <Input {...common} type="tel" defaultValue={v === null ? '' : String(v)} />;
    case 'url':
      return <Input {...common} type="text" inputMode="url" defaultValue={v === null ? '' : String(v)} />;
    default:
      return <Input {...common} type="text" defaultValue={v === null ? '' : String(v)} />;
  }
}

function Display({ field }: { field: PropertyField }) {
  if (!field.display) return <dd className="props-empty">Not set</dd>;
  const content = field.href ? <Link href={field.href}>{field.display}</Link> : field.display;
  return <dd className={field.mono ? 'mono' : undefined}>{content}</dd>;
}

function Group({ group, action, hidden }: { group: PropertyGroup; action?: Action; hidden?: Record<string, string> }) {
  const [editing, setEditing] = useState(false);
  const [state, formAction, pending] = useActionState(action ?? (async () => initialActionState), initialActionState);
  const editable = Boolean(action) && (group.editable ?? group.fields.some((f) => f.editable !== false && f.type !== 'readonly'));

  useEffect(() => {
    if (state.ok) setEditing(false);
  }, [state]);

  return (
    <section className="props-group">
      <div className="props-head">
        <h2 className="section-label">{group.name}</h2>
        {editable && !editing ? (
          <button type="button" className="props-edit" aria-label={`Edit ${group.name}`} onClick={() => setEditing(true)}>
            Edit
          </button>
        ) : null}
      </div>
      {editing ? (
        <form
          action={formAction}
          onSubmit={(e) => {
            // No automatic form reset, a failed save keeps the edits.
            e.preventDefault();
            const fd = new FormData(e.currentTarget);
            startTransition(() => formAction(fd));
          }}
          className="props-form"
        >
          <input type="hidden" name="__group" value={group.name} />
          {Object.entries(hidden ?? {}).map(([k, v]) => (
            <input key={k} type="hidden" name={k} value={v} />
          ))}
          {group.fields.map((f) =>
            f.editable === false || f.type === 'readonly' ? (
              <div key={f.key} className="props-item">
                <dt>{f.label}</dt>
                <Display field={f} />
              </div>
            ) : (
              <div key={f.key} className="field">
                <label htmlFor={`prop-${f.key}`} id={`prop-${f.key}-label`} className={['field-label', f.required ? 'field-required' : ''].join(' ')}>
                  {f.label}
                </label>
                <FieldInput field={f} error={state.fieldErrors?.[f.key]} />
                {state.fieldErrors?.[f.key] ? <span className="field-error">{state.fieldErrors[f.key]}</span> : f.help ? <span className="field-hint">{f.help}</span> : null}
              </div>
            ),
          )}
          {state.error && !state.ok ? <div className="form-error">{state.error}</div> : null}
          <div className="form-actions">
            <Button size="sm" onClick={() => setEditing(false)} disabled={pending}>
              Cancel
            </Button>
            <Button size="sm" variant="primary" type="submit" pending={pending} pendingText="Saving">
              Save
            </Button>
          </div>
        </form>
      ) : (
        <dl className="props-list">
          {group.fields.map((f) => (
            <div key={f.key} className="props-item">
              <dt>{f.label}</dt>
              <Display field={f} />
            </div>
          ))}
        </dl>
      )}
    </section>
  );
}

export function PropertiesPanel({ groups, action, hidden, label = 'Properties' }: { groups: PropertyGroup[]; action?: Action; hidden?: Record<string, string>; label?: string }) {
  return (
    <aside aria-label={label} className="record-left">
      {groups.map((g) => (
        <Group key={g.name} group={g} action={action} hidden={hidden} />
      ))}
    </aside>
  );
}
