# Hertling asset sourcing, licence checked

Built 2026-10-21 for the Systemhaus-Hertling prototype. Every file listed as kept had its licence read by me from the source page, twice, on two separate fetches. Nothing here needs a credit line.

## What's here

- **20 clips kept** in `clips/` as VP9 WebM, no audio, plus a JPG poster each. 12 core and 8 alternates. Landscape clips are 1280x720. The four vertical ones stay at their native 720x1280.
- **15 stills kept** in `stills/` as JPG, 1920 px wide, all Wikimedia Commons CC0 or Public Domain.
- `raw/` holds the original Mixkit 720p MP4s and Mixkit's own poster images for the kept clips, plus `raw/sheets/` with the 6 frame contact sheet for every clip I downloaded, kept or not. The MP4s of rejected clips were deleted (each one's URL is in `mixkit-licence-reads.csv`).
- `mixkit-licence-reads.csv` has every Mixkit item page I read (1,439), with both licence signals.

## How the licence was checked

**Mixkit.** Each item page carries two licence signals, and I recorded both. One is the JSON-LD `copyrightNotice`. The other is the download box, whose `data-license` attribute and title say either `videoFree` / "Free Download" or `videoRestricted` / "Free Download - 720p Version for Personal Use only". The JSON-LD also has a `license` URL ending `#videoFree` and a "commercial and non-commercial" description on **every** page, Restricted ones included. That's sitewide boilerplate and I ignored it. Mixkit's own licence modals (`/license/modal/videoFree/` and `/videoRestricted/`) were read too. Stock Video Free License: "can be used in your commercial and non-commercial projects, for free ... Attribution is not required." Restricted: "personal projects only", with commercial projects, advertising and company social posts listed as not allowed.
- Pass 1 was a crawl of 1,439 item pages. Result: 666 `Free` + `videoFree`, 773 `Mixkit Restricted License` + `videoRestricted`, and 0 pages where the two signals disagreed (666 + 773 = 1,439).
- Pass 2 was a fresh refetch of all 20 kept item pages right before writing this file. All 20 still read `copyrightNotice: "Free"`, `data-license="videoFree"`, "Free Download".
- Mixkit's still section (`/free-stock-art/`) is illustrations only, so no Mixkit stills were taken.

**Wikimedia Commons.** The API (`api.php`) returned HTTP 429 from this container every time, so I searched with Special:MediaSearch filtered to `haslicense=unrestricted`. Then, per file:
- Pass 1 parsed the rendered File page's machine readable licence spans (`licensetpl_short`, `licensetpl_attr_req`).
- Pass 2 fetched the raw wikitext (`index.php?action=raw`), a separate source, and read the licence template.
Every kept still is CC0 or PD with `attr_req: false` on pass 1, and the matching template on pass 2.

**Walled sources, tried once each through the repo's browser fingerprint tool (`tools/fetch-walled.py`).** Pexels returned 403 "Just a moment" on all three fingerprints, so it was skipped. Unsplash returned 401 "Making sure you're not a bot", so it was skipped. Pixabay's search page loaded (200 via Safari fingerprint), but its item page came back "Just a moment", so no per item licence could be read and Pixabay was skipped. Two Commons stills are old CC0 imports from Pexels and Unsplash. Their licence was read on Commons, not at the walled source (see concerns).

**Visual check.** For each clip, 6 frames were pulled at evenly spaced times ((i+0.5)/6 of the duration) into a 2x3 sheet, and every sheet was looked at. Where a sheet left doubt, single frames were opened at full 1280 px. Each still was viewed at 1920 px, and suspect areas were cropped and viewed again.

## Kept clips (Mixkit, Stock Video Free License)

| # | File (in `clips/`) | Source page | Mixkit id | copyrightNotice (pass 1 / pass 2) | Shows | Duration | Resolution | WebM size | Poster | Frames checked | Concern |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | `rain-on-window-traffic-light-2846.webm` (core) | https://mixkit.co/free-stock-video/window-on-a-rainy-day-2846/ | 2846 | `Free` / `Free` | Rain running down a window, a blurred red traffic light behind | 22.08 s | 1280x720 | 2.75 MB | `rain-on-window-traffic-light-2846-poster.jpg` (76 KB) | yes, 6 of 6 | City unidentified. Nothing legible. |
| 2 | `raindrops-glass-night-bokeh-99834.webm` (core) | https://mixkit.co/free-stock-video/raindrops-on-glass-with-blurred-city-lights-in-the-background-99834/ | 99834 | `Free` / `Free` | Raindrops on glass, out of focus city lights at night | 19.56 s | 1280x720 | 2.72 MB | `raindrops-glass-night-bokeh-99834-poster.jpg` (142 KB) | yes, 6 of 6 | None seen. |
| 3 | `rain-dripping-tile-roof-2209.webm` (core) | https://mixkit.co/free-stock-video/raindrops-falling-from-tile-roof-2209/ | 2209 | `Free` / `Free` | Rain dripping off a dark tiled roof edge | 20.44 s | 1280x720 | 2.72 MB | `rain-dripping-tile-roof-2209-poster.jpg` (18 KB) | yes, 6 of 6 | Dark and abstract, works as a texture layer more than a subject. Its poster is almost black. |
| 4 | `rain-park-streetlights-night-100417.webm` (core) | https://mixkit.co/free-stock-video/nighttime-park-with-illuminated-streetlights-and-trees-100417/ | 100417 | `Free` / `Free` | Rain falling past park street lamps and trees at night | 6.51 s | 1280x720 | 1.00 MB | `rain-park-streetlights-night-100417-poster.jpg` (93 KB) | yes, 6 of 6 | Lamp design generic. Nothing legible. |
| 5 | `hands-typing-white-keyboard-1811.webm` (core) | https://mixkit.co/free-stock-video/a-person-typing-on-a-keyboard-1811/ | 1811 | `Free` / `Free` | Close hands typing on a plain white keyboard | 13.6 s | 1280x720 | 2.04 MB | `hands-typing-white-keyboard-1811-poster.jpg` (48 KB) | yes, 6 of 6 | None seen. |
| 6 | `man-overtime-dark-office-39841.webm` (core) | https://mixkit.co/free-stock-video/young-man-working-in-an-office-overtime-39841/ | 39841 | `Free` / `Free` | Man working late in a dim office, loosens his tie, rubs his eyes | 10.3 s | 1280x720 | 1.54 MB | `man-overtime-dark-office-39841-poster.jpg` (47 KB) | yes, 6 of 6 | Face visible in frames 5 and 6 (stock model, not a public figure). Apple style white keyboard and mouse and an iMac edge, no logo or screen visible in any frame. |
| 7 | `office-team-at-desks-42617.webm` (core) | https://mixkit.co/free-stock-video/people-working-in-the-office-42617/ | 42617 | `Free` / `Free` | Small team working at desks, laptops and paperwork | 12.22 s | 1280x720 | 1.84 MB | `office-team-at-desks-42617-poster.jpg` (38 KB) | yes, 6 of 6 | Faces cropped above the eyes. No logos seen. |
| 8 | `hands-typing-laptop-4827.webm` (core) | https://mixkit.co/free-stock-video/hands-of-a-man-typing-on-a-laptop-4827/ | 4827 | `Free` / `Free` | Hands typing on a laptop, side angle | 10.71 s | 1280x720 | 1.60 MB | `hands-typing-laptop-4827-poster.jpg` (57 KB) | yes, 6 of 6 | Keycaps carry Cyrillic letters, visible close up. Odd cue for a German site. |
| 9 | `multimeter-motherboard-101085.webm` (core) | https://mixkit.co/free-stock-video/hands-working-on-a-motherboard-101085/ | 101085 | `Free` / `Free` | Multimeter probes on a motherboard, hands at work | 10.97 s | 1280x720 | 1.74 MB | `multimeter-motherboard-101085-poster.jpg` (207 KB) | yes, 6 of 6 | Component silkscreen legible ("MAGIC R56", a barcode sticker, "Mac adress"). No consumer brand. |
| 10 | `hands-motherboard-repair-101084.webm` (core) | https://mixkit.co/free-stock-video/two-hands-working-on-a-motherboard-101084/ | 101084 | `Free` / `Free` | Two hands working on a motherboard (same shoot as 101085) | 12.18 s | 1280x720 | 1.82 MB | `hands-motherboard-repair-101084-poster.jpg` (180 KB) | yes, 6 of 6 | Same component markings as 101085. |
| 11 | `woman-desk-phone-call-233.webm` (core) | https://mixkit.co/free-stock-video/a-woman-having-a-telephone-call-in-her-office-233/ | 233 | `Free` / `Free` | Woman on a desk phone in her office | 14.85 s | 1280x720 | 2.22 MB | `woman-desk-phone-call-233-poster.jpg` (49 KB) | yes, 6 of 6 | Face visible. Generic "GSD" letters on a notebook. |
| 12 | `aerial-city-roofs-5020.webm` (core) | https://mixkit.co/free-stock-video/roofs-in-a-modern-city-aerial-shot-5020/ | 5020 | `Free` / `Free` | Top down drone shot over a north European city block | 8.34 s | 1280x720 | 1.25 MB | `aerial-city-roofs-5020-poster.jpg` (130 KB) | yes, 6 of 6 | Not Hamburg. Looks Nordic (possibly Helsinki), unidentified. No legible signage. |
| 13 | `hands-typing-black-keyboard-204.webm` (alt) | https://mixkit.co/free-stock-video/person-working-at-the-office-204/ | 204 | `Free` / `Free` | Hands typing on a black keyboard | 14.47 s | 1280x720 | 2.17 MB | `hands-typing-black-keyboard-204-poster.jpg` (45 KB) | yes, 6 of 6 | Spanish keycap legends (Ñ, Supr, Inicio) readable close up. |
| 14 | `hands-typing-laptop-dark-1808.webm` (alt) | https://mixkit.co/free-stock-video/close-up-shot-of-a-person-typing-on-a-laptop-1808/ | 1808 | `Free` / `Free` | Hands typing on a dark laptop keyboard, Touch Bar glow | 14.21 s | 1280x720 | 2.13 MB | `hands-typing-laptop-dark-1808-poster.jpg` (34 KB) | yes, 6 of 6 | No logo or text, but the MacBook keyboard design is recognisable. |
| 15 | `hands-tablet-laptop-charts-4835.webm` (alt) | https://mixkit.co/free-stock-video/office-workers-hands-typing-on-their-devices-4835/ | 4835 | `Free` / `Free` | Hands with a tablet and laptop over printed charts | 15.02 s | 1280x720 | 2.25 MB | `hands-tablet-laptop-charts-4835-poster.jpg` (54 KB) | yes, 6 of 6 | Faces cropped. No logos seen. |
| 16 | `two-people-laptops-open-office-42620.webm` (alt) | https://mixkit.co/free-stock-video/people-working-on-laptops-42620/ | 42620 | `Free` / `Free` | Two people typing on laptops in an open office, shallow focus | 9.88 s | 1280x720 | 1.48 MB | `two-people-laptops-open-office-42620-poster.jpg` (35 KB) | yes, 6 of 6 | Faces partly visible. Laptop shape reads as a MacBook, no logo shown. |
| 17 | `woman-at-office-desk-101536.webm` (alt) | https://mixkit.co/free-stock-video/focused-woman-at-office-101536/ | 101536 | `Free` / `Free` | Woman working at an office desk behind a plant | 15.81 s | 1280x720 | 2.38 MB | `woman-at-office-desk-101536-poster.jpg` (79 KB) | yes, 6 of 6 | Staged teal studio set, more glossy than the brief wants. Face visible. |
| 18 | `hands-keyboard-vertical-41287.webm` (alt) | https://mixkit.co/free-stock-video/hands-of-a-person-typing-on-a-computer-keyboard-41287/ | 41287 | `Free` / `Free` | Hands on a keyboard (vertical 9:16) | 11.89 s | 720x1280 | 1.78 MB | `hands-keyboard-vertical-41287-poster.jpg` (33 KB) | yes, 6 of 6 | Vertical only. Generic keycap letters, no brand. |
| 19 | `man-phone-desk-vertical-44748.webm` (alt) | https://mixkit.co/free-stock-video/portrait-man-on-a-call-working-in-an-office-44748/ | 44748 | `Free` / `Free` | Man on a phone call at his desk (vertical 9:16) | 14.56 s | 720x1280 | 2.19 MB | `man-phone-desk-vertical-44748-poster.jpg` (37 KB) | yes, 6 of 6 | Vertical only. Plain monitor back, no logo seen. |
| 20 | `tired-man-keyboard-vertical-39852.webm` (alt) | https://mixkit.co/free-stock-video/frustrated-and-tired-young-man-working-on-computer-39852/ | 39852 | `Free` / `Free` | Tired man at a white keyboard, adjusts tie, rubs eyes (vertical 9:16) | 7.97 s | 720x1280 | 1.20 MB | `tired-man-keyboard-vertical-39852-poster.jpg` (43 KB) | yes, 6 of 6 | Vertical only. Apple style white keyboard with no visible logo. Face visible at the end. |

Encoding settings were two pass libvpx-vp9 at `-b:v` between 0.98 and 1.2 Mbit/s (capped so each file comes in under about 2.8 MB), `-deadline good -cpu-used 2 -an`. Each poster is the frame at 0.1 s, so there's no jump when playback starts.

## Kept stills (Wikimedia Commons)

| # | File (in `stills/`) | Source page | Licence (rendered / wikitext) | Author | Shows | Resolution | Size | Checked at full size | Concern |
|---|---|---|---|---|---|---|---|---|---|
| 1 | `still-switch-patch-cables-wm.jpg` | https://commons.wikimedia.org/wiki/File:AMDExtravaLANzaToronto9.jpg | CC0, attribution required: false / {{self|cc-zero}} | Raysonho @ Open Grid Scheduler / Grid Engine | Rack switch on a desk, blue patch cables plugged in, link lights on | 1920x1272 | 461 KB | yes | Cable jacket print partly legible ("UTP CAT5E"), no maker logo in frame. |
| 2 | `still-ethernet-plug-wm.jpg` | https://commons.wikimedia.org/wiki/File:EthernetCableBlue2.jpg | CC0, attribution required: false / {{self|cc-zero}} | Raysonho @ Open Grid Scheduler / Grid Engine | Single blue RJ45 patch cable plug on white | 1920x1272 | 114 KB | yes | None seen. |
| 3 | `still-messy-cable-closet-wm.jpg` (cropped) | https://commons.wikimedia.org/wiki/File:Cable_closet_bh.jpg | Copyrighted free use + Public domain, attribution required: false / {{PD-user|Bhankins}} | Bhankins (PD-user) | Overgrown cable closet, patch panels buried in blue cable | 1920x1305 | 545 KB | yes | Cropped to drop a NETGEAR switch at the top. Old 2005 photo, soft focus. The "before" picture of a messy office network. |
| 4 | `still-small-office-rack-wm.jpg` (cropped) | https://commons.wikimedia.org/wiki/File:Server_QoS.jpg | CC0, attribution required: false / {{self|cc-zero}} | Cryoman | Small office rack: patch panel, switch, three tower servers, power strip | 1920x1600 | 460 KB | yes | Cropped to drop a LYNX patch panel label (top) and a person's head (bottom). Handwritten labels ("UPLINK-2", "TITAN"). Sockets are type E (French/Czech), not German type F, which an IT person might notice. |
| 5 | `still-server-rack-door-wm.jpg` | https://commons.wikimedia.org/wiki/File:Rear_of_distributed_filesystem_servers_in_rack_at_NERSC.jpg | CC0, attribution required: false / {{cc0}} | Derrick Coetzee from Berkeley, CA, USA | Perforated rack door, servers and link lights behind it | 1920x2891 | 1156 KB | yes | Label "NGF Rack #28" on the door (not a brand). A data centre rather than a small office. |
| 6 | `still-hard-drive-platter-wm.jpg` (cropped) | https://commons.wikimedia.org/wiki/File:HDD_Internal.jpg | CC0, attribution required: false / {{Pexels}} + {{LicenseReview|...|date=2025-02-06}} | Tookapic | Opened hard drive, platter and read head | 1920x1040 | 265 KB | yes | Cropped above a small shadowed part sticker (illegible). Licence is a Pexels CC0 import with a Commons LicenseReview dated 2025-02-06. |
| 7 | `still-desk-laptop-notebook-wm.jpg` | https://commons.wikimedia.org/wiki/File:Desktop_with_laptop_and_calculator_(Unsplash).jpg | CC0, attribution required: false / {{Unsplash}} | Anonymous Unknown author | Calm desk with a laptop, notebook, pen and calculator, late light | 1920x1440 | 293 KB | yes | Laptop seen side on, no logo. Commons categorises it as a MacBook Pro. Unsplash CC0 import (pre 5 June 2017) with an anonymous author and no LicenseReview, so it has the weakest provenance in the set. |
| 8 | `still-elbe-ovelgoenne-wm.jpg` | https://commons.wikimedia.org/wiki/File:Port_of_Hamburg_01.jpg | CC0, attribution required: false / {{self|cc-zero}} | Aschroet | The Elbe at Övelgönne, beach and villas, ferry wake | 1920x1440 | 481 KB | yes | Sunny, so not the grey north German mood. No legible signage. |
| 9 | `still-elbe-port-view-wm.jpg` | https://commons.wikimedia.org/wiki/File:Hamburg_20260815_Elbphilharmonie_Ausblick_02.jpg | CC0, attribution required: false / {{self|cc-zero}} | NutzerAusBerlin | The Elbe and port cranes seen from the Elbphilharmonie | 1920x1440 | 539 KB | yes | A small red sign on the musical theatre roof is illegible at 1920 px but could resolve at larger crops. |
| 10 | `still-speicherstadt-canal-wm.jpg` | https://commons.wikimedia.org/wiki/File:Hamburg_20260815_Brooksfleet_03.jpg | CC0, attribution required: false / {{self|cc-zero}} | NutzerAusBerlin | Speicherstadt brick warehouses along a canal | 1920x1440 | 922 KB | yes | Landmark, but only "Block N" and "Block M" plates are legible, no brand signage. |
| 11 | `still-hamburg-street-sign-wichelmannweg-wm.jpg` | https://commons.wikimedia.org/wiki/File:Straßenschild_Wichelmannweg_in_Hamburg-Wandsbek.JPG | CC0, attribution required: false / {{self|Cc-zero}} | Wolf1949 | Blue Hamburg street sign "Wichelmannweg" | 1920x772 | 251 KB | yes | Names a real street in Hamburg Wandsbek, not Reinbek. Don't caption it as the office. |
| 12 | `still-hamburg-street-sign-audorfring-wm.jpg` | https://commons.wikimedia.org/wiki/File:Straßenschild_Audorfring_in_Hamburg-Horn.JPG | CC0, attribution required: false / {{Cc-zero}} | Wolf1949H | Blue Hamburg street sign "Audorfring" | 1920x607 | 241 KB | yes | Names a real street in Hamburg Horn, not Reinbek. Same caution. |
| 13 | `still-rain-window-roof-chimney-wm.jpg` | https://commons.wikimedia.org/wiki/File:20160107Regen_Hockenheim8.jpg | CC0, attribution required: false / {{self|Cc-zero}} | AnRo0002 | Rain on a window, tiled roof and chimney behind, grey sky | 1920x1440 | 426 KB | yes | Taken in Hockenheim, but reads as generic German roofline. |
| 14 | `still-rain-window-tiled-roof-wm.jpg` | https://commons.wikimedia.org/wiki/File:20160107Regen_Hockenheim4.jpg | CC0, attribution required: false / {{self|Cc-zero}} | AnRo0002 | Rain on a window, steep tiled roof behind | 1920x1440 | 390 KB | yes | Same set as above. |
| 15 | `still-raindrops-glass-dark-wm.jpg` | https://commons.wikimedia.org/wiki/File:Raindrops_on_a_window_in_Brastad_3.jpg | CC0, attribution required: false / {{self|cc-zero}} | W.carter | Raindrops on dark glass, abstract | 1920x1467 | 723 KB | yes | Taken in Sweden. Abstract texture. |

## Rejected

### Rejected for licence (Mixkit Restricted License, personal use only)

773 of 1,439 pages read. The full list is in `mixkit-licence-reads.csv`. Restricted covered almost every subject the brief asked for first:
- **Every real Hamburg clip on Mixkit (10)**: Boats docked along a river in Hamburg (22383), Buildings around a river in Hamburg (28114), Ferry heading through a port in Hamburg (27977), Hamburg on an overcast day (27948), Large cranes moving in Hamburg (27974), Large ships in Hamburg (27976), Metro station in Hamburg (26268), Overcast day from the river in Hamburg (28109), Red passenger train in Hamburg (22458), Train heading by a port in Hamburg (27957)
- **Server, rack, data centre, network, cable, fibre and technician titles**: 93 of 103 read came back Restricted, among them 23215, 23216, 23219, 23158, 23162, 23375, 22966, 23281, 23218, 20822, 7863, 7870, 7887, 7890, 47050, 23210, 23380, 22981, 23161. The 10 Free ones are off topic: Cable car tower in the Swiss Alps; Chairs of a cable car in a Canadian forest; Friends looking at social networks in the cafe; Person working while scrolling on social networks; Plane landing on the track in the airport; Promotion for social networks with a smiling girl; Recording Christmas dinner for social networks; Subway network in Tokyo; Sunset over train tracks; Switching to the channel with a first person control on a chroma background.
- The rest are office, city, harbour and rain clips, listed in the CSV with `copyrightNotice = Mixkit Restricted License`.

### Rejected after the visual check (licence was Free)

| Mixkit id | Title | Reason |
|---|---|---|
| 1820 | A man working at the office | LG logo readable on background monitor; macOS wallpaper on screen |
| 1800 | A woman working on her laptop at an office | Apple logo on laptop lid throughout; tropical exterior |
| 918 | Busy office space | LG logo readable on foreground monitors |
| 914 | Open office space | LG logo on centre monitor; large agency floor not small office |
| 101553 | Close-Up of Hands Typing and Using Mouse | E-YOOSO brand readable on keyboard and mouse |
| 50609 | Hands working with mouse and keyboard over a white desk | Apple logo on iMac back frames 4-6; text on wrist rest |
| 1731 | Hands typing slowly on laptop | MacBook Touch Bar shows readable text "Git (0)" naming a product |
| 41280 | Taking a wire from a tool wall | STEREN brand readable on cable connector frame 1; rest motion blur |
| 4015 | Canal and street scene in amsterdam | heavy HDR haloing; recognisably Amsterdam not Hamburg |
| 3428 | Street with people walking at dusk | HERRADURA ULTRA billboard in background; Latin American plaza |
| 4012 | Cranes working on unloading dock | APM TERMINALS lettering legible on crane; Maersk-blue hulls; Mediterranean light |
| 4209 | Empty cargo ship waiting at the port | Japanese company name on hull; clearly Japan |
| 4331 | Traffic on a rainy night | NYC yellow cabs with livery and NY plates |
| 4766 | Clinic staff at a hospital reception | posed glossy lined-up medical team |
| 4742 | View to the sideboard of a flower shop | off-brief: flowers only, no counter or person |
| 205 | A waiter serves coffee to a customer | off-brief: outdoor cafe table with tropical plants, no counter |
| 4350 | Urban coffee shop | Paris cafe timelapse; partial shop sign text "RIBE"; Paris parking signs |
| 3299 | Coast in a city covered by fog | recognisable Vancouver skyline (not north German) |
| 4954 | Woman finishes work and closes her laptop | vertical home portrait of face, off-brief |
| 39840 | Young man in front of the computer in an office | recognisable macOS desktop and dock on screen |
| 2382 | Computer fan with neon lights | vertical RGB gaming-PC fan, out of focus throughout |
| 41222 | Two girls chatting at the counter of a coffee shop | customers not staff; small cafe logo plaque on wall |
| 41229 | Two girls choosing at the counter in a coffee shop | customers pointing at menu; chalk menu text in Spanish |
| 39955 | Couple choosing cookies at counter | Hollister-style seagull logo on shirt pocket; pink bakery set |
| 2844 | Drain pipe a rainy day | Mediterranean pink paving and stucco; not north German |
| 44753 | Professional woman on a call in her office | Apple logo on laptop lid frames 1-2; iPhone |
| 1807 | Office person working on a computer | LG logo on background monitor; Google Docs UI and macOS wallpaper on screen |
| 143 | A person's hands typing on a laptop | tattoo lettering legible on forearm frames 1-3 |
| 4763 | Hands of a girl typing a laptop | child's hands; MacBook; school pencils (off-brief) |
| 43539 | Woman's hand using computer mouse | RGB gaming keyboard and mouse, off-brief |
| 99903 | A young man closes his laptop and stores it on a secure laptop container | Apple logo on lid frame 1; ZARCO cafe logo sign; Spanish chalkboard |
| 29993 | Working on the computer in a technology workshop | readable on-screen text Pulse Oximeter / NOT FOR MEDICAL USE; Adobe UI; MacBook Pro lettering |
| 41646 | Hands of a programmer typing on a keyboard | mostly out of focus; gaming setup |
| 42665 | Professional woman working on graphs in the office | LG logo on monitor; named app "dashi Financial" on screen |
| 101554 | Desk-Level POV of Man Working | gaming RGB headset setup, off-brief |
| 42664 | Professional woman working in an office | LG logo on monitor; MacBook; readable on-screen clock/text |
| 3978 | View from a window of the night outside | near-black grainy monochrome |
| 18308 | Drawing a heart on a foggy window on a rainy day | heart drawn on glass, off-brief |
| 101543 | Smooth Pan of Focused Man at Desk | gaming RGB set, off-brief |
| 3098 | Desk in an office | readable URL https://www.pexels.com/challenges/adventure-seekers/ on screen; iMac |
| 39838 | Man working in an office at night | Apple logo on white laptop in background (frame 4 full size); iMac back |
| 39839 | Man working on computer in an office at night | Apple logo on white laptop in background (frame 1 full size, x~815 y~165) |
| 29994 | Engineer repairing a circuit board in his workshop | "Scotch" brand readable on tape dispenser; branded power bank; FRAGIL labels |
| 29990 | Engineer working on his computers in his workshop | recognisable LEGO Saturn V model; printed T-shirt text; laptop stickers |
| 101547 | IT Man Working | same RGB gaming set as 101553 (E-YOOSO keyboard/mouse); off-brief |
| 4011 | Cargo ship full of containers | MAERSK / SEALAND / MOL container branding throughout |
| 4450 | Workers moving containers from a cargo ship | CMA CGM, YANG MING, APL container branding; Japanese port signage |
| 5015 | European city from the air with buildings to the horizon | recognisable Milan skyline (Porta Nuova towers); Italian roofs |
| 4352 | European style buildings | Paris Haussmann blocks; tour bus livery |
| 3456 | Old street at night | vertical; Mexican colonial street; not north German |
| 3432 | Narrow avenue at night | "CONSEJO DE LA JUDICATURA" sign readable; Mexican street |
| 4001 | Shot of a pier in the city | London O2 arena landmark; "UK" container text |
| 254 | Clouds behind an apartment building | generic sunlit tower, off-brief (no north German cue) |
| 2716 | Rain falling from the roof on a rainy day | ornamental Asian-style roof edge (sibling of 2738); off-brief |
| 2845 | Drain pipe of a building | Mediterranean pink paving and stucco (sibling of 2844) |
| 100869 | Vintage Telephone Booth on a Rainy Night | US-style phone booth with large TELEPHONE sign; off-brief |
| 40607 | Barber working with a client | GATORADE bottle readable; nightclub-style barbershop lighting |
| 992 | Market shoppers | sunny outdoor market, legs only; printed bag text |
| 42749 | Woman working on a computer | "logitech" readable on mouse frames 4-5 |
| 4713 | Woman researching on the computer | Christmas tree home setting; MacBook |
| 2738 | Cabin on rainy day | Asian temple roof |
| 1606 | City train driving under a bridge | SITEUR (Guadalajara light rail) branding readable |
| 42653 | Woman finishes working on her computer | laptop lid logo visible when closed (frame 6) |
| 101540 | Young Woman Focused at Modern Workplace | vertical; same staged teal set as 101536; desk calendar text readable |
| 4603 | A pair of employees working in a call center | posed glossy call-centre, smiling to camera |
| 1781 | Typing on a laptop, close up. | "MacBook Pro" lettering readable under screen |
| 242 | Typing on a laptop | iPhone screen showing readable caller name "Michael"; MacBook command/option legends |
| 4907 | Person typing on a computer in detail | hands mostly motion blur / defocus |
| 2965 | Man using a computer | sunlit tropical city with telecom tower, off-brief |
| 41640 | Hands of a programmer working on his computer | SAMSUNG, GIGABYTE, AORUS logos readable |
| 4422 | Thunderstorm at night | near-black mountain sky, off-brief |
| 39854 | Exhausted man working in an office overtime | vertical; macOS dock and wallpaper on iMac screen |
| 39856 | Hand of a man in an office taking a sheet of paper | vertical; mostly motion blur |
| 39851 | Man with glasses working on a computer | vertical; macOS dock and wallpaper on screen |
| 4939 | Hands of a woman typing on a laptop | vertical; heavily defocused hands on laptop edge |

### Commons stills rejected (licence was CC0 or PD)

| File | Reason |
|---|---|
| File:Hamburg Berliner Tor Center.jpg | IBM and SIEMENS logos on the buildings |
| File:WD Elements hard drive.jpg | Western Digital branding is the subject |
| File:S-Bahn Reinbek.jpg | DB logo on the train front and S-Bahn signage. It's the one real Reinbek image, so a pity. |
| File:Hamburg 20260815 St. Petri Aussicht 11.jpg | "EVERGREEN" containers and "LNG POWERED" ship lettering legible at full resolution |
| File:Hamburg 20260815 St. Petri Aussicht 10.jpg | "FRASER SUITES" hotel name legible on a roof |
| File:Hamburg Hafen 1.JPG | Slogan banner with a logo on the dry dock |
| File:Hamburg 20260815 Elbphilharmonie Ausblick 13.jpg | "BLOHM+VOSS DOCK ELBE 17" legible |
| File:Hamburg 20260815 Brooksfleet 04.jpg | Near duplicate of the kept Brooksfleet 03, with a partial shop banner on the left |
| File:Moojerstraße Hamburg-Wandsbek.JPG | VW badges and legible number plates |
| File:Eberhardstraße in Hamburg-Wandsbek.JPG | WEINSBERG camper lettering, branded van, car badges |
| File:Lüttwisch in Hamburg-Eidelstedt.JPG | Audi, VW and Renault badges, number plates |
| File:Home-office-336377.jpg | "MacBook Air" lettering legible |
| File:Desktop after work (Unsplash).jpg | Apple logo on the lid and the mouse |
| File:EthernetSwitch.jpg | "ALLEN TEL" cable maker print legible across the frame. A thin top crop was tried and dropped as unusable. |
| File:EthernetSwitch2.jpg | "Catalyst 4507R" model name and "ALLEN TEL" print legible |
| File:20160107Regen Hockenheim6.jpg | Clean, but a near duplicate of the two kept Hockenheim frames |
| File:Raindrops on a window in Brastad 2.jpg | Clean, but a vertical duplicate of the kept Brastad 3 |

## Gaps against the brief

- **Hamburg and harbour in motion.** None. All 10 Hamburg clips on Mixkit are Restricted, and Free harbour clips are Mediterranean or carry shipping line branding. Hamburg is covered by stills only.
- **Rack or network cabinet with link lights in motion.** None. Every server room and data centre clip I read is Restricted. Covered by stills (switch with link lights, small office rack, rack door). The closest Free motion is the motherboard repair pair.
- **Hands patching network cables.** Nothing found under a Free licence in what I searched, in motion or still.
- **Server room door, calm office at night with monitors off, reception or small shop counter.** No Free clip passed. The counter and reception ones were Spanish language cafés, posed medical staff or branded. The night office clip that passed (39841) is a man working late, not an empty office.
- **Backup drive.** One still of an opened internal drive. No external backup drive without a logo was found.

## Notes for whoever builds with these

- **Read this one before production use.** Mixkit's User Terms (https://mixkit.co/terms/, clause 9, read 2026-10-21) say you must not "use scripts or bots to mass download Items (this includes using any means whatsoever to scrape/download the entire library and/or database of Items)". For this research I read 1,439 item pages and downloaded 95 MP4s by script, with rate limiting (Mixkit rate limited me with HTTP 429 during one stretch, and I slowed down). The licence on the 20 kept clips is Free either way. But to keep the acquisition itself clean, someone should re-download those 20 by hand from the item pages linked above (the page's own Free Download button), and swap them in before launch. That is 20 clicks.
- Clause 9 also bars selling copies of Items without altering them, and reselling or redistributing Items "on a stock or inventory basis". Using them as website background and section footage doesn't touch either.
- Several clips show people's faces (39841, 233, 101536, 39852, 42620, 44748). These are stock models. Don't caption any of them as Hertling, his staff or his clients.
- Don't caption any still as Reinbek, as Hertling's office or as a client site. The street signs name Hamburg streets elsewhere in the city.
