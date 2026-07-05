<script lang="ts">
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';
	import { Button, Card, Badge } from '$lib/components/ui';
	import { getCourse } from '$lib/content/index';

	const slug = $derived($page.params.slug ?? '');
	const course = $derived(getCourse(slug));

	const { dbCourseId, isEnrolled, completedLessonSlugs, courseCompleted } = $derived($page.data as {
		dbCourseId: number | null;
		isEnrolled: boolean;
		completedLessonSlugs: string[];
		courseCompleted: boolean;
	});

	const totalLessons = $derived(course?.lessons.length ?? 0);
	const completedCount = $derived(completedLessonSlugs.length);
	const progressPct = $derived(totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0);
	const firstUncompletedIndex = $derived(
		course?.lessons.findIndex((l) => !completedLessonSlugs.includes(l.slug))
		?? -1
	);
	const continueSlug = $derived(
		firstUncompletedIndex >= 0
			? course!.lessons[firstUncompletedIndex].slug
			: course?.lessons[0]?.slug
	);

	const difficultyMeta: Record<string, { label: string; variant: 'success' | 'warning' | 'error' }> = {
		beginner: { label: 'Beginner', variant: 'success' },
		intermediate: { label: 'Intermediate', variant: 'warning' },
		advanced: { label: 'Advanced', variant: 'error' }
	};
</script>

{#if !course}
	<div class="mx-auto max-w-3xl px-6 py-24 text-center">
		<h1 class="text-3xl font-bold text-surface-900">Course not found</h1>
		<p class="mt-3 text-surface-500">The course you're looking for doesn't exist.</p>
		<div class="mt-6">
			<Button href="/courses">Back to Courses</Button>
		</div>
	</div>
{:else}
	<div class="mx-auto max-w-4xl px-6 py-16">
		<header class="mb-12">
			<div class="mb-2">
				<a href="/courses" class="text-sm text-primary-600 hover:text-primary-700">
					&larr; All Courses
				</a>
			</div>
			<div class="flex items-start justify-between gap-4">
				<div>
					<h1 class="text-4xl font-bold text-surface-900">{course.title}</h1>
					<p class="mt-3 text-lg leading-relaxed text-surface-500">
						{course.description}
					</p>
				</div>
				<Badge variant={difficultyMeta[course.difficulty]?.variant ?? 'default'}>
					{difficultyMeta[course.difficulty]?.label ?? course.difficulty}
				</Badge>
			</div>
		</header>

		{#if isEnrolled}
			<div class="mb-8 rounded-xl border {courseCompleted ? 'border-green-200 bg-green-50' : 'border-primary-200 bg-primary-50'} p-5">
				<div class="flex items-center justify-between gap-4">
					<div>
						<p class="font-semibold {courseCompleted ? 'text-green-800' : 'text-primary-800'}">
							{courseCompleted ? 'Course Complete!' : "You're enrolled"}
						</p>
						<p class="mt-0.5 text-sm {courseCompleted ? 'text-green-600' : 'text-primary-600'}">
							{completedCount} of {totalLessons} lessons completed
						</p>
					</div>
					<div class="flex items-center gap-3">
						<div class="flex h-2 w-32 overflow-hidden rounded-full bg-primary-200">
							<div
								class="h-full rounded-full {courseCompleted ? 'bg-green-500' : 'bg-primary-600'} transition-all"
								style="width: {progressPct}%"
							></div>
						</div>
						<span class="text-sm font-medium {courseCompleted ? 'text-green-700' : 'text-primary-700'}">{progressPct}%</span>
					</div>
				</div>
				{#if totalLessons > 0}
					<div class="mt-3">
						<Button href="/courses/{course.slug}/lessons/{courseCompleted ? course.lessons[0].slug : continueSlug}" size="sm">
							{courseCompleted ? 'Review Lessons' : completedCount === 0 ? 'Start Learning' : 'Continue'}
						</Button>
					</div>
				{/if}
			</div>
		{:else if dbCourseId}
			<form method="POST" action="?/enroll" use:enhance>
				<input type="hidden" name="courseId" value={dbCourseId} />
				<Button type="submit" size="lg" class="mb-8">Enroll in This Course</Button>
			</form>
		{/if}

		<Card>
			<h2 class="mb-6 text-xl font-semibold text-surface-900">Lessons</h2>

			{#if course.lessons.length === 0}
				<p class="py-8 text-center text-surface-400">No lessons available yet.</p>
			{:else}
				<ol class="space-y-2">
					{#each course.lessons as lesson, i}
						<li>
							<a
								href="/courses/{course.slug}/lessons/{lesson.slug}"
								class="flex items-center gap-4 rounded-lg border border-surface-200 p-4 transition-colors hover:border-primary-300 hover:bg-primary-50/50"
							>
								<span
									class="flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold {completedLessonSlugs.includes(lesson.slug)
										? 'bg-green-100 text-green-700'
										: 'bg-primary-100 text-primary-700'}"
								>
									{#if completedLessonSlugs.includes(lesson.slug)}
										<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6 9 17l-5-5"/></svg>
									{:else}
										{i + 1}
									{/if}
								</span>
								<div>
									<span class="font-medium text-surface-900">{lesson.title}</span>
									{#if lesson.description}
										<p class="mt-0.5 text-sm text-surface-500">{lesson.description}</p>
									{/if}
								</div>
								{#if completedLessonSlugs.includes(lesson.slug)}
									<span class="ml-auto shrink-0 text-xs font-medium text-green-600">Completed</span>
								{/if}
							</a>
						</li>
					{/each}
				</ol>
			{/if}
		</Card>
	</div>
{/if}
