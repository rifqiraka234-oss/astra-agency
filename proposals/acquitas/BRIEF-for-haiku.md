# Brief. Build the two page proposal for Acquitas Partners

You're building a finished, client ready proposal for Kyson Charles of Acquitas Partners. Raka (Astra Agency)
will review it before anything is sent. Read this whole brief before you start, then work through the steps in
order. Everything you need is in this file. Don't invent facts, prices, promises or numbers that aren't here.

## 0. What this task is and isn't

- It's a document build. You make one HTML file, render it to a two page A4 PDF, check it, and push it.
- It is NOT outreach. Don't send any message or email, don't touch lemlist, Gmail or Calendar, don't run the
  research gates, opener template or check-drafts from CLAUDE.md. Those procedures are for outreach.
- From CLAUDE.md and docs/NO-AI-SLOP.md, the writing rules DO apply. They're summarised in section 5 below.
- Work only inside `proposals/acquitas/`. Don't edit any other file in the repo.

## 1. Who the reader is

Kyson Charles, founder and sole director of Acquitas Partners Ltd, a UK firm that helps owners of businesses in
testing, inspection and certification, facilities, industrial and B2B services sell their company. He's a
business person, not technical. He launched in April 2026 and works alone. He had a call with Raka on 7 October
2026 and asked for this proposal.

So the proposal must be plain English, clear and specific, with no jargon. Explain every tool by what it does
for him, not by its technical name. Never use these words in the visible text: GTM, go to market, CMS, SDR,
workflow, sequence, pipeline, enrichment, API, automation, lead gen, funnel, scrape.

## 2. Facts you may use. Nothing else

**What we looked at**
- Every page of acquitaspartners.com, his Companies House record, and his sectors.
- His homepage describes the firm with the words "Founder-Focused", "Discretion & Confidentiality" and
  "Operator-Backed Insight". His About page says "Our mission is to help business owners achieve better exits."
- On 6 October his site showed no name, photo, founder story or explanation of the fee. RECHECK this before you
  use it (step 3.1). If he has added any of them since, drop the sentence that says he hasn't.
- Buyers are active in his sectors. CapEQ counted 155 sales under £100m in testing, inspection, certification
  and compliance across the UK and Europe in the 12 months to August 2026 (source, CapEQ UK and European TICC M&A
  Report 2026, https://capeq.com/insights/uk-european-ticc-ma-report-2026).

**What he told us on the call (7 October 2026)**
- His focus right now is signing his first mandate. After that he wants an office and a first hire.
- Over the next twelve months he's aiming for two or three deals.
- Sellers who got close and then stopped all stopped at the fee. Most didn't know there'd be a fee, or how it
  works, until he explained it.
- He finds owners by hand on LinkedIn. The paid company databases are too expensive before his first deal.
- He liked the value calculator in the concept we built, and he wants his own profile on his site either way.

Don't mention the size of the fee, any percentage, or any money target he named. Don't mention where Astra's
developers are based.

## 3. Steps

### 3.1 Recheck his live site (one minute)

```bash
curl -sS -L --max-time 30 -A "Mozilla/5.0" https://www.acquitaspartners.com -o /tmp/acq_home.html
curl -sS -L --max-time 30 -A "Mozilla/5.0" https://www.acquitaspartners.com/about -o /tmp/acq_about.html
grep -ci "kyson" /tmp/acq_home.html /tmp/acq_about.html
grep -c "achieve better exits" /tmp/acq_about.html
```
If "kyson" now appears, he has added his name, so don't write that sellers can't see who he is. If the mission
line is gone, don't quote it.

### 3.2 Take two screenshots of work that already exists

Our live concept site and analysis deck are single HTML files. Chromium can't reach live sites reliably from
this container, so download them and screenshot local copies.

```bash
mkdir -p proposals/acquitas/img /tmp/acq_site /tmp/acq_deck
curl -sS --max-time 60 https://astra-acquitas-prototype.netlify.app -o /tmp/acq_site/index.html
curl -sS --max-time 60 https://astra-acquitas-deck.netlify.app -o /tmp/acq_deck/index.html
(cd /tmp/acq_site && python3 -m http.server 8801 >/dev/null 2>&1 &)
(cd /tmp/acq_deck && python3 -m http.server 8802 >/dev/null 2>&1 &)
```

Then save this as `/tmp/shots.js` and run `node /tmp/shots.js` from the repo root.

```js
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const CHROME = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
(async () => {
  const b = await chromium.launch({ executablePath: CHROME, args: ['--no-sandbox'] });
  // concept site, top of the page
  const p = await b.newPage({ viewport: { width: 1400, height: 860 } });
  await p.goto('http://127.0.0.1:8801/', { waitUntil: 'networkidle' });
  await p.waitForTimeout(2500);
  await p.screenshot({ path: 'proposals/acquitas/img/concept-site.png' });
  // deck, the value calculator
  const d = await b.newPage({ viewport: { width: 1400, height: 1000 } });
  await d.goto('http://127.0.0.1:8802/', { waitUntil: 'networkidle' });
  const H = await d.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < H; y += 300) { await d.evaluate(y => window.scrollTo(0, y), y); await d.waitForTimeout(120); }
  await d.evaluate(() => document.getElementById('tool').scrollIntoView());
  await d.waitForTimeout(800);
  const tool = await d.$('#tool');
  await tool.screenshot({ path: 'proposals/acquitas/img/value-calculator.png' });
  await b.close();
})();
```

Open both PNGs with the Read tool and look at them. The calculator shot must show the sliders and the value
range. The site shot must show the Acquitas hero. If a shot is blank or half loaded, wait longer and retake it.

The page counts down a scroll reveal, so if text looks missing in the site shot, scroll the page down and back
up before the screenshot, as the deck code does.

### 3.3 Build the proposal HTML

Make `proposals/acquitas/proposal.html`. One file, CSS inline in a `<style>` tag, images referenced as
`img/concept-site.png` and `img/value-calculator.png`. Two A4 pages, each a `<section class="page">` of exactly
210mm by 297mm, with `@page { size: A4; margin: 0 }` and `page-break-after: always` on the first page.

**Astra's brand, read from astraagency.nl's own stylesheet on 9 October 2026**

| Use | Colour |
|---|---|
| Main navy, headings, header band, total row | #0d1b38 |
| Deep navy for gradients or dark panels | #1a2d52 |
| Secondary blue, accents, rules, numbers | #415a8d |
| Soft blue, light accents | #678bbf |
| Palest blue, tinted boxes | #f0f4f9 |
| Warm page background | #faf8f6 |
| Warm panel background | #f5f2ef |
| Warm borders | #ede8e3 |
| Body text | #1d1d1e |
| Quiet text, captions | #7d766f |

Fonts are Sora for everything, and Cormorant Garamond (italic) for one or two large display lines only. Load
them from Google Fonts with
`<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;1,500&family=Sora:wght@300;400;600;700&display=swap" rel="stylesheet">`.
If your render shows a fallback font, download the woff2 files with curl and point `@font-face` at local copies
in `proposals/acquitas/fonts/`.

Design direction. Calm, senior and clean, like a private bank or an M&A firm, never like a startup. Warm off
white page, navy type, generous white space, thin rules, small caps labels in the secondary blue. Body text 9.5pt
to 10pt so two pages are enough. No emoji, no stock icons, no gradients except one subtle navy band.

### 3.4 The content, page by page

Use this copy. You may shorten it to fit two pages. Don't add claims. Keep the headings as written.

**PAGE 1**

Header band (navy, white text). Small line "ASTRA AGENCY · PROPOSAL", then the title in Cormorant italic,
"A website that wins a seller's trust, and an easier way to reach them". Under it, "Prepared for Kyson Charles,
Acquitas Partners · 9 October 2026".

Section "What we looked at"

> Before our call we read every page of acquitaspartners.com, your Companies House record and the latest deal
> numbers in your sectors. Buyers are busy. CapEQ counted 155 sales under £100m in testing, inspection,
> certification and compliance across the UK and Europe in the twelve months to August 2026. Your site describes
> the right firm, founder focused, discreet and backed by operators. What a seller can't see yet is who you are,
> how a sale runs with you, and how your fee works.

(Last sentence only if step 3.1 still holds.)

Section "What you told us", four short bullets
- Your focus right now is signing your first mandate, and then an office and a first hire.
- Sellers who got close and stopped, stopped at the fee, mostly because they didn't know how it works.
- You find owners by hand on LinkedIn, and the paid databases are hard to justify before the first deal.
- You liked the value calculator, and you want your own profile on the site either way.

Section "Your goals", three numbered items in a tinted box
1. Sign your first mandate, then build towards two or three deals over the next twelve months.
2. Have sellers understand your fee before the first call, not halfway through it.
3. Reach more owners each week without hiring yet.

Section "Phase one. What we'll build", with a one line intro
> Three things, together €3,500. Each one serves one of the goals above.

Item 1, "Your new website", price "€2,500" on the right.

> A site that shows a seller who's running their sale, and says what Acquitas stands for before they read a
> word. The look, the photography and the words are built around your mission, helping owners achieve better
> exits, with the calm, senior feel of a firm trusted with the biggest sale of someone's life.

What's included, as a compact two column list
- Pages for Home, About you, How a sale works, Fees, Sectors, Value calculator, Questions, Contact and Privacy
- Your story and photo, so sellers know who they'll deal with
- A plain page on how your fee works, so it never comes as a surprise
- The value calculator. An owner moves a few sliders and sees a rough value for their business, then the tax on
  the sale, then your fee, then what they'd keep. Every owner who uses it arrives in your inbox with their answers
- An easy editor, so you can change text, swap photos and add news yourself, no code needed
- Works on phones, set up to be found on Google, moved onto your own web address, with your email left exactly as
  it is

"How we build it", one short paragraph
> We collect your story, a photo you're happy with and how you explain your fee. We build the site on a private
> preview link, you click through it and send us your changes, and once you're happy it goes live. Then we show
> you how to edit it yourself.

Image, `img/concept-site.png`, caption "The concept you've already seen. The finished site uses your own photo
and words."

**PAGE 2**

Image, `img/value-calculator.png`, small, beside item 1's continuation or at the top of page 2, caption "The
value calculator, already working in the concept."

Item 2, "Your outreach assistant", price "€625" on the right.

> A simple setup that lets you reach more owners each week. The research and first drafts are done for you, and
> you stay in control of every message you send.

- One place for LinkedIn and email. Your connection requests, follow ups and replies run from one tool instead
  of by hand
- A research helper. Type in a company and it gives you a short brief on the business and its owner, and a first
  message in your voice. You check it and send it
- A walkthrough, so you can run it yourself each week

"How we build it"
> We connect your LinkedIn and email, write your first set of messages for owners in your sectors, and set up the
> research helper with your sectors, your tone and what to look for. Then we run it once together.

Illustration (built in HTML and CSS, not an image file). A small card that looks like the research helper's
answer. Put a pill reading "ILLUSTRATION" in its corner. Content, all fictional and clearly an example.
- Input line, "Example Testing Ltd"
- "Owner. Founder, in post 22 years, holds the shares"
- "Business. Calibration lab, 35 staff, accredited, steady repeat customers"
- "Why now. Founder's age and length in post suggest an exit within a few years"
- Draft message, two lines, starting "Hi James," in a plain, warm tone, ending with a soft question
Caption "An example of what the research helper gives you. Names and details here are made up."

Item 3, "A strategy session", price "€375" on the right.
> Two hours with us on how to write to owners. What to say first, how to raise your fee early so it never
> surprises anyone, what to avoid on LinkedIn, and what's working in outreach right now.

Price table, right aligned figures

| | |
|---|---|
| Your new website | €2,500, half to start and half at launch |
| Your outreach assistant | €625 |
| A strategy session | €375 |
| **Total** | **€3,500** |

Under it, small text
> Prices in euros, excluding VAT. No monthly fee and no minimum term. Your outreach tools are in your name and
> billed to you directly, lemlist at $109 a month and Claude at $20 a month, their list prices on 7 October 2026.
> We'll confirm any hosting cost for the new site before we start.

Timeline graphic (HTML and CSS). Three steps in a row on a thin line.
- "Weeks 1 to 2" / "Your website goes live"
- "Week 3" / "Outreach assistant set up, and the strategy session"
- "From week 4" / "You run it, we're on hand"

Section "When you're ready", a compact table, one line each
| | | |
|---|---|---|
| Buyer's view check | An owner types in their company name and gets a one page view of how a buyer sees the business. You get their details | €1,500 |
| AI LinkedIn assistant | Writes to owners on your list and follows up for you | €600, then €75 per meeting booked |
| Exit plan builder | An owner says when they'd like to sell and gets a dated plan by email | €1,500 |
| Who's buying in your sector | Recent deals in your niches, with email alerts owners can sign up for | €1,500 |
| Sector value pages | A page for each niche so owners searching Google find you | €500 a page |
| Anything else | Built, set up or fixed, agreed before we start | €150 an hour |

Closing line and contact
> To start, reply to say go and send your story, a photo and how you explain your fee. We'll book our second call
> for the week after next to walk you through it.
>
> Raka · Astra Agency · raka@astraagency.nl · astraagency.nl

Footer in small quiet text, "Sources. CapEQ, UK and European TICC M&A Report 2026. lemlist and Claude pricing
pages, 7 October 2026."

### 3.5 Render the PDF and look at it

Save as `/tmp/pdf.js`, run `node /tmp/pdf.js` from the repo root.

```js
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const CHROME = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const path = require('path');
(async () => {
  const b = await chromium.launch({ executablePath: CHROME, args: ['--no-sandbox'] });
  const p = await b.newPage({ viewport: { width: 794, height: 1123 } });
  await p.goto('file://' + path.resolve('proposals/acquitas/proposal.html'), { waitUntil: 'networkidle' });
  await p.waitForTimeout(1500);
  await p.pdf({ path: 'proposals/acquitas/proposal.pdf', format: 'A4', printBackground: true });
  const pages = await p.$$('section.page');
  for (let i = 0; i < pages.length; i++) await pages[i].screenshot({ path: `proposals/acquitas/page-${i + 1}.png` });
  console.log('sections', pages.length);
  await b.close();
})();
```

Then count the PDF pages.
```bash
python3 -c "import re;d=open('proposals/acquitas/proposal.pdf','rb').read();print(len(re.findall(rb'/Type\s*/Page[^s]',d)))"
```
It must print 2. Open `page-1.png` and `page-2.png` with the Read tool and LOOK at them. Fix and re-render until
all of these hold.
- Exactly two pages, nothing cut off at the bottom of either page, no empty third page
- Both screenshots visible and sharp, the illustration card clearly labelled
- Text readable, nothing overlapping, prices lined up
- It looks like a calm, senior financial firm's document, not a template

### 3.6 Check the words

1. Save the script in docs/NO-AI-SLOP.md section 8 as `/tmp/check-slop.sh` and run it on the visible text.
   ```bash
   python3 -c "import re,html;t=open('proposals/acquitas/proposal.html').read();t=re.sub(r'<style.*?</style>','',t,flags=re.S);print(html.unescape(re.sub(r'<[^>]+>',' ',t)))" > /tmp/proposal.txt
   bash /tmp/check-slop.sh /tmp/proposal.txt
   ```
   Fix every hit.
2. No colon character anywhere in the visible text, except inside an email address or web address.
   `grep -n ":" /tmp/proposal.txt`
3. No em dash, en dash or hyphen in the visible text, except inside the email address, web addresses and the
   proper noun "M&A". `grep -nP "[\x{2013}\x{2014}-]" /tmp/proposal.txt`
4. Contractions present, at least ten (we'll, you're, it's, don't, can't and so on).
5. None of the banned jargon words from section 1.
6. Every number in the text appears in section 2 or the price list above. Nothing else.

### 3.7 Hand over

Write `proposals/acquitas/HANDOVER.md` with the result of every check above, the PDF page count, what you
couldn't do, and anything Raka should decide. Then commit and push.

```bash
git add proposals/acquitas
git commit -m "proposal: Acquitas two page proposal, PDF and HTML, 2026-10-09"
git pull --no-rebase origin claude/workflow-docs-update-cxm8ih
git push -u origin claude/workflow-docs-update-cxm8ih
```
If the push fails on the network, retry up to four times, waiting 2, 4, 8 and 16 seconds.

## 4. Things you must not do

- Don't send the proposal or any message to anyone.
- Don't invent testimonials, past clients, results, lead numbers or guarantees.
- Don't promise a number of revision rounds, a hosting price or anything not written in this brief.
- Don't name where the development team is based.
- Don't change prices. They're Raka's, set on 8 October 2026.

## 5. The writing rules, short version

- Plain English, UK spelling, short sentences, everyday words. If Kyson's accountant wouldn't say it, cut it.
- Contractions throughout.
- No colons and no dashes in the prose (see 3.6).
- None of these words. elevate, leverage, unlock, empower, seamless, robust, tailored, bespoke, cutting edge,
  innovative, comprehensive, journey, landscape, solutions, transform, streamline, game changer.
- Headings say something specific. No "Why choose us", "Our process" or "How it works".
- Don't describe the document inside the document ("this proposal outlines").
