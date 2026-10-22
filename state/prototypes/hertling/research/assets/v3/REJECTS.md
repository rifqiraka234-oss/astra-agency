# Rejects, Hertling asset sourcing v3 (2026-10-22)

## Mixkit clips rejected (42 item pages read today: 6 kept, 36 rejected)

42 item pages, 7 listing pages, 6 second licence reads of the kept clips, 32 poster frames and 15 MP4 files were fetched today, each as its own request, at least 3 seconds apart, Referer set to the item page for posters and files. 32 pages read Free and 10 read Restricted. Every item page below was fetched today, 2026-10-22, one request at a time, at least 3 seconds apart, and both licence signals were read from it (JSON-LD `copyrightNotice` and the download box `data-license`). Files were only downloaded for items that read `Free` on both.

### Rejected for licence (Mixkit Restricted License, personal use only)

Read 2026-10-22, `copyrightNotice: "Mixkit Restricted License"` and `data-license="videoRestricted"` ("Free Download - 720p Version for Personal Use only"). Nothing downloaded.

| Mixkit id | Title | Item page |
|---|---|---|
| 36897 | Silhouettes of a business meeting | https://mixkit.co/free-stock-video/silhouettes-of-a-business-meeting-36897/ |
| 23073 | Man on a phone call at his desk | https://mixkit.co/free-stock-video/man-on-a-phone-call-at-his-desk-23073/ |
| 5676 | Businesswoman asks coworker about idea | https://mixkit.co/free-stock-video/businesswoman-asks-coworker-about-idea-5676/ |
| 33407 | Coworkers working in a project in a meeting | https://mixkit.co/free-stock-video/coworkers-working-in-a-project-in-a-meeting-33407/ |
| 46682 | Meeting and brainstorming in the office | https://mixkit.co/free-stock-video/meeting-and-brainstorming-in-the-office-46682/ |
| 46677 | Business executives discussing the new project | https://mixkit.co/free-stock-video/business-executives-discussing-the-new-project-46677/ |
| 15798 | Young business team meeting late in conference room | https://mixkit.co/free-stock-video/young-business-team-meeting-late-in-conference-room-15798/ |
| 23718 | Exhausted woman takes off his glasses | https://mixkit.co/free-stock-video/exhausted-woman-takes-off-his-glasses-23718/ |
| 48479 | Work colleagues having happy discussion around a table | https://mixkit.co/free-stock-video/work-colleagues-having-happy-discussion-around-a-table-48479/ |
| 8873 | Lawyers working in modern office look up an smile | https://mixkit.co/free-stock-video/lawyers-working-in-modern-office-look-up-an-smile-8873/ |

Listing pages also showed these as Restricted in the earlier CSV, not re-read because they were never candidates: 22961, 46680, 46685, 46679, 48713, 48714, 48715, and the night office set 24217, 24059, 23742, 24063, 48010, 24344, 5518, 5731, 5595, 23717.

### Rejected on sight (licence read `Free` on both signals, rejected from the item page's poster frame, not downloaded)

| Mixkit id | Title | Reason |
|---|---|---|
| 261 | Office meeting | Apple logo plainly visible on the MacBook lid in the poster frame. |
| 100331 | Colleagues in a Conference Room | Staged teal studio set with a green chroma key screen on the wall. |
| 100839 | Employee Laughing in Office Setting | The actor's face is replaced by a cartoon emoji head. |
| 100840 | Happy Employee Being Congratulated | Emoji head again. |
| 101398 | Woman Working and Having Tea | Styled retro set with a red typewriter and props. Doesn't read as a real small office. |
| 101534 | Desk-Height View of Woman Taking Notes | Same staged teal set as 101536/101540 (rejected on the earlier pass), pink props, a letter block calendar on the desk. |
| 41176 | Man closes his laptop after work | Vertical 9:16, tight on the face. |
| 42644 | Business meeting in a meeting room | Wall screens show a presentation with slide text and graphics. |
| 42666 | Presentation during a work team meeting | Same room as 42644, wall screens with charts and slide content. |
| 42656 | Thoughtful woman working in her office | Laptop screen with an app interface fills a third of the frame. |
| 4804 | Two people working in a large office | Same shoot and room as the kept 4872. Redundant. |
| 4817 | Two people at a business meeting | Same shoot and room as the kept 4872. Redundant. |
| 4809 | Business people at work meeting | Top down corporate meeting over chart printouts and phones. Generic and glossy. |
| 39791 | Young happy woman laughing during a phone call | Vertical, a woman lying in bed at home. Off brief. |
| 100314 | Man multitasking at desk with laptop and phone call | Bright cartoon mural set, sticker on the laptop. Off brief. |
| 49916 | Morning coffee of a young woman | Home coffee table with a French press. No office. |
| 42637 | Young entrepreneurs on phone call | Green chroma key background. |

### Rejected after the frame check (downloaded, 1 fps frames looked at, suspect areas enlarged)

| Mixkit id | Title | Reason |
|---|---|---|
| 44750 | Satisfied woman finishes her work and leaves the office | Apple logo on the laptop lid from 9 s, confirmed on frame 10 enlarged. |
| 311 | Businesswoman in glasses talking on mobile phone | Apple logo on the back of the iPhone at 10 s, confirmed on frame 11 enlarged. The background is a restaurant at night, not an office. |
| 100323 | Woman working at laptop in office setting | Frosted glass decal behind her with script lettering ending "...Place", partly readable after a contrast boost on frames 0 to 12, most likely a venue or coworking name. A white round sticker on the laptop lid, and she types on the laptop for the last third. The closest call of the batch, rejected to be safe. |
| 4904 | Man and woman commenting on an image on a laptop | The laptop screen shows a web page with a photo of a person and interface text (blurred, not legible), plus MacBook Air bezel lettering that is present but unreadable at 720p. Someone else's photo on screen. |
| 42641 | Young people working together in the office | A printed script wordmark on the purple notebook cover sits in the centre of the frame for the whole clip. Murky, low contrast grade, mostly out of focus. |
| 4876 | Woman working in an office flips smiling | Typing on a laptop for 12 s (the hands on laptop motif the design team bans), then she turns to camera and smiles, which reads as an advert testimonial. |
| 4533 | Woman doing accounts on a calculator | Hands only, flat bright product style shot on a white side table, a printed form in the lower right. Generic. |
| 4813 | Business partners meeting | Same shoot and room as the kept 4872. The woman's back fills the left third. Redundant and weaker. |
| 4802 | People ending a business meeting | Top down handshake over chart printouts, a deal closed cliché. |

## Commons stills rejected

### How the pool was searched

Commons' API (`api.php`), its REST file endpoint and api.wikimedia.org all returned HTTP 429 (envoy rate limit) from this container on every try today (06:14, 06:16 through Chromium, 06:41 and 07:03 UTC, the last a single batched query for the 14 finalists). So the search ran on the classic `Special:Search` page in the File namespace with CirrusSearch filters: `filew:>2399` to enforce the 2400 px minimum, and `hastemplate:Cc-zero` / `hastemplate:PD-self` for a CC0 and PD pass, then the same places with no licence filter for CC BY and CC BY-SA. 91 queries in all (77 returned results) (Speicherstadt, HafenCity, Elbphilharmonie, Elbe, Hafen, Alster, Binnenalster, Außenalster, Michel, roofs, Rathaus, skyline, fog, Nebel, rain, Regen, blue hour, blaue Stunde, Dämmerung, Reinbek, Schloss Reinbek, Mühlenteich, Bille, Billetal, Sachsenwald, Wentorf, Aumühle, Bergedorf, Boberg, Vierlande). 2,545 unique files came back and 1,453 were landscape and at least 2400 px wide (scans and PDFs included). 829 were looked at as 250 px thumbnails on labelled contact sheets. 106 went on to a full licence read (rendered File page plus raw wikitext), 15 were shortlisted and downloaded at 3840 px, and 12 were kept after the full size check.

### Rejected in the thumbnail triage (by class, not file by file)

- **Not the place it seemed (judged from the file titles).** Burg Vischering in Lüdinghausen (36 files came up under Schloss Reinbek), "Speicherstadt Potsdam", "Buffalo from Hamburg" (Hamburg, New York), Mühlenteich files from Wedel, Bredstedt, Siezbüttel and Wilsum, places called Aumühle in Bavaria and Hesse, the ship "Reinbek" photographed in Rotterdam, plus Sydney, Tokyo, New York, Münster, Bremerhaven, Cuxhaven, Dülmen, Norderney and Wernigerode. None of these can be captioned as Hamburg or Reinbek.
- **Brands, liveries and signage.** Night container terminals with HAMBURG SÜD and other line names on hulls and boxes, harbour ferries in livery, the lettered musical theatre domes on the Elbe, Jungfernstieg shopfronts, the Reeperbahn, a fairground, S-Bahn trains (Reinbek station included), a football stadium.
- **Too saturated or over processed.** The purple sky "blue hour in Hamburg port" series (2025) and similar HDR night shots.
- **Documentary, flat or busy.** The NutzerAusBerlin views from St. Petri and the Elbphilharmonie (CC0, August 2026) are clear but flat midday documentation, busy with market stalls, tour buses and branded buildings. Most Reinbek street and Mühlenteich results are daytime building records.
- **Not looked at.** The CC0 result sets for Bergedorf, Boberg, Bille, Elbe Hamburg, Hamburg Hafen, Hamburg Rathaus, HafenCity, Elbphilharmonie, Aumühle, Wentorf and Vierlande ( landscape files) were skipped on their titles, which read as daytime building and documentation records. Only the first 40 of  Reinbek Mühlenteich results were looked at. A later pass could open them.
- **Not photographs.** Maps, engravings, paintings, newspaper scans, PDFs.

### Rejected after the licence read (every one of these licences is usable, the reasons are visual or practical)

| File page | Licence (file page) | Reason |
|---|---|---|
| [Schlossreinbek-2.jpg](https://commons.wikimedia.org/wiki/File:Schlossreinbek-2.jpg) | CC BY-SA 3.0, GFDL | Near duplicate of the kept Schlossreinbek-1 (same photographer, same viewpoint, same autumn light). |
| [Mühlenteich und Reinbeker Schloss im Winter.jpg](https://commons.wikimedia.org/wiki/File:M%C3%BChlenteich_und_Reinbeker_Schloss_im_Winter.jpg) | CC BY-SA 4.0 | Real Reinbek, but a bare branch fills the frame and the castle is a small grey shape behind it. Flat winter light, reads as a snapshot. |
| [Schlosspark-Reinbek-1.jpg](https://commons.wikimedia.org/wiki/File:Schlosspark-Reinbek-1.jpg) | CC BY 4.0 | Autumn beech in the castle park, castle only partly visible. Pretty but generic park tree, nothing says Reinbek. |
| [Schloss Reinbek, Ostflügel.JPG](https://commons.wikimedia.org/wiki/File:Schloss_Reinbek,_Ostfl%C3%BCgel.JPG) | GFDL, CC BY-SA 3.0 | Documentary facade shot under flat midday sky. Fine record, not cinematic. |
| [Schloss Reinbek, Südansicht.JPG](https://commons.wikimedia.org/wiki/File:Schloss_Reinbek,_S%C3%BCdansicht.JPG) | GFDL, CC BY 3.0 | Documentary facade shot under flat midday sky, outdoor cafe umbrellas in front. |
| [Reinbek-Krabbenkamp NSG-Billetal April-2018 12DSC 0403.JPG](https://commons.wikimedia.org/wiki/File:Reinbek-Krabbenkamp_NSG-Billetal_April-2018_12DSC_0403.JPG) | CC BY 3.0 de | Same set as the kept 10DSC 0399, weaker composition. |
| [Reinbek-Krabbenkamp NSG-Billetal April-2018 17DSC 0416.JPG](https://commons.wikimedia.org/wiki/File:Reinbek-Krabbenkamp_NSG-Billetal_April-2018_17DSC_0416.JPG) | CC BY 3.0 de | Same set as the kept 10DSC 0399, weaker composition. |
| [Spiegelung Billetal-Reinbek.jpg](https://commons.wikimedia.org/wiki/File:Spiegelung_Billetal-Reinbek.jpg) | CC BY-SA 4.0 | Tree stump in winter water. Cluttered foreground, low contrast, no sense of place. |
| [Forstgrabendiek.jpg](https://commons.wikimedia.org/wiki/File:Forstgrabendiek.jpg) | CC BY-SA 3.0 | Calm pond near Reinbek with a distant tree line, flat light, little sense of place. |
| [Forstgraben.jpg](https://commons.wikimedia.org/wiki/File:Forstgraben.jpg) | CC BY-SA 3.0 | Leaf litter close-up, busy and generic. |
| [Romantische Bille - Naturschutzgebiet Billetal (2).jpg](https://commons.wikimedia.org/wiki/File:Romantische_Bille_-_Naturschutzgebiet_Billetal_(2).jpg) | CC BY-SA 4.0 | Fallen tree across the Bille, busy foreground, weaker than the kept Billetal 09. |
| [Im NSG „Billetal“ 17.jpg](https://commons.wikimedia.org/wiki/File:Im_NSG_%E2%80%9EBilletal%E2%80%9C_17.jpg) | CC BY-SA 4.0 | Same series as the kept Billetal 09. Kept one Bille forest frame to avoid repetition. |
| [Im NSG „Billetal“ 22.jpg](https://commons.wikimedia.org/wiki/File:Im_NSG_%E2%80%9EBilletal%E2%80%9C_22.jpg) | CC BY-SA 4.0 | Same series as the kept Billetal 09. Kept one Bille forest frame to avoid repetition. |
| [Im NSG „Billetal“ 08.jpg](https://commons.wikimedia.org/wiki/File:Im_NSG_%E2%80%9EBilletal%E2%80%9C_08.jpg) | CC BY-SA 4.0 | Same series as the kept Billetal 09. Kept one Bille forest frame to avoid repetition. |
| [Naturschutzgebiet Billetal 04.jpg](https://commons.wikimedia.org/wiki/File:Naturschutzgebiet_Billetal_04.jpg) | CC BY-SA 4.0 | Dark tangled stream bank, cluttered. |
| [Landschaftsschutzgebiet Billetal 05.jpg](https://commons.wikimedia.org/wiki/File:Landschaftsschutzgebiet_Billetal_05.jpg) | CC BY-SA 4.0 | Rapeseed field with a radio mast on the horizon. Bright but not a Bille or Reinbek cue. |
| [Hamburg, Speicherstadt, Wasserschloss -- 2016 -- 3265-71.jpg](https://commons.wikimedia.org/wiki/File:Hamburg,_Speicherstadt,_Wasserschloss_--_2016_--_3265-71.jpg) | CC BY-SA 4.0 | Strong blue hour Wasserschloss, CC BY-SA 4.0 with a long mandatory credit. The kept CC0 'Hafen City (Unsplash)' shows the same view and light, so the CC0 one wins on licence. |
| [Hamburg, Speicherstadt, Wasserschloss -- 2016 -- 3223-9.jpg](https://commons.wikimedia.org/wiki/File:Hamburg,_Speicherstadt,_Wasserschloss_--_2016_--_3223-9.jpg) | CC BY-SA 4.0 | Same as above, same series, CC BY-SA 4.0. Redundant with the kept CC0 blue hour Wasserschloss. |
| [Hamburg, Speicherstadt, Wasserschloss -- 2016 -- 3301.jpg](https://commons.wikimedia.org/wiki/File:Hamburg,_Speicherstadt,_Wasserschloss_--_2016_--_3301.jpg) | CC BY-SA 4.0 | Same series, redundant with the kept CC0 blue hour Wasserschloss. |
| [Hamburg, Speicherstadt, Wasserschloss -- 2016 -- 3272-8.jpg](https://commons.wikimedia.org/wiki/File:Hamburg,_Speicherstadt,_Wasserschloss_--_2016_--_3272-8.jpg) | CC BY-SA 4.0 | Same series, redundant with the kept CC0 blue hour Wasserschloss. |
| [Hamburg, Speicherstadt, Wasserschloss -- 2016 -- 3209-15.jpg](https://commons.wikimedia.org/wiki/File:Hamburg,_Speicherstadt,_Wasserschloss_--_2016_--_3209-15.jpg) | CC BY-SA 4.0 | Same series, redundant with the kept CC0 blue hour Wasserschloss. |
| [Hamburg, Speicherstadt, Wasserschloss -- 2016 -- 3230-6.jpg](https://commons.wikimedia.org/wiki/File:Hamburg,_Speicherstadt,_Wasserschloss_--_2016_--_3230-6.jpg) | CC BY-SA 4.0 | Same series, redundant with the kept CC0 blue hour Wasserschloss. |
| [Hamburg, Speicherstadt, Wasserschloss -- 2016 -- 3195-201.jpg](https://commons.wikimedia.org/wiki/File:Hamburg,_Speicherstadt,_Wasserschloss_--_2016_--_3195-201.jpg) | CC BY-SA 4.0 | Same series, redundant with the kept CC0 blue hour Wasserschloss. |
| [Hamburg, Speicherstadt, Wasserschloss -- 2016 -- 3294-300.jpg](https://commons.wikimedia.org/wiki/File:Hamburg,_Speicherstadt,_Wasserschloss_--_2016_--_3294-300.jpg) | CC BY-SA 4.0 | Same series, redundant with the kept CC0 blue hour Wasserschloss. |
| [Hamburg, Speicherstadt, Wasserschloss -- 2016 -- 3237-43.jpg](https://commons.wikimedia.org/wiki/File:Hamburg,_Speicherstadt,_Wasserschloss_--_2016_--_3237-43.jpg) | CC BY-SA 4.0 | Same series, redundant with the kept CC0 blue hour Wasserschloss. |
| [Hamburg, Speicherstadt, Wasserschloss -- 2016 -- 3223-9 (cinematic).jpg](https://commons.wikimedia.org/wiki/File:Hamburg,_Speicherstadt,_Wasserschloss_--_2016_--_3223-9_(cinematic).jpg) | CC BY-SA 4.0 | Same series, letterboxed crop, redundant with the kept CC0 blue hour Wasserschloss. |
| [Hamburg, Speicherstadt, Wasserschloss -- 2016 -- 3302-8.jpg](https://commons.wikimedia.org/wiki/File:Hamburg,_Speicherstadt,_Wasserschloss_--_2016_--_3302-8.jpg) | CC BY-SA 4.0 | Same series, redundant with the kept CC0 blue hour Wasserschloss. |
| [Speicherstadt abends.jpg](https://commons.wikimedia.org/wiki/File:Speicherstadt_abends.jpg) | CC BY-SA 3.0 | Very saturated processing with red light streaks on the water, and the licence asks for a credit with a website link (attribution=Thomas Wolf, www.foto-tw.de). |
| [Hamburg, Speicherstadt, Block P -- 2016 -- 3330-6.jpg](https://commons.wikimedia.org/wiki/File:Hamburg,_Speicherstadt,_Block_P_--_2016_--_3330-6.jpg) | CC BY-SA 4.0 | Strong, but the kept Brooksfleet night shot (Frank Schulenburg) covers the same lit warehouses at night. Kept one CC BY-SA night canal only. |
| [Hamburg, Speicherstadt, Block P -- 2016 -- 3337.jpg](https://commons.wikimedia.org/wiki/File:Hamburg,_Speicherstadt,_Block_P_--_2016_--_3337.jpg) | CC BY-SA 4.0 | Same series as Block P 3330-6, same reason. |
| [Speicherstadt @night, Hamburg.jpg](https://commons.wikimedia.org/wiki/File:Speicherstadt_%40night,_Hamburg.jpg) | CC BY 4.0 | Dark night view down a Speicherstadt canal, CC BY 4.0. Same subject as the kept Brooksfleet night frame, with less detail in the shadows. Kept one. |
| [Speicherstadt by night II (26258495020).jpg](https://commons.wikimedia.org/wiki/File:Speicherstadt_by_night_II_(26258495020).jpg) | CC BY 2.0 | Lit office windows in a dark street, low resolution for the crop (3696 px) and harsh. |
| [Storage city (Speicherstadt) at night in Hamburg 3.jpg](https://commons.wikimedia.org/wiki/File:Storage_city_(Speicherstadt)_at_night_in_Hamburg_3.jpg) | CC BY-SA 4.0 | Dim and murky, overcast night with no reflection, flat. |
| [Hamburg Speicherstadt Wasserschloss.jpg](https://commons.wikimedia.org/wiki/File:Hamburg_Speicherstadt_Wasserschloss.jpg) | CC BY-SA 4.0 | Same Wasserschloss view as the kept CC0 pair, CC BY-SA. Redundant. |
| [Matthias Suessen Wasserschloss Speicherstadt-6337.jpg](https://commons.wikimedia.org/wiki/File:Matthias_Suessen_Wasserschloss_Speicherstadt-6337.jpg) | CC BY-SA 4.0 | Same Wasserschloss view, heavy blue cast, CC BY-SA. Redundant. |
| [Wasserschloss (Hamburg) Speicherstadt msu 2018-7684.jpg](https://commons.wikimedia.org/wiki/File:Wasserschloss_(Hamburg)_Speicherstadt_msu_2018-7684.jpg) | CC BY-SA 4.0 | Same Wasserschloss view, CC BY-SA. Redundant. |
| [HamburgSpeicherstadt.jpg](https://commons.wikimedia.org/wiki/File:HamburgSpeicherstadt.jpg) | CC BY-SA 4.0 | Same Wasserschloss view at blue hour, CC BY-SA. Redundant with the CC0 one. |
| [Wasserschloss Speicherstadt.jpg](https://commons.wikimedia.org/wiki/File:Wasserschloss_Speicherstadt.jpg) | CC BY-SA 4.0 | Pink dusk Wasserschloss, only 3000 px wide and soft. Redundant. |
| [Hamburg Zollkanal.jpg](https://commons.wikimedia.org/wiki/File:Hamburg_Zollkanal.jpg) | CC BY-SA 2.0 | Only 2844 px wide, night shot with a small lit block. Weaker. |
| [HafenCity - Wasserschloss - 20170822200837.jpg](https://commons.wikimedia.org/wiki/File:HafenCity_-_Wasserschloss_-_20170822200837.jpg) | CC BY-SA 4.0 | Wasserschloss at night, CC BY-SA, redundant with the kept CC0 pair. |
| [Hamburg 8304.jpg](https://commons.wikimedia.org/wiki/File:Hamburg_8304.jpg) | CC BY-SA 4.0 | Wasserschloss through a bridge girder at night, CC BY-SA, redundant. |
| [Wasserschloss Speicherstadt Hamburg.jpg](https://commons.wikimedia.org/wiki/File:Wasserschloss_Speicherstadt_Hamburg.jpg) | CC BY-SA 4.0 | Golden sunset down the canal with the Wasserschloss, a heavily processed look, and redundant with the kept Speicherstadt frames. |
| [Wasserschloss (Hamburg)-msu-0691-.jpg](https://commons.wikimedia.org/wiki/File:Wasserschloss_(Hamburg)-msu-0691-.jpg) | CC BY-SA 4.0 | Purple dusk Wasserschloss, CC BY-SA, redundant with the CC0 pair. |
| [Hamburg Brooksfleet 4.jpg](https://commons.wikimedia.org/wiki/File:Hamburg_Brooksfleet_4.jpg) | CC BY-SA 4.0 | Golden lit warehouses at night, CC BY-SA. Redundant with the kept Brooksfleet night shot. |
| [Speicherstadt Hamburg-AB.jpg](https://commons.wikimedia.org/wiki/File:Speicherstadt_Hamburg-AB.jpg) | CC BY-SA 4.0 | Shortlisted (the best fog frame found), then rejected at full size: business signs on the right facade are readable on the 3840 px file, a blue FARHADIAN carpet dealer sign with a web address, a "Teppich TAWAK..." sign and a "Speicherstadt-museum" sign. Usable only after retouching those three signs, and as CC BY-SA 4.0 the retouched version stays CC BY-SA. |
| [Speicherstadt bei Nebel.jpg](https://commons.wikimedia.org/wiki/File:Speicherstadt_bei_Nebel.jpg) | CC BY-SA 4.0 | Sepia fog, strong colour cast and soft. The kept 'Speicherstadt Hamburg-AB' fog frame is cleaner. |
| [Hamburg Speicherstadt (Unsplash).jpg](https://commons.wikimedia.org/wiki/File:Hamburg_Speicherstadt_(Unsplash).jpg) | CC0 | CC0, but a daytime shot with a heavy HDR sky. Weaker than the kept CC0 Speicherstadt frames. |
| [HHspeicher3.JPG](https://commons.wikimedia.org/wiki/File:HHspeicher3.JPG) | Public domain | Public domain, but a pale, flat 2008 compact-camera frame (Canon IXUS 70), soft at full size. Its 3072 px original could not be fetched (HTTP 429) and the 3840 px rendition would be an upscale. |
| [Freihafenelbbrücke bei Nacht 01.jpg](https://commons.wikimedia.org/wiki/File:Freihafenelbbr%C3%BCcke_bei_Nacht_01.jpg) | CC BY-SA 4.0 | Steel bridge at night, strong, but it reads as infrastructure and the brief is people and places. Second choice. |
| [Freihafenelbbrücke bei Nacht 05.jpg](https://commons.wikimedia.org/wiki/File:Freihafenelbbr%C3%BCcke_bei_Nacht_05.jpg) | CC BY-SA 4.0 | Same series, same reason. |
| [Freihafenelbbrücke bei Nacht 07.jpg](https://commons.wikimedia.org/wiki/File:Freihafenelbbr%C3%BCcke_bei_Nacht_07.jpg) | CC BY-SA 4.0 | Same series, same reason. |
| [Elbphilharmonie.jpeg](https://commons.wikimedia.org/wiki/File:Elbphilharmonie.jpeg) | CC BY-SA 4.0 | Elbphilharmonie silhouette at dusk, a single famous landmark that reads as tourism rather than a working city. |
| [Niederbaumbrücke (Hamburg).Abendhochwasser 06.12.2013.ajb.jpg](https://commons.wikimedia.org/wiki/File:Niederbaumbr%C3%BCcke_(Hamburg).Abendhochwasser_06.12.2013.ajb.jpg) | CC BY-SA 3.0 de | Night view across the water to lit HafenCity offices, cold and busy. |
| [Hamburg Filharmonia Labska 11.jpg](https://commons.wikimedia.org/wiki/File:Hamburg_Filharmonia_Labska_11.jpg) | CC BY-SA 4.0 | Elbphilharmonie at blue hour, landmark postcard, same reason as above. |
| [Hamburg Filharmonia Labska 10.jpg](https://commons.wikimedia.org/wiki/File:Hamburg_Filharmonia_Labska_10.jpg) | CC BY-SA 4.0 | Same, landmark postcard. |
| [Hamburg, Hafen -- 2025 -- 2829.jpg](https://commons.wikimedia.org/wiki/File:Hamburg,_Hafen_--_2025_--_2829.jpg) | CC BY-SA 4.0 | Grey misty harbour, busy with tourist ferries whose HADAG livery and harbour cruise signage are a brand risk (not checked at full size). |
| [Hamburg, Hafen -- 2025 -- 2814.jpg](https://commons.wikimedia.org/wiki/File:Hamburg,_Hafen_--_2025_--_2814.jpg) | CC BY-SA 4.0 | Same series as 2829, tour boats in frame (livery not checked at full size). |
| [Hamburg, Hafen, Landungsbrücken -- 2025 -- 2811.jpg](https://commons.wikimedia.org/wiki/File:Hamburg,_Hafen,_Landungsbr%C3%BCcken_--_2025_--_2811.jpg) | CC BY-SA 4.0 | Landungsbrücken piers and ferries in frame, a signage and livery risk (not checked at full size). |
| [Hamburg, Hafen, Fähre -- 2025 -- 2828.jpg](https://commons.wikimedia.org/wiki/File:Hamburg,_Hafen,_F%C3%A4hre_--_2025_--_2828.jpg) | CC BY-SA 4.0 | A harbour ferry is the subject, its livery a brand risk. |
| [Hamburg, Hafen, Schiff -Cap San Diego- -- 2025 -- 2812.jpg](https://commons.wikimedia.org/wiki/File:Hamburg,_Hafen,_Schiff_-Cap_San_Diego-_--_2025_--_2812.jpg) | CC BY-SA 4.0 | Museum ship with its painted name, brand-like. |
| [Hamburg, Hafen, Schiff -Rickmer Rickmers- und St.-Michaelis-Kirche -- 2025 -- 2816.jpg](https://commons.wikimedia.org/wiki/File:Hamburg,_Hafen,_Schiff_-Rickmer_Rickmers-_und_St.-Michaelis-Kirche_--_2025_--_2816.jpg) | CC BY-SA 4.0 | Museum ship with its name on the hull. |
| [St. Pauli Landungsbrücken im Nebel.jpg](https://commons.wikimedia.org/wiki/File:St._Pauli_Landungsbr%C3%BCcken_im_Nebel.jpg) | CC BY-SA 4.0 | Landungsbrücken at night in fog, moody, but lit pier signs and the clock tower are in frame, a signage risk (not checked at full size), and it reads as a tourist landmark. |
| [Alte Elbbrücke, Südportal - explored 10.3.2022 - Flickr - greenoid.jpg](https://commons.wikimedia.org/wiki/File:Alte_Elbbr%C3%BCcke,_S%C3%BCdportal_-_explored_10.3.2022_-_Flickr_-_greenoid.jpg) | CC BY-SA 2.0 | Bridge portal in Harburg/Wilhelmsburg at night, graphic but cold and not the brief's places. |
| [Elbphilharmonie in der Abendsonne.jpg](https://commons.wikimedia.org/wiki/File:Elbphilharmonie_in_der_Abendsonne.jpg) | CC BY-SA 4.0 | Elbphilharmonie and a museum ship at dusk, a landmark postcard and busy. |
| [Sonnenuntergang auf Binnenalster - Hamburg.jpg](https://commons.wikimedia.org/wiki/File:Sonnenuntergang_auf_Binnenalster_-_Hamburg.jpg) | CC BY 2.0 | Pink dusk over the Binnenalster with the Jungfernstieg shopfronts across the water, a shop signage risk (not checked at full size). The kept Hamburgskyline frame covers the Alster at dusk. |
| [Hamburg Binnenalster 8.jpg](https://commons.wikimedia.org/wiki/File:Hamburg_Binnenalster_8.jpg) | CC BY-SA 4.0 | Same series as the kept Binnenalster 10. |
| [Hamburg Binnenalster 9.jpg](https://commons.wikimedia.org/wiki/File:Hamburg_Binnenalster_9.jpg) | CC BY-SA 4.0 | Same series as the kept Binnenalster 10. |
| [Hamburg Binnenalster 10.jpg](https://commons.wikimedia.org/wiki/File:Hamburg_Binnenalster_10.jpg) | CC BY-SA 4.0 | Shortlisted, then rejected at full size: the lettering HOTEL VIER JAHRESZEITEN is legible on the lit hotel facade in the centre of the 3840 px file. A brand. |
| [Hamburg Binnenalster 11.jpg](https://commons.wikimedia.org/wiki/File:Hamburg_Binnenalster_11.jpg) | CC BY-SA 4.0 | Same series as the kept Binnenalster 10, saturated blue. |
| [Binnenalster Sunset - Hamburg (19198605320).jpg](https://commons.wikimedia.org/wiki/File:Binnenalster_Sunset_-_Hamburg_(19198605320).jpg) | CC BY 2.0 | Pink sunset over the Binnenalster, but the Fairmont Hotel Vier Jahreszeiten fills the centre of the frame, so its name lettering is a brand risk (not checked at full size). The kept Hamburgskyline frame covers the Alster at dusk without it. |
| [AlsterPanorama.jpg](https://commons.wikimedia.org/wiki/File:AlsterPanorama.jpg) | Public domain | Public domain, but a 7000 x 1472 strip panorama of lit hotel and shop facades, with signage along the Jungfernstieg. Too thin to use as a section image. |
| [Alster hd pano.jpg](https://commons.wikimedia.org/wiki/File:Alster_hd_pano.jpg) | Public domain, Public domain | Public domain strip panorama, same problem, 6027 x 1698. |
| [Jungfernstieg im Advent.jpg](https://commons.wikimedia.org/wiki/File:Jungfernstieg_im_Advent.jpg) | CC BY-SA 3.0, GFDL | Dusk view of the Jungfernstieg and the Rathaus tower in Advent, lit shopfronts along the water (signage risk, not checked at full size). |
| [Hamburg (Berliner Tor) im Nebel.JPG](https://commons.wikimedia.org/wiki/File:Hamburg_(Berliner_Tor)_im_Nebel.JPG) | CC BY-SA 4.0 | Golden hazy fog over the city from above, soft and low contrast. The office towers at Berliner Tor carried IBM and SIEMENS signage on a different file in the earlier pass, so this view is a brand risk too (not checked at full size). |
| [Regen über Hamburg - panoramio.jpg](https://commons.wikimedia.org/wiki/File:Regen_%C3%BCber_Hamburg_-_panoramio.jpg) | CC BY-SA 3.0 | Storm sky over Hamburg, nice, but low detail and soft, a 2010 panoramio upload. |
| [Sonnenschein und Regen über Hamburg - panoramio.jpg](https://commons.wikimedia.org/wiki/File:Sonnenschein_und_Regen_%C3%BCber_Hamburg_-_panoramio.jpg) | CC BY-SA 3.0 | Rain curtain over roofs, soft, low detail. |
| [Hamburg-Nikolaifleet 10670z.jpg](https://commons.wikimedia.org/wiki/File:Hamburg-Nikolaifleet_10670z.jpg) | CC BY-SA 3.0 | Only 2909 px wide, dusk on the Nikolaifleet with lit restaurant frontages along the water (signage not checked at full size). |
| [Heiligengeistbrücke in der Blauen Stunde.jpg](https://commons.wikimedia.org/wiki/File:Heiligengeistbr%C3%BCcke_in_der_Blauen_Stunde.jpg) | CC BY 2.0 | Lovely blue hour bridge, but the uploader says it stands in front of the Steigenberger Hotel, so hotel name lettering is a brand risk (not checked at full size). |
| [Hamburg bei Dämmerung (5412205429).jpg](https://commons.wikimedia.org/wiki/File:Hamburg_bei_D%C3%A4mmerung_(5412205429).jpg) | CC BY-SA 2.0 | Only 2832 px wide, branches over the frozen harbour at dusk, soft. |
| [2014-10-25 Hamburg07 - Flickr - Ungry Young Man.jpg](https://commons.wikimedia.org/wiki/File:2014-10-25_Hamburg07_-_Flickr_-_Ungry_Young_Man.jpg) | CC BY 2.0 | Hazy dusk roofline, low contrast and soft. |
| [Hamburg Lotsekanal blue hour.jpg](https://commons.wikimedia.org/wiki/File:Hamburg_Lotsekanal_blue_hour.jpg) | CC BY 4.0 | Misty blue hour, but a sailing ship's bow and rigging are the subject, so it reads as a ship portrait rather than a place. |
| [Marseiller Promenade Hamburg-Neustadt at night 2024-12-30 02.jpg](https://commons.wikimedia.org/wiki/File:Marseiller_Promenade_Hamburg-Neustadt_at_night_2024-12-30_02.jpg) | CC0 | Shortlisted (CC0, wet night path), then rejected at full size: a lit IntercityHotel sign is plainly readable at the top right, plus graffiti tags on the left wall and a yellow-green sky cast. Cropping the hotel out of the reachable 3840 px rendition leaves about 2350 px, under the 2400 px floor, and the 8368 px original could not be fetched (upload.wikimedia.org HTTP 429). |
| [Marseiller Promenade Hamburg-Neustadt at night 2024-12-30 01.jpg](https://commons.wikimedia.org/wiki/File:Marseiller_Promenade_Hamburg-Neustadt_at_night_2024-12-30_01.jpg) | CC0 | Same series as the kept frame 02. |
| [Marseiller Promenade Hamburg-Neustadt at night 2024-12-30 03.jpg](https://commons.wikimedia.org/wiki/File:Marseiller_Promenade_Hamburg-Neustadt_at_night_2024-12-30_03.jpg) | CC0 | Same series as the kept frame 02. |
| [Rathaus Hamburg bei Nacht.jpg](https://commons.wikimedia.org/wiki/File:Rathaus_Hamburg_bei_Nacht.jpg) | CC0 | CC0 Rathaus at night, monumental and HDR-heavy. Reads as a postcard of the city government, not the black box mood. |
| [Frühjahrsnebel 2.jpg](https://commons.wikimedia.org/wiki/File:Fr%C3%BChjahrsnebel_2.jpg) | CC BY-SA 3.0 | Spring fog over water. Location only given as 53.65 N 10.0 E (north of the city, not the east), so it can't be captioned as Hamburg's east. |
| [Frühjahrsnebel 1.jpg](https://commons.wikimedia.org/wiki/File:Fr%C3%BChjahrsnebel_1.jpg) | CC BY-SA 3.0 | Same series, same location doubt. |
| [Frühjahrsnebel 6.jpg](https://commons.wikimedia.org/wiki/File:Fr%C3%BChjahrsnebel_6.jpg) | CC BY-SA 3.0 | Same series, same location doubt. |
| [Frühjahrsnebel 5.jpg](https://commons.wikimedia.org/wiki/File:Fr%C3%BChjahrsnebel_5.jpg) | CC BY-SA 3.0 | Same series, same location doubt. |
| [Frühjahrsnebel 4.jpg](https://commons.wikimedia.org/wiki/File:Fr%C3%BChjahrsnebel_4.jpg) | CC BY-SA 3.0 | Same series, same location doubt. |
| [Bodennebel1.jpg](https://commons.wikimedia.org/wiki/File:Bodennebel1.jpg) | CC BY-SA 3.0 | Ground fog at sunrise, location not stated well enough to caption, and a bright sun disc blows out. |
| [Hamburg 20260815 Jungfernbrücke & St. Katharinen 02.jpg](https://commons.wikimedia.org/wiki/File:Hamburg_20260815_Jungfernbr%C3%BCcke_%26_St._Katharinen_02.jpg) | CC0 | Same spot as the kept frame 04, shot from the bridge deck with the walkway filling the foreground. |
| [Hamburg 20260815 Jungfernbrücke & St. Katharinen 03.jpg](https://commons.wikimedia.org/wiki/File:Hamburg_20260815_Jungfernbr%C3%BCcke_%26_St._Katharinen_03.jpg) | CC0 | Same spot as the kept frame 04, near duplicate. |
| [Hamburg 20260815 St. Katharinen 03.jpg](https://commons.wikimedia.org/wiki/File:Hamburg_20260815_St._Katharinen_03.jpg) | CC0 | Same church from across the water, the spire is pushed right and a bridge cuts the left edge. Frame 04 is the stronger of the set. |

### CC0 candidates seen in the triage and dropped before a full licence read

These came up in the `hastemplate:Cc-zero` searches, so they are very likely CC0, but they failed on sight and their licence was not read in full.

| File | Reason |
|---|---|
| File:Reiherstieg Hamburg at night 2023-12-31 01 to 04.jpg | Near black industrial canal at night, empty, almost no detail. |
| File:Ellerntorrsbrücke Night.jpg, File:Ellerntorsbrücke Night2.jpg | Very dark phone shots of a canal bridge, noisy. |
| File:Hamburg.Skyline.Vollmond.P1105210.jpg, P1105219.jpg | Only about 2550 px wide, dark and noisy harbour skyline. |
| File:Dockland.P1104975.jpg and the Elbphilharmonie.P11052xx night series | Dark, soft night shots across the Elbe, the Dockland office building is the subject. |
| File:Monte.Verde.Singapore.P11050xx and similar | Container ships at night with shipping line names on hulls and boxes. |
| File:Hamburg canal – Panorama (Greg Zaal via Poly Haven).jpg, File:Hansaplatz – Panorama (Greg Zaal via Poly Haven).jpg | Equirectangular HDRI panoramas, not usable as a flat photo. |
| File:Night view of the Hamburg City Hall.jpg | Rathaus at night, same reason as the Rathaus frame below. |
| File:Alter Elbtunel - Flickr - gRuGo.jpg | Black and white tunnel interior with identifiable people. |
| File:Hamburg 20260815 St. Petri Aussicht and Elbphilharmonie Ausblick series (NutzerAusBerlin) | Clear but flat midday documentation, busy with market stalls, tour buses, branded musical theatre domes and HADAG ferries. One frame from this photographer's set (St. Katharinen, 04) was kept for the bright end. |
| File:S-Bahn Reinbek.jpg | DB logo on the train front (also rejected on the earlier pass). The only CC0 picture that names Reinbek, so every Reinbek image kept here is CC BY or CC BY-SA. |

### Not reachable today, for the record

- The Commons API and api.wikimedia.org returned HTTP 429 (envoy rate limit) all session.
- upload.wikimedia.org returned HTTP 429 with `Retry-After: 600` for a stretch after the thumbnail triage. The originals were fetched after that window, one at a time, 20 seconds apart.
- web.archive.org reset the connection, so the Unsplash publication dates were not re-checked at the Wayback Machine. See the licence doubt note on the three Unsplash imports in the manifest.
- mixkit.co/terms/ returned a Cloudflare "Just a moment" page (HTTP 429) on the single try today. Clause 9 was quoted from the earlier read (2026-10-21) in `../ASSETS.md`.
