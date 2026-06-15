create table if not exists public.admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.sponsor_slots (
  team_name text not null,
  package_code text not null check (package_code in ('main', 'back', 'training')),
  label text not null,
  sponsor_name text,
  sponsor_url text,
  logo_url text,
  logo_scale integer not null default 100,
  updated_at timestamptz not null default now(),
  primary key (team_name, package_code)
);

alter table public.sponsor_slots
add column if not exists logo_scale integer not null default 100;

alter table public.admins enable row level security;
alter table public.sponsor_slots enable row level security;

create policy "Admins can view their own record"
on public.admins for select
to authenticated
using (user_id = auth.uid());

create policy "Anyone can view sponsor slots"
on public.sponsor_slots for select
to anon, authenticated
using (true);

create policy "Admins can insert sponsor slots"
on public.sponsor_slots for insert
to authenticated
with check (exists (select 1 from public.admins where user_id = auth.uid()));

create policy "Admins can update sponsor slots"
on public.sponsor_slots for update
to authenticated
using (exists (select 1 from public.admins where user_id = auth.uid()))
with check (exists (select 1 from public.admins where user_id = auth.uid()));

insert into storage.buckets (id, name, public)
values ('sponsor-logos', 'sponsor-logos', true)
on conflict (id) do update set public = true;

create policy "Anyone can view sponsor logos"
on storage.objects for select
to public
using (bucket_id = 'sponsor-logos');

create policy "Admins can upload sponsor logos"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'sponsor-logos'
  and exists (select 1 from public.admins where user_id = auth.uid())
);

insert into public.sponsor_slots (team_name, package_code, label)
values
  ('U16s', 'main', 'Front of shirt sponsor'),
  ('U16s', 'back', 'Back of shirt sponsor'),
  ('U16s', 'training', 'Training shirt sponsor'),
  ('U15s', 'main', 'Front of shirt sponsor'),
  ('U15s', 'back', 'Back of shirt sponsor'),
  ('U15s', 'training', 'Training shirt sponsor'),
  ('U13s', 'main', 'Front of shirt sponsor'),
  ('U13s', 'back', 'Back of shirt sponsor'),
  ('U13s', 'training', 'Training shirt sponsor'),
  ('U11s', 'main', 'Front of shirt sponsor'),
  ('U11s', 'back', 'Back of shirt sponsor'),
  ('U11s', 'training', 'Training shirt sponsor'),
  ('U09s', 'main', 'Front of shirt sponsor'),
  ('U09s', 'back', 'Back of shirt sponsor'),
  ('U09s', 'training', 'Training shirt sponsor'),
  ('U08s', 'main', 'Front of shirt sponsor'),
  ('U08s', 'back', 'Back of shirt sponsor'),
  ('U08s', 'training', 'Training shirt sponsor'),
  ('U07s', 'main', 'Front of shirt sponsor'),
  ('U07s', 'back', 'Back of shirt sponsor'),
  ('U07s', 'training', 'Training shirt sponsor'),
  ('U06s', 'training', 'Training shirt sponsor')
on conflict (team_name, package_code) do nothing;

-- After creating an admin user in Authentication > Users, run:
-- insert into public.admins (user_id) values ('USER_UUID_HERE');
