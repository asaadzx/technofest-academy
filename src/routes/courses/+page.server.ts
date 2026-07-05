import { db } from '$lib/server/db';
import { courses, lessons } from '$lib/server/db/schema';
import { eq, count } from 'drizzle-orm';

export async function load() {
	const rows = await db
		.select({
			slug: courses.slug,
			title: courses.title,
			description: courses.description,
			difficulty: courses.difficulty,
			order: courses.order,
			published: courses.published,
			lessonCount: count(lessons.id)
		})
		.from(courses)
		.leftJoin(lessons, eq(lessons.courseId, courses.id))
		.groupBy(courses.id)
		.orderBy(courses.order);

	return {
		courseList: rows
			.filter((c) => c.published)
			.map(({ published: _published, ...rest }) => rest)
	};
}
