/**
 * Prototype deliverable modes and mandatory pre-design artifacts
 * (specification sections 16.1 and 16.2).
 *
 * The historical prototypes scored 55, 57 and 55 out of 100 under the expanded
 * rubric while looking visually convincing. That gap is the whole reason this
 * module exists: a strong concept slice presented as a finished site is a
 * commercial misrepresentation, so the mode is chosen *before* research and the
 * vocabulary used to describe the result is derived from it rather than left to
 * whoever writes the delivery message.
 */

export const DELIVERABLE_MODES = [
  'CONCEPT_SLICE',
  'CONVERSION_LANDING_PAGE',
  'FULL_PROTOTYPE',
  'PRODUCTION_CANDIDATE',
] as const;
export type DeliverableMode = (typeof DELIVERABLE_MODES)[number];

/** Astra's normal prospect workflow. Anything narrower is an explicit choice. */
export const DEFAULT_DELIVERABLE_MODE: DeliverableMode = 'FULL_PROTOTYPE';

export interface DeliverableModeSelection {
  readonly mode: DeliverableMode;
  readonly selectedBy: 'DEFAULT' | 'CAMPAIGN_POLICY' | 'OPERATOR';
  readonly rationale: string;
}

/**
 * `CONCEPT_SLICE` is only legitimate when something outside the model chose it.
 * A build that quietly downgrades its own scope to pass QA is exactly what this
 * refuses.
 */
export function selectDeliverableMode(input: {
  readonly campaignPolicyMode: DeliverableMode | null;
  readonly operatorMode: DeliverableMode | null;
}): DeliverableModeSelection {
  if (input.operatorMode !== null) {
    return {
      mode: input.operatorMode,
      selectedBy: 'OPERATOR',
      rationale: 'Operator selected the deliverable mode explicitly.',
    };
  }
  if (input.campaignPolicyMode !== null) {
    return {
      mode: input.campaignPolicyMode,
      selectedBy: 'CAMPAIGN_POLICY',
      rationale: 'Campaign policy pins the deliverable mode for this profile.',
    };
  }
  return {
    mode: DEFAULT_DELIVERABLE_MODE,
    selectedBy: 'DEFAULT',
    rationale: 'No explicit selection, so the normal prospect workflow default applies.',
  };
}

/**
 * Vocabulary guard. A concept slice is never "finished" or "complete", and the
 * delivery message is checked against this rather than trusted to be careful.
 */
export function prohibitedCompletenessWords(mode: DeliverableMode): readonly string[] {
  if (mode === 'CONCEPT_SLICE') {
    return ['finished', 'complete', 'completed', 'full site', 'ready to launch', 'production ready'];
  }
  if (mode === 'CONVERSION_LANDING_PAGE' || mode === 'FULL_PROTOTYPE') {
    return ['production ready', 'ready to launch'];
  }
  return [];
}

export function checkCompletenessLanguage(
  text: string,
  mode: DeliverableMode,
): { readonly ok: boolean; readonly offending: readonly string[] } {
  const lower = text.toLowerCase();
  const offending = prohibitedCompletenessWords(mode).filter((word) => lower.includes(word));
  return { ok: offending.length === 0, offending };
}

// --- mandatory pre-design artifacts -----------------------------------------

export const PRE_DESIGN_ARTIFACTS = [
  'EVIDENCE_REGISTER',
  'BRAND_EVIDENCE_PACK',
  'CATEGORY_TRIANGULATION',
  'BUSINESS_SYSTEM_MODEL',
  'ROLE_JOURNEY_EVIDENCE_MATRIX',
  'SITE_COMPLETENESS_CONTRACT',
  'HUMAN_TRUST_PLAN',
  'PROOF_LADDER',
  'IMAGERY_STORYBOARD',
  'GOVERNING_CONCEPT',
  'NARRATIVE_STORYBOARD',
  'COVERAGE_LEDGER',
] as const;
export type PreDesignArtifact = (typeof PRE_DESIGN_ARTIFACTS)[number];

/**
 * A concept slice legitimately does not need the full commercial apparatus; a
 * production candidate needs all of it. Every mode still needs the evidence
 * register, the governing concept and the coverage ledger, because those are
 * what stop invention.
 */
export function requiredArtifactsFor(mode: DeliverableMode): readonly PreDesignArtifact[] {
  const always: PreDesignArtifact[] = [
    'EVIDENCE_REGISTER',
    'BRAND_EVIDENCE_PACK',
    'GOVERNING_CONCEPT',
    'COVERAGE_LEDGER',
  ];
  if (mode === 'CONCEPT_SLICE') {
    return [...always, 'CATEGORY_TRIANGULATION', 'IMAGERY_STORYBOARD'];
  }
  if (mode === 'CONVERSION_LANDING_PAGE') {
    return [
      ...always,
      'CATEGORY_TRIANGULATION',
      'IMAGERY_STORYBOARD',
      'PROOF_LADDER',
      'NARRATIVE_STORYBOARD',
      'HUMAN_TRUST_PLAN',
    ];
  }
  return [...always, ...PRE_DESIGN_ARTIFACTS.filter((a) => !always.includes(a))];
}

export interface ArtifactGateResult {
  readonly mayBeginVisualImplementation: boolean;
  readonly missing: readonly PreDesignArtifact[];
}

export function checkPreDesignGate(
  mode: DeliverableMode,
  present: readonly PreDesignArtifact[],
): ArtifactGateResult {
  const presentSet = new Set(present);
  const missing = requiredArtifactsFor(mode).filter((a) => !presentSet.has(a));
  return { mayBeginVisualImplementation: missing.length === 0, missing };
}

// --- coverage ledger ---------------------------------------------------------

export const COVERAGE_STATUSES = ['PLANNED', 'BUILT', 'VERIFIED', 'DROPPED'] as const;
export type CoverageStatus = (typeof COVERAGE_STATUSES)[number];

export interface CoverageEntry {
  readonly item: string;
  readonly status: CoverageStatus;
  /** Why a planned item was dropped. Required; silence is not an explanation. */
  readonly note: string | null;
}

export interface CoverageSummary {
  readonly planned: number;
  readonly built: number;
  readonly verified: number;
  readonly dropped: number;
  readonly undocumentedDrops: readonly string[];
  readonly complete: boolean;
}

export function summarizeCoverage(entries: readonly CoverageEntry[]): CoverageSummary {
  const undocumentedDrops = entries
    .filter((e) => e.status === 'DROPPED' && (e.note === null || e.note.trim().length === 0))
    .map((e) => e.item);
  const verified = entries.filter((e) => e.status === 'VERIFIED').length;
  const dropped = entries.filter((e) => e.status === 'DROPPED').length;
  return {
    planned: entries.filter((e) => e.status === 'PLANNED').length,
    built: entries.filter((e) => e.status === 'BUILT').length,
    verified,
    dropped,
    undocumentedDrops,
    // Every entry either got verified or was dropped with a stated reason.
    complete: verified + dropped === entries.length && undocumentedDrops.length === 0,
  };
}
