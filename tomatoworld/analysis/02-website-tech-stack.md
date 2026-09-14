# tomatoworld.nl — technical teardown

**Analysed:** 2026-09-14 · **Method:** live fetch of headers, HTML, JS/CSS bundles
and public endpoints. No authenticated access, no scanning, no intrusive probing —
everything below is from publicly served responses.

**Why this file exists:** in the intro call Josh asked twice what the site is built
on, and Ank said *"No, I don't have any idea."* She is meeting Panorama Studios
next week to find out. This answers it in advance so she walks in informed.

---

## Answer in one line

**Umbraco 13 (LTS) on ASP.NET Core**, built by **Panorama Studios**, hosted on
Linux under Plesk. The frontend is a hand-built webpack bundle with GSAP and
Swiper — no React, no Vue, no jQuery, no page builder.

---

## Backend / CMS

**Umbraco CMS 13 (LTS)** — confirmed, not inferred:

- `/umbraco` redirects to `/umbraco/login`, serving `<title>Umbraco</title>` with
  `<umb-auth>` and `<umb-backoffice-icon-registry>` Lit web components and the
  `uui-css` design system. That is the v12/13-era login screen.
- Version pinned by a bundled package asset: `/App_Plugins/uSync/usync.13.3.2.min.css`.
  uSync's major version tracks Umbraco's → **Umbraco 13**.
- Media served as `/media/01uljeve/logo-lets-grow.jpg?width=387&height=258&v=...`
  — Umbraco v9+ media GUID paths, resized on the fly by **ImageSharp.Web**
  (the `width`, `height`, `quality` and `rxy=` focal-point crop parameters).

**Hosting:** Linux, not Windows. `server: Kestrel` behind
`x-powered-by: Phusion Passenger(R) 6.1.2` and `x-powered-by: PleskLin` — .NET on
Linux under a **Plesk** panel, Passenger reverse-proxying Kestrel. A managed Dutch
hosting setup rather than Azure or containers.

**Umbraco packages detected:**
- **uSync 13.3.2** — config/content sync between environments. *Implies Panorama run a proper dev → staging → production flow.*
- **SEO Toolkit** — `/App_Plugins/SeoToolkit/`
- **PanoramaStudios.Custom** — their own agency plugin, which also white-labels the Umbraco login screen with Panorama's logo and splash.

---

## Frontend

No JS framework. One webpack bundle (`/dist/application.<hash>.js`, 205 KB) and one
CSS file (70 KB), Babel-transpiled. No React, Vue, Alpine or jQuery.

From the bundle's own LICENSE manifest:
- **GSAP 3.12.5** + **ScrollTrigger** + **Observer** — scroll-driven animation, the heaviest dependency
- **Swiper** — carousels
- **lightGallery 2.7.2** — image lightbox
- **Nunito**, self-hosted woff2/woff/ttf in `/dist/fonts/` (no Google Fonts call)
- Custom CSS — no Tailwind, no Bootstrap, no normalize.css

**Third-party:** Google Tag Manager (`GTM-NRDKKVZ`) and YouTube `youtube-nocookie`
embeds. That is the entire external surface — no CDN, no chat widget, no marketing
automation, no booking system.

---

## Scale and hygiene

- **373 URLs** in the sitemap. Bilingual NL/EN with correct `hreflang` including `x-default`.
- Actively maintained — sitemap `lastmod` values run to 2026-09-07.
- Security headers better than average: `Permissions-Policy` locking down most
  browser APIs, `Referrer-Policy: no-referrer`, `X-Frame-Options: SAMEORIGIN`,
  `X-Content-Type-Options: nosniff`. No sourcemaps exposed.

**Two defects:**
1. **No cookie consent banner** in the markup while GTM loads unconditionally. For a Dutch site under GDPR/ePrivacy this is a real exposure, not a nitpick.
2. Sitemap emits `http://` URLs rather than `https://`.

---

## What this means commercially

**This is good news for us, and it should be presented that way.**

1. **Ank's main objection is answered: no, the look and feel does not have to change.**
   Umbraco 13 is a real CMS with a proper package model, a Content Delivery API and
   surface controllers. A booking module can be built as an Umbraco package or as an
   embedded app on a route, inheriting the existing design. Panorama's work stays
   untouched and visible. This is exactly the "sits behind it" answer Josh promised —
   now with evidence.

2. **Panorama are competent, and we should say so out loud.** uSync, a custom plugin,
   self-hosted fonts, tight security headers, no bloat — this is a professional build
   on a licensed CMS. Complimenting it honestly is the cheapest possible way to
   de-risk the friendship problem Ank flagged. We are not here to replace them.

3. **The gap is functional, not aesthetic.** There is no booking system on the site
   at all. Nothing to rip out, nothing to migrate. We are adding a capability the
   site has never had, which is a much easier internal sell than "redo the website."

4. **373 pages with a visitor/partner navigation problem** is an information
   architecture job, not a rebuild. Worth scoping separately and later.

5. **The missing cookie banner is a free credibility win.** It is a genuine compliance
   gap, cheap to fix, and finding it proves we actually looked. Offer it as a
   goodwill fix — ideally routed *through* Panorama so they get the win too.

6. **.NET shop.** Whoever we staff on this needs to be comfortable with ASP.NET Core
   and the Umbraco package model, or we build the booking module as a standalone
   service with a thin Umbraco-side embed. Decide this before quoting.

---

## How to use this with Ank

Frame it as saving her time, not as going around her:

> "We did a quick technical check on the public site so you don't have to spend
> your Panorama meeting on it. It's Umbraco 13, which is genuinely good news — it
> means a booking system can sit inside the site you already have without changing
> how it looks, and without Panorama having to redo anything. Their build is solid,
> by the way."

That sentence does four jobs at once: answers the question, removes her homework,
kills the look-and-feel objection, and compliments the incumbent.
