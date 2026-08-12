import { describe, expect, it } from 'vitest';
import {
  DEFAULT_PAGINATION_LIMITS,
  EMPTY_PAGINATION_STATE,
  decideNextPage,
  hashIdSet,
  ingestPage,
  pageProvesExhaustion,
  type PageObservation,
} from './pagination.js';

/**
 * Contract fixtures reproducing the historical Lemlist pagination behavior.
 * The overlap went unnoticed for three days, so these are regression cases,
 * not hypotheticals.
 */

const page = (
  pageNumber: number,
  offset: number,
  ids: readonly string[],
): PageObservation => ({
  pageNumber,
  offset,
  limit: 100,
  returnedIds: ids,
  requestedAt: `2026-08-12T10:0${String(pageNumber)}:00.000Z`,
});

describe('overlapping offset windows', () => {
  it('processes each contact once when pages overlap', () => {
    let state = EMPTY_PAGINATION_STATE;
    const processed = new Set<string>();

    state = ingestPage(state, page(1, 0, ['c1', 'c2', 'c3']), processed);
    // The window slid by one instead of three: c2 and c3 come back.
    state = ingestPage(state, page(2, 3, ['c2', 'c3', 'c4']), processed);
    state = ingestPage(state, page(3, 6, ['c4', 'c5']), processed);

    expect(state.newIds).toEqual(['c1', 'c2', 'c3', 'c4', 'c5']);
    expect(state.duplicateIdCount).toBe(3);
  });

  it('treats a reordered page as the same page', () => {
    expect(hashIdSet(['c1', 'c2', 'c3'])).toBe(hashIdSet(['c3', 'c1', 'c2']));
  });

  it('does not re-process contacts already in the durable checkpoint', () => {
    const processed = new Set(['c1', 'c2']);
    const state = ingestPage(EMPTY_PAGINATION_STATE, page(1, 0, ['c1', 'c2', 'c3']), processed);

    expect(state.newIds).toEqual(['c3']);
    // They were still *seen*, so a later page repeating them is a duplicate.
    expect(state.seenIds).toEqual(['c1', 'c2', 'c3']);
  });
});

describe('exhaustion is never inferred from known IDs', () => {
  it('continues after a page containing only already-known IDs', () => {
    const processed = new Set(['c1', 'c2', 'c3']);
    const allKnown = page(2, 3, ['c1', 'c2', 'c3']);
    const state = ingestPage(EMPTY_PAGINATION_STATE, allKnown, processed);

    expect(pageProvesExhaustion(allKnown)).toBe(false);
    expect(decideNextPage(state, allKnown)).toEqual({ action: 'CONTINUE' });
  });

  it('stops on a genuinely empty page', () => {
    const empty = page(4, 9, []);
    const state = ingestPage(EMPTY_PAGINATION_STATE, empty, new Set());

    expect(pageProvesExhaustion(empty)).toBe(true);
    expect(decideNextPage(state, empty)).toEqual({
      action: 'STOP',
      reasonCode: 'PAGINATION_EMPTY_PAGE',
    });
  });
});

describe('no-progress detection', () => {
  it('stops only after the tolerance of unproductive pages is exhausted', () => {
    const processed = new Set(['c1']);
    let state = EMPTY_PAGINATION_STATE;
    let last = page(1, 0, ['c1']);

    for (let i = 1; i <= DEFAULT_PAGINATION_LIMITS.noProgressPageTolerance; i += 1) {
      last = page(i, i * 3, ['c1']);
      state = ingestPage(state, last, processed);
      if (i < DEFAULT_PAGINATION_LIMITS.noProgressPageTolerance) {
        expect(decideNextPage(state, last)).toEqual({ action: 'CONTINUE' });
      }
    }

    expect(state.consecutiveNoProgressPages).toBe(
      DEFAULT_PAGINATION_LIMITS.noProgressPageTolerance,
    );
    expect(decideNextPage(state, last)).toEqual({
      action: 'STOP',
      reasonCode: 'PAGINATION_NO_PROGRESS',
    });
  });

  it('resets the no-progress counter when a page contributes something new', () => {
    const processed = new Set(['c1']);
    let state = ingestPage(EMPTY_PAGINATION_STATE, page(1, 0, ['c1']), processed);
    expect(state.consecutiveNoProgressPages).toBe(1);

    state = ingestPage(state, page(2, 3, ['c9']), processed);
    expect(state.consecutiveNoProgressPages).toBe(0);
  });
});

describe('page forensics', () => {
  it('records the offset, counts and an order-independent hash for every page', () => {
    const state = ingestPage(EMPTY_PAGINATION_STATE, page(1, 0, ['c1', 'c2']), new Set(['c1']));
    const record = state.pages[0];

    expect(record).toBeDefined();
    expect(record?.offset).toBe(0);
    expect(record?.returnedCount).toBe(2);
    expect(record?.newCount).toBe(1);
    expect(record?.returnedIdSetHash).toBe(hashIdSet(['c2', 'c1']));
  });
});
