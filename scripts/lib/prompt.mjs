import { createInterface } from 'node:readline';

/**
 * Reads answers one line at a time.
 *
 * `readline/promises`'s `question()` never settles once stdin reaches EOF, so
 * a piped or redirected input hangs the process forever instead of failing.
 * An async line iterator reports EOF as `done` instead, which lets the caller
 * say something useful rather than appearing to freeze.
 */
export function createPrompter() {
  const rl = createInterface({ input: process.stdin });
  const lines = rl[Symbol.asyncIterator]();

  return {
    /** Returns the trimmed answer, or null at end of input. */
    async ask(question) {
      process.stdout.write(question);
      const { value, done } = await lines.next();
      if (done === true) {
        process.stdout.write('\n');
        return null;
      }
      process.stdout.write('\n');
      return String(value);
    },
    close() {
      rl.close();
    },
  };
}

/**
 * Asks until the answer validates, then returns it. Gives up at end of input
 * or after a bounded number of attempts, so a non-interactive caller gets an
 * error instead of an infinite loop.
 */
export async function askUntilValid(prompter, { question, validate, invalidMessage, attempts = 5 }) {
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    const answer = await prompter.ask(question);
    if (answer === null) {
      throw new Error(
        'Ran out of input. Run `npm run setup` in a terminal and type the answers, ' +
          'rather than piping them in.',
      );
    }
    if (validate(answer)) return answer;
    console.log(`  ${invalidMessage(answer)}`);
  }
  throw new Error(`No valid answer after ${String(attempts)} attempts.`);
}
