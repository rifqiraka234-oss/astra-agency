# Triple check on the prototype audit. 2026-09-24

Raka asked "100% zero mistakes? Check check check". Per RULES section 0 the answer is
never a restatement, so this is three different actions plus a control and arithmetic.

## Check 1, the source. Every send candidate re opened just now

All four re pulled after the drafts were written, to catch a reply landing in between.

| Lead | totalItems | Newest activity | Changed |
|---|---|---|---|
| Kyson Charles | 6 | our 13 Sep delivery | no |
| Julien Chiaroni | 5 | our 5 Sep float | no |
| Erisan Olasheni | 14 | our 2 Sep dates offer | no |
| Karim Narowski | 8 | our 17 Sep "no rush at all" | no |

## Check 2, the opposite. I attacked my own list, and it broke

The list of 18 prototypes came from `state/prototypes.jsonl`, **which is my own state
file, rung 4, a candidate list and never proof.** That is the self reported source trap
written into CLAUDE.md, and I walked into it.

So the recipient list was rebuilt from lemlist instead. 1,542 unique `linkedinSent`
activities, offsets 0 to 1100 pulled today plus every page saved in earlier sessions,
searched for `netlify.app`, Google Drive folders, `indigeniousfishers` and
`alan.astraagency.nl`.

**The rebuild found 26 contacts who have been sent a build. The file held 18.**

## Check 3, the independent confirmation, and it caught a bug in my own method

The first rebuild read only the `message` field and returned 19, and **it did not contain
Kyson**, who I already knew had one. That disagreement is what exposed the bug.

**The body lives in `message` on some records and in `text` on others.** Reading one field
silently drops the other. Re run searching the whole record, every field, and the count
went 19 to 26 and Kyson appeared.

Two sources, two different blind spots. The file misses sends nobody wrote down. The
activities endpoint misses sends it never recorded. Only the union is safe.

## The positive control

Before trusting any absence, the method was shown to find what it claims to. The very
first page returned the two builds sent yesterday, CustomKit and SotoCat, which were known
independently. The detector works.

## Eight builds were sent and never recorded

| Sent | Who | Link |
|---|---|---|
| 2026-07-15 | Mike Timmers | Drive folder |
| 2026-07-16 | Tomatoworld, Aart Bos | Drive folder |
| 2026-07-17 | Gerard Ouattara, GOIA | Drive folder |
| 2026-07-21 | Jack Coulthard, On a Plod | Drive folder |
| 2026-07-26 | Antanas Juodiskis | Drive folder |
| 2026-08-07 | Michele Legoratto, AIKE | aikeprototype.netlify.app |
| 2026-08-09 | Andy Olson, Indigenous Fishers First | indigeniousfishersv2.netlify.app |
| 2026-09-16 | Bo Poldervaart, Curalis | alan.astraagency.nl |

All eight are now written into `state/prototypes.jsonl`, flagged `backfilled_see_note`.
The early ones were Drive folders rather than Netlify sites, which is why a Netlify only
search would also have missed them.

## Did the recommendation change. No, and here is why

Seven of the eight were already classified correctly today off their own threads.
**Gerard Ouattara was genuinely new**, so his thread was pulled in full, 10 activities,
`nextPage` null. On 28 July he wrote "I don't think it's the right time to bring in an
agency, since it's already in motion on our side", and we closed it gracefully. A decline,
not a gap.

## The arithmetic, and it closes

26 distinct build recipients.

- **4 open and chaseable.** Kyson, Julien, Erisan, Karim.
- **2 sent yesterday.** Sergey, Chris Flood.
- **1 for Raka to decide.** Lynn Chadwick.
- **13 blocked**, each by a line we or they wrote. Suania, Barbora, Maarten, Rosalie,
  Lucas, Jori, Lisa Bouamra, Jack Coulthard, Michele Legoratto, Antanas Juodiskis,
  Mike Timmers, Andy Olson, Gerard Ouattara.
- **4 resolved.** HotGreen booked, Toffe liked, Zynox declined, Diisco declined.
- **2 live elsewhere.** Bo Poldervaart, already in today's nudge batch. Aart Bos, who is
  Tomatoworld, sitting on an open proposal.

4 plus 2 plus 1 plus 13 plus 4 plus 2 equals 26.

## What I still cannot claim

The activities endpoint under reports, which is documented and was proven again here by
Kyson's absence from the first pass. So 26 is a floor, not a ceiling. A build sent and
recorded in neither lemlist nor the state file would still be invisible. The only way to
close that completely is 123 individual thread pulls, and that has not been done.
