# Roster used across the library and the manager dashboard.
# Illustrative employee data, disclosed once in the page footer (I14).
# Values are the six motivator axes in AXES order:
# Recognition, Autonomy, Growth, Stability, Belonging, Challenge

ROSTER = [
    dict(name="Alex Rivera",    role="Customer Success",   team="Revenue",
         vals=[.88, .64, .71, .39, .55, .48], trend="Improving", status="attention",
         line="Reads recognition as proof the work mattered, and goes quiet without it."),
    dict(name="Jordan Ng",      role="Backend Engineering", team="Product",
         vals=[.42, .91, .58, .35, .40, .72], trend="Stable", status="ok",
         line="Wants the problem and the deadline, then wants to be left alone."),
    dict(name="Sam Patel",      role="Implementation",      team="Delivery",
         vals=[.55, .48, .89, .44, .62, .70], trend="Improving", status="ok",
         line="Measures a good quarter by what they can now do that they could not before."),
    dict(name="Taylor Wu",      role="Finance Operations",  team="Operations",
         vals=[.38, .42, .40, .88, .66, .30], trend="Declining", status="attention",
         line="Absorbs change well when told early, and badly when told late."),
    dict(name="Priya Raman",    role="People Operations",   team="Operations",
         vals=[.60, .52, .66, .48, .90, .44], trend="Stable", status="ok",
         line="Does the best work on a team that feels like a team."),
    dict(name="Marcus Deng",    role="Solutions Architect", team="Delivery",
         vals=[.47, .58, .62, .36, .44, .92], trend="Improving", status="ok",
         line="Disengages fastest when the work stops being hard."),
    dict(name="Noor Haddad",    role="Product Design",      team="Product",
         vals=[.71, .77, .55, .41, .49, .58], trend="Stable", status="ok",
         line="Needs both the credit and the room to make the call."),
    dict(name="Diego Salas",    role="Field Sales",         team="Revenue",
         vals=[.90, .55, .49, .33, .58, .64], trend="Improving", status="ok",
         line="Public acknowledgement moves this person more than any incentive."),
    dict(name="Hana Ito",       role="Data Analysis",       team="Product",
         vals=[.44, .69, .84, .52, .38, .61], trend="Stable", status="ok",
         line="Treats a new method as a reward in itself."),
    dict(name="Owen Brooks",    role="Support",             team="Delivery",
         vals=[.52, .36, .45, .86, .71, .28], trend="Declining", status="attention",
         line="Long tenure, low noise, and the first to feel an unstable quarter."),
    dict(name="Leila Farouk",   role="Marketing",           team="Revenue",
         vals=[.66, .61, .72, .40, .83, .50], trend="Improving", status="ok",
         line="Belonging and growth carry almost equal weight here."),
    dict(name="Tomas Novak",    role="Platform Engineering", team="Product",
         vals=[.35, .88, .60, .47, .33, .79], trend="Stable", status="ok",
         line="Autonomy is not a preference for this person, it is the condition."),
    dict(name="Grace Okafor",   role="Account Management",  team="Revenue",
         vals=[.74, .50, .58, .45, .80, .42], trend="Stable", status="ok",
         line="Holds the room together and rarely asks for anything back."),
    dict(name="Ravi Menon",     role="QA Engineering",      team="Product",
         vals=[.40, .63, .77, .69, .44, .55], trend="Improving", status="ok",
         line="Steady by default, and quietly ambitious about scope."),
]

MOTIVATORS = [
    ("Recognition", "Wants the contribution named, specifically and promptly."),
    ("Autonomy",    "Wants the outcome defined and the method left open."),
    ("Growth",      "Measures a good year in capability, not in comfort."),
    ("Stability",   "Does the strongest work when the ground is predictable."),
    ("Belonging",   "Performance is tied to the health of the team around them."),
    ("Challenge",   "Engagement falls when the difficulty falls."),
]

# The five real process stages, descriptions quoted from archetypehr.com
STAGES = [
    ("Survey Design", "Archetype HR provides a ready-to-use assessment and survey link."),
    ("Employee Participation", "Employees complete the survey in 20 minutes, through a simple, guided experience."),
    ("Analysis &amp; Reporting", "Responses are analyzed using AI, and reports are generated and reviewed for quality."),
    ("Manager Review", "Managers receive individual and team-level insights they can immediately act on."),
    ("Better Conversations", "Managers use insights to guide feedback, coaching, recognition, and action planning."),
]

# Five real platform capabilities, quoted from the Features page
FEATURES = [
    ("Employee Archetype Profiles", "Understand individual motivators, communication styles, and engagement drivers."),
    ("Engagement Dashboards", "View team and organizational insights at a glance."),
    ("AI-Powered Guidance", "Get real-time suggestions for coaching, feedback, and recognition."),
    ("Actionable Reports", "Clear summaries with practical recommendations, not just data."),
    ("Manager &amp; Employee Access", "Insights designed for real conversations, not just HR reporting."),
]

# Real target segments, quoted from the home page
SEGMENTS = [
    ("Human Resources &amp; Culture leaders", "A live, individual view of engagement in place of an annual survey snapshot."),
    ("COOs &amp; Leadership Teams", "A practical playbook connected to real performance and retention risk."),
    ("Mid-Market Organizations", "Insight that scales past the point where a manager can simply know everyone."),
    ("Hybrid &amp; Remote Teams", "The individual signal that in-person observation used to provide."),
    ("Industries with Retention &amp; Productivity Challenges", "An early read on who is drifting, while there is still time to act."),
]

# Real outcomes list, quoted from the home page
ACTIONS = [
    "Better one-on-one conversations",
    "Personalize coaching and feedback",
    "Improve recognition and motivation",
    "Handle difficult conversations with confidence",
    "Reduce turnover and improve performance",
]
