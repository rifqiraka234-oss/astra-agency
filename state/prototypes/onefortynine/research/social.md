# OneFortyNine Games, social and web presence

Researched 2026-11-01. Rule followed, every URL below came out of their own HTML or a fetched page, none was guessed.

## Social links in their own HTML

One, on every page, in the header and the footer, `https://www.linkedin.com/company/onefortynine-games` (an icon,
no text). Grepped the raw HTML of all 13 site URLs for instagram, facebook, tiktok, youtube, vimeo, x.com, twitter,
pinterest, wa.me. Nothing except the LinkedIn link (the words facebook and tiktok appear only in `robots.txt` as
crawler names). The LinkedIn hit is the positive control for that grep.

## LinkedIn company page, https://www.linkedin.com/company/onefortynine-games

`node tools/social-audit.js --urls https://www.linkedin.com/company/onefortynine-games` read it, **46 followers**.
Full page then fetched with `python3 tools/fetch-walled.py` (HTTP 200 as Chrome, 244,527 bytes, title
"OneFortyNine Games | LinkedIn"). The signed out view shows the About box and ten posts.

About box, verbatim,

```text
Escape room puzzles + locked cool boxes. Crack the code. Unlock the fun. Breakout Box.
Follow
View all 2 employees
Report this company
About us
We're OneFortyNine Games - and we're about to flip the script on group experiences.
Think escape room meets unboxing. A locked cool box. Real puzzles. Real stakes - because the snacks, drinks and treates inside only open when you crack the codes.
No screens, no VR headsets. Just face-to-face teamwork, tension, and that "yes we did it" moment as each lock clicks open.
Breakout Box is modular, replayable and built for maximum payoff with minimum setup. The game does the work. The reaction does the marketing.
We're in final testing now. Launch is loading.
Follow 1FORTY9 Games to be first in line when Breakout Box drops
Website
www.onefortyninegames.com
External link for OneFortyNine Games
Industry
Events Services
Company size
1 employee
Headquarters
Swindon
Type
Privately Held
Founded
2026
Specialties
Escape Room Games, Interactive Experiences, Locked Puzzle Boxes, Breakout Box, Group Activities, Team Building, Hospitality Experiences, Gamified Unboxing, Puzzle Design, Experiential Products, Pre-Launch Product, and Physical Games
Employees at OneFortyNine Games
Owen Warne
See all employees
Locations
Primary
Swindon, GB
```

The About still says "final testing" and "Pre-Launch Product" though first orders shipped on 7 Sep. Cover image is
`media/li-company-cover.jpg`, avatar `media/li-company-logo.jpg`.

### The two posts that matter most for us

- **29 Sep, the company reshared Owen's own post** asking for a new website ("Web designers and SEO pros, come at
  me!"), with "We are indeed looking to rebuild our website". Owen later edited his post to say he has had enough
  outreach and is "not looking to engage with anyone else". He still said yes to Raka's sketch on 1 Nov (per the
  queue row), so the bar is a sketch that beats the calls he already booked.
- **23 Sep**, a national holiday park over the October Bank Holiday and negotiations with a leadership training
  organisation, both unnamed. This is the only traction on record, and neither can be named on a page.

### Every post, newest first, text verbatim (dates and likes from the page's own JSON-LD)

### 2026-09-29, 0 likes

https://www.linkedin.com/posts/onefortynine-games_we-are-indeed-looking-to-rebuild-our-website-activity-7510685162200936448-KPQs

Media, Owen Warne's avatar only

```text
We are indeed looking to rebuild our website, but it looks like the bosses post has got it covered....
Owen Warne
** Thanks for all the genuine outreach I've had about this post, but it's time to stop. I've booked calls with a number of people and in discussions with a few others. I'm not looking to engage with anyone else. Thanks **
Web designers and SEO pros, come at me!
I'm looking for options for a new website for OneFortyNine Games so I'm keen to chat to people either in my network or that people in my network can refer me to.
It's not going to be a huge website, but it will need room to grow in the future.
Thanks in advance!
```

### 2026-09-23, 3 likes

https://www.linkedin.com/posts/onefortynine-games_we-are-thrilled-to-announce-that-we-will-activity-7508486138106511360-8yhZ

Media, media/li-2026-09-23-holiday-park-post.jpg (stock party photo, not usable)

```text
We are thrilled to announce that we will be seeing Breakout Box in a national holiday park site over the October Bank Holiday.
This is huge news for us and shows the trust being shown in us and our product by a huge organisation.
On the same day, we started negotiations with a large Leadership Training organisation about buying Breakout Box.
We always believed there was a whole breadth of applications for Breakout Box and we're now seeing that in our discussions.
Things are moving at pace as we rocket towards Land, Leisure and Tourism Show in November.
Get in touch if you want to find out more about Breakout Box.
```

### 2026-09-07, 0 likes

https://www.linkedin.com/posts/onefortynine-games_we-shipped-out-our-first-orders-today-and-activity-7502760420491915264-y3Y0

Media, media/li-2026-09-07-first-orders-video-720p.mp4 (12.8s), poster, and three stills li-2026-09-07-video-still-*.png (real product)

```text
We shipped out our first orders today and we're delighted to introduce The Heist: our first escape room game.
Breakout Box is great fun for couples, groups, families or even pitting team against team.
If you're looking for something new to add to your guest experience, or games to add to your events or team building, get in touch.
```

### 2026-09-06, 0 likes

https://www.linkedin.com/posts/onefortynine-games_activity-7502277865040699392-CGbN

Media, media/li-2026-09-06-untitled-video-720p.mp4 (22.2s, countdown template then the open aluminium case), poster

```text
(no text, video only)
```

### 2026-08-31, 0 likes

https://www.linkedin.com/posts/onefortynine-games_breakoutbox-guestexperience-escaperoom-activity-7500290904705097730-ToXZ

Media, media/li-2026-08-31-boxes-packed-1.jpg and -2.jpg (real product, strong)

```text
We're getting a couple of boxes packed up ready to be shipped out to a customer.
If you'd like to find out more about adding a portable escape room to your guest offering, then get in touch or comment below.
#BreakoutBox #GuestExperience #EscapeRoom
```

### 2026-08-11, 0 likes

https://www.linkedin.com/posts/onefortynine-games_breakoutbox-holidayparks-hospitality-activity-7492961826062659584-XF-h

Media, media/li-2026-08-11-we-built-a-box.jpg (the full Breakout Box 149 logo)

```text
Everyone's building AI. We built a box!
Doom-scrolling off. People on.
That's Breakout Box.
In a world of VR headsets, AI games and endless scrolling, we've built something different:
An escape room that fits in a box (and is full of tasty goodies!)
No digital. No AI. No staff needed to run it.
Just real puzzles, real teamwork, real laughter.
Venues will see longer stays, higher average spend. Families will actually spend time together working as a team.
We believe connection doesn't happen through screens or headsets.
It happens across the table, solving puzzles, opening locks.
If you're running a venue looking for new experiences for your guests, new ways to increase dwell time or increase spend, DM us or comment below DEMO and we'll set up a call.
#BreakoutBox #HolidayParks #Hospitality
```

### 2026-08-05, 0 likes

https://www.linkedin.com/posts/onefortynine-games_one-of-the-biggest-challenges-weve-faced-activity-7490696522460819456-3M33

Media, none

```text
One of the biggest challenges we've faced creating Breakout Box is making sure the puzzles are reusable and survive repeated use.
We played a number of 'escape games' and tested the materials. They all felt and looked great, but would they stand up to repeated use, the potential for drink spillages and people not always remembering that they need to be used again? Nope!
So we have worked hard on putting together three options for all our customers. Each option provides a solution and we believe each customer will be happy with at least one of them.
A benefit of being the flexible start-up we are though, is we are always open to discussions about what does or doesn't work, and we can't wait to get valuable feedback from a customer trial in September.
Breakout Box is the ideal guest experience for your business. No real staffing requirements, creates fun memories for your guests, and YOU control the margins.
Get in touch now to find out more, discuss your options or order yours.
```

### 2026-07-25, 2 likes, 1 comment (the comment's text is not shown signed out; the count sits just after this post's `<article>` element)

https://www.linkedin.com/posts/onefortynine-games_we-cant-wait-to-see-breakout-box-being-put-activity-7486722940051492864-NyAx

Media, media/li-2026-07-25-owen-repost-1.jpg (OneFortyNine logo, slate blue) and the 149 logo (byte identical to li-2026-08-11-we-built-a-box.jpg, not saved twice), plus Owen Warne's avatar media/li-owen-warne-profile-photo.jpg

```text
We can't wait to see Breakout Box being put through its paces with a national park group, and then at Land Leisure & Tourism Show in November.
Owen Warne
What a week it's been.
As the summer holidays arrive with a bang, I've been busy making contact with and discussing Breakout Box with, a number of leisure industry professionals.
I've also been finalising the themes and ideas behind our first two Escape Games, and found a brilliant supplier (ASF Creative) for all our print needs.
They've been really helpful, especially as our requests aren't exactly run of the mill. The cherry on the top is they are local and a 10 min walk from my house!
With some very positive feedback and genuine next steps planned with a national holiday park, OneFortyNine Games is moving forward rapidly.
Lastly, we'll be showcasing Breakout Box at Land Leisure & Tourism Show in November as well, with a spot in the Startup Zone.
August is going to be exciting and very busy.
```

### 2026-07-10, 0 likes

https://www.linkedin.com/posts/onefortynine-games_breakoutbox-guestexperience-leisureindustry-activity-7481350300155600897-NuJs

Media, media/li-2026-07-10-coming-together-1.jpg (lid on stone wall and oak floor, strong) and -2.jpg (clear lock box close up, Lockabox mark legible)

```text
It's coming together.
Our escape room in a cool box is looking good.
Why not give your guests an opportunity to have fun, create some memories and crack the codes to unlock the snacks?
#BreakoutBox #GuestExperience #LeisureIndustry #Hospitality
```

### 2026-06-28, 0 likes

https://www.linkedin.com/posts/onefortynine-games_hospitality-leisure-guestexperience-activity-7476965344864145408-le5d

Media, media/li-2026-06-28-product-testing-1/2/3.jpg (a competitor's game, Escape Envelope "Disappearance at Blackridge", plus wine and ale bottles, not usable)

```text
Product testing over the weekend.
We worked through a game testing what we liked and what we think will work for our Breakout Box.
We're excited at the prospect of what's to come and the fun players will have.
Imagine the joy of cracking the code and then being able to open a bottle of wine or gourmet snacks with it.
Taking escape rooms to a whole new level.
If you want to add this to your guest experience get in touch to discuss a trial.
#Hospitality #Leisure #GuestExperience #ValueAdd
```

## Owen Warne's personal LinkedIn

Not opened. The `tools/social-audit.js` header records that a personal /in/ profile returns 999 to curl and our Chromium (tested 2026-09-21); not retried here. His own
posts are visible only where the company page reshared them (29 Sep and 25 Jul above). His avatar is saved as
`media/li-owen-warne-profile-photo.jpg`, not verified as him by `tools/verify_portraits.py`, do not use beside his name.

## Searches run for anything else genuinely theirs (all 2026-11-01)

| Query | Result |
|---|---|
| `"Breakout Box" "OneFortyNine"` | Nothing of theirs. Breakout EDU, library breakout boxes, a TradingView script |
| `"Owen Warne" escape room` | Nothing. Other Owens (Owen Wenner, Owen Spear) |
| `"OneFortyNine Games"` | Nothing. Unrelated studios (OneOone, OneNine) |
| `"Breakout Box" escape room cool box holiday lets` | Nothing of theirs |
| `onefortyninegames instagram OR facebook OR tiktok OR youtube` | Nothing |
| `Land Leisure Tourism Show 2026 exhibitors Breakout Box startup zone` | No public exhibitor list naming them. Show confirmed NEC Birmingham 4 to 5 Nov 2026, with a Start Up Hub |
| `"ONEFORTYNINE GAMES LTD" Companies House` | The Companies House record, opened, see below |
| `"Breakout Box" "The Heist" escape room cool box` | Nothing of theirs. Other "Heist" escape games |

So no Instagram, TikTok, YouTube, Facebook, Etsy, Amazon, press or review page was found that is theirs. That is
"not found by search", not proof none exists. No handle was guessed and probed, by the repo rule.

## Statutory record

https://find-and-update.company-information.service.gov.uk/company/17293756 and `/officers`, fetched 2026-11-01.
ONEFORTYNINE GAMES LTD, 17293756, Active, private limited, incorporated 22 June 2026, registered office 149 High
Street, Swindon, United Kingdom, SN4 7AB, SIC 62011 (ready made interactive leisure and entertainment software
development). One officer, WARNE, Owen Peter, director, appointed 22 June 2026, identity verified. First accounts
due 22 March 2028.

## Trade show

The home page banner and the 25 Jul post put them at the Land Leisure & Tourism Show, NEC Birmingham, 4 to 5 November
2026, stand LLT155, in the Startup Zone. `https://www.lltshow.com/join-us` returns 200. That is three days after this
research.

## Usable media from social, ranked

1. `li-2026-08-11-we-built-a-box.jpg`, the full Breakout Box logo with the 149 lock, 1200x1200.
2. `li-2026-07-10-coming-together-1.jpg`, real lid with logo label on oak floor against a stone wall, 800x781.
3. `li-2026-08-31-boxes-packed-1.jpg`, the real box open with every locked container, 1152x1536 (crop the Lockabox embossing).
4. `li-2026-08-31-boxes-packed-2.jpg`, branded cups and bottle locks in the case, 1152x1536.
5. `li-2026-09-07-video-still-case-12s.png`, The Heist card and cups, 720x960, legible premise.
6. `li-2026-07-10-coming-together-2.jpg`, clear lock box close up, 1152x1536, Lockabox mark must be cropped.
7. `li-2026-09-07-video-still-lid-8s.png` and `-interior-10s.png`, real set up, small and soft.

Not usable, the 23 Sep stock party photo, the three 28 Jun photos (a competitor's game, wine and ale labels), both
video posters, and Owen's avatar.
