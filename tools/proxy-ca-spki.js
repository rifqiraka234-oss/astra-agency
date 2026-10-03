// Every Anthropic proxy CA in the bundle, pinned by public key for Chromium.
// Read from /root/.ccr/ca-bundle.crt at run time, because the proxy CA rotates.
// It was one hard coded key until 2026-10-03, when a new interception CA
// ("CCR agent-proxy interception CA (production) 2026-08") made every page fail
// with ERR_CERT_AUTHORITY_INVALID, example.com included. Only Anthropic's own
// CAs are pinned, verification stays on for everything else.
const fs = require('fs');
const crypto = require('crypto');
const FALLBACK = 'KnP1OnzHv/y42eRQmbGwoYTHcSJF448m6CU5mdngwKk=';
module.exports = function proxyCaSpki(bundle = '/root/.ccr/ca-bundle.crt') {
  try {
    const pems = fs.readFileSync(bundle, 'utf8').match(/-----BEGIN CERTIFICATE-----[\s\S]*?-----END CERTIFICATE-----/g) || [];
    const keys = new Set([FALLBACK]);
    for (const pem of pems) {
      const c = new crypto.X509Certificate(pem);
      if (!/Anthropic/.test(c.subject)) continue;
      const der = c.publicKey.export({ type: 'spki', format: 'der' });
      keys.add(crypto.createHash('sha256').update(der).digest('base64'));
    }
    return [...keys].join(',');
  } catch (e) { return FALLBACK; }
};
