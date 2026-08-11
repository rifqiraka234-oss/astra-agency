import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

const resolve = (relative: string) => fileURLToPath(new URL(relative, import.meta.url));

export default defineConfig({
  resolve: {
    // Tests run against workspace *source*, not built output. Resolving to
    // dist would let a stale build silently pass a suite that the real code
    // fails, which is the opposite of what these tests are for.
    alias: {
      '@astra/core/testing': resolve('./packages/core/src/testing/factories.ts'),
      '@astra/core': resolve('./packages/core/src/index.ts'),
      '@astra/db': resolve('./packages/db/src/index.ts'),
      '@astra/integrations': resolve('./packages/integrations/src/index.ts'),
      '@astra/prompts': resolve('./packages/prompts/src/index.ts'),
    },
  },
  test: {
    globals: false,
    environment: 'node',
    include: ['packages/**/*.test.ts', 'apps/worker/**/*.test.ts'],
    exclude: ['**/node_modules/**', '**/dist/**', '**/.next/**'],
    setupFiles: ['./vitest.setup.ts'],
    testTimeout: 20_000,
    // Integration tests share one Postgres database and truncate between
    // cases, so they cannot run in parallel with each other.
    fileParallelism: false,
  },
});
