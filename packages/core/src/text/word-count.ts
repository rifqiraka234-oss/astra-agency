/**
 * Unicode-aware word counting.
 *
 * The 65 / 35 / 30 word caps are hard policy gates, so counting has to be
 * stable and defensible. Splitting on ASCII whitespace alone miscounts
 * non-breaking spaces and accented text, which would let an over-length
 * message slip past the gate.
 */

const SEGMENTER_AVAILABLE = typeof Intl !== 'undefined' && 'Segmenter' in Intl;

/** Characters that separate words but are not matched by \s in older engines. */
const UNICODE_WHITESPACE = /[\s\u00a0\u1680\u2000-\u200a\u202f\u205f\u3000]+/u;

export function countWords(text: string): number {
  const normalized = text.normalize('NFC').trim();
  if (normalized.length === 0) return 0;

  if (SEGMENTER_AVAILABLE) {
    const segmenter = new Intl.Segmenter(undefined, { granularity: 'word' });
    let count = 0;
    for (const segment of segmenter.segment(normalized)) {
      if (segment.isWordLike === true) count += 1;
    }
    // A URL segments into several word-like pieces ("https", "example", "com").
    // Treat it as a single token so a link does not inflate the count and mask
    // an over-length message body.
    const urlPieces = countUrlSegmentInflation(normalized);
    return Math.max(1, count - urlPieces);
  }

  return normalized.split(UNICODE_WHITESPACE).filter((token) => token.length > 0).length;
}

const URL_PATTERN = /\bhttps?:\/\/[^\s<>"']+/giu;

/**
 * How many extra word-like segments the URLs in `text` contribute beyond one
 * token each.
 */
function countUrlSegmentInflation(text: string): number {
  if (!SEGMENTER_AVAILABLE) return 0;
  const segmenter = new Intl.Segmenter(undefined, { granularity: 'word' });
  let inflation = 0;
  for (const match of text.matchAll(URL_PATTERN)) {
    let pieces = 0;
    for (const segment of segmenter.segment(match[0])) {
      if (segment.isWordLike === true) pieces += 1;
    }
    inflation += Math.max(0, pieces - 1);
  }
  return inflation;
}

export function isWithinWordLimit(text: string, limit: number): boolean {
  return countWords(text) <= limit;
}
