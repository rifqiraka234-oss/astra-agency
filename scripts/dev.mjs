#!/usr/bin/env node
import { spawn, spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

/**
 * Brings up the whole local stack: Postgres, migrations, seed data, the
 * worker and the dashboard.
 *
 * This replaces the previous `dev.sh`, which was bash-only and therefore did
 * not run on Windows at all. Everything here is Node, and every child process
 * is spawned with `shell: true` so `npm` resolves to `npm.cmd` on Windows.
 */

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const isWindows = process.platform === 'win32';

function run(command, { allowFailure = false } = {}) {
  const result = spawnSync(command, { cwd: root, stdio: 'inherit', shell: true });
  if (result.status !== 0 && !allowFailure) {
    process.exit(result.status ?? 1);
  }
  return result.status === 0;
}

function quiet(command) {
  return spawnSync(command, { cwd: root, stdio: 'pipe', shell: true }).status === 0;
}

function fail(message) {
  console.error(`\n${message}\n`);
  process.exit(1);
}

// --- preflight ---------------------------------------------------------------

if (!existsSync(join(root, '.env'))) {
  fail('No .env found. Run this first:\n\n  npm run setup');
}

if (!quiet('docker --version')) {
  fail(
    'Docker is not installed or not on PATH.\n\n' +
      'Install Docker Desktop from https://www.docker.com/products/docker-desktop\n' +
      'then start it and run this again.',
  );
}

if (!quiet('docker info')) {
  fail(
    'Docker is installed but not running.\n\n' +
      (isWindows
        ? 'Start Docker Desktop from the Start menu, wait for it to say "Engine running", then try again.'
        : 'Start Docker, then try again.'),
  );
}

// --- postgres ----------------------------------------------------------------

console.log('==> Starting Postgres');
run('docker compose up -d postgres');

console.log('==> Waiting for Postgres');
const ready = await (async () => {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    if (quiet('docker compose exec -T postgres pg_isready -U astra -d astra_reply_agent')) {
      return true;
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  return false;
})();
if (!ready) fail('Postgres did not become ready within 60 seconds.');

console.log('==> Applying migrations');
run('npm run db:migrate');

console.log('==> Seeding local fixtures');
run('npm run db:seed');

// --- worker and dashboard ----------------------------------------------------

console.log('\n==> Worker on http://localhost:3001');
console.log('==> Dashboard on http://localhost:3000');
console.log('\nSign in with the email and password you gave to `npm run setup`.');
console.log('Press Ctrl+C to stop both.\n');

const children = [
  spawn('npm run dev:worker', { cwd: root, stdio: 'inherit', shell: true }),
  spawn('npm run dev:dashboard', { cwd: root, stdio: 'inherit', shell: true }),
];

let shuttingDown = false;
function shutdown() {
  if (shuttingDown) return;
  shuttingDown = true;
  for (const child of children) {
    // On Windows a plain kill leaves the npm shell's own child running, so the
    // process tree is torn down explicitly.
    if (isWindows && child.pid !== undefined) {
      spawnSync(`taskkill /pid ${child.pid} /T /F`, { stdio: 'ignore', shell: true });
    } else {
      child.kill('SIGTERM');
    }
  }
  process.exit(0);
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
for (const child of children) child.on('exit', shutdown);
