"""Generate Google Slides batchUpdate requests for the GTM engineering deck, in the Astra deck style.
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

# 1 COVER
s = Slide("gtm01", WHITE)
s.img("cover_fabric.jpg", 360, 0, 360, 405)
s.text(240, 34, 240, 18, "**Learn. Build. Run.**", size=10, align="CENTER")
s.text(33, 182, 120, 80, "Revenue architecture and GTM engineering for B2B teams.", size=11.5, color=BLUE, ls=95)
s.img("logo_light.png", 171, 190, 141, 96)
s.text(532, 184, 160, 80, "Helping B2B teams build the engine behind their pipeline, and the people who run it.", size=11.5, ls=95)
s.text(240, 354, 240, 18, "**Raka Mulya x Astra Agency**", size=9, align="CENTER")
slides.append(s)

# 2 WHY
s = Slide("gtm02", WHITE); s.header()
s.text(40, 34, 300, 70, "^^Why^^ **GTM**\n**ENGINEERING** ^^Matters^^", size=27, ls=88)
s.text(48, 190, 215, 190, "• You've bought the tools, a CRM, Clay, lemlist, a dialer, and they don't **talk to each other**.\n• Your CRM is full of duplicates nobody **trusts**.\n• Outbound is a person sending messages, **not a system**.\n• Win and loss, forecasts and customer health live in **people's heads**.\n• Every new hire learns the process **from scratch**.", size=10, ls=125, space=3)
s.vline(272, 217, 126, col=GREY)
s.text(298, 228, 180, 30, "**The Result?**", size=22)
s.text(298, 260, 170, 90, "Pipeline feels like *luck*, forecasts are *guesses*, and every new tool adds *more work*.", size=11.5, ls=135)
s.img("why_mountain.jpg", 501, 40, 211, 357)
slides.append(s)

# 3 WHO I AM
s = Slide("gtm03", GREIGE); s.header()
s.text(32, 34, 140, 80, "^^Who^^\n**I** ^^Am^^", size=29, ls=88)
s.vline(180, 39, 255, col=BLUE)
s.text(217, 38, 140, 60, "^^Your^^ *revenue* ^^architect^^", size=17, color=INK, ls=92)
s.text(363, 34, 330, 120, "• Raka Mulya, **7 years** in revenue, GTM and data, based in the Netherlands.\n• Global GTM & Campaign Manager at **Betty Blocks**. ICP, enrichment, scoring, routing and playbooks across SDR, AE, Marketing and RevOps.\n• Sales & Channel Operations Manager at **efficy**, a CRM vendor.\n• Global E-Business Data & Insights Lead at **HEINEKEN**, self serve insights for **23 markets**.", size=9.3, color=INK, ls=125, space=2)
s.text(217, 140, 140, 60, "^^A^^ *founder* ^^first^^", size=17, color=INK, ls=92)
s.text(363, 142, 330, 70, "• Built **Eten Maar**, a stroopwafel brand, from zero, and ran its acquisition, pricing and unit economics.\n• MSc Digital Business & Innovation, **VU Amsterdam**. BSc International Business, **RSM Erasmus**.", size=9.3, color=INK, ls=125, space=2)
s.text(217, 236, 470, 60, "**You get someone who has built revenue engines from the inside, at a scale up, a global brewer and his own company.**", size=15, color=INK, ls=92)
s.img("who_strip.jpg", 13, 316, 694, 78)
slides.append(s)

# 4 HARD & SOFT
s = Slide("gtm04", WHITE); s.header()
s.text(60, 62, 230, 30, "HARD SKILLS", size=21, align="CENTER", weight=400)
s.text(80, 100, 190, 80, "Connecting the tools into one **GTM brain**. CRM, enrichment, signals, outbound and dashboards running on **the same data**.", size=10.5, align="CENTER", ls=125)
s.vline(359.5, 40, 175, col=BLUE)
s.rings(360, 128, 13)
s.text(430, 62, 230, 30, "SOFT SKILLS", size=21, align="CENTER", weight=400)
s.text(440, 100, 210, 90, "Reading a pipeline, asking what you **actually need** before building, and running the work in **sprints** your team can follow.", size=10.5, align="CENTER", ls=125)
for i, word in enumerate(["Architecture.", "Signals.", "Automation.", "Hygiene.", "Insight."]):
    x = 8.6 + 140.4 * i
    s.img(f"tile{i+1}.jpg", x, 257, 140.4, 140)
    s.rect(x + 42, 284, 56, 56, line=WHITE, shape="ELLIPSE", weight=1.2)
    s.img("star_white.png", x + 57, 299, 26, 26)
    s.text(x, 348, 140.4, 24, word, size=13, color=WHITE, align="CENTER")
slides.append(s)

# 5 WHAT WE DO
s = Slide("gtm05", NAVY); s.header(col=WHITE)
s.text(160, 20, 400, 40, "**What We Do**", size=30, color=WHITE, align="CENTER")
s.text(200, 62, 320, 32, "**Three** ways to work together, **transparent** pricing and one **point of contact**.", size=11, color=GREIGE, align="CENTER", ls=100)
for i, (t, d) in enumerate([("Learn GTM\nEngineering", "Courses and team training for people who want to do this work, or do it better."),
                            ("Analyse Your\nRevenue", "A deep health check of your ICP, process, data and flows, with a strategy session."),
                            ("Build & Run\nYour Engine", "AI powered outbound, CRM, automations and loyalty flows, kept running for you.")]):
    x = 84 + 188.4 * i
    s.img(f"arch{i+1}.jpg", x, 105, 176, 193)
    s.text(x, 258, 176, 36, "\n".join(f"**{l}**" for l in t.split("\n")), size=12, color=WHITE, align="CENTER", ls=90)
    s.rect(x, 298, 176, 82, fill=GREIGE)
    s.text(x + 16, 306, 148, 70, d, size=10.5, color=DARK, ls=100)
slides.append(s)

# 6 GTM BRAIN, WHAT I BUILD
def brain(sid, sub, left, right, photo):
    s = Slide(sid, WHITE); s.header()
    s.icon(42, 44, 61)
    s.text(118, 40, 200, 70, "^^The^^ **GTM**\n^^Brain^^", size=27, ls=86)
    s.hline(118, 117, 193, col=BLUE)
    s.rings(271, 117, 11, vertical=False)
    s.text(41, 128, 280, 32, f"**{sub}**", size=22)
    s.hline(41, 168, 271, col=BLUE)
    y = 180
    for h, b in left:
        s.text(41, y, 95, 50, f"**{h}**", size=12, ls=90)
        s.text(140, y - 2, 175, 100, b, size=9.3, ls=118, space=2)
        y += 104
    y = 38
    for h, b in right:
        s.text(360, y, 100, 50, f"**{h}**", size=12, ls=90)
        s.text(465, y - 2, 215, 85, b, size=9.3, ls=118, space=2)
        s.hline(360, y + 83, 320, col=(230, 221, 216))
        y += 93
    s.img(photo[0], *photo[1])
    return s

slides.append(brain("gtm06", "What I Build", [
    ("Revenue Architecture", "• Revenue model and operating model.\n• Your sales process written down, the sales bible.\n• ICP and segmentation from your own win data."),
], [
    ("CRM & Data", "• CRM setup built for GTM engineering.\n• Hygiene and deduplication, and the rules your team keeps.\n• Waterfall enrichment, and data prepared for commissions."),
    ("Signals & Outbound", "• Signal based outbound and AI lookalikes.\n• Allbound, from your ads and inbound into outbound.\n• The eavesdrop loop, listening to customers and prospects and feeding it into your ICP and Clay."),
], ("bokeh_strip.jpg", (360, 226, 321, 61))))

slides.append(brain("gtm07", "What I Measure", [
    ("Sales Intelligence", "• Calls in Gong or Leexi turned into win and loss reasons.\n• Lead analysis and ICP fit analysis.\n• What your best deals had in common."),
], [
    ("Dashboards & Forecasting", "• Pipeline analysis, forecasting and closing.\n• One dashboard over the whole business, from organisational health to operational KPIs."),
    ("Loyalty Operating Model", "• Post sales cadences, emails and contact moments.\n• Customer health, and the flows that keep customers buying.\n• Process and tools, both."),
], ("banner_rock.jpg", (360, 226, 321, 56))))

# 8 STACK (navy)
s = Slide("gtm08", NAVY); s.header(col=WHITE)
s.icon(42, 44, 61, col=WHITE)
s.text(118, 40, 300, 70, "^^The^^ **Stack**\n^^I Connect^^", size=27, color=WHITE, ls=86)
s.text(41, 128, 200, 32, "**The Tools**", size=22, color=WHITE)
s.text(41, 166, 210, 230, "• **Clay**, enrichment, waterfalls and lookalikes\n• **lemlist**, multichannel outbound\n• **n8n** and **APIs**, the connections between everything\n• **PhantomBuster**, LinkedIn and web data\n• **Claude**, AI research, writing and agents\n• **Gong** and **Leexi**, call intelligence\n• **HubSpot** or your CRM, the single source of truth", size=9.5, color=WHITE, ls=120, space=3)
s.text(257, 128, 200, 32, "**How I Work**", size=22, color=WHITE)
s.text(257, 166, 200, 230, "• Analyse what you need **before** building anything.\n• Work in **sprints**, with a demo at the end of each.\n• Document every flow, so it's **never tribal knowledge**.\n• Look for the newer, smarter way, and **test it on our own engine first**.", size=9.5, color=WHITE, ls=120, space=4)
s.img("stack_cliff.jpg", 490, 8, 220, 387)
slides.append(s)

# 9 LEARN problem/value
s = Slide("gtm09", WHITE); s.header()
s.icon(42, 44, 61)
s.text(118, 40, 300, 70, "**Learn** ^^GTM^^\n^^Engineering^^", size=27, ls=86)
s.text(41, 214, 200, 30, "**The Problem**", size=22)
s.text(41, 254, 200, 30, "**You want to do this work, or your team does, but**", size=9.5, color=INK, ls=100)
s.text(46, 282, 200, 110, "• It's learnt from scattered threads and trial and error.\n• Most courses teach one tool, not how the pieces fit.\n• Nobody shows you a real engine running.", size=9.5, ls=125, space=2)
s.text(255, 214, 200, 30, "**Our Value**", size=22)
s.text(260, 250, 210, 140, "• Learn from someone running these engines **every day**.\n• Every student builds a **working engine** on their own target list.\n• For people starting out, practitioners levelling up, and **teams learning together**.", size=9.5, ls=125, space=2)
s.img("learn_sunset.jpg", 490, 9, 220, 387)
slides.append(s)

# 10 LEARN packages
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

slides.append(tiers("gtm10", WHITE, DARK, "**Learn** ^^GTM^^\n^^Engineering^^", "**Courses &**\n**Pricing**", [
    ("A", "Foundations", "For people moving into GTM engineering.", "• 4 to 6 weeks, live sessions and builds.\n• ICP, lists, enrichment, messaging, outbound and CRM basics.\n• You leave with a working outbound engine.", "€400 to €750 per person"),
    ("B", "Level Up", "For people already doing the work.", "• Signals, AI lookalikes, waterfalls and agents.\n• CRM hygiene, dashboards and win and loss.\n• Reviews of your own live flows.", "€750 to €1,500 per person"),
    ("C", "Team Training", "For companies teaching their own team.", "• Foundations or Level Up, on your own CRM and ICP.\n• Your team's playbook written as we go.\n• Follow up sessions after go live, if you want them.", "€3,000 to €8,000 per programme"),
], "archline_dark.png"))

# 11 ANALYSE (greige, How We Innovate layout)
s = Slide("gtm11", GREIGE); s.header()
s.icon(37, 44, 61)
s.text(113, 40, 260, 70, "**Analyse**\n^^Your Revenue^^", size=27, ls=86)
s.hline(113, 117, 241, col=BLUE)
s.rings(316, 117, 11, vertical=False)
s.text(37, 128, 320, 32, "**The Revenue Health Check**", size=19)
s.hline(35, 168, 320, col=BLUE)
def steps(items, x, y0, dy):
    y = y0
    for h, b in items:
        s.text(x, y, 110, 24, f"**{h}**", size=12)
        s.text(x + 120, y - 2, 215, 80, b, size=9.3, ls=118, space=2)
        y += dy
steps([("Discover", "• Interviews with sales, marketing and customer success.\n• Your ICP, revenue model and process today."),
       ("Diagnose", "• Pipeline, conversion by stage, win and loss.\n• CRM hygiene, data quality and how your tools connect.")], 37, 182, 100)
steps([("Design", "• The recommended process, flows and connections.\n• Your GTM brain, mapped for your business."),
       ("Decide", "• A strategy session to walk you through it.\n• One thing to build first, with its cost and timeline.")], 366, 40, 100)
s.text(366, 300, 320, 50, "**Investment** €1,500 to €3,500, credited against the build if you go ahead.", size=10, color=INK, ls=120)
slides.append(s)

# 12 BUILD & RUN tiers (navy)
slides.append(tiers("gtm12", NAVY, WHITE, "**Build & Run**\n^^Your Engine^^", "**Tiers &**\n**Pricing**", [
    ("A", "Engine Build", "One project, built and handed over.", "• Outbound, signals and enrichment in Clay and lemlist.\n• CRM setup, hygiene and routing.\n• Inbound to outbound and loyalty flows.", "Typical project €4,000 to €15,000"),
    ("B", "Run & Maintain", "Your engine, kept healthy.", "• Monitoring, fixes and list refreshes.\n• Message and prompt updates.\n• A monthly numbers review.", "€750 to €2,000 per month"),
    ("C", "Fractional RevOps", "Raka in your team, part time.", "• One to two days a week.\n• Owns the revenue process, dashboards and forecast.\n• Coaches the people running it.", "€2,500 to €5,000 per month"),
], "archline_light.png"))

# 13 PROOF (dark)
s = Slide("gtm13", DARK); s.header(col=WHITE)
s.text(40, 36, 260, 40, "**Our Own Engine**", size=27, color=WHITE)
s.text(42, 74, 260, 24, "(built and run by Astra)", size=13, color=GREIGE, weight=300)
s.hline(43, 107, 241, col=BLUE)
s.text(43, 118, 250, 100, "We run the same engine on ourselves, every day.", size=20, color=WHITE, weight=300, ls=95)
s.img("proof_stars.jpg", 41, 223, 244, 141)
for i, (h, b) in enumerate([("330 researched first messages", "Sent between July and October. Each one researched by AI agents and checked before it went out."),
                            ("15% said yes in October", "Up from 4% in September, after we changed who we target and how we open."),
                            ("7 meetings by 25 October", "From 26 yeses and our warm conversations.")]):
    y = 40 + 78 * i
    s.text(338, y, 150, 60, f"**{h}**", size=13, color=WHITE, ls=92)
    s.text(470, y, 220, 60, b, size=9.5, color=GREIGE, ls=115)
s.text(338, 300, 345, 60, "**Before Astra, Raka built the revenue workflows behind Betty Blocks' global campaigns.**", size=13, color=WHITE, ls=95)
slides.append(s)

# 14 IS IT FOR YOU (navy)
s = Slide("gtm14", NAVY); s.header(col=WHITE)
s.text(160, 46, 400, 70, "^^Is It^^ **For You?**", size=31, color=WHITE, align="CENTER")
s.text(128, 150, 210, 30, "We're a good fit if", size=18, color=WHITE, align="CENTER", weight=300)
s.text(128, 182, 210, 190, "• You're a B2B team with real customers and a sales process that's grown messy.\n• You've got the tools, and they don't add up to a system.\n• You want your team to learn it, or you want it built for you.\n• You're ready to invest roughly €500 to €15,000 to move forward.", size=9.5, color=WHITE, ls=120, space=4)
s.vline(359.5, 150, 215, col=BLUE)
s.rings(360, 255, 10)
s.text(400, 150, 200, 30, "We're probably not a fit if", size=18, color=WHITE, align="CENTER", weight=300)
s.text(405, 192, 200, 160, "• You want a bought email list, blasted.\n• Nobody inside can own the process.\n• You want results tomorrow without changing how you sell.", size=9.5, color=WHITE, ls=120, space=4)
slides.append(s)

# 15 NEXT STEPS (greige + curtain)
s = Slide("gtm15", GREIGE); s.header()
s.img("next_curtain.jpg", 360, 0, 360, 405)
s.text(200, 50, 320, 40, "**The Next Steps**", size=27, align="CENTER")
for i, (h, b) in enumerate([("Free intake call (30 minutes)", "We walk through your pipeline, tools and goals."),
                            ("Pick a starting point", "A course seat, a Health Check or an Engine Build."),
                            ("Clear proposal", "Scope, price and timeline. No surprises.")]):
    y = 121 + 79 * i
    s.rect(67, y, 61, 61, line=DARK, shape="ELLIPSE", weight=1)
    s.text(67, y, 61, 61, str(i + 1), size=22, align="CENTER", valign="MIDDLE", weight=300)
    s.text(139, y + 2, 160, 34, f"**{h}**", size=13, ls=90)
    s.text(139, y + 36, 160, 30, b, size=9.3, ls=100)
s.text(430, 155, 250, 80, "**Interested in building your engine together?**", size=20, color=WHITE, ls=92)
s.text(430, 240, 260, 70, "Raka Mulya, Astra Agency\nraka@astraagency.nl\nlinkedin.com/in/raka-mulya-b92885196", size=10, color=WHITE, weight=300, ls=110)
slides.append(s)

for s in slides:
    json.dump(s.req, open(f"/tmp/claude-0/-home-user-astra-agency/8283a2c5-754d-5a90-95e7-21e219313a64/scratchpad/req_{s.sid}.json", "w"), separators=(",", ":"))
print({s.sid: len(json.dumps(s.req, separators=(',', ':'))) for s in slides})
