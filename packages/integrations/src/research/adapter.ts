/**
 * Company research.
 *
 * Every fetched page is untrusted input. This adapter's job is to retrieve
 * pages, record exactly what was read and when, and flag anything that looks
 * like an instruction aimed at an automated reader. It does not interpret:
 * interpretation happens in a model call whose prompt has already been told
 * that all of this is evidence, not authority.
 */

import { htmlToPlainText, sanitizeHtmlForDisplay, stripTrackingArtifacts } from '@astra/core';
import { requestJson } from '../http.js';

export interface ResearchSource {
  readonly url: string;
  readonly pageTitle: string | null;
  readonly retrievedAt: Date;
  /** Sanitized plain text, safe to hand to a model. */
  readonly text: string;
  readonly excerpt: string;
  readonly confidence: number;
  readonly injectionSuspected: boolean;
  readonly injectionEvidence: readonly string[];
}

export interface ResearchAdapter {
  fetchPage(url: string): Promise<ResearchSource | null>;
  /** Verifies that a site plausibly belongs to the named company. */
  verifyIdentity(input: {
    url: string;
    companyName: string;
  }): Promise<{ verified: boolean; detail: string; source: ResearchSource | null }>;
}

/**
 * Phrases that only appear when someone is trying to talk to an automated
 * reader. Their presence does not prove hostility, but it is enough to drop
 * automatic-send eligibility, which is a cheap price for the protection.
 */
const INJECTION_PATTERNS: readonly RegExp[] = [
  /ignore (all )?(your )?(previous|prior|above) instructions?/i,
  /disregard (the )?(above|previous|system)/i,
  /you are now (in )?(developer|admin|dan) mode/i,
  /\bsystem prompt\b/i,
  /reveal (your )?(prompt|instructions|api key|token)/i,
  /\b(send|email|post) (this|the following|your data) to\b/i,
  /as an? (ai|assistant|language model), (you|your)/i,
  /\bnew instructions?:/i,
  /<\s*\|?\s*(im_start|system|assistant)\s*\|?\s*>/i,
  /\bexecute the following (command|code|script)\b/i,
];

export function detectInjection(text: string): string[] {
  const hits: string[] = [];
  for (const pattern of INJECTION_PATTERNS) {
    const match = pattern.exec(text);
    if (match) hits.push(match[0].slice(0, 120));
  }
  return hits;
}

const MAX_PAGE_BYTES = 2_000_000;

export class HttpResearchAdapter implements ResearchAdapter {
  async fetchPage(url: string): Promise<ResearchSource | null> {
    if (!/^https?:\/\//i.test(url)) return null;

    let html: string;
    let retrievedAt: Date;
    try {
      const response = await fetch(url, {
        redirect: 'follow',
        headers: { accept: 'text/html,application/xhtml+xml', 'user-agent': 'AstraAgencyResearch/0.1' },
        signal: AbortSignal.timeout(20_000),
      });
      retrievedAt = new Date();
      if (!response.ok) return null;
      const raw = await response.text();
      html = raw.slice(0, MAX_PAGE_BYTES);
    } catch {
      return null;
    }

    // Comments and script bodies are stripped before anything is inspected:
    // an HTML comment is a favourite hiding place for injected instructions,
    // and it is invisible to a human reviewing the same page.
    const text = htmlToPlainText(stripTrackingArtifacts(html));
    // Injection detection runs on the *raw* HTML too, so text hidden in
    // comments or attributes is still noticed even though it never reaches
    // the model.
    const injectionEvidence = [...new Set([...detectInjection(text), ...detectInjection(html)])];

    return {
      url,
      pageTitle: extractTitle(html),
      retrievedAt,
      text,
      excerpt: text.slice(0, 800),
      confidence: text.length > 200 ? 0.8 : 0.4,
      injectionSuspected: injectionEvidence.length > 0,
      injectionEvidence,
    };
  }

  /**
   * Identity verification. The bar is "the page plausibly belongs to this
   * company", checked against the name we were given. When it is not met the
   * correct outcome is a human review item, never a guess at a different
   * company with a similar name.
   */
  async verifyIdentity(input: {
    url: string;
    companyName: string;
  }): Promise<{ verified: boolean; detail: string; source: ResearchSource | null }> {
    const source = await this.fetchPage(input.url);
    if (!source) {
      return { verified: false, detail: `Could not retrieve ${input.url}`, source: null };
    }
    if (source.injectionSuspected) {
      return {
        verified: false,
        detail: 'The page contains instruction-like content aimed at an automated reader.',
        source,
      };
    }

    const haystack = `${source.pageTitle ?? ''} ${source.text}`.toLowerCase();
    const needle = input.companyName.toLowerCase().trim();
    const tokens = needle.split(/\s+/).filter((token) => token.length > 2);
    const matched = tokens.filter((token) => haystack.includes(token));

    const verified = tokens.length > 0 && matched.length / tokens.length >= 0.6;
    return {
      verified,
      detail: verified
        ? `Matched ${matched.length}/${tokens.length} company name tokens on the page.`
        : `Only matched ${matched.length}/${tokens.length} company name tokens; identity is ambiguous.`,
      source,
    };
  }
}

/** Fixture research for TEST mode and tests. */
export class FakeResearchAdapter implements ResearchAdapter {
  readonly pages = new Map<string, ResearchSource>();
  readonly requested: string[] = [];

  addPage(url: string, html: string, overrides: Partial<ResearchSource> = {}): void {
    const text = htmlToPlainText(html);
    const injectionEvidence = [...new Set([...detectInjection(text), ...detectInjection(html)])];
    this.pages.set(url, {
      url,
      pageTitle: extractTitle(html),
      retrievedAt: new Date(),
      text,
      excerpt: text.slice(0, 800),
      confidence: 0.9,
      injectionSuspected: injectionEvidence.length > 0,
      injectionEvidence,
      ...overrides,
    });
  }

  async fetchPage(url: string): Promise<ResearchSource | null> {
    this.requested.push(url);
    return this.pages.get(url) ?? null;
  }

  async verifyIdentity(input: {
    url: string;
    companyName: string;
  }): Promise<{ verified: boolean; detail: string; source: ResearchSource | null }> {
    const source = await this.fetchPage(input.url);
    if (!source) return { verified: false, detail: 'page not in fixtures', source: null };
    if (source.injectionSuspected) {
      return { verified: false, detail: 'injection suspected', source };
    }
    const verified = source.text.toLowerCase().includes(input.companyName.toLowerCase());
    return {
      verified,
      detail: verified ? 'company name found on the page' : 'company name not found',
      source,
    };
  }
}

function extractTitle(html: string): string | null {
  const match = /<title[^>]*>([\s\S]{0,300}?)<\/title>/i.exec(html);
  return match?.[1] ? htmlToPlainText(match[1]).trim() || null : null;
}

export { sanitizeHtmlForDisplay, requestJson };
