/**
 * Cursor-safe contact acquisition (specification section 7.2).
 *
 * Lemlist contact pagination has been observed returning overlapping and
 * reordered offset windows. The overlap went unnoticed for three days. Offset
 * arithmetic is therefore never treated as a durable cursor: the durable state
 * is the *set of stable contact IDs already processed*, and pages are merely a
 * way of discovering IDs.
 *
 * Two failure modes are distinguished, and conflating them is what made the
 * historical bug expensive:
 *
 *  - A page that returns only already-known IDs is *not* exhaustion. It is
 *    exactly what an overlapping window looks like. Fetching must continue.
 *  - A page that returns nothing at all, or a run of pages that adds no new
 *    IDs beyond a configured tolerance, is a no-progress loop and must stop.
 */

import { contentHash } from '../text/hash.js';

export interface PageObservation {
  readonly pageNumber: number;
  readonly offset: number;
  readonly limit: number;
  readonly returnedIds: readonly string[];
  readonly requestedAt: string;
}

export interface PaginationState {
  /** Every ID seen this run, in first-seen order. */
  readonly seenIds: readonly string[];
  /** IDs seen this run that were not already in the durable checkpoint. */
  readonly newIds: readonly string[];
  readonly pages: readonly PageRecord[];
  /** Consecutive pages that contributed zero previously-unseen IDs. */
  readonly consecutiveNoProgressPages: number;
  readonly duplicateIdCount: number;
}

export interface PageRecord {
  readonly pageNumber: number;
  readonly offset: number;
  readonly limit: number;
  readonly returnedCount: number;
  readonly newCount: number;
  readonly duplicateCount: number;
  /** Order-independent hash of the returned IDs, for reordering forensics. */
  readonly returnedIdSetHash: string;
  readonly requestedAt: string;
}

export const EMPTY_PAGINATION_STATE: PaginationState = {
  seenIds: [],
  newIds: [],
  pages: [],
  consecutiveNoProgressPages: 0,
  duplicateIdCount: 0,
};

/** Order-independent so a reordered page hashes identically to its original. */
export function hashIdSet(ids: readonly string[]): string {
  return contentHash([...new Set(ids)].sort().join('\n'));
}

export function ingestPage(
  state: PaginationState,
  page: PageObservation,
  alreadyProcessedIds: ReadonlySet<string>,
): PaginationState {
  const seen = new Set(state.seenIds);
  const newIds = [...state.newIds];
  let newCount = 0;
  let duplicateCount = 0;

  for (const id of page.returnedIds) {
    if (seen.has(id)) {
      duplicateCount += 1;
      continue;
    }
    seen.add(id);
    if (!alreadyProcessedIds.has(id)) {
      newIds.push(id);
      newCount += 1;
    }
  }

  const record: PageRecord = {
    pageNumber: page.pageNumber,
    offset: page.offset,
    limit: page.limit,
    returnedCount: page.returnedIds.length,
    newCount,
    duplicateCount,
    returnedIdSetHash: hashIdSet(page.returnedIds),
    requestedAt: page.requestedAt,
  };

  return {
    seenIds: [...seen],
    newIds,
    pages: [...state.pages, record],
    consecutiveNoProgressPages: newCount > 0 ? 0 : state.consecutiveNoProgressPages + 1,
    duplicateIdCount: state.duplicateIdCount + duplicateCount,
  };
}

export interface PaginationLimits {
  /** Stop after this many consecutive pages that add no unprocessed ID. */
  readonly noProgressPageTolerance: number;
  readonly maxPages: number;
}

export const DEFAULT_PAGINATION_LIMITS: PaginationLimits = {
  // Three, not one: a single all-duplicates page is the documented signature of
  // an overlapping window, and stopping there is how rows get silently skipped.
  noProgressPageTolerance: 3,
  maxPages: 500,
};

export type PaginationDecision =
  | { readonly action: 'CONTINUE' }
  | { readonly action: 'STOP'; readonly reasonCode: string };

export function decideNextPage(
  state: PaginationState,
  lastPage: PageObservation,
  limits: PaginationLimits = DEFAULT_PAGINATION_LIMITS,
): PaginationDecision {
  if (lastPage.returnedIds.length === 0) {
    return { action: 'STOP', reasonCode: 'PAGINATION_EMPTY_PAGE' };
  }
  if (state.pages.length >= limits.maxPages) {
    return { action: 'STOP', reasonCode: 'PAGINATION_MAX_PAGES' };
  }
  if (state.consecutiveNoProgressPages >= limits.noProgressPageTolerance) {
    return { action: 'STOP', reasonCode: 'PAGINATION_NO_PROGRESS' };
  }
  return { action: 'CONTINUE' };
}

/**
 * A page containing only known IDs never means the source is exhausted. Kept as
 * a named predicate because that inference is precisely the historical bug and
 * a test asserts it directly.
 */
export function pageProvesExhaustion(page: PageObservation): boolean {
  return page.returnedIds.length === 0;
}
