import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const courses = sqliteTable('courses', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	slug: text('slug').notNull().unique(),
	title: text('title').notNull(),
	description: text('description').notNull(),
	difficulty: text('difficulty', {
		enum: ['beginner', 'intermediate', 'advanced']
	}).notNull().default('beginner'),
	published: integer('published', { mode: 'boolean' }).notNull().default(true),
	order: integer('order').notNull().default(0),
	createdAt: integer('created_at', { mode: 'timestamp' })
		.notNull()
		.$defaultFn(() => new Date()),
	updatedAt: integer('updated_at', { mode: 'timestamp' })
		.notNull()
		.$defaultFn(() => new Date())
		.$onUpdateFn(() => new Date())
});

export type Course = typeof courses.$inferSelect;
export type NewCourse = typeof courses.$inferInsert;
