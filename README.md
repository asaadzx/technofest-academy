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

## Deploy

### 1. Prerequisites

- **Bun** >= 1.3.14
- A **Turso** database — create one at [turso.tech](https://turso.tech)

### 2. Environment

```sh
cp .env.example .env
```

Set these variables in `.env`:

```
DATABASE_URL=libsql://your-db-name-username.aws-eu-west-1.turso.io
DATABASE_AUTH_TOKEN=your-turso-auth-token
```

### 3. One-time DB setup (run locally)

```sh
bun install
bun run db:push          # create tables
bun run db:seed          # sync markdown courses → DB
bun run db:create-admin <email> <password> [name]   # create admin
```

### 4. Deploy on Vercel

Push to GitHub, then:

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your repo
3. Add the same `DATABASE_URL` and `DATABASE_AUTH_TOKEN` env vars
4. Deploy — Vercel auto-detects SvelteKit

### Local dev

```sh
bun install
cp .env.example .env     # fill in your Turso credentials
bun run dev              # http://localhost:5173
```

---

## Commands

| Command | Purpose |
|---|---|
| `bun run dev` | Start dev server |
| `bun run build` | Production build |
| `bun run check` | Type-check with svelte-check |
| `bun run preview` | Preview production build locally |
| `bun run start` | Start production server |
| `bun run test` | Run unit tests |
| `bun run db:push` | Push schema to Turso DB |
| `bun run db:generate` | Generate Drizzle migrations |
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

## Content Guide

See [Creating Content](docs/creating-content.md) for detailed instructions on adding courses and lessons.

## License

MIT
