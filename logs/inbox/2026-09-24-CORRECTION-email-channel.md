# The audit was LinkedIn only and it missed two live deals. 2026-09-24

Raka pushed back with a screenshot of the Kyson thread and said check again. The Kyson
row was right. **The method underneath it was not.**

## What I got wrong, plainly

**I audited one channel.** Every count in `2026-09-24-awaiting-their-reply.md` came from
lemlist, which only sees LinkedIn. Deals do not stay on LinkedIn. They graduate to email
the moment somebody hands over an address, and at that point they vanish from the lemlist
view entirely and look like silence.

So "108 threads waiting on them" contained at least two threads that were not waiting on
anybody. They were the two most advanced deals in the pipeline.

## Miss 1. Tomatoworld, and this one was one approval from real damage

My list had **Joyce van Dalen-Zwinkels, 23 days quiet**. Worse, on 2026-09-21 Raka said
"always close joyce and joel and lynn", and a graceful close was drafted for her.
**That close was never sent. Had it gone, it would have landed on a live proposal.**

What is actually true, read from Gmail today.

| When | What |
|---|---|
| 8 Sep | Prototype `astra-tomatoworld.netlify.app` emailed to Ank van der Meulen, interim communicatie, `project@tomatoworld.nl` |
| 9 Sep | Ank accepts, asks for Google Meet |
| 15 Sep 09:30 | **A real meeting runs.** Josh attends |
| 14 Sep | Raka sends the recap, naming the booking flow as the sharpest pain |
| 17 Sep | Ank replies. **"Aart and Joyce are the decision makers"**, "don't take any steps yet", "we will await your more detailed proposal". Their stack is C# on .NET with Umbraco |
| 22 Sep 13:35 | **Proposal sent**, in Dutch, recommending they start with the booking platform |

Gmail threads `1a0818c577eb2d47` and `1a0c952b46ef4aee`. The proposal is two days old and
the ball is with them. Joyce is not a lead to close, she is a named decision maker on an
open proposal.

## Miss 2. HotGreen, where a meeting happened this morning

My list had **Georgia Ware, 14 days quiet**. The LinkedIn thread genuinely does stop on
10 Sep. It stops because it moved.

| When | What |
|---|---|
| 9 Sep | Georgia hands us to Sanya Chhugani, Engagement Manager, who owns the redesign, and gives two addresses |
| 10 Sep | Raka emails Sanya with Georgia cc'd |
| 21 Sep | Sanya emails asking for 30 minutes. Raka offers 11.00 CEST, she accepts |
| 22 Sep | Calendar invite accepted |
| **24 Sep** | **The meeting happened.** Raka sent the recap at 09:55, cc Josh and Luna |

Gmail threads `1a0c4633c44b9d4c` and `1a0d2d5971a63502`.

## A second failure sitting underneath both

**Neither meeting was ever recorded.** `state/meetings.jsonl` held three rows, Curalis
twice and Monad Edge. It did not hold Tomatoworld on 15 September and it did not hold
HotGreen on 24 September, and no brief was written for either.

The playbook says every booked meeting gets a row, an emailed brief and a repo copy.
Both of these were booked over email, and the booking flow only ever watches LinkedIn,
so both fell straight through. Raka walked into both calls without a brief.

Both rows are now written, marked `recordedLate`. The briefs are still owed.

## The rule this earns

**An inbox audit that reads one channel is not an inbox audit.** Every future pass over
who owes whom has to read lemlist AND Gmail AND the calendar, and reconcile them per
lead, because the more advanced a deal is the more likely it has left LinkedIn. A quiet
LinkedIn thread on a warm lead is now a prompt to search Gmail for their domain, never a
finding on its own.

The tell is specific and cheap to check. **Any thread where we ever received or sent an
email address is a thread that may have moved.** Georgia handed over two addresses in
writing on LinkedIn, in the very message my audit read, and I still did not go and look.
