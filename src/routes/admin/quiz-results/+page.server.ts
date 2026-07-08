import { db } from '$lib/server/db';
import { quizAttempts, users, courses, lessons } from '$lib/server/db/schema';
import { eq, desc, and, sql, inArray } from 'drizzle-orm';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, url }) => {
	const user = locals.user;
	if (!user || user.role !== 'admin') redirect(302, '/login');

	const filterCourse = url.searchParams.get('course') || '';
	const filterLesson = url.searchParams.get('lesson') || '';

	const conditions = [];
	if (filterCourse) conditions.push(eq(quizAttempts.courseSlug, filterCourse));
	if (filterLesson) conditions.push(eq(quizAttempts.lessonSlug, filterLesson));

	const allAttempts = await db
		.select({
			id: quizAttempts.id,
			userName: users.name,
			userEmail: users.email,
			courseSlug: quizAttempts.courseSlug,
			lessonSlug: quizAttempts.lessonSlug,
			score: quizAttempts.score,
			total: quizAttempts.total,
			createdAt: quizAttempts.createdAt
		})
		.from(quizAttempts)
		.innerJoin(users, eq(quizAttempts.userId, users.id))
		.where(conditions.length > 0 ? and(...conditions) : sql`1=1`)
		.orderBy(desc(quizAttempts.createdAt))
		.limit(200);

	const courseList = await db
		.select({ slug: courses.slug, title: courses.title })
		.from(courses)
		.orderBy(courses.title);

	const lessonList = filterCourse
		? await db
				.select({ slug: lessons.slug, title: lessons.title })
				.from(lessons)
				.innerJoin(courses, eq(lessons.courseId, courses.id))
				.where(eq(courses.slug, filterCourse))
				.orderBy(lessons.order)
		: [];

	return { attempts: allAttempts, courses: courseList, lessons: lessonList, filterCourse, filterLesson };
};
