import { REASON_CODES, type ReasonCode } from '../domain/reason-codes.js';
import { countWords } from './word-count.js';
import { canonicalizeText } from './hash.js';

/**
 * Deterministic checks on outbound message text.
 *
 * These run *after* the model has drafted and *before* anything leaves the
 * process. The model is not consulted about whether its own message is safe:
 * these predicates are recomputed from the text itself every time, including
 * immediately before an approved send.
 */

export type ViolationSeverity = 'BLOCK' | 'WARN';

export interface ContentViolation {
  readonly code: ReasonCode;
  readonly severity: ViolationSeverity;
  readonly detail: string;
  /** The offending fragment, for the dashboard to highlight. */
  readonly evidence?: string;
}

export interface ContentCheckOptions {
  /** Hard word cap for the matched policy case. */
  readonly maxWords: number;
  /** URLs are forbidden unless the policy case explicitly permits them. */
  readonly allowUrls?: boolean;
  /** Exact URLs this message is permitted to contain (approved prototype URL). */
  readonly allowedUrls?: readonly string[];
  /** Recent outbound bodies used for duplicate detection. */
  readonly recentOutboundTexts?: readonly string[];
  /** Claims the evidence table actually supports, lowercased. */
  readonly supportedClaimTerms?: readonly string[];
}

export interface ContentCheckResult {
  readonly ok: boolean;
  readonly wordCount: number;
  readonly violations: readonly ContentViolation[];
}

// --- pattern tables ---------------------------------------------------------

/** Unresolved merge variables. Sending one of these is an instant credibility loss. */
const PLACEHOLDER_PATTERNS: readonly RegExp[] = [
  /\{\{[^}]*\}\}/g,
  /\{[A-Za-z_][A-Za-z0-9_]*\}/g,
  /%[A-Z][A-Z0-9_]{2,}%/g,
  /\[(company|first ?name|last ?name|name|website|city|industry|role|title|x)\]/gi,
  /<(company|first ?name|name|website)>/gi,
  /\b(TBD|TODO|FIXME|LOREM IPSUM|XXX+)\b/g,
];

/** Phrases Raka has explicitly banned from Astra's voice. */
const BANNED_PHRASES: readonly string[] = ['website journey', 'i took a proper look'];

const INFLATED_WORDS: readonly string[] = [
  'revolutionary',
  'game-changing',
  'game changing',
  'world-class',
  'world class',
  'cutting-edge',
  'cutting edge',
  'incredible',
  'amazing',
  'unparalleled',
  'best-in-class',
  'best in class',
];

const GUARANTEE_PATTERNS: readonly RegExp[] = [
  /\bguarantee(d|s)?\b/i,
  /\bwe (will|can) (double|triple|increase|boost|grow)\b/i,
  /\b\d+\s*x\s+(more|your|the)\b/i,
  /\b(more|extra|guaranteed)\s+(traffic|leads|revenue|sales|conversions)\b/i,
  /\brank(ing)?\s+(number\s*1|#1|first)\b/i,
  /\bwill (definitely|certainly|absolutely)\b/i,
];

const FAKE_URGENCY_PATTERNS: readonly RegExp[] = [
  /\blimited (time|spots?|availability)\b/i,
  /\bact (now|fast|today)\b/i,
  /\bonly \d+ (spots?|slots?|places?) (left|remaining)\b/i,
  /\blast chance\b/i,
  /\bexpires? (today|tomorrow|soon|in \d+)\b/i,
  /\bbefore (it'?s )?too late\b/i,
  /\bthis (offer|prototype|sketch) (expires|disappears|goes away)\b/i,
  /\bhurry\b/i,
];

const SOCIAL_PROOF_PATTERNS: readonly RegExp[] = [
  /\b(hundreds|thousands|dozens|\d{2,})\s+of\s+(clients|customers|companies|brands)\b/i,
  /\btrusted by\b/i,
  /\bour \d+\+? (clients|customers)\b/i,
  /\b(everyone|all our clients)\s+(says?|loves?|agrees?)\b/i,
];

const TEMPLATED_AI_PHRASES: readonly string[] = [
  'i hope this email finds you well',
  'i hope this message finds you well',
  "in today's fast-paced world",
  'in this day and age',
  'i wanted to reach out',
  'i trust this message finds you',
  'delve into',
  'unlock the power',
  'take your business to the next level',
  'synergy',
  'circle back',
  'touch base',
];

const AI_SELF_DISCLOSURE_PATTERNS: readonly RegExp[] = [
  /\bas an ai\b/i,
  /\bi(?:'m| am) an ai\b/i,
  /\b(ai|language model|chatgpt|claude)[- ](generated|written|assisted)\b/i,
  /\bmy (analysis|algorithm) (found|shows)\b/i,
];

/**
 * Pricing detection targets *Astra* quoting commercial terms, not the word
 * "price" appearing anywhere. Observing that a prospect's booking page hides
 * its price is a legitimate low-risk observation; saying what we charge for
 * fixing it is not.
 */
const PRICING_PATTERNS: readonly RegExp[] = [
  /[€$£]\s?\d/,
  /\b\d+\s?(k|euro|eur|usd|dollars?|pounds?)\b/i,
  /\b(quote|invoice|retainer|discount|rate card|per hour|hourly rate|day rate)\b/i,
  /\b(contract|proposal|statement of work|\bsow\b|nda)\b/i,
  /\b(we|our|astra)\b[^.!?]{0,40}\b(charge|charges|costs?|prices?|pricing|fees?)\b/i,
  /\b(price|pricing|cost|fee)s?\s+(is|are|starts?|would be|ranges?|depends)\b/i,
  /\bbudget\b/i,
];

const URL_PATTERN = /\bhttps?:\/\/[^\s<>"')\]]+/gi;
const BARE_DOMAIN_PATTERN = /\b(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+(?:com|net|org|io|co|nl|dev|app|ai|agency|site|netlify\.app)\b/gi;

/**
 * Emoji detection. Variation selectors are matched separately from the base
 * characters so a combined sequence is not silently treated as two emoji.
 */
const EMOJI_PATTERN =
  /\p{Extended_Pictographic}/gu;

// --- individual checks ------------------------------------------------------

export function findPlaceholders(text: string): string[] {
  const found: string[] = [];
  for (const pattern of PLACEHOLDER_PATTERNS) {
    for (const match of text.matchAll(pattern)) {
      if (match[0]) found.push(match[0]);
    }
  }
  return [...new Set(found)];
}

export function findUrls(text: string): string[] {
  const explicit = [...text.matchAll(URL_PATTERN)].map((match) => match[0]);
  // A bare domain is still a link the prospect can click, so it counts.
  const bare = [...text.matchAll(BARE_DOMAIN_PATTERN)]
    .map((match) => match[0])
    .filter((domain) => !explicit.some((url) => url.includes(domain)))
    // An email address is not a link for this purpose.
    .filter((domain) => !new RegExp(`@${escapeRegExp(domain)}`, 'i').test(text));
  return [...new Set([...explicit, ...bare])];
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function countEmoji(text: string): number {
  return [...text.matchAll(EMOJI_PATTERN)].length;
}

export function hasExcessivePunctuation(text: string): boolean {
  if (/[!?]{2,}/.test(text)) return true;
  const exclamations = (text.match(/!/g) ?? []).length;
  if (exclamations > 1) return true;
  return /\.{4,}/.test(text);
}

export function findAllCapsEmphasis(text: string): string[] {
  // Acronyms up to three characters (SEO, CRM, UX) are normal business English.
  return [...text.matchAll(/\b[A-Z]{4,}\b/g)]
    .map((match) => match[0])
    .filter((word) => word !== 'HTML' && word !== 'HTTPS');
}

/**
 * Trigram Jaccard similarity, used for near-duplicate detection. Exact
 * equality is not enough: a resend that changes only a greeting still reads to
 * the prospect as the same message twice.
 */
export function textSimilarity(a: string, b: string): number {
  const left = trigrams(normalizeForComparison(a));
  const right = trigrams(normalizeForComparison(b));
  if (left.size === 0 || right.size === 0) return left.size === right.size ? 1 : 0;
  let intersection = 0;
  for (const gram of left) if (right.has(gram)) intersection += 1;
  const union = left.size + right.size - intersection;
  return union === 0 ? 0 : intersection / union;
}

function normalizeForComparison(text: string): string {
  return canonicalizeText(text)
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function trigrams(text: string): Set<string> {
  const grams = new Set<string>();
  for (let index = 0; index + 3 <= text.length; index += 1) {
    grams.add(text.slice(index, index + 3));
  }
  return grams;
}

export const NEAR_DUPLICATE_THRESHOLD = 0.82;

// --- aggregate --------------------------------------------------------------

export function checkOutboundContent(
  text: string,
  options: ContentCheckOptions,
): ContentCheckResult {
  const violations: ContentViolation[] = [];
  const add = (
    code: ReasonCode,
    severity: ViolationSeverity,
    detail: string,
    evidence?: string,
  ): void => {
    violations.push(evidence === undefined ? { code, severity, detail } : { code, severity, detail, evidence });
  };

  const canonical = canonicalizeText(text);
  const wordCount = countWords(canonical);

  if (canonical.length === 0) {
    add(REASON_CODES.EMPTY_MESSAGE, 'BLOCK', 'message body is empty or whitespace only');
    return { ok: false, wordCount: 0, violations };
  }

  if (wordCount > options.maxWords) {
    add(
      REASON_CODES.WORD_LIMIT_EXCEEDED,
      'BLOCK',
      `message is ${wordCount} words, limit for this case is ${options.maxWords}`,
    );
  }

  for (const placeholder of findPlaceholders(canonical)) {
    add(REASON_CODES.UNRESOLVED_PLACEHOLDER, 'BLOCK', 'unresolved placeholder', placeholder);
  }

  const urls = findUrls(canonical);
  if (urls.length > 0) {
    const allowed = new Set((options.allowedUrls ?? []).map((url) => url.toLowerCase()));
    for (const url of urls) {
      const isNetlifyPrototype = /netlify\.app/i.test(url);
      if (!options.allowUrls) {
        add(
          isNetlifyPrototype
            ? REASON_CODES.PROTOTYPE_URL_REQUIRES_APPROVAL
            : REASON_CODES.URL_NOT_PERMITTED,
          'BLOCK',
          'this policy case does not permit any URL',
          url,
        );
      } else if (!allowed.has(url.toLowerCase())) {
        add(
          isNetlifyPrototype
            ? REASON_CODES.PROTOTYPE_URL_REQUIRES_APPROVAL
            : REASON_CODES.URL_NOT_PERMITTED,
          'BLOCK',
          'URL is not on the approved list for this message',
          url,
        );
      }
    }
  }

  const lower = canonical.toLowerCase();

  for (const phrase of BANNED_PHRASES) {
    if (lower.includes(phrase)) {
      add(REASON_CODES.PROHIBITED_PHRASE, 'BLOCK', 'phrase is banned from Astra voice', phrase);
    }
  }

  for (const word of INFLATED_WORDS) {
    if (lower.includes(word)) {
      add(REASON_CODES.STYLE_VIOLATION, 'BLOCK', 'inflated marketing language', word);
    }
  }

  for (const pattern of GUARANTEE_PATTERNS) {
    const match = pattern.exec(canonical);
    if (match) add(REASON_CODES.GUARANTEE_LANGUAGE, 'BLOCK', 'promises a result', match[0]);
  }

  for (const pattern of FAKE_URGENCY_PATTERNS) {
    const match = pattern.exec(canonical);
    if (match) add(REASON_CODES.FAKE_URGENCY, 'BLOCK', 'manufactured urgency or scarcity', match[0]);
  }

  for (const pattern of SOCIAL_PROOF_PATTERNS) {
    const match = pattern.exec(canonical);
    if (match) {
      add(REASON_CODES.FABRICATED_SOCIAL_PROOF, 'BLOCK', 'unverifiable social proof', match[0]);
    }
  }

  for (const pattern of PRICING_PATTERNS) {
    const match = pattern.exec(canonical);
    if (match) {
      add(REASON_CODES.PRICING_OR_SCOPE, 'BLOCK', 'pricing or commercial terms', match[0]);
    }
  }

  for (const pattern of AI_SELF_DISCLOSURE_PATTERNS) {
    const match = pattern.exec(canonical);
    if (match) {
      add(REASON_CODES.STYLE_VIOLATION, 'BLOCK', 'message reveals AI authorship', match[0]);
    }
  }

  for (const phrase of TEMPLATED_AI_PHRASES) {
    if (lower.includes(phrase)) {
      add(REASON_CODES.STYLE_VIOLATION, 'BLOCK', 'templated filler phrasing', phrase);
    }
  }

  // Em and en dashes are the strongest "written by a model" tell in Raka's
  // voice, and the sister enrichment pipeline bans them outright. Ordinary
  // hyphens inside compound words are left alone.
  const dashMatch = /[–—]/.exec(canonical);
  if (dashMatch) {
    add(REASON_CODES.STYLE_VIOLATION, 'BLOCK', 'en or em dash in message body', dashMatch[0]);
  }

  if (hasExcessivePunctuation(canonical)) {
    add(REASON_CODES.STYLE_VIOLATION, 'BLOCK', 'excessive punctuation');
  }

  const emoji = countEmoji(canonical);
  if (emoji > 1) {
    add(REASON_CODES.STYLE_VIOLATION, 'BLOCK', `message contains ${emoji} emoji, at most one is allowed`);
  }

  const shouting = findAllCapsEmphasis(canonical);
  if (shouting.length > 0) {
    add(REASON_CODES.STYLE_VIOLATION, 'BLOCK', 'all caps emphasis', shouting.join(', '));
  }

  // A LinkedIn reply is a message, not a document.
  if (/^\s*[-*•]\s+/m.test(canonical) || /^#{1,6}\s+/m.test(canonical)) {
    add(REASON_CODES.STYLE_VIOLATION, 'BLOCK', 'bullet list or heading in a conversational reply');
  }

  for (const previous of options.recentOutboundTexts ?? []) {
    const similarity = textSimilarity(canonical, previous);
    if (similarity >= NEAR_DUPLICATE_THRESHOLD) {
      add(
        REASON_CODES.DUPLICATE_MESSAGE,
        'BLOCK',
        `message is ${(similarity * 100).toFixed(0)}% similar to a recent outbound message`,
      );
      break;
    }
  }

  if (options.supportedClaimTerms !== undefined) {
    for (const unsupported of findUnsupportedResearchClaims(canonical, options.supportedClaimTerms)) {
      add(
        REASON_CODES.UNSUPPORTED_CLAIM,
        'BLOCK',
        'message references research that is not in the evidence table',
        unsupported,
      );
    }
  }

  return {
    ok: violations.every((violation) => violation.severity !== 'BLOCK'),
    wordCount,
    violations,
  };
}

/**
 * Sentences that assert an observation about the prospect ("I noticed your
 * booking page...") must be traceable to a stored evidence row. This is a
 * coarse lexical check: it catches the obvious fabrications, and the model is
 * separately required to populate the evidence table.
 */
const OBSERVATION_MARKERS =
  /\b(i (noticed|saw|spotted|found)|we (noticed|saw|spotted|found)|your (site|website|homepage|page|booking|checkout|pricing page)\b)/gi;

export function findUnsupportedResearchClaims(
  text: string,
  supportedClaimTerms: readonly string[],
): string[] {
  const supported = supportedClaimTerms.map((term) => term.toLowerCase().trim()).filter(Boolean);
  const unsupported: string[] = [];

  for (const sentence of splitSentences(text)) {
    OBSERVATION_MARKERS.lastIndex = 0;
    if (!OBSERVATION_MARKERS.test(sentence)) continue;
    const lower = sentence.toLowerCase();
    const isSupported = supported.some((term) => lower.includes(term));
    if (!isSupported) unsupported.push(sentence.trim());
  }
  return unsupported;
}

export function splitSentences(text: string): string[] {
  return text
    .split(/(?<=[.!?])\s+|\n+/)
    .map((sentence) => sentence.trim())
    .filter((sentence) => sentence.length > 0);
}
