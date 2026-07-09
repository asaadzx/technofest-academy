# Full-Text Search

## Overview

Build-time JSON search index + client-side `/search` page. No DB changes, no server endpoints. Covers courses, lessons, and docs pages.

## Build-Time Index Generator

**Script**: `scripts/generate-search-index.ts`

Reads all `.md` files from `content/courses/` (index files + lesson files) and `docs/`. For each file:

1. Parse YAML frontmatter for `title` and `description`
2. Strip frontmatter to get raw markdown body
3. Strip markdown syntax (heading `#` markers, code fences ` ``` `, bold `**`, italic `*`, HTML tags, image references, Svelte component imports like `<MCQ ... />`)
4. Extract first ~200 chars of cleaned text as `snippet`

Outputs `static/search-index.json` with entries. Each entry stores both `text` (full cleaned body for searching) and `snippet` (first ~200 chars for display):

```json
[
  {
    "id": "python-variables",
    "type": "lesson",
    "title": "Python Variables",
    "description": "Learn how to store data in variables",
    "slug": "python-variables",
    "courseSlug": "getting-started-with-python",
    "courseTitle": "Getting Started with Python",
    "text": "Variables are containers for storing data values...",
    "snippet": "Variables are containers for storing data values..."
  },
  {
    "id": "web-development",
    "type": "course",
    "title": "Web Development",
    "description": "Build websites from scratch...",
    "slug": "web-development",
    "text": "Welcome to the Web Development course...",
    "snippet": "Welcome to the Web Development course..."
  },
  {
    "id": "creating-content",
    "type": "doc",
    "title": "Creating Content",
    "description": "",
    "slug": "creating-content",
    "text": "This guide explains how to add courses and lessons...",
    "snippet": "This guide explains how to add courses and lessons..."
  }
]
```

**Package.json scripts:**
- `"build:search": "bun run scripts/generate-search-index.ts"` — regenerate index
- Hook into `"build"` script so it auto-runs before `vite build`

`.gitignore`: Add `static/search-index.json` (generated file) or commit it. Recommend committing for simplicity — it's tiny and changes infrequently.

## Search Page

**Route**: `GET /search`

**File**: `src/routes/search/+page.svelte` (no `+page.server.ts` — index loaded client-side via `fetch('/search-index.json')`)

**UI:**
- Search input at top, auto-focused, with a search icon
- On input: filter index by query (case-insensitive match against title, description, and full body text stored in-memory)
- Results grouped by type: Courses, Lessons, Documentation
- Each result card: title (linked), description/snippet, type badge
- Empty state when no query: "Search courses, lessons, and documentation..."
- Empty state when no results: "No results found for [query]"
- Debounced input (200ms) to avoid filtering on every keystroke

**Performance**: Index is loaded once via `fetch` on mount and cached in a module-level variable. For ~30 entries, filtering is instant — no debounce needed beyond UI smoothness.

## Grouping and Ranking

- Results sorted by type priority: courses first, then lessons (by course), then docs
- Within lessons: grouped under their course heading
- No relevance scoring needed at this scale — simple substring match is sufficient for < 50 entries

## Out of Scope

- Server-side search (no DB changes)
- Relevance ranking / scoring
- Fuzzy search or typo tolerance
- Search analytics / popular searches
- Indexing quiz content or user data

## Files

| File | Action |
|------|--------|
| `scripts/generate-search-index.ts` | Create |
| `src/routes/search/+page.svelte` | Create |
| `package.json` | Modify — add `build:search` script, hook into `build` |
| `static/search-index.json` | Generated |
