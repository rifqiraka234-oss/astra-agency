import { createHash, timingSafeEqual } from 'node:crypto';

/**
 * Decision logic for the Lemlist to Routine relay.
 *
 * Pure and side effect free so it can be tested without a network or a
 * deployed function. The Netlify entry point supplies the request, a clock and
 * a small key value store; everything that decides *whether* to fire lives
 * here.
 *
 * Why a relay exists at all: Lemlist webhooks can only send a `secret` inside
 * the JSON body. The Routine fire endpoint requires three HTTP headers
 * (`Authorization`, `anthropic-beta`, `anthropic-version`). Lemlist cannot set
 * any of them, so something has to translate one into the other.
 */

/**
 * Lemlist activity types that should wake the reply agent.
 *
 * Deliberately narrow. Every extra type here is a Claude Code session, and
 * sessions cost usage and count against the daily routine cap, so sends,
 * opens, visits and follows are all ignored. Email types are listed because
 * the team may connect a mailbox later; they cost nothing while no email
 * activity exists.
 */
export const FIRING_TYPES = new Set([
  'linkedinReplied',
  'linkedinInviteAccepted',
  'emailsReplied',
]);

/** How long the same contact is suppressed after a fire. */
export const DEBOUNCE_SECONDS = 90;

export class RelayError extends Error {
  constructor(status, code) {
    super(code);
    this.status = status;
    this.code = code;
  }
}

/**
 * Constant time secret comparison. Hashing first means two different lengths
 * do not short circuit and leak a length through timing.
 */
export function secretMatches(provided, expected) {
  if (typeof provided !== 'string' || typeof expected !== 'string') return false;
  if (provided.length === 0 || expected.length === 0) return false;
  const a = createHash('sha256').update(provided).digest();
  const b = createHash('sha256').update(expected).digest();
  return timingSafeEqual(a, b);
}

/**
 * Lemlist's payload shape varies by activity type and has changed before, so
 * the contact identifier is read from several known spellings rather than one.
 * A payload with no identifier at all is still fireable: the agent scans the
 * inbox anyway, and the payload is only ever a hint about where to look.
 */
export function extractContactId(body) {
  const candidates = [body?.contactId, body?.contact?._id, body?.contact?.id, body?.leadId, body?.lead?._id];
  for (const candidate of candidates) {
    if (typeof candidate === 'string' && candidate.length > 0) return candidate;
  }
  return null;
}

/**
 * The `text` sent to the fire endpoint.
 *
 * Kept to identifiers and nothing else. The message body is deliberately NOT
 * forwarded: it is prospect-authored text that would arrive inside the
 * routine's untrusted payload block, and the agent can read the real thread
 * from Lemlist, which is authoritative. Sending less also keeps the payload
 * from becoming a prompt injection surface.
 */
export function buildFireText(body) {
  const contactId = extractContactId(body);
  const parts = [
    'A Lemlist webhook fired.',
    `type=${typeof body?.type === 'string' ? body.type : 'unknown'}`,
    contactId === null ? 'contactId=unknown' : `contactId=${contactId}`,
  ];
  if (typeof body?.campaignId === 'string' && body.campaignId.length > 0) {
    parts.push(`campaignId=${body.campaignId}`);
  }
  return parts.join(' ');
}

/**
 * Debounce key. Falls back to the activity type when no contact can be
 * identified, so an unidentifiable burst still collapses instead of starting
 * one session per event.
 */
export function debounceKey(body) {
  const contactId = extractContactId(body);
  return contactId === null ? `type:${String(body?.type ?? 'unknown')}` : `contact:${contactId}`;
}

/**
 * Decides what to do with one webhook delivery.
 *
 * `store` is `{ get(key), set(key, value, ttlSeconds) }`. Any store failure is
 * treated as "not recently fired": missing a debounce and starting one extra
 * session is a far better failure than dropping a real reply.
 */
export async function handleWebhook({ method, rawBody, env, store, now }) {
  if (method !== 'POST') throw new RelayError(405, 'method_not_allowed');

  const expectedSecret = env.LEMLIST_WEBHOOK_SECRET;
  const fireUrl = env.ROUTINE_FIRE_URL;
  const fireToken = env.ROUTINE_FIRE_TOKEN;
  const beta = env.ROUTINE_BETA_HEADER ?? 'experimental-cc-routine-2026-04-01';

  if (!expectedSecret || !fireUrl || !fireToken) {
    // Misconfiguration must never look like a successful relay.
    throw new RelayError(500, 'relay_not_configured');
  }

  let body;
  try {
    body = JSON.parse(rawBody);
  } catch {
    throw new RelayError(400, 'invalid_json');
  }

  if (!secretMatches(body?.secret, expectedSecret)) {
    throw new RelayError(401, 'bad_secret');
  }

  const type = typeof body?.type === 'string' ? body.type : '';
  if (!FIRING_TYPES.has(type)) {
    // 200 on purpose: the delivery was understood and intentionally ignored.
    // A non 2xx would make Lemlist retry an event we will never want.
    return { status: 200, fired: false, reason: 'type_not_firing', type };
  }

  const key = debounceKey(body);
  let lastFiredAt = null;
  try {
    lastFiredAt = await store.get(key);
  } catch {
    lastFiredAt = null;
  }

  if (typeof lastFiredAt === 'number' && now - lastFiredAt < DEBOUNCE_SECONDS * 1000) {
    return { status: 200, fired: false, reason: 'debounced', type, key };
  }

  return {
    status: 200,
    fired: true,
    type,
    key,
    fire: {
      url: fireUrl,
      headers: {
        authorization: `Bearer ${fireToken}`,
        'anthropic-beta': beta,
        'anthropic-version': env.ROUTINE_API_VERSION ?? '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({ text: buildFireText(body) }),
    },
  };
}
