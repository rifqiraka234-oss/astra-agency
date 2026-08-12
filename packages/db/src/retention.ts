import { query, type Sql } from './client.js';

/**
 * Retention.
 *
 * The rule this implements: keep the record of *what was decided and why*
 * indefinitely, and drop the prospect's personal content once it is no longer
 * needed to make or defend a decision.
 *
 * So message bodies and raw webhook payloads age out, while decisions,
 * predicates, reason codes, state transitions, ownership history and content
 * *hashes* stay. An audit six months later can still answer "why did you send
 * that, and was it approved" without the system holding a copy of someone's
 * inbox forever.
 *
 * Nothing is hard deleted. Rows remain, with their personal fields nulled and
 * a marker set, so a gap is visibly a redaction rather than a missing record.
 */

export interface RetentionPolicy {
  /** Raw webhook payloads. The sanitized projection is kept. */
  readonly rawWebhookDays: number;
  /** Message bodies on conversations with no activity for this long. */
  readonly conversationContentDays: number;
  /** Message bodies for suppressed contacts, counted from suppression. */
  readonly suppressedContentDays: number;
}

export const DEFAULT_RETENTION: RetentionPolicy = {
  rawWebhookDays: 90,
  conversationContentDays: 365,
  // Someone who asked never to be contacted again should not have their
  // messages sitting in our database a year later.
  suppressedContentDays: 30,
};

export interface RetentionReport {
  readonly rawPayloadsRedacted: number;
  readonly messageBodiesRedacted: number;
  readonly suppressedBodiesRedacted: number;
  readonly dryRun: boolean;
  readonly ranAt: string;
}

export async function applyRetention(
  sql: Sql,
  policy: RetentionPolicy = DEFAULT_RETENTION,
  options: { dryRun?: boolean } = {},
): Promise<RetentionReport> {
  const dryRun = options.dryRun ?? false;

  const rawPayloads = dryRun
    ? await countRows(
        sql,
        `SELECT count(*)::int AS n FROM webhook_events
         WHERE received_at < now() - ($1 || ' days')::interval
           AND raw_payload <> '"[redacted by retention]"'::jsonb`,
        [policy.rawWebhookDays],
      )
    : (
        await query<{ id: string }>(
          sql,
          `UPDATE webhook_events
           SET raw_payload = '"[redacted by retention]"'::jsonb
           WHERE received_at < now() - ($1 || ' days')::interval
             AND raw_payload <> '"[redacted by retention]"'::jsonb
           RETURNING id`,
          [policy.rawWebhookDays],
        )
      ).length;

  const messageBodies = dryRun
    ? await countRows(
        sql,
        `SELECT count(*)::int AS n FROM messages m
         JOIN conversations c ON c.id = m.conversation_id
         WHERE c.updated_at < now() - ($1 || ' days')::interval
           AND (m.body_text <> '' OR m.body_html_sanitized IS NOT NULL)`,
        [policy.conversationContentDays],
      )
    : await redactMessageBodies(
        sql,
        `c.updated_at < now() - ($1 || ' days')::interval`,
        [policy.conversationContentDays],
      );

  const suppressedBodies = dryRun
    ? await countRows(
        sql,
        `SELECT count(*)::int AS n FROM messages m
         JOIN conversations c ON c.id = m.conversation_id
         JOIN contacts ct ON ct.id = c.contact_id
         WHERE ct.is_suppressed AND ct.suppressed_at < now() - ($1 || ' days')::interval
           AND (m.body_text <> '' OR m.body_html_sanitized IS NOT NULL)`,
        [policy.suppressedContentDays],
      )
    : await redactMessageBodies(
        sql,
        `EXISTS (
           SELECT 1 FROM contacts ct
           WHERE ct.id = c.contact_id
             AND ct.is_suppressed
             AND ct.suppressed_at < now() - ($1 || ' days')::interval
         )`,
        [policy.suppressedContentDays],
      );

  return {
    rawPayloadsRedacted: rawPayloads,
    messageBodiesRedacted: messageBodies,
    suppressedBodiesRedacted: suppressedBodies,
    dryRun,
    ranAt: new Date().toISOString(),
  };
}

/**
 * Blank the body while keeping everything the audit trail needs: the activity
 * id, timestamps, direction, channel and the conversation hash that was
 * computed from the original text.
 */
async function redactMessageBodies(
  sql: Sql,
  predicate: string,
  params: readonly unknown[],
): Promise<number> {
  const rows = await query<{ id: string }>(
    sql,
    `UPDATE messages m
     SET body_text = '', body_html_sanitized = NULL, subject = NULL
     FROM conversations c
     WHERE c.id = m.conversation_id
       AND ${predicate}
       AND (m.body_text <> '' OR m.body_html_sanitized IS NOT NULL)
     RETURNING m.id`,
    params,
  );
  return rows.length;
}

async function countRows(sql: Sql, text: string, params: readonly unknown[]): Promise<number> {
  const rows = await query<{ n: number }>(sql, text, params);
  return rows[0]?.n ?? 0;
}
