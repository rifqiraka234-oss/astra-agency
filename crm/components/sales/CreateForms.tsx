'use client';
/**
 * The create forms behind the header New menu: /leads?new=1 and /deals?new=1.
 * Organization and contact pickers search existing records, or create one by
 * name. A deal's chosen stage shows its required fields, the server checks them.
 *
 *   <CreateLeadDialog open={sp.new === '1'} closeHref="/leads" stages={...} users={...} currentUserId={user.id} />
 *   <CreateDealDialog open closeHref="/deals" stages={...} users={...} currentUserId={user.id} />
 */
import { startTransition, useActionState, useEffect, useId, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { initialActionState } from '@/lib/forms';
import type { RequiredField } from '@/lib/stages';
import { BUYING_ROLES, RESEARCH_STATUSES } from '@/lib/options';
import { Button, Field, Input, Modal, Select, Textarea } from '@/components/ui';
import { createLeadAction } from '@/app/(app)/leads/actions';
import { createDealAction } from '@/app/(app)/deals/actions';
import { RecordPicker, type Picked } from './RecordPicker';
import { GateFields } from './GateFields';

type UserOpt = { id: string; name: string };

function useCloser(closeHref: string) {
  const router = useRouter();
  return () => router.replace(closeHref, { scroll: false });
}

function useNavigateOnSuccess(state: { ok: boolean; href?: string }) {
  const router = useRouter();
  useEffect(() => {
    if (state.ok && state.href) router.push(state.href);
  }, [state, router]);
}

export function CreateLeadDialog({
  open,
  closeHref,
  stages,
  users,
  currentUserId,
}: {
  open: boolean;
  closeHref: string;
  stages: { id: string; name: string }[];
  users: UserOpt[];
  currentUserId: string;
}) {
  const uid = useId();
  const close = useCloser(closeHref);
  const [state, action, pending] = useActionState(createLeadAction, initialActionState);
  const [, setOrg] = useState<Picked | null>(null);
  useNavigateOnSuccess(state);
  const err = state.fieldErrors ?? {};
  return (
    <Modal open={open} onClose={close} title="New lead" wide>
      <form
        className="stack"
        onSubmit={(e) => {
          e.preventDefault();
          const fd = new FormData(e.currentTarget);
          startTransition(() => action(fd));
        }}
      >
        <div className="form-grid">
          <RecordPicker type="contact" label="Contact" error={err.contact_id} hint="The person you reached on LinkedIn" />
          <RecordPicker type="organization" label="Organization" error={err.organization_id} hint="Left empty, the contact's organization is used" onPick={setOrg} />
          <Field label="Owner" htmlFor={`${uid}-owner`} error={err.owner_user_id}>
            <Select id={`${uid}-owner`} name="owner_user_id" options={users.map((u) => ({ value: u.id, label: u.name }))} defaultValue={currentUserId} />
          </Field>
          <Field label="Stage" htmlFor={`${uid}-stage`} error={err.stage_id}>
            <Select id={`${uid}-stage`} name="stage_id" options={stages.map((s) => ({ value: s.id, label: s.name }))} defaultValue={stages[0]?.id} />
          </Field>
          <Field label="Research status" htmlFor={`${uid}-research`}>
            <Select id={`${uid}-research`} name="research_status" options={RESEARCH_STATUSES} defaultValue="unresearched" />
          </Field>
          <Field label="Source" htmlFor={`${uid}-source`}>
            <Select
              id={`${uid}-source`}
              name="source"
              defaultValue="manual"
              options={[
                { value: 'manual', label: 'Added by hand' },
                { value: 'referral', label: 'Referral' },
                { value: 'inbound', label: 'Inbound' },
                { value: 'event', label: 'Event' },
              ]}
            />
          </Field>
          <Field label="Campaign" htmlFor={`${uid}-campaign`}>
            <Input id={`${uid}-campaign`} name="campaign" maxLength={200} />
          </Field>
          <Field label="LinkedIn accepted" htmlFor={`${uid}-accepted`}>
            <Input id={`${uid}-accepted`} name="linkedin_accepted_at" type="datetime-local" />
          </Field>
          <Field label="Worth, EUR" htmlFor={`${uid}-worth`} error={err.angle_worth_eur} hint="The project the angle points at">
            <Input id={`${uid}-worth`} name="angle_worth_eur" inputMode="decimal" className="mono" placeholder="2500" invalid={Boolean(err.angle_worth_eur)} />
          </Field>
          <Field label="Angle" htmlFor={`${uid}-angle`} className="field-full">
            <Textarea id={`${uid}-angle`} name="angle" rows={3} maxLength={1000} placeholder="Their costliest proven pain, once researched" />
          </Field>
        </div>
        {state.error && !state.ok ? (
          <div className="form-error" role="alert">
            {state.error}
            {state.href ? (
              <>
                {' '}
                <Link href={state.href}>Open it</Link>
              </>
            ) : null}
          </div>
        ) : null}
        <div className="form-actions">
          <Button onClick={close} disabled={pending}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" pending={pending} pendingText="Creating">
            Create lead
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export type DealStageOption = {
  id: string;
  name: string;
  pipeline_key: string;
  pipeline_name: string;
  required: { field_key: string; label: string; input_type: string; options: { value: string; label: string }[] | null }[];
};

export function CreateDealDialog({
  open,
  closeHref,
  stages,
  users,
  currentUserId,
  defaultPipeline,
  initialOrganization = null,
  initialContact = null,
}: {
  open: boolean;
  closeHref: string;
  stages: DealStageOption[];
  users: UserOpt[];
  currentUserId: string;
  defaultPipeline?: string;
  /** Prefill from /deals?new=1&organization=<id>&contact=<id> (record pages). */
  initialOrganization?: Picked | null;
  initialContact?: Picked | null;
}) {
  const uid = useId();
  const close = useCloser(closeHref);
  const [state, action, pending] = useActionState(createDealAction, initialActionState);
  const initialStage = stages.find((s) => s.pipeline_key === (defaultPipeline ?? 'sales')) ?? stages[0];
  const [stageId, setStageId] = useState(initialStage?.id ?? '');
  const [contact, setContact] = useState<Picked | null>(initialContact);
  useNavigateOnSuccess(state);
  const err = state.fieldErrors ?? {};
  const stage = stages.find((s) => s.id === stageId);
  const gate: RequiredField[] = (stage?.required ?? [])
    .filter((r) => r.field_key !== 'amount')
    .map((r) => ({ ...r, input_type: r.input_type as RequiredField['input_type'], value: null }));
  const amountRequired = Boolean(stage?.required.some((r) => r.field_key === 'amount'));
  const missing = Object.keys(err).filter((k) => k.startsWith('gate.')).map((k) => k.slice(5));

  return (
    <Modal open={open} onClose={close} title="New deal" wide>
      <form
        className="stack"
        onSubmit={(e) => {
          e.preventDefault();
          const fd = new FormData(e.currentTarget);
          startTransition(() => action(fd));
        }}
      >
        <div className="form-grid">
          <Field label="Deal name" htmlFor={`${uid}-name`} required error={err.name} className="field-full" hint="What they would buy, for example Taproom booking app">
            <Input id={`${uid}-name`} name="name" required maxLength={200} invalid={Boolean(err.name)} />
          </Field>
          <RecordPicker type="organization" label="Organization" error={err.organization_id} initial={initialOrganization} />
          <RecordPicker type="contact" label="Contact" error={err.contact_id} onPick={setContact} initial={initialContact} />
          {contact ? (
            <Field label="Their role" htmlFor={`${uid}-role`}>
              <Select id={`${uid}-role`} name="contact_role" options={BUYING_ROLES} defaultValue="decision_maker" />
            </Field>
          ) : null}
          <Field label="Stage" htmlFor={`${uid}-stage`} error={err.stage_id}>
            <Select
              id={`${uid}-stage`}
              name="stage_id"
              value={stageId}
              onChange={(e) => setStageId(e.target.value)}
              options={stages.map((s) => ({ value: s.id, label: `${s.pipeline_name}, ${s.name}` }))}
            />
          </Field>
          <Field label="Amount, EUR excl. VAT" htmlFor={`${uid}-amount`} required={amountRequired} error={err.amount ?? err['gate.amount']}>
            <Input id={`${uid}-amount`} name="amount" inputMode="decimal" className="mono" placeholder="8000" invalid={Boolean(err.amount ?? err['gate.amount'])} />
          </Field>
          <Field label="Expected close" htmlFor={`${uid}-close`} error={err.close_date}>
            <Input id={`${uid}-close`} name="close_date" type="date" />
          </Field>
          <Field label="Owner" htmlFor={`${uid}-owner`} error={err.owner_user_id}>
            <Select id={`${uid}-owner`} name="owner_user_id" options={users.map((u) => ({ value: u.id, label: u.name }))} defaultValue={currentUserId} />
          </Field>
          {gate.length ? <GateFields key={stageId} fields={gate} missing={missing} users={users} prefix="gate." idPrefix={`${uid}-gate`} /> : null}
        </div>
        {gate.length ? <div className="form-note">{stage?.name} needs these before a deal can enter it.</div> : null}
        {state.error && !state.ok ? (
          <div className="form-error" role="alert">
            {state.error}
          </div>
        ) : null}
        <div className="form-actions">
          <Button onClick={close} disabled={pending}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" pending={pending} pendingText="Creating">
            Create deal
          </Button>
        </div>
      </form>
    </Modal>
  );
}
