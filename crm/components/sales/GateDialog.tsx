'use client';
/**
 * The stage gate as a form: required fields, a reason when moving back, and
 * what automation will do on save. Rendered inline under the stage path on
 * record pages (as the Deal design shows) and inside a Modal on the board.
 *
 *   <GateForm
 *     title="To enter Negotiation, fill these in" hint="Required fields are set per stage in Settings"
 *     fields={fields} missing={missing} needsReason={false} effects={[]}
 *     cta="Move to Negotiation" users={users}
 *     note={{ name: 'lost_note', label: 'Note' }}   // optional free text sent with the values (lost deals)
 *     onSubmit={async (values, reason) => moveStageAction({ ... })}   // returns SalesResult
 *     onCancel={close} onDone={afterSave}
 *   />
 */
import { useId, useState, useTransition } from 'react';
import type { RequiredField } from '@/lib/stages';
import type { SalesResult } from '@/lib/sales/fields';
import { Button, Field, Modal, Textarea } from '@/components/ui';
import { GateFields, readGateValues, type GateUser } from './GateFields';
import styles from './sales.module.css';

export type GateFormProps = {
  title: string;
  hint?: string;
  fields: RequiredField[];
  missing?: string[];
  needsReason?: boolean;
  reasonLabel?: string;
  effects?: string[];
  effectsLead?: string;
  cta: string;
  ctaVariant?: 'accent' | 'primary' | 'danger';
  /** An optional note field, posted in values under its name (for example lost_note). */
  note?: { name: string; label: string; hint?: string; defaultValue?: string | null };
  users?: GateUser[];
  onSubmit: (values: Record<string, string>, reason: string | null) => Promise<SalesResult>;
  onCancel: () => void;
  onDone?: (res: SalesResult) => void;
};

export function GateForm(props: GateFormProps) {
  const uid = useId();
  const [fields, setFields] = useState(props.fields);
  const [missing, setMissing] = useState<string[]>(props.missing ?? []);
  const [needsReason, setNeedsReason] = useState(Boolean(props.needsReason));
  const [error, setError] = useState<string | null>(null);
  const [reasonError, setReasonError] = useState<string | null>(null);
  const [pending, start] = useTransition();

  return (
    <form
      className={styles.gate}
      aria-labelledby={`${uid}-title`}
      onSubmit={(e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const values = readGateValues(form, fields, 'gate.');
        if (props.note) {
          const n = new FormData(form).get(`note.${props.note.name}`);
          values[props.note.name] = typeof n === 'string' ? n : '';
        }
        const reasonRaw = new FormData(form).get('reason');
        const reason = typeof reasonRaw === 'string' && reasonRaw.trim() ? reasonRaw.trim() : null;
        if (needsReason && !reason) {
          setReasonError('Give a reason for moving back');
          return;
        }
        const empty = fields.filter((f) => !values[f.field_key]?.trim()).map((f) => f.field_key);
        if (empty.length) {
          setMissing(empty);
          setError('Fill in every required field');
          return;
        }
        setError(null);
        setReasonError(null);
        start(async () => {
          const res = await props.onSubmit(values, reason);
          if (res.ok) {
            props.onDone?.(res);
            return;
          }
          if (res.code === 'required_fields') {
            if (res.fields?.length) setFields(res.fields);
            setMissing(res.missing ?? []);
          }
          if (res.code === 'reason_required') {
            setNeedsReason(true);
            setReasonError('Give a reason for moving back');
          }
          setError(res.error);
        });
      }}
    >
      <div className={styles.gateHead}>
        <h2 id={`${uid}-title`} className={styles.gateTitle}>
          {props.title}
        </h2>
        {props.hint ? <span className={styles.gateHint}>{props.hint}</span> : null}
      </div>
      {fields.length ? (
        <div className={styles.gateFields}>
          <GateFields fields={fields} missing={missing} users={props.users} prefix="gate." idPrefix={`${uid}-gate`} />
        </div>
      ) : null}
      {props.note ? (
        <Field label={props.note.label} htmlFor={`${uid}-note`} hint={props.note.hint ?? 'Optional, stored with the reason'}>
          <Textarea id={`${uid}-note`} name={`note.${props.note.name}`} rows={2} maxLength={2000} defaultValue={props.note.defaultValue ?? ''} />
        </Field>
      ) : null}
      {needsReason ? (
        <Field label={props.reasonLabel ?? 'Reason for moving back'} htmlFor={`${uid}-reason`} required error={reasonError ?? undefined}>
          <Textarea id={`${uid}-reason`} name="reason" rows={2} required invalid={Boolean(reasonError)} placeholder="Logged on the timeline" />
        </Field>
      ) : null}
      {props.effects?.length ? (
        <div className={styles.effects}>
          {props.effectsLead ?? 'On save, the automations do this'}
          <ul>
            {props.effects.map((e, i) => (
              <li key={i}>{e}</li>
            ))}
          </ul>
        </div>
      ) : null}
      {error ? (
        <div className="form-error" role="alert">
          {error}
        </div>
      ) : null}
      <div className="row" style={{ gap: 8 }}>
        <Button type="submit" variant={props.ctaVariant ?? 'accent'} pending={pending} pendingText="Saving">
          {props.cta}
        </Button>
        <Button onClick={props.onCancel} disabled={pending}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

/** The same form in a modal, for the board. */
export function GateDialog({ open, ...props }: GateFormProps & { open: boolean }) {
  return (
    <Modal open={open} onClose={props.onCancel} title={props.cta} wide>
      {open ? <GateForm {...props} /> : null}
    </Modal>
  );
}
