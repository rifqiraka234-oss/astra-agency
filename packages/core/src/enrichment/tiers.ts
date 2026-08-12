/**
 * Tier and outcome policy (specification sections 7.4 and 7.5).
 *
 * The spec instructs us to preserve the repository's *actual* tested rules
 * rather than reconstruct thresholds from memory, and to stop and ask if the
 * formula is missing. It is not missing: `CLAUDE.md` records it as the live
 * operating procedure, and it is reproduced here verbatim in code.
 *
 *   Tier 1 (auto import)  campaignEligibility = INCLUDE
 *                     AND businessLaunchStatus = QUALIFIED
 *                     AND businessLaunchConfidence in {HIGH, MEDIUM}
 *                     AND websiteAnalysisConfidence = HIGH
 *   EXCLUDE               recorded, never imported
 *   Tier 2 (queued)       everything else: DO_NOT_USE, MANUAL_REVIEW,
 *                         or LOW website confidence
 *
 * Two overrides sit above the mechanical score and cannot be outvoted by it:
 * an identity conflict between the person and the company (the BEKLOG
 * fixture), and an unverifiable business purpose (the MM Collectives fixture).
 * Both force `MANUAL_REVIEW` even when every other signal says include.
 */

import type { WebsiteAssessment } from './website.js';
import type {
  CampaignEligibility,
  LaunchConfidence,
  LaunchStatus,
  PipelineProfile,
} from './profile.js';

export const TIERS = ['TIER_1', 'TIER_2', 'EXCLUDE'] as const;
export type Tier = (typeof TIERS)[number];

export interface EligibilityInput {
  readonly launchStatus: LaunchStatus;
  readonly launchConfidence: LaunchConfidence;
  readonly website: WebsiteAssessment;
  /** True when the contact and the company demonstrably do not match. */
  readonly identityConflict: boolean;
  /** True when no verifiable statement of what the business does was found. */
  readonly businessPurposeUnverifiable: boolean;
  /** True when the launch record names a materially different managing person. */
  readonly launchEvidenceNamesDifferentPerson: boolean;
  /** True when official domain ownership could not be settled. */
  readonly domainOwnershipAmbiguous: boolean;
  /** True when a message could only be written by inventing the offer. */
  readonly wouldRequireInventingOffer: boolean;
  /** True when sources genuinely contradict each other. */
  readonly evidenceConflicts: boolean;
}

export interface TierDecision {
  readonly eligibility: CampaignEligibility;
  readonly tier: Tier;
  /** Every predicate that was evaluated, passing and failing alike. */
  readonly predicates: readonly TierPredicate[];
  readonly reasonCodes: readonly string[];
  readonly mayDraftMessages: boolean;
}

export interface TierPredicate {
  readonly name: string;
  readonly passed: boolean;
  readonly detail: string;
}

/** Section 7.4: conditions under which manual review is mandatory. */
export function mandatoryManualReviewReasons(input: EligibilityInput): readonly string[] {
  const reasons: string[] = [];
  if (input.identityConflict) reasons.push('IDENTITY_CONFLICT');
  if (input.launchEvidenceNamesDifferentPerson) reasons.push('LAUNCH_NAMES_DIFFERENT_PERSON');
  if (input.businessPurposeUnverifiable) reasons.push('BUSINESS_PURPOSE_UNVERIFIABLE');
  if (input.domainOwnershipAmbiguous) reasons.push('DOMAIN_OWNERSHIP_AMBIGUOUS');
  if (input.evidenceConflicts) reasons.push('EVIDENCE_CONFLICTS');
  if (input.wouldRequireInventingOffer) reasons.push('WOULD_REQUIRE_INVENTING_OFFER');
  return reasons;
}

export function decideTier(input: EligibilityInput, profile: PipelineProfile): TierDecision {
  const predicates: TierPredicate[] = [];
  const reasonCodes: string[] = [];

  const manualReasons = mandatoryManualReviewReasons(input);
  predicates.push({
    name: 'no_mandatory_manual_review_condition',
    passed: manualReasons.length === 0,
    detail:
      manualReasons.length === 0 ? 'no override condition present' : manualReasons.join(', '),
  });

  const launchQualified = input.launchStatus === 'QUALIFIED';
  predicates.push({
    name: 'launch_status_qualified',
    passed: launchQualified,
    detail: `businessLaunchStatus = ${input.launchStatus}`,
  });

  const websiteIncludable = profile.tierPolicy.includableWebsiteClasses.includes(
    input.website.websiteClass,
  );
  predicates.push({
    name: 'website_class_supports_astra_angle',
    passed: websiteIncludable,
    detail: `websiteClass = ${input.website.websiteClass}`,
  });

  const launchConfidenceOk = profile.tierPolicy.tier1AcceptedLaunchConfidences.includes(
    input.launchConfidence,
  );
  predicates.push({
    name: 'launch_confidence_accepted_for_tier_1',
    passed: launchConfidenceOk,
    detail: `businessLaunchConfidence = ${input.launchConfidence}`,
  });

  const websiteConfidenceOk =
    input.website.confidence === profile.tierPolicy.tier1RequiredWebsiteConfidence;
  predicates.push({
    name: 'website_confidence_required_for_tier_1',
    passed: websiteConfidenceOk,
    detail: `websiteAnalysisConfidence = ${input.website.confidence}`,
  });

  // The overrides come first and cannot be outvoted by a clean mechanical score.
  if (manualReasons.length > 0) {
    reasonCodes.push(...manualReasons);
    return {
      eligibility: 'MANUAL_REVIEW',
      tier: 'TIER_2',
      predicates,
      reasonCodes,
      mayDraftMessages: false,
    };
  }

  if (input.launchStatus === 'DO_NOT_USE') {
    reasonCodes.push('LAUNCH_DO_NOT_USE');
    return {
      eligibility: 'MANUAL_REVIEW',
      tier: 'TIER_2',
      predicates,
      reasonCodes,
      mayDraftMessages: false,
    };
  }

  // A site that is already decent or strong is a genuine no-fit, not a queue
  // item. Recording an honest exclude is a correct outcome, not a failure.
  if (!websiteIncludable) {
    reasonCodes.push(
      input.website.websiteClass === 'UNKNOWN'
        ? 'WEBSITE_UNKNOWN'
        : 'WEBSITE_ALREADY_ADEQUATE',
    );
    if (input.website.websiteClass === 'UNKNOWN' || input.website.websiteClass === 'NOT_WORKING') {
      return {
        eligibility: 'MANUAL_REVIEW',
        tier: 'TIER_2',
        predicates,
        reasonCodes,
        mayDraftMessages: false,
      };
    }
    return {
      eligibility: 'EXCLUDE',
      tier: 'EXCLUDE',
      predicates,
      reasonCodes,
      mayDraftMessages: false,
    };
  }

  if (!launchQualified) {
    reasonCodes.push('LAUNCH_NOT_QUALIFIED');
    return {
      eligibility: 'MANUAL_REVIEW',
      tier: 'TIER_2',
      predicates,
      reasonCodes,
      mayDraftMessages: false,
    };
  }

  // INCLUDE from here on: launch verified and the site gives a real angle.
  const isTier1 = launchConfidenceOk && websiteConfidenceOk;
  if (!isTier1) {
    reasonCodes.push(
      websiteConfidenceOk ? 'LAUNCH_CONFIDENCE_BELOW_TIER_1' : 'WEBSITE_CONFIDENCE_BELOW_TIER_1',
    );
  }

  return {
    eligibility: 'INCLUDE',
    tier: isTier1 ? 'TIER_1' : 'TIER_2',
    predicates,
    reasonCodes,
    // A confident Tier 2 INCLUDE still gets messages drafted; only
    // MANUAL_REVIEW and DO_NOT_USE rows stay queued without copy.
    mayDraftMessages: true,
  };
}

/**
 * Section 7.5: a Tier 2 row that resolves confidently to INCLUDE may import
 * immediately when the profile and the live gate both allow it. Queued
 * MANUAL_REVIEW and DO_NOT_USE rows never do.
 */
export function tier2MayImportImmediately(
  decision: TierDecision,
  profile: PipelineProfile,
): boolean {
  return (
    decision.tier === 'TIER_2' &&
    decision.eligibility === 'INCLUDE' &&
    profile.import.tier2ConfidentIncludeImportsImmediately
  );
}
