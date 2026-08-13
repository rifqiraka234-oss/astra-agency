import type {
  CreateDraftInput,
  ImportLeadsInput,
  ImportLeadsResult,
  LemlistActivity,
  LemlistCampaign,
  LemlistClient,
  LemlistLead,
  LemlistContact,
  LemlistSequence,
  LemlistTask,
  RegisterWebhookInput,
  SearchContactsInput,
  SendEmailReplyInput,
  SendLinkedInMessageInput,
} from './types.js';

/**
 * In-memory Lemlist used by TEST mode and the whole test suite.
 *
 * It records every call so a test can assert that a send did *not* happen,
 * which is the assertion that matters most here. It also models the two
 * behaviours that cause real incidents: a pause call that reports success
 * without actually pausing, and pagination.
 */

export interface FakeLemlistState {
  leads: Map<string, LemlistLead>;
  campaigns: Map<string, LemlistCampaign>;
  sequences: Map<string, LemlistSequence[]>;
  messages: Map<string, LemlistActivity[]>;
  tasks: LemlistTask[];
  pausedLeads: Set<string>;
  /** When set, `pauseLeadInCampaign` succeeds but the lead never reports paused. */
  pauseSilentlyFails: boolean;
  /** When set, `isLeadPaused` returns null, simulating an unverifiable state. */
  pauseUnverifiable: boolean;
  /** Contacts by list id, used to model the real pagination behavior. */
  contactLists: Map<string, LemlistContact[]>;
  /**
   * When set, every page returned overlaps the previous one by this many rows,
   * reproducing the observed offset instability rather than assuming pages are
   * disjoint.
   */
  pageOverlap: number;
  /** When set, `importLeadsToCampaign` returns a policy refusal. */
  importPolicyBlocked: string | null;
  importedLeads: { campaignId: string; rows: unknown[]; idempotencyKey: string }[];
}

export interface RecordedCall {
  readonly method: string;
  readonly payload: unknown;
  readonly at: Date;
}

export class FakeLemlistClient implements LemlistClient {
  readonly calls: RecordedCall[] = [];
  readonly state: FakeLemlistState;

  constructor(initial: Partial<FakeLemlistState> = {}) {
    this.state = {
      leads: initial.leads ?? new Map(),
      campaigns: initial.campaigns ?? new Map(),
      sequences: initial.sequences ?? new Map(),
      messages: initial.messages ?? new Map(),
      tasks: initial.tasks ?? [],
      pausedLeads: initial.pausedLeads ?? new Set(),
      pauseSilentlyFails: initial.pauseSilentlyFails ?? false,
      pauseUnverifiable: initial.pauseUnverifiable ?? false,
      contactLists: initial.contactLists ?? new Map(),
      pageOverlap: initial.pageOverlap ?? 0,
      importPolicyBlocked: initial.importPolicyBlocked ?? null,
      importedLeads: initial.importedLeads ?? [],
    };
  }

  private record(method: string, payload: unknown): void {
    this.calls.push({ method, payload, at: new Date() });
  }

  callsTo(method: string): RecordedCall[] {
    return this.calls.filter((call) => call.method === method);
  }

  get sentMessages(): RecordedCall[] {
    return this.calls.filter(
      (call) => call.method === 'sendLinkedInMessage' || call.method === 'sendEmailReply',
    );
  }

  async getLead(leadId: string): Promise<LemlistLead | null> {
    this.record('getLead', { leadId });
    return this.state.leads.get(leadId) ?? null;
  }

  async getLeadByEmail(email: string): Promise<LemlistLead | null> {
    this.record('getLeadByEmail', { email });
    for (const lead of this.state.leads.values()) {
      if (lead.email?.toLowerCase() === email.toLowerCase()) return lead;
    }
    return null;
  }

  async getCampaign(campaignId: string): Promise<LemlistCampaign | null> {
    this.record('getCampaign', { campaignId });
    return this.state.campaigns.get(campaignId) ?? null;
  }

  async getCampaignSequences(campaignId: string): Promise<readonly LemlistSequence[]> {
    this.record('getCampaignSequences', { campaignId });
    return this.state.sequences.get(campaignId) ?? [];
  }

  async getAllContactMessages(contactId: string): Promise<readonly LemlistActivity[]> {
    this.record('getAllContactMessages', { contactId });
    return this.state.messages.get(contactId) ?? [];
  }

  async getPendingTasks(filter: { campaignId?: string } = {}): Promise<readonly LemlistTask[]> {
    this.record('getPendingTasks', filter);
    return this.state.tasks;
  }

  async pauseLeadInCampaign(campaignId: string, leadId: string): Promise<void> {
    this.record('pauseLeadInCampaign', { campaignId, leadId });
    if (!this.state.pauseSilentlyFails) {
      this.state.pausedLeads.add(`${campaignId}:${leadId}`);
    }
  }

  async isLeadPaused(campaignId: string, leadId: string): Promise<boolean | null> {
    this.record('isLeadPaused', { campaignId, leadId });
    if (this.state.pauseUnverifiable) return null;
    return this.state.pausedLeads.has(`${campaignId}:${leadId}`);
  }

  async createDraft(input: CreateDraftInput): Promise<{ draftId: string }> {
    this.record('createDraft', input);
    return { draftId: `drf_fake_${this.calls.length}` };
  }

  async sendLinkedInMessage(input: SendLinkedInMessageInput): Promise<{ ok: boolean }> {
    this.record('sendLinkedInMessage', input);
    return { ok: true };
  }

  async sendEmailReply(input: SendEmailReplyInput): Promise<{ ok: boolean; activityId?: string }> {
    this.record('sendEmailReply', input);
    return { ok: true, activityId: `act_fake_${this.calls.length}` };
  }

  async registerWebhook(input: RegisterWebhookInput): Promise<{ _id: string }> {
    this.record('registerWebhook', { ...input, secret: '[REDACTED]' });
    return { _id: `hok_fake_${this.calls.length}` };
  }

  async addUnsubscribe(email: string): Promise<void> {
    this.record('addUnsubscribe', { email });
  }

  /**
   * Models the behavior that actually bit us: consecutive pages overlap, so a
   * consumer that trusts offset arithmetic double-processes rows and a
   * consumer that stops on an all-duplicates page truncates the list.
   */
  async searchContacts(input: SearchContactsInput): Promise<readonly LemlistContact[]> {
    this.record('searchContacts', input);
    const all = this.state.contactLists.get(input.listId) ?? [];
    const start = Math.max(0, input.offset - this.state.pageOverlap);
    return all.slice(start, start + input.limit);
  }

  async importLeadsToCampaign(input: ImportLeadsInput): Promise<ImportLeadsResult> {
    this.record('importLeadsToCampaign', {
      campaignId: input.campaignId,
      rowCount: input.rows.length,
      columnMapping: input.columnMapping,
      idempotencyKey: input.idempotencyKey,
    });

    if (this.state.importPolicyBlocked !== null) {
      return { imported: 0, leadIds: [], policyBlocked: this.state.importPolicyBlocked };
    }

    this.state.importedLeads.push({
      campaignId: input.campaignId,
      rows: [...input.rows],
      idempotencyKey: input.idempotencyKey,
    });
    return {
      imported: input.rows.length,
      leadIds: input.rows.map((_, index) => `lea_fake_${String(this.calls.length)}_${String(index)}`),
    };
  }
}
