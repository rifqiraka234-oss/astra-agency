/**
 * lib/routes.ts, one place for record URLs and object names.
 *   recordHref('deal', id)  -> '/deals/<id>'
 *   OBJECT_LABELS.deal      -> { one: 'Deal', many: 'Deals' }
 */
export type RecordType = 'organization' | 'contact' | 'lead' | 'deal' | 'project' | 'ticket' | 'invoice' | 'task';

const PATHS: Record<RecordType, string> = {
  organization: '/organizations',
  contact: '/contacts',
  lead: '/leads',
  deal: '/deals',
  project: '/projects',
  ticket: '/tickets',
  invoice: '/invoices',
  task: '/tasks',
};

export const OBJECT_LABELS: Record<RecordType, { one: string; many: string }> = {
  organization: { one: 'Organization', many: 'Organizations' },
  contact: { one: 'Contact', many: 'Contacts' },
  lead: { one: 'Lead', many: 'Leads' },
  deal: { one: 'Deal', many: 'Deals' },
  project: { one: 'Project', many: 'Projects' },
  ticket: { one: 'Ticket', many: 'Tickets' },
  invoice: { one: 'Invoice', many: 'Invoices' },
  task: { one: 'Task', many: 'Tasks' },
};

/** The page of a record. Tasks have no page of their own, they open in the drawer on /tasks. */
export function recordHref(type: RecordType, id: string): string {
  return type === 'task' ? `/tasks?task=${id}` : `${PATHS[type]}/${id}`;
}

/** The list page of an object type. */
export function listHref(type: RecordType): string {
  return PATHS[type];
}
