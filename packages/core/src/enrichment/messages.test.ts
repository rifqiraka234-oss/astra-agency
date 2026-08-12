import { describe, expect, it } from 'vitest';
import { validateEnrichmentMessages, type EnrichmentMessageInput } from './messages.js';

/**
 * The style examples in the specification's section 7.6 table, turned into
 * assertions. The "Avoid" column must fail and the "Prefer" column must pass,
 * because a validator that accepts both teaches nothing.
 */

const observations = [
  'studio piero has no website yet',
  'the placeholder site cannot show the work',
  'sibling duo building a brand studio',
];

const input = (overrides: Partial<EnrichmentMessageInput>): EnrichmentMessageInput => ({
  connectionMessage: 'Saw you are building Studio Piero with your sibling. Worth a quick chat?',
  firstMessage:
    'Saw you are building Studio Piero with your sibling. The idea is clear, but without a site yet, people who hear about you have nowhere to quickly understand the work or enquire. That usually costs you the enquiries you never find out about. Want us to sketch what one could look like?',
  supportedObservations: observations,
  connectionMessageMaxWords: 30,
  firstMessageMaxWords: 65,
  ...overrides,
});

describe('the approved examples pass', () => {
  it('accepts the plain problem-centered rewrite', () => {
    const result = validateEnrichmentMessages(input({}));

    expect(result.violations.filter((v) => v.severity === 'BLOCK')).toEqual([]);
    expect(result.ok).toBe(true);
    expect(result.firstMessageWordCount).toBeLessThanOrEqual(65);
  });
});

describe('the rejected examples fail', () => {
  it('rejects the compound gerund opener', () => {
    const result = validateEnrichmentMessages(
      input({
        firstMessage:
          "Building Studio Piero as a sibling duo around brand strategy and art direction, treating identity like something that is cultivated not just designed, is a nice angle. Shall we talk?",
      }),
    );

    expect(result.ok).toBe(false);
    expect(result.violations.map((v) => v.code)).toContain('MESSAGE_COMPOUND_OPENER');
  });

  it('rejects generic admiration with no observation attached', () => {
    const result = validateEnrichmentMessages(
      input({
        firstMessage:
          'Your innovative multidisciplinary proposition has enormous potential. Can we show you something?',
      }),
    );

    expect(result.ok).toBe(false);
    expect(result.violations.map((v) => v.code)).toContain('MESSAGE_GENERIC_COMPLIMENT');
  });

  it('rejects "I was impressed by your unique vision"', () => {
    const result = validateEnrichmentMessages(
      input({
        firstMessage: 'I was impressed by your unique vision and compelling mission. Interested?',
      }),
    );

    expect(result.violations.map((v) => v.code)).toContain('MESSAGE_GENERIC_COMPLIMENT');
  });
});

describe('hard guardrails', () => {
  it('blocks every dash character in either field', () => {
    for (const dash of ['-', '–', '—']) {
      const result = validateEnrichmentMessages(
        input({
          firstMessage: `Saw the site is a placeholder ${dash} people cannot see the work. Want a sketch?`,
        }),
      );
      expect(result.ok).toBe(false);
    }
  });

  it('enforces the 65 word ceiling on the first message', () => {
    const long = `Saw you are building Studio Piero with your sibling and ${'the work is not visible anywhere yet '.repeat(8)} Want a sketch?`;
    const result = validateEnrichmentMessages(input({ firstMessage: long }));

    expect(result.firstMessageWordCount).toBeGreaterThan(65);
    expect(result.ok).toBe(false);
  });

  it('blocks an unresolved merge variable', () => {
    const result = validateEnrichmentMessages(
      input({ connectionMessage: 'Hi {{firstName}}, saw Studio Piero has no site yet. Chat?' }),
    );

    expect(result.ok).toBe(false);
    expect(result.violations.some((v) => v.field === 'connectionMessage')).toBe(true);
  });

  it('blocks an empty field', () => {
    const result = validateEnrichmentMessages(input({ firstMessage: '   ' }));
    expect(result.ok).toBe(false);
  });

  it('requires the first message to actually ask something', () => {
    const result = validateEnrichmentMessages(
      input({
        firstMessage:
          'Saw you are building Studio Piero with your sibling. Without a site yet, people who hear about you have nowhere to understand the work. We sketch these for new studios.',
      }),
    );

    expect(result.violations.map((v) => v.code)).toContain('MESSAGE_NO_ASK');
  });

  it('holds Astra to the "our agency" voice', () => {
    const result = validateEnrichmentMessages(
      input({
        firstMessage:
          'Saw Studio Piero has no website yet. My agency builds these for new studios. Want a sketch?',
      }),
    );

    expect(result.violations.map((v) => v.code)).toContain('MESSAGE_WRONG_AGENCY_VOICE');
  });

  it('flags near-duplicate copy across a batch', () => {
    const first = input({}).firstMessage;
    const result = validateEnrichmentMessages(
      input({ otherDraftedMessages: [first] }),
    );

    expect(result.ok).toBe(false);
  });
});
