# Meeting brief. Schumacher Verfahrenstechnik, Matthias Ufer, Thu 5 Nov 2026, 13.15 to 13.45 Amsterdam

**When and where.** Thursday 5 Nov, 13.15 MEZ, 30 minutes, Google Meet https://meet.google.com/raz-tdsk-zdu. Calendar event g3m8e3movvm9ge9brojj4tsos0, invite sent to info@schumacher-vt.de, the address he gave at 10.20 today. It's their shared inbox, so someone else may forward it to him. Your next thing is Ivan at 15.00.

## Who he is

Matthias Ufer, Geschäftsführender Gesellschafter, so owner and CEO, of Schumacher Verfahrenstechnik GmbH in Wiehl, near Cologne. Their Impressum (rendered today) lists him and Fidai Kara, Geschäftsführer, HRB 85190 Amtsgericht Köln. North Data shows him taking over from the Schumacher family in 2025 through UFER Industries Group GmbH, a holding at the same address. So he bought a 1996 family business and is now steering it into new markets. His tagline is "Wo Metall Form annimmt und Menschen wachsen … Wiehl made it!". He has an MBA and an M.Sc.

## What the business does

Stainless steel process equipment, engineered to each buyer's process data and built in their own Wiehl shop. They make static mixers, tube coolers, thermowells and pressure vessels, plus certified welding. The reference page names over 45 clients, among them BASF, Bayer, Evonik, Clariant, Dow, Lanxess, Wacker, Air Liquide, BP and Linde.

He's pushing into two new markets, and that's why our angle landed.

1. **AI data centre cooling.** It has its own English page, /cooling-systems, with manifolds, pressure vessels and custom heat exchangers, "from quantity one", DN 3 to DN 1,600, tested up to 650 bar, 1 to 600 units. It's aimed at data centre operators, cooling EPCs and GPU hardware makers. It carries his own quote, "AI cooling isn't a variation of classic data center cooling … a new engineering category, and they're being defined right now." It promises a "First technical read-back within 24 hours."
2. **Defence and naval welding.** It has its own page, /schweissexpertise, certified to DIN 2303, and promises "Angebot innerhalb 24 Stunden".

## The angle, and what he's already seen

The problem we named, on 3 Oct, was in the quote intake. Their pages promise answers within 24 hours, yet requests come in unstructured. Every button on the English cooling page leads to /anfrage, a German page with a file drop and "Jetzt anfragen". Static mixer specs come in on a printed PDF sheet. So an engineer rebuilds each buyer's pressure, flow and material data by hand before anyone can quote, and that work grows with every new cooling and defence buyer. Rechecked today, both the German request page and the mixer PDF link are still there, and the named sales contact is Andreas Paitsch, Technischer Vertrieb.

What we built, live today at https://astra-schumacher-prototype.netlify.app (HTTP 200, title "Request a quote | Schumacher Verfahrenstechnik"), is an English spec form.

- The buyer picks cooling, a static mixer or a welded part.
- They enter their data in metric or imperial, and it converts live.
- The fields come from their own pages, and the mixer section follows their PDF field by field.
- It checks entries against their own limits, like 650 bar or a return temperature colder than supply.
- A technical drawing redraws from the buyer's numbers.
- The engineer gets the same one page spec sheet every time, printable on two A4 pages.

The send button is a demo, and the example values are labelled as made up.

## The thread so far

- 23 Sep, connect note. 29 Sep, he answered 👍.
- 3 Oct, our opener on the spec sheet. No reply.
- 9 Oct, we delivered the prototype unasked. 12 Oct, the 👀 bump.
- 21 Oct, he wrote "Pretty cool". You offered a call Thu, Fri or Mon. Nudged 25 Oct and 30 Oct.
- Today 08.32, "Let's give it try next Monday", then 08.34 "..or today Afternoon…". You answered at 08.35. At 10.20 he wrote "13:15h MEZ; info@schumacher-vt.de".

## For the call

- **Walk him through it in his own case.** Open the prototype, pick cooling and load the example. Show a value in imperial converting, the drawing redrawing, and the spec sheet his engineer would get.
- **Questions worth asking.** How many quote requests a week, and from which line? Who rebuilds the specs today, Andreas or the engineers? How long does a request take from inbox to quote? Does the 24 hour promise hold? Where should requests land, a mailbox or a CRM?
- **What a real version needs.** The send button wired to their inbox or CRM, the file upload kept, German and English, their privacy text updated, and the made up example values removed.
- **Price.** Our quotable band is €500 to €50k, from €500. Anything outside it is your call. Don't quote until you know where requests should land.
- **Be careful with two things.** The page states our guesses in their voice, for example "that sheet is what our engineers quote from", so present them as guesses for him to confirm. The read back hints are our pointers, not their engineering rules.

## The next step to aim for

Agree on one product line to go live first (cooling fits his push and the English buyers), and get the volume and routing answers so a proposal can follow this week.
