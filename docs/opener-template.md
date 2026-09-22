# The opener template. What it needs, and the rules for every slot.

**Raka's template, adopted as THE first message on 2026-09-22.** It replaces every earlier
opener shape. First sent in this form to Daan Erisman at tuftuf, 2026-09-22 19:15:48Z.

**It is filled exactly as written.** Raka rejected a version that added a clause to block
two and reworded the brand line, with "follow the fucking template i gave you". So the
wording outside the brackets is fixed. Only the brackets change.

```
Hi [name], saw [company], looks interesting!

However, your [surface] is [the critical flaw]. This causes [stakeholder] to [impact].

I run Astra agency. We build [xyz] for brands like Unilever, AXA, Pertamina. I [proof].

Shall I build the [thing] so [stakeholder achieves goal], and send it over?
```

The reference filled example, as sent.

```
Hi Daan, saw tuftuf, looks interesting!

However, your site is two pages with not a single photo of the room. This causes event planners booking for forty to two hundred guests to pick a venue they can actually see.

I run Astra agency. We build websites for brands like Unilever, AXA, Pertamina. I built a food brand from zero with my family and ran the inventory, so I know what an unsold night costs.

Shall I build the private events page so planners can see the room they're booking, and send it over?
```

---

## 1. The eleven inputs, where each comes from, and what goes wrong

You cannot fill a slot you have not researched. Every slot below names its source. **If a
slot has no source, the message does not get written.**

| # | Slot | What it is | Where it comes from | The trap, and the lead it cost |
|---|---|---|---|---|
| 1 | `[name]` | First name only | lemlist `firstName` | lemlist puts titles in it. Adrian Steele's `firstName` was "Dr". Abbreviated surnames are never used |
| 2 | `[company]` | The business they OWN, styled as they style it | lemlist `companyName`, reconciled per RULES.md 0B, then the statutory record for any owner claim | The business they own is not the job they hold. Steele had sold Mercian Labels, Mandy Kerley does not own Trickle |
| 3 | `[surface]` | `site` or `social media`, whichever is theirs and readable | A web search for the site FIRST, then their own HTML for social handles | lemlist `companyDomain` is wrong often. `carrefour.fr`, `trickle.works`, and `relatiq.nl`, which has no website on it |
| 4 | `[the critical flaw]` | One or two overarching things critically poor about the whole surface | Every published page, rendered and looked at, see section 3 | An absence claim with no positive control. Dariuz's "broken images" were our proxy |
| 5 | `[stakeholder]` | The specific party the business depends on | The site's own words, who it sells to and how | A generic "visitors". tuftuf's was event planners, from its own guest range field |
| 6 | `[impact]` | What that stakeholder does instead | Inference, the only one allowed, and it must be testable by the owner | A made up number. The money rule forbids modelling any rate or revenue |
| 7 | `[xyz]` | What we build, relevant to this lead | The offer in block four | Mismatch with block four |
| 8 | brand line | **Fixed.** "Unilever, AXA, Pertamina" | Raka's template, recorded in `docs/astra-company-profile.md` | Never reworded, never trimmed, never extended |
| 9 | `[proof]` | ONE personal credential of Raka's that makes the offer believable | `docs/astra-master-context.md` section 2A, matched per section 4 below | Decoration. The credential has to be the reason we can do the thing |
| 10 | `[thing]` | A concrete artefact a stranger could draw | Derived from the flaw in block two | A brochure. "A page that shows the room" priced itself low |
| 11 | `[stakeholder achieves goal]` | The SAME stakeholder as block two, now getting what the flaw was blocking | Mirrors block two | A different stakeholder from block two, which breaks the logic |

---

## 2. The rules, block by block

### Block one, `Hi [name], saw [company], looks interesting!`

- **Word for word.** No detail, no description, no compliment beyond "looks interesting".
- The only exclamation mark in the message lives here.

### Block two, exactly two sentences, nothing added

- **Sentence one is `However, your [surface] is [the critical flaw].`** One or two flaws,
  never three. The flaw must be **overarching**, true of the whole surface, never one page's
  nit. And **critically poor**, it touches money or trust, not taste.
- **Sentence two is `This causes [stakeholder] to [impact].`** One stakeholder. The impact
  lands on that stakeholder's most valuable goal, which is also the business's revenue line.
- **No extra clauses.** No "while it sells", no "so your team loses". That was the draft Raka
  rejected.
- **The flaw survives four tests before it is written.**
  1. **Positive control** on any absence. "Not a single photo" shipped because the same sweep
     found 23 images on hfmencap.org.
  2. **Render trust.** `site-audit.js` must not print `RENDER NOT TRUSTED`.
  3. **The tweak test.** If their web person fixes it in an afternoon, it is a task and it
     cannot be the flaw. tuftuf's missing privacy policy and HF Mencap's missing cookie
     banner were both true and both held back for this reason.
  4. **The red team.** Is it deliberate? tuftuf's one screen club front is deliberate and was
     never the flaw. The private events buyer being shown no room is not a style choice.

### Block three, three sentences, the middle one fixed

- `I run Astra agency.` Fixed.
- `We build [xyz] for brands like Unilever, AXA, Pertamina.` Only `[xyz]` changes. Plain
  and short, "websites", "websites and apps", "booking tools".
- `I [proof].` One credential, and it has to carry the argument. Eten Maar "ran the
  inventory, so I know what an unsold night costs" works because a venue's unsold nights are
  inventory. "I had a food brand" alone would be decoration.

### Block four, one sentence

- `Shall I build the [thing] so [stakeholder achieves goal], and send it over?`
- `[thing]` names an artefact a stranger could sketch.
- The stakeholder is the one from block two, and the goal is the one the flaw was blocking.

### Across the whole message

- **Three consistency checks, and they are the ones a script cannot do.** The stakeholder
  in block two is the stakeholder in block four. The thing in block four fixes the flaw in
  block two. The `[xyz]` in block three covers the thing in block four.
- **The hard bans from RULES.md still hold.** No colon anywhere, no dash of any kind outside
  a proper noun, contractions present, English, four blocks.
- **Length falls out of the shape**, roughly 90 to 110 words. The gate's range is 88 to 150.

---

## 3. The research that fills `[the critical flaw]`, in order

This is where the template's "after a deep analysis of the whole website or social media,
all pages" gets done. Nothing in it is optional.

1. **Reconcile the lemlist record against itself**, RULES.md 0B. Tagline against
   `companyName`, owned against held, domain actually theirs.
2. **Web search for their site before touching `companyDomain`.** Relatiq was one approval
   from "you have no website" off DNS alone.
3. **Fetch the domain and confirm it names the right company.** A plausible TLD is often a
   different company. relatiq.io, relatiq.co and relatiq.app are three different businesses.
4. **List every published page, not just the nav.** The sitemap, and on WordPress
   `/wp-json/wp/v2/pages`, which is how tuftuf's unlinked `/friends/` page turned up.
5. **`node tools/site-audit.js` on every page, and open both screenshots of each.**
6. **Social handles only from their own HTML.** Try to read them. If it is a login wall, a
   401 or a 429, say nothing about social at all and use `site` as the surface.
7. **Find the revenue line in their own words.** Their form fields, their pricing, their
   CTAs. tuftuf's guest range and "For example €15,000" budget are what made the stake visible.
8. **Pick the flaw that sits on that revenue line**, then run it through the four tests in
   section 2.
9. **Confirm it a second, independent way.** tuftuf's zero photos was an HTML sweep, the
   screenshots, and the CMS media library, three mechanisms that cannot fail together.
10. **Write every verified fact into the queue row's `claims` at the moment it is verified.**

---

## 4. Matching `[proof]` to the lead

From `docs/astra-master-context.md` section 2A. One per message. The line after "I" states
the experience AND why it bears on this lead, in the same sentence.

| Lead | Credential | Why it bears |
|---|---|---|
| Owner operator, hospitality, food, retail, venues | Eten Maar, built a food brand from zero with five relatives, owned pricing, inventory and unit economics | Same week they are having, and unsold stock is unsold nights |
| Dutch or European B2B software, SaaS, GTM | Betty Blocks, a year and a half on go to market | How buyers of that kind of product decide |
| Enterprise, operations, industrial, data | Heineken, global e business insights across 23 markets | Scale and process buys credibility with operators |
| Revenue or sales leadership | Betty Blocks and efficy, pipeline, routing, playbooks | Closest match to what we sell under Grow and Optimise |

**Never stretch it.** If none of these genuinely bears on the lead, the message is not ready.

---

## 5. When the template cannot be filled, and what to do instead

| Situation | Outcome |
|---|---|
| The business is not theirs, or cannot be tied to them | `BLOCKED_NEEDS_INFO`, or `DO_NOT_CONTACT` if they sold it |
| No readable surface, a Cloudflare wall or a void render | `BLOCKED_NEEDS_INFO`, Raka opens it |
| Genuinely strong surface, no flaw passes the four tests | `NO_STRONG_ANGLE`. Never force a flaw |
| Only a tweak level flaw exists | `NO_STRONG_ANGLE`, note the tweak as a later favour |
| No website at all | **Open question for Raka.** `your [surface] is` has nothing to point at. The Relatiq message used "I went looking for the website and couldn't find it", which does not fit this shape |

---

## 6. Before it is sent, unchanged from RULES.md section 1

Whole thread, paged to exhaustion, immediately before the send. Every claim re-verified live
in the same minute, with its control. Text copied out of the drafts file byte for byte.
`contactId`, `linkedin`, `usr_27bdxG7jzTn2rucGB`. Re-pull to confirm it landed. Queue row
written in the same commit.
