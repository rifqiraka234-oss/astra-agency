import {
  buildSiteName,
  deployHashOf,
  siteNameCandidates,
  type DeployResult,
  type NetlifyClient,
  type PrototypeFile,
} from './client.js';

/**
 * In-memory Netlify. Models name collisions, because the collision path is
 * what decides whether a prototype URL ends up looking like a company's
 * official site or like a clearly-labelled concept.
 */
export class FakeNetlifyClient implements NetlifyClient {
  readonly deploys: DeployResult[] = [];
  readonly archived: string[] = [];
  readonly deleted: string[] = [];
  /** Names already taken, to force the collision path. */
  readonly takenNames = new Set<string>();

  constructor(private readonly suffix = 'prototype-by-astra') {}

  async deployPrototype(input: {
    companySlug: string;
    files: readonly PrototypeFile[];
  }): Promise<DeployResult> {
    const base = buildSiteName(input.companySlug, this.suffix);
    let siteName: string | null = null;
    for (const candidate of siteNameCandidates(base)) {
      if (!this.takenNames.has(candidate)) {
        siteName = candidate;
        break;
      }
    }
    if (siteName === null) throw new Error('no available site name');
    this.takenNames.add(siteName);

    const deployId = `dep_fake_${this.deploys.length + 1}`;
    const result: DeployResult = {
      siteId: `site_fake_${this.deploys.length + 1}`,
      deployId,
      siteName,
      immutableUrl: `https://${deployId}--${siteName}.netlify.app`,
      friendlyUrl: `https://${siteName}.netlify.app`,
      deployHash: deployHashOf(input.files),
    };
    this.deploys.push(result);
    return result;
  }

  async archiveSite(siteId: string): Promise<void> {
    this.archived.push(siteId);
  }

  async deleteSite(siteId: string): Promise<void> {
    this.deleted.push(siteId);
  }
}
