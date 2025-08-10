# League Companion Starter

A minimal Next.js (App Router) + Prisma + NextAuth + Tailwind starter for a fantasy league companion site:
- Weekly/season highlights (top scorers, standings)
- Blog (posts)
- Forum (threads + comments)
- Ingest API stub (replace with your provider fetch)

## Quickstart

```bash
# 1) Install deps
npm install

# 2) Setup env
cp .env.example .env.local
# (Optional) change NEXTAUTH_SECRET

# 3) Init DB (SQLite)
npx prisma migrate dev --name init

# 4) Seed demo data
npm run db:seed

# 5) Run
npm run dev
```

Open http://localhost:3000

### Demo login (Credentials provider)
- Email: **demo@league.local**
- Password: **demo1234**

> Note: Credentials auth is only for local dev convenience. For production, swap to Google/OAuth/Email verification.

## Where to build next

- Replace `/api/ingest/sync` with a real fetch (e.g., Sleeper) and upsert to `League/Team/Week/Matchup/Score`.
- Add an awards engine to populate the `Award` table per week.
- Add CRUD/pages for creating posts/threads/polls gated by role (commish/mod/member).
- Add Discord webhooks for new posts/awards.
