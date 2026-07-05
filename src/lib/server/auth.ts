import bcrypt from 'bcryptjs';
import { eq, lt } from 'drizzle-orm';
import { db } from './db';
import { sessions, users } from './db/schema';
import type { User } from './db/schema';

const SESSION_COOKIE = 'session';
const SESSION_MAX_AGE_MS = 1000 * 60 * 60 * 24 * 7; // 7 days
const REMEMBER_MAX_AGE_MS = 1000 * 60 * 60 * 24 * 30; // 30 days

function getSessionMaxAge(rememberMe: boolean): number {
	return rememberMe ? REMEMBER_MAX_AGE_MS : SESSION_MAX_AGE_MS;
}

export async function hashPassword(password: string): Promise<string> {
	return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
	return bcrypt.compare(password, hash);
}

function generateSessionId(): string {
	const bytes = new Uint8Array(32);
	crypto.getRandomValues(bytes);
	return Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('');
}

export async function createSession(userId: number, rememberMe = true): Promise<string> {
	await db.delete(sessions).where(
		lt(sessions.expiresAt, new Date())
	);

	const id = generateSessionId();
	const expiresAt = new Date(Date.now() + getSessionMaxAge(rememberMe));

	await db.insert(sessions).values({ id, userId, expiresAt });

	return id;
}

export async function getSession(sessionId: string): Promise<{ user: User } | null> {
	const [row] = await db
		.select()
		.from(sessions)
		.where(eq(sessions.id, sessionId))
		.limit(1);

	if (!row) return null;
	if (row.expiresAt < new Date()) {
		await db.delete(sessions).where(eq(sessions.id, sessionId));
		return null;
	}

	const [user] = await db
		.select()
		.from(users)
		.where(eq(users.id, row.userId))
		.limit(1);

	if (!user) return null;

	return { user };
}

export async function deleteSession(sessionId: string): Promise<void> {
	await db.delete(sessions).where(eq(sessions.id, sessionId));
}

export function getSessionCookieOptions(rememberMe = true) {
	return {
		httpOnly: true,
		sameSite: 'lax' as const,
		secure: false,
		path: '/',
		maxAge: Math.floor(getSessionMaxAge(rememberMe) / 1000)
	};
}

export { SESSION_COOKIE };
