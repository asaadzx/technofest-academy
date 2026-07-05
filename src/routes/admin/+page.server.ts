import { db } from '$lib/server/db';
import { users, enrollments } from '$lib/server/db/schema';
import { count } from 'drizzle-orm';

export async function load() {
	const [userResult] = await db.select({ value: count() }).from(users);
	const [enrollmentResult] = await db.select({ value: count() }).from(enrollments);

	return {
		userCount: userResult.value,
		enrollmentCount: enrollmentResult.value
	};
}
