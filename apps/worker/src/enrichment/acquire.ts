import {
  DEFAULT_PAGINATION_LIMITS,
  EMPTY_PAGINATION_STATE,
  decideNextPage,
  ingestPage,
  type PaginationLimits,
  type PaginationState,
} from '@astra/core';
import { recordFetchPage, type Sql } from '@astra/db';
import type { LemlistClient, LemlistContact } from '@astra/integrations';

/**
 * Contact acquisition (specification section 7.2).
 *
 * The loop below never asks "have I reached the end?" by looking at an offset.
 * It asks whether the last page returned anything at all, and whether the last
 * few pages contributed any contact we have not already decided on. That is the
 * only formulation that survives an endpoint whose windows overlap.
 */

export interface AcquireInput {
  readonly lemlist: LemlistClient;
  readonly sql: Sql;
  readonly enrichmentRunId: string;
  readonly listId: string;
  readonly alreadyProcessedIds: ReadonlySet<string>;
  readonly pageSize: number;
  /** Stop once this many previously-unprocessed contacts have been found. */
  readonly targetNewContacts: number;
  readonly limits?: PaginationLimits;
}

export interface AcquireResult {
  readonly contacts: readonly LemlistContact[];
  readonly state: PaginationState;
  readonly stopReason: string;
}

export async function acquireContacts(input: AcquireInput): Promise<AcquireResult> {
  const limits = input.limits ?? DEFAULT_PAGINATION_LIMITS;
  const byId = new Map<string, LemlistContact>();
  let state = EMPTY_PAGINATION_STATE;
  let offset = 0;
  let pageNumber = 0;
  let stopReason = 'TARGET_REACHED';

  for (;;) {
    pageNumber += 1;
    const rows = await input.lemlist.searchContacts({
      listId: input.listId,
      limit: input.pageSize,
      offset,
    });

    for (const row of rows) {
      if (!byId.has(row._id)) byId.set(row._id, row);
    }

    const observation = {
      pageNumber,
      offset,
      limit: input.pageSize,
      returnedIds: rows.map((r) => r._id),
      requestedAt: new Date().toISOString(),
    };
    const before = state;
    state = ingestPage(state, observation, input.alreadyProcessedIds);
    const newThisPage = state.newIds.length - before.newIds.length;

    await recordFetchPage(input.sql, {
      enrichmentRunId: input.enrichmentRunId,
      pageIndex: pageNumber,
      requestedOffset: offset,
      requestedLimit: input.pageSize,
      returnedCount: rows.length,
      newIdCount: newThisPage,
      returnedIdsHash: state.pages[state.pages.length - 1]?.returnedIdSetHash ?? '',
      noProgress: newThisPage === 0,
    });

    if (state.newIds.length >= input.targetNewContacts) break;

    const decision = decideNextPage(state, observation, limits);
    if (decision.action === 'STOP') {
      stopReason = decision.reasonCode;
      break;
    }

    // Advance by the page size we asked for, not by what came back: a short or
    // overlapping page must not stall the cursor or skip a window.
    offset += input.pageSize;
  }

  const wanted = new Set(state.newIds.slice(0, input.targetNewContacts));
  const contacts: LemlistContact[] = [];
  for (const id of wanted) {
    const contact = byId.get(id);
    if (contact !== undefined) contacts.push(contact);
  }

  return { contacts, state, stopReason };
}
