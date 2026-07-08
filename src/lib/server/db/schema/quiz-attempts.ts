import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { users } from './users';

export const quizAttempts = sqliteTable('quiz_attempts', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	userId: integer('user_id').notNull().references(() => users.id),
	courseSlug: text('course_slug').notNull(),
	lessonSlug: text('lesson_slug').notNull(),
	answers: text('answers', { mode: 'json' }).notNull().$type<{ questionId: string; answer: string; correct: boolean; points: number }[]>(),
	score: integer('score').notNull(),
	total: integer('total').notNull(),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date())
});

export type QuizAttempt = typeof quizAttempts.$inferSelect;
export type NewQuizAttempt = typeof quizAttempts.$inferInsert;
