'use client';
/**
 * "Contacts on this deal" from the Deal design: contacts with their buying
 * role, add one with a role (search picker) and remove one.
 */
import { useState, useTransition } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BUYING_ROLES, labelOf } from '@/lib/options';
import { Button, Checkbox, Field, Input, Select } from '@/components/ui';
import { addDealContactAction, removeDealContactAction } from '@/app/(app)/deals/actions';
import { RecordPicker, type Picked } from './RecordPicker';
import styles from './sales.module.css';

export type DealContact = {
  id: string;
  contact_id: string;
  full_name: string;
  role: string;
  role_note: string | null;
  is_primary: boolean;
  email: string | null;
};

export function DealContacts({ dealId, contacts, canEdit }: { dealId: string; contacts: DealContact[]; canEdit: boolean }) {
  const router = useRouter();
  const [adding, setAdding] = useState(false);
  const [picked, setPicked] = useState<Picked | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();

  return (
    <section aria-labelledby="dc-h" className={styles.railCard}>
      <h2 id="dc-h" className="section-label">
        Contacts on this deal
      </h2>
      {contacts.length === 0 ? <span className="small muted">Nobody linked yet</span> : null}
      {contacts.map((c) => (
        <div key={c.id} className={styles.railEntry}>
          <div className="stack-sm" style={{ gap: 2, minWidth: 0 }}>
            <Link href={`/contacts/${c.contact_id}`} className={styles.railName} style={{ color: 'var(--ink)', textDecoration: 'none' }}>
              {c.full_name}
            </Link>
            <span className={styles.railSub}>
              {[labelOf(BUYING_ROLES, c.role), c.role_note, c.email, c.is_primary ? 'primary' : null].filter(Boolean).join(' · ')}
            </span>
          </div>
          {canEdit ? (
            <button
              type="button"
              className={styles.iconBtn}
              aria-label={`Remove ${c.full_name} from this deal`}
              disabled={pending}
              onClick={() =>
                start(async () => {
                  const res = await removeDealContactAction(c.id);
                  if (!res.ok) setError(res.error);
                  else router.refresh();
                })
              }
            >
              Remove
            </button>
          ) : null}
        </div>
      ))}
      {canEdit && adding ? (
        <form
          className="stack-sm"
          onSubmit={(e) => {
            e.preventDefault();
            const fd = new FormData(e.currentTarget);
            if (!picked?.id) {
              setError('Pick a contact from the list');
              return;
            }
            start(async () => {
              const res = await addDealContactAction({
                dealId,
                contactId: picked.id!,
                role: String(fd.get('role') ?? 'influencer') as never,
                roleNote: String(fd.get('role_note') ?? ''),
                isPrimary: fd.get('is_primary') === 'on',
              });
              if (!res.ok) {
                setError(res.error);
                return;
              }
              setError(null);
              setPicked(null);
              setAdding(false);
              router.refresh();
            });
          }}
        >
          <RecordPicker type="contact" label="Contact" allowCreate={false} onPick={setPicked} inputName="pick_contact_id" />
          <Field label="Role" htmlFor="dc-role">
            <Select id="dc-role" name="role" options={BUYING_ROLES} defaultValue="influencer" />
          </Field>
          <Field label="Note" htmlFor="dc-note" hint="Optional, for example day to day user">
            <Input id="dc-note" name="role_note" maxLength={200} />
          </Field>
          <Checkbox name="is_primary" label="Primary contact" />
          {error ? (
            <div className="form-error" role="alert">
              {error}
            </div>
          ) : null}
          <div className="row" style={{ gap: 8 }}>
            <Button type="submit" size="sm" variant="primary" pending={pending} pendingText="Saving">
              Link contact
            </Button>
            <Button size="sm" onClick={() => setAdding(false)} disabled={pending}>
              Cancel
            </Button>
          </div>
        </form>
      ) : canEdit ? (
        <button type="button" className={styles.dashedBtn} onClick={() => setAdding(true)}>
          Link a contact with a role
        </button>
      ) : null}
      {error && !adding ? (
        <div className="form-error" role="alert">
          {error}
        </div>
      ) : null}
    </section>
  );
}
