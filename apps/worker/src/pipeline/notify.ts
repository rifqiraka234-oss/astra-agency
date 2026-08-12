import { enqueueNotification, getPool, markNotificationSent } from '@astra/db';
import { NOTIFICATION_SEVERITY, type NotificationKind } from '@astra/integrations';
import type { AppContext } from '../context.js';

/**
 * Operator notification.
 *
 * Two rules make this safe to call from anywhere in the pipeline:
 *
 *  - deduplication and cooldown live in the database, so one failing contact
 *    cannot produce fifty emails;
 *  - the email carries a summary and a dashboard link, never conversation
 *    content, credentials, or a token that could act on its own. Approving
 *    always requires signing in.
 */

export interface NotifyInput {
  readonly conversationId: string | null;
  readonly kind: NotificationKind;
  readonly subject: string;
  readonly body: string;
  readonly dedupeKey: string;
  readonly cooldownMinutes?: number;
}

export async function notifyOperator(context: AppContext, input: NotifyInput): Promise<void> {
  const pool = getPool();
  const severity = NOTIFICATION_SEVERITY[input.kind];

  const dashboardUrl = input.conversationId
    ? `${context.config.APP_BASE_URL}/conversations/${input.conversationId}`
    : `${context.config.APP_BASE_URL}/queue`;

  const queued = await enqueueNotification(pool, {
    conversationId: input.conversationId,
    kind: input.kind,
    severity,
    recipient: context.config.ADMIN_EMAIL,
    subject: input.subject,
    body: input.body,
    dedupeKey: input.dedupeKey,
    cooldownMinutes: input.cooldownMinutes ?? (severity === 'CRITICAL' ? 15 : 60),
  });

  if (queued.suppressed) {
    context.logger.debug('notification suppressed by cooldown', { dedupeKey: input.dedupeKey });
    return;
  }

  const result = await context.notifier.send({
    to: context.config.ADMIN_EMAIL,
    subject: `[Astra ${severity}] ${input.subject}`,
    body: input.body,
    severity,
    dashboardUrl,
  });

  await markNotificationSent(pool, queued.id, result.ok ? 'SENT' : 'FAILED');
  if (!result.ok) {
    context.logger.warn('notification delivery failed', { detail: result.detail });
  }
}
