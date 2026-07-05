import { fail } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { users, passwordResetTokens } from '$lib/server/db/schema';

function generateToken(): string {
	const bytes = new Uint8Array(32);
	crypto.getRandomValues(bytes);
	return Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('');
}

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const email = String(data.get('email') || '').trim();

		if (!email) return fail(400, { error: 'Email is required.' });

		const [user] = await db
			.select()
			.from(users)
			.where(eq(users.email, email))
			.limit(1);

		if (!user) {
			return fail(400, { error: 'No account found with this email.' });
		}

		const token = generateToken();
		const expiresAt = new Date(Date.now() + 1000 * 60 * 60); // 1 hour

		await db.insert(passwordResetTokens).values({
			id: token,
			userId: user.id,
			expiresAt
		});

		const resetUrl = `/reset-password/${token}`;

		return { sent: true, resetUrl, email: user.email };
	}
};
