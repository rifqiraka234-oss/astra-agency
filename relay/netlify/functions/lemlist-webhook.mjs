import { getStore } from '@netlify/blobs';
import { RelayError, DEBOUNCE_SECONDS, handleWebhook } from '../../lib/handler.mjs';

/**
 * Netlify entry point. All the deciding happens in `lib/handler.mjs`; this
 * file only supplies the request, a clock and a key value store, then performs
 * the outbound fire.
 *
 * Lemlist expects a fast answer and retries non 2xx responses, so anything
 * that is understood returns 200 even when it deliberately does nothing.
 */

function blobStore() {
  const store = getStore('astra-reply-relay');
  return {
    async get(key) {
      const value = await store.get(key);
      return value === null || value === undefined ? null : Number(value);
    },
    async set(key, value) {
      await store.set(key, String(value));
    },
  };
}

export default async function handler(request) {
  let decision;
  try {
    decision = await handleWebhook({
      method: request.method,
      rawBody: await request.text(),
      env: process.env,
      store: blobStore(),
      now: Date.now(),
    });
  } catch (error) {
    if (error instanceof RelayError) {
      // Codes only. A verbose body would help someone probing the endpoint.
      console.warn(JSON.stringify({ msg: 'relay_rejected', code: error.code }));
      return Response.json({ error: error.code }, { status: error.status });
    }
    console.error(JSON.stringify({ msg: 'relay_error', error: String(error) }));
    return Response.json({ error: 'internal' }, { status: 500 });
  }

  if (!decision.fired) {
    console.log(JSON.stringify({ msg: 'relay_ignored', reason: decision.reason, type: decision.type }));
    return Response.json({ ok: true, fired: false, reason: decision.reason });
  }

  // The debounce is written *before* firing. If the fire then fails, the
  // contact stays suppressed for the window rather than retrying in a loop;
  // the hourly safety-net schedule still picks the reply up.
  try {
    await blobStore().set(decision.key, Date.now());
  } catch (error) {
    console.warn(JSON.stringify({ msg: 'relay_debounce_write_failed', error: String(error) }));
  }

  const response = await fetch(decision.fire.url, {
    method: 'POST',
    headers: decision.fire.headers,
    body: decision.fire.body,
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => '');
    console.error(
      JSON.stringify({ msg: 'routine_fire_failed', status: response.status, detail: detail.slice(0, 300) }),
    );
    // 200 back to Lemlist regardless: a retry would re-fire a routine that may
    // in fact have started, and duplicate sessions are the thing to avoid.
    return Response.json({ ok: false, fired: false, reason: 'fire_failed' });
  }

  const result = await response.json().catch(() => ({}));
  console.log(
    JSON.stringify({
      msg: 'routine_fired',
      type: decision.type,
      key: decision.key,
      sessionId: result.claude_code_session_id ?? null,
      debounceSeconds: DEBOUNCE_SECONDS,
    }),
  );
  return Response.json({ ok: true, fired: true });
}

export const config = { path: '/lemlist-webhook' };
