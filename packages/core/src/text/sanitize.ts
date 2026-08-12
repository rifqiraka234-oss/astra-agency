/**
 * Sanitization of untrusted inbound content.
 *
 * Two different outputs are produced from the same source, for two different
 * consumers:
 *
 *  - `htmlToPlainText` produces the text handed to the model. It must contain
 *    no markup, no tracking pixels and no quoted history, because quoted
 *    history reads to a model like a brand new prospect message.
 *  - `sanitizeHtmlForDisplay` produces the version rendered in the operator
 *    dashboard. It is allowlist based and is additionally served under a
 *    strict Content-Security-Policy; neither layer is trusted alone.
 */

const VOID_TAGS = new Set(['br', 'hr', 'img', 'wbr']);

/** Tags whose entire contents are dropped, not just their markup. */
const DROP_CONTENT_TAGS = new Set(['script', 'style', 'head', 'title', 'noscript', 'iframe', 'object', 'embed', 'svg', 'math']);

const ALLOWED_DISPLAY_TAGS = new Set([
  'p', 'br', 'div', 'span', 'strong', 'b', 'em', 'i', 'u', 'a', 'ul', 'ol', 'li',
  'blockquote', 'pre', 'code', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'table',
  'thead', 'tbody', 'tr', 'td', 'th', 'hr',
]);

const ALLOWED_ATTRIBUTES: Record<string, ReadonlySet<string>> = {
  a: new Set(['href', 'title']),
};

const BLOCK_TAGS = new Set([
  'p', 'div', 'br', 'li', 'tr', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'pre', 'hr', 'table',
]);

interface TagToken {
  readonly kind: 'tag';
  readonly name: string;
  readonly closing: boolean;
  readonly selfClosing: boolean;
  readonly raw: string;
  readonly attributes: ReadonlyArray<readonly [string, string]>;
}
interface TextToken {
  readonly kind: 'text';
  readonly value: string;
}
type Token = TagToken | TextToken;

function* tokenize(html: string): Generator<Token> {
  let index = 0;
  while (index < html.length) {
    const open = html.indexOf('<', index);
    if (open === -1) {
      yield { kind: 'text', value: html.slice(index) };
      return;
    }
    if (open > index) {
      yield { kind: 'text', value: html.slice(index, open) };
    }
    // Comments and doctype/CDATA are dropped wholesale. A comment can carry
    // prompt-injection text, so it must never reach the model.
    if (html.startsWith('<!--', open)) {
      const end = html.indexOf('-->', open + 4);
      index = end === -1 ? html.length : end + 3;
      continue;
    }
    if (html.startsWith('<!', open) || html.startsWith('<?', open)) {
      const end = html.indexOf('>', open);
      index = end === -1 ? html.length : end + 1;
      continue;
    }
    const close = html.indexOf('>', open);
    if (close === -1) {
      yield { kind: 'text', value: html.slice(open) };
      return;
    }
    const raw = html.slice(open, close + 1);
    const inner = raw.slice(1, -1).trim();
    const closing = inner.startsWith('/');
    const selfClosing = inner.endsWith('/');
    const body = inner.replace(/^\//, '').replace(/\/$/, '').trim();
    const nameMatch = /^[A-Za-z][A-Za-z0-9:-]*/.exec(body);
    const name = (nameMatch?.[0] ?? '').toLowerCase();
    yield {
      kind: 'tag',
      name,
      closing,
      selfClosing,
      raw,
      attributes: name ? parseAttributes(body.slice(name.length)) : [],
    };
    index = close + 1;
  }
}

function parseAttributes(source: string): Array<readonly [string, string]> {
  const attributes: Array<readonly [string, string]> = [];
  const pattern = /([A-Za-z_:][-A-Za-z0-9_:.]*)\s*(?:=\s*("[^"]*"|'[^']*'|[^\s"'>]+))?/g;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(source)) !== null) {
    const name = (match[1] ?? '').toLowerCase();
    let value = match[2] ?? '';
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (name) attributes.push([name, decodeEntities(value)]);
  }
  return attributes;
}

const NAMED_ENTITIES: Record<string, string> = {
  amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', ndash: '–',
  mdash: '—', hellip: '…', rsquo: '’', lsquo: '‘',
  ldquo: '“', rdquo: '”', eacute: 'é', egrave: 'è',
};

export function decodeEntities(input: string): string {
  return input.replace(/&(#x?[0-9a-fA-F]+|[a-zA-Z][a-zA-Z0-9]*);/g, (whole, entity: string) => {
    if (entity.startsWith('#x') || entity.startsWith('#X')) {
      const code = Number.parseInt(entity.slice(2), 16);
      return Number.isFinite(code) ? safeFromCodePoint(code, whole) : whole;
    }
    if (entity.startsWith('#')) {
      const code = Number.parseInt(entity.slice(1), 10);
      return Number.isFinite(code) ? safeFromCodePoint(code, whole) : whole;
    }
    return NAMED_ENTITIES[entity.toLowerCase()] ?? whole;
  });
}

function safeFromCodePoint(code: number, fallback: string): string {
  if (code < 0 || code > 0x10ffff || (code >= 0xd800 && code <= 0xdfff)) return fallback;
  return String.fromCodePoint(code);
}

export function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Convert untrusted HTML into plain text suitable for model input. */
export function htmlToPlainText(html: string): string {
  let output = '';
  let dropDepth = 0;
  let dropTag: string | null = null;

  for (const token of tokenize(html)) {
    if (token.kind === 'text') {
      if (dropDepth === 0) output += decodeEntities(token.value);
      continue;
    }
    if (DROP_CONTENT_TAGS.has(token.name)) {
      if (token.closing) {
        if (dropTag === token.name && dropDepth > 0) dropDepth -= 1;
        if (dropDepth === 0) dropTag = null;
      } else if (!token.selfClosing) {
        dropTag = token.name;
        dropDepth += 1;
      }
      continue;
    }
    if (dropDepth > 0) continue;
    if (BLOCK_TAGS.has(token.name)) output += '\n';
  }

  return collapseWhitespace(output);
}

export function collapseWhitespace(input: string): string {
  return input
    .replace(/\r\n?/g, '\n')
    .replace(/[\t\u00a0\u1680\u2000-\u200a\u202f\u205f\u3000]/g, ' ')
    .replace(/[ ]{2,}/g, ' ')
    .split('\n')
    .map((line) => line.trim())
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/**
 * Allowlist sanitizer for dashboard rendering. Anything not explicitly allowed
 * is dropped, including every event handler attribute and every non
 * http(s)/mailto URL scheme.
 */
export function sanitizeHtmlForDisplay(html: string): string {
  let output = '';
  let dropDepth = 0;
  let dropTag: string | null = null;

  for (const token of tokenize(html)) {
    if (token.kind === 'text') {
      if (dropDepth === 0) output += escapeHtml(decodeEntities(token.value));
      continue;
    }
    if (DROP_CONTENT_TAGS.has(token.name)) {
      if (token.closing) {
        if (dropTag === token.name && dropDepth > 0) dropDepth -= 1;
        if (dropDepth === 0) dropTag = null;
      } else if (!token.selfClosing) {
        dropTag = token.name;
        dropDepth += 1;
      }
      continue;
    }
    if (dropDepth > 0) continue;
    if (!ALLOWED_DISPLAY_TAGS.has(token.name)) continue;

    if (token.closing) {
      output += `</${token.name}>`;
      continue;
    }

    const allowed = ALLOWED_ATTRIBUTES[token.name] ?? new Set<string>();
    const rendered = token.attributes
      .filter(([name]) => allowed.has(name))
      .map(([name, value]) => {
        if (name === 'href' && !isSafeUrl(value)) return null;
        return `${name}="${escapeHtml(value)}"`;
      })
      .filter((part): part is string => part !== null);

    const extra = token.name === 'a' ? ' rel="noopener noreferrer nofollow" target="_blank"' : '';
    const attributeText = rendered.length > 0 ? ` ${rendered.join(' ')}` : '';
    output += VOID_TAGS.has(token.name)
      ? `<${token.name}${attributeText} />`
      : `<${token.name}${attributeText}${extra}>`;
  }

  return output;
}

export function isSafeUrl(value: string): boolean {
  const trimmed = value.trim();
  // Strip control characters that are used to smuggle "java\nscript:" past
  // naive scheme checks.
  // eslint-disable-next-line no-control-regex -- stripping control characters is the point
  const normalized = trimmed.replace(/[\u0000-\u0020\u00a0\u200b-\u200f\ufeff]/g, '').toLowerCase();
  return /^(https?:\/\/|mailto:)/.test(normalized);
}

/**
 * Detect and remove quoted email history. Quoted history is the single most
 * common cause of a model treating an old outbound message as a fresh
 * prospect reply, so this runs before any analysis.
 */
const QUOTE_HEADER_PATTERNS: readonly RegExp[] = [
  /^\s*on\s.+\swrote:\s*$/i,
  /^\s*op\s.+\sschreef\s.+:\s*$/i,
  /^\s*am\s.+\sschrieb\s.+:\s*$/i,
  /^\s*le\s.+\sa\s(é|e)crit\s*:\s*$/i,
  /^\s*-{2,}\s*original message\s*-{2,}\s*$/i,
  /^\s*_{5,}\s*$/,
  /^\s*from:\s*.+$/i,
  /^\s*van:\s*.+$/i,
  /^\s*sent:\s*.+$/i,
  /^\s*verzonden:\s*.+$/i,
];

const SIGNATURE_PATTERNS: readonly RegExp[] = [/^\s*--\s*$/, /^\s*sent from my \w+/i];

export interface QuoteStripResult {
  readonly text: string;
  readonly removedQuotedHistory: boolean;
  readonly removedSignature: boolean;
}

export function stripQuotedHistory(input: string): QuoteStripResult {
  const lines = input.replace(/\r\n?/g, '\n').split('\n');
  const kept: string[] = [];
  let removedQuotedHistory = false;
  let removedSignature = false;

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index] ?? '';

    if (QUOTE_HEADER_PATTERNS.some((pattern) => pattern.test(line))) {
      // Everything from a quote header onwards belongs to the older message.
      removedQuotedHistory = true;
      break;
    }
    if (SIGNATURE_PATTERNS.some((pattern) => pattern.test(line))) {
      removedSignature = true;
      break;
    }
    if (/^\s*>/.test(line)) {
      removedQuotedHistory = true;
      continue;
    }
    kept.push(line);
  }

  return {
    text: collapseWhitespace(kept.join('\n')),
    removedQuotedHistory,
    removedSignature,
  };
}

/**
 * Tracking pixels and beacons carry no conversational meaning and their URLs
 * frequently embed identifiers we do not want copied into the model context.
 */
export function stripTrackingArtifacts(html: string): string {
  return html
    .replace(/<img\b[^>]*\b(width|height)\s*=\s*["']?1["']?[^>]*>/gi, '')
    .replace(/<img\b[^>]*\b(?:tracking|pixel|beacon|open\.gif|t\.gif)\b[^>]*>/gi, '')
    .replace(/<link\b[^>]*>/gi, '');
}
