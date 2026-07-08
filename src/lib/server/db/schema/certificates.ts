import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { users } from './users';

export const certificates = sqliteTable('certificates', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	userId: integer('user_id').notNull().references(() => users.id),
	courseSlug: text('course_slug').notNull(),
	courseTitle: text('course_title').notNull(),
	userName: text('user_name').notNull(),
	certCode: text('cert_code').notNull().unique(),
	issuedAt: integer('issued_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date())
});

export type Certificate = typeof certificates.$inferSelect;
export type NewCertificate = typeof certificates.$inferInsert;
