# Astra CRM

Internal CRM for Astra Agency (Raka, Josh, Luna). Next.js 15 App Router, React 19,
TypeScript strict, Postgres 16 through postgres.js, plain CSS. The build contract is
[`SPEC.md`](SPEC.md); the look is `design/*.dc.html`.

## Run it

```bash
cd crm
npm install
cp .env.example .env.local      # then set SESSION_SECRET to a long random string
npm run db:migrate              # applies db/migrations/*.sql in order
npm run db:seed                 # users always, sample data when SAMPLE_DATA=true
npm run dev                     # http://localhost:3100
```

Sign in as `raka@astra.local`, `josh@astra.local` (admins) or `luna@astra.local`
(account manager), password `astra`. Local only, the seed prints them.

| Script | What it does |
|---|---|
| `npm run dev` / `build` / `start` | Next.js on port 3100 |
| `npm run typecheck` | `tsc --noEmit` |
| `npm test` | vitest, `tests/**/*.test.ts` (DB tests run against the local database and roll back) |
| `npm run db:migrate` | applies new migration files, records them in `schema_migrations` |
| `npm run db:seed` | idempotent seed (stable ids, upserts) |
| `npm run db:reset` | drops and recreates `public`, migrates, seeds. Refuses unless `DATABASE_URL` is localhost |
| `npm run worker` | the automation worker. Runs forever: processes `domain_events` as they arrive and the schedule rules every minute. `-- --once` does one pass over due events and schedules, then exits |
| `npm run sync:lemlist` | read only pull from lemlist (GET only, the client refuses any other method) into contacts, leads and activities. Flags `-- --dry-run` (everything rolled back), `--limit N` (contacts per campaign), `--campaign cam_...` (one campaign), `--all-leads` (every lead in the campaign, not only accepted ones). Prints counts, never a contact list |
| `npm run import:jsonl` | one off import of `../state/silent_accepted_queue.jsonl`, `prototypes.jsonl` and `meetings.jsonl`. Safe to rerun, it matches what is already there. Flags `-- --dry-run` (one rolled back transaction, real counts), `--state-dir <path>` |

Environment: `DATABASE_URL`, `SESSION_SECRET`, `SAMPLE_DATA` (shows the header badge and
lets the seed add sample records), `SEND_ENABLED` (false in V1, nothing is ever sent),
`LEMLIST_API_KEY` (only where no agent proxy injects the key).

### Automations and imports

- **Worker.** `lib/automations/engine.ts` claims events with `FOR UPDATE SKIP LOCKED`, runs each
  enabled rule in a savepoint and logs `automation_runs` (unique per rule and event, so a rule
  never runs twice). Failures retry with backoff. A rule can defer an event (the Invoice late rule
  waits until 2 days after the due date); the event stays pending until then. Rules are switched
  on and off in `/settings/automations`, with their run history.
- **Matching on import and sync.** `lib/integrations/match.ts`: the registrable domain wins; a new
  domain with a name attaches to the one same named organization that has no domain yet; names
  compare without legal forms, accents or case. A person with no shared lemlist id is matched by
  name at the same organization only when exactly one contact fits. Placeholder ids such as
  `ctc_N/A` and placeholder company names such as `.` are ignored.
- **Contact dedupe, Raka's rule.** "Look first at name, and then LI link, and then email." `lib/dedupe.ts`
  holds the rule: the same normalised name (`contacts.name_normalised`, migration 400, case, accents,
  punctuation, honorifics and suffixes like Dr, PhD, FBCS set aside, word order kept), then the same
  LinkedIn confirms, different LinkedIn profiles are different people, then the same email confirms
  when LinkedIn is missing. Anything else is for review and never merges on its own. It runs in the
  create forms (`/api/dupes?type=person`), the CSV import, the lemlist sync and the JSONL import
  (`findExistingContact`), and the scan on `/settings/duplicates` (confirmed pairs first).

## Architecture in one screen

```
browser ── middleware.ts (JWT cookie check, redirect to /login, 401 for /api)
   │
app/(app)/layout.tsx   requireUser(), sidebar counts, sync status, header
   ├── page.tsx (server components read with `sql`)
   ├── _actions/*.ts   ('use server': requireUser, can(), zod, tx(), logActivity/emit, revalidatePath)
   └── api/search, api/dupes (JSON for the header search and CreateDialog)
lib/                    the shared contracts below, no ORM, snake_case rows
db/migrations/          hand written SQL, 000 to 009 foundation, then one range per agent
Postgres                unique indexes do dedup, triggers write audit_log and updated_at,
                        views compute overdue, weighted, time in stage, last activity
domain_events (outbox)  written in the same transaction, read by scripts/worker.ts (npm run worker)
```

Rules that hold everywhere: every write in `tx(fn, { userId })` so the audit trigger knows
the actor; money is `numeric(14,2)` plus currency and arrives as a string; overdue, last
activity, weighted amount, time in stage and rotting are computed, never stored; stage
changes only through `moveStage`; nothing sends a message (`SEND_ENABLED=false`).

## Shared contracts (use these, never re-implement)

| File | Exports |
|---|---|
| `lib/db.ts` | `sql` (pool), `tx(fn, { userId, source })` sets `app.user_id` for the audit log, `isUniqueViolation(err, name?)`, types `Sql`, `Tx`, `Db` |
| `lib/auth.ts` | `getSession()`, `getCurrentUser()` (null when signed out), `requireUser()` (redirects), `signIn(email, pw)`, `signOut()`, `hashPassword()`. `CurrentUser` has `id, name, role, initials, avatarBg, teamMemberIds` |
| `lib/session.ts` | edge safe JWT helpers used by middleware |
| `lib/permissions.ts` | `can(user, action, objectType, record?)`, `assertCan`, `scopeFor`, `isAdmin`, `ROLE_LABELS`, `PERMISSION_TABLE` (the Settings roles grid) |
| `lib/normalize.ts` | `normEmail`, `normDomain` (registrable domain), `normLinkedin` (`linkedin.com/in/<slug>`), `isFreeMail`, `emailDomain`, `normPhone`, `normCompanyName`, `normPersonName` (mirrors the SQL `crm_norm_person_name`) |
| `lib/dedupe.ts` | the contact dedupe rule, `compareContacts(a, b)` (confidence `linkedin`, `email`, `review` or `distinct`, with the reason), `decideContactMatch`, `CONFIDENCE_LABELS` |
| `lib/dupes.ts` | `findOrgByDomain`, `findContactByEmail`, `findContactByLinkedin` return `DupeMatch` with the design wording, `findContactCandidates` (the rule against the database), `blocksSave`, `candidateToDupeMatch`, `DUPE_RULES` |
| `lib/activities.ts` | `logActivity(input, t?)` idempotent on `(source, externalId)`, auto links contact to primary org and its open deals; `getTimeline(type, id)` returns `TimelineItem[]` |
| `lib/tasks.ts` | `createTask(input, t?)`, `completeTask(id, userId, t?)` (creates the next repeat), `reopenTask`, `taskBuckets({ owner, linked })`, `RECURRENCE_PRESETS`, `describeRecurrence`, `nextOccurrence` |
| `lib/stages.ts` | `moveStage(t, { objectType, recordId, toStageId, values, reason, actor })`, `StageMoveError` (`required_fields`, `reason_required`), `stageGate()`, `stageByKey()`, `pipelineStages()`, `listPipelines()`, `bumpLifecycle()` |
| `lib/events.ts` | `emit(t, type, payload, { aggregateType, aggregateId })`, `DomainEventType` |
| `lib/fields.ts` | `getFieldDefinitions(type)`, `validateCustom(defs, input, { partial })`, `parseCustomForm`, `customPropertyGroups`, `mergePropertyGroups`, `FIELD_TYPE_LABELS`, types `PropertyField`, `PropertyGroup` |
| `lib/audit.ts` | `recordHistory(table, id)`, `listAudit(query)`, `logSecurityEvent(db, event, details, actorId)` |
| `lib/format.ts` | `formatMoney`, `formatPercent`, `formatDate` ("6 Nov"), `formatDay` ("Fri 6 Nov"), `formatDateTime`, `formatRelativeDay` ("Yesterday", "Today 14:00"), `formatDue`, `formatAgo`, `formatMinutes`, `formatDays`, `initials`, exact money maths `toCents`, `sumMoney`, `multiplyMoney`, `vatAmount`, Amsterdam time `todayKey`, `amsterdamTime`, `toDatetimeLocal`, `fromDatetimeLocal` |
| `lib/forms.ts` | `ActionState` (what every server action returns), `initialActionState`, `fail`, `str`, `strs`, `bool`, `zodFieldErrors` |
| `lib/options.ts` | every enum with labels and badge tones (`INDUSTRIES`, `TASK_TYPES`, `LOST_REASONS`, `DISQUALIFY_REASONS`, `INVOICE_STATES`...), `labelOf`, `toneOf` |
| `lib/routes.ts` | `recordHref(type, id)`, `listHref(type)`, `OBJECT_LABELS` |

Components: `components/ui` (`Button`, `ButtonLink`, `Input`, `Field`, `Checkbox`, `Select`,
`Textarea`, `Badge`, `Card`/`CardHead`/`CardBody`, `Table` with `sortHrefFor`, `Tabs`,
`Drawer`, `Modal`, `PageHeader`, `EmptyState`, `Avatar`, `Segmented`, `Icon`) and
`components/records` (`RecordHeader`, `PropertiesPanel`, `Timeline`, `LinkedRecords`,
`CreateDialog`). Each file starts with a usage comment.

Database views: `v_open_tasks` (bucket, is_overdue), `v_deal_weighted` (probability,
weighted_amount, days_in_stage, is_rotting, has_open_task), `v_lead_stage`,
`v_stage_entered`, `v_last_activity_org`, `v_last_activity_contact`, `v_org_summary`.
SQL helpers: `crm_today()`, `crm_attach_triggers('table')` for new tables.

### Gotchas worth knowing

- React 19 resets an uncontrolled `<form action>` after every submit. Forms that can fail
  validation submit via `onSubmit` + `startTransition(() => action(new FormData(form)))`
  (see `CreateDialog`, `PropertiesPanel`, the login form) so typed values survive.
- Rows are snake_case. `numeric` is a string, `date` is `'YYYY-MM-DD'`, `timestamptz` is a
  `Date`. The DB session time zone is Europe/Amsterdam.
- Dynamic row helpers (`t\`insert into x ${t(row)}\``) want `Record<string, any>`.
- The header New menu sends lead, deal, task and ticket to `/leads?new=1`, `/deals?new=1`,
  `/tasks?new=1`, `/tickets?new=1`. Those pages should open their create form on `new=1`.
- Shared create actions for organizations and contacts live in
  `app/(app)/_actions/records.ts` (agent A may extend them).
- Tests: `tests/helpers.ts` has `withRollback(async (t) => ...)` and `stageId(t, pipeline, stage)`.

## CSS conventions

One stylesheet, `app/globals.css`. Tokens are CSS variables on `:root` (`--ink`, `--accent`,
`--border`, `--tone-green-bg` and so on). Use classes, not inline colours.

- Layout: `page` (padded, max 1240px), `page-wide`, `row`, `row-between`, `stack`,
  `stack-sm`, `stack-lg`, `grow`. Record pages: `RecordHeader` then
  `record-body` with `record-left`, `record-main`, `record-right` (flex wrap, stacks on phones).
- Text: `mono` (Geist Mono, put every number and amount in it), `muted`, `secondary`,
  `small`, `text-13`, `strong`, `danger`, `warning`, `success`, `nowrap`, `sr-only`.
- Controls: `btn btn-primary|secondary|accent|ghost|danger` plus `btn-sm|btn-xs|btn-block`,
  `input`, `select`, `textarea`, `field`, `field-label`, `field-hint`, `field-error`,
  `form-grid` (children `field`, `field-full` for a full row), `form-actions`, `form-error`,
  `form-note`, `checkbox`.
- Status: `badge badge-grey|blue|amber|green|red` (`badge-lg` in headers), `dot dot-red...`.
- Filters and toggles: `chip` (round filter chips, `aria-pressed`), `pill` (object pickers),
  `seg` + `seg-item` (segmented control, `aria-pressed` or `aria-current`).
- Panels: `card`, `card-head`, `card-title`, `card-sub`, `card-body`, `card-pad`, `card-row`,
  `card-foot`, `section-label` (the small uppercase heading), `stat`, `stat-label`,
  `stat-value`, `stat-sub` (KPI tiles), `progress > span`.
- Tables: `table-wrap` > `table`, `num` for right aligned numbers, `is-muted` rows,
  `cell-link` for the record link in the first column.
- Overlays: `menu`/`menu-item`, `overlay modal-overlay` + `modal`, `overlay drawer-overlay`
  + `drawer`, `dupe` (amber duplicate box).
- Timeline and rail: `tl-*`, `rail-card`, `rail-item`, `rail-entry`, `props-*`.

## Sample data

`SAMPLE_DATA=true` seeds the fictional companies of the design: Brouwerij De Kade and its
timeline, 12 open sales deals (open €86,400, weighted €39,240), 5 won (€23,700) and 11 lost,
the 12 lead pipeline cards, the 16 tasks of the Tasks and Main designs (4 overdue), the three
messages awaiting approval, the Website rebuild project, tickets 118 and 104 and four invoices.
Every sample row has `custom->>'sample' = 'true'` (activities use `source = 'seed'`), ids come
from `sid(key)` in `db/seed.ts`, and dates keep their distance from "today" (the design's today
is Fri 6 Nov 2026). A deal's `next_step` holds the short chip text of the Pipeline design;
Bloem Florists has no next step and no open task (the red card).

## Who builds what

| Area | Agent | Owns | Migrations |
|---|---|---|---|
| Foundation | F0 | scaffold, schema, `lib/*.ts`, `components/ui`, `components/records`, `components/shell`, layout, login, seed, README | 000 to 009 |
| Organizations and contacts | A | `/organizations`, `/contacts` and their record pages | 1xx |
| Pipelines, leads, deals | B | `/pipelines`, `/leads`, `/deals` and record pages | 2xx |
| Home, tasks, approvals | C | `/`, `/tasks`, `/approvals`, notifications | 3xx |
| Settings and data | D | `/settings` and `/settings/fields`, `pipelines`, `users`, `import`, `duplicates`, `audit` | 4xx |
| Automations and integrations | E | `scripts/worker.ts`, `lib/lemlist.ts`, `scripts/sync-lemlist.ts`, `scripts/import-jsonl.ts`, `/settings/automations`, `/settings/integrations` | 5xx |
| Projects, tickets, invoices | F | `/projects`, `/tickets`, `/invoices` and record pages | 6xx |
| QA | Q | build, typecheck, tests, Playwright walk through | none |

Every route in the table is built. Area code lives in `app/(app)/<route>/`, `components/<area>/`,
`lib/<area>/` and `tests/<area>/`. New tables go in that area's migration range with
`select crm_attach_triggers('<table>')`.
