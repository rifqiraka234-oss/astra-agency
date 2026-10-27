# The build card. One page, filled before any code (Raka, 2026-10-27)

Raka's words, "we only have an X amount of credits both in claude and netlify so we cant do second or third runs of
the prototype building we needa do it in one go", and on the fix, "go go do it. And like before its final lets put it
to html or screenshot first". Since 12 Oct, 12 prototypes took 30 versions (docs/reviews/2026-10-27-prototype-process-audit.md).
Every note he sent a build back with is a line below. Copy this file to `state/prototypes/<slug>/research/card.md`,
answer every line with its source, and send it with the first screen. A line that can't be answered is a reason to go
back to research, never to guess.

## The order. Nothing deploys before step 9

1. **Pull the branch**, then read this card and RULES section 5. Rules change during the day.
2. **Research for the build.** Their whole site, every Instagram caption (the spine is often already written there),
   their photos and film, five or more premium sites in their own field for the type, and award level sites rendered
   today for the art. Facts for the plan go in one data file with their sources.
3. **Fill the card.**
4. **Build the first screen only,** the hero and the one signature moment, locally. Run
   `node tools/check-build.js <site> --action "<css>" --shots <dir>`, which writes the first screen at 1440 and 390.
   Add three frames of the moment if it moves. Look at every shot yourself before Raka does.
5. **First look. Send Raka the card's section A to C and the screenshots** (SendUserFile, no Netlify). Wait for his
   go. A note here costs one screen, so redo the screen and send again.
6. **Build the rest in one pass** to the card, the plan too when he asked for one.
7. **`node tools/check-build.js <site> --action "<line 2's selector>"` on every page,** exit 0 with every plant
   caught. Fix and rerun. Never show a build that fails it.
8. **Final look before anything goes live.** `node tools/check-build.js <site> --action "<css>" --sections <dir>`
   screenshots every section at 1440 and 390. Send those, or one file from `tools/bundle-site.py`, to Raka. Still
   nothing deployed.
9. **On his "final",** the full QA chain in build-and-deck.md once, SSO off, one Netlify deploy per site, live verify,
   the delivery drafted. Sending still needs his word.

## A. The visitor and the action. Notes "put yourself in his shoes", "guide the intended audience to the intended action"

1. Who lands, by role, and what they're thinking, in the order they'd ask it. The second and third visitor too.
2. The one action for each visitor, and the CSS selector that finds it on the page (for `--action`). The first screen
   carries it in the page, not only in the header, and no half screen from top to foot is without it, phone included.
3. The flow table (file name). One row per step, the visitor's question, what they see and do, the moment that answers.
4. The one state carried down the page, and the form arriving already filled in.

## B. The idea and the feeling. Notes "normal CLAUDE website", "no wow effect", "doesn't give me wedding vibes"

5. The feeling a buyer of what they sell expects (a wedding, magical and exclusive. A gym, sweat and pride. A
   restaurant, appetite). The hero shows exactly that, full bleed film or photography, or their own mark.
6. The one idea, in their own words, with where it's from (a caption, a poster line, their promise). It fails if
   another company could use it with the nouns swapped.
7. Their mark as the hero object. Which file, and how it becomes the hero (traced, lit, printed, opened).
8. The signature moment nobody has seen, made from their own material. Name the award sites rendered today it was
   measured against.
9. Is the art in this first build? There is no calm version one.

## C. The look. Notes "500 euro website", "cheap as f. Not exclusive", "icing on their cake", "2010s"

10. Type. Five premium sites in their field rendered today, the faces each uses, and our pair with its licence. One
    grotesk plus a quiet mono is the default (Mona Sans and Fragment Mono). A serif voice only when the field sets one.
11. A colour script from their own material (their photos, brand, rhyme), never cream and indigo taking turns.
12. A new design language, not their layout with effects on. Say in one line what changed from their site.
13. Every photo and film listed, whose it is, licence read on its own page, third party marks zoomed and checked.
14. Not one of the RULES section 5 tells, and check-build passes. No italic halves, kickers, pill buttons with
    arrows, soft shadow cards, chips, marquees, count ups, glows, one texture under every section, the same two
    column grid again and again, their photos shrunk into boxes, motion that's only fades. Ten sections at most on a
    home page, eleven is the Hooft & Petiet v1 tell.

## D. The test before Raka sees either look

check-build passing proves the build has none of the template tells. It doesn't prove the build is good. BWILD v1
passed every check (the right faces, no tells, canvas and film, an 86% hero, an action on every half screen) and Raka
still called it "a normal CLAUDE website ... it really doesnt have a wow effect". That's why the first look is his,
not the script's.

15. Put the screenshots beside BWILD v2, Saavedra v3 and Hertling v3 (the builds he signed off). Would this pass for
    a 25,000 euro site from a top studio? Would anyone screenshot it? If the honest answer is "probably", it's a no.
