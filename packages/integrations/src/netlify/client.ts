import { createHash } from 'node:crypto';
import type { AppConfig } from '@astra/core';
import { requestJson, DEFAULT_RETRY, NO_RETRY } from '../http.js';
import { ExternalWriteGuard } from '../guard.js';

/**
 * Netlify deployment for prototypes.
 *
 * Verified against https://docs.netlify.com/api-and-cli-guides/api-guides/get-started-with-api/
 * on 2026-08-11. Deploys use the digest flow: POST the SHA1 of each file, then
 * upload only the files Netlify asks for.
 *
 * Site naming is honest by construction: `{company-slug}-prototype-by-astra`,
 * never the company's bare name. A prototype that lives at the company's own
 * name reads as an official site, which is exactly the impression this system
 * must not create.
 */

const INTEGRATION = 'netlify';
const API_BASE = 'https://api.netlify.com/api/v1';

export interface PrototypeFile {
  readonly path: string;
  readonly content: string;
}

export interface DeployResult {
  readonly siteId: string;
  readonly deployId: string;
  readonly siteName: string;
  /** Per-deploy URL. Stable forever, which is what an approval binds to. */
  readonly immutableUrl: string;
  /** Repointed by later deploys, so it is shown but never bound to. */
  readonly friendlyUrl: string;
  readonly deployHash: string;
}

export interface NetlifyClient {
  deployPrototype(input: {
    companySlug: string;
    files: readonly PrototypeFile[];
  }): Promise<DeployResult>;
  archiveSite(siteId: string): Promise<void>;
  deleteSite(siteId: string): Promise<void>;
}

interface SiteResponse {
  readonly id: string;
  readonly name: string;
  readonly ssl_url?: string;
  readonly url?: string;
}

interface DeployResponse {
  readonly id: string;
  readonly required?: readonly string[];
  readonly deploy_ssl_url?: string;
  readonly deploy_url?: string;
  readonly ssl_url?: string;
  readonly url?: string;
}

export class LiveNetlifyClient implements NetlifyClient {
  private readonly guard: ExternalWriteGuard;

  constructor(private readonly config: AppConfig, guard?: ExternalWriteGuard) {
    this.guard = guard ?? new ExternalWriteGuard(config);
  }

  private headers(): Record<string, string> {
    return { authorization: `Bearer ${this.config.NETLIFY_ACCESS_TOKEN}` };
  }

  async deployPrototype(input: {
    companySlug: string;
    files: readonly PrototypeFile[];
  }): Promise<DeployResult> {
    this.guard.assertAllowed('NETLIFY_DEPLOY');

    const siteName = await this.claimSiteName(input.companySlug);
    const site = await requestJson<SiteResponse>(`${API_BASE}/sites`, {
      integration: INTEGRATION,
      method: 'POST',
      headers: this.headers(),
      retry: NO_RETRY,
      body: {
        name: siteName,
        ...(this.config.NETLIFY_TEAM_SLUG ? { account_slug: this.config.NETLIFY_TEAM_SLUG } : {}),
      },
    });

    const digests = new Map<string, string>();
    for (const file of input.files) {
      digests.set(normalizePath(file.path), sha1(file.content));
    }

    const deploy = await requestJson<DeployResponse>(`${API_BASE}/sites/${site.id}/deploys`, {
      integration: INTEGRATION,
      method: 'POST',
      headers: this.headers(),
      retry: NO_RETRY,
      body: { files: Object.fromEntries(digests) },
    });

    // Netlify replies with the digests it does not already have; only those
    // are uploaded, which is why an unchanged redeploy is nearly free.
    for (const requiredDigest of deploy.required ?? []) {
      const file = input.files.find(
        (candidate) => sha1(candidate.content) === requiredDigest,
      );
      if (!file) continue;
      await this.uploadFile(deploy.id, file);
    }

    const immutableUrl = deploy.deploy_ssl_url ?? deploy.deploy_url ?? '';
    const friendlyUrl = site.ssl_url ?? site.url ?? deploy.ssl_url ?? deploy.url ?? immutableUrl;

    return {
      siteId: site.id,
      deployId: deploy.id,
      siteName: site.name,
      immutableUrl,
      friendlyUrl,
      deployHash: deployHashOf(input.files),
    };
  }

  private async uploadFile(deployId: string, file: PrototypeFile): Promise<void> {
    const response = await fetch(
      `${API_BASE}/deploys/${deployId}/files/${normalizePath(file.path).replace(/^\//, '')}`,
      {
        method: 'PUT',
        headers: { ...this.headers(), 'content-type': 'application/octet-stream' },
        body: file.content,
      },
    );
    if (!response.ok) {
      throw new Error(`Netlify file upload failed for ${file.path}: HTTP ${response.status}`);
    }
  }

  /**
   * Find a free site name. On collision a short deterministic suffix is
   * appended rather than a random string, so the URL still reads as a
   * deliberate, human-chosen name.
   */
  private async claimSiteName(companySlug: string): Promise<string> {
    const base = buildSiteName(companySlug, this.config.NETLIFY_SITE_NAME_SUFFIX);
    for (const candidate of siteNameCandidates(base)) {
      if (await this.isNameAvailable(candidate)) return candidate;
    }
    throw new Error(`Could not find an available Netlify site name based on "${base}"`);
  }

  private async isNameAvailable(name: string): Promise<boolean> {
    try {
      await requestJson<SiteResponse>(`${API_BASE}/sites/${name}.netlify.app`, {
        integration: INTEGRATION,
        headers: this.headers(),
        retry: DEFAULT_RETRY,
      });
      return false;
    } catch (error) {
      if (typeof error === 'object' && error !== null && 'status' in error) {
        return (error as { status: number }).status === 404;
      }
      throw error;
    }
  }

  async archiveSite(siteId: string): Promise<void> {
    // Rejecting a prototype does not delete the site: the operator may want to
    // look at it again. It is unpublished and marked, and deletion is a
    // separate, explicit action.
    this.guard.assertAllowed('NETLIFY_DEPLOY');
    await requestJson(`${API_BASE}/sites/${siteId}/unpublish`, {
      integration: INTEGRATION,
      method: 'POST',
      headers: this.headers(),
      retry: NO_RETRY,
    });
  }

  async deleteSite(siteId: string): Promise<void> {
    this.guard.assertAllowed('NETLIFY_DEPLOY');
    await requestJson(`${API_BASE}/sites/${siteId}`, {
      integration: INTEGRATION,
      method: 'DELETE',
      headers: this.headers(),
      retry: NO_RETRY,
    });
  }
}

export function slugifyCompany(name: string): string {
  return name
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40)
    .replace(/-+$/g, '');
}

export function buildSiteName(companySlug: string, suffix: string): string {
  const slug = slugifyCompany(companySlug) || 'concept';
  return `${slug}-${suffix}`.slice(0, 63).replace(/-+$/g, '');
}

/**
 * Collision candidates. `-2`, `-3` and then a short word, all of which look
 * like something a person typed. Never a random hex string.
 */
export function* siteNameCandidates(base: string): Generator<string> {
  yield base;
  for (const suffix of ['-2', '-3', '-alt', '-b', '-concept-2']) {
    yield `${base}${suffix}`.slice(0, 63);
  }
}

function normalizePath(path: string): string {
  return path.startsWith('/') ? path : `/${path}`;
}

function sha1(content: string): string {
  return createHash('sha1').update(content, 'utf8').digest('hex');
}

/** Stable hash of the deployed file set, used to bind an approval to a deploy. */
export function deployHashOf(files: readonly PrototypeFile[]): string {
  const canonical = [...files]
    .sort((a, b) => (a.path < b.path ? -1 : 1))
    .map((file) => `${normalizePath(file.path)}:${sha1(file.content)}`)
    .join('\n');
  return createHash('sha256').update(canonical, 'utf8').digest('hex');
}
