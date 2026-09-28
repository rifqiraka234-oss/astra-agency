# Draft, 2026-09-28. Steven Garratt, Qualigraf. NOT SENT, waiting on Raka's word.

Whole thread pulled 2026-09-28 before the build, `get_inbox_conversation`, 3 activities, nextPage
null, totalItems 3. Connect note 27 Sep, our opener `act_EXghGY3B9dh2Ldbfp` 28 Sep 05.34 ("Shall
I send you over what the UK site for Democratic Services teams looks like?"), his reply
`act_TibvRriQtpgkvNESe` 28 Sep 11.40, "Sure!". Pull it again immediately before sending.

Rewritten 2026-09-28 16.10 UTC for v3. The earlier version promised "a scroll through the eight
stations", and v3 took that section off the homepage, so that line would now be false.

## Steven Garratt, Qualigraf. DELIVERY. ctc_sPysigrTQgntPu9c6

```
Steven, I spent the afternoon building this.

It's the UK site for Democratic Services teams, nine pages in council language, and it all works.

Try it yourself.
https://astra-qualigraf-prototype.netlify.app

The homepage follows one decision from the forward plan to the archive, through the five clear days rule, a meeting night webcast and Surrey's twelve councils becoming two. There's a paper calculator for your own council's numbers and a clear days quiz with the bank holidays built in.

What do you think?
```

Notes for Raka.

- **This replaces "draft 2" for Steven in `state/drafted_2026-09-28-replies-waiting.md`.** Another
  session held that one because it promised to build the UK page this week. The page now exists,
  so that draft should never go. Thread re pulled 2026-09-28 after the v2 build, still 3 items,
  nothing sent after his "Sure!".
- **It's the promise from the opener, delivered.** The opener said the UK site "leads with the
  legislative process" and shows only Dutch and French logos. The build speaks Democratic Services
  (agenda packs, five clear days, key decisions, shadow authorities, Members) and puts the UK team,
  the UK reorganisation and UK law up front. The European councils are still there, labelled as
  Europe.
- **"The afternoon" is true, "the whole day" wouldn't be.** Built between about 14.00 and 16.10
  UTC, redesigned twice on your notes.
- Nine pages counted from the build, home, platform, AI Minutes, new councils, who it's for,
  security, about, resources, contact. The 404 isn't counted.
- The forms submit to Netlify Forms on our project, so a test from Steven lands with us, not with
  him. That's why the message doesn't mention them.
- No exclamation marks, it lands in a warm thread. Contractions, 2 ("It's", "There's"). 80 words.

Claims in it, each re-testable.

- Nine pages, https://astra-qualigraf-prototype.netlify.app plus /platform, /ai-minutes,
  /new-councils, /roles, /security, /about, /resources, /contact, all 200 on the live check at
  2026-09-28 16.0x UTC, deploy 6aba906c5bb37ec76206371d, parsed DOM identical to the build apart
  from Netlify's pretty URL and form rewrites.
- "follows one decision from the forward plan to the archive", homepage section "The life of one
  decision" and chapters 01 Ninety days out to 06 Six years on.
- "the five clear days rule", chapter 03, the Joicey strip and the calculator.
- "a meeting night webcast", chapter 04, the LIVE panel with speakers, agenda and vote.
- "Surrey's twelve councils becoming two", chapter 07, the twelve named councils animating into East
  and West Surrey, split read on the Surrey LGR Hub and Mole Valley DC pages 2026-09-28.
- "a paper calculator for your own council's numbers", the Wrapped section, tested
  with four sets of inputs.
- "a clear days quiz with the bank holidays built in", chapter 03 and /resources#quiz, three
  answers checked by hand and through the site's own calculator (7 Oct 2026, 23 Dec 2026,
  22 Mar 2027).
