# BeBetter QA, 25 Oct 2026

Every test has a planted control or a fault run, and a pass only counts because the plant was caught. The final chain ran
on the build that is deployed (qa/run-all.sh, build hash unchanged from start to end). Live checks ran on the final
deploys, site 6ade5d71431a8f021c733295 and plan 6ade5d8d10d3b151d53861bf.

| Test | Result | Control |
|---|---|---|
| overflow.js, 9 widths, EN and NL, every page, after a resize | 0 of 90 loads with a problem | a 2000 px block, caught |
| axe.js, WCAG 2.2 AA and best practice, 1440 and 390, EN and NL, reduced motion | 0 violation types | an image without alt and a low contrast line, both caught |
| axe.js with motion on | 0 violation types | same |
| clip.js, text spilling out of its box, 4 widths, both languages | 0 of 40 loads | a 40 px box with a long word, caught 40 of 40 |
| kitfit.js, the kit driven through the real controls, sums worked out independently | PASS, 38 checks, 305 pieces on two garments | fault run fails on 10 checks |
| form.js, validation, the send read back from the captured payload (logo file included), the failed send's mail | PASS, both paths | fault run fails |
| film.js, the 1% film | plays only on screen, pauses off screen, never under reduced motion, files 200 | it must be paused before it's on screen |
| rendertext.js, text written by the scripts, both languages | 0 lines with a colon or dash | a planted line, caught on 10 of 10 loads |
| copy_audit.py, every string, alt and attribute, EN and NL | site 3 flags, plan 0 | 8 planted faults per page, all caught |
| nojs.js | every page readable, garments drawn, English shown, the form present | |
| NO-AI-SLOP section 8 grep | 0 words, 0 phrases on all five pages | "we leverage seamless solutions", 3 hits |
| check-drafts.py | delivery Option B PASS, Option A FAIL on the money rule by design | |
| livehash.py | site 61 of 62 identical, plan 35 of 35 | the one difference is Netlify's form tag, diffed |
| livecold.js, 1440 and 390 | 10 of 10 clean, no broken image, noindex header on every page | |
| live kitfit, form, film | PASS, PASS, PASS | |

The 3 copy flags are their own words quoted exactly, "they loved our Teddy!" and "we are already building our stand at the
next event SIGGI'S, in Breda for the whole weekend". Kept word for word on purpose.
A video request the browser aborts when a page closes mid download is listed apart (media, ERR_ABORTED), the film test
proves the files and the playback separately.
