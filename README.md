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

---

## Tasks & Roadmap

### 🔴 High Priority

- [ ] **Create remaining pillar courses** — Landing page promises 4 pillars but only Python exists. Need courses for Game Development (Godot), Linux & System Administration, Web Development, and Artificial Intelligence.
- [ ] **Server-side quiz persistence** — Quiz results currently stored in `localStorage` only; lost on browser clear or device switch. Migrate to database-backed `quiz_results` table with admin analytics.
- [ ] **Email sending** — Install nodemailer/resend/sendgrid. Wire up password reset emails, email verification on registration, and notification emails.
- [ ] **Certificate generation** — Auto-generate a certificate (PDF) when a student completes all lessons in a course. Store in a `certificates` table.
- [ ] **Remove `.env` from version control** — Live Turso credentials are committed. Add to `.gitignore`, create `.env.example`, and rotate the tokens.

### 🟡 Medium Priority

- [ ] **Notifications & announcements** — Admin broadcast system with in-app notification bell and unread count. Store in `notifications` / `announcements` tables.
- [ ] **Full-text search** — Search across all courses and lessons. SQLite FTS or a dedicated search library.
- [ ] **Admin quiz management UI** — Create/edit/delete quiz questions from the admin panel instead of hardcoding in markdown.
- [ ] **Admin enrollment management** — View which students are enrolled in which courses, manually enroll/unenroll users.
- [ ] **Admin progress analytics** — Charts for per-course completion rates, average scores, drop-off points, and student activity.
- [ ] **Lesson discussion / Q&A** — Per-lesson comment thread so students can ask questions.
- [ ] **Teams, projects & exhibition features** — Landing page promises team formation, project proposals, and an exhibition timeline. Need `teams`, `projects`, `event_registrations` tables and corresponding UI.
- [ ] **Forgot password — send email** — Currently displays the reset link on screen instead of emailing it. Requires the email system above first.

### 🟢 Low Priority / Nice-to-Have

- [ ] **Course ratings & reviews** — Students rate courses (1–5 stars) with optional written review.
- [ ] **Gamification** — Leaderboard, experience points, achievement badges, and daily streaks.
- [ ] **In-browser code editor** — Embedded code editor (e.g., CodeMirror / Monaco) with a "Run" button that executes Python via a sandboxed API.
- [ ] **Dark mode** — Theme toggle with persisted preference.
- [ ] **Offline support / PWA** — Service worker, offline caching of lesson content.
- [ ] **Internationalization (i18n)** — Arabic translation alongside English, with a language switcher.
- [ ] **File uploads** — Media manager for lesson images, student project file submissions.
- [ ] **Admin activity log** — Audit trail of admin actions (who deleted a course, changed a user role, etc.).
- [ ] **E2E tests** — Only 2 test files exist (auth + slugify). Add Playwright or Vitest browser tests for critical user flows.
- [ ] **CI improvements** — Add database service for integration tests, dependency caching, and automatic Vercel deployment.
- [ ] **Accessibility audit** — Review ARIA labels, keyboard navigation, and screen reader support across all routes.
- [ ] **Error monitoring** — Integrate Sentry or similar for production error tracking.

---

## License

MIT
