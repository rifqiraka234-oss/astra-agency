#!/usr/bin/env node
import { randomBytes } from 'node:crypto';
import { existsSync, readFileSync, writeFileSync, copyFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { hashPassword, MIN_PASSWORD_LENGTH } from './lib/password.mjs';
import { askUntilValid, createPrompter } from './lib/prompt.mjs';

/**
 * One-command local setup.
 *
 * Plain Node with no dependencies and no build step, because this has to run
 * on a fresh checkout before anything is installed or compiled, on Windows as
 * readily as on macOS. The previous setup path assumed `openssl` and a bash
 * shell, neither of which a normal Windows machine has.
 *
 * Idempotent: an existing non-empty value is never overwritten, so re-running
 * after a partial setup fills only the gaps.
 */

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const envPath = join(root, '.env');
const examplePath = join(root, '.env.example');

function readEnv() {
  if (!existsSync(envPath)) {
    copyFileSync(examplePath, envPath);
    console.log('Created .env from .env.example.');
  }
  return readFileSync(envPath, 'utf8');
}

/** Current value of a key, or '' when absent or empty. */
function valueOf(text, key) {
  const match = new RegExp(`^${key}=(.*)$`, 'm').exec(text);
  return match?.[1]?.trim() ?? '';
}

/** Sets a key, replacing the existing line if there is one. */
function setValue(text, key, value) {
  const line = `${key}=${value}`;
  const pattern = new RegExp(`^${key}=.*$`, 'm');
  if (pattern.test(text)) return text.replace(pattern, line);
  return `${text.trimEnd()}\n${line}\n`;
}

const base64Key = () => randomBytes(32).toString('base64');

async function main() {
  let text = readEnv();
  const filled = [];
  const kept = [];

  // Secrets. Generated with Node's CSPRNG rather than openssl.
  for (const key of ['ENCRYPTION_KEY', 'SESSION_SECRET']) {
    if (valueOf(text, key) === '') {
      text = setValue(text, key, base64Key());
      filled.push(key);
    } else {
      kept.push(key);
    }
  }

  // Values the config schema requires before the app will start at all.
  // These are local placeholders: TEST mode never contacts Lemlist, and every
  // live flag stays false.
  const localDefaults = {
    EXPECTED_LEMLIST_TEAM_ID: 'tea_local_dev',
    LEMLIST_WEBHOOK_SECRET: randomBytes(24).toString('hex'),
    ENABLED_CAMPAIGN_IDS: 'cam_local_dev',
  };
  for (const [key, value] of Object.entries(localDefaults)) {
    if (valueOf(text, key) === '') {
      text = setValue(text, key, value);
      filled.push(key);
    } else {
      kept.push(key);
    }
  }

  const prompter = createPrompter();
  try {
    if (valueOf(text, 'ADMIN_EMAIL') === '') {
      const email = await askUntilValid(prompter, {
        question: 'Dashboard sign-in email: ',
        validate: (answer) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(answer.trim()),
        invalidMessage: () => 'That is not an email address.',
      });
      text = setValue(text, 'ADMIN_EMAIL', email.trim());
      filled.push('ADMIN_EMAIL');
    } else {
      kept.push('ADMIN_EMAIL');
    }

    if (valueOf(text, 'OPERATOR_PASSWORD_HASH') === '') {
      const password = await askUntilValid(prompter, {
        question: `Dashboard password (min ${String(MIN_PASSWORD_LENGTH)} characters): `,
        validate: (answer) => answer.length >= MIN_PASSWORD_LENGTH,
        invalidMessage: (answer) =>
          `Too short: ${String(answer.length)} of ${String(MIN_PASSWORD_LENGTH)}.`,
      });
      text = setValue(text, 'OPERATOR_PASSWORD_HASH', hashPassword(password));
      filled.push('OPERATOR_PASSWORD_HASH');
    } else {
      kept.push('OPERATOR_PASSWORD_HASH');
    }
  } finally {
    prompter.close();
  }

  writeFileSync(envPath, text);

  console.log('\n.env is ready.');
  if (filled.length > 0) console.log(`  set:  ${filled.join(', ')}`);
  if (kept.length > 0) console.log(`  kept: ${kept.join(', ')} (already had a value)`);
  console.log(
    '\nMode is TEST and the kill switch is on, so nothing here can reach a real prospect.',
  );
  console.log('\nNext: npm run dev');
}

try {
  await main();
} catch (error) {
  console.error(`\nSetup did not finish: ${error instanceof Error ? error.message : String(error)}`);
  process.exit(1);
}
