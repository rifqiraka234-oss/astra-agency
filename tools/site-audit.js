#!/usr/bin/env node
/**
 * One pass site audit for the five angles in CLAUDE.md.
 *
 *   node tools/site-audit.js https://example.com out-tag
 *
 * Writes <tag>.json plus <tag>-desktop.png and <tag>-phone.png into the
 * scratch directory, and prints a summary. Everything it reports is an
 * observation, never a verdict. The verdict is yours, after you have looked
 * at the screenshots.
 *
 * The GDPR pass is the part that has to be done exactly right. It loads the
 * page in a FRESH context, touches nothing, and records every third party
 * request and every cookie that exists BEFORE any interaction with the
 * banner. That is the thing regulators actually fine, so that is the thing
 * we measure. It never clicks accept.
 */

const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs');
const path = require('path');

// The egress proxy re terminates TLS, so Chromium has to trust its CA. Pin by
// key rather than disabling verification. See CLAUDE.md, the build toolchain.
const PROXY_CA_SPKI = 'KnP1OnzHv/y42eRQmbGwoYTHcSJF448m6CU5mdngwKk=';

const SOCIAL = {
  linkedin: /linkedin\.com\/(company|in)\//i,
  instagram: /instagram\.com\//i,
  facebook: /facebook\.com\//i,
  youtube: /youtube\.com\/|youtu\.be\//i,
  x: /(twitter\.com|x\.com)\//i,
  tiktok: /tiktok\.com\//i,
  pinterest: /pinterest\.[a-z.]+\//i,
  whatsapp: /(wa\.me|api\.whatsapp\.com)/i,
  telegram: /t\.me\//i,
};

// Third party hosts that carry personal data (an IP address is enough) and so
// need consent first. Loading any of these before a click is the finding.
const TRACKER_HINTS = [
  'google-analytics.com', 'googletagmanager.com', 'doubleclick.net',
  'googlesyndication.com', 'googleadservices.com', 'facebook.net',
  'facebook.com/tr', 'connect.facebook', 'hotjar', 'clarity.ms',
  'linkedin.com/px', 'snap.licdn.com', 'ads.linkedin', 'tiktok.com/i18n',
  'analytics.tiktok', 'matomo', 'segment.com', 'mixpanel', 'fullstory',
  'intercom', 'hubspot', 'pardot', 'criteo', 'taboola', 'outbrain',
  'youtube.com/embed', 'vimeo.com/video', 'maps.googleapis', 'maps.google',
  'fonts.googleapis.com', 'fonts.gstatic.com', 'ajax.googleapis.com',
  'recaptcha', 'gstatic.com/recaptcha',
];

const CMP_HINTS = [
  'cookiebot', 'consentmanager', 'onetrust', 'cookieyes', 'iubenda',
  'usercentrics', 'termly', 'complianz', 'borlabs', 'klaro', 'tarteaucitron',
  'axeptio', 'didomi', 'quantcast', 'cookie-script', 'cookiehub', 'cookiefirst',
];

const DATED_TELLS = [
  { key: 'fireworksExport', re: /\.fw[._](png|jpe?g)/i, note: 'Adobe Fireworks export naming, Fireworks was discontinued in 2013' },
  { key: 'flash', re: /\.swf\b|shockwave-flash/i, note: 'Flash asset, dead since 2020' },
  { key: 'jqueryV1', re: /jquery[.-]?1\.\d+(\.\d+)?(\.min)?\.js/i, note: 'jQuery 1.x' },
  { key: 'tableLayout', re: /<table[^>]+(width|cellpadding|cellspacing)=/i, note: 'table used for layout with presentational attributes' },
  { key: 'fontAwesome4orOlder', re: /font-?awesome[/-]?([1-4])\.[\d.]+/i, note: 'Font Awesome 4 or older, FA4 is from 2014' },
  { key: 'bootstrap3orOlder', re: /bootstrap[/-]?([23])\.[\d.]+/i, note: 'Bootstrap 3 or older' },
  { key: 'entypoFontello', re: /entypo|fontello/i, note: 'bundled icon font from a bought theme' },
  { key: 'xhtmlDoctype', re: /DTD XHTML|DTD HTML 4/i, note: 'XHTML or HTML4 doctype' },
];

const BOUGHT_THEMES = /\/(?:wp-content\/themes|themes)\/(enfold|avada|betheme|the7|x|flatsome|jupiter|salient|bridge|impreza|divi|astra|oceanwp|generatepress|kadence|highendwp|semplice\d*)/i;

function classify(url, base) {
  try {
    const u = new URL(url, base);
    const b = new URL(base);
    return u.host.replace(/^www\./, '') === b.host.replace(/^www\./, '') ? 'first' : 'third';
  } catch { return 'unknown'; }
}

(async () => {
  const target = process.argv[2];
  const tag = process.argv[3] || 'audit';
  const outDir = process.env.AUDIT_OUT || '/tmp/claude-0';
  if (!target) { console.error('usage: node tools/site-audit.js <url> <tag>'); process.exit(1); }
  fs.mkdirSync(outDir, { recursive: true });

  const browser = await chromium.launch({
    executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
    args: ['--no-sandbox', `--ignore-certificate-errors-spki-list=${PROXY_CA_SPKI}`],
  });

  // Fresh context, no stored consent, nothing clicked. This is the state a
  // first time visitor from the EU arrives in.
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 }, locale: 'en-GB' });
  const page = await ctx.newPage();

  const requests = [];
  const pageErrors = [];
  const failed = [];
  page.on('request', (r) => requests.push({ url: r.url(), type: r.resourceType() }));
  page.on('requestfailed', (r) => failed.push(r.url()));
  page.on('pageerror', (e) => pageErrors.push(String(e).slice(0, 160)));

  let status = null, navError = null;
  try {
    const resp = await page.goto(target, { waitUntil: 'networkidle', timeout: 60000 });
    status = resp && resp.status();
  } catch (e) {
    navError = String(e).split('\n')[0];
    try { await page.waitForTimeout(4000); } catch {}
  }
  await page.waitForTimeout(3000);

  // ---- GDPR, measured before any interaction ----
  const preConsentCookies = (await ctx.cookies()).map((c) => ({
    name: c.name, domain: c.domain, party: classify('https://' + c.domain.replace(/^\./, ''), target),
    session: c.expires === -1,
  }));
  const thirdPartyRequests = [...new Set(requests.filter((r) => classify(r.url, target) === 'third').map((r) => {
    try { return new URL(r.url).host; } catch { return r.url; }
  }))];
  const trackersBeforeConsent = thirdPartyRequests.filter((h) => TRACKER_HINTS.some((t) => (h + '/').includes(t.split('/')[0])));
  const googleFonts = thirdPartyRequests.some((h) => /fonts\.(googleapis|gstatic)\.com/.test(h));

  const html = await page.content();
  const dom = await page.evaluate((socialSrc) => {
    const socialRe = Object.fromEntries(Object.entries(socialSrc).map(([k, v]) => [k, new RegExp(v.source, v.flags)]));
    const anchors = Array.from(document.querySelectorAll('a[href]'));
    const social = {};
    for (const [k, re] of Object.entries(socialRe)) {
      const hit = anchors.find((a) => re.test(a.href));
      if (hit) social[k] = hit.href;
    }
    const bodyText = (document.body && document.body.innerText) || '';
    const lower = bodyText.toLowerCase();
    const bannerWords = ['cookie', 'cookies', 'consent', 'privacy', 'zustimmung', 'akzeptieren', 'toestemming', 'accepteren', 'accepter', 'consentement'];
    const acceptWords = ['accept all', 'allow all', 'alle akzeptieren', 'alles accepteren', 'tout accepter', 'accept', 'akzeptieren', 'accepteren', 'accepter'];
    const rejectWords = ['reject all', 'decline', 'reject', 'deny', 'ablehnen', 'weigeren', 'weiger', 'refuser', 'refuse', 'rifiuta', 'rechazar', 'alleen noodzakelijk', 'only necessary', 'nur notwendige', 'necessary only', 'essential only', 'manage preferences', 'instellingen'];
    const clickables = Array.from(document.querySelectorAll('button,a[role="button"],input[type="button"],input[type="submit"],[class*="btn"],[class*="button"]'));
    const labelled = clickables.map((el) => ({
      text: (el.innerText || el.value || '').trim().toLowerCase().slice(0, 60),
      area: (el.getBoundingClientRect().width * el.getBoundingClientRect().height) | 0,
    })).filter((x) => x.text);
    const accept = labelled.filter((x) => acceptWords.some((w) => x.text.includes(w))).sort((a, b) => b.area - a.area)[0] || null;
    const reject = labelled.filter((x) => rejectWords.some((w) => x.text.includes(w))).sort((a, b) => b.area - a.area)[0] || null;
    // Widened after a false negative on a Shopify store whose footer said
    // "Returns Policy" and "Shipping & Delivery" and whose policy pages live
    // under /policies/. The old pattern missed all of it and the audit printed
    // NO LINK FOUND on a site that had four live policies.
    const privacyLink = anchors.find((a) => /privacy|privacybeleid|datenschutz|confidentialit|cookiebeleid|cookie-?policy|cookie-?richtlinie|\/policies\/|gegevensbescherming|informativa|politica-de-privacidad|gizlilik/i.test(a.href + ' ' + a.textContent));
    const imprint = anchors.find((a) => /impressum|imprint|mentions-?legales|kvk|colofon/i.test(a.href + ' ' + a.textContent));
    return {
      title: document.title,
      lang: document.documentElement.lang || null,
      generator: (document.querySelector('meta[name="generator"]') || {}).content || null,
      description: (document.querySelector('meta[name="description"]') || {}).content || null,
      forms: document.querySelectorAll('form').length,
      inputs: document.querySelectorAll('input,textarea,select').length,
      mailto: document.querySelectorAll('a[href^="mailto:"]').length,
      tel: document.querySelectorAll('a[href^="tel:"]').length,
      images: document.querySelectorAll('img').length,
      svgs: document.querySelectorAll('svg').length,
      videos: document.querySelectorAll('video,iframe[src*="youtube"],iframe[src*="vimeo"]').length,
      h1: Array.from(document.querySelectorAll('h1')).map((h) => h.innerText.trim()).slice(0, 3),
      nav: Array.from(document.querySelectorAll('nav a, header a')).slice(0, 40)
        .map((a) => (a.textContent.trim().replace(/\s+/g, ' ') + ' => ' + a.getAttribute('href'))),
      social,
      bannerPresent: bannerWords.some((w) => lower.includes(w)) && !!(accept || reject),
      acceptButton: accept, rejectButton: reject,
      privacyLink: privacyLink ? privacyLink.href : null,
      imprintLink: imprint ? imprint.href : null,
      textLength: bodyText.length,
      text: bodyText.replace(/\n{2,}/g, '\n').slice(0, 4000),
      // A page can be full of content our reader cannot see, because the
      // content is built by an inline script, or sits behind a gate such as a
      // language chooser or a start button. Solvio's Problem-Solv(io)er looked
      // empty on 2026-09-21, body 717px and 55 characters of text, and behind
      // one Deutsch button sat a ten question assessment. These fields exist so
      // that can never read as empty again.
      mainHtmlLength: (document.querySelector('.entry-content, main, #content, article') || document.body).innerHTML.length,
      inlineScriptsInMain: document.querySelectorAll('.entry-content script, main script, #content script, article script, .entry-content style, main style').length,
      gateCandidates: Array.from(document.querySelectorAll('button, a[role="button"], [class*="btn"]'))
        .map((e) => (e.innerText || e.value || '').trim())
        .filter((t) => t && t.length < 40 &&
          /deutsch|english|français|nederlands|espa|italiano|start|starten|begin|enter|continue|weiter|verder|commencer|choose|w[aä]hle|select|language|taal|sprache|langue/i.test(t))
        .slice(0, 12),
    };
  }, Object.fromEntries(Object.entries(SOCIAL).map(([k, v]) => [k, { source: v.source, flags: v.flags }])));

  // ---- stack and era forensics, from the served HTML ----
  const stack = {
    generator: dom.generator,
    wordpress: /wp-content|wp-includes|wp-json/.test(html),
    wpVersion: (html.match(/WordPress\s+([\d.]+)/i) || [])[1] || null,
    themes: [...new Set((html.match(/\/wp-content\/themes\/([^/'"?]+)/gi) || []).map((m) => m.split('/').pop()))].slice(0, 5),
    boughtTheme: (html.match(BOUGHT_THEMES) || [])[1] || null,
    plugins: [...new Set((html.match(/\/wp-content\/plugins\/([^/'"?]+)/gi) || []).map((m) => m.split('/').pop()))].slice(0, 12),
    // Anchor on paths and handles, never bare words. "divi" matches "individual",
    // "bricks" matches "bricks and mortar", and both produced false positives.
    builder: [
      ['elementor', /\/plugins\/elementor|elementor-frontend/i],
      ['wpbakery', /js_composer|wpbakery/i],
      ['divi', /\/themes\/[Dd]ivi\/|et_pb_|et-core/],
      ['beaver builder', /\/plugins\/bb-plugin|fl-builder/i],
      ['bricks', /\/themes\/bricks\/|brxe-/i],
      ['oxygen', /\/plugins\/oxygen|ct_section/i],
    ].filter(([, re]) => re.test(html)).map(([n]) => n),
    saasBuilder: ['wix', 'squarespace', 'shopify', 'webflow', 'framer', 'jimdo', 'mywebsite now', 'ionos', 'weebly', 'godaddy']
      .filter((b) => new RegExp(b.replace(' ', '[- ]?'), 'i').test(html)),
    fontFamilies: [...new Set((html.match(/font-family:\s*([^;}"']+)/gi) || []).map((m) => m.replace(/font-family:\s*/i, '').trim()))].slice(0, 8),
    hexColours: (() => {
      const counts = {};
      for (const m of html.matchAll(/#([0-9a-f]{6})\b/gi)) counts[m[1].toLowerCase()] = (counts[m[1].toLowerCase()] || 0) + 1;
      return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 6);
    })(),
  };
  const datedTells = DATED_TELLS.filter((t) => t.re.test(html)).map((t) => ({ tell: t.key, note: t.note }));
  const cmp = CMP_HINTS.filter((c) => new RegExp(c, 'i').test(html));

  // ---- screenshots, desktop and phone, because a grep does not find design ----
  const desktopShot = path.join(outDir, `${tag}-desktop.png`);
  await page.screenshot({ path: desktopShot, fullPage: false });
  const phone = await ctx.newPage();
  try {
    await phone.setViewportSize({ width: 390, height: 844 });
    await phone.goto(target, { waitUntil: 'domcontentloaded', timeout: 45000 });
    await phone.waitForTimeout(2500);
    await phone.screenshot({ path: path.join(outDir, `${tag}-phone.png`), fullPage: false });
  } catch {}

  // The thin page check. Never call a page empty because the text came back
  // short, only because a screenshot showed it empty.
  const ratio = dom.mainHtmlLength ? dom.textLength / dom.mainHtmlLength : 1;
  const hidden = {
    textLength: dom.textLength,
    mainHtmlLength: dom.mainHtmlLength,
    textToHtmlRatio: +ratio.toFixed(4),
    inlineScriptsInMain: dom.inlineScriptsInMain,
    gateCandidates: dom.gateCandidates,
    // Any one of these is enough to forbid an emptiness claim.
    contentProbablyHidden: (dom.textLength < 400 && dom.mainHtmlLength > 4000) ||
      ratio < 0.01 || dom.inlineScriptsInMain > 0 || dom.gateCandidates.length > 0,
  };

  const out = {
    target, tag, status, navError, fetchedAt: new Date().toISOString(),
    hidden,
    page: dom,
    stack,
    era: { datedTells, boughtTheme: stack.boughtTheme },
    gdpr: {
      consentPlatform: cmp,
      bannerPresent: dom.bannerPresent,
      acceptButton: dom.acceptButton,
      rejectButton: dom.rejectButton,
      rejectMissingOrSmaller: !dom.rejectButton ||
        (dom.acceptButton && dom.rejectButton && dom.acceptButton.area > dom.rejectButton.area * 1.3),
      privacyLink: dom.privacyLink,
      imprintLink: dom.imprintLink,
      cookiesBeforeAnyClick: preConsentCookies,
      thirdPartyCookiesBeforeAnyClick: preConsentCookies.filter((c) => c.party === 'third'),
      trackersBeforeAnyClick: trackersBeforeConsent,
      googleFontsRemote: googleFonts,
      allThirdPartyHosts: thirdPartyRequests,
    },
    social: dom.social,
    health: { pageErrors, failedRequests: failed.slice(0, 15) },
    shots: { desktop: desktopShot, phone: path.join(outDir, `${tag}-phone.png`) },
  };
  fs.writeFileSync(path.join(outDir, `${tag}.json`), JSON.stringify(out, null, 1));

  console.log(`\n== ${target}  (${status || navError})`);
  console.log(`title        ${dom.title}`);
  console.log(`stack        ${stack.generator || (stack.saasBuilder.join(',') || 'unknown')}${stack.wpVersion ? ' | WP ' + stack.wpVersion : ''}${stack.boughtTheme ? ' | bought theme ' + stack.boughtTheme : ''}${stack.builder.length ? ' | ' + stack.builder.join(',') : ''}`);
  console.log(`era tells    ${datedTells.length ? datedTells.map((d) => d.tell).join(', ') : 'none greppable, judge from the screenshots'}`);
  console.log(`flow         forms ${dom.forms} inputs ${dom.inputs} mailto ${dom.mailto} tel ${dom.tel} | img ${dom.images} svg ${dom.svgs} video ${dom.videos}`);
  console.log(`gdpr banner  ${dom.bannerPresent ? 'yes' : 'NONE FOUND'}${cmp.length ? ' via ' + cmp.join(',') : ''} | reject ${dom.rejectButton ? 'present' : 'NOT FOUND'}`);
  console.log(`gdpr pre     ${preConsentCookies.length} cookies, ${preConsentCookies.filter((c) => c.party === 'third').length} third party, before any click`);
  console.log(`trackers pre ${trackersBeforeConsent.length ? trackersBeforeConsent.join(', ') : 'none'}`);
  console.log(`googlefonts  ${googleFonts ? 'REMOTE, loaded from Google' : 'not remote'}`);
  console.log(`privacy      ${dom.privacyLink || 'NO LINK FOUND'}`);
  console.log(`social       ${Object.keys(dom.social).length ? Object.entries(dom.social).map(([k, v]) => k).join(', ') : 'NONE LINKED'}`);
  console.log(`errors       ${pageErrors.length} page errors, ${failed.length} failed requests`);
  if (hidden.contentProbablyHidden) {
    console.log('');
    console.log('!!  CONTENT MAY BE HIDDEN FROM THIS READER. DO NOT CALL THIS PAGE EMPTY OR THIN.');
    console.log(`!!  ${hidden.textLength} chars of text against ${hidden.mainHtmlLength} chars of markup in the main area (ratio ${hidden.textToHtmlRatio}).`);
    if (hidden.inlineScriptsInMain) console.log(`!!  ${hidden.inlineScriptsInMain} inline script or style blocks sit inside the content area, so the page builds itself.`);
    if (hidden.gateCandidates.length) console.log(`!!  A gate is in the way. Click it and look again. Buttons found: ${hidden.gateCandidates.join(' | ')}`);
    console.log('!!  Open the screenshot. An emptiness claim needs a picture of an empty page, nothing less.');
  }
  console.log(`wrote        ${path.join(outDir, tag + '.json')} plus two screenshots. LOOK AT THEM.\n`);

  await browser.close();
})();
