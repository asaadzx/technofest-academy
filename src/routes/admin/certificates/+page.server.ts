import { db } from '$lib/server/db';
import { certificates, users, courses } from '$lib/server/db/schema';
import { eq, desc, and, sql } from 'drizzle-orm';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, url }) => {
	const user = locals.user;
	if (!user || user.role !== 'admin') redirect(302, '/login');

	const filterCourse = url.searchParams.get('course') || '';

	const conditions = [];
	if (filterCourse) conditions.push(eq(certificates.courseSlug, filterCourse));

	const allCerts = await db
		.select({
			id: certificates.id,
			userName: certificates.userName,
			userEmail: users.email,
			courseTitle: certificates.courseTitle,
			courseSlug: certificates.courseSlug,
			certCode: certificates.certCode,
			issuedAt: certificates.issuedAt
		})
		.from(certificates)
		.innerJoin(users, eq(certificates.userId, users.id))
		.where(conditions.length > 0 ? and(...conditions) : sql`1=1`)
		.orderBy(desc(certificates.issuedAt))
		.limit(200);

	const courseList = await db
		.select({ slug: courses.slug, title: courses.title })
		.from(courses)
		.orderBy(courses.title);

	return { certs: allCerts, courses: courseList, filterCourse };
};
