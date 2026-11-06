'use client';
/**
 * Agent A. The header buttons of the organization and contact records:
 * Log activity, New task, New deal and Write email. Write email only drafts
 * into the approval queue, nothing is sent from V1.
 */
import { useCallback, useState } from 'react';
import { Button, ButtonLink } from '@/components/ui/Button';
import { Field, Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { PRIORITIES, TASK_TYPES, type Option } from '@/lib/options';
import { toDatetimeLocal } from '@/lib/format';
import { createRecordTask, draftEmailAction, logActivityAction } from '@/app/(app)/organizations/_actions';
import { ModalForm } from './ModalForm';

const LOG_KINDS: Option[] = [
  { value: 'call', label: 'Call' },
  { value: 'meeting', label: 'Meeting' },
  { value: 'email', label: 'Email' },
  { value: 'linkedin_message', label: 'LinkedIn message' },
  { value: 'note', label: 'Note' },
];
const DIRECTIONS: Option[] = [
  { value: 'outbound', label: 'We reached out' },
  { value: 'inbound', label: 'They reached out' },
];
const TASK_TYPE_CHOICES = TASK_TYPES.filter((t) => ['todo', 'call', 'email', 'linkedin', 'meeting', 'meeting_prep', 'checkin', 'research', 'invoice', 'renewal'].includes(t.value));

export function RecordActions({
  organizationId,
  contactId,
  people,
  users,
  currentUserId,
  newDealHref,
  emailBlocked,
}: {
  organizationId?: string;
  contactId?: string;
  /** Contacts to pick for activity and email (organization page). */
  people: Option[];
  users: Option[];
  currentUserId: string;
  newDealHref: string;
  /** Why an email can't be drafted (do not contact), or null. */
  emailBlocked?: string | null;
}) {
  const [open, setOpen] = useState<'log' | 'task' | 'email' | null>(null);
  const close = useCallback(() => setOpen(null), []);
  const hidden: Record<string, string> = {};
  if (organizationId) hidden.organizationId = organizationId;
  if (contactId) hidden.contactId = contactId;

  return (
    <>
      <Button onClick={() => setOpen('log')}>Log activity</Button>
      <Button onClick={() => setOpen('task')}>New task</Button>
      <ButtonLink href={newDealHref}>New deal</ButtonLink>
      <Button variant="primary" onClick={() => setOpen('email')} disabled={Boolean(emailBlocked)} title={emailBlocked ?? undefined}>
        Write email
      </Button>

      {open === 'log' ? (
        <ModalForm open onClose={close} title="Log activity" action={logActivityAction} hidden={hidden} submitLabel="Log it">
          {(s) => (
            <div className="form-grid">
              <Field label="What happened" htmlFor="log-kind" className="" error={s.fieldErrors?.kind}>
                <Select id="log-kind" name="kind" options={LOG_KINDS} defaultValue="call" />
              </Field>
              <Field label="Who started it" htmlFor="log-direction">
                <Select id="log-direction" name="direction" options={DIRECTIONS} defaultValue="outbound" />
              </Field>
              <Field label="When" htmlFor="log-when" error={s.fieldErrors?.occurred_at}>
                <Input id="log-when" name="occurred_at" type="datetime-local" defaultValue={toDatetimeLocal(new Date())} />
              </Field>
              {!contactId && people.length ? (
                <Field label="With" htmlFor="log-contact" hint="Optional">
                  <Select id="log-contact" name="contactId" options={people} placeholder="Nobody in particular" defaultValue="" />
                </Field>
              ) : null}
              <Field label="Title" htmlFor="log-title" className="field-full" hint="Leave empty for a standard title" error={s.fieldErrors?.title}>
                <Input id="log-title" name="title" placeholder="Discovery call, taproom bookings" />
              </Field>
              <Field label="Notes" htmlFor="log-body" className="field-full" error={s.fieldErrors?.body}>
                <Textarea id="log-body" name="body" rows={4} placeholder="Outcome, next step, anything worth keeping" />
              </Field>
            </div>
          )}
        </ModalForm>
      ) : null}

      {open === 'task' ? (
        <ModalForm open onClose={close} title="New task" action={createRecordTask} hidden={hidden} submitLabel="Create task">
          {(s) => (
            <div className="form-grid">
              <Field label="Title" htmlFor="task-title" required className="field-full" error={s.fieldErrors?.title}>
                <Input id="task-title" name="title" placeholder="Answer the deposit question" invalid={Boolean(s.fieldErrors?.title)} />
              </Field>
              <Field label="Type" htmlFor="task-type">
                <Select id="task-type" name="type" options={TASK_TYPE_CHOICES} defaultValue="todo" />
              </Field>
              <Field label="Owner" htmlFor="task-owner">
                <Select id="task-owner" name="owner" options={users} placeholder="Unassigned" defaultValue={currentUserId} />
              </Field>
              <Field label="Due date" htmlFor="task-date" error={s.fieldErrors?.due_date}>
                <Input id="task-date" name="due_date" type="date" />
              </Field>
              <Field label="Time" htmlFor="task-time" hint="Empty means all day" error={s.fieldErrors?.due_time}>
                <Input id="task-time" name="due_time" type="time" />
              </Field>
              <Field label="Priority" htmlFor="task-priority">
                <Select id="task-priority" name="priority" options={PRIORITIES} defaultValue="medium" />
              </Field>
              <Field label="Notes" htmlFor="task-body" className="field-full">
                <Textarea id="task-body" name="body" rows={3} />
              </Field>
            </div>
          )}
        </ModalForm>
      ) : null}

      {open === 'email' ? (
        <ModalForm open onClose={close} title="Write email" action={draftEmailAction} hidden={hidden} submitLabel="Save draft for approval" wide>
          {(s) => (
            <>
              <p className="form-note" style={{ margin: 0 }}>
                Nothing is sent from here. The draft goes to the approval queue and waits there.
              </p>
              <div className="form-grid">
                {!contactId ? (
                  <Field label="To" htmlFor="email-to" required className="field-full" error={s.fieldErrors?.contactId}>
                    <Select id="email-to" name="contactId" options={people} placeholder="Pick a person" defaultValue="" invalid={Boolean(s.fieldErrors?.contactId)} />
                  </Field>
                ) : null}
                <Field label="Subject" htmlFor="email-subject" required className="field-full" error={s.fieldErrors?.subject}>
                  <Input id="email-subject" name="subject" invalid={Boolean(s.fieldErrors?.subject)} />
                </Field>
                <Field label="Message" htmlFor="email-body" required className="field-full" error={s.fieldErrors?.body}>
                  <Textarea id="email-body" name="body" rows={8} invalid={Boolean(s.fieldErrors?.body)} />
                </Field>
              </div>
            </>
          )}
        </ModalForm>
      ) : null}
    </>
  );
}
