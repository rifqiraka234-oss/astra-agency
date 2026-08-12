import { describe, expect, it } from 'vitest';
import {
  evaluateCapability,
  isCapabilityFresh,
  mayClaimCapabilityFixed,
  preflightBeforeFanOut,
  type ProviderCapability,
} from './capabilities.js';

/**
 * The three historical capability failures, each asserted separately, because
 * conflating them is what made them expensive.
 */

const now = new Date('2026-08-12T12:00:00.000Z');

const healthy = (overrides: Partial<ProviderCapability> = {}): ProviderCapability => ({
  provider: 'lemlist',
  operation: 'lemlist.searchContacts',
  auth: 'AUTHENTICATED',
  enablement: 'ENABLED_FOR_RUNTIME',
  reachability: 'REACHABLE',
  observedFields: ['id', 'email'],
  missingFields: [],
  lastVerifiedAt: '2026-08-12T11:55:00.000Z',
  lastFailureReason: null,
  freshnessSeconds: 3600,
  approvedFallback: null,
  ...overrides,
});

describe('the three axes are independent', () => {
  it('Netlify fixture: authenticated but not enabled for the runtime is not usable', () => {
    const verdict = evaluateCapability(
      healthy({
        provider: 'netlify',
        operation: 'netlify.createDeploy',
        enablement: 'DISABLED_FOR_RUNTIME',
      }),
      now,
    );

    expect(verdict.usable).toBe(false);
    expect(verdict.reasonCodes).toContain('CAPABILITY_NOT_ENABLED_FOR_RUNTIME');
  });

  it('WebFetch fixture: authenticated and enabled but blocked is not usable', () => {
    const verdict = evaluateCapability(
      healthy({ operation: 'research.fetchPage', reachability: 'BLOCKED' }),
      now,
    );

    expect(verdict.usable).toBe(false);
    expect(verdict.reasonCodes).toContain('CAPABILITY_NOT_REACHABLE');
  });

  it('records fields that exist upstream but the adapter never returns', () => {
    const capability = healthy({
      operation: 'lemlist.searchCompanies',
      observedFields: ['id', 'name', 'domain'],
      missingFields: ['foundedOn', 'industry', 'location', 'description'],
    });

    expect(capability.missingFields).toContain('foundedOn');
    // The capability is still usable; the gap is visible rather than silent.
    expect(evaluateCapability(capability, now).usable).toBe(true);
  });
});

describe('freshness', () => {
  it('treats a stale verification as unusable', () => {
    const stale = healthy({ lastVerifiedAt: '2026-08-12T09:00:00.000Z' });

    expect(isCapabilityFresh(stale, now)).toBe(false);
    expect(evaluateCapability(stale, now).usable).toBe(false);
  });

  it('treats a never-verified capability as unusable, not as healthy', () => {
    expect(evaluateCapability(healthy({ lastVerifiedAt: null }), now).usable).toBe(false);
  });
});

describe('approved fallbacks degrade evidence rather than hiding the failure', () => {
  it('permits the fallback but marks the evidence degraded', () => {
    const verdict = evaluateCapability(
      healthy({ reachability: 'BLOCKED', approvedFallback: 'operator-approved raw HTTP client' }),
      now,
    );

    expect(verdict.usable).toBe(true);
    expect(verdict.degradesEvidence).toBe(true);
    expect(verdict.reasonCodes).toContain('CAPABILITY_USING_APPROVED_FALLBACK');
  });
});

describe('preflight before fan-out', () => {
  it('blocks the fan-out when the shared dependency is down', () => {
    const result = preflightBeforeFanOut({
      requiredOperations: ['research.fetchPage', 'lemlist.searchContacts'],
      registry: [healthy(), healthy({ operation: 'research.fetchPage', reachability: 'BLOCKED' })],
      now,
    });

    expect(result.mayFanOut).toBe(false);
    expect(result.blockedOperations).toEqual(['research.fetchPage']);
  });

  it('blocks the fan-out on an operation nobody has verified at all', () => {
    const result = preflightBeforeFanOut({
      requiredOperations: ['research.fetchPage'],
      registry: [healthy()],
      now,
    });

    expect(result.mayFanOut).toBe(false);
    expect(result.unregisteredOperations).toEqual(['research.fetchPage']);
    expect(result.reasonCodes).toContain('CAPABILITY_NOT_REGISTERED');
  });

  it('allows the fan-out only when every exact operation passes', () => {
    const result = preflightBeforeFanOut({
      requiredOperations: ['lemlist.searchContacts', 'research.fetchPage'],
      registry: [healthy(), healthy({ operation: 'research.fetchPage' })],
      now,
    });

    expect(result.mayFanOut).toBe(true);
    expect(result.degradedOperations).toEqual([]);
  });

  it('surfaces a degraded operation without blocking', () => {
    const result = preflightBeforeFanOut({
      requiredOperations: ['research.fetchPage'],
      registry: [
        healthy({
          operation: 'research.fetchPage',
          reachability: 'BLOCKED',
          approvedFallback: 'operator-approved raw HTTP client',
        }),
      ],
      now,
    });

    expect(result.mayFanOut).toBe(true);
    expect(result.degradedOperations).toEqual(['research.fetchPage']);
  });
});

describe('fix claims', () => {
  it('refuses a fix claim proved through a different path', () => {
    // Raw curl succeeded while the fetch adapter was still blocked.
    const claim = mayClaimCapabilityFixed({
      failedOperation: 'research.fetchPage',
      verifiedOperation: 'shell.curl',
      verifiedAt: '2026-08-12T11:00:00.000Z',
    });

    expect(claim.mayClaim).toBe(false);
    expect(claim.reasonCode).toBe('FIX_CLAIM_VIA_DIFFERENT_PATH');
  });

  it('refuses a fix claim with no verification at all', () => {
    const claim = mayClaimCapabilityFixed({
      failedOperation: 'research.fetchPage',
      verifiedOperation: 'research.fetchPage',
      verifiedAt: null,
    });

    expect(claim.mayClaim).toBe(false);
    expect(claim.reasonCode).toBe('FIX_CLAIM_WITHOUT_VERIFICATION');
  });

  it('accepts a fix proved with the exact tool that failed', () => {
    const claim = mayClaimCapabilityFixed({
      failedOperation: 'research.fetchPage',
      verifiedOperation: 'research.fetchPage',
      verifiedAt: '2026-08-12T11:00:00.000Z',
    });

    expect(claim.mayClaim).toBe(true);
  });
});
