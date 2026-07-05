import { fail, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { hashPassword, createSession, SESSION_COOKIE, getSessionCookieOptions } from '$lib/server/auth';

export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		const name = String(data.get('name') || '').trim();
		const email = String(data.get('email') || '').trim();
		const password = String(data.get('password') || '');

		const errors: Record<string, string> = {};
		if (!name) errors.name = 'Name is required';
		if (!email) errors.email = 'Email is required';
		else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Invalid email format';
		if (!password) errors.password = 'Password is required';
		else if (password.length < 6) errors.password = 'Must be at least 6 characters';

		if (Object.keys(errors).length > 0) {
			return fail(400, { errors, name, email });
		}

		const [existing] = await db
			.select()
			.from(users)
			.where(eq(users.email, email))
			.limit(1);

		if (existing) {
			return fail(400, { errors: { email: 'An account with this email already exists.' }, name, email });
		}

		const passwordHash = await hashPassword(password);

		const [user] = await db
			.insert(users)
			.values({ name, email, passwordHash })
			.returning();

		const sessionId = await createSession(user.id);
		cookies.set(SESSION_COOKIE, sessionId, getSessionCookieOptions());

		throw redirect(302, '/dashboard');
	}
};
