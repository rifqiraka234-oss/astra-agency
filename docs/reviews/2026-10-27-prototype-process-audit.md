# Prototype research and build audit, 27 Oct 2026

Raka, 27 Oct, "i feel like theyre claude looking and feeling or doesnt have the wow effect ... we only have an X amount
of credits both in claude and netlify so we cant do second or third runs of the prototype building we needa do it in one
go. What are the those feedback and how can you make sure you never repeat those mistakes again".

Sources read 27 Oct, all in this repo. state/prototypes.jsonl (114 rows, every row since 12 Oct), docs/RULES.md section 5,
docs/build-and-deck.md from the CustomKit section to the end, docs/prototype-build-spec.md Stages C and L, and the git log.
Where a row holds Raka's words verbatim they're quoted. Where only my own paraphrase survives, it's marked (notes).

## 1. The ledger, 12 to 26 Oct

12 prototypes, 30 versions. 10 were sent back at least once. Two went through in one pass (BidX 21 Oct, De Jong
Vanhommerig 22 Oct).

| Lead | Versions | What Raka said about each version, in order | First screen? |
|---|---|---|---|
| CHS justclaims, 12 Oct | 3 designs, then 2 passes on v2 | v1 dated, v2 Claude looking (notes). Picked v2, asked for a simpler story and inner pages as stories with pictures, animations and graphs (notes) | yes, yes |
| The Garnish Collective, 13 Oct | 2 plus a final pass | "10x, artsy, Gatsby and Bridgerton, his story, simple flow, not SaaS" (notes). "is this the final final thing" | yes |
| Healthy Secrets, 19 Oct | 3 | "seamless, modern, not blocky, keep the widgets" (notes). v3 after "is it final" and a review | yes |
| Hertling, 21 to 22 Oct | 3 | v1 "put yourself in his shoes". v2 "something out of the 2010s ... it needs to be done €6000 euro worth at least", presence "is this the best you can do?". v3 "love it man! keep making stuff like this" | no, yes |
| Hooft & Petiet, 25 Oct | 3 plus the plan | v1 "a typical Claude and ChatGPT website … it just feels like it's a 500 euro website". v2 "it feels like it's so plain and basic … It needs to have a wow effect". v3, then "Do itt" on adding the plan | yes, yes |
| Saavedra, 25 Oct | 3 | v1 restyled the same afternoon because the no Claude look rule landed mid build. Restyle, "be more creative in animations, videos, photos, things, graphs, whatever, think about the DESIRED UX UI user action and how the whole flow guides them". v3 "Brooo amazing!" | partly |
| Fae Club, 25 Oct | 3 | v1 "its an art company and the website is not artsy enough! Take the design 10x further". v2 "i love the art, just one last recheck or redo; does this website make it super easy to tell the story and guide the intended audience to the intended action?". v3 sent | yes, no |
| BeBetter, 25 to 26 Oct | 3 | v1 "supperr basic ... really just a cheap website ... make it like something they havent ever seen before. but still simple and tell the story and GUIDES THE AUDIENCE TO THE INTENDED ACTION". v2 "Okay i love it the only thing i'm commenting is the choice of fonts! They look cheap as f. Not exclusive". v2.1 | yes, yes |
| BWILD, 26 Oct | 2 | Before v1, "dont repeat wrong mistakes". v1 "i feel like this is a normal CLAUDE website ... it really doesnt have a wow effect". v2 "holy shit.. bro send it to him NOW" | yes |
| Honey It's Handled, 26 Oct | 3 | v1 "i feel like this is a normal CLAUDE website. look you need to be an artist ... shapes, gradients, animations photos, GRAPHICS, to tell the story". v2 "it doesn't give me wedding vibes, man ... it should be magical ... a big picture or, like, a video ... as a hero ... It's not exclusive as well". v3 waiting on him | yes, yes |

"First screen?" is my judgement, per note, of whether the problem was visible on the hero at desktop and phone. From
Hertling on, 9 of the 12 notes were, 1 partly, and the 2 that weren't (Hertling v1, Fae Club v2) are about the route
to the action, which a walk test catches mechanically.

## 2. His notes, grouped

1. **It looks made by Claude.** H&P v1, BWILD v1, Honey v1, CHS v2, and CustomKit on 23 Sep, "it still feels like the
   lovable and AI stuff".
2. **No wow. Plain, basic, not artsy.** H&P v2, BeBetter v1, Fae Club v1, Hertling v2, Garnish v1, and Qualigraf on
   28 Sep, "the page looks so simple".
3. **It doesn't guide the visitor to one action.** Hertling v1, H&P v1 ("a website is not just about putting out a bunch
   of information"), Saavedra, Fae Club v2, BeBetter v1.
4. **It doesn't feel like what they sell.** Honey v2 (no wedding vibes), Fae Club v1 (an art company that isn't artsy),
   CustomKit v3 on 23 Sep, "If you look at adidas or nike, its all about the feel".
5. **Not exclusive. Cheap type.** BeBetter v2's fonts, Honey v2, H&P ("Exclusive, premium"), Hertling ("€6000 euro
   worth at least").
6. **Their site with icing on it, not a redesign.** Qualigraf v4 on 28 Sep, "we have just taken what they've done and
   put an icing cake on it ... You didn't redesign it", and Ciara on 29 Sep, "it looks like something she can do
   herself".
7. **Dated.** CHS v1, Hertling v2.

## 3. What the versions he loved did

Hertling v3, Saavedra v3, Fae Club v2 and v3, BeBetter v2 and BWILD v2 all did the same eight things. None of them is
new; each is written in RULES section 5 or build-and-deck.md. What changed was doing all eight at once.

1. **One idea from their own words carried by the whole page.** Hertling's "no black box" ran the page from night to
   daylight. Saavedra's own sun and "Vous êtes combien ?". Fae Club's "Who will you be?". BeBetter's creed, 1.01 to the
   power of the day. BWILD's "Sunrise or night?". Honey v3's "Something Off-White. Something Blue. Something Red."
2. **Their own mark as the hero object.** Hertling's logo as a network of lit nodes, Fae Club's moon and fairy traced to
   vector, BeBetter's teddy printed live one pull at a time, BWILD's three slashes opening onto film.
3. **Award level references rendered that day**, not only their competitors (about 24 award sites for BeBetter v2,
   the Sarah J. Maas and FairyLoot sites for Fae Club's colour).
4. **A signature moment made from their material** that nobody had seen (the screen print press and SOLD OUT stamp,
   the storybook, the race bib).
5. **Full bleed film and photos of the feeling**, licence checked, never claimed as theirs.
6. **The flow as a table before code.** The hero is the first input, one state is carried down the page, and the form
   arrives filled in.
7. **The walk test.** The action is never more than half a screen away at 390 and 1440.
8. **Type from premium sites in their own field.** Mona Sans and Fragment Mono after BeBetter v2.1.

## 4. Why the first build kept coming back

1. **The rules were there first.** Stage C of the build spec ("it must not look AI made", one governing concept) is in
   its Round 1, which the spec's own history puts before its Round 2 update of 17 Aug (this clone is shallow, git only
   goes back to 17 Oct). Stage L, the wow bar, was added 13 Sep, after Acquitas took about eight rounds. Same notes for six weeks, so
   a missing rule isn't the cause.
2. **The first build was the safe version and the art came second.** RULES section 5 already counts four calm, correct
   first builds sent back (H&P v2, Fae Club v1, BeBetter v1, Honey v1), and BWILD v1 came back after "dont repeat wrong
   mistakes". My default taste is the Claude look. When I judge my own build I judge it with the taste that made it, so
   "would anyone screenshot this" passes when it shouldn't.
3. **Each note was fixed alone, and the fix caused the next note.** The flow fix made H&P v2 plain. The art fix pushed
   Fae Club's action 9.5 screens down. The art fix kept BeBetter's cheap fonts. Honey v2 took its art from her two non
   wedding nights, so a wedding planner's site felt like a nightclub.
4. **The rules are too long to hold during a build.** RULES.md calls itself one page and is 1,219 lines. With
   build-and-deck.md (1,078), the build spec (1,971) and CLAUDE.md (1,228) that's about 5,500 lines, and every
   correction is appended as one more paragraph.
5. **QA is aimed at the wrong risk.** Hertling v3 ran axe 40 times and overflow on 180 loads. Honey v1 passed 28 of 28
   functional checks and 15 of 15 axe runs, and came back for taste. No version was sent back for a bug, and the full
   QA chain ran on every version anyway.
6. **He sees the finished thing first.** A whole multi page site plus the plan, deployed, before anyone checks the
   direction. A wrong vibe costs the full build and its deploys. On 26 Oct Netlify started skipping deploys for
   account credit usage exceeded (Honey v1, two BWILD v2 uploads).
7. **Rules landed mid build from other sessions.** Saavedra v1 shipped pill buttons and glows because the no Claude
   look rule arrived during the build. BeBetter dimmed text the day "never dim text" was written.

## 5. The fix. Raka 27 Oct, "go go do it. And like before its final lets put it to html or screenshot first"

1. **One build card instead of 5,500 lines.** One page that holds all eight things from section 3 and the seven notes
   from section 2 as yes or no questions, filled in before any code. The long docs stay as the how.
2. **The first screen before the build.** Build only the hero and one signature moment, locally, screenshot desktop and
   phone, show Raka with the card. On his go, build the rest in one pass. About a tenth of a build, no Netlify.
3. **A look check that fails like check-drafts does.** tools/check-build.py over the built HTML and CSS before anyone
   sees it. Fails on the banned look (banned fonts, italic second halves, kickers over headings, pill buttons, arrow
   glyphs, soft shadow cards, marquees, count ups, dimmed text, motion that's only fades, more than eight sections on a
   home page), on a first screen without full bleed media or their mark, and on the walk test (promoted from
   state/prototypes/faeclub/qa/guide-walk.js). Every check with a planted control.
4. **QA and the deploy once, after the go.** Reviews happen on local screenshots or the one file bundle
   (tools/bundle-site.py). Only the approved build gets the full QA chain and one Netlify deploy.
5. **Pull the branch and reread the card** before the first screen and before the deploy.

The limit, said plainly. Items 1, 3, 4 and 5 make the first build better and cheaper. Item 2 is the one that actually
stops a second run, because taste is what I'm worst at judging in my own work.

## 6. What was done, 27 Oct

1. `docs/build-card.md`, one page, the order of work with Raka's two looks and every note as a question.
2. `tools/check-build.js`, run on 20 versions he judged, every plant caught on all 20. It fails 12 of the 13 he sent
   back. The miss is BWILD v1, a clean build that still wasn't good enough, which is why the first look stays his.
   Full table and hiccups in the last section of docs/build-and-deck.md.
3. The order is in CLAUDE.md (a banner, the build procedure and the ship it checklist), RULES section 5 (first
   paragraph), the top of the build spec and of build-and-deck.md, and `tools/preflight.py`, which every session runs.
4. Hertling v3 stays the reference for the idea, the logo hero and the plan, not its italic halves and pill buttons,
   which fail today.
5. Found on the way. BeBetter v2.1 and Saavedra v3, both delivered, have stretches on a phone with no way to the
   action. Not changed, it's Raka's call whether to redeploy.
