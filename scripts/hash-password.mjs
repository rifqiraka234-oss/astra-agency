#!/usr/bin/env node
import { hashPassword, MIN_PASSWORD_LENGTH } from './lib/password.mjs';
import { createPrompter } from './lib/prompt.mjs';

/**
 * Prints the value for OPERATOR_PASSWORD_HASH.
 *
 * Most people want `npm run setup`, which writes the hash into .env directly.
 * This exists for rotating the password afterwards, or for generating a hash
 * on a machine that is not the one running the app.
 *
 * The password is read from stdin rather than argv so it does not end up in
 * shell history or in the process list.
 */
const prompter = createPrompter();
const password = await prompter.ask('Operator password: ');
prompter.close();

if (password === null || password.length < MIN_PASSWORD_LENGTH) {
  console.error(`Use at least ${MIN_PASSWORD_LENGTH} characters.`);
  process.exit(1);
}

console.log('\nReplace this line in .env:\n');
console.log(`OPERATOR_PASSWORD_HASH=${hashPassword(password)}`);
