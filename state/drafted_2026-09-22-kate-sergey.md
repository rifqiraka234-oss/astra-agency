# Drafts, 2026-09-22. Kate and Sergey. NOT SENT.

Both threads loaded in full before drafting, paged to exhaustion. Kate 5 activities,
nextPage null. Sergey 3 activities, nextPage null. No closing nudge in either and no
promise to stop, so both are open.

## 1. Kate Phipps-Wiltshire, Hounds for Heroes. ctc_kaH4qdP7fYDv5YBwy

```
Kate, a new build is good news!

I read your 2025/26 accounts. Donations and legacies were £601,725 of £670,978 total income, and you spent £255,378 raising funds last year. That money's whole job is getting somebody as far as the donate page, and that page still tells them, if your preferred choice is credit or debit card please scroll down to beneath the PayPal icon.

Most rebuilds replace the site and leave the giving flow where it was, because it's a separate system nobody wants to touch. So the question worth asking is whether yours covers the donation itself or only everything around it.

If it's the second, I'll build the single screen version to drop in, amount and card together, yours free either way. Who's doing the build?
```

## 2. Sergey Shalunov, SotoCat. ctc_Puf9L7o8nDTyDNn2Q

```
Sergey, glad the site's back!

Last week it threw a 500 and a PHP error about a missing MySQL extension, and it loads fine now, so you got there before I was any use. Went through it properly this time, and the eight pricing brackets and the savings calculator are doing real work.

What caught me is the landlord research in your footer. Your bottom bracket is 1 to 99 units at £2.50, which is built for an agency. A self managed landlord with four flats is a ten pound a month customer who has to onboard themselves. That's a different product with a different front door, not a smaller version of this one.

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

## The four pass read back, done by hand after the gate

**Pass 1, read aloud.** Both parse. Kate's quote of her own donate page runs inline
without quote marks because the colon ban forbids introducing it properly, and "that page
still tells them," carries it well enough.

**Pass 2, the credential is the reason we can do the offer.** Sergey passes, the Dutch
agency with a dev team behind it is exactly why we could build a second product, and Betty
Blocks is not reused because it was already spent on him on 16 September. **Kate spends no
credential at all**, because Eten Maar and the pricing line were already spent in the
21 September opener and repeating it in a reply would bloat a message that is already
carrying three numbers.

**Pass 3, block four names a thing you could draw. Kate passes, Sergey does not, and that
is deliberate.** Kate gets "the single screen version to drop in, amount and card
together", which is drawable. Sergey's close is a question rather than an artefact,
because he replied with two words and pushing a build onto "Thanks Raka" is how a warm
thread dies. The artefact conversation is one answer away, not now. **Flagged rather than
hidden, and easy to change if Raka would rather it carried an offer.**

**Pass 4, the batch in a column.** Closes are "Who's doing the build?" and "What's the
research telling you?", different questions doing different jobs. Openers are "a new build
is good news" and "glad the site's back". No repetition.

**`python3 tools/check-drafts.py` exits 0.** It failed seven ways first, on word count,
zero exclamation marks, five blocks instead of four, and "a proper look" tripping the
cringe grep. All four fixed rather than overridden.
