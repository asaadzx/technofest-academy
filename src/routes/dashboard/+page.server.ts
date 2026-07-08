import { db } from '$lib/server/db';
import { progress, enrollments, courses, lessons, certificates, quizAttempts } from '$lib/server/db/schema';
import { count, eq, and, sql, notInArray, desc, inArray } from 'drizzle-orm';
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

	const userCerts = await db
		.select()
		.from(certificates)
		.where(eq(certificates.userId, userId))
		.orderBy(desc(certificates.issuedAt))
		.limit(20);

	const userQuizAttempts = await db
		.select({
			id: quizAttempts.id,
			courseSlug: quizAttempts.courseSlug,
			lessonSlug: quizAttempts.lessonSlug,
			score: quizAttempts.score,
			total: quizAttempts.total,
			createdAt: quizAttempts.createdAt
		})
		.from(quizAttempts)
		.where(eq(quizAttempts.userId, userId))
		.orderBy(desc(quizAttempts.createdAt))
		.limit(50);

	const quizCourses = await db
		.select({ slug: courses.slug, title: courses.title })
		.from(courses)
		.where(
			userQuizAttempts.length > 0
				? inArray(courses.slug, [...new Set(userQuizAttempts.map((a) => a.courseSlug))])
				: sql`1=0`
		);

	return {
		completedCount: completedResult.value,
		enrolledCourses: enrolledRows,
		progressCounts,
		availableCourses,
		certificates: userCerts,
		quizAttempts: userQuizAttempts,
		quizCourses
	};
};
