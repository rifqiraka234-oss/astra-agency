# Batch 16, 2026-09-28. Nudges for everyone pitched 11 Aug to 16 Sep with no reply. 39 SENT 11:48 to 11:54Z on Raka's word, 3 held (Lars Tibben, Dan Lowe, Laurent Gourier).

Raka's words, "pull all full threads and draft message each", and "do we also have anyone that we sent a
prototype on friday or earlier and we havent nudged them?"

## What was run

- **48 threads pulled** with `get_inbox_conversation`, one per contact, all `nextPage` null (the three
  that paged are prototype threads, see below).
- **Every original claim re-checked live today.** Each site was rendered in Chromium, text and links saved,
  and the page the claim lives on was opened (FAQ answers clicked open, subpages rendered, raw HTML curled
  where a render could hide it). The full log is at the bottom of this file.
- **Domains came from each lemlist record**, not from memory. That turned up one wrong company, below.

## The count

48 threads. 38 nudges, 1 closer, 2 closes where the site changed, 1 correction, 6 skipped.

| Outcome | Who |
|---|---|
| Skip, they declined and we closed | James Thornton (JigiWeb), Luke Dear (RDA), Robert Fennis (Emerge), Sébastien Alotto (MYSA, new site on its way) |
| Skip, fixed since | Mahmut (Proof AI, counter now reads 10 weeks) |
| Skip, fixed since | James Stewart (Bamboo Invest, the declaration gate is gone) |
| Close, they did the thing | Jojanneke (WiseHuman), Martijn Mol (Remarx) |
| Correction | Katie Goodier, pitched on another Katie's company |
| Closer | Johannes Quandt (ROOBS), 7 weeks |

## The prototype question

**Nobody who got a prototype on Friday or earlier is waiting on a first nudge.** All 21 prototype threads
were pulled.
- Nudged on Friday 25 Sep: Klarity, Revios, Acquitas, WisTree, SotoCat, Curalis.
- Nudged two or three times in Aug and early Sep: Zenara, Di Lieto, Greentic, Rosalie Voortman, Point
  Audit, That Animation Company, On a Plod, AIKE, Antanas, Mike Timmers, Indigenous Fishers, Toffe.
- Told in writing that it was the last one: Rosalie, Jack (On a Plod), Michele (AIKE), Antanas.
- Declined: Connectome, Archetype HR, GOIA, CustomKit, Diisco.

---

## Katie Goodier. CORRECTION. ctc_3Bu58Rji68L6jgFwH

**We pitched her the wrong company on 16 Sep.** The opener was about Risk Averse Surveyors, its RICS
reports and a £9.98 Etsy workbook. Risk Averse Surveyors Ltd (Companies House 11848113) has one officer,
Katie CONSTABLE-MAYNE, and LinkedIn lists "Katie Constable-Mayne MRICS, Director at Risk Averse Ltd". Our
lead's lemlist record is Katie Goodier, Therapeutic Fit (therapeutic-fit.co.uk), founded 2026, and her
/about/ page says "experienced Social Worker, safeguarding specialist, trauma informed movement
practitioner". Nothing ties her to surveying. Raka's call whether to send this or say nothing.

### Katie, CORRECTION

```
Katie, I owe you an apology. The message I sent on the 16th was about Risk Averse Surveyors, and that's another Katie's business entirely. I mixed the two of you up.

Sorry for the confusion, and please ignore it.
```

---

## Abdullatif Al-Zaeem, LIVSHO. NUDGE. ctc_2XHwaefanCzHRkuWe. 14 days

Pitched 14 Sep, a seller fees page. Rechecked, /faq "What are Livsho's seller fees?" opened, it still says
the rate "depends on category and seller tier" and to check the Seller Dashboard.

### Abdullatif, NUDGE

```
Abdullatif, back on the seller fees page.

Your FAQ still answers the fees question by sending sellers to the dashboard, and they only reach that after the ID, liveness, IBAN and CR checks. So the shop owner comparing platforms still can't see your rate before committing.

Is publishing the commission bands something you've decided against, or just not got to yet?
```

## Carolien Leeraar, MicroMovements. NUDGE. ctc_THtBhA3u5JqnsdL3Q. 14 days

Pitched 14 Sep. Rechecked /business/, Team Recharge still promises a "bewezen aanpak" and "minder
ziekteverzuim" with no company, number or HR quote.

### Carolien, NUDGE

```
Carolien, back on Team Recharge.

The business page still promises a proven approach and less absence without a single company or number behind it. An HR manager who likes it has to sell it upstairs, and right now all they've got to forward is your word.

Have you run it with a team that would let you name them?
```

## Christelle Dupuy, PalindromeX. NUDGE. ctc_h9McQeY5zaJR9pbmm. 14 days

Pitched 14 Sep. Rechecked, no person named on /, /platform or /ai, and /about and /team both render the
site's own "Page Not Found", same as a made up path.

### Christelle, NUDGE

```
Christelle, one more on the people point.

The site still doesn't name anyone, and palindromex.com/about and /team both land on Page Not Found. A procurement lead checking who's behind the platform before your 20 minute demo finds nothing to check.

Is keeping the team off the site deliberate for now?
```

## Gijs van den Hombergh, Noventes. NUDGE. ctc_SmypArZJqYCc2Cjpg. 14 days

Pitched 14 Sep. Rechecked, /projects is a list of subsidy schemes with no project or amount won. The
homepage now links three partner sites, so the "two logos" line is not reused. Roy Hoven at Noventes had a
separate opener on 3 Sep, not mentioned here.

### Gijs, NUDGE

```
Gijs, back on the proof side.

The Subsidies page is still a list of schemes, with no project you've run or amount you've won on it. A founder comparing advisers can see what you'd apply for, not what you've landed.

Is there one project you'd be happy to show with the number on it?
```

## Irem Unlu Demir, DemirX Partners. NUDGE. ctc_5SyckWYt9uMKL5CMt. 14 days

Pitched 14 Sep. Rechecked, the homepage still opens "Where exceptional strategy seamlessly integrates with
effective delivery for transformative results", Shell and Koç only on /about-us/.

### Irem, NUDGE

```
Irem, back on your first screen.

The homepage still opens on exceptional strategy integrating with effective delivery, and Shell and Koç are still one click away on About. A board choosing who runs its M&A decides on that first screen, and it's reading a phrase.

Would it help to see it led by the career instead?
```

## Jose Barbosa, z3leads. NUDGE. ctc_cRhuCBWWwXsGvEWTf. 14 days

Pitched 14 Sep on case studies without numbers. **The site is down today, which outranks that.**
z3leads.com answers 301 to itself (curl followed 6 redirects and stopped), www.z3leads.com is a CNAME to
cdn.webflow.com and returns Cloudflare "Error code 1014, CNAME Cross-User Banned" (curl and
tools/fetch-walled.py), and Chromium fails to load it. Control, example.com 200 and 44 other sites loaded
in the same run.

### Jose, NUDGE

```
Jose, quick heads up before anything else. z3leads.com isn't loading right now.

The main address redirects to itself in a loop, and www shows a Cloudflare 1014 error, because it still points at an old Webflow address. Anyone clicking through from LinkedIn this week gets an error page instead of your 12 million.

Want me to tell you exactly what to change in the DNS?
```

## Kevin Rato, SURGEOR. NUDGE. ctc_vprJ9wmXfFGzQ6csE. 14 days

Pitched 14 Sep. Rechecked, "ILS NOUS FONT CONFIANCE" still holds two images, Siblu_Villages_Logo and
logo_01-light.png.

### Kevin, NUDGE

```
Kevin, back on Siblu.

The trust carousel is still Siblu plus the theme's placeholder logo. Siblu is proof a DSI would actually read, what they ran before, what you moved them to and what it took, and it's sitting there as one logo.

Could you get Siblu's OK to write it up?
```

## Lars Tibben, Studio Live Productions. NUDGE. ctc_8HL4vo9cA55Yugaav. 14 days

Pitched 14 Sep. **NOT SENT 2026-09-28, and the 14 Sep opener was probably wrong.** The raw HTML embeds three
videos from video.allardstudios.nl, Last-Modified 3 and 4 June 2026. Our Chromium can't play H.264, so the
render showed none. The opener told him there was no footage. Held, a correction is Raka's call.

### Lars, NUDGE

```
Lars, back on the reel.

The site still doesn't have any footage on it, not even thirty seconds of a past stream, while the press release is linked right there. A brand choosing a livestream partner wants to see a stream first.

Have you got recordings from past shows you could use?
```

## Lars Vagevuur, WebMar. NUDGE. ctc_YpijTFXfDCEb5mboD. 14 days

Pitched 14 Sep, white label build capacity. No site claim to recheck, the homepage loads with the cases.

### Lars, NUDGE

```
Lars, back on the white label idea.

When a WebMar client needs a custom backend or a real integration, who takes it today? If it's you in the evenings, that's the gap we fill, your client and your name on it, the build on us.

Worth a short call to see if it fits how you work?
```

## Léa Janoray, Le Goût des Confidences. NUDGE. ctc_7t4sjmWpsECwFc4Z9. 14 days

Pitched 14 Sep. Rechecked, still no newsletter or subscription, the autumn edition sells as a single
product. Hélène Gallais at the same company had a separate opener on 2 Sep, not mentioned here.

### Léa, NUDGE

```
Léa, back on subscriptions.

The autumn edition is out and the site still sells it one issue at a time, with no way for a summer reader to get it automatically. Each season you're winning the same readers again.

Is a subscription something you've looked at for the magazine?
```

## Leen van 't Veen, Metrix Solutions. NUDGE. ctc_urWosocAvuKznR9ux. 14 days

Pitched 14 Sep. Rechecked, the client logos (Metrix-TataSteel.png, Metrix-Heineken.png and others) still
sit above a general "Onze projecten variëren" line, no project written up.

### Leen, NUDGE

```
Leen, back on the project page.

The logos are still there, Tata Steel and Heineken among them, but no job behind any of them. A plant engineer comparing scanning partners reads a logo as a claim and a project as proof.

Is there one you're allowed to write up?
```

## Louise Hewitson, Thrive. NUDGE. ctc_FHyyBwHpRManaTDC3. 14 days

Pitched 14 Sep. Rechecked, /consultancy/ still says "Clients value our approach because:" followed by
Thrive's own reasons, no client quoted there or on the support services page.

### Louise, NUDGE

```
Louise, back on the consultancy side.

The page still says clients value your approach, then gives your reasons rather than theirs. A trustee trying to get you in front of the board needs one line from another charity to forward.

Is there a charity you've helped who'd give you a quote?
```

## Luis Perona, Coach in the Box. NUDGE. ctc_pMTuCCHvsuoaGQSfD. 14 days

Pitched 14 Sep. Rechecked, no price and no client named on the German or English homepage.

### Luis, NUDGE

```
Luis, back on pricing and proof.

The site still has no price and no company that's run the 100 day box. The HR lead who wants it has to take it to a CFO with nothing on paper.

Is leaving the price off a deliberate choice?
```

## Lydie Smets, Fervonic. NUDGE. ctc_yhAiLZCELHdLhGXwG. 14 days

Pitched 14 Sep. Rechecked, soniform.com now forwards to fervonic.com, and the tile still reads "Heat the
material up to 100x faster." with no material or test behind it.

### Lydie, NUDGE

```
Lydie, back on the 100x claim.

The Fervonic site still says up to 100x faster with no material, thickness or test next to it. The process engineer who'd champion you internally gets asked 100x against what, and has nothing to show.

Do you have one test result you could publish?
```

## Manuela Eilers, LEBENSWEG. NUDGE. ctc_hmBRggspuWjQi2mkE. 14 days

Pitched 14 Sep. Rechecked, /produkt/beratungstermin-buchen/ is "Beratungstermin vor Ort", a description
and Rezensionen (0), no price of its own.

### Manuela, NUDGE

```
Manuela, back on the Beratungstermin.

The vor Ort appointment page still shows no price, while the checklists next to it have one and a basket button. That's where someone finally ready to talk about their parents' wishes stops.

Would you want to put a price on it, or keep it by enquiry?
```

## Mark Langens, Movion. NUDGE. ctc_cHaWqfG74a3tQenef. 14 days

Pitched 14 Sep. Rechecked, /about-us/ still says "led by Mark Langens, is built on more than 15 years" and
"well-known global start-ups" without naming one.

### Mark, NUDGE

```
Mark, back on your About page.

It still says more than 15 years and well known global startups without naming a single one. An importer betting their European entry on you wants the names.

Is there a reason they're left off?
```

## Martijn Mol, Remarx. CLOSE. ctc_5rvRJdXGDJWccKEAm. 14 days

Pitched 14 Sep on no customer named. **Changed since.** The homepage now has "WAT KLANTEN ZEGGEN" with
quotes from Sanne Edel and Martin Rutten, both marked "uit eerder werk van onze oprichters".

### Martijn, CLOSE

```
Martijn, saw the Wat klanten zeggen section on the homepage. That's the gap I was pointing at, good to see it filled.

Once there's a Remarx client of your own to put there, that one will carry even more.
```

## Muhammad Ahmed Sarfraz, Accupe. NUDGE. ctc_Bi4TqichhqadXAoCN. 14 days

Pitched 14 Sep. Rechecked, "What firms say about Accupe" still holds one testimonial.

### Muhammad, NUDGE

```
Muhammad, back on proof.

The What firms say section still has one testimonial. You're asking a firm to move its whole client book, and one quote carries all of that.

Would two or three firms you've migrated agree to a short write up?
```

## Nives Rombini, Navis Bio. NUDGE. ctc_5CacAA3M84ChXeJyN. 14 days

Pitched 14 Sep. Rechecked, the only contact is mailto:contact@navis-bio.com, no form or calendar.

### Nives, NUDGE

```
Nives, back on the way in.

The site still ends every path at a mailto link. The director who's just read the technical report at 11pm gets a blank email as the next step.

Would a short form and a calendar link at the end of the report be worth trying?
```

## Romain Garcin, Agence Mediatik. NUDGE. ctc_vsQq5j4wnfGgdffp2. 14 days

Pitched 14 Sep. Rechecked, the two external links are the Le Point stories piece and the Le Figaro column,
both about Mediatik.

### Romain, NUDGE

```
Romain, back on placements.

The site still links two articles, and both are about Mediatik rather than a client. A founder deciding on a placement wants to see one they'd be proud to share.

Is there a client piece you could point people to?
```

## Russell Upton, audopia. NUDGE. ctc_GeZjYLHZZtsoLej5u. 14 days

Pitched 14 Sep. Rechecked, the employer section offers "a structured 90-day pilot with engagement
tracking" and quotes 3 to 5% utilisation for other platforms, with no audopia number or employer named.

### Russell, NUDGE

```
Russell, back on the employer page.

It quotes 3 to 5% utilisation for other platforms and offers a 90 day pilot with engagement tracking, but no engagement number of your own. That's the figure an HR director would take into the budget meeting.

Have you got pilot numbers you could publish yet?
```

## Samer Al-Waealy, Brightnerds. NUDGE. ctc_Yaf69nqYfJPwxxspq. 14 days

Pitched 14 Sep. Rechecked, /customers still says "See how our customers use Scion to power research and
insight" and credits "Scion's AI systems", signed Joseph Rao, next to the real Static Entertainment story.

### Samer, NUDGE

```
Samer, back on the customers page.

It still says see how our customers use Scion, with the Joseph Rao quote crediting Scion's AI systems, right next to your real Static Entertainment story. A buyer checking you out spots the template before the work.

Has that page just slipped through?
```

## Seydouba Fissa Sylla, waaly. NUDGE. ctc_bJjDXZyP9jtQn8KGx. 14 days

Pitched 14 Sep. Rechecked, still no placement, client or number on the homepage.

### Seydouba, NUDGE

```
Seydouba, back on track record.

The site still shows the team but not a placement, client or number. A company deciding who gets its search mandate needs one sign you've filled a role like theirs.

Is there a search you can talk about, even without the name?
```

## Sylvia Randazzo, L'Office des Artistes. NUDGE. ctc_cqo2xTDfrTkrPwZTY. 14 days

Pitched 14 Sep. Rechecked, /qui-sommes-nous still offers access to "(galeries, collectionneurs,
institutions)", /services-loa "Prix : 900€ HT", none named, no artist shown.

### Sylvia, NUDGE

```
Sylvia, back on the network.

The site still promises access to galleries, collectors and institutions without naming one, and no artist you've worked with appears. An artist weighing up the 900 euros has only your word for the part they're paying for.

Is there an artist who'd let you tell their story?
```

## Tracey Stewart, Motzu Labs. NUDGE. ctc_PSY4YT5G55xrtTRZ2. 14 days

Pitched 14 Sep, two days before the PRO Fall Convention ended. Rechecked, the homepage still says "We're
launching publicly at this year's PRO Fall Convention" and "PRO Fall Convention & Trade Show 2026".

### Tracey, NUDGE

```
Tracey, the convention was nearly two weeks ago and the homepage is still inviting dealers to come and see you there.

The dealers you met on the floor are opening the tab now and landing on an event that's over.

Want me to put together the after the show version I mentioned?
```

## Ziad Al-Nuss, TechCare. NUDGE. ctc_4558xsj8YPprDPCDi. 14 days

Pitched 14 Sep. Rechecked, the raw HTML still carries Devon Lane, Cameron Williamson, Eleanor Pena and
"exceeded our expectations", with images from tekmino.themejunction.

### Ziad, NUDGE

```
Ziad, back on the testimonials.

They're still the theme's own, Devon Lane, Cameron Williamson and Eleanor Pena, praising Tekmino. On a cybersecurity site that's the part a careful buyer checks.

Want me to rebuild that section around two real clients?
```

## Jelle De Vries, EduOs. NUDGE. ctc_3sPAr6qf3jXXaYeMP. 12 days

Pitched 16 Sep. Rechecked, the homepage images still include 700-425.fw_.png and man-vinger.fw_-1.png,
Fireworks exports. The 0% screenshot sits inside an image and wasn't rechecked, so it isn't used.

### Jelle, NUDGE

```
Jelle, back on eduosweb.com.

It's still running the old Fireworks images, the man pointing at nothing among them, while the EduNova site next door looks current. A school comparing the two picks the modern looking one before the demo.

Want me to rebuild the homepage so you can compare the two?
```

## Martijn Hak, DBL Lunteren. NUDGE. ctc_iL43m4QAgbFop26d4. 12 days

Pitched 16 Sep. Rechecked, /contact/ is still an address and "Email versturen" as a mailto link, no form.

### Martijn, NUDGE

```
Martijn, back on the contact page.

It's still just an address and an email link, while the form lives back on the homepage. Someone who's just scrolled through your projects and clicks Contact gets sent to their mail app.

Shall I send over the homepage and one project page rebuilt?
```

## Yohan Maronnier, ISTEF. NUDGE. ctc_ojbk7CE5wCwwhPrJo. 12 days

Pitched 16 Sep. Rechecked, Candidater still links to completel.istef.fr/fmi/webd/FMW_CandidatureEnLigne,
page title "FileMaker WebDirect".

### Yohan, NUDGE

```
Yohan, back on the application.

Candidater still opens the FileMaker WebDirect page, so a 17 year old on a phone still meets a desktop database, and they won't tell you when they give up.

Want me to send the phone version of the candidature form?
```

## Yolanda Heeren, YOOS! Design. NUDGE. ctc_v4Kie5QRq97eaoHPR. 12 days

Pitched 16 Sep. Rechecked, the homepage, /diensten and /portfolio have no form, only Calendly links, and
only /contact-en-over-mij has a form.

### Yolanda, NUDGE

```
Yolanda, back on the quote request.

Home, services and portfolio still only offer a 30 minute call in your calendar. Anyone who only wanted a price for twelve desks either books your half hour or closes the tab, and you won't know which ones left.

Would a short quote form under each project take some of those calls off you?
```

## Leon Marzoll, ZeptronIT. NUDGE. ctc_ZzLzx9ZvXGw6n3ZhB. 15 days

Pitched 13 Sep, white label overflow so ZepDesk keeps moving. No site claim.

### Leon, NUDGE

```
Leon, back on ZepDesk.

When a client's outage lands on a Friday, is ZepDesk still the thing that slips? That's the overflow we'd take, white label, so the product keeps moving while you look after the client.

Worth a short call?
```

## Dan Lowe, DJi Studio. NUDGE. ctc_XAGgwnXjEjeS7royq. 15 days

Pitched 13 Sep. Rechecked, /portfolio still labels the six demos "Sonic Profile 1" to "6", while
SmileCraft, All Paws, Luxury Motors and Claire's still show in the page's file names. **NOT SENT 2026-09-28.**
At send time the portfolio showed those names as visible text and says "Sonic Profiles are based on
fictional companies and intended for demonstration purposes", so the 13 Sep opener's premise, real clients
hidden behind numbers, was wrong. Held, a correction is Raka's call.

### Dan, NUDGE

```
Dan, back on the portfolio.

The demos are still Sonic Profile 1 to 6, while the files behind them say SmileCraft, All Paws and Luxury Motors. A dentist listening would buy faster if the track said dentist, and right now it's a number.

Want me to put the play by industry version together?
```

## Keivan Said, Newlense. NUDGE. ctc_9qxzK4dxa2xQjTdfo. 15 days

Pitched 13 Sep, a referral setup for the site half after the click. No site claim.

### Keivan, NUDGE

```
Keivan, back on the idea from the 13th.

When one of your reels lands a commerçant a spike in clicks, where do those clicks go? If it's a weak site, your content takes the blame at the monthly review.

Worth a quick chat about building that half for your clients?
```

## Oscar Van Der Maas, VDM Energy. NUDGE. ctc_2FdPBcud5TGRTPkZ4. 15 days

Pitched 13 Sep. Rechecked, "Energie begint met inzicht." with "Gratis offerte aanvragen" as the route.

### Oscar, NUDGE

```
Oscar, back on the five question check.

The site still promises inzicht and then only offers an offerte. The people who aren't ready yet leave, and you spend drives on the ones who were only curious.

Want me to put the working version together?
```

## Tim De Groot, Studio Was Here. NUDGE. ctc_TaLModN4bzwthsixD. 15 days

Pitched 13 Sep, after he asked "Let me know how I can help you". White label build.

### Tim, NUDGE

```
Tim, you asked how you could help, so here's the honest answer.

When a Studio Was Here project grows past design into a real build, we'd be the team behind you, your client and your creative direction.

Is that something you run into?
```

## Nikolas Wagner, Wagner Energy Solutions. NUDGE. ctc_mF4YgtZWWek4sDrb9. 15 days

He asked for background on 12 Sep and got a long answer on 13 Sep offering a § 7g calculator. Rechecked,
IAB Investments on § 7g EStG is on the site, no calculator.

### Nikolas, NUDGE

```
Nikolas, back on the § 7g calculator idea from the 13th.

When someone wants to know what an IAB investment does to their tax bill, can they work it out on the site, or does that still happen by email? If it's email, a quick calculator would answer it and hand you their details.

Shall I build a rough version so you've got something to react to?
```

## Laurent Gourier, Orsia. NUDGE. ctc_54viZ4CmynX3hSM8P. 26 days

Pitched 2 Sep, a section showing the interface generating a Sepro program. **NOT SENT 2026-09-28.** The
homepage already shows a screenshot (Capture-decran-2026-02-10-a-21.35.20.png) of the assistant starting a
"programme de déchargement presse" in chat, so the claim below is contestable. Held.

### Laurent, NUDGE

```
Laurent, back on the demo idea from early September.

A technician still can't see Orsia write a Sepro program without spending their free messages. A short clip of it doing that on the homepage would answer the question before they sign up.

Want me to mock that section up?
```

## Jennifer K., Earth Explorer Pro. NUDGE. ctc_iz4NuH89hLfSS9795. 26 days

Pitched 2 Sep. Rechecked, still no email signup, and "Explore Our Journeys" still goes to /contact/.

### Jennifer, NUDGE

```
Jennifer, back on the email list.

Someone who's just finished one of your films still has nowhere to sign up, and Explore Our Journeys still opens a contact form. For a content brand, those viewers are the audience you build on.

Want me to put the homepage version together?
```

## Dr. Vikram Athalye, QuantumCognate. NUDGE. ctc_JvgAreqPd8QFx4oPM. 28 days

Pitched 31 Aug. Rechecked, a /programs/ page now exists but says programs "are being designed" and "will
gradually grow", with no program, date or example.

### Vikram, NUDGE

```
Vikram, I had a look at the Programs page.

It says the programs are being designed, so there's nothing for someone keen to join to sign up for yet. Even one first program with a date would give them a next step.

Is the first one far off?
```

## Johannes Quandt, ROOBS. CLOSER. ctc_3HtSsCH34mMAJXgce. 48 days

On 18 Jul he said the B2B area was "about to finalize" and asked about NL market entry, and on 11 Aug we
answered that NL entry isn't our work and offered the portal sketch. Rechecked, roobs.de/b2b/ is still
"COMING SOON".

### Johannes, CLOSER

```
Johannes, last one from me on this.

The B2B page still says coming soon, two months on. If the portal's gone quiet on your side, the sketch is still here whenever it's useful.

Good luck with ROOBS either way.
```

## Jojanneke van 't Land, WiseHuman. CLOSE. ctc_suZBCi4aRsTNTGeEW. 14 days

Pitched 14 Sep on the twenty years sitting only on About. **Changed since.** The homepage now reads "Met
ruim twintig jaar in recruitment en leiderschap".

### Jojanneke, CLOSE

```
Jojanneke, saw the twenty years on your homepage. That's exactly what I had in mind, it reads much stronger.

Good luck with WiseHuman.
```

---

## Live re-verification log, 2026-09-28

Chromium render at 1440, text and links saved, the page each claim lives on opened.

- **LIVSHO. HOLDS.** /faq "What are Livsho's seller fees?" opened, answer points to the Seller Dashboard.
- **MicroMovements. HOLDS.** /business/ Team Recharge "bewezen aanpak", "minder ziekteverzuim", no company, number or HR quote.
- **PalindromeX. HOLDS.** No person named on /, /platform, /ai. /about and /team are soft 404s, the same "Page Not Found" as /zzqq-nope.
- **Noventes. PARTLY.** /projects is a Subsidielijst, no case or amount. The homepage now links three partner sites, so the count isn't reused.
- **DemirX. HOLDS.** Home "Where exceptional strategy seamlessly integrates with effective delivery for transformative results." Shell and Koç only on /about-us/.
- **Bamboo Invest. CHANGED.** Raw HTML opens "The sustainable MPS offering UK advisers a complete solution", /about renders the founders, no declaration gate. Skipped.
- **WiseHuman. CHANGED.** The homepage now reads "Met ruim twintig jaar in recruitment en leiderschap". Close.
- **z3leads. DOWN.** z3leads.com 301s to itself (curl, 6 redirects). www CNAME cdn.webflow.com returns Cloudflare "Error code 1014" (curl and fetch-walled). Chromium ERR. Controls example.com 200 and 44 other sites in the same run.
- **SURGEOR. HOLDS.** Carousel images Siblu_Villages_Logo and logo_01-light.png.
- **Studio Live. HOLDS.** 0 video, reel, mp4, YouTube or Vimeo.
- **Le Goût des Confidences. HOLDS.** No newsletter or subscription.
- **Metrix. HOLDS.** Logos incl. Metrix-TataSteel.png, Metrix-Heineken.png, no project written up.
- **Thrive. HOLDS.** /consultancy/ "Clients value our approach because:", no client quote.
- **Coach in the Box. HOLDS.** 0 price, 0 client names, DE and EN.
- **Fervonic. HOLDS.** "Heat the material up to 100x faster."
- **LEBENSWEG. HOLDS.** Beratungstermin vor Ort, description only, Rezensionen (0), no price of its own.
- **Movion. HOLDS.** /about-us/ "more than 15 years", "well-known global start-ups", none named.
- **Remarx. CHANGED.** "WAT KLANTEN ZEGGEN" with two quotes "uit eerder werk van onze oprichters". Close.
- **Accupe. HOLDS.** One testimonial.
- **Navis Bio. HOLDS.** mailto only.
- **Mediatik. HOLDS.** Two external links, lepoint.fr and lefigaro.fr, both about Mediatik.
- **audopia. HOLDS.** "a structured 90-day pilot with engagement tracking", "3–5%" about other platforms.
- **Brightnerds. HOLDS.** /customers Scion template text and the Joseph Rao quote still live.
- **waaly. HOLDS.** No placement, client or number.
- **L'Office des Artistes. HOLDS.** /qui-sommes-nous "(galeries, collectionneurs, institutions)", /services-loa "Prix : 900€ HT".
- **Motzu. HOLDS, stronger.** "We're launching publicly at this year's PRO Fall Convention".
- **TechCare. HOLDS.** Devon Lane, Cameron Williamson, Eleanor Pena in the raw HTML.
- **EduOs. HOLDS in part.** 700-425.fw_.png and man-vinger.fw_-1.png. The 0% screenshot isn't used.
- **DBL. HOLDS.** /contact/ mailto only.
- **ISTEF. HOLDS.** FileMaker WebDirect.
- **YOOS. HOLDS.** Home, /diensten, /portfolio no form, Calendly only.
- **Katie Goodier. WRONG COMPANY.** Risk Averse Surveyors Ltd 11848113, sole officer CONSTABLE-MAYNE, Katie. Our lead is Therapeutic Fit.
- **DJi. HOLDS.** /portfolio Sonic Profile 1 to 6.
- **VDM Energy. HOLDS.** "Energie begint met inzicht.", "Gratis offerte aanvragen".
- **Wagner Energy. HOLDS.** § 7g IAB described, no calculator.
- **Orsia. HOLDS loosely.** No video, free trial and demo only.
- **Earth Explorer Pro. HOLDS.** "Explore Our Journeys" to /contact/, no signup.
- **QuantumCognate. HOLDS with a nuance.** /programs/ "being designed".
- **Proof AI. FIXED.** "10 WEEKS TO PROOF". Skipped.
- **ROOBS. HOLDS.** /b2b/ "COMING SOON".
