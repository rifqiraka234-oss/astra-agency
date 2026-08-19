#!/usr/bin/env python3
import json, os
from sig import signature, dominant_of, AXES, INKS
from data import ROSTER, MOTIVATORS, STAGES, FEATURES, SEGMENTS, ACTIONS

A = json.load(open('enc/assets.json'))
FONTCSS = open('fonts/inline.css').read()
CSS = open('style.css').read()

def img(k): return A[k]['uri']

ALEX = ROSTER[0]
ALEX_DOM = dominant_of(ALEX['vals'])


def sig_for(p, **kw):
    return signature(hash_seed(p['name']), p['vals'], dominant_of(p['vals']), **kw)


def hash_seed(name):
    h = 2166136261
    for ch in name:
        h = ((h ^ ord(ch)) * 16777619) & 0xFFFFFFFF
    return h


# ---------------------------------------------------------------- nav / chrome
NAV = [
    ("home", "Home"),
    ("how", "How It Works"),
    ("library", "The Archetype Library"),
    ("managers", "For Managers"),
    ("about", "About"),
]

def nav_html():
    items = "".join(
        f'<a href="#{k}" data-go="{k}">{label}</a>' for k, label in NAV)
    return f"""<header class="mast">
  <div class="mast-in">
    <a class="logo" href="#home" data-go="home"><img src="{img('logo')}" alt="Archetype HR" width="986" height="153"></a>
    <nav class="nav" aria-label="Primary">
      {items}
      <a class="nav-cta" href="#waitlist" data-go="waitlist">Join the Waitlist</a>
    </nav>
  </div>
</header>"""


# ---------------------------------------------------------------- home
def wall_html():
    cells = []
    for p in ROSTER:
        cells.append(
            f'<figure>{sig_for(p, size=300, rings=7, steps=64, ticks=False, dark=True)}'
            f'<figcaption>{p["name"].split()[0]}</figcaption></figure>')
    return f'<div class="wall">{"".join(cells)}</div>'


def key_html():
    out = []
    for name, desc in MOTIVATORS:
        out.append(f'<div><div class="sw" style="background:{INKS[name]}"></div>'
                   f'<h4>{name}</h4><p class="small muted">{desc}</p></div>')
    return f'<div class="key">{"".join(out)}</div>'


def home():
    feats = "".join(
        f'<li><span class="n">{i+1:02d}</span><h3>{t}</h3><p class="muted">{d}</p></li>'
        for i, (t, d) in enumerate(FEATURES))
    segs = "".join(f'<tr><th>{a}</th><td>{b}</td></tr>' for a, b in SEGMENTS)
    acts = "".join(f'<li><span class="n">{i+1:02d}</span><h3>{a}</h3></li>'
                   for i, a in enumerate(ACTIONS))
    return f"""<div class="route" id="home">

<section class="hero">
  <div class="wrap hero-in">
    <div>
      <span class="idx"><b>01</b> &nbsp;/&nbsp; The premise</span>
      <h1 style="margin-top:20px">Engagement happens one person at a time.</h1>
      <p class="lede hero-sub">Archetype HR uses an AI-powered assessment to identify what motivates each
        employee, translates that into a personalized archetype profile, and gives managers real-time
        support for feedback, recognition, coaching, and difficult conversations.</p>
      <div class="hero-meta">
        <a class="btn" href="#waitlist" data-go="waitlist">Join the Waitlist</a>
        <a class="btn line" href="#how" data-go="how">See how it works</a>
      </div>
    </div>
    <div class="hero-fig">
      <div class="breathe">{signature(hash_seed(ALEX['name']), ALEX['vals'], ALEX_DOM, size=560, rings=11, steps=96)}</div>
    </div>
  </div>
</section>

<section class="sec deep">
  <div class="wrap">
    <div class="sec-head">
      <div>
        <span class="idx"><b>02</b> &nbsp;/&nbsp; The measurement problem</span>
        <h2 style="margin-top:18px;max-width:16ch">An engagement survey gives you one number for everybody.</h2>
      </div>
      <p class="lede">Many organizations rely on engagement surveys that are slow, expensive, and hard to
        act on. Managers are left guessing what motivates their people. Meaningful engagement suffers.</p>
    </div>

    <div class="onebar">
      <span class="onebar-num tnum">80%</span>
      <div class="onebar-track" style="margin-top:20px"><div class="onebar-fill"></div></div>
      <p class="small muted" style="margin-top:14px">of employees globally are not engaged at work.
        <span style="display:block;margin-top:3px">2026 Gallup State of the Global Workforce Report</span></p>
    </div>

    <hr class="hr" style="margin:clamp(46px,5vw,86px) 0 0">

    <div style="padding-top:clamp(34px,4vw,60px)">
      <h3 style="max-width:22ch">Here is the same workforce, read one person at a time.</h3>
      <p class="lede" style="margin-top:16px;max-width:60ch">Each form below is one employee, drawn from
        their own assessment. The shape is the person: what moves them, what steadies them, and what
        makes them quietly start looking elsewhere.</p>
      {wall_html()}
      <p class="small muted" style="margin-top:26px">
        <a href="#library" data-go="library" style="color:#F4F5F8;border-bottom:1px solid rgba(255,255,255,.35);padding-bottom:2px">Open the archetype library</a>
      </p>
    </div>
  </div>
</section>

<section class="sec">
  <div class="wrap">
    <div class="sec-head">
      <div>
        <span class="idx"><b>03</b> &nbsp;/&nbsp; What the assessment reads</span>
        <h2 style="margin-top:18px;max-width:15ch">Six motivators, weighted per person.</h2>
      </div>
      <p class="lede">Understand individual motivators, preferred coaching style, and engagement drivers.
        The weighting is what separates one profile from the next, and it is what a single engagement
        score can never show you.</p>
    </div>
    {key_html()}
  </div>
</section>

<section class="sec" style="padding-top:0">
  <div class="wrap">
    <div class="sec-head" style="margin-bottom:clamp(26px,3vw,44px)">
      <div>
        <span class="idx"><b>04</b> &nbsp;/&nbsp; The platform</span>
        <h2 style="margin-top:18px;max-width:15ch">Everything you need to understand, support, and engage your people.</h2>
      </div>
      <p class="lede">Personal, Practical, and Powered by AI.</p>
    </div>
    <ul class="feat">{feats}</ul>
  </div>
</section>

<section class="sec deep" style="padding-top:clamp(46px,5.5vw,90px)">
  <div class="wrap">
    <div class="sec-head">
      <div>
        <span class="idx"><b>05</b> &nbsp;/&nbsp; Turn insight into action</span>
        <h2 style="margin-top:18px;max-width:16ch">Engagement is not about more data. It is about better action.</h2>
      </div>
      <p class="lede">We provide better data and a more effective playbook, so managers can lead, and
        employees feel heard.</p>
    </div>
    <ul class="feat" style="border-top-color:rgba(255,255,255,.13);margin-top:clamp(26px,3vw,44px)">
      {acts.replace('<li>', '<li style="border-bottom-color:rgba(255,255,255,.13)">')}
    </ul>
  </div>
</section>

<section class="sec">
  <div class="wrap">
    <div class="sec-head" style="margin-bottom:clamp(24px,3vw,40px)">
      <div>
        <span class="idx"><b>06</b> &nbsp;/&nbsp; Built for today's workplace</span>
        <h2 style="margin-top:18px;max-width:16ch">Designed for organizations that know engagement happens one person at a time.</h2>
      </div>
      <p class="lede">Five groups feel this problem first, and each of them feels it differently.</p>
    </div>
    <table class="tbl"><tbody>{segs}</tbody></table>
  </div>
</section>

<section class="sec" id="about" style="padding-top:0">
  <div class="wrap">
    <div class="sec-head" style="margin-bottom:clamp(26px,3vw,44px)">
      <div>
        <span class="idx"><b>07</b> &nbsp;/&nbsp; About</span>
        <h2 style="margin-top:18px;max-width:17ch">Two HR leaders who spent years inside this exact gap.</h2>
      </div>
      <p class="lede">Archetype HR was created to help organizations move beyond surface-level engagement
        and build more productive and motivated workplaces.</p>
    </div>
    <div class="people">
      <figure class="person">
        <img src="{img('jori')}" alt="Portrait of Jori Chykerda" width="385" height="576" loading="lazy">
        <figcaption>
          <h3>Jori Chykerda</h3>
          <p class="xs muted">Co-Founder &amp; CEO</p>
          <p class="small" style="margin-top:10px">More than ten years in HR, employee engagement,
            organizational culture, and leadership development.</p>
        </figcaption>
      </figure>
      <figure class="person">
        <img src="{img('greg')}" alt="Portrait of Greg Hussey" width="403" height="581" loading="lazy">
        <figcaption>
          <h3>Greg Hussey</h3>
          <p class="xs muted">Co-Founder &amp; COO</p>
          <p class="small" style="margin-top:10px">Entrepreneur, CEO of Impact HR since 2017, and an HR
            consultant for more than fifteen years.</p>
        </figcaption>
      </figure>
    </div>
  </div>
</section>

{closing()}
</div>"""


# ---------------------------------------------------------------- how it works
def stage_art(i):
    if i == 0:
        return survey_card(1, "I feel most motivated at work when&hellip;",
                           "my work is recognized by people I respect.", 0, 8)
    if i == 1:
        return survey_card(9, "When I receive feedback, I prefer it to be&hellip;",
                           "direct and specific, even if it is difficult to hear.", 1, 75)
    if i == 2:
        return (f'<div style="max-width:280px">'
                f'{signature(hash_seed(ALEX["name"]), ALEX["vals"], ALEX_DOM, size=320, rings=9, steps=72)}'
                f'</div>')
    if i == 3:
        rows = "".join(roster_row(p, mini=True) for p in ROSTER[:4])
        return (f'<div class="tblwrap"><table class="roster" style="margin-top:0;min-width:0">'
                f'<tbody>{rows}</tbody></table></div>')
    return prep_card()


def survey_card(q, question, answer, sel, pct):
    opts = ["Strongly agree", "Agree", "Neutral", "Disagree", "Strongly disagree"]
    o = "".join(f'<div class="opt{" on" if i == sel else ""}">{t}</div>'
                for i, t in enumerate(opts))
    return f"""<div class="survey">
  <div class="survey-top"><span>Motivation Assessment</span><span class="tnum">Question {q} of 12</span></div>
  <div class="survey-prog"><i style="width:{pct}%"></i></div>
  <div class="survey-body">
    <h4>{question}</h4>
    <div class="opts">{o}</div>
    <p class="xs muted" style="margin-top:14px">&hellip;{answer}</p>
  </div>
</div>"""


def prep_card():
    return f"""<div class="prep">
  <h3>Before you meet with Alex</h3>
  <p class="xs" style="color:#767C90">Prepared from the latest profile</p>
  <ol>
    <li><span><b>Lead with specific recognition.</b> Recognition is Alex's strongest motivator at 88,
      and none has been logged this period.</span></li>
    <li><span><b>Keep the feedback direct.</b> The profile shows a preference for specific, promptly
      delivered feedback over comments saved for a formal review.</span></li>
    <li><span><b>Offer visible ownership.</b> A small initiative Alex can lead publicly will land
      harder than a private thank you.</span></li>
    <li><span><b>Name the trend, not just the moment.</b> Alex is already improving, and saying so
      keeps the conversation forward looking.</span></li>
  </ol>
</div>"""


def how():
    rows = []
    for i, (title, desc) in enumerate(STAGES):
        rows.append(f"""<div class="stage">
  <span class="stage-n">{i+1:02d}</span>
  <div><h3>{title}</h3><p class="muted small">{desc}</p></div>
  <div class="stage-art">{stage_art(i)}</div>
</div>""")
    return f"""<div class="route" id="how">
<section class="sec">
  <div class="wrap">
    <div class="sec-head">
      <div>
        <span class="idx"><b>01</b> &nbsp;/&nbsp; How it works</span>
        <h2 style="margin-top:18px;max-width:15ch">A simple, structured process designed to deliver meaningful insights quickly.</h2>
      </div>
      <p class="lede">Five stages, followed here through one employee, from the first question to the
        conversation it is all built for.</p>
    </div>
    <div style="margin-top:clamp(30px,3.6vw,52px);border-top:1px solid var(--rule)">
      {''.join(rows)}
    </div>
  </div>
</section>

<section class="sec deep" style="padding-top:clamp(46px,5.5vw,86px)">
  <div class="wrap">
    <div class="sec-head">
      <div>
        <span class="idx"><b>02</b> &nbsp;/&nbsp; What we are building</span>
        <h2 style="margin-top:18px;max-width:18ch">We identify what drives each individual employee.</h2>
      </div>
      <p class="lede">Then we translate it into a clear and practical archetype profile, and give
        managers guidance they can use the same day.</p>
    </div>
    <ul class="feat" style="border-top-color:rgba(255,255,255,.13);margin-top:clamp(26px,3vw,44px)">
      <li style="border-bottom-color:rgba(255,255,255,.13)"><span class="n">01</span><h3>Communicate more effectively</h3></li>
      <li style="border-bottom-color:rgba(255,255,255,.13)"><span class="n">02</span><h3>Deliver meaningful feedback</h3></li>
      <li style="border-bottom-color:rgba(255,255,255,.13)"><span class="n">03</span><h3>Recognize employees in ways that actually resonate</h3></li>
      <li style="border-bottom-color:rgba(255,255,255,.13)"><span class="n">04</span><h3>Lead each person based on what motivates them</h3></li>
    </ul>
    <p class="lede" style="margin-top:34px;max-width:34ch;color:#F4F5F8">Not generic advice.
      Real, personalized guidance.</p>
  </div>
</section>
{closing()}
</div>"""


# ---------------------------------------------------------------- library
def library():
    cells = []
    for p in ROSTER:
        d = dominant_of(p['vals'])
        cells.append(f"""<figure>
  {sig_for(p, size=320, rings=8, steps=68)}
  <figcaption>
    <p class="nm">{p['name']}</p>
    <p class="rl">{p['role']} &middot; {d}</p>
    <p class="ln">{p['line']}</p>
  </figcaption>
</figure>""")
    axes = "".join(
        f'<div class="axis"><span>{AXES[i]}</span>'
        f'<div class="axis-track"><div class="axis-fill" style="width:{round(v*100)}%;background:{INKS[AXES[i]]}"></div></div>'
        f'<span class="v tnum">{round(v*100)}</span></div>'
        for i, v in enumerate(ALEX['vals']))
    return f"""<div class="route" id="library">
<section class="sec">
  <div class="wrap">
    <div class="sec-head">
      <div>
        <span class="idx"><b>01</b> &nbsp;/&nbsp; The archetype library</span>
        <h2 style="margin-top:18px;max-width:14ch">Fourteen people. Fourteen different shapes.</h2>
      </div>
      <p class="lede">Every profile is drawn from that person's own assessment. Nobody on this team
        shares a form with anybody else, which is the entire argument for reading engagement
        individually.</p>
    </div>
    <div class="gal">{''.join(cells)}</div>
  </div>
</section>

<section class="sec" style="padding-top:0">
  <div class="wrap">
    <div class="sec-head" style="margin-bottom:clamp(24px,3vw,40px)">
      <div>
        <span class="idx"><b>02</b> &nbsp;/&nbsp; Reading one profile</span>
        <h2 style="margin-top:18px;max-width:16ch">Inside a single archetype profile.</h2>
      </div>
      <p class="lede">This is the artifact a manager opens. Motivator weighting, preferred coaching
        style, and engagement drivers, on one sheet.</p>
    </div>
    <div class="sheet">
      <div>
        {signature(hash_seed(ALEX['name']), ALEX['vals'], ALEX_DOM, size=340, rings=9, steps=72)}
        <p class="xs muted" style="text-align:center;margin-top:12px">Alex Rivera &middot; {ALEX['role']}</p>
      </div>
      <div>
        <h3>Alex Rivera</h3>
        <p class="small muted" style="margin-top:4px">Generated from 12 responses &middot; Recognition driven</p>
        <div style="margin-top:22px">{axes}</div>
        <div class="field" style="margin-top:22px">
          <h4>Preferred coaching style</h4>
          <p class="small">Direct and specific feedback, delivered promptly rather than saved for a
            formal review. Responds well to public recognition of specific contributions.</p>
        </div>
        <div class="field">
          <h4>Engagement drivers</h4>
          <p class="small">Visibility of impact, opportunities to lead small initiatives, and consistent
            acknowledgment from people they respect.</p>
        </div>
        <div class="field">
          <h4>Where this profile goes quiet</h4>
          <p class="small">Long stretches without acknowledgement, and feedback held back for a
            scheduled review cycle. Stability scores lowest here at 39, so an unexplained
            reorganization costs more with Alex than with most of the team.</p>
        </div>
      </div>
    </div>
  </div>
</section>
{closing()}
</div>"""


# ---------------------------------------------------------------- managers
def roster_row(p, mini=False):
    d = dominant_of(p['vals'])
    flag = ' class="flag"' if p['status'] == 'attention' else ''
    tag = ('<span class="tag att">Needs attention</span>' if p['status'] == 'attention'
           else '<span class="tag ok">On track</span>')
    arrow = {"Improving": "&uarr;", "Stable": "&rarr;", "Declining": "&darr;"}[p['trend']]
    mini_sig = sig_for(p, size=120, rings=4, steps=44, ticks=False, core=False)
    if mini:
        return (f'<tr{flag}><td><div class="who">{mini_sig}'
                f'<div><div class="nm">{p["name"]}</div><div class="rl">{d}</div></div></div></td>'
                f'<td style="text-align:right">{tag}</td></tr>')
    return (f'<tr{flag}><td><div class="who">{mini_sig}'
            f'<div><div class="nm">{p["name"]}</div><div class="rl">{p["role"]}</div></div></div></td>'
            f'<td>{d}</td><td>{p["team"]}</td>'
            f'<td class="muted">{arrow} {p["trend"]}</td><td>{tag}</td></tr>')


def managers():
    rows = "".join(roster_row(p) for p in ROSTER)
    return f"""<div class="route" id="managers">
<section class="sec">
  <div class="wrap">
    <div class="sec-head">
      <div>
        <span class="idx"><b>01</b> &nbsp;/&nbsp; For managers</span>
        <h2 style="margin-top:18px;max-width:15ch">Individual and team-level insights you can immediately act on.</h2>
      </div>
      <p class="lede">The dashboard leads with the person, not the average. Each row carries that
        employee's own profile, so a manager scanning the team sees fourteen individuals rather than
        one score.</p>
    </div>
    <div class="tblwrap">
      <table class="roster">
        <thead><tr><th>Employee</th><th>Primary motivator</th><th>Team</th><th>Trend</th><th>Status</th></tr></thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  </div>
</section>

<section class="sec" style="padding-top:0">
  <div class="wrap">
    <div class="sec-head" style="margin-bottom:clamp(24px,3vw,40px)">
      <div>
        <span class="idx"><b>02</b> &nbsp;/&nbsp; Why a person surfaces</span>
        <h2 style="margin-top:18px;max-width:16ch">The dashboard explains itself.</h2>
      </div>
      <p class="lede">Clear summaries with practical recommendations, not just data.</p>
    </div>
    <div class="close-grid" style="margin-top:0">
      <div>
        <h4>Alex Rivera</h4>
        <p class="small muted">Recognition is the strongest driver at 88, and no recognition event has
          been logged this period. The gap surfaces automatically rather than waiting for a manager
          to notice it.</p>
      </div>
      <div>
        <h4>Taylor Wu</h4>
        <p class="small muted">Stability leads this profile at 88 and the trend is declining through a
          reporting-line change. This is the profile that absorbs change well when told early.</p>
      </div>
      <div>
        <h4>Owen Brooks</h4>
        <p class="small muted">High stability, high belonging, long tenure, and a quiet decline. Low
          noise is not the same as low risk, and the score separates the two.</p>
      </div>
    </div>
  </div>
</section>

<section class="sec" style="padding-top:0">
  <div class="wrap">
    <div class="sec-head" style="margin-bottom:clamp(24px,3vw,40px)">
      <div>
        <span class="idx"><b>03</b> &nbsp;/&nbsp; The conversation</span>
        <h2 style="margin-top:18px;max-width:15ch">Five minutes before the one-on-one.</h2>
      </div>
      <p class="lede">Managers use insights to guide feedback, coaching, recognition, and action
        planning. This is the last screen before the door closes.</p>
    </div>
    <div style="max-width:760px">{prep_card()}</div>
  </div>
</section>
{closing()}
</div>"""


# ---------------------------------------------------------------- waitlist
def waitlist():
    return f"""<div class="route" id="waitlist">
<section class="sec">
  <div class="narrow">
    <span class="idx"><b>01</b> &nbsp;/&nbsp; Join the waitlist</span>
    <h2 style="margin-top:18px;max-width:16ch">Be part of what is next in employee engagement.</h2>
    <p class="lede" style="margin-top:18px;max-width:52ch">Tell us a little about the team you lead.
      Early access opens in stages, and organizations that share their engagement challenge go into
      the first group.</p>

    <div class="formwrap" style="margin-top:clamp(32px,4vw,56px)">
      <form id="wl" novalidate>
        <div class="fld" id="f-name">
          <label for="i-name">Full name<span class="req">*</span></label>
          <input id="i-name" name="name" type="text" autocomplete="name" required>
          <p class="err">Please enter your name.</p>
        </div>
        <div class="fld" id="f-email">
          <label for="i-email">Work email<span class="req">*</span></label>
          <input id="i-email" name="email" type="email" autocomplete="email" required>
          <p class="err">Please enter a valid work email address.</p>
        </div>
        <div class="fld" id="f-org">
          <label for="i-org">Organization<span class="req">*</span></label>
          <input id="i-org" name="org" type="text" autocomplete="organization" required>
          <p class="err">Please enter your organization.</p>
        </div>
        <div class="fld" id="f-size">
          <label for="i-size">Team size<span class="req">*</span></label>
          <select id="i-size" name="size" required>
            <option value="">Select a range</option>
            <option>Under 50 employees</option>
            <option>50 to 200 employees</option>
            <option>200 to 500 employees</option>
            <option>500 to 1,000 employees</option>
            <option>More than 1,000 employees</option>
          </select>
          <p class="err">Please select a team size.</p>
        </div>
        <div class="fld" id="f-role">
          <label for="i-role">Your role<span class="opt-tag">optional</span></label>
          <select id="i-role" name="role">
            <option value="">Select a role</option>
            <option>HR or Culture lead</option>
            <option>COO or leadership team</option>
            <option>People Operations</option>
            <option>Team or department manager</option>
            <option>Other</option>
          </select>
        </div>
        <div class="fld" id="f-note">
          <label for="i-note">What is your biggest engagement challenge right now?<span class="opt-tag">optional</span></label>
          <textarea id="i-note" name="note"></textarea>
        </div>
        <div class="check" id="f-consent">
          <input id="i-consent" name="consent" type="checkbox" required>
          <label for="i-consent">Send me early access updates about Archetype HR. We will not share
            your details with anyone else, and you can unsubscribe from any email.
            <span class="err">Please confirm before continuing.</span></label>
        </div>
        <button class="btn" type="submit">Join the Waitlist</button>
        <p class="xs muted" style="margin-top:16px">We reply to every waitlist request within two
          business days, from a person rather than an autoresponder.</p>
      </form>

      <div>
        <div class="formside">
          <h4>What happens next</h4>
          <ul style="margin-top:14px">
            <li><span>01</span><span>A short reply from Jori or Greg, within two business days.</span></li>
            <li><span>02</span><span>A 20 minute call to hear how engagement is measured on your team today.</span></li>
            <li><span>03</span><span>An invitation into the pilot group when your organization size opens.</span></li>
          </ul>
          <hr class="hr" style="margin:22px 0">
          <h4>Prefer to talk first</h4>
          <p class="small muted" style="margin-top:10px">
            <a href="mailto:info@archetypehr.com" style="border-bottom:1px solid var(--rule)">info@archetypehr.com</a><br>
            <a href="tel:+17808504511" style="border-bottom:1px solid var(--rule)">(780) 850-4511</a><br>
            200 Carnegie Dr, St. Albert, Alberta
          </p>
        </div>
      </div>
    </div>

    <div class="done" id="wl-done">
      {signature(hash_seed('welcome'), [.72,.61,.80,.55,.68,.49], 'Growth', size=200, rings=8, steps=64)}
      <h3>You are on the list.</h3>
      <p class="lede" style="margin-top:12px;max-width:44ch">Jori or Greg will reply within two business
        days. If your organization is in the current pilot range, that reply will include a slot to
        pick from.</p>
      <p class="small muted" style="margin-top:20px">A confirmation is on its way to the address you
        gave us.</p>
    </div>
  </div>
</section>
{closing()}
</div>"""


# ---------------------------------------------------------------- shared close
def closing():
    return """<section class="sec" style="padding-top:0">
  <div class="wrap">
    <hr class="hr">
    <div style="padding-top:clamp(34px,4vw,60px)">
      <h2 style="max-width:17ch">Engagement happens one person at a time.</h2>
      <p class="lede" style="margin-top:16px;max-width:52ch">Archetype HR is designed for organizations
        that already believe that, and want a way to act on it every day rather than twice a year.</p>
      <div class="hero-meta">
        <a class="btn" href="#waitlist" data-go="waitlist">Join the Waitlist</a>
        <a class="btn line" href="#library" data-go="library">Browse the archetype library</a>
      </div>
    </div>
    <div class="close-grid">
      <div>
        <h4>If you are not ready yet</h4>
        <p class="small muted">Walk the five stages first. It takes about three minutes and shows the
          full journey from assessment to conversation.
          <a href="#how" data-go="how" style="border-bottom:1px solid var(--rule)">Open the walkthrough</a></p>
      </div>
      <div>
        <h4>If you already run a survey</h4>
        <p class="small muted">Archetype HR sits alongside it. The survey tells you the score moved;
          the profile tells a manager what to do differently on Monday.</p>
      </div>
      <div>
        <h4>How quickly we reply</h4>
        <p class="small muted">Within two business days, from Jori or Greg directly. Pilot places are
          released by organization size as each group opens.</p>
      </div>
    </div>
  </div>
</section>"""


def footer():
    return f"""<footer class="foot">
  <div class="wrap">
    <div class="foot-top">
      <div>
        <p class="foot-mark">Archetype HR</p>
        <p class="small" style="margin-top:14px;max-width:34ch">Archetype HR was created to help
          organizations move beyond surface-level engagement and build more productive and motivated
          workplaces.</p>
      </div>
      <div>
        <h4>Product</h4>
        <ul>
          <li><a href="#how" data-go="how">How It Works</a></li>
          <li><a href="#library" data-go="library">The Archetype Library</a></li>
          <li><a href="#managers" data-go="managers">For Managers</a></li>
          <li><a href="#home" data-go="home">Features</a></li>
        </ul>
      </div>
      <div>
        <h4>Company</h4>
        <ul>
          <li><a href="#about" data-go="home">About</a></li>
          <li><a href="#waitlist" data-go="waitlist">Join the Waitlist</a></li>
          <li><a href="mailto:info@archetypehr.com">Investors</a></li>
          <li><a href="mailto:info@archetypehr.com">Contact</a></li>
        </ul>
      </div>
      <div>
        <h4>Contact</h4>
        <ul>
          <li><a href="mailto:info@archetypehr.com">info@archetypehr.com</a></li>
          <li><a href="tel:+17808504511">(780) 850-4511</a></li>
          <li>200 Carnegie Dr<br>St. Albert, Alberta</li>
        </ul>
      </div>
    </div>
    <div class="foot-bot">
      <span>&copy; 2026 Archetype HR. All rights reserved.</span>
      <span>Profile visuals and employee examples on this site show sample data.</span>
      <span><a href="mailto:info@archetypehr.com">Terms &amp; Conditions</a> &nbsp; <a href="mailto:info@archetypehr.com">Privacy Policy</a></span>
    </div>
  </div>
</footer>"""


SCRIPT = """
document.documentElement.className += ' js';
(function(){
  var R = ['home','how','library','managers','waitlist'];
  function show(id, push){
    if (R.indexOf(id) === -1) id = 'home';
    R.forEach(function(r){
      var el = document.getElementById(r);
      if (el) el.classList.toggle('on', r === id);
    });
    document.querySelectorAll('.nav a[data-go]').forEach(function(a){
      if (a.getAttribute('data-go') === id) a.setAttribute('aria-current','page');
      else a.removeAttribute('aria-current');
    });
    window.scrollTo(0,0);
  }
  document.addEventListener('click', function(e){
    var t = e.target.closest('[data-go]');
    if (!t) return;
    e.preventDefault();
    var id = t.getAttribute('data-go');
    show(id);
    var href = t.getAttribute('href') || '';
    if (href === '#about' && id === 'home') {
      var a = document.getElementById('about');
      if (a) a.scrollIntoView({behavior:'smooth', block:'start'});
    }
  });
  show('home');

  var f = document.getElementById('wl');
  if (!f) return;
  function bad(id, on){
    var el = document.getElementById(id);
    if (el) el.classList.toggle('bad', on);
    return on;
  }
  f.addEventListener('submit', function(e){
    e.preventDefault();
    var v = f.querySelector('#i-email').value.trim();
    var errs = 0;
    errs += bad('f-name', !f.querySelector('#i-name').value.trim());
    errs += bad('f-email', !/^[^@\\s]+@[^@\\s.]+\\.[^@\\s]{2,}$/.test(v));
    errs += bad('f-org', !f.querySelector('#i-org').value.trim());
    errs += bad('f-size', !f.querySelector('#i-size').value);
    errs += bad('f-consent', !f.querySelector('#i-consent').checked);
    if (errs) {
      var first = f.querySelector('.bad');
      if (first) {
        var inp = first.querySelector('input,select');
        if (inp) inp.focus();
      }
      return;
    }
    f.classList.add('sent');
    document.getElementById('wl-done').classList.add('on');
    window.scrollTo(0,0);
  });
  f.addEventListener('input', function(e){
    var w = e.target.closest('.fld, .check');
    if (w) w.classList.remove('bad');
  });
})();
"""


HTML = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Archetype HR — Engagement happens one person at a time</title>
<meta name="description" content="AI-driven employee motivation insights. Archetype HR turns an assessment into an individual archetype profile, and gives managers real-time guidance for feedback, recognition, and difficult conversations.">
<meta name="robots" content="noindex, nofollow">
<style>
{FONTCSS}
{CSS}
</style>
</head>
<body>
{nav_html()}
<main>
{home()}
{how()}
{library()}
{managers()}
{waitlist()}
</main>
{footer()}
<script>{SCRIPT}</script>
</body>
</html>
"""

os.makedirs('build', exist_ok=True)
open('build/index.html', 'w', encoding='utf-8').write(HTML)
n = len(HTML.encode('utf-8'))
print('built', n, 'bytes =', round(n / 1048576, 2), 'MB')
