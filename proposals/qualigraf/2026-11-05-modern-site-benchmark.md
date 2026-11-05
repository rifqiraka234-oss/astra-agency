# Better than the competitors, and what "modern" means here

5 Nov 2026. For Raka. Internal, nothing here goes to Steven.

You said the aim isn't to match the competitors, it's to be better, and to look like a modern site. This does both. It measures
the competitors and Qualigraf's current site, studies five sites outside the category that set the real standard, and turns it into
a bar the next build has to clear.

## How this was done, and the limits

- **Measured today** with the same script on all 16 sites, desktop at 1440 wide and a phone at 390. Load time, Largest Contentful
  Paint (LCP), layout shift (CLS), bytes, requests, and the standard automated accessibility engine, axe 4.10.
- **One network.** Every run came from this container, so absolute times are indicative and the comparison between sites is fair.
  Qualigraf's own pages were repeated three times and came out the same. Google's public speed service was over quota, so I
  couldn't get a second opinion. **Check Qualigraf's numbers against real user data before anyone says them to Steven.**
- **Automated accessibility finds only part of the problems.** A clean result isn't proof, and a flag isn't a verdict.
- **Not seen.** Civica's and iBabs's own sites, walled to us. Luna's deck.
- **Labels.** MEASURED means I ran it. SEARCH means a search summary I couldn't open. INFERRED is my reading.

Screens are saved next to this file in `benchmark/`, the raw numbers in `measurements-2026-11-05.json`.

## 1. The finding

1. **The category is a low bar.** Seven competitor homepages, and almost none shows the real product on the first screen, almost
   none says plainly what it does, and three of the eight open with a cookie box over the phone first screen. They are mostly fast, though. Six of
   eight pass Google's loading threshold.
2. **Qualigraf's current site is behind all of them on speed and stability.** MEASURED, repeated three times.
3. **The best sites outside the category agree on a short list of moves.** One plain sentence. The real product, shown at once.
   One action. Proof beside it. Fast to the first screen even when the page is heavy. These are cheap to copy and nobody here does them.
4. **So "modern" doesn't mean more effects.** It means clear, real, quick, accessible and distinctive. Our prototype has the
   distinctive part and misses the rest in places.

## 2. The numbers (MEASURED, 5 Nov, desktop 1440)

Google's "good" thresholds are LCP at or under 2.5s and CLS at or under 0.1 (SEARCH, web.dev). Serious and critical axe issues are
counted as affected elements.

| Site | LCP s | CLS | MB | Requests | Axe critical / serious | Phone fits |
|---|---|---|---|---|---|---|
| **Qualigraf Canada** (their live site) | **7.0**, repeat 4.7 to 6.0 | **0.789**, same on 3 runs | 5.0 | 129 | 1 / 7 | yes |
| **Qualigraf France** (their live site) | **7.0**, repeat 4.8 to 5.6 | **0.882**, same on 3 runs | 4.1 | 132 | 0 / 3 | blank in one run |
| Our prototype | 1.1 | 0.000 | 1.1 at load, **7.0** once scrolled | 29 | 0 / **11** | **no, 444 on 390** |
| Granicus | 2.1 | 0.020 | 4.8 | 256 | 0 / 40 | yes |
| Diligent | 0.8 | 0.000 | 5.1 | 116 | 0 / 6 | yes |
| FCS | 2.3 | 0.000 | 3.7 | 40 | 0 / 8 | yes |
| My Council Services | 6.9 | 0.000 | 4.6 | 81 | 3 / 6 | yes |
| Public-i | 9.0 | 0.008 | 9.4 | 98 | 11 / 16 | yes |
| Notubiz | 1.2 | 0.082 | 4.1 | 104 | 0 / 16 | yes |
| eScribe | 1.9 | 0.033 | 3.8 | 276 | 0 / 7 | yes |
| Berger-Levrault | 1.6 | 0.025 | 3.5 | 52 | 2 / 2 | yes |
| *Stripe* | 0.9 | 0.009 | 8.1 | 171 | not run | yes |
| *Linear* | 1.8 | 0.000 | 2.9 | 303 | 0 / 15 | yes |
| *Mercury* | 0.8 | 0.000 | 10.8 | 167 | 0 / 4 | yes |
| *Attio* | 3.9 | 0.000 | 6.9 | 212 | 0 / 45 | yes |
| *GOV.UK* | 0.5 | 0.226 | 0.6 | 16 | not run | yes |

What it shows.

- **Qualigraf's live pages are the unstable ones.** A single Elementor block jumps by 0.75 on the Canadian page and 0.86 on the French
  one, identically on every run. Every competitor stays at or under 0.082. In plain words, the page rearranges itself while it loads.
- **Qualigraf's LCP is about twice the "good" limit.** Only My Council Services and Public-i are as slow.
- **Weight isn't the problem.** Everyone is between 3.5 and 10.8 MB. The best sites, Stripe at 8.1 and Mercury at 10.8, are the
  heaviest and still show their main content in under a second. **They stage their load. They don't strip it.**
- **Our prototype loads fast and then grows to 7.0 MB once scrolled, fails axe on 11 elements and overflows a phone.** The
  contrast issues are real and ours to fix.
- **Even the famous sites have contrast flags.** Linear 15, Attio 45. So the bar isn't zero on a tool. It's zero serious issues
  plus a manual keyboard and screen reader pass, which almost nobody here does.
- GOV.UK's 0.226 is most likely its cookie banner pushing the page. INFERRED.

## 3. What the best sites actually do

Seen today, in `benchmark/exemplars-desktop.png`.

| Move | Seen at | The competitors |
|---|---|---|
| **One plain sentence on what it does** | Linear, "the product development system for teams and agents". GOV.UK, "the best place to find government services and information" | "Citizen Experience Platform". "Welcome to the Home of Cloud Based Public Sector Software". "Building tomorrow's governments". Qualigraf's, a long paragraph about "the legislative process" |
| **The real product on the first screen** | Linear, Attio, Stripe, each with live interface | Stock people at Granicus, Public-i, Berger-Levrault. Qualigraf shows illustrations and no screen |
| **One action** | Mercury, an email box and one button. Attio, one primary button | Two or three equal buttons and a floating prompt |
| **Proof beside the claim** | Stripe's one big figure. Mercury's regulatory line | Rare. Public-i leads with a slogan |
| **Task first** | GOV.UK opens on a search box and the five things people come to do | Nobody |
| **Quick first screen, heavy load staged** | Stripe, Mercury, Linear | Four of eight are quick. Two are not |
| **Consent that doesn't take the screen** | Attio keeps it to a small bar at the foot. Mercury shows none. GOV.UK's takes the top of the phone screen too | **Public-i, Notubiz, eScribe and Qualigraf's own Canadian site open behind a box on a phone** |

Phone first screens are in `benchmark/phone-first-screens.png`. Notubiz, Public-i and eScribe open behind a consent box, and Granicus opens with a promo popup on desktop. The
better sites show the idea first.

## 4. How we beat each competitor

| Competitor | Where they are weak, MEASURED or seen | Our advantage |
|---|---|---|
| **Civica Modern.Gov** | Walled to us. A claim of about 380 UK customers (their G-Cloud document). They appear to hold the words "committee management", since tenders use them. INFERRED | Don't fight on that. Show the whole life of a decision, with the topic and its history |
| **eScribe** | An eight stage strip, the cycle idea, a Canadian focus in what I read | A topic file that carries its dossier, goals and memory. Their stages are our stations, so the file is the difference |
| **Notubiz** | Fast and stable. Owns "clear decision-making" in the Netherlands | A Dutch company. I saw nothing on UK or Canadian presence, but I didn't check. In the Netherlands, differ on memory and strategy links, not on clarity |
| **Berger-Levrault** | Generic "trusted publisher" headline, stock photos, two critical axe issues. Shipped AI in October | A named, honest AI story and a demonstrable product |
| **Diligent** | Strong first screen with real product. Boards, not councils | Council language and UK statutory detail they can't copy |
| **Granicus** | 40 serious axe flags, popups over the hero, 256 requests | Calm, accessible and specific |
| **FCS, My Council Services, Public-i** | Generic, and two of three are slow | Almost anything clear wins here |

**Where nobody is good, and we can be.** Showing a real UK interface. A first screen that says in one sentence what it does. An
accessibility statement that holds up. A consent bar that doesn't block. A tool a Democratic Services officer would bookmark.

## 5. The bar the next build must clear

These are measurable. The prototype fails five of them today, accessibility, phone, first screen, imagery and weight once scrolled.

| Standard | Target | Prototype today |
|---|---|---|
| Loading | LCP at or under 2.5s on a mid range phone, not just our machine | 1.1s desktop, untested on a phone |
| Stability | CLS at or under 0.1, interaction under 200 ms | 0.000 |
| Weight | First load around 2.5 MB, films on demand with a poster | 1.1 MB, then 7.0 MB scrolled |
| Accessibility | Zero serious or critical axe issues on every page, plus a keyboard and screen reader pass | **11 serious** |
| Phone | No sideways scroll from 360 to 1920 | **444 on a 390 screen** |
| First screen | One sentence, the real UK product, one action | Papers and a headline, no product screen |
| Consent | A small bar, equal choices, never over the first screen | Not built |
| Imagery | Their own illustrations and UK sample screens. No stock films | Stock films, Canadian demo screens |

Accessibility is also a selling point. UK councils are bound by the public sector accessibility regulations of 2018, and a guide
says each public body must publish an accessibility statement (SEARCH). The sources disagree on whether the benchmark is WCAG 2.1 or 2.2 at AA,
so check the current regulation text before we state either. **A supplier that publishes a credible accessibility statement for its
site and its product is rare in this field.** Ask Steven whether Qualigraf has one for the product.

## 6. The wow, and the rules around it

Modern also has to be memorable. For this story the strongest ideas share one trait. **The visitor does something, and the page
builds the thing they'd buy.** Three candidates for the build card, which is where the choice gets made.

1. **The file that builds itself.** The first input is the visitor's own meeting date and committee type. As they scroll, a real
   decision file assembles with its statutory clock, the 28 clear days notice and the five clear days for the pack, with sample UK data.
   It turns the clear days calculator, our best tool, into the spine. UK rules only. Other markets need their own checked rules.
2. **Institutional memory, made tangible.** Pick a past sample decision and see everything it remembers. Who wrote it, who signed
   it off, what it linked to, what changed since. It makes "preserving institutional knowledge" visible.
3. **Paper to pack to file.** The hero we already have, the loose papers becoming one pack, kept as the opening beat.

**Guardrails from our own rules (RULES section 5, `docs/build-card.md`).** One idea carried by the whole page, no islands. No serif
with an italic second half, no pill buttons with arrows, no chips, no count ups, no marquee, no chapters taking turns light and dark.
Their mark and their product as the hero object. The card first, then the hero and one signature moment shown to you, then the rest in
one pass. Nothing deployed for review.

## 7. What this gives the pitch to Steven

- **A fact about his own site**, once checked against real user data. In our test his homepages take about five to seven seconds to show
  their main content and rearrange themselves while loading, where six of the eight competitors we tested were under two and a half.
  Say it as a measurement, not a verdict, and only after it's verified.
- **A clear standard** that a unified site would meet, written down and checkable.
- **A reason for sequence.** Fix the foundation that shows on the first screen, then the story.

## 8. For you to decide, and to ask

**Decisions.**
1. Which signature idea goes onto the build card first?
2. Do we offer a free speed and accessibility report on his current site as a sample deliverable, once verified?
3. Do we commit to the accessibility targets in writing?

**Ask Steven.**
1. Does Qualigraf have an accessibility statement and a conformance report for the product?
2. Who owns the current site's performance, and has anyone looked at the 0.8 layout shift?
3. Is there real user data for the site, for example search console or analytics?
