# RULES. The operative card.

**This file outranks every other document in the repo except a live instruction from Raka
in the current conversation.** Where any other doc disagrees with a number or a ban here,
this file wins and that doc is wrong and should be corrected.

It exists because the rules were spread across fourteen documents totalling about 139,000
tokens, the same ban was restated in twenty places, and three documents gave three
different word ceilings while two of them each claimed to outrank the other. A rule nobody
can find is not a rule.

**Read this in full. It is the only doc that has to be read in full every session.**
Everything else is reference, opened when the task needs it.

---

## 0. The gate that comes before everything

**Never send, ship or state as true anything you have not checked on this pass.** Three
checks, and they are three different ACTIONS, not three readings.

1. **Source.** Reopen the thing. The URL, the thread, the file. Not your notes on it.
2. **Opposite.** Actively try to prove the claim FALSE. Open the page that would disprove
   it. Open the href, not the label. Recount the number on the page it came from.
3. **Independent.** Confirm a second way that does not share a failure mode with the first.
   A screenshot against a grep. A thread pull against a state file. Two results from the
   same tool are one check, not two.

**Absence claims ship with a positive control.** "There is no X" is worthless until the
method has been shown to find X when X is there. `tools/site-audit.js` now does this
automatically and prints VOID when its own detector fails.

**Evidence ranking. Never skip a rung upward.**

1. The live page or thread, opened now. A screenshot for anything visual or about emptiness.
2. The statutory record. Companies House, KVK, Bundesanzeiger, KBO, Infogreffe, the Impressum.
3. A raw tool response read in full, not its summary.
4. My own state files and notes. A CANDIDATE list, never proof of what happened.
5. My own memory. Not evidence, ever.
6. A summary written after a context compaction. The least reliable thing here, because it
   is a lossy compression of rung 5 that carries conclusions with the evidence stripped off.

**Being lazy is prohibited.** If a tool, an API call or a fetch can settle it, it settles
it. Token cost is never a reason to skip a check. An inference that turns out right is
still a process failure.

**Nothing crosses a context compaction without being reopened.** A draft is copied from
its file byte for byte, never retyped. A count is rebuilt from the system of record until
the arithmetic closes. "We already checked that" is the most dangerous sentence there is,
and if the check is not in a file it did not happen.

**Three sentences you may never write.** "Your website isn't working." "Your page is
empty." Anything you did not open, fetch, count or click on this pass.

---

## 1. Sending

**Every outward message needs Raka's explicit word, every time.** Editing instructions are
edits, not authorisation. "Make it English", "shorter", "less cheesy" all mean redraft and
show again. A batch approval covers that batch only and never rolls forward.

**Before any send, in order.**
1. `get_inbox_conversation(contactId)` immediately before sending. Not the preview, not a
   bulk activities pull, not a state file. If a real message exists, this is a Stalled lead
   and it does NOT get a cold opener.
2. Copy the text out of the drafts file verbatim. Never compose at send time.
3. Send with `contactId`, channel `linkedin`, `sendUserId: usr_27bdxG7jzTn2rucGB`.
4. Re-pull the thread to confirm it landed.
5. Write the queue row in the SAME commit as the send, with `domain`, `openerText` in full
   and a `claims` list each written so a later session can re-test it.

**Also Raka's call, never yours.** Flipping a campaign to running. Deleting anything.
Quoting outside the public 5,000 to 50,000 euro band.

---

## 2. The message. One number per rule.

**Opener length is 100 to 145 words.** This supersedes the 65 word ceiling in
`docs/enrichment-pipeline-spec.md` and `docs/astra-master-context.md` section 9, and the
90 to 150 general guidance in that same doc. Those three numbers contradicted each other
and two of them each claimed precedence. **100 to 145 is the number.** The roast register
may run to about 180 because the evidence is the joke.

**The four blocks.**

```
Hi [name], saw [something they published] and [compliment it]!

However, [the problem in one sentence]. This means [the cost of doing nothing].

I run Astra agency [what we would do for them] after [one matched credential].

Shall I [the artefact, named concretely]?
```

**Hard bans in outreach prose.** No colon character anywhere. No em dash, en dash or
hyphen, with one exemption, a hyphen inside a real proper noun such as Mercedes-Benz or
Witt-Dörring. Exactly one exclamation mark and it lives in block one. Contractions must be
present. English always, whatever language the lead or their site is in.

**Block one.** One thing seen, one reaction. Never a list, never a second example, never an
interpretation of why their choice was clever. The compliment is three or four words.
Never rate their craft.

**Block three.** Two or three short sentences. Never a comma chain. One credential, matched
per `docs/astra-master-context.md` section 2A, never a list of them.

**Block four.** Name the artefact so a stranger could draw it.

**Run `python3 tools/check-drafts.py <file>` before showing any batch.** It exits non zero
on failure. It covers every mechanical rule above plus pass 4 across the batch. Passes 1,
2 and 3 stay human, read it aloud, check the credential is the reason we can do the offer,
check block four names a thing.

**The five other shapes**, each with its own rules, all in `CLAUDE.md`. Reply variant.
Nudge, the only place an emoji is allowed. Closing nudge, the only place urgency is
allowed. Artefact delivery. Never resend a URL to someone who already has it.

---

## 3. Research

**Order.** The person first, never the company's HTML. What are they measured on. Separate
the business they OWN from the job they HOLD. Pull the statutory filing. Then the site,
rendered and LOOKED at before any grep. Then the impact on that person's number. Then
widen only if the site is genuinely fine.

**Run `node tools/site-audit.js <url> <tag>` and open BOTH screenshots.** The five angles
are dated looks, stack and social, GDPR, a shortcoming against their target, and
certificates. Order of force is usually 4, 3, 1, 2, 5.

**Never guess** a domain, a nav path or a social handle. Take every URL from their own HTML
or a search result, then fetch it and confirm the page names the right company.

**A link to a bare platform homepage is not a social presence.** It is an unconfigured
theme placeholder. The audit tool now shouts about this.

**A fetch failure is UNKNOWN and retryable, never "no angle".** A TLS error seen through
our proxy is never evidence about their certificate. Always load a control host through the
same path in the same minute.

**No manufactured pain.** `NO_STRONG_ANGLE` is a real, correct outcome. Climbing the so
what ladder means tracing a verified defect to its real consequence, never inflating a
small true thing into a big false one.

**The tweak test.** If their existing web person could fix it in an afternoon, it is a task,
not an angle. Use the defect as proof and sell the structural thing behind it.

**Money figures.** Only from their own published numbers, with the sum shown, anchored
deliberately low. Never model a conversion rate, a traffic figure or a margin. Never put a
figure on a credibility or positioning problem. Expect about one message in four to carry
one, and treat a batch where most do as a sign they are being invented.

---

## 4. lemlist

**Full field map in `docs/lemlist-field-index.md`, section 1 is a reverse lookup.**

The four that cost us leads.

- **Acceptance is `channelMetrics.linkedinInvitationAccepted` and the
  `linkedinInviteAccepted` activity.** Never a timestamp heuristic.
- **`lastSentMessagePreview` lies.** It has shown the connect note at the exact second a
  real opener went out. Only `get_inbox_conversation` per contact is reliable.
- **The activities endpoint is reliable for acceptances and NOT for sends.** It silently
  omits real messages.
- **Names are abbreviated** to an initial. Key on `contactId` or `linkedinUrl`, never a name.

---

## 5. Building

Read Stage L of `docs/prototype-build-spec.md` before any build. Verify by cold load with
error capture, never by forcing reveal state. Every image fetched and byte matched. Every
section screenshotted and actually looked at. Never caption a photograph as the client's
premises, staff or customers. The delivery partner disclosure travels with Unilever, GPay
and MWX, always.

---

## 6. Where everything else lives

| Need | File |
|---|---|
| Operating procedure, all five message shapes, the corrections history | `CLAUDE.md` |
| Which lemlist field answers which question | `docs/lemlist-field-index.md` |
| How to research a prospect to the evidence standard | `docs/astra-prospect-research-master.md` |
| Choosing the angle, the G/O/I/B library | `docs/astra-commercial-angle-master.md` |
| Business identity, ICP, pricing, Raka's credentials in section 2A | `docs/astra-master-context.md` |
| How the writing must read | `docs/writing-standard-anti-ai.md` and `docs/NO-AI-SLOP.md` |
| Build and craft bar | `docs/prototype-build-spec.md` plus its round 3 addendum |
| The three pipelines | the enrichment and inbox triage specs |
