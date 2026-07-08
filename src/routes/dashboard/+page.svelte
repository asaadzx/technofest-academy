<script lang="ts">
	import { page } from '$app/stores';
	import { Button, Card, Badge } from '$lib/components/ui';

	const { completedCount, enrolledCourses, progressCounts, availableCourses, certificates, quizAttempts, quizCourses } = $derived($page.data as {
		completedCount: number;
		enrolledCourses: Array<{
			id: number;
			courseId: number;
			courseSlug: string;
			courseTitle: string;
			enrolledAt: Date;
			completedAt: Date | null;
		}>;
		progressCounts: Array<{ courseId: number; count: number; total: number }>;
		availableCourses: Array<{ slug: string; title: string; difficulty: string; lessonCount: number }>;
		certificates: Array<{
			id: number;
			courseTitle: string;
			certCode: string;
			issuedAt: Date;
		}>;
		quizAttempts: Array<{
			id: number;
			courseSlug: string;
			lessonSlug: string;
			score: number;
			total: number;
			createdAt: Date;
		}>;
		quizCourses: Array<{ slug: string; title: string }>;
	});

	const totalLessons = $derived(
		enrolledCourses.reduce((sum, e) => {
			const p = progressMap[e.courseId];
			return sum + (p?.total ?? 0);
		}, 0)
	);

	const progressMap = $derived(
		Object.fromEntries(progressCounts.map((p) => [p.courseId, p]))
	);
</script>

<div class="mx-auto max-w-5xl px-6 py-12">
	<header class="mb-10">
		<h1 class="text-3xl font-bold text-surface-900">Dashboard</h1>
		<p class="mt-2 text-surface-500">Track your learning journey across all courses.</p>
	</header>

	<div class="grid gap-6 sm:grid-cols-3">
		<Card class="text-center">
			<p class="text-3xl font-bold text-primary-600">{enrolledCourses.length}</p>
			<p class="mt-1 text-sm text-surface-500">Enrolled Courses</p>
		</Card>
		<Card class="text-center">
			<p class="text-3xl font-bold text-primary-600">{totalLessons}</p>
			<p class="mt-1 text-sm text-surface-500">Total Lessons</p>
		</Card>
		<Card class="text-center">
			<p class="text-3xl font-bold text-primary-600">{completedCount}</p>
			<p class="mt-1 text-sm text-surface-500">Lessons Completed</p>
		</Card>
	</div>

	<section class="mt-12">
		<div class="mb-6 flex items-center justify-between">
			<h2 class="text-xl font-semibold text-surface-900">My Courses</h2>
		</div>

		{#if enrolledCourses.length === 0}
			<Card class="border-2 border-dashed border-surface-300 py-12 text-center">
				<div class="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-surface-100">
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="text-surface-400"><path d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
				</div>
				<h3 class="font-semibold text-surface-700">No courses yet</h3>
				<p class="mt-1 text-sm text-surface-500">
					Enroll in a course to start your learning journey.
				</p>
				<div class="mt-5">
					<Button href="/courses">Browse Courses</Button>
				</div>
			</Card>
		{:else}
			<div class="grid gap-4 md:grid-cols-2">
				{#each enrolledCourses as enrollment (enrollment.id)}
					{@const prog = progressMap[enrollment.courseId] ?? { count: 0, total: 0 }}
					{@const pct = prog.total > 0 ? Math.round((prog.count / prog.total) * 100) : 0}
					<Card>
						{#snippet footer()}
							<Button href="/courses/{enrollment.courseSlug}" size="sm" variant="outline">
								{prog.count === 0 ? 'Start' : enrollment.completedAt ? 'Review' : 'Continue'}
							</Button>
						{/snippet}
						<h3 class="font-semibold text-surface-900">{enrollment.courseTitle}</h3>
						<p class="mt-1 text-xs text-surface-400">
							Enrolled {new Date(enrollment.enrolledAt).toLocaleDateString()}
							{#if enrollment.completedAt}
								&middot; Completed {new Date(enrollment.completedAt).toLocaleDateString()}
							{/if}
						</p>
						{#if enrollment.completedAt}
							<span class="mt-2 inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700">
								<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6 9 17l-5-5"/></svg>
								Completed
							</span>
						{/if}
						{#if prog.total > 0}
							<div class="mt-3">
								<div class="flex items-center justify-between text-xs text-surface-500">
									<span>{prog.count} of {prog.total} lessons</span>
									<span>{pct}%</span>
								</div>
								<div class="mt-1 h-2 w-full overflow-hidden rounded-full bg-surface-200">
									<div
										class="h-full rounded-full bg-primary-600 transition-all"
										style="width: {pct}%"
									></div>
								</div>
							</div>
						{/if}
					</Card>
				{/each}
			</div>
		{/if}
	</section>

	{#if quizAttempts.length > 0}
		{@const grouped = Object.fromEntries(
			quizCourses.map((c) => [
				c.slug,
				{
					title: c.title,
					attempts: quizAttempts.filter((a) => a.courseSlug === c.slug)
				}
			])
		)}
		<section class="mt-12">
			<h2 class="mb-6 text-xl font-semibold text-surface-900">Quiz Scores</h2>
			<div class="space-y-4">
				{#each Object.entries(grouped) as [slug, group]}
					<details class="group rounded-xl border border-surface-200 bg-white">
						<summary class="flex cursor-pointer items-center justify-between px-5 py-3 text-sm font-medium text-surface-900 hover:bg-surface-50">
							{group.title}
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="transition-transform group-open:rotate-180"><path d="m6 9 6 6 6-6"/></svg>
						</summary>
						<div class="border-t border-surface-100">
							{#each group.attempts as attempt}
								<div class="flex items-center justify-between px-5 py-3 text-sm even:bg-surface-50">
									<span class="text-surface-700">{attempt.lessonSlug.replace(/-/g, ' ')}</span>
									<span class="font-medium text-surface-900">{attempt.score}/{attempt.total}</span>
								</div>
							{/each}
						</div>
					</details>
				{/each}
			</div>
		</section>
	{/if}

	{#if certificates.length > 0}
		<section class="mt-12">
			<h2 class="mb-6 text-xl font-semibold text-surface-900">Certificates</h2>
			<div class="space-y-3">
				{#each certificates as cert}
					<div class="flex items-center justify-between rounded-xl border border-surface-200 bg-white p-4">
						<div>
							<p class="font-medium text-surface-900">{cert.courseTitle}</p>
							<p class="text-sm text-surface-500">
								Completed {new Date(cert.issuedAt).toLocaleDateString()}
							</p>
						</div>
						<a
							href="/certificates/{cert.certCode}"
							class="rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700"
						>
							Download PDF
						</a>
					</div>
				{/each}
			</div>
		</section>
	{/if}

	<section class="mt-12">
		<h2 class="mb-6 text-xl font-semibold text-surface-900">Available Courses</h2>
		{#if availableCourses.length === 0}
			<Card class="border-2 border-dashed border-surface-300 py-12 text-center">
				<div class="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-surface-100">
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="text-surface-400"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
				</div>
				<h3 class="font-semibold text-surface-700">All courses enrolled</h3>
				<p class="mt-1 text-sm text-surface-500">You're enrolled in all available courses.</p>
			</Card>
		{:else}
			<div class="grid gap-6 md:grid-cols-2">
				{#each availableCourses as course (course.slug)}
					<Card>
						{#snippet footer()}
							<Button href="/courses/{course.slug}" size="sm" variant="outline">
								View Course
							</Button>
						{/snippet}
						<div class="flex items-start justify-between gap-3">
							<h3 class="font-semibold text-surface-900">{course.title}</h3>
							<Badge
								variant={course.difficulty === 'beginner' ? 'success' : course.difficulty === 'intermediate' ? 'warning' : 'error'}
							>
								{course.difficulty}
							</Badge>
						</div>
						<p class="mt-1 text-sm text-surface-500">{course.lessonCount} lessons</p>
					</Card>
				{/each}
			</div>
		{/if}
	</section>
</div>
