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
		.replace(/^(?: {4}|\t).*$/gm, '')
		.replace(/<MCQ[\s\S]*?>/g, '')
		.replace(/<CodeQuiz[\s\S]*?>/g, '')
		.replace(/<Fill[\s\S]*?>/g, '')
		.replace(/<TF[\s\S]*?>/g, '')
		.replace(/<[^>]+>/g, '')
		.replace(/[#*_~`>|-]{1,6}/g, '')
		.replace(/!\[.*?\]\(.*?\)/g, '')
		.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
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
