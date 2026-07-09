# Full-Text Search Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build-time JSON search index + client-side `/search` page for courses, lessons, and docs.

**Architecture:** A Node.js script reads all `.md` files at build time, strips frontmatter and markdown syntax, extracts plain text, and writes a JSON index to `static/`. The search page loads the index client-side and filters in-memory.

**Tech Stack:** Node.js (Bun), no external search dependencies, SvelteKit client-side page.

## Global Constraints

- Index entry schema: `{ id, type, title, description, slug, courseSlug?, courseTitle?, text, snippet }`
- `text` = full cleaned body for searching, `snippet` = first ~200 chars for display
- Types: `course`, `lesson`, `doc`
- Case-insensitive substring matching for queries
- Results grouped by type: Courses → Lessons (by course) → Docs
- No server endpoints — index loaded client-side via `fetch('/search-index.json')`
- Save plan to `superpowers/plans/` (not `docs/` — mdsvex compiles `.md` files there)

---
## File Map

| File | Action | Responsibility |
|------|--------|---------------|
| `scripts/generate-search-index.ts` | Create | Read all `.md` files, extract text, write `search-index.json` |
| `src/routes/search/+page.svelte` | Create | Search input + grouped results |
| `package.json` | Modify | Add `build:search` script |
| `static/search-index.json` | Generated | Build-time output |

---

### Task 1: Index Generator Script

**Files:**
- Create: `scripts/generate-search-index.ts`

**Interfaces:**
- Produces: `static/search-index.json` with array of index entries

- [ ] **Step 1: Create the generator script**

`scripts/generate-search-index.ts`:

```typescript
import { readFileSync, readdirSync, writeFileSync, existsSync, statSync } from 'fs';
import { resolve, join, relative } from 'path';

const ROOT = resolve('.');
const COURSES_DIR = join(ROOT, 'content', 'courses');
const DOCS_DIR = join(ROOT, 'docs');
const OUT = join(ROOT, 'static', 'search-index.json');

interface IndexEntry {
	id: string;
	type: 'course' | 'lesson' | 'doc';
	title: string;
	description: string;
	slug: string;
	courseSlug?: string;
	courseTitle?: string;
	text: string;
	snippet: string;
}

function parseFrontmatter(raw: string): { metadata: Record<string, unknown>; body: string } {
	const match = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
	if (!match) return { metadata: {}, body: raw };

	const meta: Record<string, unknown> = {};
	for (const line of match[1].split('\n')) {
		const sep = line.indexOf(':');
		if (sep === -1) continue;
		const key = line.slice(0, sep).trim();
		let val: unknown = line.slice(sep + 1).trim();
		if (val === 'true') val = true;
		else if (val === 'false') val = false;
		else if (!isNaN(Number(val))) val = Number(val);
		meta[key] = val;
	}
	return { metadata: meta, body: match[2] };
}

function stripMarkdown(md: string): string {
	return md
		.replace(/^---[\s\S]*?---\n*/gm, '')
		.replace(/```[\s\S]*?```/g, '')
		.replace(/<[^>]+>/g, '')
		.replace(/[#*_~`>|-]{1,6}/g, '')
		.replace(/!\[.*?\]\(.*?\)/g, '')
		.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
		.replace(/<MCQ[\s\S]*?\/>/g, '')
		.replace(/<CodeQuiz[\s\S]*?\/>/g, '')
		.replace(/<Fill[\s\S]*?\/>/g, '')
		.replace(/<TF[\s\S]*?\/>/g, '')
		.replace(/\n{3,}/g, '\n\n')
		.trim();
}

function readMD(filePath: string): string | null {
	try {
		return readFileSync(filePath, 'utf-8');
	} catch {
		return null;
	}
}

function walkDir(dir: string): string[] {
	const files: string[] = [];
	try {
		for (const entry of readdirSync(dir)) {
			const full = join(dir, entry);
			if (statSync(full).isDirectory()) {
				files.push(...walkDir(full));
			} else if (entry.endsWith('.md')) {
				files.push(full);
			}
		}
	} catch {}
	return files;
}

function getCourseTitle(slug: string, courseMap: Map<string, string>): string {
	return courseMap.get(slug) || slug;
}

function main() {
	const entries: IndexEntry[] = [];
	const courseMap = new Map<string, string>();

	// --- Courses (index files) ---
	if (existsSync(COURSES_DIR)) {
		for (const courseDir of readdirSync(COURSES_DIR)) {
			const indexFile = join(COURSES_DIR, courseDir, 'index.md');
			if (!existsSync(indexFile)) continue;

			const raw = readMD(indexFile);
			if (!raw) continue;

			const { metadata, body } = parseFrontmatter(raw);
			const title = String(metadata.title || courseDir);
			const desc = String(metadata.description || '');
			const clean = stripMarkdown(body);

			courseMap.set(courseDir, title);

			entries.push({
				id: courseDir,
				type: 'course',
				title,
				description: desc,
				slug: courseDir,
				text: `${title} ${desc} ${clean}`,
				snippet: clean.slice(0, 200)
			});
		}

		// --- Lessons ---
		for (const courseDir of readdirSync(COURSES_DIR)) {
			const lessonDir = join(COURSES_DIR, courseDir, 'lessons');
			if (!existsSync(lessonDir)) continue;

			for (const file of readdirSync(lessonDir)) {
				if (!file.endsWith('.md')) continue;
				if (file === 'course-quiz.md') continue;

				const raw = readMD(join(lessonDir, file));
				if (!raw) continue;

				const { metadata, body } = parseFrontmatter(raw);
				const slug = file.replace('.md', '');
				const title = String(metadata.title || slug);
				const desc = String(metadata.description || '');
				const clean = stripMarkdown(body);

				entries.push({
					id: slug,
					type: 'lesson',
					title,
					description: desc,
					slug,
					courseSlug: courseDir,
					courseTitle: getCourseTitle(courseDir, courseMap),
					text: `${title} ${desc} ${clean}`,
					snippet: clean.slice(0, 200)
				});
			}
		}
	}

	// --- Docs ---
	if (existsSync(DOCS_DIR)) {
		for (const file of walkDir(DOCS_DIR)) {
			const raw = readMD(file);
			if (!raw) continue;

			const { metadata, body } = parseFrontmatter(raw);
			const slug = relative(DOCS_DIR, file).replace(/\.md$/, '');
			const title = String(metadata.title || slug);
			const desc = String(metadata.description || '');
			const clean = stripMarkdown(body);

			entries.push({
				id: slug,
				type: 'doc',
				title,
				description: desc,
				slug,
				text: `${title} ${desc} ${clean}`,
				snippet: clean.slice(0, 200)
			});
		}
	}

	writeFileSync(OUT, JSON.stringify(entries, null, 2), 'utf-8');
	console.log(`Search index written to ${OUT} (${entries.length} entries)`);
}

main();
```

- [ ] **Step 2: Test the script**

Run: `bun run scripts/generate-search-index.ts`

Expected output: `Search index written to static/search-index.json (XX entries)` — the file should exist and contain valid JSON with `text` and `snippet` fields.

```bash
cat static/search-index.json | head -c 500
```
Expected: valid JSON array with objects containing all required fields.

- [ ] **Step 3: Add npm script to package.json**

Find the `"scripts"` section in `package.json` and add after `"db:seed"`:

```json
"build:search": "bun run scripts/generate-search-index.ts",
```

Verify with:

```bash
bun run build:search
```

Expected: same output as Step 2.

- [ ] **Step 4: Commit**

```bash
git add scripts/generate-search-index.ts package.json static/search-index.json
git commit -m "feat: add build-time search index generator"
```

---

### Task 2: Search Page

**Files:**
- Create: `src/routes/search/+page.svelte`

**Interfaces:**
- Consumes: `static/search-index.json` (loaded client-side)
- Produces: Search page at `/search`

- [ ] **Step 1: Create the search page**

`src/routes/search/+page.svelte`:

```svelte
<script lang="ts">
	import { onMount } from 'svelte';

	interface SearchEntry {
		id: string;
		type: 'course' | 'lesson' | 'doc';
		title: string;
		description: string;
		slug: string;
		courseSlug?: string;
		courseTitle?: string;
		text: string;
		snippet: string;
	}

	let query = $state('');
	let index = $state<SearchEntry[]>([]);
	let results = $state<SearchEntry[]>([]);
	let loaded = $state(false);

	onMount(async () => {
		try {
			const res = await fetch('/search-index.json');
			index = await res.json();
			loaded = true;
		} catch {}
	});

	let debounce: ReturnType<typeof setTimeout>;
	function onInput(e: Event) {
		const value = (e.target as HTMLInputElement).value;
		clearTimeout(debounce);
		debounce = setTimeout(() => {
			query = value;
			search();
		}, 200);
	}

	function search() {
		const q = query.toLowerCase().trim();
		if (!q) {
			results = [];
			return;
		}
		results = index.filter(
			(entry) =>
				entry.title.toLowerCase().includes(q) ||
				entry.description.toLowerCase().includes(q) ||
				entry.text.toLowerCase().includes(q)
		);
	}

	function highlight(text: string): string {
		if (!query.trim()) return text;
		const q = query.trim();
		const regex = new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
		return text.slice(0, 300).replace(regex, '<mark>$1</mark>');
	}

	const grouped = $derived.by(() => {
		const g: Record<string, SearchEntry[]> = {};
		for (const r of results) {
			const key = r.type === 'course' ? 'Courses' : r.type === 'lesson' ? 'Lessons' : 'Documentation';
			if (!g[key]) g[key] = [];
			g[key].push(r);
		}
		return g;
	});

	const orderedKeys = $derived(['Courses', 'Lessons', 'Documentation'].filter((k) => grouped[k]));
</script>

<div class="mx-auto max-w-3xl px-6 py-12">
	<h1 class="text-3xl font-bold text-surface-900">Search</h1>

	<div class="relative mt-6">
		<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="absolute left-4 top-1/2 -translate-y-1/2 text-surface-400"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
		<input
			type="search"
			placeholder="Search courses, lessons, and documentation..."
			oninput={onInput}
			class="w-full rounded-xl border border-surface-300 bg-white py-3.5 pl-12 pr-4 text-surface-900 placeholder-surface-400 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
		/>
	</div>

	{#if !loaded}
		<p class="mt-8 text-center text-sm text-surface-400">Loading search index...</p>
	{:else if !query}
		<p class="mt-8 text-center text-sm text-surface-400">
			Type something to search across courses, lessons, and documentation.
		</p>
	{:else if results.length === 0}
		<p class="mt-8 text-center text-sm text-surface-500">
			No results found for <strong>"{query}"</strong>
		</p>
	{:else}
		<p class="mt-4 text-sm text-surface-400">{results.length} result{results.length !== 1 ? 's' : ''} for <strong>"{query}"</strong></p>

		<div class="mt-6 space-y-8">
			{#each orderedKeys as groupKey}
				<section>
					<h2 class="mb-3 text-lg font-semibold text-surface-900">{groupKey}</h2>
					<div class="space-y-3">
						{#each grouped[groupKey] as entry (entry.id)}
							<a
								href={entry.type === 'course'
									? '/courses/' + entry.slug
									: entry.type === 'lesson'
										? '/courses/' + entry.courseSlug + '/lessons/' + entry.slug
										: '/docs/' + entry.slug}
								class="block rounded-xl border border-surface-200 bg-white p-4 transition-colors hover:border-primary-300 hover:bg-primary-50/30"
							>
								<div class="flex items-start justify-between gap-3">
									<h3 class="font-medium text-surface-900">{@html highlight(entry.title)}</h3>
									<span class="shrink-0 rounded-full bg-surface-100 px-2.5 py-0.5 text-xs font-medium text-surface-500">
										{entry.type}
									</span>
								</div>
								{#if entry.description}
									<p class="mt-1 text-sm text-surface-500">{@html highlight(entry.description)}</p>
								{/if}
								<p class="mt-2 text-xs text-surface-400 line-clamp-2">{@html highlight(entry.snippet)}</p>
								{#if entry.type === 'lesson' && entry.courseTitle}
									<p class="mt-1.5 text-xs text-surface-400">{entry.courseTitle}</p>
								{/if}
							</a>
						{/each}
					</div>
				</section>
			{/each}
		</div>
	{/if}
</div>
```

- [ ] **Step 2: Verify with svelte-check**

```bash
bun run check
```
Expected: 0 errors, 0 warnings

- [ ] **Step 3: Test manually**

Start dev server and navigate to `/search`. Type a query and verify:
- Results appear grouped by type
- Highlighted matches in title, description, and snippet
- Links navigate to the correct course/lesson/doc pages
- Empty states show correctly

- [ ] **Step 4: Commit**

```bash
git add src/routes/search/
git commit -m "feat: add search page with client-side index search"
```
