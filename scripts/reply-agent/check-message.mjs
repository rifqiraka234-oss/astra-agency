#!/usr/bin/env node
import { checkOutboundContent } from '../../packages/core/src/text/content-checks.ts';

/**
 * The deterministic gate a scheduled reply-agent session must pass every
 * drafted message through before calling send_message.
 *
 * This is not new logic. It is the exact same tested content checks built for
 * the (now retired) worker app — banned phrases, dash/placeholder/pricing/
 * fake-urgency detection, near-duplicate scanning, unsupported-claim
 * detection — wrapped as a CLI so a Claude Code session can call it directly
 * instead of re-deriving "does this message look safe" from prose rules on
 * every run. Prose rules drift; this cannot, because it is code with tests.
 *
 * Usage (run through tsx, not plain node, because it imports the .ts source
 * directly rather than a compiled dist — the same reason the workspace's own
 * tests resolve @astra/core to src, so a stale build can never pass a check
 * the real source would fail):
 *
 *   echo '{"text":"...", "maxWords":65, "supportedClaimTerms":[...]}' \
 *     | npx tsx scripts/reply-agent/check-message.mjs
 *
 * Exits 0 and prints {"ok":true,...} when the message clears every check.
 * Exits 1 and prints {"ok":false,"violations":[...]} otherwise. The caller
 * must never send a message this script rejected.
 */

function readStdin() {
  return new Promise((resolve, reject) => {
    let data = '';
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', (chunk) => (data += chunk));
    process.stdin.on('end', () => resolve(data));
    process.stdin.on('error', reject);
  });
}

const raw = await readStdin();
let input;
try {
  input = JSON.parse(raw);
} catch {
  console.error(JSON.stringify({ ok: false, violations: [{ code: 'INVALID_JSON_INPUT' }] }));
  process.exit(1);
}

if (typeof input.text !== 'string' || input.text.trim().length === 0) {
  console.log(JSON.stringify({ ok: false, wordCount: 0, violations: [{ code: 'EMPTY_MESSAGE', severity: 'BLOCK' }] }));
  process.exit(1);
}

const result = checkOutboundContent(input.text, {
  maxWords: typeof input.maxWords === 'number' ? input.maxWords : 65,
  allowUrls: input.allowUrls === true,
  allowedUrls: Array.isArray(input.allowedUrls) ? input.allowedUrls : undefined,
  recentOutboundTexts: Array.isArray(input.recentOutboundTexts) ? input.recentOutboundTexts : undefined,
  supportedClaimTerms: Array.isArray(input.supportedClaimTerms) ? input.supportedClaimTerms : undefined,
});

console.log(JSON.stringify(result));
process.exit(result.ok ? 0 : 1);
