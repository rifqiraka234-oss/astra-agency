/**
 * lib/data/import-fields.ts, what a CSV column can map to, per import object,
 * and a first guess of the mapping from the header names. Pure, safe in client code.
 *
 *   const targets = importTargets('contacts', contactCustomDefs);
 *   const mapping = guessMapping(['Company', 'Website', 'Email', 'Full name'], targets);
 *   // { Company: 'org.name', Website: 'org.domain', Email: 'contact.email', 'Full name': 'contact.full_name' }
 */

export type ImportObject = 'contacts' | 'organizations' | 'deals';

export const IMPORT_OBJECTS: { value: ImportObject; label: string; hint: string }[] = [
  { value: 'contacts', label: 'Contacts with organizations', hint: 'Matched on email, then LinkedIn. Organizations matched on domain.' },
  { value: 'organizations', label: 'Organizations', hint: 'Matched on domain.' },
  { value: 'deals', label: 'Deals', hint: 'Matched on the CRM id from an export, otherwise created. Organizations matched on domain.' },
];

export type ImportTarget = {
  key: string;
  label: string;
  /** Shown in the mapping select as an option group. */
  group: string;
  match?: boolean;
  /** Header names that map here without asking. Lower case, spaces collapsed. */
  aliases?: string[];
};

export type CustomTargetDef = { internal_name: string; label: string; field_type: string };

const T = (key: string, label: string, group: string, aliases: string[] = [], match = false): ImportTarget => ({ key, label, group, aliases, match });

const ORG_TARGETS = (group: string, prefix: string): ImportTarget[] => [
  T(`${prefix}name`, 'Name', group, ['company', 'company name', 'organization', 'organisation', 'organization name', 'account', 'bedrijf', 'bedrijfsnaam', 'companyname']),
  T(`${prefix}domain`, 'Domain, match key', group, ['website', 'domain', 'url', 'company domain', 'company website', 'site', 'companydomain', 'web'], true),
  T(`${prefix}industry`, 'Industry', group, ['industry', 'sector', 'branche']),
  T(`${prefix}city`, 'City', group, ['company city', 'city', 'plaats', 'stad']),
  T(`${prefix}country`, 'Country, two letters', group, ['company country', 'country', 'land']),
];

export function importTargets(objectType: ImportObject, customDefs: CustomTargetDef[] = []): ImportTarget[] {
  const customs = customDefs
    .filter((d) => d.field_type !== 'calculation' && d.field_type !== 'rollup' && d.field_type !== 'file')
    .map((d) => T(`custom.${d.internal_name}`, d.label, 'Custom fields', [d.label.toLowerCase(), d.internal_name]));
  if (objectType === 'contacts') {
    return [
      T('id', 'CRM id, match key', 'Contact', ['id', 'crm id', 'contact id'], true),
      T('contact.first_name', 'First name', 'Contact', ['first name', 'firstname', 'first', 'given name', 'voornaam']),
      T('contact.last_name', 'Last name', 'Contact', ['last name', 'lastname', 'surname', 'family name', 'achternaam']),
      T('contact.full_name', 'First and last name', 'Contact', ['full name', 'name', 'fullname', 'contact', 'contact name', 'naam']),
      T('contact.email', 'Email, match key', 'Contact', ['email', 'e-mail', 'email address', 'work email', 'mail'], true),
      T('contact.linkedin_url', 'LinkedIn URL, match key', 'Contact', ['linkedin', 'linkedin url', 'linkedinurl', 'linkedin profile'], true),
      T('contact.phone', 'Phone', 'Contact', ['phone', 'telephone', 'mobile', 'phone number', 'telefoon']),
      T('contact.job_title', 'Job title', 'Contact', ['job title', 'title', 'jobtitle', 'position', 'role', 'functie']),
      T('contact.tagline', 'LinkedIn headline', 'Contact', ['headline', 'tagline']),
      T('contact.city', 'City', 'Contact', ['contact city']),
      T('contact.country', 'Country, two letters', 'Contact', ['contact country']),
      T('contact.language', 'Language', 'Contact', ['language', 'taal']),
      ...ORG_TARGETS('Organization', 'org.'),
      ...customs,
    ];
  }
  if (objectType === 'organizations') {
    return [
      T('id', 'CRM id, match key', 'Organization', ['id', 'crm id', 'organization id'], true),
      ...ORG_TARGETS('Organization', 'org.'),
      T('org.employee_band', 'Employees', 'Organization', ['employees', 'employee band', 'size', 'company size']),
      T('org.address', 'Address', 'Organization', ['address', 'adres', 'street']),
      T('org.linkedin_url', 'LinkedIn page', 'Organization', ['linkedin', 'linkedin url', 'company linkedin']),
      T('org.kvk_number', 'KvK number', 'Organization', ['kvk', 'kvk number', 'kvk nummer', 'coc', 'chamber of commerce']),
      T('org.vat_number', 'VAT number', 'Organization', ['vat', 'vat number', 'btw', 'btw nummer']),
      T('org.description', 'Description', 'Organization', ['description', 'about', 'omschrijving']),
      ...customs,
    ];
  }
  return [
    T('id', 'CRM id, match key', 'Deal', ['id', 'crm id', 'deal id'], true),
    T('deal.name', 'Deal name', 'Deal', ['deal', 'deal name', 'name', 'opportunity', 'title']),
    T('deal.amount', 'Amount', 'Deal', ['amount', 'value', 'deal value', 'bedrag']),
    T('deal.currency', 'Currency', 'Deal', ['currency', 'valuta']),
    T('deal.close_date', 'Close date', 'Deal', ['close date', 'expected close', 'closedate']),
    T('deal.pipeline', 'Pipeline', 'Deal', ['pipeline']),
    T('deal.stage', 'Stage', 'Deal', ['stage', 'deal stage', 'status']),
    T('deal.owner_email', 'Owner email', 'Deal', ['owner', 'owner email', 'deal owner']),
    T('deal.next_step', 'Next step', 'Deal', ['next step', 'nextstep']),
    T('deal.deal_type', 'Deal type', 'Deal', ['deal type', 'type']),
    ...ORG_TARGETS('Organization', 'org.'),
    ...customs,
  ];
}

function norm(h: string): string {
  return h.trim().toLowerCase().replace(/[_\s]+/g, ' ');
}

/** First guess of the mapping. Each target is used once, the first matching column wins. */
export function guessMapping(headers: string[], targets: ImportTarget[]): Record<string, string> {
  const out: Record<string, string> = {};
  const used = new Set<string>();
  for (const h of headers) {
    const n = norm(h);
    const hit = targets.find((t) => !used.has(t.key) && (t.aliases?.includes(n) || norm(t.label) === n));
    out[h] = hit ? hit.key : '';
    if (hit) used.add(hit.key);
  }
  return out;
}

/** The match keys of an object, for the preview wording. */
export const MATCH_WORDING: Record<ImportObject, string> = {
  contacts: 'by email',
  organizations: 'by domain',
  deals: 'by id',
};
