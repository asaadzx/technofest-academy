import { db } from '$lib/server/db';
import { courses, lessons } from '$lib/server/db/schema';
import { eq, and } from 'drizzle-orm';
import { error, fail, redirect } from '@sveltejs/kit';
import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const contentRoot = join(process.cwd(), 'content');

export async function load({ params }) {
	const [course] = await db.select().from(courses).where(eq(courses.slug, params.slug));
	if (!course) error(404, 'Course not found');

	const [lesson] = await db
		.select()
		.from(lessons)
		.where(and(eq(lessons.courseId, course.id), eq(lessons.slug, params.lessonSlug)));
	if (!lesson) error(404, 'Lesson not found');

	const mdPath = join(contentRoot, 'courses', params.slug, 'lessons', `${params.lessonSlug}.md`);
	let existingContent = '';
	if (existsSync(mdPath)) {
		const raw = readFileSync(mdPath, 'utf-8');
		const body = raw.replace(/---[\s\S]*?---\n*/, '');
		existingContent = body;
	}

	return { course, lesson, content: existingContent };
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

		await db
			.update(lessons)
			.set({
				slug: slug.trim(),
				title: title.trim(),
				description: description.trim(),
				order
			})
			.where(and(eq(lessons.courseId, course.id), eq(lessons.slug, params.lessonSlug)));

		const lessonDir = join(contentRoot, 'courses', params.slug, 'lessons');
		if (!existsSync(lessonDir)) mkdirSync(lessonDir, { recursive: true });
		const frontmatter = `---\ntitle: ${title.trim()}\ndescription: ${description.trim()}\norder: ${order}\n---\n\n`;
		writeFileSync(join(lessonDir, `${slug.trim()}.md`), frontmatter + (content || ''), 'utf-8');

		if (slug.trim() !== params.lessonSlug) {
			const oldPath = join(lessonDir, `${params.lessonSlug}.md`);
			if (existsSync(oldPath)) {
				try { readFileSync(oldPath); writeFileSync(oldPath, ''); } catch {}
			}
		}

		redirect(303, `/admin/courses/${params.slug}`);
	}
};
