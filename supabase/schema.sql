-- projects 테이블
create type project_category as enum ('real_estate', 'bond', 'art', 'commodity');
create type project_status as enum ('active', 'upcoming', 'closed');

create table projects (
  id           uuid primary key default gen_random_uuid(),
  name         text not null,
  category     project_category not null,
  chain        text not null,
  tvl          text not null,
  status       project_status not null default 'active',
  description  text not null,
  detail       text not null,
  website      text not null,
  launch_date  text not null,
  logo_url     text not null default '',
  created_at   timestamptz not null default now()
);

-- subscribers 테이블
create table subscribers (
  id         uuid primary key default gen_random_uuid(),
  email      text not null unique,
  created_at timestamptz not null default now()
);

-- RLS: projects는 누구나 읽기 가능
alter table projects enable row level security;
create policy "projects_public_read" on projects for select using (true);

-- RLS: subscribers는 insert만 허용 (anon)
alter table subscribers enable row level security;
create policy "subscribers_insert" on subscribers for insert with check (true);
