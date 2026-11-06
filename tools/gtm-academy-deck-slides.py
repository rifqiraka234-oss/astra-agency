"""Generate the Google Slides requests for the GTM Academy pitch deck (v2, 6 Nov 2026), in the Astra deck style.

Usage. python3 tools/gtm-academy-deck-slides.py <commit sha of assets/gtm-deck> <out dir>
Writes one req2_<slide id>.json per slide, each sent as one batchUpdate to the presentation.
After generation, fixes made by hand in Slides on 6 Nov. acd06 Starter text shortened, acd11 boxes made shorter,
acd15 navy panel behind the contact block. Rerunning gives the pre fix layout.
Markup in text: **bold**, *italic*, ^^light^^. A line starting with '• ' becomes a bullet paragraph.
"""
import json, re, sys

SHA = sys.argv[1]
IMG = f"https://raw.githubusercontent.com/rifqiraka234-oss/astra-agency/{SHA}/assets/gtm-deck/"

WHITE = (253, 253, 253); DARK = (29, 29, 30); GREIGE = (230, 221, 216); NAVY = (13, 27, 56)
BLUE = (64, 91, 141); INK = (14, 27, 56); GREY = (200, 200, 200)

def rgb(c): return {"red": round(c[0]/255,3), "green": round(c[1]/255,3), "blue": round(c[2]/255,3)}
def E(pt): return int(pt * 12700)

class Slide:
    n = 0
    def __init__(self, sid, bg):
        self.sid = sid; self.k = 0
        self.req = [{"createSlide": {"objectId": sid, "slideLayoutReference": {"predefinedLayout": "BLANK"}}},
                    {"updatePageProperties": {"objectId": sid, "pageProperties": {"pageBackgroundFill": {"solidFill": {"color": {"rgbColor": rgb(bg)}}}},
                                              "fields": "pageBackgroundFill.solidFill.color"}}]
    def id(self):
        self.k += 1; return f"{self.sid}_{self.k}"
    def props(self, x, y, w, h):
        return {"pageObjectId": self.sid, "size": {"width": {"magnitude": E(w), "unit": "EMU"}, "height": {"magnitude": E(h), "unit": "EMU"}},
                "transform": {"scaleX": 1, "scaleY": 1, "translateX": E(x), "translateY": E(y), "unit": "EMU"}}
    def img(self, name, x, y, w, h):
        self.req.append({"createImage": {"objectId": self.id(), "url": IMG + name, "elementProperties": self.props(x, y, w, h)}})
    def rect(self, x, y, w, h, fill=None, line=None, shape="RECTANGLE", weight=1):
        i = self.id()
        self.req.append({"createShape": {"objectId": i, "shapeType": shape, "elementProperties": self.props(x, y, w, h)}})
        p = {}; f = []
        if fill: p["shapeBackgroundFill"] = {"solidFill": {"color": {"rgbColor": rgb(fill)}}}; f.append("shapeBackgroundFill.solidFill.color")
        else: p["shapeBackgroundFill"] = {"propertyState": "NOT_RENDERED"}; f.append("shapeBackgroundFill.propertyState")
        if line: p["outline"] = {"outlineFill": {"solidFill": {"color": {"rgbColor": rgb(line)}}}, "weight": {"magnitude": weight, "unit": "PT"}}; f += ["outline.outlineFill.solidFill.color", "outline.weight"]
        else: p["outline"] = {"propertyState": "NOT_RENDERED"}; f.append("outline.propertyState")
        self.req.append({"updateShapeProperties": {"objectId": i, "shapeProperties": p, "fields": ",".join(f)}})
        return i
    def vline(self, x, y, h, col=BLUE, w=1.2):
        self.rect(x, y, w, h, fill=col)
    def hline(self, x, y, wd, col=BLUE, h=1.0):
        self.rect(x, y, wd, h, fill=col)
    def rings(self, cx, cy, r, col=BLUE, vertical=True):
        dx, dy = (0, r*0.5) if vertical else (r*0.6, 0)
        self.rect(cx - r - dx/2, cy - r - dy/2, 2*r, 2*r, line=col, shape="ELLIPSE", weight=1.2)
        self.rect(cx - r + dx/2, cy - r + dy/2, 2*r, 2*r, line=col, shape="ELLIPSE", weight=1.2)
    def text(self, x, y, w, h, src, size=12, color=DARK, align="START", valign="TOP", weight=400, ls=100, space=0, inside=None):
        if inside is None:
            i = self.id()
            self.req.append({"createShape": {"objectId": i, "shapeType": "TEXT_BOX", "elementProperties": self.props(x, y, w, h)}})
        else:
            i = inside
        # parse markup
        plain = ""; spans = []  # (start,end,style)
        bullets = []
        lines = src.split("\n")
        for li, line in enumerate(lines):
            pstart = len(plain)
            if line.startswith("• "):
                line = line[2:]; isb = True
            else: isb = False
            for m in re.finditer(r"\*\*(.+?)\*\*|\*(.+?)\*|\^\^(.+?)\^\^|([^*^]+|\*|\^)", line):
                if m.group(1): t, st = m.group(1), "b"
                elif m.group(2): t, st = m.group(2), "i"
                elif m.group(3): t, st = m.group(3), "l"
                else: t, st = m.group(4), None
                s0 = len(plain); plain += t
                if st: spans.append((s0, len(plain), st))
            if isb: bullets.append((pstart, len(plain)))
            if li < len(lines) - 1: plain += "\n"
        r = self.req
        r.append({"insertText": {"objectId": i, "text": plain}})
        if len(spans) == 1 and spans[0][0] == 0 and spans[0][1] == len(plain) and spans[0][2] in "bl":
            weight = 700 if spans[0][2] == "b" else 300; spans = []
        elif all(st in "bl" for _, _, st in spans) and spans and sum(e - b for b, e, st in spans if st == "b") == len(plain.replace("\n", "")):
            weight = 700; spans = []
        base = {"fontSize": {"magnitude": size, "unit": "PT"}, "foregroundColor": {"opaqueColor": {"rgbColor": rgb(color)}},
                "weightedFontFamily": {"fontFamily": "Inter", "weight": weight}}
        r.append({"updateTextStyle": {"objectId": i, "textRange": {"type": "ALL"}, "style": base,
                                      "fields": "fontSize,foregroundColor,weightedFontFamily"}})
        for s0, s1, st in spans:
            if st == "b": sty, fl = {"weightedFontFamily": {"fontFamily": "Inter", "weight": 700}}, "weightedFontFamily"
            elif st == "l": sty, fl = {"weightedFontFamily": {"fontFamily": "Inter", "weight": 300}}, "weightedFontFamily"
            else: sty, fl = {"italic": True}, "italic"
            r.append({"updateTextStyle": {"objectId": i, "textRange": {"type": "FIXED_RANGE", "startIndex": s0, "endIndex": s1}, "style": sty, "fields": fl}})
        ps = {}; pf = []
        if align != "START": ps["alignment"] = align; pf.append("alignment")
        if ls != 100: ps["lineSpacing"] = ls; pf.append("lineSpacing")
        if space: ps["spaceBelow"] = {"magnitude": space, "unit": "PT"}; pf.append("spaceBelow")
        if pf: r.append({"updateParagraphStyle": {"objectId": i, "textRange": {"type": "ALL"}, "style": ps, "fields": ",".join(pf)}})
        allb = len(bullets) == len(lines)
        if allb:
            r.append({"createParagraphBullets": {"objectId": i, "textRange": {"type": "ALL"}, "bulletPreset": "BULLET_DISC_CIRCLE_SQUARE"}})
        else:
            for b0, b1 in bullets:
                r.append({"createParagraphBullets": {"objectId": i, "textRange": {"type": "FIXED_RANGE", "startIndex": b0, "endIndex": b1}, "bulletPreset": "BULLET_DISC_CIRCLE_SQUARE"}})
        if bullets:
            rng = {"type": "ALL"} if allb else {"type": "FIXED_RANGE", "startIndex": bullets[0][0], "endIndex": bullets[-1][1]}
            r.append({"updateParagraphStyle": {"objectId": i, "textRange": rng, "style": {"indentStart": {"magnitude": 11, "unit": "PT"}, "indentFirstLine": {"magnitude": 0, "unit": "PT"}}, "fields": "indentStart,indentFirstLine"}})
        if inside is None and valign != "TOP":
            r.append({"updateShapeProperties": {"objectId": i, "shapeProperties": {"contentAlignment": valign,
                      "autofit": {"autofitType": "NONE"}}, "fields": "contentAlignment,autofit.autofitType"}})
        return i
    def header(self, col=BLUE):
        self.text(8, 4, 120, 14, "ASTRA AGENCY", size=6, color=col, weight=400)
    def icon(self, x, y, d, col=DARK):
        self.rect(x, y, d, d, line=col, shape="ELLIPSE", weight=1)
        s = d * 0.46
        self.img("star_white.png" if col == WHITE else "star_blue.png", x + (d - s) / 2, y + (d - s) / 2, s, s)

slides = []
def tiers(sid, bg, fg, title_left, title_right, cards, archimg, x0=50, gap=216):
    s = Slide(sid, bg); s.header(col=WHITE if bg == NAVY else BLUE)
    s.icon(110, 54, 61, col=fg)
    s.text(187, 50, 200, 70, title_left, size=27, color=fg, ls=86)
    s.vline(397, 33, 92, col=BLUE)
    s.text(430, 58, 200, 60, title_right, size=24, color=fg, ls=86)
    for i, (L, name, who, body, price) in enumerate(cards):
        x = x0 + gap * i; w = gap - 16
        s.img(archimg, x + w/2 - 25.5, 150, 51, 50)
        s.text(x + w/2 - 25.5, 160, 51, 40, f"**{L}**", size=22, color=fg, align="CENTER")
        s.text(x, 206, w, 20, f"**{name}**", size=12.5, color=fg, align="CENTER")
        s.text(x, 228, w, 18, f"**{who}**", size=8.5, color=fg if bg == NAVY else INK, align="CENTER")
        s.text(x + 6, 248, w - 6, 90, body, size=9, color=fg, ls=115, space=2)
        s.text(x, 340, w, 30, price, size=10, color=(GREIGE if bg == NAVY else BLUE), align="CENTER", weight=700)
    return s

def head(s, icon_col, title, x=118):
    s.icon(42, 44, 61, col=icon_col)
    s.text(x, 40, 340, 70, title, size=27, color=(WHITE if icon_col == WHITE else DARK), ls=86)

# 1 COVER
s = Slide("acd01", WHITE)
s.img("cover_fabric.jpg", 360, 0, 360, 405)
s.text(240, 34, 240, 18, "**Learn. Build. Run.**", size=10, align="CENTER")
s.text(33, 176, 125, 100, "The GTM engineering academy, and the team that builds the engine with you.", size=11.5, color=BLUE, ls=95)
s.img("logo_light.png", 171, 190, 141, 96)
s.text(520, 168, 175, 110, "**How good are you at GTM engineering?**\nFind out in 7 minutes, then get better, one level at a time.", size=12, ls=105, space=6)
s.text(240, 354, 240, 18, "**Raka Mulya x Astra Agency**", size=9, align="CENTER")
slides.append(s)

# 2 WHY
s = Slide("acd02", WHITE); s.header()
s.text(40, 34, 320, 70, "^^Why^^ **GTM**\n**ENGINEERING** ^^Now^^", size=27, ls=88)
s.text(48, 185, 215, 200, "• Every sales team has the tools. A CRM, a sequencer, an AI assistant, a data provider.\n• Almost none of them are **connected**.\n• Lists get bought in bulk. Messages go out **unresearched**.\n• Reps do by hand what a system could do every **Monday morning**.\n• And nobody was ever taught how to build the system.", size=10, ls=125, space=3)
s.vline(272, 212, 130, col=GREY)
s.text(298, 222, 185, 30, "**The Result?**", size=22)
s.text(298, 255, 180, 100, "More tools, more *busywork*, and a pipeline that still depends on who had a *good week*.", size=11.5, ls=135)
s.img("why_mountain.jpg", 501, 40, 211, 357)
slides.append(s)

# 3 THE CHAIN
s = Slide("acd03", NAVY); s.header(col=WHITE)
s.text(110, 34, 500, 44, "^^The chain every sale runs on^^", size=26, color=WHITE, align="CENTER")
s.text(150, 82, 420, 40, "GTM engineering is building this chain so it runs every week, without depending on anyone's memory.", size=11, color=GREIGE, align="CENTER", ls=110)
links = ["ICP", "List", "Signal", "Research", "Message", "Send", "Reply", "CRM", "Measure"]
for i, w in enumerate(links):
    x = 40 + i * 72
    c = s.rect(x, 160, 54, 54, line=WHITE, shape="ELLIPSE", weight=1)
    s.text(0, 0, 0, 0, f"**{i+1}**", size=15, color=WHITE, align="CENTER", inside=c)
    s.text(x - 9, 222, 72, 18, w, size=10, color=WHITE, align="CENTER")
    if i < 8: s.hline(x + 56, 187, 14, col=BLUE, h=1.2)
s.rect(40, 262, 640, 1, fill=BLUE)
descs = [("Who to target", "The companies that buy and stay, written down with tiers and reasons to rule out."),
         ("Who to contact now", "Lists built from your best customers, enriched, scored, and triggered by real signals."),
         ("What to say", "AI research that's checked, one problem per message, sent safely across email and LinkedIn."),
         ("What it's worth", "A clean CRM, flows that hand leads over, and a scorecard you trust every Monday.")]
for i, (h, d) in enumerate(descs):
    x = 40 + i * 162
    s.text(x, 276, 150, 20, f"**{h}**", size=11, color=WHITE)
    s.text(x, 298, 150, 80, d, size=9, color=GREIGE, ls=115)
slides.append(s)

# 4 WHO
s = Slide("acd04", GREIGE); s.header()
s.text(32, 34, 140, 80, "^^Who^^\n**Teaches** ^^It^^", size=27, ls=88)
s.vline(180, 39, 255, col=BLUE)
s.text(217, 38, 140, 60, "^^A^^ *revenue* ^^architect^^", size=17, color=INK, ls=92)
s.text(363, 34, 330, 120, "• Raka Mulya, **7 years** in revenue, GTM and data.\n• Global GTM & Campaign Manager at **Betty Blocks**. ICP, enrichment, scoring, routing and playbooks across SDR, AE, Marketing and RevOps.\n• Sales & Channel Operations Manager at **efficy**, a CRM vendor.\n• Global E-Business Data & Insights Lead at **HEINEKEN**, self serve insights for **23 markets**.", size=9.5, color=INK, ls=125, space=2)
s.text(217, 164, 140, 60, "^^A^^ *founder* ^^first^^", size=17, color=INK, ls=92)
s.text(363, 166, 330, 60, "• Built **Eten Maar**, a stroopwafel brand, from zero, and ran its acquisition, pricing and unit economics.\n• Runs Astra's own outreach engine every day, the one this academy teaches.", size=9.5, color=INK, ls=125, space=2)
s.text(217, 250, 470, 60, "**You learn it from someone who builds it on Monday and teaches it on Tuesday.**", size=15, color=INK, ls=92)
s.img("who_strip.jpg", 13, 316, 694, 78)
slides.append(s)

# 5 PROOF
s = Slide("acd05", DARK); s.header(col=WHITE)
s.text(40, 36, 260, 40, "**Our Own Engine**", size=27, color=WHITE)
s.text(42, 74, 260, 24, "(the material for every lesson)", size=13, color=GREIGE, weight=300)
s.hline(43, 107, 241, col=BLUE)
s.text(43, 118, 250, 100, "Every course is built from what we run on ourselves, mistakes included.", size=18, color=WHITE, weight=300, ls=95)
s.img("proof_stars.jpg", 41, 223, 244, 141)
for i, (h, b) in enumerate([("330 researched first messages", "Sent between 14 July and 25 October. Each one researched and checked before it went out."),
                            ("15% said yes in October", "Up from 4% in September. 30% of October's messages got a reply."),
                            ("7 meetings by 25 October", "And the lesson behind them. Consumer businesses said yes most and couldn't pay.")]):
    y = 40 + 78 * i
    s.text(338, y, 125, 60, f"**{h}**", size=13, color=WHITE, ls=92)
    s.text(470, y, 220, 60, b, size=9.5, color=GREIGE, ls=115)
s.text(338, 300, 345, 60, "**No paid project yet from it, and we say so. That's the standard you'll learn to work to.**", size=12, color=WHITE, ls=100)
slides.append(s)

# 6 FIND YOUR LEVEL
s = Slide("acd06", WHITE); s.header()
s.text(40, 30, 420, 60, "^^How good are you at^^\n**GTM engineering?**", size=26, ls=88)
s.text(470, 40, 210, 60, "The free **GTM Engineering Score**. 25 questions, 7 minutes, a score out of 100, your level and your next step.", size=10, color=INK, ls=120)
lv = [("Starter", "0 to 29", "New to the systems behind pipeline.", 70, GREIGE, DARK),
      ("Operator", "30 to 54", "Runs an engine someone else built.", 120, (199, 207, 222), DARK),
      ("Builder", "55 to 79", "Builds the engine end to end.", 170, BLUE, WHITE),
      ("Architect", "80 to 100", "Designs the whole revenue system and leads others.", 220, NAVY, WHITE)]
for i, (n, band, d, h, fill, fg) in enumerate(lv):
    x = 40 + i * 162
    y = 380 - h
    s.rect(x, y, 150, h, fill=fill)
    s.text(x + 10, y + 10, 130, 22, f"**{n}**", size=14, color=fg)
    s.text(x + 10, y + 32, 130, 16, band, size=9, color=fg, weight=300)
    s.text(x + 10, y + 50, 130, 60, d, size=9, color=fg, ls=110)
slides.append(s)

# 7 THE LADDER
s = Slide("acd07", NAVY); s.header(col=WHITE)
s.text(160, 18, 400, 40, "**Three Levels, One Ladder**", size=28, color=WHITE, align="CENTER")
s.text(170, 60, 380, 32, "Start where your score puts you. Each level is a course on its own, with a **certificate**.", size=11, color=GREIGE, align="CENTER")
for i, (t, d) in enumerate([("Level 1\nOperator", "ICP, lists, enrichment, signals, AI research and the message. About 4 weeks."),
                            ("Level 2\nBuilder", "Safe sending, automations, CRM, allbound flows and dashboards. About 5 weeks."),
                            ("Level 3\nArchitect", "Revenue architecture, AI agents in production, signal systems, leading the build. About 5 weeks.")]):
    x = 84 + 188.4 * i
    s.img(f"arch{i+1}.jpg", x, 100, 176, 193)
    s.text(x, 250, 176, 40, "\n".join(f"**{l}**" for l in t.split("\n")), size=12.5, color=WHITE, align="CENTER", ls=90)
    s.rect(x, 293, 176, 88, fill=GREIGE)
    s.text(x + 14, 300, 150, 78, d, size=10, color=DARK, ls=100)
slides.append(s)

# 8 INSIDE EACH LEVEL
s = Slide("acd08", WHITE); s.header()
s.text(40, 30, 400, 40, "^^What you^^ **build** ^^at each level^^", size=24)
s.text(40, 68, 520, 22, "Every module ends in something real that runs, on your own market or a practice company.", size=10.5, color=INK)
s.hline(40, 98, 640, col=BLUE)
cols = [("Operator", "• Your ICP, with tiers and reasons to rule out\n• A 200 account list, built two ways\n• An enrichment waterfall with a cost per row\n• A scoring model and live signals\n• An AI research prompt that checks its facts\n• A three step sequence", "Practical test, exam"),
        ("Builder", "• A warmed sending domain, set up right\n• An n8n automation across three tools\n• A clean CRM with a field map and dedup\n• An inbound to outbound flow\n• A reactivation flow for old customers\n• A dashboard and weekly scorecard", "2 week live build project, exam"),
        ("Architect", "• A revenue system map with its leaks\n• A data model with one source of truth\n• An AI agent with a test set and approval step\n• A signal loop fed by calls and posts\n• A spec, a sprint plan and docs\n• A 90 day roadmap", "Capstone presented to Raka, exam")]
for i, (h, b, t) in enumerate(cols):
    x = 40 + i * 218
    s.text(x, 110, 200, 24, f"**{h}**", size=15)
    s.text(x, 140, 205, 190, b, size=9.5, ls=120, space=3)
    s.rect(x, 340, 200, 28, fill=GREIGE)
    s.text(x + 8, 345, 190, 20, f"**Gate.** {t}", size=9, color=INK)
slides.append(s)

# 9 ROLE COURSES
s = Slide("acd09", GREIGE); s.header()
s.text(40, 34, 400, 70, "^^Not becoming an engineer?^^\n**Courses for your role**", size=24, ls=95)
for i, (t, who, b, m) in enumerate([("GTM Seller", "For AEs, SDRs and founders who sell", "• Your own tiered list and the signals that say who to call this week\n• An AI research routine that finds a real reason to reach out\n• A sequence that sends safely and gets replies\n• Call prep, follow up and a personal scorecard", "5 modules, about 3 weeks, 2 hours a week"),
                                    ("GTM Leader", "For sales managers and heads of sales", "• An operating model and a sales bible your team follows\n• ICP, routing and CRM hygiene with owners\n• A dashboard and a forecast you can defend\n• Win and loss from calls, coaching, and a 90 day rollout plan", "5 modules, 3 to 4 weeks, plus a team workshop")]):
    x = 40 + i * 230
    s.text(x, 120, 215, 24, f"**{t}**", size=16, color=INK)
    s.text(x, 146, 215, 20, f"*{who}*", size=10, color=INK)
    s.text(x, 172, 215, 150, b, size=9.5, color=INK, ls=120, space=3)
    s.text(x, 330, 215, 30, f"**{m}**", size=9.5, color=BLUE)
s.img("sky_bird.jpg", 490, 9, 220, 387)
slides.append(s)

# 10 HOW EVERY COURSE WORKS
s = Slide("acd10", WHITE); s.header()
s.text(40, 30, 500, 40, "^^How every course^^ **works**", size=26)
s.text(40, 72, 600, 22, "Built for people who've never done this before. Every step is shown click by click.", size=10.5, color=INK)
st = [("A win in 30 minutes", "Lesson 1 gets you a real result, like your first researched account and message."),
      ("Short lessons", "5 to 10 minute videos. One idea each, every new word explained."),
      ("Build every module", "An assignment with steps, a rubric and a good and bad example."),
      ("Prove it", "A quiz per module, a practical test and a final exam. Pass mark 80%."),
      ("Get certified", "Completed, or Certified when Raka marks your capstone.")]
for i, (h, d) in enumerate(st):
    x = 40 + i * 130
    c = s.rect(x + 34, 120, 56, 56, line=DARK, shape="ELLIPSE", weight=1)
    s.text(0, 0, 0, 0, str(i + 1), size=20, align="CENTER", weight=300, inside=c)
    if i < 4: s.hline(x + 94, 148, 66, col=BLUE)
    s.text(x, 190, 124, 36, f"**{h}**", size=11.5, align="CENTER", ls=95)
    s.text(x + 4, 228, 116, 90, d, size=9, align="CENTER", ls=115)
s.img("bokeh_strip.jpg", 40, 330, 640, 50)
slides.append(s)

# 11 TWO WAYS TO LEARN
s = Slide("acd11", NAVY); s.header(col=WHITE)
s.text(40, 30, 640, 40, "**Two ways to learn**", size=28, color=WHITE, align="CENTER")
for i, (t, sub, b) in enumerate([("Self learn online", "Your pace, from anywhere", "• Every lesson, template and test\n• Mark your work against the rubric\n• Lifetime access and updates\n• Add a 1:1 hour or a review when you need it\n• Upgrade later and the price is credited"),
                                 ("1:1 with Raka", "Your data, your pace, done properly", "• Live 90 minute sessions every week\n• Raka builds with you on your own setup\n• Every assignment marked with written feedback\n• Questions answered within one working day\n• Certified at the end, plus the online course")]):
    x = 70 + i * 300
    s.rect(x, 90, 280, 280, line=(120, 140, 175), weight=1)
    s.text(x + 20, 106, 240, 26, f"**{t}**", size=17, color=WHITE)
    s.text(x + 20, 134, 240, 20, f"*{sub}*", size=10, color=GREIGE)
    s.text(x + 20, 166, 245, 190, b, size=10.5, color=WHITE, ls=125, space=5)
s.vline(359.5, 110, 240, col=BLUE)
s.rings(360, 230, 11)
slides.append(s)

# 12 PRICES
s = Slide("acd12", WHITE); s.header()
s.icon(42, 34, 50)
s.text(108, 34, 300, 50, "**Prices**", size=27)
rows = [("Level 1 Operator", "€199", "€1,200, 6 sessions"),
        ("Level 2 Builder", "€249", "€1,200, 5 sessions"),
        ("Level 3 Architect", "€299", "€1,500, 5 sessions"),
        ("All three levels", "€599", "€3,500"),
        ("GTM Seller", "€149", "€790, 4 sessions"),
        ("GTM Leader", "€249", "€2,200, 5 sessions and a team workshop")]
s.text(60, 100, 230, 20, "**Course**", size=10, color=BLUE)
s.text(300, 100, 130, 20, "**Self learn**", size=10, color=BLUE)
s.text(440, 100, 240, 20, "**1:1 with Raka**", size=10, color=BLUE)
for i, (a, b, c) in enumerate(rows):
    y = 126 + i * 36
    s.hline(60, y - 6, 620, col=GREIGE)
    s.text(60, y, 230, 22, f"**{a}**", size=12)
    s.text(300, y, 130, 22, b, size=12)
    s.text(440, y, 240, 22, c, size=11)
s.text(60, 350, 620, 30, "Extras. A single 1:1 hour €150. A marked assignment €49. Capstone review for Certified €149. Team seats of GTM Seller €99 each.", size=9, color=INK)
slides.append(s)

# 13 RATHER HAVE IT BUILT
slides.append(tiers("acd13", NAVY, WHITE, "^^Rather have it^^\n**Built?**", "**Astra builds**\n**it with you**", [
    ("1", "Health Check", "Where your revenue leaks.", "• ICP, process, data and flows reviewed\n• The recommended engine, mapped\n• A strategy session and one first build", "€1,500 to €3,500"),
    ("2", "Engine Build", "The engine, built and handed over.", "• Outbound, signals and enrichment\n• CRM setup, hygiene and routing\n• Allbound and loyalty flows", "From €4,000"),
    ("3", "Run & RevOps", "Kept running, or led part time.", "• Monitoring, updates and a monthly review\n• Or Raka as part time RevOps lead\n• Your team trained with the academy", "From €750 a month"),
], "archline_light.png"))

# 14 IS IT FOR YOU
s = Slide("acd14", NAVY); s.header(col=WHITE)
s.text(160, 46, 400, 70, "^^Is It^^ **For You?**", size=31, color=WHITE, align="CENTER")
s.text(108, 150, 240, 30, "Yes, if you", size=18, color=WHITE, align="CENTER", weight=300)
s.text(118, 184, 225, 190, "• Want a career as a GTM engineer and need real builds to show\n• Sell, and want more meetings with less manual work\n• Lead a team that has the tools but not the system\n• Learn best by building on your own data", size=9.5, color=WHITE, ls=120, space=4)
s.vline(359.5, 150, 215, col=BLUE)
s.rings(360, 255, 10)
s.text(385, 150, 260, 30, "Probably not, if you", size=18, color=WHITE, align="CENTER", weight=300)
s.text(400, 192, 230, 160, "• Want a list of emails to blast tomorrow\n• Won't touch the tools yourself\n• Want a certificate without doing the work", size=9.5, color=WHITE, ls=120, space=4)
slides.append(s)

# 15 NEXT STEPS
s = Slide("acd15", GREIGE); s.header()
s.img("next_curtain.jpg", 360, 0, 360, 405)
s.text(40, 50, 300, 40, "**Start Here**", size=27)
for i, (h, b) in enumerate([("Take the free GTM Engineering Score", "7 minutes. Your score, your level and your next step."),
                            ("Do Lesson 1 of your level, free", "Your first real result in 30 minutes."),
                            ("Pick self learn or 1:1", "Or book a free 20 minute call to choose together.")]):
    y = 121 + 79 * i
    c = s.rect(47, y, 61, 61, line=DARK, shape="ELLIPSE", weight=1)
    s.text(0, 0, 0, 0, str(i + 1), size=22, align="CENTER", weight=300, inside=c)
    s.text(119, y + 2, 230, 34, f"**{h}**", size=12.5, ls=90)
    s.text(119, y + 36, 225, 30, b, size=9.3, ls=100)
s.text(430, 150, 255, 80, "**How good are you at GTM engineering?**", size=20, color=WHITE, ls=92)
s.text(430, 240, 260, 70, "Raka Mulya, Astra Agency\nraka@astraagency.nl\nlinkedin.com/in/raka-mulya-b92885196", size=10, color=WHITE, weight=300, ls=110)
slides.append(s)

import os
for s in slides:
    json.dump(s.req, open(f"{sys.argv[2]}/req2_{s.sid}.json", "w"), separators=(",", ":"))
print({s.sid: len(json.dumps(s.req, separators=(',', ':'))) for s in slides})
