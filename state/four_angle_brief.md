# Four angle re-judge brief, Astra Agency, 2026-10-07

Raka's instruction, verbatim: "Basically for all test: better website for sales or for growth / personal AI
assistant workflow / AI apps for company / or SOCIAL MEDIA AND INSTAGRAM. Judge where THE BIGGEST PROBLEM FOR
THEM LAYS. The most expensive problem. I think some of them could be social media."

Why: today Baked (Berlin cookie bakery) had been judged on its website and legal pages. The real problem was a
dead Instagram (157 days without a post, 95 followers vs Berlin peers at 800 to 12,000) and a brand that didn't
hold together. Model of the depth wanted: /home/user/astra-agency/state/accepts_2026-10-06/b9_baked.md.

Read first: /tmp/claude-0/agents/RESEARCHER_BRIEF.md (evidence ladder, tools, all mandatory), docs/RULES.md
sections 3, 4A (angles A, B, C, D and "Write it simple"), 4B, and the Tomatoworld ICP lesson in
docs/astra-master-context.md (budget for foundations, an incumbent partner takes our findings, decision maker).
Read only. Never send, never call lemlist write tools, never commit.

## Per lead, in this order
1. Thread. get_inbox_conversation, page to the end. Quote what we sent and any reply. If they replied, STOP and
   flag. If we already sent an opener AND a follow up with no reply, STOP (follow up limit). If we sent one
   opener, the shape is a NUDGE that offers a genuinely different angle, never repeats a claim, and never repeats
   a claim that was false. If only the connect note, the shape is an OPENER.
2. Record and ownership. lemlist record, statutory register. Owner, founder, co-founder or CEO only.
3. Prior research. grep state/silent_accepted_queue.jsonl and state/*.md by name and contactId. Candidate claims.
4. Test ALL FOUR angles with live evidence, each written down even when it fails:
   - WEBSITE for sales or growth (B). Crawl twice, site-audit with both screenshots opened, growth signals
     (funding, new market, hiring, new service).
   - PERSONAL AI ASSISTANT WORKFLOW for the owner (C). Their own words on what eats their week, two businesses,
     day job, solo founder doing everything. Never personal life.
   - AI APP OR WORKFLOW for the company (A). The specific manual job visible in their own material.
   - SOCIAL MEDIA AND INSTAGRAM, plus branding (D). Every account from their own HTML, dated post history
     (Instagram embed endpoint https://www.instagram.com/<handle>/embed/ gives the newest posts with
     timestamps, run a positive control on another account in the same minute), followers, comments, TikTok,
     Facebook, LinkedIn page, Google Business profile (category, reviews), and a benchmark of 4 to 8 comparable
     businesses opened at source. Brand consistency (names, look, location story, searchability).
5. JUDGE. A table of the four, each with proof, what it costs them, whether they'd name it themselves, and
   whether an incumbent (agency, partner, in house team, a tool they already run) would take it. Pick the single
   most expensive problem. Skip leads who sell that very service themselves. NO_STRONG_ANGLE only if all four
   came back empty, said honestly.
6. DRAFT, only for the winner, in the approved simple style (state/drafted_2026-10-06-simple.md,
   state/drafted_2026-10-06-accepts.md for the social version, state/drafted_2026-10-06-personal.md for
   nudges) with the gate block, block five names the bigger outcome. Block four for a social or branding angle:
   "We build branding and websites and social media management for brands like Unilever, AXA, Pertamina."
   Credentials only from docs/astra-master-context.md section 2A (Eten Maar for food and consumer brands and
   content, Heineken data, Betty Blocks GTM and automation, freelance social media and branding consultant
   2020 to 2023). Run python3 tools/check-drafts.py on your drafts file until it exits 0.

## Output
/tmp/claude-0/agents/<your folder>/<name>.md per lead (evidence, four angle table, verdict) and
/tmp/claude-0/agents/<your folder>/drafts.md (all drafts with gates, checker passing). Return a short summary
table: lead, shape, winning angle, why it's the most expensive, confidence, and the message text.
