'use client';
/**
 * Agent A. Dated roles: the "Add contact" dialog on an organization, the
 * "Add to organization" dialog on a contact, and the inline "End role" control.
 */
import { startTransition, useActionState, useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Field, Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { BUYING_ROLES, CONTACT_RELATIONSHIPS, type Option } from '@/lib/options';
import { initialActionState } from '@/lib/forms';
import { todayKey } from '@/lib/format';
import { addRoleAction, endRoleAction } from '@/app/(app)/organizations/_actions';
import { ModalForm } from './ModalForm';
import styles from './orgs.module.css';

const RELATIONSHIP_CHOICES = CONTACT_RELATIONSHIPS.filter((r) => r.value !== 'former_owner');

function RoleFields({ errors }: { errors?: Record<string, string> }) {
  return (
    <>
      <Field label="Relationship" htmlFor="role-rel">
        <Select id="role-rel" name="relationship" options={RELATIONSHIP_CHOICES} defaultValue="employee" />
      </Field>
      <Field label="Job title here" htmlFor="role-title" error={errors?.title}>
        <Input id="role-title" name="title" placeholder="Taproom manager" />
      </Field>
      <Field label="Started" htmlFor="role-start" error={errors?.start_date} hint="Leave empty if you don't know">
        <Input id="role-start" name="start_date" type="date" />
      </Field>
      <div className="field field-full">
        <span className="field-label">Buying roles</span>
        <div className={styles.checks} role="group" aria-label="Buying roles">
          {BUYING_ROLES.filter((b) => b.value !== 'other').map((b) => (
            <label key={b.value} className="checkbox">
              <input type="checkbox" name="buying_roles" value={b.value} />
              {b.label}
            </label>
          ))}
        </div>
      </div>
      <div className="field field-full">
        <label className="checkbox">
          <input type="checkbox" name="is_primary" />
          Make this their primary organization
        </label>
      </div>
    </>
  );
}

/** On an organization: add an existing contact or a new person with a role. */
export function AddContactToOrg({ organizationId, orgName, contacts }: { organizationId: string; orgName: string; contacts: Option[] }) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<'existing' | 'new'>(contacts.length ? 'existing' : 'new');
  const close = useCallback(() => setOpen(false), []);
  return (
    <>
      <Button size="sm" onClick={() => setOpen(true)}>
        Add contact
      </Button>
      {open ? (
        <ModalForm open onClose={close} title={`Add a contact to ${orgName}`} action={addRoleAction} hidden={{ organizationId, mode }} submitLabel="Add contact" wide>
          {(s) => (
            <>
              <div className="seg" role="group" aria-label="Who">
                <button type="button" className="seg-item" aria-pressed={mode === 'existing'} onClick={() => setMode('existing')}>
                  Someone already in the CRM
                </button>
                <button type="button" className="seg-item" aria-pressed={mode === 'new'} onClick={() => setMode('new')}>
                  A new person
                </button>
              </div>
              <div className="form-grid">
                {mode === 'existing' ? (
                  <Field label="Contact" htmlFor="role-contact" required className="field-full" error={s.fieldErrors?.contactId}>
                    <Select id="role-contact" name="contactId" options={contacts} placeholder="Pick a contact" defaultValue="" invalid={Boolean(s.fieldErrors?.contactId)} />
                  </Field>
                ) : (
                  <>
                    <Field label="First name" htmlFor="role-first" required error={s.fieldErrors?.first_name}>
                      <Input id="role-first" name="first_name" invalid={Boolean(s.fieldErrors?.first_name)} />
                    </Field>
                    <Field label="Last name" htmlFor="role-last">
                      <Input id="role-last" name="last_name" />
                    </Field>
                    <Field label="Email" htmlFor="role-email" className="field-full" error={s.fieldErrors?.email} hint="Checked against every contact">
                      <Input id="role-email" name="email" type="email" invalid={Boolean(s.fieldErrors?.email)} />
                    </Field>
                  </>
                )}
                <RoleFields errors={s.fieldErrors} />
              </div>
            </>
          )}
        </ModalForm>
      ) : null}
    </>
  );
}

/** On a contact: link them to an organization with a role. */
export function AddOrgToContact({ contactId, organizations }: { contactId: string; organizations: Option[] }) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  return (
    <>
      <Button size="sm" onClick={() => setOpen(true)}>
        Add organization
      </Button>
      {open ? (
        <ModalForm open onClose={close} title="Link to an organization" action={addRoleAction} hidden={{ contactId, mode: 'existing' }} submitLabel="Add role" wide>
          {(s) => (
            <div className="form-grid">
              <Field label="Organization" htmlFor="role-org" required className="field-full" error={s.fieldErrors?.organizationId}>
                <Select id="role-org" name="organizationId" options={organizations} placeholder="Pick an organization" defaultValue="" invalid={Boolean(s.fieldErrors?.organizationId)} />
              </Field>
              <RoleFields errors={s.fieldErrors} />
            </div>
          )}
        </ModalForm>
      ) : null}
    </>
  );
}

/** "End role" in a roles table: asks for the end date, defaults to today. */
export function EndRoleButton({ roleId, startDate, who }: { roleId: string; startDate: string | null; who: string }) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [state, run, pending] = useActionState(async (prev: typeof initialActionState, fd: FormData) => {
    const res = await endRoleAction(prev, fd);
    if (res.ok) {
      setEditing(false);
      router.refresh();
    }
    return res;
  }, initialActionState);

  if (!editing) {
    return (
      <button type="button" className={styles.linkBtn} onClick={() => setEditing(true)} aria-label={`End the role of ${who}`}>
        End role
      </button>
    );
  }
  return (
    <form
      className={styles.endRole}
      onSubmit={(e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        startTransition(() => run(fd));
      }}
    >
      <input type="hidden" name="roleId" value={roleId} />
      <label className="sr-only" htmlFor={`end-${roleId}`}>
        End date
      </label>
      <input id={`end-${roleId}`} className="input" type="date" name="end_date" defaultValue={todayKey()} min={startDate ?? undefined} required />
      <Button size="sm" variant="primary" type="submit" pending={pending} pendingText="Saving">
        End
      </Button>
      <Button size="sm" variant="ghost" onClick={() => setEditing(false)}>
        Cancel
      </Button>
      {!state.ok && state.error ? <span className={styles.inlineError}>{state.error}</span> : null}
    </form>
  );
}
