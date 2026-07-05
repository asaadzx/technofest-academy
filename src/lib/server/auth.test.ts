import { describe, it, expect, vi } from 'vitest';

vi.mock('$env/dynamic/private', () => ({ env: {} }));
vi.mock('./db', () => ({
	db: {
		select: vi.fn(),
		insert: vi.fn(),
		delete: vi.fn(),
		update: vi.fn()
	}
}));

const { hashPassword, verifyPassword } = await import('./auth');

describe('hashPassword', () => {
	it('returns a bcrypt hash', async () => {
		const hash = await hashPassword('test-password');
		expect(typeof hash).toBe('string');
		expect(hash).toMatch(/^\$2[ayb]\$.{56}$/);
	});
});

describe('verifyPassword', () => {
	it('returns true for correct password', async () => {
		const hash = await hashPassword('correct-password');
		const result = await verifyPassword('correct-password', hash);
		expect(result).toBe(true);
	});

	it('returns false for incorrect password', async () => {
		const hash = await hashPassword('real-password');
		const result = await verifyPassword('wrong-password', hash);
		expect(result).toBe(false);
	});
});
