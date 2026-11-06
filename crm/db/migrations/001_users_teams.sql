-- 001 Users, teams and API keys.

create table users (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  name text not null,
  initials text,
  avatar_bg text,                        -- avatar background colour, for example #DCE6FB
  avatar_fg text,                        -- avatar text colour
  role text not null default 'sales' check (role in ('admin', 'sales', 'account_manager')),
  password_hash text,
  is_active boolean not null default true,
  last_login_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create unique index users_email_uq on users (lower(trim(email)));
select crm_attach_triggers('users');

create table teams (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
select crm_attach_triggers('teams');

create table team_members (
  id uuid primary key default gen_random_uuid(),
  team_id uuid not null references teams(id) on delete cascade,
  user_id uuid not null references users(id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (team_id, user_id)
);
create index team_members_user_idx on team_members (user_id);
select crm_attach_triggers('team_members');

create table api_keys (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  key_prefix text not null,              -- first 8 characters, shown in the UI
  key_hash text not null unique,         -- sha256 of the full key, the key itself is never stored
  scopes text[] not null default '{}',
  created_by uuid references users(id),
  last_used_at timestamptz,
  revoked_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
select crm_attach_triggers('api_keys');
