# Astra Agency — Company Research and Prototype Build Spec

> Source of truth, as provided by Raka, verbatim in Steps 1-9 and
> Deliverables/Guardrails below. `CLAUDE.md` at the repo root adds the
> concrete handoff mechanics (how this gets triggered, hosted, and how a
> "yes" eventually turns into a booked meeting) since this spec itself is
> about the research and build quality, not the plumbing around it.

## Purpose
This is triggered by a "Ready for a mockup" handoff from the daily inbox
triage, or directly by Raka. Input is a company name, their live website,
and what was actually promised in the outreach thread (a homepage redesign,
an interactive tool, whatever was actually offered, not assumed). Output is
a single, hostable HTML prototype that could genuinely be mistaken for a
senior studio's work, plus a short research summary Raka can sanity check
before sending.

## Step 1 — Research the real business before touching design
Do not start designing from a generic template. Confirm first:

- The correct company, current role of the contact, and correct live
  website, people and companies get confused, verify before building
  anything.
- What the company actually sells, who buys it, and how it makes money in
  plain language, not their own marketing tagline restated.
- Read the actual live site, multiple pages, not just the homepage and not
  just search snippets. Open it and look.
- What was already pitched in the outreach thread. If Raka promised a
  specific tool (an interactive assessment, a calculator, a particular kind
  of page), build that, not a generic homepage redesign. Andy Olson was
  promised a project readiness flow, not a generic site, that distinction
  matters every time.

## Step 2 — The analytical method (from Astra's own framework, apply it for real)
For each real issue found on the current site, work through: what is
publicly visible, where it becomes unclear or difficult, which visitor or
buyer type is affected, which decision becomes harder for them, which
realistic business outcome suffers as a result, and what Astra could
actually build to fix it.

Avoid generic observations. "The design could be more modern" is not an
insight. "A visitor sizing you up for a decision loses confidence because X,
so they hesitate before Y" is.

The roast should come from genuinely understanding two things at once: the
business's real problem, and what the founder is likely thinking, wishing
for, or quietly frustrated by that the current site does not deliver. The
critique should feel accurate and a little pointed, never insulting, never
generic.

## Step 3 — Evidence classification (never blur these)
Every claim used in the research or the prototype belongs to one of four
categories, and must be labeled internally even if not shown on the page:

- **Verified fact** — confirmed through the live site or other reliable
  public evidence.
- **Company-reported claim** — stated by the company but not independently
  verified.
- **Reasonable hypothesis** — a supported interpretation, not confirmed.
- **Unknown** — do not guess, do not fabricate.

Never invent internal processes, prices, client names, statistics,
partnerships, testimonials, regulatory claims, or performance numbers to
make a concept look more complete.

## Step 4 — Red team the read before building
Before committing to a direction, check: could this be the wrong person or
company, has the business pivoted since this info was gathered, is the flaw
genuinely commercially important or just personal taste, does another page
on the site already resolve this criticism, is the issue actually an
intentional design choice serving a different goal, is the outcome being
promised realistic and causal rather than assumed, and is this concept
actually worth the build time for this lead.

## Step 5 — Design direction (this is where most AI output fails, do not let it fail here)
The single biggest quality bar: it must not look AI made. Concretely, that
means:

Every company gets its own system, never a reskin. Different companies must
not end up with the same layout wearing different colors. AIKE (financial
data intelligence) used deep ink navy, electric indigo, and gold, with
Fraunces, Inter, and IBM Plex Mono. Indigenous Fishers First (coastal
community economic development) used tidal teal, warm cedar, and Newsreader.
Those were chosen deliberately for each business's world, not picked from a
shared palette.

Avoid, unless specifically justified by the brand: random gradients,
glassmorphism, floating 3D objects, abstract blobs, excessive rounded cards,
repetitive three column feature sections, generic icon sets, meaningless
sustainability imagery, symmetric card soup, generic SaaS dashboards, neon
startup styling, template layouts, and stock imagery that could represent
literally any company.

Typography must be chosen, not defaulted. Do not reach for Arial, Helvetica,
Inter alone, Roboto, or other generic system fonts as the whole system
unless the brand genuinely calls for plainness. Pick a real display face
with character for headlines, and consider whether numbers or data deserve
their own monospace treatment if the business is data or finance flavored.

Build one genuine signature device per prototype, not just a nicer layout.
The best work in this project came from finding one interactive or visual
idea that embodies what the company actually does, not just describing it.
AIKE's hero let a visitor pick their persona and watch a live insight panel
actually answer their question, turning "dynamic intelligence" into
something used, not read. Indigenous Fishers First used a cinematic scroll
journey that physically moved the visitor through the real value chain, from
water to market. Find the equivalent for this business, do not default to a
static hero and three feature cards. Go beyond the obvious first idea.

Structure with ethos, pathos, and logos on purpose. Credibility (real
founder background, compliance, proof), stakes (what it actually costs the
visitor or the business to keep struggling with the current gap), and logic
(the actual mechanism, a working demo, real data or interaction) should all
be present, not just a features list.

## Step 6 — Real imagery, handled correctly
A page with zero real imagery reads as dead and unfinished, use real
photography where it strengthens the pitch, not empty placeholder blocks.

- Use genuinely real, correctly licensed photography (free license sources
  like Pexels, not scraped or unlicensed images). Confirm the license
  actually permits this use.
- Treat photography deliberately, not as stock filler, a duotone or color
  treatment tying it into the brand system reads as intentional rather than
  generic.
- Never depict real, identifiable people, especially not stock photos
  standing in for a specific real community, culture, or identity that is
  not actually the client's own. For Indigenous Fishers First specifically,
  this meant using real photography of water, boats, harbors, and market
  scenes rather than generic stock photos of "Indigenous people," which
  would have been disrespectful and inaccurate. Apply the same judgment for
  any client tied to a specific real community, do not let a generic stock
  photo stand in for someone's actual identity or culture.
- Never use real company or retailer logos, that is licensed IP. Use styled
  wordmark placeholders or generic representations instead.
- Never fabricate a testimonial and present it as real. If a testimonial
  strengthens the page, it must be clearly labeled internally as a
  placeholder to be swapped for a real client quote before anything is
  actually published, never left ambiguous.

## Step 7 — Copywriting inside the prototype
Research how the company and founder actually speak, the copy should sound
like them, only clearer, not like generic marketing. Avoid corporate AI
cliches: empowering the future, transforming possibilities, unlocking
innovation, seamless solutions, where vision meets impact, dynamic
intelligence used as an unexplained buzzword, and similar.

Note on formatting: the strict no hyphen, no en dash, no em dash rule that
governs all of Astra's outreach messages applies to the outreach message
that accompanies and links to the prototype, not necessarily to the
prototype's own on page marketing copy, which can follow normal editorial
punctuation where it genuinely reads better. If in doubt, default to
avoiding dashes there too for consistency, but this is not a hard technical
requirement for on page copy the way it is for outreach. (Hyphens inside the
Netlify URL slug itself are a structural separator, not prose, and are
exempt from this guardrail entirely, see the hosting step in `CLAUDE.md`.)

## Step 8 — Technical build requirements

- Single self contained HTML file, all CSS and JS inline, no external
  dependencies that could fail (fonts loaded via a reliable CDN are fine,
  fragile or obscure external assets are not).
- Must work cleanly on both desktop and mobile, no accidental horizontal
  overflow, no broken layouts at narrow widths.
- Every interaction must actually work, no empty # links, no dead buttons,
  no fake interactivity that looks broken when clicked.
- Respect prefers-reduced-motion, keyboard accessibility for interactive
  elements (aria-pressed states, focus-visible styling), and reasonably fast
  load, avoid excessive unoptimized assets.
- Keep strategy commentary and internal notes out of the customer facing
  experience itself, any placeholder or confirm-before-publishing flags
  belong in the accompanying research summary, not visible on the page a
  prospect would see.

## Step 9 — Internal quality check before calling it done
Before considering the prototype finished, score it honestly against:
strategic accuracy, brand authenticity (does it feel like this specific
company, not just wearing their logo), journey clarity, visual distinction
from generic AI output, copy quality, believability, mobile experience,
interaction quality, commercial relevance, and technical reliability. If
strategic accuracy, brand authenticity, or technical reliability falls
short, revise before delivering, do not ship a first draft that fails on any
of those three specifically.

## Deliverables

- The prototype itself, a single HTML file, named `[Company]_Prototype.html`.
- A short research summary (not a heavy formal report), covering: what was
  verified versus company reported versus hypothesis, the specific weakness
  the concept addresses, and anything flagged as a placeholder that must be
  swapped before this could actually be published (stock photography,
  placeholder testimonials, unverified stats). Keep this compact, Raka needs
  to sanity check facts quickly, not read a dossier.
- The file should be ready to drag onto Netlify Drop or equivalent for
  hosting, that one click of actually hosting and sharing the link stays a
  manual step unless Raka has explicitly asked for the hosting step to run
  unattended too (see `CLAUDE.md`).

## Guardrails

- Never fabricate facts, statistics, client names, testimonials,
  partnerships, or regulatory claims to make a concept look more complete.
- Never use real company or retailer logos without rights.
- Never use stock photography of real identifiable people, and never let
  generic stock imagery stand in for a specific real community or culture
  that is not the client's own.
- Never build a generic redesign when a specific tool or concept was
  actually promised in the outreach thread, check what was said before
  building.
- Never let two different clients' prototypes look like the same template in
  different colors.
- Label every placeholder clearly in the research summary, nothing fake
  should be able to accidentally ship as if it were real.
