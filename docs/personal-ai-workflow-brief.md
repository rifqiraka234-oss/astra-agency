# Personal AI workflow brief, Astra Agency, 2026-10-06

Raka, 2026-10-06, about leads still closed as no strong angle: "Maybe we can resort to the AI workflows thing i mean in
the end of the day it might not be for the company but also for them personally you know".

So the subject of the message can be the OWNER's own week, not the company's process: the founder who does sales, ops,
hiring and posting alone; who runs two businesses or a business next to a day job; who answers every enquiry, writes every
proposal, posts on LinkedIn every week, handles their own inbox, scheduling, invoicing, reporting. The offer is an AI
workflow (or personal AI assistant setup) that gives the owner hours back.

Read only everywhere except your output file. Never send, never call lemlist write tools, never touch git.
Read first: /home/user/astra-agency/docs/RULES.md sections 1A, 4A ("THE DEFAULT ANGLE"), and the earlier evidence for each
lead (grep /tmp/claude-0/agents/ and /home/user/astra-agency/state/ai_default_2026-10-06/ for the name), plus the latest
simple style Raka approved: /home/user/astra-agency/state/drafted_2026-10-06-simple.md (plain words, no technical detail,
"AI workflow", short sentences).

For EACH lead:
1. Re-pull the whole thread with get_inbox_conversation (page to the end), quote every message with date and direction.
   Follow up limit: if we already sent a real opener AND a follow up with no reply, or promised a last message, or they
   asked us to stop, STOP: no draft. If we sent one real message, the draft is a NUDGE that refers to it lightly. If only the
   connect note, an OPENER.
2. Confirm they own the business (prior evidence plus the register if in doubt). Not owners: stop.
3. Find what eats the OWNER's own time, from their own words: their LinkedIn headline, About, posts (via
   node /home/user/astra-agency/tools/social-audit.js on URLs from their own pages, or fetch-walled.py), the lemlist record
   summary and experience (several roles at once, a day job), the site (one person named everywhere, "contact me
   directly", every CTA to the founder's calendar or WhatsApp), job ads, press. Quote it with the URL.
4. Disprove: do they sell AI or automation themselves, or visibly run their own AI assistant setup? Then no draft.
5. Draft in Raka's simple style (look at drafted_2026-10-06-simple.md): the five block opener template with the fixed
   wording ("Hi [name], saw [company], looks interesting!", "However, ...", "This causes ...", "Especially, when you are
   ..., the ...", "I run Astra agency. We build AI workflows for brands like Unilever, AXA, Pertamina. I [proof from
   /home/user/astra-agency/docs/astra-master-context.md 2A, true, simple].", "Shall I send you over what the [bigger
   outcome, e.g. the AI workflow that gives you your evenings back] looks like?"). 95 to 170 words for openers, 40 to 80
   for nudges. No colons, no dashes or hyphens, contractions, no money figures, plain words, nothing creepy (never quote
   their private life, family, health or a post's personal detail back at them; a business fact they publish is fine).
   Never invent how they spend their time: it must be visible in their own material. Gate block above each draft in the
   format of the passing examples in /home/user/astra-agency/state/drafted_2026-10-03-batch1-redo.md.
6. Run python3 /home/user/astra-agency/tools/check-drafts.py on your file until it passes.
Write /tmp/claude-0/agents/nsa/<tag>.md (per lead: heading "### <Name>, <Company>, <contactId>", screen summary, verdict
DRAFT or NO_DRAFT with the reason, gate and tagged draft). Reply with a table: name, verdict, the one line personal time
signal with URL, confidence.
