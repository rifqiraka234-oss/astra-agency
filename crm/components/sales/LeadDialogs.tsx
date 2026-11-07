'use client';
/**
 * Qualify and disqualify for a lead, used on the board and on /leads/[id].
 *
 *   <QualifyDialog open lead={{ id, title, orgName }} firstStage={{ name, required }} users={users}
 *                  onClose={close} onDone={(res) => ...} />
 *   <DisqualifyDialog open lead={{ id, title }} reasons={reasons} onClose={close} onDone={(res) => ...} />
 *
 * reasons are the active disqualify reasons (lib/reasons.ts, reasonSelectOptions), managed in /settings/reasons.
 */
import { useId, useState, useTransition } from 'react';
import type { RequiredField } from '@/lib/stages';
import type { SalesResult } from '@/lib/sales/fields';
export type ReasonChoice = { value: string; label: string };
import { Button, Field, Input, Modal, Select, Textarea } from '@/components/ui';
import { qualifyLeadAction, disqualifyLeadAction } from '@/app/(app)/leads/actions';
import { GateFields, readGateValues, type GateUser } from './GateFields';
import styles from './sales.module.css';

export type QualifyLead = { id: string; title: string; orgName?: string | null; worth?: string | null; ownerId?: string | null };
export type FirstStage = { name: string; required: { field_key: string; label: string; input_type: string; options: { value: string; label: string }[] | null }[] };

export function QualifyDialog({
  open,
  lead,
  firstStage,
  users,
  onClose,
  onDone,
}: {
  open: boolean;
  lead: QualifyLead | null;
  firstStage: FirstStage | null;
  users: GateUser[];
  onClose: () => void;
  onDone: (res: SalesResult) => void;
}) {
  const uid = useId();
  const [error, setError] = useState<string | null>(null);
  const [missing, setMissing] = useState<string[]>([]);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [pending, start] = useTransition();
  const fields: RequiredField[] = (firstStage?.required ?? [])
    .filter((r) => r.field_key !== 'amount')
    .map((r) => ({ ...r, input_type: r.input_type as RequiredField['input_type'], value: null }));
  const amountRequired = (firstStage?.required ?? []).some((r) => r.field_key === 'amount');
  const close = () => {
    setError(null);
    setMissing([]);
    setFieldErrors({});
    onClose();
  };

  return (
    <Modal open={open && Boolean(lead)} onClose={close} title="Qualify and create deal" wide>
      {lead ? (
        <form
          className="stack"
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.currentTarget;
            const fd = new FormData(form);
            const values = readGateValues(form, fields, 'gate.');
            const empty = fields.filter((f) => !values[f.field_key]?.trim()).map((f) => f.field_key);
            const amount = String(fd.get('amount') ?? '').trim();
            if (empty.length || (amountRequired && !amount)) {
              setMissing(empty);
              setFieldErrors(amountRequired && !amount ? { amount: 'Required to enter this stage' } : {});
              setError(`To enter ${firstStage?.name ?? 'the first stage'}, fill in the required fields`);
              return;
            }
            setError(null);
            start(async () => {
              const res = await qualifyLeadAction({
                leadId: lead.id,
                dealName: String(fd.get('deal_name') ?? ''),
                amount,
                closeDate: String(fd.get('close_date') ?? ''),
                ownerUserId: String(fd.get('owner_user_id') ?? ''),
                values,
              });
              if (res.ok) {
                close();
                onDone(res);
                return;
              }
              setError(res.error);
              setMissing(res.missing ?? []);
              setFieldErrors(res.fieldErrors ?? {});
            });
          }}
        >
          <p className="secondary" style={{ margin: 0 }}>
            {lead.title}
            {lead.orgName ? ` at ${lead.orgName}` : ''} becomes a deal in {firstStage?.name ?? 'the first Sales stage'}, with the organization and the
            contact linked and the lead marked qualified.
          </p>
          <div className="form-grid">
            <Field label="Deal name" htmlFor={`${uid}-name`} hint="What they would buy, for example Taproom booking app" className="field-full">
              <Input id={`${uid}-name`} name="deal_name" defaultValue={lead.orgName ? `${lead.orgName} deal` : ''} maxLength={200} />
            </Field>
            <Field label="Amount, EUR excl. VAT" htmlFor={`${uid}-amount`} required={amountRequired} error={fieldErrors.amount}>
              <Input id={`${uid}-amount`} name="amount" inputMode="decimal" className="mono" defaultValue={lead.worth ?? ''} placeholder="8000" invalid={Boolean(fieldErrors.amount)} />
            </Field>
            <Field label="Expected close" htmlFor={`${uid}-close`}>
              <Input id={`${uid}-close`} name="close_date" type="date" />
            </Field>
            <Field label="Owner" htmlFor={`${uid}-owner`}>
              <Select id={`${uid}-owner`} name="owner_user_id" options={users.map((u) => ({ value: u.id, label: u.name }))} defaultValue={lead.ownerId ?? ''} placeholder="Same as the lead" />
            </Field>
            <GateFields fields={fields} missing={missing} users={users} prefix="gate." idPrefix={`${uid}-gate`} />
          </div>
          {error ? (
            <div className="form-error" role="alert">
              {error}
            </div>
          ) : null}
          <div className="form-actions">
            <Button onClick={close} disabled={pending}>
              Cancel
            </Button>
            <Button type="submit" variant="accent" pending={pending} pendingText="Creating deal">
              Qualify and create deal
            </Button>
          </div>
        </form>
      ) : null}
    </Modal>
  );
}

export function DisqualifyDialog({
  open,
  lead,
  reasons,
  onClose,
  onDone,
}: {
  open: boolean;
  lead: { id: string; title: string } | null;
  reasons: ReasonChoice[];
  onClose: () => void;
  onDone: (res: SalesResult) => void;
}) {
  const uid = useId();
  const [reason, setReason] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();
  const close = () => {
    setError(null);
    setReason('');
    onClose();
  };
  return (
    <Modal open={open && Boolean(lead)} onClose={close} title={lead ? `Disqualify ${lead.title}` : 'Disqualify'}>
      {lead ? (
        <form
          className="stack"
          onSubmit={(e) => {
            e.preventDefault();
            const fd = new FormData(e.currentTarget);
            if (!reason) {
              setError('Pick a reason');
              return;
            }
            start(async () => {
              const res = await disqualifyLeadAction({ leadId: lead.id, reason, note: String(fd.get('note') ?? '') });
              if (res.ok) {
                close();
                onDone(res);
                return;
              }
              setError(res.error);
            });
          }}
        >
          <Field label="Reason" htmlFor={`${uid}-reason`} required error={error && !reason ? error : undefined}>
            <Select
              id={`${uid}-reason`}
              name="reason"
              options={reasons}
              placeholder="Pick a reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
              invalid={Boolean(error && !reason)}
            />
          </Field>
          {reason === 'do_not_contact' ? (
            <div className={styles.effects} style={{ color: 'var(--tone-red-fg)', background: 'var(--tone-red-bg)' }}>
              Do not contact also adds them to the suppression list, by contact, LinkedIn URL and email. Nobody here can message them again.
            </div>
          ) : null}
          {reasons.length === 0 ? <div className="form-note">No active reasons. An admin adds them under Settings, Reasons.</div> : null}
          <Field label="Note" htmlFor={`${uid}-note`} hint="Optional, stored with the reason and on the timeline">
            <Textarea id={`${uid}-note`} name="note" rows={3} maxLength={2000} />
          </Field>
          {error && reason ? (
            <div className="form-error" role="alert">
              {error}
            </div>
          ) : null}
          <div className="form-actions">
            <Button onClick={close} disabled={pending}>
              Cancel
            </Button>
            <Button type="submit" variant="danger" pending={pending} pendingText="Saving">
              Disqualify
            </Button>
          </div>
        </form>
      ) : null}
    </Modal>
  );
}
