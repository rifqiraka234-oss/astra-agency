import type { IncomingMessage, ServerResponse } from 'node:http';
import { getPool, insertWebhookEvent, recordAudit, scheduleProcessing, upsertContact } from '@astra/db';
import { sanitizeWebhookPayload, verifyWebhook } from '@astra/integrations';
import type { AppContext } from '../context.js';
import { createLogger, newCorrelationId } from '../logger.js';
import { METRIC_NAMES, increment, observe } from '../metrics.js';

/**
 * The webhook endpoint.
 *
 * It does the least work that is still correct: verify, insert durably,
 * schedule, respond. Everything expensive happens later in a worker job,
 * because a webhook sender that times out retries, and a retry storm during
 * an analysis run is how duplicates happen.
 *
 * The debounce is scheduled here rather than in the worker so that a second
 * message arriving during the window pushes the deadline forward even if no
 * worker is currently running.
 */

export async function handleLemlistWebhook(
  context: AppContext,
  request: IncomingMessage,
  response: ServerResponse,
): Promise<void> {
  const started = Date.now();
  const correlationId = newCorrelationId();
  const logger = createLogger(context.config.LOG_LEVEL, { route: 'webhook' }, correlationId);

  if (request.method !== 'POST') {
    return respond(response, 405, { error: 'method not allowed' });
  }

  // HTTPS is required in production. A webhook body carries a shared secret,
  // and a shared secret over plaintext is a shared secret on the wire.
  if (context.config.APP_ENV === 'production' && !isSecure(request)) {
    logger.warn('rejected an insecure webhook request');
    return respond(response, 400, { error: 'https required' });
  }

  let rawBody: string;
  try {
    rawBody = await readBody(request, context.config.WEBHOOK_MAX_BODY_BYTES);
  } catch (error) {
    increment(METRIC_NAMES.webhooksRejected, { reason: 'PAYLOAD_TOO_LARGE' });
    logger.warn('rejected an oversized or unreadable webhook body', {
      detail: error instanceof Error ? error.message : String(error),
    });
    return respond(response, 413, { error: 'payload too large' });
  }

  const verification = verifyWebhook(rawBody, {
    expectedSecret: context.config.LEMLIST_WEBHOOK_SECRET,
    expectedTeamId: context.config.EXPECTED_LEMLIST_TEAM_ID,
    maxBodyBytes: context.config.WEBHOOK_MAX_BODY_BYTES,
  });

  if (!verification.ok) {
    increment(METRIC_NAMES.webhooksRejected, { reason: verification.reason });
    // The detail is logged, the body is not: it failed verification, so we
    // have no reason to believe anything in it is safe to retain.
    logger.warn('rejected a webhook', { reason: verification.reason, detail: verification.detail });
    const status = verification.reason === 'PAYLOAD_TOO_LARGE' ? 413 : 401;
    return respond(response, status, { error: 'rejected' });
  }

  const payload = verification.payload;
  const pool = getPool();

  try {
    const inserted = await insertWebhookEvent(pool, {
      idempotencyKey: verification.idempotencyKey,
      eventType: payload.type,
      teamId: payload.teamId ?? null,
      campaignId: payload.campaignId ?? null,
      leadId: payload.leadId ?? null,
      contactId: payload.contactId ?? null,
      isThirdPartyReply: verification.isThirdPartyReply,
      rawPayload: payload,
      sanitizedPayload: sanitizeWebhookPayload(payload),
    });

    if (inserted.duplicate) {
      increment(METRIC_NAMES.webhooksDuplicate, { type: payload.type });
      logger.info('collapsed a duplicate webhook delivery', {
        idempotencyKey: verification.idempotencyKey,
        type: payload.type,
      });
      // 200, not 409: a duplicate delivery is a success from the sender's
      // point of view, and a non-2xx would make Lemlist retry it forever.
      return respond(response, 200, { ok: true, duplicate: true });
    }

    increment(METRIC_NAMES.webhooksReceived, { type: payload.type });

    if (!verification.handled) {
      // Ingested and auditable, but no work scheduled. Unknown event types
      // must not silently create jobs.
      await recordAudit(pool, {
        actor: 'system:webhook',
        action: 'WEBHOOK_IGNORED',
        reasonCode: 'UNHANDLED_EVENT_TYPE',
        payload: { type: payload.type },
        correlationId,
      });
      return respond(response, 200, { ok: true, handled: false });
    }

    // A third-party reply may carry no contact id at all. There is nothing to
    // key a conversation on, so it is stored and surfaced for a human rather
    // than guessed at.
    if (payload.contactId === undefined) {
      await recordAudit(pool, {
        actor: 'system:webhook',
        action: 'WEBHOOK_NEEDS_HUMAN',
        reasonCode: verification.isThirdPartyReply
          ? 'THIRD_PARTY_PARTICIPANT'
          : 'MISSING_LEAD_OR_CAMPAIGN',
        payload: sanitizeWebhookPayload(payload),
        correlationId,
      });
      logger.info('webhook has no contact id, routed to human review', { type: payload.type });
      return respond(response, 200, { ok: true, needsHuman: true });
    }

    const contact = await upsertContact(pool, {
      lemlistContactId: payload.contactId,
      email: payload.leadEmail ?? null,
      firstName: payload.leadFirstName ?? null,
      lastName: payload.leadLastName ?? null,
      companyName: payload.leadCompanyName ?? null,
    });

    const processAfter = new Date(Date.now() + context.config.INBOUND_DEBOUNCE_SECONDS * 1000);
    const job = await scheduleProcessing(pool, {
      contactId: contact.id,
      processAfter,
      correlationId,
      jobType: verification.isSuppression ? 'SUPPRESS_CONTACT' : 'ANALYZE_CONVERSATION',
    });

    logger.info('accepted webhook', {
      type: payload.type,
      contactId: payload.contactId,
      processAfter: job.processAfter.toISOString(),
    });

    observe('astra_webhook_latency_ms', Date.now() - started);
    return respond(response, 202, { ok: true, processAfter: job.processAfter.toISOString() });
  } catch (error) {
    increment(METRIC_NAMES.integrationErrors, { integration: 'database' });
    logger.error('failed to durably record a webhook', { error });
    // 500 so Lemlist retries: losing an event silently is worse than
    // processing it twice, which the idempotency key already handles.
    return respond(response, 500, { error: 'internal error' });
  }
}

function isSecure(request: IncomingMessage): boolean {
  const proto = request.headers['x-forwarded-proto'];
  const value = Array.isArray(proto) ? proto[0] : proto;
  return value === undefined || value === 'https';
}

export async function readBody(request: IncomingMessage, maxBytes: number): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    let size = 0;

    request.on('data', (chunk: Buffer) => {
      size += chunk.length;
      if (size > maxBytes) {
        // Destroy rather than just rejecting, so a malicious sender cannot
        // keep streaming into a socket we have stopped reading.
        request.destroy();
        reject(new Error(`body exceeded ${maxBytes} bytes`));
        return;
      }
      chunks.push(chunk);
    });
    request.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    request.on('error', reject);
  });
}

function respond(response: ServerResponse, status: number, body: unknown): void {
  const payload = JSON.stringify(body);
  response.writeHead(status, {
    'content-type': 'application/json',
    'content-length': Buffer.byteLength(payload),
    'cache-control': 'no-store',
  });
  response.end(payload);
}
