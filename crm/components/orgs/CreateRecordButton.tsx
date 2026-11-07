'use client';
/**
 * Agent A. "New organization" and "New contact" buttons on the list pages.
 * Same CreateDialog, fields and actions as the header New menu, with the live
 * duplicate check. Opens on load when the page has ?new=1.
 */
import { useCallback, useState } from 'react';
import { CreateDialog, type CreateField } from '@/components/records/CreateDialog';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { INDUSTRIES } from '@/lib/options';
import { createContact, createOrganization } from '@/app/(app)/_actions/records';

export const ORG_CREATE_FIELDS: CreateField[] = [
  { name: 'name', label: 'Name', required: true, placeholder: 'Brouwerij De Kade' },
  {
    name: 'website',
    label: 'Website or domain',
    dupeCheck: 'org-domain',
    placeholder: 'dekade.nl',
    hint: 'Free mail domains like gmail.com are never used for an organization',
  },
  { name: 'industry', label: 'Industry', type: 'select', options: INDUSTRIES, width: 'half' },
  { name: 'city', label: 'City', width: 'half' },
  { name: 'country', label: 'Country', placeholder: 'NL', width: 'half', hint: 'Two letter code' },
];

export const CONTACT_CREATE_FIELDS: CreateField[] = [
  { name: 'first_name', label: 'First name', required: true, width: 'half', dupeCheck: 'contact-name' },
  { name: 'last_name', label: 'Last name', width: 'half', dupeCheck: 'contact-name' },
  { name: 'email', label: 'Email', type: 'email', dupeCheck: 'contact-email', hint: 'Links them to the organization that owns the email domain' },
  { name: 'linkedin', label: 'LinkedIn URL', type: 'url', dupeCheck: 'contact-linkedin', placeholder: 'linkedin.com/in/name' },
  { name: 'job_title', label: 'Job title' },
];

export function CreateRecordButton({ kind, autoOpen = false }: { kind: 'organization' | 'contact'; autoOpen?: boolean }) {
  const [open, setOpen] = useState(autoOpen);
  const close = useCallback(() => setOpen(false), []);
  return (
    <>
      <Button variant="primary" onClick={() => setOpen(true)}>
        <Icon name="plus" size={16} strokeWidth={2} />
        {kind === 'organization' ? 'New organization' : 'New contact'}
      </Button>
      {open ? (
        kind === 'organization' ? (
          <CreateDialog open title="New organization" fields={ORG_CREATE_FIELDS} action={createOrganization} submitLabel="Create organization" onClose={close} />
        ) : (
          <CreateDialog open title="New contact" fields={CONTACT_CREATE_FIELDS} action={createContact} submitLabel="Create contact" onClose={close} />
        )
      ) : null}
    </>
  );
}
