import {
  POLICY_VERSION,
  buildModelContext,
  contentHash,
  decideControllerAction,
  deterministicSummary,
  findPrototypeOffer,
  transition,
  type ClaudeDecision,
  type ControllerAction,
  type ConversationState,
} from '@astra/core';
import {
  createApproval,
  getOrCreateConversation,
  getPool,
  listActiveExclusions,
  recentOutboundTexts,
  recordAudit,
  recordDecision,
  recordOwnershipChange,
  recordStateTransition,
  staleApprovalsForConversation,
  suppressContact,
  syncConversationSnapshot,
  withContactLock,
  type ConversationRow,
} from '@astra/db';
import { approvalBindingKey } from '@astra/core';
import { loadPrompt } from '@astra/prompts';
import type { AppContext } from '../context.js';
import { fetchConversationContext, type ConversationContext } from './fetch-context.js';
import { verifyCompanyIdentity } from './research.js';
import { resolveAcceptanceOwnership, resolveReplyOwnership } from './ownership.js';
import { executeSend } from './send.js';
import { notifyOperator } from './notify.js';
import { METRIC_NAMES, increment, observe } from '../metrics.js';
import { createLogger } from '../logger.js';

/**
 * The orchestration.
 *
 * Reads as a straight line on purpose: lock, refetch, decide ownership,
 * analyze, let the controller choose, execute exactly one action, record
 * everything. Each step can end the run, and ending the run without acting is
 * always an acceptable outcome.
 */

export interface ProcessInput {
  readonly jobId: string;
  readonly contactId: string;
  readonly lemlistContactId: string;
  readonly jobType: string;
  readonly correlationId: string;
  readonly webhookLeadId?: string | null;
  readonly webhookCampaignId?: string | null;
  readonly isThirdPartyReply?: boolean;
  readonly wasAcceptanceEvent?: boolean;
}

export interface ProcessResult {
  readonly action: ControllerAction | 'SKIPPED_LOCKED' | 'SUPPRESSED';
  readonly state: ConversationState;
  readonly detail: string;
}

export async function processConversation(
  context: AppContext,
  input: ProcessInput,
): Promise<ProcessResult> {
  const started = Date.now();
  const logger = createLogger(
    context.config.LOG_LEVEL,
    { contactId: input.lemlistContactId, job: input.jobType },
    input.correlationId,
  );

  // One worker per conversation. A second worker that arrives while this one
  // holds the lock does nothing rather than racing it to a send.
  const locked = await withContactLock(input.contactId, async () =>
    runLocked({ ...context, logger }, input, logger),
  );

  if (!locked.acquired) {
    logger.info('another worker holds this contact, skipping');
    return {
      action: 'SKIPPED_LOCKED',
      state: 'DEBOUNCING',
      detail: 'Another worker is already processing this conversation.',
    };
  }

  observe('astra_process_latency_ms', Date.now() - started);
  return locked.result;
}

async function runLocked(
  context: AppContext,
  input: ProcessInput,
  logger: ReturnType<typeof createLogger>,
): Promise<ProcessResult> {
  const pool = getPool();

  // --- suppression short circuit -------------------------------------------
  if (input.jobType === 'SUPPRESS_CONTACT') {
    const conversation = await getOrCreateConversation(pool, input.contactId, input.webhookCampaignId ?? null);
    await suppressContact(pool, input.contactId, 'suppression event received from Lemlist');
    await recordOwnershipChange(pool, {
      conversationId: conversation.id,
      previousOwner: conversation.owner,
      nextOwner: 'SUPPRESSED',
      actor: 'controller',
      reasonCode: 'SUPPRESSED_CONTACT',
      detail: 'Unsubscribe or delivery failure event. No model call was made.',
      correlationId: input.correlationId,
    });
    await safeTransition(context, conversation, 'SUPPRESSED', 'SUPPRESSED_CONTACT', input.correlationId);
    const staled = await staleApprovalsForConversation(pool, conversation.id, 'contact suppressed');
    if (staled > 0) increment(METRIC_NAMES.approvalsStale, { reason: 'SUPPRESSED' });
    logger.info('contact suppressed without calling the model');
    return { action: 'SUPPRESSED', state: 'SUPPRESSED', detail: 'Contact suppressed.' };
  }

  // --- refetch everything ---------------------------------------------------
  const conversationRow = await getOrCreateConversation(
    pool,
    input.contactId,
    input.webhookCampaignId ?? null,
  );

  // A terminal conversation is finished. Nothing reopens it except an
  // operator, so a late webhook must not drag it back into the pipeline.
  if (conversationRow.state === 'SUPPRESSED' || conversationRow.state === 'DEAD_LETTER') {
    logger.info('conversation is in a terminal state, nothing to do', {
      state: conversationRow.state,
    });
    return {
      action: 'NO_ACTION',
      state: conversationRow.state,
      detail: `Conversation is ${conversationRow.state}.`,
    };
  }

  // Every run enters through DEBOUNCING, whatever state the conversation was
  // left in. That is what makes "a later reply re-enters the pipeline" true
  // for a sequence-owned, completed or human-owned conversation alike, and it
  // records that the debounce window actually elapsed.
  if (conversationRow.state !== 'DEBOUNCING') {
    await safeTransition(
      context,
      conversationRow,
      'DEBOUNCING',
      'DUPLICATE_EVENT',
      input.correlationId,
      'Debounce window elapsed, picking the conversation up.',
    );
  }

  await safeTransition(
    context,
    { ...conversationRow, state: 'DEBOUNCING' },
    'FETCHING_CONTEXT',
    'DUPLICATE_EVENT',
    input.correlationId,
  );

  const fetched = await fetchConversationContext(context, {
    lemlistContactId: input.lemlistContactId,
    leadId: input.webhookLeadId ?? null,
    campaignId: input.webhookCampaignId ?? conversationRow.lemlist_campaign_id,
  });

  await syncConversationSnapshot(pool, conversationRow.id, fetched.conversation);

  // A new inbound message invalidates anything already pending.
  if (
    conversationRow.latest_inbound_message_id !== null &&
    conversationRow.latest_inbound_message_id !== fetched.conversation.latestInboundMessageId
  ) {
    const staled = await staleApprovalsForConversation(
      pool,
      conversationRow.id,
      'a newer inbound message arrived',
    );
    if (staled > 0) increment(METRIC_NAMES.approvalsStale, { reason: 'NEW_INBOUND' });
  }

  // --- ownership ------------------------------------------------------------
  const ownership = input.wasAcceptanceEvent
    ? await resolveAcceptanceOwnership(context, fetched, input.lemlistContactId)
    : await resolveReplyOwnership(context, fetched, conversationRow.owner);

  if (ownership.owner !== conversationRow.owner) {
    await recordOwnershipChange(pool, {
      conversationId: conversationRow.id,
      previousOwner: conversationRow.owner,
      nextOwner: ownership.owner,
      actor: 'controller',
      reasonCode: ownership.reasonCodes[0] ?? 'OWNERSHIP_ACQUIRED',
      detail: ownership.detail,
      pauseVerified: ownership.pauseVerified,
      correlationId: input.correlationId,
    });
  }

  if (!ownership.mayCompose) {
    const nextState: ConversationState =
      ownership.owner === 'LEMLIST_SEQUENCE' ? 'SEQUENCE_OWNED' : 'HUMAN_REVIEW_REQUIRED';

    await safeTransition(
      context,
      { ...conversationRow, state: 'FETCHING_CONTEXT' },
      nextState,
      ownership.reasonCodes[0] ?? 'OWNER_UNKNOWN',
      input.correlationId,
      ownership.detail,
    );

    if (nextState === 'HUMAN_REVIEW_REQUIRED') {
      increment(METRIC_NAMES.handoffs, { reason: ownership.reasonCodes[0] ?? 'OWNER_UNKNOWN' });
      await notifyOperator(context, {
        conversationId: conversationRow.id,
        kind: 'HUMAN_HANDOFF',
        subject: 'A conversation needs you',
        body: ownership.detail,
        dedupeKey: `handoff:${conversationRow.id}:${ownership.reasonCodes[0] ?? 'OWNER'}`,
      });
    }

    logger.info('composition not permitted', {
      owner: ownership.owner,
      reasonCodes: ownership.reasonCodes,
    });
    return { action: 'NO_ACTION', state: nextState, detail: ownership.detail };
  }

  // --- analysis -------------------------------------------------------------
  if (context.config.RUNTIME_MODE === 'HUMAN_ONLY') {
    await safeTransition(
      context,
      { ...conversationRow, state: 'FETCHING_CONTEXT' },
      'HUMAN_OWNED',
      'MODE_DISALLOWS_SEND',
      input.correlationId,
      'HUMAN_ONLY mode: the event was ingested and displayed, no analysis was run.',
    );
    return {
      action: 'NO_ACTION',
      state: 'HUMAN_OWNED',
      detail: 'HUMAN_ONLY mode: ingested and displayed only.',
    };
  }

  await safeTransition(
    context,
    { ...conversationRow, state: 'FETCHING_CONTEXT' },
    'ANALYZING',
    'OWNERSHIP_ACQUIRED',
    input.correlationId,
  );

  const prompt = loadPrompt('conversation-analysis');
  const modelContext = buildModelContext(fetched.conversation);

  const analysis = await context.anthropic.analyzeConversation({
    model: context.config.ANTHROPIC_ANALYSIS_MODEL,
    systemPrompt: prompt.body,
    promptVersion: prompt.versionTag,
    userContent: buildUserContent(fetched, modelContext.text, modelContext.truncated),
  });

  if (!analysis.ok || analysis.value === null) {
    increment(METRIC_NAMES.decisions, { action: 'MODEL_SCHEMA_INVALID' });
    await recordDecision(pool, {
      conversationId: conversationRow.id,
      modelRecommendation: null,
      controllerAction: 'HANDOFF',
      lowRiskCase: null,
      intent: null,
      confidence: null,
      risk: null,
      reasonCodes: ['MODEL_SCHEMA_INVALID'],
      predicates: [],
      evidence: [],
      policyVersion: POLICY_VERSION,
      detail: `Model output did not validate: ${analysis.parseErrors.join('; ')}`,
      sourceMessageId: fetched.conversation.latestInboundMessageId,
      correlationId: input.correlationId,
    });
    await safeTransition(
      context,
      { ...conversationRow, state: 'ANALYZING' },
      'HUMAN_REVIEW_REQUIRED',
      'MODEL_SCHEMA_INVALID',
      input.correlationId,
    );
    await notifyOperator(context, {
      conversationId: conversationRow.id,
      kind: 'HUMAN_HANDOFF',
      subject: 'Model output failed validation',
      body: 'The analysis did not match the required schema, so nothing was acted on.',
      dedupeKey: `handoff:${conversationRow.id}:MODEL_SCHEMA_INVALID`,
    });
    return {
      action: 'HANDOFF',
      state: 'HUMAN_REVIEW_REQUIRED',
      detail: 'Model output failed schema validation.',
    };
  }

  const decision: ClaudeDecision = analysis.value;

  // --- controller -----------------------------------------------------------
  const exclusions = await listActiveExclusions(pool);
  const recentTexts = await recentOutboundTexts(pool, conversationRow.id);

  // The post-acceptance message asserts something specific about the
  // prospect's site, so the site has to be provably theirs before the
  // controller will let it go out unattended.
  const needsIdentity =
    decision.classification.intent === 'CONNECTION_ACCEPTED' ||
    decision.recommendation.research_required;

  const contactRow = await pool.query<{ company_name: string | null; company_domain: string | null }>(
    'SELECT company_name, company_domain FROM contacts WHERE id = $1',
    [input.contactId],
  );

  const identity = needsIdentity
    ? await verifyCompanyIdentity(context, {
        conversationId: conversationRow.id,
        contactId: input.contactId,
        companyName: contactRow.rows[0]?.company_name ?? null,
        companyDomain: contactRow.rows[0]?.company_domain ?? null,
        correlationId: input.correlationId,
      })
    : null;

  if (identity?.injectionSuspected) {
    logger.warn('prompt injection detected on the company site, automation disabled for this run');
  }

  const policy = decideControllerAction({
    config: context.config,
    now: new Date(),
    decision,
    conversation: fetched.conversation,
    owner: ownership.owner,
    campaignId: fetched.campaignId,
    contactId: input.lemlistContactId,
    leadId: fetched.lead?.id ?? null,
    exclusions,
    pendingTasks: fetched.pendingTasks,
    automatedOutboundCount: conversationRow.automated_outbound_count,
    contextTruncated: modelContext.truncated,
    freshness: {
      expectedConversationHash: fetched.conversation.conversationHash,
      actualConversationHash: fetched.conversation.conversationHash,
      expectedLatestInboundMessageId: fetched.conversation.latestInboundMessageId,
      actualLatestInboundMessageId: fetched.conversation.latestInboundMessageId,
    },
    meetingScheduled: conversationRow.meeting_scheduled,
    // No concept-brief store exists yet, so a message claiming completed work
    // is always downgraded to a draft. See the deferred items in the README.
    hasStoredConceptBrief: false,
    companyIdentityVerified: identity?.verified ?? false,
    sendIdentifiers: {
      leadId: fetched.lead?.id ?? null,
      contactId: input.lemlistContactId,
      sendUserId: context.config.LEMLIST_SEND_USER_ID || null,
      replyToActivityId: fetched.conversation.latestInboundEmailActivityId,
    },
    recentOutboundTexts: recentTexts,
    supportedClaimTerms: [
      ...decision.evidence.map((item) => item.claim.toLowerCase()),
      ...(identity?.evidenceTerms ?? []),
    ],
    isThirdPartyReply: input.isThirdPartyReply ?? false,
  });

  const decisionId = await recordDecision(pool, {
    conversationId: conversationRow.id,
    modelRecommendation: decision.recommendation.action,
    controllerAction: policy.action,
    lowRiskCase: policy.lowRiskCase,
    intent: decision.classification.intent,
    confidence: decision.classification.confidence,
    risk: decision.classification.risk,
    reasonCodes: policy.reasonCodes,
    predicates: policy.predicates,
    evidence: decision.evidence,
    policyVersion: policy.policyVersion,
    detail: policy.detail,
    sourceMessageId: fetched.conversation.latestInboundMessageId,
    correlationId: input.correlationId,
  });

  increment(METRIC_NAMES.decisions, { action: policy.action });
  logger.info('controller decided', {
    action: policy.action,
    intent: decision.classification.intent,
    confidence: decision.classification.confidence,
    failing: policy.predicates.filter((predicate) => !predicate.passed).map((p) => p.id),
  });

  // SHADOW records the decision and stops. That is the entire point of the
  // mode: see what it would have done, without it doing anything.
  if (context.config.RUNTIME_MODE === 'SHADOW') {
    await safeTransition(
      context,
      { ...conversationRow, state: 'ANALYZING' },
      'COMPLETED_NO_ACTION',
      'MODE_DISALLOWS_SEND',
      input.correlationId,
      `SHADOW mode recorded a ${policy.action} decision without acting.`,
    );
    return {
      action: policy.action,
      state: 'COMPLETED_NO_ACTION',
      detail: `SHADOW: would have chosen ${policy.action}.`,
    };
  }

  return executeControllerAction(context, {
    input,
    conversationRow,
    fetched,
    decision,
    policy,
    decisionId,
    promptVersion: prompt.versionTag,
    summary: deterministicSummary(fetched.conversation),
    recentTexts,
    supportedClaimTerms: [
      ...decision.evidence.map((item) => item.claim.toLowerCase()),
      ...(identity?.evidenceTerms ?? []),
    ],
    logger,
  });
}

interface ExecuteInput {
  readonly input: ProcessInput;
  readonly conversationRow: ConversationRow;
  readonly fetched: ConversationContext;
  readonly decision: ClaudeDecision;
  readonly policy: ReturnType<typeof decideControllerAction>;
  readonly decisionId: string;
  readonly promptVersion: string;
  readonly summary: string;
  readonly recentTexts: readonly string[];
  readonly supportedClaimTerms: readonly string[];
  readonly logger: ReturnType<typeof createLogger>;
}

async function executeControllerAction(
  context: AppContext,
  args: ExecuteInput,
): Promise<ProcessResult> {
  const pool = getPool();
  const { conversationRow, fetched, policy, decision, input } = args;

  switch (policy.action) {
    case 'SUPPRESS': {
      await suppressContact(pool, input.contactId, 'explicit unsubscribe in conversation');
      await safeTransition(context, { ...conversationRow, state: 'ANALYZING' }, 'SUPPRESSED', 'SUPPRESSED_CONTACT', input.correlationId);
      return { action: 'SUPPRESS', state: 'SUPPRESSED', detail: policy.detail };
    }

    case 'NO_ACTION': {
      await safeTransition(context, { ...conversationRow, state: 'ANALYZING' }, 'COMPLETED_NO_ACTION', 'ALLOWED_LOW_RISK_CASE', input.correlationId, policy.detail);
      return { action: 'NO_ACTION', state: 'COMPLETED_NO_ACTION', detail: policy.detail };
    }

    case 'HANDOFF': {
      increment(METRIC_NAMES.handoffs, { reason: policy.reasonCodes[0] ?? 'UNSPECIFIED' });
      await recordOwnershipChange(pool, {
        conversationId: conversationRow.id,
        previousOwner: conversationRow.owner,
        nextOwner: 'HUMAN',
        actor: 'controller',
        reasonCode: policy.reasonCodes[0] ?? 'HANDOFF',
        detail: policy.detail,
        correlationId: input.correlationId,
      });
      await safeTransition(context, { ...conversationRow, state: 'ANALYZING' }, 'HUMAN_REVIEW_REQUIRED', policy.reasonCodes[0] ?? 'HANDOFF', input.correlationId, policy.detail);
      await notifyOperator(context, {
        conversationId: conversationRow.id,
        kind: 'HUMAN_HANDOFF',
        subject: 'Automation paused on a conversation',
        body: policy.detail,
        // One alert per unresolved reason, not one per event.
        dedupeKey: `handoff:${conversationRow.id}:${policy.reasonCodes[0] ?? 'HANDOFF'}`,
      });
      return { action: 'HANDOFF', state: 'HUMAN_REVIEW_REQUIRED', detail: policy.detail };
    }

    case 'BUILD_PROTOTYPE': {
      // A "yes" only means "send the prototype" if we actually offered one.
      const offer = findPrototypeOffer(fetched.conversation);
      if (!offer) {
        await safeTransition(context, { ...conversationRow, state: 'ANALYZING' }, 'HUMAN_REVIEW_REQUIRED', 'NO_PRIOR_PROTOTYPE_OFFER', input.correlationId);
        await notifyOperator(context, {
          conversationId: conversationRow.id,
          kind: 'HUMAN_HANDOFF',
          subject: 'Prospect agreed to something we never offered',
          body: 'The prospect replied affirmatively, but no prototype offer exists in this conversation, so what they agreed to is unknown.',
          dedupeKey: `handoff:${conversationRow.id}:NO_PRIOR_PROTOTYPE_OFFER`,
        });
        return {
          action: 'HANDOFF',
          state: 'HUMAN_REVIEW_REQUIRED',
          detail: 'No prior prototype offer, so the meaning of "yes" is unknown.',
        };
      }

      await enqueuePrototypeJob(context, {
        conversationId: conversationRow.id,
        contactId: input.contactId,
        conversationHash: fetched.conversation.conversationHash,
        latestInboundMessageId: fetched.conversation.latestInboundMessageId,
        offerMessageId: offer.messageId,
        correlationId: input.correlationId,
      });
      await safeTransition(context, { ...conversationRow, state: 'ANALYZING' }, 'PROTOTYPE_QUEUED', 'PROTOTYPE_URL_REQUIRES_APPROVAL', input.correlationId, policy.detail);
      increment(METRIC_NAMES.prototypeBuilds, { outcome: 'queued' });
      return { action: 'BUILD_PROTOTYPE', state: 'PROTOTYPE_QUEUED', detail: policy.detail };
    }

    case 'AUTO_SEND': {
      const outcome = await executeSend(context, {
        conversationId: conversationRow.id,
        lemlistContactId: input.lemlistContactId,
        channel: fetched.conversation.channel === 'email' ? 'email' : 'linkedin',
        text: decision.recommendation.reply_text ?? '',
        lowRiskCase: policy.lowRiskCase,
        maxWords: policy.maxWords ?? 65,
        allowUrls: false,
        allowedUrls: [],
        recentOutboundTexts: args.recentTexts,
        supportedClaimTerms: args.supportedClaimTerms,
        expectedConversationHash: fetched.conversation.conversationHash,
        expectedLatestInboundMessageId: fetched.conversation.latestInboundMessageId,
        ownAddresses: fetched.ownAddresses,
        leadId: fetched.lead?.id ?? null,
        sendUserId: context.config.LEMLIST_SEND_USER_ID || null,
        sendUserEmail: fetched.ownAddresses[0] ?? null,
        sendUserMailboxId: null,
        replyToActivityId: fetched.conversation.latestInboundEmailActivityId,
        decisionId: args.decisionId,
        isApprovedSend: false,
        correlationId: input.correlationId,
      });

      if (outcome.status === 'SENT' || outcome.status === 'DUPLICATE') {
        await safeTransition(context, { ...conversationRow, state: 'ANALYZING' }, 'LOW_RISK_ELIGIBLE', 'ALLOWED_LOW_RISK_CASE', input.correlationId);
        await safeTransition(context, { ...conversationRow, state: 'LOW_RISK_ELIGIBLE' }, 'COMPLETED_NO_ACTION', 'ALLOWED_LOW_RISK_CASE', input.correlationId);
        return { action: 'AUTO_SEND', state: 'COMPLETED_NO_ACTION', detail: `Send ${outcome.status}.` };
      }

      // Anything other than a clean send becomes a human's problem, including
      // the ambiguous case where we do not know whether it went out.
      await safeTransition(context, { ...conversationRow, state: 'ANALYZING' }, 'HUMAN_REVIEW_REQUIRED', 'MODE_DISALLOWS_SEND', input.correlationId);
      await notifyOperator(context, {
        conversationId: conversationRow.id,
        kind: 'HUMAN_HANDOFF',
        subject: `Automatic send did not complete (${outcome.status})`,
        body:
          outcome.status === 'UNKNOWN'
            ? 'A send timed out and it is not known whether the message was delivered. It will not be retried automatically.'
            : `The send did not go out: ${'reasonCodes' in outcome ? outcome.reasonCodes.join(', ') : outcome.detail}`,
        dedupeKey: `send-failed:${conversationRow.id}:${outcome.status}`,
      });
      return { action: 'HANDOFF', state: 'HUMAN_REVIEW_REQUIRED', detail: `Send outcome ${outcome.status}.` };
    }

    case 'REQUEST_MESSAGE_APPROVAL':
    case 'CREATE_DRAFT': {
      const replyText = decision.recommendation.reply_text ?? '';
      if (replyText.trim().length === 0) {
        await safeTransition(context, { ...conversationRow, state: 'ANALYZING' }, 'HUMAN_REVIEW_REQUIRED', 'EMPTY_MESSAGE', input.correlationId);
        return { action: 'HANDOFF', state: 'HUMAN_REVIEW_REQUIRED', detail: 'No draft text was produced.' };
      }

      const expiresAt = new Date(Date.now() + context.config.APPROVAL_EXPIRY_HOURS * 3600 * 1000);
      const replyHash = contentHash(replyText);

      const approval = await createApproval(pool, {
        conversationId: conversationRow.id,
        actionType: 'SEND_MESSAGE',
        bindingKey: approvalBindingKey({
          operatorEmail: context.config.ADMIN_EMAIL,
          actionType: 'SEND_MESSAGE',
          conversationId: conversationRow.id,
          contactId: input.lemlistContactId,
          sourceLatestInboundMessageId: fetched.conversation.latestInboundMessageId,
          conversationHash: fetched.conversation.conversationHash,
          replyContentHash: replyHash,
          prototypeVersionId: null,
          prototypeContentHash: null,
          prototypeDeployHash: null,
          policyVersion: policy.policyVersion,
          promptVersion: args.promptVersion,
          expiresAt,
        }),
        sourceLatestInboundMessageId: fetched.conversation.latestInboundMessageId,
        conversationHash: fetched.conversation.conversationHash,
        replyText,
        replyContentHash: replyHash,
        policyVersion: policy.policyVersion,
        promptVersion: args.promptVersion,
        expiresAt,
        correlationId: input.correlationId,
      });

      increment(METRIC_NAMES.approvalsRequested, { action: 'SEND_MESSAGE' });

      // In DRAFT_ONLY the draft also lands in the Lemlist inbox, so the
      // operator can act from either place.
      if (context.config.canCreateDrafts && context.config.LEMLIST_DRAFT_OWNER) {
        try {
          await context.lemlist.createDraft({
            contactId: input.lemlistContactId,
            draftOwner: context.config.LEMLIST_DRAFT_OWNER,
            channel: fetched.conversation.channel === 'email' ? 'email' : 'linkedin',
            content: replyText,
            ...(fetched.conversation.latestInboundEmailActivityId
              ? { replyToActivityId: fetched.conversation.latestInboundEmailActivityId }
              : {}),
          });
          increment(METRIC_NAMES.drafts, {});
        } catch (error) {
          args.logger.warn('draft creation failed, approval still stands', { error });
        }
      }

      await safeTransition(context, { ...conversationRow, state: 'ANALYZING' }, 'AWAITING_MESSAGE_APPROVAL', 'ACTION_REQUIRES_APPROVAL', input.correlationId, policy.detail);
      await notifyOperator(context, {
        conversationId: conversationRow.id,
        kind: 'MESSAGE_APPROVAL_READY',
        subject: 'A reply is waiting for your approval',
        body: `${args.summary}\n\n${policy.detail}`,
        dedupeKey: `approval:${approval.id}`,
      });

      return {
        action: 'REQUEST_MESSAGE_APPROVAL',
        state: 'AWAITING_MESSAGE_APPROVAL',
        detail: policy.detail,
      };
    }

    case 'PROPOSE_CALENDAR_SLOTS':
    case 'BOOK_SELECTED_SLOT': {
      // The calendar workflow owns its own freshness and reservation rules.
      const { runCalendarWorkflow } = await import('./calendar.js');
      return runCalendarWorkflow(context, {
        action: policy.action,
        conversationRow,
        fetched,
        decision,
        policy,
        decisionId: args.decisionId,
        promptVersion: args.promptVersion,
        input,
      });
    }

    default: {
      await safeTransition(context, { ...conversationRow, state: 'ANALYZING' }, 'HUMAN_REVIEW_REQUIRED', 'ACTION_REQUIRES_APPROVAL', input.correlationId);
      return {
        action: 'HANDOFF',
        state: 'HUMAN_REVIEW_REQUIRED',
        detail: `Unhandled controller action ${policy.action}.`,
      };
    }
  }
}

async function enqueuePrototypeJob(
  context: AppContext,
  input: {
    conversationId: string;
    contactId: string;
    conversationHash: string;
    latestInboundMessageId: string | null;
    offerMessageId: string;
    correlationId: string;
  },
): Promise<void> {
  await getPool().query(
    `INSERT INTO prototype_jobs
       (conversation_id, contact_id, source_conversation_hash, source_latest_inbound_message_id, offer_message_id, correlation_id)
     VALUES ($1,$2,$3,$4,$5,$6)`,
    [
      input.conversationId,
      input.contactId,
      input.conversationHash,
      input.latestInboundMessageId,
      input.offerMessageId,
      input.correlationId,
    ],
  );
  context.logger.info('queued a prototype build', { conversationId: input.conversationId });
}

/**
 * Apply a state transition, validating it first. An illegal transition throws
 * inside `transition`, which is caught here, audited, and converted into a
 * review item: a controller that has lost track of its own state must not go
 * on to send anything.
 */
async function safeTransition(
  context: AppContext,
  conversation: Pick<ConversationRow, 'id' | 'state'>,
  next: ConversationState,
  reasonCode: string,
  correlationId: string,
  detail?: string,
): Promise<void> {
  const pool = getPool();
  try {
    transition({
      conversationId: conversation.id,
      from: conversation.state,
      to: next,
      actor: 'controller',
      reasonCode: reasonCode as never,
      sourceMessageId: null,
      correlationId,
      ...(detail === undefined ? {} : { detail }),
    });
  } catch (error) {
    await recordAudit(pool, {
      conversationId: conversation.id,
      actor: 'controller',
      action: 'ILLEGAL_STATE_TRANSITION',
      reasonCode,
      payload: { from: conversation.state, to: next },
      correlationId,
    });
    context.logger.error('illegal state transition, refusing to proceed', {
      from: conversation.state,
      to: next,
      error,
    });
    throw error;
  }

  await recordStateTransition(pool, {
    conversationId: conversation.id,
    previousState: conversation.state,
    nextState: next,
    actor: 'controller',
    reasonCode,
    detail: detail ?? null,
    correlationId,
  });
}

function buildUserContent(
  fetched: ConversationContext,
  conversationText: string,
  truncated: boolean,
): string {
  const upcoming = fetched.steps
    .filter((step) => !step.completed)
    .map((step) => `- ${step.id ?? `position ${step.position}`} (${step.type})`)
    .join('\n');

  const tasks = fetched.pendingTasks
    .map((task) => `- ${task.type}: ${task.description}`)
    .join('\n');

  return [
    '<conversation_metadata>',
    `campaign: ${fetched.campaignName ?? fetched.campaignId ?? 'unknown'}`,
    `channel: ${fetched.conversation.channel}`,
    `meaningful turns: ${fetched.conversation.meaningfulTurnCount}`,
    `context truncated: ${truncated ? 'yes' : 'no'}`,
    '</conversation_metadata>',
    '',
    '<upcoming_sequence_steps>',
    upcoming || '(none)',
    '</upcoming_sequence_steps>',
    '',
    '<pending_manual_tasks>',
    tasks || '(none)',
    '</pending_manual_tasks>',
    '',
    '<untrusted_data source="conversation">',
    conversationText,
    '</untrusted_data>',
  ].join('\n');
}

export { safeTransition };
