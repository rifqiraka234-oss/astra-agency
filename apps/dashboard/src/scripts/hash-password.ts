import { createInterface } from 'node:readline/promises';
import { hashPassword } from '../lib/auth';

/**
 * Generates the value for OPERATOR_PASSWORD_HASH.
 *
 * The password is read from stdin rather than argv so it does not end up in
 * the shell history or in the process list.
 */
const rl = createInterface({ input: process.stdin, output: process.stdout });
const password = await rl.question('Operator password: ');
rl.close();

if (password.length < 12) {
  console.error('Use at least 12 characters.');
  process.exit(1);
}

console.log('\nAdd this line to .env:\n');
console.log(`OPERATOR_PASSWORD_HASH=${hashPassword(password)}`);
