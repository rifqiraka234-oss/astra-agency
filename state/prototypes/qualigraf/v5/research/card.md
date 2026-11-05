# Build card, Qualigraf UK v5. Filled 5 Nov 2026 before any code

Raka, 5 Nov, "Just do the best you can! With the info we have ... 3x check i want only the best output". Earlier the same day,
"rebuild the site first with the old palette", Qualigraf's own colours, no rebrand yet. The calls and research behind every line
are in `proposals/qualigraf/2026-11-05-*.md`.

## A. The visitor and the action

1. **Who lands, and what they're thinking, in order.**
   - **First, a Head of Democratic Services or Monitoring Officer** at a UK principal council, a year or more before a contract
     change (Steven, 4 Nov, "the year or so before they're about to consider changing supplier"). Their questions are, what is
     this, does it run our committee cycle the UK way, is it safe, who's behind it in the UK, and what happens if I ask.
   - **Second, a Democratic Services officer**, asked to look at it. Will it stop me chasing reports and publishing late?
   - **Third, Steven himself**, reading it as the CEO who has to put it in front of four country managers. Can this be one site
     for four countries? (6 Oct, "we'd likely need to do it 4 times".)
2. **The one action.** Book a walkthrough built around their own meeting. Selector `.act`. In the hero, in the pinned track
   panel, in the invitation, and in a phone bar.
3. **The flow table.** `research/flow.md`.
4. **The one state.** `{committee, meeting date}`. The hero writes it in a sentence. The 3D file's label, the track's dates,
   the invitation and the form all read it. The form arrives filled in with the meeting.
4b. **Pages and header.** Header on every page, Home, The decision track, Who it's for, Security, Group, Resources, the
    country switcher and Book a walkthrough. First look is the home only. Other links are placeholders until his go.

## B. The idea and the feeling

5. **The feeling.** Relief and control. Nothing late, nothing lost, and it's on the record. The hero shows the mess turning
   into order, the papers in the air he praised on 6 Oct ("the initial graphics with the meeting papers appearing to be in chaos").
6. **The idea, in their words.** "From idea to archive", Qualigraf's own UK homepage, read 4 Nov ("supports the legislative
   process from idea to archive"). Steven's own version, "from the first idea to publication and long-term archiving" (press release,
   20 Jan 2026). And the story he sells with, "the lifecycle of a decision" (4 Nov call). Another company could only use it if it
   also kept the whole life of a decision in one file. eScribe sells the meeting cycle, not the file. See the rebrand analysis.
7. **Their mark as the hero object.** The papers fold into one decision file, Qualigraf navy with a coral tab, the colours of
   their logo (`logo-uk.svg`, navy #2A3C5E, coral #FE764A), labelled with the visitor's own meeting.
8. **The signature moment.** The visitor's own meeting travels the eight stations, and every date is worked out from the law
   for that meeting, 28 clear days for a key decision notice (reg 9, SI 2012/2089), five clear days for the agenda pack (s100B LGA 1972),
   six years open to the public (s100C), four years for background papers (s100D). Read on legislation.gov.uk today. Clear days
   counted the cautious way, weekdays that aren't bank holidays, excluding the day of publication and the meeting day (R v Swansea CC
   ex p Elitestone 1993, via Local Government Lawyer and NALC's topic note, both read today). Bank holidays from GOV.UK's JSON, read today.
   Measured against the best product storytelling read today (Linear, Stripe, Attio show the product doing the job). None of the eight
   competitors measured today computes anything for the visitor.
9. **Is the art in this first build?** Yes. The 3D papers to file, the travelling file, a gradient that is time itself.

## C. The look

10. **Type.** Field faces read today, Granicus Sofia Pro, Diligent Plus Jakarta Sans, Notubiz Helvetica Neue, eScribe Poppins,
    Berger-Levrault Century Gothic, Qualigraf **Zenon** (computed style on their French homepage). A serif voice is set by the client's
    own brand, their serif wordmark and Zenon headings. Zenon is in their Adobe Fonts kit, locked to their domain, so the prototype
    uses **Source Serif 4** (OFL) in roman as the stand in, and **Source Sans 3**, their own body face. **Source Code Pro** (OFL) only
    for statute references. No italics anywhere.
11. **Colour script.** Their own palette, no rebrand. Cream #FEFAEB page, navy #2A3C5E and deep #1B2740 for type and the one dark
    footer, coral #FE764A for action only (coral text on cream uses #B8431F for contrast), teal #37BAC5, mustard #F4B63F and plum
    #7A5D7B as station colours. **The one gradient is time**, the track runs teal to coral to mustard to plum to navy and fills as the file
    travels. No glows, no overlays, no cream and navy chapters taking turns.
12. **What changed from their site and our v4.** Their site, a paragraph about "the legislative process" over flat illustration.
    v4, an editorial "public record" with Surrey as the spine, near black, stock films, italic halves. v5, one idea, the visitor's own
    decision, computed and carried down the page in their colours.
13. **Photos and film.** None in the first look. The papers and the file are drawn in code. Their logo is their own file.
14. **No RULES section 5 tells.** No italic halves, no kickers, square buttons, no arrows, no chips, no soft shadow cards, no count
    ups, no marquee. Four sections on the first look. check-build to pass before Raka sees it.

## D. The test before Raka sees it

15. Beside BWILD v2, Saavedra v3 and Fae Club v3. Saavedra's lesson is used directly, the hero is the first input and the thing
    they'd buy is shown being made. Would anyone screenshot it? The date strip working itself out for your own Cabinet is the screenshot.

## Not known, and how the build handles it

- **UK product screens.** Their screens use a Canadian demo council. The first look draws the file and the track, it shows no product screen.
- **The pages behind the header.** Placeholders until the go.
- **Clear days count differently in some councils.** The page says so and counts the cautious way, which always gives the earlier date.
- **Bank holidays are known to the end of 2028.** The date picker stops there.
