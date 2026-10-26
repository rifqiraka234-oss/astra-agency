# BWILD, handover (26 Oct 2026)

Lupo Benatti, founder of BWILD OÜ (ctc_rX4RpJcZ5AqviHsiN, Geneva, Senior Brand Manager at P&G next to it), said "yes
thanks, would love to see your vision and expected cost :)" at 10.24 UTC to the 24 Oct SKETCH offering "one more
professional BWILD site that sells the Adventure Vest and runs the Luminous Vest launch, reservations and Kickstarter
countdown in the same place". Raka, "lupo benatti says he wants to see something. lets do it. dont repeat wrong
mistakes". Built the same day to the Saavedra v3 recipe and the Fae Club v3 route rules, RULES section 5.

## Live

| What | URL | Deploy |
|---|---|---|
| The prototype | https://astra-bwild-prototype.netlify.app/ | 6adf46e13672e2db375d117d, project 6e68720e-5abf-4ee1-a1da-1cae385a12c9 |
| The plan, with the cost | https://astra-bwild-plan.netlify.app/ | 6adf46f48d591fb2f8e6e021, project 875920d4-f1d2-4222-8696-1a2900cdb3c0 |

Team SSO switched off on both before the first deploy. Both noindex (meta, X-Robots-Tag live, robots.txt). Hashed live
file by file, 85 of 85 and 38 of 38. bwild-func 16 of 16 and plan-func 7 of 7 live. 13 of 13 images and 8 of 8 films
decode live, 0 HTTP errors. axe clean at twelve points on each (two motion settings, two widths, three scroll points).
Lighthouse, prototype 96 mobile and 100 desktop performance, plan 99 and 100, accessibility 100 on all four.

## The idea

Their own Instagram question, "Sunrise or night?", is the first input. The answer sets a run time over the real sky in
the runner's city at that minute, worked out from the sun's position. Scroll and headlights come up a dark road behind a
runner, and their logo's three slashes and the reflective panel flare at 140 m, the BFU's distance for reflective material
in dipped headlights, with the TCS's 112 m stopping distance at 80 km/h on a wet road marked. A year of daylight for
their city counts how many of their runs start in the dark, a chart they drag. The reservation arrives with their run on
it, and paying the €1 prints a race bib with their number, run and city. The Adventure Vest sells in the same site at
€98. One run is carried down the page, and the hero, chart, bar, form and bib all read it.

The plan has nine chapters. Today's three places (their site, the presale page, Kickstarter's coming soon page), the route
to the €1 (a control, from the bar, from the KICKSTARTER tab, the new site), the dark year (a control, city and time),
LaunchBoom's own 30 times claim for $1 reservations, the build in screenshots from the final prototype, what runs
underneath, the cost, six weeks to launch ready, and the team.

## For Raka before anything is sent

1. **The price is his call.** The plan proposes €2,500 for the whole site, half to start and half when it's live, and €900
   for the launch page alone. Change it in build-plan/data/plan.json (cost.price, cost.h, cost.small_h), run plan.py, and
   redeploy the plan with the npx command from Netlify's deploy-site. plan-func checks the halves add up to the heading.
2. **Budget is weak** (RULES 0G, docs/gtm-plan.md section 4). One sign, LaunchKit by LaunchBoom runs the presale page, a
   paid tool. Against it, share capital of 1 euro, the 2025 accounts not filed, three people on LinkedIn, a side business.
   Raka asked for the build by name, so it's built, and the delivery asks for the call with two slots.
3. **The countdown's date is an example**, 1 February 2027, labelled on the page. No launch date is published anywhere we
   could read.
4. **The €1 refund terms are LaunchKit's and weren't read**, so neither site states them.
5. **A correction to our own research.** The first pass wrote "no Kickstarter page found". There is one, a prelaunch page
   "Coming soon: BWILD Luminous Vest, Be Visible at Night", linked from their own SAVE THE DATE button. Our 24 Oct opener
   said "Your Kickstarter page says save the date, but there's no date on it", meaning their KICKSTARTER tab page, which
   is still true. Nothing in either site says there's no Kickstarter page.
6. **Their site does link to the presale**, from the bar at the top ("THE NEW LUMINOUS VEST IS COMING /// LEARN MORE",
   new tab). The plan says so. Never write that it doesn't.
7. **Their Adventure Vest page answers 404 to Chromium here and 200 to curl.** Ours, proven with render-via-curl. Never say
   their shop is broken.

## Sources

- Prototype data, build/data/site.json. Plan data, build-plan/data/plan.json. Every fact and quote with its URL,
  research/facts.md, the last section is the recheck made for the plan.
- The four lines, the flow table and what we don't claim, research/flow.md. Art direction, research/art-direction.md.
- Photos and films, all theirs, from bwildoutdoors.com and the presale page. Originals in the session scratchpad only,
  the build keeps cut copies in build/media. Fonts Mona Sans and Fragment Mono, OFL, licences in build/fonts.
- Today's screenshots for the plan, build-plan/today (26 Oct). The presale page was fetched through curl_cffi with its 25
  assets and rendered offline, the Adventure Vest page through tools/render-via-curl.js.

## QA, how to rerun

    cd state/prototypes/bwild/build && python3 build.py          # writes ../site
    cd ../build-plan && python3 plan.py                          # writes ../site-plan
    node qa/bwild-func.js <prototype url> [plant]                # 16 checks, plant mode must fail 15
    node qa/plan-func.js <plan url> [plant]                      # 7 checks, plant mode must fail 6
    node qa/axe-bwild.js <url>; node qa/bwild-copy.js <url> [plan]; node qa/walk.js <prototype url>
    python3 qa/livehash.py site <url>; python3 qa/livehash.py site-plan <url>

## The delivery

state/drafted_2026-10-26-lupo-delivery.md, DELIVERY, check-drafts PASS, dry run sha256 aa551adb35066b9b. Not sent. It
offers Wednesday 28 or Thursday 29 at 6pm Geneva time, both free in Raka's calendar on 26 Oct 12.30 UTC.
