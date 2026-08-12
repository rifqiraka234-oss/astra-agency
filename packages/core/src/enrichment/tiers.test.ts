import { describe, expect, it } from 'vitest';
import { NEW_BUSINESSES_PROFILE, initialLaunchHypothesis } from './profile.js';
import { classifyWebsite, type WebsiteObservation } from './website.js';
import { decideTier, tier2MayImportImmediately, type EligibilityInput } from './tiers.js';

/**
 * The tier formula and its two overrides, exercised against the historical
 * fixtures named in the specification's traceability register.
 */

const baseObservation: WebsiteObservation = {
  resolvedDomain: 'example.com',
  fetchBlockedOnOurSide: false,
  httpStatus: 200,
  visibleTextLength: 5000,
  internalLinkCount: 15,
  parkingOrComingSoonMarkers: [],
  hasContactPath: true,
  hasWorkOrServiceDetail: true,
  observedAt: '2026-08-12T00:00:00.000Z',
};

const baseEligibility = (
  website: EligibilityInput['website'],
  overrides: Partial<EligibilityInput> = {},
): EligibilityInput => ({
  launchStatus: 'QUALIFIED',
  launchConfidence: 'MEDIUM',
  website,
  identityConflict: false,
  businessPurposeUnverifiable: false,
  launchEvidenceNamesDifferentPerson: false,
  domainOwnershipAmbiguous: false,
  wouldRequireInventingOffer: false,
  evidenceConflicts: false,
  ...overrides,
});

const noWebsite = classifyWebsite({ ...baseObservation, resolvedDomain: null });

describe('website taxonomy', () => {
  it('treats a missing site as positive evidence, not a research failure', () => {
    expect(noWebsite.websiteClass).toBe('NO_WEBSITE');
    expect(noWebsite.confidence).toBe('HIGH');
    expect(noWebsite.offersAstraAngle).toBe(true);
  });

  it('never grades our own fetch failure as a broken prospect site', () => {
    const assessment = classifyWebsite({ ...baseObservation, fetchBlockedOnOurSide: true });

    expect(assessment.websiteClass).toBe('UNKNOWN');
    expect(assessment.websiteClass).not.toBe('NOT_WORKING');
    expect(assessment.supportedObservations).toEqual([]);
  });

  it('distinguishes a genuine 5xx from an inconclusive 403', () => {
    expect(classifyWebsite({ ...baseObservation, httpStatus: 503 }).websiteClass).toBe(
      'NOT_WORKING',
    );
    expect(classifyWebsite({ ...baseObservation, httpStatus: 403 }).websiteClass).toBe('UNKNOWN');
  });

  it('classifies a coming-soon page as a placeholder with a usable observation', () => {
    const assessment = classifyWebsite({
      ...baseObservation,
      parkingOrComingSoonMarkers: ['coming soon'],
    });

    expect(assessment.websiteClass).toBe('PLACEHOLDER');
    expect(assessment.supportedObservations.join(' ')).toContain('placeholder');
  });

  it('classifies a substantial site as strong and offers no angle', () => {
    const assessment = classifyWebsite(baseObservation);

    expect(assessment.websiteClass).toBe('STRONG');
    expect(assessment.offersAstraAngle).toBe(false);
  });
});

describe('tier 1 formula', () => {
  it('routes a qualified contact with a high-confidence angle to TIER_1', () => {
    const decision = decideTier(baseEligibility(noWebsite), NEW_BUSINESSES_PROFILE);

    expect(decision.eligibility).toBe('INCLUDE');
    expect(decision.tier).toBe('TIER_1');
    expect(decision.mayDraftMessages).toBe(true);
  });

  it('accepts MEDIUM launch confidence, which is what the list-membership hypothesis gives', () => {
    const hypothesis = initialLaunchHypothesis(NEW_BUSINESSES_PROFILE);
    expect(hypothesis.confidence).toBe('MEDIUM');

    const decision = decideTier(
      baseEligibility(noWebsite, { launchConfidence: hypothesis.confidence }),
      NEW_BUSINESSES_PROFILE,
    );
    expect(decision.tier).toBe('TIER_1');
  });

  it('drops to TIER_2 when website confidence is below HIGH', () => {
    const thinPage = classifyWebsite({
      ...baseObservation,
      visibleTextLength: 200,
      internalLinkCount: 1,
    });
    expect(thinPage.confidence).toBe('MEDIUM');

    const decision = decideTier(baseEligibility(thinPage), NEW_BUSINESSES_PROFILE);
    expect(decision.eligibility).toBe('INCLUDE');
    expect(decision.tier).toBe('TIER_2');
    expect(decision.reasonCodes).toContain('WEBSITE_CONFIDENCE_BELOW_TIER_1');
  });

  it('drops to TIER_2 when launch confidence is LOW', () => {
    const decision = decideTier(
      baseEligibility(noWebsite, { launchConfidence: 'LOW' }),
      NEW_BUSINESSES_PROFILE,
    );

    expect(decision.tier).toBe('TIER_2');
    expect(decision.reasonCodes).toContain('LAUNCH_CONFIDENCE_BELOW_TIER_1');
  });

  it('records every predicate, passing and failing alike', () => {
    const decision = decideTier(
      baseEligibility(noWebsite, { launchConfidence: 'LOW' }),
      NEW_BUSINESSES_PROFILE,
    );
    const names = decision.predicates.map((p) => p.name);

    expect(names).toContain('launch_confidence_accepted_for_tier_1');
    expect(names).toContain('website_confidence_required_for_tier_1');
    expect(decision.predicates.some((p) => !p.passed)).toBe(true);
    expect(decision.predicates.some((p) => p.passed)).toBe(true);
  });
});

describe('mandatory manual review overrides', () => {
  it('BEKLOG fixture: an identity mismatch beats an otherwise clean TIER_1 score', () => {
    const decision = decideTier(
      baseEligibility(noWebsite, { identityConflict: true }),
      NEW_BUSINESSES_PROFILE,
    );

    expect(decision.eligibility).toBe('MANUAL_REVIEW');
    expect(decision.tier).toBe('TIER_2');
    expect(decision.reasonCodes).toContain('IDENTITY_CONFLICT');
    expect(decision.mayDraftMessages).toBe(false);
  });

  it('MM Collectives fixture: an unverifiable purpose blocks a placeholder-site include', () => {
    const placeholder = classifyWebsite({
      ...baseObservation,
      parkingOrComingSoonMarkers: ['coming soon'],
    });
    const decision = decideTier(
      baseEligibility(placeholder, { businessPurposeUnverifiable: true }),
      NEW_BUSINESSES_PROFILE,
    );

    expect(decision.eligibility).toBe('MANUAL_REVIEW');
    expect(decision.reasonCodes).toContain('BUSINESS_PURPOSE_UNVERIFIABLE');
    expect(decision.mayDraftMessages).toBe(false);
  });

  it('a message that could only be written by inventing the offer is never drafted', () => {
    const decision = decideTier(
      baseEligibility(noWebsite, { wouldRequireInventingOffer: true }),
      NEW_BUSINESSES_PROFILE,
    );

    expect(decision.mayDraftMessages).toBe(false);
    expect(decision.reasonCodes).toContain('WOULD_REQUIRE_INVENTING_OFFER');
  });
});

describe('honest no-fit outcomes', () => {
  it('excludes a business that already has a strong site', () => {
    const decision = decideTier(
      baseEligibility(classifyWebsite(baseObservation)),
      NEW_BUSINESSES_PROFILE,
    );

    expect(decision.eligibility).toBe('EXCLUDE');
    expect(decision.tier).toBe('EXCLUDE');
    expect(decision.mayDraftMessages).toBe(false);
  });

  it('queues rather than excludes when the site state is unknown to us', () => {
    const unknown = classifyWebsite({ ...baseObservation, fetchBlockedOnOurSide: true });
    const decision = decideTier(baseEligibility(unknown), NEW_BUSINESSES_PROFILE);

    expect(decision.eligibility).toBe('MANUAL_REVIEW');
    expect(decision.tier).toBe('TIER_2');
  });
});

describe('tier 2 immediate import', () => {
  it('lets a confident TIER_2 INCLUDE import when the profile allows it', () => {
    const thinPage = classifyWebsite({
      ...baseObservation,
      visibleTextLength: 200,
      internalLinkCount: 1,
    });
    const decision = decideTier(baseEligibility(thinPage), NEW_BUSINESSES_PROFILE);

    expect(tier2MayImportImmediately(decision, NEW_BUSINESSES_PROFILE)).toBe(true);
  });

  it('never lets a queued MANUAL_REVIEW row import', () => {
    const decision = decideTier(
      baseEligibility(noWebsite, { identityConflict: true }),
      NEW_BUSINESSES_PROFILE,
    );

    expect(tier2MayImportImmediately(decision, NEW_BUSINESSES_PROFILE)).toBe(false);
  });
});

describe('profile provenance', () => {
  it('carries recorded provenance for the 2026 upstream prefilter', () => {
    const hypothesis = initialLaunchHypothesis(NEW_BUSINESSES_PROFILE);

    expect(hypothesis.status).toBe('QUALIFIED');
    expect(hypothesis.recencyWording).toBe('recently');
    expect(hypothesis.provenance).not.toBeNull();
  });

  it('gives no launch hypothesis to a profile with no recorded upstream filter', () => {
    const bare = { ...NEW_BUSINESSES_PROFILE, upstreamFilters: [] };
    const hypothesis = initialLaunchHypothesis(bare);

    expect(hypothesis.status).toBe('UNKNOWN');
    expect(hypothesis.provenance).toBeNull();
  });

  it('defaults live import to closed', () => {
    expect(NEW_BUSINESSES_PROFILE.allowLiveImport).toBe(false);
  });
});
