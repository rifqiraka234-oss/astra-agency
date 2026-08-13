import type { AppConfig } from '@astra/core';
import { NO_RETRY, requestJson, type RetryPolicy } from '../http.js';
import { ExternalWriteGuard } from '../guard.js';
import type {
  CreateDraftInput,
  ImportLeadsInput,
  ImportLeadsResult,
  LemlistActivity,
  LemlistCampaign,
  LemlistClient,
  LemlistInboxPage,
  LemlistContact,
  LemlistLead,
  LemlistSequence,
  LemlistTask,
  RegisterWebhookInput,
  SearchContactsInput,
  SendEmailReplyInput,
  SendLinkedInMessageInput,
} from './types.js';

/**
 * Live Lemlist client.
 *
 * Verified against developer.lemlist.com on 2026-08-11:
 *   GET  /api/inbox/{contactId}                 (limit + skip pagination)
 *   POST /api/inbox/{contactId}/drafts?draftOwner=
 *   POST /api/inbox/linkedin                    (sendUserId, leadId, contactId, message)
 *   POST /api/inbox/email                       (replyToActivityId, sendUserMailboxId, ...)
 *   GET  /api/campaigns/{campaignId}/sequences
 *   GET  /api/tasks                             (team wide; filtered locally)
 *   POST /api/hooks
 *
 * Authentication is HTTP basic with an empty username and the API key as the
 * password, which is Lemlist's documented scheme.
 *
 * Every method that writes calls the guard first. Sends use NO_RETRY: a
 * retried send is a duplicate message, and a duplicate message is worse than
 * an unsent one.
 */

const INTEGRATION = 'lemlist';

export class LiveLemlistClient implements LemlistClient {
  private readonly baseUrl: string;
  private readonly authHeader: string;
  private readonly guard: ExternalWriteGuard;

  constructor(private readonly config: AppConfig, guard?: ExternalWriteGuard) {
    this.baseUrl = `${config.LEMLIST_API_BASE_URL.replace(/\/+$/, '')}/api`;
    this.authHeader = `Basic ${Buffer.from(`:${config.LEMLIST_API_KEY}`).toString('base64')}`;
    this.guard = guard ?? new ExternalWriteGuard(config);
  }

  private request<T>(
    path: string,
    init: { method?: string; body?: unknown; retry?: RetryPolicy; query?: Record<string, string | number | boolean | undefined> } = {},
  ): Promise<T> {
    const url = new URL(`${this.baseUrl}${path}`);
    for (const [key, value] of Object.entries(init.query ?? {})) {
      if (value !== undefined) url.searchParams.set(key, String(value));
    }
    return requestJson<T>(url.toString(), {
      integration: INTEGRATION,
      method: init.method ?? 'GET',
      headers: { authorization: this.authHeader },
      body: init.body,
      retry: init.retry,
      // Lemlist rate limits per key; spacing calls is cheaper than being
      // throttled halfway through paginating an inbox.
      minIntervalMs: 120,
    });
  }

  async getLead(leadId: string): Promise<LemlistLead | null> {
    return this.request<LemlistLead | null>(`/leads/${encodeURIComponent(leadId)}`).catch(
      notFoundToNull,
    );
  }

  async getLeadByEmail(email: string): Promise<LemlistLead | null> {
    return this.request<LemlistLead | null>(`/leads/${encodeURIComponent(email)}`).catch(
      notFoundToNull,
    );
  }

  async getCampaign(campaignId: string): Promise<LemlistCampaign | null> {
    return this.request<LemlistCampaign | null>(
      `/campaigns/${encodeURIComponent(campaignId)}`,
    ).catch(notFoundToNull);
  }

  async getCampaignSequences(campaignId: string): Promise<readonly LemlistSequence[]> {
    const response = await this.request<Record<string, LemlistSequence> | LemlistSequence[]>(
      `/campaigns/${encodeURIComponent(campaignId)}/sequences`,
    );
    // The endpoint returns an object keyed by sequence id; tolerate an array
    // too rather than depending on one shape.
    return Array.isArray(response) ? response : Object.values(response ?? {});
  }

  /**
   * Fetch every page of the conversation. A truncated conversation would let
   * the model reply to a fragment of the history, so a page fetch that fails
   * throws rather than returning what it has so far.
   */
  async getAllContactMessages(contactId: string): Promise<readonly LemlistActivity[]> {
    const perPage = 100;
    const collected: LemlistActivity[] = [];
    let skip = 0;

    // Hard bound so a pathological pagination response cannot loop forever.
    for (let page = 0; page < 100; page += 1) {
      const response = await this.request<LemlistInboxPage | LemlistActivity[]>(
        `/inbox/${encodeURIComponent(contactId)}`,
        { query: { limit: perPage, skip, markAsRead: false } },
      );

      const batch = Array.isArray(response)
        ? response
        : (response.messages ?? response.data ?? []);
      collected.push(...batch);

      if (batch.length < perPage) break;
      if (!Array.isArray(response)) {
        const totalPages = response.totalPages ?? null;
        if (totalPages !== null && page + 1 >= totalPages) break;
      }
      skip += perPage;
    }

    return collected;
  }

  /**
   * The tasks endpoint is team wide. Filtering by lead happens locally in
   * `filterTasksForLead`, because a task that carries no identifiers must not
   * be assumed to be unrelated to this conversation.
   */
  async getPendingTasks(filter: { campaignId?: string } = {}): Promise<readonly LemlistTask[]> {
    const filters = filter.campaignId
      ? JSON.stringify([{ campaignId: { in: [filter.campaignId] } }])
      : undefined;
    const collected: LemlistTask[] = [];

    for (let page = 0; page < 20; page += 1) {
      const response = await this.request<LemlistTask[] | { data?: LemlistTask[] }>('/tasks', {
        query: { page, ...(filters ? { filters } : {}) },
      });
      const batch = Array.isArray(response) ? response : (response.data ?? []);
      collected.push(...batch);
      if (batch.length === 0) break;
    }

    return collected.filter((task) => (task.status ?? 'pending') === 'pending');
  }

  async pauseLeadInCampaign(campaignId: string, leadId: string): Promise<void> {
    this.guard.assertAllowed('LEMLIST_PAUSE_LEAD');
    await this.request(
      `/campaigns/${encodeURIComponent(campaignId)}/leads/${encodeURIComponent(leadId)}/pause`,
      { method: 'POST', retry: NO_RETRY },
    );
  }

  async isLeadPaused(campaignId: string, leadId: string): Promise<boolean | null> {
    try {
      const lead = await this.request<LemlistLead | null>(
        `/campaigns/${encodeURIComponent(campaignId)}/leads/${encodeURIComponent(leadId)}`,
      );
      if (lead === null) return null;
      if (typeof lead.isPaused === 'boolean') return lead.isPaused;
      if (typeof lead.state === 'string') return lead.state.toLowerCase() === 'paused';
      // The field we need is absent: report "unknown" rather than "not paused".
      return null;
    } catch {
      return null;
    }
  }

  async createDraft(input: CreateDraftInput): Promise<{ draftId: string }> {
    this.guard.assertAllowed('LEMLIST_DRAFT');
    return this.request<{ draftId: string }>(
      `/inbox/${encodeURIComponent(input.contactId)}/drafts`,
      {
        method: 'POST',
        retry: NO_RETRY,
        query: { draftOwner: input.draftOwner },
        body: {
          channel: input.channel,
          content: input.content,
          ...(input.subject === undefined ? {} : { subject: input.subject }),
          ...(input.replyToActivityId === undefined
            ? {}
            : { replyToActivityId: input.replyToActivityId }),
        },
      },
    );
  }

  async sendLinkedInMessage(input: SendLinkedInMessageInput): Promise<{ ok: boolean }> {
    this.guard.assertAllowed('LEMLIST_SEND');
    return this.request<{ ok: boolean }>('/inbox/linkedin', {
      method: 'POST',
      retry: NO_RETRY,
      body: input,
    });
  }

  async sendEmailReply(input: SendEmailReplyInput): Promise<{ ok: boolean; activityId?: string }> {
    this.guard.assertAllowed('LEMLIST_SEND');
    if (input.replyToActivityId === 'latest') {
      // Defensive: the API accepts "latest", this system never does. Under
      // concurrency "latest" can thread onto a message we have not analyzed.
      throw new Error('replyToActivityId "latest" is not permitted; pass the exact activity id');
    }
    return this.request<{ ok: boolean; activityId?: string }>('/inbox/email', {
      method: 'POST',
      retry: NO_RETRY,
      body: input,
    });
  }

  async registerWebhook(input: RegisterWebhookInput): Promise<{ _id: string }> {
    this.guard.assertAllowed('LEMLIST_WEBHOOK_REGISTER');
    return this.request<{ _id: string }>('/hooks', {
      method: 'POST',
      retry: NO_RETRY,
      ...(input.campaignId === undefined ? {} : { query: { campaignId: input.campaignId } }),
      body: {
        targetUrl: input.targetUrl,
        type: input.type,
        secret: input.secret,
      },
    });
  }

  async searchContacts(input: SearchContactsInput): Promise<readonly LemlistContact[]> {
    const rows = await this.request<readonly LemlistContact[] | { contacts?: readonly LemlistContact[] }>(
      '/database/contacts',
      { query: { listId: input.listId, limit: input.limit, offset: input.offset } },
    );
    // The endpoint has returned both a bare array and an envelope depending on
    // account shape. Accept either rather than throwing on a working response.
    if (Array.isArray(rows)) return rows;
    return (rows as { contacts?: readonly LemlistContact[] }).contacts ?? [];
  }

  async importLeadsToCampaign(input: ImportLeadsInput): Promise<ImportLeadsResult> {
    this.guard.assertAllowed('LEMLIST_CAMPAIGN_IMPORT');
    try {
      const response = await this.request<{ imported?: number; leadIds?: readonly string[] }>(
        `/campaigns/${encodeURIComponent(input.campaignId)}/leads/import`,
        {
          method: 'POST',
          // An import is not idempotent server side, so a blind retry would
          // duplicate leads. A timeout is reconciled by querying, never retried.
          retry: NO_RETRY,
          body: {
            leads: input.rows,
            columnMapping: input.columnMapping,
            idempotencyKey: input.idempotencyKey,
          },
        },
      );
      return {
        imported: response.imported ?? input.rows.length,
        leadIds: response.leadIds ?? [],
      };
    } catch (error) {
      const blocked = policyBlockMessage(error);
      if (blocked !== null) {
        // Surfaced, never routed around: substituting another operation to get
        // the same effect would be circumventing the provider's safeguard.
        return { imported: 0, leadIds: [], policyBlocked: blocked };
      }
      throw error;
    }
  }

  async addUnsubscribe(email: string): Promise<void> {
    // Suppression is always permitted: refusing to record an unsubscribe
    // because a flag is off would be the wrong failure direction.
    await this.request(`/unsubscribes/${encodeURIComponent(email)}`, {
      method: 'POST',
      retry: NO_RETRY,
    });
  }
}

/**
 * A 403 carrying a policy or classifier message is a refusal, not a transport
 * failure, and the two need different handling.
 */
function policyBlockMessage(error: unknown): string | null {
  if (typeof error !== 'object' || error === null) return null;
  const status = 'status' in error ? (error as { status: unknown }).status : undefined;
  if (status !== 403 && status !== 422) return null;
  const message = 'message' in error ? String((error as { message: unknown }).message) : '';
  return /polic|classif|blocked|not permitted/i.test(message) ? message : null;
}

function notFoundToNull(error: unknown): null {
  if (typeof error === 'object' && error !== null && 'status' in error) {
    const status = (error as { status: number }).status;
    if (status === 404) return null;
  }
  throw error;
}
