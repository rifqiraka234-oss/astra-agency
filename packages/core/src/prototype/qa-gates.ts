/**
 * Deterministic prototype QA gates for the named historical regressions
 * (specification sections 23, 25.7, 34.3, 34.5, 34.7).
 *
 * Every gate here exists because a specific bug shipped, and in one case
 * shipped twice. The spec is explicit that a repeated bug must become a
 * deterministic test rather than another prose reminder, so these operate on a
 * structural report produced by the real browser run and return findings that
 * fail closed.
 *
 * Deliberately *not* here: anything a screenshot or a poster image could fake.
 * A poster frame is not proof a video plays; a rendered logged-in page is not
 * proof a stranger can load it.
 */

export interface QaGateFinding {
  readonly gate: string;
  readonly severity: 'FAIL' | 'WARN';
  readonly detail: string;
  readonly evidence?: string;
}

// --- the [hidden] regression -------------------------------------------------

export interface HiddenElementObservation {
  readonly selector: string;
  /** The element carries the `hidden` attribute. */
  readonly hasHiddenAttribute: boolean;
  /** Computed `display` after all stylesheets. */
  readonly computedDisplay: string;
  readonly computedVisibility: string;
  readonly boundingBoxArea: number;
}

/**
 * `[hidden]` is only a default style, and any rule with a `display` value
 * overrides it. This shipped twice: elements marked hidden rendered on the live
 * site. The check is on the *computed* style, not the attribute, because the
 * attribute is exactly what lied.
 */
export function checkHiddenElements(
  observations: readonly HiddenElementObservation[],
): QaGateFinding[] {
  return observations
    .filter(
      (o) =>
        o.hasHiddenAttribute &&
        o.computedDisplay !== 'none' &&
        o.computedVisibility !== 'hidden' &&
        o.boundingBoxArea > 0,
    )
    .map((o) => ({
      gate: 'hidden_attribute_overridden',
      severity: 'FAIL' as const,
      detail:
        'An element carrying the hidden attribute is still rendered because a CSS display rule overrides it.',
      evidence: `${o.selector} computed display=${o.computedDisplay}, area=${String(o.boundingBoxArea)}`,
    }));
}

// --- zero dimension and mixed content ---------------------------------------

export interface ImageObservation {
  readonly selector: string;
  readonly src: string;
  readonly naturalWidth: number;
  readonly naturalHeight: number;
  readonly renderedWidth: number;
  readonly renderedHeight: number;
  readonly objectFit: string;
  readonly isDecorative: boolean;
}

/**
 * A zero natural dimension means the image never loaded, whatever the layout
 * looks like. The Alan hero failed this way: an HTTP asset requested from an
 * HTTPS page was blocked, and the page still looked plausible in a screenshot.
 */
export function checkImageIntegrity(
  images: readonly ImageObservation[],
  pageIsHttps: boolean,
): QaGateFinding[] {
  const findings: QaGateFinding[] = [];

  for (const image of images) {
    if (image.naturalWidth === 0 || image.naturalHeight === 0) {
      findings.push({
        gate: 'image_zero_dimension',
        severity: 'FAIL',
        detail: 'An image reported a zero natural dimension, so it did not load.',
        evidence: `${image.selector} src=${image.src}`,
      });
    }
    if (pageIsHttps && image.src.startsWith('http://')) {
      findings.push({
        gate: 'mixed_content',
        severity: 'FAIL',
        detail: 'An HTTPS page requests an asset over plain HTTP; browsers block it.',
        evidence: `${image.selector} src=${image.src}`,
      });
    }
  }

  return findings;
}

/**
 * The canonical unsafe crop fixture: native 1920x1080 stills displayed at
 * roughly 579x720 with `object-fit: cover`. Landscape source forced into a
 * portrait frame loses most of the horizontal field, which is where the
 * subject usually is.
 */
export const UNSAFE_CROP_RATIO_DELTA = 0.6;

export function checkCropSafety(images: readonly ImageObservation[]): QaGateFinding[] {
  const findings: QaGateFinding[] = [];

  for (const image of images) {
    if (image.isDecorative) continue;
    if (image.objectFit !== 'cover') continue;
    if (image.naturalWidth === 0 || image.naturalHeight === 0) continue;
    if (image.renderedWidth === 0 || image.renderedHeight === 0) continue;

    const sourceRatio = image.naturalWidth / image.naturalHeight;
    const frameRatio = image.renderedWidth / image.renderedHeight;
    // Orientation flip is the dangerous case: landscape source, portrait frame.
    const orientationFlipped = (sourceRatio > 1 && frameRatio < 1) || (sourceRatio < 1 && frameRatio > 1);
    const relativeDelta = Math.abs(sourceRatio - frameRatio) / Math.max(sourceRatio, frameRatio);

    if (orientationFlipped || relativeDelta > UNSAFE_CROP_RATIO_DELTA) {
      findings.push({
        gate: 'unsafe_crop',
        severity: 'FAIL',
        detail:
          'A meaningful image is cropped across an orientation change, so most of the subject is cut away.',
        evidence: `${image.selector} source ${String(image.naturalWidth)}x${String(image.naturalHeight)} shown at ${String(image.renderedWidth)}x${String(image.renderedHeight)}`,
      });
    }
  }

  return findings;
}

// --- media playback ----------------------------------------------------------

export interface MediaObservation {
  readonly selector: string;
  readonly kind: 'video' | 'audio';
  readonly src: string;
  /** HTMLMediaElement.readyState after the harness exercised the element. */
  readonly readyState: number;
  readonly hasPoster: boolean;
  readonly playbackAttempted: boolean;
  readonly playbackSucceeded: boolean;
  readonly decodeError: string | null;
  /** Named state this element represents, e.g. `2d-reel`, `3d-reel`. */
  readonly stateLabel: string;
}

/**
 * Every media state must be exercised individually. Historically one 2D reel
 * reached a ready state while the alternate 2D and 3D states stayed at
 * `readyState 0`, and the presence of a poster made the page look fine. A
 * poster is not playback, and one working state is not the others.
 */
export function checkMediaPlayback(media: readonly MediaObservation[]): QaGateFinding[] {
  const findings: QaGateFinding[] = [];
  const seenStates = new Set<string>();

  for (const item of media) {
    seenStates.add(item.stateLabel);

    if (!item.playbackAttempted) {
      findings.push({
        gate: 'media_state_not_exercised',
        severity: 'FAIL',
        detail: 'A media state was never actually played, so its poster proves nothing.',
        evidence: `${item.selector} state=${item.stateLabel}`,
      });
      continue;
    }
    if (item.decodeError !== null) {
      findings.push({
        gate: 'media_decode_failed',
        severity: 'FAIL',
        detail: 'The harness could not decode this medium, so playback is unverified.',
        evidence: `${item.selector} ${item.decodeError}`,
      });
      continue;
    }
    if (!item.playbackSucceeded || item.readyState === 0) {
      findings.push({
        gate: 'media_did_not_play',
        severity: 'FAIL',
        detail: 'A media element never reached a playable ready state.',
        evidence: `${item.selector} state=${item.stateLabel} readyState=${String(item.readyState)}`,
      });
    }
  }

  return findings;
}

// --- typography --------------------------------------------------------------

export interface FontObservation {
  readonly family: string;
  /** The font this element is actually rendering with. */
  readonly resolvedFamily: string;
  readonly loadedFromNetwork: boolean;
  readonly networkBlocked: boolean;
}

/**
 * Google Fonts were blocked during a historical run and the fallback stack
 * silently absorbed it, so the deployed typography was not the designed
 * typography and nobody noticed. A blocked webfont is an unverified state, not
 * a graceful degradation.
 */
export function checkTypography(fonts: readonly FontObservation[]): QaGateFinding[] {
  const findings: QaGateFinding[] = [];

  for (const font of fonts) {
    if (font.networkBlocked) {
      findings.push({
        gate: 'font_network_blocked',
        severity: 'FAIL',
        detail:
          'A webfont request was blocked, so the rendered typography is a fallback rather than the designed face.',
        evidence: font.family,
      });
      continue;
    }
    if (!font.loadedFromNetwork && !font.resolvedFamily.toLowerCase().includes(font.family.toLowerCase())) {
      findings.push({
        gate: 'font_fallback_masked',
        severity: 'FAIL',
        detail: 'The intended font is not the font actually rendering.',
        evidence: `${font.family} rendered as ${font.resolvedFamily}`,
      });
    }
  }

  return findings;
}

// --- payload budget ----------------------------------------------------------

/**
 * Embedded payloads of roughly 1.62M, 0.48M and 7.37M characters were shipped
 * as single HTML files, partly for convenience. Base64 inlining is no longer
 * the default and a budget makes the regression visible.
 */
export const MAX_INLINE_PAYLOAD_CHARS = 400_000;
export const MAX_TOTAL_BUNDLE_CHARS = 3_000_000;

export function checkPayloadBudget(input: {
  readonly largestFileChars: number;
  readonly totalChars: number;
  readonly inlineBase64AssetCount: number;
}): QaGateFinding[] {
  const findings: QaGateFinding[] = [];

  if (input.largestFileChars > MAX_INLINE_PAYLOAD_CHARS) {
    findings.push({
      gate: 'payload_single_file_too_large',
      severity: 'FAIL',
      detail: 'A single file exceeds the inline payload budget; assets belong in separate files.',
      evidence: `${String(input.largestFileChars)} characters`,
    });
  }
  if (input.totalChars > MAX_TOTAL_BUNDLE_CHARS) {
    findings.push({
      gate: 'payload_bundle_too_large',
      severity: 'FAIL',
      detail: 'The bundle exceeds the total payload budget.',
      evidence: `${String(input.totalChars)} characters`,
    });
  }
  if (input.inlineBase64AssetCount > 0) {
    findings.push({
      gate: 'payload_inline_base64',
      severity: 'WARN',
      detail: 'Assets are inlined as base64 rather than served as files.',
      evidence: `${String(input.inlineBase64AssetCount)} inline assets`,
    });
  }

  return findings;
}

// --- logged-out deployment verification --------------------------------------

export interface LoggedOutVerification {
  readonly url: string;
  readonly usedHttps: boolean;
  readonly status: number;
  /** True when the request carried no session, cookie or token whatsoever. */
  readonly anonymous: boolean;
  readonly title: string;
  readonly expectedTitleFragment: string;
  readonly ssoOrPasswordWallDetected: boolean;
  readonly bundleManifestHash: string;
  readonly approvedBundleHash: string;
  readonly consoleHardErrors: readonly string[];
  readonly immutableDeployUrl: string | null;
  readonly friendlyUrl: string | null;
}

/**
 * Section 24.3. An unauthenticated `curl` once caught a 401 that a logged-in
 * browser view had hidden completely, and an account-wide SSO toggle turned out
 * to have changed only one site. So this verifies per site, anonymously, and
 * treats a non-anonymous check as no check at all.
 */
export function verifyLoggedOutDeployment(v: LoggedOutVerification): QaGateFinding[] {
  const findings: QaGateFinding[] = [];

  if (!v.anonymous) {
    findings.push({
      gate: 'deployment_not_verified_anonymously',
      severity: 'FAIL',
      detail: 'The verification request carried credentials, so it proves nothing about a stranger.',
      evidence: v.url,
    });
  }
  if (!v.usedHttps) {
    findings.push({
      gate: 'deployment_not_https',
      severity: 'FAIL',
      detail: 'The deployment was not verified over HTTPS.',
      evidence: v.url,
    });
  }
  if (v.status !== 200) {
    findings.push({
      gate: 'deployment_bad_status',
      severity: 'FAIL',
      detail: 'An anonymous request did not receive 200.',
      evidence: `${v.url} returned ${String(v.status)}`,
    });
  }
  if (v.ssoOrPasswordWallDetected) {
    findings.push({
      gate: 'deployment_behind_access_wall',
      severity: 'FAIL',
      detail: 'The site is behind an SSO or password wall, so the prospect cannot open it.',
      evidence: v.url,
    });
  }
  if (!v.title.toLowerCase().includes(v.expectedTitleFragment.toLowerCase())) {
    findings.push({
      gate: 'deployment_wrong_identity',
      severity: 'FAIL',
      detail: 'The deployed page title does not identify the expected company or version.',
      evidence: `title="${v.title}" expected to contain "${v.expectedTitleFragment}"`,
    });
  }
  if (v.bundleManifestHash !== v.approvedBundleHash) {
    findings.push({
      gate: 'deployment_bundle_mismatch',
      severity: 'FAIL',
      detail: 'What is deployed does not match the approved bundle.',
      evidence: `${v.bundleManifestHash} != ${v.approvedBundleHash}`,
    });
  }
  for (const error of v.consoleHardErrors) {
    findings.push({
      gate: 'deployment_console_error',
      severity: 'FAIL',
      detail: 'The deployed page reported a hard console or network failure.',
      evidence: error,
    });
  }
  if (v.immutableDeployUrl === null || v.friendlyUrl === null) {
    findings.push({
      gate: 'deployment_urls_not_recorded',
      severity: 'FAIL',
      detail: 'Both the immutable deploy URL and the friendly URL must be recorded.',
    });
  }

  return findings;
}

// --- identity premise --------------------------------------------------------

/**
 * The Voortman failure: research settled on `voortman-baumhauer.nl`, a funeral
 * business, when the prospect's own work lived at `rosalievoortman.com`. The
 * premise was wrong before a single design decision was made, so the domain and
 * the person must be corroborated by two independent sources before research
 * proceeds.
 */
export interface IdentityPremise {
  readonly personName: string;
  readonly companyName: string;
  readonly chosenDomain: string;
  /** Independent sources that link this person to this exact domain. */
  readonly corroboratingSources: readonly string[];
  /** Other domains that plausibly matched and were rejected. */
  readonly rejectedCandidates: readonly { readonly domain: string; readonly reason: string }[];
}

export function checkIdentityPremise(premise: IdentityPremise): QaGateFinding[] {
  const findings: QaGateFinding[] = [];

  if (premise.corroboratingSources.length < 2) {
    findings.push({
      gate: 'identity_premise_uncorroborated',
      severity: 'FAIL',
      detail:
        'Fewer than two independent sources link this person to this domain, so the premise is unproven.',
      evidence: `${premise.personName} / ${premise.chosenDomain}`,
    });
  }
  const undocumented = premise.rejectedCandidates.filter((c) => c.reason.trim().length === 0);
  for (const candidate of undocumented) {
    findings.push({
      gate: 'identity_candidate_rejected_without_reason',
      severity: 'FAIL',
      detail: 'A plausible alternative domain was rejected without a stated reason.',
      evidence: candidate.domain,
    });
  }

  return findings;
}

export function gatesPassed(findings: readonly QaGateFinding[]): boolean {
  return findings.every((f) => f.severity !== 'FAIL');
}
