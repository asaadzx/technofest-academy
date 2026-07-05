# TechnoFest Academy

An educational platform for **Anas Ibn Malik Official Language School** — a proposed electronic exhibition igniting passion for technology through hands-on creation, collaboration, and innovation.

Built with **SvelteKit 2**, **Svelte 5 Runes**, **Tailwind CSS v4**, **Bits UI v2**, **mdsvex**, and **Drizzle ORM** (SQLite/LibSQL).

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | SvelteKit 2 + Svelte 5 (Runes) |
| Styling | Tailwind CSS v4 + `@tailwindcss/typography` |
| UI Primitives | Bits UI v2 (headless, wrapped in `src/lib/components/ui/`) |
| Content | Markdown via mdsvex (`.md` files in `content/` and `docs/`) |
| Database | Turso (SQLite/LibSQL) via Drizzle ORM |
| Auth | bcryptjs + crypto session tokens + httpOnly cookies |
| Package Manager | Bun 1.3.14 |

---

## Prerequisites

- **Bun** >= 1.3.14
- A **Turso** database (create one at [turso.tech](https://turso.tech) or use your existing one)

---

## Setup

```sh
# 1. Install dependencies
bun install

# 2. Set up environment
cp .env.example .env
# Edit .env with your Turso database URL and auth token

# 3. Push schema to DB
bun run db:push

# 4. Seed courses from markdown into DB
bun run db:seed

# 5. Create an admin account (first time only)
bun run db:create-admin <email> <password> [name]

# 6. Start dev server
bun run dev
```

Open **http://localhost:5173**

### Production

```sh
bun run build
bun run start   # or: PORT=3000 bun build/index.js
```

---

## Accounts

| Email | Password | Role |
|---|---|---|
| asaad.work2010@gmail.com | asaad123 | admin |

Register new accounts at `/register`. To promote a user to admin, update their `role` in the database.

---

## Commands

| Command | Purpose |
|---|---|
| `bun run dev` | Start dev server (network accessible) |
| `bun run build` | Production build |
| `bun run check` | Type-check with svelte-check |
| `bun run preview` | Preview production build locally |
| `bun run start` | Start production server (`bun build/index.js`) |
| `bun run test` | Run unit tests |
| `bun run db:push` | Push schema to Turso DB |
| `bun run db:generate` | Generate Drizzle migrations |
| `bun run db:migrate` | Run migrations |
| `bun run db:seed` | Sync markdown content → Turso DB |
| `bun run db:create-admin` | Create or promote a user to admin |

---

## Project Structure

```
content/                         # Course & lesson markdown
  courses/
    getting-started-with-python/
      index.md                   # Course frontmatter + embedded lesson list
docs/                            # Documentation pages
  creating-content.md
  contributing.md
scripts/
  seed.ts                        # Markdown → DB sync script
static/
  technofest-logo.png            # Main logo (transparent)
  school-logo.webp               # School logo
src/
  lib/
    components/
      ui/                        # Styled Bits UI wrappers
      Header.svelte
      Logo.svelte
    content/
      index.ts                   # Course/lesson markdown loader
      lessons.ts                 # Typed lesson component loader
      docs.ts                    # Docs markdown loader
    server/
      auth.ts                    # Password hashing, sessions, cookies
      db/
        index.ts                 # Drizzle client
        schema/                  # Tables: users, sessions, courses, lessons, enrollments, progress
  routes/
    /                            # Landing page
    /courses                     # Course listing
    /courses/[slug]              # Course detail
    /courses/[slug]/lessons/[lessonSlug]  # Lesson viewer
    /dashboard                   # Student dashboard
    /admin                       # Admin panel
    /login, /register, /logout   # Auth pages
    /docs                        # Documentation listing
    /docs/[slug]                 # Documentation detail
```

---

## TODO

- [ ] Rate limiting on login/register
- [ ] Email verification on registration
- [ ] Fill in `docs/contributing.md`
- [ ] Deploy and test with real users

---

## Content Guide

See [Creating Content](docs/creating-content.md) for detailed instructions on adding courses and lessons.

## License

MIT
