import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import * as schema from '../src/lib/server/db/schema';

const { users } = schema;

async function hashPassword(password: string): Promise<string> {
	return bcrypt.hash(password, 12);
}

async function main() {
	const email = process.argv[2] || process.env.ADMIN_EMAIL;
	const password = process.argv[3] || process.env.ADMIN_PASSWORD;
	const name = process.argv[4] || process.env.ADMIN_NAME || 'Admin';

	if (!email || !password) {
		console.log('');
		console.log('Usage: bun run scripts/create-admin.ts <email> <password> [name]');
		console.log('');
		console.log('  Or set ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_NAME env vars');
		console.log('');
		console.log('Examples:');
		console.log('  bun run scripts/create-admin.ts admin@school.com secret123');
		console.log('  ADMIN_EMAIL=admin@school.com ADMIN_PASSWORD=secret123 bun run scripts/create-admin.ts');
		console.log('');
		process.exit(1);
	}

	const client = createClient({
		url: process.env.DATABASE_URL,
		authToken: process.env.DATABASE_AUTH_TOKEN
	});

	const db = drizzle(client);

	const existing = await db.select().from(users).where(eq(users.email, email)).limit(1).then(r => r[0] ?? null);

	if (existing) {
		await db.update(users).set({ role: 'admin' }).where(eq(users.id, existing.id));
		console.log(`✓ "${email}" already exists — role promoted to admin`);
	} else {
		const passwordHash = await hashPassword(password);
		await db.insert(users).values({ name, email, passwordHash, role: 'admin' });
		console.log(`✓ Admin "${name}" <${email}> created`);
	}

	process.exit(0);
}

main();
