import { describe, expect, it } from 'vitest';
import { orgInitials } from '../../lib/format';

describe('orgInitials', () => {
  it('takes the first two words that are not a legal form or filler', () => {
    expect(orgInitials('Brouwerij De Kade')).toBe('BK');
    expect(orgInitials('Atlas Freight BV')).toBe('AF');
    expect(orgInitials('The Sales Academy B.V.')).toBe('SA');
    expect(orgInitials('Maison Orée')).toBe('MO');
    expect(orgInitials('Snorly')).toBe('SN');
    expect(orgInitials('BV')).toBe('BV');
    expect(orgInitials('')).toBe('?');
  });
});
