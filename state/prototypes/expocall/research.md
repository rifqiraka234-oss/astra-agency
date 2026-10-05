# ExpoCall hotels page, research (2026-10-05)

Working dir /tmp/claude-0/agents/b5_expocall. Nothing sent, nothing committed, nothing deployed.

## 0. The ask, verified in lemlist

`get_inbox_conversation(ctc_k2GNq2p5WKD64TYvx)` pulled 2026-10-05, page 1 of 1, totalItems 4, nextPage null.

- 2026-08-30 connect note.
- 2026-09-03 opener (hear a real call, see a result up front).
- 2026-10-03 nudge, "Shall I build a page where each trade can hear a real call for their business?"
- 2026-10-04 09.23 Chris, verbatim: "We already have pages for many trades so I don't want you spending a lot of time on a page but I'd be curious to see how your page for hotels would look"

So the deliverable is one page, ExpoCall's own hotel trade page, where a hotel owner can hear (here, read and watch) a call from their kind of guest. Deliverable mode is a conversion landing page (Stage 0.1 mode 2). It's one buyer decision, sized to what he asked for. It is not a full prototype, and I14 routes and forms are deliberately out of scope because he asked for one page.

## 1. Site map, from the rendered nav, sitemap and Wix page registry

Wix Studio site (`generator: Wix.com Website Builder`), www.expocall.ai. Nav pills are Home, AI Answering, AI Calling, AI Chat, Pricing, FAQ, Company, Log In.

Trade pages (footer "SOLUTIONS" and the AI Answering menu, hrefs from the HTML):
/air-conditioning-engineer, /beauticians-and-beauty-salons, /dog-groomer, /electrician, /gardening-and-landscaping-contractors, /heating-and-gas-engineers, /lettings-agent, /nail-bar-and-salons, /plumber, /roofing-companies, /sunbed-tanning-salon, /tutors, /window-cleaner. That's 13.

Product pages are /inbound, /chat-agent, /trade-show-lead-follow-up, /warm-event-lead-follow-up, /convert-trade-show-leads-into-meetings, /how-expocall-makes-outbound-calling-work, /customer-satisfaction-surveys, /integrations, /pricing-plans/list, /faq, /about-us, /contact-us, /venue-wiki.

**Does a hotel page exist?** There's no public one. I checked the hrefs on the homepage and footer, all 35 URLs in pages-sitemap.xml, and the Wix page title registry (75 titles) for hotel, hospitality, B&B and guest house.
- Positive control. The same grep found "hotel" in the registry, so the method does detect it. The match was `"Example Hotel Portal Call Scoring"` at **/hotelcallscoringexample**. It's unlisted (not in the sitemap or nav). Its embed (filesusr a5ba93_75799c51...html) is "DRAFT ExpoCall AI Voice Analytics Schema", "designed for AI Voice Agents integrated with MEWS". It lists 16 caller intents (I01 New Booking ... I16 Spam), 11 operational outcomes (O01 AI Fully Contained, O02 Warm Transfer, O03 Callback Arranged, O04 Follow-up Sent, O05 Booking Link Sent ...), 10 business results (B01 Reservation Created ... B06 Ancillary Booking, B07 Task Created, B08 Information Delivered) and 12 telemetry metrics. Screenshot at ref/emb-hotel-d.png.
- /inbound has a "Hotels & Hospitality" block. Its copy is about tables, covers, allergies and private dining, so it reads as restaurant copy under a hotel heading.
- Conclusion. Hotels is a live strategic direction for ExpoCall (Mews certification, the Professional plan "For hospitality", the draft schema), but there's no hotel trade page. That's why he's curious.

## 2. How the trade pages are built (plumber, dog groomer, lettings agent opened)

The Wix frame provides the header, the H1 and the footer. The body is an HTML embed on www-expocall-ai.filesusr.com (plumber a5ba93_d3d543d7..., dog groomer a5ba93_3a755b3e..., lettings a5ba93_4c5d41ec...). In headless Chromium the Wix iframe never painted (an AppWidget suspense fallback, which is our render, not their site), so I rendered the embeds directly with their real fonts loaded. Screenshots are ref/emb-plumber-d.png, emb-lettings-d.png, emb-dog-d.png and emb-plumber-m.png, and I looked at them.

Every trade page uses the same template.
1. Hero. A mono eyebrow pill with a pulsing teal dot ("FIRST TO ANSWER WINS THE JOB"), an 18px lede, a primary blue button (plumber "See how a 2am callout gets handled", which goes to https://app.expocall.ai/demo), a secondary outline button "Call 0800 11 26 486" (tel:+448001126486), and a small note.
2. A ring stat card. The orange ring animates to a number, "60 SECONDS" on plumber and "15 MINUTES" on lettings. Neither number is sourced on the page ("is roughly how long...").
3. "The scene", a paper band with an icon tile and a teal label, holding a one paragraph story.
4. "How it works / What happens when the phone rings", three numbered step cards.
5. "Built for [trade]", three feature cards with line icons.
6. An FAQ link line, "Have more questions? Read our AI Receptionist FAQs for plumbers" (to /faq).
7. A dark compliance strip with badges for TPS / CTPS, PECR, UK GDPR and 24/7/365 inbound.
8. A centred CTA, "Book a demo" (app.expocall.ai/demo) plus the call button.

**No trade page has an audio sample, a transcript or a demo call.** The embeds contain 0 audio and 0 video elements. The only "Listen to a call" player is on the homepage hero. This is the gap the 3 Oct nudge named, and the hotel page fills it.

Design tokens (from the embed CSS and computed styles):
- Colours. `--blue #0d47a1`, `--teal #0095a8`, `--ink #0a1628`, `--ink-soft #3d4a5c`, `--paper #f5f8fa`, `--line #e1e8ed`, `--amber #ff7a30`, dot `#00C2A8`, and the dark strip `#0a1628`. The homepage navy is `rgb(13,27,62)`.
- Type. DM Sans 400/600/700 (Google Fonts) and JetBrains Mono 500 for eyebrows and the live call UI. The H1 is 44 to 45px/700, H2 30px/700.
- Radii are 10px on buttons, 14 to 20px on cards, and pills on the eyebrow and badges.
- The homepage hero has a mock "ACTIVE INBOUND CALL · LIVE" card with a caller, an "INTENT DETECTED · BOOKING APPOINTMENT" line and calendar slots. This is ExpoCall's own visual language for a call, and I reused it for the call player.
- Logo. The ExpoCall wordmark from static.wixstatic.com (a5ba93_3342ba05...), fetched as PNG 354x170 and embedded.

## 3. ExpoCall product facts the hotel page may state (only what their site says)

| Fact | Source |
|---|---|
| "human-sounding inbound receptionists ... for UK businesses across hospitality and beyond. Configured in hours, natively integrated with your live calendars, CRM, and PMS" | www.expocall.ai homepage |
| "we've just completed technical certification with Mews, with hotel rollout starting shortly" | homepage and /integrations |
| Mews is listed as "Hospitality PMS, Launching shortly" | /integrations embed |
| Homepage also says "The first UK AI voice provider integrated natively with Mews" and "Native Mews Integration" | homepage. **This conflicts with "Launching shortly"**, so the page uses the cautious wording |
| Native calendar sync with Google Calendar, Cal.com and Calendly (Live). Resend email follow ups (Live). Twilio SMS follow ups (Live). HubSpot via Make.com (Live) | /integrations |
| AI Front Desk Agent, "Where the number's available, it captures it, looks the caller up in your CRM or database ... Once the call ends, it writes everything back into the CRM" | /inbound embed |
| Escalation, "escalates complex enquiries to human staff" | /inbound embed |
| Professional £449 a month, "For hospitality, lettings and professional services", 600 inbound calls, four concurrent calls, CRM / PMS / Database Integration (e.g. HubSpot, Mews etc)*, call summaries and transcripts, SMS to the customer's mobile, email notifications, 20+ voices, 42+ languages | /pricing-plans/list (rendered) |
| Starter has a 14 day free trial. The other plans show "Buy Now" | /pricing-plans/list |
| Demo app, "Hear Alex call you right now and drop a meeting invite into your diary in less than a minute"; multilingual demo "in 42 languages" | https://app.expocall.ai/demo |
| "Book a System Walkthrough" goes to a Google Calendar appointment schedule (calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ2djf0...) | homepage |
| Phone 0800 11 26 486 (tel:+448001126486), hello@expocall.ai | trade page embeds and footer |
| Outbound stays within TPS/CTPS and PECR and runs Monday to Friday 9am to 6pm. Inbound answers 24/7/365 | trade page compliance strip |
| ExpoCall Ltd, 167 to 169 Great Portland Street, London W1W 5PF, company number 17143632 | footer |

## 4. Hotel call reality

**The call types come from ExpoCall's own draft hotel schema** (section 1), which is primary evidence of what they've modelled. The four call types Raka named sit directly in it. Late arrival is I02 Existing Reservation, availability and rate is I05 Room Availability, a dog friendly room is I04 Hotel Information (their example column literally says "Parking, Wi-Fi, pets, check-in/out"), and a restaurant table is I08 Restaurant / Spa / Leisure.

**Statistics. None used.** I searched for UK missed call and OTA commission data. What came back was vendor blogs (motel4, hellohotel, loquia, coirconsulting, agentzap and similar) quoting each other with no primary study. The UKHospitality "almost 40% of guests prefer to book by phone" line appears only in a converse360 promoted article in The Caterer (2 Oct 2026), and I couldn't find the UKHospitality original. Booking.com's own commission help page (partner.booking.com) returned 403 to WebFetch. The search snippet says commission "varies by country". By the brief's rule, if there's no credible stat, there's no stat. The ring card carries ExpoCall's own fact, 42 languages, instead.

## 5. Concept and build decisions

- **Concept.** A night at a small hotel's front desk, where the visitor listens in on the calls. The page is a trade page in ExpoCall's exact template, but its centre is a call you can sit through. You pick a call type, the transcript plays turn by turn in ExpoCall's own "ACTIVE INBOUND CALL · LIVE" card, and it closes with the call log written in ExpoCall's own schema codes (I05, O05, B04). The vocabulary for the call log comes from their work, not ours.
- **Inherited.** Every colour, the type, the eyebrow, the ring card, the scene band, the step and feature cards, the compliance strip, the CTA hrefs and the logo. It has to slot into their menu, so a redesign would be the wrong job.
- **Better than the existing trade pages.** It has an actual call, four guest scenarios, the outcome logged, a Mews block in their own words, and the plan built for hospitality named. Their stat ring is unsourced, so this one uses a product fact.
- **Fictional hotel.** "Quillmarsh House". A search for "Quillmarsh" hotel found no property. ("Fernside House" was rejected because The Fernside is a real Sandown guest house.) The agent is called Alex, which is ExpoCall's own demo persona on app.expocall.ai/demo.
- **Labelling.** Each call card carries an "Example call" chip and a footer line says the calls are written examples for a fictional hotel, not recordings. This follows the brief. Spec I14 prefers one footnote, but the brief explicitly asked for labelled examples, and ExpoCall itself titles its own page "Example Hotel Portal Call Scoring".
- **No prices or rates in the calls.** The availability call ends with the booking link texted (O05). The agent doesn't quote a number.
- **Mews.** Stated as "certification complete, hotel rollout starting shortly". The example calls only show things marked Live on /integrations (calendar booking, SMS and email follow up), plus answers from the knowledge base and a hand off to staff.
