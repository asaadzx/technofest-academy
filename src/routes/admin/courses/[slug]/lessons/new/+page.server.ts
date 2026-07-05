import { db } from '$lib/server/db';
import { courses, lessons } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { error, fail, redirect } from '@sveltejs/kit';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';

const contentRoot = join(process.cwd(), 'content');

export async function load({ params }) {
	const [course] = await db.select().from(courses).where(eq(courses.slug, params.slug));
	if (!course) error(404, 'Course not found');
	return { course };
}

export const actions = {
	default: async ({ request, params }) => {
		const [course] = await db.select().from(courses).where(eq(courses.slug, params.slug));
		if (!course) error(404, 'Course not found');

		const data = await request.formData();
		const title = data.get('title') as string;
		const slug = data.get('slug') as string;
		const description = data.get('description') as string;
		const order = parseInt(data.get('order') as string) || 0;
		const content = data.get('content') as string;

		const errors: Record<string, string> = {};
		if (!title?.trim()) errors.title = 'Title is required';
		if (!slug?.trim()) errors.slug = 'Slug is required';
		if (!description?.trim()) errors.description = 'Description is required';

		if (Object.keys(errors).length > 0) {
			return fail(400, { errors, title, slug, description, order, content });
		}

		await db.insert(lessons).values({
			courseId: course.id,
			slug: slug.trim(),
			title: title.trim(),
			description: description.trim(),
			order
		});

		const lessonDir = join(contentRoot, 'courses', params.slug, 'lessons');
		if (!existsSync(lessonDir)) mkdirSync(lessonDir, { recursive: true });
		const frontmatter = `---\ntitle: ${title.trim()}\ndescription: ${description.trim()}\norder: ${order}\n---\n\n`;
		writeFileSync(join(lessonDir, `${slug.trim()}.md`), frontmatter + (content || ''), 'utf-8');

		redirect(303, `/admin/courses/${params.slug}`);
	}
};
