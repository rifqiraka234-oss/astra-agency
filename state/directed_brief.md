# Directed angle brief, Astra Agency, 2026-10-07

Raka has picked the angle for each lead himself. Your job is to make it SPECIFIC to this company, and to this
person where possible, with live evidence, then draft. His words: "Be specific to the company and if not the person!"

Read first: /tmp/claude-0/agents/RESEARCHER_BRIEF.md (evidence ladder and tools), docs/RULES.md sections 1A, 1B, 3,
4A, 4B, docs/opener-template.md, and the approved simple style in state/drafted_2026-10-06-simple.md and
state/drafted_2026-10-07-redraft.md. Read only. Never send, never call lemlist write tools, never commit.

## Per lead
1. Thread. get_inbox_conversation, page to the end, with a positive control (ctc_ch3vFcKAkjQdMKDCg has 2 known
   messages). If they replied beyond the connect note, stop and flag. Otherwise the shape is an OPENER.
2. Record and ownership. lemlist record via search_campaign_leads by leadId, statutory register (Companies House,
   recherche-entreprises.api.gouv.fr, Firmenbuch / North Data, KvK via tools/fetch-walled.py, Impressum). Owner,
   founder, co-founder or CEO only. If not an owner, stop with CLOSED_NOT_ICP and the evidence.
3. Research the directed angle with enough depth to be specific and true: their site crawled (python3 tools/crawl.py,
   two passes), screenshots via node tools/site-audit.js and OPENED, their own words on how they sell and operate,
   their accounts from their own HTML, news, job ads. Find the concrete job, flow or gap in THEIR business that the
   directed angle fixes, in their own material. Never invent a pain. If the directed angle genuinely has nothing,
   say so and name the closest honest alternative.
4. Judge in one short table which version of the directed angle is the most expensive for them.
5. Draft the OPENER with the gate block, in the approved simple style. Block five names the bigger outcome.
   Block four "We build [xyz] for brands like Unilever, AXA, Pertamina." with xyz matched to the offer:
   "AI workflows", "websites and AI workflows", "branding and websites and social media management", or for Build
   Squad see docs/RULES.md and docs/research-and-angles.md on the Build Squad offer (Raka's verbatim line "in half the
   time at half the price"). Credentials only from docs/astra-master-context.md section 2A, the one that carries the
   argument (Betty Blocks GTM and automation workflows covering enrichment, scoring, routing, follow up; efficy CRM
   sales and channel ops; Eten Maar for food and consumer brands; freelance social and branding consultant Dec 2020 to
   Feb 2023; Pandan Social influencer campaigns; Heineken data across 23 markets). Never claim client work Astra didn't
   deliver.
6. Red team your own draft as a separate pass: reopen every source a sentence rests on, try to prove it false, fix or
   kill. Write the result under the draft.
7. Run python3 tools/check-drafts.py on your drafts file until it exits 0. Don't reuse an identical credential
   sentence across leads in your file.

## Reference for "AI GTM workflow" (the Kyson model)
Raka's call with Kyson Charles (logs/meetings/2026-10-07-Acquitas-call.md): a one person firm finding customers all by
hand on LinkedIn. Offer was an AI workflow that builds and scores the prospect list from real data (size, sector,
region, financials, signals) and drafts the outreach, using tools like Claude and lemlist, plus a website that explains
the offer and builds trust before the first call. Use that shape where Raka asks for it, written simply.

## Output
/tmp/claude-0/agents/<folder>/<name>.md per lead (evidence, judge table, red team) and
/tmp/claude-0/agents/<folder>/drafts.md (gates plus drafts, checker passing). Return per lead: shape, the specific
angle, why it's the most expensive, confidence, flags, and the final message text.

## UPDATE from Raka, 2026-10-07: clues and inference are allowed
If nothing direct turns up, don't give up or say NO_STRONG_ANGLE. Build the angle from clues: how new the company is,
signs of growth, team size and sites, the industry's known day to day pains, and the persona (a young firm still
winning first customers wants more sales). His words: "what MIGHT be going on in their company right now is probably
the most and best thing you should ask, instead of trying to root on ultimate or direct signals."
Stay true: facts about them are verified; the inference is worded as typical or likely ("firms your size usually...",
"I'd guess ... eats a lot of the week", "at your stage most of the work is ..."), never as something we observed.
Record each inference in the gate claims as INFERENCE with the clue it rests on. See docs/RULES.md section 4A,
"Clues and inference".
