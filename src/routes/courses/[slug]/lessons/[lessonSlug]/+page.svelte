<script lang="ts">
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui';
	import { getCourse, getAdjacentLessons } from '$lib/content/index';
	import { getLessonComponent } from '$lib/content/lessons';

	const slug = $derived($page.params.slug ?? '');
	const lessonSlug = $derived($page.params.lessonSlug ?? '');
	const course = $derived(getCourse(slug));
	const adjacent = $derived(
		course ? getAdjacentLessons(slug, lessonSlug) : { prev: null, next: null }
	);
	const lessonData = $derived(getLessonComponent(slug, lessonSlug));
	const LessonComponent = $derived(lessonData?.component ?? null);

	const currentLesson = $derived(
		course?.lessons.find((l) => l.slug === lessonSlug)
	);

	const { isCompleted, isEnrolled } = $derived($page.data as { isCompleted: boolean; isEnrolled: boolean });
</script>

{#if !course || !lessonData}
	<div class="mx-auto max-w-3xl px-6 py-24 text-center">
		<h1 class="text-3xl font-bold text-surface-900">Lesson not found</h1>
		<p class="mt-3 text-surface-500">This lesson doesn't exist or may have been removed.</p>
		<div class="mt-6 flex justify-center gap-3">
			<Button href="/courses">All Courses</Button>
			{#if course}
				<Button href="/courses/{course.slug}" variant="ghost">Back to Course</Button>
			{/if}
		</div>
	</div>
{:else}
	<div class="mx-auto flex min-h-screen max-w-4xl flex-col px-6 py-12">
		<div class="mb-6">
			<a
				href="/courses/{course.slug}"
				class="text-sm text-primary-600 hover:text-primary-700"
			>
				&larr; {course.title}
			</a>
		</div>

		<header class="mb-8">
			<p class="mb-1 text-sm font-medium text-primary-600">
				Lesson {course.lessons.findIndex((l) => l.slug === $page.params.lessonSlug) + 1}
				of {course.lessons.length}
			</p>
			<h1 class="text-3xl font-bold text-surface-900">{currentLesson?.title}</h1>
		</header>

		{#if !isEnrolled}
			<div class="rounded-xl border-2 border-dashed border-surface-300 bg-surface-50 p-12 text-center">
				<div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-surface-200">
					<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="text-surface-500"><path d="M12 15v2m0 0v2m0-2h2m-2 0H10"/><path d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0Z"/><path d="M12 9v4"/></svg>
				</div>
				<h2 class="text-xl font-bold text-surface-900">Enrollment Required</h2>
				<p class="mt-2 text-surface-500 max-w-md mx-auto">
					You need to be enrolled in <strong>{course.title}</strong> to access this lesson.
				</p>
				<div class="mt-6">
					<Button href="/courses/{course.slug}">Enroll in This Course</Button>
				</div>
			</div>
		{:else}
			<article class="prose prose-surface max-w-none">
				{#if LessonComponent}
					<LessonComponent />
				{/if}
			</article>

			<div class="mt-8 flex justify-center">
				<form method="POST" action="?/toggle" use:enhance>
					<Button type="submit" variant={isCompleted ? 'outline' : 'primary'}>
						{#if isCompleted}
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="mr-1.5"><path d="M20 6 9 17l-5-5"/></svg>
							Mark Incomplete
						{:else}
							Mark Complete
						{/if}
					</Button>
				</form>
			</div>

			<nav class="mt-8 flex items-center justify-between border-t border-surface-200 pt-6">
				<div>
					{#if adjacent.prev}
						<a
							href="/courses/{course.slug}/lessons/{adjacent.prev.slug}"
							class="group flex flex-col"
						>
							<span class="text-xs text-surface-400">&larr; Previous</span>
							<span class="text-sm font-medium text-surface-700 group-hover:text-primary-600">
								{adjacent.prev.title}
							</span>
						</a>
					{/if}
				</div>
				<div class="text-right">
					{#if adjacent.next}
						<a
							href="/courses/{course.slug}/lessons/{adjacent.next.slug}"
							class="group flex flex-col"
						>
							<span class="text-xs text-surface-400">Next &rarr;</span>
							<span class="text-sm font-medium text-surface-700 group-hover:text-primary-600">
								{adjacent.next.title}
							</span>
						</a>
					{:else}
						<a
							href="/courses/{course.slug}"
							class="group flex flex-col"
						>
							<span class="text-xs text-surface-400">Course Complete</span>
							<span class="text-sm font-medium text-primary-600 group-hover:text-primary-700">
								Back to Course &rarr;
							</span>
						</a>
					{/if}
				</div>
			</nav>
		{/if}
	</div>
{/if}
