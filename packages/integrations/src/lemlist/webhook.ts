import { z } from 'zod';
import { secureCompare, sha256Hex, stableStringify } from '@astra/core';

/**
 * Lemlist webhook parsing and verification.
 *
 * Verified against https://developer.lemlist.com/api-reference/endpoints/webhooks/add-webhook
 * on 2026-08-11. The documented behaviour this relies on:
 *   - the optional shared secret is delivered as a `secret` field in the body
 *     of every webhook call, not as a header signature;
 *   - `_id` identifies the activity and is the natural idempotency key;
 *   - a webhook may be configured for all events or one `type`.
 *
 * Because the secret arrives in the body rather than as an HMAC over it, the
 * secret proves the *sender*, not the integrity of the payload. Every field
 * that matters is therefore refetched from the API before it is acted on.
 */

/** Parsed permissively: unknown fields are preserved in the raw payload store. */
export const lemlistWebhookSchema = z
  .object({
    _id: z.string().min(1).optional(),
    type: z.string().min(1),
    secret: z.string().optional(),
    teamId: z.string().optional(),
    campaignId: z.string().optional(),
    campaignName: z.string().optional(),
    leadId: z.string().optional(),
    leadEmail: z.string().optional(),
    leadFirstName: z.string().optional(),
    leadLastName: z.string().optional(),
    leadCompanyName: z.string().optional(),
    contactId: z.string().optional(),
    sequenceId: z.string().optional(),
    stepId: z.string().optional(),
    sequenceStep: z.number().optional(),
    sendUserId: z.string().optional(),
    sendUserEmail: z.string().optional(),
    subject: z.string().optional(),
    text: z.string().optional(),
    message: z.string().optional(),
    createdAt: z.string().optional(),
    date: z.string().optional(),
    /**
     * Present on emailsReplied when the reply came from someone other than the
     * lead. Such events may carry no lead or campaign identifiers at all.
     */
    isThirdPartyReply: z.boolean().optional(),
    isFirst: z.boolean().optional(),
  })
  .passthrough();

export type LemlistWebhookPayload = z.infer<typeof lemlistWebhookSchema>;

/** Event types this system subscribes to and acts on. */
export const HANDLED_EVENT_TYPES = new Set([
  'linkedinInviteAccepted',
  'linkedinReplied',
  'emailsReplied',
  'emailsUnsubscribed',
  'emailsFailed',
  'emailsBounced',
]);

export const SUPPRESSION_EVENT_TYPES = new Set([
  'emailsUnsubscribed',
  'emailsFailed',
  'emailsBounced',
]);

export type WebhookRejectionReason =
  | 'MALFORMED_PAYLOAD'
  | 'SECRET_MISSING'
  | 'SECRET_MISMATCH'
  | 'TEAM_MISMATCH'
  | 'PAYLOAD_TOO_LARGE';

export type WebhookVerification =
  | {
      readonly ok: true;
      readonly payload: LemlistWebhookPayload;
      readonly idempotencyKey: string;
      readonly handled: boolean;
      readonly isSuppression: boolean;
      readonly isThirdPartyReply: boolean;
    }
  | { readonly ok: false; readonly reason: WebhookRejectionReason; readonly detail: string };

export interface VerifyOptions {
  readonly expectedSecret: string;
  readonly expectedTeamId: string;
  readonly maxBodyBytes: number;
}

/**
 * Verify and classify an inbound webhook body.
 *
 * Order matters: size, then shape, then secret, then team. The secret is
 * compared in constant time and never appears in the returned value, so it
 * cannot leak into a log line built from this result.
 */
export function verifyWebhook(
  rawBody: string,
  options: VerifyOptions,
): WebhookVerification {
  if (Buffer.byteLength(rawBody, 'utf8') > options.maxBodyBytes) {
    return {
      ok: false,
      reason: 'PAYLOAD_TOO_LARGE',
      detail: `Body exceeds ${options.maxBodyBytes} bytes.`,
    };
  }

  let parsedJson: unknown;
  try {
    parsedJson = JSON.parse(rawBody);
  } catch {
    return { ok: false, reason: 'MALFORMED_PAYLOAD', detail: 'Body is not valid JSON.' };
  }

  const parsed = lemlistWebhookSchema.safeParse(parsedJson);
  if (!parsed.success) {
    return {
      ok: false,
      reason: 'MALFORMED_PAYLOAD',
      detail: parsed.error.issues.map((issue) => `${issue.path.join('.')}: ${issue.message}`).join('; '),
    };
  }

  const payload = parsed.data;

  if (typeof payload.secret !== 'string' || payload.secret.length === 0) {
    return { ok: false, reason: 'SECRET_MISSING', detail: 'No shared secret in the payload.' };
  }
  if (!secureCompare(payload.secret, options.expectedSecret)) {
    return { ok: false, reason: 'SECRET_MISMATCH', detail: 'Shared secret does not match.' };
  }
  if (payload.teamId !== undefined && payload.teamId !== options.expectedTeamId) {
    return {
      ok: false,
      reason: 'TEAM_MISMATCH',
      detail: `Payload teamId does not match EXPECTED_LEMLIST_TEAM_ID.`,
    };
  }

  // The secret is dropped here and never travels further. Everything
  // downstream stores, logs or renders this payload, and a secret that is not
  // in the object cannot leak from any of those places.
  const { secret: _verifiedSecret, ...payloadWithoutSecret } = payload;

  return {
    ok: true,
    payload: payloadWithoutSecret,
    idempotencyKey: webhookIdempotencyKey(payload),
    handled: HANDLED_EVENT_TYPES.has(payload.type),
    isSuppression: SUPPRESSION_EVENT_TYPES.has(payload.type),
    isThirdPartyReply: payload.isThirdPartyReply === true,
  };
}

/**
 * `_id` is the primary key when Lemlist supplies it. When it does not, a hash
 * of the payload with the secret removed is used, so a genuine redelivery
 * still collapses while two distinct events stay distinct.
 */
export function webhookIdempotencyKey(payload: LemlistWebhookPayload): string {
  if (typeof payload._id === 'string' && payload._id.length > 0) return payload._id;
  const { secret: _secret, ...withoutSecret } = payload;
  return `derived:${sha256Hex(stableStringify(withoutSecret))}`;
}

/**
 * The projection safe for ordinary dashboard display: identifiers and
 * metadata, no secret, no message body. The full payload stays in the
 * access-controlled raw column.
 */
export function sanitizeWebhookPayload(payload: LemlistWebhookPayload): Record<string, unknown> {
  return {
    activityId: payload._id ?? null,
    type: payload.type,
    teamId: payload.teamId ?? null,
    campaignId: payload.campaignId ?? null,
    campaignName: payload.campaignName ?? null,
    leadId: payload.leadId ?? null,
    contactId: payload.contactId ?? null,
    sequenceId: payload.sequenceId ?? null,
    stepId: payload.stepId ?? null,
    sequenceStep: payload.sequenceStep ?? null,
    subject: payload.subject ?? null,
    isThirdPartyReply: payload.isThirdPartyReply ?? false,
    occurredAt: payload.createdAt ?? payload.date ?? null,
    hasBody: Boolean(payload.text ?? payload.message),
  };
}
