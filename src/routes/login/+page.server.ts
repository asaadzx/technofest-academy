import { fail, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { verifyPassword, createSession, SESSION_COOKIE, getSessionCookieOptions } from '$lib/server/auth';

export const actions = {
	default: async ({ request, cookies, url }) => {
		const data = await request.formData();
		const email = String(data.get('email') || '').trim();
		const password = String(data.get('password') || '');
		const rememberMe = data.get('rememberMe') === 'on';

		const errors: Record<string, string> = {};
		if (!email) errors.email = 'Email is required';
		if (!password) errors.password = 'Password is required';

		if (Object.keys(errors).length > 0) {
			return fail(400, { errors, email });
		}

		const [user] = await db
			.select()
			.from(users)
			.where(eq(users.email, email))
			.limit(1);

		if (!user || !(await verifyPassword(password, user.passwordHash))) {
			return fail(400, { errors: { email: 'Invalid email or password.' }, email });
		}

		const sessionId = await createSession(user.id, rememberMe);
		cookies.set(SESSION_COOKIE, sessionId, getSessionCookieOptions(rememberMe));

		const redirectTo = url.searchParams.get('redirect') || '/dashboard';
		throw redirect(302, redirectTo);
	}
};
