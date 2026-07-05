import { db } from '$lib/server/db';
import { courses, lessons } from '$lib/server/db/schema';
import { eq, and } from 'drizzle-orm';
import { error, redirect } from '@sveltejs/kit';

export async function load({ params }) {
	const [course] = await db.select().from(courses).where(eq(courses.slug, params.slug));
	if (!course) error(404, 'Course not found');

	const lessonRows = await db
		.select()
		.from(lessons)
		.where(eq(lessons.courseId, course.id))
		.orderBy(lessons.order);

	return { course, lessons: lessonRows };
}

export const actions = {
	togglePublish: async ({ params }) => {
		const [course] = await db.select().from(courses).where(eq(courses.slug, params.slug));
		if (!course) error(404, 'Course not found');

		await db
			.update(courses)
			.set({ published: !course.published })
			.where(eq(courses.id, course.id));

		return { success: true };
	},

	delete: async ({ params }) => {
		const [course] = await db.select().from(courses).where(eq(courses.slug, params.slug));
		if (!course) error(404, 'Course not found');

		await db.delete(courses).where(eq(courses.id, course.id));

		redirect(303, '/admin/courses');
	},

	deleteLesson: async ({ request, params }) => {
		const [course] = await db.select().from(courses).where(eq(courses.slug, params.slug));
		if (!course) error(404, 'Course not found');

		const data = await request.formData();
		const lessonId = parseInt(data.get('lessonId') as string);
		if (!lessonId) error(400, 'Missing lessonId');

		await db.delete(lessons).where(and(eq(lessons.id, lessonId), eq(lessons.courseId, course.id)));
		return { success: true };
	},

	reorderLesson: async ({ request, params }) => {
		const [course] = await db.select().from(courses).where(eq(courses.slug, params.slug));
		if (!course) error(404, 'Course not found');

		const data = await request.formData();
		const lessonId = parseInt(data.get('lessonId') as string);
		const direction = data.get('direction') as 'up' | 'down';

		const [lesson] = await db.select().from(lessons).where(eq(lessons.id, lessonId));
		if (!lesson) error(404, 'Lesson not found');

		const adjacentOrder = direction === 'up' ? lesson.order - 1 : lesson.order + 1;
		const [adjacent] = await db
			.select()
			.from(lessons)
			.where(and(eq(lessons.courseId, course.id), eq(lessons.order, adjacentOrder)))
			.limit(1);

		if (adjacent) {
			await db.update(lessons).set({ order: adjacent.order }).where(eq(lessons.id, lessonId));
			await db.update(lessons).set({ order: lesson.order }).where(eq(lessons.id, adjacent.id));
		}

		return { success: true };
	}
};
