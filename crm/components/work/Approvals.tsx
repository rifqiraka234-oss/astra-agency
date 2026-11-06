'use client';
/**
 * Approval queue UI (agent C).
 *   <HomeApproval m={view} sendOn={false} />     a row of the "Waiting for your go" panel
 *   <QueueCard m={view} sendOn={false} />        a full message on /approvals with approve, edit and reject
 * m is a MessageView built on the server (lib/work/messageView.ts). Nothing here sends.
 */
import Link from 'next/link';
import { useActionState, useState } from 'react';
import { Badge, Button, Field, Input, Textarea } from '@/components/ui';
import { initialActionState, type ActionState } from '@/lib/forms';
import { approveAction, rejectAction, saveDraftAction, submitAction } from '@/app/(app)/approvals/actions';
import type { MessageView } from '@/lib/work/messageView';
import './work.css';

function Note({ state }: { state: ActionState }) {
  if (state.ok && state.message) return <div className="wk-msg-note" role="status">{state.message}</div>;
  if (!state.ok && state.error) return <div className="wk-msg-note wk-msg-note-red" role="alert">{state.error}</div>;
  return null;
}

function approveLabel(sendOn: boolean) {
  return sendOn ? 'Approve and send' : 'Approve';
}

export function HomeApproval({ m, sendOn }: { m: MessageView; sendOn: boolean }) {
  const [state, action, pending] = useActionState(approveAction, initialActionState);
  return (
    <div className="wk-msg">
      <div className="wk-msg-top">
        <span>{m.channelLabel}</span>
        <span className={m.threadStale ? 'warning' : undefined}>{m.threadLabel}</span>
      </div>
      <div className="wk-msg-to">{m.to}</div>
      <div className="wk-msg-preview">{m.preview}</div>
      {state.ok ? (
        <Note state={state} />
      ) : (
        <>
          <Note state={state} />
          <form action={action} className="wk-msg-actions">
            <input type="hidden" name="id" value={m.id} />
            {m.threadHref ? (
              <Link href={m.threadHref} className="btn btn-secondary btn-sm">
                Read thread
              </Link>
            ) : (
              <Link href={`/approvals#${m.id}`} className="btn btn-secondary btn-sm">
                Read it in full
              </Link>
            )}
            <Button variant="accent" size="sm" type="submit" pending={pending} pendingText="Approving" disabled={!m.canApprove}>
              {approveLabel(sendOn)}
            </Button>
          </form>
        </>
      )}
    </div>
  );
}

export function QueueCard({ m, sendOn }: { m: MessageView; sendOn: boolean }) {
  const [mode, setMode] = useState<'view' | 'edit' | 'reject'>('view');
  const [approveState, approve, approving] = useActionState(approveAction, initialActionState);
  const [rejectState, reject, rejecting] = useActionState(rejectAction, initialActionState);
  const [draftState, saveDraft, saving] = useActionState(async (prev: ActionState, fd: FormData) => {
    const res = await saveDraftAction(prev, fd);
    if (res.ok) setMode('view');
    return res;
  }, initialActionState);
  const [submitState, submit, submitting] = useActionState(submitAction, initialActionState);
  const editable = m.status === 'draft' || m.status === 'rejected' || m.status === 'awaiting_approval';

  return (
    <article id={m.id} className="card wk-qcard" aria-labelledby={`${m.id}-to`}>
      <div className="wk-qhead">
        <div className="stack-sm" style={{ gap: 4 }}>
          <span className="small muted">{m.channelLabel}</span>
          <h2 id={`${m.id}-to`} className="card-title">
            {m.to}
          </h2>
        </div>
        <Badge tone={m.statusTone}>{m.statusLabel}</Badge>
      </div>

      {m.links.length ? (
        <div className="wk-task-meta">
          {m.links.map((l) => (
            <a key={l.href} href={l.href} className="wk-link-chip">
              {l.label}
            </a>
          ))}
        </div>
      ) : null}

      <div className="wk-qmeta">
        <span className={m.threadStale ? 'warning' : undefined}>{m.threadLabel}</span>
        {m.threadCountLabel ? <span>{m.threadCountLabel}</span> : null}
        {m.ownerName ? <span>Owner {m.ownerName}</span> : null}
        <span>{m.updatedLabel}</span>
      </div>

      {m.subject ? <div className="strong text-13">Subject {m.subject}</div> : null}

      {mode === 'edit' ? (
        <form action={saveDraft} className="stack-sm">
          <input type="hidden" name="id" value={m.id} />
          {m.channel === 'email' ? (
            <Field label="Subject" htmlFor={`${m.id}-subject`}>
              <Input id={`${m.id}-subject`} name="subject" defaultValue={m.subject ?? ''} />
            </Field>
          ) : null}
          <Field label="Message" htmlFor={`${m.id}-body`}>
            <Textarea id={`${m.id}-body`} name="body" rows={8} defaultValue={m.body} />
          </Field>
          <Note state={draftState} />
          <div className="row">
            <Button variant="primary" type="submit" pending={saving} pendingText="Saving">
              Save draft
            </Button>
            <Button variant="ghost" onClick={() => setMode('view')}>
              Cancel
            </Button>
          </div>
        </form>
      ) : (
        <div className="wk-qbody">{m.body}</div>
      )}

      {m.status === 'approved' || m.status === 'sent' ? (
        <div className="wk-msg-note">
          {m.approvalLine}
          {m.approvalText ? <> The words were &ldquo;{m.approvalText}&rdquo;.</> : null}
          {m.status === 'approved' && !sendOn ? ' Sending is off in this version, so it has not gone out.' : null}
        </div>
      ) : null}
      {m.status === 'rejected' && m.rejectedReason ? (
        <div className="wk-msg-note wk-msg-note-red">Rejected because {m.rejectedReason}</div>
      ) : null}
      {m.status === 'awaiting_approval' && m.threadStale ? (
        <div className="wk-msg-note wk-msg-note-amber">Pull the thread again before this goes anywhere. A reply may have landed since the last pull.</div>
      ) : null}

      {mode === 'view' && m.status !== 'awaiting_approval' ? <Note state={draftState} /> : null}

      {m.status === 'awaiting_approval' && mode === 'view' ? (
        approveState.ok ? (
          <Note state={approveState} />
        ) : (
          <form action={approve} className="wk-qactions">
            <input type="hidden" name="id" value={m.id} />
            <Field label="Your go, in your own words" htmlFor={`${m.id}-go`} hint="Stored with the approval, word for word">
              <Input id={`${m.id}-go`} name="approval_text" placeholder="Send it" maxLength={1000} />
            </Field>
            <Button variant="accent" type="submit" pending={approving} pendingText="Approving" disabled={!m.canApprove}>
              {approveLabel(sendOn)}
            </Button>
            {editable && m.canEdit ? <Button onClick={() => setMode('edit')}>Edit</Button> : null}
            {m.canApprove ? (
              <Button variant="ghost" onClick={() => setMode('reject')}>
                Reject
              </Button>
            ) : null}
            <div style={{ flexBasis: '100%' }}>
              <Note state={approveState} />
            </div>
          </form>
        )
      ) : null}

      {mode === 'reject' ? (
        rejectState.ok ? (
          <Note state={rejectState} />
        ) : (
          <form action={reject} className="wk-qactions">
            <input type="hidden" name="id" value={m.id} />
            <Field label="Why it should not go out" htmlFor={`${m.id}-reason`}>
              <Input id={`${m.id}-reason`} name="reason" required minLength={3} maxLength={1000} autoFocus placeholder="The angle is off, the thread has a reply" />
            </Field>
            <Button variant="danger" type="submit" pending={rejecting} pendingText="Rejecting">
              Reject
            </Button>
            <Button variant="ghost" onClick={() => setMode('view')}>
              Cancel
            </Button>
            <div style={{ flexBasis: '100%' }}>
              <Note state={rejectState} />
            </div>
          </form>
        )
      ) : null}

      {(m.status === 'draft' || m.status === 'rejected') && mode === 'view' ? (
        <form action={submit} className="wk-qactions">
          <input type="hidden" name="id" value={m.id} />
          {m.canEdit ? <Button onClick={() => setMode('edit')}>Edit draft</Button> : null}
          {m.canEdit ? (
            <Button variant="primary" type="submit" pending={submitting} pendingText="Moving">
              Ask for approval
            </Button>
          ) : null}
          <div style={{ flexBasis: '100%' }}>
            <Note state={submitState} />
          </div>
        </form>
      ) : null}
    </article>
  );
}
