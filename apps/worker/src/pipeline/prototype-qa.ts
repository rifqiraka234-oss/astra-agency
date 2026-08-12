import type { PrototypeFile } from '@astra/integrations';

/**
 * Prototype quality gate.
 *
 * A prototype that fails any of these is not deployed and not offered for
 * approval. The checks are deliberately concrete rather than aesthetic: they
 * catch the things that would embarrass Astra in front of a prospect
 * (placeholder text, a broken mobile layout, a form that actually posts
 * somewhere) and the things that would be a genuine problem (a secret in the
 * source, a missing disclosure, a page that invites indexing).
 */

export interface QaFinding {
  readonly check: string;
  readonly severity: 'FAIL' | 'WARN';
  readonly detail: string;
  readonly file?: string;
}

export interface QaReport {
  readonly passed: boolean;
  readonly findings: readonly QaFinding[];
  readonly checkedAt: string;
  readonly screenshots: {
    readonly desktop: string | null;
    readonly mobile: string | null;
  };
}

const REQUIRED_DISCLOSURE = 'Unofficial concept by Astra Agency, prepared for discussion.';

const PLACEHOLDER_PATTERNS: ReadonlyArray<{ pattern: RegExp; label: string }> = [
  { pattern: /lorem ipsum/i, label: 'lorem ipsum' },
  { pattern: /\{\{[^}]+\}\}/, label: 'unresolved template variable' },
  { pattern: /\[(your|company|insert)[^\]]*\]/i, label: 'bracketed placeholder' },
  { pattern: /\bTBD\b|\bTODO\b|\bFIXME\b/, label: 'TODO marker' },
  { pattern: /your (headline|text|content) here/i, label: 'placeholder copy' },
];

const SECRET_PATTERNS: ReadonlyArray<{ pattern: RegExp; label: string }> = [
  { pattern: /sk-ant-[A-Za-z0-9_-]{10,}/, label: 'Anthropic key' },
  { pattern: /\bre_[A-Za-z0-9]{16,}/, label: 'Resend key' },
  { pattern: /AKIA[0-9A-Z]{16}/, label: 'AWS access key' },
  { pattern: /-----BEGIN [A-Z ]*PRIVATE KEY-----/, label: 'private key' },
  { pattern: /\b(api[_-]?key|secret|password|token)\s*[:=]\s*['"][^'"]{12,}['"]/i, label: 'inline credential' },
];

export interface StaticQaInput {
  readonly files: readonly PrototypeFile[];
  readonly companyName: string;
}

export function runStaticQa(input: StaticQaInput): QaFinding[] {
  const findings: QaFinding[] = [];
  const html = input.files.find((file) => file.path.replace(/^\//, '') === 'index.html');

  if (!html) {
    findings.push({ check: 'build', severity: 'FAIL', detail: 'No index.html was produced.' });
    return findings;
  }

  const robots = input.files.find((file) => file.path.replace(/^\//, '') === 'robots.txt');
  if (!robots) {
    findings.push({ check: 'robots_txt', severity: 'FAIL', detail: 'robots.txt is missing.' });
  } else if (!/Disallow:\s*\//i.test(robots.content)) {
    findings.push({
      check: 'robots_txt',
      severity: 'FAIL',
      detail: 'robots.txt does not disallow crawling.',
    });
  }

  if (!/<meta[^>]+name=["']robots["'][^>]+noindex/i.test(html.content)) {
    findings.push({
      check: 'robots_meta',
      severity: 'FAIL',
      detail: 'The noindex,nofollow,noarchive robots meta tag is missing.',
    });
  }

  if (!html.content.includes(REQUIRED_DISCLOSURE)) {
    findings.push({
      check: 'disclosure',
      severity: 'FAIL',
      // Without this the page can be mistaken for the company's real site,
      // which is the single most damaging thing a prototype can do.
      detail: `The required footer disclosure is missing: "${REQUIRED_DISCLOSURE}"`,
    });
  }

  for (const file of input.files) {
    for (const { pattern, label } of PLACEHOLDER_PATTERNS) {
      if (pattern.test(file.content)) {
        findings.push({
          check: 'placeholders',
          severity: 'FAIL',
          detail: `Contains ${label}.`,
          file: file.path,
        });
      }
    }
    for (const { pattern, label } of SECRET_PATTERNS) {
      if (pattern.test(file.content)) {
        findings.push({
          check: 'secrets',
          severity: 'FAIL',
          detail: `Looks like a ${label} is embedded in the file.`,
          file: file.path,
        });
      }
    }
  }

  // A form that can actually submit is a form that can collect personal data
  // from someone who never agreed to give it to us.
  const formMatches = [...html.content.matchAll(/<form\b[^>]*>/gi)];
  for (const match of formMatches) {
    const tag = match[0];
    const hasAction = /\baction\s*=\s*["'][^"']*[^"'\s][^"']*["']/i.test(tag);
    const isInert = /\bonsubmit\s*=\s*["']return false/i.test(tag);
    if (hasAction && !isInert) {
      findings.push({
        check: 'inert_forms',
        severity: 'FAIL',
        detail: 'A form has a live action attribute. Concept forms must not submit anywhere.',
      });
    }
  }
  if (formMatches.length > 0 && !/disabled/i.test(html.content)) {
    findings.push({
      check: 'inert_forms',
      severity: 'FAIL',
      detail: 'A form is present but no field is marked disabled.',
    });
  }

  if (/<(script|img|iframe)[^>]+src=["']https?:\/\/(?!fonts\.|cdn\.jsdelivr)/i.test(html.content)) {
    findings.push({
      check: 'external_assets',
      severity: 'WARN',
      detail: 'The page references an external asset that could disappear or track visitors.',
    });
  }

  if (/(google-analytics|googletagmanager|gtag\(|fbq\(|hotjar|segment\.com)/i.test(html.content)) {
    findings.push({
      check: 'tracking',
      severity: 'FAIL',
      detail: 'Analytics or tracking code is present. A concept page must not track anyone.',
    });
  }

  if (/document\.cookie|localStorage\.setItem/i.test(html.content)) {
    findings.push({
      check: 'storage',
      severity: 'FAIL',
      detail: 'The page writes cookies or local storage.',
    });
  }

  // Broken internal links look careless in a document whose only job is to
  // look considered.
  for (const match of html.content.matchAll(/href=["'](?!https?:|mailto:|#|tel:)([^"']+)["']/gi)) {
    const target = (match[1] ?? '').replace(/^\.?\//, '').split('#')[0] ?? '';
    if (target.length === 0) continue;
    const exists = input.files.some((file) => file.path.replace(/^\//, '') === target);
    if (!exists) {
      findings.push({
        check: 'internal_links',
        severity: 'FAIL',
        detail: `Internal link points at a file that was not produced: ${target}`,
      });
    }
  }

  const title = /<title[^>]*>([\s\S]*?)<\/title>/i.exec(html.content)?.[1]?.trim() ?? '';
  if (title.length === 0) {
    findings.push({ check: 'title', severity: 'FAIL', detail: 'The page has no title.' });
  }

  // Spelling the prospect's company name wrong undoes the entire exercise.
  if (input.companyName.length > 2 && !containsCompanyName(html.content, input.companyName)) {
    findings.push({
      check: 'company_name',
      severity: 'FAIL',
      detail: `The company name "${input.companyName}" does not appear on the page.`,
    });
  }

  for (const match of html.content.matchAll(/<img\b(?![^>]*\balt=)[^>]*>/gi)) {
    findings.push({
      check: 'accessibility',
      severity: 'FAIL',
      detail: `An image has no alt attribute: ${match[0].slice(0, 80)}`,
    });
  }

  if (!/<h1\b/i.test(html.content)) {
    findings.push({
      check: 'accessibility',
      severity: 'FAIL',
      detail: 'The page has no h1 heading.',
    });
  }

  return findings;
}

function containsCompanyName(content: string, companyName: string): boolean {
  const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
  return normalize(content).includes(normalize(companyName));
}

export interface VisualQaResult {
  readonly findings: readonly QaFinding[];
  readonly desktopScreenshot: string | null;
  readonly mobileScreenshot: string | null;
}

/**
 * Desktop and mobile rendering checks.
 *
 * Playwright is loaded lazily and its absence is a FAIL, not a skip. A visual
 * gate that quietly turns itself off when a browser is missing is a gate that
 * will be off in production on the one day it mattered.
 */
export async function runVisualQa(
  html: string,
  artifactDir: string,
): Promise<VisualQaResult> {
  let chromium: typeof import('playwright').chromium;
  try {
    ({ chromium } = await import('playwright'));
  } catch {
    return {
      findings: [
        {
          check: 'visual',
          severity: 'FAIL',
          detail:
            'Playwright is not installed, so desktop and mobile rendering could not be verified. Install it or disable prototype deploys.',
        },
      ],
      desktopScreenshot: null,
      mobileScreenshot: null,
    };
  }

  const findings: QaFinding[] = [];
  const browser = await chromium.launch({
    ...(process.env['PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH']
      ? { executablePath: process.env['PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH'] }
      : {}),
  });

  try {
    const consoleErrors: string[] = [];
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    page.on('console', (message) => {
      if (message.type() === 'error') consoleErrors.push(message.text());
    });

    await page.setContent(html, { waitUntil: 'load' });
    const desktopPath = `${artifactDir}/desktop.png`;
    await page.screenshot({ path: desktopPath, fullPage: true });

    // Keyboard reachability: every interactive element must be focusable.
    const unreachable = await page.evaluate(() => {
      const interactive = Array.prototype.slice.call(
        document.querySelectorAll('a[href], button, input, select, textarea'),
      ) as HTMLElement[];
      return interactive.filter((element) => element.tabIndex < 0).length;
    });
    if (unreachable > 0) {
      findings.push({
        check: 'keyboard',
        severity: 'FAIL',
        detail: `${unreachable} interactive element(s) cannot be reached with the keyboard.`,
      });
    }

    for (const width of [360, 390]) {
      await page.setViewportSize({ width, height: 800 });
      const overflow = await page.evaluate(
        (viewportWidth) => document.documentElement.scrollWidth > viewportWidth + 1,
        width,
      );
      if (overflow) {
        findings.push({
          check: 'mobile_overflow',
          severity: 'FAIL',
          detail: `The page scrolls horizontally at ${width}px wide.`,
        });
      }
    }

    const mobilePath = `${artifactDir}/mobile.png`;
    await page.screenshot({ path: mobilePath, fullPage: true });

    if (consoleErrors.length > 0) {
      findings.push({
        check: 'console',
        severity: 'FAIL',
        detail: `The page logged ${consoleErrors.length} console error(s): ${consoleErrors[0]}`,
      });
    }

    return { findings, desktopScreenshot: desktopPath, mobileScreenshot: mobilePath };
  } finally {
    await browser.close();
  }
}

export function buildReport(
  findings: readonly QaFinding[],
  screenshots: { desktop: string | null; mobile: string | null },
): QaReport {
  return {
    passed: findings.every((finding) => finding.severity !== 'FAIL'),
    findings,
    checkedAt: new Date().toISOString(),
    screenshots,
  };
}
