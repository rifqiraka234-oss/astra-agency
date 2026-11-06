-- 100 (agent A) Privacy on organizations, as the Organization design shows it
-- (Lawful basis, Do not contact). Do not contact on an organization also writes
-- its domains to suppression_list, see lib/orgs/mutations.ts.
alter table organizations add column if not exists lawful_basis text not null default 'legitimate_interest'
  check (lawful_basis in ('legitimate_interest', 'consent', 'contract', 'none'));
alter table organizations add column if not exists do_not_contact boolean not null default false;

-- Contact list search by email (ilike on the normalised address).
create index if not exists contact_emails_email_trgm on contact_emails using gin (lower(email) gin_trgm_ops);
create index if not exists organization_domains_domain_trgm on organization_domains using gin (domain_normalised gin_trgm_ops);
