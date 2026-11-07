'use client';
/**
 * The header "New" menu. Organization and contact open CreateDialog with the
 * live dedup check. The others go to their area with ?new=1, which the owning
 * agent's page reads to open its own create form.
 */
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CreateDialog, type CreateField } from '../records/CreateDialog';
import { Icon } from '../ui/Icon';
import { INDUSTRIES } from '@/lib/options';
import { createContact, createOrganization } from '@/app/(app)/_actions/records';

const ORG_FIELDS: CreateField[] = [
  { name: 'name', label: 'Name', required: true, placeholder: 'Brouwerij De Kade' },
  { name: 'website', label: 'Website or domain', dupeCheck: 'org-domain', placeholder: 'dekade.nl' },
  { name: 'industry', label: 'Industry', type: 'select', options: INDUSTRIES, width: 'half' },
  { name: 'city', label: 'City', width: 'half' },
];

const CONTACT_FIELDS: CreateField[] = [
  { name: 'first_name', label: 'First name', required: true, width: 'half', dupeCheck: 'contact-name' },
  { name: 'last_name', label: 'Last name', width: 'half', dupeCheck: 'contact-name' },
  { name: 'email', label: 'Email', type: 'email', dupeCheck: 'contact-email', hint: 'Links them to the organization that owns the email domain' },
  { name: 'linkedin', label: 'LinkedIn URL', type: 'url', dupeCheck: 'contact-linkedin', placeholder: 'linkedin.com/in/name' },
  { name: 'job_title', label: 'Job title' },
];

const KINDS = [
  { id: 'organization', label: 'Organization', hint: 'checks domain' },
  { id: 'contact', label: 'Contact', hint: 'checks name, LinkedIn, email' },
  { id: 'lead', label: 'Lead', hint: '', href: '/leads?new=1' },
  { id: 'deal', label: 'Deal', hint: '', href: '/deals?new=1' },
  { id: 'task', label: 'Task', hint: '', href: '/tasks?new=1' },
  { id: 'ticket', label: 'Ticket', hint: '', href: '/tickets?new=1' },
] as const;

export function NewMenu() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [dialog, setDialog] = useState<'organization' | 'contact' | null>(null);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (wrap.current && !wrap.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  return (
    <div className="menu-wrap" ref={wrap}>
      <button type="button" className="btn btn-primary" aria-expanded={open} aria-haspopup="menu" onClick={() => setOpen((o) => !o)}>
        <Icon name="plus" size={16} strokeWidth={2} />
        New
      </button>
      {open ? (
        <div className="menu" role="menu">
          {KINDS.map((k) => (
            <button
              key={k.id}
              type="button"
              role="menuitem"
              className="menu-item"
              onClick={() => {
                setOpen(false);
                if ('href' in k) router.push(k.href);
                else setDialog(k.id);
              }}
            >
              {k.label}
              {k.hint ? <span className="menu-hint">{k.hint}</span> : null}
            </button>
          ))}
        </div>
      ) : null}
      {dialog === 'organization' ? (
        <CreateDialog open title="New organization" fields={ORG_FIELDS} action={createOrganization} submitLabel="Create organization" onClose={() => setDialog(null)} />
      ) : null}
      {dialog === 'contact' ? (
        <CreateDialog open title="New contact" fields={CONTACT_FIELDS} action={createContact} submitLabel="Create contact" onClose={() => setDialog(null)} />
      ) : null}
    </div>
  );
}
