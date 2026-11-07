/**
 * lib/field-types.ts, the custom field type names and labels. No database import,
 * so client components (the field editor) can use it. lib/fields.ts re-exports it.
 */
export type CustomObjectType = 'organization' | 'contact' | 'lead' | 'deal' | 'project' | 'ticket' | 'invoice' | 'task';

export type FieldType =
  | 'text' | 'textarea' | 'number' | 'currency' | 'percent' | 'date' | 'datetime' | 'select' | 'multiselect'
  | 'checkbox' | 'user' | 'email' | 'phone' | 'url' | 'file' | 'calculation' | 'rollup' | 'record_link';

/** Labels for the "Field types you can add" list on /settings/fields, in design order. */
export const FIELD_TYPE_LABELS: Record<FieldType, string> = {
  text: 'Single line text', textarea: 'Multi line text', number: 'Number', currency: 'Currency', percent: 'Percent',
  date: 'Date', datetime: 'Date and time', select: 'Dropdown', multiselect: 'Multi select', checkbox: 'Checkbox',
  user: 'User', email: 'Email', phone: 'Phone', url: 'URL', file: 'File', calculation: 'Calculation',
  rollup: 'Rollup', record_link: 'Link to record',
};

/** Types whose value is computed, never typed. */
export const COMPUTED_FIELD_TYPES: FieldType[] = ['calculation', 'rollup'];

