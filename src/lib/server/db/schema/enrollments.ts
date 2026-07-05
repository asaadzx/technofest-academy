import { sqliteTable, integer } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';
import { users } from './users';
import { courses } from './courses';

export const enrollments = sqliteTable('enrollments', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	userId: integer('user_id')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	courseId: integer('course_id')
		.notNull()
		.references(() => courses.id, { onDelete: 'cascade' }),
	enrolledAt: integer('enrolled_at', { mode: 'timestamp' })
		.notNull()
		.$defaultFn(() => new Date()),
	completedAt: integer('completed_at', { mode: 'timestamp' })
});

export const enrollmentsRelations = relations(enrollments, ({ one }) => ({
	user: one(users, {
		fields: [enrollments.userId],
		references: [users.id]
	}),
	course: one(courses, {
		fields: [enrollments.courseId],
		references: [courses.id]
	})
}));

export type Enrollment = typeof enrollments.$inferSelect;
export type NewEnrollment = typeof enrollments.$inferInsert;
