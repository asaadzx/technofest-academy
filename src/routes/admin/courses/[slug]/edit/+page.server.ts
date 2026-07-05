import { db } from '$lib/server/db';
import { courses } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { error, fail, redirect } from '@sveltejs/kit';
import { existsSync, mkdirSync, renameSync, writeFileSync, readFileSync } from 'fs';
import { join } from 'path';

const contentRoot = join(process.cwd(), 'content');

export async function load({ params }) {
	const [course] = await db.select().from(courses).where(eq(courses.slug, params.slug));
	if (!course) error(404, 'Course not found');
	return { course };
}

export const actions = {
	default: async ({ request, params }) => {
		const data = await request.formData();
		const title = data.get('title') as string;
		const slug = data.get('slug') as string;
		const description = data.get('description') as string;
		const difficulty = data.get('difficulty') as string;
		const order = parseInt(data.get('order') as string) || 0;
		const published = data.get('published') === 'on';

		const errors: Record<string, string> = {};
		if (!title?.trim()) errors.title = 'Title is required';
		if (!slug?.trim()) errors.slug = 'Slug is required';
		if (!description?.trim()) errors.description = 'Description is required';
		if (!['beginner', 'intermediate', 'advanced'].includes(difficulty)) {
			errors.difficulty = 'Select a valid difficulty';
		}

		if (Object.keys(errors).length > 0) {
			return fail(400, { errors, title, slug, description, difficulty, order, published });
		}

		await db
			.update(courses)
			.set({
				slug: slug.trim(),
				title: title.trim(),
				description: description.trim(),
				difficulty: difficulty as 'beginner' | 'intermediate' | 'advanced',
				order,
				published
			})
			.where(eq(courses.slug, params.slug));

		if (slug.trim() !== params.slug) {
			const oldDir = join(contentRoot, 'courses', params.slug);
			const newDir = join(contentRoot, 'courses', slug.trim());
			if (existsSync(oldDir)) {
				renameSync(oldDir, newDir);
			}
		}

		const courseDir = join(contentRoot, 'courses', slug.trim());
		if (!existsSync(courseDir)) mkdirSync(courseDir, { recursive: true });

		const indexPath = join(courseDir, 'index.md');
		let existingContent = '';
		if (existsSync(indexPath)) {
			const raw = readFileSync(indexPath, 'utf-8');
			const bodyMatch = raw.match(/^---[\s\S]*?---\s*\n?([\s\S]*)$/);
			existingContent = bodyMatch?.[1]?.trim() ?? raw;
		}

		const frontmatter = `---\ntitle: ${title.trim()}\ndescription: ${description.trim()}\ndifficulty: ${difficulty}\norder: ${order}\npublished: ${published}\n---\n\n${existingContent}`;
		writeFileSync(indexPath, frontmatter, 'utf-8');

		redirect(303, `/admin/courses/${slug}`);
	}
};
