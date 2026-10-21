"""bidx.ai home. What BidX does, the calls open now, the guides, why good applications lose, how it works, proof."""
import json
import os
from html import escape as esc

from .common import load_calls, board, HERE

SMART_SRC = 'https://www.ukri.org/wp-content/uploads/2026/07/IUK-140726-SmartGrantImpactEvaluationReport-TechnicalAnnex.pdf'
FUNDED_SRC = 'https://www.ukri.org/publications/innovate-uk-funded-projects-since-2004/'
STATS_SRC = 'https://www.ukri.org/publications/ukri-investments-and-outputs/statistical-publication-ukri-investment-and-outputs-april-2015-to-march-2026/'

GUIDES = [
    dict(slug='smart-grants-closed', title='Smart grants are closed. Here’s what to apply for instead',
         dek='Innovate UK stopped taking Smart applications. The calls open now are narrower, and most have a deadline before Christmas.',
         img='team', meta=['Updated 20 October', '8 minute read']),
    dict(slug='bridgeai-deployment-catalyst', title='BridgeAI Deployment Catalyst, the three strands',
         dek='£100K to £200K for an AI SME and a larger organisation putting a working system to use. Closes 8 December.',
         img='board', meta=['Closes 8 December', '7 minute read']),
    dict(slug='investor-partnerships', title='Investor Partnerships, a grant with an investor alongside',
         dek='Batteries and engineering biology are open now. How the match works, and why the investor comes first.',
         img='lab', meta=['Closes 25 November and 2 December', '7 minute read']),
]


def dotchart():
    # Smart grants, Feb 2019 to Apr 2024, from Innovate UK's own evaluation. Each dot is 100 applications.
    funded, above80, above70, total = 1295, 1439, 6427, 21782
    n = round(total / 100)            # 218
    g = round(funded / 100)           # 13
    a2 = round(above80 / 100)         # 14
    a = round((above70 - above80) / 100)  # 50
    cells = ['g'] * g + ['a2'] * a2 + ['a'] * a + [''] * (n - g - a2 - a)
    dots = ''.join(f'<i class="{c}" style="transition-delay:{k * 4}ms"></i>' for k, c in enumerate(cells))
    return f'<div class="dotchart rv-dots" role="img" aria-label="Of 21,782 Smart applications, 1,295 were funded, 6,427 scored above 70 and were not, including 1,439 that scored 80 or more. Each dot is 100 applications.">{dots}</div>'


def build(B):
    calls = load_calls()
    with open(os.path.join(HERE, 'data', 'funded_stats.json')) as f:
        fs = json.load(f)
    y3, y2, y1 = fs['2023/24'], fs['2024/25'], fs['2025/26']
    regs = [(r, n) for r, n in y1['regions'] if r not in ('#N/A', 'Outside UK')]
    top = regs[0][1]
    bars = ''.join(f'<div class="bar2"><span>{esc(r)}</span><span class="t"><i style="width:{n / top * 100:.1f}%;transition-delay:{k * 60}ms"></i></span><b>{n:,}</b></div>'
                   for k, (r, n) in enumerate(regs))

    gc = GUIDES
    big = gc[0]

    def card(g, cls=''):
        meta = ''.join(f'<span>{esc(m)}</span>' for m in g['meta'])
        return (f'<a class="gc{cls}" href="/guides/{g["slug"]}/"><span class="ph"><img src="/assets/media/{g["img"]}.jpg" alt="" loading="lazy" width="1600" height="900"></span>'
                f'<span class="tx"><h3>{esc(g["title"])}</h3><p>{esc(g["dek"])}</p><span class="meta">{meta}</span></span></a>')

    body = f'''
<section class="hero">
  <div class="wrap hero-g">
    <div>
      <h1 class="h-xl">Find the grant you fit, before it closes.</h1>
      <p class="lede">BidX writes grant applications with UK founders. Grant writers and AI trained on nearly 1,000 winning bids work to how assessors actually score, so you know which call fits and where the points are lost.</p>
      <div class="ctas"><a class="btn pri" href="/fit/">Check your fit {B.ICON["ar"]}</a><a class="btn sec" href="{B.BOOK}">Book FREE funding call</a></div>
      <div class="trust"><span>&pound;125M+ secured</span><span>312+ founders funded</span><span>Direct access to grant writers</span></div>
      <div class="funders"><span>We write for</span><b>Innovate UK</b><b>European Innovation Council</b><b>NIHR</b></div>
    </div>
    <div class="rv">{board(calls)}</div>
  </div>
</section>

<section class="sec mist" id="guides">
  <div class="wrap">
    <div class="sh"><div><h2 class="h-l rv">Smart grants have closed. The calls open now are narrower, and some put the odds at 2%.</h2></div>
    <p class="lede rv">A guide for each call founders are searching for, what it funds, who can lead, how it&rsquo;s scored and where applications lose points. Checked by a grant writer before it goes up.</p></div>
    <div class="gcards">
      {card(big, " big")}
      <div class="gside">{card(gc[1])}{card(gc[2])}</div>
    </div>
    <p style="margin-top:28px"><a class="btn sec" href="/guides/">All guides {B.ICON["ar"]}</a></p>
  </div>
</section>

<section class="sec">
  <div class="wrap split" style="align-items:center">
    <div>
      
      <h2 class="h-l rv">Good applications lose too.</h2>
      <p class="lede rv" style="margin-top:20px">Innovate UK&rsquo;s own evaluation of Smart grants matched 21,782 applications from February 2019 to April 2024. 1,295 were funded. 6,427 scored above 70, which is typically a pass on other Innovate UK programmes, and still missed out.</p>
      <p class="rv" style="margin-top:16px;color:var(--ink2)">Three independent assessors read each application and mark every scored question from 1 to 10. The gap between a good application and a funded one is in those marks, and that&rsquo;s the part we write for.</p>
      <div class="legend">
        <div><i class="g"></i><b>1,295</b><span>funded</span></div>
        <div><i class="a2"></i><b>1,439</b><span>scored 80 or more, not funded</span></div>
        <div><i class="a"></i><b>4,988</b><span>scored above 70 and under 80, not funded</span></div>
        <div><i></i><b>14,060</b><span>the rest, not funded</span></div>
      </div>
      <span class="src-l">Each dot is 100 applications. Source, <a href="{SMART_SRC}">Smart grants impact evaluation, technical annex</a>, Ipsos for Innovate UK, July 2026. Assessor marking from the Frontier AI assessor guidance on the Innovation Funding Service.</span>
    </div>
    <div>{dotchart()}</div>
  </div>
</section>

<section class="sec mist">
  <div class="wrap">
    <div class="sh"><div><h2 class="h-l rv">Fewer small companies are winning, so every mark counts more.</h2></div>
    <p class="lede rv">UKRI supported 2,393 small and medium businesses in 2025 to 2026, down from 3,563 two years before. The award rate across UKRI fell from 27% to 19% over the same two years.</p></div>
    <div class="years">
      <div><span class="dotf">1,500</span><span>SMEs supported, 2019 to 2020</span></div>
      <div><span class="dotf">3,563</span><span>SMEs supported, 2023 to 2024</span></div>
      <div><span class="dotf">2,393</span><span>SMEs supported, 2025 to 2026</span></div>
    </div>
    <div class="split" style="align-items:start">
      <div>
        <h3 class="h-s" style="margin-bottom:10px">Where this year&rsquo;s Innovate UK winners are</h3>
        <p style="color:var(--ink2)">{y1["sme_companies"]:,} small and medium businesses won awards in Innovate UK competitions run in 2025 to 2026, as the funded projects list stood on 12 October 2026. London leads, then the East and South East of England.</p>
        <span class="src-l">SME numbers and award rates from <a href="{STATS_SRC}">UKRI investment and outputs, April 2015 to March 2026</a>, published July 2026. Regions are our count of distinct company numbers marked micro, small or medium in <a href="{FUNDED_SRC}">Innovate UK funded projects since 2004</a>, UKRI, updated 12 October 2026.</span>
      </div>
      <div class="bars2 rv-bars" role="img" aria-label="SMEs with an Innovate UK award in 2025 to 2026 competitions, by region">{bars}</div>
    </div>
  </div>
</section>

<section class="sec">
  <div class="wrap">
    <div class="sh"><div><h2 class="h-l rv">Your written technical narrative in five business days.</h2></div>
    <p class="lede rv">Grant writer led from the kickoff, and reviewed against the funder&rsquo;s own criteria before it&rsquo;s delivered.</p></div>
    <ol class="steps">
      <li><span class="k">Day 1</span><h3>Kickoff</h3><p>We identify the strongest credible funding route for your company and roadmap.</p></li>
      <li><span class="k">Day 2</span><h3>Roadmap</h3><p>We turn the roadmap into objectives, work packages, milestones, risks and costs.</p></li>
      <li><span class="k">Day 3</span><h3>Draft</h3><p>A specialist grant writer develops the complete written application.</p></li>
      <li><span class="k">Day 4</span><h3>Review</h3><p>The application is reviewed against the funder&rsquo;s criteria before final delivery.</p></li>
      <li><span class="k">Day 5</span><h3>Delivered</h3><p>Your written technical narrative, five business days from kickoff.</p></li>
    </ol>
    <div class="promise">
      <div><b>No suitable route, no fee</b><p>No suitable route at initial review? The professional fee is refunded in full.</p></div>
      <div><b>No grant, no success fee</b><p>No grant cash received means no success fee, ever.</p></div>
      <div><b>Grant writers and AI together</b><p>Professional grant writers and AI trained on nearly 1,000 winning bids, with real assessor insight.</p></div>
    </div>
  </div>
</section>

<section class="sec mist">
  <div class="wrap">
    <div class="sh"><div><h2 class="h-l rv">&pound;125M+ secured for startups and SMEs.</h2></div>
    <p class="lede rv">Three founders BidX has helped, and what they won.</p></div>
    <div class="quotes">
      <figure class="quote rv"><span class="amt">&pound;600K</span><blockquote>&ldquo;BidX helped Flock win &pound;600K after a failed Innovate UK application.&rdquo;</blockquote><figcaption>Sustainable tech startup</figcaption></figure>
      <figure class="quote rv"><span class="amt">&pound;393K</span><blockquote>&ldquo;BidX helped us win &pound;393K to accelerate growth for our energy startup.&rdquo;</blockquote><figcaption>Renewable energy startup</figcaption></figure>
      <figure class="quote rv"><span class="amt">&pound;250K</span><blockquote>&ldquo;BidX unlocked &pound;250K in non dilutive funding for CBC.&rdquo;</blockquote><figcaption>Building sector startup</figcaption></figure>
    </div>
  </div>
</section>

<section class="sec" id="founders">
  <div class="wrap">
    <div class="sh"><div><h2 class="h-l rv">Two founders who&rsquo;ve won it themselves.</h2></div>
    <p class="lede rv">Between them, 40+ grant applications won and over $1B in contracts, with grant writers leading every application.</p></div>
    <div class="people">
      <div class="person rv"><div><h3>Simon Dutta</h3><p class="role">MBA, FCIM. Co Founder, Growth &amp; GTM</p></div>
        <p>Simon has helped teams secure over $1B in public and private contracts with organisations including Boeing, Airbus, Barclays, HMRC and the FCA. He works directly with founders to sharpen positioning, strengthen commercial narratives and shape applications around what assessors actually score for. Third startup, one previous exit.</p>
        <div class="nums"><div><span class="dotf">$1B+</span><span>in contracts secured</span></div></div>
        <a href="{B.LI_SIMON}">Simon on LinkedIn</a></div>
      <div class="person rv"><div><h3>Aaron Mason</h3><p class="role">PhD. Co Founder, Product &amp; AI</p></div>
        <p>With a PhD in Computer Science and AI, Aaron has helped founders secure more than &pound;125M in grant funding and personally led 40+ successful grant applications across his own startups and client projects. He has founded multiple technology startups, achieved two exits and directly leads BidX&rsquo;s AI and funding systems.</p>
        <div class="nums"><div><span class="dotf">&pound;125M+</span><span>secured for founders</span></div><div><span class="dotf">40+</span><span>applications won</span></div></div>
        <a href="{B.LI_AARON}">Aaron on LinkedIn</a></div>
    </div>
    <div class="own rv">{B.glyph("gggggggg", "big")}<p><b>BidX has won Innovate UK funding itself.</b> &pound;99,350 in 2024, leading a project in the AI Solutions to improve productivity in key sectors competition, to make construction bid responses faster with AI.</p>
      <a href="https://gtr.ukri.org/projects?ref=10105102">The project on Gateway to Research</a></div>
  </div>
</section>

<section class="sec tight">
  <div class="wrap">
    <div class="close">
      <div>
        <h2 class="h-l">See if your business is fundable.</h2>
        <p class="lede" style="margin-top:18px">Book a funding strategy call and we&rsquo;ll show you which grants fit your business, where founders usually lose points, and whether your company is realistically fundable.</p>
        <div class="ctas" style="margin-top:28px"><a class="btn pri" href="{B.BOOK}">Book FREE funding call</a><a class="btn sec" href="/fit/">Check your fit first</a></div>
      </div>
      <ul>
        <li>Pick a time that suits you, the call is free</li>
        <li>We look at the calls open now against your roadmap</li>
        <li>Not ready to talk, read the guide for your call first</li>
      </ul>
    </div>
  </div>
</section>
'''
    return [('index.html', B.page('BidX | Grant funding for UK founders, matched to calls open now',
                                  'Grant writer led applications for UK founders. See the Innovate UK calls open now, read the guide for yours and book a free funding call.',
                                  '/', body, cur='/'))]
