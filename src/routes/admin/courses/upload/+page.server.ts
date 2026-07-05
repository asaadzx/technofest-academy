import { db } from '$lib/server/db';
import { courses } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { fail, redirect } from '@sveltejs/kit';
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

function parseFrontmatter(content: string) {
	const match = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);
	if (!match) return null;

	const yaml = match[1];
	const lines = yaml.split('\n');
	const fields: Record<string, string | boolean | number> = {};

	for (const line of lines) {
		if (!line.trim() || line[0] === ' ' || line[0] === '\t') continue;

		const colonIdx = line.indexOf(':');
		if (colonIdx === -1) continue;
		const key = line.slice(0, colonIdx).trim();
		const rawVal = line.slice(colonIdx + 1).trim();

		if (!rawVal) continue;

		let val: string | boolean | number = rawVal;
		if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
		if (val.startsWith("'") && val.endsWith("'")) val = val.slice(1, -1);

		if (val === 'true') val = true;
		else if (val === 'false') val = false;
		else if (typeof val === 'string' && /^\d+$/.test(val)) val = parseInt(val, 10);

		fields[key] = val;
	}

	return {
		title: String(fields.title || ''),
		slug: String(fields.slug || ''),
		description: String(fields.description || ''),
		difficulty: String(fields.difficulty || 'beginner'),
		published: fields.published !== false,
		order: Number(fields.order) || 0
	};
}

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const content = data.get('content') as string | null;

		if (!content?.trim()) {
			return fail(400, { errors: { file: 'No markdown content provided' } });
		}

		const parsed = parseFrontmatter(content);

		if (!parsed) {
			return fail(400, { errors: { file: 'Could not parse frontmatter. Ensure the file starts with ---' } });
		}

		const errors: Record<string, string> = {};
		if (!parsed.title?.trim()) errors.title = 'Title is required (frontmatter)';
		if (!parsed.description?.trim()) errors.description = 'Description is required (frontmatter)';
		if (!['beginner', 'intermediate', 'advanced'].includes(parsed.difficulty)) {
			errors.difficulty = 'Difficulty must be beginner, intermediate, or advanced';
		}

		if (Object.keys(errors).length > 0) {
			return fail(400, { errors, ...parsed });
		}

		const slug = parsed.slug?.trim() || parsed.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'untitled';

		const [existing] = await db.select().from(courses).where(eq(courses.slug, slug)).limit(1);
		if (existing) {
			return fail(400, { errors: { slug: `A course with slug "${slug}" already exists` }, ...parsed });
		}

		await db.insert(courses).values({
			slug,
			title: parsed.title,
			description: parsed.description,
			difficulty: parsed.difficulty as 'beginner' | 'intermediate' | 'advanced',
			order: parsed.order,
			published: parsed.published
		});

		const courseDir = join(process.cwd(), 'content', 'courses', slug);
		mkdirSync(courseDir, { recursive: true });
		writeFileSync(join(courseDir, 'index.md'), content, 'utf-8');

		redirect(303, `/admin/courses/${slug}`);
	}
};
