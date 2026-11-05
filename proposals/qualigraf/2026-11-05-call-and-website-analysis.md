# Qualigraf, the call read again, and what to change in the website

5 Nov 2026. For Raka. Nothing here goes to Steven.

## How this was done, and what it can't tell you

- **The call.** Raka's pasted auto transcript, read line by line. It garbles names ("polygraph", "choreograph") and a few
  details, so only what's clear is used. Everything about Qualigraf is Steven's own account, not checked by us.
- **The prototype.** The live site at astra-qualigraf-prototype.netlify.app, all nine pages opened at 1440 and 390 wide,
  scrolled screen by screen. Then the repo's own look gate (`tools/check-build.js`) run on the source. Measured numbers below
  were read from the live pages today.
- **Qualigraf's real site.** Read from the saved HTML of qualigraf.com/uk and its published assets. I could not render the real
  page. The route I tried was blocked as a bot check workaround, so I stopped rather than push around it. Raka's own screenshots
  are better than my reading for how it looks.
- **Not read.** Luna's deck PDF (45MB, over the Drive download limit). The view of Luna's style comes from her banner, post
  designs and wordmark.
- **Labels.** SAID means Steven said it. INFERRED means my reading, and it can be wrong.

## 1. The call, line by line

| What he said | What it tells us | What it means for the site |
|---|---|---|
| "Hectic morning... last quarter... getting some customers live" | Time poor, delivery pressure, UK and Canada go lives pending | Anything we ask of him must be small and clear |
| Half the call on the group's history, the Dutch dev team becoming a subsidiary, four country managers who own sales | He explained the structure at length because it's the problem he's solving. The group is mid unification. SAID | The site is an instrument for making four countries feel like one company |
| "Three different public personas... still finding our feet... positioning" | Dutch, UK and Canada are one pattern, public facing transparency. France is workflow and backend heavy. The Dutch private product is a separate legacy. SAID | One story is not enough. The site needs a shared spine and two emphases |
| France "only just started using the French part of the qualigraf.com website... Google Analytics... teething problems" | A migration just happened and the French team is protective of its numbers. SAID | A second rebuild right behind it is a real risk. Measurement per market is a requirement |
| French owner "still kind of running that... both his boss, but he's also my boss from the shareholders" | Politics. Country managers and the French owner will have a say. INFERRED | Include the country managers early, which is why a story workshop with them is the right first step |
| "I really liked the story approach... lifecycle of a decision is how we sell and position it... not something we've translated to the website. That's the hook" | The single clearest need. SAID | The site must be the sales demo, before the demo |
| UK and Canada are for new customers, the Netherlands is public sector growth with private kept, France is maintain | Investment follows UK and Canada. SAID | The first job of the website is new logos in the UK and Canada |
| "One about to go live in a couple of months" in each of UK and Canada | The first references arrive soon. SAID | A case study slot, ready, and not before it's true |
| 300 to 400 authorities per country, "you could reach all of them in a week or two" | Account based selling, not mass marketing. France is the exception. SAID | A quiet site that does a long job for a short list |
| Other suppliers "too aggressive... emailing every week" | Pushing hard damages a supplier in this market. SAID | Nurture, don't chase. Their own newsletter promises six a year |
| "If they've already gone to market and you're not engaged, the bid's already lined up for someone else... ideally the year before" | The website's job is long term presence and credibility, plus shaping the requirements before the tender. SAID | Resources that officers use anyway, and a buyer's guide. The second is INFERRED |
| "Watching pounds and pennies... by summer next year we'll be good... planning for spring summer. Just to help expectations" | He is managing us, kindly. Budget opens spring or summer 2027. SAID | A cheap first step, and a plan that doesn't need money now |
| "If you do more, then I'm interested" and "rough prices, even ballpark" | Open to more than web pages. Wants numbers for a plan. SAID | One page, written options, ballpark prices |
| Go to market workflows "possibly", outbound "less so" | The idea of intelligence is welcome. Volume is not. SAID | Lead with timing and relevance, never cadence |
| Existing site redirects by country, "unified branding, unified general overview messaging, detail specific to the countries" | The architecture he already has in mind. SAID | We build a system, not a UK page |

### What he did not say

- Nothing about the current site's traffic, leads or flaws. He is not shopping for a fix. He wants the story carried.
- Nothing about Surrey, WordPress or building it four times, which he raised on 6 Oct. We didn't raise them either, so they are still open.
- No reaction to the price, no date, no next step.
- We never asked three things from our own call kit. **Who runs the current site and what it cost. Whether anything has to be live by a date. Who else needs to see the proposal.** One real unknown is whether the Dordrecht development hub would build a site itself.

### Between the lines (INFERRED)

1. **A warm, polite park until spring.** The chance of a quick yes is low. The win is staying useful until his budget opens.
2. **His real problem is pipeline and positioning in the UK and Canada.** The website is a means. The story, and the awareness workflow, are closer to what he described than a rebuild.
3. **He liked the idea, not the craft.** His 6 Oct praise was the opening graphic, the story flow and the decision workflow. Nobody mentioned the map, the globe, the films or the polish.
4. **UK and Canada marketing was copied from the Netherlands.** That is why the UK site says "legislative process" and shows Dutch logos. Native localisation for UK and Canada is the capability he lacks, and we showed it.
5. **Steven knows this market better than we ever will.** He built the default UK system. Questions beat explanations.

## 2. What he actually needs of a website, in order

1. **It carries the sales story.** The life of a decision, ahead of the demo. SAID.
2. **It is one group with four markets.** Shared brand and spine, local detail, the country redirect kept. SAID.
3. **It works for the long game.** Credible when a council is shaping requirements, present a year before the tender, never pushy. SAID.
4. **It doesn't claim proof it doesn't have.** No UK customers are live yet. The first two are weeks away. INFERRED from SAID.
5. **His team can update it, in several languages, after we've left.** He asked on 6 Oct, and France just migrated. SAID.
6. **It can be measured per market.** The French team wants analytics its way. SAID.
7. **It routes enquiries to the right country.** Country managers own the sale. SAID.
8. **It can be built in steps that fit a spring 2027 budget.** SAID.

## 3. The prototype, audited

### What it is

Nine pages plus a 404. The homepage is **29,609px tall**, about 33 screens, with 14 sections, 13 numbered "items", nine
films and four canvases. It loads **7.0 MB** over 52 requests once scrolled. The build folder is 20 MB.

### What to keep

- The **papers in the air hero** and its turn into one pack. It is the graphic he named.
- The **eight station track**, forward plan to archive. It is the decision workflow he named, and it is Qualigraf's own idea from their film.
- **"Bring your hardest meeting. We'll run it on Qualigraf."** It asks for the demo, which is what he said they need.
- The **clear days calculator and statutory guide**. A useful tool is how an officer comes to trust a supplier.
- Qualigraf's **own illustrations, portraits and certification marks**, used correctly.
- The honest handling of proof, labelled sample data and Europe labelled as Europe.

### What fails, with the evidence

| # | Finding | Evidence |
|---|---|---|
| 1 | **Surrey is the backbone and he told us not to lead with it.** | 31 mentions on the homepage, 41 on New councils, a map, a 53 meeting dot plot, a vesting day countdown. About a sixth of the homepage. |
| 2 | **The story he liked is buried.** | The track is item 04, about a third of the way down, after Surrey and a paper stack calculator. |
| 3 | **It's a UK page, not a group system.** | No country switcher, no sign of how France, the Netherlands or Canada would look, nothing for the four markets he described. |
| 4 | **It fails the repo's own look gate.** | `check-build.js` failed 18 checks. 12 headlines on the homepage and 12 on Platform have an italic second half. 7 pill buttons, 7 chips, 5 soft shadow cards, 14 sections, 8 light and dark turns, count ups, and 55 half screens with no route to the action. The build predates the 25 Oct rules. |
| 5 | **The colours drift from Qualigraf's.** | The page is `#F3EEE3` and the dark scenes are near black, `#0B0D13` and `#12141B`. Their cream is `#FEFAEB` and their dark is navy `#2A3C5E`. Both brand values are in our CSS and not used for the big surfaces. |
| 6 | **The pictures say nothing about Qualigraf.** | Stock films of Big Ben, a night city, a typewriter, a library and a magnifier. Big Ben is Parliament, not a council. |
| 7 | **The product screens are Canadian.** | The handover says the demo council is "Clearwater Ridge", with Canadian items. A UK officer sees it. |
| 8 | **The homepage breaks on phones.** | At a 390px screen the page is 444px wide and scrolls 54px sideways. A mobile browser widens its layout to 444px and pushes the menu button off the edge. At 360 and 414 it is the same. The handover claimed zero overflow. I couldn't pin it to one element, and the Surrey map is the first suspect. |
| 9 | **It's heavy.** | 7.0 MB, a 4.7 MB film, and a Lighthouse performance of 44 on the homepage in our test container. Council machines are often old and locked down. |
| 10 | **Some claims need Steven.** | "AI Minutes, 5 hours free" while their live homepage says "coming soon". "Two UK councils are implementing", from a two month old LinkedIn post. Steven's Civica line, used on About. The East Sussex tender quote and the Joicey case, named. |
| 11 | **No measurement and no real forms.** | A static prototype. Forms post to our Netlify. No analytics, no consent, no routing by country. |

One check came out clean. The 353+ and 176 I saw in a screenshot were a count up caught mid animation. The page says 400+ and nearly 200, and they agree.

### Page by page

| Page | Verdict |
|---|---|
| Home | Rebuild around the track. Cut to about 9 sections |
| Platform (the track) | Keep, it's the strongest page. Fix the italics, the colour blocks and the Canadian screens |
| AI Minutes | Keep only once Steven confirms the product status |
| New councils (Surrey) | Retire. Keep the day one checklist as a resource |
| Who it's for | Keep, shorter |
| Security | Keep, make it a procurement pack with downloads |
| About | Split into the UK team and a new group and markets page |
| Resources | Grow it. The calculator, legislation guides and a buyer's guide |
| Contact | Keep, route the enquiry by country |
| **New** | Group and markets, and a case study page built as an empty slot |

## 4. What to change, specifically

**Concept.** From "the public record of Surrey" to "the life of a decision, for the whole group". One spine, four markets.

**Home, in order.** The papers hero. The track. One proof strip, European footprint labelled as Europe, certifications, a
slot for the first UK customer. Who it's for. A useful tool, the clear days calculator. One group, four countries, with the
switcher and his own line, "local expertise, global innovation". The two people. The close.

**Colour.** Their cream `#FEFAEB` for the page. Their navy `#2A3C5E` and deep `#1B2740` for every dark scene, and at most one
dark scene on a page. Coral `#FE764A` as the single action colour. Teal, mustard and plum only as the station colours inside the
track, not as full bleed blocks elsewhere. Peach for soft panels.

**Gradients.** None. Their brand is flat and illustrated, and the build carries 48 lines of gradient CSS, mostly glow effects on dark
scenes. If a scene needs depth, use the light on the paper in the hero, not a colour wash.

**Type.** Roman headlines, no italic second halves. Emphasis by colour or weight. Their own body face, Source Sans 3. Their heading face is
Zenon, an Adobe Fonts serif they license, confirmed from the computed style on their French homepage. Use it in roman, and keep
Source Serif 4 only as a fallback. Drop the mono kickers and the "ITEM 0x" labels. Keep station numbers only.

**Buttons and shapes.** Flat, square cornered coral buttons with navy text. No black pills, no arrows, no chips.

**Layout.** Nine sections at most. A route to "Book a walkthrough" in every half screen, with a sticky bar on a phone. The track
runs sideways on a desktop and stacks on a phone.

**Pictures.** Drop the stock films. Use Qualigraf's own illustrations and the product, re skinned with a **UK sample council**,
their own explainer film for the track, a few of the licensed UK chamber photos, uncaptioned, and later a real customer story
when the first UK council goes live.

**Motion and weight.** Keep the paper hero and the track. Drop the spinning globe, the count ups and the parallax. Honour
reduced motion. Aim for a first load under about 2.5 MB, with posters instead of preloaded films. Fix the phone overflow first.

**One system, four markets.** A country switcher that matches what they run today, with the automatic redirect kept. One template
and four instances. Show the French, Dutch and Canadian hero beside the UK one in the next look, because "we'd have to do it four
times" was his worry. The UK, Dutch and Canadian pages lead with transparency. France leads with the workflow from report to meeting.

**Measurement and enquiries.** Analytics per market the way the French team wants it. Consent per country. Their live site already
runs a consent plugin. Every demo request routes to the right country manager.

**Proof.** A case study template ready now. Until then, Europe labelled as Europe, certifications, Stuart's roughly 40 years in
Democratic Services, and Steven's own background, if he's comfortable with it.

**The platform question, and the decision for you.** We told him in writing on 6 Oct that it can sit on WordPress. You have since
said Laravel. His worry was long term updates, and France has only just moved onto the current WordPress. A rebuild would be a second
migration for them. I'd sell the **design system and the story first**, which doesn't depend on the platform, then decide the
platform with his team.

## 5. Questions to ask Steven

1. Who runs the current website, and what did it cost to build?
2. Is there a date it should be live by? A tender, a conference, a renewal round?
3. Who else needs to see a proposal? Country managers, the French owner, Rens?
4. Is there a UK demo tenant, and can we use UK sample data?
5. What is the status of AI Minutes? Is the 5 hour trial real?
6. Is he comfortable with his Civica background on the site?
7. Does Canada need French as well as English?
8. Would the Dordrecht team build a site, or is this agency work?

## 6. What I would do next, in order

1. Send the one pager. It is owed.
2. Rework the first screen and the homepage order to the list in section 4, and look at it before building the rest.
3. Fix the phone overflow.
4. Ask the eight questions on the catch up call.
5. Keep him warm with something useful until spring, such as the clear days calculator, rather than a nudge.
6. Offer a small first step that fits his spring budget, built from what he liked, the story and the decision track. The price is yours.
