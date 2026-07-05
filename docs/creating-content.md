---
title: Creating Content
---

# Creating Content

## Directory Structure

Every course lives in its own folder under `content/courses/`. The folder name becomes the course **slug** (URL path).

```
content/courses/
  getting-started-with-python/    ← slug
    index.md                      ← course definition
    lessons/
      welcome.md                  ← lesson slug = filename without .md
      your-first-program.md
      variables-and-types.md
```

To add a new course, create a new folder with an `index.md` and a `lessons/` subfolder.

---

## Course Frontmatter

`content/courses/<slug>/index.md` starts with `---` delimited YAML:

```yaml
---
title: Getting Started with Python
description: Learn Python from scratch — no prior experience needed.
difficulty: beginner          # beginner | intermediate | advanced
order: 1                      # sort order among courses
published: true               # true = visible on /courses
lessons:                      # list of lesson slugs and display titles
  - slug: welcome
    title: Welcome
  - slug: your-first-program
    title: Your First Program
  - slug: variables-and-types
    title: Variables & Data Types
---
```

| Field | Required | Description |
|---|---|---|
| `title` | yes | Human-readable course name |
| `description` | yes | Short summary (shown in course cards) |
| `difficulty` | yes | `beginner`, `intermediate`, or `advanced` |
| `order` | yes | Controls sort position (lower = first) |
| `published` | yes | `true` = public, `false` = hidden draft |
| `lessons` | yes | Array of `{ slug, title }` in order |

The body after the frontmatter is the course description, rendered as HTML inside a prose block.

> **Slug**: If you omit `slug:` from the frontmatter, the folder name is used as the slug. You can set it explicitly if needed.

---

## Lesson Frontmatter

`content/courses/<slug>/lessons/<lesson-slug>.md`:

```yaml
---
title: Variables & Data Types
description: Store and work with data using variables
order: 3
---
```

| Field | Required | Description |
|---|---|---|
| `title` | yes | Lesson heading (also shown in the sidebar list) |
| `description` | yes | Short blurb shown under the title in course page |
| `order` | yes | Position within the course (1 = first) |

The body is full markdown. Use standard markdown syntax plus:

## Markdown Features

### Basic formatting

```markdown
**bold** *italic* ~~strikethrough~~ `inline code`

## Heading 2
### Heading 3
```

### Code blocks

Use triple backticks with a language for syntax highlighting:

````markdown
```python
print("Hello, World!")
```
```bash
python hello.py
```
````

### Notes / callouts

```markdown
> "The only way to learn programming is by writing code."
```

### Tables

```markdown
| Type    | Example   | Description     |
|---------|-----------|-----------------|
| `str`   | `"hello"` | Text            |
| `int`   | `42`      | Whole numbers   |
```

### Links

```markdown
[VS Code](https://code.visualstudio.com/)
```

---

## How The System Works

### Build-time compilation

1. **mdsvex** (configured in `svelte.config.js`) preprocesses every `.md` file as a Svelte component.
2. Frontmatter becomes the component's `metadata` export.
3. The markdown body becomes the component's default template.

### Content loading

- `src/lib/content/index.ts` uses `import.meta.glob({ eager: true })` to scan all `content/courses/*/index.md` and `content/courses/*/lessons/*.md`.
- `getCourses()` returns an array of `CourseMeta` (each with its `lessons` array).
- `getCourse(slug)` returns a single course.
- `getAdjacentLessons()` computes prev/next for lesson navigation.

### Lesson rendering

- `src/lib/content/lessons.ts` loads lesson components via the same glob.
- `getLessonComponent(slug, lessonSlug)` returns `{ component, metadata }`.
- The lesson page renders it with `<LessonComponent />` (no `svelte:component` — Svelte 5 runes syntax).

### Database sync

The database stores the same data for progress tracking and search:

```bash
bun run db:seed
```

This reads all `content/courses/*/index.md` files, parses their frontmatter, and upserts into the `courses` and `lessons` tables. It also reads each lesson's `.md` file to get its `description` and `order`.

The seed script is **idempotent** — run it any time you add or edit content. It updates existing courses and replaces all lessons.

---

## Quick Start: Add a New Course

1. **Create the folder structure:**

```bash
mkdir -p content/courses/my-new-course/lessons
```

2. **Write `content/courses/my-new-course/index.md`:**

```markdown
---
title: My New Course
description: A short description of the course
difficulty: beginner
order: 2
published: true
lessons:
  - slug: first-lesson
    title: First Lesson
  - slug: second-lesson
    title: Second Lesson
---

Welcome to the course! This is the course description.
```

3. **Write each lesson file:**

`content/courses/my-new-course/lessons/first-lesson.md`:

```markdown
---
title: First Lesson
description: What we'll learn in this lesson
order: 1
---

## Lesson Content

Your markdown content here.
```

4. **Sync to the database:**

```bash
bun run db:seed
```

5. **Visit `/courses/my-new-course`** to see the result.

---

## Import From the Admin Panel

You can also upload a course `index.md` file from the admin panel:

1. Go to `/admin/courses/upload`
2. Drag-and-drop or click to select a markdown file
3. Review the parsed preview
4. Click "Create Course from Markdown"

This writes the file to `content/courses/<slug>/index.md` and creates the DB record. Note that uploaded courses only include the `index.md` — you'll need to create lesson files manually.

---

## Editing Existing Content

- **Course details**: Edit the `index.md` frontmatter, then run `bun run db:seed`.
- **Lesson content**: Edit the lesson `.md` file. The lesson page reads from the compiled component at build time (no seed needed).
- **Published status**: Toggle `published: true/false` in frontmatter, or use the admin panel toggle.
- **Lesson order**: Reorder the `lessons:` list in `index.md` and update each lesson's `order` field, then re-seed.

## Local Development

The dev server auto-reloads on file changes:

```bash
bun run dev
```

The dev server runs at `http://localhost:5173/` (or next available port).
