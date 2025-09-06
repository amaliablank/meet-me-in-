-- Clubs table
create table if not exists clubs (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  postcode text,
  opening_hours text,
  created_at timestamp with time zone default now()
);

-- Events table
create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  club_id uuid references clubs(id) on delete cascade,
  event_name text,
  start_time timestamptz not null,
  ticket_price text,
  genre text,
  source_link text,
  created_at timestamp with time zone default now()
);

-- Indexes (safe for Supabase/Postgres)
create index if not exists idx_events_start_time on events(start_time);
create index if not exists idx_events_club_id on events(club_id);
