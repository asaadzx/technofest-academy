import { db } from '$lib/server/db';
import { progress, enrollments, courses, lessons } from '$lib/server/db/schema';
import { count, eq, and, sql, notInArray } from 'drizzle-orm';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const user = locals.user;
	if (!user) redirect(302, '/login');

	const userId = user.id;

	const [completedResult] = await db
		.select({ value: count() })
		.from(progress)
		.where(and(eq(progress.userId, userId), eq(progress.completed, true)));

	const enrolledRows = await db
		.select({
			id: enrollments.id,
			courseId: enrollments.courseId,
			courseSlug: courses.slug,
			courseTitle: courses.title,
			enrolledAt: enrollments.enrolledAt,
			completedAt: enrollments.completedAt
		})
		.from(enrollments)
		.innerJoin(courses, eq(enrollments.courseId, courses.id))
		.where(eq(enrollments.userId, userId))
		.limit(20);

	const courseIds = enrolledRows.map((r) => r.courseId);

	const progressCounts: Array<{ courseId: number; count: number; total: number }> = [];
	for (const cId of courseIds) {
		const total = await db
			.select({ value: count() })
			.from(lessons)
			.where(eq(lessons.courseId, cId))
			.then((r) => r[0].value);

		const done = await db
			.select({ value: count() })
			.from(progress)
			.innerJoin(lessons, eq(progress.lessonId, lessons.id))
			.where(and(eq(progress.userId, userId), eq(progress.completed, true), eq(lessons.courseId, cId)))
			.then((r) => r[0].value);

		progressCounts.push({ courseId: cId, count: done, total });
	}

	const availableCourses = await db
		.select({
			slug: courses.slug,
			title: courses.title,
			difficulty: courses.difficulty,
			lessonCount: count(lessons.id)
		})
		.from(courses)
		.leftJoin(lessons, eq(lessons.courseId, courses.id))
		.where(
			and(
				eq(courses.published, true),
				courseIds.length > 0 ? notInArray(courses.id, courseIds) : sql`1=1`
			)
		)
		.groupBy(courses.id)
		.orderBy(courses.order)
		.limit(4);

	return {
		completedCount: completedResult.value,
		enrolledCourses: enrolledRows,
		progressCounts,
		availableCourses
	};
};
