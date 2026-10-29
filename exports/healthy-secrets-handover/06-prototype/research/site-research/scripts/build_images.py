"""Build hs/images.json from the image map, the Instagram feed record and hand written
descriptions (each written after opening the image). usage: python3 -I build_images.py <hs_dir>
"""
import hashlib
import json
import os
import sys

from PIL import Image

HS = sys.argv[1]
imap = json.load(open(os.path.join(HS, "img_map_raw.json")))
feed = json.load(open(os.path.join(HS, "instagram_feed.json")))


def info(path):
    p = os.path.join(HS, path)
    im = Image.open(p)
    return {"pixels": f"{im.size[0]}x{im.size[1]}", "mode": im.mode,
            "sha256": hashlib.sha256(open(p, "rb").read()).hexdigest()[:16]}


# ---- website images (static.wixstatic.com, account prefix aadec6 = the client's own uploads)
SITE = {
 "aadec6_5cde0b6467d14cc38b8593f0e311db5c~mv2.jpg": dict(
   placement="Hero banner background behind the gold logo and the lines 'Ernährung is(s)t die beste Medizin' / '- ein österreichisches Familienunternehmen -' on Home, About (general-9) and Über uns. No alt text.",
   desc="Alpine landscape. Green meadow valley with a gravel path, dark spruce forest, rocky mountains under cloud, a hiker with a backpack sitting on a rock in the right foreground, seen from behind.",
   flags=["landscape"], origin="UNKNOWN (no caption, could be own or stock)"),
 "aadec6_0652b84f214c4068bf3e6353c78c2a46~mv2.png": dict(
   placement="Gold logo centred on the hero banner (Home, About, Über uns). alt 'Logo Gold', title 'Logo transparent.png'.",
   desc="Logo, gold (#C5A253) on transparent. Circular wordmark HEALTHY SECRETS set around a thin circle, two crossed antique keys in the centre.",
   flags=["logo"], origin="client asset"),
 "aadec6_f409693665e44b498a5afb3765da948c~mv2.png": dict(
   placement="Present on all 22 pages (site wide master page). alt 'Logo Schwarz', title 'Logo transparent.png'. Exact on screen position not confirmed in the screenshots.",
   desc="Logo, thin black line version on transparent. Same circular HEALTHY SECRETS wordmark with crossed keys.",
   flags=["logo"], origin="client asset"),
 "aadec6_bfdd7aa0b205455d8991c40f8c571143~mv2.png": dict(
   placement="Favicon and apple touch icon on every page, and a footer mascot (speech bubble 'I ♥ Darm gesundheit') on all 22 pages. alt 'Darmgesundheitsbär'.",
   desc="Mascot illustration. Beige fluffy bear like creature holding a cup of tea, speech bubble 'I ♥ Darm gesundheit', warm brown glow behind.",
   flags=["mascot"], origin="client asset"),
 "aadec6_ee8f729bb6d840af8fdb6fb1686d645c~mv2.jpg": dict(
   placement="Home, background of the scrolling banner 'Omega-3 Granola available now'. alt '9bb23a5e-4c32-4910-b6c9-c96d1b606516_edited.jpg' (a file name, not a description).",
   desc="Close up of granola: puffed spelt, oat clusters, freeze dried red berry pieces and a dark berry.",
   flags=["food", "product_texture"], origin="client upload, appears to be their Omega-3 Müsli (not stated)"),
 "aadec6_7d69bc6e536842f083feb9c275531031~mv2.png": dict(
   placement="Home, inside the three tile repeater (items 1 and 3). alt and title 'Retro Neutral Self Care Quote Instagram Portrait Post (1).png', a Canva template name. Not visible in our screenshots, the tiles showed videos and a photo in front.",
   desc="Styled photo of matcha being poured from a white jug into a tall glass of iced green matcha latte, plants and a marble block behind.",
   flags=["drink"], origin="UNKNOWN, template name suggests a Canva template image; do not present as their product"),
 "aadec6_5c60f7332aa14199a091d544696b317a~mv2.jpg": dict(
   placement="Home, middle arch tile above 'Gesundheit is(s)t Alltag - Lebensmittel mit Sinn'. alt 'WhatsApp Image 2026-02-07 at 13.51_edited.jpg'.",
   desc="Three smiling adults behind a white table at what looks like a market or pop up stand: a woman in a grey scarf and cardigan, a man in a striped shirt wearing a pink apron printed 'Vivamayr is a Lifestyle', a blonde woman in a tie dye top and green vest. On the table, two large bulk bags labelled Matcha Latte Fibre Flow and Moon Milk Fibre Flow, an Oatly carton and a metal shaker. Clothes on a rail behind.",
   flags=["people_unnamed", "products"], origin="client upload (WhatsApp photo). Names of the people are not given anywhere on the page. Apron shows another brand (Vivamayr), relationship UNKNOWN"),
 "a3c153_ae122e1b339f4047b9c08ea34e64a8b4~mv2.jpg": dict(
   placement="Home, inside repeater item 2. No alt. Not visible in our screenshots.",
   desc="Hand with red nail polish holding a paintbrush with yellow paint over an open tin of yellow paint and yellow colour swatches on white.",
   flags=["stock_likely"], origin="Different media account prefix (a3c153, not the client's aadec6), so most likely Wix media library stock. Not usable as brand imagery"),
 "aadec6_4f44174a88154768b46290505830d7c3~mv2.jpg": dict(
   placement="Home, background of the 'Wohlbefinden made in Austria / SHOP' tile (links to /shop, the teas). alt 'WhatsApp Image 2025-11-21 at 23.57_edited.jpg'.",
   desc="Black and white photo in a commercial kitchen. Two people in hairnets and white coats at a steel bench, one writing on a sheet, big clear bags of granola, a measuring jug and crates around them.",
   flags=["production", "people_unnamed"], origin="client upload (WhatsApp photo, Nov 2025). heute.at says production is in Favoriten; Impressum Gewerbestandort is Gudrunstraße 11/6B, 1100 Wien. The photo itself does not say where it is"),
 "aadec6_547dbb06a8cb4c7585dbd2b0ffcc84f2~mv2.jpg": dict(
   placement="Home, background of the 'Darmgesundheit made in Austria / SHOP' tile (links to /shop-2, Fibre Flow). alt 'WhatsApp Image 2025-11-21 at 23.57_edited.jpg'. Showed as alt text in one of our renders (lazy load on our side); the file itself returns 200 and decodes.",
   desc="Black and white photo of a tiled commercial kitchen: a person in a hairnet leaning on the door of a large combi steamer oven, steel trolleys and a sink around.",
   flags=["production", "people_unnamed"], origin="client upload (WhatsApp photo, Nov 2025)"),
 "aadec6_0574ed84ce214c5086d852393d35287d~mv2.png": dict(
   placement="Home, footer mascot row (with the 'I ♥ gesunde Darmflora' bubble). alt 'Maskottchen Spaßgetränk'.",
   desc="Mascot illustration. Orange fluffy creature with small antlers drinking through a straw from a teacup that contains a smiling poo emoji, gold glow.",
   flags=["mascot"], origin="client asset"),
 "aadec6_9a28af0ade554071ba6d3ca8636eece8~mv2.png": dict(
   placement="Home, footer mascot row (with the 'I ♥ regional Quality' bubble). alt 'Matcha Maus'.",
   desc="Mascot illustration. Cream coloured fox or cat like creature with an orange crest sipping a green matcha drink through a straw, dark background with glow.",
   flags=["mascot"], origin="client asset"),
 "aadec6_b97e7be7022c4d9c993dc4400858b550~mv2.png": dict(
   placement="Impressum page. alt 'Darmgesundheitsbär Herz'.",
   desc="Mascot illustration. Golden fluffy creature hugging a big red orange heart, olive gold glow.",
   flags=["mascot"], origin="client asset"),
 "aadec6_bdc59f3e0d32461c855678c1efc7b3bf~mv2.png": dict(
   placement="Impressum page, next to the 'SITZ' (registered seat) address. alt 'Sitz Tiere'.",
   desc="Mascot illustration. White fox like creature sitting in an armchair drinking matcha, orange antlered creature pointing at it, the word 'Sitz' at the top (a pun on the seat address).",
   flags=["mascot"], origin="client asset"),
 "aadec6_8e321b061db4446583f1707875096690~mv2.png": dict(
   placement="Impressum page. alt 'Taubers Tier'. Byte identical to aadec6_fc88a8...",
   desc="Mascot illustration. Grey fluffy bunny with big eyes holding a polka dot bowl of cereal balls and a spoon.",
   flags=["mascot"], origin="client asset"),
 "aadec6_fc88a8fcb88d457db81a0d6fdc0bfd68~mv2.png": dict(
   placement="Merch page (shop-1), small mascot over the Coming Soon banner. alt 'Tauberstier', title 'Maskottchen 4.png'. Byte identical to aadec6_8e321b...",
   desc="Same grey bunny mascot as aadec6_8e321b (duplicate file).",
   flags=["mascot", "duplicate"], origin="client asset"),
 "aadec6_fd0d31f84244414da9844fcec337b3c3~mv2.png": dict(
   placement="Banner on the Kombucha and Merch pages, both of which show 'Es gibt keine Produkte zum Anzeigen'. alt 'Blue Coming Soon Stay Tuned Instagram Post.png' (Canva template name).",
   desc="Pink letter tiles spelling COMING SOON on pale blue, small text 'Stay Tuned' and 'New Products coming'.",
   flags=["placeholder_graphic"], origin="template graphic"),
 "aadec6_15a1220928af439e97d7080db75b46b1~mv2.png": dict(
   placement="Über uns, left of the two upper team blocks, rendered directly above the heading 'Leonie Walkner BSc.' (desktop and phone). alt 'Leonie'.",
   desc="Black and white cut out portrait on transparent background: young woman with long wavy blond hair, white top and patterned light cardigan, smiling at camera, chest up.",
   flags=["portrait"], origin="client asset",
   pairing="alt text says 'Leonie' (COMPANY CLAIM via alt) and it renders directly above 'Leonie Walkner BSc.'. CARD CONTAINMENT FAILS: the smallest HTML container holding this image also holds the names 'Leonie Walkner BSc.' and 'Dr. Stephanie Walkner' and two images. Treat as UNVERIFIED pairing; run tools/verify_portraits.py at build time"),
 "aadec6_864fed64be034482b5a4d2a6c4867e3d~mv2.png": dict(
   placement="Über uns, right of the two upper team blocks, rendered directly above 'Dr. Stephanie Walkner'. alt 'Stephanie', title '49be6236-f348-4901-8e73-32c06c761cd5_edi'.",
   desc="Black and white cut out portrait on transparent background: woman with dark hair tied back, patterned V neck blouse with small motifs, smiling, chest up.",
   flags=["portrait"], origin="client asset",
   pairing="alt text says 'Stephanie' (COMPANY CLAIM via alt), renders above 'Dr. Stephanie Walkner'. CARD CONTAINMENT FAILS (shares smallest container with two names and two images). UNVERIFIED pairing"),
 "aadec6_9a1de719627849c0ac2f49e6b71ab28d~mv2.png": dict(
   placement="Über uns, lower team block, rendered directly above 'Dr. Nikolaus Walkner'. alt 'Niki'.",
   desc="Black and white cut out portrait on transparent background: young man with short swept hair, grey hooded sweatshirt over a collared shirt, smiling, chest up.",
   flags=["portrait"], origin="client asset",
   pairing="alt text says 'Niki' (COMPANY CLAIM via alt), renders above 'Dr. Nikolaus Walkner'. CARD CONTAINMENT FAILS (smallest container holds all three names and three images). UNVERIFIED pairing"),
}
PRODUCT_IMG = {
 "aadec6_ff79bf44953045a6ab89d8a0d1a0125a~mv2.png": ("Chai Latte Fibre Flow | 215g 14 Portionen", "Holographic silver stand up pouch, cream label 'Chai Latte Fibre Flow' with the grey bunny mascot holding a mug and a cinnamon stick, composited on a blue sky with clouds."),
 "aadec6_34fa2757f7d4486d9b32eb68ded155b3~mv2.png": ("Moon Milk Fibre Flow 215g | 14 Portionen", "Holographic silver stand up pouch, dark blue label 'Moon Milk Fibre Flow' with a sleepy cream mascot in a nightcap holding a cup, on a blue sky."),
 "aadec6_fa4cd3adb0ba44cd94a84629a4025c14~mv2.png": ("Matcha Latte Fibre Flow 215g | 14 Portionen", "Holographic silver stand up pouch, pale green label 'Matcha Latte Fibre Flow' with an orange mascot inside a drawn jar, on a blue sky."),
 "aadec6_dcc5c15556f24e7bab83058e50256b83~mv2.png": ("Omega-3 Müsli Red Berry Mix 300g", "Kraft paper stand up pouch with a clear window showing granola, pink and red striped label 'Omega-3 Müsli Red Berry Mix' with a mascot holding a bowl, on a blue sky."),
 "aadec6_736864eb6ea14908becc25fe13f75707~mv2.png": ("Haferbrot Backmischung 500g", "Clear stand up pouch full of oat flakes and seeds, red label 'Haferbrot Backmischung' with two mascots, on a blue sky."),
 "aadec6_49fee10b7cb047c886064ec2764a73d4~mv2.png": ("Lullaby Leaves 50g", "Tall glass jar with a gold lid filled with dried herbs, white label 'Lullaby Leaves' with the small round logo, on a blue sky."),
 "aadec6_03229674429f45c6ab36f7dde8352108~mv2.png": ("Slimming Sips 50g", "Tall glass jar with a gold lid filled with dried tea, white label reading 'Slimming Sip(s)' with the round logo, on a blue sky."),
}
for k, (name, d) in PRODUCT_IMG.items():
    SITE[k] = dict(placement=f"Main product image of '{name}' on its product page, the Shop page and its category page (and the Fibre Flow 'more products' strip on every product page for the three Fibre Flow pouches). alt = product name on gallery tiles, empty on the main image.",
                   desc=d, flags=["product"], origin="client asset (product packshot)")

out = []
for k, v in SITE.items():
    f = "img/site/" + k.replace("~", "_")
    m = imap.get(k, {})
    rec = {"file": f, "source_url": "https://static.wixstatic.com/media/" + k, "group": "website",
           "pages": m.get("pages"), "client_alt": m.get("alts"), "client_title": m.get("titles"),
           **info(f), "client_placement": v["placement"], "what_is_in_frame": v["desc"],
           "flags": v["flags"], "origin_or_rights": v["origin"], "status": "VERIFIED (downloaded original, opened and looked at, 2026-10-19)"}
    if "pairing" in v:
        rec["name_face_pairing"] = v["pairing"]
    out.append(rec)
out.append({"file": "img/logo/wix_shape_11062b_73a434e6.svg", "source_url": "https://static.wixstatic.com/shapes/11062b_73a434e62eee447792154a66d153945d.svg",
            "group": "website", "pages": imap["11062b_73a434e62eee447792154a66d153945d.svg"]["pages"], "client_placement": "Heart icon used between repeats in the scrolling marquees (Home, Shop, Merch). Wix library shape (prefix 11062b), not a client asset. The /media/ URL returned 403, the /shapes/ URL 200.",
            "what_is_in_frame": "Simple heart shape SVG.", "flags": ["icon", "wix_library"], "status": "VERIFIED"})

# ---- videos
out += [
 {"file": "img/video/aadec6_5eab9092_gut-health-era_1080p.mp4", "source_url": "https://video.wixstatic.com/video/aadec6_5eab90928f6545c59a95421e6ae21bb2/1080p/mp4/file.mp4",
  "group": "website_video", "pages": ["home"], "client_placement": "Home, left arch tile above 'Gesundheit is(s)t kein Tabuthema - Essen ist die erste Medizin'. aria label 'Yellow Bold Summer Instagram Reel (2).mp4' (a template name).",
  "pixels": "1080x1920, 11.6 s, h264", "what_is_in_frame": "Young women picnicking in a sunny meadow, big cream serif title 'In your GUT HEALTH ERA', small 'BY HEALTHY SECRETS'. Frames viewed in hs/sheets/video_gut-health-era_frames.jpg.",
  "flags": ["video", "people_unnamed"], "origin_or_rights": "UNKNOWN. Template name and footage style suggest stock footage, so these people must not be presented as customers or the team", "status": "VERIFIED (downloaded, frames extracted and viewed)"},
 {"file": "img/video/stock_11062b_33e52bef_480p.mp4", "source_url": "https://video.wixstatic.com/video/11062b_33e52bef7e1b4dada55c530766f19162/480p/mp4/file.mp4",
  "group": "website_video", "pages": ["home"], "client_placement": "Home, right arch tile above 'Gesundheit is(s)t naturbelassen - Prävention ganz aus der Natur'.",
  "pixels": "1920x1014 source (480p copy saved), 19 s", "what_is_in_frame": "A black and white cow grazing in a green field in front of a spruce forest and farm buildings.",
  "flags": ["video", "wix_stock"], "origin_or_rights": "Wix library video (prefix 11062b). Not brand imagery", "status": "VERIFIED (frames viewed)"},
 {"file": "img/video/stock_11062b_6da09ea0_480p.mp4", "source_url": "https://video.wixstatic.com/video/11062b_6da09ea096de408fa7bedf7cf31d71f3/480p/mp4/file.mp4",
  "group": "website_video", "pages": ["home", "shop-1", "shop-4"], "client_placement": "Background of the 'FROM AUSTRIA WITH LOVE' marquee strip.",
  "pixels": "1920x1080 source (480p copy saved)", "what_is_in_frame": "Blue sky with drifting white clouds.",
  "flags": ["video", "wix_stock"], "origin_or_rights": "Wix library video", "status": "VERIFIED (frames viewed)"},
]

# ---- Instagram feed (embedded on the client's homepage)
IG = {
 "ig00_DepEBKBjvMO_c00.jpg": ("Opening day. Text overlay 'UNSER OPENING WAR...'. Three adults (two women, one man) posing at the café door under the red and white striped awning; one woman wears a sweater with a teddy print.", ["cafe_exterior", "people_unnamed", "text_overlay"]),
 "ig00_DepEBKBjvMO_main.jpg": ("Duplicate of ig00 c00 (cover of the carousel).", ["duplicate"]),
 "ig00_DepEBKBjvMO_c01.jpg": ("Outside the café on opening day: a blue flag on the facade, guests seen from behind holding up drink bottles and phones.", ["cafe_exterior", "event", "people_unnamed"]),
 "ig00_DepEBKBjvMO_c03.jpg": ("Close up at an aluminium checker plate table: hands opening a bottled drink, another white bottle, a bowl; guests in coats.", ["drink", "cafe_interior_detail", "people_unnamed"]),
 "ig00_DepEBKBjvMO_c06.jpg": ("Hand held prize wheel ('Glücksrad') in rainbow segments with handwritten prizes and 'WIN' in the centre, street behind.", ["event"]),
 "ig00_DepEBKBjvMO_c08.jpg": ("Inside the café: a smiling young woman holds up a white T shirt with a small print; glass drinks fridge, a ladder and a pram behind.", ["cafe_interior", "people_unnamed", "merch_possible"]),
 "ig01_Delokaoja8W_main.jpg": ("Graphic: sage green background, 'WE ARE OPEN!' in large white type, pink pill 'Wildpretmarkt 1, 1010 Wien', smaller pill 'Functional Food & Drinks für einen gesunden Darm', three hands holding yellow, green and white bottled drinks with mascot labels.", ["graphic", "drink", "text_overlay"]),
 "ig02_DejRW75jlY3_c00.jpg": ("Selfie of a man with glasses holding up the printed Heute newspaper with the Gut Health Club article circled in red.", ["press", "people_unnamed"]),
 "ig02_DejRW75jlY3_main.jpg": ("Duplicate of ig02 c00.", ["duplicate"]),
 "ig02_DejRW75jlY3_c01.jpg": ("Graphic on navy: 'WIR SIND MIT UNSEREM GUT HEALTH CLUB IN DER HEUTIGEN AUSGABE!' over a screenshot of the heute.at article.", ["graphic", "press", "text_overlay"]),
 "ig02_DejRW75jlY3_c02.jpg": ("Three adults and a black and tan spaniel type dog sitting at small metal bistro tables outside the café under the striped awning; sticker 'NICHT VERGESSEN!'. Same scene as the gastro.news hero photo.", ["cafe_exterior", "people_unnamed", "dog", "text_overlay"]),
 "ig02_DejRW75jlY3_c03.jpg": ("Graphic: pale blue grey background, navy bold 'GUT HEALTH CLUB OPENING', coral pill '17.10. ab 10 Uhr Wildpretmarkt 1', two mascots.", ["graphic", "text_overlay"]),
 "ig02_DejRW75jlY3_c04.jpg": ("Café interior: checker plate table with frozen yoghurt in a blue dotted footed cup, a bowl, iced coffee, espresso and water; behind, a steep white ladder stair to a mezzanine, the white letterboard menu, a striped drum pendant lamp, shelves of granola jars, blue grey tiled counter. Stickers 'ES WIRD SOGAR EIN GLÜCKSRAD GEBEN!' and 'UND DIE ERSTEN 10 GÄSTE ERHALTEN EINE BESONDERE ÜBERRASCHUNG!'.", ["cafe_interior", "food", "drink", "menu_board", "text_overlay"]),
 "ig03_Dei5PLED3KH_thumb.jpg": ("Reel cover: pale pink background, orange mascot, sage pill 'NOCH 1 TAG BIS ZUM OPENING'.", ["graphic", "text_overlay"]),
 "ig04_DehQHw2DC9x_thumb.jpg": ("Reel cover: sage background, pill 'MAKE A MATCHA LATTE WITH ME', layered iced matcha latte in a tall glass.", ["graphic", "drink", "text_overlay"]),
 "ig07_DeWLvnPCaGU_thumb.jpg": ("Duplicate of ig04 (same reel cover reposted).", ["duplicate"]),
 "ig11_DeJF_OIkoiT_thumb.jpg": ("Duplicate of ig04 (same reel cover reposted).", ["duplicate"]),
 "ig05_DeexWnDADJw_thumb.jpg": ("Three hands reaching out of the café doorway holding yellow, green and white bottled drinks; a metal bistro table and folding chairs on the pavement, parked cars across the street. No overlay.", ["cafe_exterior", "drink"]),
 "ig06_DeZoG7FmfO3_thumb.jpg": ("A young blonde woman holding up a key, shelves of product pouches behind (inside the shop).", ["cafe_interior", "people_unnamed"]),
 "ig08_DeTpFIBjg7d_c00.jpg": ("Giveaway post 'GEWINNSPIEL': smiling young blonde woman holding the three Fibre Flow pouches (Matcha Latte, Moon Milk, Chai Latte); sticker 'Gewinne ein Fibre Flow Paket im Wert von 90€'.", ["products", "people_unnamed", "text_overlay"]),
 "ig08_DeTpFIBjg7d_main.jpg": ("Duplicate of ig08 c00.", ["duplicate"]),
 "ig08_DeTpFIBjg7d_c01.jpg": ("Graphic on navy with serif type: 'Was du dafür tun musst?' and the three giveaway steps, two mascots.", ["graphic", "text_overlay"]),
 "ig09_DePUdZECghV_thumb.jpg": ("Café interior without overlay: checker plate table with frozen yoghurt, espresso and iced latte; ladder stair, orange stool, shelves of granola jars, menu board on the wall.", ["cafe_interior", "food", "drink"]),
 "ig10_DeMvsl7CjYF_thumb.jpg": ("Close up of a black and tan spaniel type dog licking frozen yoghurt from a white dotted footed cup held out by a hand. The post caption calls the dog 'Chefin Rosi'.", ["dog", "food"]),
 "ig12_DeHzzngkh5m_thumb.jpg": ("Duplicate of ig10.", ["duplicate"]),
 "ig13_DeHmFxBj7YL_thumb.jpg": ("Reel cover: sage background, white mascot hugging a kombucha bottle, pill 'SO HEALTHY IST UNSER KOMBUCHA'.", ["graphic", "text_overlay"]),
 "ig14_DeFBKVeipEX_main.jpg": ("'WHERE to FIND US' graphic: a map of Vienna's first district with a pin on Wildpretmarkt 1, a phone style photo of feet in pointed shoes on paving, matcha and iced coffee stickers.", ["graphic", "map", "text_overlay"]),
 "ig15_DeBhvmaCrn4_thumb.jpg": ("Street scene in the inner city, two people talking by a traffic sign; text 'Tonaufnahme geleaked von viralem \"Dealer Video\" in Wiener Innenstadt'.", ["street", "people_unnamed", "text_overlay"]),
 "ig16_Dd-2H7UkR-e_thumb.jpg": ("Man in a green blazer and glasses seated, hand on chin, caption text 'JA MIR'.", ["people_unnamed", "text_overlay"]),
 "ig25_DdjwopwDklx_thumb.jpg": ("Duplicate of ig16.", ["duplicate"]),
 "ig17_Dd9S0yTDjTi_thumb.jpg": ("Reel cover: pale blue grey background, two mascots, navy pill 'WIE HEALTHY IST DEIN DARM?'.", ["graphic", "text_overlay"]),
 "ig18_Dd6trfaTv4w_thumb.jpg": ("Three hands holding bottled drinks out of the café door, bistro chair, street. No overlay.", ["cafe_exterior", "drink"]),
 "ig19_Dd4pi7hO7iT_thumb.jpg": ("Motion blurred woman passing in front of the café window under the striped awning; text 'SHERLOCK'.", ["cafe_exterior", "text_overlay"]),
 "ig20_Dd4QU2ijafa_thumb.jpg": ("Man with glasses on a city street; text 'POV: DIE JÜNGSTE SCHWESTER HAT DIE IDEE GEMEINSAM ALS GESCHWISTER EIN CAFÉ AUFZUMACHEN.'", ["people_unnamed", "text_overlay"]),
 "ig21_Ddy_SJIDpte_c00.jpg": ("Frozen yoghurt with granola and berries in a blue and white dotted footed cup, latte glass, blue and white patterned porcelain; overlay 'OPENING Gut Health Club 17. OKTOBER 2026' and a bunny mascot.", ["food", "drink", "text_overlay"]),
 "ig21_Ddy_SJIDpte_main.jpg": ("Duplicate of ig21 c00.", ["duplicate"]),
 "ig21_Ddy_SJIDpte_c01.jpg": ("A man's hands setting down a wooden tray with latte, espresso, water and a bowl on a checker plate table; three jars of Omega-3 Müsli behind; red banner 'DIE ERSTEN 10 BESUCHER*INNEN ERHALTEN EIN GRATIS ÜBERRASCHUNGS-GOODIE!'.", ["food", "drink", "products", "text_overlay"]),
 "ig21_Ddy_SJIDpte_c02.jpg": ("Clock graphic: 'AB 10 UHR GEÖFFNET!' over a bowl of oats with berry compote; hour numerals 10 to 18 around it, 10 and 18 in coral, the rest navy.", ["graphic", "food", "hours_hint", "text_overlay"]),
 "ig21_Ddy_SJIDpte_c03.jpg": ("Three adults (two women, one man) standing arm in arm at the café entrance under the striped awning; sticker 'Wir freuen uns auf euch!'.", ["cafe_exterior", "people_unnamed", "text_overlay"]),
 "ig22_Dds_H2ziooQ_thumb.jpg": ("Reel cover: pink background, sage pill 'KNUSPERMÜSLI FÜR DEINE HERZGEFÄSSGESUNDHEIT', Omega-3 Müsli pouch.", ["graphic", "product", "text_overlay"]),
 "ig23_DdospsPiBus_thumb.jpg": ("Reel cover: sage background, calendar icon, pill 'WIR ERÖFFNEN AM 17. OKTOBER!'.", ["graphic", "text_overlay"]),
 "ig24_DdmJjybjh-D_c00.jpg": ("Three adults at the café front, the man seated at a bistro table; text 'KANNST DU UNSER VERSTECKTES ERÖFFNUNGSDATUM IM BILD FINDEN?'.", ["cafe_exterior", "people_unnamed", "text_overlay"]),
 "ig24_DdmJjybjh-D_main.jpg": ("Duplicate of ig24 c00.", ["duplicate"]),
 "ig24_DdmJjybjh-D_c01.jpg": ("A man in a navy jacket and white trousers leaning in the café doorway, display window and striped awning beside him. No overlay.", ["cafe_exterior", "people_unnamed"]),
 "ig24_DdmJjybjh-D_c02.jpg": ("Smiling blonde woman in a blue top holding a Moon Milk Fibre Flow pouch toward the camera, plain white wall. No overlay.", ["product", "people_unnamed"]),
 "ig24_DdmJjybjh-D_c03.jpg": ("Graphic on navy: 'Follow für eine bessere Darmgesundheit!', 'GUT HEALTH CLUB WILDPRETMARKT 1, 1010 WIEN COMING SOON...', cut out of a man pointing up.", ["graphic", "people_unnamed", "text_overlay"]),
 "ig26_Ddg9_n8EdDB_thumb.jpg": ("Reel cover: pale grey background, navy pill 'HEALTHY SECRETS GELEAKED'.", ["graphic", "text_overlay"]),
 "ig27_DdbmwsoAGjI_thumb.jpg": ("Man with glasses seated at a metal bistro table outside; pill 'KLEINSTER SCHANIGARTEN WIENS?'.", ["cafe_exterior", "people_unnamed", "text_overlay"]),
 "ig28_DdWq_vdiYYC_thumb.jpg": ("Reel cover: sage background, pill 'SCHON WIEDER EIN MATCHA LADEN...?', iced matcha cup with a mascot sitting on it.", ["graphic", "text_overlay"]),
 "ig29_DdUF8Jmj5Vs_thumb.jpg": ("Man in a navy blazer drinking a green matcha drink from a glass, seated outside under the red and white striped awning. No overlay.", ["cafe_exterior", "drink", "people_unnamed"]),
}
by_n = {f"ig{p['n']:02d}": p for p in feed}
for f, (d, flags) in IG.items():
    post = by_n[f[:4]]
    src = next((x["src"] for x in post["files"] if x.get("file") and x["file"].endswith(f)), None)
    out.append({"file": "img/instagram/" + f, "source_url": src, "group": "instagram_feed_on_homepage",
                "post_permalink": post["permalink"], "post_timestamp": post["timestamp"],
                "client_caption_de": post["caption_de"], **info("img/instagram/" + f),
                "client_placement": "Instagram Feed widget on the healthysecrets.at homepage ('More of us on Instagram' / @healthysecrets_at). Note: cdninstagram URLs expire; the local file is the copy.",
                "what_is_in_frame": d, "flags": flags,
                "origin_or_rights": "client's own Instagram post. People in it are not named by the post",
                "status": "VERIFIED (downloaded and opened, 2026-10-19)"})

# ---- press
PRESS = [
 ("img/press/gastronews_healthy-secrets-geschwister.jpg", "https://gastro.news/wp-content/uploads/2026/10/healthy-secrets-geschwister-scaled.jpg",
  "Hero photo of gastro.news 'Medizin trifft Matcha Latte' (14 Oct 2026). Credit in the article: '© Healthy Secrets'. File name 'geschwister' (siblings).",
  "Three adults (a woman in a light blue shirt, a man in a navy jumper, a blonde woman in white) and a black and tan spaniel type dog at small metal bistro tables outside the café, under the red and white striped awning, display window behind.",
  ["cafe_exterior", "people_group", "dog"], "Credited © Healthy Secrets, so client owned; ask the client before use. Group level claim from the press context and file name that these are the three siblings; no per person names in any caption"),
 ("img/press/gastronews_healthy-secrets-muesli.jpg", "https://gastro.news/wp-content/uploads/2026/10/healthy-secrets-muesli-scaled.jpg",
  "In article photo, caption '© Healthy Secrets'.",
  "Café table: frozen yoghurt with granola in a dotted footed cup, a tall latte macchiato, espresso in a blue and white cup, water glasses on a wooden tray, aluminium checker plate table; white display cabinets and framed pictures behind, shallow depth of field.",
  ["food", "drink", "cafe_interior"], "© Healthy Secrets (client owned)"),
 ("img/press/gastronews_healthy-secrets-drinks.jpg", "https://gastro.news/wp-content/uploads/2026/10/healthy-secrets-drinks-scaled.jpg",
  "In article photo, caption '© Healthy Secrets'.",
  "Three hands reaching out of the café doorway holding yellow, green and white bottled drinks, bistro table and folding chairs on the pavement, street behind.",
  ["cafe_exterior", "drink"], "© Healthy Secrets (client owned)"),
 ("img/press/gastronews_healthy-secrets-interior.jpg", "https://gastro.news/wp-content/uploads/2026/10/healthy-secrets-interior-scaled.jpg",
  "In article photo, caption '© Healthy Secrets'.",
  "Café interior: brown vintage armchair and an orange red stool in the foreground, white letterboard menu on a light grey wall, steep white ladder stair to a mezzanine, striped drum pendant lamp, white glass display cabinets, blue grey vertically tiled counter, an arched opening to a back area, light wood floor.",
  ["cafe_interior", "menu_board"], "© Healthy Secrets (client owned)"),
 ("img/press/heute_64a1e391_denise-auer.jpg", "https://heute-at-prod-images.imgix.net/2026/10/14/64a1e391-2a04-45e9-b2ea-e18d74dbc7c4.jpg",
  "Lead photo of heute.at (16 Oct 2026). Credit 'Denise Auer'. Caption: 'Nikolaus und Leonie Walkner haben gemeinsam mit ihrer Schwester Stephanie (nicht im Bild) den \"Gut Health Club\" gegründet.'",
  "A man in a dark suit and a blonde woman in white seated at a metal table inside the café with bowls and a drink; white display cabinet of products, framed pictures, the letterboard menu (full text readable, see SUMMARY), ladder stair, orange stools, blue grey tiles.",
  ["cafe_interior", "people_named_by_press", "menu_board"], "THIRD PARTY (photographer Denise Auer / Heute). Do not use without a licence. Press caption names the two people as Nikolaus and Leonie Walkner without saying who is where"),
]
for f, src, place, d, flags, rights in PRESS:
    out.append({"file": f, "source_url": src, "group": "press", **info(f), "client_placement": place,
                "what_is_in_frame": d, "flags": flags, "origin_or_rights": rights, "status": "VERIFIED (downloaded and opened)"})

json.dump(out, open(os.path.join(HS, "images.json"), "w"), ensure_ascii=False, indent=1)
print(len(out), "records;", sum(1 for r in out if r["group"] == "website"), "website,",
      sum(1 for r in out if r["group"] == "instagram_feed_on_homepage"), "instagram,",
      sum(1 for r in out if r["group"] == "press"), "press,", sum(1 for r in out if r["group"] == "website_video"), "video")
missing = [f for f in os.listdir(os.path.join(HS, "img/instagram")) if f not in IG]
print("instagram files without a record:", missing)
