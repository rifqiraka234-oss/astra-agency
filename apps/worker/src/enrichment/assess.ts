import { classifyWebsite, type WebsiteAssessment, type WebsiteObservation } from '@astra/core';
import type { ResearchAdapter, ResearchSource } from '@astra/integrations';

/**
 * Turns a fetched page into the structural observation the classifier wants.
 *
 * The important line in this file is the one that distinguishes a page we could
 * not reach from a page that is broken. The adapter returning `null` means *we*
 * failed, and that must produce `UNKNOWN`, never `NOT_WORKING`. Getting that
 * backwards would put our own network problems into prospect-facing copy.
 */

const PARKING_MARKERS: readonly RegExp[] = [
  /\bcoming soon\b/i,
  /\bunder construction\b/i,
  /\bthis domain (is|has been) (parked|registered)\b/i,
  /\bwebsite is being built\b/i,
  /\bplaceholder\b/i,
  /\bbuy this domain\b/i,
  /\bdefault (web ?)?page\b/i,
  /\bsite coming\b/i,
];

const WORK_DETAIL_MARKERS: readonly RegExp[] = [
  /\b(case stud|portfolio|our work|projects?|services?|what we do)\b/i,
];

const CONTACT_MARKERS: readonly RegExp[] = [/\b(contact|get in touch|enquir|inquir|book a)\b/i];

export interface AssessWebsiteInput {
  readonly research: ResearchAdapter;
  readonly domain: string | null;
  readonly observedAt?: string;
}

export interface AssessWebsiteResult {
  readonly assessment: WebsiteAssessment;
  readonly source: ResearchSource | null;
  readonly adapterUsed: string;
  readonly fetchSucceeded: boolean;
}

export async function assessWebsite(input: AssessWebsiteInput): Promise<AssessWebsiteResult> {
  const observedAt = input.observedAt ?? new Date().toISOString();

  if (input.domain === null || input.domain.trim().length === 0) {
    const observation: WebsiteObservation = {
      resolvedDomain: null,
      fetchBlockedOnOurSide: false,
      httpStatus: null,
      visibleTextLength: 0,
      internalLinkCount: 0,
      parkingOrComingSoonMarkers: [],
      hasContactPath: false,
      hasWorkOrServiceDetail: false,
      observedAt,
    };
    return {
      assessment: classifyWebsite(observation),
      source: null,
      adapterUsed: 'none',
      fetchSucceeded: true,
    };
  }

  const url = input.domain.startsWith('http') ? input.domain : `https://${input.domain}`;
  let source: ResearchSource | null = null;
  let fetchThrew = false;
  try {
    source = await input.research.fetchPage(url);
  } catch {
    fetchThrew = true;
  }

  if (source === null) {
    // We could not read it. That is a statement about us, not about them.
    const observation: WebsiteObservation = {
      resolvedDomain: input.domain,
      fetchBlockedOnOurSide: true,
      httpStatus: null,
      visibleTextLength: 0,
      internalLinkCount: 0,
      parkingOrComingSoonMarkers: [],
      hasContactPath: false,
      hasWorkOrServiceDetail: false,
      observedAt,
    };
    return {
      assessment: classifyWebsite(observation),
      source: null,
      adapterUsed: 'research.fetchPage',
      fetchSucceeded: !fetchThrew,
    };
  }

  const text = source.text;
  const observation: WebsiteObservation = {
    resolvedDomain: input.domain,
    fetchBlockedOnOurSide: false,
    httpStatus: 200,
    visibleTextLength: text.trim().length,
    internalLinkCount: countInternalLinks(text),
    parkingOrComingSoonMarkers: PARKING_MARKERS.filter((p) => p.test(text)).map((p) => p.source),
    hasContactPath: CONTACT_MARKERS.some((p) => p.test(text)),
    hasWorkOrServiceDetail: WORK_DETAIL_MARKERS.some((p) => p.test(text)),
    observedAt,
  };

  return {
    assessment: classifyWebsite(observation),
    source,
    adapterUsed: 'research.fetchPage',
    fetchSucceeded: true,
  };
}

/**
 * The adapter hands back sanitized plain text rather than a DOM, so link count
 * is approximated from the navigation-like lines it preserves. It is a
 * proportionality signal, not a precise count, and the classifier treats it as
 * one.
 */
function countInternalLinks(text: string): number {
  const navWords = text.match(
    /\b(home|about|work|projects?|services?|contact|blog|news|team|pricing|shop|cases?|portfolio|careers?|faq)\b/gi,
  );
  return navWords === null ? 0 : new Set(navWords.map((w) => w.toLowerCase())).size;
}
