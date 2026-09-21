#!/usr/bin/env node
/**
 * The social half of angle 2. Takes the social links site-audit.js found and
 * goes and opens them.
 *
 *   node tools/social-audit.js <tag-from-site-audit>
 *   node tools/social-audit.js --urls https://x.com/foo https://www.youtube.com/@bar
 *
 * What is actually reachable from this container, tested 2026-09-21. Do not
 * rediscover this the hard way.
 *
 *   YouTube    fully readable in Chromium. Subscriber count, video count, and
 *              per video title, view count and age. The best source there is.
 *   X          readable with plain curl. Follower and following counts and the
 *              joined date come out of the meta description.
 *   Facebook   readable in Chromium behind the login prompt. Follower and
 *              following counts, the About text, and the most recent post date.
 *   TikTok     the profile page resolves, so a dead handle is detectable, but a
 *              live profile's posts are walled.
 *   Instagram  walled. 200 with a login page over curl, HTTP 429 in Chromium.
 *              Treat as unknown, never as empty.
 *   LinkedIn   READABLE IN CHROMIUM, which corrects a belief this repo has held
 *              since August. The 999 is what curl and WebFetch get. A headless
 *              Chromium load of a /company/ page renders the signed out view
 *              and the follower count and tagline come straight off it. Posts
 *              still need a web search. A personal /in/ profile is still 999.
 *
 * So the honest rule. An account we could not read is UNKNOWN and never gets
 * written into a message as if it were empty. What we CAN prove is a dead
 * handle, a zero follower count, a last post date and a description that
 * contradicts the website, and every one of those is enough on its own.
 */

const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const PROXY_CA_SPKI = 'KnP1OnzHv/y42eRQmbGwoYTHcSJF448m6CU5mdngwKk=';
const CA_BUNDLE = '/root/.ccr/ca-bundle.crt';

function curlMeta(url) {
  try {
    const html = execFileSync('curl', ['-sS', '--cacert', CA_BUNDLE, '-L', '--max-time', '20', url],
      { maxBuffer: 20e6 }).toString();
    const desc = (html.match(/<meta[^>]+(?:property="og:description"|name="description")[^>]+content="([^"]{0,400})"/i) || [])[1] || null;
    const title = (html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || null;
    return { title: title && title.trim(), desc };
  } catch (e) { return { error: String(e).split('\n')[0] }; }
}

const NUM = /([\d.,]+\s*[KMkm]?)\s*(followers?|subscribers?|abonn[ée]s?|volgers)/i;
const FOLLOWING = /([\d.,]+\s*[KMkm]?)\s*(following|abonnements)/i;
const JOINED = /Joined\s+([A-Z][a-z]{2}\s+\d{4})/;
const AGE = /(\d+)\s+(second|minute|hour|day|week|month|year)s?\s+ago/i;

function ageToDays(m) {
  if (!m) return null;
  const n = +m[1];
  const mult = { second: 1 / 86400, minute: 1 / 1440, hour: 1 / 24, day: 1, week: 7, month: 30.4, year: 365 }[m[2].toLowerCase()];
  return Math.round(n * mult);
}

(async () => {
  const args = process.argv.slice(2);
  let urls = [], tag = null, outDir = process.env.AUDIT_OUT || '/tmp/claude-0';
  if (args[0] === '--urls') urls = args.slice(1);
  else {
    tag = args[0];
    const j = JSON.parse(fs.readFileSync(path.join(outDir, `${tag}.json`), 'utf8'));
    urls = Object.values(j.social || {});
    if (!urls.length) { console.log(`\n${tag}: the site links to NO social account at all. That is the finding.\n`); return; }
  }

  const browser = await chromium.launch({
    executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
    args: ['--no-sandbox', `--ignore-certificate-errors-spki-list=${PROXY_CA_SPKI}`],
  });
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, locale: 'en-GB' });
  const results = [];

  for (const url of urls) {
    const host = (() => { try { return new URL(url).host.replace(/^www\./, ''); } catch { return url; } })();
    const r = { url, platform: host.split('.')[0], reachable: null, followers: null, following: null,
      posts: null, lastPostAgeDays: null, lastPostLabel: null, joined: null, bio: null, dead: false, note: null };

    // X is cheaper over curl and the meta description carries the counts.
    if (/x\.com|twitter\.com/.test(host)) {
      const m = curlMeta(url);
      r.reachable = !m.error;
      r.bio = m.desc;
      if (m.desc) {
        r.followers = (m.desc.match(NUM) || [])[1] || null;
        r.following = (m.desc.match(FOLLOWING) || [])[1] || null;
        r.joined = (m.desc.match(JOINED) || [])[1] || null;
      }
      if (/doesn.t exist|account suspended/i.test((m.title || '') + (m.desc || ''))) r.dead = true;
      results.push(r); continue;
    }

    const page = await ctx.newPage();
    let status = null;
    try {
      const resp = await page.goto(/youtube\.com\/@/.test(url) ? url.replace(/\/?$/, '/videos') : url,
        { waitUntil: 'domcontentloaded', timeout: 45000 });
      status = resp && resp.status();
    } catch (e) { r.note = String(e).split('\n')[0]; }
    await page.waitForTimeout(3500);
    const info = await page.evaluate(() => ({
      title: document.title,
      text: ((document.body && document.body.innerText) || '').replace(/\n{2,}/g, '\n').slice(0, 4000),
    })).catch(() => ({ title: null, text: '' }));
    await page.close();

    r.reachable = !!status && status < 400 && !/HTTP ERROR|429/.test(info.text);
    if (/429/.test(info.text)) { r.note = 'rate limited, UNKNOWN not empty'; r.reachable = false; }
    if (/Couldn.t find this account|Page not found|isn.t available|content isn.t available/i.test(info.title + ' ' + info.text)) {
      r.dead = true; r.note = 'the handle linked from their site does not resolve';
    }
    if (/Log In|Login|Sign up/i.test(info.text) && /instagram|tiktok/.test(host) && !r.dead) {
      r.note = r.note || 'walled, UNKNOWN not empty';
    }
    r.followers = (info.text.match(NUM) || [])[1] || null;
    r.following = (info.text.match(FOLLOWING) || [])[1] || null;
    const vids = info.text.match(/([\d.,]+)\s+videos?/i);
    if (vids) r.posts = vids[1];
    const ages = [...info.text.matchAll(new RegExp(AGE.source, 'gi'))];
    if (ages.length) {
      const days = ages.map((m) => ageToDays(m)).filter((d) => d !== null);
      r.lastPostAgeDays = Math.min(...days);
      r.lastPostLabel = ages[0][0];
    }
    const fbDate = info.text.match(/\b(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2}\b/);
    if (!r.lastPostLabel && fbDate) r.lastPostLabel = fbDate[0];
    const about = info.text.match(/\nIntro\n([\s\S]{20,400})/) || info.text.match(/\n\.\.\.more/);
    r.bio = (about && about[1] ? about[1] : info.text.slice(0, 300)).replace(/\n/g, ' ').trim().slice(0, 300);
    results.push(r);
  }

  await browser.close();
  const out = { tag, checkedAt: new Date().toISOString(), results };
  if (tag) fs.writeFileSync(path.join(outDir, `${tag}-social.json`), JSON.stringify(out, null, 1));

  console.log('');
  for (const r of results) {
    const state = r.dead ? 'DEAD HANDLE' : r.reachable ? 'read' : 'UNKNOWN, could not read';
    console.log(`${r.platform.padEnd(10)} ${state}`);
    console.log(`  ${r.url}`);
    if (r.followers || r.following) console.log(`  followers ${r.followers || '?'} | following ${r.following || '?'}${r.joined ? ' | joined ' + r.joined : ''}`);
    if (r.posts) console.log(`  posts ${r.posts}`);
    if (r.lastPostLabel) console.log(`  latest ${r.lastPostLabel}${r.lastPostAgeDays !== null ? ` (${r.lastPostAgeDays} days)` : ''}${r.lastPostAgeDays > 90 ? '  <- dormant by the 90 day definition' : ''}`);
    if (r.note) console.log(`  note ${r.note}`);
    if (r.bio) console.log(`  bio  ${r.bio.slice(0, 200)}`);
    console.log('');
  }
  console.log('Anything marked UNKNOWN stays out of the message. Read the bio against their website, a description that describes a different company is itself the finding.\n');
})();
