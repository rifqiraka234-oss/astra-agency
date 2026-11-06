/**
 * db/seed.ts, sample data that makes the app look like the design screens.
 * npm run db:seed (idempotent: every row has a stable id and is upserted).
 *
 * Users are always seeded (local login, password "astra"). The sample records
 * (fictional companies from the design) are seeded only when SAMPLE_DATA=true.
 * Every sample record carries custom.sample = true, activities use source
 * 'seed', so they can be found and wiped. Dates are relative: the design's
 * "today" is Fri 6 Nov 2026 and every date keeps its distance from today.
 *
 * Board chips: a deal's next_step holds the short text the Pipeline design
 * shows on its card ("Call Fri 16:30"). Bloem Florists has neither a next step
 * nor an open task, which is the red "No next task" card.
 */
import crypto from 'node:crypto';
import bcrypt from 'bcryptjs';
import { sql, type Tx } from '../lib/db';
import { addDaysKey, amsterdamTime, daysBetween, todayKey } from '../lib/format';

const DESIGN_TODAY = '2026-11-06';
const SAMPLE = { sample: true };

/** A stable uuid for a seed key. */
export function sid(key: string): string {
  const h = crypto.createHash('sha1').update(`astra-seed:${key}`).digest('hex');
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-5${h.slice(13, 16)}-${((parseInt(h[16], 16) & 0x3) | 0x8).toString(16)}${h.slice(17, 20)}-${h.slice(20, 32)}`;
}

let TODAY = todayKey();
/** The real date that sits where a design date sits relative to the design's today. */
const D = (designDate: string) => addDaysKey(TODAY, daysBetween(DESIGN_TODAY, designDate));
/** A moment on a design date at an Amsterdam wall clock time. */
const T = (designDate: string, time = '09:00') => amsterdamTime(D(designDate), time);

type Row = Record<string, unknown> & { id: string };

async function up(t: Tx, table: string, row: Row): Promise<void> {
  const cols = Object.keys(row).filter((c) => c !== 'id');
  // postgres.js helpers want Record<string, any>, not unknown values.
  const r = row as Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  await t`insert into ${t(table)} ${t(r)} on conflict (id) do update set ${t(r, cols)}`;
}

async function upMany(t: Tx, table: string, rows: Row[]): Promise<void> {
  for (const r of rows) await up(t, table, r);
}

// ---------------------------------------------------------------- users

const USERS = [
  { key: 'raka', email: 'raka@astra.local', name: 'Raka Mulya', initials: 'RM', role: 'admin', bg: '#DCE6FB', fg: '#1E40AF', team: 'Sales' },
  { key: 'josh', email: 'josh@astra.local', name: 'Joshua van Zeelt', initials: 'JZ', role: 'admin', bg: '#DDEFE3', fg: '#166534', team: 'Delivery' },
  { key: 'luna', email: 'luna@astra.local', name: 'Luna', initials: 'LU', role: 'account_manager', bg: '#F6E3D3', fg: '#7C2D12', team: 'Accounts' },
] as const;

type UserKey = (typeof USERS)[number]['key'];

async function seedUsers(t: Tx): Promise<Record<UserKey, string>> {
  const hash = await bcrypt.hash('astra', 10);
  const ids = {} as Record<UserKey, string>;
  for (const u of USERS) {
    const [row] = await t<{ id: string }[]>`
      insert into users (id, email, name, initials, avatar_bg, avatar_fg, role, password_hash, is_active)
      values (${sid(`user:${u.key}`)}, ${u.email}, ${u.name}, ${u.initials}, ${u.bg}, ${u.fg}, ${u.role}, ${hash}, true)
      on conflict ((lower(trim(email)))) do update
        set name = excluded.name, initials = excluded.initials, avatar_bg = excluded.avatar_bg,
            avatar_fg = excluded.avatar_fg, role = excluded.role, password_hash = excluded.password_hash, is_active = true
      returning id`;
    ids[u.key] = row.id;
    const [team] = await t<{ id: string }[]>`
      insert into teams (name) values (${u.team}) on conflict (name) do update set name = excluded.name returning id`;
    await t`insert into team_members (team_id, user_id) values (${team.id}, ${row.id}) on conflict (team_id, user_id) do nothing`;
  }
  return ids;
}

// ---------------------------------------------------------------- sample records

async function stageIds(t: Tx) {
  const rows = await t<{ pkey: string; skey: string; id: string; pipeline_id: string }[]>`
    select p.key as pkey, s.key as skey, s.id, s.pipeline_id from pipeline_stages s join pipelines p on p.id = s.pipeline_id`;
  const map = new Map(rows.map((r) => [`${r.pkey}/${r.skey}`, r]));
  return (pkey: string, skey: string) => {
    const r = map.get(`${pkey}/${skey}`);
    if (!r) throw new Error(`no stage ${pkey}/${skey}`);
    return r;
  };
}

type OrgSeed = {
  key: string; name: string; industry: string; city: string; country: string; owner: UserKey; am?: UserKey;
  lifecycle?: string; relationship?: string; domains?: string[]; employees?: string; address?: string; health?: string;
  description?: string; source?: string; created?: string; renewal?: string; nextCheckin?: string; cadence?: number;
};

const ORGS: OrgSeed[] = [
  { key: 'dekade', name: 'Brouwerij De Kade', industry: 'Food and beverage', city: 'Utrecht', country: 'NL', owner: 'raka', am: 'luna', lifecycle: 'customer', relationship: 'active', domains: ['dekade.nl', 'dekade.com'], employees: '11-50', address: 'Oudegracht, Utrecht, Netherlands', health: 'on_track', description: 'Brewery and taproom', source: 'lemlist, v0.1 Outreach Only', created: '2026-09-02', nextCheckin: '2026-11-06', cadence: 91 },
  { key: 'harbor', name: 'Harbor Physio', industry: 'Healthcare', city: 'Rotterdam', country: 'NL', owner: 'raka', lifecycle: 'opportunity', description: 'Physiotherapy practice', source: 'lemlist', created: '2026-09-14' },
  { key: 'maison', name: 'Maison Orée', industry: 'Food and beverage', city: 'Brussels', country: 'BE', owner: 'raka', lifecycle: 'opportunity', description: 'Bakery and patisserie', source: 'lemlist', created: '2026-10-20' },
  { key: 'noordzee', name: 'Noordzee Surf School', industry: 'Sports and leisure', city: 'Scheveningen', country: 'NL', owner: 'josh', lifecycle: 'opportunity', source: 'referral', created: '2026-10-28' },
  { key: 'bloem', name: 'Bloem Florists', industry: 'Retail', city: 'Amsterdam', country: 'NL', owner: 'raka', lifecycle: 'opportunity', source: 'lemlist', created: '2026-10-22' },
  { key: 'greywater', name: 'Greywater Labs', industry: 'Software and technology', city: 'Eindhoven', country: 'NL', owner: 'josh', lifecycle: 'opportunity', description: 'Water recycling hardware', source: 'referral', created: '2026-10-10' },
  { key: 'okra', name: 'Okra Kitchen', industry: 'Food and beverage', city: 'London', country: 'GB', owner: 'raka', lifecycle: 'opportunity', description: 'Catering kitchen', source: 'lemlist', created: '2026-10-15' },
  { key: 'ridgeway', name: 'Ridgeway Joinery', industry: 'Construction', city: 'Bristol', country: 'GB', owner: 'josh', lifecycle: 'opportunity', source: 'lemlist', created: '2026-10-05' },
  { key: 'vellum', name: 'Vellum & Co', industry: 'Professional services', city: 'Ghent', country: 'BE', owner: 'luna', lifecycle: 'opportunity', description: 'Bookkeeping firm', source: 'referral', created: '2026-10-12' },
  { key: 'lumen', name: 'Lumen Dental Group', industry: 'Healthcare', city: 'The Hague', country: 'NL', owner: 'luna', am: 'luna', lifecycle: 'customer', relationship: 'retainer', health: 'on_track', renewal: '2026-11-30', source: 'referral', created: '2026-08-20' },
  { key: 'atlas', name: 'Atlas Freight BV', industry: 'Logistics', city: 'Rotterdam', country: 'NL', owner: 'luna', am: 'luna', lifecycle: 'customer', relationship: 'retainer', health: 'at_risk', source: 'lemlist', created: '2026-08-12' },
  { key: 'corvo', name: 'Corvo Coffee', industry: 'Food and beverage', city: 'Leiden', country: 'NL', owner: 'josh', lifecycle: 'opportunity', description: 'Coffee roaster', source: 'lemlist', created: '2026-10-18' },
  { key: 'fjell', name: 'Studio Fjell', industry: 'Creative and design', city: 'Oslo', country: 'NO', owner: 'josh', am: 'luna', lifecycle: 'customer', relationship: 'onboarding', health: 'on_track', source: 'referral', created: '2026-09-25' },
  { key: 'pellegrino', name: 'Pellegrino Ceramics', industry: 'Retail', city: 'Florence', country: 'IT', owner: 'josh', am: 'luna', lifecycle: 'customer', relationship: 'onboarding', source: 'lemlist', created: '2026-10-01' },
  { key: 'kessler', name: 'Kessler Werkzeugbau', industry: 'Manufacturing', city: 'Stuttgart', country: 'DE', owner: 'raka', lifecycle: 'lead', description: 'Tool and die maker', source: 'lemlist', created: '2026-11-02' },
  { key: 'kadeholding', name: 'Kade Holding', industry: 'Other', city: 'Utrecht', country: 'NL', owner: 'raka', lifecycle: 'lead', domains: ['kadeholding.nl'], description: 'Holding company of Pieter Jansen', source: 'manual', created: '2026-09-12' },
  // Organizations behind the lead pipeline cards
  { key: 'laurent', name: 'Atelier Laurent', industry: 'Creative and design', city: 'Lyon', country: 'FR', owner: 'raka', source: 'lemlist', created: '2026-11-05' },
  { key: 'visser', name: 'Visser Installatietechniek', industry: 'Construction', city: 'Zwolle', country: 'NL', owner: 'raka', source: 'lemlist', created: '2026-11-05' },
  { key: 'mensah', name: 'Mensah Legal', industry: 'Legal', city: 'London', country: 'GB', owner: 'luna', source: 'lemlist', created: '2026-11-03' },
  { key: 'weber', name: 'Weber Gartenbau', industry: 'Construction', city: 'Freiburg', country: 'DE', owner: 'raka', source: 'lemlist', created: '2026-10-30' },
  { key: 'oconnor', name: "O'Connor Builders", industry: 'Construction', city: 'Cork', country: 'IE', owner: 'josh', source: 'lemlist', created: '2026-11-01' },
  { key: 'holm', name: 'Holm Rejser', industry: 'Travel', city: 'Aarhus', country: 'DK', owner: 'raka', source: 'lemlist', created: '2026-10-15' },
  { key: 'benali', name: 'Benali Dental', industry: 'Healthcare', city: 'Antwerp', country: 'BE', owner: 'luna', source: 'lemlist', created: '2026-10-20' },
  { key: 'rossi', name: 'Rossi Trattoria', industry: 'Hospitality', city: 'Bologna', country: 'IT', owner: 'raka', source: 'lemlist', created: '2026-10-17' },
  { key: 'schmidt', name: 'Schmidt Fahrräder', industry: 'Retail', city: 'Leipzig', country: 'DE', owner: 'raka', source: 'lemlist', created: '2026-10-12' },
  { key: 'lind', name: 'Lind Arkitekter', industry: 'Architecture', city: 'Malmö', country: 'SE', owner: 'josh', source: 'lemlist', created: '2026-10-14' },
  { key: 'moreau', name: 'Moreau Fleurs', industry: 'Retail', city: 'Bordeaux', country: 'FR', owner: 'luna', source: 'lemlist', created: '2026-10-16' },
];

type ContactSeed = {
  key: string; first: string; last: string; title: string; org: string; relationship: string; roles?: string[];
  email?: string; emailType?: string; lifecycle?: string; created: string; source?: string; accepted?: string; tagline?: string;
};

const CONTACTS: ContactSeed[] = [
  { key: 'eva', first: 'Eva', last: 'Jansen', title: 'Owner', org: 'dekade', relationship: 'owner', roles: ['decision_maker'], email: 'eva@dekade.nl', lifecycle: 'customer', created: '2026-09-02', source: 'lemlist', accepted: '2026-09-02 19:47', tagline: 'Owner at Brouwerij De Kade' },
  { key: 'tom', first: 'Tom', last: 'Bakker', title: 'Taproom manager', org: 'dekade', relationship: 'employee', roles: ['champion'], email: 'tom@dekade.nl', lifecycle: 'customer', created: '2026-09-12' },
  { key: 'sanne', first: 'Sanne', last: 'de Vries', title: 'Finance', org: 'dekade', relationship: 'employee', roles: ['billing_contact'], email: 'finance@dekade.nl', emailType: 'billing', lifecycle: 'customer', created: '2026-09-12' },
  { key: 'pieter', first: 'Pieter', last: 'Jansen', title: 'Director', org: 'kadeholding', relationship: 'owner', email: 'pieter@kadeholding.nl', created: '2026-09-12', tagline: 'Director at Kade Holding, former owner of Brouwerij De Kade' },
  { key: 'martin', first: 'Martin', last: 'Kessler', title: 'Geschäftsführer', org: 'kessler', relationship: 'owner', roles: ['decision_maker'], created: '2026-11-02', source: 'lemlist', accepted: '2026-11-02 08:10' },
  { key: 'noor', first: 'Noor', last: 'Haddad', title: 'Owner', org: 'harbor', relationship: 'owner', roles: ['decision_maker'], lifecycle: 'opportunity', created: '2026-09-14', source: 'lemlist', accepted: '2026-09-14 12:30' },
  { key: 'sophie', first: 'Sophie', last: 'Laurent', title: 'Owner', org: 'laurent', relationship: 'owner', created: '2026-11-05', source: 'lemlist', accepted: '2026-11-05 07:40' },
  { key: 'daan', first: 'Daan', last: 'Visser', title: 'Eigenaar', org: 'visser', relationship: 'owner', created: '2026-11-05', source: 'lemlist', accepted: '2026-11-05 10:15' },
  { key: 'ama', first: 'Ama', last: 'Mensah', title: 'Founder', org: 'mensah', relationship: 'founder', created: '2026-11-03', source: 'lemlist', accepted: '2026-11-03 16:02' },
  { key: 'clara', first: 'Clara', last: 'Weber', title: 'Inhaberin', org: 'weber', relationship: 'owner', created: '2026-10-30', source: 'lemlist', accepted: '2026-10-30 09:20' },
  { key: 'liam', first: 'Liam', last: "O'Connor", title: 'Director', org: 'oconnor', relationship: 'owner', created: '2026-11-01', source: 'lemlist', accepted: '2026-11-01 18:45' },
  { key: 'jens', first: 'Jens', last: 'Holm', title: 'Ejer', org: 'holm', relationship: 'owner', created: '2026-10-15', source: 'lemlist', accepted: '2026-10-15 11:00' },
  { key: 'fatima', first: 'Fatima', last: 'Benali', title: 'Owner', org: 'benali', relationship: 'owner', created: '2026-10-20', source: 'lemlist', accepted: '2026-10-20 14:30' },
  { key: 'marco', first: 'Marco', last: 'Rossi', title: 'Titolare', org: 'rossi', relationship: 'owner', created: '2026-10-17', source: 'lemlist', accepted: '2026-10-17 20:05' },
  { key: 'hannah', first: 'Hannah', last: 'Schmidt', title: 'Inhaberin', org: 'schmidt', relationship: 'owner', created: '2026-10-12', source: 'lemlist', accepted: '2026-10-12 08:55' },
  { key: 'tobias', first: 'Tobias', last: 'Lind', title: 'Partner', org: 'lind', relationship: 'founder', created: '2026-10-14', source: 'lemlist', accepted: '2026-10-14 13:10' },
  { key: 'ines', first: 'Inès', last: 'Moreau', title: 'Gérante', org: 'moreau', relationship: 'owner', created: '2026-10-16', source: 'lemlist', accepted: '2026-10-16 10:40' },
];

type DealSeed = {
  key: string; org: string; name: string; amount: number; owner: UserKey; stage: string; pipeline?: string; entered: string;
  history?: [string, string][]; close: string; created: string; next?: string | null; extra?: Record<string, unknown>;
  wonAt?: string; lostAt?: string; lostReason?: string; pricing?: string; forecast?: string;
};

const OPEN_DEALS: DealSeed[] = [
  { key: 'maison', org: 'maison', name: 'Online ordering and pickup', amount: 8000, owner: 'raka', stage: 'discovery_booked', entered: '2026-11-03 10:00', close: '2026-12-18', created: '2026-11-03', next: 'Call Fri 16:30', extra: { meeting_at: T('2026-11-06', '16:30') } },
  { key: 'noordzee', org: 'noordzee', name: 'Lesson booking app', amount: 4500, owner: 'josh', stage: 'discovery_booked', entered: '2026-11-05 09:30', close: '2026-12-11', created: '2026-11-05', next: 'Call Tue', extra: { meeting_at: T('2026-11-10', '10:00') } },
  { key: 'bloem', org: 'bloem', name: 'Subscription shop', amount: 2500, owner: 'raka', stage: 'discovery_booked', entered: '2026-10-31 11:00', close: '2026-12-04', created: '2026-10-31', next: null, extra: { meeting_at: T('2026-11-04', '11:00') } },
  { key: 'greywater', org: 'greywater', name: 'Investor data room site', amount: 18000, owner: 'josh', stage: 'prototype_agreed', entered: '2026-11-02 14:00', history: [['discovery_booked', '2026-10-26 10:00']], close: '2027-01-15', created: '2026-10-26', next: 'Build card Mon', extra: { meeting_at: T('2026-10-27', '10:00'), build_card_url: 'https://example.com/build-cards/greywater-labs' } },
  { key: 'okra', org: 'okra', name: 'Catering quote tool', amount: 6000, owner: 'raka', stage: 'prototype_agreed', entered: '2026-11-04 15:00', history: [['discovery_booked', '2026-10-29 10:00']], close: '2026-12-18', created: '2026-10-29', next: 'First screen Wed', extra: { meeting_at: T('2026-10-30', '15:00'), build_card_url: 'https://example.com/build-cards/okra-kitchen' } },
  { key: 'harbor', org: 'harbor', name: 'Booking flow prototype', amount: 5500, owner: 'raka', stage: 'prototype_sent', entered: '2026-10-21 09:40', history: [['discovery_booked', '2026-10-01 10:00'], ['prototype_agreed', '2026-10-09 16:00']], close: '2026-11-27', created: '2026-10-01', next: 'Nudge overdue', extra: { meeting_at: T('2026-10-02', '10:00'), build_card_url: 'https://example.com/build-cards/harbor-physio', prototype_url: 'https://example.com/prototypes/harbor-physio' } },
  { key: 'ridgeway', org: 'ridgeway', name: 'Quote calculator', amount: 3500, owner: 'josh', stage: 'prototype_sent', entered: '2026-11-01 12:00', history: [['discovery_booked', '2026-10-14 10:00'], ['prototype_agreed', '2026-10-21 11:00']], close: '2026-12-04', created: '2026-10-14', next: 'Opened twice', extra: { meeting_at: T('2026-10-15', '10:00'), build_card_url: 'https://example.com/build-cards/ridgeway-joinery', prototype_url: 'https://example.com/prototypes/ridgeway-joinery' } },
  { key: 'dekade', org: 'dekade', name: 'Taproom booking app', amount: 14500, owner: 'raka', stage: 'proposal_sent', entered: '2026-10-28 10:06', history: [['discovery_booked', '2026-09-28 11:00'], ['prototype_agreed', '2026-10-02 16:00'], ['prototype_sent', '2026-10-16 09:30']], close: '2026-11-30', created: '2026-09-28', next: 'Answer the deposit question, then a pricing call', forecast: 'best_case', extra: { meeting_at: T('2026-10-02', '15:00'), build_card_url: 'https://example.com/build-cards/de-kade-taproom', prototype_url: 'https://example.com/prototypes/de-kade-booking-v2', quote_ref: 'Q-2026-019', angle: 'Lost Friday bookings to no shows', source: 'Lead pipeline, LinkedIn via lemlist', priority: 'high' } },
  { key: 'vellum', org: 'vellum', name: 'Client portal', amount: 7400, owner: 'luna', stage: 'proposal_sent', entered: '2026-11-02 13:00', history: [['discovery_booked', '2026-10-12 10:00'], ['prototype_agreed', '2026-10-16 10:00'], ['prototype_sent', '2026-10-26 10:00']], close: '2026-12-11', created: '2026-10-12', next: 'Call Thu', extra: { meeting_at: T('2026-10-13', '10:00'), build_card_url: 'https://example.com/build-cards/vellum', prototype_url: 'https://example.com/prototypes/vellum', quote_ref: 'Q-2026-021' } },
  { key: 'lumen2', org: 'lumen', name: 'Patient portal phase 2', amount: 12000, owner: 'luna', stage: 'negotiation', pipeline: 'sales', entered: '2026-10-30 11:00', history: [['discovery_booked', '2026-10-01 10:00'], ['proposal_sent', '2026-10-19 10:00']], close: '2026-11-27', created: '2026-10-01', next: 'Pricing call Mon', forecast: 'commit', extra: { meeting_at: T('2026-10-02', '10:00'), quote_ref: 'Q-2026-017', decision_date: D('2026-11-20') } },
  { key: 'atlas2', org: 'atlas', name: 'Tracking dashboard add on', amount: 2500, owner: 'luna', stage: 'contract_sent', entered: '2026-11-04 16:00', history: [['discovery_booked', '2026-10-20 10:00'], ['proposal_sent', '2026-10-27 10:00'], ['negotiation', '2026-10-30 10:00']], close: '2026-11-13', created: '2026-10-20', next: 'Awaiting signature', forecast: 'commit', extra: { meeting_at: T('2026-10-21', '10:00'), quote_ref: 'Q-2026-020', decision_date: D('2026-11-10'), signer: 'Operations director' } },
  { key: 'corvo', org: 'corvo', name: 'Wholesale order form', amount: 2000, owner: 'josh', stage: 'contract_sent', entered: '2026-11-05 10:00', history: [['discovery_booked', '2026-10-19 10:00'], ['proposal_sent', '2026-10-28 10:00'], ['negotiation', '2026-11-02 10:00']], close: '2026-11-13', created: '2026-10-19', next: 'Awaiting signature', forecast: 'commit', extra: { meeting_at: T('2026-10-20', '10:00'), quote_ref: 'Q-2026-022', decision_date: D('2026-11-09'), signer: 'Owner' } },
];

const WON_DEALS: DealSeed[] = [
  { key: 'dekade_web', org: 'dekade', name: 'Website rebuild', amount: 3400, owner: 'josh', stage: 'won', entered: '2026-09-18 11:20', wonAt: '2026-09-18 11:20', history: [['discovery_booked', '2026-09-05 10:00'], ['proposal_sent', '2026-09-12 15:00']], close: '2026-09-18', created: '2026-09-05', extra: { won_reason: 'Walkthrough showed the fix, fast start', start_date: D('2026-09-21'), quote_ref: 'Q-2026-011', meeting_at: T('2026-09-12', '14:00') } },
  { key: 'fjell', org: 'fjell', name: 'Website build', amount: 9800, owner: 'josh', stage: 'won', entered: '2026-11-03 15:00', wonAt: '2026-11-03 15:00', history: [['discovery_booked', '2026-09-25 10:00'], ['proposal_sent', '2026-10-14 10:00']], close: '2026-11-03', created: '2026-09-25', extra: { won_reason: 'Liked the prototype and the plan', start_date: D('2026-11-10') } },
  { key: 'pellegrino', org: 'pellegrino', name: 'Shop build', amount: 6200, owner: 'josh', stage: 'won', entered: '2026-11-05 12:00', wonAt: '2026-11-05 12:00', history: [['discovery_booked', '2026-10-01 10:00'], ['proposal_sent', '2026-10-20 10:00']], close: '2026-11-05', created: '2026-10-01', extra: { won_reason: 'Prototype matched their catalogue', start_date: D('2026-11-16') } },
  { key: 'lumen_ret', org: 'lumen', name: 'Support retainer', amount: 2400, owner: 'luna', stage: 'won', entered: '2026-10-01 10:00', wonAt: '2026-10-01 10:00', history: [['discovery_booked', '2026-09-10 10:00']], close: '2026-10-01', created: '2026-09-10', pricing: 'retainer', extra: { won_reason: 'Existing relationship', start_date: D('2026-10-01') } },
  { key: 'atlas_ret', org: 'atlas', name: 'Hosting and support retainer', amount: 1900, owner: 'luna', stage: 'won', entered: '2026-09-25 10:00', wonAt: '2026-09-25 10:00', history: [['discovery_booked', '2026-09-08 10:00']], close: '2026-09-25', created: '2026-09-08', pricing: 'retainer', extra: { won_reason: 'Needed hosting moved fast', start_date: D('2026-10-01') } },
];

const LOST_DEALS: [string, string, string, number, UserKey, string, string][] = [
  // key, org, name, amount, owner, lost reason, lost date
  ['lost1', 'bloem', 'Delivery app', 6500, 'raka', 'cheaper', '2026-08-21'],
  ['lost2', 'noordzee', 'Website refresh', 3000, 'josh', 'cheaper', '2026-09-02'],
  ['lost3', 'ridgeway', 'Brochure site', 2200, 'josh', 'cheaper', '2026-09-15'],
  ['lost4', 'fjell', 'Portfolio CMS', 4800, 'josh', 'cheaper', '2026-10-09'],
  ['lost5', 'okra', 'Menu site refresh', 2500, 'raka', 'not_now', '2026-08-28'],
  ['lost6', 'greywater', 'Pitch deck site', 5000, 'josh', 'not_now', '2026-09-24'],
  ['lost7', 'maison', 'Catering portal', 7000, 'raka', 'not_now', '2026-10-22'],
  ['lost8', 'vellum', 'Booking widget', 3500, 'luna', 'in_house', '2026-09-08'],
  ['lost9', 'atlas', 'Driver app', 9000, 'luna', 'in_house', '2026-10-14'],
  ['lost10', 'corvo', 'Loyalty app', 4000, 'josh', 'no_budget', '2026-09-30'],
  ['lost11', 'lumen', 'Patient reminders', 3000, 'luna', 'no_budget', '2026-10-27'],
];

type LeadSeed = { key: string; contact: string; org: string; owner: UserKey; stage: string; entered: string; research: string; note?: string | null; opener?: string; history?: [string, string][] };

const LEADS: LeadSeed[] = [
  { key: 'l1', contact: 'sophie', org: 'laurent', owner: 'raka', stage: 'new', entered: '2026-11-05 07:40', research: 'unresearched' },
  { key: 'l2', contact: 'daan', org: 'visser', owner: 'raka', stage: 'new', entered: '2026-11-05 10:15', research: 'unresearched' },
  { key: 'l3', contact: 'ama', org: 'mensah', owner: 'luna', stage: 'new', entered: '2026-11-03 16:02', research: 'unresearched' },
  { key: 'l4', contact: 'martin', org: 'kessler', owner: 'raka', stage: 'researching', entered: '2026-11-04 09:00', research: 'awaiting_approval', note: 'Drafted today', history: [['new', '2026-11-02 08:10']] },
  { key: 'l5', contact: 'clara', org: 'weber', owner: 'raka', stage: 'researching', entered: '2026-11-02 10:00', research: 'drafted', note: 'Drafted 4 Nov', history: [['new', '2026-10-30 09:20']] },
  { key: 'l6', contact: 'liam', org: 'oconnor', owner: 'josh', stage: 'researching', entered: '2026-11-05 11:00', research: 'researching', note: 'Started 5 Nov', history: [['new', '2026-11-01 18:45']] },
  { key: 'l7', contact: 'jens', org: 'holm', owner: 'raka', stage: 'attempting', entered: '2026-10-22 09:30', research: 'sent', note: 'Nudge due', opener: '2026-10-22 09:30', history: [['new', '2026-10-15 11:00'], ['researching', '2026-10-19 10:00']] },
  { key: 'l8', contact: 'fatima', org: 'benali', owner: 'luna', stage: 'attempting', entered: '2026-10-28 10:00', research: 'sent', note: 'Opener sent', opener: '2026-10-28 10:00', history: [['new', '2026-10-20 14:30'], ['researching', '2026-10-24 10:00']] },
  { key: 'l9', contact: 'marco', org: 'rossi', owner: 'raka', stage: 'attempting', entered: '2026-10-24 09:00', research: 'sent', note: 'Nudge sent 2 Nov', opener: '2026-10-24 09:00', history: [['new', '2026-10-17 20:05'], ['researching', '2026-10-21 10:00']] },
  { key: 'l10', contact: 'hannah', org: 'schmidt', owner: 'raka', stage: 'connected', entered: '2026-11-04 12:20', research: 'sent', note: 'Asked for prototype', opener: '2026-10-20 09:00', history: [['new', '2026-10-12 08:55'], ['researching', '2026-10-16 10:00'], ['attempting', '2026-10-20 09:00']] },
  { key: 'l11', contact: 'tobias', org: 'lind', owner: 'josh', stage: 'connected', entered: '2026-11-01 15:00', research: 'sent', note: 'Questions on price', opener: '2026-10-22 09:00', history: [['new', '2026-10-14 13:10'], ['researching', '2026-10-18 10:00'], ['attempting', '2026-10-22 09:00']] },
  { key: 'l12', contact: 'ines', org: 'moreau', owner: 'luna', stage: 'connected', entered: '2026-10-30 17:05', research: 'sent', note: 'Our turn', opener: '2026-10-23 09:00', history: [['new', '2026-10-16 10:40'], ['researching', '2026-10-20 10:00'], ['attempting', '2026-10-23 09:00']] },
];

const [dt, tm] = [(s: string) => s.slice(0, 10), (s: string) => s.slice(11, 16) || '09:00'];
const TS = (s: string) => T(dt(s), tm(s));

async function seedSample(t: Tx, U: Record<UserKey, string>) {
  const stage = await stageIds(t);
  const org = (k: string) => sid(`org:${k}`);
  const contact = (k: string) => sid(`contact:${k}`);
  const deal = (k: string) => sid(`deal:${k}`);
  const lead = (k: string) => sid(`lead:${k}`);

  // Organizations and domains
  for (const o of ORGS) {
    await up(t, 'organizations', {
      id: org(o.key),
      name: o.name,
      industry: o.industry,
      city: o.city,
      country: o.country,
      owner_user_id: U[o.owner],
      account_manager_user_id: o.am ? U[o.am] : null,
      lifecycle_stage: o.lifecycle ?? 'lead',
      org_type: o.lifecycle === 'customer' ? 'customer' : 'prospect',
      relationship_status: o.relationship ?? 'prospect',
      employee_band: o.employees ?? null,
      address: o.address ?? null,
      health: o.health ?? null,
      description: o.description ?? null,
      source: o.source ?? 'seed',
      renewal_date: o.renewal ? D(o.renewal) : null,
      next_checkin_date: o.nextCheckin ? D(o.nextCheckin) : null,
      checkin_cadence_days: o.cadence ?? null,
      custom: SAMPLE,
      deleted_at: null,
      created_at: T(o.created ?? '2026-10-01', '09:00'),
    });
    for (const [i, domain] of (o.domains ?? []).entries()) {
      await up(t, 'organization_domains', { id: sid(`domain:${domain}`), organization_id: org(o.key), domain_normalised: domain, is_primary: i === 0 });
    }
  }

  // Contacts, emails and roles
  for (const c of CONTACTS) {
    await up(t, 'contacts', {
      id: contact(c.key),
      first_name: c.first,
      last_name: c.last,
      job_title: c.title,
      tagline: c.tagline ?? null,
      primary_org_id: org(c.org),
      owner_user_id: U[ORGS.find((o) => o.key === c.org)!.owner],
      lifecycle_stage: c.lifecycle ?? 'lead',
      lawful_basis: 'legitimate_interest',
      do_not_contact: false,
      source: c.source ?? 'seed',
      linkedin_accepted_at: c.accepted ? TS(c.accepted) : null,
      custom: SAMPLE,
      deleted_at: null,
      created_at: T(c.created, c.accepted ? tm(c.accepted) : '09:00'),
    });
    if (c.email) {
      await up(t, 'contact_emails', { id: sid(`email:${c.email}`), contact_id: contact(c.key), email: c.email, type: c.emailType ?? 'work', is_primary: true });
    }
    await up(t, 'contact_org_roles', {
      id: sid(`role:${c.key}:${c.org}`),
      contact_id: contact(c.key),
      organization_id: org(c.org),
      relationship: c.relationship,
      buying_roles: c.roles ?? [],
      title: c.title,
      is_primary: true,
      is_current: true,
      start_date: c.key === 'pieter' ? D('2025-04-01') : null,
      end_date: null,
    });
  }
  // Pieter's former role at De Kade, ended March 2025.
  await up(t, 'contact_org_roles', {
    id: sid('role:pieter:dekade'),
    contact_id: contact('pieter'),
    organization_id: org('dekade'),
    relationship: 'former_owner',
    buying_roles: [],
    title: 'Owner',
    is_primary: false,
    is_current: false,
    start_date: '2009-05-01',
    end_date: '2025-03-31',
    evidence_url: null,
  });

  // Leads. Eva's lead was qualified in September and became the first deal.
  const allLeads: (LeadSeed & { qualified?: string })[] = [
    ...LEADS,
    { key: 'eva', contact: 'eva', org: 'dekade', owner: 'raka', stage: 'qualified', entered: '2026-09-05 10:00', research: 'sent', opener: '2026-09-03 09:02', history: [['new', '2026-09-02 19:47'], ['attempting', '2026-09-03 09:02'], ['connected', '2026-09-05 08:31']], qualified: '2026-09-05 10:00' },
  ];
  for (const l of allLeads) {
    const s = stage('lead', l.stage);
    await up(t, 'leads', {
      id: lead(l.key),
      contact_id: contact(l.contact),
      organization_id: org(l.org),
      pipeline_id: s.pipeline_id,
      stage_id: s.id,
      owner_user_id: U[l.owner],
      source: 'lemlist',
      campaign: 'v0.1 Outreach Only',
      research_status: l.research,
      status_note: l.note ?? null,
      linkedin_accepted_at: TS(CONTACTS.find((c) => c.key === l.contact)!.accepted ?? `${l.entered}`),
      opener_sent_at: l.opener ? TS(l.opener) : null,
      qualified_at: l.qualified ? TS(l.qualified) : null,
      disqualified_at: null,
      disqualify_reason: null,
      custom: SAMPLE,
      deleted_at: null,
      created_at: TS((l.history?.[0]?.[1]) ?? l.entered),
    });
  }

  // Deals
  const allDeals = [...OPEN_DEALS, ...WON_DEALS];
  for (const d of allDeals) {
    const s = stage(d.pipeline ?? 'sales', d.stage);
    await up(t, 'deals', {
      id: deal(d.key),
      name: d.name,
      organization_id: org(d.org),
      lead_id: d.org === 'dekade' ? lead('eva') : null,
      pipeline_id: s.pipeline_id,
      stage_id: s.id,
      owner_user_id: U[d.owner],
      amount: d.amount.toFixed(2),
      currency: 'EUR',
      close_date: D(d.close),
      deal_type: 'new_business',
      forecast_category: d.forecast ?? (d.stage === 'won' ? 'closed' : 'pipeline'),
      pricing_model: d.pricing ?? 'fixed',
      next_step: d.next ?? null,
      won_at: d.wonAt ? TS(d.wonAt) : null,
      lost_at: null,
      custom: SAMPLE,
      deleted_at: null,
      created_at: T(d.created, '09:00'),
      meeting_at: null,
      build_card_url: null,
      prototype_url: null,
      quote_ref: null,
      decision_date: null,
      signer: null,
      start_date: null,
      won_reason: null,
      angle: null,
      source: null,
      priority: null,
      ...(d.extra ?? {}),
    });
  }
  for (const [key, o, name, amount, owner, reason, date] of LOST_DEALS) {
    const s = stage('sales', 'lost');
    await up(t, 'deals', {
      id: deal(key),
      name,
      organization_id: org(o),
      pipeline_id: s.pipeline_id,
      stage_id: s.id,
      owner_user_id: U[owner],
      amount: amount.toFixed(2),
      close_date: D(date),
      forecast_category: 'omitted',
      lost_reason: reason,
      lost_at: T(date, '16:00'),
      custom: SAMPLE,
      deleted_at: null,
      created_at: T(addDaysKey(date, -21), '09:00'),
    });
  }
  await t`update leads set converted_deal_id = ${deal('dekade_web')} where id = ${lead('eva')}`;

  // Stage history. Rebuilt on every seed run for the seeded records.
  const seededDealIds = [...allDeals.map((d) => deal(d.key)), ...LOST_DEALS.map((l) => deal(l[0]))];
  const seededLeadIds = allLeads.map((l) => lead(l.key));
  await t`delete from stage_transitions where (object_type = 'deal' and record_id = any(${seededDealIds}::uuid[]))
                                          or (object_type = 'lead' and record_id = any(${seededLeadIds}::uuid[]))`;
  const transition = async (objectType: string, recordId: string, pkey: string, steps: [string, string][], amount: number | null, owner: string) => {
    let prev: string | null = null;
    for (const [skey, when] of steps) {
      const s = stage(pkey, skey);
      await t`
        insert into stage_transitions (object_type, record_id, pipeline_id, from_stage_id, to_stage_id, amount, currency, actor_type, actor_id, source, changed_at)
        values (${objectType}, ${recordId}, ${s.pipeline_id}, ${prev}, ${s.id}, ${amount === null ? null : amount.toFixed(2)},
                ${amount === null ? null : 'EUR'}, 'user', ${owner}, 'seed', ${TS(when)})`;
      prev = s.id;
    }
  };
  for (const d of allDeals) {
    await transition('deal', deal(d.key), d.pipeline ?? 'sales', [...(d.history ?? []), [d.stage, d.entered]], d.amount, U[d.owner]);
  }
  for (const [key, , , amount, owner, , date] of LOST_DEALS) {
    await transition('deal', deal(key), 'sales', [['discovery_booked', `${addDaysKey(date, -21)} 10:00`], ['lost', `${date} 16:00`]], amount, U[owner]);
  }
  for (const l of allLeads) {
    await transition('lead', lead(l.key), 'lead', [...(l.history ?? []), [l.stage, l.entered]], null, U[l.owner]);
  }

  // Deal contacts
  const dc = (d: string, c: string, role: string, primary: boolean, note: string | null = null) =>
    up(t, 'deal_contacts', { id: sid(`dc:${d}:${c}`), deal_id: deal(d), contact_id: contact(c), role, is_primary: primary, role_note: note });
  await dc('dekade', 'eva', 'decision_maker', true);
  await dc('dekade', 'tom', 'champion', false, 'Day to day user');
  await dc('dekade_web', 'eva', 'decision_maker', true);
  await dc('dekade_web', 'sanne', 'billing_contact', false);
  await dc('harbor', 'noor', 'decision_maker', true);

  // Products, the taproom quote and its line items
  const products = [
    ['prototype', 'Prototype build', 'One working screen and a signature moment', '1500.00', 'one_time'],
    ['website', 'Website build', 'Design and build of a marketing site', '6500.00', 'one_time'],
    ['support', 'Support retainer, monthly', 'Fixes and small changes, 4 hours', '200.00', 'monthly'],
    ['hosting', 'Hosting and maintenance, monthly', 'Hosting, updates and backups', '60.00', 'monthly'],
  ] as const;
  for (const [k, name, desc, price, freq] of products) {
    await up(t, 'products', { id: sid(`product:${k}`), name, sku: `SAMPLE-${k.toUpperCase()}`, description: desc, unit_price: price, billing_frequency: freq });
  }
  await up(t, 'quotes', {
    id: sid('quote:Q-2026-019'),
    deal_id: deal('dekade'),
    number: 'Q-2026-019',
    version: 1,
    status: 'sent',
    valid_until: D('2026-11-28'),
    sent_at: T('2026-10-28', '10:05'),
    view_count: 3,
  });
  const lines = [
    ['Booking flow with deposits', 'Table booking, deposit by iDEAL or card', '6500.00'],
    ['Waitlist and no show handling', 'Auto offer freed tables to the waitlist', '3000.00'],
    ['Staff dashboard', 'Tonight view, covers, deposits taken', '3500.00'],
    ['Launch support', 'One month, fixes and tweaks', '1500.00'],
  ];
  for (const [i, [name, desc, price]] of lines.entries()) {
    await up(t, 'line_items', { id: sid(`line:dekade:${i}`), deal_id: deal('dekade'), name, description: desc, quantity: '1', unit_price: price, tax_rate: '21.00', position: i });
  }

  // Projects, milestones, time
  const proj = (k: string) => sid(`project:${k}`);
  await up(t, 'projects', {
    id: proj('dekade_web'), name: 'Website rebuild', kind: 'delivery', organization_id: org('dekade'), deal_id: deal('dekade_web'),
    pipeline_id: stage('delivery', 'build').pipeline_id, stage_id: stage('delivery', 'build').id, status: 'active', health: 'on_track',
    owner_user_id: U.josh, start_date: D('2026-09-21'), due_date: D('2026-11-20'), budget_amount: '3400.00', budget_hours: '40.00',
    description: 'Created by automation when the deal was won, with the deal amount as budget.', custom: SAMPLE, deleted_at: null,
    created_at: T('2026-09-18', '11:20'),
  });
  await up(t, 'projects', {
    id: proj('fjell'), name: 'Website build', kind: 'delivery', organization_id: org('fjell'), deal_id: deal('fjell'),
    pipeline_id: stage('delivery', 'kickoff').pipeline_id, stage_id: stage('delivery', 'kickoff').id, status: 'active', health: 'on_track',
    owner_user_id: U.josh, start_date: D('2026-11-10'), due_date: D('2026-12-18'), budget_amount: '9800.00', budget_hours: '110.00',
    custom: SAMPLE, deleted_at: null, created_at: T('2026-11-03', '15:00'),
  });
  await up(t, 'projects', {
    id: proj('dekade_proto'), name: 'Prototype, booking flow v2', kind: 'prototype', organization_id: org('dekade'), deal_id: deal('dekade'),
    pipeline_id: null, stage_id: null, status: 'completed', health: 'on_track', owner_user_id: U.raka, start_date: D('2026-10-05'),
    due_date: D('2026-10-16'), live_url: 'https://example.com/prototypes/de-kade-booking-v2', custom: SAMPLE, deleted_at: null,
    created_at: T('2026-10-02', '16:00'),
  });
  await t`delete from stage_transitions where object_type = 'project' and record_id = any(${[proj('dekade_web'), proj('fjell')]}::uuid[])`;
  await transition('project', proj('dekade_web'), 'delivery', [['kickoff', '2026-09-21 10:00'], ['design', '2026-09-28 10:00'], ['build', '2026-10-12 10:00']], null, U.josh);
  await transition('project', proj('fjell'), 'delivery', [['kickoff', '2026-11-03 15:00']], null, U.josh);
  const milestones = [
    ['design', 'Design sign off', '2026-10-09', '2026-10-09'],
    ['build', 'Build complete', '2026-11-13', null],
    ['launch', 'Launch', '2026-11-20', null],
  ] as const;
  for (const [i, [k, name, due, done]] of milestones.entries()) {
    await up(t, 'project_milestones', { id: sid(`milestone:dekade_web:${k}`), project_id: proj('dekade_web'), name, due_date: D(due), completed_at: done ? T(done, '17:00') : null, position: i });
  }
  // 31 hours on the website rebuild
  const time: [string, UserKey, number, string][] = [
    ['2026-09-22', 'josh', 240, 'Kickoff and content inventory'],
    ['2026-09-29', 'josh', 300, 'Design, home and menu pages'],
    ['2026-10-01', 'luna', 60, 'Content review with Eva'],
    ['2026-10-06', 'josh', 360, 'Design revisions and sign off'],
    ['2026-10-13', 'josh', 420, 'Build, templates'],
    ['2026-10-20', 'josh', 300, 'Build, booking form'],
    ['2026-10-27', 'josh', 180, 'Build, events page'],
  ];
  for (const [i, [day, who, minutes, desc]] of time.entries()) {
    await up(t, 'time_entries', { id: sid(`time:dekade_web:${i}`), project_id: proj('dekade_web'), user_id: U[who], work_date: D(day), minutes, description: desc, billable: true });
  }

  // Tickets 118 and 104
  const high = await t<{ id: string; priority: string }[]>`select id, priority from sla_policies where is_default`;
  const sla = (p: string) => high.find((x) => x.priority === p)?.id ?? null;
  const tk = (n: number) => sid(`ticket:${n}`);
  await up(t, 'tickets', {
    id: tk(118), number: 118, subject: 'Booking form not sending confirmations',
    description: 'Booking form stopped sending confirmation emails on Tuesday. Guests are calling to check.',
    organization_id: org('dekade'), contact_id: contact('tom'), project_id: proj('dekade_web'),
    pipeline_id: stage('tickets', 'waiting_on_us').pipeline_id, stage_id: stage('tickets', 'waiting_on_us').id,
    priority: 'high', source: 'portal', owner_user_id: U.luna, sla_policy_id: sla('high'),
    opened_at: T('2026-11-06', '09:12'), first_replied_at: null, closed_at: null, custom: SAMPLE, deleted_at: null,
  });
  await up(t, 'tickets', {
    id: tk(104), number: 104, subject: 'Change opening hours on the site', description: 'Winter opening hours from 1 November.',
    organization_id: org('dekade'), contact_id: contact('eva'), project_id: proj('dekade_web'),
    pipeline_id: stage('tickets', 'closed').pipeline_id, stage_id: stage('tickets', 'closed').id,
    priority: 'low', source: 'email', owner_user_id: U.josh, sla_policy_id: sla('low'),
    opened_at: T('2026-10-14', '10:00'), first_replied_at: T('2026-10-14', '13:00'), closed_at: T('2026-10-15', '11:30'), custom: SAMPLE, deleted_at: null,
  });
  await t`delete from ticket_status_events where ticket_id = any(${[tk(118), tk(104)]}::uuid[])`;
  const tse = async (ticket: string, steps: [string, string][]) => {
    let prev: string | null = null;
    for (const [skey, when] of steps) {
      const s = stage('tickets', skey);
      await t`insert into ticket_status_events (ticket_id, from_stage_id, to_stage_id, pauses_sla, changed_at)
              values (${ticket}, ${prev}, ${s.id}, ${skey === 'waiting_on_client'}, ${TS(when)})`;
      prev = s.id;
    }
  };
  await tse(tk(118), [['new', '2026-11-06 09:12'], ['waiting_on_us', '2026-11-06 09:20']]);
  await tse(tk(104), [['new', '2026-10-14 10:00'], ['waiting_on_us', '2026-10-14 10:05'], ['waiting_on_client', '2026-10-14 13:00'], ['closed', '2026-10-15 11:30']]);
  await t`select setval('ticket_number_seq', greatest((select max(number) from tickets), 118))`;

  // Invoices
  const inv = (k: string) => sid(`invoice:${k}`);
  const invoices: Row[] = [
    { id: inv('041'), organization_id: org('dekade'), contact_id: contact('sanne'), project_id: proj('dekade_web'), deal_id: deal('dekade_web'), title: 'Website rebuild, deposit 50%', state: 'paid', external_number: 'AST-2026-041', issue_date: D('2026-09-18'), due_date: D('2026-10-02'), paid_at: T('2026-09-22', '10:00'), subtotal: '1700.00', vat_amount: '357.00', total: '2057.00' },
    { id: inv('052'), organization_id: org('dekade'), contact_id: contact('sanne'), project_id: proj('dekade_web'), deal_id: deal('dekade_web'), title: 'Website rebuild, final 50%', state: 'open', external_number: 'AST-2026-052', issue_date: D('2026-11-06'), due_date: D('2026-11-20'), paid_at: null, subtotal: '1700.00', vat_amount: '357.00', total: '2057.00' },
    { id: inv('taproom_deposit'), organization_id: org('dekade'), contact_id: contact('sanne'), project_id: null, deal_id: deal('dekade'), title: 'Taproom booking app, deposit', state: 'draft', external_number: null, issue_date: null, due_date: null, paid_at: null, subtotal: '7250.00', vat_amount: '1522.50', total: '8772.50', notes: 'Waits for the deal to be won' },
    { id: inv('049'), organization_id: org('atlas'), contact_id: null, project_id: null, deal_id: deal('atlas_ret'), title: 'Hosting and support, October', state: 'late', external_number: 'AST-2026-049', issue_date: D('2026-10-15'), due_date: D('2026-10-29'), paid_at: null, subtotal: '2150.00', vat_amount: '451.50', total: '2601.50' },
  ];
  for (const i of invoices) {
    await up(t, 'invoices', { notes: null, vat_treatment: 'nl_21', currency: 'EUR', custom: SAMPLE, deleted_at: null, ...i });
    await up(t, 'line_items', { id: sid(`line:invoice:${i.id}`), invoice_id: i.id, name: String(i.title), quantity: '1', unit_price: String(i.subtotal), tax_rate: '21.00', position: 0 });
  }

  // De Kade timeline, exactly the ten events of the Organization design.
  const act = async (
    key: string, kind: string, direction: string, when: string, title: string, body: string | null, tags: string[],
    links: Record<string, string>[], actor: UserKey | null = null, meeting?: { type: string },
  ) => {
    const id = sid(`activity:${key}`);
    await up(t, 'activities', {
      id, kind, direction, occurred_at: TS(when), actor_user_id: actor ? U[actor] : null, title, body,
      meta: { tags, sample: true }, source: 'seed', external_id: key, deleted_at: null,
    });
    for (const l of links) {
      const [col, value] = Object.entries(l)[0];
      await t`insert into activity_links (id, activity_id, ${t(col)}, is_primary)
              values (${sid(`al:${key}:${col}:${value}`)}, ${id}, ${value}, ${links.indexOf(l) === 0})
              on conflict do nothing`;
    }
    if (meeting) {
      await up(t, 'meetings', { id: sid(`meeting:${key}`), activity_id: id, meeting_type: meeting.type, outcome: 'completed', starts_at: TS(when) });
    }
  };
  const O = { organization_id: org('dekade') };
  await act('dk1', 'ticket', 'inbound', '2026-11-06 09:12', 'Ticket 118 opened in the client portal by Tom Bakker', 'Booking form stopped sending confirmation emails on Tuesday. Guests are calling to check.', ['High priority', 'Website rebuild'], [{ ticket_id: tk(118) }, O, { contact_id: contact('tom') }, { project_id: proj('dekade_web') }]);
  await act('dk2', 'email', 'inbound', '2026-11-05 17:40', 'Eva Jansen replied, Re: Taproom booking app proposal', 'Can guests pay the deposit upfront when they book a table? That decides it for us.', ['Gmail', 'Inbound', 'Taproom booking app'], [{ contact_id: contact('eva') }, O, { deal_id: deal('dekade') }]);
  await act('dk3', 'email', 'outbound', '2026-10-28 10:05', 'Raka sent the proposal to Eva Jansen and Tom Bakker', 'Taproom booking app proposal, €14,500, attached as a PDF.', ['Gmail', 'Approved by Raka', 'Taproom booking app'], [{ deal_id: deal('dekade') }, O, { contact_id: contact('eva') }, { contact_id: contact('tom') }], 'raka');
  await act('dk4', 'stage_change', 'internal', '2026-10-28 10:06', 'Deal moved from Prototype sent to Proposal sent', null, ['Raka', '12 days in Prototype sent'], [{ deal_id: deal('dekade') }, O], 'raka');
  await act('dk5', 'meeting', 'internal', '2026-10-02 15:00', 'Discovery call, taproom bookings', 'Outcome completed. Fridays sell out, they lose about a third of bookings to no shows. Want deposits and a waitlist.', ['Eva Jansen', 'Tom Bakker', 'Raka'], [{ deal_id: deal('dekade') }, O, { contact_id: contact('eva') }, { contact_id: contact('tom') }], 'raka', { type: 'discovery' });
  await act('dk6', 'system', 'internal', '2026-09-18 11:20', 'Deal won, Website rebuild €3,400, project created', null, ['Automation', 'Owner Josh'], [{ deal_id: deal('dekade_web') }, O, { project_id: proj('dekade_web') }]);
  await act('dk7', 'meeting', 'internal', '2026-09-12 14:00', 'Website walkthrough', 'Outcome completed. Agreed scope for the rebuild, Eva signs off, Sanne handles invoices.', ['Eva Jansen', 'Sanne de Vries', 'Raka', 'Josh'], [{ deal_id: deal('dekade_web') }, O, { contact_id: contact('eva') }, { contact_id: contact('sanne') }], 'raka', { type: 'proposal' });
  await act('dk8', 'linkedin_message', 'inbound', '2026-09-05 08:31', 'Eva Jansen replied on LinkedIn', 'Sounds interesting, send it over.', ['lemlist', 'Inbound'], [{ contact_id: contact('eva') }, O, { lead_id: lead('eva') }]);
  await act('dk9', 'linkedin_message', 'outbound', '2026-09-03 09:02', 'Raka sent the LinkedIn opener', 'Opener approved by Raka, thread pulled from lemlist twice before sending.', ['lemlist', 'v0.1 Outreach Only'], [{ contact_id: contact('eva') }, O, { lead_id: lead('eva') }], 'raka');
  await act('dk10', 'linkedin_accept', 'inbound', '2026-09-02 19:47', 'Eva Jansen accepted the LinkedIn invite', null, ['lemlist'], [{ contact_id: contact('eva') }, O, { lead_id: lead('eva') }]);
  // A few more so other records are not empty.
  await act('hb1', 'artifact_sent', 'outbound', '2026-10-21 09:40', 'Raka sent the booking flow prototype to Noor Haddad', 'Prototype link sent on LinkedIn after Noor asked to see it.', ['lemlist', 'Booking flow prototype'], [{ deal_id: deal('harbor') }, { organization_id: org('harbor') }, { contact_id: contact('noor') }], 'raka');
  await act('jh1', 'linkedin_message', 'outbound', '2026-10-22 09:30', 'Raka sent the LinkedIn opener', 'Opener approved by Raka.', ['lemlist', 'v0.1 Outreach Only'], [{ lead_id: lead('l7') }, { contact_id: contact('jens') }, { organization_id: org('holm') }], 'raka');
  await act('hs1', 'linkedin_message', 'inbound', '2026-11-04 12:20', 'Hannah Schmidt replied on LinkedIn', 'Klingt gut. Can you show me what that would look like for our shop?', ['lemlist', 'Inbound'], [{ lead_id: lead('l10') }, { contact_id: contact('hannah') }, { organization_id: org('schmidt') }]);

  // Tasks from the Tasks and Main designs.
  type TaskSeed = { key: string; owner: UserKey | null; title: string; type: string; due: string; time?: string; priority: string; rule?: string; remind?: number; links: Record<string, string>[] };
  const TASKS: TaskSeed[] = [
    { key: 't1', owner: 'raka', title: 'Nudge Harbor Physio about the prototype', type: 'linkedin', due: '2026-11-05', priority: 'high', links: [{ organization_id: org('harbor') }, { deal_id: deal('harbor') }] },
    { key: 't2', owner: 'luna', title: 'Reply on ticket 118, booking confirmations', type: 'ticket', due: '2026-11-05', priority: 'high', links: [{ organization_id: org('dekade') }, { ticket_id: tk(118) }] },
    { key: 't3', owner: 'raka', title: 'Send Jens Holm the nudge', type: 'linkedin', due: '2026-11-04', priority: 'medium', links: [{ lead_id: lead('l7') }] },
    { key: 't4', owner: null, title: 'Research 12 new accepts from this week', type: 'research', due: '2026-11-05', priority: 'medium', links: [] },
    { key: 't5', owner: 'raka', title: 'Approve opener for Martin Kessler', type: 'approval', due: '2026-11-06', time: '10:00', priority: 'high', links: [{ lead_id: lead('l4') }, { organization_id: org('kessler') }] },
    { key: 't6', owner: 'luna', title: 'Quarterly check in with Eva Jansen', type: 'checkin', due: '2026-11-06', time: '11:00', priority: 'medium', rule: 'FREQ=MONTHLY;INTERVAL=3', remind: 1440, links: [{ organization_id: org('dekade') }, { contact_id: contact('eva') }] },
    { key: 't7', owner: 'josh', title: 'Review scope for the taproom booking app', type: 'todo', due: '2026-11-06', time: '13:00', priority: 'medium', links: [{ deal_id: deal('dekade') }] },
    { key: 't8', owner: 'raka', title: 'Follow up on the proposal with Eva Jansen', type: 'email', due: '2026-11-06', time: '14:00', priority: 'medium', links: [{ organization_id: org('dekade') }, { deal_id: deal('dekade') }] },
    { key: 't9', owner: 'luna', title: 'Chase invoice AST-2026-049, 8 days late', type: 'invoice', due: '2026-11-06', time: '15:00', priority: 'high', links: [{ organization_id: org('atlas') }, { invoice_id: inv('049') }] },
    { key: 't10', owner: 'raka', title: 'Prep the discovery call', type: 'meeting_prep', due: '2026-11-06', time: '16:30', priority: 'medium', links: [{ organization_id: org('maison') }, { deal_id: deal('maison') }] },
    { key: 't11', owner: 'josh', title: 'Hand Pellegrino Ceramics over to delivery', type: 'todo', due: '2026-11-06', priority: 'low', links: [{ organization_id: org('pellegrino') }, { deal_id: deal('pellegrino') }] },
    { key: 't12', owner: 'luna', title: 'Renewal call for the support retainer', type: 'renewal', due: '2026-11-09', priority: 'medium', links: [{ organization_id: org('lumen') }] },
    { key: 't13', owner: 'josh', title: 'Kickoff for the Studio Fjell build', type: 'meeting', due: '2026-11-10', priority: 'medium', links: [{ organization_id: org('fjell') }, { project_id: proj('fjell') }] },
    { key: 't14', owner: 'raka', title: 'Send the weekly pipeline digest', type: 'todo', due: '2026-11-13', priority: 'low', rule: 'FREQ=WEEKLY;BYDAY=FR', links: [] },
    { key: 't15', owner: 'luna', title: 'Retainer health review', type: 'checkin', due: '2026-12-01', priority: 'low', rule: 'FREQ=MONTHLY', links: [{ organization_id: org('lumen') }] },
    { key: 't16', owner: 'josh', title: 'Domain and hosting renewal', type: 'renewal', due: '2027-01-15', priority: 'low', rule: 'FREQ=YEARLY', links: [{ organization_id: org('pellegrino') }] },
  ];
  for (const task of TASKS) {
    const id = sid(`task:${task.key}`);
    const due = T(task.due, task.time ?? '09:00');
    await up(t, 'tasks', {
      id, title: task.title, type: task.type, priority: task.priority, status: 'not_started', due_at: due, all_day: !task.time,
      owner_user_id: task.owner ? U[task.owner] : null, recurrence_rule: task.rule ?? null, remind_before_minutes: task.remind ?? null,
      completed_at: null, completed_by: null, created_from: 'seed', created_by: U.raka, custom: SAMPLE, deleted_at: null,
    });
    await t`delete from task_links where task_id = ${id}`;
    for (const l of task.links) {
      const [col, value] = Object.entries(l)[0];
      await t`insert into task_links (id, task_id, ${t(col)}) values (${sid(`tl:${task.key}:${col}:${value}`)}, ${id}, ${value})`;
    }
    if (task.remind) {
      await up(t, 'reminders', {
        id: sid(`reminder:${task.key}`), user_id: task.owner ? U[task.owner] : null, task_id: id, record_type: 'task', record_id: id,
        title: task.title, body: `${task.due === DESIGN_TODAY ? 'Today' : D(task.due)} ${task.time ?? ''}`.trim(),
        remind_at: new Date(due.getTime() - task.remind * 60_000), channel: 'in_app', sent_at: null, dismissed_at: null,
      });
    }
  }
  await up(t, 'reminders', {
    id: sid('reminder:lumen-renewal'), user_id: U.luna, task_id: null, record_type: 'organization', record_id: org('lumen'),
    title: `Support retainer renews ${D('2026-11-30')}`, body: 'Lumen Dental Group, account manager Luna', remind_at: T('2026-11-06', '08:00'),
    channel: 'in_app', sent_at: null, dismissed_at: null,
  });

  // The approval queue from the Main design. Nothing here is ever sent.
  const now = Date.now();
  const msgs: Row[] = [
    {
      id: sid('outbound:a1'), channel: 'linkedin', via: 'lemlist', kind: 'opener', contact_id: contact('martin'), organization_id: org('kessler'), lead_id: lead('l4'), deal_id: null, subject: null,
      body: "Hi Martin, I saw Kessler Werkzeugbau and the press line you built for a toolmaker near Stuttgart. Your site shows the finished tools but not how a buyer asks for a quote. We build quote tools for workshops like yours, so a buyer can send a drawing and get a first price the same day. Shall I sketch what that could look like for you?",
      thread_checked_at: new Date(now - 2 * 60_000), thread_message_count: 1,
    },
    {
      id: sid('outbound:a2'), channel: 'linkedin', via: 'lemlist', kind: 'nudge', contact_id: contact('noor'), organization_id: org('harbor'), lead_id: null, deal_id: deal('harbor'), subject: null,
      body: "Noor, did the booking flow make sense on your phone? The bit I'd most like your view on is the reminder text, since that's what cuts the no shows. Happy to walk you through it in ten minutes this week.",
      thread_checked_at: new Date(now - 2 * 60_000), thread_message_count: 4,
    },
    {
      id: sid('outbound:a3'), channel: 'email', via: 'gmail', kind: 'reply', contact_id: contact('eva'), organization_id: org('dekade'), lead_id: null, deal_id: deal('dekade'), subject: 'Re: Taproom booking app proposal',
      body: "Eva, good question on the deposit. Yes, guests can pay it upfront and it's taken by iDEAL or card when they book. If they don't show, the deposit stays with you. I've added a short note on refunds to the proposal so Tom can see how cancellations work.",
      thread_checked_at: new Date(now - 60_000), thread_message_count: 6,
    },
  ];
  for (const m of msgs) {
    await up(t, 'outbound_messages', {
      ...m, status: 'awaiting_approval', created_by_user_id: U.raka, owner_user_id: U.raka, approved_by_user_id: null, approved_at: null,
      approval_text: null, approved_body: null, sent_at: null, sent_activity_id: null, custom: SAMPLE,
    });
  }
}

/** Seed users always, sample records when SAMPLE_DATA=true. */
export async function seed(log: (msg: string) => void = console.log): Promise<void> {
  TODAY = todayKey();
  const sample = process.env.SAMPLE_DATA === 'true';
  await sql.begin(async (trx) => {
    const t = trx as unknown as Tx;
    await t`select set_config('app.source', 'seed', true)`;
    const users = await seedUsers(t);
    if (sample) await seedSample(t, users);
  });
  log(sample ? 'Seeded users and sample data (SAMPLE_DATA=true).' : 'Seeded users. Sample data skipped, SAMPLE_DATA is not true.');
  log('Local sign in, password "astra":');
  for (const u of USERS) log(`  ${u.email.padEnd(20)} ${u.name}, ${u.role}`);
}
