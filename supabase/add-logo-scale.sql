alter table public.sponsor_slots
add column if not exists logo_scale integer not null default 100;

update public.sponsor_slots
set logo_scale = 100
where logo_scale is null;
