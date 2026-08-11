import { readFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Versioned runtime prompts.
 *
 * Prompts live in files, not in scattered template literals, for one concrete
 * reason: every model run records the exact prompt version it used. When a
 * decision looks wrong three weeks later, the audit trail has to be able to
 * say which words produced it.
 */

export const PROMPT_NAMES = [
  'conversation-analysis',
  'reply-drafting',
  'sequence-step-classifier',
  'company-research',
  'prototype-strategy',
  'prototype-builder',
  'meeting-intent',
] as const;

export type PromptName = (typeof PROMPT_NAMES)[number];

export interface LoadedPrompt {
  readonly name: PromptName;
  readonly version: string;
  /** `name@version`, stamped onto every model run and approval. */
  readonly versionTag: string;
  readonly schema: string | null;
  readonly body: string;
}

const PROMPTS_DIR = resolvePromptsDir();

function resolvePromptsDir(): string {
  const here = dirname(fileURLToPath(import.meta.url));
  // Works both from src (dev, via tsx) and from dist (built).
  const candidates = [join(here, '..', 'prompts'), join(here, '..', '..', 'prompts')];
  const found = candidates.find((candidate) => existsSync(candidate));
  if (!found) {
    throw new Error(`Could not locate the prompts directory. Tried: ${candidates.join(', ')}`);
  }
  return found;
}

const cache = new Map<PromptName, LoadedPrompt>();

export function loadPrompt(name: PromptName): LoadedPrompt {
  const cached = cache.get(name);
  if (cached) return cached;

  const raw = readFileSync(join(PROMPTS_DIR, `${name}.system.md`), 'utf8');
  const { frontMatter, body } = splitFrontMatter(raw);

  const version = frontMatter['version'];
  if (!version) {
    throw new Error(`Prompt ${name} is missing a version in its front matter`);
  }
  if (frontMatter['name'] !== name) {
    throw new Error(
      `Prompt ${name} declares name "${frontMatter['name']}", which does not match its filename`,
    );
  }

  const loaded: LoadedPrompt = {
    name,
    version,
    versionTag: `${name}@${version}`,
    schema: frontMatter['schema'] ?? null,
    body: expandIncludes(body),
  };
  cache.set(name, loaded);
  return loaded;
}

export function loadAllPrompts(): LoadedPrompt[] {
  return PROMPT_NAMES.map(loadPrompt);
}

/** Resets the in-process cache. Used by tests that edit prompt files. */
export function clearPromptCache(): void {
  cache.clear();
}

const INCLUDE_PATTERN = /\{\{SHARED:([a-z-]+)\}\}/g;

function expandIncludes(body: string): string {
  return body.replace(INCLUDE_PATTERN, (_whole, sharedName: string) => {
    const path = join(PROMPTS_DIR, 'shared', `${sharedName}.md`);
    if (!existsSync(path)) {
      throw new Error(`Prompt include not found: shared/${sharedName}.md`);
    }
    return readFileSync(path, 'utf8').trim();
  });
}

function splitFrontMatter(raw: string): {
  frontMatter: Record<string, string>;
  body: string;
} {
  if (!raw.startsWith('---')) return { frontMatter: {}, body: raw };
  const end = raw.indexOf('\n---', 3);
  if (end === -1) return { frontMatter: {}, body: raw };

  const header = raw.slice(3, end);
  const body = raw.slice(end + 4).trimStart();
  const frontMatter: Record<string, string> = {};

  for (const line of header.split('\n')) {
    const match = /^\s*([A-Za-z_][\w-]*)\s*:\s*(.+?)\s*$/.exec(line);
    if (match?.[1] && match[2]) frontMatter[match[1]] = match[2];
  }
  return { frontMatter, body };
}
