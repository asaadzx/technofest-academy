import { SESSION_COOKIE, getSession } from '$lib/server/auth';
import type { Handle } from '@sveltejs/kit';

const protectedPaths = ['/dashboard', '/admin', '/account'];

export const handle: Handle = async ({ event, resolve }) => {
	const sessionId = event.cookies.get(SESSION_COOKIE);

	if (sessionId) {
		const session = await getSession(sessionId);
		if (session) {
			event.locals.user = session.user;
		}
	}

	const path = event.url.pathname;
	if (protectedPaths.some(p => path.startsWith(p))) {
		if (!event.locals.user) {
			const loginUrl = new URL('/login', event.url);
			loginUrl.searchParams.set('redirect', path);
			return new Response(null, {
				status: 302,
				headers: { location: loginUrl.toString() }
			});
		}

		if (path.startsWith('/admin') && event.locals.user.role !== 'admin') {
			return new Response(null, {
				status: 302,
				headers: { location: '/dashboard' }
			});
		}
	}

	return resolve(event);
};
