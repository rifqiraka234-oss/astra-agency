/**
 * lib/normalize.ts, the normalisers behind every dedup rule. Pure functions,
 * safe in server and client code. The database unique indexes are the truth,
 * these produce the values those indexes compare.
 *
 *   normEmail(' EVA@dekade.nl ')                   -> 'eva@dekade.nl'      (null if not an email)
 *   normDomain('https://www.dekade.nl/taproom')     -> 'dekade.nl'          (null if not a domain)
 *   normDomain('shop.example.co.uk')                -> 'example.co.uk'
 *   normDomain('eva@dekade.nl')                     -> 'dekade.nl'          (emails reduce to their domain)
 *   normLinkedin('https://nl.linkedin.com/in/Eva-J/?trk=x') -> 'linkedin.com/in/eva-j'
 *   isFreeMail('someone@gmail.com') / isFreeMail('gmail.com') -> true
 *   emailDomain('eva@shop.dekade.nl')               -> 'dekade.nl'
 *   normPhone('06 1234 5678')                       -> '+31612345678'
 *   normCompanyName('Kessler Werkzeugbau GmbH')     -> 'kessler werkzeugbau' (for fuzzy matching only)
 */

/** Multi label public suffixes we meet in practice. Everything else is treated as one label (.nl, .com). */
const MULTI_SUFFIXES = new Set([
  // United Kingdom
  'co.uk', 'org.uk', 'ac.uk', 'gov.uk', 'ltd.uk', 'plc.uk', 'me.uk', 'net.uk', 'sch.uk', 'nhs.uk',
  // Australia, New Zealand
  'com.au', 'net.au', 'org.au', 'edu.au', 'gov.au', 'asn.au', 'id.au',
  'co.nz', 'org.nz', 'net.nz', 'ac.nz', 'govt.nz',
  // Elsewhere
  'co.za', 'org.za', 'com.br', 'net.br', 'org.br', 'com.mx', 'co.jp', 'ne.jp', 'or.jp', 'ac.jp',
  'co.kr', 'or.kr', 'com.cn', 'net.cn', 'org.cn', 'com.hk', 'com.sg', 'edu.sg', 'com.tr', 'co.in',
  'net.in', 'org.in', 'co.il', 'org.il', 'com.ar', 'com.co', 'co.id', 'com.my', 'com.ph', 'com.vn',
  'com.ua', 'com.pl', 'co.at', 'or.at', 'com.es', 'com.pt', 'com.gr', 'com.cy', 'com.mt', 'co.ke',
  'com.ng', 'com.eg', 'com.sa', 'com.qa', 'co.th', 'com.tw',
  // Hosting platforms, where every subdomain is a different owner
  'netlify.app', 'vercel.app', 'github.io', 'gitlab.io', 'pages.dev', 'workers.dev', 'herokuapp.com',
  'wixsite.com', 'myshopify.com', 'squarespace.com', 'webflow.io', 'wordpress.com', 'blogspot.com',
  'carrd.co', 'framer.website', 'framer.app', 'notion.site', 'super.site', 'azurewebsites.net',
  'firebaseapp.com', 'web.app', 'onrender.com', 'fly.dev', 'up.railway.app',
]);

/** Mirrors the free_mail_domains seed in db/migrations/002. The table is editable, this list is the default. */
export const FREE_MAIL_DOMAINS: ReadonlySet<string> = new Set([
  'gmail.com', 'googlemail.com', 'outlook.com', 'hotmail.com', 'hotmail.nl', 'hotmail.co.uk', 'hotmail.de',
  'hotmail.fr', 'live.com', 'live.nl', 'live.co.uk', 'msn.com', 'yahoo.com', 'yahoo.co.uk', 'yahoo.de',
  'yahoo.fr', 'ymail.com', 'icloud.com', 'me.com', 'mac.com', 'aol.com', 'proton.me', 'protonmail.com',
  'pm.me', 'gmx.de', 'gmx.net', 'gmx.com', 'web.de', 't-online.de', 'freenet.de', 'ziggo.nl', 'kpnmail.nl',
  'planet.nl', 'home.nl', 'xs4all.nl', 'telenet.be', 'skynet.be', 'orange.fr', 'wanadoo.fr', 'free.fr',
  'laposte.net', 'sfr.fr', 'libero.it', 'virgilio.it', 'btinternet.com', 'sky.com', 'mail.com', 'zoho.com',
  'fastmail.com', 'hey.com', 'tutanota.com', 'yandex.com', 'qq.com', '163.com',
]);

const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[^\s@<>()[\]\\,;:"]+$/;

/** Lower case, trimmed, mailto stripped. Matches the lower(trim(email)) unique index. */
export function normEmail(input: string | null | undefined): string | null {
  if (!input) return null;
  let v = input.trim().replace(/^mailto:/i, '').trim();
  const angle = v.match(/<([^>]+)>/); // "Eva Jansen <eva@dekade.nl>"
  if (angle) v = angle[1].trim();
  v = v.toLowerCase();
  return EMAIL_RE.test(v) ? v : null;
}

function toAsciiHost(host: string): string | null {
  try {
    return new URL(`http://${host}`).hostname;
  } catch {
    return null;
  }
}

/**
 * The registrable domain: scheme, user info, www, path, query, port and trailing
 * dot stripped, lower cased, IDN to punycode, subdomains reduced
 * (shop.example.co.uk becomes example.co.uk). Returns null for IPs, localhost and junk.
 */
export function normDomain(input: string | null | undefined): string | null {
  if (!input) return null;
  let v = input.trim().toLowerCase();
  if (!v) return null;
  // An email address reduces to its domain.
  if (!v.includes('/') && v.includes('@')) v = v.slice(v.lastIndexOf('@') + 1);
  v = v.replace(/^[a-z][a-z0-9+.-]*:\/\//, ''); // scheme
  v = v.replace(/^\/\//, '');
  v = v.split(/[/?#]/)[0]; // path, query, fragment
  if (v.includes('@')) v = v.slice(v.lastIndexOf('@') + 1); // user info
  v = v.replace(/:\d*$/, ''); // port
  v = v.replace(/\.+$/, ''); // trailing dot
  if (!v || v.includes(' ')) return null;
  const ascii = toAsciiHost(v);
  if (!ascii) return null;
  v = ascii;
  if (/^\d{1,3}(\.\d{1,3}){3}$/.test(v) || v.startsWith('[')) return null; // IP address
  const labels = v.split('.').filter(Boolean);
  if (labels.length < 2) return null;
  if (labels.some((l) => !/^[a-z0-9]([a-z0-9-]*[a-z0-9])?$/.test(l))) return null;
  while (labels.length > 2 && /^www\d*$/.test(labels[0])) labels.shift();
  // Longest matching multi label suffix, then keep one label in front of it.
  for (let take = Math.min(3, labels.length); take >= 2; take--) {
    const suffix = labels.slice(-take).join('.');
    if (MULTI_SUFFIXES.has(suffix)) {
      return labels.length > take ? labels.slice(-(take + 1)).join('.') : null;
    }
  }
  return labels.slice(-2).join('.');
}

/** The domain of an email address, reduced like normDomain. */
export function emailDomain(email: string | null | undefined): string | null {
  const e = normEmail(email);
  return e ? normDomain(e.slice(e.lastIndexOf('@') + 1)) : null;
}

/**
 * True when the email or domain is a free mail provider (gmail.com and so on).
 * Free mail never matches or creates an organization. Pass `extra` to include
 * domains added to the free_mail_domains table at run time.
 */
export function isFreeMail(emailOrDomain: string | null | undefined, extra?: Iterable<string>): boolean {
  if (!emailOrDomain) return false;
  const raw = emailOrDomain.trim().toLowerCase();
  const host = raw.includes('@') ? raw.slice(raw.lastIndexOf('@') + 1) : normDomain(raw) ?? raw;
  const reduced = normDomain(host) ?? host;
  if (FREE_MAIL_DOMAINS.has(host) || FREE_MAIL_DOMAINS.has(reduced)) return true;
  if (extra) for (const d of extra) if (d === host || d === reduced) return true;
  return false;
}

/**
 * A LinkedIn profile URL in the form linkedin.com/in/<slug>, slug lower cased.
 * Accepts any scheme, www or country subdomain, trailing paths and tracking
 * parameters. Returns null for company pages, Sales Navigator and anything else.
 */
export function normLinkedin(input: string | null | undefined): string | null {
  if (!input) return null;
  let v = input.trim();
  if (!v) return null;
  v = v.replace(/^[a-z][a-z0-9+.-]*:\/\//i, '').replace(/^\/\//, '');
  const m = v.match(/^(?:[a-z]{2,3}\.|www\.|m\.)?linkedin\.com\/in\/([^/?#\s]+)/i);
  if (!m) return null;
  let slug = m[1];
  try {
    slug = decodeURIComponent(slug);
  } catch {
    /* keep the raw slug */
  }
  slug = slug.trim().toLowerCase();
  if (!slug || slug.includes('/')) return null;
  return `linkedin.com/in/${slug}`;
}

/** Digits with a leading + country code. defaultCountryCode applies to numbers starting with a single 0. */
export function normPhone(input: string | null | undefined, defaultCountryCode = '31'): string | null {
  if (!input) return null;
  const v = input.trim();
  if (!v) return null;
  let digits = v.replace(/[^\d+]/g, '');
  if (digits.startsWith('00')) digits = '+' + digits.slice(2);
  else if (digits.startsWith('0')) digits = '+' + defaultCountryCode + digits.slice(1);
  else if (!digits.startsWith('+')) digits = '+' + digits;
  digits = '+' + digits.slice(1).replace(/\+/g, '');
  return digits.length >= 8 ? digits : null;
}

// Applied after punctuation became spaces, so "B.V." arrives as "b v".
const LEGAL_SUFFIXES =
  /\b(b ?v|n ?v|v ?o ?f|gmbh|ag|ug|kg|ltd|limited|llc|inc|plc|sarl|sas|srl|spa|bvba|oy|ab|as|aps)$/;

/** Lower case, accents and legal suffixes removed, single spaces. For fuzzy matching, never for uniqueness. */
export function normCompanyName(input: string | null | undefined): string {
  if (!input) return '';
  let v = input
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9 ]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  let prev = '';
  while (prev !== v) {
    prev = v;
    v = v.replace(LEGAL_SUFFIXES, '').trim();
  }
  return v;
}
