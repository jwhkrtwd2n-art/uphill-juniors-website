# Uphill Juniors FC Website

A multi-page Next.js website for Uphill Juniors FC.

## Pages

- `/` — Home
- `/teams` — Teams and age groups
- `/fixtures-results` — FA Full-Time fixtures/results feeds
- `/sponsors` — Sponsorship packages, downloads and sponsor showcase
- `/news` — Club updates
- `/contact` — Volunteer and sponsor contact page

## Public assets included

The `/public` folder contains:

- `uphill-juniors-badge.png`
- `sponsor-mockups.png`
- `Uphill_Juniors_Landscape_Sponsorship_Brochure.pdf`
- `Uphill_Juniors_Printable_Sponsorship_Pack.pdf`

## Run locally

Install Node.js first, then run:

```bash
npm install
npm run dev
```

Open:

```txt
http://localhost:3000
```

## Deploy on Vercel

1. Create a new GitHub repository.
2. Upload this whole folder to the repository.
3. Go to Vercel.
4. Import the GitHub repository.
5. Use the default Next.js settings.
6. Deploy.

## FA Full-Time feeds

The current feed codes are in `data/fa-feeds.ts`:

- `799694205` — Upcoming Fixtures
- `495763890` — Latest Results

If you get more FA snippets, replace or add feed objects in that file.

## Updating teams

Edit `data/teams.ts`.

## Updating sponsor packages and showcase

Edit `data/sponsors.ts`.

## Updating news cards

Edit `data/news.ts`.

## Members area

The sponsor management area is available at `/admin`. It uses Supabase for
authentication, sponsor data and logo storage.

1. Create a Supabase project.
2. Run `supabase/setup.sql` in the Supabase SQL editor.
3. Create an administrator in Authentication > Users.
4. Add that user's UUID to `public.admins` using the final SQL statement in
   `supabase/setup.sql`.
5. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to
   `.env.local` and the Vercel project environment variables.
