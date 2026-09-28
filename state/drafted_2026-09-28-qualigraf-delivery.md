# Draft, 2026-09-28. Steven Garratt, Qualigraf. NOT SENT, waiting on Raka's word.

Whole thread pulled 2026-09-28 before the build, `get_inbox_conversation`, 3 activities, nextPage
null, totalItems 3. Connect note 27 Sep, our opener `act_EXghGY3B9dh2Ldbfp` 28 Sep 05.34 ("Shall
I send you over what the UK site for Democratic Services teams looks like?"), his reply
`act_TibvRriQtpgkvNESe` 28 Sep 11.40, "Sure!". Pull it again immediately before sending.

## Steven Garratt, Qualigraf. DELIVERY. ctc_sPysigrTQgntPu9c6

```
Steven, I spent the afternoon building this.

It's the UK site for Democratic Services teams, nine pages in council language, and it all works.

Try it yourself.
https://astra-qualigraf-prototype.netlify.app

There's a scroll through the eight stations of the committee cycle and a five clear days calculator with the bank holidays built in. The day one checklist for shadow authorities works too, and the forms click all the way through.

What do you think?
```

Notes for Raka.

- **This replaces "draft 2" for Steven in `state/drafted_2026-09-28-replies-waiting.md`.** Another
  session held that one because it promised to build the UK page this week. The page now exists,
  so that draft should never go. Thread re pulled 2026-09-28 after the build, still 3 items,
  nothing sent after his "Sure!".

- **It's the promise from the opener, delivered.** The opener said the UK site "leads with the
  legislative process" and shows only Dutch and French logos. The build speaks Democratic Services
  (agenda packs, five clear days, key decisions, shadow authorities, Members) and puts the UK team,
  the UK reorganisation and UK law up front. The European councils are still there, labelled as
  Europe.
- **"The afternoon" is true, "the whole day" wouldn't be.** Built between about 14.00 and 16.40
  UTC, then redesigned on your note.
- Nine pages counted from the build, home, platform, AI Minutes, new councils, who it's for,
  security, about, resources, contact. The 404 isn't counted.
- The forms submit to Netlify Forms on our project, so a test from Steven lands with us, not with
  him. That's why it says "click all the way through" and not "send you an enquiry".
- No exclamation marks, it lands in a warm thread. Contractions, 3.

Claims in it, each re-testable.

- Nine pages, https://astra-qualigraf-prototype.netlify.app plus platform.html, ai-minutes.html,
  new-councils.html, roles.html, security.html, about.html, resources.html, contact.html, all 200
  on the live check at 2026-09-28 16.4x UTC, titles match the build.
- "a scroll through the eight stations", index.html section "Eight stations. Nothing lost between
  them.", sticky panel switches through 8 screens, tested at 1440 (step 1 to 8, panel 1 to 8).
- "five clear days calculator with the bank holidays built in", resources.html#calculator, GOV.UK
  England and Wales bank holidays 2026 to 2028, tested on 20 Oct 2026, 30 Dec 2026, 5 Jan 2027,
  1 Apr 2027, 28 Dec 2028.
- "a day one checklist for shadow authorities", new-councils.html#checklist, 10 items with a
  progress bar, tested.
- "the trial and walkthrough forms", ai-minutes.html#trial and contact.html, validation and the
  success state tested, Netlify registered forms walkthrough, ai-minutes-trial, updates.
