/**
 * Provider capability registry (specification sections 6, 7.3, 34.1, 34.3,
 * 34.4).
 *
 * Three distinct historical failures are encoded here, and they are distinct on
 * purpose:
 *
 *  - Netlify was authenticated at the account level yet unavailable to the
 *    working session (`enabledInChat: false`). Account auth did not imply
 *    runtime enablement.
 *  - `WebFetch` was blocked while a raw `curl` of the same URL worked. One
 *    transport path proving healthy never proves another.
 *  - Lemlist company hint fields appeared populated in sampled rows yet no
 *    reachable call exposed them to the workflow. Data existing does not mean
 *    the adapter can read it.
 *
 * So a capability is not a boolean. It is three independent axes, and a caller
 * may only fan out when the *exact* adapter it is about to use has passed on
 * all three within the freshness window.
 */

export const CAPABILITY_AUTH_STATES = ['AUTHENTICATED', 'UNAUTHENTICATED', 'UNKNOWN'] as const;
export type CapabilityAuthState = (typeof CAPABILITY_AUTH_STATES)[number];

export const CAPABILITY_ENABLEMENT_STATES = [
  'ENABLED_FOR_RUNTIME',
  'DISABLED_FOR_RUNTIME',
  'UNKNOWN',
] as const;
export type CapabilityEnablementState = (typeof CAPABILITY_ENABLEMENT_STATES)[number];

export const CAPABILITY_REACHABILITY_STATES = [
  'REACHABLE',
  'BLOCKED',
  'RATE_LIMITED',
  'UNKNOWN',
] as const;
export type CapabilityReachabilityState = (typeof CAPABILITY_REACHABILITY_STATES)[number];

export interface ProviderCapability {
  readonly provider: string;
  /** The exact adapter operation, e.g. `lemlist.searchCompanies`, not "lemlist". */
  readonly operation: string;
  readonly auth: CapabilityAuthState;
  readonly enablement: CapabilityEnablementState;
  readonly reachability: CapabilityReachabilityState;
  /** Fields the adapter has actually been observed to return. */
  readonly observedFields: readonly string[];
  /** Fields documented or believed present but never returned by this adapter. */
  readonly missingFields: readonly string[];
  readonly lastVerifiedAt: string | null;
  readonly lastFailureReason: string | null;
  /** How long a verification stays trustworthy. */
  readonly freshnessSeconds: number;
  /**
   * Set when the capability is unusable but an operator-approved fallback
   * exists. A fallback always degrades evidence quality, which is why it is
   * recorded rather than silently used.
   */
  readonly approvedFallback: string | null;
}

export interface CapabilityVerdict {
  readonly usable: boolean;
  readonly reasonCodes: readonly string[];
  readonly degradesEvidence: boolean;
}

export function isCapabilityFresh(
  capability: ProviderCapability,
  now: Date,
): boolean {
  if (capability.lastVerifiedAt === null) return false;
  const verifiedAt = Date.parse(capability.lastVerifiedAt);
  if (Number.isNaN(verifiedAt)) return false;
  const ageSeconds = (now.getTime() - verifiedAt) / 1000;
  return ageSeconds >= 0 && ageSeconds <= capability.freshnessSeconds;
}

/**
 * The single gate every fan-out must pass. It never returns `usable: true` on
 * an unknown axis: an unverified capability is treated exactly like a failed
 * one, because the expensive historical mistake was assuming health rather
 * than proving it.
 */
export function evaluateCapability(
  capability: ProviderCapability,
  now: Date,
): CapabilityVerdict {
  const reasonCodes: string[] = [];

  if (!isCapabilityFresh(capability, now)) reasonCodes.push('CAPABILITY_STALE');
  if (capability.auth !== 'AUTHENTICATED') reasonCodes.push('CAPABILITY_NOT_AUTHENTICATED');
  if (capability.enablement !== 'ENABLED_FOR_RUNTIME') {
    reasonCodes.push('CAPABILITY_NOT_ENABLED_FOR_RUNTIME');
  }
  if (capability.reachability !== 'REACHABLE') {
    reasonCodes.push(
      capability.reachability === 'RATE_LIMITED'
        ? 'CAPABILITY_RATE_LIMITED'
        : 'CAPABILITY_NOT_REACHABLE',
    );
  }

  if (reasonCodes.length === 0) {
    return { usable: true, reasonCodes: [], degradesEvidence: false };
  }
  if (capability.approvedFallback !== null) {
    return {
      usable: true,
      reasonCodes: [...reasonCodes, 'CAPABILITY_USING_APPROVED_FALLBACK'],
      degradesEvidence: true,
    };
  }
  return { usable: false, reasonCodes, degradesEvidence: false };
}

export interface PreflightRequest {
  /** Every distinct adapter operation the fan-out is about to depend on. */
  readonly requiredOperations: readonly string[];
  readonly registry: readonly ProviderCapability[];
  readonly now: Date;
}

export interface PreflightResult {
  readonly mayFanOut: boolean;
  readonly blockedOperations: readonly string[];
  readonly degradedOperations: readonly string[];
  readonly unregisteredOperations: readonly string[];
  readonly reasonCodes: readonly string[];
}

/**
 * Preflight before fan-out (section 6). Five parallel workers once each
 * independently rediscovered the same blocked dependency, twice, at an
 * estimated 370–380k wasted tokens on the second round. The fix is structural:
 * one caller proves the shared dependency with the real adapter, and no worker
 * starts until it has.
 *
 * An operation that is not in the registry at all blocks the fan-out. Absence
 * of evidence is not evidence of health.
 */
export function preflightBeforeFanOut(request: PreflightRequest): PreflightResult {
  const byOperation = new Map(request.registry.map((c) => [c.operation, c]));
  const blocked: string[] = [];
  const degraded: string[] = [];
  const unregistered: string[] = [];
  const reasonCodes = new Set<string>();

  for (const operation of request.requiredOperations) {
    const capability = byOperation.get(operation);
    if (capability === undefined) {
      unregistered.push(operation);
      reasonCodes.add('CAPABILITY_NOT_REGISTERED');
      continue;
    }
    const verdict = evaluateCapability(capability, request.now);
    for (const code of verdict.reasonCodes) reasonCodes.add(code);
    if (!verdict.usable) blocked.push(operation);
    else if (verdict.degradesEvidence) degraded.push(operation);
  }

  return {
    mayFanOut: blocked.length === 0 && unregistered.length === 0,
    blockedOperations: blocked,
    degradedOperations: degraded,
    unregisteredOperations: unregistered,
    reasonCodes: [...reasonCodes],
  };
}

/**
 * A fix claim requires direct verification with the actual tool that failed
 * (section 34.1: "no fix claim without direct actual-tool verification"). A
 * successful call through a *different* path — raw curl standing in for a
 * blocked fetch adapter — is explicitly not proof.
 */
export function mayClaimCapabilityFixed(input: {
  readonly failedOperation: string;
  readonly verifiedOperation: string;
  readonly verifiedAt: string | null;
}): { readonly mayClaim: boolean; readonly reasonCode: string | null } {
  if (input.verifiedAt === null) {
    return { mayClaim: false, reasonCode: 'FIX_CLAIM_WITHOUT_VERIFICATION' };
  }
  if (input.failedOperation !== input.verifiedOperation) {
    return { mayClaim: false, reasonCode: 'FIX_CLAIM_VIA_DIFFERENT_PATH' };
  }
  return { mayClaim: true, reasonCode: null };
}
