import { createServer, type IncomingMessage, type ServerResponse } from 'node:http';
import {
  claimDueJobs,
  closePool,
  expireStaleReservations,
  finishJob,
  getPool,
  recordDeadLetter,
} from '@astra/db';
import { buildContext, type AppContext } from './context.js';
import { handleLemlistWebhook } from './routes/webhook.js';
import { processConversation } from './pipeline/process-conversation.js';
import { METRIC_NAMES, increment, renderPrometheus } from './metrics.js';

/**
 * The worker process.
 *
 * One process runs both the webhook receiver and the job loop, because they
 * share a database and the receiver's only job is to be fast. Long work
 * (prototype builds) runs here rather than in a serverless function, which is
 * why the Dockerfile targets a normal long-running host.
 */

const MAX_JOB_ATTEMPTS = 4;

let shuttingDown = false;
let inFlight = 0;

async function main(): Promise<void> {
  const context = buildContext();
  const { config, logger } = context;

  logger.info('starting worker', {
    mode: config.RUNTIME_MODE,
    killSwitch: config.isKillSwitchOn,
    liveSend: config.ALLOW_LIVE_LEMLIST_SEND,
    liveCalendar: config.ALLOW_LIVE_CALENDAR_WRITE,
    liveDeploy: config.ALLOW_LIVE_NETLIFY_DEPLOY,
    enabledCampaigns: [...config.enabledCampaignIds],
  });

  if (config.isKillSwitchOn) {
    logger.warn('GLOBAL_KILL_SWITCH is on: every external write will be blocked');
  }

  const server = createServer((request, response) => {
    void route(context, request, response);
  });

  server.listen(config.WORKER_PORT, () => {
    logger.info('listening', { port: config.WORKER_PORT });
  });

  const loop = startJobLoop(context);

  const shutdown = async (signal: string): Promise<void> => {
    if (shuttingDown) return;
    shuttingDown = true;
    logger.info('shutting down', { signal, inFlight });

    server.close();
    clearInterval(loop);

    // Let in-flight jobs finish rather than orphaning a half-completed send.
    const deadline = Date.now() + 30_000;
    while (inFlight > 0 && Date.now() < deadline) {
      await new Promise((resolve) => setTimeout(resolve, 200));
    }

    await closePool();
    logger.info('shutdown complete', { inFlight });
    process.exit(0);
  };

  process.on('SIGTERM', () => void shutdown('SIGTERM'));
  process.on('SIGINT', () => void shutdown('SIGINT'));
  process.on('unhandledRejection', (reason) => {
    logger.error('unhandled rejection', { error: reason });
  });
}

async function route(
  context: AppContext,
  request: IncomingMessage,
  response: ServerResponse,
): Promise<void> {
  const url = new URL(request.url ?? '/', `http://${request.headers.host ?? 'localhost'}`);

  // Liveness: the process is up. Readiness: it can reach its database.
  if (url.pathname === '/healthz') {
    return json(response, 200, { ok: true, mode: context.config.RUNTIME_MODE });
  }

  if (url.pathname === '/readyz') {
    try {
      await getPool().query('SELECT 1');
      return json(response, shuttingDown ? 503 : 200, {
        ok: !shuttingDown,
        database: 'ok',
        shuttingDown,
      });
    } catch (error) {
      return json(response, 503, {
        ok: false,
        database: 'unreachable',
        detail: error instanceof Error ? error.message : String(error),
      });
    }
  }

  if (url.pathname === '/metrics') {
    const body = renderPrometheus();
    response.writeHead(200, { 'content-type': 'text/plain; version=0.0.4' });
    response.end(body);
    return;
  }

  if (url.pathname === '/webhooks/lemlist') {
    return handleLemlistWebhook(context, request, response);
  }

  return json(response, 404, { error: 'not found' });
}

function startJobLoop(context: AppContext): NodeJS.Timeout {
  const tick = async (): Promise<void> => {
    if (shuttingDown) return;
    const pool = getPool();

    try {
      // Housekeeping first: an expired hold must not keep a slot off the
      // market forever.
      await expireStaleReservations(pool, new Date());

      const jobs = await claimDueJobs(pool, new Date(), 5);
      for (const job of jobs) {
        inFlight += 1;
        try {
          const contact = await pool.query<{ lemlist_contact_id: string }>(
            'SELECT lemlist_contact_id FROM contacts WHERE id = $1',
            [job.contact_id],
          );
          const lemlistContactId = contact.rows[0]?.lemlist_contact_id;
          if (!lemlistContactId) {
            await finishJob(pool, job.id, 'CANCELLED', 'contact row disappeared');
            continue;
          }

          const latest = await pool.query<{
            event_type: string;
            lemlist_lead_id: string | null;
            lemlist_campaign_id: string | null;
            is_third_party_reply: boolean;
          }>(
            `SELECT event_type, lemlist_lead_id, lemlist_campaign_id, is_third_party_reply
             FROM webhook_events
             WHERE lemlist_contact_id = $1
             ORDER BY received_at DESC LIMIT 1`,
            [lemlistContactId],
          );
          const event = latest.rows[0];

          const result = await processConversation(context, {
            jobId: job.id,
            contactId: job.contact_id,
            lemlistContactId,
            jobType: job.job_type,
            correlationId: job.correlation_id,
            webhookLeadId: event?.lemlist_lead_id ?? null,
            webhookCampaignId: event?.lemlist_campaign_id ?? null,
            isThirdPartyReply: event?.is_third_party_reply ?? false,
            wasAcceptanceEvent: event?.event_type === 'linkedinInviteAccepted',
          });

          await finishJob(
            pool,
            job.id,
            result.action === 'SKIPPED_LOCKED' ? 'CANCELLED' : 'SUCCEEDED',
          );
        } catch (error) {
          const detail = error instanceof Error ? error.message : String(error);
          const attempts = await pool.query<{ attempts: number }>(
            'SELECT attempts FROM processing_jobs WHERE id = $1',
            [job.id],
          );
          const attemptCount = attempts.rows[0]?.attempts ?? MAX_JOB_ATTEMPTS;

          if (attemptCount >= MAX_JOB_ATTEMPTS) {
            await finishJob(pool, job.id, 'FAILED', detail);
            await recordDeadLetter(pool, {
              source: 'processing_job',
              payload: { jobId: job.id, contactId: job.contact_id },
              errorDetail: detail,
              attempts: attemptCount,
              correlationId: job.correlation_id,
            });
            increment(METRIC_NAMES.deadLetters, { source: 'processing_job' });
            context.logger.error('job dead-lettered', { jobId: job.id, error });
          } else {
            // Reschedule with backoff rather than hammering a failing provider.
            const delaySeconds = Math.min(300, 2 ** attemptCount * 15);
            await pool.query(
              `UPDATE processing_jobs
               SET status = 'SCHEDULED', process_after = now() + ($2 || ' seconds')::interval, last_error = $3
               WHERE id = $1`,
              [job.id, delaySeconds, detail],
            );
            context.logger.warn('job failed, rescheduled', {
              jobId: job.id,
              attemptCount,
              delaySeconds,
              error,
            });
          }
        } finally {
          inFlight -= 1;
        }
      }
    } catch (error) {
      context.logger.error('job loop tick failed', { error });
    }
  };

  void tick();
  return setInterval(() => void tick(), 5_000);
}

function json(response: ServerResponse, status: number, body: unknown): void {
  const payload = JSON.stringify(body);
  response.writeHead(status, {
    'content-type': 'application/json',
    'content-length': Buffer.byteLength(payload),
    'cache-control': 'no-store',
  });
  response.end(payload);
}

await main();
