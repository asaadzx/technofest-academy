import { db } from '$lib/server/db';
import { courses, enrollments, progress, lessons } from '$lib/server/db/schema';
import { eq, and } from 'drizzle-orm';
import { error, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals }) => {
	const { slug } = params;
	const userId = locals.user?.id;

	const dbCourse = await db
		.select()
		.from(courses)
		.where(eq(courses.slug, slug))
		.limit(1)
		.then((r) => r[0] ?? null);

	if (!dbCourse) return { dbCourseId: null, isEnrolled: false, completedLessonSlugs: [], courseCompleted: false };

	let isEnrolled = false;
	let completedLessonSlugs: string[] = [];
	let courseCompleted = false;

	if (userId) {
		const [enrollment] = await db
			.select()
			.from(enrollments)
			.where(and(eq(enrollments.userId, userId), eq(enrollments.courseId, dbCourse.id)))
			.limit(1);

		isEnrolled = !!enrollment;
		courseCompleted = !!enrollment?.completedAt;

		if (isEnrolled) {
			const completed = await db
				.select({ slug: lessons.slug })
				.from(progress)
				.innerJoin(lessons, eq(progress.lessonId, lessons.id))
				.where(
					and(
						eq(progress.userId, userId),
						eq(progress.completed, true),
						eq(lessons.courseId, dbCourse.id)
					)
				);
			completedLessonSlugs = completed.map((p) => p.slug);
		}
	}

	return { dbCourseId: dbCourse.id, isEnrolled, completedLessonSlugs, courseCompleted };
};

export const actions: Actions = {
	enroll: async ({ request, locals }) => {
		if (!locals.user) redirect(302, `/login?redirect=${request.url}`);

		const form = await request.formData();
		const courseId = Number(form.get('courseId'));

		if (!courseId) error(400, 'Missing courseId');

		const existing = await db
			.select()
			.from(enrollments)
			.where(and(eq(enrollments.userId, locals.user.id), eq(enrollments.courseId, courseId)))
			.limit(1)
			.then((r) => r[0] ?? null);

		if (!existing) {
			await db.insert(enrollments).values({ userId: locals.user.id, courseId });
		}

		return { enrolled: true };
	}
};
