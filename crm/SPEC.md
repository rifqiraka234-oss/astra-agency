# Astra CRM V1, build spec

Every agent building this reads this file in full first. It is the contract between the
foundation and the feature areas. Where it is silent, follow
`reports/Custom CRM features and data model.md` (the research report, the schema section
especially) and the six design screens in `crm/design/*.dc.html` (open them as HTML source,
they are the look and the behaviour to match).

## What V1 is

A working internal CRM for Astra Agency (Raka, Josh, Luna) that replaces the JSONL state
files. Organizations, contacts, a lead pipeline, a sales pipeline, deals, activities on one
timeline, tasks with owners and reminders, an approval queue for outbound messages,
projects, tickets and invoices (basic), custom fields, import and export with revert,
duplicate rules and merge with undo, users and roles, a few built in automations, a read
only lemlist sync and a one off import of the existing `state/*.jsonl` files.

Not in V1 (V2): Gmail sync and sending, Google Calendar, Moneybird, the client portal,
outgoing webhooks, the report builder. Leave clean seams for them, do not build them.

## Hard rules

1. **Nothing in V1 ever sends a message to a lead.** No lemlist POST, no email. The approval
   queue records drafts and approvals. The "send" step is behind `SEND_ENABLED=true`, which
   defaults to false, and when false the button says "Approve" and the message is marked
   approved, not sent. The lemlist client must refuse every non GET request.
2. **Dedup lives in the database.** Unique indexes on normalised email, normalised domain and
   normalised LinkedIn URL. The app checks first for a friendly message, the index is the truth.
3. **Every write goes through the audit log** (a trigger on core tables writes `audit_log`
   with table, record id, action, old and new jsonb, actor).
4. **Money is `numeric(14,2)` plus a currency, never float.**
5. **Overdue, last activity, weighted amount, time in stage are computed** (views or queries),
   never stored flags.
6. **UI copy is plain English.** No em or en dashes anywhere in the UI. Avoid colons in
   sentences (labels in tables and forms are fine without them). Contractions are fine. No
   emoji. Read `docs/NO-AI-SLOP.md` section 1 to 3 if you write any longer copy.
7. **Sample data is labelled.** The seed uses the fictional companies from the design
   (Brouwerij De Kade, Harbor Physio, Maison Orée and so on) and a "Sample data" badge shows
   in the header when `SAMPLE_DATA=true`. Never mix invented values into real records.
8. Real lead data imported from `state/*.jsonl` or lemlist stays in the local database only.
   Never commit a database dump, a CSV of contacts or a `.env` file.

## Stack (decided, do not change)

- Next.js 15 App Router, React 19, TypeScript strict, in `crm/`.
- Postgres 16. Local dev database `postgres://astra:astra@localhost:5432/astra_crm`
  (already running). `DATABASE_URL` env var.
- No ORM. `postgres` (postgres.js) with tagged template SQL, `zod` for input validation.
- Schema is hand written SQL in `crm/db/migrations/NNN_name.sql`, applied in lexical order by
  `npm run db:migrate`, which records applied files in `schema_migrations`.
- Server components for reads, server actions for writes. Every action checks the session
  and the permission, validates with zod, writes in a transaction, logs activity where it
  makes sense, and calls `revalidatePath`.
- Auth: email and password (`bcryptjs`), session as a signed JWT cookie (`jose`),
  `middleware.ts` redirects to `/login`. Seeded users raka@astra.local, josh@astra.local,
  luna@astra.local, password `astra` for local dev, printed by the seed.
- Styling: plain CSS. Tokens as CSS variables in `app/globals.css`, small component library
  in `components/ui/`. No Tailwind, no component framework. Font Geist and Geist Mono via
  `next/font/google`.
- Tests: `vitest` for `lib/`. Playwright (already installed globally, `require('playwright')`)
  for the final smoke test.
- Drag and drop on the boards with `@dnd-kit/core`. CSV with `papaparse`. Dates with `date-fns`.
  RRULE with `rrule`.

## Design tokens (from the design screens)

Ground `#F4F4F1`, surface `#FFFFFF`, border `#E2E2DC`, border strong `#D6D6CF`, ink `#15171A`,
muted text `#5B6068`, secondary text `#3A3E45`, sidebar `#15171A`, sidebar text `#C9CCD1`,
sidebar active `#262A31`, accent `#C2410C` (white text on it), link `#1D4ED8`.
Status pairs (background, text): grey `#F1F1EC #3A3E45`, blue `#E8EEFD #1E40AF`,
amber `#FDF3E1 #92400E`, green `#E7F5EC #166534`, red `#FDECEC #B91C1C`.
Radius 10 for controls, 14 for panels. Touch targets 44px. Font Geist, numbers in Geist Mono.
Sidebar and page layout exactly as the design files.

## Folder layout

```
crm/
  SPEC.md  README.md  package.json  .env.example
  db/migrations/        000_* foundation, 1xx A, 2xx B, 3xx C, 4xx D, 5xx E, 6xx F
  db/seed.ts            sample data matching the design screens
  scripts/              migrate.ts, seed.ts, import-jsonl.ts, sync-lemlist.ts, worker.ts
  lib/                  db.ts, auth.ts, permissions.ts, normalize.ts, audit.ts,
                        activities.ts, tasks.ts, events.ts, fields.ts, stages.ts, format.ts
  components/ui/        Button, Input, Select, Textarea, Badge, Card, Table, Tabs,
                        Drawer, Modal, PageHeader, EmptyState, Avatar, Segmented
  components/records/   PropertiesPanel, Timeline, LinkedRecords, RecordHeader, CreateDialog
  app/(app)/            layout with sidebar, then one folder per area below
  app/login/
  tests/
```

## Shared contracts the foundation provides (feature agents use these, never re implement)

- `lib/db.ts` exports `sql` (postgres.js) and `tx(fn)`.
- `lib/auth.ts` `getSession()`, `requireUser()`, `signIn`, `signOut`.
- `lib/permissions.ts` `can(user, action, objectType, record?)` with roles `admin`,
  `sales`, `account_manager` and scopes all, team, own, none, as the Settings design shows.
- `lib/normalize.ts` `normEmail`, `normDomain` (strip scheme, www, path, port, lower case,
  reduce subdomains to the registrable domain with a small public suffix list that covers
  .co.uk, .com.au and the like), `normLinkedin` (to `linkedin.com/in/<slug>`), `isFreeMail`.
- `lib/activities.ts` `logActivity({kind, direction, occurredAt, actorUserId, title, body,
  meta, source, externalId, links: {contactId?, organizationId?, leadId?, dealId?,
  projectId?, ticketId?}[]})`, idempotent on `(source, external_id)`, and it auto links a
  contact's activity to its current primary organization and that organization's open deals.
- `lib/tasks.ts` `createTask`, `completeTask` (creates the next instance when `recurrence_rule`
  is set), `taskBuckets` query.
- `lib/events.ts` `emit(tx, type, payload)` writes a `domain_events` row in the same
  transaction. Event types used in V1 `deal.stage_changed`, `deal.won`, `lead.stage_changed`,
  `lead.replied`, `invoice.late`, `ticket.created`, `record.created`.
- `lib/fields.ts` reads `field_definitions` for an object type, validates the `custom` jsonb
  against them, and gives the descriptor `PropertiesPanel` renders.
- `lib/stages.ts` `moveStage(tx, {objectType, recordId, toStageId, values, actor})` checks
  `stage_required_fields`, writes `stage_transitions`, updates the record, emits the event.
- `components/records/PropertiesPanel` renders grouped core and custom fields with inline
  edit through a server action the caller passes in.
- `components/records/Timeline` renders activities for any record with kind filters.
- `components/records/CreateDialog` is the generic create form with a live duplicate check
  hook (`/api/dupes?type=org&domain=` and `?type=contact&email=`).

## Schema (foundation writes it all in 000 to 009 migrations)

Use the report's schema section as the source. V1 needs at least these tables, each with
`id uuid default gen_random_uuid()`, `created_at`, `updated_at` (trigger), and where it fits
`owner_user_id`, `deleted_at`, `custom jsonb not null default '{}'`.

users, teams, team_members, organizations, organization_domains, contacts, contact_emails,
contact_phones, contact_org_roles, pipelines, pipeline_stages, stage_required_fields,
stage_transitions, leads, deals, deal_contacts, products, line_items, quotes, activities,
activity_links, meetings, outbound_messages, tasks, task_links, reminders, notifications,
projects, project_milestones, time_entries, tickets, ticket_status_events, sla_policies,
invoices, field_definitions, field_groups, saved_views, domain_events, automation_rules,
automation_runs, external_ids, sync_cursors, inbound_events, import_jobs, import_rows,
merge_log, duplicate_pairs_rejected, audit_log, free_mail_domains, suppression_list,
api_keys.

Seed pipelines and stages exactly as the report recommends (Lead, Sales, Existing business,
Project delivery, Tickets) with the probabilities and required fields shown in the Settings
design, plus the free mail domain list.

## Routes and who builds them

| Area | Agent | Routes and features |
|---|---|---|
| Foundation | F0 | scaffold, all deps, schema, lib contracts, auth and login, app shell and sidebar, UI kit, records components, seed, migrate, vitest, README |
| A. Organizations and contacts | A | `/organizations` list (search, filters by owner, industry, lifecycle, account manager; sortable; CSV export button), `/organizations/[id]` record exactly like the Organization design (properties, timeline with note composer, tabs Contacts, Deals, Projects, Tickets, Invoices, Tasks, right rail), `/contacts` list and `/contacts/[id]` record, create org and contact with live dedup, add domain, add email, link a contact to an organization with a role and dates, end a role |
| B. Pipelines, leads, deals | B | `/pipelines` boards (lead and sales toggle, owner filter, drag between stages through `moveStage` with a required fields dialog, rotting flag from `rot_days`, column totals and weighted value), `/leads` list, `/leads/[id]`, qualify lead into a deal, disqualify with reason (do not contact also adds to `suppression_list`), `/deals` list, `/deals/[id]` like the Deal design (stage path, gate dialog, line items and quote with VAT, stage history, contacts with roles, next tasks) |
| C. Home, tasks, approvals | C | `/` home like the Main design (whose day switch, KPI tiles from real queries, my tasks, approvals, reminders), `/tasks` like the Tasks design (owner views, buckets, complete, create and edit drawer with type, owner, due, repeat, reminder, links), `/approvals` queue for `outbound_messages` (draft, awaiting approval, approved, sent; approval stores the approver and the text; send gated by `SEND_ENABLED`), in app notifications bell from `reminders` and `notifications` |
| D. Settings and data | D | `/settings/fields` (add, edit, archive custom fields per object, all types in the design, groups, required, unique creates a partial unique index after checking existing values), `/settings/pipelines` (stages, probability, rot days, required fields), `/settings/users` (invite, role, deactivate), `/settings/import` (CSV upload, column mapping with match keys email and domain, preview counts, run as an `import_jobs` row, revert that deletes created rows and restores changed values from `import_rows`), export CSV of any list, `/settings/duplicates` (rules, fuzzy scan, merge with `merge_log` snapshot, undo merge, not the same), `/settings/audit` viewer |
| E. Automations and integrations | E | `scripts/worker.ts` processes `domain_events` with `FOR UPDATE SKIP LOCKED`, idempotent, logs `automation_runs`; built in rules from the Settings design (deal won creates project, deposit invoice draft and kickoff task; lead reply moves to Connected and creates a task; daily no next step check; quarterly check in for customers; invoice late task), on and off per rule in `/settings/automations` with run history; `lib/lemlist.ts` read only client (GET only, through the HTTPS proxy, see `tools/lemlist.py` and `docs/lemlist-field-index.md` for paging, the 10 per page cap and the traps); `scripts/sync-lemlist.ts` pulls campaigns, leads and per contact threads into contacts, leads and activities with `external_ids` and `sync_cursors`, checks every thread against `totalItems`; `scripts/import-jsonl.ts` migrates `state/silent_accepted_queue.jsonl` (latest row per contactId wins, map status to lead stage plus `research_status` plus `disqualify_reason`), `state/prototypes.jsonl`, `state/meetings.jsonl`; `/settings/integrations` showing sync status |
| F. Projects, tickets, invoices | F | `/projects` list and `/projects/[id]` (stage, health, budget, hours from `time_entries`, milestones, linked deal and org, time entry form), `/tickets` list and `/tickets/[id]` (status pipeline, priority, SLA first reply and close due computed from `sla_policies` with business hours, waiting on client pauses the clock, status history), `/invoices` list and `/invoices/[id]` (draft invoices with line items and VAT treatment NL 21%, reverse charge, export; numbering left empty until a provider assigns it; states draft, open, paid, late, void; ageing view) |
| QA | Q | build, typecheck, tests, Playwright walk through every route as each user, fix what breaks, screenshots |

## Rules for parallel agents

- Only create or edit files inside your area: `app/(app)/<your routes>/`, `components/<area>/`,
  `lib/<area>/`, your migration number range, your tests. Shared files (`lib/*.ts` at the top
  level, `components/ui`, `components/records`, the layout, `package.json`) belong to the
  foundation. If you truly need a change there, make the smallest additive change and say so
  in your report.
- Do not install packages. Everything is installed by the foundation. If something is missing,
  say so in your report instead.
- Do not run `next build` or `next dev`, other agents share the folder. Check your work with
  `npx tsc --noEmit -p .` (ignore errors in files that are not yours, other agents are mid
  edit), `npx vitest run tests/<area>`, and by running your server side functions against the
  local database with `npx tsx`.
- Do not commit. The coordinator commits.
- Never run destructive SQL against tables you do not own, never drop the database.
