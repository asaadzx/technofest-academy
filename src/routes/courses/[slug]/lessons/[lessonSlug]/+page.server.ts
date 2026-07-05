import { db } from '$lib/server/db';
import { courses, lessons, progress, enrollments } from '$lib/server/db/schema';
import { eq, and, count } from 'drizzle-orm';
import { error, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals }) => {
	const userId = locals.user?.id;

	const dbCourse = await db
		.select()
		.from(courses)
		.where(eq(courses.slug, params.slug))
		.limit(1)
		.then((r) => r[0] ?? null);

	if (!dbCourse) error(404, 'Course not found');

	const dbLesson = await db
		.select()
		.from(lessons)
		.where(and(eq(lessons.courseId, dbCourse.id), eq(lessons.slug, params.lessonSlug)))
		.limit(1)
		.then((r) => r[0] ?? null);

	if (!dbLesson) error(404, 'Lesson not found');

	let isEnrolled = false;
	if (userId) {
		const [enrollment] = await db
			.select()
			.from(enrollments)
			.where(and(eq(enrollments.userId, userId), eq(enrollments.courseId, dbCourse.id)))
			.limit(1);
		isEnrolled = !!enrollment;
	}

	const [record] = userId
		? await db
				.select()
				.from(progress)
				.where(and(eq(progress.userId, userId), eq(progress.lessonId, dbLesson.id)))
				.limit(1)
		: [null];

	return { isEnrolled, isCompleted: record?.completed ?? false };
};

export const actions: Actions = {
	toggle: async ({ params, locals }) => {
		if (!locals.user) redirect(302, '/login');

		const dbCourse = await db
			.select()
			.from(courses)
			.where(eq(courses.slug, params.slug))
			.limit(1)
			.then((r) => r[0] ?? null);

		if (!dbCourse) error(404, 'Course not found');

		const dbLesson = await db
			.select()
			.from(lessons)
			.where(and(eq(lessons.courseId, dbCourse.id), eq(lessons.slug, params.lessonSlug)))
			.limit(1)
			.then((r) => r[0] ?? null);

		if (!dbLesson) error(404, 'Lesson not found');

		const existing = await db
			.select()
			.from(progress)
			.where(and(eq(progress.userId, locals.user.id), eq(progress.lessonId, dbLesson.id)))
			.limit(1)
			.then((r) => r[0] ?? null);

		if (existing) {
			await db
				.update(progress)
				.set({
					completed: !existing.completed,
					completedAt: existing.completed ? null : new Date(),
					updatedAt: new Date()
				})
				.where(eq(progress.id, existing.id));
		} else {
			await db.insert(progress).values({
				userId: locals.user.id,
				lessonId: dbLesson.id,
				completed: true,
				completedAt: new Date()
			});
		}

		const [[{ value: total }], [{ value: done }]] = await Promise.all([
			db.select({ value: count() }).from(lessons).where(eq(lessons.courseId, dbCourse.id)),
			db
				.select({ value: count() })
				.from(progress)
				.innerJoin(lessons, eq(progress.lessonId, lessons.id))
				.where(
					and(
						eq(progress.userId, locals.user.id),
						eq(progress.completed, true),
						eq(lessons.courseId, dbCourse.id)
					)
				)
		]);

		const isComplete = total > 0 && done >= total;

		if (isComplete) {
			await db
				.update(enrollments)
				.set({ completedAt: new Date() })
				.where(
					and(eq(enrollments.userId, locals.user.id), eq(enrollments.courseId, dbCourse.id))
				);
		} else if (done < total) {
			await db
				.update(enrollments)
				.set({ completedAt: null })
				.where(
					and(eq(enrollments.userId, locals.user.id), eq(enrollments.courseId, dbCourse.id))
				);
		}

		return { toggled: true };
	}
};
