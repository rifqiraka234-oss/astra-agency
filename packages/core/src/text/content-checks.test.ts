import { describe, expect, it } from 'vitest';
import { checkOutboundContent, findUrls, textSimilarity } from './content-checks.js';
import { countWords } from './word-count.js';
import { REASON_CODES } from '../domain/reason-codes.js';

const blockedCodes = (text: string, maxWords = 65, extra: Parameters<typeof checkOutboundContent>[1] | null = null) =>
  checkOutboundContent(text, { maxWords, ...(extra ?? {}) })
    .violations.filter((violation) => violation.severity === 'BLOCK')
    .map((violation) => violation.code);

describe('word counting', () => {
  it('counts non-breaking spaces and accents as ordinary word separators', () => {
    expect(countWords('café au lait')).toBe(3);
  });

  it('treats a URL as a single token', () => {
    expect(countWords('here you go https://acme-prototype-by-astra.netlify.app')).toBe(4);
  });

  it('returns zero for whitespace only text', () => {
    expect(countWords('   \n\t ')).toBe(0);
  });
});

describe('post-acceptance word cap', () => {
  const sixtyFive = Array.from({ length: 65 }, (_, index) => `word${index}`).join(' ');
  const sixtySix = `${sixtyFive} extra`;

  it('accepts exactly 65 words', () => {
    expect(blockedCodes(sixtyFive)).not.toContain(REASON_CODES.WORD_LIMIT_EXCEEDED);
  });

  it('rejects 66 words', () => {
    expect(blockedCodes(sixtySix)).toContain(REASON_CODES.WORD_LIMIT_EXCEEDED);
  });
});

describe('outbound content checks', () => {
  it('blocks an unresolved merge variable', () => {
    expect(blockedCodes('Thanks for connecting {{firstName}}, good to be in touch.')).toContain(
      REASON_CODES.UNRESOLVED_PLACEHOLDER,
    );
  });

  it('blocks bracketed placeholders and TBD', () => {
    expect(blockedCodes('Nice work at [company], I will follow up TBD.')).toContain(
      REASON_CODES.UNRESOLVED_PLACEHOLDER,
    );
  });

  it('blocks guarantee language', () => {
    expect(blockedCodes('We guarantee more leads within a month.')).toContain(
      REASON_CODES.GUARANTEE_LANGUAGE,
    );
  });

  it('blocks manufactured urgency', () => {
    expect(blockedCodes('Only 2 spots left this week, act now.')).toContain(REASON_CODES.FAKE_URGENCY);
  });

  it('blocks unverifiable social proof', () => {
    expect(blockedCodes('Trusted by hundreds of clients across Europe.')).toContain(
      REASON_CODES.FABRICATED_SOCIAL_PROOF,
    );
  });

  it('blocks pricing and scope in any automatic message', () => {
    expect(blockedCodes('We could do this for around 2k, shall I send a quote?')).toContain(
      REASON_CODES.PRICING_OR_SCOPE,
    );
  });

  it('blocks any URL when the case does not permit one', () => {
    expect(blockedCodes('Have a look at https://acme.com/pricing')).toContain(
      REASON_CODES.URL_NOT_PERMITTED,
    );
  });

  it('flags a prototype link specifically as needing approval', () => {
    expect(blockedCodes('Here you go: https://acme-prototype-by-astra.netlify.app')).toContain(
      REASON_CODES.PROTOTYPE_URL_REQUIRES_APPROVAL,
    );
  });

  it('allows an explicitly approved URL', () => {
    const codes = blockedCodes('Here you go: https://acme-prototype-by-astra.netlify.app', 65, {
      maxWords: 65,
      allowUrls: true,
      allowedUrls: ['https://acme-prototype-by-astra.netlify.app'],
    });
    expect(codes).not.toContain(REASON_CODES.PROTOTYPE_URL_REQUIRES_APPROVAL);
  });

  it('blocks the banned Astra phrases', () => {
    expect(blockedCodes('I took a proper look at your website journey.')).toContain(
      REASON_CODES.PROHIBITED_PHRASE,
    );
  });

  it('blocks AI self-disclosure', () => {
    expect(blockedCodes('As an AI I reviewed your site and had a thought.')).toContain(
      REASON_CODES.STYLE_VIOLATION,
    );
  });

  it('blocks en and em dashes', () => {
    const codes = checkOutboundContent('Thanks for connecting, your booking flow — nice work.', {
      maxWords: 65,
    }).violations;
    expect(codes.some((violation) => violation.evidence === '—')).toBe(true);
  });

  it('allows a single exclamation mark but not two', () => {
    expect(blockedCodes('Thanks for connecting!')).not.toContain(REASON_CODES.STYLE_VIOLATION);
    expect(blockedCodes('Thanks! Great to connect!')).toContain(REASON_CODES.STYLE_VIOLATION);
  });

  it('blocks a near-duplicate of a recent outbound message', () => {
    const previous = 'Thanks for connecting. I had a quick look at your booking page and had one idea.';
    const codes = blockedCodes(
      'Thanks for connecting. I had a quick look at your booking page and had one idea for it.',
      65,
      { maxWords: 65, recentOutboundTexts: [previous] },
    );
    expect(codes).toContain(REASON_CODES.DUPLICATE_MESSAGE);
  });

  it('blocks an observation that no evidence row supports', () => {
    const codes = blockedCodes('I noticed your checkout asks for a phone number before the price.', 65, {
      maxWords: 65,
      supportedClaimTerms: ['booking page'],
    });
    expect(codes).toContain(REASON_CODES.UNSUPPORTED_CLAIM);
  });

  it('accepts an observation the evidence table supports', () => {
    const codes = blockedCodes('I noticed your booking page hides the price until the last step.', 65, {
      maxWords: 65,
      supportedClaimTerms: ['booking page'],
    });
    expect(codes).not.toContain(REASON_CODES.UNSUPPORTED_CLAIM);
  });

  it('rejects an empty message', () => {
    expect(blockedCodes('   ')).toContain(REASON_CODES.EMPTY_MESSAGE);
  });
});

describe('url detection', () => {
  it('finds bare domains as well as full URLs', () => {
    expect(findUrls('see acme.io and https://example.com/x')).toEqual(
      expect.arrayContaining(['https://example.com/x', 'acme.io']),
    );
  });

  it('does not treat an email address domain as a link', () => {
    expect(findUrls('mail me at raka@astra.agency')).toEqual([]);
  });
});

describe('similarity', () => {
  it('scores identical text as 1', () => {
    expect(textSimilarity('hello there friend', 'hello there friend')).toBe(1);
  });

  it('scores unrelated text low', () => {
    expect(textSimilarity('hello there friend', 'completely different words')).toBeLessThan(0.2);
  });
});
