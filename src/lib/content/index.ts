export interface CourseMeta {
	slug: string;
	title: string;
	description: string;
	difficulty: 'beginner' | 'intermediate' | 'advanced';
	order: number;
	published: boolean;
	lessons: LessonMeta[];
}

export interface LessonMeta {
	slug: string;
	title: string;
	description: string;
	order: number;
}

interface CourseFrontmatter {
	title: string;
	description: string;
	difficulty: 'beginner' | 'intermediate' | 'advanced';
	order: number;
	published: boolean;
	lessons: { slug: string; title: string }[];
}

interface LessonFrontmatter {
	title: string;
	description: string;
	order: number;
}

type CourseModule = { metadata: CourseFrontmatter; default: unknown };

const courseModules = import.meta.glob<CourseModule>(
	'/content/courses/*/index.md',
	{ eager: true }
);

const lessonModules = import.meta.glob<{ metadata: LessonFrontmatter }>(
	'/content/courses/*/lessons/*.md',
	{ eager: true }
);

export function getCourses(): CourseMeta[] {
	const courses: CourseMeta[] = [];

	for (const [path, module] of Object.entries(courseModules)) {
		const slug = path.split('/')[3];
		const meta = module.metadata;

		const courseLessonSlugs: Record<string, string> = {};
		for (const lesson of meta.lessons ?? []) {
			courseLessonSlugs[lesson.slug] = lesson.title;
		}

		const lessons: LessonMeta[] = [];

		for (const [lessonPath, lessonModule] of Object.entries(lessonModules)) {
			if (!lessonPath.includes(`/content/courses/${slug}/`)) continue;
			const lessonSlug = lessonPath.split('/').pop()?.replace('.md', '');
			if (!lessonSlug) continue;

			lessons.push({
				slug: lessonSlug,
				title: courseLessonSlugs[lessonSlug] ?? lessonSlug,
				description: lessonModule.metadata.description ?? '',
				order: lessonModule.metadata.order ?? 0
			});
		}

		lessons.sort((a, b) => a.order - b.order);

		courses.push({
			slug,
			title: meta.title,
			description: meta.description,
			difficulty: meta.difficulty,
			order: meta.order ?? 0,
			published: meta.published ?? true,
			lessons
		});
	}

	return courses.sort((a, b) => a.order - b.order);
}

export function getCourse(slug: string): CourseMeta | undefined {
	return getCourses().find((c) => c.slug === slug);
}

export function getAdjacentLessons(
	courseSlug: string,
	currentLessonSlug: string
): { prev: LessonMeta | null; next: LessonMeta | null } {
	const course = getCourse(courseSlug);
	if (!course) return { prev: null, next: null };

	const index = course.lessons.findIndex((l) => l.slug === currentLessonSlug);
	return {
		prev: index > 0 ? course.lessons[index - 1] : null,
		next: index < course.lessons.length - 1 ? course.lessons[index + 1] : null
	};
}
