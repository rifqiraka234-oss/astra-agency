# Draft, 2026-10-12 evening. Ulrich Steppler, CHS Claims Handling Solutions. NOT SENT, waiting on Raka's word.

Rewritten for v2. The morning version linked the v1 site and is superseded, its text is at the end of this file for the record.

Thread pulled in full 2026-10-12 about 16:10 UTC with `get_inbox_conversation`, 2 activities, `nextPage` null, `totalItems` 2, LinkedIn synced 16:07 UTC. Our opener `act_LSwAQs6WPGmisjcY2` (2026-10-11 17:24 UTC) and his reply `act_rwYK9nLhcng8DBtmt` (2026-10-12 08:50 UTC), "Yes, please do. Much appreciated, Raka." Nothing since. Our opener coming back in the same pull is the positive control. lemlist record read, `jobTitle` "Managing Director | CEO | Co-Founder", contactId `ctc_km3Aa5T7prhXZX7PB`. Queue's latest row for him is REPLIED, no never again status.

## Ulrich Steppler, CHS Claims Handling Solutions. ctc_km3Aa5T7prhXZX7PB

DELIVERY
```
Ulrich, I spent the whole day building this.

It's the justclaims site ready for the new rules. It says what justclaims does up front, then takes an airline through the 96 hour notice, the 30 day answer and the other time limits, each quoted from the Official Journal.

Try it yourself.
https://astra-justclaims-v2.netlify.app

There's a readiness check in there too. An airline answers ten questions and its gaps go straight into a walkthrough request.

What do you think?
```

Notes for Raka.

- One thread with the opener. The opener said the site's news stops in August 2023 and no page mentions the new rules, so claims teams and their legal teams can't see that justclaims is ready. This message answers exactly that, the site now explains the rules, and the readiness check turns the explanation into walkthrough requests for him.
- "I spent the whole day building this" is the skeleton's own opener and true. Cut it if you'd rather not claim the effort.
- No caveat in the message. The site carries it, a Draft banner across the top and a To confirm tag on the 15 places I couldn't check on justclaims.eu. I let the artefact say it.
- Not a pitch, no price, no meeting ask. "What do you think?" is the ask.
- Skip the acknowledgement draft (`state/drafted_2026-10-12-ulrich-ack.md`). The site is the answer to his yes.

Claims in it, each reopened on 2026-10-12 between 16:10 and 17:45 UTC.

- "ready for the new rules" is the phrase from our opener, `act_LSwAQs6WPGmisjcY2`.
- "says what justclaims does up front". https://astra-justclaims-v2.netlify.app/ , the first paragraph reads "justclaims is the software airlines use to take those claims in, check them, and pay or answer them".
- "the 96 hour notice, the 30 day answer and the other time limits, each quoted from the Official Journal". /96-hour-notice, /30-days-to-pay-or-justify and the ruler on /new-rules. All 51 distinct quotes on the site matched word for word against the Official Journal text of Regulation (EU) 2026/2202, with a control (one number changed) correctly failing.
- "a readiness check ... ten questions ... gaps go straight into a walkthrough request". /readiness, tested live, ten answers gave 7 of 10 and three gaps, and the button carried them into the message on /request-a-demo.
- The URL returns 200 and the page title is "justclaims.eu, Passenger claims management for airlines and the new EU rules". Fetch it again in the minute before sending.

Before sending, in order. Pull the whole thread again. Copy the text above byte for byte. Send with contactId `ctc_km3Aa5T7prhXZX7PB`, channel linkedin, `sendUserId usr_27bdxG7jzTn2rucGB`. Re-pull to confirm it landed. Write the queue and prototypes rows in the same commit.

Superseded, never sent (morning version, linked v1).

> Ulrich, I spent the whole day building this. It's the justclaims site ready for the new rules, with the 96 hour notice and the 30 day answer set out clause by clause, each one linked to its article in the Official Journal. Try it yourself. https://astra-justclaims-prototype.netlify.app There's a claim clock in there too. Put in a late flight and it writes the dates down. What do you think?
