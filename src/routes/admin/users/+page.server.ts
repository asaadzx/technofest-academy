import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const allUsers = await db
		.select({
			id: users.id,
			name: users.name,
			email: users.email,
			role: users.role,
			createdAt: users.createdAt
		})
		.from(users)
		.orderBy(users.createdAt);

	return { users: allUsers };
};

export const actions: Actions = {
	updateRole: async ({ request }) => {
		const form = await request.formData();
		const userId = Number(form.get('userId'));
		const role = form.get('role')?.toString();

		if (!userId || !role || !['user', 'admin'].includes(role)) {
			return fail(400, { error: 'Invalid input' });
		}

		await db.update(users).set({ role: role as 'student' | 'admin' }).where(eq(users.id, userId));
		return { updated: true };
	},

	deleteUser: async ({ request }) => {
		const form = await request.formData();
		const userId = Number(form.get('userId'));
		if (!userId) return fail(400, { error: 'Invalid user ID' });

		await db.delete(users).where(eq(users.id, userId));
		return { deleted: true };
	}
};
