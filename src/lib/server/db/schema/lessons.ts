import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';
import { courses } from './courses';

export const lessons = sqliteTable('lessons', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	courseId: integer('course_id')
		.notNull()
		.references(() => courses.id, { onDelete: 'cascade' }),
	slug: text('slug').notNull(),
	title: text('title').notNull(),
	description: text('description').notNull(),
	order: integer('order').notNull().default(0),
	createdAt: integer('created_at', { mode: 'timestamp' })
		.notNull()
		.$defaultFn(() => new Date()),
	updatedAt: integer('updated_at', { mode: 'timestamp' })
		.notNull()
		.$defaultFn(() => new Date())
		.$onUpdateFn(() => new Date())
});

export const lessonsRelations = relations(lessons, ({ one }) => ({
	course: one(courses, {
		fields: [lessons.courseId],
		references: [courses.id]
	})
}));

export type Lesson = typeof lessons.$inferSelect;
export type NewLesson = typeof lessons.$inferInsert;
