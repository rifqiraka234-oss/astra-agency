import { describe, expect, it } from 'vitest';
import {
  checkCropSafety,
  checkHiddenElements,
  checkIdentityPremise,
  checkImageIntegrity,
  checkMediaPlayback,
  checkPayloadBudget,
  checkTypography,
  gatesPassed,
  verifyLoggedOutDeployment,
  type ImageObservation,
  type LoggedOutVerification,
  type MediaObservation,
} from './qa-gates.js';

/**
 * One test per named historical prototype regression. The specification is
 * explicit that a bug which shipped twice becomes a deterministic test rather
 * than another prose reminder.
 */

describe('the [hidden] regression that shipped twice', () => {
  it('fails when a CSS display rule overrides the hidden attribute', () => {
    const findings = checkHiddenElements([
      {
        selector: '#chapter-2',
        hasHiddenAttribute: true,
        computedDisplay: 'block',
        computedVisibility: 'visible',
        boundingBoxArea: 90_000,
      },
    ]);

    expect(findings).toHaveLength(1);
    expect(findings[0]?.gate).toBe('hidden_attribute_overridden');
    expect(gatesPassed(findings)).toBe(false);
  });

  it('passes when hidden actually hides', () => {
    const findings = checkHiddenElements([
      {
        selector: '#chapter-2',
        hasHiddenAttribute: true,
        computedDisplay: 'none',
        computedVisibility: 'hidden',
        boundingBoxArea: 0,
      },
    ]);

    expect(findings).toEqual([]);
  });
});

describe('the Alan mixed-content hero regression', () => {
  const image = (overrides: Partial<ImageObservation> = {}): ImageObservation => ({
    selector: '.hero img',
    src: 'https://cdn.example.com/hero.jpg',
    naturalWidth: 1920,
    naturalHeight: 1080,
    renderedWidth: 1440,
    renderedHeight: 810,
    objectFit: 'cover',
    isDecorative: false,
    ...overrides,
  });

  it('fails an HTTP asset requested from an HTTPS page', () => {
    const findings = checkImageIntegrity([image({ src: 'http://cdn.example.com/hero.jpg' })], true);

    expect(findings.map((f) => f.gate)).toContain('mixed_content');
  });

  it('fails a zero natural dimension however good the screenshot looks', () => {
    const findings = checkImageIntegrity([image({ naturalWidth: 0, naturalHeight: 0 })], true);

    expect(findings.map((f) => f.gate)).toContain('image_zero_dimension');
  });

  it('passes a loaded HTTPS asset', () => {
    expect(checkImageIntegrity([image()], true)).toEqual([]);
  });
});

describe('the That Animation Company crop regression', () => {
  it('fails a 1920x1080 still forced into a 579x720 portrait frame', () => {
    const findings = checkCropSafety([
      {
        selector: '.project img',
        src: 'https://cdn.example.com/still.jpg',
        naturalWidth: 1920,
        naturalHeight: 1080,
        renderedWidth: 579,
        renderedHeight: 720,
        objectFit: 'cover',
        isDecorative: false,
      },
    ]);

    expect(findings).toHaveLength(1);
    expect(findings[0]?.gate).toBe('unsafe_crop');
    expect(findings[0]?.evidence).toContain('1920x1080');
  });

  it('allows a decorative image to be cropped freely', () => {
    const findings = checkCropSafety([
      {
        selector: '.texture',
        src: 'https://cdn.example.com/texture.jpg',
        naturalWidth: 1920,
        naturalHeight: 1080,
        renderedWidth: 400,
        renderedHeight: 900,
        objectFit: 'cover',
        isDecorative: true,
      },
    ]);

    expect(findings).toEqual([]);
  });

  it('allows a mild ratio adjustment within the same orientation', () => {
    const findings = checkCropSafety([
      {
        selector: '.project img',
        src: 'https://cdn.example.com/still.jpg',
        naturalWidth: 1920,
        naturalHeight: 1080,
        renderedWidth: 1200,
        renderedHeight: 800,
        objectFit: 'cover',
        isDecorative: false,
      },
    ]);

    expect(findings).toEqual([]);
  });
});

describe('the reel readyState regression', () => {
  const reel = (overrides: Partial<MediaObservation>): MediaObservation => ({
    selector: 'video.reel',
    kind: 'video',
    src: 'https://cdn.example.com/reel-2d.mp4',
    readyState: 4,
    hasPoster: true,
    playbackAttempted: true,
    playbackSucceeded: true,
    decodeError: null,
    stateLabel: '2d-reel',
    ...overrides,
  });

  it('fails a state that never reached a playable readyState even with a poster', () => {
    const findings = checkMediaPlayback([
      reel({}),
      reel({ stateLabel: '3d-reel', readyState: 0, playbackSucceeded: false }),
    ]);

    expect(findings).toHaveLength(1);
    expect(findings[0]?.gate).toBe('media_did_not_play');
    expect(findings[0]?.evidence).toContain('3d-reel');
  });

  it('fails a state the harness never actually exercised', () => {
    const findings = checkMediaPlayback([
      reel({ stateLabel: '3d-reel', playbackAttempted: false, playbackSucceeded: false }),
    ]);

    expect(findings[0]?.gate).toBe('media_state_not_exercised');
  });

  it('fails an H264 medium the harness could not decode rather than passing it silently', () => {
    const findings = checkMediaPlayback([
      reel({ decodeError: 'H264 decoder unavailable', playbackSucceeded: false }),
    ]);

    expect(findings[0]?.gate).toBe('media_decode_failed');
  });

  it('passes when every state actually played', () => {
    expect(checkMediaPlayback([reel({}), reel({ stateLabel: '3d-reel' })])).toEqual([]);
  });
});

describe('the blocked Google Fonts regression', () => {
  it('fails a blocked webfont rather than accepting the fallback', () => {
    const findings = checkTypography([
      {
        family: 'Libre Baskerville',
        resolvedFamily: 'Times New Roman',
        loadedFromNetwork: false,
        networkBlocked: true,
      },
    ]);

    expect(findings[0]?.gate).toBe('font_network_blocked');
  });

  it('fails when the intended face is not the face rendering', () => {
    const findings = checkTypography([
      {
        family: 'Libre Baskerville',
        resolvedFamily: 'Georgia',
        loadedFromNetwork: false,
        networkBlocked: false,
      },
    ]);

    expect(findings[0]?.gate).toBe('font_fallback_masked');
  });

  it('passes a genuinely loaded webfont', () => {
    expect(
      checkTypography([
        {
          family: 'Libre Baskerville',
          resolvedFamily: 'Libre Baskerville',
          loadedFromNetwork: true,
          networkBlocked: false,
        },
      ]),
    ).toEqual([]);
  });
});

describe('the embedded payload regression', () => {
  it('fails the 7.37M character single-file bundle', () => {
    const findings = checkPayloadBudget({
      largestFileChars: 7_370_000,
      totalChars: 7_370_000,
      inlineBase64AssetCount: 12,
    });

    expect(findings.map((f) => f.gate)).toContain('payload_single_file_too_large');
    expect(findings.map((f) => f.gate)).toContain('payload_bundle_too_large');
    expect(gatesPassed(findings)).toBe(false);
  });

  it('warns but does not fail on a small inline asset', () => {
    const findings = checkPayloadBudget({
      largestFileChars: 50_000,
      totalChars: 120_000,
      inlineBase64AssetCount: 1,
    });

    expect(gatesPassed(findings)).toBe(true);
    expect(findings.map((f) => f.gate)).toContain('payload_inline_base64');
  });
});

describe('logged-out deployment verification', () => {
  const verification = (
    overrides: Partial<LoggedOutVerification> = {},
  ): LoggedOutVerification => ({
    url: 'https://astra-point-audit-prototype.netlify.app/',
    usedHttps: true,
    status: 200,
    anonymous: true,
    title: 'Point Audit concept v3',
    expectedTitleFragment: 'Point Audit',
    ssoOrPasswordWallDetected: false,
    bundleManifestHash: 'abc123',
    approvedBundleHash: 'abc123',
    consoleHardErrors: [],
    immutableDeployUrl: 'https://deadbeef--astra-point-audit-prototype.netlify.app/',
    friendlyUrl: 'https://astra-point-audit-prototype.netlify.app/',
    ...overrides,
  });

  it('fails the Netlify SSO wall that a logged-in view hid', () => {
    const findings = verifyLoggedOutDeployment(
      verification({ status: 401, ssoOrPasswordWallDetected: true }),
    );

    expect(findings.map((f) => f.gate)).toContain('deployment_behind_access_wall');
    expect(findings.map((f) => f.gate)).toContain('deployment_bad_status');
  });

  it('refuses to count a credentialed request as verification at all', () => {
    const findings = verifyLoggedOutDeployment(verification({ anonymous: false }));

    expect(findings.map((f) => f.gate)).toContain('deployment_not_verified_anonymously');
  });

  it('fails when the deployed bundle is not the approved bundle', () => {
    const findings = verifyLoggedOutDeployment(verification({ bundleManifestHash: 'other' }));

    expect(findings.map((f) => f.gate)).toContain('deployment_bundle_mismatch');
  });

  it('fails when the page does not identify the expected company', () => {
    const findings = verifyLoggedOutDeployment(verification({ title: 'Site' }));

    expect(findings.map((f) => f.gate)).toContain('deployment_wrong_identity');
  });

  it('requires both the immutable and the friendly URL to be recorded', () => {
    const findings = verifyLoggedOutDeployment(verification({ immutableDeployUrl: null }));

    expect(findings.map((f) => f.gate)).toContain('deployment_urls_not_recorded');
  });

  it('passes a genuinely public, correct deployment', () => {
    expect(verifyLoggedOutDeployment(verification())).toEqual([]);
  });
});

describe('the Voortman premise regression', () => {
  it('fails a domain chosen on a single source', () => {
    const findings = checkIdentityPremise({
      personName: 'Rosalie Voortman',
      companyName: 'Rosalie Voortman',
      chosenDomain: 'voortman-baumhauer.nl',
      corroboratingSources: ['a single search result'],
      rejectedCandidates: [],
    });

    expect(findings.map((f) => f.gate)).toContain('identity_premise_uncorroborated');
  });

  it('fails when a plausible alternative was discarded without a reason', () => {
    const findings = checkIdentityPremise({
      personName: 'Rosalie Voortman',
      companyName: 'Rosalie Voortman',
      chosenDomain: 'voortman-baumhauer.nl',
      corroboratingSources: ['source a', 'source b'],
      rejectedCandidates: [{ domain: 'rosalievoortman.com', reason: '' }],
    });

    expect(findings.map((f) => f.gate)).toContain('identity_candidate_rejected_without_reason');
  });

  it('passes a corroborated premise with documented rejections', () => {
    const findings = checkIdentityPremise({
      personName: 'Rosalie Voortman',
      companyName: 'Rosalie Voortman',
      chosenDomain: 'rosalievoortman.com',
      corroboratingSources: ['her LinkedIn profile links this domain', 'the domain names her'],
      rejectedCandidates: [
        { domain: 'voortman-baumhauer.nl', reason: 'A funeral business, unrelated to her work.' },
      ],
    });

    expect(findings).toEqual([]);
  });
});
