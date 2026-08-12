/**
 * Website quality taxonomy (specification section 7.4).
 *
 * Exactly one value per assessment. The distinction that matters most is
 * between `NOT_WORKING` and `UNKNOWN`: a site that genuinely returns an error
 * to the public is a finding Astra can act on, whereas a site *we* could not
 * reach — proxy block, timeout, rate limit — tells us nothing about the
 * prospect and must never be graded as a broken site. Historically that
 * conflation turned our own network failures into prospect-facing claims.
 *
 * `NO_WEBSITE` is positive evidence, not a research failure: it is the single
 * strongest Astra angle in the qualified set.
 */

export const WEBSITE_CLASSES = [
  'NO_WEBSITE',
  'NOT_WORKING',
  'PLACEHOLDER',
  'BASIC',
  'DECENT',
  'STRONG',
  'UNKNOWN',
] as const;
export type WebsiteClass = (typeof WEBSITE_CLASSES)[number];

export const WEBSITE_CONFIDENCES = ['HIGH', 'MEDIUM', 'LOW'] as const;
export type WebsiteConfidence = (typeof WEBSITE_CONFIDENCES)[number];

/** Site states that give Astra a credible, non-invented angle. */
export const ASTRA_ANGLE_WEBSITE_CLASSES: readonly WebsiteClass[] = [
  'NO_WEBSITE',
  'PLACEHOLDER',
  'BASIC',
];

export interface WebsiteObservation {
  /** The domain actually fetched, or null when no domain could be resolved. */
  readonly resolvedDomain: string | null;
  /** True only when our own fetch failed for our own reasons. */
  readonly fetchBlockedOnOurSide: boolean;
  readonly httpStatus: number | null;
  /** Visible text length after boilerplate removal. */
  readonly visibleTextLength: number;
  readonly internalLinkCount: number;
  /** Parking, "coming soon", registrar default, builder splash. */
  readonly parkingOrComingSoonMarkers: readonly string[];
  readonly hasContactPath: boolean;
  readonly hasWorkOrServiceDetail: boolean;
  readonly observedAt: string;
}

export interface WebsiteAssessment {
  readonly websiteClass: WebsiteClass;
  readonly confidence: WebsiteConfidence;
  readonly reasonCodes: readonly string[];
  /**
   * Short factual observations that a message may cite. Anything not in here
   * cannot appear in generated copy.
   */
  readonly supportedObservations: readonly string[];
  readonly offersAstraAngle: boolean;
}

export function classifyWebsite(observation: WebsiteObservation): WebsiteAssessment {
  const reasonCodes: string[] = [];
  const supported: string[] = [];

  // Our own inability to reach a site is never a statement about the site.
  if (observation.fetchBlockedOnOurSide) {
    return {
      websiteClass: 'UNKNOWN',
      confidence: 'LOW',
      reasonCodes: ['WEBSITE_FETCH_BLOCKED_ON_OUR_SIDE'],
      supportedObservations: [],
      offersAstraAngle: false,
    };
  }

  if (observation.resolvedDomain === null) {
    return {
      websiteClass: 'NO_WEBSITE',
      confidence: 'HIGH',
      reasonCodes: ['WEBSITE_NO_DOMAIN_RESOLVED'],
      supportedObservations: ['no website found for the business'],
      offersAstraAngle: true,
    };
  }

  const status = observation.httpStatus;
  if (status === null) {
    return {
      websiteClass: 'UNKNOWN',
      confidence: 'LOW',
      reasonCodes: ['WEBSITE_NO_RESPONSE_OBSERVED'],
      supportedObservations: [],
      offersAstraAngle: false,
    };
  }
  if (status >= 500 || status === 404 || status === 410) {
    return {
      websiteClass: 'NOT_WORKING',
      confidence: 'HIGH',
      reasonCodes: [`WEBSITE_HTTP_${status}`],
      supportedObservations: [`the site at ${observation.resolvedDomain} does not load`],
      offersAstraAngle: false,
    };
  }
  if (status >= 400) {
    return {
      websiteClass: 'UNKNOWN',
      confidence: 'LOW',
      reasonCodes: [`WEBSITE_HTTP_${status}`],
      supportedObservations: [],
      offersAstraAngle: false,
    };
  }

  if (observation.parkingOrComingSoonMarkers.length > 0) {
    reasonCodes.push('WEBSITE_PARKING_OR_COMING_SOON');
    supported.push(`the site at ${observation.resolvedDomain} is still a placeholder page`);
    return {
      websiteClass: 'PLACEHOLDER',
      confidence: 'HIGH',
      reasonCodes,
      supportedObservations: supported,
      offersAstraAngle: true,
    };
  }

  if (observation.visibleTextLength < 400 && observation.internalLinkCount <= 1) {
    reasonCodes.push('WEBSITE_SINGLE_THIN_PAGE');
    supported.push(`the site at ${observation.resolvedDomain} is a single thin page`);
    return {
      websiteClass: 'PLACEHOLDER',
      confidence: 'MEDIUM',
      reasonCodes,
      supportedObservations: supported,
      offersAstraAngle: true,
    };
  }

  if (!observation.hasWorkOrServiceDetail || observation.internalLinkCount <= 4) {
    reasonCodes.push('WEBSITE_MINIMAL_DEPTH');
    if (!observation.hasWorkOrServiceDetail) {
      reasonCodes.push('WEBSITE_NO_WORK_DETAIL');
      supported.push('the site does not show the work in any detail');
    }
    if (!observation.hasContactPath) {
      reasonCodes.push('WEBSITE_NO_CONTACT_PATH');
      supported.push('there is no clear way to get in touch from the site');
    }
    return {
      websiteClass: 'BASIC',
      confidence: observation.internalLinkCount <= 2 ? 'HIGH' : 'MEDIUM',
      reasonCodes,
      supportedObservations: supported,
      offersAstraAngle: true,
    };
  }

  if (observation.internalLinkCount >= 12 && observation.visibleTextLength >= 4000) {
    return {
      websiteClass: 'STRONG',
      confidence: 'HIGH',
      reasonCodes: ['WEBSITE_SUBSTANTIAL'],
      supportedObservations: [],
      offersAstraAngle: false,
    };
  }

  return {
    websiteClass: 'DECENT',
    confidence: 'MEDIUM',
    reasonCodes: ['WEBSITE_ADEQUATE'],
    supportedObservations: [],
    offersAstraAngle: false,
  };
}
