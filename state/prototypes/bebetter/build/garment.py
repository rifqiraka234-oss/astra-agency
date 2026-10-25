"""The garment, drawn once as four symbols (tee and hoodie, back and front) that every view of the kit uses.

Their own custom work sets the print grammar (Team Siem, Bookaleap, American Gym Antwerp, Human Sports, from their
29 Jun 2026 post). The name across the shoulders, an emblem in the middle, EST and a year beside it, a motto under it,
and a small mark on the chest at the front. kit.js writes the visitor's choices into the print elements by data-p, and
every <use> of a symbol follows, so the hero, the work order and the rail always show the same kit.
"""

VB = '0 0 1000 1080'

# outlines, in the 1000 x 1080 box
TEE = ('M392 92C440 108 560 108 608 92L792 134C852 190 906 262 958 342L862 456C842 444 816 434 794 430'
       'L800 1032C640 1048 360 1048 200 1032L206 430C184 434 158 444 138 456L42 342C94 262 148 190 208 134Z')
HOOD = ('M372 96C430 116 570 116 628 96L806 142C860 230 900 520 944 868L846 892C820 690 800 560 786 470'
        'L792 948L792 1032C640 1046 360 1046 208 1032L208 948L214 470C200 560 180 690 154 892L56 868'
        'C100 520 140 230 194 142Z')

PRINT = {
    # arc for the name, emblem box, the EST and city beside it, the motto line, per view
    'tee-back': {'arc': 'M262 360Q500 214 738 360', 'block_y': 330, 'em': (500, 540, 300), 'side_y': 548, 'motto_y': 790, 'w': 560, 'fa': 92, 'fb': 150},
    'hood-back': {'arc': 'M286 470Q500 352 714 470', 'block_y': 452, 'em': (500, 640, 250), 'side_y': 646, 'motto_y': 850, 'w': 500, 'fa': 72, 'fb': 132},
    'tee-front': {'chest': (500, 236), 'w': 230, 'fc': 38},
    'hood-front': {'chest': (500, 300), 'w': 200, 'fc': 34},
}


def _shade(gid):
    """Drape, painted into the cloth. Dark at the side seams and under the arms, light across the shoulders."""
    return f'''<linearGradient id="{gid}-side" x1="0" x2="1" y1="0" y2="0">
  <stop offset="0" stop-color="#000" stop-opacity=".42"/><stop offset=".14" stop-color="#000" stop-opacity=".05"/>
  <stop offset=".5" stop-color="#fff" stop-opacity=".05"/><stop offset=".86" stop-color="#000" stop-opacity=".05"/>
  <stop offset="1" stop-color="#000" stop-opacity=".42"/></linearGradient>
<radialGradient id="{gid}-top" cx=".5" cy=".08" r=".62"><stop offset="0" stop-color="#fff" stop-opacity=".12"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
<linearGradient id="{gid}-hem" x1="0" x2="0" y1="0" y2="1"><stop offset=".78" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".28"/></linearGradient>'''


def _folds(kind, side):
    """A few soft folds where an oversized garment breaks, blurred so they read as cloth, not lines."""
    if kind == 'tee':
        d = ['M212 470C260 560 270 700 252 880', 'M788 470C740 560 730 700 748 880', 'M150 400C175 420 196 432 214 440',
             'M850 400C825 420 804 432 786 440', 'M224 450C300 492 352 520 404 590', 'M776 450C700 492 648 520 596 590',
             'M340 640C350 760 344 880 352 1010', 'M660 640C650 760 656 880 648 1010']
    else:
        d = ['M222 520C262 620 268 760 250 920', 'M778 520C738 620 732 760 750 920', 'M120 700C130 760 136 820 140 870',
             'M880 700C870 760 864 820 860 870', 'M500 420C496 560 504 700 500 860']
    return ''.join(f'<path d="{p}" fill="none" stroke="#000" stroke-opacity=".3" stroke-width="20" stroke-linecap="round" filter="url(#bb-soft)"/>' for p in d) + \
        ''.join(f'<path d="{p}" fill="none" stroke="#fff" stroke-opacity=".07" stroke-width="10" stroke-linecap="round" transform="translate(14 0)" filter="url(#bb-soft)"/>' for p in d[:2])


def _cloth(sid, outline, kind, side):
    """Base colour, the stone wash, the drape, the seams. The wash is a texture blended per colour in CSS."""
    clip = f'{sid}-clip'
    extra = under = ''
    if kind == 'tee' and side == 'back':
        extra = '<path class="seam" d="M386 88C440 108 560 108 614 88L608 102C560 124 440 124 392 102Z"/>'
    elif kind == 'tee':
        extra = ('<path class="inside" d="M392 92C440 108 560 108 608 92C584 176 416 176 392 92Z"/>'
                 '<path class="seam rib" d="M392 92C416 176 584 176 608 92L620 96C594 196 406 196 380 96Z"/>')
    elif side == 'back':
        under = '<path class="hood" d="M342 100C318 236 356 372 500 404C644 372 682 236 658 100C600 62 400 62 342 100Z"/>'
        extra = ('<path class="stitch" d="M500 74L500 404"/>'
                 '<path class="hood-edge" d="M342 100C318 236 356 372 500 404C644 372 682 236 658 100"/>')
    else:
        extra = ('<path class="inside" d="M404 102C424 232 576 232 596 102C556 80 444 80 404 102Z"/>'
                 '<path class="hood-edge band" d="M404 102C424 232 576 232 596 102"/>'
                 '<path class="cord" d="M462 222L456 420M538 222L544 420"/>'
                 '<path class="stitch" d="M296 690L704 690L748 902L252 902Z"/>'
                 '<path class="stitch" d="M296 690L262 860M704 690L738 860"/>')
    cuffs = ''
    if kind == 'hood':
        cuffs = ('<path class="rib" d="M56 868L154 892L148 940L48 916Z"/><path class="rib" d="M944 868L846 892L852 940L952 916Z"/>'
                 '<path class="rib" d="M208 948L792 948L792 1032C640 1046 360 1046 208 1032Z"/>')
    return f'''<clipPath id="{clip}"><path d="{outline}"/></clipPath>
<g clip-path="url(#{clip})">
  <path class="cloth" d="{outline}"/>
  {under}
  <image class="wash" href="/assets/wash.webp" x="0" y="0" width="1000" height="1080" preserveAspectRatio="none"/>
  <rect width="1000" height="1080" fill="url(#bb-side)"/>
  <rect width="1000" height="1080" fill="url(#bb-top)"/>
  <rect width="1000" height="1080" fill="url(#bb-hem)"/>
  {_folds(kind, side)}
  {cuffs}
  {extra}
</g>
<path class="edge" d="{outline}"/>'''


def _back_print(sid, view):
    p = PRINT[view]
    ex, ey, es = p['em']
    arc = f'{sid}-arc'
    return f'''<path id="{arc}" d="{p['arc']}" fill="none"/>
<g class="ink" mask="url(#bb-grain)">
  <clipPath id="{sid}-pull"><rect class="pull" x="0" y="0" width="1000" height="1080"/></clipPath>
  <g clip-path="url(#{sid}-pull)">
    <text class="p-arc" text-anchor="middle" font-size="{p['fa']}"><textPath href="#{arc}" startOffset="50%" data-p="name">YOUR GYM</textPath></text>
    <text class="p-block" x="500" y="{p['block_y']}" text-anchor="middle" font-size="{p['fb']}" data-p="name" data-w="{p['w']}">YOUR GYM</text>
    <g class="em em-mono" transform="translate({ex} {ey})">
      <circle r="{es * .44:.0f}" fill="none" stroke-width="7"/>
      <circle r="{es * .37:.0f}" fill="none" stroke-width="3"/>
      <text class="p-ini" y="{es * .12:.0f}" text-anchor="middle" data-p="ini">YG</text>
      <path class="star" d="M0 {-es * .405:.0f}l4.7 9.6 10.6 1.5-7.7 7.5 1.8 10.5-9.4-5-9.4 5 1.8-10.5-7.7-7.5 10.6-1.5Z" transform="translate(0 -6)"/>
    </g>
    <image class="em em-teddy dk" href="/assets/teddy.webp" x="{ex - es * .62:.0f}" y="{ey - es * .6:.0f}" width="{es * 1.24:.0f}" height="{es * 1.18:.0f}"/>
    <image class="em em-teddy lt" href="/assets/teddy-light.webp" x="{ex - es * .62:.0f}" y="{ey - es * .6:.0f}" width="{es * 1.24:.0f}" height="{es * 1.18:.0f}"/>
    <g class="em em-ph" transform="translate({ex} {ey})"><rect x="{-es / 2:.0f}" y="{-es / 2:.0f}" width="{es}" height="{es}" fill="none" stroke-width="4" stroke-dasharray="14 10"/><text y="14" text-anchor="middle">LOGO</text></g>
    <image class="em em-logo" data-p="logo" href="" x="{ex - es / 2:.0f}" y="{ey - es / 2:.0f}" width="{es}" height="{es}" preserveAspectRatio="xMidYMid meet"/>
    <text class="p-side" x="{ex - es * .62 - 18:.0f}" y="{p['side_y']}" text-anchor="end" data-p="est"></text>
    <text class="p-side" x="{ex + es * .62 + 18:.0f}" y="{p['side_y']}" text-anchor="start" data-p="city"></text>
    <text class="p-motto" x="500" y="{p['motto_y']}" text-anchor="middle" data-p="motto"></text>
  </g>
</g>'''


def _front_print(sid, view):
    x, y = PRINT[view]['chest']
    return f'''<g class="ink" mask="url(#bb-grain)">
  <clipPath id="{sid}-pull"><rect class="pull" x="0" y="0" width="1000" height="1080"/></clipPath>
  <g clip-path="url(#{sid}-pull)">
    <text class="p-chest" x="{x}" y="{y}" text-anchor="middle" font-size="{PRINT[view]['fc']}" data-p="name" data-w="{PRINT[view]['w']}">YOUR GYM</text>
  </g>
</g>'''


def defs():
    """All four symbols and what they share. Goes once per page, every view of the kit is a <use>."""
    syms = ''
    for kind, outline in (('tee', TEE), ('hood', HOOD)):
        for side in ('back', 'front'):
            view = f'{kind}-{side}'
            sid = f'bb-{view}'
            pr = _back_print(sid, view) if side == 'back' else _front_print(sid, view)
            syms += f'<symbol id="{sid}" viewBox="{VB}" class="g-{kind} g-{side}">{_cloth(sid, outline, kind, side)}{pr}</symbol>'
    return f'''<svg class="bb-defs" width="0" height="0" aria-hidden="true" focusable="false"><defs>
{_shade('bb')}
<filter id="bb-soft" filterUnits="userSpaceOnUse" x="0" y="0" width="1000" height="1080"><feGaussianBlur stdDeviation="16"/></filter>
<mask id="bb-grain" maskUnits="userSpaceOnUse" x="0" y="0" width="1000" height="1080"><image href="/assets/grain.webp" width="1000" height="1080" preserveAspectRatio="none"/></mask>
</defs>{syms}</svg>'''


def use(view='tee-back', cls='', label=''):
    lab = f' role="img" aria-label="{label}"' if label else ' aria-hidden="true"'
    return f'<svg class="garment {cls}" viewBox="{VB}"{lab} focusable="false"><use href="#bb-{view}" data-view/></svg>'


def tour_svg():
    """The back of a tour tee for the home page's road section. Their wordmark across the shoulders, the stops are
    HTML buttons laid over the print (see the tr-list in build.py), so they stay real, focusable controls."""
    import os
    import re
    wm = open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'assets', 'wordmark.svg')).read()
    path = re.search(r'<path d="([^"]+)"', wm).group(1)
    sid = 'bb-tour'
    # the wordmark is 2353 x 514, set 420 wide across the shoulders
    k = 420 / 2353
    return f'''<svg class="garment tr-g" viewBox="{VB}" aria-hidden="true" focusable="false">
{_cloth(sid, TEE, 'tee', 'back')}
<g class="tr-ink" mask="url(#bb-grain)">
  <path d="{path}" fill-rule="evenodd" transform="translate({500 - 210} 214) scale({k:.5f})"/>
  <text x="500" y="350" text-anchor="middle" class="tr-sub">ON THE ROAD 2026</text>
  <path d="M300 378H700" stroke-width="3"/>
  <path d="M300 900H700" stroke-width="3"/>
  <text x="500" y="950" text-anchor="middle" class="tr-sub tr-s2">1% BETTER EVERY DAY</text>
</g>
</svg>'''
