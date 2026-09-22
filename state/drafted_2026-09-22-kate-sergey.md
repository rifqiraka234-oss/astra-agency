# Drafts, 2026-09-22. Kate and Sergey. NOT SENT.

Both threads loaded in full before drafting, paged to exhaustion. Kate 5 activities,
nextPage null. Sergey 3 activities, nextPage null. No closing nudge in either and no
promise to stop, so both are open.

## 1. Kate Phipps-Wiltshire, Hounds for Heroes. ctc_kaH4qdP7fYDv5YBwy

```
Kate, a new build is good news, and it's the one moment this is worth raising.

I read your 2025/26 accounts. Donations and legacies were £601,725 of £670,978 total income, and you spent £255,378 raising funds to bring it in, on a year that closed £76,600 down. That spend has one job, getting somebody as far as the donate page.

That page still tells them, if your preferred choice is credit or debit card please scroll down to beneath the PayPal icon. Most rebuilds replace the site and leave the giving flow untouched, because it sits in a separate system nobody wants to open.

So the question is whether yours covers the donation itself or only everything around it. If it's the second, I'll build the single screen version to drop in, amount and card together, and it's yours whether or not we work together. Who's doing the build?
```

## 2. Sergey Shalunov, SotoCat. ctc_Puf9L7o8nDTyDNn2Q

```
Sergey, glad the site's back. Last week it threw a 500 and a PHP error about a missing MySQL extension, and it loads fine now, so you'd already sorted it.

Went through it properly this time. The eight pricing brackets and the savings calculator are doing real work, there's nothing I'd touch.

What caught me is the landlord research in your footer. Your bottom bracket is 1 to 99 units at £2.50, which is priced for an agency with a portfolio. A self managed landlord with four flats is a ten pound a month customer who has to onboard themselves, never speaks to your sales side, and needs the whole thing to explain itself. That's a different product with a different front door, not a smaller version of this one.

If the research says go, you're building a second thing beside the first, and that's the bit we do. Astra's a small Dutch agency with a senior dev team behind us. What's the research telling you?
```

## Claims, every one re-opened on this pass, 2026-09-22

**Kate.** Positive control first, houndsforheroes.com homepage returns 200 at 66,967
bytes, so the fetcher works on this host. Then `/donate` and `/node/160` both return 200
at **62,892 bytes and are byte identical**, confirming the two addresses serve one page.
The card sentence is quoted verbatim off the live page today, "If your preferred choice is
credit or debit card please scroll down to beneath the PayPal icon on the appropriate
screen." One form, 19 inputs.

Financials are from **their own published Annual Report and Accounts for the year ended
31 March 2026**, downloaded from their site and read by rendering the scanned Statement of
Financial Activities, since the PDF has no text layer and the Charity Commission returns
403 to our fetcher. Donations and legacies £601,725, total income £670,978, expenditure on
raising funds £255,378, net expenditure £(76,600) after £(259,871) the year before.
Independent cross check, a web search returned £475,814 and £735,685 as the headline
figures and those match the 2025 comparative column exactly, which confirms the table was
read correctly and that the widely quoted numbers are last year's.

**Sergey.** sotocat.com returns 200 at 200,925 bytes. `/our-pricing/` returns 200 and
still lists £2.50, £2.40, £2.30, £2.20, £2.10, £1.90, £1.80 and £1.65 with the £297.60
worked example. `/team/` returns 200 and still carries the landlord research verbatim,
"SotoCat is currently conducting independent landlord research. We are speaking with self
managed landlords, portfolio landlords and landlord organisations". The ten pound figure
is four units at their own published £2.50, arithmetic only, no conversion rate and no
traffic estimate anywhere.

## The gate, and the two deliberate overrides

`python3 tools/check-drafts.py` **exits 1 on three items. One was a real failure and it
was fixed. The other two are Raka's live instruction of 2026-09-22 overriding the tool,
which RULES.md line 1 explicitly permits.**

| Gate says | Verdict |
|---|---|
| 5 blocks, the template is 4 | **Real failure, fixed.** Both merged to four. |
| 0 exclamation marks, must be exactly 1 | **Overridden. "no cheesy".** The forced exclamation was the cheesy thing. |
| draft 2 is 166 words, outside 95 to 150 | **Overridden. "170 words".** |

**The exclamation rule is arguably a bug in the tool rather than a rule these two break.**
It enforces the cold opener shape, where block one is "saw [post] and [compliment it]!".
These are replies inside warm threads, and the reply variant, the nudge, the closing nudge
and the artefact delivery shapes all carry different exclamation rules. Forcing a bright
"!" into a message about a charity that closed the year £76,600 down reads exactly as
badly as it sounds. **Raka's call whether the tool should learn the five shapes.** It has
not been changed here, because quietly loosening a gate so my own drafts pass it is the
wrong instinct.

## The four pass read back, done by hand after the gate

**Pass 1, read aloud.** Both parse. Kate's quote of her own page runs inline without
quote marks because the colon ban forbids introducing it properly, and "that page still
tells them," carries it.

**Pass 2, the credential is the reason we can do the offer.** Sergey passes, a Dutch
agency with a dev team behind it is exactly why we could build a second product, and
Betty Blocks is not reused because it was spent on him on 16 September. **Kate spends no
credential**, because Eten Maar and the pricing line were already spent in the
21 September opener and repeating it would crowd out a message already carrying four
numbers.

**Pass 3, block four names a thing you could draw. Kate passes, Sergey does not, and it
is deliberate.** Kate gets "the single screen version to drop in, amount and card
together". Sergey closes on a question because he replied with two words, and pushing a
build onto "Thanks Raka" is how a warm thread dies. Flagged, not hidden.

**Pass 4, the batch in a column.** Closes are "Who's doing the build?" and "What's the
research telling you?". Openers are "a new build is good news" and "glad the site's back".
No repetition.
