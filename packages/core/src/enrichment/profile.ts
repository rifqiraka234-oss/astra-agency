/**
 * Versioned pipeline profiles (specification section 7.1).
 *
 * A profile is how one source list's proven assumptions stay attached to that
 * list instead of leaking into every future list. The `New Businesses` list was
 * prefiltered upstream to companies created in 2026, which is genuine evidence
 * for that list and worthless for any other. Encoding it as profile
 * configuration — with its provenance recorded — is the difference between a
 * justified shortcut and a global hallucination.
 */

import type { WebsiteClass, WebsiteConfidence } from './website.js';

export const LAUNCH_STATUSES = ['QUALIFIED', 'DO_NOT_USE', 'UNKNOWN'] as const;
export type LaunchStatus = (typeof LAUNCH_STATUSES)[number];

export const LAUNCH_CONFIDENCES = ['HIGH', 'MEDIUM', 'LOW'] as const;
export type LaunchConfidence = (typeof LAUNCH_CONFIDENCES)[number];

export const CAMPAIGN_ELIGIBILITIES = ['INCLUDE', 'MANUAL_REVIEW', 'EXCLUDE'] as const;
export type CampaignEligibility = (typeof CAMPAIGN_ELIGIBILITIES)[number];

export interface UpstreamFilterEvidence {
  /** Plain description of what the upstream filter guarantees. */
  readonly description: string;
  /** Where the guarantee came from. Never "assumed". */
  readonly provenance: string;
  readonly recordedAt: string;
  /** Launch status this filter alone justifies initializing. */
  readonly initialLaunchStatus: LaunchStatus;
  readonly initialLaunchConfidence: LaunchConfidence;
  /** Wording a message may use, e.g. `recently`. */
  readonly recencyWording: string;
}

export interface ResearchLimits {
  readonly maxTargetedSearchesPerContact: number;
  readonly maxPageFetchesPerContact: number;
  /** Attempts reserved for the final push before MANUAL_REVIEW. */
  readonly reservedFinalAttempts: number;
}

export interface MessageLimits {
  readonly connectionMessageMaxWords: number;
  readonly firstMessageMaxWords: number;
}

export interface ImportBehavior {
  readonly destinationCampaignId: string;
  /** CSV header -> Lemlist custom variable name. Never renamed silently. */
  readonly columnMapping: Readonly<Record<string, string>>;
  /** Tier 2 rows that resolve confidently to INCLUDE import without waiting. */
  readonly tier2ConfidentIncludeImportsImmediately: boolean;
}

export interface TierPolicy {
  /** Launch confidences accepted for Tier 1. */
  readonly tier1AcceptedLaunchConfidences: readonly LaunchConfidence[];
  /** Website confidence required for Tier 1. */
  readonly tier1RequiredWebsiteConfidence: WebsiteConfidence;
  /** Website classes that can support an INCLUDE at all. */
  readonly includableWebsiteClasses: readonly WebsiteClass[];
}

export interface PipelineProfile {
  readonly profileId: string;
  readonly name: string;
  readonly version: number;
  readonly sourceListId: string;
  readonly upstreamFilters: readonly UpstreamFilterEvidence[];
  readonly tierPolicy: TierPolicy;
  readonly research: ResearchLimits;
  readonly messages: MessageLimits;
  readonly import: ImportBehavior;
  /** Live-action permissions are profile-scoped and default closed. */
  readonly allowLiveImport: boolean;
  readonly createdAt: string;
}

/**
 * The `New Businesses` profile, reconstructed from the canonical repository
 * configuration in `CLAUDE.md` rather than from memory. Campaign and list IDs
 * are the live ones already recorded there.
 */
export const NEW_BUSINESSES_PROFILE: PipelineProfile = {
  profileId: 'new-businesses',
  name: 'New Businesses',
  version: 1,
  sourceListId: 'clt_Zzi8BjZSMvbEH9ihr',
  upstreamFilters: [
    {
      description:
        'Source list membership was built from companies filtered upstream as created in 2026.',
      provenance:
        'Operator-confirmed list construction, recorded in session-retrospective-2026-08-12 after thirteen recency-based exclusions were replayed.',
      recordedAt: '2026-08-12T00:00:00.000Z',
      initialLaunchStatus: 'QUALIFIED',
      initialLaunchConfidence: 'MEDIUM',
      recencyWording: 'recently',
    },
  ],
  tierPolicy: {
    tier1AcceptedLaunchConfidences: ['HIGH', 'MEDIUM'],
    tier1RequiredWebsiteConfidence: 'HIGH',
    includableWebsiteClasses: ['NO_WEBSITE', 'PLACEHOLDER', 'BASIC'],
  },
  research: {
    maxTargetedSearchesPerContact: 6,
    maxPageFetchesPerContact: 8,
    reservedFinalAttempts: 3,
  },
  messages: {
    connectionMessageMaxWords: 30,
    firstMessageMaxWords: 65,
  },
  import: {
    destinationCampaignId: 'cam_Co5CJXrpPFf5MRAfD',
    columnMapping: {
      connectionMessage: 'connectionMessage',
      firstMessage: 'firstMessage',
    },
    tier2ConfidentIncludeImportsImmediately: true,
  },
  allowLiveImport: false,
  createdAt: '2026-08-12T00:00:00.000Z',
};

/**
 * Applies a profile's upstream evidence as a *starting hypothesis*. Contrary
 * evidence always wins; the shortcut only saves research that would merely
 * re-prove the filter.
 */
export function initialLaunchHypothesis(profile: PipelineProfile): {
  readonly status: LaunchStatus;
  readonly confidence: LaunchConfidence;
  readonly recencyWording: string | null;
  readonly provenance: string | null;
} {
  const filter = profile.upstreamFilters[0];
  if (filter === undefined) {
    return { status: 'UNKNOWN', confidence: 'LOW', recencyWording: null, provenance: null };
  }
  return {
    status: filter.initialLaunchStatus,
    confidence: filter.initialLaunchConfidence,
    recencyWording: filter.recencyWording,
    provenance: filter.provenance,
  };
}
