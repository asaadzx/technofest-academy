import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import { eq } from 'drizzle-orm';
import { readFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';
import * as schema from '../src/lib/server/db/schema';
import type { NewCourse, NewLesson } from '../src/lib/server/db/schema';
const { courses, lessons } = schema;

const client = createClient({
	url: process.env.DATABASE_URL,
	authToken: process.env.DATABASE_AUTH_TOKEN
});

const db = drizzle(client, { schema });

function parseFrontmatter(filePath: string) {
	const content = readFileSync(filePath, 'utf-8');
	const match = content.match(/^---\s*\n([\s\S]*?)\n---/);
	if (!match) return null;

	const yaml = match[1];
	const lines = yaml.split('\n');
	const fields: Record<string, string | boolean | number> = {};
	const lists: Record<string, any[]> = {};

	let i = 0;
	while (i < lines.length) {
		const line = lines[i];

		if (line.trim().startsWith('- ')) {
			i++;
			continue;
		}

		const colonIdx = line.indexOf(':');
		if (colonIdx === -1) { i++; continue; }

		const key = line.slice(0, colonIdx).trim();
		const rawVal = line.slice(colonIdx + 1).trim();

		if (rawVal === '') {
			// This is a list key (e.g., `lessons:`)
			const listItems: any[] = [];
			i++;

			while (i < lines.length) {
				const itemLine = lines[i].trim();
				if (!itemLine.startsWith('- ')) break;

				const rest = itemLine.slice(2).trim();

				if (rest.includes(':') && !rest.startsWith('{')) {
					// Multi-line object: `- slug: welcome`
					const item: Record<string, string> = {};
					const firstColon = rest.indexOf(':');
					const firstKey = rest.slice(0, firstColon).trim();
					item[firstKey] = rest.slice(firstColon + 1).trim().replace(/['"]/g, '');
					i++;

					while (i < lines.length) {
						const propLine = lines[i];
						if (!propLine.startsWith('  ')) break;
						if (propLine.trim() === '' || propLine.trim().startsWith('-')) break;
						const pc = propLine.indexOf(':');
						if (pc === -1) { i++; continue; }
						const pk = propLine.slice(0, pc).trim();
						const pv = propLine.slice(pc + 1).trim().replace(/['"]/g, '');
						item[pk] = pv;
						i++;
					}

					listItems.push(item);
				} else if (rest.startsWith('{') && rest.endsWith('}')) {
					// Inline object: `- { slug: welcome, title: Welcome }`
					const item: Record<string, string> = {};
					rest.slice(1, -1).split(',').forEach(pair => {
						const [k, ...vParts] = pair.split(':');
						if (k) item[k.trim()] = vParts.join(':').trim().replace(/['"]/g, '');
					});
					listItems.push(item);
					i++;
				} else {
					// Plain value: `- welcome`
					listItems.push(rest.replace(/['"]/g, ''));
					i++;
				}
			}

			lists[key] = listItems;
			continue;
		}

		i++;

		let val: string | boolean | number = rawVal;
		if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
		if (val.startsWith("'") && val.endsWith("'")) val = val.slice(1, -1);
		if (val === 'true') val = true;
		else if (val === 'false') val = false;
		else if (typeof val === 'string' && /^\d+$/.test(val)) val = parseInt(val, 10);

		fields[key] = val;
	}

	return { fields, lists };
}

async function seed() {
	const contentDir = join(process.cwd(), 'content', 'courses');

	if (!existsSync(contentDir)) {
		console.log('No content/courses directory found. Nothing to seed.');
		return;
	}

	const courseDirs = readdirSync(contentDir, { withFileTypes: true })
		.filter(d => d.isDirectory())
		.map(d => d.name);

	console.log(`Found ${courseDirs.length} course(s): ${courseDirs.join(', ')}`);

	for (const dir of courseDirs) {
		const indexFile = join(contentDir, dir, 'index.md');
		if (!existsSync(indexFile)) {
			console.warn(`  Skipping ${dir}: no index.md found`);
			continue;
		}

		const parsed = parseFrontmatter(indexFile);
		if (!parsed) {
			console.warn(`  Skipping ${dir}: could not parse frontmatter`);
			continue;
		}

		const { fields, lists } = parsed;

		const courseSlug = (fields.slug || dir) as string;
		const courseData: NewCourse = {
			slug: courseSlug,
			title: (fields.title || dir) as string,
			description: (fields.description || '') as string,
			difficulty: (['beginner', 'intermediate', 'advanced'].includes(fields.difficulty as string)
				? fields.difficulty
				: 'beginner') as 'beginner' | 'intermediate' | 'advanced',
			published: fields.published !== false,
			order: (fields.order as number) || 0
		};

		await db.insert(courses).values(courseData).onConflictDoUpdate({
			target: courses.slug,
			set: {
				title: courseData.title,
				description: courseData.description,
				difficulty: courseData.difficulty,
				published: courseData.published,
				order: courseData.order
			}
		});

		const [dbCourse] = await db.select().from(courses).where(eq(courses.slug, courseSlug)).limit(1);
		if (!dbCourse) {
			console.error(`  Failed to retrieve course ${courseSlug} from DB`);
			continue;
		}

		const lessonDir = join(contentDir, dir, 'lessons');
		const lessonList: { slug: string; title: string }[] = lists.lessons || [];

		await db.delete(lessons).where(eq(lessons.courseId, dbCourse.id));

		let lessonCount = 0;
		for (const lessonRef of lessonList) {
			const lessonSlug = typeof lessonRef === 'string' ? lessonRef : lessonRef.slug;
			const lessonTitle = typeof lessonRef === 'string' ? lessonSlug : (lessonRef.title || lessonSlug);

			if (!lessonSlug) {
				console.warn('    Skipping lesson entry with no slug');
				continue;
			}

			const lessonFile = join(lessonDir, `${lessonSlug}.md`);
			if (!existsSync(lessonFile)) {
				console.warn(`    Skipping lesson ${lessonSlug}: file not found at ${lessonFile}`);
				continue;
			}

			const lessonParsed = parseFrontmatter(lessonFile);
			if (!lessonParsed) {
				console.warn(`    Skipping lesson ${lessonSlug}: could not parse frontmatter`);
				continue;
			}

			const lessonData: NewLesson = {
				courseId: dbCourse.id,
				slug: lessonSlug,
				title: (lessonParsed.fields.title || lessonTitle) as string,
				description: (lessonParsed.fields.description || '') as string,
				order: (lessonParsed.fields.order as number) || 0
			};

			await db.insert(lessons).values(lessonData);
			lessonCount++;
		}

		console.log(`  ${courseData.title}: ${lessonCount} lesson(s) seeded`);
	}

	console.log('\nSeed complete.');
	process.exit(0);
}

seed().catch((err) => {
	console.error('Seed failed:', err);
	process.exit(1);
});
