import { notFound } from 'next/navigation';
import { countWords } from '@astra/core';
import { csrfToken, requireSession } from '@/lib/auth';
import {
  approveAction,
  excludeAction,
  postMeetingDecisionAction,
  rejectAction,
  reviseAction,
  suppressAction,
  takeOverAction,
} from '@/lib/actions';
import {
  loadAuditTimeline,
  loadConversation,
  loadDecisions,
  loadMessages,
  loadOpenApproval,
} from '@/lib/queries';

export const dynamic = 'force-dynamic';

/**
 * Conversation detail: everything needed to make one decision, on one page.
 *
 * The ordering is deliberate. The pending approval comes first because it is
 * the thing blocking, and directly under it sits the full predicate log, so
 * approving is never a matter of trusting the system's summary of itself.
 */
export default async function ConversationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireSession();
  const { id } = await params;

  const conversation = await loadConversation(id);
  if (!conversation) notFound();

  const [messages, decisions, approval, timeline, csrf] = await Promise.all([
    loadMessages(id),
    loadDecisions(id),
    loadOpenApproval(id),
    loadAuditTimeline(id),
    csrfToken(),
  ]);

  const latestDecision = decisions[0];

  return (
    <>
      <h1 style={{ fontSize: 20, marginBottom: 4 }}>{conversation.contactName}</h1>
      <p className="muted">
        {conversation.companyName ?? 'Unknown company'}
        {conversation.companyDomain ? ` · ${conversation.companyDomain}` : ''} · {conversation.channel} ·{' '}
        {conversation.campaignId ?? 'no campaign'}
      </p>

      <section className="panel">
        <h2>State</h2>
        <div className="row">
          <span className="tag">{conversation.state}</span>
          <span className="tag">owner: {conversation.owner}</span>
          <span className="tag">
            {conversation.automatedOutboundCount} automated message(s) sent
          </span>
          <span className="tag">{conversation.meaningfulTurnCount} meaningful turns</span>
          {conversation.meetingScheduled ? <span className="tag tag-fail">meeting booked</span> : null}
          {conversation.isSuppressed ? <span className="tag tag-fail">suppressed</span> : null}
        </div>
      </section>

      {approval ? (
        <section className="panel">
          <h2>
            Pending approval: {approval.actionType} (version {approval.version})
          </h2>

          {approval.status === 'STALE' ? (
            <p className="error">
              This approval is stale: the conversation moved on after it was created. It cannot be
              sent. Ask for a fresh draft instead.
            </p>
          ) : null}

          {approval.hypothesis ? (
            <>
              <p>
                <strong>Angle:</strong> {approval.hypothesis}
              </p>
              <p className="muted">{approval.businessReasoning}</p>
            </>
          ) : null}

          {approval.prototypeUrl ? (
            <p>
              <strong>Prototype:</strong>{' '}
              <a href={approval.prototypeUrl} target="_blank" rel="noopener noreferrer nofollow">
                {approval.prototypeUrl}
              </a>
              <br />
              <span className="muted">
                This link has not been sent. Approving is what sends it, and only in this exact
                version.
              </span>
            </p>
          ) : null}

          {approval.desktopScreenshot || approval.mobileScreenshot ? (
            <div className="screenshots">
              {approval.desktopScreenshot ? (
                <figure>
                  <figcaption className="muted">Desktop</figcaption>
                  <img src={`/api/screenshot?path=${encodeURIComponent(approval.desktopScreenshot)}`} alt="Desktop rendering of the prototype" />
                </figure>
              ) : null}
              {approval.mobileScreenshot ? (
                <figure>
                  <figcaption className="muted">Mobile</figcaption>
                  <img src={`/api/screenshot?path=${encodeURIComponent(approval.mobileScreenshot)}`} alt="Mobile rendering of the prototype" />
                </figure>
              ) : null}
            </div>
          ) : null}

          <form action={approveAction}>
            <input type="hidden" name="csrf" value={csrf} />
            <input type="hidden" name="approvalId" value={approval.id} />
            <input type="hidden" name="conversationId" value={conversation.id} />
            <p className="muted" style={{ marginBottom: 4 }}>
              Exact message that will be sent ({countWords(approval.replyText)} words):
            </p>
            <pre
              className="mono"
              style={{ whiteSpace: 'pre-wrap', background: '#f7f8fa', padding: 12, borderRadius: 6 }}
            >
              {approval.replyText}
            </pre>
            <p className="muted mono">
              reply hash {approval.replyContentHash.slice(0, 16)} · conversation hash{' '}
              {approval.conversationHash.slice(0, 16)} · policy {approval.policyVersion} · prompt{' '}
              {approval.promptVersion} · expires {approval.expiresAt.slice(0, 16).replace('T', ' ')}
            </p>
            <div className="actions">
              <button className="primary" type="submit" disabled={approval.status === 'STALE'}>
                Approve and send exactly this
              </button>
            </div>
          </form>

          <form action={reviseAction} style={{ marginTop: 16 }}>
            <input type="hidden" name="csrf" value={csrf} />
            <input type="hidden" name="approvalId" value={approval.id} />
            <input type="hidden" name="conversationId" value={conversation.id} />
            <p className="muted" style={{ marginBottom: 4 }}>
              Revise. This creates a new version and invalidates the one above.
            </p>
            <textarea name="replyText" defaultValue={approval.replyText} />
            <div className="actions">
              <button type="submit">Save revision</button>
            </div>
          </form>

          <form action={rejectAction} style={{ marginTop: 8 }}>
            <input type="hidden" name="csrf" value={csrf} />
            <input type="hidden" name="approvalId" value={approval.id} />
            <input type="hidden" name="conversationId" value={conversation.id} />
            <div className="actions">
              <button className="danger" type="submit">
                Reject
              </button>
            </div>
          </form>
        </section>
      ) : null}

      {conversation.meetingScheduled && conversation.postMeetingDecision === null ? (
        <section className="panel">
          <h2>A meeting exists. What happens to this conversation?</h2>
          <p className="muted">
            Automation has stopped. It stays human owned until you choose.
          </p>
          <form action={postMeetingDecisionAction}>
            <input type="hidden" name="csrf" value={csrf} />
            <input type="hidden" name="conversationId" value={conversation.id} />
            <div className="actions">
              <button className="primary" name="decision" value="KEEP_HUMAN" type="submit">
                Keep human owned (recommended)
              </button>
              <button name="decision" value="RESUME_LOW_RISK" type="submit">
                Resume low-risk automation after the meeting
              </button>
              <button className="danger" name="decision" value="EXCLUDE" type="submit">
                Exclude permanently
              </button>
            </div>
          </form>
        </section>
      ) : null}

      {latestDecision ? (
        <section className="panel">
          <h2>Latest decision</h2>
          <div className="row">
            <span className="tag">controller: {latestDecision.controllerAction}</span>
            <span className="tag">model asked: {latestDecision.modelRecommendation ?? 'n/a'}</span>
            <span className="tag">{latestDecision.intent ?? 'no intent'}</span>
            <span className="tag">
              confidence {latestDecision.confidence?.toFixed(3) ?? 'n/a'}
            </span>
            <span className="tag">risk {latestDecision.risk ?? 'n/a'}</span>
          </div>
          <p>{latestDecision.detail}</p>

          <h2 style={{ marginTop: 16 }}>Why (every predicate, passing and failing)</h2>
          {latestDecision.predicates.length === 0 ? (
            <p className="muted">No predicates were recorded for this decision.</p>
          ) : (
            latestDecision.predicates.map((predicate, index) => (
              <div className="row" key={`${predicate.id}-${index}`}>
                <span className={predicate.passed ? 'tag tag-pass' : 'tag tag-fail'}>
                  {predicate.passed ? 'pass' : 'block'}
                </span>
                <span className="mono">{predicate.id}</span>
                <span className="grow muted">{predicate.detail}</span>
              </div>
            ))
          )}

          <h2 style={{ marginTop: 16 }}>Evidence</h2>
          {latestDecision.evidence.length === 0 ? (
            <p className="muted">
              No evidence rows. Any claim about the company would have been rejected.
            </p>
          ) : (
            latestDecision.evidence.map((item, index) => (
              <div className="row" key={index}>
                <div className="grow">
                  <div>{item.claim}</div>
                  <div className="muted">{item.support}</div>
                </div>
                {item.source_url ? (
                  <a href={item.source_url} target="_blank" rel="noopener noreferrer nofollow">
                    source
                  </a>
                ) : (
                  <span className="muted">conversation</span>
                )}
              </div>
            ))
          )}
        </section>
      ) : null}

      <section className="panel">
        <h2>Conversation</h2>
        {messages.length === 0 ? (
          <p className="muted">No messages have been synced yet.</p>
        ) : (
          messages.map((message) => (
            <div
              className={`message ${message.direction === 'INBOUND' ? 'inbound' : ''} ${
                message.direction === 'UNCERTAIN' ? 'uncertain' : ''
              }`}
              key={message.id}
            >
              <div className="muted mono">
                {message.occurredAt.replace('T', ' ').slice(0, 19)} · {message.direction} ·{' '}
                {message.kind}
                {message.sender ? ` · ${message.sender}` : ''}
                {message.attachments.length > 0
                  ? ` · ${message.attachments.length} attachment(s): ${message.attachments
                      .map((attachment) => attachment.name)
                      .join(', ')}`
                  : ''}
              </div>
              {message.subject ? <strong>{message.subject}</strong> : null}
              {/* The stored text is already sanitized and stripped of quoted
                  history; it is rendered as text, never as markup. */}
              <pre>{message.bodyText}</pre>
            </div>
          ))
        )}
      </section>

      <section className="panel">
        <h2>Controls</h2>
        <form action={takeOverAction}>
          <input type="hidden" name="csrf" value={csrf} />
          <input type="hidden" name="conversationId" value={conversation.id} />
          <div className="actions">
            <button type="submit">Take over (stops all automation here)</button>
          </div>
        </form>

        <form action={excludeAction} style={{ marginTop: 8 }}>
          <input type="hidden" name="csrf" value={csrf} />
          <input type="hidden" name="conversationId" value={conversation.id} />
          <input type="hidden" name="scope" value="CONTACT" />
          <input type="hidden" name="targetId" value={conversation.id} />
          <input type="text" name="reason" placeholder="Reason for excluding" required />
          <div className="actions">
            <button className="danger" type="submit">
              Exclude this contact
            </button>
          </div>
        </form>

        <form action={suppressAction} style={{ marginTop: 8 }}>
          <input type="hidden" name="csrf" value={csrf} />
          <input type="hidden" name="conversationId" value={conversation.id} />
          <input type="hidden" name="contactId" value={conversation.id} />
          <div className="actions">
            <button className="danger" type="submit">
              Suppress (never contact again)
            </button>
          </div>
        </form>
      </section>

      <section className="panel">
        <h2>Audit timeline</h2>
        {timeline.map((entry, index) => (
          <div className="row" key={index}>
            <span className="muted mono">{entry.occurredAt.replace('T', ' ').slice(0, 19)}</span>
            <span className="mono">{entry.action}</span>
            <span className="tag">{entry.actor}</span>
            <span className="grow muted">
              {entry.reasonCode ?? ''} {entry.detail ?? ''}
            </span>
          </div>
        ))}
      </section>
    </>
  );
}
