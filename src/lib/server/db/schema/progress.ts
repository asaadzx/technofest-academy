import { sqliteTable, integer } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';
import { users } from './users';
import { lessons } from './lessons';

export const progress = sqliteTable('progress', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	userId: integer('user_id')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	lessonId: integer('lesson_id')
		.notNull()
		.references(() => lessons.id, { onDelete: 'cascade' }),
	completed: integer('completed', { mode: 'boolean' }).notNull().default(false),
	completedAt: integer('completed_at', { mode: 'timestamp' }),
	createdAt: integer('created_at', { mode: 'timestamp' })
		.notNull()
		.$defaultFn(() => new Date()),
	updatedAt: integer('updated_at', { mode: 'timestamp' })
		.notNull()
		.$defaultFn(() => new Date())
		.$onUpdateFn(() => new Date())
});

export const progressRelations = relations(progress, ({ one }) => ({
	user: one(users, {
		fields: [progress.userId],
		references: [users.id]
	}),
	lesson: one(lessons, {
		fields: [progress.lessonId],
		references: [lessons.id]
	})
}));

export type Progress = typeof progress.$inferSelect;
export type NewProgress = typeof progress.$inferInsert;
