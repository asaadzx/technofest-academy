import { db } from '$lib/server/db';
import { courses } from '$lib/server/db/schema';
import { fail, redirect } from '@sveltejs/kit';
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const contentRoot = join(process.cwd(), 'content');

export const actions = {
	default: async ({ request }) => {
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

		await db.insert(courses).values({
			slug: slug.trim(),
			title: title.trim(),
			description: description.trim(),
			difficulty: difficulty as 'beginner' | 'intermediate' | 'advanced',
			order,
			published
		});

		const courseDir = join(contentRoot, 'courses', slug.trim());
		mkdirSync(courseDir, { recursive: true });
		const frontmatter = `---\ntitle: ${title.trim()}\ndescription: ${description.trim()}\ndifficulty: ${difficulty}\norder: ${order}\npublished: ${published}\nlessons: []\n---\n\n# ${title.trim()}\n\n${description.trim()}\n`;
		writeFileSync(join(courseDir, 'index.md'), frontmatter, 'utf-8');

		redirect(303, `/admin/courses/${slug}`);
	}
};
