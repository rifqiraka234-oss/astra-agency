/* Everything Astra could build for Breakout Box, each idea traced to the 3 Nov call or the research on his site and market.
   when, built (in the site now), next (our pick next), later. see, a section id or page in the preview to jump to. */
window.CATALOGUE = {
  cats: [
    { id: 'venues', name: 'Pages for each buyer' },
    { id: 'selling', name: 'Tools that sell for you' },
    { id: 'proof', name: 'Proof and trust' },
    { id: 'games', name: 'Games and products' },
    { id: 'guests', name: 'For the players' },
    { id: 'portal', name: 'Your customers’ account' },
    { id: 'ops', name: 'Tools that give you time back' },
    { id: 'growth', name: 'Getting found and growing' },
    { id: 'brand', name: 'Brand and look' }
  ],
  goals: [
    { id: 'enquiries', name: 'More enquiries' },
    { id: 'trust', name: 'Look established' },
    { id: 'time', name: 'Save your time' },
    { id: 'repeat', name: 'Bring people back' },
    { id: 'growth', name: 'Grow next year' }
  ],
  items: [
    /* pages for each buyer */
    { id: 'p-parks', c: 'venues', n: 'Holiday parks page', w: 'On site rental, games every day, drinks and food packages around it, the park numbers and questions.', y: 'Your biggest buyers, and the way they told you they’d use it.', g: ['enquiries'], when: 'next', pick: true },
    { id: 'p-pubs', c: 'venues', n: 'Pubs and bars page', w: 'Quiet nights, quiz nights, teams staying for another round, with a pub calculator.', y: '“How do I get more people in the door?”', g: ['enquiries'], when: 'next', pick: true },
    { id: 'p-cafes', c: 'venues', n: 'Cafés and restaurants page', w: 'Fill the quiet mornings and the gap after lunch, coffee mornings, a game and cake deal.', y: '“Always looking for new ways to generate some more footfall and some more revenue.”', g: ['enquiries'], when: 'next' },
    { id: 'p-training', c: 'venues', n: 'Leadership training page', w: 'The box as a way to watch leadership happen, six puzzles in any order, team against team.', y: '“Watch them put their leadership training into practice.”', g: ['enquiries'], when: 'next' },
    { id: 'p-teamdays', c: 'venues', n: 'Team days and company events page', w: 'Away days, office parties and conferences, timed games and competitions.', y: 'Your Breakout Box page already names team building and events.', g: ['enquiries'], when: 'later' },
    { id: 'p-lets', c: 'venues', n: 'Holiday lets and lodges page', w: 'A premium extra on the stay, filled with local treats, hire it or include it.', y: 'Hosts with a few cottages, lodges or pods.', g: ['enquiries'], when: 'later' },
    { id: 'p-glamping', c: 'venues', n: 'Glamping and campsites page', w: 'A rainy evening sorted, one box shared across pitches from reception.', y: 'Outdoor sites need a plan for bad weather.', g: ['enquiries'], when: 'later' },
    { id: 'p-attractions', c: 'venues', n: 'Attractions and visitor trails page', w: 'Puzzles that sit inside a trail or a visitor day out.', y: 'You told us about a trail project at the show.', g: ['enquiries', 'growth'], when: 'later' },
    { id: 'p-family', c: 'venues', n: 'Family venues and kids’ parties page', w: 'Soft play, party venues and family days, ready for the kids’ version.', y: '“We’re now looking at a kid’s version.”', g: ['growth'], when: 'later' },

    /* tools that sell for you */
    { id: 's-crack', c: 'selling', n: 'Crack the box', w: 'Visitors open your box with 1 4 9 and see what’s inside for their venue.', y: 'The site has to be “that amazing” before you ever talk to them.', g: ['enquiries'], when: 'built', see: 'crack' },
    { id: 's-calc', c: 'selling', n: 'Earnings calculator', w: 'Games a week, price, extras, rent or own, with a chart they can drag.', y: '“A really easy calculator.”', g: ['enquiries'], when: 'built', see: 'numbers' },
    { id: 's-proposal', c: 'selling', n: 'Proposal they can forward', w: 'A one page proposal from their own numbers, print, PDF or a link.', y: 'If they like it, “they’ll badger the boss about it”.', g: ['enquiries'], when: 'built', see: 'proposal' },
    { id: 's-catch', c: 'selling', n: 'What’s the catch', w: 'Space, staff, cost, damage, coming back and digital, answered before they ask.', y: '“Tick off some of those objections.”', g: ['enquiries', 'trust'], when: 'built', see: 'catch' },
    { id: 's-form', c: 'selling', n: 'Two speed enquiry form', w: 'One to ten boxes, or a group of sites, arriving with their numbers filled in.', y: '“Fill in a contact form, come straight through to me.”', g: ['enquiries', 'time'], when: 'built', see: 'get' },
    { id: 's-group', c: 'selling', n: 'Group quote builder', w: 'Sites, boxes per site and games, a quote a head office can sign off.', y: 'Five boxes in every park means hundreds of units, a different conversation.', g: ['enquiries', 'growth'], when: 'next', pick: true },
    { id: 's-onepager', c: 'selling', n: 'Send it to your boss sheet', w: 'A one page PDF summary of their venue and numbers, branded and ready to forward.', y: 'The decider often never met you.', g: ['enquiries'], when: 'next' },
    { id: 's-vr', c: 'selling', n: 'Breakout Box against digital and VR', w: 'A side by side of cost, staff, space and what guests remember.', y: '“Our cost of entry is much lower.”', g: ['enquiries', 'trust'], when: 'later' },
    { id: 's-call', c: 'selling', n: 'Book a call into your diary', w: 'Live slots from your calendar, for when you’re out of your other business.', y: '“As soon as I get away from that ... book a call straight in my diary.”', g: ['enquiries', 'time'], when: 'later' },
    { id: 's-autoreply', c: 'selling', n: 'Instant reply with their proposal', w: 'Every enquiry gets an email straight back with their numbers and what happens next.', y: 'Nobody waits while you’re at your other job.', g: ['enquiries', 'time'], when: 'next' },
    { id: 's-assistant', c: 'selling', n: 'An assistant that answers venue questions', w: 'Answers on the site and by email from your own facts, day and night, and hands warm leads to you.', y: 'You can’t take every call yet.', g: ['time', 'enquiries'], when: 'later' },

    /* proof and trust */
    { id: 't-stories', c: 'proof', n: 'Customer stories', w: 'Your first venues in their own words, with their numbers, so the next ones can see it works.', y: '“Really good feedback and testimonials ... the rest of them are easy.”', g: ['trust', 'enquiries'], when: 'next', pick: true },
    { id: 't-trial', c: 'proof', n: 'Trial results page', w: 'Games played, what guests paid, staff time, from the first season.', y: 'Real numbers beat our estimates in the calculator.', g: ['trust'], when: 'later' },
    { id: 't-film', c: 'proof', n: 'Film of people playing', w: 'A short shoot of real tables cracking the codes, to replace the stock film.', y: '“The reaction does the marketing.”', g: ['trust', 'enquiries'], when: 'next', pick: true },
    { id: 't-photos', c: 'proof', n: 'Product photo shoot', w: 'The box, every prop and the flat lay, lit properly, for the site and LinkedIn.', y: 'The site runs on phone photos today.', g: ['trust'], when: 'next' },
    { id: 't-about', c: 'proof', n: 'About OneFortyNine and you', w: 'The story of the company and the person behind it, with your photo.', y: '“We look good, we look professional, we look organised.”', g: ['trust'], when: 'next' },
    { id: 't-wall', c: 'proof', n: 'Where you can play it', w: 'A map or list of venues with Breakout Box, once they say yes to being named.', y: 'Social proof for the next venue down the road.', g: ['trust', 'growth'], when: 'later' },
    { id: 't-press', c: 'proof', n: 'News and shows', w: 'Trade shows, press and awards in one place.', y: 'You exhibited at the Land Leisure and Tourism Show.', g: ['trust'], when: 'later' },

    /* games and products */
    { id: 'g-library', c: 'games', n: 'Games library page', w: 'Every game with its story, difficulty, players and time, growing with each release.', y: '“A library of games ... so there’s no customer drop off.”', g: ['repeat', 'growth'], when: 'next', pick: true },
    { id: 'g-heist', c: 'games', n: 'A page for The Heist', w: 'The briefing, the six puzzles named, a trailer and a poster venues can print.', y: 'Your first game deserves its own page.', g: ['repeat', 'enquiries'], when: 'next' },
    { id: 'g-seasonal', c: 'games', n: 'Seasonal editions', w: 'Christmas, Easter and Halloween games with their own pages and launch dates.', y: '“We also want seasonal games, so Christmas, Easter, Halloween.”', g: ['repeat', 'growth'], when: 'later' },
    { id: 'g-kids', c: 'games', n: 'Kids’ version', w: 'A product page and enquiry path for the family and kids’ party box.', y: '“We want to create like a kid’s version.”', g: ['growth'], when: 'later' },
    { id: 'g-hamper', c: 'games', n: 'Whodunit hamper', w: 'A premium product page for Airbnbs and premium lodges.', y: '“A whodunit hamper idea that might work for Airbnbs.”', g: ['growth'], when: 'later' },
    { id: 'g-waitlist', c: 'games', n: 'New game waitlist', w: 'Venues sign up to hear first when the next game drops.', y: 'Every launch becomes a reason to get back in touch.', g: ['repeat'], when: 'later' },
    { id: 'g-360', c: 'games', n: 'The box in 3D', w: 'Spin the box and open it, from a turntable film of the real thing.', y: 'Lets a buyer see the product without a visit.', g: ['enquiries', 'trust'], when: 'later' },

    /* for the players */
    { id: 'u-hints', c: 'guests', n: 'Hidden hints by QR code', w: 'One hint at a time, then the walkthrough, then the answer, for every game.', y: '“Well hidden so that only the QR code takes you there.”', g: ['repeat'], when: 'built', see: 'hints' },
    { id: 'u-cracked', c: 'guests', n: 'We cracked it card', w: 'A finish screen with the venue’s name and time, made to share.', y: '“The reaction does the marketing.”', g: ['repeat', 'growth'], when: 'next', pick: true },
    { id: 'u-leader', c: 'guests', n: 'Leaderboard for each venue', w: 'The fastest teams at a venue, so regulars come back to beat them.', y: 'You want customers coming “back time and time again”.', g: ['repeat'], when: 'later' },
    { id: 'u-feedback', c: 'guests', n: 'After the game feedback', w: 'Two taps after the code, sent to the venue and to you.', y: 'Testimonials and fixes, without asking anyone.', g: ['trust', 'repeat'], when: 'later' },
    { id: 'u-booking', c: 'guests', n: 'Booking page for each venue', w: 'A page a venue can use to take bookings for a game, in their name.', y: 'Guests book directly with the venue, so make it easy for them.', g: ['repeat', 'enquiries'], when: 'later' },
    { id: 'u-kit', c: 'guests', n: 'Venue marketing kit', w: 'Posters, table cards and social posts each venue can print or post.', y: 'You already offer product and marketing support.', g: ['repeat', 'growth'], when: 'next' },

    /* your customers' account */
    { id: 'a-reorder', c: 'portal', n: 'Log in to reorder', w: 'Venues reorder boxes and supplies without an email.', y: '“Just be able to go onto our website, log in, and order more boxes.”', g: ['time', 'growth'], when: 'later' },
    { id: 'a-checkout', c: 'portal', n: 'Buy online', w: 'Pay for a box online with card, for the quick and easy ones.', y: '“That looks a really good idea ... let’s go for it.”', g: ['enquiries', 'time'], when: 'later' },
    { id: 'a-rental', c: 'portal', n: 'Rental by subscription', w: 'The £60 a month rental set up as a monthly payment that runs itself.', y: 'No invoices to chase every month.', g: ['time'], when: 'later' },
    { id: 'a-supplies', c: 'portal', n: 'Supplies shop', w: 'Cups, notepads, pencils and refills, ordered when they run low.', y: 'Extra supplies are already part of your offer.', g: ['time', 'repeat'], when: 'later' },
    { id: 'a-training', c: 'portal', n: 'Training videos', w: 'The setup and hosting guide as short films a new staff member can watch.', y: 'Your 30 minute training, available any time.', g: ['time'], when: 'later' },
    { id: 'a-dashboard', c: 'portal', n: 'Dashboard for park groups', w: 'Boxes per site, games played and orders, for a head office.', y: 'Big groups want to see it working across sites.', g: ['growth', 'trust'], when: 'later' },
    { id: 'a-repair', c: 'portal', n: 'Report a problem', w: 'A quick form for a broken lock or a missing piece, with a photo.', y: 'Answers the damage question before it’s asked.', g: ['trust', 'time'], when: 'later' },

    /* tools that give you time back */
    { id: 'o-crm', c: 'ops', n: 'Lead tracker', w: 'Every enquiry, LinkedIn chat and email in one place, with the next step for each.', y: 'You’re running this next to another business.', g: ['time'], when: 'next', pick: true },
    { id: 'o-follow', c: 'ops', n: 'Automatic follow ups', w: 'Gentle reminders to leads that went quiet, sent for you.', y: 'More conversations than one person can chase.', g: ['time', 'enquiries'], when: 'next' },
    { id: 'o-quote', c: 'ops', n: 'Quote generator for you', w: 'Turn a call into a quote and proposal in a couple of minutes.', y: 'Big groups need paperwork, you need your evenings.', g: ['time'], when: 'later' },
    { id: 'o-stock', c: 'ops', n: 'Stock and dispatch tracker', w: 'Boxes in stock, on order, out on rent and due back.', y: '“We’re going to have to order in an awful lot more stock.”', g: ['time', 'growth'], when: 'later' },
    { id: 'o-billing', c: 'ops', n: 'Rental billing', w: 'Monthly rentals invoiced and chased automatically.', y: 'Every rental is a monthly payment to manage.', g: ['time'], when: 'later' },
    { id: 'o-show', c: 'ops', n: 'Trade show lead capture', w: 'Scan a badge or a card on your stand and the follow up starts that night.', y: 'Shows like the NEC fill a notebook in two days.', g: ['time', 'enquiries'], when: 'next' },
    { id: 'o-report', c: 'ops', n: 'Monthly numbers', w: 'Enquiries, proposals, boxes out and money in, on one page.', y: 'So you know when you can step out of your other business.', g: ['time', 'growth'], when: 'later' },

    /* getting found and growing */
    { id: 'm-outreach', c: 'growth', n: 'Outreach to parks, pubs and café groups', w: 'A steady run of researched messages to the right venues, done for you.', y: 'LinkedIn and email already work for you. This does more of it.', g: ['enquiries', 'time', 'growth'], when: 'next', pick: true },
    { id: 'm-seo', c: 'growth', n: 'Pages Google can find', w: 'Pages for what venues search, escape games for pubs, holiday park activities.', y: '“Next year I want people to be Googling it.”', g: ['growth', 'enquiries'], when: 'next' },
    { id: 'm-linkedin', c: 'growth', n: 'LinkedIn plan', w: 'A weekly post plan and refreshed company page, with your film and stories.', y: 'LinkedIn is where your leads come from today.', g: ['trust', 'enquiries'], when: 'next' },
    { id: 'm-newsletter', c: 'growth', n: 'Newsletter for venues', w: 'New games, seasonal editions and tips that sell more games.', y: 'Every new game is news for every venue.', g: ['repeat', 'growth'], when: 'later' },
    { id: 'm-referral', c: 'growth', n: 'Venue refers a venue', w: 'A reward when one venue brings you another.', y: '“Get a couple of them talking to each other and they’ll all want it.”', g: ['growth', 'enquiries'], when: 'later' },
    { id: 'm-ads', c: 'growth', n: 'Landing pages for ads', w: 'One page per audience, for LinkedIn or Google ads when you’re ready.', y: 'Paid reach without changing the main site.', g: ['enquiries'], when: 'later' },
    { id: 'm-report', c: 'growth', n: 'What a games box earns report', w: 'A yearly note with your trial numbers and the market, the thing trade press quotes.', y: 'Be the one with the numbers.', g: ['trust', 'growth'], when: 'later' },
    { id: 'm-awards', c: 'growth', n: 'Award entries', w: 'Entries for supplier categories at holiday park and hospitality awards.', y: 'Awards open doors with big groups.', g: ['trust', 'growth'], when: 'later' },
    { id: 'm-resell', c: 'growth', n: 'Partner and reseller page', w: 'For hospitality suppliers who could sell Breakout Box to their own customers.', y: 'Reach hundreds of venues through one partner.', g: ['growth'], when: 'later' },
    { id: 'm-showkit', c: 'growth', n: 'Trade show kit', w: 'Stand banner, flyer and a QR code straight to the calculator.', y: 'Your next show, ready before you book it.', g: ['enquiries', 'trust'], when: 'later' },

    /* brand and look */
    { id: 'b-sheet', c: 'brand', n: 'Brand sheet', w: 'Your colours, fonts, logo use and photo style on one page, from what you pick in this studio.', y: 'So everything you make looks like it came from one company.', g: ['trust'], when: 'next', pick: true },
    { id: 'b-name', c: 'brand', n: 'Name and trade mark check', w: 'Check Breakout Box and OneFortyNine are yours to keep and protect.', y: '“It’s a product that people can copy.”', g: ['trust', 'growth'], when: 'next', pick: true },
    { id: 'b-logo', c: 'brand', n: 'Logo system', w: 'Your 1 4 9 lock as the mark, with versions for the box, the site and social.', y: 'The lock is already on every cup and lid.', g: ['trust'], when: 'later' },
    { id: 'b-pack', c: 'brand', n: 'Packaging refresh', w: 'Lid label, strap, cups and cards at your next print run.', y: 'Uses up the stock you have first.', g: ['trust'], when: 'later' },
    { id: 'b-deck', c: 'brand', n: 'Sales deck for park groups', w: 'A short deck a buyer can take into their own meeting.', y: 'Big groups have “lots of people involved”.', g: ['enquiries', 'trust'], when: 'next' },
    { id: 'b-sheet2', c: 'brand', n: 'One page sales sheet', w: 'The offer, the numbers and the next step on one printed page.', y: 'For shows, meetings and attachments.', g: ['enquiries'], when: 'later' }
  ]
};
