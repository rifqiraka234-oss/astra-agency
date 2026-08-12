# Data flow and state machine

## From webhook to action

```mermaid
flowchart TD
  A[Lemlist webhook] --> B{Verify}
  B -->|size, JSON, secret, team| C[Insert with idempotency key]
  B -->|rejected| B1[Audit and 401/413]
  C -->|duplicate| C1[200, no work scheduled]
  C -->|new| D[Schedule processing<br/>now + 90s]
  D -->|another event arrives| D
  D --> E[Job loop claims the job]
  E --> F{Per-contact advisory lock}
  F -->|not acquired| F1[Skip, another worker has it]
  F -->|acquired| G[Refetch from the Lemlist API<br/>never from the webhook body]
  G --> H[Normalize: order, dedupe, sanitize,<br/>strip quoted history, group turns]
  H --> I{Ownership}
  I -->|substantive step planned| I1[LEMLIST_SEQUENCE, send nothing]
  I -->|branch unresolved, task pending,<br/>pause unverified| I2[UNKNOWN, human review]
  I -->|pause verified| J[ASTRA_AGENT]
  J --> K[Verify company identity]
  K --> L[Claude analysis<br/>strict structured output]
  L -->|schema invalid| L1[Human review, nothing acted on]
  L --> M[Policy engine<br/>recomputes every predicate]
  M -->|AUTO_SEND| N[Pre-send gate]
  M -->|CREATE_DRAFT| O[Approval + Lemlist draft]
  M -->|BUILD_PROTOTYPE| P[Prototype job]
  M -->|PROPOSE / BOOK| Q[Calendar workflow]
  M -->|HANDOFF / SUPPRESS / NO_ACTION| R[Record and stop]
  N --> N1[Refetch, revalidate text,<br/>durable intent, then send]
  P --> P1[Research, build, QA, deploy]
  P1 --> P2[Approval bound to this exact version]
  P2 -.->|operator approves| N
  O -.->|operator approves| N
```

The dotted edges are the only paths by which a prototype URL or a non-
allowlisted message can reach a prospect: through an authenticated operator
approval, and then back through the same pre-send gate.

## Conversation state machine

```mermaid
stateDiagram-v2
  [*] --> NEW_EVENT
  NEW_EVENT --> DEBOUNCING
  DEBOUNCING --> DEBOUNCING: another message arrives
  DEBOUNCING --> FETCHING_CONTEXT
  FETCHING_CONTEXT --> SEQUENCE_OWNED
  FETCHING_CONTEXT --> ANALYZING
  FETCHING_CONTEXT --> HUMAN_REVIEW_REQUIRED

  SEQUENCE_OWNED --> DEBOUNCING: a genuine reply arrives later

  ANALYZING --> LOW_RISK_ELIGIBLE
  ANALYZING --> DRAFT_CREATED
  ANALYZING --> AWAITING_MESSAGE_APPROVAL
  ANALYZING --> PROTOTYPE_QUEUED
  ANALYZING --> CALENDAR_OPTIONS_PROPOSED
  ANALYZING --> HUMAN_REVIEW_REQUIRED
  ANALYZING --> COMPLETED_NO_ACTION

  LOW_RISK_ELIGIBLE --> COMPLETED_NO_ACTION
  LOW_RISK_ELIGIBLE --> DEBOUNCING: new message invalidates

  PROTOTYPE_QUEUED --> PROTOTYPE_BUILDING
  PROTOTYPE_BUILDING --> PROTOTYPE_QA_FAILED
  PROTOTYPE_BUILDING --> AWAITING_PROTOTYPE_APPROVAL
  PROTOTYPE_QA_FAILED --> PROTOTYPE_BUILDING: bounded retry
  PROTOTYPE_QA_FAILED --> DEAD_LETTER

  AWAITING_MESSAGE_APPROVAL --> DEBOUNCING: goes stale
  AWAITING_PROTOTYPE_APPROVAL --> DEBOUNCING: goes stale
  AWAITING_PROTOTYPE_APPROVAL --> COMPLETED_NO_ACTION: approved and sent

  CALENDAR_OPTIONS_PROPOSED --> MEETING_BOOKING_PENDING
  MEETING_BOOKING_PENDING --> CALENDAR_OPTIONS_PROPOSED: slot was taken
  MEETING_BOOKING_PENDING --> MEETING_SCHEDULED
  MEETING_SCHEDULED --> HUMAN_OWNED

  HUMAN_REVIEW_REQUIRED --> HUMAN_OWNED
  HUMAN_OWNED --> DEBOUNCING

  RETRYABLE_ERROR --> DEBOUNCING
  RETRYABLE_ERROR --> DEAD_LETTER

  SUPPRESSED --> [*]
  DEAD_LETTER --> [*]
```

Every transition not drawn here throws `IllegalStateTransitionError`, is
audited, and rolls back its transaction before any integration is touched. A
controller that has lost track of its own state must not go on to send
anything.

## Ownership after an invitation is accepted

```mermaid
sequenceDiagram
  participant L as Lemlist
  participant W as Worker
  participant P as Policy

  L->>W: linkedinInviteAccepted
  W->>L: GET sequences, activities, tasks
  W->>W: Classify not-yet-sent steps
  alt A substantive first message is planned
    W-->>W: owner = LEMLIST_SEQUENCE, send nothing
    Note over W: The campaign introduces itself.<br/>A later genuine reply still enters<br/>the reply workflow.
  else Only reminders remain
    W->>L: POST pause lead in campaign
    W->>L: GET lead (refetch)
    alt Pause observed AND conversation unchanged
      W-->>W: owner = ASTRA_AGENT
      W->>P: may compose
    else Pause unverified or conversation moved
      W-->>W: owner = UNKNOWN, human review
    end
  else Branch unresolved or manual task pending
    W-->>W: owner = UNKNOWN, human review
  end
```
