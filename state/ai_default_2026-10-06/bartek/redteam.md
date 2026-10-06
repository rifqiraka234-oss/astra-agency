# Red team, Bartek Ogonowski, LEVRA, ctc_3fSkB4dv38ScfzXkH, 2026-10-06 about 14:40 UTC

Verdict, **FIX**, applied in draft.md (old text kept in draft.pre-redteam.md). check-drafts.py exits 0 on the fixed draft, 123 words in the block.

## Thread, re-pulled first

- `get_inbox_conversation(ctc_3fSkB4dv38ScfzXkH)` 0 activities, totalItems 0, nextPage null, sync recent 14:10:42Z.
- `get_inbox_conversations` sentOnly, search "Bartek Ogonowski", 1 hit, same contactId, lastSentAt 2026-10-06T05:17:44Z, preview is the connect note, lastRepliedAt null. Silent accepted, an opener is the right shape. (Positive control was the drafter's in the same hour, I didn't re-run one, so the empty thread counts as "nothing recorded" alongside the sentOnly hit, which shows only the connect note.)

## Claims

| Sentence or claim | What I opened (method, time) | Verdict | Why |
|---|---|---|---|
| "your pricing is a custom quote for every organisation" | https://www.levra.me/faqs and /our-solution, curl raw HTML, text stripped, 14:30 UTC | HOLDS | FAQ, "per-user, per-module model and is tailored to your organisation's needs. Contact us for a customised quote." No price anywhere in 33 sitemap URLs. The free HSF demo is a skills test for learners, not a self serve purchase |
| "each quote and proposal gets put together by hand" (old) | /our-solution quote form, same fetch | **WEAK, removed** | The quote form asks for a tier (4 named) and a learner band (10-25 up to 250+), which looks like a rate card. A quote may take Bartek ten minutes. "By hand" was inference stated as fact, and "proposal" isn't on the site |
| "new clients wait while..." (old) | /faqs, "Off-the-shelf content, including 31 ready-to-use modules, can be rolled out within 1 week" | **WEAK, removed** | Their own FAQ sells speed. Saying clients wait is the line he'd push back on |
| "your team page shows seven people" | /about-us curl, every "Meet the Team" name counted, 14:30 UTC. Bartek Ogonowski, Emily Gill, Margaret Curtayne, Abu Salim, Jaewon Han, Vivian Full, Gerianne de Klerk. No hidden Webflow items (0 w-dyn-item, 0 w-condition-invisible) | HOLDS, as "your team page lists seven people" | It's literally what their page shows. But the real size isn't seven. Statutory payroll average 3 (FY to Sep 2025), Tracxn 17 (Aug 2026), 6 summer interns, and a search found an Ira Gopal at LEVRA who isn't on the page |
| "that's a lot of hours for seven people" (old) | as above | **WEAK, removed** | Turns "the page lists seven" into "you are seven", which three other sources contradict. Block three now says "those hours add up fast" |
| "going after your first government contract" | https://www.legalfutures.co.uk/latest-news/female-legal-innovators-land-75000-each curl 200, 14:33 UTC, dated 10 August 2026 | HOLDS | "LEVRA is targeting £1.6m in revenue and 7,625 users by its 2027 financial year, and is looking for its first government contract." The quote is from Emily Gill, COO, not Bartek, fine because it's the company's goal. Hunted for a newer win, web searches "LEVRA human skills government contract 2026" and "LEVRA Emily Gill Bartek Ogonowski", nothing on a won contract, and the /insights sitemap has no such post. Eight weeks old, single source, so the goal is MEDIUM |
| They already sell or use AI proposal tooling | /careers (no roles, "Drop us an email with your CV"), sitemap's 14 blog posts by title, /our-solution, /faqs | HOLDS with a risk | No sales, proposal or bid tooling named anywhere, no job ads. But LEVRA is an AI product company with a CTO and Head of Product, so RULES 4A A's "check they don't already run it" can't be cleared from outside. The offer is a back office workflow, not training, so it doesn't compete with what they sell. Flag for Raka |
| "I ran the automated sales workflows at Betty Blocks, a software company selling to large organisations, so I know where a small team's hours go in every deal" (old) | docs/astra-master-context.md lines 105 to 109, docs/astra-company-profile.md line 165, docs/opener-template.md lines 641 to 643 | **WEAK, rewritten** | "The" workflows says he owned all of them, the record says Global GTM and Campaign Manager doing automation driven revenue workflows. "Selling to large organisations" isn't in our record. And Betty Blocks isn't a small team, so "where a small team's hours go" didn't follow. Replaced with the wording Raka approved and sent today in state/drafted_2026-10-06-simple.md, "I set up automated sales workflows at Betty Blocks, so I know which work a machine can take off a small team." |
| Block one, CEO and co-founder | /about-us "Co-Founder and CEO", gate's Companies House PSC | HOLDS | Tracxn's Co-CEO conflicts, the site wins, block one names no title anyway |
| Thread logic, block two to five | read as the lead | HOLDS after fix | Quote, then the quote paperwork costing selling hours, then bids making it heavier, then the AI workflow for quotes and bids. One thread, link word "quote" |
| Writing | check-drafts.py, read aloud | HOLDS after fix | No colon, no dash, one exclamation. The first fix lost both contractions ("you'll", "that's") and the checker still passed, so "you'd" was put back by hand in block two. Plain, nothing technical, nothing creepy. The £1.6m and 7,625 stay out |

## The fixed message

```
Hi Bartek, saw LEVRA, looks interesting!

However, your pricing is a custom quote for every organisation, and your team page lists seven people. This causes each new deal to need its own quote and paperwork, which takes hours you'd rather spend selling to the next client.

Especially, when you are going after your first government contract, the paperwork behind every bid gets heavier, and those hours add up fast.

I run Astra agency. We build AI workflows for brands like Unilever, AXA, Pertamina. I set up automated sales workflows at Betty Blocks, so I know which work a machine can take off a small team.

Shall I send you over what the AI workflow for LEVRA's quotes and bids looks like?
```

## The sentence he's most likely to push back on

"This causes each new deal to need its own quote and paperwork." His quote form is a tier plus a learner band, so he may say quoting is quick. The government bid is where the paperwork argument really stands, and he might also say "we're an AI company, we already do this". Both are why confidence stays MEDIUM, not HIGH.

## For Raka

The seven on the team page isn't the real headcount (payroll 3, Tracxn 17, interns). The message now says only what the page lists, never that they are seven.
