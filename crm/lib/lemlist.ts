/**
 * lib/lemlist.ts, a READ ONLY lemlist API client (agent E).
 *
 *   import { lemlist } from '@/lib/lemlist';
 *   const campaigns = await lemlist.campaigns();                    // every campaign, any status
 *   const leads = await lemlist.campaignLeadIds('cam_...');         // leadId, contactId, state
 *   const rich = await lemlist.campaignLeadsExport('cam_...');      // company, job title, LinkedIn
 *   const accepts = await lemlist.acceptEvents('cam_...');          // linkedinInviteAccepted events
 *   const contact = await lemlist.contact('ctc_...');               // the team level contact record
 *   const thread = await lemlist.thread('ctc_...');                 // EVERY page, oldest first, checked
 *
 * Safety. This client only ever issues GET. request() throws on any other method
 * before a socket is opened, so no code path here can send, update or delete
 * anything in lemlist. Nothing in V1 sends a message (SPEC.md hard rule 1).
 *
 * Auth. Mirrors tools/lemlist.py: the container's HTTPS proxy injects the team's
 * key (Basic auth) for api.lemlist.com, so no header is sent from here. If
 * LEMLIST_API_KEY is set (somewhere without that proxy) it is sent as Basic
 * auth with an empty user, which is lemlist's scheme.
 *
 * Transport. Node's fetch ignores HTTPS_PROXY, so requests go through an
 * explicit CONNECT tunnel to the proxy when HTTPS_PROXY is set, trusting the
 * proxy's CA from NODE_EXTRA_CA_CERTS (or /root/.ccr/ca-bundle.crt). Without a
 * proxy it is a plain HTTPS request.
 *
 * Limits. At most 20 requests per 2 seconds, Retry-After honoured on 429, 5xx
 * and network errors retried with backoff.
 *
 * Traps handled (docs/lemlist-field-index.md):
 *   * an inbox thread pages newest first, 10 per page; thread() pages to the end
 *     and reports totalItems so the caller can check the count;
 *   * the text of an item is in `message` (sent through lemlist) or `text`
 *     (synced from LinkedIn, which includes their replies), itemText() reads both;
 *   * a wrong route answers 200 with HTML, which is raised as an error, never
 *     read as "no data";
 *   * the lead export needs a state, state=all returns every lead;
 *   * contactId (ctc_) is the person, leadId (lea_) is their seat in one campaign.
 */
import fs from 'node:fs';
import http from 'node:http';
import tls from 'node:tls';

const API_HOST = 'api.lemlist.com';
const API_BASE = `https://${API_HOST}/api`;

export class LemlistError extends Error {
  constructor(
    message: string,
    public status: number | null,
    public path: string,
    public bodySnippet = '',
  ) {
    super(message);
    this.name = 'LemlistError';
  }
}

// ---------------------------------------------------------------- types

export type LemlistCampaign = { _id: string; name: string; status: string; createdAt?: string; createdBy?: string };

export type LemlistLeadId = { _id: string; contactId: string | null; createdAt?: string; state?: string };

/** One row of GET /campaigns/<id>/export/leads?state=all&format=json. Fields vary per campaign. */
export type LemlistLeadExport = {
  _id: string;
  firstName?: string;
  lastName?: string;
  jobTitle?: string;
  tagline?: string;
  linkedinUrl?: string;
  email?: string;
  companyName?: string;
  companyDomain?: string;
  companyWebsite?: string;
  companyWebsiteUrl?: string;
  companyIndustry?: string;
  companyLinkedinUrl?: string;
  companySize?: string;
  location?: string;
  timezone?: string;
  state?: string;
  stateSystem?: string;
  [key: string]: unknown;
};

export type LemlistActivity = {
  _id: string;
  type: string;
  createdAt: string;
  contactId?: string | null;
  leadId?: string | null;
  campaignId?: string | null;
  campaignName?: string | null;
  sendUserId?: string | null;
  sendUserName?: string | null;
  emailTemplateName?: string | null;
  message?: string | null;
  text?: string | null;
  [key: string]: unknown;
};

export type LemlistContact = {
  _id: string;
  fullName?: string;
  linkedinUrl?: string;
  ownerId?: string;
  campaigns?: unknown[];
  unsubscribed?: boolean;
  fields?: {
    firstName?: string;
    lastName?: string;
    jobTitle?: string;
    tagline?: string;
    location?: string;
    industry?: string;
    email?: string;
    leadStatus?: string;
    lastRepliedDate?: string;
    [key: string]: unknown;
  };
  [key: string]: unknown;
};

export type LemlistThread = {
  contactId: string;
  /** Every item, oldest first. */
  items: LemlistActivity[];
  /** What lemlist says the thread holds. items.length must equal this. */
  totalItems: number;
  pages: number;
  /** True when the pulled count equals totalItems and no id repeats. */
  complete: boolean;
  problem: string | null;
};

// ---------------------------------------------------------------- transport

const WINDOW_MS = 2000;
const MAX_PER_WINDOW = 20;
const stamps: number[] = [];

/** Sliding window limiter, 20 requests per 2 seconds for this process. */
async function throttle(): Promise<void> {
  for (;;) {
    const now = Date.now();
    while (stamps.length && now - stamps[0] >= WINDOW_MS) stamps.shift();
    if (stamps.length < MAX_PER_WINDOW) {
      stamps.push(now);
      return;
    }
    await sleep(WINDOW_MS - (now - stamps[0]) + 5);
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

let caCache: (string | Buffer)[] | null = null;
function trustedCas(): (string | Buffer)[] | undefined {
  if (caCache) return caCache;
  const file = process.env.NODE_EXTRA_CA_CERTS || '/root/.ccr/ca-bundle.crt';
  try {
    if (fs.existsSync(file)) {
      caCache = [...tls.rootCertificates, fs.readFileSync(file)];
      return caCache;
    }
  } catch {
    /* fall back to the defaults */
  }
  return undefined;
}

type RawResponse = { status: number; headers: http.IncomingHttpHeaders; body: string };

function proxyUrl(): URL | null {
  const raw = process.env.HTTPS_PROXY || process.env.https_proxy;
  if (!raw) return null;
  const noProxy = (process.env.NO_PROXY || process.env.no_proxy || '').split(',').map((s) => s.trim().toLowerCase());
  if (noProxy.some((h) => h && (h === API_HOST || (h.startsWith('.') && API_HOST.endsWith(h))))) return null;
  try {
    return new URL(raw);
  } catch {
    return null;
  }
}

function authHeader(): Record<string, string> {
  const key = process.env.LEMLIST_API_KEY;
  if (!key) return {};
  return { Authorization: `Basic ${Buffer.from(`:${key}`).toString('base64')}` };
}

/** Open a TLS socket to api.lemlist.com, through the proxy when one is set. */
function connect(timeoutMs: number): Promise<tls.TLSSocket> {
  const proxy = proxyUrl();
  const ca = trustedCas();
  if (!proxy) {
    return new Promise((resolve, reject) => {
      const s = tls.connect({ host: API_HOST, port: 443, servername: API_HOST, ca, ALPNProtocols: ['http/1.1'] }, () => resolve(s));
      s.setTimeout(timeoutMs, () => s.destroy(new Error('connect timeout')));
      s.once('error', reject);
    });
  }
  return new Promise((resolve, reject) => {
    const headers: Record<string, string> = { Host: `${API_HOST}:443` };
    if (proxy.username) {
      headers['Proxy-Authorization'] = `Basic ${Buffer.from(`${decodeURIComponent(proxy.username)}:${decodeURIComponent(proxy.password)}`).toString('base64')}`;
    }
    const req = http.request({
      host: proxy.hostname,
      port: Number(proxy.port || 80),
      method: 'CONNECT',
      path: `${API_HOST}:443`,
      headers,
      timeout: timeoutMs,
    });
    req.once('connect', (res, socket) => {
      if (res.statusCode !== 200) {
        socket.destroy();
        reject(new LemlistError(`Proxy refused the tunnel, HTTP ${res.statusCode}`, res.statusCode ?? null, ''));
        return;
      }
      const s = tls.connect({ socket, servername: API_HOST, ca, ALPNProtocols: ['http/1.1'] }, () => resolve(s));
      s.once('error', reject);
    });
    req.once('timeout', () => req.destroy(new Error('proxy connect timeout')));
    req.once('error', reject);
    req.end();
  });
}

async function rawGet(path: string, timeoutMs = 45_000): Promise<RawResponse> {
  const socket = await connect(timeoutMs);
  return new Promise((resolve, reject) => {
    // Plain http over the already secured socket. https.request would wrap it in TLS a second time.
    const req = http.request(
      {
        host: API_HOST,
        port: 443,
        method: 'GET',
        path: `/api${path}`,
        headers: { Accept: 'application/json', 'User-Agent': 'astra-crm-sync/1', Connection: 'close', ...authHeader() },
        createConnection: () => socket,
        timeout: timeoutMs,
        // No agent, so createConnection is used. With agent: false Node opens its own socket and skips the proxy.
      },
      (res) => {
        const chunks: Buffer[] = [];
        res.on('data', (c: Buffer) => chunks.push(c));
        res.on('end', () => resolve({ status: res.statusCode ?? 0, headers: res.headers, body: Buffer.concat(chunks).toString('utf8') }));
        res.on('error', reject);
      },
    );
    req.once('timeout', () => req.destroy(new Error('request timeout')));
    req.once('error', reject);
    req.end();
  });
}

export type RequestOptions = { method?: string; retries?: number };

/** Count of HTTP requests made by this process, for sync reports. */
export const requestStats = { requests: 0, retries: 0, rateLimited: 0 };

/**
 * GET a lemlist API path (relative to /api) and parse JSON. Any method other
 * than GET throws before anything is sent.
 */
export async function request<T = unknown>(path: string, opts: RequestOptions = {}): Promise<T> {
  const method = (opts.method ?? 'GET').toUpperCase();
  if (method !== 'GET') {
    throw new LemlistError(`lemlist client is read only, refused ${method} ${path}`, null, path);
  }
  if (!path.startsWith('/')) throw new LemlistError('path must start with /', null, path);
  const retries = opts.retries ?? 5;
  let lastErr: unknown = null;
  for (let attempt = 0; attempt <= retries; attempt++) {
    await throttle();
    requestStats.requests++;
    let res: RawResponse;
    try {
      res = await rawGet(path);
    } catch (err) {
      lastErr = err;
      if (err instanceof LemlistError && err.status && err.status !== 502 && err.status !== 503) throw err;
      requestStats.retries++;
      await sleep(Math.min(30_000, 1000 * 2 ** attempt));
      continue;
    }
    if (res.status === 429) {
      requestStats.rateLimited++;
      const ra = Number(res.headers['retry-after']);
      await sleep(Number.isFinite(ra) && ra > 0 ? ra * 1000 : Math.min(30_000, 2000 * 2 ** attempt));
      continue;
    }
    if (res.status >= 500 || res.status === 0) {
      lastErr = new LemlistError(`lemlist answered HTTP ${res.status}`, res.status, path, res.body.slice(0, 200));
      requestStats.retries++;
      await sleep(Math.min(30_000, 1000 * 2 ** attempt));
      continue;
    }
    if (res.status !== 200) {
      throw new LemlistError(`lemlist answered HTTP ${res.status} on ${path}`, res.status, path, res.body.slice(0, 300));
    }
    try {
      return JSON.parse(res.body) as T;
    } catch {
      // lemlist answers an unknown route with its app HTML and a 200.
      throw new LemlistError(`Not JSON from ${path}, the route probably does not exist`, 200, path, res.body.slice(0, 120));
    }
  }
  if (lastErr instanceof Error) throw lastErr;
  throw new LemlistError(`lemlist kept failing on ${path}`, null, path);
}

// ---------------------------------------------------------------- helpers

/** The text of a thread item. Sent through lemlist it is `message`, synced from LinkedIn it is `text`. */
export function itemText(a: Pick<LemlistActivity, 'message' | 'text'>): string {
  return (a.message || a.text || '').toString();
}

/** lemlist counts length in UTF-16 code units, like JavaScript's String length. */
export function u16Length(s: string): number {
  return s.length;
}

async function campaigns(): Promise<LemlistCampaign[]> {
  const out: LemlistCampaign[] = [];
  for (let page = 1; page < 50; page++) {
    const d = await request<{ campaigns: LemlistCampaign[]; pagination?: { nextPage?: number; totalPage?: number } }>(
      `/campaigns?version=v2&limit=100&page=${page}`,
    );
    out.push(...(d.campaigns ?? []));
    const p = d.pagination;
    if (!p || !p.totalPage || page >= p.totalPage) break;
  }
  return out;
}

async function campaignLeadIds(campaignId: string): Promise<LemlistLeadId[]> {
  const out: LemlistLeadId[] = [];
  const limit = 100;
  for (let offset = 0; offset < 200_000; offset += limit) {
    const rows = await request<LemlistLeadId[]>(`/campaigns/${encodeURIComponent(campaignId)}/leads?limit=${limit}&offset=${offset}`);
    if (!Array.isArray(rows)) throw new LemlistError('Unexpected shape for campaign leads', 200, campaignId);
    out.push(...rows);
    if (rows.length < limit) break;
  }
  const ids = new Set(out.map((r) => r._id));
  if (ids.size !== out.length) throw new LemlistError(`Duplicate leads while paging ${campaignId}, a page shifted, run again`, null, campaignId);
  return out;
}

async function campaignLeadsExport(campaignId: string): Promise<LemlistLeadExport[]> {
  const rows = await request<LemlistLeadExport[]>(`/campaigns/${encodeURIComponent(campaignId)}/export/leads?state=all&format=json`);
  if (!Array.isArray(rows)) throw new LemlistError('Unexpected shape for the lead export', 200, campaignId);
  return rows;
}

/** linkedinInviteAccepted events for a campaign. This endpoint is reliable for accepts (field index 6.4). */
async function acceptEvents(campaignId: string, opts: { since?: string } = {}): Promise<LemlistActivity[]> {
  const out: LemlistActivity[] = [];
  const limit = 100;
  for (let offset = 0; offset < 100_000; offset += limit) {
    const q = new URLSearchParams({ version: 'v2', type: 'linkedinInviteAccepted', campaignId, limit: String(limit), offset: String(offset) });
    if (opts.since) q.set('minDate', opts.since);
    const d = await request<LemlistActivity[] | { data?: LemlistActivity[] }>(`/activities?${q.toString()}`);
    const rows = Array.isArray(d) ? d : d.data ?? [];
    out.push(...rows);
    if (rows.length < limit) break;
  }
  const ids = new Set(out.map((r) => r._id));
  if (ids.size !== out.length) throw new LemlistError(`Duplicate accept events in ${campaignId}, paging shifted, run again`, null, campaignId);
  return out;
}

/** Campaign stats over all time. invitationAccepted is the number accept events must reconcile with. */
async function campaignStats(campaignId: string): Promise<{ invitationAccepted?: number; [key: string]: unknown }> {
  const end = new Date(Date.now() + 86_400_000).toISOString().slice(0, 10);
  return request(`/v2/campaigns/${encodeURIComponent(campaignId)}/stats?startDate=2020-01-01&endDate=${end}`);
}

async function contact(contactId: string): Promise<LemlistContact> {
  const d = await request<LemlistContact>(`/contacts/${encodeURIComponent(contactId)}`);
  if (!d || typeof d !== 'object' || !('_id' in d)) throw new LemlistError('Unexpected shape for a contact', 200, contactId);
  return d;
}

/**
 * The whole inbox thread of one contact. lemlist pages it newest first, 10 per
 * page. Every page is pulled until nextPage is null, then the count is checked
 * against totalItems and for repeated ids (a page that shifted mid paging).
 */
async function thread(contactId: string): Promise<LemlistThread> {
  const items: LemlistActivity[] = [];
  let page = 1;
  let totalItems = 0;
  let pages = 0;
  for (let guard = 0; guard < 500; guard++) {
    const d = await request<{ data: LemlistActivity[]; pagination: { totalItems: number; nextPage: number | null } }>(
      `/inbox/${encodeURIComponent(contactId)}?page=${page}`,
    );
    if (!d || !Array.isArray(d.data) || !d.pagination) throw new LemlistError('Unexpected shape for an inbox thread', 200, contactId);
    pages++;
    items.push(...d.data);
    totalItems = Number(d.pagination.totalItems ?? 0);
    if (!d.pagination.nextPage) break;
    page = d.pagination.nextPage;
  }
  const unique = new Set(items.map((a) => a._id)).size;
  let problem: string | null = null;
  if (unique !== items.length) problem = `repeated items, ${items.length} pulled, ${unique} unique`;
  else if (items.length !== totalItems) problem = `pulled ${items.length}, lemlist says ${totalItems}`;
  items.sort((a, b) => (a.createdAt < b.createdAt ? -1 : a.createdAt > b.createdAt ? 1 : 0));
  return { contactId, items, totalItems, pages, complete: problem === null, problem };
}

export const lemlist = { request, campaigns, campaignStats, campaignLeadIds, campaignLeadsExport, acceptEvents, contact, thread };
