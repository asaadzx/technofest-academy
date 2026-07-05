import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { hashPassword, verifyPassword } from '$lib/server/auth';
import { eq } from 'drizzle-orm';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const user = locals.user;
	if (!user) redirect(302, '/login');
	return { user };
};

export const actions: Actions = {
	updateName: async ({ locals, request }) => {
		if (!locals.user) redirect(302, '/login');
		const form = await request.formData();
		const name = form.get('name')?.toString().trim();
		if (!name || name.length < 2) return fail(400, { nameError: 'Name must be at least 2 characters' });

		await db.update(users).set({ name }).where(eq(users.id, locals.user.id));
		return { nameUpdated: true };
	},

	updateEmail: async ({ locals, request }) => {
		if (!locals.user) redirect(302, '/login');
		const form = await request.formData();
		const email = form.get('email')?.toString().trim();
		if (!email || !email.includes('@')) return fail(400, { emailError: 'Invalid email address' });

		const existing = await db.select().from(users).where(eq(users.email, email)).limit(1).then(r => r[0] ?? null);
		if (existing && existing.id !== locals.user.id) return fail(400, { emailError: 'Email already in use' });

		await db.update(users).set({ email }).where(eq(users.id, locals.user.id));
		return { emailUpdated: true };
	},

	updatePassword: async ({ locals, request }) => {
		if (!locals.user) redirect(302, '/login');
		const form = await request.formData();
		const currentPassword = form.get('currentPassword')?.toString();
		const newPassword = form.get('newPassword')?.toString();

		if (!currentPassword || !newPassword) return fail(400, { passwordError: 'All fields required' });
		if (newPassword.length < 6) return fail(400, { passwordError: 'New password must be at least 6 characters' });

		const [user] = await db.select().from(users).where(eq(users.id, locals.user.id)).limit(1);
		if (!user || !(await verifyPassword(currentPassword, user.passwordHash))) {
			return fail(400, { passwordError: 'Current password is incorrect' });
		}

		await db.update(users).set({ passwordHash: await hashPassword(newPassword) }).where(eq(users.id, locals.user.id));
		return { passwordUpdated: true };
	}
};
