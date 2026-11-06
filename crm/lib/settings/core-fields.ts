/**
 * lib/settings/core-fields.ts, the fixed core fields of every object, as the
 * Fields screen lists them (read only), plus which of them can be a stage gate.
 * Pure, safe in client code.
 *
 *   CORE_FIELDS.deal                 // CoreField[] for the Fields table
 *   gateCandidates('deal', customs)  // fields a stage can require, core then custom
 *   OBJECT_TABLES.contact            // 'contacts'
 */
import type { CustomObjectType, FieldType } from '@/lib/fields';

export type GateInputType = 'text' | 'textarea' | 'number' | 'money' | 'date' | 'datetime' | 'url' | 'select' | 'user' | 'contact';

export type CoreField = {
  key: string;
  label: string;
  /** How the Fields table describes the type. */
  type: string;
  group: string;
  rules: string;
  /** Set when a stage may require this field before a record enters it. */
  gate?: GateInputType;
};

export const CUSTOM_OBJECTS: { value: CustomObjectType; label: string }[] = [
  { value: 'organization', label: 'Organizations' },
  { value: 'contact', label: 'Contacts' },
  { value: 'lead', label: 'Leads' },
  { value: 'deal', label: 'Deals' },
  { value: 'project', label: 'Projects' },
  { value: 'ticket', label: 'Tickets' },
  { value: 'invoice', label: 'Invoices' },
  { value: 'task', label: 'Tasks' },
];

export const OBJECT_TABLES: Record<CustomObjectType, string> = {
  organization: 'organizations',
  contact: 'contacts',
  lead: 'leads',
  deal: 'deals',
  project: 'projects',
  ticket: 'tickets',
  invoice: 'invoices',
  task: 'tasks',
};

const F = (key: string, label: string, type: string, group: string, rules = '', gate?: GateInputType): CoreField => ({ key, label, type, group, rules, gate });

export const CORE_FIELDS: Record<CustomObjectType, CoreField[]> = {
  organization: [
    F('name', 'Name', 'Single line text', 'About', 'Required'),
    F('domains', 'Domains', 'Domain list', 'About', 'Unique, normalised'),
    F('industry', 'Industry', 'Dropdown', 'About', '24 options'),
    F('employee_band', 'Employees', 'Dropdown', 'About'),
    F('city', 'City', 'Single line text', 'About'),
    F('country', 'Country', 'Single line text', 'About', 'Two letter code'),
    F('owner_user_id', 'Record owner', 'User', 'Ownership'),
    F('account_manager_user_id', 'Account manager', 'User', 'Ownership'),
    F('lifecycle_stage', 'Lifecycle stage', 'Dropdown', 'Account', 'Set by system, forward only'),
    F('relationship_status', 'Relationship', 'Dropdown', 'Account'),
    F('health', 'Health', 'Dropdown', 'Account'),
    F('kvk_number', 'KvK number', 'Single line text', 'Legal'),
    F('vat_number', 'VAT number', 'Single line text', 'Legal'),
  ],
  contact: [
    F('first_name', 'First name', 'Single line text', 'About', 'Required'),
    F('last_name', 'Last name', 'Single line text', 'About'),
    F('emails', 'Emails', 'Email list', 'About', 'Unique, case ignored'),
    F('phones', 'Phones', 'Phone list', 'About'),
    F('linkedin_url', 'LinkedIn URL', 'URL', 'About', 'Unique, normalised'),
    F('job_title', 'Job title', 'Single line text', 'About'),
    F('tagline', 'LinkedIn headline', 'Single line text', 'About'),
    F('lawful_basis', 'Lawful basis', 'Dropdown', 'Privacy', 'Required'),
    F('do_not_contact', 'Do not contact', 'Checkbox', 'Privacy', 'Adds to suppression list'),
  ],
  lead: [
    F('stage_id', 'Stage', 'Pipeline stage', 'Pipeline', 'Required'),
    F('research_status', 'Research status', 'Dropdown', 'Research'),
    F('angle', 'Angle', 'Multi line text', 'Research', '', 'textarea'),
    F('angle_worth_eur', 'Worth', 'Currency', 'Research', 'At least €2,500', 'money'),
    F('next_step', 'Next step', 'Single line text', 'Pipeline', '', 'text'),
    F('status_note', 'Status note', 'Single line text', 'Pipeline', '', 'text'),
    F('disqualify_reason', 'Disqualify reason', 'Dropdown', 'Pipeline', 'Required on Disqualified', 'select'),
    F('linkedin_accepted_at', 'Accepted on LinkedIn', 'Date and time', 'Source', 'From lemlist', 'datetime'),
  ],
  deal: [
    F('name', 'Name', 'Single line text', 'Deal', 'Required'),
    F('amount', 'Amount', 'Currency', 'Deal', '€500 to €50,000 warns outside', 'money'),
    F('close_date', 'Close date', 'Date', 'Deal', '', 'date'),
    F('stage_id', 'Stage', 'Pipeline stage', 'Deal', 'Required'),
    F('probability', 'Probability', 'Percent', 'Deal', 'From stage'),
    F('next_step', 'Next step', 'Single line text', 'Deal', '', 'text'),
    F('meeting_at', 'Meeting date', 'Date and time', 'Gate', '', 'datetime'),
    F('build_card_url', 'Build card link', 'URL', 'Gate', '', 'url'),
    F('prototype_url', 'Prototype URL', 'URL', 'Gate', '', 'url'),
    F('quote_ref', 'Quote', 'Single line text', 'Gate', '', 'text'),
    F('decision_date', 'Decision date', 'Date', 'Gate', '', 'date'),
    F('signer', 'Signer', 'Single line text', 'Gate', '', 'text'),
    F('start_date', 'Start date', 'Date', 'Close', '', 'date'),
    F('won_reason', 'Won reason', 'Single line text', 'Close', 'Required on Won', 'text'),
    F('lost_reason', 'Lost reason', 'Dropdown', 'Close', 'Required on Lost', 'select'),
    F('lost_competitor', 'Lost to', 'Single line text', 'Close', '', 'text'),
  ],
  project: [
    F('name', 'Name', 'Single line text', 'About', 'Required'),
    F('stage_id', 'Stage', 'Pipeline stage', 'Delivery'),
    F('health', 'Health', 'Dropdown', 'Delivery'),
    F('start_date', 'Start date', 'Date', 'Delivery', '', 'date'),
    F('due_date', 'Due date', 'Date', 'Delivery', '', 'date'),
    F('budget_amount', 'Budget', 'Currency', 'Money', 'From won deal', 'money'),
    F('budget_hours', 'Budget hours', 'Number', 'Money', '', 'number'),
    F('live_url', 'Live URL', 'URL', 'Delivery', '', 'url'),
    F('repo_url', 'Repository', 'URL', 'Delivery', '', 'url'),
  ],
  ticket: [
    F('subject', 'Subject', 'Single line text', 'About', 'Required'),
    F('priority', 'Priority', 'Dropdown', 'About'),
    F('stage_id', 'Status', 'Pipeline stage', 'About'),
    F('category', 'Category', 'Single line text', 'About', '', 'text'),
    F('description', 'Description', 'Multi line text', 'About', '', 'textarea'),
    F('source', 'Source', 'Dropdown', 'About', 'Portal, email, manual, phone'),
  ],
  invoice: [
    F('external_number', 'Number', 'Single line text', 'Legal', 'From the provider, gapless'),
    F('state', 'Status', 'Dropdown', 'Money', 'Draft, open, paid, late, void'),
    F('issue_date', 'Issue date', 'Date', 'Money'),
    F('due_date', 'Due date', 'Date', 'Money'),
    F('vat_treatment', 'VAT treatment', 'Dropdown', 'Legal', 'NL 21%, reverse charge, export'),
  ],
  task: [
    F('title', 'Title', 'Single line text', 'Task', 'Required'),
    F('type', 'Type', 'Dropdown', 'Task'),
    F('owner_user_id', 'Owner', 'User', 'Task'),
    F('due_at', 'Due', 'Date and time', 'Task'),
    F('recurrence_rule', 'Repeat', 'Repeat rule', 'Task'),
    F('remind_before_minutes', 'Reminder', 'Duration', 'Task'),
  ],
};

/** Every key a custom field may not take, because a core column or list already uses it. */
export function reservedKeys(objectType: CustomObjectType): Set<string> {
  const base = ['id', 'custom', 'created_at', 'updated_at', 'deleted_at', 'sample', 'full_name', 'owner_id', 'pipeline_id'];
  return new Set([...base, ...CORE_FIELDS[objectType].map((f) => f.key)]);
}

/** How a custom field type renders in the stage gate dialog, or null when it cannot be a gate. */
export function gateTypeFor(t: FieldType): GateInputType | null {
  switch (t) {
    case 'text':
    case 'email':
    case 'phone':
      return 'text';
    case 'textarea':
      return 'textarea';
    case 'number':
    case 'percent':
      return 'number';
    case 'currency':
      return 'money';
    case 'date':
      return 'date';
    case 'datetime':
      return 'datetime';
    case 'url':
      return 'url';
    case 'select':
      return 'select';
    case 'user':
      return 'user';
    default:
      return null;
  }
}

export type GateCandidate = { key: string; label: string; input: GateInputType; custom: boolean; options?: { value: string; label: string }[] | null };

/** Fields a stage of this object type may require, core first. */
export function gateCandidates(
  objectType: CustomObjectType,
  customs: { internal_name: string; label: string; field_type: FieldType; options: { value: string; label: string }[] | null }[],
): GateCandidate[] {
  const core = CORE_FIELDS[objectType]
    .filter((f) => f.gate)
    .map((f) => ({ key: f.key, label: f.label, input: f.gate as GateInputType, custom: false }));
  const custom = customs
    .map((d) => ({ d, input: gateTypeFor(d.field_type) }))
    .filter((x) => x.input)
    .map(({ d, input }) => ({ key: d.internal_name, label: d.label, input: input as GateInputType, custom: true, options: d.options }));
  return [...core, ...custom];
}

/** 'Open deal value' -> 'open_deal_value'. */
export function slugKey(label: string): string {
  const s = label
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, 60);
  return /^[a-z]/.test(s) ? s : s ? `f_${s}` : '';
}
