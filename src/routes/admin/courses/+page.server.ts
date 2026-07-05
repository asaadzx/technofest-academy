import { db } from '$lib/server/db';
import { courses } from '$lib/server/db/schema';
import { eq, sql } from 'drizzle-orm';
import { error } from '@sveltejs/kit';

export async function load() {
	const rows = await db
		.select({
			id: courses.id,
			slug: courses.slug,
			title: courses.title,
			description: courses.description,
			difficulty: courses.difficulty,
			published: courses.published,
			order: courses.order,
			lessonCount: sql<number>`(SELECT COUNT(*) FROM lessons WHERE lessons.course_id = courses.id)`
		})
		.from(courses)
		.orderBy(courses.order);

	return { courses: rows };
}

export const actions = {
	togglePublish: async ({ request }) => {
		const data = await request.formData();
		const id = parseInt(data.get('id') as string);

		const [course] = await db.select().from(courses).where(eq(courses.id, id));
		if (!course) error(404, 'Course not found');

		await db.update(courses).set({ published: !course.published }).where(eq(courses.id, id));

		return { success: true };
	},

	reorder: async ({ request }) => {
		const data = await request.formData();
		const id = parseInt(data.get('id') as string);
		const direction = data.get('direction') as 'up' | 'down';

		const [course] = await db.select().from(courses).where(eq(courses.id, id));
		if (!course) error(404, 'Course not found');

		const adjacentOrder = direction === 'up' ? course.order - 1 : course.order + 1;
		const [adjacent] = await db.select().from(courses).where(eq(courses.order, adjacentOrder)).limit(1);

		if (adjacent) {
			await db.update(courses).set({ order: adjacent.order }).where(eq(courses.id, id));
			await db.update(courses).set({ order: course.order }).where(eq(courses.id, adjacent.id));
		}

		return { success: true };
	}
};
