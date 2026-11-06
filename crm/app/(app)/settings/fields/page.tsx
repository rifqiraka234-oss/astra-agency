import Link from 'next/link';
import { sql } from '@/lib/db';
import { FIELD_TYPE_LABELS, type CustomObjectType } from '@/lib/fields';
import { CORE_FIELDS, CUSTOM_OBJECTS } from '@/lib/settings/core-fields';
import { NUMERIC_CORE_FIELDS } from '@/lib/settings/calc';
import { ADDABLE_TYPES, describeConfig } from '@/lib/settings/field-config';
import { listFields, listGroups, type FieldListRow } from '@/lib/settings/fields';
import { PanelHeader } from '@/components/settings/PanelHeader';
import { FieldEditor } from '@/components/settings/FieldEditor';
import { ActionButton } from '@/components/settings/ActionButton';
import { Badge } from '@/components/ui/Badge';
import { archiveFieldAction, moveFieldAction } from './actions';
import s from '@/components/settings/settings.module.css';

export const metadata = { title: 'Fields, Settings' };

function rulesOf(f: FieldListRow, objectType: CustomObjectType): string {
  const parts: string[] = [];
  if (f.is_required) parts.push('Required');
  if (f.is_unique) parts.push('Unique');
  if (f.options?.length) parts.push(`${f.options.length} ${f.options.length === 1 ? 'option' : 'options'}`);
  if (f.validation?.min !== undefined && f.validation?.max !== undefined) parts.push(`${f.validation.min} to ${f.validation.max}`);
  else if (f.validation?.min !== undefined) parts.push(`At least ${f.validation.min}`);
  else if (f.validation?.max !== undefined) parts.push(`At most ${f.validation.max}`);
  if (f.validation?.maxLength) parts.push(`Up to ${f.validation.maxLength} characters`);
  const cfg = describeConfig(f.field_type, f.config, objectType);
  if (cfg) parts.push(cfg);
  return parts.join(', ');
}

export default async function FieldsPage({ searchParams }: { searchParams: Promise<{ object?: string }> }) {
  const sp = await searchParams;
  const objectType = (CUSTOM_OBJECTS.find((o) => o.value === sp.object)?.value ?? 'organization') as CustomObjectType;
  const objectLabel = CUSTOM_OBJECTS.find((o) => o.value === objectType)!.label;
  const [fields, groups, numericAll] = await Promise.all([
    listFields(sql, objectType),
    listGroups(sql, objectType),
    sql<{ object_type: CustomObjectType; internal_name: string; label: string }[]>`
      select object_type, internal_name, label from field_definitions
       where archived_at is null and field_type in ('number', 'currency', 'percent') order by position`,
  ]);
  const numericCustoms: Partial<Record<CustomObjectType, { key: string; label: string }[]>> = {};
  for (const n of numericAll) (numericCustoms[n.object_type] ??= []).push({ key: n.internal_name, label: n.label });
  const calcFields = [
    ...(NUMERIC_CORE_FIELDS[objectType] ?? []).map((k) => ({ key: k, label: k.replace(/_/g, ' ') })),
    ...(numericCustoms[objectType] ?? []),
  ];
  const editorProps = { objectType, objectLabel, groups, calcFields, numericCustoms };
  const live = fields.filter((f) => !f.archived_at);
  const archived = fields.filter((f) => f.archived_at);

  return (
    <>
      <PanelHeader
        title="Fields"
        sub="Every object has fixed core fields plus the ones you add. Unique and required rules are checked on create, edit, import and the API."
        actions={<FieldEditor {...editorProps} trigger="new" />}
      />

      <div role="group" aria-label="Object" className={s.objects}>
        {CUSTOM_OBJECTS.map((o) => (
          <Link key={o.value} href={`/settings/fields?object=${o.value}`} className="pill" aria-current={o.value === objectType ? 'true' : undefined} scroll={false} style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none' }}>
            {o.label}
          </Link>
        ))}
      </div>

      <div className="card table-wrap">
        <table className={`table ${s.wide}`}>
          <caption className="sr-only">{objectLabel} fields</caption>
          <thead>
            <tr>
              <th scope="col">Label</th>
              <th scope="col">Internal name</th>
              <th scope="col">Type</th>
              <th scope="col">Group</th>
              <th scope="col">Rules</th>
              <th scope="col">Source</th>
              <th scope="col">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {CORE_FIELDS[objectType].map((f) => (
              <tr key={f.key}>
                <td className="strong">{f.label}</td>
                <td className={s.key}>{f.key}</td>
                <td>{f.type}</td>
                <td>{f.group}</td>
                <td className="text-13 secondary">{f.rules}</td>
                <td>
                  <span className={s.src}>Core</span>
                </td>
                <td />
              </tr>
            ))}
            {live.map((f, i) => (
              <tr key={f.id}>
                <td className="strong">
                  {f.label}
                  {f.help_text ? <div className="small muted" style={{ fontWeight: 400 }}>{f.help_text}</div> : null}
                </td>
                <td className={s.key}>{f.internal_name}</td>
                <td>{FIELD_TYPE_LABELS[f.field_type]}</td>
                <td>{f.group_name ?? 'Custom fields'}</td>
                <td className="text-13 secondary">
                  {rulesOf(f, objectType)}
                  {f.field_type !== 'calculation' && f.field_type !== 'rollup' ? (
                    <div className="small muted">
                      {f.values_count === 0 ? 'No values yet' : `${f.values_count} ${f.values_count === 1 ? 'record has' : 'records have'} a value`}
                    </div>
                  ) : null}
                </td>
                <td>
                  <span className={s.srcCustom}>Custom</span>
                </td>
                <td>
                  <div className="row" style={{ flexWrap: 'nowrap', gap: 4 }}>
                    <ActionButton action={moveFieldAction} fields={{ id: f.id, dir: 'up' }} size="xs" variant="ghost" label={`Move ${f.label} up`} disabled={i === 0} showMessage={false}>
                      Up
                    </ActionButton>
                    <ActionButton action={moveFieldAction} fields={{ id: f.id, dir: 'down' }} size="xs" variant="ghost" label={`Move ${f.label} down`} disabled={i === live.length - 1} showMessage={false}>
                      Down
                    </ActionButton>
                    <FieldEditor {...editorProps} field={f} trigger="edit" />
                    <ActionButton
                      action={archiveFieldAction}
                      fields={{ id: f.id, archived: 'true' }}
                      size="xs"
                      variant="danger"
                      confirm={`Archive ${f.label}? It disappears from records and forms. The values stay and come back if you restore it.`}
                      showMessage={false}
                    >
                      Archive
                    </ActionButton>
                  </div>
                </td>
              </tr>
            ))}
            {archived.map((f) => (
              <tr key={f.id} className="is-muted">
                <td>{f.label}</td>
                <td className={s.key}>{f.internal_name}</td>
                <td>{FIELD_TYPE_LABELS[f.field_type]}</td>
                <td>{f.group_name ?? 'Custom fields'}</td>
                <td className="text-13">
                  {f.values_count} {f.values_count === 1 ? 'value' : 'values'} kept
                </td>
                <td>
                  <Badge tone="grey">Archived</Badge>
                </td>
                <td>
                  <ActionButton action={archiveFieldAction} fields={{ id: f.id, archived: 'false' }} size="xs">
                    Restore
                  </ActionButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {live.length === 0 ? <p className="small muted" style={{ margin: 0 }}>No custom fields on {objectLabel.toLowerCase()} yet. Add one with New field.</p> : null}

      <div className="card card-pad stack-sm">
        <h3 className="card-title" style={{ fontSize: 15 }}>
          Field types you can add
        </h3>
        <div className={s.typeChips}>
          {ADDABLE_TYPES.map((t) => (
            <span key={t} className={s.typeChip}>
              {FIELD_TYPE_LABELS[t]}
            </span>
          ))}
          <span className={s.typeChipLater} title="Needs file storage, planned for V2">
            File, later
          </span>
        </div>
      </div>
    </>
  );
}
