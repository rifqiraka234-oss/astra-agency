import { getPool } from '@astra/db';
import type { AppContext } from '../context.js';

/**
 * Company verification for the post-acceptance path.
 *
 * The policy engine will not allow a personalized first message unless the
 * company's identity is unambiguous, so this runs before the controller
 * decides. It is deliberately conservative: an unreachable site, a name that
 * does not match, or a page carrying instructions aimed at an automated
 * reader all produce "not verified", which downgrades the message to a draft
 * rather than sending a confident claim about the wrong company.
 */

export interface IdentityResult {
  readonly verified: boolean;
  readonly detail: string;
  readonly injectionSuspected: boolean;
  readonly evidenceTerms: readonly string[];
  readonly researchRunId: string | null;
}

export async function verifyCompanyIdentity(
  context: AppContext,
  input: {
    conversationId: string;
    contactId: string;
    companyName: string | null;
    companyDomain: string | null;
    correlationId: string;
  },
): Promise<IdentityResult> {
  if (!input.companyName || !input.companyDomain) {
    return {
      verified: false,
      detail: 'No company name or website is recorded for this contact.',
      injectionSuspected: false,
      evidenceTerms: [],
      researchRunId: null,
    };
  }

  const pool = getPool();
  const run = await pool.query<{ id: string }>(
    `INSERT INTO research_runs (conversation_id, contact_id, purpose, correlation_id)
     VALUES ($1,$2,'IDENTITY_VERIFICATION',$3) RETURNING id`,
    [input.conversationId, input.contactId, input.correlationId],
  );
  const researchRunId = run.rows[0]?.id ?? null;

  const url = `https://${input.companyDomain.replace(/^https?:\/\//, '').replace(/\/+$/, '')}`;
  const result = await context.research.verifyIdentity({ url, companyName: input.companyName });

  if (result.source && researchRunId) {
    await pool.query(
      `INSERT INTO research_sources
         (research_run_id, url, page_title, retrieved_at, excerpt, confidence, injection_suspected)
       VALUES ($1,$2,$3,$4,$5,$6,$7)`,
      [
        researchRunId,
        result.source.url,
        result.source.pageTitle,
        result.source.retrievedAt,
        result.source.excerpt,
        result.source.confidence,
        result.source.injectionSuspected,
      ],
    );
  }

  const injectionSuspected = result.source?.injectionSuspected ?? false;

  if (researchRunId) {
    await pool.query(
      `UPDATE research_runs
       SET status = $2, company_identity_verified = $3, summary = $4, finished_at = now()
       WHERE id = $1`,
      [
        researchRunId,
        result.verified ? 'SUCCEEDED' : 'AMBIGUOUS',
        result.verified,
        result.detail,
      ],
    );
  }

  // Terms the evidence actually supports, used by the content checker to
  // reject any observation the research never made.
  const evidenceTerms = result.source
    ? extractObservableTerms(result.source.text)
    : [];

  return {
    verified: result.verified && !injectionSuspected,
    detail: result.detail,
    injectionSuspected,
    evidenceTerms,
    researchRunId,
  };
}

/**
 * The page nouns a message may legitimately refer to. Anything the agent
 * claims to have "noticed" has to be one of these or come from an evidence
 * row, otherwise the pre-send checks reject it as an unsupported claim.
 */
const OBSERVABLE_TERMS = [
  'homepage',
  'home page',
  'booking page',
  'booking flow',
  'checkout',
  'pricing page',
  'contact page',
  'about page',
  'menu',
  'shop',
  'blog',
  'portfolio',
  'case studies',
  'newsletter',
  'navigation',
  'headline',
  'call to action',
  'form',
  'gallery',
  'testimonials',
  'site',
  'website',
];

export function extractObservableTerms(pageText: string): string[] {
  const lower = pageText.toLowerCase();
  return OBSERVABLE_TERMS.filter((term) => lower.includes(term));
}
