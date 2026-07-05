import { redirect } from '@sveltejs/kit';
import { SESSION_COOKIE, deleteSession } from '$lib/server/auth';

export const load = async ({ cookies }) => {
	const sessionId = cookies.get(SESSION_COOKIE);
	if (sessionId) {
		await deleteSession(sessionId);
	}
	cookies.delete(SESSION_COOKIE, { path: '/' });
	throw redirect(302, '/');
};
