#!/usr/bin/env node
import { LOW_RISK_CASE_SPECS, INTENT_TO_CASE } from '../../packages/core/src/policy/engine.ts';

/**
 * The second half of the deterministic gate: does this reply's intent even
 * belong on the seven-case allowlist at all.
 *
 * This is the *only* place "low risk" is decided. It reuses the exact
 * `INTENT_TO_CASE` / `LOW_RISK_CASE_SPECS` tables the retired worker app used
 * and tested — not a re-derived copy — so the allowlist cannot drift between
 * what was reviewed once and what a scheduled session actually enforces.
 *
 * The session classifies intent itself (it is good at reading "thanks, not
 * right now" vs "how much does this cost"); this script only answers the
 * mechanical question of whether that classification is even eligible for
 * automatic sending, and if so, the word cap and URL policy that apply.
 *
 * Usage: echo '{"intent":"SIMPLE_ACKNOWLEDGEMENT"}' | npx tsx scripts/reply-agent/classify-low-risk.mjs
 *
 * An intent not on the map returns isLowRisk:false — anything unrecognized
 * always requires a human draft, never a guess.
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
  console.error(JSON.stringify({ isLowRisk: false, error: 'INVALID_JSON_INPUT' }));
  process.exit(1);
}

const intent = typeof input.intent === 'string' ? input.intent : null;
const mappedCase = intent === null ? undefined : INTENT_TO_CASE[intent];

if (mappedCase === undefined) {
  console.log(JSON.stringify({ isLowRisk: false, case: null, intent }));
  process.exit(0);
}

const spec = LOW_RISK_CASE_SPECS[mappedCase];
console.log(
  JSON.stringify({
    isLowRisk: true,
    case: spec.case,
    intent,
    maxWords: spec.maxWords,
    allowUrls: spec.allowUrls,
  }),
);
process.exit(0);
