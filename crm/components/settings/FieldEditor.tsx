'use client';
/**
 * Create or edit a custom field in a modal. The internal name and type are set
 * once and shown read only afterwards. Options, calculation and rollup settings
 * live in state and go to saveFieldAction as one JSON payload.
 */
import { useEffect, useMemo, useState, useTransition } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Field, Input, Checkbox } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { FIELD_TYPE_LABELS, type CustomObjectType, type FieldType } from '@/lib/field-types';
import { ADDABLE_TYPES, NUMERIC_TYPES, ROLLUP_FNS, ROLLUP_RELATIONS, TYPES_WITH_OPTIONS, UNIQUE_CAPABLE } from '@/lib/settings/field-config';
import { CUSTOM_OBJECTS, slugKey } from '@/lib/settings/core-fields';
import { parseExpression } from '@/lib/settings/calc';
import type { ActionState } from '@/lib/forms';
import type { FieldListRow } from '@/lib/settings/fields';
import { saveFieldAction } from '@/app/(app)/settings/fields/actions';
import s from './settings.module.css';

type Opt = { value: string; label: string; isNew?: boolean };

export type FieldEditorProps = {
  objectType: CustomObjectType;
  objectLabel: string;
  groups: { id: string; name: string }[];
  /** Number fields usable in a calculation, core and custom. */
  calcFields: { key: string; label: string }[];
  /** Number custom fields of every object, for rollups over custom values. */
  numericCustoms: Partial<Record<CustomObjectType, { key: string; label: string }[]>>;
  field?: FieldListRow;
  trigger: 'new' | 'edit';
};

export function FieldEditor(props: FieldEditorProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      {props.trigger === 'new' ? (
        <Button variant="primary" onClick={() => setOpen(true)}>
          New field
        </Button>
      ) : (
        <Button variant="secondary" size="xs" onClick={() => setOpen(true)} aria-label={`Edit ${props.field?.label}`}>
          Edit
        </Button>
      )}
      {open ? <EditorModal {...props} onClose={() => setOpen(false)} /> : null}
    </>
  );
}

function EditorModal({ objectType, objectLabel, groups, calcFields, numericCustoms, field, onClose }: FieldEditorProps & { onClose: () => void }) {
  const editing = Boolean(field);
  const [label, setLabel] = useState(field?.label ?? '');
  const [key, setKey] = useState(field?.internal_name ?? '');
  const [keyTouched, setKeyTouched] = useState(editing);
  const [type, setType] = useState<FieldType>(field?.field_type ?? 'text');
  const [groupId, setGroupId] = useState<string>(field?.group_id ?? '');
  const [newGroup, setNewGroup] = useState('');
  const [help, setHelp] = useState(field?.help_text ?? '');
  const [required, setRequired] = useState(field?.is_required ?? false);
  const [unique, setUnique] = useState(field?.is_unique ?? false);
  const [options, setOptions] = useState<Opt[]>(field?.options ?? []);
  const [min, setMin] = useState(field?.validation?.min?.toString() ?? '');
  const [max, setMax] = useState(field?.validation?.max?.toString() ?? '');
  const [maxLength, setMaxLength] = useState(field?.validation?.maxLength?.toString() ?? '');
  const cfg = (field?.config ?? {}) as Record<string, unknown>;
  const [expression, setExpression] = useState(String(cfg.expression ?? ''));
  const relations = ROLLUP_RELATIONS[objectType] ?? [];
  const [relation, setRelation] = useState(String(cfg.relation ?? relations[0]?.key ?? ''));
  const [fn, setFn] = useState(String(cfg.fn ?? 'sum'));
  const [rollField, setRollField] = useState(String(cfg.field ?? ''));
  const [openOnly, setOpenOnly] = useState(Boolean(cfg.openOnly));
  const [target, setTarget] = useState(String(cfg.target ?? 'organization'));
  const [state, setState] = useState<ActionState>({ ok: false });
  const [pending, start] = useTransition();

  useEffect(() => {
    if (!keyTouched) setKey(slugKey(label));
  }, [label, keyTouched]);

  const rel = relations.find((r) => r.key === relation);
  const rollFields = useMemo(() => {
    if (!rel) return [];
    const customs = rel.customOf ? numericCustoms[rel.customOf] ?? [] : [];
    return [...rel.fields, ...customs.map((c) => ({ key: `custom.${c.key}`, label: c.label }))];
  }, [rel, numericCustoms]);
  useEffect(() => {
    if (type === 'rollup' && fn !== 'count' && rollFields.length && !rollFields.some((f) => f.key === rollField)) setRollField(rollFields[0].key);
  }, [type, fn, rollFields, rollField]);

  const calcCheck = type === 'calculation' && expression.trim() ? parseExpression(expression, calcFields.map((f) => f.key).filter((k) => k !== key)) : null;
  const fe = state.fieldErrors ?? {};
  const duplicates = (state.data as { duplicates?: { value: string; records: { id: string; label: string }[] }[] } | undefined)?.duplicates;
  const computed = type === 'calculation' || type === 'rollup';

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const num = (v: string) => (v.trim() === '' ? null : Number(v));
    const payload = {
      id: field?.id ?? null,
      objectType,
      internalName: key,
      label,
      fieldType: type,
      groupId: groupId && groupId !== '__new' ? groupId : null,
      newGroupName: groupId === '__new' ? newGroup : null,
      helpText: help || null,
      isRequired: required,
      isUnique: unique,
      options: options.map((o) => ({ value: o.isNew ? slugKey(o.label) || o.label.toLowerCase() : o.value, label: o.label })),
      validation: { min: num(min), max: num(max), maxLength: num(maxLength) },
      config:
        type === 'calculation'
          ? { expression }
          : type === 'rollup'
            ? { relation, fn, field: fn === 'count' ? null : rollField, openOnly }
            : type === 'record_link'
              ? { target }
              : null,
    };
    const fd = new FormData();
    fd.set('payload', JSON.stringify(payload));
    start(async () => {
      const res = await saveFieldAction({ ok: false }, fd);
      setState(res);
      if (res.ok) onClose();
    });
  }

  return (
    <Modal
      open
      onClose={onClose}
      wide
      title={editing ? `Edit ${field?.label}` : `New field on ${objectLabel.toLowerCase()}`}
      footer={
        <>
          <Button onClick={onClose}>Cancel</Button>
          <Button variant="primary" type="submit" form="field-editor" pending={pending} pendingText="Saving">
            {editing ? 'Save field' : 'Add field'}
          </Button>
        </>
      }
    >
      <form id="field-editor" onSubmit={submit} className="stack">
        {state.error ? (
          <div className="form-error" role="alert">
            {state.error}
            {duplicates?.length ? (
              <ul style={{ margin: '8px 0 0', paddingLeft: 18 }}>
                {duplicates.slice(0, 10).map((d) => (
                  <li key={d.value}>
                    <span className="mono">{d.value}</span> on {d.records.map((r) => r.label).join(', ')}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        ) : null}
        <div className="form-grid">
          <Field label="Label" htmlFor="f-label" required error={fe.label}>
            <Input id="f-label" value={label} onChange={(e) => setLabel(e.target.value)} maxLength={80} invalid={!!fe.label} autoComplete="off" />
          </Field>
          <Field
            label="Internal name"
            htmlFor="f-key"
            error={fe.internalName}
            hint={editing ? 'Fixed after creation, imports, exports and the API use it' : 'Set once. Lower case letters, digits and underscores'}
          >
            <Input
              id="f-key"
              className="mono"
              value={key}
              disabled={editing}
              onChange={(e) => {
                setKeyTouched(true);
                setKey(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, '_'));
              }}
              maxLength={63}
              invalid={!!fe.internalName}
            />
          </Field>
          <Field label="Type" htmlFor="f-type" error={fe.fieldType} hint={editing ? 'Fixed after creation' : undefined}>
            <Select
              id="f-type"
              value={type}
              disabled={editing}
              onChange={(e) => setType(e.target.value as FieldType)}
              options={ADDABLE_TYPES.map((t) => ({ value: t, label: FIELD_TYPE_LABELS[t] }))}
            />
          </Field>
          <Field label="Group" htmlFor="f-group" error={fe.groupId} hint="Where it shows on the record">
            <Select
              id="f-group"
              value={groupId}
              onChange={(e) => setGroupId(e.target.value)}
              options={[{ value: '', label: 'Custom fields' }, ...groups.map((g) => ({ value: g.id, label: g.name })), { value: '__new', label: 'New group' }]}
            />
          </Field>
          {groupId === '__new' ? (
            <Field label="New group name" htmlFor="f-newgroup" required>
              <Input id="f-newgroup" value={newGroup} onChange={(e) => setNewGroup(e.target.value)} maxLength={60} />
            </Field>
          ) : null}
          <Field label="Help text" htmlFor="f-help" className="field-full" hint="Shown under the field when someone edits it">
            <Input id="f-help" value={help} onChange={(e) => setHelp(e.target.value)} maxLength={300} />
          </Field>
        </div>

        {TYPES_WITH_OPTIONS.includes(type) ? (
          <fieldset className="stack-sm" style={{ border: 0, padding: 0, margin: 0 }}>
            <legend className="field-label" style={{ marginBottom: 6 }}>
              Options
            </legend>
            {options.map((o, i) => (
              <div key={i} className={s.optionRow}>
                <Input
                  aria-label={`Option ${i + 1}`}
                  value={o.label}
                  onChange={(e) => setOptions(options.map((x, j) => (j === i ? { ...x, label: e.target.value } : x)))}
                  maxLength={100}
                />
                {!o.isNew ? <span className={s.key} title="Stored value">{o.value}</span> : null}
                <Button size="xs" variant="ghost" aria-label={`Remove option ${o.label || i + 1}`} onClick={() => setOptions(options.filter((_, j) => j !== i))}>
                  Remove
                </Button>
              </div>
            ))}
            <div>
              <Button size="sm" onClick={() => setOptions([...options, { value: '', label: '', isNew: true }])}>
                Add option
              </Button>
            </div>
            {fe.options ? <span className="field-error">{fe.options}</span> : null}
            {editing ? <span className="field-hint">Renaming an option keeps the stored value, so records keep their choice.</span> : null}
          </fieldset>
        ) : null}

        {NUMERIC_TYPES.includes(type) ? (
          <div className="form-grid">
            <Field label="Minimum" htmlFor="f-min" error={fe.validation}>
              <Input id="f-min" type="number" step="any" value={min} onChange={(e) => setMin(e.target.value)} className="mono" />
            </Field>
            <Field label="Maximum" htmlFor="f-max">
              <Input id="f-max" type="number" step="any" value={max} onChange={(e) => setMax(e.target.value)} className="mono" />
            </Field>
          </div>
        ) : null}
        {type === 'text' || type === 'textarea' ? (
          <div className="form-grid">
            <Field label="Longest allowed" htmlFor="f-maxlen" hint="Characters, leave empty for the default">
              <Input id="f-maxlen" type="number" min={1} value={maxLength} onChange={(e) => setMaxLength(e.target.value)} className="mono" />
            </Field>
          </div>
        ) : null}

        {type === 'calculation' ? (
          <div className="stack-sm">
            <Field
              label="Expression"
              htmlFor="f-expr"
              error={fe.expression ?? (calcCheck && !calcCheck.ok ? calcCheck.error : undefined)}
              hint="Use number fields of this object with + - * / and brackets, for example amount * probability / 100"
            >
              <Textarea id="f-expr" className="mono" rows={2} value={expression} onChange={(e) => setExpression(e.target.value)} />
            </Field>
            <div className={s.reqChips} aria-label="Fields you can use">
              {calcFields.filter((f) => f.key !== key).map((f) => (
                <button key={f.key} type="button" className="pill" onClick={() => setExpression((x) => `${x}${x && !/\s$/.test(x) ? ' ' : ''}${f.key}`)} title={f.label}>
                  {f.key}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        {type === 'rollup' ? (
          relations.length ? (
            <div className="form-grid">
              <Field label="Related records" htmlFor="f-rel" error={fe.relation}>
                <Select id="f-rel" value={relation} onChange={(e) => setRelation(e.target.value)} options={relations.map((r) => ({ value: r.key, label: r.label }))} />
              </Field>
              <Field label="Function" htmlFor="f-fn" error={fe.fn}>
                <Select id="f-fn" value={fn} onChange={(e) => setFn(e.target.value)} options={ROLLUP_FNS} />
              </Field>
              {fn !== 'count' ? (
                <Field label="Of" htmlFor="f-rf" error={fe.field} hint={rollFields.length ? undefined : 'No number fields on these records, use count'}>
                  <Select id="f-rf" value={rollField} onChange={(e) => setRollField(e.target.value)} options={rollFields.map((f) => ({ value: f.key, label: f.label }))} />
                </Field>
              ) : null}
              {rel?.openWhere ? (
                <div className="field" style={{ justifyContent: 'flex-end' }}>
                  <Checkbox label="Open ones only" checked={openOnly} onChange={(e) => setOpenOnly(e.target.checked)} />
                </div>
              ) : null}
            </div>
          ) : (
            <p className="form-note">{objectLabel} have no related records to roll up yet.</p>
          )
        ) : null}

        {type === 'record_link' ? (
          <div className="form-grid">
            <Field label="Links to" htmlFor="f-target" error={fe.target}>
              <Select id="f-target" value={target} onChange={(e) => setTarget(e.target.value)} options={CUSTOM_OBJECTS.map((o) => ({ value: o.value, label: o.label }))} />
            </Field>
          </div>
        ) : null}

        <div className="row" style={{ gap: 18 }}>
          {!computed ? <Checkbox label="Required on create" checked={required} onChange={(e) => setRequired(e.target.checked)} /> : null}
          {UNIQUE_CAPABLE.includes(type) ? (
            <Checkbox label="Unique, no two records share a value" checked={unique} onChange={(e) => setUnique(e.target.checked)} />
          ) : null}
        </div>
        {unique && !field?.is_unique && editing ? (
          <p className="form-note">Existing values are checked first. If two records share a value you get the list and nothing changes.</p>
        ) : null}
        {computed ? <p className="form-note">Calculated when a record is opened, never typed and never stored.</p> : null}
      </form>
    </Modal>
  );
}
