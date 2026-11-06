'use client';
/** /settings/users controls: invite with a temporary password shown once, role and team, reset password. */
import { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Field, Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { inviteUserAction, resetPasswordAction, updateUserAction } from '@/app/(app)/settings/users/actions';
import { useSettingsForm } from './useSettingsForm';
import s from './settings.module.css';

const ROLE_OPTIONS = [
  { value: 'admin', label: 'Admin' },
  { value: 'sales', label: 'Sales' },
  { value: 'account_manager', label: 'Account manager' },
];

function PasswordOnce({ email, password }: { email: string; password: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="stack-sm">
      <p style={{ margin: 0 }}>
        Give this temporary password to {email} in person or over a private channel. It is shown once and cannot be looked up later.
      </p>
      <div className={s.secret} aria-label="Temporary password">
        {password}
      </div>
      <div>
        <Button
          size="sm"
          onClick={() => {
            navigator.clipboard?.writeText(password).then(() => setCopied(true), () => setCopied(false));
          }}
        >
          {copied ? 'Copied' : 'Copy password'}
        </Button>
      </div>
    </div>
  );
}

export function InviteUserButton({ teams }: { teams: { id: string; name: string }[] }) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const { state, onSubmit, pending, setState } = useSettingsForm(inviteUserAction);
  const created = state.ok ? (state.data as { password: string }) : null;
  const close = () => {
    setOpen(false);
    setState({ ok: false });
  };
  const fe = state.fieldErrors ?? {};
  return (
    <>
      <Button variant="primary" onClick={() => setOpen(true)}>
        Invite user
      </Button>
      <Modal
        open={open}
        onClose={close}
        title={created ? 'User added' : 'Invite user'}
        footer={
          created ? (
            <Button variant="primary" onClick={close}>
              Done
            </Button>
          ) : (
            <>
              <Button onClick={close}>Cancel</Button>
              <Button type="submit" form="invite-user" variant="primary" pending={pending} pendingText="Adding">
                Add user
              </Button>
            </>
          )
        }
      >
        {created ? (
          <PasswordOnce email={email} password={created.password} />
        ) : (
          <form id="invite-user" onSubmit={onSubmit} className="stack">
            {state.error ? <div className="form-error" role="alert">{state.error}</div> : null}
            <div className="form-grid">
              <Field label="Name" htmlFor="inv-name" required error={fe.name}>
                <Input id="inv-name" name="name" autoComplete="off" maxLength={100} invalid={!!fe.name} />
              </Field>
              <Field label="Email" htmlFor="inv-email" required error={fe.email}>
                <Input id="inv-email" name="email" type="email" autoComplete="off" invalid={!!fe.email} value={email} onChange={(e) => setEmail(e.target.value)} />
              </Field>
              <Field label="Role" htmlFor="inv-role" error={fe.role}>
                <Select id="inv-role" name="role" defaultValue="sales" options={ROLE_OPTIONS} />
              </Field>
              <Field label="Team" htmlFor="inv-team">
                <Select id="inv-team" name="team_id" placeholder="No team" options={teams.map((t) => ({ value: t.id, label: t.name }))} />
              </Field>
            </div>
            <p className="form-note">They sign in with a temporary password you hand over. Nothing is emailed from the CRM.</p>
          </form>
        )}
      </Modal>
    </>
  );
}

export function UserRowForm({
  user,
  teams,
  isSelf,
}: {
  user: { id: string; name: string; role: string; team_id: string | null };
  teams: { id: string; name: string }[];
  isSelf: boolean;
}) {
  const { state, onSubmit, pending } = useSettingsForm(updateUserAction);
  return (
    <form onSubmit={onSubmit} className="row" style={{ gap: 6 }}>
      <input type="hidden" name="id" value={user.id} />
      <label className="sr-only" htmlFor={`role-${user.id}`}>
        Role of {user.name}
      </label>
      <Select id={`role-${user.id}`} name="role" defaultValue={user.role} options={ROLE_OPTIONS} disabled={isSelf} style={{ minHeight: 36, fontSize: 13, maxWidth: 170 }} />
      {isSelf ? <input type="hidden" name="role" value={user.role} /> : null}
      <label className="sr-only" htmlFor={`team-${user.id}`}>
        Team of {user.name}
      </label>
      <Select id={`team-${user.id}`} name="team_id" defaultValue={user.team_id ?? ''} placeholder="No team" options={teams.map((t) => ({ value: t.id, label: t.name }))} style={{ minHeight: 36, fontSize: 13, maxWidth: 150 }} />
      <Button type="submit" size="xs" pending={pending} pendingText="Saving">
        Save
      </Button>
      {state.error ? (
        <span role="alert" className="small danger">
          {state.error}
        </span>
      ) : state.ok ? (
        <span role="status" className="small success">
          Saved
        </span>
      ) : null}
    </form>
  );
}

export function ResetPasswordButton({ user }: { user: { id: string; name: string; email: string } }) {
  const [open, setOpen] = useState(false);
  const { state, onSubmit, pending, setState } = useSettingsForm(resetPasswordAction);
  const created = state.ok ? (state.data as { password: string }) : null;
  const close = () => {
    setOpen(false);
    setState({ ok: false });
  };
  return (
    <>
      <Button size="xs" onClick={() => setOpen(true)}>
        New password
      </Button>
      <Modal
        open={open}
        onClose={close}
        title={`New password for ${user.name}`}
        footer={
          created ? (
            <Button variant="primary" onClick={close}>
              Done
            </Button>
          ) : (
            <>
              <Button onClick={close}>Cancel</Button>
              <Button type="submit" form={`reset-${user.id}`} variant="primary" pending={pending} pendingText="Making">
                Make a new password
              </Button>
            </>
          )
        }
      >
        {created ? (
          <PasswordOnce email={user.email} password={created.password} />
        ) : (
          <form id={`reset-${user.id}`} onSubmit={onSubmit} className="stack">
            {state.error ? <div className="form-error" role="alert">{state.error}</div> : null}
            <input type="hidden" name="id" value={user.id} />
            <p style={{ margin: 0 }}>Their current password stops working right away. You get a temporary one to hand over.</p>
          </form>
        )}
      </Modal>
    </>
  );
}
