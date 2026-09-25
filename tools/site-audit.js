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

const { chromium, devices } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

// The egress proxy re terminates TLS, so Chromium has to trust its CA. Pin by
// key rather than disabling verification. See CLAUDE.md, the build toolchain.
const PROXY_CA_SPKI = 'KnP1OnzHv/y42eRQmbGwoYTHcSJF448m6CU5mdngwKk=';
const CA_BUNDLE = '/root/.ccr/ca-bundle.crt';

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

// The detector, defined ONCE so the self test below exercises exactly the same
// code that audits a real page. A control that runs different code proves nothing.
const DETECT = (socialSrc) => {
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
    // Widened 2026-09-21 after a FALSE NEGATIVE on centretherapielaser.com, whose
    // banner offers OK and Non. Neither word was in either list, so the audit
    // printed NONE FOUND on a page that plainly has a banner in the screenshot.
    // A missing banner is an absence claim and absence claims are what get us
    // caught, so these lists are deliberately generous now.
    const acceptWords = ['accept all', 'allow all', 'alle akzeptieren', 'alles accepteren', 'tout accepter', 'accept', 'akzeptieren', 'accepteren', 'accepter', 'ok', 'okay', "j'accepte", "d'accord", 'got it', 'i agree', 'agree', 'understood', 'verstanden', 'einverstanden', 'akkoord', 'continue', 'allow', 'zustimmen', 'aceptar', 'accetta'];
    const rejectWords = ['reject all', 'decline', 'reject', 'deny', 'ablehnen', 'weigeren', 'weiger', 'refuser', 'refuse', 'rifiuta', 'rechazar', 'alleen noodzakelijk', 'only necessary', 'nur notwendige', 'necessary only', 'essential only', 'manage preferences', 'instellingen', 'non', 'nein', 'nee', 'no thanks', 'refuser', 'rechazar', 'configurar', 'parametrer', 'customise', 'customize'];
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
      lang: (document.documentElement && document.documentElement.lang) || null,
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
};

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
  const badResponses = [];
  page.on('request', (r) => requests.push({ url: r.url(), type: r.resourceType() }));
  page.on('requestfailed', (r) => failed.push(r.url()));
  page.on('response', (r) => { if (r.status() >= 400) badResponses.push({ url: r.url(), status: r.status() }); });
  page.on('pageerror', (e) => pageErrors.push(String(e).slice(0, 160)));

  // ---------------------------------------------------------------
  // Reachability. This exists because "our reader could not see it" was
  // repeatedly written down as "their site is broken", which cost a live lead.
  // Nothing downstream may describe the site until this produces a verdict.
  // ---------------------------------------------------------------
  let status = null, navError = null, attempts = [];
  for (const wait of ['networkidle', 'domcontentloaded', 'load']) {
    try {
      const resp = await page.goto(target, { waitUntil: wait, timeout: 60000 });
      status = resp && resp.status();
      attempts.push(`${wait}:${status}`);
      if (status && status < 400) { navError = null; break; }
      navError = `HTTP ${status}`;
    } catch (e) {
      navError = String(e).split('\n')[0];
      attempts.push(`${wait}:${navError.slice(0, 60)}`);
    }
    await page.waitForTimeout(2000);
  }
  await page.waitForTimeout(3000);

  // Scroll the whole page. Lazily mounted sections do not exist until you do.
  try {
    for (let i = 0; i < 6; i++) { await page.mouse.wheel(0, 900); await page.waitForTimeout(500); }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(1200);
  } catch {}

  // If the page is still unreadable, find out whose fault it is before saying
  // anything. A known good host through the same egress in the same minute is
  // the control. If the control works and they do not, it is them. If neither
  // works, it is us, and the row is BLOCKED, never "broken".
  let reach = { verdict: 'READ', attempts, controlOk: null, plainHttp: null, dns: null };
  const looksUnread = !status || status >= 400 || navError;
  if (looksUnread) {
    const host = (() => { try { return new URL(target).host; } catch { return target; } })();
    const sh = (cmd) => { try { return execSync(cmd, { timeout: 30000 }).toString().trim(); } catch (e) { return null; } };
    reach.dns = sh(`getent hosts ${host} | head -1`) || 'NO DNS RECORD';
    reach.plainHttp = sh(`curl -sS -o /dev/null -w '%{http_code}' --max-time 20 http://${host}/`) || 'no answer';
    reach.controlOk = sh(`curl -sS -o /dev/null -w '%{http_code}' --cacert ${CA_BUNDLE} --max-time 20 https://example.com/`) || 'no answer';
    const controlWorked = reach.controlOk && /^[23]/.test(reach.controlOk);
    if (!controlWorked) reach.verdict = 'BLOCKED_OUR_SIDE';
    else if (reach.dns === 'NO DNS RECORD') reach.verdict = 'NO_DNS';
    else if (/robot|challenge|captcha|just a moment|cloudflare/i.test(await page.content().catch(() => ''))) reach.verdict = 'BLOCKED_BY_THEIR_WALL';
    else if (reach.plainHttp && /^[23]/.test(reach.plainHttp)) reach.verdict = 'HTTPS_BROKEN_HTTP_FINE';
    else reach.verdict = 'UNREADABLE_CAUSE_UNKNOWN';
  }

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
  const SOCIAL_ARG = Object.fromEntries(Object.entries(SOCIAL).map(([k, v]) => [k, { source: v.source, flags: v.flags }]));

  // POSITIVE CONTROL, runs on every audit, never optional. A synthetic page that
  // definitely has a cookie banner, an accept, a reject and a privacy link. If the
  // detector cannot find them HERE, it is broken, and every absence finding from
  // this run is void rather than reported as a fact. This exists because the audit
  // printed NONE FOUND on a banner that is plainly visible in the screenshot.
  const FIXTURE = 'data:text/html,' + encodeURIComponent(`<!doctype html><html lang="fr"><body>
    <p>Nous utilisons des cookies pour ameliorer votre experience.</p>
    <button>OK</button><button>Non</button>
    <a href="/politique-confidentialite/">Politique de confidentialite</a>
    <a href="/mentions-legales/">Mentions legales</a>
    <a href="https://www.linkedin.com/company/x">LinkedIn</a>
  </body></html>`);
  const ctl = await browser.newContext();
  const ctlPage = await ctl.newPage();
  await ctlPage.goto(FIXTURE);
  const control = await ctlPage.evaluate(DETECT, SOCIAL_ARG);
  await ctl.close();
  const controlOk = {
    banner: control.bannerPresent === true,
    reject: !!control.rejectButton,
    privacy: !!control.privacyLink,
    imprint: !!control.imprintLink,
    social: Object.keys(control.social || {}).length > 0,
  };
  const controlFailures = Object.entries(controlOk).filter(([, v]) => !v).map(([k]) => k);

  const dom = await page.evaluate(DETECT, SOCIAL_ARG);

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
  // A REAL phone, user agent and all. A 390px viewport with a desktop user agent
  // gets the desktop layout on Wix and other builders that switch by user agent,
  // and on alquimialegal.mx (2026-09-23) that showed the hero text clipped off the
  // right edge when an actual iPhone renders it perfectly. That false finding was
  // one step from a message. So the phone shot runs in its own mobile context.
  const phoneCtx = await browser.newContext({ ...devices['iPhone 13'], locale: 'en-GB' });
  const phone = await phoneCtx.newPage();
  try {
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

  // ---------------------------------------------------------------
  // RENDER TRUST. Added 2026-09-22 after Chromium reported HTTP 415 on six of
  // nine images on dariuz.nl and a message saying "six of nine images on your
  // homepage are broken" was one step from being sent. Direct curl returned
  // 200 image/png for the same files. The failure was ours, not theirs.
  //
  // So every asset this reader could not load is re-fetched through a second,
  // independent path before it is allowed to count as the site's problem. If
  // the second path succeeds, the asset is OURS and every asset finding in
  // this run is VOID. Absence and breakage claims are the ones that reach a
  // lead and cannot be taken back, so the default is always to blame our own
  // reader first.
  // ---------------------------------------------------------------
  const brokenImages = await page.evaluate(() => Array.from(document.images)
    .filter((i) => i.naturalWidth === 0 && (i.currentSrc || i.src))
    .map((i) => i.currentSrc || i.src));
  // Only the site's OWN assets count. A failed Google Analytics beacon or a
  // YouTube video stream is not the site being broken, and letting those fire
  // the guard made it shout on every healthy run, which is how a guard gets
  // ignored. Same host, ignoring www, and real assets only.
  const ownHost = (() => { try { return new URL(target).hostname.replace(/^www\./, ''); } catch { return ''; } })();
  const sameSite = (u) => { try { return new URL(u).hostname.replace(/^www\./, '') === ownHost; } catch { return false; } };
  const isAsset = (u) => /\.(jpe?g|png|gif|webp|avif|svg|css|js|woff2?|ttf|mp4|webm|pdf)(\?|#|$)/i.test(u);
  const suspectAssets = [...new Set([...brokenImages, ...badResponses.map((b) => b.url), ...failed])]
    .filter((u) => /^https?:/i.test(u) && sameSite(u) && isAsset(u)).slice(0, 12);

  const CURL = 'curl -s -o /dev/null -L --max-time 20 -w "%{http_code} %{content_type}"';
  const probe = (u, extra = '') => {
    try {
      return execSync(`${CURL} ${extra} ${JSON.stringify(u)}`, { encoding: 'utf8', timeout: 25000 }).trim();
    } catch { return 'ERR'; }
  };
  const assetChecks = suspectAssets.map((u) => {
    const plain = probe(u);
    const chromeish = probe(u, `-H ${JSON.stringify('Accept: image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8')}`);
    const okPlain = /^2\d\d/.test(plain) && !/text\/html/.test(plain);
    const okChrome = /^2\d\d/.test(chromeish) && !/text\/html/.test(chromeish);
    return { url: u, viaCurl: plain, viaCurlChromeAccept: chromeish, servesFineElsewhere: okPlain || okChrome };
  });
  const oursNotTheirs = assetChecks.filter((a) => a.servesFineElsewhere);
  const renderTrust = {
    suspectAssets: assetChecks,
    assetsOurFault: oursNotTheirs.length,
    assetsTheirFault: assetChecks.length - oursNotTheirs.length,
    // One asset proven fine elsewhere is enough to distrust the whole render.
    assetFindingsTrustworthy: assetChecks.length === 0 || oursNotTheirs.length === 0,
  };

  const out = {
    target, tag, status, navError, fetchedAt: new Date().toISOString(),
    reach,
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
    render: renderTrust,
    health: { pageErrors, failedRequests: failed.slice(0, 15) },
    shots: { desktop: desktopShot, phone: path.join(outDir, `${tag}-phone.png`) },
  };
  fs.writeFileSync(path.join(outDir, `${tag}.json`), JSON.stringify(out, null, 1));

  console.log(`\n== ${target}  (${status || navError})`);
  console.log(`title        ${dom.title}`);
  console.log(`stack        ${stack.generator || (stack.saasBuilder.join(',') || 'unknown')}${stack.wpVersion ? ' | WP ' + stack.wpVersion : ''}${stack.boughtTheme ? ' | bought theme ' + stack.boughtTheme : ''}${stack.builder.length ? ' | ' + stack.builder.join(',') : ''}`);
  console.log(`era tells    ${datedTells.length ? datedTells.map((d) => d.tell).join(', ') : 'none greppable, judge from the screenshots'}`);
  console.log(`flow         forms ${dom.forms} inputs ${dom.inputs} mailto ${dom.mailto} tel ${dom.tel} | img ${dom.images} svg ${dom.svgs} video ${dom.videos}`);
  const voided = controlFailures.length > 0;
  const guard = (absent, what) => {
    if (!absent) return '';
    if (voided) return ` [VOID, the detector failed its own control on ${controlFailures.join(',')}]`;
    return ' [absence, confirmed against a working control]';
  };
  console.log(`gdpr banner  ${dom.bannerPresent ? 'yes' : 'NONE FOUND'}${cmp.length ? ' via ' + cmp.join(',') : ''}${guard(!dom.bannerPresent, 'banner')} | reject ${dom.rejectButton ? 'present' : 'NOT FOUND'}`);
  console.log(`gdpr pre     ${preConsentCookies.length} cookies, ${preConsentCookies.filter((c) => c.party === 'third').length} third party, before any click`);
  console.log(`trackers pre ${trackersBeforeConsent.length ? trackersBeforeConsent.join(', ') : 'none'}`);
  // THE GEO TRAP (2026-09-25). This container exits in Columbus, Ohio. GDPR doesn't
  // cover a US visitor, so Cookiebot, Usercentrics, Shopify's banner and Google consent
  // mode region defaults all show nothing and track freely for US. Burton Clinic and
  // Aurevia were both told trackers ran before consent, while their consent mode set
  // everything to denied for GB and the EEA. The banner and pre consent lines above only
  // describe what a US visitor gets, unless the page carries no consent code at all.
  let egress = '??';
  try { egress = (execSync('curl -s -m 15 https://www.cloudflare.com/cdn-cgi/trace', { encoding: 'utf8' }).match(/loc=(\w+)/) || [])[1] || '??'; } catch (e) { /* unknown stays unknown */ }
  const EU = /^(AT|BE|BG|CH|CY|CZ|DE|DK|EE|ES|FI|FR|GB|GR|HR|HU|IE|IS|IT|LI|LT|LU|LV|MT|NL|NO|PL|PT|RO|SE|SI|SK)$/;
  const consentCode = (html.match(/cookiebot|cookieyes|cky-consent|complianz|cmplz|iubenda|onetrust|optanon|usercentrics|borlabs|termly|cookie-law-info|klaro|didomi|axeptio|quantcast|consentmanager|cookiefirst|tarteaucitron|customerPrivacy|privacy-banner|gtag\(['"]consent|cookieconsent|cookie-script|moove_gdpr|real-cookie-banner|osano|trustarc|fundingchoices|googlefc/gi) || []).map((s) => s.toLowerCase());
  const regionDefault = /gtag\(['"]consent['"],\s*['"]default['"][^;]*"region"/.test(html);
  console.log(`egress       ${egress}${EU.test(egress) ? '' : ', NOT an EU or UK visitor'}`);
  if (!EU.test(egress) && (consentCode.length || regionDefault)) {
    console.log(`!!  GEO VOID. Consent code on the page (${[...new Set(consentCode)].join(',')}${regionDefault ? ', consent mode region defaults' : ''}).`);
    console.log('!!  It can show an EU visitor a banner and block trackers that a US visitor never sees.');
    console.log('!!  The banner, reject, pre consent cookie and tracker lines are VOID for EU visitors.');
    console.log('!!  Never write a GDPR claim off this run. Raka opens it from the Netherlands, incognito.');
  } else if (!EU.test(egress)) {
    console.log('    no consent code of any kind in the HTML, so no geo rule can exist. Tracker lines hold,');
    console.log('    confirm with the list of hosts the page contacted before writing it.');
  }
  console.log(`googlefonts  ${googleFonts ? 'REMOTE, loaded from Google' : 'not remote'}`);
  console.log(`privacy      ${dom.privacyLink || 'NO LINK FOUND' + guard(true, 'privacy')}`);
  const socialEntries = Object.entries(dom.social || {});
  const placeholder = socialEntries.filter(([, href]) => {
    try { const u = new URL(href); return u.pathname.replace(/\/+$/, '') === '' || u.pathname === '/'; } catch { return false; }
  });
  console.log(`social       ${socialEntries.length ? socialEntries.map(([k, v]) => k + ' -> ' + v).join('\n             ') : 'NONE LINKED'}`);
  if (placeholder.length) {
    console.log('');
    console.log(`!!  ${placeholder.length} SOCIAL LINK(S) GO TO A BARE PLATFORM HOMEPAGE, not an account.`);
    console.log(`!!  ${placeholder.map(([k]) => k).join(', ')}. These are unconfigured theme placeholders.`);
    console.log('!!  Do NOT report this as a social presence. It is the opposite of one.');
  }
  console.log(`errors       ${pageErrors.length} page errors, ${failed.length} failed requests`);
  if (renderTrust.suspectAssets.length) {
    console.log('');
    if (!renderTrust.assetFindingsTrustworthy) {
      console.log(`!!  RENDER NOT TRUSTED. ${renderTrust.assetsOurFault} of ${renderTrust.suspectAssets.length} assets this`);
      console.log('!!  reader could not load ARE SERVED FINE over a direct fetch, so the failure is');
      console.log('!!  OURS, not theirs. Every asset, image, layout and breakage finding in this run');
      console.log('!!  is VOID. You may NOT say anything is broken, missing or not loading, and the');
      console.log('!!  screenshots are unreliable for this site because they are missing real assets.');
      console.log(`!!  NEXT STEP, the second render path. node tools/render-via-curl.js ${target} ${tag}`);
      console.log('!!  If that serves every request with 0 curl errors, read its parts instead.');
      renderTrust.suspectAssets.filter((a) => a.servesFineElsewhere).slice(0, 5)
        .forEach((a) => {
          const ok = /^2\d\d/.test(a.viaCurl) && !/text\/html/.test(a.viaCurl) ? a.viaCurl : a.viaCurlChromeAccept;
          console.log(`!!    ours  ${ok.padEnd(22)} ${a.url.slice(0, 90)}`);
        });
    } else {
      console.log(`!!  ${renderTrust.suspectAssets.length} asset(s) failed here AND failed a direct re-fetch, so this one is theirs.`);
      console.log('!!  Still open the screenshot before writing it down.');
      renderTrust.suspectAssets.slice(0, 5)
        .forEach((a) => console.log(`!!    theirs ${a.viaCurl.padEnd(22)} ${a.url.slice(0, 90)}`));
    }
  }
  if (hidden.contentProbablyHidden) {
    console.log('');
    console.log('!!  CONTENT MAY BE HIDDEN FROM THIS READER. DO NOT CALL THIS PAGE EMPTY OR THIN.');
    console.log(`!!  ${hidden.textLength} chars of text against ${hidden.mainHtmlLength} chars of markup in the main area (ratio ${hidden.textToHtmlRatio}).`);
    if (hidden.inlineScriptsInMain) console.log(`!!  ${hidden.inlineScriptsInMain} inline script or style blocks sit inside the content area, so the page builds itself.`);
    if (hidden.gateCandidates.length) console.log(`!!  A gate is in the way. Click it and look again. Buttons found: ${hidden.gateCandidates.join(' | ')}`);
    console.log('!!  Open the screenshot. An emptiness claim needs a picture of an empty page, nothing less.');
  }
  if (reach.verdict !== 'READ') {
    console.log('');
    console.log(`!!  THE PAGE WAS NOT READ. VERDICT ${reach.verdict}`);
    console.log(`!!  attempts ${reach.attempts.join(' | ')}`);
    console.log(`!!  dns ${reach.dns} | plain http ${reach.plainHttp} | control host example.com ${reach.controlOk}`);
    const say = {
      BLOCKED_OUR_SIDE: 'Our egress is down or blocked. This says NOTHING about their site. Retry later. Row is BLOCKED_NEEDS_INFO.',
      BLOCKED_BY_THEIR_WALL: 'A bot wall is challenging our address. Their site is fine for real people. Row is BLOCKED_NEEDS_INFO.',
      NO_DNS: 'The domain does not resolve from here. Re check from another path before writing anything.',
      HTTPS_BROKEN_HTTP_FINE: 'Plain http works and https does not, so a visitor on a secure link meets a browser warning. THIS one is a real finding, and read every page over http before writing it.',
      UNREADABLE_CAUSE_UNKNOWN: 'Cause unknown. UNKNOWN is not broken. Row is BLOCKED_NEEDS_INFO until a human looks.',
    }[reach.verdict];
    console.log(`!!  ${say}`);
    console.log('!!  Do NOT write that their site is down, empty or broken off this run alone.');
  }
  console.log('');
  if (voided) {
    console.log(`!!  DETECTOR SELF TEST FAILED on ${controlFailures.join(', ')}.`);
    console.log('!!  Every absence finding above is VOID. Do not write any of them down.');
  } else {
    console.log('control      detector found a banner, a reject, a privacy link, an imprint and a');
    console.log('             social account on a synthetic page, so an absence above is real.');
  }
  console.log(`wrote        ${path.join(outDir, tag + '.json')} plus two screenshots. LOOK AT THEM.\n`);

  await browser.close();
})();
