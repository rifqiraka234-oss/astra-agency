/**
 * Side effect import for scripts and tests: loads crm/.env.local then crm/.env
 * into process.env (existing variables win). Next.js loads these itself, so the
 * app never needs this. Usage at the top of a script: `import './env';`
 */
import fs from 'node:fs';
import path from 'node:path';

// Scripts and tests run from crm/ (npm run, npx tsx, npx vitest).
const root = process.cwd();
for (const name of ['.env.local', '.env']) {
  const file = path.join(root, name);
  if (!fs.existsSync(file)) continue;
  for (const line of fs.readFileSync(file, 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (!m || line.trim().startsWith('#')) continue;
    const value = m[2].replace(/^['"]|['"]$/g, '');
    if (process.env[m[1]] === undefined) process.env[m[1]] = value;
  }
}
