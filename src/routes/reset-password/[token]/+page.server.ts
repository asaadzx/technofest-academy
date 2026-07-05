import { fail, redirect, error } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { passwordResetTokens, users } from '$lib/server/db/schema';
import { hashPassword } from '$lib/server/auth';

export async function load({ params }) {
	const [token] = await db
		.select()
		.from(passwordResetTokens)
		.where(eq(passwordResetTokens.id, params.token))
		.limit(1);

	if (!token || token.usedAt || token.expiresAt < new Date()) {
		error(400, 'Invalid or expired reset token.');
	}

	return { valid: true };
}

export const actions = {
	default: async ({ request, params }) => {
		const [token] = await db
			.select()
			.from(passwordResetTokens)
			.where(eq(passwordResetTokens.id, params.token))
			.limit(1);

		if (!token || token.usedAt || token.expiresAt < new Date()) {
			return fail(400, { error: 'Invalid or expired reset token.' });
		}

		const data = await request.formData();
		const password = String(data.get('password') || '');

		if (password.length < 6) {
			return fail(400, { error: 'Password must be at least 6 characters.' });
		}

		const passwordHash = await hashPassword(password);
		await db.update(users).set({ passwordHash }).where(eq(users.id, token.userId));
		await db.update(passwordResetTokens).set({ usedAt: new Date() }).where(eq(passwordResetTokens.id, token.id));

		redirect(302, '/login?reset=true');
	}
};
