/**
 * lib/settings/field-config.ts, what each custom field type needs, the rollup
 * relations, and the config shapes stored in field_definitions.config. Pure,
 * safe in client code (the field editor uses it).
 *
 *   ADDABLE_TYPES                       // the types /settings/fields offers, in design order
 *   ROLLUP_RELATIONS.organization       // [{ key: 'deals', label: 'Deals', fields: [...] }, ...]
 *   rollupRelation('organization', 'deals')
 *
 * Stored config
 *   calculation  { expression: 'amount * probability / 100' }
 *   rollup       { relation: 'deals', fn: 'sum', field: 'amount', openOnly?: true }
 *   record_link  { target: 'organization' }
 */
import type { CustomObjectType, FieldType } from '@/lib/fields';

/** Types in the order of the design's "Field types you can add". File waits for storage (V2). */
export const ADDABLE_TYPES: FieldType[] = [
  'text', 'textarea', 'number', 'currency', 'percent', 'date', 'datetime', 'select', 'multiselect',
  'checkbox', 'user', 'email', 'phone', 'url', 'calculation', 'rollup', 'record_link',
];

export const TYPES_WITH_OPTIONS: FieldType[] = ['select', 'multiselect'];
export const NUMERIC_TYPES: FieldType[] = ['number', 'currency', 'percent'];
/** A unique rule makes sense only where one value identifies one record. */
export const UNIQUE_CAPABLE: FieldType[] = ['text', 'number', 'email', 'phone', 'url'];

export type RollupFn = 'sum' | 'count' | 'min' | 'max' | 'avg';
export const ROLLUP_FNS: { value: RollupFn; label: string }[] = [
  { value: 'sum', label: 'Sum' },
  { value: 'count', label: 'Count' },
  { value: 'min', label: 'Minimum' },
  { value: 'max', label: 'Maximum' },
  { value: 'avg', label: 'Average' },
];

export type RollupRelation = {
  key: string;
  label: string;
  /** The related table and how it points at the record. */
  table: string;
  /** SQL join condition, $id is the record id parameter. Only fixed text from this file. */
  where: string;
  /** Numeric columns of the related table that can be summed and so on. */
  fields: { key: string; label: string }[];
  /** Custom fields of this object type can be rolled up too. */
  customOf?: CustomObjectType;
  /** Rows of this relation that are open, for the "open only" option. */
  openWhere?: string;
};

const live = 'r.deleted_at is null';

export const ROLLUP_RELATIONS: Partial<Record<CustomObjectType, RollupRelation[]>> = {
  organization: [
    {
      key: 'deals', label: 'Deals', table: 'deals', where: `r.organization_id = $id and ${live}`, customOf: 'deal',
      fields: [{ key: 'amount', label: 'Amount' }],
      openWhere: `exists (select 1 from pipeline_stages s where s.id = r.stage_id and s.state = 'open')`,
    },
    {
      key: 'projects', label: 'Projects', table: 'projects', where: `r.organization_id = $id and ${live}`, customOf: 'project',
      fields: [{ key: 'budget_amount', label: 'Budget' }, { key: 'budget_hours', label: 'Budget hours' }],
      openWhere: `r.status = 'active'`,
    },
    {
      key: 'invoices', label: 'Invoices', table: 'invoices', where: `r.organization_id = $id and ${live}`, customOf: 'invoice',
      fields: [{ key: 'total', label: 'Total' }, { key: 'subtotal', label: 'Subtotal' }],
      openWhere: `r.state in ('open', 'late')`,
    },
    {
      key: 'tickets', label: 'Tickets', table: 'tickets', where: `r.organization_id = $id and ${live}`, customOf: 'ticket',
      fields: [], openWhere: `r.closed_at is null`,
    },
    {
      key: 'contacts', label: 'Contacts', table: 'contacts', where: `r.primary_org_id = $id and ${live}`, customOf: 'contact',
      fields: [],
    },
    {
      key: 'leads', label: 'Leads', table: 'leads', where: `r.organization_id = $id and ${live}`, customOf: 'lead',
      fields: [{ key: 'angle_worth_eur', label: 'Worth' }],
    },
  ],
  contact: [
    {
      key: 'deals', label: 'Deals they are on', table: 'deals',
      where: `exists (select 1 from deal_contacts dc where dc.deal_id = r.id and dc.contact_id = $id) and ${live}`, customOf: 'deal',
      fields: [{ key: 'amount', label: 'Amount' }],
      openWhere: `exists (select 1 from pipeline_stages s where s.id = r.stage_id and s.state = 'open')`,
    },
    { key: 'leads', label: 'Leads', table: 'leads', where: `r.contact_id = $id and ${live}`, customOf: 'lead', fields: [{ key: 'angle_worth_eur', label: 'Worth' }] },
    { key: 'tickets', label: 'Tickets', table: 'tickets', where: `r.contact_id = $id and ${live}`, customOf: 'ticket', fields: [], openWhere: `r.closed_at is null` },
  ],
  deal: [
    {
      key: 'line_items', label: 'Line items', table: 'line_items', where: `r.deal_id = $id and r.quote_id is null and r.invoice_id is null`,
      fields: [{ key: 'quantity', label: 'Quantity' }, { key: 'unit_price', label: 'Unit price' }],
    },
    { key: 'invoices', label: 'Invoices', table: 'invoices', where: `r.deal_id = $id and ${live}`, customOf: 'invoice', fields: [{ key: 'total', label: 'Total' }] },
  ],
  project: [
    { key: 'time_entries', label: 'Time entries', table: 'time_entries', where: `r.project_id = $id`, fields: [{ key: 'minutes', label: 'Minutes' }] },
    { key: 'milestones', label: 'Milestones', table: 'project_milestones', where: `r.project_id = $id`, fields: [{ key: 'amount', label: 'Amount' }], openWhere: `r.completed_at is null` },
    { key: 'invoices', label: 'Invoices', table: 'invoices', where: `r.project_id = $id and ${live}`, customOf: 'invoice', fields: [{ key: 'total', label: 'Total' }] },
    { key: 'tickets', label: 'Tickets', table: 'tickets', where: `r.project_id = $id and ${live}`, customOf: 'ticket', fields: [], openWhere: `r.closed_at is null` },
  ],
  invoice: [
    { key: 'line_items', label: 'Line items', table: 'line_items', where: `r.invoice_id = $id`, fields: [{ key: 'quantity', label: 'Quantity' }, { key: 'unit_price', label: 'Unit price' }] },
  ],
};

export function rollupRelation(objectType: CustomObjectType, key: string): RollupRelation | null {
  return ROLLUP_RELATIONS[objectType]?.find((r) => r.key === key) ?? null;
}

export type RollupConfig = { relation: string; fn: RollupFn; field?: string | null; openOnly?: boolean };
export type CalculationConfig = { expression: string };
export type RecordLinkConfig = { target: CustomObjectType };

/** One line under the field in the Fields table, for example "Sum of deals, amount, open only". */
export function describeConfig(
  type: FieldType,
  config: Record<string, unknown> | null,
  objectType: CustomObjectType,
  labels: Record<string, string> = {},
): string {
  if (!config) return '';
  if (type === 'calculation') return String(config.expression ?? '');
  if (type === 'rollup') {
    const rel = rollupRelation(objectType, String(config.relation ?? ''));
    const fn = ROLLUP_FNS.find((f) => f.value === config.fn)?.label ?? String(config.fn ?? '');
    const fieldKey = config.field ? String(config.field) : '';
    const fieldLabel = rel?.fields.find((f) => f.key === fieldKey)?.label ?? labels[fieldKey] ?? fieldKey;
    return [`${fn} of ${(rel?.label ?? String(config.relation)).toLowerCase()}`, config.fn === 'count' ? '' : fieldLabel.toLowerCase(), config.openOnly ? 'open only' : '']
      .filter(Boolean)
      .join(', ');
  }
  if (type === 'record_link') return `Links to ${String(config.target ?? '')}`;
  return '';
}
